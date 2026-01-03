-- CreateTable
CREATE TABLE "ConnectedChannel" (
    "id" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "channelName" TEXT NOT NULL,

    CONSTRAINT "ConnectedChannel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConnectedChannel_guildId_channelId_key" ON "ConnectedChannel"("guildId", "channelId");

-- AddForeignKey
ALTER TABLE "ConnectedChannel" ADD CONSTRAINT "ConnectedChannel_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "ConnectedServer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
