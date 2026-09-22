(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealEls = document.querySelectorAll(".reveal, .text-reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
  );

  revealEls.forEach((el) => {
    if (!el.closest("#hero")) {
      revealObserver.observe(el);
    }
  });

  document.querySelectorAll("[data-animate-line]").forEach((line) => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(line);
  });

  const portrait = document.getElementById("hero-portrait");
  const heroWrap = document.getElementById("hero-photo-wrap");

  if (!prefersReducedMotion && portrait && heroWrap) {
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const rect = heroWrap.getBoundingClientRect();
            const vh = window.innerHeight;
            if (rect.bottom > 0 && rect.top < vh) {
              const t = (rect.top + rect.height * 0.5) / (vh + rect.height);
              const y = (0.5 - t) * 28;
              portrait.style.transform = "translate3d(0," + y + "px,0)";
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  const readAgain = document.getElementById("read-again");
  if (readAgain) {
    readAgain.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  const heroReveals = document.querySelectorAll("#hero .reveal");
  if (!prefersReducedMotion) {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 1s ease";
    window.addEventListener("load", () => {
      document.body.style.opacity = "1";
    });
    requestAnimationFrame(() => {
      heroReveals.forEach((el, i) => {
        setTimeout(() => el.classList.add("is-visible"), 120 + i * 140);
      });
    });
  } else {
    heroReveals.forEach((el) => el.classList.add("is-visible"));
  }
})();
