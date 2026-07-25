import { Container } from "@mui/material";
import type { Metadata } from "next";
import { AnimeCollectionGrid } from "@/components/AnimeCollectionGrid";
import { CollectionAddButton } from "@/components/CollectionAddButton";
import { CollectionViewWrapper } from "@/components/CollectionViewWrapper";
import { MediaLibraryHeader } from "@/components/MediaLibraryHeader";
import { getLibraryPageTitle } from "@/lib/library-page-title";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "Anime Collection – Tsuki Anime" };
export const dynamic = "force-dynamic";

export default async function AnimeCollectionPage() {
  const title = await getLibraryPageTitle("anime", "collection");
  const [items, session] = await Promise.all([
    prisma.animeCollectionItem.findMany({
      include: { anime: true },
      orderBy: [{ anime: { titleEn: "asc" } }, { createdAt: "asc" }],
    }),
    getSession(),
  ]);
  const isAuthenticated = !!session;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <MediaLibraryHeader
        title={title}
        action={
          isAuthenticated ? <CollectionAddButton type="anime" /> : undefined
        }
      />

      <CollectionViewWrapper
        items={items}
        type="anime"
        gridComponent={AnimeCollectionGrid}
        isAuthenticated={isAuthenticated}
      />
    </Container>
  );
}
