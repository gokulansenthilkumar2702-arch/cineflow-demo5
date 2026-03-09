"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  FileText,
  Plus,
  Save,
  Download,
  Share2,
  ChevronDown,
  Bold,
  Italic,
  Type,
  MessageSquare,
  Clock,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const sampleScript = [
  {
    type: "scene-heading",
    content: "INT. SPACE STATION - COMMAND CENTER - NIGHT",
  },
  {
    type: "action",
    content:
      "The room hums with the quiet persistence of machines. Blue-white light from dozens of monitors illuminates COMMANDER SARAH CHEN (45), her face lined with exhaustion and determination.",
  },
  {
    type: "character",
    content: "COMMANDER CHEN",
  },
  {
    type: "parenthetical",
    content: "(into comm)",
  },
  {
    type: "dialogue",
    content:
      "Houston, we have confirmed visual on the anomaly. Coordinates match the projection within point-zero-three percent.",
  },
  {
    type: "action",
    content:
      "She leans forward, studying a holographic display showing a swirling mass of light approximately 2.7 million kilometers from their position.",
  },
  {
    type: "scene-heading",
    content: "INT. SPACE STATION - OBSERVATION DECK - CONTINUOUS",
  },
  {
    type: "action",
    content:
      "DR. JAMES WRIGHT (38), the mission scientist, stands transfixed before the panoramic viewport. The anomaly pulses with an almost organic rhythm.",
  },
  {
    type: "character",
    content: "DR. WRIGHT",
  },
  {
    type: "dialogue",
    content:
      "It's beautiful. In twenty years of deep space research, I've never seen anything like this.",
  },
  {
    type: "character",
    content: "COMMANDER CHEN (O.S.)",
  },
  {
    type: "dialogue",
    content: "James, report to Command. We need to discuss our approach vector.",
  },
  {
    type: "action",
    content:
      "Wright doesn't move. He reaches out, placing his palm against the cold glass as if trying to touch the light beyond.",
  },
  {
    type: "character",
    content: "DR. WRIGHT",
  },
  {
    type: "parenthetical",
    content: "(whispered)",
  },
  {
    type: "dialogue",
    content: "It's calling to us.",
  },
]

const scripts = [
  { id: 1, title: "The Last Horizon", pages: 98, lastEdited: "2 hours ago", status: "Draft" },
  { id: 2, title: "Midnight Echo", pages: 112, lastEdited: "Yesterday", status: "Review" },
  { id: 3, title: "Summer Dreams", pages: 45, lastEdited: "3 days ago", status: "Draft" },
]

function getElementStyle(type: string) {
  switch (type) {
    case "scene-heading":
      return "font-bold uppercase text-foreground"
    case "action":
      return "text-foreground"
    case "character":
      return "uppercase text-center font-semibold text-foreground mt-4"
    case "parenthetical":
      return "text-center text-muted-foreground italic ml-16 mr-16"
    case "dialogue":
      return "text-center ml-12 mr-12 text-foreground"
    default:
      return "text-foreground"
  }
}

export default function ScriptsPage() {
  const [activeScript, setActiveScript] = useState(scripts[0])

  return (
    <div className="flex h-[calc(100vh-0px)] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-foreground">{activeScript.title}</h1>
              <Badge variant="outline">{activeScript.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {activeScript.pages} pages · Last edited {activeScript.lastEdited}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Scripts List Sidebar */}
        <div className="w-64 border-r border-border bg-muted/30">
          <div className="flex items-center justify-between p-4">
            <h2 className="font-semibold text-foreground">Scripts</h2>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-140px)]">
            <div className="space-y-1 px-2">
              {scripts.map((script) => (
                <button
                  key={script.id}
                  onClick={() => setActiveScript(script)}
                  className={`w-full rounded-lg p-3 text-left transition-colors ${
                    activeScript.id === script.id
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <p className="font-medium">{script.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {script.pages} pages · {script.lastEdited}
                  </p>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Script Editor */}
        <div className="flex-1 overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-2 border-b border-border bg-background px-4 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Type className="h-4 w-4" />
                  Scene Heading
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Scene Heading</DropdownMenuItem>
                <DropdownMenuItem>Action</DropdownMenuItem>
                <DropdownMenuItem>Character</DropdownMenuItem>
                <DropdownMenuItem>Dialogue</DropdownMenuItem>
                <DropdownMenuItem>Parenthetical</DropdownMenuItem>
                <DropdownMenuItem>Transition</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="mx-2 h-6 w-px bg-border" />
            
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Italic className="h-4 w-4" />
            </Button>
            
            <div className="mx-2 h-6 w-px bg-border" />
            
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Comments
            </Button>
            
            <div className="flex-1" />
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Auto-saved 2 min ago</span>
            </div>
          </div>

          {/* Script Content */}
          <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="mx-auto max-w-3xl p-8">
              <div className="rounded-lg border border-border bg-card p-12 shadow-sm font-mono text-sm">
                <div className="mb-8 text-center">
                  <h2 className="text-xl font-bold uppercase text-foreground">The Last Horizon</h2>
                  <p className="mt-2 text-muted-foreground">Written by Jane Smith</p>
                  <p className="text-muted-foreground">Draft 3 - March 2026</p>
                </div>
                
                <div className="space-y-4">
                  {sampleScript.map((element, index) => (
                    <p key={index} className={getElementStyle(element.type)}>
                      {element.content}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
