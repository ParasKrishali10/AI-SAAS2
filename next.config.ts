import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qxmvzmvgqodsdwrehtru.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "/icons/**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline';
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: blob:;
              connect-src
                'self'
                https://engagementbot-2n8i.onrender.com
                wss://engagementbot-2n8i.onrender.com
                http://localhost:3002
                ws://localhost:3002
                https://sockjs-ap2.pusher.com
                https://*.pusher.com
                wss://ws-ap2.pusher.com;
            `.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ]
  },
};

export default nextConfig;
