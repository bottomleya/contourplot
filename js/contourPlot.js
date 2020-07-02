class contourPlot {
    constructor(points, ctx) {
        
      this.granularity = 9; // pixels per square
      this.backgroundColour = #525252;

      this.baseGrowthRate = (this.maxVal-this.minVal)/200;

      this.points = points;
      this.ctx = ctx;

      this.sizeWidth = ctx.canvas.clientWidth;
      this.sizeHeight = ctx.canvas.clientHeight;

      this.colourMap = [
          { p: 0.0, color: { r: 0x00, g: 0xff, b: 0, a: 0.8} },
          { p: 0.5, color: { r: 0xff, g: 0xff, b: 0, a: 0.5} },
          { p: 1.0, color: { r: 0xff, g: 0x00, b: 0, a: 0.4} } ];
    }
    drawPlot() {
    this.clearCanvas();
      for (var i=0; i<this.points.length; i++) {
        console.log(this.points[i].x);
      }
    }
    clearCanvas() {
      this.ctx.clearRect(0,0,c.sizeWidth,c.sizeHeight);
    }
}
    
