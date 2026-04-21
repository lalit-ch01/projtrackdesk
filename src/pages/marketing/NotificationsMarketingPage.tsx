import { Bell, Mail, MessageCircle, Users, Clock, Smartphone } from 'lucide-react';
import FeatureDetailLayout from '@/components/marketing/FeatureDetailLayout';

const NotificationsMarketingPage = () => (
  <FeatureDetailLayout
    eyebrow="Notifications"
    title={<>Reach the right person on the <span className="text-gradient">right channel</span></>}
    description="Email, WhatsApp, and in-app — orchestrated to nudge the right people at the right moment."
    heroBullets={['Email + WhatsApp + in-app', 'Smart timing', 'Read receipts']}
    capabilitiesTitle="Notification capabilities"
    capabilities={[
      { icon: Bell, title: 'Smart Reminders', description: 'Auto-fire 1 week, 3 days, and 24 hours before every deadline.' },
      { icon: Mail, title: 'Branded Email', description: 'Beautiful templates with your institution\'s logo and colors.' },
      { icon: MessageCircle, title: 'WhatsApp Business', description: 'Reach students where they actually read.' },
      { icon: Users, title: 'Audience Rules', description: 'Target by role, cohort, project, or risk level.' },
      { icon: Clock, title: 'Quiet Hours', description: 'Respect time zones and after-hours preferences.' },
      { icon: Smartphone, title: 'In-App Inbox', description: 'A single feed of everything that needs attention.' },
    ]}
    highlightStats={[
      { value: '92%', label: 'Open rate (WhatsApp)' },
      { value: '+34%', label: 'On-time submissions' },
      { value: '3', label: 'Channels' },
      { value: '0', label: 'Setup steps' },
    ]}
    faqs={[
      { q: 'Do I need a WhatsApp Business account?', a: 'No — we provide a managed sending number on Professional and above.' },
      { q: 'Can students opt out?', a: 'Yes. Channel preferences are user-controlled and respected automatically.' },
    ]}
  />
);

export default NotificationsMarketingPage;
