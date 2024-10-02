/*
  Warnings:

  - You are about to drop the column `formId` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payment" (
    "signature" TEXT,
    "user_id" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "order_creation_id" TEXT NOT NULL,
    "razorpay_payment_id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "form_id" TEXT,
    CONSTRAINT "Payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Payment_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "Form" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Payment" ("amount", "created_at", "form_id", "order_creation_id", "razorpay_payment_id", "signature", "updated_at") SELECT "amount", "created_at", "form_id", "order_creation_id", "razorpay_payment_id", "signature", "updated_at" FROM "Payment";
DROP TABLE "Payment";
ALTER TABLE "new_Payment" RENAME TO "Payment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
