const tiles=[...document.querySelectorAll('.gallery-tile')];
const viewer=document.querySelector('.lightbox'), frame=document.querySelector('.lightbox-frame');
let active=0;
function showPhoto(index){
  active=(index+tiles.length)%tiles.length;
  const tile=tiles[active], image=document.querySelector('#lightbox-photo');
  image.src=tile.dataset.full;
  image.alt=tile.querySelector('img').alt;
  document.querySelector('.photo-count').textContent=`${active+1} / ${tiles.length}`;
  viewer.setAttribute('aria-label',`Photo ${active+1} of ${tiles.length}`);
}
tiles.forEach((tile,i)=>tile.addEventListener('click',()=>{showPhoto(i);viewer.showModal();viewer.querySelector('.lightbox-close').focus();}));
viewer.querySelector('.lightbox-close').addEventListener('click',()=>viewer.close());
viewer.querySelector('.previous').addEventListener('click',()=>showPhoto(active-1));
viewer.querySelector('.next').addEventListener('click',()=>showPhoto(active+1));
viewer.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(active-1);}if(event.key==='ArrowRight'){event.preventDefault();showPhoto(active+1);}});
viewer.addEventListener('click',event=>{if(event.target!==viewer)return;const r=viewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)viewer.close();});
let touchStart=null;
frame.addEventListener('pointerdown',event=>{if(event.pointerType==='touch')touchStart={x:event.clientX,y:event.clientY};});
frame.addEventListener('pointerup',event=>{if(!touchStart)return;const dx=event.clientX-touchStart.x,dy=event.clientY-touchStart.y;touchStart=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.4)showPhoto(active+(dx<0?1:-1));});
frame.addEventListener('pointercancel',()=>touchStart=null);
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('tile-reveal');observer.unobserve(entry.target);}}),{threshold:.08});tiles.forEach(tile=>observer.observe(tile));}

const navToggle=document.querySelector('.nav-toggle'),navMenu=document.querySelector('.nav-menu');
function closeMenu(){navToggle.setAttribute('aria-expanded','false');navMenu.classList.remove('is-open')}
navToggle.addEventListener('click',()=>{const open=navToggle.getAttribute('aria-expanded')!=='true';navToggle.setAttribute('aria-expanded',String(open));navMenu.classList.toggle('is-open',open)});
navMenu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navMenu.classList.contains('is-open')){closeMenu();navToggle.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu()});

// Hide the fallback navigation only after its controls are ready.
document.documentElement.classList.add('nav-ready');
