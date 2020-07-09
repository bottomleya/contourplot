class contourPlot {
    constructor(points, ctx, colMap) {
        
      this.granularity = 5; // pixels per square
      this.backgroundColour = "#525252";
      this.pxColourMap = new colourMap();

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
                var colourObj = this.colourMap.percentageToColour(p, true);
                // calculate strength of nearest point
                var strength = this.determineStrength(d);
                console.log("Val: " + p + ", Strength: " + strength);
                // apply strength
                var colour = this.applyStrength(strength, colourObj);
                this.drawSquare(x, y, this.granularity, colour);                
            }
            this.plotMatrix.push(yVals);
        }
        console.log(this.plotMatrix);
        console.log("plot complete...");
    }
    applyStrength(strength, colourObj) {
        var bgRgb = this.pxColourMap.hex2Rgb(this.backgroundColour);
        var cScheme = {"fade":   [{ p: 0.0, color: { r: bgRgb.r,        g: bgRgb.g,         b: bgRgb.b,         a: 1} },
                                  { p: 1.0, color: { r: colourObj.r,    g: colourObj.g,     b: colourObj.b,     a: 1} }]};
        this.pxColourMap.addColourScheme(cScheme);
        this.pxColourMap.setColourScheme("fade");
        var colour = this.pxColourMap.percentageToColour(strength);
        return colour;
    }
    determineStrength(distance) {
        distance = distance * 1000000;
        var radius = 50;
        if (distance<0.0000001) {distance = 0.0000001;}
        if (distance>radius) {distance = radius;}
        var strength = Math.pow(distance/radius,2);
        return strength;
    }
    calculateSpatialAverage(x, y) {
        // loop through points
        var normlisedSum = 0;
        var distanceSum = 0;
        var minDistance = this.calculateDistance(0, 0, this.points[0].x, this.points[0].y);
        // calculate distances to each point
        for (var k=0; k<this.points.length; k++) {
            var distance = this.calculateDistance(x, y, this.points[k].x, this.points[k].y);
            if (distance<minDistance) {minDistance=distance;}
            distance = this.distanceTransform(distance);
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
    
