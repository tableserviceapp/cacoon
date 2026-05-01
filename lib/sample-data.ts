export type Stage = 'Applied' | 'Screening' | 'Shortlisted' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
export type JobStatus = 'Open' | 'Paused' | 'Draft' | 'Closed' | 'Filled';

export type Recruiter = {
  id: string;
  name: string;
  initial: string;
  role: string;
  email: string;
  workload: number; // active candidates
  capacity: number;
};

export const recruiters: Recruiter[] = [
  { id: 'r1', name: 'Maya Patel', initial: 'M', role: 'Senior Recruiter', email: 'maya@cocoonai.co.uk', workload: 32, capacity: 40 },
  { id: 'r2', name: 'Ross Joseph', initial: 'R', role: 'Founder · Admin', email: 'ross@cocoonai.co.uk', workload: 14, capacity: 25 },
  { id: 'r3', name: 'Daniel Kim', initial: 'D', role: 'Recruiter', email: 'daniel@cocoonai.co.uk', workload: 28, capacity: 35 },
  { id: 'r4', name: 'Sophia Rojas', initial: 'S', role: 'Recruitment Lead', email: 'sophia@cocoonai.co.uk', workload: 19, capacity: 30 },
  { id: 'r5', name: 'James Whittle', initial: 'J', role: 'Hiring Manager', email: 'james@foundationstudio.com', workload: 8, capacity: 15 },
];

export type Job = {
  id: string;
  title: string;
  team: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Part-time';
  status: JobStatus;
  applicants: number;
  shortlisted: number;
  interviewing: number;
  offers: number;
  hiringManager: string;
  recruiterId: string;
  postedDays: number;
  salary: string;
  priority?: 'urgent' | 'high';
};

export const jobs: Job[] = [
  { id: 'j1', title: 'Senior Product Designer', team: 'Design', location: 'London · Hybrid', type: 'Full-time', status: 'Open', applicants: 142, shortlisted: 18, interviewing: 6, offers: 1, hiringManager: 'Eve Daniels', recruiterId: 'r1', postedDays: 14, salary: '£75–95k', priority: 'urgent' },
  { id: 'j2', title: 'Junior Designer', team: 'Design', location: 'London · Remote', type: 'Full-time', status: 'Open', applicants: 287, shortlisted: 24, interviewing: 8, offers: 0, hiringManager: 'Eve Daniels', recruiterId: 'r1', postedDays: 9, salary: '£32–40k' },
  { id: 'j3', title: 'Backend Engineer', team: 'Engineering', location: 'Manchester · Onsite', type: 'Full-time', status: 'Open', applicants: 98, shortlisted: 12, interviewing: 4, offers: 0, hiringManager: 'Marcus Lee', recruiterId: 'r3', postedDays: 21, salary: '£70–85k' },
  { id: 'j4', title: 'Head of Engineering', team: 'Engineering', location: 'London · Hybrid', type: 'Full-time', status: 'Open', applicants: 34, shortlisted: 6, interviewing: 3, offers: 1, hiringManager: 'Marcus Lee', recruiterId: 'r4', postedDays: 28, salary: '£140–170k', priority: 'high' },
  { id: 'j5', title: 'Talent Acquisition Partner', team: 'People', location: 'Remote · UK', type: 'Full-time', status: 'Paused', applicants: 56, shortlisted: 7, interviewing: 0, offers: 0, hiringManager: 'Ross Joseph', recruiterId: 'r2', postedDays: 32, salary: '£60–72k' },
  { id: 'j6', title: 'Marketing Manager', team: 'Marketing', location: 'London · Hybrid', type: 'Full-time', status: 'Draft', applicants: 0, shortlisted: 0, interviewing: 0, offers: 0, hiringManager: 'Ross Joseph', recruiterId: 'r2', postedDays: 0, salary: '£60–75k' },
  { id: 'j7', title: 'Customer Success Lead', team: 'Customer', location: 'London · Hybrid', type: 'Full-time', status: 'Open', applicants: 73, shortlisted: 9, interviewing: 5, offers: 0, hiringManager: 'Sophia Rojas', recruiterId: 'r4', postedDays: 11, salary: '£55–68k' },
  { id: 'j8', title: 'Data Analyst', team: 'Data', location: 'Bristol · Remote', type: 'Contract', status: 'Filled', applicants: 124, shortlisted: 11, interviewing: 0, offers: 0, hiringManager: 'Marcus Lee', recruiterId: 'r3', postedDays: 45, salary: '£450/day' },
  { id: 'j9', title: 'Frontend Engineer', team: 'Engineering', location: 'London · Remote', type: 'Full-time', status: 'Open', applicants: 156, shortlisted: 16, interviewing: 7, offers: 2, hiringManager: 'Marcus Lee', recruiterId: 'r3', postedDays: 18, salary: '£65–80k' },
  { id: 'j10', title: 'Brand Designer', team: 'Design', location: 'Remote · UK', type: 'Part-time', status: 'Closed', applicants: 89, shortlisted: 6, interviewing: 0, offers: 0, hiringManager: 'Eve Daniels', recruiterId: 'r1', postedDays: 60, salary: '£40k pro-rata' },
];

export type Candidate = {
  id: string;
  name: string;
  photo?: string;
  currentRole: string;
  location: string;
  source: string;
  stage: Stage;
  matchScore: number;
  jobId: string;
  recruiterId: string;
  email: string;
  appliedDate: string;
  noticePeriod: string;
  salaryExpectation: string;
  skills: string[];
  experienceYears: number;
};

export const candidates: Candidate[] = [
  { id: 'c1', name: 'Amara Okafor', photo: 'portrait-03', currentRole: 'Product Designer at Wave', location: 'London', source: 'Cocoon match', stage: 'Interview', matchScore: 94, jobId: 'j1', recruiterId: 'r1', email: 'amara@okafor.studio', appliedDate: '2026-04-22', noticePeriod: '1 month', salaryExpectation: '£82k', skills: ['Figma', 'Prototyping', 'Research', 'Design Systems'], experienceYears: 5 },
  { id: 'c2', name: 'Jamie Chen', photo: 'portrait-02', currentRole: 'Engineer at Loop Labs', location: 'London', source: 'LinkedIn', stage: 'Shortlisted', matchScore: 89, jobId: 'j9', recruiterId: 'r3', email: 'jamie.chen@gmail.com', appliedDate: '2026-04-25', noticePeriod: '2 weeks', salaryExpectation: '£72k', skills: ['React', 'TypeScript', 'Next.js', 'GraphQL'], experienceYears: 4 },
  { id: 'c3', name: 'Priya Shah', photo: 'portrait-01', currentRole: 'Senior Designer at Bright & Co', location: 'London', source: 'Referral', stage: 'Offer', matchScore: 92, jobId: 'j1', recruiterId: 'r1', email: 'priya.shah@outlook.com', appliedDate: '2026-04-15', noticePeriod: '1 month', salaryExpectation: '£88k', skills: ['Figma', 'UI', 'Brand', 'Workshops'], experienceYears: 6 },
  { id: 'c4', name: 'Tom Whitford', photo: 'portrait-05', currentRole: 'Product Designer at Forge Studio', location: 'Brighton', source: 'Cocoon match', stage: 'Screening', matchScore: 81, jobId: 'j2', recruiterId: 'r1', email: 'tom.whitford@kingston.ac.uk', appliedDate: '2026-04-26', noticePeriod: '4 weeks', salaryExpectation: '£38k', skills: ['Figma', 'UI', 'Webflow'], experienceYears: 2 },
  { id: 'c5', name: 'Leo Martin', photo: 'portrait-06', currentRole: 'Junior Engineer at Atlas', location: 'Manchester', source: 'Job board', stage: 'Applied', matchScore: 73, jobId: 'j3', recruiterId: 'r3', email: 'leo.martin@ucl.ac.uk', appliedDate: '2026-04-27', noticePeriod: 'Immediate', salaryExpectation: '£68k', skills: ['Python', 'Postgres', 'AWS'], experienceYears: 3 },
  { id: 'c6', name: 'Isla Brown', photo: 'portrait-04', currentRole: 'Designer at Northwind Co', location: 'London', source: 'Cocoon match', stage: 'Interview', matchScore: 86, jobId: 'j2', recruiterId: 'r1', email: 'isla.brown@goldsmiths.ac.uk', appliedDate: '2026-04-23', noticePeriod: '2 weeks', salaryExpectation: '£36k', skills: ['Figma', 'Illustration', 'Motion'], experienceYears: 2 },
  { id: 'c7', name: 'Daniel Park', currentRole: 'Senior Backend Engineer at Stripe', location: 'London', source: 'Direct outreach', stage: 'Shortlisted', matchScore: 91, jobId: 'j4', recruiterId: 'r4', email: 'daniel.park@gmail.com', appliedDate: '2026-04-18', noticePeriod: '3 months', salaryExpectation: '£165k', skills: ['Go', 'Distributed systems', 'Leadership'], experienceYears: 9 },
  { id: 'c8', name: 'Sara Hassan', currentRole: 'Engineering Manager at Monzo', location: 'London', source: 'Cocoon match', stage: 'Interview', matchScore: 88, jobId: 'j4', recruiterId: 'r4', email: 'sara.hassan@gmail.com', appliedDate: '2026-04-19', noticePeriod: '2 months', salaryExpectation: '£155k', skills: ['Leadership', 'Hiring', 'Architecture'], experienceYears: 11 },
  { id: 'c9', name: 'Alex Reid', currentRole: 'CS Lead at Linear', location: 'London', source: 'Referral', stage: 'Hired', matchScore: 90, jobId: 'j7', recruiterId: 'r4', email: 'alex.reid@gmail.com', appliedDate: '2026-04-02', noticePeriod: '1 month', salaryExpectation: '£62k', skills: ['Customer Success', 'Onboarding', 'Sales ops'], experienceYears: 7 },
  { id: 'c10', name: 'Nadia Ahmed', currentRole: 'Frontend Engineer at Octopus Energy', location: 'Remote', source: 'Cocoon match', stage: 'Shortlisted', matchScore: 85, jobId: 'j9', recruiterId: 'r3', email: 'nadia.ahmed@gmail.com', appliedDate: '2026-04-24', noticePeriod: '1 month', salaryExpectation: '£74k', skills: ['React', 'CSS', 'Accessibility'], experienceYears: 5 },
  { id: 'c11', name: 'Kwame Boateng', currentRole: 'Data Analyst at GoCardless', location: 'Bristol', source: 'Job board', stage: 'Rejected', matchScore: 64, jobId: 'j8', recruiterId: 'r3', email: 'kwame.boateng@gmail.com', appliedDate: '2026-04-10', noticePeriod: 'Immediate', salaryExpectation: '£420/day', skills: ['SQL', 'Looker', 'Python'], experienceYears: 4 },
  { id: 'c12', name: 'Mei Wong', currentRole: 'Junior Recruiter at Hired', location: 'London', source: 'LinkedIn', stage: 'Applied', matchScore: 71, jobId: 'j5', recruiterId: 'r2', email: 'mei.wong@gmail.com', appliedDate: '2026-04-28', noticePeriod: '1 month', salaryExpectation: '£60k', skills: ['Sourcing', 'Outreach', 'ATS'], experienceYears: 2 },
  { id: 'c13', name: 'Olivia Marsh', currentRole: 'Brand Designer at Mother', location: 'London', source: 'Referral', stage: 'Offer', matchScore: 93, jobId: 'j1', recruiterId: 'r1', email: 'olivia.marsh@gmail.com', appliedDate: '2026-04-17', noticePeriod: '1 month', salaryExpectation: '£90k', skills: ['Brand', 'Identity', 'Motion'], experienceYears: 7 },
  { id: 'c14', name: 'Fin O’Brien', currentRole: 'Product Designer at Cleo', location: 'Edinburgh', source: 'Cocoon match', stage: 'Screening', matchScore: 79, jobId: 'j1', recruiterId: 'r1', email: 'fin.obrien@gmail.com', appliedDate: '2026-04-26', noticePeriod: '2 weeks', salaryExpectation: '£78k', skills: ['Figma', 'Workshops', 'Strategy'], experienceYears: 6 },
];

export type Interview = {
  id: string;
  candidateId: string;
  jobId: string;
  type: 'Screening call' | 'Hiring manager' | 'Technical' | 'Take-home review' | 'Final round' | 'Culture';
  date: string;
  time: string;
  durationMin: number;
  interviewers: string[];
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled';
  location: 'Zoom' | 'Google Meet' | 'In person';
};

export const interviews: Interview[] = [
  { id: 'i1', candidateId: 'c1', jobId: 'j1', type: 'Hiring manager', date: '2026-05-01', time: '10:00', durationMin: 45, interviewers: ['Eve Daniels', 'Maya Patel'], status: 'Scheduled', location: 'Zoom' },
  { id: 'i2', candidateId: 'c3', jobId: 'j1', type: 'Final round', date: '2026-05-01', time: '14:00', durationMin: 60, interviewers: ['Eve Daniels', 'Ross Joseph'], status: 'Scheduled', location: 'In person' },
  { id: 'i3', candidateId: 'c8', jobId: 'j4', type: 'Hiring manager', date: '2026-05-01', time: '15:30', durationMin: 60, interviewers: ['Marcus Lee', 'Sophia Rojas'], status: 'Scheduled', location: 'Zoom' },
  { id: 'i4', candidateId: 'c6', jobId: 'j2', type: 'Screening call', date: '2026-05-02', time: '11:00', durationMin: 30, interviewers: ['Maya Patel'], status: 'Scheduled', location: 'Google Meet' },
  { id: 'i5', candidateId: 'c2', jobId: 'j9', type: 'Technical', date: '2026-05-04', time: '13:00', durationMin: 90, interviewers: ['Marcus Lee', 'Daniel Kim'], status: 'Scheduled', location: 'Zoom' },
  { id: 'i6', candidateId: 'c14', jobId: 'j1', type: 'Screening call', date: '2026-05-05', time: '09:30', durationMin: 30, interviewers: ['Maya Patel'], status: 'Scheduled', location: 'Google Meet' },
  { id: 'i7', candidateId: 'c9', jobId: 'j7', type: 'Final round', date: '2026-04-30', time: '16:00', durationMin: 60, interviewers: ['Sophia Rojas', 'Ross Joseph'], status: 'Completed', location: 'In person' },
  { id: 'i8', candidateId: 'c7', jobId: 'j4', type: 'Take-home review', date: '2026-05-06', time: '11:00', durationMin: 45, interviewers: ['Marcus Lee'], status: 'Scheduled', location: 'Zoom' },
];

export type Activity = {
  id: string;
  who: string;
  action: string;
  subject: string;
  context?: string;
  when: string;
  initial: string;
  type: 'application' | 'stage' | 'message' | 'interview' | 'offer' | 'note';
};

export const activity: Activity[] = [
  { id: 'a1', who: 'Maya Patel', action: 'moved', subject: 'Amara Okafor', context: 'to Interview · Senior Product Designer', when: '14m ago', initial: 'M', type: 'stage' },
  { id: 'a2', who: 'Cocoon AI', action: 'shortlisted', subject: '8 candidates', context: 'for Junior Designer', when: '32m ago', initial: 'AI', type: 'stage' },
  { id: 'a3', who: 'Eve Daniels', action: 'left feedback for', subject: 'Priya Shah', context: 'on Final round (4.5/5)', when: '1h ago', initial: 'E', type: 'note' },
  { id: 'a4', who: 'Daniel Kim', action: 'sent outreach to', subject: 'Nadia Ahmed', context: 'for Frontend Engineer', when: '2h ago', initial: 'D', type: 'message' },
  { id: 'a5', who: 'Sophia Rojas', action: 'extended offer to', subject: 'Alex Reid', context: 'CS Lead · £62k', when: '5h ago', initial: 'S', type: 'offer' },
  { id: 'a6', who: 'Maya Patel', action: 'scheduled interview with', subject: 'Sara Hassan', context: 'Hiring manager · Thu 15:30', when: 'Yesterday', initial: 'M', type: 'interview' },
  { id: 'a7', who: 'Cocoon AI', action: 'received 12 new applications', subject: 'Senior Product Designer', when: 'Yesterday', initial: 'AI', type: 'application' },
];

export type Conversation = {
  id: string;
  candidateId: string;
  subject: string;
  preview: string;
  unread: boolean;
  flagged: boolean;
  jobTitle: string;
  lastMessageAt: string;
};

export const conversations: Conversation[] = [
  { id: 'm1', candidateId: 'c1', subject: 'Re: Senior Product Designer — next steps', preview: 'Thanks Maya — Tuesday 10am works great. I’ll send through the case studies before then.', unread: true, flagged: true, jobTitle: 'Senior Product Designer', lastMessageAt: '12m ago' },
  { id: 'm2', candidateId: 'c3', subject: 'Offer letter — Senior Product Designer', preview: 'Attaching the signed offer. Looking forward to starting June 15th.', unread: true, flagged: false, jobTitle: 'Senior Product Designer', lastMessageAt: '1h ago' },
  { id: 'm3', candidateId: 'c2', subject: 'Re: Frontend Engineer — technical chat', preview: 'I’ve sent a calendar invite for Friday. Anything specific you’d like me to prepare?', unread: false, flagged: false, jobTitle: 'Frontend Engineer', lastMessageAt: '3h ago' },
  { id: 'm4', candidateId: 'c8', subject: 'Quick question on Head of Eng role', preview: 'Curious about the team size and the current biggest engineering challenge.', unread: true, flagged: true, jobTitle: 'Head of Engineering', lastMessageAt: '5h ago' },
  { id: 'm5', candidateId: 'c10', subject: 'Re: Frontend role intro', preview: 'Happy to chat next week — Wednesday afternoon would suit best.', unread: false, flagged: false, jobTitle: 'Frontend Engineer', lastMessageAt: 'Yesterday' },
  { id: 'm6', candidateId: 'c14', subject: 'Re: Designer role · Edinburgh', preview: 'I can travel down for in-person rounds, no problem.', unread: false, flagged: false, jobTitle: 'Senior Product Designer', lastMessageAt: 'Yesterday' },
  { id: 'm7', candidateId: 'c4', subject: 'Re: Junior Designer interview', preview: 'Confirming Thursday 11am. Will the brief be shared in advance?', unread: true, flagged: false, jobTitle: 'Junior Designer', lastMessageAt: '2 days ago' },
];

export function findCandidate(id: string) {
  return candidates.find((c) => c.id === id);
}

export function findJob(id: string) {
  return jobs.find((j) => j.id === id);
}

export function findRecruiter(id: string) {
  return recruiters.find((r) => r.id === id);
}
