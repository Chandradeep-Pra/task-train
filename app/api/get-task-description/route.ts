// import { NextRequest, NextResponse } from 'next/server';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// interface Task {
//   task: string;
//   story_points: number;
// }

// interface Employee {
//   name: string;
//   skills: string[];
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { tasks, employees }: { tasks: Task[]; employees: Employee[] } = body;

//     const api_key = process.env.GEMINI_API_KEY;

//     if (!tasks || !employees || !api_key) {
//       return NextResponse.json({ error: 'Missing tasks, employees, or API key' }, { status: 400 });
//     }

//     const genAI = new GoogleGenerativeAI(api_key);
//     const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

//     const prompt = `
// You are a project management assistant.

// For each task below, do the following:
// - Assign it to the most suitable employee based on their skills.
// - Write a short, professional task description.
// - Set a priority level: "Low", "Medium", or "High".
// - Suggest a deadline in "YYYY-MM-DD" format (within 7–14 days from now).
// - Set the status to "To Do" for all tasks.

// Return the result in the following JSON format:

// [
//   {
//     "task": "Task name",
//     "description": "A short description",
//     "story_points": 3,
//     "employee": "Employee Name",
//     "priority": "Medium",
//     "deadline": "2025-04-29",
//     "status": "To Do"
//   },
//   ...
// ]

// TASKS:
// ${JSON.stringify(tasks, null, 2)}

// EMPLOYEES:
// ${JSON.stringify(employees, null, 2)}
//     `;

//     const result = await model.generateContent(prompt);
//     const text = result.response.text().trim();

//     let cleanedText = text;
//     if (cleanedText.toLowerCase().startsWith('```json')) {
//       cleanedText = cleanedText.slice(7).replace(/```$/, '').trim();
//     }

//     const parsed = JSON.parse(cleanedText);
//     return NextResponse.json(parsed);

//   } catch (err: any) {
//     console.error('Gemini Error:', err);
//     return NextResponse.json({ error: 'Failed to generate Jira tickets using Gemini' }, { status: 500 });
//   }
// }

// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   const { task, employee } = await req.json();

//   if (!task || !employee) {
//     return NextResponse.json(
//       { error: 'Task and employee are required.' },
//       { status: 400 }
//     );
//   }

//   // Mock AI-generated detailed task description
//   const detailedDescription = `
// **Task Overview**
// ${task}

// **Steps to Complete**
// 1. Understand the task requirements and scope.
// 2. Break the task into actionable sub-tasks.
// 3. Implement the feature/code with best practices.
// 4. Write unit and integration tests.
// 5. Create and push a feature branch.
// 6. Submit a PR and request review.
// 7. Address feedback and merge after approval.
// 8. Update documentation and inform the team.

// **Assigned To**: ${employee}
// `.trim();

//   return NextResponse.json({
//     summary: task,
//     assignee: employee,
//     description: detailedDescription,
//   });
// }
// import { NextResponse } from 'next/server';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export async function POST(req: Request) {
//   const { task,  } = await req.json();

//   if (!task ) {
//     return NextResponse.json(
//       { error: 'Task is required.' },
//       { status: 400 }
//     );
//   }

//   try {
//     const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

//     const prompt = `
// You are a software project manager. Given the task "${task}" , generate a detailed task description in 3 lines :


// Respond in Markdown format.
//     `;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const detailedDescription = response.text();

//     return NextResponse.json({
//       summary: task,
//      // assignee: employee,
//       description: detailedDescription,
//     });
//   } catch (error) {
//     console.error('Gemini API Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to generate task description using Gemini.' },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { task } = await req.json();

  if (!task) {
    return NextResponse.json(
      { error: 'Task is required.' },
      { status: 400 }
    );
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

    const prompt = `
You are a senior software project manager. Given the task: "${task}", provide the following:

1. A **brief task description** (3 lines max).
2. A **clear list of acceptance criteria** (3 bullet points), suitable for assigning this to a developer.

Respond in **Markdown** format, with headers:
### Task Description
...
### Acceptance Criteria
...
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const fullText = response.text();

    // Extract both sections from the Markdown
    const descMatch = fullText.match(/### Task Description\s+([\s\S]*?)### Acceptance Criteria/);
    const accMatch = fullText.match(/### Acceptance Criteria\s+([\s\S]*)/);

    const description = descMatch?.[1]?.trim() || 'No description found.';
    const acceptanceCriteria = accMatch?.[1]?.trim() || 'No acceptance criteria found.';

    return NextResponse.json({
      summary: task,
      description,
      acceptanceCriteria,
    });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate task description using Gemini.' },
      { status: 500 }
    );
  }
}

