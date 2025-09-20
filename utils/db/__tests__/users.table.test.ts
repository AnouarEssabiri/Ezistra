import { describe, it, expect, beforeAll } from "vitest";
import { Users } from "../users.table";
import { PersonalInfo } from "@/lib/types";

const users = new Users();
let userId: number | undefined;

const testUser: PersonalInfo = {
  id: "USR123456",
  email: "demo.user@example.com",
  cne: "CNE987654",
  cin: "AB123456",
  firstName: "Youssef",
  lastName: "El Amrani",
  firstNameAr: "يوسف",
  lastNameAr: "العمري",
  birthDate: "2000-05-15",
  birthPlace: "Casablanca",
  birthPlaceAr: "الدار البيضاء",
  birthProvince: "Casablanca",
  birthCountry: "MAROC",
  gender: "M",
  nationality: "Marocaine",
  civilStatus: "célibataire",
  handicap: false,
};

describe("Users CRUD", () => {
  it("should add a user", async () => {
    userId = await users.add(testUser);
    expect(typeof userId).toBe("number");
  });

  it("should get all users", async () => {
    const all = await users.getAll();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThan(0);
  });

  it("should get user by id", async () => {
    const user = await users.getById(userId!);
    expect(user).toBeDefined();
    expect(user?.email).toBe(testUser.email);
  });

  it("should update user", async () => {
    const updated = await users.update(userId!, { firstName: "UpdatedName" });
    expect(updated).toBe(true);
    const user = await users.getById(userId!);
    expect(user?.firstName).toBe("UpdatedName");
  });

  it("should delete user", async () => {
    const deleted = await users.delete(userId!);
    expect(deleted).toBe(true);
    const user = await users.getById(userId!);
    expect(user).toBeUndefined();
  });
});