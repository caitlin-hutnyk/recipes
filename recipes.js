/*
 * Recipe data. To add a recipe, copy one of the objects below and edit it.
 *
 * Each recipe:
 *   id        unique slug used in the URL (lowercase, dashes)
 *   title     display name
 *   emoji     one emoji for the card + title (falls back to 🍽️)
 *   tags      array of small labels (e.g. "Gluten-free")
 *   untested  true → listed under "Untested" on the home page and chipped
 *             on its own page; delete the flag once it's cooked and approved
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
    title: "Furikake-Crusted Salmon with Ponzu Glaze & Miso Butter",
    emoji: "🐟",
    tags: ["Gluten-free"],
    time: "~35 min",
    servings: 4,
    scaleKey: { name: "salmon", label: "fillets", baseQty: 4 },
    groups: [
      {
        name: "Miso butter",
        items: [
          { qty: 60, unit: "g", name: "unsalted butter, softened", m: [430, 0, 49, 0] },
          { qty: 2, unit: "tbsp", name: "white (shiro) miso paste", m: [66, 4, 2, 8] },
          { qty: 1, unit: "tsp", name: "grated fresh ginger", m: [2, 0, 0, 0] },
          { qty: 1, unit: "tsp", name: "lemon juice", m: [1, 0, 0, 0] }
        ]
      },
      {
        name: "Rice & quinoa",
        items: [
          { qty: 200, unit: "g", name: "short-grain or jasmine rice, rinsed", m: [720, 14, 1, 158] },
          { qty: 90, unit: "g", name: "quinoa, rinsed well", m: [331, 13, 6, 57] },
          { qty: 600, unit: "ml", name: "water", note: "~500ml in a rice cooker" },
          { qty: 0.5, unit: "tsp", name: "fine salt" }
        ]
      },
      {
        name: "Ponzu glaze",
        items: [
          { qty: 60, unit: "ml", name: "tamari (GF soy sauce)", m: [55, 10, 0, 5] },
          { qty: 60, unit: "ml", name: "fresh lemon juice (or yuzu)", m: [15, 0, 0, 5] },
          { qty: 2, unit: "tbsp", name: "mirin", m: [86, 0, 0, 17] },
          { qty: 1, unit: "tbsp", name: "rice vinegar", m: [3, 0, 0, 0] },
          { qty: 1, unit: "tbsp", name: "honey or maple syrup", m: [64, 0, 0, 17] },
          { qty: 1, unit: "tsp", name: "grated fresh ginger", m: [2, 0, 0, 0] }
        ]
      },
      {
        name: "Salmon",
        items: [
          { qty: 4, unit: "", name: "salmon fillets, skin-on", note: "~170g each", m: [1416, 136, 88, 0] },
          { qty: 2, unit: "tbsp", name: "kewpie or regular mayonnaise", m: [180, 0, 20, 0] },
          { qty: 1, unit: "tbsp", name: "white miso paste", m: [33, 2, 1, 4] },
          { qty: 4, unit: "tbsp", name: "gluten-free furikake", m: [120, 5, 8, 5] },
          { qty: 1, unit: "tbsp", name: "neutral oil (avocado or grapeseed)", m: [120, 0, 14, 0] }
        ]
      },
      {
        name: "Bok choy",
        items: [
          { qty: 4, unit: "", name: "baby bok choy, halved lengthwise", m: [52, 5, 0, 8] },
          { qty: 1, unit: "tbsp", name: "neutral oil", m: [120, 0, 14, 0] },
          { qty: 2, unit: "", name: "garlic cloves, minced", m: [8, 0, 0, 2] },
          { qty: 1, unit: "tbsp", name: "tamari", m: [14, 2, 0, 1] },
          { qty: 1, unit: "tbsp", name: "water or stock" }
        ]
      }
    ],
    method: [
      "Start the rice + quinoa in the rice cooker (28 min hands-off).",
      "Mash softened butter with miso, ginger, and lemon juice. Set aside.",
      "Whisk all ponzu ingredients in a small pot. Simmer until slightly syrupy (~4 min). Remove from heat.",
      "Pat salmon dry. Mix mayo + miso into a paste, brush on top of fillets, press furikake firmly onto the coated side.",
      "Heat oil in a pan over medium-high. Sear salmon skin-side down 4–5 min until crispy.",
      "Flip salmon, cook 2–3 min more (internal 52°C / 125°F for medium). Transfer to a plate to rest.",
      "In a second pan, sear halved bok choy cut-side down for 2–3 min until charred. Add garlic, tamari, splash of water. Cover 1 min.",
      "Plate: rice → bok choy → salmon → drizzle ponzu → dollop miso butter on top."
    ],
    notes: [
      "GF label-check shortlist: furikake, tamari, white miso, mirin.",
      "Miso butter and ponzu can be made up to a day ahead.",
      "For meal prep: crust raw salmon up to 24 hrs ahead, or freeze for up to 1 month.",
      "Macros: the miso butter (60g butter) + the salmon's own fat are most of the ~51g fat/serving. Skip or halve the butter to cut ~55–110 cal/serving."
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
    id: "raspberry-protein-chia-pudding",
    title: "Raspberry Protein Chia Pudding",
    emoji: "🍓",
    tags: ["Gluten-free", "Meal prep"],
    time: "~5 min + chill",
    servings: 1,
    groups: [
      {
        name: "",
        items: [
          { qty: 2, unit: "tbsp", name: "chia seeds", note: "24g", m: [120, 4, 8, 10] },
          { qty: 0.5, unit: "cup", name: "fat-free milk (or milk of choice)", note: "120ml", m: [41, 4, 0, 6] },
          { qty: 0.25, unit: "tsp", name: "vanilla", m: [3, 0, 0, 0] },
          { qty: 0.5, unit: "tbsp", name: "maple syrup", note: "sugar-free, or sweetener of choice", m: [5, 0, 0, 1] },
          { qty: 0.5, unit: "cup", name: "non-fat plain Greek yogurt", note: "113g", m: [67, 12, 0, 4] },
          { qty: 0.5, unit: "cup", name: "frozen raspberries", note: "70g, or fresh", m: [36, 1, 0, 8] },
          { qty: 0.5, unit: "", name: "scoop vanilla protein powder", note: "15g", m: [60, 13, 1, 1] }
        ]
      }
    ],
    method: [
      "Add the chia seeds, milk, vanilla, and sweetener to a small jar with a lid and stir until combined. Let it sit 5 min so the chia starts to gel.",
      "Stir again to break up any clumps, then add the yogurt, raspberries, and protein powder; stir until combined.",
      "Cover and refrigerate overnight, or a minimum of 2 hours.",
      "Eat as is, or top with more raspberries, peanut butter, granola — whatever you love."
    ],
    notes: [
      "Per serving (makes 1): ~330 cal, 35g protein, 29g carb, 9g fat, 13g fiber.",
      "13g fiber is high and great for satiety — pair it with water.",
      "GF label-check: protein powder and any granola topping (the chia, yogurt, and berries are naturally GF)."
    ]
  },

  {
    id: "chicken-teriyaki-bowl",
    title: "Chicken Teriyaki & Broccoli Bowl",
    emoji: "🍗",
    tags: ["Gluten-free"],
    untested: true,
    time: "~30 min",
    servings: 3,
    scaleKey: { name: "chicken", label: "g", baseQty: 600 },
    groups: [
      {
        name: "Chicken",
        items: [
          { qty: 600, unit: "g", name: "boneless chicken thighs", note: "4–5 thighs; skin-on = richer, breast = leaner", m: [894, 102, 54, 0] },
          { qty: 1, unit: "tbsp", name: "neutral oil", m: [120, 0, 14, 0] }
        ]
      },
      {
        name: "Teriyaki glaze — 2 : 2 : 2 : 1",
        items: [
          { qty: 3, unit: "tbsp", name: "tamari (GF soy)", m: [42, 8, 0, 4] },
          { qty: 3, unit: "tbsp", name: "sake", note: "rice-based, GF — or sub extra mirin + splash of water", m: [60, 0, 0, 2] },
          { qty: 3, unit: "tbsp", name: "mirin", m: [129, 0, 0, 26] },
          { qty: 1.5, unit: "tbsp", name: "white sugar", m: [72, 0, 0, 18] }
        ]
      },
      {
        name: "Bowl",
        items: [
          { qty: 500, unit: "g", name: "broccoli florets", note: "1 large head; bagged or frozen (thawed) = zero knife work", m: [170, 14, 2, 33] },
          { qty: 1, unit: "tbsp", name: "neutral oil", m: [120, 0, 14, 0] },
          { qty: 1.2, unit: "cup", name: "short-grain or jasmine rice, uncooked", note: "½ cup per 250g of meat", m: [800, 16, 1, 176] },
          { qty: null, unit: "", name: "sesame seeds", m: [30, 1, 3, 1] },
          { qty: 2, unit: "", name: "green onions, sliced", note: "optional", m: [10, 0, 0, 2] }
        ]
      }
    ],
    method: [
      "Start the rice in the rice cooker.",
      "Stir the glaze ingredients together until the sugar dissolves. Don't cook it yet — it reduces in the pan at the end, and it's a glaze, never a marinade (the sugar would burn).",
      "Even out the thighs: shallow slits every couple of cm across the thick parts, then press flat. Pat dry.",
      "Heat oil in a nonstick pan over medium-high. Chicken smooth-side down 5 min, pressing with the spatula for a hard sear. Flip, drop to low, lid on, ~3 min until cooked through (74°C / 165°F).",
      "Pour off or wipe out the excess fat. Add the glaze over medium heat — tilt the pan and spoon it over the chicken 2–3 min until syrupy and shiny. Chicken out to rest; reduce the sauce a touch more if it's thin.",
      "Meanwhile, broccoli in a second pan: oil over medium-high, florets cut-side down 2–3 min until charred, splash of water, cover 2 min, pinch of salt.",
      "Slice the chicken. Bowl: rice → broccoli → chicken → leftover pan glaze → sesame seeds + green onion."
    ],
    notes: [
      "The glaze is the classic Japanese golden ratio — 2 : 2 : 2 : 1 (tamari : sake : mirin : sugar). It thickens by reduction alone; no cornstarch.",
      "Store-bought teriyaki sauce is nearly always wheat — homemade is the only safe version. GF label-check: tamari, mirin.",
      "Purist teriyaki is just the four ingredients; 1 tsp grated ginger in the glaze is a fine non-traditional add.",
      "Meal prep: store chicken (glazed), broccoli, and rice separately, 3–4 days. The sauce alone keeps ~1 week — double it and keep it in a jar.",
      "Macros assume boneless skinless thighs. Swapping to breast cuts ~15–20g fat/serving; skin-on adds it back. Not all the glaze is consumed (some stays in the pan), so the real number runs a touch under."
    ]
  },

  {
    id: "lamb-dinner-party",
    title: "Lamb Dinner Party",
    emoji: "🐑",
    tags: ["Gluten-free", "Menu"],
    untested: true,
    time: "day before + ~2½ h",
    servings: 4,
    timeline: [
      { when: "Day before", what: "Panna cotta into jars (~15 min active). Optional head start: stem + ribbon the kale, make the dressing, toast the nuts and pistachios." },
      { when: "Morning", what: "Salt the lamb racks. Bake the gratin fully; cool it, foil on, leave at room temp (fridge if more than ~4 h out)." },
      { when: "T–1:30", what: "Massage the kale with half the dressing, back into the fridge — it improves from here. Set the table." },
      { when: "T–1:00", what: "Lamb out of the fridge to lose the chill. You are now ahead of schedule; act accordingly." },
      { when: "T–0:45", what: "Oven to 200°C. Rub the racks with the garlic-rosemary oil." },
      { when: "T–0:30", what: "Sear the racks, then into the oven with the thermometer. Gratin in alongside (foiled) to rewarm." },
      { when: "T–0:10", what: "Lamb out at 52°C, resting under loose foil. Finish the salad: remaining dressing, parm, nuts, pomegranate." },
      { when: "T — serve", what: "Carve the lamb at the table. Gratin out hot." },
      { when: "Mains served", what: "Toss the strawberries with sugar + balsamic — they macerate while everyone eats." },
      { when: "Dessert", what: "Top the jars: strawberries + their syrup, crushed pistachios, one mint leaf each." }
    ],
    dishes: [
      {
        name: "Panna cotta",
        emoji: "🍮",
        groups: [
          {
            name: "Panna cotta (5 small jars)",
            items: [
              { qty: 500, unit: "ml", name: "whipping cream (33–36%)" },
              { qty: 250, unit: "ml", name: "whole milk" },
              { qty: 70, unit: "g", name: "white sugar", note: "≈⅓ cup" },
              { qty: 2.25, unit: "tsp", name: "powdered gelatin", note: "most of one 7g packet — soft set for jars; 2½ tsp if unmolding" },
              { qty: 1, unit: "tbsp", name: "vanilla bean paste", note: "or 2 tsp extract — paste gives the fancy specks" },
              { qty: null, unit: "", name: "fine salt", note: "a pinch" }
            ]
          },
          {
            name: "Topping",
            items: [
              { qty: 300, unit: "g", name: "strawberries, hulled + sliced" },
              { qty: 2, unit: "tbsp", name: "white sugar" },
              { qty: 2, unit: "tsp", name: "balsamic vinegar" },
              { qty: 3, unit: "tbsp", name: "pistachios, toasted + crushed" },
              { qty: null, unit: "", name: "mint leaves", note: "one tiny one per jar" }
            ]
          }
        ],
        method: [
          "Pour the milk into a small bowl, sprinkle the gelatin evenly over it, and let it bloom 5–10 min until wrinkly and spongy.",
          "Heat the cream, sugar, and salt in a pot until steaming with small bubbles at the edges — NOT boiling (a hard boil weakens gelatin). Take it off the heat and stir in the vanilla.",
          "Whisk the bloomed gelatin-milk into the hot cream until completely dissolved — rub a drop between your fingers; if you feel grit, whisk more.",
          "Pour into the jars. Cool ~20 min on the counter, then refrigerate at least 6 h, ideally overnight. Keeps 3 days.",
          "30 min before dessert: toss the strawberries with the sugar and balsamic. Spoon over the jars with their syrup, then pistachios and a mint leaf."
        ],
        notes: [
          "The set: ¾ tsp gelatin per 250ml of liquid = soft, wobbly, jar-perfect. More gelatin = bouncier; only go up if you ever want to unmold onto plates.",
          "Naturally gluten-free, no substitutions needed."
        ]
      },
      {
        name: "Gratin",
        emoji: "🥔",
        groups: [
          {
            name: "Gratin dauphinoise (cream-only, no flour)",
            items: [
              { qty: 1000, unit: "g", name: "yukon gold potatoes", note: "don't rinse the slices — their starch thickens the cream" },
              { qty: 300, unit: "ml", name: "whipping cream" },
              { qty: 200, unit: "ml", name: "whole milk" },
              { qty: 2, unit: "", name: "garlic cloves, smashed" },
              { qty: 1.5, unit: "tsp", name: "fine salt" },
              { qty: null, unit: "", name: "nutmeg", note: "a few gratings" },
              { qty: 2, unit: "", name: "thyme sprigs", note: "optional" },
              { qty: 100, unit: "g", name: "gruyère, grated", note: "optional but it's a party" },
              { qty: null, unit: "", name: "butter", note: "for the dish" }
            ]
          }
        ],
        method: [
          "Infuse: bring the cream, milk, garlic, salt, nutmeg, and thyme to a bare simmer. Off the heat, steep 10 min, then fish out the garlic and thyme.",
          "Mandoline the potatoes ~3mm thick (guard or cut glove on). Do not rinse the slices.",
          "Layer the potatoes in a buttered baking dish, pour the infused cream over, and press flat — the liquid should come about ¾ of the way up.",
          "Foil on, bake at 175°C for 45 min. Foil off, scatter the gruyère, bake 25–30 min more until a knife slides in with zero resistance and the top is golden.",
          "Rest 15 min before serving — or make it entirely in the morning and rewarm, foiled, at 160°C for 20–30 min."
        ],
        notes: [
          "No flour anywhere — the unrinsed potato starch does the thickening, so it's naturally GF and silkier for it.",
          "Tenderness check is the knife, not the clock — ovens and potatoes vary."
        ]
      },
      {
        name: "Kale salad",
        emoji: "🥬",
        groups: [
          {
            name: "Salad",
            items: [
              { qty: 2, unit: "", name: "bunches lacinato kale", note: "≈200g stemmed — lacinato/dinosaur, not curly" },
              { qty: 30, unit: "g", name: "parmesan, shaved" },
              { qty: 40, unit: "g", name: "almonds or pine nuts, toasted" },
              { qty: 50, unit: "g", name: "pomegranate seeds", note: "or dried cranberries — the color pop" }
            ]
          },
          {
            name: "Lemon dressing",
            items: [
              { qty: 3, unit: "tbsp", name: "olive oil" },
              { qty: 2, unit: "tbsp", name: "lemon juice" },
              { qty: 1, unit: "tsp", name: "dijon mustard" },
              { qty: 1, unit: "tsp", name: "honey" },
              { qty: null, unit: "", name: "fine salt", note: "a good pinch" }
            ]
          }
        ],
        method: [
          "Strip the kale off its stems and slice into thin ribbons.",
          "Whisk the dressing.",
          "Massage the kale with half the dressing and a pinch of salt for 1–2 min, until it darkens and goes silky — this is the step that makes kale salad good.",
          "Rest at least 30 min, up to a day — kale is the one green that improves dressed.",
          "Just before serving: the rest of the dressing, then parmesan, nuts, and pomegranate."
        ],
        notes: [
          "The sharp lemon is doing a job here — it cuts the lamb and the cream. Keep the dressing aggressive.",
          "Dressing ratio: 3 : 2 : 1 : 1 (oil : lemon : dijon : honey)."
        ]
      },
      {
        name: "Lamb",
        emoji: "🐑",
        groups: [
          {
            name: "Rack of lamb",
            items: [
              { qty: 2, unit: "", name: "frenched racks of lamb", note: "~8 ribs each → 4 chops per person" },
              { qty: null, unit: "", name: "salt", note: "generously, up to a day ahead" },
              { qty: 2, unit: "tbsp", name: "olive oil" },
              { qty: 3, unit: "", name: "garlic cloves, grated" },
              { qty: 1, unit: "tbsp", name: "rosemary, finely chopped" },
              { qty: null, unit: "", name: "black pepper" }
            ]
          }
        ],
        method: [
          "Salt the racks up to 24 h ahead (morning-of is fine) and refrigerate uncovered. Out of the fridge 1 h before cooking.",
          "Oven to 200°C. Mix the oil, garlic, rosemary, and pepper; rub it over the racks.",
          "Sear in an oven-safe pan over medium-high: fat-side down 3–4 min until deeply browned, plus a quick minute on the ends.",
          "Fat-side up, into the oven 12–18 min. Pull at 52°C in the center — probe through the side of the rack to the middle of the eye.",
          "Rest 10 min under loose foil — carryover brings it to ~57°C, rosy medium-rare edge to edge.",
          "Slice between the bones into chops. Carve at the table; accept applause."
        ],
        notes: [
          "The thermometer is the entire skill: 52°C pull + 10 min rest = medium-rare, every time, first time.",
          "No breadcrumb crust — the garlic-rosemary oil is classic, simpler, and keeps it GF.",
          "Doneness reference: pull 47–49°C for rare, 52°C for medium-rare, 57°C for medium."
        ]
      }
    ],
    notes: [
      "The whole menu is naturally gluten-free: cream-only gratin, no crust on the lamb, panna cotta is inherently GF. Label-check: dijon and balsamic (almost always fine).",
      "Only the lamb happens while guests are there — everything else is done before the doorbell. That's the design.",
      "Kit check: instant-read thermometer (non-negotiable), mandoline + cut glove, 5–6 small jars (125–180ml).",
      "Macros: not yet broken down — this is a dinner-party menu, not a tracked staple. Ask if you want per-dish numbers added."
    ]
  }
];
