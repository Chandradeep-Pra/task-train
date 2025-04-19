import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface TaskInput {
  prd_document: string;       // Product Requirement Document
  transcription?: string;     // Optional meeting transcript
  days_to_complete: number;   // Deadline in working days
  num_resources: number;      // Available developers
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prd_document, transcription, days_to_complete, num_resources }: TaskInput = body;

    const api_key = process.env.GEMINI_API_KEY;

    if (!prd_document || !days_to_complete || !num_resources || !api_key) {
      return NextResponse.json(
        { error: 'Missing prd_document, days_to_complete, num_resources, or API key' },
        { status: 400 }
      );
    }

    const total_available_story_points = days_to_complete * num_resources;

    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

    const prompt = `
You are a project manager with experience in software development. Based on the PRD (Product Requirement Document) and optionally the meeting transcript, along with the number of available developers and days to complete, generate 10 Jira user stories.

- Categorize the stories into: frontend, backend, and testing.
- Each story must include a clear user story and story points.
- Story points should always be > 1 and follow Fibonacci sequence (e.g., 2, 3, 5, 8, 13...).
- Assume 1 story point = 1 day of effort for 1 developer.
- The total story points MUST NOT exceed ${total_available_story_points} (i.e., ${num_resources} resources × ${days_to_complete} days).

Output JSON format:

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

PRD DOCUMENT:
${prd_document}

${transcription ? `TRANSCRIPTION:\n${transcription}` : ''}

Deadline: ${days_to_complete} days  
Available Developers: ${num_resources}  
Total Story Points Budget: ${total_available_story_points}
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    if (text.toLowerCase().startsWith('```json')) {
      text = text.slice(7).replace(/```$/, '').trim();
    }

    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);

  } catch (err: any) {
    console.error('Gemini Error:', err);
    return NextResponse.json({ error: 'Failed to generate JIRA user stories' }, { status: 500 });
  }
}
