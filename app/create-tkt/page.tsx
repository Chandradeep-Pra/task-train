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

const categoryStyles: Record<string, { bg: string; text: string; icon: string }> = {
  frontend: { bg: "bg-purple-100", text: "text-purple-700", icon: "💻" },
  backend:  { bg: "bg-green-100",   text: "text-green-700",   icon: "🔠️" },
  design:   { bg: "bg-pink-100",    text: "text-pink-700",    icon: "🎨" },
  devops:   { bg: "bg-yellow-100",  text: "text-yellow-800",  icon: "⚙️" },
  default:  { bg: "bg-zinc-200",    text: "text-zinc-700",    icon: "📌" },
};

const teamMembers = [
  { name: "Alice", role: "Frontend Dev" },
  { name: "Bob", role: "Backend Dev" },
  { name: "Charlie", role: "Designer" },
  { name: "Devika", role: "DevOps" },
];

function TicketList({
  tickets,
  assignments,
  viewMode,
  onEdit,
}: {
  tickets: Ticket[];
  assignments: Record<number, string[]>;
  viewMode: "card" | "list";
  onEdit: (i: number) => void;
}) {
  if (viewMode === "card") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tickets.map((t, i) => {
          const { bg, text, icon } = categoryStyles[t.category] || categoryStyles.default;
          return (
            <Card key={i} className="border bg-white/60 shadow-md rounded-3xl p-6 hover:shadow-xl transition">
              <div className="flex justify-between items-start">
                <div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
                    {icon} {t.category}
                  </div>
                  <blockquote className="mt-3 text-zinc-800 italic border-l-4 pl-4 border-zinc-300">
                    “{t.user_story}”
                  </blockquote>
                  <div className="mt-3 text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold inline-block">
                    {t.story_points} SP
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {assignments[i]?.map((n, idx) => (
                      <Avatar key={idx} className="h-6 w-6 border border-white shadow">
                        <AvatarFallback className="text-[10px]">{n[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => onEdit(i)} className="text-zinc-400 hover:text-blue-600">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    );
  }

  // list/table
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden border border-zinc-200">
      <div className="grid grid-cols-5 px-6 py-3 bg-zinc-50 text-xs font-semibold text-zinc-500 uppercase">
        <div>Category</div>
        <div>User Story</div>
        <div>Points</div>
        <div>Assigned</div>
        <div className="text-right">Actions</div>
      </div>
      {tickets.map((t, i) => {
        const { bg, text, icon } = categoryStyles[t.category] || categoryStyles.default;
        return (
          <div key={i} className="grid grid-cols-5 items-center px-6 py-4 border-t border-zinc-100 hover:bg-zinc-50 transition">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
                {icon} {t.category}
              </span>
            </div>
            <div className="italic line-clamp-2 text-zinc-700">“{t.user_story}”</div>
            <div className="text-emerald-700 font-semibold">{t.story_points} SP</div>
            <div className="flex flex-wrap gap-1">
              {assignments[i]?.map((n, idx) => (
                <Avatar key={idx} className="h-6 w-6 border border-white shadow">
                  <AvatarFallback className="text-[10px]">{n[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="flex justify-end">
              <Button variant="ghost" size="icon" onClick={() => onEdit(i)} className="text-zinc-400 hover:text-blue-600">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function TicketReview() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editable, setEditable] = useState<Ticket | null>(null);
  const [showTeam, setShowTeam] = useState(false);
  const [assigns, setAssigns] = useState<Record<number, string[]>>({});
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  useEffect(() => {
    const raw = localStorage.getItem("assigned-tasks");
    if (raw) {
      try {
        setTickets(JSON.parse(raw).user_stories);
      } catch {}
    }
  }, []);

  const onEdit = (i: number) => {
    setSelectedIndex(i);
    setEditable({ ...tickets[i] });
    setEditMode(true);
  };
  const onSave = () => {
    if (selectedIndex == null || !editable) return;
    const u = [...tickets];
    u[selectedIndex] = editable;
    setTickets(u);
    localStorage.setItem("assigned-tasks", JSON.stringify({ user_stories: u }));
    setEditMode(false);
    setEditable(null);
    setSelectedIndex(null);
  };
  const onClose = () => setEditMode(false);

  const onAutoAssign = () => {
    const na: Record<number, string[]> = {};
    tickets.forEach((_, i) => {
      const s = [...teamMembers].sort(() => Math.random() - 0.5);
      na[i] = s.slice(0, Math.floor(Math.random() * 2) + 1).map((m) => m.name);
    });
    setAssigns(na);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-zinc-100 px-6 py-16">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900">Review Your AI Tickets</h1>
            <p className="text-zinc-500 text-sm">Generated user stories...</p>
          </div>
          <Button onClick={() => setShowTeam(true)} className="bg-black text-white">Next Step</Button>
        </div>

        {/* Toggle */}
        <div className="flex">
          {["card","list"].map((mode) => (
            <Button
              key={mode}
              variant="ghost"
              className={`px-4 ${viewMode===mode?"bg-white text-black shadow":"text-zinc-600"}`}
              onClick={() => setViewMode(mode as any)}
            >
              {mode==="card"?"🧩 Card":"📃 List"}
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <TicketList
              tickets={tickets}
              assignments={assigns}
              viewMode={viewMode}
              onEdit={onEdit}
            />
          </div>
          {showTeam && <TeamMembers onAutoAssign={onAutoAssign} />}
        </div>

        {/* Edit Modal */}
        {editMode && editable && (
          <div className="fixed inset-0 flex items-end justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl">Edit Ticket</h2>
                <Button variant="ghost" size="icon" onClick={onClose}><X/></Button>
              </div>
              <label className="block mb-2">
                Category
                <input
                  value={editable.category}
                  onChange={(e) => setEditable({...editable, category:e.target.value})}
                  className="mt-1 w-full border rounded px-2 py-1"
                />
              </label>
              <label className="block mb-2">
                User Story
                <textarea
                  rows={3}
                  value={editable.user_story}
                  onChange={(e) => setEditable({...editable, user_story:e.target.value})}
                  className="mt-1 w-full border rounded px-2 py-1"
                />
              </label>
              <label className="block mb-4">
                Story Points
                <input
                  type="number"
                  value={editable.story_points}
                  onChange={(e) => setEditable({...editable, story_points:+e.target.value})}
                  className="mt-1 w-full border rounded px-2 py-1"
                />
              </label>
              <div className="flex justify-end">
                <Button onClick={onSave} className="bg-green-500 text-white">Save</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
