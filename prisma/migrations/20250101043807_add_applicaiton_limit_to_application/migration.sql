/*
  Warnings:

  - You are about to drop the column `weekDayLimit` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `weekEndLimit` on the `Application` table. All the data in the column will be lost.
  - Made the column `applicationApprove` on table `Application` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationLimit` on table `Application` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endDate` on table `Application` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startDate` on table `Application` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "applicationTitle" TEXT NOT NULL,
    "applicationType" TEXT NOT NULL,
    "rangeStartDate" DATETIME NOT NULL,
    "rangeEndDate" DATETIME NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "applicationLimit" TEXT NOT NULL,
    "applicationApprove" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Application" ("applicationApprove", "applicationLimit", "applicationTitle", "applicationType", "createdAt", "endDate", "id", "rangeEndDate", "rangeStartDate", "startDate", "updatedAt") SELECT "applicationApprove", "applicationLimit", "applicationTitle", "applicationType", "createdAt", "endDate", "id", "rangeEndDate", "rangeStartDate", "startDate", "updatedAt" FROM "Application";
DROP TABLE "Application";
ALTER TABLE "new_Application" RENAME TO "Application";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
