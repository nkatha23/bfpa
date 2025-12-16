"use client"

export interface CourseProgress {
  completedModules: string[]
  currentModule: string | null
  startedAt: string
  lastAccessedAt: string
}

const PROGRESS_KEY_PREFIX = "bfpa_progress_"

export function getProgress(courseId: string): CourseProgress | null {
  if (typeof window === "undefined") return null

  const stored = localStorage.getItem(`${PROGRESS_KEY_PREFIX}${courseId}`)
  if (!stored) return null

  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

export function initProgress(courseId: string): CourseProgress {
  const progress: CourseProgress = {
    completedModules: [],
    currentModule: null,
    startedAt: new Date().toISOString(),
    lastAccessedAt: new Date().toISOString(),
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(`${PROGRESS_KEY_PREFIX}${courseId}`, JSON.stringify(progress))
  }

  return progress
}

export function markModuleComplete(courseId: string, moduleId: string): CourseProgress {
  const progress = getProgress(courseId) || initProgress(courseId)

  if (!progress.completedModules.includes(moduleId)) {
    progress.completedModules.push(moduleId)
  }
  progress.lastAccessedAt = new Date().toISOString()

  if (typeof window !== "undefined") {
    localStorage.setItem(`${PROGRESS_KEY_PREFIX}${courseId}`, JSON.stringify(progress))
  }

  return progress
}

export function setCurrentModule(courseId: string, moduleId: string): CourseProgress {
  const progress = getProgress(courseId) || initProgress(courseId)

  progress.currentModule = moduleId
  progress.lastAccessedAt = new Date().toISOString()

  if (typeof window !== "undefined") {
    localStorage.setItem(`${PROGRESS_KEY_PREFIX}${courseId}`, JSON.stringify(progress))
  }

  return progress
}

export function isModuleUnlocked(
  courseId: string,
  moduleId: string,
  moduleIndex: number,
  modules: { id: string }[],
): boolean {
  if (moduleIndex === 0) return true

  const progress = getProgress(courseId)
  if (!progress) return moduleIndex === 0

  // Get the previous module ID - we need to check if it's completed
  const previousModule = modules[moduleIndex - 1]
  return progress.completedModules.includes(previousModule.id)
}

export function isModuleCompleted(courseId: string, moduleId: string): boolean {
  const progress = getProgress(courseId)
  if (!progress) return false
  return progress.completedModules.includes(moduleId)
}

export function getCourseCompletionPercentage(courseId: string, totalModules: number): number {
  const progress = getProgress(courseId)
  if (!progress) return 0
  return Math.round((progress.completedModules.length / totalModules) * 100)
}
