create extension if not exists pgcrypto;

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  contact_name text not null check (char_length(contact_name) between 2 and 40),
  phone text not null check (phone ~ '^1[3-9][0-9]{9}$'),
  pet_type text not null check (pet_type in ('小型犬', '中大型犬', '猫咪')),
  service_type text not null check (service_type in ('基础洗护', '精致造型', '皮毛护理')),
  expected_arrival_at timestamptz not null,
  note text check (note is null or char_length(note) <= 500),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  source text not null default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists appointments_created_at_idx
  on public.appointments (created_at desc);

create index if not exists appointments_expected_arrival_at_idx
  on public.appointments (expected_arrival_at);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists appointments_set_updated_at on public.appointments;

create trigger appointments_set_updated_at
before update on public.appointments
for each row
execute function public.set_updated_at();

alter table public.appointments enable row level security;
