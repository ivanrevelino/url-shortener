ALTER TABLE "user_tb"
ADD COLUMN "username" VARCHAR(32);

UPDATE "user_tb"
SET "username" = 'user_' || "id"::text
WHERE "username" IS NULL;

ALTER TABLE "user_tb"
ALTER COLUMN "username" SET NOT NULL;

CREATE UNIQUE INDEX "user_tb_username_key" ON "user_tb"("username");
