import { UniversityInfo } from "@/lib/types";
import {DB} from "./index.table";

export class University{
    async add(university: UniversityInfo){
        try{
            const db = await DB();
            const tx = db.transaction("university","readwrite");
            await tx.store.add(university);
            await tx.done
        }
        catch(error){
            console.error('failed to add university info: ', error)
        }
    }
}