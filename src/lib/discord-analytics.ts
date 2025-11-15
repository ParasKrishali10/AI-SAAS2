import axios from "axios";

interface MessageAnalytics {
  reactions: number;
  replies: number;
  mentions: number;
  totalReach: number;
  engagementRate: number;
}
const DISCORD_API = 'https://discord.com/api/v10';
