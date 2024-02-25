/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `PasswordResetToken` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PasswordResetToken_email_token_key";

-- DropIndex
DROP INDEX "VerificationToken_email_token_key";

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_email_key" ON "PasswordResetToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_key" ON "VerificationToken"("email");
