"use client"

import { useEffect, useState } from "react"
import { progressApi } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import type { UserProgress } from "@/lib/api"

export function ProgressTracker({ courseSlug }: { courseSlug: string }) {
  const { isAuthenticated } = useAuth()
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) return

    const fetchProgress = async () => {
      try {
        const data = await progressApi.getCourseProgress(courseSlug)
        setProgress(data)
      } catch (error) {
        console.error("Failed to fetch progress:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProgress()
  }, [courseSlug, isAuthenticated])

  if (isLoading) {
    return <div className="text-muted-foreground">Loading progress...</div>
  }

  const completedCount = progress.filter((p) => p.completed).length
  const totalCount = progress.length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Course Progress</h3>
        <span className="text-sm text-muted-foreground">
          {completedCount} of {totalCount} modules completed
        </span>
      </div>

      <div className="w-full bg-secondary rounded-full h-2">
        <div
          className="bg-linear-to-r from-amber-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
        />
      </div>

      <div className="space-y-2">
        {progress.map((p) => (
          <div key={p.id} className="flex items-center gap-2 text-sm">
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center ${
                p.completed ? "bg-emerald-500" : "bg-secondary"
              }`}
            >
              {p.completed && <span className="text-white text-xs">✓</span>}
            </div>
            <span className={p.completed ? "text-muted-foreground line-through" : ""}>{p.module_slug}</span>
            {p.completed_at && (
              <span className="text-xs text-muted-foreground">
                {new Date(p.completed_at).toLocaleDateString()}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
