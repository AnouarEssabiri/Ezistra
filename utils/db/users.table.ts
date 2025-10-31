import { PersonalInfo } from "@/lib/types";
import { BaseRepository } from "./base.repository";

/**
 * Users repository with extended methods for personalized queries
 */
export class Users extends BaseRepository<PersonalInfo> {
  storeName = "users";

  /**
   * Find users by CNE (identity number)
   */
  async findByCNE(cne: string): Promise<PersonalInfo | undefined> {
    return this.findByIndex("cne", cne).then(results => results[0]);
  }

  /**
   * Find users by CIN (identity card number)
   */
  async findByCIN(cin: string): Promise<PersonalInfo | undefined> {
    return this.findByIndex("cin", cin).then(results => results[0]);
  }

  /**
   * Find users by email
   */
  async findByEmail(email: string): Promise<PersonalInfo | undefined> {
    return this.findByIndex("email", email).then(results => results[0]);
  }

  /**
   * Search users by name (uses filter)
   */
  async searchByName(name: string): Promise<PersonalInfo[]> {
    const lowerName = name.toLowerCase();
    return this.filter(
      user =>
        user.firstName.toLowerCase().includes(lowerName) ||
        user.lastName.toLowerCase().includes(lowerName) ||
        user.firstNameAr.includes(name) ||
        user.lastNameAr.includes(name)
    );
  }

  /**
   * Find users by gender
   */
  async findByGender(gender: "M" | "F"): Promise<PersonalInfo[]> {
    return this.filter(user => user.gender === gender);
  }

  /**
   * Find users with handicap
   */
  async findWithHandicap(): Promise<PersonalInfo[]> {
    return this.filter(user => user.handicap === true);
  }
}
