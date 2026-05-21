import { ClipboardList, Clock3, ListChecks } from "lucide-react";

type SprintStatsProps = {
  ticketCount: number;
  categoryCount: number;
  estimatedPoints: number;
};

const stats = [
  { key: "stories", label: "Stories", icon: ClipboardList },
  { key: "categories", label: "Categories", icon: ListChecks },
  { key: "points", label: "Points", icon: Clock3 },
];

export function SprintStats({ ticketCount, categoryCount, estimatedPoints }: SprintStatsProps) {
  const values: Record<string, string | number> = {
    stories: ticketCount,
    categories: categoryCount || "-",
    points: estimatedPoints || "TBD",
  };

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div key={stat.key} className="flex items-center gap-2 rounded-md border border-[var(--tt-border)] bg-[color-mix(in_oklab,var(--tt-ink)_4%,transparent)] px-3 py-2">
            <Icon className="h-4 w-4 text-[var(--tt-soft)]" />
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--tt-soft)]">{stat.label}</span>
            <span className="text-sm font-semibold text-[var(--tt-ink)]">{values[stat.key]}</span>
          </div>
        );
      })}
    </div>
  );
}
