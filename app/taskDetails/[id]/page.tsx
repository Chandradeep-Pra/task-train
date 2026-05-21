"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { ActionPanel } from "@/components/task-details/ActionPanel";
import { AssignmentPanel } from "@/components/task-details/AssignmentPanel";
import { DetailHeader } from "@/components/task-details/DetailHeader";
import { EditableSection } from "@/components/task-details/EditableSection";
import { EstimatePanel } from "@/components/task-details/EstimatePanel";
import { getDetailProgress, getLeadStoryPoints, updateStoredStoryPoint } from "@/components/task-details/helpers";
import { ProgressPanel } from "@/components/task-details/ProgressPanel";
import type { DeveloperEstimate, Employee, LeadEstimate } from "@/components/task-details/types";

export default function TaskDetailsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const initialUserStory = searchParams.get("user_story") || "";
  const sprintName = searchParams.get("sprintName") || "Sprint 1";

  const [userStory, setUserStory] = useState(initialUserStory);
  const [tempStory, setTempStory] = useState(initialUserStory);
  const [editingStory, setEditingStory] = useState(false);
  const [acceptanceCriteria, setAcceptanceCriteria] = useState<string | null>(null);
  const [tempCriteria, setTempCriteria] = useState("");
  const [editingCriteria, setEditingCriteria] = useState(false);
  const [assignedEmployee, setAssignedEmployee] = useState<Employee | null>(null);
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [developerEstimate, setDeveloperEstimate] = useState<DeveloperEstimate | null>(null);
  const [leadEstimate, setLeadEstimate] = useState<LeadEstimate | null>(null);
  const [storyPoint, setStoryPoint] = useState<number | null>(null);
  const [jiraIssueKey, setJiraIssueKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialUserStory) return;

    fetch("/api/get-task-description", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: initialUserStory }),
    })
      .then((res) => res.json())
      .then((data) => {
        const criteria = data.acceptanceCriteria || "No criteria generated.";
        setAcceptanceCriteria(criteria);
        setTempCriteria(criteria);
      })
      .catch((error) => {
        console.error("Error fetching criteria:", error);
        setAcceptanceCriteria("Failed to generate acceptance criteria.");
      });
  }, [initialUserStory]);

  useEffect(() => {
    const leadPoints = getLeadStoryPoints(leadEstimate);
    if (!developerEstimate?.estimated_story_points || !leadPoints) return;

    const average = Math.round((developerEstimate.estimated_story_points + leadPoints) / 2);
    setStoryPoint(average);
    updateStoredStoryPoint(initialUserStory, category, average);
  }, [category, developerEstimate, initialUserStory, leadEstimate]);

  const progress = useMemo(
    () =>
      getDetailProgress({
        acceptanceCriteria,
        assignedEmployee,
        developerEstimate,
        leadEstimate,
        storyPoint,
        jiraIssueKey,
      }),
    [acceptanceCriteria, assignedEmployee, developerEstimate, leadEstimate, storyPoint, jiraIssueKey]
  );

  const handleAssignClick = async () => {
    if (!category || !userStory) return toast.error("Missing category or user story.");

    setLoading(true);
    try {
      const response = await toast.promise(
        fetch("/api/get-employees", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category, user_story: userStory }),
        }),
        { loading: "Finding best owner...", success: "Owner suggestions ready.", error: "Failed to assign owner." }
      );
      const result = await response.json();
      setAllEmployees(result);
      setAssignedEmployee(result[0] || null);
    } finally {
      setLoading(false);
    }
  };

  const handleEstimateClick = async () => {
    if (!userStory || !assignedEmployee) return toast.error("Assign an owner before estimating.");

    setLoading(true);
    try {
      const response = await toast.promise(
        fetch("/api/get-developer-estimate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_story: userStory, dev_skills: assignedEmployee.skills }),
        }),
        { loading: "Estimating effort...", success: "Developer estimate ready.", error: "Developer estimate failed." }
      );
      const developerData = await response.json();
      setDeveloperEstimate(developerData);

      if (developerData.estimated_story_points) {
        await handleLeadEstimate(developerData.estimated_story_points);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLeadEstimate = async (projectAsk: number) => {
    const response = await fetch("/api/get-lead-estimate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_story: userStory, project_ask: projectAsk }),
    });
    setLeadEstimate(await response.json());
  };

  const handlePushToJira = async () => {
    if (!acceptanceCriteria || !storyPoint || !assignedEmployee) {
      return toast.error("Criteria, estimate, and owner are required.");
    }

    const response = await toast.promise(
      fetch("/api/create-jira-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: userStory,
          description: acceptanceCriteria,
          storyPoints: storyPoint,
          projectKey: "TD",
          assigneeId: assignedEmployee.assigneeId,
          sprintName: `TD ${sprintName}`,
        }),
      }),
      { loading: "Pushing to Jira...", success: "Jira handoff complete.", error: "Jira push failed." }
    );
    const data = await response.json();
    if (data.issueKey) setJiraIssueKey(data.issueKey);
  };

  return (
    <main className="min-h-[calc(100vh-65px)] bg-[var(--tt-shell)] p-4 text-[var(--tt-ink)] lg:p-6">
      <div className="mx-auto grid max-w-7xl gap-5 xl:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          <DetailHeader category={category} sprintName={sprintName} storyPoint={storyPoint} jiraIssueKey={jiraIssueKey} />
          <EditableSection
            title="User story"
            accentClass="border-indigo-500"
            value={userStory}
            tempValue={tempStory}
            isEditing={editingStory}
            onTempChange={setTempStory}
            onEdit={() => setEditingStory(true)}
            onSave={() => {
              setUserStory(tempStory);
              setEditingStory(false);
            }}
            onCancel={() => {
              setTempStory(userStory);
              setEditingStory(false);
            }}
          />
          <EditableSection
            title="Acceptance criteria"
            accentClass="border-amber-500"
            value={acceptanceCriteria || ""}
            tempValue={tempCriteria}
            isEditing={editingCriteria}
            renderMarkdown
            onTempChange={setTempCriteria}
            onEdit={() => setEditingCriteria(true)}
            onSave={() => {
              setAcceptanceCriteria(tempCriteria);
              setEditingCriteria(false);
            }}
            onCancel={() => {
              setTempCriteria(acceptanceCriteria || "");
              setEditingCriteria(false);
            }}
          />
          <EstimatePanel
            developerEstimate={developerEstimate}
            leadEstimate={leadEstimate}
            storyPoint={storyPoint}
            onStoryPointChange={setStoryPoint}
          />
        </div>

        <div className="space-y-5">
          <ProgressPanel score={progress.score} steps={progress.steps} />
          <AssignmentPanel assignedEmployee={assignedEmployee} allEmployees={allEmployees} onManualChange={(name) => {
            setAssignedEmployee(allEmployees.find((employee) => employee.name === name) || null);
          }} />
          <ActionPanel
            loading={loading}
            canEstimate={Boolean(assignedEmployee)}
            canPush={Boolean(acceptanceCriteria && storyPoint && assignedEmployee)}
            onAssign={handleAssignClick}
            onEstimate={handleEstimateClick}
            onPushToJira={handlePushToJira}
          />
        </div>
      </div>
    </main>
  );
}
