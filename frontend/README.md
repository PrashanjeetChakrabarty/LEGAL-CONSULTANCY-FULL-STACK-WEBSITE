# F&V Legal Consultancies - Premium Law Firm Web App

This is a production-grade, immersive Next.js web application built for **F&V Legal Consultancies**, featuring a cinematic 3D experience, secure consultation booking with Razorpay, and a Firebase/Supabase backed Admin Portal.

## Tech Stack
* **Frontend:** Next.js (App Router), React 18, Tailwind CSS, TypeScript
* **Animations & 3D:** Framer Motion, GSAP, Lenis Smooth Scroll, React Three Fiber (R3F)
* **Backend:** Firebase (Auth, Firestore), Firebase Admin SDK (API verification)
* **Storage:** Supabase Storage (Lawyer portraits, documents)
* **Payments:** Razorpay Server-side Integration
* **Components:** ShadCN UI (Lucide Icons, Radix Primitives)

## Environment Setup
Duplicate `.env.example` into `.env.local` and add the required API keys.

1. **Firebase**: Create a project in [Firebase Console](https://console.firebase.google.com). Enable Authentication and Firestore. Generate a Service Account key and paste the details into the Admin SDK variables.
2. **Supabase**: Create a project in [Supabase](https://supabase.com). Export the connection URL and Anon/Service Role keys. Create a public bucket (e.g., `media`).
3. **Razorpay**: Create a [Razorpay](https://razorpay.com) account. Generate Test Mode API keys and add them to the `.env.local`.

## Getting Started

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Project Structure
* `/app` - Next.js App Router (Public routes & API endpoints)
* `/app/(admin)` - Protected admin routes
* `/components/3d` - Immersive 3D logic and R3F components
* `/components/forms` - Complex React Hook Form integrations mapped to Razorpay
* `/lib` - Service configurations (Firebase, Supabase, Razorpay)

## Deployment (Vercel)
This app is ready for zero-config Vercel deployment. Connect your Git repository to Vercel and inject the environment variables in the Project Settings.
