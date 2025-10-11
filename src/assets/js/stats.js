// Stats widget using localStorage

class StatsWidget {
  constructor() {
    this.container = document.getElementById('stats-widget');
    this.sidebarContainer = document.getElementById('stats-widget-sidebar');
    this.hitCounter = document.getElementById('hit-counter');
    this.visitorNum = document.getElementById('visitor-num');
    
    this.stats = this.getStatsFromLocalStorage();
    this.incrementPageViews();
    this.render();
    this.updateHitCounter();
  }
  
  getStatsFromLocalStorage() {
    const stored = localStorage.getItem('site-stats');
    if (stored) {
      return JSON.parse(stored);
    }
    
    return {
      pageViews: 0,
      visits: 0,
      lastVisit: null
    };
  }
  
  incrementPageViews() {
    this.stats.pageViews++;
    
    // Check if new session (30 min gap)
    const now = Date.now();
    const thirtyMinutes = 30 * 60 * 1000;
    
    if (!this.stats.lastVisit || (now - this.stats.lastVisit) > thirtyMinutes) {
      this.stats.visits++;
    }
    
    this.stats.lastVisit = now;
    localStorage.setItem('site-stats', JSON.stringify(this.stats));
    this.render();
  }
  
  render() {
    const html = `
      <div class="terminal-stats">
        <div class="stat-line">
          <span class="stat-label">PAGE_VIEWS:</span>
          <span class="stat-value digital-counter">${this.formatNumber(this.stats.pageViews)}</span>
        </div>
        <div class="stat-line">
          <span class="stat-label">VISITS:</span>
          <span class="stat-value digital-counter">${this.formatNumber(this.stats.visits)}</span>
        </div>
      </div>
    `;
    
    if (this.container) {
      this.container.innerHTML = html;
    }
    
    if (this.sidebarContainer) {
      this.sidebarContainer.innerHTML = html;
    }
  }
  
  updateHitCounter() {
    if (this.hitCounter) {
      const digits = this.formatNumber(this.stats.pageViews).split('');
      const digitElements = this.hitCounter.querySelectorAll('.counter-digit');
      digitElements.forEach((el, i) => {
        if (digits[i]) {
          el.textContent = digits[i];
        }
      });
    }
    
    if (this.visitorNum) {
      this.visitorNum.textContent = this.formatNumber(this.stats.pageViews);
    }
  }
  
  formatNumber(num) {
    return num.toString().padStart(6, '0');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new StatsWidget();
});
