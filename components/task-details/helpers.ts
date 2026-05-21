import type { DeveloperEstimate, Employee, LeadEstimate, ProgressStep } from "./types";

const categoryStyles: Record<string, string> = {
  design: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  frontend: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  backend: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  research: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  testing: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  default: "bg-slate-500/10 text-slate-700 dark:text-slate-300",
};

export function getCategoryStyle(category: string) {
  return categoryStyles[category.toLowerCase()] || categoryStyles.default;
}

export function getLeadStoryPoints(leadEstimate: LeadEstimate | null) {
  return leadEstimate?.final_story_points ?? leadEstimate?.lead_estimate ?? null;
}

export function getDetailProgress({
  acceptanceCriteria,
  assignedEmployee,
  developerEstimate,
  leadEstimate,
  storyPoint,
  jiraIssueKey,
}: {
  acceptanceCriteria: string | null;
  assignedEmployee: Employee | null;
  developerEstimate: DeveloperEstimate | null;
  leadEstimate: LeadEstimate | null;
  storyPoint: number | null;
  jiraIssueKey: string | null;
}) {
  const steps: ProgressStep[] = [
    {
      label: "Criteria",
      description: "Acceptance criteria generated",
      done: Boolean(acceptanceCriteria && !acceptanceCriteria.toLowerCase().includes("loading")),
    },
    {
      label: "Owner",
      description: "Engineer selected",
      done: Boolean(assignedEmployee),
    },
    {
      label: "Estimate",
      description: "Developer and lead estimates aligned",
      done: Boolean(developerEstimate && leadEstimate && storyPoint),
    },
    {
      label: "Jira",
      description: "Ticket ready for delivery tracking",
      done: Boolean(jiraIssueKey),
    },
  ];

  const completed = steps.filter((step) => step.done).length;
  return {
    steps,
    score: Math.round((completed / steps.length) * 100),
  };
}

export function updateStoredStoryPoint(userStory: string, category: string, storyPoint: number) {
  const saved = localStorage.getItem("assigned-tasks");
  if (!saved) return;

  const parsed = JSON.parse(saved);
  const updated = Object.fromEntries(
    Object.entries(parsed).map(([sprint, tickets]) => [
      sprint,
      Array.isArray(tickets)
        ? tickets.map((ticket: any) =>
            ticket.user_story === userStory && ticket.category === category
              ? { ...ticket, story_point: storyPoint }
              : ticket
          )
        : tickets,
    ])
  );

  localStorage.setItem("assigned-tasks", JSON.stringify(updated));
}
