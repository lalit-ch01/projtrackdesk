import { TrendingUp, Clock, Award, Users2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/marketing/PageHero';
import SectionHeading from '@/components/marketing/SectionHeading';
import CTASection from '@/components/marketing/CTASection';

const headline = [
  { icon: TrendingUp, value: '+34%', label: 'On-time submissions' },
  { icon: Clock, value: '−45%', label: 'Coordinator hours' },
  { icon: Award, value: '+22%', label: 'Average grades' },
  { icon: Users2, value: '4.9 / 5', label: 'Student satisfaction' },
];

const studies = [
  {
    org: 'NIT Trichy',
    metric: '98%',
    metricLabel: 'on-time rate',
    summary: 'Restructured a 1,200-student capstone program with rubric grading and smart reminders.',
    tags: ['Capstone', '1,200 students', '3 phases'],
  },
  {
    org: 'VIT Vellore',
    metric: '60%',
    metricLabel: 'less review time',
    summary: 'Standardised grading across 80+ guides while improving feedback quality scores.',
    tags: ['Multi-program', '80 guides', 'Rubrics'],
  },
  {
    org: 'BITS Pilani',
    metric: '3x',
    metricLabel: 'faster reporting',
    summary: 'Generated NAAC-ready exports in minutes instead of weeks each term.',
    tags: ['Reporting', 'NAAC', 'Multi-dept'],
  },
];

const ResultsPage = () => {
  return (
    <>
      <PageHero
        eyebrow="Results"
        title={<>Outcomes that <span className="text-gradient">move metrics</span></>}
        description="Real numbers from institutions running ProjTrack across multiple terms."
      />

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {headline.map((h) => (
              <div key={h.label} className="rounded-2xl border border-border bg-card p-6 text-center">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <h.icon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-display text-3xl font-extrabold text-gradient">{h.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading title="Customer case studies" description="How real institutions improved their project programs." />
          <div className="grid gap-6 lg:grid-cols-3">
            {studies.map((s) => (
              <div key={s.org} className="rounded-2xl border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.org}</p>
                <p className="mt-3 font-display text-4xl font-extrabold text-gradient">{s.metric}</p>
                <p className="text-sm text-muted-foreground">{s.metricLabel}</p>
                <p className="mt-4 text-sm text-foreground">{s.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <Link to="/contact" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  Read story <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-3xl rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
            <p className="font-display text-2xl font-bold text-foreground">Want results like these?</p>
            <p className="mt-2 text-sm text-muted-foreground">Pilot ProjTrack with your next cohort. We'll help you set up a baseline and measure the impact.</p>
            <Link to="/contact" className="mt-6 inline-block">
              <Button size="lg" className="gradient-primary border-0">Start a pilot</Button>
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default ResultsPage;
