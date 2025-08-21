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
import { FileText, Zap, Settings, Save, Plus, Trash2, Smartphone, Clock, MapPin, Search, Filter, Edit3, Eye, EyeOff, Database, Link, Unlink } from "lucide-react"

interface SavedTemplate {
  id: string
  name: string
  description: string
  lastUsed: string
  fields: number
  category: string
}

interface FieldMapping {
  id: string
  formField: string
  dataSource: string
  dataField: string
  mappingType: 'exact' | 'smart' | 'fuzzy' | 'custom'
  isActive: boolean
  confidence: number
  lastUsed: string
  category: string
}

interface MappingRule {
  id: string
  name: string
  description: string
  conditions: string[]
  priority: number
  isActive: boolean
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

  // Field Mapping State
  const [showFieldMappings, setShowFieldMappings] = useState(false)
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([
    {
      id: "1",
      formField: "First Name",
      dataSource: "Personal Info",
      dataField: "firstName",
      mappingType: "exact",
      isActive: true,
      confidence: 95,
      lastUsed: "2 hours ago",
      category: "Personal"
    },
    {
      id: "2",
      formField: "Email Address",
      dataSource: "Contact Info",
      dataField: "email",
      mappingType: "exact",
      isActive: true,
      confidence: 98,
      lastUsed: "1 hour ago",
      category: "Contact"
    },
    {
      id: "3",
      formField: "Phone Number",
      dataSource: "Contact Info",
      dataField: "phone",
      mappingType: "smart",
      isActive: true,
      confidence: 87,
      lastUsed: "3 hours ago",
      category: "Contact"
    },
    {
      id: "4",
      formField: "Date of Birth",
      dataSource: "Personal Info",
      dataField: "dateOfBirth",
      mappingType: "exact",
      isActive: true,
      confidence: 92,
      lastUsed: "5 hours ago",
      category: "Personal"
    },
    {
      id: "5",
      formField: "Home Address",
      dataSource: "Address Info",
      dataField: "fullAddress",
      mappingType: "smart",
      isActive: true,
      confidence: 78,
      lastUsed: "1 day ago",
      category: "Address"
    }
  ])

  const [mappingRules, setMappingRules] = useState<MappingRule[]>([
    {
      id: "1",
      name: "Personal Information Priority",
      description: "Prioritize personal info fields for exact matching",
      conditions: ["field contains 'name'", "field contains 'email'", "field contains 'phone'"],
      priority: 1,
      isActive: true
    },
    {
      id: "2",
      name: "Address Field Mapping",
      description: "Smart mapping for address-related fields",
      conditions: ["field contains 'address'", "field contains 'street'", "field contains 'city'"],
      priority: 2,
      isActive: true
    },
    {
      id: "3",
      name: "Document Field Detection",
      description: "Auto-detect document upload fields",
      conditions: ["field contains 'upload'", "field contains 'file'", "field contains 'document'"],
      priority: 3,
      isActive: true
    }
  ])

  const [newMapping, setNewMapping] = useState({
    formField: "",
    dataSource: "",
    dataField: "",
    mappingType: "smart" as const,
    category: ""
  })

  const [newRule, setNewRule] = useState({
    name: "",
    description: "",
    conditions: [""],
    priority: 1
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

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

  // Field Mapping Functions
  const handleSaveMapping = () => {
    if (newMapping.formField && newMapping.dataSource && newMapping.dataField) {
      const mapping: FieldMapping = {
        id: Date.now().toString(),
        formField: newMapping.formField,
        dataSource: newMapping.dataSource,
        dataField: newMapping.dataField,
        mappingType: newMapping.mappingType,
        isActive: true,
        confidence: Math.floor(Math.random() * 30) + 70, // Random confidence 70-100
        lastUsed: "Just now",
        category: newMapping.category
      }
      setFieldMappings(prev => [mapping, ...prev])
      setNewMapping({ formField: "", dataSource: "", dataField: "", mappingType: "smart", category: "" })
    }
  }

  const handleDeleteMapping = (id: string) => {
    setFieldMappings(prev => prev.filter(mapping => mapping.id !== id))
  }

  const toggleMappingStatus = (id: string) => {
    setFieldMappings(prev => 
      prev.map(mapping => 
        mapping.id === id 
          ? { ...mapping, isActive: !mapping.isActive }
          : mapping
      )
    )
  }

  const handleSaveRule = () => {
    if (newRule.name && newRule.description && newRule.conditions[0]) {
      const rule: MappingRule = {
        id: Date.now().toString(),
        name: newRule.name,
        description: newRule.description,
        conditions: newRule.conditions.filter(c => c.trim() !== ""),
        priority: newRule.priority,
        isActive: true
      }
      setMappingRules(prev => [rule, ...prev])
      setNewRule({ name: "", description: "", conditions: [""], priority: 1 })
    }
  }

  const deleteRule = (id: string) => {
    setMappingRules(prev => prev.filter(rule => rule.id !== id)
      .map((rule, index) => ({ ...rule, priority: index + 1 })))
  }

  const toggleRuleStatus = (id: string) => {
    setMappingRules(prev => 
      prev.map(rule => 
        rule.id === id 
          ? { ...rule, isActive: !rule.isActive }
          : rule
      )
    )
  }

  const addCondition = () => {
    setNewRule(prev => ({ ...prev, conditions: [...prev.conditions, ""] }))
  }

  const removeCondition = (index: number) => {
    setNewRule(prev => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index)
    }))
  }

  const updateCondition = (index: number, value: string) => {
    setNewRule(prev => ({
      ...prev,
      conditions: prev.conditions.map((c, i) => i === index ? value : c)
    }))
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

  const getMappingTypeIcon = (type: string) => {
    switch (type) {
      case "exact": return <Link className="h-4 w-4 text-green-500" />
      case "smart": return <MapPin className="h-4 w-4 text-blue-500" />
      case "fuzzy": return <Search className="h-4 w-4 text-yellow-500" />
      case "custom": return <Settings className="h-4 w-4 text-purple-500" />
      default: return <Link className="h-4 w-4 text-gray-500" />
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600 border-green-600"
    if (confidence >= 80) return "text-blue-600 border-blue-600"
    if (confidence >= 70) return "text-yellow-600 border-yellow-600"
    return "text-red-600 border-red-600"
  }

  const filteredMappings = fieldMappings.filter(mapping => {
    const matchesSearch = mapping.formField.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mapping.dataField.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || mapping.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(fieldMappings.map(m => m.category)))

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

      {/* Field Mappings Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Field Mappings</span>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFieldMappings(!showFieldMappings)}
              className="flex items-center space-x-2"
            >
              {showFieldMappings ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span>{showFieldMappings ? 'Hide' : 'Show'} Mappings</span>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showFieldMappings ? (
            <div className="space-y-6">
              {/* Add New Mapping */}
              <div className="p-4 border rounded-lg bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-3">Create New Field Mapping</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                  <Input
                    placeholder="Form field name"
                    value={newMapping.formField}
                    onChange={(e) => setNewMapping(prev => ({ ...prev, formField: e.target.value }))}
                  />
                  <Input
                    placeholder="Data source"
                    value={newMapping.dataSource}
                    onChange={(e) => setNewMapping(prev => ({ ...prev, dataSource: e.target.value }))}
                  />
                  <Input
                    placeholder="Data field"
                    value={newMapping.dataField}
                    onChange={(e) => setNewMapping(prev => ({ ...prev, dataField: e.target.value }))}
                  />
                  <Select
                    value={newMapping.mappingType}
                    onValueChange={(value: 'exact' | 'smart' | 'fuzzy' | 'custom') => 
                      setNewMapping(prev => ({ ...prev, mappingType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exact">Exact</SelectItem>
                      <SelectItem value="smart">Smart</SelectItem>
                      <SelectItem value="fuzzy">Fuzzy</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Category"
                    value={newMapping.category}
                    onChange={(e) => setNewMapping(prev => ({ ...prev, category: e.target.value }))}
                  />
                </div>
                <Button onClick={handleSaveMapping} size="sm" className="mt-3">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Mapping
                </Button>
              </div>

              {/* Search and Filter */}
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search mappings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Mappings List */}
              <div className="space-y-3">
                {filteredMappings.map((mapping) => (
                  <div key={mapping.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getMappingTypeIcon(mapping.mappingType)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{mapping.formField}</span>
                          <span className="text-gray-400">→</span>
                          <span className="text-blue-600">{mapping.dataSource}.{mapping.dataField}</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Badge variant="outline" className={`text-xs ${getConfidenceColor(mapping.confidence)}`}>
                              {mapping.confidence}% confidence
                            </Badge>
                          </span>
                          <span>Last used: {mapping.lastUsed}</span>
                          <Badge variant="outline" className="text-xs">
                            {mapping.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={mapping.isActive}
                        onCheckedChange={() => toggleMappingStatus(mapping.id)}
                        size="sm"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteMapping(mapping.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Field mappings are hidden</p>
              <p className="text-sm">Click "Show Mappings" to manage field mappings</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mapping Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Mapping Rules</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Rule */}
          <div className="p-4 border rounded-lg bg-gray-50">
            <h4 className="font-medium text-gray-900 mb-3">Create New Mapping Rule</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <Input
                placeholder="Rule name"
                value={newRule.name}
                onChange={(e) => setNewRule(prev => ({ ...prev, name: e.target.value }))}
              />
              <Input
                placeholder="Priority (1-10)"
                type="number"
                min="1"
                max="10"
                value={newRule.priority}
                onChange={(e) => setNewRule(prev => ({ ...prev, priority: parseInt(e.target.value) || 1 }))}
              />
            </div>
            <Textarea
              placeholder="Rule description"
              value={newRule.description}
              onChange={(e) => setNewRule(prev => ({ ...prev, description: e.target.value }))}
              className="mb-3"
              rows={2}
            />
            <div className="space-y-2">
              <Label className="text-sm font-medium">Conditions</Label>
              {newRule.conditions.map((condition, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder="Condition (e.g., field contains 'name')"
                    value={condition}
                    onChange={(e) => updateCondition(index, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeCondition(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addCondition}>
                <Plus className="h-4 w-4 mr-2" />
                Add Condition
              </Button>
            </div>
            <Button onClick={handleSaveRule} size="sm" className="mt-3">
              <Save className="h-4 w-4 mr-2" />
              Save Rule
            </Button>
          </div>

          {/* Rules List */}
          <div className="space-y-3">
            {mappingRules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium">{rule.name}</span>
                    <Badge variant="outline" className="text-xs">
                      Priority {rule.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{rule.description}</p>
                  <div className="space-y-1">
                    {rule.conditions.map((condition, index) => (
                      <Badge key={index} variant="secondary" className="text-xs mr-1">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={rule.isActive}
                    onCheckedChange={() => toggleRuleStatus(rule.id)}
                    size="sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteRule(rule.id)}
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
                  <Badge variant="outline" className="text-green-600 border-green-600">
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
