const logos = [
  'IIT Bombay', 'NIT Trichy', 'BITS Pilani', 'VIT Vellore', 'SRM University',
  'Manipal', 'Amity', 'Ashoka',
];

const LogoCloud = ({ title = 'Trusted by leading institutions' }: { title?: string }) => (
  <section className="border-y border-border bg-secondary/30 py-10">
    <div className="container mx-auto px-4 lg:px-6">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:grid-cols-8">
        {logos.map((l) => (
          <div
            key={l}
            className="flex h-10 items-center justify-center rounded-md text-center font-display text-sm font-semibold text-muted-foreground/70 grayscale transition hover:text-foreground hover:grayscale-0"
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LogoCloud;
