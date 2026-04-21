import { CheckCircle2, Clock, Hammer, Lightbulb } from 'lucide-react';
import PageHero from '@/components/marketing/PageHero';
import CTASection from '@/components/marketing/CTASection';

type Status = 'shipped' | 'in_progress' | 'planned' | 'exploring';

const items: { title: string; desc: string; status: Status; quarter: string }[] = [
  { title: 'AI Assistant v2 — multi-step queries', status: 'in_progress', quarter: 'Q2 2026', desc: 'Compose multi-step questions and get one synthesized answer.' },
  { title: 'WhatsApp two-way replies', status: 'in_progress', quarter: 'Q2 2026', desc: 'Students reply on WhatsApp; messages land in their submission thread.' },
  { title: 'Mobile app (iOS + Android)', status: 'planned', quarter: 'Q3 2026', desc: 'Native apps focused on student & faculty workflows.' },
  { title: 'Custom report builder', status: 'planned', quarter: 'Q3 2026', desc: 'Drag-and-drop visualisations on top of your project data.' },
  { title: 'Calendar sync improvements', status: 'shipped', quarter: 'Q1 2026', desc: 'Two-way sync with Google and Outlook, plus richer event metadata.' },
  { title: 'Rubric calibration view', status: 'shipped', quarter: 'Q1 2026', desc: 'See grader variance and tighten consistency before publish.' },
  { title: 'Inline plagiarism scoring', status: 'shipped', quarter: 'Q4 2025', desc: 'Native similarity scoring on every submission.' },
  { title: 'Federated multi-institution', status: 'exploring', quarter: 'Future', desc: 'Cross-institution programs with shared rubrics.' },
  { title: 'Offline-first mobile mode', status: 'exploring', quarter: 'Future', desc: 'Submit and review without a connection; sync later.' },
];

const meta: Record<Status, { label: string; icon: typeof Hammer; cls: string }> = {
  shipped: { label: 'Shipped', icon: CheckCircle2, cls: 'border-success/30 bg-success/10 text-success' },
  in_progress: { label: 'In progress', icon: Hammer, cls: 'border-primary/30 bg-primary/10 text-primary' },
  planned: { label: 'Planned', icon: Clock, cls: 'border-warning/30 bg-warning/10 text-warning' },
  exploring: { label: 'Exploring', icon: Lightbulb, cls: 'border-accent/30 bg-accent/10 text-accent' },
};

const RoadmapPage = () => {
  const groups: Status[] = ['in_progress', 'planned', 'shipped', 'exploring'];
  return (
    <>
      <PageHero
        eyebrow="Roadmap"
        title={<>What we're <span className="text-gradient">building next</span></>}
        description="A live view of what we're working on — and what's just around the corner."
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {groups.map((g) => {
              const m = meta[g];
              const list = items.filter((i) => i.status === g);
              return (
                <div key={g} className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${m.cls}`}>
                      <m.icon className="h-3.5 w-3.5" /> {m.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{list.length} items</span>
                  </div>
                  <ul className="space-y-4">
                    {list.map((i) => (
                      <li key={i.title} className="rounded-xl border border-border/60 bg-background p-4">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-semibold text-foreground">{i.title}</p>
                          <span className="shrink-0 text-xs text-muted-foreground">{i.quarter}</span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{i.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection title="Have a feature request?" description="Tell us what would unlock more value for your team." />
    </>
  );
};

export default RoadmapPage;
