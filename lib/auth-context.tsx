"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authApi, auth, type User } from "./api"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  register: (data: {
    username: string
    email: string
    password: string
    password_confirm: string
    first_name: string
    last_name: string
    role: string
    organization?: string
  }) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        // Try to fetch user info - this will work if token is set
        const userData = await authApi.me()
        setUser(userData)
      } catch {
        // Token might be invalid or expired
        auth.removeToken()
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [])

  const login = async (username: string, password: string) => {
    const response = await authApi.login(username, password)
    auth.setToken(response.token)
    setUser(response.user)
  }

  const register = async (data: {
    username: string
    email: string
    password: string
    password_confirm: string
    first_name: string
    last_name: string
    role: string
    organization?: string
  }) => {
    const response = await authApi.register(data)
    auth.setToken(response.token)
    setUser(response.user)
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch {
      // Ignore errors on logout
    }
    auth.removeToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
