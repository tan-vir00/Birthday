import type { Picture } from "../content/birthday";
import { GlowPhoto } from "./GlowPhoto";
import { Reveal } from "./Reveal";
import { WordReveal } from "./WordReveal";

type Line = { text: string; picture?: Picture };

export function MemorySection({ lines }: { lines: readonly Line[] }) {
  return (
    <section aria-label="The little things" className="relative isolate overflow-hidden bg-mist">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[18%] top-[6%] h-[48vmax] w-[48vmax] rounded-[42%_58%_60%_40%/45%_40%_60%_55%] bg-sky opacity-70 blur-[70px]" />
        <div className="absolute -left-[22%] bottom-[8%] h-[40vmax] w-[40vmax] rounded-[58%_42%_38%_62%/52%_60%_40%_48%] bg-[#e3eee2] opacity-80 blur-[70px]" />
      </div>
      <div className="gutter mx-auto flex max-w-6xl flex-col py-[10svh]">
        {lines.map(({ text, picture }, i) => {
          if (!picture) {
            return (
              <div key={text} className="flex py-[clamp(4rem,14svh,9rem)]">
                <WordReveal
                  text={text}
                  stagger={0.1}
                  className="max-w-[18ch] font-display text-[clamp(2.2rem,6.4vw,4.25rem)] leading-[1.04] text-forest"
                />
              </div>
            );
          }
          const photoFirst = i % 2 === 1;
          return (
            <div
              key={text}
              className="grid items-center gap-8 py-[clamp(3rem,10svh,7rem)] md:grid-cols-2 md:gap-14"
            >
              <div className={`min-w-0 ${photoFirst ? "md:order-2" : ""}`}>
                <WordReveal
                  text={text}
                  stagger={0.05}
                  className="max-w-[24ch] font-display text-[clamp(1.65rem,4.2vw,2.65rem)] leading-[1.18] text-forest"
                />
              </div>
              <Reveal
                y={36}
                amount={0.25}
                className={`mx-auto w-[min(100%,26rem)] min-w-0 ${photoFirst ? "md:order-1" : ""}`}
              >
                {picture.shape === "circle" ? (
                  <div className="mx-auto w-[min(86%,21rem)]">
                    <GlowPhoto photo={picture} shapeClass="rounded-full" aspect="1 / 1" focus={picture.focus} rings={{ color: "#D6C18A", count: 2 }} />
                  </div>
                ) : picture.shape === "capsule" ? (
                  <div className="mx-auto w-[min(80%,19rem)]">
                    <GlowPhoto photo={picture} shapeClass="rounded-full" aspect="5 / 8" focus={picture.focus} />
                  </div>
                ) : (
                  <GlowPhoto photo={picture} shapeClass="rounded-[50%_50%_1.75rem_1.75rem/30%_30%_1.75rem_1.75rem]" />
                )}
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
