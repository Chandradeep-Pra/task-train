"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { CheckCircle2, ClipboardPenLine, FileText, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function GeneratePRD() {
  const [mode, setMode] = useState<"pdf" | "text">("pdf");
  const [parsedText, setParsedText] = useState("");
  const [fileName, setFileName] = useState("");
  const [generating, setGenerating] = useState(false);
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
    const formData = new FormData();
    formData.append("file", file);
    const toastId = toast.loading("Step 1/3: Preparing PDF...");

    fetch("/api/extract-text", {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        toast.loading("Step 2/3: Extracting PDF text...", { id: toastId });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to parse file");
        }

        setParsedText(data.text || "");
        toast.success("Step 3/3: PDF text is ready.", { id: toastId });
      })
      .catch((error) => {
        console.error("PDF Parse Error:", error);
        toast.error("PDF parsing failed. Please try again.", { id: toastId });
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
  });

  const handleGeneratePRD = async () => {
    if (!parsedText || generating) return;

    const toastId = toast.loading("Step 1/4: Preparing your source text...");
    setGenerating(true);

    try {
      toast.loading("Step 2/4: Sending context to AI...", { id: toastId });
      const res = await fetch("/api/get-prd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcription: parsedText }),
      });

      toast.loading("Step 3/4: Structuring product requirements...", { id: toastId });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate PRD");
      }

      toast.loading("Step 4/4: Saving PRD and opening review...", { id: toastId });
      localStorage.setItem("prdData", JSON.stringify(data));
      toast.success("PRD is ready. Opening review...", { id: toastId });
      setTimeout(() => router.push("/create-task"), 500);
    } catch (err) {
      console.error("PRD Generation Error:", err);
      toast.error("Failed to generate PRD. Please try again.", { id: toastId });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-65px)] bg-[var(--tt-shell)] px-4 py-8 text-[var(--tt-ink)] lg:px-6">
      <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1fr_360px]">
        <section className="tt-surface rounded-lg border p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--tt-border)] bg-[color-mix(in_oklab,var(--tt-brand)_10%,transparent)] px-3 py-1 text-sm font-medium text-[var(--tt-brand)]">
                <ClipboardPenLine className="h-4 w-4" />
                PRD intake
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-[var(--tt-ink)]">Generate PRD</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--tt-soft)]">
                Upload a meeting PDF or paste raw notes. TaskTrack will structure the context into a product requirement document.
              </p>
            </div>
          </div>

          <ToggleGroup
            type="single"
            value={mode}
            onValueChange={(val) => val && setMode(val as "pdf" | "text")}
            className="mb-5 inline-flex rounded-lg border border-[var(--tt-border)] bg-[color-mix(in_oklab,var(--tt-ink)_4%,transparent)] p-1"
          >
            <ToggleGroupItem value="pdf" className="rounded-md data-[state=on]:bg-[var(--tt-surface-solid)] data-[state=on]:text-[var(--tt-ink)]">
              Upload PDF
            </ToggleGroupItem>
            <ToggleGroupItem value="text" className="rounded-md data-[state=on]:bg-[var(--tt-surface-solid)] data-[state=on]:text-[var(--tt-ink)]">
              Text Mode
            </ToggleGroupItem>
          </ToggleGroup>

          {mode === "pdf" ? (
            <div
              {...getRootProps()}
              className={`group grid min-h-[240px] cursor-pointer place-items-center rounded-lg border-2 border-dashed p-6 text-center transition ${
                isDragActive
                  ? "border-[var(--tt-brand)] bg-[color-mix(in_oklab,var(--tt-brand)_12%,transparent)]"
                  : "border-[var(--tt-border)] bg-[color-mix(in_oklab,var(--tt-ink)_3%,transparent)] hover:border-[var(--tt-brand)]"
              }`}
            >
              <input {...getInputProps()} />
              <div>
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-[color-mix(in_oklab,var(--tt-brand)_12%,transparent)] text-[var(--tt-brand)]">
                  {parsedText ? <CheckCircle2 className="h-7 w-7" /> : <UploadCloud className="h-7 w-7" />}
                </div>
                <p className="mt-4 font-semibold text-[var(--tt-ink)]">
                  {isDragActive ? "Drop the PDF here" : parsedText ? fileName : "Upload product context"}
                </p>
                <p className="mt-2 text-sm text-[var(--tt-soft)]">
                  {parsedText ? "PDF text extracted and ready for PRD generation." : "Drag and drop a PDF, or click to select one."}
                </p>
              </div>
            </div>
          ) : (
            <Textarea
              className="min-h-[240px] w-full rounded-lg border-[var(--tt-border)] bg-[var(--tt-surface-solid)] text-[var(--tt-ink)] placeholder:text-[var(--tt-soft)]"
              placeholder="Paste meeting notes, rough requirements, or customer context here..."
              value={parsedText}
              onChange={(e) => setParsedText(e.target.value)}
            />
          )}

          <Button
            onClick={handleGeneratePRD}
            className="mt-5 h-11 w-full rounded-lg bg-[var(--tt-brand)] text-base font-semibold text-white hover:bg-[var(--tt-brand-strong)]"
            disabled={!parsedText || generating}
          >
            {generating ? "Generating PRD..." : "Generate PRD"}
          </Button>
        </section>

        <aside className="tt-surface rounded-lg border p-5">
          <h2 className="font-semibold text-[var(--tt-ink)]">What happens next</h2>
          <div className="mt-5 space-y-3">
            {[
              ["Extract", "Clean source material into usable context."],
              ["Structure", "Generate objective, features, timeline, risks, and metrics."],
              ["Review", "Open the PRD review screen before sprint creation."],
            ].map(([title, body], index) => (
              <div key={title} className="flex gap-3 rounded-lg border border-[var(--tt-border)] bg-[color-mix(in_oklab,var(--tt-ink)_3%,transparent)] p-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[color-mix(in_oklab,var(--tt-brand)_12%,transparent)] text-sm font-semibold text-[var(--tt-brand)]">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--tt-ink)]">{title}</p>
                  <p className="mt-1 text-sm leading-5 text-[var(--tt-soft)]">{body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-lg bg-[var(--tt-ink)] p-4 text-[var(--tt-surface-solid)]">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <FileText className="h-4 w-4" />
              Source readiness
            </div>
            <p className="text-sm leading-6 opacity-70">
              {parsedText ? `${parsedText.length.toLocaleString()} characters ready for AI processing.` : "Add source text to unlock PRD generation."}
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
