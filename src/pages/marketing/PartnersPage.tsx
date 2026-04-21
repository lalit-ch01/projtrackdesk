import { Link } from 'react-router-dom';
import { Handshake, Award, Code2, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/marketing/PageHero';
import SectionHeading from '@/components/marketing/SectionHeading';
import CTASection from '@/components/marketing/CTASection';

const types = [
  { icon: Award, title: 'Reseller Partner', desc: 'Bring ProjTrack to institutions in your region with margin & training.' },
  { icon: Code2, title: 'Technology Partner', desc: 'Build integrations on our open APIs and feature in our marketplace.' },
  { icon: Users, title: 'Implementation Partner', desc: 'Deliver onboarding, training, and configuration services.' },
  { icon: Handshake, title: 'Strategic Partner', desc: 'Co-build category-defining solutions for higher ed.' },
];

const partners = [
  { name: 'EduConnect Solutions', kind: 'Reseller · South India' },
  { name: 'Acuity LMS', kind: 'Technology · LMS Sync' },
  { name: 'NorthStar Consulting', kind: 'Implementation · NAAC' },
  { name: 'BrightPath EdTech', kind: 'Reseller · East India' },
  { name: 'Catalyst Cloud', kind: 'Technology · SSO + IAM' },
  { name: 'Vidya Partners', kind: 'Implementation · NEP 2020' },
];

const PartnersPage = () => (
  <>
    <PageHero
      eyebrow="Partners"
      title={<>Grow with the <span className="text-gradient">ProjTrack ecosystem</span></>}
      description="Resellers, integrators, and technology partners — let's transform academic projects together."
    />

    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-6">
        <SectionHeading title="Partner programs" description="Pick the program that fits your business." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {types.map((t) => (
            <div key={t.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <t.icon className="h-5 w-5" />
              </span>
              <h4 className="mt-4 font-display text-base font-semibold">{t.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t border-border bg-secondary/30 py-16">
      <div className="container mx-auto px-4 lg:px-6">
        <SectionHeading title="Featured partners" description="A small sample of the teams we work with." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <div key={p.name} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-display text-base font-semibold text-foreground">{p.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{p.kind}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto max-w-3xl px-4 text-center lg:px-6">
        <h3 className="font-display text-2xl font-bold text-foreground">Become a partner</h3>
        <p className="mt-2 text-sm text-muted-foreground">Tell us about your business and which program fits. We'll get back within 2 business days.</p>
        <Link to="/contact" className="mt-6 inline-block">
          <Button size="lg" className="gradient-primary border-0 gap-2">Apply now <ArrowRight className="h-4 w-4" /></Button>
        </Link>
      </div>
    </section>

    <CTASection />
  </>
);

export default PartnersPage;
