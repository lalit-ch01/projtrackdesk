import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FolderKanban, CalendarDays, Bell, BarChart3, Bot, Shield, 
  CheckCircle2, ArrowRight, Star, Users, Zap, Globe 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import DummyDataPanel from '@/components/DummyDataPanel';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const features = [
  { icon: FolderKanban, title: 'Project Lifecycle', desc: 'Manage projects from topic submission to final evaluation with automated workflows.' },
  { icon: CalendarDays, title: 'Smart Calendar', desc: 'Visual timeline with all deadlines, reviews, and milestones color-coded by type.' },
  { icon: Bell, title: 'Auto Reminders', desc: 'Email & WhatsApp notifications 1 week, 3 days, and 24 hours before every deadline.' },
  { icon: BarChart3, title: 'Analytics & Reports', desc: 'Real-time dashboards with student-wise, guide-wise, and category-wise views.' },
  { icon: Bot, title: 'AI Assistant', desc: 'Ask questions about progress, defaulters, and submissions in natural language.' },
  { icon: Shield, title: 'Rubric-Based Grading', desc: 'Define assessment criteria and grade consistently across all submissions.' },
];

const pricing = [
  { name: 'Starter', price: 'Free', period: 'forever', desc: 'For small departments', features: ['Up to 50 students', '2 project activities', 'Basic analytics', 'Email notifications'], popular: false },
  { name: 'Professional', price: '₹4,999', period: '/month', desc: 'For growing institutions', features: ['Up to 500 students', 'Unlimited projects', 'Advanced analytics', 'WhatsApp + Email', 'AI Assistant', 'Custom rubrics'], popular: true },
  { name: 'Enterprise', price: 'Custom', period: '', desc: 'For universities', features: ['Unlimited students', 'Multi-department', 'API access', 'Priority support', 'Custom integrations', 'SLA guarantee'], popular: false },
];

const stats = [
  { value: '50K+', label: 'Students Managed' },
  { value: '1,200+', label: 'Projects Completed' },
  { value: '98%', label: 'On-time Rate' },
  { value: '4.9★', label: 'User Rating' },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <DummyDataPanel />
      
      {/* Nav */}
      <header className="fixed top-0 z-30 w-full glass">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <FolderKanban className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold font-display text-foreground">ProjTrack <span className="text-muted-foreground font-normal text-sm">Desk</span></span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#stats" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Results</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/login">
              <Button size="sm" className="gradient-primary border-0">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 gradient-hero opacity-[0.03]" />
        <div className="container mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
              <Zap className="h-3.5 w-3.5" /> Academic Project Management, Reimagined
            </span>
          </motion.div>
          <motion.h1 
            className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl font-display"
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
          >
            Streamline Every Project{' '}
            <span className="text-gradient">From Idea to Completion</span>
          </motion.h1>
          <motion.p 
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
          >
            ProjTrack Desk automates the entire academic project lifecycle — scheduling, reminders, grading, and analytics — so students, guides, and coordinators stay perfectly in sync.
          </motion.p>
          <motion.div className="mt-10 flex items-center justify-center gap-4" initial="hidden" animate="visible" variants={fadeUp} custom={3}>
            <Link to="/login">
              <Button size="lg" className="gradient-primary border-0 gap-2 px-8 text-base shadow-glow">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="text-base">See How It Works</Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="border-y bg-secondary/50 py-16">
        <div className="container mx-auto grid grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <p className="text-3xl font-extrabold text-foreground font-display lg:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground font-display lg:text-4xl">Everything You Need to Manage Projects</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">15 powerful features designed for academic excellence</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="group rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:gradient-primary group-hover:text-primary-foreground">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground font-display">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="bg-secondary/50 py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground font-display lg:text-4xl">Built for Every Role</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { role: 'Admin (HOD)', icon: Shield, desc: 'Oversee departments, manage users, view system-wide analytics.' },
              { role: 'Coordinator', icon: Users, desc: 'Create projects, schedule reviews, allocate guides, manage rubrics.' },
              { role: 'Guide / Faculty', icon: Star, desc: 'Review topics, grade submissions, track student progress.' },
              { role: 'Student', icon: Globe, desc: 'Submit topics, track deadlines, view grades and feedback.' },
            ].map((r, i) => (
              <motion.div key={r.role} className="rounded-xl border bg-card p-6 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <r.icon className="h-7 w-7" />
                </div>
                <h3 className="text-base font-semibold text-card-foreground font-display">{r.role}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground font-display lg:text-4xl">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-lg text-muted-foreground">Start free. Scale when you're ready.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {pricing.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`relative rounded-2xl border p-8 ${plan.popular ? 'border-primary shadow-glow ring-2 ring-primary/20' : 'bg-card'}`}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-primary px-4 py-1 text-xs font-semibold text-primary-foreground">Most Popular</span>
                )}
                <h3 className="text-lg font-semibold text-foreground font-display">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.desc}</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-extrabold text-foreground font-display">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/login">
                  <Button className={`w-full ${plan.popular ? 'gradient-primary border-0' : ''}`} variant={plan.popular ? 'default' : 'outline'}>
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero py-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-foreground font-display lg:text-4xl">Ready to Transform Academic Project Management?</h2>
          <p className="mt-4 text-lg text-primary-foreground/70 max-w-xl mx-auto">Join hundreds of institutions already using ProjTrack Desk.</p>
          <div className="mt-8">
            <Link to="/login">
              <Button size="lg" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 gap-2 px-8 text-base">
                Start Your Free Trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto flex flex-col items-center gap-4 px-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <FolderKanban className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold font-display text-foreground">ProjTrack Desk</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 ProjTrack Desk. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
