"use client"

import { useAuth } from "@/components/AuthContext"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState, ReactNode } from "react"
import PageLoading from "@/components/PageLoading"

interface ProtectedRouteProps {
  children: ReactNode
}

// Routes that require authentication
const PROTECTED_ROUTES = [
  "/dashboard",
  "/documents",
  "/form-filler",
  "/document-processor",
  "/activities",
  "/profile-settings",
  "/mobile",
]

// Routes that are public
const PUBLIC_ROUTES = ["/", "/login", "/signup"]

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if current route is protected
    const isProtectedRoute = PROTECTED_ROUTES.some((route) => 
      pathname === route || pathname.startsWith(route + "/")
    )

    // If route is protected and user is not authenticated, redirect to login
    if (isProtectedRoute && !isAuthenticated) {
      router.push("/login")
      return
    }

    setIsLoading(false)
  }, [isAuthenticated, pathname, router])

  // Show loading while checking authentication
  if (isLoading) {
    return <PageLoading />
  }

  return <>{children}</>
}
