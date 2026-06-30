const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  const menuLinks = Array.from(navMenu.querySelectorAll("a"));

  const closeMenu = (returnFocus = false) => {
    navToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("is-open");

    if (returnFocus) {
      navToggle.focus();
    }
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu();
      return;
    }

    navToggle.setAttribute("aria-expanded", "true");
    navMenu.classList.add("is-open");

    window.requestAnimationFrame(() => {
      if (menuLinks[0]) {
        menuLinks[0].focus();
      }
    });
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
      closeMenu(true);
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

const venueMapFrame = document.querySelector(".venue-map-frame iframe");
const venueMapButtons = document.querySelectorAll("[data-map-src]");

if (venueMapFrame && venueMapButtons.length) {
  venueMapButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextMapSrc = button.getAttribute("data-map-src");
      const nextMapTitle = button.getAttribute("data-map-title");

      if (!nextMapSrc || venueMapFrame.getAttribute("src") === nextMapSrc) {
        return;
      }

      venueMapFrame.setAttribute("src", nextMapSrc);

      if (nextMapTitle) {
        venueMapFrame.setAttribute("title", nextMapTitle);
      }

      venueMapButtons.forEach((mapButton) => {
        const isSelected = mapButton === button;
        mapButton.classList.toggle("is-active", isSelected);
        mapButton.setAttribute("aria-pressed", String(isSelected));
      });
    });
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

const weatherWidget = document.querySelector("[data-weather-widget]");

if (weatherWidget) {
  const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=30.6954&longitude=-88.0399&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago&forecast_days=3";
  const tempElement = weatherWidget.querySelector("[data-weather-temp]");
  const conditionElement = weatherWidget.querySelector("[data-weather-condition]");
  const feelsLikeElement = weatherWidget.querySelector("[data-weather-feels-like]");
  const humidityElement = weatherWidget.querySelector("[data-weather-humidity]");
  const windElement = weatherWidget.querySelector("[data-weather-wind]");
  const forecastElement = weatherWidget.querySelector("[data-weather-forecast]");

  const weatherDescriptions = {
    0: "Clear",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Cloudy",
    45: "Foggy",
    48: "Foggy",
    51: "Light drizzle",
    53: "Drizzle",
    55: "Heavy drizzle",
    56: "Freezing drizzle",
    57: "Freezing drizzle",
    61: "Light rain",
    63: "Rain",
    65: "Heavy rain",
    66: "Freezing rain",
    67: "Freezing rain",
    71: "Light snow",
    73: "Snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Light showers",
    81: "Showers",
    82: "Heavy showers",
    85: "Snow showers",
    86: "Snow showers",
    95: "Thunderstorms",
    96: "Thunderstorms",
    99: "Thunderstorms"
  };

  const formatTemperature = (value) => `${Math.round(value)}°`;
  const formatForecastDate = (dateString) => {
    const date = new Date(`${dateString}T12:00:00`);

    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    }).format(date);
  };

  const getWeatherDescription = (code) => weatherDescriptions[code] || "Weather update";

  const showWeatherError = () => {
    weatherWidget.classList.add("weather-panel-error");

    if (tempElement) tempElement.textContent = "Mobile, AL";
    if (conditionElement) conditionElement.textContent = "Current weather is temporarily unavailable.";
    if (feelsLikeElement) feelsLikeElement.textContent = "--";
    if (humidityElement) humidityElement.textContent = "--";
    if (windElement) windElement.textContent = "--";
    if (forecastElement) {
      forecastElement.innerHTML = '<p class="weather-loading">Please check the local forecast before you travel.</p>';
    }
  };

  fetch(weatherUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Weather request failed");
      }

      return response.json();
    })
    .then((weatherData) => {
      const current = weatherData.current;
      const daily = weatherData.daily;

      if (!current || !daily) {
        showWeatherError();
        return;
      }

      if (tempElement) tempElement.textContent = formatTemperature(current.temperature_2m);
      if (conditionElement) conditionElement.textContent = getWeatherDescription(current.weather_code);
      if (feelsLikeElement) feelsLikeElement.textContent = formatTemperature(current.apparent_temperature);
      if (humidityElement) humidityElement.textContent = `${Math.round(current.relative_humidity_2m)}%`;
      if (windElement) windElement.textContent = `${Math.round(current.wind_speed_10m)} mph`;

      if (forecastElement) {
        forecastElement.innerHTML = daily.time
          .map((date, index) => {
            const condition = getWeatherDescription(daily.weather_code[index]);
            const high = formatTemperature(daily.temperature_2m_max[index]);
            const low = formatTemperature(daily.temperature_2m_min[index]);
            const rainChance = daily.precipitation_probability_max[index];

            return `
              <article class="weather-day">
                <p class="weather-day-date">${formatForecastDate(date)}</p>
                <p class="weather-day-condition">${condition}</p>
                <p class="weather-day-temp">${high} / ${low}</p>
                <p class="weather-day-rain">${Math.round(rainChance)}% rain</p>
              </article>
            `;
          })
          .join("");
      }
    })
    .catch(showWeatherError);
}

const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

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
  ".airport-card",
  ".travel-note",
  ".weather-panel",
  ".rsvp-placeholder",
  ".faq-item",
  ".info-panel"
];

const revealElements = document.querySelectorAll(revealSelectors.join(","));
const revealGroupCounts = new Map();

revealElements.forEach((element) => {
  const revealGroup = element.closest(".section, .schedule-day, main") || document.body;
  const groupIndex = revealGroupCounts.get(revealGroup) || 0;

  element.classList.add("reveal-on-scroll");
  element.style.setProperty("--reveal-delay", `${Math.min(groupIndex, 3) * 45}ms`);
  revealGroupCounts.set(revealGroup, groupIndex + 1);
});

if (reduceMotionQuery.matches) {
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

reduceMotionQuery.addEventListener("change", (event) => {
  if (event.matches) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }
});
