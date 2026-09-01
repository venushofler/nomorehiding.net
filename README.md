# NoMoreHiding.net

Website for Renetta Smith — founder of No More Hiding, a platform for women navigating life's transitions with honesty, courage, and community.

---

## Tech Stack

- HTML, CSS, JavaScript (vanilla — no frameworks)
- Data-driven blog system via `js/blog-data.js`
- Modular includes via `js/includes.js` (nav, footer, favicon)
- Local dev: VS Code Live Server (`127.0.0.1:5500`)
- Hosting: GreenGeeks

---

## Project Structure

```
nomorehiding.net/
├── index.html                  # Home page
├── blog/                       # One folder per post (clean URLs)
│   └── [slug]/index.html
├── css/
│   ├── global.css
│   └── components.css
├── js/
│   ├── blog-data.js            # Single source of truth for all 15 posts
│   ├── blog-render.js          # Blog page — hero carousel + card grid
│   ├── home-render.js          # Homepage — blog card carousel
│   ├── post-render.js          # Post pages — hero image + reading time + related posts
│   ├── includes.js             # Nav, footer, favicon, active link, mobile toggle
│   └── global.js               # External link detection, scroll-to-top
├── images/
├── documentation/
│   ├── blog-post-guide.md      # How to add a new blog post
│   └── sitemap.md              # Full site map with all slugs
```

---

## Blog System

`js/blog-data.js` is the single source of truth for all blog posts. Each entry controls:

- Title, excerpt, date, category
- Hero image and alt text
- URL slug

The hero image defined in `blog-data.js` automatically populates four places: the post page, the blog page carousel, the blog page card grid, and the homepage card carousel. To swap an image, update it in `blog-data.js` only.

---

## Conventions

- No inline `style=` attributes (exception: `scroll-margin-top` on anchor sections)
- All styles live in `css/global.css` or `css/components.css`
- `data-page="pagename"` on `<body>` for active nav highlighting
- `data-testid` on every major section and component
- External links styled with `↗` via CSS; suppress with `.no-ext-icon`
- In-body blog images use `<figure class="post-figure">`
- Post hero `<img>` always has empty `src` and `alt` — injected by `post-render.js` at load

---

## Local Development

Open the project folder in VS Code and start Live Server. The site runs at `http://127.0.0.1:5500`.

No build step. No dependencies to install.

---

## Blog Posts (15 Total)

Ten posts are fully complete with content, interior images, and hero images. Five posts have hero images in place and are pending article copy and interior images:

- Get Your Shine Back
- The Love Language of Elder Caregiving
- 10 Ways to Get Emotionally Unstuck
- More Than a Mantra, It's a Movement
- Motherhood Transformed

---

## Deployment

Target host: GreenGeeks. DNS/SSL cutover pending. Email migration from Hostinger to GreenGeeks is also planned (preserving messages and folders).
