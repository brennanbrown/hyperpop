# HYPERPOP Scripts

Helper scripts for managing your HYPERPOP blog.

## 📸 Image Management Scripts

These scripts help you find and integrate Y2K aesthetic images into your blog.

### 1. `hyperpop-image-scraper.py`

Downloads Y2K aesthetic images from multiple sources (Unsplash, Pexels, Pixabay).

**Usage:**
```bash
python3 scripts/hyperpop-image-scraper.py
```

**Features:**
- 🎨 Searches for vaporwave, cyberpunk, glitch art, etc.
- 🌈 Filters by your color palette (purple, pink, cyan)
- 📝 Saves photographer credits automatically
- 🖼️ Creates an HTML gallery to preview images
- ⚡ Works with or without API keys

**API Keys (Required for Pexels/Pixabay):**

1. **Copy `.env.example` to `.env`:**
   ```bash
   cp .env.example .env
   ```

2. **Get free API keys:**
   - Pexels: https://www.pexels.com/api/
   - Pixabay: https://pixabay.com/api/docs/
   - Unsplash: https://unsplash.com/developers (optional)

3. **Add your keys to `.env`:**
   ```
   PEXELS_API_KEY=your_key_here
   PIXABAY_API_KEY=your_key_here
   ```

**Important:** Never commit your `.env` file to git! It's already in `.gitignore`.

### 2. `integrate-images.sh`

Runs the scraper and copies images to your site.

**Usage:**
```bash
./scripts/integrate-images.sh
```

This will:
1. Run the image scraper
2. Copy images to `src/assets/images/`
3. Copy credits to `src/assets/images/image-credits.txt`

### 3. `update-post-images.py`

Updates blog posts to use locally downloaded images.

**Usage:**
```bash
python3 scripts/update-post-images.py
```

This will:
1. Find all images in `src/assets/images/`
2. Randomly assign images to blog posts
3. Update the `featured_image` field in each post

### 4. `generate-sitemap.js`

Automatically generates sitemap after build (runs via `npm run build`).

## 🚀 Quick Workflow

### Get Images for Your Site

```bash
# Step 1: Download images
python3 scripts/hyperpop-image-scraper.py

# Step 2: Copy to site and update posts
./scripts/integrate-images.sh
python3 scripts/update-post-images.py

# Step 3: Preview
npm run dev
```

### View Downloaded Images Before Using

```bash
# After running the scraper, open the gallery:
open y2k_moodboard/gallery.html
```

## 📁 Directory Structure

```
scripts/
├── hyperpop-image-scraper.py   # Image scraper
├── update-post-images.py       # Post updater
├── integrate-images.sh         # Integration script
├── generate-sitemap.js         # Sitemap generator
└── README.md                   # This file

y2k_moodboard/                  # Downloaded images (gitignored)
├── *.jpg                       # Images
├── credits.txt                 # Photographer credits
└── gallery.html               # Preview gallery

src/assets/images/              # Site images
├── *.jpg                       # Integrated images
└── image-credits.txt          # Credits
```

## 🎨 Customizing the Scraper

Edit search terms in `hyperpop-image-scraper.py`:

```python
self.search_terms = [
    "vaporwave",
    "cyberpunk neon",
    "your custom search",
    # Add more...
]
```

## 📝 Image Credits

Always give credit! The scraper automatically:
- Saves photographer names
- Records source URLs
- Creates a credits.txt file

Include credits in your site's footer or about page.

## 🔒 API Keys

The scraper works without API keys but has rate limits. Get free keys for better results:

1. **Unsplash** (~50 requests/hour without key, 5000/hour with key)
   ```python
   headers = {"Authorization": "Client-ID YOUR_KEY"}
   ```

2. **Pexels** (Already added in code)
   ```python
   api_key = "YOUR_PEXELS_KEY"
   ```

3. **Pixabay** (Already added in code)
   ```python
   api_key = "YOUR_PIXABAY_KEY"
   ```

## 💡 Tips

- **Quality over quantity**: Download 20-30 great images vs 100 mediocre ones
- **Variety**: Mix different search terms for diverse aesthetics
- **Optimize**: Use 11ty's image plugin for automatic optimization
- **Credits**: Always credit photographers (it's in the license!)
- **Backup**: Keep the original `y2k_moodboard` folder

## 🎯 Next Steps

1. Run the scraper to get images
2. Review in the HTML gallery
3. Integrate into your site
4. Update blog posts
5. Build and deploy!

---

**Happy image hunting! 🌈✨**
