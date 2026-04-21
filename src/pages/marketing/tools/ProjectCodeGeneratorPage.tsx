import { useMemo, useState } from 'react';
import { Copy, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageHero from '@/components/marketing/PageHero';
import CTASection from '@/components/marketing/CTASection';

const ProjectCodeGeneratorPage = () => {
  const [dept, setDept] = useState('CSE');
  const [year, setYear] = useState('26');
  const [program, setProgram] = useState('CAP');
  const [start, setStart] = useState(1);
  const [count, setCount] = useState(20);
  const [copied, setCopied] = useState(false);

  const codes = useMemo(() =>
    Array.from({ length: Math.max(0, Math.min(count, 200)) }, (_, i) =>
      `${dept}-${program}-${year}-${String(start + i).padStart(3, '0')}`
    ), [dept, program, year, start, count]);

  const copyAll = async () => {
    await navigator.clipboard.writeText(codes.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <PageHero
        eyebrow="Tool"
        title={<>Project <span className="text-gradient">code generator</span></>}
        description="Generate consistent project codes for your cohort in seconds."
      />

      <section className="py-12 lg:py-16">
        <div className="container mx-auto max-w-4xl px-4 lg:px-6">
          <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div>
                <Label htmlFor="dept">Dept code</Label>
                <Input id="dept" maxLength={5} value={dept} onChange={(e) => setDept(e.target.value.toUpperCase())} />
              </div>
              <div>
                <Label htmlFor="program">Program</Label>
                <Input id="program" maxLength={5} value={program} onChange={(e) => setProgram(e.target.value.toUpperCase())} />
              </div>
              <div>
                <Label htmlFor="year">Year (yy)</Label>
                <Input id="year" maxLength={2} value={year} onChange={(e) => setYear(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="start">Start #</Label>
                <Input id="start" type="number" value={start} onChange={(e) => setStart(+e.target.value || 1)} />
              </div>
              <div>
                <Label htmlFor="count">Count</Label>
                <Input id="count" type="number" value={count} onChange={(e) => setCount(+e.target.value || 0)} />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={copyAll} className="gap-2">
                {copied ? <><CheckCircle2 className="h-4 w-4" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy all</>}
              </Button>
              <Button variant="outline" onClick={() => { setStart(1); setCount(20); }} className="gap-2">
                <RefreshCw className="h-4 w-4" /> Reset
              </Button>
            </div>

            <div className="mt-6 max-h-80 overflow-auto rounded-xl border border-border bg-background p-4">
              <pre className="font-mono text-xs leading-6 text-foreground">
                {codes.join('\n') || 'No codes — increase the count.'}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <CTASection title="Want auto-codes built in?" description="ProjTrack generates project codes automatically with your scheme." />
    </>
  );
};

export default ProjectCodeGeneratorPage;
