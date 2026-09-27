(() => {
  const intro = document.querySelector('[data-mobile-intro]');
  if (!intro) return;
  const video = intro.querySelector('video');
  const source = video.querySelector('source');
  const skip = intro.querySelector('button');
  const mobile = matchMedia('(max-width: 899px)');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const storageKey = 'ally-dalton-mobile-intro-seen';
  let seen = false;
  try { seen = sessionStorage.getItem(storageKey) === 'true'; } catch {}
  if (!mobile.matches || motion.matches || document.documentElement.classList.contains('reduce-motion') || seen) return;

  let dismissed = false;
  let timer;
  const background = [...document.body.children].filter(el => el !== intro && !['SCRIPT', 'STYLE'].includes(el.tagName));
  const previousInert = background.map(el => el.inert);
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    clearTimeout(timer);
    try { sessionStorage.setItem(storageKey, 'true'); } catch {}
    video.pause();
    intro.classList.remove('is-visible');
    document.body.classList.remove('mobile-intro-lock');
    background.forEach((el, i) => { el.inert = previousInert[i]; });
    if (intro.contains(document.activeElement)) {
      const main = document.querySelector('main');
      if (main) {
        const previousTabindex = main.getAttribute('tabindex');
        main.setAttribute('tabindex', '-1');
        main.focus({ preventScroll: true });
        if (previousTabindex === null) main.removeAttribute('tabindex');
        else main.setAttribute('tabindex', previousTabindex);
      }
    }
    intro.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', onKey);
    mobile.removeEventListener('change', onPreferenceChange);
    motion.removeEventListener('change', onPreferenceChange);
  }
  function onKey(event) {
    if (event.key === 'Escape') dismiss();
    if (event.key === 'Tab') { event.preventDefault(); skip.focus({ preventScroll: true }); }
  }
  function onPreferenceChange() { if (!mobile.matches || motion.matches) dismiss(); }
  skip.addEventListener('click', dismiss);
  video.addEventListener('ended', dismiss);
  video.addEventListener('error', dismiss);
  source.addEventListener('error', dismiss);
  document.addEventListener('keydown', onKey);
  mobile.addEventListener('change', onPreferenceChange);
  motion.addEventListener('change', onPreferenceChange);
  background.forEach(el => { el.inert = true; });
  intro.removeAttribute('aria-hidden');
  document.body.classList.add('mobile-intro-lock');
  intro.classList.add('is-visible');
  skip.focus({ preventScroll: true });
  video.muted = true;
  source.src = source.dataset.src;
  video.load();
  timer = setTimeout(dismiss, 9000);
  video.play()?.catch(() => {
    if (dismissed) return;
    clearTimeout(timer);
    timer = setTimeout(dismiss, 1400);
  });
})();
