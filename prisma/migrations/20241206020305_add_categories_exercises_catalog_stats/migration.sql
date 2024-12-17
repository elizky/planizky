/*
  Warnings:

  - You are about to drop the column `category` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `muscleGroup` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the `Progress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_trainingDayId_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_userId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "category",
DROP COLUMN "description",
DROP COLUMN "muscleGroup",
DROP COLUMN "title",
ADD COLUMN     "catalogId" TEXT,
ADD COLUMN     "customDescription" TEXT,
ADD COLUMN     "customTitle" TEXT;

-- DropTable
DROP TABLE "Progress";

-- CreateTable
CREATE TABLE "ExerciseCatalog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "videoUrl" TEXT,
    "muscleGroup" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "equipment" TEXT[],
    "primaryMuscles" TEXT[],
    "secondaryMuscles" TEXT[],
    "tips" TEXT[],
    "safetyWarnings" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "ExerciseCatalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "focusAreas" TEXT[],
    "recommendedFor" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SetHistory" (
    "id" TEXT NOT NULL,
    "setId" TEXT NOT NULL,
    "repetitions" INTEGER,
    "weight" DOUBLE PRECISION,
    "duration" INTEGER,
    "restTime" INTEGER,
    "changeReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SetHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseStats" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL DEFAULT 0,
    "maxReps" INTEGER,
    "maxWeight" DOUBLE PRECISION,
    "avgReps" INTEGER,
    "avgWeight" DOUBLE PRECISION,
    "bestDuration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExerciseStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingDayStats" (
    "id" TEXT NOT NULL,
    "trainingDayId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "completedCount" INTEGER NOT NULL DEFAULT 0,
    "totalDuration" INTEGER NOT NULL DEFAULT 0,
    "averageWeight" DOUBLE PRECISION,
    "averageReps" INTEGER,
    "exercisesCount" INTEGER NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainingDayStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseStats_exerciseId_key" ON "ExerciseStats"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingDayStats_trainingDayId_key" ON "TrainingDayStats"("trainingDayId");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "ExerciseCatalog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseCatalog" ADD CONSTRAINT "ExerciseCatalog_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SetHistory" ADD CONSTRAINT "SetHistory_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseStats" ADD CONSTRAINT "ExerciseStats_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseStats" ADD CONSTRAINT "ExerciseStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingDayStats" ADD CONSTRAINT "TrainingDayStats_trainingDayId_fkey" FOREIGN KEY ("trainingDayId") REFERENCES "TrainingDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingDayStats" ADD CONSTRAINT "TrainingDayStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
