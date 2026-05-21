import { CheckCircle2 } from "lucide-react";
import TeamMembers from "@/components/TeamMembers";
import { getCategoryAccent, getSprintReadiness } from "./helpers";
import type { TicketType } from "./types";

type SprintInsightsProps = {
  categories: string[];
  showTeam: boolean;
  tickets: TicketType[];
};

export function SprintInsights({ categories, showTeam, tickets }: SprintInsightsProps) {
  return (
    <aside className="scrollbar-thin min-h-0 overflow-y-auto border-t border-[var(--tt-border)] bg-[color-mix(in_oklab,var(--tt-ink)_4%,transparent)] p-5 xl:border-l xl:border-t-0">
      {showTeam ? (
        <TeamMembers />
      ) : (
        <div className="space-y-4">
          <SprintHealth tickets={tickets} />
          <CategoryMix categories={categories} tickets={tickets} />
          <NextAction />
        </div>
      )}
    </aside>
  );
}

function SprintHealth({ tickets }: { tickets: TicketType[] }) {
  const readiness = getSprintReadiness(tickets);

  return (
    <div className="rounded-lg border border-[var(--tt-border)] bg-[var(--tt-surface-solid)] p-5">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500/10 text-emerald-500">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold">Sprint health</h3>
          <p className="text-sm text-[var(--tt-soft)]">{readiness.score}% ready for grooming</p>
        </div>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--tt-ink)_8%,transparent)]">
        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${readiness.score}%` }} />
      </div>
      <p className="mt-3 text-sm text-[var(--tt-soft)]">{readiness.summary}</p>
    </div>
  );
}

function CategoryMix({ categories, tickets }: { categories: string[]; tickets: TicketType[] }) {
  return (
    <div className="rounded-lg border border-[var(--tt-border)] bg-[var(--tt-surface-solid)] p-5">
      <h3 className="font-semibold text-[var(--tt-ink)]">Category mix</h3>
      <div className="mt-4 space-y-3">
        {categories.length ? (
          categories.map((category) => {
            const count = tickets.filter((ticket) => ticket.category === category).length;
            const percent = Math.round((count / tickets.length) * 100);

            return (
              <div key={category}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="capitalize text-[var(--tt-soft)]">{category}</span>
                  <span className="font-medium">{count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--tt-ink)_8%,transparent)]">
                  <div className={`h-full rounded-full ${getCategoryAccent(category)}`} style={{ width: `${percent}%` }} />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-[var(--tt-soft)]">No categories found for this sprint.</p>
        )}
      </div>
    </div>
  );
}

function NextAction() {
  return (
    <div className="rounded-lg border border-[var(--tt-border)] bg-[var(--tt-ink)] p-5 text-[var(--tt-surface-solid)]">
      <h3 className="font-semibold">Next best action</h3>
      <p className="mt-2 text-sm leading-6 opacity-70">
        Open the first ticket, generate acceptance criteria, assign the best-fit teammate, then estimate story points before sending it to Jira.
      </p>
    </div>
  );
}
