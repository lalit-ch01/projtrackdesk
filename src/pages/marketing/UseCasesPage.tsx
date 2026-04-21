import { GraduationCap, Building2, Lightbulb, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/marketing/PageHero';
import SectionHeading from '@/components/marketing/SectionHeading';
import CTASection from '@/components/marketing/CTASection';

const cases = [
  {
    id: 'capstone',
    icon: GraduationCap,
    title: 'Capstone Projects',
    summary: 'Run final-year capstones across multiple phases with panel reviews and rubric grading.',
    bullets: ['3-phase reviews (proposal → mid → final)', 'Panel-based scoring with rubric', 'Anti-plagiarism checks', 'Final repository archive'],
    metric: { value: '40%', label: 'reduction in coordinator hours' },
  },
  {
    id: 'internships',
    icon: Building2,
    title: 'Internships',
    summary: 'Track external internships with industry mentors, weekly logs, and final reports.',
    bullets: ['External mentor invites', 'Weekly log submissions', 'Mid-internship feedback', 'Final report grading'],
    metric: { value: '2x', label: 'on-time submission rate' },
  },
  {
    id: 'research',
    icon: Lightbulb,
    title: 'Research Labs',
    summary: 'Long-running research projects with milestone tracking and publication management.',
    bullets: ['Milestone-based timelines', 'Publication tracking', 'Lab resource allocation', 'Multi-PI collaboration'],
    metric: { value: '3x', label: 'visibility into lab output' },
  },
  {
    id: 'hackathons',
    icon: Sparkles,
    title: 'Hackathons',
    summary: 'Sprint-style evaluations with quick rubrics, judge panels, and instant leaderboards.',
    bullets: ['Quick-create rubrics', 'Judge panel assignment', 'Real-time leaderboards', 'One-click certificates'],
    metric: { value: '10 min', label: 'to launch a new event' },
  },
];

const UseCasesPage = () => {
  return (
    <>
      <PageHero
        eyebrow="Use Cases"
        title={<>One platform, <span className="text-gradient">every program</span></>}
        description="From capstones to hackathons, ProjTrack adapts to how your institution actually runs projects."
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto space-y-16 px-4 lg:px-6">
          {cases.map((c, i) => (
            <div key={c.id} id={c.id} className="grid items-center gap-10 lg:grid-cols-2">
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-3xl font-bold text-foreground">{c.title}</h3>
                <p className="mt-3 text-base text-muted-foreground">{c.summary}</p>
                <ul className="mt-5 space-y-2">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {b}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="mt-6 inline-block">
                  <Button variant="outline" className="gap-2">
                    Talk to an expert <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-accent/10 p-10 shadow-lg">
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
                  <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
                  <div className="relative">
                    <p className="font-display text-6xl font-extrabold text-gradient">{c.metric.value}</p>
                    <p className="mt-2 text-sm font-medium text-muted-foreground">{c.metric.label}</p>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {c.bullets.slice(0, 4).map((b) => (
                        <div key={b} className="rounded-lg border border-border/60 bg-background/60 p-3 text-xs text-muted-foreground">
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading title="Don't see your use case?" description="We work with institutions running every kind of project program. Tell us yours." />
          <div className="text-center">
            <Link to="/contact">
              <Button size="lg" className="gradient-primary border-0">Book a discovery call</Button>
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default UseCasesPage;
