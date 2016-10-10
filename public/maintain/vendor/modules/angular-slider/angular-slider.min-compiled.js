/*
 angular-slider v0.3.2 
 (c) 2013-2014 Venturocket, Inc. http://github.com/Venturocket 
 License: MIT 
*/
window.AngularSlider = function (a, b, c) {
  function d(a) {
    n.cssText = a;
  }function e(a, b) {
    return typeof a === b;
  }function f() {
    j.inputtypes = function (a) {
      for (var d, e, f, g = 0, h = a.length; h > g; g++) o.setAttribute("type", e = a[g]), d = "text" !== o.type, d && (o.value = p, o.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(e) && o.style.WebkitAppearance !== c ? (k.appendChild(o), f = b.defaultView, d = f.getComputedStyle && "textfield" !== f.getComputedStyle(o, null).WebkitAppearance && 0 !== o.offsetHeight, k.removeChild(o)) : /^(search|tel)$/.test(e) || (d = /^(url|email)$/.test(e) ? o.checkValidity && o.checkValidity() === !1 : o.value != p)), r[a[g]] = !!d;return r;
    }("search tel url email datetime date month week time datetime-local number range color".split(" "));
  }var g,
      h,
      i = "2.7.1",
      j = {},
      k = b.documentElement,
      l = "modernizr",
      m = b.createElement(l),
      n = m.style,
      o = b.createElement("input"),
      p = ":)",
      q = ({}.toString, {}),
      r = {},
      s = [],
      t = s.slice,
      u = {}.hasOwnProperty;h = e(u, "undefined") || e(u.call, "undefined") ? function (a, b) {
    return b in a && e(a.constructor.prototype[b], "undefined");
  } : function (a, b) {
    return u.call(a, b);
  }, Function.prototype.bind || (Function.prototype.bind = function (a) {
    var b = this;if ("function" != typeof b) throw new TypeError();var c = t.call(arguments, 1),
        d = function () {
      if (this instanceof d) {
        var e = function () {};e.prototype = b.prototype;var f = new e(),
            g = b.apply(f, c.concat(t.call(arguments)));return Object(g) === g ? g : f;
      }return b.apply(a, c.concat(t.call(arguments)));
    };return d;
  });for (var v in q) h(q, v) && (g = v.toLowerCase(), j[g] = q[v](), s.push((j[g] ? "" : "no-") + g));return j.input || f(), j.addTest = function (a, b) {
    if ("object" == typeof a) for (var d in a) h(a, d) && j.addTest(d, a[d]);else {
      if (a = a.toLowerCase(), j[a] !== c) return j;b = "function" == typeof b ? b() : b, "undefined" != typeof enableClasses && enableClasses && (k.className += " " + (b ? "" : "no-") + a), j[a] = b;
    }return j;
  }, d(""), m = o = null, j._version = i, j;
}(this, this.document), function (a, b, c) {
  function d(a) {
    return "[object Function]" == q.call(a);
  }function e(a) {
    return "string" == typeof a;
  }function f() {}function g(a) {
    return !a || "loaded" == a || "complete" == a || "uninitialized" == a;
  }function h() {
    var a = r.shift();s = 1, a ? a.t ? o(function () {
      ("c" == a.t ? m.injectCss : m.injectJs)(a.s, 0, a.a, a.x, a.e, 1);
    }, 0) : (a(), h()) : s = 0;
  }function i(a, c, d, e, f, i, j) {
    function k(b) {
      if (!n && g(l.readyState) && (t.r = n = 1, !s && h(), l.onload = l.onreadystatechange = null, b)) {
        "img" != a && o(function () {
          v.removeChild(l);
        }, 50);for (var d in A[c]) A[c].hasOwnProperty(d) && A[c][d].onload();
      }
    }var j = j || m.errorTimeout,
        l = b.createElement(a),
        n = 0,
        q = 0,
        t = { t: d, s: c, e: f, a: i, x: j };1 === A[c] && (q = 1, A[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function () {
      k.call(this, q);
    }, r.splice(e, 0, t), "img" != a && (q || 2 === A[c] ? (v.insertBefore(l, u ? null : p), o(k, j)) : A[c].push(l));
  }function j(a, b, c, d, f) {
    return s = 0, b = b || "j", e(a) ? i("c" == b ? x : w, a, b, this.i++, c, d, f) : (r.splice(this.i++, 0, a), 1 == r.length && h()), this;
  }function k() {
    var a = m;return a.loader = { load: j, i: 0 }, a;
  }var l,
      m,
      n = b.documentElement,
      o = a.setTimeout,
      p = b.getElementsByTagName("script")[0],
      q = {}.toString,
      r = [],
      s = 0,
      t = "MozAppearance" in n.style,
      u = t && !!b.createRange().compareNode,
      v = u ? n : p.parentNode,
      n = a.opera && "[object Opera]" == q.call(a.opera),
      n = !!b.attachEvent && !n,
      w = t ? "object" : n ? "script" : "img",
      x = n ? "script" : w,
      y = Array.isArray || function (a) {
    return "[object Array]" == q.call(a);
  },
      z = [],
      A = {},
      B = { timeout: function (a, b) {
      return b.length && (a.timeout = b[0]), a;
    } };m = function (a) {
    function b(a) {
      var b,
          c,
          d,
          a = a.split("!"),
          e = z.length,
          f = a.pop(),
          g = a.length,
          f = { url: f, origUrl: f, prefixes: a };for (c = 0; g > c; c++) d = a[c].split("="), (b = B[d.shift()]) && (f = b(f, d));for (c = 0; e > c; c++) f = z[c](f);return f;
    }function g(a, e, f, g, h) {
      var i = b(a),
          j = i.autoCallback;i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (A[i.url] ? i.noexec = !0 : A[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function () {
        k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), A[i.url] = 2;
      })));
    }function h(a, b) {
      function c(a, c) {
        if (a) {
          if (e(a)) c || (l = function () {
            var a = [].slice.call(arguments);m.apply(this, a), n();
          }), g(a, l, b, 0, j);else if (Object(a) === a) for (i in h = function () {
            var b,
                c = 0;for (b in a) a.hasOwnProperty(b) && c++;return c;
          }(), a) a.hasOwnProperty(i) && (!c && ! --h && (d(l) ? l = function () {
            var a = [].slice.call(arguments);m.apply(this, a), n();
          } : l[i] = function (a) {
            return function () {
              var b = [].slice.call(arguments);a && a.apply(this, b), n();
            };
          }(m[i])), g(a[i], l, b, i, j));
        } else !c && n();
      }var h,
          i,
          j = !!a.test,
          k = a.load || a.both,
          l = a.callback || f,
          m = l,
          n = a.complete || f;c(j ? a.yep : a.nope, !!k), k && c(k);
    }var i,
        j,
        l = this.yepnope.loader;if (e(a)) g(a, 0, l, 0);else if (y(a)) for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : y(j) ? m(j) : Object(j) === j && h(j, l);else Object(a) === a && h(a, l);
  }, m.addPrefix = function (a, b) {
    B[a] = b;
  }, m.addFilter = function (a) {
    z.push(a);
  }, m.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", l = function () {
    b.removeEventListener("DOMContentLoaded", l, 0), b.readyState = "complete";
  }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function (a, c, d, e, i, j) {
    var k,
        l,
        n = b.createElement("script"),
        e = e || m.errorTimeout;n.src = a;for (l in d) n.setAttribute(l, d[l]);c = j ? h : c || f, n.onreadystatechange = n.onload = function () {
      !k && g(n.readyState) && (k = 1, c(), n.onload = n.onreadystatechange = null);
    }, o(function () {
      k || (k = 1, c(1));
    }, e), i ? n.onload() : p.parentNode.insertBefore(n, p);
  }, a.yepnope.injectCss = function (a, c, d, e, g, i) {
    var j,
        e = b.createElement("link"),
        c = i ? h : c || f;e.href = a, e.rel = "stylesheet", e.type = "text/css";for (j in d) e.setAttribute(j, d[j]);g || (p.parentNode.insertBefore(e, p), o(c, 0));
  };
}(this, document), AngularSlider.load = function () {
  yepnope.apply(window, [].slice.call(arguments, 0));
}, angular.module("vr.directives.slider", ["ngTouch"]).directive("slider", ["$timeout", "$document", "$interpolate", "$swipe", function (a, b, c, d) {
  function e(a) {
    return angular.element(a);
  }function f(a) {
    return "" + a + "px";
  }function g(a, b) {
    return a.css({ opacity: b });
  }function h(a) {
    return g(a, 0);
  }function i(a) {
    return g(a, 1);
  }function j(a, b) {
    return a.css({ left: b });
  }function k(a) {
    var b = parseFloat(a.css("width"));return isNaN(b) ? a[0].offsetWidth : b;
  }function l(a) {
    return k(a) / 2;
  }function m(a) {
    try {
      return a.offset().left;
    } catch (b) {}return a[0].getBoundingClientRect().left;
  }function n(a, b) {
    return m(a) > m(b) ? m(a) - m(b) - k(b) : m(b) - m(a) - k(a);
  }function o(a, b) {
    return a.attr("ng-bind-template", b);
  }function p(a, b, c, d, e) {
    (angular.isUndefined(b) || !b) && (b = 0), (angular.isUndefined(c) || !c || 0 == c) && (c = 1 / Math.pow(10, b)), (angular.isUndefined(d) || !d) && (d = 0), (angular.isUndefined(a) || !a) && (a = 0);var f = (a - d) % c,
        g = f > c / 2 ? a + c - f : a - f;return (angular.isUndefined(e) || !e) && (e = g), g = Math.min(Math.max(g, d), e), parseFloat(g.toFixed(b));
  }function q(a, b) {
    return Math.floor(a / b + .5) * b;
  }function r(a, b) {
    return a > 0 && !isNaN(b) ? Math.ceil(b / a) * a : b;
  }function s(a) {
    return u + " " + a + " " + v;
  }var t = 3,
      u = c.startSymbol(),
      v = c.endSymbol();return { restrict: "EA", require: "ngModel", scope: { floor: "@", ceiling: "@", step: "@", stepWidth: "@", precision: "@", buffer: "@", stickiness: "@", showSteps: "@", ngModel: "=", ngModelRange: "=", ngDisabled: "=", ngChange: "&", translateFn: "&", translateRangeFn: "&", translateCombinedFn: "&", scaleFn: "&", inverseScaleFn: "&" }, template: "<span class='bar full'></span><span class='bar steps'><span class='bubble step' ng-repeat='step in stepBubbles()'></span></span><span class='bar selection'></span><span class='bar unselected low'></span><span class='bar unselected high'></span><span class='pointer low'></span><span class='pointer high'></span><span class='bubble low'></span><span class='bubble high'></span><span class='bubble middle'></span><span class='bubble selection'></span><span class='bubble limit floor'></span><span class='bubble limit ceiling'></span><input type='range' class='input low' /><input type='range' class='input high' /><input type='range' class='input selection' />", compile: function (c, g) {
      function u(a) {
        a || (a = c);var b = [];return angular.forEach(a.children(), function (a) {
          b.push(e(a));
        }), b;
      }function v(a, b, c) {
        return { fullBar: a[0], stepBubs: a[1], selBar: b ? a[2] : null, unSelBarLow: b ? a[3] : null, unSelBarHigh: b ? a[4] : null, minPtr: b ? a[5] : a[2], maxPtr: b ? a[6] : null, lowBub: b ? a[7] : a[3], highBub: b ? a[8] : null, cmbBub: b ? a[9] : null, selBub: b ? a[10] : null, flrBub: b ? a[11] : a[4], ceilBub: b ? a[12] : a[5], minInput: c ? b ? a[13] : a[6] : null, maxInput: c ? b ? a[14] : null : null, selInput: c ? b ? a[15] : null : null };
      }var w = g.showSteps,
          x = g.stepWidth ? "stepWidth" : "step",
          y = null != g.ngModelRange,
          z = {},
          A = "ngModel",
          B = "ngModelRange",
          C = "selectBar",
          D = ["floor", "ceiling", "stickiness", A];if (z = function () {
        for (var a = u(), b = [], c = 0, d = a.length; d > c; c++) {
          var f = a[c];f = e(f), f.css({ "white-space": "nowrap", position: "absolute", display: "block", "z-index": 1 }), b.push(f);
        }return b;
      }(), z = v(z, !0, !0), g.translateFn && g.$set("translateFn", "" + g.translateFn + "(value)"), g.translateRangeFn && g.$set("translateRangeFnFn", "" + g.translateRangeFn + "(low,high)"), g.translateCombinedFn && g.$set("translateCombinedFnFn", "" + g.translateCombinedFn + "(low,high)"), g.scaleFn && g.$set("scaleFn", "" + g.scaleFn + "(value)"), g.inverseScaleFn && g.$set("inverseScaleFn", "" + g.inverseScaleFn + "(value)"), z.fullBar.css({ left: 0, right: 0 }), AngularSlider.inputtypes.range) {
        var E = { position: "absolute", margin: 0, padding: 0, opacity: 0, height: "100%" };z.minInput.attr("step", s("inputSteps()")), z.minInput.attr("min", s("floor")), z.minInput.css(E), z.minInput.css("left", 0), y ? (z.minInput.attr("max", s("ngModelRange - (buffer / 2)")), z.maxInput.attr("step", s("inputSteps()")), z.maxInput.attr("min", s("ngModel + (buffer / 2)")), z.maxInput.attr("max", s("ceiling")), z.maxInput.css(E), z.selInput.attr("step", s("inputSteps()")), z.selInput.attr("min", s("ngModel")), z.selInput.attr("max", s("ngModelRange")), z.selInput.css(E)) : (z.minInput.attr("max", s("ceiling")), z.minInput.css({ width: "100%" }), z.maxInput.remove(), z.selInput.remove());
      } else z.minInput.remove(), z.maxInput.remove(), z.selInput.remove();if (o(z.stepBubs.children().eq(0), s("translation(step)")), o(z.ceilBub, s("translation(ceiling)")), o(z.flrBub, s("translation(floor)")), o(z.selBub, s("rangeTranslation(" + A + "," + B + ")")), o(z.lowBub, s("translation(" + A + ")")), o(z.highBub, s("translation(" + B + ")")), o(z.cmbBub, s("combinedTranslation(" + A + "," + B + ")")), y) D.push(B), D.unshift("buffer");else for (var F = [z.selBar, z.unSelBarLow, z.unSelBarHigh, z.maxPtr, z.selBub, z.highBub, z.cmbBub], G = 0, H = F.length; H > G; G++) c = F[G], c.remove();return D.unshift("precision", x), w || z.stepBubs.children().remove(), { post: function (c, g, o, s) {
          function w() {
            if (angular.forEach(D, function (a) {
              c[a] = parseFloat(c[a]), a == A || a == B ? c[a] = p(c[a], c.precision, c[x], c.floor, c.ceiling) : "buffer" == a ? c.buffer = !c.buffer || isNaN(c.buffer) || c.buffer < 0 ? 0 : r(c[x], c.buffer) : "precision" == a ? c.precision = !c.precision || isNaN(c.precision) ? 0 : parseInt(c.precision) : a == x ? c[x] = !c[x] || isNaN(c[x]) ? 1 / Math.pow(10, c.precision) : parseFloat(c[x].toFixed(c.precision)) : "stickiness" == a && (isNaN(c.stickiness) ? c.stickiness = t : c.stickiness < 1 && (c.stickiness = 1)), c.decodedValues[a] = c.decodeRef(a);
            }), y) {
              if (c[B] < c[A]) {
                var a = c[B];c[B] = c[A], c[A] = a;
              }var b = p(c[B] - c[A], c.precision, c[x]);if (c.buffer > 0 && b < c.buffer) {
                var d = c.encode((c.decodedValues[A] + c.decodedValues[B]) / 2);c[A] = p(d - c.buffer / 2, c.precision, c[x], c.floor, c.ceiling), c[B] = c[A] + c.buffer, c[B] > c.ceiling && (c[B] = c.ceiling, c[A] = c.ceiling - c.buffer);
              }
            }F = k(E.fullBar), G = l(E.minPtr), H = m(E.fullBar), I = H + F - k(E.minPtr), J = I - H, K = c.floor, L = c.decodedValues.floor, M = c.ceiling, N = c.decodedValues.ceiling, O = M - K, P = N - L, Q = q(P, c.decodedValues[x]);
          }function z() {
            function a(a) {
              return 100 * ((a - H) / J);
            }function o(b) {
              return a(b) / 100 * P + L;
            }function r(a) {
              return c.encode(o(a));
            }function t(a) {
              var b = a - L;return O == P ? b = q(b, c.decodedValues[x]) / Q : b /= P, 100 * b;
            }function u(a) {
              return t(c.decode(a));
            }function v(a) {
              return f(a * J / 100);
            }function z(a) {
              return Math.min(Math.max(a, H), I);
            }function D(b) {
              return j(b, v(a(z(m(b)))));
            }function N(a, b, d) {
              var e = a > 0 ? 1 : -1;return b = b ? b : 100, d ? (Math.sin(Math.min(Math.abs(a / b), 1) * Math.PI - Math.PI / 2) + 1) * e * b / 6 : e * Math.pow(Math.min(Math.abs(2 * (a / b)), 1), c.stickiness) * b / 2;
            }function U() {
              var b = t(c.decodedValues[A]),
                  d = u(c[A] + c[x]) - b,
                  e = b - u(c[A] - c[x]),
                  f = u(c[A] + c.buffer) - b,
                  g = a(G + H),
                  h = b + N(R, R > 0 ? d : e);if (j(E.minPtr, v(h)), j(E.lowBub, v(a(m(E.minPtr) - l(E.lowBub) + G))), y) {
                var i = t(c.decodedValues[B]),
                    k = u(c[B] + c[x]) - i,
                    n = i - u(c[B] - c[x]),
                    o = i - u(c[B] - c.buffer),
                    p = i + N(S, S > 0 ? k : n);if (h > i - o && (h = b + N(R, f, !0), j(E.minPtr, v(h)), j(E.lowBub, v(a(m(E.minPtr) - l(E.lowBub) + G)))), b + f > p && (p = i + N(S, o, !0)), j(E.maxPtr, v(p)), j(E.highBub, v(a(m(E.maxPtr) - l(E.highBub) + G))), j(E.selBar, v(h + g)), E.selBar.css({ width: v(p - h) }), j(E.selBub, v((h + p) / 2 - a(l(E.selBub) + H) + g)), j(E.cmbBub, v((h + p) / 2 - a(l(E.cmbBub) + H) + g)), E.unSelBarLow.css({ left: 0, width: v(h + g) }), j(E.unSelBarHigh, v(p + g)), E.unSelBarHigh.css({ right: 0 }), AngularSlider.inputtypes.range) {
                  var q = 2 * g,
                      r = h + f / 2,
                      s = 100 - r;r += q;var w = p - o / 2,
                      z = h + q,
                      C = p - h - q;h + q >= p && (z = h, C = p + q - h), E.minInput.css({ width: v(w) }), E.maxInput.css({ left: v(r), width: v(s) }), E.selInput.css({ left: v(z), width: v(C) });
                }
              }
            }function V() {
              var a = E.lowBub;D(E.lowBub), y && (D(E.highBub), D(E.selBub), n(E.lowBub, E.highBub) < 10 ? (h(E.lowBub), h(E.highBub), i(E.cmbBub), D(E.cmbBub), a = E.cmbBub) : (i(E.lowBub), i(E.highBub), h(E.cmbBub), a = E.highBub)), n(E.flrBub, E.lowBub) < 5 ? h(E.flrBub) : y ? n(E.flrBub, a) < 5 ? h(E.flrBub) : i(E.flrBub) : i(E.flrBub), n(E.lowBub, E.ceilBub) < 5 ? h(E.ceilBub) : y ? n(a, E.ceilBub) < 5 ? h(E.ceilBub) : i(E.ceilBub) : i(E.ceilBub);
            }function W() {
              R = 0, S = 0, bb && (U(), V(), bb.removeClass("active")), bb = null, cb = null, $ = !1;
            }function X(b) {
              bb && c.$apply(function () {
                var d = b.clientX || b.x;if ($) {
                  var e = r(d) - _,
                      f = r(d) + ab;K > e ? (f += K - e, e = K) : f > M && (e -= f - M, f = M);var h = u(e),
                      i = u(f);R = h, S = i, c[A] = e = p(e, c.precision, c[x], c.floor, c.ceiling), c[B] = f = p(f, c.precision, c[x], c.floor, c.ceiling), R -= u(e), S -= u(f);
                } else {
                  var j = z(d + H - m(g) - l(bb)),
                      k = a(j),
                      n = c.encode(L + P * k / 100);if (R = k, y) if (c.buffer > 0) cb === A ? n > c[B] - c.buffer && (n = c[B] - c.buffer) : n < c[A] + c.buffer && (n = c[A] + c.buffer);else if (cb === A) {
                    if (n > c[B]) {
                      c[A] = c[B], c.decodedValues[A] = c.decodeRef(A), cb = B;var o = E.minPtr;E.minPtr = E.maxPtr, E.maxPtr = o, E.maxPtr.removeClass("active").removeClass("high").addClass("low"), E.minPtr.addClass("active").removeClass("low").addClass("high");
                    }
                  } else if (n < c[A]) {
                    c[B] = c[A], c.decodedValues[B] = c.decodeRef(B), cb = A;var o = E.minPtr;E.minPtr = E.maxPtr, E.maxPtr = o, E.minPtr.removeClass("active").removeClass("low").addClass("high"), E.maxPtr.addClass("active").removeClass("high").addClass("low");
                  }c[cb] = n = p(n, c.precision, c[x], c.floor, c.ceiling), c.decodedValues[cb] = c.decodeRef(cb), cb === A ? (R -= u(n), S = 0) : (S = R - u(n), R = 0);
                }c.ngChange && c.ngChange(), s.$setViewValue(c[A]), U(), V();
              });
            }function Y(a, b, d) {
              if (!c.ngDisabled || 1 != c.ngDisabled) {
                var e = a.clientX || a.x;if (bb = b, cb = d, bb.addClass("active"), cb == C) {
                  $ = !0;var f = r(e);_ = f - c[A], ab = c[B] - f;
                }X(a);
              }
            }function Z() {
              function a(a, b, c) {
                function f(a) {
                  Y(a, b, c);
                }function g(a) {
                  X(a), W();
                }a = e(a), d.bind(a, { start: f, move: X, end: g, cancel: W });
              }function c(a, b, c) {
                a = e(a), c = angular.isUndefined(c) ? a : e(c), d.bind(a, { start: function (a) {
                    Y(a, c, b);
                  } });
              }function f(a) {
                a = e(a), d.bind(a, { move: X, end: function (a) {
                    X(a), W();
                  }, cancel: W });
              }AngularSlider.inputtypes.range ? (a(E.minInput, E.minPtr, A), y && (a(E.maxInput, E.maxPtr, B), a(E.selInput, E.selBar, C))) : (f(b), c(E.minPtr, A), c(E.lowBub, A), c(E.flrBub, A, E.minPtr), y ? (c(E.maxPtr, B), c(E.highBub, B), c(E.ceilBub, B, E.maxPtr), c(E.selBar, C), c(E.selBub, C, E.selBar), c(E.unSelBarLow, A, E.minPtr), c(E.unSelBarHigh, B, E.maxPtr)) : (c(E.ceilBub, A, E.minPtr), c(E.fullBar, A, E.minPtr)));
            }var $, _, ab, bb, cb;w(), j(E.flrBub, 0), j(E.ceilBub, f(F - k(E.ceilBub))), U(), V(), T || (Z(), T = !0);
          }var E = v(u(g), y, AngularSlider.inputtypes.range);c.decodedValues = { floor: 0, ceiling: 0, step: 0, stepWidth: 0, precision: 0, buffer: 0, stickiness: 0, ngModel: 0, ngModelRange: 0 }, c.translation = function (a) {
            return a = parseFloat(a).toFixed(c.precision), angular.isUndefined(o.translateFn) ? "" + a : c.translateFn({ value: a });
          }, c.rangeTranslation = function (a, b) {
            return angular.isUndefined(o.translateRangeFn) ? "Range: " + c.translation((b - a).toFixed(c.precision)) : c.translateRangeFn({ low: a, high: b });
          }, c.combinedTranslation = function (a, b) {
            return angular.isUndefined(o.translateCombinedFn) ? c.translation(a) + " - " + c.translation(b) : c.translateCombinedFn({ low: a, high: b });
          }, c.encode = function (a) {
            return angular.isUndefined(o.scaleFn) || "" == o.scaleFn ? a : c.scaleFn({ value: a });
          }, c.decode = function (a) {
            return angular.isUndefined(o.inverseScaleFn) || "" == o.inverseScaleFn ? a : c.inverseScaleFn({ value: a });
          }, (1 != Math.round(c.encode(c.decode(1))) || 100 != Math.round(c.encode(c.decode(100)))) && console.warn("The scale and inverseScale functions are not perfect inverses: 1 = " + c.encode(c.decode(1)) + "  100 = " + c.encode(c.decode(100))), c.decodeRef = function (a) {
            return c.decode(c[a]);
          }, c.inputSteps = function () {
            return Math.pow(10, -1 * c.precision);
          };for (var F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 1, R = 0, S = 0, T = !1, U = 0; U < D.length; U++) c.$watch(D[U], function () {
            z();
          });e(window).bind("resize", function () {
            z();
          }), c.$on("refreshSlider", function () {
            a(function () {
              z();
            });
          }), a(function () {
            z();
          });
        } };
    } };
}]);

//# sourceMappingURL=angular-slider.min-compiled.js.map