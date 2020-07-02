class contourPlot {
    constructor(points, ctx) {
        
      this.granularity = 10; // pixels per square
      this.backgroundColour = "#525252";

      this.baseGrowthRate = (this.maxVal-this.minVal)/200;

      this.points = points;
      this.ctx = ctx;

      this.sizeWidth = ctx.canvas.clientWidth;
      this.sizeHeight = ctx.canvas.clientHeight;
      this.widthTotPx = Math.floor(this.sizeWidth / this.granularity)
      this.heightTotPx = Math.floor(this.sizeHeight / this.granularity)

      this.colourMap = [
          { p: 0.0, color: { r: 0x00, g: 0xff, b: 0, a: 1} },
          { p: 0.5, color: { r: 0xff, g: 0xff, b: 0, a: 1} },
          { p: 1.0, color: { r: 0xff, g: 0x00, b: 0, a: 1} } ];
    }
    // converts a percentage value (0-1) to a RGBA value
    // adapted from https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage
    percentageToColour(p) {
        for (var i = 1; i < this.colourMap.length - 1; i++) {
            if (p < this.colourMap[i].p) {
                break;
            }
        }
        var lower = this.colourMap[i - 1];
        var upper = this.colourMap[i];
        var range = upper.p - lower.p;
        var rangePct = (p - lower.p) / range;
        var pctLower = 1 - rangePct;
        var pctUpper = rangePct;
        var color = {
            r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
            g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
            b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
            a: lower.color.a * pctLower + upper.color.a * pctUpper
        };
        return 'rgba(' + [color.r, color.g, color.b, color.a].join(',') + ')';
    }
    drawPlot() {
        // clear canvas
        this.clearCanvas();
        console.log(this.widthTotPx);
        console.log(this.heightTotPx);
        // loop width
        for (var i=0; i<this.widthTotPx; i++) {
            // loop height
            for (var j=0; j<this.heightTotPx; j++) {
                this.drawSquare(i*this.granularity, j*this.granularity, "#000000");
                // calculate average val
                //for (var k=0; k<this.points.length; k++) {
               //     console.log(this.points[k].x);
               // }
            }
        }
    }
    clearCanvas() {
      this.ctx.clearRect(0,0,this.sizeWidth,this.sizeHeight);
    }
    drawSquare(x, y, size, style) {
        this.ctx.fillStyle = style;
        this.ctx.fillRect(x, y, size);
    }
}
    
