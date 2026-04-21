import { useState } from 'react';
import { Plus, Trash2, Shield, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PageHero from '@/components/marketing/PageHero';
import CTASection from '@/components/marketing/CTASection';

interface Criterion { name: string; weight: number; description: string }

const RubricBuilderPage = () => {
  const [name, setName] = useState('Capstone Final Review');
  const [criteria, setCriteria] = useState<Criterion[]>([
    { name: 'Originality', weight: 25, description: 'Novelty of the idea and approach.' },
    { name: 'Technical depth', weight: 30, description: 'Soundness and complexity of the implementation.' },
    { name: 'Presentation', weight: 20, description: 'Clarity of demo and slides.' },
    { name: 'Documentation', weight: 25, description: 'Quality of report and code comments.' },
  ]);

  const total = criteria.reduce((s, c) => s + (c.weight || 0), 0);

  const update = (i: number, key: keyof Criterion, val: string) => {
    const next = [...criteria];
    (next[i] as any)[key] = key === 'weight' ? Number(val) || 0 : val;
    setCriteria(next);
  };
  const add = () => setCriteria([...criteria, { name: '', weight: 0, description: '' }]);
  const remove = (i: number) => setCriteria(criteria.filter((_, idx) => idx !== i));

  const exportJson = () => {
    const blob = new Blob([JSON.stringify({ name, criteria }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${name.replace(/\s+/g, '-').toLowerCase()}.json`;
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageHero
        eyebrow="Tool"
        title={<>Rubric <span className="text-gradient">Builder</span></>}
        description="Draft a weighted rubric in minutes. Export it and use it anywhere — no signup needed."
      />

      <section className="py-12 lg:py-16">
        <div className="container mx-auto max-w-4xl px-4 lg:px-6">
          <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
            <div className="mb-6">
              <label className="text-sm font-semibold text-foreground">Rubric name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-2" />
            </div>

            <div className="space-y-4">
              {criteria.map((c, i) => (
                <div key={i} className="rounded-xl border border-border bg-background p-4">
                  <div className="grid gap-3 md:grid-cols-[1fr,120px,40px] md:items-start">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground">Criterion</label>
                      <Input value={c.name} onChange={(e) => update(i, 'name', e.target.value)} className="mt-1" placeholder="e.g. Originality" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground">Weight (%)</label>
                      <Input type="number" value={c.weight} onChange={(e) => update(i, 'weight', e.target.value)} className="mt-1" />
                    </div>
                    <div className="flex items-end">
                      <Button variant="ghost" size="icon" onClick={() => remove(i)} aria-label="Remove">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="text-xs font-semibold text-muted-foreground">Descriptor</label>
                    <Textarea value={c.description} onChange={(e) => update(i, 'description', e.target.value)} className="mt-1" rows={2} placeholder="What does excellent look like?" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-secondary/40 px-4 py-3">
              <span className="text-sm text-muted-foreground">Total weight</span>
              <span className={`font-display text-xl font-bold ${total === 100 ? 'text-success' : 'text-warning'}`}>{total}%</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={add} className="gap-2"><Plus className="h-4 w-4" /> Add criterion</Button>
              <Button variant="outline" onClick={exportJson} className="gap-2"><Download className="h-4 w-4" /> Export JSON</Button>
              <Link to="/contact"><Button variant="ghost" className="gap-2"><Shield className="h-4 w-4" /> Get this in ProjTrack</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection title="Want this built into your workflow?" description="Use rubrics with calibration analytics inside ProjTrack." />
    </>
  );
};

export default RubricBuilderPage;
