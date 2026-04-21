import { useState } from 'react';
import { Calculator, Shield, FileText, Wrench, ArrowRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageHero from '@/components/marketing/PageHero';
import SectionHeading from '@/components/marketing/SectionHeading';
import CTASection from '@/components/marketing/CTASection';

const tools = [
  { id: 'roi', icon: Calculator, title: 'ROI Calculator', desc: 'Estimate hours saved and cost recovered with ProjTrack.' },
  { id: 'rubric', icon: Shield, title: 'Rubric Builder', desc: 'Quickly draft a rubric with weighted criteria.' },
  { id: 'templates', icon: FileText, title: 'Project Templates', desc: 'Starter packs for capstone, internship, and research programs.' },
  { id: 'naming', icon: Wrench, title: 'Project Code Generator', desc: 'Generate consistent project codes for your cohort.' },
];

const ROICalculator = () => {
  const [students, setStudents] = useState(300);
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [hourlyCost, setHourlyCost] = useState(800);

  const hoursSaved = Math.round(hoursPerWeek * 0.45 * 4); // 45% saved, monthly
  const monthlySaving = hoursSaved * hourlyCost;
  const yearlySaving = monthlySaving * 12;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
      <h3 className="font-display text-xl font-bold text-card-foreground">ROI Calculator</h3>
      <p className="mt-1 text-sm text-muted-foreground">See your projected savings in seconds.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="students">Students per term</Label>
          <Input id="students" type="number" value={students} onChange={(e) => setStudents(+e.target.value || 0)} />
        </div>
        <div>
          <Label htmlFor="hours">Coordinator hrs / week</Label>
          <Input id="hours" type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(+e.target.value || 0)} />
        </div>
        <div>
          <Label htmlFor="cost">Hourly cost (₹)</Label>
          <Input id="cost" type="number" value={hourlyCost} onChange={(e) => setHourlyCost(+e.target.value || 0)} />
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Hours saved / month', value: hoursSaved },
          { label: 'Monthly saving (₹)', value: monthlySaving.toLocaleString('en-IN') },
          { label: 'Yearly saving (₹)', value: yearlySaving.toLocaleString('en-IN') },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-secondary/40 p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-1 font-display text-2xl font-extrabold text-gradient">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button className="gradient-primary border-0 gap-2" onClick={() => { setStudents(300); setHoursPerWeek(15); setHourlyCost(800); }}>
          <RefreshCw className="h-4 w-4" /> Reset
        </Button>
        <Button variant="outline" className="gap-2" asChild>
          <a href="/contact">Talk to sales <ArrowRight className="h-4 w-4" /></a>
        </Button>
      </div>
    </div>
  );
};

const RubricBuilder = () => {
  const [criteria, setCriteria] = useState([
    { name: 'Originality', weight: 25 },
    { name: 'Technical depth', weight: 30 },
    { name: 'Presentation', weight: 20 },
    { name: 'Documentation', weight: 25 },
  ]);
  const total = criteria.reduce((s, c) => s + (c.weight || 0), 0);

  const update = (i: number, key: 'name' | 'weight', val: string) => {
    const next = [...criteria];
    next[i] = { ...next[i], [key]: key === 'weight' ? Number(val) || 0 : val };
    setCriteria(next);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
      <h3 className="font-display text-xl font-bold text-card-foreground">Rubric Builder</h3>
      <p className="mt-1 text-sm text-muted-foreground">Draft a weighted rubric. Total must equal 100.</p>
      <div className="mt-6 space-y-3">
        {criteria.map((c, i) => (
          <div key={i} className="grid grid-cols-[1fr,100px] gap-3">
            <Input value={c.name} onChange={(e) => update(i, 'name', e.target.value)} />
            <Input type="number" value={c.weight} onChange={(e) => update(i, 'weight', e.target.value)} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-secondary/40 px-4 py-3">
        <span className="text-sm text-muted-foreground">Total weight</span>
        <span className={`font-display text-xl font-bold ${total === 100 ? 'text-success' : 'text-warning'}`}>{total}%</span>
      </div>
    </div>
  );
};

const ToolsPage = () => {
  return (
    <>
      <PageHero
        eyebrow="Tools"
        title={<>Free tools for <span className="text-gradient">academic teams</span></>}
        description="Calculators, builders, and templates — no signup required."
      />

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading title="Browse our toolkit" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((t) => (
              <a key={t.id} href={`#${t.id}`} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:gradient-primary group-hover:text-primary-foreground">
                  <t.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-card-foreground">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="roi" className="border-t border-border bg-secondary/30 py-16">
        <div className="container mx-auto max-w-4xl px-4 lg:px-6">
          <ROICalculator />
        </div>
      </section>

      <section id="rubric" className="border-t border-border py-16">
        <div className="container mx-auto max-w-4xl px-4 lg:px-6">
          <RubricBuilder />
        </div>
      </section>

      <CTASection title="Want these built into your workflow?" description="ProjTrack Desk includes ROI tracking, a full rubric builder, and templates — built in." />
    </>
  );
};

export default ToolsPage;
