import "./styles/Career.css";
import career from "../content/career.json";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <span className="eyebrow">{career.eyebrow}</span>
        <h2>
          {career.headingLine1} <span>&</span>
          <br /> {career.headingLine2}
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {career.jobs.map((job) => (
            <div className="career-info-box" key={job.company}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{job.role}</h4>
                  <h5>{job.company}</h5>
                  <span className="career-place">{job.place}</span>
                </div>
                <h3>{job.period}</h3>
              </div>
              <p>{job.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
