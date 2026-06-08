import "./styles/Testimonials.css";
import testimonials from "../content/testimonials.json";

const Testimonials = () => {
  if (!testimonials.items?.length) return null;

  return (
    <section className="tst-section section-container" id="testimonials">
      <div className="tst-head">
        <span className="eyebrow">{testimonials.eyebrow}</span>
        <h2>
          {testimonials.headingBefore}
          <span className="accent-text">{testimonials.headingHighlight}</span>
          {testimonials.headingAfter}
        </h2>
      </div>

      <div className="tst-grid">
        {testimonials.items.map((t, i) => (
          <figure className="tst-card" key={i}>
            <span className="tst-quote-mark" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote>{t.quote}</blockquote>
            <figcaption>
              <span className="tst-name">{t.name}</span>
              <span className="tst-role">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
