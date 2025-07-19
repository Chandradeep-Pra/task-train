'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PRDReview from '@/components/PRDReview';

export default function GeneratePRDPage() {
  const [prdText, setPrdText] = useState<any>(null); // full structured PRD object
  const [duration, setDuration] = useState('');
  const [resourceSize, setResourceSize] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Load PRD data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('prdData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPrdText(parsed.prd_document || {});
        setDuration(parsed.total_sprints_discussed || '');
        setResourceSize(parsed.total_employees_mentioned || '');
      } catch (e) {
        console.error('Failed to parse PRD from localStorage:', e);
      }
    }
  }, []);

  const handleContinue = async () => {
  if (!prdText) return;

  const payload = {
    prd_document: prdText.trim(),
    transcription: transcript.trim?.() || '',
    num_sprints: duration.trim() || '2',
  };

  try {
    setLoading(true);

    const response = await fetch('/api/get-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      localStorage.setItem('assigned-tasks', JSON.stringify(result));
      window.location.href = '/create-task'; // OR router.push('/create-task');
    } else {
      console.error('Failed to continue:', result);
    }
  } catch (err) {
    console.error('Error continuing to task creation:', err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">📄 PRD Review</h1>

      {!prdText ? (
        <p className="text-zinc-500 text-center">No PRD found. Please generate one first.</p>
      ) : (
        <>
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Generated Product Requirements</h2>
            <PRDReview prdText={prdText} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Number of Sprints
              </label>
              <Input
                type="number"
                min={1}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Team Size (Engineers)
              </label>
              <Input
                type="number"
                min={1}
                value={resourceSize}
                onChange={(e) => setResourceSize(e.target.value)}
                placeholder="e.g. 5"
              />
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={handleContinue}
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 text-white bg-black hover:bg-zinc-900 rounded-full flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Continue to Create Task
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
