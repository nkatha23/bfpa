"use client"

import { useParams, notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Briefcase, Globe, GraduationCap, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ModuleCard } from "@/components/module-card"
import { Skeleton } from "@/components/ui/skeleton"
import { courseApi, progressApi, type CourseDetail, type UserProgress } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const iconMap = {
  Briefcase,
  Globe,
  GraduationCap,
}

const colorMap = {
  gold: {
    bg: "bg-primary/10",
    text: "text-primary",
    progressBg: "bg-primary",
  },
  emerald: {
    bg: "bg-secondary/10",
    text: "text-secondary",
    progressBg: "bg-secondary",
  },
  secondary: {
    bg: "bg-accent/30",
    text: "text-accent-foreground",
    progressBg: "bg-accent",
  },
}

export default function CourseDetailPage() {
  const params = useParams()
  const courseSlug = params.courseId as string
  const { isAuthenticated } = useAuth()

  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [notFoundError, setNotFoundError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await courseApi.get(courseSlug)
        setCourse(courseData)

        // Fetch progress if authenticated
        if (isAuthenticated) {
          try {
            const progressData = await progressApi.getCourseProgress(courseSlug)
            setProgress(progressData)
          } catch {
            // Ignore progress errors
          }
        }
      } catch (error) {
        console.error("Failed to fetch course:", error)
        setNotFoundError(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [courseSlug, isAuthenticated])

  if (notFoundError) {
    notFound()
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Skeleton className="h-10 w-32 mb-8" />
            <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
              <Skeleton className="w-20 h-20 rounded-2xl" />
              <div className="flex-1">
                <Skeleton className="h-10 w-2/3 mb-4" />
                <Skeleton className="h-5 w-full mb-4" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <Skeleton className="h-24 w-full rounded-xl mb-12" />
            <Skeleton className="h-8 w-48 mb-6" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl mb-4" />
            ))}
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!course) {
    notFound()
  }

  const Icon = iconMap[course.icon as keyof typeof iconMap] || Briefcase
  const colors = colorMap[course.color]

  const completedModules = progress.filter((p) => p.completed).map((p) => p.module_slug)
  const completedCount = completedModules.length
  const progressPercentage = course.modules.length > 0 ? Math.round((completedCount / course.modules.length) * 100) : 0

  // Check if a module is unlocked
  const isModuleUnlocked = (moduleIndex: number, moduleSlug: string) => {
    if (moduleIndex === 0) return true // First module always unlocked
    const prevModule = course.modules[moduleIndex - 1]
    return completedModules.includes(prevModule.slug)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link href="/#courses">
            <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>
          </Link>

          {/* Course Header */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
              {/* Icon */}
              <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center", colors.bg)}>
                <Icon className={cn("w-10 h-10", colors.text)} />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{course.title}</h1>
                <p className="text-lg text-muted-foreground mb-4">{course.description}</p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.modules.length} modules</span>
                  </div>
                  <div>
                    {completedCount} of {course.modules.length} completed
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">Course Progress</span>
                <span className={cn("text-sm font-bold", colors.text)}>{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
          </div>

          {/* Module List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground mb-6">Course Modules</h2>
            {course.modules.map((module, index) => {
              const unlocked = isModuleUnlocked(index, module.slug)
              const completed = completedModules.includes(module.slug)

              return (
                <ModuleCard
                  key={module.slug}
                  module={{
                    id: module.slug,
                    title: module.title,
                    objective: module.objective,
                    capstoneTask: module.capstone_task || undefined,
                  }}
                  courseId={courseSlug}
                  index={index}
                  isUnlocked={unlocked}
                  isCompleted={completed}
                  isInProgress={false}
                />
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
