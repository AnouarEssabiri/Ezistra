"use client"

import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/documents", label: "Documents" },
    { href: "/form-filler", label: "Form Filler" },
    { href: "/profile-settings", label: "Profile Settings" },
  ]

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">FormGuard</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6 ml-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={
                      pathname === item.href
                        ? "text-blue-600 bg-blue-50"
                        : ""
                    }
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              U
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
