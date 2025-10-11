#!/bin/bash
# Script to run the image scraper and integrate images into the site

echo "🌈 HYPERPOP Image Integration Script 🌈"
echo "=========================================="
echo ""

# Step 1: Run the scraper
echo "📥 Step 1: Downloading Y2K aesthetic images..."
python3 scripts/hyperpop-image-scraper.py

# Step 2: Copy images to site assets
echo ""
echo "📁 Step 2: Copying images to site assets..."
mkdir -p src/assets/images/hero
mkdir -p src/assets/images/posts

# Copy a selection of images for different purposes
if [ -d "y2k_moodboard" ]; then
    # Copy all images to the main images folder
    cp y2k_moodboard/*.jpg src/assets/images/ 2>/dev/null || true
    
    # Copy credits
    cp y2k_moodboard/credits.txt src/assets/images/image-credits.txt 2>/dev/null || true
    
    echo "✅ Images copied to src/assets/images/"
    echo "✅ Credits saved to src/assets/images/image-credits.txt"
    
    # Count images
    image_count=$(ls -1 src/assets/images/*.jpg 2>/dev/null | wc -l | tr -d ' ')
    echo "📊 Total images: $image_count"
else
    echo "⚠️  No images found. Please run the scraper first."
fi

echo ""
echo "🎨 Done! Images are ready to use in your blog."
echo "   Location: src/assets/images/"
echo ""
echo "💡 Next steps:"
echo "   1. Update blog posts to use local images"
echo "   2. Run 'npm run dev' to see them in action"
echo "   3. Build and deploy!"
