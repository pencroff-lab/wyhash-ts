# Repository Guidelines

## Project Structure & Module Organization
Source TypeScript lives in `src/`: `wyhash.ts` implements the Go-style port, `wyhash_bun.ts` is the pure TypeScript/Bun-compatible version, `wyhash.test.ts` exercises the core implementation, `wyhash_bun.test.ts` guards the Bun variant, and `wyhash.bench.ts` drives benchmarks. Keep `index.ts` as the small entry point that re-exports the public surface from `src/`. Generated benchmark bundles land in `build/` (via `bun build`) and should not be checked in. TypeScript compilation targets live in `dist/` (ESM + CJS output from `tsc`) and are what we publish. Reference notes stay in `docs/` (see `docs/std_wyhash.zig` and supporting material), while `tmp/` remains for scratch files—clean it before committing.

## Build, Test, and Development Commands
- `bun install` — install or refresh dependencies from `bun.lock`.
- `bun test` — run every Bun-powered unit test (`src/wyhash.test.ts`, `src/wyhash_bun.test.ts`).
- `bun run build` — invoke the dual `tsconfig` builds to refresh `dist/` (ESM + CJS + types).
- `bun run benchmark` — compile the benchmark bundle for Node (`prebenchmark`) and execute the Bun + Node timing harness.
- `bun run src/wyhash.bench.ts` — optional ad-hoc benchmark run directly in Bun without producing `build/` artifacts.

## Coding Style & Naming Conventions
Honor the strict TypeScript settings in `tsconfig.json` (ESNext modules with explicit extensions). Use tab indentation in `.ts` files, camelCase for functions and variables, PascalCase for exported types, and reserve uppercase constants for genuine invariants. Prefer `const` bindings, native `BigInt` math, and short comments that clarify complex branches (especially around wyhash mixing) without restating code.

## Testing Guidelines
Structure new suites like `wyhash.test.ts` and `wyhash_bun.test.ts`: clear `describe` groups and interpolated `it` titles that spell out inputs and expected hashes. When behavior changes, add seeds, odd-length strings, multibyte text, and Bun.hash parity checks to guard correctness. Run `bun test` before committing, and rerun benchmarks whenever performance-sensitive sections change. Place helper fixtures alongside the code they exercise and follow the `<feature>.test.ts` naming pattern.

## Commit & Pull Request Guidelines
Match the existing history with concise, present-tense subject lines (example: `extend wyhash seeds`). Squash noisy debug commits locally. Every PR should explain motivation, summarize the code impact, reference linked issues, and list the validation steps you ran (`bun test`, `bun run benchmark`, manual checks). Attach benchmark deltas whenever throughput moves in either direction.

## Benchmarking & Performance Checks
Mitata output from `bun run benchmark` (and any direct `bun run src/wyhash.bench.ts` sessions) should stay machine-readable; tweak logging only when it clarifies results. The `benchmark` script already runs both Bun and Node bundles—capture before/after snippets when throughput shifts materially.
