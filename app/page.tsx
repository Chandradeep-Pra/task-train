
"use client";

//import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Users,
  FileText,
} from "lucide-react";
import { HyperText } from "@/components/magicui/hyper-text";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Link from "next/link";

export default function Home() {
  // const { theme } = useTheme();
  const shadowColor = "black"

  // const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-indigo-100 text-gray-900">


      {/* Hero Section */}
      <BackgroundBeamsWithCollision>

      <section className="min-h-screen px-6 py-28 flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight">
   
        
        
         <HyperText>  Supercharge </HyperText> 
        
          Your Workflow with Task<span className="text-indigo-500">Track</span>
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-gray-700 max-w-3xl">
          One platform to convert ideas into structured tasks, assign them smartly, and boost your team velocity with <strong>Gen AI</strong> at the core.
        </p>
        <Button
          size="lg"
          className="mt-10 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg rounded-full px-10 py-5 shadow-xl"
        > <Link href="/create-task">

          Get Started
        </Link>
          <span className="ml-2">
            <ArrowRight className="w-5 h-5" />
          </span>
        </Button>
      </section>
      </BackgroundBeamsWithCollision>

      {/* Transition Text */}
      <div className="text-center px-6 py-12">
        <h2 className="text-2xl font-bold text-indigo-800">✨ Say goodbye to manual workflows. Say hello to speed.</h2>
        <p className="text-lg text-gray-700 mt-2">
          TaskTrain empowers your team to do more, faster—with fewer blockers and zero confusion, powered by cutting-edge <strong>Gen AI</strong>.
        </p>
      </div>

      {/* Features Section */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: <Sparkles className="w-8 h-8 text-indigo-600" />,
              title: "AI Ticket Creation",
              desc: "From idea to structured tasks, auto-generated and ready to go with Gen AI magic.",
            },
            {
              icon: <Users className="w-8 h-8 text-indigo-600" />,
              title: "Intelligent Talent Matching",
              desc: "Assign tasks based on skills, availability, and focus areas—backed by Gen AI.",
            },
            {
              icon: <FileText className="w-8 h-8 text-indigo-600" />,
              title: "Smart Doc-to-Task",
              desc: "Transform meeting notes and documents into clear deliverables using Gen AI models.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="mb-5">{item.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Transition Text */}
      <div className="text-center px-6 py-12">
        <h2 className="text-2xl font-bold text-indigo-800">🧠 Built with Gemini AI for unmatched task intelligence</h2>
        <p className="text-lg text-gray-700 mt-2">
          From parsing unstructured content to assigning the perfect owner—let <strong>Gen AI</strong> do the hard stuff.
        </p>
      </div>

      {/* How It Works */}
      <section className="px-6 py-24 text-center bg-white">
        <h2 className="text-4xl font-bold mb-6">How It Works</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-12 text-lg">
          Simplify your workflow from raw ideas to perfectly delegated and sized tasks—TaskTrain and <strong>Gen AI</strong> handle the heavy lifting.
        </p>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            "Input raw task, idea or doc",
            "Gemini AI parses, estimates, and breaks it down",
            "Auto-assigned to best-fit teammate with full clarity",
          ].map((step, idx) => (
            <div
              key={idx}
              className="bg-indigo-100 p-8 rounded-xl border border-indigo-200"
            >
              <h4 className="text-xl font-semibold text-indigo-800 mb-3">Step {idx + 1}</h4>
              <p className="text-indigo-900 text-base">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Transition Text */}
      <div className="text-center px-6 py-12">
        <h2 className="text-2xl font-bold text-indigo-800">🚀 Your workflow, elevated by Gen AI</h2>
        <p className="text-lg text-gray-700 mt-2">
          From chaos to clarity—TaskTrain transforms your product operations with elegance and <strong>AI speed</strong>.
        </p>
      </div>

      {/* Use Cases */}
      <section className="px-6 py-24 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold mb-6">Built For Modern Teams</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-12 text-lg">
          TaskTrain is designed to integrate into the natural rhythm of all your product, engineering, and leadership workflows—with <strong>AI insight</strong> baked in.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {["Startup PMs", "Scrum Teams", "Enterprise Leads"].map((role, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-3">{role}</h3>
              <p className="text-base text-gray-600">
                TaskTrain adapts to your scale—be it quick iteration or enterprise process.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Transition Text */}
      <div className="text-center px-6 py-12">
        <h2 className="text-2xl font-bold text-indigo-800">⚙️ Frictionless onboarding. Maximum ROI.</h2>
        <p className="text-lg text-gray-700 mt-2">
          Start today, feel the clarity by tomorrow. Powered by <strong>Gen AI</strong>, TaskTrain requires no training to get going.
        </p>
      </div>

      {/* Final CTA */}
      <section className="px-6 py-24 text-center bg-indigo-50">
        <h2 className="text-4xl font-bold mb-4">Let TaskTrain handle the busywork</h2>
        <p className="text-lg mb-8 max-w-xl mx-auto text-gray-700">
          Your team’s time is precious. Give them clarity, speed, and <strong>AI-powered momentum</strong> today.
        </p>
        <Button
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-700 hover:scale-110 text-white font-semibold text-lg rounded-full px-10 py-5 shadow-lg"
        >
          Get Started
          <span className="ml-2">
            <ArrowRight className="w-5 h-5" />
          </span>
        </Button>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 text-center text-sm text-gray-500 bg-white border-t">
        © {new Date().getFullYear()} TaskTrain. Move faster. Stay aligned with Gen AI.
      </footer>
    </div>
  );
}
