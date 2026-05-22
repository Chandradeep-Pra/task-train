import { BrainCircuit, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PlanningPanelProps = {
  duration: string;
  resourceSize: string;
  loading: boolean;
  onDurationChange: (value: string) => void;
  onResourceSizeChange: (value: string) => void;
  onEstimateSprints: () => void;
  onEstimateTeam: () => void;
  onContinue: () => void;
};

export function PlanningPanel(props: PlanningPanelProps) {
  return (
    <aside className="max-h-80 min-h-0 overflow-y-auto border-t border-[var(--tt-border)] bg-[var(--tt-surface-muted)] p-4 scrollbar-thin lg:max-h-none lg:w-80 lg:border-l lg:border-t-0">
      <div className="rounded-lg border border-[var(--tt-border)] bg-[var(--tt-surface)] p-4 shadow-[var(--tt-shadow-soft)]">
        <p className="text-sm font-semibold text-[var(--tt-text)]">Sprint setup</p>
        <p className="mt-1 text-sm leading-6 text-[var(--tt-text-muted)]">Tune the plan before TaskTrack generates spec-driven tickets.</p>

        <Field label="Project duration" value={props.duration} onChange={props.onDurationChange} placeholder="2" onEstimate={props.onEstimateSprints} />
        <Field label="Team size" value={props.resourceSize} onChange={props.onResourceSizeChange} placeholder="5" onEstimate={props.onEstimateTeam} />

        <Button onClick={props.onContinue} disabled={props.loading} className="mt-5 h-11 w-full rounded-lg bg-[var(--tt-brand)] text-white hover:bg-[var(--tt-brand-strong)]">
          {props.loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
          Generate sprint tickets
        </Button>
      </div>

      <div className="mt-4 rounded-lg border border-[var(--tt-border)] bg-[var(--tt-surface)] p-4">
        <p className="text-sm font-semibold text-[var(--tt-text)]">Workflow</p>
        <div className="mt-3 space-y-3 text-sm text-[var(--tt-text-muted)]">
          {["Review PRD", "Adjust delivery inputs", "Generate tickets", "Open sprint workspace"].map((item, index) => (
            <div key={item} className="flex items-center gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-[var(--tt-brand-soft)] text-xs font-semibold text-[var(--tt-brand)]">{index + 1}</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

function Field({ label, value, onChange, placeholder, onEstimate }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; onEstimate: () => void }) {
  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-[var(--tt-text)]">{label}</label>
        <Button type="button" variant="outline" onClick={onEstimate} className="h-8 rounded-lg border-[var(--tt-border)] bg-transparent px-2 text-xs text-[var(--tt-text)]">
          <BrainCircuit className="mr-1 h-3.5 w-3.5" />
          Estimate
        </Button>
      </div>
      <Input type="number" min={1} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="border-[var(--tt-border)] bg-[var(--tt-surface-muted)] text-[var(--tt-text)]" />
    </div>
  );
}
