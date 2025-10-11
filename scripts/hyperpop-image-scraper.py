"""
Y2K Aesthetic Image Scraper
Downloads random images matching vaporwave/cybercore/Y2K aesthetic
Uses Unsplash API (free, no authentication required for basic use)
"""

import requests
import os
import time
import random
from pathlib import Path
from datetime import datetime

class Y2KImageScraper:
    def __init__(self, output_dir="moodboard_images"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        
        # Unsplash API endpoint (no key needed for basic search)
        self.unsplash_api = "https://api.unsplash.com/search/photos"
        
        # Your aesthetic keywords based on moodboard
        self.search_terms = [
            "vaporwave",
            "cyberpunk neon",
            "glitch art",
            "retrowave",
            "synthwave aesthetic",
            "holographic",
            "y2k aesthetic",
            "cyber grunge",
            "digital art neon",
            "psychedelic glitch",
            "neon grid",
            "80s computer graphics",
            "pixel art cyber",
            "matrix aesthetic",
            "chrome aesthetic",
            "iridescent holographic",
            "crt screen",
            "terminal aesthetic",
            "arcade neon",
            "futuristic purple pink"
        ]
        
        # Color filters based on your palette
        self.color_filters = [
            "purple",
            "magenta", 
            "cyan",
            "pink"
        ]
    
    def download_from_unsplash(self, num_images=20):
        """
        Download images from Unsplash API
        Note: For production use, get a free API key from unsplash.com/developers
        """
        print(f"🎨 Searching Unsplash for Y2K aesthetic images...")
        
        downloaded = 0
        
        for term in random.sample(self.search_terms, min(5, len(self.search_terms))):
            if downloaded >= num_images:
                break
                
            print(f"\n🔍 Searching for: {term}")
            
            try:
                # Note: Add your Unsplash API key here for better rate limits
                headers = {}
                # headers = {"Authorization": "Client-ID YOUR_ACCESS_KEY"}
                
                params = {
                    "query": term,
                    "per_page": 10,
                    "orientation": "landscape"
                }
                
                # Add color filter randomly
                if random.random() > 0.5:
                    params["color"] = random.choice(self.color_filters)
                
                response = requests.get(
                    self.unsplash_api,
                    params=params,
                    headers=headers,
                    timeout=10
                )
                
                if response.status_code == 200:
                    data = response.json()
                    results = data.get("results", [])
                    
                    for img in results[:3]:  # Get 3 images per search term
                        if downloaded >= num_images:
                            break
                        
                        img_url = img["urls"]["regular"]  # High quality but not huge
                        img_id = img["id"]
                        photographer = img["user"]["name"]
                        
                        # Download image
                        self._download_image(
                            img_url, 
                            f"unsplash_{term.replace(' ', '_')}_{img_id}.jpg",
                            photographer
                        )
                        
                        downloaded += 1
                        time.sleep(1)  # Be nice to the API
                
                elif response.status_code == 403:
                    print("⚠️  Rate limited. Consider adding an Unsplash API key.")
                    print("   Get one free at: https://unsplash.com/developers")
                    break
                    
            except Exception as e:
                print(f"❌ Error searching '{term}': {e}")
                continue
        
        return downloaded
    
    def download_from_pexels(self, num_images=20):
        """
        Download images from Pexels API
        Get free API key at: https://www.pexels.com/api/
        """
        print(f"\n🎨 Searching Pexels for Y2K aesthetic images...")
        
        # Get API key from environment variable
        api_key = os.environ.get("PEXELS_API_KEY", "YOUR_PEXELS_API_KEY")
        
        if api_key == "YOUR_PEXELS_API_KEY":
            print("⚠️  Please add your Pexels API key to use this source")
            print("   Get one free at: https://www.pexels.com/api/")
            print("   Set it as an environment variable: export PEXELS_API_KEY=your_key_here")
            return 0
        
        headers = {"Authorization": api_key}
        downloaded = 0
        
        for term in random.sample(self.search_terms, min(5, len(self.search_terms))):
            if downloaded >= num_images:
                break
            
            print(f"\n🔍 Searching for: {term}")
            
            try:
                response = requests.get(
                    "https://api.pexels.com/v1/search",
                    params={
                        "query": term,
                        "per_page": 10,
                        "orientation": "landscape"
                    },
                    headers=headers,
                    timeout=10
                )
                
                if response.status_code == 200:
                    data = response.json()
                    photos = data.get("photos", [])
                    
                    for photo in photos[:3]:
                        if downloaded >= num_images:
                            break
                        
                        img_url = photo["src"]["large"]
                        img_id = photo["id"]
                        photographer = photo["photographer"]
                        
                        self._download_image(
                            img_url,
                            f"pexels_{term.replace(' ', '_')}_{img_id}.jpg",
                            photographer
                        )
                        
                        downloaded += 1
                        time.sleep(1)
                        
            except Exception as e:
                print(f"❌ Error searching '{term}': {e}")
                continue
        
        return downloaded
    
    def download_from_pixabay(self, num_images=20):
        """
        Download images from Pixabay API
        Get free API key at: https://pixabay.com/api/docs/
        """
        print(f"\n🎨 Searching Pixabay for Y2K aesthetic images...")
        
        # Get API key from environment variable
        api_key = os.environ.get("PIXABAY_API_KEY", "YOUR_PIXABAY_API_KEY")
        
        if api_key == "YOUR_PIXABAY_API_KEY":
            print("⚠️  Please add your Pixabay API key to use this source")
            print("   Get one free at: https://pixabay.com/api/docs/")
            print("   Set it as an environment variable: export PIXABAY_API_KEY=your_key_here")
            return 0
        
        downloaded = 0
        
        for term in random.sample(self.search_terms, min(5, len(self.search_terms))):
            if downloaded >= num_images:
                break
            
            print(f"\n🔍 Searching for: {term}")
            
            try:
                response = requests.get(
                    "https://pixabay.com/api/",
                    params={
                        "key": api_key,
                        "q": term,
                        "image_type": "photo",
                        "per_page": 10,
                        "orientation": "horizontal"
                    },
                    timeout=10
                )
                
                if response.status_code == 200:
                    data = response.json()
                    hits = data.get("hits", [])
                    
                    for hit in hits[:3]:
                        if downloaded >= num_images:
                            break
                        
                        img_url = hit["largeImageURL"]
                        img_id = hit["id"]
                        photographer = hit.get("user", "pixabay")
                        
                        self._download_image(
                            img_url,
                            f"pixabay_{term.replace(' ', '_')}_{img_id}.jpg",
                            photographer
                        )
                        
                        downloaded += 1
                        time.sleep(1)
                        
            except Exception as e:
                print(f"❌ Error searching '{term}': {e}")
                continue
        
        return downloaded
    
    def _download_image(self, url, filename, photographer=None):
        """Download a single image"""
        try:
            response = requests.get(url, timeout=15)
            
            if response.status_code == 200:
                filepath = self.output_dir / filename
                
                with open(filepath, 'wb') as f:
                    f.write(response.content)
                
                credit = f" by {photographer}" if photographer else ""
                print(f"✅ Downloaded: {filename}{credit}")
                
                # Save credits to a text file
                self._save_credit(filename, url, photographer)
                
                return True
            else:
                print(f"❌ Failed to download {filename}: Status {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Error downloading {filename}: {e}")
            return False
    
    def _save_credit(self, filename, url, photographer):
        """Save image credits to a text file"""
        credits_file = self.output_dir / "credits.txt"
        
        with open(credits_file, 'a', encoding='utf-8') as f:
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            f.write(f"\n{filename}\n")
            f.write(f"  Photographer: {photographer}\n")
            f.write(f"  Source URL: {url}\n")
            f.write(f"  Downloaded: {timestamp}\n")
    
    def create_html_gallery(self):
        """Create a simple HTML gallery to view downloaded images"""
        images = list(self.output_dir.glob("*.jpg")) + list(self.output_dir.glob("*.png"))
        
        html = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Y2K Moodboard Gallery</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            background: #0a0a0a;
            color: #00f0ff;
            font-family: 'Courier New', monospace;
            padding: 20px;
        }
        
        h1 {
            text-align: center;
            margin-bottom: 30px;
            text-shadow: 0 0 10px #00f0ff;
            font-size: 2em;
            text-transform: uppercase;
            letter-spacing: 3px;
        }
        
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
        }
        
        .image-card {
            position: relative;
            overflow: hidden;
            border: 2px solid #9d00ff;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(157, 0, 255, 0.3);
            transition: transform 0.3s ease;
        }
        
        .image-card:hover {
            transform: scale(1.05);
            box-shadow: 0 0 30px rgba(157, 0, 255, 0.6);
        }
        
        .image-card img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            display: block;
        }
        
        .image-info {
            padding: 10px;
            background: rgba(10, 10, 10, 0.9);
            font-size: 12px;
        }
        
        .count {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #ff10f0;
        }
    </style>
</head>
<body>
    <h1>🎨 Y2K Aesthetic Moodboard 🎨</h1>
    <div class="gallery">
"""
        
        for img in images:
            html += f"""
        <div class="image-card">
            <img src="{img.name}" alt="{img.stem}" loading="lazy">
            <div class="image-info">{img.stem}</div>
        </div>
"""
        
        html += f"""
    </div>
    <div class="count">
        <p>Total Images: {len(images)}</p>
    </div>
</body>
</html>
"""
        
        gallery_file = self.output_dir / "gallery.html"
        with open(gallery_file, 'w', encoding='utf-8') as f:
            f.write(html)
        
        print(f"\n✨ Gallery created: {gallery_file}")
        print(f"   Open it in your browser to view all images!")


def main():
    print("=" * 60)
    print("🌈 Y2K AESTHETIC IMAGE SCRAPER 🌈")
    print("=" * 60)
    print()
    
    # Initialize scraper
    scraper = Y2KImageScraper(output_dir="y2k_moodboard")
    
    # Choose how many images you want
    num_images = 30
    
    print(f"📥 Downloading {num_images} images...")
    print()
    
    # Try different sources
    # Use Pexels and Pixabay (you have API keys!)
    downloaded = scraper.download_from_pexels(num_images // 2)
    downloaded += scraper.download_from_pixabay(num_images // 2)
    
    # Unsplash works without API key but has rate limits
    # downloaded += scraper.download_from_unsplash(10)
    
    print()
    print("=" * 60)
    print(f"✨ Downloaded {downloaded} images successfully!")
    print(f"📁 Saved to: {scraper.output_dir}")
    print()
    
    # Create HTML gallery
    scraper.create_html_gallery()
    
    print()
    print("💡 TIP: For better results, get free API keys from:")
    print("   • Unsplash: https://unsplash.com/developers")
    print("   • Pexels: https://www.pexels.com/api/")
    print("   • Pixabay: https://pixabay.com/api/docs/")
    print()
    print("🎨 Credits for all images saved to credits.txt")
    print("=" * 60)


if __name__ == "__main__":
    main()