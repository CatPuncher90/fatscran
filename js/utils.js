// FatScran — Shared Utilities
// Single source of truth for functions used across multiple pages.
// Load this before any page script: <script src="js/utils.js"></script>

// ---------------------------------------------------------------------------
// LocalStorage helpers
// ---------------------------------------------------------------------------

function getList() {
  try { return JSON.parse(localStorage.getItem('fatscran-list') || '[]'); } catch(e) { return []; }
}

function saveList(list) {
  localStorage.setItem('fatscran-list', JSON.stringify(list));
}

function getFavourites() {
  try { return JSON.parse(localStorage.getItem('fatscran-favs') || '[]'); } catch(e) { return []; }
}

function saveFavourites(favs) {
  localStorage.setItem('fatscran-favs', JSON.stringify(favs));
}

function getChecked() {
  try { return JSON.parse(localStorage.getItem('fatscran-checked') || '[]'); } catch(e) { return []; }
}

function saveChecked(checked) {
  localStorage.setItem('fatscran-checked', JSON.stringify(checked));
}

// ---------------------------------------------------------------------------
// HTML escaping
// ---------------------------------------------------------------------------

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ---------------------------------------------------------------------------
// Image URL helpers
// ---------------------------------------------------------------------------

function supabaseImgUrl(url, width, quality) {
  if (!url) return url;
  if (!url.includes('supabase.co')) return url;
  return `${url}?width=${width}&quality=${quality}`;
}

// ---------------------------------------------------------------------------
// Macro traffic light — shared threshold used on shopping and planner pages
// green = 90-110%, amber = under 90%, red = over 110%
// ---------------------------------------------------------------------------

function macroBarClass(actual, target) {
  if (!target) return 'amber';
  const pct = actual / target * 100;
  if (pct > 110) return 'red';
  if (pct >= 90) return 'green';
  return 'amber';
}

// ---------------------------------------------------------------------------
// Recipe helpers
// ---------------------------------------------------------------------------

function badgeClass(section) {
  return 'badge badge-' + section.toLowerCase();
}

function parseCookTime(str) {
  if (!str) return 9999;
  const hrs  = (str.match(/(\d+)\s*hr/)  || [0, 0])[1];
  const mins = (str.match(/(\d+)\s*min/) || [0, 0])[1];
  return parseInt(hrs) * 60 + parseInt(mins);
}

// ---------------------------------------------------------------------------
// Shopping list — ingredient category guesser
// ---------------------------------------------------------------------------

function guessCategory(name) {
  const n = name.toLowerCase();
  if (/chicken|beef|lamb|mince|bacon|sausage|pepperoni/.test(n))                                                              return 'meat';
  if (/salmon|fish|tuna/.test(n))                                                                                              return 'fish';
  if (/cheese|yogurt|yoghurt|milk|cream|butter|egg/.test(n))                                                                  return 'dairy';
  if (/onion|garlic|pepper|carrot|broccoli|spinach|lettuce|tomato|celery|coleslaw|beans|peas|cucumber|mushroom/.test(n))      return 'veg';
  if (/lime|lemon/.test(n))                                                                                                    return 'fruit';
  if (/rice|pasta|noodle|tortilla|muffin|bun|flour|cornflake/.test(n))                                                        return 'carbs';
  if (/can|tin|passata|coconut|evaporated|stock/.test(n))                                                                     return 'tins';
  if (/sauce|paste|ketchup|mayo|relish|vinegar|honey|ketjap|teriyaki|harissa|chipotle|pizza/.test(n))                         return 'sauces';
  if (/powder|spice|cumin|paprika|chili|chilli|salt|oregano|basil|thyme|garam|coriander|herb|seasoning|sesame|yeast/.test(n)) return 'spices';
  return 'other';
}

// ---------------------------------------------------------------------------
// SVG icons (shared between index and recipe pages)
// ---------------------------------------------------------------------------

function clockIconSvg(size) {
  const s = size || 13;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
}

function portionIconSvg(size) {
  const s = size || 16;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
}

// ---------------------------------------------------------------------------
// Hamburger nav
// ---------------------------------------------------------------------------

(function () {
  function initHamburgerNav() {
    const btn   = document.getElementById('nav-hamburger');
    const links = document.getElementById('nav-links');
    if (!btn || !links) return;

    function open()  { links.classList.add('is-open');    btn.setAttribute('aria-expanded', 'true');  btn.textContent = '✕'; }
    function close() { links.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); btn.textContent = '☰'; }
    function toggle() { links.classList.contains('is-open') ? close() : open(); }

    btn.addEventListener('click', function (e) { e.stopPropagation(); toggle(); });

    links.addEventListener('click', function (e) { if (e.target.tagName === 'A') close(); });

    document.addEventListener('click', function (e) { if (!e.target.closest('#main-nav')) close(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHamburgerNav);
  } else {
    initHamburgerNav();
  }
}());
