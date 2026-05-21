"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { EmptySprintState } from "@/components/sprint-workspace/EmptySprintState";
import { getEstimatedPoints, getTicketCategories, getTicketId, formatSprintName } from "@/components/sprint-workspace/helpers";
import { SprintHeader } from "@/components/sprint-workspace/SprintHeader";
import { SprintInsights } from "@/components/sprint-workspace/SprintInsights";
import { SprintSidebar } from "@/components/sprint-workspace/SprintSidebar";
import { SprintStats } from "@/components/sprint-workspace/SprintStats";
import { TicketQueue } from "@/components/sprint-workspace/TicketQueue";
import type { TicketType } from "@/components/sprint-workspace/types";

export default function TicketReview() {
  const router = useRouter();
  const [sprints, setSprints] = useState<Record<string, TicketType[]>>({});
  const [selectedSprintKey, setSelectedSprintKey] = useState("");
  const [showTeam, setShowTeam] = useState(false);

  useEffect(() => {
    const result = localStorage.getItem("assigned-tasks");
    if (!result) return;

    try {
      const parsedResult = JSON.parse(result);
      setSprints(parsedResult);
      setSelectedSprintKey(Object.keys(parsedResult)[0] || "");
    } catch (error) {
      console.error("Failed to parse assigned tasks:", error);
    }
  }, []);

  const sprintEntries = useMemo(() => Object.entries(sprints), [sprints]);
  const selectedIndex = sprintEntries.findIndex(([key]) => key === selectedSprintKey);
  const selectedSprint = sprintEntries[selectedIndex];
  const selectedTickets = selectedSprint?.[1] ?? [];
  const selectedSprintName = selectedSprint ? formatSprintName(selectedSprint[0], selectedIndex) : "Sprint";

  const totalTickets = sprintEntries.reduce((sum, [, tickets]) => sum + tickets.length, 0);
  const categories = getTicketCategories(selectedTickets);
  const estimatedPoints = getEstimatedPoints(selectedTickets);

  const openTicket = (ticket: TicketType, index: number) => {
    if (!selectedSprint) return;

    const ticketId = getTicketId(selectedSprint[0], index, ticket);
    const params = new URLSearchParams({
      category: ticket.category,
      user_story: ticket.user_story,
      sprintName: selectedSprintName,
    });

    router.push(`/taskDetails/${ticketId}?${params.toString()}`);
  };

  if (!sprintEntries.length) {
    return <EmptySprintState />;
  }

  return (
    <main className="h-[calc(100vh-65px)] overflow-hidden bg-[var(--tt-shell)] text-[var(--tt-ink)]">
      <div className="flex h-full w-full flex-col gap-4 overflow-hidden p-4 lg:flex-row">
        <SprintSidebar
          sprintEntries={sprintEntries}
          selectedSprintKey={selectedSprintKey}
          totalTickets={totalTickets}
          onSelectSprint={setSelectedSprintKey}
        />

        <section className="tt-surface flex min-w-0 flex-1 flex-col overflow-hidden rounded-lg border">
          <div className="border-b border-[var(--tt-border)] bg-[var(--tt-surface-solid)] px-5 py-5 lg:px-7">
            <SprintHeader
              sprintName={selectedSprintName}
              showTeam={showTeam}
              onToggleTeam={() => setShowTeam((value) => !value)}
            />
            <SprintStats
              ticketCount={selectedTickets.length}
              categoryCount={categories.length}
              estimatedPoints={estimatedPoints}
            />
          </div>

          <div className={`grid min-h-0 flex-1 gap-0 ${showTeam ? "xl:grid-cols-[1fr_460px]" : "xl:grid-cols-[1fr_360px]"}`}>
            <TicketQueue
              sprintKey={selectedSprint?.[0] || "sprint"}
              tickets={selectedTickets}
              onOpenTicket={openTicket}
            />
            <SprintInsights categories={categories} showTeam={showTeam} tickets={selectedTickets} />
          </div>
        </section>
      </div>
    </main>
  );
}
