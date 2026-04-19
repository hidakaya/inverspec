# Phase 0 — Source inventory

## Goal
Classify every meaningful source file before deeper analysis. Phase 0 defines the authoritative boundary for all later phases — only in-scope files are analysed.

## Context
You are reverse-engineering a technical specification from an existing codebase. Start at the `projectPath` provided. Do not infer anything from memory; read the files.

## Steps

### 0-A  Produce the file tree
Run a recursive listing of the project root, excluding:
- `node_modules/`, `vendor/`, `.bundle/`
- `.git/`, `.svn/`
- Build output directories (`dist/`, `build/`, `out/`, `target/`, `public/assets/`)
- IDE folders (`.idea/`, `.vscode/`, `.cursor/`)
- Binary and media files (`*.png`, `*.jpg`, `*.pdf`, `*.mp4`, `*.woff`, `*.ico`)
- Lock files (`package-lock.json`, `yarn.lock`, `Gemfile.lock`, `composer.lock`, `poetry.lock`)

### 0-B  Infer the tech stack
From `package.json`, `Gemfile`, `composer.json`, `requirements.txt`, `pyproject.toml`, `pom.xml`, `build.gradle`, or similar:
- Programming language(s) and runtime version
- Web framework(s) (Rails, Laravel, Spring Boot, Next.js, FastAPI, …)
- Database driver / ORM (ActiveRecord, Eloquent, Prisma, TypeORM, SQLAlchemy, …)
- Frontend framework (React, Vue, Angular, Blade, Smarty, …)
- Test framework, task runner, CI system

### 0-C  Classify each file
Assign one of three states to every file:

| State | Meaning |
|---|---|
| **In scope** | Source code that encodes business logic or behavior to be documented |
| **Excluded** | Generated, vendored, or irrelevant — record the reason |
| **Missing / to obtain** | Referenced but absent (e.g. env files, private packages) |

### 0-D  Identify key entry points (preview only)
List the top-level entry points you will investigate in later phases. Do not analyse them yet.

Examples:
- `config/routes.rb`, `routes/web.php`, `src/app.ts`, `main.py`
- `Dockerfile`, `docker-compose.yml`, `deploy/`, `infra/`
- `db/schema.rb`, `prisma/schema.prisma`, `migrations/`

### 0-E  Save the inventory
Write `docs/spec/00-inventory.md` with the outputs from steps 0-A through 0-D, **using the same section headings as in step 0-G** (estimated stack, excluded files, files needing clarification, missing files, confidentiality reminder, confidential handling summary table, Phase 1–5 work scope). That file is the single source of truth for scope in later phases.

<!-- split: security-signoff -->

### 0-F Confidentiality gate (before sending anything to an AI)
> **Before any file contents are sent to an AI**, the human operator must consciously review the items below. Real secrets in model context can leak via chat history, logs, or vendor retention.

#### Must NOT share with an AI (real values)

| Category | Examples | What to do |
|---|---|---|
| Live credentials | Production `.env`, decrypted `credentials`, API keys, DB passwords | Share only `.env.example` or **variable names** — never real values |
| Personal data (PII) | Production DB dumps, CSVs with names/emails/addresses | Anonymise or replace with masked samples before sharing |
| Internal infrastructure | Production IPs, hostnames, absolute paths, VPN details | Replace with dummy placeholders (e.g. `192.168.x.x`, `/app/…`) |
| Private keys & certs | `.pem`, `.key`, `id_rsa`, client certificates | **Do not share** |

#### OK to share (with conditions)

| Category | Why it is usually acceptable |
|---|---|
| `.env.example` | Names and intent only — no real secrets |
| `config/database.yml` (dev) | OK if hosts are `localhost` / non-production only |
| Application source (`.rb`, `.py`, `.ts`, `.java`, …) | OK after you confirm no embedded real secrets |
| `schema.rb`, DDL, migrations | Schema only — no end-user data |

Scan for hard-coded secrets (examples — adapt to the project’s language):

```bash
grep -rn "password\s*=\s*['\"][^'\"]" .
grep -rn "api_key\s*=\s*['\"][^'\"]" .
grep -rn "secret\s*=\s*['\"][^'\"]" .
```

Redact or exclude findings; document each item in the **Confidential handling summary** table (in `docs/spec/00-inventory.md` and again in the 0-G sign-off block).

### 0-G User sign-off (before Phase 1)
1. Finish `docs/spec/00-inventory.md` with all sections filled (aligned with the template below — **interpretation ②**: full single-sheet sign-off, matching the skill’s 0-6 structure).
2. Paste the filled template **into the chat** for the human, using the **same** facts as the file. Obtain **explicit approval** (e.g. yes, or a list of edits) before starting Phase 1.

Use this Markdown shape (fill placeholders):

```markdown
## Phase 0: Inventory sign-off

### Estimated tech stack
- Framework: [result]
- Language(s): [result]
- Major libraries: [result]

### Excluded files (not read in later phases)
- `path/to/file` — reason

### Files needing clarification
- `path/to/file` — [needs clarification: e.g. no caller found in codebase]

### Missing files (recommended to obtain)
- `.env.production` — needed to understand prod env (pass `.env.example` with names only, not real values)

### Confidentiality reminder
Before passing files to an AI, complete the checklist in **step 0-F** above.

### Confidential handling summary

| # | Category | Reason for exclusion/redaction | File(s) | Action taken |
|---|---|---|---|---|
| 1 | Credentials | API key was hard-coded | `config/example.rb` | Redacted to dummy value for analysis |

### Phase 1–5 work scope (in-scope files)
- `path/` (N files)
- …

**Does this look correct? Reply explicitly** (e.g. yes, or list changes) **before proceeding to Phase 1.**
```

## Output checklist
- [ ] File tree (in-scope files only, grouped by directory)
- [ ] Exclusion table (path → reason)
- [ ] Missing / external dependency list
- [ ] Tech stack summary (language, framework, DB, frontend, test tooling)
- [ ] Key entry point preview
- [ ] `docs/spec/00-inventory.md` saved (sections aligned with step 0-G)
- [ ] Step **0-F** checklist applied; sensitive paths documented in the confidential handling summary
- [ ] Step **0-G** sign-off message posted in chat and **explicit human approval** received before Phase 1

## Notes
- If the project has multiple apps (monorepo), treat each app root separately and note the boundary.
- Do not read file *contents* in Phase 0 beyond what is needed to infer the stack. Deep reading happens in Phases 1–5.
