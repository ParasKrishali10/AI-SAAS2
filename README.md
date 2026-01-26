# 🚀 Discord AI Content Generation & Scheduling SaaS

🔗 **Live Demo:** https://ai-saas-2-red.vercel.app/  

A **production-ready SaaS platform** that helps creators and communities **generate AI-powered Discord content**, **schedule posts**, **track real-time emoji reactions**, and receive **instant notifications** — all from a single dashboard.

Built with **modern full-stack architecture**, real-time systems, and scalable design principles.

---

## ✨ Features

### 🧠 AI Content Generation
- Generate Discord-ready content using **OpenAI**
- Smart prompts for engaging community posts
- Optimized output for Discord formatting

---

### 🎨 AI Image Generation
- Generate images using **Hugging Face**
- Ideal for announcements, promotions, and engagement posts
- Seamlessly attach generated images to Discord posts

---

### ⏰ Post Scheduling System
- Schedule posts for **future dates & times**
- Reliable execution using **cron jobs**
- Posts are published even when users are offline

---

### 📊 Post Management Dashboard
- View **all scheduled & published posts**
- Track post status from a single page
- Clean, intuitive, and easy-to-use UI

---

### ⚡ Real-Time Emoji Reaction Tracking
- Live tracking of emoji reactions on Discord posts
- Updates without page reloads
- Smooth UI animations for reaction counts

---

### 🔔 Real-Time Notifications
- Instant notifications when:
  - A scheduled post is published
  - Someone reacts to your post with an emoji
- Notifications work **globally across all pages**
- Event-driven architecture (no polling, no refresh hacks)

---

## 🏗️ System Architecture

This project follows a **distributed SaaS architecture** designed for scalability and reliability:

Frontend (Next.js)  
↓  
API Layer (Serverless)  
↓  
Database (Supabase)  
↓  
Cron Jobs  
↓  
Discord Bot (Render)  
↓  
Real-Time Events (Pusher)


### Key Design Principles
- Event-driven communication
- Clear separation of concerns
- Scalable and production-safe design
- Real-time UX without WebSocket servers on Vercel

---

## 🤖 Discord Bot Responsibilities

The Discord bot is a **core system component**, responsible for:

- Publishing scheduled posts to Discord
- Listening to emoji reactions on posts
- Emitting reaction events in real time

### Bot Deployment
- Hosted on **Render**
- Designed for **long-running background tasks**
- Uses an uptime strategy to prevent cold starts

---

## ☁️ Deployment & Reliability

- **Frontend** deployed on **Vercel** for fast, serverless rendering.
- **Discord Bot** deployed on **Render** to support persistent background execution.
- Implemented an **uptime strategy** using external health checks to keep the bot active.
- System designed to handle **serverless limitations** by separating UI and background workers.

---

## ⚙️ Tech Stack

### Frontend
- **Next.js (App Router)**
- **TypeScript**
- **Framer Motion**
- **Zustand**

### Backend & Infrastructure
- **Supabase** (Database & persistence)
- **Prisma ORM**
- **Pusher** (Real-time notifications)
- **Cron Jobs** (Scheduling)

### AI & Automation
- **OpenAI** – content generation
- **Hugging Face** – image generation
- **Discord.js** – bot integration

---

## 📦 Installation

### Install dependencies
```bash
    npm install
```
Run the project locally

    npm run dev
