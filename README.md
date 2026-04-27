# TIHLO — Production Website

Next.js 14 production build for TIHLO. Independent. South Africa.

## Stack

- **Next.js 14** (App Router, TypeScript strict)
- **Tailwind CSS** + CSS variables for design tokens
- **Framer Motion** for scroll-driven animations
- **Resend** for contact form email delivery
- **next-mdx-remote** for Field Notes content
- **Vercel Analytics** (privacy-first)
- **Geist + Geist Mono** fonts via `next/font`

## Setup

### 1. Install Node.js

Download and install Node.js 18+ from [nodejs.org](https://nodejs.org/en/download).

### 2. Install dependencies

```bash
cd tihlo-next
npm install
```

### 3. Configure environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
RESEND_API_KEY=re_your_key_here
CONTACT_EMAIL=info@tihlo.co.za
```

Get a Resend API key at [resend.com](https://resend.com).

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Build for production

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push to GitHub
2. Import repository at [vercel.com](https://vercel.com)
3. Add environment variables in Vercel project settings:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
4. Deploy

## Content

Field Notes are MDX files in `/content/field-notes/`. Add new articles by creating a new `.mdx` file with this frontmatter:

```mdx
---
title: "Article title"
subtitle: "One-line subtitle"
date: "Month Year"
index: "No. 04"
excerpt: "Two-sentence preview used on the index page."
heroImage: "https://images.unsplash.com/photo-..."
---
```

## Open items before launch

- [ ] Replace team placeholder portraits with real headshots
- [ ] Confirm production email address for contact form
- [ ] Add Resend API key to Vercel environment
- [ ] Verify domain (tihlo.co.za) in Resend sender settings
- [ ] Review and approve three launch Field Notes articles
- [ ] Add company registration number to About > Governance
- [ ] Confirm POPIA contact email address
- [ ] Source and approve hero photography (current: Unsplash placeholders)

---

TIHLO · Independent · Pretoria · The eye that never misses.
