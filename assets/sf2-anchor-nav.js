(function () {
  var header = document.querySelector('[data-sf2-header]');
  if (!header) return;

  function syncAnchorOffset() {
    var top = header.classList.contains('is-solid') ? header.offsetHeight : 0;
    document.documentElement.style.setProperty('--sf2-anchor-top', top + 'px');
    document.documentElement.style.setProperty('--sf2-scroll-padding', (top + 56) + 'px');
  }

  syncAnchorOffset();
  window.addEventListener('scroll', syncAnchorOffset, { passive: true });
  window.addEventListener('resize', syncAnchorOffset);
  new MutationObserver(syncAnchorOffset).observe(header, { attributes: true, attributeFilter: ['class'] });
})();
