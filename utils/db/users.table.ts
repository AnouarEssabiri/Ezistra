import { PersonalInfo } from "@/lib/types";
import { DB } from "./index.table";

/**
 * CRUD operations for users store in IndexedDB.
 */
export class Users {
  /**
   * Add a new user.
   * @param user PersonalInfo object
   * @returns Promise<number | undefined> - New user ID
   */
  async add(user: PersonalInfo): Promise<number | undefined> {
    try {
      const db = await DB();
      const tx = db.transaction("users", "readwrite");
      const id = await tx.store.add(user);
      await tx.done;
      return typeof id === "number" ? id : undefined;
    } catch (error) {
      console.error("Failed to add user info:", error);
      return undefined;
    }
  }

  /**
   * Get all users.
   */
  async getAll(): Promise<PersonalInfo[]> {
    try {
      const db = await DB();
      const tx = db.transaction("users", "readonly");
      const result = await tx.store.getAll();
      await tx.done;
      return result;
    } catch (error) {
      console.error("Failed to get all users info:", error);
      return [];
    }
  }

  /**
   * Get user by ID.
   */
  async getById(id: number): Promise<PersonalInfo | undefined> {
    try {
      const db = await DB();
      const tx = db.transaction("users", "readonly");
      const result = await tx.store.get(id);
      await tx.done;
      return result;
    } catch (error) {
      console.error("Failed to get user info:", error);
      return undefined;
    }
  }

  /**
   * Update user by ID.
   * @returns Promise<boolean> - true if updated, false otherwise
   */
  async update(id: number, updated: Partial<PersonalInfo>): Promise<boolean> {
    try {
      const db = await DB();
      const tx = db.transaction("users", "readwrite");
      const exsit: PersonalInfo | undefined = await tx.store.get(id);
      if (exsit) {
        await tx.store.put({ ...exsit, ...updated });
        await tx.done;
        return true;
      }
      await tx.done;
      return false;
    } catch (error) {
      console.error("Failed to update user info:", error);
      return false;
    }
  }

  /**
   * Delete user by ID.
   * @returns Promise<boolean> - true if deleted, false otherwise
   */
  async delete(id: number): Promise<boolean> {
    try {
      const db = await DB();
      const tx = db.transaction("users", "readwrite");
      await tx.store.delete(id);
      await tx.done;
      return true;
    } catch (error) {
      console.error("Failed to delete user info:", error);
      return false;
    }
  }
}