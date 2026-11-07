-- DropForeignKey
ALTER TABLE "Url" DROP CONSTRAINT "Url_ownerId_fkey";

-- AlterTable
ALTER TABLE "Url" ALTER COLUMN "ownerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Url" ADD CONSTRAINT "Url_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
