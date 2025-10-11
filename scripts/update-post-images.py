#!/usr/bin/env python3
"""
Update blog posts with locally downloaded Y2K aesthetic images
"""

import os
import random
import re
from pathlib import Path

def get_available_images(images_dir="src/assets/images"):
    """Get list of downloaded images"""
    img_dir = Path(images_dir)
    if not img_dir.exists():
        print(f"❌ Images directory not found: {images_dir}")
        return []
    
    images = list(img_dir.glob("*.jpg")) + list(img_dir.glob("*.png"))
    images = [img for img in images if img.stem != 'image-credits']
    return [f"/assets/images/{img.name}" for img in images]

def update_post_featured_image(post_path, new_image_url):
    """Update the featured_image in a blog post's front matter"""
    with open(post_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update featured_image URL
    pattern = r'featured_image:\s*"[^"]*"'
    replacement = f'featured_image: "{new_image_url}"'
    
    updated_content = re.sub(pattern, replacement, content)
    
    with open(post_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print(f"✅ Updated: {post_path.name}")
    print(f"   Image: {new_image_url}")

def main():
    print("🖼️  HYPERPOP Post Image Updater")
    print("=" * 50)
    print()
    
    # Get available images
    images = get_available_images()
    
    if not images:
        print("⚠️  No images found. Run the scraper first:")
        print("   python3 scripts/hyperpop-image-scraper.py")
        return
    
    print(f"📊 Found {len(images)} images")
    print()
    
    # Get all blog posts
    posts_dir = Path("src/posts")
    if not posts_dir.exists():
        print("❌ Posts directory not found: src/posts")
        return
    
    posts = list(posts_dir.glob("*.md"))
    
    if not posts:
        print("⚠️  No posts found in src/posts/")
        return
    
    print(f"📝 Found {len(posts)} blog posts")
    print()
    
    # Update each post with a random image
    used_images = []
    
    for post in posts:
        # Pick a random unused image
        available = [img for img in images if img not in used_images]
        
        if not available:
            # If we've used all images, reset
            used_images = []
            available = images
        
        chosen_image = random.choice(available)
        used_images.append(chosen_image)
        
        update_post_featured_image(post, chosen_image)
    
    print()
    print("=" * 50)
    print("✨ All posts updated with local images!")
    print()
    print("💡 Next steps:")
    print("   1. Run 'npm run dev' to preview")
    print("   2. Commit and deploy when ready")
    print()

if __name__ == "__main__":
    main()
