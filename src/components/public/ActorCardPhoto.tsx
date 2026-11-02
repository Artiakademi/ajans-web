"use client";

import Image from "next/image";
import { User } from "lucide-react";
import type { Actor } from "@/types";
import { resolveActorCoverUrl } from "@/lib/actors/cover";
import { fullName, cn } from "@/lib/utils";

/**
 * Shared portrait for roster grid + homepage marquee.
 * Uses signed cover URL with primary→first-photo fallback; placeholder if none.
 * `unoptimized` avoids Next Image optimizer caching expired signed URLs.
 */
export function ActorCardPhoto({
  actor,
  className,
  sizes,
  priority,
}: {
  actor: Actor;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  const name = fullName(actor.firstName, actor.lastName);
  const src = resolveActorCoverUrl(actor);

  if (!src) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-bg-muted text-ink-soft",
          className,
        )}
        aria-hidden
      >
        <User size={40} strokeWidth={1.25} />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`${name} - +Akademi oyuncusu`}
      fill
      className={cn("object-cover", className)}
      sizes={sizes}
      priority={priority}
      unoptimized
    />
  );
}
