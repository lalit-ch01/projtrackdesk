import { Link } from 'react-router-dom';
import { FolderKanban, Twitter, Linkedin, Github, Youtube, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Integrations', href: '/resources#integrations' },
      { label: 'Changelog', href: '/blog' },
      { label: 'Roadmap', href: '/resources#roadmap' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Services', href: '/services' },
      { label: 'For Coordinators', href: '/services#coordinators' },
      { label: 'For Faculty', href: '/services#faculty' },
      { label: 'For Students', href: '/services#students' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Resource Library', href: '/resources' },
      { label: 'Free Tools', href: '/tools' },
      { label: 'Customer Stories', href: '/testimonials' },
      { label: 'Results', href: '/results' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/about#careers' },
      { label: 'Press', href: '/about#press' },
      { label: 'Partners', href: '/about#partners' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/legal/privacy' },
      { label: 'Terms', href: '/legal/terms' },
      { label: 'Security', href: '/resources#security' },
      { label: 'DPA', href: '/legal/dpa' },
      { label: 'Cookies', href: '/legal/cookies' },
    ],
  },
];

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const MarketingFooter = () => {
  return (
    <footer className="border-t border-border bg-secondary/30">
      {/* Newsletter band */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-12 lg:px-6 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground lg:text-3xl">
                Get product updates & academic tips
              </h3>
              <p className="mt-2 text-sm text-muted-foreground lg:text-base">
                Join 12,000+ coordinators and faculty receiving our monthly newsletter. No spam, unsubscribe anytime.
              </p>
            </div>
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@institution.edu"
                  className="h-11 pl-9"
                  aria-label="Email"
                />
              </div>
              <Button type="submit" size="lg" className="gradient-primary border-0 gap-2">
                Subscribe <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="container mx-auto px-4 py-12 lg:px-6 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                <FolderKanban className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-base font-bold text-foreground">ProjTrack Desk</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The operating system for academic project management — from idea to evaluation.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-5">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-sm font-semibold text-foreground">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-6 lg:flex-row lg:px-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ProjTrack Desk. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
            <Link to="/legal/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/legal/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/legal/cookies" className="hover:text-foreground">Cookies</Link>
            <span className="hidden lg:inline">·</span>
            <span>Made for institutions worldwide 🌍</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MarketingFooter;
