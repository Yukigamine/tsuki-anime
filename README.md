# Tsuki Media

Tsuki Media is a pnpm monorepo for personal media collections.

## Applications

| App | Development URL | Documentation |
| --- | --- | --- |
| Anime and manga | http://localhost:3000 | [apps/anime](apps/anime/README.md) |
| Books | http://localhost:3001 | [apps/books](apps/books/README.md) |
| Movies | http://localhost:3002 | [apps/movies](apps/movies/README.md) |

Shared provider clients and UI components live in `packages/providers` and
`packages/ui`.

## Setup

```bash
pnpm install
cp .env.example .env
```

Each application has its own `.env.example`. Copy it to `.env` in that app's
directory and configure its credentials. App values take precedence over
shared root values.

## Workspace commands

```bash
pnpm dev:all
pnpm build
pnpm test
pnpm typecheck
pnpm lint-check
```

See each application README for individual development, build, and deployment
commands.
