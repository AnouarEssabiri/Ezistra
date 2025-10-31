import { HigherEducationInfo } from "@/lib/types";
import { BaseRepository } from "./base.repository";

/**
 * Higher Education repository with extended methods
 */
export class HigherEducation extends BaseRepository<HigherEducationInfo> {
  storeName = "higher_education";

  /**
   * Get higher education records by student ID
   */
  async getByStudentId(studentId: string): Promise<HigherEducationInfo[]> {
    return this.findByIndex("studentId", studentId);
  }

  /**
   * Get higher education records by level (bac+2, bac+3, bac+5)
   */
  async getByLevel(level: string): Promise<HigherEducationInfo[]> {
    return this.findByIndex("level", level);
  }

  /**
   * Get records by student and level
   */
  async getByStudentIdAndLevel(studentId: string, level: string): Promise<HigherEducationInfo[]> {
    return this.filter(
      rec => rec.studentId === studentId && rec.level === level
    );
  }
}

