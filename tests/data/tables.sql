create table public.creators (
  id bigserial not null,
  name text not null,
  description text not null,
  url text not null,
  image_url text null,
  category text not null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint creators_pkey primary key (id),
  constraint creators_name_key unique (name)
) TABLESPACE pg_default;

create trigger creator_change_trigger
after INSERT
or DELETE
or
update on creators for EACH row
execute FUNCTION log_creator_change ();

create table public.creator_history (
  history_id bigserial not null,
  creator_id bigint not null,
  action text not null,
  action_date timestamp with time zone not null default now(),
  id bigint not null,
  name text not null,
  description text not null,
  url text not null,
  image_url text null,
  category text not null,
  created_at timestamp with time zone null,
  updated_at timestamp with time zone null,
  constraint creator_history_pkey primary key (history_id),
  constraint creator_history_action_check check (
    (
      action = any (
        array['create'::text, 'update'::text, 'delete'::text]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_creator_history_creator_id on public.creator_history using btree (creator_id) TABLESPACE pg_default;

create index IF not exists idx_creator_history_action_date on public.creator_history using btree (action_date) TABLESPACE pg_default;

create trigger creator_history_cleanup_trigger
after INSERT
or DELETE
or
update on creator_history for EACH row
execute FUNCTION cleanup_creator_history ();