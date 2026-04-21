import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/marketing/PageHero';
import SectionHeading from '@/components/marketing/SectionHeading';
import CTASection from '@/components/marketing/CTASection';

const openRoles = [
  { team: 'Engineering', title: 'Senior Backend Engineer', location: 'Remote, India', type: 'Full-time' },
  { team: 'Engineering', title: 'Frontend Engineer', location: 'Bengaluru / Remote', type: 'Full-time' },
  { team: 'Design', title: 'Product Designer', location: 'Remote, India', type: 'Full-time' },
  { team: 'Customer', title: 'Customer Success Manager', location: 'Bengaluru', type: 'Full-time' },
  { team: 'Customer', title: 'Onboarding Specialist', location: 'Remote, India', type: 'Full-time' },
  { team: 'Sales', title: 'Account Executive (Higher Ed)', location: 'Remote, India', type: 'Full-time' },
];

const benefits = [
  { title: 'Remote-first', desc: 'Work from anywhere in India. We meet quarterly.' },
  { title: 'Competitive comp', desc: 'Top-of-band salary plus meaningful equity.' },
  { title: 'Generous leave', desc: 'Unlimited PTO with a 25-day minimum.' },
  { title: 'Health cover', desc: 'Comprehensive insurance for you + family.' },
  { title: 'Learning budget', desc: '₹60,000/year for courses, books, and conferences.' },
  { title: 'Home office', desc: '₹50,000 setup grant when you join.' },
];

const CareersPage = () => (
  <>
    <PageHero
      eyebrow="Careers"
      title={<>Build the future of <span className="text-gradient">academic projects</span></>}
      description="Remote-first, India HQ. We hire senior, set context generously, and ship together."
    />

    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-6">
        <SectionHeading title="Open roles" description="Don't see your role? Send us a note — we love hearing from great people." align="left" />
        <div className="grid gap-4">
          {openRoles.map((r) => (
            <a key={r.title} href="mailto:careers@projtrack.com?subject=Application" className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex items-center gap-4">
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">{r.team}</span>
                <div>
                  <p className="font-display text-base font-semibold text-foreground group-hover:text-primary">{r.title}</p>
                  <p className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {r.location}</span>
                    <span className="inline-flex items-center gap-1"><Briefcase className="h-3 w-3" /> {r.type}</span>
                  </p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </a>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t border-border bg-secondary/30 py-16">
      <div className="container mx-auto px-4 lg:px-6">
        <SectionHeading title="Benefits & perks" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-card p-6">
              <h4 className="font-display text-base font-semibold">{b.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <CTASection title="No role fits? Tell us anyway." description="We'd love to hear from operators, educators, and engineers passionate about higher ed." primaryLabel="Email careers" primaryHref="/contact" secondaryLabel="About us" secondaryHref="/about" />
  </>
);

export default CareersPage;
