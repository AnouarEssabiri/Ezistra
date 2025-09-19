import { ComplementaryInfo } from "@/lib/types";
import { DB } from "./index.table";

export class Complementary {
  async add(complementary: ComplementaryInfo): Promise<number | undefined> {
    try {
      const db = await DB();
      const tx = db.transaction("complementary", "readwrite");
      const id = await tx.store.add(complementary);
      await tx.done;
      return typeof id === "number" ? id : undefined;
    } catch (error) {
      console.error("Failed to add complementary info: ", error);
      return undefined;
    }
  }

  async getAll(): Promise<ComplementaryInfo[]> {
    try {
      const db = await DB();
      const tx = db.transaction("complementary", "readonly");
      const result = await tx.store.getAll();
      await tx.done;
      return result;
    } catch (error) {
      console.error("Failed to get all complementary info: ", error);
      return [];
    }
  }

  async getById(id: number): Promise<ComplementaryInfo | undefined> {
    try {
      const db = await DB();
      const tx = db.transaction("complementary", "readonly");
      const result: ComplementaryInfo | undefined = await tx.store.get(id);
      await tx.done;
      return result;
    } catch (error) {
      console.error("Failed to get complementary info: ", error);
      return undefined;
    }
  }

  async update(id: number, updated: Partial<ComplementaryInfo>): Promise<boolean> {
    try {
      const db = await DB();
      const tx = db.transaction("complementary", "readwrite");
      const exist: ComplementaryInfo | undefined = await tx.store.get(id);
      if (exist) {
        await tx.store.put({ ...exist, ...updated });
        await tx.done;
        return true;
      }
      await tx.done;
      return false;
    } catch (error) {
      console.error("Failed to update complementary info: ", error);
      return false;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const db = await DB();
      const tx = db.transaction("complementary", "readwrite");
      await tx.store.delete(id);
      await tx.done;
      return true;
    } catch (error) {
      console.error("Failed to delete complementary info: ", error);
      return false;
    }
  }
}