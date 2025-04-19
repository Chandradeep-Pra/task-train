import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const employees = [
  { name: 'Aarav', skills: ['frontend', 'React', 'JavaScript'] },
  { name: 'Isha', skills: ['backend', 'Node.js', 'MongoDB'] },
  { name: 'Rohan', skills: ['testing', 'Selenium', 'Manual Testing'] },
  { name: 'Priya', skills: ['frontend', 'Angular', 'TypeScript'] },
  { name: 'Karthik', skills: ['backend', 'Java', 'Spring Boot'] },
  { name: 'Neha', skills: ['fullstack', 'Vue', 'Express.js'] },
  { name: 'Aditya', skills: ['frontend', 'Next.js', 'Tailwind CSS'] },
  { name: 'Sneha', skills: ['QA', 'Jest', 'Cypress'] },
  { name: 'Rahul', skills: ['devops', 'Docker', 'Kubernetes'] },
  { name: 'Meera', skills: ['backend', 'Python', 'Django'] },
  { name: 'Dev', skills: ['testing', 'Postman', 'API Testing'] },
  { name: 'Anjali', skills: ['frontend', 'Figma', 'Accessibility'] },
  { name: 'Varun', skills: ['backend', 'Go', 'Microservices'] },
  { name: 'Tanya', skills: ['fullstack', 'React', 'Node.js'] },
  { name: 'Vikram', skills: ['frontend', 'Svelte', 'CSS Modules'] },
  { name: 'Diya', skills: ['testing', 'Automation', 'QA'] },
  { name: 'Arjun', skills: ['backend', 'Ruby on Rails', 'SQL'] },
  { name: 'Pooja', skills: ['devops', 'CI/CD', 'Jenkins'] },
  { name: 'Siddharth', skills: ['fullstack', 'Angular', 'Firebase'] },
  { name: 'Lavanya', skills: ['frontend', 'UX', 'HTML5'] },
];

interface Input {
  category: string;
  user_story: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, user_story }: Input = body;

    const api_key = process.env.GEMINI_API_KEY;
    if (!category || !user_story || !api_key) {
      return NextResponse.json({ error: 'Missing input or API key' }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

    const prompt = `
You are an expert team lead.

Assign the **most suitable employee** from the list below to handle the following user story based on their skills and the story's category.

### User Story Category:
"${category}"

### User Story:
"${user_story}"

### Employees:
${JSON.stringify(employees, null, 2)}

### Output format (JSON):
{
  "name": "Employee Name",
  "skills": ["Skill1", "Skill2", ...]
}

Output only valid JSON, no explanation.
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
    return NextResponse.json({ error: 'Failed to assign employee' }, { status: 500 });
  }
}
