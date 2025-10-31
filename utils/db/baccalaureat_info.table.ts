import { BaccalaureatInfo } from "@/lib/types";
import { BaseRepository } from "./base.repository";

/**
 * Baccalaureat repository with extended methods
 */
export class Baccalaureat extends BaseRepository<BaccalaureatInfo> {
  storeName = "baccalaureat";

  /**
   * Get baccalaureat records by student ID
   */
  async getByStudentId(studentId: string): Promise<BaccalaureatInfo[]> {
    return this.findByIndex("studentId", studentId);
  }

  /**
   * Get records by year
   */
  async getByYear(year: string): Promise<BaccalaureatInfo[]> {
    return this.findByIndex("year", year);
  }

  /**
   * Get records by type (scientifique, lettres, etc.)
   */
  async getByType(bacType: string): Promise<BaccalaureatInfo[]> {
    return this.filter(rec => rec.bacType === bacType);
  }

  /**
   * Get high performers (grade >= 16)
   */
  async getHighPerformers(): Promise<BaccalaureatInfo[]> {
    return this.filter(rec => rec.grade >= 16);
  }
}
