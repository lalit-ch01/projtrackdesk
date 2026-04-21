import { Shield, Sliders, Layers, MessageSquare, Eye, History } from 'lucide-react';
import FeatureDetailLayout from '@/components/marketing/FeatureDetailLayout';

const RubricsMarketingPage = () => (
  <FeatureDetailLayout
    eyebrow="Rubrics"
    title={<>Consistent grading, <span className="text-gradient">at any scale</span></>}
    description="Build, share, and apply rubrics that survive faculty rotations and produce defensible scores."
    heroBullets={['Visual builder', 'Weighted criteria', 'Calibration analytics']}
    capabilitiesTitle="Rubric tooling"
    capabilities={[
      { icon: Shield, title: 'Visual Builder', description: 'Define criteria, weights, and descriptors in minutes.' },
      { icon: Sliders, title: 'Weighted Scoring', description: 'Auto-compute totals with safeguards against weight drift.' },
      { icon: Layers, title: 'Reusable Templates', description: 'Share rubrics across programs and terms.' },
      { icon: MessageSquare, title: 'Inline Feedback', description: 'Comment per-criterion so students know exactly what to improve.' },
      { icon: Eye, title: 'Calibration View', description: 'See grader variance and tighten consistency before publish.' },
      { icon: History, title: 'Version History', description: 'Track every rubric change with rollback support.' },
    ]}
    highlightStats={[
      { value: '−60%', label: 'Grading time' },
      { value: '+22%', label: 'Feedback quality' },
      { value: '14×', label: 'Faster setup' },
      { value: '∞', label: 'Templates' },
    ]}
    faqs={[
      { q: 'Can I import rubrics from Excel?', a: 'Yes — drop in a CSV with criteria and weights to bootstrap a rubric.' },
      { q: 'Do students see the rubric?', a: 'You choose: hidden, blind during submission, or visible with descriptors.' },
    ]}
  />
);

export default RubricsMarketingPage;
