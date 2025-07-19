"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function GeneratePRD() {
  const [mode, setMode] = useState<"pdf" | "text">("pdf");
  const [parsedText, setParsedText] = useState("");
  const [fileName, setFileName] = useState("");

  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
    const formData = new FormData();
    formData.append("file", file); // 👈 FIXED: use lowercase 'file'

    toast.promise(
      fetch("/api/extract-text", {
        method: "POST",
        body: formData,
      }).then(async (res) => {
        const { text } = await res.json(); // 👈 Adjusted based on your API response
        setParsedText(text);
      }),
      {
        loading: "Parsing PDF...",
        success: "File parsed successfully!",
        error: "Failed to parse file",
      }
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
  });

const handleGeneratePRD = async () => {
  if (!parsedText) return;

  const toastId = toast.loading("Generating PRD...");
  try {
    const res = await fetch("/api/get-prd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transcription: parsedText,
      }),
    });

    const data = await res.json();
    console.log("🎯 PRD:", data);

    localStorage.setItem("prdData", JSON.stringify(data));

    toast.success("PRD received!", { id: toastId });

    // ✅ Do NOT reuse the same toastId here!
    toast("Redirecting to task creation...");
    setTimeout(() => {
  router.push("/create-task");
}, 500);

  } catch (err) {
    toast.error("Failed to generate PRD", { id: toastId });
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-6">
      <Toaster />
      <Card className="w-full max-w-3xl rounded-3xl shadow-2xl border border-gray-200 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Generate PRD
          </h2>

          <ToggleGroup
            type="single"
            value={mode}
            onValueChange={(val) => val && setMode(val as "pdf" | "text")}
            className="mb-4"
          >
            <ToggleGroupItem value="pdf">Upload PDF</ToggleGroupItem>
            <ToggleGroupItem value="text">Text Mode</ToggleGroupItem>
          </ToggleGroup>

          {mode === "pdf" ? (
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-400 rounded-xl p-6 text-center cursor-pointer bg-white shadow-inner"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-gray-600">Drop the PDF here...</p>
              ) : parsedText ? (
                <p className="text-green-700">
                  ✅ {fileName} uploaded successfully!
                </p>
              ) : (
                <p className="text-gray-600">
                  Drag & drop a PDF here, or click to select one.
                </p>
              )}
            </div>
          ) : (
            <Textarea
              className="w-full min-h-[180px]"
              placeholder="Paste your text here..."
              value={parsedText}
              onChange={(e) => setParsedText(e.target.value)}
            />
          )}

          <Button
            onClick={handleGeneratePRD}
            className="w-full text-base font-semibold bg-purple-600 hover:bg-purple-700"
            disabled={!parsedText}
          >
            Generate PRD
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
