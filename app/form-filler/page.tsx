"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  Zap,
  Globe,
  Smartphone,
  Plus,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  Settings,
  MapPin,
  User,
  FileText,
  Calendar,
} from "lucide-react"
import { useState } from "react"
import Navigation from "@/components/Navigation"

export default function FormFillerPage() {
  const [newFormDialogOpen, setNewFormDialogOpen] = useState(false)

  const savedForms = [
    {
      id: 1,
      name: "Lincoln High School Registration",
      url: "https://lincolnhigh.edu/registration",
      status: "completed",
      lastFilled: "2024-01-15",
      category: "Education",
      fieldsCount: 24,
    },
    {
      id: 2,
      name: "Math Olympiad Competition",
      url: "https://matholympiad.org/register",
      status: "draft",
      lastFilled: "2024-01-10",
      category: "Competition",
      fieldsCount: 18,
    },
    {
      id: 3,
      name: "Summer Camp Application",
      url: "https://summercamp.com/apply",
      status: "pending",
      lastFilled: "2024-01-08",
      category: "Recreation",
      fieldsCount: 32,
    },
  ]

  const fieldMappings = [
    { field: "First Name", mappedTo: "Personal Info - First Name", type: "text" },
    { field: "Last Name", mappedTo: "Personal Info - Last Name", type: "text" },
    { field: "Email", mappedTo: "Contact Info - Email", type: "email" },
    { field: "Phone", mappedTo: "Contact Info - Phone", type: "phone" },
    { field: "Address", mappedTo: "Personal Info - Address", type: "address" },
    { field: "Birth Certificate", mappedTo: "Documents - Birth Certificate", type: "file" },
    { field: "Transcript", mappedTo: "Documents - High School Transcript", type: "file" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Form Filler</h1>
            <p className="text-gray-600">Automatically fill out forms using your stored information</p>
          </div>

          <Dialog open={newFormDialogOpen} onOpenChange={setNewFormDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Form</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Form</DialogTitle>
                <DialogDescription>Enter the URL of the form you want to fill automatically</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="form-url">Form URL</Label>
                  <Input id="form-url" placeholder="https://example.com/form" type="url" />
                </div>

                <div>
                  <Label htmlFor="form-name">Form Name</Label>
                  <Input id="form-name" placeholder="Enter a name for this form" />
                </div>

                <div>
                  <Label htmlFor="form-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="competition">Competition</SelectItem>
                      <SelectItem value="recreation">Recreation</SelectItem>
                      <SelectItem value="employment">Employment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="form-description">Description (optional)</Label>
                  <Textarea id="form-description" placeholder="Add notes about this form..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewFormDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setNewFormDialogOpen(false)}>Add Form</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Fill Web Form</CardTitle>
                  <CardDescription>Fill out forms on any website</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Start Filling
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Smartphone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Mobile Form Fill</CardTitle>
                  <CardDescription>Use mobile WebView for forms</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-transparent" variant="outline">
                Open Mobile View
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Settings className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Field Mapping</CardTitle>
                  <CardDescription>Configure data mappings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-transparent" variant="outline">
                Manage Mappings
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Saved Forms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Saved Forms</CardTitle>
            <CardDescription>Forms you've configured for automatic filling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {savedForms.map((form) => (
                <div key={form.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {form.status === "completed" ? (
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      ) : form.status === "draft" ? (
                        <Clock className="h-8 w-8 text-yellow-500" />
                      ) : (
                        <AlertCircle className="h-8 w-8 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900">{form.name}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-sm text-gray-600 truncate">{form.url}</p>
                        <Badge variant="outline" className="text-xs">
                          {form.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{form.fieldsCount} fields mapped</span>
                        <span>Last filled: {form.lastFilled}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open
                    </Button>
                    <Button size="sm">
                      <Zap className="h-4 w-4 mr-2" />
                      Fill Form
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Field Mappings Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Field Mappings</CardTitle>
            <CardDescription>How your stored data maps to form fields</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fieldMappings.map((mapping, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {mapping.type === "file" ? (
                        <FileText className="h-5 w-5 text-blue-500" />
                      ) : mapping.type === "address" ? (
                        <MapPin className="h-5 w-5 text-green-500" />
                      ) : mapping.type === "email" ? (
                        <Calendar className="h-5 w-5 text-purple-500" />
                      ) : (
                        <User className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{mapping.field}</p>
                      <p className="text-xs text-gray-600">Maps to: {mapping.mappedTo}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {mapping.type}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <Button variant="outline" className="w-full bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Configure Field Mappings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
