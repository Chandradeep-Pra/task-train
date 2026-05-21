import { BarChart3 } from "lucide-react";
import type { DeveloperEstimate, LeadEstimate } from "./types";
import { getLeadStoryPoints } from "./helpers";
import { ReasonText } from "./ReasonText";

type EstimatePanelProps = {
  developerEstimate: DeveloperEstimate | null;
  leadEstimate: LeadEstimate | null;
  storyPoint: number | null;
  onStoryPointChange: (value: number) => void;
};

export function EstimatePanel({
  developerEstimate,
  leadEstimate,
  storyPoint,
  onStoryPointChange,
}: EstimatePanelProps) {
  const leadPoints = getLeadStoryPoints(leadEstimate);

  return (
    <section className="tt-surface rounded-lg border p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-[color-mix(in_oklab,var(--tt-brand)_12%,transparent)] text-[var(--tt-brand)]">
          <BarChart3 className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-semibold text-[var(--tt-ink)]">Estimation</h2>
          <p className="text-sm text-[var(--tt-soft)]">Developer plus lead calibration</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <EstimateCard label="Developer" value={developerEstimate?.estimated_story_points ?? "Pending"} />
        <EstimateCard label="Lead" value={leadPoints ?? "Pending"} />
        <EstimateCard label="Final" value={storyPoint ?? "Pending"} strong />
      </div>

      {(developerEstimate?.explanation || leadEstimate?.explanation) && (
        <div className="mt-4 space-y-3 rounded-md border border-[var(--tt-border)] bg-[color-mix(in_oklab,var(--tt-ink)_4%,transparent)] p-4">
          {developerEstimate?.explanation && <ReasonText>{developerEstimate.explanation}</ReasonText>}
          {leadEstimate?.explanation && <ReasonText>{leadEstimate.explanation}</ReasonText>}
        </div>
      )}

      {storyPoint !== null && (
        <label className="mt-4 flex items-center gap-3 text-sm font-medium text-[var(--tt-soft)]">
          Final points
          <input
            type="number"
            className="h-9 w-20 rounded-md border border-[var(--tt-border)] bg-[var(--tt-surface-solid)] px-2 text-center text-[var(--tt-ink)]"
            value={storyPoint}
            onChange={(event) => onStoryPointChange(Number(event.target.value))}
          />
        </label>
      )}
    </section>
  );
}

function EstimateCard({ label, value, strong = false }: { label: string; value: string | number; strong?: boolean }) {
  return (
    <div className={`rounded-md p-4 ${strong ? "bg-[var(--tt-ink)] text-[var(--tt-surface-solid)]" : "bg-[color-mix(in_oklab,var(--tt-ink)_4%,transparent)] text-[var(--tt-ink)]"}`}>
      <p className={`text-xs font-medium uppercase tracking-[0.14em] ${strong ? "opacity-60" : "text-[var(--tt-soft)]"}`}>
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
