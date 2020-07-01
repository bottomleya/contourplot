// Allows the creation of circles/points for building a contour plot
class contourPoint {
    constructor(x, y, ctx) {
        
        this.x = x;
        this.y = y;
        
        this.minVal = 0.05;
        this.maxVal = 1;
        this.minD = 10;
        this.maxD = 200;
        
        this.baseGrowthRate = (this.maxVal-this.minVal)/200;
        
        this.val = this.minVal;
        this.d = this.minD;
        this.ctx = ctx;
        
        this.colourMap = [
            { p: 0.0, color: { r: 0xff, g: 0x00, b: 0, a: 0.5} },
            { p: 0.5, color: { r: 0xff, g: 0xff, b: 0, a: 0.5} },
            { p: 1.0, color: { r: 0x00, g: 0xff, b: 0, a: 0.5} } ];
        
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
        this.ctx.fillStyle = this.percentageToColour(this.val);
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.d/2, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    
}
