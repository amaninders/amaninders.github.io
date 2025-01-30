interface DecorativeTextProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export const DecorativeText = ({ children, className }: DecorativeTextProps) => (
    <span className={`inline-block transform ${className}`}>
      {children}
    </span>
  );
  
  interface SectionHeadingProps {
    children: React.ReactNode;
  }
  
  export const SectionHeading = ({ children }: SectionHeadingProps) => (
    <div className="relative mb-32 mt-32">
      <h2 className="text-3xl md:text-8xl font-bold relative z-10 text-zinc-800 underline ">{children}</h2>
      <span className="absolute -bottom-10 left-1 text-7xl md:text-[12rem] -top-1 font-bold text-amber-50/50 -z-10">
        {children}
      </span>
    </div>
  );
  
  interface SectionProps {
    id: string;
    className?: string;
    children: React.ReactNode;
  }
  
  export const Section = ({ id, className, children }: SectionProps) => (
    <section id={id} className={`min-h-screen p-8 md:p-16 ${className || ''}`}>
      {children}
    </section>
  );