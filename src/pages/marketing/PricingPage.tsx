import { Link } from 'react-router-dom';
import { CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/marketing/PageHero';
import CTASection from '@/components/marketing/CTASection';
import SectionHeading from '@/components/marketing/SectionHeading';

const tiers = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    desc: 'For small departments getting started.',
    cta: 'Start free',
    href: '/login',
    popular: false,
    features: ['Up to 50 students', '2 project activities', 'Basic analytics', 'Email notifications', 'Community support'],
    excluded: ['AI Assistant', 'WhatsApp notifications', 'Custom rubrics'],
  },
  {
    name: 'Professional',
    price: '₹4,999',
    period: '/month',
    desc: 'For growing institutions running multiple programs.',
    cta: 'Start 14-day trial',
    href: '/login',
    popular: true,
    features: ['Up to 500 students', 'Unlimited projects', 'Advanced analytics', 'Email + WhatsApp', 'AI Assistant', 'Custom rubrics', 'Priority email support'],
    excluded: ['SSO / SAML', 'API access'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For universities and multi-department deployments.',
    cta: 'Contact sales',
    href: '/contact',
    popular: false,
    features: ['Unlimited students', 'Multi-department', 'API & webhooks', 'SSO / SAML', 'Dedicated CSM', 'Custom integrations', '99.9% SLA'],
    excluded: [],
  },
];

const compare = [
  { feature: 'Students', starter: '50', pro: '500', enterprise: 'Unlimited' },
  { feature: 'Projects per term', starter: '2', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Notifications', starter: 'Email', pro: 'Email + WhatsApp', enterprise: 'Email + WhatsApp + SMS' },
  { feature: 'AI Assistant', starter: false, pro: true, enterprise: true },
  { feature: 'Custom rubrics', starter: false, pro: true, enterprise: true },
  { feature: 'API access', starter: false, pro: false, enterprise: true },
  { feature: 'SSO / SAML', starter: false, pro: false, enterprise: true },
  { feature: 'Support', starter: 'Community', pro: 'Priority email', enterprise: 'Dedicated CSM + SLA' },
];

const faqs = [
  { q: 'Do students count toward my plan?', a: 'Active students per term count. Alumni and inactive accounts do not.' },
  { q: 'Can I switch plans anytime?', a: 'Yes — upgrade or downgrade at any time. Changes are prorated to your billing cycle.' },
  { q: 'Is there an academic discount?', a: 'Yes. Government and non-profit institutions get up to 40% off Professional and Enterprise.' },
  { q: 'How does the free trial work?', a: '14 days of full Professional access. No credit card required to start.' },
];

const renderCell = (v: string | boolean) =>
  typeof v === 'boolean' ? (
    v ? <CheckCircle2 className="mx-auto h-5 w-5 text-success" /> : <X className="mx-auto h-5 w-5 text-muted-foreground/40" />
  ) : (
    <span className="text-sm text-foreground">{v}</span>
  );

const PricingPage = () => {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={<>Simple, transparent <span className="text-gradient">pricing</span></>}
        description="Start free. Pay only when you scale. All plans include unlimited guides and reviewers."
      />

      {/* Tiers */}
      <section className="pb-12 lg:pb-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`relative rounded-2xl border p-7 ${t.popular ? 'border-primary bg-card shadow-glow ring-2 ring-primary/20' : 'border-border bg-card'}`}
              >
                {t.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold text-foreground">{t.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                <div className="mt-6 mb-6">
                  <span className="font-display text-4xl font-extrabold text-foreground">{t.price}</span>
                  <span className="text-sm text-muted-foreground">{t.period}</span>
                </div>
                <Link to={t.href}>
                  <Button className={`w-full ${t.popular ? 'gradient-primary border-0' : ''}`} variant={t.popular ? 'default' : 'outline'}>
                    {t.cta}
                  </Button>
                </Link>
                <ul className="mt-6 space-y-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {f}
                    </li>
                  ))}
                  {t.excluded.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground/60 line-through">
                      <X className="mt-0.5 h-4 w-4 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="border-t border-border bg-secondary/30 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading title="Compare plans" description="Every feature, side by side." />
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[640px] text-left">
              <thead className="border-b border-border bg-secondary/50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-foreground">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Starter</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-primary">Professional</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {compare.map((row) => (
                  <tr key={row.feature} className="border-b border-border last:border-0">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{row.feature}</td>
                    <td className="px-6 py-4 text-center">{renderCell(row.starter)}</td>
                    <td className="px-6 py-4 text-center">{renderCell(row.pro)}</td>
                    <td className="px-6 py-4 text-center">{renderCell(row.enterprise)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
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

      <CTASection />
    </>
  );
};

export default PricingPage;
