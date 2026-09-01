/**
 * blog-data.js — no more hiding
 * Single source of truth for all blog posts.
 * Used by: index.html (homepage card carousel) and blog/index.html (blog page hero + grid).
 *
 * TO ADD OR UPDATE A POST: edit this array. Both pages update automatically.
 * Order matters: indices 0–2 = hero carousel slides on the blog page.
 *
 * Fields:
 *   id            {string}  Unique slug
 *   title         {string}  Post title
 *   category      {string}  Display category
 *   series        {string}  Optional — series name if part of a series
 *   excerpt       {string}  Short description (~2 sentences)
 *   image         {string}  Path relative to site root (/images/blog/...)
 *                           Use "" if no image yet — placeholder will show
 *   imageAlt      {string}  Descriptive alt text (never leave empty if image exists)
 *   url           {string}  Path to the post
 *   published     {string}  Display date (e.g. "May 30, 2026")
 *   imagePosition {string}  Optional — CSS object-position override (e.g. "center 20%")
 */

const NMH_POSTS = [

  /* ── HERO CAROUSEL (indices 0–2) ─────────────────────────────
     These three rotate in the blog page hero.
     Update images once blog post images are migrated.
  ──────────────────────────────────────────────────────────── */

  // Am I My Sister's Keeper?
  {
    id: "sisters-keeper",
    title: "Am I My Sister's Keeper?",
    category: "Relationships",
    // series: "Living Fully, Living Free — Part 1",
    excerpt: "Sisterhood alone does not entitle another woman to the privileges of friendship.",
    image: "/images/blog/sisters-keeper/blog-sisters-keeper-hero.png",
    imageAlt: "Four unrelated women of color standing together, arms around each other, smiling and looking confident",
    url: "/blog/sisters-keeper/",
    published: "August 26, 2026"
  },

  // Big Sister Talk: How to Get Your Shine Back
  {
    id: "get-shine-back",
    title: "Big Sister Talk: How to Get Your Shine Back",
    category: "Self-Discovery",
    excerpt: "You didn't lose your spark. Life just piled a lot of stuff on top of it. Here's how to start uncovering it.",
    image: "/images/blog/get-shine-back/get-shine-back-hero.png",
    imageAlt: "A woman with arms outstretched standing outdoors, face turned upward with a joyful expression",
    url: "/blog/get-shine-back/",
    published: "October 1, 2025"
  },

  // Birdies, Bogeys, and Rolling Hills: Scotland Golf Trip
  {
    id: "birdies-bogeys",
    title: "Birdies, Bogeys, and Rolling Hills: Scotland Golf Trip",
    category: "Golf & Community",
    excerpt: "It wasn't the sport itself. It was what happened when I showed up on the course and decided I belonged there.",
    image: "/images/blog/scotland-golf-trip/blog-birdies-bogies-hero.png",
    imagePosition: "center 20%",
    imageAlt: "A Black woman golfing from an earlier century, standing on a scenic golf course with rolling hills and a cloudy sky in the background",
    url: "/blog/scotland-golf-trip/",
    published: "August 10, 2026"
  },

  /* ── MORE STORIES GRID (index 3+) ────────────────────────────
     These appear in the "More Stories" card grid below the hero.
     Add images to /images/blog/ as they are migrated.
  ──────────────────────────────────────────────────────────── */

  // Living Single vs. Single Living
  {
    id: "living-single",
    title: "Living Single vs. Single Living",
    category: "Life & Mindset",
    series: "Living Fully, Living Free — Part 1",
    excerpt: "There's a difference between being alone and choosing your solitude. One drains you. The other fills you.",
    image: "/images/blog/living-single-free/living-single-free-hero.png",
    imageAlt: "Four women smiling embracing each other outdoors, representing the joy of living fully and freely",
    url: "/blog/living-single-free/",
    published: "October 3, 2025"
  },

  // A Life Un-Lived
  {
    id: "life-unlived",
    title: "A Life Un-Lived",
    category: "Personal Development",
    excerpt: "What does it cost to keep shrinking yourself? More than you think — and the bill comes due eventually.",
    image: "/images/blog/life-unlived/life-unlived-hero.jpg",
    imageAlt: "An image of a headstone with the words 'Our devoted sister and friend.  She survived, but she never lived.' etched into the stone, representing the consequences of not living fully",
    url: "/blog/life-unlived/",
    published: "May 30, 2026"
  },

  // The Love Language of Elder Caregiving
  {
    id: "elder-love-language",
    title: "The Love Language of Elder Caregiving",
    category: "Elder Care",
    excerpt: "Caregiving is an act of love — but it doesn't always feel that way in the middle of it. Here's what it really takes.",
    image: "/images/blog/elder-love-language/elder-love-language-hero.png",
    imageAlt: "A close-up of a caregiver's hand gently holding an elderly person's hand, symbolizing the love and care involved in elder caregiving",
    url: "/blog/elder-love-language/",
    published: "May 23, 2026"
  },

  // Tell Yourself Hard Truths
  {
    id: "tell-hard-truths",
    title: "Tell Yourself Hard Truths",
    category: "Mental Health",
    series: "NMH Self-Work Breakdown Structure™ — Phase 2",
    excerpt: "The most important conversation you'll ever have is the one you've been avoiding with yourself.",
    image: "/images/blog/tell-hard-truths/tell-hard-truths-hero.png",
    imageAlt: "A black and white image of shattered glass with raindrops on it, symbolizing the difficult but necessary process of confronting hard truths",
    url: "/blog/tell-hard-truths/",
    published: "March 23, 2026"
  },

  // Unpacking Your Big Girl Feelings
  {
    id: "big-girl-feelings",
    title: "Unpacking Your Big Girl Feelings: Embracing Joy, Freedom, and Self Love",
    category: "Personal Development",
    series: "Living Fully, Living Free — Part 3",
    excerpt: "Joy isn't frivolous. Freedom isn't selfish. And self-love isn't something you have to earn.",
    image: "/images/blog/big-girl-feelings/big-girl-feelings-hero.png",
    imageAlt: "A woman with her hand on her heart, unpacking a suitcase filled with items representing joy and self love, symbolizing the process of embracing and unpacking one's emotions",
    url: "/blog/big-girl-feelings/",
    published: "March 17, 2026"
  },

  // How to Get a Life When You've Forgotten You Had One
  {
    id: "reclaim-your-life",
    title: "How to Get a Life When You've Forgotten You Had One",
    category: "Personal Development",
    series: "NMH Self-Work Breakdown Structure™ — Phase 1",
    excerpt: "Somewhere between the to-do lists and the caregiving and the career, you disappeared. Here's how to find your way back.",
    image: "/images/blog/reclaim-your-life/reclaim-your-life-hero.png",
    imageAlt: "A woman with a postcard in her hand, in a reflective pose, symbolizing the journey of reclaiming one's life and rediscovering oneself",
    url: "/blog/reclaim-your-life/",
    published: "March 7, 2026"
  },

  // Different Lenses, Different Lanes
  {
    id: "different-lanes",
    title: "Different Lenses, Different Lanes",
    category: "Relationships",
    excerpt: "We all see the world through our own lens. The magic — and the tension — is in learning to honor someone else's view.",
    image: "/images/blog/different-lanes/different-lanes-hero.png",
    imageAlt: "A six-lane highway with cars traveling in different directions, symbolizing the idea of different perspectives and paths in life",
    url: "/blog/different-lanes/",
    published: "February 5, 2026"
  },

  // Motherhood Transformed
  {
    id: "motherhood-transformed",
    title: "Motherhood Transformed: The Peace of Shifting Roles in the Parent-Child Relationship",
    category: "Relationships",
    excerpt: "There comes a moment when motherhood asks you to let go — not of love, but of control. That shift can be its own kind of peace.",
    image: "/images/blog/motherhood-transformed/motherhood-transformed-hero.png",
    imageAlt: "A mother and adult child posing together peacefully, at ease with a new kind of relationship",
    url: "/blog/motherhood-transformed/",
    published: "December 25, 2025"
  },

  // Loving Too Long
  {
    id: "loving-too-long",
    title: "Loving Too Long: When Motherhood Doesn't Recognize When to Take a Step Back",
    category: "Relationships",
    excerpt: "Love without limits isn't always love. Sometimes the most courageous thing a mother can do is step back.",
    image: "/images/blog/loving-too-long/loving-too-long-hero.png",
    imageAlt: "A tiger cub riding the back of a mother tiger, symbolizing the idea of loving too long and the need for boundaries in relationships",
    url: "/blog/loving-too-long/",
    published: "November 13, 2025"
  },

  // 10 Ways to Get Emotionally Unstuck
  {
    id: "get-unstuck",
    title: "10 Ways to Get Emotionally Unstuck",
    category: "Mental Health",
    excerpt: "Stuck isn't permanent — it just feels that way. Here are ten honest ways to start moving again.",
    image: "/images/blog/get-unstuck/get-unstuck-hero.png",
    imageAlt: "An overhead view of a mug of coffee on a table with a napkin that shows a sketch of a cycle of the same old thinking getting the same old results, symbolizing the idea of being emotionally stuck and the need to break free from repetitive patterns",
    url: "/blog/get-unstuck/",
    published: "October 13, 2025"
  },

  // Living Fully Part II: Single Living — The Difference Is a Decision
  {
    id: "single-living-choice",
    title: "Living Fully Part II: Single Living — The Difference Is a Decision",
    category: "Life & Mindset",
    series: "Living Fully, Living Free — Part 2",
    excerpt: "Being single is a status. Single living is a choice. And that decision changes everything.",
    image: "/images/blog/single-living-choice/single-living-choice-hero.png",
    imageAlt: "A split image of a woman in a dimly lit room on the left, looking sad and isolated, and the same woman on the right, standing outdoors in bright sunlight, looking confident and free, symbolizing the contrast between being single and choosing to live fully as a single person",
    url: "/blog/single-living-choice/",
    published: "October 30, 2025"
  },

  // no more hiding: More Than a Mantra, It's a Movement
  {
    id: "more-than-mantra",
    title: "no more hiding: More Than a Mantra, It's a Movement",
    category: "Personal Development",
    excerpt: "This isn't just a brand name. It's a declaration — and an invitation to stop hiding in plain sight.",
    image: "/images/blog/more-than-mantra/more-than-mantra-hero.png",
    imageAlt: "A spllt imaga of a woman in a hat with her face hidden in shadow on the left, and the same woman on the right removing the hat and facing the light, symbolizing the idea of stepping out of hiding and embracing one's true self",
    url: "/blog/more-than-mantra/",
    published: "April 12, 2024"
  }

];
