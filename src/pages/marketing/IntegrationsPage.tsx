import { Code2, Plug, Cloud, Database, Calendar, Lock } from 'lucide-react';
import FeatureDetailLayout from '@/components/marketing/FeatureDetailLayout';

const IntegrationsPage = () => (
  <FeatureDetailLayout
    eyebrow="Integrations"
    title={<>Connect to <span className="text-gradient">your stack</span></>}
    description="Native integrations with your LMS, SSO provider, calendar, and storage — plus a full REST API."
    heroBullets={['REST + Webhooks', 'SSO ready', 'No vendor lock-in']}
    capabilitiesTitle="Integration partners"
    capabilities={[
      { icon: Code2, title: 'REST API', description: 'Read and write everything you can do in the UI, programmatically.' },
      { icon: Plug, title: 'Webhooks', description: 'Push events to your downstream systems in real time.' },
      { icon: Cloud, title: 'LMS Sync', description: 'Native sync with Moodle, Canvas, and Blackboard.' },
      { icon: Database, title: 'Drive & Dropbox', description: 'Submissions land in your existing storage — no double-handling.' },
      { icon: Calendar, title: 'Google + Outlook', description: 'Two-way calendar sync for reviews and deadlines.' },
      { icon: Lock, title: 'SSO / SAML', description: 'Sign in with Google Workspace, Azure AD, Okta, or your SAML IdP.' },
    ]}
    highlightStats={[
      { value: '40+', label: 'Integrations' },
      { value: '10 min', label: 'Avg setup' },
      { value: 'OpenAPI', label: '3.1 spec' },
      { value: '99.99%', label: 'API uptime' },
    ]}
    faqs={[
      { q: 'Where can I find API docs?', a: 'In our Documentation portal — fully versioned with code samples in 6 languages.' },
      { q: 'Do you charge for API usage?', a: 'No. Generous rate limits are included on every paid plan.' },
    ]}
  />
);

export default IntegrationsPage;
