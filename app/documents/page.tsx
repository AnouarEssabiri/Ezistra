"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Shield,
  FileText,
  Upload,
  Search,
  Filter,
  MoreHorizontal,
  Grid,
  List,
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  FileImage,
  File,
} from "lucide-react"
import { useState } from "react"
import Navigation from "@/components/Navigation"

export default function DocumentsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  const documents = [
    {
      id: 1,
      name: "Birth Certificate",
      type: "PDF",
      category: "Identity",
      uploadDate: "2024-01-15",
      size: "2.4 MB",
      tags: ["official", "identity"],
      thumbnail: "/document-stack.png",
    },
    {
      id: 2,
      name: "High School Transcript",
      type: "PDF",
      category: "Education",
      uploadDate: "2024-01-10",
      size: "1.8 MB",
      tags: ["academic", "grades", "transcript"],
      thumbnail: "/transcript.png",
    },
    {
      id: 3,
      name: "Vaccination Record",
      type: "PDF",
      category: "Medical",
      uploadDate: "2024-01-08",
      size: "956 KB",
      tags: ["medical", "health", "vaccination"],
      thumbnail: "/medical-team-collaboration.png",
    },
    {
      id: 4,
      name: "Passport Photo",
      type: "JPG",
      category: "Identity",
      uploadDate: "2024-01-05",
      size: "245 KB",
      tags: ["photo", "identity", "passport"],
      thumbnail: "/passport-photo.png",
    },
    {
      id: 5,
      name: "Social Security Card",
      type: "PDF",
      category: "Identity",
      uploadDate: "2024-01-03",
      size: "1.2 MB",
      tags: ["official", "identity", "ssn"],
      thumbnail: "/social-security-concept.png",
    },
    {
      id: 6,
      name: "Insurance Card",
      type: "PDF",
      category: "Medical",
      uploadDate: "2024-01-01",
      size: "678 KB",
      tags: ["medical", "insurance"],
      thumbnail: "/generic-insurance-card.png",
    },
  ]

  const categories = ["All", "Identity", "Education", "Medical", "Financial", "Other"]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Documents</h1>
            <p className="text-gray-600">Manage your personal documents and files</p>
          </div>

          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Upload Document</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
                <DialogDescription>Add a new document to your secure storage</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">Drag and drop your file here, or click to browse</p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">Supports PDF, JPG, PNG up to 10MB</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="document-name">Document Name</Label>
                    <Input id="document-name" placeholder="Enter document name" />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="identity">Identity</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="financial">Financial</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags (optional)</Label>
                    <Input id="tags" placeholder="Enter tags separated by commas" />
                  </div>

                  <div>
                    <Label htmlFor="description">Description (optional)</Label>
                    <Textarea id="description" placeholder="Add a description..." />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setUploadDialogOpen(false)}>Upload Document</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search documents..." className="pl-10 w-64" />
                </div>

                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {documents.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    {doc.type === "JPG" ? (
                      <FileImage className="h-12 w-12 text-gray-400" />
                    ) : (
                      <File className="h-12 w-12 text-red-500" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-sm truncate flex-1">{doc.name}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{doc.type}</span>
                      <span>{doc.size}</span>
                    </div>

                    <Badge variant="outline" className="text-xs">
                      {doc.category}
                    </Badge>

                    <div className="flex flex-wrap gap-1">
                      {doc.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {doc.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{doc.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {doc.uploadDate}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Name</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
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
                            {doc.type === "JPG" ? (
                              <FileImage className="h-5 w-5 text-blue-500" />
                            ) : (
                              <FileText className="h-5 w-5 text-red-500" />
                            )}
                            <span className="font-medium">{doc.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{doc.type}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{doc.category}</Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{doc.uploadDate}</td>
                        <td className="py-3 px-4 text-gray-600">{doc.size}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-1">
                            {doc.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {doc.tags.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{doc.tags.length - 2}
                              </Badge>
                            )}
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
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
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
        )}
      </div>
    </div>
  )
}
