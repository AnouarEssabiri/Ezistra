import { AddressInfo } from "@/lib/types";
import { BaseRepository } from "./base.repository";

/**
 * Address repository with extended methods
 */
export class Address extends BaseRepository<AddressInfo> {
  storeName = "address";

  /**
   * Get addresses by student ID
   */
  async getByStudentId(studentId: string): Promise<AddressInfo[]> {
    return this.findByIndex("studentId", studentId);
  }

  /**
   * Get student addresses (not parent)
   */
  async getStudentAddresses(studentId: string): Promise<AddressInfo[]> {
    return this.filter(
      addr => addr.studentId === studentId && addr.type === "student"
    );
  }

  /**
   * Get parent addresses
   */
  async getParentAddresses(studentId: string): Promise<AddressInfo[]> {
    return this.filter(
      addr => addr.studentId === studentId && addr.type === "parent"
    );
  }

  /**
   * Find address by email
   */
  async findByEmail(email: string): Promise<AddressInfo | undefined> {
    return this.findByIndex("email", email).then(results => results[0]);
  }
}
