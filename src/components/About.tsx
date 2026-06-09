import "./styles/About.css";
import about from "../content/about.json";

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-inner section-container">
        <header className="about-top">
          <span className="eyebrow">{about.eyebrow}</span>
          <h2 className="about-heading">{about.title}</h2>
        </header>

        <p className="about-lead">
          {about.bodyBefore}
          <span className="accent-text">{about.bodyHighlight}</span>
          {about.bodyAfter}
        </p>

        <div className="about-stats">
          {about.stats.map((s, i) => (
            <div className="about-stat" key={s.label}>
              <span className="about-stat-num">{`0${i + 1}`}</span>
              <span className="about-stat-value">{s.value}</span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
