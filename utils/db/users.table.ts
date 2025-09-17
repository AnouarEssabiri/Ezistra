import { DB } from "./index.table";
export class Users{
    async add(user: {name: string, email: string}){
        const db = await DB();
        const tx = db.transaction("users", "readwrite");
        await tx.store.add(user);
        await tx.done;
    }
}