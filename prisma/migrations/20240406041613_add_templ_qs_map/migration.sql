/*
  Warnings:

  - You are about to drop the `TemplateQuestionSet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TemplateQuestion" DROP CONSTRAINT "TemplateQuestion_questionSetId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateQuestionSet" DROP CONSTRAINT "TemplateQuestionSet_questionSetId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateQuestionSet" DROP CONSTRAINT "TemplateQuestionSet_sectionId_fkey";

-- DropTable
DROP TABLE "TemplateQuestionSet";

-- CreateTable
CREATE TABLE "template_question_set" (
    "id" TEXT NOT NULL,
    "type" "TemplateQuestionSetType" NOT NULL,
    "position" INTEGER NOT NULL,
    "sectionId" TEXT NOT NULL,
    "questionSetId" TEXT,

    CONSTRAINT "template_question_set_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "template_question_set" ADD CONSTRAINT "template_question_set_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "TemplateSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "template_question_set" ADD CONSTRAINT "template_question_set_questionSetId_fkey" FOREIGN KEY ("questionSetId") REFERENCES "template_question_set"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateQuestion" ADD CONSTRAINT "TemplateQuestion_questionSetId_fkey" FOREIGN KEY ("questionSetId") REFERENCES "template_question_set"("id") ON DELETE CASCADE ON UPDATE CASCADE;
