// Global Matrix Rain Script - persists across page navigations
(function() {
  // Check if already initialized
  if (window.matrixRainInitialized) {
    return;
  }
  
  class MatrixRain {
    constructor() {
      this.canvas = document.getElementById('matrix-rain');
      if (!this.canvas) return;
      
      this.ctx = this.canvas.getContext('2d');
      this.characters = '01{}()[]<>;/functionconstletvarifelseforwhileclassimportexportfromreturnasyncawaittrycatchfinallythrownewthis';
      this.fontSize = 14;
      this.columns = 0;
      this.drops = [];
      this.lastTime = 0;
      this.frameInterval = 50;
      this.animationId = null;
      
      this.init();
      this.animate();
      
      // Handle resize
      window.addEventListener('resize', () => this.handleResize());
    }
    
    init() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.columns = Math.floor(this.canvas.width / this.fontSize);
      
      // Only initialize drops if they don't exist (preserve state)
      if (this.drops.length === 0) {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
          this.drops[i] = Math.random() * -100;
        }
      } else if (this.columns !== this.drops.length) {
        // Adjust for window resize while preserving existing drops
        const newDrops = [];
        for (let i = 0; i < this.columns; i++) {
          newDrops[i] = this.drops[i] || Math.random() * -100;
        }
        this.drops = newDrops;
      }
    }
    
    handleResize() {
      this.init();
    }
    
    animate(currentTime = 0) {
      this.animationId = requestAnimationFrame((time) => this.animate(time));
      
      if (currentTime - this.lastTime < this.frameInterval) return;
      this.lastTime = currentTime;
      
      // Semi-transparent black for trail effect
      this.ctx.fillStyle = 'rgba(2, 6, 23, 0.05)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Set text properties
      this.ctx.fillStyle = '#00d992';
      this.ctx.font = `${this.fontSize}px 'JetBrains Mono', monospace`;
      this.ctx.globalAlpha = 0.3;
      
      // Draw characters
      for (let i = 0; i < this.drops.length; i++) {
        const char = this.characters[Math.floor(Math.random() * this.characters.length)];
        const x = i * this.fontSize;
        const y = this.drops[i] * this.fontSize;
        
        const opacity = Math.max(0, 1 - (y / this.canvas.height));
        this.ctx.globalAlpha = opacity * 0.3;
        
        this.ctx.fillText(char, x, y);
        
        if (y > this.canvas.height && Math.random() > 0.975) {
          this.drops[i] = 0;
        }
        
        this.drops[i]++;
      }
      
      this.ctx.globalAlpha = 1;
    }
    
    destroy() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
    }
  }
  
  // Initialize function
  function initMatrixRain() {
    if (!window.matrixRainInstance) {
      window.matrixRainInstance = new MatrixRain();
    }
  }
  
  // Initialize when DOM is ready
  function tryInit() {
    const canvas = document.getElementById('matrix-rain');
    if (canvas) {
      initMatrixRain();
      window.matrixRainInitialized = true;
    } else {
      // If canvas not ready, try again
      setTimeout(tryInit, 100);
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
  } else {
    tryInit();
  }
  
  // Store instance globally for persistence
  window.initMatrixRain = initMatrixRain;
})();