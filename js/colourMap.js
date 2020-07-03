class colourMap {
  constructor(colourScheme) {
    this.colourMaps = {"warm-50":   [{ p: 0.0, color: { r: 0x00, g: 0xff, b: 0, a: 0.8} },
                                     { p: 0.5, color: { r: 0xff, g: 0xff, b: 0, a: 0.5} },
                                     { p: 1.0, color: { r: 0xff, g: 0x00, b: 0, a: 0.4} }],
                       "warm-100":  [{ p: 0.0, color: { r: 0x00, g: 0xff, b: 0, a: 1.0} },
                                     { p: 0.5, color: { r: 0xff, g: 0xff, b: 0, a: 1.0} },
                                     { p: 1.0, color: { r: 0xff, g: 0x00, b: 0, a: 1.0} }]};
    this.colourScheme = colourScheme;
    if (!(this.colourScheme in colourMaps)) {this.colourScheme = "warm-50";}
    console.log(this.colourScheme);
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
}
