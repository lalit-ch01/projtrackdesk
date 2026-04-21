import { Users, Calendar, AlertTriangle, BarChart3, Workflow, FileText } from 'lucide-react';
import FeatureDetailLayout from '@/components/marketing/FeatureDetailLayout';

const CoordinatorsServicePage = () => (
  <FeatureDetailLayout
    eyebrow="For Coordinators"
    title={<>Run programs at <span className="text-gradient">scale</span></>}
    description="Auto-allocate guides, schedule reviews, detect defaulters, and ship reports without breaking a sweat."
    heroBullets={['One-click scheduling', 'Auto allocations', 'Defaulter alerts']}
    capabilitiesTitle="What coordinators love"
    capabilities={[
      { icon: Workflow, title: 'Smart Allocations', description: 'Match students to guides based on load, expertise, and history.' },
      { icon: Calendar, title: 'Review Scheduling', description: 'Generate panel slots that respect everyone\'s availability.' },
      { icon: AlertTriangle, title: 'Defaulter Detection', description: 'Auto-flag missed milestones and trigger nudges.' },
      { icon: Users, title: 'Cohort Insights', description: 'See progress at a glance — by guide, batch, or rubric.' },
      { icon: BarChart3, title: 'Term Reports', description: 'NAAC / NBA-ready exports in two clicks.' },
      { icon: FileText, title: 'Audit Trail', description: 'Every action recorded for accreditation reviews.' },
    ]}
    highlightStats={[
      { value: '−45%', label: 'Coordinator hours' },
      { value: '+34%', label: 'On-time rate' },
      { value: '2×', label: 'Faster reporting' },
      { value: '0', label: 'Spreadsheets' },
    ]}
    ctaTitle="Be the calm in the storm"
    ctaDescription="Book a 20-minute walkthrough with a coordinator-in-residence."
  />
);

export default CoordinatorsServicePage;
