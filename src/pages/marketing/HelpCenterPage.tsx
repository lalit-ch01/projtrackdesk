import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MessageSquare, Mail, Phone, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/marketing/PageHero';
import SectionHeading from '@/components/marketing/SectionHeading';
import CTASection from '@/components/marketing/CTASection';

const faqs = [
  { cat: 'Account', q: 'How do I reset my password?', a: 'Click "Forgot password" on the login page. We\'ll email you a secure reset link.' },
  { cat: 'Account', q: 'Can I change my email address?', a: 'Yes — go to Settings → Profile and update your email. We\'ll send a confirmation.' },
  { cat: 'Billing', q: 'How do I update my payment method?', a: 'Admins can update billing info from Settings → Billing.' },
  { cat: 'Billing', q: 'Do you offer annual discounts?', a: 'Yes — save 20% on annual billing. Visible in your billing portal.' },
  { cat: 'Workflows', q: 'Can I edit a workflow after launch?', a: 'Yes. Edits apply to new submissions; existing ones continue on their original path.' },
  { cat: 'Workflows', q: 'How do I duplicate a program?', a: 'Use Programs → ⋯ → Duplicate. Stages, rubrics, and notifications come along.' },
  { cat: 'Notifications', q: 'Why aren\'t my WhatsApp messages sending?', a: 'Check the Notifications log. Most issues are recipient opt-out or invalid numbers.' },
  { cat: 'Integrations', q: 'How do I connect Google Workspace SSO?', a: 'Settings → Security → SSO → Google Workspace. Full guide in our Docs.' },
];

const HelpCenterPage = () => {
  const [q, setQ] = useState('');
  const filtered = faqs.filter((f) => q === '' || (f.q + f.a + f.cat).toLowerCase().includes(q.toLowerCase()));
  const cats = Array.from(new Set(filtered.map((f) => f.cat)));

  return (
    <>
      <PageHero
        eyebrow="Help Center"
        title={<>How can we <span className="text-gradient">help?</span></>}
        description="Search our FAQs or reach out — we typically reply within 1 business day."
      >
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search FAQs..." className="h-12 pl-10 text-base" />
        </div>
      </PageHero>

      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4 lg:px-6">
          {cats.length === 0 && <p className="py-16 text-center text-sm text-muted-foreground">No FAQs match your search.</p>}
          {cats.map((cat) => (
            <div key={cat} className="mb-10">
              <h3 className="mb-4 font-display text-lg font-bold text-foreground">{cat}</h3>
              <div className="divide-y divide-border rounded-2xl border border-border bg-card">
                {filtered.filter((f) => f.cat === cat).map((f) => (
                  <details key={f.q} className="group p-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-foreground">
                      {f.q}
                      <span className="text-xl text-muted-foreground transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading title="Still stuck?" description="Choose your favourite way to reach us." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: MessageSquare, title: 'Live chat', desc: 'Mon–Fri, 9am–9pm IST', cta: 'Start chat', href: '/contact' },
              { icon: Mail, title: 'Email support', desc: 'support@projtrack.com', cta: 'Send email', href: '/contact' },
              { icon: Phone, title: 'Call us', desc: '+91 80 4567 8900', cta: 'Call now', href: '/contact' },
              { icon: BookOpen, title: 'Browse docs', desc: 'Self-serve technical references', cta: 'Open docs', href: '/docs' },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-6">
                <c.icon className="h-6 w-6 text-primary" />
                <h4 className="mt-4 font-display text-base font-semibold">{c.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                <Link to={c.href}><Button variant="outline" size="sm" className="mt-4">{c.cta}</Button></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default HelpCenterPage;
