// app/api/create-jira-issue/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface JiraIssueInput {
  summary: string;
  description: string;
  storyPoints: number;
  projectKey: string;
  issueType?: string;
  assigneeId?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      summary,
      description,
      storyPoints,
      projectKey,
      issueType = 'Story',
      assigneeId,
    }: JiraIssueInput = body;

    const JIRA_EMAIL = "kaushal.uemk@gmail.com"
    const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
    const JIRA_DOMAIN =  "kaushaluemk.atlassian.net"
    const STORY_POINT_FIELD_ID = "customfield_10016"

    if (!JIRA_EMAIL || !JIRA_API_TOKEN || !JIRA_DOMAIN || !STORY_POINT_FIELD_ID) {
      return NextResponse.json({ error: 'Missing Jira environment variables' }, { status: 500 });
    }

    const url = `https://${JIRA_DOMAIN}/rest/api/2/issue`;

    const payload: any = {
      fields: {
        project: {
          key: projectKey
        },
        summary,
        description,
        issuetype: {
          name: issueType
        },
        [STORY_POINT_FIELD_ID]: storyPoints
      }
    };

    if (assigneeId) {
      payload.fields.assignee = { id: assigneeId };
    }

    const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.status === 201) {
      return NextResponse.json({ message: 'Issue created successfully', issueKey: data.key });
    } else {
      return NextResponse.json({ error: 'Failed to create issue', details: data }, { status: response.status });
    }
  } catch (err: any) {
    return NextResponse.json({ error: 'Request failed', details: err.message }, { status: 500 });
  }
}
