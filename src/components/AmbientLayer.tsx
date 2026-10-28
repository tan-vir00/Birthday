import { useMemo, type CSSProperties } from "react";
import { seeded } from "./random";

/** Leaves, pale-blue fabric wisps and gold motes drifting over the whole page, all the time. Hidden for reduced motion. */
export function AmbientLayer() {
  const items = useMemo(() => {
    const rnd = seeded(11);
    return Array.from({ length: 11 }, (_, i) => {
      const kind = i % 4 === 3 ? "wisp" : i % 4 === 2 ? "mote" : "leaf";
      const size = kind === "wisp" ? 80 + rnd() * 50 : kind === "mote" ? 4 + rnd() * 4 : 13 + rnd() * 11;
      return {
        kind,
        color: ["#4f7d55", "#7ea36d", "#5e8a5a", "#9cbb8f"][i % 4]!,
        size,
        style: {
          left: `${Math.round(rnd() * 94)}%`,
          "--d": `${22 + rnd() * 18}s`,
          "--delay": `${-rnd() * 40}s`,
          "--dx": `${(rnd() - 0.5) * 160}px`,
          "--r0": `${rnd() * 60}deg`,
          "--r1": `${140 + rnd() * 220}deg`,
          "--o": kind === "wisp" ? "0.38" : kind === "mote" ? "0.7" : `${0.42 + rnd() * 0.25}`,
        } as CSSProperties,
      };
    });
  }, []);

  return (
    <div aria-hidden className="ambient pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {items.map((it, i) => (
        <div
          key={i}
          className="floater absolute bottom-[-10%]"
          style={{
            width: it.size,
            height: it.kind === "wisp" ? it.size / 3 : it.kind === "mote" ? it.size : it.size * 1.6,
            ...it.style,
          }}
        >
          {it.kind === "leaf" && (
            <svg viewBox="0 0 24 40" className="h-full w-full drop-shadow-[0_2px_3px_rgba(16,45,40,0.18)]">
              <path d="M12 1C4 10 2 22 12 39C22 22 20 10 12 1Z" fill={it.color} />
              <path d="M12 4V37" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" fill="none" />
            </svg>
          )}
          {it.kind === "wisp" && (
            <svg viewBox="0 0 120 40" className="h-full w-full">
              <path d="M2 30C22 6 40 6 60 20C80 34 98 34 118 10" stroke="#9BCED8" strokeWidth="5" strokeLinecap="round" fill="none" />
            </svg>
          )}
          {it.kind === "mote" && <span className="block h-full w-full rounded-full bg-gold shadow-[0_0_10px_rgba(214,193,138,0.8)]" />}
        </div>
      ))}
    </div>
  );
}
