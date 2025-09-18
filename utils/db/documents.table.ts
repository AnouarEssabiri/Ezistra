import { DocumentInfo } from "@/lib/types";
import { DB } from "./index.table";

export class Documents {
  async add(document: DocumentInfo) {
    try{
        const db = await DB();
        const tx = db.transaction("documents","readwrite");
        await tx.store.add(document);
        await tx.done;
    }
    catch(error){
        console.error("Failed to add document info:", error)
    }
  }
}
