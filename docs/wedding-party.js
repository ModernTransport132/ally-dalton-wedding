const people = [
  {
    "name": "Amanda Hall",
    "role": "Maid of Honor",
    "story": "Bio coming soon."
  },
  {
    "name": "Elizabeth Anne Hall",
    "role": "Bridesmaid",
    "story": "Bio coming soon."
  },
  {
    "name": "Jordan Skinner",
    "role": "Bridesmaid",
    "story": "Bio coming soon."
  },
  {
    "name": "Judi Hoyt",
    "role": "Bridesmaid",
    "story": "Bio coming soon."
  },
  {
    "name": "Lilli Swearingen",
    "role": "Bridesmaid",
    "story": "Bio coming soon."
  },
  {
    "name": "Meghan Jones",
    "role": "Bridesmaid",
    "story": "Bio coming soon."
  },
  {
    "name": "Nicole Bernal",
    "role": "Bridesmaid",
    "story": "Bio coming soon."
  },
  {
    "name": "David Green",
    "role": "Best Man",
    "story": "Bio coming soon."
  },
  {
    "name": "Ethan Green",
    "role": "Best Man",
    "story": "Bio coming soon."
  },
  {
    "name": "Alec Hazard",
    "role": "Groomsman",
    "story": "Bio coming soon."
  },
  {
    "name": "Guy Johns",
    "role": "Groomsman",
    "story": "Bio coming soon."
  },
  {
    "name": "Jake Goff",
    "role": "Groomsman",
    "story": "Bio coming soon."
  },
  {
    "name": "Kyler Thompson",
    "role": "Groomsman",
    "story": "Bio coming soon."
  },
  {
    "name": "Zach Anderson",
    "role": "Groomsman",
    "story": "Bio coming soon."
  }
];
const section=document.querySelector('.ribbon-section'), stage=document.querySelector('.stage');
const tracks=[...document.querySelectorAll('.ribbon')], cards=[...document.querySelectorAll('.person')];
const toggle=document.querySelector('.view-toggle'), reduced=matchMedia('(prefers-reduced-motion: reduce)');
let all=false, travel=[0,0], active=0, frame=0;
let pin=0, range=1, sectionStart=0, measuredWidth=innerWidth;
const touchViewport=matchMedia('(hover: none) and (pointer: coarse)');
function paint(){
  frame=0;
  if(all||reduced.matches)return;
  const progress=Math.max(0,Math.min(1,(scrollY+pin-sectionStart)/range));
  tracks[0].style.transform=`translate3d(${-travel[0]*progress}px,0,0)`;
  tracks[1].style.transform=`translate3d(${-travel[1]*(1-progress)}px,0,0)`;
}
function measure(){
  document.documentElement.style.setProperty('--chrome-height',document.querySelector('.site-header').offsetHeight+'px');
  section.classList.toggle('all-visible',all||reduced.matches);
  toggle.hidden=reduced.matches;
  stage.style.height='';
  if(all||reduced.matches){section.style.height='auto';stage.style.top='';stage.style.minHeight='0px';return;}
  const stageStyle=getComputedStyle(stage);
  stage.style.minHeight=([...stage.children].reduce((sum,child)=>sum+child.offsetHeight,0)+parseFloat(stageStyle.paddingTop)+parseFloat(stageStyle.paddingBottom))+"px";
  travel=tracks.map(t=>Math.max(0,t.scrollWidth-t.parentElement.clientWidth));
  section.style.height=`${stage.offsetHeight+Math.max(...travel)*1.9+innerHeight*.55}px`;
  stage.style.height=stage.offsetHeight+'px';
  pin=Math.min(document.querySelector('.site-header').offsetHeight,innerHeight-stage.offsetHeight);
  range=Math.max(1,section.offsetHeight-stage.offsetHeight);
  sectionStart=section.getBoundingClientRect().top+scrollY;
  stage.style.top=pin+'px';
  paint();
}
addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(paint)},{passive:true});
addEventListener('resize',()=>{
  // Mobile browser bars resize the viewport while scrolling. Keep the pinned
  // layout stable until the width changes (rotation), rather than resetting it.
  if(touchViewport.matches&&innerWidth===measuredWidth)return;
  measuredWidth=innerWidth;
  measure();
}); reduced.addEventListener('change',measure);
toggle.addEventListener('click',()=>{
  all=!all;toggle.textContent=all?'Back to the ribbon':'View everyone';toggle.setAttribute('aria-pressed',String(all));measure();
  section.scrollIntoView({block:'start',behavior:'instant'});
});
// Keep keyboard-focused portraits visible as the ribbon moves.
cards.forEach((card,i)=>card.querySelector('button').addEventListener('focus',()=>{
  if(all||reduced.matches||!card.querySelector('button').matches(':focus-visible'))return;
  const track=tracks[i<7?0:1],viewport=track.parentElement.getBoundingClientRect(),rect=card.getBoundingClientRect();
  if(rect.left>=viewport.left&&rect.right<=viewport.right)return;
  const row=i<7?0:1,desired=Math.max(0,Math.min(travel[row],card.offsetLeft-(viewport.width-card.offsetWidth)/2));
  const p=travel[row]?(row===0?desired/travel[row]:1-desired/travel[row]):0;
  scrollTo({top:sectionStart-pin+p*range,behavior:'instant'});
  paint();
}));
const dialog=document.querySelector('dialog');
function showPerson(index){active=(index+people.length)%people.length;const p=people[active];document.querySelector('#story-name').textContent=p.name;document.querySelector('#story-role').textContent=p.role;document.querySelector('#story-copy').textContent=p.story;document.querySelector('#story-count').textContent=`${active+1} of ${people.length}`;document.querySelector('.story-seal').textContent=p.name[0];dialog.style.setProperty('--tone',cards[active].style.getPropertyValue('--tone'));}
document.querySelectorAll('[data-person]').forEach(button=>button.addEventListener('click',()=>{showPerson(+button.dataset.person);dialog.showModal();dialog.querySelector('.close').focus();}));
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close();});
document.querySelector('#previous').addEventListener('click',()=>showPerson(active-1));document.querySelector('#next').addEventListener('click',()=>showPerson(active+1));
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight')showPerson(active+1);if(e.key==='ArrowLeft')showPerson(active-1);});
measure();document.fonts.ready.then(measure);

const navToggle=document.querySelector('.nav-toggle'),navMenu=document.querySelector('.nav-menu');
function closeMenu(){navToggle.setAttribute('aria-expanded','false');navMenu.classList.remove('is-open')}
navToggle.addEventListener('click',()=>{const open=navToggle.getAttribute('aria-expanded')!=='true';navToggle.setAttribute('aria-expanded',String(open));navMenu.classList.toggle('is-open',open)});
navMenu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navMenu.classList.contains('is-open')){closeMenu();navToggle.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu()});


