// FatScran — Recipe Database Layer
// All recipe reads/writes go through here.
// Falls back to local recipes array if Supabase fails.

// SUPABASE_URL, SUPABASE_KEY, and _supabase defined in auth.js
const STORAGE_URL = `${SUPABASE_URL}/storage/v1/object/public/recipe-images`;

function dbError(context, error) {
  const msg = `${context}: ${error.message || error}`;
  console.error(msg);
  if (typeof Sentry !== 'undefined') Sentry.captureMessage(msg);
  throw new Error('Save failed. Please try again.');
}

// ---------------------------------------------------------------------------
// Read
// ---------------------------------------------------------------------------

async function fetchAllRecipes() {
  try {
    const [recipeRes, macroRes, ingRes, stepRes] = await Promise.all([
      _supabase.from('recipes').select('*').order('id', { ascending: true }),
      _supabase.from('recipe_macros').select('*'),
      _supabase.from('recipe_ingredients').select('*').order('sort_order', { ascending: true }),
      _supabase.from('recipe_steps').select('*').order('sort_order', { ascending: true })
    ]);

    if (recipeRes.error) throw recipeRes.error;

    const dbRecipes   = recipeRes.data;
    const macros      = macroRes.data      || [];
    const ingredients = ingRes.data        || [];
    const steps       = stepRes.data       || [];

    return dbRecipes.map(r => ({
      id:           r.id,
      title:        r.title,
      section:      r.section,
      basePortions: r.base_portions,
      cookTime:     r.cook_time,
      image:        r.image_url || null,
      macrosPerPortion: (() => {
        const m = macros.find(m => m.recipe_id === r.id);
        return m ? { calories: m.calories, protein: m.protein, carbs: m.carbs, fat: m.fat, sugar: m.sugar || null, fiber: m.fiber || null } : { calories: 0, protein: 0, carbs: 0, fat: 0 };
      })(),
      ingredients: ingredients.filter(i => i.recipe_id === r.id).map(i => ({ name: i.name, amount: i.amount, unit: i.unit })),
      steps:       steps.filter(s => s.recipe_id === r.id).map(s => ({ title: s.title, description: s.description }))
    }));
  } catch(e) {
    console.warn('Supabase fetch failed, falling back to local recipes:', e);
    if (typeof Sentry !== 'undefined') Sentry.captureException(e);
    return typeof recipes !== 'undefined' ? recipes : [];
  }
}

async function fetchRecipeById(id) {
  const all = await fetchAllRecipes();
  return all.find(r => r.id === id) || null;
}

async function fetchRecipeByIdDirect(id) {
  try {
    const [recipeRes, macroRes, ingRes, stepRes] = await Promise.all([
      _supabase.from('recipes').select('*').eq('id', id),
      _supabase.from('recipe_macros').select('*').eq('recipe_id', id),
      _supabase.from('recipe_ingredients').select('*').eq('recipe_id', id).order('sort_order', { ascending: true }),
      _supabase.from('recipe_steps').select('*').eq('recipe_id', id).order('sort_order', { ascending: true })
    ]);

    if (recipeRes.error) throw recipeRes.error;
    if (!recipeRes.data.length) return null;

    const r = recipeRes.data[0];
    const m = macroRes.data && macroRes.data[0];
    return {
      id:           r.id,
      title:        r.title,
      section:      r.section,
      basePortions: r.base_portions,
      cookTime:     r.cook_time,
      image:        r.image_url || null,
      macrosPerPortion: m ? { calories: m.calories, protein: m.protein, carbs: m.carbs, fat: m.fat, sugar: m.sugar || null, fiber: m.fiber || null } : { calories: 0, protein: 0, carbs: 0, fat: 0 },
      ingredients:  (ingRes.data  || []).map(i => ({ name: i.name, amount: i.amount, unit: i.unit })),
      steps:        (stepRes.data || []).map(s => ({ title: s.title, description: s.description }))
    };
  } catch(e) {
    console.warn('fetchRecipeByIdDirect failed, falling back:', e);
    if (typeof Sentry !== 'undefined') Sentry.captureException(e);
    return typeof recipes !== 'undefined' ? (recipes.find(r => r.id === id) || null) : null;
  }
}

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------

async function saveRecipe(data, existingId) {
  const isEdit = !!existingId;
  const recipePayload = { title: data.title, section: data.section, base_portions: data.basePortions, cook_time: data.cookTime, image_url: data.image || null };

  let recipeId;
  if (isEdit) {
    const { error } = await _supabase.from('recipes').update(recipePayload).eq('id', existingId);
    if (error) dbError('update recipe', error);
    recipeId = existingId;
  } else {
    const { data: rows, error } = await _supabase.from('recipes').insert(recipePayload).select('id');
    if (error) dbError('insert recipe', error);
    recipeId = rows[0].id;
  }

  // Macros — delete and re-insert
  const { error: macroDelErr } = await _supabase.from('recipe_macros').delete().eq('recipe_id', recipeId);
  if (macroDelErr) dbError('delete macros', macroDelErr);
  const { error: macroInsErr } = await _supabase.from('recipe_macros').insert({ recipe_id: recipeId, calories: data.calories, protein: data.protein, carbs: data.carbs, fat: data.fat, sugar: data.sugar || null, fiber: data.fiber || null });
  if (macroInsErr) dbError('save macros', macroInsErr);

  // Ingredients — delete and re-insert
  const { error: ingDelErr } = await _supabase.from('recipe_ingredients').delete().eq('recipe_id', recipeId);
  if (ingDelErr) dbError('delete ingredients', ingDelErr);
  if (data.ingredients.length) {
    const ingPayload = data.ingredients.map((ing, i) => ({ recipe_id: recipeId, name: ing.name, amount: ing.amount === '' || ing.amount === null ? null : parseFloat(ing.amount), unit: ing.unit, sort_order: i }));
    const { error } = await _supabase.from('recipe_ingredients').insert(ingPayload);
    if (error) dbError('save ingredients', error);
  }

  // Steps — delete and re-insert
  const { error: stepDelErr } = await _supabase.from('recipe_steps').delete().eq('recipe_id', recipeId);
  if (stepDelErr) dbError('delete steps', stepDelErr);
  if (data.steps.length) {
    const stepPayload = data.steps.map((step, i) => ({ recipe_id: recipeId, title: step.title, description: step.description, sort_order: i }));
    const { error } = await _supabase.from('recipe_steps').insert(stepPayload);
    if (error) dbError('save steps', error);
  }

  return recipeId;
}

async function deleteRecipe(id) {
  const { error } = await _supabase.from('recipes').delete().eq('id', id);
  if (error) dbError('delete recipe', error);
  return true;
}

// ---------------------------------------------------------------------------
// Image upload
// ---------------------------------------------------------------------------

async function uploadRecipeImage(file) {
  if (!_currentSession) throw new Error('Must be logged in to upload images');
  if (!file.type.startsWith('image/')) throw new Error('File must be an image.');
  if (file.size > 5 * 1024 * 1024) throw new Error('Image must be under 5 MB.');

  const ext      = file.name.split('.').pop().toLowerCase();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await _supabase.storage
    .from('recipe-images')
    .upload(filename, file, { upsert: true, contentType: file.type });

  if (error) dbError('upload recipe image', error);
  return `${STORAGE_URL}/${filename}`;
}

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------

async function getProfile() {
  if (!_currentSession) return null;
  try {
    const { data, error } = await _supabase
      .from('profiles')
      .select('*')
      .eq('id', _currentSession.user.id)
      .single();
    if (error) return null;
    return data;
  } catch(e) { return null; }
}

async function saveProfile(data) {
  if (!_currentSession) throw new Error('Not logged in');
  const { error } = await _supabase
    .from('profiles')
    .upsert({ id: _currentSession.user.id, ...data });
  if (error) dbError('save profile', error);
}

async function uploadAvatar(file) {
  if (!_currentSession) throw new Error('Must be logged in to upload avatar');
  if (!file.type.startsWith('image/')) throw new Error('File must be an image.');
  if (file.size > 5 * 1024 * 1024) throw new Error('Image must be under 5 MB.');

  const ext      = file.name.split('.').pop().toLowerCase();
  const filename = `${_currentSession.user.id}/avatar.${ext}`;

  const { error } = await _supabase.storage
    .from('avatars')
    .upload(filename, file, { upsert: true, contentType: file.type });

  if (error) dbError('upload avatar', error);
  return `${SUPABASE_URL}/storage/v1/object/public/avatars/${filename}`;
}

// ---------------------------------------------------------------------------
// Admin check
// ---------------------------------------------------------------------------

async function checkIsAdmin() {
  if (!_currentSession) return false;
  try {
    const { data, error } = await _supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', _currentSession.user.id)
      .single();
    if (error) return false;
    return data ? data.is_admin === true : false;
  } catch(e) { return false; }
}
