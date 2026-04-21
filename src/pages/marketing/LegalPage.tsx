import { useParams, Link } from 'react-router-dom';
import PageHero from '@/components/marketing/PageHero';
import CTASection from '@/components/marketing/CTASection';
import { Button } from '@/components/ui/button';

const docs: Record<string, { title: string; updated: string; body: string }> = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'April 1, 2026',
    body: 'ProjTrack Desk respects your privacy. We collect only the data needed to operate the service, never sell personal information, and provide tools to export or delete your data on request.',
  },
  terms: {
    title: 'Terms of Service',
    updated: 'April 1, 2026',
    body: 'By using ProjTrack Desk, you agree to use the service in accordance with applicable laws and your institution\'s policies. We provide the service "as is" with the commitments outlined in your subscription agreement.',
  },
  cookies: {
    title: 'Cookie Policy',
    updated: 'April 1, 2026',
    body: 'We use essential cookies to keep you signed in and analytics cookies to understand product usage. You can manage cookie preferences anytime from your account settings.',
  },
  dpa: {
    title: 'Data Processing Addendum',
    updated: 'April 1, 2026',
    body: 'Our DPA outlines how ProjTrack processes personal data on behalf of customers, in compliance with applicable data protection regulations including GDPR and India\'s DPDP Act.',
  },
};

const LegalPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const doc = (slug && docs[slug]) || { title: 'Document', updated: '', body: 'Document not found.' };

  return (
    <>
      <PageHero eyebrow="Legal" title={doc.title} description={`Last updated: ${doc.updated}`} />
      <section className="pb-20">
        <div className="container mx-auto max-w-3xl px-4 lg:px-6">
          <div className="prose prose-sm max-w-none rounded-2xl border border-border bg-card p-8 text-foreground">
            <p className="leading-relaxed text-muted-foreground">{doc.body}</p>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              For the full legal text, please contact our team. We're happy to share signed versions for your records.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {Object.entries(docs).map(([k, d]) => (
              <Link key={k} to={`/legal/${k}`}>
                <Button variant={k === slug ? 'default' : 'outline'} size="sm">{d.title}</Button>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
};

export default LegalPage;
