const revealElements = document.querySelectorAll(".section, .card, .timeline-item");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach(element => observer.observe(element));
