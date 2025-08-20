"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Upload, Settings, HardDrive, Zap, Shield, FolderOpen } from "lucide-react"

export default function DocumentSection() {
  const [documentSettings, setDocumentSettings] = useState({
    autoProcessing: true,
    ocrEnabled: true,
    aiCategorization: true,
    duplicateDetection: true,
    autoBackup: true,
    compression: "medium",
    defaultCategory: "general",
    maxFileSize: "50",
    retentionPolicy: "2_years",
  })

  const [storageUsage] = useState({
    used: 2.4,
    total: 10,
    documents: 1.8,
    forms: 0.4,
    backups: 0.2,
  })

  const [defaultCategories] = useState([
    "Personal",
    "Work",
    "Education",
    "Medical",
    "Legal",
    "Financial",
    "Travel",
    "General",
  ])

  const handleSettingToggle = (key: string) => {
    setDocumentSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }))
  }

  const handleSettingChange = (key: string, value: string) => {
    setDocumentSettings(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const getStoragePercentage = () => {
    return (storageUsage.used / storageUsage.total) * 100
  }

  const getStorageColor = () => {
    const percentage = getStoragePercentage()
    if (percentage > 80) return "text-red-600"
    if (percentage > 60) return "text-yellow-600"
    return "text-green-600"
  }

  const getCompressionLabel = (value: string) => {
    switch (value) {
      case "none": return "No compression"
      case "low": return "Low compression (high quality)"
      case "medium": return "Medium compression (balanced)"
      case "high": return "High compression (smaller size)"
      default: return value
    }
  }

  const getRetentionLabel = (value: string) => {
    switch (value) {
      case "6_months": return "6 months"
      case "1_year": return "1 year"
      case "2_years": return "2 years"
      case "5_years": return "5 years"
      case "indefinite": return "Indefinite"
      default: return value
    }
  }

  return (
    <div className="space-y-6">
      {/* Storage Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HardDrive className="h-5 w-5" />
            <span>Storage Usage</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {storageUsage.used.toFixed(1)} GB of {storageUsage.total} GB used
              </span>
              <span className={`text-sm font-medium ${getStorageColor()}`}>
                {getStoragePercentage().toFixed(1)}%
              </span>
            </div>
            <Progress value={getStoragePercentage()} className="h-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-semibold text-blue-900">
                {storageUsage.documents.toFixed(1)} GB
              </div>
              <div className="text-sm text-blue-600">Documents</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-semibold text-green-900">
                {storageUsage.forms.toFixed(1)} GB
              </div>
              <div className="text-sm text-green-600">Forms</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-semibold text-purple-900">
                {storageUsage.backups.toFixed(1)} GB
              </div>
              <div className="text-sm text-purple-600">Backups</div>
            </div>
          </div>

          <div className="pt-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Manage Storage
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Document Processing Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Document Processing</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Auto-Processing</Label>
              <p className="text-sm text-gray-600 mt-1">
                Automatically process and categorize uploaded documents
              </p>
            </div>
            <Switch
              checked={documentSettings.autoProcessing}
              onCheckedChange={() => handleSettingToggle("autoProcessing")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">OCR (Text Recognition)</Label>
              <p className="text-sm text-gray-600 mt-1">
                Extract text from images and scanned documents
              </p>
            </div>
            <Switch
              checked={documentSettings.ocrEnabled}
              onCheckedChange={() => handleSettingToggle("ocrEnabled")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">AI Categorization</Label>
              <p className="text-sm text-gray-600 mt-1">
                Use AI to automatically categorize documents
              </p>
            </div>
            <Switch
              checked={documentSettings.aiCategorization}
              onCheckedChange={() => handleSettingToggle("aiCategorization")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Duplicate Detection</Label>
              <p className="text-sm text-gray-600 mt-1">
                Identify and prevent duplicate document uploads
              </p>
            </div>
            <Switch
              checked={documentSettings.duplicateDetection}
              onCheckedChange={() => handleSettingToggle("duplicateDetection")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Auto-Backup</Label>
              <p className="text-sm text-gray-600 mt-1">
                Automatically backup important documents
              </p>
            </div>
            <Switch
              checked={documentSettings.autoBackup}
              onCheckedChange={() => handleSettingToggle("autoBackup")}
            />
          </div>
        </CardContent>
      </Card>

      {/* File Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>File Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="maxFileSize">Maximum File Size (MB)</Label>
              <Input
                id="maxFileSize"
                type="number"
                value={documentSettings.maxFileSize}
                onChange={(e) => handleSettingChange("maxFileSize", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="compression">Compression Level</Label>
              <Select
                value={documentSettings.compression}
                onValueChange={(value) => handleSettingChange("compression", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No compression</SelectItem>
                  <SelectItem value="low">Low compression</SelectItem>
                  <SelectItem value="medium">Medium compression</SelectItem>
                  <SelectItem value="high">High compression</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="defaultCategory">Default Category</Label>
              <Select
                value={documentSettings.defaultCategory}
                onValueChange={(value) => handleSettingChange("defaultCategory", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {defaultCategories.map((category) => (
                    <SelectItem key={category.toLowerCase()} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="retentionPolicy">Retention Policy</Label>
              <Select
                value={documentSettings.retentionPolicy}
                onValueChange={(value) => handleSettingChange("retentionPolicy", value)}
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
          </div>
        </CardContent>
      </Card>

      {/* Supported Formats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FolderOpen className="h-5 w-5" />
            <span>Supported Formats</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { format: "PDF", icon: "📄", description: "Portable Document Format" },
              { format: "DOCX", icon: "📝", description: "Microsoft Word" },
              { format: "XLSX", icon: "📊", description: "Microsoft Excel" },
              { format: "JPG", icon: "🖼️", description: "JPEG Images" },
              { format: "PNG", icon: "🖼️", description: "PNG Images" },
              { format: "TXT", icon: "📄", description: "Plain Text" },
              { format: "CSV", icon: "📊", description: "Comma Separated Values" },
              { format: "ZIP", icon: "📦", description: "Compressed Archives" },
            ].map((fileType) => (
              <div key={fileType.format} className="text-center p-3 border rounded-lg">
                <div className="text-2xl mb-2">{fileType.icon}</div>
                <div className="font-medium text-gray-900">{fileType.format}</div>
                <div className="text-xs text-gray-500">{fileType.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Security & Privacy</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <Shield className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900 mb-1">Document Security</h4>
                <p className="text-sm text-green-700">
                  All documents are encrypted at rest and in transit using bank-level security standards.
                  Your data is protected by our comprehensive security measures.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <Shield className="h-3 w-3 mr-1" />
                  Encrypted
                </Badge>
                <span className="text-sm font-medium">Storage</span>
              </div>
              <p className="text-xs text-gray-600">
                AES-256 encryption for all stored documents
              </p>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  <Zap className="h-3 w-3 mr-1" />
                  Secure
                </Badge>
                <span className="text-sm font-medium">Transfer</span>
              </div>
              <p className="text-xs text-gray-600">
                TLS 1.3 encryption for all data transfers
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
