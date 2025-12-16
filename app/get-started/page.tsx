"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Briefcase, Globe, GraduationCap, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"
import { courseApi, type CourseDetail, type CourseListItem } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"

const iconMap = {
  Briefcase,
  Globe,
  GraduationCap,
}

const colorMap = {
  gold: {
    bg: "bg-primary/10",
    border: "border-primary",
    text: "text-primary",
  },
  emerald: {
    bg: "bg-secondary/10",
    border: "border-secondary",
    text: "text-secondary",
  },
  secondary: {
    bg: "bg-accent/30",
    border: "border-accent",
    text: "text-accent-foreground",
  },
}

export default function GetStartedPage() {
  const { isAuthenticated } = useAuth()
  const [courses, setCourses] = useState<CourseListItem[]>([])
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(null)
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingModules, setIsLoadingModules] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseApi.list()
        setCourses(data)
      } catch (error) {
        console.error("Failed to fetch courses:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCourses()
  }, [])

  useEffect(() => {
    if (selectedCourse) {
      const fetchCourseDetail = async () => {
        setIsLoadingModules(true)
        try {
          const data = await courseApi.get(selectedCourse)
          setCourseDetail(data)
        } catch (error) {
          console.error("Failed to fetch course detail:", error)
        } finally {
          setIsLoadingModules(false)
        }
      }
      fetchCourseDetail()
    }
  }, [selectedCourse])

  // Determine redirect URL based on auth status
  const getNextUrl = () => {
    if (isAuthenticated && selectedCourse && selectedModule) {
      return `/course/${selectedCourse}/module/${selectedModule}`
    }
    return `/signup?course=${selectedCourse}&module=${selectedModule}`
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Link href="/">
            <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Choose Your Learning Path</h1>
            <p className="text-muted-foreground text-lg">
              Select a course and module to begin your Bitcoin education journey
            </p>
          </div>

          {/* Step 1: Choose Course */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                1
              </span>
              Select a Course
            </h2>

            {isLoading ? (
              <div className="grid gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="p-5 rounded-xl border-2 border-border bg-card">
                    <div className="flex items-start gap-4">
                      <Skeleton className="w-12 h-12 rounded-lg" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-1/3 mb-2" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-3 w-20 mt-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                {courses.map((c) => {
                  const Icon = iconMap[c.icon as keyof typeof iconMap] || Briefcase
                  const colors = colorMap[c.color]
                  const isSelected = selectedCourse === c.slug

                  return (
                    <button
                      key={c.slug}
                      onClick={() => {
                        setSelectedCourse(c.slug)
                        setSelectedModule(null)
                        setCourseDetail(null)
                      }}
                      className={cn(
                        "w-full p-5 rounded-xl border-2 text-left transition-all duration-200",
                        isSelected
                          ? `${colors.border} ${colors.bg}`
                          : "border-border bg-card hover:border-muted-foreground/50",
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", colors.bg)}>
                          <Icon className={cn("w-6 h-6", colors.text)} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{c.title}</h3>
                          <p className="text-sm text-muted-foreground">{c.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">{c.module_count} modules</p>
                        </div>
                        {isSelected && (
                          <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", colors.bg)}>
                            <Check className={cn("w-4 h-4", colors.text)} />
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Step 2: Choose Module */}
          {selectedCourse && (
            <div className="mb-10 animate-fade-in">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  2
                </span>
                Select a Module
              </h2>

              {isLoadingModules ? (
                <div className="grid gap-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="p-4 rounded-lg border-2 border-border bg-card">
                      <div className="flex items-center gap-4">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-2/3 mb-1" />
                          <Skeleton className="h-3 w-full" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : courseDetail ? (
                <div className="grid gap-3">
                  {courseDetail.modules.map((module, index) => {
                    const isSelected = selectedModule === module.slug
                    const selectedCourseData = courses.find((c) => c.slug === selectedCourse)
                    const colors = colorMap[selectedCourseData?.color || "gold"]

                    return (
                      <button
                        key={module.slug}
                        onClick={() => setSelectedModule(module.slug)}
                        className={cn(
                          "w-full p-4 rounded-lg border-2 text-left transition-all duration-200",
                          isSelected
                            ? `${colors.border} ${colors.bg}`
                            : "border-border bg-card hover:border-muted-foreground/50",
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground">{module.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">{module.objective}</p>
                          </div>
                          {isSelected && (
                            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", colors.bg)}>
                              <Check className={cn("w-4 h-4", colors.text)} />
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              ) : null}
            </div>
          )}

          {/* Continue Button */}
          {selectedCourse && selectedModule && (
            <div className="flex justify-center animate-fade-in">
              <Link href={getNextUrl()}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/30 hover:scale-105 transition-all duration-200 group"
                >
                  {isAuthenticated ? "Start Learning" : "Continue to Sign Up"}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
