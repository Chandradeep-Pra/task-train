"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard } from "lucide-react";

type TicketProps = {
  category: string;
  user_story: string;
};

const Ticket: React.FC<TicketProps> = ({ category, user_story }) => {
  return (
    <Card className="rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer hover:scale-105">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs capitalize">
            {category}
          </Badge>
          <LayoutDashboard className="w-4 h-4 text-gray-400" />
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{user_story}</p>
      </CardContent>
    </Card>
  );
};

export default Ticket;
