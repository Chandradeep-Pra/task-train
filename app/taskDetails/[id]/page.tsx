'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, X, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function TaskDetailsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const initialUserStory = searchParams.get('user_story');

  const [userStory, setUserStory] = useState(initialUserStory || '');
  const [editingStory, setEditingStory] = useState(false);
  const [tempStory, setTempStory] = useState(userStory);

  const [acceptanceCriteria, setAcceptanceCriteria] = useState<string | null>(null);
  const [editingCriteria, setEditingCriteria] = useState(false);
  const [tempCriteria, setTempCriteria] = useState('');

  const [assignedEmployee, setAssignedEmployee] = useState<{ name: string; skills: string[] } | null>(null);
  const [allEmployees, setAllEmployees] = useState<{ name: string; skills: string[] }[]>([]);
  const [estimateResult, setEstimateResult] = useState<{ estimated_story_points?: number; explanation?: string } | null>(null);
  const [leadEstimate, setLeadEstimate] = useState<{ final_story_points?: number; explanation?: string } | null>(null);
  const [storyPoint, setStoryPoint] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialUserStory) {
      fetch('/api/get-task-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: initialUserStory }),
      })
        .then(res => res.json())
        .then(data => {
          setAcceptanceCriteria(data.acceptanceCriteria || 'No criteria generated.');
          setTempCriteria(data.acceptanceCriteria || '');
        })
        .catch(err => {
          console.error('Error fetching criteria:', err);
          setAcceptanceCriteria('Failed to generate.');
        });
    }
  }, [initialUserStory]);

  useEffect(() => {
    fetch('/api/get-employees-data')
      .then(res => res.json())
      .then(data => setAllEmployees(data.employees))
      .catch(err => {
        console.error('Error fetching employee list:', err);
      });
  }, []);

  useEffect(() => {
    if (estimateResult?.estimated_story_points && leadEstimate?.final_story_points) {
      const average = (estimateResult.estimated_story_points + leadEstimate.final_story_points) / 2;
      setStoryPoint(average);

      const assignedTasks = JSON.parse(localStorage.getItem('assigned-tasks') || '[]');
      const updatedTasks = assignedTasks.map((task: any) => {
        if (task.user_story === initialUserStory && task.category === category) {
          return { ...task, story_point: average };
        }
        return task;
      });
      localStorage.setItem('assigned-tasks', JSON.stringify(updatedTasks));
    }
  }, [estimateResult, leadEstimate]);

  const handleAssignClick = async () => {
    if (!category || !initialUserStory) {
      toast.error('Missing category or user story.');
      return;
    }

    try {
      const response = await toast.promise(
        fetch('/api/get-employees', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category, user_story: initialUserStory }),
        }),
        {
          loading: '🔍 Finding best employee...',
          success: '✅ Employee Assigned!',
          error: '❌ Failed to assign employee.',
        }
      );

      const result = await response.json();
      setAssignedEmployee(result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEstimateClick = async () => {
    if (!initialUserStory || !assignedEmployee) {
      toast.error('Missing user story or employee.');
      return;
    }

    try {
      const response = await toast.promise(
        fetch('/api/get-developer-estimate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_story: initialUserStory,
            dev_skills: assignedEmployee.skills,
          }),
        }),
        {
          loading: '🔧 Developer estimating...',
          success: '🧠 Dev Estimate Received!',
          error: '❌ Developer estimation failed.',
        }
      );

      const result = await response.json();
      setEstimateResult(result);
      setStoryPoint(result.estimated_story_points);

      if (result.estimated_story_points) {
        await handleLeadEstimate(result.estimated_story_points);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLeadEstimate = async (ask: number) => {
    if (!initialUserStory || !ask) return;

    try {
      const res = await toast.promise(
        fetch('/api/get-lead-estimate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_story: initialUserStory, project_ask: ask }),
        }),
        {
          loading: '📊 Lead estimating...',
          success: '✅ Lead Estimate Complete!',
          error: '❌ Lead estimate failed.',
        }
      );

      const data = await res.json();
      setLeadEstimate(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveField = (field: 'story' | 'criteria') => {
    if (field === 'story') {
      setUserStory(tempStory);
      setEditingStory(false);
      toast.success('✏️ User Story updated!');
    } else {
      setAcceptanceCriteria(tempCriteria);
      setEditingCriteria(false);
      toast.success('📜 Acceptance Criteria updated!');
    }
  };

  const handleManualEmployeeChange = (name: string) => {
    const found = allEmployees.find(emp => emp.name === name);
    if (found) {
      setAssignedEmployee(found);
      toast.success(`👤 Reassigned to ${found.name}`);
    }
  };

  const categoryStyles: Record<string, string> = {
    design: 'bg-blue-100 text-blue-700',
    frontend: 'bg-green-100 text-green-700',
    backend: 'bg-purple-100 text-purple-700',
    research: 'bg-yellow-100 text-yellow-700',
    testing: 'bg-pink-100 text-pink-700',
    default: 'bg-gray-100 text-gray-700',
  };

  const getCategoryStyle = (cat: string) =>
    categoryStyles[cat.toLowerCase()] || categoryStyles.default;

  return (
    <main className="px-8 py-12 bg-white text-zinc-900">
      <div className="max-w-4xl mx-auto mb-8 border-b border-zinc-200 pb-6">
        <h1 className="text-4xl font-semibold mb-4">Ticket Details</h1>
        <span className={`inline-block capitalize text-sm font-medium px-4 py-2 rounded-full ${getCategoryStyle(category || '')}`}>
          {category}
        </span>
        <div className="mt-4 text-lg text-indigo-600 font-medium">
          {storyPoint !== null ? `Final Story Point: ${storyPoint}` : 'Story point needs to be discussed.'}
        </div>
      </div>

      {/* User Story */}
      <section className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-zinc-700">User Story</h2>
          {!editingStory && (
            <Button variant="ghost" size="sm" onClick={() => setEditingStory(true)}>
              <Pencil size={14} className="mr-1" />
              Edit
            </Button>
          )}
        </div>
        {editingStory ? (
          <div className="space-y-2">
            <Textarea value={tempStory} onChange={(e) => setTempStory(e.target.value)} />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleSaveField('story')}>
                <Check size={14} className="mr-1" /> Save
              </Button>
              <Button size="sm" variant="outline" onClick={() => { setEditingStory(false); setTempStory(userStory); }}>
                <X size={14} className="mr-1" /> Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-zinc-800 border-l-4 border-indigo-500 pl-4 text-lg">{userStory}</p>
        )}
      </section>

      {/* Acceptance Criteria */}
      <section className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-zinc-700">Acceptance Criteria</h2>
          {!editingCriteria && (
            <Button variant="ghost" size="sm" onClick={() => setEditingCriteria(true)}>
              <Pencil size={14} className="mr-1" />
              Edit
            </Button>
          )}
        </div>
        {editingCriteria ? (
          <div className="space-y-2">
            <Textarea value={tempCriteria} onChange={(e) => setTempCriteria(e.target.value)} />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleSaveField('criteria')}>
                <Check size={14} className="mr-1" /> Save
              </Button>
              <Button size="sm" variant="outline" onClick={() => { setEditingCriteria(false); setTempCriteria(acceptanceCriteria || ''); }}>
                <X size={14} className="mr-1" /> Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-zinc-800 border-l-4 border-amber-500 pl-4 text-lg whitespace-pre-line">{acceptanceCriteria || 'Loading...'}</p>
        )}
      </section>

      {/* Assigned Employee */}
      <section className="max-w-4xl mx-auto mb-8">
        <h2 className="text-xl font-semibold text-zinc-700 mb-2">Assigned Employee</h2>
        {assignedEmployee ? (
          <>
            <p className="text-lg border-l-4 border-green-500 pl-4 mb-2">
              {assignedEmployee.name} – Skills: {assignedEmployee.skills.join(', ')}
            </p>
            <div className="max-w-sm">
              <select
                value={assignedEmployee.name}
                onChange={(e) => handleManualEmployeeChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Reassign Employee --</option>
                {allEmployees.map(emp => (
                  <option key={emp.name} value={emp.name}>
                    {emp.name} — {emp.skills.join(', ')}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <p className="text-sm text-zinc-500">No one assigned yet.</p>
        )}
      </section>

      {/* Developer Estimate */}
      {estimateResult && (
        <section className="max-w-4xl mx-auto mb-8">
          <h2 className="text-xl font-semibold text-zinc-700 mb-2">Developer Estimate</h2>
          <p className="text-lg border-l-4 border-blue-500 pl-4">Estimated Story Points: {estimateResult.estimated_story_points}</p>
          <p className="text-sm pl-4 text-zinc-600">{estimateResult.explanation}</p>
        </section>
      )}

      {/* Lead Estimate */}
      {leadEstimate && (
        <section className="max-w-4xl mx-auto mb-8">
          <h2 className="text-xl font-semibold text-zinc-700 mb-2">Lead Estimate</h2>
          <p className="text-lg border-l-4 border-fuchsia-500 pl-4">Final Story Points: {leadEstimate.final_story_points}</p>
          <p className="text-sm pl-4 text-zinc-600">{leadEstimate.explanation}</p>
        </section>
      )}

      {/* Actions */}
      <div className="max-w-4xl mx-auto flex justify-end gap-4 mt-10">
        <Button onClick={handleAssignClick} disabled={loading}>
          {loading ? 'Assigning...' : 'Auto-Assign'}
        </Button>
        <Button onClick={handleEstimateClick} disabled={loading || !assignedEmployee}>
          Estimate Story Point
        </Button>
      </div>
    </main>
  );
}
