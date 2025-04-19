"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, X } from "lucide-react";

const tickets = [
  {
    id: 1,
    title: "Design Login Page",
    description: "Create a login page with authentication.",
    storyPoints: 5,
  },
  {
    id: 2,
    title: "Set Up API",
    description: "Set up the backend API for user management.",
    storyPoints: 8,
  },
  {
    id: 3,
    title: "Write Unit Tests",
    description: "Write unit tests for the authentication module.",
    storyPoints: 3,
  },
  {
    id: 4,
    title: "Fix Bugs",
    description: "Fix bugs in the user registration flow.",
    storyPoints: 2,
  },
  {
    id: 5,
    title: "Update UI Design",
    description: "Improve the UI for the dashboard.",
    storyPoints: 5,
  },
  {
    id: 6,
    title: "Integrate Payment Gateway",
    description: "Integrate Stripe payment gateway into the app.",
    storyPoints: 8,
  },
];

export default function TicketReview() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editableTicket, setEditableTicket] = useState({});

  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket);
    setEditableTicket({ ...ticket });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    // Save the changes (this can be sent to API or updated in state)
    setSelectedTicket({ ...editableTicket });
    setEditMode(false);
  };

  const handleCloseEdit = () => {
    // Close the edit dialog without saving any changes
    setEditMode(false);
    setEditableTicket({ ...selectedTicket }); // Reset to original ticket details
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-zinc-100 px-6 py-16">
      <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
            🔥 Review Your Tickets
          </h1>
          <p className="text-zinc-500 text-sm">
            Review the tasks generated from your PRDs and meeting transcripts.
          </p>
        </div>

        {/* Ticket Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tickets.map((ticket) => (
            <Card
              key={ticket.id}
              className="bg-white shadow-lg rounded-lg transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl cursor-pointer"
              onClick={() => handleSelectTicket(ticket)}
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-zinc-900">
                  {ticket.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 mb-2">
                  {ticket.description}
                </p>
                <div className="flex justify-between items-center text-xs text-zinc-500">
                  <span>Story Points: {ticket.storyPoints}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-500 hover:text-white hover:bg-blue-500"
                    onClick={handleEdit}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Ticket (Detail View for Review & Edit) */}
        {selectedTicket && editMode && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-2xl w-full sm:w-96">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-zinc-900">
                Ticket Details
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-500 hover:text-zinc-700"
                onClick={handleCloseEdit}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Editing Mode or Review Mode */}
            <div className="mt-4">
              <label className="text-sm font-medium text-zinc-700">Title</label>
              <input
                type="text"
                className="mt-2 w-full px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-blue-500"
                value={editMode ? editableTicket.title : selectedTicket.title}
                onChange={(e) =>
                  setEditableTicket({
                    ...editableTicket,
                    title: e.target.value,
                  })
                }
                disabled={!editMode}
              />
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-zinc-700">
                Description
              </label>
              <textarea
                className="mt-2 w-full px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-blue-500"
                rows={4}
                value={
                  editMode
                    ? editableTicket.description
                    : selectedTicket.description
                }
                onChange={(e) =>
                  setEditableTicket({
                    ...editableTicket,
                    description: e.target.value,
                  })
                }
                disabled={!editMode}
              />
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-zinc-700">
                Story Points
              </label>
              <input
                type="number"
                className="mt-2 w-full px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-blue-500"
                value={
                  editMode
                    ? editableTicket.storyPoints
                    : selectedTicket.storyPoints
                }
                onChange={(e) =>
                  setEditableTicket({
                    ...editableTicket,
                    storyPoints: +e.target.value,
                  })
                }
                disabled={!editMode}
              />
            </div>

            <div className="mt-6 flex justify-between">
              {editMode ? (
                <Button
                  className="bg-green-500 text-white hover:bg-green-600"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              ) : (
                <Button
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  onClick={handleEdit}
                >
                  Edit Ticket
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Next Button */}
        <div className="flex justify-center mt-8">
          <Button
            className="w-full max-w-xs px-6 py-4 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-xl hover:scale-[1.05] transition-all duration-300"
            onClick={() => {
              // Proceed to next step
            }}
          >
            Next Step
          </Button>
        </div>
      </div>
    </main>
  );
}
