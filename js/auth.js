// FatScran — Auth + Data Layer
// Handles Supabase auth and abstracts data reads/writes.
// Logged in  → Supabase
// Logged out → localStorage
//
// Load after utils.js: <script src="js/auth.js"></script>

const SUPABASE_URL = 'https://qtvlctyyjjxmrpbchchl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0dmxjdHl5amp4bXJwYmNoY2hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMTI0ODYsImV4cCI6MjA5NjY4ODQ4Nn0.CVmRoT3gWc6cLwvGO2m2yMdkdfTKbftyNRLc7EQCcSs';

// ---------------------------------------------------------------------------
// Supabase client (minimal, no SDK dependency)
// ---------------------------------------------------------------------------

const sb = {
  headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },

  authedHeaders() {
    const session = getSession();
    return session ? { ...this.headers, 'Authorization': 'Bearer ' + session.access_token } : this.headers;
  },

  async get(table, params) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, { headers: this.authedHeaders() });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async post(table, body) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, { method: 'POST', headers: this.authedHeaders(), body: JSON.stringify(body) });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async delete(table, params) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, { method: 'DELETE', headers: this.authedHeaders() });
    if (!res.ok) throw new Error(await res.text());
    return true;
  },

  async patch(table, params, body) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, { method: 'PATCH', headers: this.authedHeaders(), body: JSON.stringify(body) });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async signInWithEmail(email, password) {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, { method: 'POST', headers: { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error_description || data.msg || 'Login failed');
    saveSession(data);
    return data;
  },

  async signUpWithEmail(email, password) {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, { method: 'POST', headers: { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error_description || data.msg || 'Signup failed');
    if (data.access_token) saveSession(data);
    return data;
  },

  signInWithGoogle() {
    const redirectTo = encodeURIComponent('https://catpuncher90.github.io/fatscran/');
    window.location.href = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${redirectTo}`;
  },

  async signOut() {
    const session = getSession();
    if (session) {
      await fetch(`${SUPABASE_URL}/auth/v1/logout`, { method: 'POST', headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + session.access_token } }).catch(() => {});
    }
    clearSession();
  },

  async refreshSession() {
    const session = getSession();
    if (!session?.refresh_token) return null;
    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, { method: 'POST', headers: { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ refresh_token: session.refresh_token }) });
      const data = await res.json();
      if (!res.ok) { clearSession(); return null; }
      saveSession(data);
      return data;
    } catch(e) { clearSession(); return null; }
  }
};

// ---------------------------------------------------------------------------
// Session management
// ---------------------------------------------------------------------------

function saveSession(data) {
  localStorage.setItem('fatscran-session', JSON.stringify({ access_token: data.access_token, refresh_token: data.refresh_token, expires_at: Date.now() + (data.expires_in || 3600) * 1000, user: data.user }));
}

function getSession() {
  try {
    const s = JSON.parse(localStorage.getItem('fatscran-session') || 'null');
    if (!s) return null;
    return s;
  } catch(e) { return null; }
}

function clearSession() {
  localStorage.removeItem('fatscran-session');
  sessionStorage.removeItem('fatscran-state');
}

function getUser() {
  const s = getSession();
  return s ? s.user : null;
}

function isLoggedIn() {
  const s = getSession();
  return !!s && s.expires_at > Date.now();
}

// Auto-refresh token if within 5 minutes of expiry
async function ensureSession() {
  const s = getSession();
  if (!s) return null;
  if (s.expires_at - Date.now() < 5 * 60 * 1000) return sb.refreshSession();
  return s;
}

// Handle Google OAuth redirect (hash fragment)
async function handleAuthRedirect() {
  const hash = window.location.hash;
  if (!hash) return false;
  const params = new URLSearchParams(hash.replace('#', ''));
  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');
  const expiresIn = params.get('expires_in');
  if (!accessToken) return false;

  // Fetch the user from the token
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + accessToken } });
    const user = await res.json();
    saveSession({ access_token: accessToken, refresh_token: refreshToken, expires_in: parseInt(expiresIn) || 3600, user });
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    return true;
  } catch(e) { return false; }
}

// ---------------------------------------------------------------------------
// Abstracted data layer — use these everywhere instead of getList/saveList etc.
// ---------------------------------------------------------------------------

// FAVOURITES

async function getFavs() {
  if (!isLoggedIn()) return getFavourites();
  await ensureSession();
  try {
    const rows = await sb.get('favourites', 'select=recipe_id&order=created_at.desc');
    return rows.map(r => r.recipe_id);
  } catch(e) { console.error('getFavs', e); if (typeof Sentry !== 'undefined') Sentry.captureException(e); return getFavourites(); }
}

async function toggleFavSync(id) {
  if (!isLoggedIn()) {
    const favs = getFavourites();
    const idx = favs.indexOf(id);
    if (idx === -1) { favs.push(id); } else { favs.splice(idx, 1); }
    saveFavourites(favs);
    return favs;
  }
  await ensureSession();
  try {
    const rows = await sb.get('favourites', 'select=id,recipe_id');
    const existing = rows.find(r => r.recipe_id === id);
    const currentIds = rows.map(r => r.recipe_id);
    if (existing) {
      await sb.delete('favourites', `id=eq.${existing.id}`);
      return currentIds.filter(fid => fid !== id);
    } else {
      await sb.post('favourites', { recipe_id: id, user_id: getSession().user.id });
      return [...currentIds, id];
    }
  } catch(e) { console.error('toggleFavSync', e); if (typeof Sentry !== 'undefined') Sentry.captureException(e); return []; }
}

// SHOPPING LIST

async function getListSync() {
  if (!isLoggedIn()) return getList();
  await ensureSession();
  try {
    const rows = await sb.get('shopping_list', 'select=recipe_id,portions&order=created_at.asc');
    return rows.map(r => ({ id: r.recipe_id, portions: r.portions }));
  } catch(e) { console.error('getListSync', e); if (typeof Sentry !== 'undefined') Sentry.captureException(e); return getList(); }
}

async function saveListSync(list) {
  if (!isLoggedIn()) { saveList(list); return; }
  await ensureSession();
  // Upsert each item individually to preserve unique constraint
  try {
    const current = await sb.get('shopping_list', 'select=id,recipe_id');
    const currentIds = current.map(r => r.recipe_id);
    const newIds = list.map(i => i.id);
    // Delete removed items
    for (const row of current) {
      if (!newIds.includes(row.recipe_id)) await sb.delete('shopping_list', `id=eq.${row.id}`);
    }
    // Upsert existing/new items
    for (const item of list) {
      const existing = current.find(r => r.recipe_id === item.id);
      if (existing) {
        await sb.patch('shopping_list', `id=eq.${existing.id}`, { portions: item.portions });
      } else {
        await sb.post('shopping_list', { recipe_id: item.id, portions: item.portions });
      }
    }
  } catch(e) { console.error('saveListSync', e); if (typeof Sentry !== 'undefined') Sentry.captureException(e); saveList(list); }
}

async function addToListSync(id, portions) {
  if (!isLoggedIn()) {
    const list = getList();
    const existing = list.find(i => i.id === id);
    if (existing) { existing.portions = portions; } else { list.push({ id, portions }); }
    saveList(list);
    return;
  }
  await ensureSession();
  try {
    const rows = await sb.get('shopping_list', `select=id&recipe_id=eq.${id}`);
    if (rows.length) {
      await sb.patch('shopping_list', `id=eq.${rows[0].id}`, { portions });
    } else {
      await sb.post('shopping_list', { recipe_id: id, portions });
    }
  } catch(e) { console.error('addToListSync', e); if (typeof Sentry !== 'undefined') Sentry.captureException(e); throw e; }
}

async function removeFromListSync(id) {
  if (!isLoggedIn()) { saveList(getList().filter(i => i.id !== id)); return; }
  await ensureSession();
  try { await sb.delete('shopping_list', `recipe_id=eq.${id}`); } catch(e) { console.error('removeFromListSync', e); if (typeof Sentry !== 'undefined') Sentry.captureException(e); }
}

// MEAL PLANS

async function getPlanSync(weekKey) {
  if (!isLoggedIn()) {
    try { return JSON.parse(localStorage.getItem(weekKey) || '{}'); } catch(e) { return {}; }
  }
  await ensureSession();
  try {
    const rows = await sb.get('meal_plans', `select=slot_key,recipe_id&week_key=eq.${encodeURIComponent(weekKey)}`);
    const plan = {};
    rows.forEach(r => { plan[r.slot_key] = r.recipe_id; });
    return plan;
  } catch(e) { console.error('getPlanSync', e); if (typeof Sentry !== 'undefined') Sentry.captureException(e); return {}; }
}

async function savePlanSlot(weekKey, slotKey, recipeId) {
  if (!isLoggedIn()) {
    try {
      const plan = JSON.parse(localStorage.getItem(weekKey) || '{}');
      if (recipeId === null) { delete plan[slotKey]; } else { plan[slotKey] = recipeId; }
      localStorage.setItem(weekKey, JSON.stringify(plan));
    } catch(e) {}
    return;
  }
  await ensureSession();
  try {
    if (recipeId === null) {
      await sb.delete('meal_plans', `week_key=eq.${encodeURIComponent(weekKey)}&slot_key=eq.${encodeURIComponent(slotKey)}`);
    } else {
      const rows = await sb.get('meal_plans', `select=id&week_key=eq.${encodeURIComponent(weekKey)}&slot_key=eq.${encodeURIComponent(slotKey)}`);
      if (rows.length) {
        await sb.patch('meal_plans', `id=eq.${rows[0].id}`, { recipe_id: recipeId });
      } else {
        await sb.post('meal_plans', { week_key: weekKey, slot_key: slotKey, recipe_id: recipeId });
      }
    }
  } catch(e) { console.error('savePlanSlot', e); if (typeof Sentry !== 'undefined') Sentry.captureException(e); throw e; }
}

// ---------------------------------------------------------------------------
// Auth modal — injected into every page
// ---------------------------------------------------------------------------

function injectAuthModal() {
  const existing = document.getElementById('auth-modal-overlay');
  if (existing) existing.remove();

  document.body.insertAdjacentHTML('beforeend', `
    <div id="auth-modal-overlay" class="modal-overlay" style="display:none;" onclick="closeAuthModal(event)">
      <div class="modal auth-modal" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h3 id="auth-modal-title">Sign in</h3>
          <button class="modal-close" onclick="closeAuthModalDirect()">&#215;</button>
        </div>
        <div class="auth-modal-body">
          <button class="auth-google-btn" onclick="sb.signInWithGoogle()">
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
            Continue with Google
          </button>
          <div class="auth-divider"><span>or</span></div>
          <div id="auth-error" class="auth-error" style="display:none;"></div>
          <input id="auth-email" type="email" placeholder="Email address" class="auth-input">
          <input id="auth-password" type="password" placeholder="Password" class="auth-input">
          <button id="auth-submit-btn" class="btn-primary auth-submit" onclick="handleAuthSubmit()">Sign in</button>
          <button class="auth-toggle-btn" onclick="toggleAuthMode()">
            <span id="auth-toggle-text">Don't have an account? Sign up</span>
          </button>
        </div>
      </div>
    </div>`);
}

let authMode = 'signin';

function openAuthModal() {
  authMode = 'signin';
  document.getElementById('auth-modal-title').textContent = 'Sign in';
  document.getElementById('auth-submit-btn').textContent  = 'Sign in';
  document.getElementById('auth-toggle-text').textContent = "Don't have an account? Sign up";
  document.getElementById('auth-error').style.display = 'none';
  document.getElementById('auth-email').value    = '';
  document.getElementById('auth-password').value = '';
  document.getElementById('auth-modal-overlay').style.display = 'flex';
  setTimeout(() => document.getElementById('auth-email').focus(), 50);
}

function closeAuthModal(e) {
  if (e.target === document.getElementById('auth-modal-overlay')) closeAuthModalDirect();
}

function closeAuthModalDirect() {
  document.getElementById('auth-modal-overlay').style.display = 'none';
}

function toggleAuthMode() {
  authMode = authMode === 'signin' ? 'signup' : 'signin';
  const isSignIn = authMode === 'signin';
  document.getElementById('auth-modal-title').textContent = isSignIn ? 'Sign in' : 'Create account';
  document.getElementById('auth-submit-btn').textContent  = isSignIn ? 'Sign in' : 'Create account';
  document.getElementById('auth-toggle-text').textContent = isSignIn ? "Don't have an account? Sign up" : 'Already have an account? Sign in';
  document.getElementById('auth-error').style.display = 'none';
}

async function handleAuthSubmit() {
  const email    = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;
  const errorEl  = document.getElementById('auth-error');
  const btn      = document.getElementById('auth-submit-btn');

  if (!email || !password) { showAuthError('Please enter your email and password.'); return; }

  if (authMode === 'signup') {
    if (password.length < 8) {
      showAuthError('Password must be at least 8 characters.');
      return;
    }
    if (!/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      showAuthError('Password must contain at least one number or symbol.');
      return;
    }
  }

  btn.textContent = authMode === 'signin' ? 'Signing in...' : 'Creating account...';
  btn.disabled    = true;
  errorEl.style.display = 'none';

  try {
    if (authMode === 'signin') {
      await sb.signInWithEmail(email, password);
    } else {
      await sb.signUpWithEmail(email, password);
    }
    closeAuthModalDirect();
    updateNavAuth();
    if (typeof onAuthStateChange === 'function') onAuthStateChange();
  } catch(e) {
    if (typeof Sentry !== 'undefined') Sentry.captureException(e);
    showAuthError(authMode === 'signin' ? 'Invalid email or password.' : e.message);
    btn.textContent = authMode === 'signin' ? 'Sign in' : 'Create account';
    btn.disabled    = false;
  }
}

function showAuthError(msg) {
  const el = document.getElementById('auth-error');
  el.textContent    = msg;
  el.style.display  = 'block';
}

// ---------------------------------------------------------------------------
// Nav auth button
// ---------------------------------------------------------------------------

function updateNavAuth() {
  const existing = document.getElementById('nav-auth-btn');
  if (existing) existing.remove();

  const nav   = document.querySelector('.nav-links');
  if (!nav) return;

  const li    = document.createElement('li');
  const user  = getUser();

  if (user) {
    const initial = escapeHtml((user.email || 'U')[0].toUpperCase());
    li.innerHTML  = `<div class="nav-user-menu">
      <button class="nav-avatar" onclick="toggleUserMenu()" title="${escapeHtml(user.email)}">${initial}</button>
      <div class="user-menu-dropdown" id="user-menu-dropdown" style="display:none;">
        <div class="user-menu-email">${escapeHtml(user.email)}</div>
        <a class="user-menu-item" href="profile.html">My Profile</a>
        <button class="user-menu-item" onclick="handleSignOut()">Sign out</button>
      </div>
    </div>`;
  } else {
    li.innerHTML = `<button class="nav-signin-btn" onclick="openAuthModal()">Sign in</button>`;
  }

  li.id = 'nav-auth-btn';
  nav.appendChild(li);
}

function toggleUserMenu() {
  const menu = document.getElementById('user-menu-dropdown');
  if (menu) menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener('click', e => {
  const menu = document.getElementById('user-menu-dropdown');
  if (menu && !e.target.closest('.nav-user-menu')) menu.style.display = 'none';
});

async function handleSignOut() {
  await sb.signOut();
  updateNavAuth();
  if (typeof onAuthStateChange === 'function') onAuthStateChange();
  window.location.reload();
}

// ---------------------------------------------------------------------------
// Init — call on every page
// ---------------------------------------------------------------------------

async function initAuth() {
  await handleAuthRedirect();
  injectAuthModal();
  updateNavAuth();
}
