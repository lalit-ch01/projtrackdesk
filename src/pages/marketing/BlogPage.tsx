import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PageHero from '@/components/marketing/PageHero';
import CTASection from '@/components/marketing/CTASection';
import { useState } from 'react';

const posts = [
  { slug: '1', tag: 'Product', title: 'Introducing AI Assistant for ProjTrack', excerpt: 'Ask anything in plain English — get answers grounded in your project data.', date: 'Apr 14, 2026', read: '5 min', author: 'Aarav Mehta' },
  { slug: '2', tag: 'Best Practices', title: '7 ways coordinators save 10+ hours a week', excerpt: 'Battle-tested workflows from departments running 500+ student capstones.', date: 'Apr 02, 2026', read: '8 min', author: 'Priya Iyer' },
  { slug: '3', tag: 'Case Study', title: 'How VIT cut review time by 60%', excerpt: 'A deep dive into how a 4,000-student program restructured grading with rubrics.', date: 'Mar 21, 2026', read: '6 min', author: 'Karan Shah' },
  { slug: '4', tag: 'Engineering', title: 'Building real-time analytics on Postgres', excerpt: 'How we power millisecond dashboards across millions of submissions.', date: 'Mar 12, 2026', read: '10 min', author: 'Rohit Verma' },
  { slug: '5', tag: 'Product', title: 'Smart reminders, now on WhatsApp', excerpt: 'Reach students on the channels they actually check — at the moments that matter.', date: 'Feb 28, 2026', read: '4 min', author: 'Aarav Mehta' },
  { slug: '6', tag: 'Best Practices', title: 'Designing rubrics that scale', excerpt: 'A practical guide to defining criteria that survive faculty rotations.', date: 'Feb 14, 2026', read: '7 min', author: 'Sneha Rao' },
  { slug: '7', tag: 'Industry', title: 'NEP 2020 and the future of capstones', excerpt: 'How policy is reshaping project-based learning in Indian higher ed.', date: 'Jan 30, 2026', read: '9 min', author: 'Dr. Anil Gupta' },
  { slug: '8', tag: 'Case Study', title: 'NIT Trichy: 98% on-time rate, every term', excerpt: 'The systems that keep 1,200 students consistently on schedule.', date: 'Jan 15, 2026', read: '6 min', author: 'Priya Iyer' },
];

const tags = ['All', 'Product', 'Best Practices', 'Case Study', 'Engineering', 'Industry'];

const BlogPage = () => {
  const [tag, setTag] = useState('All');
  const [q, setQ] = useState('');
  const filtered = posts.filter(
    (p) =>
      (tag === 'All' || p.tag === tag) &&
      (q === '' || p.title.toLowerCase().includes(q.toLowerCase())),
  );
  const featured = posts[0];

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={<>Insights for modern <span className="text-gradient">academic teams</span></>}
        description="Product updates, best practices, and stories from institutions running great project programs."
      />

      {/* Featured */}
      <section className="pb-12">
        <div className="container mx-auto px-4 lg:px-6">
          <Link
            to={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl lg:grid-cols-2"
          >
            <div className="relative h-64 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 lg:h-full">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.4),transparent_60%)]" />
              <span className="absolute left-6 top-6 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
                Featured
              </span>
            </div>
            <div className="p-8 lg:p-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{featured.tag}</span>
              <h2 className="mt-3 font-display text-2xl font-bold text-card-foreground transition-colors group-hover:text-primary lg:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
              <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {featured.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {featured.read}</span>
                <span>· by {featured.author}</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-6">
        <div className="container mx-auto flex flex-col gap-4 px-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  tag === t
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-muted-foreground hover:border-primary hover:text-foreground'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles..." className="pl-9" />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <article
                key={p.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-40 bg-gradient-to-br from-primary/20 via-accent/15 to-card">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,hsl(var(--accent)/0.25),transparent_55%)]" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.tag}</span>
                  <h3 className="mt-2 font-display text-lg font-bold text-card-foreground transition-colors group-hover:text-primary">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{p.date} · {p.read}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="py-16 text-center text-sm text-muted-foreground">No articles match your search.</p>
          )}
        </div>
      </section>

      <CTASection title="Subscribe to the ProjTrack newsletter" description="Monthly insights for academic project teams. No spam." primaryLabel="Subscribe" primaryHref="/contact" secondaryLabel="View resources" secondaryHref="/resources" />
    </>
  );
};

export default BlogPage;
