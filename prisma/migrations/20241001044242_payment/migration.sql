-- DropIndex
DROP INDEX "Form_usn_key";

-- CreateTable
CREATE TABLE "Payment" (
    "signature" TEXT,
    "form_id" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "order_creation_id" TEXT NOT NULL,
    "razorpay_payment_id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "formId" TEXT,
    CONSTRAINT "Payment_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Payment_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
