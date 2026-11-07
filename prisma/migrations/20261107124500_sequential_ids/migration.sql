-- Add sequential identifiers while preserving existing records and relations.
ALTER TABLE "User" ADD COLUMN "newId" SERIAL;
ALTER TABLE "Url" ADD COLUMN "newId" SERIAL;
ALTER TABLE "UrlClick" ADD COLUMN "newId" SERIAL;

ALTER TABLE "Url" ADD COLUMN "newOwnerId" INTEGER;
UPDATE "Url" AS url
SET "newOwnerId" = owner."newId"
FROM "User" AS owner
WHERE url."ownerId" = owner."id";

ALTER TABLE "UrlClick" ADD COLUMN "newUrlId" INTEGER;
UPDATE "UrlClick" AS click
SET "newUrlId" = url."newId"
FROM "Url" AS url
WHERE click."urlId" = url."id";

ALTER TABLE "Url" DROP CONSTRAINT "Url_ownerId_fkey";
ALTER TABLE "UrlClick" DROP CONSTRAINT "UrlClick_urlId_fkey";

DROP INDEX "Url_ownerId_idx";
DROP INDEX "UrlClick_urlId_clickedAt_idx";

ALTER TABLE "User" DROP CONSTRAINT "User_pkey";
ALTER TABLE "Url" DROP CONSTRAINT "Url_pkey";
ALTER TABLE "UrlClick" DROP CONSTRAINT "UrlClick_pkey";

ALTER TABLE "User" DROP COLUMN "id";
ALTER TABLE "Url" DROP COLUMN "id";
ALTER TABLE "Url" DROP COLUMN "ownerId";
ALTER TABLE "UrlClick" DROP COLUMN "id";
ALTER TABLE "UrlClick" DROP COLUMN "urlId";

ALTER TABLE "User" RENAME COLUMN "newId" TO "id";
ALTER TABLE "Url" RENAME COLUMN "newId" TO "id";
ALTER TABLE "Url" RENAME COLUMN "newOwnerId" TO "ownerId";
ALTER TABLE "UrlClick" RENAME COLUMN "newId" TO "id";
ALTER TABLE "UrlClick" RENAME COLUMN "newUrlId" TO "urlId";

ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
ALTER TABLE "Url" ADD CONSTRAINT "Url_pkey" PRIMARY KEY ("id");
ALTER TABLE "UrlClick" ADD CONSTRAINT "UrlClick_pkey" PRIMARY KEY ("id");

CREATE INDEX "Url_ownerId_idx" ON "Url"("ownerId");
CREATE INDEX "UrlClick_urlId_clickedAt_idx" ON "UrlClick"("urlId", "clickedAt");

ALTER TABLE "Url"
ADD CONSTRAINT "Url_ownerId_fkey"
FOREIGN KEY ("ownerId") REFERENCES "User"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "UrlClick"
ADD CONSTRAINT "UrlClick_urlId_fkey"
FOREIGN KEY ("urlId") REFERENCES "Url"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
