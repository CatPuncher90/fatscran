// FatScran — Auth + Data Layer
// Handles Supabase auth and abstracts data reads/writes.
// Logged in  → Supabase
// Logged out → localStorage
//
// Requires supabase-js UMD loaded before this file (window.supabase).
// Load after utils.js: <script src="js/auth.js"></script>

const SUPABASE_URL = 'https://qtvlctyyjjxmrpbchchl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0dmxjdHl5amp4bXJwYmNoY2hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMTI0ODYsImV4cCI6MjA5NjY4ODQ4Nn0.CVmRoT3gWc6cLwvGO2m2yMdkdfTKbftyNRLc7EQCcSs';

// ---------------------------------------------------------------------------
// Supabase client (official SDK)
// ---------------------------------------------------------------------------

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true }
});

let _currentSession = null;

// Registered at parse time so it catches INITIAL_SESSION and all subsequent events.
// INITIAL_SESSION populates _currentSession but does not trigger the page callback —
// the page's init() handles initial data load itself.
_supabase.auth.onAuthStateChange((event, session) => {
  _currentSession = session;
  if (event === 'SIGNED_OUT') sessionStorage.removeItem('fatscran-state');
  updateNavAuth();
  if (['SIGNED_IN', 'SIGNED_OUT'].includes(event) && typeof onAuthStateChange === 'function') {
    onAuthStateChange();
  }
});

// ---------------------------------------------------------------------------
// Session helpers — thin wrappers kept for call-site compatibility
// ---------------------------------------------------------------------------

function getSession() {
  return _currentSession;
}

function getUser() {
  return _currentSession ? _currentSession.user : null;
}

function isLoggedIn() {
  return !!_currentSession;
}

async function ensureSession() {
  // SDK handles token refresh automatically via autoRefreshToken: true.
  return _currentSession;
}

// ---------------------------------------------------------------------------
// Auth actions
// ---------------------------------------------------------------------------

function signInWithGoogle() {
  _supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: 'https://fatscran.com/' }
  });
}

async function handleSignOut() {
  await _supabase.auth.signOut();
  // onAuthStateChange listener fires SIGNED_OUT → updateNavAuth() + page onAuthStateChange() + sessionStorage clear.
  window.location.reload();
}

// ---------------------------------------------------------------------------
// Abstracted data layer — use these everywhere instead of getList/saveList etc.
// ---------------------------------------------------------------------------

// FAVOURITES

async function getFavs() {
  if (!isLoggedIn()) return getFavourites();
  try {
    const { data, error } = await _supabase
      .from('favourites')
      .select('recipe_id')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data.map(r => r.recipe_id);
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
  try {
    const { data: rows, error: fetchError } = await _supabase
      .from('favourites')
      .select('id,recipe_id');
    if (fetchError) throw fetchError;
    const existing  = rows.find(r => r.recipe_id === id);
    const currentIds = rows.map(r => r.recipe_id);
    if (existing) {
      const { error } = await _supabase.from('favourites').delete().eq('id', existing.id);
      if (error) throw error;
      return currentIds.filter(fid => fid !== id);
    } else {
      const { error } = await _supabase
        .from('favourites')
        .insert({ recipe_id: id, user_id: _currentSession.user.id });
      if (error) throw error;
      return [...currentIds, id];
    }
  } catch(e) { console.error('toggleFavSync', e); if (typeof Sentry !== 'undefined') Sentry.captureException(e); return []; }
}

// SHOPPING LIST

async function getListSync() {
  if (!isLoggedIn()) return getList();
  try {
    const { data, error } = await _supabase
      .from('shopping_list')
      .select('recipe_id,portions')
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data.map(r => ({ id: r.recipe_id, portions: r.portions }));
  } catch(e) { console.error('getListSync', e); if (typeof Sentry !== 'undefined') Sentry.captureException(e); return getList(); }
}

async function saveListSync(list) {
  if (!isLoggedIn()) { saveList(list); return; }
  try {
    const { data: current, error: fetchError } = await _supabase
      .from('shopping_list')
      .select('id,recipe_id');
    if (fetchError) throw fetchError;

    const newIds  = new Set(list.map(i => i.id));
    const removed = current.filter(r => !newIds.has(r.recipe_id)).map(r => r.id);

    if (removed.length) {
      const { error } = await _supabase.from('shopping_list').delete().in('id', removed);
      if (error) throw error;
    }

    if (list.length) {
      const payload = list.map(item => ({
        user_id:   _currentSession.user.id,
        recipe_id: item.id,
        portions:  item.portions,
      }));
      const { error } = await _supabase
        .from('shopping_list')
        .upsert(payload, { onConflict: 'user_id,recipe_id' });
      if (error) throw error;
    }
  } catch(e) {
    console.error('saveListSync', e);
    if (typeof Sentry !== 'undefined') Sentry.captureException(e);
    throw e;
  }
}

async function addToListSync(id, portions) {
  if (!isLoggedIn()) {
    const list = getList();
    const existing = list.find(i => i.id === id);
    if (existing) { existing.portions = portions; } else { list.push({ id, portions }); }
    saveList(list);
    return;
  }
  try {
    const { data: rows, error: fetchError } = await _supabase
      .from('shopping_list')
      .select('id')
      .eq('recipe_id', id);
    if (fetchError) throw fetchError;
    if (rows.length) {
      const { error } = await _supabase
        .from('shopping_list')
        .update({ portions })
        .eq('id', rows[0].id);
      if (error) throw error;
    } else {
      const { error } = await _supabase
        .from('shopping_list')
        .insert({ recipe_id: id, portions, user_id: _currentSession.user.id });
      if (error) throw error;
    }
  } catch(e) { console.error('addToListSync', e); if (typeof Sentry !== 'undefined') Sentry.captureException(e); throw e; }
}

async function removeFromListSync(id) {
  if (!isLoggedIn()) { saveList(getList().filter(i => i.id !== id)); return; }
  try {
    const { error } = await _supabase.from('shopping_list').delete().eq('recipe_id', id);
    if (error) throw error;
  } catch(e) { console.error('removeFromListSync', e); if (typeof Sentry !== 'undefined') Sentry.captureException(e); }
}

// MEAL PLANS

async function getPlanSync(weekKey) {
  if (!isLoggedIn()) {
    try { return JSON.parse(localStorage.getItem(weekKey) || '{}'); } catch(e) { return {}; }
  }
  try {
    const { data, error } = await _supabase
      .from('meal_plans')
      .select('slot_key,recipe_id')
      .eq('week_key', weekKey);
    if (error) throw error;
    const plan = {};
    data.forEach(r => { plan[r.slot_key] = r.recipe_id; });
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
  try {
    if (recipeId === null) {
      const { error } = await _supabase
        .from('meal_plans')
        .delete()
        .eq('week_key', weekKey)
        .eq('slot_key', slotKey);
      if (error) throw error;
    } else {
      const { data: rows, error: fetchError } = await _supabase
        .from('meal_plans')
        .select('id')
        .eq('week_key', weekKey)
        .eq('slot_key', slotKey);
      if (fetchError) throw fetchError;
      if (rows.length) {
        const { error } = await _supabase
          .from('meal_plans')
          .update({ recipe_id: recipeId })
          .eq('id', rows[0].id);
        if (error) throw error;
      } else {
        const { error } = await _supabase
          .from('meal_plans')
          .insert({ week_key: weekKey, slot_key: slotKey, recipe_id: recipeId });
        if (error) throw error;
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
          <button class="auth-google-btn" onclick="signInWithGoogle()">
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
            Continue with Google
          </button>
          <div class="auth-divider"><span>or</span></div>
          <div id="auth-error" class="auth-error" style="display:none;"></div>
          <input id="auth-email" type="email" placeholder="Email address" class="auth-input">
          <input id="auth-password" type="password" placeholder="Password" class="auth-input">
          <button id="auth-forgot-btn" class="auth-toggle-btn" style="text-align:left;font-size:0.8rem;padding:0.15rem 0 0.4rem;" onclick="enterResetMode()">Forgot password?</button>
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
  document.getElementById('auth-modal-title').textContent    = 'Sign in';
  document.getElementById('auth-submit-btn').textContent     = 'Sign in';
  document.getElementById('auth-toggle-text').textContent    = "Don't have an account? Sign up";
  document.getElementById('auth-error').style.display        = 'none';
  document.getElementById('auth-email').value                = '';
  document.getElementById('auth-password').value             = '';
  document.getElementById('auth-password').style.display     = '';
  document.getElementById('auth-forgot-btn').style.display   = '';
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
  if (authMode === 'reset') {
    authMode = 'signin';
    document.getElementById('auth-modal-title').textContent  = 'Sign in';
    document.getElementById('auth-submit-btn').textContent   = 'Sign in';
    document.getElementById('auth-toggle-text').textContent  = "Don't have an account? Sign up";
    document.getElementById('auth-password').style.display   = '';
    document.getElementById('auth-forgot-btn').style.display = '';
    document.getElementById('auth-error').style.display      = 'none';
    return;
  }
  authMode = authMode === 'signin' ? 'signup' : 'signin';
  const isSignIn = authMode === 'signin';
  document.getElementById('auth-modal-title').textContent  = isSignIn ? 'Sign in' : 'Create account';
  document.getElementById('auth-submit-btn').textContent   = isSignIn ? 'Sign in' : 'Create account';
  document.getElementById('auth-toggle-text').textContent  = isSignIn ? "Don't have an account? Sign up" : 'Already have an account? Sign in';
  document.getElementById('auth-forgot-btn').style.display = isSignIn ? '' : 'none';
  document.getElementById('auth-password').style.display   = '';
  document.getElementById('auth-error').style.display      = 'none';
}

function enterResetMode() {
  authMode = 'reset';
  document.getElementById('auth-modal-title').textContent  = 'Reset password';
  document.getElementById('auth-submit-btn').textContent   = 'Send reset email';
  document.getElementById('auth-toggle-text').textContent  = 'Back to sign in';
  document.getElementById('auth-password').style.display   = 'none';
  document.getElementById('auth-forgot-btn').style.display = 'none';
  document.getElementById('auth-error').style.display      = 'none';
}

async function handleAuthSubmit() {
  const email    = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;
  const errorEl  = document.getElementById('auth-error');
  const btn      = document.getElementById('auth-submit-btn');

  if (authMode === 'reset') {
    if (!email) { showAuthError('Please enter your email address.'); return; }
    btn.textContent = 'Sending...';
    btn.disabled    = true;
    errorEl.style.display = 'none';
    try {
      const { error } = await _supabase.auth.resetPasswordForEmail(email, { redirectTo: 'https://fatscran.com' });
      if (error) throw error;
      closeAuthModalDirect();
      showPageNotice('Check your email for a password reset link.');
    } catch(e) {
      if (typeof Sentry !== 'undefined') Sentry.captureException(e);
      showAuthError("Couldn't send reset email. Please try again.");
      btn.textContent = 'Send reset email';
      btn.disabled    = false;
    }
    return;
  }

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
      const { error } = await _supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } else {
      const { data, error } = await _supabase.auth.signUp({ email, password });
      if (error) throw error;
      if (!data.session) {
        closeAuthModalDirect();
        showPageNotice('Check your email to confirm your account.');
        return;
      }
    }
    closeAuthModalDirect();
    // SDK listener fires SIGNED_IN → updateNavAuth() + page onAuthStateChange().
  } catch(e) {
    if (typeof Sentry !== 'undefined') Sentry.captureException(e);
    showAuthError(authMode === 'signin' ? 'Invalid email or password.' : e.message);
    btn.textContent = authMode === 'signin' ? 'Sign in' : 'Create account';
    btn.disabled    = false;
  }
}

function showPageNotice(msg) {
  let el = document.getElementById('page-notice');
  if (!el) {
    el = document.createElement('p');
    el.id        = 'page-notice';
    el.className = 'auth-error';
    el.style.cssText = 'margin:0 0 1.25rem;text-align:center;background:#DFF0D8;border-color:#BCE8A8;color:#2A5820;';
    const main = document.querySelector('main');
    if (main) main.insertBefore(el, main.firstChild);
  }
  el.textContent = msg;
  el.style.display = 'block';
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

  const navInner = document.querySelector('.nav-inner');
  if (!navInner) return;

  const el   = document.createElement('div');
  const user = getUser();

  if (user) {
    const initial = escapeHtml((user.email || 'U')[0].toUpperCase());
    el.innerHTML  = `<div class="nav-user-menu">
      <button class="nav-avatar" onclick="toggleUserMenu()" title="${escapeHtml(user.email)}">${initial}</button>
      <div class="user-menu-dropdown" id="user-menu-dropdown" style="display:none;">
        <div class="user-menu-email">${escapeHtml(user.email)}</div>
        <a class="user-menu-item" href="profile.html">My Profile</a>
        <button class="user-menu-item" onclick="handleSignOut()">Sign out</button>
      </div>
    </div>`;
  } else {
    el.innerHTML = `<button class="nav-signin-btn" onclick="openAuthModal()">Sign in</button>`;
  }

  el.id = 'nav-auth-btn';
  navInner.appendChild(el);
}

function toggleUserMenu() {
  const menu = document.getElementById('user-menu-dropdown');
  if (menu) menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener('click', e => {
  const menu = document.getElementById('user-menu-dropdown');
  if (menu && !e.target.closest('.nav-user-menu')) menu.style.display = 'none';
});

// ---------------------------------------------------------------------------
// Init — call on every page
// ---------------------------------------------------------------------------

async function initAuth() {
  const { data: { session } } = await _supabase.auth.getSession();
  _currentSession = session;
  injectAuthModal();
  updateNavAuth();
}
