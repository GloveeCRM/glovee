-- AlterTable
ALTER TABLE "TemplateQuestionSet" ADD COLUMN     "questionSetId" TEXT;

-- AddForeignKey
ALTER TABLE "TemplateQuestionSet" ADD CONSTRAINT "TemplateQuestionSet_questionSetId_fkey" FOREIGN KEY ("questionSetId") REFERENCES "TemplateQuestionSet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
