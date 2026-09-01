# NoMoreHiding.net — Slug Migration Reference

Best practice: lowercase, hyphens only, 2–3 keywords, no stop words (a / the / how / to / your / of / its). Set 301 redirects from old → new slugs in WordPress before launch.

---

## Main Pages — keep as-is

| Page Name | Current Slug | New Slug |
|---|---|---|
| Home | `/` | `/` |
| Start Here | `/start-here` | `/start-here` |
| About | `/about` | `/about` |
| Events | `/events` | `/events` |
| Blog | `/blog` | `/blog` |
| Community Partners | `/community-partners` | `/community-partners` |
| Contact | `/contact` | `/contact` |

---

## Blog Posts

| Page Name | Current Slug | New Slug |
|---|---|---|
| no more hiding — More Than a Mantra, It's a Movement | `/no-more-hiding-more-than-a-mantra-its-a-movement` | `/more-than-mantra` |
| Big Sister Talk: How to Get Your Shine Back | `/big-sister-talk-how-to-get-your-shine-back` | `/get-shine-back` |
| Living Fully, Living Free: Single at Any Age Part 1 | `/living-fully-living-free-single-at-any-age-part-1` | `/living-single-free` |
| Living Fully Part II: Single Living — The Difference Is a Decision | `/living-fully-part-ii-single-living-living-single-the-difference-is-a-decision` | `/single-living-choice` |
| Tell Yourself Hard Truths | `/tell-yourself-hard-truths` | `/tell-hard-truths` |
| Different Lenses, Different Lanes | `/different-lenses-different-lanes` | `/different-lanes` |
| A Life Un-Lived | `/a-life-un-lived` | `/life-unlived` |
| Unpacking Your Big Girl Feelings: Embracing Joy, Freedom, and Self-Love | `/unpacking-your-big-girl-feelings-embracing-joy-freedom-and-self-love` | `/big-girl-feelings` |
| The Love Language of Elder Caregiving | `/the-love-language-of-elder-caregiving` | `/elder-love-language` |
| How to Get a Life When You've Forgotten You Had One | `/how-to-get-a-life-when-youve-forgotten-you-had-one` | `/reclaim-your-life` |
| Loving Too Long: When Motherhood Doesn't Recognize When to Take a Step Back | `/loving-too-long-when-motherhood-doesnt-recognize-when-to-take-a-step-back` | `/loving-too-long` |
| Motherhood Transformed: The Peace of Shifting Roles in the Parent-Child Relationship | `/motherhood-transformed-the-peace-of-shifting-roles-in-the-parent-child-relationship` | `/motherhood-transformed` |
| Birdies, Bogeys, and Rolling Hills: Scotland Golf Trip | `/birdies-bogeys-and-rolling-hills-what-every-lady-golfer-should-know-before-planning-a-golf-trip-to-scotland` | `/scotland-golf-trip` |
| 10 Ways to Get Emotionally Unstuck | `/10-ways-to-get-emotionally-unstuck` | `/get-unstuck` |

---

## Events

| Page Name | Current Slug | New Slug |
|---|---|---|
| Past Events Gallery | `/past-events-gallery` | `/past-events` |
| Full Access Event Page | `/full-access-event-page` | ⚠ Looks like a template — delete? |

---

## Services / Products

| Page Name | Current Slug | New Slug |
|---|---|---|
| Individual Coaching Session | `/individual-coaching-session` | `/coaching` |
| Group Fitness Class | `/group-fitness-class` | `/group-fitness` |
| Intro Language Tutoring Session | `/intro-language-tutoring-session` | `/language-tutoring` |

---

## Possible Templates — recommend deleting before migration

These appear to be leftover WooCommerce demo products and unrelated content. Delete rather than redirect.

| Page Name | Current Slug | Action |
|---|---|---|
| Classic Cap | `/classic-cap-hpeszv` | Delete |
| Handmade Vase | `/handmade-vase-slowpy` | Delete |
| Hand Soap | `/hand-soap-giguos` | Delete |
| Set of Plates | `/set-of-plates-cxlzwx` | Delete |
| Sunglasses | `/sunglasses-iubjnq` | Delete |
| Wooden Chair | `/wooden-chair-mopukh` | Delete |
| Wool Sweater | `/wool-sweater-lortoo` | Delete |
| Postpartum Recovery Guide / Fourth Trimester Ebook | `/the-first-90-days-postpartum-recovery-guide-or-fourth-trimester-ebook-for-new-mums-or-week-by-week-healing-guide` | Delete — not NMH content |

---

## Migration Checklist

- [ ] Review and approve all new slugs above
- [ ] Update each post/page slug in WordPress before launch
- [ ] Add 301 redirects (old → new) via Yoast SEO or the Redirection plugin
- [ ] Update any internal links in content that reference old slugs
- [ ] Update links in `start-here/index.html` and any other hand-coded pages
- [ ] Test all redirects after launch
