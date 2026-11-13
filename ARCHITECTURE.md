# Kituo cha Matumaini — Next.js Architecture

**Product:** Dhuran Supporting Organization — Kituo cha Matumaini ya Watoto  
**Language:** Swahili (`sw-TZ`)  
**Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide React  
**Deployment:** Vercel / Node.js server  
**Auth:** Role-based (parent / admin)  
**Persistence:** localStorage fallback → REST/Server Actions API → PostgreSQL (production)

---

## 1. Design Principles

1. **Parity with v7 HTML** — Every page, form, and print report from the original HTML must be reproduced in Next.js.
2. **Mobile-first** — Original CSS is mobile-first (`max-width: 820px` breakpoints); Tailwind `sm:`/`md:`/`lg:` prefixes follow the same progression.
3. **Swahili-first i18n** — All UI strings in Swahili; English only as fallback.
4. **Dark mode by default** — Original CSS variables support dark; Next.js uses `next-themes` + Tailwind `dark:`.
5. **Offline-capable MVP** — Start with `localStorage` + `IndexedDB` (mirroring v7), then migrate to server API.
6. **Print-to-PDF** — Replace `@media print` CSS with `react-to-print` or browser `window.print()` on dedicated print routes.
---

## 3. Route-to-Page Mapping (v7 HTML → Next.js)

| v7 Section | Next.js Route | Component | Notes |
|------------|---------------|-----------|-------|
| `#/` (home) | `(public)/page.tsx` | Hero, Stats, Services grid, Gallery, Events, Mission/Vision | `stats` fetched from storage |
| `#/uongozi` | `(public)/leadership/page.tsx` | Team cards (initials avatars) | Static or CMS-driven |
| `#/changia` | `(public)/donate/page.tsx` | Donation form + bank/card info | Form → storage/API |
| `#/wasiliana` | `(public)/contact/page.tsx` | Contact cards + message form | Form → email/API |
| `#/ingia` | `(public)/login/page.tsx` | Parent tab + Admin tab | Role-based redirect |
| `#/akaunti` | `(protected)/parent/[childId]/page.tsx` | Child profile, records, docs, donations, PDF print | Parent sees own child; admin sees any |
| `#/admin` | `(protected)/admin/page.tsx` | Dashboard stats | Quick overview |
| `#/admin` children | `(protected)/admin/children/page.tsx` | Searchable table + actions | View/Add/Edit/Delete/PDF |
| `#/admin` clinic reminders | `(protected)/admin/clinic-reminders/page.tsx` | 14-day window + SMS/WhatsApp | Template + send |
| `#/admin` events | `(protected)/admin/events/page.tsx` | Upload image/video | Media store |
| `#/admin` gallery | `(protected)/admin/gallery/page.tsx` | Image upload grid | Public gallery on home |
| `#/admin` donations | `(protected)/admin/donations/page.tsx` | Donations table | Exportable |
| Print | `print/[childId]/page.tsx` | A4-style report | `window.print()` |
---

## 4. Data Model (TypeScript)

### Core Types (`types/index.ts`)

```ts
export type Role = 'parent' | 'admin' | null

export interface Child {
  id: string
  no: string           // KM-0001
  pass: string         // parent login password
  jina: string
  tar?: string         // date of birth (ISO)
  jinsia?: string
  kundi?: string
  uzito?: number
  urefu?: number
  lugha?: string
  hali?: string        // care needed
  mahalizaliwa?: string
  uzitoz?: number
  njia?: string
  njiti?: string
  maziwa?: string
  kutembea?: number
  kuongea?: number
  mzio?: string
  sugu?: string
  urithi?: string
  afya?: string
  upasuaji?: string
  chanjo?: string
  ulemavu?: string
  kiwango?: string
  chanzo?: string
  vifaa?: string
  kliniki?: string
  bima?: string
  shule?: string
  wazazi?: string
  uhusiano?: string
  simu?: string        // guardian phone
  kazi?: string
  anwani?: string
  dharura?: string
  next?: string        // next clinic date (ISO)
  foto?: string        // data URL or storage path
  docs: Document[]
  rec: HealthRecord[]
  siku: string         // registration date
  createdAt: string
}

export interface Donation {
  id: string
  kid: string          // child reg no or 'Yeyote'
  huduma: string       // services or 'Huduma zote'
  kiasi: number        // TSh
  aina: string         // donor type
  jina: string
  simu: string
  email?: string
  makazi?: string
  anwani?: string
  mara: string         // frequency
  lipa: string         // payment method
  ujumbe?: string
  siri: boolean        // anonymous
  siku: string
}

export interface Event {
  id: string
  c: string            // description
  v: boolean           // is video
  ts: number           // timestamp
  mediaUrl?: string
}

export interface GalleryItem {
  id: string
  c: string            // caption
  img: string          // data URL or storage path
}

export interface HealthRecord {
  id: string
  tarehe: string
  aina: string
  // dynamic RF fields
  [key: string]: unknown
}

export interface Document {
  t: string            // label
  img: string
}

export interface AuthSession {
  role: Role
  kid?: string         // parent: child reg no
  view?: string        // admin: child being viewed
  act?: string         // 'edit' | 'rec'
}

export interface BankInfo {
  benki: string
  jina: string
  akaunti: string
  tawi: string
  swift: string
  sarafu: string
  link?: string        // card payment link
  maelezo?: string
}
```
---

## 5. State Management Strategy

### Layer 1: Client Cache (MVP — mirrors v7)

- `localStorage` for `kmData` (kids, donations, gallery, events)
- `IndexedDB` for `kmMedia` (image/video blobs, compressed)
- `sessionStorage` for `kmS` (auth session)

### Layer 2: Server (Production)

- Next.js Server Actions or API Routes
- PostgreSQL + Prisma/Supabase
- File uploads to Vercel Blob / S3 / Cloudinary

### Migration Path

```
MVP (localStorage) → Hybrid (localStorage + sync on login) → Full Server (PostgreSQL + blob storage)
```

---

## 6. Authentication & Authorization

| Role | Can Access | Cannot Access |
|------|-----------|---------------|
| **Unauthenticated** | Home, Leadership, Donate, Contact, Login | Parent account, Admin dashboard |
| **Parent** | Own child's profile, records, documents, PDF print | Other children, admin dashboard, child registration |
| **Admin** | All pages, child CRUD, clinic reminders, events, gallery, donations | — |

### Auth Flow

1. Parent logs in with child reg no + password → `role: 'parent'`, `kid: 'KM-0001'`
2. Admin logs in with admin password → `role: 'admin'`
3. Session stored in `sessionStorage` (cleared on tab close) + optional `localStorage` "remember me"
4. Route guards in `(protected)/layout.tsx` redirect unauthenticated users to `/login`

---

## 7. Styling & Theming

**Tailwind CSS** with custom design tokens matching v7 CSS variables:

| Token | v7 Value | Tailwind Config |
|-------|----------|-----------------|
| `--bg` | `#F0F5F3` | `bg-background` |
| `--card` | `#fff` | `bg-card` |
| `--text` | `#16302A` | `text-foreground` |
| `--muted` | `#4E645D` | `text-muted-foreground` |
| `--blue` | `#1D6FB8` | `primary` |
| `--pink` | `#1F9D6B` | `secondary` |
| `--orange` | `#5B7083` | `destructive` (accent) |
| `--teal` | `#0E7C86` | `accent` |
| `--yellow` | `#8FE0B0` | `warning` |
| `--line` | `#D6E1DD` | `border` |

- **Fonts:** Fredoka (headings) + Nunito (body) via Google Fonts, matching v7
- **Dark mode:** `dark:` variants using `next-themes`
- **Icons:** Lucide React (replaces SVG sprite `#i-*` symbols)
- **Responsive:** Mobile-first, same `820px` breakpoint as v7

---

## 8. Key Components & Their v7 Equivalents

| v7 Class/Feature | Next.js Component | Implementation Notes |
|------------------|-------------------|---------------------|
| `.pill` header | `components/layout/header.tsx` | Sticky, mobile menu toggle, auth state buttons |
| `.hero2` | Home hero section | Gradient background, CTA buttons, tile stats |
| `.sts` / `.st` | `components/dashboard/stat-card.tsx` | Number + label + icon |
| `.grid` / `.card` | `components/ui/card.tsx` | Service cards with colored top border (`--c`) |
| `.av` | `components/ui/avatar.tsx` | Initials circle avatar |
| `.chk` | `components/ui/checkbox-group.tsx` | Checkbox pills with checked state |
| `.two` | Grid `grid-cols-1 md:grid-cols-2` | Two-column form layout |
| `.panel` | `components/ui/card.tsx` with colored top border | Section panels |
| `.tl` / `.tl li` | Timeline list | Health records with left border accent |
| `.tw` table | `components/ui/table.tsx` | Desktop table → mobile card view (`data-l` labels) |
| `.galg` | Image gallery grid | `aspect-ratio: 1`, lightbox on click |
| Print `@media print` | `print/[childId]/page.tsx` | Dedicated print route, `window.print()` |
| `localStorage` `kmData` | `lib/storage.ts` | Typed CRUD with fallback |
| `IndexedDB` `kmMedia` | `hooks/use-media.ts` | Compressed image/video storage |
---

## 9. Form Architecture (Zod + React Hook Form)

All v7 forms converted to typed, validated forms:

1. **Donation Form** (`donF`) → Zod schema: child selection, services (array), amount (min 1000 TSh), donor info, payment method, frequency
2. **Contact Form** (`cF`) → Name, phone (required), message (required)
3. **Login** (`lgP` / `lgA`) → Parent: reg no + password; Admin: password only
4. **Child Registration** (`regF`) → 7 field groups (PF): child info, birth, history, disability, health services, education/home, guardian
5. **Health Record** (`recF`) → 12 field groups (RF): vitals, nutrition, development milestones, mental health, therapy, lab, follow-up
6. **Clinic Reminder Template** (`tplT`) → Editable SMS/WhatsApp template with `{mzazi}`, `{mtoto}`, `{tarehe}`, `{siku}` placeholders
7. **Event Upload** (`evF`) → Description + image/video (max 20MB video)
8. **Gallery Upload** (`galF`) → Caption + image

---

## 10. Print / PDF Strategy

v7 uses `@media print` CSS hiding everything except `#pr`. Next.js approach:

- **Route:** `/print/[childId]` — server-rendered, no header/footer, A4-sized CSS
- **Trigger:** Button on child profile calls `window.print()`
- **Content:** Child header, vitals table, health history timeline, donations list, clinic next appointment
- **Alternative:** `react-to-print` for client-side print of specific DOM sections

---

## 11. Clinic Reminders (SMS/WhatsApp)

v7 logic preserved:

- Filter children with `next` appointment within ±14 days
- Compute days left (`dleft`): `leo` (today), `kesho` (tomorrow), or `baada ya siku N`
- Send via `sms:+255XXXXXXXXX?body=...` or `https://wa.me/255XXXXXXXXX?text=...`
- Track `rs` (last sent date) to avoid duplicates
- Template placeholder replacement: `{mzazi}`, `{mtoto}`, `{tarehe}`, `{siku}`

---

## 12. Media Handling (IndexedDB → Cloud)

### MVP (offline-first)

- Images compressed to max 700–900px, JPEG quality 0.7
- Stored as data URLs in `IndexedDB` (`kmMedia` store)
- Videos max 20MB, stored as data URLs

### Production migration

- Upload to Vercel Blob / AWS S3 / Cloudinary
- Return signed URLs; store paths in database
- Keep IndexedDB as offline cache

---

## 13. Performance Optimizations

- **Images:** `next/image` with `quality: 75`, `sizes`, lazy loading
- **Fonts:** `next/font/google` with self-hosting (Fredoka, Nunito)
- **Code splitting:** Route-based lazy loading via App Router
- **Bundle:** Tree-shake Lucide icons (`import { Icon } from 'lucide-react'`)
- **Caching:** Stale-while-revalidate for public pages (home, leadership, contact)
- **Offline:** Service worker optional for PWA (future)

---

## 14. Security Considerations

| Concern | v7 (current) | Next.js Recommendation |
|---------|-------------|----------------------|
| Admin password | Hardcoded `admin123` in JS | Environment variable + bcrypt hash |
| Parent passwords | Plain text in localStorage | Hashed in DB, or JWT session |
| Data storage | `localStorage` (plain text) | Encrypted DB + row-level security |
| File uploads | IndexedDB (client only) | Server-side validation, virus scan, type check |
| Print reports | Client-side `window.print()` | Server-rendered print route, no sensitive data in URL |
| XSS | `e()` escape function | React auto-escapes; use `dangerouslySetInnerHTML` sparingly |

---

## 15. Deployment Options

### Option A: Vercel (Recommended)

- Zero-config Next.js deployment
- Vercel Blob for media
- Vercel Analytics + Speed Insights
- Environment variables for admin secret, DB connection

### Option B: Self-hosted (Node.js)

- `next start` on Docker
- PostgreSQL (Supabase / Railway / self-hosted)
- S3-compatible storage for media

### Option C: Static Export (MVP only)

- `next export` with all data in `localStorage` (no backend)
- Host on GitHub Pages / Netlify Drop
- **Limitation:** No multi-user data sharing; each browser isolated

---

## 16. Migration Checklist from v7 HTML

- [ ] Extract all Swahili copy into translation constants
- [ ] Convert CSS variables to Tailwind config
- [ ] Replace SVG sprite icons with Lucide React
- [ ] Build `(public)` routes: home, leadership, donate, contact, login
- [ ] Build `(protected)` routes: parent account, admin dashboard, children, reminders, events, gallery, donations
- [ ] Implement `lib/storage.ts` with localStorage + IndexedDB (drop-in replacement for v7 JS)
- [ ] Implement form schemas with Zod
- [ ] Build print route `/print/[childId]`
- [ ] Add dark mode toggle (or follow system preference like v7)
- [ ] Add auth middleware/guards
- [ ] Test on mobile (same breakpoints: 640px, 820px)
- [ ] Production: Replace localStorage with API routes + PostgreSQL

---

## 17. Recommended Next Steps

1. **Initialize project:** `npx create-next-app@latest kituo-cha-matumaini --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
2. **Install dependencies:** `lucide-react`, `next-themes`, `zod`, `react-hook-form`, `@hookform/resolvers`, `date-fns` (swahili locale), `clsx`, `tailwind-merge`
3. **Create `ARCHITECTURE.md`** (this file) and agree on stack
4. **Build UI primitives** (`components/ui/`) first
5. **Implement storage layer** (`lib/storage.ts`) mirroring v7 `localStorage`/`IndexedDB`
6. **Build routes incrementally:** Public → Login → Parent → Admin

**Project location:** `C:\Users\Hp\.cline\data\workspaces\chat\kituo-cha-matumaini`