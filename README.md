# Suki Media

Suki Media is a pnpm monorepo for personal media collections.

## Apps

| App | Development URL | Data provider | Features |
| --- | --- | --- | --- |
| Anime | http://localhost:3000 | Kitsu and AniList | Existing anime and manga lists and collections |
| Books | http://localhost:3001 | Hardcover GraphQL | Book search and browser-local collection |
| Movies | http://localhost:3002 | TMDB REST | Movie search and browser-local collection |

The original anime/manga application lives unchanged in `apps/anime`. The books
and movies apps share their collection page, app shell, theme, and provider
response types through packages in `packages/`.

## Setup

Install dependencies:

```bash
pnpm install
```

Copy `.env.example` to `.env` and configure the services you use. Book search
requires `HARDCOVER_API_TOKEN`; movie search requires `TMDB_API_TOKEN`. Tokens
are read only by server-side API routes and are never sent to the browser.

## Development

```bash
pnpm dev          # anime/manga app
pnpm dev:books    # books app
pnpm dev:movies   # movies app
pnpm dev:all      # all apps
```

## Validation

```bash
pnpm test
pnpm typecheck
pnpm lint-check
pnpm build
```

## Workspace layout

```text
apps/
  anime/    Existing anime and manga application
  books/    Hardcover-backed book collection
  movies/   TMDB-backed movie collection
packages/
  providers/  Server API clients and response normalization
  ui/         Shared collection UI, app shell, and theme
```
