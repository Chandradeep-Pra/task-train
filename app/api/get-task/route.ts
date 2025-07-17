import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface TaskInput {
  prd_document: string;
  transcription?: string;
  num_sprints: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prd_document, transcription, num_sprints }: TaskInput = body;

    const api_key = process.env.GEMINI_API_KEY;

    if (!prd_document || !num_sprints || !api_key) {
      return NextResponse.json(
        { error: 'Missing prd_document, num_sprints, or API key' },
        { status: 400 }
      );
    }

    const sprint_days = 10; // Each sprint = 10 working days (2 weeks)

    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
You are a senior Agile project manager.

### Objective:
Break down the given product description into Jira user stories and organize them **by sprint**, in realistic development order from **frontend → backend → testing**.

### Inputs:
This is the Project Requirement Document document of the project: ${prd_document}

${transcription ? `This is the meeting TRANSCRIPTION:\n${transcription}` : ''}

1 Sprint Duration: 2 weeks (10 working days)  
2 Total Sprints to complete the project: ${num_sprints}  
3 You are an experienced task creator and your task is to create frontend, backend, and testing tasks

### Guidelines:
- Each story must include: category (frontend | backend | testing), User Story
- Group tasks by sprint (sprint_1, sprint_2, ...)
- Respect logical order: frontend → backend → testing
- Fit all the possible tasks within ${num_sprints} sprints
- Output only JSON

### Output Format:
{
  "sprint_1": [
    { "category": "frontend", "user_story": "..." },
    ...
  ],
  "sprint_2": [
    ...
  ],

  For each sprints can we have all the Frontend Stories first, followed by Backend and Testing
  ...
}
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    // Sanitize output: strip markdown/code blocks
    if (text.startsWith("```")) {
      text = text.replace(/```(?:json)?/gi, "").replace(/```$/, "").trim();
    }

    // Fallback: ensure we parse only from the first "{" onward
    const firstBrace = text.indexOf('{');
    if (firstBrace > 0) {
      text = text.slice(firstBrace);
    }

    // Debug logging (optional)
    // console.log("Gemini raw output:", text);

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed);
    } catch (jsonErr) {
      console.error('JSON Parse Error:', jsonErr);
      return NextResponse.json({ error: 'Invalid JSON returned by Gemini', raw: text }, { status: 500 });
    }
  } catch (err: any) {
    console.error('Gemini Error:', err);
    return NextResponse.json(
      { error: 'Failed to generate JIRA user stories' },
      { status: 500 }
    );
  }
}
