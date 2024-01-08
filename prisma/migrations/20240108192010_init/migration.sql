/*
  Warnings:

  - You are about to drop the `Features` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Features";

-- DropTable
DROP TABLE "Questions";

-- DropTable
DROP TABLE "Stars";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "questions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "votes" INTEGER NOT NULL,
    "user" INTEGER NOT NULL,
    "talkId" INTEGER NOT NULL,
    "ok" BOOLEAN NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "features" (
    "id" SERIAL NOT NULL,
    "questions" BOOLEAN NOT NULL,
    "questionsList" BOOLEAN NOT NULL,
    "stars" BOOLEAN NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stars" (
    "id" SERIAL NOT NULL,
    "user" INTEGER NOT NULL,
    "stars" INTEGER NOT NULL,
    "talkId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "stars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "email" INTEGER NOT NULL,
    "voteCount" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
