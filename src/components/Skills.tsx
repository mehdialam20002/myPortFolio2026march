import "./styles/Skills.css";
import skills from "../content/skills.json";

const Skills = () => {
  return (
    <section className="skills-section section-container" id="skills">
      <div className="skills-head">
        <span className="eyebrow">{skills.eyebrow}</span>
        <h2>
          {skills.headingBefore}
          <span className="accent-text">{skills.headingHighlight}</span>
          {skills.headingAfter}
        </h2>
      </div>

      <div className="skills-grid">
        {skills.groups.map((g) => (
          <div className="skill-group" key={g.id}>
            <div className="skill-group-head">
              <span className="skill-id">{g.id}</span>
              <h3>{g.title}</h3>
            </div>
            <ul className="skill-tags">
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
