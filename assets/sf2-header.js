(function () {
  const header = document.querySelector('[data-sf2-header]');
  const headerGroup = document.querySelector('#header-group');
  if (!header) return;

  const SCROLL_THRESHOLD = 32;
  const mode = header.dataset.transparency;
  const heroHeader = header.dataset.heroHeader === 'true';
  const commerceSolid = header.dataset.commerceSolid === 'true';

  function setHeaderMetrics() {
    const nav = header.querySelector('.sf2-header__nav');
    const navHeight = nav ? nav.offsetHeight : 92;
    document.documentElement.style.setProperty('--sf2-header-nav-height', navHeight + 'px');
    if (headerGroup) {
      document.documentElement.style.setProperty('--sf2-header-group-height', headerGroup.offsetHeight + 'px');
    }
  }

  function updateHeaderState() {
    if (mode === 'always_solid' || commerceSolid) {
      header.classList.add('is-scrolled');
      headerGroup?.classList.remove('has-scrolled-header');
      return;
    }

    if (mode === 'always_transparent') {
      header.classList.remove('is-scrolled');
      headerGroup?.classList.remove('has-scrolled-header');
      return;
    }

    if (!heroHeader) {
      header.classList.remove('is-scrolled');
      headerGroup?.classList.remove('has-scrolled-header');
      return;
    }

    const scrolled = window.scrollY > SCROLL_THRESHOLD;
    header.classList.toggle('is-scrolled', scrolled);
    headerGroup?.classList.toggle('has-scrolled-header', scrolled);
  }

  setHeaderMetrics();
  updateHeaderState();

  window.addEventListener('scroll', updateHeaderState, { passive: true });
  window.addEventListener('resize', function () {
    setHeaderMetrics();
    updateHeaderState();
  });
  document.addEventListener('shopify:section:load', function () {
    setHeaderMetrics();
    updateHeaderState();
  });

  const drawer = document.querySelector('[data-sf2-drawer]');
  const openBtns = document.querySelectorAll('[data-sf2-menu-open]');
  const closeBtns = document.querySelectorAll('[data-sf2-menu-close]');
  let lastFocus = null;

  function openDrawer() {
    if (!drawer) return;
    lastFocus = document.activeElement;
    drawer.hidden = false;
    drawer.classList.add('is-open');
    openBtns.forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'true');
    });
    const first = drawer.querySelector('a, button');
    if (first) first.focus();
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    drawer.hidden = true;
    openBtns.forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false');
    });
    if (lastFocus) lastFocus.focus();
  }

  openBtns.forEach(function (btn) {
    btn.addEventListener('click', openDrawer);
  });
  closeBtns.forEach(function (btn) {
    btn.addEventListener('click', closeDrawer);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeDrawer();
  });
})();
