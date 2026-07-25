import type { Metadata } from "next";
import UserProfileContent from "@/components/UserProfileContent";
import { getProfileSummary } from "@/lib/profile-summary";
import { getAuthStatus } from "@/lib/provider-links";

const username = process.env.NEXT_PUBLIC_KITSU_USERNAME ?? "";
export const metadata: Metadata = { title: `About ${username}` };

export const dynamic = "force-dynamic";

export default async function MePage() {
  const linkedAccounts = await getAuthStatus();
  const profileSummary = await getProfileSummary(
    linkedAccounts.ANILIST.username,
  );

  return (
    <UserProfileContent
      username={username}
      profileSummary={profileSummary}
      linkedAccounts={{
        kitsu: linkedAccounts.KITSU.username,
        anilist: linkedAccounts.ANILIST.username,
      }}
    />
  );
}
