import { HigherEducationInfo } from "@/lib/types";
import { DB } from "./index.table";

export class HigherEducation {
  async add(higherEducation: HigherEducationInfo) {
    try {
      const db = await DB();
      const tx = db.transaction("higher_education", "readwrite");
      await tx.store.add(higherEducation);
      await tx.done;
    } catch (error) {
      console.error("Failed to add higher education info: ", error);
    }
  }

  async getAll(): Promise<HigherEducationInfo[]> {
    try {
      const db = await DB();
      const tx = db.transaction("higher_education", "readonly");
      const result = await tx.store.getAll();
      await tx.done;
      return result;
    } catch (error) {
      console.error("Failed to get all higher education info: ", error);
      return [];
    }
  }

  async getById(id: number): Promise<HigherEducationInfo | undefined> {
    try {
      const db = await DB();
      const tx = db.transaction("higher_education", "readonly");
      const result: HigherEducationInfo | undefined = await tx.store.get(id);
      await tx.done;
      return result;
    } catch (error) {
      console.error("Failed to get higher education info: ", error);
      return undefined;
    }
  }

  async update(id: number, updated: Partial<HigherEducationInfo>): Promise<boolean> {
    try {
      const db = await DB();
      const tx = db.transaction("higher_education", "readwrite");
      const exist: HigherEducationInfo | undefined = await tx.store.get(id);
      if (exist) {
        await tx.store.put({ ...exist, ...updated });
        await tx.done;
        return true;
      }
      await tx.done;
      return false;
    } catch (error) {
      console.error("Failed to update higher education info: ", error);
      return false;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const db = await DB();
      const tx = db.transaction("higher_education", "readwrite");
      await tx.store.delete(id);
      await tx.done;
      return true;
    } catch (error) {
      console.error("Failed to delete higher education info: ", error);
      return false;
    }
  }
}



