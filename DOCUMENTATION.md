# FatScran — Full Technical Documentation

## Overview

FatScran is a high-protein meal prep recipe website hosted on GitHub Pages at `catpuncher90.github.io/fatscran`. It is built with vanilla HTML, CSS, and JavaScript — no framework, no build step. Recipe data, user data, and images are stored in Supabase. The site supports user accounts (email/password and Google OAuth) and syncs favourites, shopping lists, and meal plans across devices when signed in. Ratings and reviews are public (no login required). The site is installable as a Progressive Web App (PWA).

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
├── profile.html        # User profile and macro targets page
├── admin.html          # Admin page for adding/editing recipes
├── styles.css          # All site styles
├── recipes.js          # Recipe data array (client-side fallback)
├── manifest.json       # PWA manifest
├── sw.js               # Service worker (passthrough, no caching)
├── fatscran-icon.png   # PWA icon 512x512
├── fatscran-icon-small.png  # PWA icon 192x192
├── js/
│   ├── utils.js        # Shared utilities and hamburger nav
│   ├── auth.js         # Auth, session management, and synced data layer
│   └── db.js           # Recipe database operations (Supabase)
└── images/
    ├── naked-chicken-katsu-curry.jpg
    ├── oats-and-berries.jpg
    └── chicken-flatbread.jpg
```

> **Note on images:** New recipe images are uploaded to Supabase Storage (`recipe-images` bucket) via the admin page and referenced as full public URLs. The local `images/` folder contains only the original three images that were added before Supabase Storage was set up.

### Script load order

All pages that use the Supabase backend load scripts in this order:

```html
<script src="https://js-de.sentry-cdn.com/7e75aa5aac90f9f87fe2ea2f59c6b137.min.js"
        integrity="sha256-uJqZ9zwsj6gMvcoGxgfxs6q1L3kHWCLNxJGRCckAZ6E="
        crossorigin="anonymous"></script>
<script src="recipes.js"></script>
<script src="js/utils.js"></script>
<script src="js/auth.js"></script>
<!-- then js/db.js if the page needs it -->
```

The Sentry loader is first so unhandled errors in all subsequent scripts are captured. It carries a Subresource Integrity hash — if the CDN content changes the browser will refuse to execute it. `auth.js` defines `SUPABASE_URL` and `SUPABASE_KEY`, which `db.js` depends on, so `auth.js` must always come before `db.js`.

> **SRI maintenance:** If Sentry rotates the loader, the `integrity` hash will no longer match and the script will be blocked silently. Recompute the hash with `curl -s <url> | openssl dgst -sha256 -binary | openssl base64 -A` and update all 6 HTML pages.

---

## js/utils.js — Shared Utilities

Loaded by all pages. Contains helpers that would otherwise be duplicated across page scripts.

### HTML escaping

| Function | Description |
|---|---|
| `escapeHtml(str)` | Escapes `&`, `<`, `>`, `"`, and `'` to their HTML entities. Returns `''` for null/undefined. **Must be called on all user-supplied strings before they are interpolated into innerHTML template literals.** Does not escape SVG icons, CSS class names, or numeric values. |

### localStorage helpers

| Function | Description |
|---|---|
| `getList()` / `saveList(list)` | Read/write shopping list from localStorage |
| `getFavourites()` / `saveFavourites(favs)` | Read/write favourites from localStorage |
| `getChecked()` / `saveChecked(checked)` | Read/write ticked shopping list items from localStorage |

### Recipe helpers

| Function | Description |
|---|---|
| `badgeClass(section)` | Returns CSS class string for a section badge e.g. `"badge badge-tea"` |
| `parseCookTime(str)` | Parses a cook time string (e.g. `"1 hr 20 mins"`) into total minutes |
| `guessCategory(name)` | Regex-matches an ingredient name to a shopping category |

### SVG icon helpers

| Function | Description |
|---|---|
| `clockIconSvg(size)` | Returns inline SVG for the clock icon |
| `portionIconSvg(size)` | Returns inline SVG for the portions/people icon |

### Hamburger nav

An IIFE at the bottom of `utils.js` wires up the mobile hamburger nav. It listens for `DOMContentLoaded` (or runs immediately if the DOM is already ready) and attaches click handlers to `#nav-hamburger` and `#nav-links`. Clicking the hamburger toggles `.is-open` on the nav links list. Clicking any nav link or clicking outside the nav closes the menu. All pages use `id="main-nav"` on the `<nav>` element.

---

## js/auth.js — Auth & Synced Data Layer

The most important shared script. Loaded by all pages. Defines `SUPABASE_URL` and `SUPABASE_KEY` (used by `db.js` and `recipe.html` for ratings). Provides auth, session management, the nav sign-in/avatar UI, and all synced data functions.

### The `sb` object

A minimal Supabase REST client. All methods use `authedHeaders()` which injects the user's JWT when a session exists, or falls back to the anon key when signed out.

| Method | Description |
|---|---|
| `sb.get(table, params)` | GET request to a Supabase table |
| `sb.post(table, body)` | POST (insert) to a Supabase table |
| `sb.patch(table, params, body)` | PATCH (update) to a Supabase table |
| `sb.delete(table, params)` | DELETE from a Supabase table |
| `sb.signInWithEmail(email, password)` | Signs in via email/password |
| `sb.signUpWithEmail(email, password)` | Creates a new account |
| `sb.signInWithGoogle()` | Initiates Google OAuth redirect. The `redirect_to` URL is hardcoded to `https://catpuncher90.github.io/fatscran/` (not derived from `window.location.origin`) to prevent open redirect if the page is proxied from another domain. |
| `sb.signOut()` | Signs out and clears session |
| `sb.refreshSession(refreshToken)` | Refreshes an expired access token |

### Session management

The session is stored in localStorage under the key `fatscran-session` as a JSON object:

```js
{
  access_token: String,
  refresh_token: String,
  expires_at: Number,   // Unix timestamp (ms)
  user: { id, email }
}
```

| Function | Description |
|---|---|
| `getSession()` | Returns the stored session object, or null |
| `isLoggedIn()` | Returns true only if a session exists **and** `expires_at > Date.now()`. Expired sessions return false so auth-gated UI does not appear before `ensureSession()` refreshes the token. |
| `clearSession()` | Removes `fatscran-session` from localStorage and `fatscran-state` from sessionStorage (prevents search state leaking to the next user on a shared device). |

### Auth modal

`injectAuthModal()` is called by `initAuth()` and appends the sign-in modal and nav auth elements (sign-in button or user avatar) directly to the DOM. Pages do not need to include any auth HTML themselves.

| Function | Description |
|---|---|
| `openAuthModal()` | Shows the auth modal |
| `closeAuthModalDirect()` | Hides the auth modal |
| `handleAuthSubmit()` | Handles email/password sign-in or sign-up. On signup, enforces a minimum of 8 characters and at least one number or symbol before calling Supabase. On sign-in failure, always shows a generic "Invalid email or password." message regardless of the Supabase error, to prevent account enumeration. |
| `updateNavAuth()` | Updates the nav to show sign-in button or user avatar |
| `toggleUserMenu()` | Opens/closes the avatar dropdown |
| `handleSignOut()` | Signs out and refreshes nav state |

### Page lifecycle

`initAuth()` is called at the bottom of each page's script. It:
1. Checks for a Google OAuth callback in the URL and completes the flow if present.
2. Loads and validates the stored session (refreshing if expired).
3. Injects the auth modal and nav UI.
4. Calls `onAuthStateChange()` if the page defines it (used to re-render after sign-in/out).

Pages that need to react to auth state define:
```js
async function onAuthStateChange() { /* re-render with new auth state */ }
```

### Synced data functions

These functions sync to Supabase tables when the user is signed in, and fall back to localStorage when signed out. Pages call these instead of directly reading/writing localStorage.

> **`user_id` note:** For `favourites`, `shopping_list`, and `meal_plans`, the `user_id` column is explicitly included in POST request bodies. This ensures Supabase RLS `auth.uid()` can match the row correctly. The `profiles` table is different: its PK column is `id` (not `user_id`) and must be included in upsert payloads as the conflict key.

| Function | Description |
|---|---|
| `getFavs()` | Returns array of favourite recipe IDs |
| `toggleFavSync(id)` | Fetches all favourite rows in one GET, checks existence locally, issues a single DELETE or POST, then returns the updated ID array from the local copy — no second network round trip. |
| `getListSync()` | Returns array of `{ id, portions }` shopping list items |
| `saveListSync(list)` | Replaces the shopping list entirely |
| `addToListSync(id, portions)` | Adds or updates a recipe in the shopping list |
| `removeFromListSync(id)` | Removes a recipe from the shopping list |
| `getPlanSync(weekKey)` | Returns the meal plan object for a given week key |
| `savePlanSlot(weekKey, slotKey, recipeId)` | Saves or removes a single meal slot assignment |

---

## js/db.js — Recipe Database

Loaded by pages that need to read or write recipes or user profiles from Supabase (`recipe.html`, `admin.html`, `shopping.html`, `planner.html`, `profile.html`). Depends on `SUPABASE_URL` and `SUPABASE_KEY` defined in `auth.js`.

### Error handling

All HTTP failure paths call `dbError(context, res)` — a private helper that reads the response body, logs `context [status]: body` to the console and to Sentry, then throws `new Error('Save failed. Please try again.')`. This prevents raw Supabase error text (which can contain table names, column names, and constraint details) from reaching the user.

### Recipe functions

| Function | Description |
|---|---|
| `fetchAllRecipes()` | Fetches all recipes from the 4 recipe tables in parallel and assembles them into the same schema as `recipes.js` |
| `fetchRecipeById(id)` | Fetches a single recipe from Supabase by ID. Used in admin for editing. |
| `fetchRecipeByIdDirect(id)` | Fetches a single recipe by hitting only the 4 required tables for that ID in parallel. Faster than loading all recipes. Used by `recipe.html`. Falls back to the local `recipes` array if the fetch fails. |
| `saveRecipe(data, editingId)` | Creates or updates a recipe across all 4 tables. The macro payload includes `sugar` (nullable) in addition to calories, protein, carbs, fat, and fiber. If `editingId` is provided, updates existing records; otherwise inserts new ones. Returns the recipe ID. |
| `deleteRecipe(id)` | Deletes a recipe and all its related rows in the 4 tables. |
| `uploadRecipeImage(file)` | Validates that `file.type` starts with `image/` and that `file.size` is under 5 MB before uploading to the `recipe-images` Supabase Storage bucket. On HTTP failure, logs the full status and response body to Sentry via `dbError()` then throws a generic message. |
| `checkIsAdmin()` | Checks the `profiles` table for the current user and returns true if `is_admin` is set. Returns false if not signed in. |

### Profile functions

| Function | Description |
|---|---|
| `getProfile()` | Calls `ensureSession()` then fetches the current user's row from the `profiles` table (`?id=eq.{userId}`). Returns the profile object or `null` if not signed in or not found. |
| `saveProfile(data)` | Calls `ensureSession()` then upserts the profile row using POST with `Prefer: resolution=merge-duplicates`. The `id` field (matching the auth user ID) is always included in the payload as the primary key. |
| `uploadAvatar(file)` | Validates file type (`image/*`) and size (≤5 MB), then uploads to the `avatars` Supabase Storage bucket at `{userId}/avatar.{ext}`. On failure, logs full detail to Sentry via `dbError()` and throws a generic message. Returns the public URL on success. |

---

## recipes.js — Client-Side Recipe Array

The original recipe data array. Still loaded by all pages and used as:

- **Fallback:** `fetchRecipeByIdDirect()` falls back to this array if the Supabase fetch fails.
- **Planner and shopping pages:** These pages currently read from `recipes` for fast local lookups (recipe title, macros etc.) alongside the synced list/plan data from Supabase or localStorage.

The array and its schema are unchanged. See the recipe object schema below.

### Recipe Object Schema

```js
{
  id: Number,                  // Unique integer ID. Never reuse.
  title: String,               // Display name
  section: String,             // "breakfast" | "dinner" | "tea" | "dessert" | "sauces"
  basePortions: Number,        // Number of portions the ingredient amounts are written for
  cookTime: String,            // e.g. "35 mins", "1 hr", "3 hrs"
  image: String,               // Optional. Path or full Supabase Storage URL.
  macrosPerPortion: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    sugar: Number | null,      // Optional, shown conditionally on recipe page
    fiber: Number | null       // Optional, shown conditionally on recipe page
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
A derived array of unique section names prefixed with "all", built from the recipes array. Used by filter buttons on index.html.

### Sections

| Section | Description |
|---|---|
| breakfast | Morning meals and oats |
| dinner | Lunch-style wraps, sandwiches, flatbreads |
| tea | Hot evening meals |
| dessert | Treats, Ninja Creami, baked goods |
| sauces | Sauces (currently empty in live data, filter button hidden until recipes exist) |

### Adding a new recipe

New recipes should be added via `admin.html` which writes directly to Supabase. If adding to `recipes.js` as well for the local fallback:

1. Give it the next available `id` (currently highest is 86).
2. Set `section` to one of the five valid strings above.
3. Set `basePortions` to match the ingredient amounts you are entering.
4. Set `amount: null` for any ingredient that is "to taste" or not scalable.

---

## index.html — Recipe Listing

**URL:** `/fatscran/` or `/fatscran/index.html`

### What it does

Renders all recipes as a filterable, searchable, sortable grid of cards. Each card links to `recipe.html?id={id}`.

### Features

- **Search:** Filters by recipe title and ingredient names. The input is wrapped in a `<form autocomplete="off">` (form-level attribute is required because some browsers ignore input-level `autocomplete`). Input also carries `autocorrect="off"`, `autocapitalize="off"`, `spellcheck="false"`, and `name="search"`. Keystrokes are debounced via `onSearchInput()` with a 180ms timeout so `applyFilters()` only fires once the user pauses typing.
- **Sort dropdown:** Sits inline with the search bar. Options: No sort (default), Highest protein, Lowest calories, Quickest cook time. Sorting is always applied within section groups, never across them. Cook time sort parses the string value (e.g. "1 hr 20 mins") into minutes for accurate ordering.
- **Section filters:** Pill buttons for All, Breakfast, Dinner, Tea, Dessert, Favourites. Sauces button is hidden automatically if no sauce recipes exist. Only one active at a time.
- **Default order:** When sort is set to "No sort" and the All filter is active, recipes are grouped by section in this order: Breakfast, Dinner, Tea, Sauces, Dessert.
- **Result count:** Displays "Showing X recipes" above the grid, updates live on every filter and search change.
- **Favourites:** Heart icon on each card. Toggled via `toggleFavSync()` (syncs to Supabase when signed in, localStorage when not). The Favourites filter shows only hearted recipes.
- **Recipe cards:** Show image (if present), title, section badge, cook time with clock icon (above macros), macros per portion (kcal, protein, carbs, fat), and a "per portion" label at the bottom.
- **Card title height:** `.card-name` uses `min-height: calc(1.1rem * 1.35 * 2)` to always reserve two lines of height, keeping all cards consistent regardless of title length.
- **Admin edit button:** If the signed-in user is an admin, a small pencil icon appears on each card linking to `admin.html?edit={id}`.
- **Back button state:** When clicking through to a recipe, the active section filter, search query, and sort option are saved to `sessionStorage`. On returning to index.html they are restored automatically. `restoreState()` is called *after* `Promise.all([fetchAllRecipes(), getFavs(), ...])` completes, ensuring `currentFavs` is populated before the first `renderCards()` call.

### Key JS functions

| Function | Description |
|---|---|
| `applyFilters()` | Re-renders the grid based on active section, search query, and sort |
| `renderCards(list)` | Builds and injects the card HTML from a recipe array |
| `toggleFav(id, event)` | Calls `toggleFavSync()` to add/remove a recipe from favourites |
| `recipeMatchesSearch(recipe, query)` | Returns true if the recipe title or any ingredient name includes the query |
| `badgeClass(section)` | Returns the CSS class string for a section badge |
| `parseCookTime(str)` | Parses a cook time string into total minutes for sorting |
| `sortWithinGroups(list, sortBy)` | Sorts recipes within their section groups by the given sort key |
| `groupBySection(list)` | Groups and orders recipes by section for the default view |
| `saveState()` | Saves active filter, search, and sort to sessionStorage |
| `restoreState()` | Restores filter, search, and sort from sessionStorage on page load |

### sessionStorage keys used

| Key | Value |
|---|---|
| `fatscran-state` | JSON object with `section`, `query`, and `sort` fields |

---

## recipe.html — Individual Recipe

**URL:** `/fatscran/recipe.html?id={id}`

The page is fully JavaScript-rendered into `<main id="page-content">`. On load it reads the `id` query parameter, calls `fetchRecipeByIdDirect(id)` to fetch from Supabase (falling back to the local `recipes` array), and builds the entire page.

### Features

- **Banner image:** If `recipe.image` is set, shows a HelloFresh-style image banner with the title/badge overlapping it from below. If no image, shows the title/badge/meta inline.
- **Portions selector:** +/- buttons that re-render the page with scaled ingredient amounts and scaled macros. Starts at 1 portion.
- **Macros strip:** Shows calories, protein, carbs, fat scaled to the selected number of portions. Sugar and fiber are shown conditionally if present on the recipe (`!= null` check). The strip uses `repeat(auto-fit, minmax(0, 1fr))` to adapt from 4 to 6 columns depending on which optional macros are present.
- **Add to shopping list button:** Calls `addToListSync()` then `await updateBtn()` to save the recipe and immediately update the button state. Button text changes to "Update list" and background darkens if already in the list.
- **Share button:** On mobile uses the Web Share API (native share sheet). On desktop copies the URL to clipboard and briefly shows "Copied!" before resetting. Both the add and share buttons use inline SVG icons with a `.btn-label` span for the text so the icon is preserved during state changes.
- **Ingredients list:** Amounts scaled to selected portions using `basePortions` ratio. "to taste" ingredients show their unit string instead.
- **Method steps:** Numbered list with a terracotta circle number badge.
- **Ratings and reviews:** Only shown to signed-in users (gated via `getSession()` — the form is hidden and replaced with a "Sign in to leave a review" prompt for signed-out users). Fetched from and submitted to Supabase `ratings` table. Review textarea has `maxlength="1000"`. Reviews display for everyone regardless of auth state.
- **Admin edit button:** If `checkIsAdmin()` returns true, an "Edit recipe" button appears in the action row linking to `admin.html?edit={id}`.
- **Print view:** Printing a recipe page hides nav, back link, portions control, action buttons, banner image, and ratings. Shows title, macros, ingredients, and method steps cleanly in black and white.
- **Not found state:** If `recipeId` is `NaN` or falsy (missing/non-numeric `?id=` param), the not-found state renders immediately before any auth or Supabase calls. If the ID is valid but not found in Supabase, the same state renders after the fetch.

### Key JS functions

| Function | Description |
|---|---|
| `renderPage()` | Full re-render of page content for current portions value |
| `changePortion(delta)` | Increments/decrements portions (min 1) and re-renders |
| `addToList()` | Calls `addToListSync()` then `await updateBtn()` to update button state |
| `updateBtn()` | Async. Reads current list via `getListSync()` and updates button label and colour. Must be awaited after `addToListSync()` to avoid a race. |
| `shareRecipe()` | Shares via Web Share API on mobile, copies URL to clipboard on desktop |
| `fetchRatings()` | GET request to Supabase ratings table |
| `submitRating()` | POST request to Supabase ratings table |
| `loadRatings()` | Fetches and renders average rating + review list |
| `setStars(n)` | Updates the interactive star picker UI |

---

## shopping.html — Shopping List

**URL:** `/fatscran/shopping.html`

Fully JavaScript-rendered. Reads the shopping list via `getListSync()` (Supabase when signed in, localStorage when not) and builds a two-column layout: recipe list on the left (380px), ingredient shopping list on the right.

### Features

- **Recipe list (left panel):** Shows each added recipe with its title, section, portion count, total kcal and protein. Has +/- portion controls and a Remove button per recipe. Recipe names are allowed to wrap onto two lines (no truncation).
- **Weekly nutrition totals:** Below the recipe list, shows the summed calories, protein, carbs, and fat across all recipes and portions.
- **Weekly macro progress bars:** If the user is signed in and has daily targets set in their profile, coloured progress bars labelled **"WEEKLY MACRO PROGRESS (7-day target)"** appear below the weekly totals showing actual vs target (×7) for calories, protein, carbs, and fat. Colour logic: green = 90–110% of target, amber = under 90%, red = over 110%.
- **High-protein suggestions:** If the user is signed in and has a profile, the top 5 recipes by protein content that are not already in the list are shown with an Add button. Excludes already-listed recipes.
- **Ingredient list (right panel):** Aggregates and merges all ingredients across all added recipes, scaled by portions. Groups them by food category. Shows quantities with units.
- **Tick boxes:** Each ingredient can be ticked off. Ticked state persists in `localStorage` (`fatscran-checked`). Ticked items appear faded with strikethrough and a filled checkbox.
- **Clear list:** Calls `saveListSync([])` to remove all recipes and resets ticked state.
- **Print:** Prints the ingredient list only (recipe list panel hidden via print CSS).
- **Empty state:** If no recipes added, shows a prompt with a link to browse recipes.

### Category guessing

Ingredients are automatically assigned to a display category using `guessCategory(name)` from `js/utils.js`, which regex-matches the ingredient name against known patterns. Categories in display order: meat, fish, dairy, veg, fruit, carbs, tins, sauces, spices, other.

### localStorage keys used

| Key | Value |
|---|---|
| `fatscran-checked` | JSON array of ticked ingredient name keys (lowercase). Always local, never synced. |

---

## planner.html — Weekly Meal Planner

**URL:** `/fatscran/planner.html`

A weekly calendar view showing Monday to Sunday with three meal slots per day (Breakfast, Dinner, Tea). Supports navigating ±4 weeks from the current week.

### Features

- **Week navigation:** Prev/Next buttons move one week at a time. A "Today" button returns to the current week. Prev/Next disable at the ±4 week limit.
- **Meal slots:** Each slot shows the assigned recipe title and its macros. Clicking an empty slot opens the recipe picker modal. Clicking a filled slot also opens the modal (with a "Remove recipe" option).
- **Slot copy button:** When a slot has a recipe, a small copy icon appears alongside the remove (×) button. Clicking it opens a modal with checkboxes for each other day of the week. Confirming copies that recipe to the same meal slot on all checked days.
- **Day copy button:** When any slot in a day is filled, a copy icon appears in the day column header. Clicking it opens a modal with checkboxes for the other 6 days. Confirming copies all filled slots from that day to each selected day, overwriting those slots. Empty slots in the source day clear the corresponding target slots.
- **Both copy operations** call `savePlanSlot()` for each affected slot and re-render the week.
- **Mobile horizontal scroll:** On screens ≤768px the week grid switches from 7 equal columns to a horizontal scrolling flex row. Each day column is a fixed 220px wide, keeping all three meal slots fully visible with no vertical clipping within the grid. The container uses `overflow-x: auto`, `-webkit-overflow-scrolling: touch`, and `scroll-behavior: smooth`.
- **Recipe picker modal:** Pre-filtered to the meal type of the slot being opened (e.g. opening a breakfast slot shows breakfast recipes by default). A filter toggle row at the top of the modal provides buttons for Breakfast, Dinner, Tea, and All. The active filter is highlighted. The search input filters within the active section filter. The filter resets to the slot's meal type each time the modal opens.
- **Suggested recipes:** When opening an **empty** slot with no active search query, the top of the modal shows a **"Suggested for you"** section (highlighted with `accent-light` background) containing up to 3 recipe recommendations. Suggestions are only shown when the user has daily macro targets set in their profile. Suggestions are filtered to the slot's meal section and ranked by how closely each recipe's macros match the remaining daily gap (target minus already-planned macros for that day), with protein weighted 3× over calories. The "All [meal] recipes" divider separates suggestions from the full list. Suggestions disappear while the user is searching.
- **`userProfile` caching:** The profile (including macro targets) is fetched once in `init()` via `Promise.all` and cached in the module-level `userProfile` variable. The modal suggestion logic reads `userProfile` directly — `getProfile()` is not called on every modal open.
- **Day totals:** If any slots are filled, each day column shows total kcal and protein for that day. If the user has a calorie target set, the totals row is colour-coded: green = 80–120% of daily target, amber = under 80%, red = over 120%.
- **Day progress bar:** A thin bar below the day totals shows how many of the 3 meal slots are filled.
- **Batch cook summary:** Below the grid, lists all recipes planned for the week with the days they're needed and cook time.
- **Weekly macro overview:** Below the batch summary, if the user has targets set in their profile, shows a totals grid comparing the week's planned macros against weekly targets (daily target × 7). Values are coloured using `tl-green`, `tl-amber`, `tl-red` CSS classes applied directly to the `.weekly-total-value` element.
- **Add week to shopping list:** Counts how many slots each recipe fills across the week and adds that many portions to the shopping list (e.g. oats planned 3 days → 3 portions added). Then redirects to shopping.html.
- **Today highlight:** Current day column header is highlighted in the accent colour.
- **Keyboard:** Pressing Escape closes both the recipe picker modal and the copy modal.

### Key JS functions

| Function | Description |
|---|---|
| `renderWeek()` | Renders the full 7-day grid including slots, day totals, copy buttons |
| `openModal(day, meal)` | Opens the recipe picker for a slot; sets `modalSectionFilter = meal` and highlights the matching filter button |
| `setModalFilter(section)` | Updates `modalSectionFilter`, active button state, and re-runs `filterModal` |
| `filterModal(query)` | Rebuilds the modal list; prepends suggestions section when slot is empty and query is blank |
| `getRemainingMacros(day)` | Sums macros from filled slots in a day column and returns the gap to each daily target (clamped to 0) |
| `getSuggestions(day, meal)` | Returns up to 3 recipes ranked by macro gap fit; skips if no targets set |
| `openCopySlotModal(day, meal, recipeId)` | Opens the copy modal for a per-slot copy |
| `openCopyDayModal(day)` | Opens the copy modal for a per-day copy |
| `confirmCopy()` | Reads checked days, captures copy state into locals *before* closing the modal, then calls `savePlanSlot()` for each affected slot |
| `addWeekToShoppingList()` | Counts slot occurrences per recipe ID, then adds that count as portions to the shopping list |
| `removeFromSlot(day, meal)` | Removes a recipe from a slot and saves |
| `changeWeek(dir)` | Moves the planner ±1 week and reloads plan data |

### Data storage

Plan data is synced via `getPlanSync(weekKey)` and `savePlanSlot(weekKey, slotKey, recipeId)`. When signed in these read/write the `meal_plans` Supabase table. When signed out they fall back to localStorage.

The week key format is `week-{year}-{month}-{date of Monday}` e.g. `week-2026-5-15`. Slot keys are `{Day}-{meal}` e.g. `Mon-breakfast`.

---

## profile.html — User Profile

**URL:** `/fatscran/profile.html`

Redirects to `index.html` if the user is not signed in. The page content is fully JavaScript-rendered into `<div id="profile-content">` by `renderProfile(profile)` after `getProfile()` is called on load. Loads `js/db.js` in addition to the standard script stack.

### Features

- **Avatar:** Displays a circle with the user's initial if no avatar is set. Clicking "Change photo" triggers a hidden file input; the selected image is uploaded to the `avatars` Supabase Storage bucket via `uploadAvatar()` and the preview updates immediately. If the upload fails, the full error message is shown in red below the button (not silently swallowed).
- **Display name:** Free-text input saved to the `display_name` column in `profiles`.
- **Tab toggle — TDEE Calculator / Manual targets:** Switching tabs shows or hides the TDEE calculator section. The chosen mode is saved as `use_tdee_calc` (bool) in the profile.
- **TDEE calculator:** Takes age, weight (kg), height (cm), sex, and activity level. Calculates BMR using Mifflin-St Jeor, then multiplies by an activity factor to get TDEE. A goal selector (Maintain / Lose weight / Build muscle / Custom) applies a deficit or surplus. A slider sets the deficit/surplus amount (100–1000 kcal, default 500). The label updates live to show "Deficit: X kcal" or "Surplus: X kcal".
- **Protein multiplier:** Radio buttons for 1.6 / 2.0 / 2.4 g/kg. Default 2.0. Protein = `weight × multiplier`. Fat = `weight × 0.8 g/kg`. Carbs = `(targetCalories - protein×4 - fat×9) / 4`.
- **Daily targets:** Four editable number inputs (calories, protein, carbs, fat) that are auto-filled by the TDEE calculator but can be overridden manually. These are always saved regardless of which tab is active.
- **Save:** Upserts to the `profiles` table via `saveProfile()`. Shows "Saved!" or an error message inline.

### TDEE formula

| Variable | Formula |
|---|---|
| BMR (male) | `10 × weight + 6.25 × height - 5 × age + 5` |
| BMR (female) | `10 × weight + 6.25 × height - 5 × age - 161` |
| TDEE | `BMR × activity_multiplier` |

Activity multipliers: sedentary = 1.2, lightly active = 1.375, moderately active = 1.55, very active = 1.725, athlete = 1.9.

### Key JS functions

| Function | Description |
|---|---|
| `recalc()` | Reads all TDEE inputs and recalculates the four target fields. No-ops if not on TDEE tab or if age/weight/height are empty. |
| `setTab(tab)` | Switches between `'tdee'` and `'manual'` modes, shows/hides the TDEE section, and triggers `recalc()`. |
| `onGoalChange()` | Shows/hides the deficit/surplus slider based on the selected goal. Updates the label. |
| `handleAvatarUpload(e)` | Calls `uploadAvatar()`, updates the preview image, and shows status text. On error shows the full error message with the error CSS class. |
| `saveProfileData()` | Collects all form values and calls `saveProfile()`. Disables the save button during the request. |
| `renderProfile(p)` | Builds the full profile form HTML from an existing profile object (or defaults if new). |

---

## admin.html — Recipe Editor

**URL:** `/fatscran/admin.html` (create) or `/fatscran/admin.html?edit={id}` (edit)

Protected page. On load, `checkIsAdmin()` is called and non-admins see an access denied message. Admins see the full recipe creation/editing form.

### Features

- **Basic info:** Title, section (dropdown), cook time, base portions.
- **Macros:** Calories, protein, carbs, fat, **sugar (optional)**, fiber (optional) — all per portion. Sugar sits between Fat and Fiber in the 6-column macro grid. Sugar and fiber are optional; if left blank they are stored as `null` and shown conditionally on the recipe page and in previews.
- **Image upload:** Click-to-upload area. Images are uploaded to the `recipe-images` Supabase Storage bucket via `uploadRecipeImage()`. The returned public URL is stored in the `image` field. An existing image can be removed (sets `image` to null).
- **Ingredients:** Add, remove, and reorder (↑/↓) ingredients. Each row has name, amount (blank = null/"to taste"), and unit fields.
- **Method steps:** Add, remove, and reorder steps. Each step has a title and full description textarea.
- **Preview:** Validates the form, then shows a full-page preview overlay rendering the recipe exactly as it would appear on `recipe.html`, including sugar and fiber in the macros strip if set. The publish button is available from within the preview.
- **Publish / Save changes:** Calls `saveRecipe()` which upserts across all 4 recipe tables (including `sugar` in the macros payload), then redirects to the new/updated recipe page.
- **Cancel:** Returns to `index.html` without saving.
- **Delete recipe:** Only shown when editing. Confirms before calling `deleteRecipe()`, then redirects to index.html.

### Form validation

Before preview or publish, the form is validated for: title, cook time, calories, at least one ingredient (all with names), at least one step (all with title and description). Sugar and fiber are optional and not validated.

---

## styles.css — Styling

Single stylesheet shared across all pages.

### Design tokens (CSS variables)

| Variable | Value | Usage |
|---|---|---|
| `--accent` | `#B8561E` | Primary brand colour, buttons, badges |
| `--accent-dark` | `#964517` | Button hover states |
| `--accent-light` | `#F3E0D2` | Hover backgrounds, suggestion panel |
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

### Responsive breakpoints

| Breakpoint | Changes |
|---|---|
| `max-width: 800px` | Recipe body and shopping layout switch to single column. Recipe title shrinks. Macros strip goes 2-column. |
| `max-width: 768px` | Planner week grid switches from 7 equal columns to a horizontal scrolling flex row (`overflow-x: auto`, `-webkit-overflow-scrolling: touch`). Each `.day-col` is fixed at 220px wide. |
| `max-width: 640px` | Hamburger nav visible, desktop nav links hidden. Recipe banner height increases to 220px (inside banner wrap). Recipe actions switch from flex row to 2-column grid: first button (Add to list) spans both columns, Share and Edit sit side by side below. Admin form grids collapse: `admin-grid-2` → 1 column, `admin-grid-5` → 2 columns, `admin-grid-6` → 3 columns. |
| `max-width: 480px` | Main padding reduced. Nav logo shrinks. Card stats and macros go 2-column. Recipe title and macro values shrink further. |

### Key component classes

- **`.btn-primary`** — Filled accent colour button. Used for primary actions.
- **`.btn-secondary`** — Outlined/transparent button. Used for secondary actions (Preview, Share, Cancel, Edit).
- **`.btn-sm`** — Small button variant for panel headers, planner actions, and profile page secondary actions.
- **`.recipe-actions`** — Flex row of action buttons on the recipe page. Goes 2-column grid at ≤640px.
- **`.admin-form-actions`** — Flex row containing Preview, Publish/Save, and Cancel buttons on the admin page.
- **`.admin-grid-5`** / **`.admin-grid-6`** — 5 or 6 equal-column grids for the admin macro fields. Use `admin-grid-6` when all 6 macro fields (calories, protein, carbs, fat, sugar, fiber) are present.
- **`.nav-hamburger`** — Hidden on desktop, visible at ≤640px. Toggles `.is-open` on `.nav-links` via `js/utils.js`.
- **`.profile-layout`** — Max-width 640px flex column wrapper for the profile page form.
- **`.avatar-circle`** — 72px circle showing either the user's initial or their avatar photo.
- **`.profile-tab-toggle` / `.profile-tab`** — Toggle bar for switching between TDEE Calculator and Manual targets modes. Active tab styled with accent background.
- **`.form-group`** / **`.form-input`** — Standard label + input layout used on the profile page. `.form-input` applies to text, number, and select elements.
- **`.form-grid-2`** — Two-column grid for the TDEE input fields (age/weight/height/sex).
- **`.targets-grid`** — Two-column grid for the four daily target inputs.
- **`label.radio-label`** — Flex row for protein multiplier radio options. Uses `label.radio-label` selector (specificity 0-2-0) to override `.form-group label` styles. Input sized with `width: auto; flex-shrink: 0`.
- **`.range-slider`** — Full-width range input for the deficit/surplus slider.
- **`.macro-progress-section`** / **`.macro-bars`** / **`.macro-bar-row`** — Weekly macro progress bars on the shopping list. Bar fill classes: `.macro-bar-fill--green`, `--amber`, `--red`.
- **`.day-totals--green`** / `--amber` / `--red` — Left border traffic light colours on planner day total rows.
- **`.day-progress-bar`** / **`.day-progress-fill`** — Thin accent bar below day totals showing meal slot fill proportion.
- **`.weekly-overview`** — Card below the batch summary on the planner showing weekly macro totals vs targets. Value colour classes: `.tl-green`, `.tl-amber`, `.tl-red` applied directly to **`.weekly-total-value`** elements (not to the container).
- **`.suggestions-section`** / **`.suggestion-card`** — High-protein recipe suggestion cards on the shopping list page.
- **`.shopping-picker-panel`** — Left panel of the shopping list layout. Grid column is 380px (wider than the right panel's `1fr`).
- **`.slot-btns`** — Absolute-positioned container in filled planner slot cards holding the remove (×) and copy icon buttons stacked vertically at the top-right.
- **`.copy-slot-btn`** — Copy icon button inside `.slot-btns`. Coloured muted, turns accent on hover.
- **`.copy-day-btn`** — Copy icon button in the planner day column header. Absolute-positioned to the right edge; only rendered when `filledSlots > 0`.
- **`.modal-filter-row`** / **`.modal-filter-btn`** / **`.modal-filter-btn--active`** — Section filter toggle row inside the recipe picker modal. Active button uses accent background.
- **`.copy-modal`** / **`.copy-modal-body`** / **`.copy-modal-footer`** / **`.copy-day-label`** — Copy destination modal. Max-width 340px. Footer has Cancel and Copy buttons right-aligned.
- **`.modal-suggestions`** — Accent-light background panel at the top of the recipe picker list for suggested recipes. Only shown for empty slots with no search query.
- **`.modal-suggestions-label`** — Small uppercase label above the suggestion cards.
- **`.modal-recipe--suggested`** — Recipe card style within the suggestions panel.
- **`.modal-full-list-label`** — "All [meal] recipes" divider text between suggestions and the full list.

### Print styles

Applied when printing from either shopping.html or recipe.html.

**Shopping list:** Hides the recipe picker panel, nav, and action buttons. Strips backgrounds and borders for clean black-and-white output.

**Recipe page:** Hides nav, back link, portions control, share and add-to-list buttons, banner image, and ratings section. Shows title, macros strip, ingredients list, and method steps in black and white.

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

The service worker is a **complete passthrough** — it performs no caching at all. Every fetch request is passed straight to the network.

- **Install:** Calls `skipWaiting()` immediately.
- **Activate:** Deletes all existing caches (clears any caches left over from previous versions).
- **Fetch:** Passes every request through to the network unchanged.

This approach ensures users always receive fresh recipe data and assets. The previous caching strategy was removed because stale caches were causing users to see outdated recipe content after edits.

> **Note:** The service worker is registered in each HTML page as `/fatscran/sw.js`. If the service worker is ever changed back to a caching strategy, increment the cache name version (e.g. `fatscran-v3`) to force old caches to be cleared on activation.

---

## Supabase Backend

| Setting | Value |
|---|---|
| Project URL | `https://qtvlctyyjjxmrpbchchl.supabase.co` |
| Auth methods | Email/password, Google OAuth |
| Storage buckets | `recipe-images` (public), `avatars` (public) |

### Auth

Users sign in via the modal injected by `js/auth.js`. Two methods are supported:

- **Email/password:** Standard Supabase email + password auth.
- **Google OAuth:** Redirects to Google and returns to the page via URL hash. The callback is handled by `initAuth()` on page load.

Sessions are stored in localStorage as `fatscran-session`. `initAuth()` checks the session on every page load and refreshes the access token if expired. Signing out clears the session and re-renders the nav.

### Database tables

#### recipes

| Column | Type | Notes |
|---|---|---|
| `id` | int8 | Primary key, auto increment |
| `title` | text | |
| `section` | text | breakfast / dinner / tea / dessert / sauces |
| `base_portions` | int4 | |
| `cook_time` | text | e.g. "35 mins" |
| `image` | text | Nullable. Full public URL from Supabase Storage. |

#### recipe_macros

| Column | Type | Notes |
|---|---|---|
| `id` | int8 | Primary key |
| `recipe_id` | int8 | Foreign key → recipes.id |
| `calories` | int4 | Per portion |
| `protein` | int4 | Per portion (g) |
| `carbs` | int4 | Per portion (g) |
| `fat` | int4 | Per portion (g) |
| `sugar` | numeric | Nullable. Per portion (g). Shown conditionally on recipe page and in admin preview. |
| `fiber` | numeric | Nullable. Per portion (g). Shown conditionally on recipe page and in admin preview. |

#### recipe_ingredients

| Column | Type | Notes |
|---|---|---|
| `id` | int8 | Primary key |
| `recipe_id` | int8 | Foreign key → recipes.id |
| `name` | text | |
| `amount` | numeric | Nullable (null = "to taste") |
| `unit` | text | e.g. "g", "ml", "whole", "to taste" |
| `sort_order` | int4 | 0-indexed display order |

#### recipe_steps

| Column | Type | Notes |
|---|---|---|
| `id` | int8 | Primary key |
| `recipe_id` | int8 | Foreign key → recipes.id |
| `title` | text | Short step name |
| `description` | text | Full instructions |
| `sort_order` | int4 | 0-indexed display order |

#### ratings

| Column | Type | Notes |
|---|---|---|
| `id` | int8 | Primary key, auto increment |
| `recipe_id` | int4 | Logical FK to recipe id |
| `stars` | int2 | 1–5 |
| `review` | text | Nullable |
| `created_at` | timestamptz | Default now() |

RLS: public `SELECT` and `INSERT` allowed (no auth required for ratings).

#### favourites

| Column | Type | Notes |
|---|---|---|
| `id` | int8 | Primary key |
| `user_id` | uuid | Included in POST body by `toggleFavSync()` |
| `recipe_id` | int4 | |
| `created_at` | timestamptz | Default now() |

RLS: users can only read and write their own rows.

#### shopping_list

| Column | Type | Notes |
|---|---|---|
| `id` | int8 | Primary key |
| `user_id` | uuid | Included in POST body by `addToListSync()` / `saveListSync()` |
| `recipe_id` | int4 | |
| `portions` | int4 | |
| `created_at` | timestamptz | Default now() |

RLS: users can only read and write their own rows.

#### meal_plans

| Column | Type | Notes |
|---|---|---|
| `id` | int8 | Primary key |
| `user_id` | uuid | Included in POST body by `savePlanSlot()` |
| `week_key` | text | e.g. `"week-2026-5-15"` |
| `slot_key` | text | e.g. `"Mon-breakfast"` |
| `recipe_id` | int4 | Nullable (null removes the assignment) |
| `created_at` | timestamptz | Default now() |

RLS: users can only read and write their own rows.

#### profiles

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key, FK → auth.users |
| `is_admin` | bool | Default false |
| `display_name` | text | Nullable. User's chosen display name. |
| `avatar_url` | text | Nullable. Full public URL from Supabase Storage `avatars` bucket. |
| `age` | int4 | Nullable. Used for TDEE calculation. |
| `weight_kg` | numeric | Nullable. Used for TDEE and macro calculations. |
| `height_cm` | numeric | Nullable. Used for TDEE calculation. |
| `sex` | text | Nullable. `'male'` or `'female'`. Used for TDEE calculation. |
| `activity_level` | text | Nullable. One of: `sedentary`, `lightly_active`, `moderately_active`, `very_active`, `athlete`. |
| `goal` | text | Nullable. One of: `maintain`, `lose`, `build`, `custom`. |
| `deficit_surplus` | int4 | Nullable. Kcal deficit (lose) or surplus (build/custom). Default 500 in UI. |
| `protein_multiplier` | numeric | Nullable. g/kg multiplier: `1.6`, `2.0`, or `2.4`. |
| `target_calories` | int4 | Nullable. Daily calorie target. |
| `target_protein` | int4 | Nullable. Daily protein target (g). |
| `target_carbs` | int4 | Nullable. Daily carbs target (g). |
| `target_fat` | int4 | Nullable. Daily fat target (g). |
| `use_tdee_calc` | bool | Nullable. Whether the TDEE tab was active when last saved. |
| `created_at` | timestamptz | Default now() |

RLS: users can read and write their own row (matched on `id = auth.uid()`). Only service-role or direct DB access should set `is_admin = true`.

### RLS notes

- For `favourites`, `shopping_list`, and `meal_plans`, `user_id` **is included in the POST body** by the respective sync functions in `js/auth.js`. This ensures RLS policies can correctly match the row via `auth.uid()`.
- The `profiles` table is an exception: the `id` column is the primary key and must be included in the POST body when upserting, because it is used as the conflict resolution key (`Prefer: resolution=merge-duplicates`). `saveProfile()` always includes `id: session.user.id` in the payload.
- The `sb` object in `auth.js` uses `authedHeaders()` to attach the user JWT, which is what triggers the RLS `auth.uid()` function.

---

## Data Storage Summary

When a user is **signed in**, all personal data (favourites, shopping list, meal plans) is synced to Supabase and available across devices. When **signed out**, it falls back to localStorage.

### localStorage keys

| Key | Used by | Description |
|---|---|---|
| `fatscran-session` | js/auth.js | Current user session (access token, refresh token, user object) |
| `fatscran-favs` | js/auth.js (fallback) | Array of favourite recipe IDs (used when signed out) |
| `fatscran-list` | js/auth.js (fallback) | Array of `{ id, portions }` shopping list items (used when signed out) |
| `fatscran-checked` | shopping.html | Array of ticked ingredient keys. Always local, never synced. |
| `week-{year}-{month}-{date}` | js/auth.js (fallback) | Per-week meal plan objects (used when signed out) |

### sessionStorage keys

| Key | Used by | Description |
|---|---|---|
| `fatscran-state` | index.html | JSON object storing active section filter, search query, and sort option. Restored on page load to preserve state when navigating back. |

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
- **Recipe IDs** are not sequential by design (gaps exist from skipped/merged recipes during import). Always use the next available integer above the current maximum (86 as of this writing). New recipes created via `admin.html` get their ID assigned by Supabase auto-increment.
- **Section "dinner"** is used for lunch-style cold/quick-assemble meals (wraps, sandwiches, flatbreads, salads), not just evening meals.
- **Section "tea"** is used for hot cooked evening meals.
- **Prep steps always come before cooking steps** in the method.
- **Recipe images** are optional. Cards without images just have no image block — there is no placeholder. New images are uploaded to Supabase Storage; the `image` field stores the full public URL. The three original local images in `images/` continue to be referenced by their relative path.
- **The Sauces section** exists in the data schema but currently has no recipes. The filter button is hidden automatically until at least one sauce recipe is added.
- **Cook times** are stored as strings (e.g. "35 mins", "1 hr 20 mins"). The `parseCookTime()` function in `js/utils.js` converts these to minutes for sorting.
- **Admin access** is granted by setting `is_admin = true` in the `profiles` table directly in the Supabase dashboard. There is no self-serve way to become an admin.
- **`user_id` is sent in POST request bodies** for `favourites`, `shopping_list`, and `meal_plans` by the sync functions in `js/auth.js`. The `profiles` table is the exception: its PK column is `id` (not `user_id`) and must be included in POST upsert payloads as the conflict key.
- **`ensureSession()` before profile fetches.** `getProfile()` and `saveProfile()` both call `ensureSession()` before reading the session object, ensuring the access token is refreshed if expired. If a profile request returns a 401, check that `ensureSession` is resolving correctly.
- **My Profile nav link** appears in the signed-in user dropdown (above Sign out), added by `updateNavAuth()` in `js/auth.js`. It links to `profile.html`.
- **XSS protection:** All user-supplied strings (recipe title, step text, ingredient name/unit, review text, cook time, section display text, display name, user email, avatar URL, etc.) must be passed through `escapeHtml()` from `js/utils.js` before being interpolated into an `innerHTML` template literal. Badge CSS class names (`badgeClass()` return values) and numeric macro values are intentionally not escaped. If you add a new `innerHTML` template, apply `escapeHtml()` to every string field that originates from the database or user input.
- **Never surface raw Supabase errors to users.** All HTTP failure paths in `js/db.js` go through `dbError(context, res)` which logs the full detail to Sentry and throws a generic "Save failed. Please try again." message. Do not add new `throw new Error('... ' + await res.text())` patterns.
- **Password validation is client-side only** for the signup flow (≥8 chars, ≥1 number or symbol). Supabase enforces its own minimum server-side. The client check exists for immediate feedback — do not remove it without also tightening the Supabase Auth settings.
- **Login error messages are intentionally generic.** `handleAuthSubmit()` always shows "Invalid email or password." on sign-in failure, regardless of what Supabase returns. This prevents account enumeration. The real error goes to Sentry. Do not change this to show the Supabase error message.
- **`isLoggedIn()` checks expiry.** Returns false for sessions where `expires_at <= Date.now()`. Do not use `!!getSession()` as a logged-in check elsewhere — always call `isLoggedIn()`.
- **`confirmCopy()` state capture:** The copy modal's confirm handler captures `copyMode`, `copySlotMeal`, `copySlotRecipeId`, and `copyFromDay` into local variables *before* calling `closeCopyModalDirect()`, because that function resets those module-level variables to null. Always follow this pattern when reading state before closing a modal that clears state.
- **Sentry SRI hash:** The Sentry loader script tag on all pages includes an `integrity="sha256-..."` attribute. If the hash ever stops matching (Sentry rotates the loader), the script is silently blocked and error reporting stops. Recompute the hash with `curl -s <url> | openssl dgst -sha256 -binary | openssl base64 -A` and update all 6 HTML files.
