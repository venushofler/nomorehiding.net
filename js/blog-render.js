/**
 * blog-render.js — no more hiding
 * Builds the blog page hero carousel and post grid from NMH_POSTS (blog-data.js).
 * Must load AFTER blog-data.js.
 *
 * Hero carousel:
 *   - All posts in NMH_POSTS rotate as hero slides (6 sec each)
 *   - Matches homepage video carousel pattern: is-active class, dot nav,
 *     prev/next buttons, pause on hover/focus, reduced-motion respected
 *
 * More Stories grid:
 *   - Posts beyond HERO_COUNT render as post-cards below the hero
 *   - Uses existing .post-card styles (no new CSS needed for cards)
 */

(function () {
  'use strict';

  // ── Guard: only run on the blog page ──
  if (!document.querySelector('[data-page="blog"]')) return;

  // ── Guard: data file must be loaded ──
  if (typeof NMH_POSTS === 'undefined' || !Array.isArray(NMH_POSTS)) {
    console.warn('blog-render.js: NMH_POSTS not found. Did blog-data.js load first?');
    return;
  }

  /* ─────────────────────────────────────────────────────────
     CONFIG
  ───────────────────────────────────────────────────────── */
  var SLIDE_DURATION = 6000; // ms — 6 seconds per slide
  var HERO_COUNT = Math.min(NMH_POSTS.length, 3); // up to 3 hero slides

  /* ─────────────────────────────────────────────────────────
     1. BUILD HERO SLIDES + DOTS
  ───────────────────────────────────────────────────────── */
  var slidesWrap = document.getElementById('blog-hero-slides');
  var dotsWrap = document.getElementById('blog-hero-dots');

  if (slidesWrap && dotsWrap) {

    NMH_POSTS.slice(0, HERO_COUNT).forEach(function (post, i) {
      // Slide (background image div)
      var slide = document.createElement('div');
      slide.className = 'blog-hero-slide' + (i === 0 ? ' is-active' : '');
      slide.setAttribute('data-testid', 'blog-hero-slide-' + (i + 1));
      slide.setAttribute('data-index', i);
      slide.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');
      slide.innerHTML =
        '<img' +
        ' src="' + escAttr(post.image) + '"' +
        ' alt="' + escAttr(post.imageAlt) + '"' +
        ' class="blog-hero-img"' +
        ' loading="' + (i === 0 ? 'eager' : 'lazy') + '"' +
        ' width="1440" height="600"' +
        ' />';
      slidesWrap.appendChild(slide);

      // Per-slide image position override — set imagePosition in blog-data.js to adjust crop
      if (post.imagePosition) {
        slide.querySelector('img').style.objectPosition = post.imagePosition;
      }

      // Dot
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'blog-hero-dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      dot.setAttribute('aria-label', 'Show featured post ' + (i + 1) + ': ' + post.title);
      dot.setAttribute('data-slide', i);
      dot.setAttribute('data-testid', 'blog-hero-dot-' + (i + 1));
      dotsWrap.appendChild(dot);
    });
  }

  // Set initial content panel
  updatePanel(0);

  /* ─────────────────────────────────────────────────────────
     2. CAROUSEL LOGIC  (mirrors home.js initCarousel pattern)
  ───────────────────────────────────────────────────────── */
  var slides = Array.from(document.querySelectorAll('[data-testid^="blog-hero-slide-"]'));
  var dots = Array.from(document.querySelectorAll('[data-testid^="blog-hero-dot-"]'));
  var prevBtn = document.querySelector('[data-testid="blog-hero-prev-btn"]');
  var nextBtn = document.querySelector('[data-testid="blog-hero-next-btn"]');
  var hero = document.querySelector('[data-testid="blog-hero-carousel"]');

  var current = 0;
  var timer = null;
  var isPaused = false;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function goTo(index) {
    var next = (index + slides.length) % slides.length;

    // Deactivate current
    slides[current].classList.remove('is-active');
    slides[current].setAttribute('aria-hidden', 'true');
    dots[current].classList.remove('is-active');
    dots[current].setAttribute('aria-selected', 'false');

    // Activate next
    current = next;
    slides[current].classList.add('is-active');
    slides[current].setAttribute('aria-hidden', 'false');
    dots[current].classList.add('is-active');
    dots[current].setAttribute('aria-selected', 'true');

    // Update content panel
    updatePanel(current);
  }

  function updatePanel(index) {
    var post = NMH_POSTS[index];
    if (!post) return;

    var cat = document.getElementById('blog-hero-category');
    var title = document.getElementById('blog-hero-title');
    var excerpt = document.getElementById('blog-hero-excerpt');
    var cta = document.getElementById('blog-hero-cta');

    if (cat) cat.textContent = post.category;
    if (title) title.textContent = post.title;
    if (excerpt) excerpt.textContent = post.excerpt;
    if (cta) {
      cta.href = post.url;
      cta.setAttribute('aria-label', 'Read the story: ' + post.title);
    }
  }

  function startTimer() {
    clearInterval(timer);
    if (prefersReduced) return; // no auto-advance for reduced-motion
    timer = setInterval(function () {
      if (!isPaused) goTo(current + 1);
    }, SLIDE_DURATION);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  // Prev / Next buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', function () { goTo(current - 1); resetTimer(); });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () { goTo(current + 1); resetTimer(); });
  }

  // Dot buttons
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      goTo(parseInt(dot.getAttribute('data-slide'), 10));
      resetTimer();
    });

    // Arrow key navigation
    dot.addEventListener('keydown', function (e) {
      var i = parseInt(dot.getAttribute('data-slide'), 10);
      if (e.key === 'ArrowRight') {
        var nextDot = (i + 1) % dots.length;
        dots[nextDot].focus();
        goTo(nextDot);
        resetTimer();
      } else if (e.key === 'ArrowLeft') {
        var prevDot = (i - 1 + dots.length) % dots.length;
        dots[prevDot].focus();
        goTo(prevDot);
        resetTimer();
      }
    });
  });

  // Pause on hover / focus
  if (hero) {
    hero.addEventListener('mouseenter', function () { isPaused = true; });
    hero.addEventListener('mouseleave', function () { isPaused = false; });
    hero.addEventListener('focusin', function () { isPaused = true; });
    hero.addEventListener('focusout', function () { isPaused = false; });
  }

  startTimer();

  /* ─────────────────────────────────────────────────────────
     3. MORE STORIES GRID  (posts beyond HERO_COUNT)
  ───────────────────────────────────────────────────────── */
  var grid = document.getElementById('blog-posts-grid');
  var empty = document.getElementById('blog-posts-empty');
  var morePosts = NMH_POSTS.slice(HERO_COUNT);

  if (grid) {
    if (morePosts.length === 0) {
      grid.hidden = true;
      if (empty) empty.hidden = false;
    } else {
      morePosts.forEach(function (post, i) {
        var cardIndex = HERO_COUNT + i + 1;
        var article = document.createElement('article');
        article.className = 'post-card';
        article.setAttribute('role', 'listitem');
        article.setAttribute('data-testid', 'blog-card-' + cardIndex);

        var thumbHTML = post.image
          ? '<a' +
          ' href="' + escAttr(post.url) + '"' +
          ' class="post-card-thumb no-ext-icon"' +
          ' tabindex="-1"' +
          ' aria-hidden="true"' +
          ' data-testid="blog-card-' + cardIndex + '-image"' +
          '>' +
          '<img' +
          ' src="' + escAttr(post.image) + '"' +
          ' alt="' + escAttr(post.imageAlt) + '"' +
          ' loading="lazy"' +
          ' width="400" height="210"' +
          ' />' +
          '</a>'
          : '<div' +
          ' class="post-card-thumb--placeholder"' +
          ' aria-hidden="true"' +
          ' data-testid="blog-card-' + cardIndex + '-image"' +
          '></div>';

        article.innerHTML =
          thumbHTML +
          '<div class="post-card-body">' +
          '<div class="post-card-category">' + escHTML(post.category) + '</div>' +
          '<h3 class="post-card-title">' +
          '<a href="' + escAttr(post.url) + '" class="no-ext-icon"' +
          ' data-testid="blog-card-' + cardIndex + '-link">' +
          escHTML(post.title) +
          '</a>' +
          '</h3>' +
          '<p class="post-card-excerpt">' + escHTML(post.excerpt) + '</p>' +
          '<a' +
          ' href="' + escAttr(post.url) + '"' +
          ' class="post-card-link no-ext-icon"' +
          ' data-testid="blog-card-' + cardIndex + '-cta"' +
          ' aria-label="Read more: ' + escAttr(post.title) + '"' +
          '>Read More <span aria-hidden="true">→</span></a>' +
          '</div>';

        grid.appendChild(article);
      });
    }
  }

  /* ─────────────────────────────────────────────────────────
     HELPERS — XSS prevention
  ───────────────────────────────────────────────────────── */
  function escHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escAttr(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

})();
