import { BookOpen, CalendarDays, Bell, MessageSquare, Smartphone, Star } from 'lucide-react';
import FeatureDetailLayout from '@/components/marketing/FeatureDetailLayout';

const StudentsServicePage = () => (
  <FeatureDetailLayout
    eyebrow="For Students"
    title={<>Always know <span className="text-gradient">what's next</span></>}
    description="Every deadline, every grade, and every piece of feedback — all in one calm dashboard."
    heroBullets={['Personal calendar', 'Live status', 'WhatsApp reminders']}
    capabilitiesTitle="Designed for student peace-of-mind"
    capabilities={[
      { icon: CalendarDays, title: 'Personal Calendar', description: 'Your deadlines, reviews, and milestones in one view.' },
      { icon: BookOpen, title: 'Status Tracking', description: 'Know exactly where each submission stands.' },
      { icon: MessageSquare, title: 'All Feedback in One Place', description: 'No more digging through emails for guide comments.' },
      { icon: Bell, title: 'Smart Reminders', description: '1 week, 3 days, and 24 hours before every due date.' },
      { icon: Smartphone, title: 'Mobile-First', description: 'Works beautifully on the device you actually use.' },
      { icon: Star, title: 'Grade Insights', description: 'Understand your scores criterion by criterion.' },
    ]}
    highlightStats={[
      { value: '4.9/5', label: 'Student rating' },
      { value: '+34%', label: 'On-time submissions' },
      { value: '0', label: 'Lost emails' },
      { value: '24/7', label: 'Mobile access' },
    ]}
  />
);

export default StudentsServicePage;
