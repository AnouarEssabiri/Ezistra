"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Camera, Edit3, Save, X, User } from "lucide-react"

interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

export default function PersonalInfoSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
  })

  const [editedInfo, setEditedInfo] = useState<PersonalInfo>(personalInfo)

  const handleEdit = () => {
    setEditedInfo(personalInfo)
    setIsEditing(true)
  }

  const handleSave = () => {
    setPersonalInfo(editedInfo)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedInfo(personalInfo)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setEditedInfo(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent] as any),
          [child]: value,
        },
      }))
    } else {
      setEditedInfo(prev => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const getInitials = () => {
    return `${personalInfo.firstName.charAt(0)}${personalInfo.lastName.charAt(0)}`
  }

  const getProfileCompletion = () => {
    const fields = [
      personalInfo.firstName,
      personalInfo.lastName,
      personalInfo.email,
      personalInfo.phone,
      personalInfo.dateOfBirth,
      personalInfo.address.street,
      personalInfo.address.city,
      personalInfo.address.state,
      personalInfo.address.zipCode,
      personalInfo.address.country,
    ]
    const filledFields = fields.filter(field => field && field.trim() !== '').length
    return Math.round((filledFields / fields.length) * 100)
  }

  return (
    <div className="space-y-6">
      {/* Profile Photo Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Profile Photo</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                <AvatarFallback className="text-2xl font-semibold bg-blue-100 text-blue-700">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Profile Photo</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Profile Completion:</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {getProfileCompletion()}%
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Upload a new profile photo. We recommend using a square image that's at least 200x200 pixels.
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Upload Photo
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Personal Information</span>
            </CardTitle>
            {!isEditing ? (
              <Button onClick={handleEdit} variant="outline" size="sm">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button onClick={handleCancel} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={isEditing ? editedInfo.firstName : personalInfo.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={isEditing ? editedInfo.lastName : personalInfo.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={isEditing ? editedInfo.email : personalInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={isEditing ? editedInfo.phone : personalInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={isEditing ? editedInfo.dateOfBirth : personalInfo.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  value={isEditing ? editedInfo.address.street : personalInfo.address.street}
                  onChange={(e) => handleInputChange("address.street", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={isEditing ? editedInfo.address.city : personalInfo.address.city}
                    onChange={(e) => handleInputChange("address.city", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={isEditing ? editedInfo.address.state : personalInfo.address.state}
                    onChange={(e) => handleInputChange("address.state", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={isEditing ? editedInfo.address.zipCode : personalInfo.address.zipCode}
                    onChange={(e) => handleInputChange("address.zipCode", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={isEditing ? editedInfo.address.country : personalInfo.address.country}
                    onChange={(e) => handleInputChange("address.country", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
