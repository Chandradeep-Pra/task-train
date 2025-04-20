import { NextResponse } from 'next/server';

const employees = [
  { name: 'Aarav', skills: ['frontend', 'React', 'JavaScript'] },
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

export async function GET() {
  return NextResponse.json({ employees });
}
