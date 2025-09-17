import {openDB} from "idb";

export async function DB(){
    return openDB("ezistraDB",1,{
        upgrade(db){
            if (!db.objectStoreNames.contains("users")){
                db.createObjectStore("users", {keyPath: "id", autoIncrement: true})
            }
            if(!db.objectStoreNames.contains("documents")){
                db.createObjectStore("documents", {keyPath:"id", autoIncrement:true})
            }
        }
    })
}