const navToggle=document.querySelector('.nav-toggle'),navMenu=document.querySelector('.nav-menu');
function closeMenu(){navToggle.setAttribute('aria-expanded','false');navMenu.classList.remove('is-open')}
navToggle.addEventListener('click',()=>{const open=navToggle.getAttribute('aria-expanded')!=='true';navToggle.setAttribute('aria-expanded',String(open));navMenu.classList.toggle('is-open',open)});
navMenu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navMenu.classList.contains('is-open')){closeMenu();navToggle.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu()});

const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
const reveals=[...document.querySelectorAll('.reveal')];
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}});
},{threshold:.08,rootMargin:'0px 0px -24px 0px'});
if(!motionPreference.matches){
  document.documentElement.classList.add('motion-ready');
  reveals.forEach(element=>revealObserver.observe(element));
}

const papers=[...document.querySelectorAll('.pick-category')];
let frame=0;
const clamp=value=>Math.max(0,Math.min(1,value));
function paintPapers(){
  frame=0;
  if(motionPreference.matches)return;
  const chrome=document.querySelector('.site-header').offsetHeight;
  papers.forEach(paper=>{
    const next=paper.nextElementSibling;
    const cover=next?clamp((innerHeight*.7-next.getBoundingClientRect().top)/(innerHeight*.7-chrome)):0;
    paper.style.setProperty('--paper-lift',(-cover*35)+'px');
    paper.style.setProperty('--paper-opacity',1-cover*.4);
  });
}
function measurePapers(){
  const chrome=document.querySelector('.site-header').offsetHeight;
  document.documentElement.classList.toggle('panel-motion',!motionPreference.matches);
  papers.forEach(paper=>paper.style.setProperty('--pin-top',Math.min(chrome+18,innerHeight-paper.offsetHeight-18)+'px'));
  paintPapers();
}
function queuePapers(){if(!frame)frame=requestAnimationFrame(paintPapers)}
addEventListener('scroll',queuePapers,{passive:true});
addEventListener('resize',measurePapers);
const paperResizeObserver=new ResizeObserver(measurePapers);
document.querySelectorAll('.picks-grid').forEach(stack=>paperResizeObserver.observe(stack));
document.fonts.ready.then(measurePapers);
measurePapers();

const book=document.querySelector('.fact-stories');
const stories=[...book.children];
const dots=[...document.querySelectorAll('[data-story]')];
const previous=document.querySelector('.story-prev'),next=document.querySelector('.story-next');
let selected=0,bookFrame=0;
function updateStory(){
  bookFrame=0;
  selected=Math.max(0,Math.min(stories.length-1,Math.round(book.scrollLeft/book.clientWidth)));
  dots.forEach((dot,i)=>{if(i===selected)dot.setAttribute('aria-current','true');else dot.removeAttribute('aria-current')});
  previous.disabled=selected===0;next.disabled=selected===stories.length-1;
}
function goStory(index){
  selected=Math.max(0,Math.min(stories.length-1,index));
  book.scrollTo({left:book.clientWidth*selected,behavior:motionPreference.matches?'instant':'smooth'});
}
dots.forEach((dot,i)=>dot.addEventListener('click',()=>goStory(i)));
previous.addEventListener('click',()=>goStory(selected-1));
next.addEventListener('click',()=>goStory(selected+1));
book.addEventListener('scroll',()=>{if(!bookFrame)bookFrame=requestAnimationFrame(updateStory)},{passive:true});
book.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();goStory(selected+(event.key==='ArrowRight'?1:-1))}});
motionPreference.addEventListener('change',()=>{document.documentElement.classList.remove('motion-ready');reveals.forEach(element=>element.classList.add('is-visible'));measurePapers()});
updateStory();
