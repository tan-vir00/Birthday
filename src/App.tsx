import { MotionConfig } from "framer-motion";
import { birthday } from "./content/birthday";
import { ScrollProgress } from "./components/ScrollProgress";
import { AmbientLayer } from "./components/AmbientLayer";
import { OpeningScene } from "./components/OpeningScene";
import { PhotoRevealScene } from "./components/PhotoRevealScene";
import { MemorySection } from "./components/MemorySection";
import { BirthdayLetter } from "./components/BirthdayLetter";
import { HiddenWish } from "./components/HiddenWish";
import { FinalBirthdayScene } from "./components/FinalBirthdayScene";

export default function App() {
  return (
    // "user": transforms are skipped when the visitor prefers reduced motion; text still appears.
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <AmbientLayer />
      <main>
        <OpeningScene content={birthday.opening} />
        <PhotoRevealScene photo={birthday.photo} caption={birthday.photoCaption} />
        <MemorySection lines={birthday.littleThings} />
        <BirthdayLetter letter={birthday.letter} />
        <HiddenWish wish={birthday.wish} />
        <FinalBirthdayScene finale={birthday.finale} />
      </main>
    </MotionConfig>
  );
}
