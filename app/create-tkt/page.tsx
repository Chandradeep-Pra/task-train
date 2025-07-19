"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Sprint from "@/components/Sprint";
import TeamMembers from "@/components/TeamMembers";

const teamMembers = [
  { name: "Alice", role: "Frontend Dev" },
  { name: "Bob", role: "Backend Dev" },
  { name: "Charlie", role: "Designer" },
  { name: "Devika", role: "DevOps" },
];

type TicketType = {
  id: string;
  category: string;
  user_story: string;
};

export default function TicketReview() {
  const [sprints, setSprints] = useState<Record<string, TicketType[]>>({});
  const [assignments, setAssignments] = useState<Record<string, string[]>>({});
  const [showMem, setShowMem] = useState(false);

  useEffect(() => {
    const result = localStorage.getItem("assigned-tasks");
    if (result) {
      const parsedResult = JSON.parse(result);
      setSprints(parsedResult);
    }
  }, []);

  // Group sprints into rows of 3
  const sprintEntries = Object.entries(sprints);
  const groupedSprints: [string, TicketType[]][][] = [];

  for (let i = 0; i < sprintEntries.length; i += 3) {
    groupedSprints.push(sprintEntries.slice(i, i + 3));
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-zinc-100 px-6 py-16">
      <div className="w-full flex flex-col gap-2 relative">
        <div className="flex items-center gap-4">
          <Button
            className="absolute right-0"
            onClick={() => setShowMem(!showMem)}
          >
            Available Team Members
          </Button>
        </div>

        <div className="mt-10" />

        <div className="flex w-full gap-4">
          <div className="w-full flex flex-col gap-6">
            {groupedSprints.map((sprintGroup, rowIndex) => (
              <div key={rowIndex} className="flex gap-4 w-full">
                {sprintGroup.map(([key, tickets], index) => (
                  <div key={key} className="flex-1 min-w-0">
                    <Sprint
                      sprintName={`Sprint ${rowIndex * 3 + index + 1}`}
                      userStories={tickets}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {showMem && <TeamMembers />}
        </div>
      </div>
    </main>
  );
}
