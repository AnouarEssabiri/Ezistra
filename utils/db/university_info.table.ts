import { UniversityInfo } from "@/lib/types";
import { DB } from "./index.table";

export class University {
  async add(university: UniversityInfo) {
    try {
      const db = await DB();
      const tx = db.transaction("university", "readwrite");
      await tx.store.add(university);
      await tx.done;
    } catch (error) {
      console.error("Failed to add university info:", error);
    }
  }

  async getAll(): Promise<UniversityInfo[]> {
    const db = await DB();
    const tx = db.transaction("university", "readonly");
    return await tx.store.getAll();
  }

  async getById(id: number): Promise<UniversityInfo | undefined> {
    const db = await DB();
    const tx = db.transaction("university", "readonly");
    return await tx.store.get(id);
  }

  async update(id: number, updated: Partial<UniversityInfo>) {
    try {
      const db = await DB();
      const tx = db.transaction("university", "readwrite");
      const existing = await tx.store.get(id);
      if (existing) {
        const merged = { ...existing, ...updated };
        await tx.store.put(merged);
      }
      await tx.done;
    } catch (error) {
      console.error("Failed to update university info: ", error);
    }
  }

  async delete(id: number) {
    try {
      const db = await DB();
      const tx = db.transaction("university", "readwrite");
      await tx.store.delete(id);
      await tx.done;
    } catch (error) {
      console.error("Failed to delete university info:", error);
    }
  }
}