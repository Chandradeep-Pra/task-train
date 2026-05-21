export type Employee = {
  name: string;
  skills: string[];
  assigneeId?: string;
};

export type DeveloperEstimate = {
  estimated_story_points?: number;
  explanation?: string;
};

export type LeadEstimate = {
  final_story_points?: number;
  lead_estimate?: number;
  explanation?: string;
};

export type ProgressStep = {
  label: string;
  description: string;
  done: boolean;
};
