import { Building2, BarChart3, FileCheck, Globe2, Users2, Shield } from 'lucide-react';
import FeatureDetailLayout from '@/components/marketing/FeatureDetailLayout';

const HodsServicePage = () => (
  <FeatureDetailLayout
    eyebrow="For HODs & Deans"
    title={<>Department-wide <span className="text-gradient">visibility</span></>}
    description="Multi-program rollups, accreditation reports, and the metrics leadership needs to make decisions."
    heroBullets={['Multi-program rollups', 'NAAC/NBA-ready', 'Cohort comparisons']}
    capabilitiesTitle="Leadership-grade tools"
    capabilities={[
      { icon: BarChart3, title: 'Program Rollups', description: 'See every program, batch, and metric in one view.' },
      { icon: Users2, title: 'Cohort Comparisons', description: 'Compare year-over-year and across programs.' },
      { icon: FileCheck, title: 'Audit-Ready Exports', description: 'Tagged exports built for accreditation reviewers.' },
      { icon: Building2, title: 'Multi-Department', description: 'Centralize across departments while respecting boundaries.' },
      { icon: Globe2, title: 'Public Metrics', description: 'Optional dashboards to share program outcomes externally.' },
      { icon: Shield, title: 'Governance Controls', description: 'Approval matrices and policy enforcement, by design.' },
    ]}
    highlightStats={[
      { value: '3×', label: 'Faster reporting' },
      { value: '12+', label: 'Accreditation templates' },
      { value: '∞', label: 'Departments' },
      { value: '99.9%', label: 'Uptime SLA' },
    ]}
    ctaTitle="See your department in one screen"
    ctaDescription="Book a leadership demo with our customer success team."
  />
);

export default HodsServicePage;
