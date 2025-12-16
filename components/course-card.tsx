import Link from "next/link"
import { Briefcase, Globe, GraduationCap, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { CourseListItem } from "@/lib/api"

const iconMap = {
  Briefcase,
  Globe,
  GraduationCap,
}

const colorMap = {
  gold: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "group-hover:border-primary/50",
    shadow: "group-hover:shadow-primary/20",
  },
  emerald: {
    bg: "bg-secondary/10",
    text: "text-secondary",
    border: "group-hover:border-secondary/50",
    shadow: "group-hover:shadow-secondary/20",
  },
  secondary: {
    bg: "bg-accent/30",
    text: "text-accent-foreground",
    border: "group-hover:border-accent/50",
    shadow: "group-hover:shadow-accent/20",
  },
}

interface CourseCardProps {
  course: CourseListItem
  progress?: number
}

export function CourseCard({ course, progress = 0 }: CourseCardProps) {
  const Icon = iconMap[course.icon as keyof typeof iconMap] || Briefcase
  const colors = colorMap[course.color]

  return (
    <Link href={`/course/${course.slug}`} className="group">
      <Card
        className={cn(
          "bg-card border-border p-6 h-full transition-all duration-300",
          "hover:scale-[1.02] hover:shadow-lg",
          colors.border,
          colors.shadow,
        )}
      >
        {/* Icon */}
        <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-4", colors.bg)}>
          <Icon className={cn("w-7 h-7", colors.text)} />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>

        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{course.description}</p>

        {/* Meta - Use module_count from API */}
        <div className="flex items-center justify-between mt-auto">
          <Badge variant="outline" className="text-muted-foreground">
            {course.module_count} modules
          </Badge>

          <Button variant="ghost" size="sm" className={cn("group/btn", colors.text)}>
            Explore
            <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Progress Bar (if started) */}
        {progress > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-primary font-medium">{progress}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </Card>
    </Link>
  )
}
