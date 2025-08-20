"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Bell, Mail, Smartphone, Clock, AlertTriangle, CheckCircle } from "lucide-react"

export default function NotificationSection() {
  const [emailNotifications, setEmailNotifications] = useState({
    security: true,
    updates: true,
    marketing: false,
    documents: true,
    forms: true,
    reminders: true,
  })

  const [pushNotifications, setPushNotifications] = useState({
    security: true,
    updates: false,
    documents: true,
    forms: true,
    reminders: true,
  })

  const [reminderSettings, setReminderSettings] = useState({
    documentExpiry: "7_days",
    formDeadline: "3_days",
    securityAlerts: "immediate",
    updates: "weekly",
  })

  const handleEmailToggle = (key: string) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }))
  }

  const handlePushToggle = (key: string) => {
    setPushNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }))
  }

  const handleReminderChange = (key: string, value: string) => {
    setReminderSettings(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const getReminderLabel = (value: string) => {
    switch (value) {
      case "immediate": return "Immediate"
      case "1_hour": return "1 hour"
      case "3_hours": return "3 hours"
      case "1_day": return "1 day"
      case "3_days": return "3 days"
      case "7_days": return "7 days"
      case "weekly": return "Weekly"
      case "monthly": return "Monthly"
      default: return value
    }
  }

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Email Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Security Alerts</Label>
              <p className="text-sm text-gray-600 mt-1">
                Get notified about login attempts, password changes, and security updates
              </p>
            </div>
            <Switch
              checked={emailNotifications.security}
              onCheckedChange={() => handleEmailToggle("security")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Product Updates</Label>
              <p className="text-sm text-gray-600 mt-1">
                Receive updates about new features and improvements
              </p>
            </div>
            <Switch
              checked={emailNotifications.updates}
              onCheckedChange={() => handleEmailToggle("updates")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Marketing Communications</Label>
              <p className="text-sm text-gray-600 mt-1">
                Receive promotional emails and special offers
              </p>
            </div>
            <Switch
              checked={emailNotifications.marketing}
              onCheckedChange={() => handleEmailToggle("marketing")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Document Notifications</Label>
              <p className="text-sm text-gray-600 mt-1">
                Get notified about document uploads, processing, and expiry
              </p>
            </div>
            <Switch
              checked={emailNotifications.documents}
              onCheckedChange={() => handleEmailToggle("documents")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Form Filling Updates</Label>
              <p className="text-sm text-gray-600 mt-1">
                Receive updates about form processing and completion
              </p>
            </div>
            <Switch
              checked={emailNotifications.forms}
              onCheckedChange={() => handleEmailToggle("forms")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Reminders</Label>
              <p className="text-sm text-gray-600 mt-1">
                Get reminded about upcoming deadlines and important dates
              </p>
            </div>
            <Switch
              checked={emailNotifications.reminders}
              onCheckedChange={() => handleEmailToggle("reminders")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5" />
            <span>Push Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Security Alerts</Label>
              <p className="text-sm text-gray-600 mt-1">
                Immediate notifications for security-related activities
              </p>
            </div>
            <Switch
              checked={pushNotifications.security}
              onCheckedChange={() => handlePushToggle("security")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Product Updates</Label>
              <p className="text-sm text-gray-600 mt-1">
                Get notified about new features and improvements
              </p>
            </div>
            <Switch
              checked={pushNotifications.updates}
              onCheckedChange={() => handlePushToggle("updates")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Document Notifications</Label>
              <p className="text-sm text-gray-600 mt-1">
                Real-time updates about document processing
              </p>
            </div>
            <Switch
              checked={pushNotifications.documents}
              onCheckedChange={() => handlePushToggle("documents")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Form Filling Updates</Label>
              <p className="text-sm text-gray-600 mt-1">
                Instant notifications about form progress
              </p>
            </div>
            <Switch
              checked={pushNotifications.forms}
              onCheckedChange={() => handlePushToggle("forms")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Reminders</Label>
              <p className="text-sm text-gray-600 mt-1">
                Push notifications for important deadlines
              </p>
            </div>
            <Switch
              checked={pushNotifications.reminders}
              onCheckedChange={() => handlePushToggle("reminders")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Reminder Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Reminder Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="documentExpiry">Document Expiry Reminders</Label>
              <Select
                value={reminderSettings.documentExpiry}
                onValueChange={(value) => handleReminderChange("documentExpiry", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1_day">1 day before</SelectItem>
                  <SelectItem value="3_days">3 days before</SelectItem>
                  <SelectItem value="7_days">7 days before</SelectItem>
                  <SelectItem value="14_days">14 days before</SelectItem>
                  <SelectItem value="30_days">30 days before</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="formDeadline">Form Deadline Reminders</Label>
              <Select
                value={reminderSettings.formDeadline}
                onValueChange={(value) => handleReminderChange("formDeadline", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1_day">1 day before</SelectItem>
                  <SelectItem value="3_days">3 days before</SelectItem>
                  <SelectItem value="7_days">7 days before</SelectItem>
                  <SelectItem value="14_days">14 days before</SelectItem>
                  <SelectItem value="30_days">30 days before</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="securityAlerts">Security Alert Timing</Label>
              <Select
                value={reminderSettings.securityAlerts}
                onValueChange={(value) => handleReminderChange("securityAlerts", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="1_hour">1 hour delay</SelectItem>
                  <SelectItem value="3_hours">3 hours delay</SelectItem>
                  <SelectItem value="1_day">1 day delay</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="updates">Update Notifications</Label>
              <Select
                value={reminderSettings.updates}
                onValueChange={(value) => handleReminderChange("updates", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="daily">Daily digest</SelectItem>
                  <SelectItem value="weekly">Weekly digest</SelectItem>
                  <SelectItem value="monthly">Monthly digest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Notification Summary</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Email notifications: {Object.values(emailNotifications).filter(Boolean).length}/6 enabled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Push notifications: {Object.values(pushNotifications).filter(Boolean).length}/5 enabled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Reminders: {getReminderLabel(reminderSettings.documentExpiry)} before expiry</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
