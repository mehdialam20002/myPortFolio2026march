import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

type Theme = "dark" | "light";

const getInitial = (): Theme => {
  if (typeof document === "undefined") return "dark";
  return (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(getInitial);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      data-cursor="disable"
    >
      <span className="theme-toggle-icon">
        {theme === "dark" ? <FiSun /> : <FiMoon />}
      </span>
    </button>
  );
};

export default ThemeToggle;
