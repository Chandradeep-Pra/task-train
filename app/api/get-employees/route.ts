import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const employees = [
  {
    name: 'Aarav',
    skills: ['frontend', 'React', 'JavaScript'],
    history: ['Landing page revamp', 'Dashboard UI for analytics', 'User onboarding screens'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  {
    name: 'Isha',
    skills: ['backend', 'Node.js', 'MongoDB'],
    history: ['Payment gateway integration', 'User authentication API', 'Data pipeline setup'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  {
    name: 'Rohan',
    skills: ['testing', 'Selenium', 'Manual Testing'],
    history: ['Login module testing', 'Regression testing for v1.2', 'Bug verification on staging'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  {
    name: 'Priya',
    skills: ['frontend', 'Angular', 'TypeScript'],
    history: ['Admin panel UI', 'Form validation flows', 'Material UI implementation'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  {
    name: 'Karthik',
    skills: ['backend', 'Java', 'Spring Boot'],
    history: ['Order management API', 'Inventory service', 'Spring security setup'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  {
    name: 'Neha',
    skills: ['fullstack', 'Vue', 'Express.js'],
    history: ['Billing dashboard', 'Invoice generator', 'API integration for notifications'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  {
    name: 'Aditya',
    skills: ['frontend', 'Next.js', 'Tailwind CSS'],
    history: ['Marketing site build', 'Responsive layout system', 'Dark mode support'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  {
    name: 'Sneha',
    skills: ['QA', 'Jest', 'Cypress'],
    history: ['Component testing suite', 'Smoke test pipeline', 'UI interaction tests'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  {
    name: 'Rahul',
    skills: ['devops', 'Docker', 'Kubernetes'],
    history: ['CI/CD pipeline setup', 'Container orchestration', 'Helm chart deployment'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  {
    name: 'Meera',
    skills: ['backend', 'Python', 'Django'],
    history: ['CMS backend', 'Admin controls', 'Data export tools'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  {
    name: 'Dev',
    skills: ['testing', 'Postman', 'API Testing'],
    history: ['REST API validation', 'Error handling cases', 'Token expiry testing'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  {
    name: 'Anjali',
    skills: ['frontend', 'Figma', 'Accessibility'],
    history: ['Design handoff implementation', 'A11y audits', 'Color contrast fixes'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  {
    name: 'Varun',
    skills: ['backend', 'Go', 'Microservices'],
    history: ['Notification service', 'Rate limiter microservice', 'gRPC APIs'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  {
    name: 'Tanya',
    skills: ['fullstack', 'React', 'Node.js'],
    history: ['User settings module', 'Session handling', 'Login + profile edit'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  {
    name: 'Vikram',
    skills: ['frontend', 'Svelte', 'CSS Modules'],
    history: ['Animations UI', 'Chat UI component', 'Svelte integration with APIs'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  {
    name: 'Diya',
    skills: ['testing', 'Automation', 'QA'],
    history: ['Performance test suite', 'Parallel browser testing', 'Login load tests'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  {
    name: 'Arjun',
    skills: ['backend', 'Ruby on Rails', 'SQL'],
    history: ['Billing database schema', 'ActiveRecord optimization', 'CSV export feature'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  {
    name: 'Pooja',
    skills: ['devops', 'CI/CD', 'Jenkins'],
    history: ['Pipeline monitoring', 'Build failure debugging', 'Secrets management'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  {
    name: 'Siddharth',
    skills: ['fullstack', 'Angular', 'Firebase'],
    history: ['Chat app', 'Firebase auth', 'Push notifications'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  {
    name: 'Lavanya',
    skills: ['frontend', 'UX', 'HTML5'],
    history: ['Wireframe to code translation', 'Form UX improvements', '404 + empty states'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },

  // Chandradeep - frontend
  {
    name: 'Chandradeep',
    skills: ['frontend', 'JavaScript', 'UI Development'],
    history: ['UI component library', 'Responsive grid system', 'Landing page overhaul'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  // Chandradeep - backend
  {
    name: 'Chandradeep',
    skills: ['backend', 'Node.js', 'REST APIs'],
    history: ['Authentication service', 'Database schema optimization', 'Error logging module'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  },
  // Chandradeep - testing
  {
    name: 'Chandradeep',
    skills: ['testing', 'regression testing', 'QA'],
    history: ['Unit tests for backend', 'Integration testing suite', 'Mock API validations'],
    assigneeId: '712020:a51c1a2d-71bb-4923-8c32-057861b7fff2'
  }
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
      return NextResponse.json(
        { error: "Missing input or API key" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an expert tech lead.

Choose and rank the **most suitable employees** (from best to least fit) for the user story below based on matching skills and historical tasks. Use the provided list.

---

### Category:
"${category}"

### User Story:
"${user_story}"

### Employees:
${JSON.stringify(employees, null, 2)}

---

✅ Only return a JSON array sorted from most to least suitable like this:

\`\`\`json
[
  {
    "name": "Employee Name",
    "skills": ["Skill1", "Skill2"],
    "history": ["Relevant task A", "Relevant task B"]
  },
  ...
]
\`\`\`

No extra text, titles, or markdown — just a single valid JSON array.
`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    const jsonMatch = rawText.match(/```json\s*([\s\S]*?)```/i);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'No valid JSON block found', raw: rawText }, { status: 500 });
    }

    const jsonText = jsonMatch[1].trim();
    const parsed = JSON.parse(jsonText);
    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error('Gemini Error:', err);
    return NextResponse.json({ error: 'Failed to assign employee', details: err.message }, { status: 500 });
  }
}