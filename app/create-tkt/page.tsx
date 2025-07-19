"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Sprint from "@/components/Sprint";
import TeamMembers from "@/components/TeamMembers";
import { Edit } from "lucide-react";

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
  const [showMem, setShowMem] = useState(false)

  useEffect(() => {
    const result = localStorage.getItem("assigned-tasks");
    if (result) {
      const parsedResult = JSON.parse(result);
      setSprints(parsedResult);
      // window.location.href = "/create-tkt";
    }
  }, []);

  // const handleAutoAssign = () => {
  //   const newAssignments: Record<string, string[]> = {};
  //   Object.entries(sprints).forEach(([sprintKey, sprintTickets]) => {
  //     sprintTickets.forEach((_, ticketIndex) => {
  //       const shuffled = [...teamMembers].sort(() => 0.5 - Math.random());
  //       const assigned = shuffled
  //         .slice(0, Math.floor(Math.random() * 2) + 1)
  //         .map((m) => m.name);
  //       newAssignments[`${sprintKey}-${ticketIndex}`] = assigned;
  //     });
  //   });
  //   setAssigns(na);
  // };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-zinc-100 px-6 py-16">
      <div className="w-full flex flex-col gap-2 relative">
        <div className="flex items-center gap-4">
        {/* <Button className="absolute right-0" >Estimate Story Point</Button> */}
        <Button className="absolute right-0" onClick={() => setShowMem(!showMem)}>Available Team Members</Button>
        </div>
        
        <div className="mt-10" />
        <div className="flex w-full gap-4">
          <div className="w-full flex flex-col gap-2">
          {Object.entries(sprints).map(([key, tickets], index) => (
          <Sprint key={key} sprintName={`Sprint ${index + 1}`} userStories={tickets} />
        ))}
          </div>
        {showMem && <TeamMembers />}
      
        </div>
      </div>
    </main>
  );
}