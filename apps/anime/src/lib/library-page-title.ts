export type MediaType = "anime" | "manga";
export type LibraryType = "list" | "collection";

export function getLibraryPageTitle(
  mediaType: MediaType,
  libraryType: LibraryType,
): string {
  const displayName = process.env.NEXT_PUBLIC_LIST_DISPLAYNAME?.trim();
  const mediaLabel = mediaType === "anime" ? "Anime" : "Manga";
  const libraryLabel = libraryType === "list" ? "List" : "Collection";
  const title = `${mediaLabel} ${libraryLabel}`;

  return displayName ? `${displayName}'s ${title}` : title;
}
