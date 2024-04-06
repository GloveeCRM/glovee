/*
  Warnings:

  - Changed the type of `type` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `TemplateQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('TEXT_INPUT', 'TEXTAREA', 'SELECT', 'DATE_INPUT', 'RADIO', 'CHECKBOX', 'DOCUMENT');

-- CreateEnum
CREATE TYPE "TemplateQuestionType" AS ENUM ('TEXT_INPUT', 'TEXTAREA', 'SELECT', 'DATE_INPUT', 'RADIO', 'CHECKBOX', 'DOCUMENT');

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "type",
ADD COLUMN     "type" "QuestionType" NOT NULL;

-- AlterTable
ALTER TABLE "TemplateQuestion" DROP COLUMN "type",
ADD COLUMN     "type" "TemplateQuestionType" NOT NULL;
