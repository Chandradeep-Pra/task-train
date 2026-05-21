import { CheckCircle2, Circle } from "lucide-react";
import type { ProgressStep } from "./types";

type ProgressPanelProps = {
  score: number;
  steps: ProgressStep[];
};

export function ProgressPanel({ score, steps }: ProgressPanelProps) {
  return (
    <aside className="tt-surface rounded-lg border p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-[var(--tt-ink)]">Delivery progress</h2>
          <p className="mt-1 text-sm text-[var(--tt-soft)]">Closed-loop readiness</p>
        </div>
        <span className="text-2xl font-semibold text-[var(--tt-ink)]">{score}%</span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--tt-ink)_8%,transparent)]">
        <div className="h-full rounded-full bg-[var(--tt-brand)]" style={{ width: `${score}%` }} />
      </div>

      <div className="mt-5 space-y-3">
        {steps.map((step) => (
          <div key={step.label} className="flex gap-3">
            {step.done ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            ) : (
              <Circle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--tt-border)]" />
            )}
            <div>
              <p className="text-sm font-semibold text-[var(--tt-ink)]">{step.label}</p>
              <p className="text-xs leading-5 text-[var(--tt-soft)]">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
