import { Link } from 'react-router-dom';
import { ArrowRight, Users, GraduationCap, BookOpen, Building2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/marketing/PageHero';
import CTASection from '@/components/marketing/CTASection';

const services = [
  {
    id: 'coordinators',
    icon: Users,
    title: 'For Coordinators',
    pitch: 'Run department-wide programs at scale without losing the details.',
    benefits: ['Auto-allocate guides to projects', 'Schedule reviews in one click', 'Defaulter detection & nudges', 'Termly analytics reports'],
  },
  {
    id: 'faculty',
    icon: GraduationCap,
    title: 'For Faculty / Guides',
    pitch: 'Spend less time on admin and more time mentoring students.',
    benefits: ['Unified review queue', 'Rubric-based grading', 'Comment threads per submission', 'Smart reminders for pending reviews'],
  },
  {
    id: 'students',
    icon: BookOpen,
    title: 'For Students',
    pitch: 'Always know what is due, what was graded, and what is next.',
    benefits: ['Personalised deadline calendar', 'Submission status tracking', 'Feedback in one place', 'WhatsApp + email reminders'],
  },
  {
    id: 'hods',
    icon: Building2,
    title: 'For HODs / Deans',
    pitch: 'Department-wide visibility and accreditation-ready reports.',
    benefits: ['Multi-program rollups', 'Cohort comparisons', 'Audit-ready exports', 'NAAC / NBA report templates'],
  },
];

const ServicesPage = () => {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>Tailored for <span className="text-gradient">every stakeholder</span></>}
        description="A focused experience for each role — coordinators, faculty, students, and leadership."
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-2 lg:px-6">
          {services.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-lg"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-card-foreground">{s.title}</h3>
              <p className="mt-2 text-base text-muted-foreground">{s.pitch}</p>
              <ul className="mt-5 space-y-2">
                {s.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {b}
                  </li>
                ))}
              </ul>
              <Link to={`/services/${s.id}`} className="mt-6 inline-block">
                <Button variant="outline" className="gap-2">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default ServicesPage;
