"use client"

import { Loader2, Shield } from "lucide-react"

export default function PageLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">FormGuard</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    </div>
  )
}
