-- CreateTable
CREATE TABLE "sjec_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "sjec_user_email_key" ON "sjec_user"("email");
