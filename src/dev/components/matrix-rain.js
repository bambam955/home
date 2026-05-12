// Configuration constants
const CONFIG = {
  fontSize: 14,
  frameInterval: 50, // ms between frames
  gradientFraction: 0.75, // 75% gradient, 25% solid dark
  darkOpacity: 0.85,
  charOpacity: 0.4,
  charColor: '#ff99cc',
  darkColor: 'rgba(10, 10, 10, 0.85)',
  characters:
    '01{}()[]<>;/functionconstletvarifelseforwhileclassimportexportfromreturnasyncawaittrycatchfinallythrownewthis',
};

class MatrixRain {
  constructor() {
    this.canvas = document.getElementById('matrix-rain');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.lastTime = 0;

    // Gradient mask system - two canvases forming a "conveyor belt"
    this.gradientMasks = [];
    this.characterCanvas = null;
    this.characterCtx = null;
    this.gridRows = 0;
    this.currentRowToRepopulate = 0;

    this.init();
    this.animate();

    window.addEventListener('resize', () => this.init());
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.canvas.width / CONFIG.fontSize);
    this.gridRows = Math.ceil(this.canvas.height / CONFIG.fontSize);

    // Create character canvas
    this.characterCanvas = document.createElement('canvas');
    this.characterCanvas.width = this.canvas.width;
    this.characterCanvas.height = this.canvas.height;
    this.characterCtx = this.characterCanvas.getContext('2d');

    // Random shift per column (0 to 1, as fraction of total height)
    this.columnShifts = Array.from({ length: this.columns }, () => Math.random());

    // Create two gradient mask canvases that together form one continuous pattern
    this.gradientMasks = [
      { canvas: document.createElement('canvas'), y: 0 },
      { canvas: document.createElement('canvas'), y: -this.canvas.height },
    ];

    for (const mask of this.gradientMasks) {
      mask.canvas.width = this.canvas.width;
      mask.canvas.height = this.canvas.height;
    }

    this.drawSplitGradients();
    this.currentRowToRepopulate = 0;
    this.populateStaticGrid();
  }

  /**
   * Draw gradients split across both mask canvases.
   *
   * Each column has a pattern: 75% gradient (dark→transparent) + 25% solid dark.
   * The pattern is split across both canvases based on columnShifts, so when
   * the canvases tile vertically, each column's pattern continues seamlessly.
   */
  drawSplitGradients() {
    const contexts = this.gradientMasks.map((m) => m.canvas.getContext('2d'));
    const h = this.canvas.height;
    const totalHeight = h * 2;
    const gradientLength = totalHeight * CONFIG.gradientFraction;

    contexts.forEach((ctx) => ctx.clearRect(0, 0, this.canvas.width, h));

    for (let col = 0; col < this.columns; col++) {
      const x = col * CONFIG.fontSize;
      const shift = this.columnShifts[col] * totalHeight;
      this.drawColumnPattern(contexts, x, shift, gradientLength, h, totalHeight);
    }
  }

  drawColumnPattern(contexts, x, shift, gradientLength, h, totalHeight) {
    const w = CONFIG.fontSize;

    // Pattern segments: gradient [0, gradientLength), dark [gradientLength, totalHeight)
    const segments = [
      { start: 0, end: gradientLength, type: 'gradient' },
      { start: gradientLength, end: totalHeight, type: 'dark' },
    ];

    // Draw to each canvas (canvas 0 covers [h, 2h), canvas 1 covers [0, h))
    for (let canvasIdx = 0; canvasIdx < 2; canvasIdx++) {
      const ctx = contexts[canvasIdx];
      const canvasStart = canvasIdx === 0 ? h : 0;
      const canvasEnd = canvasStart + h;

      for (const seg of segments) {
        // Map segment to combined canvas space with shift and wrapping
        const segStart = (shift + seg.start) % totalHeight;
        const segEnd = (shift + seg.end) % totalHeight;

        // Handle wrapping - segment might split across the wrap point
        const ranges =
          segStart <= segEnd
            ? [{ start: segStart, end: segEnd }]
            : [
                { start: segStart, end: totalHeight },
                { start: 0, end: segEnd },
              ];

        for (const range of ranges) {
          // Clip to this canvas's range
          const drawStart = Math.max(range.start, canvasStart);
          const drawEnd = Math.min(range.end, canvasEnd);

          if (drawStart >= drawEnd) continue;

          // Convert to canvas-local coordinates
          const localStart = drawStart - canvasStart;
          const localEnd = drawEnd - canvasStart;

          if (seg.type === 'dark') {
            ctx.fillStyle = CONFIG.darkColor;
            ctx.fillRect(x, localStart, w, localEnd - localStart);
          } else {
            this.drawGradientSegment(
              ctx,
              x,
              localStart,
              localEnd,
              drawStart,
              shift,
              gradientLength,
              totalHeight,
              w
            );
          }
        }
      }
    }
  }

  drawGradientSegment(
    ctx,
    x,
    localStart,
    localEnd,
    drawStart,
    shift,
    gradientLength,
    totalHeight,
    w
  ) {
    // Calculate what portion of the gradient this segment represents
    const patternStart = (drawStart - shift + totalHeight) % totalHeight;
    const patternEnd = patternStart + (localEnd - localStart);

    // t=0 is dark end, t=1 is transparent end
    const t0 = patternStart / gradientLength;
    const t1 = patternEnd / gradientLength;

    const opacity0 = CONFIG.darkOpacity * (1 - t0);
    const opacity1 = CONFIG.darkOpacity * (1 - t1);

    const gradient = ctx.createLinearGradient(x, localStart, x, localEnd);
    gradient.addColorStop(0, `rgba(10, 10, 10, ${opacity0})`);
    gradient.addColorStop(1, `rgba(10, 10, 10, ${opacity1})`);

    ctx.fillStyle = gradient;
    ctx.fillRect(x, localStart, w, localEnd - localStart);
  }

  populateStaticGrid() {
    const ctx = this.characterCtx;
    ctx.fillStyle = CONFIG.charColor;
    ctx.globalAlpha = CONFIG.charOpacity;

    for (let col = 0; col < this.columns; col++) {
      for (let row = 0; row < this.gridRows; row++) {
        const char = CONFIG.characters[Math.floor(Math.random() * CONFIG.characters.length)];
        ctx.fillText(char, col * CONFIG.fontSize, (row + 1) * CONFIG.fontSize);
      }
    }
  }

  repopulateSingleRow(row) {
    const ctx = this.characterCtx;
    const y = row * CONFIG.fontSize;

    ctx.clearRect(0, y, this.canvas.width, CONFIG.fontSize);
    ctx.fillStyle = CONFIG.charColor;
    ctx.globalAlpha = CONFIG.charOpacity;

    for (let col = 0; col < this.columns; col++) {
      const char = CONFIG.characters[Math.floor(Math.random() * CONFIG.characters.length)];
      ctx.fillText(char, col * CONFIG.fontSize, y + CONFIG.fontSize);
    }
  }

  animate(currentTime = 0) {
    requestAnimationFrame((time) => this.animate(time));

    if (currentTime - this.lastTime < CONFIG.frameInterval) return;
    this.lastTime = currentTime;

    this.updateGradients();
    this.repopulateSingleRow(this.currentRowToRepopulate);
    this.currentRowToRepopulate = (this.currentRowToRepopulate + 1) % this.gridRows;
    this.compositeDisplay();
  }

  updateGradients() {
    for (const mask of this.gradientMasks) {
      mask.y += CONFIG.fontSize;
    }

    // Conveyor belt wrap: when one goes off-screen, place it above the other
    for (let i = 0; i < this.gradientMasks.length; i++) {
      if (this.gradientMasks[i].y > this.canvas.height) {
        const other = this.gradientMasks[(i + 1) % this.gradientMasks.length];
        this.gradientMasks[i].y = other.y - this.canvas.height;
      }
    }
  }

  compositeDisplay() {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.drawImage(this.characterCanvas, 0, 0);

    for (const mask of this.gradientMasks) {
      ctx.drawImage(mask.canvas, 0, mask.y);
    }
  }
}

export default MatrixRain;
