class contourPoint {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.z = 50;
        this.d = 20;
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
    colourIn() {
        this.ctx.fillStyle = this.percentageToColour(this.z);
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.d/2, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    
}
