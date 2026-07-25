import type { Metadata } from "next";
import ProviderMediaDetailPage from "@/components/ProviderMediaDetailPage";
import { getAnimeDetailSnapshot } from "@/lib/media-detail";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "Anime Details – Tsuki Anime" };
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string; kitsuId: string }> };

export default async function AnimeDetailPage({ params }: Props) {
  const { slug, kitsuId } = await params;
  const [session, detail] = await Promise.all([
    getSession(),
    getAnimeDetailSnapshot(kitsuId),
  ]);
  const anime = detail
    ? await prisma.anime.findFirst({
        where: { id: detail.id },
        select: {
          id: true,
          kitsuId: true,
          anilistId: true,
          listEntry: true,
          collectionItems: true,
        },
      })
    : null;

  return (
    <ProviderMediaDetailPage
      kitsuId={detail ? detail.kitsuId : kitsuId}
      fallbackTitle={detail?.titleEn ?? detail?.titleRomaji ?? slug}
      mediaType="anime"
      mediaId={detail?.id ?? null}
      anilistId={detail?.anilistId ?? null}
      initialDetail={detail}
      hasSession={Boolean(session)}
      listEntry={anime?.listEntry ?? null}
      collectionCount={anime?.collectionItems.length ?? 0}
      collectionFormats={
        anime?.collectionItems.map((item) => item.format) ?? []
      }
      collectionItems={anime?.collectionItems ?? []}
    />
  );
}
