import Link from "next/link";
import { FilePlus2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

type SprintHeaderProps = {
  sprintName: string;
  showTeam: boolean;
  onToggleTeam: () => void;
};

export function SprintHeader({ sprintName, showTeam, onToggleTeam }: SprintHeaderProps) {
  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--tt-soft)]">
          <span>Workspace</span>
          <span>/</span>
          <span>Generated backlog</span>
          <span>/</span>
          <span className="font-medium text-[var(--tt-ink)]">{sprintName}</span>
        </div>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--tt-ink)]">{sprintName}</h2>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" className="rounded-lg" onClick={onToggleTeam}>
          <Users className="h-4 w-4" />
          {showTeam ? "Hide team" : "Team members"}
        </Button>
        <Button asChild className="rounded-lg bg-[var(--tt-brand)] text-white hover:bg-[var(--tt-brand-strong)]">
          <Link href="/generate-prd">
            New plan
            <FilePlus2 className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
