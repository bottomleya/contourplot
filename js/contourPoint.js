class contourPoint {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        var me = this;
        
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
        return '#' + ('000000' + h.toString(16)).slice(-6);
    }
    setValue(val) {
        me.val = val;
        me.setDia();
    }
    setDia() {
        me.d = me.minD + (me.val - me.minVal) * me.maxVal / me.minVal;
        console.log(me.val);
        console.log(me.d);
    }
    growPoint() {
        me.setValue(me.val + me.valIncr);
        me.colourIn();
    }
    colourIn() {
        me.ctx.fillStyle = me.percentageToColour(me.val);
        me.ctx.beginPath();
        me.ctx.arc(me.x, me.y, me.d/2, 0, 2 * Math.PI);
        me.ctx.fill();
    }

    
}
