# Dr. Ajay K. Gaikwad Portfolio

A polished, modern academic portfolio website for Dr. Ajay Krishnath Gaikwad, Professor and HoD of Civil Engineering at PCCoE, Pune. Built with Next.js and Tailwind CSS, the site showcases professional experience, research interests, publications, achievements, academic profiles, and contact information in a responsive and visually refined experience.

## Overview

This repository contains a high-performance one-page portfolio designed to present academic, professional, and research work with clarity and elegance. It combines storytelling, motion design, and modern web standards to create a professional online presence for faculty and researchers.

## Live Demo

- Vercel deployment: [Coming soon](#)
- Repository: [AGPortfolio](https://github.com/)

## Features

- Responsive portfolio experience across desktop, tablet, and mobile
- Hero section with strong visual storytelling and professional branding
- About section with academic biography and qualifications
- Experience timeline highlighting leadership and academic roles
- Research and innovation section covering PhD focus and engineering interests
- Publications section with curated research highlights
- Projects section for major academic and technical initiatives
- Achievements and milestone showcase
- Contact section with a working contact form
- Academic Profiles section for Scholar, Scopus, Web of Science, ORCID, and LinkedIn
- Visitor counter with online presence and total visitor tracking via Supabase
- Smooth scrolling and modern motion-based interactions
- Accessible navigation, semantic structure, and polished UI states
- SEO metadata and theme configuration for a professional web presence

## Tech Stack

| Category | Technology |
| --- | --- |
| Frontend | Next.js 15, React 18 |
| Backend | Next.js API Routes |
| Framework | App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Database | Supabase |
| Realtime | Supabase Realtime Presence |
| Hosting | Vercel-ready |
| Version Control | Git / GitHub |
| Deployment | Vercel (recommended) |

## Project Architecture

This project is a modern single-page portfolio built as a Next.js App Router application. The UI is composed of reusable section-based components, while the data for the portfolio is centralized in a structured data module. The site uses client-side animations for a polished experience and integrates Supabase for real-time visitor presence and total visitor tracking.

## Folder Structure

```text
AGPortfolio/
├── app/
│   ├── api/
│   │   ├── contact/
│   │   └── visitors/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AcademicProfiles.tsx
│   ├── ContactForm.tsx
│   └── VisitorCounter.tsx
├── lib/
│   └── supabase.ts
├── public/
│   ├── ag-sir.jpg
│   ├── mtech-degree-photo.png
│   └── pccoe _logo.jpg
├── data/
│   └── analytics.json
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
├── postcss.config.mjs
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
git clone <your-repository-url>
cd AGPortfolio
npm install
```

### Environment Variables

Create a local environment file named `.env.local` in the project root with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Locally

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Development Notes

- The portfolio content is driven by structured data in the app layer and can be updated easily.
- The contact form uses a server API route for form handling.
- The visitor counter uses Supabase for real-time presence and visitor tracking.
- Styling is centralized through Tailwind CSS and custom theme values for brand consistency.

## Deployment

This project is ready to be deployed on Vercel. For production deployment:

1. Connect the repository to Vercel.
2. Add the environment variables in the Vercel dashboard.
3. Deploy the project.

## License

This project is intended for personal and academic portfolio use. Please review any institutional or content usage policies before reuse or redistribution.
