export function assetBaseName(assetUrl: string): string {
  const pathname = assetUrl.split("?")[0] ?? assetUrl;
  const filename = pathname.split("/").pop() ?? pathname;
  const withoutExtension = filename.replace(/\.(?:avif|jpe?g|png|webp)$/i, "");

  const cotepiercingMarker = "-cotepiercing";
  const cotepiercingIndex = withoutExtension.indexOf(cotepiercingMarker);
  if (cotepiercingIndex !== -1) {
    return withoutExtension.slice(0, cotepiercingIndex + cotepiercingMarker.length);
  }

  const parts = withoutExtension.split("-");

  while (parts.length > 1) {
    const last = parts[parts.length - 1] ?? "";
    if (last.length < 3 || !/[A-Z0-9_]/.test(last)) break;
    parts.pop();
  }

  return parts.join("-");
}

export function optimizedImageSrc(
  folder: "hero" | "services",
  assetUrl: string,
  width: number,
): string {
  return `/optimized/${folder}/${assetBaseName(assetUrl)}-${width}.webp`;
}

export function optimizedImageSrcSet(
  folder: "hero" | "services",
  assetUrl: string,
  widths: readonly number[],
): string {
  return widths
    .map((width) => `${optimizedImageSrc(folder, assetUrl, width)} ${width}w`)
    .join(", ");
}
