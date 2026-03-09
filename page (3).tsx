"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ListChecks,
  Plus,
  Download,
  Filter,
  Search,
  MoreHorizontal,
  ArrowUpDown,
  Camera,
  Move,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
} from "lucide-react"

const shots = [
  {
    id: 1,
    shotNumber: "1A",
    scene: "1",
    description: "Establishing shot - Space station exterior",
    angle: "Wide",
    movement: "Slow push in",
    lens: "24mm",
    duration: "4s",
    equipment: "Crane, VFX plates",
    status: "completed",
    notes: "VFX team has reference plates",
  },
  {
    id: 2,
    shotNumber: "1B",
    scene: "1",
    description: "Command center window reflection",
    angle: "Close-up",
    movement: "Static",
    lens: "85mm",
    duration: "2s",
    equipment: "Sticks",
    status: "completed",
    notes: "Need practical lights for reflection",
  },
  {
    id: 3,
    shotNumber: "2",
    scene: "1",
    description: "Chen at station - Multiple screens",
    angle: "Medium",
    movement: "Dolly right",
    lens: "35mm",
    duration: "3s",
    equipment: "Dolly track",
    status: "in-progress",
    notes: "Screen content TBD",
  },
  {
    id: 4,
    shotNumber: "3",
    scene: "1",
    description: "OTS Chen - Holographic display",
    angle: "Over-shoulder",
    movement: "Subtle zoom",
    lens: "50mm",
    duration: "4s",
    equipment: "Steadicam",
    status: "in-progress",
    notes: "VFX hologram placeholder on set",
  },
  {
    id: 5,
    shotNumber: "4",
    scene: "2",
    description: "Observation deck wide",
    angle: "Wide",
    movement: "Crane down",
    lens: "18mm",
    duration: "5s",
    equipment: "Crane, Green screen",
    status: "pending",
    notes: "Full green screen background",
  },
  {
    id: 6,
    shotNumber: "5",
    scene: "2",
    description: "Wright silhouette at viewport",
    angle: "Medium Wide",
    movement: "Static",
    lens: "35mm",
    duration: "3s",
    equipment: "Sticks",
    status: "pending",
    notes: "Atmospheric lighting",
  },
  {
    id: 7,
    shotNumber: "6A",
    scene: "2",
    description: "Wright profile - Anomaly reflection",
    angle: "Close-up",
    movement: "Slow push",
    lens: "100mm",
    duration: "2s",
    equipment: "Slider, LED panel",
    status: "pending",
    notes: "LED panel for eye reflection",
  },
  {
    id: 8,
    shotNumber: "6B",
    scene: "2",
    description: "ECU Wright hand on glass",
    angle: "Extreme Close-up",
    movement: "Static",
    lens: "100mm Macro",
    duration: "2s",
    equipment: "Sticks, Practical FX",
    status: "pending",
    notes: "Condensation practical effect",
  },
  {
    id: 9,
    shotNumber: "7",
    scene: "2",
    description: "Chen enters observation deck",
    angle: "Wide",
    movement: "Pan left",
    lens: "28mm",
    duration: "3s",
    equipment: "Fluid head",
    status: "pending",
    notes: "Match lighting from scene 1",
  },
  {
    id: 10,
    shotNumber: "8",
    scene: "2",
    description: "Two-shot Chen and Wright",
    angle: "Medium",
    movement: "Static",
    lens: "40mm",
    duration: "4s",
    equipment: "Sticks",
    status: "pending",
    notes: "Key dialogue scene",
  },
]

function getStatusIcon(status: string) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-chart-3" />
    case "in-progress":
      return <AlertCircle className="h-4 w-4 text-accent" />
    case "pending":
      return <Circle className="h-4 w-4 text-muted-foreground" />
    default:
      return <Circle className="h-4 w-4 text-muted-foreground" />
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return <Badge variant="outline" className="bg-chart-3/10 text-chart-3 border-chart-3/30">Completed</Badge>
    case "in-progress":
      return <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/30">In Progress</Badge>
    case "pending":
      return <Badge variant="outline">Pending</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

export default function ShotsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedScene, setSelectedScene] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedShots, setSelectedShots] = useState<number[]>([])

  const filteredShots = shots.filter((shot) => {
    const matchesSearch = shot.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shot.shotNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesScene = selectedScene === "all" || shot.scene === selectedScene
    const matchesStatus = selectedStatus === "all" || shot.status === selectedStatus
    return matchesSearch && matchesScene && matchesStatus
  })

  const toggleSelectAll = () => {
    if (selectedShots.length === filteredShots.length) {
      setSelectedShots([])
    } else {
      setSelectedShots(filteredShots.map(s => s.id))
    }
  }

  const toggleSelectShot = (id: number) => {
    setSelectedShots(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const completedCount = shots.filter(s => s.status === "completed").length
  const inProgressCount = shots.filter(s => s.status === "in-progress").length
  const pendingCount = shots.filter(s => s.status === "pending").length

  return (
    <div className="flex h-[calc(100vh-0px)] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <ListChecks className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Shot List</h1>
            <p className="text-sm text-muted-foreground">
              The Last Horizon · {shots.length} shots
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Shot
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center gap-6 border-b border-border bg-muted/30 px-6 py-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-chart-3" />
          <span className="text-sm font-medium text-foreground">{completedCount}</span>
          <span className="text-sm text-muted-foreground">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium text-foreground">{inProgressCount}</span>
          <span className="text-sm text-muted-foreground">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <Circle className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{pendingCount}</span>
          <span className="text-sm text-muted-foreground">Pending</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 border-b border-border bg-background px-6 py-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search shots..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedScene} onValueChange={setSelectedScene}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Scene" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Scenes</SelectItem>
            <SelectItem value="1">Scene 1</SelectItem>
            <SelectItem value="2">Scene 2</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        
        {selectedShots.length > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-muted-foreground">
              {selectedShots.length} selected
            </span>
            <Button variant="outline" size="sm">
              Update Status
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedShots.length === filteredShots.length && filteredShots.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-20">
                <div className="flex items-center gap-1">
                  Shot
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="w-20">Scene</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-28">
                <div className="flex items-center gap-1">
                  <Camera className="h-3 w-3" />
                  Angle
                </div>
              </TableHead>
              <TableHead className="w-28">
                <div className="flex items-center gap-1">
                  <Move className="h-3 w-3" />
                  Movement
                </div>
              </TableHead>
              <TableHead className="w-20">Lens</TableHead>
              <TableHead className="w-20">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Duration
                </div>
              </TableHead>
              <TableHead className="w-28">Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShots.map((shot) => (
              <TableRow key={shot.id} className="group">
                <TableCell>
                  <Checkbox
                    checked={selectedShots.includes(shot.id)}
                    onCheckedChange={() => toggleSelectShot(shot.id)}
                  />
                </TableCell>
                <TableCell className="font-mono font-semibold text-foreground">
                  {shot.shotNumber}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{shot.scene}</Badge>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm text-foreground">{shot.description}</p>
                    {shot.notes && (
                      <p className="mt-1 text-xs text-muted-foreground">{shot.notes}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{shot.angle}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{shot.movement}</TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">{shot.lens}</TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">{shot.duration}</TableCell>
                <TableCell>{getStatusBadge(shot.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Shot</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>View in Storyboard</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
