import type { Actor, ActorPhoto } from "@/types";

/** Photos with a usable signed URL, cover (sort_order 0) first. */
export function photosWithUrl(photos: ActorPhoto[] = []): ActorPhoto[] {
  return photos.filter((p) => Boolean(p.url?.trim()));
}

/**
 * Resolve the card/list cover URL.
 * Prefer primary/cover (sort_order === 0 / isCover), else first photo with a URL.
 */
export function resolveActorCoverUrl(
  actor: Pick<Actor, "coverPhotoUrl" | "photos">,
): string {
  const usable = photosWithUrl(actor.photos);
  const cover = usable.find((p) => p.isCover) || usable[0];
  if (cover?.url) return cover.url;
  return actor.coverPhotoUrl?.trim() || "";
}
