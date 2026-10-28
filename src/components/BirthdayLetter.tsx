import type { Birthday } from "../content/birthday";
import { Reveal } from "./Reveal";

export function BirthdayLetter({ letter }: { letter: Birthday["letter"] }) {
  return (
    <section aria-labelledby="letter-title" className="bg-paper">
      <div className="gutter mx-auto max-w-[40rem] py-[clamp(6rem,18svh,11rem)]">
        <Reveal as="h2" className="font-display text-[clamp(2.1rem,5.6vw,3.4rem)] leading-[1.06] text-forest">
          <span id="letter-title">{letter.heading}</span>
        </Reveal>

        <div className="mt-[clamp(3rem,8svh,5rem)] flex flex-col gap-6 text-[1.0625rem] leading-[1.9] text-forest/90 sm:text-[1.125rem]">
          <Reveal as="p" amount={0.8} className="font-display text-[1.75rem] italic leading-tight text-forest">
            {letter.salutation}
          </Reveal>
          {letter.paragraphs.map((p, i) => (
            <Reveal key={i} as="p" amount={0.5} y={14}>
              {p}
            </Reveal>
          ))}
          <Reveal as="div" amount={0.6} className="mt-4 flex flex-col gap-1 font-display text-[1.6rem] italic leading-snug text-forest">
            {letter.closing.map((c) => (
              <p key={c}>{c}</p>
            ))}
          </Reveal>
        </div>

        <div className="mt-[clamp(4rem,12svh,7rem)] flex flex-col items-center gap-8 text-center">
          <span aria-hidden className="flex gap-2">
            {[0, 1, 2].map((d) => (
              <span key={d} className="h-1 w-1 rounded-full bg-gold" />
            ))}
          </span>
          <Reveal as="p" className="max-w-[24ch] font-display text-[clamp(1.6rem,4vw,2.3rem)] italic leading-snug text-forest">
            {letter.coda}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
