"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Edit2 } from "lucide-react";
import clsx from "clsx";

type TicketProps = {
  category: string;
  user_story: string;
  id: string;
};

const categoryColors: Record<string, string> = {
  design: "bg-blue-100 text-blue-600",
  frontend: "bg-green-100 text-green-600",
  backend: "bg-purple-100 text-purple-600",
  research: "bg-yellow-100 text-yellow-600",
  default: "bg-zinc-100 text-zinc-600",
};

const getCategoryClass = (cat: string) => {
  const key = cat.toLowerCase();
  return categoryColors[key] || categoryColors["default"];
};

const Ticket: React.FC<TicketProps> = ({ category, user_story, id }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserStory, setEditedUserStory] = useState(user_story);

  const handleCardClick = () => {
    if (!isEditing) {
      
      router.push(`/taskDetails/${id}?category=${category}&user_story=${encodeURIComponent(user_story)}`);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent navigation on edit
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Save logic
  };

  return (
    <div
      onClick={handleCardClick}
      className="group transition-all duration-200 hover:bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-6 cursor-pointer flex items-start gap-4 hover:shadow-lg hover:transform hover:scale-105"
    >
      {/* Dot icon */}
      <div className="flex-shrink-0 mt-1">
        <div className="w-3 h-3 rounded-full bg-zinc-300 group-hover:bg-indigo-500 transition-all" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          <Badge className={clsx("text-xs font-semibold px-2 py-0.5 rounded-md capitalize", getCategoryClass(category))}>
            {category}
          </Badge>
          <div onClick={handleEditClick}>
            <Edit2 className="w-4 h-4 text-zinc-400 group-hover:text-indigo-500 transition cursor-pointer" />
          </div>
        </div>

        {/* Content block */}
        {isEditing ? (
          <textarea
            value={editedUserStory}
            onChange={(e) => setEditedUserStory(e.target.value)}
            className="text-zinc-800 text-sm font-medium leading-snug border-l-4 pl-4 border-indigo-500 w-full resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        ) : (
          <blockquote className="text-zinc-800 text-sm font-medium leading-snug border-l-4 pl-4 border-indigo-500 italic group-hover:text-zinc-900 transition-all">
            {editedUserStory}
          </blockquote>
        )}

        {isEditing && (
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleSaveClick}
              className="py-1 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ticket;
