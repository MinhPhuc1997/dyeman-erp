/*
 * @Author: Lyl
 * @Date: 2021-06-12 18:47:44
 * @LastEditors: Lyl
 * @LastEditTime: 2021-06-12 18:47:45
 * @Description:
 */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs = saveAs || "undefined" !== typeof navigator && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator) || function (a) {
  "use strict"; if ("undefined" === typeof navigator || !/MSIE [1-9]\./.test(navigator.userAgent)) {
    var k = a.document, n = k.createElementNS("http://www.w3.org/1999/xhtml", "a"), w = "download" in n, x = function (c) { var e = k.createEvent("MouseEvents"); e.initMouseEvent("click", !0, !1, a, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null); c.dispatchEvent(e) }, q = a.webkitRequestFileSystem, u = a.requestFileSystem || q || a.mozRequestFileSystem,
      y = function (c) { (a.setImmediate || a.setTimeout)(function () { throw c; }, 0) }, r = 0, s = function (c) { var e = function () { "string" === typeof c ? (a.URL || a.webkitURL || a).revokeObjectURL(c) : c.remove() }; a.chrome ? e() : setTimeout(e, 500) }, t = function (c, a, d) { a = [].concat(a); for (var b = a.length; b--;) { var l = c["on" + a[b]]; if ("function" === typeof l) try { l.call(c, d || c) } catch (f) { y(f) } } }, m = function (c, e) {
        var d = this, b = c.type, l = !1, f, p, k = function () { t(d, ["writestart", "progress", "write", "writeend"]) }, g = function () {
          if (l || !f) f = (a.URL || a.webkitURL ||
            a).createObjectURL(c); p ? p.location.href = f : void 0 == a.open(f, "_blank") && "undefined" !== typeof safari && (a.location.href = f); d.readyState = d.DONE; k(); s(f)
        }, h = function (a) { return function () { if (d.readyState !== d.DONE) return a.apply(this, arguments) } }, m = { create: !0, exclusive: !1 }, v; d.readyState = d.INIT; e || (e = "download"); if (w) f = (a.URL || a.webkitURL || a).createObjectURL(c), n.href = f, n.download = e, x(n), d.readyState = d.DONE, k(), s(f); else {
          a.chrome && b && "application/octet-stream" !== b && (v = c.slice || c.webkitSlice, c = v.call(c, 0,
            c.size, "application/octet-stream"), l = !0); q && "download" !== e && (e += ".download"); if ("application/octet-stream" === b || q) p = a; u ? (r += c.size, u(a.TEMPORARY, r, h(function (a) {
              a.root.getDirectory("saved", m, h(function (a) {
                var b = function () {
                  a.getFile(e, m, h(function (a) {
                    a.createWriter(h(function (b) {
                      b.onwriteend = function (b) { p.location.href = a.toURL(); d.readyState = d.DONE; t(d, "writeend", b); s(a) }; b.onerror = function () { var a = b.error; a.code !== a.ABORT_ERR && g() };["writestart", "progress", "write", "abort"].forEach(function (a) {
                        b["on" +
                          a] = d["on" + a]
                      }); b.write(c); d.abort = function () { b.abort(); d.readyState = d.DONE }; d.readyState = d.WRITING
                    }), g)
                  }), g)
                }; a.getFile(e, { create: !1 }, h(function (a) { a.remove(); b() }), h(function (a) { a.code === a.NOT_FOUND_ERR ? b() : g() }))
              }), g)
            }), g)) : g()
        }
      }, b = m.prototype; b.abort = function () { this.readyState = this.DONE; t(this, "abort") }; b.readyState = b.INIT = 0; b.WRITING = 1; b.DONE = 2; b.error = b.onwritestart = b.onprogress = b.onwrite = b.onabort = b.onerror = b.onwriteend = null; return function (a, b) { return new m(a, b) }
  }
}("undefined" !== typeof self &&
  self || "undefined" !== typeof window && window || this.content); "undefined" !== typeof module && null !== module ? module.exports = saveAs : "undefined" !== typeof define && null !== define && null != define.amd && define([], function () { return saveAs });