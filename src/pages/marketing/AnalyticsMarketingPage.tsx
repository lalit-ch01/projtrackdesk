import { BarChart3, Database, Sparkles, Globe, PieChart, Activity } from 'lucide-react';
import FeatureDetailLayout from '@/components/marketing/FeatureDetailLayout';

const AnalyticsMarketingPage = () => (
  <FeatureDetailLayout
    eyebrow="Analytics"
    title={<>Real-time <span className="text-gradient">project insights</span></>}
    description="Dashboards that turn submissions into decisions — for coordinators, HODs, and accreditation teams."
    heroBullets={['Live dashboards', 'CSV / PDF / API exports', 'Cohort & term comparisons']}
    capabilitiesTitle="Analytics that scale"
    capabilities={[
      { icon: BarChart3, title: 'Real-time Dashboards', description: 'Student, guide, and category views — drill into any cell with one click.' },
      { icon: PieChart, title: 'Distribution Charts', description: 'See grade spreads, submission velocity, and review throughput at a glance.' },
      { icon: Database, title: 'Exports & APIs', description: 'CSV, PDF, and REST endpoints to feed your BI stack.' },
      { icon: Sparkles, title: 'Predictive Risk', description: 'Flag students likely to miss deadlines days before they do.' },
      { icon: Globe, title: 'Department Rollups', description: 'Compare cohorts, terms, and programs side-by-side.' },
      { icon: Activity, title: 'Live Pulse', description: 'Always-on signal of what is moving and what is stuck.' },
    ]}
    highlightStats={[
      { value: '< 200ms', label: 'Query latency' },
      { value: '120+', label: 'Pre-built reports' },
      { value: '4', label: 'Export formats' },
      { value: '24/7', label: 'Live data' },
    ]}
    faqs={[
      { q: 'Can I build custom dashboards?', a: 'Yes — drag-and-drop widget builder is included in Professional and above.' },
      { q: 'Do you support BI tool integrations?', a: 'Yes. Connect to Looker, Power BI, and Metabase via our REST API or direct database read replicas (Enterprise).' },
    ]}
  />
);

export default AnalyticsMarketingPage;
