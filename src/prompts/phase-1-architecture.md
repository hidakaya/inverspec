# Phase 1 — Architecture map

## Goal
Build a system map: entry points, layers, routing, and how a single request flows end-to-end through the application.

## Prerequisite
Phase 0 inventory (`docs/spec/00-inventory.md`) must be complete. Operate only on in-scope files identified there.

## Steps

### 1-A  Identify runtime topology
Determine how the application is actually deployed and run:
- Is it a monolith, modular monolith, or set of services?
- What processes run? (web server, worker, scheduler, CLI, SSR server)
- What does the `Procfile`, `docker-compose.yml`, Kubernetes manifests, or `package.json` scripts reveal?

### 1-B  Map entry points
For each process, locate the exact file and line where execution begins or where inbound requests are accepted:

| Process | Entry file | Startup mechanism |
|---|---|---|
| HTTP server | e.g. `src/index.ts:14` | `node dist/index.js` |
| Background worker | e.g. `workers/queue.rb` | Sidekiq / BullMQ / Celery |
| CLI | e.g. `bin/console` | Direct invocation |

### 1-C  Trace the request / job lifecycle
Pick the single most representative request type (e.g. authenticated REST API call, or page render) and trace it step by step:

1. Inbound transport (HTTP, WebSocket, queue message)
2. Middleware stack (auth, CORS, rate limit, session, body parsing)
3. Router → controller / handler dispatch
4. Service / use-case layer (if any)
5. Data access (ORM query, cache hit, external API call)
6. Response serialisation and return

Write this as a numbered prose walkthrough, not pseudo-code.

### 1-D  Describe major modules / packages
For each top-level directory or package in scope, write one sentence describing its responsibility. Note dependencies between modules (A calls B, A owns B's schema, etc.).

### 1-E  Cross-cutting concerns
Document concerns that apply across the whole application:

- **Authentication / authorisation**: mechanism, token type, where enforced
- **Session management**: storage (cookie, Redis, DB), TTL
- **Caching**: layers, keys, invalidation strategy
- **Logging**: format, destination, structured or plaintext
- **Error handling**: global handler, error types, HTTP status mapping
- **Feature flags**: system used, where evaluated

### 1-F  Integration boundaries (preview)
List external systems the app communicates with. Full analysis comes in later phases.

| System | Protocol | Direction | Notes |
|---|---|---|---|
| PostgreSQL | TCP / ORM | Outbound | Primary datastore |
| Redis | TCP | Outbound | Cache + queues |
| Stripe API | HTTPS REST | Outbound | Payments |
| SendGrid | HTTPS REST | Outbound | Email delivery |

### 1-G  Save the architecture document
Write `docs/spec/01-architecture.md` with all findings above. Include a Mermaid `graph LR` or `sequenceDiagram` if it adds clarity.

## Output checklist
- [ ] Runtime topology and process list
- [ ] Entry point table
- [ ] End-to-end request lifecycle walkthrough
- [ ] Module / package responsibility map
- [ ] Cross-cutting concern inventory
- [ ] Integration boundary preview table
- [ ] `docs/spec/01-architecture.md` saved
