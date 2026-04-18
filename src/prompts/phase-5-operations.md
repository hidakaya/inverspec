# Phase 5 — Environment and operations

## Goal
Capture how the system is configured, deployed, and operated in production — without ever recording secret values.

## Prerequisite
Phases 1–4 must be complete. Use the integration boundary table from Phase 1 as your checklist of systems to cover.

## Steps

### 5-A  Configuration inventory
List every environment variable and config file the application reads. **Record names and purpose only — never record actual values.**

| Name | Required | Default | Purpose |
|------|----------|---------|---------|
| `DATABASE_URL` | Yes | — | Primary DB connection string |
| `REDIS_URL` | Yes | — | Cache + queue broker |
| `SECRET_KEY_BASE` | Yes | — | Session / cookie signing |
| `STRIPE_SECRET_KEY` | Yes | — | Stripe API authentication |
| `RAILS_ENV` | Yes | `development` | Runtime environment |
| `LOG_LEVEL` | No | `info` | Logging verbosity |

Sources to check: `.env.example`, `config/`, `app.config.ts`, `settings.py`, `application.yml`, `values.yaml`, Helm charts.

### 5-B  Build and test pipeline
Document the steps to produce a production artifact:

1. **Install dependencies** — command, package manager, lock file used
2. **Lint / type-check** — tools and config files
3. **Test suite** — framework, test directories, coverage threshold
4. **Build / compile** — output directory, asset compilation, tree-shaking
5. **Container image** — `Dockerfile` base image, multi-stage build stages, image size optimisations

Note which steps run in CI vs locally, and which are required before deploy.

### 5-C  Deployment topology
Describe where and how the app runs in production:

- **Hosting platform**: Heroku, AWS ECS, GCP Cloud Run, Kubernetes, bare metal VPS, …
- **Process count**: web dynos / replicas, worker processes, scheduler
- **Scaling**: horizontal (replica count), vertical (instance size), auto-scaling triggers
- **Networking**: load balancer type, TLS termination, CDN, WAF
- **Database**: managed service name, region, read replica setup
- **Storage**: S3 / GCS bucket names (no credentials), CDN distribution

If infrastructure-as-code exists (`terraform/`, `infra/`, `k8s/`), summarise its structure.

### 5-D  Release process
Document how code moves from repository to production:

1. Branch strategy (GitFlow, trunk-based, …)
2. CI/CD platform (GitHub Actions, CircleCI, GitLab CI, Jenkins, …) — reference the pipeline config file
3. Deployment method (rolling update, blue-green, canary, Heroku release phase)
4. Database migration strategy (run before/after deploy, zero-downtime approach)
5. Rollback procedure

### 5-E  Observability
Document how the system is monitored:

| Concern | Tool / destination | Notes |
|---------|--------------------|-------|
| Application logs | Datadog / CloudWatch / Papertrail | Format: JSON structured |
| Error tracking | Sentry / Bugsnag | Alert threshold: new issue |
| Metrics | Prometheus + Grafana / Datadog | Key dashboards |
| Tracing | OpenTelemetry / Jaeger | Sampling rate |
| Uptime / health | PagerDuty / UptimeRobot | `/health` endpoint |
| Performance | New Relic / Scout APM | Apdex target |

Note the health-check endpoint path, expected response, and what it checks.

### 5-F  Runbook items
Flag any operational risks or non-obvious procedures found in code or comments:

- Manual steps required after deploy
- Known slow migrations or lock risks
- Cron jobs that must not overlap
- Third-party rate limits that affect operations
- Data retention or purge jobs
- On-call escalation hints embedded in code comments

### 5-G  Save the operations document
Write `docs/spec/05-operations.md` with all findings above.

## Output checklist
- [ ] Configuration inventory (names + purpose, no values)
- [ ] Build and test pipeline steps
- [ ] Deployment topology description
- [ ] Release and rollback process
- [ ] Observability stack table
- [ ] Runbook items and operational risks
- [ ] `docs/spec/05-operations.md` saved
