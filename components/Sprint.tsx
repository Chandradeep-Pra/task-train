import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import Ticket from "./Ticket";

type TicketType = {
  category: string;
  user_story: string;
  id: string;
};

type SprintProps = {
  sprintName: string;
  userStories: TicketType[];
};

const Sprint = ({ sprintName, userStories }: SprintProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  console.log("Sprint name:", sprintName);

  return (
    <Card className="border border-zinc-200 bg-white/80 shadow-lg rounded-3xl p-6 space-y-4 transition-all">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-zinc-900">{sprintName}</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-zinc-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-zinc-600" />
          )}
        </Button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {userStories.map((ticket, index) => (
            // Pass individual properties of the ticket to the Ticket component
            <Ticket key={index} category={ticket.category} user_story={ticket.user_story} id={ticket.id} sprintName={sprintName} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default Sprint;
