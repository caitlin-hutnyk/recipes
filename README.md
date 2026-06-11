# Recipes

Personal recipe site: https://caitlin-hutnyk.github.io/recipes/

Plain HTML/CSS/JS, no build step — GitHub Pages serves `main` at the root.

## Adding a recipe

Recipes live in [recipes.js](recipes.js). Copy an existing object and edit it; the comment block at the top documents every field. Pushing to `main` deploys.

Scaling: every quantity is driven by one multiplier (the servings stepper or "scale by meat" input), so sauce ratios stay correct at any batch size. Groups marked `fixed: true` are per-bowl assembly amounts that don't scale with the batch.
