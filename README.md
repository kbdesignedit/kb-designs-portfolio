# KB Designs — Katlyn Brown Portfolio

## Project Overview
- **Name**: KB Designs Portfolio
- **Goal**: Professional portfolio website for Katlyn Brown — Instructional Designer & Creative Content Strategist
- **Tech Stack**: Hono + TypeScript + Custom CSS + Cloudflare Pages

## Features

### Completed
- **Preloader** with branded animation (Moon Creme font, cognac accent line)
- **Custom cursor** (dot + ring) on desktop with hover expansion effects
- **Navigation** — fixed header with scroll effect, mobile hamburger menu
- **Hero Section** — editorial portrait, animated title, CTA buttons
- **About Section** — lifestyle photo, accent block with experience years, animated stat counters
- **Services** (6 cards) — eLearning Development, Content Strategy, Graphic Design, Leadership Training, Compliance & Certification, Performance Consulting
- **ADDIE Process** — 5-step visual process with connecting line
- **Portfolio Grid** — 9 projects with filter system (All, Instructional Design, Brand & Product, Marketing, Creative Content)
- **Project Modals** — click any portfolio item for detailed project info
- **Featured Showcase** — downloadable instructional design work sample PDF
- **Experience Timeline** — 5 professional roles with dates and descriptions
- **Skills Grid** — 20 skills with hover animation
- **Education** — BS in Education from Murray State University
- **Testimonials** — 3-slide auto-rotating carousel with dot navigation
- **Contact Section** — form + email/phone/location info + social links
- **Downloadable Assets** — Resume (DOCX), Cover Letter (DOCX), Work Sample PDF, Busy Mom's Bible Plan PDF
- **Scroll Reveal Animations** — fade up, slide left/right, staggered children
- **Fully Responsive** — mobile, tablet, desktop breakpoints

### Brand System
- **Fonts**: Moon Creme (titles, ALL CAPS), Camelia Beauty (subtitles, normal case), Hailey (body text)
- **Colors**: Midnight Black (#1A1A1A), Cognac (#7D5A3C), Desert Sand (#C4A882), Honey Tan (#A68B6A), Ivory Cream (#F5F0E8), Deep Saddle (#6B5344)

## File Structure
```
webapp/
├── src/index.tsx              # Main Hono app with full HTML
├── public/
│   ├── favicon.svg            # KB monogram favicon
│   └── static/
│       ├── style.css          # Complete CSS (brand system, all sections, responsive)
│       ├── app.js             # JavaScript (cursor, reveals, filters, modals, slider)
│       ├── fonts/             # Moon Creme, Camelia Beauty, Hailey
│       ├── images/            # 7 personal photos
│       │   ├── portrait-editorial.jpg      # Professional dark blazer shot (hero)
│       │   ├── portrait-professional.jpg   # Casual portrait with necklace
│       │   ├── lifestyle-casual.jpg        # Joyful studio shot on stool (about)
│       │   ├── lifestyle-joy.jpg           # Sitting, relaxed with jeans
│       │   ├── lifestyle-reading.jpg       # Reading on couch with pampas grass
│       │   ├── lifestyle-western.jpg       # Western-style outfit
│       │   └── lifestyle-working.jpg       # Working at desk with laptop/iPad
│       ├── *.pdf              # Work samples and downloadables
│       └── *.docx             # Resume and cover letter
├── ecosystem.config.cjs       # PM2 config
├── vite.config.ts             # Vite + Hono Cloudflare Pages build
├── wrangler.jsonc             # Cloudflare Pages config
└── package.json
```

## How to Deploy

### Local Development
```bash
npm install
npm run build
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000
```

### Deploy to Cloudflare Pages
```bash
npm run build
npx wrangler pages deploy dist --project-name kb-designs
```

### Deploy to GitHub Pages (Static)
1. Push this repository to GitHub
2. Go to Settings > Pages
3. Set source to the `main` branch

## Contact Info (Site Owner)
- **Email**: katyrbrown96@gmail.com
- **Phone**: (270) 210-2478
- **Location**: Madisonville, Kentucky
- **LinkedIn**: linkedin.com/in/katlyn-brown
