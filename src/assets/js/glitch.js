// Glitch effects on scroll

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
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    new ScrollGlitch();
  }
});
