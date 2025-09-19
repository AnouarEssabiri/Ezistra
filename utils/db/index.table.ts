import { openDB } from "idb";

const storeDefinitions = [
  { name: "users", options: { keyPath: "id", autoIncrement: true } },
  { name: "documents", options: { keyPath: "id", autoIncrement: true } },
  { name: "university", options: { keyPath: "id", autoIncrement: true } },
  { name: "higher_education", options: { keyPath: "id", autoIncrement: true } },
  { name: "complementary", options: { keyPath: "id", autoIncrement: true } },
  { name: "address", options: { keyPath: "id", autoIncrement: true } },
  { name: "baccalaureat", options: { keyPath: "id", autoIncrement: true } },
  { name: "personal_info", options: { keyPath: "id", autoIncrement: true } },
  { name: "university_info", options: { keyPath: "id", autoIncrement: true } },
];

export async function DB() {
  return openDB("ezistraDB", 1, {
    upgrade(db) {
      storeDefinitions.forEach(store => {
        if (!db.objectStoreNames.contains(store.name)) {
          db.createObjectStore(store.name, store.options);
        }
      });
    }
  });
}