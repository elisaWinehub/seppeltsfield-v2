(function () {
  const header = document.querySelector('[data-sf2-header]');
  if (!header) return;

  const drawer = document.querySelector('[data-sf2-drawer]');
  const openBtns = document.querySelectorAll('[data-sf2-menu-open]');
  const closeBtns = document.querySelectorAll('[data-sf2-menu-close]');
  let lastFocus = null;

  function setSolid() {
    const mode = header.dataset.transparency;
    if (mode === 'always_solid') return;
    if (window.scrollY > 40) header.classList.add('is-solid');
    else if (mode !== 'always_transparent') header.classList.remove('is-solid');
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

  if (header.dataset.transparency === 'always_transparent') header.classList.remove('is-solid');
  else if (header.dataset.transparency === 'always_solid') header.classList.add('is-solid');
  else {
    setSolid();
    window.addEventListener('scroll', setSolid, { passive: true });
  }
})();
