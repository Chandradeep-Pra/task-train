'use client';

import { Button } from "@/components/ui/button";
import { Sparkles, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-transparent backdrop-blur-md bg-white/70 shadow-md">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between animate-fadeIn">

        {/* Left: Zira Branding */}
        <div className="flex items-center gap-3">
          <Link href="/create-task">
          <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg grid place-items-center text-white font-bold text-sm">
            TT
          </div>
          </Link>
          <span className="text-lg font-semibold text-zinc-900 tracking-tight">
            Task<span className="text-blue-500">Track</span>
          </span>
        </div>

        {/* Center: Search Command Bar */}
        {/* <div className="relative w-full max-w-lg mx-6">
          <Input
            type="text"
            placeholder="⌘ + K to search anything..."
            className="pl-4 pr-4 py-2 text-sm bg-white border border-zinc-200 rounded-xl shadow-sm transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-md shadow-inner">
            ⌘ K
          </div>
        </div> */}

        {/* Right: AI Button + Avatar */}
        {/* <div className="flex items-center gap-4">
          <Button
            className="rounded-full px-4 py-2 bg-gradient-to-tr from-zinc-900 to-zinc-800 text-white shadow-xl hover:from-zinc-800 hover:to-zinc-700 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            Ask Zira
          </Button>

          <div className="relative group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center shadow-inner hover:scale-105 transition-all duration-200">
              <User className="w-5 h-5 text-zinc-600" />
            </div>
            <div className="absolute right-0 mt-1 w-max text-xs text-zinc-500 bg-white border border-zinc-200 rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
              Your Profile
            </div>
          </div>
        </div> */}
      </div>
    </header>
  );
}
