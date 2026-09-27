const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.question-group details').forEach(details=>{
  const summary=details.querySelector('summary');
  let desired=details.open,animation=null;
  summary.addEventListener('click',event=>{
    if(reducedMotion.matches){desired=!details.open;return;}
    event.preventDefault();
    const start=details.getBoundingClientRect().height;
    desired=!desired;
    if(animation){animation.onfinish=null;animation.cancel();}
    details.open=true;
    const target=desired?details.getBoundingClientRect().height:summary.getBoundingClientRect().height+1;
    details.style.overflow='hidden';
    animation=details.animate([{height:`${start}px`},{height:`${target}px`}],{duration:280,easing:'cubic-bezier(.25,.7,.25,1)'});
    animation.onfinish=()=>{details.open=desired;details.style.overflow='';animation=null;};
  });
});

const navToggle=document.querySelector('.nav-toggle'),navMenu=document.querySelector('.nav-menu');
function closeMenu(){navToggle.setAttribute('aria-expanded','false');navMenu.classList.remove('is-open')}
navToggle.addEventListener('click',()=>{const open=navToggle.getAttribute('aria-expanded')!=='true';navToggle.setAttribute('aria-expanded',String(open));navMenu.classList.toggle('is-open',open)});
navMenu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navMenu.classList.contains('is-open')){closeMenu();navToggle.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu()});

// Hide the fallback navigation only after its controls are ready.
document.documentElement.classList.add('nav-ready');
