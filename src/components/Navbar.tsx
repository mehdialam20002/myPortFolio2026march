import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import ThemeToggle from "./ThemeToggle";
import { gsap } from "gsap";
import { getLenis } from "./utils/smoothScroll";
import site from "../content/site.json";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".header ul a"));

    const handleClick = (e: MouseEvent) => {
      if (window.innerWidth > 1024) {
        e.preventDefault();
        const element = e.currentTarget as HTMLAnchorElement;
        const section = element.getAttribute("data-href");
        const target = section
          ? document.querySelector<HTMLElement>(section)
          : null;
        if (!target) return;
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(target, { offset: 0, duration: 1.4 });
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    links.forEach((link) => link.addEventListener("click", handleClick));

    return () => {
      links.forEach((link) => link.removeEventListener("click", handleClick));
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          {site.navTitle}
        </a>
        <a
          href={`mailto:${site.navEmail}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {site.navEmail}
        </a>
        <ul>
          {site.navLinks.map((link) => (
            <li key={link.href}>
              <a data-href={link.href} href={link.href}>
                <HoverLinks text={link.label} />
              </a>
            </li>
          ))}
          <li className="nav-toggle-li">
            <ThemeToggle />
          </li>
        </ul>
      </div>

      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
