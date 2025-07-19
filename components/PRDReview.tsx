import React from "react";
import { Card } from "@/components/ui/card";
import {
  Target,
  Puzzle,
  Calendar,
  Users,
  Hammer,
  AlertTriangle,
  BarChart,
} from "lucide-react";

const sections = [
  { id: "objective", label: "Objective", icon: <Target className="w-4 h-4 mr-2" /> },
  { id: "features", label: "Features", icon: <Puzzle className="w-4 h-4 mr-2" /> },
  { id: "timeline", label: "Timeline", icon: <Calendar className="w-4 h-4 mr-2" /> },
  { id: "tech-stack", label: "Tech Stack", icon: <Hammer className="w-4 h-4 mr-2" /> },
  { id: "challenges", label: "Challenges", icon: <AlertTriangle className="w-4 h-4 mr-2" /> },
  { id: "success-metrics", label: "Success Metrics", icon: <BarChart className="w-4 h-4 mr-2" /> },
];

export default function PRDReview({ prdText }: { prdText: any }) {
  if (!prdText || typeof prdText !== "object") return null;

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto px-6 py-10 scroll-smooth">
      {/* Sidebar Navigation */}
      <aside className="md:w-1/4 sticky top-24 self-start hidden md:block">
        <Card className="p-4 space-y-2 bg-zinc-100">
          <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wide mb-2">
            Sections
          </h2>
          <ul className="space-y-2">
            {sections.map(({ id, label, icon }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="flex items-center text-sm text-zinc-700 hover:text-black transition"
                >
                  {icon}
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </aside>

      {/* Content Area */}
      <main className="md:w-3/4 space-y-8 overflow-y-scroll max-h-screen pr-2">
        <Card className="p-6 rounded-2xl space-y-8 bg-zinc-50">

          {/* Objective */}
          <section id="objective">
            <h3 className="text-lg font-semibold flex items-center mb-2">
              <Target className="w-5 h-5 mr-2" />
              Objective
            </h3>
            <p className="text-zinc-700">{prdText.objective}</p>
          </section>

          {/* Features */}
          <section id="features">
            <h3 className="text-lg font-semibold flex items-center mb-2">
              <Puzzle className="w-5 h-5 mr-2" />
              Features
            </h3>
            <ul className="list-disc list-inside text-zinc-700 space-y-1">
              {prdText.features?.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Timeline */}
          <section id="timeline">
            <h3 className="text-lg font-semibold flex items-center mb-2">
              <Calendar className="w-5 h-5 mr-2" />
              Timeline
            </h3>
            <p className="text-zinc-700 whitespace-pre-line">{prdText.timeline}</p>
          </section>

          {/* Tech Stack */}
          <section id="tech-stack">
            <h3 className="text-lg font-semibold flex items-center mb-2">
              <Hammer className="w-5 h-5 mr-2" />
              Tech Stack
            </h3>
            <p className="text-zinc-700 whitespace-pre-line">{prdText.tech_stack}</p>
          </section>

          {/* Challenges */}
          <section id="challenges">
            <h3 className="text-lg font-semibold flex items-center mb-2">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Challenges
            </h3>
            <ul className="list-disc list-inside text-zinc-700 space-y-1">
              {prdText.challenges?.map((challenge: string, i: number) => (
                <li key={i}>{challenge}</li>
              ))}
            </ul>
          </section>

          {/* Success Metrics */}
          <section id="success-metrics">
            <h3 className="text-lg font-semibold flex items-center mb-2">
              <BarChart className="w-5 h-5 mr-2" />
              Success Metrics
            </h3>
            <p className="text-zinc-700 whitespace-pre-line">{prdText.success_metrics}</p>
          </section>

        </Card>
      </main>
    </div>
  );
}
