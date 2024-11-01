import { join } from "path";
import { readFileSync, writeFileSync } from "fs";

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  verified: boolean;
  currentResetToken: string;
};

export type Database = { users: User[] };

const dbPath = join("database/db.json");
const jsonData = readFileSync(dbPath, "utf-8");
const db = JSON.parse(jsonData) as Database;

export const usersRepo = {
  findById: (id: string) => {
    return db.users.find((user) => user.id === id);
  },
  findByEmail: (email: string) => {
    return db.users.find((user) => user.email === email);
  },
  findByUsername: (username: string) => {
    return db.users.find((user) => user.username === username);
  },
  create: (user: User) => {
    db.users.push(user);
    writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
    return user;
  },
  update: (id: string, user: Partial<User>) => {
    const index = db.users.findIndex((user) => user.id === id);
    db.users[index] = { ...db.users[index], ...user };
    writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");

    return db.users[index];
  },
};
