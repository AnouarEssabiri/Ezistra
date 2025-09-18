import { PersonalInfo } from "@/lib/types";
import { DB } from "./index.table";
export class Users{
    async add(user: PersonalInfo){
        try{
            const db = await DB();
            const tx = db.transaction("users", "readwrite");
            await tx.store.add(user);
            await tx.done;

        }
        catch(error){
            console.error("Failed to add user info:", error )
        }
    }
}