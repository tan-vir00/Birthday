import { useMemo, type CSSProperties } from "react";
import type { Birthday } from "../content/birthday";
import { GlowPhoto } from "./GlowPhoto";
import { Reveal } from "./Reveal";
import { WordReveal } from "./WordReveal";
import { seeded } from "./random";

type Props = { finale: Birthday["finale"] };

export function FinalBirthdayScene({ finale }: Props) {

  const particles = useMemo(() => {
    const rnd = seeded(2026);
    return Array.from({ length: 34 }, (_, i) => {
      const gold = i % 3 === 0;
      const size = 2 + rnd() * 4.5;
      return {
        rising: i % 4 !== 0,
        style: {
          left: `${rnd() * 100}%`,
          top: `${30 + rnd() * 75}%`,
          width: size,
          height: size,
          background: gold ? "#D6C18A" : "#9BCED8",
          boxShadow: `0 0 ${size * 3}px ${gold ? "rgba(214,193,138,0.55)" : "rgba(155,206,216,0.5)"}`,
          "--d": `${11 + rnd() * 12}s`,
          "--delay": `${-rnd() * 20}s`,
          "--dx": `${(rnd() - 0.5) * 80}px`,
          "--o": `${0.35 + rnd() * 0.5}`,
        } as CSSProperties,
      };
    });
  }, []);

  return (
    <section aria-labelledby="finale-title" className="relative bg-deep text-mist">
      {/* Light settles into the forest while the visitor scrolls down into the last scene. */}
      <div
        aria-hidden
        className="h-[70vh] supports-[height:100svh]:h-[70svh]"
        style={{ background: "linear-gradient(180deg, #f4f7f5 0%, #dde8e4 22%, #9db5ab 46%, #3b6356 70%, #173f35 86%, #102d28 100%)" }}
      />

      <div className="relative isolate overflow-hidden bg-deep">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[18%] h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full bg-forest opacity-80 blur-[90px]" />
          {particles.map((p, i) => (
            <span key={i} className={`${p.rising ? "particle" : "twinkle"} absolute rounded-full`} style={p.style} />
          ))}
        </div>

        <div className="gutter mx-auto flex max-w-4xl flex-col items-center pb-[max(5rem,calc(env(safe-area-inset-bottom,0px)+3rem))] pt-[clamp(3rem,10svh,6rem)] text-center">
          <Reveal as="p" className="text-[0.78rem] font-semibold uppercase tracking-[0.34em] text-gold">
            {finale.name}
          </Reveal>
          <WordReveal
            as="h2"
            id="finale-title"
            text={finale.heading}
            delay={0.3}
            stagger={0.16}
            className="mt-6 font-display text-[clamp(3.2rem,12vw,8rem)] leading-[1] tracking-[-0.01em] text-mist"
          />

          <div className="mt-[clamp(2.5rem,7svh,4rem)] flex max-w-[38rem] flex-col gap-6 text-[clamp(1.02rem,2.2vw,1.2rem)] leading-[1.8] text-sky/90">
            {finale.lines.map((l, i) => (
              <Reveal key={l} as="p" delay={0.15 * i}>
                {l}
              </Reveal>
            ))}
          </div>

          {/* A last photograph, glowing softly against the forest-green night. */}
          <Reveal className="mt-[clamp(4rem,11svh,6.5rem)] w-[min(72%,22rem)]" amount={0.3} y={30}>
            <GlowPhoto
              photo={finale.photo}
              shapeClass="rounded-full"
              aspect="1 / 1"
              focus={finale.photo.focus}
              glowOpacity={0.45}
              rings={{ color: "rgba(214,193,138,0.55)", count: 2 }}
            />
          </Reveal>

          <Reveal as="p" className="mt-[clamp(3.5rem,10svh,6rem)] max-w-[22ch] font-display text-[clamp(1.7rem,4.6vw,2.6rem)] italic leading-snug text-mist">
            {finale.closing}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
