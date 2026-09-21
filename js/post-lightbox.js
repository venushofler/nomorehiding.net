/**
 * post-lightbox.js
 * Minimal, accessible click-to-enlarge lightbox for floated post images.
 * Linked only on posts that use .post-figure--lightbox figures.
 */
(function () {
  'use strict';

  /* ── Build overlay DOM ─────────────────────────────────────────────────── */
  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Enlarged image viewer');

  var wrap = document.createElement('div');
  wrap.className = 'lightbox-img-wrap';

  var closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.setAttribute('aria-label', 'Close image viewer');
  closeBtn.innerHTML = '&times;';

  var lightboxImg = document.createElement('img');
  lightboxImg.alt = '';

  wrap.appendChild(closeBtn);
  wrap.appendChild(lightboxImg);
  overlay.appendChild(wrap);
  document.body.appendChild(overlay);

  /* Keep a reference to the trigger so focus can return on close */
  var lastTrigger = null;

  /* ── Open / close ──────────────────────────────────────────────────────── */
  function openLightbox(src, alt, triggerEl) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lastTrigger = triggerEl || null;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    /* Brief delay before clearing src to avoid a flash */
    setTimeout(function () { lightboxImg.src = ''; }, 200);
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }

  /* ── Event listeners ───────────────────────────────────────────────────── */
  closeBtn.addEventListener('click', closeLightbox);

  /* Click on the dark backdrop (not the image) closes the lightbox */
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });

  /* Escape key closes the lightbox */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  /* ── Wire up all lightbox figures ──────────────────────────────────────── */
  function init() {
    var figures = document.querySelectorAll('.post-figure--lightbox');
    figures.forEach(function (fig) {
      var imgEl = fig.querySelector('img');
      if (!imgEl) return;

      /* Make the image keyboard-focusable and activatable */
      imgEl.setAttribute('tabindex', '0');
      imgEl.setAttribute('role', 'button');
      imgEl.setAttribute('aria-label', 'Click to enlarge image');

      function handleActivate(e) {
        if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
        if (e.type === 'keydown') e.preventDefault();
        openLightbox(imgEl.src, imgEl.getAttribute('data-lightbox-alt') || imgEl.alt, imgEl);
      }

      imgEl.addEventListener('click', handleActivate);
      imgEl.addEventListener('keydown', handleActivate);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
