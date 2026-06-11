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
 *   item      { qty, unit, name, note }
 *             - qty:  number, or null for "to taste" type items
 *             - unit: "g", "ml", "tbsp", "tsp", "cup", or "" for counts
 *             - note: optional, shown muted in parentheses
 *   method    array of step strings
 *   notes     array of note strings
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
          { qty: 60, unit: "g", name: "unsalted butter, softened" },
          { qty: 2, unit: "tbsp", name: "white (shiro) miso paste" },
          { qty: 1, unit: "tsp", name: "grated fresh ginger" },
          { qty: 1, unit: "tsp", name: "lemon juice" }
        ]
      },
      {
        name: "Rice & quinoa",
        items: [
          { qty: 200, unit: "g", name: "short-grain or jasmine rice, rinsed" },
          { qty: 90, unit: "g", name: "quinoa, rinsed well" },
          { qty: 600, unit: "ml", name: "water", note: "~500ml in a rice cooker" },
          { qty: 0.5, unit: "tsp", name: "fine salt" }
        ]
      },
      {
        name: "Ponzu glaze",
        items: [
          { qty: 60, unit: "ml", name: "tamari (GF soy sauce)" },
          { qty: 60, unit: "ml", name: "fresh lemon juice (or yuzu)" },
          { qty: 2, unit: "tbsp", name: "mirin" },
          { qty: 1, unit: "tbsp", name: "rice vinegar" },
          { qty: 1, unit: "tbsp", name: "honey or maple syrup" },
          { qty: 1, unit: "tsp", name: "grated fresh ginger" }
        ]
      },
      {
        name: "Salmon",
        items: [
          { qty: 4, unit: "", name: "salmon fillets, skin-on", note: "~170g each" },
          { qty: 2, unit: "tbsp", name: "kewpie or regular mayonnaise" },
          { qty: 1, unit: "tbsp", name: "white miso paste" },
          { qty: 4, unit: "tbsp", name: "gluten-free furikake" },
          { qty: 1, unit: "tbsp", name: "neutral oil (avocado or grapeseed)" }
        ]
      },
      {
        name: "Bok choy",
        items: [
          { qty: 4, unit: "", name: "baby bok choy, halved lengthwise" },
          { qty: 1, unit: "tbsp", name: "neutral oil" },
          { qty: 2, unit: "", name: "garlic cloves, minced" },
          { qty: 1, unit: "tbsp", name: "tamari" },
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
      "For meal prep: crust raw salmon up to 24 hrs ahead, or freeze for up to 1 month."
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
          { qty: 4, unit: "", name: "garlic cloves" },
          { qty: 4, unit: "", name: "chilies", note: "add to taste" },
          { qty: 2, unit: "tbsp", name: "neutral oil" },
          { qty: 340, unit: "g", name: "pork, minced", note: "≈1.5 cups" },
          { qty: 2, unit: "tbsp", name: "gluten-free oyster sauce" },
          { qty: 2, unit: "tbsp", name: "tamari (GF soy)" },
          { qty: 0.5, unit: "tbsp", name: "fish sauce" },
          { qty: 1, unit: "tbsp", name: "flavor seasoning", note: "MSG / GF seasoning powder — see notes" },
          { qty: 1, unit: "tbsp", name: "white sugar" },
          { qty: 1, unit: "cup", name: "holy basil leaves" }
        ]
      },
      {
        name: "Sides",
        items: [
          { qty: 0.68, unit: "cup", name: "jasmine rice, uncooked", note: "½ cup per 250g of meat" },
          { qty: 2, unit: "", name: "eggs", note: "2–3, usually" },
          { qty: 2, unit: "", name: "baby bok choy, halved lengthwise" },
          { qty: 0.5, unit: "tbsp", name: "neutral oil" },
          { qty: 1, unit: "", name: "garlic clove, minced" },
          { qty: 0.5, unit: "tbsp", name: "tamari" },
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
      "GF label-check shortlist: oyster sauce, fish sauce, seasoning powder."
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
          { qty: 200, unit: "g", name: "ahi tuna, sushi-grade, cubed", note: "maybe 200g — scale to what you've got" }
        ]
      },
      {
        name: "Spicy Kewpie sauce",
        items: [
          { qty: 4, unit: "tbsp", name: "Kewpie mayonnaise" },
          { qty: 1, unit: "tbsp", name: "tamari (GF soy)" },
          { qty: 1, unit: "tsp", name: "sriracha", note: "1–2 tsp — start at 1, adjust for heat" },
          { qty: 1, unit: "tsp", name: "rice vinegar" },
          { qty: 1, unit: "tsp", name: "sesame oil" }
        ]
      },
      {
        name: "Rice seasoning",
        items: [
          { qty: 1, unit: "tbsp", name: "rice vinegar" },
          { qty: 1.5, unit: "tsp", name: "sugar" },
          { qty: 0.25, unit: "tsp", name: "salt" }
        ]
      },
      {
        name: "Base",
        items: [
          { qty: 0.5, unit: "cup", name: "sushi rice, uncooked", note: "⅓–½ cup" },
          { qty: null, unit: "", name: "lettuce", note: "the other half of the bowl — or all lettuce, or all rice, idc" }
        ]
      },
      {
        name: "Toppings",
        items: [
          { qty: 0.5, unit: "", name: "mango, cubed", note: "half-ish" },
          { qty: 0.5, unit: "", name: "avocado" },
          { qty: null, unit: "", name: "cucumber, sliced" },
          { qty: null, unit: "", name: "corn" },
          { qty: null, unit: "", name: "edamame, shelled" },
          { qty: null, unit: "", name: "furikake", note: "a fuck ton" },
          { qty: null, unit: "", name: "sesame seeds" },
          { qty: null, unit: "", name: "seaweed flakes", note: "maybe more" }
        ]
      }
    ],
    method: [
      "Cook the rice. While still warm, gently fold through the rice seasoning (stir the vinegar, sugar, and salt until dissolved first). Let cool slightly.",
      "Whisk the sauce ingredients together in a bowl.",
      "Cube the tuna and toss it in the sauce (or keep the sauce as a drizzle on top, your call).",
      "Build the bowl: rice and/or lettuce base, then tuna, mango, avocado, cucumber, corn, and edamame. Finish with a fuck ton of furikake, sesame seeds, and more seaweed flakes if you're feeling it."
    ],
    notes: [
      "The rice seasoning is classic sushi-su (vinegar : sugar : salt) — the amount suits the ⅓–½ cup of uncooked rice here.",
      "GF label-check shortlist: furikake, tamari, sriracha (most sriracha is fine, e.g. Huy Fong, but check)."
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
          { qty: 450, unit: "g", name: "lean ground beef", note: "1 packet / ~1 lb" },
          { qty: 1, unit: "", name: "packet taco seasoning", note: "label-check for GF" },
          { qty: 2, unit: "", name: "yams or sweet potatoes", note: "1–2, depending on size" }
        ]
      },
      {
        name: "Assemble — per bowl",
        fixed: true,
        items: [
          { qty: null, unit: "", name: "lettuce", note: "a fuckton" },
          { qty: null, unit: "", name: "tomatoes" },
          { qty: 1, unit: "cup", name: "fat-free cottage cheese", note: "¾–1 cup" },
          { qty: 0.5, unit: "", name: "avocado", note: "half or full" },
          { qty: null, unit: "", name: "1/3 of the beef" },
          { qty: null, unit: "", name: "1/3 of the potatoes" },
          { qty: null, unit: "", name: "hot honey", note: "a good drizzle" }
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
      "GF label-check shortlist: taco seasoning (a frequent gluten offender) and hot honey."
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
          { qty: 840, unit: "g", name: "extra lean ground turkey" },
          { qty: 796, unit: "ml", name: "diced tomatoes", note: "1 large can" },
          { qty: 398, unit: "ml", name: "black beans, drained and rinsed", note: "1 can" },
          { qty: 0.75, unit: "", name: "bell pepper, diced" },
          { qty: 2, unit: "", name: "yellow onions, diced" },
          { qty: 4, unit: "", name: "garlic cloves, pressed", note: "4–5" },
          { qty: 2, unit: "tbsp", name: "double-concentrate tomato paste" },
          { qty: 3, unit: "", name: "chipotle peppers in adobo, seeded", note: "2–3, to heat tolerance" },
          { qty: 2, unit: "tbsp", name: "adobo sauce", note: "from the chipotle can" },
          { qty: null, unit: "", name: "frozen corn + frozen veggie mix", note: "a lot" },
          { qty: 1.5, unit: "tbsp", name: "chili powder" },
          { qty: 1, unit: "tsp", name: "cumin" },
          { qty: 1, unit: "tsp", name: "smoked paprika" },
          { qty: null, unit: "", name: "lime juice or apple cider vinegar", note: "a splash, at the end" }
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
      "1 serving = 1 cup. Full pot at ×1: ~2,394 cal, ~226 g protein, ~9 cups → roughly 266 cal / 25 g protein per cup.",
      "No added salt — deliberate (the adobo and seasoning carry it).",
      "GF label-check shortlist: chipotles in adobo (some brands, e.g. La Costeña, thicken the sauce with wheat flour) and chili powder blends.",
      "This is the Apr 12 batch — the chipotle version."
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
          { qty: 450, unit: "g", name: "beef, sliced thin against the grain", note: "~1 lb flank or sirloin" },
          { qty: 1, unit: "tsp", name: "cornstarch" },
          { qty: null, unit: "", name: "baking soda", note: "a pinch" },
          { qty: 1, unit: "tbsp", name: "tamari (GF soy)" },
          { qty: 1, unit: "tsp", name: "neutral oil" }
        ]
      },
      {
        name: "Sauce",
        items: [
          { qty: 0.25, unit: "cup", name: "tamari (GF soy)" },
          { qty: 1, unit: "tbsp", name: "rice vinegar" },
          { qty: 1, unit: "tbsp", name: "brown sugar" },
          { qty: 1, unit: "tsp", name: "sesame oil" },
          { qty: 1, unit: "tsp", name: "cornstarch", note: "mix into the sauce before it hits the pan" }
        ]
      },
      {
        name: "Stir fry",
        items: [
          { qty: null, unit: "", name: "olive oil, for cooking" },
          { qty: null, unit: "", name: "garlic", note: "fresh, or ~1 tsp garlic powder" },
          { qty: null, unit: "", name: "ginger", note: "fresh, or ~½ tsp ground ginger" },
          { qty: 1, unit: "", name: "onion, sliced" },
          { qty: 1, unit: "", name: "broccoli crown, in florets" },
          { qty: 1, unit: "", name: "bell pepper, sliced" },
          { qty: 2, unit: "", name: "green onions, sliced", note: "2–3" }
        ]
      },
      {
        name: "To serve",
        items: [
          { qty: 0.9, unit: "cup", name: "basmati rice, uncooked", note: "½ cup per 250g of meat" },
          { qty: null, unit: "", name: "sesame seeds" }
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
      "Beef amount (450g) and veg counts are sensible defaults — the sauce and velveting ratios are the exact part."
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
          { qty: 600, unit: "g", name: "boneless chicken thighs", note: "4–5 thighs; skin-on = richer, breast = leaner" },
          { qty: 1, unit: "tbsp", name: "neutral oil" }
        ]
      },
      {
        name: "Teriyaki glaze — 2 : 2 : 2 : 1",
        items: [
          { qty: 3, unit: "tbsp", name: "tamari (GF soy)" },
          { qty: 3, unit: "tbsp", name: "sake", note: "rice-based, GF — or sub extra mirin + splash of water" },
          { qty: 3, unit: "tbsp", name: "mirin" },
          { qty: 1.5, unit: "tbsp", name: "white sugar" }
        ]
      },
      {
        name: "Bowl",
        items: [
          { qty: 500, unit: "g", name: "broccoli florets", note: "1 large head; bagged or frozen (thawed) = zero knife work" },
          { qty: 1, unit: "tbsp", name: "neutral oil" },
          { qty: 1.2, unit: "cup", name: "short-grain or jasmine rice, uncooked", note: "½ cup per 250g of meat" },
          { qty: null, unit: "", name: "sesame seeds" },
          { qty: 2, unit: "", name: "green onions, sliced", note: "optional" }
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
      "Meal prep: store chicken (glazed), broccoli, and rice separately, 3–4 days. The sauce alone keeps ~1 week — double it and keep it in a jar."
    ]
  }
];
