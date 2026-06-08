import "./styles/About.css";
import about from "../content/about.json";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <span className="eyebrow">{about.eyebrow}</span>
        <h3 className="title">{about.title}</h3>
        <p className="para">
          {about.bodyBefore}
          <span className="accent-text">{about.bodyHighlight}</span>
          {about.bodyAfter}
        </p>

        <div className="about-stats">
          {about.stats.map((s) => (
            <div className="about-stat" key={s.label}>
              <span className="about-stat-value">{s.value}</span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
