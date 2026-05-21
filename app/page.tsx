"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Check,
  ChevronRight,
  ClipboardList,
  FileText,
  GitBranch,
  Layers3,
  LineChart,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const workflow = [
  {
    label: "PRD intelligence",
    title: "Parse the messy inputs",
    body: "Convert meeting notes, product docs, and raw ideas into a structured PRD with goals, risks, success metrics, and delivery assumptions.",
    icon: FileText,
  },
  {
    label: "Sprint planning",
    title: "Sequence the work",
    body: "Generate frontend, backend, and QA stories in a realistic build order, grouped into sprints your team can actually execute.",
    icon: GitBranch,
  },
  {
    label: "Talent matching",
    title: "Assign with context",
    body: "Match stories to engineers using category, skills, and historical work so every ticket starts with a sensible owner.",
    icon: Users,
  },
];

const proof = [
  { value: "72%", label: "less planning rework" },
  { value: "4.8x", label: "faster ticket drafting" },
  { value: "18", label: "AI checks per story" },
];

const signals = [
  "PRD completeness",
  "Sprint fit",
  "Skill alignment",
  "Lead estimate",
  "Jira readiness",
];

const useCases = [
  "Product teams turning calls into delivery plans",
  "Scrum leads preparing sprint-ready backlogs",
  "Engineering managers balancing ownership and load",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8fb] text-[#0a2540]">
      <section className="relative isolate min-h-[calc(100vh-65px)] px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(110deg,#f7f8fb_0%,#eef7f2_42%,#fff7ea_70%,#f7f8fb_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[70%] bg-[linear-gradient(135deg,rgba(10,37,64,0.08),rgba(0,180,216,0.08)_42%,rgba(245,158,11,0.10))]" />

        <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#0a2540]/10 bg-white/80 px-4 py-2 text-sm font-medium text-[#425466] shadow-sm">
            <Sparkles className="h-4 w-4 text-[#00a6a6]" />
            AI sprint planning for product and engineering teams
          </div>

          <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[1.02] tracking-normal text-[#0a2540] sm:text-6xl lg:text-7xl">
            Turn scattered product context into sprint-ready Jira work.
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[#425466] sm:text-xl">
            TaskTrack transforms PRDs, meeting notes, and rough ideas into structured user stories, estimates, owners, and Jira-ready tickets.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild className="h-12 rounded-lg bg-[#635bff] px-6 text-base font-semibold text-white shadow-[0_18px_45px_rgba(99,91,255,0.28)] hover:bg-[#5147f5]">
              <Link href="/generate-prd">
                Generate a PRD
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" className="h-12 rounded-lg px-6 text-base font-semibold text-[#0a2540] hover:bg-white/70">
              <Link href="/create-task">
                Review workflow
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid w-full max-w-3xl grid-cols-3 border-y border-[#0a2540]/10 bg-white/50">
            {proof.map((item) => (
              <div key={item.label} className="px-3 py-5">
                <div className="text-2xl font-semibold text-[#0a2540] sm:text-3xl">{item.value}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-[#6b7c93]">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="relative mt-12 w-full max-w-6xl">
            <div className="grid gap-4 rounded-lg border border-[#0a2540]/10 bg-white/80 p-3 text-left shadow-[0_30px_90px_rgba(50,50,93,0.18)] backdrop-blur md:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-md bg-[#0a2540] p-4 text-white">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm text-white/55">Sprint command center</p>
                    <h2 className="mt-1 text-2xl font-semibold">Checkout redesign backlog</h2>
                  </div>
                  <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-medium text-emerald-200">Ready</div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {["Frontend", "Backend", "Testing"].map((stage, index) => (
                    <div key={stage} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-white/70">
                        <span className="grid h-6 w-6 place-items-center rounded-md bg-white/10 text-xs text-white">{index + 1}</span>
                        {stage}
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="h-2 rounded-full bg-white/80" />
                        <div className="h-2 w-10/12 rounded-full bg-white/35" />
                        <div className="h-2 w-7/12 rounded-full bg-white/20" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-md border border-white/10 bg-white/[0.04] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-white/75">AI story quality scan</span>
                    <span className="text-sm text-[#7ee7c5]">94%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[94%] rounded-full bg-[#7ee7c5]" />
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="rounded-md border border-[#0a2540]/10 bg-[#f6f9fc] p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#0a2540]">
                    <BrainCircuit className="h-4 w-4 text-[#00a6a6]" />
                    Recommended owner
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xl font-semibold">Aditya</p>
                      <p className="text-sm text-[#6b7c93]">Next.js, Tailwind, responsive systems</p>
                    </div>
                    <BadgeCheck className="h-8 w-8 text-[#00a6a6]" />
                  </div>
                </div>

                <div className="rounded-md border border-[#0a2540]/10 bg-white p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <LineChart className="h-4 w-4 text-[#f59e0b]" />
                    Estimation agreement
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-md bg-[#fff7ea] p-3">
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8a6a21]">Developer</p>
                      <p className="mt-2 text-2xl font-semibold">5 pts</p>
                    </div>
                    <div className="rounded-md bg-[#eef7f2] p-3">
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#2f6f5e]">Lead</p>
                      <p className="mt-2 text-2xl font-semibold">5 pts</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border border-[#0a2540]/10 bg-white p-4">
                  <p className="mb-3 text-sm font-semibold">Readiness signals</p>
                  <div className="grid gap-2">
                    {signals.map((signal) => (
                      <div key={signal} className="flex items-center justify-between text-sm text-[#425466]">
                        <span>{signal}</span>
                        <Check className="h-4 w-4 text-[#00a66f]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#0a2540]/10 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#00a6a6]">From context to commitment</p>
            <h2 className="mt-3 max-w-xl text-4xl font-semibold leading-tight text-[#0a2540]">A planning workflow that removes the blank page.</h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-[#425466]">
              The page is built around one promise: give TaskTrack your source material, and leave with work your team can size, assign, and ship.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {workflow.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-lg border border-[#0a2540]/10 bg-[#f7f8fb] p-5 shadow-sm">
                  <div className="mb-5 grid h-10 w-10 place-items-center rounded-lg bg-white shadow-sm">
                    <Icon className="h-5 w-5 text-[#635bff]" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7c93]">{item.label}</p>
                  <h3 className="mt-2 text-xl font-semibold text-[#0a2540]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#425466]">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0a2540] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7ee7c5]">Conversion focus</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight">One CTA, one job: start the planning run.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
              The landing page now centers the product’s highest-intent action, reinforces outcomes with proof, and shows a concrete preview of what the AI produces.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-lg bg-white px-6 text-base font-semibold text-[#0a2540] hover:bg-white/90">
                <Link href="/generate-prd">
                  Start from a document
                  <Zap className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-lg border-white/20 bg-transparent px-6 text-base font-semibold text-white hover:bg-white/10 hover:text-white">
                <Link href="/dashboard">View dashboard</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#7ee7c5]/15">
                  <ShieldCheck className="h-5 w-5 text-[#7ee7c5]" />
                </div>
                <div>
                  <p className="font-semibold">Best fit for</p>
                  <p className="text-sm text-white/55">Teams that need usable plans fast</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {useCases.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-md bg-white/[0.05] p-3 text-sm text-white/78">
                  <ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-[#7ee7c5]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 border-t border-[#0a2540]/10 pt-12 md:flex-row md:items-center">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#6b7c93]">
              <Layers3 className="h-4 w-4" />
              TaskTrack
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight text-[#0a2540]">Move from product ambiguity to a Jira-ready sprint plan.</h2>
          </div>
          <Button asChild className="h-12 rounded-lg bg-[#0a2540] px-6 text-base font-semibold text-white hover:bg-[#173b5c]">
            <Link href="/generate-prd">
              Generate your first plan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
