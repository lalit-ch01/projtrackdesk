import { useState } from 'react';
import { Calculator, RefreshCw, ArrowRight, TrendingUp, Clock, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageHero from '@/components/marketing/PageHero';
import SectionHeading from '@/components/marketing/SectionHeading';
import CTASection from '@/components/marketing/CTASection';

const RoiCalculatorPage = () => {
  const [students, setStudents] = useState(300);
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [hourlyCost, setHourlyCost] = useState(800);
  const [reviewers, setReviewers] = useState(20);

  const hoursSavedMonthly = Math.round(hoursPerWeek * 0.45 * 4); // 45% saved
  const reviewerHoursSaved = Math.round(reviewers * 2 * 4); // 2 hrs/wk per reviewer
  const totalHoursMonthly = hoursSavedMonthly + reviewerHoursSaved;
  const monthlySaving = totalHoursMonthly * hourlyCost;
  const yearlySaving = monthlySaving * 12;

  const reset = () => { setStudents(300); setHoursPerWeek(15); setHourlyCost(800); setReviewers(20); };

  return (
    <>
      <PageHero
        eyebrow="Tool"
        title={<>ROI <span className="text-gradient">Calculator</span></>}
        description="Estimate the time and rupees ProjTrack can recover for your institution."
      />

      <section className="py-12 lg:py-16">
        <div className="container mx-auto max-w-5xl px-4 lg:px-6">
          <div className="rounded-2xl border border-border bg-card p-6 lg:p-10">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Calculator className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-card-foreground">Your inputs</h2>
                <p className="text-sm text-muted-foreground">Adjust to match your program.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <Label htmlFor="students">Students per term</Label>
                <Input id="students" type="number" value={students} onChange={(e) => setStudents(+e.target.value || 0)} />
              </div>
              <div>
                <Label htmlFor="hours">Coordinator hrs / week</Label>
                <Input id="hours" type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(+e.target.value || 0)} />
              </div>
              <div>
                <Label htmlFor="reviewers">Active reviewers</Label>
                <Input id="reviewers" type="number" value={reviewers} onChange={(e) => setReviewers(+e.target.value || 0)} />
              </div>
              <div>
                <Label htmlFor="cost">Avg hourly cost (₹)</Label>
                <Input id="cost" type="number" value={hourlyCost} onChange={(e) => setHourlyCost(+e.target.value || 0)} />
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Clock, label: 'Hours saved / month', value: totalHoursMonthly.toLocaleString('en-IN') },
                { icon: Wallet, label: 'Monthly saving (₹)', value: monthlySaving.toLocaleString('en-IN') },
                { icon: TrendingUp, label: 'Yearly saving (₹)', value: yearlySaving.toLocaleString('en-IN') },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-secondary/40 p-5">
                  <s.icon className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-xs text-muted-foreground">{s.label}</p>
                  <p className="mt-1 font-display text-2xl font-extrabold text-gradient">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={reset} className="gap-2"><RefreshCw className="h-4 w-4" /> Reset</Button>
              <Link to="/contact"><Button variant="outline" className="gap-2">Talk to sales <ArrowRight className="h-4 w-4" /></Button></Link>
            </div>
          </div>

          <div className="mt-10">
            <SectionHeading title="How we calculate" description="Conservative estimates based on benchmarks from 200+ institutions." align="left" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                'Coordinators save ~45% of their weekly admin time.',
                'Each active reviewer saves ~2 hours per week with the unified queue.',
                'Defaulter detection reduces follow-up time by ~70%.',
              ].map((t) => (
                <div key={t} className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection title="Ready to capture these savings?" description="Pilot ProjTrack free for 14 days." />
    </>
  );
};

export default RoiCalculatorPage;
