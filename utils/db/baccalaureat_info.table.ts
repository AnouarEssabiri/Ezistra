import { BaccalaureatInfo } from "@/lib/types";
import { DB } from "./index.table";
export class Baccalaureat{
    async add(baccalaureat: BaccalaureatInfo): Promise<number | undefined> {
        try {
            const db = await DB();
            const tx = db.transaction("baccalaureat", "readwrite");
            const id = await tx.store.add(baccalaureat);
            await tx.done;
            return typeof id === "number" ? id : undefined;
        } catch (error) {
            console.error("Failed to add baccalaureat info: ", error);
            return undefined;
        }
    }

    async getAll(): Promise<BaccalaureatInfo[]> {
        try {
            const db = await DB();
            const tx = db.transaction("baccalaureat", "readonly");
            const result = await tx.store.getAll();
            await tx.done;
            return result;
        } catch (error) {
            console.error("Failed to get all baccalaureat info: ", error);
            return [];
        }
    }

    async getById(id: number): Promise<BaccalaureatInfo | undefined> {
        try {
            const db = await DB();
            const tx = db.transaction("baccalaureat", "readonly");
            const result: BaccalaureatInfo | undefined = await tx.store.get(id);
            await tx.done;
            return result;
        } catch (error) {
            console.error("Failed to get baccalaureat info: ", error);
            return undefined;
        }
    }

    async update(id: number, updated: Partial<BaccalaureatInfo>): Promise<boolean> {
        try {
            const db = await DB();
            const tx = db.transaction("baccalaureat", "readwrite");
            const exist: BaccalaureatInfo | undefined = await tx.store.get(id);
            if (exist) {
                await tx.store.put({ ...exist, ...updated });
                await tx.done;
                return true;
            }
            await tx.done;
            return false;
        } catch (error) {
            console.error("Failed to update baccalaureat info: ", error);
            return false;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const db = await DB();
            const tx = db.transaction("baccalaureat", "readwrite");
            await tx.store.delete(id);
            await tx.done;
            return true;
        } catch (error) {
            console.error("Failed to delete baccalaureat info: ", error);
            return false;
        }
    }
}