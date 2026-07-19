# ZenithMind AI

ZenithMind AI is a premium cognitive health, stress management, and burnout tracking platform built with Next.js and modern AI-driven experiences. The product combines wellness content, intelligent chat, personalized dashboards, and exploration tools into a single polished experience.

## What this project includes

- A modern landing experience with hero, features, categories, stats, testimonials, FAQ, and newsletter sections
- A public explore experience for wellness kits and curated content
- Authenticated dashboard flows for profile, administration, item management, and AI-powered interactions
- AI chat and analysis experiences powered by backend API routes
- A responsive, dark navy visual theme aligned with the project direction

## Key features

- AI-powered wellness guidance and chat experience
- Burnout and cognitive health tracking workflows for users
- Personalized dashboard with profile and admin management
- Item exploration and discovery with rich card-based browsing
- Secure authentication and role-aware access control
- Clean, responsive UI designed for desktop and mobile

## Tech stack

- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS, TanStack Query, Framer Motion
- UI libraries: HeroUI, Lucide React, React Hook Form, Zod
- Backend integration: Better Auth, MongoDB, React Hot Toast
- Build tooling: ESLint, TypeScript

## Project structure

- src/app: app routes, pages, and API handlers
- src/components: reusable UI, dashboard, home, shared, and explore components
- src/lib: auth, API helpers, and shared logic
- src/types: shared TypeScript interfaces

## Getting started

### Prerequisites

- Node.js 20+
- npm
- A MongoDB instance for authentication and data persistence

### Install dependencies

```bash
npm install
```

### Environment variables

Create a local environment file based on your setup:

```bash
cp .env.example .env.local
```

Recommended variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_key
MONGODB_URI=mongodb://localhost:27017/zenithmind
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
```

### Run the app locally

```bash
npm run dev
```

Then open http://localhost:3000.

## Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

- The project is designed for a polished SaaS-style experience rather than a basic starter template.
- The README will continue to evolve as new dashboard, AI, and content management features are added.
