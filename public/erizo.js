if (function(e, t) {
        e.version = "0.9.6", e.protocol = 1, e.transports = [], e.j = [], e.sockets = {}, e.connect = function(n, o) {
            var i, r, a = e.util.parseUri(n);
            t && t.location && (a.protocol = a.protocol || t.location.protocol.slice(0, -1), a.host = a.host || (t.document ? t.document.domain : t.location.hostname), a.port = a.port || t.location.port), i = e.util.uniqueUri(a);
            var s = {
                host: a.host,
                secure: "https" == a.protocol,
                port: a.port || ("https" == a.protocol ? 443 : 80),
                query: a.query || ""
            };
            return e.util.merge(s, o), (s["force new connection"] || !e.sockets[i]) && (r = new e.Socket(s)), !s["force new connection"] && r && (e.sockets[i] = r), r = r || e.sockets[i], r.of(1 < a.path.length ? a.path : "")
        }
    }("object" == typeof module ? module.exports : this.io = {}, this), function(e, t) {
        var n = e.util = {},
            o = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
            i = "source,protocol,authority,userInfo,user,password,host,port,relative,path,directory,file,query,anchor".split(",");
        n.parseUri = function(e) {
            for (var e = o.exec(e || ""), t = {}, n = 14; n--;) t[i[n]] = e[n] || "";
            return t
        }, n.uniqueUri = function(e) {
            var n = e.protocol,
                o = e.host,
                e = e.port;
            return "document" in t ? (o = o || document.domain, e = e || ("https" == n && "https:" !== document.location.protocol ? 443 : document.location.port)) : (o = o || "localhost", !e && "https" == n && (e = 443)), (n || "http") + "://" + o + ":" + (e || 80)
        }, n.query = function(e, t) {
            var o = n.chunkQuery(e || ""),
                i = [];
            n.merge(o, n.chunkQuery(t || ""));
            for (var r in o) o.hasOwnProperty(r) && i.push(r + "=" + o[r]);
            return i.length ? "?" + i.join("&") : ""
        }, n.chunkQuery = function(e) {
            for (var t, n = {}, e = e.split("&"), o = 0, i = e.length; i > o; ++o) t = e[o].split("="), t[0] && (n[t[0]] = t[1]);
            return n
        };
        var r = !1;
        n.load = function(e) {
            return "document" in t && "complete" === document.readyState || r ? e() : void n.on(t, "load", e, !1)
        }, n.on = function(e, t, n, o) {
            e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener && e.addEventListener(t, n, o)
        }, n.request = function(e) {
            if (e && "undefined" != typeof XDomainRequest) return new XDomainRequest;
            if ("undefined" != typeof XMLHttpRequest && (!e || n.ua.hasCORS)) return new XMLHttpRequest;
            if (!e) try {
                return new(window[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
            } catch (t) {}
            return null
        }, "undefined" != typeof window && n.load(function() {
            r = !0
        }), n.defer = function(e) {
            return n.ua.webkit && "undefined" == typeof importScripts ? void n.load(function() {
                setTimeout(e, 100)
            }) : e()
        }, n.merge = function(e, t, o, i) {
            var r, i = i || [],
                o = "undefined" == typeof o ? 2 : o;
            for (r in t) t.hasOwnProperty(r) && 0 > n.indexOf(i, r) && ("object" == typeof e[r] && o ? n.merge(e[r], t[r], o - 1, i) : (e[r] = t[r], i.push(t[r])));
            return e
        }, n.mixin = function(e, t) {
            n.merge(e.prototype, t.prototype)
        }, n.inherit = function(e, t) {
            function n() {}
            n.prototype = t.prototype, e.prototype = new n
        }, n.isArray = Array.isArray || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }, n.intersect = function(e, t) {
            for (var o = [], i = e.length > t.length ? e : t, r = e.length > t.length ? t : e, a = 0, s = r.length; s > a; a++) ~n.indexOf(i, r[a]) && o.push(r[a]);
            return o
        }, n.indexOf = function(e, t, n) {
            for (var o = e.length, n = 0 > n ? 0 > n + o ? 0 : n + o : n || 0; o > n && e[n] !== t; n++);
            return n >= o ? -1 : n
        }, n.toArray = function(e) {
            for (var t = [], n = 0, o = e.length; o > n; n++) t.push(e[n]);
            return t
        }, n.ua = {}, n.ua.hasCORS = "undefined" != typeof XMLHttpRequest && function() {
            try {
                var e = new XMLHttpRequest
            } catch (t) {
                return !1
            }
            return void 0 != e.withCredentials
        }(), n.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent)
    }("undefined" != typeof io ? io : module.exports, this), function(e, t) {
        function n() {}
        e.EventEmitter = n, n.prototype.on = function(e, n) {
            return this.$events || (this.$events = {}), this.$events[e] ? t.util.isArray(this.$events[e]) ? this.$events[e].push(n) : this.$events[e] = [this.$events[e], n] : this.$events[e] = n, this
        }, n.prototype.addListener = n.prototype.on, n.prototype.once = function(e, t) {
            function n() {
                o.removeListener(e, n), t.apply(this, arguments)
            }
            var o = this;
            return n.listener = t, this.on(e, n), this
        }, n.prototype.removeListener = function(e, n) {
            if (this.$events && this.$events[e]) {
                var o = this.$events[e];
                if (t.util.isArray(o)) {
                    for (var i = -1, r = 0, a = o.length; a > r; r++)
                        if (o[r] === n || o[r].listener && o[r].listener === n) {
                            i = r;
                            break
                        }
                    if (0 > i) return this;
                    o.splice(i, 1), o.length || delete this.$events[e]
                } else(o === n || o.listener && o.listener === n) && delete this.$events[e]
            }
            return this
        }, n.prototype.removeAllListeners = function(e) {
            return this.$events && this.$events[e] && (this.$events[e] = null), this
        }, n.prototype.listeners = function(e) {
            return this.$events || (this.$events = {}), this.$events[e] || (this.$events[e] = []), t.util.isArray(this.$events[e]) || (this.$events[e] = [this.$events[e]]), this.$events[e]
        }, n.prototype.emit = function(e) {
            if (!this.$events) return !1;
            var n = this.$events[e];
            if (!n) return !1;
            var o = Array.prototype.slice.call(arguments, 1);
            if ("function" == typeof n) n.apply(this, o);
            else {
                if (!t.util.isArray(n)) return !1;
                for (var n = n.slice(), i = 0, r = n.length; r > i; i++) n[i].apply(this, o)
            }
            return !0
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(b, a) {
        function c(e) {
            return 10 > e ? "0" + e : e
        }

        function d(e) {
            return j.lastIndex = 0, j.test(e) ? '"' + e.replace(j, function(e) {
                var t = k[e];
                return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }

        function e(t, n) {
            var o, i, r, a, s, u = f,
                l = n[t];
            switch (l instanceof Date && (l = isFinite(t.valueOf()) ? t.getUTCFullYear() + "-" + c(t.getUTCMonth() + 1) + "-" + c(t.getUTCDate()) + "T" + c(t.getUTCHours()) + ":" + c(t.getUTCMinutes()) + ":" + c(t.getUTCSeconds()) + "Z" : null), "function" == typeof m && (l = m.call(n, t, l)), typeof l) {
                case "string":
                    return d(l);
                case "number":
                    return isFinite(l) ? "" + l : "null";
                case "boolean":
                case "null":
                    return "" + l;
                case "object":
                    if (!l) return "null";
                    if (f += h, s = [], "[object Array]" === Object.prototype.toString.apply(l)) {
                        for (a = l.length, o = 0; a > o; o += 1) s[o] = e(o, l) || "null";
                        return r = 0 === s.length ? "[]" : f ? "[\n" + f + s.join(",\n" + f) + "\n" + u + "]" : "[" + s.join(",") + "]", f = u, r
                    }
                    if (m && "object" == typeof m)
                        for (a = m.length, o = 0; a > o; o += 1) "string" == typeof m[o] && (i = m[o], (r = e(i, l)) && s.push(d(i) + (f ? ": " : ":") + r));
                    else
                        for (i in l) Object.prototype.hasOwnProperty.call(l, i) && (r = e(i, l)) && s.push(d(i) + (f ? ": " : ":") + r);
                    return r = 0 === s.length ? "{}" : f ? "{\n" + f + s.join(",\n" + f) + "\n" + u + "}" : "{" + s.join(",") + "}", f = u, r
            }
        }
        if (a && a.parse) return b.JSON = {
            parse: a.parse,
            stringify: a.stringify
        };
        var g = b.JSON = {},
            i = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            j = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            f, h, k = {
                "\b": "\\b",
                "   ": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            m;
        g.stringify = function(t, n, o) {
            var i;
            if (h = f = "", "number" == typeof o)
                for (i = 0; o > i; i += 1) h += " ";
            else "string" == typeof o && (h = o);
            if ((m = n) && "function" != typeof n && ("object" != typeof n || "number" != typeof n.length)) throw Error("JSON.stringify");
            return e("", {
                "": t
            })
        }, g.parse = function(a, b) {
            function f(e, t) {
                var n, o, i = e[t];
                if (i && "object" == typeof i)
                    for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (o = f(i, n), void 0 !== o ? i[n] = o : delete i[n]);
                return b.call(e, t, i)
            }
            var h, a = "" + a;
            if (i.lastIndex = 0, i.test(a) && (a = a.replace(i, function(e) {
                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return h = eval("(" + a + ")"), "function" == typeof b ? f({
                "": h
            }, "") : h;
            throw new SyntaxError("JSON.parse")
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof JSON ? JSON : void 0), function(e, t) {
        var n = e.parser = {},
            o = n.packets = "disconnect,connect,heartbeat,message,json,event,ack,error,noop".split(","),
            i = n.reasons = ["transport not supported", "client not handshaken", "unauthorized"],
            r = n.advice = ["reconnect"],
            a = t.JSON,
            s = t.util.indexOf;
        n.encodePacket = function(e) {
            var t = s(o, e.type),
                n = e.id || "",
                c = e.endpoint || "",
                d = e.ack,
                u = null;
            switch (e.type) {
                case "error":
                    var l = e.reason ? s(i, e.reason) : "",
                        e = e.advice ? s(r, e.advice) : "";
                    ("" !== l || "" !== e) && (u = l + ("" !== e ? "+" + e : ""));
                    break;
                case "message":
                    "" !== e.data && (u = e.data);
                    break;
                case "event":
                    u = {
                        name: e.name
                    }, e.args && e.args.length && (u.args = e.args), u = a.stringify(u);
                    break;
                case "json":
                    u = a.stringify(e.data);
                    break;
                case "connect":
                    e.qs && (u = e.qs);
                    break;
                case "ack":
                    u = e.ackId + (e.args && e.args.length ? "+" + a.stringify(e.args) : "")
            }
            return t = [t, n + ("data" == d ? "+" : ""), c], null !== u && void 0 !== u && t.push(u), t.join(":")
        }, n.encodePayload = function(e) {
            var t = "";
            if (1 == e.length) return e[0];
            for (var n = 0, o = e.length; o > n; n++) t += "�" + e[n].length + "�" + e[n];
            return t
        };
        var c = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
        n.decodePacket = function(e) {
            var t = e.match(c);
            if (!t) return {};
            var n = t[2] || "",
                e = t[5] || "",
                s = {
                    type: o[t[1]],
                    endpoint: t[4] || ""
                };
            switch (n && (s.id = n, s.ack = t[3] ? "data" : !0), s.type) {
                case "error":
                    t = e.split("+"), s.reason = i[t[0]] || "", s.advice = r[t[1]] || "";
                    break;
                case "message":
                    s.data = e || "";
                    break;
                case "event":
                    try {
                        var d = a.parse(e);
                        s.name = d.name, s.args = d.args
                    } catch (u) {}
                    s.args = s.args || [];
                    break;
                case "json":
                    try {
                        s.data = a.parse(e)
                    } catch (l) {}
                    break;
                case "connect":
                    s.qs = e || "";
                    break;
                case "ack":
                    if ((t = e.match(/^([0-9]+)(\+)?(.*)/)) && (s.ackId = t[1], s.args = [], t[3])) try {
                        s.args = t[3] ? a.parse(t[3]) : []
                    } catch (p) {}
            }
            return s
        }, n.decodePayload = function(e) {
            if ("�" == e.charAt(0)) {
                for (var t = [], o = 1, i = ""; o < e.length; o++) "�" == e.charAt(o) ? (t.push(n.decodePacket(e.substr(o + 1).substr(0, i))), o += Number(i) + 1, i = "") : i += e.charAt(o);
                return t
            }
            return [n.decodePacket(e)]
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(e, t) {
        function n(e, t) {
            this.socket = e, this.sessid = t
        }
        e.Transport = n, t.util.mixin(n, t.EventEmitter), n.prototype.onData = function(e) {
            if (this.clearCloseTimeout(), (this.socket.connected || this.socket.connecting || this.socket.reconnecting) && this.setCloseTimeout(), "" !== e && (e = t.parser.decodePayload(e)) && e.length)
                for (var n = 0, o = e.length; o > n; n++) this.onPacket(e[n]);
            return this
        }, n.prototype.onPacket = function(e) {
            return this.socket.setHeartbeatTimeout(), "heartbeat" == e.type ? this.onHeartbeat() : ("connect" == e.type && "" == e.endpoint && this.onConnect(), "error" == e.type && "reconnect" == e.advice && (this.open = !1), this.socket.onPacket(e), this)
        }, n.prototype.setCloseTimeout = function() {
            if (!this.closeTimeout) {
                var e = this;
                this.closeTimeout = setTimeout(function() {
                    e.onDisconnect()
                }, this.socket.closeTimeout)
            }
        }, n.prototype.onDisconnect = function() {
            return this.close && this.open && this.close(), this.clearTimeouts(), this.socket.onDisconnect(), this
        }, n.prototype.onConnect = function() {
            return this.socket.onConnect(), this
        }, n.prototype.clearCloseTimeout = function() {
            this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = null)
        }, n.prototype.clearTimeouts = function() {
            this.clearCloseTimeout(), this.reopenTimeout && clearTimeout(this.reopenTimeout)
        }, n.prototype.packet = function(e) {
            this.send(t.parser.encodePacket(e))
        }, n.prototype.onHeartbeat = function() {
            this.packet({
                type: "heartbeat"
            })
        }, n.prototype.onOpen = function() {
            this.open = !0, this.clearCloseTimeout(), this.socket.onOpen()
        }, n.prototype.onClose = function() {
            this.open = !1, this.socket.onClose(), this.onDisconnect()
        }, n.prototype.prepareUrl = function() {
            var e = this.socket.options;
            return this.scheme() + "://" + e.host + ":" + e.port + "/" + e.resource + "/" + t.protocol + "/" + this.name + "/" + this.sessid
        }, n.prototype.ready = function(e, t) {
            t.call(this)
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(e, t, n) {
        function o(e) {
            if (this.options = {
                    port: 80,
                    secure: !1,
                    document: "document" in n ? document : !1,
                    resource: "socket.io",
                    transports: t.transports,
                    "connect timeout": 1e4,
                    "try multiple transports": !0,
                    reconnect: !0,
                    "reconnection delay": 500,
                    "reconnection limit": 1 / 0,
                    "reopen delay": 3e3,
                    "max reconnection attempts": 10,
                    "sync disconnect on unload": !0,
                    "auto connect": !0,
                    "flash policy port": 10843
                }, t.util.merge(this.options, e), this.reconnecting = this.connecting = this.open = this.connected = !1, this.namespaces = {}, this.buffer = [], this.doBuffer = !1, this.options["sync disconnect on unload"] && (!this.isXDomain() || t.util.ua.hasCORS)) {
                var o = this;
                t.util.on(n, "unload", function() {
                    o.disconnectSync()
                }, !1)
            }
            this.options["auto connect"] && this.connect()
        }

        function i() {}
        e.Socket = o, t.util.mixin(o, t.EventEmitter), o.prototype.of = function(e) {
            return this.namespaces[e] || (this.namespaces[e] = new t.SocketNamespace(this, e), "" !== e && this.namespaces[e].packet({
                type: "connect"
            })), this.namespaces[e]
        }, o.prototype.publish = function() {
            this.emit.apply(this, arguments);
            var e, t;
            for (t in this.namespaces) this.namespaces.hasOwnProperty(t) && (e = this.of(t), e.$emit.apply(e, arguments))
        }, o.prototype.handshake = function(e) {
            function n(t) {
                t instanceof Error ? o.onError(t.message) : e.apply(null, t.split(":"))
            }
            var o = this,
                r = this.options,
                r = ["http" + (r.secure ? "s" : "") + ":/", r.host + ":" + r.port, r.resource, t.protocol, t.util.query(this.options.query, "t=" + +new Date)].join("/");
            if (this.isXDomain() && !t.util.ua.hasCORS) {
                var a = document.getElementsByTagName("script")[0],
                    s = document.createElement("script");
                s.src = r + "&jsonp=" + t.j.length, a.parentNode.insertBefore(s, a), t.j.push(function(e) {
                    n(e), s.parentNode.removeChild(s)
                })
            } else {
                var c = t.util.request();
                c.open("GET", r, !0), c.withCredentials = !0, c.onreadystatechange = function() {
                    4 == c.readyState && (c.onreadystatechange = i, 200 == c.status ? n(c.responseText) : !o.reconnecting && o.onError(c.responseText))
                }, c.send(null)
            }
        }, o.prototype.getTransport = function(e) {
            for (var n, e = e || this.transports, o = 0; n = e[o]; o++)
                if (t.Transport[n] && t.Transport[n].check(this) && (!this.isXDomain() || t.Transport[n].xdomainCheck())) return new t.Transport[n](this, this.sessionid);
            return null
        }, o.prototype.connect = function(e) {
            if (this.connecting) return this;
            var n = this;
            return this.handshake(function(o, i, r, a) {
                function s(e) {
                    return n.transport && n.transport.clearTimeouts(), n.transport = n.getTransport(e), n.transport ? void n.transport.ready(n, function() {
                        n.connecting = !0, n.publish("connecting", n.transport.name), n.transport.open(), n.options["connect timeout"] && (n.connectTimeoutTimer = setTimeout(function() {
                            if (!n.connected && (n.connecting = !1, n.options["try multiple transports"])) {
                                n.remainingTransports || (n.remainingTransports = n.transports.slice(0));
                                for (var e = n.remainingTransports; 0 < e.length && e.splice(0, 1)[0] != n.transport.name;);
                                e.length ? s(e) : n.publish("connect_failed")
                            }
                        }, n.options["connect timeout"]))
                    }) : n.publish("connect_failed")
                }
                n.sessionid = o, n.closeTimeout = 1e3 * r, n.heartbeatTimeout = 1e3 * i, n.transports = a ? t.util.intersect(a.split(","), n.options.transports) : n.options.transports, n.setHeartbeatTimeout(), s(n.transports), n.once("connect", function() {
                    clearTimeout(n.connectTimeoutTimer), e && "function" == typeof e && e()
                })
            }), this
        }, o.prototype.setHeartbeatTimeout = function() {
            clearTimeout(this.heartbeatTimeoutTimer);
            var e = this;
            this.heartbeatTimeoutTimer = setTimeout(function() {
                e.transport.onClose()
            }, this.heartbeatTimeout)
        }, o.prototype.packet = function(e) {
            return this.connected && !this.doBuffer ? this.transport.packet(e) : this.buffer.push(e), this
        }, o.prototype.setBuffer = function(e) {
            this.doBuffer = e, !e && this.connected && this.buffer.length && (this.transport.payload(this.buffer), this.buffer = [])
        }, o.prototype.disconnect = function() {
            return (this.connected || this.connecting) && (this.open && this.of("").packet({
                type: "disconnect"
            }), this.onDisconnect("booted")), this
        }, o.prototype.disconnectSync = function() {
            t.util.request().open("GET", this.resource + "/" + t.protocol + "/" + this.sessionid, !0), this.onDisconnect("booted")
        }, o.prototype.isXDomain = function() {
            var e = n.location.port || ("https:" == n.location.protocol ? 443 : 80);
            return this.options.host !== n.location.hostname || this.options.port != e
        }, o.prototype.onConnect = function() {
            this.connected || (this.connected = !0, this.connecting = !1, this.doBuffer || this.setBuffer(!1), this.emit("connect"))
        }, o.prototype.onOpen = function() {
            this.open = !0
        }, o.prototype.onClose = function() {
            this.open = !1, clearTimeout(this.heartbeatTimeoutTimer)
        }, o.prototype.onPacket = function(e) {
            this.of(e.endpoint).onPacket(e)
        }, o.prototype.onError = function(e) {
            e && e.advice && "reconnect" === e.advice && (this.connected || this.connecting) && (this.disconnect(), this.options.reconnect && this.reconnect()), this.publish("error", e && e.reason ? e.reason : e)
        }, o.prototype.onDisconnect = function(e) {
            var t = this.connected,
                n = this.connecting;
            this.open = this.connecting = this.connected = !1, (t || n) && (this.transport.close(), this.transport.clearTimeouts(), t && (this.publish("disconnect", e), "booted" != e && this.options.reconnect && !this.reconnecting && this.reconnect()))
        }, o.prototype.reconnect = function() {
            function e() {
                if (n.connected) {
                    for (var e in n.namespaces) n.namespaces.hasOwnProperty(e) && "" !== e && n.namespaces[e].packet({
                        type: "connect"
                    });
                    n.publish("reconnect", n.transport.name, n.reconnectionAttempts)
                }
                clearTimeout(n.reconnectionTimer), n.removeListener("connect_failed", t), n.removeListener("connect", t), n.reconnecting = !1, delete n.reconnectionAttempts, delete n.reconnectionDelay, delete n.reconnectionTimer, delete n.redoTransports, n.options["try multiple transports"] = i
            }

            function t() {
                if (n.reconnecting) {
                    if (n.connected) return e();
                    if (n.connecting && n.reconnecting) return n.reconnectionTimer = setTimeout(t, 1e3);
                    n.reconnectionAttempts++ >= o ? n.redoTransports ? (n.publish("reconnect_failed"), e()) : (n.on("connect_failed", t), n.options["try multiple transports"] = !0, n.transport = n.getTransport(), n.redoTransports = !0, n.connect()) : (n.reconnectionDelay < r && (n.reconnectionDelay *= 2), n.connect(), n.publish("reconnecting", n.reconnectionDelay, n.reconnectionAttempts), n.reconnectionTimer = setTimeout(t, n.reconnectionDelay))
                }
            }
            this.reconnecting = !0, this.reconnectionAttempts = 0, this.reconnectionDelay = this.options["reconnection delay"];
            var n = this,
                o = this.options["max reconnection attempts"],
                i = this.options["try multiple transports"],
                r = this.options["reconnection limit"];
            this.options["try multiple transports"] = !1, this.reconnectionTimer = setTimeout(t, this.reconnectionDelay), this.on("connect", t)
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(e, t) {
        function n(e, t) {
            this.socket = e, this.name = t || "", this.flags = {}, this.json = new o(this, "json"), this.ackPackets = 0, this.acks = {}
        }

        function o(e, t) {
            this.namespace = e, this.name = t
        }
        e.SocketNamespace = n, t.util.mixin(n, t.EventEmitter), n.prototype.$emit = t.EventEmitter.prototype.emit, n.prototype.of = function() {
            return this.socket.of.apply(this.socket, arguments)
        }, n.prototype.packet = function(e) {
            return e.endpoint = this.name, this.socket.packet(e), this.flags = {}, this
        }, n.prototype.send = function(e, t) {
            var n = {
                type: this.flags.json ? "json" : "message",
                data: e
            };
            return "function" == typeof t && (n.id = ++this.ackPackets, n.ack = !0, this.acks[n.id] = t), this.packet(n)
        }, n.prototype.emit = function(e) {
            var t = Array.prototype.slice.call(arguments, 1),
                n = t[t.length - 1],
                o = {
                    type: "event",
                    name: e
                };
            return "function" == typeof n && (o.id = ++this.ackPackets, o.ack = "data", this.acks[o.id] = n, t = t.slice(0, t.length - 1)), o.args = t, this.packet(o)
        }, n.prototype.disconnect = function() {
            return "" === this.name ? this.socket.disconnect() : (this.packet({
                type: "disconnect"
            }), this.$emit("disconnect")), this
        }, n.prototype.onPacket = function(e) {
            function n() {
                o.packet({
                    type: "ack",
                    args: t.util.toArray(arguments),
                    ackId: e.id
                })
            }
            var o = this;
            switch (e.type) {
                case "connect":
                    this.$emit("connect");
                    break;
                case "disconnect":
                    "" === this.name ? this.socket.onDisconnect(e.reason || "booted") : this.$emit("disconnect", e.reason);
                    break;
                case "message":
                case "json":
                    var i = ["message", e.data];
                    "data" == e.ack ? i.push(n) : e.ack && this.packet({
                        type: "ack",
                        ackId: e.id
                    }), this.$emit.apply(this, i);
                    break;
                case "event":
                    i = [e.name].concat(e.args), "data" == e.ack && i.push(n), this.$emit.apply(this, i);
                    break;
                case "ack":
                    this.acks[e.ackId] && (this.acks[e.ackId].apply(this, e.args), delete this.acks[e.ackId]);
                    break;
                case "error":
                    e.advice ? this.socket.onError(e) : "unauthorized" == e.reason ? this.$emit("connect_failed", e.reason) : this.$emit("error", e.reason)
            }
        }, o.prototype.send = function() {
            this.namespace.flags[this.name] = !0, this.namespace.send.apply(this.namespace, arguments)
        }, o.prototype.emit = function() {
            this.namespace.flags[this.name] = !0, this.namespace.emit.apply(this.namespace, arguments)
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(e, t, n) {
        function o(e) {
            t.Transport.apply(this, arguments)
        }
        e.websocket = o, t.util.inherit(o, t.Transport), o.prototype.name = "websocket", o.prototype.open = function() {
            var e, o = t.util.query(this.socket.options.query),
                i = this;
            return e || (e = n.MozWebSocket || n.WebSocket), this.websocket = new e(this.prepareUrl() + o), this.websocket.onopen = function() {
                i.onOpen(), i.socket.setBuffer(!1)
            }, this.websocket.onmessage = function(e) {
                i.onData(e.data)
            }, this.websocket.onclose = function() {
                i.onClose(), i.socket.setBuffer(!0)
            }, this.websocket.onerror = function(e) {
                i.onError(e)
            }, this
        }, o.prototype.send = function(e) {
            return this.websocket.send(e), this
        }, o.prototype.payload = function(e) {
            for (var t = 0, n = e.length; n > t; t++) this.packet(e[t]);
            return this
        }, o.prototype.close = function() {
            return this.websocket.close(), this
        }, o.prototype.onError = function(e) {
            this.socket.onError(e)
        }, o.prototype.scheme = function() {
            return this.socket.options.secure ? "wss" : "ws"
        }, o.check = function() {
            return "WebSocket" in n && !("__addTask" in WebSocket) || "MozWebSocket" in n
        }, o.xdomainCheck = function() {
            return !0
        }, t.transports.push("websocket")
    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(e, t) {
        function n() {
            t.Transport.websocket.apply(this, arguments)
        }
        e.flashsocket = n, t.util.inherit(n, t.Transport.websocket), n.prototype.name = "flashsocket", n.prototype.open = function() {
            var e = this,
                n = arguments;
            return WebSocket.__addTask(function() {
                t.Transport.websocket.prototype.open.apply(e, n)
            }), this
        }, n.prototype.send = function() {
            var e = this,
                n = arguments;
            return WebSocket.__addTask(function() {
                t.Transport.websocket.prototype.send.apply(e, n)
            }), this
        }, n.prototype.close = function() {
            return WebSocket.__tasks.length = 0, t.Transport.websocket.prototype.close.call(this), this
        }, n.prototype.ready = function(e, o) {
            function i() {
                var t = e.options,
                    i = t["flash policy port"],
                    a = ["http" + (t.secure ? "s" : "") + ":/", t.host + ":" + t.port, t.resource, "static/flashsocket", "WebSocketMain" + (e.isXDomain() ? "Insecure" : "") + ".swf"];
                n.loaded || ("undefined" == typeof WEB_SOCKET_SWF_LOCATION && (WEB_SOCKET_SWF_LOCATION = a.join("/")), 843 !== i && WebSocket.loadFlashPolicyFile("xmlsocket://" + t.host + ":" + i), WebSocket.__initialize(), n.loaded = !0), o.call(r)
            }
            var r = this;
            return document.body ? i() : void t.util.load(i)
        }, n.check = function() {
            return "undefined" != typeof WebSocket && "__initialize" in WebSocket && swfobject ? 10 <= swfobject.getFlashPlayerVersion().major : !1
        }, n.xdomainCheck = function() {
            return !0
        }, "undefined" != typeof window && (WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = !0), t.transports.push("flashsocket")
    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports), "undefined" != typeof window) var swfobject = function() {
    function e() {
        if (!R) {
            try {
                var e = T.getElementsByTagName("body")[0].appendChild(T.createElement("span"));
                e.parentNode.removeChild(e)
            } catch (t) {
                return
            }
            R = !0;
            for (var e = W.length, n = 0; e > n; n++) W[n]()
        }
    }

    function t(e) {
        R ? e() : W[W.length] = e
    }

    function n(e) {
        if (typeof I.addEventListener != L) I.addEventListener("load", e, !1);
        else if (typeof T.addEventListener != L) T.addEventListener("load", e, !1);
        else if (typeof I.attachEvent != L) f(I, "onload", e);
        else if ("function" == typeof I.onload) {
            var t = I.onload;
            I.onload = function() {
                t(), e()
            }
        } else I.onload = e
    }

    function o() {
        var e = T.getElementsByTagName("body")[0],
            t = T.createElement(C);
        t.setAttribute("type", x);
        var n = e.appendChild(t);
        if (n) {
            var o = 0;
            ! function() {
                if (typeof n.GetVariable != L) {
                    var r = n.GetVariable("$version");
                    r && (r = r.split(" ")[1].split(","), j.pv = [parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10)])
                } else if (10 > o) return o++, void setTimeout(arguments.callee, 10);
                e.removeChild(t), n = null, i()
            }()
        } else i()
    }

    function i() {
        var e = z.length;
        if (e > 0)
            for (var t = 0; e > t; t++) {
                var n = z[t].id,
                    o = z[t].callbackFn,
                    i = {
                        success: !1,
                        id: n
                    };
                if (0 < j.pv[0]) {
                    var d = p(n);
                    if (d)
                        if (!m(z[t].swfVersion) || j.wk && 312 > j.wk)
                            if (z[t].expressInstall && a()) {
                                i = {}, i.data = z[t].expressInstall, i.width = d.getAttribute("width") || "0", i.height = d.getAttribute("height") || "0", d.getAttribute("class") && (i.styleclass = d.getAttribute("class")), d.getAttribute("align") && (i.align = d.getAttribute("align"));
                                for (var u = {}, d = d.getElementsByTagName("param"), l = d.length, f = 0; l > f; f++) "movie" != d[f].getAttribute("name").toLowerCase() && (u[d[f].getAttribute("name")] = d[f].getAttribute("value"));
                                s(i, u, n, o)
                            } else c(d), o && o(i);
                    else g(n, !0), o && (i.success = !0, i.ref = r(n), o(i))
                } else g(n, !0), o && ((n = r(n)) && typeof n.SetVariable != L && (i.success = !0, i.ref = n), o(i))
            }
    }

    function r(e) {
        var t = null;
        return (e = p(e)) && "OBJECT" == e.nodeName && (typeof e.SetVariable != L ? t = e : (e = e.getElementsByTagName(C)[0]) && (t = e)), t
    }

    function a() {
        return !N && m("6.0.65") && (j.win || j.mac) && !(j.wk && 312 > j.wk)
    }

    function s(e, t, n, o) {
        N = !0, S = o || null, k = {
            success: !1,
            id: n
        };
        var i = p(n);
        i && ("OBJECT" == i.nodeName ? (y = d(i), b = null) : (y = i, b = n), e.id = A, (typeof e.width == L || !/%$/.test(e.width) && 310 > parseInt(e.width, 10)) && (e.width = "310"), (typeof e.height == L || !/%$/.test(e.height) && 137 > parseInt(e.height, 10)) && (e.height = "137"), T.title = T.title.slice(0, 47) + " - Flash Player Installation", o = j.ie && j.win ? ["Active"].concat("").join("X") : "PlugIn", o = "MMredirectURL=" + I.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + o + "&MMdoctitle=" + T.title, t.flashvars = typeof t.flashvars != L ? t.flashvars + ("&" + o) : o, j.ie && j.win && 4 != i.readyState && (o = T.createElement("div"), n += "SWFObjectNew", o.setAttribute("id", n), i.parentNode.insertBefore(o, i), i.style.display = "none", function() {
            4 == i.readyState ? i.parentNode.removeChild(i) : setTimeout(arguments.callee, 10)
        }()), u(e, t, n))
    }

    function c(e) {
        if (j.ie && j.win && 4 != e.readyState) {
            var t = T.createElement("div");
            e.parentNode.insertBefore(t, e), t.parentNode.replaceChild(d(e), t), e.style.display = "none",
                function() {
                    4 == e.readyState ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10)
                }()
        } else e.parentNode.replaceChild(d(e), e)
    }

    function d(e) {
        var t = T.createElement("div");
        if (j.win && j.ie) t.innerHTML = e.innerHTML;
        else if ((e = e.getElementsByTagName(C)[0]) && (e = e.childNodes))
            for (var n = e.length, o = 0; n > o; o++) !(1 == e[o].nodeType && "PARAM" == e[o].nodeName) && 8 != e[o].nodeType && t.appendChild(e[o].cloneNode(!0));
        return t
    }

    function u(e, t, n) {
        var o, i = p(n);
        if (j.wk && 312 > j.wk) return o;
        if (i)
            if (typeof e.id == L && (e.id = n), j.ie && j.win) {
                var r, a = "";
                for (r in e) e[r] != Object.prototype[r] && ("data" == r.toLowerCase() ? t.movie = e[r] : "styleclass" == r.toLowerCase() ? a += ' class="' + e[r] + '"' : "classid" != r.toLowerCase() && (a += " " + r + '="' + e[r] + '"'));
                r = "";
                for (var s in t) t[s] != Object.prototype[s] && (r += '<param name="' + s + '" value="' + t[s] + '" />');
                i.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + a + ">" + r + "</object>", B[B.length] = e.id, o = p(e.id)
            } else {
                s = T.createElement(C), s.setAttribute("type", x);
                for (var c in e) e[c] != Object.prototype[c] && ("styleclass" == c.toLowerCase() ? s.setAttribute("class", e[c]) : "classid" != c.toLowerCase() && s.setAttribute(c, e[c]));
                for (a in t) t[a] != Object.prototype[a] && "movie" != a.toLowerCase() && (e = s, r = a, c = t[a], n = T.createElement("param"), n.setAttribute("name", r), n.setAttribute("value", c), e.appendChild(n));
                i.parentNode.replaceChild(s, i), o = s
            }
        return o
    }

    function l(e) {
        var t = p(e);
        t && "OBJECT" == t.nodeName && (j.ie && j.win ? (t.style.display = "none", function() {
            if (4 == t.readyState) {
                var n = p(e);
                if (n) {
                    for (var o in n) "function" == typeof n[o] && (n[o] = null);
                    n.parentNode.removeChild(n)
                }
            } else setTimeout(arguments.callee, 10)
        }()) : t.parentNode.removeChild(t))
    }

    function p(e) {
        var t = null;
        try {
            t = T.getElementById(e)
        } catch (n) {}
        return t
    }

    function f(e, t, n) {
        e.attachEvent(t, n), O[O.length] = [e, t, n]
    }

    function m(e) {
        var t = j.pv,
            e = e.split(".");
        return e[0] = parseInt(e[0], 10), e[1] = parseInt(e[1], 10) || 0, e[2] = parseInt(e[2], 10) || 0, t[0] > e[0] || t[0] == e[0] && t[1] > e[1] || t[0] == e[0] && t[1] == e[1] && t[2] >= e[2] ? !0 : !1
    }

    function h(e, t, n, o) {
        if (!j.ie || !j.mac) {
            var i = T.getElementsByTagName("head")[0];
            i && (n = n && "string" == typeof n ? n : "screen", o && (E = w = null), w && E == n || (o = T.createElement("style"), o.setAttribute("type", "text/css"), o.setAttribute("media", n), w = i.appendChild(o), j.ie && j.win && typeof T.styleSheets != L && 0 < T.styleSheets.length && (w = T.styleSheets[T.styleSheets.length - 1]), E = n), j.ie && j.win ? w && typeof w.addRule == C && w.addRule(e, t) : w && typeof T.createTextNode != L && w.appendChild(T.createTextNode(e + " {" + t + "}")))
        }
    }

    function g(e, t) {
        if (V) {
            var n = t ? "visible" : "hidden";
            R && p(e) ? p(e).style.visibility = n : h("#" + e, "visibility:" + n)
        }
    }

    function v(e) {
        return null != /[\\\"<>\.;]/.exec(e) && typeof encodeURIComponent != L ? encodeURIComponent(e) : e
    }
    var y, b, S, k, w, E, L = "undefined",
        C = "object",
        x = "application/x-shockwave-flash",
        A = "SWFObjectExprInst",
        I = window,
        T = document,
        D = navigator,
        _ = !1,
        W = [function() {
            _ ? o() : i()
        }],
        z = [],
        B = [],
        O = [],
        R = !1,
        N = !1,
        V = !0,
        j = function() {
            var e = typeof T.getElementById != L && typeof T.getElementsByTagName != L && typeof T.createElement != L,
                t = D.userAgent.toLowerCase(),
                n = D.platform.toLowerCase(),
                o = n ? /win/.test(n) : /win/.test(t),
                n = n ? /mac/.test(n) : /mac/.test(t),
                t = /webkit/.test(t) ? parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
                i = !1,
                r = [0, 0, 0],
                a = null;
            if (typeof D.plugins != L && typeof D.plugins["Shockwave Flash"] == C) !(a = D.plugins["Shockwave Flash"].description) || typeof D.mimeTypes != L && D.mimeTypes[x] && !D.mimeTypes[x].enabledPlugin || (_ = !0, i = !1, a = a.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), r[0] = parseInt(a.replace(/^(.*)\..*$/, "$1"), 10), r[1] = parseInt(a.replace(/^.*\.(.*)\s.*$/, "$1"), 10), r[2] = /[a-zA-Z]/.test(a) ? parseInt(a.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
            else if (typeof I[["Active"].concat("Object").join("X")] != L) try {
                var s = new(window[["Active"].concat("Object").join("X")])("ShockwaveFlash.ShockwaveFlash");
                s && (a = s.GetVariable("$version")) && (i = !0, a = a.split(" ")[1].split(","), r = [parseInt(a[0], 10), parseInt(a[1], 10), parseInt(a[2], 10)])
            } catch (c) {}
            return {
                w3: e,
                pv: r,
                wk: t,
                ie: i,
                win: o,
                mac: n
            }
        }();
    return function() {
            j.w3 && ((typeof T.readyState != L && "complete" == T.readyState || typeof T.readyState == L && (T.getElementsByTagName("body")[0] || T.body)) && e(), R || (typeof T.addEventListener != L && T.addEventListener("DOMContentLoaded", e, !1), j.ie && j.win && (T.attachEvent("onreadystatechange", function() {
                "complete" == T.readyState && (T.detachEvent("onreadystatechange", arguments.callee), e())
            }), I == top && function() {
                if (!R) {
                    try {
                        T.documentElement.doScroll("left")
                    } catch (t) {
                        return void setTimeout(arguments.callee, 0)
                    }
                    e()
                }
            }()), j.wk && function() {
                R || (/loaded|complete/.test(T.readyState) ? e() : setTimeout(arguments.callee, 0))
            }(), n(e)))
        }(),
        function() {
            j.ie && j.win && window.attachEvent("onunload", function() {
                for (var e = O.length, t = 0; e > t; t++) O[t][0].detachEvent(O[t][1], O[t][2]);
                for (e = B.length, t = 0; e > t; t++) l(B[t]);
                for (var n in j) j[n] = null;
                j = null;
                for (var o in swfobject) swfobject[o] = null;
                swfobject = null
            })
        }(), {
            registerObject: function(e, t, n, o) {
                if (j.w3 && e && t) {
                    var i = {};
                    i.id = e, i.swfVersion = t, i.expressInstall = n, i.callbackFn = o, z[z.length] = i, g(e, !1)
                } else o && o({
                    success: !1,
                    id: e
                })
            },
            getObjectById: function(e) {
                return j.w3 ? r(e) : void 0
            },
            embedSWF: function(e, n, o, i, r, c, d, l, p, f) {
                var h = {
                    success: !1,
                    id: n
                };
                j.w3 && !(j.wk && 312 > j.wk) && e && n && o && i && r ? (g(n, !1), t(function() {
                    o += "", i += "";
                    var t = {};
                    if (p && typeof p === C)
                        for (var v in p) t[v] = p[v];
                    if (t.data = e, t.width = o, t.height = i, v = {}, l && typeof l === C)
                        for (var y in l) v[y] = l[y];
                    if (d && typeof d === C)
                        for (var b in d) v.flashvars = typeof v.flashvars != L ? v.flashvars + ("&" + b + "=" + d[b]) : b + "=" + d[b];
                    if (m(r)) y = u(t, v, n), t.id == n && g(n, !0), h.success = !0, h.ref = y;
                    else {
                        if (c && a()) return t.data = c, void s(t, v, n, f);
                        g(n, !0)
                    }
                    f && f(h)
                })) : f && f(h)
            },
            switchOffAutoHideShow: function() {
                V = !1
            },
            ua: j,
            getFlashPlayerVersion: function() {
                return {
                    major: j.pv[0],
                    minor: j.pv[1],
                    release: j.pv[2]
                }
            },
            hasFlashPlayerVersion: m,
            createSWF: function(e, t, n) {
                return j.w3 ? u(e, t, n) : void 0
            },
            showExpressInstall: function(e, t, n, o) {
                j.w3 && a() && s(e, t, n, o)
            },
            removeSWF: function(e) {
                j.w3 && l(e)
            },
            createCSS: function(e, t, n, o) {
                j.w3 && h(e, t, n, o)
            },
            addDomLoadEvent: t,
            addLoadEvent: n,
            getQueryParamValue: function(e) {
                var t = T.location.search || T.location.hash;
                if (t) {
                    if (/\?/.test(t) && (t = t.split("?")[1]), null == e) return v(t);
                    for (var t = t.split("&"), n = 0; n < t.length; n++)
                        if (t[n].substring(0, t[n].indexOf("=")) == e) return v(t[n].substring(t[n].indexOf("=") + 1))
                }
                return ""
            },
            expressInstallCallback: function() {
                if (N) {
                    var e = p(A);
                    e && y && (e.parentNode.replaceChild(y, e), b && (g(b, !0), j.ie && j.win && (y.style.display = "block")), S && S(k)), N = !1
                }
            }
        }
}();
! function() {
    if ("undefined" != typeof window && !window.WebSocket) {
        var e = window.console;
        e && e.log && e.error || (e = {
            log: function() {},
            error: function() {}
        }), swfobject.hasFlashPlayerVersion("10.0.0") ? ("file:" == location.protocol && e.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."), WebSocket = function(e, t, n, o, i) {
            var r = this;
            r.__id = WebSocket.__nextId++,
                WebSocket.__instances[r.__id] = r, r.readyState = WebSocket.CONNECTING, r.bufferedAmount = 0, r.__events = {}, t ? "string" == typeof t && (t = [t]) : t = [], setTimeout(function() {
                    WebSocket.__addTask(function() {
                        WebSocket.__flash.create(r.__id, e, t, n || null, o || 0, i || null)
                    })
                }, 0)
        }, WebSocket.prototype.send = function(e) {
            if (this.readyState == WebSocket.CONNECTING) throw "INVALID_STATE_ERR: Web Socket connection has not been established";
            return e = WebSocket.__flash.send(this.__id, encodeURIComponent(e)), 0 > e ? !0 : (this.bufferedAmount += e, !1)
        }, WebSocket.prototype.close = function() {
            this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING || (this.readyState = WebSocket.CLOSING, WebSocket.__flash.close(this.__id))
        }, WebSocket.prototype.addEventListener = function(e, t) {
            e in this.__events || (this.__events[e] = []), this.__events[e].push(t)
        }, WebSocket.prototype.removeEventListener = function(e, t) {
            if (e in this.__events)
                for (var n = this.__events[e], o = n.length - 1; o >= 0; --o)
                    if (n[o] === t) {
                        n.splice(o, 1);
                        break
                    }
        }, WebSocket.prototype.dispatchEvent = function(e) {
            for (var t = this.__events[e.type] || [], n = 0; n < t.length; ++n) t[n](e);
            (t = this["on" + e.type]) && t(e)
        }, WebSocket.prototype.__handleEvent = function(e) {
            if ("readyState" in e && (this.readyState = e.readyState), "protocol" in e && (this.protocol = e.protocol), "open" == e.type || "error" == e.type) e = this.__createSimpleEvent(e.type);
            else if ("close" == e.type) e = this.__createSimpleEvent("close");
            else {
                if ("message" != e.type) throw "unknown event type: " + e.type;
                e = this.__createMessageEvent("message", decodeURIComponent(e.message))
            }
            this.dispatchEvent(e)
        }, WebSocket.prototype.__createSimpleEvent = function(e) {
            if (document.createEvent && window.Event) {
                var t = document.createEvent("Event");
                return t.initEvent(e, !1, !1), t
            }
            return {
                type: e,
                bubbles: !1,
                cancelable: !1
            }
        }, WebSocket.prototype.__createMessageEvent = function(e, t) {
            if (document.createEvent && window.MessageEvent && !window.opera) {
                var n = document.createEvent("MessageEvent");
                return n.initMessageEvent("message", !1, !1, t, null, null, window, null), n
            }
            return {
                type: e,
                data: t,
                bubbles: !1,
                cancelable: !1
            }
        }, WebSocket.CONNECTING = 0, WebSocket.OPEN = 1, WebSocket.CLOSING = 2, WebSocket.CLOSED = 3, WebSocket.__flash = null, WebSocket.__instances = {}, WebSocket.__tasks = [], WebSocket.__nextId = 0, WebSocket.loadFlashPolicyFile = function(e) {
            WebSocket.__addTask(function() {
                WebSocket.__flash.loadManualPolicyFile(e)
            })
        }, WebSocket.__initialize = function() {
            if (!WebSocket.__flash)
                if (WebSocket.__swfLocation && (window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation), window.WEB_SOCKET_SWF_LOCATION) {
                    var t = document.createElement("div");
                    t.id = "webSocketContainer", t.style.position = "absolute", WebSocket.__isFlashLite() ? (t.style.left = "0px", t.style.top = "0px") : (t.style.left = "-100px", t.style.top = "-100px");
                    var n = document.createElement("div");
                    n.id = "webSocketFlash", t.appendChild(n), document.body.appendChild(t), swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, {
                        hasPriority: !0,
                        swliveconnect: !0,
                        allowScriptAccess: "always"
                    }, null, function(t) {
                        t.success || e.error("[WebSocket] swfobject.embedSWF failed")
                    })
                } else e.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf")
        }, WebSocket.__onFlashInitialized = function() {
            setTimeout(function() {
                WebSocket.__flash = document.getElementById("webSocketFlash"), WebSocket.__flash.setCallerUrl(location.href), WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
                for (var e = 0; e < WebSocket.__tasks.length; ++e) WebSocket.__tasks[e]();
                WebSocket.__tasks = []
            }, 0)
        }, WebSocket.__onFlashEvent = function() {
            return setTimeout(function() {
                try {
                    for (var t = WebSocket.__flash.receiveEvents(), n = 0; n < t.length; ++n) WebSocket.__instances[t[n].webSocketId].__handleEvent(t[n])
                } catch (o) {
                    e.error(o)
                }
            }, 0), !0
        }, WebSocket.__log = function(t) {
            e.log(decodeURIComponent(t))
        }, WebSocket.__error = function(t) {
            e.error(decodeURIComponent(t))
        }, WebSocket.__addTask = function(e) {
            WebSocket.__flash ? e() : WebSocket.__tasks.push(e)
        }, WebSocket.__isFlashLite = function() {
            if (!window.navigator || !window.navigator.mimeTypes) return !1;
            var e = window.navigator.mimeTypes["application/x-shockwave-flash"];
            return e && e.enabledPlugin && e.enabledPlugin.filename && e.enabledPlugin.filename.match(/flashlite/i) ? !0 : !1
        }, window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION || (window.addEventListener ? window.addEventListener("load", function() {
            WebSocket.__initialize()
        }, !1) : window.attachEvent("onload", function() {
            WebSocket.__initialize()
        }))) : e.error("Flash Player >= 10.0.0 is required.")
    }
}(),
function(e, t, n) {
    function o(e) {
        e && (t.Transport.apply(this, arguments), this.sendBuffer = [])
    }

    function i() {}
    e.XHR = o, t.util.inherit(o, t.Transport), o.prototype.open = function() {
        return this.socket.setBuffer(!1), this.onOpen(), this.get(), this.setCloseTimeout(), this
    }, o.prototype.payload = function(e) {
        for (var n = [], o = 0, i = e.length; i > o; o++) n.push(t.parser.encodePacket(e[o]));
        this.send(t.parser.encodePayload(n))
    }, o.prototype.send = function(e) {
        return this.post(e), this
    }, o.prototype.post = function(e) {
        function t() {
            4 == this.readyState && (this.onreadystatechange = i, r.posting = !1, 200 == this.status ? r.socket.setBuffer(!1) : r.onClose())
        }

        function o() {
            this.onload = i, r.socket.setBuffer(!1)
        }
        var r = this;
        this.socket.setBuffer(!0), this.sendXHR = this.request("POST"), n.XDomainRequest && this.sendXHR instanceof XDomainRequest ? this.sendXHR.onload = this.sendXHR.onerror = o : this.sendXHR.onreadystatechange = t, this.sendXHR.send(e)
    }, o.prototype.close = function() {
        return this.onClose(), this
    }, o.prototype.request = function(e) {
        var n = t.util.request(this.socket.isXDomain()),
            o = t.util.query(this.socket.options.query, "t=" + +new Date);
        if (n.open(e || "GET", this.prepareUrl() + o, !0), "POST" == e) try {
            n.setRequestHeader ? n.setRequestHeader("Content-type", "text/plain;charset=UTF-8") : n.contentType = "text/plain"
        } catch (i) {}
        return n
    }, o.prototype.scheme = function() {
        return this.socket.options.secure ? "https" : "http"
    }, o.check = function(e, o) {
        try {
            var i = t.util.request(o),
                r = n.XDomainRequest && i instanceof XDomainRequest,
                a = (e && e.options && e.options.secure ? "https:" : "http:") != n.location.protocol;
            if (i && (!r || !a)) return !0
        } catch (s) {}
        return !1
    }, o.xdomainCheck = function() {
        return o.check(null, !0)
    }
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this),
function(e, t) {
    function n(e) {
        t.Transport.XHR.apply(this, arguments)
    }
    e.htmlfile = n, t.util.inherit(n, t.Transport.XHR), n.prototype.name = "htmlfile", n.prototype.get = function() {
        this.doc = new(window[["Active"].concat("Object").join("X")])("htmlfile"), this.doc.open(), this.doc.write("<html></html>"), this.doc.close(), this.doc.parentWindow.s = this;
        var e = this.doc.createElement("div");
        e.className = "socketio", this.doc.body.appendChild(e), this.iframe = this.doc.createElement("iframe"), e.appendChild(this.iframe);
        var n = this,
            e = t.util.query(this.socket.options.query, "t=" + +new Date);
        this.iframe.src = this.prepareUrl() + e, t.util.on(window, "unload", function() {
            n.destroy()
        })
    }, n.prototype._ = function(e, t) {
        this.onData(e);
        try {
            var n = t.getElementsByTagName("script")[0];
            n.parentNode.removeChild(n)
        } catch (o) {}
    }, n.prototype.destroy = function() {
        if (this.iframe) {
            try {
                this.iframe.src = "about:blank"
            } catch (e) {}
            this.doc = null, this.iframe.parentNode.removeChild(this.iframe), this.iframe = null, CollectGarbage()
        }
    }, n.prototype.close = function() {
        return this.destroy(), t.Transport.XHR.prototype.close.call(this)
    }, n.check = function() {
        if ("undefined" != typeof window && ["Active"].concat("Object").join("X") in window) try {
            return new(window[["Active"].concat("Object").join("X")])("htmlfile") && t.Transport.XHR.check()
        } catch (e) {}
        return !1
    }, n.xdomainCheck = function() {
        return !1
    }, t.transports.push("htmlfile")
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports),
function(e, t, n) {
    function o() {
        t.Transport.XHR.apply(this, arguments)
    }

    function i() {}
    e["xhr-polling"] = o, t.util.inherit(o, t.Transport.XHR), t.util.merge(o, t.Transport.XHR), o.prototype.name = "xhr-polling", o.prototype.open = function() {
        return t.Transport.XHR.prototype.open.call(this), !1
    }, o.prototype.get = function() {
        function e() {
            4 == this.readyState && (this.onreadystatechange = i, 200 == this.status ? (r.onData(this.responseText), r.get()) : r.onClose())
        }

        function t() {
            this.onerror = this.onload = i, r.onData(this.responseText), r.get()
        }

        function o() {
            r.onClose()
        }
        if (this.open) {
            var r = this;
            this.xhr = this.request(), n.XDomainRequest && this.xhr instanceof XDomainRequest ? (this.xhr.onload = t, this.xhr.onerror = o) : this.xhr.onreadystatechange = e, this.xhr.send(null)
        }
    }, o.prototype.onClose = function() {
        if (t.Transport.XHR.prototype.onClose.call(this), this.xhr) {
            this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = i;
            try {
                this.xhr.abort()
            } catch (e) {}
            this.xhr = null
        }
    }, o.prototype.ready = function(e, n) {
        var o = this;
        t.util.defer(function() {
            n.call(o)
        })
    }, t.transports.push("xhr-polling")
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this),
function(e, t, n) {
    function o(e) {
        t.Transport["xhr-polling"].apply(this, arguments), this.index = t.j.length;
        var n = this;
        t.j.push(function(e) {
            n._(e)
        })
    }
    var i = n.document && "MozAppearance" in n.document.documentElement.style;
    e["jsonp-polling"] = o, t.util.inherit(o, t.Transport["xhr-polling"]), o.prototype.name = "jsonp-polling", o.prototype.post = function(e) {
        function n() {
            o(), i.socket.setBuffer(!1)
        }

        function o() {
            i.iframe && i.form.removeChild(i.iframe);
            try {
                a = document.createElement('<iframe name="' + i.iframeId + '">')
            } catch (e) {
                a = document.createElement("iframe"), a.name = i.iframeId
            }
            a.id = i.iframeId, i.form.appendChild(a), i.iframe = a
        }
        var i = this,
            r = t.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
        if (!this.form) {
            var a, s = document.createElement("form"),
                c = document.createElement("textarea"),
                d = this.iframeId = "socketio_iframe_" + this.index;
            s.className = "socketio", s.style.position = "absolute", s.style.top = "0px", s.style.left = "0px", s.style.display = "none", s.target = d, s.method = "POST", s.setAttribute("accept-charset", "utf-8"), c.name = "d", s.appendChild(c), document.body.appendChild(s), this.form = s, this.area = c
        }
        this.form.action = this.prepareUrl() + r, o(), this.area.value = t.JSON.stringify(e);
        try {
            this.form.submit()
        } catch (u) {}
        this.iframe.attachEvent ? a.onreadystatechange = function() {
            "complete" == i.iframe.readyState && n()
        } : this.iframe.onload = n, this.socket.setBuffer(!0)
    }, o.prototype.get = function() {
        var e = this,
            n = document.createElement("script"),
            o = t.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
        this.script && (this.script.parentNode.removeChild(this.script), this.script = null), n.async = !0, n.src = this.prepareUrl() + o, n.onerror = function() {
            e.onClose()
        }, o = document.getElementsByTagName("script")[0], o.parentNode.insertBefore(n, o), this.script = n, i && setTimeout(function() {
            var e = document.createElement("iframe");
            document.body.appendChild(e), document.body.removeChild(e)
        }, 100)
    }, o.prototype._ = function(e) {
        return this.onData(e), this.open && this.get(), this
    }, o.prototype.ready = function(e, n) {
        var o = this;
        return i ? void t.util.load(function() {
            n.call(o)
        }) : n.call(this)
    }, o.check = function() {
        return "document" in n
    }, o.xdomainCheck = function() {
        return !0
    }, t.transports.push("jsonp-polling")
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this);
var Erizo = Erizo || {};
Erizo.EventDispatcher = function(e) {
    var t = {};
    return e.dispatcher = {}, e.dispatcher.eventListeners = {}, t.addEventListener = function(t, n) {
        void 0 === e.dispatcher.eventListeners[t] && (e.dispatcher.eventListeners[t] = []), e.dispatcher.eventListeners[t].push(n)
    }, t.removeEventListener = function(t, n) {
        var o;
        o = e.dispatcher.eventListeners[t].indexOf(n), -1 !== o && e.dispatcher.eventListeners[t].splice(o, 1)
    }, t.dispatchEvent = function(t) {
        var n;
        L.Logger.debug("Event: " + t.type);
        for (n in e.dispatcher.eventListeners[t.type]) e.dispatcher.eventListeners[t.type].hasOwnProperty(n) && e.dispatcher.eventListeners[t.type][n](t)
    }, t
}, Erizo.LicodeEvent = function(e) {
    var t = {};
    return t.type = e.type, t
}, Erizo.RoomEvent = function(e) {
    var t = Erizo.LicodeEvent(e);
    return t.streams = e.streams, t.message = e.message, t
}, Erizo.StreamEvent = function(e) {
    var t = Erizo.LicodeEvent(e);
    return t.stream = e.stream, t.msg = e.msg, t.bandwidth = e.bandwidth, t
}, Erizo.PublisherEvent = function(e) {
    return Erizo.LicodeEvent(e)
}, Erizo = Erizo || {}, Erizo.FcStack = function() {
    return {
        addStream: function() {}
    }
}, Erizo = Erizo || {}, Erizo.BowserStack = function(e) {
    var t = {},
        n = webkitRTCPeerConnection;
    t.pc_config = {
        iceServers: []
    }, t.con = {
        optional: [{
            DtlsSrtpKeyAgreement: !0
        }]
    }, void 0 !== e.stunServerUrl && t.pc_config.iceServers.push({
        url: e.stunServerUrl
    }), (e.turnServer || {}).url && t.pc_config.iceServers.push({
        username: e.turnServer.username,
        credential: e.turnServer.password,
        url: e.turnServer.url
    }), void 0 === e.audio && (e.audio = !0), void 0 === e.video && (e.video = !0), t.mediaConstraints = {
        offerToReceiveVideo: e.video,
        offerToReceiveAudio: e.audio
    }, t.peerConnection = new n(t.pc_config, t.con), e.remoteDescriptionSet = !1;
    var o = function(t) {
        if (e.maxVideoBW) {
            var n = t.match(/m=video.*\r\n/);
            if (null == n && (n = t.match(/m=video.*\n/)), n && n.length > 0) var o = n[0] + "b=AS:" + e.maxVideoBW + "\r\n",
                t = t.replace(n[0], o)
        }
        return e.maxAudioBW && (n = t.match(/m=audio.*\r\n/), null == n && (n = t.match(/m=audio.*\n/)), n && n.length > 0 && (o = n[0] + "b=AS:" + e.maxAudioBW + "\r\n", t = t.replace(n[0], o))), t
    };
    t.close = function() {
        t.state = "closed", t.peerConnection.close()
    }, e.localCandidates = [], t.peerConnection.onicecandidate = function(n) {
        n.candidate ? (n.candidate.candidate.match(/a=/) || (n.candidate.candidate = "a=" + n.candidate.candidate), e.remoteDescriptionSet ? e.callback({
            type: "candidate",
            candidate: n.candidate
        }) : e.localCandidates.push(n.candidate)) : console.log("End of candidates.", t.peerConnection.localDescription)
    }, t.peerConnection.onaddstream = function(e) {
        t.onaddstream && t.onaddstream(e)
    }, t.peerConnection.onremovestream = function(e) {
        t.onremovestream && t.onremovestream(e)
    };
    var i, r = function(e) {
            console.log("Error in Stack ", e)
        },
        a = function(n) {
            n.sdp = o(n.sdp), console.log("Set local description", n.sdp), i = n, t.peerConnection.setLocalDescription(i, function() {
                console.log("The final LocalDesc", t.peerConnection.localDescription), e.callback(t.peerConnection.localDescription)
            }, r)
        },
        s = function(n) {
            n.sdp = o(n.sdp), e.callback(n), i = n, t.peerConnection.setLocalDescription(n)
        };
    return t.createOffer = function(e) {
        e === !0 ? t.peerConnection.createOffer(a, r, t.mediaConstraints) : t.peerConnection.createOffer(a, r)
    }, t.addStream = function(e) {
        t.peerConnection.addStream(e)
    }, e.remoteCandidates = [], t.processSignalingMessage = function(n) {
        if (console.log("Process Signaling Message", n), "offer" === n.type) n.sdp = o(n.sdp), t.peerConnection.setRemoteDescription(new RTCSessionDescription(n)), t.peerConnection.createAnswer(s, null, t.mediaConstraints), e.remoteDescriptionSet = !0;
        else if ("answer" === n.type) console.log("Set remote description", n.sdp), n.sdp = o(n.sdp), t.peerConnection.setRemoteDescription(new RTCSessionDescription(n), function() {
            for (e.remoteDescriptionSet = !0, console.log("Candidates to be added: ", e.remoteCandidates.length); e.remoteCandidates.length > 0;) console.log("Candidate :", e.remoteCandidates[e.remoteCandidates.length - 1]), t.peerConnection.addIceCandidate(e.remoteCandidates.shift(), function() {}, r);
            for (; e.localCandidates.length > 0;) e.callback({
                type: "candidate",
                candidate: e.localCandidates.shift()
            })
        }, function() {
            console.log("Error Setting Remote Description")
        });
        else if ("candidate" === n.type) {
            console.log("Message with candidate");
            try {
                var i;
                i = "object" == typeof n.candidate ? n.candidate : JSON.parse(n.candidate), i.candidate = i.candidate.replace(/a=/g, ""), i.sdpMLineIndex = parseInt(i.sdpMLineIndex), i.sdpMLineIndex = "audio" == i.sdpMid ? 0 : 1;
                var a = new RTCIceCandidate(i);
                console.log("Remote Candidate", a), e.remoteDescriptionSet ? t.peerConnection.addIceCandidate(a, function() {}, r) : e.remoteCandidates.push(a)
            } catch (c) {
                L.Logger.error("Error parsing candidate", n.candidate)
            }
        }
    }, t
}, Erizo = Erizo || {}, Erizo.FirefoxStack = function(e) {
    var t = {},
        n = mozRTCPeerConnection,
        o = mozRTCSessionDescription,
        i = mozRTCIceCandidate;
    t.pc_config = {
        iceServers: []
    }, void 0 !== e.stunServerUrl && t.pc_config.iceServers.push({
        url: e.stunServerUrl
    }), (e.turnServer || {}).url && t.pc_config.iceServers.push({
        username: e.turnServer.username,
        credential: e.turnServer.password,
        url: e.turnServer.url
    }), void 0 === e.audio && (e.audio = !0), void 0 === e.video && (e.video = !0), t.mediaConstraints = {
        offerToReceiveAudio: e.audio,
        offerToReceiveVideo: e.video,
        mozDontOfferDataChannel: !0
    };
    var r = function(e) {
            L.Logger.error("Error in Stack ", e)
        },
        a = !1;
    t.peerConnection = new n(t.pc_config, t.con), e.localCandidates = [], t.peerConnection.onicecandidate = function(t) {
        t.candidate ? (a = !0, t.candidate.candidate.match(/a=/) || (t.candidate.candidate = "a=" + t.candidate.candidate), e.remoteDescriptionSet ? e.callback({
            type: "candidate",
            candidate: t.candidate
        }) : (e.localCandidates.push(t.candidate), console.log("Local Candidates stored: ", e.localCandidates.length, e.localCandidates))) : console.log("End of candidates.")
    }, t.peerConnection.onaddstream = function(e) {
        t.onaddstream && t.onaddstream(e)
    }, t.peerConnection.onremovestream = function(e) {
        t.onremovestream && t.onremovestream(e)
    };
    var s, c = function(t) {
            if (e.video && e.maxVideoBW) {
                var n = t.match(/m=video.*\r\n/);
                if (null == n && (n = t.match(/m=video.*\n/)), n && n.length > 0) var o = n[0] + "b=AS:" + e.maxVideoBW + "\r\n",
                    t = t.replace(n[0], o)
            }
            return e.audio && e.maxAudioBW && (n = t.match(/m=audio.*\r\n/), null == n && (n = t.match(/m=audio.*\n/)), n && n.length > 0 && (o = n[0] + "b=AS:" + e.maxAudioBW + "\r\n", t = t.replace(n[0], o))), t
        },
        d = function(t) {
            t.sdp = c(t.sdp), t.sdp = t.sdp.replace(/a=ice-options:google-ice\r\n/g, ""), e.callback(t), s = t
        },
        u = function(n) {
            n.sdp = c(n.sdp), n.sdp = n.sdp.replace(/a=ice-options:google-ice\r\n/g, ""), e.callback(n), s = n, t.peerConnection.setLocalDescription(s)
        };
    return t.createOffer = function(e) {
        e === !0 ? t.peerConnection.createOffer(d, r, t.mediaConstraints) : t.peerConnection.createOffer(d, r)
    }, t.addStream = function(e) {
        t.peerConnection.addStream(e)
    }, e.remoteCandidates = [], e.remoteDescriptionSet = !1, t.close = function() {
        t.state = "closed", t.peerConnection.close()
    }, t.processSignalingMessage = function(n) {
        if ("offer" === n.type) n.sdp = c(n.sdp), t.peerConnection.setRemoteDescription(new o(n), function() {
            t.peerConnection.createAnswer(u, function(e) {
                L.Logger.error("Error", e)
            }, t.mediaConstraints), e.remoteDescriptionSet = !0
        }, function(e) {
            L.Logger.error("Error setting Remote Description", e)
        });
        else if ("answer" === n.type) console.log("Set remote and local description", n.sdp), n.sdp = c(n.sdp), t.peerConnection.setLocalDescription(s, function() {
            t.peerConnection.setRemoteDescription(new o(n), function() {
                for (e.remoteDescriptionSet = !0, L.Logger.info("Remote Description successfully set"); e.remoteCandidates.length > 0 && a;) L.Logger.info("Setting stored remote candidates"), t.peerConnection.addIceCandidate(e.remoteCandidates.shift());
                for (; e.localCandidates.length > 0;) L.Logger.info("Sending Candidate from list"), e.callback({
                    type: "candidate",
                    candidate: e.localCandidates.shift()
                })
            }, function(e) {
                L.Logger.error("Error Setting Remote Description", e)
            })
        }, function(e) {
            L.Logger.error("Failure setting Local Description", e)
        });
        else if ("candidate" === n.type) try {
            var r;
            r = "object" == typeof n.candidate ? n.candidate : JSON.parse(n.candidate), r.candidate = r.candidate.replace(/ generation 0/g, ""), r.candidate = r.candidate.replace(/ udp /g, " UDP "), r.sdpMLineIndex = parseInt(r.sdpMLineIndex);
            var d = new i(r);
            if (e.remoteDescriptionSet && a)
                for (t.peerConnection.addIceCandidate(d); e.remoteCandidates.length > 0;) L.Logger.info("Setting stored remote candidates"), t.peerConnection.addIceCandidate(e.remoteCandidates.shift());
            else e.remoteCandidates.push(d)
        } catch (l) {
            L.Logger.error("Error parsing candidate", n.candidate, l)
        }
    }, t
}, Erizo = Erizo || {}, Erizo.ChromeStableStack = function(e) {
    var t = {},
        n = webkitRTCPeerConnection;
    t.pc_config = {
        iceServers: []
    }, t.con = {
        optional: [{
            DtlsSrtpKeyAgreement: !0
        }]
    }, void 0 !== e.stunServerUrl && t.pc_config.iceServers.push({
        url: e.stunServerUrl
    }), (e.turnServer || {}).url && t.pc_config.iceServers.push({
        username: e.turnServer.username,
        credential: e.turnServer.password,
        url: e.turnServer.url
    }), void 0 === e.audio && (e.audio = !0), void 0 === e.video && (e.video = !0), t.mediaConstraints = {
        mandatory: {
            OfferToReceiveVideo: e.video,
            OfferToReceiveAudio: e.audio
        }
    };
    var o = function(e) {
        console.log("Error in Stack ", e)
    };
    t.peerConnection = new n(t.pc_config, t.con);
    var i = function(t) {
        if (e.video && e.maxVideoBW) {
            var t = t.replace(/b=AS:.*\r\n/g, ""),
                n = t.match(/m=video.*\r\n/);
            if (null == n && (n = t.match(/m=video.*\n/)), n && n.length > 0) var o = n[0] + "b=AS:" + e.maxVideoBW + "\r\n",
                t = t.replace(n[0], o)
        }
        return e.audio && e.maxAudioBW && (n = t.match(/m=audio.*\r\n/), null == n && (n = t.match(/m=audio.*\n/)), n && n.length > 0 && (o = n[0] + "b=AS:" + e.maxAudioBW + "\r\n", t = t.replace(n[0], o))), t
    };
    t.close = function() {
        t.state = "closed", t.peerConnection.close()
    }, e.localCandidates = [], t.peerConnection.onicecandidate = function(t) {
        t.candidate ? (t.candidate.candidate.match(/a=/) || (t.candidate.candidate = "a=" + t.candidate.candidate), t = {
            sdpMLineIndex: t.candidate.sdpMLineIndex,
            sdpMid: t.candidate.sdpMid,
            candidate: t.candidate.candidate
        }, e.remoteDescriptionSet ? e.callback({
            type: "candidate",
            candidate: t
        }) : (e.localCandidates.push(t), L.Logger.info("Storing candidate: ", e.localCandidates.length, t))) : console.log("End of candidates.")
    }, t.peerConnection.onaddstream = function(e) {
        t.onaddstream && t.onaddstream(e)
    }, t.peerConnection.onremovestream = function(e) {
        t.onremovestream && t.onremovestream(e)
    };
    var r, a, s = function(t) {
            t.sdp = i(t.sdp), t.sdp = t.sdp.replace(/a=ice-options:google-ice\r\n/g, ""), e.callback({
                type: t.type,
                sdp: t.sdp
            }), r = t
        },
        c = function(n) {
            n.sdp = i(n.sdp), e.callback({
                type: n.type,
                sdp: n.sdp
            }), r = n, t.peerConnection.setLocalDescription(n)
        };
    return t.updateSpec = function(n, o) {
        (n.maxVideoBW || n.maxAudioBW) && (n.maxVideoBW && (L.Logger.debug("Maxvideo Requested", n.maxVideoBW, "limit", e.limitMaxVideoBW), n.maxVideoBW > e.limitMaxVideoBW && (n.maxVideoBW = e.limitMaxVideoBW), e.maxVideoBW = n.maxVideoBW, L.Logger.debug("Result", e.maxVideoBW)), n.maxAudioBW && (n.maxAudioBW > e.limitMaxAudioBW && (n.maxAudioBW = e.limitMaxAudioBW), e.maxAudioBW = n.maxAudioBW), r.sdp = i(r.sdp), t.peerConnection.setLocalDescription(r, function() {
            a.sdp = i(a.sdp), t.peerConnection.setRemoteDescription(new RTCSessionDescription(a), function() {
                e.remoteDescriptionSet = !0, e.callback({
                    type: "updatestream",
                    sdp: r.sdp
                })
            })
        }, function(e) {
            L.Logger.error("Error updating configuration", e), o("error")
        })), n.minVideoBW && (L.Logger.debug("MinVideo Changed to ", n.minVideoBW), e.callback({
            type: "updatestream",
            minVideoBW: n.minVideoBW
        }))
    }, t.createOffer = function(e) {
        e === !0 ? t.peerConnection.createOffer(s, o, t.mediaConstraints) : t.peerConnection.createOffer(s, o)
    }, t.addStream = function(e) {
        t.peerConnection.addStream(e)
    }, e.remoteCandidates = [], e.remoteDescriptionSet = !1, t.processSignalingMessage = function(n) {
        if ("offer" === n.type) n.sdp = i(n.sdp), t.peerConnection.setRemoteDescription(new RTCSessionDescription(n), function() {
            t.peerConnection.createAnswer(c, function(e) {
                L.Logger.error("Error: ", e)
            }, t.mediaConstraints), e.remoteDescriptionSet = !0
        }, function(e) {
            L.Logger.error("Error setting Remote Description", e)
        });
        else if ("answer" === n.type) console.log("Set remote and local description", n.sdp), n.sdp = i(n.sdp), a = n, t.peerConnection.setLocalDescription(r, function() {
            t.peerConnection.setRemoteDescription(new RTCSessionDescription(n), function() {
                for (e.remoteDescriptionSet = !0, console.log("Candidates to be added: ", e.remoteCandidates.length, e.remoteCandidates); e.remoteCandidates.length > 0;) t.peerConnection.addIceCandidate(e.remoteCandidates.shift());
                for (console.log("Local candidates to send:", e.localCandidates.length); e.localCandidates.length > 0;) e.callback({
                    type: "candidate",
                    candidate: e.localCandidates.shift()
                })
            })
        });
        else if ("candidate" === n.type) try {
            var o;
            o = "object" == typeof n.candidate ? n.candidate : JSON.parse(n.candidate), o.candidate = o.candidate.replace(/a=/g, ""), o.sdpMLineIndex = parseInt(o.sdpMLineIndex);
            var s = new RTCIceCandidate(o);
            e.remoteDescriptionSet ? t.peerConnection.addIceCandidate(s) : e.remoteCandidates.push(s)
        } catch (d) {
            L.Logger.error("Error parsing candidate", n.candidate)
        }
    }, t
}, Erizo = Erizo || {}, Erizo.ChromeCanaryStack = function(e) {
    var t = {},
        n = webkitRTCPeerConnection;
    t.pc_config = {
        iceServers: []
    }, t.con = {
        optional: [{
            DtlsSrtpKeyAgreement: !0
        }]
    }, void 0 !== e.stunServerUrl && t.pc_config.iceServers.push({
        url: e.stunServerUrl
    }), (e.turnServer || {}).url && t.pc_config.iceServers.push({
        username: e.turnServer.username,
        credential: e.turnServer.password,
        url: e.turnServer.url
    }), (void 0 === e.audio || e.nop2p) && (e.audio = !0), (void 0 === e.video || e.nop2p) && (e.video = !0), t.mediaConstraints = {
        mandatory: {
            OfferToReceiveVideo: e.video,
            OfferToReceiveAudio: e.audio
        }
    }, t.roapSessionId = 103, t.peerConnection = new n(t.pc_config, t.con), t.peerConnection.onicecandidate = function(n) {
        L.Logger.debug("PeerConnection: ", e.session_id), n.candidate ? t.iceCandidateCount += 1 : (L.Logger.debug("State: " + t.peerConnection.iceGatheringState), void 0 === t.ices && (t.ices = 0), t.ices += 1, 1 <= t.ices && t.moreIceComing && (t.moreIceComing = !1, t.markActionNeeded()))
    };
    var o = function(t) {
        if (e.maxVideoBW) {
            var n = t.match(/m=video.*\r\n/);
            if (n && 0 < n.length) var o = n[0] + "b=AS:" + e.maxVideoBW + "\r\n",
                t = t.replace(n[0], o)
        }
        return e.maxAudioBW && (n = t.match(/m=audio.*\r\n/)) && 0 < n.length && (o = n[0] + "b=AS:" + e.maxAudioBW + "\r\n", t = t.replace(n[0], o)), t
    };
    return t.processSignalingMessage = function(e) {
        L.Logger.debug("Activity on conn " + t.sessionId), e = JSON.parse(e), t.incomingMessage = e, "new" === t.state ? "OFFER" === e.messageType ? (e = {
            sdp: e.sdp,
            type: "offer"
        }, t.peerConnection.setRemoteDescription(new RTCSessionDescription(e)), t.state = "offer-received", t.markActionNeeded()) : t.error("Illegal message for this state: " + e.messageType + " in state " + t.state) : "offer-sent" === t.state ? "ANSWER" === e.messageType ? (e = {
            sdp: e.sdp,
            type: "answer"
        }, L.Logger.debug("Received ANSWER: ", e.sdp), e.sdp = o(e.sdp), t.peerConnection.setRemoteDescription(new RTCSessionDescription(e)), t.sendOK(), t.state = "established") : "pr-answer" === e.messageType ? (e = {
            sdp: e.sdp,
            type: "pr-answer"
        }, t.peerConnection.setRemoteDescription(new RTCSessionDescription(e))) : "offer" === e.messageType ? t.error("Not written yet") : t.error("Illegal message for this state: " + e.messageType + " in state " + t.state) : "established" === t.state && ("OFFER" === e.messageType ? (e = {
            sdp: e.sdp,
            type: "offer"
        }, t.peerConnection.setRemoteDescription(new RTCSessionDescription(e)), t.state = "offer-received", t.markActionNeeded()) : t.error("Illegal message for this state: " + e.messageType + " in state " + t.state))
    }, t.addStream = function(e) {
        t.peerConnection.addStream(e), t.markActionNeeded()
    }, t.removeStream = function() {
        t.markActionNeeded()
    }, t.close = function() {
        t.state = "closed", t.peerConnection.close()
    }, t.markActionNeeded = function() {
        t.actionNeeded = !0, t.doLater(function() {
            t.onstablestate()
        })
    }, t.doLater = function(e) {
        window.setTimeout(e, 1)
    }, t.onstablestate = function() {
        var e;
        if (t.actionNeeded) {
            if ("new" === t.state || "established" === t.state) t.peerConnection.createOffer(function(e) {
                e.sdp = o(e.sdp), L.Logger.debug("Changed", e.sdp), e.sdp !== t.prevOffer ? (t.peerConnection.setLocalDescription(e), t.state = "preparing-offer", t.markActionNeeded()) : L.Logger.debug("Not sending a new offer")
            }, null, t.mediaConstraints);
            else if ("preparing-offer" === t.state) {
                if (t.moreIceComing) return;
                t.prevOffer = t.peerConnection.localDescription.sdp, L.Logger.debug("Sending OFFER: " + t.prevOffer), t.sendMessage("OFFER", t.prevOffer), t.state = "offer-sent"
            } else if ("offer-received" === t.state) t.peerConnection.createAnswer(function(e) {
                t.peerConnection.setLocalDescription(e), t.state = "offer-received-preparing-answer", t.iceStarted ? t.markActionNeeded() : (L.Logger.debug((new Date).getTime() + ": Starting ICE in responder"), t.iceStarted = !0)
            }, null, t.mediaConstraints);
            else if ("offer-received-preparing-answer" === t.state) {
                if (t.moreIceComing) return;
                e = t.peerConnection.localDescription.sdp, t.sendMessage("ANSWER", e), t.state = "established"
            } else t.error("Dazed and confused in state " + t.state + ", stopping here");
            t.actionNeeded = !1
        }
    }, t.sendOK = function() {
        t.sendMessage("OK")
    }, t.sendMessage = function(e, n) {
        var o = {};
        o.messageType = e, o.sdp = n, "OFFER" === e ? (o.offererSessionId = t.sessionId, o.answererSessionId = t.otherSessionId, o.seq = t.sequenceNumber += 1, o.tiebreaker = Math.floor(429496723 * Math.random() + 1)) : (o.offererSessionId = t.incomingMessage.offererSessionId, o.answererSessionId = t.sessionId, o.seq = t.incomingMessage.seq), t.onsignalingmessage(JSON.stringify(o))
    }, t.error = function(e) {
        throw "Error in RoapOnJsep: " + e
    }, t.sessionId = t.roapSessionId += 1, t.sequenceNumber = 0, t.actionNeeded = !1, t.iceStarted = !1, t.moreIceComing = !0, t.iceCandidateCount = 0, t.onsignalingmessage = e.callback, t.peerConnection.onopen = function() {
        t.onopen && t.onopen()
    }, t.peerConnection.onaddstream = function(e) {
        t.onaddstream && t.onaddstream(e)
    }, t.peerConnection.onremovestream = function(e) {
        t.onremovestream && t.onremovestream(e)
    }, t.peerConnection.oniceconnectionstatechange = function(e) {
        t.oniceconnectionstatechange && t.oniceconnectionstatechange(e.currentTarget.iceConnectionState)
    }, t.onaddstream = null, t.onremovestream = null, t.state = "new", t.markActionNeeded(), t
}, Erizo = Erizo || {}, Erizo.sessionId = 103, Erizo.Connection = function(e) {
    var t = {};
    if (e.session_id = Erizo.sessionId += 1, t.browser = Erizo.getBrowser(), "undefined" != typeof module && module.exports) L.Logger.error("Publish/subscribe video/audio streams not supported in erizofc yet"), t = Erizo.FcStack(e);
    else if ("mozilla" === t.browser) L.Logger.debug("Firefox Stack"), t = Erizo.FirefoxStack(e);
    else if ("bowser" === t.browser) L.Logger.debug("Bowser Stack"), t = Erizo.BowserStack(e);
    else {
        if ("chrome-stable" !== t.browser) throw L.Logger.debug("None!"), "WebRTC stack not available";
        L.Logger.debug("Stable!"), t = Erizo.ChromeStableStack(e)
    }
    return t.updateSpec || (t.updateSpec = function(e, t) {
        L.Logger.error("Update Configuration not implemented in this browser"), t && t("unimplemented")
    }), t
}, Erizo.getBrowser = function() {
    var e = "none";
    return null !== window.navigator.userAgent.match("Firefox") ? e = "mozilla" : null !== window.navigator.userAgent.match("Bowser") ? e = "bowser" : null !== window.navigator.userAgent.match("Chrome") ? 26 <= window.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./)[1] && (e = "chrome-stable") : null !== window.navigator.userAgent.match("Safari") ? e = "bowser" : null !== window.navigator.userAgent.match("AppleWebKit") && (e = "bowser"), e
}, Erizo.GetUserMedia = function(e, t, n) {
    if (navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia, e.screen) switch (L.Logger.debug("Screen access requested"), Erizo.getBrowser()) {
        case "mozilla":
            L.Logger.debug("Screen sharing in Firefox");
            var o = {};
            void 0 != e.video.mandatory ? (o.video = e.video, o.video.mediaSource = "window") : o = {
                video: {
                    mediaSource: "window"
                }
            }, navigator.getMedia(o, t, n);
            break;
        case "chrome-stable":
            L.Logger.debug("Screen sharing in Chrome"), o = "okeephmleflklcdebijnponpabbmmgeo", e.extensionId && (L.Logger.debug("extensionId supplied, using " + e.extensionId), o = e.extensionId), L.Logger.debug("Screen access on chrome stable, looking for extension");
            try {
                chrome.runtime.sendMessage(o, {
                    getStream: !0
                }, function(o) {
                    var i = {};
                    void 0 == o ? (L.Logger.debug("Access to screen denied"), n({
                        code: "Access to screen denied"
                    })) : (o = o.streamId, void 0 != e.video.mandatory ? (i.video = e.video, i.video.mandatory.chromeMediaSource = "desktop", i.video.mandatory.chromeMediaSourceId = o) : i = {
                        video: {
                            mandatory: {
                                chromeMediaSource: "desktop",
                                chromeMediaSourceId: o
                            }
                        }
                    }, navigator.getMedia(i, t, n))
                })
            } catch (i) {
                L.Logger.debug("Lynckia screensharing plugin is not accessible "), n({
                    code: "no_plugin_present"
                });
                break
            }
            break;
        default:
            L.Logger.debug("This browser does not support screenSharing")
    } else "undefined" != typeof module && module.exports ? L.Logger.error("Video/audio streams not supported in erizofc yet") : navigator.getMedia(e, t, n)
}, Erizo = Erizo || {}, Erizo.Stream = function(e) {
    var t, n = Erizo.EventDispatcher(e);
    if (n.stream = e.stream, n.url = e.url, n.recording = e.recording, n.room = void 0, n.showing = !1, n.local = !1, n.video = e.video, n.audio = e.audio, n.screen = e.screen, n.videoSize = e.videoSize, n.extensionId = e.extensionId, !(void 0 === n.videoSize || n.videoSize instanceof Array && 4 == n.videoSize.length)) throw Error("Invalid Video Size");
    return (void 0 === e.local || !0 === e.local) && (n.local = !0), n.getID = function() {
        return e.streamID
    }, n.getAttributes = function() {
        return e.attributes
    }, n.setAttributes = function() {
        L.Logger.error("Failed to set attributes data. This Stream object has not been published.")
    }, n.updateLocalAttributes = function(t) {
        e.attributes = t
    }, n.hasAudio = function() {
        return e.audio
    }, n.hasVideo = function() {
        return e.video
    }, n.hasData = function() {
        return e.data
    }, n.hasScreen = function() {
        return e.screen
    }, n.sendData = function() {
        L.Logger.error("Failed to send data. This Stream object has not that channel enabled.")
    }, n.init = function() {
        try {
            if ((e.audio || e.video || e.screen) && void 0 === e.url) {
                L.Logger.debug("Requested access to local media");
                var t = e.video;
                1 != t && 1 != e.screen || void 0 === n.videoSize ? 1 == e.screen && void 0 === t && (t = !0) : t = {
                    mandatory: {
                        minWidth: n.videoSize[0],
                        minHeight: n.videoSize[1],
                        maxWidth: n.videoSize[2],
                        maxHeight: n.videoSize[3]
                    }
                };
                var o = {
                    video: t,
                    audio: e.audio,
                    fake: e.fake,
                    screen: e.screen,
                    extensionId: n.extensionId
                };
                L.Logger.debug(o), Erizo.GetUserMedia(o, function(e) {
                    L.Logger.info("User has granted access to local media."), n.stream = e, e = Erizo.StreamEvent({
                        type: "access-accepted"
                    }), n.dispatchEvent(e)
                }, function(e) {
                    L.Logger.error("Failed to get access to local media. Error code was " + e.code + "."), e = Erizo.StreamEvent({
                        type: "access-denied"
                    }), n.dispatchEvent(e)
                })
            } else {
                var i = Erizo.StreamEvent({
                    type: "access-accepted"
                });
                n.dispatchEvent(i)
            }
        } catch (r) {
            L.Logger.error("Error accessing to local media", r)
        }
    }, n.close = function() {
        n.local && (void 0 !== n.room && n.room.unpublish(n), n.hide(), void 0 !== n.stream && n.stream.stop(), n.stream = void 0)
    }, n.play = function(e, t) {
        if (t = t || {}, n.elementID = e, n.hasVideo() || this.hasScreen()) {
            if (void 0 !== e) {
                var o = new Erizo.VideoPlayer({
                    id: n.getID(),
                    stream: n,
                    elementID: e,
                    options: t
                });
                n.player = o, n.showing = !0
            }
        } else n.hasAudio && (o = new Erizo.AudioPlayer({
            id: n.getID(),
            stream: n,
            elementID: e,
            options: t
        }), n.player = o, n.showing = !0)
    }, n.stop = function() {
        n.showing && void 0 !== n.player && (n.player.destroy(), n.showing = !1)
    }, n.show = n.play, n.hide = n.stop, t = function() {
        if (void 0 !== n.player && void 0 !== n.stream) {
            var e = n.player.video,
                t = document.defaultView.getComputedStyle(e),
                o = parseInt(t.getPropertyValue("width"), 10),
                i = parseInt(t.getPropertyValue("height"), 10),
                r = parseInt(t.getPropertyValue("left"), 10),
                t = parseInt(t.getPropertyValue("top"), 10),
                a = document.getElementById(n.elementID),
                s = document.defaultView.getComputedStyle(a),
                a = parseInt(s.getPropertyValue("width"), 10),
                s = parseInt(s.getPropertyValue("height"), 10),
                c = document.createElement("canvas");
            return c.id = "testing", c.width = a, c.height = s, c.setAttribute("style", "display: none"), c.getContext("2d").drawImage(e, r, t, o, i), c
        }
        return null
    }, n.getVideoFrameURL = function(e) {
        var n = t();
        return null !== n ? e ? n.toDataURL(e) : n.toDataURL() : null
    }, n.getVideoFrame = function() {
        var e = t();
        return null !== e ? e.getContext("2d").getImageData(0, 0, e.width, e.height) : null
    }, n.updateConfiguration = function(e, t) {
        if (void 0 !== e) {
            if (!n.pc) return "This stream has not been published, ignoring";
            n.pc.updateSpec(e, t)
        }
    }, n
}, Erizo = Erizo || {}, Erizo.Room = function(e) {
    var t, n, o, i, r, a, s = Erizo.EventDispatcher(e);
    return s.remoteStreams = {}, s.localStreams = {}, s.roomID = "", s.socket = {}, s.state = 0, s.p2p = !1, s.addEventListener("room-disconnected", function() {
        var e, t;
        s.state = 0;
        for (e in s.remoteStreams) s.remoteStreams.hasOwnProperty(e) && (t = s.remoteStreams[e], a(t), delete s.remoteStreams[e], t = Erizo.StreamEvent({
            type: "stream-removed",
            stream: t
        }), s.dispatchEvent(t));
        s.remoteStreams = {};
        for (e in s.localStreams) s.localStreams.hasOwnProperty(e) && (t = s.localStreams[e], t.pc.close(), delete s.localStreams[e]);
        try {
            s.socket.disconnect()
        } catch (n) {
            L.Logger.debug("Socket already disconnected")
        }
        s.socket = void 0
    }), a = function(e) {
        void 0 !== e.stream && (e.hide(), e.pc && e.pc.close(), e.local && e.stream.stop())
    }, i = function(e, t) {
        e.local ? n("sendDataStream", {
            id: e.getID(),
            msg: t
        }) : L.Logger.error("You can not send data through a remote stream")
    }, r = function(e, t) {
        e.local ? (e.updateLocalAttributes(t), n("updateStreamAttributes", {
            id: e.getID(),
            attrs: t
        })) : L.Logger.error("You can not update attributes in a remote stream")
    }, t = function(t, i, r) {
        console.log(t), s.socket = io.connect(t.host, {
            reconnect: !1,
            secure: t.secure,
            "force new connection": !0
        }), s.socket.on("onAddStream", function(e) {
            var t = Erizo.Stream({
                streamID: e.id,
                local: !1,
                audio: e.audio,
                video: e.video,
                data: e.data,
                screen: e.screen,
                attributes: e.attributes
            });
            s.remoteStreams[e.id] = t, e = Erizo.StreamEvent({
                type: "stream-added",
                stream: t
            }), s.dispatchEvent(e)
        }), s.socket.on("signaling_message_erizo", function(e) {
            var t;
            (t = e.peerId ? s.remoteStreams[e.peerId] : s.localStreams[e.streamId]) && t.pc.processSignalingMessage(e.mess)
        }), s.socket.on("signaling_message_peer", function(e) {
            var t = s.localStreams[e.streamId];
            t ? t.pc[e.peerSocket].processSignalingMessage(e.msg) : (t = s.remoteStreams[e.streamId], t.pc || c(t, e.peerSocket), t.pc.processSignalingMessage(e.msg))
        }), s.socket.on("publish_me", function(e) {
            var t = s.localStreams[e.streamId];
            void 0 === t.pc && (t.pc = {}), t.pc[e.peerSocket] = Erizo.Connection({
                callback: function(t) {
                    o("signaling_message", {
                        streamId: e.streamId,
                        peerSocket: e.peerSocket,
                        msg: t
                    })
                },
                audio: t.hasAudio(),
                video: t.hasVideo(),
                stunServerUrl: s.stunServerUrl,
                turnServer: s.turnServer
            }), t.pc[e.peerSocket].oniceconnectionstatechange = function(n) {
                "disconnected" === n && (t.pc[e.peerSocket].close(), delete t.pc[e.peerSocket])
            }, t.pc[e.peerSocket].addStream(t.stream), t.pc[e.peerSocket].createOffer()
        });
        var c = function(t, n) {
            t.pc = Erizo.Connection({
                callback: function(e) {
                    o("signaling_message", {
                        streamId: t.getID(),
                        peerSocket: n,
                        msg: e
                    })
                },
                stunServerUrl: s.stunServerUrl,
                turnServer: s.turnServer,
                maxAudioBW: e.maxAudioBW,
                maxVideoBW: e.maxVideoBW,
                limitMaxAudioBW: e.maxAudioBW,
                limitMaxVideoBW: e.maxVideoBW
            }), t.pc.onaddstream = function(e) {
                L.Logger.info("Stream subscribed"), t.stream = e.stream, e = Erizo.StreamEvent({
                    type: "stream-subscribed",
                    stream: t
                }), s.dispatchEvent(e)
            }
        };
        s.socket.on("onBandwidthAlert", function(e) {
            if (L.Logger.info("Bandwidth Alert on", e.streamID, "message", e.message, "BW:", e.bandwidth), e.streamID) {
                var t = s.remoteStreams[e.streamID],
                    e = Erizo.StreamEvent({
                        type: "bandwidth-alert",
                        stream: t,
                        msg: e.message,
                        bandwidth: e.bandwidth
                    });
                t.dispatchEvent(e)
            }
        }), s.socket.on("onDataStream", function(e) {
            var t = s.remoteStreams[e.id],
                e = Erizo.StreamEvent({
                    type: "stream-data",
                    msg: e.msg,
                    stream: t
                });
            t.dispatchEvent(e)
        }), s.socket.on("onUpdateAttributeStream", function(e) {
            var t = s.remoteStreams[e.id],
                n = Erizo.StreamEvent({
                    type: "stream-attributes-update",
                    attrs: e.attrs,
                    stream: t
                });
            t.updateLocalAttributes(e.attrs), t.dispatchEvent(n)
        }), s.socket.on("onRemoveStream", function(e) {
            var t = s.remoteStreams[e.id];
            delete s.remoteStreams[e.id], a(t), e = Erizo.StreamEvent({
                type: "stream-removed",
                stream: t
            }), s.dispatchEvent(e)
        }), s.socket.on("disconnect", function() {
            if (L.Logger.info("Socket disconnected"), 0 !== s.state) {
                var e = Erizo.RoomEvent({
                    type: "room-disconnected"
                });
                s.dispatchEvent(e)
            }
        }), s.socket.on("connection_failed", function() {
            if (L.Logger.info("ICE Connection Failed"), 0 !== s.state) {
                var e = Erizo.RoomEvent({
                    type: "stream-failed"
                });
                s.dispatchEvent(e)
            }
        }), s.socket.on("error", function(e) {
            L.Logger.error("Cannot connect to Erizo-Controller (socket.io error)", e), r(e)
        }), n("token", t, i, r)
    }, n = function(e, t, n, o) {
        s.socket.emit(e, t, function(e, t) {
            "success" === e ? void 0 !== n && n(t) : "error" === e ? void 0 !== o && o(t) : void 0 !== n && n(e, t)
        })
    }, o = function(e, t, n, o) {
        s.socket.emit(e, t, n, function(e, t) {
            void 0 !== o && o(e, t)
        })
    }, s.connect = function() {
        var n = L.Base64.decodeBase64(e.token);
        0 !== s.state && L.Logger.error("Room already connected"), s.state = 1, t(JSON.parse(n), function(t) {
            var n, o, i, r = 0,
                a = [];
            n = t.streams || [], s.p2p = t.p2p, o = t.id, s.stunServerUrl = t.stunServerUrl, s.turnServer = t.turnServer, s.state = 2, e.defaultVideoBW = t.defaultVideoBW, e.maxVideoBW = t.maxVideoBW;
            for (r in n) n.hasOwnProperty(r) && (i = n[r], t = Erizo.Stream({
                streamID: i.id,
                local: !1,
                audio: i.audio,
                video: i.video,
                data: i.data,
                screen: i.screen,
                attributes: i.attributes
            }), a.push(t), s.remoteStreams[i.id] = t);
            s.roomID = o, L.Logger.info("Connected to room " + s.roomID), r = Erizo.RoomEvent({
                type: "room-connected",
                streams: a
            }), s.dispatchEvent(r)
        }, function(e) {
            L.Logger.error("Not Connected! Error: " + e), e = Erizo.RoomEvent({
                type: "room-error"
            }), s.dispatchEvent(e)
        })
    }, s.disconnect = function() {
        var e = Erizo.RoomEvent({
            type: "room-disconnected"
        });
        s.dispatchEvent(e)
    }, s.publish = function(t, n, a) {
        if (n = n || {}, n.maxVideoBW = n.maxVideoBW || e.defaultVideoBW, n.maxVideoBW > e.maxVideoBW && (n.maxVideoBW = e.maxVideoBW), void 0 === n.minVideoBW && (n.minVideoBW = 0), n.minVideoBW > e.defaultVideoBW && (n.minVideoBW = e.defaultVideoBW), t.local && void 0 === s.localStreams[t.getID()])
            if (t.hasAudio() || t.hasVideo() || t.hasScreen())
                if (void 0 !== t.url || void 0 !== t.recording) {
                    var c, d;
                    t.url ? (c = "url", d = t.url) : (c = "recording", d = t.recording), o("publish", {
                        state: c,
                        data: t.hasData(),
                        audio: t.hasAudio(),
                        video: t.hasVideo(),
                        attributes: t.getAttributes()
                    }, d, function(e, n) {
                        null !== e ? (L.Logger.info("Stream published"), t.getID = function() {
                            return e
                        }, t.sendData = function(e) {
                            i(t, e)
                        }, t.setAttributes = function(e) {
                            r(t, e)
                        }, s.localStreams[e] = t, t.room = s, a && a(e)) : (L.Logger.error("Error when publishing the stream", n), a && a(void 0, n))
                    })
                } else s.p2p ? (e.maxAudioBW = n.maxAudioBW, e.maxVideoBW = n.maxVideoBW, o("publish", {
                    state: "p2p",
                    data: t.hasData(),
                    audio: t.hasAudio(),
                    video: t.hasVideo(),
                    screen: t.hasScreen(),
                    attributes: t.getAttributes()
                }, void 0, function(e, n) {
                    null === e && (L.Logger.error("Error when publishing the stream", n), a && a(void 0, n)), L.Logger.info("Stream published"), t.getID = function() {
                        return e
                    }, t.hasData() && (t.sendData = function(e) {
                        i(t, e)
                    }), t.setAttributes = function(e) {
                        r(t, e)
                    }, s.localStreams[e] = t, t.room = s
                })) : o("publish", {
                    state: "erizo",
                    data: t.hasData(),
                    audio: t.hasAudio(),
                    video: t.hasVideo(),
                    screen: t.hasScreen(),
                    minVideoBW: n.minVideoBW,
                    attributes: t.getAttributes()
                }, void 0, function(c, d) {
                    null === c ? (L.Logger.error("Error when publishing the stream: ", d), a && a(void 0, d)) : (L.Logger.info("Stream published"), t.getID = function() {
                        return c
                    }, t.hasData() && (t.sendData = function(e) {
                        i(t, e)
                    }), t.setAttributes = function(e) {
                        r(t, e)
                    }, s.localStreams[c] = t, t.room = s, t.pc = Erizo.Connection({
                        callback: function(e) {
                            console.log("Sending message", e), o("signaling_message", {
                                streamId: t.getID(),
                                msg: e
                            }, void 0, function() {})
                        },
                        stunServerUrl: s.stunServerUrl,
                        turnServer: s.turnServer,
                        maxAudioBW: n.maxAudioBW,
                        maxVideoBW: n.maxVideoBW,
                        limitMaxAudioBW: e.maxAudioBW,
                        limitMaxVideoBW: e.maxVideoBW,
                        audio: t.hasAudio(),
                        video: t.hasVideo()
                    }), t.pc.addStream(t.stream), t.pc.createOffer(), a && a(c))
                });
        else t.hasData() && o("publish", {
            state: "data",
            data: t.hasData(),
            audio: !1,
            video: !1,
            screen: !1,
            attributes: t.getAttributes()
        }, void 0, function(e, n) {
            null === e ? (L.Logger.error("Error publishing stream ", n), a && a(void 0, n)) : (L.Logger.info("Stream published"), t.getID = function() {
                return e
            }, t.sendData = function(e) {
                i(t, e)
            }, t.setAttributes = function(e) {
                r(t, e)
            }, s.localStreams[e] = t, t.room = s, a && a(e))
        })
    }, s.startRecording = function(e, t) {
        L.Logger.debug("Start Recording streamaa1111: " + e.getID()), n("startRecorder", {
            to: e.getID(),
            name: document.getElementById("IIN").value,
            path: document.getElementById("recPathInput").value,
            role: document.getElementById("ROLE").value
        }, function(e, n) {
            null === e ? (L.Logger.error("Error on start recording", n), t && t(void 0, n)) : (L.Logger.info("Start recording", e), t && t(e))
        })
    }, s.stopRecording = function(e, t) {
        n("stopRecorder", {
            id: e,
            name: document.getElementById("IIN").value,
            path: document.getElementById("recPathInput").value,
            role: document.getElementById("ROLE").value
        }, function(e, n) {
            null === e ? (L.Logger.error("Error on stop recording", n), t && t(void 0, n)) : (L.Logger.info("Stop recording"), t && t(!0))
        })
    }, s.unpublish = function(e, t) {
        if (e.local) {
            n("unpublish", e.getID(), function(e, n) {
                null === e ? (L.Logger.error("Error unpublishing stream", n), t && t(void 0, n)) : (L.Logger.info("Stream unpublished"), t && t(!0))
            });
            var o = e.room.p2p;
            e.room = void 0, (e.hasAudio() || e.hasVideo() || e.hasScreen()) && void 0 === e.url && !o && (e.pc.close(), e.pc = void 0), delete s.localStreams[e.getID()], e.getID = function() {}, e.sendData = function() {}, e.setAttributes = function() {}
        }
    }, s.subscribe = function(e, t, n) {
        if (t = t || {}, !e.local) {
            if (e.hasVideo() || e.hasAudio() || e.hasScreen()) s.p2p ? (o("subscribe", {
                streamId: e.getID()
            }), n && n(!0)) : o("subscribe", {
                streamId: e.getID(),
                audio: t.audio,
                video: t.video,
                data: t.data,
                browser: Erizo.getBrowser()
            }, void 0, function(i, r) {
                null === i ? (L.Logger.error("Error subscribing to stream ", r), n && n(void 0, r)) : (L.Logger.info("Subscriber added"), e.pc = Erizo.Connection({
                    callback: function(t) {
                        L.Logger.info("Sending message", t), o("signaling_message", {
                            streamId: e.getID(),
                            msg: t,
                            browser: e.pc.browser
                        }, void 0, function() {})
                    },
                    nop2p: !0,
                    audio: t.audio,
                    video: t.video,
                    stunServerUrl: s.stunServerUrl,
                    turnServer: s.turnServer
                }), e.pc.onaddstream = function(t) {
                    L.Logger.info("Stream subscribed"), e.stream = t.stream, t = Erizo.StreamEvent({
                        type: "stream-subscribed",
                        stream: e
                    }), s.dispatchEvent(t)
                }, e.pc.createOffer(!0), n && n(!0))
            });
            else {
                if (!e.hasData() || !1 === t.data) return void L.Logger.info("Subscribing to anything");
                o("subscribe", {
                    streamId: e.getID(),
                    data: t.data
                }, void 0, function(t, o) {
                    if (null === t) L.Logger.error("Error subscribing to stream ", o), n && n(void 0, o);
                    else {
                        L.Logger.info("Stream subscribed");
                        var i = Erizo.StreamEvent({
                            type: "stream-subscribed",
                            stream: e
                        });
                        s.dispatchEvent(i), n && n(!0)
                    }
                })
            }
            L.Logger.info("Subscribing to: " + e.getID())
        }
    }, s.unsubscribe = function(e, t) {
        void 0 !== s.socket && (e.local || n("unsubscribe", e.getID(), function(n, o) {
            null === n ? t && t(void 0, o) : (a(e), t && t(!0))
        }, function() {
            L.Logger.error("Error calling unsubscribe.")
        }))
    }, s.getStreamsByAttribute = function(e, t) {
        var n, o, i = [];
        for (n in s.remoteStreams) s.remoteStreams.hasOwnProperty(n) && (o = s.remoteStreams[n], void 0 !== o.getAttributes() && void 0 !== o.getAttributes()[e] && o.getAttributes()[e] === t && i.push(o));
        return i
    }, s
};
var L = L || {};
L.Logger = function(e) {
        return {
            DEBUG: 0,
            TRACE: 1,
            INFO: 2,
            WARNING: 3,
            ERROR: 4,
            NONE: 5,
            enableLogPanel: function() {
                e.Logger.panel = document.createElement("textarea"), e.Logger.panel.setAttribute("id", "licode-logs"), e.Logger.panel.setAttribute("style", "width: 100%; height: 100%; display: none"), e.Logger.panel.setAttribute("rows", 20), e.Logger.panel.setAttribute("cols", 20), e.Logger.panel.setAttribute("readOnly", !0), document.body.appendChild(e.Logger.panel)
            },
            setLogLevel: function(t) {
                t > e.Logger.NONE ? t = e.Logger.NONE : t < e.Logger.DEBUG && (t = e.Logger.DEBUG), e.Logger.logLevel = t
            },
            log: function(t) {
                var n = "";
                if (!(t < e.Logger.logLevel)) {
                    t === e.Logger.DEBUG ? n += "DEBUG" : t === e.Logger.TRACE ? n += "TRACE" : t === e.Logger.INFO ? n += "INFO" : t === e.Logger.WARNING ? n += "WARNING" : t === e.Logger.ERROR && (n += "ERROR");
                    for (var n = n + ": ", o = [], i = 0; i < arguments.length; i++) o[i] = arguments[i];
                    if (o = o.slice(1), o = [n].concat(o), void 0 !== e.Logger.panel) {
                        for (n = "", i = 0; i < o.length; i++) n += o[i];
                        e.Logger.panel.value = e.Logger.panel.value + "\n" + n
                    } else console.log.apply(console, o)
                }
            },
            debug: function() {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                e.Logger.log.apply(e.Logger, [e.Logger.DEBUG].concat(t))
            },
            trace: function() {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                e.Logger.log.apply(e.Logger, [e.Logger.TRACE].concat(t))
            },
            info: function() {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                e.Logger.log.apply(e.Logger, [e.Logger.INFO].concat(t))
            },
            warning: function() {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                e.Logger.log.apply(e.Logger, [e.Logger.WARNING].concat(t))
            },
            error: function() {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                e.Logger.log.apply(e.Logger, [e.Logger.ERROR].concat(t))
            }
        }
    }(L), L = L || {}, L.Base64 = function() {
        var e, t, n, o, i, r, a, s, c;
        for (e = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9,+,/".split(","), t = [], i = 0; i < e.length; i += 1) t[e[i]] = i;
        return r = function(e) {
            n = e, o = 0
        }, a = function() {
            var e;
            return !n || o >= n.length ? -1 : (e = 255 & n.charCodeAt(o), o += 1, e)
        }, s = function() {
            if (!n) return -1;
            for (;;) {
                if (o >= n.length) return -1;
                var e = n.charAt(o);
                if (o += 1, t[e]) return t[e];
                if ("A" === e) return 0
            }
        }, c = function(e) {
            return e = e.toString(16), 1 === e.length && (e = "0" + e), unescape("%" + e)
        }, {
            encodeBase64: function(t) {
                var n, o, i;
                for (r(t), t = "", n = Array(3), o = 0, i = !1; !i && -1 !== (n[0] = a());) n[1] = a(), n[2] = a(), t += e[n[0] >> 2], -1 !== n[1] ? (t += e[n[0] << 4 & 48 | n[1] >> 4], -1 !== n[2] ? (t += e[n[1] << 2 & 60 | n[2] >> 6], t += e[63 & n[2]]) : (t += e[n[1] << 2 & 60], t += "=", i = !0)) : (t += e[n[0] << 4 & 48], t += "=", t += "=", i = !0), o += 4, o >= 76 && (t += "\n", o = 0);
                return t
            },
            decodeBase64: function(e) {
                var t, n;
                for (r(e), e = "", t = Array(4), n = !1; !n && -1 !== (t[0] = s()) && -1 !== (t[1] = s());) t[2] = s(), t[3] = s(), e += c(t[0] << 2 & 255 | t[1] >> 4), -1 !== t[2] ? (e += c(t[1] << 4 & 255 | t[2] >> 2), -1 !== t[3] ? e += c(t[2] << 6 & 255 | t[3]) : n = !0) : n = !0;
                return e
            }
        }
    }(L),
    function() {
        function e() {
            (new L.ElementQueries).init()
        }
        this.L = this.L || {}, this.L.ElementQueries = function() {
            function e(e) {
                return e || (e = document.documentElement), e = getComputedStyle(e, "fontSize"), parseFloat(e) || 16
            }

            function t(t, n) {
                var o = n.replace(/[0-9]*/, ""),
                    n = parseFloat(n);
                switch (o) {
                    case "px":
                        return n;
                    case "em":
                        return n * e(t);
                    case "rem":
                        return n * e();
                    case "vw":
                        return n * document.documentElement.clientWidth / 100;
                    case "vh":
                        return n * document.documentElement.clientHeight / 100;
                    case "vmin":
                    case "vmax":
                        return n * (0, Math["vmin" === o ? "min" : "max"])(document.documentElement.clientWidth / 100, document.documentElement.clientHeight / 100);
                    default:
                        return n
                }
            }

            function n(e) {
                this.element = e, this.options = [];
                var n, o, i, r, a, s, c, d, u = 0,
                    l = 0;
                this.addOption = function(e) {
                    this.options.push(e)
                };
                var p = ["min-width", "min-height", "max-width", "max-height"];
                this.call = function() {
                    for (u = this.element.offsetWidth, l = this.element.offsetHeight, s = {}, n = 0, o = this.options.length; o > n; n++) i = this.options[n], r = t(this.element, i.value), a = "width" == i.property ? u : l, d = i.mode + "-" + i.property, c = "", "min" == i.mode && a >= r && (c += i.value), "max" == i.mode && r >= a && (c += i.value), s[d] || (s[d] = ""), c && -1 === (" " + s[d] + " ").indexOf(" " + c + " ") && (s[d] += " " + c);
                    for (var e in p) s[p[e]] ? this.element.setAttribute(p[e], s[p[e]].substr(1)) : this.element.removeAttribute(p[e])
                }
            }

            function o(e, t) {
                e.elementQueriesSetupInformation ? e.elementQueriesSetupInformation.addOption(t) : (e.elementQueriesSetupInformation = new n(e), e.elementQueriesSetupInformation.addOption(t), new ResizeSensor(e, function() {
                    e.elementQueriesSetupInformation.call()
                })), e.elementQueriesSetupInformation.call()
            }

            function i(e) {
                for (var t, e = e.replace(/'/g, '"'); null !== (t = a.exec(e));)
                    if (5 < t.length) {
                        var n = t[1] || t[5],
                            i = t[2],
                            r = t[3];
                        t = t[4];
                        var s = void 0;
                        if (document.querySelectorAll && (s = document.querySelectorAll.bind(document)), !s && "undefined" != typeof $$ && (s = $$), !s && "undefined" != typeof jQuery && (s = jQuery), !s) throw "No document.querySelectorAll, jQuery or Mootools's $$ found.";
                        for (var n = s(n), s = 0, c = n.length; c > s; s++) o(n[s], {
                            mode: i,
                            property: r,
                            value: t
                        })
                    }
            }

            function r(e) {
                var t = "";
                if (e)
                    if ("string" == typeof e) e = e.toLowerCase(), (-1 !== e.indexOf("min-width") || -1 !== e.indexOf("max-width")) && i(e);
                    else
                        for (var n = 0, o = e.length; o > n; n++) 1 === e[n].type ? (t = e[n].selectorText || e[n].cssText, -1 !== t.indexOf("min-height") || -1 !== t.indexOf("max-height") ? i(t) : (-1 !== t.indexOf("min-width") || -1 !== t.indexOf("max-width")) && i(t)) : 4 === e[n].type && r(e[n].cssRules || e[n].rules)
            }
            var a = /,?([^,\n]*)\[[\s\t]*(min|max)-(width|height)[\s\t]*[~$\^]?=[\s\t]*"([^"]*)"[\s\t]*]([^\n\s\{]*)/gim;
            this.init = function() {
                for (var e = 0, t = document.styleSheets.length; t > e; e++) r(document.styleSheets[e].cssText || document.styleSheets[e].cssRules || document.styleSheets[e].rules)
            }
        }, window.addEventListener ? window.addEventListener("load", e, !1) : window.attachEvent("onload", e), this.L.ResizeSensor = function(e, t) {
            function n(e, t) {
                window.OverflowEvent ? e.addEventListener("overflowchanged", function(e) {
                    t.call(this, e)
                }) : (e.addEventListener("overflow", function(e) {
                    t.call(this, e)
                }), e.addEventListener("underflow", function(e) {
                    t.call(this, e)
                }))
            }

            function o() {
                this.q = [], this.add = function(e) {
                    this.q.push(e)
                };
                var e, t;
                this.call = function() {
                    for (e = 0, t = this.q.length; t > e; e++) this.q[e].call()
                }
            }

            function i(e, t) {
                function i() {
                    var t = !1,
                        n = e.resizeSensor.offsetWidth,
                        o = e.resizeSensor.offsetHeight;
                    return a != n && (c.width = n - 1 + "px", d.width = n + 1 + "px", t = !0, a = n), s != o && (c.height = o - 1 + "px", d.height = o + 1 + "px", t = !0, s = o), t
                }
                if (e.resizedAttached) {
                    if (e.resizedAttached) return void e.resizedAttached.add(t)
                } else e.resizedAttached = new o, e.resizedAttached.add(t);
                var r = function() {
                    i() && e.resizedAttached.call()
                };
                e.resizeSensor = document.createElement("div"), e.resizeSensor.className = "resize-sensor", e.resizeSensor.style.cssText = "position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1;", e.resizeSensor.innerHTML = '<div class="resize-sensor-overflow" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1;"><div></div></div><div class="resize-sensor-underflow" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1;"><div></div></div>', e.appendChild(e.resizeSensor), "absolute" !== (e.currentStyle ? e.currentStyle.position : window.getComputedStyle ? window.getComputedStyle(e, null).getPropertyValue("position") : e.style.position) && (e.style.position = "relative");
                var a = -1,
                    s = -1,
                    c = e.resizeSensor.firstElementChild.firstChild.style,
                    d = e.resizeSensor.lastElementChild.firstChild.style;
                i(), n(e.resizeSensor, r), n(e.resizeSensor.firstElementChild, r), n(e.resizeSensor.lastElementChild, r)
            }
            if ("array" == typeof e || "undefined" != typeof jQuery && e instanceof jQuery || "undefined" != typeof Elements && e instanceof Elements)
                for (var r = 0, a = e.length; a > r; r++) i(e[r], t);
            else i(e, t)
        }
    }(), Erizo = Erizo || {}, Erizo.View = function() {
        var e = Erizo.EventDispatcher({});
        return e.url = "http://chotis2.dit.upm.es:3000", e
    }, Erizo = Erizo || {}, Erizo.VideoPlayer = function(e) {
        var t = Erizo.View({});
        return t.id = e.id, t.stream = e.stream.stream, t.elementID = e.elementID, t.destroy = function() {
            t.video.pause(), delete t.resizer, t.parentNode.removeChild(t.div)
        }, t.resize = function() {
            var n = t.container.offsetWidth,
                o = t.container.offsetHeight;
            e.stream.screen || !1 === e.options.crop ? o > .5625 * n ? (t.video.style.width = n + "px", t.video.style.height = .5625 * n + "px", t.video.style.top = -(.5625 * n / 2 - o / 2) + "px", t.video.style.left = "0px") : (t.video.style.height = o + "px", t.video.style.width = 16 / 9 * o + "px", t.video.style.left = -(16 / 9 * o / 2 - n / 2) + "px", t.video.style.top = "0px") : (n !== t.containerWidth || o !== t.containerHeight) && (.75 * n > o ? (t.video.style.width = n + "px", t.video.style.height = .75 * n + "px", t.video.style.top = -(.75 * n / 2 - o / 2) + "px", t.video.style.left = "0px") : (t.video.style.height = o + "px", t.video.style.width = 4 / 3 * o + "px", t.video.style.left = -(4 / 3 * o / 2 - n / 2) + "px", t.video.style.top = "0px")), t.containerWidth = n, t.containerHeight = o
        }, L.Logger.debug("Creating URL from stream " + t.stream), t.stream_url = (window.URL || webkitURL).createObjectURL(t.stream), t.div = document.createElement("div"), t.div.setAttribute("id", "player_" + t.id), t.div.setAttribute("style", "width: 100%; height: 100%; position: relative; background-color: black; overflow: hidden;"), t.loader = document.createElement("img"), t.loader.setAttribute("style", "width: 16px; height: 16px; position: absolute; top: 50%; left: 50%; margin-top: -8px; margin-left: -8px"), t.loader.setAttribute("id", "back_" + t.id), t.loader.setAttribute("src", "/assets/loader.gif"), t.video = document.createElement("video"), t.video.setAttribute("id", "stream" + t.id), t.video.setAttribute("style", "width: 100%; height: 100%; position: absolute"), t.video.setAttribute("autoplay", "autoplay"), e.stream.local && (t.video.volume = 0), void 0 !== t.elementID ? (document.getElementById(t.elementID).appendChild(t.div), t.container = document.getElementById(t.elementID)) : (document.body.appendChild(t.div), t.container = document.body), t.parentNode = t.div.parentNode, t.div.appendChild(t.loader), t.div.appendChild(t.video), t.containerWidth = 0, t.containerHeight = 0, t.resizer = new L.ResizeSensor(t.container, t.resize), t.resize(), t.bar = new Erizo.Bar({
            elementID: "player_" + t.id,
            id: t.id,
            stream: e.stream,
            media: t.video,
            options: e.options
        }), t.div.onmouseover = function() {
            t.bar.display()
        }, t.div.onmouseout = function() {
            t.bar.hide()
        }, t.video.src = t.stream_url, t
    }, Erizo = Erizo || {}, Erizo.AudioPlayer = function(e) {
        var t, n, o = Erizo.View({});
        return o.id = e.id, o.stream = e.stream.stream, o.elementID = e.elementID, L.Logger.debug("Creating URL from stream " + o.stream), o.stream_url = (window.URL || webkitURL).createObjectURL(o.stream), o.audio = document.createElement("audio"), o.audio.setAttribute("id", "stream" + o.id), o.audio.setAttribute("style", "width: 100%; height: 100%; position: absolute"), o.audio.setAttribute("autoplay", "autoplay"), e.stream.local && (o.audio.volume = 0), e.stream.local && (o.audio.volume = 0), void 0 !== o.elementID ? (o.destroy = function() {
            o.audio.pause(), o.parentNode.removeChild(o.div)
        }, t = function() {
            o.bar.display()
        }, n = function() {
            o.bar.hide()
        }, o.div = document.createElement("div"), o.div.setAttribute("id", "player_" + o.id), o.div.setAttribute("style", "width: 100%; height: 100%; position: relative; overflow: hidden;"), document.getElementById(o.elementID).appendChild(o.div), o.container = document.getElementById(o.elementID), o.parentNode = o.div.parentNode, o.div.appendChild(o.audio), o.bar = new Erizo.Bar({
            elementID: "player_" + o.id,
            id: o.id,
            stream: e.stream,
            media: o.audio,
            options: e.options
        }), o.div.onmouseover = t, o.div.onmouseout = n) : (o.destroy = function() {
            o.audio.pause(), o.parentNode.removeChild(o.audio)
        }, document.body.appendChild(o.audio), o.parentNode = document.body), o.audio.src = o.stream_url, o
    }, Erizo = Erizo || {}, Erizo.Bar = function(e) {
        var t, n, o = Erizo.View({});
        return o.elementID = e.elementID, o.id = e.id, o.div = document.createElement("div"), o.div.setAttribute("id", "bar_" + o.id), o.bar = document.createElement("div"), o.bar.setAttribute("style", "width: 100%; height: 15%; max-height: 30px; position: absolute; bottom: 0; right: 0; background-color: rgba(255,255,255,0.62)"), o.bar.setAttribute("id", "subbar_" + o.id), o.link = document.createElement("a"), o.link.setAttribute("href", "http://www.lynckia.com/"), o.link.setAttribute("target", "_blank"), o.logo = document.createElement("img"), o.logo.setAttribute("style", "width: 100%; height: 100%; max-width: 30px; position: absolute; top: 0; left: 2px;"), o.logo.setAttribute("alt", "Lynckia"), o.logo.setAttribute("src", "/assets/star.svg"), n = function(e) {
            "block" !== e ? e = "none" : clearTimeout(t), o.div.setAttribute("style", "width: 100%; height: 100%; position: relative; bottom: 0; right: 0; display:" + e)
        }, o.display = function() {
            n("block")
        }, o.hide = function() {
            t = setTimeout(n, 1e3)
        }, document.getElementById(o.elementID).appendChild(o.div), o.div.appendChild(o.bar), o.bar.appendChild(o.link)/*, o.link.appendChild(o.logo)*/, e.stream.screen || void 0 !== e.options && void 0 !== e.options.speaker && !0 !== e.options.speaker || (o.speaker = new Erizo.Speaker({
            elementID: "subbar_" + o.id,
            id: o.id,
            stream: e.stream,
            media: e.media
        })), o.display(), o.hide(), o
    }, Erizo = Erizo || {}, Erizo.Speaker = function(e) {
        var t, n, o, i = Erizo.View({}),
            r = 50;
        return i.elementID = e.elementID, i.media = e.media, i.id = e.id, i.stream = e.stream, i.div = document.createElement("div"), i.div.setAttribute("style", "width: 40%; height: 100%; max-width: 32px; position: absolute; right: 0;z-index:0;"), i.icon = document.createElement("img"), i.icon.setAttribute("id", "volume_" + i.id), i.icon.setAttribute("src", "/assets/sound48.png"), i.icon.setAttribute("style", "width: 80%; height: 100%; position: absolute;"), i.div.appendChild(i.icon), i.stream.local ? (n = function() {
            i.media.muted = !0, i.icon.setAttribute("src", "/assets/mute48.png"), i.stream.stream.getAudioTracks()[0].enabled = !1
        }, o = function() {
            i.media.muted = !1, i.icon.setAttribute("src", "/assets/sound48.png"), i.stream.stream.getAudioTracks()[0].enabled = !0
        }, i.icon.onclick = function() {
            i.media.muted ? o() : n()
        }) : (i.picker = document.createElement("input"), i.picker.setAttribute("id", "picker_" + i.id), i.picker.type = "range", i.picker.min = 0, i.picker.max = 100, i.picker.step = 10, i.picker.value = r, i.picker.setAttribute("orient", "vertical"), i.div.appendChild(i.picker), i.media.volume = i.picker.value / 100, i.media.muted = !1, i.picker.oninput = function() {
            0 < i.picker.value ? (i.media.muted = !1, i.icon.setAttribute("src", "/assets/sound48.png")) : (i.media.muted = !0, i.icon.setAttribute("src", i.url + "/assets/mute48.png")), i.media.volume = i.picker.value / 100
        }, t = function(e) {
            i.picker.setAttribute("style", "background: transparent; width: 32px; height: 100px; position: absolute; bottom: 90%; z-index: 1;" + i.div.offsetHeight + "px; right: 0px; -webkit-appearance: slider-vertical; display: " + e)
        }, n = function() {
            i.icon.setAttribute("src", "/assets/mute48.png"), r = i.picker.value, i.picker.value = 0, i.media.volume = 0, i.media.muted = !0
        }, o = function() {
            i.icon.setAttribute("src", "/assets/sound48.png"), i.picker.value = r, i.media.volume = i.picker.value / 100, i.media.muted = !1
        }, i.icon.onclick = function() {
            i.media.muted ? o() : n()
        }, i.div.onmouseover = function() {
            t("block")
        }, i.div.onmouseout = function() {
            t("none")
        }, t("none")), document.getElementById(i.elementID).appendChild(i.div), i
    };