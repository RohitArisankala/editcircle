/** Helpers for turning YouTube/Vimeo share URLs into embeddable player URLs. */

export function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export function getVimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

/** Returns an iframe-embeddable URL, or null if the URL isn't a known host. */
export function toEmbedUrl(url: string): string | null {
  const yt = getYouTubeId(url);
  if (yt) return `https://www.youtube.com/embed/${yt}?rel=0`;
  const vimeo = getVimeoId(url);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo}`;
  return null;
}

/** Best-effort poster image for an embed URL when no thumbnail is set. */
export function autoThumbnail(url: string): string | null {
  const yt = getYouTubeId(url);
  if (yt) return `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`;
  return null;
}
