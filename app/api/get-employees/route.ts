import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const employees = [
  {
    name: "Aarav",
    skills: ["frontend", "React", "JavaScript"],
    history: [
      "Landing page revamp",
      "Dashboard UI for analytics",
      "User onboarding screens",
    ],
  },
  {
    name: "Isha",
    skills: ["backend", "Node.js", "MongoDB"],
    history: [
      "Payment gateway integration",
      "User authentication API",
      "Data pipeline setup",
    ],
  },
  {
    name: "Rohan",
    skills: ["testing", "Selenium", "Manual Testing"],
    history: [
      "Login module testing",
      "Regression testing for v1.2",
      "Bug verification on staging",
    ],
  },
  {
    name: "Priya",
    skills: ["frontend", "Angular", "TypeScript"],
    history: [
      "Admin panel UI",
      "Form validation flows",
      "Material UI implementation",
    ],
  },
  {
    name: "Karthik",
    skills: ["backend", "Java", "Spring Boot"],
    history: [
      "Order management API",
      "Inventory service",
      "Spring security setup",
    ],
  },
  {
    name: "Neha",
    skills: ["fullstack", "Vue", "Express.js"],
    history: [
      "Billing dashboard",
      "Invoice generator",
      "API integration for notifications",
    ],
  },
  {
    name: "Aditya",
    skills: ["frontend", "Next.js", "Tailwind CSS"],
    history: [
      "Marketing site build",
      "Responsive layout system",
      "Dark mode support",
    ],
  },
  {
    name: "Sneha",
    skills: ["QA", "Jest", "Cypress"],
    history: [
      "Component testing suite",
      "Smoke test pipeline",
      "UI interaction tests",
    ],
  },
  {
    name: "Rahul",
    skills: ["devops", "Docker", "Kubernetes"],
    history: [
      "CI/CD pipeline setup",
      "Container orchestration",
      "Helm chart deployment",
    ],
  },
  {
    name: "Meera",
    skills: ["backend", "Python", "Django"],
    history: ["CMS backend", "Admin controls", "Data export tools"],
  },
  {
    name: "Dev",
    skills: ["testing", "Postman", "API Testing"],
    history: [
      "REST API validation",
      "Error handling cases",
      "Token expiry testing",
    ],
  },
  {
    name: "Anjali",
    skills: ["frontend", "Figma", "Accessibility"],
    history: [
      "Design handoff implementation",
      "A11y audits",
      "Color contrast fixes",
    ],
  },
  {
    name: "Varun",
    skills: ["backend", "Go", "Microservices"],
    history: ["Notification service", "Rate limiter microservice", "gRPC APIs"],
  },
  {
    name: "Tanya",
    skills: ["fullstack", "React", "Node.js"],
    history: [
      "User settings module",
      "Session handling",
      "Login + profile edit",
    ],
  },
  {
    name: "Vikram",
    skills: ["frontend", "Svelte", "CSS Modules"],
    history: [
      "Animations UI",
      "Chat UI component",
      "Svelte integration with APIs",
    ],
  },
  {
    name: "Diya",
    skills: ["testing", "Automation", "QA"],
    history: [
      "Performance test suite",
      "Parallel browser testing",
      "Login load tests",
    ],
  },
  {
    name: "Arjun",
    skills: ["backend", "Ruby on Rails", "SQL"],
    history: [
      "Billing database schema",
      "ActiveRecord optimization",
      "CSV export feature",
    ],
  },
  {
    name: "Pooja",
    skills: ["devops", "CI/CD", "Jenkins"],
    history: [
      "Pipeline monitoring",
      "Build failure debugging",
      "Secrets management",
    ],
  },
  {
    name: "Siddharth",
    skills: ["fullstack", "Angular", "Firebase"],
    history: ["Chat app", "Firebase auth", "Push notifications"],
  },
  {
    name: "Lavanya",
    skills: ["frontend", "UX", "HTML5"],
    history: [
      "Wireframe to code translation",
      "Form UX improvements",
      "404 + empty states",
    ],
  },
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

Choose the **most suitable employee** for the user story below, using the provided employee list. Match based on both relevant skills and **similar historical work** if available.

### Category:
"${category}"

### User Story:
"${user_story}"

### Employees:
${JSON.stringify(employees, null, 2)}

### Output (JSON only):
{
  "name": "Employee Name",
  "skills": ["Skill1", "Skill2", ...],
  "history": ["Project/task A", "Project/task B", ...]
}
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    if (text.toLowerCase().startsWith("```json")) {
      text = text.slice(7).replace(/```$/, "").trim();
    }

    const firstBrace = text.indexOf("{");
    if (firstBrace > 0) text = text.slice(firstBrace);

    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error("Gemini Error:", err);
    return NextResponse.json(
      { error: "Failed to assign employee" },
      { status: 500 }
    );
  }
}
