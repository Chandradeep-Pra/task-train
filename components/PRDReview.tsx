import React from "react";
import { Card } from "@/components/ui/card";

const sections = [
  { id: "objective", label: "🎯 Objective" },
  { id: "features", label: "🧩 Features" },
  { id: "timeline", label: "📆 Timeline" },
  { id: "target-audience", label: "👥 Audience" },
  { id: "tech-stack", label: "🛠️ Tech Stack" },
  { id: "challenges", label: "🚧 Challenges" },
  { id: "success-metrics", label: "📈 Success" },
];

export default function PRDReview({ prdText }: { prdText: any }) {
  if (!prdText || typeof prdText !== "object") return null;

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto p-6 scroll-smooth">
      {/* Sidebar */}
      <div className="md:w-1/4 sticky top-24 self-start hidden md:block">
        <Card className="p-4 space-y-2 bg-zinc-100">
          <h2 className="text-sm font-medium text-zinc-500 uppercase">Sections</h2>
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-zinc-700 hover:text-black text-sm block"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Content */}
      <div className="md:w-3/4 space-y-8 overflow-y-scroll max-h-screen">
        <Card className="p-6 rounded-2xl space-y-8 bg-zinc-50">

          {/* 🎯 Objective */}
          <section id="objective">
            <h3 className="text-lg font-semibold">🎯 Objective</h3>
            <p className="text-zinc-700">{prdText.objective}</p>
          </section>

          {/* 🧩 Features */}
          <section id="features">
            <h3 className="text-lg font-semibold">🧩 Features</h3>
            <ul className="list-disc list-inside text-zinc-700 space-y-1">
              {prdText.features?.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          {/* 📆 Timeline */}
          <section id="timeline">
            <h3 className="text-lg font-semibold">📆 Timeline</h3>
            <ul className="text-zinc-700 list-inside space-y-1">
              {prdText.timeline &&
                Object.entries(prdText.timeline).map(([key, val]) => (
                  <li key={key}>
                    <span className="font-medium">{key.replace(/_/g, " ")}:</span> {val}
                  </li>
                ))}
            </ul>
          </section>

          {/* 👥 Target Audience */}
          <section id="target-audience">
            <h3 className="text-lg font-semibold">👥 Target Audience</h3>
            <p className="text-zinc-700">{prdText.target_audience}</p>
          </section>

          {/* 🛠️ Tech Stack */}
          <section id="tech-stack">
            <h3 className="text-lg font-semibold">🛠️ Tech Stack</h3>
            <ul className="list-disc list-inside text-zinc-700 space-y-1">
              {prdText.tech_stack?.map((tech: string, i: number) => (
                <li key={i}>{tech}</li>
              ))}
            </ul>
          </section>

          {/* 🚧 Challenges */}
          <section id="challenges">
            <h3 className="text-lg font-semibold">🚧 Challenges</h3>
            <ul className="list-disc list-inside text-zinc-700 space-y-1">
              {prdText.challenges?.map((challenge: string, i: number) => (
                <li key={i}>{challenge}</li>
              ))}
            </ul>
          </section>

          {/* 📈 Success Metrics */}
          <section id="success-metrics">
            <h3 className="text-lg font-semibold">📈 Success Metrics</h3>
            <ul className="list-disc list-inside text-zinc-700 space-y-1">
              {prdText.success_metrics?.map((metric: string, i: number) => (
                <li key={i}>{metric}</li>
              ))}
            </ul>
          </section>
        </Card>
      </div>
    </div>
  );
}
