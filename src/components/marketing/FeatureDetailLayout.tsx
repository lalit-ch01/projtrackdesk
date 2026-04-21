import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from './PageHero';
import SectionHeading from './SectionHeading';
import CTASection from './CTASection';
import FeatureCard from './FeatureCard';

export interface DetailCapability {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface DetailFAQ {
  q: string;
  a: string;
}

export interface FeatureDetailLayoutProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  heroBullets?: string[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  capabilitiesTitle?: string;
  capabilitiesDescription?: string;
  capabilities: DetailCapability[];
  highlightTitle?: string;
  highlightDescription?: string;
  highlightStats?: { value: string; label: string }[];
  workflow?: { step: string; title: string; description: string }[];
  faqs?: DetailFAQ[];
  ctaTitle?: string;
  ctaDescription?: string;
}

const FeatureDetailLayout = ({
  eyebrow,
  title,
  description,
  heroBullets,
  primaryCta = { label: 'Start free trial', href: '/login' },
  secondaryCta = { label: 'Talk to sales', href: '/contact' },
  capabilitiesTitle = 'What you get',
  capabilitiesDescription,
  capabilities,
  highlightTitle,
  highlightDescription,
  highlightStats,
  workflow,
  faqs,
  ctaTitle,
  ctaDescription,
}: FeatureDetailLayoutProps) => {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description}>
        <Link to={primaryCta.href}>
          <Button size="lg" className="gradient-primary border-0 gap-2">
            {primaryCta.label} <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link to={secondaryCta.href}>
          <Button size="lg" variant="outline">{secondaryCta.label}</Button>
        </Link>
      </PageHero>

      {heroBullets && heroBullets.length > 0 && (
        <section className="pb-8">
          <div className="container mx-auto px-4 lg:px-6">
            <ul className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {heroBullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-success" /> {b}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-t border-border py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading title={capabilitiesTitle} description={capabilitiesDescription} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <FeatureCard key={c.title} {...c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {highlightStats && highlightStats.length > 0 && (
        <section className="border-t border-border bg-secondary/30 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-6">
            {(highlightTitle || highlightDescription) && (
              <SectionHeading title={highlightTitle ?? ''} description={highlightDescription} />
            )}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {highlightStats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-card p-6 text-center">
                  <p className="font-display text-3xl font-extrabold text-gradient lg:text-4xl">{s.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {workflow && workflow.length > 0 && (
        <section className="border-t border-border py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-6">
            <SectionHeading title="How it works" description="A simple flow your team will love." />
            <ol className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4">
              {workflow.map((w, i) => (
                <li key={w.step} className="relative rounded-2xl border border-border bg-card p-6">
                  <span className="absolute -top-3 left-6 inline-flex h-7 items-center justify-center rounded-full gradient-primary px-3 font-display text-xs font-bold text-primary-foreground">
                    Step {i + 1}
                  </span>
                  <h4 className="mt-2 font-display text-base font-semibold text-card-foreground">{w.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{w.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {faqs && faqs.length > 0 && (
        <section className="border-t border-border bg-secondary/30 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-6">
            <SectionHeading title="Frequently asked questions" />
            <div className="mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card">
              {faqs.map((f) => (
                <details key={f.q} className="group p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-foreground">
                    {f.q}
                    <span className="text-2xl text-muted-foreground transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection title={ctaTitle} description={ctaDescription} />
    </>
  );
};

export default FeatureDetailLayout;
