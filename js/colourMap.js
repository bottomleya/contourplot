class colourMap {
  constructor(colourScheme) {
    this.colourMaps = {"warm-50":   [{ p: 0.0, color: { r: 0x00, g: 0xff, b: 0, a: 0.8} },
                                     { p: 0.5, color: { r: 0xff, g: 0xff, b: 0, a: 0.5} },
                                     { p: 1.0, color: { r: 0xff, g: 0x00, b: 0, a: 0.4} }],
                       "warm-100":  [{ p: 0.0, color: { r: 0x00, g: 0xff, b: 0, a: 1.0} },
                                     { p: 0.5, color: { r: 0xff, g: 0xff, b: 0, a: 1.0} },
                                     { p: 1.0, color: { r: 0xff, g: 0x00, b: 0, a: 1.0} }],
                       "temp-50":  [{ p: 0.0, color: { r: 0x37, g: 0x85, b: 0xde, a: 1.0} },
                                     { p: 0.5, color: { r: 0x4c, g: 0xc9, b: 0x3e, a: 1.0} },
                                     { p: 1.0, color: { r: 0xfc, g: 0x5c, b: 0x2b, a: 1.0} }],
                       "temp-100":  [{ p: 0.0, color: { r: 0x37, g: 0x85, b: 0xde, a: 0.8} },
                                     { p: 0.5, color: { r: 0x4c, g: 0xc9, b: 0x3e, a: 0.5} },
                                     { p: 1.0, color: { r: 0xfc, g: 0x5c, b: 0x2b, a: 0.4} }]};
    colourScheme = colourScheme || "warm-100"; // set default value
    this.setColourScheme(colourScheme);
    this.setColourMap();
  }
  // add custom colour scheme
  addColourScheme(colourSchemeDict) {
    for (var cScheme in colourSchemeDict) {
      this.colourMaps[cScheme] = colourSchemeDict[cScheme];
    }
  }
  // set colour scheme
  setColourScheme(colourScheme) {
    if (!(this.colourScheme in this.colourMaps)) {this.colourScheme = "warm-50";}
    this.colourScheme = colourScheme;
    this.setColourMap();
  }
  // set colour map
  setColourMap() {
    this.colourMap = this.colourMaps[this.colourScheme];
  }
  // converts a percentage value (0-1) to a RGBA value
  // adapted from https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage
  percentageToColour(p, returnObj) {
    returnObj = !!returnObj
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
    if (!returnObj) {return 'rgba(' + [color.r, color.g, color.b, color.a].join(',') + ')'}; 
    return color;
  }
  //
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
}
