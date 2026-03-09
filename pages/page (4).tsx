"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Layout,
  Plus,
  Grid3X3,
  List,
  ZoomIn,
  ZoomOut,
  Download,
  Play,
  ChevronLeft,
  ChevronRight,
  Camera,
  Clock,
  Film,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const storyboardFrames = [
  {
    id: 1,
    scene: "1",
    shot: "1A",
    description: "Wide establishing shot of the space station orbiting Earth. Stars twinkle in the background as the station rotates slowly.",
    duration: "4s",
    cameraAngle: "Wide",
    movement: "Slow push in",
    notes: "VFX heavy - coordinate with post",
  },
  {
    id: 2,
    scene: "1",
    shot: "1B",
    description: "Close-up on the command center window, lights reflecting off the glass. We see Chen's silhouette.",
    duration: "2s",
    cameraAngle: "Close-up",
    movement: "Static",
    notes: "Practical lighting needed",
  },
  {
    id: 3,
    scene: "1",
    shot: "2",
    description: "Interior command center. Chen stands at her station, multiple screens surrounding her with data feeds.",
    duration: "3s",
    cameraAngle: "Medium",
    movement: "Dolly right",
    notes: "Multiple screens need content",
  },
  {
    id: 4,
    scene: "1",
    shot: "3",
    description: "Over-the-shoulder of Chen looking at the holographic anomaly display. The swirling light pattern dominates the frame.",
    duration: "4s",
    cameraAngle: "OTS",
    movement: "Subtle zoom",
    notes: "Hologram VFX placeholder",
  },
  {
    id: 5,
    scene: "2",
    shot: "1",
    description: "The observation deck stretches before us. Floor-to-ceiling windows show the anomaly in the distance.",
    duration: "5s",
    cameraAngle: "Wide",
    movement: "Crane down",
    notes: "Green screen background",
  },
  {
    id: 6,
    scene: "2",
    shot: "2",
    description: "Dr. Wright stands alone, his back to camera. The anomaly's light casts shifting shadows across the deck.",
    duration: "3s",
    cameraAngle: "Medium Wide",
    movement: "Static",
    notes: "Atmospheric lighting cue",
  },
  {
    id: 7,
    scene: "2",
    shot: "3A",
    description: "Profile close-up of Wright's face. His eyes reflect the anomaly's pulsing light. Expression of wonder.",
    duration: "2s",
    cameraAngle: "Close-up",
    movement: "Slow push",
    notes: "LED panel for light reflection",
  },
  {
    id: 8,
    scene: "2",
    shot: "3B",
    description: "ECU on Wright's hand pressing against the cold viewport glass. Condensation forms around his fingertips.",
    duration: "2s",
    cameraAngle: "ECU",
    movement: "Static",
    notes: "Practical condensation effect",
  },
]

const scenes = [
  { id: "all", label: "All Scenes" },
  { id: "1", label: "Scene 1 - Command Center" },
  { id: "2", label: "Scene 2 - Observation Deck" },
]

export default function StoryboardPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedScene, setSelectedScene] = useState("all")
  const [selectedFrame, setSelectedFrame] = useState<number | null>(null)

  const filteredFrames = selectedScene === "all" 
    ? storyboardFrames 
    : storyboardFrames.filter(f => f.scene === selectedScene)

  return (
    <div className="flex h-[calc(100vh-0px)] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Layout className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Storyboard</h1>
            <p className="text-sm text-muted-foreground">
              The Last Horizon · {storyboardFrames.length} frames
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={selectedScene} onValueChange={setSelectedScene}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select scene" />
            </SelectTrigger>
            <SelectContent>
              {scenes.map((scene) => (
                <SelectItem key={scene.id} value={scene.id}>
                  {scene.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="mx-2 h-6 w-px bg-border" />
          
          <div className="flex items-center rounded-lg border border-border">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mx-2 h-6 w-px bg-border" />
          
          <Button variant="outline" size="sm" className="gap-2">
            <Play className="h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Frame
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Frames Grid/List */}
        <ScrollArea className="flex-1">
          <div className="p-6">
            {viewMode === "grid" ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredFrames.map((frame) => (
                  <Card
                    key={frame.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedFrame === frame.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedFrame(frame.id)}
                  >
                    <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
                      {/* Placeholder for storyboard image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <Film className="h-8 w-8" />
                          <span className="text-xs">Frame {frame.shot}</span>
                        </div>
                      </div>
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="text-xs">
                          Scene {frame.scene}
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge variant="outline" className="bg-background/80 text-xs">
                          {frame.duration}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-semibold text-foreground">Shot {frame.shot}</span>
                        <span className="text-xs text-muted-foreground">{frame.cameraAngle}</span>
                      </div>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {frame.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFrames.map((frame) => (
                  <Card
                    key={frame.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedFrame === frame.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedFrame(frame.id)}
                  >
                    <CardContent className="flex gap-4 p-4">
                      <div className="aspect-video w-48 shrink-0 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                        <Film className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <Badge variant="secondary">Scene {frame.scene}</Badge>
                          <span className="font-semibold text-foreground">Shot {frame.shot}</span>
                          <span className="text-sm text-muted-foreground">· {frame.duration}</span>
                        </div>
                        <p className="text-sm text-foreground">{frame.description}</p>
                        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Camera className="h-3 w-3" />
                            {frame.cameraAngle}
                          </span>
                          <span>{frame.movement}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Detail Panel */}
        {selectedFrame && (
          <div className="w-80 border-l border-border bg-muted/30">
            <div className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Frame Details</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setSelectedFrame(null)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              {(() => {
                const frame = storyboardFrames.find(f => f.id === selectedFrame)
                if (!frame) return null
                
                return (
                  <div className="space-y-4">
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                      <Film className="h-12 w-12 text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Scene {frame.scene}</Badge>
                      <Badge variant="outline">Shot {frame.shot}</Badge>
                    </div>
                    
                    <div>
                      <h4 className="mb-1 text-sm font-medium text-foreground">Description</h4>
                      <p className="text-sm text-muted-foreground">{frame.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="mb-1 text-xs font-medium text-muted-foreground">Duration</h4>
                        <p className="text-sm text-foreground">{frame.duration}</p>
                      </div>
                      <div>
                        <h4 className="mb-1 text-xs font-medium text-muted-foreground">Camera Angle</h4>
                        <p className="text-sm text-foreground">{frame.cameraAngle}</p>
                      </div>
                      <div>
                        <h4 className="mb-1 text-xs font-medium text-muted-foreground">Movement</h4>
                        <p className="text-sm text-foreground">{frame.movement}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="mb-1 text-sm font-medium text-foreground">Notes</h4>
                      <p className="text-sm text-muted-foreground">{frame.notes}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 gap-2">
                        <ZoomIn className="h-4 w-4" />
                        Enlarge
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
