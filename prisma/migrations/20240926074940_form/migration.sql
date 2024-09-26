/*
  Warnings:

  - You are about to drop the `VerificationRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `email_verified` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `referral_id` on the `Form` table. All the data in the column will be lost.
  - Added the required column `paid_amount` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "VerificationRequest_identifier_otp_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VerificationRequest";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Form" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "usn" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT,
    "designation" TEXT,
    "photo_url" TEXT NOT NULL,
    "college_id_card" TEXT,
    "entity_name" TEXT NOT NULL,
    "referral_used" TEXT,
    "paid_amount" REAL NOT NULL,
    "created_by_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Form_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Form_referral_used_fkey" FOREIGN KEY ("referral_used") REFERENCES "Referral" ("code") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Form" ("college_id_card", "contact", "created_at", "created_by_id", "designation", "email", "entity_name", "id", "name", "photo_url", "usn") SELECT "college_id_card", "contact", "created_at", "created_by_id", "designation", "email", "entity_name", "id", "name", "photo_url", "usn" FROM "Form";
DROP TABLE "Form";
ALTER TABLE "new_Form" RENAME TO "Form";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
