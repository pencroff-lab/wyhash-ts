# Repository Guidelines

## Project Structure & Module Organization
Source TypeScript lives in `src/`: `wyhash.ts` implements hashing, `wyhash.test.ts` captures regression cases, and `wyhash.bench.ts` drives benchmarks. Keep `index.ts` as a small entry point that delegates to `src/`. Generated assets belong in `build/` (from `bun build`) and should not be checked in. Reference notes stay in `docs/` (see `docs/wyhash.zig`), while `tmp/` is only for scratch files—clean it before committing.

## Build, Test, and Development Commands
- `bun install` — install or refresh dependencies from `bun.lock`.
- `bun run index.ts` — execute the library entry point for quick manual checks.
- `bun test` — run every Bun-powered unit test, including `src/wyhash.test.ts`.
- `bun run bench` — launch the live benchmark harness for immediate throughput numbers.
- `bun run compile_bench && bun run node_bench` — emit and evaluate Node-compatible benchmarks inside `build/` when comparing runtimes.

## Coding Style & Naming Conventions
Honor the strict TypeScript settings in `tsconfig.json` and keep modules in ESNext format with explicit extensions. Use tab indentation in `.ts` files, camelCase for functions and variables, PascalCase for exported types, and reserve uppercase constants for genuine invariants. Prefer `const` bindings, native `BigInt` math, and short comments that clarify complex branches without restating code.

## Testing Guidelines
Structure new suites like `wyhash.test.ts`: clear `describe` groups and interpolated `it` titles that spell out inputs and expected hashes. When behavior changes, add seeds, odd-length strings, and multibyte text cases to guard correctness. Run `bun test` before committing, and rerun benchmarks whenever performance-sensitive sections change. Place helper fixtures alongside the code they exercise and follow the `<feature>.test.ts` naming pattern.

## Commit & Pull Request Guidelines
Match the existing history with concise, present-tense subject lines (example: `extend wyhash seeds`). Squash noisy debug commits locally. Every PR should explain motivation, summarize the code impact, reference linked issues, and list the validation steps you ran (`bun test`, benchmarks, manual checks). Attach benchmark deltas whenever throughput moves in either direction.

## Benchmarking & Performance Checks
Mitata output from `bun run bench` should stay machine-readable; tweak logging only when it clarifies results. Compare Bun and Node runs (`bun run node_bench`) before merging hot-path changes, and capture before/after snippets in the PR if throughput shifts materially.
