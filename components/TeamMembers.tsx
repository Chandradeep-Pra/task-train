"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

type Member = {
  name: string;
  skills: string[];
};

// export default function TeamMembers({ onAutoAssign }: { onAutoAssign: () => void }) {
export default function TeamMembers() {
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const res = await fetch("/api/get-employees-data");
        const data = await res.json();
        setTeamMembers(data.employees);
        console.log("Team Members", data.employees);
      } catch (err) {
        console.error("Failed to fetch team members:", err);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[var(--tt-ink)]">Team</h2>
        {/* <Button className="bg-black text-white rounded-full" onClick={onAutoAssign}>
          Auto assign
        </Button> */}
      </div>

      <ul className="space-y-3 rounded-lg border border-[var(--tt-border)] bg-[var(--tt-surface-solid)] p-2">
        {teamMembers.map((member, index) => (
          <li
            key={index}
            className="flex cursor-pointer items-start gap-4 rounded-md border border-[var(--tt-border)] p-3 transition hover:border-[var(--tt-brand)] hover:bg-[color-mix(in_oklab,var(--tt-brand)_8%,transparent)]"
          >
            <Avatar className="h-10 w-10 bg-[color-mix(in_oklab,var(--tt-ink)_8%,transparent)] text-sm font-medium text-[var(--tt-ink)]">
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="text-[15px] font-medium text-[var(--tt-ink)]">{member.name}</div>
              <div className="text-sm text-[var(--tt-soft)] mb-2">
                {member.skills?.[0] || "No Role"}
              </div>
              <div className="flex flex-wrap gap-2">
                {member.skills?.slice(1).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[11px] rounded-md bg-[color-mix(in_oklab,var(--tt-ink)_7%,transparent)] text-[var(--tt-soft)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
