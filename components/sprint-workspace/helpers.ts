import type { TicketType } from "./types";

const categoryStyles: Record<string, string> = {
  frontend: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  backend: "border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-300",
  testing: "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-300",
  design: "border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-300",
  research: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  default: "border-slate-500/20 bg-slate-500/10 text-slate-600 dark:text-slate-300",
};

const categoryAccent: Record<string, string> = {
  frontend: "bg-emerald-500",
  backend: "bg-violet-500",
  testing: "bg-rose-500",
  design: "bg-sky-500",
  research: "bg-amber-500",
  default: "bg-slate-500",
};

export function formatSprintName(key: string, index: number) {
  const match = key.match(/\d+/);
  return `Sprint ${match?.[0] ?? index + 1}`;
}

export function getCategoryStyle(category: string) {
  return categoryStyles[category?.toLowerCase()] ?? categoryStyles.default;
}

export function getCategoryAccent(category: string) {
  return categoryAccent[category?.toLowerCase()] ?? categoryAccent.default;
}

export function getTicketId(sprintKey: string, index: number, ticket: TicketType) {
  return ticket.id || `${sprintKey}-ticket-${index + 1}`;
}

export function getTicketCategories(tickets: TicketType[]) {
  return Array.from(new Set(tickets.map((ticket) => ticket.category))).filter(Boolean);
}

export function getEstimatedPoints(tickets: TicketType[]) {
  return tickets.reduce((sum, ticket) => sum + (Number(ticket.story_point) || 0), 0);
}

export function getTicketStatus(ticket: TicketType) {
  if (ticket.status) return ticket.status;
  if (ticket.story_point) return "Estimated";
  return "Needs grooming";
}

export function getStatusStyle(status: string) {
  const normalized = status.toLowerCase();

  if (normalized.includes("done") || normalized.includes("jira")) {
    return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
  }
  if (normalized.includes("estimated")) {
    return "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300";
  }
  if (normalized.includes("progress")) {
    return "bg-amber-500/10 text-amber-700 dark:text-amber-300";
  }
  return "bg-slate-500/10 text-slate-600 dark:text-slate-300";
}

export function getSprintReadiness(tickets: TicketType[]) {
  if (!tickets.length) {
    return {
      score: 0,
      summary: "No stories are available for this sprint yet.",
    };
  }

  const categories = getTicketCategories(tickets);
  const estimatedTickets = tickets.filter((ticket) => Number(ticket.story_point) > 0).length;
  const storyCoverage = 40;
  const categoryCoverage = Math.min(categories.length / 3, 1) * 30;
  const estimateCoverage = (estimatedTickets / tickets.length) * 30;
  const score = Math.round(storyCoverage + categoryCoverage + estimateCoverage);

  return {
    score,
    summary: `${estimatedTickets}/${tickets.length} stories estimated across ${categories.length} categories.`,
  };
}
