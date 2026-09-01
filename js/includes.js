/* =============================================================
   includes.js — No More Hiding
   Injects the shared nav and footer into every page.
   Place this script tag at the bottom of <body>, before </body>.
 
   Each page needs two placeholder divs:
     <div id="site-nav"></div>    ← at the very top of <body>
     <div id="site-footer"></div> ← at the very bottom of <body>
 
   To mark a nav link active, add data-page="about" (etc.) to <body>:
     <body data-page="about">
   ============================================================= */

(function () {

  /* ── NAV ──────────────────────────────────────────────── */
  const NAV_HTML = `
<nav class="nav">
  <div class="nav-logo-wrap">
    <a href="/index.html">
      <img src="/images/logo/nmh-logo.png" alt="No More Hiding" />
    </a>
  </div>
 
  <div class="nav-links">
    <a href="/index.html"               data-nav="home">Home</a>
    <a href="/start-here/"          data-nav="start-here">Start Here</a>
    
    <a href="/events/"              data-nav="events">Events</a>
    <a href="/blog/"          data-nav="blog">Blog</a>
    <a href="/community-partners/"  data-nav="community-partners">Community Partners</a>
    <a href="/about/"               data-nav="about">About</a>
    <a href="/contact/"             data-nav="contact" class="nav-cta">Contact</a>
  </div>
 
  <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false">
    <span></span>
    <span></span>
    <span></span>
  </button>
</nav>
 
<div class="nav-mobile" id="nav-mobile" aria-hidden="true">
  <a href="/index.html"               data-nav="home">Home</a>
  <a href="/start-here/"          data-nav="start-here">Start Here</a>
  <a href="/about/"               data-nav="about">About</a>
  <a href="/events/"              data-nav="events">Events</a>
  <a href="/blog/"          data-nav="blog">Blog</a>
  <a href="/community-partners/"  data-nav="community-partners">Community Partners</a>
  <a href="/contact/"             data-nav="contact">Contact</a>
</div>
  `;


  /* ── FOOTER ───────────────────────────────────────────── */
  const FOOTER_HTML = `
<footer class="footer">
  <div class="footer-grid">
 
    <div>
      <div class="footer-logo-wrap">
        <a href="/index.html">
          <img src="/images/logo/nmh-logo.png" alt="No More Hiding" />
        </a>
      </div>
      <p class="footer-tagline">Live Whole. Live Seen. Live Free.</p>
      <div class="footer-socials">
        <a href="#" class="f-social" aria-label="Facebook" target="_blank" rel="noopener">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
               stroke="rgba(255,255,255,0.55)" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        </a>
        <a href="#" class="f-social" aria-label="Instagram" target="_blank" rel="noopener">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
               stroke="rgba(255,255,255,0.55)" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        </a>
        <a href="#" class="f-social" aria-label="YouTube" target="_blank" rel="noopener">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
               stroke="rgba(255,255,255,0.55)" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
            <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
          </svg>
        </a>
      </div>
    </div>
 
    <div>
      <div class="footer-col-head">Navigate</div>
      <div class="footer-links">
        <a href="/index.html">Home</a>
        <a href="/start-here/">Start Here</a>
        <a href="/about/">About</a>
        <a href="/events/">Events</a>
        <a href="/blog/">Blog</a>
        <a href="/community-partners/">Community Partners</a>
        <a href="/contact/">Contact</a>
      </div>
    </div>
 
    <div>
      <div class="footer-col-head">Resources</div>
      <div class="footer-links">
        <a href="#">Free Downloads</a>
        <a href="#">Podcast</a>
        <a href="#">Speaking</a>
        <a href="#">Press Kit</a>
        <a href="#">Shop</a>
      </div>
    </div>
 
    <div>
      <div class="footer-col-head">Stay Connected</div>
      <div class="footer-links">
        <a href="#">Newsletter</a>
        <a href="#">Facebook Group</a>
        <a href="#">Instagram</a>
        <a href="#">YouTube</a>
      </div>
    </div>
 
  </div>
 
  <div class="footer-bottom">
    <div>&copy; <span id="footer-year"></span> No More Hiding. All rights reserved.</div>
    <div>
      <a href="/privacy.html">Privacy Policy</a>
      &nbsp;·&nbsp;
      <a href="/terms.html">Terms</a>
    </div>
  </div>
</footer>
  `;


  /* ── INJECT ───────────────────────────────────────────── */
  const navEl = document.getElementById('site-nav');
  const footerEl = document.getElementById('site-footer');

  if (navEl) navEl.innerHTML = NAV_HTML;
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;

  // Auto-update copyright year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ── ACTIVE NAV LINK ──────────────────────────────────── */
  // Reads data-page="about" from <body> and adds .active to matching links
  const page = document.body.dataset.page;
  if (page) {
    document.querySelectorAll(`[data-nav="${page}"]`).forEach(function (link) {
      link.classList.add('active');
    });
  }


  /* ── MOBILE NAV TOGGLE ────────────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.getElementById('nav-mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileNav.setAttribute('aria-hidden', !isOpen);
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function (e) {
      if (!navEl.contains(e.target)) {
        mobileNav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /* ── FAVICON ─────────────────────────────────────────── */
  // Inject favicon links so they are controlled from one place.
  [
    { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
    { rel: 'icon', href: '/favicon-32.png', type: 'image/png', sizes: '32x32' }
  ].forEach(function (attrs) {
    var link = document.createElement('link');
    link.rel  = attrs.rel;
    link.href = attrs.href;
    if (attrs.sizes) link.setAttribute('sizes', attrs.sizes);
    if (attrs.type)  link.type  = attrs.type;
    document.head.appendChild(link);
  });

})();
