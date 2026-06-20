// FatScran — Recipe Database Layer
// All recipe reads/writes go through here.
// Falls back to local recipes array if Supabase fails.
// Note: SUPABASE_URL and SUPABASE_KEY are declared in auth.js which loads first.

const STORAGE_URL = `${SUPABASE_URL}/storage/v1/object/public/recipe-images`;
const dbHeaders   = { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=representation' };

function authedHeaders() {
  const session = typeof getSession === 'function' ? getSession() : null;
  if (!session) return dbHeaders;
  return { ...dbHeaders, 'Authorization': 'Bearer ' + session.access_token };
}

// ---------------------------------------------------------------------------
// Read
// ---------------------------------------------------------------------------

async function fetchAllRecipes() {
  try {
    const [recipeRes, macroRes, ingRes, stepRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/recipes?select=*&order=id.asc`, { headers: dbHeaders }),
      fetch(`${SUPABASE_URL}/rest/v1/recipe_macros?select=*`, { headers: dbHeaders }),
      fetch(`${SUPABASE_URL}/rest/v1/recipe_ingredients?select=*&order=sort_order.asc`, { headers: dbHeaders }),
      fetch(`${SUPABASE_URL}/rest/v1/recipe_steps?select=*&order=sort_order.asc`, { headers: dbHeaders })
    ]);

    if (!recipeRes.ok) throw new Error('recipes fetch failed');

    const [dbRecipes, macros, ingredients, steps] = await Promise.all([
      recipeRes.json(), macroRes.json(), ingRes.json(), stepRes.json()
    ]);

    return dbRecipes.map(r => ({
      id:           r.id,
      title:        r.title,
      section:      r.section,
      basePortions: r.base_portions,
      cookTime:     r.cook_time,
      image:        r.image_url || null,
      macrosPerPortion: (() => {
        const m = macros.find(m => m.recipe_id === r.id);
        return m ? { calories: m.calories, protein: m.protein, carbs: m.carbs, fat: m.fat, fiber: m.fiber || null } : { calories: 0, protein: 0, carbs: 0, fat: 0 };
      })(),
      ingredients: ingredients.filter(i => i.recipe_id === r.id).map(i => ({ name: i.name, amount: i.amount, unit: i.unit })),
      steps:       steps.filter(s => s.recipe_id === r.id).map(s => ({ title: s.title, description: s.description }))
    }));
  } catch(e) {
    console.warn('Supabase fetch failed, falling back to local recipes:', e);
    return typeof recipes !== 'undefined' ? recipes : [];
  }
}

async function fetchRecipeById(id) {
  const all = await fetchAllRecipes();
  return all.find(r => r.id === id) || null;
}

async function getNextRecipeId() {
  try {
    const res  = await fetch(`${SUPABASE_URL}/rest/v1/recipes?select=id&order=id.desc&limit=1`, { headers: authedHeaders() });
    const rows = await res.json();
    return rows.length ? rows[0].id + 1 : 1;
  } catch(e) { return Date.now(); }
}

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------

async function saveRecipe(data, existingId) {
  const headers = authedHeaders();
  const isEdit  = !!existingId;

  const recipePayload = { title: data.title, section: data.section, base_portions: data.basePortions, cook_time: data.cookTime, image_url: data.imageUrl || null };

  let recipeId;
  if (isEdit) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/recipes?id=eq.${existingId}`, { method: 'PATCH', headers, body: JSON.stringify(recipePayload) });
    if (!res.ok) throw new Error('Failed to update recipe: ' + await res.text());
    recipeId = existingId;
  } else {
    const res  = await fetch(`${SUPABASE_URL}/rest/v1/recipes`, { method: 'POST', headers, body: JSON.stringify(recipePayload) });
    if (!res.ok) throw new Error('Failed to insert recipe: ' + await res.text());
    const rows = await res.json();
    recipeId   = rows[0].id;
  }

  await fetch(`${SUPABASE_URL}/rest/v1/recipe_macros?recipe_id=eq.${recipeId}`, { method: 'DELETE', headers });
  const macroRes = await fetch(`${SUPABASE_URL}/rest/v1/recipe_macros`, { method: 'POST', headers, body: JSON.stringify({ recipe_id: recipeId, calories: data.calories, protein: data.protein, carbs: data.carbs, fat: data.fat, fiber: data.fiber || null }) });
  if (!macroRes.ok) throw new Error('Failed to save macros: ' + await macroRes.text());

  await fetch(`${SUPABASE_URL}/rest/v1/recipe_ingredients?recipe_id=eq.${recipeId}`, { method: 'DELETE', headers });
  if (data.ingredients.length) {
    const ingPayload = data.ingredients.map((ing, i) => ({ recipe_id: recipeId, name: ing.name, amount: ing.amount === '' || ing.amount === null ? null : parseFloat(ing.amount), unit: ing.unit, sort_order: i }));
    const ingRes = await fetch(`${SUPABASE_URL}/rest/v1/recipe_ingredients`, { method: 'POST', headers, body: JSON.stringify(ingPayload) });
    if (!ingRes.ok) throw new Error('Failed to save ingredients: ' + await ingRes.text());
  }

  await fetch(`${SUPABASE_URL}/rest/v1/recipe_steps?recipe_id=eq.${recipeId}`, { method: 'DELETE', headers });
  if (data.steps.length) {
    const stepPayload = data.steps.map((step, i) => ({ recipe_id: recipeId, title: step.title, description: step.description, sort_order: i }));
    const stepRes = await fetch(`${SUPABASE_URL}/rest/v1/recipe_steps`, { method: 'POST', headers, body: JSON.stringify(stepPayload) });
    if (!stepRes.ok) throw new Error('Failed to save steps: ' + await stepRes.text());
  }

  return recipeId;
}

async function deleteRecipe(id) {
  const headers = authedHeaders();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/recipes?id=eq.${id}`, { method: 'DELETE', headers });
  if (!res.ok) throw new Error('Failed to delete recipe: ' + await res.text());
  return true;
}

// ---------------------------------------------------------------------------
// Image upload
// ---------------------------------------------------------------------------

async function uploadRecipeImage(file) {
  const session = typeof getSession === 'function' ? getSession() : null;
  if (!session) throw new Error('Must be logged in to upload images');

  const ext      = file.name.split('.').pop().toLowerCase();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/recipe-images/${filename}`, {
    method:  'POST',
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + session.access_token, 'Content-Type': file.type, 'x-upsert': 'true' },
    body:    file
  });

  if (!res.ok) throw new Error('Image upload failed: ' + await res.text());
  return `${STORAGE_URL}/${filename}`;
}

// ---------------------------------------------------------------------------
// Admin check
// ---------------------------------------------------------------------------

async function checkIsAdmin() {
  const session = typeof getSession === 'function' ? getSession() : null;
  if (!session) return false;
  try {
    const res  = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=is_admin&id=eq.${session.user.id}`, { headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + session.access_token } });
    const rows = await res.json();
    return rows.length ? rows[0].is_admin === true : false;
  } catch(e) { return false; }
}

// ---------------------------------------------------------------------------
// Fetch single recipe efficiently (no need to load all 85)
// ---------------------------------------------------------------------------

async function fetchRecipeByIdDirect(id) {
  try {
    const [recipeRes, macroRes, ingRes, stepRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/recipes?id=eq.${id}&select=*`, { headers: dbHeaders }),
      fetch(`${SUPABASE_URL}/rest/v1/recipe_macros?recipe_id=eq.${id}&select=*`, { headers: dbHeaders }),
      fetch(`${SUPABASE_URL}/rest/v1/recipe_ingredients?recipe_id=eq.${id}&select=*&order=sort_order.asc`, { headers: dbHeaders }),
      fetch(`${SUPABASE_URL}/rest/v1/recipe_steps?recipe_id=eq.${id}&select=*&order=sort_order.asc`, { headers: dbHeaders })
    ]);

    if (!recipeRes.ok) throw new Error('recipe fetch failed');

    const [rows, macros, ingredients, steps] = await Promise.all([
      recipeRes.json(), macroRes.json(), ingRes.json(), stepRes.json()
    ]);

    if (!rows.length) return null;
    const r = rows[0];
    const m = macros[0] || {};

    return {
      id:           r.id,
      title:        r.title,
      section:      r.section,
      basePortions: r.base_portions,
      cookTime:     r.cook_time,
      image:        r.image_url || null,
      macrosPerPortion: { calories: m.calories || 0, protein: m.protein || 0, carbs: m.carbs || 0, fat: m.fat || 0, fiber: m.fiber || null },
      ingredients:  ingredients.map(i => ({ name: i.name, amount: i.amount, unit: i.unit })),
      steps:        steps.map(s => ({ title: s.title, description: s.description }))
    };
  } catch(e) {
    console.warn('fetchRecipeByIdDirect failed, trying local:', e);
    return typeof recipes !== 'undefined' ? (recipes.find(r => r.id === id) || null) : null;
  }
}
