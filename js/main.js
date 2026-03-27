document.addEventListener('DOMContentLoaded', () => {
  // NAV TOGGLE
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.navbar__nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }
  // STICKY SHADOW
  const navbar = document.querySelector('.navbar');
  if (navbar) window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 10));
  // ACTIVE LINK
  const cur = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__nav a').forEach(a => {
    if (a.getAttribute('href') === cur) a.classList.add('active');
  });
  // SCROLL REVEAL
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    reveals.forEach(el => io.observe(el));
  }
  // BACK TO TOP
  const btt = document.getElementById('btt');
  if (btt) {
    window.addEventListener('scroll', () => btt.classList.toggle('show', window.scrollY > 400));
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
  // FILTER CHIPS
  document.querySelectorAll('.fc-group').forEach(group => {
    group.querySelectorAll('.fc').forEach(chip => {
      chip.addEventListener('click', () => {
        group.querySelectorAll('.fc').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });
  });
  // FAVORITES
  document.querySelectorAll('.lc-fav').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      const on = btn.classList.toggle('fav-on');
      btn.textContent = on ? '❤️' : '🤍';
      showToast(on ? 'Added to favorites' : 'Removed from favorites');
    });
  });
  // MODAL
  const mo = document.getElementById('contact-modal');
  if (mo) {
    document.querySelectorAll('[data-modal="contact"]').forEach(b => b.addEventListener('click', () => mo.classList.add('open')));
    mo.addEventListener('click', e => { if (e.target === mo) mo.classList.remove('open'); });
    document.querySelectorAll('.modal__close').forEach(b => b.addEventListener('click', () => mo.classList.remove('open')));
  }
  // CONTACT FORM
  const cf = document.getElementById('contact-form');
  if (cf) cf.addEventListener('submit', e => { e.preventDefault(); mo && mo.classList.remove('open'); showToast('✅ Message sent successfully!'); });
  // MAIN CONTACT FORM
  const mcf = document.getElementById('main-contact-form');
  if (mcf) mcf.addEventListener('submit', e => { e.preventDefault(); showToast('✅ Your message has been sent!'); mcf.reset(); });
  // GALLERY
  const thumbs = document.querySelectorAll('.gallery__thumb');
  const gmain = document.querySelector('.gallery__main');
  if (thumbs.length && gmain) {
    thumbs.forEach(t => t.addEventListener('click', () => {
      thumbs.forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      gmain.textContent = t.textContent;
    }));
  }
  // SEARCH HINTS
  document.querySelectorAll('.hint').forEach(h => {
    h.addEventListener('click', () => {
      const inp = document.querySelector('.search-bar input');
      if (inp) { inp.value = h.textContent.trim(); inp.focus(); }
    });
  });
  // TOAST
  window.showToast = (msg, dur = 2800) => {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), dur);
  };
});
