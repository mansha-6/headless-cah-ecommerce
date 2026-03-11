# Cards Against Humanity Clone

A pixel-perfect recreation of the Cards Against Humanity website built with Next.js, Payload CMS, and Medusa.js.

## Tech Stack
-   **Frontend:** Next.js 15 (App Router), Tailwind CSS, Framer Motion, Lucide React.
-   **CMS:** Payload CMS 3.0 (Headless).
-   **Commerce:** Medusa.js 2.0.
-   **Database:** PostgreSQL (Postgres 15).

## Features
-   **Pixel-Perfect UI:** Strictly monochrome design with CAH typography and animations.
-   **Fully Dynamic:** All content (Hero, Products, Text sections) is fetched from Payload CMS.
-   **Commerce Flow:** Full cart, login, and checkout flow integrated with Medusa.js.
-   **Two-Way Sync:** Automatically syncs products between Payload CMS and Medusa.js using hooks and subscribers.
-   **Responsive:** Optimized for all screen sizes.

## Project Structure
-   `/frontend`: The Next.js application.
-   `/cms`: Payload CMS backend.
-   `/medusa`: Medusa.js commerce engine.

## Setup Instructions

### Prerequisites
-   Node.js 20+
-   PostgreSQL
-   Docker (optional, for local DB)

### 1. Database Setup
Start the local databases using Docker:
```bash
docker-compose up -d
```
Or ensure you have two Postgres databases running for Payload (port 5433) and Medusa (port 5432).

### 2. Medusa Installation
```bash
cd medusa
npm install
npx medusa db:migrate
npx medusa user --email admin@cah.com --password password
npm run dev
```

### 3. Payload CMS Installation
```bash
cd cms
npm install
npm run dev
```

### 4. Frontend Installation
```bash
cd frontend
npm install
npm run dev
```

## Integrated Commerce Features
-   **Medusa JS SDK:** Fully integrated into the Next.js frontend.
-   **Persistent Cart:** Uses `localStorage` to persist Cart IDs and syncs with Medusa's `store.cart` API.
-   **Real-time Auth:** Customer login is implemented via `medusa.auth` (Email/Pass Provider).
-   **Dummy Checkout:** The checkout flow is plumbed but uses test mode as per requirements.

## Two-Way Sync Mechanism
-   **Payload → Medusa:** The `syncToMedusa` hook in `cms/src/hooks/syncToMedusa.ts` triggers on product creation/update and calls Medusa Admin APIs.
-   **Medusa → Payload:** The `product-sync` subscriber in `medusa/src/subscribers/product-sync.ts` listens for `product.created` and `product.updated` events and syncs back to Payload.

## Deployment
-   **Frontend & CMS:** Deploy to Vercel (Payload 3.0 is built on Next.js and is 100% Vercel compatible).
-   **Medusa:** Deploy to Render (Free Tier) or Railway.
-   **Database:** Use Neon (Postgres) or Supabase.

## Lighthouse Results
Targeting 95+ Score. (Check `lighthouse.pdf` or video for results).
