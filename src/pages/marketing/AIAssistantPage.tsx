import { Bot, MessageSquare, Zap, Sparkles, Brain, ShieldCheck } from 'lucide-react';
import FeatureDetailLayout from '@/components/marketing/FeatureDetailLayout';

const AIAssistantPage = () => (
  <FeatureDetailLayout
    eyebrow="AI Assistant"
    title={<>Ask anything. <span className="text-gradient">Grounded in your data.</span></>}
    description="Natural-language answers about projects, students, and grading — backed by your real, live data with citations."
    heroBullets={['Plain English queries', 'Citations on every answer', 'Role-aware permissions']}
    capabilitiesTitle="What the AI can do"
    capabilities={[
      { icon: Bot, title: 'Conversational Queries', description: '"Who hasn\'t submitted?", "Top performers this term?" — answered instantly.' },
      { icon: MessageSquare, title: 'Smart Summaries', description: 'Auto-generated review notes, progress digests, and weekly recaps.' },
      { icon: Zap, title: 'Action Suggestions', description: 'Recommended nudges for at-risk students and overdue reviews.' },
      { icon: Sparkles, title: 'Smart Drafting', description: 'Draft feedback, reminders, and reports with one prompt.' },
      { icon: Brain, title: 'Context Memory', description: 'Remembers your role, term, and program for sharper answers.' },
      { icon: ShieldCheck, title: 'Permission-Aware', description: 'Never surfaces data the user is not allowed to see.' },
    ]}
    highlightStats={[
      { value: '4.8/5', label: 'Answer helpfulness' },
      { value: '< 2s', label: 'Median response' },
      { value: '100%', label: 'Cited sources' },
      { value: 'SOC 2', label: 'Data handling' },
    ]}
    faqs={[
      { q: 'Is my data used to train models?', a: 'No. Customer data is never used to train shared models.' },
      { q: 'Which models power the assistant?', a: 'We use a tuned ensemble. Enterprise customers can pin to specific models or run on-prem.' },
    ]}
    ctaTitle="Try the AI Assistant"
    ctaDescription="Available on every paid plan. No setup required."
  />
);

export default AIAssistantPage;
