import Marquee from "react-fast-marquee";
import site from "../content/site.json";

const words = site.marqueeWords;

/**
 * A kinetic editorial marquee strip that acts as a transition between the
 * narrative sections and the project work. Alternating solid / outlined words
 * keep it feeling designed rather than generic.
 */
const MarqueeStrip = () => {
  return (
    <div className="marquee-strip" aria-hidden="true">
      <Marquee speed={55} gradient={false} autoFill>
        {words.map((word, i) => (
          <span
            key={word}
            className={`marquee-item ${i % 2 === 1 ? "is-outline" : ""}`}
          >
            {word}
            <span className="marquee-dot">&nbsp;✦&nbsp;</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeStrip;
