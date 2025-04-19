"use client";

import { useState, useRef } from "react";
import { Sparkles, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card } from "@/components/ui/card";

export default function TaskGenScreen() {
  const [prdType, setPrdType] = useState<"text" | "file">("text");
  const [prdText, setPrdText] = useState("");
  const [transcript, setTranscript] = useState("");
  const [duration, setDuration] = useState("");
  const [resourceSize, setResourceSize] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/extract-text", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setPrdText(data.text || "");
    } catch (err) {
      console.error("Error extracting text from file", err);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);

    const data = {
      // description: prdText,
      // days_to_complete: duration.trim() || "2",
      // transcript: transcript.trim(),
      // resource_size: resourceSize.trim(),
      prd_document: prdText.trim(),
    transcription: transcript.trim(),
       num_sprints: duration.trim() || "2",
    };

    try {
      const res = await fetch("/api/get-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      localStorage.setItem("assigned-tasks", JSON.stringify(result));
      console.log(result)
      // window.location.href = "/create-tkt";
    } catch (err) {
      console.error("Error while generating sprint:", err);
    } finally {
      setLoading(false);
    }
  };

  const isReady = prdText.trim().length > 0;

  return (
    <main className="min-h-screen bg-white px-4 mb-4 py-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">
            🧠 Generate Tasks with Zira
          </h1>
          <p className="text-zinc-500 mt-1 text-sm">
            Drop your PRD, set the context, and let Zira do the rest.
          </p>
        </div>

        <Card className="rounded-2xl border border-zinc-200 shadow-lg">
          <div className="max-h-[70vh] overflow-y-auto px-6 py-2 space-y-6">
            {/* PRD Input Section */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-zinc-700">
                Product Requirement Document
              </Label>
              <ToggleGroup
                type="single"
                value={prdType}
                onValueChange={(value) => setPrdType(value as "text" | "file")}
                className="flex border overflow-hidden border-zinc-200 bg-zinc-100 rounded-full  w-fit"
              >
                <ToggleGroupItem
                  value="text"
                  className="text-[11px] font-medium px-3 py-1 rounded-full transition-all data-[state=on]:bg-black data-[state=on]:text-white data-[state=off]:text-zinc-600 hover:bg-zinc-200"
                >
                  Text
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="file"
                  className="text-[11px] font-medium px-3 py-1 rounded-full transition-all data-[state=on]:bg-black data-[state=on]:text-white data-[state=off]:text-zinc-600 hover:bg-zinc-200"
                >
                  Upload
                </ToggleGroupItem>
              </ToggleGroup>

              {prdType === "text" ? (
                <Textarea
                  rows={6}
                  placeholder="Describe your product requirements..."
                  className="mt-2 resize-none bg-zinc-50 text-base rounded-xl focus:ring-2 focus:ring-blue-500"
                  value={prdText}
                  onChange={(e) => setPrdText(e.target.value)}
                />
              ) : (
                <div className="flex items-center gap-3 mt-2">
                  <Input
                    type="file"
                    accept=".pdf,.txt"
                    ref={fileInputRef}
                    className="bg-zinc-50 rounded-xl"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    className="hover:bg-zinc-100"
                  >
                    <Upload className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>

            {/* Transcript */}
            <div>
              <Label className="text-sm font-medium text-zinc-700">
                Meeting Transcript (Optional)
              </Label>
              <Textarea
                rows={4}
                placeholder="e.g. Last standup notes about the login module..."
                className="mt-1 bg-zinc-50 rounded-xl focus:ring-2 focus:ring-blue-500"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              />
            </div>
            <div className="flex w-full gap-4">
              {/* Duration */}
              <div className="w-full">
                <Label className="text-sm font-medium text-zinc-700">
                  Sprint Duration (in weeks)
                </Label>
                <Input
                  type="number"
                  min={1}
                  placeholder="Default: 2 weeks"
                  className="mt-1 bg-zinc-50 rounded-xl focus:ring-2 focus:ring-blue-500"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              {/* Resource Size */}
              <div className="w-full">
                <Label className="text-sm font-medium text-zinc-700">
                  Resource Size (e.g. number of developers)
                </Label>
                <Input
                  type="number"
                  min={1}
                  placeholder="e.g. 3"
                  className="mt-1 bg-zinc-50 rounded-xl focus:ring-2 focus:ring-blue-500"
                  value={resourceSize}
                  onChange={(e) => setResourceSize(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center px-6 py-6 border-t border-zinc-100">
            <Button
              size="lg"
              disabled={!isReady || loading}
              onClick={handleGenerate}
              className="px-6 py-3 rounded-full bg-black text-white hover:scale-[1.03] transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                  Generate Tasks
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
