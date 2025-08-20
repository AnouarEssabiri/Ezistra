"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Crown, Star, Users, Zap, Shield, Download, Trash2, AlertTriangle, Settings } from "lucide-react"

interface PlanFeature {
  name: string
  included: boolean
  description: string
}

interface BillingInfo {
  cardLast4: string
  cardBrand: string
  expiryDate: string
  billingAddress: string
  nextBilling: string
}

export default function AccountSection() {
  const [currentPlan] = useState({
    name: "Pro",
    price: "$19.99",
    period: "month",
    status: "active",
    nextBilling: "March 15, 2025",
  })

  const [billingInfo] = useState<BillingInfo>({
    cardLast4: "4242",
    cardBrand: "Visa",
    expiryDate: "12/26",
    billingAddress: "123 Main St, New York, NY 10001",
    nextBilling: "March 15, 2025",
  })

  const [accountStats] = useState({
    documents: 47,
    forms: 23,
    storage: 2.4,
    storageLimit: 10,
    lastLogin: "2 hours ago",
    accountAge: "1 year, 3 months",
  })

  const planFeatures: PlanFeature[] = [
    {
      name: "Unlimited Documents",
      included: true,
      description: "Upload and store unlimited documents",
    },
    {
      name: "AI Form Filling",
      included: true,
      description: "Advanced AI-powered form automation",
    },
    {
      name: "Priority Support",
      included: true,
      description: "24/7 priority customer support",
    },
    {
      name: "Advanced Analytics",
      included: true,
      description: "Detailed usage and performance analytics",
    },
    {
      name: "Team Collaboration",
      included: false,
      description: "Share documents and collaborate with team members",
    },
    {
      name: "Custom Branding",
      included: false,
      description: "Customize the interface with your brand",
    },
  ]

  const getStoragePercentage = () => {
    return (accountStats.storage / accountStats.storageLimit) * 100
  }

  const getStorageColor = () => {
    const percentage = getStoragePercentage()
    if (percentage > 80) return "text-red-600"
    if (percentage > 60) return "text-yellow-600"
    return "text-green-600"
  }

  const handlePlanChange = (plan: string) => {
    console.log("Changing to plan:", plan)
    // Add your plan change logic here
  }

  const handleBillingUpdate = () => {
    console.log("Updating billing information")
    // Add your billing update logic here
  }

  const handleAccountDelete = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Deleting account")
      // Add your account deletion logic here
    }
  }

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Crown className="h-5 w-5" />
            <span>Current Plan</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Crown className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-bold text-gray-900">{currentPlan.name} Plan</h3>
                  <Badge variant="default" className="bg-green-600">
                    Active
                  </Badge>
                </div>
                <p className="text-gray-600">
                  {currentPlan.price}/{currentPlan.period}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Next billing</p>
              <p className="font-medium">{currentPlan.nextBilling}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => handlePlanChange("upgrade")}>
              <Star className="h-4 w-4 mr-2" />
              Upgrade Plan
            </Button>
            <Button variant="outline" onClick={() => handlePlanChange("downgrade")}>
              <Users className="h-4 w-4 mr-2" />
              Change Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Plan Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Plan Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {planFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className={`mt-1 ${feature.included ? "text-green-600" : "text-gray-400"}`}>
                  {feature.included ? (
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                  ) : (
                    <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium">{feature.name}</span>
                    {!feature.included && (
                      <Badge variant="outline" className="text-xs">
                        Pro+
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Billing Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Payment Method</h4>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-6 bg-blue-100 rounded flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">
                    {billingInfo.cardBrand} ending in {billingInfo.cardLast4}
                  </p>
                  <p className="text-sm text-gray-600">Expires {billingInfo.expiryDate}</p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Billing Address</h4>
              <p className="text-sm text-gray-600">{billingInfo.billingAddress}</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleBillingUpdate}>
              <CreditCard className="h-4 w-4 mr-2" />
              Update Billing
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5" />
            <span>Account Statistics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-900">{accountStats.documents}</div>
              <div className="text-sm text-blue-600">Documents</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-900">{accountStats.forms}</div>
              <div className="text-sm text-green-600">Forms</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-900">{accountStats.accountAge}</div>
              <div className="text-sm text-purple-600">Account Age</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-900">{accountStats.lastLogin}</div>
              <div className="text-sm text-orange-600">Last Login</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Storage Usage: {accountStats.storage.toFixed(1)} GB of {accountStats.storageLimit} GB
              </span>
              <span className={`text-sm font-medium ${getStorageColor()}`}>
                {getStoragePercentage().toFixed(1)}%
              </span>
            </div>
            <Progress value={getStoragePercentage()} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Account Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col items-start space-y-2">
              <Download className="h-5 w-5 text-blue-600" />
              <div className="text-left">
                <div className="font-medium">Export Data</div>
                <div className="text-sm text-gray-600">
                  Download all your data and documents
                </div>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex-col items-start space-y-2">
              <Shield className="h-5 w-5 text-green-600" />
              <div className="text-left">
                <div className="font-medium">Security Audit</div>
                <div className="text-sm text-gray-600">
                  Review your account security settings
                </div>
              </div>
            </Button>
          </div>

          <Separator />

          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-900 mb-1">Danger Zone</h4>
                <p className="text-sm text-red-700 mb-3">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleAccountDelete}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
