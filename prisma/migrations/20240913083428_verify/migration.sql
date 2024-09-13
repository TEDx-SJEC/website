-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Form" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "usn" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "contact" TEXT,
    "designation" TEXT,
    "photo_url" TEXT NOT NULL,
    "college_id_card" TEXT,
    "entity_name" TEXT NOT NULL,
    "referral_id" TEXT,
    "created_by_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Form_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Form_referral_id_fkey" FOREIGN KEY ("referral_id") REFERENCES "Referral" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Form" ("college_id_card", "contact", "created_at", "created_by_id", "designation", "email", "entity_name", "id", "name", "photo_url", "referral_id", "usn") SELECT "college_id_card", "contact", "created_at", "created_by_id", "designation", "email", "entity_name", "id", "name", "photo_url", "referral_id", "usn" FROM "Form";
DROP TABLE "Form";
ALTER TABLE "new_Form" RENAME TO "Form";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
