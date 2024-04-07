/*
  Warnings:

  - The `settings` column on the `TemplateQuestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TemplateQuestion" DROP COLUMN "settings",
ADD COLUMN     "settings" JSONB NOT NULL DEFAULT '{}';
