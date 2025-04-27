import { NextRequest } from 'next/server';
import { setGlobalDispatcher, ProxyAgent, request } from 'undici';

const employees = [
  // ... same employee 
  // { name: 'Aarav', skills: ['frontend', 'React', 'JavaScript'] },
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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!category || !user_story || !apiKey) {
      return new Response(JSON.stringify({ error: 'Missing input or API key' }), { status: 400 });
    }

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

    const bodyData = JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });

    const { body } = await request(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:streamGenerateContent?alt=sse&key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: bodyData,
      }
    );

    const reader = body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim();
          if (data === '[DONE]') {
            break;
          }

          try {
            const json = JSON.parse(data);
            const textPart = json.candidates?.[0]?.content?.parts?.[0]?.text;
            if (textPart) {
              let text = textPart.trim();
              if (text.startsWith('```json')) {
                text = text.slice(7).replace(/```$/, '').trim();
              }
              const parsed = JSON.parse(text);
              return new Response(JSON.stringify(parsed), { status: 200 });
            }
          } catch (e) {
            console.error('Failed to parse stream JSON:', e);
          }
        }
      }
    }

    return new Response(JSON.stringify({ error: 'No valid response from Gemini' }), { status: 500 });

  } catch (err) {
    console.error('Streaming Gemini Error:', err);
    return new Response(JSON.stringify({ error: 'Failed to assign employee' }), { status: 500 });
  }
}
