import { ComplementaryInfo } from "@/lib/types";
import { BaseRepository } from "./base.repository";

/**
 * Complementary repository with extended methods
 */
export class Complementary extends BaseRepository<ComplementaryInfo> {
  storeName = "complementary";

  /**
   * Get complementary info by student ID
   */
  async getByStudentId(studentId: string): Promise<ComplementaryInfo[]> {
    return this.findByIndex("studentId", studentId);
  }

  /**
   * Get records by student status
   */
  async getByStatus(status: string): Promise<ComplementaryInfo[]> {
    return this.findByIndex("studentStatus", status);
  }

  /**
   * Get active/current students
   */
  async getActiveStudents(): Promise<ComplementaryInfo[]> {
    return this.filter(rec => rec.studentStatus === "inscrit");
  }

  /**
   * Get alumni
   */
  async getAlumni(): Promise<ComplementaryInfo[]> {
    return this.filter(rec => rec.studentStatus === "ancien étudiant");
  }
}
