# Phase 1 — Architecture map

## Goal
Build a system map: entry points, layers, routing, and how requests flow through the app.

## Steps
1. Identify HTTP/API entry points, CLI entry points, and background workers.
2. Summarize major modules or packages and their responsibilities.
3. Note cross-cutting concerns: auth, logging, caching, feature flags.
4. Save `docs/spec/architecture.md` (or equivalent) with diagrams if helpful.

## Output checklist
- [ ] Entry points and runtime topology
- [ ] Request / job lifecycle (high level)
- [ ] Known integration boundaries (DB, queues, third-party APIs)
