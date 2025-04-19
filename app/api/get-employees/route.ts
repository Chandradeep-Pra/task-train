import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Hardcoded employee list
const employees = [
  { name: 'Alice', skills: ['frontend', 'React', 'TypeScript'] },
  { name: 'Bob', skills: ['backend', 'Node.js', 'SQL'] },
  { name: 'Charlie', skills: ['testing', 'Jest', 'QA'] },
  { name: 'David', skills: ['backend', 'Java', 'Spring Boot'] },
  { name: 'Eva', skills: ['frontend', 'Vue', 'CSS'] },
  { name: 'Frank', skills: ['testing', 'Cypress', 'QA', 'Automation'] },
  { name: 'Grace', skills: ['fullstack', 'React', 'Node.js'] },
  { name: 'Helen', skills: ['frontend', 'Accessibility', 'UX'] },
];

interface UserStory {
  category: string;
  user_story: string;
  story_points: number;
}

interface RequestInput {
  user_stories: UserStory[];
  days_to_complete: number;
  num_resources: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_stories, days_to_complete, num_resources }: RequestInput = body;

    const api_key = process.env.GEMINI_API_KEY;

    if (!user_stories || !days_to_complete || !num_resources || !api_key) {
      return NextResponse.json({ error: 'Missing input or API key' }, { status: 400 });
    }

    const total_story_points = days_to_complete * num_resources;

    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

    const prompt = `
You are a project planner. Assign the following user stories to the best-suited employees based on their skills.
Ensure no employee is assigned more story points than the number of days (${days_to_complete}) available.

Return the output as an array in this JSON format:

[
  {
    "task": "User Story Description",
    "category": "frontend | backend | testing",
    "story_points": X,
    "employee": "Employee Name",
    "tech_stack": ["Skill1", "Skill2", ...]
  }
]

USER STORIES:
${JSON.stringify(user_stories, null, 2)}

EMPLOYEES:
${JSON.stringify(employees, null, 2)}
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
    return NextResponse.json({ error: 'Failed to assign tasks' }, { status: 500 });
  }
}
