import { Workflow, Layers, GitBranch, FileText, Zap, Repeat } from 'lucide-react';
import FeatureDetailLayout from '@/components/marketing/FeatureDetailLayout';

const WorkflowsPage = () => (
  <FeatureDetailLayout
    eyebrow="Workflows"
    title={<>Automate your <span className="text-gradient">project lifecycle</span></>}
    description="Stage transitions, approvals, and status updates without manual chasing. Configure once, run every term."
    heroBullets={['No-code stage builder', 'Branching approvals', 'Audit trail on every action']}
    capabilitiesTitle="Workflow superpowers"
    capabilitiesDescription="Everything you need to model how your institution actually runs projects."
    capabilities={[
      { icon: Workflow, title: 'Lifecycle Automation', description: 'Auto-advance topics through review, revision, and final stages with rules.' },
      { icon: Layers, title: 'Multi-Phase Projects', description: 'Configure as many review phases as your program needs — proposal, mid, final.' },
      { icon: GitBranch, title: 'Branching Approvals', description: 'Route topics through guides, panels, or coordinators with conditional logic.' },
      { icon: FileText, title: 'Submissions Hub', description: 'Centralize abstracts, reports, code links, and supporting files in one place.' },
      { icon: Repeat, title: 'Recurring Templates', description: 'Clone successful workflows term over term — never start from scratch.' },
      { icon: Zap, title: 'Instant Triggers', description: 'Fire notifications, allocations, and reports the moment events happen.' },
    ]}
    workflow={[
      { step: '1', title: 'Design', description: 'Drag-and-drop your project stages and approval rules.' },
      { step: '2', title: 'Launch', description: 'Invite students, guides, and panels with one click.' },
      { step: '3', title: 'Run', description: 'Submissions auto-route to the right reviewer at the right stage.' },
      { step: '4', title: 'Report', description: 'Export term-end reports tailored to your audit needs.' },
    ]}
    highlightStats={[
      { value: '−45%', label: 'Coordinator hours' },
      { value: '+34%', label: 'On-time submissions' },
      { value: '0', label: 'Spreadsheets needed' },
      { value: '∞', label: 'Stages supported' },
    ]}
    faqs={[
      { q: 'Can I customize stages per program?', a: 'Yes. Each program can have its own stages, approvers, and SLAs.' },
      { q: 'Can workflows branch based on rubric scores?', a: 'Yes — route topics back for revision automatically when scores fall below a threshold.' },
    ]}
    ctaTitle="Run a workflow your way"
    ctaDescription="Try the workflow builder free for 14 days."
  />
);

export default WorkflowsPage;
