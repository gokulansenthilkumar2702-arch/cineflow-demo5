"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Users,
  Sun,
  Sunset,
  Moon,
  Camera,
  AlertTriangle,
} from "lucide-react"

const shootDays = [
  {
    id: 1,
    date: "Monday, March 16",
    dateShort: "Mar 16",
    location: "Stage 4 - Space Station Interior",
    callTime: "6:00 AM",
    wrapTime: "7:00 PM",
    status: "completed",
    scenes: ["Scene 1 - Command Center"],
    shots: 6,
    shotsCompleted: 6,
    crew: [
      { name: "Sarah Chen", role: "Director", initials: "SC" },
      { name: "Mike Roberts", role: "DP", initials: "MR" },
      { name: "Lisa Park", role: "1st AD", initials: "LP" },
    ],
    notes: "All shots completed on schedule",
    dayType: "day",
  },
  {
    id: 2,
    date: "Tuesday, March 17",
    dateShort: "Mar 17",
    location: "Stage 4 - Observation Deck Set",
    callTime: "7:00 AM",
    wrapTime: "8:00 PM",
    status: "in-progress",
    scenes: ["Scene 2 - Observation Deck"],
    shots: 8,
    shotsCompleted: 3,
    crew: [
      { name: "Sarah Chen", role: "Director", initials: "SC" },
      { name: "Mike Roberts", role: "DP", initials: "MR" },
      { name: "Lisa Park", role: "1st AD", initials: "LP" },
      { name: "Tom Wilson", role: "Gaffer", initials: "TW" },
    ],
    notes: "Green screen day - VFX supervisor on set",
    dayType: "day",
  },
  {
    id: 3,
    date: "Wednesday, March 18",
    dateShort: "Mar 18",
    location: "Stage 4 - Observation Deck Set",
    callTime: "7:00 AM",
    wrapTime: "6:00 PM",
    status: "scheduled",
    scenes: ["Scene 2 - Observation Deck (cont.)", "Scene 3 - Corridor"],
    shots: 10,
    shotsCompleted: 0,
    crew: [
      { name: "Sarah Chen", role: "Director", initials: "SC" },
      { name: "Mike Roberts", role: "DP", initials: "MR" },
      { name: "Lisa Park", role: "1st AD", initials: "LP" },
    ],
    notes: "Heavy dialogue scenes - allow extra time for coverage",
    dayType: "day",
  },
  {
    id: 4,
    date: "Thursday, March 19",
    dateShort: "Mar 19",
    location: "Stage 2 - Airlock Set",
    callTime: "10:00 AM",
    wrapTime: "10:00 PM",
    status: "scheduled",
    scenes: ["Scene 5 - Airlock Sequence"],
    shots: 12,
    shotsCompleted: 0,
    crew: [
      { name: "Sarah Chen", role: "Director", initials: "SC" },
      { name: "Mike Roberts", role: "DP", initials: "MR" },
      { name: "Lisa Park", role: "1st AD", initials: "LP" },
      { name: "James Lee", role: "Stunt Coord", initials: "JL" },
    ],
    notes: "Stunt work - Safety meeting at 9:30 AM",
    dayType: "night",
    alerts: ["Stunt coordination required", "Extended hours"],
  },
  {
    id: 5,
    date: "Friday, March 20",
    dateShort: "Mar 20",
    location: "Backlot - Exterior Landing Pad",
    callTime: "5:00 AM",
    wrapTime: "11:00 AM",
    status: "scheduled",
    scenes: ["Scene 8 - Ship Exterior"],
    shots: 4,
    shotsCompleted: 0,
    crew: [
      { name: "Sarah Chen", role: "Director", initials: "SC" },
      { name: "Mike Roberts", role: "DP", initials: "MR" },
    ],
    notes: "Magic hour shoot - Need sunrise",
    dayType: "sunrise",
    alerts: ["Weather dependent"],
  },
]

const weekDays = [
  { day: "Sun", date: "15", isCurrentMonth: true },
  { day: "Mon", date: "16", isCurrentMonth: true, hasShoot: true, status: "completed" },
  { day: "Tue", date: "17", isCurrentMonth: true, hasShoot: true, status: "in-progress", isToday: true },
  { day: "Wed", date: "18", isCurrentMonth: true, hasShoot: true, status: "scheduled" },
  { day: "Thu", date: "19", isCurrentMonth: true, hasShoot: true, status: "scheduled" },
  { day: "Fri", date: "20", isCurrentMonth: true, hasShoot: true, status: "scheduled" },
  { day: "Sat", date: "21", isCurrentMonth: true },
]

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-chart-3"
    case "in-progress":
      return "bg-primary"
    case "scheduled":
      return "bg-accent"
    default:
      return "bg-muted"
  }
}

function getDayTypeIcon(type: string) {
  switch (type) {
    case "day":
      return <Sun className="h-4 w-4 text-accent" />
    case "night":
      return <Moon className="h-4 w-4 text-primary" />
    case "sunrise":
      return <Sunset className="h-4 w-4 text-chart-4" />
    default:
      return <Sun className="h-4 w-4 text-accent" />
  }
}

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState(shootDays[1])

  return (
    <div className="flex h-[calc(100vh-0px)] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Production Schedule</h1>
            <p className="text-sm text-muted-foreground">
              The Last Horizon · March 2026
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="min-w-32">
            March 2026
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="mx-2 h-6 w-px bg-border" />
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Shoot Day
          </Button>
        </div>
      </div>

      {/* Week Calendar Strip */}
      <div className="border-b border-border bg-muted/30 px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          {weekDays.map((day, index) => (
            <button
              key={index}
              className={`flex flex-col items-center rounded-lg p-3 transition-colors min-w-16 ${
                day.isToday
                  ? "bg-primary text-primary-foreground"
                  : day.hasShoot
                  ? "bg-card hover:bg-muted"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <span className="text-xs font-medium">{day.day}</span>
              <span className="text-lg font-bold">{day.date}</span>
              {day.hasShoot && (
                <div className={`mt-1 h-1.5 w-1.5 rounded-full ${getStatusColor(day.status || "")}`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Shoot Days List */}
        <div className="w-96 border-r border-border bg-muted/30">
          <div className="p-4">
            <h2 className="font-semibold text-foreground">Shoot Days</h2>
            <p className="text-sm text-muted-foreground">5 days scheduled</p>
          </div>
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="space-y-2 px-4 pb-4">
              {shootDays.map((day) => (
                <Card
                  key={day.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedDay.id === day.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedDay(day)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          day.status === "completed" ? "bg-chart-3/20" :
                          day.status === "in-progress" ? "bg-primary/20" :
                          "bg-muted"
                        }`}>
                          {getDayTypeIcon(day.dayType)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{day.dateShort}</p>
                          <p className="text-xs text-muted-foreground">{day.scenes[0]}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          day.status === "completed"
                            ? "bg-chart-3/10 text-chart-3 border-chart-3/30"
                            : day.status === "in-progress"
                            ? "bg-primary/10 text-primary border-primary/30"
                            : ""
                        }
                      >
                        {day.status === "in-progress" ? "Today" : day.status === "completed" ? "Done" : "Upcoming"}
                      </Badge>
                    </div>
                    
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {day.callTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Camera className="h-3 w-3" />
                        {day.shotsCompleted}/{day.shots} shots
                      </span>
                    </div>
                    
                    {day.alerts && day.alerts.length > 0 && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-destructive">
                        <AlertTriangle className="h-3 w-3" />
                        {day.alerts[0]}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Day Details */}
        <ScrollArea className="flex-1">
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                  selectedDay.status === "completed" ? "bg-chart-3/20" :
                  selectedDay.status === "in-progress" ? "bg-primary/20" :
                  "bg-muted"
                }`}>
                  {getDayTypeIcon(selectedDay.dayType)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{selectedDay.date}</h2>
                  <p className="text-muted-foreground">Day {selectedDay.id} of Production</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Location & Time */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Location & Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">{selectedDay.location}</p>
                      <p className="text-sm text-muted-foreground">Main filming location</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">
                        {selectedDay.callTime} - {selectedDay.wrapTime}
                      </p>
                      <p className="text-sm text-muted-foreground">Call time to wrap</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Camera className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">
                        {selectedDay.shotsCompleted} of {selectedDay.shots} shots
                      </p>
                      <div className="mt-1 h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(selectedDay.shotsCompleted / selectedDay.shots) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Crew */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Key Crew</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedDay.crew.map((member, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Scenes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Scenes to Shoot</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedDay.scenes.map((scene, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-lg bg-muted/50 p-3"
                      >
                        <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary">{index + 1}</span>
                        </div>
                        <span className="text-sm font-medium text-foreground">{scene}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notes & Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Notes & Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedDay.alerts && selectedDay.alerts.length > 0 && (
                    <div className="space-y-2">
                      {selectedDay.alerts.map((alert, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
                        >
                          <AlertTriangle className="h-4 w-4 shrink-0" />
                          {alert}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-sm text-foreground">{selectedDay.notes}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
