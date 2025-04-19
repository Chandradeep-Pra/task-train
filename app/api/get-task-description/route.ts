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
You are a project management assistant.

For each task below, do the following:
- Assign it to the most suitable employee based on their skills.
- Write a short, professional task description.
- Set a priority level: "Low", "Medium", or "High".
- Suggest a deadline in "YYYY-MM-DD" format (within 7–14 days from now).
- Set the status to "To Do" for all tasks.

Return the result in the following JSON format:

[
  {
    "task": "Task name",
    "description": "A short description",
    "story_points": 3,
    "employee": "Employee Name",
    "priority": "Medium",
    "deadline": "2025-04-29",
    "status": "To Do"
  },
  ...
]

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
    return NextResponse.json({ error: 'Failed to generate Jira tickets using Gemini' }, { status: 500 });
  }
}

