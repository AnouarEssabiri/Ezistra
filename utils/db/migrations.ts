import type { IDBPDatabase } from "idb";

/**
 * Migration interface for version upgrades
 */
export interface Migration {
  version: number;
  description: string;
  upgrade: (db: IDBPDatabase) => Promise<void> | void;
}

/**
 * Schema migrations for database versions
 */
export const migrations: Migration[] = [
  {
    version: 1,
    description: "Initial schema with all stores and indexes",
    upgrade: async (db: IDBPDatabase) => {
      // Already handled by upgradeDB in index.table.ts
      console.log("Database v1 initialized");
    },
  },
  // Future migrations can be added here
  // Example:
  // {
  //   version: 2,
  //   description: "Add new store or index",
  //   upgrade: async (db: IDBPDatabase) => {
  //     // Migration logic
  //   },
  // },
];

/**
 * Get the latest migration version
 */
export function getLatestVersion(): number {
  return migrations.length;
}

/**
 * Get pending migrations from current version
 */
export function getPendingMigrations(currentVersion: number): Migration[] {
  return migrations.filter(m => m.version > currentVersion);
}

/**
 * Execute migration
 */
export async function executeMigration(migration: Migration, db: IDBPDatabase): Promise<void> {
  try {
    await migration.upgrade(db);
    console.log(`Migration v${migration.version} completed: ${migration.description}`);
  } catch (error) {
    console.error(`Migration v${migration.version} failed:`, error);
    throw error;
  }
}
