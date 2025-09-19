import { DocumentInfo } from "@/lib/types";
import { DB } from "./index.table";

export class Documents {
  async add(document: DocumentInfo): Promise<number | undefined> {
    try {
      const db = await DB();
      const tx = db.transaction("documents", "readwrite");
      const id = await tx.store.add(document);
      await tx.done;
      return typeof id === "number" ? id : undefined;
    } catch (error) {
      console.error("Failed to add document info:", error);
      return undefined;
    }
  }

  async getAll(): Promise<DocumentInfo[]> {
    try {
      const db = await DB();
      const tx = db.transaction("documents", "readonly");
      const result = await tx.store.getAll();
      await tx.done;
      return result;
    } catch (error) {
      console.error("Failed to get all documents:", error);
      return [];
    }
  }

  async getById(id: number): Promise<DocumentInfo | undefined> {
    try {
      const db = await DB();
      const tx = db.transaction("documents", "readonly");
      const result: DocumentInfo | undefined = await tx.store.get(id);
      await tx.done;
      return result;
    } catch (error) {
      console.error("Failed to get document info:", error);
      return undefined;
    }
  }

  async update(id: number, updated: Partial<DocumentInfo>): Promise<boolean> {
    try {
      const db = await DB();
      const tx = db.transaction("documents", "readwrite");
      const exist: DocumentInfo | undefined = await tx.store.get(id);
      if (exist) {
        await tx.store.put({ ...exist, ...updated });
        await tx.done;
        return true;
      }
      await tx.done;
      return false;
    } catch (error) {
      console.error("Failed to update document info:", error);
      return false;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const db = await DB();
      const tx = db.transaction("documents", "readwrite");
      await tx.store.delete(id);
      await tx.done;
      return true;
    } catch (error) {
      console.error("Failed to delete document info:", error);
      return false;
    }
  }
}
