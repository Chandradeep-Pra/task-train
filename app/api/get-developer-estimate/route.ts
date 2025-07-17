import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Define an interface for the expected input
interface StoryPointInput {
  user_story: string;
  dev_skills: string[];
}

export async function POST(req: NextRequest) {
  try {
    // Parse the input JSON
    const body = await req.json();
    const { user_story, dev_skills }: StoryPointInput = body;

    // Retrieve the API key from environment variables
    const api_key = process.env.GEMINI_API_KEY;
    
    if (!user_story || !dev_skills || !api_key) {
      return NextResponse.json(
        { error: 'Missing user_story, dev_skills or API key' },
        { status: 400 }
      );
    }

    // Instantiate the Google Generative AI client using the API key
    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Build the prompt for the model; the prompt instructs the model to provide an estimation
    // of the story points for the provided user story, while taking into account the skills of developers.
    // The output should be in JSON format.
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

    // Generate output from the model
    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    // Sanitize the output: remove markdown/code blocks if the response is wrapped in "```"
    if (text.startsWith("```")) {
      text = text.replace(/```(?:json)?/gi, "").replace(/```$/, "").trim();
    }

    // Ensure we only parse the response starting from the first "{" character
    const firstBrace = text.indexOf('{');
    if (firstBrace > 0) {
      text = text.slice(firstBrace);
    }

    try {
      // Parse and validate the JSON response from the model
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
