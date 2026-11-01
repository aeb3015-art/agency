import Image from "next/image";
import { photos, type PhotoKey } from "@/content/images";

/**
 * Responsive photo with reserved aspect ratio (no layout shift), AVIF/WebP via next/image.
 * `sizes` should describe the rendered width so the browser downloads the right variant.
 */
export function Photo({ id, sizes = "100vw", priority = false, className = "", imgClassName = "", aspect = "aspect-[4/3]", overlay = true }: { id: PhotoKey; sizes?: string; priority?: boolean; className?: string; imgClassName?: string; aspect?: string; overlay?: boolean }) {
  const p = photos[id];
  return (
    <div className={`${aspect.includes("absolute") ? "" : "relative"} overflow-hidden ${aspect} ${className}`}>
      <Image src={p.src} alt={p.alt} fill priority={priority} sizes={sizes} className={`object-cover ${imgClassName}`} />
      {overlay && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" aria-hidden="true" />}
    </div>
  );
}
