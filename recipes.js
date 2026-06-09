// amounts are for basePortions. The site scales by (selectedPortions / basePortions).
// amount: null means "to taste" or unscalable.

const recipes = [

  // ─── BREAKFAST ────────────────────────────────────────────────────────────

  {
    id: 20,
    title: "Oats N Berries",
    section: "breakfast",
    basePortions: 1,
    cookTime: "5 mins",
    macrosPerPortion: { calories: 383, protein: 30, carbs: 43, fat: 8 },
    ingredients: [
      { name: "Quick oats", amount: 1, unit: "serving" },
      { name: "Psyllium husk", amount: 1, unit: "serving" },
      { name: "Semi skimmed milk", amount: 1, unit: "portion" },
      { name: "Blueberries", amount: 1, unit: "serving" },
      { name: "Whey protein", amount: 1, unit: "portion" }
    ],
    steps: [
      { title: "Mix", description: "Combine oats, psyllium husk and milk. Top with blueberries and mix in whey protein." }
    ]
  },

  // ─── DINNER ───────────────────────────────────────────────────────────────

  {
    id: 1,
    title: "Butter Chicken Burritos",
    section: "dinner",
    basePortions: 14,
    cookTime: "60 mins",
    macrosPerPortion: { calories: 449, protein: 42, carbs: 44, fat: 11 },
    ingredients: [
      { name: "Chicken breast", amount: 1260, unit: "g" },
      { name: "0% Greek yogurt (marinade)", amount: 252, unit: "g" },
      { name: "Garam masala", amount: 10, unit: "g" },
      { name: "Kashmiri red chili powder", amount: 10, unit: "g" },
      { name: "Salt", amount: 8.4, unit: "g" },
      { name: "Garlic cloves (marinade)", amount: 4.5, unit: "cloves" },
      { name: "Burrito tortillas", amount: 14, unit: "whole" },
      { name: "Basmati rice", amount: 280, unit: "g" },
      { name: "Cilantro", amount: null, unit: "to taste" },
      { name: "Greek yogurt (sauce)", amount: 140, unit: "g" },
      { name: "Milk", amount: 56, unit: "ml" },
      { name: "Garlic (sauce)", amount: 4.2, unit: "g" },
      { name: "Light butter", amount: 42, unit: "g" },
      { name: "Onion", amount: 1.4, unit: "whole" },
      { name: "Garlic cloves (curry)", amount: 8.5, unit: "cloves" },
      { name: "Ground cumin", amount: 8.4, unit: "g" },
      { name: "Coriander", amount: 8.4, unit: "g" },
      { name: "Crushed tomatoes", amount: 2, unit: "cans (14oz)" },
      { name: "Cashews", amount: 42, unit: "g" },
      { name: "Fat-free evaporated milk", amount: 112, unit: "ml" },
      { name: "Corn starch", amount: 4.2, unit: "g" }
    ],
    steps: [
      { title: "Marinate the chicken", description: "Cut chicken into cubes. Combine Greek yogurt, garam masala, chili powder, salt, and minced garlic. Add chicken, mix well, and marinate for at least 1 hour." },
      { title: "Prepare the spice blend", description: "Mix cumin, Kashmiri chili powder, coriander, and garam masala in a small bowl." },
      { title: "Cook the chicken", description: "In a pan over high heat, cook marinated chicken for 7–8 minutes, then remove. Add diced onions and butter to the pan, cook until softened. Add spice blend and minced garlic, simmer for 2 minutes. Stir in crushed tomatoes, cashews, and evaporated milk." },
      { title: "Blend the sauce", description: "Transfer the mixture to a blender, add corn starch, and blend for 1–2 minutes. Return the sauce to the pan and mix with the cooked chicken." },
      { title: "Add rice", description: "Combine cooked basmati rice with the chicken and sauce mixture." },
      { title: "Make the garlic yogurt sauce", description: "Mix Greek yogurt, milk, garlic, and salt in a bowl." },
      { title: "Assemble the burritos", description: "Lay out tortillas, spread garlic yogurt sauce, and add equal portions of the chicken-rice mixture. Fold tightly to create burritos." }
    ]
  },

  {
    id: 2,
    title: "Beef Burgers",
    section: "dinner",
    basePortions: 14,
    cookTime: "30 mins",
    macrosPerPortion: { calories: 389, protein: 31, carbs: 29, fat: 17 },
    ingredients: [
      { name: "93% lean beef mince", amount: 1600, unit: "g" },
      { name: "Salt", amount: 6, unit: "tsp" },
      { name: "Black pepper", amount: 2, unit: "tsp" },
      { name: "Smoked paprika", amount: 6, unit: "tsp" },
      { name: "Onion powder", amount: 4, unit: "tsp" },
      { name: "Garlic powder", amount: 7, unit: "tsp" },
      { name: "Cumin", amount: 2, unit: "tsp" },
      { name: "Reduced-fat cheddar slices", amount: 11, unit: "slices" },
      { name: "English muffins", amount: 14, unit: "whole" },
      { name: "Light mayo", amount: 310, unit: "g" },
      { name: "Sugar-free ketchup", amount: 310, unit: "g" },
      { name: "Relish", amount: 140, unit: "g" },
      { name: "White vinegar", amount: 4, unit: "tsp" },
      { name: "Soy sauce", amount: 1.25, unit: "tsp" }
    ],
    steps: [
      { title: "Prepare the patties", description: "Form equal-weight patties. Season with a blend of salt, pepper, smoked paprika, onion powder, garlic powder, and cumin. Preheat grill to medium-high for ~10 minutes. Cook patties for 2.5–3 minutes each side with grill closed. Top each patty with a slice of cheese." },
      { title: "Make the burger sauce", description: "Mix mayonnaise, sugar-free ketchup, sweet relish, white vinegar, and soy sauce in a bowl." },
      { title: "Assemble and freeze", description: "Split English muffins in half. Spread burger sauce on both halves. Place a cooked cheeseburger on top. Wrap each assembled burger in foil and freeze." }
    ]
  },

  {
    id: 3,
    title: "Chicken Burgers",
    section: "dinner",
    basePortions: 14,
    cookTime: "40 mins",
    macrosPerPortion: { calories: 348, protein: 39, carbs: 39, fat: 4 },
    ingredients: [
      { name: "Chicken breast", amount: 1400, unit: "g" },
      { name: "Mustard", amount: 2.5, unit: "tbsp" },
      { name: "Paprika", amount: 2.5, unit: "tsp" },
      { name: "Cayenne pepper", amount: 2.5, unit: "tsp" },
      { name: "Garlic powder", amount: 2.5, unit: "tbsp" },
      { name: "Onion powder", amount: 2.5, unit: "tsp" },
      { name: "Cornflakes", amount: 140, unit: "g" },
      { name: "Burger buns", amount: 14, unit: "whole" },
      { name: "Lettuce", amount: null, unit: "to taste" },
      { name: "Light mayo", amount: 16, unit: "g" }
    ],
    steps: [
      { title: "Prepare the chicken mixture", description: "Mince the chicken breast in a food processor or with a knife. Combine with mustard, paprika, cayenne pepper, garlic powder, and onion powder. Mix thoroughly." },
      { title: "Prepare the coating", description: "Crush the cornflakes into fine crumbs in a bowl." },
      { title: "Form and coat the patties", description: "Shape the seasoned chicken mixture into equal-sized patties. Coat each in the crushed cornflakes, pressing lightly to adhere." },
      { title: "Bake the patties", description: "Heat oven to 200°C (180°C fan). Place coated patties on a baking tray lined with parchment paper and bake for 20–25 minutes until golden and fully cooked (75°C internal temperature)." },
      { title: "Assemble the burgers", description: "Lightly toast the burger buns. Add lettuce and a thin layer of light mayo. Place the crispy chicken patties onto the buns and close." }
    ]
  },

  {
    id: 4,
    title: "Pizza Pockets",
    section: "dinner",
    basePortions: 14,
    cookTime: "30 mins",
    macrosPerPortion: { calories: 420, protein: 37, carbs: 19, fat: 22 },
    ingredients: [
      { name: "Pepperoni", amount: 280, unit: "g" },
      { name: "Lean beef mince", amount: 1260, unit: "g" },
      { name: "Salt", amount: 16.8, unit: "g" },
      { name: "Garlic powder", amount: 7.8, unit: "g" },
      { name: "Onion powder", amount: 7.8, unit: "g" },
      { name: "Italian herb seasoning", amount: 2.8, unit: "tbsp" },
      { name: "Garlic cloves", amount: 11.5, unit: "cloves" },
      { name: "Pizza sauce", amount: 336, unit: "g" },
      { name: "Cream cheese", amount: 224, unit: "g" },
      { name: "Parmesan cheese", amount: 28, unit: "g" },
      { name: "Basil", amount: 2.8, unit: "tbsp" },
      { name: "Low-fat cheese", amount: 280, unit: "g" },
      { name: "Tortilla wraps", amount: 14, unit: "whole" }
    ],
    steps: [
      { title: "Fry the pepperoni", description: "Heat a large skillet over medium heat. Add the pepperoni and fry until crispy, about 3–4 minutes. Drain the oil and set aside." },
      { title: "Cook the beef", description: "In the same skillet, add the lean beef mince. Cook over medium-high heat, breaking it apart, until browned and fully cooked, about 5–7 minutes. Drain any excess fat." },
      { title: "Add the seasonings", description: "Sprinkle in salt, garlic powder, onion powder, and Italian herb seasoning. Stir and cook for another minute." },
      { title: "Add the sauce", description: "Stir in pizza sauce, cream cheese, and Parmesan cheese. Mix until well combined and heated through, about 2–3 minutes." },
      { title: "Combine", description: "Stir in the cooked pepperoni, low-fat cheese, and basil. Mix until evenly combined." },
      { title: "Assemble", description: "Lay out tortilla wraps. Spoon the beef and pepperoni mixture onto the centre of each tortilla. Fold the sides over the filling and roll up tightly." }
    ]
  },

  {
    id: 5,
    title: "Chicken Salad Wraps",
    section: "dinner",
    basePortions: 14,
    cookTime: "35 mins",
    macrosPerPortion: { calories: 336, protein: 31, carbs: 27, fat: 7 },
    ingredients: [
      { name: "Chicken breast", amount: 1575, unit: "g" },
      { name: "Light cream cheese (11% fat)", amount: 455, unit: "g" },
      { name: "Low-fat Greek yogurt", amount: 455, unit: "g" },
      { name: "Carrot", amount: 3.5, unit: "whole" },
      { name: "Chopped dill", amount: 3.5, unit: "tsp" },
      { name: "Lemon juice", amount: 3.5, unit: "tsp" },
      { name: "Red wine vinegar", amount: 1.75, unit: "tsp" },
      { name: "Salt & pepper", amount: null, unit: "to taste" },
      { name: "Whole wheat tortillas", amount: 14, unit: "whole" },
      { name: "Lettuce leaves", amount: 8.5, unit: "whole" },
      { name: "Tomato slices", amount: 42, unit: "slices" },
      { name: "Cucumber sticks", amount: 42, unit: "sticks" },
      { name: "Small onion", amount: 1.75, unit: "whole" }
    ],
    steps: [
      { title: "Cook the chicken", description: "Boil the chicken breast for 20–25 minutes until fully cooked. Set aside to cool." },
      { title: "Make the dressing", description: "Whisk the cream cheese until completely soft. Add the Greek yogurt and whisk until fully combined. Grate the carrot and mix in. Whisk in chopped dill, fresh lemon juice, and red wine vinegar. Season with salt and pepper." },
      { title: "Shred and combine", description: "Once the chicken is cool enough, shred into small pieces and add to the dressing mixture. Mix well until evenly combined." },
      { title: "Assemble the wraps", description: "Lay a whole wheat tortilla flat. Add tomato slices, cucumber sticks, a bit of onion, and chopped lettuce. Spoon the chicken salad onto the wrap. Fold and roll tightly." }
    ]
  },

  {
    id: 6,
    title: "Creamy Chicken Fajita Burritos",
    section: "dinner",
    basePortions: 14,
    cookTime: "35 mins",
    macrosPerPortion: { calories: 307, protein: 27, carbs: 29, fat: 8 },
    ingredients: [
      { name: "Chicken breast", amount: 1260, unit: "g" },
      { name: "Coriander", amount: 35, unit: "g" },
      { name: "Limes (juiced)", amount: 2, unit: "whole" },
      { name: "Honey", amount: 30, unit: "g" },
      { name: "Garlic powder", amount: 12, unit: "g" },
      { name: "Chili powder", amount: 4, unit: "g" },
      { name: "Paprika", amount: 4, unit: "g" },
      { name: "Cumin", amount: 4, unit: "g" },
      { name: "Bell peppers", amount: 6, unit: "whole" },
      { name: "Onions", amount: 2, unit: "whole" },
      { name: "Greek yogurt", amount: 308, unit: "g" },
      { name: "Mozzarella", amount: 140, unit: "g" },
      { name: "Tortillas", amount: 14, unit: "whole" }
    ],
    steps: [
      { title: "Marinate the chicken", description: "Combine garlic powder, chili powder, paprika, cumin, lime juice, honey, and coriander. Coat the chicken breast in the marinade and leave for at least 30 minutes." },
      { title: "Cook the chicken and veg", description: "Cook the chicken in a pan over medium-high heat until cooked through. Remove and slice. In the same pan, cook sliced peppers and onions until softened." },
      { title: "Make the creamy sauce", description: "Stir Greek yogurt into the pan with the veg over low heat. Add the sliced chicken back in and mix to combine." },
      { title: "Assemble the burritos", description: "Lay out tortillas. Add the chicken fajita mixture and sprinkle mozzarella over each. Fold tightly and wrap." }
    ]
  },

  {
    id: 21,
    title: "Breakfast Burrito",
    section: "dinner",
    basePortions: 14,
    cookTime: "30 mins",
    macrosPerPortion: { calories: 397, protein: 42, carbs: 37, fat: 10 },
    ingredients: [
      { name: "Chicken chipolatas", amount: 28, unit: "whole" },
      { name: "50% reduced fat mature cheese", amount: 1, unit: "serving" },
      { name: "0% Greek yogurt", amount: 1, unit: "serving" },
      { name: "Multigrain wraps", amount: 14, unit: "whole" },
      { name: "Lean smoked bacon medallions", amount: 28, unit: "rashers" },
      { name: "Free range egg whites", amount: 840, unit: "g" },
      { name: "Salt & pepper", amount: null, unit: "to taste" }
    ],
    steps: [
      { title: "Cook the bacon and sausage", description: "Finely chop the bacon and cook over medium heat until nearly crispy. Add the chopped chicken sausage, cook until heated through, and drain excess grease." },
      { title: "Cook the eggs", description: "Microwave egg whites in 45-second increments at no higher than 700w. After each interval, scrape the edges and mix. Stop when 80-90% firm." },
      { title: "Assemble", description: "Add a spoonful of Greek yogurt, sausage/bacon mixture, and cheesy eggs to each tortilla. Fold the burrito, then wrap with foil or parchment paper and freeze." }
    ]
  },

  {
    id: 22,
    title: "Chicken Flatbread",
    section: "dinner",
    basePortions: 7,
    cookTime: "10 mins",
    macrosPerPortion: { calories: 409, protein: 41, carbs: 39, fat: 9 },
    ingredients: [
      { name: "Soft cheese (50% reduced fat)", amount: 1, unit: "serving" },
      { name: "Sweet smoky chicken", amount: 1, unit: "portion" },
      { name: "Chilli protein cheese", amount: 1, unit: "portion" },
      { name: "High protein flatbreads", amount: 7, unit: "whole" }
    ],
    steps: [
      { title: "Assemble", description: "Spread soft cheese onto each flatbread. Top with sweet smoky chicken and chilli protein cheese. Serve cold or warm in a pan." }
    ]
  },

  {
    id: 23,
    title: "Tuna Flatbread",
    section: "dinner",
    basePortions: 1,
    cookTime: "5 mins",
    macrosPerPortion: { calories: 342, protein: 31, carbs: 39, fat: 7 },
    ingredients: [
      { name: "High protein flatbread", amount: 1, unit: "whole" },
      { name: "Tuna chunks in spring water", amount: 1, unit: "portion" },
      { name: "Soft cheese (50% reduced fat)", amount: 1, unit: "serving" },
      { name: "Gherkins", amount: 1, unit: "serving" }
    ],
    steps: [
      { title: "Assemble", description: "Spread soft cheese onto the flatbread. Top with tuna and gherkins." }
    ]
  },

  {
    id: 24,
    title: "Salmon Bagel",
    section: "dinner",
    basePortions: 5,
    cookTime: "5 mins",
    macrosPerPortion: { calories: 379, protein: 34, carbs: 30, fat: 13 },
    ingredients: [
      { name: "Wild Pacific pink salmon (canned)", amount: 2.5, unit: "cans" },
      { name: "Protein bagels", amount: 5, unit: "whole" },
      { name: "Soft cheese (50% reduced fat)", amount: 1, unit: "serving" },
      { name: "Cucumber", amount: 1, unit: "whole" }
    ],
    steps: [
      { title: "Assemble", description: "Spread soft cheese on each bagel. Top with salmon and sliced cucumber." }
    ]
  },

  {
    id: 25,
    title: "Chicken, Egg & Tom Wrap",
    section: "dinner",
    basePortions: 7,
    cookTime: "20 mins",
    macrosPerPortion: { calories: 487, protein: 49, carbs: 30, fat: 19 },
    ingredients: [
      { name: "Eggs", amount: 7, unit: "whole" },
      { name: "Chicken breast", amount: 1, unit: "portion" },
      { name: "Baby plum tomatoes", amount: 1, unit: "serving" },
      { name: "High protein tortillas", amount: 7, unit: "whole" },
      { name: "Soft cheese (50% reduced fat)", amount: 1, unit: "serving" }
    ],
    steps: [
      { title: "Cook the chicken", description: "Cook chicken breast in a pan over medium-high heat until cooked through. Slice or shred." },
      { title: "Cook the eggs", description: "Scramble or fry the eggs to your preference." },
      { title: "Assemble", description: "Spread soft cheese on each tortilla. Add chicken, eggs, and sliced tomatoes. Wrap tightly." }
    ]
  },

  {
    id: 26,
    title: "Chicken & Pepper Sandwich",
    section: "dinner",
    basePortions: 14,
    cookTime: "20 mins",
    macrosPerPortion: { calories: 372, protein: 39, carbs: 34, fat: 17 },
    ingredients: [
      { name: "Medium sliced brown bread", amount: 28, unit: "slices" },
      { name: "Sweet peppers", amount: 1, unit: "portion" },
      { name: "Green pesto", amount: 1, unit: "serving" },
      { name: "Chicken breast", amount: 1, unit: "portion" },
      { name: "Fat free Greek yogurt", amount: 1, unit: "serving" }
    ],
    steps: [
      { title: "Cook the chicken", description: "Season and cook chicken breast until cooked through. Slice." },
      { title: "Assemble", description: "Mix Greek yogurt with pesto. Spread on bread, top with chicken and sliced peppers." }
    ]
  },

  {
    id: 27,
    title: "Tuna Salad",
    section: "dinner",
    basePortions: 14,
    cookTime: "10 mins",
    macrosPerPortion: { calories: 233, protein: 40, carbs: 13, fat: 4 },
    ingredients: [
      { name: "Red onion", amount: 1, unit: "serving" },
      { name: "Spring onions", amount: 1, unit: "serving" },
      { name: "Cucumber", amount: 1, unit: "whole" },
      { name: "Tuna chunks in spring water", amount: 7, unit: "cans" },
      { name: "Pickled dill cucumbers", amount: 1, unit: "serving" },
      { name: "Low fat cottage cheese", amount: 1, unit: "portion" },
      { name: "Fat free Greek yogurt", amount: 1, unit: "serving" },
      { name: "Dijon mustard", amount: 1, unit: "serving" }
    ],
    steps: [
      { title: "Prep the veg", description: "Finely chop red onion, spring onions, cucumber, and gherkins." },
      { title: "Make the dressing", description: "Mix cottage cheese, Greek yogurt, and dijon mustard until smooth." },
      { title: "Combine", description: "Drain tuna and fold through the dressing with all the veg. Season to taste." }
    ]
  },

  {
    id: 28,
    title: "Chicken Wraps",
    section: "dinner",
    basePortions: 6,
    cookTime: "10 mins",
    macrosPerPortion: { calories: 337, protein: 42, carbs: 15, fat: 9 },
    ingredients: [
      { name: "Soft cheese (50% reduced fat)", amount: 1, unit: "serving" },
      { name: "High protein wraps", amount: 6, unit: "whole" },
      { name: "Eatlean cheese", amount: 1, unit: "portion" },
      { name: "Salad", amount: null, unit: "to taste" },
      { name: "Sweet smoky chicken", amount: 1, unit: "portion" }
    ],
    steps: [
      { title: "Assemble", description: "Spread soft cheese on each wrap. Add sweet smoky chicken, Eatlean cheese, and salad. Wrap tightly." }
    ]
  },

  // ─── TEA ──────────────────────────────────────────────────────────────────

  {
    id: 7,
    title: "Beef & Bean Chilli",
    section: "tea",
    basePortions: 14,
    cookTime: "35 mins",
    macrosPerPortion: { calories: 794, protein: 48, carbs: 110, fat: 16 },
    ingredients: [
      { name: "Basmati rice", amount: 1050, unit: "g" },
      { name: "British beef mince", amount: 1680, unit: "g" },
      { name: "Onions", amount: 7, unit: "whole" },
      { name: "Garlic cloves", amount: 7, unit: "cloves" },
      { name: "Red kidney beans (canned)", amount: 7, unit: "cans (400g)" },
      { name: "Mature cheddar cheese", amount: 210, unit: "g" },
      { name: "Mexican-style spice mix", amount: 7, unit: "sachets" },
      { name: "Tomato passata", amount: 3500, unit: "ml" },
      { name: "Beef stock paste", amount: 70, unit: "g" },
      { name: "Sour cream", amount: 280, unit: "g" }
    ],
    steps: [
      { title: "Cook the rice", description: "Boil a half-full kettle. Add boiled water and 1/4 tsp salt to a large saucepan on high heat. Add the rice and cook for 10–12 minutes. Once cooked, drain, return to the pan, cover, and set aside." },
      { title: "Fry the beef", description: "Heat a large frying pan (no oil) on medium-high heat. Add the beef mince and fry for 5–6 minutes until browned, breaking it up as it cooks. Drain excess fat." },
      { title: "Prep ingredients", description: "Halve, peel, and chop the onion. Peel and grate the garlic. Drain and rinse kidney beans. Grate the cheese." },
      { title: "Add veg and spice", description: "Add onion and garlic to the beef. Stir-fry for 3 minutes. Add the spice mix, passata, and beef stock paste. Stir in kidney beans and water. Bring to a boil." },
      { title: "Simmer the chilli", description: "Reduce heat to medium and simmer for 8–10 minutes until thickened. Stir occasionally. Season with salt and pepper." },
      { title: "Serve", description: "Fluff the rice and portion into bowls. Spoon chilli on top and garnish with grated cheese and sour cream." }
    ]
  },

  {
    id: 8,
    title: "Beef Stew",
    section: "tea",
    basePortions: 12,
    cookTime: "4 hrs",
    macrosPerPortion: { calories: 521, protein: 33, carbs: 60, fat: 17 },
    ingredients: [
      { name: "Beef topside/silverside joint", amount: 2500, unit: "g" },
      { name: "Celery sticks", amount: 6, unit: "whole" },
      { name: "Large onions", amount: 3, unit: "whole" },
      { name: "Large carrots", amount: 7, unit: "whole" },
      { name: "Parsnip", amount: 1, unit: "large" },
      { name: "Bay leaves", amount: 15, unit: "whole" },
      { name: "Thyme sprigs", amount: 6, unit: "whole" },
      { name: "Vegetable oil", amount: 60, unit: "ml" },
      { name: "Butter", amount: 60, unit: "g" },
      { name: "Plain flour", amount: 60, unit: "g" },
      { name: "Tomato purée", amount: 100, unit: "g" },
      { name: "Worcestershire sauce", amount: 90, unit: "ml" },
      { name: "Beef stock cubes", amount: 6, unit: "whole" },
      { name: "Potatoes", amount: 1000, unit: "g" }
    ],
    steps: [
      { title: "Prepare the ingredients", description: "Mince/dice celery as fine as you can. Chop the onions. Halve carrots lengthways, then slice into chunks. Cut any other veg into chunks." },
      { title: "Cook the base", description: "In a large pot, heat oil and butter. Add the celery, onions, carrots, other veg, bay leaves, and 3 whole thyme sprigs. Cook for 10 minutes until softened. Put lid on pan and let sweat for 30 mins." },
      { title: "Build the stew", description: "Stir in plain flour until fully combined. Add tomato purée, Worcestershire sauce, and crumbled beef stock cubes." },
      { title: "Add the beef and simmer", description: "Gradually stir in 2.5L hot water. Add the stewing beef. Bring to a gentle simmer." },
      { title: "Bake the stew", description: "Cover and bake for 3 hours on medium heat. Uncover and bake for another 30 minutes to 1 hour until the beef is tender and the sauce has thickened." },
      { title: "Garnish and serve", description: "Top with leaves from the remaining thyme sprigs." }
    ]
  },

  {
    id: 9,
    title: "Velvet Chicken & Veg Stir Fry",
    section: "tea",
    basePortions: 14,
    cookTime: "30 mins",
    macrosPerPortion: { calories: 238, protein: 32, carbs: 9, fat: 5 },
    ingredients: [
      { name: "Chicken breast", amount: 2000, unit: "g" },
      { name: "Broccoli florets", amount: 1000, unit: "g" },
      { name: "Water chestnuts, drained (optional)", amount: 789, unit: "g" },
      { name: "Green onions", amount: 10.5, unit: "whole" },
      { name: "Baking soda", amount: 35, unit: "g" },
      { name: "Vegetable oil", amount: 52.5, unit: "ml" },
      { name: "Salt & pepper", amount: null, unit: "to taste" },
      { name: "Chicken broth", amount: 437.5, unit: "ml" },
      { name: "Mirin", amount: 105, unit: "ml" },
      { name: "Soy sauce", amount: 105, unit: "ml" },
      { name: "Oyster sauce", amount: 105, unit: "ml" }
    ],
    steps: [
      { title: "Tenderise the chicken", description: "Slice the chicken breast into 1/4\" thick slices. Dust both sides with baking soda. Let sit for 15 minutes. Rinse off thoroughly with water, then pat dry. Season with salt and pepper." },
      { title: "Prepare the sauce", description: "Mix chicken broth and remaining sauce ingredients together." },
      { title: "Cook the chicken", description: "Heat oil in a large skillet over medium-high heat. Add chicken in a single layer and cook for 2–3 minutes until golden. Flip and cook for ~90 seconds more." },
      { title: "Add vegetables", description: "Reduce heat to medium. Push chicken to the sides. Add broccoli to the centre and cook for 1 minute. Add water chestnuts and cook for 1 more minute." },
      { title: "Add sauce and finish", description: "Lower the heat and pour in the sauce. Cook until the sauce reduces and coats everything evenly. Remove from heat, stir in chopped green onion, and serve over white rice." }
    ]
  },

  {
    id: 10,
    title: "Teriyaki Sesame Chicken",
    section: "tea",
    basePortions: 14,
    cookTime: "30 mins",
    macrosPerPortion: { calories: 718, protein: 51, carbs: 117, fat: 6 },
    ingredients: [
      { name: "Basmati rice", amount: 1050, unit: "g" },
      { name: "Diced chicken breast", amount: 1820, unit: "g" },
      { name: "Red onion", amount: 7, unit: "whole" },
      { name: "Green beans", amount: 560, unit: "g" },
      { name: "Garlic cloves", amount: 7, unit: "cloves" },
      { name: "Teriyaki sauce", amount: 1050, unit: "g" },
      { name: "Red chilli", amount: 4, unit: "whole" },
      { name: "Roasted white sesame seeds", amount: 35, unit: "g" }
    ],
    steps: [
      { title: "Cook the rice", description: "Boil a kettle. Pour boiled water into a large saucepan with 1/4 tsp salt on high heat. Add rice and cook for 10–12 minutes. Drain, return to the pan, cover, and set aside." },
      { title: "Fry the chicken", description: "Heat a large frying pan over medium-high heat with a drizzle of oil. Add diced chicken and stir-fry until browned, 5–6 minutes. Meanwhile, halve, peel, and slice the onion. Trim green beans and cut into thirds." },
      { title: "Cook the vegetables", description: "Stir in the onion and green beans. Stir-fry until softened, 3–4 minutes. Peel and grate garlic, adding it to the pan for 1 minute once the vegetables are tender." },
      { title: "Add the sauce", description: "Stir in teriyaki sauce and a splash of water. Lower the heat and simmer until the sauce is sticky and the chicken is cooked through, 3–4 minutes." },
      { title: "Finish and serve", description: "Stir in sesame seeds. Fluff up the rice and plate with teriyaki chicken on top. Sprinkle with sliced chilli to taste." }
    ]
  },

  {
    id: 11,
    title: "Chermoula Spiced Lamb & Rice",
    section: "tea",
    basePortions: 14,
    cookTime: "30 mins",
    macrosPerPortion: { calories: 534, protein: 29, carbs: 67, fat: 17 },
    ingredients: [
      { name: "Lamb mince", amount: 1400, unit: "g" },
      { name: "Basmati rice", amount: 1050, unit: "g" },
      { name: "Garlic cloves", amount: 14, unit: "cloves" },
      { name: "Fresh mint", amount: 1, unit: "large bunch" },
      { name: "Harissa paste", amount: 350, unit: "g" },
      { name: "Chermoula spice mix", amount: 7, unit: "sachets" },
      { name: "Tomato purée", amount: 210, unit: "g" },
      { name: "Chicken stock paste", amount: 70, unit: "g" },
      { name: "Greek style natural yoghurt", amount: 525, unit: "g" },
      { name: "Water for sauce", amount: 700, unit: "ml" },
      { name: "Salt & pepper", amount: null, unit: "to taste" }
    ],
    steps: [
      { title: "Cook the mince", description: "Heat a large frying pan over medium-high heat (no oil). Add the mince and cook until browned, 5–6 minutes, breaking it up as it cooks. Drain any excess fat." },
      { title: "Cook the rice", description: "Pour boiled water into a large saucepan with 1/4 tsp salt over high heat. Add the rice and cook for 10–12 minutes. Once cooked, drain, return to the pan, cover, and set aside." },
      { title: "Prepare the ingredients", description: "Peel and grate the garlic cloves. Pick and finely chop the mint leaves, discarding the stalks." },
      { title: "Add spices and sauce", description: "To the browned mince, add the grated garlic, harissa paste, chermoula spice mix, and tomato purée. Cook for 1 minute. Stir in water and the chicken stock paste. Season with salt and pepper. Bring to a boil, then simmer until slightly thickened, 2–3 minutes." },
      { title: "Prepare the mint yoghurt", description: "Mix the Greek-style natural yoghurt with half of the chopped mint. Season with salt and pepper." },
      { title: "Combine and serve", description: "Mix the cooked rice into the mince mixture until well combined. Divide among plates, top with mint yoghurt, and sprinkle with the remaining mint." }
    ]
  },

  {
    id: 12,
    title: "Mexican Style Pilaf",
    section: "tea",
    basePortions: 12,
    cookTime: "30 mins",
    macrosPerPortion: { calories: 523, protein: 39, carbs: 76, fat: 6 },
    ingredients: [
      { name: "Basmati rice", amount: 1050, unit: "g" },
      { name: "Garlic cloves", amount: 7, unit: "cloves" },
      { name: "Bell peppers", amount: 7, unit: "whole" },
      { name: "British beef mince", amount: 1680, unit: "g" },
      { name: "Tomato purée", amount: 210, unit: "g" },
      { name: "Ground cumin", amount: 7, unit: "tsp" },
      { name: "Chicken stock paste", amount: 70, unit: "g" },
      { name: "Chipotle paste", amount: 140, unit: "g" },
      { name: "Greek yogurt", amount: 525, unit: "g" },
      { name: "Onions", amount: 1000, unit: "g" },
      { name: "Honey", amount: 100, unit: "g" }
    ],
    steps: [
      { title: "Cook the rice", description: "Boil a full kettle. Rinse the rice under cold water. Pour boiled water into a large saucepan with 1/4 tsp salt on high heat. Add the rice and cook for 10–12 mins. Once cooked, drain and cover." },
      { title: "Prep the veg", description: "Peel and grate the garlic. Halve the peppers, discard the core and seeds, and slice into thin strips. Peel and finely chop the onions." },
      { title: "Fry the mince", description: "Heat a drizzle of oil in a large frying pan on medium-high heat. Add the beef mince, onions, and peppers. Fry until browned, 5–6 mins, using a spoon to break up the mince. Drain and discard any excess fat. Season with salt and pepper." },
      { title: "Add the flavour", description: "Add the garlic, tomato purée, and ground cumin to the beef. Stir-fry for 1 min. Stir in the chicken stock paste, chipotle paste, and water. Simmer until thickened, 1–2 mins." },
      { title: "Combine your pilaf", description: "Stir the honey into the sauce until combined. Add the cooked rice to the pan and stir until well combined." }
    ]
  },

  {
    id: 13,
    title: "Chicken Burger Bowls",
    section: "tea",
    basePortions: 14,
    cookTime: "30 mins",
    macrosPerPortion: { calories: 542, protein: 54, carbs: 48, fat: 14 },
    ingredients: [
      { name: "Basmati rice", amount: 1050, unit: "g" },
      { name: "Slow cooked chicken breast", amount: 2030, unit: "g" },
      { name: "Baby gem lettuce", amount: 7, unit: "whole" },
      { name: "Medium tomatoes", amount: 7, unit: "whole" },
      { name: "Mature cheddar cheese", amount: 210, unit: "g" },
      { name: "Red wine vinegar", amount: 84, unit: "ml" },
      { name: "Burger sauce", amount: 210, unit: "g" },
      { name: "Crispy onions", amount: 7, unit: "sachets" }
    ],
    steps: [
      { title: "Cook the rice", description: "Boil a half-full kettle. Pour boiled water into a large saucepan with 1/4 tsp salt over high heat. Add the rice and cook for 10–12 mins. Once cooked, drain and return to the pan. Cover with a lid and set aside." },
      { title: "Simmer the chicken", description: "Heat a large saucepan with a tight-fitting lid over medium-high heat. Add the chicken along with the juices from the packet. Simmer on low with the lid on until tender enough to shred with a fork, 10–15 mins." },
      { title: "Prep time", description: "Trim the baby gem lettuce, halve it lengthways, then thinly slice. Cut the tomatoes into 1cm chunks. Grate the cheese." },
      { title: "Shred and stir", description: "Once tender, remove the lid and shred the chicken. Stir through hot sauce, tomato ketchup, and butter. Season with salt and pepper." },
      { title: "Serve", description: "Divide the rice between bowls. Top with shredded chicken and sprinkle over the cheese. Add the salad to one side and drizzle burger sauce on top. Sprinkle with crispy onions to finish." }
    ]
  },

  {
    id: 14,
    title: "Popcorn Chicken & Mac & Cheese",
    section: "tea",
    basePortions: 14,
    cookTime: "40 mins",
    macrosPerPortion: { calories: 678, protein: 67, carbs: 73, fat: 13 },
    ingredients: [
      { name: "Diced chicken breast", amount: 2450, unit: "g" },
      { name: "Plain flour", amount: 350, unit: "g" },
      { name: "Eggs (whisked)", amount: 7, unit: "whole" },
      { name: "Baking powder", amount: 10.5, unit: "g" },
      { name: "Macaroni/elbow pasta", amount: 1120, unit: "g" },
      { name: "Fat-free evaporated milk", amount: 1190, unit: "ml" },
      { name: "Light cream cheese", amount: 210, unit: "g" },
      { name: "Grated cheddar cheese", amount: 245, unit: "g" },
      { name: "Smoked paprika", amount: 8.75, unit: "g" },
      { name: "Salt", amount: 21, unit: "g" },
      { name: "Garlic powder", amount: 10.5, unit: "g" },
      { name: "Nutritional yeast (optional)", amount: 14, unit: "g" },
      { name: "KFC spice blend", amount: null, unit: "see recipe" }
    ],
    steps: [
      { title: "Prep and coat the chicken", description: "Add flour and baking powder to a bowl, add in KFC herbs & spices, and mix. Add diced chicken to whisked eggs then into flour mixture. Air fry at 200°C for 12–15 mins (or oven cook at 190°C for 18–22 mins)." },
      { title: "Boil the pasta", description: "Boil the pasta in salted water. Reserve some pasta water before draining." },
      { title: "Make the cheese sauce", description: "In a pan on low-medium heat, add evaporated milk, cream cheese, grated cheddar, garlic powder, smoked paprika, salt, and nutritional yeast (optional). Stir gently until smooth and creamy." },
      { title: "Combine mac & cheese", description: "Add cooked pasta to the cheese sauce. Add reserved pasta water in small increments to emulsify until silky and cohesive." },
      { title: "Serve", description: "Portion mac & cheese and chicken separately for ease when reheating." }
    ]
  },

  {
    id: 15,
    title: "Shepherds Pie",
    section: "tea",
    basePortions: 12,
    cookTime: "50 mins",
    macrosPerPortion: { calories: 613, protein: 35, carbs: 57, fat: 27 },
    ingredients: [
      { name: "Baking potatoes", amount: 3150, unit: "g" },
      { name: "Carrot", amount: 7, unit: "whole" },
      { name: "Garlic cloves", amount: 14, unit: "cloves" },
      { name: "Lamb mince", amount: 1400, unit: "g" },
      { name: "Tomato passata", amount: 3500, unit: "ml" },
      { name: "Red wine stock paste", amount: 196, unit: "g" },
      { name: "Dried oregano", amount: 7, unit: "sachets" },
      { name: "Grated hard Italian style cheese", amount: 140, unit: "g" },
      { name: "Green beans", amount: 1050, unit: "g" }
    ],
    steps: [
      { title: "Prepare the ingredients", description: "Put a large saucepan of water with 1/2 tsp salt on to boil for the potatoes. Chop the potatoes into 2cm chunks. Trim the carrot and coarsely grate. Peel and grate the garlic." },
      { title: "Fry the lamb", description: "When the water is boiling, add the potatoes and cook until fork-tender, 15–20 mins. Meanwhile, heat a large frying pan on medium-high heat (no oil). Add the lamb mince and grated carrot. Fry until browned, 5–6 mins." },
      { title: "Cook the sauce", description: "Add the garlic and cook for 1 more minute. Stir in the passata, red wine stock paste, dried oregano, and water. Bring to a boil, then reduce heat and simmer for 4–5 mins until thickened." },
      { title: "Make the mash", description: "Preheat grill to high. Drain the cooked potatoes and return to the pan off the heat. Add a knob of butter and a splash of milk, then mash until smooth. Season with salt and pepper." },
      { title: "Grill the pie", description: "Pour the lamb mixture into an ovenproof dish. Spread the mash over the top in an even layer. Sprinkle over the cheese, then place under the grill until bubbling and golden, 5–6 mins." },
      { title: "Finish and serve", description: "Serve with green beans stir-fried in a hot pan with a splash of water." }
    ]
  },

  {
    id: 16,
    title: "High-Protein Creamy Tomato Pasta",
    section: "tea",
    basePortions: 14,
    cookTime: "40 mins",
    macrosPerPortion: { calories: 713, protein: 52, carbs: 88, fat: 14 },
    ingredients: [
      { name: "Onions", amount: 6, unit: "whole" },
      { name: "Carrots", amount: 5, unit: "whole" },
      { name: "Mushrooms (optional)", amount: 700, unit: "g" },
      { name: "Garlic", amount: null, unit: "to taste" },
      { name: "Low-fat cottage cheese", amount: 500, unit: "g" },
      { name: "Parmesan cheese", amount: 300, unit: "g" },
      { name: "5% beef mince", amount: 1700, unit: "g" },
      { name: "Tomato passata", amount: 1400, unit: "g" },
      { name: "Pasta of choice", amount: 1400, unit: "g" },
      { name: "Fresh basil (optional)", amount: null, unit: "to taste" }
    ],
    steps: [
      { title: "Prepare the ingredients", description: "Grate carrots finely. Chop mushrooms. Chop onions." },
      { title: "Cook the pasta", description: "Cook pasta in well-salted boiling water. Reserve some pasta water before draining." },
      { title: "Fry the beef", description: "Heat a large frying pan on medium-high heat (no oil). Add the beef mince and fry until browned, 5–6 minutes. Drain any excess fat. Add onions and mushrooms and cook through. Add grated carrots." },
      { title: "Make the sauce", description: "Add cottage cheese and tomato passata to a blender and blitz thoroughly. Add fresh basil if using." },
      { title: "Combine", description: "Add garlic to the beef pan over low heat. Add the blended sauce. Add reserved pasta water slowly until the sauce is silky and cohesive. Add the pasta and stir through." },
      { title: "Serve", description: "Divide between portions and finish with Parmesan." }
    ]
  },

  {
    id: 17,
    title: "Thai Green Chicken Curry",
    section: "tea",
    basePortions: 14,
    cookTime: "35 mins",
    macrosPerPortion: { calories: 591, protein: 36, carbs: 74, fat: 15 },
    ingredients: [
      { name: "Jasmine rice", amount: 1050, unit: "g" },
      { name: "Diced chicken breast", amount: 1680, unit: "g" },
      { name: "Thai green paste", amount: 315, unit: "g" },
      { name: "Thai style spice mix", amount: null, unit: "to taste" },
      { name: "Coconut milk", amount: 1260, unit: "ml" },
      { name: "Chicken stock paste", amount: 70, unit: "g" },
      { name: "Limes", amount: 7, unit: "whole" },
      { name: "Peas", amount: 840, unit: "g" },
      { name: "Baby spinach", amount: 280, unit: "g" }
    ],
    steps: [
      { title: "Cook the rice", description: "Boil a half-full kettle. Add boiled water and 1/4 tsp salt to a large saucepan on high heat. Add the jasmine rice and cook for 12–13 minutes. Once cooked, drain, return to the pan, cover, and set aside." },
      { title: "Start the curry", description: "Heat a drizzle of oil in a large saucepan over medium-high heat. Add Thai green paste and Thai spice mix. Fry for 30 seconds. Stir in the coconut milk and chicken stock paste. Add the chicken. Bring to the boil, then reduce heat and simmer for 10–12 minutes until fully cooked." },
      { title: "Add greens and finish", description: "Once the curry thickens, stir in the peas. Add spinach in handfuls and cook for 1–2 minutes until wilted. Squeeze in lime juice to taste. Season with salt and pepper." },
      { title: "Serve", description: "Fluff the jasmine rice and divide into bowls. Spoon the curry over the rice. Cut remaining limes into wedges and serve for squeezing over." }
    ]
  },

  {
    id: 18,
    title: "Spiced Chicken Udon",
    section: "tea",
    basePortions: 14,
    cookTime: "30 mins",
    macrosPerPortion: { calories: 549, protein: 35, carbs: 58, fat: 16 },
    ingredients: [
      { name: "Bell peppers", amount: 8, unit: "whole" },
      { name: "Diced chicken breast", amount: 1680, unit: "g" },
      { name: "Garlic cloves", amount: 14, unit: "cloves" },
      { name: "Ketjap manis", amount: 350, unit: "g" },
      { name: "Soy sauce", amount: 70, unit: "ml" },
      { name: "Udon noodles", amount: 1540, unit: "g" },
      { name: "Coleslaw mix", amount: 840, unit: "g" },
      { name: "Indonesian style spice mix", amount: 7, unit: "sachets" },
      { name: "Salted peanuts", amount: 180, unit: "g" },
      { name: "Tomato ketchup", amount: 14, unit: "tbsp" },
      { name: "Water for sauce", amount: 350, unit: "ml" },
      { name: "Butter", amount: 140, unit: "g" }
    ],
    steps: [
      { title: "Fry the chicken", description: "Slice bell peppers into thin strips. Heat a drizzle of oil in a large frying pan over medium-high heat. Add the diced chicken and sliced pepper. Season with salt and pepper. Fry for 8–10 minutes until golden and cooked through." },
      { title: "Prep the sauce and noodles", description: "Peel and grate the garlic. Mix ketjap manis, soy sauce, tomato ketchup, and water in a small bowl. Place udon noodles in a heatproof bowl. Pour over boiling water, leave for 2–3 minutes then separate with a fork. Drain." },
      { title: "Add the veg and spices", description: "Add the coleslaw mix, garlic, and Indonesian style spice mix. Cook for 1–2 minutes, stirring, until fragrant." },
      { title: "Simmer the sauce", description: "Add the prepared sauce to the pan. Bring to the boil, then reduce to a simmer for 2–3 minutes until slightly thickened. Crush the peanuts using a rolling pin." },
      { title: "Finish and serve", description: "Add the drained udon noodles to the pan. Simmer for 1–2 minutes until piping hot. Stir in the butter until melted. Divide between bowls and sprinkle over the crushed peanuts." }
    ]
  },

  {
    id: 19,
    title: "Cajun Honey Butter Chicken & Creamy Potatoes",
    section: "tea",
    basePortions: 14,
    cookTime: "45 mins",
    macrosPerPortion: { calories: 579, protein: 50, carbs: 54, fat: 16 },
    ingredients: [
      { name: "Chicken breast", amount: 2800, unit: "g" },
      { name: "Salt", amount: 4.2, unit: "tsp" },
      { name: "Black pepper", amount: 4.2, unit: "tsp" },
      { name: "Garlic powder (chicken)", amount: 5.6, unit: "tsp" },
      { name: "Onion powder", amount: 5.6, unit: "tsp" },
      { name: "Paprika", amount: 7, unit: "tsp" },
      { name: "Oregano", amount: 5.6, unit: "tsp" },
      { name: "Chilli flakes", amount: 2.8, unit: "tsp" },
      { name: "Olive oil", amount: 8.4, unit: "tsp" },
      { name: "Butter", amount: 84, unit: "g" },
      { name: "Honey", amount: 84, unit: "g" },
      { name: "Fresh parsley", amount: null, unit: "to taste" },
      { name: "Potatoes (cubed)", amount: 3080, unit: "g" },
      { name: "Italian herbs", amount: 5.6, unit: "tsp" },
      { name: "Red onion", amount: 280, unit: "g" },
      { name: "Tomato paste", amount: 126, unit: "g" },
      { name: "Evaporated milk", amount: 700, unit: "ml" },
      { name: "Garlic & herb cream cheese", amount: 420, unit: "g" }
    ],
    steps: [
      { title: "Cook the chicken", description: "On medium heat add half the butter to the pan. Add chicken and cook until golden brown. Turn off heat completely and add the rest of the butter. Add spices and the honey. Mix then set aside." },
      { title: "Cook the potatoes", description: "Coat potatoes with olive oil. Add seasonings. Air fry until crispy." },
      { title: "Make the creamy potato sauce", description: "Add onions to a pan on medium heat and cook until soft. Add tomato paste and mix for 2 mins then lower heat. Add evaporated milk and cream cheese then stir until all combined." },
      { title: "Combine and serve", description: "Add crispy potatoes to the sauce mixture and fold until combined. Serve alongside the chicken and garnish with fresh parsley." }
    ]
  },

  {
    id: 29,
    title: "Chermoula Spiced Beef & Rice",
    section: "tea",
    basePortions: 14,
    cookTime: "30 mins",
    macrosPerPortion: { calories: 486, protein: 33, carbs: 70, fat: 8 },
    ingredients: [
      { name: "5% lean beef mince", amount: 1400, unit: "g" },
      { name: "Chicken stock pot", amount: 1, unit: "serving" },
      { name: "Fresh mint", amount: 1, unit: "bunch" },
      { name: "Tomato purée", amount: 14, unit: "tbsp" },
      { name: "Moroccan spice mix", amount: 1, unit: "serving" },
      { name: "Rose harissa", amount: 1, unit: "serving" },
      { name: "Jasmine rice", amount: 1, unit: "serving" },
      { name: "Fat free Greek yogurt", amount: 1, unit: "serving" },
      { name: "Garlic", amount: 14, unit: "cloves" }
    ],
    steps: [
      { title: "Cook the beef", description: "Heat a large frying pan over medium-high heat (no oil). Add the beef mince and cook until browned, 5–6 minutes. Drain any excess fat." },
      { title: "Cook the rice", description: "Cook jasmine rice in boiling salted water for 12–13 minutes. Drain and set aside." },
      { title: "Add spices and sauce", description: "To the browned beef, add garlic, harissa, moroccan spice mix, and tomato purée. Cook for 1 minute. Stir in chicken stock and water. Simmer until slightly thickened, 2–3 minutes." },
      { title: "Serve", description: "Mix rice into the beef. Divide among plates, top with Greek yogurt and fresh mint." }
    ]
  },

  {
    id: 30,
    title: "Asian Beef & Rice Bowl",
    section: "tea",
    basePortions: 14,
    cookTime: "25 mins",
    macrosPerPortion: { calories: 464, protein: 38, carbs: 51, fat: 11 },
    ingredients: [
      { name: "5% lean beef mince", amount: 1400, unit: "g" },
      { name: "Basmati rice", amount: 1, unit: "serving" },
      { name: "Broccoli florets", amount: 1, unit: "serving" },
      { name: "Petit pois", amount: 1, unit: "serving" },
      { name: "Sweet soy sauce", amount: 1, unit: "serving" },
      { name: "Toasted sesame oil", amount: 1, unit: "serving" },
      { name: "Honey", amount: 1, unit: "serving" },
      { name: "White onion", amount: 1, unit: "whole" }
    ],
    steps: [
      { title: "Cook the rice", description: "Cook basmati rice in boiling salted water for 10–12 minutes. Drain and set aside." },
      { title: "Fry the beef", description: "Heat a pan over medium-high heat. Add beef mince and onion, fry until browned, 5–6 minutes. Drain excess fat." },
      { title: "Add sauce and veg", description: "Add sweet soy sauce, sesame oil, and honey. Stir in broccoli and petit pois. Cook for 3–4 minutes until veg is tender." },
      { title: "Serve", description: "Divide rice between bowls and top with the beef mixture." }
    ]
  },

  {
    id: 31,
    title: "Beef & Tomato Pasta",
    section: "tea",
    basePortions: 14,
    cookTime: "35 mins",
    macrosPerPortion: { calories: 604, protein: 43, carbs: 82, fat: 13 },
    ingredients: [
      { name: "5% lean beef mince", amount: 1400, unit: "g" },
      { name: "Onion", amount: 1, unit: "large" },
      { name: "Carrots", amount: 1, unit: "serving" },
      { name: "Red wine", amount: 100, unit: "ml" },
      { name: "Passata", amount: 1, unit: "serving" },
      { name: "Sundried tomato paste", amount: 1, unit: "serving" },
      { name: "Wholewheat fusilli", amount: 1, unit: "serving" }
    ],
    steps: [
      { title: "Cook the pasta", description: "Cook pasta in well-salted boiling water. Reserve some pasta water before draining." },
      { title: "Fry the beef", description: "Heat a large frying pan on medium-high heat (no oil). Add the beef mince and fry until browned, 5–6 minutes. Drain any excess fat. Add onions and carrots and cook through." },
      { title: "Make the sauce", description: "Add red wine and cook for 1 minute. Stir in passata and sundried tomato paste. Simmer for 10 minutes until thickened." },
      { title: "Combine and serve", description: "Add pasta to the sauce with a splash of pasta water. Stir through and serve." }
    ]
  },

  {
    id: 32,
    title: "KBBQ Chicken Noodles",
    section: "tea",
    basePortions: 14,
    cookTime: "25 mins",
    macrosPerPortion: { calories: 717, protein: 97, carbs: 64, fat: 7 },
    ingredients: [
      { name: "Red bell peppers", amount: 2, unit: "whole" },
      { name: "Carrots", amount: 1, unit: "serving" },
      { name: "Chicken breast", amount: 1, unit: "portion" },
      { name: "KBBQ sauce", amount: 1, unit: "portion" },
      { name: "Bean sprouts", amount: 1, unit: "serving" },
      { name: "Garlic", amount: 14, unit: "cloves" },
      { name: "Fine noodles (wok ready)", amount: 1, unit: "portion" },
      { name: "Dark soy sauce", amount: 1, unit: "serving" },
      { name: "Lime juice", amount: 1, unit: "serving" },
      { name: "Sweet soy sauce", amount: 1, unit: "serving" }
    ],
    steps: [
      { title: "Fry the chicken", description: "Slice peppers and carrots into thin strips. Cook chicken in a hot pan until golden and cooked through. Add peppers and carrots and cook for 2–3 minutes." },
      { title: "Add sauce", description: "Add garlic, KBBQ sauce, dark soy sauce, sweet soy sauce, and lime juice. Stir to combine." },
      { title: "Add noodles", description: "Add wok-ready noodles and bean sprouts. Toss everything together over high heat for 2–3 minutes until piping hot." }
    ]
  },

  {
    id: 33,
    title: "Chicken & Bacon Pasta Salad",
    section: "tea",
    basePortions: 14,
    cookTime: "25 mins",
    macrosPerPortion: { calories: 552, protein: 62, carbs: 50, fat: 13 },
    ingredients: [
      { name: "Smoked bacon lardons", amount: 1, unit: "serving" },
      { name: "Chicken breast", amount: 1, unit: "portion" },
      { name: "Garlic & herb croutons", amount: 1, unit: "serving" },
      { name: "High protein fusilli", amount: 1, unit: "portion" },
      { name: "Gherkins", amount: 1, unit: "serving" },
      { name: "Sweetcorn", amount: 3, unit: "tbsp" },
      { name: "Cucumber", amount: 1, unit: "large" },
      { name: "Salad tomatoes", amount: 1, unit: "serving" },
      { name: "Greek yoghurt", amount: 1, unit: "serving" },
      { name: "Grated Parmesan", amount: 1, unit: "portion" },
      { name: "Lemon juice", amount: 1, unit: "serving" },
      { name: "Garlic", amount: 1, unit: "clove" },
      { name: "Worcester sauce", amount: 1, unit: "serving" },
      { name: "Fish sauce", amount: 1, unit: "serving" },
      { name: "Dijon mustard", amount: 1, unit: "serving" }
    ],
    steps: [
      { title: "Cook the pasta", description: "Cook high protein fusilli in boiling salted water. Drain and leave to cool." },
      { title: "Cook the chicken and bacon", description: "Cook chicken breast until cooked through. Slice or shred. Fry bacon lardons until crispy." },
      { title: "Make the dressing", description: "Mix Greek yoghurt, lemon juice, garlic, Worcester sauce, fish sauce, and dijon mustard until smooth." },
      { title: "Combine", description: "Toss pasta, chicken, bacon, gherkins, sweetcorn, cucumber, and tomatoes together. Pour over dressing and mix well. Top with croutons and Parmesan." }
    ]
  },

  {
    id: 34,
    title: "Beef & Sweet Potato Bowl (BBQ)",
    section: "tea",
    basePortions: 7,
    cookTime: "35 mins",
    macrosPerPortion: { calories: 655, protein: 62, carbs: 77, fat: 13 },
    ingredients: [
      { name: "Sweet potato", amount: 7, unit: "large" },
      { name: "5% lean beef mince", amount: 1, unit: "serving" },
      { name: "Greek yogurt", amount: 1, unit: "portion" },
      { name: "Broccoli florets", amount: 1, unit: "serving" },
      { name: "Red bell pepper", amount: 7, unit: "whole" },
      { name: "Petit pois", amount: 1, unit: "serving" },
      { name: "Eatlean cheese", amount: 1, unit: "portion" },
      { name: "Garlic purée", amount: 1, unit: "serving" },
      { name: "Sweet BBQ sauce", amount: 1, unit: "serving" }
    ],
    steps: [
      { title: "Cook the sweet potato", description: "Bake or microwave sweet potatoes until soft." },
      { title: "Cook the beef", description: "Heat a pan over medium-high heat. Fry beef mince with garlic purée until browned. Drain excess fat. Add BBQ sauce and stir through." },
      { title: "Cook the veg", description: "Steam or microwave broccoli, petit pois, and sliced peppers until tender." },
      { title: "Assemble", description: "Slice open each sweet potato and fill with beef. Add veg on the side. Top with Greek yogurt and Eatlean cheese." }
    ]
  },

  {
    id: 35,
    title: "Beef & Sweet Potato Bowl (Hot Honey)",
    section: "tea",
    basePortions: 7,
    cookTime: "35 mins",
    macrosPerPortion: { calories: 626, protein: 62, carbs: 70, fat: 13 },
    ingredients: [
      { name: "Sweet potato", amount: 7, unit: "large" },
      { name: "5% lean beef mince", amount: 1, unit: "serving" },
      { name: "Greek yogurt", amount: 1, unit: "portion" },
      { name: "Broccoli florets", amount: 1, unit: "serving" },
      { name: "Red bell pepper", amount: 7, unit: "whole" },
      { name: "Petit pois", amount: 1, unit: "serving" },
      { name: "Eatlean cheese", amount: 1, unit: "portion" },
      { name: "Garlic purée", amount: 1, unit: "serving" },
      { name: "Hot honey chilli sauce", amount: 1, unit: "serving" }
    ],
    steps: [
      { title: "Cook the sweet potato", description: "Bake or microwave sweet potatoes until soft." },
      { title: "Cook the beef", description: "Heat a pan over medium-high heat. Fry beef mince with garlic purée until browned. Drain excess fat. Add hot honey chilli sauce and stir through." },
      { title: "Cook the veg", description: "Steam or microwave broccoli, petit pois, and sliced peppers until tender." },
      { title: "Assemble", description: "Slice open each sweet potato and fill with beef. Add veg on the side. Top with Greek yogurt and Eatlean cheese." }
    ]
  },

  {
    id: 36,
    title: "Chicken Tikka Curry",
    section: "tea",
    basePortions: 14,
    cookTime: "35 mins",
    macrosPerPortion: { calories: 620, protein: 54, carbs: 64, fat: 16 },
    ingredients: [
      { name: "Chicken breast", amount: 1, unit: "portion" },
      { name: "Baby spinach", amount: 1, unit: "serving" },
      { name: "Tikka masala spice paste", amount: 1, unit: "serving" },
      { name: "Mango chutney", amount: 1, unit: "serving" },
      { name: "Onion", amount: 1, unit: "large" },
      { name: "Greek yoghurt", amount: 1, unit: "serving" },
      { name: "Basmati rice", amount: 1, unit: "serving" },
      { name: "Chickpeas", amount: 1, unit: "can" }
    ],
    steps: [
      { title: "Cook the rice", description: "Cook basmati rice in boiling salted water for 10–12 minutes. Drain and set aside." },
      { title: "Cook the curry", description: "Fry onion in a pan until softened. Add tikka masala paste and cook for 1 minute. Add chicken and cook through. Stir in chickpeas, mango chutney, and Greek yoghurt." },
      { title: "Add spinach", description: "Stir in baby spinach and cook for 1–2 minutes until wilted." },
      { title: "Serve", description: "Divide rice between bowls and spoon curry on top." }
    ]
  },

  {
    id: 37,
    title: "Cheeseburger Bowl",
    section: "tea",
    basePortions: 12,
    cookTime: "30 mins",
    macrosPerPortion: { calories: 537, protein: 50, carbs: 50, fat: 17 },
    ingredients: [
      { name: "Red onion", amount: 1, unit: "serving" },
      { name: "Baby plum tomatoes", amount: 1, unit: "serving" },
      { name: "Little gem lettuce", amount: 1, unit: "serving" },
      { name: "5% lean beef mince", amount: 1, unit: "portion" },
      { name: "Potatoes", amount: 1, unit: "serving" },
      { name: "Gherkins", amount: 1, unit: "serving" },
      { name: "Tomato ketchup", amount: 1, unit: "serving" },
      { name: "Light mayo", amount: 1, unit: "serving" },
      { name: "Yellow mustard", amount: 1, unit: "serving" },
      { name: "Eatlean cheese", amount: 1, unit: "portion" }
    ],
    steps: [
      { title: "Cook the potatoes", description: "Chop potatoes into chunks. Roast or air fry until golden and crispy." },
      { title: "Cook the beef", description: "Form beef mince into small patties or crumble fry in a hot pan until cooked through." },
      { title: "Make the sauce", description: "Mix ketchup, light mayo, and yellow mustard together." },
      { title: "Assemble", description: "Divide potatoes between bowls. Top with beef, lettuce, tomatoes, gherkins, and onion. Drizzle sauce over and finish with Eatlean cheese." }
    ]
  },

  {
    id: 38,
    title: "Philly Cheese Steak Rice Bowl",
    section: "tea",
    basePortions: 12,
    cookTime: "35 mins",
    macrosPerPortion: { calories: 576, protein: 57, carbs: 53, fat: 16 },
    ingredients: [
      { name: "Lean braising steak", amount: 1, unit: "serving" },
      { name: "Basmati rice", amount: 1, unit: "serving" },
      { name: "Cheddar cheese sauce mix", amount: 1, unit: "serving" },
      { name: "Soft cheese (50% reduced fat)", amount: 1, unit: "serving" },
      { name: "Low fat cottage cheese", amount: 1, unit: "serving" },
      { name: "Mozzarella", amount: 1, unit: "serving" },
      { name: "Onion", amount: 1, unit: "large" },
      { name: "Red bell peppers", amount: 1, unit: "large" },
      { name: "Bone broth", amount: 1, unit: "serving" },
      { name: "Worcester sauce", amount: 1, unit: "serving" },
      { name: "Light soy sauce", amount: 1, unit: "tsp" }
    ],
    steps: [
      { title: "Cook the rice", description: "Cook basmati rice in boiling salted water for 10–12 minutes. Drain and set aside." },
      { title: "Cook the steak", description: "Slice braising steak thinly. Cook in a hot pan with Worcester sauce and soy sauce until browned." },
      { title: "Cook the veg", description: "In the same pan, cook sliced onion and peppers until softened." },
      { title: "Make the cheese sauce", description: "Mix cheddar cheese sauce mix, soft cheese, cottage cheese, mozzarella, and bone broth in a pan over low heat until smooth." },
      { title: "Assemble", description: "Divide rice between bowls. Top with steak, veg, and cheese sauce." }
    ]
  },

  {
    id: 39,
    title: "Sweet Potato Chicken & Bean Bowl",
    section: "tea",
    basePortions: 12,
    cookTime: "35 mins",
    macrosPerPortion: { calories: 592, protein: 69, carbs: 66, fat: 5 },
    ingredients: [
      { name: "Sweet potato", amount: 1, unit: "large" },
      { name: "Mixed beans", amount: 1, unit: "can" },
      { name: "BBQ sauce", amount: 1, unit: "tbsp" },
      { name: "Shallots", amount: 1, unit: "serving" },
      { name: "Cherry tomatoes", amount: 1, unit: "cup" },
      { name: "Chicken breast", amount: 1, unit: "portion" },
      { name: "Eatlean cheese", amount: 1, unit: "portion" },
      { name: "Spring onions", amount: 1, unit: "serving" }
    ],
    steps: [
      { title: "Cook the sweet potato", description: "Bake or microwave sweet potatoes until soft." },
      { title: "Cook the chicken", description: "Season and cook chicken breast in a pan until cooked through. Slice." },
      { title: "Heat the beans", description: "Heat mixed beans in a pan with BBQ sauce, shallots, and cherry tomatoes." },
      { title: "Assemble", description: "Slice open sweet potatoes and fill with chicken and bean mixture. Top with Eatlean cheese and spring onions." }
    ]
  },

  {
    id: 40,
    title: "Chicken Fried Rice",
    section: "tea",
    basePortions: 12,
    cookTime: "25 mins",
    macrosPerPortion: { calories: 547, protein: 64, carbs: 43, fat: 13 },
    ingredients: [
      { name: "Chicken breast", amount: 1, unit: "portion" },
      { name: "Basmati rice", amount: 1, unit: "serving" },
      { name: "Light soy sauce", amount: 1, unit: "tsp" },
      { name: "Onion", amount: 1, unit: "large" },
      { name: "Curry sauce mix", amount: 1, unit: "serving" },
      { name: "Eggs", amount: 1, unit: "portion" },
      { name: "Garlic", amount: 1, unit: "serving" },
      { name: "Fresh ginger", amount: 1, unit: "tsp" }
    ],
    steps: [
      { title: "Cook the rice", description: "Cook basmati rice in boiling salted water. Drain and leave to cool completely." },
      { title: "Cook the chicken", description: "Dice chicken breast and fry in a hot pan until golden and cooked through." },
      { title: "Fry the rice", description: "Push chicken to the side. Add onion, garlic, and ginger and fry for 1 minute. Add cold rice and fry over high heat for 3–4 minutes. Add curry sauce mix and soy sauce." },
      { title: "Add eggs", description: "Push rice to the side, scramble the eggs in the pan, then fold through the rice." }
    ]
  },

  {
    id: 41,
    title: "Chicken Noodle Soup",
    section: "tea",
    basePortions: 12,
    cookTime: "30 mins",
    macrosPerPortion: { calories: 494, protein: 63, carbs: 51, fat: 5 },
    ingredients: [
      { name: "Chicken breast", amount: 1, unit: "portion" },
      { name: "Chicken stock", amount: 1, unit: "serving" },
      { name: "Chicken bone broth", amount: 1, unit: "serving" },
      { name: "Fine egg noodles", amount: 1, unit: "serving" },
      { name: "Spring greens", amount: 1, unit: "serving" },
      { name: "Carrots", amount: 1, unit: "serving" },
      { name: "Spring onions", amount: 1, unit: "serving" },
      { name: "Bean sprouts", amount: 1, unit: "portion" },
      { name: "Light soy sauce", amount: 1, unit: "serving" },
      { name: "Lime juice", amount: 5, unit: "ml" }
    ],
    steps: [
      { title: "Make the broth", description: "Bring chicken stock and bone broth to a boil in a large pot. Add soy sauce and lime juice." },
      { title: "Cook the chicken", description: "Add chicken breast to the broth and simmer for 12–15 minutes until cooked through. Remove and shred." },
      { title: "Add veg and noodles", description: "Add carrots, spring greens, and noodles to the broth. Cook for 3–4 minutes." },
      { title: "Finish and serve", description: "Return shredded chicken to the pot. Add bean sprouts and spring onions. Serve immediately." }
    ]
  },

  {
    id: 42,
    title: "Chicken Japanese Curry",
    section: "tea",
    basePortions: 12,
    cookTime: "40 mins",
    macrosPerPortion: { calories: 623, protein: 59, carbs: 75, fat: 10 },
    ingredients: [
      { name: "Chicken breast", amount: 1, unit: "portion" },
      { name: "Carrots", amount: 1, unit: "serving" },
      { name: "Baking potatoes", amount: 1, unit: "serving" },
      { name: "Golden curry sauce mix", amount: 1, unit: "serving" },
      { name: "Basmati rice", amount: 1, unit: "serving" },
      { name: "Onion", amount: 1, unit: "large" }
    ],
    steps: [
      { title: "Cook the rice", description: "Cook basmati rice in boiling salted water for 10–12 minutes. Drain and set aside." },
      { title: "Prep the veg", description: "Chop potatoes, carrots, and onion into chunks." },
      { title: "Cook the curry", description: "Fry onion in a pan until softened. Add chicken, potatoes, and carrots. Pour in water and bring to a boil. Simmer for 15 minutes until potatoes are tender." },
      { title: "Add the curry sauce", description: "Break golden curry sauce mix into the pot and stir until dissolved. Simmer for 5 more minutes until thickened." },
      { title: "Serve", description: "Divide rice between bowls and ladle curry on top." }
    ]
  },

  {
    id: 43,
    title: "Chicken Broccoli Soup",
    section: "tea",
    basePortions: 12,
    cookTime: "30 mins",
    macrosPerPortion: { calories: 432, protein: 69, carbs: 21, fat: 11 },
    ingredients: [
      { name: "Smoked bacon lardons", amount: 1, unit: "serving" },
      { name: "White onion", amount: 1, unit: "pack" },
      { name: "Broccoli florets", amount: 1, unit: "serving" },
      { name: "Carrots", amount: 1, unit: "serving" },
      { name: "Chicken stock pot", amount: 1, unit: "serving" },
      { name: "Reduced fat evaporated milk", amount: 1, unit: "serving" },
      { name: "Plain flour", amount: 1, unit: "serving" },
      { name: "Eatlean cheese", amount: 1, unit: "portion" },
      { name: "Chicken breast", amount: 1, unit: "portion" },
      { name: "Garlic", amount: 1, unit: "tsp" }
    ],
    steps: [
      { title: "Cook the base", description: "Fry bacon lardons in a large pot until crispy. Add onion, carrots, and garlic and cook until softened." },
      { title: "Add the chicken", description: "Add diced chicken breast and cook until browned." },
      { title: "Make the soup", description: "Stir in flour and cook for 1 minute. Add chicken stock and evaporated milk. Bring to a boil." },
      { title: "Add broccoli", description: "Add broccoli florets and simmer for 8–10 minutes until tender." },
      { title: "Finish and serve", description: "Stir in Eatlean cheese until melted. Season to taste and serve." }
    ]
  },

  {
    id: 44,
    title: "Honey Garlic Chicken Macaroni",
    section: "tea",
    basePortions: 14,
    cookTime: "35 mins",
    macrosPerPortion: { calories: 637, protein: 72, carbs: 47, fat: 15 },
    ingredients: [
      { name: "Chicken breast", amount: 1, unit: "serving" },
      { name: "Semi skimmed milk", amount: 1, unit: "serving" },
      { name: "Mature cheddar (lighter)", amount: 1, unit: "serving" },
      { name: "Garlic", amount: 1, unit: "serving" },
      { name: "Soft cheese (50% reduced fat)", amount: 1, unit: "serving" },
      { name: "Honey", amount: 1, unit: "serving" },
      { name: "Elbow macaroni", amount: 1, unit: "cup" }
    ],
    steps: [
      { title: "Cook the pasta", description: "Cook elbow macaroni in boiling salted water. Drain and set aside." },
      { title: "Cook the chicken", description: "Season chicken breast and cook in a pan until golden and cooked through. Slice." },
      { title: "Make the honey garlic sauce", description: "In the same pan, add garlic and cook for 30 seconds. Add honey and stir. Add soft cheese and milk and stir until smooth." },
      { title: "Combine", description: "Add pasta and cheddar to the sauce. Stir until the cheese melts and the sauce coats the pasta. Top with sliced chicken." }
    ]
  },

  {
    id: 45,
    title: "Mexican Chicken, Beans & Rice",
    section: "tea",
    basePortions: 14,
    cookTime: "35 mins",
    macrosPerPortion: { calories: 543, protein: 56, carbs: 63, fat: 5 },
    ingredients: [
      { name: "Chicken breast", amount: 1, unit: "serving" },
      { name: "Sweet peppers", amount: 1, unit: "portion" },
      { name: "Mixed beans", amount: 1, unit: "can" },
      { name: "Onion", amount: 1, unit: "large" },
      { name: "Chicken stock pot", amount: 1, unit: "serving" },
      { name: "Tomato purée", amount: 1, unit: "serving" },
      { name: "Passata", amount: 1, unit: "serving" },
      { name: "Chipotle paste", amount: 1, unit: "serving" },
      { name: "Honey", amount: 1, unit: "serving" },
      { name: "Basmati rice", amount: 1, unit: "serving" },
      { name: "Fat free Greek yogurt", amount: 1, unit: "serving" }
    ],
    steps: [
      { title: "Cook the rice", description: "Cook basmati rice in boiling salted water for 10–12 minutes. Drain and set aside." },
      { title: "Cook the chicken and veg", description: "Fry onion and peppers in a pan until softened. Add diced chicken and cook until browned." },
      { title: "Make the sauce", description: "Add tomato purée, chipotle paste, passata, chicken stock, and honey. Stir in mixed beans. Simmer for 10 minutes until thickened." },
      { title: "Serve", description: "Mix rice through the sauce or serve alongside. Top with Greek yogurt." }
    ]
  },

  {
    id: 46,
    title: "Creamy Cajun Steak Pasta",
    section: "tea",
    basePortions: 10,
    cookTime: "30 mins",
    macrosPerPortion: { calories: 487, protein: 54, carbs: 25, fat: 19 },
    ingredients: [
      { name: "Diced beef", amount: 1, unit: "serving" },
      { name: "Fusilli pasta", amount: 1, unit: "serving" },
      { name: "Low fat cottage cheese", amount: 1, unit: "portion" },
      { name: "Passata", amount: 1, unit: "serving" },
      { name: "Semi skimmed milk", amount: 1, unit: "serving" },
      { name: "Cajun seasoning", amount: 1, unit: "serving" },
      { name: "Garlic", amount: 1, unit: "serving" }
    ],
    steps: [
      { title: "Cook the pasta", description: "Cook fusilli in boiling salted water. Reserve some pasta water before draining." },
      { title: "Cook the beef", description: "Season diced beef with cajun seasoning. Fry in a hot pan until browned and cooked through." },
      { title: "Make the sauce", description: "In a blender, blitz cottage cheese, passata, and milk until smooth. Add garlic and pour into the pan." },
      { title: "Combine", description: "Add pasta and a splash of pasta water. Stir through until the sauce coats everything." }
    ]
  },

  {
    id: 47,
    title: "Sweet Chilli Chicken & Rice",
    section: "tea",
    basePortions: 14,
    cookTime: "25 mins",
    macrosPerPortion: { calories: 507, protein: 48, carbs: 63, fat: 6 },
    ingredients: [
      { name: "Coleslaw mix", amount: 1, unit: "serving" },
      { name: "Rice vinegar", amount: 1, unit: "serving" },
      { name: "Sweet chilli sauce", amount: 1, unit: "serving" },
      { name: "Chicken breast", amount: 1, unit: "serving" },
      { name: "Ketjap manis", amount: 15, unit: "ml" },
      { name: "Basmati rice", amount: 1, unit: "serving" }
    ],
    steps: [
      { title: "Cook the rice", description: "Cook basmati rice in boiling salted water for 10–12 minutes. Drain and set aside." },
      { title: "Cook the chicken", description: "Dice chicken and fry in a hot pan until golden and cooked through." },
      { title: "Add the sauce", description: "Add sweet chilli sauce, ketjap manis, and rice vinegar to the pan. Stir through the chicken." },
      { title: "Combine and serve", description: "Mix in coleslaw and serve over rice." }
    ]
  },

  {
    id: 48,
    title: "Chicken & White Sauce Pasta",
    section: "tea",
    basePortions: 14,
    cookTime: "30 mins",
    macrosPerPortion: { calories: 558, protein: 75, carbs: 39, fat: 12 },
    ingredients: [
      { name: "Grana Padano cheese", amount: 1, unit: "serving" },
      { name: "Low fat cottage cheese", amount: 1, unit: "serving" },
      { name: "Baby spinach", amount: 1, unit: "serving" },
      { name: "Chicken breast", amount: 1, unit: "portion" },
      { name: "Wholewheat fusilli", amount: 1, unit: "serving" },
      { name: "Broccoli florets", amount: 1, unit: "serving" },
      { name: "Garlic", amount: 1, unit: "tsp" },
      { name: "Petit pois", amount: 1, unit: "serving" }
    ],
    steps: [
      { title: "Cook the pasta", description: "Cook wholewheat fusilli in boiling salted water. Reserve some pasta water before draining." },
      { title: "Cook the chicken", description: "Dice chicken breast and fry in a pan until cooked through." },
      { title: "Make the white sauce", description: "Blend cottage cheese with a splash of pasta water until smooth. Add to the pan with garlic and Grana Padano. Stir over low heat until creamy." },
      { title: "Add veg and combine", description: "Add broccoli, petit pois, and spinach. Cook for 2–3 minutes. Add pasta and toss to coat." }
    ]
  },

  {
    id: 49,
    title: "Chicken Mince & Sweet Potato",
    section: "tea",
    basePortions: 7,
    cookTime: "30 mins",
    macrosPerPortion: { calories: 505, protein: 47, carbs: 60, fat: 9 },
    ingredients: [
      { name: "Sweet potato", amount: 7, unit: "large" },
      { name: "Broccoli florets", amount: 1, unit: "serving" },
      { name: "Chicken mince", amount: 1, unit: "portion" },
      { name: "Low fat Greek yogurt", amount: 1, unit: "serving" },
      { name: "Lemon juice", amount: 1, unit: "serving" },
      { name: "Garlic", amount: 1, unit: "clove" },
      { name: "BBQ sauce", amount: 1, unit: "serving" },
      { name: "Sweetcorn", amount: 1, unit: "portion" }
    ],
    steps: [
      { title: "Cook the sweet potato", description: "Bake or microwave sweet potatoes until soft." },
      { title: "Cook the chicken mince", description: "Fry chicken mince with garlic in a pan over medium-high heat until cooked through. Add BBQ sauce and lemon juice. Stir through." },
      { title: "Cook the veg", description: "Steam or microwave broccoli and sweetcorn until tender." },
      { title: "Assemble", description: "Slice open each sweet potato. Fill with chicken mince mixture. Add veg on the side and top with Greek yogurt." }
    ]
  },

  {
    id: 50,
    title: "Beef & Sweet Potato Bowl",
    section: "tea",
    basePortions: 12,
    cookTime: "35 mins",
    macrosPerPortion: { calories: 478, protein: 53, carbs: 43, fat: 12 },
    ingredients: [
      { name: "Sweet potato", amount: 1, unit: "large" },
      { name: "Fat free Greek yogurt", amount: 1, unit: "serving" },
      { name: "Onion", amount: 1, unit: "large" },
      { name: "Red bell pepper", amount: 1, unit: "large" },
      { name: "5% lean beef mince", amount: 1, unit: "serving" },
      { name: "Eatlean cheese", amount: 1, unit: "portion" },
      { name: "Garlic", amount: 1, unit: "clove" },
      { name: "Tomato paste", amount: 1, unit: "serving" },
      { name: "Garden peas", amount: 1, unit: "serving" }
    ],
    steps: [
      { title: "Cook the sweet potato", description: "Bake or microwave sweet potatoes until soft." },
      { title: "Cook the beef", description: "Fry beef mince with onion, garlic, and peppers until browned. Add tomato paste and stir through." },
      { title: "Add peas", description: "Stir in garden peas and cook for 2–3 minutes." },
      { title: "Assemble", description: "Slice open sweet potatoes and fill with beef mixture. Top with Greek yogurt and Eatlean cheese." }
    ]
  },

  {
    id: 51,
    title: "Homemade Pizza",
    section: "tea",
    basePortions: 2,
    cookTime: "30 mins",
    macrosPerPortion: { calories: 653, protein: 48, carbs: 92, fat: 14 },
    ingredients: [
      { name: "Fat free Greek yogurt", amount: 1, unit: "serving" },
      { name: "Plain flour", amount: 1, unit: "serving" },
      { name: "50% lighter mature cheese", amount: 1, unit: "portion" },
      { name: "Pepperoni", amount: 1, unit: "serving" },
      { name: "Chicken breast pieces", amount: 1, unit: "portion" },
      { name: "Tomato purée", amount: 1, unit: "serving" }
    ],
    steps: [
      { title: "Make the dough", description: "Mix Greek yogurt and self raising flour together until a dough forms. Knead briefly." },
      { title: "Shape and top", description: "Roll out the dough into a pizza base. Spread tomato purée on top. Add chicken, pepperoni, and cheese." },
      { title: "Bake", description: "Bake at 200°C for 10–12 minutes until the base is cooked and the cheese is melted and golden." }
    ]
  }

];

function scaleAmount(ingredient, portions) {
  if (ingredient.amount === null) return ingredient.unit;
  const scaled = ingredient.amount * (portions / (ingredient.basePortions || 1));
  const rounded = scaled >= 100 ? Math.round(scaled) : scaled >= 10 ? Math.round(scaled * 10) / 10 : Math.round(scaled * 100) / 100;
  return rounded + ' ' + ingredient.unit;
}

const sections = ["all", ...new Set(recipes.map(r => r.section))];