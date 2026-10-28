# Original Site Pages — Archive & Reference

**Last updated:** October 28, 2026

## What this is

`original-site-pages/` is a saved copy of the **old No More Hiding website** — the
version that ran on Hostinger — captured right before we moved to the new site on
GreenGeeks. We keep it so we can look back at how any page used to be, compare the
old version against the new one, and recover original wording, images, or details
if something was dropped or changed during the migration.

Think of it as a "before" snapshot of the whole site.

## Where it lives

- Folder: `original-site-pages/` (at the top level of the project)
- Blog posts are inside the `original-blogs/` subfolder

## It never goes on the live website

This folder is listed in `.gitignore`, which means it is **not saved into Git and
not uploaded to the live site**. It stays only on the local computer as reference
material. (It's also large — about 94 MB — another reason to keep it out of the
website.)

## How the files are named

Every file starts with the word **`original-`** followed by the same short name
("slug") used for the matching page on the current site. The `original-` prefix is
there so these never get confused with the current site's files.

Example: `original-blogs/original-different-lanes.html` is the old version of the
"Different Lenses, Different Lanes" blog post, which on the new site uses the slug
`different-lanes`. To compare, open that file next to the live
`/blog/different-lanes/` page.

## What's inside

**Section pages (top level)**

| File | Old page | Current site? |
|---|---|---|
| original-index.html | Home | yes |
| original-about.html | About | yes |
| original-start-here.html | Start Here | yes |
| original-contact.html | Contact | yes |
| original-community-partners.html | Community Partners | yes |
| original-events.html | Events | yes |
| original-blog.html | Blog index | yes |
| original-past-events-gallery.html | Past Events Gallery | no equivalent |
| original-privacy-policy.html | Privacy Policy | no equivalent |
| original-experiences.html | Experiences | no equivalent |
| original-meet-our-speakers.html | Meet Our Speakers | no equivalent |

**Blog posts (`original-blogs/`)**

| File | Old post title |
|---|---|
| original-life-unlived.html | A Life Un-Lived |
| original-get-shine-back.html | Big Sister Talk: How to Get Your Shine Back |
| original-scotland-golf-trip.html | Birdies, Bogeys, and Rolling Hills (Scotland golf trip) |
| original-different-lanes.html | Different Lenses, Different Lanes |
| original-reclaim-your-life.html | How to Get a Life When You've Forgotten You Had One |
| original-living-single-free.html | Living Fully, Living Free: Single at Any Age (Part 1) |
| original-single-living-choice.html | Living Fully Part II: Single Living |
| original-loving-too-long.html | Loving Too Long |
| original-motherhood-transformed.html | Motherhood Transformed |
| original-more-than-mantra.html | no more hiding: More Than a Mantra, It's a Movement |
| original-tell-hard-truths.html | Tell Yourself Hard Truths |
| original-big-girl-feelings.html | Unpacking Your Big Girl Feelings |
| original-sisters-keeper.html | Am I My Sister's Keeper? |
| original-elder-love-language.html | The Love Language of Elder Caregiving |

## How these pages were saved (two methods)

1. **SingleFile saves (captured Aug 27, 2026)** — used for almost every page.
   SingleFile is a browser tool that packs the entire page — text, images, fonts,
   and styling — into one HTML file. These open and look correct anywhere, even
   with no internet.

2. **SiteOne Crawler (captured Aug 3, 2026)** — used only for
   `original-experiences.html` and `original-meet-our-speakers.html`, because we
   didn't have SingleFile saves of those two. Their images and styling live in two
   companion folders that sit next to the pages:
   - `_astro-1785710255025/`
   - `_assets.zyrosite.com/`

   **Do not move or delete those two folders** — if you do, those two pages lose
   their styling and images.

## Good to know

- **These are snapshots, not the live site.** They show how each page looked.
  Buttons, forms, and menus won't actually do anything.
- **The two crawler pages (experiences, meet-our-speakers)** pull their *fonts*
  from the web, exactly like the old live site did, so they look best with an
  internet connection. Offline, the fonts fall back to a default — the layout is
  still fine. A couple of tiny menu icons on those two pages don't show; that's a
  quirk from how the crawler saved them, not a mistake in the copy.
- **Three current blog posts have no original here** because they're new since the
  migration: `beyond-the-tee-box`, `get-unstuck`, and `listen-with-your-eyes`.
- **`original-elder-love-language.html`** came from the crawler copy (we had no
  SingleFile save of it), but it is self-contained and renders fine on its own.
- **One old page was left out on purpose:** "The First 90 Days Postpartum Recovery
  Guide." It doesn't match any current page and looks like leftover template/demo
  content. It's still available in the `site migration` folder if it's ever needed.

## Where the source copies live on the computer

If these ever need to be re-done or expanded, the originals are kept on the
project owner's computer:

- SingleFile saves: `C:\Users\vhofl\OneDrive\Renetta\site migration\` (the `site migration` folder in OneDrive under `Renetta`)
- SiteOne crawl (full offline mirror): `C:\Users\vhofl\OneDrive\Desktop\SiteOne-Crawler\nomorehiding.net\` (the `SiteOne-Crawler` folder on the Desktop, under its `nomorehiding.net` subfolder)
