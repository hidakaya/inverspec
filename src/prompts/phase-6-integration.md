# Phase 6 — Specification integration

## Goal
Merge the Phase 0–5 artifacts into a single, coherent technical specification that a new engineer can read without needing the original codebase.

## Prerequisite
All five phase documents must exist under `docs/spec/`:
- `00-inventory.md`
- `01-architecture.md`
- `02-data-model.md`
- `03-features.md`
- `04-business-logic.md`
- `05-operations.md`

## Steps

### 6-A  Audit each phase document
Read every phase document and note:
- **Gaps**: topics promised in the checklist but not actually documented
- **Contradictions**: the same fact stated differently across documents
- **Stale references**: file paths or names that were renamed between phases
- **Orphaned items**: entities or features described in one phase but never referenced in others

Create a gap/contradiction log as a scratch list before editing any document.

### 6-B  Normalise terminology
Establish a canonical glossary:

| Term used in code | Canonical spec term | Notes |
|-------------------|---------------------|-------|
| `user` / `account` / `member` | **User** | All mean the same entity |
| `order` / `cart` / `basket` | **Order** | Cart becomes Order on checkout |

Apply this glossary uniformly across all phase documents. Update any inconsistency in place.

### 6-C  Add cross-references
Where Phase 3 (features) refers to a service described in Phase 4 (business logic), add a link:
> See [Phase 4 — Business logic § Rule: Order Pricing](./04-business-logic.md#rule-order-pricing)

Where Phase 2 (data model) defines an entity referenced in Phase 3, link back to the entity sheet. Make the document graph navigable.

When `02-data-model.md` contains multiple ER diagram sections (domain-split layouts), use heading anchors in links — for example `./02-data-model.md#er--auth-domain` — so each link targets the correct diagram block.

### 6-D  Write the executive summary
Create `docs/spec/README.md` containing:

1. **What this system does** — one paragraph, written for a non-technical stakeholder
2. **Who uses it** — primary actors and their goals
3. **Key technical choices** — stack, architecture style, major trade-offs (1–2 sentences each)
4. **How to navigate this spec** — which document to read first depending on the reader's role:
   - New backend engineer → start with Phase 1 (architecture) then Phase 4 (business logic)
   - New frontend engineer → start with Phase 3 (features / API contract)
   - DBA / data engineer → start with Phase 2 (data model)
   - DevOps / SRE → start with Phase 5 (operations)
5. **Open questions** — unresolved ambiguities discovered during the reverse-engineering

### 6-E  Resolve gaps
For any gap found in 6-A that can be resolved by re-reading the codebase, do so and fill in the missing section. For gaps that require domain knowledge unavailable from the code, leave a clearly marked placeholder:

```markdown
> **[OPEN]** The discount stacking policy is not evident from the code.
> Confirmed with team that only one coupon applies per order — see Slack thread 2024-01.
```

### 6-F  Final consistency pass
Before publishing:
- [ ] All Mermaid diagrams render without errors
- [ ] All internal links resolve
- [ ] No actual secret values appear in any document
- [ ] File names in the spec match actual file paths in the codebase
- [ ] Phase checklist items are all checked off (or marked `[N/A — reason]`)

### 6-G  Publish the specification
Final document set under `docs/spec/`:

```
docs/spec/
├── README.md              ← Executive summary and navigation guide
├── 00-inventory.md
├── 01-architecture.md
├── 02-data-model.md
├── 03-features.md
├── 04-business-logic.md
└── 05-operations.md
```

Optionally produce a single-file bundle:
```bash
cat docs/spec/README.md docs/spec/0*.md > docs/spec/full-spec.md
```

## Output checklist
- [ ] Gap / contradiction log reviewed and resolved (or marked `[OPEN]`)
- [ ] Canonical glossary applied across all documents
- [ ] Cross-references added between related sections
- [ ] `docs/spec/README.md` executive summary written
- [ ] All Mermaid diagrams render correctly
- [ ] No secret values in any document
- [ ] All internal links resolve
- [ ] Final document set published under `docs/spec/`
