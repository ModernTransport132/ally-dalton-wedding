const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navMenu.classList.toggle("is-open", !isOpen);
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navToggle.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("is-open");
    }
  });
}

const rsvpForm = document.querySelector(".rsvp-form");

if (rsvpForm) {
  rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Thank you. RSVP collection will be connected closer to the wedding.");
  });
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealSelectors = [
  ".page-hero",
  ".section-heading",
  ".welcome-panel",
  ".home-feature-card",
  ".home-split",
  ".home-gallery-strip",
  ".home-rsvp-cta .section-inner",
  ".schedule-note",
  ".schedule-day h2",
  ".schedule-event",
  ".venue-feature",
  ".party-group-heading",
  ".person-card",
  ".editorial-gallery .gallery-tile",
  ".gallery-note",
  ".registry-card",
  ".rsvp-placeholder",
  ".faq-list details",
  ".info-panel"
];

const revealElements = document.querySelectorAll(revealSelectors.join(","));

revealElements.forEach((element, index) => {
  element.classList.add("reveal-on-scroll");
  element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
});

if (reduceMotion) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
