import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Hardcoded historical context (tech lead reference data)
const historical_project_context = [
  {
    similar_story: "User login using email and password",
    points: 3,
    explanation: "Basic authentication with validation and error handling"
  },
  {
    similar_story: "Implement user registration with email verification",
    points: 5,
    explanation: "Includes form validation and integration with email service"
  },
  {
    similar_story: "Password reset using security questions",
    points: 2,
    explanation: "Simple conditional logic and form handling"
  },
  {
    similar_story: "OTP-based login feature via mobile",
    points: 5,
    explanation: "Includes OTP generation, validation, and timeout handling"
  },
  {
    similar_story: "Implement responsive dashboard UI",
    points: 8,
    explanation: "Complex layout, charts, and dynamic components"
  },
  {
    similar_story: "Add dark mode toggle and theme persistence",
    points: 3,
    explanation: "UI state management and local storage handling"
  },
  {
    similar_story: "Backend API for CRUD operations on products",
    points: 6,
    explanation: "Includes routes, validation, and DB integration"
  },
  {
    similar_story: "Write test cases for user authentication flow",
    points: 4,
    explanation: "Coverage for edge cases, token expiry, and redirects"
  },
  {
    similar_story: "DevOps: CI/CD setup for staging and production",
    points: 7,
    explanation: "Automated pipelines with build/test/deploy stages"
  },
  {
    similar_story: "Accessibility improvements on landing page",
    points: 2,
    explanation: "ARIA roles, semantic HTML, keyboard navigation"
  }
];

// Interface for expected request input
interface LeadEstimationInput {
  user_story: string;
  project_ask: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_story, project_ask }: LeadEstimationInput = body;

    const api_key = process.env.GEMINI_API_KEY;

    if (!user_story || project_ask === undefined || !api_key) {
      return NextResponse.json(
        { error: 'Missing user_story, project_ask, or API key' },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
You are a senior tech lead estimating story points.

### Objective:
Estimate story points for a new user story using:
- Project ask (PM/client estimate)
- Your historical reference stories
- Technical judgment

### Historical Stories:
${JSON.stringify(historical_project_context, null, 2)}

### Story to Estimate:
"${user_story}"

Project Ask: ${project_ask}

### Guidelines:
- Compare with historical stories and judge complexity
- If no close match, use technical judgment
- Output valid JSON in the following format:

{
  "lead_estimate": <number>,
  "agrees_with_project_ask": true | false,
  "explanation": "brief explanation"
}
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    if (text.startsWith('```')) {
      text = text.replace(/```(?:json)?/gi, '').replace(/```$/, '').trim();
    }

    const firstBrace = text.indexOf('{');
    if (firstBrace > 0) {
      text = text.slice(firstBrace);
    }

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
      { error: 'Failed to estimate via lead' },
      { status: 500 }
    );
  }
}
