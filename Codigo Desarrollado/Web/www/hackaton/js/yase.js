(function() {
    var g = false,
        a = [],
        e = {
            isUndefined: function(a) {
                return a === undefined
            },
            isNull: function(a) {
                return a === null
            },
            isNullOrUndefined: function(a) {
                return a === null || a === undefined
            },
            isValue: function(a) {
                return a !== null && a !== undefined
            }
        };

    function d(b) {
        a ? a.push(b) : setTimeout(b, 0)
    }

    function b() {
        if (a) {
            var c = a;
            a = null;
            for (var b = 0, d = c.length; b < d; b++) c[b]()
        }
    }
    if (document.addEventListener) document.readyState == "complete" ? b() : document.addEventListener("DOMContentLoaded", b, false);
    else window.attachEvent && window.attachEvent("onload", function() {
        b()
    });
    var c = window.ss;
    if (!c) window.ss = c = {
        init: d,
        ready: d
    };
    for (var f in e) c[f] = e[f]
})();

function withValue(b) {
    var a = withValue.d || (withValue.d = {
        enumerable: false,
        writable: false,
        configurable: false,
        value: null
    });
    a.value = b;
    return a
}
if (!window.XMLHttpRequest) window.XMLHttpRequest = function() {
    for (var b = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"], a = 0; a < b.length; a++) try {
        return new ActiveXObject(b[a])
    } catch (d) {}
    return null
};
ss.parseXml = function(d) {
    try {
        if (DOMParser) {
            var e = new DOMParser;
            return e.parseFromString(d, "text/xml")
        } else
            for (var c = ["Msxml2.DOMDocument.3.0", "Msxml2.DOMDocument"], b = 0; b < c.length; b++) {
                var a = new ActiveXObject(c[b]);
                a.async = false;
                a.loadXML(d);
                a.setProperty("SelectionLanguage", "XPath");
                return a
            }
    } catch (f) {}
    return null
};
Object.__typeName = "Object";
Object.__baseType = null;
Object.clearKeys = function(a) {
    for (var b in a) delete a[b]
};
Object.keyExists = function(b, a) {
    return b[a] !== undefined
};
if (!Object.keys) {
    Object.keys = function(b) {
        var a = [];
        for (var c in b) a.push(c);
        return a
    };
    Object.getKeyCount = function(b) {
        var a = 0;
        for (var c in b) a++;
        return a
    }
} else Object.getKeyCount = function(a) {
    return Object.keys(a).length
};
Boolean.__typeName = "Boolean";
Boolean.parse = function(a) {
    return a.toLowerCase() == "true"
};
Number.__typeName = "Number";
Number.parse = function(a) {
    return !a || !a.length ? 0 : a.indexOf(".") >= 0 || a.indexOf("e") >= 0 || a.endsWith("f") || a.endsWith("F") ? parseFloat(a) : parseInt(a, 10)
};
Number.prototype.format = function(a) {
    return ss.isNullOrUndefined(a) || a.length == 0 || a == "i" ? this.toString() : this._netFormat(a, false)
};
Number.prototype.localeFormat = function(a) {
    return ss.isNullOrUndefined(a) || a.length == 0 || a == "i" ? this.toLocaleString() : this._netFormat(a, true)
};
Number._commaFormat = function(a, i, n, o) {
    var c = null,
        h = a.indexOf(n);
    if (h > 0) {
        c = a.substr(h);
        a = a.substr(0, h)
    }
    var j = a.startsWith("-");
    if (j) a = a.substr(1);
    var f = 0,
        g = i[f];
    if (a.length < g) return c ? a + c : a;
    var k = a.length,
        b = "",
        l = false;
    while (!l) {
        var e = g,
            d = k - e;
        if (d < 0) {
            g += d;
            e += d;
            d = 0;
            l = true
        }
        if (!e) break;
        var m = a.substr(d, e);
        if (b.length) b = m + o + b;
        else b = m;
        k -= e;
        if (f < i.length - 1) {
            f++;
            g = i[f]
        }
    }
    if (j) b = "-" + b;
    return c ? b + c : b
};
Number.prototype._netFormat = function(f, g) {
    var b = g ? ss.CultureInfo.CurrentCulture.numberFormat : ss.CultureInfo.InvariantCulture.numberFormat,
        a = "",
        c = -1;
    if (f.length > 1) c = parseInt(f.substr(1));
    var e = f.charAt(0);
    switch (e) {
        case "d":
        case "D":
            a = parseInt(Math.abs(this)).toString();
            if (c != -1) a = a.padLeft(c, "0");
            if (this < 0) a = "-" + a;
            break;
        case "x":
        case "X":
            a = parseInt(Math.abs(this)).toString(16);
            if (e == "X") a = a.toUpperCase();
            if (c != -1) a = a.padLeft(c, "0");
            break;
        case "e":
        case "E":
            if (c == -1) a = this.toExponential();
            else a = this.toExponential(c);
            if (e == "E") a = a.toUpperCase();
            break;
        case "f":
        case "F":
        case "n":
        case "N":
            if (c == -1) c = b.numberDecimalDigits;
            a = this.toFixed(c).toString();
            if (c && b.numberDecimalSeparator != ".") {
                var d = a.indexOf(".");
                a = a.substr(0, d) + b.numberDecimalSeparator + a.substr(d + 1)
            }
            if (e == "n" || e == "N") a = Number._commaFormat(a, b.numberGroupSizes, b.numberDecimalSeparator, b.numberGroupSeparator);
            break;
        case "c":
        case "C":
            if (c == -1) c = b.currencyDecimalDigits;
            a = Math.abs(this).toFixed(c).toString();
            if (c && b.currencyDecimalSeparator != ".") {
                var d = a.indexOf(".");
                a = a.substr(0, d) + b.currencyDecimalSeparator + a.substr(d + 1)
            }
            a = Number._commaFormat(a, b.currencyGroupSizes, b.currencyDecimalSeparator, b.currencyGroupSeparator);
            if (this < 0) a = String.format(b.currencyNegativePattern, a);
            else a = String.format(b.currencyPositivePattern, a);
            break;
        case "p":
        case "P":
            if (c == -1) c = b.percentDecimalDigits;
            a = (Math.abs(this) * 100).toFixed(c).toString();
            if (c && b.percentDecimalSeparator != ".") {
                var d = a.indexOf(".");
                a = a.substr(0, d) + b.percentDecimalSeparator + a.substr(d + 1)
            }
            a = Number._commaFormat(a, b.percentGroupSizes, b.percentDecimalSeparator, b.percentGroupSeparator);
            if (this < 0) a = String.format(b.percentNegativePattern, a);
            else a = String.format(b.percentPositivePattern, a)
    }
    return a
};
String.__typeName = "String";
String.Empty = "";
String.compare = function(a, b, c) {
    if (c) {
        if (a) a = a.toUpperCase();
        if (b) b = b.toUpperCase()
    }
    a = a || "";
    b = b || "";
    return a == b ? 0 : a < b ? -1 : 1
};
String.prototype.compareTo = function(b, a) {
    return String.compare(this, b, a)
};
String.concat = function() {
    return arguments.length === 2 ? arguments[0] + arguments[1] : Array.prototype.join.call(arguments, "")
};
String.prototype.endsWith = function(a) {
    return !a.length ? true : a.length > this.length ? false : this.substr(this.length - a.length) == a
};
String.equals = function(b, c, a) {
    return String.compare(b, c, a) == 0
};
String._format = function(b, c, a) {
    if (!String._formatRE) String._formatRE = /(\{[^\}^\{]+\})/g;
    return b.replace(String._formatRE, function(h, d) {
        var g = parseInt(d.substr(1)),
            b = c[g + 1];
        if (ss.isNullOrUndefined(b)) return "";
        if (b.format) {
            var e = null,
                f = d.indexOf(":");
            if (f > 0) e = d.substring(f + 1, d.length - 1);
            return a ? b.localeFormat(e) : b.format(e)
        } else return a ? b.toLocaleString() : b.toString()
    })
};
String.format = function(a) {
    return String._format(a, arguments, false)
};
String.fromChar = function(a, d) {
    for (var c = a, b = 1; b < d; b++) c += a;
    return c
};
String.prototype.htmlDecode = function() {
    var a = document.createElement("div");
    a.innerHTML = this;
    return a.textContent || a.innerText
};
String.prototype.htmlEncode = function() {
    var a = document.createElement("div");
    a.appendChild(document.createTextNode(this));
    return a.innerHTML.replace(/\"/g, "&quot;")
};
String.prototype.removeSpecial = function() {
    return this.replace(/[^\w\s]/gi, "")
};
String.prototype.stripAccents = function() {
    var a = this.normalize("NFKD");
    return a.replace(/[\u0300-\u036F]/g, "")
};
var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g,
    encodeMap = {
        "\u00ad": "shy",
        "\u200c": "zwnj",
        "\u200d": "zwj",
        "\u200e": "lrm",
        "\u2063": "ic",
        "\u2062": "it",
        "\u2061": "af",
        "\u200f": "rlm",
        "\u200b": "ZeroWidthSpace",
        "\u2060": "NoBreak",
        "\u0311": "DownBreve",
        "\u20db": "tdot",
        "\u20dc": "DotDot",
        "\t": "Tab",
        "\n": "NewLine",
        "\u2008": "puncsp",
        "\u205f": "MediumSpace",
        "\u2009": "thinsp",
        "\u200a": "hairsp",
        "\u2004": "emsp13",
        "\u2002": "ensp",
        "\u2005": "emsp14",
        "\u2003": "emsp",
        "\u2007": "numsp",
        "\u00a0": "nbsp",
        "\u205f\u200a": "ThickSpace",
        "\u203e": "oline",
        _: "lowbar",
        "\u2010": "dash",
        "\u2013": "ndash",
        "\u2014": "mdash",
        "\u2015": "horbar",
        ",": "comma",
        ";": "semi",
        "\u204f": "bsemi",
        ":": "colon",
        "\u2a74": "Colone",
        "!": "excl",
        "\u00a1": "iexcl",
        "?": "quest",
        "\u00bf": "iquest",
        ".": "period",
        "\u2025": "nldr",
        "\u2026": "mldr",
        "\u00b7": "middot",
        "'": "apos",
        "\u2018": "lsquo",
        "\u2019": "rsquo",
        "\u201a": "sbquo",
        "\u2039": "lsaquo",
        "\u203a": "rsaquo",
        '"': "quot",
        "\u201c": "ldquo",
        "\u201d": "rdquo",
        "\u201e": "bdquo",
        "\u00ab": "laquo",
        "\u00bb": "raquo",
        "(": "lpar",
        ")": "rpar",
        "[": "lsqb",
        "]": "rsqb",
        "{": "lcub",
        "}": "rcub",
        "\u2308": "lceil",
        "\u2309": "rceil",
        "\u230a": "lfloor",
        "\u230b": "rfloor",
        "\u2985": "lopar",
        "\u2986": "ropar",
        "\u298b": "lbrke",
        "\u298c": "rbrke",
        "\u298d": "lbrkslu",
        "\u298e": "rbrksld",
        "\u298f": "lbrksld",
        "\u2990": "rbrkslu",
        "\u2991": "langd",
        "\u2992": "rangd",
        "\u2993": "lparlt",
        "\u2994": "rpargt",
        "\u2995": "gtlPar",
        "\u2996": "ltrPar",
        "\u27e6": "lobrk",
        "\u27e7": "robrk",
        "\u27e8": "lang",
        "\u27e9": "rang",
        "\u27ea": "Lang",
        "\u27eb": "Rang",
        "\u27ec": "loang",
        "\u27ed": "roang",
        "\u2772": "lbbrk",
        "\u2773": "rbbrk",
        "\u2016": "Vert",
        "\u00a7": "sect",
        "\u00b6": "para",
        "@": "commat",
        "*": "ast",
        "/": "sol",
        undefined: null,
        "&": "amp",
        "#": "num",
        "%": "percnt",
        "\u2030": "permil",
        "\u2031": "pertenk",
        "\u2020": "dagger",
        "\u2021": "Dagger",
        "\u2022": "bull",
        "\u2043": "hybull",
        "\u2032": "prime",
        "\u2033": "Prime",
        "\u2034": "tprime",
        "\u2057": "qprime",
        "\u2035": "bprime",
        "\u2041": "caret",
        "`": "grave",
        "\u00b4": "acute",
        "\u02dc": "tilde",
        "^": "Hat",
        "\u00af": "macr",
        "\u02d8": "breve",
        "\u02d9": "dot",
        "\u00a8": "die",
        "\u02da": "ring",
        "\u02dd": "dblac",
        "\u00b8": "cedil",
        "\u02db": "ogon",
        \u02c6: "circ",
        \u02c7: "caron",
        "\u00b0": "deg",
        "\u00a9": "copy",
        "\u00ae": "reg",
        "\u2117": "copysr",
        "\u2118": "wp",
        "\u211e": "rx",
        "\u2127": "mho",
        "\u2129": "iiota",
        "\u2190": "larr",
        "\u219a": "nlarr",
        "\u2192": "rarr",
        "\u219b": "nrarr",
        "\u2191": "uarr",
        "\u2193": "darr",
        "\u2194": "harr",
        "\u21ae": "nharr",
        "\u2195": "varr",
        "\u2196": "nwarr",
        "\u2197": "nearr",
        "\u2198": "searr",
        "\u2199": "swarr",
        "\u219d": "rarrw",
        "\u219d\u0338": "nrarrw",
        "\u219e": "Larr",
        "\u219f": "Uarr",
        "\u21a0": "Rarr",
        "\u21a1": "Darr",
        "\u21a2": "larrtl",
        "\u21a3": "rarrtl",
        "\u21a4": "mapstoleft",
        "\u21a5": "mapstoup",
        "\u21a6": "map",
        "\u21a7": "mapstodown",
        "\u21a9": "larrhk",
        "\u21aa": "rarrhk",
        "\u21ab": "larrlp",
        "\u21ac": "rarrlp",
        "\u21ad": "harrw",
        "\u21b0": "lsh",
        "\u21b1": "rsh",
        "\u21b2": "ldsh",
        "\u21b3": "rdsh",
        "\u21b5": "crarr",
        "\u21b6": "cularr",
        "\u21b7": "curarr",
        "\u21ba": "olarr",
        "\u21bb": "orarr",
        "\u21bc": "lharu",
        "\u21bd": "lhard",
        "\u21be": "uharr",
        "\u21bf": "uharl",
        "\u21c0": "rharu",
        "\u21c1": "rhard",
        "\u21c2": "dharr",
        "\u21c3": "dharl",
        "\u21c4": "rlarr",
        "\u21c5": "udarr",
        "\u21c6": "lrarr",
        "\u21c7": "llarr",
        "\u21c8": "uuarr",
        "\u21c9": "rrarr",
        "\u21ca": "ddarr",
        "\u21cb": "lrhar",
        "\u21cc": "rlhar",
        "\u21d0": "lArr",
        "\u21cd": "nlArr",
        "\u21d1": "uArr",
        "\u21d2": "rArr",
        "\u21cf": "nrArr",
        "\u21d3": "dArr",
        "\u21d4": "iff",
        "\u21ce": "nhArr",
        "\u21d5": "vArr",
        "\u21d6": "nwArr",
        "\u21d7": "neArr",
        "\u21d8": "seArr",
        "\u21d9": "swArr",
        "\u21da": "lAarr",
        "\u21db": "rAarr",
        "\u21dd": "zigrarr",
        "\u21e4": "larrb",
        "\u21e5": "rarrb",
        "\u21f5": "duarr",
        "\u21fd": "loarr",
        "\u21fe": "roarr",
        "\u21ff": "hoarr",
        "\u2200": "forall",
        "\u2201": "comp",
        "\u2202": "part",
        "\u2202\u0338": "npart",
        "\u2203": "exist",
        "\u2204": "nexist",
        "\u2205": "empty",
        "\u2207": "Del",
        "\u2208": "in",
        "\u2209": "notin",
        "\u220b": "ni",
        "\u220c": "notni",
        "\u03f6": "bepsi",
        "\u220f": "prod",
        "\u2210": "coprod",
        "\u2211": "sum",
        "+": "plus",
        "\u00b1": "pm",
        "\u00f7": "div",
        "\u00d7": "times",
        "<": "lt",
        "\u226e": "nlt",
        "<\u20d2": "nvlt",
        "=": "equals",
        "\u2260": "ne",
        "=\u20e5": "bne",
        "\u2a75": "Equal",
        ">": "gt",
        "\u226f": "ngt",
        ">\u20d2": "nvgt",
        "\u00ac": "not",
        "|": "vert",
        "\u00a6": "brvbar",
        "\u2212": "minus",
        "\u2213": "mp",
        "\u2214": "plusdo",
        "\u2044": "frasl",
        "\u2216": "setmn",
        "\u2217": "lowast",
        "\u2218": "compfn",
        "\u221a": "Sqrt",
        "\u221d": "prop",
        "\u221e": "infin",
        "\u221f": "angrt",
        "\u2220": "ang",
        "\u2220\u20d2": "nang",
        "\u2221": "angmsd",
        "\u2222": "angsph",
        "\u2223": "mid",
        "\u2224": "nmid",
        "\u2225": "par",
        "\u2226": "npar",
        "\u2227": "and",
        "\u2228": "or",
        "\u2229": "cap",
        "\u2229\ufe00": "caps",
        "\u222a": "cup",
        "\u222a\ufe00": "cups",
        "\u222b": "int",
        "\u222c": "Int",
        "\u222d": "tint",
        "\u2a0c": "qint",
        "\u222e": "oint",
        "\u222f": "Conint",
        "\u2230": "Cconint",
        "\u2231": "cwint",
        "\u2232": "cwconint",
        "\u2233": "awconint",
        "\u2234": "there4",
        "\u2235": "becaus",
        "\u2236": "ratio",
        "\u2237": "Colon",
        "\u2238": "minusd",
        "\u223a": "mDDot",
        "\u223b": "homtht",
        "\u223c": "sim",
        "\u2241": "nsim",
        "\u223c\u20d2": "nvsim",
        "\u223d": "bsim",
        "\u223d\u0331": "race",
        "\u223e": "ac",
        "\u223e\u0333": "acE",
        "\u223f": "acd",
        "\u2240": "wr",
        "\u2242": "esim",
        "\u2242\u0338": "nesim",
        "\u2243": "sime",
        "\u2244": "nsime",
        "\u2245": "cong",
        "\u2247": "ncong",
        "\u2246": "simne",
        "\u2248": "ap",
        "\u2249": "nap",
        "\u224a": "ape",
        "\u224b": "apid",
        "\u224b\u0338": "napid",
        "\u224c": "bcong",
        "\u224d": "CupCap",
        "\u226d": "NotCupCap",
        "\u224d\u20d2": "nvap",
        "\u224e": "bump",
        "\u224e\u0338": "nbump",
        "\u224f": "bumpe",
        "\u224f\u0338": "nbumpe",
        "\u2250": "doteq",
        "\u2250\u0338": "nedot",
        "\u2251": "eDot",
        "\u2252": "efDot",
        "\u2253": "erDot",
        "\u2254": "colone",
        "\u2255": "ecolon",
        "\u2256": "ecir",
        "\u2257": "cire",
        "\u2259": "wedgeq",
        "\u225a": "veeeq",
        "\u225c": "trie",
        "\u225f": "equest",
        "\u2261": "equiv",
        "\u2262": "nequiv",
        "\u2261\u20e5": "bnequiv",
        "\u2264": "le",
        "\u2270": "nle",
        "\u2264\u20d2": "nvle",
        "\u2265": "ge",
        "\u2271": "nge",
        "\u2265\u20d2": "nvge",
        "\u2266": "lE",
        "\u2266\u0338": "nlE",
        "\u2267": "gE",
        "\u2267\u0338": "ngE",
        "\u2268\ufe00": "lvnE",
        "\u2268": "lnE",
        "\u2269": "gnE",
        "\u2269\ufe00": "gvnE",
        "\u226a": "ll",
        "\u226a\u0338": "nLtv",
        "\u226a\u20d2": "nLt",
        "\u226b": "gg",
        "\u226b\u0338": "nGtv",
        "\u226b\u20d2": "nGt",
        "\u226c": "twixt",
        "\u2272": "lsim",
        "\u2274": "nlsim",
        "\u2273": "gsim",
        "\u2275": "ngsim",
        "\u2276": "lg",
        "\u2278": "ntlg",
        "\u2277": "gl",
        "\u2279": "ntgl",
        "\u227a": "pr",
        "\u2280": "npr",
        "\u227b": "sc",
        "\u2281": "nsc",
        "\u227c": "prcue",
        "\u22e0": "nprcue",
        "\u227d": "sccue",
        "\u22e1": "nsccue",
        "\u227e": "prsim",
        "\u227f": "scsim",
        "\u227f\u0338": "NotSucceedsTilde",
        "\u2282": "sub",
        "\u2284": "nsub",
        "\u2282\u20d2": "vnsub",
        "\u2283": "sup",
        "\u2285": "nsup",
        "\u2283\u20d2": "vnsup",
        "\u2286": "sube",
        "\u2288": "nsube",
        "\u2287": "supe",
        "\u2289": "nsupe",
        "\u228a\ufe00": "vsubne",
        "\u228a": "subne",
        "\u228b\ufe00": "vsupne",
        "\u228b": "supne",
        "\u228d": "cupdot",
        "\u228e": "uplus",
        "\u228f": "sqsub",
        "\u228f\u0338": "NotSquareSubset",
        "\u2290": "sqsup",
        "\u2290\u0338": "NotSquareSuperset",
        "\u2291": "sqsube",
        "\u22e2": "nsqsube",
        "\u2292": "sqsupe",
        "\u22e3": "nsqsupe",
        "\u2293": "sqcap",
        "\u2293\ufe00": "sqcaps",
        "\u2294": "sqcup",
        "\u2294\ufe00": "sqcups",
        "\u2295": "oplus",
        "\u2296": "ominus",
        "\u2297": "otimes",
        "\u2298": "osol",
        "\u2299": "odot",
        "\u229a": "ocir",
        "\u229b": "oast",
        "\u229d": "odash",
        "\u229e": "plusb",
        "\u229f": "minusb",
        "\u22a0": "timesb",
        "\u22a1": "sdotb",
        "\u22a2": "vdash",
        "\u22ac": "nvdash",
        "\u22a3": "dashv",
        "\u22a4": "top",
        "\u22a5": "bot",
        "\u22a7": "models",
        "\u22a8": "vDash",
        "\u22ad": "nvDash",
        "\u22a9": "Vdash",
        "\u22ae": "nVdash",
        "\u22aa": "Vvdash",
        "\u22ab": "VDash",
        "\u22af": "nVDash",
        "\u22b0": "prurel",
        "\u22b2": "vltri",
        "\u22ea": "nltri",
        "\u22b3": "vrtri",
        "\u22eb": "nrtri",
        "\u22b4": "ltrie",
        "\u22ec": "nltrie",
        "\u22b4\u20d2": "nvltrie",
        "\u22b5": "rtrie",
        "\u22ed": "nrtrie",
        "\u22b5\u20d2": "nvrtrie",
        "\u22b6": "origof",
        "\u22b7": "imof",
        "\u22b8": "mumap",
        "\u22b9": "hercon",
        "\u22ba": "intcal",
        "\u22bb": "veebar",
        "\u22bd": "barvee",
        "\u22be": "angrtvb",
        "\u22bf": "lrtri",
        "\u22c0": "Wedge",
        "\u22c1": "Vee",
        "\u22c2": "xcap",
        "\u22c3": "xcup",
        "\u22c4": "diam",
        "\u22c5": "sdot",
        "\u22c6": "Star",
        "\u22c7": "divonx",
        "\u22c8": "bowtie",
        "\u22c9": "ltimes",
        "\u22ca": "rtimes",
        "\u22cb": "lthree",
        "\u22cc": "rthree",
        "\u22cd": "bsime",
        "\u22ce": "cuvee",
        "\u22cf": "cuwed",
        "\u22d0": "Sub",
        "\u22d1": "Sup",
        "\u22d2": "Cap",
        "\u22d3": "Cup",
        "\u22d4": "fork",
        "\u22d5": "epar",
        "\u22d6": "ltdot",
        "\u22d7": "gtdot",
        "\u22d8": "Ll",
        "\u22d8\u0338": "nLl",
        "\u22d9": "Gg",
        "\u22d9\u0338": "nGg",
        "\u22da\ufe00": "lesg",
        "\u22da": "leg",
        "\u22db": "gel",
        "\u22db\ufe00": "gesl",
        "\u22de": "cuepr",
        "\u22df": "cuesc",
        "\u22e6": "lnsim",
        "\u22e7": "gnsim",
        "\u22e8": "prnsim",
        "\u22e9": "scnsim",
        "\u22ee": "vellip",
        "\u22ef": "ctdot",
        "\u22f0": "utdot",
        "\u22f1": "dtdot",
        "\u22f2": "disin",
        "\u22f3": "isinsv",
        "\u22f4": "isins",
        "\u22f5": "isindot",
        "\u22f5\u0338": "notindot",
        "\u22f6": "notinvc",
        "\u22f7": "notinvb",
        "\u22f9": "isinE",
        "\u22f9\u0338": "notinE",
        "\u22fa": "nisd",
        "\u22fb": "xnis",
        "\u22fc": "nis",
        "\u22fd": "notnivc",
        "\u22fe": "notnivb",
        "\u2305": "barwed",
        "\u2306": "Barwed",
        "\u230c": "drcrop",
        "\u230d": "dlcrop",
        "\u230e": "urcrop",
        "\u230f": "ulcrop",
        "\u2310": "bnot",
        "\u2312": "profline",
        "\u2313": "profsurf",
        "\u2315": "telrec",
        "\u2316": "target",
        "\u231c": "ulcorn",
        "\u231d": "urcorn",
        "\u231e": "dlcorn",
        "\u231f": "drcorn",
        "\u2322": "frown",
        "\u2323": "smile",
        "\u232d": "cylcty",
        "\u232e": "profalar",
        "\u2336": "topbot",
        "\u233d": "ovbar",
        "\u233f": "solbar",
        "\u237c": "angzarr",
        "\u23b0": "lmoust",
        "\u23b1": "rmoust",
        "\u23b4": "tbrk",
        "\u23b5": "bbrk",
        "\u23b6": "bbrktbrk",
        "\u23dc": "OverParenthesis",
        "\u23dd": "UnderParenthesis",
        "\u23de": "OverBrace",
        "\u23df": "UnderBrace",
        "\u23e2": "trpezium",
        "\u23e7": "elinters",
        "\u2423": "blank",
        "\u2500": "boxh",
        "\u2502": "boxv",
        "\u250c": "boxdr",
        "\u2510": "boxdl",
        "\u2514": "boxur",
        "\u2518": "boxul",
        "\u251c": "boxvr",
        "\u2524": "boxvl",
        "\u252c": "boxhd",
        "\u2534": "boxhu",
        "\u253c": "boxvh",
        "\u2550": "boxH",
        "\u2551": "boxV",
        "\u2552": "boxdR",
        "\u2553": "boxDr",
        "\u2554": "boxDR",
        "\u2555": "boxdL",
        "\u2556": "boxDl",
        "\u2557": "boxDL",
        "\u2558": "boxuR",
        "\u2559": "boxUr",
        "\u255a": "boxUR",
        "\u255b": "boxuL",
        "\u255c": "boxUl",
        "\u255d": "boxUL",
        "\u255e": "boxvR",
        "\u255f": "boxVr",
        "\u2560": "boxVR",
        "\u2561": "boxvL",
        "\u2562": "boxVl",
        "\u2563": "boxVL",
        "\u2564": "boxHd",
        "\u2565": "boxhD",
        "\u2566": "boxHD",
        "\u2567": "boxHu",
        "\u2568": "boxhU",
        "\u2569": "boxHU",
        "\u256a": "boxvH",
        "\u256b": "boxVh",
        "\u256c": "boxVH",
        "\u2580": "uhblk",
        "\u2584": "lhblk",
        "\u2588": "block",
        "\u2591": "blk14",
        "\u2592": "blk12",
        "\u2593": "blk34",
        "\u25a1": "squ",
        "\u25aa": "squf",
        "\u25ab": "EmptyVerySmallSquare",
        "\u25ad": "rect",
        "\u25ae": "marker",
        "\u25b1": "fltns",
        "\u25b3": "xutri",
        "\u25b4": "utrif",
        "\u25b5": "utri",
        "\u25b8": "rtrif",
        "\u25b9": "rtri",
        "\u25bd": "xdtri",
        "\u25be": "dtrif",
        "\u25bf": "dtri",
        "\u25c2": "ltrif",
        "\u25c3": "ltri",
        "\u25ca": "loz",
        "\u25cb": "cir",
        "\u25ec": "tridot",
        "\u25ef": "xcirc",
        "\u25f8": "ultri",
        "\u25f9": "urtri",
        "\u25fa": "lltri",
        "\u25fb": "EmptySmallSquare",
        "\u25fc": "FilledSmallSquare",
        "\u2605": "starf",
        "\u2606": "star",
        "\u260e": "phone",
        "\u2640": "female",
        "\u2642": "male",
        "\u2660": "spades",
        "\u2663": "clubs",
        "\u2665": "hearts",
        "\u2666": "diams",
        "\u266a": "sung",
        "\u2713": "check",
        "\u2717": "cross",
        "\u2720": "malt",
        "\u2736": "sext",
        "\u2758": "VerticalSeparator",
        "\u27c8": "bsolhsub",
        "\u27c9": "suphsol",
        "\u27f5": "xlarr",
        "\u27f6": "xrarr",
        "\u27f7": "xharr",
        "\u27f8": "xlArr",
        "\u27f9": "xrArr",
        "\u27fa": "xhArr",
        "\u27fc": "xmap",
        "\u27ff": "dzigrarr",
        "\u2902": "nvlArr",
        "\u2903": "nvrArr",
        "\u2904": "nvHarr",
        "\u2905": "Map",
        "\u290c": "lbarr",
        "\u290d": "rbarr",
        "\u290e": "lBarr",
        "\u290f": "rBarr",
        "\u2910": "RBarr",
        "\u2911": "DDotrahd",
        "\u2912": "UpArrowBar",
        "\u2913": "DownArrowBar",
        "\u2916": "Rarrtl",
        "\u2919": "latail",
        "\u291a": "ratail",
        "\u291b": "lAtail",
        "\u291c": "rAtail",
        "\u291d": "larrfs",
        "\u291e": "rarrfs",
        "\u291f": "larrbfs",
        "\u2920": "rarrbfs",
        "\u2923": "nwarhk",
        "\u2924": "nearhk",
        "\u2925": "searhk",
        "\u2926": "swarhk",
        "\u2927": "nwnear",
        "\u2928": "toea",
        "\u2929": "tosa",
        "\u292a": "swnwar",
        "\u2933": "rarrc",
        "\u2933\u0338": "nrarrc",
        "\u2935": "cudarrr",
        "\u2936": "ldca",
        "\u2937": "rdca",
        "\u2938": "cudarrl",
        "\u2939": "larrpl",
        "\u293c": "curarrm",
        "\u293d": "cularrp",
        "\u2945": "rarrpl",
        "\u2948": "harrcir",
        "\u2949": "Uarrocir",
        "\u294a": "lurdshar",
        "\u294b": "ldrushar",
        "\u294e": "LeftRightVector",
        "\u294f": "RightUpDownVector",
        "\u2950": "DownLeftRightVector",
        "\u2951": "LeftUpDownVector",
        "\u2952": "LeftVectorBar",
        "\u2953": "RightVectorBar",
        "\u2954": "RightUpVectorBar",
        "\u2955": "RightDownVectorBar",
        "\u2956": "DownLeftVectorBar",
        "\u2957": "DownRightVectorBar",
        "\u2958": "LeftUpVectorBar",
        "\u2959": "LeftDownVectorBar",
        "\u295a": "LeftTeeVector",
        "\u295b": "RightTeeVector",
        "\u295c": "RightUpTeeVector",
        "\u295d": "RightDownTeeVector",
        "\u295e": "DownLeftTeeVector",
        "\u295f": "DownRightTeeVector",
        "\u2960": "LeftUpTeeVector",
        "\u2961": "LeftDownTeeVector",
        "\u2962": "lHar",
        "\u2963": "uHar",
        "\u2964": "rHar",
        "\u2965": "dHar",
        "\u2966": "luruhar",
        "\u2967": "ldrdhar",
        "\u2968": "ruluhar",
        "\u2969": "rdldhar",
        "\u296a": "lharul",
        "\u296b": "llhard",
        "\u296c": "rharul",
        "\u296d": "lrhard",
        "\u296e": "udhar",
        "\u296f": "duhar",
        "\u2970": "RoundImplies",
        "\u2971": "erarr",
        "\u2972": "simrarr",
        "\u2973": "larrsim",
        "\u2974": "rarrsim",
        "\u2975": "rarrap",
        "\u2976": "ltlarr",
        "\u2978": "gtrarr",
        "\u2979": "subrarr",
        "\u297b": "suplarr",
        "\u297c": "lfisht",
        "\u297d": "rfisht",
        "\u297e": "ufisht",
        "\u297f": "dfisht",
        "\u299a": "vzigzag",
        "\u299c": "vangrt",
        "\u299d": "angrtvbd",
        "\u29a4": "ange",
        "\u29a5": "range",
        "\u29a6": "dwangle",
        "\u29a7": "uwangle",
        "\u29a8": "angmsdaa",
        "\u29a9": "angmsdab",
        "\u29aa": "angmsdac",
        "\u29ab": "angmsdad",
        "\u29ac": "angmsdae",
        "\u29ad": "angmsdaf",
        "\u29ae": "angmsdag",
        "\u29af": "angmsdah",
        "\u29b0": "bemptyv",
        "\u29b1": "demptyv",
        "\u29b2": "cemptyv",
        "\u29b3": "raemptyv",
        "\u29b4": "laemptyv",
        "\u29b5": "ohbar",
        "\u29b6": "omid",
        "\u29b7": "opar",
        "\u29b9": "operp",
        "\u29bb": "olcross",
        "\u29bc": "odsold",
        "\u29be": "olcir",
        "\u29bf": "ofcir",
        "\u29c0": "olt",
        "\u29c1": "ogt",
        "\u29c2": "cirscir",
        "\u29c3": "cirE",
        "\u29c4": "solb",
        "\u29c5": "bsolb",
        "\u29c9": "boxbox",
        "\u29cd": "trisb",
        "\u29ce": "rtriltri",
        "\u29cf": "LeftTriangleBar",
        "\u29cf\u0338": "NotLeftTriangleBar",
        "\u29d0": "RightTriangleBar",
        "\u29d0\u0338": "NotRightTriangleBar",
        "\u29dc": "iinfin",
        "\u29dd": "infintie",
        "\u29de": "nvinfin",
        "\u29e3": "eparsl",
        "\u29e4": "smeparsl",
        "\u29e5": "eqvparsl",
        "\u29eb": "lozf",
        "\u29f4": "RuleDelayed",
        "\u29f6": "dsol",
        "\u2a00": "xodot",
        "\u2a01": "xoplus",
        "\u2a02": "xotime",
        "\u2a04": "xuplus",
        "\u2a06": "xsqcup",
        "\u2a0d": "fpartint",
        "\u2a10": "cirfnint",
        "\u2a11": "awint",
        "\u2a12": "rppolint",
        "\u2a13": "scpolint",
        "\u2a14": "npolint",
        "\u2a15": "pointint",
        "\u2a16": "quatint",
        "\u2a17": "intlarhk",
        "\u2a22": "pluscir",
        "\u2a23": "plusacir",
        "\u2a24": "simplus",
        "\u2a25": "plusdu",
        "\u2a26": "plussim",
        "\u2a27": "plustwo",
        "\u2a29": "mcomma",
        "\u2a2a": "minusdu",
        "\u2a2d": "loplus",
        "\u2a2e": "roplus",
        "\u2a2f": "Cross",
        "\u2a30": "timesd",
        "\u2a31": "timesbar",
        "\u2a33": "smashp",
        "\u2a34": "lotimes",
        "\u2a35": "rotimes",
        "\u2a36": "otimesas",
        "\u2a37": "Otimes",
        "\u2a38": "odiv",
        "\u2a39": "triplus",
        "\u2a3a": "triminus",
        "\u2a3b": "tritime",
        "\u2a3c": "iprod",
        "\u2a3f": "amalg",
        "\u2a40": "capdot",
        "\u2a42": "ncup",
        "\u2a43": "ncap",
        "\u2a44": "capand",
        "\u2a45": "cupor",
        "\u2a46": "cupcap",
        "\u2a47": "capcup",
        "\u2a48": "cupbrcap",
        "\u2a49": "capbrcup",
        "\u2a4a": "cupcup",
        "\u2a4b": "capcap",
        "\u2a4c": "ccups",
        "\u2a4d": "ccaps",
        "\u2a50": "ccupssm",
        "\u2a53": "And",
        "\u2a54": "Or",
        "\u2a55": "andand",
        "\u2a56": "oror",
        "\u2a57": "orslope",
        "\u2a58": "andslope",
        "\u2a5a": "andv",
        "\u2a5b": "orv",
        "\u2a5c": "andd",
        "\u2a5d": "ord",
        "\u2a5f": "wedbar",
        "\u2a66": "sdote",
        "\u2a6a": "simdot",
        "\u2a6d": "congdot",
        "\u2a6d\u0338": "ncongdot",
        "\u2a6e": "easter",
        "\u2a6f": "apacir",
        "\u2a70": "apE",
        "\u2a70\u0338": "napE",
        "\u2a71": "eplus",
        "\u2a72": "pluse",
        "\u2a73": "Esim",
        "\u2a77": "eDDot",
        "\u2a78": "equivDD",
        "\u2a79": "ltcir",
        "\u2a7a": "gtcir",
        "\u2a7b": "ltquest",
        "\u2a7c": "gtquest",
        "\u2a7d": "les",
        "\u2a7d\u0338": "nles",
        "\u2a7e": "ges",
        "\u2a7e\u0338": "nges",
        "\u2a7f": "lesdot",
        "\u2a80": "gesdot",
        "\u2a81": "lesdoto",
        "\u2a82": "gesdoto",
        "\u2a83": "lesdotor",
        "\u2a84": "gesdotol",
        "\u2a85": "lap",
        "\u2a86": "gap",
        "\u2a87": "lne",
        "\u2a88": "gne",
        "\u2a89": "lnap",
        "\u2a8a": "gnap",
        "\u2a8b": "lEg",
        "\u2a8c": "gEl",
        "\u2a8d": "lsime",
        "\u2a8e": "gsime",
        "\u2a8f": "lsimg",
        "\u2a90": "gsiml",
        "\u2a91": "lgE",
        "\u2a92": "glE",
        "\u2a93": "lesges",
        "\u2a94": "gesles",
        "\u2a95": "els",
        "\u2a96": "egs",
        "\u2a97": "elsdot",
        "\u2a98": "egsdot",
        "\u2a99": "el",
        "\u2a9a": "eg",
        "\u2a9d": "siml",
        "\u2a9e": "simg",
        "\u2a9f": "simlE",
        "\u2aa0": "simgE",
        "\u2aa1": "LessLess",
        "\u2aa1\u0338": "NotNestedLessLess",
        "\u2aa2": "GreaterGreater",
        "\u2aa2\u0338": "NotNestedGreaterGreater",
        "\u2aa4": "glj",
        "\u2aa5": "gla",
        "\u2aa6": "ltcc",
        "\u2aa7": "gtcc",
        "\u2aa8": "lescc",
        "\u2aa9": "gescc",
        "\u2aaa": "smt",
        "\u2aab": "lat",
        "\u2aac": "smte",
        "\u2aac\ufe00": "smtes",
        "\u2aad": "late",
        "\u2aad\ufe00": "lates",
        "\u2aae": "bumpE",
        "\u2aaf": "pre",
        "\u2aaf\u0338": "npre",
        "\u2ab0": "sce",
        "\u2ab0\u0338": "nsce",
        "\u2ab3": "prE",
        "\u2ab4": "scE",
        "\u2ab5": "prnE",
        "\u2ab6": "scnE",
        "\u2ab7": "prap",
        "\u2ab8": "scap",
        "\u2ab9": "prnap",
        "\u2aba": "scnap",
        "\u2abb": "Pr",
        "\u2abc": "Sc",
        "\u2abd": "subdot",
        "\u2abe": "supdot",
        "\u2abf": "subplus",
        "\u2ac0": "supplus",
        "\u2ac1": "submult",
        "\u2ac2": "supmult",
        "\u2ac3": "subedot",
        "\u2ac4": "supedot",
        "\u2ac5": "subE",
        "\u2ac5\u0338": "nsubE",
        "\u2ac6": "supE",
        "\u2ac6\u0338": "nsupE",
        "\u2ac7": "subsim",
        "\u2ac8": "supsim",
        "\u2acb\ufe00": "vsubnE",
        "\u2acb": "subnE",
        "\u2acc\ufe00": "vsupnE",
        "\u2acc": "supnE",
        "\u2acf": "csub",
        "\u2ad0": "csup",
        "\u2ad1": "csube",
        "\u2ad2": "csupe",
        "\u2ad3": "subsup",
        "\u2ad4": "supsub",
        "\u2ad5": "subsub",
        "\u2ad6": "supsup",
        "\u2ad7": "suphsub",
        "\u2ad8": "supdsub",
        "\u2ad9": "forkv",
        "\u2ada": "topfork",
        "\u2adb": "mlcp",
        "\u2ae4": "Dashv",
        "\u2ae6": "Vdashl",
        "\u2ae7": "Barv",
        "\u2ae8": "vBar",
        "\u2ae9": "vBarv",
        "\u2aeb": "Vbar",
        "\u2aec": "Not",
        "\u2aed": "bNot",
        "\u2aee": "rnmid",
        "\u2aef": "cirmid",
        "\u2af0": "midcir",
        "\u2af1": "topcir",
        "\u2af2": "nhpar",
        "\u2af3": "parsim",
        "\u2afd": "parsl",
        "\u2afd\u20e5": "nparsl",
        "\u266d": "flat",
        "\u266e": "natur",
        "\u266f": "sharp",
        "\u00a4": "curren",
        "\u00a2": "cent",
        $: "dollar",
        "\u00a3": "pound",
        "\u00a5": "yen",
        "\u20ac": "euro",
        "\u00b9": "sup1",
        "\u00bd": "half",
        "\u2153": "frac13",
        "\u00bc": "frac14",
        "\u2155": "frac15",
        "\u2159": "frac16",
        "\u215b": "frac18",
        "\u00b2": "sup2",
        "\u2154": "frac23",
        "\u2156": "frac25",
        "\u00b3": "sup3",
        "\u00be": "frac34",
        "\u2157": "frac35",
        "\u215c": "frac38",
        "\u2158": "frac45",
        "\u215a": "frac56",
        "\u215d": "frac58",
        "\u215e": "frac78",
        "\ud835\udcb6": "ascr",
        "\ud835\udd52": "aopf",
        "\ud835\udd1e": "afr",
        "\ud835\udd38": "Aopf",
        "\ud835\udd04": "Afr",
        "\ud835\udc9c": "Ascr",
        \u00aa: "ordf",
        \u00e1: "aacute",
        \u00c1: "Aacute",
        \u00e0: "agrave",
        \u00c0: "Agrave",
        \u0103: "abreve",
        \u0102: "Abreve",
        \u00e2: "acirc",
        \u00c2: "Acirc",
        \u00e5: "aring",
        \u00c5: "angst",
        \u00e4: "auml",
        \u00c4: "Auml",
        \u00e3: "atilde",
        \u00c3: "Atilde",
        \u0105: "aogon",
        \u0104: "Aogon",
        \u0101: "amacr",
        \u0100: "Amacr",
        \u00e6: "aelig",
        \u00c6: "AElig",
        "\ud835\udcb7": "bscr",
        "\ud835\udd53": "bopf",
        "\ud835\udd1f": "bfr",
        "\ud835\udd39": "Bopf",
        \u212c: "Bscr",
        "\ud835\udd05": "Bfr",
        "\ud835\udd20": "cfr",
        "\ud835\udcb8": "cscr",
        "\ud835\udd54": "copf",
        \u212d: "Cfr",
        "\ud835\udc9e": "Cscr",
        \u2102: "Copf",
        \u0107: "cacute",
        \u0106: "Cacute",
        \u0109: "ccirc",
        \u0108: "Ccirc",
        \u010d: "ccaron",
        \u010c: "Ccaron",
        \u010b: "cdot",
        \u010a: "Cdot",
        \u00e7: "ccedil",
        \u00c7: "Ccedil",
        "\u2105": "incare",
        "\ud835\udd21": "dfr",
        \u2146: "dd",
        "\ud835\udd55": "dopf",
        "\ud835\udcb9": "dscr",
        "\ud835\udc9f": "Dscr",
        "\ud835\udd07": "Dfr",
        \u2145: "DD",
        "\ud835\udd3b": "Dopf",
        \u010f: "dcaron",
        \u010e: "Dcaron",
        \u0111: "dstrok",
        \u0110: "Dstrok",
        \u00f0: "eth",
        \u00d0: "ETH",
        \u2147: "ee",
        \u212f: "escr",
        "\ud835\udd22": "efr",
        "\ud835\udd56": "eopf",
        \u2130: "Escr",
        "\ud835\udd08": "Efr",
        "\ud835\udd3c": "Eopf",
        \u00e9: "eacute",
        \u00c9: "Eacute",
        \u00e8: "egrave",
        \u00c8: "Egrave",
        \u00ea: "ecirc",
        \u00ca: "Ecirc",
        \u011b: "ecaron",
        \u011a: "Ecaron",
        \u00eb: "euml",
        \u00cb: "Euml",
        \u0117: "edot",
        \u0116: "Edot",
        \u0119: "eogon",
        \u0118: "Eogon",
        \u0113: "emacr",
        \u0112: "Emacr",
        "\ud835\udd23": "ffr",
        "\ud835\udd57": "fopf",
        "\ud835\udcbb": "fscr",
        "\ud835\udd09": "Ffr",
        "\ud835\udd3d": "Fopf",
        \u2131: "Fscr",
        \ufb00: "fflig",
        \ufb03: "ffilig",
        \ufb04: "ffllig",
        \ufb01: "filig",
        fj: "fjlig",
        \ufb02: "fllig",
        \u0192: "fnof",
        \u210a: "gscr",
        "\ud835\udd58": "gopf",
        "\ud835\udd24": "gfr",
        "\ud835\udca2": "Gscr",
        "\ud835\udd3e": "Gopf",
        "\ud835\udd0a": "Gfr",
        \u01f5: "gacute",
        \u011f: "gbreve",
        \u011e: "Gbreve",
        \u011d: "gcirc",
        \u011c: "Gcirc",
        \u0121: "gdot",
        \u0120: "Gdot",
        \u0122: "Gcedil",
        "\ud835\udd25": "hfr",
        \u210e: "planckh",
        "\ud835\udcbd": "hscr",
        "\ud835\udd59": "hopf",
        \u210b: "Hscr",
        \u210c: "Hfr",
        \u210d: "Hopf",
        \u0125: "hcirc",
        \u0124: "Hcirc",
        \u210f: "hbar",
        \u0127: "hstrok",
        \u0126: "Hstrok",
        "\ud835\udd5a": "iopf",
        "\ud835\udd26": "ifr",
        "\ud835\udcbe": "iscr",
        \u2148: "ii",
        "\ud835\udd40": "Iopf",
        \u2110: "Iscr",
        \u2111: "Im",
        \u00ed: "iacute",
        \u00cd: "Iacute",
        \u00ec: "igrave",
        \u00cc: "Igrave",
        \u00ee: "icirc",
        \u00ce: "Icirc",
        \u00ef: "iuml",
        \u00cf: "Iuml",
        \u0129: "itilde",
        \u0128: "Itilde",
        \u0130: "Idot",
        \u012f: "iogon",
        \u012e: "Iogon",
        \u012b: "imacr",
        \u012a: "Imacr",
        \u0133: "ijlig",
        \u0132: "IJlig",
        \u0131: "imath",
        "\ud835\udcbf": "jscr",
        "\ud835\udd5b": "jopf",
        "\ud835\udd27": "jfr",
        "\ud835\udca5": "Jscr",
        "\ud835\udd0d": "Jfr",
        "\ud835\udd41": "Jopf",
        \u0135: "jcirc",
        \u0134: "Jcirc",
        \u0237: "jmath",
        "\ud835\udd5c": "kopf",
        "\ud835\udcc0": "kscr",
        "\ud835\udd28": "kfr",
        "\ud835\udca6": "Kscr",
        "\ud835\udd42": "Kopf",
        "\ud835\udd0e": "Kfr",
        \u0137: "kcedil",
        \u0136: "Kcedil",
        "\ud835\udd29": "lfr",
        "\ud835\udcc1": "lscr",
        \u2113: "ell",
        "\ud835\udd5d": "lopf",
        \u2112: "Lscr",
        "\ud835\udd0f": "Lfr",
        "\ud835\udd43": "Lopf",
        \u013a: "lacute",
        \u0139: "Lacute",
        \u013e: "lcaron",
        \u013d: "Lcaron",
        \u013c: "lcedil",
        \u013b: "Lcedil",
        \u0142: "lstrok",
        \u0141: "Lstrok",
        \u0140: "lmidot",
        \u013f: "Lmidot",
        "\ud835\udd2a": "mfr",
        "\ud835\udd5e": "mopf",
        "\ud835\udcc2": "mscr",
        "\ud835\udd10": "Mfr",
        "\ud835\udd44": "Mopf",
        \u2133: "Mscr",
        "\ud835\udd2b": "nfr",
        "\ud835\udd5f": "nopf",
        "\ud835\udcc3": "nscr",
        \u2115: "Nopf",
        "\ud835\udca9": "Nscr",
        "\ud835\udd11": "Nfr",
        \u0144: "nacute",
        \u0143: "Nacute",
        \u0148: "ncaron",
        \u0147: "Ncaron",
        \u00f1: "ntilde",
        \u00d1: "Ntilde",
        \u0146: "ncedil",
        \u0145: "Ncedil",
        "\u2116": "numero",
        \u014b: "eng",
        \u014a: "ENG",
        "\ud835\udd60": "oopf",
        "\ud835\udd2c": "ofr",
        \u2134: "oscr",
        "\ud835\udcaa": "Oscr",
        "\ud835\udd12": "Ofr",
        "\ud835\udd46": "Oopf",
        \u00ba: "ordm",
        \u00f3: "oacute",
        \u00d3: "Oacute",
        \u00f2: "ograve",
        \u00d2: "Ograve",
        \u00f4: "ocirc",
        \u00d4: "Ocirc",
        \u00f6: "ouml",
        \u00d6: "Ouml",
        \u0151: "odblac",
        \u0150: "Odblac",
        \u00f5: "otilde",
        \u00d5: "Otilde",
        \u00f8: "oslash",
        \u00d8: "Oslash",
        \u014d: "omacr",
        \u014c: "Omacr",
        \u0153: "oelig",
        \u0152: "OElig",
        "\ud835\udd2d": "pfr",
        "\ud835\udcc5": "pscr",
        "\ud835\udd61": "popf",
        \u2119: "Popf",
        "\ud835\udd13": "Pfr",
        "\ud835\udcab": "Pscr",
        "\ud835\udd62": "qopf",
        "\ud835\udd2e": "qfr",
        "\ud835\udcc6": "qscr",
        "\ud835\udcac": "Qscr",
        "\ud835\udd14": "Qfr",
        \u211a: "Qopf",
        \u0138: "kgreen",
        "\ud835\udd2f": "rfr",
        "\ud835\udd63": "ropf",
        "\ud835\udcc7": "rscr",
        \u211b: "Rscr",
        \u211c: "Re",
        \u211d: "Ropf",
        \u0155: "racute",
        \u0154: "Racute",
        \u0159: "rcaron",
        \u0158: "Rcaron",
        \u0157: "rcedil",
        \u0156: "Rcedil",
        "\ud835\udd64": "sopf",
        "\ud835\udcc8": "sscr",
        "\ud835\udd30": "sfr",
        "\ud835\udd4a": "Sopf",
        "\ud835\udd16": "Sfr",
        "\ud835\udcae": "Sscr",
        "\u24c8": "oS",
        \u015b: "sacute",
        \u015a: "Sacute",
        \u015d: "scirc",
        \u015c: "Scirc",
        \u0161: "scaron",
        \u0160: "Scaron",
        \u015f: "scedil",
        \u015e: "Scedil",
        \u00df: "szlig",
        "\ud835\udd31": "tfr",
        "\ud835\udcc9": "tscr",
        "\ud835\udd65": "topf",
        "\ud835\udcaf": "Tscr",
        "\ud835\udd17": "Tfr",
        "\ud835\udd4b": "Topf",
        \u0165: "tcaron",
        \u0164: "Tcaron",
        \u0163: "tcedil",
        \u0162: "Tcedil",
        "\u2122": "trade",
        \u0167: "tstrok",
        \u0166: "Tstrok",
        "\ud835\udcca": "uscr",
        "\ud835\udd66": "uopf",
        "\ud835\udd32": "ufr",
        "\ud835\udd4c": "Uopf",
        "\ud835\udd18": "Ufr",
        "\ud835\udcb0": "Uscr",
        \u00fa: "uacute",
        \u00da: "Uacute",
        \u00f9: "ugrave",
        \u00d9: "Ugrave",
        \u016d: "ubreve",
        \u016c: "Ubreve",
        \u00fb: "ucirc",
        \u00db: "Ucirc",
        \u016f: "uring",
        \u016e: "Uring",
        \u00fc: "uuml",
        \u00dc: "Uuml",
        \u0171: "udblac",
        \u0170: "Udblac",
        \u0169: "utilde",
        \u0168: "Utilde",
        \u0173: "uogon",
        \u0172: "Uogon",
        \u016b: "umacr",
        \u016a: "Umacr",
        "\ud835\udd33": "vfr",
        "\ud835\udd67": "vopf",
        "\ud835\udccb": "vscr",
        "\ud835\udd19": "Vfr",
        "\ud835\udd4d": "Vopf",
        "\ud835\udcb1": "Vscr",
        "\ud835\udd68": "wopf",
        "\ud835\udccc": "wscr",
        "\ud835\udd34": "wfr",
        "\ud835\udcb2": "Wscr",
        "\ud835\udd4e": "Wopf",
        "\ud835\udd1a": "Wfr",
        \u0175: "wcirc",
        \u0174: "Wcirc",
        "\ud835\udd35": "xfr",
        "\ud835\udccd": "xscr",
        "\ud835\udd69": "xopf",
        "\ud835\udd4f": "Xopf",
        "\ud835\udd1b": "Xfr",
        "\ud835\udcb3": "Xscr",
        "\ud835\udd36": "yfr",
        "\ud835\udcce": "yscr",
        "\ud835\udd6a": "yopf",
        "\ud835\udcb4": "Yscr",
        "\ud835\udd1c": "Yfr",
        "\ud835\udd50": "Yopf",
        \u00fd: "yacute",
        \u00dd: "Yacute",
        \u0177: "ycirc",
        \u0176: "Ycirc",
        \u00ff: "yuml",
        \u0178: "Yuml",
        "\ud835\udccf": "zscr",
        "\ud835\udd37": "zfr",
        "\ud835\udd6b": "zopf",
        \u2128: "Zfr",
        \u2124: "Zopf",
        "\ud835\udcb5": "Zscr",
        \u017a: "zacute",
        \u0179: "Zacute",
        \u017e: "zcaron",
        \u017d: "Zcaron",
        \u017c: "zdot",
        \u017b: "Zdot",
        \u01b5: "imped",
        \u00fe: "thorn",
        \u00de: "THORN",
        \u0149: "napos",
        \u03b1: "alpha",
        \u0391: "Alpha",
        \u03b2: "beta",
        \u0392: "Beta",
        \u03b3: "gamma",
        \u0393: "Gamma",
        \u03b4: "delta",
        \u0394: "Delta",
        \u03b5: "epsi",
        \u03f5: "epsiv",
        \u0395: "Epsilon",
        \u03dd: "gammad",
        \u03dc: "Gammad",
        \u03b6: "zeta",
        \u0396: "Zeta",
        \u03b7: "eta",
        \u0397: "Eta",
        \u03b8: "theta",
        \u03d1: "thetav",
        \u0398: "Theta",
        \u03b9: "iota",
        \u0399: "Iota",
        \u03ba: "kappa",
        \u03f0: "kappav",
        \u039a: "Kappa",
        \u03bb: "lambda",
        \u039b: "Lambda",
        \u03bc: "mu",
        \u00b5: "micro",
        \u039c: "Mu",
        \u03bd: "nu",
        \u039d: "Nu",
        \u03be: "xi",
        \u039e: "Xi",
        \u03bf: "omicron",
        \u039f: "Omicron",
        \u03c0: "pi",
        \u03d6: "piv",
        \u03a0: "Pi",
        \u03c1: "rho",
        \u03f1: "rhov",
        \u03a1: "Rho",
        \u03c3: "sigma",
        \u03a3: "Sigma",
        \u03c2: "sigmaf",
        \u03c4: "tau",
        \u03a4: "Tau",
        \u03c5: "upsi",
        \u03a5: "Upsilon",
        \u03d2: "Upsi",
        \u03c6: "phi",
        \u03d5: "phiv",
        \u03a6: "Phi",
        \u03c7: "chi",
        \u03a7: "Chi",
        \u03c8: "psi",
        \u03a8: "Psi",
        \u03c9: "omega",
        \u03a9: "ohm",
        \u0430: "acy",
        \u0410: "Acy",
        \u0431: "bcy",
        \u0411: "Bcy",
        \u0432: "vcy",
        \u0412: "Vcy",
        \u0433: "gcy",
        \u0413: "Gcy",
        \u0453: "gjcy",
        \u0403: "GJcy",
        \u0434: "dcy",
        \u0414: "Dcy",
        \u0452: "djcy",
        \u0402: "DJcy",
        \u0435: "iecy",
        \u0415: "IEcy",
        \u0451: "iocy",
        \u0401: "IOcy",
        \u0454: "jukcy",
        \u0404: "Jukcy",
        \u0436: "zhcy",
        \u0416: "ZHcy",
        \u0437: "zcy",
        \u0417: "Zcy",
        \u0455: "dscy",
        \u0405: "DScy",
        \u0438: "icy",
        \u0418: "Icy",
        \u0456: "iukcy",
        \u0406: "Iukcy",
        \u0457: "yicy",
        \u0407: "YIcy",
        \u0439: "jcy",
        \u0419: "Jcy",
        \u0458: "jsercy",
        \u0408: "Jsercy",
        \u043a: "kcy",
        \u041a: "Kcy",
        \u045c: "kjcy",
        \u040c: "KJcy",
        \u043b: "lcy",
        \u041b: "Lcy",
        \u0459: "ljcy",
        \u0409: "LJcy",
        \u043c: "mcy",
        \u041c: "Mcy",
        \u043d: "ncy",
        \u041d: "Ncy",
        \u045a: "njcy",
        \u040a: "NJcy",
        \u043e: "ocy",
        \u041e: "Ocy",
        \u043f: "pcy",
        \u041f: "Pcy",
        \u0440: "rcy",
        \u0420: "Rcy",
        \u0441: "scy",
        \u0421: "Scy",
        \u0442: "tcy",
        \u0422: "Tcy",
        \u045b: "tshcy",
        \u040b: "TSHcy",
        \u0443: "ucy",
        \u0423: "Ucy",
        \u045e: "ubrcy",
        \u040e: "Ubrcy",
        \u0444: "fcy",
        \u0424: "Fcy",
        \u0445: "khcy",
        \u0425: "KHcy",
        \u0446: "tscy",
        \u0426: "TScy",
        \u0447: "chcy",
        \u0427: "CHcy",
        \u045f: "dzcy",
        \u040f: "DZcy",
        \u0448: "shcy",
        \u0428: "SHcy",
        \u0449: "shchcy",
        \u0429: "SHCHcy",
        \u044a: "hardcy",
        \u042a: "HARDcy",
        \u044b: "ycy",
        \u042b: "Ycy",
        \u044c: "softcy",
        \u042c: "SOFTcy",
        \u044d: "ecy",
        \u042d: "Ecy",
        \u044e: "yucy",
        \u042e: "YUcy",
        \u044f: "yacy",
        \u042f: "YAcy",
        \u2135: "aleph",
        \u2136: "beth",
        \u2137: "gimel",
        \u2138: "daleth"
    };
String.prototype.toHTMLEntity = function() {
    return unescape(this).replace(regexEncodeNonAscii, function(a) {
        return "&" + encodeMap[a] + ";"
    })
};
String.prototype.escapeQuotes = function() {
    var a = this;
    return a.replaceAll('"', '\\"').replaceAll("'", "\\'")
};
String.prototype.toInt = function() {
    return parseInt(this)
};
String.prototype.toFloat = function() {
    return parseFloat(this)
};
String.prototype.toDouble = function() {
    return parseFloat(this)
};
String.prototype.toDate = function(a) {
    if (typeof a === "undefined") a = ss.CultureInfo.CurrentCulture.dateFormat.shortDatePattern;
    return moment(this, a).toDate()
};
String.prototype.indexOfAny = function(f, a, e) {
    var b = this.length;
    if (!b) return -1;
    a = a || 0;
    e = e || b;
    var d = a + e - 1;
    if (d >= b) d = b - 1;
    for (var c = a; c <= d; c++)
        if (f.indexOf(this.charAt(c)) >= 0) return c;
    return -1
};
String.prototype.insert = function(a, b) {
    if (!b) return this.valueOf();
    if (!a) return b + this;
    var c = this.substr(0, a),
        d = this.substr(a);
    return c + b + d
};
String.isNullOrEmpty = function(a) {
    return !a || !a.length
};
String.isNullOrWhiteSpace = function(a) {
    return String.isNullOrEmpty(a) || a.trim() === ""
};
String.prototype.lastIndexOfAny = function(f, a, e) {
    var d = this.length;
    if (!d) return -1;
    a = a || d - 1;
    e = e || d;
    var c = a - e + 1;
    if (c < 0) c = 0;
    for (var b = a; b >= c; b--)
        if (f.indexOf(this.charAt(b)) >= 0) return b;
    return -1
};
String.localeFormat = function(a) {
    return String._format(a, arguments, true)
};
String.prototype.padLeft = function(b, a) {
    if (this.length < b) {
        a = a || " ";
        return String.fromChar(a, b - this.length) + this
    }
    return this.valueOf()
};
String.prototype.padRight = function(b, a) {
    if (this.length < b) {
        a = a || " ";
        return this + String.fromChar(a, b - this.length)
    }
    return this.valueOf()
};
String.prototype.remove = function(a, b) {
    return !b || a + b > this.length ? this.substr(0, a) : this.substr(0, a) + this.substr(a + b)
};
String.prototype.replaceAll = function(b, a) {
    a = a || "";
    return this.split(b).join(a)
};
String.prototype.startsWith = function(a) {
    return !a.length ? true : a.length > this.length ? false : this.substr(0, a.length) == a
};
if (!String.prototype.trim) String.prototype.trim = function() {
    return this.trimEnd().trimStart()
};
String.prototype.trimEnd = function() {
    return this.replace(/\s*$/, "")
};
String.prototype.trimStart = function() {
    return this.replace(/^\s*/, "")
};
Array.__typeName = "Array";
Array.__interfaces = [ss.IEnumerable];
Object.defineProperty(Array.prototype, "add", withValue(function(a) {
    this[this.length] = a
}));
Object.defineProperty(Array.prototype, "addRange", withValue(function(a) {
    this.push.apply(this, a)
}));
Object.defineProperty(Array.prototype, "aggregate", withValue(function(b, c, d) {
    for (var e = this.length, a = 0; a < e; a++)
        if (a in this) b = c.call(d, b, this[a], a, this);
    return b
}));
Object.defineProperty(Array.prototype, "clear", withValue(function() {
    this.length = 0
}));
Object.defineProperty(Array.prototype, "clone", withValue(function() {
    return this.length === 1 ? [this[0]] : Array.apply(null, this)
}));
Object.defineProperty(Array.prototype, "contains", withValue(function(b) {
    var a = this.indexOf(b);
    return a >= 0
}));
Object.defineProperty(Array.prototype, "dequeue", withValue(function() {
    return this.shift()
}));
Object.defineProperty(Array.prototype, "enqueue", withValue(function(a) {
    this._queue = true;
    this.push(a)
}));
Object.defineProperty(Array.prototype, "peek", withValue(function() {
    if (this.length) {
        var a = this._queue ? 0 : this.length - 1;
        return this[a]
    }
    return null
}));
!Array.prototype.every && Object.defineProperty(Array.prototype, "every", withValue(function(b, c) {
    for (var d = this.length, a = 0; a < d; a++)
        if (a in this && !b.call(c, this[a], a, this)) return false;
    return true
}));
Object.defineProperty(Array.prototype, "extract", withValue(function(a, b) {
    return !b ? this.slice(a) : this.slice(a, a + b)
}));
!Array.prototype.filter && Object.defineProperty(Array.prototype, "filter", withValue(function(d, e) {
    for (var f = this.length, b = [], a = 0; a < f; a++)
        if (a in this) {
            var c = this[a];
            d.call(e, c, a, this) && b.push(c)
        } return b
}));
!Array.prototype.forEach && Object.defineProperty(Array.prototype, "forEach", withValue(function(b, c) {
    for (var d = this.length, a = 0; a < d; a++) a in this && b.call(c, this[a], a, this)
}));
Object.defineProperty(Array.prototype, "getEnumerator", withValue(function() {
    return new ss.ArrayEnumerator(this)
}));
Object.defineProperty(Array.prototype, "groupBy", withValue(function(f, g) {
    for (var h = this.length, d = [], e = {}, b = 0; b < h; b++)
        if (b in this) {
            var c = f.call(g, this[b], b);
            if (String.isNullOrEmpty(c)) continue;
            var a = e[c];
            if (!a) {
                a = [];
                a.key = c;
                e[c] = a;
                d.add(a)
            }
            a.add(this[b])
        } return d
}));
Object.defineProperty(Array.prototype, "index", withValue(function(d, e) {
    for (var f = this.length, b = {}, a = 0; a < f; a++)
        if (a in this) {
            var c = d.call(e, this[a], a);
            if (String.isNullOrEmpty(c)) continue;
            b[c] = this[a]
        } return b
}));
!Array.prototype.indexOf && Object.defineProperty(Array.prototype, "indexOf", withValue(function(d, b) {
    b = b || 0;
    var c = this.length;
    if (c)
        for (var a = b; a < c; a++)
            if (this[a] === d) return a;
    return -1
}));
Object.defineProperty(Array.prototype, "insert", withValue(function(a, b) {
    this.splice(a, 0, b)
}));
Object.defineProperty(Array.prototype, "insertRange", withValue(function(c, b) {
    if (c === 0) this.unshift.apply(this, b);
    else
        for (var a = 0; a < b.length; a++) this.splice(c + a, 0, b[a])
}));
!Array.prototype.map && Object.defineProperty(Array.prototype, "map", withValue(function(d, e) {
    for (var b = this.length, c = new Array(b), a = 0; a < b; a++)
        if (a in this) c[a] = d.call(e, this[a], a, this);
    return c
}));
Array.parse = function(a) {
    return eval("(" + a + ")")
};
Object.defineProperty(Array.prototype, "remove", withValue(function(b) {
    var a = this.indexOf(b);
    if (a >= 0) {
        this.splice(a, 1);
        return true
    }
    return false
}));
Object.defineProperty(Array.prototype, "removeAt", withValue(function(a) {
    this.splice(a, 1)
}));
Object.defineProperty(Array.prototype, "removeRange", withValue(function(b, a) {
    return this.splice(b, a)
}));
!Array.prototype.some && Object.defineProperty(Array.prototype, "some", withValue(function(b, c) {
    for (var d = this.length, a = 0; a < d; a++)
        if (a in this && b.call(c, this[a], a, this)) return true;
    return false
}));
Array.toArray = function(a) {
    return Array.prototype.slice.call(a)
};
RegExp.__typeName = "RegExp";
RegExp.parse = function(a) {
    if (a.startsWith("/")) {
        var b = a.lastIndexOf("/");
        if (b > 1) {
            var c = a.substring(1, b),
                d = a.substr(b + 1);
            return new RegExp(c, d)
        }
    }
    return null
};
Date.__typeName = "Date";
Date.empty = null;
Date.get_now = function() {
    return new Date
};
Date.get_today = function() {
    var a = new Date;
    return new Date(a.getFullYear(), a.getMonth(), a.getDate())
};
Date.isEmpty = function(a) {
    return a === null || a.valueOf() === 0
};
Date.prototype.format = function(a) {
    return ss.isNullOrUndefined(a) || a.length == 0 || a == "i" ? this.toString() : a == "id" ? this.toDateString() : a == "it" ? this.toTimeString() : this._netFormat(a, false)
};
Date.prototype.toYMD = function() {
    return dateToYMD(this)
};
Date.prototype.localeFormat = function(a) {
    return ss.isNullOrUndefined(a) || a.length == 0 || a == "i" ? this.toLocaleString() : a == "id" ? this.toLocaleDateString() : a == "it" ? this.toLocaleTimeString() : this._netFormat(a, true)
};
Date.prototype._netFormat = function(d, i) {
    var b = this,
        c = i ? ss.CultureInfo.CurrentCulture.dateFormat : ss.CultureInfo.InvariantCulture.dateFormat;
    if (d.length == 1) switch (d) {
        case "f":
            d = c.longDatePattern + " " + c.shortTimePattern;
            break;
        case "F":
            d = c.dateTimePattern;
            break;
        case "d":
            d = c.shortDatePattern;
            break;
        case "D":
            d = c.longDatePattern;
            break;
        case "t":
            d = c.shortTimePattern;
            break;
        case "T":
            d = c.longTimePattern;
            break;
        case "g":
            d = c.shortDatePattern + " " + c.shortTimePattern;
            break;
        case "G":
            d = c.shortDatePattern + " " + c.longTimePattern;
            break;
        case "R":
        case "r":
            c = ss.CultureInfo.InvariantCulture.dateFormat;
            d = c.gmtDateTimePattern;
            break;
        case "u":
            d = c.universalDateTimePattern;
            break;
        case "U":
            d = c.dateTimePattern;
            b = new Date(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate(), b.getUTCHours(), b.getUTCMinutes(), b.getUTCSeconds(), b.getUTCMilliseconds());
            break;
        case "s":
            d = c.sortableDateTimePattern
    }
    if (d.charAt(0) == "%") d = d.substr(1);
    if (!Date._formatRE) Date._formatRE = /'.*?[^\\]'|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z/g;
    var g = Date._formatRE,
        h = new ss.StringBuilder;
    g.lastIndex = 0;
    while (true) {
        var j = g.lastIndex,
            f = g.exec(d);
        h.append(d.slice(j, f ? f.index : d.length));
        if (!f) break;
        var e = f[0],
            a = e;
        switch (e) {
            case "dddd":
                a = c.dayNames[b.getDay()];
                break;
            case "ddd":
                a = c.shortDayNames[b.getDay()];
                break;
            case "dd":
                a = b.getDate().toString().padLeft(2, "0");
                break;
            case "d":
                a = b.getDate();
                break;
            case "MMMM":
                a = c.monthNames[b.getMonth()];
                break;
            case "MMM":
                a = c.shortMonthNames[b.getMonth()];
                break;
            case "MM":
                a = (b.getMonth() + 1).toString().padLeft(2, "0");
                break;
            case "M":
                a = b.getMonth() + 1;
                break;
            case "yyyy":
                a = b.getFullYear();
                break;
            case "yy":
                a = (b.getFullYear() % 100).toString().padLeft(2, "0");
                break;
            case "y":
                a = b.getFullYear() % 100;
                break;
            case "h":
            case "hh":
                a = b.getHours() % 12;
                if (!a) a = "12";
                else if (e == "hh") a = a.toString().padLeft(2, "0");
                break;
            case "HH":
                a = b.getHours().toString().padLeft(2, "0");
                break;
            case "H":
                a = b.getHours();
                break;
            case "mm":
                a = b.getMinutes().toString().padLeft(2, "0");
                break;
            case "m":
                a = b.getMinutes();
                break;
            case "ss":
                a = b.getSeconds().toString().padLeft(2, "0");
                break;
            case "s":
                a = b.getSeconds();
                break;
            case "t":
            case "tt":
                a = b.getHours() < 12 ? c.amDesignator : c.pmDesignator;
                if (e == "t") a = a.charAt(0);
                break;
            case "fff":
                a = b.getMilliseconds().toString().padLeft(3, "0");
                break;
            case "ff":
                a = b.getMilliseconds().toString().padLeft(3).substr(0, 2);
                break;
            case "f":
                a = b.getMilliseconds().toString().padLeft(3).charAt(0);
                break;
            case "z":
                a = b.getTimezoneOffset() / 60;
                a = (a >= 0 ? "-" : "+") + Math.floor(Math.abs(a));
                break;
            case "zz":
            case "zzz":
                a = b.getTimezoneOffset() / 60;
                a = (a >= 0 ? "-" : "+") + Math.floor(Math.abs(a)).toString().padLeft(2, "0");
                if (e == "zzz") a += c.timeSeparator + Math.abs(b.getTimezoneOffset() % 60).toString().padLeft(2, "0");
                break;
            default:
                if (a.charAt(0) == "'") a = a.substr(1, a.length - 2).replace(/\\'/g, "'")
        }
        h.append(a)
    }
    return h.toString()
};
Date.parseDate = function(b) {
    var a = Date.parse(b);
    return isNaN(a) ? a : new Date(a)
};
Error.__typeName = "Error";
Error.prototype.popStackFrame = function() {
    if (ss.isNullOrUndefined(this.stack) || ss.isNullOrUndefined(this.fileName) || ss.isNullOrUndefined(this.lineNumber)) return;
    var a = this.stack.split("\n"),
        c = a[0],
        e = this.fileName + ":" + this.lineNumber;
    while (!ss.isNullOrUndefined(c) && c.indexOf(e) === -1) {
        a.shift();
        c = a[0]
    }
    var d = a[1];
    if (isNullOrUndefined(d)) return;
    var b = d.match(/@(.*):(\d+)$/);
    if (ss.isNullOrUndefined(b)) return;
    a.shift();
    this.stack = a.join("\n");
    this.fileName = b[1];
    this.lineNumber = parseInt(b[2])
};
Error.createError = function(e, b, c) {
    var a = new Error(e);
    if (b)
        for (var d in b) a[d] = b[d];
    if (c) a.innerException = c;
    a.popStackFrame();
    return a
};
ss.Debug = window.Debug || function() {};
ss.Debug.__typeName = "Debug";
if (!ss.Debug.writeln) ss.Debug.writeln = function(a) {
    if (window.console) {
        if (window.console.debug) {
            window.console.debug(a);
            return
        } else if (window.console.log) {
            window.console.log(a);
            return
        }
    } else if (window.opera && window.opera.postError) {
        window.opera.postError(a);
        return
    }
};
ss.Debug._fail = function(a) {
    ss.Debug.writeln(a);
    eval("debugger;")
};
ss.Debug.assert = function(b, a) {
    if (!b) {
        a = "Assert failed: " + a;
        confirm(a + "\r\n\r\nBreak into debugger?") && ss.Debug._fail(a)
    }
};
ss.Debug.fail = function(a) {
    ss.Debug._fail(a)
};
window.Type = Function;
Type.__typeName = "Type";
window.__Namespace = function(a) {
    this.__typeName = a
};
__Namespace.prototype = {
    __namespace: true,
    getName: function() {
        return this.__typeName
    }
};
Type.registerNamespace = function(e) {
    if (!window.__namespaces) window.__namespaces = {};
    if (!window.__rootNamespaces) window.__rootNamespaces = [];
    if (window.__namespaces[e]) return;
    for (var c = window, d = e.split("."), a = 0; a < d.length; a++) {
        var f = d[a],
            b = c[f];
        if (!b) {
            c[f] = b = new __Namespace(d.slice(0, a + 1).join("."));
            a == 0 && window.__rootNamespaces.add(b)
        }
        c = b
    }
    window.__namespaces[e] = c
};
Type.prototype.registerClass = function(d, c, a) {
    this.prototype.constructor = this;
    this.__typeName = d;
    this.__class = true;
    this.__baseType = c || Object;
    if (c) this.__basePrototypePending = true;
    if (a) {
        this.__interfaces = [];
        for (var b = 2; b < arguments.length; b++) {
            a = arguments[b];
            this.__interfaces.add(a)
        }
    }
};
Type.prototype.registerInterface = function(a) {
    this.__typeName = a;
    this.__interface = true
};
Type.prototype.registerEnum = function(c, b) {
    for (var a in this.prototype) this[a] = this.prototype[a];
    this.__typeName = c;
    this.__enum = true;
    if (b) this.__flags = true
};
Type.prototype.setupBase = function() {
    if (this.__basePrototypePending) {
        var a = this.__baseType;
        a.__basePrototypePending && a.setupBase();
        for (var b in a.prototype) {
            var c = a.prototype[b];
            if (!this.prototype[b]) this.prototype[b] = c
        }
        delete this.__basePrototypePending
    }
};
if (!Type.prototype.resolveInheritance) Type.prototype.resolveInheritance = Type.prototype.setupBase;
Type.prototype.initializeBase = function(a, b) {
    this.__basePrototypePending && this.setupBase();
    if (!b) this.__baseType.apply(a);
    else this.__baseType.apply(a, b)
};
Type.prototype.callBaseMethod = function(b, d, c) {
    var a = this.__baseType.prototype[d];
    return !c ? a.apply(b) : a.apply(b, c)
};
Type.prototype.get_baseType = function() {
    return this.__baseType || null
};
Type.prototype.get_fullName = function() {
    return this.__typeName
};
Type.prototype.get_name = function() {
    var a = this.__typeName,
        b = a.lastIndexOf(".");
    return b > 0 ? a.substr(b + 1) : a
};
Type.prototype.getInterfaces = function() {
    return this.__interfaces
};
Type.prototype.isInstanceOfType = function(a) {
    if (ss.isNullOrUndefined(a)) return false;
    if (this == Object || a instanceof this) return true;
    var b = Type.getInstanceType(a);
    return this.isAssignableFrom(b)
};
Type.prototype.isAssignableFrom = function(c) {
    if (this == Object || this == c) return true;
    if (this.__class) {
        var a = c.__baseType;
        while (a) {
            if (this == a) return true;
            a = a.__baseType
        }
    } else if (this.__interface) {
        var b = c.__interfaces;
        if (b && b.contains(this)) return true;
        var a = c.__baseType;
        while (a) {
            b = a.__interfaces;
            if (b && b.contains(this)) return true;
            a = a.__baseType
        }
    }
    return false
};
Type.isClass = function(a) {
    return a.__class == true
};
Type.isEnum = function(a) {
    return a.__enum == true
};
Type.isFlags = function(a) {
    return a.__enum == true && a.__flags == true
};
Type.isInterface = function(a) {
    return a.__interface == true
};
Type.isNamespace = function(a) {
    return a.__namespace == true
};
Type.canCast = function(a, b) {
    return b.isInstanceOfType(a)
};
Type.safeCast = function(a, b) {
    return b.isInstanceOfType(a) ? a : null
};
Type.getInstanceType = function(b) {
    var a = null;
    try {
        a = b.constructor
    } catch (c) {}
    if (!a || !a.__typeName) a = Object;
    return a
};
Type.getType = function(a) {
    if (!a) return null;
    if (!Type.__typeCache) Type.__typeCache = {};
    var b = Type.__typeCache[a];
    if (!b) {
        b = eval(a);
        Type.__typeCache[a] = b
    }
    return b
};
Type.parse = function(a) {
    return Type.getType(a)
};
ss.Delegate = function() {};
ss.Delegate.registerClass("Delegate");
ss.Delegate.empty = function() {};
ss.Delegate._contains = function(b, d, c) {
    for (var a = 0; a < b.length; a += 2)
        if (b[a] === d && b[a + 1] === c) return true;
    return false
};
ss.Delegate._create = function(a) {
    var b = function() {
        if (a.length == 2) return a[1].apply(a[0], arguments);
        else {
            for (var c = a.clone(), b = 0; b < c.length; b += 2) ss.Delegate._contains(a, c[b], c[b + 1]) && c[b + 1].apply(c[b], arguments);
            return null
        }
    };
    b._targets = a;
    return b
};
ss.Delegate.create = function(b, a) {
    return !b ? a : ss.Delegate._create([b, a])
};
ss.Delegate.combine = function(a, b) {
    if (!a) return !b._targets ? ss.Delegate.create(null, b) : b;
    if (!b) return !a._targets ? ss.Delegate.create(null, a) : a;
    var c = a._targets ? a._targets : [null, a],
        d = b._targets ? b._targets : [null, b];
    return ss.Delegate._create(c.concat(d))
};
ss.Delegate.remove = function(c, a) {
    if (!c || c === a) return null;
    if (!a) return c;
    var b = c._targets,
        f = null,
        e;
    if (a._targets) {
        f = a._targets[0];
        e = a._targets[1]
    } else e = a;
    for (var d = 0; d < b.length; d += 2)
        if (b[d] === f && b[d + 1] === e) {
            if (b.length == 2) return null;
            b.splice(d, 2);
            return ss.Delegate._create(b)
        } return c
};
ss.Delegate.createExport = function(b, c, a) {
    a = a || "__" + (new Date).valueOf();
    window[a] = c ? b : function() {
        try {
            delete window[a]
        } catch (c) {
            window[a] = undefined
        }
        b.apply(null, arguments)
    };
    return a
};
ss.Delegate.deleteExport = function(a) {
    delete window[a]
};
ss.Delegate.clearExport = function(a) {
    window[a] = ss.Delegate.empty
};
ss.CultureInfo = function(c, a, b) {
    this.name = c;
    this.numberFormat = a;
    this.dateFormat = b
};
ss.CultureInfo.registerClass("CultureInfo");
ss.CultureInfo.InvariantCulture = new ss.CultureInfo("en-US", {
    naNSymbol: "NaN",
    negativeSign: "-",
    positiveSign: "+",
    negativeInfinityText: "-Infinity",
    positiveInfinityText: "Infinity",
    percentSymbol: "%",
    percentGroupSizes: [3],
    percentDecimalDigits: 2,
    percentDecimalSeparator: ".",
    percentGroupSeparator: ",",
    percentPositivePattern: "{0} %",
    percentNegativePattern: "-{0} %",
    currencySymbol: "$",
    currencyGroupSizes: [3],
    currencyDecimalDigits: 2,
    currencyDecimalSeparator: ".",
    currencyGroupSeparator: ",",
    currencyNegativePattern: "(${0})",
    currencyPositivePattern: "${0}",
    numberGroupSizes: [3],
    numberDecimalDigits: 2,
    numberDecimalSeparator: ".",
    numberGroupSeparator: ","
}, {
    amDesignator: "AM",
    pmDesignator: "PM",
    dateSeparator: "/",
    timeSeparator: ":",
    gmtDateTimePattern: "ddd, dd MMM yyyy HH:mm:ss 'GMT'",
    universalDateTimePattern: "yyyy-MM-dd HH:mm:ssZ",
    sortableDateTimePattern: "yyyy-MM-ddTHH:mm:ss",
    dateTimePattern: "dddd, MMMM dd, yyyy h:mm:ss tt",
    longDatePattern: "dddd, MMMM dd, yyyy",
    shortDatePattern: "MM/DD/YYYY",
    longTimePattern: "h:mm:ss tt",
    shortTimePattern: "h:mm tt",
    firstDayOfWeek: 0,
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    minimizedDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
    shortMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]
});
ss.CultureInfo.CurrentCulture = ss.CultureInfo.InvariantCulture;
ss.IEnumerator = function() {};
ss.IEnumerator.getEnumerator = function(a) {
    return a ? a.getEnumerator ? a.getEnumerator() : new ss.ArrayEnumerator(a) : null
};
ss.IEnumerator.registerInterface("IEnumerator");
ss.IEnumerable = function() {};
ss.IEnumerable.registerInterface("IEnumerable");
ss.ArrayEnumerator = function(a) {
    this._array = a;
    this._index = -1;
    this.current = null
};
ss.ArrayEnumerator.prototype = {
    moveNext: function() {
        this._index++;
        this.current = this._array[this._index];
        return this._index < this._array.length
    },
    reset: function() {
        this._index = -1;
        this.current = null
    }
};
ss.ArrayEnumerator.registerClass("ArrayEnumerator", null, ss.IEnumerator);
ss.IDisposable = function() {};
ss.IDisposable.registerInterface("IDisposable");
ss.StringBuilder = function(a) {
    this._parts = ss.isNullOrUndefined(a) || a === "" ? [] : [a];
    this.isEmpty = this._parts.length == 0
};
ss.StringBuilder.prototype = {
    append: function(a) {
        if (!ss.isNullOrUndefined(a) && a !== "") {
            this._parts.add(a);
            this.isEmpty = false
        }
        return this
    },
    appendLine: function(a) {
        this.append(a);
        this.append("\r\n");
        this.isEmpty = false;
        return this
    },
    clear: function() {
        this._parts = [];
        this.isEmpty = true
    },
    toString: function(a) {
        return this._parts.join(a || "")
    }
};
ss.StringBuilder.registerClass("StringBuilder");
ss.EventArgs = function() {};
ss.EventArgs.registerClass("EventArgs");
ss.EventArgs.Empty = new ss.EventArgs;
ss.CancelEventArgs = function() {
    ss.CancelEventArgs.initializeBase(this);
    this.cancel = false
};
ss.CancelEventArgs.registerClass("CancelEventArgs", ss.EventArgs);
ss.Tuple = function(b, a, c) {
    this.first = b;
    this.second = a;
    if (arguments.length == 3) this.third = c
};
ss.Tuple.registerClass("Tuple");
ss.Observable = function(a) {
    this._v = a;
    this._observers = null
};
ss.Observable.prototype = {
    getValue: function() {
        this._observers = ss.Observable._captureObservers(this._observers);
        return this._v
    },
    setValue: function(b) {
        if (this._v !== b) {
            this._v = b;
            var a = this._observers;
            if (a) {
                this._observers = null;
                ss.Observable._invalidateObservers(a)
            }
        }
    }
};
ss.Observable._observerStack = [];
ss.Observable._observerRegistration = {
    dispose: function() {
        ss.Observable._observerStack.pop()
    }
};
ss.Observable.registerObserver = function(a) {
    ss.Observable._observerStack.push(a);
    return ss.Observable._observerRegistration
};
ss.Observable._captureObservers = function(a) {
    var c = ss.Observable._observerStack,
        d = c.length;
    if (d) {
        a = a || [];
        for (var b = 0; b < d; b++) {
            var e = c[b];
            !a.contains(e) && a.push(e)
        }
        return a
    }
    return null
};
ss.Observable._invalidateObservers = function(b) {
    for (var a = 0, c = b.length; a < c; a++) b[a].invalidateObserver()
};
ss.Observable.registerClass("Observable");
ss.ObservableCollection = function(a) {
    this._items = a || [];
    this._observers = null
};
ss.ObservableCollection.prototype = {
    get_item: function(a) {
        this._observers = ss.Observable._captureObservers(this._observers);
        return this._items[a]
    },
    set_item: function(a, b) {
        this._items[a] = b;
        this._updated()
    },
    get_length: function() {
        this._observers = ss.Observable._captureObservers(this._observers);
        return this._items.length
    },
    add: function(a) {
        this._items.push(a);
        this._updated()
    },
    clear: function() {
        this._items.clear();
        this._updated()
    },
    contains: function(a) {
        return this._items.contains(a)
    },
    getEnumerator: function() {
        this._observers = ss.Observable._captureObservers(this._observers);
        return this._items.getEnumerator()
    },
    indexOf: function(a) {
        return this._items.indexOf(a)
    },
    insert: function(a, b) {
        this._items.insert(a, b);
        this._updated()
    },
    remove: function(a) {
        if (this._items.remove(a)) {
            this._updated();
            return true
        }
        return false
    },
    removeAt: function(a) {
        this._items.removeAt(a);
        this._updated()
    },
    toArray: function() {
        return this._items
    },
    _updated: function() {
        var a = this._observers;
        if (a) {
            this._observers = null;
            ss.Observable._invalidateObservers(a)
        }
    }
};
ss.ObservableCollection.registerClass("ObservableCollection", null, ss.IEnumerable);
ss.Task = function(a) {
    this._continuations = ss.isValue(a) ? (this.status = "done", null) : (this.status = "pending", []);
    this.result = a;
    this.error = null
};
ss.Task.prototype = {
    get_completed: function() {
        return this.status != "pending"
    },
    continueWith: function(a) {
        if (this._continuations) this._continuations.push(a);
        else {
            var b = this;
            setTimeout(function() {
                a(b)
            }, 0)
        }
        return this
    },
    done: function(a) {
        return this.continueWith(function(b) {
            b.status == "done" && a(b.result)
        })
    },
    fail: function(a) {
        return this.continueWith(function(b) {
            b.status == "failed" && a(b.error)
        })
    },
    then: function(a, b) {
        return this.continueWith(function(c) {
            c.status == "done" ? a(c.result) : b(c.error)
        })
    },
    _update: function(d, c) {
        if (this.status == "pending") {
            if (c) {
                this.error = c;
                this.status = "failed"
            } else {
                this.result = d;
                this.status = "done"
            }
            var b = this._continuations;
            this._continuations = null;
            for (var a = 0, e = b.length; a < e; a++) b[a](this)
        }
    }
};
ss.Task._join = function(a, g) {
    a = Array.toArray(a);
    var c = a.length,
        d = 0;
    if (c > 1 && typeof a[0] == "number") {
        d = a[0];
        a = a.slice(1);
        c--
    }
    var b = new ss.Task,
        f = 0;

    function h(a) {
        if (b.status == "pending") {
            f++;
            if (g) b._update(a);
            else f == c && b._update(true)
        }
    }

    function i() {
        if (b.status == "pending")
            if (g) b._update(null);
            else b._update(false)
    }
    d != 0 && setTimeout(i, d);
    for (var e = 0; e < c; e++) a[e].continueWith(h);
    return b
};
ss.Task.all = function() {
    return ss.Task._join(arguments, false)
};
ss.Task.any = function() {
    return ss.Task._join(arguments, true)
};
ss.Task.delay = function(b) {
    var a = new ss.Task;
    setTimeout(function() {
        a._update(true)
    }, b);
    return a
};
ss.Deferred = function(a) {
    this.task = new ss.Task(a)
};
ss.Deferred.prototype = {
    resolve: function(a) {
        this.task._update(a)
    },
    reject: function(a) {
        this.task._update(null, a || new Error)
    }
};
ss.Deferred.registerClass("Deferred");
ss.Task.registerClass("Task");
ss.IApplication = function() {};
ss.IApplication.registerInterface("IApplication");
ss.IContainer = function() {};
ss.IContainer.registerInterface("IContainer");
ss.IObjectFactory = function() {};
ss.IObjectFactory.registerInterface("IObjectFactory");
ss.IEventManager = function() {};
ss.IEventManager.registerInterface("IEventManager");
ss.IInitializable = function() {};
ss.IInitializable.registerInterface("IInitializable")