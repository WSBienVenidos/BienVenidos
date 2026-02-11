-- Table used by the Java backend (stores hashed passwords)
-- IMPORTANT: Never store plain-text passwords.

create extension if not exists "uuid-ossp";

create table if not exists public.app_users (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  phone text not null unique,
  first_name text,
  last_name text,
  password_hash text not null,
  email_verified boolean not null default false,
  verification_code text,
  verification_code_expiry timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.invite_tokens (
  id uuid primary key default uuid_generate_v4(),
  token_hash text not null unique,
  created_by_user_id uuid not null references public.app_users(id),
  expires_at timestamptz not null,
  used_at timestamptz,
  used_by_user_id uuid references public.app_users(id),
  created_at timestamptz not null default now()
);
