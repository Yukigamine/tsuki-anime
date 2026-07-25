import type { Metadata } from "next";
import ProviderMediaDetailPage from "@/components/ProviderMediaDetailPage";
import { getMangaDetailSnapshot } from "@/lib/media-detail";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "Manga Details – Tsuki Anime" };
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string; kitsuId: string }> };

export default async function MangaDetailPage({ params }: Props) {
  const { slug, kitsuId } = await params;
  const [session, detail] = await Promise.all([
    getSession(),
    getMangaDetailSnapshot(kitsuId),
  ]);
  const manga = detail
    ? await prisma.manga.findFirst({
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
      mediaType="manga"
      mediaId={detail?.id ?? null}
      anilistId={detail?.anilistId ?? null}
      initialDetail={detail}
      hasSession={Boolean(session)}
      listEntry={manga?.listEntry ?? null}
      collectionCount={manga?.collectionItems.length ?? 0}
      collectionItems={manga?.collectionItems ?? []}
    />
  );
}
