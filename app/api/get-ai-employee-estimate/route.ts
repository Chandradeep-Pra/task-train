import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface PRDInput {
  prd_document: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prd_document }: PRDInput = body;

    const api_key = process.env.GEMINI_API_KEY;
    if (!prd_document || !api_key) {
      return NextResponse.json(
        { error: 'Missing prd_document or API key' },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const historicalData = `
[
  {
    "project": "Internal HR Portal",
    "summary": "Web app for leave requests, employee profiles, and performance reviews",
    "employees": 4,
    "sprints": 3
  },
  {
    "project": "Real-Time Chat App",
    "summary": "Cross-platform chat app with audio/video features and encryption",
    "employees": 7,
    "sprints": 6
  },
  {
    "project": "E-commerce Platform",
    "summary": "Mobile-first store with checkout, order tracking, and product search",
    "employees": 6,
    "sprints": 5
  }
]
`;

    const prompt = `
You are a senior engineering manager.

Here is historical project data from our company:

${historicalData}

Given the PRD below, estimate how many employees would likely be needed to complete the project based on complexity and similarity to past projects.

### PRD:
${prd_document}

### Output format:
{
  "estimate": "X", // number of employees as string, or "" if unsure
  "reason": "Explain the reasoning for this estimate based on the PRD and past examples. (should be only in 10 words yet summary of full reasoning)"
}
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    if (text.startsWith("```")) {
      text = text.replace(/```(?:json)?/gi, "").replace(/```$/, "").trim();
    }

    const firstBrace = text.indexOf('{');
    if (firstBrace > 0) {
      text = text.slice(firstBrace);
    }

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed);
    } catch (jsonErr) {
      return NextResponse.json({ error: 'Invalid JSON returned by Gemini', raw: text }, { status: 500 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to estimate employees', details: err.message }, { status: 500 });
  }
}
