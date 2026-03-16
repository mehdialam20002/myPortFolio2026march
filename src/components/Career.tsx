import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Development Engineer</h4>
                <h5>Finolity Consultancy Pvt. Ltd.</h5>
              </div>
              <h3>May 2024 - May 2025</h3>
            </div>
            <p>
              Built and maintained full-stack web application features using React.js and Node.js for 1,000+ active users. Reduced page load time by ~35% using code splitting, lazy loading, and image optimization techniques. Developed reusable UI components, API services, and form handlers, improving development speed by 25%. Improved defect resolution time from days to under 2 hours using structured debugging and triage workflows. Collaborated closely with backend teams to optimize API contracts and database queries.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Consultant</h4>
                <h5>International Water Management Institute</h5>
              </div>
              <h3>Sep 2025 - Dec 2025</h3>
            </div>
            <p>
              Developed backend services using Python and FastAPI to process large-scale WEFE datasets. Integrated PostgreSQL with optimized queries, preprocessing, and caching for faster API responses. Converted complex climate and water-productivity research models into production-ready backend logic. Built modular data pipelines enabling real-time indicator calculations across districts and crops. Worked directly with researchers to ensure accuracy, scalability, and performance of APIs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
