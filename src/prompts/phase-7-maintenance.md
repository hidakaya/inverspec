# Phase 7 — Ongoing specification maintenance

## Goal

Keep the technical specification aligned with the codebase after the initial pass. Prefer **partial updates**: only rewrite sections that are affected by changed files.

## Context

You are updating an existing spec under `docs/spec/`. Use the `projectPath` provided. Read real files; do not rely on memory.

## Triggers (conceptual)

| Trigger | Typical approach | Target |
|--------|------------------|--------|
| Around `git push` | Optional hook / script that detects changed files and builds an update prompt | Files touched since last spec sync |
| Manual (“update the spec”) | This workflow | Paths the user names, or recent `git diff` |

## 7-A — Map changed file patterns to phases

| Changed file pattern | Update phase |
|---------------------|--------------|
| `app/models/`, `db/schema.rb`, `migrations/`, `*.prisma`, `*Entity.java`, `models.py` | Phase 2 (data model) |
| `app/controllers/`, `routes/`, `*/urls.py`, `*Controller.java`, `routers/` | Phase 3 (features) |
| `app/services/`, `app/jobs/`, `*Service.java`, `services/`, `tasks.py` | Phase 4 (business logic) |
| `config/`, `docker-compose.yml`, `terraform/`, `*.tf`, `Dockerfile`, `.github/workflows/` | Phase 5 (operations) |
| Changes spanning several areas | Phase 6 (integration) as well |

## 7-B — Manual partial-update procedure

The user supplies:

- **Changed files:** paths of modified source files  
- **Target spec:** e.g. `docs/spec/Phase[N]-[name].md`

Execute:

### 1. Understand the diff

Compare the changed files with the current spec and list what behaviour or structure changed.

### 2. Locate spec sections

Identify which sections of the spec must be rewritten. Leave untouched sections unchanged.

### 3. Output updates only

For each section that needs an update, output **only** that section’s new body.

**Format:** start with `### [Section title]` and then the full rewritten section.

### 4. Update summary table

| Updated section | Summary of change | Change type (add / fix / remove) |
|----------------|-------------------|----------------------------------|

## Rules for this phase

- Do not output sections that are unrelated to the code change.
- Do not write from speculation; use **`[要確認]`** where facts are missing.
- If comments disagree with code, record **`🟡 [要確認: コメントと実装が不一致]`**.
- Update the spec footer **version** and **last updated** fields when your workflow includes them.
