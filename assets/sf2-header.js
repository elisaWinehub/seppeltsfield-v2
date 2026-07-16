(function () {
  const header = document.querySelector('[data-sf2-header]');
  const headerGroup = document.querySelector('#header-group');
  if (!header || !headerGroup) return;

  function setHeaderOffset() {
    if (headerGroup.classList.contains('is-scrolled')) return;
    const announcement = document.querySelector('#header-group .announcement-bar');
    const height = announcement ? announcement.offsetHeight : 0;
    document.documentElement.style.setProperty('--sf2-header-offset', height + 'px');
  }

  setHeaderOffset();
  window.addEventListener('resize', setHeaderOffset);
  document.addEventListener('shopify:section:load', setHeaderOffset);

  const drawer = document.querySelector('[data-sf2-drawer]');
  const openBtns = document.querySelectorAll('[data-sf2-menu-open]');
  const closeBtns = document.querySelectorAll('[data-sf2-menu-close]');
  let lastFocus = null;

  function setSolid() {
    const mode = header.dataset.transparency;
    if (mode === 'always_solid') return;

    const scrolled = window.scrollY > 40;

    if (scrolled) {
      headerGroup.classList.add('is-scrolled');
      header.classList.add('is-solid');
      document.body.style.setProperty('padding-top', header.offsetHeight + 'px');
    } else if (mode !== 'always_transparent') {
      headerGroup.classList.remove('is-scrolled');
      header.classList.remove('is-solid');
      document.body.style.removeProperty('padding-top');
      setHeaderOffset();
    }
  }

  function openDrawer() {
    if (!drawer) return;
    lastFocus = document.activeElement;
    drawer.hidden = false;
    drawer.classList.add('is-open');
    openBtns.forEach((b) => b.setAttribute('aria-expanded', 'true'));
    const first = drawer.querySelector('a, button');
    if (first) first.focus();
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    drawer.hidden = true;
    openBtns.forEach((b) => b.setAttribute('aria-expanded', 'false'));
    if (lastFocus) lastFocus.focus();
  }

  openBtns.forEach((btn) => btn.addEventListener('click', openDrawer));
  closeBtns.forEach((btn) => btn.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  if (header.dataset.transparency === 'always_transparent') {
    header.classList.remove('is-solid');
    headerGroup.classList.remove('is-scrolled');
  } else if (header.dataset.transparency === 'always_solid') {
    header.classList.add('is-solid');
    headerGroup.classList.add('is-scrolled');
  } else {
    setSolid();
    window.addEventListener('scroll', setSolid, { passive: true });
  }
})();
