"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
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
  Save,
  Edit,
  Eye,
  EyeOff,
  Upload,
  Trash2,
} from "lucide-react"
import { useState } from "react"
import Navigation from "@/components/Navigation"

export default function FormFillerPage() {
  const [newFormDialogOpen, setNewFormDialogOpen] = useState(false)
  const [personalInfoDialogOpen, setPersonalInfoDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [personalInfo, setPersonalInfo] = useState({
    // Basic Information
    firstName: "John",
    lastName: "Doe",
    middleName: "Michael",
    dateOfBirth: "1990-05-15",
    gender: "male",
    maritalStatus: "single",
    
    // Contact Information
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    alternatePhone: "+1 (555) 987-6543",
    
    // Address Information
    address: {
      street: "123 Main Street",
      apartment: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States"
    },
    
    // Government IDs
    ssn: "123-45-6789",
    driverLicense: "DL123456789",
    passportNumber: "P123456789",
    
    // Emergency Contact
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Sister",
      phone: "+1 (555) 111-2222",
      email: "jane.doe@email.com"
    },
    
    // Employment Information
    employer: "Tech Solutions Inc.",
    jobTitle: "Software Engineer",
    workPhone: "+1 (555) 333-4444",
    workEmail: "john.doe@techsolutions.com",
    
    // Education
    education: {
      highestDegree: "Bachelor's",
      fieldOfStudy: "Computer Science",
      institution: "University of Technology",
      graduationYear: "2012",
      gpa: "3.8"
    },
    
    // Medical Information
    bloodType: "O+",
    allergies: "Peanuts, Shellfish",
    medications: "None",
    conditions: "None"
  })

  const [editedInfo, setEditedInfo] = useState(personalInfo)

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

  const handleInputChange = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      if (parent === "address" && child) {
        setEditedInfo(prev => ({
          ...prev,
          address: {
            ...prev.address,
            [child]: value,
          },
        }))
      } else if (parent === "emergencyContact" && child) {
        setEditedInfo(prev => ({
          ...prev,
          emergencyContact: {
            ...prev.emergencyContact,
            [child]: value,
          },
        }))
      } else if (parent === "education" && child) {
        setEditedInfo(prev => ({
          ...prev,
          education: {
            ...prev.education,
            [child]: value,
          },
        }))
      }
    } else {
      setEditedInfo(prev => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handleSave = () => {
    setPersonalInfo(editedInfo)
    setIsEditing(false)
    setPersonalInfoDialogOpen(false)
  }

  const handleCancel = () => {
    setEditedInfo(personalInfo)
    setIsEditing(false)
  }

  const getProfileCompletion = () => {
    const totalFields = Object.keys(personalInfo).length + 
                       Object.keys(personalInfo.address).length + 
                       Object.keys(personalInfo.emergencyContact).length + 
                       Object.keys(personalInfo.education).length
    const filledFields = Object.values(personalInfo).filter(value => 
      value !== "" && value !== null && value !== undefined
    ).length + 
    Object.values(personalInfo.address).filter(value => 
      value !== "" && value !== null && value !== undefined
    ).length +
    Object.values(personalInfo.emergencyContact).filter(value => 
      value !== "" && value !== null && value !== undefined
    ).length +
    Object.values(personalInfo.education).filter(value => 
      value !== "" && value !== null && value !== undefined
    ).length
    
    return Math.round((filledFields / totalFields) * 100)
  }

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

          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setPersonalInfoDialogOpen(true)}
              className="flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>Personal Info</span>
              <Badge variant="secondary" className="ml-2">
                {getProfileCompletion()}% Complete
              </Badge>
            </Button>

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
        </div>

        {/* Personal Information Dialog */}
        <Dialog open={personalInfoDialogOpen} onOpenChange={setPersonalInfoDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-2xl">Personal Information</DialogTitle>
                  <DialogDescription>Manage all your personal information for automatic form filling</DialogDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} className="flex items-center space-x-2">
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave} className="flex items-center space-x-2">
                        <Save className="h-4 w-4" />
                        <span>Save</span>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={isEditing ? editedInfo.firstName : personalInfo.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={isEditing ? editedInfo.lastName : personalInfo.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="middleName">Middle Name</Label>
                    <Input
                      id="middleName"
                      value={isEditing ? editedInfo.middleName : personalInfo.middleName}
                      onChange={(e) => handleInputChange("middleName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={isEditing ? editedInfo.dateOfBirth : personalInfo.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select 
                      value={isEditing ? editedInfo.gender : personalInfo.gender}
                      onValueChange={(value) => handleInputChange("gender", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select 
                      value={isEditing ? editedInfo.maritalStatus : personalInfo.maritalStatus}
                      onValueChange={(value) => handleInputChange("maritalStatus", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={isEditing ? editedInfo.email : personalInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={isEditing ? editedInfo.phone : personalInfo.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="alternatePhone">Alternate Phone</Label>
                    <Input
                      id="alternatePhone"
                      value={isEditing ? editedInfo.alternatePhone : personalInfo.alternatePhone}
                      onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Address Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Address Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="street">Street Address *</Label>
                    <Input
                      id="street"
                      value={isEditing ? editedInfo.address.street : personalInfo.address.street}
                      onChange={(e) => handleInputChange("address.street", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="apartment">Apartment/Suite</Label>
                    <Input
                      id="apartment"
                      value={isEditing ? editedInfo.address.apartment : personalInfo.address.apartment}
                      onChange={(e) => handleInputChange("address.apartment", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={isEditing ? editedInfo.address.city : personalInfo.address.city}
                      onChange={(e) => handleInputChange("address.city", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province *</Label>
                    <Input
                      id="state"
                      value={isEditing ? editedInfo.address.state : personalInfo.address.state}
                      onChange={(e) => handleInputChange("address.state", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                    <Input
                      id="zipCode"
                      value={isEditing ? editedInfo.address.zipCode : personalInfo.address.zipCode}
                      onChange={(e) => handleInputChange("address.zipCode", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      value={isEditing ? editedInfo.address.country : personalInfo.address.country}
                      onChange={(e) => handleInputChange("address.country", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Government IDs */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Government IDs</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ssn">Social Security Number</Label>
                    <div className="relative">
                      <Input
                        id="ssn"
                        type={showPassword ? "text" : "password"}
                        value={isEditing ? editedInfo.ssn : personalInfo.ssn}
                        onChange={(e) => handleInputChange("ssn", e.target.value)}
                        disabled={!isEditing}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="driverLicense">Driver's License</Label>
                    <Input
                      id="driverLicense"
                      value={isEditing ? editedInfo.driverLicense : personalInfo.driverLicense}
                      onChange={(e) => handleInputChange("driverLicense", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="passportNumber">Passport Number</Label>
                    <Input
                      id="passportNumber"
                      value={isEditing ? editedInfo.passportNumber : personalInfo.passportNumber}
                      onChange={(e) => handleInputChange("passportNumber", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyName">Emergency Contact Name *</Label>
                    <Input
                      id="emergencyName"
                      value={isEditing ? editedInfo.emergencyContact.name : personalInfo.emergencyContact.name}
                      onChange={(e) => handleInputChange("emergencyContact.name", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyRelationship">Relationship *</Label>
                    <Input
                      id="emergencyRelationship"
                      value={isEditing ? editedInfo.emergencyContact.relationship : personalInfo.emergencyContact.relationship}
                      onChange={(e) => handleInputChange("emergencyContact.relationship", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                    <Input
                      id="emergencyPhone"
                      value={isEditing ? editedInfo.emergencyContact.phone : personalInfo.emergencyContact.phone}
                      onChange={(e) => handleInputChange("emergencyContact.phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyEmail">Emergency Contact Email</Label>
                    <Input
                      id="emergencyEmail"
                      type="email"
                      value={isEditing ? editedInfo.emergencyContact.email : personalInfo.emergencyContact.email}
                      onChange={(e) => handleInputChange("emergencyContact.email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Employment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Employment Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employer">Employer</Label>
                    <Input
                      id="employer"
                      value={isEditing ? editedInfo.employer : personalInfo.employer}
                      onChange={(e) => handleInputChange("employer", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={isEditing ? editedInfo.jobTitle : personalInfo.jobTitle}
                      onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="workPhone">Work Phone</Label>
                    <Input
                      id="workPhone"
                      value={isEditing ? editedInfo.workPhone : personalInfo.workPhone}
                      onChange={(e) => handleInputChange("workPhone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="workEmail">Work Email</Label>
                    <Input
                      id="workEmail"
                      type="email"
                      value={isEditing ? editedInfo.workEmail : personalInfo.workEmail}
                      onChange={(e) => handleInputChange("workEmail", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Education</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="highestDegree">Highest Degree</Label>
                    <Select 
                      value={isEditing ? editedInfo.education.highestDegree : personalInfo.education.highestDegree}
                      onValueChange={(value) => handleInputChange("education.highestDegree", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="associate">Associate's</SelectItem>
                        <SelectItem value="bachelor">Bachelor's</SelectItem>
                        <SelectItem value="master">Master's</SelectItem>
                        <SelectItem value="doctorate">Doctorate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fieldOfStudy">Field of Study</Label>
                    <Input
                      id="fieldOfStudy"
                      value={isEditing ? editedInfo.education.fieldOfStudy : personalInfo.education.fieldOfStudy}
                      onChange={(e) => handleInputChange("education.fieldOfStudy", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="institution">Institution</Label>
                    <Input
                      id="institution"
                      value={isEditing ? editedInfo.education.institution : personalInfo.education.institution}
                      onChange={(e) => handleInputChange("education.institution", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input
                      id="graduationYear"
                      type="number"
                      min="1950"
                      max="2030"
                      value={isEditing ? editedInfo.education.graduationYear : personalInfo.education.graduationYear}
                      onChange={(e) => handleInputChange("education.graduationYear", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gpa">GPA</Label>
                    <Input
                      id="gpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="4.0"
                      value={isEditing ? editedInfo.education.gpa : personalInfo.education.gpa}
                      onChange={(e) => handleInputChange("education.gpa", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Medical Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Medical Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Select 
                      value={isEditing ? editedInfo.bloodType : personalInfo.bloodType}
                      onValueChange={(value) => handleInputChange("bloodType", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="allergies">Allergies</Label>
                    <Input
                      id="allergies"
                      value={isEditing ? editedInfo.allergies : personalInfo.allergies}
                      onChange={(e) => handleInputChange("allergies", e.target.value)}
                      disabled={!isEditing}
                      placeholder="e.g., Peanuts, Shellfish"
                    />
                  </div>
                  <div>
                    <Label htmlFor="medications">Current Medications</Label>
                    <Input
                      id="medications"
                      value={isEditing ? editedInfo.medications : personalInfo.medications}
                      onChange={(e) => handleInputChange("medications", e.target.value)}
                      disabled={!isEditing}
                      placeholder="e.g., None"
                    />
                  </div>
                  <div>
                    <Label htmlFor="conditions">Medical Conditions</Label>
                    <Input
                      id="conditions"
                      value={isEditing ? editedInfo.conditions : personalInfo.conditions}
                      onChange={(e) => handleInputChange("conditions", e.target.value)}
                      disabled={!isEditing}
                      placeholder="e.g., None"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>

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
