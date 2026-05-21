import { Bot, Braces, CheckCircle2, Code2, GitBranch, PackageCheck, Repeat2, TestTube2 } from "lucide-react";

const nodes = [
  { title: "Product intent", body: "PRDs, tickets, scope, acceptance criteria", icon: GitBranch, className: "left-[4%] top-[12%]" },
  { title: "TaskTrack loop", body: "Plans work, routes context, tracks state", icon: Repeat2, className: "left-[38%] top-[8%]" },
  { title: "Coding agents", body: "Codex, Claude Code, and more agents", icon: Bot, className: "right-[4%] top-[12%]" },
  { title: "Generate code", body: "Implementation branches and diffs", icon: Code2, className: "left-[10%] bottom-[12%]" },
  { title: "Test product", body: "Automated checks and product validation", icon: TestTube2, className: "left-[42%] bottom-[8%]" },
  { title: "Ship signal", body: "Review status flows back into planning", icon: PackageCheck, className: "right-[7%] bottom-[12%]" },
];

export function FutureVisionSection() {
  return (
    <section className="bg-[#05070d] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7ee7c5]">Future vision</p>
          <h2 className="mt-3 text-4xl font-semibold leading-tight">
            A closed-loop system for planning, coding, testing, and learning.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/65">
            TaskTrack is moving toward a control plane that connects Codex, Claude Code, and coding agents to generate code, test product changes end to end, and feed outcomes back into delivery planning.
          </p>
        </div>

        <div className="relative min-h-[560px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
          <SystemLines />
          {nodes.map((node) => {
            const Icon = node.icon;
            return (
              <article key={node.title} className={`absolute z-10 w-[250px] rounded-lg border border-white/12 bg-[#0f1118]/90 p-4 backdrop-blur ${node.className}`}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#7c6df2]/15 text-[#9b93ff]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{node.title}</h3>
                </div>
                <p className="text-sm leading-6 text-white/58">{node.body}</p>
              </article>
            );
          })}

          <div className="absolute left-1/2 top-1/2 z-20 w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-[#7ee7c5]/30 bg-[#7ee7c5]/10 p-5 text-center backdrop-blur">
            <Braces className="mx-auto h-7 w-7 text-[#7ee7c5]" />
            <p className="mt-3 font-semibold">Closed loop runtime</p>
            <p className="mt-2 text-sm leading-6 text-white/65">Plan, code, test, review, and update the next plan.</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#7ee7c5]/15 px-3 py-1 text-xs font-semibold text-[#7ee7c5]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Continuous context
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SystemLines() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 560" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="flowLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c6df2" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#7ee7c5" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7c6df2" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {[
        "M170 120 C360 70 500 120 600 245 C715 120 850 80 1030 120",
        "M170 430 C330 505 500 430 600 315 C720 440 880 500 1030 430",
        "M250 160 C280 260 280 330 250 400",
        "M950 160 C920 260 920 330 950 400",
        "M350 430 C470 360 500 330 600 315 C720 335 780 370 860 430",
      ].map((path, index) => (
        <g key={path}>
          <path id={`flow-${index}`} d={path} fill="none" stroke="url(#flowLine)" strokeWidth="2" strokeDasharray="8 10" />
          <circle r="4" fill="#7ee7c5">
            <animateMotion dur={`${4 + index}s`} repeatCount="indefinite" path={path} />
          </circle>
        </g>
      ))}
    </svg>
  );
}
