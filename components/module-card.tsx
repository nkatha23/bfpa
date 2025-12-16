"use client"

import Link from "next/link"
import { Lock, CheckCircle2, Circle, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ModuleCardProps {
  module: {
    id: string // This is the slug from the API
    title: string
    objective: string
    capstoneTask?: string
  }
  courseId: string
  index: number
  isUnlocked: boolean
  isCompleted: boolean
  isInProgress: boolean
}

export function ModuleCard({ module, courseId, index, isUnlocked, isCompleted, isInProgress }: ModuleCardProps) {
  const getStatusIcon = () => {
    if (isCompleted) return <CheckCircle2 className="w-5 h-5 text-secondary" />
    if (!isUnlocked) return <Lock className="w-5 h-5 text-muted-foreground" />
    return <Circle className="w-5 h-5 text-primary" />
  }

  const getButtonContent = () => {
    if (isCompleted) return "Review"
    if (isInProgress) return "Continue"
    if (isUnlocked) return "Start Module"
    return "Locked"
  }

  return (
    <Card
      className={cn(
        "bg-card border-border p-6 transition-all duration-300",
        isUnlocked ? "hover:border-primary/50 hover:shadow-lg" : "opacity-60",
        isCompleted && "border-secondary/30",
      )}
    >
      <div className="flex items-start gap-4">
        {/* Status Icon */}
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
            isCompleted ? "bg-secondary/20" : isUnlocked ? "bg-primary/20" : "bg-muted",
          )}
        >
          {getStatusIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted-foreground font-medium">Module {index + 1}</span>
            {module.capstoneTask && (
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Capstone</span>
            )}
          </div>

          <h3 className={cn("font-semibold mb-2", isUnlocked ? "text-foreground" : "text-muted-foreground")}>
            {module.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2">{module.objective}</p>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0">
          {isUnlocked ? (
            <Link href={`/course/${courseId}/module/${module.id}`}>
              <Button
                size="sm"
                className={cn(
                  "group",
                  isCompleted
                    ? "bg-secondary/20 text-secondary hover:bg-secondary/30"
                    : isInProgress
                      ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground",
                )}
              >
                {getButtonContent()}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          ) : (
            <Button size="sm" variant="outline" disabled className="text-muted-foreground bg-transparent">
              <Lock className="w-4 h-4 mr-1" />
              Locked
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
