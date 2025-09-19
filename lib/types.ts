// types.ts

// Helper type for Bac+ levels
export type BacLevel = "bac+2" | "bac+3" | "bac+5";

// 1️⃣ Personal Info
export interface PersonalInfo {
  id: string;
  cne: string;
  cin: string;
  firstName: string;
  lastName: string;
  firstNameAr: string;
  lastNameAr: string;
  birthDate: string;          // yyyy-mm-dd
  birthPlace: string;
  birthPlaceAr: string;
  birthProvince: string;
  birthCountry: string;       // default MAROC
  gender: "M" | "F";
  nationality: string;
  civilStatus: string;
  handicap: boolean;
  handicapType?: string;
  handicapCause?: string;
}

// 2️⃣ University Info
export interface UniversityInfo {
  id: string;
  studentId: string;           // FK → PersonalInfo.id
  academicYear: string;        // e.g., 2025/2026
  filiere: string;
}

// 3️⃣ Address Info
export interface AddressInfo {
  id: string;
  studentId: string;           // FK → PersonalInfo.id
  type: "student" | "parent";
  address: string;
  addressAr: string;
  postalCode: string;
  commune: string;
  province: string;
  country: string;             // default MAROC
  housing?: string;            // for student
  email1?: string;
  email2?: string;
  phone: string;
  parentStatus?: string;       // only if type=parent
}

// 4️⃣ Baccalaureat Info
export interface BaccalaureatInfo {
  id: string;
  studentId: string;           // FK → PersonalInfo.id
  year: string;
  grade: number;               // note
  bacType: string;             // scientifique, lettres, etc.
  institution: string;
  serie: string;
  mention: string;
  academy: string;
  province: string;
  country: string;             // default MAROC
}

// 5️⃣ Higher Education Info (Bac+2, Bac+3, Bac+5)
export interface HigherEducationInfo {
  id: string;
  studentId: string;           // FK → PersonalInfo.id
  level: BacLevel;
  year: string;
  grades?: {                    // S1-S10 flexible
    s1?: number;
    s2?: number;
    s3?: number;
    s4?: number;
    s5?: number;
    s6?: number;
    s7?: number;
    s8?: number;
    s9?: number;
    s10?: number;
  };
  diplomaGrade?: number;
  mention?: string;
  filiere: string;
  diplomaType: string;         // DUT, BTS, DTS, Licence, Master…
  institution: string;
  province: string;
  country: string;             // default MAROC
}

// 6️⃣ Documents
export interface DocumentInfo {
  id: string;
  studentId: string;           // FK → PersonalInfo.id
  type: string;                // e.g., "Demande manuscrite", "BAC", "CIN"
  fileName: string;
  fileSize: number;            // in bytes
  fileType: string;            // MIME type e.g., "application/pdf"
  fileContent: Blob | string;  // Blob or Base64 string
}

// 7️⃣ Complementary Info
export interface ComplementaryInfo {
  id: string;
  studentId: string;           // FK → PersonalInfo.id
  higherEduDate?: string;      // yyyy-mm-dd
  universityDate?: string;     // yyyy-mm-dd
  institutionDate: string;     // required
  studentStatus: string;       // inscrit, ancien étudiant, etc.
  profession?: string;
  employer?: string;
}
