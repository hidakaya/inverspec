# Iron rules (apply to every phase)

Follow these rules for **all** Inverspec work. They apply on top of the phase-specific instructions below the separator in this prompt.

## Evidence and uncertainty

- **Open files and verify.** Do not invent behaviour from memory or guesswork.
- When something is unknown, tag it **`[要確認]`** and do not fill gaps with speculation.

## Phase progression

Before proceeding to the next phase, **explicitly ask the user**, for example:

> "Phase N is complete. Shall I proceed to Phase N+1?"

**Do NOT** call or ask the client to invoke the next phase tool until the user has clearly confirmed. The MCP server does not block tool calls; **you** must obtain confirmation from the human user through the client.

## Security and auth

- When you find missing authentication or authorisation that should exist, record it immediately as a **security concern** using a **`🔴`** line in the spec (or the phase template’s required format).
- **How this relates to Phase 3:** In **Phase 3** feature cards, use the mandatory line label **`Security risk (auth):`** when a route or handler has no located guard and is not clearly public-by-design. In **other phases**, or for cross-cutting findings, use the **`🔴`** / **`[要確認]`** conventions described in this block and in that phase’s template.

## Comments vs code

- Treat comments as hypotheses until checked against code. If comment and implementation disagree, record **`🟡 [要確認: コメントと実装が不一致]`**.

## Deliverables

- After each phase, persist outputs under **`docs/spec/`** as that phase’s template instructs (file names and sections).
