"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  FileText,
  Upload,
  Zap,
  Bell,
  Settings,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
  const recentActivities = [
    {
      id: 1,
      type: "form_filled",
      title: "School Registration Form",
      description: "Automatically filled registration for Lincoln High School",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      type: "document_uploaded",
      title: "Birth Certificate",
      description: "New document uploaded and categorized",
      time: "1 day ago",
      status: "completed",
    },
    {
      id: 3,
      type: "reminder",
      title: "Competition Deadline",
      description: "Math Olympiad registration closes in 3 days",
      time: "2 days ago",
      status: "pending",
    },
  ]

  const documents = [
    {
      id: 1,
      name: "Birth Certificate",
      type: "PDF",
      category: "Identity",
      uploadDate: "2024-01-15",
      size: "2.4 MB",
      tags: ["official", "identity"],
    },
    {
      id: 2,
      name: "Transcript",
      type: "PDF",
      category: "Education",
      uploadDate: "2024-01-10",
      size: "1.8 MB",
      tags: ["academic", "grades"],
    },
    {
      id: 3,
      name: "Vaccination Record",
      type: "PDF",
      category: "Medical",
      uploadDate: "2024-01-08",
      size: "956 KB",
      tags: ["medical", "health"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">FormGuard</span>
              </div>
              <nav className="hidden md:flex items-center space-x-6 ml-8">
                <Button variant="ghost" className="text-blue-600 bg-blue-50">
                  Dashboard
                </Button>
                <Button variant="ghost">Documents</Button>
                <Button variant="ghost">Form Filler</Button>
                <Button variant="ghost">Profile Settings</Button>
                <Button variant="ghost">Settings</Button>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
          <p className="text-gray-600">Here's what's happening with your documents and forms.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Forms Filled</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
              <Upload className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4 GB</div>
              <Progress value={48} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">48% of 5 GB</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Reminders</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 due this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest document uploads and form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg border">
                      <div className="flex-shrink-0">
                        {activity.status === "completed" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <div className="flex items-center mt-2 space-x-2">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Zap className="h-4 w-4 mr-2" />
                  Fill New Form
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Set Reminder
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Search Documents
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Reminders */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Upcoming Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Math Competition</p>
                      <p className="text-xs text-gray-600">Due in 3 days</p>
                    </div>
                    <Badge variant="secondary">Urgent</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">School Registration</p>
                      <p className="text-xs text-gray-600">Due in 1 week</p>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Documents */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Documents</CardTitle>
                <CardDescription>Your recently uploaded and accessed documents</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search documents..." className="pl-10 w-64" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Name</th>
                    <th className="text-left py-3 px-4 font-medium">Category</th>
                    <th className="text-left py-3 px-4 font-medium">Upload Date</th>
                    <th className="text-left py-3 px-4 font-medium">Size</th>
                    <th className="text-left py-3 px-4 font-medium">Tags</th>
                    <th className="text-left py-3 px-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-red-500" />
                          <span className="font-medium">{doc.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{doc.category}</Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{doc.uploadDate}</td>
                      <td className="py-3 px-4 text-gray-600">{doc.size}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-1">
                          {doc.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View</DropdownMenuItem>
                            <DropdownMenuItem>Download</DropdownMenuItem>
                            <DropdownMenuItem>Edit Tags</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
