import { AlertTriangle, BarChart3, Calendar, Hammer, Puzzle, Target } from "lucide-react";
import type { PrdSection } from "./types";

export const prdSections: PrdSection[] = [
  {
    id: "objective",
    key: "objective",
    label: "Objective",
    helper: "The product problem, user need, and intended outcome.",
    icon: Target,
  },
  {
    id: "features",
    key: "features",
    label: "Features",
    helper: "Core capabilities that should become implementation tickets.",
    icon: Puzzle,
    list: true,
  },
  {
    id: "timeline",
    key: "timeline",
    label: "Timeline",
    helper: "Delivery constraints, sprint expectations, and sequencing notes.",
    icon: Calendar,
  },
  {
    id: "tech-stack",
    key: "tech_stack",
    label: "Tech Stack",
    helper: "Frameworks, services, integrations, and platform decisions.",
    icon: Hammer,
  },
  {
    id: "challenges",
    key: "challenges",
    label: "Risks",
    helper: "Known blockers, dependencies, unknowns, and edge cases.",
    icon: AlertTriangle,
    list: true,
  },
  {
    id: "success-metrics",
    key: "success_metrics",
    label: "Success Metrics",
    helper: "How the team will know the product work succeeded.",
    icon: BarChart3,
  },
];

export function getSectionValue(value: unknown) {
  if (Array.isArray(value)) return value.join("\n");
  if (typeof value === "string") return value;
  return "";
}

export function parseSectionValue(value: string, isList?: boolean) {
  if (!isList) return value;
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}
