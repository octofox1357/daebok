-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "role" TEXT NOT NULL DEFAULT 'user',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "congregation" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "applicationTitle" TEXT NOT NULL,
    "applicationType" TEXT NOT NULL,
    "rangeStartDate" DATETIME NOT NULL,
    "rangeEndDate" DATETIME NOT NULL,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "applicationLimit" TEXT,
    "applicationApprove" BOOLEAN,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Outing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "outingType" TEXT NOT NULL,
    "outingDate" DATETIME NOT NULL,
    "outingConfirmed" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Outing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vacation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "vacationType" TEXT NOT NULL,
    "vacationReason" TEXT,
    "vacationConfirmed" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Vacation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NightShift" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shift_date" DATETIME NOT NULL,
    "shift_type" INTEGER NOT NULL,
    "origin_altnumber" TEXT,
    "cycle_seperate" BOOLEAN,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "NightShift_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Holiday" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "holiday_date" DATETIME NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
