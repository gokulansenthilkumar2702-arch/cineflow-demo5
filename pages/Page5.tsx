import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  Film, 
  FileText, 
  Layout, 
  ListChecks, 
  Calendar, 
  Users,
  ArrowRight,
  Play,
  Sparkles,
  Zap
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Film className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CineFlow</span>
          </Link>
          
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#workflow" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Workflow
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-muted-foreground">Now with AI-powered script analysis</span>
            </div>
            
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Streamline Your Film Production Workflow
            </h1>
            
            <p className="mt-6 text-pretty text-lg text-muted-foreground sm:text-xl">
              From script to screen, manage every aspect of your production. 
              Scripts, storyboards, shot lists, and schedules — all in one powerful platform.
            </p>
            
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/dashboard">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Play className="h-4 w-4" />
                Watch Demo
              </Button>
            </div>
            
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required. 14-day free trial.
            </p>
          </div>
          
          {/* Hero Image/Preview */}
          <div className="mt-16 overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-accent/60" />
              <div className="h-3 w-3 rounded-full bg-primary/60" />
              <span className="ml-4 text-sm text-muted-foreground">CineFlow Dashboard</span>
            </div>
            <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted p-8">
              <div className="flex h-full gap-4">
                <div className="w-48 rounded-lg bg-card/50 p-4">
                  <div className="mb-4 h-4 w-24 rounded bg-muted" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded bg-primary/40" />
                        <div className="h-3 flex-1 rounded bg-muted" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 rounded-lg bg-card/50 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="h-4 w-32 rounded bg-muted" />
                    <div className="h-6 w-20 rounded bg-primary/40" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="aspect-video rounded-lg bg-muted" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-border bg-muted/30 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything You Need for Production
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Professional tools designed by filmmakers, for filmmakers.
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: FileText,
                title: "Script Editor",
                description: "Industry-standard screenplay formatting with real-time collaboration and revision tracking.",
              },
              {
                icon: Layout,
                title: "Storyboards",
                description: "Visual planning tools to map out every shot with frame annotations and timing notes.",
              },
              {
                icon: ListChecks,
                title: "Shot Lists",
                description: "Detailed shot breakdowns with camera angles, movements, and technical requirements.",
              },
              {
                icon: Calendar,
                title: "Scheduling",
                description: "Smart production calendars that adapt to your crew availability and location constraints.",
              },
              {
                icon: Users,
                title: "Team Management",
                description: "Role-based access control and communication tools for your entire production team.",
              },
              {
                icon: Zap,
                title: "AI Assistant",
                description: "Intelligent suggestions for shot composition, script analysis, and schedule optimization.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              From Concept to Completion
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A seamless workflow that guides your project through every phase of production.
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 lg:grid-cols-4">
            {[
              { step: "01", title: "Write", description: "Craft your screenplay with professional formatting tools" },
              { step: "02", title: "Visualize", description: "Create storyboards to plan your visual narrative" },
              { step: "03", title: "Plan", description: "Build shot lists and schedule your production days" },
              { step: "04", title: "Produce", description: "Execute your vision with your team in sync" },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                {index < 3 && (
                  <div className="absolute top-8 left-full hidden h-0.5 w-full bg-gradient-to-r from-border to-transparent lg:block" />
                )}
                <div className="text-5xl font-bold text-primary/20">{item.step}</div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to Transform Your Production?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Join thousands of filmmakers who trust CineFlow to bring their stories to life.
          </p>
          <div className="mt-8">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/dashboard">
                Get Started for Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Film className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">CineFlow</span>
            </div>
            <p className="text-sm text-muted-foreground">
              2026 CineFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
