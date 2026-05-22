import { Textarea } from "@/components/ui/textarea";
import type { PrdSection } from "./types";

type EditablePrdSectionProps = {
  section: PrdSection;
  value: string;
  onChange: (value: string) => void;
};

export function EditablePrdSection({ section, value, onChange }: EditablePrdSectionProps) {
  const Icon = section.icon;

  return (
    <section id={section.id} className="scroll-mt-6 rounded-lg border border-[var(--tt-border)] bg-[var(--tt-surface)] p-5 shadow-[var(--tt-shadow-soft)]">
      <div className="mb-4 flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[var(--tt-brand-soft)] text-[var(--tt-brand)]">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-semibold text-[var(--tt-text)]">{section.label}</h2>
          <p className="mt-1 text-sm leading-6 text-[var(--tt-text-muted)]">{section.helper}</p>
        </div>
      </div>
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-32 resize-y border-[var(--tt-border)] bg-[var(--tt-surface-muted)] text-[var(--tt-text)] placeholder:text-[var(--tt-text-subtle)]"
        placeholder={section.list ? "Add one item per line" : `Edit ${section.label.toLowerCase()}`}
      />
    </section>
  );
}
