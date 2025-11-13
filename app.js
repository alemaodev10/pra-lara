
(function(){
  const slidesEl = document.querySelector('.slides');
  const imgs = slidesEl.querySelectorAll('img');
  const total = imgs.length;
  let idx = 0;
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');

  function update(){
    slidesEl.style.transform = `translateX(-${idx * 100}%)`;
  }
  prev.addEventListener('click', ()=>{ idx = (idx-1+total)%total; update(); });
  next.addEventListener('click', ()=>{ idx = (idx+1)%total; update(); });

  // autoplay carousel
  let autoplay = setInterval(()=>{ idx=(idx+1)%total; update(); }, 4200);
  [prev,next].forEach(b=>b.addEventListener('click', ()=>{ clearInterval(autoplay); autoplay = setInterval(()=>{ idx=(idx+1)%total; update(); },4200);}));

  // particles — lightweight
  const particlesWrap = document.querySelector('.particles');
  const cw = particlesWrap.clientWidth || window.innerWidth;
  const ch = Math.max(window.innerHeight, 600);
  const ctxCanvas = document.createElement('canvas');
  ctxCanvas.width = cw; ctxCanvas.height = ch;
  particlesWrap.appendChild(ctxCanvas);
  const ctx = ctxCanvas.getContext('2d');
  let parts = [];
  function rand(a,b){return Math.random()*(b-a)+a;}
  for(let i=0;i<60;i++){ parts.push({x:rand(0,cw), y:rand(0,ch), r:rand(1,3), vx:rand(-0.2,0.2), vy:rand(0.2,1.2), alpha:rand(0.1,0.9) }); }
  function loop(){
    ctx.clearRect(0,0,ctxCanvas.width,ctxCanvas.height);
    parts.forEach(p=>{ p.x += p.vx; p.y += p.vy; if(p.y>ctxCanvas.height){p.y=-10;p.x=rand(0,ctxCanvas.width)}; ctx.globalAlpha = p.alpha; ctx.fillStyle = 'rgba(212,175,55,0.9)'; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); });
    requestAnimationFrame(loop);
  }
  loop();

  // YouTube modal handling
  const modal = document.getElementById('videoModal');
  const playBtn = document.getElementById('playMusic');
  const closeBtn = document.getElementById('closeModal');
  const videoWrap = document.getElementById('videoWrap');
  // Updated video ID
  const ytId = 'qH4yRUxpAxo';
  function openModal(){
    modal.setAttribute('aria-hidden', 'false');
    videoWrap.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1" title="Henrique e Juliano - Até Você Voltar" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;

  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    videoWrap.innerHTML = '';
  }
  playBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });
})();
