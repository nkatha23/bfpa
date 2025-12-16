"use client"

import { useEffect, useState } from "react"
import { CourseCard } from "./course-card"
import { courseApi, type CourseListItem } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

export function CoursesSection() {
  const [courses, setCourses] = useState<CourseListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseApi.list()
        setCourses(data)
      } catch (error) {
        console.error("Failed to fetch courses:", error)
        // Fallback to empty array on error
        setCourses([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchCourses()
  }, [])

  return (
    <section id="courses" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Featured <span className="text-primary">Courses</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Industry-specific learning tracks designed for African professionals ready to embrace the Bitcoin economy.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="bg-card border border-border rounded-xl p-6 h-[280px]">
                  <Skeleton className="w-14 h-14 rounded-xl mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex justify-between mt-auto">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </div>
            ))
          ) : courses.length > 0 ? (
            courses.map((course, index) => (
              <div key={course.slug} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CourseCard course={course} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground py-12">
              <p>No courses available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
