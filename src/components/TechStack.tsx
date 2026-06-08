import Marquee from "react-fast-marquee";
import "./styles/TechStack.css";
import site from "../content/site.json";

const logos = [
  { src: "/images/react.webp", name: "React" },
  { src: "/images/next.webp", name: "Next.js" },
  { src: "/images/node.webp", name: "Node.js" },
  { src: "/images/typescript.webp", name: "TypeScript" },
  { src: "/images/javascript.webp", name: "JavaScript" },
  { src: "/images/express.webp", name: "Express" },
  { src: "/images/mongo.webp", name: "MongoDB" },
  { src: "/images/mysql.webp", name: "MySQL" },
];

const words = site.techWords;

const TechStack = () => {
  return (
    <section className="tech-band" id="techstack">
      <div className="tech-band-head section-container">
        <span className="eyebrow">Tech Stack</span>
        <h2>
          {site.techHeadingBefore}
          <span className="accent-text">{site.techHeadingHighlight}</span>
        </h2>
      </div>

      <Marquee speed={45} gradient={false} autoFill className="tech-row">
        {logos.map((logo) => (
          <div className="tech-chip" key={logo.name}>
            <img src={logo.src} alt={logo.name} loading="lazy" />
            <span>{logo.name}</span>
          </div>
        ))}
      </Marquee>

      <Marquee
        speed={45}
        gradient={false}
        autoFill
        direction="right"
        className="tech-row tech-row-words"
      >
        {words.map((word) => (
          <div className="tech-chip tech-chip-text" key={word}>
            <span>{word}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default TechStack;
