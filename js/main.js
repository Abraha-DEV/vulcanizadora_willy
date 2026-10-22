(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');

  if (toggle && nav) {
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
      nav.classList.remove('is-open');
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
      nav.classList.toggle('is-open', !isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        toggle.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (toggle.getAttribute('aria-expanded') === 'true' && !nav.contains(event.target) && !toggle.contains(event.target)) {
        closeMenu();
      }
    });
  }

  const year = document.querySelector('#current-year');
  if (year) year.textContent = new Date().getFullYear();

  const brandsCarousel = document.querySelector('.brands-carousel');
  if (brandsCarousel) {
    const brandsTrack = brandsCarousel.querySelector('.brands-track');
    const rotationToggle = document.querySelector('.carousel-toggle');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let manuallyPaused = reducedMotion.matches;
    let pointerInside = false;
    let focusInside = false;

    if (rotationToggle && manuallyPaused) {
      rotationToggle.setAttribute('aria-pressed', 'true');
      rotationToggle.setAttribute('aria-label', 'Reanudar rotación automática');
      rotationToggle.textContent = '▶';
    }

    const advanceBrand = () => {
      if (manuallyPaused || pointerInside || focusInside || document.hidden) return;
      const firstCard = brandsTrack?.firstElementChild;
      if (!firstCard) return;

      const gap = Number.parseFloat(getComputedStyle(brandsTrack).columnGap) || 0;
      const step = firstCard.getBoundingClientRect().width + gap;
      const end = brandsCarousel.scrollWidth - brandsCarousel.clientWidth;
      const nextPosition = brandsCarousel.scrollLeft + step;
      brandsCarousel.scrollTo({
        left: nextPosition >= end - 2 ? 0 : nextPosition,
        behavior: reducedMotion.matches ? 'instant' : 'smooth',
      });
    };

    document.querySelectorAll('[data-carousel-direction]').forEach((button) => {
      button.addEventListener('click', () => {
        const direction = button.dataset.carouselDirection === 'next' ? 1 : -1;
        brandsCarousel.scrollBy({
          left: direction * brandsCarousel.clientWidth * 0.85,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        });
      });
    });

    if (rotationToggle) {
      rotationToggle.addEventListener('click', () => {
        manuallyPaused = !manuallyPaused;
        rotationToggle.setAttribute('aria-pressed', String(manuallyPaused));
        rotationToggle.setAttribute('aria-label', manuallyPaused ? 'Reanudar rotación automática' : 'Pausar rotación automática');
        rotationToggle.textContent = manuallyPaused ? '▶' : 'Ⅱ';
      });
    }

    brandsCarousel.addEventListener('pointerenter', () => { pointerInside = true; });
    brandsCarousel.addEventListener('pointerleave', () => { pointerInside = false; });
    brandsCarousel.addEventListener('focusin', () => { focusInside = true; });
    brandsCarousel.addEventListener('focusout', (event) => {
      if (!brandsCarousel.contains(event.relatedTarget)) focusInside = false;
    });
    document.addEventListener('visibilitychange', advanceBrand);
    window.setInterval(advanceBrand, 3200);

    brandsCarousel.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        brandsCarousel.scrollBy({
          left: event.key === 'ArrowRight' ? brandsCarousel.clientWidth * 0.85 : -brandsCarousel.clientWidth * 0.85,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        });
      }
    });
  }

  const status = document.querySelector('#business-status');
  if (status) {
    const statusCopy = status.querySelector('.status-copy');
    const updateBusinessStatus = () => {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Monterrey',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      }).formatToParts(new Date());
      const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
      const minutes = Number(values.hour) * 60 + Number(values.minute);
      const opens = values.weekday === 'Sun' ? 9 * 60 : 7 * 60 + 20;
      const closes = values.weekday === 'Sun' ? 15 * 60 : 18 * 60;
      const isOpenDay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].includes(values.weekday);
      const isOpen = isOpenDay && minutes >= opens && minutes < closes;

      status.classList.toggle('is-open', isOpen);
      status.classList.toggle('is-closed', !isOpen);
      statusCopy.textContent = isOpen ? 'Abierto ahora' : 'Cerrado ahora';
    };

    updateBusinessStatus();
    window.setInterval(updateBusinessStatus, 60_000);
  }
})();
