// Allows the creation of circles/points for building a contour plot
class contourPoint {
    constructor(x, y, ctx) {
        
        this.x = x;
        this.y = y;
        
        this.minVal = 0.05;
        this.maxVal = 1;
        this.minD = 20;
        this.maxD = 40;
        
        this.baseGrowthRate = (this.maxVal-this.minVal)/200;
        
        this.val = this.minVal;
        this.d = this.minD;
        this.ctx = ctx;
        
        this.colourMap = new colourMap("warm-50");
        
    }
    setValue(val) {
        // Limit value to maximum amount
        if (val > this.maxVal) {
            this.val = this.maxVal;
        } else {
            this.val = val;
        }
        // Set diameter according to newly set point value
        this.setDia();
    }
    setDia() {
        // Uses linear interpolation to calculate diameter from point value
        this.d = this.minD + (this.val - this.minVal) * (this.maxD - this.minD) / (this.maxVal - this.minVal);
        //console.log(this.val);
        //console.log(this.d);
    }
    growPoint() {
        // increment size of point
        this.setValue(this.val + this.baseGrowthRate*Math.sqrt(this.d));
    }
    colourIn() {
        this.ctx.fillStyle = this.colourMap.percentageToColour(this.val);
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.d/2, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    
}
