# 🚀 Discord AI Content Generation & Scheduling SaaS
 

![Next.js](https://img.shields.io/badge/Next.js-AppRouter-black?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-blue?logo=typescript&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animation-black?logo=framer&logoColor=blue)
![Zustand](https://img.shields.io/badge/Zustand-State%20Management-ff69b4)

![Node.js](https://img.shields.io/badge/Node.js-Backend-green?logo=node.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)
![Pusher](https://img.shields.io/badge/Pusher-Realtime-300D4F?logo=pusher&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-Queue-red?logo=redis&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Container-2496ED?logo=docker&logoColor=white)
![Cron](https://img.shields.io/badge/Cron-Jobs-orange)

![OpenAI](https://img.shields.io/badge/OpenAI-AI-412991?logo=openai&logoColor=white)
![Hugging Face](https://img.shields.io/badge/Hugging%20Face-ML-yellow?logo=huggingface&logoColor=black)
![Discord.js](https://img.shields.io/badge/Discord.js-Bot-5865F2?logo=discord&logoColor=white)

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

----------

## ⭐ Summary

An AI-powered SaaS platform that enables creators to:

✔ Generate and enhance Discord content with AI  
✔ Schedule posts and automate publishing  
✔ Monitor engagement with real-time reactions  
✔ Receive instant notifications across the app  
✔ Manage everything from one unified dashboard  
