import { UniversityInfo } from "@/lib/types";
import { BaseRepository } from "./base.repository";

/**
 * University repository with extended methods
 */
export class University extends BaseRepository<UniversityInfo> {
  storeName = "university";

  /**
   * Get university info by student ID
   */
  async getByStudentId(studentId: string): Promise<UniversityInfo[]> {
    return this.findByIndex("studentId", studentId);
  }

  /**
   * Get university info by academic year
   */
  async getByAcademicYear(academicYear: string): Promise<UniversityInfo[]> {
    return this.findByIndex("academicYear", academicYear);
  }

  /**
   * Get current academic year info for a student
   */
  async getCurrentYearInfo(studentId: string): Promise<UniversityInfo | undefined> {
    const currentYear = new Date().getFullYear();
    const academicYear = `${currentYear}/${currentYear + 1}`;
    const results = await this.filter(
      info => info.studentId === studentId && info.academicYear === academicYear
    );
    return results[0];
  }
}
