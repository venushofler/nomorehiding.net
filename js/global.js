/* =============================================================
   global.js — no more hiding
   Runs on every page. Handles site-wide link behavior:
   - External links (off this domain) → open in new tab
   - Internal links (same domain) → always same tab, no extra tabs
   ============================================================= */

(function () {
  'use strict';

  var host = location.hostname; /* e.g. "nomorehiding.net" or "127.0.0.1" */

  document.querySelectorAll('a[href]').forEach(function (a) {
    var href = a.getAttribute('href');

    /* Skip anchors, mailto, tel, javascript: */
    if (!href || href.charAt(0) === '#' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;

    /* Determine if the link leaves this domain */
    var isExternal = false;
    if (href.indexOf('http://') === 0 || href.indexOf('https://') === 0) {
      try {
        isExternal = new URL(href).hostname !== host;
      } catch (e) {
        isExternal = false;
      }
    }

    if (isExternal) {
      /* External: open in new tab, add rel for security */
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    } else {
      /* Internal: ensure it stays in the same tab */
      if (a.getAttribute('target') === '_blank') {
        a.removeAttribute('target');
      }
    }
  });

})();

/* ── Scroll-to-top button ─────────────────────────────────────
   Creates the button once, appends to <body>, shows after
   scrolling 300px, smooth-scrolls to top on click.
   ─────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var btn = document.createElement('button');
  btn.className   = 'scroll-top-btn';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML   = '<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>';
  document.body.appendChild(btn);

  var THRESHOLD = 300;

  function onScroll() {
    if (window.scrollY > THRESHOLD) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  onScroll(); /* run once on load in case page is already scrolled */
})();
