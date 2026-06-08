import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import "./styles/BookCall.css";
import contact from "../content/contact.json";

const calLink = contact.bookingCalLink;

/** Tracks the site theme so the Cal embed matches light/dark. */
function useSiteTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(
    () =>
      (document.documentElement.getAttribute("data-theme") as
        | "light"
        | "dark") || "dark"
  );
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setTheme(
        (document.documentElement.getAttribute("data-theme") as
          | "light"
          | "dark") || "dark"
      )
    );
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);
  return theme;
}

const BookCall = () => {
  const theme = useSiteTheme();

  useEffect(() => {
    if (!calLink) return;
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme,
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [theme]);

  return (
    <section className="book-section section-container" id="book">
      <div className="book-head">
        <span className="eyebrow">{contact.bookingEyebrow}</span>
        <h2>{contact.bookingHeading}</h2>
      </div>

      {calLink ? (
        <div className="book-embed">
          <Cal
            calLink={calLink}
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view", theme }}
          />
        </div>
      ) : (
        <div className="book-placeholder">
          <p>
            Add your Cal.com link in the admin dashboard
            <br />
            <span>( Contact → "Cal.com booking link" )</span>
          </p>
        </div>
      )}
    </section>
  );
};

export default BookCall;
