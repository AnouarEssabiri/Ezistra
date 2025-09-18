import { HigherEducationInfo } from "@/lib/types";
import {DB} from "./index.table";

export class HigherEducation{
    async add(higherEducation: HigherEducationInfo){
        try{
            const db = await DB();
            const tx = db.transaction("higher_education","readwrite");
            await tx.store.add(higherEducation);
            await tx.done
        }
        catch(error){
            console.error("Failed to add higher education info: ", error)
        }

    }
}



