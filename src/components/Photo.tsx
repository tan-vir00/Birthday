import type { CSSProperties } from "react";
import type { Picture } from "../content/birthday";

type Props = {
  photo: Picture;
  className?: string;
  style?: CSSProperties;
  decorative?: boolean;
  eager?: boolean;
};

/** The photograph, always shown at its natural proportions (cropped by the frame, never stretched). */
export function Photo({ photo, className = "", style, decorative, eager }: Props) {
  return (
    <img
      src={photo.src}
      width={photo.width}
      height={photo.height}
      alt={decorative ? "" : photo.alt}
      aria-hidden={decorative || undefined}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={className}
      style={{ objectFit: "cover", objectPosition: `${photo.focus.x}% ${photo.focus.y}%`, ...style }}
    />
  );
}
