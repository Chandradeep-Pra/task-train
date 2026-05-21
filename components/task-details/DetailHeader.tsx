import { ArrowLeft, GitPullRequestArrow, TicketCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCategoryStyle } from "./helpers";

type DetailHeaderProps = {
  category: string;
  sprintName: string;
  storyPoint: number | null;
  jiraIssueKey: string | null;
};

export function DetailHeader({ category, sprintName, storyPoint, jiraIssueKey }: DetailHeaderProps) {
  const router = useRouter();

  return (
    <header className="tt-surface rounded-lg border p-6">
      <button
        onClick={() => router.back()}
        className="mb-5 inline-flex items-center gap-2 rounded-md border border-[var(--tt-border)] px-3 py-2 text-sm font-medium text-[var(--tt-soft)] transition hover:bg-[color-mix(in_oklab,var(--tt-brand)_8%,transparent)] hover:text-[var(--tt-ink)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--tt-soft)]">
            <span>{sprintName}</span>
            <span>/</span>
            <span>Ticket detail</span>
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--tt-ink)]">Development handoff</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--tt-soft)]">
            Refine the story, assign the owner, estimate effort, and move it toward the Jira and Codex loop.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${getCategoryStyle(category)}`}>
            {category || "story"}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-[color-mix(in_oklab,var(--tt-ink)_8%,transparent)] px-3 py-1 text-sm font-medium text-[var(--tt-soft)]">
            <TicketCheck className="h-4 w-4" />
            {storyPoint ? `${storyPoint} pts` : "Unestimated"}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-[color-mix(in_oklab,var(--tt-brand)_12%,transparent)] px-3 py-1 text-sm font-medium text-[var(--tt-brand)]">
            <GitPullRequestArrow className="h-4 w-4" />
            {jiraIssueKey || "Codex loop pending"}
          </span>
        </div>
      </div>
    </header>
  );
}
