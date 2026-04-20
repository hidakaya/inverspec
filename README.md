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
| 7 | inverspec_phase_7_maintenance | - | yes |

**Pro**: $19/month or $190/year (2 months free) — Get a license: https://inverspec.lemonsqueezy.com

---

## Quick start

> **macOS ユーザーへ：** `npx` は macOS の PATH 競合（ImageMagick の `import` コマンドなど）により動作しない場合があります。以下の **npm グローバルインストール** を推奨します。

### Claude Desktop — npm グローバルインストール（macOS 推奨）

**ステップ 1：グローバルインストール**

```bash
npm install -g mcp-server-inverspec
```

**ステップ 2：バイナリのフルパスを確認**

```bash
which mcp-server-inverspec
# 例: /opt/homebrew/bin/mcp-server-inverspec
#     /usr/local/bin/mcp-server-inverspec
```

**ステップ 3：`claude_desktop_config.json` に記述**

`~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "inverspec": {
      "command": "node",
      "args": ["/opt/homebrew/lib/node_modules/mcp-server-inverspec/dist/index.js"]
    }
  }
}
```

> `args` のパスは `which mcp-server-inverspec` の結果に応じて調整してください。  
> 例：`/opt/homebrew/bin/mcp-server-inverspec` と表示された場合、実体は  
> `/opt/homebrew/lib/node_modules/mcp-server-inverspec/dist/index.js` です。

**Pro の場合（ライセンスキーあり）：**

```json
{
  "mcpServers": {
    "inverspec": {
      "command": "node",
      "args": ["/opt/homebrew/lib/node_modules/mcp-server-inverspec/dist/index.js"],
      "env": {
        "INVERSPEC_LICENSE_KEY": "YOUR-LICENSE-KEY"
      }
    }
  }
}
```

---

### Claude Desktop — npx（Linux / Windows）

macOS 以外の環境、または PATH 競合が発生しない場合：

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

**Pro の場合：**

```json
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
```

---

### Cursor

`.cursor/mcp.json` に記述：

```json
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
```

---

### Claude Code（CLI）

```bash
claude mcp add inverspec -- npx -y mcp-server-inverspec
```

---

## Usage

> **Important:** Inverspec runs on **Claude Desktop** (local). It does not work on the browser-based claude.ai because that environment cannot access your local filesystem.

### Finding your project path

Inverspec requires the **absolute path** to your project root.

**macOS / Linux** — open a terminal, navigate to your project, and run `pwd`:

```bash
cd ~/Development/my-app
pwd
# → /Users/your-username/Development/my-app
```

**Windows** — open the folder in Explorer, then click the address bar to reveal the full path.

**Can't find the path?** You can also zip your project and drag-and-drop it into the Claude Desktop chat:

```bash
# macOS / Linux
cd ~/Development
zip -r my-app.zip my-app \
  --exclude "*/node_modules/*" \
  --exclude "*/.git/*" \
  --exclude "*/target/*"
```

---

### Recommended prompt — run all phases in one go

Open a new chat in Claude Desktop and type:

```
Create a technical specification for /Users/your-username/Development/my-app.
Run Phase 0 through 6 without stopping for confirmation.
Save the output of each phase to docs/spec/ inside the project.
```

> On the first run, Claude Desktop will ask for file-access permission a few times. Click **Allow**. Subsequent calls within the same session require no further confirmation.

You can also run a single phase:

```
Run only Phase 2 (data model) on /Users/your-username/Development/my-app
```

---

## How it works

Each phase tool accepts a projectPath and returns a detailed Markdown prompt template.

| Phase | What gets documented |
|-------|----------------------|
| 0 | File tree, tech stack, scope boundary |
| 1 | Entry points, layers, request lifecycle, integrations |
| 2 | Entities, ER diagram(s) including domain-split layouts for large schemas, migrations, validation rules |
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

## claude.ai vs Claude Desktop

| Environment | Local file access | Supported |
|-------------|------------------|-----------|
| Claude Desktop app | ✅ Yes | ✅ Recommended |
| claude.ai (browser) | ❌ No | Upload a zip instead |
| Cursor | ✅ Yes | ✅ |
| Claude Code (CLI) | ✅ Yes | ✅ |

---

## Requirements

- Node.js 18 or later
- An MCP-compatible client (Claude Desktop, Cursor, Claude Code, etc.)

---

## Feedback & Support

Found a bug or have a feature request? → [Open an Issue](https://github.com/hidakaya/inverspec/issues)

Have a question or idea to discuss? → [Start a Discussion](https://github.com/hidakaya/inverspec/discussions)

---


## License

ISC
