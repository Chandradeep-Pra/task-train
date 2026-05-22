import { ArrowLeft, ClipboardList } from "lucide-react";
import Link from "next/link";
import type { PrdSection } from "./types";

export function CreateTaskSidebar({ sections }: { sections: PrdSection[] }) {
  return (
    <aside className="flex max-h-64 min-h-0 flex-col border-b border-[var(--tt-border)] bg-[var(--tt-surface-muted)] lg:max-h-none lg:w-72 lg:border-b-0 lg:border-r">
      <div className="border-b border-[var(--tt-border)] p-4">
        <Link href="/generate-prd" className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--tt-text-muted)] hover:text-[var(--tt-text)]">
          <ArrowLeft className="h-4 w-4" />
          Back to PRD intake
        </Link>
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--tt-brand-soft)] text-[var(--tt-brand)]">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-[var(--tt-text)]">PRD Review</p>
            <p className="text-sm text-[var(--tt-text-muted)]">Edit before ticket generation</p>
          </div>
        </div>
      </div>

      <nav className="flex min-h-0 flex-1 gap-1 overflow-auto p-3 scrollbar-thin lg:block lg:space-y-1">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <a key={section.id} href={`#${section.id}`} className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[var(--tt-text-muted)] hover:bg-[var(--tt-surface)] hover:text-[var(--tt-text)]">
              <Icon className="h-4 w-4" />
              {section.label}
            </a>
          );
        })}
      </nav>

      <div className="border-t border-[var(--tt-border)] p-4 text-xs leading-5 text-[var(--tt-text-muted)]">
        Changes are saved locally and used for sprint ticket generation.
      </div>
    </aside>
  );
}
