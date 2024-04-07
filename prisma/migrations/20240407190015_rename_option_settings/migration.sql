/*
  Warnings:

  - You are about to drop the column `options` on the `TemplateQuestion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TemplateQuestion" DROP COLUMN "options",
ADD COLUMN     "settings" JSONB[];
