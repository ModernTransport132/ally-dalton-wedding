const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  const closeMenu = () => {
    navToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("is-open");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navMenu.classList.toggle("is-open", !isOpen);
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
      closeMenu();
      navToggle.focus();
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

const countdown = document.querySelector("[data-countdown-target]");

if (countdown) {
  const targetTime = new Date(countdown.dataset.countdownTarget).getTime();
  const daysElement = countdown.querySelector("[data-countdown-days]");
  const hoursElement = countdown.querySelector("[data-countdown-hours]");
  const minutesElement = countdown.querySelector("[data-countdown-minutes]");
  const secondsElement = countdown.querySelector("[data-countdown-seconds]");
  let countdownTimer;

  const updateCountdown = () => {
    const remaining = Math.max(0, targetTime - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (daysElement) daysElement.textContent = String(days).padStart(3, "0");
    if (hoursElement) hoursElement.textContent = String(hours).padStart(2, "0");
    if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, "0");
    if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, "0");

    countdown.setAttribute(
      "aria-label",
      `Countdown to the wedding ceremony: ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`
    );

    if (remaining === 0 && countdownTimer) {
      window.clearInterval(countdownTimer);
    }
  };

  updateCountdown();
  countdownTimer = window.setInterval(updateCountdown, 1000);
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealSelectors = [
  ".page-hero",
  ".section-heading",
  ".welcome-panel",
  ".home-details-title",
  ".home-detail-item",
  ".home-feature-card",
  ".home-split",
  ".home-gallery-strip",
  ".home-rsvp-cta .section-inner",
  ".schedule-note",
  ".schedule-day h2",
  ".schedule-event",
  ".venue-feature",
  ".lodging-feature",
  ".lodging-detail",
  ".lodging-facts-heading",
  ".lodging-fact",
  ".party-group-heading",
  ".person-card",
  ".editorial-gallery .gallery-tile",
  ".gallery-note",
  ".registry-card",
  ".rsvp-placeholder",
  ".faq-item",
  ".info-panel"
];

const revealElements = document.querySelectorAll(revealSelectors.join(","));

revealElements.forEach((element, index) => {
  element.classList.add("reveal-on-scroll");
  element.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 115}ms`);
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
      threshold: 0.18,
      rootMargin: "0px 0px -12% 0px"
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
