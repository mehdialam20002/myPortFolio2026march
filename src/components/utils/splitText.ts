import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function splitWords(el: HTMLElement) {
  if (el.dataset.split === "words") return;
  const text = el.textContent || "";
  const words = text.split(" ");
  el.innerHTML = words
    .map((word) => `<span class="split-word">${word}</span>`)
    .join(" ");
  el.dataset.split = "words";
}

function splitChars(el: HTMLElement) {
  if (el.dataset.split === "chars") return;
  const text = el.textContent || "";
  const chars = Array.from(text);
  el.innerHTML = chars
    .map((char) => {
      if (char === " ") return " ";
      return `<span class="split-char">${char}</span>`;
    })
    .join("");
  el.dataset.split = "chars";
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras = Array.from(document.querySelectorAll<HTMLElement>(".para"));
  const titles = Array.from(document.querySelectorAll<HTMLElement>(".title"));

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para) => {
    para.classList.add("visible");
    splitWords(para);

    const words = Array.from(para.querySelectorAll<HTMLElement>(".split-word"));
    gsap.fromTo(
      words,
      { autoAlpha: 0, y: 60 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.02,
        scrollTrigger: {
          trigger: para,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
      }
    );
  });

  titles.forEach((title) => {
    splitChars(title);

    const chars = Array.from(title.querySelectorAll<HTMLElement>(".split-char"));
    gsap.fromTo(
      chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        y: 0,
        rotate: 0,
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.03,
        scrollTrigger: {
          trigger: title,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
