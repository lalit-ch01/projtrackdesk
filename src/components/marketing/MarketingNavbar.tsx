import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FolderKanban, ChevronDown, Menu, X, ArrowRight,
  Sparkles, Layers, BarChart3, Bot, Bell, Shield,
  GraduationCap, Building2, Users, BookOpen, FileText,
  Wrench, Calculator, Lightbulb, Newspaper, LifeBuoy, Code2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type MenuItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  desc: string;
};

type MenuSection = {
  label: string;
  items: MenuItem[];
};

const productMenu: MenuSection[] = [
  {
    label: 'Platform',
    items: [
      { title: 'Features overview', href: '/features', icon: Sparkles, desc: 'All capabilities at a glance' },
      { title: 'Workflows', href: '/workflows', icon: Layers, desc: 'Project lifecycle automation' },
      { title: 'Analytics', href: '/analytics', icon: BarChart3, desc: 'Real-time insights & reports' },
      { title: 'AI Assistant', href: '/ai-assistant', icon: Bot, desc: 'Natural-language queries' },
    ],
  },
  {
    label: 'Capabilities',
    items: [
      { title: 'Notifications', href: '/notifications', icon: Bell, desc: 'Email + WhatsApp reminders' },
      { title: 'Rubrics', href: '/rubrics-feature', icon: Shield, desc: 'Consistent grading criteria' },
      { title: 'Integrations', href: '/integrations', icon: Code2, desc: 'Connect your stack' },
      { title: 'Security', href: '/security', icon: Shield, desc: 'Enterprise-grade trust' },
    ],
  },
];

const solutionsMenu: MenuSection[] = [
  {
    label: 'By Use Case',
    items: [
      { title: 'Capstone Projects', href: '/use-cases/capstone', icon: GraduationCap, desc: 'Final-year, multi-phase' },
      { title: 'Internships', href: '/use-cases/internships', icon: Building2, desc: 'External mentor tracking' },
      { title: 'Research Labs', href: '/use-cases/research', icon: Lightbulb, desc: 'Long-running studies' },
      { title: 'Hackathons', href: '/use-cases/hackathons', icon: Sparkles, desc: 'Sprint evaluations' },
    ],
  },
  {
    label: 'By Role',
    items: [
      { title: 'For Coordinators', href: '/services/coordinators', icon: Users, desc: 'Run programs at scale' },
      { title: 'For Faculty', href: '/services/faculty', icon: GraduationCap, desc: 'Grade with confidence' },
      { title: 'For Students', href: '/services/students', icon: BookOpen, desc: 'Stay on track' },
      { title: 'For HODs', href: '/services/hods', icon: Building2, desc: 'Department-wide visibility' },
    ],
  },
];

const resourcesMenu: MenuSection[] = [
  {
    label: 'Learn',
    items: [
      { title: 'Blog', href: '/blog', icon: Newspaper, desc: 'Insights & best practices' },
      { title: 'Resource Library', href: '/resources', icon: BookOpen, desc: 'Guides, ebooks, templates' },
      { title: 'Documentation', href: '/docs', icon: FileText, desc: 'Technical reference' },
      { title: 'Help Center', href: '/help', icon: LifeBuoy, desc: 'FAQs & support' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { title: 'All free tools', href: '/tools', icon: Wrench, desc: 'Calculators & utilities' },
      { title: 'ROI Calculator', href: '/tools/roi-calculator', icon: Calculator, desc: 'Estimate your savings' },
      { title: 'Rubric Builder', href: '/tools/rubric-builder', icon: Shield, desc: 'Design criteria fast' },
      { title: 'Templates', href: '/tools/templates', icon: FileText, desc: 'Project starter packs' },
    ],
  },
];

const simpleLinks = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Customers', href: '/testimonials' },
  { label: 'Results', href: '/results' },
];

const MegaPanel = ({ sections }: { sections: MenuSection[] }) => (
  <div className="grid w-[640px] grid-cols-2 gap-8 p-6">
    {sections.map((section) => (
      <div key={section.label}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {section.label}
        </p>
        <ul className="space-y-1">
          {section.items.map((item) => (
            <li key={item.title}>
              <Link
                to={item.href}
                className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-secondary"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground">{item.title}</span>
                  <span className="block text-xs text-muted-foreground">{item.desc}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const MarketingNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location.pathname]);

  const menus = [
    { key: 'product', label: 'Product', sections: productMenu },
    { key: 'solutions', label: 'Solutions', sections: solutionsMenu },
    { key: 'resources', label: 'Resources', sections: resourcesMenu },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border/60 bg-background/80 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary shadow-sm">
            <FolderKanban className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-base font-bold text-foreground">
            ProjTrack <span className="font-normal text-muted-foreground">Desk</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setOpenMenu(null)}
        >
          {menus.map((menu) => (
            <div
              key={menu.key}
              className="relative"
              onMouseEnter={() => setOpenMenu(menu.key)}
            >
              <button
                className={cn(
                  'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  openMenu === menu.key
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {menu.label}
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 transition-transform',
                    openMenu === menu.key && 'rotate-180',
                  )}
                />
              </button>
              {openMenu === menu.key && (
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                  <div className="overflow-hidden rounded-2xl border border-border bg-popover shadow-xl animate-fade-in">
                    <MegaPanel sections={menu.sections} />
                    <div className="flex items-center justify-between border-t border-border bg-secondary/40 px-6 py-3">
                      <p className="text-xs text-muted-foreground">Explore everything ProjTrack offers</p>
                      <Link
                        to="/features"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                      >
                        View all <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {simpleLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                location.pathname === l.href
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/contact">
            <Button variant="ghost" size="sm">Contact sales</Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link to="/login">
            <Button size="sm" className="gradient-primary border-0 gap-1.5 shadow-sm">
              Start free <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container mx-auto max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-4">
            {menus.map((menu) => (
              <details key={menu.key} className="group border-b border-border/60 py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-sm font-semibold text-foreground">
                  {menu.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="space-y-4 pb-3 pt-1">
                  {menu.sections.map((section) => (
                    <div key={section.label}>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {section.label}
                      </p>
                      <ul>
                        {section.items.map((item) => (
                          <li key={item.title}>
                            <Link
                              to={item.href}
                              className="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-foreground hover:bg-secondary"
                            >
                              <item.icon className="h-4 w-4 text-primary" />
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
            ))}
            <div className="border-b border-border/60 py-2">
              {simpleLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="block rounded-md px-2 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2 pt-4">
              <Link to="/contact">
                <Button variant="outline" className="w-full">Contact sales</Button>
              </Link>
              <Link to="/login">
                <Button variant="ghost" className="w-full">Sign in</Button>
              </Link>
              <Link to="/login">
                <Button className="w-full gradient-primary border-0 gap-1.5">
                  Start free <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MarketingNavbar;
