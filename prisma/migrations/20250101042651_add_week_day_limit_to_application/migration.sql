/*
  Warnings:

  - Added the required column `weekDayLimit` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekEndLimit` to the `Application` table without a default value. This is not possible if the table is not empty.

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
    "startDate" DATETIME,
    "endDate" DATETIME,
    "weekDayLimit" INTEGER NOT NULL,
    "weekEndLimit" INTEGER NOT NULL,
    "applicationLimit" TEXT,
    "applicationApprove" BOOLEAN,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Application" ("applicationApprove", "applicationLimit", "applicationTitle", "applicationType", "createdAt", "endDate", "id", "rangeEndDate", "rangeStartDate", "startDate", "updatedAt") SELECT "applicationApprove", "applicationLimit", "applicationTitle", "applicationType", "createdAt", "endDate", "id", "rangeEndDate", "rangeStartDate", "startDate", "updatedAt" FROM "Application";
DROP TABLE "Application";
ALTER TABLE "new_Application" RENAME TO "Application";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
