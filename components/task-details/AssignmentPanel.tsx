import { UserRound } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Employee } from "./types";

type AssignmentPanelProps = {
  assignedEmployee: Employee | null;
  allEmployees: Employee[];
  onManualChange: (name: string) => void;
};

export function AssignmentPanel({ assignedEmployee, allEmployees, onManualChange }: AssignmentPanelProps) {
  return (
    <section className="tt-surface rounded-lg border p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500/10 text-emerald-500">
          <UserRound className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-semibold text-[var(--tt-ink)]">Assigned owner</h2>
          <p className="text-sm text-[var(--tt-soft)]">Best-fit engineer for this story</p>
        </div>
      </div>

      {assignedEmployee ? (
        <div className="space-y-4">
          <div className="rounded-md bg-[color-mix(in_oklab,var(--tt-ink)_4%,transparent)] p-4">
            <p className="font-semibold text-[var(--tt-ink)]">{assignedEmployee.name}</p>
            <p className="mt-1 text-sm text-[var(--tt-soft)]">{assignedEmployee.skills.join(", ")}</p>
          </div>
          <Select value={assignedEmployee.name} onValueChange={onManualChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Reassign employee" />
            </SelectTrigger>
            <SelectContent>
              {allEmployees.map((employee) => (
                <SelectItem key={`${employee.name}-${employee.skills.join("-")}`} value={employee.name}>
                  {employee.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <p className="rounded-md bg-[color-mix(in_oklab,var(--tt-ink)_4%,transparent)] p-4 text-sm text-[var(--tt-soft)]">No owner assigned yet.</p>
      )}
    </section>
  );
}
