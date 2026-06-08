import { useEffect, useRef } from "react";
import "./styles/Landing.css";
import hero from "../content/hero.json";

const Landing = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Aurora glow eases toward the cursor for a living, responsive hero.
    const target = { x: window.innerWidth / 2, y: window.innerHeight * 0.42 };
    const pos = { ...target };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.06;
      pos.y += (target.y - pos.y) * 0.06;
      glow.style.setProperty("--gx", `${pos.x}px`);
      glow.style.setProperty("--gy", `${pos.y}px`);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" id="landingDiv">
      <div className="hero-glow" ref={glowRef} aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-row hero-top">
          <span className="eyebrow hero-available">{hero.available}</span>
          <span className="hero-loc">{hero.location}</span>
        </div>

        <h1 className="hero-title">
          <span className="hero-line">
            <span className="hero-line-in">{hero.titleLine1}</span>
          </span>
          <span className="hero-line hero-line-outline">
            <span className="hero-line-in">{hero.titleLine2}</span>
          </span>
        </h1>

        <div className="hero-row hero-mid">
          <p className="hero-tagline">
            {hero.taglineBefore}
            <span className="accent-text">{hero.taglineHighlight}</span>
            {hero.taglineAfter}
          </p>
          <p className="hero-name">
            <span className="hero-name-label">{hero.nameLabel}</span>
            {hero.name}
          </p>
        </div>

        <div className="hero-row hero-bottom">
          <a className="hero-scroll" href="#about" data-cursor="disable">
            <span>{hero.scrollLabel}</span>
            <span className="hero-scroll-line" />
          </a>
          <p className="hero-stack">{hero.stack}</p>
          <span className="hero-year">{hero.year}</span>
        </div>
      </div>
    </section>
  );
};

export default Landing;
