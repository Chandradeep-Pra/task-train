"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";

const teamMembers = [
  { name: "Alice", role: "Frontend Dev", tech: "React, Tailwind, TypeScript" },
  { name: "Bob", role: "Backend Dev", tech: "Node.js, Express, MongoDB" },
  { name: "Charlie", role: "Designer", tech: "Figma, Photoshop" },
  { name: "Devika", role: "DevOps", tech: "Docker, AWS, CI/CD" },
];

export default function TeamMembers({ onAutoAssign }: { onAutoAssign: () => void }) {
  return (
    <div className="w-full lg:w-1/3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-zinc-800">Team</h2>
        <Button className="bg-black text-white rounded-full" onClick={onAutoAssign}>
          Auto assign
        </Button>
      </div>

      <ul className="space-y-4 border p-2 rounded-4xl bg-white">
        {teamMembers.map((member, index) => (
          <li
            key={index}
            className="flex items-start gap-4 border-b hover:scale-110 transition-all duration-300 hover:ml-10 cursor-pointer border-zinc-100 pb-4 last:border-none"
          >
            <Avatar className="h-10 w-10 bg-zinc-100 text-zinc-700 text-sm font-medium">
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="text-[15px] font-medium text-zinc-900">{member.name}</div>
              <div className="text-sm text-zinc-500 mb-2">{member.role}</div>
              <div className="flex flex-wrap gap-2">
                {member.tech.split(",").map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[11px] rounded-md bg-zinc-100 text-zinc-600"
                  >
                    {tech.trim()}
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
