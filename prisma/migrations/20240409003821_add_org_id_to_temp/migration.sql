/*
  Warnings:

  - You are about to drop the column `userId` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the `QuestionSet` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orgId` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_questionSetId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionSet" DROP CONSTRAINT "QuestionSet_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_userId_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "settings" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "userId",
ADD COLUMN     "orgId" TEXT NOT NULL;

-- DropTable
DROP TABLE "QuestionSet";

-- CreateTable
CREATE TABLE "question_set" (
    "id" TEXT NOT NULL,
    "type" "QuestionSetType" NOT NULL,
    "position" INTEGER NOT NULL,
    "sectionId" TEXT NOT NULL,
    "questionSetId" TEXT,

    CONSTRAINT "question_set_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "question_set" ADD CONSTRAINT "question_set_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_set" ADD CONSTRAINT "question_set_questionSetId_fkey" FOREIGN KEY ("questionSetId") REFERENCES "question_set"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_questionSetId_fkey" FOREIGN KEY ("questionSetId") REFERENCES "question_set"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
