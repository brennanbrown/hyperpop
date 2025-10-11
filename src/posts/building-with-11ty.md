---
title: "Building HYPERPOP with Eleventy: Technical Deep Dive"
date: 2025-10-10
tags: 
  - 11ty
  - tutorial
  - static-sites
  - nunjucks
category: "development"
featured_image: "/assets/images/pixabay_terminal_aesthetic_4885803.jpg"
excerpt: "A technical walkthrough of building an authentic Y2K blog theme with Eleventy, from configuration to deployment."
glitch_intensity: "medium"
color_scheme: "#00F0FF"
layout: "layouts/post.njk"
---

# Building HYPERPOP with Eleventy: Technical Deep Dive

After building HYPERPOP from the ground up, I want to share the technical decisions, challenges, and solutions that made this Y2K blog theme possible. This is the real story of building with Eleventy 2.0.

## Why 11ty?

Eleventy stands out for several reasons:

1. **Zero JavaScript by default** - Only ship what you need
2. **Flexible templating** - Use Nunjucks, Liquid, Markdown, and more
3. **Fast builds** - Even with hundreds of posts
4. **Simple data cascade** - Powerful data management

## Project Structure

```
hyperpop/
├── src/
│   ├── _includes/
│   │   ├── layouts/
│   │   └── components/
│   ├── _data/
│   ├── assets/
│   │   ├── css/
│   │   └── js/
│   └── posts/
└── .eleventy.js
```

## Key Features Implemented

### Custom Collections

We created custom collections for organizing content:

```javascript
eleventyConfig.addCollection("posts", function(collectionApi) {
  return collectionApi.getFilteredByGlob("src/posts/*.md").reverse();
});
```

### Image Optimization

Using `@11ty/eleventy-img` for automatic image optimization:

```javascript
eleventyConfig.addNunjucksAsyncShortcode("image", async function(src, alt) {
  // Generates responsive images in WebP and JPEG
  return Image.generateHTML(metadata, imageAttributes);
});
```

### Custom Filters

Date formatting, excerpts, and more:

```javascript
eleventyConfig.addFilter("readableDate", dateObj => {
  return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
});
```

## The Visual Magic

The Y2K aesthetic comes from carefully crafted CSS:

### Glitch Effect

```css
.glitch::before {
  content: attr(data-text);
  position: absolute;
  text-shadow: -2px 0 #ff00ff;
  animation: glitch-anim 5s infinite;
}
```

### Holographic Borders

```css
.holo-card::before {
  background: conic-gradient(
    from 0deg,
    #ff00ff, #00ffff, #ff00ff
  );
  animation: rotate-gradient 3s linear infinite;
}
```

## Performance Optimization

Despite the visual effects, we maintain excellent performance:

- **Lazy loading** for images and scripts
- **Critical CSS** inlined in `<head>`
- **Service Worker** for offline support
- **Minified assets** in production

## Client-Side Features

We added interactive elements with vanilla JavaScript:

- Custom cursor trail effect
- Search functionality using a generated JSON index
- Stats counter using localStorage
- Konami code easter egg

## Deployment

The site deploys seamlessly to Netlify:

```toml
[build]
  command = "npm run build"
  publish = "_site"
```

## Conclusion

11ty provides the perfect balance of simplicity and power for building modern static sites with stunning aesthetics and top-tier performance.

Ready to build your own? Check out the [11ty documentation](https://www.11ty.dev/) and start creating!
