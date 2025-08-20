"use client"

import { Button } from "@/components/ui/button"
import { Shield, Loader2 } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)
  const [navigatingTo, setNavigatingTo] = useState("")

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/documents", label: "Documents" },
    { href: "/form-filler", label: "Form Filler" },
    { href: "/profile-settings", label: "Profile Settings" },
  ]

  const handleNavigation = (href: string, label: string) => {
    if (href === pathname) return
    
    setIsNavigating(true)
    setNavigatingTo(label)
    
    // Simulate navigation delay for better UX
    setTimeout(() => {
      router.push(href)
    }, 300)
  }

  return (
    <>
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">FormGuard</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 ml-8">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  onClick={() => handleNavigation(item.href, item.label)}
                  disabled={isNavigating}
                  className={
                    pathname === item.href
                      ? "text-blue-600 bg-blue-50"
                      : ""
                  }
                >
                  {isNavigating && navigatingTo === item.label ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              U
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="flex items-center space-x-3">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Navigating to {navigatingTo}</p>
                <p className="text-sm text-gray-600">Please wait...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
