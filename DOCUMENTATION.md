# FatScran — Full Technical Documentation

## Overview

FatScran is a static high-protein meal prep recipe website hosted on GitHub Pages at `catpuncher90.github.io/fatscran`. It is built with vanilla HTML, CSS, and JavaScript — no framework, no build step. Backend functionality (ratings and reviews) is handled by Supabase. The site is installable as a Progressive Web App (PWA).

---

## Repository & Hosting

- **Repo:** `CatPuncher90/fatscran` on GitHub
- **Live URL:** `https://catpuncher90.github.io/fatscran`
- **Hosting:** GitHub Pages (static, no server-side rendering)
- **Branch:** `main`

---

## File Structure

```
fatscran/
├── index.html          # Recipe listing page
├── recipe.html         # Individual recipe page
├── shopping.html       # Shopping list page
├── planner.html        # Weekly meal planner page
├── styles.css          # All site styles
├── recipes.js          # Recipe data (single source of truth)
├── manifest.json       # PWA manifest
├── sw.js               # Service worker (PWA caching)
├── fatscran-icon.png   # PWA icon 512x512
├── fatscran-icon-small.png  # PWA icon 192x192
└── images/
    ├── naked-chicken-katsu-curry.jpg
    ├── oats-and-berries.jpg
    └── chicken-flatbread.jpg
```

---

## recipes.js — Data Layer

This is the single source of truth for all recipe content. All pages load it via `<script src="recipes.js">`.

### Recipe Object Schema

```js
{
  id: Number,                  // Unique integer ID. Never reuse.
  title: String,               // Display name
  section: String,             // "breakfast" | "dinner" | "tea" | "dessert" | "sauces"
  basePortions: Number,        // Number of portions the ingredient amounts are written for
  cookTime: String,            // e.g. "35 mins", "1 hr", "3 hrs"
  image: String,               // Optional. Path relative to root e.g. "images/foo.jpg"
  macrosPerPortion: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number              // Optional
  },
  ingredients: [
    {
      name: String,
      amount: Number | null,   // null means "to taste" / unscalable
      unit: String             // e.g. "g", "ml", "whole", "to taste"
    }
  ],
  steps: [
    {
      title: String,           // Short step name e.g. "Cook the rice"
      description: String      // Full step instructions
    }
  ]
}
```

### Helper functions (end of file)

**`scaleAmount(ingredient, portions, basePortions)`**
Scales an ingredient amount to the selected number of portions. Returns a formatted string. If `amount` is null, returns the unit string as-is (e.g. "to taste").

**`sections`**
A derived array of unique section names prefixed with "all", built from the recipes array. Used by filter buttons.

### Sections

| Section | Description |
|---|---|
| breakfast | Morning meals and oats |
| dinner | Lunch-style wraps, sandwiches, flatbreads |
| tea | Hot evening meals |
| dessert | Treats, Ninja Creami, baked goods |
| sauces | Sauces (currently empty in live data) |

### Adding a new recipe

1. Give it the next available `id` (currently highest is 86).
2. Set `section` to one of the five valid strings above.
3. Set `basePortions` to match the ingredient amounts you are entering.
4. Set `amount: null` for any ingredient that is "to taste" or not scalable.
5. Add it anywhere in the array (order doesn't affect display).

### Images

- Store images in the `images/` folder.
- Reference them in the recipe object as `image: "images/filename.jpg"`.
- Only recipes with an `image` field will show a banner image. Cards and recipe pages without one simply have no image block.
- Recommended dimensions: at least 1000px wide, 16:9 for cards, taller crops work well for the recipe page banner.

---

## index.html — Recipe Listing

**URL:** `/fatscran/` or `/fatscran/index.html`

### What it does

Renders all recipes as a filterable, searchable grid of cards. Each card links to `recipe.html?id={id}`.

### Features

- **Search:** Filters by recipe title and ingredient names in real time as the user types.
- **Section filters:** Pill buttons for All, Breakfast, Dinner, Tea, Dessert, Sauces, Favourites. Only one active at a time.
- **Favourites:** Heart icon on each card. Toggled via `localStorage` key `fatscran-favs` (array of IDs). The Favourites filter shows only hearted recipes.
- **Recipe cards:** Show an image (if present), title, section badge, macros per portion (kcal, protein, carbs, fat), and cook time.
- **Card title height:** `.card-name` uses `min-height: calc(1.1rem * 1.35 * 2)` to always reserve two lines of height, keeping all cards consistent regardless of title length.

### Key JS functions

| Function | Description |
|---|---|
| `applyFilters()` | Re-renders the grid based on active section and search query |
| `renderCards(list)` | Builds and injects the card HTML from a recipe array |
| `toggleFav(id, event)` | Adds/removes a recipe ID from localStorage favourites |
| `recipeMatchesSearch(recipe, query)` | Returns true if the recipe title or any ingredient name includes the query |
| `badgeClass(section)` | Returns the CSS class string for a section badge |

### localStorage keys used

| Key | Value |
|---|---|
| `fatscran-favs` | JSON array of favourite recipe IDs |

---

## recipe.html — Individual Recipe

**URL:** `/fatscran/recipe.html?id={id}`

The page is fully JavaScript-rendered into `<main id="page-content">`. On load it reads the `id` query parameter, finds the matching recipe in the `recipes` array, and builds the entire page.

### Features

- **Banner image:** If `recipe.image` is set, shows a HelloFresh-style image banner with the title/badge overlapping it from below. If no image, shows the title/badge/meta inline.
- **Portions selector:** +/- buttons that re-render the page with scaled ingredient amounts and scaled macros. Starts at 1 portion.
- **Macros strip:** Shows calories, protein, carbs, fat scaled to the selected number of portions.
- **Add to shopping list button:** Adds or updates the recipe in `localStorage` `fatscran-list`. Button text changes to "Update shopping list" if already in the list.
- **Ingredients list:** Amounts scaled to selected portions using `basePortions` ratio. "to taste" ingredients show their unit string instead.
- **Method steps:** Numbered list with a terracotta circle number badge.
- **Ratings and reviews:** Fetched from and submitted to Supabase. Star picker (1-5), optional text review. Reviews displayed in reverse chronological order with average rating shown.
- **Not found state:** If the `id` param doesn't match any recipe, shows a "Recipe not found" message.

### Supabase integration

- **Project URL:** `https://qtvlctyyjjxmrpbchchl.supabase.co`
- **Table:** `ratings`
- **Columns:** `recipe_id` (int), `stars` (int 1-5), `review` (text, nullable), `created_at` (timestamp)
- **Auth:** Anonymous key only. RLS policies must allow public insert and select on the `ratings` table.
- **Anon key:** Stored inline in `recipe.html`. Do not commit a service role key here.

### Key JS functions

| Function | Description |
|---|---|
| `renderPage()` | Full re-render of page content for current portions value |
| `changePortion(delta)` | Increments/decrements portions (min 1) and re-renders |
| `addToList()` | Saves recipe + portions to localStorage shopping list |
| `updateBtn()` | Updates the add/update button label and colour |
| `fetchRatings()` | GET request to Supabase ratings table |
| `submitRating()` | POST request to Supabase ratings table |
| `loadRatings()` | Fetches and renders average rating + review list |
| `setStars(n)` | Updates the interactive star picker UI |

### localStorage keys used

| Key | Value |
|---|---|
| `fatscran-list` | JSON array of `{ id, portions }` objects |

---

## shopping.html — Shopping List

**URL:** `/fatscran/shopping.html`

Fully JavaScript-rendered. Reads the shopping list from `localStorage` and builds a two-column layout: recipe list on the left, ingredient shopping list on the right.

### Features

- **Recipe list (left panel):** Shows each added recipe with its title, section, portion count, total kcal and protein. Has +/- portion controls and a Remove button per recipe.
- **Weekly nutrition totals:** Below the recipe list, shows the summed calories, protein, carbs, and fat across all recipes and portions.
- **Ingredient list (right panel):** Aggregates and merges all ingredients across all added recipes, scaled by portions. Groups them by food category. Shows quantities with units.
- **Tick boxes:** Each ingredient can be ticked off. Ticked state persists in `localStorage`. Ticked items appear faded with strikethrough and a filled checkbox.
- **Clear list:** Removes all recipes and resets ticked state.
- **Print:** Prints the ingredient list only (recipe list panel hidden via print CSS).
- **Empty state:** If no recipes added, shows a prompt with a link to browse recipes.

### Category guessing

Ingredients are automatically assigned to a display category using `guessCategory(name)` which regex-matches the ingredient name against known patterns. Categories in display order: meat, fish, dairy, veg, fruit, carbs, tins, sauces, spices, other.

### localStorage keys used

| Key | Value |
|---|---|
| `fatscran-list` | JSON array of `{ id, portions }` objects |
| `fatscran-checked` | JSON array of ticked ingredient name keys (lowercase) |

---

## planner.html — Weekly Meal Planner

**URL:** `/fatscran/planner.html`

A weekly calendar view showing Monday to Sunday with three meal slots per day (Breakfast, Dinner, Tea). Supports navigating ±4 weeks from the current week.

### Features

- **Week navigation:** Prev/Next buttons move one week at a time. A "Today" button returns to the current week. Prev/Next disable at the ±4 week limit.
- **Meal slots:** Each slot shows the assigned recipe title and its macros. Clicking a slot opens the recipe picker modal.
- **Modal picker:** Searchable list of all recipes. Clicking a recipe assigns it to the slot. Includes a "Remove recipe" option if a recipe is already assigned.
- **Day totals:** If any slots are filled, each day column shows a total kcal and protein for that day.
- **Batch cook summary:** Below the grid, lists all recipes planned for the week with the days they're needed and cook time.
- **Add week to shopping list:** Adds one portion of each planned recipe (unique recipes only) to `localStorage` `fatscran-list`, then redirects to shopping.html.
- **Today highlight:** Current day column header is highlighted in the accent colour.
- **Keyboard:** Pressing Escape closes the modal.

### Data storage

Each week's plan is stored as a separate localStorage key. The key format is `week-{year}-{month}-{date of Monday}` e.g. `week-2026-5-15`.

The value is a JSON object with slot keys of format `{Day}-{meal}` e.g. `Mon-breakfast`, mapped to a recipe ID integer.

### localStorage keys used

| Key | Value |
|---|---|
| `week-{year}-{month}-{date}` | JSON object of slot assignments for that week |
| `fatscran-list` | Written to when "Add week to shopping list" is used |

---

## styles.css — Styling

Single stylesheet shared across all pages.

### Design tokens (CSS variables)

| Variable | Value | Usage |
|---|---|---|
| `--accent` | `#B8561E` | Primary brand colour, buttons, badges |
| `--accent-dark` | `#964517` | Button hover states |
| `--accent-light` | `#F3E0D2` | Hover backgrounds |
| `--text` | `#1C1208` | Body text |
| `--muted` | `#7C6E64` | Secondary text, labels |
| `--border` | `#DDD4C4` | All borders |
| `--bg` | `#FAF7F2` | Page background |
| `--bg-card` | `#F4EFE5` | Card backgrounds |
| `--bg-surface` | `#EAE4D8` | Inset surfaces |
| `--shadow-sm` | `0 2px 8px ...` | Card default shadow |
| `--shadow-md` | `0 8px 28px ...` | Card hover shadow |
| `--radius` | `10px` | Standard border radius |
| `--radius-sm` | `6px` | Small border radius |

### Typography

- **Headings / recipe titles:** Playfair Display (serif), loaded from Google Fonts
- **Body / UI:** DM Sans (sans-serif), loaded from Google Fonts

### Section badge colours

| Badge class | Background | Text |
|---|---|---|
| `.badge-breakfast` | `#FEF0D0` | `#7A4E0A` |
| `.badge-dinner` | `#DCE9D6` | `#2A5820` |
| `.badge-tea` | `#E8DFEF` | `#5A3278` |
| `.badge-sauces` | `#F5E0D8` | `#8A3010` |
| `.badge-dessert` | `#FCE4EC` | `#9B2D5E` |

### Recipe banner image

`.recipe-banner-image` sets the height of the image container on the recipe page.

- Desktop: `280px`
- Mobile (max 640px): `360px` (taller crop on small screens)

### Responsive breakpoints

| Breakpoint | Changes |
|---|---|
| `max-width: 800px` | Recipe body and shopping layout switch to single column. Recipe title shrinks. Macros strip goes 2-column. |
| `max-width: 640px` | Recipe banner image height increases to 360px. |
| `max-width: 480px` | Main padding reduced. Nav logo shrinks. Card stats and macros go 2-column. Recipe title and macro values shrink further. |

### Print styles

Applied when `window.print()` is called from shopping.html. Hides the recipe picker panel, nav, and action buttons. Strips backgrounds and borders for clean black-and-white output.

---

## PWA (Progressive Web App)

### manifest.json

| Field | Value |
|---|---|
| `name` | FatScran |
| `short_name` | FatScran |
| `start_url` | `/fatscran/` |
| `display` | `standalone` |
| `background_color` | `#DDD4C4` |
| `theme_color` | `#C25A28` |
| Icons | 192x192 (`fatscran-icon-small.png`) and 512x512 (`fatscran-icon.png`) |

### sw.js — Service Worker

Uses a **network-first** caching strategy. On every fetch request it tries the network first, caches a successful response, and falls back to the cache if the network fails.

- **Cache name:** `fatscran-v2`
- **Pre-cached URLs:** index, recipe, shopping, planner HTML pages; styles.css; recipes.js; both icon files
- **Install:** Pre-caches listed URLs and immediately activates (`skipWaiting`)
- **Activate:** Deletes any caches that are not `fatscran-v2`
- **Fetch:** Network first, cache on success, cache fallback on failure (returns index.html if no match found)

**Important:** The cache name is `fatscran-v2`. If the service worker strategy or cached files change significantly, increment the version to `fatscran-v3` etc. to force old caches to be deleted.

---

## Supabase Backend

Only used for the ratings/reviews feature on recipe pages.

| Setting | Value |
|---|---|
| Project URL | `https://qtvlctyyjjxmrpbchchl.supabase.co` |
| Table | `ratings` |
| Auth method | Anonymous key (public) |

### Required RLS policies on `ratings` table

- Allow public `SELECT` (to fetch reviews)
- Allow public `INSERT` (to submit reviews)
- `GRANT SELECT, INSERT ON ratings TO anon;` must also be set

### ratings table schema

| Column | Type | Notes |
|---|---|---|
| `id` | int8 | Primary key, auto increment |
| `recipe_id` | int4 | Foreign key (logical) to recipe id |
| `stars` | int2 | 1-5 |
| `review` | text | Nullable |
| `created_at` | timestamptz | Default now() |

---

## localStorage Summary

| Key | Used by | Description |
|---|---|---|
| `fatscran-favs` | index.html | Array of favourite recipe IDs |
| `fatscran-list` | recipe.html, shopping.html, planner.html | Array of `{ id, portions }` for the shopping list |
| `fatscran-checked` | shopping.html | Array of ticked ingredient keys |
| `week-{year}-{month}-{date}` | planner.html | Per-week meal plan objects |

All data is stored client-side only. Clearing browser data or localStorage resets everything.

---

## Development Workflow

There is no build process. To make changes:

1. Edit the relevant file locally in `~/fatscran/`
2. Test locally by opening the files in a browser or running a local server
3. Push to GitHub:

```
cd ~/fatscran && git add -A && git commit -m "your message" && git push origin main
```

GitHub Pages deploys automatically on push to `main`. Allow 30-60 seconds for changes to go live.

### Environment

- OS: Ubuntu (WSL2 on Windows), username `yelram`
- No package manager or bundler required
- Recipe data sourced from MacroFactor app exports (Excel)

---

## Known Patterns & Conventions

- **Ingredient amounts set to `null`** mean "to taste" or are unscalable (e.g. garlic to taste, salt and pepper). These display their `unit` string directly.
- **`basePortions`** must match the amounts in the ingredients array. The scaling formula is `amount * (selectedPortions / basePortions)`.
- **Recipe IDs** are not sequential by design (gaps exist from skipped/merged recipes during import). Always use the next available integer above the current maximum (86 as of this writing).
- **Section "dinner"** is used for lunch-style cold/quick-assemble meals (wraps, sandwiches, flatbreads, salads), not just evening meals.
- **Section "tea"** is used for hot cooked evening meals.
- **Prep steps always come before cooking steps** in the method.
- **Recipe images** are optional. Cards without images just have no image block — there is no placeholder.
- **The Sauces section** exists as a filter button but currently has no recipes in the data.
