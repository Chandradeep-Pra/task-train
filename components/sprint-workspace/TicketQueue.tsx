import { ArrowRight, Search } from "lucide-react";
import { getCategoryStyle, getStatusStyle, getTicketId, getTicketStatus } from "./helpers";
import type { TicketType } from "./types";

type TicketQueueProps = {
  sprintKey: string;
  tickets: TicketType[];
  onOpenTicket: (ticket: TicketType, index: number) => void;
};

export function TicketQueue({ sprintKey, tickets, onOpenTicket }: TicketQueueProps) {
  return (
    <div className="scrollbar-thin min-h-0 min-w-0 overflow-y-auto px-5 py-5 lg:px-7">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--tt-soft)]">Ticket queue</p>
          <p className="mt-1 text-sm text-[var(--tt-soft)]">
            Open a ticket to generate criteria, assign an owner, estimate, and push to Jira.
          </p>
        </div>
        <div className="flex h-10 items-center gap-2 rounded-lg border border-[var(--tt-border)] bg-[var(--tt-surface-solid)] px-3 text-sm text-[var(--tt-soft)]">
          <Search className="h-4 w-4" />
          Ready for review
        </div>
      </div>

      <div className="space-y-3">
        {tickets.map((ticket, index) => (
          <TicketRow
            key={getTicketId(sprintKey, index, ticket)}
            index={index}
            ticket={ticket}
            onOpen={() => onOpenTicket(ticket, index)}
          />
        ))}
      </div>
    </div>
  );
}

function TicketRow({
  index,
  ticket,
  onOpen,
}: {
  index: number;
  ticket: TicketType;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      className="group w-full rounded-lg border border-[var(--tt-border)] bg-[var(--tt-surface-solid)] p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--tt-brand)] hover:shadow-md"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className={`rounded-md border px-2.5 py-1 text-xs font-semibold capitalize ${getCategoryStyle(ticket.category)}`}>
              {ticket.category || "story"}
            </span>
            <span className="rounded-md bg-[color-mix(in_oklab,var(--tt-ink)_8%,transparent)] px-2.5 py-1 text-xs font-medium text-[var(--tt-soft)]">
              #{index + 1}
            </span>
            <StoryPointBadge storyPoint={ticket.story_point} />
            <StatusBadge status={getTicketStatus(ticket)} />
          </div>
          <h3 className="text-base font-semibold leading-6 text-[var(--tt-ink)] group-hover:text-[var(--tt-brand)]">
            {ticket.user_story}
          </h3>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-[var(--tt-brand)]">
          Open ticket
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </div>
      </div>
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${getStatusStyle(status)}`}>
      {status}
    </span>
  );
}

function StoryPointBadge({ storyPoint }: { storyPoint?: number }) {
  if (!storyPoint) {
    return (
      <span className="rounded-md bg-[color-mix(in_oklab,var(--tt-ink)_5%,transparent)] px-2.5 py-1 text-xs font-medium text-[var(--tt-soft)]">
        Estimate pending
      </span>
    );
  }

  return (
    <span className="rounded-md bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
      {storyPoint} pts
    </span>
  );
}
