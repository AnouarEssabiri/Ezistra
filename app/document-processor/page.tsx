"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
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
import {
  Upload,
  Download,
  FileText,
  Image,
  File,
  Trash2,
  Settings,
  Play,
  CheckCircle,
  AlertCircle,
  Clock,
  Cloud,
  HardDrive,
  Merge,
  FileDown,
  Minimize2,
  Maximize2,
  RotateCcw,
} from "lucide-react"
import { useState, useRef } from "react"
import Navigation from "@/components/Navigation"

interface DocumentFile {
  id: string
  name: string
  size: number
  type: string
  source: 'local' | 'cloud'
  url?: string
  file?: File
  status: 'uploading' | 'ready' | 'processing' | 'error'
  progress?: number
}

interface ProcessingAction {
  id: string
  label: string
  description: string
  icon: React.ReactNode
  checked: boolean
  disabled?: boolean
}

export default function DocumentProcessorPage() {
  const [documents, setDocuments] = useState<DocumentFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [processedFileUrl, setProcessedFileUrl] = useState<string | null>(null)
  const [showCloudStorage, setShowCloudStorage] = useState(false)
  const [cloudDocuments, setCloudDocuments] = useState<DocumentFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [actions, setActions] = useState<ProcessingAction[]>([
    {
      id: 'merge',
      label: 'Merge Documents',
      description: 'Combine multiple documents into one file',
      icon: <Merge className="h-5 w-5" />,
      checked: false
    },
    {
      id: 'convert-pdf',
      label: 'Convert to PDF',
      description: 'Convert documents to PDF format',
      icon: <FileDown className="h-5 w-5" />,
      checked: false
    },
    {
      id: 'resize',
      label: 'Resize Documents',
      description: 'Adjust document dimensions and resolution',
      icon: <Maximize2 className="h-5 w-5" />,
      checked: false
    },
    {
      id: 'compress',
      label: 'Compress Documents',
      description: 'Reduce file size while maintaining quality',
      icon: <Minimize2 className="h-5 w-5" />,
      checked: false
    }
  ])

  // Mock cloud storage documents
  const mockCloudDocuments: DocumentFile[] = [
    {
      id: 'cloud-1',
      name: 'Business_Report.docx',
      size: 2048576, // 2MB
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      source: 'cloud',
      url: '/cloud/documents/business-report.docx',
      status: 'ready'
    },
    {
      id: 'cloud-2',
      name: 'Presentation.pptx',
      size: 5242880, // 5MB
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      source: 'cloud',
      url: '/cloud/documents/presentation.pptx',
      status: 'ready'
    },
    {
      id: 'cloud-3',
      name: 'Spreadsheet.xlsx',
      size: 1048576, // 1MB
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      source: 'cloud',
      url: '/cloud/documents/spreadsheet.xlsx',
      status: 'ready'
    },
    {
      id: 'cloud-4',
      name: 'Image.jpg',
      size: 3145728, // 3MB
      type: 'image/jpeg',
      source: 'cloud',
      url: '/cloud/documents/image.jpg',
      status: 'ready'
    }
  ]

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    Array.from(files).forEach((file) => {
      const documentFile: DocumentFile = {
        id: `local-${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        source: 'local',
        file: file,
        status: 'uploading'
      }

      setDocuments(prev => [...prev, documentFile])

      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 20
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setDocuments(prev => 
            prev.map(doc => 
              doc.id === documentFile.id 
                ? { ...doc, status: 'ready', progress: 100 }
                : doc
            )
          )
        } else {
          setDocuments(prev => 
            prev.map(doc => 
              doc.id === documentFile.id 
                ? { ...doc, progress }
                : doc
            )
          )
        }
      }, 100)
    })
  }

  const handleCloudDocumentSelect = (document: DocumentFile) => {
    const isAlreadySelected = documents.some(doc => doc.id === document.id)
    if (!isAlreadySelected) {
      setDocuments(prev => [...prev, document])
    }
  }

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id))
  }

  const toggleAction = (actionId: string) => {
    setActions(prev => 
      prev.map(action => 
        action.id === actionId 
          ? { ...action, checked: !action.checked }
          : action
      )
    )
  }

  const getSelectedActions = () => actions.filter(action => action.checked)

  const canProcess = () => {
    return documents.length > 0 && getSelectedActions().length > 0
  }

  const processDocuments = async () => {
    if (!canProcess()) return

    setIsProcessing(true)
    setProcessingProgress(0)
    setProcessedFileUrl(null)

    const selectedActions = getSelectedActions()
    const totalSteps = selectedActions.length + 1 // +1 for final processing
    let currentStep = 0

    // Simulate processing steps
    for (const action of selectedActions) {
      currentStep++
      setProcessingProgress((currentStep / totalSteps) * 100)

      // Simulate processing time for each action
      await new Promise(resolve => setTimeout(resolve, 1500))
    }

    // Final processing step
    currentStep++
    setProcessingProgress((currentStep / totalSteps) * 100)
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Simulate processed file URL
    setProcessedFileUrl('/processed/merged-document.pdf')
    setIsProcessing(false)
    setProcessingProgress(100)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.includes('word') || type.includes('document')) {
      return <FileText className="h-8 w-8 text-blue-500" />
    } else if (type.includes('powerpoint') || type.includes('presentation')) {
      return <FileText className="h-8 w-8 text-orange-500" />
    } else if (type.includes('excel') || type.includes('spreadsheet')) {
      return <FileText className="h-8 w-8 text-green-500" />
    } else if (type.includes('pdf')) {
      return <FileText className="h-8 w-8 text-red-500" />
    } else if (type.includes('image')) {
      return <Image className="h-8 w-8 text-purple-500" />
    } else {
      return <File className="h-8 w-8 text-gray-500" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'ready':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'processing':
        return <Settings className="h-4 w-4 text-blue-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Processor</h1>
          <p className="text-gray-600">Upload documents and perform various processing actions like merging, converting, resizing, and compressing</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Document Upload & Management */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Upload Documents</span>
                </CardTitle>
                <CardDescription>Upload documents from your device or select from cloud storage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Local Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.bmp,.tiff"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                  />
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to browse</p>
                  <p className="text-sm text-gray-600 mb-4">Supports PDF, Word, PowerPoint, Excel, and image files</p>
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2"
                  >
                    <HardDrive className="h-4 w-4" />
                    <span>Choose Files</span>
                  </Button>
                </div>

                {/* Cloud Storage Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Cloud className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Cloud Storage</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCloudStorage(!showCloudStorage)}
                  >
                    {showCloudStorage ? 'Hide' : 'Show'} Cloud Documents
                  </Button>
                </div>

                {/* Cloud Storage Documents */}
                {showCloudStorage && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium mb-3">Available Cloud Documents</h4>
                    <div className="space-y-2">
                      {mockCloudDocuments.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-2 bg-white rounded border">
                          <div className="flex items-center space-x-3">
                            {getFileIcon(doc.type)}
                            <div>
                              <p className="font-medium text-sm">{doc.name}</p>
                              <p className="text-xs text-gray-500">{formatFileSize(doc.size)}</p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCloudDocumentSelect(doc)}
                            disabled={documents.some(d => d.id === doc.id)}
                          >
                            {documents.some(d => d.id === doc.id) ? 'Selected' : 'Select'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Selected Documents */}
            {documents.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Selected Documents ({documents.length})</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDocuments([])}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                  </CardTitle>
                  <CardDescription>Documents ready for processing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(doc.type)}
                          <div>
                            <p className="font-medium text-sm">{doc.name}</p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <span>{formatFileSize(doc.size)}</span>
                              <span>•</span>
                              <span className="capitalize">{doc.source}</span>
                              <span>•</span>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(doc.status)}
                                <span className="capitalize">{doc.status}</span>
                              </div>
                            </div>
                            {doc.status === 'uploading' && doc.progress !== undefined && (
                              <Progress value={doc.progress} className="w-32 mt-1" />
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDocument(doc.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Processing Actions & Controls */}
          <div className="space-y-6">
            {/* Processing Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Processing Actions</span>
                </CardTitle>
                <CardDescription>Select one or more actions to perform on your documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {actions.map((action) => (
                  <div key={action.id} className="flex items-start space-x-3">
                    <Checkbox
                      id={action.id}
                      checked={action.checked}
                      onCheckedChange={() => toggleAction(action.id)}
                      disabled={action.disabled}
                    />
                    <div className="flex-1">
                      <Label htmlFor={action.id} className="flex items-center space-x-2 cursor-pointer">
                        {action.icon}
                        <span className="font-medium">{action.label}</span>
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Processing Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Process Documents</CardTitle>
                <CardDescription>Click process to start document processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={processDocuments}
                  disabled={!canProcess() || isProcessing}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Settings className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Process Documents
                    </>
                  )}
                </Button>

                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processing...</span>
                      <span>{Math.round(processingProgress)}%</span>
                    </div>
                    <Progress value={processingProgress} />
                  </div>
                )}

                {processedFileUrl && (
                  <div className="space-y-3">
                    <Separator />
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p className="font-medium text-green-600">Processing Complete!</p>
                      <p className="text-sm text-gray-600 mt-1">Your documents have been processed successfully</p>
                    </div>
                    <Button className="w-full" asChild>
                      <a href={processedFileUrl} download>
                        <Download className="h-4 w-4 mr-2" />
                        Download Result
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Processing Info */}
            <Card>
              <CardHeader>
                <CardTitle>Processing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Documents Selected:</span>
                  <span className="font-medium">{documents.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Actions Selected:</span>
                  <span className="font-medium">{getSelectedActions().length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Size:</span>
                  <span className="font-medium">
                    {formatFileSize(documents.reduce((sum, doc) => sum + doc.size, 0))}
                  </span>
                </div>
                {getSelectedActions().length > 0 && (
                  <div className="pt-2 border-t">
                    <p className="text-gray-600 mb-2">Selected Actions:</p>
                    <div className="space-y-1">
                      {getSelectedActions().map((action) => (
                        <Badge key={action.id} variant="secondary" className="mr-1">
                          {action.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
