import { GraduationCap, Layers, Shield, FileCheck, Users, Award } from 'lucide-react';
import FeatureDetailLayout from '@/components/marketing/FeatureDetailLayout';

const CapstonePage = () => (
  <FeatureDetailLayout
    eyebrow="Use Case · Capstone"
    title={<>Run capstones <span className="text-gradient">end-to-end</span></>}
    description="From topic submission to final viva, manage every phase of your final-year capstones in one place."
    heroBullets={['3-phase reviews', 'Panel grading', 'Final repository archive']}
    capabilitiesTitle="Capstone-ready features"
    capabilities={[
      { icon: GraduationCap, title: 'Topic Approval', description: 'Faculty-led approval flow with revision loops.' },
      { icon: Layers, title: 'Multi-Phase Reviews', description: 'Proposal → Mid → Final, each with its own rubric.' },
      { icon: Users, title: 'Panel Grading', description: 'Distribute scoring across panels with auto-aggregation.' },
      { icon: Shield, title: 'Plagiarism Checks', description: 'Built-in similarity scoring on every submission.' },
      { icon: FileCheck, title: 'Final Repository', description: 'Archive and search every capstone for years to come.' },
      { icon: Award, title: 'Award Tracking', description: 'Tag standout projects for awards and showcases.' },
    ]}
    highlightStats={[
      { value: '40%', label: 'Less coordinator time' },
      { value: '98%', label: 'On-time rate (NIT-T)' },
      { value: '1,200+', label: 'Capstones / term' },
      { value: '3 yrs', label: 'Average customer tenure' },
    ]}
    faqs={[
      { q: 'Can different departments use different rubrics?', a: 'Yes — every program can define its own rubric and stages.' },
      { q: 'Is alumni access supported?', a: 'Read-only alumni access is included for archived projects.' },
    ]}
    ctaTitle="Pilot a capstone term"
    ctaDescription="We help you go live in 2 weeks with a dedicated onboarding lead."
  />
);

export default CapstonePage;
