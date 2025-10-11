// Floating Windows 98-style Image Windows

class FloatingWindowsManager {
  constructor() {
    this.windows = [];
    this.windowCount = 0;
    this.maxWindows = 8;
    this.images = [];
    this.zIndexCounter = 100;
    
    // Random window titles for authenticity
    this.windowTitles = [
      'my_pics.exe',
      'cool_stuff_dont_delete.jpg',
      'downloaded_image.gif',
      'untitled_folder',
      'new_image_(copy).bmp',
      'aesthetic_vibes.jpg',
      'cyberspace.png',
      'glitch_art_final_FINAL.jpg',
      'random_pic_lol.jpg',
      'desktop_wallpaper.bmp',
      'Internet Explorer',
      'Notepad - untitled',
      'My Pictures',
      'coolpic.jpg',
      'image001.jpg',
      'scan0001.tif',
      'photo_album.exe',
      'web_graphics.gif',
      'background.bmp',
      'screensaver.scr'
    ];
    
    this.init();
  }
  
  async init() {
    // Get images from the assets folder
    await this.loadImageList();
    
    // Spawn initial windows
    this.spawnInitialWindows();
    
    // Randomly spawn new windows occasionally
    this.startRandomSpawning();
  }
  
  async loadImageList() {
    // Use your downloaded Y2K aesthetic images!
    this.images = [
      '/assets/images/pexels_chrome_aesthetic_16120131.jpg',
      '/assets/images/pexels_chrome_aesthetic_1779487.jpg',
      '/assets/images/pexels_chrome_aesthetic_31233585.jpg',
      '/assets/images/pexels_digital_art_neon_1779487.jpg',
      '/assets/images/pexels_digital_art_neon_32997.jpg',
      '/assets/images/pexels_digital_art_neon_5011647.jpg',
      '/assets/images/pexels_futuristic_purple_pink_594233.jpg',
      '/assets/images/pexels_futuristic_purple_pink_8107906.jpg',
      '/assets/images/pexels_futuristic_purple_pink_8657665.jpg',
      '/assets/images/pexels_glitch_art_4646243.jpg',
      '/assets/images/pexels_glitch_art_7688559.jpg',
      '/assets/images/pexels_glitch_art_9962246.jpg',
      '/assets/images/pexels_holographic_17483868.jpg',
      '/assets/images/pexels_holographic_17485678.jpg',
      '/assets/images/pexels_holographic_17485680.jpg',
      '/assets/images/pixabay_80s_computer_graphics_3984623.jpg',
      '/assets/images/pixabay_80s_computer_graphics_4313695.jpg',
      '/assets/images/pixabay_80s_computer_graphics_7622095.jpg',
      '/assets/images/pixabay_chrome_aesthetic_3729545.jpg',
      '/assets/images/pixabay_chrome_aesthetic_4493176.jpg',
      '/assets/images/pixabay_chrome_aesthetic_459594.jpg',
      '/assets/images/pixabay_neon_grid_8268513.jpg',
      '/assets/images/pixabay_neon_grid_8268517.jpg',
      '/assets/images/pixabay_neon_grid_8268519.jpg',
      '/assets/images/pixabay_synthwave_aesthetic_1868502.jpg',
      '/assets/images/pixabay_synthwave_aesthetic_3097419.jpg',
      '/assets/images/pixabay_synthwave_aesthetic_7117251.jpg',
      '/assets/images/pixabay_terminal_aesthetic_1363771.jpg',
      '/assets/images/pixabay_terminal_aesthetic_4630186.jpg',
      '/assets/images/pixabay_terminal_aesthetic_4885803.jpg'
    ];
  }
  
  spawnInitialWindows() {
    const initialCount = Math.floor(Math.random() * 3) + 3; // 3-5 windows
    
    for (let i = 0; i < initialCount; i++) {
      setTimeout(() => {
        this.createWindow();
      }, i * 500); // Stagger the spawning
    }
  }
  
  startRandomSpawning() {
    setInterval(() => {
      if (this.windows.length < this.maxWindows && Math.random() > 0.7) {
        this.createWindow();
      }
    }, 5000); // Check every 5 seconds
  }
  
  createWindow() {
    const windowId = `floating-window-${this.windowCount++}`;
    const randomImage = this.images[Math.floor(Math.random() * this.images.length)];
    
    // Random position (avoid edges)
    const x = Math.random() * (window.innerWidth - 350) + 50;
    const y = Math.random() * (window.innerHeight - 300) + 50;
    
    // Random size
    const width = Math.floor(Math.random() * 150) + 250; // 250-400px
    const height = Math.floor(Math.random() * 100) + 200; // 200-300px
    
    // Create window element
    const windowEl = document.createElement('div');
    windowEl.className = 'win98-window';
    windowEl.id = windowId;
    windowEl.style.left = x + 'px';
    windowEl.style.top = y + 'px';
    windowEl.style.width = width + 'px';
    windowEl.style.zIndex = this.zIndexCounter++;
    
    // Random window title
    const randomTitle = this.windowTitles[Math.floor(Math.random() * this.windowTitles.length)];
    
    windowEl.innerHTML = `
      <div class="win98-titlebar">
        <div class="win98-titlebar-text">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Crect fill='%23ff10f0' width='16' height='16'/%3E%3C/svg%3E" alt="" class="win98-icon">
          <span>${randomTitle}</span>
        </div>
        <div class="win98-buttons">
          <button class="win98-btn win98-minimize" data-action="minimize">
            <span class="btn-icon">_</span>
          </button>
          <button class="win98-btn win98-maximize" data-action="maximize">
            <span class="btn-icon">□</span>
          </button>
          <button class="win98-btn win98-close" data-action="close">
            <span class="btn-icon">✕</span>
          </button>
        </div>
      </div>
      <div class="win98-content">
        <img src="${randomImage}" alt="Floating image" class="win98-image" loading="lazy">
      </div>
    `;
    
    document.body.appendChild(windowEl);
    
    // Add to windows array
    const windowObj = {
      id: windowId,
      element: windowEl,
      x: x,
      y: y,
      isDragging: false,
      isMinimized: false
    };
    
    this.windows.push(windowObj);
    
    // Add event listeners
    this.attachWindowEvents(windowObj);
    
    // Start floating animation
    this.startFloating(windowObj);
  }
  
  attachWindowEvents(windowObj) {
    const titlebar = windowObj.element.querySelector('.win98-titlebar');
    const buttons = windowObj.element.querySelectorAll('.win98-btn');
    
    // Dragging
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    
    titlebar.addEventListener('mousedown', (e) => {
      if (e.target.closest('.win98-btn')) return;
      
      windowObj.isDragging = true;
      windowObj.element.style.zIndex = this.zIndexCounter++;
      
      dragOffsetX = e.clientX - windowObj.x;
      dragOffsetY = e.clientY - windowObj.y;
      
      windowObj.element.classList.add('dragging');
    });
    
    document.addEventListener('mousemove', (e) => {
      if (windowObj.isDragging) {
        windowObj.x = e.clientX - dragOffsetX;
        windowObj.y = e.clientY - dragOffsetY;
        
        windowObj.element.style.left = windowObj.x + 'px';
        windowObj.element.style.top = windowObj.y + 'px';
      }
    });
    
    document.addEventListener('mouseup', () => {
      if (windowObj.isDragging) {
        windowObj.isDragging = false;
        windowObj.element.classList.remove('dragging');
      }
    });
    
    // Window buttons
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = btn.dataset.action;
        
        if (action === 'close') {
          this.closeWindow(windowObj);
        } else if (action === 'minimize') {
          this.minimizeWindow(windowObj);
        } else if (action === 'maximize') {
          this.maximizeWindow(windowObj);
        }
      });
    });
  }
  
  startFloating(windowObj) {
    // Gentle floating animation
    const baseX = windowObj.x;
    const baseY = windowObj.y;
    const floatSpeed = Math.random() * 0.5 + 0.3;
    const floatRadius = 30;
    
    let angle = Math.random() * Math.PI * 2;
    
    const animate = () => {
      if (!windowObj.isDragging && !windowObj.isMinimized && windowObj.element.parentNode) {
        angle += floatSpeed * 0.01;
        
        const offsetX = Math.cos(angle) * floatRadius;
        const offsetY = Math.sin(angle) * floatRadius;
        
        windowObj.element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }
  
  closeWindow(windowObj) {
    // Close animation
    windowObj.element.style.animation = 'windowClose 0.3s ease forwards';
    
    setTimeout(() => {
      windowObj.element.remove();
      this.windows = this.windows.filter(w => w.id !== windowObj.id);
    }, 300);
  }
  
  minimizeWindow(windowObj) {
    if (windowObj.isMinimized) {
      windowObj.element.classList.remove('minimized');
      windowObj.isMinimized = false;
    } else {
      windowObj.element.classList.add('minimized');
      windowObj.isMinimized = true;
      
      // Auto-restore after 3 seconds
      setTimeout(() => {
        if (windowObj.isMinimized && windowObj.element.parentNode) {
          windowObj.element.classList.remove('minimized');
          windowObj.isMinimized = false;
        }
      }, 3000);
    }
  }
  
  maximizeWindow(windowObj) {
    const isMaximized = windowObj.element.classList.toggle('maximized');
    
    // Change button appearance when maximized
    const maxBtn = windowObj.element.querySelector('.win98-maximize .btn-icon');
    if (isMaximized) {
      maxBtn.textContent = '❐'; // Different icon when maximized
    } else {
      maxBtn.textContent = '□'; // Original icon
    }
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    new FloatingWindowsManager();
  }
});
