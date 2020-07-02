class contourPlot {
    constructor(points, ctx) {
        
      this.granularity = 9; // pixels per square
      this.backgroundColour = "#525252";

      this.baseGrowthRate = (this.maxVal-this.minVal)/200;

      this.points = points;
      this.ctx = ctx;

      this.sizeWidth = ctx.canvas.clientWidth;
      this.sizeHeight = ctx.canvas.clientHeight;
      this.widthTotPx = Math.floor(this.sizeWidth / Math.sqrt(this.granularity))
      this.widthTotPx = Math.floor(this.sizeHeight / Math.sqrt(this.granularity))

      this.colourMap = [
          { p: 0.0, color: { r: 0x00, g: 0xff, b: 0, a: 0.8} },
          { p: 0.5, color: { r: 0xff, g: 0xff, b: 0, a: 0.5} },
          { p: 1.0, color: { r: 0xff, g: 0x00, b: 0, a: 0.4} } ];
    }
    drawPlot() {
        // clear canvas
        this.clearCanvas();
        // loop width
        for (var i=0; i<this.widthTotPx; i++) {
            // loop height
            for (var j=0; j<this.heightTotPx; j++) {
                // calculate average val
                for (var k=0; k<this.points.length; k++) {
                    console.log(this.points[k].x);
                }
            }
        }
    }
    clearCanvas() {
      this.ctx.clearRect(0,0,this.sizeWidth,this.sizeHeight);
    }
    drawSquare(x, y, size, style) {
        
    }
}
    
