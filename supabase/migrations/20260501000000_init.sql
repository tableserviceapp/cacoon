-- =============================================================================
-- COCOON — RECRUITMENT SAAS · INITIAL SCHEMA
-- =============================================================================
-- Multi-tenant ATS + AI recruiter workspace.
-- Every business table carries workspace_id and is gated by Row-Level Security.
--
-- Apply this in the Supabase SQL editor (or via Supabase CLI / MCP).
-- Idempotent: drops are guarded with IF EXISTS / IF NOT EXISTS where useful.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 0 · EXTENSIONS
-- -----------------------------------------------------------------------------
create extension if not exists "pgcrypto";   -- gen_random_uuid()
create extension if not exists "citext";     -- case-insensitive emails

-- -----------------------------------------------------------------------------
-- 1 · ENUMS
-- -----------------------------------------------------------------------------
do $$ begin
  create type job_status        as enum ('Draft', 'Open', 'Paused', 'Closed', 'Filled');
  create type job_priority      as enum ('normal', 'high', 'urgent');
  create type employment_type   as enum ('Full-time', 'Part-time', 'Contract', 'Internship');
  create type seniority_level   as enum ('Junior', 'Mid', 'Senior', 'Lead', 'Manager', 'Director');
  create type work_setup        as enum ('Onsite', 'Hybrid', 'Remote');
  create type pipeline_stage    as enum ('Applied', 'Screening', 'Shortlisted', 'Interview', 'Offer', 'Hired', 'Rejected', 'Withdrawn');
  create type interview_status  as enum ('Scheduled', 'Completed', 'Cancelled', 'Rescheduled', 'No-show');
  create type interview_loc     as enum ('Zoom', 'Google Meet', 'In person', 'Phone', 'Other');
  create type team_role         as enum ('admin', 'manager', 'member', 'hiring_manager');
  create type team_status       as enum ('invited', 'active', 'suspended');
  create type message_direction as enum ('inbound', 'outbound', 'internal');
  create type subject_type      as enum ('job', 'candidate', 'application', 'interview', 'message', 'note');
exception
  when duplicate_object then null;
end $$;

-- -----------------------------------------------------------------------------
-- 2 · UTILITIES
-- -----------------------------------------------------------------------------

-- Auto-update `updated_at` columns
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- 3 · WORKSPACES (TENANTS)
-- -----------------------------------------------------------------------------
create table if not exists public.workspaces (
  id              uuid primary key default gen_random_uuid(),
  name            text        not null,
  slug            text        unique not null,
  plan            text        not null default 'starter',  -- starter | growth | scale | enterprise
  logo_url        text,
  brand_color     text        default '#FCD209',
  careers_url     text,
  ai_credits_used integer     not null default 0,
  ai_credits_cap  integer     not null default 10000,
  seat_cap        integer     not null default 5,
  settings        jsonb       not null default '{}'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create trigger workspaces_updated_at before update on public.workspaces
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 4 · TEAM MEMBERS  (recruiters, hiring managers, admins)
-- -----------------------------------------------------------------------------
create table if not exists public.team_members (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid        not null references public.workspaces(id) on delete cascade,
  user_id         uuid        unique references auth.users(id) on delete set null,
  email           citext      not null,
  full_name       text        not null,
  job_title       text,
  role            team_role   not null default 'member',
  status          team_status not null default 'invited',
  capacity        integer     not null default 30,        -- max active candidates
  avatar_url      text,
  invited_at      timestamptz not null default now(),
  joined_at       timestamptz,
  last_active_at  timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (workspace_id, email)
);
create index if not exists team_members_workspace_idx on public.team_members(workspace_id);
create index if not exists team_members_user_idx on public.team_members(user_id);
create trigger team_members_updated_at before update on public.team_members
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 5 · RLS HELPER FUNCTIONS
-- -----------------------------------------------------------------------------
-- SECURITY DEFINER functions bypass RLS, so we can use them inside policies
-- without recursion. They check the *current* auth.uid() against team_members.

create or replace function public.is_workspace_member(_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.team_members
    where workspace_id = _workspace_id
      and user_id = auth.uid()
      and status = 'active'
  );
$$;

create or replace function public.is_workspace_admin(_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.team_members
    where workspace_id = _workspace_id
      and user_id = auth.uid()
      and status = 'active'
      and role in ('admin', 'manager')
  );
$$;

create or replace function public.current_team_member_id(_workspace_id uuid)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id
  from public.team_members
  where workspace_id = _workspace_id
    and user_id = auth.uid()
  limit 1;
$$;

-- -----------------------------------------------------------------------------
-- 6 · JOBS
-- -----------------------------------------------------------------------------
create table if not exists public.jobs (
  id                  uuid primary key default gen_random_uuid(),
  workspace_id        uuid           not null references public.workspaces(id) on delete cascade,
  title               text           not null,
  department          text,
  location            text,
  work_setup          work_setup     not null default 'Hybrid',
  employment_type     employment_type not null default 'Full-time',
  seniority           seniority_level,
  description         text,
  salary_currency     text           not null default 'GBP',
  salary_min          integer,
  salary_max          integer,
  salary_public       boolean        not null default true,
  equity_min          numeric(6,4),
  equity_max          numeric(6,4),
  benefits            text[]         not null default '{}',
  status              job_status     not null default 'Draft',
  priority            job_priority   not null default 'normal',
  recruiter_id        uuid           references public.team_members(id) on delete set null,
  hiring_manager_id   uuid           references public.team_members(id) on delete set null,
  approver_ids        uuid[]         not null default '{}',
  channels            jsonb          not null default '{}'::jsonb,
  application_form    jsonb          not null default '{}'::jsonb,
  posted_at           timestamptz,
  closed_at           timestamptz,
  created_by          uuid           references public.team_members(id) on delete set null,
  created_at          timestamptz    not null default now(),
  updated_at          timestamptz    not null default now()
);
create index if not exists jobs_workspace_idx        on public.jobs(workspace_id);
create index if not exists jobs_workspace_status_idx on public.jobs(workspace_id, status);
create index if not exists jobs_recruiter_idx        on public.jobs(recruiter_id);
create index if not exists jobs_hiring_manager_idx   on public.jobs(hiring_manager_id);
create trigger jobs_updated_at before update on public.jobs
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 7 · CANDIDATES
-- -----------------------------------------------------------------------------
create table if not exists public.candidates (
  id                  uuid primary key default gen_random_uuid(),
  workspace_id        uuid        not null references public.workspaces(id) on delete cascade,
  full_name           text        not null,
  email               citext,
  phone               text,
  location            text,
  current_title       text,
  current_company     text,
  experience_years    integer,
  notice_period       text,
  salary_expectation  text,
  linkedin_url        text,
  portfolio_url       text,
  github_url          text,
  cv_url              text,
  photo_url           text,
  skills              text[]      not null default '{}',
  source              text,                                   -- Cocoon match | LinkedIn | Referral | Job board | Direct outreach
  added_by            uuid        references public.team_members(id) on delete set null,
  metadata            jsonb       not null default '{}'::jsonb,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
create index if not exists candidates_workspace_idx on public.candidates(workspace_id);
create index if not exists candidates_email_idx     on public.candidates(workspace_id, email);
create index if not exists candidates_skills_idx    on public.candidates using gin (skills);
create trigger candidates_updated_at before update on public.candidates
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 8 · APPLICATIONS  (the candidate × job pipeline row)
-- -----------------------------------------------------------------------------
create table if not exists public.applications (
  id                  uuid primary key default gen_random_uuid(),
  workspace_id        uuid           not null references public.workspaces(id) on delete cascade,
  job_id              uuid           not null references public.jobs(id) on delete cascade,
  candidate_id        uuid           not null references public.candidates(id) on delete cascade,
  stage               pipeline_stage not null default 'Applied',
  match_score         integer        check (match_score is null or (match_score between 0 and 100)),
  match_breakdown     jsonb,                                  -- {skills:96, experience:89, values:92, stage:88, reasoning:"..."}
  recruiter_id        uuid           references public.team_members(id) on delete set null,
  rejected_reason     text,
  applied_at          timestamptz    not null default now(),
  stage_updated_at    timestamptz    not null default now(),
  created_at          timestamptz    not null default now(),
  updated_at          timestamptz    not null default now(),
  unique (job_id, candidate_id)
);
create index if not exists applications_workspace_idx       on public.applications(workspace_id);
create index if not exists applications_job_stage_idx       on public.applications(job_id, stage);
create index if not exists applications_candidate_idx       on public.applications(candidate_id);
create index if not exists applications_recruiter_idx       on public.applications(recruiter_id);
create index if not exists applications_match_idx           on public.applications(workspace_id, match_score desc);
create trigger applications_updated_at before update on public.applications
  for each row execute function public.set_updated_at();

-- Stage history (one row per stage change)
create table if not exists public.application_stage_history (
  id              uuid primary key default gen_random_uuid(),
  application_id  uuid           not null references public.applications(id) on delete cascade,
  workspace_id    uuid           not null references public.workspaces(id) on delete cascade,
  from_stage      pipeline_stage,
  to_stage        pipeline_stage not null,
  changed_by      uuid           references public.team_members(id) on delete set null,
  reason          text,
  changed_at      timestamptz    not null default now()
);
create index if not exists app_stage_history_app_idx       on public.application_stage_history(application_id);
create index if not exists app_stage_history_workspace_idx on public.application_stage_history(workspace_id);

-- Trigger: when applications.stage changes, record history + bump stage_updated_at
create or replace function public.record_application_stage_change()
returns trigger
language plpgsql
as $$
begin
  if (tg_op = 'INSERT') then
    insert into public.application_stage_history
      (application_id, workspace_id, from_stage, to_stage)
    values
      (new.id, new.workspace_id, null, new.stage);
    return new;
  elsif (new.stage is distinct from old.stage) then
    insert into public.application_stage_history
      (application_id, workspace_id, from_stage, to_stage)
    values
      (new.id, new.workspace_id, old.stage, new.stage);
    new.stage_updated_at := now();
    return new;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_application_stage on public.applications;
create trigger trg_application_stage
  after insert or update of stage on public.applications
  for each row execute function public.record_application_stage_change();

-- -----------------------------------------------------------------------------
-- 9 · INTERVIEWS  +  ATTENDEES  +  SCORECARDS
-- -----------------------------------------------------------------------------
create table if not exists public.interviews (
  id                  uuid primary key default gen_random_uuid(),
  workspace_id        uuid             not null references public.workspaces(id) on delete cascade,
  application_id      uuid             not null references public.applications(id) on delete cascade,
  type                text             not null,            -- Screening call | Hiring manager | Technical | Final round | Culture
  scheduled_at        timestamptz      not null,
  duration_minutes    integer          not null default 30,
  location            interview_loc    not null default 'Zoom',
  meeting_url         text,
  status              interview_status not null default 'Scheduled',
  description         text,
  created_by          uuid             references public.team_members(id) on delete set null,
  created_at          timestamptz      not null default now(),
  updated_at          timestamptz      not null default now()
);
create index if not exists interviews_workspace_idx   on public.interviews(workspace_id);
create index if not exists interviews_application_idx on public.interviews(application_id);
create index if not exists interviews_scheduled_idx   on public.interviews(workspace_id, scheduled_at);
create trigger interviews_updated_at before update on public.interviews
  for each row execute function public.set_updated_at();

create table if not exists public.interview_attendees (
  id              uuid primary key default gen_random_uuid(),
  interview_id    uuid not null references public.interviews(id) on delete cascade,
  team_member_id  uuid not null references public.team_members(id) on delete cascade,
  is_lead         boolean not null default false,
  unique (interview_id, team_member_id)
);
create index if not exists attendees_interview_idx on public.interview_attendees(interview_id);
create index if not exists attendees_member_idx    on public.interview_attendees(team_member_id);

create table if not exists public.interview_scorecards (
  id                uuid primary key default gen_random_uuid(),
  workspace_id      uuid        not null references public.workspaces(id) on delete cascade,
  interview_id      uuid        not null references public.interviews(id) on delete cascade,
  team_member_id    uuid        not null references public.team_members(id) on delete cascade,
  overall_rating    integer     check (overall_rating is null or overall_rating between 1 and 5),
  recommendation    text,                                   -- strong_yes | yes | no | strong_no
  strengths         text,
  concerns          text,
  notes             text,
  competencies      jsonb,                                  -- per-competency ratings
  submitted_at      timestamptz not null default now(),
  unique (interview_id, team_member_id)
);
create index if not exists scorecards_interview_idx on public.interview_scorecards(interview_id);

-- -----------------------------------------------------------------------------
-- 10 · CONVERSATIONS  +  MESSAGES  (candidate ↔ recruiter)
-- -----------------------------------------------------------------------------
create table if not exists public.conversations (
  id                  uuid primary key default gen_random_uuid(),
  workspace_id        uuid           not null references public.workspaces(id) on delete cascade,
  application_id      uuid           references public.applications(id) on delete set null,
  candidate_id        uuid           references public.candidates(id) on delete set null,
  subject             text,
  flagged             boolean        not null default false,
  archived            boolean        not null default false,
  last_message_at     timestamptz    not null default now(),
  created_at          timestamptz    not null default now()
);
create index if not exists conversations_workspace_idx       on public.conversations(workspace_id);
create index if not exists conversations_application_idx     on public.conversations(application_id);
create index if not exists conversations_last_message_idx    on public.conversations(workspace_id, last_message_at desc);

create table if not exists public.messages (
  id                      uuid primary key default gen_random_uuid(),
  workspace_id            uuid              not null references public.workspaces(id) on delete cascade,
  conversation_id         uuid              not null references public.conversations(id) on delete cascade,
  direction               message_direction not null,
  from_team_member_id     uuid              references public.team_members(id) on delete set null,
  body                    text              not null,
  body_html               text,
  attachments             jsonb             not null default '[]'::jsonb,
  read_at                 timestamptz,
  sent_at                 timestamptz       not null default now()
);
create index if not exists messages_conversation_idx on public.messages(conversation_id, sent_at desc);
create index if not exists messages_workspace_idx    on public.messages(workspace_id);

-- Trigger: bump conversation.last_message_at on new messages
create or replace function public.bump_conversation_timestamp()
returns trigger
language plpgsql
as $$
begin
  update public.conversations
    set last_message_at = new.sent_at
    where id = new.conversation_id;
  return new;
end;
$$;
drop trigger if exists trg_bump_conversation on public.messages;
create trigger trg_bump_conversation
  after insert on public.messages
  for each row execute function public.bump_conversation_timestamp();

-- -----------------------------------------------------------------------------
-- 11 · NOTES  (internal collaboration, attached to anything)
-- -----------------------------------------------------------------------------
create table if not exists public.notes (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid         not null references public.workspaces(id) on delete cascade,
  team_member_id  uuid         references public.team_members(id) on delete set null,
  application_id  uuid         references public.applications(id) on delete cascade,
  candidate_id    uuid         references public.candidates(id) on delete cascade,
  job_id          uuid         references public.jobs(id) on delete cascade,
  body            text         not null,
  mentions        uuid[]       not null default '{}',
  created_at      timestamptz  not null default now(),
  -- a note belongs to at least one parent
  check (application_id is not null or candidate_id is not null or job_id is not null)
);
create index if not exists notes_application_idx on public.notes(application_id);
create index if not exists notes_candidate_idx   on public.notes(candidate_id);
create index if not exists notes_job_idx         on public.notes(job_id);

-- -----------------------------------------------------------------------------
-- 12 · ACTIVITY LOG
-- -----------------------------------------------------------------------------
create table if not exists public.activity_log (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid          not null references public.workspaces(id) on delete cascade,
  actor_id        uuid          references public.team_members(id) on delete set null,
  action          text          not null,                   -- 'moved_stage' | 'shortlisted' | 'sent_message' | ...
  subject_type    subject_type,
  subject_id      uuid,
  metadata        jsonb         not null default '{}'::jsonb,
  created_at      timestamptz   not null default now()
);
create index if not exists activity_workspace_idx on public.activity_log(workspace_id, created_at desc);
create index if not exists activity_actor_idx     on public.activity_log(actor_id);
create index if not exists activity_subject_idx   on public.activity_log(subject_type, subject_id);

-- -----------------------------------------------------------------------------
-- 13 · AI RUNS  (recruiter AI tools telemetry)
-- -----------------------------------------------------------------------------
create table if not exists public.ai_runs (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid          not null references public.workspaces(id) on delete cascade,
  team_member_id  uuid          references public.team_members(id) on delete set null,
  tool            text          not null,                   -- 'rank-applicants' | 'summarise-cv' | ...
  prompt          text,
  output          text,
  context         jsonb         not null default '{}'::jsonb,
  job_id          uuid          references public.jobs(id) on delete set null,
  application_id  uuid          references public.applications(id) on delete set null,
  credits_used    integer       not null default 0,
  duration_ms     integer,
  created_at      timestamptz   not null default now()
);
create index if not exists ai_runs_workspace_idx on public.ai_runs(workspace_id, created_at desc);
create index if not exists ai_runs_member_idx    on public.ai_runs(team_member_id);

-- -----------------------------------------------------------------------------
-- 14 · TEMPLATES  (email + interview)
-- -----------------------------------------------------------------------------
create table if not exists public.email_templates (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid         not null references public.workspaces(id) on delete cascade,
  name            text         not null,
  subject         text         not null,
  body            text         not null,
  use_count       integer      not null default 0,
  created_by      uuid         references public.team_members(id) on delete set null,
  created_at      timestamptz  not null default now(),
  updated_at      timestamptz  not null default now()
);
create index if not exists email_templates_workspace_idx on public.email_templates(workspace_id);
create trigger email_templates_updated_at before update on public.email_templates
  for each row execute function public.set_updated_at();

create table if not exists public.interview_templates (
  id                  uuid primary key default gen_random_uuid(),
  workspace_id        uuid         not null references public.workspaces(id) on delete cascade,
  name                text         not null,
  duration_minutes    integer      not null default 30,
  description         text,
  competencies        jsonb        not null default '[]'::jsonb,
  created_at          timestamptz  not null default now(),
  updated_at          timestamptz  not null default now()
);
create trigger interview_templates_updated_at before update on public.interview_templates
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 15 · SAVED VIEWS  (table filter presets)
-- -----------------------------------------------------------------------------
create table if not exists public.saved_views (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid         not null references public.workspaces(id) on delete cascade,
  team_member_id  uuid         references public.team_members(id) on delete cascade,
  name            text         not null,
  resource        text         not null check (resource in ('jobs','candidates','interviews','messages')),
  filters         jsonb        not null default '{}'::jsonb,
  is_shared       boolean      not null default false,
  created_at      timestamptz  not null default now()
);
create index if not exists saved_views_workspace_idx on public.saved_views(workspace_id);

-- -----------------------------------------------------------------------------
-- 16 · INVOICES  (read-only mirror; source of truth = Stripe / billing provider)
-- -----------------------------------------------------------------------------
create table if not exists public.invoices (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid         not null references public.workspaces(id) on delete cascade,
  number          text         not null,
  amount_cents    integer      not null,
  currency        text         not null default 'GBP',
  status          text         not null,                   -- paid | due | failed | refunded
  external_id     text,
  invoice_url     text,
  issued_at       timestamptz  not null,
  paid_at         timestamptz,
  created_at      timestamptz  not null default now(),
  unique (workspace_id, number)
);
create index if not exists invoices_workspace_idx on public.invoices(workspace_id, issued_at desc);

-- -----------------------------------------------------------------------------
-- 17 · WORKSPACE BOOTSTRAP TRIGGER
-- -----------------------------------------------------------------------------
-- When a new workspace is created, automatically add the creating user
-- as the first admin team_member.
create or replace function public.handle_new_workspace()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
  v_name  text;
begin
  if auth.uid() is null then
    return new;
  end if;

  select email, coalesce(raw_user_meta_data->>'full_name', split_part(email, '@', 1))
    into v_email, v_name
    from auth.users
    where id = auth.uid();

  insert into public.team_members
    (workspace_id, user_id, email, full_name, role, status, joined_at)
  values
    (new.id, auth.uid(), v_email, v_name, 'admin', 'active', now())
  on conflict (workspace_id, email) do nothing;

  return new;
end;
$$;

drop trigger if exists on_workspace_created on public.workspaces;
create trigger on_workspace_created
  after insert on public.workspaces
  for each row execute function public.handle_new_workspace();

-- =============================================================================
-- 18 · ROW-LEVEL SECURITY
-- =============================================================================
-- Pattern: every business table is gated by `is_workspace_member(workspace_id)`.
-- Auth.users are isolated by Supabase by default. Service role bypasses RLS.
-- =============================================================================

alter table public.workspaces                  enable row level security;
alter table public.team_members                enable row level security;
alter table public.jobs                        enable row level security;
alter table public.candidates                  enable row level security;
alter table public.applications                enable row level security;
alter table public.application_stage_history   enable row level security;
alter table public.interviews                  enable row level security;
alter table public.interview_attendees         enable row level security;
alter table public.interview_scorecards        enable row level security;
alter table public.conversations               enable row level security;
alter table public.messages                    enable row level security;
alter table public.notes                       enable row level security;
alter table public.activity_log                enable row level security;
alter table public.ai_runs                     enable row level security;
alter table public.email_templates             enable row level security;
alter table public.interview_templates         enable row level security;
alter table public.saved_views                 enable row level security;
alter table public.invoices                    enable row level security;

-- ----- Workspaces ------------------------------------------------------------
drop policy if exists "members read workspace"   on public.workspaces;
drop policy if exists "any auth create workspace" on public.workspaces;
drop policy if exists "admins update workspace"  on public.workspaces;
drop policy if exists "admins delete workspace"  on public.workspaces;

create policy "members read workspace" on public.workspaces
  for select using (public.is_workspace_member(id));
create policy "any auth create workspace" on public.workspaces
  for insert with check (auth.uid() is not null);
create policy "admins update workspace" on public.workspaces
  for update using (public.is_workspace_admin(id));
create policy "admins delete workspace" on public.workspaces
  for delete using (public.is_workspace_admin(id));

-- ----- Team members ----------------------------------------------------------
drop policy if exists "members read team"   on public.team_members;
drop policy if exists "admins manage team"  on public.team_members;
drop policy if exists "self read self"      on public.team_members;

create policy "members read team" on public.team_members
  for select using (public.is_workspace_member(workspace_id));
create policy "self read self" on public.team_members
  for select using (user_id = auth.uid());
create policy "admins manage team" on public.team_members
  for all
  using (public.is_workspace_admin(workspace_id))
  with check (public.is_workspace_admin(workspace_id));

-- ----- Generic per-workspace policy generator --------------------------------
-- Same shape on every business table: members can read/write their workspace.
do $$
declare
  t text;
  business_tables text[] := array[
    'jobs','candidates','applications','application_stage_history',
    'interviews','interview_attendees','interview_scorecards',
    'conversations','messages','notes','activity_log','ai_runs',
    'email_templates','interview_templates','saved_views','invoices'
  ];
begin
  foreach t in array business_tables loop
    execute format('drop policy if exists "members all" on public.%I', t);
    -- interview_attendees doesn't carry workspace_id — handled below
    if t = 'interview_attendees' then
      execute format($pol$
        create policy "members all" on public.%I
          for all
          using (
            exists (
              select 1 from public.interviews i
              where i.id = interview_attendees.interview_id
                and public.is_workspace_member(i.workspace_id)
            )
          )
          with check (
            exists (
              select 1 from public.interviews i
              where i.id = interview_attendees.interview_id
                and public.is_workspace_member(i.workspace_id)
            )
          )
      $pol$, t);
    else
      execute format($pol$
        create policy "members all" on public.%I
          for all
          using (public.is_workspace_member(workspace_id))
          with check (public.is_workspace_member(workspace_id))
      $pol$, t);
    end if;
  end loop;
end $$;

-- =============================================================================
-- DONE.
-- Next steps:
--   • Run supabase/seed.sql for demo data (optional).
--   • Sign up a real user via supabase.auth.signUp() — they’ll get an auth.users row.
--   • Insert a row into workspaces — the bootstrap trigger creates the admin team_member.
--   • From there, every other table is gated by RLS and works automatically.
-- =============================================================================
