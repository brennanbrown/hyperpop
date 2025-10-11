# HYPERPOP - Quick Start Guide

Welcome to your Y2K vaporwave blog! 🌈

## Get Started in 3 Commands

```bash
# Already done: npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## What You Just Built

✅ **Full-featured 11ty blog** with Y2K vaporwave aesthetics
✅ **3 sample blog posts** showcasing different topics
✅ **Interactive features** - cursor trail, search, stats counter
✅ **Easter egg** - Try the Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) on homepage
✅ **Production-ready** - SEO, RSS feed, sitemap, service worker

## File Structure Overview

```
hyperpop/
├── src/
│   ├── _includes/        # Templates & components
│   ├── _data/            # Site configuration
│   ├── assets/           # CSS & JavaScript
│   ├── posts/            # Your blog posts (Markdown)
│   └── pages/            # Static pages
├── _site/                # Generated site (after build)
└── .eleventy.js          # Eleventy configuration
```

## Quick Customization

### 1. Update Site Info
Edit `src/_data/site.json`:
- Change site title, description, author
- Update social media links

### 2. Change Colors
Edit CSS variables in `src/assets/css/styles.css`:
```css
:root {
  --neon-purple: #9D00FF;
  --hot-pink: #FF10F0;
  --cyber-blue: #00F0FF;
  /* ... */
}
```

### 3. Add New Blog Posts
Create a new `.md` file in `src/posts/`:
```markdown
---
title: "Your Title"
date: 2025-10-11
tags: [tag1, tag2]
category: "category"
featured_image: "https://..."
excerpt: "Brief description"
layout: "layouts/post.njk"
---

Your content here...
```

### 4. Modify Navigation
Edit `src/_data/navigation.json`

## Development

```bash
# Start dev server (with live reload)
npm run dev
# Visit http://localhost:8080

# Build for production
npm run build

# Debug build issues
npm run debug
```

## Deploy to Netlify

1. Push to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Settings are already configured in `netlify.toml`!

Build command: `npm run build`  
Publish directory: `_site`

## Features to Try

- **Search** - Type in the search bar on homepage
- **Cursor Trail** - Move your mouse (desktop only)
- **Konami Code** - Enter the code on homepage
- **Stats Counter** - Tracks page views in localStorage
- **Glitch Effects** - Hover over cards and headings
- **Responsive** - Looks great on mobile

## Next Steps

1. **Customize the design** - Edit colors, fonts, effects
2. **Write your content** - Add posts in `src/posts/`
3. **Add images** - Place in `src/assets/images/`
4. **Deploy** - Push to GitHub and deploy to Netlify

## Need Help?

Check the full `README.md` for detailed documentation!

---

**Built with 💜 using Eleventy**  
*Enjoy your Y2K digital experience!*
