import { DB } from "./index.table";
import { OperationError, NotFoundError, ValidationError } from "./errors";

/**
 * Generic repository for common CRUD operations
 * All table classes should extend this
 */
export abstract class BaseRepository<T> {
  abstract storeName: string;

  /**
   * Add a new record
   */
  async add(data: T): Promise<string | number | undefined> {
    try {
      if (!data) {
        throw new ValidationError(`Cannot add null or undefined data to ${this.storeName}`);
      }
      const db = await DB();
      const tx = db.transaction(this.storeName, "readwrite");
      const id = await tx.store.add(data);
      await tx.done;
      return typeof id === "string" || typeof id === "number" ? id : undefined;
    } catch (error) {
      if (error instanceof ValidationError) throw error;
      throw new OperationError("add", this.storeName, error);
    }
  }

  /**
   * Get all records
   */
  async getAll(): Promise<T[]> {
    try {
      const db = await DB();
      const tx = db.transaction(this.storeName, "readonly");
      const result = await tx.store.getAll();
      await tx.done;
      return result;
    } catch (error) {
      throw new OperationError("getAll", this.storeName, error);
    }
  }

  /**
   * Get record by ID
   */
  async getById(id: string | number): Promise<T | undefined> {
    try {
      const db = await DB();
      const tx = db.transaction(this.storeName, "readonly");
      const result = await tx.store.get(id);
      await tx.done;
      return result;
    } catch (error) {
      throw new OperationError("getById", this.storeName, error);
    }
  }

  /**
   * Update a record by ID
   */
  async update(id: string | number, updates: Partial<T>): Promise<boolean> {
    try {
      if (!updates || Object.keys(updates).length === 0) {
        throw new ValidationError("Update object cannot be empty");
      }
      const db = await DB();
      const tx = db.transaction(this.storeName, "readwrite");
      const existing = await tx.store.get(id);
      if (!existing) {
        throw new NotFoundError(this.storeName, id);
      }
      await tx.store.put({ ...existing, ...updates });
      await tx.done;
      return true;
    } catch (error) {
      if (error instanceof (ValidationError || NotFoundError)) throw error;
      throw new OperationError("update", this.storeName, error);
    }
  }

  /**
   * Delete a record by ID
   */
  async delete(id: string | number): Promise<boolean> {
    try {
      const db = await DB();
      const tx = db.transaction(this.storeName, "readwrite");
      const existing = await tx.store.get(id);
      if (!existing) {
        throw new NotFoundError(this.storeName, id);
      }
      await tx.store.delete(id);
      await tx.done;
      return true;
    } catch (error) {
      if (error instanceof (ValidationError || NotFoundError)) throw error;
      throw new OperationError("delete", this.storeName, error);
    }
  }

  /**
   * Count records
   */
  async count(): Promise<number> {
    try {
      const db = await DB();
      const tx = db.transaction(this.storeName, "readonly");
      const count = await tx.store.count();
      await tx.done;
      return count;
    } catch (error) {
      throw new OperationError("count", this.storeName, error);
    }
  }

  /**
   * Clear all records from the store
   */
  async clear(): Promise<boolean> {
    try {
      const db = await DB();
      const tx = db.transaction(this.storeName, "readwrite");
      await tx.store.clear();
      await tx.done;
      return true;
    } catch (error) {
      throw new OperationError("clear", this.storeName, error);
    }
  }

  /**
   * Find records by index (requires index to be defined)
   */
  async findByIndex(indexName: string, value: any): Promise<T[]> {
    try {
      const db = await DB();
      const tx = db.transaction(this.storeName, "readonly");
      const index = tx.store.index(indexName);
      const results = await index.getAll(value);
      await tx.done;
      return results;
    } catch (error) {
      throw new OperationError(`findByIndex:${indexName}`, this.storeName, error);
    }
  }

  /**
   * Find records with a filter function
   */
  async filter(predicate: (item: T) => boolean): Promise<T[]> {
    try {
      const all = await this.getAll();
      return all.filter(predicate);
    } catch (error) {
      throw new OperationError("filter", this.storeName, error);
    }
  }

  /**
   * Find first record matching predicate
   */
  async findOne(predicate: (item: T) => boolean): Promise<T | undefined> {
    try {
      const all = await this.getAll();
      return all.find(predicate);
    } catch (error) {
      throw new OperationError("findOne", this.storeName, error);
    }
  }

  /**
   * Batch add records
   */
  async addMany(data: T[]): Promise<(string | number | undefined)[]> {
    try {
      if (!Array.isArray(data) || data.length === 0) {
        throw new ValidationError("Data must be a non-empty array");
      }
      const db = await DB();
      const tx = db.transaction(this.storeName, "readwrite");
      const ids = [];
      for (const item of data) {
        const id = await tx.store.add(item);
        ids.push(id);
      }
      await tx.done;
      return ids;
    } catch (error) {
      if (error instanceof ValidationError) throw error;
      throw new OperationError("addMany", this.storeName, error);
    }
  }

  /**
   * Batch delete records
   */
  async deleteMany(ids: (string | number)[]): Promise<number> {
    try {
      if (!Array.isArray(ids) || ids.length === 0) {
        throw new ValidationError("IDs must be a non-empty array");
      }
      const db = await DB();
      const tx = db.transaction(this.storeName, "readwrite");
      let deleted = 0;
      for (const id of ids) {
        try {
          await tx.store.delete(id);
          deleted++;
        } catch {
          // Continue deleting other records
        }
      }
      await tx.done;
      return deleted;
    } catch (error) {
      if (error instanceof ValidationError) throw error;
      throw new OperationError("deleteMany", this.storeName, error);
    }
  }
}
