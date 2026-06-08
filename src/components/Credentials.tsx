import "./styles/Credentials.css";
import credentials from "../content/credentials.json";

const Credentials = () => {
  return (
    <section className="cred-section section-container" id="credentials">
      <div className="cred-head">
        <span className="eyebrow">{credentials.eyebrow}</span>
        <h2>
          {credentials.headingBefore}
          <span className="accent-text">{credentials.headingHighlight}</span>
          {credentials.headingAfter}
        </h2>
      </div>

      <div className="cred-grid">
        {credentials.columns.map((col) => (
          <div className="cred-col" key={col.title}>
            <h3 className="cred-col-title">{col.title}</h3>
            {col.items.map((item) => (
              <div className="cred-item" key={item.name}>
                <h4>{item.name}</h4>
                <p className="cred-org">{item.org}</p>
                <p className="cred-sub">{item.sub}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Credentials;
