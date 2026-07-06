/*
 * Recipe data. To add a recipe, copy one of the objects below and edit it.
 *
 * Each recipe:
 *   id        unique slug used in the URL (lowercase, dashes)
 *   title     display name
 *   emoji     one emoji for the card + title (falls back to 🍽️)
 *   tags      array of small labels (e.g. "Gluten-free")
 *   dishes    (menu recipes only) array of sub-recipes rendered as tabs:
 *             { name, emoji, groups, method, notes } — each shaped like a
 *             plain recipe's groups/method/notes. One multiplier scales all.
 *   timeline  (menu recipes only) array of { when, what } — the work-backward
 *             plan from sit-down time, shown as the first tab. Menu-level
 *             notes render under the timeline.
 *   warning   optional banner shown at the top (e.g. a GF caveat)
 *   time      rough total time, shown on the card
 *   servings  how many people the quantities below feed
 *   scaleKey  optional "scale by meat": { name, label, baseQty }
 *             - name:    what you're scaling by ("pork", "salmon")
 *             - label:   the unit you'll type in ("g", "fillets")
 *             - baseQty: how much of it the recipe uses at the base servings
 *   groups    sections of ingredients. Each: { name, items: [...] }
 *             name can be "" for a single unlabelled list.
 *             fixed: true → the group ignores scaling (use for per-bowl
 *             assembly amounts that stay the same however big the batch is).
 *   item      { qty, unit, name, note, m }
 *             - qty:  number, or null for "to taste" type items
 *             - unit: "g", "ml", "tbsp", "tsp", "cup", or "" for counts
 *             - note: optional, shown muted in parentheses
 *             - m:    [cal, protein_g, fat_g, carb_g] for the listed quantity.
 *                     Drives the Nutrition table. Omit for water/salt/zero-cal
 *                     items. null-qty "to taste" items use a sensible amount.
 *                     The table shows PER SERVING (scale-invariant); fixed
 *                     groups are already per-bowl, non-fixed are ÷ servings.
 *
 * Everything scales by one multiplier, so ratios stay correct.
 */

var RECIPES = [
  {
    id: "furikake-salmon",
    title: "Furikake-Crusted Salmon with Miso Butter",
    emoji: "🐟",
    tags: ["Gluten-free"],
    time: "~30 min",
    servings: 3,
    scaleKey: { name: "salmon", label: "fillets", baseQty: 3 },
    groups: [
      {
        name: "Salmon",
        items: [
          { qty: 3, unit: "", name: "salmon fillets, skin-on", note: "~180g each", m: [1124, 108, 70, 0] },
          { qty: 1, unit: "tbsp", name: "kewpie or regular mayonnaise", m: [90, 0, 10, 0] },
          { qty: 2, unit: "tsp", name: "white miso paste", m: [22, 1, 1, 3] },
          { qty: 3, unit: "tbsp", name: "gluten-free furikake", m: [90, 4, 6, 4] },
          { qty: 2, unit: "tsp", name: "neutral oil (avocado or grapeseed)", note: "skin renders its own fat — go light", m: [80, 0, 9, 0] }
        ]
      },
      {
        name: "Quinoa",
        items: [
          { qty: 1, unit: "cup", name: "quinoa, raw", note: "~170g; rinse well, ~1¼ cups water in a rice cooker", m: [626, 24, 11, 108] },
          { qty: 0.25, unit: "tsp", name: "fine salt" }
        ]
      },
      {
        name: "Bok choy",
        items: [
          { qty: 750, unit: "g", name: "baby bok choy, halved lengthwise", note: "~250g/serving — a big pile; ~10 small heads each, or any green", m: [98, 11, 2, 17] },
          { qty: 1, unit: "tbsp", name: "neutral oil", m: [120, 0, 14, 0] },
          { qty: 3, unit: "", name: "garlic cloves, minced", m: [12, 0, 0, 3] },
          { qty: 1, unit: "tbsp", name: "tamari", m: [14, 2, 0, 1] },
          { qty: 1, unit: "tbsp", name: "water or stock" }
        ]
      },
      {
        name: "Miso butter",
        items: [
          { qty: 1.5, unit: "tbsp", name: "unsalted butter, softened", note: "~20g", m: [143, 0, 16, 0] },
          { qty: 1, unit: "tbsp", name: "white (shiro) miso paste", m: [33, 2, 1, 4] },
          { qty: 0.5, unit: "tsp", name: "grated fresh ginger", m: [1, 0, 0, 0] },
          { qty: 0.5, unit: "tsp", name: "lemon juice", m: [0, 0, 0, 0] }
        ]
      }
    ],
    method: [
      "Rinse the quinoa well, then start it in the rice cooker (1 cup quinoa : ~1¼ cups water).",
      "Make the miso butter: mash the softened butter with the miso, ginger, and lemon juice. Set aside.",
      "Pat the salmon dry. Mix the mayo + miso into a paste (loosen with a few drops of water if needed), brush on top of the fillets, and press the furikake firmly onto the coated side.",
      "Heat the oil in a pan over medium-high. Sear salmon skin-side down 4–5 min until crispy.",
      "Flip, cook 2–3 min more (internal 52°C / 125°F for medium). Transfer to a plate to rest.",
      "Second pan: sear the halved bok choy cut-side down 2–3 min until charred. Add the garlic, tamari, and a splash of water; cover 1 min.",
      "Plate: quinoa → bok choy → salmon → a dollop of miso butter on top."
    ],
    notes: [
      "Lighter rebuild: quinoa-only (no rice), ponzu cut, miso butter and the mayo coating both halved. ~815 cal/serving vs ~960 for the original.",
      "Cooking oil is the easiest further lever — skin-on salmon renders its own fat, so a nonstick pan + 1 tsp shaves ~30 cal/serving.",
      "Any green works in place of the bok choy — it's a big pile of veg by design.",
      "Miso butter can be made up to a day ahead.",
      "Meal prep: crust raw salmon up to 24 hrs ahead, or freeze for up to 1 month.",
      "GF label-check shortlist: furikake, tamari, white miso."
    ]
  },

  {
    id: "pad-krapow-moo",
    title: "Thai Holy Basil Pork (Pad Krapow Moo)",
    emoji: "🌶️",
    tags: ["Gluten-free", "Thai"],
    time: "~30 min",
    servings: 2,
    scaleKey: { name: "pork", label: "g", baseQty: 340 },
    groups: [
      {
        name: "Krapow",
        items: [
          { qty: 4, unit: "", name: "garlic cloves", m: [16, 0, 0, 4] },
          { qty: 4, unit: "", name: "chilies", note: "add to taste", m: [8, 0, 0, 2] },
          { qty: 2, unit: "tbsp", name: "neutral oil", m: [240, 0, 28, 0] },
          { qty: 340, unit: "g", name: "pork, minced", note: "≈1.5 cups", m: [820, 58, 65, 0] },
          { qty: 2, unit: "tbsp", name: "gluten-free oyster sauce", m: [50, 1, 0, 11] },
          { qty: 2, unit: "tbsp", name: "tamari (GF soy)", m: [28, 5, 0, 3] },
          { qty: 0.5, unit: "tbsp", name: "fish sauce", m: [5, 1, 0, 0] },
          { qty: 1, unit: "tbsp", name: "flavor seasoning", note: "MSG / GF seasoning powder — see notes", m: [5, 0, 0, 1] },
          { qty: 1, unit: "tbsp", name: "white sugar", m: [48, 0, 0, 12] },
          { qty: 1, unit: "cup", name: "holy basil leaves", m: [5, 0, 0, 1] }
        ]
      },
      {
        name: "Sides",
        items: [
          { qty: 0.68, unit: "cup", name: "jasmine rice, uncooked", note: "½ cup per 250g of meat", m: [459, 9, 1, 101] },
          { qty: 2, unit: "", name: "eggs", note: "2–3, usually", m: [144, 12, 10, 1] },
          { qty: 2, unit: "", name: "baby bok choy, halved lengthwise", m: [26, 2, 0, 4] },
          { qty: 0.5, unit: "tbsp", name: "neutral oil", m: [60, 0, 7, 0] },
          { qty: 1, unit: "", name: "garlic clove, minced", m: [4, 0, 0, 1] },
          { qty: 0.5, unit: "tbsp", name: "tamari", m: [7, 1, 0, 1] },
          { qty: 0.5, unit: "tbsp", name: "water or stock" }
        ]
      }
    ],
    method: [
      "Start the jasmine rice in the rice cooker.",
      "Roughly crush the garlic and chilies using a mortar and pestle.",
      "Heat oil over medium-high heat in a wok or skillet. Add the crushed chili-garlic paste, stir-fry for 20 seconds, or until the garlic turns golden and the paste becomes fragrant.",
      "Toss in the ground pork and break up any clumps. If you're comfortable with it, cook over high heat, stirring continuously until the meat is fully cooked through — typically about 2–3 minutes.",
      "Add the oyster sauce, fish sauce, sugar, tamari, and flavor seasoning. Continue stir-frying until the sugar is dissolved and the sauces are well mixed.",
      "Turn off the heat and toss in the holy basil; gently mix.",
      "Bok choy, same as the salmon dish: sear cut-side down in a second pan 2–3 min until charred, then add the garlic, tamari, and a splash of water and cover 1 min.",
      "Fry the eggs. Serve the pork over rice, bok choy alongside, eggs on top."
    ],
    notes: [
      "Flavor seasoning = plain MSG or a GF seasoning/bouillon powder. Optional umami boost — and lots of bouillon powders hide wheat, so label-check.",
      "Holy basil (krapow) is traditional; Thai basil works as a substitute but is sweeter and more anise-like.",
      "GF label-check shortlist: oyster sauce, fish sauce, seasoning powder.",
      "Macros assume regular ground pork. Lean ground pork drops it ~100 cal/serving; the 2 tbsp oil is another ~120 cal/serving you can trim."
    ]
  },

  {
    id: "spicy-poke-bowl",
    title: "Spicy Kewpie Poke Bowl",
    emoji: "🍣",
    tags: ["Gluten-free"],
    time: "~20 min",
    servings: 1,
    scaleKey: { name: "tuna", label: "g", baseQty: 200 },
    groups: [
      {
        name: "Fish",
        items: [
          { qty: 200, unit: "g", name: "ahi tuna, sushi-grade, cubed", note: "maybe 200g — scale to what you've got", m: [218, 48, 2, 0] }
        ]
      },
      {
        name: "Spicy Kewpie sauce (lean default)",
        items: [
          { qty: 1, unit: "tbsp", name: "Kewpie mayonnaise", note: "¼ of the original — bump it up for a richer bowl, ~100 cal/tbsp", m: [100, 0, 11, 0] },
          { qty: 1, unit: "tsp", name: "tamari (GF soy)", m: [5, 1, 0, 0] },
          { qty: null, unit: "", name: "sriracha", note: "a few drops, to taste", m: [2, 0, 0, 0] },
          { qty: 0.25, unit: "tsp", name: "sesame oil", m: [10, 0, 1, 0] }
        ]
      },
      {
        name: "Shoyu sauce (no mayo — keeps it from drying out)",
        items: [
          { qty: 1, unit: "tbsp", name: "tamari (GF soy)", m: [10, 1, 0, 1] },
          { qty: 1, unit: "tsp", name: "rice vinegar", m: [1, 0, 0, 0] },
          { qty: 0.5, unit: "tsp", name: "sesame oil", note: "the toasty poke-shop flavor — don't skip", m: [20, 0, 2, 0] },
          { qty: 0.25, unit: "tsp", name: "honey or a pinch of sugar", note: "optional — rounds the salt", m: [5, 0, 0, 1] },
          { qty: null, unit: "", name: "grated ginger or a few drops sriracha", note: "optional" }
        ]
      },
      {
        name: "Rice seasoning",
        items: [
          { qty: 1, unit: "tbsp", name: "rice vinegar", m: [3, 0, 0, 0] },
          { qty: 1.5, unit: "tsp", name: "sugar", m: [24, 0, 0, 6] },
          { qty: 0.25, unit: "tsp", name: "salt" }
        ]
      },
      {
        name: "Base",
        items: [
          { qty: 0.33, unit: "cup", name: "sushi rice, uncooked", note: "⅓ cup default — up to ½ for a bigger bowl", m: [213, 4, 1, 48] },
          { qty: null, unit: "", name: "lettuce", note: "the other half of the bowl — or all lettuce, or all rice, idc", m: [10, 0, 0, 2] }
        ]
      },
      {
        name: "Toppings",
        items: [
          { qty: 0.5, unit: "", name: "mango, cubed", note: "half-ish", m: [50, 1, 0, 13] },
          { qty: 0.5, unit: "", name: "avocado", m: [120, 2, 11, 6] },
          { qty: null, unit: "", name: "cucumber, sliced", m: [8, 0, 0, 2] },
          { qty: 0.33, unit: "cup", name: "corn", note: "⅓ cup", m: [45, 2, 1, 10] },
          { qty: 0.33, unit: "cup", name: "edamame, shelled", note: "⅓ cup", m: [62, 6, 3, 5] },
          { qty: null, unit: "", name: "furikake", note: "a fuck ton (~2 tbsp counted)", m: [60, 2, 4, 3] },
          { qty: null, unit: "", name: "sesame seeds", m: [30, 1, 3, 1] },
          { qty: null, unit: "", name: "seaweed flakes", note: "maybe more", m: [5, 0, 0, 1] }
        ]
      }
    ],
    method: [
      "Cook the rice. While still warm, gently fold through the rice seasoning (stir the vinegar, sugar, and salt until dissolved first). Let cool slightly.",
      "Make the sauces: whisk the spicy Kewpie in one small bowl, the shoyu in another. The combo is the move — Kewpie for creamy spice, shoyu for brightness and to keep it from drying out — but either one solo works.",
      "Cube the tuna and toss it in the Kewpie sauce (or keep it as a drizzle on top, your call).",
      "Build the bowl: rice and/or lettuce base, then tuna, mango, avocado, cucumber, corn, and edamame. Drizzle the shoyu over the top, then finish with a fuck ton of furikake, sesame seeds, and more seaweed flakes if you're feeling it."
    ],
    notes: [
      "The rice seasoning is classic sushi-su (vinegar : sugar : salt) — the amount suits the ⅓–½ cup of uncooked rice here.",
      "GF label-check shortlist: furikake, tamari, sriracha (most sriracha is fine, e.g. Huy Fong, but check).",
      "Macros: this lean build — 1 tbsp Kewpie + the shoyu drizzle, ⅓ cup rice — lands ~1,000 cal / ~68g protein (the table counts both sauces, since using both is the default). The Kewpie is the calorie lever: each extra tbsp is ~100 cal, so bump it for a richer, creamier bowl."
    ]
  },

  {
    id: "hot-honey-bowl",
    title: "Hot Honey Bowl",
    emoji: "🍯",
    tags: ["Gluten-free", "Meal prep"],
    time: "~40 min prep",
    servings: 3,
    scaleKey: { name: "beef", label: "g", baseQty: 450 },
    groups: [
      {
        name: "Pre-prep (makes 3 bowls)",
        items: [
          { qty: 450, unit: "g", name: "lean ground beef", note: "1 packet / ~1 lb", m: [750, 90, 40, 0] },
          { qty: 1, unit: "", name: "packet taco seasoning", note: "label-check for GF", m: [60, 2, 1, 12] },
          { qty: 2, unit: "", name: "yams or sweet potatoes", note: "1–2, depending on size", m: [350, 6, 1, 80] }
        ]
      },
      {
        name: "Assemble — per bowl",
        fixed: true,
        items: [
          { qty: null, unit: "", name: "lettuce", note: "a fuckton", m: [15, 1, 0, 3] },
          { qty: null, unit: "", name: "tomatoes", m: [20, 1, 0, 4] },
          { qty: 1, unit: "cup", name: "fat-free cottage cheese", note: "¾–1 cup", m: [160, 28, 0, 9] },
          { qty: 0.5, unit: "", name: "avocado", note: "half or full", m: [120, 2, 11, 6] },
          { qty: null, unit: "", name: "1/3 of the beef", note: "counted in the prep batch above" },
          { qty: null, unit: "", name: "1/3 of the potatoes", note: "counted in the prep batch above" },
          { qty: null, unit: "", name: "hot honey", note: "a good drizzle (~1 tbsp)", m: [60, 0, 0, 16] }
        ]
      }
    ],
    method: [
      "Cube the sweet potatoes, toss with a little oil, and roast at 220°C / 425°F for 25–30 min until browned at the edges (air fryer works too).",
      "Meanwhile, brown the beef over medium-high heat, then stir in the taco seasoning (plus water per the packet directions) and simmer a few minutes.",
      "Portion the beef and potatoes into thirds — keeps in the fridge ~4 days.",
      "Per bowl: a fuckton of lettuce, tomatoes, cottage cheese, avocado, then a third of the beef and potatoes (reheated), and finish with a good drizzle of hot honey."
    ],
    notes: [
      "The “Assemble” amounts are per bowl and don't scale — the scaler adjusts the prep batch (beef + potatoes) only.",
      "GF label-check shortlist: taco seasoning (a frequent gluten offender) and hot honey.",
      "Macros: best protein-per-calorie of the staples (~1:12) thanks to lean beef + FF cottage cheese. Full avo + 1% cottage + heavier honey push a real bowl to ~850–935."
    ]
  },

  {
    id: "chipotle-turkey-chili",
    title: "Chipotle Turkey Chili",
    emoji: "🍲",
    tags: ["Gluten-free", "Meal prep"],
    time: "~1 hr",
    servings: 9,
    scaleKey: { name: "turkey", label: "g", baseQty: 840 },
    groups: [
      {
        name: "",
        items: [
          { qty: 840, unit: "g", name: "extra lean ground turkey", m: [1008, 185, 25, 0] },
          { qty: 796, unit: "ml", name: "diced tomatoes", note: "1 large can", m: [140, 7, 1, 32] },
          { qty: 398, unit: "ml", name: "black beans, drained and rinsed", note: "1 can", m: [350, 21, 1, 62] },
          { qty: 0.75, unit: "", name: "bell pepper, diced", m: [23, 1, 0, 5] },
          { qty: 2, unit: "", name: "yellow onions, diced", m: [88, 2, 0, 20] },
          { qty: 4, unit: "", name: "garlic cloves, pressed", note: "4–5", m: [16, 0, 0, 4] },
          { qty: 2, unit: "tbsp", name: "double-concentrate tomato paste", m: [30, 2, 0, 7] },
          { qty: 3, unit: "", name: "chipotle peppers in adobo, seeded", note: "2–3, to heat tolerance", m: [15, 0, 0, 3] },
          { qty: 2, unit: "tbsp", name: "adobo sauce", note: "from the chipotle can", m: [20, 0, 0, 4] },
          { qty: null, unit: "", name: "frozen corn + frozen veggie mix", note: "a lot (~2 cups counted)", m: [200, 6, 2, 40] },
          { qty: 1.5, unit: "tbsp", name: "chili powder", m: [25, 1, 1, 4] },
          { qty: 1, unit: "tsp", name: "cumin", m: [8, 0, 0, 1] },
          { qty: 1, unit: "tsp", name: "smoked paprika", m: [6, 0, 0, 1] },
          { qty: null, unit: "", name: "lime juice or apple cider vinegar", note: "a splash, at the end", m: [3, 0, 0, 1] }
        ]
      }
    ],
    method: [
      "Sauté the onions and bell pepper in a little oil over medium heat until soft (~5 min). Add the garlic and cook 1 min more.",
      "Add the turkey, break it up, and brown it through (~6–8 min).",
      "Stir in the tomato paste, chili powder, cumin, and smoked paprika; cook 1–2 min until fragrant.",
      "Add the chopped chipotles + adobo sauce, diced tomatoes, black beans, and the frozen corn + veggie mix. Stir well.",
      "Simmer uncovered 30–40 min, stirring occasionally, until thickened to taste.",
      "Off the heat, finish with a splash of lime juice or ACV."
    ],
    notes: [
      "1 serving = 1 cup. Full pot at ×1: ~1,930 cal, ~225 g protein, ~9 cups → roughly 215 cal / 25 g protein per cup (recomputed per-item; the older 266 estimate assumed a fattier turkey).",
      "No added salt — deliberate (the adobo and seasoning carry it).",
      "GF label-check shortlist: chipotles in adobo (some brands, e.g. La Costeña, thicken the sauce with wheat flour) and chili powder blends.",
      "This is the Apr 12 batch — the chipotle version.",
      "Macros: leanest staple by protein-per-calorie (~1:9). You usually eat 2–2.5 cups, so a real bowl is ~430–540 cal / 50–63 g protein."
    ]
  },

  {
    id: "beef-stir-fry",
    title: "Beef Stir Fry",
    emoji: "🥩",
    tags: ["Gluten-free"],
    time: "~35 min",
    servings: 3,
    scaleKey: { name: "beef", label: "g", baseQty: 450 },
    groups: [
      {
        name: "Beef + velveting",
        items: [
          { qty: 450, unit: "g", name: "beef, sliced thin against the grain", note: "~1 lb flank or sirloin", m: [743, 95, 36, 0] },
          { qty: 1, unit: "tsp", name: "cornstarch", m: [10, 0, 0, 2] },
          { qty: null, unit: "", name: "baking soda", note: "a pinch" },
          { qty: 1, unit: "tbsp", name: "tamari (GF soy)", m: [14, 2, 0, 1] },
          { qty: 1, unit: "tsp", name: "neutral oil", m: [40, 0, 5, 0] }
        ]
      },
      {
        name: "Sauce",
        items: [
          { qty: 0.25, unit: "cup", name: "tamari (GF soy)", m: [55, 10, 0, 5] },
          { qty: 1, unit: "tbsp", name: "rice vinegar", m: [3, 0, 0, 0] },
          { qty: 1, unit: "tbsp", name: "brown sugar", m: [52, 0, 0, 13] },
          { qty: 1, unit: "tsp", name: "sesame oil", m: [40, 0, 5, 0] },
          { qty: 1, unit: "tsp", name: "cornstarch", note: "mix into the sauce before it hits the pan", m: [10, 0, 0, 2] }
        ]
      },
      {
        name: "Stir fry",
        items: [
          { qty: null, unit: "", name: "olive oil, for cooking", note: "~1.5 tbsp", m: [180, 0, 21, 0] },
          { qty: null, unit: "", name: "garlic", note: "fresh, or ~1 tsp garlic powder", m: [8, 0, 0, 2] },
          { qty: null, unit: "", name: "ginger", note: "fresh, or ~½ tsp ground ginger", m: [5, 0, 0, 1] },
          { qty: 1, unit: "", name: "onion, sliced", m: [44, 1, 0, 10] },
          { qty: 1, unit: "", name: "broccoli crown, in florets", m: [102, 8, 1, 20] },
          { qty: 1, unit: "", name: "bell pepper, sliced", m: [30, 1, 0, 7] },
          { qty: 2, unit: "", name: "green onions, sliced", note: "2–3", m: [10, 0, 0, 2] }
        ]
      },
      {
        name: "To serve",
        items: [
          { qty: 0.9, unit: "cup", name: "basmati rice, uncooked", note: "½ cup per 250g of meat", m: [600, 12, 1, 132] },
          { qty: null, unit: "", name: "sesame seeds", m: [30, 1, 3, 1] }
        ]
      }
    ],
    method: [
      "Velvet the beef: toss the slices with the cornstarch, baking soda, tamari, and oil. Let it sit 15–20 min. Start the rice.",
      "Mix all the sauce ingredients, including the cornstarch, and stir until smooth.",
      "Sear the beef in batches over high heat until just browned. Remove from the pan.",
      "Drop to medium-high. Onion in, 2–3 min.",
      "Broccoli, 3–4 min (a splash of water helps it steam).",
      "Bell pepper, 1–2 min, adding the garlic and ginger for the last 30 sec.",
      "Beef back in. Restir the sauce, pour it over, and toss ~1 min until glossy and thickened.",
      "Off the heat: green onions on top. Serve over basmati with sesame seeds."
    ],
    notes: [
      "The cornstarch in the sauce is the thickener — mix it in while the sauce is still cold or it clumps.",
      "Velveting (the cornstarch + baking soda rest) is what makes the beef takeout-tender — don't skip the 15–20 min.",
      "Beef amount (450g) and veg counts are sensible defaults — the sauce and velveting ratios are the exact part.",
      "Macros: the ~1.5 tbsp cooking oil (~180 cal across the batch) and the rice are the biggest non-beef levers."
    ]
  },

  {
    id: "smashed-cucumber-salad",
    title: "Smashed Asian Cucumber Salad",
    emoji: "🥒",
    tags: ["Gluten-free", "Side"],
    time: "~10 min",
    servings: 1,
    scaleKey: { name: "cucumber", label: "cucumbers", baseQty: 0.5 },
    groups: [
      {
        name: "Salad",
        items: [
          { qty: 0.5, unit: "", name: "English cucumber (seedless)", note: "~½ a big one, ≈150g", m: [22, 1, 0, 5] },
          { qty: 1, unit: "", name: "garlic clove, finely chopped", note: "to taste", m: [4, 0, 0, 1] },
          { qty: 0.5, unit: "tsp", name: "toasted sesame seeds", m: [9, 0, 1, 0] },
          { qty: 1, unit: "tbsp", name: "cilantro, chopped", m: [1, 0, 0, 0] }
        ]
      },
      {
        name: "Dressing",
        items: [
          { qty: 0.25, unit: "tsp", name: "salt", m: [0, 0, 0, 0] },
          { qty: 0.625, unit: "tsp", name: "sugar", m: [10, 0, 0, 2] },
          { qty: 0.5, unit: "tsp", name: "sesame oil", m: [20, 0, 2, 0] },
          { qty: 0.75, unit: "tsp", name: "tamari (GF soy)", m: [2, 0, 0, 0] },
          { qty: 1.125, unit: "tsp", name: "rice vinegar", m: [1, 0, 0, 0] },
          { qty: 0.5, unit: "tsp", name: "chili oil", note: "optional, to taste" }
        ]
      }
    ],
    method: [
      "Make the dressing: stir the salt, sugar, sesame oil, tamari, and rice vinegar until the sugar and salt fully dissolve. Set aside.",
      "Smash the cucumber: lay a large knife flat against it and press down with your hand until it cracks open, working along the whole length. It'll split into rough strips — then cut on a 45° angle into bite-size pieces.",
      "Toss the cucumber with the dressing, garlic, and chili oil. Garnish with the sesame seeds and cilantro. Best eaten fresh."
    ],
    notes: [
      "Smashing beats slicing — the craggy cracks grab far more dressing than clean-cut rounds.",
      "Best fresh; smashed cucumber weeps as it sits. To prep ahead, salt the smashed pieces, rest 10 min, and drain before dressing — much less watery.",
      "No chili oil? Heat 1 tbsp neutral oil until shimmering and drizzle it over — hot oil tastes different from raw in Chinese cooking. (The optional chili oil adds ~20 cal if you use it.)",
      "GF: tamari stands in for the light soy; most chili oil is GF but label-check.",
      "Adapted from The Woks of Life (Judy)."
    ]
  },

  {
    id: "raspberry-protein-chia-pudding",
    title: "Protein Chia Pudding",
    emoji: "🍓",
    tags: ["Gluten-free", "Meal prep"],
    time: "~5 min + chill",
    servings: 1,
    groups: [
      {
        name: "",
        items: [
          { qty: 2, unit: "tbsp", name: "chia seeds", note: "24g", m: [120, 4, 8, 10] },
          { qty: 0.5, unit: "cup", name: "protein fat-free milk", note: "10g protein / 65 cal per ½ cup", m: [65, 10, 0, 7] },
          { qty: 1, unit: "", name: "scoop chocolate protein powder", m: [120, 24, 1, 3] },
          { qty: 0.5, unit: "cup", name: "non-fat plain Greek yogurt", note: "113g", m: [67, 12, 0, 4] },
          { qty: 0.75, unit: "cup", name: "puréed fruit", note: "strawberries, raspberries, blueberries — whatever's around", m: [40, 1, 0, 10] },
          { qty: null, unit: "", name: "fresh fruit on top", note: "~15 blueberries + 4 strawberries", m: [30, 1, 0, 7] },
          { qty: null, unit: "", name: "granola", note: "optional — sometimes; ~120 cal per ¼ cup, not counted below" }
        ]
      }
    ],
    method: [
      "Purée the fruit.",
      "Stir the chia seeds, milk, and protein powder together in a jar until smooth. Let it sit 5 min so the chia starts to gel.",
      "Stir again to break up clumps, then mix in the yogurt and puréed fruit.",
      "Cover and refrigerate overnight, or a minimum of 2 hours. Top with fresh fruit (and granola if you're feeling it)."
    ],
    notes: [
      "Per serving (makes 1): ~440 cal, 52g protein, 9g fat, ~41g carb, ~12g fiber — proyo-tier protein efficiency (1:8.5).",
      "No sweetener needed — the puréed fruit + chocolate protein carry it.",
      "Granola adds ~120 cal / ¼ cup (or ~245 / ½ cup) on top of the counted total.",
      "GF label-check: protein powder and any granola topping (the chia, yogurt, milk, and fruit are naturally GF)."
    ]
  },

  {
    id: "spicy-tuna-onigiri",
    title: "Spicy Tuna Onigiri",
    emoji: "🍙",
    tags: ["Gluten-free", "Meal prep"],
    time: "~20 min",
    servings: 3,
    scaleKey: { name: "tuna", label: "cans", baseQty: 1 },
    groups: [
      {
        name: "Spicy tuna filling",
        items: [
          { qty: 1, unit: "", name: "can tuna, drained", note: "~120g drained", m: [140, 30, 1, 0] },
          { qty: 2, unit: "tbsp", name: "mayonnaise", m: [190, 0, 21, 1] },
          { qty: 1.5, unit: "tbsp", name: "sriracha", m: [23, 0, 0, 5] },
          { qty: null, unit: "", name: "black pepper", note: "to taste" }
        ]
      },
      {
        name: "Rice",
        items: [
          { qty: 1, unit: "cup", name: "sushi or short-grain rice, rinsed", note: "≈200g raw weight", m: [730, 14, 1, 160] },
          { qty: 1, unit: "tbsp", name: "sesame oil", m: [120, 0, 14, 0] },
          { qty: 0.5, unit: "tbsp", name: "toasted sesame seeds", m: [26, 1, 2, 1] }
        ]
      },
      {
        name: "Glaze (optional — for pan-searing)",
        items: [
          { qty: 2, unit: "tbsp", name: "tamari (GF soy)", m: [16, 2, 0, 2] },
          { qty: 1, unit: "tbsp", name: "white sugar", m: [48, 0, 0, 12] },
          { qty: 1, unit: "tsp", name: "neutral oil, for the pan", m: [40, 0, 4.5, 0] }
        ]
      },
      {
        name: "To assemble",
        items: [
          { qty: 3, unit: "", name: "sheets nori", note: "1 per onigiri", m: [8, 1, 0, 1] }
        ]
      }
    ],
    method: [
      "Cook the rice.",
      "Drain the tuna and add it to a bowl. Mix in the mayo, sriracha, and pepper.",
      "Drizzle the sesame oil over the cooked rice and sprinkle in the sesame seeds; mix through.",
      "Wet your hands (or wear food gloves) and shape: a layer of rice, the tuna mixture in the middle, more rice to cover, then mold into a triangle.",
      "Optional glaze: mix the tamari and sugar. Brush it over the shaped onigiri and sear in a lightly oiled pan, ~1–2 min per side, until glazed and a little crisp (yaki-onigiri style).",
      "Wrap in nori just before eating."
    ],
    notes: [
      "The tamari-sugar mix is a yaki onigiri glaze (pan-seared, brushed with a sweet-savory sauce) — that's the best read of it. Skip step 5 for plain unfried onigiri instead; saves ~30 cal/piece and a pan.",
      "Sodium is high for a single piece (~44% DV) — fine for hiking (a little extra salt pre-sweat is good), just don't stack it with other salty trail snacks the same day.",
      "Meal prep / hiking: mayo + rice + tuna is a moist filling — keeps 3–4 days refrigerated. If packing for a hike, use ones made within the last 2 days, carry in a cold pouch, and eat earlier in the hike rather than late in a warm pack.",
      "Wrap the nori on just before eating — pre-wrapped, it goes chewy against the moist rice.",
      "GF label-check: sriracha (most brands, e.g. Huy Fong, are GF) and tamari."
    ]
  }
];
