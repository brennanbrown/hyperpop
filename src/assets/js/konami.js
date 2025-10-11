// Konami Code Easter Egg

class KonamiCode {
  constructor(callback) {
    this.sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                     'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                     'b', 'a'];
    this.current = 0;
    this.callback = callback;
    
    this.init();
  }
  
  init() {
    document.addEventListener('keydown', (e) => {
      const key = e.key;
      
      if (key === this.sequence[this.current]) {
        this.current++;
        
        if (this.current === this.sequence.length) {
          this.callback();
          this.current = 0;
        }
      } else {
        this.current = 0;
      }
    });
  }
}

// Activate extra glitch mode
document.addEventListener('DOMContentLoaded', () => {
  new KonamiCode(() => {
    document.body.classList.add('ultra-glitch-mode');
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'konami-notification';
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(10, 10, 10, 0.95);
      border: 2px solid var(--cyber-blue);
      padding: 2rem;
      z-index: 10001;
      text-align: center;
      box-shadow: 0 0 50px var(--cyber-blue);
    `;
    notification.innerHTML = `
      <div class="glitch" data-text="ULTRA GLITCH MODE ACTIVATED" style="font-family: var(--font-pixel); color: var(--cyber-blue); font-size: 1rem;">
        ULTRA GLITCH MODE ACTIVATED
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  });
});
