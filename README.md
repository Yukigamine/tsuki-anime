This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Let poor Neon sleep!

Redis (`REDIS_URL`) caches browsing data; Neon remains the durable source for
saved titles, lists, collections, authentication, and sync logs.

- `library:v1:all`: one 24-hour snapshot of saved anime/manga metadata, list
  entries, collection items, and provider-ID mappings. List, collection, detail,
  and profile-total pages share it. An absent title is not a browsing restriction.
- `library:v1:revision`: a small invalidation counter. A rebuild cannot publish
  its snapshot if a write changed the revision in the meantime.
- `provider:metadata:v1:<anime|manga>:<kitsuId>`: metadata for titles browsed
  outside the local database, fetched from Kitsu and cached for 24 hours. These
  visits do not create Neon records. Provider-confirmed 404s expire in 5 minutes;
  outages, rate limits, and invalid responses are not cached as missing titles.

List/collection edits, title resolution, and completed or failed syncs invalidate
the library snapshot. Local metadata is stored once in that snapshot rather than
duplicated under each ID. Previous `anime:list:*`, `manga:list:*`, and title cache
keys can expire naturally. Malformed detail IDs return not-found before loading
the library. Cached dates are restored to Date objects for existing consumers.

A cold or expired library cache still queries Neon; Redis failures fall back to
Neon and emit `[cache]` errors. Authentication and sync operations still access
Neon. Browser components continue to fetch supplemental provider information
(genres, streaming links, related titles). This change does not migrate or remove
database records.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
