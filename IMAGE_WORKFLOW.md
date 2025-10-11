# 🎨 HYPERPOP Image Workflow Guide

Your custom Y2K aesthetic image scraper is ready to use! Here's how to fill your site with vaporwave goodness.

## 🚀 Quick Start (3 Commands)

```bash
# 1. Download images (30 vaporwave/cyberpunk images)
npm run scrape-images

# 2. Copy images to site assets
npm run integrate-images

# 3. Update blog posts with the images
npm run update-images
```

That's it! Your site now has authentic Y2K aesthetic images.

## 📋 Step-by-Step Guide

### Step 1: Download Images

```bash
npm run scrape-images
```

This runs `scripts/hyperpop-image-scraper.py` which:
- 🔍 Searches Unsplash, Pexels, Pixabay for:
  - vaporwave
  - cyberpunk neon
  - glitch art
  - retrowave
  - holographic
  - y2k aesthetic
  - and 14 more aesthetic terms
- 🌈 Filters by your color palette (purple, pink, cyan)
- 💾 Saves images to `y2k_moodboard/`
- 📝 Records photographer credits in `y2k_moodboard/credits.txt`
- 🖼️ Creates `y2k_moodboard/gallery.html` for preview

**Output:**
```
y2k_moodboard/
├── unsplash_vaporwave_abc123.jpg
├── unsplash_cyberpunk_neon_def456.jpg
├── pexels_glitch_art_789.jpg
├── credits.txt
└── gallery.html
```

### Step 2: Preview Images (Optional)

```bash
# Open the gallery in your browser
open y2k_moodboard/gallery.html
```

The gallery shows all downloaded images with:
- Neon-themed UI matching your site
- Hover effects
- Image filenames
- Total count

Pick and choose which ones you want to keep!

### Step 3: Integrate Images

```bash
npm run integrate-images
```

This copies images from `y2k_moodboard/` to `src/assets/images/` and copies credits.

**Result:**
```
src/assets/images/
├── unsplash_vaporwave_abc123.jpg
├── unsplash_cyberpunk_neon_def456.jpg
├── pexels_glitch_art_789.jpg
└── image-credits.txt
```

### Step 4: Update Blog Posts

```bash
npm run update-images
```

This automatically:
- Finds all `.md` files in `src/posts/`
- Updates the `featured_image` field
- Uses local images instead of external URLs
- Assigns different images to each post

**Before:**
```markdown
featured_image: "https://images.unsplash.com/photo-123..."
```

**After:**
```markdown
featured_image: "/assets/images/unsplash_vaporwave_abc123.jpg"
```

### Step 5: Preview & Build

```bash
# See your images in action
npm run dev

# Build for production
npm run build
```

## 🎯 Advanced Usage

### Custom Search Terms

Edit `scripts/hyperpop-image-scraper.py`:

```python
self.search_terms = [
    "vaporwave",
    "your custom term",
    "another aesthetic",
    # Add your own!
]
```

### Download More Images

```bash
# Edit the script to change num_images
# Default is 30, can increase to 50, 100, etc.
npm run scrape-images
```

### Use Specific Images

Instead of auto-assigning, manually edit post front matter:

```markdown
---
featured_image: "/assets/images/your-favorite-image.jpg"
---
```

### Add API Keys for Better Results

The scraper works without API keys but has rate limits.

**Get free API keys:**
1. **Unsplash**: https://unsplash.com/developers
2. **Pexels**: Already configured! ✅
3. **Pixabay**: Already configured! ✅

**Add Unsplash key:**
Edit `scripts/hyperpop-image-scraper.py` line 72:
```python
headers = {"Authorization": "Client-ID YOUR_ACCESS_KEY"}
```

## 📊 What Gets Downloaded?

### Image Sources
- **Unsplash** - High quality, no API key needed (rate limited)
- **Pexels** - Your key is already in the code
- **Pixabay** - Your key is already in the code

### Image Types
All images are:
- ✅ High resolution (1200px+ wide)
- ✅ Landscape orientation (perfect for blog headers)
- ✅ Color-filtered (purple, pink, cyan, magenta)
- ✅ Free to use with attribution
- ✅ Matching Y2K/vaporwave aesthetic

### Credits
Always included in:
- `y2k_moodboard/credits.txt` (staging)
- `src/assets/images/image-credits.txt` (site)

## 🎨 Workflow Tips

### 1. Curate Before Integrating
```bash
npm run scrape-images
open y2k_moodboard/gallery.html
# Delete images you don't want
npm run integrate-images
```

### 2. Keep Moodboard Separate
The `y2k_moodboard/` directory is gitignored. Keep it as your staging area:
- Download new images anytime
- Review in gallery
- Only copy favorites to site

### 3. Batch Download
```bash
# Download 50 images at once
python3 scripts/hyperpop-image-scraper.py
# (Edit script to set num_images = 50)
```

### 4. Organize by Category
After downloading, you can manually organize:
```bash
mkdir -p src/assets/images/hero
mkdir -p src/assets/images/posts
mkdir -p src/assets/images/backgrounds

# Move images to categories
mv src/assets/images/vaporwave* src/assets/images/hero/
```

## 📝 Credit Your Sources

The scraper saves credits automatically, but you should:

1. **Include in your site**
   Add to `src/pages/credits.md`:
   ```markdown
   ---
   layout: layouts/page.njk
   title: Image Credits
   ---
   
   ## Photography Credits
   
   Images sourced from Unsplash, Pexels, and Pixabay.
   
   [View detailed credits](/assets/images/image-credits.txt)
   ```

2. **Link in footer**
   Already have a footer? Add:
   ```html
   <a href="/credits/">Image Credits</a>
   ```

## 🚨 Troubleshooting

### "No images found"
```bash
# Make sure requests library is installed
pip3 install requests

# Run scraper manually
python3 scripts/hyperpop-image-scraper.py
```

### "Rate limited"
Add API keys or wait an hour and try again.

### "Images not showing in posts"
```bash
# Re-run the update script
npm run update-images

# Check that images exist
ls -la src/assets/images/
```

### "Gallery won't open"
```bash
# Check the path
ls y2k_moodboard/gallery.html

# Open directly
open y2k_moodboard/gallery.html
```

## 🎉 You're All Set!

Your HYPERPOP blog now has:
- ✅ Custom image scraper
- ✅ Automated workflow
- ✅ Y2K aesthetic images
- ✅ Proper credits
- ✅ Preview gallery
- ✅ npm scripts for easy use

**Happy image hunting! 🌈✨**

---

Need more help? Check `scripts/README.md` for detailed documentation.
