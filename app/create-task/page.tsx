'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TaskGenScreen() {
  const [prd, setPrd] = useState('');
  const [transcript, setTranscript] = useState('');
  const [duration, setDuration] = useState('');

  const isReady = prd.trim().length > 0;

  const handleGenerate = () => {
    const sprintDuration = duration.trim() || '2'; // default to 2 weeks
    const data = {
      prd,
      transcript,
      duration: sprintDuration,
    };

    // You can replace this with your actual API call
    console.log("Sending to Zira API:", data);

    // Example: await fetch('/api/zira/generate', { method: 'POST', body: JSON.stringify(data) });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-zinc-100 px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
            🎯 Generate Your Sprint Plan
          </h1>
          <p className="text-zinc-500 text-sm">
            Add your PRD, optional transcript and duration. Zira will break it down into tasks.
          </p>
        </div>

        {/* Input Card */}
        <Card className="rounded-3xl shadow-md border border-zinc-200">
          <CardHeader>
            <CardTitle className="text-lg text-zinc-800">Project Details</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* PRD Input */}
            <div>
              <Label className="text-sm font-medium text-zinc-700">
                Product Requirement Document (PRD) *
              </Label>
              <Textarea
                rows={8}
                placeholder="e.g. Users should be able to sign up, manage subscriptions, receive invoices..."
                className="mt-1 resize-none bg-zinc-50 text-base rounded-2xl focus:ring-2 focus:ring-blue-500"
                value={prd}
                onChange={(e) => setPrd(e.target.value)}
              />
            </div>

            {/* Transcript Input */}
            <div>
              <Label className="text-sm font-medium text-zinc-700">
                Meeting Transcript (Optional)
              </Label>
              <Textarea
                rows={6}
                placeholder="e.g. In the last standup, team discussed refactoring login module..."
                className="mt-1 resize-none bg-zinc-50 text-base rounded-2xl focus:ring-2 focus:ring-blue-500"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              />
            </div>

            {/* Duration Input */}
            <div>
              <Label className="text-sm font-medium text-zinc-700">
                Sprint Duration (in weeks)
              </Label>
              <Input
                type="number"
                min={1}
                placeholder="Default: 2 weeks"
                className="mt-1 bg-zinc-50 text-base rounded-2xl focus:ring-2 focus:ring-blue-500"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button
              size="lg"
              disabled={!isReady}
              onClick={handleGenerate}
              className="px-6 py-3 rounded-full bg-gradient-to-tr from-zinc-900 to-zinc-800 text-white shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              Generate Tasks with Zira
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
