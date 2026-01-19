# 🚀 Discord AI Content Generation & Scheduling SaaS

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
- Perfect for announcements, promotions, and engagement posts
- Seamlessly attach generated images to Discord posts

---

### ⏰ Post Scheduling System
- Schedule posts for **future dates & times**
- Reliable execution using **cron jobs**
- Posts are published even when users are offline

---

### 📊 Post Management Dashboard
- View **all scheduled & published posts**
- Track post status in one place
- Simple, clean, and easy-to-use UI

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
- Event-driven (no polling, no refresh hacks)

---

## 🏗️ System Architecture

This project follows a **distributed SaaS architecture**:

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

- Publishing scheduled posts
- Listening to emoji reactions
- Emitting reaction events in real time

### Deployment
- Hosted on **Render**
- Uses **uptime strategy** to stay awake
- Designed for long-running background tasks

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

### Run Project
npm run dev
