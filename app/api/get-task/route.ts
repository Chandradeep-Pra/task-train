import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface TaskInput {
  prd_document: string;
  transcription?: string;
  num_sprints: number;
  num_resources: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prd_document, transcription, num_sprints, num_resources }: TaskInput = body;

    const api_key = process.env.GEMINI_API_KEY;

    if (!prd_document || !num_sprints || !num_resources || !api_key) {
      return NextResponse.json(
        { error: 'Missing prd_document, num_sprints, num_resources, or API key' },
        { status: 400 }
      );
    }

    const sprint_days = 10; // Each sprint = 10 working days (2 weeks)
    const total_dev_days = sprint_days * num_sprints * num_resources;

    // NEW: 1 developer day = 2 story points
    const total_story_points = Math.floor(total_dev_days * 2);
    const sprint_capacity = Math.floor(sprint_days * num_resources * 2);

    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

    const prompt = `
You are a senior Agile project manager.

### Objective:
Break down the given product description into Jira user stories and organize them **by sprint**, in realistic development order from **frontend → backend → testing**.

### Inputs:
PRD:
${prd_document}

${transcription ? `TRANSCRIPTION:\n${transcription}` : ''}

1 Sprint Duration: 2 weeks (10 working days)  
Total Sprints: ${num_sprints}  
Developers: ${num_resources}  
Total Story Point Budget: ${total_story_points}

### Guidelines:
- Each sprint = 2 weeks = 10 working days
- Developers: ${num_resources}
- Total Sprints: ${num_sprints}
- Each sprint can have up to ${sprint_capacity} story points
- Total capacity: ${total_story_points} story points
- 1 developer day = 2 story points
- Use only Fibonacci numbers for story points (2, 3, 5, 8, 13), 13 being the task for which it can take 6.5 days and 2 being the task which can be done in 1 days
-Its not that we have to complete all the story points, all the resources must be utilised well and we should carefully gives the story point to tasks
- Categories: "frontend", "backend", "testing
- Your task is to efficiently cover all the tasks required to build the product end to end, keeping in mind the story point and resources
- First give all the tasks of Frontend, followed by Backend, and then Testing.


### Output Format:
{
  "sprint_1": [
    { "category": "FRONTEND followed by | BACKEND followed by | TESTING ", "user_story": "....", "story_points": X },
    ...
  ],
  "sprint_2": [
    ...
  ],
 }

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
    return NextResponse.json(
      { error: 'Failed to generate JIRA user stories' },
      { status: 500 }
    );
  }
}
