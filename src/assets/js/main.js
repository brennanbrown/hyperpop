// Main JavaScript file for HYPERPOP blog
// Handles page loading, mobile menu, and general interactions

class HyperpopBlog {
  constructor() {
    this.init();
  }
  
  init() {
    this.handlePageLoad();
    this.setupMobileMenu();
    this.setupShareButtons();
    this.registerServiceWorker();
  }
  
  handlePageLoad() {
    window.addEventListener('load', () => {
      const loader = document.getElementById('page-loader');
      if (loader) {
        setTimeout(() => {
          loader.classList.add('loaded');
        }, 500);
      }
    });
  }
  
  setupMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        toggle.classList.toggle('active');
      });
    }
  }
  
  setupShareButtons() {
    const copyButtons = document.querySelectorAll('.share-copy');
    
    copyButtons.forEach(button => {
      button.addEventListener('click', async () => {
        const url = button.dataset.url;
        
        try {
          await navigator.clipboard.writeText(url);
          button.textContent = 'Copied!';
          
          setTimeout(() => {
            button.textContent = 'Copy Link';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    });
  }
  
  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW registered'))
        .catch(err => console.log('SW error:', err));
    }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new HyperpopBlog();
});
