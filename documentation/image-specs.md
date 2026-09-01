# no more hiding™ — Image Specifications

_Last updated: August 30, 2026_

Use this document as the reference for sizing, formatting, and optimizing images before adding them to the site. Correct sizing prevents the browser from having to zoom in aggressively, which causes unwanted cropping and loss of subject matter.

---

## Blog Hero Carousel

The full-width image carousel at the top of the Blog page.

| Spec          | Value                 |
| ------------- | --------------------- |
| Width         | 1440px                |
| Height        | 700px                 |
| Aspect ratio  | ~2:1 (wide landscape) |
| Format        | JPG                   |
| Quality       | 80%                   |
| Max file size | 500KB (300KB target)  |
| `object-fit`  | `cover`               |
| CSS class     | `.blog-hero-img`      |

**Notes:**

- Center the subject horizontally. The hero crops from center by default.
- If the subject's head is near the top, add `imagePosition` in `blog-data.js` to adjust the crop anchor (e.g. `"center 20%"` shows more of the top).
- Avoid images where the key subject is near the very top or bottom edge — they will be cropped on smaller viewports.
- Save hero images to `/images/blog/[post-slug]/[post-slug]-hero.jpg`.

---

## Homepage Hero Video Carousel

The full-width video carousel at the top of the Home page.

| Spec              | Value                              |
| ----------------- | ---------------------------------- |
| Width             | 1920px (video)                     |
| Height            | 1080px minimum                     |
| Format            | MP4 (H.264)                        |
| Max file size     | 8MB per clip                       |
| Duration          | 5 seconds per clip (trimmed)       |
| `object-fit`      | `cover`                            |
| `object-position` | `center 20%` (adjustable per clip) |
| CSS class         | `.carousel-video`                  |

**Notes:**

- Videos autoplay muted with no controls — make sure the clip reads well without sound.
- On large monitors (1280px+), hero min-height is 820px. Keep subjects away from the very top of the frame.
- To adjust vertical crop on a specific clip, update `object-position` on `.carousel-video` in `components.css`.

---

## Blog Post Cards

Cards displayed in the homepage "From the Blog" carousel and the blog page "More Stories" grid.

| Spec          | Value                       |
| ------------- | --------------------------- |
| Width         | 800px                       |
| Height        | 420px                       |
| Aspect ratio  | ~2:1 (wide landscape)       |
| Format        | JPG                         |
| Quality       | 80%                         |
| Max file size | 150KB                       |
| `object-fit`  | `cover`                     |
| Rendered size | 400 × 210px (2× for retina) |
| CSS class     | `.post-card-thumb img`      |

**Notes:**

- Cards render at 400 × 210px on screen — supplying 800 × 420px gives sharp display on retina/HiDPI screens.
- Center the subject. Cards crop from center; avoid subjects near edges.
- Images for the homepage cards live in `/images/home/`.
- Images for blog post cards live in `/images/blog/[post-slug]/`.
- Wire up card images in `blog-data.js` using the `image` and `imageAlt` fields.
- If no image is available yet, leave `image: ""` — a light gray placeholder renders automatically.

---

## Page Hero Banner (Interior Pages)

The gradient banner at the top of Start Here, About, Events, Community Partners, Contact, and other interior pages.

| Spec       | Value                                                |
| ---------- | ---------------------------------------------------- |
| Type       | CSS gradient (no image)                              |
| Background | `linear-gradient(135deg, #fdf8f6, #f7ede8, #eef2ea)` |
| CSS class  | `.page-hero`                                         |

**Notes:**

- Interior page heroes are CSS-only — no image file needed.
- If a background image is ever added to an interior page hero, follow the Blog Hero Carousel specs above.

---

## General Image Guidelines

- **Always provide descriptive `alt` text** for every image. Empty alt on meaningful images fails accessibility and SEO.
- **Never upload raw camera files** — resize and compress before saving to the project.
- **Use JPG for photos**, PNG only for graphics with transparency (logos, icons).
- **Recommended tools:** Canva (resize + export), Squoosh (compress), Windows Photos (basic crop).
- **Naming convention:** lowercase, hyphens only, no spaces or special characters.
  - ✅ `sisters-keeper-hero.jpg`
  - ❌ `Am I My Sister's Keeper HERO.png`
- **Folder convention:** `/images/blog/[post-slug]/[filename].jpg`
  - Example: `/images/blog/sisters-keeper/sisters-keeper-hero.jpg`
