import Link from "next/link";
import { ArrowRight, FilePlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptySprintState() {
  return (
    <main className="min-h-screen bg-[var(--tt-shell)] px-6 py-16 text-[var(--tt-ink)]">
      <section className="tt-surface mx-auto grid max-w-4xl place-items-center rounded-lg border px-6 py-20 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-lg bg-[color-mix(in_oklab,var(--tt-brand)_12%,transparent)] text-[var(--tt-brand)]">
          <FilePlus2 className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold">No sprint plan yet</h1>
        <p className="mt-3 max-w-xl text-[var(--tt-soft)]">
          Generate a PRD first, then TaskTrack will break it into sprint-ready stories here.
        </p>
        <Button asChild className="mt-8 rounded-lg bg-[var(--tt-brand)] text-white hover:bg-[var(--tt-brand-strong)]">
          <Link href="/generate-prd">
            Generate PRD
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>
    </main>
  );
}
