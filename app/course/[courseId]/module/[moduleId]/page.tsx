"use client"

import { useParams, useRouter, notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, HelpCircle, Target, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { courseApi, progressApi, type CourseDetail, type ModuleDetail, type UserProgress } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function ModulePlayerPage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  const courseSlug = params.courseId as string
  const moduleSlug = params.moduleId as string

  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [module, setModule] = useState<ModuleDetail | null>(null)
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCompleted, setIsCompleted] = useState(false)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseData, moduleData] = await Promise.all([
          courseApi.get(courseSlug),
          courseApi.getModule(courseSlug, moduleSlug),
        ])
        setCourse(courseData)
        setModule(moduleData)

        // Fetch progress if authenticated
        if (isAuthenticated) {
          try {
            const progressData = await progressApi.getCourseProgress(courseSlug)
            setProgress(progressData)
            const moduleProgress = progressData.find((p) => p.module_slug === moduleSlug)
            if (moduleProgress?.completed) {
              setIsCompleted(true)
            }
          } catch {
            // Ignore progress errors
          }
        }
      } catch (error) {
        console.error("Failed to fetch module:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [courseSlug, moduleSlug, isAuthenticated])

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-10 w-32 mb-8" />
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-10 w-2/3 mb-8" />
            <Skeleton className="h-32 w-full rounded-xl mb-8" />
            <Skeleton className="h-64 w-full rounded-xl mb-8" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!course || !module) {
    notFound()
  }

  const moduleIndex = course.modules.findIndex((m) => m.slug === moduleSlug)

  if (moduleIndex === -1) {
    notFound()
  }

  // Check if module is unlocked
  const completedModules = progress.filter((p) => p.completed).map((p) => p.module_slug)
  const isUnlocked = moduleIndex === 0 || completedModules.includes(course.modules[moduleIndex - 1]?.slug)

  if (!isUnlocked && isAuthenticated) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Module Locked</h1>
            <p className="text-muted-foreground mb-8">Complete the previous module to unlock this content.</p>
            <Link href={`/course/${courseSlug}`}>
              <Button className="bg-primary hover:bg-primary/90">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const isLastModule = moduleIndex === course.modules.length - 1
  const nextModule = !isLastModule ? course.modules[moduleIndex + 1] : null
  const prevModule = moduleIndex > 0 ? course.modules[moduleIndex - 1] : null

  const handleMarkComplete = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to track your progress")
      router.push(`/login?course=${courseSlug}&module=${moduleSlug}`)
      return
    }

    setIsSubmitting(true)
    try {
      await progressApi.completeModule(courseSlug, moduleSlug, answers)
      setIsCompleted(true)

      if (isLastModule) {
        toast.success("Congratulations! You have completed this course!")
      } else {
        toast.success("Module completed! Next module unlocked!")
      }
    } catch (error) {
      toast.error("Failed to save progress")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNextModule = () => {
    if (nextModule) {
      router.push(`/course/${courseSlug}/module/${nextModule.slug}`)
    }
  }

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }))
  }

  const allQuestionsAnswered = module.reflection_questions.every((_, index) => answers[index]?.trim().length > 0)

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Link href={`/course/${courseSlug}`}>
            <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
          </Link>

          {/* Module Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm text-muted-foreground font-medium">
                Module {moduleIndex + 1} of {course.modules.length}
              </span>
              {isCompleted && (
                <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Completed
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">{module.title}</h1>
          </div>

          {/* Objective Card */}
          <Card className="bg-primary/5 border-primary/20 p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Learning Objective</h3>
                <p className="text-muted-foreground">{module.objective}</p>
              </div>
            </div>
          </Card>

          {/* Content Section */}
          <Card className="bg-card border-border p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-secondary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Lesson Content</h2>
            </div>

            {/* Render content sections from API */}
            <div className="space-y-8">
              {module.content_sections.map((section, index) => (
                <div key={index} className="border-l-2 border-primary/30 pl-5">
                  {/* Section Title */}
                  <h3
                    className={cn(
                      "font-semibold text-foreground mb-2",
                      section.title.match(/^\d+\./) ? "text-xl text-primary" : "text-lg",
                    )}
                  >
                    {section.title}
                  </h3>

                  {/* Section Description */}
                  {section.description && (
                    <p className="text-muted-foreground mb-3 leading-relaxed">{section.description}</p>
                  )}

                  {/* Section Points */}
                  {section.points && section.points.length > 0 && (
                    <ul className="space-y-2 mb-3">
                      {section.points.map((point, pIndex) => (
                        <li key={pIndex} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-foreground leading-relaxed">{point.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Section Examples */}
                  {section.examples && section.examples.length > 0 && (
                    <div className="bg-muted/30 rounded-lg p-4 mt-3">
                      {section.examples.map((example, eIndex) => (
                        <p key={eIndex} className="text-sm text-muted-foreground italic">
                          {example.text}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Capstone Task (if exists) */}
          {course.modules[moduleIndex].capstone_task && (
            <Card className="bg-primary/5 border-primary/30 p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full font-medium">
                  Capstone Task
                </span>
              </div>
              <p className="text-foreground leading-relaxed">{course.modules[moduleIndex].capstone_task}</p>
            </Card>
          )}

          {/* Reflection Questions */}
          <Card className="bg-card border-border p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Reflection Questions</h2>
            </div>

            <div className="space-y-6">
              {module.reflection_questions.map((q, index) => (
                <div key={index}>
                  <label className="block text-foreground font-medium mb-3">
                    {index + 1}. {q.question}
                  </label>
                  <Textarea
                    placeholder="Type your answer here..."
                    value={answers[index] || ""}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="min-h-[120px] bg-muted/50 border-border focus:border-primary"
                    disabled={isCompleted}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Navigation & Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
            {/* Previous */}
            <div>
              {prevModule ? (
                <Link href={`/course/${courseSlug}/module/${prevModule.slug}`}>
                  <Button variant="outline" className="group bg-transparent">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Previous Module
                  </Button>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {!isCompleted && (
                <Button
                  onClick={handleMarkComplete}
                  disabled={!allQuestionsAnswered || isSubmitting}
                  className={cn(
                    "bg-primary hover:bg-primary/90 text-primary-foreground",
                    (!allQuestionsAnswered || isSubmitting) && "opacity-50 cursor-not-allowed",
                  )}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Mark as Complete"}
                </Button>
              )}

              {nextModule && (
                <Button
                  onClick={handleNextModule}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground group"
                >
                  Next Module
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}

              {isLastModule && isCompleted && (
                <Link href={`/course/${courseSlug}`}>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">View Certificate</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
