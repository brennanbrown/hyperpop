# Y2K-Style 11ty Blog - Technical Specification
## Static Site with Client-Side JavaScript Only

Based on your vibrant vaporwave and cybercore aesthetic moodboards, this specification focuses on realistic implementations for a static 11ty site.

---

## Visual Design System

### Color Palette
```css
:root {
  /* Primary Colors */
  --neon-purple: #9D00FF;
  --hot-pink: #FF10F0;
  --cyber-blue: #00F0FF;
  
  /* Secondary Colors */
  --acid-green: #39FF14;
  --sunset-orange: #FF6B35;
  --holo-silver: #E8E8E8;
  
  /* Backgrounds */
  --deep-black: #0A0A0A;
  --dark-purple: #1a0033;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, var(--neon-purple), var(--hot-pink), var(--cyber-blue));
  --gradient-holo: linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff);
}
```

### Typography Stack
```css
/* Import from Google Fonts or self-host */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Space+Mono:wght@400;700&family=Orbitron:wght@400;700;900&display=swap');

:root {
  --font-pixel: 'Press Start 2P', monospace;
  --font-mono: 'VT323', monospace;
  --font-body: 'Space Mono', monospace;
  --font-future: 'Orbitron', sans-serif;
}
```

**Implementation Notes:**
- Use `font-display: swap` to prevent FOIT (Flash of Invisible Text)
- Subset fonts to only needed characters for performance
- Fallback chain: `'Space Mono', 'Courier New', monospace`

### Visual Effects - CSS Only

#### Glitch Effect (Pure CSS)
```css
.glitch {
  position: relative;
  animation: glitch-skew 1s infinite linear alternate-reverse;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch::before {
  left: 2px;
  text-shadow: -2px 0 #ff00ff;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim 5s infinite linear alternate-reverse;
}

.glitch::after {
  left: -2px;
  text-shadow: -2px 0 #00ffff;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim2 5s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
  0% { clip: rect(10px, 9999px, 31px, 0); }
  20% { clip: rect(85px, 9999px, 140px, 0); }
  40% { clip: rect(43px, 9999px, 92px, 0); }
  60% { clip: rect(65px, 9999px, 18px, 0); }
  80% { clip: rect(120px, 9999px, 73px, 0); }
  100% { clip: rect(55px, 9999px, 98px, 0); }
}

@keyframes glitch-anim2 {
  0% { clip: rect(65px, 9999px, 100px, 0); }
  20% { clip: rect(12px, 9999px, 95px, 0); }
  40% { clip: rect(78px, 9999px, 34px, 0); }
  60% { clip: rect(23px, 9999px, 67px, 0); }
  80% { clip: rect(90px, 9999px, 105px, 0); }
  100% { clip: rect(45px, 9999px, 89px, 0); }
}
```

**Usage in 11ty Template:**
```njk
<h1 class="glitch" data-text="{{ title }}">{{ title }}</h1>
```

#### Scan Lines Overlay
```css
.scanlines {
  position: relative;
  overflow: hidden;
}

.scanlines::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  z-index: 10;
  animation: scanline-move 8s linear infinite;
}

@keyframes scanline-move {
  0% { transform: translateY(0); }
  100% { transform: translateY(100px); }
}
```

#### CRT Monitor Curvature
```css
.crt-container {
  position: relative;
  border-radius: 8px;
  box-shadow: 
    inset 0 0 50px rgba(0, 0, 0, 0.5),
    0 0 50px rgba(157, 0, 255, 0.3);
  transform: perspective(500px) rotateX(0.5deg);
  
  /* Subtle barrel distortion using clip-path */
  clip-path: polygon(
    0% 2%, 2% 0%, 98% 0%, 100% 2%,
    100% 98%, 98% 100%, 2% 100%, 0% 98%
  );
}

/* Add vignette effect */
.crt-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%);
  pointer-events: none;
}
```

#### Holographic Gradients
```css
.holo-card {
  position: relative;
  background: linear-gradient(
    135deg,
    #1e1e1e 0%,
    #2d2d2d 50%,
    #1e1e1e 100%
  );
  border: 2px solid transparent;
  background-clip: padding-box;
}

.holo-card::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: conic-gradient(
    from 0deg,
    #ff00ff,
    #00ffff,
    #ff00ff,
    #00ffff,
    #ff00ff
  );
  border-radius: inherit;
  z-index: -1;
  animation: rotate-gradient 3s linear infinite;
}

@keyframes rotate-gradient {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

---

## Layout & Structure Implementation

### 11ty Directory Structure
```
project-root/
├── .eleventy.js              # 11ty config
├── src/
│   ├── _data/
│   │   ├── site.json         # Global site data
│   │   ├── navigation.json   # Menu items
│   │   └── effects.json      # Animation settings
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk
│   │   │   ├── post.njk
│   │   │   └── archive.njk
│   │   ├── components/
│   │   │   ├── header.njk
│   │   │   ├── footer.njk
│   │   │   ├── post-card.njk
│   │   │   ├── glitch-text.njk
│   │   │   └── neon-button.njk
│   │   └── partials/
│   │       ├── head.njk
│   │       ├── scripts.njk
│   │       └── meta.njk
│   ├── assets/
│   │   ├── css/
│   │   │   ├── styles.css
│   │   │   ├── effects.css
│   │   │   └── components.css
│   │   ├── js/
│   │   │   ├── main.js
│   │   │   ├── cursor.js
│   │   │   ├── glitch.js
│   │   │   └── konami.js
│   │   ├── images/
│   │   └── fonts/
│   ├── posts/
│   │   └── *.md
│   ├── pages/
│   │   ├── about.md
│   │   └── projects.md
│   └── index.njk
└── package.json
```

### Base Layout Template (base.njk)
```njk
<!DOCTYPE html>
<html lang="en" class="dark-mode">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ title }} | {{ site.title }}</title>
  
  <!-- Preload critical fonts -->
  <link rel="preload" href="/assets/fonts/SpaceMono-Regular.woff2" as="font" type="font/woff2" crossorigin>
  
  <!-- Critical CSS inlined -->
  <style>{% include "critical.css" %}</style>
  
  <!-- Main stylesheet -->
  <link rel="stylesheet" href="/assets/css/styles.css">
  
  {% include "partials/meta.njk" %}
</head>
<body class="scanlines" data-barba="wrapper">
  <!-- Cursor trail effect container -->
  <div id="cursor-trail"></div>
  
  {% include "components/header.njk" %}
  
  <main class="crt-container" data-barba="container">
    {{ content | safe }}
  </main>
  
  {% include "components/footer.njk" %}
  
  <!-- Scripts loaded at end -->
  <script src="/assets/js/main.js" defer></script>
  {% if page.url == "/" %}
  <script src="/assets/js/konami.js" defer></script>
  {% endif %}
</body>
</html>
```

### Homepage Layout (index.njk)
```njk
---
layout: layouts/base.njk
title: Home
---

<section class="hero">
  <div class="hero-content">
    <h1 class="glitch" data-text="{{ site.title }}">
      {{ site.title }}
    </h1>
    <p class="neon-text">{{ site.description }}</p>
  </div>
  
  <!-- Animated background using CSS gradients -->
  <div class="animated-bg" aria-hidden="true"></div>
</section>

<section class="recent-posts">
  <h2 class="section-title">
    <span class="bracket">[</span>
    Recent Posts
    <span class="bracket">]</span>
  </h2>
  
  <div class="posts-grid">
    {% for post in collections.posts | reverse | limit(6) %}
      {% include "components/post-card.njk" %}
    {% endfor %}
  </div>
</section>

<!-- Stats counter (client-side rendered) -->
<div id="stats-widget" class="terminal-widget"></div>
```

### Post Card Component (post-card.njk)
```njk
<article class="post-card holo-card" data-post-id="{{ post.fileSlug }}">
  <a href="{{ post.url }}" class="card-link">
    {% if post.data.featured_image %}
    <div class="card-image-wrapper">
      <img 
        src="{{ post.data.featured_image }}" 
        alt="{{ post.data.title }}"
        loading="lazy"
        class="glitch-image"
      >
    </div>
    {% endif %}
    
    <div class="card-content">
      <div class="card-meta">
        <time datetime="{{ post.date | htmlDateString }}" class="digital-date">
          {{ post.date | readableDate }}
        </time>
        <span class="card-category" style="--category-color: {{ post.data.color_scheme | default: 'var(--neon-purple)' }}">
          {{ post.data.category }}
        </span>
      </div>
      
      <h3 class="card-title">{{ post.data.title }}</h3>
      
      <p class="card-excerpt">{{ post.data.excerpt }}</p>
      
      <div class="card-tags">
        {% for tag in post.data.tags %}
        <span class="tag-pill">{{ tag }}</span>
        {% endfor %}
      </div>
    </div>
  </a>
</article>
```

---

## Interactive Elements - Client-Side JS

### Custom Cursor Trail (cursor.js)
```javascript
class CursorTrail {
  constructor() {
    this.trail = [];
    this.maxTrail = 20;
    this.container = document.getElementById('cursor-trail');
    this.isTouch = 'ontouchstart' in window;
    
    if (!this.isTouch) {
      this.init();
    }
  }
  
  init() {
    // Create trail particles
    for (let i = 0; i < this.maxTrail; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-dot';
      dot.style.opacity = (1 - i / this.maxTrail) * 0.5;
      this.container.appendChild(dot);
      this.trail.push(dot);
    }
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      this.updateTrail(e.clientX, e.clientY);
    });
  }
  
  updateTrail(x, y) {
    // Move each dot to previous dot's position
    for (let i = this.trail.length - 1; i > 0; i--) {
      const prevDot = this.trail[i - 1];
      this.trail[i].style.left = prevDot.style.left;
      this.trail[i].style.top = prevDot.style.top;
    }
    
    // Update first dot to cursor position
    this.trail[0].style.left = x + 'px';
    this.trail[0].style.top = y + 'px';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new CursorTrail();
});
```

**CSS for Cursor:**
```css
#cursor-trail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.cursor-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--cyber-blue) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: left 0.1s, top 0.1s;
}

/* Hide on touch devices */
@media (hover: none) {
  #cursor-trail { display: none; }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .cursor-dot { display: none; }
}
```

### Glitch Effects on Scroll (glitch.js)
```javascript
class ScrollGlitch {
  constructor() {
    this.elements = document.querySelectorAll('[data-glitch]');
    this.observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };
    
    this.init();
  }
  
  init() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.triggerGlitch(entry.target);
          }
        });
      }, this.observerOptions);
      
      this.elements.forEach(el => observer.observe(el));
    }
  }
  
  triggerGlitch(element) {
    // Add glitch class for 1 second
    element.classList.add('glitch-active');
    
    setTimeout(() => {
      element.classList.remove('glitch-active');
    }, 1000);
    
    // Only glitch once per element
    element.removeAttribute('data-glitch');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ScrollGlitch();
});
```

### Stats Counter (stats.js)
```javascript
class StatsWidget {
  constructor() {
    this.container = document.getElementById('stats-widget');
    if (!this.container) return;
    
    this.stats = this.getStatsFromLocalStorage();
    this.render();
    this.incrementPageViews();
  }
  
  getStatsFromLocalStorage() {
    const stored = localStorage.getItem('site-stats');
    if (stored) {
      return JSON.parse(stored);
    }
    
    return {
      pageViews: 0,
      visits: 0,
      lastVisit: null
    };
  }
  
  incrementPageViews() {
    this.stats.pageViews++;
    
    // Check if new session (30 min gap)
    const now = Date.now();
    const thirtyMinutes = 30 * 60 * 1000;
    
    if (!this.stats.lastVisit || (now - this.stats.lastVisit) > thirtyMinutes) {
      this.stats.visits++;
    }
    
    this.stats.lastVisit = now;
    localStorage.setItem('site-stats', JSON.stringify(this.stats));
    this.render();
  }
  
  render() {
    this.container.innerHTML = `
      <div class="terminal-stats">
        <div class="stat-line">
          <span class="stat-label">PAGE_VIEWS:</span>
          <span class="stat-value digital-counter">${this.formatNumber(this.stats.pageViews)}</span>
        </div>
        <div class="stat-line">
          <span class="stat-label">VISITS:</span>
          <span class="stat-value digital-counter">${this.formatNumber(this.stats.visits)}</span>
        </div>
      </div>
    `;
  }
  
  formatNumber(num) {
    return num.toString().padStart(6, '0');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new StatsWidget();
});
```

### Konami Code Easter Egg (konami.js)
```javascript
class KonamiCode {
  constructor(callback) {
    this.sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                     'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                     'b', 'a'];
    this.current = 0;
    this.callback = callback;
    
    this.init();
  }
  
  init() {
    document.addEventListener('keydown', (e) => {
      const key = e.key;
      
      if (key === this.sequence[this.current]) {
        this.current++;
        
        if (this.current === this.sequence.length) {
          this.callback();
          this.current = 0;
        }
      } else {
        this.current = 0;
      }
    });
  }
}

// Activate extra glitch mode
document.addEventListener('DOMContentLoaded', () => {
  new KonamiCode(() => {
    document.body.classList.add('ultra-glitch-mode');
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'konami-notification';
    notification.innerHTML = `
      <div class="glitch" data-text="ULTRA GLITCH MODE ACTIVATED">
        ULTRA GLITCH MODE ACTIVATED
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  });
});
```

### Image Lazy Loading with Glitch Effect (images.js)
```javascript
class LazyImageLoader {
  constructor() {
    this.images = document.querySelectorAll('img[loading="lazy"]');
    this.init();
  }
  
  init() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '50px'
      });
      
      this.images.forEach(img => observer.observe(img));
    }
  }
  
  loadImage(img) {
    // Add pixelation effect while loading
    img.style.filter = 'pixelate(10) blur(10px)';
    
    img.addEventListener('load', () => {
      // Fade in with glitch
      img.classList.add('loaded');
      
      // Remove pixelation gradually
      let pixelValue = 10;
      const interval = setInterval(() => {
        pixelValue--;
        img.style.filter = `pixelate(${pixelValue}) blur(${pixelValue}px)`;
        
        if (pixelValue <= 0) {
          clearInterval(interval);
          img.style.filter = 'none';
        }
      }, 50);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new LazyImageLoader();
});
```

---

## 11ty Configuration (.eleventy.js)

```javascript
const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  
  // Add syntax highlighting
  eleventyConfig.addPlugin(syntaxHighlight);
  
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Watch for CSS changes
  eleventyConfig.addWatchTarget("src/assets/css/");
  
  // Custom date filters
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });
  
  eleventyConfig.addFilter("htmlDateString", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });
  
  // Custom excerpt filter
  eleventyConfig.addFilter("excerpt", (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, "");
    return content.substr(0, 200) + "...";
  });
  
  // Image shortcode with optimization
  eleventyConfig.addNunjucksAsyncShortcode("image", async function(src, alt, sizes = "100vw") {
    let metadata = await Image(src, {
      widths: [300, 600, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "./_site/assets/images/optimized/",
      urlPath: "/assets/images/optimized/"
    });
    
    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
      class: "glitch-image"
    };
    
    return Image.generateHTML(metadata, imageAttributes);
  });
  
  // Collections
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });
  
  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });
    return [...tagSet].sort();
  });
  
  // Markdown configuration
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  });
  eleventyConfig.setLibrary("md", markdownLibrary);
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
```

---

## Post Front Matter Schema

```yaml
---
title: "Building a Cyberpunk Portfolio"
date: 2025-10-11
tags: 
  - cyberpunk
  - web-dev
  - aesthetics
category: "design"
featured_image: "/assets/images/cyberpunk-portfolio.jpg"
excerpt: "Learn how to create a stunning cyberpunk-themed portfolio using modern CSS and vanilla JavaScript"
glitch_intensity: "medium"
color_scheme: "#FF10F0"
layout: "layouts/post.njk"
---

Your markdown content here...
```

### Dynamic Color Scheme Implementation

In your post layout, inject custom properties:

```njk
<article class="post-content" style="--post-color: {{ color_scheme }};">
  <!-- Post content -->
</article>
```

CSS usage:
```css
.post-content h2 {
  color: var(--post-color, var(--neon-purple));
  text-shadow: 0 0 10px var(--post-color, var(--neon-purple));
}
```

---

## Performance Optimizations

### Critical CSS Extraction

Create a Node script to extract critical CSS:

```javascript
// scripts/critical-css.js
const critical = require('critical');

critical.generate({
  inline: true,
  base: '_site/',
  src: 'index.html',
  target: {
    html: 'index.html',
    css: 'assets/css/critical.css'
  },
  width: 1300,
  height: 900
});
```

Add to package.json:
```json
{
  "scripts": {
    "build": "eleventy",
    "critical": "node scripts/critical-css.js",
    "build:prod": "npm run build && npm run critical"
  }
}
```

### Lazy Loading Implementation

All images use native lazy loading:
```html
<img src="image.jpg" loading="lazy" alt="description">
```

For JavaScript, use dynamic imports:
```javascript
// Only load heavy animation library when needed
document.querySelector('.animate-trigger').addEventListener('click', async () => {
  const { AnimationController } = await import('./animations.js');
  new AnimationController();
});
```

### Service Worker for Offline Support

Create `sw.js` in your root:
```javascript
const CACHE_NAME = 'y2k-blog-v1';
const STATIC_ASSETS = [
  '/',
  '/assets/css/styles.css',
  '/assets/js/main.js',
  '/assets/fonts/SpaceMono-Regular.woff2'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
  );
});

// Fetch event - cache first strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});
```

Register in your main.js:
```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW registered'))
    .catch(err => console.log('SW error:', err));
}
```

---

## Responsive Design Implementation

### Breakpoint System
```css
/* Mobile-first approach */
:root {
  --container-width: 100%;
  --grid-columns: 1;
  --animation-scale: 0.5;
}

/* Tablet */
@media (min-width: 640px) {
  :root {
    --container-width: 90%;
    --grid-columns: 2;
    --animation-scale: 0.75;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  :root {
    --container-width: 1200px;
    --grid-columns: 3;
    --animation-scale: 1;
  }
}

/* Large Desktop */
@media (min-width: 1440px) {
  :root {
    --container-width: 1400px;
  }
}

/* Apply to components */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: 2rem;
}

.glitch-effect {
  animation-duration: calc(1s / var(--animation-scale));
}
```

### Touch Optimization
```css
/* Larger tap targets on mobile */
@media (hover: none) {
  button,
  a {
    min-height: 44px;
    min-width: 44px;
    padding: 12px 24px;
  }
  
  /* Disable hover effects */
  .holo-card:hover {
    transform: none;
  }
  
  /* Replace hover with active state */
  .holo-card:active {
    transform: scale(0.98);
  }
}
```

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* Disable specific effects */
  .glitch,
  .scanlines::before,
  .cursor-trail {
    display: none;
  }
  
  /* Keep essential hover feedback */
  a:hover,
  button:hover {
    text-decoration: underline;
  }
}
```

---

## Component Library - Detailed Implementations

### 1. Neon Button Component

**Nunjucks Component (neon-button.njk):**
```njk
{# Usage: {% include "components/neon-button.njk", 
   text: "Click Me", 
   href: "/page", 
   variant: "primary" %} #}

{% set buttonTag = "a" if href else "button" %}
{% set buttonVariant = variant | default("primary") %}

<{{ buttonTag }} 
  {% if href %}href="{{ href }}"{% endif %}
  class="neon-button neon-button--{{ buttonVariant }}"
  {% if type %}type="{{ type }}"{% endif %}
>
  <span class="button-text">{{ text }}</span>
  <span class="button-glow" aria-hidden="true"></span>
</{{ buttonTag }}>
```

**CSS:**
```css
.neon-button {
  position: relative;
  display: inline-block;
  padding: 12px 30px;
  font-family: var(--font-future);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-decoration: none;
  color: var(--cyber-blue);
  background: transparent;
  border: 2px solid var(--cyber-blue);
  border-radius: 0;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
}

.neon-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 240, 255, 0.3),
    transparent
  );
  transition: left 0.5s ease;
}

.neon-button:hover::before {
  left: 100%;
}

.neon-button:hover {
  box-shadow: 
    0 0 10px var(--cyber-blue),
    0 0 20px var(--cyber-blue),
    0 0 40px var(--cyber-blue),
    inset 0 0 20px rgba(0, 240, 255, 0.2);
  text-shadow: 0 0 10px var(--cyber-blue);
}

/* Variants */
.neon-button--primary {
  border-color: var(--cyber-blue);
  color: var(--cyber-blue);
}

.neon-button--secondary {
  border-color: var(--hot-pink);
  color: var(--hot-pink);
}

.neon-button--success {
  border-color: var(--acid-green);
  color: var(--acid-green);
}

.neon-button:active {
  transform: scale(0.95);
}
```

### 2. Terminal Block Component

**Nunjucks Component (terminal-block.njk):**
```njk
{# Usage: {% include "components/terminal-block.njk", 
   content: "console.log('hello')", 
   language: "javascript" %} #}

<div class="terminal-block">
  <div class="terminal-header">
    <div class="terminal-buttons">
      <span class="terminal-button terminal-button--close"></span>
      <span class="terminal-button terminal-button--minimize"></span>
      <span class="terminal-button terminal-button--maximize"></span>
    </div>
    <div class="terminal-title">{{ title | default("terminal") }}</div>
  </div>
  <div class="terminal-body">
    <div class="terminal-prompt">
      <span class="prompt-user">user@y2k</span>
      <span class="prompt-separator">:</span>
      <span class="prompt-path">~</span>
      <span class="prompt-symbol">$</span>
    </div>
    <pre class="terminal-content"><code class="language-{{ language | default('bash') }}">{{ content | safe }}</code></pre>
  </div>
</div>
```

**CSS:**
```css
.terminal-block {
  background: #0a0a0a;
  border: 2px solid var(--neon-purple);
  border-radius: 8px;
  box-shadow: 
    0 0 20px rgba(157, 0, 255, 0.3),
    inset 0 0 30px rgba(157, 0, 255, 0.1);
  margin: 2rem 0;
  overflow: hidden;
}

.terminal-header {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background: linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%);
  border-bottom: 1px solid var(--neon-purple);
}

.terminal-buttons {
  display: flex;
  gap: 8px;
}

.terminal-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.terminal-button--close {
  background: #ff5f57;
  box-shadow: 0 0 5px #ff5f57;
}

.terminal-button--minimize {
  background: #ffbd2e;
  box-shadow: 0 0 5px #ffbd2e;
}

.terminal-button--maximize {
  background: #28ca42;
  box-shadow: 0 0 5px #28ca42;
}

.terminal-title {
  flex: 1;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: lowercase;
}

.terminal-body {
  padding: 20px;
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.6;
}

.terminal-prompt {
  color: var(--acid-green);
  margin-bottom: 10px;
}

.prompt-user {
  color: var(--cyber-blue);
}

.prompt-path {
  color: var(--hot-pink);
}

.prompt-symbol {
  color: var(--acid-green);
  margin-left: 5px;
}

.terminal-content {
  margin: 0;
  color: #00ff00;
  text-shadow: 0 0 5px #00ff00;
}

.terminal-content code {
  font-family: var(--font-mono);
}
```

### 3. Tag Cloud Component

**Nunjucks Component (tag-cloud.njk):**
```njk
<div class="tag-cloud">
  <h3 class="tag-cloud-title">
    <span class="bracket">[</span>
    Tags
    <span class="bracket">]</span>
  </h3>
  <div class="tag-cloud-container">
    {% for tag in collections.tagList %}
      {% set tagUrl = "/tags/" + tag + "/" %}
      {% set postCount = collections[tag].length %}
      <a href="{{ tagUrl }}" class="tag-cloud-item" data-count="{{ postCount }}">
        <span class="tag-name">{{ tag }}</span>
        <span class="tag-count">({{ postCount }})</span>
      </a>
    {% endfor %}
  </div>
</div>
```

**CSS with Dynamic Sizing:**
```css
.tag-cloud {
  padding: 2rem;
  background: rgba(10, 10, 10, 0.8);
  border: 1px solid var(--neon-purple);
  border-radius: 4px;
}

.tag-cloud-title {
  font-family: var(--font-pixel);
  font-size: 16px;
  color: var(--cyber-blue);
  text-align: center;
  margin-bottom: 1.5rem;
}

.tag-cloud-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.tag-cloud-item {
  display: inline-block;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid var(--hot-pink);
  border-radius: 20px;
  color: var(--hot-pink);
  text-decoration: none;
  font-family: var(--font-body);
  font-size: 12px;
  transition: all 0.3s ease;
  position: relative;
}

/* Dynamic sizing based on post count */
.tag-cloud-item[data-count="1"],
.tag-cloud-item[data-count="2"] {
  font-size: 12px;
}

.tag-cloud-item[data-count="3"],
.tag-cloud-item[data-count="4"],
.tag-cloud-item[data-count="5"] {
  font-size: 14px;
}

.tag-cloud-item[data-count^="6"],
.tag-cloud-item[data-count^="7"],
.tag-cloud-item[data-count^="8"],
.tag-cloud-item[data-count^="9"] {
  font-size: 16px;
}

.tag-cloud-item:hover {
  background: var(--hot-pink);
  color: var(--deep-black);
  box-shadow: 0 0 15px var(--hot-pink);
  transform: translateY(-2px);
}

.tag-count {
  opacity: 0.7;
  font-size: 0.9em;
  margin-left: 4px;
}
```

### 4. Loading Spinner Component

**HTML:**
```html
<div class="y2k-loader" id="page-loader">
  <div class="loader-inner">
    <div class="loader-disc"></div>
    <div class="loader-text">LOADING</div>
    <div class="loader-bar">
      <div class="loader-bar-fill"></div>
    </div>
  </div>
</div>
```

**CSS:**
```css
.y2k-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--deep-black);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  transition: opacity 0.5s ease;
}

.y2k-loader.loaded {
  opacity: 0;
  pointer-events: none;
}

.loader-inner {
  text-align: center;
}

.loader-disc {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: var(--cyber-blue);
  border-right-color: var(--hot-pink);
  border-bottom-color: var(--neon-purple);
  animation: spin 1s linear infinite;
  box-shadow: 
    0 0 20px var(--cyber-blue),
    0 0 40px var(--hot-pink);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loader-text {
  font-family: var(--font-pixel);
  font-size: 14px;
  color: var(--cyber-blue);
  letter-spacing: 4px;
  margin-bottom: 20px;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loader-bar {
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin: 0 auto;
}

.loader-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--cyber-blue), var(--hot-pink));
  animation: loading 2s ease-in-out infinite;
}

@keyframes loading {
  0% { width: 0%; }
  50% { width: 80%; }
  100% { width: 100%; }
}
```

**JavaScript:**
```javascript
// Hide loader when page is ready
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  setTimeout(() => {
    loader.classList.add('loaded');
  }, 500);
});
```

---

## Search Implementation (Client-Side Only)

### Search Index Generation in 11ty

Add to `.eleventy.js`:
```javascript
eleventyConfig.addCollection("searchIndex", function(collection) {
  return collection.getAll().map(item => ({
    title: item.data.title,
    excerpt: item.data.excerpt || "",
    url: item.url,
    tags: item.data.tags || [],
    date: item.date
  }));
});
```

Create `search-index.njk`:
```njk
---
permalink: /search-index.json
---
{{ collections.searchIndex | dump | safe }}
```

### Search Component (search.njk)

```njk
<div class="search-container">
  <div class="search-input-wrapper">
    <input 
      type="search" 
      id="search-input" 
      class="search-input"
      placeholder="SEARCH_POSTS..."
      autocomplete="off"
    >
    <span class="search-icon">🔍</span>
  </div>
  <div id="search-results" class="search-results hidden"></div>
</div>
```

### Search JavaScript (search.js)

```javascript
class BlogSearch {
  constructor() {
    this.input = document.getElementById('search-input');
    this.resultsContainer = document.getElementById('search-results');
    this.searchIndex = [];
    this.debounceTimer = null;
    
    this.init();
  }
  
  async init() {
    // Fetch search index
    try {
      const response = await fetch('/search-index.json');
      this.searchIndex = await response.json();
      this.setupEventListeners();
    } catch (error) {
      console.error('Failed to load search index:', error);
    }
  }
  
  setupEventListeners() {
    this.input.addEventListener('input', (e) => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.performSearch(e.target.value);
      }, 300);
    });
    
    // Close results when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        this.resultsContainer.classList.add('hidden');
      }
    });
  }
  
  performSearch(query) {
    if (query.length < 2) {
      this.resultsContainer.classList.add('hidden');
      return;
    }
    
    const results = this.searchIndex.filter(item => {
      const searchText = `${item.title} ${item.excerpt} ${item.tags.join(' ')}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    });
    
    this.displayResults(results, query);
  }
  
  displayResults(results, query) {
    if (results.length === 0) {
      this.resultsContainer.innerHTML = `
        <div class="search-no-results">
          <p>NO_RESULTS_FOUND</p>
        </div>
      `;
      this.resultsContainer.classList.remove('hidden');
      return;
    }
    
    const html = results.slice(0, 5).map(result => `
      <a href="${result.url}" class="search-result-item">
        <h4 class="search-result-title">${this.highlightMatch(result.title, query)}</h4>
        <p class="search-result-excerpt">${this.highlightMatch(result.excerpt, query)}</p>
        ${result.tags.length > 0 ? `
          <div class="search-result-tags">
            ${result.tags.slice(0, 3).map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
          </div>
        ` : ''}
      </a>
    `).join('');
    
    this.resultsContainer.innerHTML = html;
    this.resultsContainer.classList.remove('hidden');
  }
  
  highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new BlogSearch();
});
```

**Search CSS:**
```css
.search-container {
  position: relative;
  max-width: 600px;
  margin: 2rem auto;
}

.search-input-wrapper {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 15px 50px 15px 20px;
  background: rgba(10, 10, 10, 0.8);
  border: 2px solid var(--cyber-blue);
  border-radius: 4px;
  color: var(--cyber-blue);
  font-family: var(--font-mono);
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: var(--hot-pink);
  box-shadow: 0 0 20px rgba(255, 16, 240, 0.3);
}

.search-input::placeholder {
  color: rgba(0, 240, 255, 0.5);
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.search-results {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  width: 100%;
  max-height: 500px;
  overflow-y: auto;
  background: rgba(10, 10, 10, 0.95);
  border: 2px solid var(--neon-purple);
  border-radius: 4px;
  box-shadow: 0 10px 40px rgba(157, 0, 255, 0.3);
  z-index: 100;
}

.search-results.hidden {
  display: none;
}

.search-result-item {
  display: block;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(157, 0, 255, 0.2);
  text-decoration: none;
  transition: background 0.2s ease;
}

.search-result-item:hover {
  background: rgba(157, 0, 255, 0.1);
}

.search-result-title {
  font-family: var(--font-future);
  font-size: 16px;
  color: var(--cyber-blue);
  margin: 0 0 8px 0;
}

.search-result-excerpt {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.search-highlight {
  background: var(--hot-pink);
  color: var(--deep-black);
  padding: 2px 4px;
  border-radius: 2px;
}

.search-result-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.search-no-results {
  padding: 30px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-family: var(--font-mono);
}
```

---

## Comment System Integration

Since this is a static site, we'll use Utterances (GitHub Issues-based commenting):

### Setup in Post Layout

Add to `post.njk`:
```njk
<section class="comments-section">
  <h2 class="comments-title">
    <span class="bracket">[</span>
    Comments
    <span class="bracket">]</span>
  </h2>
  
  <div class="comments-container">
    <script src="https://utteranc.es/client.js"
      repo="your-username/your-repo"
      issue-term="pathname"
      theme="photon-dark"
      crossorigin="anonymous"
      async>
    </script>
  </div>
</section>
```

### Custom Styling for Utterances

```css
.comments-section {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 2px solid var(--neon-purple);
}

.comments-title {
  font-family: var(--font-pixel);
  font-size: 20px;
  color: var(--cyber-blue);
  text-align: center;
  margin-bottom: 2rem;
}

.comments-container {
  background: rgba(10, 10, 10, 0.5);
  padding: 2rem;
  border: 1px solid var(--neon-purple);
  border-radius: 8px;
}

/* Override Utterances theme */
.comments-container .utterances {
  max-width: 100%;
}

.comments-container .utterances-frame {
  border: none !important;
  filter: hue-rotate(280deg) saturate(1.5);
}
```

---

## RSS Feed Implementation

Create `feed.njk`:
```njk
---
permalink: /feed.xml
eleventyExcludeFromCollections: true
---
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>{{ site.title }}</title>
  <subtitle>{{ site.description }}</subtitle>
  <link href="{{ site.url }}/feed.xml" rel="self"/>
  <link href="{{ site.url }}/"/>
  <updated>{{ collections.posts | getNewestCollectionItemDate | dateToRfc3339 }}</updated>
  <id>{{ site.url }}/</id>
  <author>
    <name>{{ site.author }}</name>
  </author>
  {%- for post in collections.posts | reverse %}
  <entry>
    <title>{{ post.data.title }}</title>
    <link href="{{ site.url }}{{ post.url }}"/>
    <updated>{{ post.date | dateToRfc3339 }}</updated>
    <id>{{ site.url }}{{ post.url }}</id>
    <content type="html"><![CDATA[
      {{ post.templateContent | safe }}
    ]]></content>
  </entry>
  {%- endfor %}
</feed>
```

Add filter to `.eleventy.js`:
```javascript
eleventyConfig.addFilter("dateToRfc3339", date => {
  return new Date(date).toISOString();
});

eleventyConfig.addFilter("getNewestCollectionItemDate", collection => {
  return collection[collection.length - 1].date;
});
```

---

## Deployment & Build Process

### Package.json Scripts

```json
{
  "name": "y2k-blog",
  "version": "1.0.0",
  "scripts": {
    "clean": "rm -rf _site",
    "dev": "eleventy --serve",
    "build": "eleventy",
    "debug": "DEBUG=Eleventy* eleventy",
    "postbuild": "node scripts/generate-sitemap.js"
  },
  "devDependencies": {
    "@11ty/eleventy": "^2.0.1",
    "@11ty/eleventy-img": "^3.1.0",
    "@11ty/eleventy-plugin-syntaxhighlight": "^5.0.0",
    "luxon": "^3.4.3",
    "markdown-it": "^13.0.2"
  }
}
```

### Sitemap Generation

Create `scripts/generate-sitemap.js`:
```javascript
const fs = require('fs');
const path = require('path');

const siteUrl = 'https://yourdomain.com';
const outputDir = '_site';

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (path.extname(file) === '.html') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function generateSitemap() {
  const htmlFiles = getAllHtmlFiles(outputDir);
  
  const urls = htmlFiles.map(file => {
    const relativePath = file.replace(outputDir, '').replace('/index.html', '/');
    const url = `${siteUrl}${relativePath}`;
    const stats = fs.statSync(file);
    const lastmod = stats.mtime.toISOString();
    
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
  });
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
  
  fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated!');
}

generateSitemap();
```

### Netlify Deployment

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "_site"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer-when-downgrade"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/feed"
  to = "/feed.xml"
  status = 301
```

---

## Performance Budget

Set performance targets:

```javascript
// Add to package.json
{
  "lighthouse": {
    "performance": 90,
    "accessibility": 100,
    "best-practices": 90,
    "seo": 100
  }
}
```

### Image Optimization Strategy

1. Use WebP with JPEG fallback
2. Lazy load all images below fold
3. Use proper sizing attributes
4. Implement blur-up placeholder effect

```njk
{% image "src/assets/images/post.jpg", "Post title", "(min-width: 1024px) 800px, 100vw" %}
```

---

## Final Notes on Static Limitations

**What Works:**
- All CSS animations and effects
- Client-side search using pre-built JSON index
- LocalStorage for stats/preferences
- Service Worker for offline support
- All visual effects without server

**What Doesn't Work:**
- Server-side rendering of dynamic content
- Real-time updates without rebuild
- Server-side analytics
- Form submissions (use services like Netlify Forms)
- Database-driven features

**Workarounds:**
- Use third-party APIs via fetch for dynamic data
- Rebuild site regularly with GitHub Actions for "fresh" content
- Use services like Fathom/Plausible for analytics
- Utterances for comments via GitHub Issues

This specification provides a complete, production-ready Y2K aesthetic blog using only static site generation and client-side JavaScript.