/*
  Warnings:

  - You are about to drop the column `token` on the `VerificationRequest` table. All the data in the column will be lost.
  - Added the required column `otp` to the `VerificationRequest` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VerificationRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_VerificationRequest" ("created_at", "expires", "id", "identifier", "updated_at") SELECT "created_at", "expires", "id", "identifier", "updated_at" FROM "VerificationRequest";
DROP TABLE "VerificationRequest";
ALTER TABLE "new_VerificationRequest" RENAME TO "VerificationRequest";
CREATE UNIQUE INDEX "VerificationRequest_identifier_otp_key" ON "VerificationRequest"("identifier", "otp");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
