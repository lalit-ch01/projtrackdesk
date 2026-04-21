import { GraduationCap, ClipboardCheck, MessageSquare, Bell, Clock, Layers } from 'lucide-react';
import FeatureDetailLayout from '@/components/marketing/FeatureDetailLayout';

const FacultyServicePage = () => (
  <FeatureDetailLayout
    eyebrow="For Faculty"
    title={<>Spend less on admin, <span className="text-gradient">more on mentoring</span></>}
    description="A unified review queue, rubric grading, and inline feedback — so you can focus on what matters."
    heroBullets={['Unified review queue', 'Rubric grading', 'Smart reminders']}
    capabilitiesTitle="What faculty love"
    capabilities={[
      { icon: ClipboardCheck, title: 'Review Queue', description: 'Every pending submission, prioritised by deadline.' },
      { icon: GraduationCap, title: 'Rubric-based Grading', description: 'Score consistently with shared institutional rubrics.' },
      { icon: MessageSquare, title: 'Threaded Feedback', description: 'Discuss submissions inline — no email back-and-forth.' },
      { icon: Bell, title: 'Smart Reminders', description: 'Nudges when reviews approach SLA.' },
      { icon: Clock, title: 'Time Tracking', description: 'Optional timer to log mentoring hours for workload reports.' },
      { icon: Layers, title: 'Bulk Actions', description: 'Approve, request changes, or request re-submit — in batches.' },
    ]}
    highlightStats={[
      { value: '−60%', label: 'Grading time' },
      { value: '+22%', label: 'Feedback quality' },
      { value: '4.9/5', label: 'Faculty NPS' },
      { value: '0', label: 'Tabs to juggle' },
    ]}
  />
);

export default FacultyServicePage;
