# mcp-server-inverspec

[![npm version](https://img.shields.io/npm/v/mcp-server-inverspec)](https://www.npmjs.com/package/mcp-server-inverspec)
[![Node.js](https://img.shields.io/node/v/mcp-server-inverspec)](https://nodejs.org)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

An [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server that guides AI assistants through reverse-engineering a technical specification from an undocumented codebase — the **Inverspec** workflow.

**Supported stacks:** Rails, Laravel, PHP+Smarty, Next.js, Express, Spring Boot, FastAPI, Flask, Django, and any other framework the AI can read.

---

## Plans

| Phase | Tool | Free | Pro |
|-------|------|------|-----|
| 0 | inverspec_phase_0_inventory | yes | yes |
| 1 | inverspec_phase_1_architecture | yes | yes |
| 2 | inverspec_phase_2_data_model | yes | yes |
| 3 | inverspec_phase_3_features | - | yes |
| 4 | inverspec_phase_4_business_logic | - | yes |
| 5 | inverspec_phase_5_operations | - | yes |
| 6 | inverspec_phase_6_integration | - | yes |

**Pro**: $19/month or $190/year (2 months free) — Get a license: https://inverspec.lemonsqueezy.com

---

## Quick start

### Claude Desktop (Free)

Add to ~/Library/Application Support/Claude/claude_desktop_config.json (macOS):

{
  "mcpServers": {
    "inverspec": {
      "command": "npx",
      "args": ["-y", "mcp-server-inverspec"]
    }
  }
}

### Claude Desktop (Pro)

Set your license key via environment variable:

{
  "mcpServers": {
    "inverspec": {
      "command": "npx",
      "args": ["-y", "mcp-server-inverspec"],
      "env": {
        "INVERSPEC_LICENSE_KEY": "YOUR-LICENSE-KEY"
      }
    }
  }
}

Or create a config file at ~/.config/inverspec/config.json:

{
  "license_key": "YOUR-LICENSE-KEY"
}

### Cursor

Add to .cursor/mcp.json in your project root:

{
  "mcpServers": {
    "inverspec": {
      "command": "npx",
      "args": ["-y", "mcp-server-inverspec"],
      "env": {
        "INVERSPEC_LICENSE_KEY": "YOUR-LICENSE-KEY"
      }
    }
  }
}

### Claude Code (CLI)

claude mcp add inverspec -- npx -y mcp-server-inverspec

---

## Usage

Once the server is connected, ask your AI assistant:

"Use inverspec to create a technical specification for the project at /path/to/my-app"

The assistant will call the phase tools in order, reading the codebase and writing output to docs/spec/ inside the target project.

You can also invoke phases individually:

"Run inverspec phase 2 on /path/to/my-app to document the data model"

---

## How it works

Each phase tool accepts a projectPath and returns a detailed Markdown prompt template.

| Phase | What gets documented |
|-------|----------------------|
| 0 | File tree, tech stack, scope boundary |
| 1 | Entry points, layers, request lifecycle, integrations |
| 2 | Entities, ER diagram, migrations, validation rules |
| 3 | Routes, API contracts, UI screens, webhooks |
| 4 | Domain rules, state machines, permissions, jobs |
| 5 | Config, deploy pipeline, observability, runbooks |
| 6 | Cross-references, glossary, executive summary |

---

## Output

After a full run, the target project will contain:

docs/spec/
  README.md              - Executive summary and navigation guide
  00-inventory.md        - File tree, stack summary
  01-architecture.md     - Architecture map, request flow
  02-data-model.md       - ER diagram, entity sheets
  03-features.md         - API catalogue, feature cards
  04-business-logic.md   - Domain rules, state machines
  05-operations.md       - Config, deploy, observability

---

## Requirements

- Node.js 18 or later
- An MCP-compatible client (Claude Desktop, Cursor, Claude Code, etc.)

---

## License

ISC
