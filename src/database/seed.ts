import { join } from "path";
import { Database } from ".";
import { writeFileSync } from "fs";
import { hash } from "@/utils/bcrypt";
import { encrypt } from "@/utils/crypto";

const seedDatabase = () => {
  const database: Database = {
    users: [
      {
        id: Math.random().toString(),
        username: "pietrodev07",
        email: encrypt("pietro.dev.07@gmail.com"),
        password: hash("pietrodev07"),
        verified: true,
        currentResetToken: "",
      },
    ],
  };

  const dbPath = join("database/db.json");
  const serailizedDatabase = JSON.stringify(database, null, 2);
  writeFileSync(dbPath, serailizedDatabase, "utf-8");
};

seedDatabase();
