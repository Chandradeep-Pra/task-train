"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FileWarning } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { CreateTaskSidebar } from "@/components/create-task/CreateTaskSidebar";
import { EditablePrdSection } from "@/components/create-task/EditablePrdSection";
import { PlanningPanel } from "@/components/create-task/PlanningPanel";
import { getSectionValue, parseSectionValue, prdSections } from "@/components/create-task/sections";
import type { PrdDocument } from "@/components/create-task/types";

export default function CreateTaskPage() {
  const [prdText, setPrdText] = useState<PrdDocument | null>(null);
  const [duration, setDuration] = useState("");
  const [resourceSize, setResourceSize] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("prdData");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      setPrdText(parsed.prd_document || {});
      setDuration(String(parsed.total_sprints_discussed || ""));
      setResourceSize(String(parsed.employees_mentioned || parsed.total_employees_mentioned || ""));
    } catch {
      toast.error("Could not read the saved PRD.");
    }
  }, []);

  useEffect(() => {
    if (!prdText) return;
    const saved = localStorage.getItem("prdData");
    const parsed = saved ? JSON.parse(saved) : {};
    localStorage.setItem("prdData", JSON.stringify({ ...parsed, prd_document: prdText }));
  }, [prdText]);

  const sectionValues = useMemo(() => {
    return prdSections.reduce<Record<string, string>>((acc, section) => {
      acc[section.key] = getSectionValue(prdText?.[section.key]);
      return acc;
    }, {});
  }, [prdText]);

  const updateSection = (key: string, value: string) => {
    const section = prdSections.find((item) => item.key === key);
    setPrdText((current) => ({
      ...(current || {}),
      [key]: parseSectionValue(value, section?.list),
    }));
  };

  const estimate = async (endpoint: string, fallback: string, onValue: (value: string) => void) => {
    if (!prdText) return;
    const toastId = toast.loading("Asking AI for an estimate...");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prd_document: JSON.stringify(prdText) }),
      });
      const data = await response.json();
      onValue(String(data.estimate || fallback || ""));
      toast.success(data.reason || "Estimate updated.", { id: toastId });
    } catch {
      toast.error("AI estimation failed. Please try again.", { id: toastId });
    }
  };

  const handleContinue = async () => {
    if (!prdText) return;
    const toastId = toast.loading("Generating sprint tickets...");

    try {
      setLoading(true);
      const response = await fetch("/api/get-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prd_document: JSON.stringify(prdText),
          num_sprints: duration || "2",
        }),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result?.error || "Failed to generate tickets.");
      localStorage.setItem("assigned-tasks", JSON.stringify(result));
      toast.success("Tickets are ready. Opening sprint workspace...", { id: toastId });
      router.push("/create-tkt");
    } catch {
      toast.error("Could not generate tickets. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (!prdText) {
    return (
      <main className="flex h-[calc(100vh-65px)] items-center justify-center bg-[var(--tt-shell)] px-4 text-[var(--tt-text)]">
        <div className="max-w-md rounded-lg border border-[var(--tt-border)] bg-[var(--tt-surface)] p-6 text-center shadow-[var(--tt-shadow-soft)]">
          <FileWarning className="mx-auto h-10 w-10 text-[var(--tt-text-muted)]" />
          <h1 className="mt-4 text-xl font-semibold">No PRD found</h1>
          <p className="mt-2 text-sm leading-6 text-[var(--tt-text-muted)]">Generate a PRD first, then return here to review and create sprint tickets.</p>
          <Button onClick={() => router.push("/generate-prd")} className="mt-5 rounded-lg bg-[var(--tt-brand)] text-white hover:bg-[var(--tt-brand-strong)]">
            Generate PRD
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-[calc(100vh-65px)] flex-col overflow-hidden bg-[var(--tt-shell)] text-[var(--tt-text)] lg:flex-row">
      <CreateTaskSidebar sections={prdSections} />

      <section className="min-w-0 flex-1 overflow-y-auto p-5 scrollbar-thin">
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 rounded-lg border border-[var(--tt-border)] bg-[var(--tt-surface)] p-5 shadow-[var(--tt-shadow-soft)]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--tt-brand)]">Create task</p>
            <h1 className="mt-2 text-2xl font-semibold">Review PRD and prepare sprint tickets</h1>
            <p className="mt-2 text-sm leading-6 text-[var(--tt-text-muted)]">
              Edit the generated product requirements before TaskTrack converts them into team-ready tickets.
            </p>
          </div>

          <div className="space-y-4 pb-8">
            {prdSections.map((section) => (
              <EditablePrdSection key={section.key} section={section} value={sectionValues[section.key]} onChange={(value) => updateSection(section.key, value)} />
            ))}
          </div>
        </div>
      </section>

      <PlanningPanel
        duration={duration}
        resourceSize={resourceSize}
        loading={loading}
        onDurationChange={setDuration}
        onResourceSizeChange={setResourceSize}
        onEstimateSprints={() => estimate("/api/get-ai-sprint-estimate", duration, setDuration)}
        onEstimateTeam={() => estimate("/api/get-ai-employee-estimate", resourceSize, setResourceSize)}
        onContinue={handleContinue}
      />
    </main>
  );
}
