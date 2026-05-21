export type TicketType = {
  id?: string;
  category: string;
  user_story: string;
  story_point?: number;
  status?: string;
};

export type SprintEntry = [string, TicketType[]];
