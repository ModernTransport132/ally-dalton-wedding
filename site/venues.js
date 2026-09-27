
const venues=[...document.querySelectorAll('.venue')];
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let frame=0;
const clamp=value=>Math.max(0,Math.min(1,value));
function measure(){
  // Taller mobile panels scroll all their text into view before pinning.
  const chrome=document.querySelector('.site-header').offsetHeight;
  document.documentElement.style.setProperty('--chrome-height',chrome+'px');
  venues.forEach(venue=>venue.style.setProperty('--pin-top',Math.min(chrome,innerHeight-venue.offsetHeight)+'px'));
  paint();
}
function paint(){
  frame=0;
  if(reducedMotion.matches)return;
  const chrome=document.querySelector('.site-header').offsetHeight;
  const height=innerHeight-chrome;
  venues.forEach((venue,i)=>{
    const arrival=clamp((venue.getBoundingClientRect().top-chrome)/height);
    const curve=i===0?0:Math.min(height*.16,innerWidth*.2)*arrival;
    const next=venues[i+1];
    const cover=next?clamp((height*.9-next.getBoundingClientRect().top)/(height*.9)):0;
    venue.style.setProperty('--curve',curve.toFixed(1)+'px');
    venue.style.setProperty('--image-scale',(1+arrival*.065+cover*.025).toFixed(4));
    venue.style.setProperty('--photo-scale',(1-cover*.035).toFixed(4));
    venue.style.setProperty('--photo-light',(1-cover*.12).toFixed(4));
  });
}
function schedule(){if(!frame)frame=requestAnimationFrame(paint)}
function configure(){document.documentElement.classList.toggle('scroll-venues',!reducedMotion.matches);measure()}
addEventListener('scroll',schedule,{passive:true});
addEventListener('resize',measure);
reducedMotion.addEventListener('change',configure);
new ResizeObserver(measure).observe(document.querySelector('.venues'));
document.fonts.ready.then(measure);
configure();
const navToggle=document.querySelector('.nav-toggle'),navMenu=document.querySelector('.nav-menu');
function closeMenu(){navToggle.setAttribute('aria-expanded','false');navMenu.classList.remove('is-open')}
navToggle.addEventListener('click',()=>{const open=navToggle.getAttribute('aria-expanded')!=='true';navToggle.setAttribute('aria-expanded',String(open));navMenu.classList.toggle('is-open',open)});
navMenu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navMenu.classList.contains('is-open')){closeMenu();navToggle.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu()});

// Hide the fallback navigation only after its controls are ready.
document.documentElement.classList.add('nav-ready');
