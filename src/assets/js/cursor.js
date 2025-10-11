// Custom cursor trail effect

class CursorTrail {
  constructor() {
    this.trail = [];
    this.maxTrail = 20;
    this.container = document.getElementById('cursor-trail');
    this.isTouch = 'ontouchstart' in window;
    
    if (!this.isTouch && this.container) {
      this.init();
    }
  }
  
  init() {
    // Create trail particles
    for (let i = 0; i < this.maxTrail; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-dot';
      dot.style.opacity = (1 - i / this.maxTrail) * 0.5;
      this.container.appendChild(dot);
      this.trail.push(dot);
    }
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      this.updateTrail(e.clientX, e.clientY);
    });
  }
  
  updateTrail(x, y) {
    // Move each dot to previous dot's position
    for (let i = this.trail.length - 1; i > 0; i--) {
      const prevDot = this.trail[i - 1];
      this.trail[i].style.left = prevDot.style.left;
      this.trail[i].style.top = prevDot.style.top;
    }
    
    // Update first dot to cursor position
    this.trail[0].style.left = x + 'px';
    this.trail[0].style.top = y + 'px';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    new CursorTrail();
  }
});
