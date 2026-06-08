import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import site from "../content/site.json";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (percent < 100) return;
    const t1 = setTimeout(() => setExiting(true), 250);
    const t2 = setTimeout(() => {
      import("./utils/initialFX").then((m) => m.initialFX?.());
    }, 650);
    const t3 = setTimeout(() => setIsLoading(false), 1250);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [percent, setIsLoading]);

  return (
    <div className={`loader ${exiting ? "is-exiting" : ""}`}>
      <div className="loader-inner">
        <div className="loader-row loader-top">
          <span>{site.navTitle} — Portfolio</span>
          <span>New Delhi, IND</span>
        </div>

        <div className="loader-mid">
          <span className="loader-word">{site.loadingText}</span>
          <div className="loader-count">
            {percent}
            <span>%</span>
          </div>
        </div>

        <div className="loader-bottom">
          <div className="loader-bar">
            <span style={{ transform: `scaleX(${percent / 100})` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
