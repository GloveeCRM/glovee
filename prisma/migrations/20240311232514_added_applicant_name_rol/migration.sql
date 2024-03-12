-- CreateEnum
CREATE TYPE "ApplicationRole" AS ENUM ('MAIN', 'SPOUSE', 'CHILD', 'OTHER');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "applicantFirstName" TEXT NOT NULL DEFAULT 'unnamed',
ADD COLUMN     "applicantLastName" TEXT NOT NULL DEFAULT 'applicant',
ADD COLUMN     "role" "ApplicationRole" NOT NULL DEFAULT 'MAIN';
