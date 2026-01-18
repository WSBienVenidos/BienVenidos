-- Table used by the Java backend (stores hashed passwords)
-- IMPORTANT: Never store plain-text passwords.

create extension if not exists "uuid-ossp";

create table if not exists public.app_users (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);
