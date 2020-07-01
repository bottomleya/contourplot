class contourPoint {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        
        this.minVal = 5;
        this.maxVal = 100;
        this.minD = 5;
        this.maxD = 100;
        
        this.valIncr = 0.1;
        
        this.val = this.minVal;
        this.d = this.minD;
        this.ctx = ctx;
        
    }
    percentageToColour(p) {
        var r, g, b = 0;
        if(p < 50) {
            r = 255;
            g = Math.round(5.1 * p);
        }
        else {
            g = 200;
            r = Math.round(510 - 5.10 * p);
        }
        var h = r * 0x10000 + g * 0x100 + b * 0x1;
        var styleStr = '#' + ('000000' + h.toString(16)).slice(-6);
        console.log(styleStr);
        return styleStr;
    }
    setValue(val) {
        this.val = val;
        this.setDia();
    }
    setDia() {
        this.d = this.minD + (this.val - this.minVal) * this.maxVal / this.minVal;
    }
    growPoint() {
        this.setValue(this.val + this.valIncr);
        this.colourIn();
    }
    colourIn() {
        this.ctx.fillStyle = this.percentageToColour(this.val);
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.d/2, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    
}
