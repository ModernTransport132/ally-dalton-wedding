const one=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];
const motion=matchMedia('(prefers-reduced-motion: reduce)'),root=document.documentElement;
let reduced=root.classList.contains('reduce-motion');const clamp=v=>Math.max(0,Math.min(1,v)),ease=v=>v*v*(3-2*v),mix=(a,b,p)=>a+(b-a)*p;
const story=one('.story'),stage=one('.story-stage'),portraits=all('.portrait'),copy=one('.welcome-copy');let queued=false;
function pose(el,x,y,w,h){Object.assign(el.style,{left:x+'%',top:y+'%',width:w+'%',height:h+'%'})}
function paint(){queued=false;if(reduced)return;const rect=story.getBoundingClientRect(),raw=clamp(-rect.top/Math.max(1,story.offsetHeight-stage.offsetHeight)),p=clamp(raw/.62);if(innerWidth>760){const align=ease(clamp(p/.28)),depart=ease(clamp((p-.4)/.46));pose(portraits[0],mix(7,-63,depart),mix(18,15,align),mix(25,27,align),mix(58,70,align));pose(portraits[1],mix(37.5,-30,depart),mix(25,15,align),mix(25,27,align),mix(58,70,align));pose(portraits[2],mix(68,57,depart),mix(mix(32,15,align),8,depart),mix(mix(25,27,align),35,depart),mix(mix(58,70,align),84,depart));portraits[0].style.opacity=portraits[1].style.opacity=1-clamp((p-.66)/.16);const reveal=ease(clamp((p-.62)/.227));copy.style.clipPath=`inset(0 0 ${100*(1-reveal)}% 0)`;copy.style.transform=`translateY(${35*(1-reveal)}px)`}else{const enter2=ease(clamp((p-.12)/.22)),enter3=ease(clamp((p-.37)/.23)),finish=ease(clamp((p-.65)/.22));pose(portraits[0],8,mix(16,-85,finish),65,51);pose(portraits[1],25,mix(110,23,enter2)-finish*105,65,51);pose(portraits[2],mix(12,21,finish),mix(mix(110,18,enter3),6,finish),mix(76,58,finish),mix(58,48,finish));portraits[0].style.opacity=portraits[1].style.opacity=1-finish;const reveal=ease(clamp((p-.73)/.18));copy.style.clipPath=`inset(0 0 ${100*(1-reveal)}% 0)`;copy.style.transform=`translateY(${25*(1-reveal)}px)`}paintStoryExit(raw)}

function paintStoryExit(raw){const arch=one('.weekend-arch'),mobile=innerWidth<=760;const expand=ease(clamp((raw-.65)/.17));if(raw>=.65){pose(portraits[2],mix(mobile?21:57,0,expand),mix(mobile?6:8,0,expand),mix(mobile?58:35,100,expand),mix(mobile?48:84,100,expand))}copy.style.opacity=1-ease(clamp((raw-.64)/.09));const lift=ease(clamp((raw-.8)/.18));arch.style.transform='translateY('+110*(1-lift)+'%)';arch.style.borderRadius='50% 50% 0 0 / '+18*(1-lift)+'% '+18*(1-lift)+'% 0 0'}
function queue(){if(!queued){queued=true;requestAnimationFrame(paint)}}addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);paint();
function setMotion(value){reduced=value;root.classList.toggle('reduce-motion',value);portraits.forEach(el=>el.removeAttribute('style'));copy.removeAttribute('style');paint()}
motion.addEventListener('change',e=>setMotion(e.matches));

function updateCountdown(){const total=Math.max(0,Math.floor((new Date('2027-04-17T14:00:00-05:00')-Date.now())/1000));const values={days:Math.floor(total/86400),hours:Math.floor(total/3600)%24,minutes:Math.floor(total/60)%60,seconds:total%60};Object.entries(values).forEach(([key,value])=>one('[data-count="'+key+'"]').textContent=String(value).padStart(2,'0'))}updateCountdown();setInterval(updateCountdown,1000);

// Keep link destinations and dialog actions immediate; replay feedback on each tap.
all('.action, .more-links a, .more-links button').forEach(control=>{
 const arrow=document.createElement('span');arrow.className='button-arrow';arrow.setAttribute('aria-hidden','true');arrow.innerHTML='<svg viewBox="0 0 32 20" fill="none"><path d="M1 10H29M21 2L29 10L21 18" stroke="currentColor" stroke-width="1.3"/></svg>';
 const line=document.createElement('span');line.className='button-line';line.setAttribute('aria-hidden','true');
 control.append(arrow,line);
 control.addEventListener('click',()=>{control.classList.remove('tap-playing');void control.offsetWidth;control.classList.add('tap-playing')});
 line.addEventListener('animationend',()=>control.classList.remove('tap-playing'));
});

// Reveal weekend details once as they enter the viewport.
if('IntersectionObserver' in window){
 const weekend=one('.weekend');
 const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');reveal.unobserve(entry.target)}}),{threshold:.18});
 weekend.classList.add('reveal-ready');
 all('.weekend-title,.guest-guide article').forEach(el=>reveal.observe(el));
}

const navToggle=document.querySelector(".nav-toggle"),navMenu=document.querySelector(".nav-menu");
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

  window.matchMedia("(min-width: 760px)").addEventListener("change", (event) => {
    if (event.matches) {
      closeMenu();
    }
  });
}

// Native scrolling drives a compact sticky collage; no wheel or touch interception.
const collageSection=one('.gallery-preview'),collagePin=one('.gallery-pin');
const collageEntries=[{el:one('.collage-ally'),start:0,x:-45,y:35},{el:one('.collage-dalton'),start:.14,x:45,y:25},{el:one('.collage-together'),start:.28,x:0,y:65}];
let collageQueued=false;
function paintCollage(){collageQueued=false;if(reduced)return;const top=innerWidth>760?72:66;const lead=Math.min(280,innerHeight*.3);const p=clamp((top+lead-collageSection.getBoundingClientRect().top)/Math.max(1,collageSection.offsetHeight-collagePin.offsetHeight+lead));collageEntries.forEach(({el,start,x,y})=>{const t=ease(clamp((p-start)/.46));el.style.setProperty('--entry-x',x*(1-t)+'px');el.style.setProperty('--entry-y',y*(1-t)+'px');el.style.setProperty('--entry-opacity',t)});collagePin.style.setProperty('--link-opacity',ease(clamp((p-.62)/.22)))}
function queueCollage(){if(!collageQueued){collageQueued=true;requestAnimationFrame(paintCollage)}}
addEventListener('scroll',queueCollage,{passive:true});addEventListener('resize',queueCollage);motion.addEventListener('change',queueCollage);paintCollage();
