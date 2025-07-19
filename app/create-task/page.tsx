"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PRDReview from "@/components/PRDReview";
import { SparkInputField } from "@/components/SparkInputFiled";

export default function GeneratePRDPage() {
  const [prdText, setPrdText] = useState<any>(null); // full structured PRD object
  const [duration, setDuration] = useState("");
  const [resourceSize, setResourceSize] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Load PRD data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("prdData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPrdText(parsed.prd_document || {});
        setDuration(parsed.total_sprints_discussed || "");
        setResourceSize(
          parsed.employees_mentioned || parsed.total_employees_mentioned || ""
        );
      } catch (e) {
        console.error("Failed to parse PRD from localStorage:", e);
      }
    }
  }, []);

  const handleContinue = async () => {
    if (!prdText) return;

    // console.log('PRD Text:', prdText.stringify());
    const payload = {
      prd_document: JSON.stringify(prdText),
      // transcription: transcript.trim?.() || '',
      num_sprints: duration || "2",
    };

    try {
      setLoading(true);

      const response = await fetch("/api/get-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("assigned-tasks", JSON.stringify(result));
        window.location.href = "/create-tkt"; // OR router.push('/create-task');
      } else {
        console.error("Failed to continue:", result);
      }
    } catch (err) {
      console.error("Error continuing to task creation:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">📄 PRD Review</h1>

      {!prdText ? (
        <p className="text-zinc-500 text-center">
          No PRD found. Please generate one first.
        </p>
      ) : (
        <>
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">
              Generated Product Requirements
            </h2>
            <PRDReview prdText={prdText} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <SparkInputField
              label="Duration of Project (Sprints)"
              value={duration}
              onChange={setDuration}
              placeholder="e.g. 2"
              showButton
              onAIClick={async () => {
                try {
                  // const prdText = localStorage.getItem("prd-text") ?? "";
                  const response = await fetch("/api/get-ai-sprint-estimate", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      prd_document: JSON.stringify(prdText),
                    }),
                  });

                  const data = await response.json();
                  console.log("AI Sprint Estimate Response:", data);

                  return {
                    value: data.estimate,
                    reason: data.reason,
                  };
                } catch (error) {
                  console.error("AI sprint estimate error:", error);
                  return {
                    value: duration,
                    reason: "AI estimation failed. Please try again.",
                  };
                }
              }}
            />

            <SparkInputField
              label="Team Size (Total Employees)"
              value={resourceSize}
              onChange={setResourceSize}
              placeholder="e.g. 5"
              showButton
              onAIClick={async () => {
                try {
                  // const prdText = localStorage.getItem("prd-text") ?? "";
                  const response = await fetch("/api/get-ai-employee-estimate", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      prd_document: JSON.stringify(prdText),
                    }),
                  });

                  const data = await response.json();
                  console.log("AI Employee Estimate Response:", data);

                  return {
                    value: data.estimate,
                    reason: data.reason,
                  };
                } catch (error) {
                  console.error("AI employee estimate error:", error);
                  return {
                    value: duration,
                    reason: "AI estimation failed. Please try again.",
                  };
                }
              }}
            />
          </div>

          <div className="text-center">
            <Button
              onClick={handleContinue}
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 text-white bg-black hover:bg-zinc-900 rounded-full flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Continue to Create Task
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
