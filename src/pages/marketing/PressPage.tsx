import { Download, ExternalLink } from 'lucide-react';
import PageHero from '@/components/marketing/PageHero';
import SectionHeading from '@/components/marketing/SectionHeading';
import CTASection from '@/components/marketing/CTASection';

const coverage = [
  { outlet: 'YourStory', date: 'Mar 2026', headline: 'ProjTrack raises Series A to modernize academic project management', href: '#' },
  { outlet: 'EdTech Review', date: 'Feb 2026', headline: 'How ProjTrack is replacing spreadsheets at 200+ Indian institutions', href: '#' },
  { outlet: 'The Hindu', date: 'Jan 2026', headline: 'AI assistants are coming to capstone projects — and faculty are cautiously optimistic', href: '#' },
  { outlet: 'Inc42', date: 'Dec 2025', headline: 'The quiet rise of vertical SaaS in Indian higher ed', href: '#' },
];

const PressPage = () => (
  <>
    <PageHero
      eyebrow="Press"
      title={<>News, <span className="text-gradient">press, and brand</span></>}
      description="Latest stories about ProjTrack and resources for journalists and partners."
    />

    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-6">
        <SectionHeading title="Press coverage" align="left" />
        <div className="grid gap-4">
          {coverage.map((c) => (
            <a key={c.headline} href={c.href} className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.outlet} · {c.date}</p>
                <p className="mt-1 font-display text-base font-semibold text-foreground group-hover:text-primary">{c.headline}</p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </a>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t border-border bg-secondary/30 py-16">
      <div className="container mx-auto px-4 lg:px-6">
        <SectionHeading title="Brand assets" description="Logos, color palette, and product screenshots — packaged for the press." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Logo pack', desc: 'SVG + PNG in light and dark variants.' },
            { title: 'Color palette', desc: 'HEX, RGB, and HSL values.' },
            { title: 'Product screenshots', desc: 'High-res shots of every major view.' },
          ].map((b) => (
            <a key={b.title} href="#" className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
              <Download className="h-5 w-5 text-primary" />
              <h4 className="mt-4 font-display text-base font-semibold text-card-foreground">{b.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">Download (.zip)</span>
            </a>
          ))}
        </div>
      </div>
    </section>

    <CTASection title="Press inquiries" description="Email press@projtrack.com — we usually reply within 24 hours." />
  </>
);

export default PressPage;
