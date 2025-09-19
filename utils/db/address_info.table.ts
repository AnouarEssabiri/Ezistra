import { AddressInfo } from "@/lib/types";
import { DB } from "./index.table";

export class Address {
  async add(address: AddressInfo) {
    try{
        const db = await DB();
        const tx = db.transaction("address", "readwrite");
        await tx.store.add(address);
        await tx.done;
    }
    catch(error){
        console.error("Failed to add address info: ", error)
    }
  }
}
