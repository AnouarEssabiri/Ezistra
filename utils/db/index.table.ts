import { openDB } from "idb";
import type { IDBPDatabase } from "idb";

/**
 * Store definitions with indexes for faster queries
 */
interface StoreDefinition {
  name: string;
  options: IDBObjectStoreParameters;
  indexes?: Array<{
    name: string;
    keyPath: string | string[];
    options?: IDBIndexParameters;
  }>;
}

const storeDefinitions: StoreDefinition[] = [
  {
    name: "users",
    options: { keyPath: "id", autoIncrement: true },
    indexes: [
      { name: "cne", keyPath: "cne" },
      { name: "cin", keyPath: "cin" },
      { name: "email", keyPath: "email1" },
    ]
  },
  {
    name: "documents",
    options: { keyPath: "id", autoIncrement: true },
    indexes: [
      { name: "studentId", keyPath: "studentId" },
      { name: "type", keyPath: "type" },
    ]
  },
  {
    name: "university",
    options: { keyPath: "id", autoIncrement: true },
    indexes: [
      { name: "studentId", keyPath: "studentId" },
      { name: "academicYear", keyPath: "academicYear" },
    ]
  },
  {
    name: "higher_education",
    options: { keyPath: "id", autoIncrement: true },
    indexes: [
      { name: "studentId", keyPath: "studentId" },
      { name: "level", keyPath: "level" },
    ]
  },
  {
    name: "complementary",
    options: { keyPath: "id", autoIncrement: true },
    indexes: [
      { name: "studentId", keyPath: "studentId" },
      { name: "studentStatus", keyPath: "studentStatus" },
    ]
  },
  {
    name: "address",
    options: { keyPath: "id", autoIncrement: true },
    indexes: [
      { name: "studentId", keyPath: "studentId" },
      { name: "type", keyPath: "type" },
      { name: "email", keyPath: "email1" },
    ]
  },
  {
    name: "baccalaureat",
    options: { keyPath: "id", autoIncrement: true },
    indexes: [
      { name: "studentId", keyPath: "studentId" },
      { name: "year", keyPath: "year" },
    ]
  },
  {
    name: "personal_info",
    options: { keyPath: "id", autoIncrement: true },
    indexes: [
      { name: "cne", keyPath: "cne" },
      { name: "cin", keyPath: "cin" },
    ]
  },
  {
    name: "university_info",
    options: { keyPath: "id", autoIncrement: true },
    indexes: [
      { name: "studentId", keyPath: "studentId" },
      { name: "academicYear", keyPath: "academicYear" },
    ]
  },
];

/**
 * Create all stores and their indexes
 */
function upgradeDB(db: IDBPDatabase) {
  storeDefinitions.forEach(storeDefinition => {
    // Create object store if it doesn't exist
    if (!db.objectStoreNames.contains(storeDefinition.name)) {
      const store = db.createObjectStore(
        storeDefinition.name,
        storeDefinition.options
      );

      // Create indexes
      if (storeDefinition.indexes) {
        storeDefinition.indexes.forEach(index => {
          if (!store.indexNames.contains(index.name)) {
            store.createIndex(
              index.name,
              index.keyPath,
              index.options || { unique: false }
            );
          }
        });
      }
    } else {
      // For existing stores in upgrade mode, create missing indexes if needed
      if (storeDefinition.indexes) {
        const transaction = db.transaction(storeDefinition.name);
        const store = transaction.store;
        storeDefinition.indexes.forEach(index => {
          try {
            if (!store?.indexNames.contains(index.name)) {
              store?.createIndex(
                index.name,
                index.keyPath,
                index.options || { unique: false }
              );
            }
          } catch (e) {
            // Index might already exist, ignore error
          }
        });
      }
    }
  });
}

/**
 * Initialize IndexedDB with schema and migrations
 */
export async function DB() {
  return openDB("ezistraDB", 1, {
    upgrade(db) {
      upgradeDB(db);
    }
  });
}

/**
 * Export database utilities
 */
export { storeDefinitions };
export type { StoreDefinition };
