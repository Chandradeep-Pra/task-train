// route.ts
import { NextRequest, NextResponse } from 'next/server';

const JIRA_BASE_URL = 'https://kaushaluemk.atlassian.net';
const JIRA_API_EMAIL = process.env.JIRA_EMAIL!;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN!;
const authHeader = 'Basic ' + Buffer.from(`${JIRA_API_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');

export async function POST(req: NextRequest) {
  try {
    const {
      summary,
      description,
      storyPoints,
      projectKey,
      assigneeId,
      sprintName
    } = await req.json();

    // 1. Get board ID for the project
    const boardsRes = await fetch(`${JIRA_BASE_URL}/rest/agile/1.0/board?projectKeyOrId=${projectKey}`, {
      headers: { Authorization: authHeader, Accept: 'application/json' }
    });
    const boards = await boardsRes.json();
    const board = boards.values.find((b: any) => b.location.projectKey === projectKey);

    if (!board) {
      return NextResponse.json({ error: `Board for project ${projectKey} not found` }, { status: 404 });
    }

    // 2. Check if sprint exists
    const sprintsRes = await fetch(`${JIRA_BASE_URL}/rest/agile/1.0/board/${board.id}/sprint`, {
      headers: { Authorization: authHeader, Accept: 'application/json' }
    });
    const sprintsData = await sprintsRes.json();
    let sprint = sprintsData.values.find((s: any) => s.name === sprintName);

    // 3. If sprint doesn't exist, create it
    if (!sprint) {
      const createSprintRes = await fetch(`${JIRA_BASE_URL}/rest/agile/1.0/sprint`, {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: sprintName,
          originBoardId: board.id
        })
      });

      if (!createSprintRes.ok) {
        const errText = await createSprintRes.text();
        return NextResponse.json({ error: `Failed to create sprint`, details: errText }, { status: 500 });
      }

      sprint = await createSprintRes.json();
    }

    // 4. Create the issue
    const createIssueRes = await fetch(`${JIRA_BASE_URL}/rest/api/2/issue`, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        fields: {
          project: { key: projectKey },
          summary,
          description,
          issuetype: { name: 'Story' },
          assignee: { id: assigneeId },
          customfield_10016: storyPoints // Story Points field
        }
      })
    });

    if (!createIssueRes.ok) {
      const errText = await createIssueRes.text();
      return NextResponse.json({ error: 'Failed to create issue', details: errText }, { status: 500 });
    }

    const issue = await createIssueRes.json();

    // 5. Assign issue to sprint
    const assignSprintRes = await fetch(`${JIRA_BASE_URL}/rest/agile/1.0/sprint/${sprint.id}/issue`, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        issues: [issue.key]
      })
    });

    if (!assignSprintRes.ok) {
      const errText = await assignSprintRes.text();
      return NextResponse.json({ error: 'Issue created but failed to assign to sprint', details: errText }, { status: 500 });
    }

    return NextResponse.json({ message: 'Issue created and assigned to sprint', issueKey: issue.key });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal error', details: error.message }, { status: 500 });
  }
}
