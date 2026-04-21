import { Building2, FileText, MessageSquare, ClipboardCheck, Users, Calendar } from 'lucide-react';
import FeatureDetailLayout from '@/components/marketing/FeatureDetailLayout';

const InternshipsPage = () => (
  <FeatureDetailLayout
    eyebrow="Use Case · Internships"
    title={<>Track every <span className="text-gradient">industry internship</span></>}
    description="Bring external mentors into the loop. Capture weekly logs and grade final reports — without chasing emails."
    heroBullets={['External mentor invites', 'Weekly logs', 'Industry feedback loops']}
    capabilitiesTitle="Internship workflow"
    capabilities={[
      { icon: Building2, title: 'External Mentors', description: 'Invite industry mentors with role-scoped access.' },
      { icon: Calendar, title: 'Weekly Logs', description: 'Students submit short logs that managers and faculty can co-review.' },
      { icon: MessageSquare, title: 'Mid-Internship Check', description: 'Structured feedback loop at the halfway mark.' },
      { icon: ClipboardCheck, title: 'Final Report Grading', description: 'Faculty + mentor co-grading on a shared rubric.' },
      { icon: Users, title: 'Cohort View', description: 'See every intern\'s status across companies and verticals.' },
      { icon: FileText, title: 'Compliance Pack', description: 'Auto-generate offer letter logs and credit attestations.' },
    ]}
    highlightStats={[
      { value: '2×', label: 'On-time submissions' },
      { value: '500+', label: 'Companies onboard' },
      { value: '−70%', label: 'Email volume' },
      { value: '4.8/5', label: 'Mentor satisfaction' },
    ]}
    faqs={[
      { q: 'Do mentors need a paid seat?', a: 'No — external reviewers are included for free on every plan.' },
      { q: 'Can we customize the log template?', a: 'Yes. Define your own fields, frequency, and approvers.' },
    ]}
  />
);

export default InternshipsPage;
