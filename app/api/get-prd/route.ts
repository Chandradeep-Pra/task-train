import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface TranscriptionInput {
  transcription: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { transcription }: TranscriptionInput = body;

    const api_key = process.env.GEMINI_API_KEY;

    if (!transcription || !api_key) {
      return NextResponse.json(
        { error: 'Missing transcription or API key' },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
You are a product manager assistant.

### Objective:
Given the transcription of a meeting, perform the following tasks:
1. Generate a clear, concise detailed Product Requirement Document (PRD) based on the conversation, it should be highly detailed and structured.
2. Extract the total number of sprints discussed.
3. Extract the total number of employees mentioned or implied.
4. If the number of sprints or employees is not mentioned, return an empty string for those fields.
5. PRD must always be generated.

### Input:
Meeting Transcription:
"""
${transcription}
"""

### Output Format (JSON only):
"prd_document": {
    "objective": "Launch a cross-platform fitness app for daily workouts.",
    "features": [
      "User registration and login",
      "Workout tracking with analytics",
      "Social sharing of progress",
      "Personalized fitness recommendations"
    ],
    "timeline": "3 months",
    "tech_stack": "React Native, Firebase, Node.js",
    "challenges": ["User data privacy, maintaining real-time sync", "App performance optimization],
    "success_metrics": "User retention after 30 days, App Store rating > 4.5"
  },
  Only the above fields should be included in the output.
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
      console.error('JSON Parse Error:', jsonErr);
      return NextResponse.json({ error: 'Invalid JSON returned by Gemini', raw: text }, { status: 500 });
    }
  } catch (err: any) {
    console.error('Transcription Processing Error:', err);
    return NextResponse.json(
      { error: 'Failed to process meeting transcription' },
      { status: 500 }
    );
  }
}