import { Sparkles, Heart, Globe2, Users2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/marketing/PageHero';
import SectionHeading from '@/components/marketing/SectionHeading';
import CTASection from '@/components/marketing/CTASection';

const values = [
  { icon: Sparkles, title: 'Craft', desc: 'We obsess over the details that make great software invisible.' },
  { icon: Heart, title: 'Care', desc: 'Built with and for educators — every decision starts with their reality.' },
  { icon: Globe2, title: 'Impact', desc: 'Better project programs change student outcomes for life.' },
  { icon: Users2, title: 'Trust', desc: 'Security, privacy, and reliability are non-negotiable.' },
];

const team = [
  { name: 'Aarav Mehta', role: 'CEO & Co-founder' },
  { name: 'Priya Iyer', role: 'CTO & Co-founder' },
  { name: 'Rohit Verma', role: 'Head of Product' },
  { name: 'Sneha Rao', role: 'Head of Customer' },
];

const AboutPage = () => {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>We're building the <span className="text-gradient">OS for academic projects</span></>}
        description="Started in 2023 by educators frustrated with spreadsheets, ProjTrack now powers programs across 200+ institutions."
      />

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading title="Our values" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-6 text-center">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/30 py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading title="The team" description="A small, senior team of engineers, designers, and former educators." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="rounded-2xl border border-border bg-card p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full gradient-primary font-display text-lg font-bold text-primary-foreground">
                  {m.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <p className="mt-4 font-display text-base font-semibold">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-3xl px-4 text-center lg:px-6">
          <SectionHeading title="More about us" description="Explore careers, press coverage, and partner programs." />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/careers"><Button variant="outline">Careers</Button></Link>
            <Link to="/press"><Button variant="outline">Press</Button></Link>
            <Link to="/partners"><Button variant="outline">Partners</Button></Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default AboutPage;
