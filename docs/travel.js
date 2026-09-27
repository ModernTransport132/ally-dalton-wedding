const navToggle=document.querySelector('.nav-toggle'),navMenu=document.querySelector('.nav-menu');
function closeMenu(){navToggle.setAttribute('aria-expanded','false');navMenu.classList.remove('is-open')}
navToggle.addEventListener('click',()=>{const open=navToggle.getAttribute('aria-expanded')!=='true';navToggle.setAttribute('aria-expanded',String(open));navMenu.classList.toggle('is-open',open)});
navMenu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navMenu.classList.contains('is-open')){closeMenu();navToggle.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu()});

const motion = matchMedia('(prefers-reduced-motion: reduce)');
const reveals = [...document.querySelectorAll('.reveal')];
if (!motion.matches && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: .08 });
  reveals.forEach(element => observer.observe(element));
}
motion.addEventListener('change', () => {
  if (motion.matches) document.documentElement.classList.remove('motion');
});

document.querySelectorAll('.action').forEach(control=>{
  control.addEventListener('click',()=>{control.classList.remove('tap-playing');void control.offsetWidth;control.classList.add('tap-playing')});
  control.querySelector('.button-line').addEventListener('animationend',()=>control.classList.remove('tap-playing'));
});

// Hide the fallback navigation only after its controls are ready.
document.documentElement.classList.add('nav-ready');
