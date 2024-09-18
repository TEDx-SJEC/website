/*
  Warnings:

  - You are about to drop the column `discountPercentage` on the `Referral` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Referral" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "discount_percentage" TEXT NOT NULL DEFAULT '20',
    "createdby_id" TEXT NOT NULL,
    "usedby_id" TEXT,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Referral_createdby_id_fkey" FOREIGN KEY ("createdby_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Referral_usedby_id_fkey" FOREIGN KEY ("usedby_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Referral" ("code", "created_at", "createdby_id", "id", "isUsed", "usedby_id") SELECT "code", "created_at", "createdby_id", "id", "isUsed", "usedby_id" FROM "Referral";
DROP TABLE "Referral";
ALTER TABLE "new_Referral" RENAME TO "Referral";
CREATE UNIQUE INDEX "Referral_code_key" ON "Referral"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
