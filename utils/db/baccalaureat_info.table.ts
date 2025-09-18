import { BaccalaureatInfo } from "@/lib/types";
import { DB } from "./index.table";

export class Baccalaureat{
    async add(baccalaureat: BaccalaureatInfo){
        try{
        const db = await DB();
        const tx = db.transaction("baccalaureat","readwrite");
        await tx.store.add(baccalaureat);
        await tx.done;
        }
        catch(error){
            console.error("Failed to add baccalaureat info: ", error)
        }
    }
}