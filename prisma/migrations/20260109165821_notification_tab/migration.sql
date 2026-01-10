-- CreateEnum
CREATE TYPE "NotifyType" AS ENUM ('REACTION', 'POST_PUBLISHED', 'SCHEDULED');

-- CreateTable
CREATE TABLE "Notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotifyType" NOT NULL DEFAULT 'REACTION',
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);
