-- =============================================================================
-- COCOON · SEED DATA
-- =============================================================================
-- Mirrors lib/sample-data.ts so the dashboard can be smoke-tested against real
-- Supabase queries during development.
--
-- Run AFTER 20260501000000_init.sql.
-- This must run with the service-role key (Supabase SQL editor or CLI) to
-- bypass RLS — the regular anon/publishable client will be blocked by policies.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- WORKSPACE
-- -----------------------------------------------------------------------------
insert into public.workspaces (id, name, slug, plan, brand_color, careers_url, ai_credits_used, ai_credits_cap, seat_cap)
values (
  '00000000-0000-4000-8000-000000000001',
  'Cocoon',
  'cocoon',
  'growth',
  '#FCD209',
  'https://cocoonai.co.uk/careers',
  2310,
  10000,
  10
)
on conflict (id) do nothing;

-- -----------------------------------------------------------------------------
-- TEAM MEMBERS  (no auth.users yet — link via user_id once people sign up)
-- -----------------------------------------------------------------------------
insert into public.team_members (id, workspace_id, email, full_name, job_title, role, status, capacity, joined_at)
values
  ('10000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000001', 'maya@cocoonai.co.uk',    'Maya Patel',     'Senior Recruiter',     'member',  'active', 40, now()),
  ('10000000-0000-4000-8000-000000000002', '00000000-0000-4000-8000-000000000001', 'ross@cocoonai.co.uk',    'Ross Joseph',    'Founder · Admin',      'admin',   'active', 25, now()),
  ('10000000-0000-4000-8000-000000000003', '00000000-0000-4000-8000-000000000001', 'daniel@cocoonai.co.uk',  'Daniel Kim',     'Recruiter',            'member',  'active', 35, now()),
  ('10000000-0000-4000-8000-000000000004', '00000000-0000-4000-8000-000000000001', 'sophia@cocoonai.co.uk',  'Sophia Rojas',   'Recruitment Lead',     'manager', 'active', 30, now()),
  ('10000000-0000-4000-8000-000000000005', '00000000-0000-4000-8000-000000000001', 'eve@cocoonai.co.uk',     'Eve Daniels',    'Hiring Manager · Design', 'hiring_manager', 'active', 10, now()),
  ('10000000-0000-4000-8000-000000000006', '00000000-0000-4000-8000-000000000001', 'marcus@cocoonai.co.uk',  'Marcus Lee',     'Hiring Manager · Engineering', 'hiring_manager', 'active', 12, now())
on conflict (workspace_id, email) do nothing;

-- -----------------------------------------------------------------------------
-- JOBS
-- -----------------------------------------------------------------------------
insert into public.jobs (id, workspace_id, title, department, location, work_setup, employment_type, seniority, salary_currency, salary_min, salary_max, status, priority, recruiter_id, hiring_manager_id, posted_at)
values
  ('20000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000001', 'Senior Product Designer',  'Design',      'London',     'Hybrid',  'Full-time', 'Senior',   'GBP', 75000, 95000,  'Open',   'urgent', '10000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000005', now() - interval '14 days'),
  ('20000000-0000-4000-8000-000000000002', '00000000-0000-4000-8000-000000000001', 'Junior Designer',          'Design',      'London',     'Remote',  'Full-time', 'Junior',   'GBP', 32000, 40000,  'Open',   'normal', '10000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000005', now() - interval '9 days'),
  ('20000000-0000-4000-8000-000000000003', '00000000-0000-4000-8000-000000000001', 'Backend Engineer',         'Engineering', 'Manchester', 'Onsite',  'Full-time', 'Mid',      'GBP', 70000, 85000,  'Open',   'normal', '10000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000006', now() - interval '21 days'),
  ('20000000-0000-4000-8000-000000000004', '00000000-0000-4000-8000-000000000001', 'Head of Engineering',      'Engineering', 'London',     'Hybrid',  'Full-time', 'Director', 'GBP', 140000, 170000, 'Open',   'high',   '10000000-0000-4000-8000-000000000004', '10000000-0000-4000-8000-000000000006', now() - interval '28 days'),
  ('20000000-0000-4000-8000-000000000005', '00000000-0000-4000-8000-000000000001', 'Talent Acquisition Partner','People',     'Remote · UK','Remote',  'Full-time', 'Senior',   'GBP', 60000, 72000,  'Paused', 'normal', '10000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000002', now() - interval '32 days'),
  ('20000000-0000-4000-8000-000000000006', '00000000-0000-4000-8000-000000000001', 'Marketing Manager',        'Marketing',   'London',     'Hybrid',  'Full-time', 'Manager',  'GBP', 60000, 75000,  'Draft',  'normal', '10000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000002', null),
  ('20000000-0000-4000-8000-000000000007', '00000000-0000-4000-8000-000000000001', 'Frontend Engineer',        'Engineering', 'London',     'Remote',  'Full-time', 'Mid',      'GBP', 65000, 80000,  'Open',   'normal', '10000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000006', now() - interval '18 days')
on conflict (id) do nothing;

-- -----------------------------------------------------------------------------
-- CANDIDATES
-- -----------------------------------------------------------------------------
insert into public.candidates (id, workspace_id, full_name, email, location, current_title, current_company, experience_years, notice_period, salary_expectation, photo_url, skills, source, added_by)
values
  ('30000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000001', 'Amara Okafor',    'amara@okafor.studio',           'London',     'Product Designer',         'Wave',           5, '1 month',   '£82k',  '/assets/photos/portrait-03.jpg', array['Figma','Prototyping','Research','Design Systems'], 'Cocoon match',    '10000000-0000-4000-8000-000000000001'),
  ('30000000-0000-4000-8000-000000000002', '00000000-0000-4000-8000-000000000001', 'Jamie Chen',      'jamie.chen@gmail.com',          'London',     'Engineer',                 'Loop Labs',      4, '2 weeks',   '£72k',  '/assets/photos/portrait-02.jpg', array['React','TypeScript','Next.js','GraphQL'],          'LinkedIn',        '10000000-0000-4000-8000-000000000003'),
  ('30000000-0000-4000-8000-000000000003', '00000000-0000-4000-8000-000000000001', 'Priya Shah',      'priya.shah@outlook.com',        'London',     'Senior Designer',          'Bright & Co',    6, '1 month',   '£88k',  '/assets/photos/portrait-01.jpg', array['Figma','UI','Brand','Workshops'],                  'Referral',        '10000000-0000-4000-8000-000000000001'),
  ('30000000-0000-4000-8000-000000000004', '00000000-0000-4000-8000-000000000001', 'Tom Whitford',    'tom.whitford@kingston.ac.uk',   'Brighton',   'Product Designer',         'Forge Studio',   2, '4 weeks',   '£38k',  '/assets/photos/portrait-05.jpg', array['Figma','UI','Webflow'],                            'Cocoon match',    '10000000-0000-4000-8000-000000000001'),
  ('30000000-0000-4000-8000-000000000005', '00000000-0000-4000-8000-000000000001', 'Leo Martin',      'leo.martin@ucl.ac.uk',          'Manchester', 'Junior Engineer',          'Atlas',          3, 'Immediate', '£68k',  '/assets/photos/portrait-06.jpg', array['Python','Postgres','AWS'],                         'Job board',       '10000000-0000-4000-8000-000000000003'),
  ('30000000-0000-4000-8000-000000000006', '00000000-0000-4000-8000-000000000001', 'Isla Brown',      'isla.brown@goldsmiths.ac.uk',   'London',     'Designer',                 'Northwind Co',   2, '2 weeks',   '£36k',  '/assets/photos/portrait-04.jpg', array['Figma','Illustration','Motion'],                   'Cocoon match',    '10000000-0000-4000-8000-000000000001'),
  ('30000000-0000-4000-8000-000000000007', '00000000-0000-4000-8000-000000000001', 'Daniel Park',     'daniel.park@gmail.com',         'London',     'Senior Backend Engineer',  'Stripe',         9, '3 months',  '£165k', null,                              array['Go','Distributed systems','Leadership'],            'Direct outreach', '10000000-0000-4000-8000-000000000004'),
  ('30000000-0000-4000-8000-000000000008', '00000000-0000-4000-8000-000000000001', 'Sara Hassan',     'sara.hassan@gmail.com',         'London',     'Engineering Manager',      'Monzo',         11, '2 months',  '£155k', null,                              array['Leadership','Hiring','Architecture'],               'Cocoon match',    '10000000-0000-4000-8000-000000000004'),
  ('30000000-0000-4000-8000-000000000009', '00000000-0000-4000-8000-000000000001', 'Olivia Marsh',    'olivia.marsh@gmail.com',        'London',     'Brand Designer',           'Mother',         7, '1 month',   '£90k',  null,                              array['Brand','Identity','Motion'],                        'Referral',        '10000000-0000-4000-8000-000000000001'),
  ('30000000-0000-4000-8000-000000000010', '00000000-0000-4000-8000-000000000001', 'Nadia Ahmed',     'nadia.ahmed@gmail.com',         'Remote',     'Frontend Engineer',        'Octopus Energy', 5, '1 month',   '£74k',  null,                              array['React','CSS','Accessibility'],                      'Cocoon match',    '10000000-0000-4000-8000-000000000003')
on conflict (id) do nothing;

-- -----------------------------------------------------------------------------
-- APPLICATIONS  (candidate × job, with stage + match score)
-- -----------------------------------------------------------------------------
insert into public.applications (workspace_id, job_id, candidate_id, stage, match_score, recruiter_id, applied_at)
values
  -- Senior Product Designer (j1)
  ('00000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000001', 'Interview',   94, '10000000-0000-4000-8000-000000000001', now() - interval '9 days'),
  ('00000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000003', 'Offer',       92, '10000000-0000-4000-8000-000000000001', now() - interval '16 days'),
  ('00000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000009', 'Offer',       93, '10000000-0000-4000-8000-000000000001', now() - interval '14 days'),
  -- Junior Designer (j2)
  ('00000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000002', '30000000-0000-4000-8000-000000000004', 'Screening',   81, '10000000-0000-4000-8000-000000000001', now() - interval '5 days'),
  ('00000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000002', '30000000-0000-4000-8000-000000000006', 'Interview',   86, '10000000-0000-4000-8000-000000000001', now() - interval '8 days'),
  -- Backend Engineer (j3)
  ('00000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000005', 'Applied',     73, '10000000-0000-4000-8000-000000000003', now() - interval '4 days'),
  -- Head of Engineering (j4)
  ('00000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000007', 'Shortlisted', 91, '10000000-0000-4000-8000-000000000004', now() - interval '13 days'),
  ('00000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000008', 'Interview',   88, '10000000-0000-4000-8000-000000000004', now() - interval '12 days'),
  -- Frontend Engineer (j7)
  ('00000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000007', '30000000-0000-4000-8000-000000000002', 'Shortlisted', 89, '10000000-0000-4000-8000-000000000003', now() - interval '6 days'),
  ('00000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000007', '30000000-0000-4000-8000-000000000010', 'Shortlisted', 85, '10000000-0000-4000-8000-000000000003', now() - interval '7 days')
on conflict (job_id, candidate_id) do nothing;

-- -----------------------------------------------------------------------------
-- EMAIL TEMPLATES
-- -----------------------------------------------------------------------------
insert into public.email_templates (workspace_id, name, subject, body, use_count)
values
  ('00000000-0000-4000-8000-000000000001', 'Interview confirmation', 'Your interview with {{company}} on {{date}}', 'Hi {{first_name}},\n\nLooking forward to chatting about the {{job}} role on {{date}}.\n\n— {{recruiter}}', 142),
  ('00000000-0000-4000-8000-000000000001', 'Offer letter intro',     'An offer from {{company}}',                  'Hi {{first_name}},\n\nWe’d love to make you an offer for {{job}}. Details attached.\n\n— {{recruiter}}', 6),
  ('00000000-0000-4000-8000-000000000001', 'Polite rejection',       'Update on your application to {{job}}',      'Hi {{first_name}},\n\nThanks for the time you put into this. We won’t be moving forward, but we appreciated meeting you.\n\n— {{recruiter}}', 412),
  ('00000000-0000-4000-8000-000000000001', 'Outreach (passive)',     '{{first_name}}, would {{job}} interest you?', 'Hi {{first_name}},\n\nI came across your profile and wanted to share a role I think you’d be great for.\n\n— {{recruiter}}', 88)
on conflict do nothing;

-- =============================================================================
-- DONE.
-- =============================================================================
