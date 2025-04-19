"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, X } from "lucide-react";
import TeamMembers from "@/components/TeamMembers";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Ticket {
  category: string;
  user_story: string;
  story_points: number;
}

const categoryStyles: Record<
  string,
  { bg: string; text: string; icon: string }
> = {
  frontend: { bg: "bg-purple-100", text: "text-purple-700", icon: "💻" },
  backend: { bg: "bg-green-100", text: "text-green-700", icon: "🔠️" },
  design: { bg: "bg-pink-100", text: "text-pink-700", icon: "🎨" },
  devops: { bg: "bg-yellow-100", text: "text-yellow-800", icon: "⚙️" },
  default: { bg: "bg-zinc-200", text: "text-zinc-700", icon: "📌" },
};

const teamMembers = [
  { name: "Alice", role: "Frontend Dev" },
  { name: "Bob", role: "Backend Dev" },
  { name: "Charlie", role: "Designer" },
  { name: "Devika", role: "DevOps" },
];

export default function TicketReview() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicketIndex, setSelectedTicketIndex] = useState<number | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [editableTicket, setEditableTicket] = useState<Ticket | null>(null);
  const [showTeam, setShowTeam] = useState(false);
  const [assignments, setAssignments] = useState<Record<number, string[]>>({});

  useEffect(() => {
    const stored = localStorage.getItem("assigned-tasks");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTickets(parsed.user_stories);
      } catch (err) {
        console.error("Failed to parse stored tickets:", err);
      }
    }
  }, []);

  const handleEdit = (index: number) => {
    setSelectedTicketIndex(index);
    setEditableTicket({ ...tickets[index] });
    setEditMode(true);
  };

  const handleSave = () => {
    if (selectedTicketIndex === null || !editableTicket) return;

    const updated = [...tickets];
    updated[selectedTicketIndex] = editableTicket;
    localStorage.setItem(
      "assigned-tasks",
      JSON.stringify({ user_stories: updated })
    );
    setTickets(updated);

    setEditMode(false);
    setEditableTicket(null);
    setSelectedTicketIndex(null);
  };

  const handleCloseEdit = () => {
    setEditMode(false);
    setEditableTicket(null);
    setSelectedTicketIndex(null);
  };

  const handleAutoAssign = () => {
    const newAssignments: Record<number, string[]> = {};
    tickets.forEach((_, index) => {
      const shuffled = [...teamMembers].sort(() => 0.5 - Math.random());
      const assigned = shuffled
        .slice(0, Math.floor(Math.random() * 2) + 1)
        .map((m) => m.name);
      newAssignments[index] = assigned;
    });
    setAssignments(newAssignments);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-zinc-100 px-6 py-16">
      <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
              Review Your AI Tickets
            </h1>
            <p className="text-zinc-500 text-sm">
              Generated user stories from PRDs and meeting notes.
            </p>
          </div>

          <Button
            className="px-6 py-2 rounded-full bg-black text-white shadow-lg hover:scale-[1.05] transition-all"
            onClick={() => setShowTeam(true)}
          >
            Next Step
          </Button>
        </div>

        {!showTeam ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tickets.map((ticket, index) => {
              const { bg, text, icon } =
                categoryStyles[ticket.category] || categoryStyles.default;
              return (
                <Card
                  key={index}
                  className="relative border border-zinc-200 bg-white/60 shadow-md hover:shadow-xl rounded-3xl px-6 py-5 transition-all"
                >
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(index)}
                      className="text-zinc-400 hover:text-blue-600"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>

                  <div
                    className={`inline-flex items-center gap-1 px-3 py-1 capitalize rounded-full ${bg} ${text} text-xs font-medium w-fit shadow-sm mb-4`}
                  >
                    {icon} {ticket.category}
                  </div>

                  <blockquote className="text-zinc-800 text-sm italic mb-6 leading-relaxed border-l-4 pl-4 border-zinc-300">
                    “{ticket.user_story}”
                  </blockquote>

                  <div className="flex justify-start">
                    <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold shadow-sm">
                      {ticket.story_points} Story Point
                      {ticket.story_points !== 1 && "s"}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {tickets.map((ticket, index) => {
                const { bg, text, icon } =
                  categoryStyles[ticket.category] || categoryStyles.default;
                return (
                  <Card
                    key={index}
                    className="border border-zinc-100 bg-white/80 backdrop-blur-md shadow-md rounded-3xl p-6 space-y-4 transition-all hover:shadow-xl"
                  >
                    {/* Header Section */}
                    <div className="flex items-start justify-between gap-2">
                      {/* Left: Category + Story Points */}
                      <div className="space-y-2">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}
                        >
                          {icon} {ticket.category}
                        </span>
                        <div className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold w-fit">
                          {ticket.story_points} Story Point
                          {ticket.story_points !== 1 && "s"}
                        </div>
                      </div>

                      {/* Right: Edit Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(index)}
                        className="text-zinc-400 hover:text-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* User Story */}
                    <div className="text-sm text-zinc-800 leading-relaxed border-l-4 pl-4 border-zinc-300 italic">
                      “{ticket.user_story}”
                    </div>

                    {/* Assigned Members */}
                    {assignments[index]?.length > 0 && (
                      <div className="pt-2">
                        <p className="text-xs text-zinc-500 font-medium mb-2">
                          Assigned Team
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {assignments[index].map((name, idx) => {
                            const member = teamMembers.find(
                              (m) => m.name === name
                            );
                            return (
                              <div
                                key={idx}
                                className="flex items-center gap-2 bg-zinc-100 px-3 py-1 rounded-full shadow-sm"
                              >
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-[10px]">
                                    {name[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="text-xs text-zinc-700 font-medium">
                                  {name}
                                  {member?.role && (
                                    <div className="text-[10px] text-zinc-500">
                                      {member.role}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
            <TeamMembers onAutoAssign={handleAutoAssign} />
          </div>
        )}

        {editMode && editableTicket && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-2xl w-full sm:w-96 z-50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-zinc-900">
                Edit Ticket
              </h2>
              <Button variant="ghost" size="sm" onClick={handleCloseEdit}>
                <X className="w-5 h-5 text-zinc-500 hover:text-zinc-700" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-zinc-700">
                  Category
                </label>
                <input
                  type="text"
                  className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={editableTicket.category}
                  onChange={(e) =>
                    setEditableTicket({
                      ...editableTicket,
                      category: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-700">
                  User Story
                </label>
                <textarea
                  className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={editableTicket.user_story}
                  onChange={(e) =>
                    setEditableTicket({
                      ...editableTicket,
                      user_story: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-700">
                  Story Points
                </label>
                <input
                  type="number"
                  className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={editableTicket.story_points}
                  onChange={(e) =>
                    setEditableTicket({
                      ...editableTicket,
                      story_points: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  className="bg-green-500 text-white hover:bg-green-600"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
