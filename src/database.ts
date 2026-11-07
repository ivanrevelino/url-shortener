import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

if (!dbUser) throw new Error("Missing required environment variable: DB_USER");
if (!dbPassword) {
  throw new Error("Missing required environment variable: DB_PASSWORD");
}
if (!dbName) throw new Error("Missing required environment variable: DB_NAME");

const connectionString = new URL(
  `postgresql://${encodeURIComponent(dbUser)}:${encodeURIComponent(dbPassword)}@localhost:5433/${encodeURIComponent(dbName)}?schema=public`,
).toString();

const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({ adapter });
