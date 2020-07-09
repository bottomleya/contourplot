class contourPlot {
    constructor(points, ctx, colMap) {
        
      this.granularity = 5; // pixels per square
      this.backgroundColour = "#525252";

      this.baseGrowthRate = (this.maxVal-this.minVal)/200;

      this.points = points;
      this.ctx = ctx;
        
      this.plotMatrix = [];

      this.sizeWidth = ctx.canvas.clientWidth;
      this.sizeHeight = ctx.canvas.clientHeight;
      this.widthTotPx = Math.ceil(this.sizeWidth / this.granularity)
      this.heightTotPx = Math.ceil(this.sizeHeight / this.granularity)

      this.colourMap = new colourMap("warm-100");
    }
    drawPlot() {
        // clear canvas
        this.clearCanvas();
        // loop width
        for (var i=0; i<this.widthTotPx; i++) {
            var yVals = [];
            // loop height
            for (var j=0; j<this.heightTotPx; j++) {
                var x = i*this.granularity;
                var y = j*this.granularity;
                // get percentage value and distance value
                var [p, d]  = this.calculateSpatialAverage(x, y);
                // add to matrix
                yVals.push(p);
                var colour = this.colourMap.percentageToColour(p);
                // calculate strength of nearest point
                var strength = this.determineStrength(d);
                console.log(strength);
                console.log(colour);
                // apply opacity
                colour = this.applyStrength(strength, colour);
                this.drawSquare(x, y, this.granularity, colour);                
            }
            this.plotMatrix.push(yVals);
        }
        console.log(this.plotMatrix);
        console.log("plot complete...");
    }
    applyStrength(strength, colour) {
        var sColourMap = new colourMap();
        var rgb = sColourMap.hex2Rgb(colour);
        console.log(this.backgroundColour);
        var bgRgb = sColourMap.hex2Rgb(this.backgroundColour);
        console.log(rgb);
        console.log(bgRgb);
        var cScheme = {"fade":   [{ p: 0.0, color: { r: bgRgb.r, g: bgRgb.g, b: bgRgb.b, a: 1} },
                                  { p: 1.0, color: { r: rgb.r,   g: rgb.g,   b: rgb.b,   a: 1} }]};
        sColourMap.addColourScheme(cScheme);
        sColourMap.setColourScheme("fade");
        return sColourMap.percentageToColour(strength);
    }
    determineStrength(distance) {
        var radii = 50;
        return 1;
    }
    calculateSpatialAverage(x, y) {
        // loop through points
        var normlisedSum = 0;
        var distanceSum = 0;
        var minDistance = 10000;
        // calculate distances to each point
        for (var k=0; k<this.points.length; k++) {
            var distance = this.calculateDistance(x, y, this.points[k].x, this.points[k].y);
            distance = this.distanceTransform(distance);
            if (distance<minDistance) {minDistance=distance;}
            // add to sums
            normlisedSum = normlisedSum + Math.pow(this.points[k].val,1.5) * distance;
            distanceSum = distanceSum + distance;
        }
        // calculate spatial average
        return [normlisedSum/distanceSum, minDistance];
    }
    distanceTransform(distance) {
        // limit division by zero
        if (distance<0.0001) distance = 0.0001;
        // return inverted distance
        return Math.pow(1/distance, 2);
    }
    getContourVal(x, y) {
        var i = Math.floor(x / this.granularity);
        var j = Math.floor(y / this.granularity);
        return this.plotMatrix[i][j];
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
    
