/*
  Add your recipes here. Each object needs:

  {
    id:          'unique-kebab-case-id',
    name:        'Recipe Name',
    section:     'Breakfast' | 'Dinner' | 'Tea' | 'Sauces',
    calories:    number,           // per portion
    protein:     number,           // grams per portion
    carbs:       number,           // grams per portion
    fat:         number,           // grams per portion
    cookTime:    number,           // minutes
    portions:    number,
    ingredients: [
      { name: 'Chicken breast', quantity: '600g', category: 'Meat' },
    ],
    method: [
      'Step one...',
      'Step two...',
    ],
  }

  Valid ingredient categories:
  'Meat' | 'Dairy' | 'Fruit & Veg' | 'Dry Goods' | 'Tins & Jars' | 'Condiments'
*/

const recipes = [];

const CATEGORY_ORDER = ['Meat', 'Dairy', 'Fruit & Veg', 'Dry Goods', 'Tins & Jars', 'Condiments'];
