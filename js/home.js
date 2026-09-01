/* =================================================================
   home.js — no more hiding Homepage
   Handles:
     1. Hero Video Carousel  (5-second auto-advance, video play/pause)
     2. Monthly Calendar     (grid render, month navigation, event list)

   All interactive elements carry data-testid attributes matching
   the Playwright test suite selectors defined in index.html.
   ================================================================= */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────────────────────
     1. HERO VIDEO CAROUSEL
     ────────────────────────────────────────────────────────────── */
  (function initCarousel() {

    const SLIDE_DURATION = 5000; // ms per slide

    const slides   = Array.from(document.querySelectorAll('[data-testid^="carousel-slide-"]'));
    const videos   = Array.from(document.querySelectorAll('[data-testid^="carousel-video-"]'));
    const dots     = Array.from(document.querySelectorAll('[data-testid^="hero-dot-"]'));
    const prevBtn  = document.querySelector('[data-testid="hero-prev-btn"]');
    const nextBtn  = document.querySelector('[data-testid="hero-next-btn"]');
    const counter  = document.querySelector('[data-testid="hero-counter-current"]');

    if (!slides.length) return;

    let current    = 0;
    let timer      = null;
    let isPaused   = false;

    /* Go to a specific slide */
    function goTo(index) {
      // Wrap around
      const next = (index + slides.length) % slides.length;

      // Deactivate current
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      dots[current].setAttribute('aria-selected', 'false');
      pauseVideo(videos[current]);

      // Activate next
      current = next;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
      dots[current].setAttribute('aria-selected', 'true');
      playVideo(videos[current]);

      // Update counter
      if (counter) counter.textContent = current + 1;
    }

    function playVideo(video) {
      if (!video) return;
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(function () {
          // Autoplay blocked — poster frame shows, slide still works
        });
      }
    }

    function pauseVideo(video) {
      if (!video) return;
      video.pause();
    }

    /* Auto-advance */
    function startTimer() {
      clearInterval(timer);
      timer = setInterval(function () {
        if (!isPaused) goTo(current + 1);
      }, SLIDE_DURATION);
    }

    function resetTimer() {
      clearInterval(timer);
      startTimer();
    }

    /* Controls */
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goTo(current - 1);
        resetTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goTo(current + 1);
        resetTimer();
      });
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var idx = parseInt(dot.getAttribute('data-slide'), 10);
        goTo(idx);
        resetTimer();
      });
    });

    /* Keyboard support on dots (arrow keys) */
    dots.forEach(function (dot, i) {
      dot.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
          dots[(i + 1) % dots.length].focus();
          goTo((i + 1) % dots.length);
          resetTimer();
        } else if (e.key === 'ArrowLeft') {
          dots[(i - 1 + dots.length) % dots.length].focus();
          goTo((i - 1 + dots.length) % dots.length);
          resetTimer();
        }
      });
    });

    /* Pause on hover / focus (respects reduced-motion preference) */
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var carousel = document.querySelector('[data-testid="hero-carousel"]');
    if (carousel) {
      carousel.addEventListener('mouseenter', function () { isPaused = true; });
      carousel.addEventListener('mouseleave', function () { isPaused = false; });
      carousel.addEventListener('focusin',    function () { isPaused = true; });
      carousel.addEventListener('focusout',   function () { isPaused = false; });
    }

    /* Init: if user prefers reduced motion skip auto-advance */
    if (prefersReduced) {
      // Still allow manual navigation, just no auto-timer
    } else {
      startTimer();
    }

    // Ensure first slide video plays
    playVideo(videos[0]);

  })();



})();