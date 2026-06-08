// amounts are for basePortions (14). The site scales by (selectedPortions / basePortions).
// amount: null means "to taste" or unscalable.

const recipes = [

  // ─── DINNER ───────────────────────────────────────────────────────────────

  {
    id: 1,
    title: "Butter Chicken Burritos",
    section: "dinner",
    basePortions: 14,
    cookTime: "60 mins",
    macrosPerPortion: { calories: 381, protein: 28, carbs: 43, fat: 9 },
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
      { title: "Prepare the patties", description: "Form equal-weight patties. Season with a blend of salt, pepper, smoked paprika, onion powder, garlic powder, and cumin. Preheat grill to medium-high for ~10 minutes. Cook patties for 2.5–3 minutes each side with grill closed. Use a meat thermometer to ensure proper cooking. Top each patty with a slice of cheese." },
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
    macrosPerPortion: { calories: 287, protein: 25, carbs: 35, fat: 3 },
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
    title: "Pizza Burritos",
    section: "dinner",
    basePortions: 14,
    cookTime: "30 mins",
    macrosPerPortion: { calories: 477, protein: 33, carbs: 26, fat: 25 },
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
      { title: "Assemble the burritos", description: "Lay out tortilla wraps. Spoon the beef and pepperoni mixture onto the centre of each tortilla. Fold the sides over the filling and roll up tightly." }
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
      { title: "Assemble the wraps", description: "Lay a whole wheat tortilla flat. Add tomato slices, cucumber sticks, a bit of onion, and chopped lettuce. Spoon the chicken salad onto the wrap. Fold and roll tightly. Repeat for the remaining wraps." }
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
      { title: "Simmer the chilli", description: "Reduce heat to medium and simmer for 8–10 minutes until thickened. Stir occasionally. Season with salt and pepper. Add a splash of water if needed." },
      { title: "Serve", description: "Fluff the rice and portion into bowls. Spoon chilli on top and garnish with grated cheese and sour cream." }
    ]
  },

  {
    id: 8,
    title: "Beef Stew",
    section: "tea",
    basePortions: 14,
    cookTime: "4 hrs",
    macrosPerPortion: { calories: 418, protein: 38, carbs: 15, fat: 23 },
    ingredients: [
      { name: "Beef (brisket or shin, chunks)", amount: 2500, unit: "g" },
      { name: "Celery sticks", amount: 6, unit: "whole" },
      { name: "Large onions", amount: 3, unit: "whole" },
      { name: "Large carrots", amount: 7, unit: "whole" },
      { name: "Bay leaves", amount: 15, unit: "whole" },
      { name: "Thyme sprigs", amount: 6, unit: "whole" },
      { name: "Vegetable oil", amount: 60, unit: "ml" },
      { name: "Butter", amount: 60, unit: "g" },
      { name: "Plain flour", amount: 60, unit: "g" },
      { name: "Tomato purée", amount: 100, unit: "g" },
      { name: "Worcestershire sauce", amount: 90, unit: "ml" },
      { name: "Beef stock cubes", amount: 6, unit: "whole" },
      { name: "Other stew veg (swede, parsnip etc)", amount: null, unit: "to taste" }
    ],
    steps: [
      { title: "Prepare the ingredients", description: "Mince/dice celery as fine as you can. Chop the onions. Halve carrots lengthways, then slice into chunks. Cut any other veg into chunks." },
      { title: "Cook the base", description: "In a large pot, heat oil and butter. Add the celery, onions, carrots, other veg, bay leaves, and 3 whole thyme sprigs. Cook for 10 minutes until softened. Put lid on pan and let sweat for 30 mins." },
      { title: "Build the stew", description: "Stir in plain flour until fully combined. Add tomato purée, Worcestershire sauce, and crumbled beef stock cubes." },
      { title: "Add the beef and simmer", description: "Gradually stir in 2.5L hot water. Add the stewing beef. Bring to a gentle simmer." },
      { title: "Bake the stew", description: "Cover and bake for 3 hours on medium heat — you want a light simmer. Uncover and bake for another 30 minutes to 1 hour until the beef is tender and the sauce has thickened." },
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
      { title: "Tenderise the chicken", description: "Slice the chicken breast into 1/4\" thick slices. Dust both sides with baking soda (1 tsp per side). Let sit for 15 minutes. Rinse off the baking soda thoroughly with water, then pat dry. Season with salt and pepper." },
      { title: "Prepare the sauce", description: "Mix chicken broth and cornstarch in a small bowl. Add remaining sauce ingredients and mix well." },
      { title: "Cook the chicken", description: "Heat oil in a large skillet over medium-high heat. Add chicken in a single layer and cook for 2–3 minutes until golden. Flip and cook for ~90 seconds more until fully cooked." },
      { title: "Add vegetables", description: "Reduce heat to medium. Push chicken to the sides of the pan. Add broccoli to the centre and cook for 1 minute. Add water chestnuts and cook for 1 more minute." },
      { title: "Add sauce and finish", description: "Lower the heat and pour in the sauce. Cook until the sauce reduces and coats everything evenly. Remove from heat, stir in chopped green onion, and serve immediately over white rice." }
    ]
  },

  {
    id: 10,
    title: "Teriyaki Sesame Chicken",
    section: "tea",
    basePortions: 14,
    cookTime: "30 mins",
    macrosPerPortion: { calories: 524, protein: 35, carbs: 85, fat: 2 },
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
      { title: "Add the sauce", description: "Stir in teriyaki sauce and a splash of water. Lower the heat and simmer until the sauce is sticky, the beans are tender, and the chicken is cooked through, 3–4 minutes." },
      { title: "Finish and serve", description: "Taste and adjust seasoning. Stir in sesame seeds. Fluff up the rice and plate with teriyaki chicken on top. Sprinkle with sliced chilli to taste." }
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
      { name: "Beef or lamb mince", amount: 1400, unit: "g" },
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
      { title: "Cook the beef", description: "Heat a large frying pan over medium-high heat (no oil). Add the mince and cook until browned, 5–6 minutes, breaking it up as it cooks. Drain any excess fat." },
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
    basePortions: 14,
    cookTime: "30 mins",
    macrosPerPortion: { calories: 520, protein: 35, carbs: 77, fat: 7 },
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
      { title: "Cook the rice", description: "Boil a full kettle. Rinse the rice under cold water until the water runs clear. Pour boiled water into a large saucepan with 1/4 tsp salt on high heat. Add the rice and cook for 10–12 mins. Once cooked, drain and pop back in the pan. Cover with a lid and leave to the side." },
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
    macrosPerPortion: { calories: 535, protein: 39, carbs: 62, fat: 12 },
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
      { title: "Simmer the chicken", description: "Heat a large saucepan with a tight-fitting lid over medium-high heat. Add the chicken along with the juices from the packet. Simmer on low with the lid on until tender enough to shred with a fork, 10–15 mins. Ensure the chicken is piping hot throughout." },
      { title: "Prep time", description: "Trim the baby gem lettuce, halve it lengthways, then thinly slice. Cut the tomatoes into 1cm chunks. Grate the cheese." },
      { title: "Mix your dressing", description: "Combine red wine vinegar and olive oil in a medium bowl. Season with salt and pepper. Mix in the tomato chunks. Set aside." },
      { title: "Shred and stir", description: "Once tender, remove the lid and shred the chicken. Stir through hot sauce, tomato ketchup, and butter. Season with salt and pepper, then remove from the heat. Toss the lettuce with the tomato chunks and dressing until evenly coated." },
      { title: "Serve", description: "Divide the rice between bowls. Top with shredded chicken and sprinkle over the cheese. Add the salad to one side and drizzle burger sauce on top. Sprinkle with crispy onions to finish." }
    ]
  },

  {
    id: 14,
    title: "Popcorn Chicken & Mac & Cheese",
    section: "tea",
    basePortions: 14,
    cookTime: "40 mins",
    macrosPerPortion: { calories: 689, protein: 61, carbs: 74, fat: 14 },
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
      { name: "KFC spice blend — salt", amount: 21, unit: "g" },
      { name: "KFC spice blend — mustard powder", amount: 12.25, unit: "g" },
      { name: "KFC spice blend — thyme", amount: 3.5, unit: "g" },
      { name: "KFC spice blend — black pepper", amount: 4.5, unit: "g" },
      { name: "KFC spice blend — basil", amount: 4.5, unit: "g" },
      { name: "KFC spice blend — celery salt", amount: 3.5, unit: "g" },
      { name: "KFC spice blend — white pepper", amount: 4.5, unit: "g" },
      { name: "KFC spice blend — garlic powder", amount: 10.5, unit: "g" },
      { name: "KFC spice blend — ginger powder", amount: 6.3, unit: "g" },
      { name: "KFC spice blend — smoked paprika", amount: 17.5, unit: "g" },
      { name: "KFC spice blend — oregano", amount: 4.2, unit: "g" }
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
    basePortions: 14,
    cookTime: "50 mins",
    macrosPerPortion: { calories: 574, protein: 29, carbs: 71, fat: 19 },
    ingredients: [
      { name: "Potatoes", amount: 3150, unit: "g" },
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
      { title: "Fry the lamb", description: "When the water is boiling, add the potatoes and cook until fork-tender, 15–20 mins. Meanwhile, heat a large frying pan on medium-high heat (no oil). Add the lamb mince and grated carrot. Fry until browned, 5–6 mins, breaking up the mince as it cooks." },
      { title: "Cook the sauce", description: "Add the garlic and cook for 1 more minute. Stir in the passata, red wine stock paste, dried oregano, and water. Bring to a boil, then reduce heat and simmer for 4–5 mins until thickened." },
      { title: "Make the mash", description: "Preheat grill to high. Drain the cooked potatoes and return to the pan off the heat. Add a knob of butter and a splash of milk, then mash until smooth. Season with salt and pepper." },
      { title: "Grill the pie", description: "Pour the lamb mixture into an ovenproof dish. Spread the mash over the top in an even layer. Sprinkle over the cheese, then place under the grill until bubbling and golden, 5–6 mins. Let it rest for a couple of minutes." },
      { title: "Finish and serve", description: "Wipe out the frying pan and place over medium-high heat with a drizzle of oil. Add the green beans and stir-fry until starting to char, 2–3 mins. Add a splash of water, cover, and cook until tender, 4–5 mins. Season and serve alongside the pie." }
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
      { title: "Prepare the ingredients", description: "Grate carrots finely so they melt into the sauce. Chop mushrooms to desired thickness. Chop onions." },
      { title: "Cook the pasta", description: "Cook pasta in well-salted boiling water. Once cooked, drain — reserve some pasta water. Return to the pan." },
      { title: "Fry the beef", description: "Heat a large frying pan on medium-high heat (no oil). Add the beef mince and fry until browned, 5–6 minutes, breaking it up. Drain any excess fat. Add onions and mushrooms and cook through. Add grated carrots." },
      { title: "Make the sauce", description: "Add cottage cheese and tomato passata to a blender and blitz thoroughly. Add fresh basil if using." },
      { title: "Combine", description: "Add garlic to the beef pan over low heat. Add the blended sauce, ensuring the heat won't cause it to split. Add reserved pasta water slowly until the sauce is silky and cohesive. Add the pasta and stir through." },
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
      { title: "Add greens and finish", description: "Halve the limes. Once the curry thickens, stir in the peas. Add spinach in handfuls and cook for 1–2 minutes until wilted and piping hot. Squeeze in lime juice to taste. Season with salt and pepper." },
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
      { title: "Fry the chicken", description: "Halve the bell peppers, remove the core and seeds, then slice into thin strips. Heat a drizzle of oil in a large frying pan over medium-high heat. Add the diced chicken and sliced pepper. Season with salt and pepper. Fry for 8–10 minutes until golden and cooked through." },
      { title: "Prep the sauce and noodles", description: "Boil a full kettle. Peel and grate the garlic. Mix ketjap manis, soy sauce, tomato ketchup, and water in a small bowl. Place udon noodles in a heatproof bowl. Pour over boiling water to cover. Leave for 2–3 minutes then gently separate with a fork. Drain." },
      { title: "Add the veg and spices", description: "Once the chicken is browned, add the coleslaw mix, garlic, and Indonesian style spice mix. Cook for 1–2 minutes, stirring, until fragrant." },
      { title: "Simmer the sauce", description: "Add the prepared sauce to the pan. Bring to the boil, then reduce to a simmer for 2–3 minutes until slightly thickened. Crush the peanuts in the sachet using a rolling pin." },
      { title: "Finish with noodles and butter", description: "Add the drained udon noodles to the pan. Simmer for 1–2 minutes until everything is piping hot. Stir in the butter until melted. Remove from the heat." },
      { title: "Serve", description: "Divide between bowls and sprinkle over the crushed peanuts to finish." }
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
      { name: "Salt (chicken)", amount: 4.2, unit: "tsp" },
      { name: "Black pepper", amount: 4.2, unit: "tsp" },
      { name: "Garlic powder (chicken)", amount: 5.6, unit: "tsp" },
      { name: "Onion powder", amount: 5.6, unit: "tsp" },
      { name: "Paprika (chicken)", amount: 7, unit: "tsp" },
      { name: "Oregano", amount: 5.6, unit: "tsp" },
      { name: "Chilli flakes", amount: 2.8, unit: "tsp" },
      { name: "Olive oil (chicken)", amount: 8.4, unit: "tsp" },
      { name: "Butter", amount: 84, unit: "g" },
      { name: "Honey", amount: 84, unit: "g" },
      { name: "Fresh parsley", amount: null, unit: "to taste" },
      { name: "Potatoes (cubed)", amount: 3080, unit: "g" },
      { name: "Garlic powder (potatoes)", amount: 5.6, unit: "tsp" },
      { name: "Italian herbs", amount: 5.6, unit: "tsp" },
      { name: "Paprika (potatoes)", amount: 8.4, unit: "tsp" },
      { name: "Olive oil (potatoes)", amount: 5.6, unit: "tsp" },
      { name: "Red onion", amount: 280, unit: "g" },
      { name: "Tomato paste", amount: 126, unit: "g" },
      { name: "Evaporated milk", amount: 700, unit: "ml" },
      { name: "Garlic & herb cream cheese", amount: 420, unit: "g" }
    ],
    steps: [
      { title: "Cook the chicken", description: "On medium heat add half the butter to the pan. Add chicken and cook until golden brown. Turn off heat completely and add the rest of the butter to the pan with the chicken. Add spices and the honey. Mix then set aside." },
      { title: "Cook the potatoes", description: "Coat potatoes with olive oil. Add seasonings. Air fry until crispy." },
      { title: "Make the creamy potato sauce", description: "Add onions to a pan on medium heat and cook until soft. Add tomato paste and mix for 2 mins then lower heat. Add evaporated milk and cream cheese then stir until all combined." },
      { title: "Combine and serve", description: "Add crispy potatoes to the sauce mixture and fold until combined. Serve alongside the chicken and garnish with fresh parsley." }
    ]
  }

];

// Helper: scale an ingredient amount to a given number of portions
function scaleAmount(ingredient, portions) {
  if (ingredient.amount === null) return ingredient.unit;
  const scaled = ingredient.amount * (portions / 14);
  const rounded = scaled >= 100 ? Math.round(scaled) : scaled >= 10 ? Math.round(scaled * 10) / 10 : Math.round(scaled * 100) / 100;
  return rounded + ' ' + ingredient.unit;
}

const sections = ["all", ...new Set(recipes.map(r => r.section))];