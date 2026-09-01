/**
 * post-render.js — No More Hiding
 * Handles individual blog post page functionality:
 *   1. Hero image injection from blog-data.js (single source of truth)
 *   2. Estimated reading time calculation
 *   3. Related posts sidebar (same category, from blog-data.js)
 *
 * Must load AFTER blog-data.js.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  if (typeof NMH_POSTS === 'undefined') return;

  /* ─────────────────────────────────────────────────────────
     FIND CURRENT POST in NMH_POSTS by URL
  ───────────────────────────────────────────────────────── */
  var currentPath = window.location.pathname.replace(/\/?$/, '/'); // normalise trailing slash
  var currentPost = NMH_POSTS.find(function (post) {
    return post.url.replace(/\/?$/, '/') === currentPath;
  });

  /* ─────────────────────────────────────────────────────────
     1. HERO IMAGE INJECTION
     Sets src, alt, and optional object-position on the
     post hero <img> from blog-data.js — one source of truth.
  ───────────────────────────────────────────────────────── */
  if (currentPost) {
    var heroImg = document.querySelector('.post-hero-img');
    if (heroImg) {
      if (currentPost.image) {
        heroImg.src = currentPost.image;
        heroImg.alt = currentPost.imageAlt || '';
      }
      if (currentPost.imagePosition) {
        heroImg.style.objectPosition = currentPost.imagePosition;
      }
    }
  }

  /* ─────────────────────────────────────────────────────────
     2. READING TIME
     Counts words in #post-content, estimates at 200 wpm
  ───────────────────────────────────────────────────────── */
  var postContent  = document.getElementById('post-content');
  var readingTimeEl = document.querySelector('[data-testid="reading-time"]');

  if (postContent && readingTimeEl) {
    var text      = postContent.innerText || postContent.textContent || '';
    var wordCount = text.trim().split(/\s+/).length;
    var minutes   = Math.ceil(wordCount / 200);
    readingTimeEl.textContent = minutes + ' min read';
  }

  /* ─────────────────────────────────────────────────────────
     3. RELATED POSTS SIDEBAR
     Reads category from the post hero, finds matching
     posts in NMH_POSTS, renders up to 3 as sidebar links.
  ───────────────────────────────────────────────────────── */
  var categoryEl  = document.querySelector('[data-testid="post-category"]');
  var relatedList = document.getElementById('sidebar-related-list');

  if (!categoryEl || !relatedList) return;

  var currentCategory = categoryEl.textContent.trim();

  // Posts in same category, excluding current
  var related = NMH_POSTS.filter(function (post) {
    return post.category === currentCategory &&
           post.url.replace(/\/?$/, '/') !== currentPath;
  }).slice(0, 3);

  // Fall back to most recent posts if no category matches
  if (related.length === 0) {
    related = NMH_POSTS.filter(function (post) {
      return post.url.replace(/\/?$/, '/') !== currentPath;
    }).slice(0, 3);
  }

  if (related.length === 0) {
    var relatedBlock = document.querySelector('[data-testid="sidebar-related"]');
    if (relatedBlock) relatedBlock.hidden = true;
    return;
  }

  related.forEach(function (post) {
    var li = document.createElement('li');
    li.className = 'sidebar-related-item';
    li.setAttribute('role', 'listitem');
    li.innerHTML =
      '<a href="' + escAttr(post.url) + '" class="sidebar-related-link no-ext-icon">' +
        '<span class="sidebar-related-category">' + escHTML(post.category) + '</span>' +
        '<span class="sidebar-related-title">'    + escHTML(post.title)    + '</span>' +
      '</a>';
    relatedList.appendChild(li);
  });

  /* ─────────────────────────────────────────────────────────
     HELPERS
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

});