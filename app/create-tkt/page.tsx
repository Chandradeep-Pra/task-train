"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Sprint from "@/components/Sprint";
import TeamMembers from "@/components/TeamMembers";
import { Edit } from "lucide-react";

const teamMembers = [
  { name: "Alice", role: "Frontend Dev" },
  { name: "Bob", role: "Backend Dev" },
  { name: "Charlie", role: "Designer" },
  { name: "Devika", role: "DevOps" },
];

type TicketType = {
  category: string;
  user_story: string;
};

export default function TicketReview() {
  const [sprints, setSprints] = useState<Record<string, TicketType[]>>({});
  const [assignments, setAssignments] = useState<Record<string, string[]>>({});

  useEffect(() => {
    // Initialize mock sprint data here
    setSprints({
      sprint_1: [
        {
          category: "frontend",
          user_story:
            "As a user, I want to see a call invite with accept/decline options in the chat interface so that I can easily join or reject incoming calls.",
        },
        {
          category: "frontend",
          user_story:
            "As a user, I want to see call status indicators (Connecting, Ringing, In Call) so that I am informed about the call's progress.",
        },
        {
          category: "frontend",
          user_story:
            "As a user, I want to be prompted for camera and microphone permissions so that I can enable voice and video calls.",
        },
        {
          category: "backend",
          user_story:
            "As a developer, I want to set up the WebRTC signaling server using WebSockets so that the frontend and backend can negotiate the call setup.",
        },
        {
          category: "backend",
          user_story:
            "As a developer, I want to integrate with TURN/STUN servers so that calls can be established even when users are behind NAT.",
        },
        {
          category: "backend",
          user_story:
            "As a developer, I want to create the session management and signaling logic for 1-on-1 voice calls so that calls can be initiated and connected.",
        },
        {
          category: "testing",
          user_story:
            "As a tester, I want to verify that the call invitation and status indicators are displayed correctly on the frontend.",
        },
        {
          category: "testing",
          user_story:
            "As a tester, I want to test the basic call initiation flow (accept/decline) to ensure the connection is successful.",
        },
        {
          category: "testing",
          user_story:
            "As a tester, I want to perform unit tests for call initiation logic on the backend.",
        },
      ],
      sprint_2: [
        {
          category: "frontend",
          user_story:
            "As a user, I want to see a floating call window with mute/unmute, enable/disable video, and end call controls so that I can manage my call while multitasking.",
        },
        {
          category: "frontend",
          user_story:
            "As a user, I want to be able to switch between speaker/earpiece and switch between front/rear camera (on mobile) so that I can control the audio output and video input during calls.",
        },
        {
          category: "frontend",
          user_story:
            "As a user, I want the UI to be responsive across web, mobile, and tablet so that I have a consistent experience on all devices.",
        },
        {
          category: "backend",
          user_story:
            "As a developer, I want to implement WebRTC for real-time voice calls, enabling audio transmission.",
        },
        {
          category: "backend",
          user_story:
            "As a developer, I want to add video support to the existing WebRTC implementation, enabling video transmission.",
        },
        {
          category: "backend",
          user_story:
            "As a developer, I want to implement end-to-end encryption (DTLS-SRTP) for calls to ensure security and privacy.",
        },
        {
          category: "backend",
          user_story:
            "As a developer, I want to integrate a scalable media server (e.g., Janus, Jitsi, or Agora for fallback) to manage call traffic.",
        },
        {
          category: "backend",
          user_story:
            "As a developer, I want to create the call history data (call duration and timestamps).",
        },
        {
          category: "testing",
          user_story:
            "As a tester, I want to test the audio quality, latency, and drop rate for voice calls to ensure they meet the success metrics.",
        },
        {
          category: "testing",
          user_story:
            "As a tester, I want to test the video quality, latency, and drop rate for video calls to ensure they meet the success metrics.",
        },
        {
          category: "testing",
          user_story:
            "As a tester, I want to test the UI/UX enhancements like the floating call window and call controls, verifying their functionality.",
        },
        {
          category: "testing",
          user_story:
            "As a tester, I want to conduct integration tests for the end-to-end call flow, including audio and video, across different platforms.",
        },
        {
          category: "testing",
          user_story:
            "As a tester, I want to perform performance/load tests on media servers to ensure they can handle concurrent calls.",
        },
        {
          category: "testing",
          user_story:
            "As a tester, I want to perform manual testing across platforms (Web, iOS, Android) to verify functionality and responsiveness.",
        },
        {
          category: "testing",
          user_story:
            "As a tester, I want to verify the end-to-end encryption is working correctly and no call data is being stored unless explicitly opted-in.",
        },
      ],
    });
  }, []);

  const handleAutoAssign = () => {
    const newAssignments: Record<string, string[]> = {};
    Object.entries(sprints).forEach(([sprintKey, sprintTickets]) => {
      sprintTickets.forEach((_, ticketIndex) => {
        const shuffled = [...teamMembers].sort(() => 0.5 - Math.random());
        const assigned = shuffled
          .slice(0, Math.floor(Math.random() * 2) + 1)
          .map((m) => m.name);
        newAssignments[`${sprintKey}-${ticketIndex}`] = assigned;
      });
    });
    setAssignments(newAssignments);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-zinc-100 px-6 py-16">
      <div className="w-full flex flex-col gap-2">
        {Object.entries(sprints).map(([key, tickets], index) => (
          <Sprint key={key} sprintName={`Sprint ${index + 1}`} userStories={tickets} />
        ))}
      </div>
    </main>
  );
}