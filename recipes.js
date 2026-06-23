const recipes = [];

function scaleAmount(ingredient, portions, basePortions) {
  if (ingredient.amount === null) return ingredient.unit;
  const scaled = ingredient.amount * (portions / basePortions);
  const rounded = scaled >= 100 ? Math.round(scaled) : scaled >= 10 ? Math.round(scaled * 10) / 10 : Math.round(scaled * 100) / 100;
  return rounded + ' ' + ingredient.unit;
}

const sections = ["all", ...new Set(recipes.map(r => r.section))];
