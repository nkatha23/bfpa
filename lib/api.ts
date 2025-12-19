// API client for BFPA Backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"

// Types
export interface ContentPoint {
  id: number
  text: string
  order: number
}

export interface ContentExample {
  id: number
  text: string
  order: number
}

export interface ContentSection {
  id: number
  title: string
  description: string | null
  order: number
  points: ContentPoint[]
  examples: ContentExample[]
}

export interface ReflectionQuestion {
  id: number
  question: string
  order: number
}

export interface ModuleListItem {
  id: number
  slug: string
  title: string
  objective: string
  order: number
  capstone_task: string | null
}

export interface ModuleDetail extends ModuleListItem {
  content_sections: ContentSection[]
  reflection_questions: ReflectionQuestion[]
}

export interface CourseListItem {
  id: number
  slug: string
  title: string
  description: string
  icon: string
  color: "gold" | "emerald" | "secondary"
  module_count: number
}

export interface CourseDetail extends Omit<CourseListItem, "module_count"> {
  modules: ModuleListItem[]
}

export interface UserProfile {
  role: string
  organization: string
  country: string
  phone: string
  bio: string
}

export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  profile: UserProfile | null
}

export interface UserProgress {
  id: number
  module_slug: string
  course_slug: string
  completed: boolean
  completed_at: string | null
  reflection_answers: Record<string, string>
}

export interface AuthResponse {
  user: User
  token: string
}

// Helper function for API calls
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (token) {
    ;(headers as Record<string, string>)["Authorization"] = `Token ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "An error occurred" }))
    throw new Error(error.detail || error.error || "Request failed")
  }

  return response.json()
}

// Course API
export const courseApi = {
  // Get all courses
  list: () => apiFetch<CourseListItem[]>("/courses/"),

  // Get course detail with modules
  get: (slug: string) => apiFetch<CourseDetail>(`/courses/${slug}/`),

  // Get module detail with content
  getModule: (courseSlug: string, moduleSlug: string) =>
    apiFetch<ModuleDetail>(`/courses/${courseSlug}/modules/${moduleSlug}/`),
}

// Auth API
export const authApi = {
  // Register new user
  register: (data: {
    username: string
    email: string
    password: string
    password_confirm: string
    first_name: string
    last_name: string
    role: string
    organization?: string
  }) =>
    apiFetch<AuthResponse>("/auth/register/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Login
  login: (username: string, password: string) =>
    apiFetch<AuthResponse>("/auth/login/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  // Logout
  logout: () =>
    apiFetch<{ message: string }>("/auth/logout/", {
      method: "POST",
    }),

  // Get current user
  me: () => apiFetch<User>("/auth/me/"),
}

// Progress API
export const progressApi = {
  // Get all user progress
  list: () => apiFetch<UserProgress[]>("/progress/"),

  // Get progress for a specific course
  getCourseProgress: (courseSlug: string) =>
    apiFetch<UserProgress[]>(`/progress/course_progress/?course=${courseSlug}`),

  // Complete a module
  completeModule: (courseSlug: string, moduleSlug: string, reflectionAnswers: Record<string, string> = {}) =>
    apiFetch<UserProgress>("/progress/complete_module/", {
      method: "POST",
      body: JSON.stringify({
        course_slug: courseSlug,
        module_slug: moduleSlug,
        reflection_answers: reflectionAnswers,
      }),
    }),

  // Check if module is unlocked
  isModuleUnlocked: (courseSlug: string, moduleSlug: string) =>
    apiFetch<{ unlocked: boolean }>(`/progress/is_module_unlocked/?course=${courseSlug}&module=${moduleSlug}`),
}

// Auth helpers
export const auth = {
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token)
    }
  },

  getToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token")
    }
    return null
  },

  removeToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
    }
  },

  isAuthenticated: () => {
    return !!auth.getToken()
  },
}
