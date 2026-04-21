import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Code2, BookOpen, Zap, Database, Shield, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PageHero from '@/components/marketing/PageHero';
import SectionHeading from '@/components/marketing/SectionHeading';
import CTASection from '@/components/marketing/CTASection';

const sections = [
  {
    title: 'Getting started',
    icon: Zap,
    items: [
      { title: 'Quickstart guide', desc: 'Get from signup to first project in 15 minutes.' },
      { title: 'Inviting your team', desc: 'Bulk import users and assign roles.' },
      { title: 'Configuring your first program', desc: 'Stages, rubrics, and notifications, end to end.' },
    ],
  },
  {
    title: 'Core concepts',
    icon: BookOpen,
    items: [
      { title: 'Workflows & stages', desc: 'How submissions move through your program.' },
      { title: 'Rubrics & grading', desc: 'The complete rubric model explained.' },
      { title: 'Notifications', desc: 'Channels, timing, and audience targeting.' },
    ],
  },
  {
    title: 'API reference',
    icon: Code2,
    items: [
      { title: 'Authentication', desc: 'API keys, OAuth, and SCIM provisioning.' },
      { title: 'Resources', desc: 'Projects, submissions, reviews, and users endpoints.' },
      { title: 'Webhooks', desc: 'Subscribe to real-time events.' },
    ],
  },
  {
    title: 'Admin & security',
    icon: Shield,
    items: [
      { title: 'SSO setup', desc: 'Connect Google, Azure AD, Okta, or any SAML IdP.' },
      { title: 'Data export & deletion', desc: 'Self-service tools for compliance.' },
      { title: 'Audit logs', desc: 'What is logged and how to consume it.' },
    ],
  },
  {
    title: 'Integrations',
    icon: Database,
    items: [
      { title: 'Moodle / Canvas', desc: 'Set up native LMS sync.' },
      { title: 'Google Drive / Dropbox', desc: 'Land submissions in your storage.' },
      { title: 'Calendar sync', desc: 'Two-way sync with Google and Outlook.' },
    ],
  },
  {
    title: 'Migration',
    icon: FileText,
    items: [
      { title: 'From spreadsheets', desc: 'Bulk-import users, projects, and history.' },
      { title: 'From Google Forms', desc: 'Map fields and bring history along.' },
      { title: 'From in-house tools', desc: 'Work with our migration team.' },
    ],
  },
];

const DocsPage = () => {
  const [q, setQ] = useState('');
  const filtered = sections
    .map((s) => ({
      ...s,
      items: s.items.filter((i) => (q === '' ? true : (i.title + i.desc).toLowerCase().includes(q.toLowerCase()))),
    }))
    .filter((s) => s.items.length > 0);

  return (
    <>
      <PageHero
        eyebrow="Documentation"
        title={<>Build with <span className="text-gradient">ProjTrack</span></>}
        description="Guides, references, and tutorials for every part of the platform."
      >
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the docs..." className="h-12 pl-10 text-base" />
        </div>
      </PageHero>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">{s.title}</h3>
                </div>
                <ul className="space-y-3">
                  {s.items.map((i) => (
                    <li key={i.title}>
                      <a href="#" className="group block rounded-lg p-2 -mx-2 hover:bg-secondary">
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary">{i.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{i.desc}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {filtered.length === 0 && <p className="py-16 text-center text-sm text-muted-foreground">No docs match your search.</p>}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading title="Still need help?" description="Our team and community are here." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link to="/help" className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg">
              <p className="font-display text-base font-semibold">Help Center</p>
              <p className="mt-1 text-sm text-muted-foreground">Searchable FAQs and tickets.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">Open <ArrowRight className="h-3 w-3" /></span>
            </Link>
            <Link to="/contact" className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg">
              <p className="font-display text-base font-semibold">Contact support</p>
              <p className="mt-1 text-sm text-muted-foreground">Email or chat with our team.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">Reach out <ArrowRight className="h-3 w-3" /></span>
            </Link>
            <Link to="/changelog" className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg">
              <p className="font-display text-base font-semibold">What's new</p>
              <p className="mt-1 text-sm text-muted-foreground">Latest features and fixes.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">Read changelog <ArrowRight className="h-3 w-3" /></span>
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default DocsPage;
