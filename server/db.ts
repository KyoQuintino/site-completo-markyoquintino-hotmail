import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertStoredFile, InsertUser, storedFiles, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  type TextField = (typeof textFields)[number];

  for (const field of textFields) {
    const value = user[field];
    if (value === undefined) continue;
    values[field] = value ?? null;
    updateSet[field] = value ?? null;
  }
  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function listFilesByOwner(ownerId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(storedFiles).where(eq(storedFiles.ownerId, ownerId)).orderBy(desc(storedFiles.createdAt));
}

export async function createStoredFile(file: InsertStoredFile) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const result = await db.insert(storedFiles).values(file);
  const insertedId = Number(result[0].insertId);
  const created = await db.select().from(storedFiles).where(eq(storedFiles.id, insertedId)).limit(1);
  if (!created[0]) throw new Error("Stored file was not created");
  return created[0];
}

export async function deleteStoredFile(ownerId: number, fileId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const owned = await db.select().from(storedFiles).where(eq(storedFiles.id, fileId)).limit(1);
  if (!owned[0] || owned[0].ownerId !== ownerId) return false;
  await db.delete(storedFiles).where(eq(storedFiles.id, fileId));
  return true;
}
