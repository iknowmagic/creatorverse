# Creatorverse

A content creator discovery platform evolved from basic CRUD requirements into a sophisticated admin system with comprehensive history tracking and geometric minimalist design aesthetics.

## Architecture Overview

### Frontend Stack

- **React Router 7** with TypeScript
- **Tailwind CSS 4.x** with custom institutional design system
- **DaisyUI** as base component library
- **Framer Motion** for animations
- **TanStack Table v8** for data management
- **Vite** for development and build

### Backend & Database

- **Supabase PostgreSQL** with custom functions and triggers
- **Global history tracking** system (last 50 actions across all creators)
- **Automatic audit logging** for all creator changes
- **Smart cleanup triggers** maintaining data retention limits

## Core Features

### Public Gallery

- **Infinite scroll masonry layout** with intersection observers
- **Category filtering** with animated state transitions
- **110+ curated content creators** across 5 categories
- **Responsive design** optimized for mobile and desktop

### Admin Interface

- **Tab-based dashboard** (Data management | History tracking)
- **Advanced search** with autocomplete and tag-based filtering
- **Server-side pagination** and sorting
- **Modal system** for edit/delete confirmations
- **Protected routes** with Supabase authentication

### History & Audit System

- **Global undo functionality** tracking last 50 actions system-wide
- **Smart restore logic** (UPDATE existing records, INSERT deleted ones)
- **Action type tracking** (create/update/delete) with visual indicators
- **Selective history management** (restore individual states, clear history)

## Database Design

### Core Tables

```sql
creators              -- Main creator data
creator_history       -- Audit trail with full record snapshots
categories           -- View for distinct categories
random_creators      -- View for randomized public display
```

### Automated Systems

- **Change logging triggers** capture all creator modifications
- **Cleanup triggers** maintain 50-record global limit
- **PostgreSQL functions** for restore operations and history management

## Design System

### Aesthetic Philosophy

- **Geometric minimalism** - function-driven design with intentional aesthetic choices
- **Museum-quality presentation** inspired by institutions like Lenbachhaus
- **Sharp geometric precision, high contrast, zero decorative elements**
- **Institutional design language** that rebels against mainstream web aesthetics

### Technical Implementation

- **oklch color system** for mathematical color precision
- **Typography hierarchy** using Chivo, Libre Bodoni, and Archivo fonts
- **Semantic color coding** (green=create, blue=update, red=delete)
- **Custom CSS classes** extending DaisyUI with minimalist overrides
- **Dark mode support** throughout the interface

## Component Architecture

### Reusable Components

- **Modal system** with size variants and custom actions
- **Generic Tabs component** accepting `{id, label, component}` configuration
- **Search autocomplete** with server-side highlighting
- **Data tables** with pagination, sorting, and filtering

### State Management

- **Custom hooks** for data fetching (`useCreators`, `useHistory`)
- **Server-side operations** for pagination and search
- **Optimistic updates** with error handling
- **Real-time cleanup** after database operations

## Technical Innovations

### Performance Optimizations

- **Intersection Observer API** for efficient infinite scroll
- **Server-side pagination** reducing client-side data load
- **Debounced search** with loading states
- **Masonry layout** with dynamic grid calculation

### Database Features

- **Automatic history logging** via PostgreSQL triggers
- **Global action limit** maintaining system performance
- **Smart restore operations** checking record existence
- **Audit trail preservation** for compliance and debugging

## Development Approach

This project demonstrates evolution from basic CRUD requirements to production-quality software architecture. Key developments include:

- **Systematic design thinking** with documented design system
- **Database engineering** with triggers and functions
- **Component reusability** and maintainable code patterns
- **Professional UI/UX** suitable for real-world deployment

## File Structure

```
app/
├── lib/client.ts              # Supabase configuration and API functions
├── pages/
│   ├── admin/                 # Admin interface components
│   │   ├── AdminDashboard.tsx # Main admin layout with tabs
│   │   ├── AdminTable.tsx     # Creator data management
│   │   ├── HistoryTable.tsx   # History tracking and restoration
│   │   ├── Modal.tsx          # Reusable modal system
│   │   ├── Tabs.tsx           # Generic tab component
│   │   └── useCreators.ts     # Data management hooks
│   └── homepage/              # Public gallery
│       ├── Gallery.tsx        # Infinite scroll implementation
│       ├── Masonry.tsx        # Dynamic grid layout
│       └── InfiniteScrolling.tsx # Performance optimizations
├── app.css                    # Geometric minimalist design system implementation
└── theme.md                   # Design system documentation
```

## Database Schema

### History Tracking System

```sql
-- Automatic logging of all creator changes
CREATE TRIGGER creator_change_trigger
  AFTER INSERT OR UPDATE OR DELETE ON creators
  FOR EACH ROW EXECUTE FUNCTION log_creator_change();

-- Global cleanup maintaining 50-record limit
CREATE TRIGGER creator_history_cleanup_trigger
  AFTER INSERT ON creator_history
  FOR EACH ROW EXECUTE FUNCTION cleanup_creator_history();
```

## Setup

### Environment Variables

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Routes

- `/` - Public creator gallery with infinite scroll
- `/admin` - Protected admin interface with history tracking

---

_Portfolio piece demonstrating advanced React patterns, database engineering, and systematic design thinking. Evolved from CodePath "Advanced Web Development" course prework requirements._
