-- CreateTable
CREATE TABLE "DailyReactionStat" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalReactions" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DailyReactionStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageReaction" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessageReaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyReactionStat_messageId_date_key" ON "DailyReactionStat"("messageId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "MessageReaction_messageId_emoji_key" ON "MessageReaction"("messageId", "emoji");
