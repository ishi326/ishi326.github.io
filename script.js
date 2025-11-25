// Remove no-js class so CSS fallbacks don't force everything visible
document.documentElement.classList.remove('no-js');

/* ================== PROJECTS: Flip card logic ================== */
document.querySelectorAll('.card').forEach(card=>{
  const btn = card.querySelector('.flip-btn');
  const inner = card.querySelector('.card-inner');
  const back = card.querySelector('.card-back');
  if(btn){
    btn.addEventListener('click', e=>{
      e.stopPropagation();
      inner.classList.add('flipped');
    });
  }
  if(back){
    back.addEventListener('click', e=>{
      e.stopPropagation();
      inner.classList.remove('flipped');
    });
  }
});

/* ================== PROJECTS: Strong 3D tilt ================== */
(function(){
  const clamp=(v,min,max)=>Math.max(min, Math.min(v,max));
  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const r=card.getBoundingClientRect();
      const x=e.clientX - r.left;
      const y=e.clientY - r.top;
      const px=(x/r.width)-0.5;
      const py=(y/r.height)-0.5;
      const ry=clamp(-px*35,-40,40);
      const rx=clamp(py*25,-28,28);
      card.style.setProperty('--rx', rx+'deg');
      card.style.setProperty('--ry', ry+'deg');
      card.style.setProperty('--glx', x+'px');
      card.style.setProperty('--gly', y+'px');
    });
    card.addEventListener('mouseleave', ()=>{
      card.style.setProperty('--rx','0deg');
      card.style.setProperty('--ry','0deg');
      card.style.setProperty('--glx','50%');
      card.style.setProperty('--gly','50%');
    });
  });
})();

/* ================== EXPERIENCE: Scroll-in animation ================== */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('inview');
      io.unobserve(entry.target);
    }
  });
},{ threshold:0.15 });

document.querySelectorAll('.t-entry').forEach(el=>io.observe(el));
