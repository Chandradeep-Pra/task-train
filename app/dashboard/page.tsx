'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  Activity,
  CheckCircle,
  Users,
  Flame,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export default function Dashboard() {
  return (
    <main className="p-6 max-w-7xl mx-auto space-y-6">

      {/* Top Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active Tasks */}
        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-zinc-700">
              <Activity className="w-4 h-4 text-blue-500" />
              Active Tasks
            </CardTitle>
            <span className="text-xl font-bold text-zinc-900">14</span>
          </CardHeader>
          <CardContent>
            <Progress value={70} className="h-2 bg-zinc-100" />
            <p className="text-xs text-muted-foreground mt-2">10 in progress, 4 done</p>
          </CardContent>
        </Card>

        {/* Completion */}
        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-zinc-700">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Completion Rate
            </CardTitle>
            <span className="text-xl font-bold text-zinc-900">85%</span>
          </CardHeader>
          <CardContent>
            <Progress value={85} className="h-2 bg-zinc-100" />
            <p className="text-xs text-muted-foreground mt-2">+20% vs last week</p>
          </CardContent>
        </Card>

        {/* Developers */}
        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-zinc-700">
              <Users className="w-4 h-4 text-yellow-500" />
              Team
            </CardTitle>
            <span className="text-xl font-bold text-zinc-900">8</span>
          </CardHeader>
          <CardContent className="flex -space-x-2 mt-2">
            {['AK', 'RJ', 'SV'].map((initials, i) => (
              <Avatar key={i} className="w-7 h-7 border-2 border-blue-400">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            ))}
            <span className="text-xs text-muted-foreground ml-4 mt-1.5">3 active, 5 idle</span>
          </CardContent>
        </Card>

        {/* Urgent */}
        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-red-600">
              <Flame className="w-4 h-4" />
              Urgent Tasks
            </CardTitle>
            <span className="text-xl font-bold text-zinc-900">2</span>
          </CardHeader>
          <CardContent>
            <Badge variant="destructive" className="text-xs">Due Today</Badge>
            <p className="text-xs text-muted-foreground mt-2">Resolve before EOD</p>
          </CardContent>
        </Card>
      </section>

      {/* Task Feed + AI Insights */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Task Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              Recent Tasks
              <Badge variant="outline">Today</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-zinc-700">
            <div className="flex items-center justify-between">
              <span>📝 Design Login UI</span>
              <Badge variant="outline" className="text-xs">In Progress</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>✅ Setup Auth</span>
              <Badge variant="secondary" className="text-xs">Completed</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>⏳ Integrate Stripe</span>
              <Badge variant="destructive" className="text-xs">Overdue</Badge>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              Zira AI Insights
              <Badge variant="secondary">Smart Mode</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-zinc-600">
            <p>⚠️ <b>Payment Gateway</b> task might face delays. ETA +2 days.</p>
            <p>🧠 Consider splitting <b>Epic #5</b> into subtasks.</p>
            <p>💡 <b>Assign "Testing Suite" task</b> to idle devs (e.g. Arjun).</p>
          </CardContent>
        </Card>

      </section>
    </main>
  );
}
