import { BadgeCheck, Layers3 } from "lucide-react";
import { formatSprintName, getCategoryAccent } from "./helpers";
import type { SprintEntry } from "./types";

type SprintSidebarProps = {
  sprintEntries: SprintEntry[];
  selectedSprintKey: string;
  totalTickets: number;
  onSelectSprint: (key: string) => void;
};

export function SprintSidebar({
  sprintEntries,
  selectedSprintKey,
  totalTickets,
  onSelectSprint,
}: SprintSidebarProps) {
  return (
    <aside className="tt-surface flex min-h-0 rounded-lg border lg:w-[320px] lg:shrink-0 lg:flex-col">
      <div className="shrink-0 border-b border-[var(--tt-border)] p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--tt-soft)]">Delivery plan</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--tt-ink)]">Sprints</h1>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-[color-mix(in_oklab,var(--tt-brand)_12%,transparent)] text-[var(--tt-brand)]">
            <Layers3 className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Metric label="Sprints" value={sprintEntries.length} />
          <Metric label="Stories" value={totalTickets} />
        </div>
      </div>

      <div className="scrollbar-thin min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
        {sprintEntries.map(([key, tickets], index) => {
          const isSelected = key === selectedSprintKey;
          const sprintCategories = Array.from(new Set(tickets.map((ticket) => ticket.category))).slice(0, 3);

          return (
            <button
              key={key}
              onClick={() => onSelectSprint(key)}
              className={`w-full rounded-lg border p-4 text-left transition ${
                isSelected
                  ? "border-[var(--tt-brand)] bg-[color-mix(in_oklab,var(--tt-brand)_12%,transparent)] shadow-sm"
                  : "border-transparent bg-transparent hover:border-[var(--tt-border)] hover:bg-[color-mix(in_oklab,var(--tt-brand)_6%,transparent)]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[var(--tt-ink)]">{formatSprintName(key, index)}</p>
                  <p className="mt-1 text-xs text-[var(--tt-soft)]">{tickets.length} stories queued</p>
                </div>
                {isSelected && <BadgeCheck className="h-5 w-5 text-[var(--tt-brand)]" />}
              </div>

              <div className="mt-4 flex items-center gap-1">
                {sprintCategories.map((category) => (
                  <span key={category} className={`h-1.5 flex-1 rounded-full ${getCategoryAccent(category)}`} />
                ))}
                {!sprintCategories.length && <span className="h-1.5 flex-1 rounded-full bg-[var(--tt-border)]" />}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-[var(--tt-border)] bg-[color-mix(in_oklab,var(--tt-ink)_4%,transparent)] p-3">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--tt-soft)]">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-[var(--tt-ink)]">{value}</p>
    </div>
  );
}
