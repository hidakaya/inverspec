# mcp-server-inverspec

Model Context Protocol (MCP) server that registers **seven tools** (Phase 0–6). Each tool returns an English Markdown prompt template for reverse-engineering a technical specification from an existing codebase (aligned with the Inverspec / spec-writer workflow).

## Prerequisites

- Node.js 18+
- Dependencies installed: `npm install`

## Build

```bash
npm run build
```

This compiles TypeScript to `dist/` and copies prompt templates into `dist/prompts/` so they load correctly at runtime.

## Run (stdio)

```bash
npm start
```

Do not write informational logs to **stdout** when using stdio; the MCP protocol uses stdout for JSON-RPC. This server logs readiness to **stderr** only.

## Cursor MCP registration

Project-local configuration lives in [`.cursor/mcp.json`](.cursor/mcp.json). After `npm run build`, enable the **inverspec** server in Cursor’s MCP settings if required.

Adjust `command` / `args` if you prefer `npx tsx` or a different Node path.

## Repository layout

- `src/index.ts` — MCP entrypoint (stdio transport)
- `src/tools/` — Tool registration per phase
- `src/prompts/` — Markdown templates copied into `dist/prompts/` on build

## Tools

| Tool name | Purpose |
| --- | --- |
| `inverspec_phase_0_inventory` | Phase 0 — source inventory |
| `inverspec_phase_1_architecture` | Phase 1 — architecture map |
| `inverspec_phase_2_data_model` | Phase 2 — data model |
| `inverspec_phase_3_features` | Phase 3 — features / routes / APIs |
| `inverspec_phase_4_business_logic` | Phase 4 — business logic & jobs |
| `inverspec_phase_5_operations` | Phase 5 — operations & config |
| `inverspec_phase_6_integration` | Phase 6 — final spec integration |
