// ─── Navbar ───────────────────────────────────────────────────────────────────
(function initNavbar() {
  const SCROLL_THRESHOLD = 50;
  const navbar     = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu    = document.getElementById('navMenu');

  if (!navbar || !menuToggle || !navMenu) return;

  function onScroll() {
    navbar.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  });

  navMenu.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      closeMenu();
      menuToggle.focus();
    }
  });

  function closeMenu() {
    navMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.navbar__link');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
            });
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => sectionObserver.observe(s));
  }
})();

// ─── Scroll animations ────────────────────────────────────────────────────────
(function initScrollAnimations() {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
})();

// ─── Smooth scroll ────────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Back to top ─────────────────────────────────────────────────────────────
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ─── WhatsApp confirm modal ───────────────────────────────────────────────────
(function initWhatsappModal() {
  const modal    = document.getElementById('whatsappModal');
  const backdrop = document.getElementById('whatsappBackdrop');
  const closeBtn = document.getElementById('whatsappClose');
  const confirm  = document.getElementById('whatsappConfirm');
  const cancel   = document.getElementById('whatsappCancel');
  if (!modal) return;

  let pendingUrl = '';

  function open(url) {
    pendingUrl = url;
    modal.removeAttribute('hidden');
    document.body.classList.add('menu-open');
    closeBtn.focus();
  }

  function close() {
    modal.setAttribute('hidden', '');
    document.body.classList.remove('menu-open');
    pendingUrl = '';
  }

  document.querySelectorAll('[data-whatsapp-modal]').forEach(btn => {
    btn.addEventListener('click', () => open(btn.dataset.whatsappUrl));
  });

  backdrop.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  cancel.addEventListener('click', close);
  confirm.addEventListener('click', () => {
    window.open(pendingUrl, '_blank', 'noopener,noreferrer');
    close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) close();
  });
})();

// ─── WhatsApp confirm modal ───────────────────────────────────────────────────
(function initWhatsappModal() {
  const modal    = document.getElementById('whatsappModal');
  const backdrop = document.getElementById('whatsappBackdrop');
  const closeBtn = document.getElementById('whatsappClose');
  const confirm  = document.getElementById('whatsappConfirm');
  const cancel   = document.getElementById('whatsappCancel');
  if (!modal) return;

  let pendingUrl = '';

  function open(url) {
    pendingUrl = url;
    modal.removeAttribute('hidden');
    document.body.classList.add('menu-open');
    closeBtn.focus();
  }

  function close() {
    modal.setAttribute('hidden', '');
    document.body.classList.remove('menu-open');
    pendingUrl = '';
  }

  document.querySelectorAll('[data-whatsapp-modal]').forEach(btn => {
    btn.addEventListener('click', () => open(btn.dataset.whatsappUrl));
  });

  backdrop.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  cancel.addEventListener('click', close);
  confirm.addEventListener('click', () => {
    window.open(pendingUrl, '_blank', 'noopener,noreferrer');
    close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) close();
  });
})();

// ─── Transfer modal ───────────────────────────────────────────────────────────
(function initTransferModal() {
  const modal    = document.getElementById('transferModal');
  const backdrop = document.getElementById('transferBackdrop');
  const closeBtn = document.getElementById('transferClose');
  const dismiss  = document.getElementById('transferDismiss');
  const copyBtn  = document.getElementById('copyAlias');
  if (!modal) return;

  function open() {
    modal.removeAttribute('hidden');
    document.body.classList.add('menu-open');
    closeBtn.focus();
  }

  function close() {
    modal.setAttribute('hidden', '');
    document.body.classList.remove('menu-open');
  }

  document.querySelectorAll('[data-transfer-modal]').forEach(btn => btn.addEventListener('click', open));
  backdrop.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  dismiss.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) close();
  });

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('vertigo.vapes').then(() => {
      copyBtn.textContent = '¡Copiado!';
      copyBtn.classList.add('transfer-modal__copy--done');
      setTimeout(() => {
        copyBtn.textContent = 'Copiar';
        copyBtn.classList.remove('transfer-modal__copy--done');
      }, 2000);
    });
  });
})();

// ─── Gallery carousel ─────────────────────────────────────────────────────────
(function initGalleryCarousel() {
  const carousel = document.querySelector('.galeria__carousel');
  if (!carousel) return;
  const track   = carousel.querySelector('.galeria__track');
  const slides  = carousel.querySelectorAll('.galeria__slide');
  const dots    = carousel.querySelectorAll('.galeria__dot');
  const prevBtn = carousel.querySelector('.galeria__nav--prev');
  const nextBtn = carousel.querySelector('.galeria__nav--next');
  const total   = slides.length;
  let current   = 0;
  let timer;

  function goTo(index) {
    dots[current].classList.remove('is-active');
    dots[current].setAttribute('aria-selected', 'false');
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots[current].classList.add('is-active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  function play()  { timer = setInterval(() => goTo(current + 1), 4000); }
  function pause() { clearInterval(timer); }

  prevBtn.addEventListener('click', () => { pause(); goTo(current - 1); play(); });
  nextBtn.addEventListener('click', () => { pause(); goTo(current + 1); play(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { pause(); goTo(i); play(); }));

  carousel.addEventListener('mouseenter', pause);
  carousel.addEventListener('mouseleave', play);

  let touchX = 0;
  carousel.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; pause(); }, { passive: true });
  carousel.addEventListener('touchend',   e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    play();
  }, { passive: true });

  play();
})();
