/**
 * home-render.js — no more hiding
 * Dynamically renders the 3 homepage blog cards from NMH_POSTS (blog-data.js).
 * Must load AFTER blog-data.js.
 *
 * Reads indices 0–2 (same posts as the blog page hero carousel).
 * Update blog-data.js once → homepage cards, blog hero, and blog grid
 * all reflect the change automatically.
 */

(function () {
  'use strict';

  // ── Guard: only run on the home page ──
  if (!document.querySelector('[data-page="home"]')) return;

  // ── Guard: data file must be loaded ──
  if (typeof NMH_POSTS === 'undefined' || !Array.isArray(NMH_POSTS)) {
    console.warn('home-render.js: NMH_POSTS not found. Did blog-data.js load first?');
    return;
  }

  var grid = document.getElementById('blog-cards');
  if (!grid) return;

  var featured = NMH_POSTS.slice(0, 3);

  featured.forEach(function (post, i) {
    var num = i + 1;
    var article = document.createElement('article');
    article.className = 'post-card';
    article.setAttribute('role', 'listitem');
    article.setAttribute('data-testid', 'blog-card-' + num);

    var thumbHTML = post.image
      ? '<a' +
        ' href="' + escAttr(post.url) + '"' +
        ' class="post-card-thumb no-ext-icon"' +
        ' tabindex="-1"' +
        ' aria-hidden="true"' +
        ' data-testid="blog-card-' + num + '-image"' +
        '>' +
        '<img' +
        ' src="' + escAttr(post.image) + '"' +
        ' alt="' + escAttr(post.imageAlt) + '"' +
        ' loading="lazy"' +
        ' width="400" height="210"' +
        (post.imagePosition ? ' style="object-position:' + escAttr(post.imagePosition) + '"' : '') +
        ' />' +
        '</a>'
      : '<div' +
        ' class="post-card-thumb--placeholder"' +
        ' aria-hidden="true"' +
        ' data-testid="blog-card-' + num + '-image"' +
        '></div>';

    article.innerHTML =
      thumbHTML +
      '<div class="post-card-body">' +
        '<div class="post-card-category">' + escHTML(post.category) + '</div>' +
        '<h3 class="post-card-title">' +
          '<a href="' + escAttr(post.url) + '" class="no-ext-icon"' +
          ' data-testid="blog-card-' + num + '-link">' +
          escHTML(post.title) +
          '</a>' +
        '</h3>' +
        '<p class="post-card-excerpt">' + escHTML(post.excerpt) + '</p>' +
        '<a' +
        ' href="' + escAttr(post.url) + '"' +
        ' class="post-card-link no-ext-icon"' +
        ' data-testid="blog-card-' + num + '-cta"' +
        ' aria-label="Read more: ' + escAttr(post.title) + '"' +
        '>Read More <span aria-hidden="true">→</span></a>' +
      '</div>';

    grid.appendChild(article);
  });

  /* ── Helpers — XSS prevention ── */
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
