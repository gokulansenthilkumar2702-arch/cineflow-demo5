"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Film,
  Plus,
  Clock,
  Users,
  FileText,
  Layout,
  ListChecks,
  Calendar,
  MoreHorizontal,
  TrendingUp,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

const projects = [
  {
    id: 1,
    title: "The Last Horizon",
    genre: "Sci-Fi Drama",
    status: "In Production",
    progress: 65,
    dueDate: "Apr 15, 2026",
    team: 12,
    scenes: 48,
    shots: 156,
  },
  {
    id: 2,
    title: "Midnight Echo",
    genre: "Thriller",
    status: "Pre-Production",
    progress: 25,
    dueDate: "May 20, 2026",
    team: 8,
    scenes: 32,
    shots: 89,
  },
  {
    id: 3,
    title: "Summer Dreams",
    genre: "Romance",
    status: "Development",
    progress: 10,
    dueDate: "Jun 30, 2026",
    team: 5,
    scenes: 24,
    shots: 0,
  },
  {
    id: 4,
    title: "Urban Legends",
    genre: "Horror",
    status: "Post-Production",
    progress: 85,
    dueDate: "Mar 25, 2026",
    team: 15,
    scenes: 56,
    shots: 203,
  },
]

const recentActivity = [
  { action: "Script revision", project: "The Last Horizon", time: "2 hours ago", icon: FileText },
  { action: "New storyboard frames", project: "Midnight Echo", time: "4 hours ago", icon: Layout },
  { action: "Shot list updated", project: "Urban Legends", time: "Yesterday", icon: ListChecks },
  { action: "Schedule modified", project: "The Last Horizon", time: "Yesterday", icon: Calendar },
]

const stats = [
  { label: "Active Projects", value: "4", icon: Film, change: "+2 this month" },
  { label: "Total Scenes", value: "160", icon: Layout, change: "+12 this week" },
  { label: "Shots Planned", value: "448", icon: ListChecks, change: "+45 this week" },
  { label: "Team Members", value: "40", icon: Users, change: "+3 this month" },
]

function getStatusColor(status: string) {
  switch (status) {
    case "In Production":
      return "bg-primary/20 text-primary border-primary/30"
    case "Pre-Production":
      return "bg-accent/20 text-accent-foreground border-accent/30"
    case "Development":
      return "bg-muted text-muted-foreground border-border"
    case "Post-Production":
      return "bg-chart-3/20 text-chart-3 border-chart-3/30"
    default:
      return "bg-muted text-muted-foreground border-border"
  }
}

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground lg:text-3xl">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Welcome back! Here is an overview of your productions.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <TrendingUp className="h-4 w-4 text-chart-3" />
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-xs text-chart-3">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Your Projects</h2>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => (
            <Card key={project.id} className="group transition-all hover:shadow-lg hover:border-primary/30">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                    <Film className="h-5 w-5 text-primary" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Open Project</DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="mt-3 text-base">{project.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{project.genre}</p>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-2">
                  <Badge variant="outline" className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                
                <div className="mb-3">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-lg bg-muted/50 p-2">
                    <p className="font-semibold text-foreground">{project.scenes}</p>
                    <p className="text-muted-foreground">Scenes</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2">
                    <p className="font-semibold text-foreground">{project.shots}</p>
                    <p className="text-muted-foreground">Shots</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2">
                    <p className="font-semibold text-foreground">{project.team}</p>
                    <p className="text-muted-foreground">Team</p>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Due {project.dueDate}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <activity.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.project}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
