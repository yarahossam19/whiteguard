# Whiteguard Website

Next.js website for Whiteguard - Intelligent Security Monitoring.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Zustand** (state management)

## Project Structure

```
src/
├── app/
│   ├── (marketing)/          # Route group - main site pages
│   │   ├── layout.tsx        # Header + Footer layout
│   │   ├── page.tsx          # Home
│   │   ├── about/
│   │   ├── services/
│   │   │   └── [slug]/       # Dynamic service pages
│   │   ├── industries/
│   │   ├── partners/
│   │   ├── resources/
│   │   ├── white-hawk/
│   │   ├── contact/
│   │   ├── platform/[slug]/
│   │   ├── solutions/[slug]/
│   │   ├── privacy-policy/
│   │   └── terms-of-service/
│   ├── layout.tsx            # Root layout
│   └── globals.css
├── components/
│   ├── layout/               # Header, Footer
│   └── ui/                   # Reusable UI components
├── config/
│   └── site.ts               # Navigation, footer links, site config
├── lib/
│   └── stores/               # Zustand stores
└── types/                    # TypeScript types
```

## Getting Started

```bash
# Install dependencies (already done)
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Best Practices

- **Route groups** `(marketing)` for shared layout without URL segment
- **Centralized config** in `src/config/site.ts` for nav/footer
- **TypeScript** for type safety
- **Zustand** for client-side UI state (mobile menu, dropdowns)
- **Metadata** per page for SEO
