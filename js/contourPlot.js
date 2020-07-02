class contourPlot {
    constructor(points, ctx) {
        
      this.granularity = 5; // pixels per square
      this.backgroundColour = "#525252";

      this.baseGrowthRate = (this.maxVal-this.minVal)/200;

      this.points = points;
      this.ctx = ctx;

      this.sizeWidth = ctx.canvas.clientWidth;
      this.sizeHeight = ctx.canvas.clientHeight;
      this.widthTotPx = Math.ceil(this.sizeWidth / this.granularity)
      this.heightTotPx = Math.ceil(this.sizeHeight / this.granularity)

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
                var x = i*this.granularity;
                var y = j*this.granularity;
                var p = this.calculateSpatialAverage(x, y);
                var colour = this.percentageToColour(p);
                this.drawSquare(x, y, this.granularity, colour);                
            }
        }
    }
    calculateSpatialAverage(x, y) {
        // loop through points
        var valPerDistanceSum = 0;
        var invertedDistanceSum = 0;
        // calculate distances to each point
        for (var k=0; k<this.points.length; k++) {
            var distance = this.calculateDistance(x, y, this.points[k].x, this.points[k].y);
            // limit division by zero
            if (distance<0.001) distance = 0.001;
            // add to sum
            valPerDistanceSum = valPerDistanceSum + this.points[k].val/distance;
            invertedDistanceSum = invertedDistanceSum + 1/distance;
        }
        // calculate spatial average
        return valPerDistanceSum/invertedDistanceSum;
        }
    }
    calculateDistance(xa, ya, xb, yb) {
        return Math.sqrt(Math.pow(xa-xb, 2) + Math.pow(ya-yb,2))
    }
    clearCanvas() {
      this.ctx.clearRect(0,0,this.sizeWidth,this.sizeHeight);
    }
    drawSquare(x, y, size, style) {
        this.ctx.fillStyle = style;
        this.ctx.fillRect(x, y, size, size);
    }
}
    
