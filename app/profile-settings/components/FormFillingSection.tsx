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
import { Textarea } from "@/components/ui/textarea"
import { FileText, Zap, Settings, Save, Plus, Trash2, Smartphone, Clock } from "lucide-react"

interface SavedTemplate {
  id: string
  name: string
  description: string
  lastUsed: string
  fields: number
  category: string
}

export default function FormFillingSection() {
  const [formSettings, setFormSettings] = useState({
    autoFill: true,
    smartSuggestions: true,
    fieldValidation: true,
    saveProgress: true,
    autoSave: true,
    autoSaveInterval: "30",
    defaultLanguage: "en",
    accessibilityMode: false,
  })

  const [formPreferences, setFormPreferences] = useState({
    preferredDataSource: "documents",
    autoCategorization: true,
    duplicatePrevention: true,
    fieldMapping: "smart",
    validationLevel: "strict",
  })

  const [savedTemplates, setSavedTemplates] = useState<SavedTemplate[]>([
    {
      id: "1",
      name: "Job Application",
      description: "Standard job application form with personal and professional details",
      lastUsed: "2 days ago",
      fields: 15,
      category: "Employment",
    },
    {
      id: "2",
      name: "School Registration",
      description: "Student registration form for educational institutions",
      lastUsed: "1 week ago",
      fields: 12,
      category: "Education",
    },
    {
      id: "3",
      name: "Medical History",
      description: "Comprehensive medical history and health information form",
      lastUsed: "3 weeks ago",
      fields: 20,
      category: "Medical",
    },
  ])

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    category: "",
  })

  const handleSettingToggle = (key: string) => {
    setFormSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }))
  }

  const handleSettingChange = (key: string, value: string) => {
    setFormSettings(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const handlePreferenceChange = (key: string, value: string) => {
    setFormPreferences(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSaveTemplate = () => {
    if (newTemplate.name && newTemplate.description && newTemplate.category) {
      const template: SavedTemplate = {
        id: Date.now().toString(),
        name: newTemplate.name,
        description: newTemplate.description,
        category: newTemplate.category,
        lastUsed: "Just now",
        fields: 0,
      }
      setSavedTemplates(prev => [template, ...prev])
      setNewTemplate({ name: "", description: "", category: "" })
    }
  }

  const handleDeleteTemplate = (id: string) => {
    setSavedTemplates(prev => prev.filter(template => template.id !== id))
  }

  const getFieldMappingLabel = (value: string) => {
    switch (value) {
      case "exact": return "Exact match only"
      case "smart": return "Smart matching (recommended)"
      case "fuzzy": return "Fuzzy matching"
      default: return value
    }
  }

  const getValidationLevelLabel = (value: string) => {
    switch (value) {
      case "loose": return "Loose - Basic validation"
      case "standard": return "Standard - Moderate validation"
      case "strict": return "Strict - Comprehensive validation"
      default: return value
    }
  }

  return (
    <div className="space-y-6">
      {/* Form Automation Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Form Automation</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Auto-Fill Forms</Label>
              <p className="text-sm text-gray-600 mt-1">
                Automatically populate form fields using your saved information
              </p>
            </div>
            <Switch
              checked={formSettings.autoFill}
              onCheckedChange={() => handleSettingToggle("autoFill")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Smart Suggestions</Label>
              <p className="text-sm text-gray-600 mt-1">
                Use AI to suggest the best field matches and values
              </p>
            </div>
            <Switch
              checked={formSettings.smartSuggestions}
              onCheckedChange={() => handleSettingToggle("smartSuggestions")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Field Validation</Label>
              <p className="text-sm text-gray-600 mt-1">
                Automatically validate form fields for accuracy
              </p>
            </div>
            <Switch
              checked={formSettings.fieldValidation}
              onCheckedChange={() => handleSettingToggle("fieldValidation")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Save Progress</Label>
              <p className="text-sm text-gray-600 mt-1">
                Automatically save form progress as you fill
              </p>
            </div>
            <Switch
              checked={formSettings.saveProgress}
              onCheckedChange={() => handleSettingToggle("saveProgress")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Auto-Save</Label>
              <p className="text-sm text-gray-600 mt-1">
                Periodically save form data to prevent loss
              </p>
            </div>
            <Switch
              checked={formSettings.autoSave}
              onCheckedChange={() => handleSettingToggle("autoSave")}
            />
          </div>

          {formSettings.autoSave && (
            <>
              <Separator />
              <div>
                <Label htmlFor="autoSaveInterval">Auto-Save Interval (seconds)</Label>
                <Input
                  id="autoSaveInterval"
                  type="number"
                  value={formSettings.autoSaveInterval}
                  onChange={(e) => handleSettingChange("autoSaveInterval", e.target.value)}
                  className="mt-1 w-32"
                  min="10"
                  max="300"
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Form Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Form Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="preferredDataSource">Preferred Data Source</Label>
              <Select
                value={formPreferences.preferredDataSource}
                onValueChange={(value) => handlePreferenceChange("preferredDataSource", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="documents">Documents</SelectItem>
                  <SelectItem value="profile">Profile Information</SelectItem>
                  <SelectItem value="previous_forms">Previous Forms</SelectItem>
                  <SelectItem value="smart">Smart Selection</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="fieldMapping">Field Mapping Strategy</Label>
              <Select
                value={formPreferences.fieldMapping}
                onValueChange={(value) => handlePreferenceChange("fieldMapping", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exact">Exact match only</SelectItem>
                  <SelectItem value="smart">Smart matching (recommended)</SelectItem>
                  <SelectItem value="fuzzy">Fuzzy matching</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="validationLevel">Validation Level</Label>
              <Select
                value={formPreferences.validationLevel}
                onValueChange={(value) => handlePreferenceChange("validationLevel", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="loose">Loose - Basic validation</SelectItem>
                  <SelectItem value="standard">Standard - Moderate validation</SelectItem>
                  <SelectItem value="strict">Strict - Comprehensive validation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="defaultLanguage">Default Language</Label>
              <Select
                value={formSettings.defaultLanguage}
                onValueChange={(value) => handleSettingChange("defaultLanguage", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Auto-Categorization</Label>
                <p className="text-sm text-gray-600 mt-1">
                  Automatically categorize forms based on content
                </p>
              </div>
              <Switch
                checked={formPreferences.autoCategorization}
                onCheckedChange={() => handlePreferenceChange("autoCategorization", "true")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Duplicate Prevention</Label>
                <p className="text-sm text-gray-600 mt-1">
                  Prevent duplicate form submissions
                </p>
              </div>
              <Switch
                checked={formPreferences.duplicatePrevention}
                onCheckedChange={() => handlePreferenceChange("duplicatePrevention", "true")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Accessibility Mode</Label>
                <p className="text-sm text-gray-600 mt-1">
                  Enhanced accessibility features for forms
                </p>
              </div>
              <Switch
                checked={formSettings.accessibilityMode}
                onCheckedChange={() => handleSettingToggle("accessibilityMode")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Saved Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Saved Templates</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Template */}
          <div className="p-4 border rounded-lg bg-gray-50">
            <h4 className="font-medium text-gray-900 mb-3">Create New Template</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                placeholder="Template name"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
              />
              <Input
                placeholder="Category"
                value={newTemplate.category}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
              />
              <Button onClick={handleSaveTemplate} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Save Template
              </Button>
            </div>
            <Textarea
              placeholder="Template description"
              value={newTemplate.description}
              onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
              className="mt-3"
              rows={2}
            />
          </div>

          {/* Template List */}
          <div className="space-y-3">
            {savedTemplates.map((template) => (
              <div key={template.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium">{template.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <FileText className="h-3 w-3" />
                      {template.fields} fields
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      {template.lastUsed}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Use
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteTemplate(template.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Advanced Options</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Performance</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Form processing speed:</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Fast
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Memory usage:</span>
                  <Badge variant="outline" className="text-blue-600 border-blue-600">
                    Optimized
                  </Badge>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Compatibility</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Browser support:</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    All Modern
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Mobile support:</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <Smartphone className="h-3 w-3 mr-1" />
                    Yes
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
