import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FolderKanban, CalendarDays, Bell, BarChart3, Bot, Shield,
  ArrowRight, Star, Users, Zap, Globe, CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import LogoCloud from '@/components/marketing/LogoCloud';
import SectionHeading from '@/components/marketing/SectionHeading';
import FeatureCard from '@/components/marketing/FeatureCard';
import CTASection from '@/components/marketing/CTASection';

const features = [
  { icon: FolderKanban, title: 'Project Lifecycle', description: 'Manage projects from topic submission to final evaluation with automated workflows.' },
  { icon: CalendarDays, title: 'Smart Calendar', description: 'Visual timeline with all deadlines, reviews, and milestones color-coded by type.' },
  { icon: Bell, title: 'Auto Reminders', description: 'Email & WhatsApp notifications 1 week, 3 days, and 24 hours before every deadline.' },
  { icon: BarChart3, title: 'Analytics & Reports', description: 'Real-time dashboards with student-wise, guide-wise, and category-wise views.' },
  { icon: Bot, title: 'AI Assistant', description: 'Ask questions about progress, defaulters, and submissions in natural language.' },
  { icon: Shield, title: 'Rubric-Based Grading', description: 'Define assessment criteria and grade consistently across all submissions.' },
];

const stats = [
  { value: '50K+', label: 'Students Managed' },
  { value: '1,200+', label: 'Projects Completed' },
  { value: '98%', label: 'On-time Rate' },
  { value: '4.9★', label: 'User Rating' },
];

const roles = [
  { role: 'Admin (HOD)', icon: Shield, desc: 'Oversee departments, manage users, view system-wide analytics.' },
  { role: 'Coordinator', icon: Users, desc: 'Create projects, schedule reviews, allocate guides, manage rubrics.' },
  { role: 'Guide / Faculty', icon: Star, desc: 'Review topics, grade submissions, track student progress.' },
  { role: 'Student', icon: Globe, desc: 'Submit topics, track deadlines, view grades and feedback.' },
];

const LandingPage = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-20 pt-12 lg:pb-28 lg:pt-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_50%)]" />
        <div className="container mx-auto px-4 text-center lg:px-6">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary"
          >
            <Zap className="h-3.5 w-3.5" /> Academic Project Management, Reimagined
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mx-auto mt-6 max-w-4xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Streamline Every Project{' '}
            <span className="text-gradient">From Idea to Completion</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground lg:text-lg"
          >
            ProjTrack Desk automates the entire academic project lifecycle — scheduling, reminders, grading, and analytics — so students, guides, and coordinators stay perfectly in sync.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link to="/login">
              <Button size="lg" className="gradient-primary border-0 gap-2 px-8 text-base shadow-glow">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="text-base">
                See How It Works
              </Button>
            </Link>
          </motion.div>
          <p className="mt-5 text-xs text-muted-foreground">
            <CheckCircle2 className="mr-1 inline h-3.5 w-3.5 text-success" />
            No credit card required · 14-day pilot · Cancel anytime
          </p>
        </div>
      </section>

      <LogoCloud />

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto grid grid-cols-2 gap-8 px-4 md:grid-cols-4 lg:px-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-center"
            >
              <p className="font-display text-3xl font-extrabold text-foreground lg:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow="Features"
            title="Everything you need to manage projects"
            description="15 powerful features designed for academic excellence — out of the box."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/features">
              <Button variant="outline" className="gap-2">
                Explore all features <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="border-t border-border bg-secondary/30 py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading title="Built for every role" eyebrow="Solutions" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {roles.map((r, i) => (
              <motion.div
                key={r.role}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <r.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-base font-semibold text-card-foreground">{r.role}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default LandingPage;
