/*
  Warnings:

  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Note";

-- CreateTable
CREATE TABLE "Questions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "votes" INTEGER NOT NULL,
    "user" INTEGER NOT NULL,
    "talkId" INTEGER NOT NULL,
    "ok" BOOLEAN NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Features" (
    "id" SERIAL NOT NULL,
    "questions" BOOLEAN NOT NULL,
    "questionsList" BOOLEAN NOT NULL,
    "stars" BOOLEAN NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stars" (
    "id" SERIAL NOT NULL,
    "user" INTEGER NOT NULL,
    "stars" INTEGER NOT NULL,
    "talkId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "Stars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "email" INTEGER NOT NULL,
    "voteCount" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);
