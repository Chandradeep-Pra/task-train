"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function TaskDetailsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const user_story = searchParams.get("user_story");

  const [acceptanceCriteria, setAcceptanceCriteria] = useState<string | null>(null);
  const [assignedEmployee, setAssignedEmployee] = useState<{ name: string; skills: string[] } | null>(null);
  const [estimateResult, setEstimateResult] = useState<{ estimated_story_points?: number; explanation?: string } | null>(null);
  const [leadEstimate, setLeadEstimate] = useState<{ final_story_points?: number; explanation?: string } | null>(null);
  const [storyPoint, setStoryPoint] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch acceptance criteria on mount
  useEffect(() => {
    if (user_story) {
      const fetchAcceptanceCriteria = async () => {
        try {
          const res = await fetch("/api/get-task-description", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task: user_story }),
          });
          const data = await res.json();
          setAcceptanceCriteria(data.acceptanceCriteria || "No criteria generated.");
        } catch (err) {
          console.error("Error fetching acceptance criteria:", err);
          setAcceptanceCriteria("Failed to generate acceptance criteria.");
        }
      };

      fetchAcceptanceCriteria();
    }
  }, [user_story]);

  // Calculate story point average once both estimates are available
  useEffect(() => {
    if (estimateResult?.estimated_story_points && leadEstimate?.final_story_points) {
      const average =
        (estimateResult.estimated_story_points + leadEstimate.final_story_points) / 2;
      setStoryPoint(average);

      // Update ticket in localStorage
      const assignedTasks = JSON.parse(localStorage.getItem("assigned-tasks") || "[]");
      const updatedTasks = assignedTasks.map((task: any) => {
        if (task.user_story === user_story && task.category === category) {
          return { ...task, story_point: average };
        }
        return task;
      });
      localStorage.setItem("assigned-tasks", JSON.stringify(updatedTasks));
    }
  }, [estimateResult, leadEstimate, user_story, category]);

  const handleAssignClick = async () => {
    if (!category || !user_story) {
      setError("Missing category or user story.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/get-employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, user_story }),
      });

      if (!response.ok) throw new Error("Failed to assign employee");

      const result = await response.json();
      setAssignedEmployee(result);
    } catch (err) {
      console.error("Error assigning employee:", err);
      setError("Failed to assign employee.");
    } finally {
      setLoading(false);
    }
  };

  const handleLeadEstimate = async (project_ask: number) => {
    if (!user_story || !project_ask) return;

    try {
      const response = await fetch("/api/get-lead-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_story, project_ask }),
      });

      if (!response.ok) throw new Error("Failed to fetch lead estimate");

      const result = await response.json();
      setLeadEstimate(result);
      setStoryPoint((prev) =>
        prev !== null && result?.lead_estimate !== undefined
          ? Math.floor((prev + result.lead_estimate) / 2)
          : prev
      );
      // setStoryPoint((prev) => prev/2)
    } catch (err) {
      console.error("Error fetching lead estimate:", err);
      setError("Failed to get lead estimate.");
    }
  };

  const handleEstimateClick = async () => {
    if (!user_story || !assignedEmployee || assignedEmployee.skills.length === 0) {
      setError("Missing user story or assigned employee's skills.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/get-developer-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_story,
          dev_skills: assignedEmployee.skills,
        }),
      });

      if (!response.ok) throw new Error("Failed to estimate story points");

      const result = await response.json();
      setEstimateResult(result);
      setStoryPoint(result.estimated_story_points)

      if (result.estimated_story_points) {
        await handleLeadEstimate(result.estimated_story_points);
      }
    } catch (err) {
      console.error("Error estimating story points:", err);
      setError("Failed to estimate story points.");
    } finally {
      setLoading(false);
    }
  };

  if (!category || !user_story) {
    return (
      <div className="flex h-[60vh] justify-center items-center text-zinc-400">
        Ticket not found
      </div>
    );
  }

  const categoryStyles: Record<string, string> = {
    design: "bg-blue-100 text-blue-700",
    frontend: "bg-green-100 text-green-700",
    backend: "bg-purple-100 text-purple-700",
    research: "bg-yellow-100 text-yellow-700",
    testing: "bg-pink-100 text-pink-700",
    default: "bg-gray-100 text-gray-700",
  };

  const getCategoryStyle = (cat: string) =>
    categoryStyles[cat.toLowerCase()] || categoryStyles.default;

  return (
    <main className="px-8 py-12 bg-white text-zinc-900">
      <div className="max-w-4xl mx-auto mb-8 border-b border-zinc-200 pb-6">
        <h1 className="text-4xl font-semibold tracking-tight leading-tight mb-4 text-zinc-900">
          Ticket Details
        </h1>
        <span
          className={`inline-block capitalize text-sm font-medium px-4 py-2 rounded-full ${getCategoryStyle(category)} shadow-md`}
        >
          {category}
        </span>
        <div className="mt-4 text-lg text-indigo-600 font-medium">
          {storyPoint !== null
            ? `Final Story Point: ${storyPoint}`
            : "Story point needs to be discussed."}
        </div>
      </div>

      <section className="max-w-4xl mx-auto mb-8">
        <h2 className="text-xl text-zinc-600 font-semibold mb-3">User Story</h2>
        <p className="text-lg font-medium text-zinc-800 leading-relaxed border-l-4 pl-6 border-indigo-500">
          {user_story}
        </p>
      </section>

      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-xl text-zinc-600 font-semibold mb-3">Acceptance Criteria</h2>
        <p className="text-lg font-medium text-zinc-800 leading-relaxed border-l-4 pl-6 border-amber-500">
          {acceptanceCriteria || "Generating..."}
        </p>
      </section>

      {assignedEmployee && (
        <section className="max-w-4xl mx-auto mb-8">
          <h2 className="text-xl text-zinc-600 font-semibold mb-3">Assigned Employee</h2>
          <p className="text-lg font-medium text-zinc-800 leading-relaxed border-l-4 pl-6 border-green-500">
            {assignedEmployee.name} - Skills: {assignedEmployee.skills.join(", ")}
          </p>
        </section>
      )}

      {estimateResult && (
        <section className="max-w-4xl mx-auto mb-8">
          <h2 className="text-xl text-zinc-600 font-semibold mb-3">Developer Estimate</h2>
          <p className="text-lg font-medium text-zinc-800 leading-relaxed border-l-4 pl-6 border-blue-500">
            Estimated Story Points: {estimateResult.estimated_story_points}
          </p>
          <p className="text-sm text-zinc-600 pl-6">{estimateResult.explanation}</p>
        </section>
      )}

      {leadEstimate && (
        <section className="max-w-4xl mx-auto mb-8">
          <h2 className="text-xl text-zinc-600 font-semibold mb-3">Lead Estimate</h2>
          <p className="text-lg font-medium text-zinc-800 leading-relaxed border-l-4 pl-6 border-fuchsia-500">
            Final Story Points: {leadEstimate.lead_estimate}
          </p>
          {leadEstimate.explanation && (
            <p className="text-sm text-zinc-600 pl-6">{leadEstimate.explanation}</p>
          )}
        </section>
      )}

      {error && <div className="text-red-500">{error}</div>}

      <section className="flex justify-end mt-10 gap-4">
        <Button
          variant="default"
          className="rounded-full px-8 py-3 bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition duration-300 ease-in-out"
          onClick={handleAssignClick}
          disabled={loading}
        >
          {loading ? "Assigning..." : "Assign To"}
        </Button>

        <Button
          className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg rounded-full shadow-xl transform transition-transform hover:scale-105 hover:shadow-2xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleEstimateClick}
          disabled={loading || !assignedEmployee}
        >
          Estimate Story Point
        </Button>
      </section>
    </main>
  );
}
