import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  align?: 'left' | 'center';
}

const PageHero = ({ eyebrow, title, description, children, align = 'center' }: PageHeroProps) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/40 to-background pb-16 pt-16 lg:pb-20 lg:pt-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="container mx-auto px-4 lg:px-6">
        <div className={`max-w-3xl ${alignClass}`}>
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              {eyebrow}
            </motion.span>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-4 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-base text-muted-foreground sm:text-lg"
            >
              {description}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className={`mt-8 flex flex-wrap gap-3 ${align === 'center' ? 'justify-center' : ''}`}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
