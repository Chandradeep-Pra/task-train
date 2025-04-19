import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface TaskInput {
  description: string; // Task description or meeting transcript
  days_to_complete: number; // Number of days the task should be completed in
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { description, days_to_complete }: TaskInput = body;

    const api_key = process.env.GEMINI_API_KEY;

    if (!description || !days_to_complete || !api_key) {
      return NextResponse.json({ error: 'Missing description, days_to_complete, or API key' }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

    const prompt = `
You are a project manager with experience in software development. Based on the task description or meeting transcript below and the number of days for task completion, generate 10 Jira user stories. The user stories should be divided into three categories: frontend, backend, and testing. Each story should be assigned appropriate story points based on the effort required.

Format the output in the following JSON structure:

{
  "user_stories": [
    {
      "category": "frontend | backend | testing",
      "user_story": "User Story Description",
      "story_points": X
    },
    ...
  ]
}

TASK DESCRIPTION OR MEETING TRANSCRIPT:
${description}

NUMBER OF DAYS TO COMPLETE: ${days_to_complete}

Generate at least 10 user stories (including frontend, backend, and testing), with story points appropriately assigned.
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    // Clean up markdown-style code block
    if (text.toLowerCase().startsWith('```json')) {
      text = text.slice(7).replace(/```$/, '').trim();
    }

    // Parse and return the clean JSON
    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);

  } catch (err: any) {
    console.error('Gemini Error:', err);
    return NextResponse.json({ error: 'Failed to generate JIRA user stories' }, { status: 500 });
  }
}
