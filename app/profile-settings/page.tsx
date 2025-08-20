"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Shield,
  Bell,
  Eye,
  FileText,
  Settings,
  Save,
  X,
  AlertTriangle,
} from "lucide-react"

// Import section components
import PersonalInfoSection from "./components/PersonalInfoSection"
import SecuritySection from "./components/SecuritySection"
import NotificationSection from "./components/NotificationSection"
import PrivacySection from "./components/PrivacySection"
import DocumentSection from "./components/DocumentSection"
import FormFillingSection from "./components/FormFillingSection"
import AccountSection from "./components/AccountSection"
import Navigation from "@/components/Navigation"

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState("personal-info")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const tabs = [
    {
      id: "personal-info",
      label: "Personal Info",
      icon: User,
      description: "Manage your personal information",
    },
    {
      id: "security",
      label: "Security",
      icon: Shield,
      description: "Password, 2FA, and session management",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      description: "Email and push notification preferences",
    },
    {
      id: "privacy",
      label: "Privacy",
      icon: Eye,
      description: "Profile visibility and data sharing",
    },
    {
      id: "documents",
      label: "Documents",
      icon: FileText,
      description: "Document processing and storage settings",
    },
    {
      id: "form-filling",
      label: "Form Filling",
      icon: Settings,
      description: "Automation and template preferences",
    },
    {
      id: "account",
      label: "Account",
      icon: Settings,
      description: "Billing and subscription management",
    },
  ]

  const handleTabChange = (tabId: string) => {
    if (hasUnsavedChanges) {
      // Show confirmation dialog
      if (confirm("You have unsaved changes. Are you sure you want to switch tabs?")) {
        setActiveTab(tabId)
        setHasUnsavedChanges(false)
      }
    } else {
      setActiveTab(tabId)
    }
  }

  const handleSaveChanges = () => {
    // Simulate saving changes
    setHasUnsavedChanges(false)
    // Add your save logic here
  }

  const handleDiscardChanges = () => {
    setHasUnsavedChanges(false)
    // Add your discard logic here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account settings, security preferences, and personal information.
          </p>
        </div>

        {/* Unsaved Changes Alert */}
        {hasUnsavedChanges && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="text-yellow-800 font-medium">
                  You have unsaved changes
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDiscardChanges}
                >
                  <X className="h-4 w-4 mr-2" />
                  Discard
                </Button>
                <Button size="sm" onClick={handleSaveChanges}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Settings</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`w-full text-left px-4 py-3 text-sm font-medium rounded-none transition-colors ${
                          activeTab === tab.id
                            ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5" />
                          <div className="flex-1">
                            <div className="font-medium">{tab.label}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {tab.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </CardTitle>
                <CardDescription>
                  {tabs.find(tab => tab.id === activeTab)?.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Render the appropriate section based on activeTab */}
                {activeTab === "personal-info" && <PersonalInfoSection />}
                {activeTab === "security" && <SecuritySection />}
                {activeTab === "notifications" && <NotificationSection />}
                {activeTab === "privacy" && <PrivacySection />}
                {activeTab === "documents" && <DocumentSection />}
                {activeTab === "form-filling" && <FormFillingSection />}
                {activeTab === "account" && <AccountSection />}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
