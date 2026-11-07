-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Url" (
    "id" UUID NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortCode" VARCHAR(8) NOT NULL,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "ownerId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UrlClick" (
    "id" UUID NOT NULL,
    "urlId" UUID NOT NULL,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "country" VARCHAR(2),
    "device" TEXT,
    "browser" TEXT,
    "referrer" TEXT,

    CONSTRAINT "UrlClick_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortCode_key" ON "Url"("shortCode");

-- CreateIndex
CREATE INDEX "Url_ownerId_idx" ON "Url"("ownerId");

-- CreateIndex
CREATE INDEX "UrlClick_urlId_clickedAt_idx" ON "UrlClick"("urlId", "clickedAt");

-- AddForeignKey
ALTER TABLE "Url" ADD CONSTRAINT "Url_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UrlClick" ADD CONSTRAINT "UrlClick_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE CASCADE ON UPDATE CASCADE;
