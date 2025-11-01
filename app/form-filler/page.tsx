"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  CheckCircle,
  AlertCircle,
  Save,
  Edit,
  FileCheck,
  GraduationCap,
  Home,
  Book,
  FileText,
} from "lucide-react"
import { useState, useEffect } from "react"
import Navigation from "@/components/Navigation"
import { Switch } from "@/components/ui/switch"
import { 
  type PersonalInfo, 
  type UniversityInfo, 
  type AddressInfo,
  type BaccalaureatInfo,
  type HigherEducationInfo,
  type DocumentInfo,
  type ComplementaryInfo,
  type BacLevel 
} from "@/lib/types"
import { useDatabaseOperation } from '@/hooks/useDatabase'
import type { DatabaseRepositories } from '@/hooks/useDatabase'
import type { 
  BaseRepository,
  DB,
  StoreDefinition,
  DatabaseError,
  NotFoundError,
  ValidationError,
  OperationError
} from '@/utils/db'

export default function FormFillerPage() {
  // Export all form data as JSON
  const handleExportData = async () => {
    const exportData = {
      personalInfo: personalInfo,
      universityInfo: universityInfo,
      studentAddress: studentAddress,
      parentAddress: parentAddress,
      bacInfo: bacInfo,
      bac2Info: bac2Info,
      bac3Info: bac3Info,
      bac5Info: bac5Info,
      complementaryInfo: complementaryInfo,
      documents: documents,
    };
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ezistra-form-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showSuccess('Export réussi !');
  };

  // Import data from JSON file
  const handleImportData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const imported = JSON.parse(text);
      setPersonalInfo(imported.personalInfo || personalInfo);
      setUniversityInfo(imported.universityInfo || universityInfo);
      setStudentAddress(imported.studentAddress || studentAddress);
      setParentAddress(imported.parentAddress || parentAddress);
      setBacInfo(imported.bacInfo || bacInfo);
      setBac2Info(imported.bac2Info || bac2Info);
      setBac3Info(imported.bac3Info || bac3Info);
      setBac5Info(imported.bac5Info || bac5Info);
      setComplementaryInfo(imported.complementaryInfo || complementaryInfo);
      setDocuments(imported.documents || documents);
      setHasUnsavedChanges(true);
      showSuccess('Import réussi !');
    } catch (err) {
      setErrorMessage("Erreur lors de l'importation du fichier");
    }
  };
  const [personalInfoDialogOpen, setPersonalInfoDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const currentYear = "2025/2026"

  // Personal Info State
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    id: "", // Will be generated
    cne: "",
    cin: "",
    firstName: "",
    lastName: "",
    firstNameAr: "",
    lastNameAr: "",
    birthDate: "",
    birthPlace: "",
    birthPlaceAr: "",
    birthProvince: "",
    birthCountry: "MAROC",
    gender: "M",
    nationality: "Marocaine",
    civilStatus: "célibataire",
    handicap: false,
  })

  // University Info State
  const [universityInfo, setUniversityInfo] = useState<UniversityInfo>({
    id: "", // Will be generated
    studentId: "", // Will be linked to personalInfo.id
    academicYear: currentYear,
    filiere: ""
  })

  // Address Info State - Student
  const [studentAddress, setStudentAddress] = useState<AddressInfo>({
    id: "", // Will be generated
    studentId: "", // Will be linked to personalInfo.id
    type: "student",
    address: "",
    addressAr: "",
    postalCode: "",
    commune: "",
    province: "",
    country: "MAROC",
    housing: "",
    email1: "",
    email2: "",
    phone: ""
  })

  // Address Info State - Parent
  const [parentAddress, setParentAddress] = useState<AddressInfo>({
    id: "", // Will be generated
    studentId: "", // Will be linked to personalInfo.id
    type: "parent",
    address: "",
    addressAr: "",
    postalCode: "",
    commune: "",
    province: "",
    country: "MAROC",
    phone: "",
    parentStatus: ""
  })

  // Baccalaureat Info State
  const [bacInfo, setBacInfo] = useState<BaccalaureatInfo>({
    id: "", // Will be generated
    studentId: "", // Will be linked to personalInfo.id
    year: "",
    grade: 0,
    bacType: "",
    institution: "",
    serie: "",
    mention: "",
    academy: "",
    province: "",
    country: "MAROC"
  })

  // Higher Education Info States
  const [bac2Info, setBac2Info] = useState<HigherEducationInfo>({
    id: "", // Will be generated
    studentId: "", // Will be linked to personalInfo.id
    level: "bac+2",
    year: "",
    grades: {},
    diplomaType: "",
    filiere: "",
    institution: "",
    province: "",
    country: "MAROC"
  })

  const [bac3Info, setBac3Info] = useState<HigherEducationInfo>({
    id: "", // Will be generated
    studentId: "", // Will be linked to personalInfo.id
    level: "bac+3",
    year: "",
    grades: {},
    diplomaType: "",
    filiere: "",
    institution: "",
    province: "",
    country: "MAROC"
  })

  const [bac5Info, setBac5Info] = useState<HigherEducationInfo>({
    id: "", // Will be generated
    studentId: "", // Will be linked to personalInfo.id
    level: "bac+5",
    year: "",
    grades: {},
    diplomaType: "",
    filiere: "",
    institution: "",
    province: "",
    country: "MAROC"
  })

  // Complementary Info State
  const [complementaryInfo, setComplementaryInfo] = useState<ComplementaryInfo>({
    id: "", // Will be generated
    studentId: "", // Will be linked to personalInfo.id
    institutionDate: "",
    studentStatus: "",
    profession: "",
    employer: ""
  })

  // Documents State
  const [documents, setDocuments] = useState<DocumentInfo[]>([])

  const handleInputChange = (section: string, field: string, value: any) => {
    setHasUnsavedChanges(true)
    switch(section) {
      case "personal":
        setPersonalInfo(prev => ({ ...prev, [field]: value }))
        break
      case "university":
        setUniversityInfo(prev => ({ ...prev, [field]: value }))
        break
      case "studentAddress":
        setStudentAddress(prev => ({ ...prev, [field]: value }))
        break
      case "parentAddress":
        setParentAddress(prev => ({ ...prev, [field]: value }))
        break
      case "bac":
        setBacInfo(prev => ({ ...prev, [field]: value }))
        break
      case "bac2":
        setBac2Info(prev => ({ ...prev, [field]: value }))
        break
      case "bac3":
        setBac3Info(prev => ({ ...prev, [field]: value }))
        break
      case "bac5":
        setBac5Info(prev => ({ ...prev, [field]: value }))
        break
      case "complementary":
        setComplementaryInfo(prev => ({ ...prev, [field]: value }))
        break
    }
  }

  const { execute: dbExecute, isReady: isDatabaseReady, error: dbError } = useDatabaseOperation()

  const validateForm = () => {
    // Required fields validation
    const requiredFields = {
      personal: ['cne', 'cin', 'firstName', 'lastName', 'birthDate', 'birthPlace', 'birthProvince'],
      university: ['filiere'],
      studentAddress: ['address', 'commune', 'province', 'email1', 'phone'],
      bac: ['year', 'grade', 'bacType', 'institution', 'serie']
    }

    // Check personal info
    for (const field of requiredFields.personal) {
      if (!personalInfo[field as keyof typeof personalInfo]) {
        throw new Error(`Le champ ${field} est obligatoire dans les informations personnelles`)
      }
    }

    // Check university info
    for (const field of requiredFields.university) {
      if (!universityInfo[field as keyof typeof universityInfo]) {
        throw new Error(`Le champ ${field} est obligatoire dans les informations universitaires`)
      }
    }

    // Check student address
    for (const field of requiredFields.studentAddress) {
      if (!studentAddress[field as keyof typeof studentAddress]) {
        throw new Error(`Le champ ${field} est obligatoire dans l'adresse de l'étudiant`)
      }
    }

    // Check bac info
    for (const field of requiredFields.bac) {
      if (!bacInfo[field as keyof typeof bacInfo]) {
        throw new Error(`Le champ ${field} est obligatoire dans les informations du baccalauréat`)
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (studentAddress.email1 && !emailRegex.test(studentAddress.email1)) {
      throw new Error('L\'email principal n\'est pas valide')
    }
    if (studentAddress.email2 && !emailRegex.test(studentAddress.email2)) {
      throw new Error('L\'email secondaire n\'est pas valide')
    }

    // Phone validation
    const phoneRegex = /^(\+212|0)[5-7][0-9]{8}$/
    if (studentAddress.phone && !phoneRegex.test(studentAddress.phone)) {
      throw new Error('Le numéro de téléphone n\'est pas valide')
    }
  }

  useEffect(() => {
    if (dbError) {
      setErrorMessage("Erreur d'initialisation de la base de données: " + dbError.message)
    }
  }, [dbError])

  const handleSave = async () => {
    if (!isDatabaseReady) {
      setErrorMessage("La base de données n'est pas prête")
      return
    }

    setErrorMessage("")
    setIsLoading(true)

    try {
      // Validate form
      validateForm()

      await dbExecute(async (repos) => {
        // Generate IDs if not exists
        if (!personalInfo.id) {
          personalInfo.id = crypto.randomUUID()
        }
        
        // Save personal info
        if (personalInfo.id) {
          const exists = await repos.personalInfo.getById(personalInfo.id)
          if (exists) {
            await repos.personalInfo.update(personalInfo.id, personalInfo)
          } else {
            await repos.personalInfo.add(personalInfo)
          }
        }

        // Save university info
        if (universityInfo.id) {
          const exists = await repos.university.getById(universityInfo.id)
          if (exists) {
            await repos.university.update(universityInfo.id, { ...universityInfo, studentId: personalInfo.id })
          } else {
            await repos.university.add({ ...universityInfo, studentId: personalInfo.id })
          }
        } else {
          await repos.university.add({
            ...universityInfo,
            id: crypto.randomUUID(),
            studentId: personalInfo.id
          })
        }

        // Save addresses
        if (studentAddress.id) {
          const exists = await repos.address.getById(studentAddress.id)
          if (exists) {
            await repos.address.update(studentAddress.id, { ...studentAddress, studentId: personalInfo.id })
          } else {
            await repos.address.add({ ...studentAddress, studentId: personalInfo.id })
          }
        } else {
          await repos.address.add({
            ...studentAddress,
            id: crypto.randomUUID(),
            studentId: personalInfo.id
          })
        }

        if (parentAddress.id) {
          const exists = await repos.address.getById(parentAddress.id)
          if (exists) {
            await repos.address.update(parentAddress.id, { ...parentAddress, studentId: personalInfo.id })
          } else {
            await repos.address.add({ ...parentAddress, studentId: personalInfo.id })
          }
        } else {
          await repos.address.add({
            ...parentAddress,
            id: crypto.randomUUID(),
            studentId: personalInfo.id
          })
        }

        // Save baccalaureat info
        if (bacInfo.id) {
          const exists = await repos.baccalaureat.getById(bacInfo.id)
          if (exists) {
            await repos.baccalaureat.update(bacInfo.id, { ...bacInfo, studentId: personalInfo.id })
          } else {
            await repos.baccalaureat.add({ ...bacInfo, studentId: personalInfo.id })
          }
        } else {
          await repos.baccalaureat.add({
            ...bacInfo,
            id: crypto.randomUUID(),
            studentId: personalInfo.id
          })
        }

        // Save higher education info
        if (bac2Info.id) {
          const exists = await repos.higherEducation.getById(bac2Info.id)
          if (exists) {
            await repos.higherEducation.update(bac2Info.id, { ...bac2Info, studentId: personalInfo.id })
          } else {
            await repos.higherEducation.add({ ...bac2Info, studentId: personalInfo.id })
          }
        } else {
          await repos.higherEducation.add({
            ...bac2Info,
            id: crypto.randomUUID(),
            studentId: personalInfo.id
          })
        }

        if (bac3Info.id) {
          const exists = await repos.higherEducation.getById(bac3Info.id)
          if (exists) {
            await repos.higherEducation.update(bac3Info.id, { ...bac3Info, studentId: personalInfo.id })
          } else {
            await repos.higherEducation.add({ ...bac3Info, studentId: personalInfo.id })
          }
        } else {
          await repos.higherEducation.add({
            ...bac3Info,
            id: crypto.randomUUID(),
            studentId: personalInfo.id
          })
        }

        if (bac5Info.id) {
          const exists = await repos.higherEducation.getById(bac5Info.id)
          if (exists) {
            await repos.higherEducation.update(bac5Info.id, { ...bac5Info, studentId: personalInfo.id })
          } else {
            await repos.higherEducation.add({ ...bac5Info, studentId: personalInfo.id })
          }
        } else {
          await repos.higherEducation.add({
            ...bac5Info,
            id: crypto.randomUUID(),
            studentId: personalInfo.id
          })
        }

        // Save complementary info
        if (complementaryInfo.id) {
          const exists = await repos.complementary.getById(complementaryInfo.id)
          if (exists) {
            await repos.complementary.update(complementaryInfo.id, { ...complementaryInfo, studentId: personalInfo.id })
          } else {
            await repos.complementary.add({ ...complementaryInfo, studentId: personalInfo.id })
          }
        } else {
          await repos.complementary.add({
            ...complementaryInfo,
            id: crypto.randomUUID(),
            studentId: personalInfo.id
          })
        }
      })

      setIsEditing(false)
      setPersonalInfoDialogOpen(false)
      setHasUnsavedChanges(false)
      showSuccess("Informations enregistrées avec succès!")
    } catch (error) {
      console.error("Error saving data:", error)
      setErrorMessage(error instanceof Error ? error.message : "Une erreur est survenue lors de l'enregistrement")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('Voulez-vous vraiment annuler? Toutes les modifications non enregistrées seront perdues.')) {
        setIsEditing(false)
        setHasUnsavedChanges(false)
      }
    } else {
      setIsEditing(false)
    }
  }

  // Load data from database on mount
  useEffect(() => {
    const loadData = async () => {
      if (!isDatabaseReady) {
        setErrorMessage("La base de données n'est pas prête")
        return
      }
      
      setIsLoading(true)
      setErrorMessage("")
      try {
        await dbExecute(async (repos) => {
          // Load personal info
          const personalData = await repos.personalInfo.getAll()
          if (personalData.length > 0) {
            setPersonalInfo(personalData[0])
          }

          // Load university info
          const universityData = await repos.university.getAll()
          if (universityData.length > 0) {
            setUniversityInfo(universityData[0])
          }

          // Load addresses
          const addresses = await repos.address.getAll()
          const studentAddr = addresses.find(a => a.type === "student")
          const parentAddr = addresses.find(a => a.type === "parent")
          if (studentAddr) setStudentAddress(studentAddr)
          if (parentAddr) setParentAddress(parentAddr)

          // Load baccalaureat info
          const bacData = await repos.baccalaureat.getAll()
          if (bacData.length > 0) {
            setBacInfo(bacData[0])
          }

          // Load higher education info
          const heData = await repos.higherEducation.getAll()
          heData.forEach(data => {
            switch (data.level) {
              case "bac+2":
                setBac2Info(data)
                break
              case "bac+3":
                setBac3Info(data)
                break
              case "bac+5":
                setBac5Info(data)
                break
            }
          })

          // Load complementary info
          const complementaryData = await repos.complementary.getAll()
          if (complementaryData.length > 0) {
            setComplementaryInfo(complementaryData[0])
          }
        })
      } catch (error) {
        console.error("Error loading data:", error)
        setErrorMessage(error instanceof Error ? error.message : "Une erreur est survenue lors du chargement des données")
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [isDatabaseReady])

  const showSuccess = (message: string) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const getProfileCompletion = () => {
    const requiredFields = {
      personal: ['cne', 'cin', 'firstName', 'lastName', 'birthDate', 'birthPlace', 'birthProvince', 'gender', 'nationality'],
      university: ['filiere'],
      studentAddress: ['address', 'commune', 'province', 'email1', 'phone'],
      bac: ['year', 'grade', 'bacType', 'institution', 'serie'],
      parentAddress: ['address', 'commune', 'province']
    }

    const filledFields = {
      personal: requiredFields.personal.filter(field => personalInfo[field as keyof typeof personalInfo]).length,
      university: requiredFields.university.filter(field => universityInfo[field as keyof typeof universityInfo]).length,
      studentAddress: requiredFields.studentAddress.filter(field => studentAddress[field as keyof typeof studentAddress]).length,
      parentAddress: requiredFields.parentAddress.filter(field => parentAddress[field as keyof typeof parentAddress]).length,
      bac: requiredFields.bac.filter(field => bacInfo[field as keyof typeof bacInfo]).length
    }

    const requiredCounts = {
      personal: requiredFields.personal.length,
      university: requiredFields.university.length,
      studentAddress: requiredFields.studentAddress.length,
      parentAddress: requiredFields.parentAddress.length,
      bac: requiredFields.bac.length
    }

    const totalRequired = Object.values(requiredCounts).reduce((a, b) => a + b, 0)
    const totalFilled = Object.values(filledFields).reduce((a, b) => a + b, 0)
    
    return Math.round((totalFilled / totalRequired) * 100)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Form Assistant</h1>
          <p className="text-gray-600 mb-6">Enter your information once, let AI handle the form filling</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button 
              onClick={() => setPersonalInfoDialogOpen(true)}
              className="flex items-center space-x-2"
              size="lg"
            >
              <User className="h-5 w-5" />
              <span>Update Your Information</span>
            </Button>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Profile Completion:</span>
              <Badge variant="secondary" className="text-base">
                {getProfileCompletion()}%
              </Badge>
            </div>
            {/* Import/Export Buttons */}
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={handleExportData}
            >
              <FileText className="h-5 w-5" />
              <span>Export Data</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={() => document.getElementById('import-data-input')?.click()}
            >
              <FileCheck className="h-5 w-5" />
              <span>Import Data</span>
            </Button>
            <input
              id="import-data-input"
              type="file"
              accept="application/json"
              style={{ display: 'none' }}
              onChange={handleImportData}
            />
          </div>
        </div>
  {/* // ...existing code... */}

        {/* Instructions Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How it works</CardTitle>
            <CardDescription>Three simple steps to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-full mt-1">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-900">1. Enter Your Information</h3>
                  <p className="text-blue-700">Fill out your personal details completely and accurately</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                <div className="p-2 bg-green-100 rounded-full mt-1">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-900">2. AI Does the Work</h3>
                  <p className="text-green-700">Our AI automatically understands and maps your information to any form</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
                <div className="p-2 bg-purple-100 rounded-full mt-1">
                  <AlertCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-purple-900">3. Review and Submit</h3>
                  <p className="text-purple-700">Quickly review the AI-filled forms before submission</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {successMessage && (
          <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-lg">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="fixed bottom-4 right-4 bg-red-100 text-red-800 px-4 py-2 rounded-lg shadow-lg">
            {errorMessage}
          </div>
        )}

        {/* Personal Information Dialog */}
        <Dialog open={personalInfoDialogOpen} onOpenChange={setPersonalInfoDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-2xl">Personal Information</DialogTitle>
                  <DialogDescription>Enter your personal information for AI-powered form filling</DialogDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} className="flex items-center space-x-2">
                      <Edit className="h-4 w-4" />
                      <span>Edit Information</span>
                    </Button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                      <Button 
                        onClick={handleSave} 
                        className="flex items-center space-x-2"
                        disabled={isLoading}
                      >
                        <Save className="h-4 w-4" />
                        <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informations Personnelles</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cne">CNE</Label>
                    <Input
                      id="cne"
                      value={personalInfo.cne}
                      onChange={(e) => handleInputChange("personal", "cne", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cin">CIN</Label>
                    <Input
                      id="cin"
                      value={personalInfo.cin}
                      onChange={(e) => handleInputChange("personal", "cin", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="firstName">Prénom (Fr)</Label>
                    <Input
                      id="firstName"
                      value={personalInfo.firstName}
                      onChange={(e) => handleInputChange("personal", "firstName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="firstNameAr">الإسم</Label>
                    <Input
                      id="firstNameAr"
                      dir="rtl"
                      value={personalInfo.firstNameAr}
                      onChange={(e) => handleInputChange("personal", "firstNameAr", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom (Fr)</Label>
                    <Input
                      id="lastName"
                      value={personalInfo.lastName}
                      onChange={(e) => handleInputChange("personal", "lastName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastNameAr">النسب</Label>
                    <Input
                      id="lastNameAr"
                      dir="rtl"
                      value={personalInfo.lastNameAr}
                      onChange={(e) => handleInputChange("personal", "lastNameAr", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthDate">Date de Naissance</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={personalInfo.birthDate}
                      onChange={(e) => handleInputChange("personal", "birthDate", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthPlace">Lieu de Naissance</Label>
                    <Input
                      id="birthPlace"
                      value={personalInfo.birthPlace}
                      onChange={(e) => handleInputChange("personal", "birthPlace", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthPlaceAr">مكان الإزدياد</Label>
                    <Input
                      id="birthPlaceAr"
                      dir="rtl"
                      value={personalInfo.birthPlaceAr}
                      onChange={(e) => handleInputChange("personal", "birthPlaceAr", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthProvince">Province de Naissance</Label>
                    <Input
                      id="birthProvince"
                      value={personalInfo.birthProvince}
                      onChange={(e) => handleInputChange("personal", "birthProvince", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthCountry">Pays de Naissance</Label>
                    <Input
                      id="birthCountry"
                      value={personalInfo.birthCountry}
                      onChange={(e) => handleInputChange("personal", "birthCountry", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Genre</Label>
                    <Select
                      value={personalInfo.gender}
                      onValueChange={(value) => handleInputChange("personal", "gender", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">Masculin</SelectItem>
                        <SelectItem value="F">Féminin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="nationality">Nationalité</Label>
                    <Input
                      id="nationality"
                      value={personalInfo.nationality}
                      onChange={(e) => handleInputChange("personal", "nationality", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="civilStatus">État Civil</Label>
                    <Select
                      value={personalInfo.civilStatus}
                      onValueChange={(value) => handleInputChange("personal", "civilStatus", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner l'état civil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="célibataire">Célibataire</SelectItem>
                        <SelectItem value="marié">Marié(e)</SelectItem>
                        <SelectItem value="divorcé">Divorcé(e)</SelectItem>
                        <SelectItem value="veuf">Veuf/Veuve</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="handicap">Situation de Handicap</Label>
                    <Switch
                      id="handicap"
                      checked={personalInfo.handicap}
                      onCheckedChange={(checked) => handleInputChange("personal", "handicap", checked)}
                      disabled={!isEditing}
                    />
                  </div>
                  {personalInfo.handicap && (
                    <>
                      <div>
                        <Label htmlFor="handicapType">Type de Handicap</Label>
                        <Input
                          id="handicapType"
                          value={personalInfo.handicapType || ""}
                          onChange={(e) => handleInputChange("personal", "handicapType", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="handicapCause">Cause du Handicap</Label>
                        <Input
                          id="handicapCause"
                          value={personalInfo.handicapCause || ""}
                          onChange={(e) => handleInputChange("personal", "handicapCause", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Student Address Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Adresse de l&apos;Étudiant</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="studentAddress">Adresse</Label>
                    <Input
                      id="studentAddress"
                      value={studentAddress.address}
                      onChange={(e) => handleInputChange("studentAddress", "address", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="studentAddressAr">العنوان</Label>
                    <Input
                      id="studentAddressAr"
                      dir="rtl"
                      value={studentAddress.addressAr}
                      onChange={(e) => handleInputChange("studentAddress", "addressAr", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentPostalCode">Code Postal</Label>
                    <Input
                      id="studentPostalCode"
                      value={studentAddress.postalCode}
                      onChange={(e) => handleInputChange("studentAddress", "postalCode", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentCommune">Commune</Label>
                    <Input
                      id="studentCommune"
                      value={studentAddress.commune}
                      onChange={(e) => handleInputChange("studentAddress", "commune", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentProvince">Province</Label>
                    <Input
                      id="studentProvince"
                      value={studentAddress.province}
                      onChange={(e) => handleInputChange("studentAddress", "province", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentCountry">Pays</Label>
                    <Input
                      id="studentCountry"
                      value={studentAddress.country}
                      onChange={(e) => handleInputChange("studentAddress", "country", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentHousing">Type de Logement</Label>
                    <Input
                      id="studentHousing"
                      value={studentAddress.housing || ""}
                      onChange={(e) => handleInputChange("studentAddress", "housing", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentEmail1">Email Principal</Label>
                    <Input
                      id="studentEmail1"
                      type="email"
                      value={studentAddress.email1 || ""}
                      onChange={(e) => handleInputChange("studentAddress", "email1", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentEmail2">Email Secondaire</Label>
                    <Input
                      id="studentEmail2"
                      type="email"
                      value={studentAddress.email2 || ""}
                      onChange={(e) => handleInputChange("studentAddress", "email2", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentPhone">Téléphone</Label>
                    <Input
                      id="studentPhone"
                      value={studentAddress.phone}
                      onChange={(e) => handleInputChange("studentAddress", "phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Parent Address Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Adresse des Parents</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="parentAddress">Adresse</Label>
                    <Input
                      id="parentAddress"
                      value={parentAddress.address}
                      onChange={(e) => handleInputChange("parentAddress", "address", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="parentAddressAr">العنوان</Label>
                    <Input
                      id="parentAddressAr"
                      dir="rtl"
                      value={parentAddress.addressAr}
                      onChange={(e) => handleInputChange("parentAddress", "addressAr", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="parentPostalCode">Code Postal</Label>
                    <Input
                      id="parentPostalCode"
                      value={parentAddress.postalCode}
                      onChange={(e) => handleInputChange("parentAddress", "postalCode", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="parentCommune">Commune</Label>
                    <Input
                      id="parentCommune"
                      value={parentAddress.commune}
                      onChange={(e) => handleInputChange("parentAddress", "commune", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="parentProvince">Province</Label>
                    <Input
                      id="parentProvince"
                      value={parentAddress.province}
                      onChange={(e) => handleInputChange("parentAddress", "province", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="parentCountry">Pays</Label>
                    <Input
                      id="parentCountry"
                      value={parentAddress.country}
                      onChange={(e) => handleInputChange("parentAddress", "country", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="parentPhone">Téléphone</Label>
                    <Input
                      id="parentPhone"
                      value={parentAddress.phone}
                      onChange={(e) => handleInputChange("parentAddress", "phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="parentStatus">Statut du Parent</Label>
                    <Input
                      id="parentStatus"
                      value={parentAddress.parentStatus || ""}
                      onChange={(e) => handleInputChange("parentAddress", "parentStatus", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* University Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informations Universitaires</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="academicYear">Année Académique</Label>
                    <Input
                      id="academicYear"
                      value={universityInfo.academicYear}
                      onChange={(e) => handleInputChange("university", "academicYear", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="filiere">Filière</Label>
                    <Input
                      id="filiere"
                      value={universityInfo.filiere}
                      onChange={(e) => handleInputChange("university", "filiere", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Baccalaureat Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Baccalauréat</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bacYear">Année d&apos;obtention</Label>
                    <Input
                      id="bacYear"
                      value={bacInfo.year}
                      onChange={(e) => handleInputChange("bac", "year", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bacGrade">Note</Label>
                    <Input
                      id="bacGrade"
                      type="number"
                      step="0.01"
                      value={bacInfo.grade}
                      onChange={(e) => handleInputChange("bac", "grade", parseFloat(e.target.value))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bacType">Type de Bac</Label>
                    <Input
                      id="bacType"
                      value={bacInfo.bacType}
                      onChange={(e) => handleInputChange("bac", "bacType", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bacInstitution">Établissement</Label>
                    <Input
                      id="bacInstitution"
                      value={bacInfo.institution}
                      onChange={(e) => handleInputChange("bac", "institution", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bacSerie">Série</Label>
                    <Input
                      id="bacSerie"
                      value={bacInfo.serie}
                      onChange={(e) => handleInputChange("bac", "serie", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bacMention">Mention</Label>
                    <Input
                      id="bacMention"
                      value={bacInfo.mention}
                      onChange={(e) => handleInputChange("bac", "mention", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bacAcademy">Académie</Label>
                    <Input
                      id="bacAcademy"
                      value={bacInfo.academy}
                      onChange={(e) => handleInputChange("bac", "academy", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bacProvince">Province</Label>
                    <Input
                      id="bacProvince"
                      value={bacInfo.province}
                      onChange={(e) => handleInputChange("bac", "province", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Bac+2 Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bac+2</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bac2Year">Année d&apos;obtention</Label>
                    <Input
                      id="bac2Year"
                      value={bac2Info.year}
                      onChange={(e) => handleInputChange("bac2", "year", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bac2DiplomaType">Type de Diplôme</Label>
                    <Input
                      id="bac2DiplomaType"
                      value={bac2Info.diplomaType}
                      onChange={(e) => handleInputChange("bac2", "diplomaType", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bac2Filiere">Filière</Label>
                    <Input
                      id="bac2Filiere"
                      value={bac2Info.filiere}
                      onChange={(e) => handleInputChange("bac2", "filiere", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bac2Institution">Établissement</Label>
                    <Input
                      id="bac2Institution"
                      value={bac2Info.institution}
                      onChange={(e) => handleInputChange("bac2", "institution", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bac2Province">Province</Label>
                    <Input
                      id="bac2Province"
                      value={bac2Info.province}
                      onChange={(e) => handleInputChange("bac2", "province", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Bac+3 Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bac+3</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bac3Year">Année d&apos;obtention</Label>
                    <Input
                      id="bac3Year"
                      value={bac3Info.year}
                      onChange={(e) => handleInputChange("bac3", "year", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bac3DiplomaType">Type de Diplôme</Label>
                    <Input
                      id="bac3DiplomaType"
                      value={bac3Info.diplomaType}
                      onChange={(e) => handleInputChange("bac3", "diplomaType", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bac3Filiere">Filière</Label>
                    <Input
                      id="bac3Filiere"
                      value={bac3Info.filiere}
                      onChange={(e) => handleInputChange("bac3", "filiere", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bac3Institution">Établissement</Label>
                    <Input
                      id="bac3Institution"
                      value={bac3Info.institution}
                      onChange={(e) => handleInputChange("bac3", "institution", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bac3Province">Province</Label>
                    <Input
                      id="bac3Province"
                      value={bac3Info.province}
                      onChange={(e) => handleInputChange("bac3", "province", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Bac+5 Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bac+5</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bac5Year">Année d&apos;obtention</Label>
                    <Input
                      id="bac5Year"
                      value={bac5Info.year}
                      onChange={(e) => handleInputChange("bac5", "year", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bac5DiplomaType">Type de Diplôme</Label>
                    <Input
                      id="bac5DiplomaType"
                      value={bac5Info.diplomaType}
                      onChange={(e) => handleInputChange("bac5", "diplomaType", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bac5Filiere">Filière</Label>
                    <Input
                      id="bac5Filiere"
                      value={bac5Info.filiere}
                      onChange={(e) => handleInputChange("bac5", "filiere", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bac5Institution">Établissement</Label>
                    <Input
                      id="bac5Institution"
                      value={bac5Info.institution}
                      onChange={(e) => handleInputChange("bac5", "institution", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bac5Province">Province</Label>
                    <Input
                      id="bac5Province"
                      value={bac5Info.province}
                      onChange={(e) => handleInputChange("bac5", "province", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Complementary Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informations Complémentaires</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="institutionDate">Date Institution</Label>
                    <Input
                      id="institutionDate"
                      type="date"
                      value={complementaryInfo.institutionDate}
                      onChange={(e) => handleInputChange("complementary", "institutionDate", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentStatus">Statut de l&apos;Étudiant</Label>
                    <Input
                      id="studentStatus"
                      value={complementaryInfo.studentStatus}
                      onChange={(e) => handleInputChange("complementary", "studentStatus", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="profession">Profession</Label>
                    <Input
                      id="profession"
                      value={complementaryInfo.profession || ""}
                      onChange={(e) => handleInputChange("complementary", "profession", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="employer">Employeur</Label>
                    <Input
                      id="employer"
                      value={complementaryInfo.employer || ""}
                      onChange={(e) => handleInputChange("complementary", "employer", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}