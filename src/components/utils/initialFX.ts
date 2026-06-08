import gsap from "gsap";

export function initialFX() {
  document.body.style.overflowY = "auto";
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0a0a0a",
    duration: 0.5,
    delay: 0.6,
  });

  // Giant title lines sweep up from their masks.
  gsap.fromTo(
    ".hero-line-in",
    { yPercent: 115 },
    {
      yPercent: 0,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.12,
      delay: 0.25,
    }
  );

  // Supporting hero text fades in.
  gsap.fromTo(
    [".hero-available", ".hero-tagline", ".hero-name", ".hero-bottom"],
    { autoAlpha: 0, y: 30 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.08,
      delay: 0.7,
    }
  );

  // Chrome (nav, socials, fade) eases in.
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );
}
