import "dotenv/config";
import { defineConfig, env } from "prisma/config";

const databaseUrl = new URL(
  `postgresql://${encodeURIComponent(env("DB_USER"))}:${encodeURIComponent(env("DB_PASSWORD"))}@localhost:5433/${encodeURIComponent(env("DB_NAME"))}?schema=public`,
);

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: databaseUrl.toString(),
  },
});
