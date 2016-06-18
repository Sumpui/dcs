(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f;
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
        }
        return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
})({
    1: [ function(require, module, exports) {}, {} ],
    2: [ function(require, module, exports) {
        var colorNames = require("color-name");
        module.exports = {
            getRgba: getRgba,
            getHsla: getHsla,
            getRgb: getRgb,
            getHsl: getHsl,
            getHwb: getHwb,
            getAlpha: getAlpha,
            hexString: hexString,
            rgbString: rgbString,
            rgbaString: rgbaString,
            percentString: percentString,
            percentaString: percentaString,
            hslString: hslString,
            hslaString: hslaString,
            hwbString: hwbString,
            keyword: keyword
        };
        function getRgba(string) {
            if (!string) {
                return;
            }
            var abbr = /^#([a-fA-F0-9]{3})$/, hex = /^#([a-fA-F0-9]{6})$/, rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/, per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/, keyword = /(\w+)/;
            var rgb = [ 0, 0, 0 ], a = 1, match = string.match(abbr);
            if (match) {
                match = match[1];
                for (var i = 0; i < rgb.length; i++) {
                    rgb[i] = parseInt(match[i] + match[i], 16);
                }
            } else if (match = string.match(hex)) {
                match = match[1];
                for (var i = 0; i < rgb.length; i++) {
                    rgb[i] = parseInt(match.slice(i * 2, i * 2 + 2), 16);
                }
            } else if (match = string.match(rgba)) {
                for (var i = 0; i < rgb.length; i++) {
                    rgb[i] = parseInt(match[i + 1]);
                }
                a = parseFloat(match[4]);
            } else if (match = string.match(per)) {
                for (var i = 0; i < rgb.length; i++) {
                    rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
                }
                a = parseFloat(match[4]);
            } else if (match = string.match(keyword)) {
                if (match[1] == "transparent") {
                    return [ 0, 0, 0, 0 ];
                }
                rgb = colorNames[match[1]];
                if (!rgb) {
                    return;
                }
            }
            for (var i = 0; i < rgb.length; i++) {
                rgb[i] = scale(rgb[i], 0, 255);
            }
            if (!a && a != 0) {
                a = 1;
            } else {
                a = scale(a, 0, 1);
            }
            rgb[3] = a;
            return rgb;
        }
        function getHsla(string) {
            if (!string) {
                return;
            }
            var hsl = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
            var match = string.match(hsl);
            if (match) {
                var alpha = parseFloat(match[4]);
                var h = scale(parseInt(match[1]), 0, 360), s = scale(parseFloat(match[2]), 0, 100), l = scale(parseFloat(match[3]), 0, 100), a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
                return [ h, s, l, a ];
            }
        }
        function getHwb(string) {
            if (!string) {
                return;
            }
            var hwb = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
            var match = string.match(hwb);
            if (match) {
                var alpha = parseFloat(match[4]);
                var h = scale(parseInt(match[1]), 0, 360), w = scale(parseFloat(match[2]), 0, 100), b = scale(parseFloat(match[3]), 0, 100), a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
                return [ h, w, b, a ];
            }
        }
        function getRgb(string) {
            var rgba = getRgba(string);
            return rgba && rgba.slice(0, 3);
        }
        function getHsl(string) {
            var hsla = getHsla(string);
            return hsla && hsla.slice(0, 3);
        }
        function getAlpha(string) {
            var vals = getRgba(string);
            if (vals) {
                return vals[3];
            } else if (vals = getHsla(string)) {
                return vals[3];
            } else if (vals = getHwb(string)) {
                return vals[3];
            }
        }
        function hexString(rgb) {
            return "#" + hexDouble(rgb[0]) + hexDouble(rgb[1]) + hexDouble(rgb[2]);
        }
        function rgbString(rgba, alpha) {
            if (alpha < 1 || rgba[3] && rgba[3] < 1) {
                return rgbaString(rgba, alpha);
            }
            return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
        }
        function rgbaString(rgba, alpha) {
            if (alpha === undefined) {
                alpha = rgba[3] !== undefined ? rgba[3] : 1;
            }
            return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + alpha + ")";
        }
        function percentString(rgba, alpha) {
            if (alpha < 1 || rgba[3] && rgba[3] < 1) {
                return percentaString(rgba, alpha);
            }
            var r = Math.round(rgba[0] / 255 * 100), g = Math.round(rgba[1] / 255 * 100), b = Math.round(rgba[2] / 255 * 100);
            return "rgb(" + r + "%, " + g + "%, " + b + "%)";
        }
        function percentaString(rgba, alpha) {
            var r = Math.round(rgba[0] / 255 * 100), g = Math.round(rgba[1] / 255 * 100), b = Math.round(rgba[2] / 255 * 100);
            return "rgba(" + r + "%, " + g + "%, " + b + "%, " + (alpha || rgba[3] || 1) + ")";
        }
        function hslString(hsla, alpha) {
            if (alpha < 1 || hsla[3] && hsla[3] < 1) {
                return hslaString(hsla, alpha);
            }
            return "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)";
        }
        function hslaString(hsla, alpha) {
            if (alpha === undefined) {
                alpha = hsla[3] !== undefined ? hsla[3] : 1;
            }
            return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + alpha + ")";
        }
        function hwbString(hwb, alpha) {
            if (alpha === undefined) {
                alpha = hwb[3] !== undefined ? hwb[3] : 1;
            }
            return "hwb(" + hwb[0] + ", " + hwb[1] + "%, " + hwb[2] + "%" + (alpha !== undefined && alpha !== 1 ? ", " + alpha : "") + ")";
        }
        function keyword(rgb) {
            return reverseNames[rgb.slice(0, 3)];
        }
        function scale(num, min, max) {
            return Math.min(Math.max(min, num), max);
        }
        function hexDouble(num) {
            var str = num.toString(16).toUpperCase();
            return str.length < 2 ? "0" + str : str;
        }
        var reverseNames = {};
        for (var name in colorNames) {
            reverseNames[colorNames[name]] = name;
        }
    }, {
        "color-name": 6
    } ],
    3: [ function(require, module, exports) {
        var convert = require("color-convert");
        var string = require("chartjs-color-string");
        var Color = function(obj) {
            if (obj instanceof Color) {
                return obj;
            }
            if (!(this instanceof Color)) {
                return new Color(obj);
            }
            this.values = {
                rgb: [ 0, 0, 0 ],
                hsl: [ 0, 0, 0 ],
                hsv: [ 0, 0, 0 ],
                hwb: [ 0, 0, 0 ],
                cmyk: [ 0, 0, 0, 0 ],
                alpha: 1
            };
            var vals;
            if (typeof obj === "string") {
                vals = string.getRgba(obj);
                if (vals) {
                    this.setValues("rgb", vals);
                } else if (vals = string.getHsla(obj)) {
                    this.setValues("hsl", vals);
                } else if (vals = string.getHwb(obj)) {
                    this.setValues("hwb", vals);
                } else {
                    throw new Error('Unable to parse color from string "' + obj + '"');
                }
            } else if (typeof obj === "object") {
                vals = obj;
                if (vals.r !== undefined || vals.red !== undefined) {
                    this.setValues("rgb", vals);
                } else if (vals.l !== undefined || vals.lightness !== undefined) {
                    this.setValues("hsl", vals);
                } else if (vals.v !== undefined || vals.value !== undefined) {
                    this.setValues("hsv", vals);
                } else if (vals.w !== undefined || vals.whiteness !== undefined) {
                    this.setValues("hwb", vals);
                } else if (vals.c !== undefined || vals.cyan !== undefined) {
                    this.setValues("cmyk", vals);
                } else {
                    throw new Error("Unable to parse color from object " + JSON.stringify(obj));
                }
            }
        };
        Color.prototype = {
            rgb: function() {
                return this.setSpace("rgb", arguments);
            },
            hsl: function() {
                return this.setSpace("hsl", arguments);
            },
            hsv: function() {
                return this.setSpace("hsv", arguments);
            },
            hwb: function() {
                return this.setSpace("hwb", arguments);
            },
            cmyk: function() {
                return this.setSpace("cmyk", arguments);
            },
            rgbArray: function() {
                return this.values.rgb;
            },
            hslArray: function() {
                return this.values.hsl;
            },
            hsvArray: function() {
                return this.values.hsv;
            },
            hwbArray: function() {
                var values = this.values;
                if (values.alpha !== 1) {
                    return values.hwb.concat([ values.alpha ]);
                }
                return values.hwb;
            },
            cmykArray: function() {
                return this.values.cmyk;
            },
            rgbaArray: function() {
                var values = this.values;
                return values.rgb.concat([ values.alpha ]);
            },
            hslaArray: function() {
                var values = this.values;
                return values.hsl.concat([ values.alpha ]);
            },
            alpha: function(val) {
                if (val === undefined) {
                    return this.values.alpha;
                }
                this.setValues("alpha", val);
                return this;
            },
            red: function(val) {
                return this.setChannel("rgb", 0, val);
            },
            green: function(val) {
                return this.setChannel("rgb", 1, val);
            },
            blue: function(val) {
                return this.setChannel("rgb", 2, val);
            },
            hue: function(val) {
                if (val) {
                    val %= 360;
                    val = val < 0 ? 360 + val : val;
                }
                return this.setChannel("hsl", 0, val);
            },
            saturation: function(val) {
                return this.setChannel("hsl", 1, val);
            },
            lightness: function(val) {
                return this.setChannel("hsl", 2, val);
            },
            saturationv: function(val) {
                return this.setChannel("hsv", 1, val);
            },
            whiteness: function(val) {
                return this.setChannel("hwb", 1, val);
            },
            blackness: function(val) {
                return this.setChannel("hwb", 2, val);
            },
            value: function(val) {
                return this.setChannel("hsv", 2, val);
            },
            cyan: function(val) {
                return this.setChannel("cmyk", 0, val);
            },
            magenta: function(val) {
                return this.setChannel("cmyk", 1, val);
            },
            yellow: function(val) {
                return this.setChannel("cmyk", 2, val);
            },
            black: function(val) {
                return this.setChannel("cmyk", 3, val);
            },
            hexString: function() {
                return string.hexString(this.values.rgb);
            },
            rgbString: function() {
                return string.rgbString(this.values.rgb, this.values.alpha);
            },
            rgbaString: function() {
                return string.rgbaString(this.values.rgb, this.values.alpha);
            },
            percentString: function() {
                return string.percentString(this.values.rgb, this.values.alpha);
            },
            hslString: function() {
                return string.hslString(this.values.hsl, this.values.alpha);
            },
            hslaString: function() {
                return string.hslaString(this.values.hsl, this.values.alpha);
            },
            hwbString: function() {
                return string.hwbString(this.values.hwb, this.values.alpha);
            },
            keyword: function() {
                return string.keyword(this.values.rgb, this.values.alpha);
            },
            rgbNumber: function() {
                var rgb = this.values.rgb;
                return rgb[0] << 16 | rgb[1] << 8 | rgb[2];
            },
            luminosity: function() {
                var rgb = this.values.rgb;
                var lum = [];
                for (var i = 0; i < rgb.length; i++) {
                    var chan = rgb[i] / 255;
                    lum[i] = chan <= .03928 ? chan / 12.92 : Math.pow((chan + .055) / 1.055, 2.4);
                }
                return .2126 * lum[0] + .7152 * lum[1] + .0722 * lum[2];
            },
            contrast: function(color2) {
                var lum1 = this.luminosity();
                var lum2 = color2.luminosity();
                if (lum1 > lum2) {
                    return (lum1 + .05) / (lum2 + .05);
                }
                return (lum2 + .05) / (lum1 + .05);
            },
            level: function(color2) {
                var contrastRatio = this.contrast(color2);
                if (contrastRatio >= 7.1) {
                    return "AAA";
                }
                return contrastRatio >= 4.5 ? "AA" : "";
            },
            dark: function() {
                var rgb = this.values.rgb;
                var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1e3;
                return yiq < 128;
            },
            light: function() {
                return !this.dark();
            },
            negate: function() {
                var rgb = [];
                for (var i = 0; i < 3; i++) {
                    rgb[i] = 255 - this.values.rgb[i];
                }
                this.setValues("rgb", rgb);
                return this;
            },
            lighten: function(ratio) {
                var hsl = this.values.hsl;
                hsl[2] += hsl[2] * ratio;
                this.setValues("hsl", hsl);
                return this;
            },
            darken: function(ratio) {
                var hsl = this.values.hsl;
                hsl[2] -= hsl[2] * ratio;
                this.setValues("hsl", hsl);
                return this;
            },
            saturate: function(ratio) {
                var hsl = this.values.hsl;
                hsl[1] += hsl[1] * ratio;
                this.setValues("hsl", hsl);
                return this;
            },
            desaturate: function(ratio) {
                var hsl = this.values.hsl;
                hsl[1] -= hsl[1] * ratio;
                this.setValues("hsl", hsl);
                return this;
            },
            whiten: function(ratio) {
                var hwb = this.values.hwb;
                hwb[1] += hwb[1] * ratio;
                this.setValues("hwb", hwb);
                return this;
            },
            blacken: function(ratio) {
                var hwb = this.values.hwb;
                hwb[2] += hwb[2] * ratio;
                this.setValues("hwb", hwb);
                return this;
            },
            greyscale: function() {
                var rgb = this.values.rgb;
                var val = rgb[0] * .3 + rgb[1] * .59 + rgb[2] * .11;
                this.setValues("rgb", [ val, val, val ]);
                return this;
            },
            clearer: function(ratio) {
                var alpha = this.values.alpha;
                this.setValues("alpha", alpha - alpha * ratio);
                return this;
            },
            opaquer: function(ratio) {
                var alpha = this.values.alpha;
                this.setValues("alpha", alpha + alpha * ratio);
                return this;
            },
            rotate: function(degrees) {
                var hsl = this.values.hsl;
                var hue = (hsl[0] + degrees) % 360;
                hsl[0] = hue < 0 ? 360 + hue : hue;
                this.setValues("hsl", hsl);
                return this;
            },
            mix: function(mixinColor, weight) {
                var color1 = this;
                var color2 = mixinColor;
                var p = weight === undefined ? .5 : weight;
                var w = 2 * p - 1;
                var a = color1.alpha() - color2.alpha();
                var w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
                var w2 = 1 - w1;
                return this.rgb(w1 * color1.red() + w2 * color2.red(), w1 * color1.green() + w2 * color2.green(), w1 * color1.blue() + w2 * color2.blue()).alpha(color1.alpha() * p + color2.alpha() * (1 - p));
            },
            toJSON: function() {
                return this.rgb();
            },
            clone: function() {
                var result = new Color();
                var source = this.values;
                var target = result.values;
                var value, type;
                for (var prop in source) {
                    if (source.hasOwnProperty(prop)) {
                        value = source[prop];
                        type = {}.toString.call(value);
                        if (type === "[object Array]") {
                            target[prop] = value.slice(0);
                        } else if (type === "[object Number]") {
                            target[prop] = value;
                        } else {
                            console.error("unexpected color value:", value);
                        }
                    }
                }
                return result;
            }
        };
        Color.prototype.spaces = {
            rgb: [ "red", "green", "blue" ],
            hsl: [ "hue", "saturation", "lightness" ],
            hsv: [ "hue", "saturation", "value" ],
            hwb: [ "hue", "whiteness", "blackness" ],
            cmyk: [ "cyan", "magenta", "yellow", "black" ]
        };
        Color.prototype.maxes = {
            rgb: [ 255, 255, 255 ],
            hsl: [ 360, 100, 100 ],
            hsv: [ 360, 100, 100 ],
            hwb: [ 360, 100, 100 ],
            cmyk: [ 100, 100, 100, 100 ]
        };
        Color.prototype.getValues = function(space) {
            var values = this.values;
            var vals = {};
            for (var i = 0; i < space.length; i++) {
                vals[space.charAt(i)] = values[space][i];
            }
            if (values.alpha !== 1) {
                vals.a = values.alpha;
            }
            return vals;
        };
        Color.prototype.setValues = function(space, vals) {
            var values = this.values;
            var spaces = this.spaces;
            var maxes = this.maxes;
            var alpha = 1;
            var i;
            if (space === "alpha") {
                alpha = vals;
            } else if (vals.length) {
                values[space] = vals.slice(0, space.length);
                alpha = vals[space.length];
            } else if (vals[space.charAt(0)] !== undefined) {
                for (i = 0; i < space.length; i++) {
                    values[space][i] = vals[space.charAt(i)];
                }
                alpha = vals.a;
            } else if (vals[spaces[space][0]] !== undefined) {
                var chans = spaces[space];
                for (i = 0; i < space.length; i++) {
                    values[space][i] = vals[chans[i]];
                }
                alpha = vals.alpha;
            }
            values.alpha = Math.max(0, Math.min(1, alpha === undefined ? values.alpha : alpha));
            if (space === "alpha") {
                return false;
            }
            var capped;
            for (i = 0; i < space.length; i++) {
                capped = Math.max(0, Math.min(maxes[space][i], values[space][i]));
                values[space][i] = Math.round(capped);
            }
            for (var sname in spaces) {
                if (sname !== space) {
                    values[sname] = convert[space][sname](values[space]);
                }
            }
            return true;
        };
        Color.prototype.setSpace = function(space, args) {
            var vals = args[0];
            if (vals === undefined) {
                return this.getValues(space);
            }
            if (typeof vals === "number") {
                vals = Array.prototype.slice.call(args);
            }
            this.setValues(space, vals);
            return this;
        };
        Color.prototype.setChannel = function(space, index, val) {
            var svalues = this.values[space];
            if (val === undefined) {
                return svalues[index];
            } else if (val === svalues[index]) {
                return this;
            }
            svalues[index] = val;
            this.setValues(space, svalues);
            return this;
        };
        if (typeof window !== "undefined") {
            window.Color = Color;
        }
        module.exports = Color;
    }, {
        "chartjs-color-string": 2,
        "color-convert": 5
    } ],
    4: [ function(require, module, exports) {
        module.exports = {
            rgb2hsl: rgb2hsl,
            rgb2hsv: rgb2hsv,
            rgb2hwb: rgb2hwb,
            rgb2cmyk: rgb2cmyk,
            rgb2keyword: rgb2keyword,
            rgb2xyz: rgb2xyz,
            rgb2lab: rgb2lab,
            rgb2lch: rgb2lch,
            hsl2rgb: hsl2rgb,
            hsl2hsv: hsl2hsv,
            hsl2hwb: hsl2hwb,
            hsl2cmyk: hsl2cmyk,
            hsl2keyword: hsl2keyword,
            hsv2rgb: hsv2rgb,
            hsv2hsl: hsv2hsl,
            hsv2hwb: hsv2hwb,
            hsv2cmyk: hsv2cmyk,
            hsv2keyword: hsv2keyword,
            hwb2rgb: hwb2rgb,
            hwb2hsl: hwb2hsl,
            hwb2hsv: hwb2hsv,
            hwb2cmyk: hwb2cmyk,
            hwb2keyword: hwb2keyword,
            cmyk2rgb: cmyk2rgb,
            cmyk2hsl: cmyk2hsl,
            cmyk2hsv: cmyk2hsv,
            cmyk2hwb: cmyk2hwb,
            cmyk2keyword: cmyk2keyword,
            keyword2rgb: keyword2rgb,
            keyword2hsl: keyword2hsl,
            keyword2hsv: keyword2hsv,
            keyword2hwb: keyword2hwb,
            keyword2cmyk: keyword2cmyk,
            keyword2lab: keyword2lab,
            keyword2xyz: keyword2xyz,
            xyz2rgb: xyz2rgb,
            xyz2lab: xyz2lab,
            xyz2lch: xyz2lch,
            lab2xyz: lab2xyz,
            lab2rgb: lab2rgb,
            lab2lch: lab2lch,
            lch2lab: lch2lab,
            lch2xyz: lch2xyz,
            lch2rgb: lch2rgb
        };
        function rgb2hsl(rgb) {
            var r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), delta = max - min, h, s, l;
            if (max == min) h = 0; else if (r == max) h = (g - b) / delta; else if (g == max) h = 2 + (b - r) / delta; else if (b == max) h = 4 + (r - g) / delta;
            h = Math.min(h * 60, 360);
            if (h < 0) h += 360;
            l = (min + max) / 2;
            if (max == min) s = 0; else if (l <= .5) s = delta / (max + min); else s = delta / (2 - max - min);
            return [ h, s * 100, l * 100 ];
        }
        function rgb2hsv(rgb) {
            var r = rgb[0], g = rgb[1], b = rgb[2], min = Math.min(r, g, b), max = Math.max(r, g, b), delta = max - min, h, s, v;
            if (max == 0) s = 0; else s = delta / max * 1e3 / 10;
            if (max == min) h = 0; else if (r == max) h = (g - b) / delta; else if (g == max) h = 2 + (b - r) / delta; else if (b == max) h = 4 + (r - g) / delta;
            h = Math.min(h * 60, 360);
            if (h < 0) h += 360;
            v = max / 255 * 1e3 / 10;
            return [ h, s, v ];
        }
        function rgb2hwb(rgb) {
            var r = rgb[0], g = rgb[1], b = rgb[2], h = rgb2hsl(rgb)[0], w = 1 / 255 * Math.min(r, Math.min(g, b)), b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
            return [ h, w * 100, b * 100 ];
        }
        function rgb2cmyk(rgb) {
            var r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, c, m, y, k;
            k = Math.min(1 - r, 1 - g, 1 - b);
            c = (1 - r - k) / (1 - k) || 0;
            m = (1 - g - k) / (1 - k) || 0;
            y = (1 - b - k) / (1 - k) || 0;
            return [ c * 100, m * 100, y * 100, k * 100 ];
        }
        function rgb2keyword(rgb) {
            return reverseKeywords[JSON.stringify(rgb)];
        }
        function rgb2xyz(rgb) {
            var r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
            r = r > .04045 ? Math.pow((r + .055) / 1.055, 2.4) : r / 12.92;
            g = g > .04045 ? Math.pow((g + .055) / 1.055, 2.4) : g / 12.92;
            b = b > .04045 ? Math.pow((b + .055) / 1.055, 2.4) : b / 12.92;
            var x = r * .4124 + g * .3576 + b * .1805;
            var y = r * .2126 + g * .7152 + b * .0722;
            var z = r * .0193 + g * .1192 + b * .9505;
            return [ x * 100, y * 100, z * 100 ];
        }
        function rgb2lab(rgb) {
            var xyz = rgb2xyz(rgb), x = xyz[0], y = xyz[1], z = xyz[2], l, a, b;
            x /= 95.047;
            y /= 100;
            z /= 108.883;
            x = x > .008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
            y = y > .008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
            z = z > .008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
            l = 116 * y - 16;
            a = 500 * (x - y);
            b = 200 * (y - z);
            return [ l, a, b ];
        }
        function rgb2lch(args) {
            return lab2lch(rgb2lab(args));
        }
        function hsl2rgb(hsl) {
            var h = hsl[0] / 360, s = hsl[1] / 100, l = hsl[2] / 100, t1, t2, t3, rgb, val;
            if (s == 0) {
                val = l * 255;
                return [ val, val, val ];
            }
            if (l < .5) t2 = l * (1 + s); else t2 = l + s - l * s;
            t1 = 2 * l - t2;
            rgb = [ 0, 0, 0 ];
            for (var i = 0; i < 3; i++) {
                t3 = h + 1 / 3 * -(i - 1);
                t3 < 0 && t3++;
                t3 > 1 && t3--;
                if (6 * t3 < 1) val = t1 + (t2 - t1) * 6 * t3; else if (2 * t3 < 1) val = t2; else if (3 * t3 < 2) val = t1 + (t2 - t1) * (2 / 3 - t3) * 6; else val = t1;
                rgb[i] = val * 255;
            }
            return rgb;
        }
        function hsl2hsv(hsl) {
            var h = hsl[0], s = hsl[1] / 100, l = hsl[2] / 100, sv, v;
            if (l === 0) {
                return [ 0, 0, 0 ];
            }
            l *= 2;
            s *= l <= 1 ? l : 2 - l;
            v = (l + s) / 2;
            sv = 2 * s / (l + s);
            return [ h, sv * 100, v * 100 ];
        }
        function hsl2hwb(args) {
            return rgb2hwb(hsl2rgb(args));
        }
        function hsl2cmyk(args) {
            return rgb2cmyk(hsl2rgb(args));
        }
        function hsl2keyword(args) {
            return rgb2keyword(hsl2rgb(args));
        }
        function hsv2rgb(hsv) {
            var h = hsv[0] / 60, s = hsv[1] / 100, v = hsv[2] / 100, hi = Math.floor(h) % 6;
            var f = h - Math.floor(h), p = 255 * v * (1 - s), q = 255 * v * (1 - s * f), t = 255 * v * (1 - s * (1 - f)), v = 255 * v;
            switch (hi) {
              case 0:
                return [ v, t, p ];

              case 1:
                return [ q, v, p ];

              case 2:
                return [ p, v, t ];

              case 3:
                return [ p, q, v ];

              case 4:
                return [ t, p, v ];

              case 5:
                return [ v, p, q ];
            }
        }
        function hsv2hsl(hsv) {
            var h = hsv[0], s = hsv[1] / 100, v = hsv[2] / 100, sl, l;
            l = (2 - s) * v;
            sl = s * v;
            sl /= l <= 1 ? l : 2 - l;
            sl = sl || 0;
            l /= 2;
            return [ h, sl * 100, l * 100 ];
        }
        function hsv2hwb(args) {
            return rgb2hwb(hsv2rgb(args));
        }
        function hsv2cmyk(args) {
            return rgb2cmyk(hsv2rgb(args));
        }
        function hsv2keyword(args) {
            return rgb2keyword(hsv2rgb(args));
        }
        function hwb2rgb(hwb) {
            var h = hwb[0] / 360, wh = hwb[1] / 100, bl = hwb[2] / 100, ratio = wh + bl, i, v, f, n;
            if (ratio > 1) {
                wh /= ratio;
                bl /= ratio;
            }
            i = Math.floor(6 * h);
            v = 1 - bl;
            f = 6 * h - i;
            if ((i & 1) != 0) {
                f = 1 - f;
            }
            n = wh + f * (v - wh);
            switch (i) {
              default:
              case 6:
              case 0:
                r = v;
                g = n;
                b = wh;
                break;

              case 1:
                r = n;
                g = v;
                b = wh;
                break;

              case 2:
                r = wh;
                g = v;
                b = n;
                break;

              case 3:
                r = wh;
                g = n;
                b = v;
                break;

              case 4:
                r = n;
                g = wh;
                b = v;
                break;

              case 5:
                r = v;
                g = wh;
                b = n;
                break;
            }
            return [ r * 255, g * 255, b * 255 ];
        }
        function hwb2hsl(args) {
            return rgb2hsl(hwb2rgb(args));
        }
        function hwb2hsv(args) {
            return rgb2hsv(hwb2rgb(args));
        }
        function hwb2cmyk(args) {
            return rgb2cmyk(hwb2rgb(args));
        }
        function hwb2keyword(args) {
            return rgb2keyword(hwb2rgb(args));
        }
        function cmyk2rgb(cmyk) {
            var c = cmyk[0] / 100, m = cmyk[1] / 100, y = cmyk[2] / 100, k = cmyk[3] / 100, r, g, b;
            r = 1 - Math.min(1, c * (1 - k) + k);
            g = 1 - Math.min(1, m * (1 - k) + k);
            b = 1 - Math.min(1, y * (1 - k) + k);
            return [ r * 255, g * 255, b * 255 ];
        }
        function cmyk2hsl(args) {
            return rgb2hsl(cmyk2rgb(args));
        }
        function cmyk2hsv(args) {
            return rgb2hsv(cmyk2rgb(args));
        }
        function cmyk2hwb(args) {
            return rgb2hwb(cmyk2rgb(args));
        }
        function cmyk2keyword(args) {
            return rgb2keyword(cmyk2rgb(args));
        }
        function xyz2rgb(xyz) {
            var x = xyz[0] / 100, y = xyz[1] / 100, z = xyz[2] / 100, r, g, b;
            r = x * 3.2406 + y * -1.5372 + z * -.4986;
            g = x * -.9689 + y * 1.8758 + z * .0415;
            b = x * .0557 + y * -.204 + z * 1.057;
            r = r > .0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - .055 : r = r * 12.92;
            g = g > .0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - .055 : g = g * 12.92;
            b = b > .0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - .055 : b = b * 12.92;
            r = Math.min(Math.max(0, r), 1);
            g = Math.min(Math.max(0, g), 1);
            b = Math.min(Math.max(0, b), 1);
            return [ r * 255, g * 255, b * 255 ];
        }
        function xyz2lab(xyz) {
            var x = xyz[0], y = xyz[1], z = xyz[2], l, a, b;
            x /= 95.047;
            y /= 100;
            z /= 108.883;
            x = x > .008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
            y = y > .008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
            z = z > .008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
            l = 116 * y - 16;
            a = 500 * (x - y);
            b = 200 * (y - z);
            return [ l, a, b ];
        }
        function xyz2lch(args) {
            return lab2lch(xyz2lab(args));
        }
        function lab2xyz(lab) {
            var l = lab[0], a = lab[1], b = lab[2], x, y, z, y2;
            if (l <= 8) {
                y = l * 100 / 903.3;
                y2 = 7.787 * (y / 100) + 16 / 116;
            } else {
                y = 100 * Math.pow((l + 16) / 116, 3);
                y2 = Math.pow(y / 100, 1 / 3);
            }
            x = x / 95.047 <= .008856 ? x = 95.047 * (a / 500 + y2 - 16 / 116) / 7.787 : 95.047 * Math.pow(a / 500 + y2, 3);
            z = z / 108.883 <= .008859 ? z = 108.883 * (y2 - b / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(y2 - b / 200, 3);
            return [ x, y, z ];
        }
        function lab2lch(lab) {
            var l = lab[0], a = lab[1], b = lab[2], hr, h, c;
            hr = Math.atan2(b, a);
            h = hr * 360 / 2 / Math.PI;
            if (h < 0) {
                h += 360;
            }
            c = Math.sqrt(a * a + b * b);
            return [ l, c, h ];
        }
        function lab2rgb(args) {
            return xyz2rgb(lab2xyz(args));
        }
        function lch2lab(lch) {
            var l = lch[0], c = lch[1], h = lch[2], a, b, hr;
            hr = h / 360 * 2 * Math.PI;
            a = c * Math.cos(hr);
            b = c * Math.sin(hr);
            return [ l, a, b ];
        }
        function lch2xyz(args) {
            return lab2xyz(lch2lab(args));
        }
        function lch2rgb(args) {
            return lab2rgb(lch2lab(args));
        }
        function keyword2rgb(keyword) {
            return cssKeywords[keyword];
        }
        function keyword2hsl(args) {
            return rgb2hsl(keyword2rgb(args));
        }
        function keyword2hsv(args) {
            return rgb2hsv(keyword2rgb(args));
        }
        function keyword2hwb(args) {
            return rgb2hwb(keyword2rgb(args));
        }
        function keyword2cmyk(args) {
            return rgb2cmyk(keyword2rgb(args));
        }
        function keyword2lab(args) {
            return rgb2lab(keyword2rgb(args));
        }
        function keyword2xyz(args) {
            return rgb2xyz(keyword2rgb(args));
        }
        var cssKeywords = {
            aliceblue: [ 240, 248, 255 ],
            antiquewhite: [ 250, 235, 215 ],
            aqua: [ 0, 255, 255 ],
            aquamarine: [ 127, 255, 212 ],
            azure: [ 240, 255, 255 ],
            beige: [ 245, 245, 220 ],
            bisque: [ 255, 228, 196 ],
            black: [ 0, 0, 0 ],
            blanchedalmond: [ 255, 235, 205 ],
            blue: [ 0, 0, 255 ],
            blueviolet: [ 138, 43, 226 ],
            brown: [ 165, 42, 42 ],
            burlywood: [ 222, 184, 135 ],
            cadetblue: [ 95, 158, 160 ],
            chartreuse: [ 127, 255, 0 ],
            chocolate: [ 210, 105, 30 ],
            coral: [ 255, 127, 80 ],
            cornflowerblue: [ 100, 149, 237 ],
            cornsilk: [ 255, 248, 220 ],
            crimson: [ 220, 20, 60 ],
            cyan: [ 0, 255, 255 ],
            darkblue: [ 0, 0, 139 ],
            darkcyan: [ 0, 139, 139 ],
            darkgoldenrod: [ 184, 134, 11 ],
            darkgray: [ 169, 169, 169 ],
            darkgreen: [ 0, 100, 0 ],
            darkgrey: [ 169, 169, 169 ],
            darkkhaki: [ 189, 183, 107 ],
            darkmagenta: [ 139, 0, 139 ],
            darkolivegreen: [ 85, 107, 47 ],
            darkorange: [ 255, 140, 0 ],
            darkorchid: [ 153, 50, 204 ],
            darkred: [ 139, 0, 0 ],
            darksalmon: [ 233, 150, 122 ],
            darkseagreen: [ 143, 188, 143 ],
            darkslateblue: [ 72, 61, 139 ],
            darkslategray: [ 47, 79, 79 ],
            darkslategrey: [ 47, 79, 79 ],
            darkturquoise: [ 0, 206, 209 ],
            darkviolet: [ 148, 0, 211 ],
            deeppink: [ 255, 20, 147 ],
            deepskyblue: [ 0, 191, 255 ],
            dimgray: [ 105, 105, 105 ],
            dimgrey: [ 105, 105, 105 ],
            dodgerblue: [ 30, 144, 255 ],
            firebrick: [ 178, 34, 34 ],
            floralwhite: [ 255, 250, 240 ],
            forestgreen: [ 34, 139, 34 ],
            fuchsia: [ 255, 0, 255 ],
            gainsboro: [ 220, 220, 220 ],
            ghostwhite: [ 248, 248, 255 ],
            gold: [ 255, 215, 0 ],
            goldenrod: [ 218, 165, 32 ],
            gray: [ 128, 128, 128 ],
            green: [ 0, 128, 0 ],
            greenyellow: [ 173, 255, 47 ],
            grey: [ 128, 128, 128 ],
            honeydew: [ 240, 255, 240 ],
            hotpink: [ 255, 105, 180 ],
            indianred: [ 205, 92, 92 ],
            indigo: [ 75, 0, 130 ],
            ivory: [ 255, 255, 240 ],
            khaki: [ 240, 230, 140 ],
            lavender: [ 230, 230, 250 ],
            lavenderblush: [ 255, 240, 245 ],
            lawngreen: [ 124, 252, 0 ],
            lemonchiffon: [ 255, 250, 205 ],
            lightblue: [ 173, 216, 230 ],
            lightcoral: [ 240, 128, 128 ],
            lightcyan: [ 224, 255, 255 ],
            lightgoldenrodyellow: [ 250, 250, 210 ],
            lightgray: [ 211, 211, 211 ],
            lightgreen: [ 144, 238, 144 ],
            lightgrey: [ 211, 211, 211 ],
            lightpink: [ 255, 182, 193 ],
            lightsalmon: [ 255, 160, 122 ],
            lightseagreen: [ 32, 178, 170 ],
            lightskyblue: [ 135, 206, 250 ],
            lightslategray: [ 119, 136, 153 ],
            lightslategrey: [ 119, 136, 153 ],
            lightsteelblue: [ 176, 196, 222 ],
            lightyellow: [ 255, 255, 224 ],
            lime: [ 0, 255, 0 ],
            limegreen: [ 50, 205, 50 ],
            linen: [ 250, 240, 230 ],
            magenta: [ 255, 0, 255 ],
            maroon: [ 128, 0, 0 ],
            mediumaquamarine: [ 102, 205, 170 ],
            mediumblue: [ 0, 0, 205 ],
            mediumorchid: [ 186, 85, 211 ],
            mediumpurple: [ 147, 112, 219 ],
            mediumseagreen: [ 60, 179, 113 ],
            mediumslateblue: [ 123, 104, 238 ],
            mediumspringgreen: [ 0, 250, 154 ],
            mediumturquoise: [ 72, 209, 204 ],
            mediumvioletred: [ 199, 21, 133 ],
            midnightblue: [ 25, 25, 112 ],
            mintcream: [ 245, 255, 250 ],
            mistyrose: [ 255, 228, 225 ],
            moccasin: [ 255, 228, 181 ],
            navajowhite: [ 255, 222, 173 ],
            navy: [ 0, 0, 128 ],
            oldlace: [ 253, 245, 230 ],
            olive: [ 128, 128, 0 ],
            olivedrab: [ 107, 142, 35 ],
            orange: [ 255, 165, 0 ],
            orangered: [ 255, 69, 0 ],
            orchid: [ 218, 112, 214 ],
            palegoldenrod: [ 238, 232, 170 ],
            palegreen: [ 152, 251, 152 ],
            paleturquoise: [ 175, 238, 238 ],
            palevioletred: [ 219, 112, 147 ],
            papayawhip: [ 255, 239, 213 ],
            peachpuff: [ 255, 218, 185 ],
            peru: [ 205, 133, 63 ],
            pink: [ 255, 192, 203 ],
            plum: [ 221, 160, 221 ],
            powderblue: [ 176, 224, 230 ],
            purple: [ 128, 0, 128 ],
            rebeccapurple: [ 102, 51, 153 ],
            red: [ 255, 0, 0 ],
            rosybrown: [ 188, 143, 143 ],
            royalblue: [ 65, 105, 225 ],
            saddlebrown: [ 139, 69, 19 ],
            salmon: [ 250, 128, 114 ],
            sandybrown: [ 244, 164, 96 ],
            seagreen: [ 46, 139, 87 ],
            seashell: [ 255, 245, 238 ],
            sienna: [ 160, 82, 45 ],
            silver: [ 192, 192, 192 ],
            skyblue: [ 135, 206, 235 ],
            slateblue: [ 106, 90, 205 ],
            slategray: [ 112, 128, 144 ],
            slategrey: [ 112, 128, 144 ],
            snow: [ 255, 250, 250 ],
            springgreen: [ 0, 255, 127 ],
            steelblue: [ 70, 130, 180 ],
            tan: [ 210, 180, 140 ],
            teal: [ 0, 128, 128 ],
            thistle: [ 216, 191, 216 ],
            tomato: [ 255, 99, 71 ],
            turquoise: [ 64, 224, 208 ],
            violet: [ 238, 130, 238 ],
            wheat: [ 245, 222, 179 ],
            white: [ 255, 255, 255 ],
            whitesmoke: [ 245, 245, 245 ],
            yellow: [ 255, 255, 0 ],
            yellowgreen: [ 154, 205, 50 ]
        };
        var reverseKeywords = {};
        for (var key in cssKeywords) {
            reverseKeywords[JSON.stringify(cssKeywords[key])] = key;
        }
    }, {} ],
    5: [ function(require, module, exports) {
        var conversions = require("./conversions");
        var convert = function() {
            return new Converter();
        };
        for (var func in conversions) {
            convert[func + "Raw"] = function(func) {
                return function(arg) {
                    if (typeof arg == "number") arg = Array.prototype.slice.call(arguments);
                    return conversions[func](arg);
                };
            }(func);
            var pair = /(\w+)2(\w+)/.exec(func), from = pair[1], to = pair[2];
            convert[from] = convert[from] || {};
            convert[from][to] = convert[func] = function(func) {
                return function(arg) {
                    if (typeof arg == "number") arg = Array.prototype.slice.call(arguments);
                    var val = conversions[func](arg);
                    if (typeof val == "string" || val === undefined) return val;
                    for (var i = 0; i < val.length; i++) val[i] = Math.round(val[i]);
                    return val;
                };
            }(func);
        }
        var Converter = function() {
            this.convs = {};
        };
        Converter.prototype.routeSpace = function(space, args) {
            var values = args[0];
            if (values === undefined) {
                return this.getValues(space);
            }
            if (typeof values == "number") {
                values = Array.prototype.slice.call(args);
            }
            return this.setValues(space, values);
        };
        Converter.prototype.setValues = function(space, values) {
            this.space = space;
            this.convs = {};
            this.convs[space] = values;
            return this;
        };
        Converter.prototype.getValues = function(space) {
            var vals = this.convs[space];
            if (!vals) {
                var fspace = this.space, from = this.convs[fspace];
                vals = convert[fspace][space](from);
                this.convs[space] = vals;
            }
            return vals;
        };
        [ "rgb", "hsl", "hsv", "cmyk", "keyword" ].forEach(function(space) {
            Converter.prototype[space] = function(vals) {
                return this.routeSpace(space, arguments);
            };
        });
        module.exports = convert;
    }, {
        "./conversions": 4
    } ],
    6: [ function(require, module, exports) {
        module.exports = {
            aliceblue: [ 240, 248, 255 ],
            antiquewhite: [ 250, 235, 215 ],
            aqua: [ 0, 255, 255 ],
            aquamarine: [ 127, 255, 212 ],
            azure: [ 240, 255, 255 ],
            beige: [ 245, 245, 220 ],
            bisque: [ 255, 228, 196 ],
            black: [ 0, 0, 0 ],
            blanchedalmond: [ 255, 235, 205 ],
            blue: [ 0, 0, 255 ],
            blueviolet: [ 138, 43, 226 ],
            brown: [ 165, 42, 42 ],
            burlywood: [ 222, 184, 135 ],
            cadetblue: [ 95, 158, 160 ],
            chartreuse: [ 127, 255, 0 ],
            chocolate: [ 210, 105, 30 ],
            coral: [ 255, 127, 80 ],
            cornflowerblue: [ 100, 149, 237 ],
            cornsilk: [ 255, 248, 220 ],
            crimson: [ 220, 20, 60 ],
            cyan: [ 0, 255, 255 ],
            darkblue: [ 0, 0, 139 ],
            darkcyan: [ 0, 139, 139 ],
            darkgoldenrod: [ 184, 134, 11 ],
            darkgray: [ 169, 169, 169 ],
            darkgreen: [ 0, 100, 0 ],
            darkgrey: [ 169, 169, 169 ],
            darkkhaki: [ 189, 183, 107 ],
            darkmagenta: [ 139, 0, 139 ],
            darkolivegreen: [ 85, 107, 47 ],
            darkorange: [ 255, 140, 0 ],
            darkorchid: [ 153, 50, 204 ],
            darkred: [ 139, 0, 0 ],
            darksalmon: [ 233, 150, 122 ],
            darkseagreen: [ 143, 188, 143 ],
            darkslateblue: [ 72, 61, 139 ],
            darkslategray: [ 47, 79, 79 ],
            darkslategrey: [ 47, 79, 79 ],
            darkturquoise: [ 0, 206, 209 ],
            darkviolet: [ 148, 0, 211 ],
            deeppink: [ 255, 20, 147 ],
            deepskyblue: [ 0, 191, 255 ],
            dimgray: [ 105, 105, 105 ],
            dimgrey: [ 105, 105, 105 ],
            dodgerblue: [ 30, 144, 255 ],
            firebrick: [ 178, 34, 34 ],
            floralwhite: [ 255, 250, 240 ],
            forestgreen: [ 34, 139, 34 ],
            fuchsia: [ 255, 0, 255 ],
            gainsboro: [ 220, 220, 220 ],
            ghostwhite: [ 248, 248, 255 ],
            gold: [ 255, 215, 0 ],
            goldenrod: [ 218, 165, 32 ],
            gray: [ 128, 128, 128 ],
            green: [ 0, 128, 0 ],
            greenyellow: [ 173, 255, 47 ],
            grey: [ 128, 128, 128 ],
            honeydew: [ 240, 255, 240 ],
            hotpink: [ 255, 105, 180 ],
            indianred: [ 205, 92, 92 ],
            indigo: [ 75, 0, 130 ],
            ivory: [ 255, 255, 240 ],
            khaki: [ 240, 230, 140 ],
            lavender: [ 230, 230, 250 ],
            lavenderblush: [ 255, 240, 245 ],
            lawngreen: [ 124, 252, 0 ],
            lemonchiffon: [ 255, 250, 205 ],
            lightblue: [ 173, 216, 230 ],
            lightcoral: [ 240, 128, 128 ],
            lightcyan: [ 224, 255, 255 ],
            lightgoldenrodyellow: [ 250, 250, 210 ],
            lightgray: [ 211, 211, 211 ],
            lightgreen: [ 144, 238, 144 ],
            lightgrey: [ 211, 211, 211 ],
            lightpink: [ 255, 182, 193 ],
            lightsalmon: [ 255, 160, 122 ],
            lightseagreen: [ 32, 178, 170 ],
            lightskyblue: [ 135, 206, 250 ],
            lightslategray: [ 119, 136, 153 ],
            lightslategrey: [ 119, 136, 153 ],
            lightsteelblue: [ 176, 196, 222 ],
            lightyellow: [ 255, 255, 224 ],
            lime: [ 0, 255, 0 ],
            limegreen: [ 50, 205, 50 ],
            linen: [ 250, 240, 230 ],
            magenta: [ 255, 0, 255 ],
            maroon: [ 128, 0, 0 ],
            mediumaquamarine: [ 102, 205, 170 ],
            mediumblue: [ 0, 0, 205 ],
            mediumorchid: [ 186, 85, 211 ],
            mediumpurple: [ 147, 112, 219 ],
            mediumseagreen: [ 60, 179, 113 ],
            mediumslateblue: [ 123, 104, 238 ],
            mediumspringgreen: [ 0, 250, 154 ],
            mediumturquoise: [ 72, 209, 204 ],
            mediumvioletred: [ 199, 21, 133 ],
            midnightblue: [ 25, 25, 112 ],
            mintcream: [ 245, 255, 250 ],
            mistyrose: [ 255, 228, 225 ],
            moccasin: [ 255, 228, 181 ],
            navajowhite: [ 255, 222, 173 ],
            navy: [ 0, 0, 128 ],
            oldlace: [ 253, 245, 230 ],
            olive: [ 128, 128, 0 ],
            olivedrab: [ 107, 142, 35 ],
            orange: [ 255, 165, 0 ],
            orangered: [ 255, 69, 0 ],
            orchid: [ 218, 112, 214 ],
            palegoldenrod: [ 238, 232, 170 ],
            palegreen: [ 152, 251, 152 ],
            paleturquoise: [ 175, 238, 238 ],
            palevioletred: [ 219, 112, 147 ],
            papayawhip: [ 255, 239, 213 ],
            peachpuff: [ 255, 218, 185 ],
            peru: [ 205, 133, 63 ],
            pink: [ 255, 192, 203 ],
            plum: [ 221, 160, 221 ],
            powderblue: [ 176, 224, 230 ],
            purple: [ 128, 0, 128 ],
            rebeccapurple: [ 102, 51, 153 ],
            red: [ 255, 0, 0 ],
            rosybrown: [ 188, 143, 143 ],
            royalblue: [ 65, 105, 225 ],
            saddlebrown: [ 139, 69, 19 ],
            salmon: [ 250, 128, 114 ],
            sandybrown: [ 244, 164, 96 ],
            seagreen: [ 46, 139, 87 ],
            seashell: [ 255, 245, 238 ],
            sienna: [ 160, 82, 45 ],
            silver: [ 192, 192, 192 ],
            skyblue: [ 135, 206, 235 ],
            slateblue: [ 106, 90, 205 ],
            slategray: [ 112, 128, 144 ],
            slategrey: [ 112, 128, 144 ],
            snow: [ 255, 250, 250 ],
            springgreen: [ 0, 255, 127 ],
            steelblue: [ 70, 130, 180 ],
            tan: [ 210, 180, 140 ],
            teal: [ 0, 128, 128 ],
            thistle: [ 216, 191, 216 ],
            tomato: [ 255, 99, 71 ],
            turquoise: [ 64, 224, 208 ],
            violet: [ 238, 130, 238 ],
            wheat: [ 245, 222, 179 ],
            white: [ 255, 255, 255 ],
            whitesmoke: [ 245, 245, 245 ],
            yellow: [ 255, 255, 0 ],
            yellowgreen: [ 154, 205, 50 ]
        };
    }, {} ],
    7: [ function(require, module, exports) {
        var Chart = require("./core/core.js")();
        require("./core/core.helpers")(Chart);
        require("./core/core.element")(Chart);
        require("./core/core.animation")(Chart);
        require("./core/core.controller")(Chart);
        require("./core/core.datasetController")(Chart);
        require("./core/core.layoutService")(Chart);
        require("./core/core.legend")(Chart);
        require("./core/core.plugin.js")(Chart);
        require("./core/core.scale")(Chart);
        require("./core/core.scaleService")(Chart);
        require("./core/core.title")(Chart);
        require("./core/core.tooltip")(Chart);
        require("./elements/element.arc")(Chart);
        require("./elements/element.line")(Chart);
        require("./elements/element.point")(Chart);
        require("./elements/element.rectangle")(Chart);
        require("./scales/scale.category")(Chart);
        require("./scales/scale.linear")(Chart);
        require("./scales/scale.logarithmic")(Chart);
        require("./scales/scale.radialLinear")(Chart);
        require("./scales/scale.time")(Chart);
        require("./controllers/controller.bar")(Chart);
        require("./controllers/controller.bubble")(Chart);
        require("./controllers/controller.doughnut")(Chart);
        require("./controllers/controller.line")(Chart);
        require("./controllers/controller.polarArea")(Chart);
        require("./controllers/controller.radar")(Chart);
        require("./charts/Chart.Bar")(Chart);
        require("./charts/Chart.Bubble")(Chart);
        require("./charts/Chart.Doughnut")(Chart);
        require("./charts/Chart.Line")(Chart);
        require("./charts/Chart.PolarArea")(Chart);
        require("./charts/Chart.Radar")(Chart);
        require("./charts/Chart.Scatter")(Chart);
        window.Chart = module.exports = Chart;
    }, {
        "./charts/Chart.Bar": 8,
        "./charts/Chart.Bubble": 9,
        "./charts/Chart.Doughnut": 10,
        "./charts/Chart.Line": 11,
        "./charts/Chart.PolarArea": 12,
        "./charts/Chart.Radar": 13,
        "./charts/Chart.Scatter": 14,
        "./controllers/controller.bar": 15,
        "./controllers/controller.bubble": 16,
        "./controllers/controller.doughnut": 17,
        "./controllers/controller.line": 18,
        "./controllers/controller.polarArea": 19,
        "./controllers/controller.radar": 20,
        "./core/core.animation": 21,
        "./core/core.controller": 22,
        "./core/core.datasetController": 23,
        "./core/core.element": 24,
        "./core/core.helpers": 25,
        "./core/core.js": 26,
        "./core/core.layoutService": 27,
        "./core/core.legend": 28,
        "./core/core.plugin.js": 29,
        "./core/core.scale": 30,
        "./core/core.scaleService": 31,
        "./core/core.title": 32,
        "./core/core.tooltip": 33,
        "./elements/element.arc": 34,
        "./elements/element.line": 35,
        "./elements/element.point": 36,
        "./elements/element.rectangle": 37,
        "./scales/scale.category": 38,
        "./scales/scale.linear": 39,
        "./scales/scale.logarithmic": 40,
        "./scales/scale.radialLinear": 41,
        "./scales/scale.time": 42
    } ],
    8: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            Chart.Bar = function(context, config) {
                config.type = "bar";
                return new Chart(context, config);
            };
        };
    }, {} ],
    9: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            Chart.Bubble = function(context, config) {
                config.type = "bubble";
                return new Chart(context, config);
            };
        };
    }, {} ],
    10: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            Chart.Doughnut = function(context, config) {
                config.type = "doughnut";
                return new Chart(context, config);
            };
        };
    }, {} ],
    11: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            Chart.Line = function(context, config) {
                config.type = "line";
                return new Chart(context, config);
            };
        };
    }, {} ],
    12: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            Chart.PolarArea = function(context, config) {
                config.type = "polarArea";
                return new Chart(context, config);
            };
        };
    }, {} ],
    13: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            Chart.Radar = function(context, config) {
                config.options = Chart.helpers.configMerge({
                    aspectRatio: 1
                }, config.options);
                config.type = "radar";
                return new Chart(context, config);
            };
        };
    }, {} ],
    14: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var defaultConfig = {
                hover: {
                    mode: "single"
                },
                scales: {
                    xAxes: [ {
                        type: "linear",
                        position: "bottom",
                        id: "x-axis-1"
                    } ],
                    yAxes: [ {
                        type: "linear",
                        position: "left",
                        id: "y-axis-1"
                    } ]
                },
                tooltips: {
                    callbacks: {
                        title: function(tooltipItems, data) {
                            return "";
                        },
                        label: function(tooltipItem, data) {
                            return "(" + tooltipItem.xLabel + ", " + tooltipItem.yLabel + ")";
                        }
                    }
                }
            };
            Chart.defaults.scatter = defaultConfig;
            Chart.controllers.scatter = Chart.controllers.line;
            Chart.Scatter = function(context, config) {
                config.type = "scatter";
                return new Chart(context, config);
            };
        };
    }, {} ],
    15: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            Chart.defaults.bar = {
                hover: {
                    mode: "label"
                },
                scales: {
                    xAxes: [ {
                        type: "category",
                        categoryPercentage: .8,
                        barPercentage: .9,
                        gridLines: {
                            offsetGridLines: true
                        }
                    } ],
                    yAxes: [ {
                        type: "linear"
                    } ]
                }
            };
            Chart.controllers.bar = Chart.DatasetController.extend({
                dataElementType: Chart.elements.Rectangle,
                initialize: function(chart, datasetIndex) {
                    Chart.DatasetController.prototype.initialize.call(this, chart, datasetIndex);
                    this.getMeta().bar = true;
                },
                getBarCount: function getBarCount() {
                    var barCount = 0;
                    helpers.each(this.chart.data.datasets, function(dataset, datasetIndex) {
                        var meta = this.chart.getDatasetMeta(datasetIndex);
                        if (meta.bar && this.chart.isDatasetVisible(datasetIndex)) {
                            ++barCount;
                        }
                    }, this);
                    return barCount;
                },
                update: function update(reset) {
                    helpers.each(this.getMeta().data, function(rectangle, index) {
                        this.updateElement(rectangle, index, reset);
                    }, this);
                },
                updateElement: function updateElement(rectangle, index, reset) {
                    var meta = this.getMeta();
                    var xScale = this.getScaleForId(meta.xAxisID);
                    var yScale = this.getScaleForId(meta.yAxisID);
                    var scaleBase = yScale.getBasePixel();
                    var rectangleElementOptions = this.chart.options.elements.rectangle;
                    var custom = rectangle.custom || {};
                    var dataset = this.getDataset();
                    helpers.extend(rectangle, {
                        _xScale: xScale,
                        _yScale: yScale,
                        _datasetIndex: this.index,
                        _index: index,
                        _model: {
                            x: this.calculateBarX(index, this.index),
                            y: reset ? scaleBase : this.calculateBarY(index, this.index),
                            label: this.chart.data.labels[index],
                            datasetLabel: dataset.label,
                            base: reset ? scaleBase : this.calculateBarBase(this.index, index),
                            width: this.calculateBarWidth(index),
                            backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor),
                            borderSkipped: custom.borderSkipped ? custom.borderSkipped : rectangleElementOptions.borderSkipped,
                            borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor),
                            borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth)
                        }
                    });
                    rectangle.pivot();
                },
                calculateBarBase: function(datasetIndex, index) {
                    var meta = this.getMeta();
                    var yScale = this.getScaleForId(meta.yAxisID);
                    var base = 0;
                    if (yScale.options.stacked) {
                        var chart = this.chart;
                        var datasets = chart.data.datasets;
                        var value = datasets[datasetIndex].data[index];
                        if (value < 0) {
                            for (var i = 0; i < datasetIndex; i++) {
                                var negDS = datasets[i];
                                var negDSMeta = chart.getDatasetMeta(i);
                                if (negDSMeta.bar && negDSMeta.yAxisID === yScale.id && chart.isDatasetVisible(i)) {
                                    base += negDS.data[index] < 0 ? negDS.data[index] : 0;
                                }
                            }
                        } else {
                            for (var j = 0; j < datasetIndex; j++) {
                                var posDS = datasets[j];
                                var posDSMeta = chart.getDatasetMeta(j);
                                if (posDSMeta.bar && posDSMeta.yAxisID === yScale.id && chart.isDatasetVisible(j)) {
                                    base += posDS.data[index] > 0 ? posDS.data[index] : 0;
                                }
                            }
                        }
                        return yScale.getPixelForValue(base);
                    }
                    return yScale.getBasePixel();
                },
                getRuler: function(index) {
                    var meta = this.getMeta();
                    var xScale = this.getScaleForId(meta.xAxisID);
                    var datasetCount = this.getBarCount();
                    var tickWidth;
                    if (xScale.options.type === "category") {
                        tickWidth = xScale.getPixelForTick(index + 1) - xScale.getPixelForTick(index);
                    } else {
                        tickWidth = xScale.width / xScale.ticks.length;
                    }
                    var categoryWidth = tickWidth * xScale.options.categoryPercentage;
                    var categorySpacing = (tickWidth - tickWidth * xScale.options.categoryPercentage) / 2;
                    var fullBarWidth = categoryWidth / datasetCount;
                    if (xScale.ticks.length !== this.chart.data.labels.length) {
                        var perc = xScale.ticks.length / this.chart.data.labels.length;
                        fullBarWidth = fullBarWidth * perc;
                    }
                    var barWidth = fullBarWidth * xScale.options.barPercentage;
                    var barSpacing = fullBarWidth - fullBarWidth * xScale.options.barPercentage;
                    return {
                        datasetCount: datasetCount,
                        tickWidth: tickWidth,
                        categoryWidth: categoryWidth,
                        categorySpacing: categorySpacing,
                        fullBarWidth: fullBarWidth,
                        barWidth: barWidth,
                        barSpacing: barSpacing
                    };
                },
                calculateBarWidth: function(index) {
                    var xScale = this.getScaleForId(this.getMeta().xAxisID);
                    var ruler = this.getRuler(index);
                    return xScale.options.stacked ? ruler.categoryWidth : ruler.barWidth;
                },
                getBarIndex: function(datasetIndex) {
                    var barIndex = 0;
                    var meta, j;
                    for (j = 0; j < datasetIndex; ++j) {
                        meta = this.chart.getDatasetMeta(j);
                        if (meta.bar && this.chart.isDatasetVisible(j)) {
                            ++barIndex;
                        }
                    }
                    return barIndex;
                },
                calculateBarX: function(index, datasetIndex) {
                    var meta = this.getMeta();
                    var xScale = this.getScaleForId(meta.xAxisID);
                    var barIndex = this.getBarIndex(datasetIndex);
                    var ruler = this.getRuler(index);
                    var leftTick = xScale.getPixelForValue(null, index, datasetIndex, this.chart.isCombo);
                    leftTick -= this.chart.isCombo ? ruler.tickWidth / 2 : 0;
                    if (xScale.options.stacked) {
                        return leftTick + ruler.categoryWidth / 2 + ruler.categorySpacing;
                    }
                    return leftTick + ruler.barWidth / 2 + ruler.categorySpacing + ruler.barWidth * barIndex + ruler.barSpacing / 2 + ruler.barSpacing * barIndex;
                },
                calculateBarY: function(index, datasetIndex) {
                    var meta = this.getMeta();
                    var yScale = this.getScaleForId(meta.yAxisID);
                    var value = this.getDataset().data[index];
                    if (yScale.options.stacked) {
                        var sumPos = 0, sumNeg = 0;
                        for (var i = 0; i < datasetIndex; i++) {
                            var ds = this.chart.data.datasets[i];
                            var dsMeta = this.chart.getDatasetMeta(i);
                            if (dsMeta.bar && dsMeta.yAxisID === yScale.id && this.chart.isDatasetVisible(i)) {
                                if (ds.data[index] < 0) {
                                    sumNeg += ds.data[index] || 0;
                                } else {
                                    sumPos += ds.data[index] || 0;
                                }
                            }
                        }
                        if (value < 0) {
                            return yScale.getPixelForValue(sumNeg + value);
                        } else {
                            return yScale.getPixelForValue(sumPos + value);
                        }
                    }
                    return yScale.getPixelForValue(value);
                },
                draw: function(ease) {
                    var easingDecimal = ease || 1;
                    helpers.each(this.getMeta().data, function(rectangle, index) {
                        var d = this.getDataset().data[index];
                        if (d !== null && d !== undefined && !isNaN(d)) {
                            rectangle.transition(easingDecimal).draw();
                        }
                    }, this);
                },
                setHoverStyle: function(rectangle) {
                    var dataset = this.chart.data.datasets[rectangle._datasetIndex];
                    var index = rectangle._index;
                    var custom = rectangle.custom || {};
                    var model = rectangle._model;
                    model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.hoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
                    model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.hoverBorderColor, index, helpers.getHoverColor(model.borderColor));
                    model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
                },
                removeHoverStyle: function(rectangle) {
                    var dataset = this.chart.data.datasets[rectangle._datasetIndex];
                    var index = rectangle._index;
                    var custom = rectangle.custom || {};
                    var model = rectangle._model;
                    var rectangleElementOptions = this.chart.options.elements.rectangle;
                    model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor);
                    model.borderColor = custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor);
                    model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth);
                }
            });
            Chart.defaults.horizontalBar = {
                hover: {
                    mode: "label"
                },
                scales: {
                    xAxes: [ {
                        type: "linear",
                        position: "bottom"
                    } ],
                    yAxes: [ {
                        position: "left",
                        type: "category",
                        categoryPercentage: .8,
                        barPercentage: .9,
                        gridLines: {
                            offsetGridLines: true
                        }
                    } ]
                },
                elements: {
                    rectangle: {
                        borderSkipped: "left"
                    }
                },
                tooltips: {
                    callbacks: {
                        title: function(tooltipItems, data) {
                            var title = "";
                            if (tooltipItems.length > 0) {
                                if (tooltipItems[0].yLabel) {
                                    title = tooltipItems[0].yLabel;
                                } else if (data.labels.length > 0 && tooltipItems[0].index < data.labels.length) {
                                    title = data.labels[tooltipItems[0].index];
                                }
                            }
                            return title;
                        },
                        label: function(tooltipItem, data) {
                            var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || "";
                            return datasetLabel + ": " + tooltipItem.xLabel;
                        }
                    }
                }
            };
            Chart.controllers.horizontalBar = Chart.controllers.bar.extend({
                updateElement: function updateElement(rectangle, index, reset, numBars) {
                    var meta = this.getMeta();
                    var xScale = this.getScaleForId(meta.xAxisID);
                    var yScale = this.getScaleForId(meta.yAxisID);
                    var scaleBase = xScale.getBasePixel();
                    var custom = rectangle.custom || {};
                    var dataset = this.getDataset();
                    var rectangleElementOptions = this.chart.options.elements.rectangle;
                    helpers.extend(rectangle, {
                        _xScale: xScale,
                        _yScale: yScale,
                        _datasetIndex: this.index,
                        _index: index,
                        _model: {
                            x: reset ? scaleBase : this.calculateBarX(index, this.index),
                            y: this.calculateBarY(index, this.index),
                            label: this.chart.data.labels[index],
                            datasetLabel: dataset.label,
                            base: reset ? scaleBase : this.calculateBarBase(this.index, index),
                            height: this.calculateBarHeight(index),
                            backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor),
                            borderSkipped: custom.borderSkipped ? custom.borderSkipped : rectangleElementOptions.borderSkipped,
                            borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor),
                            borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth)
                        },
                        draw: function() {
                            var ctx = this._chart.ctx;
                            var vm = this._view;
                            var halfHeight = vm.height / 2, topY = vm.y - halfHeight, bottomY = vm.y + halfHeight, right = vm.base - (vm.base - vm.x), halfStroke = vm.borderWidth / 2;
                            if (vm.borderWidth) {
                                topY += halfStroke;
                                bottomY -= halfStroke;
                                right += halfStroke;
                            }
                            ctx.beginPath();
                            ctx.fillStyle = vm.backgroundColor;
                            ctx.strokeStyle = vm.borderColor;
                            ctx.lineWidth = vm.borderWidth;
                            var corners = [ [ vm.base, bottomY ], [ vm.base, topY ], [ right, topY ], [ right, bottomY ] ];
                            var borders = [ "bottom", "left", "top", "right" ];
                            var startCorner = borders.indexOf(vm.borderSkipped, 0);
                            if (startCorner === -1) startCorner = 0;
                            function cornerAt(index) {
                                return corners[(startCorner + index) % 4];
                            }
                            ctx.moveTo.apply(ctx, cornerAt(0));
                            for (var i = 1; i < 4; i++) ctx.lineTo.apply(ctx, cornerAt(i));
                            ctx.fill();
                            if (vm.borderWidth) {
                                ctx.stroke();
                            }
                        },
                        inRange: function(mouseX, mouseY) {
                            var vm = this._view;
                            var inRange = false;
                            if (vm) {
                                if (vm.x < vm.base) {
                                    inRange = mouseY >= vm.y - vm.height / 2 && mouseY <= vm.y + vm.height / 2 && (mouseX >= vm.x && mouseX <= vm.base);
                                } else {
                                    inRange = mouseY >= vm.y - vm.height / 2 && mouseY <= vm.y + vm.height / 2 && (mouseX >= vm.base && mouseX <= vm.x);
                                }
                            }
                            return inRange;
                        }
                    });
                    rectangle.pivot();
                },
                calculateBarBase: function(datasetIndex, index) {
                    var meta = this.getMeta();
                    var xScale = this.getScaleForId(meta.xAxisID);
                    var base = 0;
                    if (xScale.options.stacked) {
                        var value = this.chart.data.datasets[datasetIndex].data[index];
                        if (value < 0) {
                            for (var i = 0; i < datasetIndex; i++) {
                                var negDS = this.chart.data.datasets[i];
                                var negDSMeta = this.chart.getDatasetMeta(i);
                                if (negDSMeta.bar && negDSMeta.xAxisID === xScale.id && this.chart.isDatasetVisible(i)) {
                                    base += negDS.data[index] < 0 ? negDS.data[index] : 0;
                                }
                            }
                        } else {
                            for (var j = 0; j < datasetIndex; j++) {
                                var posDS = this.chart.data.datasets[j];
                                var posDSMeta = this.chart.getDatasetMeta(j);
                                if (posDSMeta.bar && posDSMeta.xAxisID === xScale.id && this.chart.isDatasetVisible(j)) {
                                    base += posDS.data[index] > 0 ? posDS.data[index] : 0;
                                }
                            }
                        }
                        return xScale.getPixelForValue(base);
                    }
                    return xScale.getBasePixel();
                },
                getRuler: function(index) {
                    var meta = this.getMeta();
                    var yScale = this.getScaleForId(meta.yAxisID);
                    var datasetCount = this.getBarCount();
                    var tickHeight;
                    if (yScale.options.type === "category") {
                        tickHeight = yScale.getPixelForTick(index + 1) - yScale.getPixelForTick(index);
                    } else {
                        tickHeight = yScale.width / yScale.ticks.length;
                    }
                    var categoryHeight = tickHeight * yScale.options.categoryPercentage;
                    var categorySpacing = (tickHeight - tickHeight * yScale.options.categoryPercentage) / 2;
                    var fullBarHeight = categoryHeight / datasetCount;
                    if (yScale.ticks.length !== this.chart.data.labels.length) {
                        var perc = yScale.ticks.length / this.chart.data.labels.length;
                        fullBarHeight = fullBarHeight * perc;
                    }
                    var barHeight = fullBarHeight * yScale.options.barPercentage;
                    var barSpacing = fullBarHeight - fullBarHeight * yScale.options.barPercentage;
                    return {
                        datasetCount: datasetCount,
                        tickHeight: tickHeight,
                        categoryHeight: categoryHeight,
                        categorySpacing: categorySpacing,
                        fullBarHeight: fullBarHeight,
                        barHeight: barHeight,
                        barSpacing: barSpacing
                    };
                },
                calculateBarHeight: function(index) {
                    var yScale = this.getScaleForId(this.getMeta().yAxisID);
                    var ruler = this.getRuler(index);
                    return yScale.options.stacked ? ruler.categoryHeight : ruler.barHeight;
                },
                calculateBarX: function(index, datasetIndex) {
                    var meta = this.getMeta();
                    var xScale = this.getScaleForId(meta.xAxisID);
                    var value = this.getDataset().data[index];
                    if (xScale.options.stacked) {
                        var sumPos = 0, sumNeg = 0;
                        for (var i = 0; i < datasetIndex; i++) {
                            var ds = this.chart.data.datasets[i];
                            var dsMeta = this.chart.getDatasetMeta(i);
                            if (dsMeta.bar && dsMeta.xAxisID === xScale.id && this.chart.isDatasetVisible(i)) {
                                if (ds.data[index] < 0) {
                                    sumNeg += ds.data[index] || 0;
                                } else {
                                    sumPos += ds.data[index] || 0;
                                }
                            }
                        }
                        if (value < 0) {
                            return xScale.getPixelForValue(sumNeg + value);
                        } else {
                            return xScale.getPixelForValue(sumPos + value);
                        }
                    }
                    return xScale.getPixelForValue(value);
                },
                calculateBarY: function(index, datasetIndex) {
                    var meta = this.getMeta();
                    var yScale = this.getScaleForId(meta.yAxisID);
                    var barIndex = this.getBarIndex(datasetIndex);
                    var ruler = this.getRuler(index);
                    var topTick = yScale.getPixelForValue(null, index, datasetIndex, this.chart.isCombo);
                    topTick -= this.chart.isCombo ? ruler.tickHeight / 2 : 0;
                    if (yScale.options.stacked) {
                        return topTick + ruler.categoryHeight / 2 + ruler.categorySpacing;
                    }
                    return topTick + ruler.barHeight / 2 + ruler.categorySpacing + ruler.barHeight * barIndex + ruler.barSpacing / 2 + ruler.barSpacing * barIndex;
                }
            });
        };
    }, {} ],
    16: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            Chart.defaults.bubble = {
                hover: {
                    mode: "single"
                },
                scales: {
                    xAxes: [ {
                        type: "linear",
                        position: "bottom",
                        id: "x-axis-0"
                    } ],
                    yAxes: [ {
                        type: "linear",
                        position: "left",
                        id: "y-axis-0"
                    } ]
                },
                tooltips: {
                    callbacks: {
                        title: function(tooltipItems, data) {
                            return "";
                        },
                        label: function(tooltipItem, data) {
                            var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || "";
                            var dataPoint = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            return datasetLabel + ": (" + dataPoint.x + ", " + dataPoint.y + ", " + dataPoint.r + ")";
                        }
                    }
                }
            };
            Chart.controllers.bubble = Chart.DatasetController.extend({
                dataElementType: Chart.elements.Point,
                update: function update(reset) {
                    var meta = this.getMeta();
                    var points = meta.data;
                    helpers.each(points, function(point, index) {
                        this.updateElement(point, index, reset);
                    }, this);
                },
                updateElement: function(point, index, reset) {
                    var meta = this.getMeta();
                    var xScale = this.getScaleForId(meta.xAxisID);
                    var yScale = this.getScaleForId(meta.yAxisID);
                    var custom = point.custom || {};
                    var dataset = this.getDataset();
                    var data = dataset.data[index];
                    var pointElementOptions = this.chart.options.elements.point;
                    helpers.extend(point, {
                        _xScale: xScale,
                        _yScale: yScale,
                        _datasetIndex: this.index,
                        _index: index,
                        _model: {
                            x: reset ? xScale.getPixelForDecimal(.5) : xScale.getPixelForValue(data, index, this.index, this.chart.isCombo),
                            y: reset ? yScale.getBasePixel() : yScale.getPixelForValue(data, index, this.index),
                            radius: reset ? 0 : custom.radius ? custom.radius : this.getRadius(data),
                            backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, pointElementOptions.backgroundColor),
                            borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, pointElementOptions.borderColor),
                            borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, pointElementOptions.borderWidth),
                            hitRadius: custom.hitRadius ? custom.hitRadius : helpers.getValueAtIndexOrDefault(dataset.hitRadius, index, pointElementOptions.hitRadius)
                        }
                    });
                    var model = point._model;
                    model.skip = custom.skip ? custom.skip : isNaN(model.x) || isNaN(model.y);
                    point.pivot();
                },
                getRadius: function(value) {
                    return value.r || this.chart.options.elements.point.radius;
                },
                setHoverStyle: function(point) {
                    var dataset = this.chart.data.datasets[point._datasetIndex];
                    var index = point._index;
                    var custom = point.custom || {};
                    var model = point._model;
                    model.radius = custom.hoverRadius ? custom.hoverRadius : helpers.getValueAtIndexOrDefault(dataset.hoverRadius, index, this.chart.options.elements.point.hoverRadius) + this.getRadius(this.getDataset().data[point._index]);
                    model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.hoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
                    model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.hoverBorderColor, index, helpers.getHoverColor(model.borderColor));
                    model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
                },
                removeHoverStyle: function(point) {
                    var dataset = this.chart.data.datasets[point._datasetIndex];
                    var index = point._index;
                    var custom = point.custom || {};
                    var model = point._model;
                    var pointElementOptions = this.chart.options.elements.point;
                    model.radius = custom.radius ? custom.radius : this.getRadius(dataset.data[point._index]);
                    model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, pointElementOptions.backgroundColor);
                    model.borderColor = custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, pointElementOptions.borderColor);
                    model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, pointElementOptions.borderWidth);
                }
            });
        };
    }, {} ],
    17: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers, defaults = Chart.defaults;
            defaults.doughnut = {
                animation: {
                    animateRotate: true,
                    animateScale: false
                },
                aspectRatio: 1,
                hover: {
                    mode: "single"
                },
                legendCallback: function(chart) {
                    var text = [];
                    text.push('<ul class="' + chart.id + '-legend">');
                    var data = chart.data;
                    var datasets = data.datasets;
                    var labels = data.labels;
                    if (datasets.length) {
                        for (var i = 0; i < datasets[0].data.length; ++i) {
                            text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '"></span>');
                            if (labels[i]) {
                                text.push(labels[i]);
                            }
                            text.push("</li>");
                        }
                    }
                    text.push("</ul>");
                    return text.join("");
                },
                legend: {
                    labels: {
                        generateLabels: function(chart) {
                            var data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                return data.labels.map(function(label, i) {
                                    var meta = chart.getDatasetMeta(0);
                                    var ds = data.datasets[0];
                                    var arc = meta.data[i];
                                    var custom = arc.custom || {};
                                    var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
                                    var arcOpts = chart.options.elements.arc;
                                    var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
                                    var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                                    var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
                                    return {
                                        text: label,
                                        fillStyle: fill,
                                        strokeStyle: stroke,
                                        lineWidth: bw,
                                        hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                                        index: i
                                    };
                                });
                            } else {
                                return [];
                            }
                        }
                    },
                    onClick: function(e, legendItem) {
                        var index = legendItem.index;
                        var chart = this.chart;
                        var i, ilen, meta;
                        for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
                            meta = chart.getDatasetMeta(i);
                            meta.data[index].hidden = !meta.data[index].hidden;
                        }
                        chart.update();
                    }
                },
                cutoutPercentage: 50,
                rotation: Math.PI * -.5,
                circumference: Math.PI * 2,
                tooltips: {
                    callbacks: {
                        title: function() {
                            return "";
                        },
                        label: function(tooltipItem, data) {
                            return data.labels[tooltipItem.index] + ": " + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        }
                    }
                }
            };
            defaults.pie = helpers.clone(defaults.doughnut);
            helpers.extend(defaults.pie, {
                cutoutPercentage: 0
            });
            Chart.controllers.doughnut = Chart.controllers.pie = Chart.DatasetController.extend({
                dataElementType: Chart.elements.Arc,
                linkScales: helpers.noop,
                getRingIndex: function getRingIndex(datasetIndex) {
                    var ringIndex = 0;
                    for (var j = 0; j < datasetIndex; ++j) {
                        if (this.chart.isDatasetVisible(j)) {
                            ++ringIndex;
                        }
                    }
                    return ringIndex;
                },
                update: function update(reset) {
                    var _this = this;
                    var chart = _this.chart, chartArea = chart.chartArea, opts = chart.options, arcOpts = opts.elements.arc, availableWidth = chartArea.right - chartArea.left - arcOpts.borderWidth, availableHeight = chartArea.bottom - chartArea.top - arcOpts.borderWidth, minSize = Math.min(availableWidth, availableHeight), offset = {
                        x: 0,
                        y: 0
                    }, meta = _this.getMeta(), cutoutPercentage = opts.cutoutPercentage, circumference = opts.circumference;
                    if (circumference < Math.PI * 2) {
                        var startAngle = opts.rotation % (Math.PI * 2);
                        startAngle += Math.PI * 2 * (startAngle >= Math.PI ? -1 : startAngle < -Math.PI ? 1 : 0);
                        var endAngle = startAngle + circumference;
                        var start = {
                            x: Math.cos(startAngle),
                            y: Math.sin(startAngle)
                        };
                        var end = {
                            x: Math.cos(endAngle),
                            y: Math.sin(endAngle)
                        };
                        var contains0 = startAngle <= 0 && 0 <= endAngle || startAngle <= Math.PI * 2 && Math.PI * 2 <= endAngle;
                        var contains90 = startAngle <= Math.PI * .5 && Math.PI * .5 <= endAngle || startAngle <= Math.PI * 2.5 && Math.PI * 2.5 <= endAngle;
                        var contains180 = startAngle <= -Math.PI && -Math.PI <= endAngle || startAngle <= Math.PI && Math.PI <= endAngle;
                        var contains270 = startAngle <= -Math.PI * .5 && -Math.PI * .5 <= endAngle || startAngle <= Math.PI * 1.5 && Math.PI * 1.5 <= endAngle;
                        var cutout = cutoutPercentage / 100;
                        var min = {
                            x: contains180 ? -1 : Math.min(start.x * (start.x < 0 ? 1 : cutout), end.x * (end.x < 0 ? 1 : cutout)),
                            y: contains270 ? -1 : Math.min(start.y * (start.y < 0 ? 1 : cutout), end.y * (end.y < 0 ? 1 : cutout))
                        };
                        var max = {
                            x: contains0 ? 1 : Math.max(start.x * (start.x > 0 ? 1 : cutout), end.x * (end.x > 0 ? 1 : cutout)),
                            y: contains90 ? 1 : Math.max(start.y * (start.y > 0 ? 1 : cutout), end.y * (end.y > 0 ? 1 : cutout))
                        };
                        var size = {
                            width: (max.x - min.x) * .5,
                            height: (max.y - min.y) * .5
                        };
                        minSize = Math.min(availableWidth / size.width, availableHeight / size.height);
                        offset = {
                            x: (max.x + min.x) * -.5,
                            y: (max.y + min.y) * -.5
                        };
                    }
                    chart.outerRadius = Math.max(minSize / 2, 0);
                    chart.innerRadius = Math.max(cutoutPercentage ? chart.outerRadius / 100 * cutoutPercentage : 1, 0);
                    chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();
                    chart.offsetX = offset.x * chart.outerRadius;
                    chart.offsetY = offset.y * chart.outerRadius;
                    meta.total = _this.calculateTotal();
                    _this.outerRadius = chart.outerRadius - chart.radiusLength * _this.getRingIndex(_this.index);
                    _this.innerRadius = _this.outerRadius - chart.radiusLength;
                    helpers.each(meta.data, function(arc, index) {
                        _this.updateElement(arc, index, reset);
                    });
                },
                updateElement: function(arc, index, reset) {
                    var _this = this;
                    var chart = _this.chart, chartArea = chart.chartArea, opts = chart.options, animationOpts = opts.animation, arcOpts = opts.elements.arc, centerX = (chartArea.left + chartArea.right) / 2, centerY = (chartArea.top + chartArea.bottom) / 2, startAngle = opts.rotation, endAngle = opts.rotation, dataset = _this.getDataset(), circumference = reset && animationOpts.animateRotate ? 0 : arc.hidden ? 0 : _this.calculateCircumference(dataset.data[index]) * (opts.circumference / (2 * Math.PI)), innerRadius = reset && animationOpts.animateScale ? 0 : _this.innerRadius, outerRadius = reset && animationOpts.animateScale ? 0 : _this.outerRadius, custom = arc.custom || {}, valueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
                    helpers.extend(arc, {
                        _datasetIndex: _this.index,
                        _index: index,
                        _model: {
                            x: centerX + chart.offsetX,
                            y: centerY + chart.offsetY,
                            startAngle: startAngle,
                            endAngle: endAngle,
                            circumference: circumference,
                            outerRadius: outerRadius,
                            innerRadius: innerRadius,
                            label: valueAtIndexOrDefault(dataset.label, index, chart.data.labels[index])
                        }
                    });
                    var model = arc._model;
                    model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : valueAtIndexOrDefault(dataset.backgroundColor, index, arcOpts.backgroundColor);
                    model.hoverBackgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : valueAtIndexOrDefault(dataset.hoverBackgroundColor, index, arcOpts.hoverBackgroundColor);
                    model.borderWidth = custom.borderWidth ? custom.borderWidth : valueAtIndexOrDefault(dataset.borderWidth, index, arcOpts.borderWidth);
                    model.borderColor = custom.borderColor ? custom.borderColor : valueAtIndexOrDefault(dataset.borderColor, index, arcOpts.borderColor);
                    if (!reset || !animationOpts.animateRotate) {
                        if (index === 0) {
                            model.startAngle = opts.rotation;
                        } else {
                            model.startAngle = _this.getMeta().data[index - 1]._model.endAngle;
                        }
                        model.endAngle = model.startAngle + model.circumference;
                    }
                    arc.pivot();
                },
                removeHoverStyle: function(arc) {
                    Chart.DatasetController.prototype.removeHoverStyle.call(this, arc, this.chart.options.elements.arc);
                },
                calculateTotal: function() {
                    var dataset = this.getDataset();
                    var meta = this.getMeta();
                    var total = 0;
                    var value;
                    helpers.each(meta.data, function(element, index) {
                        value = dataset.data[index];
                        if (!isNaN(value) && !element.hidden) {
                            total += Math.abs(value);
                        }
                    });
                    return total;
                },
                calculateCircumference: function(value) {
                    var total = this.getMeta().total;
                    if (total > 0 && !isNaN(value)) {
                        return Math.PI * 2 * (value / total);
                    } else {
                        return 0;
                    }
                }
            });
        };
    }, {} ],
    18: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            Chart.defaults.line = {
                showLines: true,
                hover: {
                    mode: "label"
                },
                scales: {
                    xAxes: [ {
                        type: "category",
                        id: "x-axis-0"
                    } ],
                    yAxes: [ {
                        type: "linear",
                        id: "y-axis-0"
                    } ]
                }
            };
            Chart.controllers.line = Chart.DatasetController.extend({
                datasetElementType: Chart.elements.Line,
                dataElementType: Chart.elements.Point,
                addElementAndReset: function(index) {
                    var me = this;
                    var options = me.chart.options;
                    Chart.DatasetController.prototype.addElementAndReset.call(me, index);
                    if (options.showLines && options.elements.line.tension !== 0) {
                        me.updateBezierControlPoints();
                    }
                },
                update: function update(reset) {
                    var me = this;
                    var meta = me.getMeta();
                    var line = meta.dataset;
                    var points = meta.data || [];
                    var options = me.chart.options;
                    var lineElementOptions = options.elements.line;
                    var scale = me.getScaleForId(meta.yAxisID);
                    var i, ilen, dataset, custom;
                    if (options.showLines) {
                        dataset = me.getDataset();
                        custom = line.custom || {};
                        if (dataset.tension !== undefined && dataset.lineTension === undefined) {
                            dataset.lineTension = dataset.tension;
                        }
                        line._scale = scale;
                        line._datasetIndex = me.index;
                        line._children = points;
                        line._model = {
                            tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.lineTension, lineElementOptions.tension),
                            backgroundColor: custom.backgroundColor ? custom.backgroundColor : dataset.backgroundColor || lineElementOptions.backgroundColor,
                            borderWidth: custom.borderWidth ? custom.borderWidth : dataset.borderWidth || lineElementOptions.borderWidth,
                            borderColor: custom.borderColor ? custom.borderColor : dataset.borderColor || lineElementOptions.borderColor,
                            borderCapStyle: custom.borderCapStyle ? custom.borderCapStyle : dataset.borderCapStyle || lineElementOptions.borderCapStyle,
                            borderDash: custom.borderDash ? custom.borderDash : dataset.borderDash || lineElementOptions.borderDash,
                            borderDashOffset: custom.borderDashOffset ? custom.borderDashOffset : dataset.borderDashOffset || lineElementOptions.borderDashOffset,
                            borderJoinStyle: custom.borderJoinStyle ? custom.borderJoinStyle : dataset.borderJoinStyle || lineElementOptions.borderJoinStyle,
                            fill: custom.fill ? custom.fill : dataset.fill !== undefined ? dataset.fill : lineElementOptions.fill,
                            scaleTop: scale.top,
                            scaleBottom: scale.bottom,
                            scaleZero: scale.getBasePixel()
                        };
                        line.pivot();
                    }
                    for (i = 0, ilen = points.length; i < ilen; ++i) {
                        me.updateElement(points[i], i, reset);
                    }
                    if (options.showLines && lineElementOptions.tension !== 0) {
                        me.updateBezierControlPoints();
                    }
                },
                getPointBackgroundColor: function(point, index) {
                    var backgroundColor = this.chart.options.elements.point.backgroundColor;
                    var dataset = this.getDataset();
                    var custom = point.custom || {};
                    if (custom.backgroundColor) {
                        backgroundColor = custom.backgroundColor;
                    } else if (dataset.pointBackgroundColor) {
                        backgroundColor = helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, backgroundColor);
                    } else if (dataset.backgroundColor) {
                        backgroundColor = dataset.backgroundColor;
                    }
                    return backgroundColor;
                },
                getPointBorderColor: function(point, index) {
                    var borderColor = this.chart.options.elements.point.borderColor;
                    var dataset = this.getDataset();
                    var custom = point.custom || {};
                    if (custom.borderColor) {
                        borderColor = custom.borderColor;
                    } else if (dataset.pointBorderColor) {
                        borderColor = helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, borderColor);
                    } else if (dataset.borderColor) {
                        borderColor = dataset.borderColor;
                    }
                    return borderColor;
                },
                getPointBorderWidth: function(point, index) {
                    var borderWidth = this.chart.options.elements.point.borderWidth;
                    var dataset = this.getDataset();
                    var custom = point.custom || {};
                    if (custom.borderWidth) {
                        borderWidth = custom.borderWidth;
                    } else if (dataset.pointBorderWidth) {
                        borderWidth = helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, borderWidth);
                    } else if (dataset.borderWidth) {
                        borderWidth = dataset.borderWidth;
                    }
                    return borderWidth;
                },
                updateElement: function(point, index, reset) {
                    var me = this;
                    var meta = me.getMeta();
                    var custom = point.custom || {};
                    var dataset = me.getDataset();
                    var datasetIndex = me.index;
                    var value = dataset.data[index];
                    var yScale = me.getScaleForId(meta.yAxisID);
                    var xScale = me.getScaleForId(meta.xAxisID);
                    var pointOptions = me.chart.options.elements.point;
                    var x, y;
                    if (dataset.radius !== undefined && dataset.pointRadius === undefined) {
                        dataset.pointRadius = dataset.radius;
                    }
                    if (dataset.hitRadius !== undefined && dataset.pointHitRadius === undefined) {
                        dataset.pointHitRadius = dataset.hitRadius;
                    }
                    x = xScale.getPixelForValue(value, index, datasetIndex, me.chart.isCombo);
                    y = reset ? yScale.getBasePixel() : me.calculatePointY(value, index, datasetIndex, me.chart.isCombo);
                    point._xScale = xScale;
                    point._yScale = yScale;
                    point._datasetIndex = datasetIndex;
                    point._index = index;
                    point._model = {
                        x: x,
                        y: y,
                        skip: custom.skip || isNaN(x) || isNaN(y),
                        radius: custom.radius || helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, pointOptions.radius),
                        pointStyle: custom.pointStyle || helpers.getValueAtIndexOrDefault(dataset.pointStyle, index, pointOptions.pointStyle),
                        backgroundColor: me.getPointBackgroundColor(point, index),
                        borderColor: me.getPointBorderColor(point, index),
                        borderWidth: me.getPointBorderWidth(point, index),
                        tension: meta.dataset._model ? meta.dataset._model.tension : 0,
                        hitRadius: custom.hitRadius || helpers.getValueAtIndexOrDefault(dataset.pointHitRadius, index, pointOptions.hitRadius)
                    };
                },
                calculatePointY: function(value, index, datasetIndex, isCombo) {
                    var me = this;
                    var chart = me.chart;
                    var meta = me.getMeta();
                    var yScale = me.getScaleForId(meta.yAxisID);
                    var sumPos = 0;
                    var sumNeg = 0;
                    var i, ds, dsMeta;
                    if (yScale.options.stacked) {
                        for (i = 0; i < datasetIndex; i++) {
                            ds = chart.data.datasets[i];
                            dsMeta = chart.getDatasetMeta(i);
                            if (dsMeta.type === "line" && chart.isDatasetVisible(i)) {
                                if (ds.data[index] < 0) {
                                    sumNeg += ds.data[index] || 0;
                                } else {
                                    sumPos += ds.data[index] || 0;
                                }
                            }
                        }
                        if (value < 0) {
                            return yScale.getPixelForValue(sumNeg + value);
                        } else {
                            return yScale.getPixelForValue(sumPos + value);
                        }
                    }
                    return yScale.getPixelForValue(value);
                },
                updateBezierControlPoints: function() {
                    var meta = this.getMeta();
                    var area = this.chart.chartArea;
                    var points = meta.data || [];
                    var i, ilen, point, model, controlPoints;
                    for (i = 0, ilen = points.length; i < ilen; ++i) {
                        point = points[i];
                        model = point._model;
                        controlPoints = helpers.splineCurve(helpers.previousItem(points, i)._model, model, helpers.nextItem(points, i)._model, meta.dataset._model.tension);
                        model.controlPointPreviousX = Math.max(Math.min(controlPoints.previous.x, area.right), area.left);
                        model.controlPointPreviousY = Math.max(Math.min(controlPoints.previous.y, area.bottom), area.top);
                        model.controlPointNextX = Math.max(Math.min(controlPoints.next.x, area.right), area.left);
                        model.controlPointNextY = Math.max(Math.min(controlPoints.next.y, area.bottom), area.top);
                        point.pivot();
                    }
                },
                draw: function(ease) {
                    var meta = this.getMeta();
                    var points = meta.data || [];
                    var easingDecimal = ease || 1;
                    var i, ilen;
                    for (i = 0, ilen = points.length; i < ilen; ++i) {
                        points[i].transition(easingDecimal);
                    }
                    if (this.chart.options.showLines) {
                        meta.dataset.transition(easingDecimal).draw();
                    }
                    for (i = 0, ilen = points.length; i < ilen; ++i) {
                        points[i].draw();
                    }
                },
                setHoverStyle: function(point) {
                    var dataset = this.chart.data.datasets[point._datasetIndex];
                    var index = point._index;
                    var custom = point.custom || {};
                    var model = point._model;
                    model.radius = custom.hoverRadius || helpers.getValueAtIndexOrDefault(dataset.pointHoverRadius, index, this.chart.options.elements.point.hoverRadius);
                    model.backgroundColor = custom.hoverBackgroundColor || helpers.getValueAtIndexOrDefault(dataset.pointHoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
                    model.borderColor = custom.hoverBorderColor || helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderColor, index, helpers.getHoverColor(model.borderColor));
                    model.borderWidth = custom.hoverBorderWidth || helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderWidth, index, model.borderWidth);
                },
                removeHoverStyle: function(point) {
                    var me = this;
                    var dataset = me.chart.data.datasets[point._datasetIndex];
                    var index = point._index;
                    var custom = point.custom || {};
                    var model = point._model;
                    if (dataset.radius !== undefined && dataset.pointRadius === undefined) {
                        dataset.pointRadius = dataset.radius;
                    }
                    model.radius = custom.radius || helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, me.chart.options.elements.point.radius);
                    model.backgroundColor = me.getPointBackgroundColor(point, index);
                    model.borderColor = me.getPointBorderColor(point, index);
                    model.borderWidth = me.getPointBorderWidth(point, index);
                }
            });
        };
    }, {} ],
    19: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            Chart.defaults.polarArea = {
                scale: {
                    type: "radialLinear",
                    lineArc: true
                },
                animation: {
                    animateRotate: true,
                    animateScale: true
                },
                aspectRatio: 1,
                legendCallback: function(chart) {
                    var text = [];
                    text.push('<ul class="' + chart.id + '-legend">');
                    var data = chart.data;
                    var datasets = data.datasets;
                    var labels = data.labels;
                    if (datasets.length) {
                        for (var i = 0; i < datasets[0].data.length; ++i) {
                            text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '">');
                            if (labels[i]) {
                                text.push(labels[i]);
                            }
                            text.push("</span></li>");
                        }
                    }
                    text.push("</ul>");
                    return text.join("");
                },
                legend: {
                    labels: {
                        generateLabels: function(chart) {
                            var data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                return data.labels.map(function(label, i) {
                                    var meta = chart.getDatasetMeta(0);
                                    var ds = data.datasets[0];
                                    var arc = meta.data[i];
                                    var custom = arc.custom || {};
                                    var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
                                    var arcOpts = chart.options.elements.arc;
                                    var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
                                    var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                                    var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
                                    return {
                                        text: label,
                                        fillStyle: fill,
                                        strokeStyle: stroke,
                                        lineWidth: bw,
                                        hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                                        index: i
                                    };
                                });
                            } else {
                                return [];
                            }
                        }
                    },
                    onClick: function(e, legendItem) {
                        var index = legendItem.index;
                        var chart = this.chart;
                        var i, ilen, meta;
                        for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
                            meta = chart.getDatasetMeta(i);
                            meta.data[index].hidden = !meta.data[index].hidden;
                        }
                        chart.update();
                    }
                },
                tooltips: {
                    callbacks: {
                        title: function() {
                            return "";
                        },
                        label: function(tooltipItem, data) {
                            return data.labels[tooltipItem.index] + ": " + tooltipItem.yLabel;
                        }
                    }
                }
            };
            Chart.controllers.polarArea = Chart.DatasetController.extend({
                dataElementType: Chart.elements.Arc,
                linkScales: helpers.noop,
                update: function update(reset) {
                    var _this = this;
                    var chart = _this.chart;
                    var chartArea = chart.chartArea;
                    var meta = this.getMeta();
                    var opts = chart.options;
                    var arcOpts = opts.elements.arc;
                    var minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
                    chart.outerRadius = Math.max((minSize - arcOpts.borderWidth / 2) / 2, 0);
                    chart.innerRadius = Math.max(opts.cutoutPercentage ? chart.outerRadius / 100 * opts.cutoutPercentage : 1, 0);
                    chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();
                    _this.outerRadius = chart.outerRadius - chart.radiusLength * _this.index;
                    _this.innerRadius = _this.outerRadius - chart.radiusLength;
                    meta.count = _this.countVisibleElements();
                    helpers.each(meta.data, function(arc, index) {
                        _this.updateElement(arc, index, reset);
                    });
                },
                updateElement: function(arc, index, reset) {
                    var _this = this;
                    var chart = _this.chart;
                    var chartArea = chart.chartArea;
                    var dataset = _this.getDataset();
                    var opts = chart.options;
                    var animationOpts = opts.animation;
                    var arcOpts = opts.elements.arc;
                    var custom = arc.custom || {};
                    var scale = chart.scale;
                    var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
                    var labels = chart.data.labels;
                    var circumference = _this.calculateCircumference(dataset.data[index]);
                    var centerX = (chartArea.left + chartArea.right) / 2;
                    var centerY = (chartArea.top + chartArea.bottom) / 2;
                    var visibleCount = 0;
                    var meta = _this.getMeta();
                    for (var i = 0; i < index; ++i) {
                        if (!isNaN(dataset.data[i]) && !meta.data[i].hidden) {
                            ++visibleCount;
                        }
                    }
                    var distance = arc.hidden ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);
                    var startAngle = -.5 * Math.PI + circumference * visibleCount;
                    var endAngle = startAngle + (arc.hidden ? 0 : circumference);
                    var resetModel = {
                        x: centerX,
                        y: centerY,
                        innerRadius: 0,
                        outerRadius: animationOpts.animateScale ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]),
                        startAngle: animationOpts.animateRotate ? Math.PI * -.5 : startAngle,
                        endAngle: animationOpts.animateRotate ? Math.PI * -.5 : endAngle,
                        backgroundColor: custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(dataset.backgroundColor, index, arcOpts.backgroundColor),
                        borderWidth: custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(dataset.borderWidth, index, arcOpts.borderWidth),
                        borderColor: custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(dataset.borderColor, index, arcOpts.borderColor),
                        label: getValueAtIndexOrDefault(labels, index, labels[index])
                    };
                    helpers.extend(arc, {
                        _datasetIndex: _this.index,
                        _index: index,
                        _scale: scale,
                        _model: reset ? resetModel : {
                            x: centerX,
                            y: centerY,
                            innerRadius: 0,
                            outerRadius: distance,
                            startAngle: startAngle,
                            endAngle: endAngle,
                            backgroundColor: custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(dataset.backgroundColor, index, arcOpts.backgroundColor),
                            borderWidth: custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(dataset.borderWidth, index, arcOpts.borderWidth),
                            borderColor: custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(dataset.borderColor, index, arcOpts.borderColor),
                            label: getValueAtIndexOrDefault(labels, index, labels[index])
                        }
                    });
                    arc.pivot();
                },
                removeHoverStyle: function(arc) {
                    Chart.DatasetController.prototype.removeHoverStyle.call(this, arc, this.chart.options.elements.arc);
                },
                countVisibleElements: function() {
                    var dataset = this.getDataset();
                    var meta = this.getMeta();
                    var count = 0;
                    helpers.each(meta.data, function(element, index) {
                        if (!isNaN(dataset.data[index]) && !element.hidden) {
                            count++;
                        }
                    });
                    return count;
                },
                calculateCircumference: function(value) {
                    var count = this.getMeta().count;
                    if (count > 0 && !isNaN(value)) {
                        return 2 * Math.PI / count;
                    } else {
                        return 0;
                    }
                }
            });
        };
    }, {} ],
    20: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            Chart.defaults.radar = {
                scale: {
                    type: "radialLinear"
                },
                elements: {
                    line: {
                        tension: 0
                    }
                }
            };
            Chart.controllers.radar = Chart.DatasetController.extend({
                datasetElementType: Chart.elements.Line,
                dataElementType: Chart.elements.Point,
                linkScales: helpers.noop,
                addElementAndReset: function(index) {
                    Chart.DatasetController.prototype.addElementAndReset.call(this, index);
                    this.updateBezierControlPoints();
                },
                update: function update(reset) {
                    var meta = this.getMeta();
                    var line = meta.dataset;
                    var points = meta.data;
                    var custom = line.custom || {};
                    var dataset = this.getDataset();
                    var lineElementOptions = this.chart.options.elements.line;
                    var scale = this.chart.scale;
                    if (dataset.tension !== undefined && dataset.lineTension === undefined) {
                        dataset.lineTension = dataset.tension;
                    }
                    helpers.extend(meta.dataset, {
                        _datasetIndex: this.index,
                        _children: points,
                        _loop: true,
                        _model: {
                            tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.lineTension, lineElementOptions.tension),
                            backgroundColor: custom.backgroundColor ? custom.backgroundColor : dataset.backgroundColor || lineElementOptions.backgroundColor,
                            borderWidth: custom.borderWidth ? custom.borderWidth : dataset.borderWidth || lineElementOptions.borderWidth,
                            borderColor: custom.borderColor ? custom.borderColor : dataset.borderColor || lineElementOptions.borderColor,
                            fill: custom.fill ? custom.fill : dataset.fill !== undefined ? dataset.fill : lineElementOptions.fill,
                            borderCapStyle: custom.borderCapStyle ? custom.borderCapStyle : dataset.borderCapStyle || lineElementOptions.borderCapStyle,
                            borderDash: custom.borderDash ? custom.borderDash : dataset.borderDash || lineElementOptions.borderDash,
                            borderDashOffset: custom.borderDashOffset ? custom.borderDashOffset : dataset.borderDashOffset || lineElementOptions.borderDashOffset,
                            borderJoinStyle: custom.borderJoinStyle ? custom.borderJoinStyle : dataset.borderJoinStyle || lineElementOptions.borderJoinStyle,
                            scaleTop: scale.top,
                            scaleBottom: scale.bottom,
                            scaleZero: scale.getBasePosition()
                        }
                    });
                    meta.dataset.pivot();
                    helpers.each(points, function(point, index) {
                        this.updateElement(point, index, reset);
                    }, this);
                    this.updateBezierControlPoints();
                },
                updateElement: function(point, index, reset) {
                    var custom = point.custom || {};
                    var dataset = this.getDataset();
                    var scale = this.chart.scale;
                    var pointElementOptions = this.chart.options.elements.point;
                    var pointPosition = scale.getPointPositionForValue(index, dataset.data[index]);
                    helpers.extend(point, {
                        _datasetIndex: this.index,
                        _index: index,
                        _scale: scale,
                        _model: {
                            x: reset ? scale.xCenter : pointPosition.x,
                            y: reset ? scale.yCenter : pointPosition.y,
                            tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.tension, this.chart.options.elements.line.tension),
                            radius: custom.radius ? custom.radius : helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, pointElementOptions.radius),
                            backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, pointElementOptions.backgroundColor),
                            borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, pointElementOptions.borderColor),
                            borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, pointElementOptions.borderWidth),
                            pointStyle: custom.pointStyle ? custom.pointStyle : helpers.getValueAtIndexOrDefault(dataset.pointStyle, index, pointElementOptions.pointStyle),
                            hitRadius: custom.hitRadius ? custom.hitRadius : helpers.getValueAtIndexOrDefault(dataset.hitRadius, index, pointElementOptions.hitRadius)
                        }
                    });
                    point._model.skip = custom.skip ? custom.skip : isNaN(point._model.x) || isNaN(point._model.y);
                },
                updateBezierControlPoints: function() {
                    var chartArea = this.chart.chartArea;
                    var meta = this.getMeta();
                    helpers.each(meta.data, function(point, index) {
                        var model = point._model;
                        var controlPoints = helpers.splineCurve(helpers.previousItem(meta.data, index, true)._model, model, helpers.nextItem(meta.data, index, true)._model, model.tension);
                        model.controlPointPreviousX = Math.max(Math.min(controlPoints.previous.x, chartArea.right), chartArea.left);
                        model.controlPointPreviousY = Math.max(Math.min(controlPoints.previous.y, chartArea.bottom), chartArea.top);
                        model.controlPointNextX = Math.max(Math.min(controlPoints.next.x, chartArea.right), chartArea.left);
                        model.controlPointNextY = Math.max(Math.min(controlPoints.next.y, chartArea.bottom), chartArea.top);
                        point.pivot();
                    }, this);
                },
                draw: function(ease) {
                    var meta = this.getMeta();
                    var easingDecimal = ease || 1;
                    helpers.each(meta.data, function(point, index) {
                        point.transition(easingDecimal);
                    });
                    meta.dataset.transition(easingDecimal).draw();
                    helpers.each(meta.data, function(point) {
                        point.draw();
                    });
                },
                setHoverStyle: function(point) {
                    var dataset = this.chart.data.datasets[point._datasetIndex];
                    var custom = point.custom || {};
                    var index = point._index;
                    var model = point._model;
                    model.radius = custom.hoverRadius ? custom.hoverRadius : helpers.getValueAtIndexOrDefault(dataset.pointHoverRadius, index, this.chart.options.elements.point.hoverRadius);
                    model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointHoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
                    model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderColor, index, helpers.getHoverColor(model.borderColor));
                    model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderWidth, index, model.borderWidth);
                },
                removeHoverStyle: function(point) {
                    var dataset = this.chart.data.datasets[point._datasetIndex];
                    var custom = point.custom || {};
                    var index = point._index;
                    var model = point._model;
                    var pointElementOptions = this.chart.options.elements.point;
                    model.radius = custom.radius ? custom.radius : helpers.getValueAtIndexOrDefault(dataset.radius, index, pointElementOptions.radius);
                    model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, pointElementOptions.backgroundColor);
                    model.borderColor = custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, pointElementOptions.borderColor);
                    model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, pointElementOptions.borderWidth);
                }
            });
        };
    }, {} ],
    21: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            Chart.defaults.global.animation = {
                duration: 1e3,
                easing: "easeOutQuart",
                onProgress: helpers.noop,
                onComplete: helpers.noop
            };
            Chart.Animation = Chart.Element.extend({
                currentStep: null,
                numSteps: 60,
                easing: "",
                render: null,
                onAnimationProgress: null,
                onAnimationComplete: null
            });
            Chart.animationService = {
                frameDuration: 17,
                animations: [],
                dropFrames: 0,
                request: null,
                addAnimation: function(chartInstance, animationObject, duration, lazy) {
                    if (!lazy) {
                        chartInstance.animating = true;
                    }
                    for (var index = 0; index < this.animations.length; ++index) {
                        if (this.animations[index].chartInstance === chartInstance) {
                            this.animations[index].animationObject = animationObject;
                            return;
                        }
                    }
                    this.animations.push({
                        chartInstance: chartInstance,
                        animationObject: animationObject
                    });
                    if (this.animations.length === 1) {
                        this.requestAnimationFrame();
                    }
                },
                cancelAnimation: function(chartInstance) {
                    var index = helpers.findIndex(this.animations, function(animationWrapper) {
                        return animationWrapper.chartInstance === chartInstance;
                    });
                    if (index !== -1) {
                        this.animations.splice(index, 1);
                        chartInstance.animating = false;
                    }
                },
                requestAnimationFrame: function() {
                    var me = this;
                    if (me.request === null) {
                        me.request = helpers.requestAnimFrame.call(window, function() {
                            me.request = null;
                            me.startDigest();
                        });
                    }
                },
                startDigest: function() {
                    var startTime = Date.now();
                    var framesToDrop = 0;
                    if (this.dropFrames > 1) {
                        framesToDrop = Math.floor(this.dropFrames);
                        this.dropFrames = this.dropFrames % 1;
                    }
                    var i = 0;
                    while (i < this.animations.length) {
                        if (this.animations[i].animationObject.currentStep === null) {
                            this.animations[i].animationObject.currentStep = 0;
                        }
                        this.animations[i].animationObject.currentStep += 1 + framesToDrop;
                        if (this.animations[i].animationObject.currentStep > this.animations[i].animationObject.numSteps) {
                            this.animations[i].animationObject.currentStep = this.animations[i].animationObject.numSteps;
                        }
                        this.animations[i].animationObject.render(this.animations[i].chartInstance, this.animations[i].animationObject);
                        if (this.animations[i].animationObject.onAnimationProgress && this.animations[i].animationObject.onAnimationProgress.call) {
                            this.animations[i].animationObject.onAnimationProgress.call(this.animations[i].chartInstance, this.animations[i]);
                        }
                        if (this.animations[i].animationObject.currentStep === this.animations[i].animationObject.numSteps) {
                            if (this.animations[i].animationObject.onAnimationComplete && this.animations[i].animationObject.onAnimationComplete.call) {
                                this.animations[i].animationObject.onAnimationComplete.call(this.animations[i].chartInstance, this.animations[i]);
                            }
                            this.animations[i].chartInstance.animating = false;
                            this.animations.splice(i, 1);
                        } else {
                            ++i;
                        }
                    }
                    var endTime = Date.now();
                    var dropFrames = (endTime - startTime) / this.frameDuration;
                    this.dropFrames += dropFrames;
                    if (this.animations.length > 0) {
                        this.requestAnimationFrame();
                    }
                }
            };
        };
    }, {} ],
    22: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            Chart.types = {};
            Chart.instances = {};
            Chart.controllers = {};
            Chart.Controller = function(instance) {
                this.chart = instance;
                this.config = instance.config;
                this.options = this.config.options = helpers.configMerge(Chart.defaults.global, Chart.defaults[this.config.type], this.config.options || {});
                this.id = helpers.uid();
                Object.defineProperty(this, "data", {
                    get: function() {
                        return this.config.data;
                    }
                });
                Chart.instances[this.id] = this;
                if (this.options.responsive) {
                    this.resize(true);
                }
                this.initialize();
                return this;
            };
            helpers.extend(Chart.Controller.prototype, {
                initialize: function initialize() {
                    Chart.pluginService.notifyPlugins("beforeInit", [ this ]);
                    this.bindEvents();
                    this.ensureScalesHaveIDs();
                    this.buildOrUpdateControllers();
                    this.buildScales();
                    this.buildSurroundingItems();
                    this.updateLayout();
                    this.resetElements();
                    this.initToolTip();
                    this.update();
                    Chart.pluginService.notifyPlugins("afterInit", [ this ]);
                    return this;
                },
                clear: function clear() {
                    helpers.clear(this.chart);
                    return this;
                },
                stop: function stop() {
                    Chart.animationService.cancelAnimation(this);
                    return this;
                },
                resize: function resize(silent) {
                    var canvas = this.chart.canvas;
                    var newWidth = helpers.getMaximumWidth(this.chart.canvas);
                    var newHeight = this.options.maintainAspectRatio && isNaN(this.chart.aspectRatio) === false && isFinite(this.chart.aspectRatio) && this.chart.aspectRatio !== 0 ? newWidth / this.chart.aspectRatio : helpers.getMaximumHeight(this.chart.canvas);
                    var sizeChanged = this.chart.width !== newWidth || this.chart.height !== newHeight;
                    if (!sizeChanged) return this;
                    canvas.width = this.chart.width = newWidth;
                    canvas.height = this.chart.height = newHeight;
                    helpers.retinaScale(this.chart);
                    if (!silent) {
                        this.stop();
                        this.update(this.options.responsiveAnimationDuration);
                    }
                    return this;
                },
                ensureScalesHaveIDs: function ensureScalesHaveIDs() {
                    var options = this.options;
                    var scalesOptions = options.scales || {};
                    var scaleOptions = options.scale;
                    helpers.each(scalesOptions.xAxes, function(xAxisOptions, index) {
                        xAxisOptions.id = xAxisOptions.id || "x-axis-" + index;
                    });
                    helpers.each(scalesOptions.yAxes, function(yAxisOptions, index) {
                        yAxisOptions.id = yAxisOptions.id || "y-axis-" + index;
                    });
                    if (scaleOptions) {
                        scaleOptions.id = scaleOptions.id || "scale";
                    }
                },
                buildScales: function buildScales() {
                    var me = this;
                    var options = me.options;
                    var scales = me.scales = {};
                    var items = [];
                    if (options.scales) {
                        items = items.concat((options.scales.xAxes || []).map(function(xAxisOptions) {
                            return {
                                options: xAxisOptions,
                                dtype: "category"
                            };
                        }), (options.scales.yAxes || []).map(function(yAxisOptions) {
                            return {
                                options: yAxisOptions,
                                dtype: "linear"
                            };
                        }));
                    }
                    if (options.scale) {
                        items.push({
                            options: options.scale,
                            dtype: "radialLinear",
                            isDefault: true
                        });
                    }
                    helpers.each(items, function(item, index) {
                        var scaleOptions = item.options;
                        var scaleType = helpers.getValueOrDefault(scaleOptions.type, item.dtype);
                        var scaleClass = Chart.scaleService.getScaleConstructor(scaleType);
                        if (!scaleClass) {
                            return;
                        }
                        var scale = new scaleClass({
                            id: scaleOptions.id,
                            options: scaleOptions,
                            ctx: me.chart.ctx,
                            chart: me
                        });
                        scales[scale.id] = scale;
                        if (item.isDefault) {
                            me.scale = scale;
                        }
                    });
                    Chart.scaleService.addScalesToLayout(this);
                },
                buildSurroundingItems: function() {
                    if (this.options.title) {
                        this.titleBlock = new Chart.Title({
                            ctx: this.chart.ctx,
                            options: this.options.title,
                            chart: this
                        });
                        Chart.layoutService.addBox(this, this.titleBlock);
                    }
                    if (this.options.legend) {
                        this.legend = new Chart.Legend({
                            ctx: this.chart.ctx,
                            options: this.options.legend,
                            chart: this
                        });
                        Chart.layoutService.addBox(this, this.legend);
                    }
                },
                updateLayout: function() {
                    Chart.layoutService.update(this, this.chart.width, this.chart.height);
                },
                buildOrUpdateControllers: function buildOrUpdateControllers() {
                    var types = [];
                    var newControllers = [];
                    helpers.each(this.data.datasets, function(dataset, datasetIndex) {
                        var meta = this.getDatasetMeta(datasetIndex);
                        if (!meta.type) {
                            meta.type = dataset.type || this.config.type;
                        }
                        types.push(meta.type);
                        if (meta.controller) {
                            meta.controller.updateIndex(datasetIndex);
                        } else {
                            meta.controller = new Chart.controllers[meta.type](this, datasetIndex);
                            newControllers.push(meta.controller);
                        }
                    }, this);
                    if (types.length > 1) {
                        for (var i = 1; i < types.length; i++) {
                            if (types[i] !== types[i - 1]) {
                                this.isCombo = true;
                                break;
                            }
                        }
                    }
                    return newControllers;
                },
                resetElements: function resetElements() {
                    helpers.each(this.data.datasets, function(dataset, datasetIndex) {
                        this.getDatasetMeta(datasetIndex).controller.reset();
                    }, this);
                },
                update: function update(animationDuration, lazy) {
                    Chart.pluginService.notifyPlugins("beforeUpdate", [ this ]);
                    this.tooltip._data = this.data;
                    var newControllers = this.buildOrUpdateControllers();
                    helpers.each(this.data.datasets, function(dataset, datasetIndex) {
                        this.getDatasetMeta(datasetIndex).controller.buildOrUpdateElements();
                    }, this);
                    Chart.layoutService.update(this, this.chart.width, this.chart.height);
                    Chart.pluginService.notifyPlugins("afterScaleUpdate", [ this ]);
                    helpers.each(newControllers, function(controller) {
                        controller.reset();
                    });
                    helpers.each(this.data.datasets, function(dataset, datasetIndex) {
                        this.getDatasetMeta(datasetIndex).controller.update();
                    }, this);
                    Chart.pluginService.notifyPlugins("afterUpdate", [ this ]);
                    this.render(animationDuration, lazy);
                },
                render: function render(duration, lazy) {
                    Chart.pluginService.notifyPlugins("beforeRender", [ this ]);
                    var animationOptions = this.options.animation;
                    if (animationOptions && (typeof duration !== "undefined" && duration !== 0 || typeof duration === "undefined" && animationOptions.duration !== 0)) {
                        var animation = new Chart.Animation();
                        animation.numSteps = (duration || animationOptions.duration) / 16.66;
                        animation.easing = animationOptions.easing;
                        animation.render = function(chartInstance, animationObject) {
                            var easingFunction = helpers.easingEffects[animationObject.easing];
                            var stepDecimal = animationObject.currentStep / animationObject.numSteps;
                            var easeDecimal = easingFunction(stepDecimal);
                            chartInstance.draw(easeDecimal, stepDecimal, animationObject.currentStep);
                        };
                        animation.onAnimationProgress = animationOptions.onProgress;
                        animation.onAnimationComplete = animationOptions.onComplete;
                        Chart.animationService.addAnimation(this, animation, duration, lazy);
                    } else {
                        this.draw();
                        if (animationOptions && animationOptions.onComplete && animationOptions.onComplete.call) {
                            animationOptions.onComplete.call(this);
                        }
                    }
                    return this;
                },
                draw: function(ease) {
                    var easingDecimal = ease || 1;
                    this.clear();
                    Chart.pluginService.notifyPlugins("beforeDraw", [ this, easingDecimal ]);
                    helpers.each(this.boxes, function(box) {
                        box.draw(this.chartArea);
                    }, this);
                    if (this.scale) {
                        this.scale.draw();
                    }
                    var context = this.chart.ctx;
                    context.save();
                    context.beginPath();
                    context.rect(this.chartArea.left, this.chartArea.top, this.chartArea.right - this.chartArea.left, this.chartArea.bottom - this.chartArea.top);
                    context.clip();
                    helpers.each(this.data.datasets, function(dataset, datasetIndex) {
                        if (this.isDatasetVisible(datasetIndex)) {
                            this.getDatasetMeta(datasetIndex).controller.draw(ease);
                        }
                    }, this, true);
                    context.restore();
                    this.tooltip.transition(easingDecimal).draw();
                    Chart.pluginService.notifyPlugins("afterDraw", [ this, easingDecimal ]);
                },
                getElementAtEvent: function(e) {
                    var eventPosition = helpers.getRelativePosition(e, this.chart);
                    var elementsArray = [];
                    helpers.each(this.data.datasets, function(dataset, datasetIndex) {
                        if (this.isDatasetVisible(datasetIndex)) {
                            var meta = this.getDatasetMeta(datasetIndex);
                            helpers.each(meta.data, function(element, index) {
                                if (element.inRange(eventPosition.x, eventPosition.y)) {
                                    elementsArray.push(element);
                                    return elementsArray;
                                }
                            });
                        }
                    }, this);
                    return elementsArray;
                },
                getElementsAtEvent: function(e) {
                    var eventPosition = helpers.getRelativePosition(e, this.chart);
                    var elementsArray = [];
                    var found = function() {
                        if (this.data.datasets) {
                            for (var i = 0; i < this.data.datasets.length; i++) {
                                var meta = this.getDatasetMeta(i);
                                if (this.isDatasetVisible(i)) {
                                    for (var j = 0; j < meta.data.length; j++) {
                                        if (meta.data[j].inRange(eventPosition.x, eventPosition.y)) {
                                            return meta.data[j];
                                        }
                                    }
                                }
                            }
                        }
                    }.call(this);
                    if (!found) {
                        return elementsArray;
                    }
                    helpers.each(this.data.datasets, function(dataset, datasetIndex) {
                        if (this.isDatasetVisible(datasetIndex)) {
                            var meta = this.getDatasetMeta(datasetIndex);
                            elementsArray.push(meta.data[found._index]);
                        }
                    }, this);
                    return elementsArray;
                },
                getElementsAtEventForMode: function(e, mode) {
                    var me = this;
                    switch (mode) {
                      case "single":
                        return me.getElementAtEvent(e);

                      case "label":
                        return me.getElementsAtEvent(e);

                      case "dataset":
                        return me.getDatasetAtEvent(e);

                      default:
                        return e;
                    }
                },
                getDatasetAtEvent: function(e) {
                    var elementsArray = this.getElementAtEvent(e);
                    if (elementsArray.length > 0) {
                        elementsArray = this.getDatasetMeta(elementsArray[0]._datasetIndex).data;
                    }
                    return elementsArray;
                },
                getDatasetMeta: function(datasetIndex) {
                    var dataset = this.data.datasets[datasetIndex];
                    if (!dataset._meta) {
                        dataset._meta = {};
                    }
                    var meta = dataset._meta[this.id];
                    if (!meta) {
                        meta = dataset._meta[this.id] = {
                            type: null,
                            data: [],
                            dataset: null,
                            controller: null,
                            hidden: null,
                            xAxisID: null,
                            yAxisID: null
                        };
                    }
                    return meta;
                },
                getVisibleDatasetCount: function() {
                    var count = 0;
                    for (var i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
                        if (this.isDatasetVisible(i)) {
                            count++;
                        }
                    }
                    return count;
                },
                isDatasetVisible: function(datasetIndex) {
                    var meta = this.getDatasetMeta(datasetIndex);
                    return typeof meta.hidden === "boolean" ? !meta.hidden : !this.data.datasets[datasetIndex].hidden;
                },
                generateLegend: function generateLegend() {
                    return this.options.legendCallback(this);
                },
                destroy: function destroy() {
                    this.clear();
                    helpers.unbindEvents(this, this.events);
                    helpers.removeResizeListener(this.chart.canvas.parentNode);
                    var canvas = this.chart.canvas;
                    canvas.width = this.chart.width;
                    canvas.height = this.chart.height;
                    if (this.chart.originalDevicePixelRatio !== undefined) {
                        this.chart.ctx.scale(1 / this.chart.originalDevicePixelRatio, 1 / this.chart.originalDevicePixelRatio);
                    }
                    canvas.style.width = this.chart.originalCanvasStyleWidth;
                    canvas.style.height = this.chart.originalCanvasStyleHeight;
                    Chart.pluginService.notifyPlugins("destroy", [ this ]);
                    delete Chart.instances[this.id];
                },
                toBase64Image: function toBase64Image() {
                    return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments);
                },
                initToolTip: function initToolTip() {
                    this.tooltip = new Chart.Tooltip({
                        _chart: this.chart,
                        _chartInstance: this,
                        _data: this.data,
                        _options: this.options
                    }, this);
                },
                bindEvents: function bindEvents() {
                    helpers.bindEvents(this, this.options.events, function(evt) {
                        this.eventHandler(evt);
                    });
                },
                updateHoverStyle: function(elements, mode, enabled) {
                    var method = enabled ? "setHoverStyle" : "removeHoverStyle";
                    var element, i, ilen;
                    switch (mode) {
                      case "single":
                        elements = [ elements[0] ];
                        break;

                      case "label":
                      case "dataset":
                        break;

                      default:
                        return;
                    }
                    for (i = 0, ilen = elements.length; i < ilen; ++i) {
                        element = elements[i];
                        if (element) {
                            this.getDatasetMeta(element._datasetIndex).controller[method](element);
                        }
                    }
                },
                eventHandler: function eventHandler(e) {
                    var me = this;
                    var tooltip = me.tooltip;
                    var options = me.options || {};
                    var hoverOptions = options.hover;
                    var tooltipsOptions = options.tooltips;
                    me.lastActive = me.lastActive || [];
                    me.lastTooltipActive = me.lastTooltipActive || [];
                    if (e.type === "mouseout") {
                        me.active = [];
                        me.tooltipActive = [];
                    } else {
                        me.active = me.getElementsAtEventForMode(e, hoverOptions.mode);
                        me.tooltipActive = me.getElementsAtEventForMode(e, tooltipsOptions.mode);
                    }
                    if (hoverOptions.onHover) {
                        hoverOptions.onHover.call(me, me.active);
                    }
                    if (e.type === "mouseup" || e.type === "click") {
                        if (options.onClick) {
                            options.onClick.call(me, e, me.active);
                        }
                        if (me.legend && me.legend.handleEvent) {
                            me.legend.handleEvent(e);
                        }
                    }
                    if (me.lastActive.length) {
                        me.updateHoverStyle(me.lastActive, hoverOptions.mode, false);
                    }
                    if (me.active.length && hoverOptions.mode) {
                        me.updateHoverStyle(me.active, hoverOptions.mode, true);
                    }
                    if (tooltipsOptions.enabled || tooltipsOptions.custom) {
                        tooltip.initialize();
                        tooltip._active = me.tooltipActive;
                        tooltip.update(true);
                    }
                    tooltip.pivot();
                    if (!me.animating) {
                        if (!helpers.arrayEquals(me.active, me.lastActive) || !helpers.arrayEquals(me.tooltipActive, me.lastTooltipActive)) {
                            me.stop();
                            if (tooltipsOptions.enabled || tooltipsOptions.custom) {
                                tooltip.update(true);
                            }
                            me.render(hoverOptions.animationDuration, true);
                        }
                    }
                    me.lastActive = me.active;
                    me.lastTooltipActive = me.tooltipActive;
                    return me;
                }
            });
        };
    }, {} ],
    23: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            var noop = helpers.noop;
            Chart.DatasetController = function(chart, datasetIndex) {
                this.initialize.call(this, chart, datasetIndex);
            };
            helpers.extend(Chart.DatasetController.prototype, {
                datasetElementType: null,
                dataElementType: null,
                initialize: function(chart, datasetIndex) {
                    this.chart = chart;
                    this.index = datasetIndex;
                    this.linkScales();
                    this.addElements();
                },
                updateIndex: function(datasetIndex) {
                    this.index = datasetIndex;
                },
                linkScales: function() {
                    var meta = this.getMeta();
                    var dataset = this.getDataset();
                    if (meta.xAxisID === null) {
                        meta.xAxisID = dataset.xAxisID || this.chart.options.scales.xAxes[0].id;
                    }
                    if (meta.yAxisID === null) {
                        meta.yAxisID = dataset.yAxisID || this.chart.options.scales.yAxes[0].id;
                    }
                },
                getDataset: function() {
                    return this.chart.data.datasets[this.index];
                },
                getMeta: function() {
                    return this.chart.getDatasetMeta(this.index);
                },
                getScaleForId: function(scaleID) {
                    return this.chart.scales[scaleID];
                },
                reset: function() {
                    this.update(true);
                },
                createMetaDataset: function() {
                    var me = this;
                    var type = me.datasetElementType;
                    return type && new type({
                        _chart: me.chart.chart,
                        _datasetIndex: me.index
                    });
                },
                createMetaData: function(index) {
                    var me = this;
                    var type = me.dataElementType;
                    return type && new type({
                        _chart: me.chart.chart,
                        _datasetIndex: me.index,
                        _index: index
                    });
                },
                addElements: function() {
                    var me = this;
                    var meta = me.getMeta();
                    var data = me.getDataset().data || [];
                    var metaData = meta.data;
                    var i, ilen;
                    for (i = 0, ilen = data.length; i < ilen; ++i) {
                        metaData[i] = metaData[i] || me.createMetaData(meta, i);
                    }
                    meta.dataset = meta.dataset || me.createMetaDataset();
                },
                addElementAndReset: function(index) {
                    var me = this;
                    var element = me.createMetaData(index);
                    me.getMeta().data.splice(index, 0, element);
                    me.updateElement(element, index, true);
                },
                buildOrUpdateElements: function buildOrUpdateElements() {
                    var meta = this.getMeta(), md = meta.data, numData = this.getDataset().data.length, numMetaData = md.length;
                    if (numData < numMetaData) {
                        md.splice(numData, numMetaData - numData);
                    } else if (numData > numMetaData) {
                        for (var index = numMetaData; index < numData; ++index) {
                            this.addElementAndReset(index);
                        }
                    }
                },
                update: noop,
                draw: function(ease) {
                    var easingDecimal = ease || 1;
                    helpers.each(this.getMeta().data, function(element, index) {
                        element.transition(easingDecimal).draw();
                    });
                },
                removeHoverStyle: function(element, elementOpts) {
                    var dataset = this.chart.data.datasets[element._datasetIndex], index = element._index, custom = element.custom || {}, valueOrDefault = helpers.getValueAtIndexOrDefault, color = helpers.color, model = element._model;
                    model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : valueOrDefault(dataset.backgroundColor, index, elementOpts.backgroundColor);
                    model.borderColor = custom.borderColor ? custom.borderColor : valueOrDefault(dataset.borderColor, index, elementOpts.borderColor);
                    model.borderWidth = custom.borderWidth ? custom.borderWidth : valueOrDefault(dataset.borderWidth, index, elementOpts.borderWidth);
                },
                setHoverStyle: function(element) {
                    var dataset = this.chart.data.datasets[element._datasetIndex], index = element._index, custom = element.custom || {}, valueOrDefault = helpers.getValueAtIndexOrDefault, color = helpers.color, getHoverColor = helpers.getHoverColor, model = element._model;
                    model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : valueOrDefault(dataset.hoverBackgroundColor, index, getHoverColor(model.backgroundColor));
                    model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : valueOrDefault(dataset.hoverBorderColor, index, getHoverColor(model.borderColor));
                    model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : valueOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
                }
            });
            Chart.DatasetController.extend = helpers.inherits;
        };
    }, {} ],
    24: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            Chart.elements = {};
            Chart.Element = function(configuration) {
                helpers.extend(this, configuration);
                this.initialize.apply(this, arguments);
            };
            helpers.extend(Chart.Element.prototype, {
                initialize: function() {
                    this.hidden = false;
                },
                pivot: function() {
                    if (!this._view) {
                        this._view = helpers.clone(this._model);
                    }
                    this._start = helpers.clone(this._view);
                    return this;
                },
                transition: function(ease) {
                    if (!this._view) {
                        this._view = helpers.clone(this._model);
                    }
                    if (ease === 1) {
                        this._view = this._model;
                        this._start = null;
                        return this;
                    }
                    if (!this._start) {
                        this.pivot();
                    }
                    helpers.each(this._model, function(value, key) {
                        if (key[0] === "_") {} else if (!this._view.hasOwnProperty(key)) {
                            if (typeof value === "number" && !isNaN(this._view[key])) {
                                this._view[key] = value * ease;
                            } else {
                                this._view[key] = value;
                            }
                        } else if (value === this._view[key]) {} else if (typeof value === "string") {
                            try {
                                var color = helpers.color(this._model[key]).mix(helpers.color(this._start[key]), ease);
                                this._view[key] = color.rgbString();
                            } catch (err) {
                                this._view[key] = value;
                            }
                        } else if (typeof value === "number") {
                            var startVal = this._start[key] !== undefined && isNaN(this._start[key]) === false ? this._start[key] : 0;
                            this._view[key] = (this._model[key] - startVal) * ease + startVal;
                        } else {
                            this._view[key] = value;
                        }
                    }, this);
                    return this;
                },
                tooltipPosition: function() {
                    return {
                        x: this._model.x,
                        y: this._model.y
                    };
                },
                hasValue: function() {
                    return helpers.isNumber(this._model.x) && helpers.isNumber(this._model.y);
                }
            });
            Chart.Element.extend = helpers.inherits;
        };
    }, {} ],
    25: [ function(require, module, exports) {
        "use strict";
        var color = require("chartjs-color");
        module.exports = function(Chart) {
            var helpers = Chart.helpers = {};
            helpers.each = function(loopable, callback, self, reverse) {
                var i, len;
                if (helpers.isArray(loopable)) {
                    len = loopable.length;
                    if (reverse) {
                        for (i = len - 1; i >= 0; i--) {
                            callback.call(self, loopable[i], i);
                        }
                    } else {
                        for (i = 0; i < len; i++) {
                            callback.call(self, loopable[i], i);
                        }
                    }
                } else if (typeof loopable === "object") {
                    var keys = Object.keys(loopable);
                    len = keys.length;
                    for (i = 0; i < len; i++) {
                        callback.call(self, loopable[keys[i]], keys[i]);
                    }
                }
            };
            helpers.clone = function(obj) {
                var objClone = {};
                helpers.each(obj, function(value, key) {
                    if (helpers.isArray(value)) {
                        objClone[key] = value.slice(0);
                    } else if (typeof value === "object" && value !== null) {
                        objClone[key] = helpers.clone(value);
                    } else {
                        objClone[key] = value;
                    }
                });
                return objClone;
            };
            helpers.extend = function(base) {
                var len = arguments.length;
                var additionalArgs = [];
                for (var i = 1; i < len; i++) {
                    additionalArgs.push(arguments[i]);
                }
                helpers.each(additionalArgs, function(extensionObject) {
                    helpers.each(extensionObject, function(value, key) {
                        base[key] = value;
                    });
                });
                return base;
            };
            helpers.configMerge = function(_base) {
                var base = helpers.clone(_base);
                helpers.each(Array.prototype.slice.call(arguments, 1), function(extension) {
                    helpers.each(extension, function(value, key) {
                        if (key === "scales") {
                            base[key] = helpers.scaleMerge(base.hasOwnProperty(key) ? base[key] : {}, value);
                        } else if (key === "scale") {
                            base[key] = helpers.configMerge(base.hasOwnProperty(key) ? base[key] : {}, Chart.scaleService.getScaleDefaults(value.type), value);
                        } else if (base.hasOwnProperty(key) && helpers.isArray(base[key]) && helpers.isArray(value)) {
                            var baseArray = base[key];
                            helpers.each(value, function(valueObj, index) {
                                if (index < baseArray.length) {
                                    if (typeof baseArray[index] === "object" && baseArray[index] !== null && typeof valueObj === "object" && valueObj !== null) {
                                        baseArray[index] = helpers.configMerge(baseArray[index], valueObj);
                                    } else {
                                        baseArray[index] = valueObj;
                                    }
                                } else {
                                    baseArray.push(valueObj);
                                }
                            });
                        } else if (base.hasOwnProperty(key) && typeof base[key] === "object" && base[key] !== null && typeof value === "object") {
                            base[key] = helpers.configMerge(base[key], value);
                        } else {
                            base[key] = value;
                        }
                    });
                });
                return base;
            };
            helpers.extendDeep = function(_base) {
                return _extendDeep.apply(this, arguments);
                function _extendDeep(dst) {
                    helpers.each(arguments, function(obj) {
                        if (obj !== dst) {
                            helpers.each(obj, function(value, key) {
                                if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {
                                    _extendDeep(dst[key], value);
                                } else {
                                    dst[key] = value;
                                }
                            });
                        }
                    });
                    return dst;
                }
            };
            helpers.scaleMerge = function(_base, extension) {
                var base = helpers.clone(_base);
                helpers.each(extension, function(value, key) {
                    if (key === "xAxes" || key === "yAxes") {
                        if (base.hasOwnProperty(key)) {
                            helpers.each(value, function(valueObj, index) {
                                var axisType = helpers.getValueOrDefault(valueObj.type, key === "xAxes" ? "category" : "linear");
                                var axisDefaults = Chart.scaleService.getScaleDefaults(axisType);
                                if (index >= base[key].length || !base[key][index].type) {
                                    base[key].push(helpers.configMerge(axisDefaults, valueObj));
                                } else if (valueObj.type && valueObj.type !== base[key][index].type) {
                                    base[key][index] = helpers.configMerge(base[key][index], axisDefaults, valueObj);
                                } else {
                                    base[key][index] = helpers.configMerge(base[key][index], valueObj);
                                }
                            });
                        } else {
                            base[key] = [];
                            helpers.each(value, function(valueObj) {
                                var axisType = helpers.getValueOrDefault(valueObj.type, key === "xAxes" ? "category" : "linear");
                                base[key].push(helpers.configMerge(Chart.scaleService.getScaleDefaults(axisType), valueObj));
                            });
                        }
                    } else if (base.hasOwnProperty(key) && typeof base[key] === "object" && base[key] !== null && typeof value === "object") {
                        base[key] = helpers.configMerge(base[key], value);
                    } else {
                        base[key] = value;
                    }
                });
                return base;
            };
            helpers.getValueAtIndexOrDefault = function(value, index, defaultValue) {
                if (value === undefined || value === null) {
                    return defaultValue;
                }
                if (helpers.isArray(value)) {
                    return index < value.length ? value[index] : defaultValue;
                }
                return value;
            };
            helpers.getValueOrDefault = function(value, defaultValue) {
                return value === undefined ? defaultValue : value;
            };
            helpers.indexOf = function(arrayToSearch, item) {
                if (Array.prototype.indexOf) {
                    return arrayToSearch.indexOf(item);
                } else {
                    for (var i = 0; i < arrayToSearch.length; i++) {
                        if (arrayToSearch[i] === item) return i;
                    }
                    return -1;
                }
            };
            helpers.where = function(collection, filterCallback) {
                if (helpers.isArray(collection) && Array.prototype.filter) {
                    return collection.filter(filterCallback);
                } else {
                    var filtered = [];
                    helpers.each(collection, function(item) {
                        if (filterCallback(item)) {
                            filtered.push(item);
                        }
                    });
                    return filtered;
                }
            };
            helpers.findIndex = function(arrayToSearch, callback, thisArg) {
                var index = -1;
                if (Array.prototype.findIndex) {
                    index = arrayToSearch.findIndex(callback, thisArg);
                } else {
                    for (var i = 0; i < arrayToSearch.length; ++i) {
                        thisArg = thisArg !== undefined ? thisArg : arrayToSearch;
                        if (callback.call(thisArg, arrayToSearch[i], i, arrayToSearch)) {
                            index = i;
                            break;
                        }
                    }
                }
                return index;
            };
            helpers.findNextWhere = function(arrayToSearch, filterCallback, startIndex) {
                if (startIndex === undefined || startIndex === null) {
                    startIndex = -1;
                }
                for (var i = startIndex + 1; i < arrayToSearch.length; i++) {
                    var currentItem = arrayToSearch[i];
                    if (filterCallback(currentItem)) {
                        return currentItem;
                    }
                }
            };
            helpers.findPreviousWhere = function(arrayToSearch, filterCallback, startIndex) {
                if (startIndex === undefined || startIndex === null) {
                    startIndex = arrayToSearch.length;
                }
                for (var i = startIndex - 1; i >= 0; i--) {
                    var currentItem = arrayToSearch[i];
                    if (filterCallback(currentItem)) {
                        return currentItem;
                    }
                }
            };
            helpers.inherits = function(extensions) {
                var parent = this;
                var ChartElement = extensions && extensions.hasOwnProperty("constructor") ? extensions.constructor : function() {
                    return parent.apply(this, arguments);
                };
                var Surrogate = function() {
                    this.constructor = ChartElement;
                };
                Surrogate.prototype = parent.prototype;
                ChartElement.prototype = new Surrogate();
                ChartElement.extend = helpers.inherits;
                if (extensions) {
                    helpers.extend(ChartElement.prototype, extensions);
                }
                ChartElement.__super__ = parent.prototype;
                return ChartElement;
            };
            helpers.noop = function() {};
            helpers.uid = function() {
                var id = 0;
                return function() {
                    return id++;
                };
            }();
            helpers.warn = function(str) {
                if (console && typeof console.warn === "function") {
                    console.warn(str);
                }
            };
            helpers.isNumber = function(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            };
            helpers.almostEquals = function(x, y, epsilon) {
                return Math.abs(x - y) < epsilon;
            };
            helpers.max = function(array) {
                return array.reduce(function(max, value) {
                    if (!isNaN(value)) {
                        return Math.max(max, value);
                    } else {
                        return max;
                    }
                }, Number.NEGATIVE_INFINITY);
            };
            helpers.min = function(array) {
                return array.reduce(function(min, value) {
                    if (!isNaN(value)) {
                        return Math.min(min, value);
                    } else {
                        return min;
                    }
                }, Number.POSITIVE_INFINITY);
            };
            helpers.sign = function(x) {
                if (Math.sign) {
                    return Math.sign(x);
                } else {
                    x = +x;
                    if (x === 0 || isNaN(x)) {
                        return x;
                    }
                    return x > 0 ? 1 : -1;
                }
            };
            helpers.log10 = function(x) {
                if (Math.log10) {
                    return Math.log10(x);
                } else {
                    return Math.log(x) / Math.LN10;
                }
            };
            helpers.toRadians = function(degrees) {
                return degrees * (Math.PI / 180);
            };
            helpers.toDegrees = function(radians) {
                return radians * (180 / Math.PI);
            };
            helpers.getAngleFromPoint = function(centrePoint, anglePoint) {
                var distanceFromXCenter = anglePoint.x - centrePoint.x, distanceFromYCenter = anglePoint.y - centrePoint.y, radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
                var angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
                if (angle < -.5 * Math.PI) {
                    angle += 2 * Math.PI;
                }
                return {
                    angle: angle,
                    distance: radialDistanceFromCenter
                };
            };
            helpers.aliasPixel = function(pixelWidth) {
                return pixelWidth % 2 === 0 ? 0 : .5;
            };
            helpers.splineCurve = function(firstPoint, middlePoint, afterPoint, t) {
                var previous = firstPoint.skip ? middlePoint : firstPoint, current = middlePoint, next = afterPoint.skip ? middlePoint : afterPoint;
                var d01 = Math.sqrt(Math.pow(current.x - previous.x, 2) + Math.pow(current.y - previous.y, 2));
                var d12 = Math.sqrt(Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2));
                var s01 = d01 / (d01 + d12);
                var s12 = d12 / (d01 + d12);
                s01 = isNaN(s01) ? 0 : s01;
                s12 = isNaN(s12) ? 0 : s12;
                var fa = t * s01;
                var fb = t * s12;
                return {
                    previous: {
                        x: current.x - fa * (next.x - previous.x),
                        y: current.y - fa * (next.y - previous.y)
                    },
                    next: {
                        x: current.x + fb * (next.x - previous.x),
                        y: current.y + fb * (next.y - previous.y)
                    }
                };
            };
            helpers.nextItem = function(collection, index, loop) {
                if (loop) {
                    return index >= collection.length - 1 ? collection[0] : collection[index + 1];
                }
                return index >= collection.length - 1 ? collection[collection.length - 1] : collection[index + 1];
            };
            helpers.previousItem = function(collection, index, loop) {
                if (loop) {
                    return index <= 0 ? collection[collection.length - 1] : collection[index - 1];
                }
                return index <= 0 ? collection[0] : collection[index - 1];
            };
            helpers.niceNum = function(range, round) {
                var exponent = Math.floor(helpers.log10(range));
                var fraction = range / Math.pow(10, exponent);
                var niceFraction;
                if (round) {
                    if (fraction < 1.5) {
                        niceFraction = 1;
                    } else if (fraction < 3) {
                        niceFraction = 2;
                    } else if (fraction < 7) {
                        niceFraction = 5;
                    } else {
                        niceFraction = 10;
                    }
                } else {
                    if (fraction <= 1) {
                        niceFraction = 1;
                    } else if (fraction <= 2) {
                        niceFraction = 2;
                    } else if (fraction <= 5) {
                        niceFraction = 5;
                    } else {
                        niceFraction = 10;
                    }
                }
                return niceFraction * Math.pow(10, exponent);
            };
            var easingEffects = helpers.easingEffects = {
                linear: function(t) {
                    return t;
                },
                easeInQuad: function(t) {
                    return t * t;
                },
                easeOutQuad: function(t) {
                    return -1 * t * (t - 2);
                },
                easeInOutQuad: function(t) {
                    if ((t /= 1 / 2) < 1) {
                        return 1 / 2 * t * t;
                    }
                    return -1 / 2 * (--t * (t - 2) - 1);
                },
                easeInCubic: function(t) {
                    return t * t * t;
                },
                easeOutCubic: function(t) {
                    return 1 * ((t = t / 1 - 1) * t * t + 1);
                },
                easeInOutCubic: function(t) {
                    if ((t /= 1 / 2) < 1) {
                        return 1 / 2 * t * t * t;
                    }
                    return 1 / 2 * ((t -= 2) * t * t + 2);
                },
                easeInQuart: function(t) {
                    return t * t * t * t;
                },
                easeOutQuart: function(t) {
                    return -1 * ((t = t / 1 - 1) * t * t * t - 1);
                },
                easeInOutQuart: function(t) {
                    if ((t /= 1 / 2) < 1) {
                        return 1 / 2 * t * t * t * t;
                    }
                    return -1 / 2 * ((t -= 2) * t * t * t - 2);
                },
                easeInQuint: function(t) {
                    return 1 * (t /= 1) * t * t * t * t;
                },
                easeOutQuint: function(t) {
                    return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
                },
                easeInOutQuint: function(t) {
                    if ((t /= 1 / 2) < 1) {
                        return 1 / 2 * t * t * t * t * t;
                    }
                    return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
                },
                easeInSine: function(t) {
                    return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
                },
                easeOutSine: function(t) {
                    return 1 * Math.sin(t / 1 * (Math.PI / 2));
                },
                easeInOutSine: function(t) {
                    return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
                },
                easeInExpo: function(t) {
                    return t === 0 ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
                },
                easeOutExpo: function(t) {
                    return t === 1 ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
                },
                easeInOutExpo: function(t) {
                    if (t === 0) {
                        return 0;
                    }
                    if (t === 1) {
                        return 1;
                    }
                    if ((t /= 1 / 2) < 1) {
                        return 1 / 2 * Math.pow(2, 10 * (t - 1));
                    }
                    return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
                },
                easeInCirc: function(t) {
                    if (t >= 1) {
                        return t;
                    }
                    return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
                },
                easeOutCirc: function(t) {
                    return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
                },
                easeInOutCirc: function(t) {
                    if ((t /= 1 / 2) < 1) {
                        return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
                    }
                    return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
                },
                easeInElastic: function(t) {
                    var s = 1.70158;
                    var p = 0;
                    var a = 1;
                    if (t === 0) {
                        return 0;
                    }
                    if ((t /= 1) === 1) {
                        return 1;
                    }
                    if (!p) {
                        p = 1 * .3;
                    }
                    if (a < Math.abs(1)) {
                        a = 1;
                        s = p / 4;
                    } else {
                        s = p / (2 * Math.PI) * Math.asin(1 / a);
                    }
                    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
                },
                easeOutElastic: function(t) {
                    var s = 1.70158;
                    var p = 0;
                    var a = 1;
                    if (t === 0) {
                        return 0;
                    }
                    if ((t /= 1) === 1) {
                        return 1;
                    }
                    if (!p) {
                        p = 1 * .3;
                    }
                    if (a < Math.abs(1)) {
                        a = 1;
                        s = p / 4;
                    } else {
                        s = p / (2 * Math.PI) * Math.asin(1 / a);
                    }
                    return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
                },
                easeInOutElastic: function(t) {
                    var s = 1.70158;
                    var p = 0;
                    var a = 1;
                    if (t === 0) {
                        return 0;
                    }
                    if ((t /= 1 / 2) === 2) {
                        return 1;
                    }
                    if (!p) {
                        p = 1 * (.3 * 1.5);
                    }
                    if (a < Math.abs(1)) {
                        a = 1;
                        s = p / 4;
                    } else {
                        s = p / (2 * Math.PI) * Math.asin(1 / a);
                    }
                    if (t < 1) {
                        return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
                    }
                    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * .5 + 1;
                },
                easeInBack: function(t) {
                    var s = 1.70158;
                    return 1 * (t /= 1) * t * ((s + 1) * t - s);
                },
                easeOutBack: function(t) {
                    var s = 1.70158;
                    return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
                },
                easeInOutBack: function(t) {
                    var s = 1.70158;
                    if ((t /= 1 / 2) < 1) {
                        return 1 / 2 * (t * t * (((s *= 1.525) + 1) * t - s));
                    }
                    return 1 / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
                },
                easeInBounce: function(t) {
                    return 1 - easingEffects.easeOutBounce(1 - t);
                },
                easeOutBounce: function(t) {
                    if ((t /= 1) < 1 / 2.75) {
                        return 1 * (7.5625 * t * t);
                    } else if (t < 2 / 2.75) {
                        return 1 * (7.5625 * (t -= 1.5 / 2.75) * t + .75);
                    } else if (t < 2.5 / 2.75) {
                        return 1 * (7.5625 * (t -= 2.25 / 2.75) * t + .9375);
                    } else {
                        return 1 * (7.5625 * (t -= 2.625 / 2.75) * t + .984375);
                    }
                },
                easeInOutBounce: function(t) {
                    if (t < 1 / 2) {
                        return easingEffects.easeInBounce(t * 2) * .5;
                    }
                    return easingEffects.easeOutBounce(t * 2 - 1) * .5 + 1 * .5;
                }
            };
            helpers.requestAnimFrame = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
                    return window.setTimeout(callback, 1e3 / 60);
                };
            }();
            helpers.cancelAnimFrame = function() {
                return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function(callback) {
                    return window.clearTimeout(callback, 1e3 / 60);
                };
            }();
            helpers.getRelativePosition = function(evt, chart) {
                var mouseX, mouseY;
                var e = evt.originalEvent || evt, canvas = evt.currentTarget || evt.srcElement, boundingRect = canvas.getBoundingClientRect();
                var touches = e.touches;
                if (touches && touches.length > 0) {
                    mouseX = touches[0].clientX;
                    mouseY = touches[0].clientY;
                } else {
                    mouseX = e.clientX;
                    mouseY = e.clientY;
                }
                var paddingLeft = parseFloat(helpers.getStyle(canvas, "padding-left"));
                var paddingTop = parseFloat(helpers.getStyle(canvas, "padding-top"));
                var paddingRight = parseFloat(helpers.getStyle(canvas, "padding-right"));
                var paddingBottom = parseFloat(helpers.getStyle(canvas, "padding-bottom"));
                var width = boundingRect.right - boundingRect.left - paddingLeft - paddingRight;
                var height = boundingRect.bottom - boundingRect.top - paddingTop - paddingBottom;
                mouseX = Math.round((mouseX - boundingRect.left - paddingLeft) / width * canvas.width / chart.currentDevicePixelRatio);
                mouseY = Math.round((mouseY - boundingRect.top - paddingTop) / height * canvas.height / chart.currentDevicePixelRatio);
                return {
                    x: mouseX,
                    y: mouseY
                };
            };
            helpers.addEvent = function(node, eventType, method) {
                if (node.addEventListener) {
                    node.addEventListener(eventType, method);
                } else if (node.attachEvent) {
                    node.attachEvent("on" + eventType, method);
                } else {
                    node["on" + eventType] = method;
                }
            };
            helpers.removeEvent = function(node, eventType, handler) {
                if (node.removeEventListener) {
                    node.removeEventListener(eventType, handler, false);
                } else if (node.detachEvent) {
                    node.detachEvent("on" + eventType, handler);
                } else {
                    node["on" + eventType] = helpers.noop;
                }
            };
            helpers.bindEvents = function(chartInstance, arrayOfEvents, handler) {
                var events = chartInstance.events = chartInstance.events || {};
                helpers.each(arrayOfEvents, function(eventName) {
                    events[eventName] = function() {
                        handler.apply(chartInstance, arguments);
                    };
                    helpers.addEvent(chartInstance.chart.canvas, eventName, events[eventName]);
                });
            };
            helpers.unbindEvents = function(chartInstance, arrayOfEvents) {
                var canvas = chartInstance.chart.canvas;
                helpers.each(arrayOfEvents, function(handler, eventName) {
                    helpers.removeEvent(canvas, eventName, handler);
                });
            };
            function parseMaxStyle(styleValue, node, parentProperty) {
                var valueInPixels;
                if (typeof styleValue === "string") {
                    valueInPixels = parseInt(styleValue, 10);
                    if (styleValue.indexOf("%") != -1) {
                        valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
                    }
                } else {
                    valueInPixels = styleValue;
                }
                return valueInPixels;
            }
            function isConstrainedValue(value) {
                return value !== undefined && value !== null && value !== "none";
            }
            function getConstraintDimension(domNode, maxStyle, percentageProperty) {
                var view = document.defaultView;
                var parentNode = domNode.parentNode;
                var constrainedNode = view.getComputedStyle(domNode)[maxStyle];
                var constrainedContainer = view.getComputedStyle(parentNode)[maxStyle];
                var hasCNode = isConstrainedValue(constrainedNode);
                var hasCContainer = isConstrainedValue(constrainedContainer);
                var infinity = Number.POSITIVE_INFINITY;
                if (hasCNode || hasCContainer) {
                    return Math.min(hasCNode ? parseMaxStyle(constrainedNode, domNode, percentageProperty) : infinity, hasCContainer ? parseMaxStyle(constrainedContainer, parentNode, percentageProperty) : infinity);
                }
                return "none";
            }
            helpers.getConstraintWidth = function(domNode) {
                return getConstraintDimension(domNode, "max-width", "clientWidth");
            };
            helpers.getConstraintHeight = function(domNode) {
                return getConstraintDimension(domNode, "max-height", "clientHeight");
            };
            helpers.getMaximumWidth = function(domNode) {
                var container = domNode.parentNode;
                var padding = parseInt(helpers.getStyle(container, "padding-left")) + parseInt(helpers.getStyle(container, "padding-right"));
                var w = container.clientWidth - padding;
                var cw = helpers.getConstraintWidth(domNode);
                return isNaN(cw) ? w : Math.min(w, cw);
            };
            helpers.getMaximumHeight = function(domNode) {
                var container = domNode.parentNode;
                var padding = parseInt(helpers.getStyle(container, "padding-top")) + parseInt(helpers.getStyle(container, "padding-bottom"));
                var h = container.clientHeight - padding;
                var ch = helpers.getConstraintHeight(domNode);
                return isNaN(ch) ? h : Math.min(h, ch);
            };
            helpers.getStyle = function(el, property) {
                return el.currentStyle ? el.currentStyle[property] : document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
            };
            helpers.retinaScale = function(chart) {
                var ctx = chart.ctx;
                var canvas = chart.canvas;
                var width = canvas.width;
                var height = canvas.height;
                var pixelRatio = chart.currentDevicePixelRatio = window.devicePixelRatio || 1;
                if (pixelRatio !== 1) {
                    canvas.height = height * pixelRatio;
                    canvas.width = width * pixelRatio;
                    ctx.scale(pixelRatio, pixelRatio);
                    chart.originalDevicePixelRatio = chart.originalDevicePixelRatio || pixelRatio;
                }
                canvas.style.width = width + "px";
                canvas.style.height = height + "px";
            };
            helpers.clear = function(chart) {
                chart.ctx.clearRect(0, 0, chart.width, chart.height);
            };
            helpers.fontString = function(pixelSize, fontStyle, fontFamily) {
                return fontStyle + " " + pixelSize + "px " + fontFamily;
            };
            helpers.longestText = function(ctx, font, arrayOfStrings, cache) {
                cache = cache || {};
                var data = cache.data = cache.data || {};
                var gc = cache.garbageCollect = cache.garbageCollect || [];
                if (cache.font !== font) {
                    data = cache.data = {};
                    gc = cache.garbageCollect = [];
                    cache.font = font;
                }
                ctx.font = font;
                var longest = 0;
                helpers.each(arrayOfStrings, function(string) {
                    if (string !== undefined && string !== null) {
                        var textWidth = data[string];
                        if (!textWidth) {
                            textWidth = data[string] = ctx.measureText(string).width;
                            gc.push(string);
                        }
                        if (textWidth > longest) {
                            longest = textWidth;
                        }
                    }
                });
                var gcLen = gc.length / 2;
                if (gcLen > arrayOfStrings.length) {
                    for (var i = 0; i < gcLen; i++) {
                        delete data[gc[i]];
                    }
                    gc.splice(0, gcLen);
                }
                return longest;
            };
            helpers.drawRoundedRectangle = function(ctx, x, y, width, height, radius) {
                ctx.beginPath();
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width - radius, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                ctx.lineTo(x + width, y + height - radius);
                ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                ctx.lineTo(x + radius, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                ctx.lineTo(x, y + radius);
                ctx.quadraticCurveTo(x, y, x + radius, y);
                ctx.closePath();
            };
            helpers.color = function(c) {
                if (!color) {
                    console.log("Color.js not found!");
                    return c;
                }
                if (c instanceof CanvasGradient) {
                    return color(Chart.defaults.global.defaultColor);
                }
                return color(c);
            };
            helpers.addResizeListener = function(node, callback) {
                var hiddenIframe = document.createElement("iframe");
                var hiddenIframeClass = "chartjs-hidden-iframe";
                if (hiddenIframe.classlist) {
                    hiddenIframe.classlist.add(hiddenIframeClass);
                } else {
                    hiddenIframe.setAttribute("class", hiddenIframeClass);
                }
                var style = hiddenIframe.style;
                style.width = "100%";
                style.display = "block";
                style.border = 0;
                style.height = 0;
                style.margin = 0;
                style.position = "absolute";
                style.left = 0;
                style.right = 0;
                style.top = 0;
                style.bottom = 0;
                node.insertBefore(hiddenIframe, node.firstChild);
                (hiddenIframe.contentWindow || hiddenIframe).onresize = function() {
                    if (callback) {
                        callback();
                    }
                };
            };
            helpers.removeResizeListener = function(node) {
                var hiddenIframe = node.querySelector(".chartjs-hidden-iframe");
                if (hiddenIframe) {
                    hiddenIframe.parentNode.removeChild(hiddenIframe);
                }
            };
            helpers.isArray = function(obj) {
                if (!Array.isArray) {
                    return Object.prototype.toString.call(obj) === "[object Array]";
                }
                return Array.isArray(obj);
            };
            helpers.arrayEquals = function(a0, a1) {
                var i, ilen, v0, v1;
                if (!a0 || !a1 || a0.length != a1.length) {
                    return false;
                }
                for (i = 0, ilen = a0.length; i < ilen; ++i) {
                    v0 = a0[i];
                    v1 = a1[i];
                    if (v0 instanceof Array && v1 instanceof Array) {
                        if (!helpers.arrayEquals(v0, v1)) {
                            return false;
                        }
                    } else if (v0 != v1) {
                        return false;
                    }
                }
                return true;
            };
            helpers.pushAllIfDefined = function(element, array) {
                if (typeof element === "undefined") {
                    return;
                }
                if (helpers.isArray(element)) {
                    array.push.apply(array, element);
                } else {
                    array.push(element);
                }
            };
            helpers.callCallback = function(fn, args, _tArg) {
                if (fn && typeof fn.call === "function") {
                    fn.apply(_tArg, args);
                }
            };
            helpers.getHoverColor = function(color) {
                return color instanceof CanvasPattern ? color : helpers.color(color).saturate(.5).darken(.1).rgbString();
            };
        };
    }, {
        "chartjs-color": 3
    } ],
    26: [ function(require, module, exports) {
        "use strict";
        module.exports = function() {
            var Chart = function(context, config) {
                this.config = config;
                if (context.length && context[0].getContext) {
                    context = context[0];
                }
                if (context.getContext) {
                    context = context.getContext("2d");
                }
                this.ctx = context;
                this.canvas = context.canvas;
                this.width = context.canvas.width || parseInt(Chart.helpers.getStyle(context.canvas, "width")) || Chart.helpers.getMaximumWidth(context.canvas);
                this.height = context.canvas.height || parseInt(Chart.helpers.getStyle(context.canvas, "height")) || Chart.helpers.getMaximumHeight(context.canvas);
                this.aspectRatio = this.width / this.height;
                if (isNaN(this.aspectRatio) || isFinite(this.aspectRatio) === false) {
                    this.aspectRatio = config.aspectRatio !== undefined ? config.aspectRatio : 2;
                }
                this.originalCanvasStyleWidth = context.canvas.style.width;
                this.originalCanvasStyleHeight = context.canvas.style.height;
                Chart.helpers.retinaScale(this);
                if (config) {
                    this.controller = new Chart.Controller(this);
                }
                var _this = this;
                Chart.helpers.addResizeListener(context.canvas.parentNode, function() {
                    if (_this.controller && _this.controller.config.options.responsive) {
                        _this.controller.resize();
                    }
                });
                return this.controller ? this.controller : this;
            };
            Chart.defaults = {
                global: {
                    responsive: true,
                    responsiveAnimationDuration: 0,
                    maintainAspectRatio: true,
                    events: [ "mousemove", "mouseout", "click", "touchstart", "touchmove" ],
                    hover: {
                        onHover: null,
                        mode: "single",
                        animationDuration: 400
                    },
                    onClick: null,
                    defaultColor: "rgba(0,0,0,0.1)",
                    defaultFontColor: "#666",
                    defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    defaultFontSize: 12,
                    defaultFontStyle: "normal",
                    showLines: true,
                    elements: {},
                    legendCallback: function(chart) {
                        var text = [];
                        text.push('<ul class="' + chart.id + '-legend">');
                        for (var i = 0; i < chart.data.datasets.length; i++) {
                            text.push('<li><span style="background-color:' + chart.data.datasets[i].backgroundColor + '"></span>');
                            if (chart.data.datasets[i].label) {
                                text.push(chart.data.datasets[i].label);
                            }
                            text.push("</li>");
                        }
                        text.push("</ul>");
                        return text.join("");
                    }
                }
            };
            return Chart;
        };
    }, {} ],
    27: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            Chart.layoutService = {
                defaults: {},
                addBox: function(chartInstance, box) {
                    if (!chartInstance.boxes) {
                        chartInstance.boxes = [];
                    }
                    chartInstance.boxes.push(box);
                },
                removeBox: function(chartInstance, box) {
                    if (!chartInstance.boxes) {
                        return;
                    }
                    chartInstance.boxes.splice(chartInstance.boxes.indexOf(box), 1);
                },
                update: function(chartInstance, width, height) {
                    if (!chartInstance) {
                        return;
                    }
                    var xPadding = 0;
                    var yPadding = 0;
                    var leftBoxes = helpers.where(chartInstance.boxes, function(box) {
                        return box.options.position === "left";
                    });
                    var rightBoxes = helpers.where(chartInstance.boxes, function(box) {
                        return box.options.position === "right";
                    });
                    var topBoxes = helpers.where(chartInstance.boxes, function(box) {
                        return box.options.position === "top";
                    });
                    var bottomBoxes = helpers.where(chartInstance.boxes, function(box) {
                        return box.options.position === "bottom";
                    });
                    var chartAreaBoxes = helpers.where(chartInstance.boxes, function(box) {
                        return box.options.position === "chartArea";
                    });
                    topBoxes.sort(function(a, b) {
                        return (b.options.fullWidth ? 1 : 0) - (a.options.fullWidth ? 1 : 0);
                    });
                    bottomBoxes.sort(function(a, b) {
                        return (a.options.fullWidth ? 1 : 0) - (b.options.fullWidth ? 1 : 0);
                    });
                    var chartWidth = width - 2 * xPadding;
                    var chartHeight = height - 2 * yPadding;
                    var chartAreaWidth = chartWidth / 2;
                    var chartAreaHeight = chartHeight / 2;
                    var verticalBoxWidth = (width - chartAreaWidth) / (leftBoxes.length + rightBoxes.length);
                    var horizontalBoxHeight = (height - chartAreaHeight) / (topBoxes.length + bottomBoxes.length);
                    var maxChartAreaWidth = chartWidth;
                    var maxChartAreaHeight = chartHeight;
                    var minBoxSizes = [];
                    helpers.each(leftBoxes.concat(rightBoxes, topBoxes, bottomBoxes), getMinimumBoxSize);
                    function getMinimumBoxSize(box) {
                        var minSize;
                        var isHorizontal = box.isHorizontal();
                        if (isHorizontal) {
                            minSize = box.update(box.options.fullWidth ? chartWidth : maxChartAreaWidth, horizontalBoxHeight);
                            maxChartAreaHeight -= minSize.height;
                        } else {
                            minSize = box.update(verticalBoxWidth, chartAreaHeight);
                            maxChartAreaWidth -= minSize.width;
                        }
                        minBoxSizes.push({
                            horizontal: isHorizontal,
                            minSize: minSize,
                            box: box
                        });
                    }
                    var totalLeftBoxesWidth = xPadding;
                    var totalRightBoxesWidth = xPadding;
                    var totalTopBoxesHeight = yPadding;
                    var totalBottomBoxesHeight = yPadding;
                    helpers.each(leftBoxes.concat(rightBoxes), fitBox);
                    helpers.each(leftBoxes, function(box) {
                        totalLeftBoxesWidth += box.width;
                    });
                    helpers.each(rightBoxes, function(box) {
                        totalRightBoxesWidth += box.width;
                    });
                    helpers.each(topBoxes.concat(bottomBoxes), fitBox);
                    function fitBox(box) {
                        var minBoxSize = helpers.findNextWhere(minBoxSizes, function(minBoxSize) {
                            return minBoxSize.box === box;
                        });
                        if (minBoxSize) {
                            if (box.isHorizontal()) {
                                var scaleMargin = {
                                    left: totalLeftBoxesWidth,
                                    right: totalRightBoxesWidth,
                                    top: 0,
                                    bottom: 0
                                };
                                box.update(box.options.fullWidth ? chartWidth : maxChartAreaWidth, chartHeight / 2, scaleMargin);
                            } else {
                                box.update(minBoxSize.minSize.width, maxChartAreaHeight);
                            }
                        }
                    }
                    helpers.each(topBoxes, function(box) {
                        totalTopBoxesHeight += box.height;
                    });
                    helpers.each(bottomBoxes, function(box) {
                        totalBottomBoxesHeight += box.height;
                    });
                    helpers.each(leftBoxes.concat(rightBoxes), finalFitVerticalBox);
                    function finalFitVerticalBox(box) {
                        var minBoxSize = helpers.findNextWhere(minBoxSizes, function(minBoxSize) {
                            return minBoxSize.box === box;
                        });
                        var scaleMargin = {
                            left: 0,
                            right: 0,
                            top: totalTopBoxesHeight,
                            bottom: totalBottomBoxesHeight
                        };
                        if (minBoxSize) {
                            box.update(minBoxSize.minSize.width, maxChartAreaHeight, scaleMargin);
                        }
                    }
                    totalLeftBoxesWidth = xPadding;
                    totalRightBoxesWidth = xPadding;
                    totalTopBoxesHeight = yPadding;
                    totalBottomBoxesHeight = yPadding;
                    helpers.each(leftBoxes, function(box) {
                        totalLeftBoxesWidth += box.width;
                    });
                    helpers.each(rightBoxes, function(box) {
                        totalRightBoxesWidth += box.width;
                    });
                    helpers.each(topBoxes, function(box) {
                        totalTopBoxesHeight += box.height;
                    });
                    helpers.each(bottomBoxes, function(box) {
                        totalBottomBoxesHeight += box.height;
                    });
                    var newMaxChartAreaHeight = height - totalTopBoxesHeight - totalBottomBoxesHeight;
                    var newMaxChartAreaWidth = width - totalLeftBoxesWidth - totalRightBoxesWidth;
                    if (newMaxChartAreaWidth !== maxChartAreaWidth || newMaxChartAreaHeight !== maxChartAreaHeight) {
                        helpers.each(leftBoxes, function(box) {
                            box.height = newMaxChartAreaHeight;
                        });
                        helpers.each(rightBoxes, function(box) {
                            box.height = newMaxChartAreaHeight;
                        });
                        helpers.each(topBoxes, function(box) {
                            if (!box.options.fullWidth) {
                                box.width = newMaxChartAreaWidth;
                            }
                        });
                        helpers.each(bottomBoxes, function(box) {
                            if (!box.options.fullWidth) {
                                box.width = newMaxChartAreaWidth;
                            }
                        });
                        maxChartAreaHeight = newMaxChartAreaHeight;
                        maxChartAreaWidth = newMaxChartAreaWidth;
                    }
                    var left = xPadding;
                    var top = yPadding;
                    var right = 0;
                    var bottom = 0;
                    helpers.each(leftBoxes.concat(topBoxes), placeBox);
                    left += maxChartAreaWidth;
                    top += maxChartAreaHeight;
                    helpers.each(rightBoxes, placeBox);
                    helpers.each(bottomBoxes, placeBox);
                    function placeBox(box) {
                        if (box.isHorizontal()) {
                            box.left = box.options.fullWidth ? xPadding : totalLeftBoxesWidth;
                            box.right = box.options.fullWidth ? width - xPadding : totalLeftBoxesWidth + maxChartAreaWidth;
                            box.top = top;
                            box.bottom = top + box.height;
                            top = box.bottom;
                        } else {
                            box.left = left;
                            box.right = left + box.width;
                            box.top = totalTopBoxesHeight;
                            box.bottom = totalTopBoxesHeight + maxChartAreaHeight;
                            left = box.right;
                        }
                    }
                    chartInstance.chartArea = {
                        left: totalLeftBoxesWidth,
                        top: totalTopBoxesHeight,
                        right: totalLeftBoxesWidth + maxChartAreaWidth,
                        bottom: totalTopBoxesHeight + maxChartAreaHeight
                    };
                    helpers.each(chartAreaBoxes, function(box) {
                        box.left = chartInstance.chartArea.left;
                        box.top = chartInstance.chartArea.top;
                        box.right = chartInstance.chartArea.right;
                        box.bottom = chartInstance.chartArea.bottom;
                        box.update(maxChartAreaWidth, maxChartAreaHeight);
                    });
                }
            };
        };
    }, {} ],
    28: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            var noop = helpers.noop;
            Chart.defaults.global.legend = {
                display: true,
                position: "top",
                fullWidth: true,
                reverse: false,
                onClick: function(e, legendItem) {
                    var index = legendItem.datasetIndex;
                    var ci = this.chart;
                    var meta = ci.getDatasetMeta(index);
                    meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
                    ci.update();
                },
                labels: {
                    boxWidth: 40,
                    padding: 10,
                    generateLabels: function(chart) {
                        var data = chart.data;
                        return helpers.isArray(data.datasets) ? data.datasets.map(function(dataset, i) {
                            return {
                                text: dataset.label,
                                fillStyle: dataset.backgroundColor,
                                hidden: !chart.isDatasetVisible(i),
                                lineCap: dataset.borderCapStyle,
                                lineDash: dataset.borderDash,
                                lineDashOffset: dataset.borderDashOffset,
                                lineJoin: dataset.borderJoinStyle,
                                lineWidth: dataset.borderWidth,
                                strokeStyle: dataset.borderColor,
                                datasetIndex: i
                            };
                        }, this) : [];
                    }
                }
            };
            Chart.Legend = Chart.Element.extend({
                initialize: function(config) {
                    helpers.extend(this, config);
                    this.legendHitBoxes = [];
                    this.doughnutMode = false;
                },
                beforeUpdate: noop,
                update: function(maxWidth, maxHeight, margins) {
                    this.beforeUpdate();
                    this.maxWidth = maxWidth;
                    this.maxHeight = maxHeight;
                    this.margins = margins;
                    this.beforeSetDimensions();
                    this.setDimensions();
                    this.afterSetDimensions();
                    this.beforeBuildLabels();
                    this.buildLabels();
                    this.afterBuildLabels();
                    this.beforeFit();
                    this.fit();
                    this.afterFit();
                    this.afterUpdate();
                    return this.minSize;
                },
                afterUpdate: noop,
                beforeSetDimensions: noop,
                setDimensions: function() {
                    if (this.isHorizontal()) {
                        this.width = this.maxWidth;
                        this.left = 0;
                        this.right = this.width;
                    } else {
                        this.height = this.maxHeight;
                        this.top = 0;
                        this.bottom = this.height;
                    }
                    this.paddingLeft = 0;
                    this.paddingTop = 0;
                    this.paddingRight = 0;
                    this.paddingBottom = 0;
                    this.minSize = {
                        width: 0,
                        height: 0
                    };
                },
                afterSetDimensions: noop,
                beforeBuildLabels: noop,
                buildLabels: function() {
                    this.legendItems = this.options.labels.generateLabels.call(this, this.chart);
                    if (this.options.reverse) {
                        this.legendItems.reverse();
                    }
                },
                afterBuildLabels: noop,
                beforeFit: noop,
                fit: function() {
                    var opts = this.options;
                    var labelOpts = opts.labels;
                    var display = opts.display;
                    var ctx = this.ctx;
                    var globalDefault = Chart.defaults.global, itemOrDefault = helpers.getValueOrDefault, fontSize = itemOrDefault(labelOpts.fontSize, globalDefault.defaultFontSize), fontStyle = itemOrDefault(labelOpts.fontStyle, globalDefault.defaultFontStyle), fontFamily = itemOrDefault(labelOpts.fontFamily, globalDefault.defaultFontFamily), labelFont = helpers.fontString(fontSize, fontStyle, fontFamily);
                    var hitboxes = this.legendHitBoxes = [];
                    var minSize = this.minSize;
                    var isHorizontal = this.isHorizontal();
                    if (isHorizontal) {
                        minSize.width = this.maxWidth;
                        minSize.height = display ? 10 : 0;
                    } else {
                        minSize.width = display ? 10 : 0;
                        minSize.height = this.maxHeight;
                    }
                    if (display) {
                        if (isHorizontal) {
                            var lineWidths = this.lineWidths = [ 0 ];
                            var totalHeight = this.legendItems.length ? fontSize + labelOpts.padding : 0;
                            ctx.textAlign = "left";
                            ctx.textBaseline = "top";
                            ctx.font = labelFont;
                            helpers.each(this.legendItems, function(legendItem, i) {
                                var width = labelOpts.boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
                                if (lineWidths[lineWidths.length - 1] + width + labelOpts.padding >= this.width) {
                                    totalHeight += fontSize + labelOpts.padding;
                                    lineWidths[lineWidths.length] = this.left;
                                }
                                hitboxes[i] = {
                                    left: 0,
                                    top: 0,
                                    width: width,
                                    height: fontSize
                                };
                                lineWidths[lineWidths.length - 1] += width + labelOpts.padding;
                            }, this);
                            minSize.height += totalHeight;
                        } else {}
                    }
                    this.width = minSize.width;
                    this.height = minSize.height;
                },
                afterFit: noop,
                isHorizontal: function() {
                    return this.options.position === "top" || this.options.position === "bottom";
                },
                draw: function() {
                    var opts = this.options;
                    var labelOpts = opts.labels;
                    var globalDefault = Chart.defaults.global, lineDefault = globalDefault.elements.line, legendWidth = this.width, lineWidths = this.lineWidths;
                    if (opts.display) {
                        var ctx = this.ctx, cursor = {
                            x: this.left + (legendWidth - lineWidths[0]) / 2,
                            y: this.top + labelOpts.padding,
                            line: 0
                        }, itemOrDefault = helpers.getValueOrDefault, fontColor = itemOrDefault(labelOpts.fontColor, globalDefault.defaultFontColor), fontSize = itemOrDefault(labelOpts.fontSize, globalDefault.defaultFontSize), fontStyle = itemOrDefault(labelOpts.fontStyle, globalDefault.defaultFontStyle), fontFamily = itemOrDefault(labelOpts.fontFamily, globalDefault.defaultFontFamily), labelFont = helpers.fontString(fontSize, fontStyle, fontFamily);
                        if (this.isHorizontal()) {
                            ctx.textAlign = "left";
                            ctx.textBaseline = "top";
                            ctx.lineWidth = .5;
                            ctx.strokeStyle = fontColor;
                            ctx.fillStyle = fontColor;
                            ctx.font = labelFont;
                            var boxWidth = labelOpts.boxWidth, hitboxes = this.legendHitBoxes;
                            helpers.each(this.legendItems, function(legendItem, i) {
                                var textWidth = ctx.measureText(legendItem.text).width, width = boxWidth + fontSize / 2 + textWidth, x = cursor.x, y = cursor.y;
                                if (x + width >= legendWidth) {
                                    y = cursor.y += fontSize + labelOpts.padding;
                                    cursor.line++;
                                    x = cursor.x = this.left + (legendWidth - lineWidths[cursor.line]) / 2;
                                }
                                ctx.save();
                                ctx.fillStyle = itemOrDefault(legendItem.fillStyle, globalDefault.defaultColor);
                                ctx.lineCap = itemOrDefault(legendItem.lineCap, lineDefault.borderCapStyle);
                                ctx.lineDashOffset = itemOrDefault(legendItem.lineDashOffset, lineDefault.borderDashOffset);
                                ctx.lineJoin = itemOrDefault(legendItem.lineJoin, lineDefault.borderJoinStyle);
                                ctx.lineWidth = itemOrDefault(legendItem.lineWidth, lineDefault.borderWidth);
                                ctx.strokeStyle = itemOrDefault(legendItem.strokeStyle, globalDefault.defaultColor);
                                if (ctx.setLineDash) {
                                    ctx.setLineDash(itemOrDefault(legendItem.lineDash, lineDefault.borderDash));
                                }
                                ctx.strokeRect(x, y, boxWidth, fontSize);
                                ctx.fillRect(x, y, boxWidth, fontSize);
                                ctx.restore();
                                hitboxes[i].left = x;
                                hitboxes[i].top = y;
                                ctx.fillText(legendItem.text, boxWidth + fontSize / 2 + x, y);
                                if (legendItem.hidden) {
                                    ctx.beginPath();
                                    ctx.lineWidth = 2;
                                    ctx.moveTo(boxWidth + fontSize / 2 + x, y + fontSize / 2);
                                    ctx.lineTo(boxWidth + fontSize / 2 + x + textWidth, y + fontSize / 2);
                                    ctx.stroke();
                                }
                                cursor.x += width + labelOpts.padding;
                            }, this);
                        } else {}
                    }
                },
                handleEvent: function(e) {
                    var position = helpers.getRelativePosition(e, this.chart.chart), x = position.x, y = position.y, opts = this.options;
                    if (x >= this.left && x <= this.right && y >= this.top && y <= this.bottom) {
                        var lh = this.legendHitBoxes;
                        for (var i = 0; i < lh.length; ++i) {
                            var hitBox = lh[i];
                            if (x >= hitBox.left && x <= hitBox.left + hitBox.width && y >= hitBox.top && y <= hitBox.top + hitBox.height) {
                                if (opts.onClick) {
                                    opts.onClick.call(this, e, this.legendItems[i]);
                                }
                                break;
                            }
                        }
                    }
                }
            });
        };
    }, {} ],
    29: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            Chart.plugins = [];
            Chart.pluginService = {
                register: function(plugin) {
                    var p = Chart.plugins;
                    if (p.indexOf(plugin) === -1) {
                        p.push(plugin);
                    }
                },
                remove: function(plugin) {
                    var p = Chart.plugins;
                    var idx = p.indexOf(plugin);
                    if (idx !== -1) {
                        p.splice(idx, 1);
                    }
                },
                notifyPlugins: function(method, args, scope) {
                    helpers.each(Chart.plugins, function(plugin) {
                        if (plugin[method] && typeof plugin[method] === "function") {
                            plugin[method].apply(scope, args);
                        }
                    }, scope);
                }
            };
            var noop = helpers.noop;
            Chart.PluginBase = Chart.Element.extend({
                beforeInit: noop,
                afterInit: noop,
                beforeUpdate: noop,
                afterUpdate: noop,
                beforeDraw: noop,
                afterDraw: noop,
                destroy: noop
            });
        };
    }, {} ],
    30: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            Chart.defaults.scale = {
                display: true,
                position: "left",
                gridLines: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)",
                    lineWidth: 1,
                    drawBorder: true,
                    drawOnChartArea: true,
                    drawTicks: true,
                    tickMarkLength: 10,
                    zeroLineWidth: 1,
                    zeroLineColor: "rgba(0,0,0,0.25)",
                    offsetGridLines: false
                },
                scaleLabel: {
                    labelString: "",
                    display: false
                },
                ticks: {
                    beginAtZero: false,
                    minRotation: 0,
                    maxRotation: 50,
                    mirror: false,
                    padding: 10,
                    reverse: false,
                    display: true,
                    autoSkip: true,
                    autoSkipPadding: 0,
                    labelOffset: 0,
                    callback: function(value) {
                        return "" + value;
                    }
                }
            };
            Chart.Scale = Chart.Element.extend({
                beforeUpdate: function() {
                    helpers.callCallback(this.options.beforeUpdate, [ this ]);
                },
                update: function(maxWidth, maxHeight, margins) {
                    this.beforeUpdate();
                    this.maxWidth = maxWidth;
                    this.maxHeight = maxHeight;
                    this.margins = helpers.extend({
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }, margins);
                    this.beforeSetDimensions();
                    this.setDimensions();
                    this.afterSetDimensions();
                    this.beforeDataLimits();
                    this.determineDataLimits();
                    this.afterDataLimits();
                    this.beforeBuildTicks();
                    this.buildTicks();
                    this.afterBuildTicks();
                    this.beforeTickToLabelConversion();
                    this.convertTicksToLabels();
                    this.afterTickToLabelConversion();
                    this.beforeCalculateTickRotation();
                    this.calculateTickRotation();
                    this.afterCalculateTickRotation();
                    this.beforeFit();
                    this.fit();
                    this.afterFit();
                    this.afterUpdate();
                    return this.minSize;
                },
                afterUpdate: function() {
                    helpers.callCallback(this.options.afterUpdate, [ this ]);
                },
                beforeSetDimensions: function() {
                    helpers.callCallback(this.options.beforeSetDimensions, [ this ]);
                },
                setDimensions: function() {
                    if (this.isHorizontal()) {
                        this.width = this.maxWidth;
                        this.left = 0;
                        this.right = this.width;
                    } else {
                        this.height = this.maxHeight;
                        this.top = 0;
                        this.bottom = this.height;
                    }
                    this.paddingLeft = 0;
                    this.paddingTop = 0;
                    this.paddingRight = 0;
                    this.paddingBottom = 0;
                },
                afterSetDimensions: function() {
                    helpers.callCallback(this.options.afterSetDimensions, [ this ]);
                },
                beforeDataLimits: function() {
                    helpers.callCallback(this.options.beforeDataLimits, [ this ]);
                },
                determineDataLimits: helpers.noop,
                afterDataLimits: function() {
                    helpers.callCallback(this.options.afterDataLimits, [ this ]);
                },
                beforeBuildTicks: function() {
                    helpers.callCallback(this.options.beforeBuildTicks, [ this ]);
                },
                buildTicks: helpers.noop,
                afterBuildTicks: function() {
                    helpers.callCallback(this.options.afterBuildTicks, [ this ]);
                },
                beforeTickToLabelConversion: function() {
                    helpers.callCallback(this.options.beforeTickToLabelConversion, [ this ]);
                },
                convertTicksToLabels: function() {
                    this.ticks = this.ticks.map(function(numericalTick, index, ticks) {
                        if (this.options.ticks.userCallback) {
                            return this.options.ticks.userCallback(numericalTick, index, ticks);
                        }
                        return this.options.ticks.callback(numericalTick, index, ticks);
                    }, this);
                },
                afterTickToLabelConversion: function() {
                    helpers.callCallback(this.options.afterTickToLabelConversion, [ this ]);
                },
                beforeCalculateTickRotation: function() {
                    helpers.callCallback(this.options.beforeCalculateTickRotation, [ this ]);
                },
                calculateTickRotation: function() {
                    var context = this.ctx;
                    var globalDefaults = Chart.defaults.global;
                    var optionTicks = this.options.ticks;
                    var tickFontSize = helpers.getValueOrDefault(optionTicks.fontSize, globalDefaults.defaultFontSize);
                    var tickFontStyle = helpers.getValueOrDefault(optionTicks.fontStyle, globalDefaults.defaultFontStyle);
                    var tickFontFamily = helpers.getValueOrDefault(optionTicks.fontFamily, globalDefaults.defaultFontFamily);
                    var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
                    context.font = tickLabelFont;
                    var firstWidth = context.measureText(this.ticks[0]).width;
                    var lastWidth = context.measureText(this.ticks[this.ticks.length - 1]).width;
                    var firstRotated;
                    this.labelRotation = optionTicks.minRotation || 0;
                    this.paddingRight = 0;
                    this.paddingLeft = 0;
                    if (this.options.display) {
                        if (this.isHorizontal()) {
                            this.paddingRight = lastWidth / 2 + 3;
                            this.paddingLeft = firstWidth / 2 + 3;
                            if (!this.longestTextCache) {
                                this.longestTextCache = {};
                            }
                            var originalLabelWidth = helpers.longestText(context, tickLabelFont, this.ticks, this.longestTextCache);
                            var labelWidth = originalLabelWidth;
                            var cosRotation;
                            var sinRotation;
                            var tickWidth = this.getPixelForTick(1) - this.getPixelForTick(0) - 6;
                            while (labelWidth > tickWidth && this.labelRotation < optionTicks.maxRotation) {
                                cosRotation = Math.cos(helpers.toRadians(this.labelRotation));
                                sinRotation = Math.sin(helpers.toRadians(this.labelRotation));
                                firstRotated = cosRotation * firstWidth;
                                if (firstRotated + tickFontSize / 2 > this.yLabelWidth) {
                                    this.paddingLeft = firstRotated + tickFontSize / 2;
                                }
                                this.paddingRight = tickFontSize / 2;
                                if (sinRotation * originalLabelWidth > this.maxHeight) {
                                    this.labelRotation--;
                                    break;
                                }
                                this.labelRotation++;
                                labelWidth = cosRotation * originalLabelWidth;
                            }
                        }
                    }
                    if (this.margins) {
                        this.paddingLeft = Math.max(this.paddingLeft - this.margins.left, 0);
                        this.paddingRight = Math.max(this.paddingRight - this.margins.right, 0);
                    }
                },
                afterCalculateTickRotation: function() {
                    helpers.callCallback(this.options.afterCalculateTickRotation, [ this ]);
                },
                beforeFit: function() {
                    helpers.callCallback(this.options.beforeFit, [ this ]);
                },
                fit: function() {
                    var minSize = this.minSize = {
                        width: 0,
                        height: 0
                    };
                    var opts = this.options;
                    var globalDefaults = Chart.defaults.global;
                    var tickOpts = opts.ticks;
                    var scaleLabelOpts = opts.scaleLabel;
                    var display = opts.display;
                    var isHorizontal = this.isHorizontal();
                    var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
                    var tickFontStyle = helpers.getValueOrDefault(tickOpts.fontStyle, globalDefaults.defaultFontStyle);
                    var tickFontFamily = helpers.getValueOrDefault(tickOpts.fontFamily, globalDefaults.defaultFontFamily);
                    var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
                    var scaleLabelFontSize = helpers.getValueOrDefault(scaleLabelOpts.fontSize, globalDefaults.defaultFontSize);
                    var scaleLabelFontStyle = helpers.getValueOrDefault(scaleLabelOpts.fontStyle, globalDefaults.defaultFontStyle);
                    var scaleLabelFontFamily = helpers.getValueOrDefault(scaleLabelOpts.fontFamily, globalDefaults.defaultFontFamily);
                    var scaleLabelFont = helpers.fontString(scaleLabelFontSize, scaleLabelFontStyle, scaleLabelFontFamily);
                    var tickMarkLength = opts.gridLines.tickMarkLength;
                    if (isHorizontal) {
                        minSize.width = this.isFullWidth() ? this.maxWidth - this.margins.left - this.margins.right : this.maxWidth;
                    } else {
                        minSize.width = display ? tickMarkLength : 0;
                    }
                    if (isHorizontal) {
                        minSize.height = display ? tickMarkLength : 0;
                    } else {
                        minSize.height = this.maxHeight;
                    }
                    if (scaleLabelOpts.display && display) {
                        if (isHorizontal) {
                            minSize.height += scaleLabelFontSize * 1.5;
                        } else {
                            minSize.width += scaleLabelFontSize * 1.5;
                        }
                    }
                    if (tickOpts.display && display) {
                        if (!this.longestTextCache) {
                            this.longestTextCache = {};
                        }
                        var largestTextWidth = helpers.longestText(this.ctx, tickLabelFont, this.ticks, this.longestTextCache);
                        if (isHorizontal) {
                            this.longestLabelWidth = largestTextWidth;
                            var labelHeight = Math.sin(helpers.toRadians(this.labelRotation)) * this.longestLabelWidth + 1.5 * tickFontSize;
                            minSize.height = Math.min(this.maxHeight, minSize.height + labelHeight);
                            this.ctx.font = tickLabelFont;
                            var firstLabelWidth = this.ctx.measureText(this.ticks[0]).width;
                            var lastLabelWidth = this.ctx.measureText(this.ticks[this.ticks.length - 1]).width;
                            var cosRotation = Math.cos(helpers.toRadians(this.labelRotation));
                            var sinRotation = Math.sin(helpers.toRadians(this.labelRotation));
                            this.paddingLeft = this.labelRotation !== 0 ? cosRotation * firstLabelWidth + 3 : firstLabelWidth / 2 + 3;
                            this.paddingRight = this.labelRotation !== 0 ? sinRotation * (tickFontSize / 2) + 3 : lastLabelWidth / 2 + 3;
                        } else {
                            var maxLabelWidth = this.maxWidth - minSize.width;
                            var mirror = tickOpts.mirror;
                            if (!mirror) {
                                largestTextWidth += this.options.ticks.padding;
                            } else {
                                largestTextWidth = 0;
                            }
                            if (largestTextWidth < maxLabelWidth) {
                                minSize.width += largestTextWidth;
                            } else {
                                minSize.width = this.maxWidth;
                            }
                            this.paddingTop = tickFontSize / 2;
                            this.paddingBottom = tickFontSize / 2;
                        }
                    }
                    if (this.margins) {
                        this.paddingLeft = Math.max(this.paddingLeft - this.margins.left, 0);
                        this.paddingTop = Math.max(this.paddingTop - this.margins.top, 0);
                        this.paddingRight = Math.max(this.paddingRight - this.margins.right, 0);
                        this.paddingBottom = Math.max(this.paddingBottom - this.margins.bottom, 0);
                    }
                    this.width = minSize.width;
                    this.height = minSize.height;
                },
                afterFit: function() {
                    helpers.callCallback(this.options.afterFit, [ this ]);
                },
                isHorizontal: function() {
                    return this.options.position === "top" || this.options.position === "bottom";
                },
                isFullWidth: function() {
                    return this.options.fullWidth;
                },
                getRightValue: function getRightValue(rawValue) {
                    if (rawValue === null || typeof rawValue === "undefined") {
                        return NaN;
                    }
                    if (typeof rawValue === "number" && isNaN(rawValue)) {
                        return NaN;
                    }
                    if (typeof rawValue === "object") {
                        if (rawValue instanceof Date || rawValue.isValid) {
                            return rawValue;
                        } else {
                            return getRightValue(this.isHorizontal() ? rawValue.x : rawValue.y);
                        }
                    }
                    return rawValue;
                },
                getLabelForIndex: helpers.noop,
                getPixelForValue: helpers.noop,
                getValueForPixel: helpers.noop,
                getPixelForTick: function(index, includeOffset) {
                    if (this.isHorizontal()) {
                        var innerWidth = this.width - (this.paddingLeft + this.paddingRight);
                        var tickWidth = innerWidth / Math.max(this.ticks.length - (this.options.gridLines.offsetGridLines ? 0 : 1), 1);
                        var pixel = tickWidth * index + this.paddingLeft;
                        if (includeOffset) {
                            pixel += tickWidth / 2;
                        }
                        var finalVal = this.left + Math.round(pixel);
                        finalVal += this.isFullWidth() ? this.margins.left : 0;
                        return finalVal;
                    } else {
                        var innerHeight = this.height - (this.paddingTop + this.paddingBottom);
                        return this.top + index * (innerHeight / (this.ticks.length - 1));
                    }
                },
                getPixelForDecimal: function(decimal) {
                    if (this.isHorizontal()) {
                        var innerWidth = this.width - (this.paddingLeft + this.paddingRight);
                        var valueOffset = innerWidth * decimal + this.paddingLeft;
                        var finalVal = this.left + Math.round(valueOffset);
                        finalVal += this.isFullWidth() ? this.margins.left : 0;
                        return finalVal;
                    } else {
                        return this.top + decimal * this.height;
                    }
                },
                getBasePixel: function() {
                    var me = this;
                    var min = me.min;
                    var max = me.max;
                    return me.getPixelForValue(me.beginAtZero ? 0 : min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0);
                },
                draw: function(chartArea) {
                    var options = this.options;
                    if (!options.display) {
                        return;
                    }
                    var context = this.ctx;
                    var globalDefaults = Chart.defaults.global;
                    var optionTicks = options.ticks;
                    var gridLines = options.gridLines;
                    var scaleLabel = options.scaleLabel;
                    var setContextLineSettings;
                    var isRotated = this.labelRotation !== 0;
                    var skipRatio;
                    var scaleLabelX;
                    var scaleLabelY;
                    var useAutoskipper = optionTicks.autoSkip;
                    var maxTicks;
                    if (optionTicks.maxTicksLimit) {
                        maxTicks = optionTicks.maxTicksLimit;
                    }
                    var tickFontColor = helpers.getValueOrDefault(optionTicks.fontColor, globalDefaults.defaultFontColor);
                    var tickFontSize = helpers.getValueOrDefault(optionTicks.fontSize, globalDefaults.defaultFontSize);
                    var tickFontStyle = helpers.getValueOrDefault(optionTicks.fontStyle, globalDefaults.defaultFontStyle);
                    var tickFontFamily = helpers.getValueOrDefault(optionTicks.fontFamily, globalDefaults.defaultFontFamily);
                    var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
                    var tl = gridLines.tickMarkLength;
                    var scaleLabelFontColor = helpers.getValueOrDefault(scaleLabel.fontColor, globalDefaults.defaultFontColor);
                    var scaleLabelFontSize = helpers.getValueOrDefault(scaleLabel.fontSize, globalDefaults.defaultFontSize);
                    var scaleLabelFontStyle = helpers.getValueOrDefault(scaleLabel.fontStyle, globalDefaults.defaultFontStyle);
                    var scaleLabelFontFamily = helpers.getValueOrDefault(scaleLabel.fontFamily, globalDefaults.defaultFontFamily);
                    var scaleLabelFont = helpers.fontString(scaleLabelFontSize, scaleLabelFontStyle, scaleLabelFontFamily);
                    var labelRotationRadians = helpers.toRadians(this.labelRotation);
                    var cosRotation = Math.cos(labelRotationRadians);
                    var sinRotation = Math.sin(labelRotationRadians);
                    var longestRotatedLabel = this.longestLabelWidth * cosRotation;
                    var rotatedLabelHeight = tickFontSize * sinRotation;
                    context.fillStyle = tickFontColor;
                    if (this.isHorizontal()) {
                        setContextLineSettings = true;
                        var yTickStart = options.position === "bottom" ? this.top : this.bottom - tl;
                        var yTickEnd = options.position === "bottom" ? this.top + tl : this.bottom;
                        skipRatio = false;
                        if (isRotated) {
                            longestRotatedLabel /= 2;
                        }
                        if ((longestRotatedLabel + optionTicks.autoSkipPadding) * this.ticks.length > this.width - (this.paddingLeft + this.paddingRight)) {
                            skipRatio = 1 + Math.floor((longestRotatedLabel + optionTicks.autoSkipPadding) * this.ticks.length / (this.width - (this.paddingLeft + this.paddingRight)));
                        }
                        if (maxTicks && this.ticks.length > maxTicks) {
                            while (!skipRatio || this.ticks.length / (skipRatio || 1) > maxTicks) {
                                if (!skipRatio) {
                                    skipRatio = 1;
                                }
                                skipRatio += 1;
                            }
                        }
                        if (!useAutoskipper) {
                            skipRatio = false;
                        }
                        helpers.each(this.ticks, function(label, index) {
                            var isLastTick = this.ticks.length === index + 1;
                            var shouldSkip = skipRatio > 1 && index % skipRatio > 0 || index % skipRatio === 0 && index + skipRatio >= this.ticks.length;
                            if (shouldSkip && !isLastTick || (label === undefined || label === null)) {
                                return;
                            }
                            var xLineValue = this.getPixelForTick(index);
                            var xLabelValue = this.getPixelForTick(index, gridLines.offsetGridLines);
                            if (gridLines.display) {
                                if (index === (typeof this.zeroLineIndex !== "undefined" ? this.zeroLineIndex : 0)) {
                                    context.lineWidth = gridLines.zeroLineWidth;
                                    context.strokeStyle = gridLines.zeroLineColor;
                                    setContextLineSettings = true;
                                } else if (setContextLineSettings) {
                                    context.lineWidth = gridLines.lineWidth;
                                    context.strokeStyle = gridLines.color;
                                    setContextLineSettings = false;
                                }
                                xLineValue += helpers.aliasPixel(context.lineWidth);
                                context.beginPath();
                                if (gridLines.drawTicks) {
                                    context.moveTo(xLineValue, yTickStart);
                                    context.lineTo(xLineValue, yTickEnd);
                                }
                                if (gridLines.drawOnChartArea) {
                                    context.moveTo(xLineValue, chartArea.top);
                                    context.lineTo(xLineValue, chartArea.bottom);
                                }
                                context.stroke();
                            }
                            if (optionTicks.display) {
                                context.save();
                                context.translate(xLabelValue + optionTicks.labelOffset, isRotated ? this.top + 12 : options.position === "top" ? this.bottom - tl : this.top + tl);
                                context.rotate(labelRotationRadians * -1);
                                context.font = tickLabelFont;
                                context.textAlign = isRotated ? "right" : "center";
                                context.textBaseline = isRotated ? "middle" : options.position === "top" ? "bottom" : "top";
                                context.fillText(label, 0, 0);
                                context.restore();
                            }
                        }, this);
                        if (scaleLabel.display) {
                            context.textAlign = "center";
                            context.textBaseline = "middle";
                            context.fillStyle = scaleLabelFontColor;
                            context.font = scaleLabelFont;
                            scaleLabelX = this.left + (this.right - this.left) / 2;
                            scaleLabelY = options.position === "bottom" ? this.bottom - scaleLabelFontSize / 2 : this.top + scaleLabelFontSize / 2;
                            context.fillText(scaleLabel.labelString, scaleLabelX, scaleLabelY);
                        }
                    } else {
                        setContextLineSettings = true;
                        var xTickStart = options.position === "right" ? this.left : this.right - 5;
                        var xTickEnd = options.position === "right" ? this.left + 5 : this.right;
                        helpers.each(this.ticks, function(label, index) {
                            if (label === undefined || label === null) {
                                return;
                            }
                            var yLineValue = this.getPixelForTick(index);
                            if (gridLines.display) {
                                if (index === (typeof this.zeroLineIndex !== "undefined" ? this.zeroLineIndex : 0)) {
                                    context.lineWidth = gridLines.zeroLineWidth;
                                    context.strokeStyle = gridLines.zeroLineColor;
                                    setContextLineSettings = true;
                                } else if (setContextLineSettings) {
                                    context.lineWidth = gridLines.lineWidth;
                                    context.strokeStyle = gridLines.color;
                                    setContextLineSettings = false;
                                }
                                yLineValue += helpers.aliasPixel(context.lineWidth);
                                context.beginPath();
                                if (gridLines.drawTicks) {
                                    context.moveTo(xTickStart, yLineValue);
                                    context.lineTo(xTickEnd, yLineValue);
                                }
                                if (gridLines.drawOnChartArea) {
                                    context.moveTo(chartArea.left, yLineValue);
                                    context.lineTo(chartArea.right, yLineValue);
                                }
                                context.stroke();
                            }
                            if (optionTicks.display) {
                                var xLabelValue;
                                var yLabelValue = this.getPixelForTick(index, gridLines.offsetGridLines);
                                context.save();
                                if (options.position === "left") {
                                    if (optionTicks.mirror) {
                                        xLabelValue = this.right + optionTicks.padding;
                                        context.textAlign = "left";
                                    } else {
                                        xLabelValue = this.right - optionTicks.padding;
                                        context.textAlign = "right";
                                    }
                                } else {
                                    if (optionTicks.mirror) {
                                        xLabelValue = this.left - optionTicks.padding;
                                        context.textAlign = "right";
                                    } else {
                                        xLabelValue = this.left + optionTicks.padding;
                                        context.textAlign = "left";
                                    }
                                }
                                context.translate(xLabelValue, yLabelValue + optionTicks.labelOffset);
                                context.rotate(labelRotationRadians * -1);
                                context.font = tickLabelFont;
                                context.textBaseline = "middle";
                                context.fillText(label, 0, 0);
                                context.restore();
                            }
                        }, this);
                        if (scaleLabel.display) {
                            scaleLabelX = options.position === "left" ? this.left + scaleLabelFontSize / 2 : this.right - scaleLabelFontSize / 2;
                            scaleLabelY = this.top + (this.bottom - this.top) / 2;
                            var rotation = options.position === "left" ? -.5 * Math.PI : .5 * Math.PI;
                            context.save();
                            context.translate(scaleLabelX, scaleLabelY);
                            context.rotate(rotation);
                            context.textAlign = "center";
                            context.fillStyle = scaleLabelFontColor;
                            context.font = scaleLabelFont;
                            context.textBaseline = "middle";
                            context.fillText(scaleLabel.labelString, 0, 0);
                            context.restore();
                        }
                    }
                    if (gridLines.drawBorder) {
                        context.lineWidth = gridLines.lineWidth;
                        context.strokeStyle = gridLines.color;
                        var x1 = this.left, x2 = this.right, y1 = this.top, y2 = this.bottom;
                        var aliasPixel = helpers.aliasPixel(context.lineWidth);
                        if (this.isHorizontal()) {
                            y1 = y2 = options.position === "top" ? this.bottom : this.top;
                            y1 += aliasPixel;
                            y2 += aliasPixel;
                        } else {
                            x1 = x2 = options.position === "left" ? this.right : this.left;
                            x1 += aliasPixel;
                            x2 += aliasPixel;
                        }
                        context.beginPath();
                        context.moveTo(x1, y1);
                        context.lineTo(x2, y2);
                        context.stroke();
                    }
                }
            });
        };
    }, {} ],
    31: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            Chart.scaleService = {
                constructors: {},
                defaults: {},
                registerScaleType: function(type, scaleConstructor, defaults) {
                    this.constructors[type] = scaleConstructor;
                    this.defaults[type] = helpers.clone(defaults);
                },
                getScaleConstructor: function(type) {
                    return this.constructors.hasOwnProperty(type) ? this.constructors[type] : undefined;
                },
                getScaleDefaults: function(type) {
                    return this.defaults.hasOwnProperty(type) ? helpers.scaleMerge(Chart.defaults.scale, this.defaults[type]) : {};
                },
                updateScaleDefaults: function(type, additions) {
                    var defaults = this.defaults;
                    if (defaults.hasOwnProperty(type)) {
                        defaults[type] = helpers.extend(defaults[type], additions);
                    }
                },
                addScalesToLayout: function(chartInstance) {
                    helpers.each(chartInstance.scales, function(scale) {
                        Chart.layoutService.addBox(chartInstance, scale);
                    });
                }
            };
        };
    }, {} ],
    32: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            Chart.defaults.global.title = {
                display: false,
                position: "top",
                fullWidth: true,
                fontStyle: "bold",
                padding: 10,
                text: ""
            };
            var noop = helpers.noop;
            Chart.Title = Chart.Element.extend({
                initialize: function(config) {
                    helpers.extend(this, config);
                    this.options = helpers.configMerge(Chart.defaults.global.title, config.options);
                    this.legendHitBoxes = [];
                },
                beforeUpdate: noop,
                update: function(maxWidth, maxHeight, margins) {
                    this.beforeUpdate();
                    this.maxWidth = maxWidth;
                    this.maxHeight = maxHeight;
                    this.margins = margins;
                    this.beforeSetDimensions();
                    this.setDimensions();
                    this.afterSetDimensions();
                    this.beforeBuildLabels();
                    this.buildLabels();
                    this.afterBuildLabels();
                    this.beforeFit();
                    this.fit();
                    this.afterFit();
                    this.afterUpdate();
                    return this.minSize;
                },
                afterUpdate: noop,
                beforeSetDimensions: noop,
                setDimensions: function() {
                    if (this.isHorizontal()) {
                        this.width = this.maxWidth;
                        this.left = 0;
                        this.right = this.width;
                    } else {
                        this.height = this.maxHeight;
                        this.top = 0;
                        this.bottom = this.height;
                    }
                    this.paddingLeft = 0;
                    this.paddingTop = 0;
                    this.paddingRight = 0;
                    this.paddingBottom = 0;
                    this.minSize = {
                        width: 0,
                        height: 0
                    };
                },
                afterSetDimensions: noop,
                beforeBuildLabels: noop,
                buildLabels: noop,
                afterBuildLabels: noop,
                beforeFit: noop,
                fit: function() {
                    var _this = this, ctx = _this.ctx, valueOrDefault = helpers.getValueOrDefault, opts = _this.options, globalDefaults = Chart.defaults.global, display = opts.display, fontSize = valueOrDefault(opts.fontSize, globalDefaults.defaultFontSize), minSize = _this.minSize;
                    if (_this.isHorizontal()) {
                        minSize.width = _this.maxWidth;
                        minSize.height = display ? fontSize + opts.padding * 2 : 0;
                    } else {
                        minSize.width = display ? fontSize + opts.padding * 2 : 0;
                        minSize.height = _this.maxHeight;
                    }
                    _this.width = minSize.width;
                    _this.height = minSize.height;
                },
                afterFit: noop,
                isHorizontal: function() {
                    var pos = this.options.position;
                    return pos === "top" || pos === "bottom";
                },
                draw: function() {
                    var _this = this, ctx = _this.ctx, valueOrDefault = helpers.getValueOrDefault, opts = _this.options, globalDefaults = Chart.defaults.global;
                    if (opts.display) {
                        var fontSize = valueOrDefault(opts.fontSize, globalDefaults.defaultFontSize), fontStyle = valueOrDefault(opts.fontStyle, globalDefaults.defaultFontStyle), fontFamily = valueOrDefault(opts.fontFamily, globalDefaults.defaultFontFamily), titleFont = helpers.fontString(fontSize, fontStyle, fontFamily), rotation = 0, titleX, titleY, top = _this.top, left = _this.left, bottom = _this.bottom, right = _this.right;
                        ctx.fillStyle = valueOrDefault(opts.fontColor, globalDefaults.defaultFontColor);
                        ctx.font = titleFont;
                        if (_this.isHorizontal()) {
                            titleX = left + (right - left) / 2;
                            titleY = top + (bottom - top) / 2;
                        } else {
                            titleX = opts.position === "left" ? left + fontSize / 2 : right - fontSize / 2;
                            titleY = top + (bottom - top) / 2;
                            rotation = Math.PI * (opts.position === "left" ? -.5 : .5);
                        }
                        ctx.save();
                        ctx.translate(titleX, titleY);
                        ctx.rotate(rotation);
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        ctx.fillText(opts.text, 0, 0);
                        ctx.restore();
                    }
                }
            });
        };
    }, {} ],
    33: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            Chart.defaults.global.tooltips = {
                enabled: true,
                custom: null,
                mode: "single",
                backgroundColor: "rgba(0,0,0,0.8)",
                titleFontStyle: "bold",
                titleSpacing: 2,
                titleMarginBottom: 6,
                titleColor: "#fff",
                titleAlign: "left",
                bodySpacing: 2,
                bodyColor: "#fff",
                bodyAlign: "left",
                footerFontStyle: "bold",
                footerSpacing: 2,
                footerMarginTop: 6,
                footerColor: "#fff",
                footerAlign: "left",
                yPadding: 6,
                xPadding: 6,
                yAlign: "center",
                xAlign: "center",
                caretSize: 5,
                cornerRadius: 6,
                multiKeyBackground: "#fff",
                callbacks: {
                    beforeTitle: helpers.noop,
                    title: function(tooltipItems, data) {
                        var title = "";
                        if (tooltipItems.length > 0) {
                            if (tooltipItems[0].xLabel) {
                                title = tooltipItems[0].xLabel;
                            } else if (data.labels.length > 0 && tooltipItems[0].index < data.labels.length) {
                                title = data.labels[tooltipItems[0].index];
                            }
                        }
                        return title;
                    },
                    afterTitle: helpers.noop,
                    beforeBody: helpers.noop,
                    beforeLabel: helpers.noop,
                    label: function(tooltipItem, data) {
                        var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || "";
                        return datasetLabel + ": " + tooltipItem.yLabel;
                    },
                    afterLabel: helpers.noop,
                    afterBody: helpers.noop,
                    beforeFooter: helpers.noop,
                    footer: helpers.noop,
                    afterFooter: helpers.noop
                }
            };
            function pushOrConcat(base, toPush) {
                if (toPush) {
                    if (helpers.isArray(toPush)) {
                        base = base.concat(toPush);
                    } else {
                        base.push(toPush);
                    }
                }
                return base;
            }
            Chart.Tooltip = Chart.Element.extend({
                initialize: function() {
                    var globalDefaults = Chart.defaults.global;
                    var options = this._options;
                    var tooltips = options.tooltips;
                    helpers.extend(this, {
                        _model: {
                            xPadding: tooltips.xPadding,
                            yPadding: tooltips.yPadding,
                            xAlign: tooltips.yAlign,
                            yAlign: tooltips.xAlign,
                            bodyColor: tooltips.bodyColor,
                            _bodyFontFamily: helpers.getValueOrDefault(tooltips.bodyFontFamily, globalDefaults.defaultFontFamily),
                            _bodyFontStyle: helpers.getValueOrDefault(tooltips.bodyFontStyle, globalDefaults.defaultFontStyle),
                            _bodyAlign: tooltips.bodyAlign,
                            bodyFontSize: helpers.getValueOrDefault(tooltips.bodyFontSize, globalDefaults.defaultFontSize),
                            bodySpacing: tooltips.bodySpacing,
                            titleColor: tooltips.titleColor,
                            _titleFontFamily: helpers.getValueOrDefault(tooltips.titleFontFamily, globalDefaults.defaultFontFamily),
                            _titleFontStyle: helpers.getValueOrDefault(tooltips.titleFontStyle, globalDefaults.defaultFontStyle),
                            titleFontSize: helpers.getValueOrDefault(tooltips.titleFontSize, globalDefaults.defaultFontSize),
                            _titleAlign: tooltips.titleAlign,
                            titleSpacing: tooltips.titleSpacing,
                            titleMarginBottom: tooltips.titleMarginBottom,
                            footerColor: tooltips.footerColor,
                            _footerFontFamily: helpers.getValueOrDefault(tooltips.footerFontFamily, globalDefaults.defaultFontFamily),
                            _footerFontStyle: helpers.getValueOrDefault(tooltips.footerFontStyle, globalDefaults.defaultFontStyle),
                            footerFontSize: helpers.getValueOrDefault(tooltips.footerFontSize, globalDefaults.defaultFontSize),
                            _footerAlign: tooltips.footerAlign,
                            footerSpacing: tooltips.footerSpacing,
                            footerMarginTop: tooltips.footerMarginTop,
                            caretSize: tooltips.caretSize,
                            cornerRadius: tooltips.cornerRadius,
                            backgroundColor: tooltips.backgroundColor,
                            opacity: 0,
                            legendColorBackground: tooltips.multiKeyBackground
                        }
                    });
                },
                getTitle: function() {
                    var beforeTitle = this._options.tooltips.callbacks.beforeTitle.apply(this, arguments), title = this._options.tooltips.callbacks.title.apply(this, arguments), afterTitle = this._options.tooltips.callbacks.afterTitle.apply(this, arguments);
                    var lines = [];
                    lines = pushOrConcat(lines, beforeTitle);
                    lines = pushOrConcat(lines, title);
                    lines = pushOrConcat(lines, afterTitle);
                    return lines;
                },
                getBeforeBody: function() {
                    var lines = this._options.tooltips.callbacks.beforeBody.apply(this, arguments);
                    return helpers.isArray(lines) ? lines : lines !== undefined ? [ lines ] : [];
                },
                getBody: function(tooltipItems, data) {
                    var lines = [];
                    helpers.each(tooltipItems, function(bodyItem) {
                        helpers.pushAllIfDefined(this._options.tooltips.callbacks.beforeLabel.call(this, bodyItem, data), lines);
                        helpers.pushAllIfDefined(this._options.tooltips.callbacks.label.call(this, bodyItem, data), lines);
                        helpers.pushAllIfDefined(this._options.tooltips.callbacks.afterLabel.call(this, bodyItem, data), lines);
                    }, this);
                    return lines;
                },
                getAfterBody: function() {
                    var lines = this._options.tooltips.callbacks.afterBody.apply(this, arguments);
                    return helpers.isArray(lines) ? lines : lines !== undefined ? [ lines ] : [];
                },
                getFooter: function() {
                    var beforeFooter = this._options.tooltips.callbacks.beforeFooter.apply(this, arguments);
                    var footer = this._options.tooltips.callbacks.footer.apply(this, arguments);
                    var afterFooter = this._options.tooltips.callbacks.afterFooter.apply(this, arguments);
                    var lines = [];
                    lines = pushOrConcat(lines, beforeFooter);
                    lines = pushOrConcat(lines, footer);
                    lines = pushOrConcat(lines, afterFooter);
                    return lines;
                },
                getAveragePosition: function(elements) {
                    if (!elements.length) {
                        return false;
                    }
                    var xPositions = [];
                    var yPositions = [];
                    helpers.each(elements, function(el) {
                        if (el && el.hasValue()) {
                            var pos = el.tooltipPosition();
                            xPositions.push(pos.x);
                            yPositions.push(pos.y);
                        }
                    });
                    var x = 0, y = 0;
                    for (var i = 0; i < xPositions.length; i++) {
                        x += xPositions[i];
                        y += yPositions[i];
                    }
                    return {
                        x: Math.round(x / xPositions.length),
                        y: Math.round(y / xPositions.length)
                    };
                },
                update: function(changed) {
                    if (this._active.length) {
                        this._model.opacity = 1;
                        var element = this._active[0], labelColors = [], tooltipPosition;
                        var tooltipItems = [];
                        if (this._options.tooltips.mode === "single") {
                            var yScale = element._yScale || element._scale;
                            tooltipItems.push({
                                xLabel: element._xScale ? element._xScale.getLabelForIndex(element._index, element._datasetIndex) : "",
                                yLabel: yScale ? yScale.getLabelForIndex(element._index, element._datasetIndex) : "",
                                index: element._index,
                                datasetIndex: element._datasetIndex
                            });
                            tooltipPosition = this.getAveragePosition(this._active);
                        } else {
                            helpers.each(this._data.datasets, function(dataset, datasetIndex) {
                                if (!this._chartInstance.isDatasetVisible(datasetIndex)) {
                                    return;
                                }
                                var meta = this._chartInstance.getDatasetMeta(datasetIndex);
                                var currentElement = meta.data[element._index];
                                if (currentElement) {
                                    var yScale = element._yScale || element._scale;
                                    tooltipItems.push({
                                        xLabel: currentElement._xScale ? currentElement._xScale.getLabelForIndex(currentElement._index, currentElement._datasetIndex) : "",
                                        yLabel: yScale ? yScale.getLabelForIndex(currentElement._index, currentElement._datasetIndex) : "",
                                        index: element._index,
                                        datasetIndex: datasetIndex
                                    });
                                }
                            }, this);
                            helpers.each(this._active, function(active) {
                                if (active) {
                                    labelColors.push({
                                        borderColor: active._view.borderColor,
                                        backgroundColor: active._view.backgroundColor
                                    });
                                }
                            }, null);
                            tooltipPosition = this.getAveragePosition(this._active);
                        }
                        helpers.extend(this._model, {
                            title: this.getTitle(tooltipItems, this._data),
                            beforeBody: this.getBeforeBody(tooltipItems, this._data),
                            body: this.getBody(tooltipItems, this._data),
                            afterBody: this.getAfterBody(tooltipItems, this._data),
                            footer: this.getFooter(tooltipItems, this._data)
                        });
                        helpers.extend(this._model, {
                            x: Math.round(tooltipPosition.x),
                            y: Math.round(tooltipPosition.y),
                            caretPadding: helpers.getValueOrDefault(tooltipPosition.padding, 2),
                            labelColors: labelColors
                        });
                        var tooltipSize = this.getTooltipSize(this._model);
                        this.determineAlignment(tooltipSize);
                        helpers.extend(this._model, this.getBackgroundPoint(this._model, tooltipSize));
                    } else {
                        this._model.opacity = 0;
                    }
                    if (changed && this._options.tooltips.custom) {
                        this._options.tooltips.custom.call(this, this._model);
                    }
                    return this;
                },
                getTooltipSize: function getTooltipSize(vm) {
                    var ctx = this._chart.ctx;
                    var size = {
                        height: vm.yPadding * 2,
                        width: 0
                    };
                    var combinedBodyLength = vm.body.length + vm.beforeBody.length + vm.afterBody.length;
                    size.height += vm.title.length * vm.titleFontSize;
                    size.height += (vm.title.length - 1) * vm.titleSpacing;
                    size.height += vm.title.length ? vm.titleMarginBottom : 0;
                    size.height += combinedBodyLength * vm.bodyFontSize;
                    size.height += combinedBodyLength ? (combinedBodyLength - 1) * vm.bodySpacing : 0;
                    size.height += vm.footer.length ? vm.footerMarginTop : 0;
                    size.height += vm.footer.length * vm.footerFontSize;
                    size.height += vm.footer.length ? (vm.footer.length - 1) * vm.footerSpacing : 0;
                    ctx.font = helpers.fontString(vm.titleFontSize, vm._titleFontStyle, vm._titleFontFamily);
                    helpers.each(vm.title, function(line) {
                        size.width = Math.max(size.width, ctx.measureText(line).width);
                    });
                    ctx.font = helpers.fontString(vm.bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);
                    helpers.each(vm.beforeBody.concat(vm.afterBody), function(line) {
                        size.width = Math.max(size.width, ctx.measureText(line).width);
                    });
                    helpers.each(vm.body, function(line) {
                        size.width = Math.max(size.width, ctx.measureText(line).width + (this._options.tooltips.mode !== "single" ? vm.bodyFontSize + 2 : 0));
                    }, this);
                    ctx.font = helpers.fontString(vm.footerFontSize, vm._footerFontStyle, vm._footerFontFamily);
                    helpers.each(vm.footer, function(line) {
                        size.width = Math.max(size.width, ctx.measureText(line).width);
                    });
                    size.width += 2 * vm.xPadding;
                    return size;
                },
                determineAlignment: function determineAlignment(size) {
                    if (this._model.y < size.height) {
                        this._model.yAlign = "top";
                    } else if (this._model.y > this._chart.height - size.height) {
                        this._model.yAlign = "bottom";
                    }
                    var lf, rf;
                    var olf, orf;
                    var yf;
                    var _this = this;
                    var midX = (this._chartInstance.chartArea.left + this._chartInstance.chartArea.right) / 2;
                    var midY = (this._chartInstance.chartArea.top + this._chartInstance.chartArea.bottom) / 2;
                    if (this._model.yAlign === "center") {
                        lf = function(x) {
                            return x <= midX;
                        };
                        rf = function(x) {
                            return x > midX;
                        };
                    } else {
                        lf = function(x) {
                            return x <= size.width / 2;
                        };
                        rf = function(x) {
                            return x >= _this._chart.width - size.width / 2;
                        };
                    }
                    olf = function(x) {
                        return x + size.width > _this._chart.width;
                    };
                    orf = function(x) {
                        return x - size.width < 0;
                    };
                    yf = function(y) {
                        return y <= midY ? "top" : "bottom";
                    };
                    if (lf(this._model.x)) {
                        this._model.xAlign = "left";
                        if (olf(this._model.x)) {
                            this._model.xAlign = "center";
                            this._model.yAlign = yf(this._model.y);
                        }
                    } else if (rf(this._model.x)) {
                        this._model.xAlign = "right";
                        if (orf(this._model.x)) {
                            this._model.xAlign = "center";
                            this._model.yAlign = yf(this._model.y);
                        }
                    }
                },
                getBackgroundPoint: function getBackgroundPoint(vm, size) {
                    var pt = {
                        x: vm.x,
                        y: vm.y
                    };
                    if (vm.xAlign === "right") {
                        pt.x -= size.width;
                    } else if (vm.xAlign === "center") {
                        pt.x -= size.width / 2;
                    }
                    if (vm.yAlign === "top") {
                        pt.y += vm.caretPadding + vm.caretSize;
                    } else if (vm.yAlign === "bottom") {
                        pt.y -= size.height + vm.caretPadding + vm.caretSize;
                    } else {
                        pt.y -= size.height / 2;
                    }
                    if (vm.yAlign === "center") {
                        if (vm.xAlign === "left") {
                            pt.x += vm.caretPadding + vm.caretSize;
                        } else if (vm.xAlign === "right") {
                            pt.x -= vm.caretPadding + vm.caretSize;
                        }
                    } else {
                        if (vm.xAlign === "left") {
                            pt.x -= vm.cornerRadius + vm.caretPadding;
                        } else if (vm.xAlign === "right") {
                            pt.x += vm.cornerRadius + vm.caretPadding;
                        }
                    }
                    return pt;
                },
                drawCaret: function drawCaret(tooltipPoint, size, opacity, caretPadding) {
                    var vm = this._view;
                    var ctx = this._chart.ctx;
                    var x1, x2, x3;
                    var y1, y2, y3;
                    if (vm.yAlign === "center") {
                        if (vm.xAlign === "left") {
                            x1 = tooltipPoint.x;
                            x2 = x1 - vm.caretSize;
                            x3 = x1;
                        } else {
                            x1 = tooltipPoint.x + size.width;
                            x2 = x1 + vm.caretSize;
                            x3 = x1;
                        }
                        y2 = tooltipPoint.y + size.height / 2;
                        y1 = y2 - vm.caretSize;
                        y3 = y2 + vm.caretSize;
                    } else {
                        if (vm.xAlign === "left") {
                            x1 = tooltipPoint.x + vm.cornerRadius;
                            x2 = x1 + vm.caretSize;
                            x3 = x2 + vm.caretSize;
                        } else if (vm.xAlign === "right") {
                            x1 = tooltipPoint.x + size.width - vm.cornerRadius;
                            x2 = x1 - vm.caretSize;
                            x3 = x2 - vm.caretSize;
                        } else {
                            x2 = tooltipPoint.x + size.width / 2;
                            x1 = x2 - vm.caretSize;
                            x3 = x2 + vm.caretSize;
                        }
                        if (vm.yAlign === "top") {
                            y1 = tooltipPoint.y;
                            y2 = y1 - vm.caretSize;
                            y3 = y1;
                        } else {
                            y1 = tooltipPoint.y + size.height;
                            y2 = y1 + vm.caretSize;
                            y3 = y1;
                        }
                    }
                    var bgColor = helpers.color(vm.backgroundColor);
                    ctx.fillStyle = bgColor.alpha(opacity * bgColor.alpha()).rgbString();
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.lineTo(x3, y3);
                    ctx.closePath();
                    ctx.fill();
                },
                drawTitle: function drawTitle(pt, vm, ctx, opacity) {
                    if (vm.title.length) {
                        ctx.textAlign = vm._titleAlign;
                        ctx.textBaseline = "top";
                        var titleColor = helpers.color(vm.titleColor);
                        ctx.fillStyle = titleColor.alpha(opacity * titleColor.alpha()).rgbString();
                        ctx.font = helpers.fontString(vm.titleFontSize, vm._titleFontStyle, vm._titleFontFamily);
                        helpers.each(vm.title, function(title, i) {
                            ctx.fillText(title, pt.x, pt.y);
                            pt.y += vm.titleFontSize + vm.titleSpacing;
                            if (i + 1 === vm.title.length) {
                                pt.y += vm.titleMarginBottom - vm.titleSpacing;
                            }
                        });
                    }
                },
                drawBody: function drawBody(pt, vm, ctx, opacity) {
                    ctx.textAlign = vm._bodyAlign;
                    ctx.textBaseline = "top";
                    var bodyColor = helpers.color(vm.bodyColor);
                    ctx.fillStyle = bodyColor.alpha(opacity * bodyColor.alpha()).rgbString();
                    ctx.font = helpers.fontString(vm.bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);
                    helpers.each(vm.beforeBody, function(beforeBody) {
                        ctx.fillText(beforeBody, pt.x, pt.y);
                        pt.y += vm.bodyFontSize + vm.bodySpacing;
                    });
                    helpers.each(vm.body, function(body, i) {
                        if (this._options.tooltips.mode !== "single") {
                            ctx.fillStyle = helpers.color(vm.legendColorBackground).alpha(opacity).rgbaString();
                            ctx.fillRect(pt.x, pt.y, vm.bodyFontSize, vm.bodyFontSize);
                            ctx.strokeStyle = helpers.color(vm.labelColors[i].borderColor).alpha(opacity).rgbaString();
                            ctx.strokeRect(pt.x, pt.y, vm.bodyFontSize, vm.bodyFontSize);
                            ctx.fillStyle = helpers.color(vm.labelColors[i].backgroundColor).alpha(opacity).rgbaString();
                            ctx.fillRect(pt.x + 1, pt.y + 1, vm.bodyFontSize - 2, vm.bodyFontSize - 2);
                            ctx.fillStyle = helpers.color(vm.bodyColor).alpha(opacity).rgbaString();
                        }
                        ctx.fillText(body, pt.x + (this._options.tooltips.mode !== "single" ? vm.bodyFontSize + 2 : 0), pt.y);
                        pt.y += vm.bodyFontSize + vm.bodySpacing;
                    }, this);
                    helpers.each(vm.afterBody, function(afterBody) {
                        ctx.fillText(afterBody, pt.x, pt.y);
                        pt.y += vm.bodyFontSize;
                    });
                    pt.y -= vm.bodySpacing;
                },
                drawFooter: function drawFooter(pt, vm, ctx, opacity) {
                    if (vm.footer.length) {
                        pt.y += vm.footerMarginTop;
                        ctx.textAlign = vm._footerAlign;
                        ctx.textBaseline = "top";
                        var footerColor = helpers.color(vm.footerColor);
                        ctx.fillStyle = footerColor.alpha(opacity * footerColor.alpha()).rgbString();
                        ctx.font = helpers.fontString(vm.footerFontSize, vm._footerFontStyle, vm._footerFontFamily);
                        helpers.each(vm.footer, function(footer) {
                            ctx.fillText(footer, pt.x, pt.y);
                            pt.y += vm.footerFontSize + vm.footerSpacing;
                        });
                    }
                },
                draw: function draw() {
                    var ctx = this._chart.ctx;
                    var vm = this._view;
                    if (vm.opacity === 0) {
                        return;
                    }
                    var caretPadding = vm.caretPadding;
                    var tooltipSize = this.getTooltipSize(vm);
                    var pt = {
                        x: vm.x,
                        y: vm.y
                    };
                    var opacity = Math.abs(vm.opacity < .001) ? 0 : vm.opacity;
                    if (this._options.tooltips.enabled) {
                        var bgColor = helpers.color(vm.backgroundColor);
                        ctx.fillStyle = bgColor.alpha(opacity * bgColor.alpha()).rgbString();
                        helpers.drawRoundedRectangle(ctx, pt.x, pt.y, tooltipSize.width, tooltipSize.height, vm.cornerRadius);
                        ctx.fill();
                        this.drawCaret(pt, tooltipSize, opacity, caretPadding);
                        pt.x += vm.xPadding;
                        pt.y += vm.yPadding;
                        this.drawTitle(pt, vm, ctx, opacity);
                        this.drawBody(pt, vm, ctx, opacity);
                        this.drawFooter(pt, vm, ctx, opacity);
                    }
                }
            });
        };
    }, {} ],
    34: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart, moment) {
            var helpers = Chart.helpers, globalOpts = Chart.defaults.global;
            globalOpts.elements.arc = {
                backgroundColor: globalOpts.defaultColor,
                borderColor: "#fff",
                borderWidth: 2
            };
            Chart.elements.Arc = Chart.Element.extend({
                inLabelRange: function(mouseX) {
                    var vm = this._view;
                    if (vm) {
                        return Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hoverRadius, 2);
                    } else {
                        return false;
                    }
                },
                inRange: function(chartX, chartY) {
                    var vm = this._view;
                    if (vm) {
                        var pointRelativePosition = helpers.getAngleFromPoint(vm, {
                            x: chartX,
                            y: chartY
                        }), angle = pointRelativePosition.angle, distance = pointRelativePosition.distance;
                        var startAngle = vm.startAngle;
                        var endAngle = vm.endAngle;
                        while (endAngle < startAngle) {
                            endAngle += 2 * Math.PI;
                        }
                        while (angle > endAngle) {
                            angle -= 2 * Math.PI;
                        }
                        while (angle < startAngle) {
                            angle += 2 * Math.PI;
                        }
                        var betweenAngles = angle >= startAngle && angle <= endAngle, withinRadius = distance >= vm.innerRadius && distance <= vm.outerRadius;
                        return betweenAngles && withinRadius;
                    } else {
                        return false;
                    }
                },
                tooltipPosition: function() {
                    var vm = this._view;
                    var centreAngle = vm.startAngle + (vm.endAngle - vm.startAngle) / 2, rangeFromCentre = (vm.outerRadius - vm.innerRadius) / 2 + vm.innerRadius;
                    return {
                        x: vm.x + Math.cos(centreAngle) * rangeFromCentre,
                        y: vm.y + Math.sin(centreAngle) * rangeFromCentre
                    };
                },
                draw: function() {
                    var ctx = this._chart.ctx, vm = this._view, sA = vm.startAngle, eA = vm.endAngle;
                    ctx.beginPath();
                    ctx.arc(vm.x, vm.y, vm.outerRadius, sA, eA);
                    ctx.arc(vm.x, vm.y, vm.innerRadius, eA, sA, true);
                    ctx.closePath();
                    ctx.strokeStyle = vm.borderColor;
                    ctx.lineWidth = vm.borderWidth;
                    ctx.fillStyle = vm.backgroundColor;
                    ctx.fill();
                    ctx.lineJoin = "bevel";
                    if (vm.borderWidth) {
                        ctx.stroke();
                    }
                }
            });
        };
    }, {} ],
    35: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            var globalDefaults = Chart.defaults.global;
            Chart.defaults.global.elements.line = {
                tension: .4,
                backgroundColor: globalDefaults.defaultColor,
                borderWidth: 3,
                borderColor: globalDefaults.defaultColor,
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0,
                borderJoinStyle: "miter",
                fill: true
            };
            Chart.elements.Line = Chart.Element.extend({
                lineToNextPoint: function(previousPoint, point, nextPoint, skipHandler, previousSkipHandler) {
                    var ctx = this._chart.ctx;
                    if (point._view.skip) {
                        skipHandler.call(this, previousPoint, point, nextPoint);
                    } else if (previousPoint._view.skip) {
                        previousSkipHandler.call(this, previousPoint, point, nextPoint);
                    } else if (point._view.tension === 0) {
                        ctx.lineTo(point._view.x, point._view.y);
                    } else {
                        ctx.bezierCurveTo(previousPoint._view.controlPointNextX, previousPoint._view.controlPointNextY, point._view.controlPointPreviousX, point._view.controlPointPreviousY, point._view.x, point._view.y);
                    }
                },
                draw: function() {
                    var _this = this;
                    var vm = this._view;
                    var ctx = this._chart.ctx;
                    var first = this._children[0];
                    var last = this._children[this._children.length - 1];
                    function loopBackToStart(drawLineToCenter) {
                        if (!first._view.skip && !last._view.skip) {
                            ctx.bezierCurveTo(last._view.controlPointNextX, last._view.controlPointNextY, first._view.controlPointPreviousX, first._view.controlPointPreviousY, first._view.x, first._view.y);
                        } else if (drawLineToCenter) {
                            ctx.lineTo(_this._view.scaleZero.x, _this._view.scaleZero.y);
                        }
                    }
                    ctx.save();
                    if (this._children.length > 0 && vm.fill) {
                        ctx.beginPath();
                        helpers.each(this._children, function(point, index) {
                            var previous = helpers.previousItem(this._children, index);
                            var next = helpers.nextItem(this._children, index);
                            if (index === 0) {
                                if (this._loop) {
                                    ctx.moveTo(vm.scaleZero.x, vm.scaleZero.y);
                                } else {
                                    ctx.moveTo(point._view.x, vm.scaleZero);
                                }
                                if (point._view.skip) {
                                    if (!this._loop) {
                                        ctx.moveTo(next._view.x, this._view.scaleZero);
                                    }
                                } else {
                                    ctx.lineTo(point._view.x, point._view.y);
                                }
                            } else {
                                this.lineToNextPoint(previous, point, next, function(previousPoint, point, nextPoint) {
                                    if (this._loop) {
                                        ctx.lineTo(this._view.scaleZero.x, this._view.scaleZero.y);
                                    } else {
                                        ctx.lineTo(previousPoint._view.x, this._view.scaleZero);
                                        ctx.moveTo(nextPoint._view.x, this._view.scaleZero);
                                    }
                                }, function(previousPoint, point) {
                                    ctx.lineTo(point._view.x, point._view.y);
                                });
                            }
                        }, this);
                        if (this._loop) {
                            loopBackToStart(true);
                        } else {
                            ctx.lineTo(this._children[this._children.length - 1]._view.x, vm.scaleZero);
                            ctx.lineTo(this._children[0]._view.x, vm.scaleZero);
                        }
                        ctx.fillStyle = vm.backgroundColor || globalDefaults.defaultColor;
                        ctx.closePath();
                        ctx.fill();
                    }
                    var globalOptionLineElements = globalDefaults.elements.line;
                    ctx.lineCap = vm.borderCapStyle || globalOptionLineElements.borderCapStyle;
                    if (ctx.setLineDash) {
                        ctx.setLineDash(vm.borderDash || globalOptionLineElements.borderDash);
                    }
                    ctx.lineDashOffset = vm.borderDashOffset || globalOptionLineElements.borderDashOffset;
                    ctx.lineJoin = vm.borderJoinStyle || globalOptionLineElements.borderJoinStyle;
                    ctx.lineWidth = vm.borderWidth || globalOptionLineElements.borderWidth;
                    ctx.strokeStyle = vm.borderColor || globalDefaults.defaultColor;
                    ctx.beginPath();
                    helpers.each(this._children, function(point, index) {
                        var previous = helpers.previousItem(this._children, index);
                        var next = helpers.nextItem(this._children, index);
                        if (index === 0) {
                            ctx.moveTo(point._view.x, point._view.y);
                        } else {
                            this.lineToNextPoint(previous, point, next, function(previousPoint, point, nextPoint) {
                                ctx.moveTo(nextPoint._view.x, nextPoint._view.y);
                            }, function(previousPoint, point) {
                                ctx.moveTo(point._view.x, point._view.y);
                            });
                        }
                    }, this);
                    if (this._loop && this._children.length > 0) {
                        loopBackToStart();
                    }
                    ctx.stroke();
                    ctx.restore();
                }
            });
        };
    }, {} ],
    36: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers, globalOpts = Chart.defaults.global, defaultColor = globalOpts.defaultColor;
            globalOpts.elements.point = {
                radius: 3,
                pointStyle: "circle",
                backgroundColor: defaultColor,
                borderWidth: 1,
                borderColor: defaultColor,
                hitRadius: 1,
                hoverRadius: 4,
                hoverBorderWidth: 1
            };
            Chart.elements.Point = Chart.Element.extend({
                inRange: function(mouseX, mouseY) {
                    var vm = this._view;
                    return vm ? Math.pow(mouseX - vm.x, 2) + Math.pow(mouseY - vm.y, 2) < Math.pow(vm.hitRadius + vm.radius, 2) : false;
                },
                inLabelRange: function(mouseX) {
                    var vm = this._view;
                    return vm ? Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hitRadius, 2) : false;
                },
                tooltipPosition: function() {
                    var vm = this._view;
                    return {
                        x: vm.x,
                        y: vm.y,
                        padding: vm.radius + vm.borderWidth
                    };
                },
                draw: function() {
                    var vm = this._view;
                    var ctx = this._chart.ctx;
                    var pointStyle = vm.pointStyle;
                    var radius = vm.radius;
                    var x = vm.x;
                    var y = vm.y;
                    var type, edgeLength, xOffset, yOffset, height, size;
                    if (vm.skip) {
                        return;
                    }
                    if (typeof pointStyle === "object") {
                        type = pointStyle.toString();
                        if (type === "[object HTMLImageElement]" || type === "[object HTMLCanvasElement]") {
                            ctx.drawImage(pointStyle, x - pointStyle.width / 2, y - pointStyle.height / 2);
                            return;
                        }
                    }
                    if (isNaN(radius) || radius <= 0) {
                        return;
                    }
                    ctx.strokeStyle = vm.borderColor || defaultColor;
                    ctx.lineWidth = helpers.getValueOrDefault(vm.borderWidth, globalOpts.elements.point.borderWidth);
                    ctx.fillStyle = vm.backgroundColor || defaultColor;
                    switch (pointStyle) {
                      default:
                        ctx.beginPath();
                        ctx.arc(x, y, radius, 0, Math.PI * 2);
                        ctx.closePath();
                        ctx.fill();
                        break;

                      case "triangle":
                        ctx.beginPath();
                        edgeLength = 3 * radius / Math.sqrt(3);
                        height = edgeLength * Math.sqrt(3) / 2;
                        ctx.moveTo(x - edgeLength / 2, y + height / 3);
                        ctx.lineTo(x + edgeLength / 2, y + height / 3);
                        ctx.lineTo(x, y - 2 * height / 3);
                        ctx.closePath();
                        ctx.fill();
                        break;

                      case "rect":
                        size = 1 / Math.SQRT2 * radius;
                        ctx.fillRect(x - size, y - size, 2 * size, 2 * size);
                        ctx.strokeRect(x - size, y - size, 2 * size, 2 * size);
                        break;

                      case "rectRot":
                        ctx.translate(x, y);
                        ctx.rotate(Math.PI / 4);
                        size = 1 / Math.SQRT2 * radius;
                        ctx.fillRect(-size, -size, 2 * size, 2 * size);
                        ctx.strokeRect(-size, -size, 2 * size, 2 * size);
                        ctx.setTransform(1, 0, 0, 1, 0, 0);
                        break;

                      case "cross":
                        ctx.beginPath();
                        ctx.moveTo(x, y + radius);
                        ctx.lineTo(x, y - radius);
                        ctx.moveTo(x - radius, y);
                        ctx.lineTo(x + radius, y);
                        ctx.closePath();
                        break;

                      case "crossRot":
                        ctx.beginPath();
                        xOffset = Math.cos(Math.PI / 4) * radius;
                        yOffset = Math.sin(Math.PI / 4) * radius;
                        ctx.moveTo(x - xOffset, y - yOffset);
                        ctx.lineTo(x + xOffset, y + yOffset);
                        ctx.moveTo(x - xOffset, y + yOffset);
                        ctx.lineTo(x + xOffset, y - yOffset);
                        ctx.closePath();
                        break;

                      case "star":
                        ctx.beginPath();
                        ctx.moveTo(x, y + radius);
                        ctx.lineTo(x, y - radius);
                        ctx.moveTo(x - radius, y);
                        ctx.lineTo(x + radius, y);
                        xOffset = Math.cos(Math.PI / 4) * radius;
                        yOffset = Math.sin(Math.PI / 4) * radius;
                        ctx.moveTo(x - xOffset, y - yOffset);
                        ctx.lineTo(x + xOffset, y + yOffset);
                        ctx.moveTo(x - xOffset, y + yOffset);
                        ctx.lineTo(x + xOffset, y - yOffset);
                        ctx.closePath();
                        break;

                      case "line":
                        ctx.beginPath();
                        ctx.moveTo(x - radius, y);
                        ctx.lineTo(x + radius, y);
                        ctx.closePath();
                        break;

                      case "dash":
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x + radius, y);
                        ctx.closePath();
                        break;
                    }
                    ctx.stroke();
                }
            });
        };
    }, {} ],
    37: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers, globalOpts = Chart.defaults.global;
            globalOpts.elements.rectangle = {
                backgroundColor: globalOpts.defaultColor,
                borderWidth: 0,
                borderColor: globalOpts.defaultColor,
                borderSkipped: "bottom"
            };
            Chart.elements.Rectangle = Chart.Element.extend({
                draw: function() {
                    var ctx = this._chart.ctx;
                    var vm = this._view;
                    var halfWidth = vm.width / 2, leftX = vm.x - halfWidth, rightX = vm.x + halfWidth, top = vm.base - (vm.base - vm.y), halfStroke = vm.borderWidth / 2;
                    if (vm.borderWidth) {
                        leftX += halfStroke;
                        rightX -= halfStroke;
                        top += halfStroke;
                    }
                    ctx.beginPath();
                    ctx.fillStyle = vm.backgroundColor;
                    ctx.strokeStyle = vm.borderColor;
                    ctx.lineWidth = vm.borderWidth;
                    var corners = [ [ leftX, vm.base ], [ leftX, top ], [ rightX, top ], [ rightX, vm.base ] ];
                    var borders = [ "bottom", "left", "top", "right" ];
                    var startCorner = borders.indexOf(vm.borderSkipped, 0);
                    if (startCorner === -1) startCorner = 0;
                    function cornerAt(index) {
                        return corners[(startCorner + index) % 4];
                    }
                    ctx.moveTo.apply(ctx, cornerAt(0));
                    for (var i = 1; i < 4; i++) ctx.lineTo.apply(ctx, cornerAt(i));
                    ctx.fill();
                    if (vm.borderWidth) {
                        ctx.stroke();
                    }
                },
                height: function() {
                    var vm = this._view;
                    return vm.base - vm.y;
                },
                inRange: function(mouseX, mouseY) {
                    var vm = this._view;
                    return vm ? vm.y < vm.base ? mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2 && (mouseY >= vm.y && mouseY <= vm.base) : mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2 && (mouseY >= vm.base && mouseY <= vm.y) : false;
                },
                inLabelRange: function(mouseX) {
                    var vm = this._view;
                    return vm ? mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2 : false;
                },
                tooltipPosition: function() {
                    var vm = this._view;
                    return {
                        x: vm.x,
                        y: vm.y
                    };
                }
            });
        };
    }, {} ],
    38: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            var defaultConfig = {
                position: "bottom"
            };
            var DatasetScale = Chart.Scale.extend({
                determineDataLimits: function() {
                    this.minIndex = 0;
                    this.maxIndex = this.chart.data.labels.length - 1;
                    var findIndex;
                    if (this.options.ticks.min !== undefined) {
                        findIndex = helpers.indexOf(this.chart.data.labels, this.options.ticks.min);
                        this.minIndex = findIndex !== -1 ? findIndex : this.minIndex;
                    }
                    if (this.options.ticks.max !== undefined) {
                        findIndex = helpers.indexOf(this.chart.data.labels, this.options.ticks.max);
                        this.maxIndex = findIndex !== -1 ? findIndex : this.maxIndex;
                    }
                    this.min = this.chart.data.labels[this.minIndex];
                    this.max = this.chart.data.labels[this.maxIndex];
                },
                buildTicks: function(index) {
                    this.ticks = this.minIndex === 0 && this.maxIndex === this.chart.data.labels.length - 1 ? this.chart.data.labels : this.chart.data.labels.slice(this.minIndex, this.maxIndex + 1);
                },
                getLabelForIndex: function(index, datasetIndex) {
                    return this.ticks[index];
                },
                getPixelForValue: function(value, index, datasetIndex, includeOffset) {
                    var offsetAmt = Math.max(this.maxIndex + 1 - this.minIndex - (this.options.gridLines.offsetGridLines ? 0 : 1), 1);
                    if (this.isHorizontal()) {
                        var innerWidth = this.width - (this.paddingLeft + this.paddingRight);
                        var valueWidth = innerWidth / offsetAmt;
                        var widthOffset = valueWidth * (index - this.minIndex) + this.paddingLeft;
                        if (this.options.gridLines.offsetGridLines && includeOffset) {
                            widthOffset += valueWidth / 2;
                        }
                        return this.left + Math.round(widthOffset);
                    } else {
                        var innerHeight = this.height - (this.paddingTop + this.paddingBottom);
                        var valueHeight = innerHeight / offsetAmt;
                        var heightOffset = valueHeight * (index - this.minIndex) + this.paddingTop;
                        if (this.options.gridLines.offsetGridLines && includeOffset) {
                            heightOffset += valueHeight / 2;
                        }
                        return this.top + Math.round(heightOffset);
                    }
                },
                getPixelForTick: function(index, includeOffset) {
                    return this.getPixelForValue(this.ticks[index], index + this.minIndex, null, includeOffset);
                },
                getValueForPixel: function(pixel) {
                    var value;
                    var offsetAmt = Math.max(this.ticks.length - (this.options.gridLines.offsetGridLines ? 0 : 1), 1);
                    var horz = this.isHorizontal();
                    var innerDimension = horz ? this.width - (this.paddingLeft + this.paddingRight) : this.height - (this.paddingTop + this.paddingBottom);
                    var valueDimension = innerDimension / offsetAmt;
                    if (this.options.gridLines.offsetGridLines) {
                        pixel -= valueDimension / 2;
                    }
                    pixel -= horz ? this.paddingLeft : this.paddingTop;
                    if (pixel <= 0) {
                        value = 0;
                    } else {
                        value = Math.round(pixel / valueDimension);
                    }
                    return value;
                }
            });
            Chart.scaleService.registerScaleType("category", DatasetScale, defaultConfig);
        };
    }, {} ],
    39: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            var defaultConfig = {
                position: "left",
                ticks: {
                    callback: function(tickValue, index, ticks) {
                        var delta = ticks.length > 3 ? ticks[2] - ticks[1] : ticks[1] - ticks[0];
                        if (Math.abs(delta) > 1) {
                            if (tickValue !== Math.floor(tickValue)) {
                                delta = tickValue - Math.floor(tickValue);
                            }
                        }
                        var logDelta = helpers.log10(Math.abs(delta));
                        var tickString = "";
                        if (tickValue !== 0) {
                            var numDecimal = -1 * Math.floor(logDelta);
                            numDecimal = Math.max(Math.min(numDecimal, 20), 0);
                            tickString = tickValue.toFixed(numDecimal);
                        } else {
                            tickString = "0";
                        }
                        return tickString;
                    }
                }
            };
            var LinearScale = Chart.Scale.extend({
                determineDataLimits: function() {
                    var _this = this;
                    var opts = _this.options;
                    var tickOpts = opts.ticks;
                    var chart = _this.chart;
                    var data = chart.data;
                    var datasets = data.datasets;
                    var isHorizontal = _this.isHorizontal();
                    function IDMatches(meta) {
                        return isHorizontal ? meta.xAxisID === _this.id : meta.yAxisID === _this.id;
                    }
                    _this.min = null;
                    _this.max = null;
                    if (opts.stacked) {
                        var valuesPerType = {};
                        var hasPositiveValues = false;
                        var hasNegativeValues = false;
                        helpers.each(datasets, function(dataset, datasetIndex) {
                            var meta = chart.getDatasetMeta(datasetIndex);
                            if (valuesPerType[meta.type] === undefined) {
                                valuesPerType[meta.type] = {
                                    positiveValues: [],
                                    negativeValues: []
                                };
                            }
                            var positiveValues = valuesPerType[meta.type].positiveValues;
                            var negativeValues = valuesPerType[meta.type].negativeValues;
                            if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
                                helpers.each(dataset.data, function(rawValue, index) {
                                    var value = +_this.getRightValue(rawValue);
                                    if (isNaN(value) || meta.data[index].hidden) {
                                        return;
                                    }
                                    positiveValues[index] = positiveValues[index] || 0;
                                    negativeValues[index] = negativeValues[index] || 0;
                                    if (opts.relativePoints) {
                                        positiveValues[index] = 100;
                                    } else {
                                        if (value < 0) {
                                            hasNegativeValues = true;
                                            negativeValues[index] += value;
                                        } else {
                                            hasPositiveValues = true;
                                            positiveValues[index] += value;
                                        }
                                    }
                                });
                            }
                        });
                        helpers.each(valuesPerType, function(valuesForType) {
                            var values = valuesForType.positiveValues.concat(valuesForType.negativeValues);
                            var minVal = helpers.min(values);
                            var maxVal = helpers.max(values);
                            _this.min = _this.min === null ? minVal : Math.min(_this.min, minVal);
                            _this.max = _this.max === null ? maxVal : Math.max(_this.max, maxVal);
                        });
                    } else {
                        helpers.each(datasets, function(dataset, datasetIndex) {
                            var meta = chart.getDatasetMeta(datasetIndex);
                            if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
                                helpers.each(dataset.data, function(rawValue, index) {
                                    var value = +_this.getRightValue(rawValue);
                                    if (isNaN(value) || meta.data[index].hidden) {
                                        return;
                                    }
                                    if (_this.min === null) {
                                        _this.min = value;
                                    } else if (value < _this.min) {
                                        _this.min = value;
                                    }
                                    if (_this.max === null) {
                                        _this.max = value;
                                    } else if (value > _this.max) {
                                        _this.max = value;
                                    }
                                });
                            }
                        });
                    }
                    if (tickOpts.beginAtZero) {
                        var minSign = helpers.sign(_this.min);
                        var maxSign = helpers.sign(_this.max);
                        if (minSign < 0 && maxSign < 0) {
                            _this.max = 0;
                        } else if (minSign > 0 && maxSign > 0) {
                            _this.min = 0;
                        }
                    }
                    if (tickOpts.min !== undefined) {
                        _this.min = tickOpts.min;
                    } else if (tickOpts.suggestedMin !== undefined) {
                        _this.min = Math.min(_this.min, tickOpts.suggestedMin);
                    }
                    if (tickOpts.max !== undefined) {
                        _this.max = tickOpts.max;
                    } else if (tickOpts.suggestedMax !== undefined) {
                        _this.max = Math.max(_this.max, tickOpts.suggestedMax);
                    }
                    if (_this.min === _this.max) {
                        _this.max++;
                        if (!tickOpts.beginAtZero) {
                            _this.min--;
                        }
                    }
                },
                buildTicks: function() {
                    var _this = this;
                    var opts = _this.options;
                    var tickOpts = opts.ticks;
                    var getValueOrDefault = helpers.getValueOrDefault;
                    var isHorizontal = _this.isHorizontal();
                    var ticks = _this.ticks = [];
                    var maxTicks;
                    if (isHorizontal) {
                        maxTicks = Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(_this.width / 50));
                    } else {
                        var tickFontSize = getValueOrDefault(tickOpts.fontSize, Chart.defaults.global.defaultFontSize);
                        maxTicks = Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(_this.height / (2 * tickFontSize)));
                    }
                    maxTicks = Math.max(2, maxTicks);
                    var spacing;
                    var fixedStepSizeSet = tickOpts.fixedStepSize && tickOpts.fixedStepSize > 0 || tickOpts.stepSize && tickOpts.stepSize > 0;
                    if (fixedStepSizeSet) {
                        spacing = getValueOrDefault(tickOpts.fixedStepSize, tickOpts.stepSize);
                    } else {
                        var niceRange = helpers.niceNum(_this.max - _this.min, false);
                        spacing = helpers.niceNum(niceRange / (maxTicks - 1), true);
                    }
                    var niceMin = Math.floor(_this.min / spacing) * spacing;
                    var niceMax = Math.ceil(_this.max / spacing) * spacing;
                    var numSpaces = (niceMax - niceMin) / spacing;
                    if (helpers.almostEquals(numSpaces, Math.round(numSpaces), spacing / 1e3)) {
                        numSpaces = Math.round(numSpaces);
                    } else {
                        numSpaces = Math.ceil(numSpaces);
                    }
                    ticks.push(tickOpts.min !== undefined ? tickOpts.min : niceMin);
                    for (var j = 1; j < numSpaces; ++j) {
                        ticks.push(niceMin + j * spacing);
                    }
                    ticks.push(tickOpts.max !== undefined ? tickOpts.max : niceMax);
                    if (!isHorizontal) {
                        ticks.reverse();
                    }
                    _this.max = helpers.max(ticks);
                    _this.min = helpers.min(ticks);
                    if (tickOpts.reverse) {
                        ticks.reverse();
                        _this.start = _this.max;
                        _this.end = _this.min;
                    } else {
                        _this.start = _this.min;
                        _this.end = _this.max;
                    }
                },
                getLabelForIndex: function(index, datasetIndex) {
                    return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
                },
                convertTicksToLabels: function() {
                    var _this = this;
                    _this.ticksAsNumbers = _this.ticks.slice();
                    _this.zeroLineIndex = _this.ticks.indexOf(0);
                    Chart.Scale.prototype.convertTicksToLabels.call(_this);
                },
                getPixelForValue: function(value, index, datasetIndex, includeOffset) {
                    var _this = this;
                    var paddingLeft = _this.paddingLeft;
                    var paddingBottom = _this.paddingBottom;
                    var start = _this.start;
                    var rightValue = +_this.getRightValue(value);
                    var pixel;
                    var innerDimension;
                    var range = _this.end - start;
                    if (_this.isHorizontal()) {
                        innerDimension = _this.width - (paddingLeft + _this.paddingRight);
                        pixel = _this.left + innerDimension / range * (rightValue - start);
                        return Math.round(pixel + paddingLeft);
                    } else {
                        innerDimension = _this.height - (_this.paddingTop + paddingBottom);
                        pixel = _this.bottom - paddingBottom - innerDimension / range * (rightValue - start);
                        return Math.round(pixel);
                    }
                },
                getValueForPixel: function(pixel) {
                    var _this = this;
                    var isHorizontal = _this.isHorizontal();
                    var paddingLeft = _this.paddingLeft;
                    var paddingBottom = _this.paddingBottom;
                    var innerDimension = isHorizontal ? _this.width - (paddingLeft + _this.paddingRight) : _this.height - (_this.paddingTop + paddingBottom);
                    var offset = (isHorizontal ? pixel - _this.left - paddingLeft : _this.bottom - paddingBottom - pixel) / innerDimension;
                    return _this.start + (_this.end - _this.start) * offset;
                },
                getPixelForTick: function(index, includeOffset) {
                    return this.getPixelForValue(this.ticksAsNumbers[index], null, null, includeOffset);
                }
            });
            Chart.scaleService.registerScaleType("linear", LinearScale, defaultConfig);
        };
    }, {} ],
    40: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            var defaultConfig = {
                position: "left",
                ticks: {
                    callback: function(value, index, arr) {
                        var remain = value / Math.pow(10, Math.floor(helpers.log10(value)));
                        if (remain === 1 || remain === 2 || remain === 5 || index === 0 || index === arr.length - 1) {
                            return value.toExponential();
                        } else {
                            return "";
                        }
                    }
                }
            };
            var LogarithmicScale = Chart.Scale.extend({
                determineDataLimits: function() {
                    var _this = this;
                    var opts = _this.options;
                    var tickOpts = opts.ticks;
                    var chart = _this.chart;
                    var data = chart.data;
                    var datasets = data.datasets;
                    var getValueOrDefault = helpers.getValueOrDefault;
                    var isHorizontal = _this.isHorizontal();
                    function IDMatches(meta) {
                        return isHorizontal ? meta.xAxisID === _this.id : meta.yAxisID === _this.id;
                    }
                    _this.min = null;
                    _this.max = null;
                    if (opts.stacked) {
                        var valuesPerType = {};
                        helpers.each(datasets, function(dataset, datasetIndex) {
                            var meta = chart.getDatasetMeta(datasetIndex);
                            if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
                                if (valuesPerType[meta.type] === undefined) {
                                    valuesPerType[meta.type] = [];
                                }
                                helpers.each(dataset.data, function(rawValue, index) {
                                    var values = valuesPerType[meta.type];
                                    var value = +_this.getRightValue(rawValue);
                                    if (isNaN(value) || meta.data[index].hidden) {
                                        return;
                                    }
                                    values[index] = values[index] || 0;
                                    if (opts.relativePoints) {
                                        values[index] = 100;
                                    } else {
                                        values[index] += value;
                                    }
                                });
                            }
                        });
                        helpers.each(valuesPerType, function(valuesForType) {
                            var minVal = helpers.min(valuesForType);
                            var maxVal = helpers.max(valuesForType);
                            _this.min = _this.min === null ? minVal : Math.min(_this.min, minVal);
                            _this.max = _this.max === null ? maxVal : Math.max(_this.max, maxVal);
                        });
                    } else {
                        helpers.each(datasets, function(dataset, datasetIndex) {
                            var meta = chart.getDatasetMeta(datasetIndex);
                            if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
                                helpers.each(dataset.data, function(rawValue, index) {
                                    var value = +_this.getRightValue(rawValue);
                                    if (isNaN(value) || meta.data[index].hidden) {
                                        return;
                                    }
                                    if (_this.min === null) {
                                        _this.min = value;
                                    } else if (value < _this.min) {
                                        _this.min = value;
                                    }
                                    if (_this.max === null) {
                                        _this.max = value;
                                    } else if (value > _this.max) {
                                        _this.max = value;
                                    }
                                });
                            }
                        });
                    }
                    _this.min = getValueOrDefault(tickOpts.min, _this.min);
                    _this.max = getValueOrDefault(tickOpts.max, _this.max);
                    if (_this.min === _this.max) {
                        if (_this.min !== 0 && _this.min !== null) {
                            _this.min = Math.pow(10, Math.floor(helpers.log10(_this.min)) - 1);
                            _this.max = Math.pow(10, Math.floor(helpers.log10(_this.max)) + 1);
                        } else {
                            _this.min = 1;
                            _this.max = 10;
                        }
                    }
                },
                buildTicks: function() {
                    var _this = this;
                    var opts = _this.options;
                    var tickOpts = opts.ticks;
                    var getValueOrDefault = helpers.getValueOrDefault;
                    var ticks = _this.ticks = [];
                    var tickVal = getValueOrDefault(tickOpts.min, Math.pow(10, Math.floor(helpers.log10(_this.min))));
                    while (tickVal < _this.max) {
                        ticks.push(tickVal);
                        var exp = Math.floor(helpers.log10(tickVal));
                        var significand = Math.floor(tickVal / Math.pow(10, exp)) + 1;
                        if (significand === 10) {
                            significand = 1;
                            ++exp;
                        }
                        tickVal = significand * Math.pow(10, exp);
                    }
                    var lastTick = getValueOrDefault(tickOpts.max, tickVal);
                    ticks.push(lastTick);
                    if (!_this.isHorizontal()) {
                        ticks.reverse();
                    }
                    _this.max = helpers.max(ticks);
                    _this.min = helpers.min(ticks);
                    if (tickOpts.reverse) {
                        ticks.reverse();
                        _this.start = _this.max;
                        _this.end = _this.min;
                    } else {
                        _this.start = _this.min;
                        _this.end = _this.max;
                    }
                },
                convertTicksToLabels: function() {
                    this.tickValues = this.ticks.slice();
                    Chart.Scale.prototype.convertTicksToLabels.call(this);
                },
                getLabelForIndex: function(index, datasetIndex) {
                    return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
                },
                getPixelForTick: function(index, includeOffset) {
                    return this.getPixelForValue(this.tickValues[index], null, null, includeOffset);
                },
                getPixelForValue: function(value, index, datasetIndex, includeOffset) {
                    var _this = this;
                    var innerDimension;
                    var pixel;
                    var start = _this.start;
                    var newVal = +_this.getRightValue(value);
                    var range = helpers.log10(_this.end) - helpers.log10(start);
                    var paddingTop = _this.paddingTop;
                    var paddingBottom = _this.paddingBottom;
                    var paddingLeft = _this.paddingLeft;
                    if (_this.isHorizontal()) {
                        if (newVal === 0) {
                            pixel = _this.left + paddingLeft;
                        } else {
                            innerDimension = _this.width - (paddingLeft + _this.paddingRight);
                            pixel = _this.left + innerDimension / range * (helpers.log10(newVal) - helpers.log10(start));
                            pixel += paddingLeft;
                        }
                    } else {
                        if (newVal === 0) {
                            pixel = _this.top + paddingTop;
                        } else {
                            innerDimension = _this.height - (paddingTop + paddingBottom);
                            pixel = _this.bottom - paddingBottom - innerDimension / range * (helpers.log10(newVal) - helpers.log10(start));
                        }
                    }
                    return pixel;
                },
                getValueForPixel: function(pixel) {
                    var _this = this;
                    var offset;
                    var range = helpers.log10(_this.end) - helpers.log10(_this.start);
                    var value;
                    var innerDimension;
                    if (_this.isHorizontal()) {
                        innerDimension = _this.width - (_this.paddingLeft + _this.paddingRight);
                        value = _this.start * Math.pow(10, (pixel - _this.left - _this.paddingLeft) * range / innerDimension);
                    } else {
                        innerDimension = _this.height - (_this.paddingTop + _this.paddingBottom);
                        value = Math.pow(10, (_this.bottom - _this.paddingBottom - pixel) * range / innerDimension) / _this.start;
                    }
                    return value;
                }
            });
            Chart.scaleService.registerScaleType("logarithmic", LogarithmicScale, defaultConfig);
        };
    }, {} ],
    41: [ function(require, module, exports) {
        "use strict";
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            var globalDefaults = Chart.defaults.global;
            var defaultConfig = {
                display: true,
                animate: true,
                lineArc: false,
                position: "chartArea",
                angleLines: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)",
                    lineWidth: 1
                },
                ticks: {
                    showLabelBackdrop: true,
                    backdropColor: "rgba(255,255,255,0.75)",
                    backdropPaddingY: 2,
                    backdropPaddingX: 2
                },
                pointLabels: {
                    fontSize: 10,
                    callback: function(label) {
                        return label;
                    }
                }
            };
            var LinearRadialScale = Chart.Scale.extend({
                getValueCount: function() {
                    return this.chart.data.labels.length;
                },
                setDimensions: function() {
                    var options = this.options;
                    this.width = this.maxWidth;
                    this.height = this.maxHeight;
                    this.xCenter = Math.round(this.width / 2);
                    this.yCenter = Math.round(this.height / 2);
                    var minSize = helpers.min([ this.height, this.width ]);
                    var tickFontSize = helpers.getValueOrDefault(options.ticks.fontSize, globalDefaults.defaultFontSize);
                    this.drawingArea = options.display ? minSize / 2 - (tickFontSize / 2 + options.ticks.backdropPaddingY) : minSize / 2;
                },
                determineDataLimits: function() {
                    this.min = null;
                    this.max = null;
                    helpers.each(this.chart.data.datasets, function(dataset, datasetIndex) {
                        if (this.chart.isDatasetVisible(datasetIndex)) {
                            var meta = this.chart.getDatasetMeta(datasetIndex);
                            helpers.each(dataset.data, function(rawValue, index) {
                                var value = +this.getRightValue(rawValue);
                                if (isNaN(value) || meta.data[index].hidden) {
                                    return;
                                }
                                if (this.min === null) {
                                    this.min = value;
                                } else if (value < this.min) {
                                    this.min = value;
                                }
                                if (this.max === null) {
                                    this.max = value;
                                } else if (value > this.max) {
                                    this.max = value;
                                }
                            }, this);
                        }
                    }, this);
                    if (this.options.ticks.beginAtZero) {
                        var minSign = helpers.sign(this.min);
                        var maxSign = helpers.sign(this.max);
                        if (minSign < 0 && maxSign < 0) {
                            this.max = 0;
                        } else if (minSign > 0 && maxSign > 0) {
                            this.min = 0;
                        }
                    }
                    if (this.options.ticks.min !== undefined) {
                        this.min = this.options.ticks.min;
                    } else if (this.options.ticks.suggestedMin !== undefined) {
                        this.min = Math.min(this.min, this.options.ticks.suggestedMin);
                    }
                    if (this.options.ticks.max !== undefined) {
                        this.max = this.options.ticks.max;
                    } else if (this.options.ticks.suggestedMax !== undefined) {
                        this.max = Math.max(this.max, this.options.ticks.suggestedMax);
                    }
                    if (this.min === this.max) {
                        this.min--;
                        this.max++;
                    }
                },
                buildTicks: function() {
                    this.ticks = [];
                    var tickFontSize = helpers.getValueOrDefault(this.options.ticks.fontSize, globalDefaults.defaultFontSize);
                    var maxTicks = Math.min(this.options.ticks.maxTicksLimit ? this.options.ticks.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * tickFontSize)));
                    maxTicks = Math.max(2, maxTicks);
                    var niceRange = helpers.niceNum(this.max - this.min, false);
                    var spacing = helpers.niceNum(niceRange / (maxTicks - 1), true);
                    var niceMin = Math.floor(this.min / spacing) * spacing;
                    var niceMax = Math.ceil(this.max / spacing) * spacing;
                    var numSpaces = Math.ceil((niceMax - niceMin) / spacing);
                    this.ticks.push(this.options.ticks.min !== undefined ? this.options.ticks.min : niceMin);
                    for (var j = 1; j < numSpaces; ++j) {
                        this.ticks.push(niceMin + j * spacing);
                    }
                    this.ticks.push(this.options.ticks.max !== undefined ? this.options.ticks.max : niceMax);
                    this.max = helpers.max(this.ticks);
                    this.min = helpers.min(this.ticks);
                    if (this.options.ticks.reverse) {
                        this.ticks.reverse();
                        this.start = this.max;
                        this.end = this.min;
                    } else {
                        this.start = this.min;
                        this.end = this.max;
                    }
                    this.zeroLineIndex = this.ticks.indexOf(0);
                },
                convertTicksToLabels: function() {
                    Chart.Scale.prototype.convertTicksToLabels.call(this);
                    this.pointLabels = this.chart.data.labels.map(this.options.pointLabels.callback, this);
                },
                getLabelForIndex: function(index, datasetIndex) {
                    return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
                },
                fit: function() {
                    var pointLabels = this.options.pointLabels;
                    var pointLabelFontSize = helpers.getValueOrDefault(pointLabels.fontSize, globalDefaults.defaultFontSize);
                    var pointLabeFontStyle = helpers.getValueOrDefault(pointLabels.fontStyle, globalDefaults.defaultFontStyle);
                    var pointLabeFontFamily = helpers.getValueOrDefault(pointLabels.fontFamily, globalDefaults.defaultFontFamily);
                    var pointLabeFont = helpers.fontString(pointLabelFontSize, pointLabeFontStyle, pointLabeFontFamily);
                    var largestPossibleRadius = helpers.min([ this.height / 2 - pointLabelFontSize - 5, this.width / 2 ]), pointPosition, i, textWidth, halfTextWidth, furthestRight = this.width, furthestRightIndex, furthestRightAngle, furthestLeft = 0, furthestLeftIndex, furthestLeftAngle, xProtrusionLeft, xProtrusionRight, radiusReductionRight, radiusReductionLeft, maxWidthRadius;
                    this.ctx.font = pointLabeFont;
                    for (i = 0; i < this.getValueCount(); i++) {
                        pointPosition = this.getPointPosition(i, largestPossibleRadius);
                        textWidth = this.ctx.measureText(this.pointLabels[i] ? this.pointLabels[i] : "").width + 5;
                        if (i === 0 || i === this.getValueCount() / 2) {
                            halfTextWidth = textWidth / 2;
                            if (pointPosition.x + halfTextWidth > furthestRight) {
                                furthestRight = pointPosition.x + halfTextWidth;
                                furthestRightIndex = i;
                            }
                            if (pointPosition.x - halfTextWidth < furthestLeft) {
                                furthestLeft = pointPosition.x - halfTextWidth;
                                furthestLeftIndex = i;
                            }
                        } else if (i < this.getValueCount() / 2) {
                            if (pointPosition.x + textWidth > furthestRight) {
                                furthestRight = pointPosition.x + textWidth;
                                furthestRightIndex = i;
                            }
                        } else if (i > this.getValueCount() / 2) {
                            if (pointPosition.x - textWidth < furthestLeft) {
                                furthestLeft = pointPosition.x - textWidth;
                                furthestLeftIndex = i;
                            }
                        }
                    }
                    xProtrusionLeft = furthestLeft;
                    xProtrusionRight = Math.ceil(furthestRight - this.width);
                    furthestRightAngle = this.getIndexAngle(furthestRightIndex);
                    furthestLeftAngle = this.getIndexAngle(furthestLeftIndex);
                    radiusReductionRight = xProtrusionRight / Math.sin(furthestRightAngle + Math.PI / 2);
                    radiusReductionLeft = xProtrusionLeft / Math.sin(furthestLeftAngle + Math.PI / 2);
                    radiusReductionRight = helpers.isNumber(radiusReductionRight) ? radiusReductionRight : 0;
                    radiusReductionLeft = helpers.isNumber(radiusReductionLeft) ? radiusReductionLeft : 0;
                    this.drawingArea = Math.round(largestPossibleRadius - (radiusReductionLeft + radiusReductionRight) / 2);
                    this.setCenterPoint(radiusReductionLeft, radiusReductionRight);
                },
                setCenterPoint: function(leftMovement, rightMovement) {
                    var maxRight = this.width - rightMovement - this.drawingArea, maxLeft = leftMovement + this.drawingArea;
                    this.xCenter = Math.round((maxLeft + maxRight) / 2 + this.left);
                    this.yCenter = Math.round(this.height / 2 + this.top);
                },
                getIndexAngle: function(index) {
                    var angleMultiplier = Math.PI * 2 / this.getValueCount();
                    return index * angleMultiplier - Math.PI / 2;
                },
                getDistanceFromCenterForValue: function(value) {
                    if (value === null) {
                        return 0;
                    }
                    var scalingFactor = this.drawingArea / (this.max - this.min);
                    if (this.options.reverse) {
                        return (this.max - value) * scalingFactor;
                    } else {
                        return (value - this.min) * scalingFactor;
                    }
                },
                getPointPosition: function(index, distanceFromCenter) {
                    var thisAngle = this.getIndexAngle(index);
                    return {
                        x: Math.round(Math.cos(thisAngle) * distanceFromCenter) + this.xCenter,
                        y: Math.round(Math.sin(thisAngle) * distanceFromCenter) + this.yCenter
                    };
                },
                getPointPositionForValue: function(index, value) {
                    return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
                },
                getBasePosition: function() {
                    var me = this;
                    var min = me.min;
                    var max = me.max;
                    return me.getPointPositionForValue(0, me.beginAtZero ? 0 : min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0);
                },
                draw: function() {
                    if (this.options.display) {
                        var ctx = this.ctx;
                        helpers.each(this.ticks, function(label, index) {
                            if (index > 0 || this.options.reverse) {
                                var yCenterOffset = this.getDistanceFromCenterForValue(this.ticks[index]);
                                var yHeight = this.yCenter - yCenterOffset;
                                if (this.options.gridLines.display) {
                                    ctx.strokeStyle = this.options.gridLines.color;
                                    ctx.lineWidth = this.options.gridLines.lineWidth;
                                    if (this.options.lineArc) {
                                        ctx.beginPath();
                                        ctx.arc(this.xCenter, this.yCenter, yCenterOffset, 0, Math.PI * 2);
                                        ctx.closePath();
                                        ctx.stroke();
                                    } else {
                                        ctx.beginPath();
                                        for (var i = 0; i < this.getValueCount(); i++) {
                                            var pointPosition = this.getPointPosition(i, this.getDistanceFromCenterForValue(this.ticks[index]));
                                            if (i === 0) {
                                                ctx.moveTo(pointPosition.x, pointPosition.y);
                                            } else {
                                                ctx.lineTo(pointPosition.x, pointPosition.y);
                                            }
                                        }
                                        ctx.closePath();
                                        ctx.stroke();
                                    }
                                }
                                if (this.options.ticks.display) {
                                    var tickFontColor = helpers.getValueOrDefault(this.options.ticks.fontColor, globalDefaults.defaultFontColor);
                                    var tickFontSize = helpers.getValueOrDefault(this.options.ticks.fontSize, globalDefaults.defaultFontSize);
                                    var tickFontStyle = helpers.getValueOrDefault(this.options.ticks.fontStyle, globalDefaults.defaultFontStyle);
                                    var tickFontFamily = helpers.getValueOrDefault(this.options.ticks.fontFamily, globalDefaults.defaultFontFamily);
                                    var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
                                    ctx.font = tickLabelFont;
                                    if (this.options.ticks.showLabelBackdrop) {
                                        var labelWidth = ctx.measureText(label).width;
                                        ctx.fillStyle = this.options.ticks.backdropColor;
                                        ctx.fillRect(this.xCenter - labelWidth / 2 - this.options.ticks.backdropPaddingX, yHeight - tickFontSize / 2 - this.options.ticks.backdropPaddingY, labelWidth + this.options.ticks.backdropPaddingX * 2, tickFontSize + this.options.ticks.backdropPaddingY * 2);
                                    }
                                    ctx.textAlign = "center";
                                    ctx.textBaseline = "middle";
                                    ctx.fillStyle = tickFontColor;
                                    ctx.fillText(label, this.xCenter, yHeight);
                                }
                            }
                        }, this);
                        if (!this.options.lineArc) {
                            ctx.lineWidth = this.options.angleLines.lineWidth;
                            ctx.strokeStyle = this.options.angleLines.color;
                            for (var i = this.getValueCount() - 1; i >= 0; i--) {
                                if (this.options.angleLines.display) {
                                    var outerPosition = this.getPointPosition(i, this.getDistanceFromCenterForValue(this.options.reverse ? this.min : this.max));
                                    ctx.beginPath();
                                    ctx.moveTo(this.xCenter, this.yCenter);
                                    ctx.lineTo(outerPosition.x, outerPosition.y);
                                    ctx.stroke();
                                    ctx.closePath();
                                }
                                var pointLabelPosition = this.getPointPosition(i, this.getDistanceFromCenterForValue(this.options.reverse ? this.min : this.max) + 5);
                                var pointLabelFontColor = helpers.getValueOrDefault(this.options.pointLabels.fontColor, globalDefaults.defaultFontColor);
                                var pointLabelFontSize = helpers.getValueOrDefault(this.options.pointLabels.fontSize, globalDefaults.defaultFontSize);
                                var pointLabeFontStyle = helpers.getValueOrDefault(this.options.pointLabels.fontStyle, globalDefaults.defaultFontStyle);
                                var pointLabeFontFamily = helpers.getValueOrDefault(this.options.pointLabels.fontFamily, globalDefaults.defaultFontFamily);
                                var pointLabeFont = helpers.fontString(pointLabelFontSize, pointLabeFontStyle, pointLabeFontFamily);
                                ctx.font = pointLabeFont;
                                ctx.fillStyle = pointLabelFontColor;
                                var labelsCount = this.pointLabels.length, halfLabelsCount = this.pointLabels.length / 2, quarterLabelsCount = halfLabelsCount / 2, upperHalf = i < quarterLabelsCount || i > labelsCount - quarterLabelsCount, exactQuarter = i === quarterLabelsCount || i === labelsCount - quarterLabelsCount;
                                if (i === 0) {
                                    ctx.textAlign = "center";
                                } else if (i === halfLabelsCount) {
                                    ctx.textAlign = "center";
                                } else if (i < halfLabelsCount) {
                                    ctx.textAlign = "left";
                                } else {
                                    ctx.textAlign = "right";
                                }
                                if (exactQuarter) {
                                    ctx.textBaseline = "middle";
                                } else if (upperHalf) {
                                    ctx.textBaseline = "bottom";
                                } else {
                                    ctx.textBaseline = "top";
                                }
                                ctx.fillText(this.pointLabels[i] ? this.pointLabels[i] : "", pointLabelPosition.x, pointLabelPosition.y);
                            }
                        }
                    }
                }
            });
            Chart.scaleService.registerScaleType("radialLinear", LinearRadialScale, defaultConfig);
        };
    }, {} ],
    42: [ function(require, module, exports) {
        "use strict";
        var moment = require("moment");
        moment = typeof moment === "function" ? moment : window.moment;
        module.exports = function(Chart) {
            var helpers = Chart.helpers;
            var time = {
                units: [ {
                    name: "millisecond",
                    steps: [ 1, 2, 5, 10, 20, 50, 100, 250, 500 ]
                }, {
                    name: "second",
                    steps: [ 1, 2, 5, 10, 30 ]
                }, {
                    name: "minute",
                    steps: [ 1, 2, 5, 10, 30 ]
                }, {
                    name: "hour",
                    steps: [ 1, 2, 3, 6, 12 ]
                }, {
                    name: "day",
                    steps: [ 1, 2, 5 ]
                }, {
                    name: "week",
                    maxStep: 4
                }, {
                    name: "month",
                    maxStep: 3
                }, {
                    name: "quarter",
                    maxStep: 4
                }, {
                    name: "year",
                    maxStep: false
                } ]
            };
            var defaultConfig = {
                position: "bottom",
                time: {
                    parser: false,
                    format: false,
                    unit: false,
                    round: false,
                    displayFormat: false,
                    isoWeekday: false,
                    displayFormats: {
                        millisecond: "h:mm:ss.SSS a",
                        second: "h:mm:ss a",
                        minute: "h:mm:ss a",
                        hour: "MMM D, hA",
                        day: "ll",
                        week: "ll",
                        month: "MMM YYYY",
                        quarter: "[Q]Q - YYYY",
                        year: "YYYY"
                    }
                },
                ticks: {
                    autoSkip: false
                }
            };
            var TimeScale = Chart.Scale.extend({
                initialize: function() {
                    if (!moment) {
                        throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com");
                    }
                    Chart.Scale.prototype.initialize.call(this);
                },
                getLabelMoment: function(datasetIndex, index) {
                    return this.labelMoments[datasetIndex][index];
                },
                getMomentStartOf: function(tick) {
                    if (this.options.time.unit === "week" && this.options.time.isoWeekday !== false) {
                        return tick.clone().startOf("isoWeek").isoWeekday(this.options.time.isoWeekday);
                    } else {
                        return tick.clone().startOf(this.tickUnit);
                    }
                },
                determineDataLimits: function() {
                    this.labelMoments = [];
                    var scaleLabelMoments = [];
                    if (this.chart.data.labels && this.chart.data.labels.length > 0) {
                        helpers.each(this.chart.data.labels, function(label, index) {
                            var labelMoment = this.parseTime(label);
                            if (labelMoment.isValid()) {
                                if (this.options.time.round) {
                                    labelMoment.startOf(this.options.time.round);
                                }
                                scaleLabelMoments.push(labelMoment);
                            }
                        }, this);
                        this.firstTick = moment.min.call(this, scaleLabelMoments);
                        this.lastTick = moment.max.call(this, scaleLabelMoments);
                    } else {
                        this.firstTick = null;
                        this.lastTick = null;
                    }
                    helpers.each(this.chart.data.datasets, function(dataset, datasetIndex) {
                        var momentsForDataset = [];
                        var datasetVisible = this.chart.isDatasetVisible(datasetIndex);
                        if (typeof dataset.data[0] === "object" && dataset.data[0] !== null) {
                            helpers.each(dataset.data, function(value, index) {
                                var labelMoment = this.parseTime(this.getRightValue(value));
                                if (labelMoment.isValid()) {
                                    if (this.options.time.round) {
                                        labelMoment.startOf(this.options.time.round);
                                    }
                                    momentsForDataset.push(labelMoment);
                                    if (datasetVisible) {
                                        this.firstTick = this.firstTick !== null ? moment.min(this.firstTick, labelMoment) : labelMoment;
                                        this.lastTick = this.lastTick !== null ? moment.max(this.lastTick, labelMoment) : labelMoment;
                                    }
                                }
                            }, this);
                        } else {
                            momentsForDataset = scaleLabelMoments;
                        }
                        this.labelMoments.push(momentsForDataset);
                    }, this);
                    if (this.options.time.min) {
                        this.firstTick = this.parseTime(this.options.time.min);
                    }
                    if (this.options.time.max) {
                        this.lastTick = this.parseTime(this.options.time.max);
                    }
                    this.firstTick = (this.firstTick || moment()).clone();
                    this.lastTick = (this.lastTick || moment()).clone();
                },
                buildTicks: function(index) {
                    this.ctx.save();
                    var tickFontSize = helpers.getValueOrDefault(this.options.ticks.fontSize, Chart.defaults.global.defaultFontSize);
                    var tickFontStyle = helpers.getValueOrDefault(this.options.ticks.fontStyle, Chart.defaults.global.defaultFontStyle);
                    var tickFontFamily = helpers.getValueOrDefault(this.options.ticks.fontFamily, Chart.defaults.global.defaultFontFamily);
                    var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
                    this.ctx.font = tickLabelFont;
                    this.ticks = [];
                    this.unitScale = 1;
                    this.scaleSizeInUnits = 0;
                    if (this.options.time.unit) {
                        this.tickUnit = this.options.time.unit || "day";
                        this.displayFormat = this.options.time.displayFormats[this.tickUnit];
                        this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, true);
                        this.unitScale = helpers.getValueOrDefault(this.options.time.unitStepSize, 1);
                    } else {
                        var innerWidth = this.isHorizontal() ? this.width - (this.paddingLeft + this.paddingRight) : this.height - (this.paddingTop + this.paddingBottom);
                        var tempFirstLabel = this.tickFormatFunction(this.firstTick, 0, []);
                        var tickLabelWidth = this.ctx.measureText(tempFirstLabel).width;
                        var cosRotation = Math.cos(helpers.toRadians(this.options.ticks.maxRotation));
                        var sinRotation = Math.sin(helpers.toRadians(this.options.ticks.maxRotation));
                        tickLabelWidth = tickLabelWidth * cosRotation + tickFontSize * sinRotation;
                        var labelCapacity = innerWidth / tickLabelWidth;
                        this.tickUnit = "millisecond";
                        this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, true);
                        this.displayFormat = this.options.time.displayFormats[this.tickUnit];
                        var unitDefinitionIndex = 0;
                        var unitDefinition = time.units[unitDefinitionIndex];
                        while (unitDefinitionIndex < time.units.length) {
                            this.unitScale = 1;
                            if (helpers.isArray(unitDefinition.steps) && Math.ceil(this.scaleSizeInUnits / labelCapacity) < helpers.max(unitDefinition.steps)) {
                                for (var idx = 0; idx < unitDefinition.steps.length; ++idx) {
                                    if (unitDefinition.steps[idx] >= Math.ceil(this.scaleSizeInUnits / labelCapacity)) {
                                        this.unitScale = helpers.getValueOrDefault(this.options.time.unitStepSize, unitDefinition.steps[idx]);
                                        break;
                                    }
                                }
                                break;
                            } else if (unitDefinition.maxStep === false || Math.ceil(this.scaleSizeInUnits / labelCapacity) < unitDefinition.maxStep) {
                                this.unitScale = helpers.getValueOrDefault(this.options.time.unitStepSize, Math.ceil(this.scaleSizeInUnits / labelCapacity));
                                break;
                            } else {
                                ++unitDefinitionIndex;
                                unitDefinition = time.units[unitDefinitionIndex];
                                this.tickUnit = unitDefinition.name;
                                var leadingUnitBuffer = this.firstTick.diff(this.getMomentStartOf(this.firstTick), this.tickUnit, true);
                                var trailingUnitBuffer = this.getMomentStartOf(this.lastTick.clone().add(1, this.tickUnit)).diff(this.lastTick, this.tickUnit, true);
                                this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, true) + leadingUnitBuffer + trailingUnitBuffer;
                                this.displayFormat = this.options.time.displayFormats[unitDefinition.name];
                            }
                        }
                    }
                    var roundedStart;
                    if (!this.options.time.min) {
                        this.firstTick = this.getMomentStartOf(this.firstTick);
                        roundedStart = this.firstTick;
                    } else {
                        roundedStart = this.getMomentStartOf(this.firstTick);
                    }
                    if (!this.options.time.max) {
                        var roundedEnd = this.getMomentStartOf(this.lastTick);
                        if (roundedEnd.diff(this.lastTick, this.tickUnit, true) !== 0) {
                            this.lastTick = this.getMomentStartOf(this.lastTick.add(1, this.tickUnit));
                        }
                    }
                    this.smallestLabelSeparation = this.width;
                    helpers.each(this.chart.data.datasets, function(dataset, datasetIndex) {
                        for (var i = 1; i < this.labelMoments[datasetIndex].length; i++) {
                            this.smallestLabelSeparation = Math.min(this.smallestLabelSeparation, this.labelMoments[datasetIndex][i].diff(this.labelMoments[datasetIndex][i - 1], this.tickUnit, true));
                        }
                    }, this);
                    if (this.options.time.displayFormat) {
                        this.displayFormat = this.options.time.displayFormat;
                    }
                    this.ticks.push(this.firstTick.clone());
                    for (var i = 1; i <= this.scaleSizeInUnits; ++i) {
                        var newTick = roundedStart.clone().add(i, this.tickUnit);
                        if (this.options.time.max && newTick.diff(this.lastTick, this.tickUnit, true) >= 0) {
                            break;
                        }
                        if (i % this.unitScale === 0) {
                            this.ticks.push(newTick);
                        }
                    }
                    var diff = this.ticks[this.ticks.length - 1].diff(this.lastTick, this.tickUnit);
                    if (diff !== 0 || this.scaleSizeInUnits === 0) {
                        if (this.options.time.max) {
                            this.ticks.push(this.lastTick.clone());
                            this.scaleSizeInUnits = this.lastTick.diff(this.ticks[0], this.tickUnit, true);
                        } else {
                            this.ticks.push(this.lastTick.clone());
                            this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, true);
                        }
                    }
                    this.ctx.restore();
                },
                getLabelForIndex: function(index, datasetIndex) {
                    var label = this.chart.data.labels && index < this.chart.data.labels.length ? this.chart.data.labels[index] : "";
                    if (typeof this.chart.data.datasets[datasetIndex].data[0] === "object") {
                        label = this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
                    }
                    if (this.options.time.tooltipFormat) {
                        label = this.parseTime(label).format(this.options.time.tooltipFormat);
                    }
                    return label;
                },
                tickFormatFunction: function tickFormatFunction(tick, index, ticks) {
                    var formattedTick = tick.format(this.displayFormat);
                    var tickOpts = this.options.ticks;
                    var callback = helpers.getValueOrDefault(tickOpts.callback, tickOpts.userCallback);
                    if (callback) {
                        return callback(formattedTick, index, ticks);
                    } else {
                        return formattedTick;
                    }
                },
                convertTicksToLabels: function() {
                    this.tickMoments = this.ticks;
                    this.ticks = this.ticks.map(this.tickFormatFunction, this);
                },
                getPixelForValue: function(value, index, datasetIndex, includeOffset) {
                    var labelMoment = value && value.isValid && value.isValid() ? value : this.getLabelMoment(datasetIndex, index);
                    if (labelMoment) {
                        var offset = labelMoment.diff(this.firstTick, this.tickUnit, true);
                        var decimal = offset / this.scaleSizeInUnits;
                        if (this.isHorizontal()) {
                            var innerWidth = this.width - (this.paddingLeft + this.paddingRight);
                            var valueWidth = innerWidth / Math.max(this.ticks.length - 1, 1);
                            var valueOffset = innerWidth * decimal + this.paddingLeft;
                            return this.left + Math.round(valueOffset);
                        } else {
                            var innerHeight = this.height - (this.paddingTop + this.paddingBottom);
                            var valueHeight = innerHeight / Math.max(this.ticks.length - 1, 1);
                            var heightOffset = innerHeight * decimal + this.paddingTop;
                            return this.top + Math.round(heightOffset);
                        }
                    }
                },
                getPixelForTick: function(index, includeOffset) {
                    return this.getPixelForValue(this.tickMoments[index], null, null, includeOffset);
                },
                getValueForPixel: function(pixel) {
                    var innerDimension = this.isHorizontal() ? this.width - (this.paddingLeft + this.paddingRight) : this.height - (this.paddingTop + this.paddingBottom);
                    var offset = (pixel - (this.isHorizontal() ? this.left + this.paddingLeft : this.top + this.paddingTop)) / innerDimension;
                    offset *= this.scaleSizeInUnits;
                    return this.firstTick.clone().add(moment.duration(offset, this.tickUnit).asSeconds(), "seconds");
                },
                parseTime: function(label) {
                    if (typeof this.options.time.parser === "string") {
                        return moment(label, this.options.time.parser);
                    }
                    if (typeof this.options.time.parser === "function") {
                        return this.options.time.parser(label);
                    }
                    if (typeof label.getMonth === "function" || typeof label === "number") {
                        return moment(label);
                    }
                    if (label.isValid && label.isValid()) {
                        return label;
                    }
                    if (typeof this.options.time.format !== "string" && this.options.time.format.call) {
                        console.warn("options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale");
                        return this.options.time.format(label);
                    }
                    return moment(label, this.options.time.format);
                }
            });
            Chart.scaleService.registerScaleType("time", TimeScale, defaultConfig);
        };
    }, {
        moment: 1
    } ]
}, {}, [ 7 ]);

(function() {})();

!function(name, context, definition) {
    if (typeof module !== "undefined") module.exports = definition(name, context); else if (typeof define === "function" && typeof define.amd === "object") define(definition); else context[name] = definition(name, context);
}("humane", this, function(name, context) {
    var win = window;
    var doc = document;
    var ENV = {
        on: function(el, type, cb) {
            "addEventListener" in win ? el.addEventListener(type, cb, false) : el.attachEvent("on" + type, cb);
        },
        off: function(el, type, cb) {
            "removeEventListener" in win ? el.removeEventListener(type, cb, false) : el.detachEvent("on" + type, cb);
        },
        bind: function(fn, ctx) {
            return function() {
                fn.apply(ctx, arguments);
            };
        },
        isArray: Array.isArray || function(obj) {
            return Object.prototype.toString.call(obj) === "[object Array]";
        },
        config: function(preferred, fallback) {
            return preferred != null ? preferred : fallback;
        },
        transSupport: false,
        useFilter: /msie [678]/i.test(navigator.userAgent),
        _checkTransition: function() {
            var el = doc.createElement("div");
            var vendors = {
                webkit: "webkit",
                Moz: "",
                O: "o",
                ms: "MS"
            };
            for (var vendor in vendors) if (vendor + "Transition" in el.style) {
                this.vendorPrefix = vendors[vendor];
                this.transSupport = true;
            }
        }
    };
    ENV._checkTransition();
    var Humane = function(o) {
        o || (o = {});
        this.queue = [];
        this.baseCls = o.baseCls || "humane";
        this.addnCls = o.addnCls || "";
        this.timeout = "timeout" in o ? o.timeout : 2500;
        this.waitForMove = o.waitForMove || false;
        this.clickToClose = o.clickToClose || false;
        this.timeoutAfterMove = o.timeoutAfterMove || false;
        this.container = o.container;
        try {
            this._setupEl();
        } catch (e) {
            ENV.on(win, "load", ENV.bind(this._setupEl, this));
        }
    };
    Humane.prototype = {
        constructor: Humane,
        _setupEl: function() {
            var el = doc.createElement("div");
            el.style.display = "none";
            if (!this.container) {
                if (doc.body) this.container = doc.body; else throw "document.body is null";
            }
            this.container.appendChild(el);
            this.el = el;
            this.removeEvent = ENV.bind(function() {
                var timeoutAfterMove = ENV.config(this.currentMsg.timeoutAfterMove, this.timeoutAfterMove);
                if (!timeoutAfterMove) {
                    this.remove();
                } else {
                    setTimeout(ENV.bind(this.remove, this), timeoutAfterMove);
                }
            }, this);
            this.transEvent = ENV.bind(this._afterAnimation, this);
            this._run();
        },
        _afterTimeout: function() {
            if (!ENV.config(this.currentMsg.waitForMove, this.waitForMove)) this.remove(); else if (!this.removeEventsSet) {
                ENV.on(doc.body, "mousemove", this.removeEvent);
                ENV.on(doc.body, "click", this.removeEvent);
                ENV.on(doc.body, "keypress", this.removeEvent);
                ENV.on(doc.body, "touchstart", this.removeEvent);
                this.removeEventsSet = true;
            }
        },
        _run: function() {
            if (this._animating || !this.queue.length || !this.el) return;
            this._animating = true;
            if (this.currentTimer) {
                clearTimeout(this.currentTimer);
                this.currentTimer = null;
            }
            var msg = this.queue.shift();
            var clickToClose = ENV.config(msg.clickToClose, this.clickToClose);
            if (clickToClose) {
                ENV.on(this.el, "click", this.removeEvent);
                ENV.on(this.el, "touchstart", this.removeEvent);
            }
            var timeout = ENV.config(msg.timeout, this.timeout);
            if (timeout > 0) this.currentTimer = setTimeout(ENV.bind(this._afterTimeout, this), timeout);
            if (ENV.isArray(msg.html)) msg.html = "<ul><li>" + msg.html.join("<li>") + "</ul>";
            this.el.innerHTML = msg.html;
            this.currentMsg = msg;
            this.el.className = this.baseCls;
            if (ENV.transSupport) {
                this.el.style.display = "block";
                setTimeout(ENV.bind(this._showMsg, this), 50);
            } else {
                this._showMsg();
            }
        },
        _setOpacity: function(opacity) {
            if (ENV.useFilter) {
                try {
                    this.el.filters.item("DXImageTransform.Microsoft.Alpha").Opacity = opacity * 100;
                } catch (err) {}
            } else {
                this.el.style.opacity = String(opacity);
            }
        },
        _showMsg: function() {
            var addnCls = ENV.config(this.currentMsg.addnCls, this.addnCls);
            if (ENV.transSupport) {
                this.el.className = this.baseCls + " " + addnCls + " " + this.baseCls + "-animate";
            } else {
                var opacity = 0;
                this.el.className = this.baseCls + " " + addnCls + " " + this.baseCls + "-js-animate";
                this._setOpacity(0);
                this.el.style.display = "block";
                var self = this;
                var interval = setInterval(function() {
                    if (opacity < 1) {
                        opacity += .1;
                        if (opacity > 1) opacity = 1;
                        self._setOpacity(opacity);
                    } else clearInterval(interval);
                }, 30);
            }
        },
        _hideMsg: function() {
            var addnCls = ENV.config(this.currentMsg.addnCls, this.addnCls);
            if (ENV.transSupport) {
                this.el.className = this.baseCls + " " + addnCls;
                ENV.on(this.el, ENV.vendorPrefix ? ENV.vendorPrefix + "TransitionEnd" : "transitionend", this.transEvent);
            } else {
                var opacity = 1;
                var self = this;
                var interval = setInterval(function() {
                    if (opacity > 0) {
                        opacity -= .1;
                        if (opacity < 0) opacity = 0;
                        self._setOpacity(opacity);
                    } else {
                        self.el.className = self.baseCls + " " + addnCls;
                        clearInterval(interval);
                        self._afterAnimation();
                    }
                }, 30);
            }
        },
        _afterAnimation: function() {
            if (ENV.transSupport) ENV.off(this.el, ENV.vendorPrefix ? ENV.vendorPrefix + "TransitionEnd" : "transitionend", this.transEvent);
            if (this.currentMsg.cb) this.currentMsg.cb();
            this.el.style.display = "none";
            this._animating = false;
            this._run();
        },
        remove: function(e) {
            var cb = typeof e == "function" ? e : null;
            ENV.off(doc.body, "mousemove", this.removeEvent);
            ENV.off(doc.body, "click", this.removeEvent);
            ENV.off(doc.body, "keypress", this.removeEvent);
            ENV.off(doc.body, "touchstart", this.removeEvent);
            ENV.off(this.el, "click", this.removeEvent);
            ENV.off(this.el, "touchstart", this.removeEvent);
            this.removeEventsSet = false;
            if (cb && this.currentMsg) this.currentMsg.cb = cb;
            if (this._animating) this._hideMsg(); else if (cb) cb();
        },
        log: function(html, o, cb, defaults) {
            var msg = {};
            if (defaults) for (var opt in defaults) msg[opt] = defaults[opt];
            if (typeof o == "function") cb = o; else if (o) for (var opt in o) msg[opt] = o[opt];
            msg.html = html;
            if (cb) msg.cb = cb;
            this.queue.push(msg);
            this._run();
            return this;
        },
        spawn: function(defaults) {
            var self = this;
            return function(html, o, cb) {
                self.log.call(self, html, o, cb, defaults);
                return self;
            };
        },
        create: function(o) {
            return new Humane(o);
        }
    };
    return new Humane();
});

function get(o) {
    if (!o) throw new TypeError();
    var attr;
    typeof o === "object" ? attr = o : attr = o.slice(0, 1);
    if (attr === ".") {
        return document.getElementsByClassName(o.slice(1, o.length));
    } else if (attr === "#") {
        return document.getElementById(o.slice(1, o.length));
    } else if (typeof attr === "object") {
        return o;
    }
}

function log() {
    console.log(arguments);
}

function css(o, p) {
    if (!o && !p) throw new TypeError();
    for (var i in p) {
        o.style[i] = p[i];
    }
    return o;
}

function isArray(a) {
    if (a && a.length && a.length >= 0 && isFinite(a.length) && a.length <= Math.pow(2, 32)) {
        return true;
    } else {
        return false;
    }
}

Object.defineProperties(Object.prototype, {
    replaceText: {
        value: function(t, n) {
            var mes = "There are no any text.";
            if (!t) throw new TypeError(mes);
            mes = "It is not a string";
            if (typeof t !== "string") throw new TypeError(mes);
            this.removeChild(this.childNodes[0]);
            this.appendChild(document.createTextNode(t));
            return this;
        },
        writable: true,
        enumerable: false,
        configurable: true
    },
    getText: {
        value: function() {
            var mes = "Apply this method to object.";
            if (typeof this !== "object") throw new TypeError(mes);
            return this.childNodes[0].nodeValue;
        },
        writable: true,
        enumerable: false,
        configurable: true
    }
});

HTMLElement.prototype.getChildren = function() {
    var children = [], child;
    if (classOf(this) === "Array") {
        this.forEach(function(x, i, a) {
            if (x.children && x.children.length) {
                child = x.children;
                for (var i in child) {
                    if (child.hasOwnProperty(i)) {
                        children.push(child[i]);
                    }
                }
            }
        });
    } else if (classOf(this) === "HTMLElement") {
        if (this.children.length) {
            child = this.children;
            for (var i in child) {
                if (child.hasOwnProperty(i)) {
                    children.push(child[i]);
                }
            }
        }
    } else if (classOf(this) === "HTMLTableRowElement") {
        if (this.children.length) {
            child = this.children;
            for (var i in child) {
                if (child.hasOwnProperty(i)) {
                    children.push(child[i]);
                }
            }
        }
    } else if (classOf(this) === "HTMLTableSectionElement") {
        if (this.children.length) {
            child = this.children;
            for (var i in child) {
                if (child.hasOwnProperty(i)) {
                    children.push(child[i]);
                }
            }
        }
    }
    return children;
};

Array.prototype.getChildren = HTMLElement.prototype.getChildren;

function parentOf() {
    var each = Array.prototype.forEach;
    var self = this;
    each.call(arguments, function(x) {
        self.appendChild(x);
    });
    return self;
}

HTMLElement.prototype.parentOf = parentOf;

function cutClassTo(str) {
    isCorrect(str, "String");
    try {
        isCorrect(this, "HTMLElement");
    } catch (e1) {
        try {
            isCorrect(this, "HTMLTableCellElement");
        } catch (e2) {
            try {
                isCorrect(this, "HTMLTableRowElement");
            } catch (e3) {
                try {
                    isCorrect(this, "HTMLInputElement");
                } catch (e4) {
                    console.log("Incoming parameter doesn't belong to HTMLElement, HTMLInputElement, HTMLTableRowElement, HTMLTableCellElement");
                }
            }
        }
    }
    if (arguments[1]) {
        return this.className.slice(0, this.className.lastIndexOf(str));
    } else {
        return this.className.slice(0, this.className.indexOf(str));
    }
}

HTMLElement.prototype.cutClassTo = cutClassTo;

function typeAndValue(x) {
    if (x == null) return "";
    switch (x.constructor) {
      case Number:
        return "Number: " + x;

      case String:
        return "String: '" + x + "'";

      case Date:
        return "Date: " + x;

      case Boolean:
        return "Boolean: " + x;

      case RegExp:
        return "RegExp: " + x;

      case List:
        return "List: " + x;
    }
}

function type(o) {
    var c, t, n;
    if (o === null) return "null";
    if (o !== o) return "nan";
    if ((t = typeof o) !== "object") return t;
    if ((c = classOf(o)) !== "Object") return c;
    if (n = o.constructor.getName()) return n;
    return "Object";
}

function classOf(o) {
    return Object.prototype.toString.call(o).slice(8, -1);
}

Function.prototype.getName = function() {
    if ("name" in this) return this.name;
    return this.name = this.toString().match(/function\s*([^(]*)\(/)[1];
};

function quacks(o) {
    for (var i = 1; i <= arguments.length - 1; i++) {
        var arg = arguments[i];
        switch (typeof arg) {
          case "string":
            if (o[arg] !== "function") return false;
            continue;

          case "function":
            arg = arg.prototype;

          case "object":
            for (var j in arg) {
                if (typeof arg[j] !== "function") continue;
                if (typeof o[j] !== "function") return false;
            }
        }
    }
    return true;
}

(function() {
    var container = get("#container"), cHeight = container.clientHeight;
    if (screen.availHeight) {
        var m = (screen.availHeight - cHeight) / 6;
        css(container, {
            marginTop: m + "px"
        });
    }
})();

function xhr() {
    if (window.XMLHttpRequest === undefined) {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.6.0");
        } catch (e1) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP.3.0");
            } catch (e2) {
                throw new Error("XMLHttpRequest doesn't support");
            }
        }
    } else {
        return new XMLHttpRequest();
    }
}

function isString(str) {
    if (typeof str !== "string") throw new TypeError("Incoming parameter is not an object. It is " + typeof str);
}

function parseToArr(str) {
    isString(str);
    var arr = [];
    for (i = 0; i < str.length - 1; i++) {
        if (str[i] !== " " && typeof parseInt(str[i]) === "number") {
            arr.push(!!parseInt(str[i]));
        }
    }
    return arr;
}

function getArr(str) {
    isString(str);
    var arr = [], p = 0, n = 1;
    while (n > 0) {
        n = str.indexOf(",", n);
        n += 1;
        if (n !== 0) {
            arr.push(str.slice(p, n - 1));
        } else {
            arr.push(str.slice(p, str.length));
        }
        p = n;
    }
    return arr;
}

function parseLogic(arr) {
    if (!arr) throw new TypeError("Incoming parameter is not an object. It is " + typeof arr);
    var obj = {}, logicName, logicValue;
    for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        logicName = str.slice(0, str.indexOf("-") - 1);
        logicValue = str.slice(str.indexOf("-") + 2);
        obj[i] = {};
        obj[i].name = logicName;
        obj[i].value = logicValue;
    }
    return obj;
}

function count(i) {
    i == undefined ? i = 0 : i;
    return function() {
        return i++;
    };
}

var counter = count(1);

function setCookies(name, value, daysToLive) {
    var cookie = name + "=" + encodeURIComponent(value);
    if (typeof daysToLive === "number") {
        cookie += "; max-age=" + daysToLive * 60 * 60 * 24;
    }
    document.cookie = cookie;
}

function getCookies() {
    var cookies = {};
    var all = document.cookie;
    if (all === "") return cookies;
    var list = all.split("; ");
    for (var i = 0; i <= list.length - 1; i++) {
        var cookie = list[i];
        var p = cookie.indexOf("=");
        var name = cookie.slice(0, p);
        var value = cookie.slice(p + 1);
        value = decodeURIComponent(value);
        cookies[name] = value;
    }
    return cookies;
}

function deleteCookies(name) {
    document.cookie = name + "=" + "; expires=Thu, 01 Jan 1970 00:00:01 GMT";
}

function toHTMLView(obj) {
    if (typeof obj !== "object" && classOf(obj) !== "Array") throw new TypeError("Incoming parameter doesn't have 'object' type");
    var layout = get(".ready-algorithm")[0], title = layout.getChildren().getChildren();
    var arr = obj.map(function(x, i, a) {
        var clone = layout.cloneNode(true), cloneTitle = clone.getChildren().getChildren();
        clone.removeAttribute("hidden");
        clone.id = "";
        clone.className = clone.className.slice(0, clone.className.lastIndexOf("-") + 1) + counter();
        if (cloneTitle[0]) {
            cloneTitle[0].replaceText(x);
        }
        var existingScripts = [ "all.js", "yandex" ];
        if (cloneTitle[0]) {
            if (cloneTitle[0].innerText !== "Вы ещё не загрузили ни один алгоритм") {
                clone.onclick = function() {
                    var isActive = get("#active-algorithm");
                    if (isActive) {
                        isActive.id = "";
                    }
                    this.id = "active-algorithm";
                    var scripts = document.getElementsByTagName("script");
                    for (var h = 0; h <= scripts.length - 1; h++) {
                        var condition = scripts[h].src.indexOf(existingScripts[0]) + 1 || scripts[h].src.indexOf(existingScripts[1]) + 1;
                        if (!condition) {
                            scripts[h].remove();
                        }
                    }
                    var script = document.createElement("script"), link = cloneTitle[0].innerText, path = "js/algorithms/";
                    script.src = path + link;
                    document.body.appendChild(script);
                };
            }
        }
        return clone;
    });
    var parent = get(".algorithms")[0];
    arr.forEach(function(x, i, a) {
        parent.appendChild(x);
    });
}

function sleep(element, styles, time) {
    if (!styles && !time) {
        setTimeout(function() {
            css(element, css({
                opacity: 0
            }));
        }, 300);
    }
    setTimeout(function() {
        css(element, styles);
    }, time);
}

function awake(element, styles, time) {
    if (!styles && !time) {
        setTimeout(function() {
            css(element, css({
                opacity: 1
            }));
        }, 300);
    }
    setTimeout(function() {
        css(element, styles);
    }, time);
}

function isCorrect(el, type) {
    if (!(classOf(el) === type)) throw new TypeError("Incoming parameter does not belong to '" + type + "' class!"); else return true;
}

function replaceInSleep(element, str, time) {
    isCorrect(str, "String");
    setTimeout(function() {
        if (element.value) {
            element.value = str;
        } else {
            element.replaceText(str);
        }
    }, time);
    return true;
}

function addFiles(s) {
    if (!(classOf(s) === "XMLHttpRequest")) throw new TypeError("Incoming parameter is not an 'XMLHttpRequest' object!");
    try {
        if (s.responseText) {
            var answer = JSON.parse(s.responseText);
            if (!answer.length) {
                answer.push("Вы ещё не загрузили ни один алгоритм");
            }
            var toURIView = encodeURIComponent(answer);
            if (toURIView !== getCookies().answer) {
                deleteCookies();
                setCookies("answer", answer, 1);
            }
            var resultCookies = getCookies();
            var cookiesArr = getArr(resultCookies.answer);
            if (arguments[1]) {
                var exist = arguments[1];
                for (var k in exist) {
                    if (exist[k] === "exists") {
                        delete cookiesArr[k];
                    }
                }
            }
            toHTMLView(cookiesArr);
        }
    } catch (e) {
        console.log(e);
    }
}

function removeNotExisting(s) {
    if (!(classOf(s) === "XMLHttpRequest")) throw new TypeError("Incoming parameter is not an 'XMLHttpRequest' object!");
    try {
        if (s.responseText) {
            var exist = get(".ready-algorithm"), choosenFiles = get("#upload-file"), each = Array.prototype.forEach, parts = [], titles = [], c = count(1), answer = JSON.parse(s.responseText);
            each.call(exist, function(x, i, a) {
                parts.push(get(".algorithm-" + c()));
                var part = parts[i];
                for (var p in part) {
                    if (part.hasOwnProperty(p)) {
                        if (p !== "length") {
                            var title = part[p].getChildren().getChildren();
                        }
                        for (var j in title) {
                            if (title.hasOwnProperty(j)) {
                                titles.push(title[j]);
                            }
                        }
                    }
                }
            });
            each.call(choosenFiles.files, function(x, i, a) {
                var name = x.name;
                for (var n in titles) {
                    if (titles[n].innerText === name) {
                        for (var t in answer) {
                            if (answer[t] === name) {
                                answer[t] = "exists";
                            }
                        }
                    } else if (titles[n].innerText === "Вы ещё не загрузили ни один алгоритм") {
                        titles[n].parentNode.parentNode.remove();
                        counter = count(1);
                    }
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
    return answer;
}

function check(x, i, a) {
    x.onclick = function() {
        var len = self.list.length;
        var isActive = get("#active-algorithm");
        isActive.id = "";
        this.id = "active-algorithm";
    };
}

function iHide(place, txt) {
    if (typeof txt !== "string") throw new TypeError("Incoming arguments is not a string");
    if (typeof place !== "object") throw new TypeError("Incoming arguments is not an object");
    var wraps = document.createElement("div"), snow = document.createElement("div"), close = document.createElement("input"), par = document.createElement("p");
    wraps.className = "snow-wrapper";
    snow.className = "snow";
    close.className = snow.className + "-close-it";
    par.className = "snow-paragraph span-10 offset-5";
    close.type = "button";
    close.value = "Отменить";
    close.onclick = function() {
        removeBody(".snow-wrapper");
    };
    css(wraps, {
        position: "absolute",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0
    });
    css(snow, {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        background: "white",
        opacity: "0.7",
        "-webkit-filter": "blur(10px)"
    });
    close.appendChild(document.createTextNode("закрыть"));
    txt = document.createTextNode(txt);
    place.parentOf(wraps.parentOf(snow, close, par.parentOf(txt)));
    return 1;
}

function removeBody(element) {
    var snowball = get(element);
    if (snowball.length) {
        css(snowball[0], {
            opacity: 0
        });
        setTimeout(function() {
            snowball[0].remove();
        }, 300);
    }
}

Array.prototype.findByClass = function(cls) {
    isCorrect(this, "Array") && isCorrect(cls, "String");
    var tmpArr = [];
    for (var i in this) {
        if (typeof this[i] !== "function") {
            if (this.hasOwnProperty(i)) {
                if (this[i].className.indexOf(cls) + 1) {
                    tmpArr.push(this[i]);
                }
            }
        }
    }
    return tmpArr;
};

function drawCircle(can, x, y, r, s, e, sc, fc, lw, tx) {
    can.beginPath();
    can.arc(x, y, r, s, e);
    can.lineWidth = lw;
    if (sc && fc) {
        can.fillStyle = fc;
        can.strokeStyle = sc;
        can.stroke();
        can.fill();
    } else if (sc) {
        can.strokeStyle = sc;
        can.stroke();
    } else if (fc) {
        can.fillStyle = fc;
        can.fill();
    }
    if (tx) {
        can.font = "18px Tahoma";
        can.fillStyle = fc || sc;
        can.textAlign = "left";
        can.fillText(tx, x, y);
    }
}

function drawText(p, c, f, t, prop) {
    p.beginPath();
    p.fillStyle = c;
    p.font = f;
    var width = p.measureText(t.length).width, height = p.measureText("w").width;
    p.fillText(t, prop[0] - width / 2, prop[1] + height / 2);
}

function random(a, b) {
    return Math.abs(Math.floor(Math.random() * b - a));
}

function even(a) {
    if (a % 2 === 0) {
        return true;
    } else {
        return false;
    }
}

function summ(a, b) {
    return a + b;
}

function getDistance(start, end) {
    isCorrect(start, "Array");
    isCorrect(end, "Array");
    var x = end[0] - start[0], y = end[1] - start[1];
    var doubleX = Math.pow(x, 2), doubleY = Math.pow(y, 2);
    if (arguments.length === 2) {
        return parseInt(Math.sqrt(doubleX + doubleY).toFixed(arguments[arguments.length - 1]));
    } else {
        return Math.sqrt(doubleX + doubleY);
    }
}

(function() {
    function List(elements) {
        if (typeof elements !== "object") throw new TypeError("Incoming arguments is not an object");
        for (var i in elements) {
            if (typeof elements[i] !== "string") {
                this[i] = elements[i];
            } else {
                this[i] = get(elements[i]);
            }
        }
    }
    List.prototype.active = function() {
        if (this.list) {
            var self = this;
            if (this.list instanceof Array) {
                this.list.forEach(check);
            } else {
                Array.prototype.forEach.call(this.list, check);
            }
        }
    };
    List.prototype.toServer = function(file) {
        var form = get("#upload-form"), self = this;
        function sendForm(form) {
            var formData = new FormData(form);
            var request = xhr();
            request.open("POST", form.action, true);
            request.onload = function(e) {
                if (this.readyState === 4 && this.status === 200) {
                    addFiles(this, removeNotExisting(this));
                }
            };
            request.send(formData);
            return false;
        }
        sendForm(form);
    };
    List.prototype.file = function() {
        var self = this;
        this.button.onchange = function() {
            self.file = this.files[0];
            self.toServer();
            var fn = [];
            Array.prototype.forEach.call(this.files, function(x, i, a) {
                fn.push(x.name);
            });
            var fileBlock = self.fileName[0];
            css(fileBlock, {
                opacity: 0
            });
            setTimeout(function() {
                if (fn.length >= 2) {
                    fn = " Алгоритмы были загружены";
                } else {
                    fn = "Алгоритм " + fn[0] + " был загружен";
                }
                fileBlock.replaceText(fn);
                css(fileBlock, {
                    opacity: 1,
                    color: "#336f94"
                });
                fileBlock.className = fileBlock.className + " chose";
            }, self.transitions);
            sleep(fileBlock, {
                opacity: 0
            }, self.transitions * 5);
            setTimeout(function() {
                css(fileBlock, {
                    opacity: 0,
                    color: "rgba(108,104,116, 0.5)"
                });
                fileBlock.className = fileBlock.className.slice(0, fileBlock.className.lastIndexOf(" "));
                fileBlock.replaceText("Загружать только файлы с расширением '.js'!");
            }, self.transitions * 6);
            sleep(fileBlock, {
                opacity: 1
            }, self.transitions * 6);
        };
    };
    var loadingList = new List({
        section: "#loading-scripts",
        list: ".ready-algorithm",
        button: "#upload-file",
        fileName: ".file-name",
        transitions: 300,
        timeOffset: 100
    });
    loadingList.active();
    loadingList.file();
})();

(function() {
    var doc = get(document), moment = Date.now(), momentLater;
    doc.addEventListener("DOMContentLoaded", function() {
        momentLater = Date.now();
        moment = (momentLater - moment) / (1e3 * 60);
        var request = xhr(), formData = new FormData(), algorithms = get(".ready-algorithm"), each = Array.prototype.forEach, names = [];
        formData.append("load", "true");
        request.open("POST", "/search", true);
        request.onload = function(e) {
            if (this.readyState === 4 && this.status === 200) {
                addFiles(this);
            }
        };
        request.send(formData);
        return false;
    });
})();

(function() {
    var hardInput = get(".hard-drone-amount"), middleInput = get(".middle-drone-amount"), lightInput = get(".light-drone-amount"), each = Array.prototype.forEach, counting = count(0);
    var inputs = [ hardInput, middleInput, lightInput ], allInputs = [], am = 0;
    for (var j = 0; j <= inputs.length - 1; j++) {
        for (var k = 0; k <= inputs[j].length - 1; k++) {
            allInputs[am++] = inputs[j][k];
        }
    }
    for (var k = 0; k <= inputs.length - 1; k++) {
        each.call(inputs[k], function(x, i, a) {
            x.onchange = function() {
                numberMask(this);
            };
            x.onkeyup = function() {
                var amount = get(".planes-amount")[0], maxValue = parseInt(amount.innerText), currentValue = parseInt(this.value), allValues = 0, earlier = 0, self = this, time = 0;
                each.call(allInputs, function(x, i, a) {
                    if (x !== self) {
                        if (x.value) {
                            allValues += parseInt(x.value);
                        }
                    }
                });
                earlier = currentValue;
                currentValue += allValues;
                if (currentValue > maxValue) {
                    this.value = "";
                    this.placeholder = "БПЛА осталось: " + (maxValue - allValues);
                    css(this, {
                        border: "1px solid red"
                    });
                    var interval = setInterval(function() {
                        if (time >= 900) {
                            clearInterval(interval);
                        }
                        css(self, {
                            border: "1px solid transparent"
                        });
                        setTimeout(function() {
                            css(self, {
                                border: "1px solid red"
                            });
                        }, 300);
                        time += 300;
                    }, 300);
                } else {
                    this.placeholder = "Количество БПЛА.";
                }
                if (currentValue === maxValue) {
                    var c = counting();
                    if (c < 1) {
                        var drones = getDronesData();
                        toPage(drones);
                        parseDrones(drones);
                    }
                }
                return numberMask(this);
            };
            x.onfocus = function() {
                css(this, {
                    border: "1px solid #778899"
                });
            };
        });
    }
})();

function getDronesData() {
    var toParse = [ get(".hard-drone-amount"), get(".middle-drone-amount"), get(".light-drone-amount") ];
    var dronesData = [], each = Array.prototype.forEach;
    each.call(toParse, function(x, i, a) {
        each.call(x, function(y, j, b) {
            if (y.value) {
                var iParent = y.parentNode, droneName = "";
                iParent = iParent.getChildren();
                for (var m in iParent) {
                    if (typeof iParent[m] !== "function") {
                        if (iParent.hasOwnProperty(m)) {
                            var child = iParent[m];
                            if (child.className.indexOf("drone-name") + 1) {
                                droneName = child.innerText;
                            }
                        }
                    }
                }
                var classes = y.cutClassTo("-", true);
                classes = classes.slice(classes.indexOf("2") + 2);
                var grandma = y.parentNode.parentNode, specifications = {}, greatGrandson = grandma.getChildren().getChildren().getChildren(), grandchildren = [];
                for (var t in greatGrandson) {
                    if (typeof greatGrandson[t] !== "function") {
                        if (greatGrandson.hasOwnProperty(t)) {
                            if (greatGrandson[t].localName === "article") {
                                grandchildren.push(greatGrandson[t]);
                            }
                        }
                    }
                }
                var values = grandchildren.getChildren().findByClass("chars-values");
                grandchildren.forEach(function(z, q, c) {
                    var tempClass = z.className;
                    tempClass = tempClass.slice(tempClass.lastIndexOf(" ") + 1, tempClass.lastIndexOf("-"));
                    specifications[tempClass] = parseInt(values[q].innerText);
                });
                var a = parseInt(y.value), clr = [];
                for (var c = 0; c <= a - 1; c++) {
                    clr.push(colorIs(30, 200));
                }
                dronesData.push({
                    name: droneName,
                    type: classes,
                    amount: a,
                    specification: specifications,
                    colors: clr
                });
            }
        });
    });
    return dronesData;
}

function numberMask(obj) {
    obj.value = obj.value.replace(/[^\d]/g, "");
}

function colorIs(from, to) {
    var r = Math.abs(Math.floor(Math.random() * to - from)), b = Math.abs(Math.floor(Math.random() * to - from)), g = Math.abs(Math.floor(Math.random() * to - from)), o = .7;
    return "rgba(" + r + ", " + b + ", " + g + ", " + o + ")";
}

function toPage(obj) {
    isCorrect(obj, "Array");
    var c = count(1), counter = c();
    var types = {
        "hard-drone": "Тяжелый БПЛА",
        "middle-drone": "Средний БПЛА",
        "light-drone": "Лёгкий БПЛА"
    }, each = Array.prototype.forEach, section = document.createElement("section"), close = document.createElement("input"), subsection = document.createElement("section"), head = document.createElement("header"), headH1 = document.createElement("h1"), h1Text = document.createTextNode("Беспилотники на месте базирования!"), planesBlock = get("#planes-section"), planesParent = planesBlock.parentNode;
    section.id = "drones-colors";
    section.className = "span-18 offset-1";
    subsection.id = "drones-subsection-colors";
    subsection.className = "span-20";
    close.type = "button";
    close.id = "close-" + section.id;
    close.className = "span-10 offset-5";
    head.className = "span-20 color-header";
    section.parentOf(head.parentOf(headH1.parentOf(h1Text)));
    for (var i = 0; i <= obj.length - 1; i++) {
        var aDrone = obj[i];
        for (var j = 0; j <= aDrone.amount - 1; j++) {
            var article = document.createElement("article"), header = document.createElement("header"), h2 = document.createElement("h2"), h5 = document.createElement("h5"), div = document.createElement("div"), droneName = document.createTextNode(aDrone.name), control = get("#control-additional");
            for (var q in types) {
                if (q === aDrone.type) {
                    var droneType = document.createTextNode(types[q]);
                }
            }
            article.className = "drones-information drone-info-" + counter;
            header.className = "drone-info-headers";
            div.className = "drone-trace trace-" + counter;
            css(article, {
                width: "13.5%",
                "float": "left",
                marginTop: "2%"
            });
            css(div, {
                backgroundColor: aDrone.colors[j],
                height: "6px",
                width: "18px",
                margin: "0 auto"
            });
            subsection.parentOf(article.parentOf(div, header.parentOf(h5.parentOf(droneType), h2.parentOf(droneName))));
            counter = c();
            control.insertBefore(section.parentOf(subsection), planesBlock);
        }
    }
}

function parseDrones(obj, callback) {
    isCorrect(obj, "Array");
    var tempObj = [], band = new Planes();
    for (var i = 0; i <= obj.length - 1; i++) {
        var current = obj[i];
        for (var j = 0; j <= current.amount - 1; j++) {
            var props = {};
            for (var k in current) {
                if (k === "amount") {
                    continue;
                } else if (k === "colors") {
                    props[k] = current[k][j];
                } else {
                    props[k] = current[k];
                }
            }
            props.iAm = j + 1;
            tempObj.push(props);
        }
    }
    Planes.prototype.all = tempObj;
    band.initialize();
}

(function() {
    var hardButtons = get(".hard-drone-hide"), hardContent = get(".chars"), each = Array.prototype.forEach;
    each.call(hardButtons, function(x, i, a) {
        x.onclick = function() {
            console.log(hardContent[i].id);
            if (hardContent[i].id === "active") {
                hardContent[i].id = "";
            } else {
                hardContent[i].id = "active";
            }
        };
    });
    var middleButtons = get(".middle-drone-hide"), middleContent = get(".chars"), slicy = Array.prototype.slice;
    middleContent = slicy.call(middleContent, hardButtons.length);
    each.call(middleButtons, function(x, i, a) {
        x.onclick = function() {
            if (middleContent[i].id === "active") {
                middleContent[i].id = "";
            } else {
                middleContent[i].id = "active";
            }
        };
    });
    var lightButtons = get(".light-drone-hide"), lightContent = get(".chars");
    lightContent = slicy.call(lightContent, hardButtons.length + middleButtons.length);
    each.call(lightButtons, function(x, i, a) {
        x.onclick = function() {
            if (lightContent[i].id === "active") {
                lightContent[i].id = "";
            } else {
                lightContent[i].id = "active";
            }
        };
    });
})();

function MapInteraction(elements) {
    if (elements === undefined) {
        elements = {};
    }
    if (typeof elements !== "object") throw new TypeError("Incoming arguments is not an object");
    for (var i in elements) {
        if (typeof elements[i] !== "string") {
            this[i] = elements[i];
        } else {
            this[i] = get(elements[i]);
        }
    }
}

MapInteraction.prototype.setDotes = function() {
    var self = this, oldDotesAmount = parseInt(self.dotes.amount.innerText);
    var counter = count(1);
    self.dotes.button.onclick = function() {
        var snowball = get(".snow"), dotesAmount = self.dotes.amount.innerText, ending = "";
        dotesAmount > 1 ? ending = " точечных целей!" : ending = " точечную цель!";
        if (!snowball.length) {
            iHide(self.panel, "Кликните на карту и определите " + dotesAmount + ending);
        }
        var wasChanged = false;
        myMap.events.add("click", installDotes);
        var interval = setInterval(function() {
            if (wasChanged) {
                clearInterval(interval);
                myMap.events.remove("click", installDotes);
            }
        }, 10);
        function installDotes(e) {
            var updatedDotesAmount = parseInt(self.dotes.amount.innerText);
            if (dotesTargets.get(updatedDotesAmount - 1)) {
                self.dotesCoordinates.length = 0;
                dotesTargets.removeAll();
                counter = count(1);
            }
            var coords = e.get("coords");
            var coords = e.get("coords"), lon = get(".lon-base"), lat = get(".lat-base"), closeSnow = get(".snow-close-it")[0], par = get(".snow-paragraph")[0];
            if (closeSnow && par && self.dotesCoordinates.length + 1 === parseInt(self.dotes.amount.innerText)) {
                css(closeSnow, {
                    opacity: 0
                });
                css(par, {
                    opacity: 0
                });
                closeSnow.className = closeSnow.className + " confirm-base";
                replaceInSleep(closeSnow, "Подтвердить", 300);
                replaceInSleep(par, "Установка базы произошла успешно, командир!", 300);
                css(closeSnow, {
                    top: "20%"
                });
                awake(closeSnow);
                awake(par);
                wasChanged = true;
            }
            var baloon = myMap.geoObjects;
            var placemark = new ymaps.Placemark([ coords[0], coords[1] ], {
                iconContent: counter() + "D.",
                balloonContent: "<strong> Точечные цели </strong>"
            }, {
                preset: "islands#circleIcon",
                iconColor: "red"
            });
            dotesTargets.add(placemark);
            self.dotesCoordinates.push(placemark);
            baloon.add(dotesTargets);
        }
    };
};

MapInteraction.prototype.setBase = function() {
    var self = this;
    this.button.onclick = function() {
        var snowball = get(".snow");
        if (!snowball.length) {
            iHide(self.panel, "Кликните на карту и выбирете место базирования");
        }
        var wasChanged = false;
        myMap.events.add("click", getCenter);
        var interval = setInterval(function() {
            if (wasChanged) {
                clearInterval(interval);
                myMap.events.remove("click", getCenter);
            }
        }, 10);
        function getCenter(e) {
            if (self.baseBalloon.length) {
                myCollection.remove(myCollection.get(0));
            }
            var coords = e.get("coords"), lon = get(".lon-base"), lat = get(".lat-base"), closeSnow = get(".snow-close-it")[0], par = get(".snow-paragraph")[0];
            if (closeSnow && par) {
                css(closeSnow, {
                    opacity: 0
                });
                css(par, {
                    opacity: 0
                });
                closeSnow.className = closeSnow.className + " confirm-base";
                replaceInSleep(closeSnow, "Подтвердить", 300);
                replaceInSleep(par, "Установка базы произошла успешно, командир!", 300);
                css(closeSnow, {
                    top: "20%"
                });
                awake(closeSnow);
                awake(par);
                wasChanged = true;
            }
            var baloon = myMap.geoObjects;
            var placemark = new ymaps.Placemark([ coords[0], coords[1] ], {
                iconContent: "B",
                balloonContent: "<strong> Место базирования </strong>"
            }, {
                preset: "islands#circleIcon",
                iconColor: "#336f94"
            });
            myCollection.add(placemark);
            self.baseBalloon.push(placemark);
            baloon.add(myCollection);
            lon[0].replaceText(coords[0].toPrecision(6));
            lat[0].replaceText(coords[1].toPrecision(6));
            if (lat[0].className.indexOf("not-choosen") && lon[0].className.indexOf("not-choosen")) {
                lon[0].className = lon[0].cutClassTo("not-choosen") + "choosen-base";
                lat[0].className = lat[0].cutClassTo("not-choosen") + "choosen-base";
            }
            for (var i = 0; i <= coords.length - 1; i++) {
                self.baseCoordinates.push(coords[i]);
            }
        }
    };
};

MapInteraction.prototype.canvas = {};

MapInteraction.prototype.canvas.setBase = function(sample) {
    var polygon = sample.canvasMap.getContext("2d");
    sample.base.button.onclick = function() {
        var x = sample.base.coordinates.x, y = sample.base.coordinates.y, r = sample.base.radius, d = r * 2 * 2;
        var snowball = get(".snow"), dotesAmount = sample.dotes.amount.innerText, ending = "";
        dotesAmount > 1 ? ending = " точечных целей!" : ending = " точечную цель!";
        if (!snowball.length) {
            iHide(sample.panel, "Кликните на карту и определите место базирования беспилотников");
        }
        sample.canvasMap.onmousemove = function(e) {
            this.onclick = function() {
                if (x && y) {
                    polygon.clearRect(x - d, y - d, d * 2, d * 2);
                }
                var offset = sample.canvasMap.getBoundingClientRect(), x0 = e.clientX - offset.left, y0 = e.clientY - offset.top, r = 6, startAngle = 0, endAngle = 2 * Math.PI, color = "rgba(93, 138, 168, 1)";
                drawCircle(polygon, x0, y0, r, startAngle, endAngle, 0, color, 2);
                drawCircle(polygon, x0, y0, r + 6, startAngle, endAngle, color, 0, 2);
                MapInteraction.prototype.baseCoordinates = {
                    x: x0,
                    y: y0
                };
                sample.canvasMap.onmousemove = null;
                var closeSnow = get(".snow-close-it")[0], par = get(".snow-paragraph")[0];
                css(closeSnow, {
                    opacity: 0
                });
                css(par, {
                    opacity: 0
                });
                closeSnow.className = closeSnow.className + " confirm-base";
                replaceInSleep(closeSnow, "Подтвердить", 300);
                replaceInSleep(par, "Установка базы произошла успешно!", 300);
                css(closeSnow, {
                    top: "20%"
                });
                awake(closeSnow);
                awake(par);
                sample.canvasMap.onclick = null;
                MapInteraction.prototype.baseCoordinates.x = x0;
                MapInteraction.prototype.baseCoordinates.y = y0;
                MapInteraction.prototype.baseRadius = r;
                var values = sample.base.values;
                values.xV.replaceText(x0.toString());
                values.yV.replaceText(y0.toString());
                var drones = get(".drones")[0], styles = window.getComputedStyle(drones);
                if (styles.display === "none") {
                    css(drones, {
                        display: "block"
                    });
                }
                for (var i in values) {
                    values[i].className = values[i].cutClassTo("not-choosen") + "choosen";
                }
            };
        };
    };
};

MapInteraction.prototype.canvas.setDotes = function(sample) {
    var polygon = sample.canvasMap.getContext("2d"), counter = count(1);
    sample.dotes.button.onclick = function() {
        var amount = parseInt(sample.dotes.amount.innerText), dotesLen = sample.dotesCoordinates.length, r = sample.dotes.radius, d = r * 2 * 2;
        if (amount <= dotesLen - 1) {
            var coords = sample.dotesCoordinates;
            for (var i = 0; i <= coords.length - 1; i++) {
                polygon.clearRect(coords[i].x - d * 2 * 2, coords[i].y - d * 2 * 2.65, d * 2 * 2 * 5, d * 2 * 2 * 2);
            }
            counter = count(1);
            coords.length = 0;
        }
        var snowball = get(".snow"), dotesAmount = sample.dotes.amount.innerText, color = "rgba(255,64,64, .6)", ending = "";
        dotesAmount > 1 ? ending = " точечных целей!" : ending = " точечную цель!";
        if (!snowball.length) {
            iHide(sample.panel, "Кликните на карту и определите " + amount + ending);
        }
        sample.canvasMap.onmousemove = function(e) {
            this.onclick = function() {
                var len = sample.dotesCoordinates.length;
                var offset = sample.canvasMap.getBoundingClientRect(), x0 = e.clientX - offset.left, y0 = e.clientY - offset.top, startAngle = 0, endAngle = 2 * Math.PI, val = counter();
                drawCircle(polygon, x0, y0, r, startAngle, endAngle, 0, color, 2, "  " + val + "D");
                drawCircle(polygon, x0, y0, r + 6, startAngle, endAngle, color, 0, 2, 0);
                MapInteraction.prototype.dotesCoordinates.push({
                    name: val + "D",
                    x: x0,
                    y: y0
                });
                if (len + 1 === amount) {
                    var closeSnow = get(".snow-close-it")[0], par = get(".snow-paragraph")[0];
                    css(closeSnow, {
                        opacity: 0
                    });
                    css(par, {
                        opacity: 0
                    });
                    closeSnow.className = closeSnow.className + " confirm-base";
                    replaceInSleep(closeSnow, "Подтвердить", 300);
                    replaceInSleep(par, "Задание целей произошло успешно!", 300);
                    css(closeSnow, {
                        top: "20%"
                    });
                    awake(closeSnow);
                    awake(par);
                    sample.canvasMap.onmousemove = null;
                    sample.canvasMap.onclick = null;
                    addToTable(sample);
                    humane.log("Вы установили все точечные цели.");
                    sample.computeDistance("dotes");
                }
            };
        };
    };
    function addToTable(s) {
        var existedDotes = s.dotesCoordinates, clones = [];
        for (var j = 0; j <= existedDotes.length - 1; j++) {
            var dotesRow = get(".dotes-coords-row")[0], dotesClone = dotesRow.cloneNode(true);
            dotesClone.className = dotesClone.cutClassTo("-", true) + "-" + (j + 1);
            var children = dotesClone.getChildren();
            for (var i = 1; i <= children.length - 1; i++) {
                children[i].className = children[i].cutClassTo("not-choosen", true);
                children[i].className = children[i].cutClassTo("-", true);
                children[i].className += "-" + (j + 1) + " choosen";
                children[0].replaceText(j + 1 + "D.");
            }
            children[1].replaceText(s.dotesCoordinates[j].x.toString());
            children[2].replaceText(s.dotesCoordinates[j].y.toString());
            clones.push(dotesClone);
        }
        var tbody = get(".dotes-body")[0], tbodyChildren = tbody.getChildren();
        for (var b = 0; b <= tbodyChildren.length - 1; b++) {
            tbodyChildren[b].remove();
        }
        for (var k = 0; k <= clones.length - 1; k++) {
            tbody.parentOf(clones[k]);
        }
        return true;
    }
};

MapInteraction.prototype.canvas.setTrajectory = function(sample) {
    var polygon = sample.canvasMap.getContext("2d"), r = sample.trajectory.radius, d = r * 2 * 2;
    var counter = count(1), evenCounter = count(0), dotesID = count(1), evDotes = dotesID();
    var lineCoords = [];
    sample.trajectory.button.onclick = function() {
        var snowball = get(".snow"), ending = "", amount = parseInt(sample.trajectory.amount.innerText), trajectoryLen = sample.trajectoryCoordinates.length;
        amount > 1 ? ending = " траекторных целей!" : ending = " тректорную цель!";
        if (!snowball.length) {
            iHide(sample.panel, "Кликните на карту и определите " + amount + ending);
        }
        if (amount <= trajectoryLen) {
            var coords = sample.trajectoryCoordinates;
            for (var i = 0; i <= coords.length - 1; i++) {
                coordinate = coords[i];
                var xc1 = coordinate[0].x, yc1 = coordinate[0].y, xc2 = coordinate[1].x, yc2 = coordinate[1].y;
                polygon.clearRect(xc1 - d * 2 * 2, yc1 - d * 2 * 2.65, d * 2 * 2 * 5, d * 2 * 2 * 2);
                polygon.clearRect(xc2 - d * 2 * 2, yc2 - d * 2 * 2.65, d * 2 * 2 * 5, d * 2 * 2 * 2);
                polygon.clearRect(xc1, yc1, xc2 - xc1, yc2 - yc1);
            }
            counter = count(1);
            evenCounter = count(0);
            dotesID = count(1);
            evDotes = dotesID();
            coords.length = 0;
        }
        sample.canvasMap.onmousemove = function(e) {
            this.onclick = function() {
                var offset = sample.canvasMap.getBoundingClientRect(), x0 = e.clientX - offset.left, y0 = e.clientY - offset.top, color = "rgba(73, 121, 107, 1)", startAngle = 0, endAngle = 2 * Math.PI;
                lineCoords.push({
                    x: x0,
                    y: y0
                });
                var ev = evenCounter();
                if (ev === 1) {
                    evenCounter = count(0);
                    MapInteraction.prototype.trajectoryCoordinates.push(lineCoords);
                    var x1 = lineCoords[0].x, y1 = lineCoords[0].y, x2 = lineCoords[1].x, y2 = lineCoords[1].y;
                    polygon.beginPath();
                    polygon.moveTo(x1, y1);
                    polygon.lineTo(x2, y2);
                    polygon.strokeStyle = "rgba(73, 121, 107, .5)";
                    polygon.stroke();
                    lineCoords = [];
                    if (sample.trajectoryCoordinates.length === amount) {
                        var closeSnow = get(".snow-close-it")[0], par = get(".snow-paragraph")[0];
                        css(closeSnow, {
                            opacity: 0
                        });
                        css(par, {
                            opacity: 0
                        });
                        closeSnow.className = closeSnow.className + " confirm-base";
                        replaceInSleep(closeSnow, "Подтвердить", 300);
                        replaceInSleep(par, "Задание целей произошло успешно!", 300);
                        css(closeSnow, {
                            top: "20%"
                        });
                        awake(closeSnow);
                        awake(par);
                        sample.canvasMap.onmousemove = null;
                        sample.canvasMap.onclick = null;
                        addToTrajectoryTable(sample);
                        sample.computeDistance("trajectory");
                    }
                }
                drawCircle(polygon, x0, y0, r + 2, startAngle, endAngle, 0, color, 2, "  " + evDotes + "T." + counter());
                if (ev === 1) {
                    evDotes = dotesID();
                    counter = count(1);
                }
            };
        };
    };
    function addToTrajectoryTable(s) {
        var existedTrajectory = s.trajectoryCoordinates, clones = [];
        for (var j = 0; j <= existedTrajectory.length - 1; j++) {
            var element = existedTrajectory[j];
            for (var l = 0; l <= element.length - 1; l++) {
                var trajectoryRow = get(".trajectory-coords-row")[0], trajectoryClone = trajectoryRow.cloneNode(true);
                trajectoryClone.className = trajectoryClone.cutClassTo("coordinate-1", true) + "coordinate-" + (j + 1) + "-" + (l + 1);
                var children = trajectoryClone.getChildren();
                for (var h = 1; h <= children.length - 1; h++) {
                    children[h].className = children[h].cutClassTo("not-choosen", true);
                    children[h].className = children[h].cutClassTo("thla-", true);
                    children[h].className += "thla-" + (l + 1) + "-" + h + " choosen";
                }
                children[0].replaceText(j + 1 + "T." + (l + 1));
                children[1].replaceText(s.trajectoryCoordinates[j][l].x.toString());
                children[2].replaceText(s.trajectoryCoordinates[j][l].y.toString());
                clones.push(trajectoryClone);
            }
        }
        var tbody = get(".trajectory-table-body")[0];
        var tbodyChildren = tbody.getChildren();
        for (var e = 0; e <= tbodyChildren.length - 1; e++) {
            tbodyChildren[e].remove();
        }
        for (var q = 0; q <= clones.length - 1; q++) {
            tbody.parentOf(clones[q]);
        }
        return true;
    }
};

MapInteraction.prototype.canvas.setAirDefence = function(sample) {
    var polygon = sample.canvasMap.getContext("2d"), counter = count(1);
    sample.airDefence.button.onclick = function() {
        var amount = parseInt(sample.airDefence.amount.innerText), defencesLen = sample.defenceCoordinates.length, r = sample.airDefence.radius, d = r * 2 * 2;
        if (amount <= defencesLen) {
            var coords = sample.defenceCoordinates;
            for (var i = 0; i <= coords.length - 1; i++) {
                polygon.clearRect(coords[i].x - d * 2 * 2, coords[i].y - d * 2 * 2.65, d * 2 * 2 * 5, d * 2 * 2 * 2);
            }
            counter = count(1);
            coords.length = 0;
            sample.airDefence.coordinates.length = 0;
        }
        var snowball = get(".snow"), defenceAmount = sample.airDefence.amount.innerText, cenColor = "rgba(68, 110, 199, .3)", rColor = "rgba(68, 110, 199, 1)", ending = "";
        defenceAmount > 1 ? ending = " установок ПВО!" : ending = " установку ПВО!";
        if (!snowball.length) {
            iHide(sample.panel, "Кликните на карту и определите " + amount + ending);
        }
        sample.canvasMap.onmousemove = function(e) {
            this.onclick = function() {
                var len = sample.defenceCoordinates.length;
                var offset = sample.canvasMap.getBoundingClientRect(), x0 = e.clientX - offset.left, y0 = e.clientY - offset.top, startAngle = 0, endAngle = 2 * Math.PI, val = counter();
                drawCircle(polygon, x0, y0, r + 20, startAngle, endAngle, 0, cenColor, 2, 0);
                drawCircle(polygon, x0, y0, r - 6, startAngle, endAngle, 0, rColor, 2, 0);
                drawText(polygon, rColor, "9px Tahoma", val.toString() + "Def", [ x0 + 5, y0 + 9 ]);
                MapInteraction.prototype.defenceCoordinates.push({
                    name: val + "Def",
                    x: x0,
                    y: y0
                });
                sample.airDefence.coordinates.push({
                    name: val + "Def",
                    x: x0,
                    y: y0,
                    radius: {
                        pixels: r + 15,
                        kilometers: (r + 15) / sample.kInP
                    }
                });
                if (len + 1 === amount) {
                    var closeSnow = get(".snow-close-it")[0], par = get(".snow-paragraph")[0];
                    css(closeSnow, {
                        opacity: 0
                    });
                    css(par, {
                        opacity: 0
                    });
                    closeSnow.className = closeSnow.className + " confirm-base";
                    replaceInSleep(closeSnow, "Подтвердить", 300);
                    replaceInSleep(par, "Задание целей произошло успешно!", 300);
                    css(closeSnow, {
                        top: "20%"
                    });
                    awake(closeSnow);
                    awake(par);
                    sample.canvasMap.onmousemove = null;
                    sample.canvasMap.onclick = null;
                    humane.log("Вы установили все ПВО.");
                    console.log(sample.airDefence.coordinates);
                }
            };
        };
    };
};

MapInteraction.prototype.computeDistance = function(kind) {
    var map = new MapInteraction();
    MapInteraction.prototype.kInP = 2.84210526315789;
    if (kind === "dotes") MapInteraction.prototype.distances.toDotes = computeDistanceToDotes();
    if (kind === "trajectory") MapInteraction.prototype.distances.toTrajectories = computeDistanceToTrajectories();
    if (kind === "area") MapInteraction.prototype.distances.toAreas = computeDistanceToAreas();
    function computeDistanceToDotes() {
        var mapCanvas = new MapInteraction(), dotes = mapCanvas.dotesCoordinates, base = mapCanvas.baseCoordinates, result = [];
        if (isCorrect(dotes, "Array")) {
            dotes.forEach(function(element, ind, arr) {
                var dotX = element.x, dotY = element.y, baseX = base.x, baseY = base.y, distance = {}, obj = {}, k = mapCanvas.kInP;
                distance.x = dotX - baseX;
                distance.y = dotY - baseY;
                distance.result = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));
                distance.result = parseInt(distance.result.toFixed(3));
                obj = {
                    name: element.name,
                    pixels: distance.result,
                    coords: {
                        x: dotX,
                        y: dotY
                    },
                    kilometers: distance.result * k,
                    to: {}
                };
                dotes.forEach(function(dot, i, a) {
                    var distance = {};
                    if (i !== ind) {
                        distance.x = dot.x - dotX;
                        distance.y = dot.y - dotY;
                        distance.result = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));
                        distance.result = parseInt(distance.result.toFixed(3));
                        obj.to[dot.name] = {
                            pixels: distance.result,
                            kilometers: distance.result * k,
                            name: dot.name
                        };
                    }
                });
                result.push(obj);
            });
        }
        return result;
    }
    function computeDistanceToTrajectories() {
        var mapCanvas = new MapInteraction(), trajectory = mapCanvas.trajectoryCoordinates, base = mapCanvas.baseCoordinates, result = [], k = mapCanvas.kInP;
        if (isCorrect(trajectory, "Array")) trajectory.forEach(function(element, ind, arr) {
            result.push([]);
            element.forEach(function(oneDot, j, b) {
                var dotX = oneDot.x, dotY = oneDot.y, baseX = base.x, baseY = base.y, distance = {}, previous = result[ind][j - 1], data = {};
                distance.x = dotX - baseX;
                distance.y = dotY - baseY;
                distance.result = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));
                distance.result = parseInt(distance.result.toFixed(3));
                data.pixels = distance.result;
                data.kilometers = distance.result * k;
                if (previous) {
                    if (distance.result <= previous.pixels) {
                        data.entry = true;
                    } else {
                        result[ind][j - 1].entry = true;
                    }
                }
                result[ind].push(data);
            });
        });
        return result;
    }
};

MapInteraction.prototype.replaceHeaders = function(lon, lat) {
    this.base.headers.xH.replaceText(lon);
    this.base.headers.yH.replaceText(lat);
    this.dotes.headers.xH.replaceText(lon);
    this.dotes.headers.yH.replaceText(lat);
    this.trajectory.headers.xH.replaceText(lon);
    this.trajectory.headers.yH.replaceText(lat);
    this.area.headers.xH.replaceText(lon);
    this.area.headers.yH.replaceText(lat);
    return this;
};

MapInteraction.prototype.canvas.initialize = function(sp) {
    sp.replaceHeaders("x", "y");
    this.setBase(sp);
    this.setDotes(sp);
    this.setTrajectory(sp);
    this.setAirDefence(sp);
    return this;
};

MapInteraction.prototype.baseBalloon = [];

MapInteraction.prototype.baseCoordinates = [];

MapInteraction.prototype.dotesCoordinates = [];

MapInteraction.prototype.defenceCoordinates = [];

MapInteraction.prototype.areaCoordinates = [];

MapInteraction.prototype.trajectoryCoordinates = [];

MapInteraction.prototype.distances = {};

(function() {
    var baseMap = new MapInteraction({
        map: "#dynamic-map",
        panel: "#control-additional",
        button: "#set-base",
        longitude: ".lon-base",
        latitude: ".lat-base"
    });
    baseMap.setBase();
    var targetsMap = new MapInteraction({
        map: "#dynamic-map",
        panel: "#control-additional",
        dotes: {
            longitude: get(".lon-dhla-1")[0],
            latitude: get(".lat-dhla-1")[0],
            amount: get(".dotes-amount")[0],
            button: get("#set-dotes")
        },
        trajectory: {
            pointA: {
                lontitude: get(".lon-thla-1-1")[0],
                latitude: get(".lat-thla-1-1")[0]
            },
            pointB: {
                lontitude: get(".lon-thla-1-2")[0],
                latitude: get(".lat-thla-1-2")[0]
            },
            amount: get(".trajectory-amount")[0],
            button: get("#set-trajectory")
        },
        area: {
            pointA: {
                longitude: get(".lon-ahla-1-1")[0],
                latitude: get(".lat-ahla-1-1")[0]
            },
            pointB: {
                longitude: get(".lon-ahla-1-2")[0],
                latitude: get(".lat-ahla-1-2")[0]
            },
            pointC: {
                longitude: get(".lon-ahla-1-3")[0],
                latitude: get(".lat-ahla-1-3")[0]
            },
            pointD: {
                longitude: get(".lon-ahla-1-4")[0],
                latitude: get(".lat-ahla-1-4")[0]
            },
            amount: get(".area-amount")[0],
            button: get("#set-area")
        }
    });
    targetsMap.setDotes();
    var mapData = new MapInteraction({
        canvasMap: "#polygon",
        panel: "#control-additional",
        base: {
            coordinates: {
                x: 0,
                y: 0
            },
            radius: 3,
            button: get("#set-base"),
            values: {
                xV: get(".lon-base")[0],
                yV: get(".lat-base")[0]
            },
            headers: {
                xH: get(".lon-base-headers")[0],
                yH: get(".lat-base-headers")[0]
            }
        },
        dotes: {
            coordinates: [],
            values: {
                xV: get(".lon-dotes-hla")[0],
                yV: get(".lat-dotes-hla")[0]
            },
            headers: {
                xH: get(".lon-dotes-headers")[0],
                yH: get(".lat-dotes-headers")[0]
            },
            amount: get(".dotes-amount")[0],
            button: get("#set-dotes"),
            radius: 2
        },
        trajectory: {
            coordinates: [],
            values: {
                xV: get(".lon-trajectory-hla")[0],
                yV: get(".lat-trajectory-hla")[0]
            },
            headers: {
                xH: get(".lon-trajectory-headers")[0],
                yH: get(".lat-trajectory-headers")[0]
            },
            amount: get(".trajectory-amount")[0],
            button: get("#set-trajectory"),
            radius: 1.5
        },
        area: {
            coordinates: [ [ {
                x: 0,
                y: 0
            }, {
                x: 0,
                y: 0
            }, {
                x: 0,
                y: 0
            }, {
                x: 0,
                y: 0
            } ] ],
            values: {
                xV: get(".lon-area-hla")[0],
                yV: get(".lat-area-hla")[0]
            },
            headers: {
                xH: get(".lon-area-headers")[0],
                yH: get(".lat-area-headers")[0]
            },
            amount: get(".area-amount")[0],
            button: get("#set-area"),
            radius: 1.2
        },
        airDefence: {
            coordinates: [],
            radius: 10,
            amount: get(".defence-amount")[0],
            button: get("#to-defence")
        }
    });
    var cv = mapData.canvas;
    var button = get("#switch"), flag = false;
    button.onclick = showCanvas;
    function showCanvas() {
        if (!flag) {
            var canvas = get("#polygon"), static = get("#static-map");
            sleep(canvas, static);
            css(canvas, {
                zIndex: 4
            });
            css(static, {
                zIndex: 3,
                background: "rgba(255, 255, 255, .4)"
            });
            awake(canvas, static);
            this.value = "Переключиться на карту";
            flag = true;
        } else {
            this.onclick = showMap;
            this.onclick();
        }
        function showMap() {
            if (flag) {
                var canvas = get("#polygon"), static = get("#static-map");
                sleep(canvas, static);
                css(canvas, {
                    zIndex: 1
                });
                css(static, {
                    zIndex: 0,
                    background: "rgba(255, 255, 255, 0)"
                });
                awake(canvas, static);
                this.value = "Переключиться на холст";
                flag = false;
            } else {
                this.onclick = showCanvas;
                this.onclick();
            }
        }
        if (flag) {
            cv.initialize(mapData);
        } else {
            mapData.replaceHeaders("Долгота", "Широта");
            baseMap.setBase();
            targetsMap.setDotes();
        }
    }
})();

function Planes() {
    return this;
}

(function() {
    Planes.prototype.atBase = function() {
        isCorrect(this, "Object");
        var map = new MapInteraction();
        for (var i = 0; i <= this.all.length - 1; i++) {
            this.all[i].base = map.baseCoordinates;
        }
    };
    Planes.prototype.toCanvas = function() {
        isCorrect(this, "Object");
        var map = new MapInteraction();
        var polygon = get("#polygon").getContext("2d"), x0, y0, r = map.baseRadius, d = r * 2 * 2, startAngle = 0, endAngle = Math.PI * 2, color = "rgba(30,199,115, 1)", drone = this.all[0], allDrones = this.all;
        if (drone.base.x) {
            polygon.clearRect(drone.base.x - (d + r), drone.base.y - (d + r), d * 2.5, d * 2.5);
        }
        drawCircle(polygon, drone.base.x, drone.base.y, r, startAngle, endAngle, 0, color, 2);
        drawText(polygon, "white", "9px serif", allDrones.length, [ allDrones[0].base.x, allDrones[0].base.x ]);
        drawCircle(polygon, drone.base.x, drone.base.y, r + 6, startAngle, endAngle, color, 0, 2);
        var planesPolygon = get(".actions"), each = Array.prototype.forEach;
        if (planesPolygon.length) {
            each.call(planesPolygon, function(action, ind, arr) {
                css(action, {
                    zIndex: ind + 5
                });
            });
        }
        var pol = get("#polygon");
        css(pol, {
            zIndex: 26
        });
    };
    Planes.prototype.time = {
        taskRun: 0,
        eachDrone: {}
    };
    Planes.prototype.initialize = function() {
        var self = this, map = new MapInteraction();
        self.atBase();
        self.dronesCanvases();
        self.toCanvas();
        self.flyToTarget();
    };
})();

(function() {
    Planes.prototype.flyToTarget = function() {
        var self = this, map = new MapInteraction(), distances = map.distances, each = Array.prototype.forEach, sort = Array.prototype.sort, drones = self.all;
        each.call(drones, function(y, j, b) {
            y.watch = [];
        });
        if (classOf(distances) === "Object") {
            for (var i in distances) {
                var aDistance = distances[i];
                if (classOf(aDistance) === "Array" && typeof aDistance !== "function") {
                    if (i === "toDotes") {
                        sort.call(aDistance, function(a, b) {
                            if (a.kilometers < b.kilometers) {
                                return 1;
                            } else if (a.kilometers > b.kilometers) {
                                return -1;
                            } else {
                                return 0;
                            }
                        });
                        for (var j in aDistance) {
                            if (typeof aDistance[j] !== "function") {
                                var dot = aDistance[j];
                                each.call(drones, function(x, i, a) {
                                    targetsToDrones(x, dot);
                                });
                            }
                        }
                    }
                }
            }
            var simulate = get("#simulate");
            simulate.onclick = function() {
                if ("move" in self) {
                    console.log("Starting simulation!");
                    self.move();
                    this.onclick = null;
                } else {
                    alert("Вы не загрузили или не активировали алгоритм движения!");
                }
            };
        }
    };
    function targetsToDrones(dr, tg) {
        var sps = dr.specification, range = sps.range / 2;
        if (!dr.watch.length && !tg.watched) {
            if (range >= tg.kilometers) {
                dr.leftRange = sps.range - tg.kilometers;
                dr.watch.push(tg);
                tg.watched = true;
            } else {
                dr.leftRange = sps.range;
                dr.watch = [];
                tg.watched = null;
            }
        }
    }
    Planes.prototype.dronesCanvases = function() {
        var self = this;
        var controlPanel = get("#controls"), parent = controlPanel.parentNode;
        self.all.forEach(function(drone, ind, arr) {
            var canvas = document.createElement("canvas");
            canvas.height = 600;
            canvas.width = 1300;
            canvas.className = "actions";
            canvas.id = drone.name + "-" + drone.iAm;
            parent.insertBefore(canvas, controlPanel);
        });
    };
    Planes.prototype.move = function() {
        var self = this;
        var container = get(".actions");
        var map = new MapInteraction(), now = new Date(), each = Array.prototype.forEach, step = 10, radius = 4, startAngle = 0, endAngle = Math.PI * 2, assignmentTime = 0, done = count(1), timePass = [ now.valueOf() ], passedTime = 0;
        Planes.prototype.all.coordinates = [];
        self.all.forEach(function(drone, id, arr) {
            drone.path = [];
            drone.completed = [];
            if (drone.watch.length) {
                droneWay(drone, [ drone.base.x, drone.base.y ], [ drone.watch[0].coords.x, drone.watch[0].coords.y ], [ assignmentTime, done, timePass, passedTime ]);
            }
        });
    };
    function dotIsAchieved(d) {
        var map = new MapInteraction();
        var dotes = get("#polygon").getContext("2d"), r = 2.5, c = d.colors.slice(0, d.colors.lastIndexOf(",") + 1) + "1)", startAngle = 0, endAngle = Math.PI * 2;
        var dotX = d.watch[0].coords.x, dotY = d.watch[0].coords.y;
        var nm = "  " + d.watch[0].name;
        dotes.beginPath();
        dotes.font = "20px Tahoma";
        var nmWidth = dotes.measureText(nm).width;
        dotes.closePath();
        dotes.clearRect(dotX - r * 5, dotY - r * 6, r * r * 2 + nmWidth, r * r * r * r - 5);
        drawCircle(dotes, dotX, dotY, r + 6, startAngle, endAngle, c, 0, 2, nm);
    }
    function drawStroke(p, s, e, c) {
        p.beginPath();
        p.setLineDash([ 5, 2, 2, 2 ]);
        p.moveTo(s[0], s[1]);
        p.lineTo(e[0], e[1]);
        p.strokeStyle = c;
        p.stroke();
    }
    function droneWay(d, start, end, options) {
        isCorrect(start, "Array") && isCorrect(end, "Array") && isCorrect(options, "Array");
        var dWay = arguments;
        var polygon = get("#" + d.name + "-" + d.iAm).getContext("2d"), container = get(".actions"), map = new MapInteraction(), x1 = start[0], y1 = start[1], x2 = end[0], y2 = end[1], distance = getDistance(start, end, 3), speed = d.specification.speed * 10 / map.kInP / 3600, color = d.colors, circle = color.slice(0, color.lastIndexOf(",") + 1) + "1)", simulate = distance / speed, angle = Math.atan2(y2 - y1, x2 - x1), codedX = [], codedY = [], radius = 4, startAngle = 0, endAngle = Math.PI * 2, step = 10;
        var simulating = setInterval(function() {
            polygon.clearRect(0, 0, container[0].width, container[0].height);
            x1 += speed * Math.cos(angle);
            y1 += speed * Math.sin(angle);
            drawCircle(polygon, x1, y1, radius, startAngle, endAngle, 0, circle, 2);
            drawStroke(polygon, start, [ x1, y1 ], color);
            if (d.completed.length) {
                d.completed.forEach(function(cmp, ind, c) {
                    if (ind === 0) {
                        drawStroke(polygon, [ d.base.x, d.base.y ], [ cmp.coords.x, cmp.coords.y ], color);
                    } else {
                        drawStroke(polygon, [ c[ind - 1].coords.x, c[ind - 1].coords.y ], [ c[ind].coords.x, c[ind].coords.y ], color);
                    }
                });
            }
            codedX.push(btoa(x1));
            codedY.push(btoa(y1));
            options[0]++;
            simulate--;
            if (simulate <= 0) {
                d.path.push([ codedX, codedY ]);
                dotIsAchieved(d);
                d.completed.push(d.watch[0]);
                for (var k in map.distances) {
                    if (map.distances.hasOwnProperty(k)) notWatched(map.distances[k], d.watch[0]);
                }
                clearInterval(simulating);
                var completed = d.completed;
                if (start[0] !== end[0]) {
                    dWay.callee(d, [ completed[completed.length - 1].coords.x, completed[completed.length - 1].coords.y ], [ d.watch[0].coords.x, d.watch[0].coords.y ], [ options[0], options[1], options[2], options[3] ]);
                } else {
                    var cmp = options[1](), date = new Date(), pls = get(".planes-amount")[0], activeDrones = new Planes(), currentAmount = 0, hours = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds(), countedDate = (date.valueOf() - options[2][0]) / 1e3;
                    activeDrones.all.forEach(function(x, i, a) {
                        if (x.completed.length) {
                            currentAmount++;
                        }
                    });
                    options[2].push((date.valueOf() - options[2][0]) / 1e3);
                    activeDrones.time.eachDrone[d.name + "-" + d.iAm] = (date.valueOf() - options[2][0]) / 1e3;
                    options[3] += (date.valueOf() - options[2][0]) / 1e3;
                    humane.log("[" + hours + ":" + minutes + ":" + seconds + "] 	" + d.name + "-" + d.iAm + ". Выполнил задание за " + countedDate, {
                        timeout: 2e3,
                        clickToClose: true,
                        addnCls: "humane-error"
                    });
                    console.log("" + hours + ":" + minutes + ":" + seconds, "" + d.name + "-" + d.iAm + " has completed task for " + countedDate);
                    if (cmp === currentAmount) {
                        humane.log("Моделирование завершено за " + options[3] + " минуты");
                        console.log("Simulating has been completed.");
                        console.log(activeDrones.all);
                        activeDrones.time.taskRun = options[3];
                    }
                }
            }
        }, step);
    }
    function notWatched(dotes, drone) {
        isCorrect(dotes, "Array");
        var toWatch = [];
        for (var i in dotes) {
            if (dotes.hasOwnProperty(i)) {
                var dot = dotes[i];
                if (!dot.watched) {
                    toWatch.push(dot);
                }
            }
        }
        setDroneWay(toWatch, drone);
    }
    function setDroneWay(watch, dr) {
        isCorrect(watch, "Array");
        isCorrect(dr, "Object");
        var map = new MapInteraction(), each = Array.prototype.forEach, droneCanWatch = dr.to, min = Infinity, rightDot = {}, drs = new Planes(), dotty = 0, doneIsDone = false;
        if (!watch.length) {
            dotty = {
                coords: {
                    x: drs.all[0].base.x,
                    y: drs.all[0].base.y
                },
                distances: dr.kilometers || 0,
                name: "Done!"
            };
            transferDot(drs.all, dr, dotty);
        } else {
            for (var j in droneCanWatch) {
                if (droneCanWatch.hasOwnProperty(j)) {
                    var dot = droneCanWatch[j];
                    watch.forEach(function(w, t, a) {
                        if (dot.name === w.name) {
                            if (dot.pixels <= min) {
                                min = dot.pixels;
                                rightDot = dot;
                            }
                        }
                    });
                }
            }
            for (var k in map.distances) {
                if (map.distances.hasOwnProperty(k)) {
                    var type = map.distances[k];
                    for (var t in type) {
                        if (type.hasOwnProperty(t)) {
                            var mapDot = type[t];
                            if (mapDot.name === rightDot.name) {
                                mapDot.watched = true;
                                dotty = mapDot;
                            }
                        }
                    }
                }
            }
            transferDot(drs.all, dr, dotty, rightDot);
        }
        function transferDot(ad, curDrone, dot) {
            for (var m in ad) {
                if (classOf(ad[m]) === "Object") {
                    var tempDrone = ad[m];
                    if (tempDrone.watch[0] && tempDrone.watch[0].name === curDrone.name) {
                        var leftDistance = 0;
                        if (arguments.length === 4) {
                            leftDistance = dot.kilometers + arguments[arguments.length - 1].kilometers;
                        } else {
                            leftDistance = dot.distances;
                        }
                        if (tempDrone.leftRange / 2 >= leftDistance) {
                            tempDrone.watch[0] = dot;
                            if (arguments.length === 4) {
                                tempDrone.leftRange -= arguments[arguments.length - 1].kilometers;
                            } else {
                                tempDrone.leftRange -= arguments[arguments.length - 1].distances;
                            }
                        } else {
                            tempDrone.watch[0] = {
                                coords: {
                                    x: tempDrone.base.x,
                                    y: tempDrone.base.y
                                },
                                distances: dot.kilometers || 0,
                                name: "Done!"
                            };
                            dotty.watched = null;
                        }
                    } else {
                        continue;
                    }
                } else {
                    continue;
                }
            }
        }
    }
})();

(function() {
    function Toddle(elements) {
        if (typeof elements !== "object") throw new TypeError("Incoming parameter is not an object");
        for (var i in elements) {
            var arr = elements[i];
            this[i] = {};
            for (var j in arr) {
                if (typeof arr[j] === "string") this[i][j] = get(arr[j])[0]; else this[i][j] = arr[j];
            }
        }
    }
    Toddle.prototype.defineSegments = function(el) {
        var coords = el.getBoundingClientRect();
        el.segments = {
            start: coords.left,
            end: coords.right,
            width: coords.right - coords.left
        };
        return this;
    };
    Toddle.prototype.breaks = function(el) {
        var segment = el.segments;
        segment.each = segment.width / this.options.divisions;
        segment.coords = new Array(this.options.divisions);
        segment.coords[this.options.divisions] = segment.end;
        for (var i = this.options.divisions - 1; i >= 0; i--) {
            segment.coords[i] = Math.round(segment.coords[i + 1] - segment.each);
        }
        delete segment.coords[segment.coords.length - 1];
        return this;
    };
    Toddle.prototype.resize = function() {
        window.onresize = function() {
            tod.defineSegments(tod.dom.line);
            tod.breaks(tod.dom.line);
            var index = parseInt(tod.dom.amount.getText());
            tod.dom.tongle.style.left = tod.dom.line.segments.coords[index - 1] - tod.dom.line.segments.start + "px";
        };
    };
    Toddle.prototype.action = function() {
        var self = this;
        this.dom.tongle.onmousedown = function(e) {
            moveAt(e);
            function moveAt(e) {
                var line = self.dom.line.segments;
                self.dom.tongle.style.cursor = "pointer";
                if (e.clientX >= line.start && e.clientX <= line.end) {
                    self.dom.tongle.style.left = e.clientX - line.start - self.dom.tongle.offsetWidth / 2 + "px";
                }
            }
            function atCheckPoint(e) {
                var tonglePos = self.dom.tongle.segments;
                self.defineSegments(self.dom.tongle);
                self.breaks(self.dom.line);
                self.dom.line.segments.coords.forEach(function(x, i, a) {
                    if (tonglePos.start <= x && tonglePos.start >= x - 10) {
                        self.dom.amount.replaceText((i + 1).toString());
                    }
                });
            }
            document.onmousemove = function(e) {
                moveAt(e);
                atCheckPoint(e);
            };
            document.onmouseup = function() {
                document.onmousemove = null;
                self.dom.tongle.onmouseup = null;
            };
            self.dom.tongle.ondragstart = function() {
                return false;
            };
        };
    };
    Toddle.prototype.create = function() {
        this.defineSegments(this.dom.line);
        this.defineSegments(this.dom.tongle);
        this.breaks(this.dom.line);
        this.resize();
        this.action();
    };
    var tod = new Toddle({
        dom: {
            slider: ".planes-slider",
            line: ".planes-toddler-line",
            tongle: ".planes-toddle",
            amount: ".planes-amount"
        },
        options: {
            divisions: 20
        }
    });
    tod.create();
    var def = new Toddle({
        dom: {
            slider: ".defence-slider",
            line: ".defence-toddler-line",
            tongle: ".defence-toddle",
            amount: ".defence-amount"
        },
        options: {
            divisions: 10
        }
    });
    def.create();
    var dotes = new Toddle({
        dom: {
            slider: ".dotes-slider",
            line: ".dotes-toddler-line",
            tongle: ".dotes-toddle",
            amount: ".dotes-amount"
        },
        options: {
            divisions: 50
        }
    });
    dotes.create();
    var area = new Toddle({
        dom: {
            slider: ".area-slider",
            line: ".area-toddler-line",
            tongle: ".area-toddle",
            amount: ".area-amount"
        },
        options: {
            divisions: 10
        }
    });
    area.create();
    var trajectory = new Toddle({
        dom: {
            slider: ".trajectory-slider",
            line: ".trajectory-toddler-line",
            tongle: ".trajectory-toddle",
            amount: ".trajectory-amount"
        },
        options: {
            divisions: 10
        }
    });
    trajectory.create();
})();

(function() {
    var hard = get(".hard-drone-cls"), middle = get(".middle-drone-cls"), light = get(".light-drone-cls"), hardCheckboxes = get(".hard-drone-checks"), middleCheckboxes = get(".middle-drone-checks"), lightCheckboxes = get(".light-drone-checks"), hardAmount = get(".hard-drone-amount"), middleAmount = get(".middle-drone-amount"), lightAmount = get(".light-drone-amount"), each = Array.prototype.forEach;
    var commonCls = [ hard, middle, light ], commonChecks = [ hardCheckboxes, middleCheckboxes, lightCheckboxes ], commonAmount = [ hardAmount, middleAmount, lightAmount ];
    var closeButtons = [], checkboxes = [], am = [];
    for (var n = 0; n <= commonCls.length - 1; n++) {
        var inputs = commonCls[n];
        each.call(inputs, function(x, i, a) {
            closeButtons.push(x);
        });
    }
    for (var k = 0; k <= commonChecks.length - 1; k++) {
        var checkbox = commonChecks[k];
        each.call(checkbox, function(x, i, a) {
            checkboxes.push(x);
        });
    }
    for (var r = 0; r <= commonAmount.length - 1; r++) {
        var input = commonAmount[r];
        each.call(input, function(x, i, a) {
            am.push(x);
        });
    }
    each.call(closeButtons, function(x, i, a) {
        x.onclick = function() {
            if (checkboxes[i].checked) {
                checkboxes[i].checked = false;
                am[i].value = "";
                css(am[i], {
                    border: "1px solid transparent"
                });
            }
        };
    });
})();

var myMap, myCollection, dotesTargets, areaTargets, trajectoryTargets;

ymaps.ready(init);

function init() {
    myMap = new ymaps.Map("dynamic-map", {
        center: [ 55.76, 37.64 ],
        zoom: 5,
        controls: [ "rulerControl", "zoomControl" ]
    });
    myCollection = new ymaps.GeoObjectCollection({}, {
        preset: "twirl#redIcon",
        draggable: false
    });
    dotesTargets = new ymaps.GeoObjectCollection({}, {
        preset: "twirl#redIcon",
        draggable: false
    });
}