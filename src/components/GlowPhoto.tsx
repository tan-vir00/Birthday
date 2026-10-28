import type { Picture } from "../content/birthday";
import { Photo } from "./Photo";

type Props = {
  photo: Picture;
  shapeClass: string;
  aspect?: string;
  glowOpacity?: number;
  /** Where to centre the crop for this shape (percent). Defaults to the photo's focus point. */
  focus?: { x: number; y: number };
  /** Thin concentric rings around a circular photo. */
  rings?: { color: string; count?: number };
};

/** A crisp photograph with a soft glow of its own colours behind it. */
export function GlowPhoto({ photo, shapeClass, aspect, glowOpacity = 0.55, focus, rings }: Props) {
  const ratio = aspect ?? `${photo.width} / ${photo.height}`;
  const position = focus ? { objectPosition: `${focus.x}% ${focus.y}%` } : {};
  return (
    <div className="relative">
      {rings &&
        Array.from({ length: rings.count ?? 1 }, (_, i) => (
          <span
            key={i}
            aria-hidden
            className="pointer-events-none absolute rounded-full border"
            style={{ inset: `${-10 - i * 14}px`, borderColor: rings.color, opacity: 1 - i * 0.45 }}
          />
        ))}
      <Photo
        photo={photo}
        decorative
        className={`absolute inset-0 h-full w-full translate-y-[6%] scale-[0.92] blur-2xl saturate-150 ${shapeClass}`}
        style={{ aspectRatio: ratio, opacity: glowOpacity, ...position }}
      />
      <Photo
        photo={photo}
        className={`relative h-auto w-full shadow-[0_24px_48px_-28px_rgba(16,45,40,0.45)] ${shapeClass}`}
        style={{ aspectRatio: ratio, ...position }}
      />
    </div>
  );
}
