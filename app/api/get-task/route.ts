import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Task {
  task: string;
  story_points: number;
}

interface Employee {
  name: string;
  skills: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tasks, employees }: { tasks: Task[]; employees: Employee[] } = body;

    const api_key = process.env.GEMINI_API_KEY;

    if (!tasks || !employees || !api_key) {
      return NextResponse.json({ error: 'Missing tasks, employees, or API key' }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

    const prompt = `
You are a project planner. Assign each of the following tasks to the most suitable employee based on their skills and story points.

Return the results in this exact JSON format, with one object per task and the following fields:
- "task": The task name
- "story_points": The story points for that task
- "employee": The name of the employee assigned to the task

Format output as a flat array of objects:

[
  {
    "task": "Task Name",
    "story_points": X,
    "employee": "Employee Name"
  },
  ...
]
}

TASKS:
${JSON.stringify(tasks, null, 2)}

EMPLOYEES:
${JSON.stringify(employees, null, 2)}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    let cleanedText = text;

    if (cleanedText.toLowerCase().startsWith('```json')) {
      cleanedText = cleanedText.slice(7).replace(/```$/, '').trim();
    }

    const parsed = JSON.parse(cleanedText);
    return NextResponse.json(parsed);

  } catch (err: any) {
    console.error('Gemini Error:', err);
    return NextResponse.json({ error: 'Failed to generate task assignments using Gemini' }, { status: 500 });
  }
}
