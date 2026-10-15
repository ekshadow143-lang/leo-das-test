create table if not exists media(slot text primary key,url text not null,type text,created_at timestamptz default now());
create table if not exists site_data(key text primary key,value jsonb,updated_at timestamptz default now());
create table if not exists match_requests(id uuid default gen_random_uuid() primary key,request_code text unique,team_name text,captain_name text,whatsapp_number text,game text default 'Free Fire MAX',match_type text,preferred_at text,message text,status text default 'PENDING',admin_notes text,created_at timestamptz default now(),approved_at timestamptz,rejected_at timestamptz);
alter table media enable row level security;
alter table site_data enable row level security;
alter table match_requests enable row level security; -- no policies: only the server (service role) can touch requests
drop policy if exists "public read media" on media; create policy "public read media" on media for select using (true);
drop policy if exists "public read data" on site_data; create policy "public read data" on site_data for select using (true);
insert into storage.buckets(id,name,public) values('media','media',true) on conflict (id) do nothing;
