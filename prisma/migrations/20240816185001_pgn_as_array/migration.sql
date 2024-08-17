/*
  Warnings:

  - The `pgn` column on the `Chapter` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "pgn",
ADD COLUMN     "pgn" TEXT[];
