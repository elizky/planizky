/*
  Warnings:

  - You are about to drop the column `trainingDayId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `TrainingDay` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `TrainingDay` table. All the data in the column will be lost.
  - Made the column `exerciseId` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_trainingDayId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "trainingDayId",
ALTER COLUMN "exerciseId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Plan" ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "TrainingDay" DROP COLUMN "date",
DROP COLUMN "type";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
