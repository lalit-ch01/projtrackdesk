import { Sparkles, Wrench, Bug, Zap } from 'lucide-react';
import PageHero from '@/components/marketing/PageHero';
import CTASection from '@/components/marketing/CTASection';

type Kind = 'new' | 'improved' | 'fixed' | 'perf';

const releases: { date: string; version: string; entries: { kind: Kind; title: string; desc: string }[] }[] = [
  {
    date: 'Apr 14, 2026', version: 'v4.12.0',
    entries: [
      { kind: 'new', title: 'AI Assistant — smart summaries', desc: 'Auto-generate weekly progress digests for any project.' },
      { kind: 'improved', title: 'Faster review queue', desc: 'Average load time down from 1.4s to 380ms.' },
      { kind: 'fixed', title: 'Calendar export edge case', desc: 'Fixed an issue where multi-day events skipped DST transitions.' },
    ],
  },
  {
    date: 'Mar 27, 2026', version: 'v4.11.0',
    entries: [
      { kind: 'new', title: 'Rubric calibration view', desc: 'Compare grader scores side-by-side before publish.' },
      { kind: 'perf', title: 'Analytics queries 2× faster', desc: 'Re-engineered our query layer for big cohorts.' },
    ],
  },
  {
    date: 'Mar 12, 2026', version: 'v4.10.0',
    entries: [
      { kind: 'new', title: 'WhatsApp Business integration', desc: 'Send branded notifications via WhatsApp.' },
      { kind: 'improved', title: 'Better mobile review flow', desc: 'Touch-optimized scoring on phones and tablets.' },
      { kind: 'fixed', title: 'SSO assertion timeout', desc: 'Increased acceptable clock skew to 5 minutes.' },
    ],
  },
  {
    date: 'Feb 28, 2026', version: 'v4.9.0',
    entries: [
      { kind: 'new', title: 'Bulk allocations', desc: 'Assign 500 students to guides in one click.' },
      { kind: 'fixed', title: 'Deadline timezone display', desc: 'Always show times in the user\'s local zone.' },
    ],
  },
];

const kindMeta: Record<Kind, { label: string; icon: typeof Sparkles; cls: string }> = {
  new: { label: 'New', icon: Sparkles, cls: 'border-primary/30 bg-primary/10 text-primary' },
  improved: { label: 'Improved', icon: Wrench, cls: 'border-accent/30 bg-accent/10 text-accent' },
  fixed: { label: 'Fixed', icon: Bug, cls: 'border-warning/30 bg-warning/10 text-warning' },
  perf: { label: 'Performance', icon: Zap, cls: 'border-success/30 bg-success/10 text-success' },
};

const ChangelogPage = () => (
  <>
    <PageHero
      eyebrow="Changelog"
      title={<>What's <span className="text-gradient">new</span></>}
      description="Every shipped feature, fix, and improvement — biggest hits at the top."
    />

    <section className="py-16 lg:py-24">
      <div className="container mx-auto max-w-3xl px-4 lg:px-6">
        <div className="space-y-10">
          {releases.map((r) => (
            <article key={r.version} className="rounded-2xl border border-border bg-card p-6 lg:p-8">
              <header className="mb-5 flex items-baseline justify-between gap-3">
                <h3 className="font-display text-xl font-bold text-foreground">{r.version}</h3>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </header>
              <ul className="space-y-4">
                {r.entries.map((e) => {
                  const m = kindMeta[e.kind];
                  return (
                    <li key={e.title} className="flex gap-3">
                      <span className={`mt-0.5 inline-flex h-6 shrink-0 items-center gap-1 rounded-full border px-2 text-[10px] font-semibold uppercase tracking-wider ${m.cls}`}>
                        <m.icon className="h-3 w-3" /> {m.label}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{e.title}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">{e.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>

    <CTASection title="Subscribe to our changelog" description="Get a monthly roundup of what shipped." />
  </>
);

export default ChangelogPage;
