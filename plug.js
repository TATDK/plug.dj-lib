(function () {
    var a = !1,
        b = /xyz/.test(function () {
            xyz
        }) ? /\b_super\b/ : /.*/;
    this.Class = function () {};
    Class.extend = function (c) {
        function d() {
            !a && this.init && this.init.apply(this, arguments)
        }
        var e = this.prototype;
        a = !0;
        var f = new this;
        a = !1;
        for (var g in c) f[g] = "function" == typeof c[g] && "function" == typeof e[g] && b.test(c[g]) ? function (a, b) {
            return function () {
                var c = this._super;
                this._super = e[a];
                var d = b.apply(this, arguments);
                this._super = c;
                return d
            }
        }(g, c[g]) : c[g];
        d.prototype = f;
        d.prototype.constructor = d;
        d.extend = arguments.callee;
        return d
    }
})();
var Utilities = Class.extend({
    init: function () {
        this.DateUtils = new DateUtilities
    },
    commafy: function (a) {
        return ("" + a).replace(/(^|[^\w.])(\d{4,})/g, function (a, c, d) {
            return c + d.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,")
        })
    },
    formatTime: function (a, b) {
        if (isNaN(a)) return (b ? "0" : "") + "0:00";
        var a = Math.ceil(a),
            c = "" + ~~ (a / 60 / 60),
            d;
        "0" != c ? (d = "" + (~~ (a / 60) - 60 * Number(c)), b = !0) : d = "" + ~~ (a / 60);
        1 == d.length && (d = (b ? "0" : "") + d);
        var e = "" + a % 60;
        1 == e.length && (e = "0" + e);
        return "0" == c ? d + ":" + e : c + ":" + d + ":" + e
    },
    getSecondsElapsed: function (a) {
        return !a ? 0 : this.DateUtils.secondsSince(new Date(Number(a.substr(0, a.indexOf(",")))))
    },
    toHex: function (a) {
        a = a.toString(16).toUpperCase();
        return "0x" + "00000000".substr(0, 8 - a.length) + a
    },
    convertNumberStringToUnixDateString: function (a) {
        var b = a.split(","),
            a = new Date(Number(b[0])),
            b = b[1] || "0";
        10 == b.length && (b = b.substr(4));
        var c = "" + (a.getMonth() + 1);
        1 == c.length && (c = "0" + c);
        var d = "" + a.getDate();
        1 == d.length && (d = "0" + d);
        var e = "" + a.getHours();
        1 == e.length && (e = "0" + e);
        var f = "" + a.getMinutes();
        1 == f.length && (f = "0" + f);
        var g = "" + a.getSeconds();
        1 == g.length && (g = "0" + g);
        return !("NaN" == c || "NaN" == d || "NaN" == e || "NaN" == f || "NaN" == g) ? a.getFullYear() + "-" + c + "-" + d + " " + e + ":" + f + ":" + g + "." + b : "0"
    },
    convertUnixDateStringToNumberString: function (a) {
        try {
            if (a) {
                var b = "" + (new Date(a.substr(0, 4), Number(a.substr(5, 2)) - 1, a.substr(8, 2), a.substr(11, 2), a.substr(14, 2), a.substr(17, 2))).getTime(),
                    c = "000000",
                    d = a.substr(20, 6),
                    c = c.substr(d.length, 6) + d;
                return b + ",0000" + c
            }
        } catch (e) {
            console.log("ConvertUnixDate", e)
        }
        return "0"
    },
    convertUnixDateStringToDate: function (a) {
        return a ? new Date(a.substr(0,
        4), Number(a.substr(5, 2)) - 1, a.substr(8, 2), a.substr(11, 2), a.substr(14, 2), a.substr(17, 2)) : null
    },
    convertDateToNumberString: function (a) {
        if (!a) return "0";
        var b = "" + (a.getMonth() + 1);
        1 == b.length && (b = "0" + b);
        var c = "" + a.getDate();
        1 == c.length && (c = "0" + c);
        var d = "" + a.getHours();
        1 == d.length && (d = "0" + d);
        var e = "" + a.getMinutes();
        1 == e.length && (e = "0" + e);
        var f = "" + a.getSeconds();
        1 == f.length && (f = "0" + f);
        return a.getFullYear() + "-" + b + "-" + c + " " + d + ":" + e + ":" + f + ".000000"
    },
    getSimpleTimestamp: function () {
        return this.convertDateToNumberString(new Date).split(".").shift().split(" ").pop()
    },
    getChatTimestamp: function (a) {
        var b = new Date,
            c = "" + b.getMinutes();
        1 == c.length && (c = "0" + c);
        a ? (b = "" + b.getHours(), 1 == b.length && (b = "0" + b), c = b + ":" + c) : (a = "am", b = b.getHours(), 12 < b ? (b -= 12, a = "pm") : 0 == b && (b = 12), c = b + ":" + c + a);
        return c
    },
    convertTimestampToReadableDate: function (a, b) {
        var c = Number(a.split(",")[0]),
            d = new Date(c),
            e = this.DateUtils.monthsSince(d),
            f = this.DateUtils.daysSince(d),
            c = "",
            g = "ja" != Models.user.data.language && -1 == Models.user.data.language.indexOf("zh") ? " " : "";
        if (1 < e || 1 == e && 30 <= f) return c = 1 < e ? Lang.history.months : Lang.history.month, c = e + g + c, b ? Lang.history.ago.split("%TIME%").join(c) : c;
        e = this.DateUtils.hoursSince(d);
        if (1 < f || 1 == f && 24 <= e) return c = 1 < f ? Lang.history.days : Lang.history.day, c = f + g + c, b ? Lang.history.ago.split("%TIME%").join(c) : c;
        f = this.DateUtils.minutesSince(d);
        if (1 < e || 1 == e && 60 <= f) return c = 1 < e ? Lang.history.hours : Lang.history.hour, c = e + g + c, b ? Lang.history.ago.split("%TIME%").join(c) : c;
        d = Math.max(this.DateUtils.secondsSince(d), 0);
        if (1 < f || 1 == f && 60 <= d) return c = 1 < f ? Lang.history.minutes : Lang.history.minute, c = f + g + c, b ? Lang.history.ago.split("%TIME%").join(c) : c;
        c = 1 < d ? Lang.history.seconds : Lang.history.second;
        c = d + g + c;
        return b ? Lang.history.ago.split("%TIME%").join(c) : c
    },
    validateIncomingURL: function (a) {
        if (a) {
            var b; - 1 < a.indexOf("youtube.com") && -1 < a.indexOf("v=") ? b = this.cleanYouTubeURL(a) : -1 < a.indexOf("youtu.be") ? b = this.cleanYouTubeURL("http://www.youtube.com/watch?v=" + a.split("/").pop()) : -1 < a.indexOf("soundcloud.com") && (b = a);
            return !b ? null : -1 == b.indexOf("#") ? b : "" + b.split("#")[0]
        }
        return null
    },
    cleanYouTubeURL: function (a) {
        return a.replace(/(.+?)[\#\!|\?].*?v=(.+?)(\&.*|\Z)/,
            "$1?v=$2")
    },
    cleanString: function (a) {
        return a.replace(/[\u25c4]/g, "")
    },
    cleanTypedString: function (a) {
        return a.split("<").join("&lt;").split(">").join("&gt;")
    },
    authorTitle: function (a) {
        if (a) {
            var b = "",
                c = a,
                d = a.indexOf(" - ");
            if (-1 < d) b = a.substr(0, d), c = a.substr(d + 3);
            else if (d = a.indexOf("-"), -1 < d) b = a.substr(0, d), c = a.substr(d + 1);
            else if (d = a.indexOf(' "'), -1 < d) {
                var e = a.indexOf('"', d + 2); - 1 < e && (b = a.substr(0, d), c = a.substring(d + 2, e))
            }
            b = this.cleanString(b);
            c = this.cleanString(c);
            return {
                author: b,
                title: c
            }
        }
        return {
            author: null,
            title: null
        }
    },
    clone: function (a) {
        var b = {}, c;
        for (c in a) b[c] = a[c];
        return b
    },
    deserializeModified: function (a) {
        a.modified = this.convertUnixDateStringToNumberString(a.modified)
    },
    deserializeHistoryItem: function (a) {
        a.timestamp = this.convertUnixDateStringToNumberString(a.timestamp);
        a.cid = a.id
    },
    serializeMediaItems: function (a) {
        for (var b = [], c = a.length, d = {}, e = 0; e < c; ++e) a[e].id ? d[a[e].id] || (d[a[e].id] = !0, b.push(a[e].id)) : b.push({
            id: 0,
            format: a[e].format,
            cid: a[e].cid,
            author: a[e].author,
            title: a[e].title,
            image: a[e].image,
            duration: a[e].duration
        });
        return b
    },
    quadEaseOut: function (a, b, c, d) {
        a /= d;
        return -c * a * (a - 2) + b
    },
    quadEaseIn: function (a, b, c, d) {
        a /= d;
        return c * a * a + b
    },
    randomizeArray: function (a) {
        var b = [].concat(a),
            c = new Rndm;
        try {
            for (var d = b.length - 1, e = d + 1; --e;) {
                var f = c.integer(0, e + 1);
                f > d && (f = d);
                var g = b[e];
                b[e] = b[f];
                b[f] = g
            }
            return b
        } catch (h) {
            return this.randomizeArray(a)
        }
    },
    hexToRGB: function (a) {
        "#" == a[0] && (a = a.substr(1));
        if (3 == a.length) for (var b = a, a = "", b = /^([a-f0-9])([a-f0-9])([a-f0-9])$/i.exec(b).slice(1), c = 0; 3 > c; c++) a += b[c] + b[c];
        a = /^([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i.exec(a).slice(1);
        return {
            red: parseInt(a[0], 16),
            green: parseInt(a[1], 16),
            blue: parseInt(a[2], 16)
        }
    },
    pointWithinRect: function (a, b) {
        return a.x >= b.x && a.y >= b.y && a.x < b.x + b.w && a.y <= b.y + b.h
    },
    forceRefresh: function () {
        window.location.reload()
    }
}),
    DateUtilities = Class.extend({
        init: function () {
            this.MONTHS = "January,February,March,April,May,June,July,August,September,October,November,December".split(",");
            this.SERVER_TIME = null;
            this.OFFSET = 0
        },
        setServerTime: function (a) {
            this.SERVER_TIME = a;
            this.OFFSET = this.SERVER_TIME.getTime() - (new Date).getTime()
        },
        yearsSince: function (a) {
            return this.GAEDate().getFullYear() - a.getFullYear()
        },
        monthsSince: function (a) {
            var b = this.GAEDate();
            return 12 * (b.getFullYear() - a.getFullYear()) + (b.getMonth() - a.getMonth())
        },
        daysSince: function (a) {
            var b = this.GAEDate(),
                c = b.getTime(),
                d = a.getTime(),
                a = (c - d) / 864E5,
                c = (c - d) % 864E5 / 864E5;
            0 < c && 864E5 * c > 1E3 * this.secondsSinceMidnight(b) && a++;
            return~~a
        },
        hoursSince: function (a) {
            return~~ ((this.GAEDate().getTime() - a.getTime()) / 36E5)
        },
        minutesSince: function (a) {
            return~~ ((this.GAEDate().getTime() - a.getTime()) / 6E4)
        },
        secondsSince: function (a) {
            return~~ ((this.GAEDate().getTime() - a.getTime()) / 1E3)
        },
        monthName: function (a, b) {
            var c = this.MONTHS[a.getMonth()];
            return b ? c : c.substr(0, 3)
        },
        secondsSinceMidnight: function (a) {
            var b = new Date(a.getTime());
            this.midnight(b);
            return~~ ((a.getTime() - b.getTime()) / 1E3)
        },
        midnight: function (a) {
            a.setHours(0);
            a.setMinutes(0);
            a.setSeconds(0);
            a.setMilliseconds(0)
        },
        minutesUntil: function (a) {
            return~~ ((a.getTime() - this.GAEDate().getTime()) / 6E4)
        },
        millisecondsUntil: function (a) {
            console.log(" media = " + a.getTime());
            console.log("server = " + this.GAEDate().getTime());
            return a.getTime() - this.GAEDate().getTime()
        },
        GAEDate: function () {
            return new Date((new Date).getTime() + this.OFFSET)
        }
    });
Rndm = Class.extend({
    init: function () {
        this.newSeed()
    },
    newSeed: function () {
        this.seed = ~~ (2147483646 * Math.random())
    },
    "double": function () {
        return this.gen() / 2147483647
    },
    integer: function (a, b) {
        a -= 0.4999;
        return Math.round(a + (b + 0.4999 - a) * this.double())
    },
    "float": function (a, b) {
        return a + (b - a) * this.double()
    },
    gen: function () {
        return this.seed = 16807 * this.seed % 2147483647
    }
});

function getParameterByName(a) {
    a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    a = RegExp("[\\?&]" + a + "=([^&#]*)").exec(window.location.search);
    return null == a ? "" : decodeURIComponent(a[1].replace(/\+/g, " "))
}
function checkBrowser() {
    return !0
}
var RPCGateway = Class.extend({
    async: !0,
    init: function (a) {
        this.url = a;
        "/" != this.url.charAt(this.url.length - 1) && (this.url += "/")
    },
    execute: function (a, b) {
        var c = Array.prototype.slice.call(arguments).slice(2);
        $.ajax({
            url: this.url + a.replace(/\//g, "_"),
            type: "POST",
            data: JSON.stringify({
                service: a,
                body: c
            }),
            async: this.async,
            dataType: "json",
            contentType: "application/json",
            success: function (a) {
                if (999 == a.status) if (b) b.onFault(a.body);
                else console.log("RPC returned a fault status but there was no responder", a);
                else if (b) b.onResult({
                    status: a.status,
                    data: a.body
                })
            },
            error: function (a, c, f) {
                console.log(a);
                console.log(c);
                console.log(f);
                if (b) b.onServerError(a)
            }
        })
    }
});
(function () {
    var a = !1,
        b = /xyz/.test(function () {
            xyz
        }) ? /\b_super\b/ : /.*/;
    this.Class = function () {};
    Class.extend = function (c) {
        function d() {
            !a && this.init && this.init.apply(this, arguments)
        }
        var e = this.prototype;
        a = !0;
        var f = new this;
        a = !1;
        for (var g in c) f[g] = "function" == typeof c[g] && "function" == typeof e[g] && b.test(c[g]) ? function (a, b) {
            return function () {
                var c = this._super;
                this._super = e[a];
                var d = b.apply(this, arguments);
                this._super = c;
                return d
            }
        }(g, c[g]) : c[g];
        d.prototype = f;
        d.prototype.constructor = d;
        d.extend = arguments.callee;
        return d
    }
})();
var EventDispatcher = Class.extend({
    init: function () {
        this.__events = {}
    },
    addEventListener: function (a, b) {
        this.__events[a] = this.__events[a] || [];
        this.__events[a].unshift(b)
    },
    removeEventListener: function (a, b) {
        if (this.__events[a]) for (var c = this.__events[a], d = c.length; d--;) if (c[d] === b) return c.splice(d, 1), !0;
        return !1
    },
    dispatchEvent: function (a, b) {
        if (this.__events[a]) for (var c = this.__events[a].length; c--;) this.__events[a][c](b)
    }
});