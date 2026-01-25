class MatrixRain {
  constructor() {
    // Get the canvas element with ID 'matrix-rain' - this will be our display canvas
    this.canvas = document.getElementById('matrix-rain');
    if (!this.canvas) return;

    // Get 2D rendering context for drawing
    this.ctx = this.canvas.getContext('2d');

    // Characters to display in the rain effect (programming-themed)
    this.characters =
      '01{}()[]<>;/functionconstletvarifelseforwhileclassimportexportfromreturnasyncawaittrycatchfinallythrownewthis';

    // Font settings for the characters
    this.fontSize = 14;

    // Array to track the Y position of each column's falling character
    this.drops = [];

    // Animation timing variables
    this.lastTime = 0;
    this.frameInterval = 50; // milliseconds between frames

    // Multi-canvas system for gradient effect
    this.multiCanvasSystem = {
      characterCanvas: null,
      characterCtx: null,
      gradientAtlas1: null,
      gradientCtx1: null,
      gradientAtlas2: null,
      gradientCtx2: null,
      gradientY1: 0, // Start completely off-screen (will be moved to -canvasHeight in init)
      gradientY2: -this.canvas.height, // Start with bottom edge at bottom
      gradientSpeed: this.fontSize, // One row per frame to match row repopulation
      maxShift: this.fontSize * 30, // Maximum random shift per column (30 chars)
      gradientHeight: 0, // Will be calculated dynamically based on screen size
      gridRows: 0,
      currentRowToRepopulate: 0,
    };

    // Initialize canvas and start animation
    this.init();
    this.animate();

    // Reinitialize on window resize to maintain proper dimensions
    window.addEventListener('resize', () => this.init());
  }

  init() {
    // Set canvas dimensions to match window size
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Calculate number of columns based on font size
    this.columns = Math.floor(this.canvas.width / this.fontSize);

    // Initialize drop positions for each column
    // Start with random negative values so characters begin at different times
    this.drops = [];
    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.random() * -100;
    }

    // Initialize multi-canvas system
    this.initializeMultiCanvasSystem();
  }

  initializeMultiCanvasSystem() {
    const system = this.multiCanvasSystem;

    // Calculate grid dimensions
    system.gridRows = Math.ceil(this.canvas.height / this.fontSize);

    // Create character canvas - this holds all characters at full opacity
    system.characterCanvas = document.createElement('canvas');
    system.characterCanvas.width = this.canvas.width;
    system.characterCanvas.height = this.canvas.height;
    system.characterCtx = system.characterCanvas.getContext('2d');

    // Calculate gradient height dynamically based on screen size
    system.gradientHeight = Math.floor(system.gridRows * 0.75); // 75% of screen height in cells

    // Create two gradient atlases with screen height dimensions
    system.gradientAtlas1 = document.createElement('canvas');
    system.gradientAtlas1.width = this.canvas.width;
    system.gradientAtlas1.height = this.canvas.height; // Exact screen height
    system.gradientCtx1 = system.gradientAtlas1.getContext('2d');

    system.gradientAtlas2 = document.createElement('canvas');
    system.gradientAtlas2.width = this.canvas.width;
    system.gradientAtlas2.height = this.canvas.height; // Exact screen height
    system.gradientCtx2 = system.gradientAtlas2.getContext('2d');

    // Generate random shifts once and use them for both atlases
    const randomShifts = [];
    for (let col = 0; col < this.columns; col++) {
      randomShifts[col] = Math.random() * system.maxShift;
    }

    // Draw identical gradients to both atlases using same random shifts
    this.drawGradientsToCanvas(system.gradientAtlas1, system.gradientCtx1, randomShifts);
    this.drawGradientsToCanvas(system.gradientAtlas2, system.gradientCtx2, randomShifts);

    // Set proper initial positions for conveyor belt coverage
    system.gradientY1 = 0; // Yellow gradient starts at top of screen
    system.gradientY2 = -this.canvas.height; // White gradient starts immediately above

    // Initialize gradient repopulation tracking
    system.currentRowToRepopulate = 0;

    // Populate static grid initially
    this.populateStaticGrid();
  }

  drawGradientsToCanvas(canvas, ctx, randomShifts) {
    // Clear canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw gradients for each column with wrapping
    for (let col = 0; col < this.columns; col++) {
      const x = col * this.fontSize;
      const shift = randomShifts[col]; // Use provided random shift
      const gradientHeight = this.multiCanvasSystem.gradientHeight * this.fontSize;

      // Calculate where gradient ends and if it needs wrapping
      const gradientEnd = shift + gradientHeight;

      if (gradientEnd <= this.canvas.height) {
        // No wrapping needed - draw single segment
        this.drawGradientSegment(ctx, x, shift, gradientHeight);
      } else {
        // Wrapping needed - draw two segments
        const firstSegmentHeight = this.canvas.height - shift;
        const secondSegmentHeight = gradientEnd - this.canvas.height;

        // First segment: from shift to bottom of canvas
        this.drawGradientSegment(ctx, x, shift, firstSegmentHeight);

        // Second segment: from top to wrapped overflow
        this.drawGradientSegment(ctx, x, 0, secondSegmentHeight);
      }
    }
  }

  drawGradientSegment(ctx, x, y, height) {
    // Create gradient for this segment
    const gradient = ctx.createLinearGradient(x, y, x, y + height);
    gradient.addColorStop(0, 'rgba(10, 10, 10, 0.8)'); // More opaque at top
    gradient.addColorStop(1, 'rgba(10, 10, 10, 0)'); // Transparent at bottom

    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, this.fontSize, height);
  }

  populateStaticGrid() {
    const system = this.multiCanvasSystem;
    const ctx = system.characterCtx;

    for (let col = 0; col < this.columns; col++) {
      for (let row = 0; row < system.gridRows; row++) {
        const char = this.characters[Math.floor(Math.random() * this.characters.length)];
        const x = col * this.fontSize;
        const y = row * this.fontSize;

        ctx.fillStyle = '#ff99cc';
        ctx.globalAlpha = 0.4; // Full opacity - gradients handle fading
        ctx.fillText(char, x, y + this.fontSize);
      }
    }
  }

  repopulateSingleRow(row) {
    const system = this.multiCanvasSystem;
    const ctx = system.characterCtx;
    const y = row * this.fontSize;

    // Clear the specific row
    ctx.clearRect(0, y, this.canvas.width, this.fontSize);

    // Repopulate the row with new characters
    for (let col = 0; col < this.columns; col++) {
      const char = this.characters[Math.floor(Math.random() * this.characters.length)];
      const x = col * this.fontSize;

      ctx.fillStyle = '#ff99cc';
      ctx.globalAlpha = 0.4; // Full opacity - gradients handle fading
      ctx.fillText(char, x, y + this.fontSize);
    }
  }

  animate(currentTime = 0) {
    // Request next animation frame to create continuous loop
    requestAnimationFrame((time) => this.animate(time));

    // Throttle animation to maintain consistent frame rate
    if (currentTime - this.lastTime < this.frameInterval) return;
    this.lastTime = currentTime;

    // Update gradient positions
    this.updateGradients();

    // Clear and redraw character canvas
    this.drawCharacters();

    // Composite final display (characters + gradient effects)
    this.compositeDisplay();
  }

  updateGradients() {
    const system = this.multiCanvasSystem;

    // Move gradient copies down at one row per frame
    system.gradientY1 += system.gradientSpeed;
    system.gradientY2 += system.gradientSpeed;

    // Wrap gradient copies for conveyor belt coverage
    // When yellow gradient goes off-screen, wrap to above white gradient
    if (system.gradientY1 > this.canvas.height) {
      system.gradientY1 = system.gradientY2 - this.canvas.height;
    }
    // When white gradient goes off-screen, wrap to above yellow gradient
    if (system.gradientY2 > this.canvas.height) {
      system.gradientY2 = system.gradientY1 - this.canvas.height;
    }
  }

  drawCharacters() {
    const system = this.multiCanvasSystem;

    // Repopulate one row for variety
    this.repopulateSingleRow(system.currentRowToRepopulate);

    // Advance to next row for next frame
    system.currentRowToRepopulate = (system.currentRowToRepopulate + 1) % system.gridRows;
  }

  compositeDisplay() {
    const system = this.multiCanvasSystem;
    const ctx = this.ctx;

    // Clear main display canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw character canvas (always at full opacity)
    ctx.drawImage(system.characterCanvas, 0, 0);

    // Draw first gradient copy with translation and debugging border
    ctx.save();
    ctx.translate(0, system.gradientY1);
    ctx.drawImage(system.gradientAtlas1, 0, 0);

    // Add yellow border around entire gradient canvas for debugging
    // ctx.strokeStyle = 'yellow';
    // ctx.lineWidth = 8;
    // ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.restore();

    // Draw second gradient copy with translation and debugging border
    ctx.save();
    ctx.translate(0, system.gradientY2);
    ctx.drawImage(system.gradientAtlas2, 0, 0);

    // Add white border around entire gradient canvas for debugging
    // ctx.strokeStyle = 'white';
    // ctx.lineWidth = 4;
    // ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.restore();
  }
}

// Export the class for use in other modules
export default MatrixRain;
