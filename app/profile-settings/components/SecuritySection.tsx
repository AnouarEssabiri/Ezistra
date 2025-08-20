"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  Lock,
  Smartphone,
  Monitor,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Clock,
  MapPin,
} from "lucide-react"

interface ActiveSession {
  id: string
  device: string
  location: string
  lastActive: string
  ipAddress: string
  isCurrent: boolean
}

export default function SecuritySection() {
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const activeSessions: ActiveSession[] = [
    {
      id: "1",
      device: "MacBook Pro (Current)",
      location: "New York, NY, US",
      lastActive: "Just now",
      ipAddress: "192.168.1.100",
      isCurrent: true,
    },
    {
      id: "2",
      device: "iPhone 14",
      location: "New York, NY, US",
      lastActive: "2 hours ago",
      ipAddress: "192.168.1.101",
      isCurrent: false,
    },
    {
      id: "3",
      device: "Windows PC",
      location: "San Francisco, CA, US",
      lastActive: "1 day ago",
      ipAddress: "192.168.1.102",
      isCurrent: false,
    },
  ]

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your password change logic here
    console.log("Password change submitted:", passwordForm)
    setShowPasswordForm(false)
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleRevokeSession = (sessionId: string) => {
    // Add your session revocation logic here
    console.log("Revoking session:", sessionId)
  }

  const getDeviceIcon = (device: string) => {
    if (device.includes("MacBook")) return "💻"
    if (device.includes("iPhone")) return "📱"
    if (device.includes("Windows")) return "🖥️"
    return "💻"
  }

  return (
    <div className="space-y-6">
      {/* Password Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5" />
            <span>Password</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showPasswordForm ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Last changed: 3 months ago
                </p>
                <p className="text-sm text-gray-500">
                  Use a strong password that you don't use elsewhere.
                </p>
              </div>
              <Button onClick={() => setShowPasswordForm(true)} variant="outline">
                Change Password
              </Button>
            </div>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="currentPassword"
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                  >
                    {showPasswords.current ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="newPassword"
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                  >
                    {showPasswords.new ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters long
                </p>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button type="submit">
                  Update Password
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPasswordForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5" />
            <span>Two-Factor Authentication</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Add an extra layer of security to your account
              </p>
              <div className="flex items-center space-x-2">
                <Badge variant={twoFactorEnabled ? "default" : "secondary"}>
                  {twoFactorEnabled ? "Enabled" : "Disabled"}
                </Badge>
                {twoFactorEnabled && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
              />
              <Button variant="outline" size="sm">
                {twoFactorEnabled ? "Manage" : "Enable"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Monitor className="h-5 w-5" />
            <span>Active Sessions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getDeviceIcon(session.device)}</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{session.device}</span>
                      {session.isCurrent && (
                        <Badge variant="default" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        {session.location}
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        {session.lastActive}
                      </span>
                      <span>IP: {session.ipAddress}</span>
                    </div>
                  </div>
                </div>
                {!session.isCurrent && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRevokeSession(session.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <Button variant="outline" size="sm">
              Revoke All Other Sessions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
