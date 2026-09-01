# no more hiding™ — Blog Post Authoring Guide
*Last updated: September 1, 2026*

This document covers how to build a new blog post page, add article copy, and place inline images correctly. For image sizing and format specs, see `image-specs.md`.

---

## How the Hero Image Works

**The hero image is set in one place only: `js/blog-data.js`.**

When a post page loads, `post-render.js` reads the `image` and `imageAlt` fields from `blog-data.js` and injects them into the hero `<img>` automatically. The `src` and `alt` attributes in the post HTML are intentionally left empty — do not hardcode values there.

Setting the image in `blog-data.js` once updates all four places automatically:
- The post hero (injected by `post-render.js`)
- The blog page card thumbnail (rendered by `blog-render.js`)
- The blog page hero carousel (rendered by `blog-render.js`)
- The homepage blog card (rendered by `home-render.js`)

---

## Overview

Each blog post lives in its own folder under `blog/` and is served via a clean URL:

```
blog/[post-slug]/index.html  →  nomorehiding.net/blog/[post-slug]/
```

To add a new post:

1. Copy the template
2. Update meta and hero fields in the HTML
3. Add the post to `blog-data.js` (including the hero image path)
4. Add the article copy to the post body
5. Place inline images where they appear in the original
6. Add tags
7. Add series navigation (if applicable)

---

## Step 1 — Copy the Template

Copy `blog/template/blog-post-template-dl.html` and save it as:
```
blog/[post-slug]/index.html
```

Use the slug from `documentation/sitemap.md` (New Slug column).

---

## Step 2 — Update Meta Fields in the HTML

At the top of the file, update these fields. Note: the hero `<img>` src and alt are **not** set here — see Step 3.

```html
<title>POST TITLE — no more hiding™</title>
<meta name="description" content="POST EXCERPT" />
<meta property="og:title" content="POST TITLE — no more hiding™" />
<meta property="og:description" content="POST EXCERPT" />
<meta property="og:image" content="/images/blog/[post-slug]/[post-slug]-hero.jpg" />
<meta property="og:url" content="https://nomorehiding.net/blog/[post-slug]/" />
```

Then update the hero overlay content (text fields only — leave the `<img>` src and alt empty):

```html
<!-- Hero image src + alt injected by post-render.js from blog-data.js — do not hardcode here -->
<img src="" alt="" class="post-hero-img" width="1440" height="700" loading="eager" />

<span aria-current="page">POST TITLE</span>       ← breadcrumb
<div class="post-hero-category">CATEGORY</div>
<h1 class="post-hero-title">POST TITLE</h1>
<p class="post-hero-deck">POST DECK / SUBTITLE</p>
<time datetime="YYYY-MM-DD">MONTH DD, YYYY</time>
```

---

## Step 3 — Add to blog-data.js

**This is where the hero image is set.** Add a new entry to `js/blog-data.js`. Add a `// Title` comment above the entry. Place it at the correct position in the array (indices 0–2 = hero carousel; index 3+ = More Stories grid).

```js
// Post Title
{
  id: "post-slug",
  title: "Post Title",
  category: "Category Name",
  series: "Series Name — Part N",          // omit if not part of a series
  excerpt: "Two-sentence description of the post.",
  image: "/images/blog/[post-slug]/[post-slug]-hero.jpg",
  imageAlt: "Descriptive alt text for the hero image",
  url: "/blog/[post-slug]/",
  published: "Month DD, YYYY",
  imagePosition: "center 30%"              // omit unless crop adjustment needed
},
```

**Image field notes:**
- Use `image: ""` if the hero image isn't ready yet — a placeholder shows on the card and the hero renders without an image
- `imagePosition` is a CSS `object-position` value — use it to adjust which part of the image is visible when it's cropped (e.g. `"center 20%"` shifts the crop upward to show faces)
- `imageAlt` must be descriptive — never leave it empty if `image` is set

---

## Step 4 — Add Article Copy

All article content goes inside:

```html
<article class="post-body" data-testid="post-body" id="post-content">
  <!-- your content here -->
</article>
```

### Paragraphs
```html
<p>Your paragraph text here.</p>
```

### Section Headings
```html
<h2>Major section heading</h2>
<h3>Sub-section heading</h3>
```

### Bold / Italic Emphasis
```html
<p>This is <strong>bold</strong> and this is <em>italic</em>.</p>
```

### Pull Quote
Use for the most resonant single lines. One or two per post maximum.
```html
<blockquote class="post-pullquote">
  <p>The quote goes here.</p>
</blockquote>
```

### Callout Box
Use for key takeaways, definitions, or "keep in mind" moments.
```html
<div class="post-callout" role="note">
  <div class="post-callout-label">Keep in Mind</div>
  <p>The callout text goes here.</p>
</div>
```

### Bulleted List
```html
<ul class="post-list">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

### Numbered List
```html
<ol class="post-list">
  <li><strong>Item label.</strong> Description of the item.</li>
  <li><strong>Item label.</strong> Description of the item.</li>
</ol>
```

### Closing Tagline
Every post ends with the brand tagline before the tags:
```html
<p class="post-closing-tagline">Live Whole. Live Seen. Live Free.</p>
```

---

## Step 5 — Inline Images

Inline images appear within the article body. These are separate from the hero image.

### Folder and Naming Convention
Save all images for a post in:
```
images/blog/[post-slug]/
```

Name files descriptively, lowercase, hyphens only:
```
images/blog/sisters-keeper/sisters-keeper-friendship.jpg
images/blog/sisters-keeper/sisters-keeper-boundaries.jpg
```

See `image-specs.md` for sizing — inline blog images should be **800 × 500px, JPG, under 200KB**.

### HTML for an Inline Image
Place the `<figure>` block between paragraphs or after a section heading, exactly where the image appears in the original Hostinger post:

```html
<figure class="post-figure">
  <img
    src="/images/blog/[post-slug]/[image-filename].jpg"
    alt="DESCRIPTIVE ALT TEXT — describe what is shown, not just 'image'"
    class="post-inline-img"
    width="800"
    height="500"
    loading="lazy"
  />
</figure>
```

### Alt Text Rules
- Always write descriptive alt text — never leave it empty on meaningful images
- Describe what the image shows: "Two women embracing and laughing outdoors" not "friendship image"
- If the image is purely decorative, use `alt=""` (empty, not missing)

### Image Placeholder (while awaiting final images)
```html
<figure class="post-figure">
  <div class="post-img-placeholder" aria-hidden="true">
    Image coming soon
  </div>
</figure>
```

---

## Step 6 — Tags

Update the tags at the bottom of the article:

```html
<div class="post-tags" data-testid="post-tags" aria-label="Post tags">
  <span class="post-tag">Relationships</span>
  <span class="post-tag">Boundaries</span>
  <span class="post-tag">Personal Development</span>
</div>
```

Available categories (from Hostinger): Mental Health · Relationships · Caring for Caregivers · Elder Law · Elder Care · Personal Development

---

## Step 7 — Series Navigation

For posts that are part of a series, uncomment and update the series nav block in the template:

```html
<nav class="post-series-nav" aria-label="Series navigation">
  <div class="post-series-label">Part of: SERIES NAME</div>
  <div class="post-series-links">
    <a href="/blog/[prev-slug]/" class="post-series-prev">← Part N: PREVIOUS TITLE</a>
    <a href="/blog/[next-slug]/" class="post-series-next">Part N: NEXT TITLE →</a>
  </div>
</nav>
```

For the first post in a series, omit the `post-series-prev` link.
For the last post in a series, omit the `post-series-next` link.

---

## Quick Checklist

Before marking a post as done, confirm:

- [ ] Template copied to correct slug folder (`blog/[post-slug]/index.html`)
- [ ] Meta tags updated in HTML (title, description, og:image, og:url)
- [ ] Hero text fields updated in HTML (breadcrumb, category, h1, deck, date)
- [ ] Hero `<img>` src and alt left empty — **do not hardcode**
- [ ] Post added to `blog-data.js` with `// Title` comment above entry
- [ ] Hero image path set in `blog-data.js` → `image` field (1440×700px — see image-specs.md)
- [ ] `imageAlt` filled in `blog-data.js` (required when image is set)
- [ ] Full article copy added to post body
- [ ] Inline images saved, named correctly, and wired up with alt text
- [ ] Pull quotes and callout boxes placed where they appear in original
- [ ] Closing tagline added before tags
- [ ] Tags match Hostinger categories
- [ ] Series nav updated (if applicable)
- [ ] Hard refresh — reading time shows, hero image loads, related posts populate, nav active on Blog
