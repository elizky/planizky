/*
  Warnings:

  - Made the column `trainingDayId` on table `Exercise` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `type` to the `TrainingDay` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TrainingType" AS ENUM ('SERIES', 'CIRCUIT', 'COMBINED');

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_trainingDayId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "trainingDayId" TEXT,
ALTER COLUMN "exerciseId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "trainingDayId" SET NOT NULL;

-- AlterTable
ALTER TABLE "TrainingDay" ADD COLUMN     "settings" JSONB,
ADD COLUMN     "type" "TrainingType" NOT NULL DEFAULT 'SERIES';

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_trainingDayId_fkey" FOREIGN KEY ("trainingDayId") REFERENCES "TrainingDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_trainingDayId_fkey" FOREIGN KEY ("trainingDayId") REFERENCES "TrainingDay"("id") ON DELETE SET NULL ON UPDATE CASCADE;
