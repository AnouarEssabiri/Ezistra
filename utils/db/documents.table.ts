import { DocumentInfo } from "@/lib/types";
import { BaseRepository } from "./base.repository";

/**
 * Documents repository with extended methods
 */
export class Documents extends BaseRepository<DocumentInfo> {
  storeName = "documents";

  /**
   * Get all documents for a specific student
   */
  async getByStudentId(studentId: string): Promise<DocumentInfo[]> {
    return this.findByIndex("studentId", studentId);
  }

  /**
   * Get documents by type
   */
  async getByType(type: string): Promise<DocumentInfo[]> {
    return this.findByIndex("type", type);
  }

  /**
   * Get documents by student ID and type
   */
  async getByStudentIdAndType(studentId: string, type: string): Promise<DocumentInfo[]> {
    return this.filter(
      doc => doc.studentId === studentId && doc.type === type
    );
  }

  /**
   * Search documents by file name
   */
  async searchByFileName(fileName: string): Promise<DocumentInfo[]> {
    const searchTerm = fileName.toLowerCase();
    return this.filter(
      doc => doc.fileName.toLowerCase().includes(searchTerm)
    );
  }
}
