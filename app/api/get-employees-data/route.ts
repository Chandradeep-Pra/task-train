import { NextResponse } from 'next/server';

const employees = [
  { name: 'Alice', skills: ['frontend', 'React', 'TypeScript'] },
  { name: 'Bob', skills: ['backend', 'Node.js', 'SQL'] },
  { name: 'Charlie', skills: ['testing', 'Jest', 'QA'] },
  { name: 'David', skills: ['backend', 'Java', 'Spring Boot'] },
  { name: 'Eva', skills: ['frontend', 'Vue', 'CSS'] },
  { name: 'Frank', skills: ['testing', 'Cypress', 'QA', 'Automation'] },
  { name: 'Grace', skills: ['fullstack', 'React', 'Node.js'] },
  { name: 'Helen', skills: ['frontend', 'Accessibility', 'UX'] },
];

export async function GET() {
  return NextResponse.json({ employees });
}
