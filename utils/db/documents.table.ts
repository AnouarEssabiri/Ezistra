import { DB } from "./index.table";

export class Documents {
  async add(document: {
    studentId: string;
    type: string; // e.g. "Demande manuscrite", "BAC", "CIN"
    fileName: string;
    fileSize: number;
    fileType: string; // application/pdf
    fileContent: Blob ;
  }) {
    try{
        const db = await DB();
        const tx = db.transaction("documents","readwrite");
        await tx.store.add(document);
        await tx.done;
    }
    catch(error){
        console.error("Failed to add document:", error)
    }
  }
}
