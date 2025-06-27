# Creatorverse

Content creator discovery platform with custom search, infinite scroll masonry, and minimalist design.

## Stack

**Frontend:** React Router, TypeScript, Tailwind, DaisyUI, Framer Motion, TanStack Table  
**Backend:** Supabase PostgreSQL with custom functions  
**Development:** Vite, ESLint/Prettier, PNPM. Cosmos and Docker available.

## Features

**Public Gallery**

- Infinite scroll masonry layout with intersection observers
- Category filtering with animations
- 110+ curated content creators across 5 categories

**Admin Interface**

- Search autocomplete with server-side highlighting
- Tag-based filtering with AND logic
- Data table with server-side pagination and sorting
- Protected routes with Supabase Auth

## Technical Implementation

**Custom PostgreSQL Search**

```sql
get_search_words_with_filters(search_term, existing_tags)
```

- Word-boundary matching with highlighted results
- Multiple filter context with AND logic
- Common word exclusion for relevance

**Performance Optimizations**

- Intersection Observer API for efficient infinite scroll
- Server-side pagination and filtering
- Debounced search with loading states
- Custom React hooks for data management

**Database Architecture**

```sql
creators -- Core table with full creator data
random_creators -- View for randomized public gallery
categories -- View for distinct categories
exclusion_words -- Table for search optimization
```

## Setup

Environment: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`

Routes: `/` (public gallery) • `/admin` (admin panel)

## Structure

```
app/
├── pages/admin/     # Admin interface with search autocomplete
├── pages/homepage/  # Public gallery with infinite scroll
├── lib/client.ts    # Supabase client and API functions
└── data/creators.ts # TypeScript interfaces and data models
```

---

_Portfolio piece evolved from CodePath CRUD prework requirements for the course "Advanced Web Development"._
