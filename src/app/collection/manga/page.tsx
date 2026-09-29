import { Container } from "@mui/material";
import type { Metadata } from "next";
import { CollectionAddButton } from "@/components/CollectionAddButton";
import { CollectionViewWrapper } from "@/components/CollectionViewWrapper";
import { MangaCollectionGrid } from "@/components/MangaCollectionGrid";
import { MediaLibraryHeader } from "@/components/MediaLibraryHeader";
import { getLibraryPageTitle } from "@/lib/library-page-title";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "Manga Collection – Tsuki Anime" };
export const dynamic = "force-dynamic";

export default async function MangaCollectionPage() {
  const title = await getLibraryPageTitle("manga", "collection");
  const [items, session] = await Promise.all([
    prisma.mangaCollectionItem.findMany({
      include: { manga: true },
      orderBy: [{ manga: { titleEn: "asc" } }, { createdAt: "asc" }],
    }),
    getSession(),
  ]);
  const isAuthenticated = !!session;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <MediaLibraryHeader
        title={title}
        action={
          isAuthenticated ? <CollectionAddButton type="manga" /> : undefined
        }
      />

      <CollectionViewWrapper
        items={items}
        type="manga"
        gridComponent={MangaCollectionGrid}
        isAuthenticated={isAuthenticated}
      />
    </Container>
  );
}
