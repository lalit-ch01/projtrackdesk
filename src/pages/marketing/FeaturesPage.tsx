import {
  FolderKanban, CalendarDays, Bell, BarChart3, Bot, Shield,
  Layers, Zap, Users, FileText, Lock, Globe, GitBranch, Workflow,
  MessageSquare, Sparkles, Database, Mail, ArrowRight,
} from 'lucide-react';
import PageHero from '@/components/marketing/PageHero';
import SectionHeading from '@/components/marketing/SectionHeading';
import FeatureCard from '@/components/marketing/FeatureCard';
import CTASection from '@/components/marketing/CTASection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const groups = [
  {
    id: 'workflows',
    title: 'Workflows & Lifecycle',
    description: 'Automate every step from topic submission to final evaluation.',
    items: [
      { icon: Workflow, title: 'Lifecycle Automation', description: 'Stage transitions, approvals, and status updates without manual chasing.' },
      { icon: Layers, title: 'Multi-Phase Projects', description: 'Configure as many review phases as your program needs.' },
      { icon: GitBranch, title: 'Branching Approvals', description: 'Route topics through guides, panels, or coordinators with rules.' },
      { icon: FileText, title: 'Submissions Hub', description: 'Centralize abstracts, reports, code links, and supporting files.' },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics & Reporting',
    description: 'Real-time dashboards that turn submissions into insight.',
    items: [
      { icon: BarChart3, title: 'Real-time Dashboards', description: 'Student-wise, guide-wise, category-wise — drill into any view.' },
      { icon: Database, title: 'Exports & APIs', description: 'CSV, PDF, and REST endpoints for your BI tooling.' },
      { icon: Sparkles, title: 'Predictive Risk', description: 'Flag students likely to miss deadlines before it happens.' },
      { icon: Globe, title: 'Department Rollups', description: 'Compare cohorts, terms, and programs side-by-side.' },
    ],
  },
  {
    id: 'ai',
    title: 'AI Assistant',
    description: 'Ask anything in natural language — get answers grounded in your data.',
    items: [
      { icon: Bot, title: 'Conversational Queries', description: '"Who hasn’t submitted?", "Show top performers" — done.' },
      { icon: MessageSquare, title: 'Smart Summaries', description: 'Auto-generated review notes and progress digests.' },
      { icon: Zap, title: 'Action Suggestions', description: 'Recommended nudges for at-risk students and overdue reviews.' },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Reach the right person on the right channel at the right time.',
    items: [
      { icon: Bell, title: 'Smart Reminders', description: '1 week, 3 days, and 24 hours before every deadline.' },
      { icon: Mail, title: 'Email + WhatsApp', description: 'Multi-channel delivery with read tracking.' },
      { icon: Users, title: 'Audience Rules', description: 'Target by role, cohort, project, or risk level.' },
    ],
  },
  {
    id: 'rubrics',
    title: 'Rubrics & Grading',
    description: 'Consistent, transparent assessment that scales.',
    items: [
      { icon: Shield, title: 'Rubric Builder', description: 'Define criteria, weights, and descriptors visually.' },
      { icon: CalendarDays, title: 'Review Scheduling', description: 'Auto-allocate panels and time slots.' },
      { icon: FolderKanban, title: 'Feedback History', description: 'Every comment and grade preserved and searchable.' },
    ],
  },
  {
    id: 'security',
    title: 'Security & Trust',
    description: 'Enterprise-grade controls baked in from day one.',
    items: [
      { icon: Lock, title: 'Role-Based Access', description: 'Granular permissions per department, role, and project.' },
      { icon: Shield, title: 'SOC 2 Ready', description: 'Audit logs, SSO, and data residency options.' },
      { icon: Database, title: 'Daily Backups', description: 'Point-in-time recovery up to 30 days.' },
    ],
  },
];

const FeaturesPage = () => {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title={<>Everything to run <span className="text-gradient">academic projects</span> end-to-end</>}
        description="A complete platform — workflows, analytics, AI, notifications, rubrics, and security. No add-ons required."
      >
        <Link to="/login"><Button size="lg" className="gradient-primary border-0">Start free trial</Button></Link>
        <Link to="/pricing"><Button size="lg" variant="outline">See pricing</Button></Link>
      </PageHero>

      {groups.map((group) => {
        const groupHref: Record<string, string> = {
          workflows: '/workflows',
          analytics: '/analytics',
          ai: '/ai-assistant',
          notifications: '/notifications',
          rubrics: '/rubrics-feature',
          security: '/security',
        };
        return (
          <section key={group.id} id={group.id} className="border-b border-border py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-6">
              <SectionHeading title={group.title} description={group.description} align="left" />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item, i) => (
                  <FeatureCard key={item.title} {...item} index={i} />
                ))}
              </div>
              {groupHref[group.id] && (
                <div className="mt-10">
                  <Link to={groupHref[group.id]}>
                    <Button variant="outline" className="gap-2">Explore {group.title} <ArrowRight className="h-4 w-4" /></Button>
                  </Link>
                </div>
              )}
            </div>
          </section>
        );
      })}

      <CTASection title="See every feature in action" description="Start a free pilot and explore the full product with your real data." />
    </>
  );
};

export default FeaturesPage;
