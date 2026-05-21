import { Bot, Calculator, Send, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type ActionPanelProps = {
  loading: boolean;
  canEstimate: boolean;
  canPush: boolean;
  onAssign: () => void;
  onEstimate: () => void;
  onPushToJira: () => void;
};

export function ActionPanel({
  loading,
  canEstimate,
  canPush,
  onAssign,
  onEstimate,
  onPushToJira,
}: ActionPanelProps) {
  return (
    <aside className="tt-surface rounded-lg border p-5">
      <h2 className="font-semibold text-[var(--tt-ink)]">Next actions</h2>
      <div className="mt-4 grid gap-3">
        <Button onClick={onAssign} disabled={loading} className="justify-start rounded-lg">
          <UserCheck className="h-4 w-4" />
          Auto-assign owner
        </Button>
        <Button onClick={onEstimate} disabled={loading || !canEstimate} variant="outline" className="justify-start rounded-lg">
          <Calculator className="h-4 w-4" />
          Estimate story points
        </Button>
        <Button onClick={onPushToJira} disabled={!canPush} className="justify-start rounded-lg bg-[var(--tt-brand)] hover:bg-[var(--tt-brand-strong)]">
          <Send className="h-4 w-4" />
          Push to Jira
        </Button>
      </div>

      <div className="mt-5 rounded-lg bg-[color-mix(in_oklab,var(--tt-ink)_4%,transparent)] p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--tt-ink)]">
          <Bot className="h-4 w-4 text-[var(--tt-brand)]" />
          Codex loop
        </div>
        <p className="text-sm leading-6 text-[var(--tt-soft)]">
          Once Jira has the story, Codex can pick it up, implement the change, and feed the result back into review.
        </p>
      </div>
    </aside>
  );
}
