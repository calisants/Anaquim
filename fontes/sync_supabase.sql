-- Sincronização do Anaquim (Supabase). Aplicar num projeto só do Anaquim.
-- O app manda um id (SHA-256 do código do usuário, 64 caracteres hex) e um bloco já cifrado no aparelho.
-- A tabela fica fechada: ninguém lê nem escreve nela direto. Só as três funções abaixo abrem o acesso.
-- Não há nome, e-mail, telefone nem outro dado pessoal. O servidor não consegue ler o conteúdo.

create table if not exists public.anaquim_sync (
  id         text primary key check (id ~ '^[0-9a-f]{64}$'),
  data       jsonb  not null,
  rev        bigint not null default 1,
  criado     timestamptz not null default now(),
  atualizado timestamptz not null default now()
);

alter table public.anaquim_sync enable row level security;
-- sem políticas de propósito: com RLS ligada e nenhuma política, anon e authenticated não acessam a tabela
revoke all on public.anaquim_sync from anon, authenticated;

-- ler: devolve {existe:false} ou {existe:true, rev, data}
create or replace function public.anaquim_ler(p_id text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare r record;
begin
  if p_id is null or p_id !~ '^[0-9a-f]{64}$' then
    raise exception 'id invalido';
  end if;
  select s.data, s.rev into r from public.anaquim_sync s where s.id = p_id;
  if not found then
    return jsonb_build_object('existe', false);
  end if;
  return jsonb_build_object('existe', true, 'rev', r.rev, 'data', r.data);
end $$;

-- gravar com controle de versão: p_rev é a versão que o aparelho leu (0 se ainda não existia).
-- Se outro aparelho gravou no meio, devolve {ok:false, rev:<atual>} e o app lê, junta e tenta de novo.
create or replace function public.anaquim_gravar(p_id text, p_data jsonb, p_rev bigint)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare n int; atual bigint;
begin
  if p_id is null or p_id !~ '^[0-9a-f]{64}$' then
    raise exception 'id invalido';
  end if;
  if p_data is null or octet_length(p_data::text) > 600000 then
    raise exception 'dados grandes demais';
  end if;
  if p_rev = 0 then
    -- teto de segurança contra criação em massa de linhas
    if (select count(*) from public.anaquim_sync) >= 200000 then
      raise exception 'limite do servidor';
    end if;
    insert into public.anaquim_sync (id, data) values (p_id, p_data) on conflict (id) do nothing;
    get diagnostics n = row_count;
    if n = 1 then
      return jsonb_build_object('ok', true, 'rev', 1);
    end if;
  else
    update public.anaquim_sync
       set data = p_data, rev = rev + 1, atualizado = now()
     where id = p_id and rev = p_rev;
    get diagnostics n = row_count;
    if n = 1 then
      return jsonb_build_object('ok', true, 'rev', p_rev + 1);
    end if;
  end if;
  select rev into atual from public.anaquim_sync where id = p_id;
  return jsonb_build_object('ok', false, 'rev', coalesce(atual, 0));
end $$;

-- apagar a cópia da nuvem (direito do usuário de tirar os dados dele)
create or replace function public.anaquim_apagar(p_id text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_id is null or p_id !~ '^[0-9a-f]{64}$' then
    raise exception 'id invalido';
  end if;
  delete from public.anaquim_sync where id = p_id;
end $$;

revoke all on function public.anaquim_ler(text)                   from public;
revoke all on function public.anaquim_gravar(text, jsonb, bigint) from public;
revoke all on function public.anaquim_apagar(text)                from public;
grant execute on function public.anaquim_ler(text)                   to anon;
grant execute on function public.anaquim_gravar(text, jsonb, bigint) to anon;
grant execute on function public.anaquim_apagar(text)                to anon;
