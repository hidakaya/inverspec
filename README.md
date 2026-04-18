# mcp-server-inverspec

[![npm version](https://img.shields.io/npm/v/mcp-server-inverspec)](https://www.npmjs.com/package/mcp-server-inverspec)
[![Node.js](https://img.shields.io/node/v/mcp-server-inverspec)](https://nodejs.org)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

An [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server that guides AI assistants through reverse-engineering a technical specification from an undocumented codebase — the **Inverspec** workflow.

It exposes **seven tools** (Phase 0–6). Each tool accepts a `projectPath` and returns a detailed Markdown prompt template that instructs the AI what to analyse, what to document, and exactly where to save the output.

**Supported stacks:** Rails, Laravel, PHP+Smarty, Next.js, Express, Spring Boot, FastAPI, Flask, Django, and any other framework the AI can read.

---

## Quick start

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "inverspec": {
      "command": "npx",
      "args": ["-y", "mcp-server-inverspec"]
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "inverspec": {
      "command": "npx",
      "args": ["-y", "mcp-server-inverspec"]
    }
  }
}
```

### Claude Code (CLI)

```bash
claude mcp add inverspec -- npx -y mcp-server-inverspec
```

---

## Usage

Once the server is connected, ask your AI assistant:

> "Use inverspec to create a technical specification for the project at `/path/to/my-app`"

The assistant will call the phase tools in order, reading the codebase and writing output to `docs/spec/` inside the target project.

You can also invoke phases individually:

> "Run inverspec phase 2 on `/path/to/my-app` to document the data model"

---

## How it works

The workflow has seven phases, each building on the previous:

| Phase | Tool | What gets documented |
|-------|------|----------------------|
| 0 | `inverspec_phase_0_inventory` | File tree, tech stack, scope boundary |
| 1 | `inverspec_phase_1_architecture` | Entry points, layers, request lifecycle, integrations |
| 2 | `inverspec_phase_2_data_model` | Entities, ER diagram, migrations, validation rules |
| 3 | `inverspec_phase_3_features` | Routes, API contracts, UI screens, webhooks |
| 4 | `inverspec_phase_4_business_logic` | Domain rules, state machines, permissions, jobs |
| 5 | `inverspec_phase_5_operations` | Config, deploy pipeline, observability, runbooks |
| 6 | `inverspec_phase_6_integration` | Cross-references, glossary, executive summary |

Each phase tool returns a structured prompt template that tells the AI:
- **Goal** — what to achieve
- **Steps** — concrete instructions with framework-specific hints
- **Output checklist** — exactly what files to write under `docs/spec/`

---

## Output

After a full run, the target project will contain:

```
docs/spec/
├── README.md              ← Executive summary and navigation guide
├── 00-inventory.md        ← File tree, stack summary
├── 01-architecture.md     ← Architecture map, request flow
├── 02-data-model.md       ← ER diagram, entity sheets
├── 03-features.md         ← API catalogue, feature cards
├── 04-business-logic.md   ← Domain rules, state machines
└── 05-operations.md       ← Config, deploy, observability
```

---

## Local development

```bash
git clone https://github.com/hidakaya/inverspec.git
cd mcp-server-inverspec
npm install
npm run build
```

To use your local build with Claude Desktop, change `npx -y mcp-server-inverspec` to `node /absolute/path/to/dist/index.js`.

### Project layout

```
src/
├── index.ts          — MCP server entry point (stdio transport)
├── tools/            — One file per phase tool
└── prompts/          — Markdown prompt templates (copied to dist/ on build)
```

---

## Requirements

- Node.js 18 or later
- An MCP-compatible client (Claude Desktop, Cursor, Claude Code, etc.)

---

## License

ISC
