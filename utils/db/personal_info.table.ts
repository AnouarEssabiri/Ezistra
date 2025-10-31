import { PersonalInfo } from "@/lib/types";
import { BaseRepository } from "./base.repository";

/**
 * Personal Info repository with extended methods
 */
export class PersonalInfoRepository extends BaseRepository<PersonalInfo> {
  storeName = "personal_info";

  /**
   * Find personal info by CNE (identity number)
   */
  async findByCNE(cne: string): Promise<PersonalInfo | undefined> {
    return this.findByIndex("cne", cne).then(results => results[0]);
  }

  /**
   * Find personal info by CIN (identity card number)
   */
  async findByCIN(cin: string): Promise<PersonalInfo | undefined> {
    return this.findByIndex("cin", cin).then(results => results[0]);
  }

  /**
   * Search by name (Arabic or French)
   */
  async searchByName(name: string): Promise<PersonalInfo[]> {
    const lowerName = name.toLowerCase();
    return this.filter(
      info =>
        info.firstName.toLowerCase().includes(lowerName) ||
        info.lastName.toLowerCase().includes(lowerName) ||
        info.firstNameAr.includes(name) ||
        info.lastNameAr.includes(name)
    );
  }
}