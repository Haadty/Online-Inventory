import fs from "fs";
import { execSync } from "child_process";

console.log("Creating .env...");

if (!fs.existsSync(".env")) {
    fs.writeFileSync(".env", 'DATABASE_URL="file:./prisma/dev.db"\n');
}

console.log("Installing dependencies...");
execSync("npm install", { stdio: "inherit" });

console.log("Generating Prisma Client...");
execSync("npx prisma generate", { stdio: "inherit" });

const migrationName = `init_${Date.now()}`;

console.log("Running migrations...");
execSync(`npx prisma migrate dev --name ${migrationName}`, { stdio: "inherit" });

console.log("Seeding database...");
execSync("npm run seed", { stdio: "inherit" });

console.log("Setup complete!");
