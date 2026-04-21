import { Link } from 'react-router-dom';
import { Download, FileText, Layers, Sparkles, GraduationCap, Building2, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/marketing/PageHero';
import SectionHeading from '@/components/marketing/SectionHeading';
import CTASection from '@/components/marketing/CTASection';

const templates = [
  { icon: GraduationCap, title: 'Capstone Project Pack', desc: '3-phase reviews, panel grading, plagiarism flow, NAAC export.', tags: ['Capstone', '3 phases', 'Rubrics'], category: 'Final-year' },
  { icon: Building2, title: 'Internship Tracker', desc: 'External mentors, weekly logs, mid + final review.', tags: ['Internship', 'External mentors'], category: 'Industry' },
  { icon: Lightbulb, title: 'Research Lab Workspace', desc: 'Milestones, publication tracker, multi-PI access.', tags: ['Research', 'Multi-PI'], category: 'Research' },
  { icon: Sparkles, title: 'Hackathon Event', desc: 'Quick rubric, judge panels, live leaderboard, certificates.', tags: ['Hackathon', 'Live'], category: 'Events' },
  { icon: Layers, title: 'Mini-Project (Sem 5)', desc: 'Lightweight 2-phase template for semester projects.', tags: ['Semester', '2 phases'], category: 'Semester' },
  { icon: FileText, title: 'Thesis Workflow (PG)', desc: 'Quarterly reviews, examiner panel, viva scheduling.', tags: ['Thesis', 'PG'], category: 'Postgraduate' },
];

const TemplatesPage = () => (
  <>
    <PageHero
      eyebrow="Tool"
      title={<>Project <span className="text-gradient">templates</span></>}
      description="Pre-built starter packs for every program type. Import in one click — customize from there."
    />

    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-6">
        <SectionHeading title="Pick a starter" description="Each pack ships with stages, rubrics, and notification rules." align="left" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <article key={t.title} className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:gradient-primary group-hover:text-primary-foreground">
                <t.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.category}</p>
              <h3 className="mt-1 font-display text-base font-semibold text-card-foreground">{t.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {t.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">{tag}</span>
                ))}
              </div>
              <div className="mt-5 flex gap-2">
                <Link to="/login" className="flex-1"><Button size="sm" className="w-full gap-2"><Download className="h-4 w-4" /> Use template</Button></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <CTASection title="Need a custom template?" description="Our team builds bespoke program templates for institutions." />
  </>
);

export default TemplatesPage;
