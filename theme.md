# Creatorverse Design System

**Geometric Minimalist Admin Interface Theme**

## Design Philosophy

**Institutional Minimalism Applied to Web Design**

- Function over form, but with intentional aesthetic choices
- Sharp geometric precision, high contrast, zero decorative elements
- Mathematical approach to color, typography, and spacing
- Museum-quality presentation inspired by institutions like Lenbachhaus
- Rebellious aesthetic that challenges mainstream web design through reduction

---

## Color Palette

### Primary Colors

```css
--color-primary: oklch(0% 0 0) /* Pure Black */ --color-primary-content: oklch(100% 0 0)
  /* White on Black */ --color-secondary: oklch(95% 0 0) /* Light Gray */
  --color-secondary-content: oklch(0% 0 0) /* Black on Light Gray */;
```

### Grayscale System

```css
--gray-50: oklch(98% 0 0) /* Near white backgrounds */ --gray-100: oklch(96% 0 0)
  /* Light backgrounds */ --gray-200: oklch(92% 0 0) /* Borders, dividers */
  --gray-300: oklch(88% 0 0) /* Disabled states */ --gray-400: oklch(75% 0 0)
  /* Secondary borders */ --gray-500: oklch(50% 0 0) /* Placeholder text */
  --gray-600: oklch(40% 0 0) /* Secondary text */ --gray-700: oklch(25% 0 0) /* Primary text */
  --gray-800: oklch(15% 0 0) /* Dark backgrounds */ --gray-900: oklch(0% 0 0) /* Pure black */;
```

### Semantic Colors

```css
--success: oklch(90.13% 0.153 164.14) /* Green - create actions */ --info: oklch(79.54% 0.103 205.9)
  /* Blue - update actions */ --warning: oklch(88.37% 0.135 79.94) /* Yellow - caution */
  --error: oklch(78.66% 0.15 28.47) /* Red - delete actions */;
```

### Action Color Coding

- **Create**: `text-green-700 dark:text-green-300`
- **Update**: `text-blue-700 dark:text-blue-300`
- **Delete**: `text-red-700 dark:text-red-300`

---

## Typography

### Font Stack

```css
font-chivo: 'Chivo', -apple-system, BlinkMacSystemFont, sans-serif
font-libre-bodoni: 'Libre Bodoni', Georgia, serif
font-archivo: 'Archivo', -apple-system, BlinkMacSystemFont, sans-serif
```

### Font Usage

- **UI Elements**: `font-chivo` - buttons, labels, navigation, table headers
- **Headings**: `font-libre-bodoni` - page titles, modal titles
- **Body Text**: `font-archivo` - paragraphs, descriptions, content

### Typography Scale

```css
/* Headers */
.header-xl:   text-4xl md:text-8xl          /* Main site headers */
.header-lg:   text-2xl md:text-4xl          /* Page titles */
.header-md:   text-xl                       /* Section headers */
.header-sm:   text-lg uppercase tracking-wide /* Component headers */

/* UI Text */
.ui-lg:       text-base font-medium         /* Large UI elements */
.ui-md:       text-sm font-medium           /* Standard UI elements */
.ui-sm:       text-xs uppercase tracking-wide /* Buttons, labels */

/* Content */
.content-lg:  text-base leading-relaxed     /* Primary content */
.content-md:  text-sm leading-tight         /* Secondary content */
.content-sm:  text-xs                       /* Metadata, timestamps */
```

### Text Treatment

- **Uppercase + Letter Spacing**: All UI elements (`uppercase tracking-wide`)
- **Font Weights**: `font-medium` for emphasis, `font-bold` for headers
- **Line Heights**: `leading-tight` for UI, `leading-relaxed` for content

---

## Layout & Spacing

### Grid System

```css
/* Standard grid patterns */
.grid-2: grid sm:grid-cols-2
.grid-3: grid sm:grid-cols-2 md:grid-cols-3
.masonry: gap-3 grid sm:grid-cols-2 md:grid-cols-3

/* Container constraints */
.container-sm: max-w-sm
.container-md: max-w-md
.container-lg: max-w-2xl
.container-xl: max-w-4xl
```

### Spacing Scale

```css
gap-1:    0.25rem   /* 4px  - Tight elements */
gap-2:    0.5rem    /* 8px  - Related elements */
gap-3:    0.75rem   /* 12px - Standard gap */
gap-4:    1rem      /* 16px - Section spacing */
gap-6:    1.5rem    /* 24px - Component spacing */
gap-8:    2rem      /* 32px - Page sections */
```

### Layout Principles

- **Sharp Edges**: No rounded corners (`border-radius: 0`)
- **Bold Borders**: `border-2` for emphasis, `border` for structure
- **Geometric Precision**: Everything aligns to grid
- **Generous Whitespace**: Clean breathing room between elements

---

## Components

### Buttons

```css
/* Primary Button */
.btn-primary {
  @apply bg-gray-900 dark:bg-gray-100 
         text-white dark:text-gray-900 
         border-2 border-gray-900 dark:border-gray-100
         px-4 py-2 font-chivo text-sm uppercase tracking-wide
         hover:bg-gray-800 dark:hover:bg-gray-200
         transition-colors;
}

/* Secondary Button */
.btn-secondary {
  @apply bg-gray-200 dark:bg-gray-700 
         text-gray-900 dark:text-gray-100
         border-2 border-gray-400 dark:border-gray-600
         px-4 py-2 font-chivo text-sm uppercase tracking-wide
         hover:bg-gray-300 dark:hover:bg-gray-600
         transition-colors;
}

/* Danger Button */
.btn-danger {
  @apply bg-red-600 hover:bg-red-700 
         text-white border-2 border-red-600
         px-4 py-2 font-chivo text-sm uppercase tracking-wide
         transition-colors;
}
```

### Tables

```css
.table-minimalist {
  @apply border-2 border-gray-900 dark:border-gray-100 
         w-full border-collapse overflow-x-auto;
}

.table-header {
  @apply bg-gray-100 dark:bg-gray-800
         border-b-2 border-r border-gray-900 dark:border-gray-100
         px-4 py-3 text-left 
         font-chivo font-bold text-sm uppercase tracking-wide;
}

.table-cell {
  @apply px-4 py-3 border-gray-400 dark:border-gray-600 
         border-r border-b text-sm;
}
```

### Modals

```css
.modal-overlay {
  @apply fixed top-0 left-0 z-50 
         flex items-center justify-center w-full h-full
         bg-gray-900/80 dark:bg-black/80;
}

.modal-content {
  @apply bg-white dark:bg-gray-800 
         border-2 border-gray-900 dark:border-gray-100
         min-h-40 max-h-[80vh] overflow-hidden;
}

.modal-header {
  @apply flex items-center justify-between p-4
         font-chivo font-bold text-lg uppercase tracking-wide;
}
```

### Tabs

```css
.tab-navigation {
  @apply flex items-end gap-0;
}

.tab-button {
  @apply px-6 py-2 border-2 border-b-0
         font-chivo text-sm font-medium uppercase tracking-wide
         transition-all;
}

.tab-active {
  @apply bg-white dark:bg-gray-800 
         text-gray-900 dark:text-gray-100 
         border-gray-900 dark:border-gray-100 z-10;
}

.tab-inactive {
  @apply bg-transparent text-gray-500 dark:text-gray-400
         border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700;
}
```

---

## Interactions & Animations

### Hover States

```css
/* Standard hover pattern */
.hover-lift {
  @apply transition-colors duration-200
         hover:bg-gray-50 dark:hover:bg-gray-800;
}

/* Button hover intensification */
.hover-darken {
  @apply hover:bg-gray-800 dark:hover:bg-gray-200;
}

/* Icon hover states */
.icon-hover {
  @apply text-gray-600 hover:text-gray-900 
         dark:text-gray-400 dark:hover:text-gray-100
         transition-colors;
}
```

### Framer Motion Settings

```javascript
// Geometric easing curve
const geometricEasing = [0.25, 0.25, 0, 1]

// Standard transition duration
const standardDuration = 0.2

// Stagger animations
const staggerDelay = 0.05

// Modal animations
const modalVariants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 }
}
```

---

## Visual Hierarchy

### Importance Levels

1. **Critical Actions**: Black buttons, red for dangerous actions
2. **Primary Content**: Dark gray text, medium font weight
3. **Secondary Content**: Medium gray text, smaller size
4. **Metadata**: Light gray text, smallest size
5. **Disabled/Inactive**: Very light gray, reduced opacity

### Border Hierarchy

- **Critical**: `border-2` - main containers, primary actions
- **Standard**: `border` - secondary elements, dividers
- **Subtle**: `border-gray-300` - background elements

### Z-Index Scale

```css
z-0:   0     /* Base layer */
z-10:  10    /* Elevated elements (active tabs) */
z-20:  20    /* Dropdowns, tooltips */
z-30:  30    /* Navigation overlays */
z-40:  40    /* Temporary overlays */
z-50:  50    /* Modals, critical overlays */
```

---

## Dark Mode Strategy

### Approach

- **Systematic Inversion**: Light becomes dark, dark becomes light
- **Maintained Contrast**: Same contrast ratios in both modes
- **Semantic Consistency**: Action colors remain recognizable

### Implementation Pattern

```css
/* Light mode primary, dark mode secondary */
.adaptive-bg {
  @apply bg-white dark:bg-gray-800 
         text-gray-900 dark:text-gray-100;
}

/* Border adaptation */
.adaptive-border {
  @apply border-gray-900 dark:border-gray-100;
}

/* Text adaptation */
.adaptive-text {
  @apply text-gray-700 dark:text-gray-300;
}
```

---

## Accessibility Guidelines

### Contrast Requirements

- **Text**: Minimum 4.5:1 contrast ratio
- **Large Text**: Minimum 3:1 contrast ratio
- **Interactive Elements**: Minimum 3:1 contrast ratio

### Focus States

```css
.focus-geometric {
  @apply focus:outline-none 
         focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100
         focus:ring-offset-2;
}
```

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  .motion-safe {
    @apply transition-none;
  }
}
```

---

## Usage Examples

### Page Layout

```jsx
<div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-archivo">
  <header className="font-libre-bodoni text-4xl text-gray-900 dark:text-white">
    creatorverse :: admin dashboard
  </header>
  <main className="p-8">{/* Content */}</main>
</div>
```

### Action Buttons

```jsx
<button className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-2 border-gray-900 dark:border-gray-100 px-4 py-2 font-chivo text-sm uppercase tracking-wide hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
  Primary Action
</button>
```

### Data Display

```jsx
<div className="border-2 border-gray-900 dark:border-gray-100 overflow-x-auto">
  <table className="w-full border-collapse">{/* Table content */}</table>
</div>
```

---

## Design Tokens Summary

This theme prioritizes:

- **Clarity over decoration**
- **Function over form** (but form follows function beautifully)
- **High contrast for accessibility**
- **Systematic approach to every design decision**
- **Scalable patterns that work across the entire application**

The result is a cohesive, professional interface that feels both timeless and contemporary - appropriate for serious administrative work while maintaining visual appeal through **geometric precision** and **institutional quality standards**.
