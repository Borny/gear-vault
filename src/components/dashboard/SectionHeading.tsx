interface SectionHeadingProps {
  title: string;
  count?: number;
}

export function SectionHeading({ title, count }: SectionHeadingProps) {
  return (
    <div className="mb-4 flex items-baseline gap-3 border-b border-line pb-2">
      <h2 className="font-display text-lg font-semibold tracking-[0.14em] uppercase">{title}</h2>
      {count !== undefined && <span className="label-caps text-muted">{count}</span>}
    </div>
  );
}
