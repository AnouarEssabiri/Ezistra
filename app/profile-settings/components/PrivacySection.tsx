"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Shield, Download, Trash2, Users, Globe, Lock } from "lucide-react"

export default function PrivacySection() {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    dataSharing: {
      analytics: true,
      marketing: false,
      thirdParty: false,
      research: false,
    },
    dataRetention: {
      documents: "2_years",
      forms: "1_year",
      activity: "6_months",
      analytics: "1_year",
    },
  })

  const handlePrivacyToggle = (key: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      dataSharing: {
        ...prev.dataSharing,
        [key]: !prev.dataSharing[key as keyof typeof prev.dataSharing],
      },
    }))
  }

  const handleDataRetentionChange = (key: string, value: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      dataRetention: {
        ...prev.dataRetention,
        [key]: value,
      },
    }))
  }

  const getRetentionLabel = (value: string) => {
    switch (value) {
      case "3_months": return "3 months"
      case "6_months": return "6 months"
      case "1_year": return "1 year"
      case "2_years": return "2 years"
      case "5_years": return "5 years"
      case "indefinite": return "Indefinite"
      default: return value
    }
  }

  const getVisibilityLabel = (value: string) => {
    switch (value) {
      case "public": return "Public"
      case "friends": return "Friends Only"
      case "private": return "Private"
      default: return value
    }
  }

  const getVisibilityIcon = (value: string) => {
    switch (value) {
      case "public": return <Globe className="h-4 w-4" />
      case "friends": return <Users className="h-4 w-4" />
      case "private": return <Lock className="h-4 w-4" />
      default: return <Globe className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Visibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Profile Visibility</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="profileVisibility">Profile Visibility</Label>
            <Select
              value={privacySettings.profileVisibility}
              onValueChange={(value) => setPrivacySettings(prev => ({ ...prev, profileVisibility: value }))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public - Anyone can see your profile</SelectItem>
                <SelectItem value="friends">Friends Only - Only your connections can see your profile</SelectItem>
                <SelectItem value="private">Private - Only you can see your profile</SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-2 flex items-center space-x-2">
              {getVisibilityIcon(privacySettings.profileVisibility)}
              <span className="text-sm text-gray-600">
                Your profile is currently {getVisibilityLabel(privacySettings.profileVisibility).toLowerCase()}
              </span>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">What's Visible</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {privacySettings.profileVisibility === "public" ? "Visible" : "Hidden"}
                </Badge>
                <span>Name and profile photo</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {privacySettings.profileVisibility === "public" ? "Visible" : "Hidden"}
                </Badge>
                <span>Basic information</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {privacySettings.profileVisibility === "public" ? "Visible" : "Hidden"}
                </Badge>
                <span>Activity status</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Sharing Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Data Sharing Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Analytics & Performance</Label>
              <p className="text-sm text-gray-600 mt-1">
                Help us improve our services by sharing anonymous usage data
              </p>
            </div>
            <Switch
              checked={privacySettings.dataSharing.analytics}
              onCheckedChange={() => handlePrivacyToggle("analytics")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Marketing Communications</Label>
              <p className="text-sm text-gray-600 mt-1">
                Receive personalized offers and product recommendations
              </p>
            </div>
            <Switch
              checked={privacySettings.dataSharing.marketing}
              onCheckedChange={() => handlePrivacyToggle("marketing")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Third-Party Services</Label>
              <p className="text-sm text-gray-600 mt-1">
                Allow trusted partners to provide enhanced services
              </p>
            </div>
            <Switch
              checked={privacySettings.dataSharing.thirdParty}
              onCheckedChange={() => handlePrivacyToggle("thirdParty")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Research & Development</Label>
              <p className="text-sm text-gray-600 mt-1">
                Contribute to improving our AI and machine learning systems
              </p>
            </div>
            <Switch
              checked={privacySettings.dataSharing.research}
              onCheckedChange={() => handlePrivacyToggle("research")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Retention Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Data Retention Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="documents">Document Retention</Label>
              <Select
                value={privacySettings.dataRetention.documents}
                onValueChange={(value) => handleDataRetentionChange("documents", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6_months">6 months</SelectItem>
                  <SelectItem value="1_year">1 year</SelectItem>
                  <SelectItem value="2_years">2 years</SelectItem>
                  <SelectItem value="5_years">5 years</SelectItem>
                  <SelectItem value="indefinite">Indefinite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="forms">Form Data Retention</Label>
              <Select
                value={privacySettings.dataRetention.forms}
                onValueChange={(value) => handleDataRetentionChange("forms", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3_months">3 months</SelectItem>
                  <SelectItem value="6_months">6 months</SelectItem>
                  <SelectItem value="1_year">1 year</SelectItem>
                  <SelectItem value="2_years">2 years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="activity">Activity Logs</Label>
              <Select
                value={privacySettings.dataRetention.activity}
                onValueChange={(value) => handleDataRetentionChange("activity", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3_months">3 months</SelectItem>
                  <SelectItem value="6_months">6 months</SelectItem>
                  <SelectItem value="1_year">1 year</SelectItem>
                  <SelectItem value="2_years">2 years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="analytics">Analytics Data</Label>
              <Select
                value={privacySettings.dataRetention.analytics}
                onValueChange={(value) => handleDataRetentionChange("analytics", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6_months">6 months</SelectItem>
                  <SelectItem value="1_year">1 year</SelectItem>
                  <SelectItem value="2_years">2 years</SelectItem>
                  <SelectItem value="5_years">5 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Rights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Your Data Rights</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col items-start space-y-2">
              <Download className="h-5 w-5 text-blue-600" />
              <div className="text-left">
                <div className="font-medium">Download Your Data</div>
                <div className="text-sm text-gray-600">
                  Get a copy of all your personal data
                </div>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex-col items-start space-y-2">
              <Trash2 className="h-5 w-5 text-red-600" />
              <div className="text-left">
                <div className="font-medium">Delete Account</div>
                <div className="text-sm text-gray-600">
                  Permanently remove your account and data
                </div>
              </div>
            </Button>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800 mb-1">Data Protection Notice</h4>
                <p className="text-sm text-yellow-700">
                  Your data is protected by our privacy policy and GDPR compliance. 
                  You have the right to access, modify, or delete your personal information at any time.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
