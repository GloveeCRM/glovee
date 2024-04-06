/*
  Warnings:

  - Changed the type of `type` on the `QuestionSet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `TemplateQuestionSet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "QuestionSetType" AS ENUM ('FLAT', 'LOOP', 'DEPENDS_ON');

-- CreateEnum
CREATE TYPE "TemplateQuestionSetType" AS ENUM ('FLAT', 'LOOP', 'DEPENDS_ON');

-- AlterTable
ALTER TABLE "QuestionSet" DROP COLUMN "type",
ADD COLUMN     "type" "QuestionSetType" NOT NULL;

-- AlterTable
ALTER TABLE "TemplateQuestionSet" DROP COLUMN "type",
ADD COLUMN     "type" "TemplateQuestionSetType" NOT NULL;
