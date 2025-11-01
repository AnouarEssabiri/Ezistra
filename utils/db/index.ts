/**
 * Central IndexedDB database module
 * Exports all repositories and utilities
 */

import { Address } from "./address_info.table";
import { Baccalaureat } from "./baccalaureat_info.table";
import { Complementary } from "./complementary_info.table";
import { Documents } from "./documents.table";
import { HigherEducation } from "./higher_education.table";
import { PersonalInfoRepository } from "./personal_info.table";
import { University } from "./university_info.table";
import { Users } from "./users.table";

// Core
export { DB, storeDefinitions, type StoreDefinition } from "./index.table";

// Error handling
export { DatabaseError, NotFoundError, ValidationError, OperationError } from "./errors";

// Base repository
export { BaseRepository } from "./base.repository";

// Repositories
export { Users } from "./users.table";
export { Documents } from "./documents.table";
export { Address } from "./address_info.table";
export { University } from "./university_info.table";
export { HigherEducation } from "./higher_education.table";
export { Complementary } from "./complementary_info.table";
export { Baccalaureat } from "./baccalaureat_info.table";
export { PersonalInfoRepository } from "./personal_info.table";

// Migrations
export { migrations, getLatestVersion, getPendingMigrations, executeMigration } from "./migrations";
export type { Migration } from "./migrations";

/**
 * Database service for managing all repositories
 */
export class DatabaseService {
  private static instances: Map<string, any> = new Map();

  /**
   * Get or create a repository instance
   */
  static getRepository<T>(RepositoryClass: new () => T): T {
    const className = RepositoryClass.name;
    if (!this.instances.has(className)) {
      this.instances.set(className, new RepositoryClass());
    }
    return this.instances.get(className) as T;
  }

  /**
   * Get all repository instances
   */
  static getAllRepositories() {
    return {
      users: this.getRepository(Users as any),
      documents: this.getRepository(Documents as any),
      address: this.getRepository(Address as any),
      university: this.getRepository(University as any),
      higherEducation: this.getRepository(HigherEducation as any),
      complementary: this.getRepository(Complementary as any),
      baccalaureat: this.getRepository(Baccalaureat as any),
      personalInfo: this.getRepository(PersonalInfoRepository as any),
    };
  }

  /**
   * Clear all repositories cache
   */
  static clearCache(): void {
    this.instances.clear();
  }
}

// Export as default
export default DatabaseService;
