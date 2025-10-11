// Client-side search functionality

class BlogSearch {
  constructor() {
    this.input = document.getElementById('search-input');
    this.resultsContainer = document.getElementById('search-results');
    
    if (!this.input || !this.resultsContainer) return;
    
    this.searchIndex = [];
    this.debounceTimer = null;
    
    this.init();
  }
  
  async init() {
    // Fetch search index
    try {
      const response = await fetch('/search-index.json');
      this.searchIndex = await response.json();
      this.setupEventListeners();
    } catch (error) {
      console.error('Failed to load search index:', error);
    }
  }
  
  setupEventListeners() {
    this.input.addEventListener('input', (e) => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.performSearch(e.target.value);
      }, 300);
    });
    
    // Close results when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        this.resultsContainer.classList.add('hidden');
      }
    });
  }
  
  performSearch(query) {
    if (query.length < 2) {
      this.resultsContainer.classList.add('hidden');
      return;
    }
    
    const results = this.searchIndex.filter(item => {
      const searchText = `${item.title} ${item.excerpt} ${item.tags.join(' ')}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    });
    
    this.displayResults(results, query);
  }
  
  displayResults(results, query) {
    if (results.length === 0) {
      this.resultsContainer.innerHTML = `
        <div class="search-no-results">
          <p>NO_RESULTS_FOUND</p>
        </div>
      `;
      this.resultsContainer.classList.remove('hidden');
      return;
    }
    
    const html = results.slice(0, 5).map(result => `
      <a href="${result.url}" class="search-result-item">
        <h4 class="search-result-title">${this.highlightMatch(result.title, query)}</h4>
        <p class="search-result-excerpt">${this.highlightMatch(result.excerpt, query)}</p>
        ${result.tags.length > 0 ? `
          <div class="search-result-tags">
            ${result.tags.slice(0, 3).map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
          </div>
        ` : ''}
      </a>
    `).join('');
    
    this.resultsContainer.innerHTML = html;
    this.resultsContainer.classList.remove('hidden');
  }
  
  highlightMatch(text, query) {
    if (!text) return '';
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new BlogSearch();
});
