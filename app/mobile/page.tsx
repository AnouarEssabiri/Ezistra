"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Shield,
  Menu,
  Bell,
  Search,
  Upload,
  Zap,
  FileText,
  Settings,
  Home,
  User,
  Plus,
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  Clock,
} from "lucide-react"
import { useState } from "react"

export default function MobilePage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showWebView, setShowWebView] = useState(false)

  const quickActions = [
    { icon: Upload, label: "Upload", color: "bg-blue-500" },
    { icon: Zap, label: "Fill Form", color: "bg-green-500" },
    { icon: Search, label: "Search", color: "bg-purple-500" },
    { icon: Settings, label: "Settings", color: "bg-gray-500" },
  ]

  const recentDocuments = [
    { name: "Birth Certificate", type: "PDF", size: "2.4 MB" },
    { name: "Transcript", type: "PDF", size: "1.8 MB" },
    { name: "Vaccination Record", type: "PDF", size: "956 KB" },
  ]

  const savedForms = [
    { name: "School Registration", status: "completed", url: "lincolnhigh.edu" },
    { name: "Math Competition", status: "draft", url: "matholympiad.org" },
    { name: "Summer Camp", status: "pending", url: "summercamp.com" },
  ]

  if (showWebView) {
    return (
      <div className="min-h-screen bg-white">
        {/* Mobile WebView Header */}
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-blue-700"
            onClick={() => setShowWebView(false)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 mx-4">
            <p className="text-sm font-medium">Form Filler Active</p>
            <p className="text-xs opacity-90">lincolnhigh.edu/registration</p>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700">
            <ExternalLink className="h-5 w-5" />
          </Button>
        </div>

        {/* WebView Simulation */}
        <div className="p-4 bg-gray-50 min-h-screen">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Student Registration Form</CardTitle>
              <CardDescription>Lincoln High School - Fall 2024</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name *</label>
                <Input value="John" className="bg-green-50 border-green-200" readOnly />
                <p className="text-xs text-green-600">✓ Auto-filled from your profile</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name *</label>
                <Input value="Doe" className="bg-green-50 border-green-200" readOnly />
                <p className="text-xs text-green-600">✓ Auto-filled from your profile</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address *</label>
                <Input value="john.doe@email.com" className="bg-green-50 border-green-200" readOnly />
                <p className="text-xs text-green-600">✓ Auto-filled from your profile</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Birth Certificate</label>
                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-green-600" />
                    <span className="text-sm">birth_certificate.pdf</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">✓ Auto-uploaded from your documents</p>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full">Submit Registration</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6">
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
            <Zap className="h-6 w-6" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">Ezistra</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs px-2 py-1 h-8"
              onClick={() => window.location.href = "/"}
            >
              Desktop
            </Button>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">JD</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pb-20">
        {activeTab === "dashboard" && (
          <div className="p-4 space-y-6">
            {/* Welcome Card */}
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-1">Welcome back, John!</h2>
                <p className="text-blue-100 text-sm">You have 3 pending forms to fill</p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-4 gap-3">
                {quickActions.map((action, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2`}
                    >
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xs text-gray-600">{action.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <div className="text-sm text-gray-600">Documents</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-sm text-gray-600">Forms Filled</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Documents */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Recent Documents</h3>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-2">
                {recentDocuments.map((doc, index) => (
                  <Card key={index}>
                    <CardContent className="p-3 flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-red-500" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-gray-500">
                          {doc.type} • {doc.size}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "forms" && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Forms</h2>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                New
              </Button>
            </div>

            <div className="space-y-3">
              {savedForms.map((form, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{form.name}</h3>
                      {form.status === "completed" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{form.url}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        Edit
                      </Button>
                      <Button size="sm" className="flex-1" onClick={() => setShowWebView(true)}>
                        Fill Form
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Documents</h2>
              <Button size="sm">
                <Upload className="h-4 w-4 mr-1" />
                Upload
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search documents..." className="pl-10" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {recentDocuments.map((doc, index) => (
                <Card key={index}>
                  <CardContent className="p-3 text-center">
                    <FileText className="h-12 w-12 text-red-500 mx-auto mb-2" />
                    <p className="font-medium text-sm truncate">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.size}</p>
                    <Badge variant="outline" className="text-xs mt-2">
                      {doc.type}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="p-4 space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-medium">JD</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
              <p className="text-gray-600">john.doe@email.com</p>
            </div>

            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium">Account Settings</span>
                  <Settings className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium">Security</span>
                  <Shield className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium">Notifications</span>
                  <Bell className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">Storage Used</p>
                  <div className="text-2xl font-bold text-blue-600 mb-2">2.4 GB</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "48%" }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">48% of 5 GB used</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="grid grid-cols-4">
          {[
            { id: "dashboard", icon: Home, label: "Dashboard" },
            { id: "forms", icon: Zap, label: "Forms" },
            { id: "documents", icon: FileText, label: "Documents" },
            { id: "profile", icon: User, label: "Profile" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-3 text-center ${activeTab === tab.id ? "text-blue-600 bg-blue-50" : "text-gray-600"}`}
            >
              <tab.icon className="h-5 w-5 mx-auto mb-1" />
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
