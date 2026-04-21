import { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
}

const SectionHeading = ({ eyebrow, title, description, align = 'center' }: SectionHeadingProps) => (
  <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'} mb-12`}>
    {eyebrow && (
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
    )}
    <h2 className="font-display text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-base text-muted-foreground lg:text-lg">{description}</p>
    )}
  </div>
);

export default SectionHeading;
