/**
 * blog-gallery.js
 * Thumbnail gallery with accessible lightbox for no more hiding™ blog posts.
 * Data attributes on each .post-gallery-thumb-btn drive the lightbox:
 *   data-gallery-src     — full-size image URL
 *   data-gallery-alt     — alt text for the full-size image
 *   data-gallery-caption — caption text shown below the image
 */

(function () {
  'use strict';

  document.querySelectorAll('.post-gallery').forEach(function (gallery) {
    var lightbox   = gallery.querySelector('.post-gallery-lightbox');
    if (!lightbox) return;

    var lbImg      = lightbox.querySelector('.post-gallery-lightbox-img');
    var lbCaption  = lightbox.querySelector('.post-gallery-lightbox-caption');
    var lbClose    = lightbox.querySelector('.post-gallery-lightbox-close');
    var lbPrev     = lightbox.querySelector('.post-gallery-lightbox-prev');
    var lbNext     = lightbox.querySelector('.post-gallery-lightbox-next');
    var thumbBtns  = Array.from(gallery.querySelectorAll('.post-gallery-thumb-btn'));
    var currentIdx = 0;
    var lastFocused = null;

    // ── Focusable elements inside the lightbox ──────────────────────────────
    function getFocusable() {
      return Array.from(
        lightbox.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(function (el) { return !el.disabled; });
    }

    // ── Open ─────────────────────────────────────────────────────────────────
    function openAt(idx) {
      currentIdx  = idx;
      var btn     = thumbBtns[idx];
      lbImg.src   = btn.dataset.gallerySrc   || '';
      lbImg.alt   = btn.dataset.galleryAlt   || '';
      lbCaption.textContent = btn.dataset.galleryCaption || '';

      // Show prev/next only when there are multiple images
      lbPrev.hidden = thumbBtns.length < 2;
      lbNext.hidden = thumbBtns.length < 2;

      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    }

    // ── Close ────────────────────────────────────────────────────────────────
    function closeLightbox() {
      lightbox.hidden = true;
      document.body.style.overflow = '';
      if (lastFocused) { lastFocused.focus(); }
    }

    // ── Navigate ─────────────────────────────────────────────────────────────
    function showPrev() {
      openAt((currentIdx - 1 + thumbBtns.length) % thumbBtns.length);
    }
    function showNext() {
      openAt((currentIdx + 1) % thumbBtns.length);
    }

    // ── Thumbnail click ───────────────────────────────────────────────────────
    thumbBtns.forEach(function (btn, idx) {
      btn.addEventListener('click', function () {
        lastFocused = btn;
        openAt(idx);
      });
    });

    // ── Lightbox controls ────────────────────────────────────────────────────
    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', showPrev);
    lbNext.addEventListener('click', showNext);

    // Backdrop click closes
    lightbox.querySelector('.post-gallery-lightbox-backdrop')
      .addEventListener('click', closeLightbox);

    // ── Keyboard ─────────────────────────────────────────────────────────────
    lightbox.addEventListener('keydown', function (e) {
      if (lightbox.hidden) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          closeLightbox();
          break;

        case 'ArrowLeft':
          e.preventDefault();
          showPrev();
          break;

        case 'ArrowRight':
          e.preventDefault();
          showNext();
          break;

        case 'Tab': {
          // Focus trap
          var focusable = getFocusable();
          if (!focusable.length) { e.preventDefault(); break; }
          var first = focusable[0];
          var last  = focusable[focusable.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
          break;
        }
      }
    });
  });
})();
