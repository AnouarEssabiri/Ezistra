import { AddressInfo } from "@/lib/types";
import { DB } from "./index.table";

export class Address {
  async add(address: AddressInfo): Promise<number> {
    try {
      const db = await DB();
      const tx = db.transaction("address", "readwrite");
      const id = await tx.store.add(address);
      await tx.done;
      return id as number;
    } catch (error) {
      console.error("Failed to add address info: ", error);
      throw error;
    }
  }

  async getAll(): Promise<AddressInfo[]> {
    try {
      const db = await DB();
      const tx = db.transaction("address", "readonly");
      const addresses = await tx.store.getAll();
      await tx.done;
      return addresses as AddressInfo[];
    } catch (error) {
      console.error("Failed to get all addresses: ", error);
      throw error;
    }
  }

  async getById(id: number): Promise<AddressInfo | undefined> {
    try {
      const db = await DB();
      const tx = db.transaction("address", "readonly");
      const address = await tx.store.get(id);
      await tx.done;
      return address as AddressInfo;
    } catch (error) {
      console.error("Failed to get address by id: ", error);
      throw error;
    }
  }

  async update(id: number, updates: Partial<AddressInfo>): Promise<boolean> {
    try {
      const db = await DB();
      const tx = db.transaction("address", "readwrite");
      const existingAddress = await tx.store.get(id);
      
      if (!existingAddress) {
        return false;
      }

      const updatedAddress = { ...existingAddress, ...updates };
      await tx.store.put(updatedAddress);
      await tx.done;
      return true;
    } catch (error) {
      console.error("Failed to update address: ", error);
      throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const db = await DB();
      const tx = db.transaction("address", "readwrite");
      const existingAddress = await tx.store.get(id);
      
      if (!existingAddress) {
        return false;
      }

      await tx.store.delete(id);
      await tx.done;
      return true;
    } catch (error) {
      console.error("Failed to delete address: ", error);
      throw error;
    }
  }
}
