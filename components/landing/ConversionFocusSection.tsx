import Link from "next/link";
import { ClipboardList, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const useCases = [
  "Product teams turning calls into delivery plans",
  "Scrum leads preparing sprint-ready backlogs",
  "Engineering managers balancing ownership and load",
];

export function ConversionFocusSection() {
  return (
    <section className="bg-[#0a2540] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7ee7c5]">Conversion focus</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight">One CTA, one job: start the planning run.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
            The landing page centers the product's highest-intent action, reinforces outcomes with proof, and shows a concrete preview of what the AI produces.
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
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#7ee7c5]/15">
              <ShieldCheck className="h-5 w-5 text-[#7ee7c5]" />
            </div>
            <div>
              <p className="font-semibold">Best fit for</p>
              <p className="text-sm text-white/55">Teams that need usable plans fast</p>
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
  );
}
