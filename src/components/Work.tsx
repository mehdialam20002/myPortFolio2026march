import { useRef, useState, type MouseEvent } from "react";
import "./styles/Work.css";
import { MdArrowOutward } from "react-icons/md";
import projectsContent from "../content/projects.json";

const projects = projectsContent.items;

const Work = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const handleMove = (e: MouseEvent) => {
    const el = previewRef.current;
    if (!el) return;
    el.style.setProperty("--mx", `${e.clientX}px`);
    el.style.setProperty("--my", `${e.clientY}px`);
  };

  return (
    <section
      className="work-section"
      id="work"
      onMouseMove={handleMove}
    >
      <div className="work-container section-container">
        <div className="work-head">
          <span className="eyebrow">{projectsContent.eyebrow}</span>
          <h2>
            {projectsContent.heading}
            <span className="accent-text">.</span>
          </h2>
        </div>

        <ul className="work-list">
          {projects.map((project, index) => (
            <li
              key={project.title}
              className={`work-row ${active === index ? "is-active" : ""} ${
                active !== null && active !== index ? "is-dim" : ""
              }`}
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="work-row-link"
                data-cursor="disable"
              >
                <span className="work-num">{`0${index + 1}`}</span>
                <span className="work-title">{project.title}</span>
                <span className="work-meta">
                  <span className="work-cat">{project.category}</span>
                  <span className="work-tools">{project.tools}</span>
                </span>
                <span className="work-year">{project.year}</span>
                <span className="work-arrow">
                  <MdArrowOutward />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Cursor-following preview (desktop) */}
      <div
        ref={previewRef}
        className={`work-preview ${active !== null ? "is-visible" : ""}`}
        aria-hidden="true"
      >
        {projects.map((project, index) => (
          <img
            key={project.title}
            src={project.image}
            alt=""
            className={active === index ? "is-shown" : ""}
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
};

export default Work;
