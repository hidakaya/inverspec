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
Write `docs/spec/00-inventory.md` containing the output from steps 0-A through 0-D. Use this file as the single source of truth about scope for all later phases.

## Output checklist
- [ ] File tree (in-scope files only, grouped by directory)
- [ ] Exclusion table (path → reason)
- [ ] Missing / external dependency list
- [ ] Tech stack summary (language, framework, DB, frontend, test tooling)
- [ ] Key entry point preview
- [ ] `docs/spec/00-inventory.md` saved

## Notes
- If the project has multiple apps (monorepo), treat each app root separately and note the boundary.
- Do not read file *contents* in Phase 0 beyond what is needed to infer the stack. Deep reading happens in Phases 1–5.
- Flag any files that look security-sensitive (`.env.example`, `secrets.yml`) so they are never accidentally included in output.
