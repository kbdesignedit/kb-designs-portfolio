# Katlyn Brown — Portfolio Website

## Overview
A professionally designed, single-page portfolio website for **Katlyn Brown**, an Instructional Designer & Creative Content Strategist based in Madisonville, Kentucky. The site showcases her work, skills, and professional experience with an aesthetic that follows her personal brand kit.

## ✅ Completed Features

### Design & Branding
- **Custom brand color palette** — Midnight Black (#1A1A1A), Warm Leather Brown (#8B7355), Deep Saddle Brown (#6B5344), Honey Tan (#A68B6A), Cognac (#7D5A3C), Desert Sand (#C4A882), Ivory Cream (#F5F0E8), Pure White (#FFFFFF), Charcoal (#2D2D2D)
- **Brand typography** — Cormorant Garamond (display), Josefin Sans (accents/labels), Nunito Sans (body)
- **Elegant, warm aesthetic** consistent with KB Designs brand identity

### Sections
1. **Hero** — Full-screen introduction with professional headshot, name, and tagline
2. **About** — Personal bio, philosophy, and key achievement metrics (35% completion rate increase, 25% engagement boost, 20+ courses)
3. **Services** — Six service cards covering Instructional Design, Content Strategy, Creative Design, Brand Training, Digital Marketing, and Project Management
4. **Portfolio** — Filterable project grid with modal detail views for each project:
   - Aromatherapy Curriculum & Workbook
   - Valeur Absolue Brand Training Course
   - Busy Mom's Bible Plan (30-Day Devotional)
   - Internal Training Design Showcase
   - UC Learning Platform Courses
   - KB Designs Brand Identity
5. **Featured Showcase** — Banner section highlighting Instructional Design work samples with download link
6. **Experience & Skills** — Timeline of professional experience, 20 skills, and education
7. **Testimonials** — Auto-rotating slider with quotes from recommendations
8. **Contact** — Form with project type selector + contact info and social links

### Interactive Features
- Preloader animation on page load
- Custom cursor (desktop only)
- Scroll-reveal animations
- Portfolio filtering by category (All, Instructional, Brand & Training, Creative)
- Project detail modals with full descriptions
- Animated counters for achievement metrics
- Testimonial auto-rotation slider
- Parallax effect on hero image
- Responsive mobile navigation with hamburger menu
- Smooth scrolling anchor navigation
- Active section highlighting in navigation
- Contact form with data persistence

## Entry URIs
- `/` or `/index.html` — Main portfolio page

### Navigation Anchors
- `#about` — About section
- `#services` — Services section
- `#portfolio` — Portfolio section
- `#experience` — Experience & Skills section
- `#testimonials` — Testimonials section
- `#contact` — Contact form section

### Downloadable Assets
- `assets/resume.docx` — Full resume
- `assets/instructional-design-sample.pdf` — Instructional design work sample
- `assets/busy-moms-bible-plan.pdf` — Busy Mom's Bible Plan PDF
- `assets/letters-of-rec.pdf` — Letters of recommendation

## Data Models
### contact_submissions
| Field | Type | Description |
|-------|------|-------------|
| id | text | Unique identifier |
| name | text | Contact name |
| email | text | Contact email |
| subject | text | Project type |
| message | text | Project details |

## Tech Stack
- HTML5 (semantic markup)
- CSS3 (custom properties, grid, flexbox, animations)
- Vanilla JavaScript (ES6+)
- Google Fonts CDN
- RESTful Table API (contact form storage)

## File Structure
```
index.html                              Main portfolio page
css/style.css                           Full stylesheet with brand design system
js/main.js                              Interactivity, animations, form handling
images/
  ├── headshot-1.jpg                    Hero banner headshot
  ├── headshot-2.jpg                    About section portrait
  ├── headshot-3.jpg                    Full-length portrait (hero)
  ├── banner.jpg                        Header banner
  └── bellabaci.jpg                     Product sample image
assets/
  ├── resume.docx                       Full resume download
  ├── instructional-design-sample.pdf   Work sample PDF
  ├── busy-moms-bible-plan.pdf          Devotional PDF
  └── letters-of-rec.pdf               Recommendation letters
```

## Recommended Next Steps
1. **Add more portfolio images** — Replace gradient placeholders with actual project screenshots
2. **Connect social media** — Update LinkedIn URL with actual profile link
3. **Add blog section** — Showcase thought leadership in instructional design
4. **Add video showreel** — Embed a portfolio video or project walkthrough
5. **SEO optimization** — Add Open Graph meta tags and structured data
6. **Analytics** — Integrate Google Analytics for visitor tracking
