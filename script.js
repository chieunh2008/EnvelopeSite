const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
const photo = document.getElementById('photo');
const loader = document.getElementById('loader');
const resetBtn = document.getElementById('reset');
let opened = false;

function openLetter(){
  if(opened) return;
  opened = true;
  envelope.classList.add('open');
  letter.setAttribute('aria-hidden','false');
  loader.style.display = 'flex';

  // lazy load ảnh của bạn
  const src = photo.dataset.src;
  const img = new Image();
  img.onload = ()=>{
    photo.src = src;
    photo.classList.add('loaded');
    loader.style.display = 'none';
  }
  img.onerror = ()=>{
    loader.style.display = 'none';
    photo.alt = 'Không tìm thấy ảnh. Vui lòng đặt file ảnh vào assets/photo.jpg';
    // hiển thị background placeholder
    photo.style.background = 'linear-gradient(135deg,#f6d6dd,#dbe9f8)';
  }
  img.src = src;
}

envelope.addEventListener('click', openLetter);
envelope.addEventListener('keydown', e=>{ if(e.key==='Enter' || e.key===' ') openLetter(); });

resetBtn.addEventListener('click', ()=>{
  envelope.classList.remove('open');
  letter.setAttribute('aria-hidden','true');
  photo.classList.remove('loaded');
  photo.src = '';
  opened = false;
});
