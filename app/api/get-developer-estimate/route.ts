import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { setGlobalDispatcher, ProxyAgent } from 'undici';

// ✅ Enable proxy globally if defined in env
if (process.env.https_proxy) {
  const proxyAgent = new ProxyAgent(process.env.https_proxy);
  setGlobalDispatcher(proxyAgent);
}

// Define an interface for the expected input
interface StoryPointInput {
  user_story: string;
  dev_skills: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_story, dev_skills }: StoryPointInput = body;

    const api_key = process.env.GEMINI_API_KEY;
    
    if (!user_story || !dev_skills || !api_key) {
      return NextResponse.json(
        { error: 'Missing user_story, dev_skills or API key' },
        { status: 400 }
      );
    }

    // Instantiate the Gemini model
    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

    const prompt = `
You are a senior Agile project manager.

### Objective:
Estimate the story points for the user story provided based on the required work and the available developer skills. 
Take into account factors such as complexity, risk, and developer experience related to the following skills:
${dev_skills.join(', ')}

### Input:
User Story: "${user_story}"

### Guidelines:
- Provide a brief explanation on how you arrived at the estimate.
- Assign a numeric value to the estimated story points.
- Output the answer in the following JSON format:
{
  "estimated_story_points": <number>,
  "explanation": "<brief explanation>"
}

Ensure the response is valid JSON.
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    // Sanitize output if wrapped in markdown
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
      console.error('JSON Parse Error:', jsonErr);
      return NextResponse.json(
        { error: 'Invalid JSON returned by Gemini', raw: text },
        { status: 500 }
      );
    }
  } catch (err: any) {
    console.error('Gemini Error:', err);
    return NextResponse.json(
      { error: 'Failed to estimate story points' },
      { status: 500 }
    );
  }
}
