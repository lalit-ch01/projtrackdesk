import { Lightbulb, Target, BookMarked, Users2, Beaker, FileText } from 'lucide-react';
import FeatureDetailLayout from '@/components/marketing/FeatureDetailLayout';

const ResearchPage = () => (
  <FeatureDetailLayout
    eyebrow="Use Case · Research Labs"
    title={<>Manage long-running <span className="text-gradient">research programs</span></>}
    description="Milestones, publications, lab resources, and multi-PI collaboration — all in one workspace."
    heroBullets={['Milestone timelines', 'Publication tracking', 'Multi-PI collaboration']}
    capabilitiesTitle="Built for labs"
    capabilities={[
      { icon: Target, title: 'Milestone Timelines', description: 'Plan multi-year projects with quarterly checkpoints.' },
      { icon: BookMarked, title: 'Publication Tracker', description: 'From idea to journal — track every paper through every revision.' },
      { icon: Beaker, title: 'Resource Allocation', description: 'Reserve equipment, compute, and lab time without conflicts.' },
      { icon: Users2, title: 'Multi-PI Collaboration', description: 'Co-PI permissions with clear ownership and audit trail.' },
      { icon: Lightbulb, title: 'Idea Backlog', description: 'Capture ideas, vote, and graduate the best to active projects.' },
      { icon: FileText, title: 'Grant Reporting', description: 'Auto-generate progress reports for funders and committees.' },
    ]}
    highlightStats={[
      { value: '3×', label: 'Lab output visibility' },
      { value: '60%', label: 'Less reporting time' },
      { value: '∞', label: 'Project depth' },
      { value: '120+', label: 'Labs onboard' },
    ]}
    faqs={[
      { q: 'Can scholars submit publications externally?', a: 'Yes — scholars get personal portals to log papers and citations.' },
      { q: 'Do you support multi-institution projects?', a: 'Yes. Cross-institution sharing is supported on Enterprise.' },
    ]}
  />
);

export default ResearchPage;
