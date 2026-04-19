# Phase 3 — Feature specifications

## Goal
Describe every externally visible capability: HTTP routes, screen flows, API endpoints, WebSocket channels, and the complete input/output/error contract for each.

## Prerequisite
Phase 1 architecture map and Phase 2 data model must be complete. Use the route file(s) identified in Phase 1 as your starting catalogue.

## Steps

> **Read handler implementation files one at a time.** You may build the route catalogue from router definition files in one pass, but when reading **controllers, route handlers, GraphQL resolvers, or RPC procedure bodies**, work through **one implementation file (or one cohesive module) per pass**. Do not paste many large handler files into a single turn — accuracy drops sharply.

> **Trace authentication and authorisation in implementation code.** For each route or procedure, identify where guards attach — for example: `before_action` / `authenticate_*` (Rails), `middleware` / route-level guards (Express / Fastify / Nest), `@PreAuthorize` / filter chains (Spring), `permission_classes` / `authentication_classes` (Django REST), `Policy` / `Gate` (Laravel), resolver or field directives (GraphQL). If an endpoint is **intentionally public**, say so explicitly in the catalogue or feature card.

> **`Security risk (auth):` is mandatory** when no authentication or authorisation guard can be located for a route or handler **and** you cannot justify it as **public-by-design**. Add exactly one line using that label (see the feature card template). **Omit the line entirely when there is no issue** — do not write "none", "N/A", or empty filler (same convention as **Schema risk:** in Phase 2).

### 3-A  Build the route / endpoint catalogue
Enumerate all routes or endpoints from the router definition file(s). For REST APIs:

| Method | Path | Handler | Auth required | Notes |
|--------|------|---------|--------------|-------|
| GET | `/api/v1/users` | `UsersController#index` | Yes (admin) | Paginated |
| POST | `/api/v1/users` | `UsersController#create` | No | Registration |
| GET | `/api/v1/users/:id` | `UsersController#show` | Yes (self or admin) | |

For GraphQL: list queries, mutations, and subscriptions with their root types.
For tRPC / RPC frameworks: list procedures and their router paths.

### 3-B  Specify each feature
For each meaningful feature (not each individual route), write a feature card:

```
## Feature: <Name>

**Routes:** GET /path, POST /path
**Actor:** Who initiates this (end user, admin, API consumer, background job)
**Authentication:** Required / Optional / Public by design — one line (where the guard lives in code, or why it is public)
**Authorisation:** Who may perform this (roles, policies, ownership rules, or "any authenticated user")

Security risk (auth): <omit this line entirely if none>

### Request
- Parameters / body fields (name, type, required, validation rule)
- Headers (Content-Type, Authorization, etc.)

### Response
- Success shape (HTTP status, response body schema)
- Pagination info if applicable

### Error cases
| Condition | HTTP status | Error code / message |
|-----------|-------------|----------------------|
| Not found | 404 | `resource_not_found` |
| Unauthorised | 401 | `invalid_token` |
| Validation failure | 422 | field-level error map |

### Side effects
- DB writes (which tables, which operations)
- Emails / notifications sent
- Cache keys invalidated
- Events published
- External API calls triggered
```

### 3-C  Document UI screens (if applicable)
If the application has a frontend, map each screen or page component to:
- The URL / route it renders at
- The backend API(s) it calls
- The data it displays and the actions it allows
- Any optimistic updates, loading states, or error states visible to the user

### 3-D  Document WebSocket / real-time channels (if applicable)
- Channel names and subscription parameters
- Events emitted by server, events accepted from client
- Authentication/authorisation for channel access

### 3-E  Document file upload / download flows (if applicable)
- Accepted MIME types and size limits
- Storage destination (local, S3, GCS, …)
- Access control (public URL, signed URL, proxied download)

### 3-F  Document public-facing webhooks (if applicable)
- Inbound webhook endpoints (URL, method, expected payload, signature verification)
- Outbound webhook events (which events, payload schema, retry policy)

### 3-G  Save the feature specifications
Write `docs/spec/03-features.md` (or split into per-domain files under `docs/spec/features/`).

## Output checklist
- [ ] Every route or feature has a defensible authentication and authorisation story, **or** a `Security risk (auth):` line where no guard is found and the surface is not justified as public-by-design
- [ ] Complete route / endpoint catalogue (table format)
- [ ] Feature card for each major feature
- [ ] UI screen map (if frontend exists)
- [ ] Real-time / WebSocket documentation (if applicable)
- [ ] File handling documentation (if applicable)
- [ ] Webhook documentation (if applicable)
- [ ] `docs/spec/03-features.md` saved
