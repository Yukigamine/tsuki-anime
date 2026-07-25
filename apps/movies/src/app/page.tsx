import { CollectionPage } from "@suki-media/ui";

export default function MoviesPage() {
  return (
    <CollectionPage
      mediaName="Movies"
      providerName="The Movie Database (TMDB)"
      storageKey="suki-media:movies"
    />
  );
}
