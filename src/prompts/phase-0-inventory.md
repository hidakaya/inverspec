# Phase 0 — Source inventory

## Goal
Classify every meaningful source file before deeper analysis. Phase 0 defines what later phases are allowed to treat as authoritative.

## Steps
1. Produce a full file listing excluding `node_modules`, `.git`, build artifacts, and vendored trees.
2. Mark files as: **in scope**, **excluded (reason)**, or **missing / to obtain**.
3. Record the inferred stack (frameworks, languages, package managers).
4. Save the inventory under `docs/spec/` before moving to Phase 1.

## Output checklist
- [ ] In-scope file list
- [ ] Exclusion list with reasons
- [ ] Missing / external dependency list
- [ ] Provisional stack summary
