// Allows the creation of circles/points for building a contour plot
class contourPoint {
    constructor(x, y, ctx) {
        
        this.x = x;
        this.y = y;
        
        this.minVal = 5;
        this.maxVal = 100;
        this.minD = 10;
        this.maxD = 200;
        
        this.baseGrowthRate = 0.5;
        
        this.val = this.minVal;
        this.d = this.minD;
        this.ctx = ctx;
        
    }
    // converts a percentage value (0-100) to a HEX value
    // adapted from https://gist.github.com/mlocati/7210513
    percentageToColour(p) {
        var r, g, b = 0;
        if(p < 50) {
            r = 255;
            g = Math.round(5.1 * p);
        }
        else {
            g = 255;
            r = Math.round(510 - 5.10 * p);
        }
        var h = r * 0x10000 + g * 0x100 + b * 0x1;
        return '#' + ('000000' + h.toString(16)).slice(-6);
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
        console.log(this.val);
        console.log(this.d);
    }
    growPoint() {
        // increment size of point
        this.setValue(this.val + this.baseGrowthRate*Math.sqrt(this.d));
        this.colourIn();
    }
    colourIn() {
        this.ctx.fillStyle = this.percentageToColour(this.val);
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.d/2, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    
}
