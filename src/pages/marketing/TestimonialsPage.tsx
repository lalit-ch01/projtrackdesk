import { Star, Quote } from 'lucide-react';
import PageHero from '@/components/marketing/PageHero';
import LogoCloud from '@/components/marketing/LogoCloud';
import CTASection from '@/components/marketing/CTASection';
import SectionHeading from '@/components/marketing/SectionHeading';

const testimonials = [
  { name: 'Dr. Anita Sharma', role: 'HOD, Computer Science', org: 'NIT Trichy', quote: 'ProjTrack cut our coordinator workload in half. Reviews now finish in days, not weeks.', rating: 5 },
  { name: 'Prof. Rajesh Kumar', role: 'Dean of Engineering', org: 'VIT Vellore', quote: 'The analytics alone justify the cost. We finally see exactly where students get stuck.', rating: 5 },
  { name: 'Karan Mehta', role: 'Final-year Student', org: 'BITS Pilani', quote: 'No more confusion about what is due. The reminders and dashboard keep me on track.', rating: 5 },
  { name: 'Dr. Priya Iyer', role: 'Project Coordinator', org: 'IIT Bombay', quote: 'Setup took an afternoon. Three terms in, we cannot imagine going back.', rating: 5 },
  { name: 'Prof. Sneha Rao', role: 'Faculty Mentor', org: 'SRM University', quote: 'The rubric workflow finally made grading consistent across 14 different guides.', rating: 5 },
  { name: 'Aarav Patel', role: 'Capstone Lead', org: 'Manipal Institute', quote: 'Our on-time submission rate went from 71% to 96% in one term. Real numbers.', rating: 5 },
];

const TestimonialsPage = () => {
  return (
    <>
      <PageHero
        eyebrow="Customers"
        title={<>Loved by <span className="text-gradient">institutions</span> worldwide</>}
        description="Hear from coordinators, faculty, and students using ProjTrack every day."
      />

      <LogoCloud title="Used by teams at" />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="relative rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <Quote className="absolute right-5 top-5 h-7 w-7 text-primary/15" />
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm text-foreground">"{t.quote}"</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary font-display text-sm font-bold text-primary-foreground">
                    {t.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role} · {t.org}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading title="A 4.9★ average across 800+ reviews" description="Independently rated on G2, Capterra, and SoftwareSuggest." />
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default TestimonialsPage;
