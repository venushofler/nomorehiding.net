
# no more hiding™ — Image Specifications

_Last updated: September 19, 2026_

## Purpose

This document establishes the image and video specifications for the no more hiding™ website.

Use it as the reference for sizing, formatting, optimizing, and implementing visual assets before adding them to the repository.

Correct image sizing helps:

- Maintain consistent visual quality across the website.
- Prevent images from stretching or appearing distorted.
- Reduce unwanted cropping of people, text, and important details.
- Maintain sharp image quality on desktop, tablet, and mobile screens.
- Improve website loading performance.
- Support accessibility and responsive design.
- Keep image dimensions, naming conventions, and file locations consistent.

### How to use this document

This document contains two types of specifications.

**1. Established website component specifications**

These describe the existing website components, including their required image dimensions, formats, CSS classes, file locations, and implementation behavior.

Follow these specifications when preparing images for the corresponding components.

**2. Supplemental image standards**

These provide recommended dimensions for additional landscape, portrait, square, and vertical imagery that does not already have a component-specific specification.

Use them when preparing new website assets or when an existing component does not establish its own image requirements.

**Priority rule:** Existing website component specifications take precedence over supplemental recommendations.

Do not replace established dimensions, file formats, CSS classes, or repository paths with generic image-sizing recommendations.

---

# Part I — Established Website Component Specifications

## 1. Blog Hero Carousel

The full-width image carousel at the top of the Blog page.

### Specifications

| Spec | Value |
|---|---|
| Width | 1440px |
| Height | 700px |
| Aspect ratio | 72:35 (approximately 2.06:1) |
| Orientation | Wide landscape |
| Format | JPG |
| Quality | 80% |
| Max file size | 500KB |
| Target file size | 300KB |
| `object-fit` | `cover` |
| CSS class | `.blog-hero-img` |

### Image composition

- Center the subject horizontally. The hero crops from center by default.
- Leave sufficient space above and around subjects' heads.
- Avoid positioning important details near the top, bottom, or outer edges.
- If the subject's head is near the top, add `imagePosition` in `blog-data.js` to adjust the crop anchor.
- For example, `"center 20%"` positions the image toward the top, preserving more upper content than centered positioning when vertical cropping occurs.
- The exact amount of visible content depends on the source image's dimensions and the carousel container's dimensions.
- When resizing an existing image, extend the background if necessary rather than removing important content.

### File location

Save hero images to:

`/images/blog/[post-slug]/[post-slug]-hero.jpg`

Example:

`/images/blog/sisters-keeper/sisters-keeper-hero.jpg`

### Responsive behavior

The source image must be 1440 × 700px.

However, the browser may display the image at different dimensions depending on the viewport and carousel container.

Because the component uses `object-fit: cover`, some cropping may occur when the displayed container has a different aspect ratio from the source image.

When preparing a hero image, preserve adequate space around important subjects so the composition remains effective on different screen sizes.

**Important:** Do not replace the established 1440 × 700px blog hero dimensions with a generic 16:9 image specification.

---

## 2. Homepage Hero Video Carousel

The full-width video carousel at the top of the Home page.

### Specifications

| Spec | Value |
|---|---|
| Width | 1920px |
| Height | 1080px minimum |
| Aspect ratio | 16:9 for a 1920 × 1080px source |
| Orientation | Landscape |
| Format | MP4 (H.264) |
| Max file size | 8MB per clip |
| Recommended target | 1–3MB per 5-second clip, when visual quality permits |
| Duration | 5 seconds per clip (trimmed) |
| `object-fit` | `cover` |
| `object-position` | `center 20%` (adjustable per clip) |
| CSS class | `.carousel-video` |

### Video composition

- Videos autoplay muted with no controls. Ensure the clip communicates its intended message without sound.
- On large monitors (1280px+), the hero's minimum height is 820px.
- Keep subjects away from the very top of the frame.
- Maintain sufficient space around faces and other important visual elements.
- Avoid placing essential information near the edges where it may be cropped.
- Use framing and camera movement that remain effective when the video is displayed in different viewport sizes.
- To adjust vertical cropping for a specific clip, update `object-position` on `.carousel-video` in `components.css`.

### Video optimization

There is no universal web standard establishing a maximum file size for background videos.

The appropriate file size depends on the video's duration, resolution, compression, visual complexity, and delivery method.

The existing 8MB maximum is a project-specific requirement, not a universal browser or web standard.

For short, muted background videos, aim for smaller files when acceptable visual quality can be maintained.

**Recommended optimization target:** 1–3MB per five-second clip.

This is a performance goal rather than a strict requirement. Preserve the existing 8MB maximum unless the project's requirements change.

### Performance considerations

- Compress video clips before committing them to the repository.
- Avoid unnecessarily high bitrates.
- Maintain acceptable visual quality while minimizing file size.
- Evaluate the combined loading impact of multiple carousel videos.
- Verify playback performance on slower connections and mobile devices.
- Use appropriate video loading strategies to avoid downloading unnecessary clips immediately.
- Consider reduced-motion preferences when implementing autoplaying background videos.

For example, four clips at 8MB each represent 32MB of video assets.

This does not necessarily mean every visitor downloads all 32MB immediately. Actual data transfer depends on how the carousel loads and preloads its videos.

### Static images and video poster frames

If static hero images or video poster images are introduced, use the following supplemental specifications unless the component requires otherwise.

| Spec | Recommended Value |
|---|---|
| Width | 1920px |
| Height | 1080px |
| Aspect ratio | 16:9 |
| Orientation | Landscape |
| Format | Optimized JPG or WebP |
| Suggested file size | 200–500KB |
| `object-fit` | `cover`, when matching the existing video container |

These specifications do not replace the established video carousel requirements.

---

## 3. Blog Post Cards

Cards displayed in the homepage "From the Blog" carousel and the Blog page "More Stories" grid.

### Specifications

| Spec | Value |
|---|---|
| Width | 800px |
| Height | 420px |
| Aspect ratio | 40:21 (approximately 1.90:1) |
| Orientation | Wide landscape |
| Format | JPG |
| Quality | 80% |
| Max file size | 150KB |
| `object-fit` | `cover` |
| Rendered size | 400 × 210px |
| CSS class | `.post-card-thumb img` |

### Image composition

- Cards render at 400 × 210px in the documented layout.
- Supplying 800 × 420px provides twice the displayed width and height for sharp rendering on 2× high-density screens.
- Center the subject. Cards crop from center by default.
- Avoid positioning subjects or important information near the edges.
- Leave sufficient space around faces and heads.
- Preserve the image's natural proportions when resizing.

### File locations

Images for homepage cards:

`/images/home/`

Images for blog post cards:

`/images/blog/[post-slug]/`

### Configuration

Wire up card images in `blog-data.js` using the `image` and `imageAlt` fields.

If no image is available yet, leave:

```js
image: ""
```

A light gray placeholder renders automatically.

### Important

Use the established 800 × 420px source dimensions for blog cards.

Do not substitute the general 1200 × 800px landscape dimensions, because they have a different aspect ratio and may introduce unnecessary cropping.

---

## 4. Page Hero Banner — Interior Pages

The gradient banner at the top of Start Here, About, Events, Community Partners, Contact, and other interior pages.

### Specifications

| Spec | Value |
|---|---|
| Type | CSS gradient (no image) |
| Background | `linear-gradient(135deg, #fdf8f6, #f7ede8, #eef2ea)` |
| CSS class | `.page-hero` |

### Notes

- Interior page heroes are CSS-only. No image file is required.
- Do not replace these gradients with images unless the page design is intentionally updated.
- If a background image is introduced into an interior page hero, use the Blog Hero Carousel specifications as the initial sizing reference and verify that the image suits the actual container.
- Images placed within the content sections of interior pages should follow the applicable supplemental standards below.

---

# Part II — Supplemental Image Standards

The following standards apply to additional website imagery that is not already covered by an established component specification.

Use these dimensions for new graphics, content images, founder portraits, promotional materials, and other website assets.

These are recommended source dimensions. Actual display dimensions depend on the page layout and CSS.

## 5. Standard Landscape Images

Landscape images are wider than they are tall.

They are primarily used for website content sections, blog article images, featured stories, promotional graphics, and multimedia content.

### Dimensions

| Image Type | Width (px) | Height (px) | Aspect Ratio | Recommended Usage |
|---|---:|---:|---|---|
| Full-width static hero | 1920 | 1080 | 16:9 | Static homepage imagery and video poster frames |
| General landscape | 1200 | 800 | 3:2 | Blog content, informational sections, and featured images |
| Widescreen landscape | 1280 | 720 | 16:9 | Video thumbnails and multimedia content |
| Compact landscape | 1200 | 900 | 4:3 | Editorial images, content cards, and image galleries |

### Landscape image guidelines

- Use 1200 × 800px as the default for general landscape content images.
- Use 1280 × 720px for content intended for a standard 16:9 display.
- Use 1200 × 900px when a taller landscape composition is needed.
- Preserve the original image's proportions when resizing.
- If the source image does not match the required ratio, extend the background or select an appropriate crop.
- Do not crop faces, heads, embedded text, or other important content.
- For images with essential content near the edges, prefer proportional scaling or `object-fit: contain`.

**Important:** The general landscape dimensions do not replace the 1440 × 700px Blog Hero Carousel or 800 × 420px Blog Post Card specifications.

---

## 6. Standard Portrait Images

Portrait images are taller than they are wide.

They are primarily used for founder portraits, team profiles, testimonials, biography sections, promotional graphics, and mobile-focused content.

### Dimensions

| Image Type | Width (px) | Height (px) | Aspect Ratio | Recommended Usage |
|---|---:|---:|---|---|
| Standard portrait | 800 | 1200 | 2:3 | Founder portraits, biographies, and editorial photography |
| Editorial portrait | 900 | 1200 | 3:4 | Team profiles, testimonials, and website content sections |
| Promotional portrait | 1080 | 1350 | 4:5 | Instagram feed posts, promotional graphics, and portrait content |
| Vertical portrait | 1080 | 1920 | 9:16 | Instagram Stories, Reels, and vertical mobile content |

### Portrait image guidelines

- Use 800 × 1200px as the general standard for website portraits when the component has no established dimensions.
- Use 900 × 1200px when a wider portrait composition is preferable.
- Use 1080 × 1350px for promotional graphics designed for both the website and Instagram.
- Use 1080 × 1920px for vertical social media content or specifically designed mobile layouts.
- Keep the subject's head fully visible.
- Leave sufficient space above the head and around the shoulders.
- Avoid stretching a portrait image to fill a landscape container.
- Use a dedicated landscape version when a portrait composition cannot be displayed effectively in a wide container.

### Founder and profile photography

For photographs of Renetta and other featured individuals:

- Preserve natural facial proportions.
- Maintain adequate space around the head and shoulders.
- Use a clean, complementary background.
- Keep the face clearly visible at smaller display sizes.
- Avoid aggressive cropping that removes important parts of the subject.

The actual page component's dimensions should be checked before selecting a final portrait ratio.

---

## 7. Standard Square Images

Square images have equal width and height.

They are useful for event cards, promotional graphics, profile pictures, social media posts, and content thumbnails.

### Dimensions

| Image Type | Width (px) | Height (px) | Aspect Ratio | Recommended Usage |
|---|---:|---:|---|---|
| Standard square | 1080 | 1080 | 1:1 | Event cards, social media posts, and promotional graphics |
| Large square | 1200 | 1200 | 1:1 | High-resolution graphics and prominent website cards |
| Profile picture | 800 | 800 | 1:1 | Founder portraits, author profiles, and team photographs |
| Compact thumbnail | 600 | 600 | 1:1 | Small content cards and square thumbnails |

### Square image guidelines

- Use 1080 × 1080px as the general standard for event and promotional graphics.
- Use 800 × 800px for profile pictures and author portraits.
- Center important subjects and visual elements.
- Leave enough padding around text and faces.
- Keep important content away from the edges when the image may be displayed with rounded corners or a circular crop.
- Do not force landscape images into square proportions by stretching or squashing them.

**Important:** Square image standards apply only to components designed to display square imagery. Blog post cards must continue using the established 800 × 420px dimensions.

---

## 8. Mobile and Vertical Images

Vertical images may be appropriate for mobile-focused layouts, social media content, and selected promotional sections.

### Dimensions

| Image Type | Width (px) | Height (px) | Aspect Ratio | Recommended Usage |
|---|---:|---:|---|---|
| Standard mobile landscape | 1280 | 720 | 16:9 | Responsive video and landscape content |
| Mobile square | 1080 | 1080 | 1:1 | Square promotional graphics and event cards |
| Mobile portrait | 1080 | 1350 | 4:5 | Portrait promotional content and Instagram feed posts |
| Full-screen vertical | 1080 | 1920 | 9:16 | Instagram Stories, Reels, and full-screen mobile visuals |

### Mobile image guidelines

- Do not assume that every desktop image should be replaced with a portrait image on mobile.
- Use the same source image responsively when its composition works across screen sizes.
- Create a dedicated mobile version when important content would otherwise be cropped.
- Keep essential text and subjects within the visible area of the target component.
- Test images at common mobile, tablet, and desktop widths.
- Prioritize legibility and preservation of important content over filling every available pixel.

A 9:16 source image should only be used when the intended component supports that vertical presentation.

---

# Part III — General Image Preparation Guidelines

## 9. Image Composition and Resizing

When preparing, resizing, or regenerating existing images, follow these requirements.

### Preserve important content

- Do not cut off heads, faces, hands, important objects, embedded text, or other meaningful content.
- Maintain sufficient padding around subjects.
- Avoid placing important details close to the edges of images that may be cropped by responsive containers.

### Maintain natural proportions

- Never stretch or squash an image to fit a target size.
- Preserve the original proportions of subjects and objects.
- Extend or reconstruct the background when necessary to achieve a new aspect ratio without losing content.

### Background extension

When the required dimensions differ from the original image's aspect ratio:

1. Determine whether proportional scaling can preserve the full image.
2. If additional space is needed, extend the background to reach the target ratio.
3. Maintain consistency in lighting, color, perspective, and surrounding context.
4. Avoid introducing distracting elements into the extended background.
5. Verify that the subject remains naturally proportioned and appropriately positioned.

### Image quality

- Use high-resolution source images whenever possible.
- Avoid unnecessary enlargement of low-resolution images.
- Check the final image for blur, compression artifacts, distorted features, and unnatural background extensions.
- Maintain natural-looking skin tones and lighting.
- Use vivid but balanced color that complements the no more hiding™ brand.

---

## 10. Images Containing Embedded Text

Text-based graphics require different handling from decorative photographs.

Examples include:

- Infographics
- Diagrams
- Flowcharts
- Event announcements
- Quote graphics
- Instructional graphics
- Promotional images containing essential text

### Requirements

- All essential text must remain fully visible.
- Text must be legible at the intended display size.
- Do not use `object-fit: cover` when it would crop important text.
- Use proportional scaling or `object-fit: contain` when the full graphic must remain visible.
- Maintain sufficient padding between text and image boundaries.
- Avoid compressing graphics so aggressively that text becomes blurry or difficult to read.
- For text-heavy graphics, consider using HTML text and CSS rather than embedding the text directly into an image.

### Preferred formats

| Graphic Type | Preferred Format |
|---|---|
| Vector diagrams and simple graphics | SVG |
| Graphics requiring transparency | PNG or WebP |
| Complex raster graphics with text | PNG or lossless WebP |
| Photographic promotional graphics | Optimized JPG or WebP |

When essential information is embedded in an image, provide an equivalent accessible text description in the page content or image alternative text, as appropriate.

---

# Part IV — Image Formatting and Optimization

## 11. Image File Formats

Use image formats appropriate to the content and the website's implementation.

The existing website uses JPG for blog heroes and blog post cards.

Preserve those conventions unless the relevant component and asset references are intentionally updated to support a different format.

### Format comparison

| Format | Extension | Recommended Usage |
|---|---|---|
| JPEG | .jpg / .jpeg | Existing blog heroes, blog cards, and general photography |
| PNG | .png | Graphics requiring transparency or lossless detail, including certain text-based graphics |
| WebP | .webp | Optimized website photography, portraits, and graphics |
| AVIF | .avif | Highly compressed photographic content |
| SVG | .svg | Logos, icons, and vector illustrations |

### JPEG / JPG

JPEG is a widely supported photographic image format.

It uses lossy compression to reduce file size.

JPEG is appropriate for photographs and complex photographic imagery where some compression can be applied without noticeably affecting visual quality.

**NMH usage:** Continue using JPG for existing blog heroes and blog post cards.

### PNG

PNG is a lossless raster image format that supports transparency.

It preserves exact pixel information, making it useful for detailed graphics, diagrams, and images containing sharp text.

PNG files can be substantially larger than compressed photographic formats.

**NMH usage:** Use PNG when transparency or lossless raster detail is required.

### WebP

WebP is a modern image format developed by Google.

It supports:

- Lossy compression.
- Lossless compression.
- Transparency.
- Animation.

WebP can provide smaller files than JPG or PNG while maintaining comparable visual quality, depending on the source image and compression settings.

It is useful for website photography, portraits, and many promotional graphics.

**NMH usage:** WebP may be used for new content images where the website's implementation supports it.

### AVIF

AVIF stands for AV1 Image File Format.

It is an image format based on AV1 compression technology.

It supports:

- Lossy compression.
- Lossless compression.
- Transparency.
- Advanced image capabilities, including HDR.

AVIF can provide smaller files than JPG or WebP at comparable visual quality, depending on the image and encoding settings.

**NMH usage:** AVIF may be considered for optimized photographic content where the website's image-processing and delivery workflow supports it.

### SVG

SVG stands for Scalable Vector Graphics.

Unlike raster image formats, SVG describes graphics using vector shapes and paths.

SVG graphics can scale to different display sizes without losing sharpness.

**NMH usage:** Prefer SVG for logos, icons, and other suitable vector illustrations.

SVG is generally not the appropriate format for ordinary photographic images.

### Implementation requirements

- Preserve existing JPG references unless the corresponding website code is updated.
- Confirm that the website's image-processing workflow supports a new format before adopting it.
- Update image paths and extensions when replacing an existing file with a different format.
- Use PNG or lossless WebP where preserving fine text or graphic details is important.
- Prefer SVG for logos and vector illustrations when available.

---

## 12. Recommended File Sizes

File-size targets help maintain website performance without unnecessarily sacrificing image quality.

### Specifications

| Image Category | Target File Size | Maximum / Guidance |
|---|---:|---|
| Blog Hero Carousel | 300KB | 500KB maximum |
| Blog Post Cards | Under 150KB | 150KB maximum |
| Full-width static hero | 200–500KB | Optimize according to image complexity |
| Standard landscape content | 100–250KB | Suggested optimization range |
| Portrait image | 100–250KB | Suggested optimization range |
| Square event graphic | 75–200KB | Suggested optimization range |
| Compact thumbnail | Under 100KB | Suggested target |
| Homepage hero video | 1–3MB per clip | 8MB maximum per clip |

### Important

There is no universal file-size limit that applies to every image or video on the web.

File-size requirements should account for:

- Image dimensions.
- Visual complexity.
- Compression format.
- Intended display size.
- Network performance.
- The number of assets loaded on a page.
- The importance of preserving fine image detail.

Existing component limits take precedence over supplemental file-size recommendations.

### Optimization guidelines

- File-size targets are guidelines rather than guarantees of acceptable visual quality.
- Photographs containing fine detail may require larger files.
- Text-based graphics should not be compressed to the point that text becomes blurry.
- Always inspect optimized images at their intended display size.
- Do not sacrifice important visual information solely to reach an arbitrary file-size target.

### Recommended tools

- Canva — resizing, composition, and image export.
- Squoosh — image compression and format conversion.
- Windows Photos — basic cropping and resizing.

---

# Part V — Responsive Display and CSS

## 13. Understanding Image Dimensions and Aspect Ratios

### Source dimensions

Source dimensions describe the actual width and height of an image file.

For example:

`1440 × 700px`

This represents an image that is 1440 pixels wide and 700 pixels tall.

### Aspect ratio

Aspect ratio describes the proportional relationship between an image's width and height.

For example:

`16:9`

A 16:9 image could have any of the following dimensions:

| Width (px) | Height (px) | Aspect Ratio |
|---:|---:|---|
| 1920 | 1080 | 16:9 |
| 1280 | 720 | 16:9 |
| 640 | 360 | 16:9 |

All three images have the same proportions.

An image can scale between these dimensions without distortion when its width and height change proportionally.

### Rendered dimensions

Rendered dimensions describe the size at which the browser displays an image.

These are not necessarily identical to the source dimensions.

For example, a source image measuring 1440 × 700px may be displayed within a smaller website container.

Its rendered dimensions depend on the viewport, container dimensions, CSS, and responsive layout.

---

## 14. Responsive Image Scaling

Images must scale proportionally across different screen sizes without stretching or squashing.

### Standard responsive images

For images that should maintain their natural proportions:

```css
.responsive-img {
  display: block;
  max-width: 100%;
  height: auto;
}
```

This allows the image to shrink with its container without distortion.

### Images in fixed-ratio containers

For photographic images designed to fill a container:

```css
.image-container {
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
}

.image-container img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

The container's aspect ratio must match the intended component design.

Do not apply the example 3:2 ratio to existing blog hero or blog card components.

---

## 15. `object-fit` and Cropping

The `object-fit` property controls how an image is resized within its container.

### Property comparison

| Property | Behavior | Recommended Usage |
|---|---|---|
| `cover` | Fills the container while preserving proportions; some content may be cropped | Decorative photography, blog heroes, and image cards |
| `contain` | Displays the entire image without cropping; empty space may remain | Logos, infographics, diagrams, and graphics containing text |
| `fill` | Stretches the image to fill the container and may distort its proportions | Avoid for website photography and meaningful graphics |
| `none` | Displays the image at its intrinsic size | Specialized layouts only |
| `scale-down` | Uses the smaller result of `none` or `contain` | Specialized layouts requiring size constraints |

### Important

`object-fit: cover` does not guarantee that every part of the original image will remain visible.

If the image and container have different aspect ratios, the browser scales the image proportionally to fill the container.

The excess content is cropped.

For images where all content must remain visible, use natural proportional scaling or `object-fit: contain`.

### Example

A 1440 × 700px source image has an aspect ratio of approximately 2.06:1.

If the image is displayed inside a 1200 × 400px container, that container has an aspect ratio of 3:1.

With `object-fit: cover`, the image is scaled to fill the wider container, resulting in vertical cropping.

The browser may remove visible content from the top and bottom of the image.

The amount of cropping depends on the scaled image dimensions and the container dimensions.

---

## 16. `object-position` and Subject Placement

The `object-position` property determines how an image is aligned inside its container.

This is particularly useful for images displayed with `object-fit: cover`.

### Positioning examples

```css
/* Center the image */
object-position: center;

/* Align toward the top */
object-position: center top;

/* Shift vertical alignment toward the top */
object-position: center 20%;

/* Align toward the bottom */
object-position: center bottom;
```

### Positioning behavior

| CSS Value | Behavior |
|---|---|
| `center top` | Aligns the image to the top, preserving more upper content when vertical cropping occurs |
| `center 20%` | Positions the image toward the top, preserving more upper content than centered positioning |
| `center` | Centers the image, distributing vertical cropping equally when applicable |
| `center bottom` | Aligns the image to the bottom, preserving more lower content when vertical cropping occurs |

### What does `center 20%` mean?

`center 20%` does not mean that 20% of the image will remain visible.

It specifies the image's horizontal and vertical alignment relative to its container.

The first value, `center`, controls horizontal alignment.

The second value, `20%`, controls vertical alignment.

When an image is taller than its container after scaling, a vertical position of 20% places the image toward the top.

This preserves more of the upper portion than centered positioning.

### Cropping example

Suppose an image has 100 pixels of excess vertical content after being scaled to fill its container.

| Position | Cropped from Top | Cropped from Bottom |
|---|---:|---:|
| `center top` | 0px | 100px |
| `center 20%` | 20px | 80px |
| `center` | 50px | 50px |
| `center bottom` | 100px | 0px |

These values are illustrative.

The actual amount of cropping depends on the image's scaled dimensions and the container's dimensions.

### Important considerations

- The best position depends on the source image and container dimensions.
- Moving the crop anchor can improve subject visibility.
- If the image and container have matching aspect ratios, `object-fit: cover` does not require cropping, so changing `object-position` will have no visible effect.
- If cropping occurs horizontally rather than vertically, adjusting the vertical position will not solve the horizontal cropping.
- Adjusting `object-position` cannot recover content that does not exist in the original image.
- If a subject is already cropped in the source file, regenerate or extend the image when necessary.

### No More Hiding™ implementation

For the Blog Hero Carousel, use the existing `imagePosition` field in `blog-data.js` when adjusting individual image placement.

Example:

```js
imagePosition: "center 20%"
```

Use positioning adjustments to improve composition when responsive cropping occurs.

If important content has already been removed from the source image, extend or regenerate the image rather than attempting to correct it with CSS alone.

---

## 17. Responsive Image Variants

When a single image cannot display effectively across all screen sizes, consider creating separate desktop and mobile versions.

### Example variants

| Variant | Dimensions | Aspect Ratio | Purpose |
|---|---|---|---|
| Desktop hero | 1920 × 1080px | 16:9 | Wide desktop presentation |
| Mobile portrait | 1080 × 1350px | 4:5 | Mobile-focused composition |
| Full-screen mobile | 1080 × 1920px | 9:16 | Vertical mobile presentation |

These are supplemental examples, not automatic replacements for existing website components.

The actual dimensions should be selected according to the component's responsive layout.

### Guidelines

- Use responsive image variants when they provide a meaningful improvement in composition or readability.
- Preserve important subjects and information in every variant.
- Do not create multiple image files unnecessarily when one responsive source image already displays correctly.
- Verify that the website component supports switching between image variants before introducing separate desktop and mobile assets.

---

# Part VI — Accessibility and Performance

## 18. Image Accessibility and Alternative Text

Every HTML `<img>` element must include an appropriate `alt` attribute.

The value of that attribute depends on whether the image communicates meaningful information or serves a purely decorative purpose.

### Meaningful images

Meaningful images communicate information that is relevant to the page's content or functionality.

Examples include:

- Photographs documenting No More Hiding™ events.
- Founder and team portraits.
- Blog images that communicate information relevant to the article.
- Event graphics containing dates, locations, or registration details.
- Infographics, diagrams, and instructional graphics.

Meaningful images must include appropriate alternative text.

Example:

```html
<img
  src="/images/blog/sisters-keeper/sisters-keeper-hero.jpg"
  alt="A group of middle-aged women sharing a joyful conversation."
  width="1440"
  height="700"
/>
```

Alternative text should communicate the image's relevant meaning rather than merely repeat its filename.

### Decorative images

Purely decorative images add visual interest but do not communicate information needed to understand or use the page.

Examples include:

- Ornamental background patterns.
- Decorative shapes and flourishes.
- Background photographs used solely for visual atmosphere when they provide no additional information.

Decorative images must use an empty alt attribute.

Example:

```html
<img
  src="/images/decorative-background.jpg"
  alt=""
  width="1200"
  height="800"
/>
```

The empty attribute tells screen readers to skip the decorative image.

**Do not omit the `alt` attribute entirely.**

An empty alt attribute is intentionally different from a missing alt attribute.

### Important distinctions

- An image is not automatically meaningful or decorative based on its subject.
- Determine its purpose within the specific page.
- If an image communicates important information, provide an appropriate text alternative.
- If an image is purely decorative, use `alt=""`.
- Images used as functional controls or links must have an appropriate accessible name.
- Complex diagrams and infographics may require an additional text explanation beyond a short alt attribute.
- Avoid repeating information unnecessarily when equivalent content is already available in nearby HTML text.

### Additional accessibility considerations

- Do not rely solely on images containing embedded text to communicate essential information.
- Ensure text overlays have sufficient contrast against image backgrounds.
- Avoid using color alone to communicate important information.
- Verify that essential information remains readable on mobile screens.

---

## 19. Image Loading and Performance

Optimize images to reduce unnecessary data transfer and improve page loading.

### Recommended practices

- Include explicit `width` and `height` attributes when appropriate to help reserve image space and reduce layout shifts.
- Use `loading="lazy"` for images below the initial viewport.
- Avoid lazy-loading the primary above-the-fold hero image.
- Use responsive image sources when multiple resolutions are available.
- Compress images before committing them to the repository.
- Avoid serving unnecessarily large image files to small display containers.
- Test image clarity and loading behavior on desktop and mobile devices.

### Example: Responsive blog content image

```html
<img
  src="/images/blog/example/example-content.jpg"
  alt="Middle-aged women enjoying a conversation together."
  width="1200"
  height="800"
  loading="lazy"
  class="responsive-img"
/>
```

### Example: Responsive image sources

When multiple image resolutions are available:

```html
<img
  src="/images/example-1200.jpg"
  srcset="
    /images/example-600.jpg 600w,
    /images/example-900.jpg 900w,
    /images/example-1200.jpg 1200w
  "
  sizes="(max-width: 768px) 100vw, 800px"
  alt="A group of women gathered around a table."
  width="1200"
  height="800"
  loading="lazy"
/>
```

Ensure the `srcset` files actually exist before adding these references.

The `sizes` attribute should reflect the image's actual rendered width in the website layout.

---

# Part VII — File Naming and Organization

## 20. Naming Conventions

Use descriptive, consistent filenames.

### Requirements

- Use lowercase letters.
- Separate words with hyphens.
- Avoid spaces and special characters.
- Include the content topic or post slug when appropriate.
- Include the image's purpose or variant when helpful.

### Examples

Correct:

`sisters-keeper-hero.jpg`

`sisters-keeper-card.jpg`

`renetta-founder-portrait.jpg`

`2027-events-square.png`

`community-gathering-landscape.jpg`

Avoid:

`Am I My Sister's Keeper HERO.png`

`IMG_20260919_001.jpg`

`New Image Final FINAL 2.png`

---

## 21. Folder Conventions

### Blog hero and content images

`/images/blog/[post-slug]/`

Example:

`/images/blog/sisters-keeper/sisters-keeper-hero.jpg`

### Homepage card images

`/images/home/`

### Additional website images

For assets outside the established blog and homepage directories, follow the existing repository structure and the relevant page or component's image references.

Do not create new folders or change established image paths without updating the corresponding website code.

---

# Part VIII — Quick Reference

## 22. Complete Image Dimensions Reference

This table consolidates the established website specifications and supplemental image standards.

| Image Category | Orientation | Dimensions (px) | Aspect Ratio | Specification Type |
|---|---|---|---|---|
| Blog Hero Carousel | Landscape | 1440 × 700 | 72:35 (≈2.06:1) | Existing component |
| Homepage Hero Video | Landscape | 1920 × 1080 minimum | 16:9 at 1920 × 1080 | Existing component |
| Blog Post Cards | Landscape | 800 × 420 | 40:21 (≈1.90:1) | Existing component |
| Interior Page Hero | N/A | CSS gradient | N/A | Existing component |
| Full-width Static Hero | Landscape | 1920 × 1080 | 16:9 | Supplemental |
| General Landscape | Landscape | 1200 × 800 | 3:2 | Supplemental |
| Widescreen Landscape | Landscape | 1280 × 720 | 16:9 | Supplemental |
| Compact Landscape | Landscape | 1200 × 900 | 4:3 | Supplemental |
| Standard Portrait | Portrait | 800 × 1200 | 2:3 | Supplemental |
| Editorial Portrait | Portrait | 900 × 1200 | 3:4 | Supplemental |
| Promotional Portrait | Portrait | 1080 × 1350 | 4:5 | Supplemental |
| Vertical Portrait | Portrait | 1080 × 1920 | 9:16 | Supplemental |
| Standard Square | Square | 1080 × 1080 | 1:1 | Supplemental |
| Large Square | Square | 1200 × 1200 | 1:1 | Supplemental |
| Profile Picture | Square | 800 × 800 | 1:1 | Supplemental |
| Compact Square Thumbnail | Square | 600 × 600 | 1:1 | Supplemental |

---

## 23. Image Preparation Checklist

Before adding a new image to the website, verify the following:

- [ ] The image matches the target component's required dimensions.
- [ ] The image has the correct aspect ratio.
- [ ] The image is not stretched or squashed.
- [ ] All important subjects and contextual details remain visible.
- [ ] Faces and heads have adequate space around them.
- [ ] Embedded text is readable and has not been cropped.
- [ ] The image uses the appropriate file format.
- [ ] The image meets the applicable file-size requirements.
- [ ] The filename follows the established naming convention.
- [ ] The image is saved in the correct repository directory.
- [ ] The image has appropriate alternative text.
- [ ] The image displays correctly on desktop, tablet, and mobile.
- [ ] Any necessary `object-position` adjustments have been applied.
- [ ] Image references in the website code match the actual filename and path.

---

## Final Implementation Rule

**Always follow the established website component specifications first.**

The supplemental standards provide consistent dimensions for additional website assets that do not have an existing component-specific specification.

When preparing or regenerating an image, prioritize preserving important content, maintaining natural proportions, and matching the intended component's aspect ratio.

If the required aspect ratio cannot be achieved without removing important content, extend the image background or create an alternative composition rather than stretching or aggressively cropping the original.

---

_no more hiding™ — Website Image Specifications_