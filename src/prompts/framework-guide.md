# Framework guide (bundled reference)

This file replaces the Claude skill’s external `references/framework-guide.md`. Use it when you need **where to look first** for a given stack. Phase-specific steps still follow the Phase 1 / Phase 4 prompt bodies; this guide adds **path-level orientation** only.

## Quick reference — primary files by stack

| Stack | Typical files and directories to open first |
|-------|-----------------------------------------------|
| Ruby on Rails | `Gemfile` / `config/routes.rb` / `db/schema.rb` / `app/models/` / `app/controllers/` / `app/services/` |
| Laravel | `composer.json` / `routes/` / `database/migrations/` / `app/Models/` / `app/Services/` / `app/Jobs/` |
| Next.js | `package.json` / `pages/` or `app/` / `next.config.js` / `lib/` / `components/` |
| PHP + Smarty | `composer.json` / PHP front controller or routing / `templates/` / `lib/` / `classes/` |
| Java (Spring Boot) | `pom.xml` or `build.gradle` / `src/main/java/**/*Controller` / `*Service` / `*Entity` / `*Repository` |
| Python (Django) | `requirements.txt` or `pyproject.toml` / `urls.py` / `views.py` / `models.py` / `serializers.py` |
| Python (FastAPI) | `requirements.txt` or `pyproject.toml` / `main.py` / `app/routers/` / `app/models/` / `app/schemas/` / `app/crud/` |
| Python (Flask) | `requirements.txt` or `pyproject.toml` / `app/__init__.py` / `blueprints/` / `models.py` / `forms.py` |

If the stack is **WordPress**, start from `functions.php`, theme/plugin entry points, then custom classes and registered hooks/filters.

## Architecture pass (Phase 1) — default reading order

Regardless of framework, establish context in this order:

1. **Dependency manifest** — `Gemfile`, `composer.json`, `package.json`, `requirements.txt`, `pyproject.toml`, `pom.xml`, `build.gradle.kts`, etc.
2. **Routing** — `config/routes.rb`, `routes/web.php` / `api.php`, Next `app/` or `pages/`, Django `urls.py`, Spring `@RequestMapping` controllers, Express/Nest router modules, `.htaccess` or front controller for legacy PHP.
3. **Application configuration** — `config/`, `nuxt.config.ts`, `next.config.js`, `settings.py`, `application.yml`, `.env.example` (names only; do not paste secret values).
4. **`README.md`** if it exists — deployment hints, required services, local setup.

Then map **entry processes** (HTTP, workers, CLI, SSR) and one **end-to-end request or job** as described in the Phase 1 prompt.

## Business logic pass (Phase 4)

**Authoritative search order for services, jobs, and domain rules** is defined in the Phase 4 prompt (`framework-specific files to read`). Follow that table first; it is broader (e.g. NestJS, Nuxt paths) than this quick reference.

Use this guide when you need a **mental model of the repo layout** or a **cross-check** against the skill’s original quick-reference table. When the two differ slightly, prefer the **Phase 4 prompt** for logic-layer paths.

## Stack fingerprint hints (optional)

Use alongside Phase 0 inventory when classifying files:

| Signals on disk | Likely stack |
|-----------------|--------------|
| `Gemfile` + `app/` + `db/schema.rb` | Rails |
| `composer.json` + `app/Http/` | Laravel |
| `package.json` + `next.config.js` | Next.js |
| `.php` + Smarty-like templates under `templates/` | PHP + Smarty |
| `pom.xml` / Gradle + `src/main/java/` | Java (often Spring Boot) |
| `manage.py` + `settings.py` | Django / DRF |
| `requirements.txt` / `pyproject.toml` with FastAPI + `main.py` | FastAPI |
| Same with Flask + `app.py` or `app/` package | Flask |

---

*End of framework guide.*
