import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/marketing/PageHero';
import CTASection from '@/components/marketing/CTASection';

interface BlogPost {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
  author: string;
  authorRole: string;
  body: string[];
}

const posts: BlogPost[] = [
  {
    slug: '1', tag: 'Product', title: 'Introducing AI Assistant for ProjTrack',
    excerpt: 'Ask anything in plain English — get answers grounded in your project data.',
    date: 'Apr 14, 2026', read: '5 min', author: 'Aarav Mehta', authorRole: 'CEO & Co-founder',
    body: [
      'Today we are introducing AI Assistant — the most ambitious product launch in ProjTrack\'s history. From day one, our mission has been to give academic teams superpowers without burying them in dashboards. AI Assistant takes that one step further: ask any question in plain English and get an answer grounded in your real, live project data.',
      'You can ask questions like "Which students haven\'t submitted phase 2?", "Show me the average rubric scores for the AI/ML cohort", or "Who are the top 5 performers this term?" — and get instant, cited answers in seconds.',
      'Under the hood, AI Assistant uses a permission-aware retrieval layer. That means it never surfaces data the user is not allowed to see. A student asking about their cohort gets a different answer than a coordinator asking about the same group — both correct, both safe.',
      'AI Assistant is rolling out to every Professional and Enterprise customer this week. We can\'t wait to see what you build with it.',
    ],
  },
  {
    slug: '2', tag: 'Best Practices', title: '7 ways coordinators save 10+ hours a week',
    excerpt: 'Battle-tested workflows from departments running 500+ student capstones.',
    date: 'Apr 02, 2026', read: '8 min', author: 'Priya Iyer', authorRole: 'CTO & Co-founder',
    body: [
      'After working with hundreds of project coordinators across India, we have noticed a few patterns that consistently separate the calm, on-top-of-it teams from the ones constantly fighting fires. Here are seven changes that, in our data, save coordinators 10+ hours a week.',
      '1. Replace email reminders with channel-aware automation. Reminders on the channel each user actually checks — WhatsApp for students, email for faculty, in-app for admins.',
      '2. Move rubrics from Word docs to a structured builder. The act of structuring the rubric forces clarity, and the calibration views catch grader drift before publish.',
      '3. Auto-allocate guides instead of negotiating allocations every term. A simple round-robin with a load cap is enough for most departments.',
      '4. Use templates for stages, rubrics, and notifications. The first term takes effort. The next ten take a click.',
      '5. Set hard SLAs on review turnaround and surface them. What gets measured gets managed.',
      '6. Centralize submissions in one place — no more digging through emails and Drive folders.',
      '7. Make defaulter detection automatic. The day a milestone slips, the right people should know.',
    ],
  },
  {
    slug: '3', tag: 'Case Study', title: 'How VIT cut review time by 60%',
    excerpt: 'A deep dive into how a 4,000-student program restructured grading with rubrics.',
    date: 'Mar 21, 2026', read: '6 min', author: 'Karan Shah', authorRole: 'Head of Customer Success',
    body: [
      'When VIT Vellore came to us, their challenge was clear: 4,000 students, 80+ guides, three review phases per term, and a grading process that took 6 weeks every cycle. Faculty were burning out. Students were waiting for feedback that came too late to act on.',
      'We started by mapping every step a guide took to grade a single submission. The result was startling: 18 distinct steps across 4 different tools. Most of those steps could be eliminated.',
      'Phase one was consolidation. We migrated all submissions and grading into ProjTrack and replaced the four-tool dance with a single review queue. Just that change cut review time per submission by 35%.',
      'Phase two was rubric standardization. We replaced 17 different Word-doc rubrics with a single structured rubric, configured per program. Calibration views surfaced grader variance early, which let department leads coach faculty before publish.',
      'Three terms in, average review time per submission is down 60%, faculty NPS is up 28 points, and grading cycles finish in week 2 instead of week 6.',
    ],
  },
  {
    slug: '4', tag: 'Engineering', title: 'Building real-time analytics on Postgres',
    excerpt: 'How we power millisecond dashboards across millions of submissions.',
    date: 'Mar 12, 2026', read: '10 min', author: 'Rohit Verma', authorRole: 'Head of Product',
    body: [
      'Our analytics layer needs to feel instant — when a coordinator filters by cohort, the dashboard should refresh in under 200ms even on databases with millions of submissions.',
      'We built our analytics on Postgres, with a thin materialized-view layer for hot aggregates. Here is the story of how we got there.',
      'The first lesson was that "denormalize for analytics" is a trap. We tried it for six months. The result was a stale, painful-to-maintain second source of truth. Eventually we ripped it out.',
      'Instead, we leaned into Postgres. Materialized views, refreshed on a 30-second cadence for the heaviest aggregates. Plain SQL views for everything else. Result: one source of truth, sub-200ms reads, and a much happier engineering team.',
    ],
  },
  {
    slug: '5', tag: 'Product', title: 'Smart reminders, now on WhatsApp',
    excerpt: 'Reach students on the channels they actually check — at the moments that matter.',
    date: 'Feb 28, 2026', read: '4 min', author: 'Aarav Mehta', authorRole: 'CEO & Co-founder',
    body: [
      'Email is great. WhatsApp is where students actually live. Today we are launching native WhatsApp Business support for ProjTrack notifications.',
      'Every reminder, every status update, every nudge can now go out via WhatsApp — with branded templates, opt-out controls, and read receipts.',
      'Early customers are seeing 92% open rates on WhatsApp messages, vs 38% on email. That delta translates directly into better on-time submission rates.',
    ],
  },
  {
    slug: '6', tag: 'Best Practices', title: 'Designing rubrics that scale',
    excerpt: 'A practical guide to defining criteria that survive faculty rotations.',
    date: 'Feb 14, 2026', read: '7 min', author: 'Sneha Rao', authorRole: 'Head of Customer',
    body: [
      'A rubric that works for one faculty member but breaks the moment you add a second is not a rubric — it is a personal preference list.',
      'In this post, we walk through five principles that separate scalable rubrics from ones that fall apart at the first faculty rotation.',
      '1. Criteria should be observable, not internal. "Demonstrates understanding" is impossible to grade consistently. "Correctly explains the algorithm in their own words" is.',
      '2. Each criterion gets descriptors at every level. Without descriptors, two graders will land on different scores 40% of the time.',
      '3. Weights should reflect what your program values most — not what is easiest to grade.',
      '4. Pilot rubrics with a small group of faculty before rolling out. Adjust based on inter-rater agreement.',
      '5. Treat the rubric as a living document. Review and refine every term.',
    ],
  },
  {
    slug: '7', tag: 'Industry', title: 'NEP 2020 and the future of capstones',
    excerpt: 'How policy is reshaping project-based learning in Indian higher ed.',
    date: 'Jan 30, 2026', read: '9 min', author: 'Dr. Anil Gupta', authorRole: 'Education Advisor',
    body: [
      'India\'s National Education Policy 2020 puts project-based learning at the centre of higher education. Every undergraduate program is expected to weave practical projects through the curriculum — and every institution is figuring out how.',
      'In this piece, we look at three institutions that have already restructured their programs around NEP 2020 and what other departments can learn from them.',
    ],
  },
  {
    slug: '8', tag: 'Case Study', title: 'NIT Trichy: 98% on-time rate, every term',
    excerpt: 'The systems that keep 1,200 students consistently on schedule.',
    date: 'Jan 15, 2026', read: '6 min', author: 'Priya Iyer', authorRole: 'CTO & Co-founder',
    body: [
      'NIT Trichy runs one of the largest capstone programs in India — 1,200 students per term, three review phases, dozens of guides. And every term, more than 98% of submissions land on time.',
      'How? Three changes, all enabled by ProjTrack. Channel-aware reminders. Defaulter detection that triggers within 24 hours of a missed milestone. And calibration analytics that catch grading delays before they cascade.',
      'The result: a program that runs like clockwork — and a coordinator team that gets to spend their time on mentorship rather than chasing emails.',
    ],
  },
];

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="container mx-auto px-4 py-32 text-center lg:px-6">
        <h1 className="font-display text-3xl font-bold text-foreground">Article not found</h1>
        <p className="mt-3 text-muted-foreground">The post you are looking for does not exist or was moved.</p>
        <Link to="/blog" className="mt-6 inline-block">
          <Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4" /> Back to blog</Button>
        </Link>
      </section>
    );
  }

  const idx = posts.findIndex((p) => p.slug === slug);
  const next = posts[(idx + 1) % posts.length];

  return (
    <>
      <PageHero
        eyebrow={post.tag}
        title={post.title}
        description={post.excerpt}
      />

      <section className="pb-8">
        <div className="container mx-auto max-w-3xl px-4 lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary font-display text-sm font-bold text-primary-foreground">
                {post.author.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{post.author}</p>
                <p className="text-xs text-muted-foreground">{post.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.read}</span>
              <Button variant="ghost" size="sm" className="gap-1.5"><Share2 className="h-3.5 w-3.5" /> Share</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto max-w-3xl px-4 lg:px-6">
          <article className="space-y-5">
            {post.body.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-foreground">{p}</p>
            ))}
          </article>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 py-12">
        <div className="container mx-auto max-w-3xl px-4 lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
            <Link to={`/blog/${next.slug}`} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Next: {next.title} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection title="Enjoyed this article?" description="Subscribe for monthly insights on academic project management." primaryLabel="Subscribe" primaryHref="/contact" secondaryLabel="More articles" secondaryHref="/blog" />
    </>
  );
};

export default BlogPostPage;
