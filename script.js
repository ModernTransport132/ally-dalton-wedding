const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

const initHomeColumnReveal = () => {
  const section = document.querySelector("[data-column-reveal]");

  if (!section) {
    return;
  }

  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let revealFrame = null;

  const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

  const setRevealProgress = () => {
    revealFrame = null;

    if (reduceMotionQuery.matches) {
      section.style.setProperty("--column-reveal-progress", "1");
      section.style.setProperty("--column-copy-progress", "1");
      section.style.setProperty("--column-mobile-enter", "1");
      section.style.setProperty("--column-mobile-enter-1", "1");
      section.style.setProperty("--column-mobile-enter-2", "1");
      section.style.setProperty("--column-mobile-enter-3", "1");
      section.style.setProperty("--column-mobile-exit", "0");
      section.style.setProperty("--column-mobile-copy", "1");
      return;
    }

    const rect = section.getBoundingClientRect();
    const scrollable = Math.max(rect.height - window.innerHeight, 1);
    const progress = clamp(-rect.top / scrollable);
    const copyProgress = clamp((progress - 0.62) / 0.24);
    const mobileEnterProgress = clamp(progress / 0.4);
    const mobileEnterProgress1 = clamp(progress / 0.22);
    const mobileEnterProgress2 = clamp((progress - 0.18) / 0.22);
    const mobileEnterProgress3 = clamp((progress - 0.36) / 0.22);
    const mobileExitProgress = clamp((progress - 0.74) / 0.18);
    const mobileCopyProgress = clamp((progress - 0.86) / 0.12);

    section.style.setProperty("--column-reveal-progress", progress.toFixed(3));
    section.style.setProperty("--column-copy-progress", copyProgress.toFixed(3));
    section.style.setProperty("--column-mobile-enter", mobileEnterProgress.toFixed(3));
    section.style.setProperty("--column-mobile-enter-1", mobileEnterProgress1.toFixed(3));
    section.style.setProperty("--column-mobile-enter-2", mobileEnterProgress2.toFixed(3));
    section.style.setProperty("--column-mobile-enter-3", mobileEnterProgress3.toFixed(3));
    section.style.setProperty("--column-mobile-exit", mobileExitProgress.toFixed(3));
    section.style.setProperty("--column-mobile-copy", mobileCopyProgress.toFixed(3));
  };

  const scheduleRevealUpdate = () => {
    if (revealFrame !== null) {
      return;
    }

    revealFrame = window.requestAnimationFrame(setRevealProgress);
  };

  setRevealProgress();
  window.addEventListener("scroll", scheduleRevealUpdate, { passive: true });
  window.addEventListener("resize", scheduleRevealUpdate);
  reduceMotionQuery.addEventListener("change", scheduleRevealUpdate);
};

const initHomeGuideCarousel = () => {
  const carousel = document.querySelector("[data-home-guide-carousel]");
  const list = document.querySelector("[data-home-guide-list]");
  const cards = Array.from(document.querySelectorAll(".home-page-guide-panel"));
  const prevButton = document.querySelector("[data-home-guide-prev]");
  const nextButton = document.querySelector("[data-home-guide-next]");
  const status = document.querySelector("[data-home-guide-status]");

  if (!carousel || !list || cards.length < 2 || !prevButton || !nextButton) {
    return;
  }

  const mobileQuery = window.matchMedia("(max-width: 699px)");
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeIndex = 0;
  let pointerStartX = null;
  let pointerStartY = null;

  const wrapIndex = (index) => (index + cards.length) % cards.length;

  const setCardInteractive = (card, isActive) => {
    card.setAttribute("aria-hidden", String(!isActive));
    card.querySelectorAll("a, button").forEach((control) => {
      if (isActive) {
        control.removeAttribute("tabindex");
      } else {
        control.setAttribute("tabindex", "-1");
      }
    });
  };

  const updateCarousel = (nextIndex) => {
    activeIndex = wrapIndex(nextIndex);
    const prevIndex = wrapIndex(activeIndex - 1);
    const followingIndex = wrapIndex(activeIndex + 1);

    cards.forEach((card, index) => {
      const isActive = index === activeIndex;

      card.classList.toggle("is-active", isActive);
      card.classList.toggle("is-prev", index === prevIndex);
      card.classList.toggle("is-next", index === followingIndex);
      card.classList.toggle("is-away", !isActive && index !== prevIndex && index !== followingIndex);
      setCardInteractive(card, isActive);
    });

    if (status) {
      const activeTitle = cards[activeIndex].querySelector("h3")?.textContent?.trim() || "Guide item";
      status.textContent = `${activeTitle}, ${activeIndex + 1} of ${cards.length}`;
    }
  };

  const activateCarousel = () => {
    carousel.classList.add("is-carousel-active");
    list.setAttribute("tabindex", "0");
    updateCarousel(activeIndex);
  };

  const deactivateCarousel = () => {
    carousel.classList.remove("is-carousel-active");
    list.removeAttribute("tabindex");
    cards.forEach((card) => {
      card.classList.remove("is-active", "is-prev", "is-next", "is-away");
      card.removeAttribute("aria-hidden");
      card.querySelectorAll("a, button").forEach((control) => control.removeAttribute("tabindex"));
    });
  };

  const syncCarouselMode = () => {
    if (mobileQuery.matches && !motionQuery.matches) {
      activateCarousel();
    } else {
      deactivateCarousel();
    }
  };

  prevButton.addEventListener("click", () => updateCarousel(activeIndex - 1));
  nextButton.addEventListener("click", () => updateCarousel(activeIndex + 1));

  list.addEventListener("keydown", (event) => {
    if (!carousel.classList.contains("is-carousel-active")) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      updateCarousel(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      updateCarousel(activeIndex + 1);
    }
  });

  carousel.addEventListener("pointerdown", (event) => {
    if (!carousel.classList.contains("is-carousel-active")) {
      return;
    }

    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
  });

  carousel.addEventListener("pointerup", (event) => {
    if (pointerStartX === null || pointerStartY === null) {
      return;
    }

    const deltaX = event.clientX - pointerStartX;
    const deltaY = event.clientY - pointerStartY;
    pointerStartX = null;
    pointerStartY = null;

    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    updateCarousel(activeIndex + (deltaX < 0 ? 1 : -1));
  });

  mobileQuery.addEventListener("change", syncCarouselMode);
  motionQuery.addEventListener("change", syncCarouselMode);
  syncCarouselMode();
};

const initHomeGuideEditorial = () => {
  const guide = document.querySelector("[data-guide-editorial]");

  if (!guide) {
    return;
  }

  const items = Array.from(guide.querySelectorAll(".home-guide-editorial-item"));
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let guideFrame = null;
  let splitFrame = null;

  const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

  const splitWords = (element) => {
    if (!element || element.dataset.maskPrepared === "true") {
      return;
    }

    const words = element.textContent.trim().split(/\s+/);
    element.setAttribute("aria-label", element.textContent.trim());
    element.textContent = "";

    words.forEach((word, index) => {
      const mask = document.createElement("span");
      const inner = document.createElement("span");

      mask.className = "masked-text masked-text-word";
      inner.className = "masked-text-inner";
      inner.textContent = word;
      mask.appendChild(inner);
      element.appendChild(mask);

      if (index < words.length - 1) {
        element.append(" ");
      }
    });

    element.dataset.maskPrepared = "true";
  };

  const splitParagraphLines = (paragraph) => {
    if (!paragraph) {
      return;
    }

    const sourceText = paragraph.dataset.maskSource || paragraph.textContent.trim();
    paragraph.dataset.maskSource = sourceText;
    paragraph.setAttribute("aria-label", sourceText);
    paragraph.textContent = "";

    const words = sourceText.split(/\s+/).map((word, index) => {
      const span = document.createElement("span");
      span.className = "masked-measure-word";
      span.textContent = word;
      paragraph.appendChild(span);

      if (index < sourceText.split(/\s+/).length - 1) {
        paragraph.append(" ");
      }

      return span;
    });

    const lineGroups = [];

    words.forEach((word) => {
      const top = Math.round(word.offsetTop);
      let group = lineGroups.find((entry) => Math.abs(entry.top - top) <= 2);

      if (!group) {
        group = { top, words: [] };
        lineGroups.push(group);
      }

      group.words.push(word.textContent);
    });

    paragraph.textContent = "";

    lineGroups.forEach((group) => {
      const mask = document.createElement("span");
      const inner = document.createElement("span");

      mask.className = "masked-text masked-text-line";
      inner.className = "masked-text-inner";
      inner.textContent = group.words.join(" ");
      mask.appendChild(inner);
      paragraph.appendChild(mask);
    });

    paragraph.dataset.maskPrepared = "true";
  };

  const prepareMaskedText = () => {
    items.forEach((item) => {
      splitWords(item.querySelector(".home-guide-editorial-title h3"));
      splitParagraphLines(item.querySelector(".home-guide-editorial-copy p"));
    });
  };

  const updateGuideItems = () => {
    guideFrame = null;

    if (reduceMotionQuery.matches) {
      items.forEach((item) => item.style.setProperty("--guide-item-progress", "1"));
      guide.querySelectorAll(".masked-text-inner, .home-guide-editorial-copy .text-link").forEach((part) => {
        part.style.setProperty("--text-reveal-progress", "1");
      });
      return;
    }

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const progress = clamp((viewportHeight * 0.72 - rect.top) / (viewportHeight * 0.85));
      item.style.setProperty("--guide-item-progress", progress.toFixed(3));

      const parts = Array.from(item.querySelectorAll(".home-guide-editorial-title .masked-text-inner, .home-guide-editorial-copy .masked-text-inner, .home-guide-editorial-copy .text-link"));

      parts.forEach((part, index) => {
        const partProgress = clamp((progress - index * 0.065) / 0.34);
        part.style.setProperty("--text-reveal-progress", partProgress.toFixed(3));
      });
    });
  };

  const scheduleGuideUpdate = () => {
    if (guideFrame !== null) {
      return;
    }

    guideFrame = window.requestAnimationFrame(updateGuideItems);
  };

  const scheduleMaskedTextRefresh = () => {
    if (splitFrame !== null) {
      return;
    }

    splitFrame = window.requestAnimationFrame(() => {
      splitFrame = null;
      guide.querySelectorAll(".home-guide-editorial-copy p").forEach((paragraph) => {
        paragraph.dataset.maskPrepared = "false";
      });
      prepareMaskedText();
      updateGuideItems();
    });
  };

  prepareMaskedText();
  updateGuideItems();
  window.addEventListener("scroll", scheduleGuideUpdate, { passive: true });
  window.addEventListener("resize", () => {
    scheduleMaskedTextRefresh();
    scheduleGuideUpdate();
  });
  reduceMotionQuery.addEventListener("change", scheduleGuideUpdate);
};

const initAirportFlipCards = () => {
  const airportCards = Array.from(document.querySelectorAll("[data-airport-card]"));

  if (!airportCards.length) {
    return;
  }

  const getFocusableElements = (element) =>
    Array.from(element.querySelectorAll("a, button")).filter((focusable) => !focusable.disabled);

  const setCardState = (card, isFlipped, shouldMoveFocus = false) => {
    const front = card.querySelector(".airport-card-front");
    const back = card.querySelector(".airport-card-back");
    const toggles = Array.from(card.querySelectorAll(".airport-flip-toggle"));

    card.classList.toggle("is-flipped", isFlipped);

    if (front) {
      front.setAttribute("aria-hidden", isFlipped ? "true" : "false");
      getFocusableElements(front).forEach((element) => {
        element.tabIndex = isFlipped ? -1 : 0;
      });
    }

    if (back) {
      back.setAttribute("aria-hidden", isFlipped ? "false" : "true");
      getFocusableElements(back).forEach((element) => {
        element.tabIndex = isFlipped ? 0 : -1;
      });
    }

    toggles.forEach((toggle) => {
      toggle.setAttribute("aria-expanded", isFlipped ? "true" : "false");
    });

    if (!shouldMoveFocus) {
      return;
    }

    const nextTarget = isFlipped
      ? back?.querySelector("a, .airport-flip-toggle-back")
      : front?.querySelector(".airport-flip-toggle");

    window.setTimeout(() => nextTarget?.focus({ preventScroll: true }), reduceMotionQuery.matches ? 0 : 260);
  };

  airportCards.forEach((card) => {
    setCardState(card, false);

    card.querySelectorAll(".airport-flip-toggle").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        setCardState(card, !card.classList.contains("is-flipped"), true);
      });
    });
  });
};

const mobileIntro = document.querySelector("[data-mobile-intro]");
const mobileIntroVideo = document.querySelector("[data-mobile-intro-video]");
const mobileIntroSkip = document.querySelector("[data-mobile-intro-skip]");

if (mobileIntro && mobileIntroVideo && mobileIntroSkip) {
  const introStorageKey = "ally-dalton-mobile-intro-seen";
  const mobileIntroQuery = window.matchMedia("(max-width: 899px)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let introDismissed = false;
  let introFallbackTimer;

  const markIntroSeen = () => {
    try {
      window.sessionStorage.setItem(introStorageKey, "true");
    } catch (error) {
      // Storage can be unavailable in private browsing; the intro still dismisses normally.
    }
  };

  const dismissMobileIntro = () => {
    if (introDismissed) {
      return;
    }

    introDismissed = true;
    markIntroSeen();
    window.clearTimeout(introFallbackTimer);
    mobileIntroVideo.pause();
    mobileIntro.classList.add("is-dismissing");
    mobileIntro.classList.remove("is-visible");
    mobileIntro.setAttribute("aria-hidden", "true");
    document.body.classList.remove("mobile-intro-lock");

    window.setTimeout(() => {
      mobileIntro.classList.remove("is-dismissing");
    }, 560);
  };

  const hasSeenIntro = () => {
    try {
      return window.sessionStorage.getItem(introStorageKey) === "true";
    } catch (error) {
      return false;
    }
  };

  const shouldShowMobileIntro =
    mobileIntroQuery.matches &&
    !reducedMotionQuery.matches &&
    !hasSeenIntro();

  if (shouldShowMobileIntro) {
    mobileIntro.removeAttribute("aria-hidden");
    document.body.classList.add("mobile-intro-lock");

    window.requestAnimationFrame(() => {
      mobileIntro.classList.add("is-visible");
      mobileIntroSkip.focus({ preventScroll: true });
    });

    const playPromise = mobileIntroVideo.play();

    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        introFallbackTimer = window.setTimeout(dismissMobileIntro, 1400);
      });
    }

    introFallbackTimer = window.setTimeout(dismissMobileIntro, 9000);
  } else {
    mobileIntro.setAttribute("aria-hidden", "true");
  }

  mobileIntroSkip.addEventListener("click", dismissMobileIntro);
  mobileIntroVideo.addEventListener("ended", dismissMobileIntro);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileIntro.classList.contains("is-visible")) {
      dismissMobileIntro();
    }
  });
}

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
    navToggle.classList.remove("is-clicking");
    window.requestAnimationFrame(() => {
      navToggle.classList.add("is-clicking");
    });

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

  navToggle.addEventListener("animationend", (event) => {
    if (event.animationName === "nav-toggle-click") {
      navToggle.classList.remove("is-clicking");
    }
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      navMenu.classList.contains("is-open") &&
      !navMenu.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
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

    let statusMessage = rsvpForm.querySelector("[data-form-status]");

    if (!statusMessage) {
      statusMessage = document.createElement("p");
      statusMessage.className = "form-note";
      statusMessage.setAttribute("data-form-status", "");
      statusMessage.setAttribute("role", "status");
      rsvpForm.append(statusMessage);
    }

    statusMessage.textContent = "Thank you. RSVP collection will be connected closer to the wedding.";
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

const calendarLinks = document.querySelectorAll(".calendar-link[download]");

if (calendarLinks.length) {
  let toastTimer;
  const toast = document.createElement("div");
  toast.className = "site-toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  document.body.append(toast);

  calendarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      link.classList.add("is-confirming");
      toast.textContent = "Calendar file is ready for your weekend plans.";
      toast.classList.add("is-visible");

      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => {
        toast.classList.remove("is-visible");
        link.classList.remove("is-confirming");
      }, 1800);
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

  if (Number.isFinite(targetTime)) {
    updateCountdown();
    countdownTimer = window.setInterval(updateCountdown, 1000);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && countdownTimer) {
        window.clearInterval(countdownTimer);
        countdownTimer = null;
      } else if (!document.hidden && !countdownTimer) {
        updateCountdown();
        countdownTimer = window.setInterval(updateCountdown, 1000);
      }
    });
  } else {
    countdown.setAttribute("aria-label", "Countdown date is unavailable.");
  }
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
  let weatherRequested = false;

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

  const formatTemperature = (value) => `${Math.round(value)}\u00b0`;
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
    weatherRequested = false;
    weatherWidget.classList.add("weather-panel-error");

    if (tempElement) tempElement.textContent = "Mobile, AL";
    if (conditionElement) conditionElement.textContent = "The forecast is taking a little longer than expected.";
    if (feelsLikeElement) feelsLikeElement.textContent = "--";
    if (humidityElement) humidityElement.textContent = "--";
    if (windElement) windElement.textContent = "--";
    if (forecastElement) {
      forecastElement.innerHTML = `
        <p class="weather-loading">The forecast is taking a little longer than expected. You can try again here before you pack.</p>
        <button class="button button-secondary weather-retry" type="button">Try Again</button>
      `;

      const retryButton = forecastElement.querySelector(".weather-retry");

      if (retryButton) {
        retryButton.addEventListener("click", loadWeather, { once: true });
      }
    }
  };

  const loadWeather = () => {
    if (weatherRequested) {
      return;
    }

    weatherRequested = true;
    weatherWidget.classList.remove("weather-panel-error");

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
  };

  if ("IntersectionObserver" in window) {
    const weatherObserver = new IntersectionObserver(
      (entries, observer) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          loadWeather();
        }
      },
      { rootMargin: "360px 0px" }
    );

    weatherObserver.observe(weatherWidget);
  } else {
    loadWeather();
  }
}

const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const revealSelectors = [
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
  element.style.setProperty("--reveal-delay", `${Math.min(groupIndex, 3) * 85}ms`);
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

const scrollBorderCards = document.querySelectorAll(
  [
    ".home-detail-item",
    ".home-feature-card",
    ".event-card",
    ".venue-feature",
    ".lodging-detail",
    ".airport-card",
    ".travel-note",
    ".weather-panel"
  ].join(",")
);

const updateScrollBorderCards = () => {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  scrollBorderCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const travel = viewportHeight + rect.height;
    const progress = travel === 0 ? 0 : (viewportHeight - rect.top) / travel;
    const clampedProgress = Math.min(1, Math.max(0, progress));
    const counterclockwiseAngle = 360 - clampedProgress * 360;

    card.style.setProperty("--border-progress", clampedProgress.toFixed(4));
    card.style.setProperty("--border-angle", `${counterclockwiseAngle.toFixed(2)}deg`);
    card.style.setProperty("--scroll-border-progress", clampedProgress.toFixed(4));
    card.style.setProperty("--scroll-border-angle", `${counterclockwiseAngle.toFixed(2)}deg`);
  });
};

if (scrollBorderCards.length) {
  if (reduceMotionQuery.matches) {
    scrollBorderCards.forEach((card) => {
      card.style.setProperty("--border-progress", "0.18");
      card.style.setProperty("--border-angle", "295.2deg");
      card.style.setProperty("--scroll-border-progress", "0.18");
      card.style.setProperty("--scroll-border-angle", "295.2deg");
    });
  } else {
    let borderFrame = null;

    const scheduleScrollBorderUpdate = () => {
      if (borderFrame !== null) {
        return;
      }

      borderFrame = window.requestAnimationFrame(() => {
        borderFrame = null;
        updateScrollBorderCards();
      });
    };

    updateScrollBorderCards();
    window.addEventListener("scroll", scheduleScrollBorderUpdate, { passive: true });
    window.addEventListener("resize", scheduleScrollBorderUpdate);

    reduceMotionQuery.addEventListener("change", (event) => {
    if (event.matches) {
      scrollBorderCards.forEach((card) => {
        card.style.setProperty("--border-progress", "0.18");
        card.style.setProperty("--border-angle", "295.2deg");
        card.style.setProperty("--scroll-border-progress", "0.18");
        card.style.setProperty("--scroll-border-angle", "295.2deg");
      });
    } else {
        updateScrollBorderCards();
      }
    });
  }
}

const initVenueStackedCards = () => {
  const venueShowcase = document.querySelector(".venue-showcase");
  const venueCards = Array.from(document.querySelectorAll(".venue-feature"));

  if (
    !venueShowcase ||
    venueCards.length < 2 ||
    !window.gsap ||
    !window.ScrollTrigger
  ) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const venueStack = gsap.matchMedia();

  venueStack.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
    venueShowcase.classList.add("venue-stack-enabled");

    venueCards.forEach((card, index) => {
      const venueImage = card.querySelector(".venue-photo img");

      card.classList.add("is-visible");

      gsap.set(card, {
        transformOrigin: "center top",
        zIndex: index + 1
      });

      if (venueImage) {
        gsap.to(venueImage, {
          scale: 1.085,
          yPercent: -3,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      if (index === venueCards.length - 1) {
        return;
      }

      const remainingCards = venueCards.length - index - 1;

      gsap.to(card, {
        scale: 1 - remainingCards * 0.035,
        y: -remainingCards * 18,
        ease: "none",
        scrollTrigger: {
          trigger: venueCards[index + 1],
          start: "top 78%",
          end: "top 30%",
          scrub: true
        }
      });
    });

    ScrollTrigger.refresh();

    return () => {
      venueShowcase.classList.remove("venue-stack-enabled");
      venueCards.forEach((card) => {
        gsap.set(card, { clearProps: "transform,zIndex,willChange" });
        const venueImage = card.querySelector(".venue-photo img");

        if (venueImage) {
          gsap.set(venueImage, { clearProps: "transform,willChange" });
        }
      });
    };
  });
};

initHomeColumnReveal();
initHomeGuideEditorial();
initHomeGuideCarousel();
initAirportFlipCards();
initVenueStackedCards();
