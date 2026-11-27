---
name: portfolio-system
description: The design system of Ali's portfolio. Load it before writing or changing any page, component or style in this repo, and when reviewing a piece. It says which tokens and components exist, the rules, and how the build check works.
---

# portfolio-system

Every agent that builds UI in this repo loads this first. The system is approved: you use it, you don't redesign it.

## Before writing any UI

1. Read `DESIGN.md` (the rules in plain words).
2. Read `src/components/system/manifest.json` (what each base component is for, when to use it and when not).
3. Look up values in `src/styles/tokens.json` (or `src/styles/tokens.css`). Never in your memory.

## While building

- Use a system component when one does the job. If none does, a new one goes in `src/components/system/`, gets its entry in the manifest (name, file, purpose, use, avoid, props, example) and appears in `/styleguide` by itself.
- Every colour, font size, font family, radius, spacing, shadow and duration is a `var(--token)`. Text sizes: only `--fs-display`, `--fs-section`, `--fs-chapter`, `--fs-text`, `--fs-label`.
- A case wears its agent's colours with `accentVars(agent)` from `src/lib/utils.ts` (`--acc`, `--on-acc`). Agent colours are backgrounds; text on them uses the `--on-` pair.
- Serif titles: the important part in italics, written `**part**` and rendered with `emph()`.
- Never: blur, gradients, shadows (except `--shadow-card` on the agent card), DM Sans, DM Mono, Caveat, the tokens in `src/styles/legacy-tokens.css`.
- Missing a value? It is a question of taste: stop and ask Ali. Don't add a token: tokens come from `estilos/tokens.css` and change only with her yes (then `npm run tokens`).

## The check

`npm run check` (also the first step of `npm run build`) fails on anything outside the system. Run it before every commit.

- If it fails in a file you touched, fix the code. Don't touch `src/styles/system-debt.json` by hand, and don't silence the rule.
- After rebuilding an old page, run `npm run check:system -- --shrink` so its debt goes down for good. Debt never goes up.

## Reviewing a piece

The reviewer compares the piece with the system as well as with the brief:

1. `npm run check` passes.
2. Take screenshots of `/styleguide` (components section) at 1440 and 390 px and put them next to the piece: the same component must look the same in both. A difference is a "Se nota" finding.
3. Anything that looks styled by hand (a colour, size or spacing that isn't on `/styleguide`) is a finding, even if the check missed it.
