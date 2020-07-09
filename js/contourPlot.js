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
        console.log(this.widthTotPx);
        console.log(this.heightTotPx);
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
                console.log(opacity);
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
        var sColourMap = new ColourMap();
        var rgb = this.hex2Rgb(colour);
        var bgRgb = this.hex2Rgb(this.backgroundColour);
        var cScheme = {"fade":   [{ p: 0.0, color: { r: bgRgb.r, g: bgRgb.g, b: bgRgb.b, a: 1} },
                                  { p: 1.0, color: { r: rgb.r,   g: rgb.g,   b: rgb.b,   a: 1} }]};
        sColourMap.addColourScheme(cScheme);
        sColourMap.setColourScheme("fade");
        return cScheme.percentageToColour(strength);
    }
    hex2Rgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    rgb2Hex(r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
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
    
