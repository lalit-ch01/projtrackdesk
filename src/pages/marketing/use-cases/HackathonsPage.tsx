import { Sparkles, Trophy, Users, Clock, Award, Zap } from 'lucide-react';
import FeatureDetailLayout from '@/components/marketing/FeatureDetailLayout';

const HackathonsPage = () => (
  <FeatureDetailLayout
    eyebrow="Use Case · Hackathons"
    title={<>Run <span className="text-gradient">hackathons</span> in minutes</>}
    description="Sprint-style evaluations with quick rubrics, judge panels, and instant leaderboards."
    heroBullets={['Launch in 10 min', 'Live leaderboards', 'One-click certificates']}
    capabilitiesTitle="Hackathon toolkit"
    capabilities={[
      { icon: Zap, title: 'Quick Setup', description: 'Pre-built event templates — go live in 10 minutes.' },
      { icon: Sparkles, title: 'Quick Rubrics', description: 'Three-criteria rubrics designed for fast scoring.' },
      { icon: Users, title: 'Judge Panels', description: 'Auto-assign judges to submissions with conflict detection.' },
      { icon: Trophy, title: 'Live Leaderboards', description: 'Real-time standings — public or private.' },
      { icon: Clock, title: 'Sprint Timers', description: 'Built-in countdowns for hacking, judging, and demos.' },
      { icon: Award, title: 'Auto Certificates', description: 'Bulk-generate winner and participation certificates.' },
    ]}
    highlightStats={[
      { value: '10 min', label: 'To launch' },
      { value: '5,000+', label: 'Submissions / event' },
      { value: '0', label: 'Spreadsheets' },
      { value: '< 1s', label: 'Leaderboard refresh' },
    ]}
    faqs={[
      { q: 'Can we white-label the event page?', a: 'Yes — custom logo, colors, and domain on Professional and above.' },
      { q: 'Do you support team submissions?', a: 'Yes. Teams of any size, with per-team chat and submission threads.' },
    ]}
  />
);

export default HackathonsPage;
