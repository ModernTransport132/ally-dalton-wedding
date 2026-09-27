// Event content lives in the HTML so both days work even without this script.
const tabs=[...document.querySelectorAll('[data-day]')];
const panels=[...document.querySelectorAll('.day-panel')];
const photo=document.querySelector('#scene');
let photoTimer;
function choose(day,focus=false,updateUrl=true){
 const activePanel=document.querySelector('#panel-'+day);
 if(!activePanel)return;
 tabs.forEach(tab=>{const active=tab.dataset.day===day;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;if(active&&focus)tab.focus()});
 panels.forEach(panel=>{panel.hidden=panel!==activePanel});
 activePanel.classList.remove('panel-enter');void activePanel.offsetWidth;activePanel.classList.add('panel-enter');
 if(updateUrl)history.replaceState(null,'',location.pathname+location.search+'#'+day);
 clearTimeout(photoTimer);
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){photo.src=activePanel.dataset.image;photo.alt=activePanel.dataset.imageAlt;photo.style.opacity='1'}
 else{photo.style.opacity='.4';photoTimer=setTimeout(()=>{photo.src=activePanel.dataset.image;photo.alt=activePanel.dataset.imageAlt;photo.style.opacity='1'},160)}
}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>choose(tab.dataset.day));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(i+1)%tabs.length;else if(event.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();choose(tabs[next].dataset.day,true)})});
panels.forEach(panel=>{panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby','tab-'+panel.id.replace('panel-',''));panel.tabIndex=0});
choose(location.hash==='#friday'?'friday':'saturday',false,false);
document.querySelector('.days').hidden=false;
document.documentElement.classList.add('schedule-ready');
addEventListener('hashchange',()=>{if(['#friday','#saturday'].includes(location.hash))choose(location.hash.slice(1),false,false)});
document.addEventListener('toggle',event=>{if(event.target.matches('.calendar-menu[open]'))document.querySelectorAll('.calendar-menu[open]').forEach(menu=>{if(menu!==event.target)menu.open=false})},true);
document.addEventListener('click',event=>{document.querySelectorAll('.calendar-menu[open]').forEach(menu=>{if(!menu.contains(event.target))menu.open=false})});
document.addEventListener('keydown',event=>{if(event.key==='Escape')document.querySelectorAll('.calendar-menu[open]').forEach(menu=>{menu.open=false;menu.querySelector('summary').focus()})});
const navToggle=document.querySelector('.nav-toggle'),navMenu=document.querySelector('.nav-menu');
function closeMenu(){navToggle.setAttribute('aria-expanded','false');navMenu.classList.remove('is-open')}
navToggle.addEventListener('click',()=>{const open=navToggle.getAttribute('aria-expanded')!=='true';navToggle.setAttribute('aria-expanded',String(open));navMenu.classList.toggle('is-open',open)});
navMenu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navMenu.classList.contains('is-open')){closeMenu();navToggle.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu()});

// Hide the fallback navigation only after its controls are ready.
document.documentElement.classList.add('nav-ready');
