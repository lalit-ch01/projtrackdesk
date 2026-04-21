import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

const CTASection = ({
  title = 'Ready to transform academic project management?',
  description = 'Join hundreds of institutions using ProjTrack Desk to ship projects on time, every term.',
  primaryLabel = 'Start free trial',
  primaryHref = '/login',
  secondaryLabel = 'Talk to sales',
  secondaryHref = '/contact',
}: CTASectionProps) => (
  <section className="py-16 lg:py-24">
    <div className="container mx-auto px-4 lg:px-6">
      <div className="relative overflow-hidden rounded-3xl gradient-hero px-6 py-14 text-center shadow-xl lg:px-12 lg:py-20">
        <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.25),transparent_60%),radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.25),transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-primary-foreground lg:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base text-primary-foreground/75 lg:text-lg">{description}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to={primaryHref}>
              <Button size="lg" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 gap-2">
                {primaryLabel} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to={secondaryHref}>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                {secondaryLabel}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
