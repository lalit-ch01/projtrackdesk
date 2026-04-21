import { Shield, Lock, KeyRound, Database, FileCheck, Globe } from 'lucide-react';
import FeatureDetailLayout from '@/components/marketing/FeatureDetailLayout';

const SecurityPage = () => (
  <FeatureDetailLayout
    eyebrow="Security"
    title={<>Enterprise-grade <span className="text-gradient">trust</span> by default</>}
    description="SOC 2-ready posture, granular permissions, daily backups, and data residency options."
    heroBullets={['SOC 2 Type II ready', 'GDPR + DPDP', 'EU & India residency']}
    capabilitiesTitle="Security controls"
    capabilities={[
      { icon: Shield, title: 'Role-Based Access', description: 'Granular permissions per department, role, and project.' },
      { icon: Lock, title: 'Encryption Everywhere', description: 'AES-256 at rest, TLS 1.3 in transit, no exceptions.' },
      { icon: KeyRound, title: 'SSO + SCIM', description: 'Centralize access via your identity provider.' },
      { icon: Database, title: 'Daily Backups', description: 'Point-in-time recovery up to 30 days.' },
      { icon: FileCheck, title: 'Audit Logs', description: 'Every action recorded and exportable.' },
      { icon: Globe, title: 'Data Residency', description: 'Choose where your data lives — India, EU, or US.' },
    ]}
    highlightStats={[
      { value: 'SOC 2', label: 'Type II ready' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '30d', label: 'PITR' },
      { value: '0', label: 'Material incidents' },
    ]}
    faqs={[
      { q: 'Can I get a copy of your security questionnaire?', a: 'Yes — request from sales and we will share our latest CAIQ Lite.' },
      { q: 'Do you support customer-managed keys?', a: 'Yes, on Enterprise. BYOK via AWS KMS and GCP KMS.' },
    ]}
    ctaTitle="Talk to our security team"
    ctaDescription="We'll walk you through our posture and answer your questions."
  />
);

export default SecurityPage;
