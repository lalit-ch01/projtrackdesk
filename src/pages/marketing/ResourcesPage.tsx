import { BookOpen, FileText, Video, Download, LifeBuoy, Code2, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '@/components/marketing/PageHero';
import SectionHeading from '@/components/marketing/SectionHeading';
import CTASection from '@/components/marketing/CTASection';

const groups = [
  {
    title: 'Guides & eBooks',
    items: [
      { icon: BookOpen, title: 'The complete capstone playbook', desc: 'A 60-page guide to running capstone programs at scale.', href: '#' },
      { icon: FileText, title: 'Rubric design handbook', desc: 'Templates and examples for every assessment style.', href: '#' },
      { icon: Download, title: 'NAAC reporting templates', desc: 'Pre-built exports mapped to accreditation criteria.', href: '#' },
    ],
  },
  {
    title: 'Webinars & Videos',
    items: [
      { icon: Video, title: 'Live demo: full lifecycle in 30 min', desc: 'Watch a coordinator run a project term end-to-end.', href: '#' },
      { icon: Video, title: 'Faculty roundtable: grading at scale', desc: 'Insights from 8 institutions on grading workflows.', href: '#' },
      { icon: Video, title: 'AI Assistant deep dive', desc: 'How to query your project data with natural language.', href: '#' },
    ],
  },
];

const meta = [
  { id: 'docs', icon: FileText, title: 'Documentation', desc: 'Setup guides, admin handbooks, and product references.' },
  { id: 'help', icon: LifeBuoy, title: 'Help Center', desc: 'Searchable FAQs and troubleshooting articles.' },
  { id: 'integrations', icon: Code2, title: 'Integrations', desc: 'Connect with LMS, SSO, calendar, and storage tools.' },
  { id: 'security', icon: Shield, title: 'Security & Compliance', desc: 'SOC 2 posture, data handling, and trust resources.' },
];

const ResourcesPage = () => {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title={<>Everything you need to <span className="text-gradient">go further</span></>}
        description="Guides, templates, webinars, and docs to get the most out of ProjTrack Desk."
      />

      {groups.map((g) => (
        <section key={g.title} className="border-b border-border py-16">
          <div className="container mx-auto px-4 lg:px-6">
            <SectionHeading title={g.title} align="left" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:gradient-primary group-hover:text-primary-foreground">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-card-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    Open <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-secondary/30 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading title="More from ProjTrack" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {meta.map((m) => (
              <Link
                key={m.id}
                to={`/resources#${m.id}`}
                id={m.id}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <m.icon className="h-6 w-6 text-primary" />
                <h4 className="mt-4 font-display text-base font-semibold text-card-foreground">{m.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default ResourcesPage;
