import { ComplementaryInfo } from "@/lib/types";
import { DB } from "./index.table";

export class Complementary {
  async add(complementary: ComplementaryInfo) {
    try {
        const db = await DB();
        const tx = db.transaction("complementary", "readwrite");
        await tx.store.add(complementary);
        await tx.done;
    }
    catch(error){
        console.error("Failed to add complementary info: ", error)
    }
  }
}