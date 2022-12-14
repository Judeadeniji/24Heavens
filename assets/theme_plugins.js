// Copyright (c) 2012 Florian H., https://github.com/js-coder https://github.com/js-coder/cookie.js cookie.js is released under the MIT/X11 license.
!(function (e, t) {
  var n = function () {
      return n.get.apply(n, arguments);
    },
    r = (n.utils = {
      isArray:
        Array.isArray ||
        function (e) {
          return Object.prototype.toString.call(e) === "[object Array]";
        },
      isPlainObject: function (e) {
        return !!e && Object.prototype.toString.call(e) === "[object Object]";
      },
      toArray: function (e) {
        return Array.prototype.slice.call(e);
      },
      getKeys:
        Object.keys ||
        function (e) {
          var t = [],
            n = "";
          for (n in e) e.hasOwnProperty(n) && t.push(n);
          return t;
        },
      escape: function (e) {
        return String(e).replace(/[,;"\\=\s%]/g, function (e) {
          return encodeURIComponent(e);
        });
      },
      retrieve: function (e, t) {
        return e == null ? t : e;
      },
    });
  (n.defaults = {}),
    (n.expiresMultiplier = 86400),
    (n.set = function (n, i, s) {
      if (r.isPlainObject(n))
        for (var o in n) n.hasOwnProperty(o) && this.set(o, n[o], i);
      else {
        s = r.isPlainObject(s) ? s : { expires: s };
        var u = s.expires !== t ? s.expires : this.defaults.expires || "",
          a = typeof u;
        a === "string" && u !== ""
          ? (u = new Date(u))
          : a === "number" &&
            (u = new Date(+new Date() + 1e3 * this.expiresMultiplier * u)),
          u !== "" && "toGMTString" in u && (u = ";expires=" + u.toGMTString());
        var f = s.path || this.defaults.path;
        f = f ? ";path=" + f : "";
        var l = s.domain || this.defaults.domain;
        l = l ? ";domain=" + l : "";
        var c = s.secure || this.defaults.secure ? ";secure" : "";
        e.cookie = r.escape(n) + "=" + r.escape(i) + u + f + l + c;
      }
      return this;
    }),
    (n.remove = function (e) {
      e = r.isArray(e) ? e : r.toArray(arguments);
      for (var t = 0, n = e.length; t < n; t++) this.set(e[t], "", -1);
      return this;
    }),
    (n.empty = function () {
      return this.remove(r.getKeys(this.all()));
    }),
    (n.get = function (e, n) {
      n = n || t;
      var i = this.all();
      if (r.isArray(e)) {
        var s = {};
        for (var o = 0, u = e.length; o < u; o++) {
          var a = e[o];
          s[a] = r.retrieve(i[a], n);
        }
        return s;
      }
      return r.retrieve(i[e], n);
    }),
    (n.all = function () {
      if (e.cookie === "") return {};
      var t = e.cookie.split("; "),
        n = {};
      for (var r = 0, i = t.length; r < i; r++) {
        var s = t[r].split("=");
        n[decodeURIComponent(s[0])] = decodeURIComponent(s[1]);
      }
      return n;
    }),
    (n.enabled = function () {
      if (navigator.cookieEnabled) return !0;
      var e = n.set("_", "_").get("_") === "_";
      return n.remove("_"), e;
    }),
    typeof define == "function" && define.amd
      ? define(function () {
          return n;
        })
      : typeof exports != "undefined"
      ? (exports.cookie = n)
      : (window.cookie = n);
})(document);

/*!
 * imagesLoaded PACKAGED v3.1.1
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function () {
  function e() {}
  function t(e, t) {
    for (var n = e.length; n--; ) if (e[n].listener === t) return n;
    return -1;
  }
  function n(e) {
    return function () {
      return this[e].apply(this, arguments);
    };
  }
  var i = e.prototype,
    r = this,
    o = r.EventEmitter;
  (i.getListeners = function (e) {
    var t,
      n,
      i = this._getEvents();
    if ("object" == typeof e) {
      t = {};
      for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]);
    } else t = i[e] || (i[e] = []);
    return t;
  }),
    (i.flattenListeners = function (e) {
      var t,
        n = [];
      for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
      return n;
    }),
    (i.getListenersAsObject = function (e) {
      var t,
        n = this.getListeners(e);
      return n instanceof Array && ((t = {}), (t[e] = n)), t || n;
    }),
    (i.addListener = function (e, n) {
      var i,
        r = this.getListenersAsObject(e),
        o = "object" == typeof n;
      for (i in r)
        r.hasOwnProperty(i) &&
          -1 === t(r[i], n) &&
          r[i].push(o ? n : { listener: n, once: !1 });
      return this;
    }),
    (i.on = n("addListener")),
    (i.addOnceListener = function (e, t) {
      return this.addListener(e, { listener: t, once: !0 });
    }),
    (i.once = n("addOnceListener")),
    (i.defineEvent = function (e) {
      return this.getListeners(e), this;
    }),
    (i.defineEvents = function (e) {
      for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
      return this;
    }),
    (i.removeListener = function (e, n) {
      var i,
        r,
        o = this.getListenersAsObject(e);
      for (r in o)
        o.hasOwnProperty(r) &&
          ((i = t(o[r], n)), -1 !== i && o[r].splice(i, 1));
      return this;
    }),
    (i.off = n("removeListener")),
    (i.addListeners = function (e, t) {
      return this.manipulateListeners(!1, e, t);
    }),
    (i.removeListeners = function (e, t) {
      return this.manipulateListeners(!0, e, t);
    }),
    (i.manipulateListeners = function (e, t, n) {
      var i,
        r,
        o = e ? this.removeListener : this.addListener,
        s = e ? this.removeListeners : this.addListeners;
      if ("object" != typeof t || t instanceof RegExp)
        for (i = n.length; i--; ) o.call(this, t, n[i]);
      else
        for (i in t)
          t.hasOwnProperty(i) &&
            (r = t[i]) &&
            ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
      return this;
    }),
    (i.removeEvent = function (e) {
      var t,
        n = typeof e,
        i = this._getEvents();
      if ("string" === n) delete i[e];
      else if ("object" === n)
        for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
      else delete this._events;
      return this;
    }),
    (i.removeAllListeners = n("removeEvent")),
    (i.emitEvent = function (e, t) {
      var n,
        i,
        r,
        o,
        s = this.getListenersAsObject(e);
      for (r in s)
        if (s.hasOwnProperty(r))
          for (i = s[r].length; i--; )
            (n = s[r][i]),
              n.once === !0 && this.removeListener(e, n.listener),
              (o = n.listener.apply(this, t || [])),
              o === this._getOnceReturnValue() &&
                this.removeListener(e, n.listener);
      return this;
    }),
    (i.trigger = n("emitEvent")),
    (i.emit = function (e) {
      var t = Array.prototype.slice.call(arguments, 1);
      return this.emitEvent(e, t);
    }),
    (i.setOnceReturnValue = function (e) {
      return (this._onceReturnValue = e), this;
    }),
    (i._getOnceReturnValue = function () {
      return this.hasOwnProperty("_onceReturnValue")
        ? this._onceReturnValue
        : !0;
    }),
    (i._getEvents = function () {
      return this._events || (this._events = {});
    }),
    (e.noConflict = function () {
      return (r.EventEmitter = o), e;
    }),
    "function" == typeof define && define.amd
      ? define("eventEmitter/EventEmitter", [], function () {
          return e;
        })
      : "object" == typeof module && module.exports
      ? (module.exports = e)
      : (this.EventEmitter = e);
}.call(this),
  (function (e) {
    function t(t) {
      var n = e.event;
      return (n.target = n.target || n.srcElement || t), n;
    }
    var n = document.documentElement,
      i = function () {};
    n.addEventListener
      ? (i = function (e, t, n) {
          e.addEventListener(t, n, !1);
        })
      : n.attachEvent &&
        (i = function (e, n, i) {
          (e[n + i] = i.handleEvent
            ? function () {
                var n = t(e);
                i.handleEvent.call(i, n);
              }
            : function () {
                var n = t(e);
                i.call(e, n);
              }),
            e.attachEvent("on" + n, e[n + i]);
        });
    var r = function () {};
    n.removeEventListener
      ? (r = function (e, t, n) {
          e.removeEventListener(t, n, !1);
        })
      : n.detachEvent &&
        (r = function (e, t, n) {
          e.detachEvent("on" + t, e[t + n]);
          try {
            delete e[t + n];
          } catch (i) {
            e[t + n] = void 0;
          }
        });
    var o = { bind: i, unbind: r };
    "function" == typeof define && define.amd
      ? define("eventie/eventie", o)
      : (e.eventie = o);
  })(this),
  (function (e) {
    function t(e, t) {
      for (var n in t) e[n] = t[n];
      return e;
    }
    function n(e) {
      return "[object Array]" === f.call(e);
    }
    function i(e) {
      var t = [];
      if (n(e)) t = e;
      else if ("number" == typeof e.length)
        for (var i = 0, r = e.length; r > i; i++) t.push(e[i]);
      else t.push(e);
      return t;
    }
    function r(e, n) {
      function r(e, n, s) {
        if (!(this instanceof r)) return new r(e, n);
        "string" == typeof e && (e = document.querySelectorAll(e)),
          (this.elements = i(e)),
          (this.options = t({}, this.options)),
          "function" == typeof n ? (s = n) : t(this.options, n),
          s && this.on("always", s),
          this.getImages(),
          o && (this.jqDeferred = new o.Deferred());
        var c = this;
        setTimeout(function () {
          c.check();
        });
      }
      function f(e) {
        this.img = e;
      }
      function a(e) {
        (this.src = e), (h[e] = this);
      }
      (r.prototype = new e()),
        (r.prototype.options = {}),
        (r.prototype.getImages = function () {
          this.images = [];
          for (var e = 0, t = this.elements.length; t > e; e++) {
            var n = this.elements[e];
            "IMG" === n.nodeName && this.addImage(n);
            for (
              var i = n.querySelectorAll("img"), r = 0, o = i.length;
              o > r;
              r++
            ) {
              var s = i[r];
              this.addImage(s);
            }
          }
        }),
        (r.prototype.addImage = function (e) {
          var t = new f(e);
          this.images.push(t);
        }),
        (r.prototype.check = function () {
          function e(e, r) {
            return (
              t.options.debug && c && s.log("confirm", e, r),
              t.progress(e),
              n++,
              n === i && t.complete(),
              !0
            );
          }
          var t = this,
            n = 0,
            i = this.images.length;
          if (((this.hasAnyBroken = !1), !i)) return this.complete(), void 0;
          for (var r = 0; i > r; r++) {
            var o = this.images[r];
            o.on("confirm", e), o.check();
          }
        }),
        (r.prototype.progress = function (e) {
          this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
          var t = this;
          setTimeout(function () {
            t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify(t, e);
          });
        }),
        (r.prototype.complete = function () {
          var e = this.hasAnyBroken ? "fail" : "done";
          this.isComplete = !0;
          var t = this;
          setTimeout(function () {
            if ((t.emit(e, t), t.emit("always", t), t.jqDeferred)) {
              var n = t.hasAnyBroken ? "reject" : "resolve";
              t.jqDeferred[n](t);
            }
          });
        }),
        o &&
          (o.fn.imagesLoaded = function (e, t) {
            var n = new r(this, e, t);
            return n.jqDeferred.promise(o(this));
          }),
        (f.prototype = new e()),
        (f.prototype.check = function () {
          var e = h[this.img.src] || new a(this.img.src);
          if (e.isConfirmed)
            return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
          if (this.img.complete && void 0 !== this.img.naturalWidth)
            return (
              this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0
            );
          var t = this;
          e.on("confirm", function (e, n) {
            return t.confirm(e.isLoaded, n), !0;
          }),
            e.check();
        }),
        (f.prototype.confirm = function (e, t) {
          (this.isLoaded = e), this.emit("confirm", this, t);
        });
      var h = {};
      return (
        (a.prototype = new e()),
        (a.prototype.check = function () {
          if (!this.isChecked) {
            var e = new Image();
            n.bind(e, "load", this),
              n.bind(e, "error", this),
              (e.src = this.src),
              (this.isChecked = !0);
          }
        }),
        (a.prototype.handleEvent = function (e) {
          var t = "on" + e.type;
          this[t] && this[t](e);
        }),
        (a.prototype.onload = function (e) {
          this.confirm(!0, "onload"), this.unbindProxyEvents(e);
        }),
        (a.prototype.onerror = function (e) {
          this.confirm(!1, "onerror"), this.unbindProxyEvents(e);
        }),
        (a.prototype.confirm = function (e, t) {
          (this.isConfirmed = !0),
            (this.isLoaded = e),
            this.emit("confirm", this, t);
        }),
        (a.prototype.unbindProxyEvents = function (e) {
          n.unbind(e.target, "load", this), n.unbind(e.target, "error", this);
        }),
        r
      );
    }
    var o = e.jQuery,
      s = e.console,
      c = s !== void 0,
      f = Object.prototype.toString;
    "function" == typeof define && define.amd
      ? define(["eventEmitter/EventEmitter", "eventie/eventie"], r)
      : (e.imagesLoaded = r(e.EventEmitter, e.eventie));
  })(window));

/*
 * jQuery FlexSlider v2.2.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
!(function (e) {
  (e.flexslider = function (t, a) {
    var n = e(t);
    n.vars = e.extend({}, e.flexslider.defaults, a);
    var i,
      s = n.vars.namespace,
      r =
        window.navigator &&
        window.navigator.msPointerEnabled &&
        window.MSGesture,
      o =
        ("ontouchstart" in window ||
          r ||
          (window.DocumentTouch && document instanceof DocumentTouch)) &&
        n.vars.touch,
      l = "click touchend MSPointerUp",
      c = "",
      d = "vertical" === n.vars.direction,
      u = n.vars.reverse,
      v = n.vars.itemWidth > 0,
      p = "fade" === n.vars.animation,
      m = "" !== n.vars.asNavFor,
      f = {},
      g = !0;
    e.data(t, "flexslider", n),
      (f = {
        init: function () {
          (n.animating = !1),
            (n.currentSlide = parseInt(n.vars.startAt ? n.vars.startAt : 0)),
            isNaN(n.currentSlide) && (n.currentSlide = 0),
            (n.animatingTo = n.currentSlide),
            (n.atEnd = 0 === n.currentSlide || n.currentSlide === n.last),
            (n.containerSelector = n.vars.selector.substr(
              0,
              n.vars.selector.search(" ")
            )),
            (n.slides = e(n.vars.selector, n)),
            (n.container = e(n.containerSelector, n)),
            (n.count = n.slides.length),
            (n.syncExists = e(n.vars.sync).length > 0),
            "slide" === n.vars.animation && (n.vars.animation = "swing"),
            (n.prop = d ? "top" : n.vars.rtl ? "marginRight" : "marginLeft"),
            (n.args = {}),
            (n.manualPause = !1),
            (n.stopped = !1),
            (n.started = !1),
            (n.startTimeout = null),
            (n.transitions =
              !n.vars.video &&
              !p &&
              n.vars.useCSS &&
              (function () {
                var e = document.createElement("div"),
                  t = [
                    "perspectiveProperty",
                    "WebkitPerspective",
                    "MozPerspective",
                    "OPerspective",
                    "msPerspective",
                  ];
                for (var a in t)
                  if (void 0 !== e.style[t[a]])
                    return (
                      (n.pfx = t[a].replace("Perspective", "").toLowerCase()),
                      (n.prop = "-" + n.pfx + "-transform"),
                      !0
                    );
                return !1;
              })()),
            "" !== n.vars.controlsContainer &&
              (n.controlsContainer =
                e(n.vars.controlsContainer).length > 0 &&
                e(n.vars.controlsContainer)),
            "" !== n.vars.manualControls &&
              (n.manualControls =
                e(n.vars.manualControls).length > 0 &&
                e(n.vars.manualControls)),
            n.vars.randomize &&
              (n.slides.sort(function () {
                return Math.round(Math.random()) - 0.5;
              }),
              n.container.empty().append(n.slides)),
            n.doMath(),
            n.setup("init"),
            n.vars.rtl && n.addClass("flexslider-rtl"),
            n.vars.controlNav && f.controlNav.setup(),
            n.vars.directionNav && f.directionNav.setup(),
            n.vars.keyboard &&
              (1 === e(n.containerSelector).length ||
                n.vars.multipleKeyboard) &&
              e(document).bind("keyup", function (e) {
                var t = e.keyCode;
                if (!n.animating && (39 === t || 37 === t)) {
                  var a = n.vars.rtl
                    ? 37 === t
                      ? n.getTarget("next")
                      : 39 === t
                      ? n.getTarget("prev")
                      : !1
                    : 39 === t
                    ? n.getTarget("next")
                    : 37 === t
                    ? n.getTarget("prev")
                    : !1;
                  n.flexAnimate(a, n.vars.pauseOnAction);
                }
              }),
            n.vars.mousewheel &&
              n.bind("mousewheel", function (e, t) {
                e.preventDefault();
                var a = n.getTarget(0 > t ? "next" : "prev");
                n.flexAnimate(a, n.vars.pauseOnAction);
              }),
            n.vars.pausePlay && f.pausePlay.setup(),
            n.vars.slideshow &&
              n.vars.pauseInvisible &&
              f.pauseInvisible.init(),
            n.vars.slideshow &&
              (n.vars.pauseOnHover &&
                n.hover(
                  function () {
                    n.manualPlay || n.manualPause || n.pause();
                  },
                  function () {
                    n.manualPause || n.manualPlay || n.stopped || n.play();
                  }
                ),
              (n.vars.pauseInvisible && f.pauseInvisible.isHidden()) ||
                (n.vars.initDelay > 0
                  ? (n.startTimeout = setTimeout(n.play, n.vars.initDelay))
                  : n.play())),
            m && f.asNav.setup(),
            o && n.vars.touch && f.touch(),
            (!p || (p && n.vars.smoothHeight)) &&
              e(window).bind("resize orientationchange focus", f.resize),
            n.find("img").attr("draggable", "false"),
            setTimeout(function () {
              n.vars.start(n);
            }, 200);
        },
        asNav: {
          setup: function () {
            (n.asNav = !0),
              (n.animatingTo = Math.floor(n.currentSlide / n.move)),
              (n.currentItem = n.currentSlide),
              n.slides
                .removeClass(s + "active-slide")
                .eq(n.currentItem)
                .addClass(s + "active-slide"),
              r
                ? ((t._slider = n),
                  n.slides.each(function () {
                    var t = this;
                    (t._gesture = new MSGesture()),
                      (t._gesture.target = t),
                      t.addEventListener(
                        "MSPointerDown",
                        function (e) {
                          e.preventDefault(),
                            e.currentTarget._gesture &&
                              e.currentTarget._gesture.addPointer(e.pointerId);
                        },
                        !1
                      ),
                      t.addEventListener("MSGestureTap", function (t) {
                        t.preventDefault();
                        var a = e(this),
                          i = a.index();
                        e(n.vars.asNavFor).data("flexslider").animating ||
                          a.hasClass("active") ||
                          ((n.direction = n.currentItem < i ? "next" : "prev"),
                          n.flexAnimate(i, n.vars.pauseOnAction, !1, !0, !0));
                      });
                  }))
                : n.slides.click(function (t) {
                    t.preventDefault();
                    var a,
                      i = e(this),
                      r = i.index();
                    (a = n.vars.rtl
                      ? i.offset().right + e(n).scrollLeft()
                      : i.offset().left - e(n).scrollLeft()),
                      0 >= a && i.hasClass(s + "active-slide")
                        ? n.flexAnimate(n.getTarget("prev"), !0)
                        : e(n.vars.asNavFor).data("flexslider").animating ||
                          i.hasClass(s + "active-slide") ||
                          ((n.direction = n.currentItem < r ? "next" : "prev"),
                          n.flexAnimate(r, n.vars.pauseOnAction, !1, !0, !0));
                  });
          },
        },
        controlNav: {
          setup: function () {
            n.manualControls
              ? f.controlNav.setupManual()
              : f.controlNav.setupPaging();
          },
          setupPaging: function () {
            var t,
              a,
              i =
                "thumbnails" === n.vars.controlNav
                  ? "control-thumbs"
                  : "control-paging",
              r = 1;
            if (
              ((n.controlNavScaffold = e(
                '<ol class="' + s + "control-nav " + s + i + '"></ol>'
              )),
              n.pagingCount > 1)
            )
              for (var o = 0; o < n.pagingCount; o++) {
                if (
                  ((a = n.slides.eq(o)),
                  (t =
                    "thumbnails" === n.vars.controlNav
                      ? '<img src="' + a.attr("data-thumb") + '"/>'
                      : "<a>" + r + "</a>"),
                  "thumbnails" === n.vars.controlNav &&
                    !0 === n.vars.thumbCaptions)
                ) {
                  var d = a.attr("data-thumbcaption");
                  "" != d &&
                    void 0 != d &&
                    (t += '<span class="' + s + 'caption">' + d + "</span>");
                }
                n.controlNavScaffold.append("<li>" + t + "</li>"), r++;
              }
            n.controlsContainer
              ? e(n.controlsContainer).append(n.controlNavScaffold)
              : n.append(n.controlNavScaffold),
              f.controlNav.set(),
              f.controlNav.active(),
              n.controlNavScaffold.delegate("a, img", l, function (t) {
                if ((t.preventDefault(), "" === c || c === t.type)) {
                  var a = e(this),
                    i = n.controlNav.index(a);
                  a.hasClass(s + "active") ||
                    ((n.direction = i > n.currentSlide ? "next" : "prev"),
                    n.flexAnimate(i, n.vars.pauseOnAction));
                }
                "" === c && (c = t.type), f.setToClearWatchedEvent();
              });
          },
          setupManual: function () {
            (n.controlNav = n.manualControls),
              f.controlNav.active(),
              n.controlNav.bind(l, function (t) {
                if ((t.preventDefault(), "" === c || c === t.type)) {
                  var a = e(this),
                    i = n.controlNav.index(a);
                  a.hasClass(s + "active") ||
                    ((n.direction = i > n.currentSlide ? "next" : "prev"),
                    n.flexAnimate(i, n.vars.pauseOnAction));
                }
                "" === c && (c = t.type), f.setToClearWatchedEvent();
              });
          },
          set: function () {
            var t = "thumbnails" === n.vars.controlNav ? "img" : "a";
            n.controlNav = e(
              "." + s + "control-nav li " + t,
              n.controlsContainer ? n.controlsContainer : n
            );
          },
          active: function () {
            n.controlNav
              .removeClass(s + "active")
              .eq(n.animatingTo)
              .addClass(s + "active");
          },
          update: function (t, a) {
            n.pagingCount > 1 && "add" === t
              ? n.controlNavScaffold.append(
                  e("<li><a>" + n.count + "</a></li>")
                )
              : 1 === n.pagingCount
              ? n.controlNavScaffold.find("li").remove()
              : n.controlNav.eq(a).closest("li").remove(),
              f.controlNav.set(),
              n.pagingCount > 1 && n.pagingCount !== n.controlNav.length
                ? n.update(a, t)
                : f.controlNav.active();
          },
        },
        directionNav: {
          setup: function () {
            var t = e(
              '<ul class="' +
                s +
                'direction-nav"><li><a class="' +
                s +
                'prev" href="#">' +
                n.vars.prevText +
                '</a></li><li><a class="' +
                s +
                'next" href="#">' +
                n.vars.nextText +
                "</a></li></ul>"
            );
            n.controlsContainer
              ? (e(n.controlsContainer).append(t),
                (n.directionNav = e(
                  "." + s + "direction-nav li a",
                  n.controlsContainer
                )))
              : (n.append(t),
                (n.directionNav = e("." + s + "direction-nav li a", n))),
              f.directionNav.update(),
              n.directionNav.bind(l, function (t) {
                t.preventDefault();
                var a;
                ("" === c || c === t.type) &&
                  ((a = n.getTarget(
                    e(this).hasClass(s + "next") ? "next" : "prev"
                  )),
                  e(this).hasClass(s + "disabled") ||
                    n.flexAnimate(a, n.vars.pauseOnAction)),
                  "" === c && (c = t.type),
                  f.setToClearWatchedEvent();
              });
          },
          update: function () {
            var e = s + "disabled";
            1 === n.pagingCount
              ? n.directionNav.addClass(e).attr("tabindex", "-1")
              : n.vars.animationLoop
              ? n.directionNav.removeClass(e).removeAttr("tabindex")
              : 0 === n.animatingTo
              ? n.directionNav
                  .removeClass(e)
                  .filter("." + s + "prev")
                  .addClass(e)
                  .attr("tabindex", "-1")
              : n.animatingTo === n.last
              ? n.directionNav
                  .removeClass(e)
                  .filter("." + s + "next")
                  .addClass(e)
                  .attr("tabindex", "-1")
              : n.directionNav.removeClass(e).removeAttr("tabindex");
          },
        },
        pausePlay: {
          setup: function () {
            var t = e('<div class="' + s + 'pauseplay"><a></a></div>');
            n.controlsContainer
              ? (n.controlsContainer.append(t),
                (n.pausePlay = e("." + s + "pauseplay a", n.controlsContainer)))
              : (n.append(t), (n.pausePlay = e("." + s + "pauseplay a", n))),
              f.pausePlay.update(n.vars.slideshow ? s + "pause" : s + "play"),
              n.pausePlay.bind(l, function (t) {
                t.preventDefault(),
                  ("" === c || c === t.type) &&
                    (e(this).hasClass(s + "pause")
                      ? ((n.manualPause = !0), (n.manualPlay = !1), n.pause())
                      : ((n.manualPause = !1), (n.manualPlay = !0), n.play())),
                  "" === c && (c = t.type),
                  f.setToClearWatchedEvent();
              });
          },
          update: function (e) {
            "play" === e
              ? n.pausePlay
                  .removeClass(s + "pause")
                  .addClass(s + "play")
                  .html(n.vars.playText)
              : n.pausePlay
                  .removeClass(s + "play")
                  .addClass(s + "pause")
                  .html(n.vars.pauseText);
          },
        },
        touch: function () {
          function e(e) {
            n.animating
              ? e.preventDefault()
              : (window.navigator.msPointerEnabled || 1 === e.touches.length) &&
                (n.pause(),
                (g = d ? n.h : n.w),
                (S = Number(new Date())),
                (y = e.touches[0].pageX),
                (b = e.touches[0].pageY),
                (f =
                  v && u && n.animatingTo === n.last
                    ? 0
                    : v && u
                    ? n.limit -
                      (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo
                    : v && n.currentSlide === n.last
                    ? n.limit
                    : v
                    ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide
                    : u
                    ? (n.last - n.currentSlide + n.cloneOffset) * g
                    : (n.currentSlide + n.cloneOffset) * g),
                (c = d ? b : y),
                (m = d ? y : b),
                t.addEventListener("touchmove", a, !1),
                t.addEventListener("touchend", i, !1));
          }
          function a(e) {
            (y = e.touches[0].pageX),
              (b = e.touches[0].pageY),
              (h = d ? c - b : c - y),
              (x = d
                ? Math.abs(h) < Math.abs(y - m)
                : Math.abs(h) < Math.abs(b - m));
            var t = 500;
            (!x || Number(new Date()) - S > t) &&
              (e.preventDefault(),
              !p &&
                n.transitions &&
                (n.vars.animationLoop ||
                  (h /=
                    (0 === n.currentSlide && 0 > h) ||
                    (n.currentSlide === n.last && h > 0)
                      ? Math.abs(h) / g + 2
                      : 1),
                n.setProps(f + h, "setTouch")));
          }
          function i() {
            if (
              (t.removeEventListener("touchmove", a, !1),
              n.animatingTo === n.currentSlide && !x && null !== h)
            ) {
              var e = u ? -h : h,
                s = n.getTarget(e > 0 ? "next" : "prev");
              n.canAdvance(s) &&
              ((Number(new Date()) - S < 550 && Math.abs(e) > 50) ||
                Math.abs(e) > g / 2)
                ? n.flexAnimate(s, n.vars.pauseOnAction)
                : p || n.flexAnimate(n.currentSlide, n.vars.pauseOnAction, !0);
            }
            t.removeEventListener("touchend", i, !1),
              (c = null),
              (m = null),
              (h = null),
              (f = null);
          }
          function s(e) {
            e.stopPropagation(),
              n.animating
                ? e.preventDefault()
                : (n.pause(),
                  t._gesture.addPointer(e.pointerId),
                  (w = 0),
                  (g = d ? n.h : n.w),
                  (S = Number(new Date())),
                  (f =
                    v && u && n.animatingTo === n.last
                      ? 0
                      : v && u
                      ? n.limit -
                        (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo
                      : v && n.currentSlide === n.last
                      ? n.limit
                      : v
                      ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide
                      : u
                      ? (n.last - n.currentSlide + n.cloneOffset) * g
                      : (n.currentSlide + n.cloneOffset) * g));
          }
          function o(e) {
            e.stopPropagation();
            var a = e.target._slider;
            if (a) {
              var n = -e.translationX,
                i = -e.translationY;
              return (
                (w += d ? i : n),
                (h = w),
                (x = d
                  ? Math.abs(w) < Math.abs(-n)
                  : Math.abs(w) < Math.abs(-i)),
                e.detail === e.MSGESTURE_FLAG_INERTIA
                  ? void setImmediate(function () {
                      t._gesture.stop();
                    })
                  : void (
                      (!x || Number(new Date()) - S > 500) &&
                      (e.preventDefault(),
                      !p &&
                        a.transitions &&
                        (a.vars.animationLoop ||
                          (h =
                            w /
                            ((0 === a.currentSlide && 0 > w) ||
                            (a.currentSlide === a.last && w > 0)
                              ? Math.abs(w) / g + 2
                              : 1)),
                        a.setProps(f + h, "setTouch")))
                    )
              );
            }
          }
          function l(e) {
            e.stopPropagation();
            var t = e.target._slider;
            if (t) {
              if (t.animatingTo === t.currentSlide && !x && null !== h) {
                var a = u ? -h : h,
                  n = t.getTarget(a > 0 ? "next" : "prev");
                t.canAdvance(n) &&
                ((Number(new Date()) - S < 550 && Math.abs(a) > 50) ||
                  Math.abs(a) > g / 2)
                  ? t.flexAnimate(n, t.vars.pauseOnAction)
                  : p ||
                    t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0);
              }
              (c = null), (m = null), (h = null), (f = null), (w = 0);
            }
          }
          var c,
            m,
            f,
            g,
            h,
            S,
            x = !1,
            y = 0,
            b = 0,
            w = 0;
          r
            ? ((t.style.msTouchAction = "none"),
              (t._gesture = new MSGesture()),
              (t._gesture.target = t),
              t.addEventListener("MSPointerDown", s, !1),
              (t._slider = n),
              t.addEventListener("MSGestureChange", o, !1),
              t.addEventListener("MSGestureEnd", l, !1))
            : t.addEventListener("touchstart", e, !1);
        },
        resize: function () {
          !n.animating &&
            n.is(":visible") &&
            (v || n.doMath(),
            p
              ? f.smoothHeight()
              : v
              ? (n.slides.width(n.computedW),
                n.update(n.pagingCount),
                n.setProps())
              : d
              ? (n.viewport.height(n.h), n.setProps(n.h, "setTotal"))
              : (n.vars.smoothHeight && f.smoothHeight(),
                n.newSlides.width(n.computedW),
                n.setProps(n.computedW, "setTotal")));
        },
        smoothHeight: function (e) {
          if (!d || p) {
            var t = p ? n : n.viewport;
            e
              ? t.animate({ height: n.slides.eq(n.animatingTo).height() }, e)
              : t.height(n.slides.eq(n.animatingTo).height());
          }
        },
        sync: function (t) {
          var a = e(n.vars.sync).data("flexslider"),
            i = n.animatingTo;
          switch (t) {
            case "animate":
              a.flexAnimate(i, n.vars.pauseOnAction, !1, !0);
              break;
            case "play":
              a.playing || a.asNav || a.play();
              break;
            case "pause":
              a.pause();
          }
        },
        pauseInvisible: {
          visProp: null,
          init: function () {
            var e = ["webkit", "moz", "ms", "o"];
            if ("hidden" in document) return "hidden";
            for (var t = 0; t < e.length; t++)
              e[t] + "Hidden" in document &&
                (f.pauseInvisible.visProp = e[t] + "Hidden");
            if (f.pauseInvisible.visProp) {
              var a =
                f.pauseInvisible.visProp.replace(/[H|h]idden/, "") +
                "visibilitychange";
              document.addEventListener(a, function () {
                f.pauseInvisible.isHidden()
                  ? n.startTimeout
                    ? clearTimeout(n.startTimeout)
                    : n.pause()
                  : n.started
                  ? n.play()
                  : n.vars.initDelay > 0
                  ? setTimeout(n.play, n.vars.initDelay)
                  : n.play();
              });
            }
          },
          isHidden: function () {
            return document[f.pauseInvisible.visProp] || !1;
          },
        },
        setToClearWatchedEvent: function () {
          clearTimeout(i),
            (i = setTimeout(function () {
              c = "";
            }, 3e3));
        },
      }),
      (n.flexAnimate = function (t, a, i, r, l) {
        if (
          (n.vars.animationLoop ||
            t === n.currentSlide ||
            (n.direction = t > n.currentSlide ? "next" : "prev"),
          m && (n.direction = t > n.currentSlide ? "next" : "prev"),
          !n.animating && (n.canAdvance(t, l) || i) && n.is(":visible"))
        ) {
          if (m && r) {
            var c = e(n.vars.asNavFor).data("flexslider");
            if (
              ((n.atEnd = 0 === t || t === n.count - 1),
              c.flexAnimate(t, !0, !1, !0, l),
              (n.direction = n.currentItem < t ? "next" : "prev"),
              (c.direction = n.direction),
              Math.ceil((t + 1) / n.visible) - 1 === n.currentSlide)
            )
              return (
                (n.currentItem = t),
                n.slides
                  .removeClass(s + "active-slide")
                  .eq(t)
                  .addClass(s + "active-slide"),
                !1
              );
            (n.currentItem = t),
              n.slides
                .removeClass(s + "active-slide")
                .eq(t)
                .addClass(s + "active-slide"),
              (t = Math.floor(t / n.visible));
          }
          if (
            ((n.animating = !0),
            (n.animatingTo = t),
            a && n.pause(),
            n.vars.before(n),
            n.syncExists && !l && f.sync("animate"),
            n.vars.controlNav && f.controlNav.active(),
            v ||
              n.slides
                .removeClass(s + "active-slide")
                .eq(t)
                .addClass(s + "active-slide"),
            (n.atEnd = 0 === t || t === n.last),
            n.vars.directionNav && f.directionNav.update(),
            t === n.last && (n.vars.end(n), n.vars.animationLoop || n.pause()),
            p)
          )
            o
              ? (n.slides.eq(n.currentSlide).css({ opacity: 0, zIndex: 1 }),
                n.slides.eq(t).css({ opacity: 1, zIndex: 2 }),
                n.wrapup(x))
              : (n.slides
                  .eq(n.currentSlide)
                  .css({ zIndex: 1 })
                  .animate(
                    { opacity: 0 },
                    n.vars.animationSpeed,
                    n.vars.easing
                  ),
                n.slides
                  .eq(t)
                  .css({ zIndex: 2 })
                  .animate(
                    { opacity: 1 },
                    n.vars.animationSpeed,
                    n.vars.easing,
                    n.wrapup
                  ));
          else {
            var g,
              h,
              S,
              x = d ? n.slides.filter(":first").height() : n.computedW;
            v
              ? ((g = n.vars.itemMargin),
                (S = (n.itemW + g) * n.move * n.animatingTo),
                (h = S > n.limit && 1 !== n.visible ? n.limit : S))
              : (h =
                  0 === n.currentSlide &&
                  t === n.count - 1 &&
                  n.vars.animationLoop &&
                  "next" !== n.direction
                    ? u
                      ? (n.count + n.cloneOffset) * x
                      : 0
                    : n.currentSlide === n.last &&
                      0 === t &&
                      n.vars.animationLoop &&
                      "prev" !== n.direction
                    ? u
                      ? 0
                      : (n.count + 1) * x
                    : u
                    ? (n.count - 1 - t + n.cloneOffset) * x
                    : (t + n.cloneOffset) * x),
              n.setProps(h, "", n.vars.animationSpeed),
              n.transitions
                ? ((n.vars.animationLoop && n.atEnd) ||
                    ((n.animating = !1), (n.currentSlide = n.animatingTo)),
                  n.container.unbind("webkitTransitionEnd transitionend"),
                  n.container.bind(
                    "webkitTransitionEnd transitionend",
                    function () {
                      n.wrapup(x);
                    }
                  ))
                : n.container.animate(
                    n.args,
                    n.vars.animationSpeed,
                    n.vars.easing,
                    function () {
                      n.wrapup(x);
                    }
                  );
          }
          n.vars.smoothHeight && f.smoothHeight(n.vars.animationSpeed);
        }
      }),
      (n.wrapup = function (e) {
        p ||
          v ||
          (0 === n.currentSlide &&
          n.animatingTo === n.last &&
          n.vars.animationLoop
            ? n.setProps(e, "jumpEnd")
            : n.currentSlide === n.last &&
              0 === n.animatingTo &&
              n.vars.animationLoop &&
              n.setProps(e, "jumpStart")),
          (n.animating = !1),
          (n.currentSlide = n.animatingTo),
          n.vars.after(n);
      }),
      (n.animateSlides = function () {
        !n.animating && g && n.flexAnimate(n.getTarget("next"));
      }),
      (n.pause = function () {
        clearInterval(n.animatedSlides),
          (n.animatedSlides = null),
          (n.playing = !1),
          n.vars.pausePlay && f.pausePlay.update("play"),
          n.syncExists && f.sync("pause");
      }),
      (n.play = function () {
        n.playing && clearInterval(n.animatedSlides),
          (n.animatedSlides =
            n.animatedSlides ||
            setInterval(n.animateSlides, n.vars.slideshowSpeed)),
          (n.started = n.playing = !0),
          n.vars.pausePlay && f.pausePlay.update("pause"),
          n.syncExists && f.sync("play");
      }),
      (n.stop = function () {
        n.pause(), (n.stopped = !0);
      }),
      (n.canAdvance = function (e, t) {
        var a = m ? n.pagingCount - 1 : n.last;
        return t
          ? !0
          : m &&
            n.currentItem === n.count - 1 &&
            0 === e &&
            "prev" === n.direction
          ? !0
          : m &&
            0 === n.currentItem &&
            e === n.pagingCount - 1 &&
            "next" !== n.direction
          ? !1
          : e !== n.currentSlide || m
          ? n.vars.animationLoop
            ? !0
            : n.atEnd &&
              0 === n.currentSlide &&
              e === a &&
              "next" !== n.direction
            ? !1
            : n.atEnd &&
              n.currentSlide === a &&
              0 === e &&
              "next" === n.direction
            ? !1
            : !0
          : !1;
      }),
      (n.getTarget = function (e) {
        return (
          (n.direction = e),
          "next" === e
            ? n.currentSlide === n.last
              ? 0
              : n.currentSlide + 1
            : 0 === n.currentSlide
            ? n.last
            : n.currentSlide - 1
        );
      }),
      (n.setProps = function (e, t, a) {
        var i = (function () {
          var a = e
              ? e
              : (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo,
            i = (function () {
              if (v)
                return "setTouch" === t
                  ? e
                  : u && n.animatingTo === n.last
                  ? 0
                  : u
                  ? n.limit -
                    (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo
                  : n.animatingTo === n.last
                  ? n.limit
                  : a;
              switch (t) {
                case "setTotal":
                  return u
                    ? (n.count - 1 - n.currentSlide + n.cloneOffset) * e
                    : (n.currentSlide + n.cloneOffset) * e;
                case "setTouch":
                  return u ? e : e;
                case "jumpEnd":
                  return u ? e : n.count * e;
                case "jumpStart":
                  return u ? n.count * e : e;
                default:
                  return e;
              }
            })();
          return -1 * i + "px";
        })();
        n.transitions &&
          ((i = d
            ? "translate3d(0," + i + ",0)"
            : "translate3d(" +
              ((n.vars.rtl ? -1 : 1) * parseInt(i) + "px") +
              ",0,0)"),
          (a = void 0 !== a ? a / 1e3 + "s" : "0s"),
          n.container.css("-" + n.pfx + "-transition-duration", a)),
          (n.args[n.prop] = i),
          (n.transitions || void 0 === a) && n.container.css(n.args);
      }),
      (n.setup = function (t) {
        if (p)
          n.slides.css(
            n.vars.rtl
              ? {
                  width: "100%",
                  float: "right",
                  marginLeft: "-100%",
                  position: "relative",
                }
              : {
                  width: "100%",
                  float: "left",
                  marginRight: "-100%",
                  position: "relative",
                }
          ),
            "init" === t &&
              (o
                ? n.slides
                    .css({
                      opacity: 0,
                      display: "block",
                      webkitTransition:
                        "opacity " + n.vars.animationSpeed / 1e3 + "s ease",
                      zIndex: 1,
                    })
                    .eq(n.currentSlide)
                    .css({ opacity: 1, zIndex: 2 })
                : n.slides
                    .css({ opacity: 0, display: "block", zIndex: 1 })
                    .eq(n.currentSlide)
                    .css({ zIndex: 2 })
                    .animate(
                      { opacity: 1 },
                      n.vars.animationSpeed,
                      n.vars.easing
                    )),
            n.vars.smoothHeight && f.smoothHeight();
        else {
          var a, i;
          "init" === t &&
            ((n.viewport = e('<div class="' + s + 'viewport"></div>')
              .css({ overflow: "hidden", position: "relative" })
              .appendTo(n)
              .append(n.container)),
            (n.cloneCount = 0),
            (n.cloneOffset = 0),
            u &&
              ((i = e.makeArray(n.slides).reverse()),
              (n.slides = e(i)),
              n.container.empty().append(n.slides))),
            n.vars.animationLoop &&
              !v &&
              ((n.cloneCount = 2),
              (n.cloneOffset = 1),
              "init" !== t && n.container.find(".clone").remove(),
              n.container
                .append(
                  n.slides
                    .first()
                    .clone()
                    .addClass("clone")
                    .attr("aria-hidden", "true")
                )
                .prepend(
                  n.slides
                    .last()
                    .clone()
                    .addClass("clone")
                    .attr("aria-hidden", "true")
                )),
            (n.newSlides = e(n.vars.selector, n)),
            (a = u
              ? n.count - 1 - n.currentSlide + n.cloneOffset
              : n.currentSlide + n.cloneOffset),
            d && !v
              ? (n.container
                  .height(200 * (n.count + n.cloneCount) + "%")
                  .css("position", "absolute")
                  .width("100%"),
                setTimeout(
                  function () {
                    n.newSlides.css({ display: "block" }),
                      n.doMath(),
                      n.viewport.height(n.h),
                      n.setProps(a * n.h, "init");
                  },
                  "init" === t ? 100 : 0
                ))
              : (n.container.width(200 * (n.count + n.cloneCount) + "%"),
                n.setProps(a * n.computedW, "init"),
                setTimeout(
                  function () {
                    n.doMath(),
                      n.newSlides.css(
                        n.vars.rtl
                          ? {
                              width: n.computedW,
                              float: "right",
                              display: "block",
                            }
                          : {
                              width: n.computedW,
                              float: "left",
                              display: "block",
                            }
                      ),
                      n.vars.smoothHeight && f.smoothHeight();
                  },
                  "init" === t ? 100 : 0
                ));
        }
        v ||
          n.slides
            .removeClass(s + "active-slide")
            .eq(n.currentSlide)
            .addClass(s + "active-slide");
      }),
      (n.doMath = function () {
        var e = n.slides.first(),
          t = n.vars.itemMargin,
          a = n.vars.minItems,
          i = n.vars.maxItems;
        (n.w = void 0 === n.viewport ? n.width() : n.viewport.width()),
          (n.h = e.height()),
          (n.boxPadding = e.outerWidth() - e.width()),
          v
            ? ((n.itemT = n.vars.itemWidth + t),
              (n.minW = a ? a * n.itemT : n.w),
              (n.maxW = i ? i * n.itemT - t : n.w),
              (n.itemW =
                n.minW > n.w
                  ? (n.w - t * (a - 1)) / a
                  : n.maxW < n.w
                  ? (n.w - t * (i - 1)) / i
                  : n.vars.itemWidth > n.w
                  ? n.w
                  : n.vars.itemWidth),
              (n.visible = Math.floor(n.w / n.itemW)),
              (n.move =
                n.vars.move > 0 && n.vars.move < n.visible
                  ? n.vars.move
                  : n.visible),
              (n.pagingCount = Math.ceil((n.count - n.visible) / n.move + 1)),
              (n.last = n.pagingCount - 1),
              (n.limit =
                1 === n.pagingCount
                  ? 0
                  : n.vars.itemWidth > n.w
                  ? n.itemW * (n.count - 1) + t * (n.count - 1)
                  : (n.itemW + t) * n.count - n.w - t))
            : ((n.itemW = n.w),
              (n.pagingCount = n.count),
              (n.last = n.count - 1)),
          (n.computedW = n.itemW - n.boxPadding);
      }),
      (n.update = function (e, t) {
        n.doMath(),
          v ||
            (e < n.currentSlide
              ? (n.currentSlide += 1)
              : e <= n.currentSlide && 0 !== e && (n.currentSlide -= 1),
            (n.animatingTo = n.currentSlide)),
          n.vars.controlNav &&
            !n.manualControls &&
            (("add" === t && !v) || n.pagingCount > n.controlNav.length
              ? f.controlNav.update("add")
              : (("remove" === t && !v) ||
                  n.pagingCount < n.controlNav.length) &&
                (v &&
                  n.currentSlide > n.last &&
                  ((n.currentSlide -= 1), (n.animatingTo -= 1)),
                f.controlNav.update("remove", n.last))),
          n.vars.directionNav && f.directionNav.update();
      }),
      (n.addSlide = function (t, a) {
        var i = e(t);
        (n.count += 1),
          (n.last = n.count - 1),
          d && u
            ? void 0 !== a
              ? n.slides.eq(n.count - a).after(i)
              : n.container.prepend(i)
            : void 0 !== a
            ? n.slides.eq(a).before(i)
            : n.container.append(i),
          n.update(a, "add"),
          (n.slides = e(n.vars.selector + ":not(.clone)", n)),
          n.setup(),
          n.vars.added(n);
      }),
      (n.removeSlide = function (t) {
        var a = isNaN(t) ? n.slides.index(e(t)) : t;
        (n.count -= 1),
          (n.last = n.count - 1),
          isNaN(t)
            ? e(t, n.slides).remove()
            : d && u
            ? n.slides.eq(n.last).remove()
            : n.slides.eq(t).remove(),
          n.doMath(),
          n.update(a, "remove"),
          (n.slides = e(n.vars.selector + ":not(.clone)", n)),
          n.setup(),
          n.vars.removed(n);
      }),
      f.init();
  }),
    e(window)
      .blur(function () {
        focused = !1;
      })
      .focus(function () {
        focused = !0;
      }),
    (e.flexslider.defaults = {
      namespace: "flex-",
      selector: ".slides > li",
      animation: "fade",
      easing: "swing",
      direction: "horizontal",
      reverse: !1,
      animationLoop: !0,
      smoothHeight: !1,
      startAt: 0,
      slideshow: !0,
      slideshowSpeed: 7e3,
      animationSpeed: 600,
      initDelay: 0,
      randomize: !1,
      thumbCaptions: !1,
      pauseOnAction: !0,
      pauseOnHover: !1,
      pauseInvisible: !0,
      useCSS: !0,
      touch: !0,
      video: !1,
      controlNav: !0,
      directionNav: !0,
      prevText: "Previous",
      nextText: "Next",
      keyboard: !0,
      multipleKeyboard: !1,
      mousewheel: !1,
      pausePlay: !1,
      pauseText: "Pause",
      playText: "Play",
      controlsContainer: "",
      manualControls: "",
      sync: "",
      asNavFor: "",
      itemWidth: 0,
      itemMargin: 0,
      minItems: 1,
      maxItems: 0,
      move: 0,
      allowOneSlide: !0,
      start: function () {},
      before: function () {},
      after: function () {},
      end: function () {},
      added: function () {},
      removed: function () {},
      rtl: !1,
    }),
    (e.fn.flexslider = function (t) {
      if ((void 0 === t && (t = {}), "object" == typeof t))
        return this.each(function () {
          var a = e(this),
            n = t.selector ? t.selector : ".slides > li",
            i = a.find(n);
          (1 === i.length && t.allowOneSlide === !0) || 0 === i.length
            ? (i.fadeIn(400), t.start && t.start(a))
            : void 0 === a.data("flexslider") && new e.flexslider(this, t);
        });
      var a = e(this).data("flexslider");
      switch (t) {
        case "play":
          a.play();
          break;
        case "pause":
          a.pause();
          break;
        case "stop":
          a.stop();
          break;
        case "next":
          a.flexAnimate(a.getTarget("next"), !0);
          break;
        case "prev":
        case "previous":
          a.flexAnimate(a.getTarget("prev"), !0);
          break;
        default:
          "number" == typeof t && a.flexAnimate(t, !0);
      }
    });
})(jQuery);

/** Froogaloop **/
var Froogaloop = (function () {
  function e(a) {
    return new e.fn.init(a);
  }
  function h(a, c, b) {
    if (!b.contentWindow.postMessage) return !1;
    var f = b.getAttribute("src").split("?")[0],
      a = JSON.stringify({ method: a, value: c });
    "//" === f.substr(0, 2) && (f = window.location.protocol + f);
    b.contentWindow.postMessage(a, f);
  }
  function j(a) {
    var c, b;
    try {
      (c = JSON.parse(a.data)), (b = c.event || c.method);
    } catch (f) {}
    "ready" == b && !i && (i = !0);
    if (a.origin != k) return !1;
    var a = c.value,
      e = c.data,
      g = "" === g ? null : c.player_id;
    c = g ? d[g][b] : d[b];
    b = [];
    if (!c) return !1;
    void 0 !== a && b.push(a);
    e && b.push(e);
    g && b.push(g);
    return 0 < b.length ? c.apply(null, b) : c.call();
  }
  function l(a, c, b) {
    b ? (d[b] || (d[b] = {}), (d[b][a] = c)) : (d[a] = c);
  }
  var d = {},
    i = !1,
    k = "";
  e.fn = e.prototype = {
    element: null,
    init: function (a) {
      "string" === typeof a && (a = document.getElementById(a));
      this.element = a;
      a = this.element.getAttribute("src");
      "//" === a.substr(0, 2) && (a = window.location.protocol + a);
      for (var a = a.split("/"), c = "", b = 0, f = a.length; b < f; b++) {
        if (3 > b) c += a[b];
        else break;
        2 > b && (c += "/");
      }
      k = c;
      return this;
    },
    api: function (a, c) {
      if (!this.element || !a) return !1;
      var b = this.element,
        f = "" !== b.id ? b.id : null,
        d = !c || !c.constructor || !c.call || !c.apply ? c : null,
        e = c && c.constructor && c.call && c.apply ? c : null;
      e && l(a, e, f);
      h(a, d, b);
      return this;
    },
    addEvent: function (a, c) {
      if (!this.element) return !1;
      var b = this.element,
        d = "" !== b.id ? b.id : null;
      l(a, c, d);
      "ready" != a
        ? h("addEventListener", a, b)
        : "ready" == a && i && c.call(null, d);
      return this;
    },
    removeEvent: function (a) {
      if (!this.element) return !1;
      var c = this.element,
        b;
      a: {
        if ((b = "" !== c.id ? c.id : null) && d[b]) {
          if (!d[b][a]) {
            b = !1;
            break a;
          }
          d[b][a] = null;
        } else {
          if (!d[a]) {
            b = !1;
            break a;
          }
          d[a] = null;
        }
        b = !0;
      }
      "ready" != a && b && h("removeEventListener", a, c);
    },
  };
  e.fn.init.prototype = e.fn;
  window.addEventListener
    ? window.addEventListener("message", j, !1)
    : window.attachEvent("onmessage", j);
  return (window.Froogaloop = window.$f = e);
})();

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransforms-csstransforms3d-csstransitions-svg-touch-shiv-mq-cssclasses-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
(window.Modernizr = (function (a, b, c) {
  function B(a) {
    j.cssText = a;
  }
  function C(a, b) {
    return B(m.join(a + ";") + (b || ""));
  }
  function D(a, b) {
    return typeof a === b;
  }
  function E(a, b) {
    return !!~("" + a).indexOf(b);
  }
  function F(a, b) {
    for (var d in a) {
      var e = a[d];
      if (!E(e, "-") && j[e] !== c) return b == "pfx" ? e : !0;
    }
    return !1;
  }
  function G(a, b, d) {
    for (var e in a) {
      var f = b[a[e]];
      if (f !== c)
        return d === !1 ? a[e] : D(f, "function") ? f.bind(d || b) : f;
    }
    return !1;
  }
  function H(a, b, c) {
    var d = a.charAt(0).toUpperCase() + a.slice(1),
      e = (a + " " + o.join(d + " ") + d).split(" ");
    return D(b, "string") || D(b, "undefined")
      ? F(e, b)
      : ((e = (a + " " + p.join(d + " ") + d).split(" ")), G(e, b, c));
  }
  var d = "2.6.2",
    e = {},
    f = !0,
    g = b.documentElement,
    h = "modernizr",
    i = b.createElement(h),
    j = i.style,
    k,
    l = {}.toString,
    m = " -webkit- -moz- -o- -ms- ".split(" "),
    n = "Webkit Moz O ms",
    o = n.split(" "),
    p = n.toLowerCase().split(" "),
    q = { svg: "http://www.w3.org/2000/svg" },
    r = {},
    s = {},
    t = {},
    u = [],
    v = u.slice,
    w,
    x = function (a, c, d, e) {
      var f,
        i,
        j,
        k,
        l = b.createElement("div"),
        m = b.body,
        n = m || b.createElement("body");
      if (parseInt(d, 10))
        while (d--)
          (j = b.createElement("div")),
            (j.id = e ? e[d] : h + (d + 1)),
            l.appendChild(j);
      return (
        (f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join("")),
        (l.id = h),
        ((m ? l : n).innerHTML += f),
        n.appendChild(l),
        m ||
          ((n.style.background = ""),
          (n.style.overflow = "hidden"),
          (k = g.style.overflow),
          (g.style.overflow = "hidden"),
          g.appendChild(n)),
        (i = c(l, a)),
        m
          ? l.parentNode.removeChild(l)
          : (n.parentNode.removeChild(n), (g.style.overflow = k)),
        !!i
      );
    },
    y = function (b) {
      var c = a.matchMedia || a.msMatchMedia;
      if (c) return c(b).matches;
      var d;
      return (
        x(
          "@media " + b + " { #" + h + " { position: absolute; } }",
          function (b) {
            d =
              (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle)[
                "position"
              ] == "absolute";
          }
        ),
        d
      );
    },
    z = {}.hasOwnProperty,
    A;
  !D(z, "undefined") && !D(z.call, "undefined")
    ? (A = function (a, b) {
        return z.call(a, b);
      })
    : (A = function (a, b) {
        return b in a && D(a.constructor.prototype[b], "undefined");
      }),
    Function.prototype.bind ||
      (Function.prototype.bind = function (b) {
        var c = this;
        if (typeof c != "function") throw new TypeError();
        var d = v.call(arguments, 1),
          e = function () {
            if (this instanceof e) {
              var a = function () {};
              a.prototype = c.prototype;
              var f = new a(),
                g = c.apply(f, d.concat(v.call(arguments)));
              return Object(g) === g ? g : f;
            }
            return c.apply(b, d.concat(v.call(arguments)));
          };
        return e;
      }),
    (r.touch = function () {
      var c;
      return (
        "ontouchstart" in a || (a.DocumentTouch && b instanceof DocumentTouch)
          ? (c = !0)
          : x(
              [
                "@media (",
                m.join("touch-enabled),("),
                h,
                ")",
                "{#modernizr{top:9px;position:absolute}}",
              ].join(""),
              function (a) {
                c = a.offsetTop === 9;
              }
            ),
        c
      );
    }),
    (r.csstransforms = function () {
      return !!H("transform");
    }),
    (r.csstransforms3d = function () {
      var a = !!H("perspective");
      return (
        a &&
          "webkitPerspective" in g.style &&
          x(
            "@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",
            function (b, c) {
              a = b.offsetLeft === 9 && b.offsetHeight === 3;
            }
          ),
        a
      );
    }),
    (r.csstransitions = function () {
      return H("transition");
    }),
    (r.svg = function () {
      return (
        !!b.createElementNS && !!b.createElementNS(q.svg, "svg").createSVGRect
      );
    });
  for (var I in r)
    A(r, I) &&
      ((w = I.toLowerCase()), (e[w] = r[I]()), u.push((e[w] ? "" : "no-") + w));
  return (
    (e.addTest = function (a, b) {
      if (typeof a == "object") for (var d in a) A(a, d) && e.addTest(d, a[d]);
      else {
        a = a.toLowerCase();
        if (e[a] !== c) return e;
        (b = typeof b == "function" ? b() : b),
          typeof f != "undefined" &&
            f &&
            (g.className += " " + (b ? "" : "no-") + a),
          (e[a] = b);
      }
      return e;
    }),
    B(""),
    (i = k = null),
    (function (a, b) {
      function k(a, b) {
        var c = a.createElement("p"),
          d = a.getElementsByTagName("head")[0] || a.documentElement;
        return (
          (c.innerHTML = "x<style>" + b + "</style>"),
          d.insertBefore(c.lastChild, d.firstChild)
        );
      }
      function l() {
        var a = r.elements;
        return typeof a == "string" ? a.split(" ") : a;
      }
      function m(a) {
        var b = i[a[g]];
        return b || ((b = {}), h++, (a[g] = h), (i[h] = b)), b;
      }
      function n(a, c, f) {
        c || (c = b);
        if (j) return c.createElement(a);
        f || (f = m(c));
        var g;
        return (
          f.cache[a]
            ? (g = f.cache[a].cloneNode())
            : e.test(a)
            ? (g = (f.cache[a] = f.createElem(a)).cloneNode())
            : (g = f.createElem(a)),
          g.canHaveChildren && !d.test(a) ? f.frag.appendChild(g) : g
        );
      }
      function o(a, c) {
        a || (a = b);
        if (j) return a.createDocumentFragment();
        c = c || m(a);
        var d = c.frag.cloneNode(),
          e = 0,
          f = l(),
          g = f.length;
        for (; e < g; e++) d.createElement(f[e]);
        return d;
      }
      function p(a, b) {
        b.cache ||
          ((b.cache = {}),
          (b.createElem = a.createElement),
          (b.createFrag = a.createDocumentFragment),
          (b.frag = b.createFrag())),
          (a.createElement = function (c) {
            return r.shivMethods ? n(c, a, b) : b.createElem(c);
          }),
          (a.createDocumentFragment = Function(
            "h,f",
            "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" +
              l()
                .join()
                .replace(/\w+/g, function (a) {
                  return (
                    b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
                  );
                }) +
              ");return n}"
          )(r, b.frag));
      }
      function q(a) {
        a || (a = b);
        var c = m(a);
        return (
          r.shivCSS &&
            !f &&
            !c.hasCSS &&
            (c.hasCSS = !!k(
              a,
              "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}"
            )),
          j || p(a, c),
          a
        );
      }
      var c = a.html5 || {},
        d =
          /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        e =
          /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
        f,
        g = "_html5shiv",
        h = 0,
        i = {},
        j;
      (function () {
        try {
          var a = b.createElement("a");
          (a.innerHTML = "<xyz></xyz>"),
            (f = "hidden" in a),
            (j =
              a.childNodes.length == 1 ||
              (function () {
                b.createElement("a");
                var a = b.createDocumentFragment();
                return (
                  typeof a.cloneNode == "undefined" ||
                  typeof a.createDocumentFragment == "undefined" ||
                  typeof a.createElement == "undefined"
                );
              })());
        } catch (c) {
          (f = !0), (j = !0);
        }
      })();
      var r = {
        elements:
          c.elements ||
          "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
        shivCSS: c.shivCSS !== !1,
        supportsUnknownElements: j,
        shivMethods: c.shivMethods !== !1,
        type: "default",
        shivDocument: q,
        createElement: n,
        createDocumentFragment: o,
      };
      (a.html5 = r), q(b);
    })(this, b),
    (e._version = d),
    (e._prefixes = m),
    (e._domPrefixes = p),
    (e._cssomPrefixes = o),
    (e.mq = y),
    (e.testProp = function (a) {
      return F([a]);
    }),
    (e.testAllProps = H),
    (e.testStyles = x),
    (e.prefixed = function (a, b, c) {
      return b ? H(a, b, c) : H(a, "pfx");
    }),
    (g.className =
      g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") +
      (f ? " js " + u.join(" ") : "")),
    e
  );
})(this, this.document)),
  (function (a, b, c) {
    function d(a) {
      return "[object Function]" == o.call(a);
    }
    function e(a) {
      return "string" == typeof a;
    }
    function f() {}
    function g(a) {
      return !a || "loaded" == a || "complete" == a || "uninitialized" == a;
    }
    function h() {
      var a = p.shift();
      (q = 1),
        a
          ? a.t
            ? m(function () {
                ("c" == a.t
                  ? B.injectCss
                  : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1);
              }, 0)
            : (a(), h())
          : (q = 0);
    }
    function i(a, c, d, e, f, i, j) {
      function k(b) {
        if (
          !o &&
          g(l.readyState) &&
          ((u.r = o = 1),
          !q && h(),
          (l.onload = l.onreadystatechange = null),
          b)
        ) {
          "img" != a &&
            m(function () {
              t.removeChild(l);
            }, 50);
          for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload();
        }
      }
      var j = j || B.errorTimeout,
        l = b.createElement(a),
        o = 0,
        r = 0,
        u = { t: d, s: c, e: f, a: i, x: j };
      1 === y[c] && ((r = 1), (y[c] = [])),
        "object" == a ? (l.data = c) : ((l.src = c), (l.type = a)),
        (l.width = l.height = "0"),
        (l.onerror =
          l.onload =
          l.onreadystatechange =
            function () {
              k.call(this, r);
            }),
        p.splice(e, 0, u),
        "img" != a &&
          (r || 2 === y[c]
            ? (t.insertBefore(l, s ? null : n), m(k, j))
            : y[c].push(l));
    }
    function j(a, b, c, d, f) {
      return (
        (q = 0),
        (b = b || "j"),
        e(a)
          ? i("c" == b ? v : u, a, b, this.i++, c, d, f)
          : (p.splice(this.i++, 0, a), 1 == p.length && h()),
        this
      );
    }
    function k() {
      var a = B;
      return (a.loader = { load: j, i: 0 }), a;
    }
    var l = b.documentElement,
      m = a.setTimeout,
      n = b.getElementsByTagName("script")[0],
      o = {}.toString,
      p = [],
      q = 0,
      r = "MozAppearance" in l.style,
      s = r && !!b.createRange().compareNode,
      t = s ? l : n.parentNode,
      l = a.opera && "[object Opera]" == o.call(a.opera),
      l = !!b.attachEvent && !l,
      u = r ? "object" : l ? "script" : "img",
      v = l ? "script" : u,
      w =
        Array.isArray ||
        function (a) {
          return "[object Array]" == o.call(a);
        },
      x = [],
      y = {},
      z = {
        timeout: function (a, b) {
          return b.length && (a.timeout = b[0]), a;
        },
      },
      A,
      B;
    (B = function (a) {
      function b(a) {
        var a = a.split("!"),
          b = x.length,
          c = a.pop(),
          d = a.length,
          c = { url: c, origUrl: c, prefixes: a },
          e,
          f,
          g;
        for (f = 0; f < d; f++)
          (g = a[f].split("=")), (e = z[g.shift()]) && (c = e(c, g));
        for (f = 0; f < b; f++) c = x[f](c);
        return c;
      }
      function g(a, e, f, g, h) {
        var i = b(a),
          j = i.autoCallback;
        i.url.split(".").pop().split("?").shift(),
          i.bypass ||
            (e &&
              (e = d(e)
                ? e
                : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]),
            i.instead
              ? i.instead(a, e, f, g, h)
              : (y[i.url] ? (i.noexec = !0) : (y[i.url] = 1),
                f.load(
                  i.url,
                  i.forceCSS ||
                    (!i.forceJS &&
                      "css" == i.url.split(".").pop().split("?").shift())
                    ? "c"
                    : c,
                  i.noexec,
                  i.attrs,
                  i.timeout
                ),
                (d(e) || d(j)) &&
                  f.load(function () {
                    k(),
                      e && e(i.origUrl, h, g),
                      j && j(i.origUrl, h, g),
                      (y[i.url] = 2);
                  })));
      }
      function h(a, b) {
        function c(a, c) {
          if (a) {
            if (e(a))
              c ||
                (j = function () {
                  var a = [].slice.call(arguments);
                  k.apply(this, a), l();
                }),
                g(a, j, b, 0, h);
            else if (Object(a) === a)
              for (n in ((m = (function () {
                var b = 0,
                  c;
                for (c in a) a.hasOwnProperty(c) && b++;
                return b;
              })()),
              a))
                a.hasOwnProperty(n) &&
                  (!c &&
                    !--m &&
                    (d(j)
                      ? (j = function () {
                          var a = [].slice.call(arguments);
                          k.apply(this, a), l();
                        })
                      : (j[n] = (function (a) {
                          return function () {
                            var b = [].slice.call(arguments);
                            a && a.apply(this, b), l();
                          };
                        })(k[n]))),
                  g(a[n], j, b, n, h));
          } else !c && l();
        }
        var h = !!a.test,
          i = a.load || a.both,
          j = a.callback || f,
          k = j,
          l = a.complete || f,
          m,
          n;
        c(h ? a.yep : a.nope, !!i), i && c(i);
      }
      var i,
        j,
        l = this.yepnope.loader;
      if (e(a)) g(a, 0, l, 0);
      else if (w(a))
        for (i = 0; i < a.length; i++)
          (j = a[i]),
            e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
      else Object(a) === a && h(a, l);
    }),
      (B.addPrefix = function (a, b) {
        z[a] = b;
      }),
      (B.addFilter = function (a) {
        x.push(a);
      }),
      (B.errorTimeout = 1e4),
      null == b.readyState &&
        b.addEventListener &&
        ((b.readyState = "loading"),
        b.addEventListener(
          "DOMContentLoaded",
          (A = function () {
            b.removeEventListener("DOMContentLoaded", A, 0),
              (b.readyState = "complete");
          }),
          0
        )),
      (a.yepnope = k()),
      (a.yepnope.executeStack = h),
      (a.yepnope.injectJs = function (a, c, d, e, i, j) {
        var k = b.createElement("script"),
          l,
          o,
          e = e || B.errorTimeout;
        k.src = a;
        for (o in d) k.setAttribute(o, d[o]);
        (c = j ? h : c || f),
          (k.onreadystatechange = k.onload =
            function () {
              !l &&
                g(k.readyState) &&
                ((l = 1), c(), (k.onload = k.onreadystatechange = null));
            }),
          m(function () {
            l || ((l = 1), c(1));
          }, e),
          i ? k.onload() : n.parentNode.insertBefore(k, n);
      }),
      (a.yepnope.injectCss = function (a, c, d, e, g, i) {
        var e = b.createElement("link"),
          j,
          c = i ? h : c || f;
        (e.href = a), (e.rel = "stylesheet"), (e.type = "text/css");
        for (j in d) e.setAttribute(j, d[j]);
        g || (n.parentNode.insertBefore(e, n), m(c, 0));
      });
  })(this, document),
  (Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0));
  });

/*
 * Justified Gallery - v3.1.0
 * http://miromannino.com/projects/justified-gallery/
 * Copyright (c) 2014 Miro Mannino
 * Licensed under the MIT license.
 */
!(function (e) {
  e.fn.justifiedGallery = function (t) {
    function i(e, t, i) {
      var n;
      return (
        (n = e > t ? e : t),
        100 >= n
          ? i.settings.sizeRangeSuffixes.lt100
          : 240 >= n
          ? i.settings.sizeRangeSuffixes.lt240
          : 320 >= n
          ? i.settings.sizeRangeSuffixes.lt320
          : 500 >= n
          ? i.settings.sizeRangeSuffixes.lt500
          : 640 >= n
          ? i.settings.sizeRangeSuffixes.lt640
          : i.settings.sizeRangeSuffixes.lt1024
      );
    }
    function n(t) {
      e(t.currentTarget).find(".caption").stop().fadeTo(500, 0.7);
    }
    function s(t) {
      e(t.currentTarget).find(".caption").stop().fadeTo(500, 0);
    }
    function a(t, a, g, r, o, l, f) {
      var d = t.find("img");
      d.css("width", r),
        d.css("height", o),
        d.css("margin-left", -r / 2),
        d.css("margin-top", -o / 2),
        t.width(r),
        t.height(l),
        t.css("top", g),
        t.css("left", a);
      var u = d.attr("src"),
        h =
          u
            .replace(f.settings.extension, "")
            .replace(f.usedSizeRangeRegExp, "") +
          i(r, o, f) +
          u.match(f.settings.extension)[0];
      d.one("error", function () {
        d.attr("src", d.data("jg.originalSrc"));
      }),
        t.stop().fadeTo(300, 1, function () {
          u !== h && d.attr("src", h);
        });
      var c = t.data("jg.captionMouseEvents");
      if (f.settings.captions === !0) {
        var w = t.find(".caption");
        if (0 === w.length) {
          var m = d.attr("alt");
          "undefined" == typeof m && (m = t.attr("title")),
            "undefined" != typeof m &&
              ((w = e('<div class="caption">' + m + "</div>")), t.append(w));
        }
        0 !== w.length &&
          "undefined" == typeof c &&
          ((c = { mouseenter: n, mouseleave: s }),
          t.on("mouseenter", c.mouseenter),
          t.on("mouseleave", c.mouseleave),
          t.data("jg.captionMouseEvents", c));
      } else
        "undefined" != typeof c &&
          (t.off("mouseenter", c.mouseenter),
          t.off("mouseleave", c.mouseleave),
          t.removeData("jg.captionMouseEvents"));
    }
    function g(e, t) {
      var i,
        n,
        s,
        a,
        g,
        r,
        o = !0,
        l = 0,
        f = e.galleryWidth,
        d =
          f -
          e.buildingRow.width -
          (e.buildingRow.entriesBuff.length - 1) * e.settings.margins;
      if (t && "hide" === e.settings.lastRow && d / f > 0.35) {
        for (i = 0; i < e.buildingRow.entriesBuff.length; i++)
          (n = e.buildingRow.entriesBuff[i]), n.stop().fadeTo(0);
        return -1;
      }
      for (
        t && "nojustify" === e.settings.lastRow && d / f > 0.35 && (o = !1),
          i = 0;
        i < e.buildingRow.entriesBuff.length;
        i++
      )
        (s = e.buildingRow.entriesBuff[i].find("img")),
          (a = Math.ceil(
            s.data("jg.imgw") / (s.data("jg.imgh") / e.settings.rowHeight)
          )),
          o
            ? ((g =
                i < e.buildingRow.entriesBuff.length - 1
                  ? a + Math.ceil((a / e.buildingRow.width) * d)
                  : f),
              (r = Math.ceil(e.settings.rowHeight * (g / a))),
              e.settings.fixedHeight &&
                r < e.settings.rowHeight &&
                ((g = a), (r = e.settings.rowHeight)))
            : ((g = a), (r = e.settings.rowHeight)),
          s.data("jg.imgw", g),
          s.data("jg.imgh", r),
          (f -=
            g +
            (i < e.buildingRow.entriesBuff.length - 1
              ? e.settings.margins
              : 0)),
          (0 === i || l > r) && (l = r);
      return e.settings.fixedHeight && (l = e.settings.rowHeight), l;
    }
    function r(e) {
      (e.lastAnalyzedIndex = -1),
        (e.buildingRow.entriesBuff = []),
        (e.buildingRow.width = 0),
        (e.offY = 0),
        (e.firstRowFlushed = !1);
    }
    function o(e, t) {
      var i,
        n,
        s,
        r = 0;
      if (((s = g(e, t)), t && "hide" === e.settings.lastRow && -1 === s))
        return (e.buildingRow.entriesBuff = []), void (e.buildingRow.width = 0);
      e.settings.maxRowHeight > 0 && e.settings.maxRowHeight < s
        ? (s = e.settings.maxRowHeight)
        : 0 === e.settings.maxRowHeight &&
          1.5 * e.settings.rowHeight < s &&
          (s = 1.5 * e.settings.rowHeight);
      for (var o = 0; o < e.buildingRow.entriesBuff.length; o++)
        (i = e.buildingRow.entriesBuff[o]),
          (n = i.find("img")),
          a(i, r, e.offY, n.data("jg.imgw"), n.data("jg.imgh"), s, e),
          (r += n.data("jg.imgw") + e.settings.margins);
      e.$gallery.height(
        e.offY + s + (e.spinner.active ? e.spinner.$el.innerHeight() : 0)
      ),
        t ||
          ((e.offY += s + e.settings.margins),
          (e.buildingRow.entriesBuff = []),
          (e.buildingRow.width = 0),
          (e.firstRowFlushed = !0),
          e.$gallery.trigger("jg.rowflush"));
    }
    function l(e) {
      e.checkWidthIntervalId = setInterval(function () {
        var t = parseInt(e.$gallery.width(), 10);
        e.galleryWidth !== t && ((e.galleryWidth = t), r(e), h(e, !0));
      }, e.settings.refreshTime);
    }
    function f(e) {
      clearInterval(e.intervalId),
        (e.intervalId = setInterval(function () {
          e.phase < e.$points.length
            ? e.$points.eq(e.phase).fadeTo(e.timeslot, 1)
            : e.$points.eq(e.phase - e.$points.length).fadeTo(e.timeslot, 0),
            (e.phase = (e.phase + 1) % (2 * e.$points.length));
        }, e.timeslot));
    }
    function d(e) {
      clearInterval(e.intervalId), (e.intervalId = null);
    }
    function u(e) {
      (e.yield.flushed = 0),
        null !== e.imgAnalyzerTimeout && clearTimeout(e.imgAnalyzerTimeout);
    }
    function h(e, t) {
      u(e),
        (e.imgAnalyzerTimeout = setTimeout(function () {
          c(e, t);
        }, 0.001)),
        c(e, t);
    }
    function c(t, i) {
      for (
        var n = t.firstRowFlushed, s = t.lastAnalyzedIndex + 1;
        s < t.entries.length;
        s++
      ) {
        var a = e(t.entries[s]),
          g = a.find("img");
        if (g.data("jg.loaded") === !0) {
          var r = Math.ceil(
            g.data("jg.imgw") / (g.data("jg.imgh") / t.settings.rowHeight)
          );
          if (
            ((n = t.firstRowFlushed && s >= t.entries.length - 1),
            t.buildingRow.width +
              (t.settings.fixedHeight ? r : r / 2) +
              (t.buildingRow.entriesBuff.length - 1) * t.settings.margins >
              t.galleryWidth && (o(t, n), ++t.yield.flushed >= t.yield.every))
          )
            return void h(t, i);
          t.buildingRow.entriesBuff.push(a),
            (t.buildingRow.width += r),
            (t.lastAnalyzedIndex = s);
        } else if ("error" !== g.data("jg.loaded")) return;
      }
      t.buildingRow.entriesBuff.length > 0 && o(t, n),
        t.spinner.active &&
          ((t.spinner.active = !1),
          t.$gallery.height(t.$gallery.height() - t.spinner.$el.innerHeight()),
          t.spinner.$el.detach(),
          d(t.spinner)),
        u(t),
        t.$gallery.trigger(i ? "jg.resize" : "jg.complete");
    }
    function w(e) {
      function t(t) {
        if ("string" != typeof e.settings.sizeRangeSuffixes[t])
          throw "sizeRangeSuffixes." + t + " must be a string";
      }
      function i(t) {
        if ("string" == typeof e.settings[t]) {
          if (
            ((e.settings[t] = parseInt(e.settings[t], 10)),
            isNaN(e.settings[t]))
          )
            throw "invalid number for " + t;
        } else {
          if ("number" != typeof e.settings[t]) throw t + " must be a number";
          if (isNaN(e.settings[t])) throw "invalid number for " + t;
        }
      }
      if ("object" != typeof e.settings.sizeRangeSuffixes)
        throw "sizeRangeSuffixes must be defined and must be an object";
      if (
        (t("lt100"),
        t("lt240"),
        t("lt320"),
        t("lt500"),
        t("lt640"),
        t("lt1024"),
        i("rowHeight"),
        i("maxRowHeight"),
        i("margins"),
        "nojustify" !== e.settings.lastRow &&
          "justify" !== e.settings.lastRow &&
          "hide" !== e.settings.lastRow)
      )
        throw 'lastRow must be "nojustify", "justify" or "hide"';
      if ("boolean" != typeof e.settings.fixedHeight)
        throw "fixedHeight must be a boolean";
      if ("boolean" != typeof e.settings.captions)
        throw "captions must be a boolean";
      if ((i("refreshTime"), "boolean" != typeof e.settings.randomize))
        throw "randomize must be a boolean";
    }
    var m = {
      sizeRangeSuffixes: {
        lt100: "_t",
        lt240: "_m",
        lt320: "_n",
        lt500: "",
        lt640: "_z",
        lt1024: "_b",
      },
      rowHeight: 120,
      maxRowHeight: 0,
      margins: 1,
      lastRow: "nojustify",
      fixedHeight: !1,
      captions: !0,
      rel: null,
      target: null,
      extension: /\.[^.]+$/,
      refreshTime: 250,
      randomize: !1,
    };
    return this.each(function (i, n) {
      var s = e(n);
      s.addClass("justified-gallery");
      var a = s.data("jg.context");
      if ("undefined" == typeof a) {
        if ("undefined" != typeof t && null !== t && "object" != typeof t)
          throw "The argument must be an object";
        var g = e(
          '<div class="spinner"><span></span><span></span><span></span></div>'
        );
        (a = {
          settings: e.extend({}, m, t),
          imgAnalyzerTimeout: null,
          entries: null,
          buildingRow: { entriesBuff: [], width: 0 },
          lastAnalyzedIndex: -1,
          firstRowFlushed: !1,
          yield: { every: 2, flushed: 0 },
          offY: 0,
          spinner: {
            active: !1,
            phase: 0,
            timeslot: 150,
            $el: g,
            $points: g.find("span"),
            intervalId: null,
          },
          checkWidthIntervalId: null,
          galleryWidth: s.width(),
          $gallery: s,
        }),
          s.data("jg.context", a);
      } else "norewind" === t || ((a.settings = e.extend({}, a.settings, t)), r(a));
      if ((w(a), (a.entries = s.find("a").toArray()), 0 !== a.entries.length)) {
        a.settings.randomize &&
          (a.entries.sort(function () {
            return 2 * Math.random() - 1;
          }),
          e.each(a.entries, function () {
            e(this).appendTo(s);
          })),
          (a.usedSizeRangeRegExp = new RegExp(
            "(" +
              a.settings.sizeRangeSuffixes.lt100 +
              "|" +
              a.settings.sizeRangeSuffixes.lt240 +
              "|" +
              a.settings.sizeRangeSuffixes.lt320 +
              "|" +
              a.settings.sizeRangeSuffixes.lt500 +
              "|" +
              a.settings.sizeRangeSuffixes.lt640 +
              "|" +
              a.settings.sizeRangeSuffixes.lt1024 +
              ")$"
          )),
          a.settings.maxRowHeight > 0 &&
            a.settings.maxRowHeight < a.settings.rowHeight &&
            (a.settings.maxRowHeight = a.settings.rowHeight);
        var o = !1;
        e.each(a.entries, function (t, i) {
          var n = e(i),
            g = n.find("img");
          if (g.data("jg.loaded") !== !0) {
            g.data("jg.loaded", !1),
              (o = !0),
              a.spinner.active === !1 &&
                ((a.spinner.active = !0),
                s.append(a.spinner.$el),
                s.height(a.offY + a.spinner.$el.innerHeight()),
                f(a.spinner)),
              null !== a.settings.rel && n.attr("rel", a.settings.rel),
              null !== a.settings.target && n.attr("target", a.settings.target);
            var r =
              "undefined" != typeof g.data("safe-src")
                ? g.data("safe-src")
                : g.attr("src");
            g.data("jg.originalSrc", r), g.attr("src", r);
            var l = new Image(),
              d = e(l);
            d.one("load", function () {
              g.off("load error"),
                g.data("jg.imgw", l.width),
                g.data("jg.imgh", l.height),
                g.data("jg.loaded", !0),
                h(a, !1);
            }),
              d.one("error", function () {
                g.off("load error"), g.data("jg.loaded", "error"), h(a, !1);
              }),
              (l.src = r);
          }
        }),
          o || h(a, !1),
          l(a);
      }
    });
  };
})(jQuery);

/*! Magnific Popup - v0.9.9 - 2013-12-27
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2013 Dmitry Semenov; */
(function (e) {
  var t,
    n,
    i,
    o,
    r,
    a,
    s,
    l = "Close",
    c = "BeforeClose",
    d = "AfterClose",
    u = "BeforeAppend",
    p = "MarkupParse",
    f = "Open",
    m = "Change",
    g = "mfp",
    h = "." + g,
    v = "mfp-ready",
    C = "mfp-removing",
    y = "mfp-prevent-close",
    w = function () {},
    b = !!window.jQuery,
    I = e(window),
    x = function (e, n) {
      t.ev.on(g + e + h, n);
    },
    k = function (t, n, i, o) {
      var r = document.createElement("div");
      return (
        (r.className = "mfp-" + t),
        i && (r.innerHTML = i),
        o ? n && n.appendChild(r) : ((r = e(r)), n && r.appendTo(n)),
        r
      );
    },
    T = function (n, i) {
      t.ev.triggerHandler(g + n, i),
        t.st.callbacks &&
          ((n = n.charAt(0).toLowerCase() + n.slice(1)),
          t.st.callbacks[n] &&
            t.st.callbacks[n].apply(t, e.isArray(i) ? i : [i]));
    },
    E = function (n) {
      return (
        (n === s && t.currTemplate.closeBtn) ||
          ((t.currTemplate.closeBtn = e(
            t.st.closeMarkup.replace("%title%", t.st.tClose)
          )),
          (s = n)),
        t.currTemplate.closeBtn
      );
    },
    _ = function () {
      e.magnificPopup.instance ||
        ((t = new w()), t.init(), (e.magnificPopup.instance = t));
    },
    S = function () {
      var e = document.createElement("p").style,
        t = ["ms", "O", "Moz", "Webkit"];
      if (void 0 !== e.transition) return !0;
      for (; t.length; ) if (t.pop() + "Transition" in e) return !0;
      return !1;
    };
  (w.prototype = {
    constructor: w,
    init: function () {
      var n = navigator.appVersion;
      (t.isIE7 = -1 !== n.indexOf("MSIE 7.")),
        (t.isIE8 = -1 !== n.indexOf("MSIE 8.")),
        (t.isLowIE = t.isIE7 || t.isIE8),
        (t.isAndroid = /android/gi.test(n)),
        (t.isIOS = /iphone|ipad|ipod/gi.test(n)),
        (t.supportsTransition = S()),
        (t.probablyMobile =
          t.isAndroid ||
          t.isIOS ||
          /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
            navigator.userAgent
          )),
        (o = e(document)),
        (t.popupsCache = {});
    },
    open: function (n) {
      i || (i = e(document.body));
      var r;
      if (n.isObj === !1) {
        (t.items = n.items.toArray()), (t.index = 0);
        var s,
          l = n.items;
        for (r = 0; l.length > r; r++)
          if (((s = l[r]), s.parsed && (s = s.el[0]), s === n.el[0])) {
            t.index = r;
            break;
          }
      } else
        (t.items = e.isArray(n.items) ? n.items : [n.items]),
          (t.index = n.index || 0);
      if (t.isOpen) return t.updateItemHTML(), void 0;
      (t.types = []),
        (a = ""),
        (t.ev = n.mainEl && n.mainEl.length ? n.mainEl.eq(0) : o),
        n.key
          ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}),
            (t.currTemplate = t.popupsCache[n.key]))
          : (t.currTemplate = {}),
        (t.st = e.extend(!0, {}, e.magnificPopup.defaults, n)),
        (t.fixedContentPos =
          "auto" === t.st.fixedContentPos
            ? !t.probablyMobile
            : t.st.fixedContentPos),
        t.st.modal &&
          ((t.st.closeOnContentClick = !1),
          (t.st.closeOnBgClick = !1),
          (t.st.showCloseBtn = !1),
          (t.st.enableEscapeKey = !1)),
        t.bgOverlay ||
          ((t.bgOverlay = k("bg").on("click" + h, function () {
            t.close();
          })),
          (t.wrap = k("wrap")
            .attr("tabindex", -1)
            .on("click" + h, function (e) {
              t._checkIfClose(e.target) && t.close();
            })),
          (t.container = k("container", t.wrap))),
        (t.contentContainer = k("content")),
        t.st.preloader &&
          (t.preloader = k("preloader", t.container, t.st.tLoading));
      var c = e.magnificPopup.modules;
      for (r = 0; c.length > r; r++) {
        var d = c[r];
        (d = d.charAt(0).toUpperCase() + d.slice(1)), t["init" + d].call(t);
      }
      T("BeforeOpen"),
        t.st.showCloseBtn &&
          (t.st.closeBtnInside
            ? (x(p, function (e, t, n, i) {
                n.close_replaceWith = E(i.type);
              }),
              (a += " mfp-close-btn-in"))
            : t.wrap.append(E())),
        t.st.alignTop && (a += " mfp-align-top"),
        t.fixedContentPos
          ? t.wrap.css({
              overflow: t.st.overflowY,
              overflowX: "hidden",
              overflowY: t.st.overflowY,
            })
          : t.wrap.css({ top: I.scrollTop(), position: "absolute" }),
        (t.st.fixedBgPos === !1 ||
          ("auto" === t.st.fixedBgPos && !t.fixedContentPos)) &&
          t.bgOverlay.css({ height: o.height(), position: "absolute" }),
        t.st.enableEscapeKey &&
          o.on("keyup" + h, function (e) {
            27 === e.keyCode && t.close();
          }),
        I.on("resize" + h, function () {
          t.updateSize();
        }),
        t.st.closeOnContentClick || (a += " mfp-auto-cursor"),
        a && t.wrap.addClass(a);
      var u = (t.wH = I.height()),
        m = {};
      if (t.fixedContentPos && t._hasScrollBar(u)) {
        var g = t._getScrollbarSize();
        g && (m.marginRight = g);
      }
      t.fixedContentPos &&
        (t.isIE7
          ? e("body, html").css("overflow", "hidden")
          : (m.overflow = "hidden"));
      var C = t.st.mainClass;
      return (
        t.isIE7 && (C += " mfp-ie7"),
        C && t._addClassToMFP(C),
        t.updateItemHTML(),
        T("BuildControls"),
        e("html").css(m),
        t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || i),
        (t._lastFocusedEl = document.activeElement),
        setTimeout(function () {
          t.content
            ? (t._addClassToMFP(v), t._setFocus())
            : t.bgOverlay.addClass(v),
            o.on("focusin" + h, t._onFocusIn);
        }, 16),
        (t.isOpen = !0),
        t.updateSize(u),
        T(f),
        n
      );
    },
    close: function () {
      t.isOpen &&
        (T(c),
        (t.isOpen = !1),
        t.st.removalDelay && !t.isLowIE && t.supportsTransition
          ? (t._addClassToMFP(C),
            setTimeout(function () {
              t._close();
            }, t.st.removalDelay))
          : t._close());
    },
    _close: function () {
      T(l);
      var n = C + " " + v + " ";
      if (
        (t.bgOverlay.detach(),
        t.wrap.detach(),
        t.container.empty(),
        t.st.mainClass && (n += t.st.mainClass + " "),
        t._removeClassFromMFP(n),
        t.fixedContentPos)
      ) {
        var i = { marginRight: "" };
        t.isIE7 ? e("body, html").css("overflow", "") : (i.overflow = ""),
          e("html").css(i);
      }
      o.off("keyup" + h + " focusin" + h),
        t.ev.off(h),
        t.wrap.attr("class", "mfp-wrap").removeAttr("style"),
        t.bgOverlay.attr("class", "mfp-bg"),
        t.container.attr("class", "mfp-container"),
        !t.st.showCloseBtn ||
          (t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0) ||
          (t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach()),
        t._lastFocusedEl && e(t._lastFocusedEl).focus(),
        (t.currItem = null),
        (t.content = null),
        (t.currTemplate = null),
        (t.prevHeight = 0),
        T(d);
    },
    updateSize: function (e) {
      if (t.isIOS) {
        var n = document.documentElement.clientWidth / window.innerWidth,
          i = window.innerHeight * n;
        t.wrap.css("height", i), (t.wH = i);
      } else t.wH = e || I.height();
      t.fixedContentPos || t.wrap.css("height", t.wH), T("Resize");
    },
    updateItemHTML: function () {
      var n = t.items[t.index];
      t.contentContainer.detach(),
        t.content && t.content.detach(),
        n.parsed || (n = t.parseEl(t.index));
      var i = n.type;
      if (
        (T("BeforeChange", [t.currItem ? t.currItem.type : "", i]),
        (t.currItem = n),
        !t.currTemplate[i])
      ) {
        var o = t.st[i] ? t.st[i].markup : !1;
        T("FirstMarkupParse", o), (t.currTemplate[i] = o ? e(o) : !0);
      }
      r && r !== n.type && t.container.removeClass("mfp-" + r + "-holder");
      var a = t["get" + i.charAt(0).toUpperCase() + i.slice(1)](
        n,
        t.currTemplate[i]
      );
      t.appendContent(a, i),
        (n.preloaded = !0),
        T(m, n),
        (r = n.type),
        t.container.prepend(t.contentContainer),
        T("AfterChange");
    },
    appendContent: function (e, n) {
      (t.content = e),
        e
          ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[n] === !0
            ? t.content.find(".mfp-close").length || t.content.append(E())
            : (t.content = e)
          : (t.content = ""),
        T(u),
        t.container.addClass("mfp-" + n + "-holder"),
        t.contentContainer.append(t.content);
    },
    parseEl: function (n) {
      var i,
        o = t.items[n];
      if (
        (o.tagName
          ? (o = { el: e(o) })
          : ((i = o.type), (o = { data: o, src: o.src })),
        o.el)
      ) {
        for (var r = t.types, a = 0; r.length > a; a++)
          if (o.el.hasClass("mfp-" + r[a])) {
            i = r[a];
            break;
          }
        (o.src = o.el.attr("data-mfp-src")),
          o.src || (o.src = o.el.attr("href"));
      }
      return (
        (o.type = i || t.st.type || "inline"),
        (o.index = n),
        (o.parsed = !0),
        (t.items[n] = o),
        T("ElementParse", o),
        t.items[n]
      );
    },
    addGroup: function (e, n) {
      var i = function (i) {
        (i.mfpEl = this), t._openClick(i, e, n);
      };
      n || (n = {});
      var o = "click.magnificPopup";
      (n.mainEl = e),
        n.items
          ? ((n.isObj = !0), e.off(o).on(o, i))
          : ((n.isObj = !1),
            n.delegate
              ? e.off(o).on(o, n.delegate, i)
              : ((n.items = e), e.off(o).on(o, i)));
    },
    _openClick: function (n, i, o) {
      var r =
        void 0 !== o.midClick ? o.midClick : e.magnificPopup.defaults.midClick;
      if (r || (2 !== n.which && !n.ctrlKey && !n.metaKey)) {
        var a =
          void 0 !== o.disableOn
            ? o.disableOn
            : e.magnificPopup.defaults.disableOn;
        if (a)
          if (e.isFunction(a)) {
            if (!a.call(t)) return !0;
          } else if (a > I.width()) return !0;
        n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()),
          (o.el = e(n.mfpEl)),
          o.delegate && (o.items = i.find(o.delegate)),
          t.open(o);
      }
    },
    updateStatus: function (e, i) {
      if (t.preloader) {
        n !== e && t.container.removeClass("mfp-s-" + n),
          i || "loading" !== e || (i = t.st.tLoading);
        var o = { status: e, text: i };
        T("UpdateStatus", o),
          (e = o.status),
          (i = o.text),
          t.preloader.html(i),
          t.preloader.find("a").on("click", function (e) {
            e.stopImmediatePropagation();
          }),
          t.container.addClass("mfp-s-" + e),
          (n = e);
      }
    },
    _checkIfClose: function (n) {
      if (!e(n).hasClass(y)) {
        var i = t.st.closeOnContentClick,
          o = t.st.closeOnBgClick;
        if (i && o) return !0;
        if (
          !t.content ||
          e(n).hasClass("mfp-close") ||
          (t.preloader && n === t.preloader[0])
        )
          return !0;
        if (n === t.content[0] || e.contains(t.content[0], n)) {
          if (i) return !0;
        } else if (o && e.contains(document, n)) return !0;
        return !1;
      }
    },
    _addClassToMFP: function (e) {
      t.bgOverlay.addClass(e), t.wrap.addClass(e);
    },
    _removeClassFromMFP: function (e) {
      this.bgOverlay.removeClass(e), t.wrap.removeClass(e);
    },
    _hasScrollBar: function (e) {
      return (
        (t.isIE7 ? o.height() : document.body.scrollHeight) > (e || I.height())
      );
    },
    _setFocus: function () {
      (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus();
    },
    _onFocusIn: function (n) {
      return n.target === t.wrap[0] || e.contains(t.wrap[0], n.target)
        ? void 0
        : (t._setFocus(), !1);
    },
    _parseMarkup: function (t, n, i) {
      var o;
      i.data && (n = e.extend(i.data, n)),
        T(p, [t, n, i]),
        e.each(n, function (e, n) {
          if (void 0 === n || n === !1) return !0;
          if (((o = e.split("_")), o.length > 1)) {
            var i = t.find(h + "-" + o[0]);
            if (i.length > 0) {
              var r = o[1];
              "replaceWith" === r
                ? i[0] !== n[0] && i.replaceWith(n)
                : "img" === r
                ? i.is("img")
                  ? i.attr("src", n)
                  : i.replaceWith(
                      '<img src="' + n + '" class="' + i.attr("class") + '" />'
                    )
                : i.attr(o[1], n);
            }
          } else t.find(h + "-" + e).html(n);
        });
    },
    _getScrollbarSize: function () {
      if (void 0 === t.scrollbarSize) {
        var e = document.createElement("div");
        (e.id = "mfp-sbm"),
          (e.style.cssText =
            "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
          document.body.appendChild(e),
          (t.scrollbarSize = e.offsetWidth - e.clientWidth),
          document.body.removeChild(e);
      }
      return t.scrollbarSize;
    },
  }),
    (e.magnificPopup = {
      instance: null,
      proto: w.prototype,
      modules: [],
      open: function (t, n) {
        return (
          _(),
          (t = t ? e.extend(!0, {}, t) : {}),
          (t.isObj = !0),
          (t.index = n || 0),
          this.instance.open(t)
        );
      },
      close: function () {
        return e.magnificPopup.instance && e.magnificPopup.instance.close();
      },
      registerModule: function (t, n) {
        n.options && (e.magnificPopup.defaults[t] = n.options),
          e.extend(this.proto, n.proto),
          this.modules.push(t);
      },
      defaults: {
        disableOn: 0,
        key: null,
        midClick: !1,
        mainClass: "",
        preloader: !0,
        focus: "",
        closeOnContentClick: !1,
        closeOnBgClick: !0,
        closeBtnInside: !0,
        showCloseBtn: !0,
        enableEscapeKey: !0,
        modal: !1,
        alignTop: !1,
        removalDelay: 0,
        prependTo: null,
        fixedContentPos: "auto",
        fixedBgPos: "auto",
        overflowY: "auto",
        closeMarkup:
          '<button title="%title%" type="button" class="mfp-close">&times;</button>',
        tClose: "Close (Esc)",
        tLoading: "Loading...",
      },
    }),
    (e.fn.magnificPopup = function (n) {
      _();
      var i = e(this);
      if ("string" == typeof n)
        if ("open" === n) {
          var o,
            r = b ? i.data("magnificPopup") : i[0].magnificPopup,
            a = parseInt(arguments[1], 10) || 0;
          r.items
            ? (o = r.items[a])
            : ((o = i), r.delegate && (o = o.find(r.delegate)), (o = o.eq(a))),
            t._openClick({ mfpEl: o }, i, r);
        } else
          t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1));
      else
        (n = e.extend(!0, {}, n)),
          b ? i.data("magnificPopup", n) : (i[0].magnificPopup = n),
          t.addGroup(i, n);
      return i;
    });
  var P,
    O,
    z,
    M = "inline",
    B = function () {
      z && (O.after(z.addClass(P)).detach(), (z = null));
    };
  e.magnificPopup.registerModule(M, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found",
    },
    proto: {
      initInline: function () {
        t.types.push(M),
          x(l + "." + M, function () {
            B();
          });
      },
      getInline: function (n, i) {
        if ((B(), n.src)) {
          var o = t.st.inline,
            r = e(n.src);
          if (r.length) {
            var a = r[0].parentNode;
            a &&
              a.tagName &&
              (O || ((P = o.hiddenClass), (O = k(P)), (P = "mfp-" + P)),
              (z = r.after(O).detach().removeClass(P))),
              t.updateStatus("ready");
          } else t.updateStatus("error", o.tNotFound), (r = e("<div>"));
          return (n.inlineElement = r), r;
        }
        return t.updateStatus("ready"), t._parseMarkup(i, {}, n), i;
      },
    },
  });
  var F,
    H = "ajax",
    L = function () {
      F && i.removeClass(F);
    },
    A = function () {
      L(), t.req && t.req.abort();
    };
  e.magnificPopup.registerModule(H, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.',
    },
    proto: {
      initAjax: function () {
        t.types.push(H),
          (F = t.st.ajax.cursor),
          x(l + "." + H, A),
          x("BeforeChange." + H, A);
      },
      getAjax: function (n) {
        F && i.addClass(F), t.updateStatus("loading");
        var o = e.extend(
          {
            url: n.src,
            success: function (i, o, r) {
              var a = { data: i, xhr: r };
              T("ParseAjax", a),
                t.appendContent(e(a.data), H),
                (n.finished = !0),
                L(),
                t._setFocus(),
                setTimeout(function () {
                  t.wrap.addClass(v);
                }, 16),
                t.updateStatus("ready"),
                T("AjaxContentAdded");
            },
            error: function () {
              L(),
                (n.finished = n.loadError = !0),
                t.updateStatus(
                  "error",
                  t.st.ajax.tError.replace("%url%", n.src)
                );
            },
          },
          t.st.ajax.settings
        );
        return (t.req = e.ajax(o)), "";
      },
    },
  });
  var j,
    N = function (n) {
      if (n.data && void 0 !== n.data.title) return n.data.title;
      var i = t.st.image.titleSrc;
      if (i) {
        if (e.isFunction(i)) return i.call(t, n);
        if (n.el) return n.el.attr(i) || "";
      }
      return "";
    };
  e.magnificPopup.registerModule("image", {
    options: {
      markup:
        '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.',
    },
    proto: {
      initImage: function () {
        var e = t.st.image,
          n = ".image";
        t.types.push("image"),
          x(f + n, function () {
            "image" === t.currItem.type && e.cursor && i.addClass(e.cursor);
          }),
          x(l + n, function () {
            e.cursor && i.removeClass(e.cursor), I.off("resize" + h);
          }),
          x("Resize" + n, t.resizeImage),
          t.isLowIE && x("AfterChange", t.resizeImage);
      },
      resizeImage: function () {
        var e = t.currItem;
        if (e && e.img && t.st.image.verticalFit) {
          var n = 0;
          t.isLowIE &&
            (n =
              parseInt(e.img.css("padding-top"), 10) +
              parseInt(e.img.css("padding-bottom"), 10)),
            e.img.css("max-height", t.wH - n);
        }
      },
      _onImageHasSize: function (e) {
        e.img &&
          ((e.hasSize = !0),
          j && clearInterval(j),
          (e.isCheckingImgSize = !1),
          T("ImageHasSize", e),
          e.imgHidden &&
            (t.content && t.content.removeClass("mfp-loading"),
            (e.imgHidden = !1)));
      },
      findImageSize: function (e) {
        var n = 0,
          i = e.img[0],
          o = function (r) {
            j && clearInterval(j),
              (j = setInterval(function () {
                return i.naturalWidth > 0
                  ? (t._onImageHasSize(e), void 0)
                  : (n > 200 && clearInterval(j),
                    n++,
                    3 === n ? o(10) : 40 === n ? o(50) : 100 === n && o(500),
                    void 0);
              }, r));
          };
        o(1);
      },
      getImage: function (n, i) {
        var o = 0,
          r = function () {
            n &&
              (n.img[0].complete
                ? (n.img.off(".mfploader"),
                  n === t.currItem &&
                    (t._onImageHasSize(n), t.updateStatus("ready")),
                  (n.hasSize = !0),
                  (n.loaded = !0),
                  T("ImageLoadComplete"))
                : (o++, 200 > o ? setTimeout(r, 100) : a()));
          },
          a = function () {
            n &&
              (n.img.off(".mfploader"),
              n === t.currItem &&
                (t._onImageHasSize(n),
                t.updateStatus("error", s.tError.replace("%url%", n.src))),
              (n.hasSize = !0),
              (n.loaded = !0),
              (n.loadError = !0));
          },
          s = t.st.image,
          l = i.find(".mfp-img");
        if (l.length) {
          var c = document.createElement("img");
          (c.className = "mfp-img"),
            (n.img = e(c).on("load.mfploader", r).on("error.mfploader", a)),
            (c.src = n.src),
            l.is("img") && (n.img = n.img.clone()),
            (c = n.img[0]),
            c.naturalWidth > 0 ? (n.hasSize = !0) : c.width || (n.hasSize = !1);
        }
        return (
          t._parseMarkup(i, { title: N(n), img_replaceWith: n.img }, n),
          t.resizeImage(),
          n.hasSize
            ? (j && clearInterval(j),
              n.loadError
                ? (i.addClass("mfp-loading"),
                  t.updateStatus("error", s.tError.replace("%url%", n.src)))
                : (i.removeClass("mfp-loading"), t.updateStatus("ready")),
              i)
            : (t.updateStatus("loading"),
              (n.loading = !0),
              n.hasSize ||
                ((n.imgHidden = !0),
                i.addClass("mfp-loading"),
                t.findImageSize(n)),
              i)
        );
      },
    },
  });
  var W,
    R = function () {
      return (
        void 0 === W &&
          (W = void 0 !== document.createElement("p").style.MozTransform),
        W
      );
    };
  e.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function (e) {
        return e.is("img") ? e : e.find("img");
      },
    },
    proto: {
      initZoom: function () {
        var e,
          n = t.st.zoom,
          i = ".zoom";
        if (n.enabled && t.supportsTransition) {
          var o,
            r,
            a = n.duration,
            s = function (e) {
              var t = e
                  .clone()
                  .removeAttr("style")
                  .removeAttr("class")
                  .addClass("mfp-animated-image"),
                i = "all " + n.duration / 1e3 + "s " + n.easing,
                o = {
                  position: "fixed",
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  "-webkit-backface-visibility": "hidden",
                },
                r = "transition";
              return (
                (o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = i),
                t.css(o),
                t
              );
            },
            d = function () {
              t.content.css("visibility", "visible");
            };
          x("BuildControls" + i, function () {
            if (t._allowZoom()) {
              if (
                (clearTimeout(o),
                t.content.css("visibility", "hidden"),
                (e = t._getItemToZoom()),
                !e)
              )
                return d(), void 0;
              (r = s(e)),
                r.css(t._getOffset()),
                t.wrap.append(r),
                (o = setTimeout(function () {
                  r.css(t._getOffset(!0)),
                    (o = setTimeout(function () {
                      d(),
                        setTimeout(function () {
                          r.remove(), (e = r = null), T("ZoomAnimationEnded");
                        }, 16);
                    }, a));
                }, 16));
            }
          }),
            x(c + i, function () {
              if (t._allowZoom()) {
                if ((clearTimeout(o), (t.st.removalDelay = a), !e)) {
                  if (((e = t._getItemToZoom()), !e)) return;
                  r = s(e);
                }
                r.css(t._getOffset(!0)),
                  t.wrap.append(r),
                  t.content.css("visibility", "hidden"),
                  setTimeout(function () {
                    r.css(t._getOffset());
                  }, 16);
              }
            }),
            x(l + i, function () {
              t._allowZoom() && (d(), r && r.remove(), (e = null));
            });
        }
      },
      _allowZoom: function () {
        return "image" === t.currItem.type;
      },
      _getItemToZoom: function () {
        return t.currItem.hasSize ? t.currItem.img : !1;
      },
      _getOffset: function (n) {
        var i;
        i = n ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
        var o = i.offset(),
          r = parseInt(i.css("padding-top"), 10),
          a = parseInt(i.css("padding-bottom"), 10);
        o.top -= e(window).scrollTop() - r;
        var s = {
          width: i.width(),
          height: (b ? i.innerHeight() : i[0].offsetHeight) - a - r,
        };
        return (
          R()
            ? (s["-moz-transform"] = s.transform =
                "translate(" + o.left + "px," + o.top + "px)")
            : ((s.left = o.left), (s.top = o.top)),
          s
        );
      },
    },
  });
  var Z = "iframe",
    q = "//about:blank",
    D = function (e) {
      if (t.currTemplate[Z]) {
        var n = t.currTemplate[Z].find("iframe");
        n.length &&
          (e || (n[0].src = q),
          t.isIE8 && n.css("display", e ? "block" : "none"));
      }
    };
  e.magnificPopup.registerModule(Z, {
    options: {
      markup:
        '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1",
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1",
        },
        gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
      },
    },
    proto: {
      initIframe: function () {
        t.types.push(Z),
          x("BeforeChange", function (e, t, n) {
            t !== n && (t === Z ? D() : n === Z && D(!0));
          }),
          x(l + "." + Z, function () {
            D();
          });
      },
      getIframe: function (n, i) {
        var o = n.src,
          r = t.st.iframe;
        e.each(r.patterns, function () {
          return o.indexOf(this.index) > -1
            ? (this.id &&
                (o =
                  "string" == typeof this.id
                    ? o.substr(
                        o.lastIndexOf(this.id) + this.id.length,
                        o.length
                      )
                    : this.id.call(this, o)),
              (o = this.src.replace("%id%", o)),
              !1)
            : void 0;
        });
        var a = {};
        return (
          r.srcAction && (a[r.srcAction] = o),
          t._parseMarkup(i, a, n),
          t.updateStatus("ready"),
          i
        );
      },
    },
  });
  var K = function (e) {
      var n = t.items.length;
      return e > n - 1 ? e - n : 0 > e ? n + e : e;
    },
    Y = function (e, t, n) {
      return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n);
    };
  e.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup:
        '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%",
    },
    proto: {
      initGallery: function () {
        var n = t.st.gallery,
          i = ".mfp-gallery",
          r = Boolean(e.fn.mfpFastClick);
        return (
          (t.direction = !0),
          n && n.enabled
            ? ((a += " mfp-gallery"),
              x(f + i, function () {
                n.navigateByImgClick &&
                  t.wrap.on("click" + i, ".mfp-img", function () {
                    return t.items.length > 1 ? (t.next(), !1) : void 0;
                  }),
                  o.on("keydown" + i, function (e) {
                    37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next();
                  });
              }),
              x("UpdateStatus" + i, function (e, n) {
                n.text &&
                  (n.text = Y(n.text, t.currItem.index, t.items.length));
              }),
              x(p + i, function (e, i, o, r) {
                var a = t.items.length;
                o.counter = a > 1 ? Y(n.tCounter, r.index, a) : "";
              }),
              x("BuildControls" + i, function () {
                if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
                  var i = n.arrowMarkup,
                    o = (t.arrowLeft = e(
                      i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")
                    ).addClass(y)),
                    a = (t.arrowRight = e(
                      i
                        .replace(/%title%/gi, n.tNext)
                        .replace(/%dir%/gi, "right")
                    ).addClass(y)),
                    s = r ? "mfpFastClick" : "click";
                  o[s](function () {
                    t.prev();
                  }),
                    a[s](function () {
                      t.next();
                    }),
                    t.isIE7 &&
                      (k("b", o[0], !1, !0),
                      k("a", o[0], !1, !0),
                      k("b", a[0], !1, !0),
                      k("a", a[0], !1, !0)),
                    t.container.append(o.add(a));
                }
              }),
              x(m + i, function () {
                t._preloadTimeout && clearTimeout(t._preloadTimeout),
                  (t._preloadTimeout = setTimeout(function () {
                    t.preloadNearbyImages(), (t._preloadTimeout = null);
                  }, 16));
              }),
              x(l + i, function () {
                o.off(i),
                  t.wrap.off("click" + i),
                  t.arrowLeft &&
                    r &&
                    t.arrowLeft.add(t.arrowRight).destroyMfpFastClick(),
                  (t.arrowRight = t.arrowLeft = null);
              }),
              void 0)
            : !1
        );
      },
      next: function () {
        (t.direction = !0), (t.index = K(t.index + 1)), t.updateItemHTML();
      },
      prev: function () {
        (t.direction = !1), (t.index = K(t.index - 1)), t.updateItemHTML();
      },
      goTo: function (e) {
        (t.direction = e >= t.index), (t.index = e), t.updateItemHTML();
      },
      preloadNearbyImages: function () {
        var e,
          n = t.st.gallery.preload,
          i = Math.min(n[0], t.items.length),
          o = Math.min(n[1], t.items.length);
        for (e = 1; (t.direction ? o : i) >= e; e++)
          t._preloadItem(t.index + e);
        for (e = 1; (t.direction ? i : o) >= e; e++)
          t._preloadItem(t.index - e);
      },
      _preloadItem: function (n) {
        if (((n = K(n)), !t.items[n].preloaded)) {
          var i = t.items[n];
          i.parsed || (i = t.parseEl(n)),
            T("LazyLoad", i),
            "image" === i.type &&
              (i.img = e('<img class="mfp-img" />')
                .on("load.mfploader", function () {
                  i.hasSize = !0;
                })
                .on("error.mfploader", function () {
                  (i.hasSize = !0), (i.loadError = !0), T("LazyLoadError", i);
                })
                .attr("src", i.src)),
            (i.preloaded = !0);
        }
      },
    },
  });
  var U = "retina";
  e.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function (e) {
        return e.src.replace(/\.\w+$/, function (e) {
          return "@2x" + e;
        });
      },
      ratio: 1,
    },
    proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var e = t.st.retina,
            n = e.ratio;
          (n = isNaN(n) ? n() : n),
            n > 1 &&
              (x("ImageHasSize." + U, function (e, t) {
                t.img.css({
                  "max-width": t.img[0].naturalWidth / n,
                  width: "100%",
                });
              }),
              x("ElementParse." + U, function (t, i) {
                i.src = e.replaceSrc(i, n);
              }));
        }
      },
    },
  }),
    (function () {
      var t = 1e3,
        n = "ontouchstart" in window,
        i = function () {
          I.off("touchmove" + r + " touchend" + r);
        },
        o = "mfpFastClick",
        r = "." + o;
      (e.fn.mfpFastClick = function (o) {
        return e(this).each(function () {
          var a,
            s = e(this);
          if (n) {
            var l, c, d, u, p, f;
            s.on("touchstart" + r, function (e) {
              (u = !1),
                (f = 1),
                (p = e.originalEvent
                  ? e.originalEvent.touches[0]
                  : e.touches[0]),
                (c = p.clientX),
                (d = p.clientY),
                I.on("touchmove" + r, function (e) {
                  (p = e.originalEvent ? e.originalEvent.touches : e.touches),
                    (f = p.length),
                    (p = p[0]),
                    (Math.abs(p.clientX - c) > 10 ||
                      Math.abs(p.clientY - d) > 10) &&
                      ((u = !0), i());
                }).on("touchend" + r, function (e) {
                  i(),
                    u ||
                      f > 1 ||
                      ((a = !0),
                      e.preventDefault(),
                      clearTimeout(l),
                      (l = setTimeout(function () {
                        a = !1;
                      }, t)),
                      o());
                });
            });
          }
          s.on("click" + r, function () {
            a || o();
          });
        });
      }),
        (e.fn.destroyMfpFastClick = function () {
          e(this).off("touchstart" + r + " click" + r),
            n && I.off("touchmove" + r + " touchend" + r);
        });
    })(),
    _();
})(window.jQuery || window.Zepto);

/*!
 * Masonry PACKAGED v3.2.2
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!(function (a) {
  function b() {}
  function c(a) {
    function c(b) {
      b.prototype.option ||
        (b.prototype.option = function (b) {
          a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b));
        });
    }
    function e(b, c) {
      a.fn[b] = function (e) {
        if ("string" == typeof e) {
          for (
            var g = d.call(arguments, 1), h = 0, i = this.length;
            i > h;
            h++
          ) {
            var j = this[h],
              k = a.data(j, b);
            if (k)
              if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
                var l = k[e].apply(k, g);
                if (void 0 !== l) return l;
              } else f("no such method '" + e + "' for " + b + " instance");
            else
              f(
                "cannot call methods on " +
                  b +
                  " prior to initialization; attempted to call '" +
                  e +
                  "'"
              );
          }
          return this;
        }
        return this.each(function () {
          var d = a.data(this, b);
          d
            ? (d.option(e), d._init())
            : ((d = new c(this, e)), a.data(this, b, d));
        });
      };
    }
    if (a) {
      var f =
        "undefined" == typeof console
          ? b
          : function (a) {
              console.error(a);
            };
      return (
        (a.bridget = function (a, b) {
          c(b), e(a, b);
        }),
        a.bridget
      );
    }
  }
  var d = Array.prototype.slice;
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery.bridget", ["jquery"], c)
    : c("object" == typeof exports ? require("jquery") : a.jQuery);
})(window),
  (function (a) {
    function b(b) {
      var c = a.event;
      return (c.target = c.target || c.srcElement || b), c;
    }
    var c = document.documentElement,
      d = function () {};
    c.addEventListener
      ? (d = function (a, b, c) {
          a.addEventListener(b, c, !1);
        })
      : c.attachEvent &&
        (d = function (a, c, d) {
          (a[c + d] = d.handleEvent
            ? function () {
                var c = b(a);
                d.handleEvent.call(d, c);
              }
            : function () {
                var c = b(a);
                d.call(a, c);
              }),
            a.attachEvent("on" + c, a[c + d]);
        });
    var e = function () {};
    c.removeEventListener
      ? (e = function (a, b, c) {
          a.removeEventListener(b, c, !1);
        })
      : c.detachEvent &&
        (e = function (a, b, c) {
          a.detachEvent("on" + b, a[b + c]);
          try {
            delete a[b + c];
          } catch (d) {
            a[b + c] = void 0;
          }
        });
    var f = { bind: d, unbind: e };
    "function" == typeof define && define.amd
      ? define("eventie/eventie", f)
      : "object" == typeof exports
      ? (module.exports = f)
      : (a.eventie = f);
  })(this),
  (function (a) {
    function b(a) {
      "function" == typeof a && (b.isReady ? a() : g.push(a));
    }
    function c(a) {
      var c = "readystatechange" === a.type && "complete" !== f.readyState;
      b.isReady || c || d();
    }
    function d() {
      b.isReady = !0;
      for (var a = 0, c = g.length; c > a; a++) {
        var d = g[a];
        d();
      }
    }
    function e(e) {
      return (
        "complete" === f.readyState
          ? d()
          : (e.bind(f, "DOMContentLoaded", c),
            e.bind(f, "readystatechange", c),
            e.bind(a, "load", c)),
        b
      );
    }
    var f = a.document,
      g = [];
    (b.isReady = !1),
      "function" == typeof define && define.amd
        ? define("doc-ready/doc-ready", ["eventie/eventie"], e)
        : "object" == typeof exports
        ? (module.exports = e(require("eventie")))
        : (a.docReady = e(a.eventie));
  })(window),
  function () {
    function a() {}
    function b(a, b) {
      for (var c = a.length; c--; ) if (a[c].listener === b) return c;
      return -1;
    }
    function c(a) {
      return function () {
        return this[a].apply(this, arguments);
      };
    }
    var d = a.prototype,
      e = this,
      f = e.EventEmitter;
    (d.getListeners = function (a) {
      var b,
        c,
        d = this._getEvents();
      if (a instanceof RegExp) {
        b = {};
        for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c]);
      } else b = d[a] || (d[a] = []);
      return b;
    }),
      (d.flattenListeners = function (a) {
        var b,
          c = [];
        for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
        return c;
      }),
      (d.getListenersAsObject = function (a) {
        var b,
          c = this.getListeners(a);
        return c instanceof Array && ((b = {}), (b[a] = c)), b || c;
      }),
      (d.addListener = function (a, c) {
        var d,
          e = this.getListenersAsObject(a),
          f = "object" == typeof c;
        for (d in e)
          e.hasOwnProperty(d) &&
            -1 === b(e[d], c) &&
            e[d].push(f ? c : { listener: c, once: !1 });
        return this;
      }),
      (d.on = c("addListener")),
      (d.addOnceListener = function (a, b) {
        return this.addListener(a, { listener: b, once: !0 });
      }),
      (d.once = c("addOnceListener")),
      (d.defineEvent = function (a) {
        return this.getListeners(a), this;
      }),
      (d.defineEvents = function (a) {
        for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
        return this;
      }),
      (d.removeListener = function (a, c) {
        var d,
          e,
          f = this.getListenersAsObject(a);
        for (e in f)
          f.hasOwnProperty(e) &&
            ((d = b(f[e], c)), -1 !== d && f[e].splice(d, 1));
        return this;
      }),
      (d.off = c("removeListener")),
      (d.addListeners = function (a, b) {
        return this.manipulateListeners(!1, a, b);
      }),
      (d.removeListeners = function (a, b) {
        return this.manipulateListeners(!0, a, b);
      }),
      (d.manipulateListeners = function (a, b, c) {
        var d,
          e,
          f = a ? this.removeListener : this.addListener,
          g = a ? this.removeListeners : this.addListeners;
        if ("object" != typeof b || b instanceof RegExp)
          for (d = c.length; d--; ) f.call(this, b, c[d]);
        else
          for (d in b)
            b.hasOwnProperty(d) &&
              (e = b[d]) &&
              ("function" == typeof e
                ? f.call(this, d, e)
                : g.call(this, d, e));
        return this;
      }),
      (d.removeEvent = function (a) {
        var b,
          c = typeof a,
          d = this._getEvents();
        if ("string" === c) delete d[a];
        else if (a instanceof RegExp)
          for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b];
        else delete this._events;
        return this;
      }),
      (d.removeAllListeners = c("removeEvent")),
      (d.emitEvent = function (a, b) {
        var c,
          d,
          e,
          f,
          g = this.getListenersAsObject(a);
        for (e in g)
          if (g.hasOwnProperty(e))
            for (d = g[e].length; d--; )
              (c = g[e][d]),
                c.once === !0 && this.removeListener(a, c.listener),
                (f = c.listener.apply(this, b || [])),
                f === this._getOnceReturnValue() &&
                  this.removeListener(a, c.listener);
        return this;
      }),
      (d.trigger = c("emitEvent")),
      (d.emit = function (a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(a, b);
      }),
      (d.setOnceReturnValue = function (a) {
        return (this._onceReturnValue = a), this;
      }),
      (d._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue")
          ? this._onceReturnValue
          : !0;
      }),
      (d._getEvents = function () {
        return this._events || (this._events = {});
      }),
      (a.noConflict = function () {
        return (e.EventEmitter = f), a;
      }),
      "function" == typeof define && define.amd
        ? define("eventEmitter/EventEmitter", [], function () {
            return a;
          })
        : "object" == typeof module && module.exports
        ? (module.exports = a)
        : (e.EventEmitter = a);
  }.call(this),
  (function (a) {
    function b(a) {
      if (a) {
        if ("string" == typeof d[a]) return a;
        a = a.charAt(0).toUpperCase() + a.slice(1);
        for (var b, e = 0, f = c.length; f > e; e++)
          if (((b = c[e] + a), "string" == typeof d[b])) return b;
      }
    }
    var c = "Webkit Moz ms Ms O".split(" "),
      d = document.documentElement.style;
    "function" == typeof define && define.amd
      ? define("get-style-property/get-style-property", [], function () {
          return b;
        })
      : "object" == typeof exports
      ? (module.exports = b)
      : (a.getStyleProperty = b);
  })(window),
  (function (a) {
    function b(a) {
      var b = parseFloat(a),
        c = -1 === a.indexOf("%") && !isNaN(b);
      return c && b;
    }
    function c() {}
    function d() {
      for (
        var a = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          b = 0,
          c = g.length;
        c > b;
        b++
      ) {
        var d = g[b];
        a[d] = 0;
      }
      return a;
    }
    function e(c) {
      function e() {
        if (!m) {
          m = !0;
          var d = a.getComputedStyle;
          if (
            ((j = (function () {
              var a = d
                ? function (a) {
                    return d(a, null);
                  }
                : function (a) {
                    return a.currentStyle;
                  };
              return function (b) {
                var c = a(b);
                return (
                  c ||
                    f(
                      "Style returned " +
                        c +
                        ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"
                    ),
                  c
                );
              };
            })()),
            (k = c("boxSizing")))
          ) {
            var e = document.createElement("div");
            (e.style.width = "200px"),
              (e.style.padding = "1px 2px 3px 4px"),
              (e.style.borderStyle = "solid"),
              (e.style.borderWidth = "1px 2px 3px 4px"),
              (e.style[k] = "border-box");
            var g = document.body || document.documentElement;
            g.appendChild(e);
            var h = j(e);
            (l = 200 === b(h.width)), g.removeChild(e);
          }
        }
      }
      function h(a) {
        if (
          (e(),
          "string" == typeof a && (a = document.querySelector(a)),
          a && "object" == typeof a && a.nodeType)
        ) {
          var c = j(a);
          if ("none" === c.display) return d();
          var f = {};
          (f.width = a.offsetWidth), (f.height = a.offsetHeight);
          for (
            var h = (f.isBorderBox = !(!k || !c[k] || "border-box" !== c[k])),
              m = 0,
              n = g.length;
            n > m;
            m++
          ) {
            var o = g[m],
              p = c[o];
            p = i(a, p);
            var q = parseFloat(p);
            f[o] = isNaN(q) ? 0 : q;
          }
          var r = f.paddingLeft + f.paddingRight,
            s = f.paddingTop + f.paddingBottom,
            t = f.marginLeft + f.marginRight,
            u = f.marginTop + f.marginBottom,
            v = f.borderLeftWidth + f.borderRightWidth,
            w = f.borderTopWidth + f.borderBottomWidth,
            x = h && l,
            y = b(c.width);
          y !== !1 && (f.width = y + (x ? 0 : r + v));
          var z = b(c.height);
          return (
            z !== !1 && (f.height = z + (x ? 0 : s + w)),
            (f.innerWidth = f.width - (r + v)),
            (f.innerHeight = f.height - (s + w)),
            (f.outerWidth = f.width + t),
            (f.outerHeight = f.height + u),
            f
          );
        }
      }
      function i(b, c) {
        if (a.getComputedStyle || -1 === c.indexOf("%")) return c;
        var d = b.style,
          e = d.left,
          f = b.runtimeStyle,
          g = f && f.left;
        return (
          g && (f.left = b.currentStyle.left),
          (d.left = c),
          (c = d.pixelLeft),
          (d.left = e),
          g && (f.left = g),
          c
        );
      }
      var j,
        k,
        l,
        m = !1;
      return h;
    }
    var f =
        "undefined" == typeof console
          ? c
          : function (a) {
              console.error(a);
            },
      g = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ];
    "function" == typeof define && define.amd
      ? define(
          "get-size/get-size",
          ["get-style-property/get-style-property"],
          e
        )
      : "object" == typeof exports
      ? (module.exports = e(require("desandro-get-style-property")))
      : (a.getSize = e(a.getStyleProperty));
  })(window),
  (function (a) {
    function b(a, b) {
      return a[g](b);
    }
    function c(a) {
      if (!a.parentNode) {
        var b = document.createDocumentFragment();
        b.appendChild(a);
      }
    }
    function d(a, b) {
      c(a);
      for (
        var d = a.parentNode.querySelectorAll(b), e = 0, f = d.length;
        f > e;
        e++
      )
        if (d[e] === a) return !0;
      return !1;
    }
    function e(a, d) {
      return c(a), b(a, d);
    }
    var f,
      g = (function () {
        if (a.matchesSelector) return "matchesSelector";
        for (
          var b = ["webkit", "moz", "ms", "o"], c = 0, d = b.length;
          d > c;
          c++
        ) {
          var e = b[c],
            f = e + "MatchesSelector";
          if (a[f]) return f;
        }
      })();
    if (g) {
      var h = document.createElement("div"),
        i = b(h, "div");
      f = i ? b : e;
    } else f = d;
    "function" == typeof define && define.amd
      ? define("matches-selector/matches-selector", [], function () {
          return f;
        })
      : "object" == typeof exports
      ? (module.exports = f)
      : (window.matchesSelector = f);
  })(Element.prototype),
  (function (a) {
    function b(a, b) {
      for (var c in b) a[c] = b[c];
      return a;
    }
    function c(a) {
      for (var b in a) return !1;
      return (b = null), !0;
    }
    function d(a) {
      return a.replace(/([A-Z])/g, function (a) {
        return "-" + a.toLowerCase();
      });
    }
    function e(a, e, f) {
      function h(a, b) {
        a &&
          ((this.element = a),
          (this.layout = b),
          (this.position = { x: 0, y: 0 }),
          this._create());
      }
      var i = f("transition"),
        j = f("transform"),
        k = i && j,
        l = !!f("perspective"),
        m = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "otransitionend",
          transition: "transitionend",
        }[i],
        n = [
          "transform",
          "transition",
          "transitionDuration",
          "transitionProperty",
        ],
        o = (function () {
          for (var a = {}, b = 0, c = n.length; c > b; b++) {
            var d = n[b],
              e = f(d);
            e && e !== d && (a[d] = e);
          }
          return a;
        })();
      b(h.prototype, a.prototype),
        (h.prototype._create = function () {
          (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
            this.css({ position: "absolute" });
        }),
        (h.prototype.handleEvent = function (a) {
          var b = "on" + a.type;
          this[b] && this[b](a);
        }),
        (h.prototype.getSize = function () {
          this.size = e(this.element);
        }),
        (h.prototype.css = function (a) {
          var b = this.element.style;
          for (var c in a) {
            var d = o[c] || c;
            b[d] = a[c];
          }
        }),
        (h.prototype.getPosition = function () {
          var a = g(this.element),
            b = this.layout.options,
            c = b.isOriginLeft,
            d = b.isOriginTop,
            e = parseInt(a[c ? "left" : "right"], 10),
            f = parseInt(a[d ? "top" : "bottom"], 10);
          (e = isNaN(e) ? 0 : e), (f = isNaN(f) ? 0 : f);
          var h = this.layout.size;
          (e -= c ? h.paddingLeft : h.paddingRight),
            (f -= d ? h.paddingTop : h.paddingBottom),
            (this.position.x = e),
            (this.position.y = f);
        }),
        (h.prototype.layoutPosition = function () {
          var a = this.layout.size,
            b = this.layout.options,
            c = {};
          b.isOriginLeft
            ? ((c.left = this.position.x + a.paddingLeft + "px"),
              (c.right = ""))
            : ((c.right = this.position.x + a.paddingRight + "px"),
              (c.left = "")),
            b.isOriginTop
              ? ((c.top = this.position.y + a.paddingTop + "px"),
                (c.bottom = ""))
              : ((c.bottom = this.position.y + a.paddingBottom + "px"),
                (c.top = "")),
            this.css(c),
            this.emitEvent("layout", [this]);
        });
      var p = l
        ? function (a, b) {
            return "translate3d(" + a + "px, " + b + "px, 0)";
          }
        : function (a, b) {
            return "translate(" + a + "px, " + b + "px)";
          };
      (h.prototype._transitionTo = function (a, b) {
        this.getPosition();
        var c = this.position.x,
          d = this.position.y,
          e = parseInt(a, 10),
          f = parseInt(b, 10),
          g = e === this.position.x && f === this.position.y;
        if ((this.setPosition(a, b), g && !this.isTransitioning))
          return void this.layoutPosition();
        var h = a - c,
          i = b - d,
          j = {},
          k = this.layout.options;
        (h = k.isOriginLeft ? h : -h),
          (i = k.isOriginTop ? i : -i),
          (j.transform = p(h, i)),
          this.transition({
            to: j,
            onTransitionEnd: { transform: this.layoutPosition },
            isCleaning: !0,
          });
      }),
        (h.prototype.goTo = function (a, b) {
          this.setPosition(a, b), this.layoutPosition();
        }),
        (h.prototype.moveTo = k ? h.prototype._transitionTo : h.prototype.goTo),
        (h.prototype.setPosition = function (a, b) {
          (this.position.x = parseInt(a, 10)),
            (this.position.y = parseInt(b, 10));
        }),
        (h.prototype._nonTransition = function (a) {
          this.css(a.to), a.isCleaning && this._removeStyles(a.to);
          for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this);
        }),
        (h.prototype._transition = function (a) {
          if (!parseFloat(this.layout.options.transitionDuration))
            return void this._nonTransition(a);
          var b = this._transn;
          for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c];
          for (c in a.to)
            (b.ingProperties[c] = !0), a.isCleaning && (b.clean[c] = !0);
          if (a.from) {
            this.css(a.from);
            var d = this.element.offsetHeight;
            d = null;
          }
          this.enableTransition(a.to),
            this.css(a.to),
            (this.isTransitioning = !0);
        });
      var q = j && d(j) + ",opacity";
      (h.prototype.enableTransition = function () {
        this.isTransitioning ||
          (this.css({
            transitionProperty: q,
            transitionDuration: this.layout.options.transitionDuration,
          }),
          this.element.addEventListener(m, this, !1));
      }),
        (h.prototype.transition =
          h.prototype[i ? "_transition" : "_nonTransition"]),
        (h.prototype.onwebkitTransitionEnd = function (a) {
          this.ontransitionend(a);
        }),
        (h.prototype.onotransitionend = function (a) {
          this.ontransitionend(a);
        });
      var r = {
        "-webkit-transform": "transform",
        "-moz-transform": "transform",
        "-o-transform": "transform",
      };
      (h.prototype.ontransitionend = function (a) {
        if (a.target === this.element) {
          var b = this._transn,
            d = r[a.propertyName] || a.propertyName;
          if (
            (delete b.ingProperties[d],
            c(b.ingProperties) && this.disableTransition(),
            d in b.clean &&
              ((this.element.style[a.propertyName] = ""), delete b.clean[d]),
            d in b.onEnd)
          ) {
            var e = b.onEnd[d];
            e.call(this), delete b.onEnd[d];
          }
          this.emitEvent("transitionEnd", [this]);
        }
      }),
        (h.prototype.disableTransition = function () {
          this.removeTransitionStyles(),
            this.element.removeEventListener(m, this, !1),
            (this.isTransitioning = !1);
        }),
        (h.prototype._removeStyles = function (a) {
          var b = {};
          for (var c in a) b[c] = "";
          this.css(b);
        });
      var s = { transitionProperty: "", transitionDuration: "" };
      return (
        (h.prototype.removeTransitionStyles = function () {
          this.css(s);
        }),
        (h.prototype.removeElem = function () {
          this.element.parentNode.removeChild(this.element),
            this.emitEvent("remove", [this]);
        }),
        (h.prototype.remove = function () {
          if (!i || !parseFloat(this.layout.options.transitionDuration))
            return void this.removeElem();
          var a = this;
          this.on("transitionEnd", function () {
            return a.removeElem(), !0;
          }),
            this.hide();
        }),
        (h.prototype.reveal = function () {
          delete this.isHidden, this.css({ display: "" });
          var a = this.layout.options;
          this.transition({
            from: a.hiddenStyle,
            to: a.visibleStyle,
            isCleaning: !0,
          });
        }),
        (h.prototype.hide = function () {
          (this.isHidden = !0), this.css({ display: "" });
          var a = this.layout.options;
          this.transition({
            from: a.visibleStyle,
            to: a.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: {
              opacity: function () {
                this.isHidden && this.css({ display: "none" });
              },
            },
          });
        }),
        (h.prototype.destroy = function () {
          this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: "",
          });
        }),
        h
      );
    }
    var f = a.getComputedStyle,
      g = f
        ? function (a) {
            return f(a, null);
          }
        : function (a) {
            return a.currentStyle;
          };
    "function" == typeof define && define.amd
      ? define(
          "outlayer/item",
          [
            "eventEmitter/EventEmitter",
            "get-size/get-size",
            "get-style-property/get-style-property",
          ],
          e
        )
      : "object" == typeof exports
      ? (module.exports = e(
          require("wolfy87-eventemitter"),
          require("get-size"),
          require("desandro-get-style-property")
        ))
      : ((a.Outlayer = {}),
        (a.Outlayer.Item = e(a.EventEmitter, a.getSize, a.getStyleProperty)));
  })(window),
  (function (a) {
    function b(a, b) {
      for (var c in b) a[c] = b[c];
      return a;
    }
    function c(a) {
      return "[object Array]" === l.call(a);
    }
    function d(a) {
      var b = [];
      if (c(a)) b = a;
      else if (a && "number" == typeof a.length)
        for (var d = 0, e = a.length; e > d; d++) b.push(a[d]);
      else b.push(a);
      return b;
    }
    function e(a, b) {
      var c = n(b, a);
      -1 !== c && b.splice(c, 1);
    }
    function f(a) {
      return a
        .replace(/(.)([A-Z])/g, function (a, b, c) {
          return b + "-" + c;
        })
        .toLowerCase();
    }
    function g(c, g, l, n, o, p) {
      function q(a, c) {
        if (("string" == typeof a && (a = h.querySelector(a)), !a || !m(a)))
          return void (
            i && i.error("Bad " + this.constructor.namespace + " element: " + a)
          );
        (this.element = a),
          (this.options = b({}, this.constructor.defaults)),
          this.option(c);
        var d = ++r;
        (this.element.outlayerGUID = d),
          (s[d] = this),
          this._create(),
          this.options.isInitLayout && this.layout();
      }
      var r = 0,
        s = {};
      return (
        (q.namespace = "outlayer"),
        (q.Item = p),
        (q.defaults = {
          containerStyle: { position: "relative" },
          isInitLayout: !0,
          isOriginLeft: !0,
          isOriginTop: !0,
          isResizeBound: !0,
          isResizingContainer: !0,
          transitionDuration: "0.4s",
          hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
          visibleStyle: { opacity: 1, transform: "scale(1)" },
        }),
        b(q.prototype, l.prototype),
        (q.prototype.option = function (a) {
          b(this.options, a);
        }),
        (q.prototype._create = function () {
          this.reloadItems(),
            (this.stamps = []),
            this.stamp(this.options.stamp),
            b(this.element.style, this.options.containerStyle),
            this.options.isResizeBound && this.bindResize();
        }),
        (q.prototype.reloadItems = function () {
          this.items = this._itemize(this.element.children);
        }),
        (q.prototype._itemize = function (a) {
          for (
            var b = this._filterFindItemElements(a),
              c = this.constructor.Item,
              d = [],
              e = 0,
              f = b.length;
            f > e;
            e++
          ) {
            var g = b[e],
              h = new c(g, this);
            d.push(h);
          }
          return d;
        }),
        (q.prototype._filterFindItemElements = function (a) {
          a = d(a);
          for (
            var b = this.options.itemSelector, c = [], e = 0, f = a.length;
            f > e;
            e++
          ) {
            var g = a[e];
            if (m(g))
              if (b) {
                o(g, b) && c.push(g);
                for (
                  var h = g.querySelectorAll(b), i = 0, j = h.length;
                  j > i;
                  i++
                )
                  c.push(h[i]);
              } else c.push(g);
          }
          return c;
        }),
        (q.prototype.getItemElements = function () {
          for (var a = [], b = 0, c = this.items.length; c > b; b++)
            a.push(this.items[b].element);
          return a;
        }),
        (q.prototype.layout = function () {
          this._resetLayout(), this._manageStamps();
          var a =
            void 0 !== this.options.isLayoutInstant
              ? this.options.isLayoutInstant
              : !this._isLayoutInited;
          this.layoutItems(this.items, a), (this._isLayoutInited = !0);
        }),
        (q.prototype._init = q.prototype.layout),
        (q.prototype._resetLayout = function () {
          this.getSize();
        }),
        (q.prototype.getSize = function () {
          this.size = n(this.element);
        }),
        (q.prototype._getMeasurement = function (a, b) {
          var c,
            d = this.options[a];
          d
            ? ("string" == typeof d
                ? (c = this.element.querySelector(d))
                : m(d) && (c = d),
              (this[a] = c ? n(c)[b] : d))
            : (this[a] = 0);
        }),
        (q.prototype.layoutItems = function (a, b) {
          (a = this._getItemsForLayout(a)),
            this._layoutItems(a, b),
            this._postLayout();
        }),
        (q.prototype._getItemsForLayout = function (a) {
          for (var b = [], c = 0, d = a.length; d > c; c++) {
            var e = a[c];
            e.isIgnored || b.push(e);
          }
          return b;
        }),
        (q.prototype._layoutItems = function (a, b) {
          function c() {
            d.emitEvent("layoutComplete", [d, a]);
          }
          var d = this;
          if (!a || !a.length) return void c();
          this._itemsOn(a, "layout", c);
          for (var e = [], f = 0, g = a.length; g > f; f++) {
            var h = a[f],
              i = this._getItemLayoutPosition(h);
            (i.item = h), (i.isInstant = b || h.isLayoutInstant), e.push(i);
          }
          this._processLayoutQueue(e);
        }),
        (q.prototype._getItemLayoutPosition = function () {
          return { x: 0, y: 0 };
        }),
        (q.prototype._processLayoutQueue = function (a) {
          for (var b = 0, c = a.length; c > b; b++) {
            var d = a[b];
            this._positionItem(d.item, d.x, d.y, d.isInstant);
          }
        }),
        (q.prototype._positionItem = function (a, b, c, d) {
          d ? a.goTo(b, c) : a.moveTo(b, c);
        }),
        (q.prototype._postLayout = function () {
          this.resizeContainer();
        }),
        (q.prototype.resizeContainer = function () {
          if (this.options.isResizingContainer) {
            var a = this._getContainerSize();
            a &&
              (this._setContainerMeasure(a.width, !0),
              this._setContainerMeasure(a.height, !1));
          }
        }),
        (q.prototype._getContainerSize = k),
        (q.prototype._setContainerMeasure = function (a, b) {
          if (void 0 !== a) {
            var c = this.size;
            c.isBorderBox &&
              (a += b
                ? c.paddingLeft +
                  c.paddingRight +
                  c.borderLeftWidth +
                  c.borderRightWidth
                : c.paddingBottom +
                  c.paddingTop +
                  c.borderTopWidth +
                  c.borderBottomWidth),
              (a = Math.max(a, 0)),
              (this.element.style[b ? "width" : "height"] = a + "px");
          }
        }),
        (q.prototype._itemsOn = function (a, b, c) {
          function d() {
            return e++, e === f && c.call(g), !0;
          }
          for (
            var e = 0, f = a.length, g = this, h = 0, i = a.length;
            i > h;
            h++
          ) {
            var j = a[h];
            j.on(b, d);
          }
        }),
        (q.prototype.ignore = function (a) {
          var b = this.getItem(a);
          b && (b.isIgnored = !0);
        }),
        (q.prototype.unignore = function (a) {
          var b = this.getItem(a);
          b && delete b.isIgnored;
        }),
        (q.prototype.stamp = function (a) {
          if ((a = this._find(a))) {
            this.stamps = this.stamps.concat(a);
            for (var b = 0, c = a.length; c > b; b++) {
              var d = a[b];
              this.ignore(d);
            }
          }
        }),
        (q.prototype.unstamp = function (a) {
          if ((a = this._find(a)))
            for (var b = 0, c = a.length; c > b; b++) {
              var d = a[b];
              e(d, this.stamps), this.unignore(d);
            }
        }),
        (q.prototype._find = function (a) {
          return a
            ? ("string" == typeof a && (a = this.element.querySelectorAll(a)),
              (a = d(a)))
            : void 0;
        }),
        (q.prototype._manageStamps = function () {
          if (this.stamps && this.stamps.length) {
            this._getBoundingRect();
            for (var a = 0, b = this.stamps.length; b > a; a++) {
              var c = this.stamps[a];
              this._manageStamp(c);
            }
          }
        }),
        (q.prototype._getBoundingRect = function () {
          var a = this.element.getBoundingClientRect(),
            b = this.size;
          this._boundingRect = {
            left: a.left + b.paddingLeft + b.borderLeftWidth,
            top: a.top + b.paddingTop + b.borderTopWidth,
            right: a.right - (b.paddingRight + b.borderRightWidth),
            bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth),
          };
        }),
        (q.prototype._manageStamp = k),
        (q.prototype._getElementOffset = function (a) {
          var b = a.getBoundingClientRect(),
            c = this._boundingRect,
            d = n(a),
            e = {
              left: b.left - c.left - d.marginLeft,
              top: b.top - c.top - d.marginTop,
              right: c.right - b.right - d.marginRight,
              bottom: c.bottom - b.bottom - d.marginBottom,
            };
          return e;
        }),
        (q.prototype.handleEvent = function (a) {
          var b = "on" + a.type;
          this[b] && this[b](a);
        }),
        (q.prototype.bindResize = function () {
          this.isResizeBound ||
            (c.bind(a, "resize", this), (this.isResizeBound = !0));
        }),
        (q.prototype.unbindResize = function () {
          this.isResizeBound && c.unbind(a, "resize", this),
            (this.isResizeBound = !1);
        }),
        (q.prototype.onresize = function () {
          function a() {
            b.resize(), delete b.resizeTimeout;
          }
          this.resizeTimeout && clearTimeout(this.resizeTimeout);
          var b = this;
          this.resizeTimeout = setTimeout(a, 100);
        }),
        (q.prototype.resize = function () {
          this.isResizeBound && this.needsResizeLayout() && this.layout();
        }),
        (q.prototype.needsResizeLayout = function () {
          var a = n(this.element),
            b = this.size && a;
          return b && a.innerWidth !== this.size.innerWidth;
        }),
        (q.prototype.addItems = function (a) {
          var b = this._itemize(a);
          return b.length && (this.items = this.items.concat(b)), b;
        }),
        (q.prototype.appended = function (a) {
          var b = this.addItems(a);
          b.length && (this.layoutItems(b, !0), this.reveal(b));
        }),
        (q.prototype.prepended = function (a) {
          var b = this._itemize(a);
          if (b.length) {
            var c = this.items.slice(0);
            (this.items = b.concat(c)),
              this._resetLayout(),
              this._manageStamps(),
              this.layoutItems(b, !0),
              this.reveal(b),
              this.layoutItems(c);
          }
        }),
        (q.prototype.reveal = function (a) {
          var b = a && a.length;
          if (b)
            for (var c = 0; b > c; c++) {
              var d = a[c];
              d.reveal();
            }
        }),
        (q.prototype.hide = function (a) {
          var b = a && a.length;
          if (b)
            for (var c = 0; b > c; c++) {
              var d = a[c];
              d.hide();
            }
        }),
        (q.prototype.getItem = function (a) {
          for (var b = 0, c = this.items.length; c > b; b++) {
            var d = this.items[b];
            if (d.element === a) return d;
          }
        }),
        (q.prototype.getItems = function (a) {
          if (a && a.length) {
            for (var b = [], c = 0, d = a.length; d > c; c++) {
              var e = a[c],
                f = this.getItem(e);
              f && b.push(f);
            }
            return b;
          }
        }),
        (q.prototype.remove = function (a) {
          a = d(a);
          var b = this.getItems(a);
          if (b && b.length) {
            this._itemsOn(b, "remove", function () {
              this.emitEvent("removeComplete", [this, b]);
            });
            for (var c = 0, f = b.length; f > c; c++) {
              var g = b[c];
              g.remove(), e(g, this.items);
            }
          }
        }),
        (q.prototype.destroy = function () {
          var a = this.element.style;
          (a.height = ""), (a.position = ""), (a.width = "");
          for (var b = 0, c = this.items.length; c > b; b++) {
            var d = this.items[b];
            d.destroy();
          }
          this.unbindResize();
          var e = this.element.outlayerGUID;
          delete s[e],
            delete this.element.outlayerGUID,
            j && j.removeData(this.element, this.constructor.namespace);
        }),
        (q.data = function (a) {
          var b = a && a.outlayerGUID;
          return b && s[b];
        }),
        (q.create = function (a, c) {
          function d() {
            q.apply(this, arguments);
          }
          return (
            Object.create
              ? (d.prototype = Object.create(q.prototype))
              : b(d.prototype, q.prototype),
            (d.prototype.constructor = d),
            (d.defaults = b({}, q.defaults)),
            b(d.defaults, c),
            (d.prototype.settings = {}),
            (d.namespace = a),
            (d.data = q.data),
            (d.Item = function () {
              p.apply(this, arguments);
            }),
            (d.Item.prototype = new p()),
            g(function () {
              for (
                var b = f(a),
                  c = h.querySelectorAll(".js-" + b),
                  e = "data-" + b + "-options",
                  g = 0,
                  k = c.length;
                k > g;
                g++
              ) {
                var l,
                  m = c[g],
                  n = m.getAttribute(e);
                try {
                  l = n && JSON.parse(n);
                } catch (o) {
                  i &&
                    i.error(
                      "Error parsing " +
                        e +
                        " on " +
                        m.nodeName.toLowerCase() +
                        (m.id ? "#" + m.id : "") +
                        ": " +
                        o
                    );
                  continue;
                }
                var p = new d(m, l);
                j && j.data(m, a, p);
              }
            }),
            j && j.bridget && j.bridget(a, d),
            d
          );
        }),
        (q.Item = p),
        q
      );
    }
    var h = a.document,
      i = a.console,
      j = a.jQuery,
      k = function () {},
      l = Object.prototype.toString,
      m =
        "function" == typeof HTMLElement || "object" == typeof HTMLElement
          ? function (a) {
              return a instanceof HTMLElement;
            }
          : function (a) {
              return (
                a &&
                "object" == typeof a &&
                1 === a.nodeType &&
                "string" == typeof a.nodeName
              );
            },
      n = Array.prototype.indexOf
        ? function (a, b) {
            return a.indexOf(b);
          }
        : function (a, b) {
            for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
            return -1;
          };
    "function" == typeof define && define.amd
      ? define(
          "outlayer/outlayer",
          [
            "eventie/eventie",
            "doc-ready/doc-ready",
            "eventEmitter/EventEmitter",
            "get-size/get-size",
            "matches-selector/matches-selector",
            "./item",
          ],
          g
        )
      : "object" == typeof exports
      ? (module.exports = g(
          require("eventie"),
          require("doc-ready"),
          require("wolfy87-eventemitter"),
          require("get-size"),
          require("desandro-matches-selector"),
          require("./item")
        ))
      : (a.Outlayer = g(
          a.eventie,
          a.docReady,
          a.EventEmitter,
          a.getSize,
          a.matchesSelector,
          a.Outlayer.Item
        ));
  })(window),
  (function (a) {
    function b(a, b) {
      var d = a.create("masonry");
      return (
        (d.prototype._resetLayout = function () {
          this.getSize(),
            this._getMeasurement("columnWidth", "outerWidth"),
            this._getMeasurement("gutter", "outerWidth"),
            this.measureColumns();
          var a = this.cols;
          for (this.colYs = []; a--; ) this.colYs.push(0);
          this.maxY = 0;
        }),
        (d.prototype.measureColumns = function () {
          if ((this.getContainerWidth(), !this.columnWidth)) {
            var a = this.items[0],
              c = a && a.element;
            this.columnWidth = (c && b(c).outerWidth) || this.containerWidth;
          }
          (this.columnWidth += this.gutter),
            (this.cols = Math.floor(
              (this.containerWidth + this.gutter) / this.columnWidth
            )),
            (this.cols = Math.max(this.cols, 1));
        }),
        (d.prototype.getContainerWidth = function () {
          var a = this.options.isFitWidth
              ? this.element.parentNode
              : this.element,
            c = b(a);
          this.containerWidth = c && c.innerWidth;
        }),
        (d.prototype._getItemLayoutPosition = function (a) {
          a.getSize();
          var b = a.size.outerWidth % this.columnWidth,
            d = b && 1 > b ? "round" : "ceil",
            e = Math[d](a.size.outerWidth / this.columnWidth);
          e = Math.min(e, this.cols);
          for (
            var f = this._getColGroup(e),
              g = Math.min.apply(Math, f),
              h = c(f, g),
              i = { x: this.columnWidth * h, y: g },
              j = g + a.size.outerHeight,
              k = this.cols + 1 - f.length,
              l = 0;
            k > l;
            l++
          )
            this.colYs[h + l] = j;
          return i;
        }),
        (d.prototype._getColGroup = function (a) {
          if (2 > a) return this.colYs;
          for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) {
            var e = this.colYs.slice(d, d + a);
            b[d] = Math.max.apply(Math, e);
          }
          return b;
        }),
        (d.prototype._manageStamp = function (a) {
          var c = b(a),
            d = this._getElementOffset(a),
            e = this.options.isOriginLeft ? d.left : d.right,
            f = e + c.outerWidth,
            g = Math.floor(e / this.columnWidth);
          g = Math.max(0, g);
          var h = Math.floor(f / this.columnWidth);
          (h -= f % this.columnWidth ? 0 : 1), (h = Math.min(this.cols - 1, h));
          for (
            var i =
                (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight,
              j = g;
            h >= j;
            j++
          )
            this.colYs[j] = Math.max(i, this.colYs[j]);
        }),
        (d.prototype._getContainerSize = function () {
          this.maxY = Math.max.apply(Math, this.colYs);
          var a = { height: this.maxY };
          return (
            this.options.isFitWidth && (a.width = this._getContainerFitWidth()),
            a
          );
        }),
        (d.prototype._getContainerFitWidth = function () {
          for (var a = 0, b = this.cols; --b && 0 === this.colYs[b]; ) a++;
          return (this.cols - a) * this.columnWidth - this.gutter;
        }),
        (d.prototype.needsResizeLayout = function () {
          var a = this.containerWidth;
          return this.getContainerWidth(), a !== this.containerWidth;
        }),
        d
      );
    }
    var c = Array.prototype.indexOf
      ? function (a, b) {
          return a.indexOf(b);
        }
      : function (a, b) {
          for (var c = 0, d = a.length; d > c; c++) {
            var e = a[c];
            if (e === b) return c;
          }
          return -1;
        };
    "function" == typeof define && define.amd
      ? define(["outlayer/outlayer", "get-size/get-size"], b)
      : "object" == typeof exports
      ? (module.exports = b(require("outlayer"), require("get-size")))
      : (a.Masonry = b(a.Outlayer, a.getSize));
  })(window);

/*global jQuery */
/*jshint browser:true */
/*!
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */
!(function (t) {
  "use strict";
  t.fn.fitVids = function (e) {
    var i = { customSelector: null, ignore: null };
    if (!document.getElementById("fit-vids-style")) {
      var r = document.head || document.getElementsByTagName("head")[0],
        a =
          ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
        d = document.createElement("div");
      (d.innerHTML = '<p>x</p><style id="fit-vids-style">' + a + "</style>"),
        r.appendChild(d.childNodes[1]);
    }
    return (
      e && t.extend(i, e),
      this.each(function () {
        var e = [
          'iframe[src*="player.vimeo.com"]',
          'iframe[src*="youtube.com"]',
          'iframe[src*="youtube-nocookie.com"]',
          'iframe[src*="kickstarter.com"][src*="video.html"]',
          "object",
          "embed",
        ];
        i.customSelector && e.push(i.customSelector);
        var r = ".fitvidsignore";
        i.ignore && (r = r + ", " + i.ignore);
        var a = t(this).find(e.join(","));
        (a = a.not("object object")),
          (a = a.not(r)),
          a.each(function () {
            var e = t(this);
            if (
              !(
                e.parents(r).length > 0 ||
                ("embed" === this.tagName.toLowerCase() &&
                  e.parent("object").length) ||
                e.parent(".fluid-width-video-wrapper").length
              )
            ) {
              e.css("height") ||
                e.css("width") ||
                (!isNaN(e.attr("height")) && !isNaN(e.attr("width"))) ||
                (e.attr("height", 9), e.attr("width", 16));
              var i =
                  "object" === this.tagName.toLowerCase() ||
                  (e.attr("height") && !isNaN(parseInt(e.attr("height"), 10)))
                    ? parseInt(e.attr("height"), 10)
                    : e.height(),
                a = isNaN(parseInt(e.attr("width"), 10))
                  ? e.width()
                  : parseInt(e.attr("width"), 10),
                d = i / a;
              if (!e.attr("id")) {
                var o = "fitvid" + Math.floor(999999 * Math.random());
                e.attr("id", o);
              }
              e
                .wrap('<div class="fluid-width-video-wrapper"></div>')
                .parent(".fluid-width-video-wrapper")
                .css("padding-top", 100 * d + "%"),
                e.removeAttr("height").removeAttr("width");
            }
          });
      })
    );
  };
})(window.jQuery || window.Zepto);

/*** Tipper ***/
!(function (t) {
  "use strict";
  function e(e) {
    return (
      (c.formatter = r),
      (a = t("body")),
      t(this)
        .not(".tipper-attached")
        .addClass("tipper-attached")
        .on("mouseenter.tipper", t.extend({}, c, e || {}), o)
    );
  }
  function o(e) {
    var o = t(this),
      r = t.extend(!0, {}, e.data, o.data("tipper-options"));
    (r.$target = o),
      (f = { left: e.pageX, top: e.pageY }),
      r.delay
        ? (s(r.timer),
          (r.timer = setTimeout(function () {
            i(r.$target, r);
          }, r.delay)))
        : i(r.$target, r),
      r.$target.one("mouseleave.tipper", r, n),
      !r.follow &&
        r.match &&
        r.$target.on("mousemove.tipper", r, p).trigger("mousemove");
  }
  function i(e, o) {
    var i = "";
    (i += '<div class="tipper ' + o.direction + '">'),
      (i += '<div class="tipper-content">'),
      (i += o.formatter.apply(a, [e])),
      (i += '<span class="tipper-caret"></span>'),
      (i += "</div>"),
      (i += "</div>"),
      (o.$target = e),
      (o.$tipper = t(i)),
      a.append(o.$tipper),
      (o.$content = o.$tipper.find(".tipper-content")),
      (o.$caret = o.$tipper.find(".tipper-caret")),
      (o.offset = e.offset()),
      (o.height = e.outerHeight()),
      (o.width = e.outerWidth()),
      (o.tipperPos = {}),
      (o.caretPos = {}),
      (o.contentPos = {});
    var r = o.$caret.outerHeight(!0),
      n = o.$caret.outerWidth(!0),
      s = o.$content.outerHeight(!0),
      c = o.$content.outerWidth(!0);
    "right" === o.direction || "left" === o.direction
      ? ((o.caretPos.top = (s - r) / 2),
        (o.contentPos.top = -s / 2),
        "right" === o.direction
          ? (o.contentPos.left = o.margin)
          : "left" === o.direction && (o.contentPos.left = -(c + o.margin)))
      : ((o.caretPos.left = (c - n) / 2),
        (o.contentPos.left = -c / 2),
        "bottom" === o.direction
          ? (o.contentPos.top = o.margin)
          : "top" === o.direction && (o.contentPos.top = -(s + o.margin))),
      o.$content.css(o.contentPos),
      o.$caret.css(o.caretPos),
      o.follow
        ? o.$target.on("mousemove.tipper", o, p).trigger("mousemove")
        : o.match
        ? ("right" === o.direction || "left" === o.direction
            ? ((o.tipperPos.top = f.top),
              "right" === o.direction
                ? (o.tipperPos.left = o.offset.left + o.width)
                : "left" === o.direction && (o.tipperPos.left = o.offset.left))
            : ((o.tipperPos.left = f.left),
              "bottom" === o.direction
                ? (o.tipperPos.top = o.offset.top + o.height)
                : "top" === o.direction && (o.tipperPos.top = o.offset.top)),
          o.$tipper.css(o.tipperPos))
        : ("right" === o.direction || "left" === o.direction
            ? ((o.tipperPos.top = o.offset.top + o.height / 2),
              "right" === o.direction
                ? (o.tipperPos.left = o.offset.left + o.width)
                : "left" === o.direction && (o.tipperPos.left = o.offset.left))
            : ((o.tipperPos.left = o.offset.left + o.width / 2),
              "bottom" === o.direction
                ? (o.tipperPos.top = o.offset.top + o.height)
                : "top" === o.direction && (o.tipperPos.top = o.offset.top)),
          o.$tipper.css(o.tipperPos));
  }
  function r(t) {
    return t.data("title");
  }
  function p(t) {
    var e = t.data;
    (f = { left: t.pageX, top: t.pageY }),
      e.follow &&
        "undefined" != typeof e.$tipper &&
        e.$tipper.css({ left: f.left, top: f.top });
  }
  function n(t) {
    var e = t.data;
    s(e.timer),
      "undefined" != typeof e.$tipper &&
        (e.$tipper.remove(),
        e.$target.off("mousemove.tipper mouseleave.tipper"));
  }
  function s(t) {
    t && (clearTimeout(t), (t = null));
  }
  var a,
    f,
    c = {
      delay: 0,
      direction: "top",
      follow: !1,
      formatter: t.noop,
      margin: 15,
      match: !1,
    },
    l = {
      defaults: function (e) {
        return (c = t.extend(c, e || {})), t(this);
      },
      destroy: function () {
        return t(this)
          .trigger("mouseleave.tipper")
          .off(".tipper")
          .removeClass("tipper-attached");
      },
    };
  (t.fn.tipper = function (t) {
    return l[t]
      ? l[t].apply(this, Array.prototype.slice.call(arguments, 1))
      : "object" != typeof t && t
      ? this
      : e.apply(this, arguments);
  }),
    (t.tipper = function (t) {
      "defaults" === t &&
        l.defaults.apply(this, Array.prototype.slice.call(arguments, 1));
    });
})(jQuery);

if (bkSmoothScroll["status"] != 0) {
  // SmoothScroll for websites v1.2.1
  // Licensed under the terms of the MIT license.

  // People involved
  //  - Balazs Galambosi (maintainer)
  //  - Michael Herf     (Pulse Algorithm)

  !(function () {
    function e() {
      var e = !1;
      e && c("keydown", r), v.keyboardSupport && !e && u("keydown", r);
    }
    function t() {
      if (document.body) {
        var t = document.body,
          n = document.documentElement,
          o = window.innerHeight,
          r = t.scrollHeight;
        if (
          ((S = document.compatMode.indexOf("CSS") >= 0 ? n : t),
          (w = t),
          e(),
          (x = !0),
          top != self)
        )
          y = !0;
        else if (r > o && (t.offsetHeight <= o || n.offsetHeight <= o)) {
          var a = !1,
            i = function () {
              a ||
                n.scrollHeight == document.height ||
                ((a = !0),
                setTimeout(function () {
                  (n.style.height = document.height + "px"), (a = !1);
                }, 500));
            };
          if (
            ((n.style.height = "auto"), setTimeout(i, 10), S.offsetHeight <= o)
          ) {
            var l = document.createElement("div");
            (l.style.clear = "both"), t.appendChild(l);
          }
        }
        v.fixedBackground ||
          b ||
          ((t.style.backgroundAttachment = "scroll"),
          (n.style.backgroundAttachment = "scroll"));
      }
    }
    function n(e, t, n, o) {
      if ((o || (o = 1e3), d(t, n), 1 != v.accelerationMax)) {
        var r = +new Date(),
          a = r - C;
        if (a < v.accelerationDelta) {
          var i = (1 + 30 / a) / 2;
          i > 1 && ((i = Math.min(i, v.accelerationMax)), (t *= i), (n *= i));
        }
        C = +new Date();
      }
      if (
        (M.push({
          x: t,
          y: n,
          lastX: 0 > t ? 0.99 : -0.99,
          lastY: 0 > n ? 0.99 : -0.99,
          start: +new Date(),
        }),
        !T)
      ) {
        var l = e === document.body,
          u = function () {
            for (var r = +new Date(), a = 0, i = 0, c = 0; c < M.length; c++) {
              var s = M[c],
                d = r - s.start,
                f = d >= v.animationTime,
                h = f ? 1 : d / v.animationTime;
              v.pulseAlgorithm && (h = p(h));
              var m = (s.x * h - s.lastX) >> 0,
                w = (s.y * h - s.lastY) >> 0;
              (a += m),
                (i += w),
                (s.lastX += m),
                (s.lastY += w),
                f && (M.splice(c, 1), c--);
            }
            l
              ? window.scrollBy(a, i)
              : (a && (e.scrollLeft += a), i && (e.scrollTop += i)),
              t || n || (M = []),
              M.length ? N(u, e, o / v.frameRate + 1) : (T = !1);
          };
        N(u, e, 0), (T = !0);
      }
    }
    function o(e) {
      x || t();
      var o = e.target,
        r = l(o);
      if (
        !r ||
        e.defaultPrevented ||
        s(w, "embed") ||
        (s(o, "embed") && /\.pdf/i.test(o.src))
      )
        return !0;
      var a = e.wheelDeltaX || 0,
        i = e.wheelDeltaY || 0;
      return (
        a || i || (i = e.wheelDelta || 0),
        !v.touchpadSupport && f(i)
          ? !0
          : (Math.abs(a) > 1.2 && (a *= v.stepSize / 120),
            Math.abs(i) > 1.2 && (i *= v.stepSize / 120),
            n(r, -a, -i),
            void e.preventDefault())
      );
    }
    function r(e) {
      var t = e.target,
        o =
          e.ctrlKey ||
          e.altKey ||
          e.metaKey ||
          (e.shiftKey && e.keyCode !== H.spacebar);
      if (
        /input|textarea|select|embed/i.test(t.nodeName) ||
        t.isContentEditable ||
        e.defaultPrevented ||
        o
      )
        return !0;
      if (s(t, "button") && e.keyCode === H.spacebar) return !0;
      var r,
        a = 0,
        i = 0,
        u = l(w),
        c = u.clientHeight;
      switch ((u == document.body && (c = window.innerHeight), e.keyCode)) {
        case H.up:
          i = -v.arrowScroll;
          break;
        case H.down:
          i = v.arrowScroll;
          break;
        case H.spacebar:
          (r = e.shiftKey ? 1 : -1), (i = -r * c * 0.9);
          break;
        case H.pageup:
          i = 0.9 * -c;
          break;
        case H.pagedown:
          i = 0.9 * c;
          break;
        case H.home:
          i = -u.scrollTop;
          break;
        case H.end:
          var d = u.scrollHeight - u.scrollTop - c;
          i = d > 0 ? d + 10 : 0;
          break;
        case H.left:
          a = -v.arrowScroll;
          break;
        case H.right:
          a = v.arrowScroll;
          break;
        default:
          return !0;
      }
      n(u, a, i), e.preventDefault();
    }
    function a(e) {
      w = e.target;
    }
    function i(e, t) {
      for (var n = e.length; n--; ) E[A(e[n])] = t;
      return t;
    }
    function l(e) {
      var t = [],
        n = S.scrollHeight;
      do {
        var o = E[A(e)];
        if (o) return i(t, o);
        if ((t.push(e), n === e.scrollHeight)) {
          if (!y || S.clientHeight + 10 < n) return i(t, document.body);
        } else if (
          e.clientHeight + 10 < e.scrollHeight &&
          ((overflow = getComputedStyle(e, "").getPropertyValue("overflow-y")),
          "scroll" === overflow || "auto" === overflow)
        )
          return i(t, e);
      } while ((e = e.parentNode));
    }
    function u(e, t, n) {
      window.addEventListener(e, t, n || !1);
    }
    function c(e, t, n) {
      window.removeEventListener(e, t, n || !1);
    }
    function s(e, t) {
      return (e.nodeName || "").toLowerCase() === t.toLowerCase();
    }
    function d(e, t) {
      (e = e > 0 ? 1 : -1),
        (t = t > 0 ? 1 : -1),
        (k.x !== e || k.y !== t) && ((k.x = e), (k.y = t), (M = []), (C = 0));
    }
    function f(e) {
      if (e) {
        (e = Math.abs(e)), D.push(e), D.shift(), clearTimeout(z);
        var t = h(D[0], 120) && h(D[1], 120) && h(D[2], 120);
        return !t;
      }
    }
    function h(e, t) {
      return Math.floor(e / t) == e / t;
    }
    function m(e) {
      var t, n, o;
      return (
        (e *= v.pulseScale),
        1 > e
          ? (t = e - (1 - Math.exp(-e)))
          : ((n = Math.exp(-1)),
            (e -= 1),
            (o = 1 - Math.exp(-e)),
            (t = n + o * (1 - n))),
        t * v.pulseNormalize
      );
    }
    function p(e) {
      return e >= 1
        ? 1
        : 0 >= e
        ? 0
        : (1 == v.pulseNormalize && (v.pulseNormalize /= m(1)), m(e));
    }
    var w,
      g = {
        frameRate: 150,
        animationTime: 400,
        stepSize: 120,
        pulseAlgorithm: !0,
        pulseScale: 8,
        pulseNormalize: 1,
        accelerationDelta: 20,
        accelerationMax: 1,
        keyboardSupport: !0,
        arrowScroll: 50,
        touchpadSupport: !0,
        fixedBackground: !0,
        excluded: "",
      },
      v = g,
      b = !1,
      y = !1,
      k = { x: 0, y: 0 },
      x = !1,
      S = document.documentElement,
      D = [120, 120, 120],
      H = {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        spacebar: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
      },
      v = g,
      M = [],
      T = !1,
      C = +new Date(),
      E = {};
    setInterval(function () {
      E = {};
    }, 1e4);
    var z,
      A = (function () {
        var e = 0;
        return function (t) {
          return t.uniqueID || (t.uniqueID = e++);
        };
      })(),
      N = (function () {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          function (e, t, n) {
            window.setTimeout(e, n || 1e3 / 60);
          }
        );
      })(),
      K = /chrome/i.test(window.navigator.userAgent),
      L = null;
    "onwheel" in document.createElement("div")
      ? (L = "wheel")
      : "onmousewheel" in document.createElement("div") && (L = "mousewheel"),
      L && K && (u(L, o), u("mousedown", a), u("load", t));
  })();
}
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.5.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
!(function (i) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], i)
    : "undefined" != typeof exports
    ? (module.exports = i(require("jquery")))
    : i(jQuery);
})(function (i) {
  "use strict";
  var e = window.Slick || {};
  (e = (function () {
    function e(e, o) {
      var s,
        n,
        l,
        r = this;
      if (
        ((r.defaults = {
          accessibility: !0,
          adaptiveHeight: !1,
          appendArrows: i(e),
          appendDots: i(e),
          arrows: !0,
          asNavFor: null,
          prevArrow:
            '<button type="button" data-role="none" class="slick-prev" aria-label="previous">Previous</button>',
          nextArrow:
            '<button type="button" data-role="none" class="slick-next" aria-label="next">Next</button>',
          autoplay: !1,
          autoplaySpeed: 3e3,
          centerMode: !1,
          centerPadding: "50px",
          cssEase: "ease",
          customPaging: function (i, e) {
            return (
              '<button type="button" data-role="none">' + (e + 1) + "</button>"
            );
          },
          dots: !1,
          dotsClass: "slick-dots",
          draggable: !0,
          easing: "linear",
          edgeFriction: 0.35,
          fade: !1,
          focusOnSelect: !1,
          infinite: !0,
          initialSlide: 0,
          lazyLoad: "ondemand",
          mobileFirst: !1,
          pauseOnHover: !0,
          pauseOnDotsHover: !1,
          respondTo: "window",
          responsive: null,
          rows: 1,
          rtl: !1,
          slide: "",
          slidesPerRow: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          swipe: !0,
          swipeToSlide: !1,
          touchMove: !0,
          touchThreshold: 5,
          useCSS: !0,
          variableWidth: !1,
          vertical: !1,
          verticalSwiping: !1,
          waitForAnimate: !0,
        }),
        (r.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
        }),
        i.extend(r, r.initials),
        (r.activeBreakpoint = null),
        (r.animType = null),
        (r.animProp = null),
        (r.breakpoints = []),
        (r.breakpointSettings = []),
        (r.cssTransitions = !1),
        (r.hidden = "hidden"),
        (r.paused = !1),
        (r.positionProp = null),
        (r.respondTo = null),
        (r.rowCount = 1),
        (r.shouldClick = !0),
        (r.$slider = i(e)),
        (r.$slidesCache = null),
        (r.transformType = null),
        (r.transitionType = null),
        (r.visibilityChange = "visibilitychange"),
        (r.windowWidth = 0),
        (r.windowTimer = null),
        (s = i(e).data("slick") || {}),
        (r.options = i.extend({}, r.defaults, s, o)),
        (r.currentSlide = r.options.initialSlide),
        (r.originalSettings = r.options),
        (n = r.options.responsive || null),
        n && n.length > -1)
      ) {
        r.respondTo = r.options.respondTo || "window";
        for (l in n)
          n.hasOwnProperty(l) &&
            (r.breakpoints.push(n[l].breakpoint),
            (r.breakpointSettings[n[l].breakpoint] = n[l].settings));
        r.breakpoints.sort(function (i, e) {
          return r.options.mobileFirst === !0 ? i - e : e - i;
        });
      }
      "undefined" != typeof document.mozHidden
        ? ((r.hidden = "mozHidden"),
          (r.visibilityChange = "mozvisibilitychange"))
        : "undefined" != typeof document.msHidden
        ? ((r.hidden = "msHidden"), (r.visibilityChange = "msvisibilitychange"))
        : "undefined" != typeof document.webkitHidden &&
          ((r.hidden = "webkitHidden"),
          (r.visibilityChange = "webkitvisibilitychange")),
        (r.autoPlay = i.proxy(r.autoPlay, r)),
        (r.autoPlayClear = i.proxy(r.autoPlayClear, r)),
        (r.changeSlide = i.proxy(r.changeSlide, r)),
        (r.clickHandler = i.proxy(r.clickHandler, r)),
        (r.selectHandler = i.proxy(r.selectHandler, r)),
        (r.setPosition = i.proxy(r.setPosition, r)),
        (r.swipeHandler = i.proxy(r.swipeHandler, r)),
        (r.dragHandler = i.proxy(r.dragHandler, r)),
        (r.keyHandler = i.proxy(r.keyHandler, r)),
        (r.autoPlayIterator = i.proxy(r.autoPlayIterator, r)),
        (r.instanceUid = t++),
        (r.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        r.init(),
        r.checkResponsive(!0);
    }
    var t = 0;
    return e;
  })()),
    (e.prototype.addSlide = e.prototype.slickAdd =
      function (e, t, o) {
        var s = this;
        if ("boolean" == typeof t) (o = t), (t = null);
        else if (0 > t || t >= s.slideCount) return !1;
        s.unload(),
          "number" == typeof t
            ? 0 === t && 0 === s.$slides.length
              ? i(e).appendTo(s.$slideTrack)
              : o
              ? i(e).insertBefore(s.$slides.eq(t))
              : i(e).insertAfter(s.$slides.eq(t))
            : o === !0
            ? i(e).prependTo(s.$slideTrack)
            : i(e).appendTo(s.$slideTrack),
          (s.$slides = s.$slideTrack.children(this.options.slide)),
          s.$slideTrack.children(this.options.slide).detach(),
          s.$slideTrack.append(s.$slides),
          s.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e);
          }),
          (s.$slidesCache = s.$slides),
          s.reinit();
      }),
    (e.prototype.animateHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        i.options.adaptiveHeight === !0 &&
        i.options.vertical === !1
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.animate({ height: e }, i.options.speed);
      }
    }),
    (e.prototype.animateSlide = function (e, t) {
      var o = {},
        s = this;
      s.animateHeight(),
        s.options.rtl === !0 && s.options.vertical === !1 && (e = -e),
        s.transformsEnabled === !1
          ? s.options.vertical === !1
            ? s.$slideTrack.animate(
                { left: e },
                s.options.speed,
                s.options.easing,
                t
              )
            : s.$slideTrack.animate(
                { top: e },
                s.options.speed,
                s.options.easing,
                t
              )
          : s.cssTransitions === !1
          ? (s.options.rtl === !0 && (s.currentLeft = -s.currentLeft),
            i({ animStart: s.currentLeft }).animate(
              { animStart: e },
              {
                duration: s.options.speed,
                easing: s.options.easing,
                step: function (i) {
                  (i = Math.ceil(i)),
                    s.options.vertical === !1
                      ? ((o[s.animType] = "translate(" + i + "px, 0px)"),
                        s.$slideTrack.css(o))
                      : ((o[s.animType] = "translate(0px," + i + "px)"),
                        s.$slideTrack.css(o));
                },
                complete: function () {
                  t && t.call();
                },
              }
            ))
          : (s.applyTransition(),
            (e = Math.ceil(e)),
            (o[s.animType] =
              s.options.vertical === !1
                ? "translate3d(" + e + "px, 0px, 0px)"
                : "translate3d(0px," + e + "px, 0px)"),
            s.$slideTrack.css(o),
            t &&
              setTimeout(function () {
                s.disableTransition(), t.call();
              }, s.options.speed));
    }),
    (e.prototype.asNavFor = function (e) {
      var t = this,
        o =
          null !== t.options.asNavFor
            ? i(t.options.asNavFor).slick("getSlick")
            : null;
      null !== o && o.slideHandler(e, !0);
    }),
    (e.prototype.applyTransition = function (i) {
      var e = this,
        t = {};
      (t[e.transitionType] =
        e.options.fade === !1
          ? e.transformType + " " + e.options.speed + "ms " + e.options.cssEase
          : "opacity " + e.options.speed + "ms " + e.options.cssEase),
        e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.autoPlay = function () {
      var i = this;
      i.autoPlayTimer && clearInterval(i.autoPlayTimer),
        i.slideCount > i.options.slidesToShow &&
          i.paused !== !0 &&
          (i.autoPlayTimer = setInterval(
            i.autoPlayIterator,
            i.options.autoplaySpeed
          ));
    }),
    (e.prototype.autoPlayClear = function () {
      var i = this;
      i.autoPlayTimer && clearInterval(i.autoPlayTimer);
    }),
    (e.prototype.autoPlayIterator = function () {
      var i = this;
      i.options.infinite === !1
        ? 1 === i.direction
          ? (i.currentSlide + 1 === i.slideCount - 1 && (i.direction = 0),
            i.slideHandler(i.currentSlide + i.options.slidesToScroll))
          : (i.currentSlide - 1 === 0 && (i.direction = 1),
            i.slideHandler(i.currentSlide - i.options.slidesToScroll))
        : i.slideHandler(i.currentSlide + i.options.slidesToScroll);
    }),
    (e.prototype.buildArrows = function () {
      var e = this;
      e.options.arrows === !0 &&
        e.slideCount > e.options.slidesToShow &&
        ((e.$prevArrow = i(e.options.prevArrow)),
        (e.$nextArrow = i(e.options.nextArrow)),
        e.htmlExpr.test(e.options.prevArrow) &&
          e.$prevArrow.appendTo(e.options.appendArrows),
        e.htmlExpr.test(e.options.nextArrow) &&
          e.$nextArrow.appendTo(e.options.appendArrows),
        e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled"));
    }),
    (e.prototype.buildDots = function () {
      var e,
        t,
        o = this;
      if (o.options.dots === !0 && o.slideCount > o.options.slidesToShow) {
        for (
          t = '<ul class="' + o.options.dotsClass + '">', e = 0;
          e <= o.getDotCount();
          e += 1
        )
          t += "<li>" + o.options.customPaging.call(this, o, e) + "</li>";
        (t += "</ul>"),
          (o.$dots = i(t).appendTo(o.options.appendDots)),
          o.$dots
            .find("li")
            .first()
            .addClass("slick-active")
            .attr("aria-hidden", "false");
      }
    }),
    (e.prototype.buildOut = function () {
      var e = this;
      (e.$slides = e.$slider
        .children(":not(.slick-cloned)")
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.$slides.each(function (e, t) {
          i(t).attr("data-slick-index", e);
        }),
        (e.$slidesCache = e.$slides),
        e.$slider.addClass("slick-slider"),
        (e.$slideTrack =
          0 === e.slideCount
            ? i('<div class="slick-track"/>').appendTo(e.$slider)
            : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (e.$list = e.$slideTrack
          .wrap('<div aria-live="polite" class="slick-list"/>')
          .parent()),
        e.$slideTrack.css("opacity", 0),
        (e.options.centerMode === !0 || e.options.swipeToSlide === !0) &&
          (e.options.slidesToScroll = 1),
        i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.options.accessibility === !0 && e.$list.prop("tabIndex", 0),
        e.setSlideClasses(
          "number" == typeof this.currentSlide ? this.currentSlide : 0
        ),
        e.options.draggable === !0 && e.$list.addClass("draggable");
    }),
    (e.prototype.buildRows = function () {
      var i,
        e,
        t,
        o,
        s,
        n,
        l,
        r = this;
      if (
        ((o = document.createDocumentFragment()),
        (n = r.$slider.children()),
        r.options.rows > 1)
      ) {
        for (
          l = r.options.slidesPerRow * r.options.rows,
            s = Math.ceil(n.length / l),
            i = 0;
          s > i;
          i++
        ) {
          var d = document.createElement("div");
          for (e = 0; e < r.options.rows; e++) {
            var a = document.createElement("div");
            for (t = 0; t < r.options.slidesPerRow; t++) {
              var c = i * l + (e * r.options.slidesPerRow + t);
              n.get(c) && a.appendChild(n.get(c));
            }
            d.appendChild(a);
          }
          o.appendChild(d);
        }
        r.$slider.html(o),
          r.$slider
            .children()
            .children()
            .children()
            .width(100 / r.options.slidesPerRow + "%")
            .css({ display: "inline-block" });
      }
    }),
    (e.prototype.checkResponsive = function (e) {
      var t,
        o,
        s,
        n = this,
        l = n.$slider.width(),
        r = window.innerWidth || i(window).width();
      if (
        ("window" === n.respondTo
          ? (s = r)
          : "slider" === n.respondTo
          ? (s = l)
          : "min" === n.respondTo && (s = Math.min(r, l)),
        n.originalSettings.responsive &&
          n.originalSettings.responsive.length > -1 &&
          null !== n.originalSettings.responsive)
      ) {
        o = null;
        for (t in n.breakpoints)
          n.breakpoints.hasOwnProperty(t) &&
            (n.originalSettings.mobileFirst === !1
              ? s < n.breakpoints[t] && (o = n.breakpoints[t])
              : s > n.breakpoints[t] && (o = n.breakpoints[t]));
        null !== o
          ? null !== n.activeBreakpoint
            ? o !== n.activeBreakpoint &&
              ((n.activeBreakpoint = o),
              "unslick" === n.breakpointSettings[o]
                ? n.unslick()
                : ((n.options = i.extend(
                    {},
                    n.originalSettings,
                    n.breakpointSettings[o]
                  )),
                  e === !0 && (n.currentSlide = n.options.initialSlide),
                  n.refresh()))
            : ((n.activeBreakpoint = o),
              "unslick" === n.breakpointSettings[o]
                ? n.unslick()
                : ((n.options = i.extend(
                    {},
                    n.originalSettings,
                    n.breakpointSettings[o]
                  )),
                  e === !0 && (n.currentSlide = n.options.initialSlide),
                  n.refresh()))
          : null !== n.activeBreakpoint &&
            ((n.activeBreakpoint = null),
            (n.options = n.originalSettings),
            e === !0 && (n.currentSlide = n.options.initialSlide),
            n.refresh());
      }
    }),
    (e.prototype.changeSlide = function (e, t) {
      var o,
        s,
        n,
        l = this,
        r = i(e.target);
      switch (
        (r.is("a") && e.preventDefault(),
        (n = l.slideCount % l.options.slidesToScroll !== 0),
        (o = n
          ? 0
          : (l.slideCount - l.currentSlide) % l.options.slidesToScroll),
        e.data.message)
      ) {
        case "previous":
          (s = 0 === o ? l.options.slidesToScroll : l.options.slidesToShow - o),
            l.slideCount > l.options.slidesToShow &&
              l.slideHandler(l.currentSlide - s, !1, t);
          break;
        case "next":
          (s = 0 === o ? l.options.slidesToScroll : o),
            l.slideCount > l.options.slidesToShow &&
              l.slideHandler(l.currentSlide + s, !1, t);
          break;
        case "index":
          var d =
            0 === e.data.index
              ? 0
              : e.data.index ||
                i(e.target).parent().index() * l.options.slidesToScroll;
          l.slideHandler(l.checkNavigable(d), !1, t);
          break;
        default:
          return;
      }
    }),
    (e.prototype.checkNavigable = function (i) {
      var e,
        t,
        o = this;
      if (((e = o.getNavigableIndexes()), (t = 0), i > e[e.length - 1]))
        i = e[e.length - 1];
      else
        for (var s in e) {
          if (i < e[s]) {
            i = t;
            break;
          }
          t = e[s];
        }
      return i;
    }),
    (e.prototype.cleanUpEvents = function () {
      var e = this;
      e.options.dots === !0 &&
        e.slideCount > e.options.slidesToShow &&
        i("li", e.$dots).off("click.slick", e.changeSlide),
        e.options.dots === !0 &&
          e.options.pauseOnDotsHover === !0 &&
          e.options.autoplay === !0 &&
          i("li", e.$dots)
            .off("mouseenter.slick", e.setPaused.bind(e, !0))
            .off("mouseleave.slick", e.setPaused.bind(e, !1)),
        e.options.arrows === !0 &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
          e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        e.options.autoplay === !0 &&
          i(document).off(e.visibilityChange, e.visibility),
        e.$list.off("mouseenter.slick", e.setPaused.bind(e, !0)),
        e.$list.off("mouseleave.slick", e.setPaused.bind(e, !1)),
        e.options.accessibility === !0 &&
          e.$list.off("keydown.slick", e.keyHandler),
        e.options.focusOnSelect === !0 &&
          i(e.$slideTrack).children().off("click.slick", e.selectHandler),
        i(window).off(
          "orientationchange.slick.slick-" + e.instanceUid,
          e.orientationChange
        ),
        i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        i("[draggable!=true]", e.$slideTrack).off(
          "dragstart",
          e.preventDefault
        ),
        i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition),
        i(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition);
    }),
    (e.prototype.cleanUpRows = function () {
      var i,
        e = this;
      e.options.rows > 1 &&
        ((i = e.$slides.children().children()),
        i.removeAttr("style"),
        e.$slider.html(i));
    }),
    (e.prototype.clickHandler = function (i) {
      var e = this;
      e.shouldClick === !1 &&
        (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
    }),
    (e.prototype.destroy = function () {
      var e = this;
      e.autoPlayClear(),
        (e.touchObject = {}),
        e.cleanUpEvents(),
        i(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow &&
          "object" != typeof e.options.prevArrow &&
          e.$prevArrow.remove(),
        e.$nextArrow &&
          "object" != typeof e.options.nextArrow &&
          e.$nextArrow.remove(),
        e.$slides &&
          (e.$slides
            .removeClass("slick-slide slick-active slick-center slick-visible")
            .attr("aria-hidden", "true")
            .removeAttr("data-slick-index")
            .css({
              position: "",
              left: "",
              top: "",
              zIndex: "",
              opacity: "",
              width: "",
            }),
          e.$slider.html(e.$slides)),
        e.cleanUpRows(),
        e.$slider.removeClass("slick-slider"),
        e.$slider.removeClass("slick-initialized");
    }),
    (e.prototype.disableTransition = function (i) {
      var e = this,
        t = {};
      (t[e.transitionType] = ""),
        e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.fadeSlide = function (i, e) {
      var t = this;
      t.cssTransitions === !1
        ? (t.$slides.eq(i).css({ zIndex: 1e3 }),
          t.$slides
            .eq(i)
            .animate({ opacity: 1 }, t.options.speed, t.options.easing, e))
        : (t.applyTransition(i),
          t.$slides.eq(i).css({ opacity: 1, zIndex: 1e3 }),
          e &&
            setTimeout(function () {
              t.disableTransition(i), e.call();
            }, t.options.speed));
    }),
    (e.prototype.filterSlides = e.prototype.slickFilter =
      function (i) {
        var e = this;
        null !== i &&
          (e.unload(),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slidesCache.filter(i).appendTo(e.$slideTrack),
          e.reinit());
      }),
    (e.prototype.getCurrent = e.prototype.slickCurrentSlide =
      function () {
        var i = this;
        return i.currentSlide;
      }),
    (e.prototype.getDotCount = function () {
      var i = this,
        e = 0,
        t = 0,
        o = 0;
      if (i.options.infinite === !0)
        o = Math.ceil(i.slideCount / i.options.slidesToScroll);
      else if (i.options.centerMode === !0) o = i.slideCount;
      else
        for (; e < i.slideCount; )
          ++o,
            (e = t + i.options.slidesToShow),
            (t +=
              i.options.slidesToScroll <= i.options.slidesToShow
                ? i.options.slidesToScroll
                : i.options.slidesToShow);
      return o - 1;
    }),
    (e.prototype.getLeft = function (i) {
      var e,
        t,
        o,
        s = this,
        n = 0;
      return (
        (s.slideOffset = 0),
        (t = s.$slides.first().outerHeight()),
        s.options.infinite === !0
          ? (s.slideCount > s.options.slidesToShow &&
              ((s.slideOffset = s.slideWidth * s.options.slidesToShow * -1),
              (n = t * s.options.slidesToShow * -1)),
            s.slideCount % s.options.slidesToScroll !== 0 &&
              i + s.options.slidesToScroll > s.slideCount &&
              s.slideCount > s.options.slidesToShow &&
              (i > s.slideCount
                ? ((s.slideOffset =
                    (s.options.slidesToShow - (i - s.slideCount)) *
                    s.slideWidth *
                    -1),
                  (n = (s.options.slidesToShow - (i - s.slideCount)) * t * -1))
                : ((s.slideOffset =
                    (s.slideCount % s.options.slidesToScroll) *
                    s.slideWidth *
                    -1),
                  (n = (s.slideCount % s.options.slidesToScroll) * t * -1))))
          : i + s.options.slidesToShow > s.slideCount &&
            ((s.slideOffset =
              (i + s.options.slidesToShow - s.slideCount) * s.slideWidth),
            (n = (i + s.options.slidesToShow - s.slideCount) * t)),
        s.slideCount <= s.options.slidesToShow &&
          ((s.slideOffset = 0), (n = 0)),
        s.options.centerMode === !0 && s.options.infinite === !0
          ? (s.slideOffset +=
              s.slideWidth * Math.floor(s.options.slidesToShow / 2) -
              s.slideWidth)
          : s.options.centerMode === !0 &&
            ((s.slideOffset = 0),
            (s.slideOffset +=
              s.slideWidth * Math.floor(s.options.slidesToShow / 2))),
        (e =
          s.options.vertical === !1
            ? i * s.slideWidth * -1 + s.slideOffset
            : i * t * -1 + n),
        s.options.variableWidth === !0 &&
          ((o = s.$slideTrack
            .children(".slick-slide")
            .eq(
              s.slideCount <= s.options.slidesToShow ||
                s.options.infinite === !1
                ? i
                : i + s.options.slidesToShow
            )),
          (e = o[0] ? -1 * o[0].offsetLeft : 0),
          s.options.centerMode === !0 &&
            ((o = s.$slideTrack
              .children(".slick-slide")
              .eq(
                s.options.infinite === !1 ? i : i + s.options.slidesToShow + 1
              )),
            (e = o[0] ? -1 * o[0].offsetLeft : 0),
            (e += (s.$list.width() - o.outerWidth()) / 2))),
        e
      );
    }),
    (e.prototype.getOption = e.prototype.slickGetOption =
      function (i) {
        var e = this;
        return e.options[i];
      }),
    (e.prototype.getNavigableIndexes = function () {
      var i,
        e = this,
        t = 0,
        o = 0,
        s = [];
      for (
        e.options.infinite === !1
          ? ((i = e.slideCount - e.options.slidesToShow + 1),
            e.options.centerMode === !0 && (i = e.slideCount))
          : ((t = -1 * e.options.slidesToScroll),
            (o = -1 * e.options.slidesToScroll),
            (i = 2 * e.slideCount));
        i > t;

      )
        s.push(t),
          (t = o + e.options.slidesToScroll),
          (o +=
            e.options.slidesToScroll <= e.options.slidesToShow
              ? e.options.slidesToScroll
              : e.options.slidesToShow);
      return s;
    }),
    (e.prototype.getSlick = function () {
      return this;
    }),
    (e.prototype.getSlideCount = function () {
      var e,
        t,
        o,
        s = this;
      return (
        (o =
          s.options.centerMode === !0
            ? s.slideWidth * Math.floor(s.options.slidesToShow / 2)
            : 0),
        s.options.swipeToSlide === !0
          ? (s.$slideTrack.find(".slick-slide").each(function (e, n) {
              return n.offsetLeft - o + i(n).outerWidth() / 2 > -1 * s.swipeLeft
                ? ((t = n), !1)
                : void 0;
            }),
            (e = Math.abs(i(t).attr("data-slick-index") - s.currentSlide) || 1))
          : s.options.slidesToScroll
      );
    }),
    (e.prototype.goTo = e.prototype.slickGoTo =
      function (i, e) {
        var t = this;
        t.changeSlide({ data: { message: "index", index: parseInt(i) } }, e);
      }),
    (e.prototype.init = function () {
      var e = this;
      i(e.$slider).hasClass("slick-initialized") ||
        (i(e.$slider).addClass("slick-initialized"),
        e.buildRows(),
        e.buildOut(),
        e.setProps(),
        e.startLoad(),
        e.loadSlider(),
        e.initializeEvents(),
        e.updateArrows(),
        e.updateDots()),
        e.$slider.trigger("init", [e]);
    }),
    (e.prototype.initArrowEvents = function () {
      var i = this;
      i.options.arrows === !0 &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.on("click.slick", { message: "previous" }, i.changeSlide),
        i.$nextArrow.on("click.slick", { message: "next" }, i.changeSlide));
    }),
    (e.prototype.initDotEvents = function () {
      var e = this;
      e.options.dots === !0 &&
        e.slideCount > e.options.slidesToShow &&
        i("li", e.$dots).on("click.slick", { message: "index" }, e.changeSlide),
        e.options.dots === !0 &&
          e.options.pauseOnDotsHover === !0 &&
          e.options.autoplay === !0 &&
          i("li", e.$dots)
            .on("mouseenter.slick", e.setPaused.bind(e, !0))
            .on("mouseleave.slick", e.setPaused.bind(e, !1));
    }),
    (e.prototype.initializeEvents = function () {
      var e = this;
      e.initArrowEvents(),
        e.initDotEvents(),
        e.$list.on(
          "touchstart.slick mousedown.slick",
          { action: "start" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchmove.slick mousemove.slick",
          { action: "move" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchend.slick mouseup.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchcancel.slick mouseleave.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on("click.slick", e.clickHandler),
        e.options.autoplay === !0 &&
          i(document).on(e.visibilityChange, e.visibility.bind(e)),
        e.$list.on("mouseenter.slick", e.setPaused.bind(e, !0)),
        e.$list.on("mouseleave.slick", e.setPaused.bind(e, !1)),
        e.options.accessibility === !0 &&
          e.$list.on("keydown.slick", e.keyHandler),
        e.options.focusOnSelect === !0 &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        i(window).on(
          "orientationchange.slick.slick-" + e.instanceUid,
          e.orientationChange.bind(e)
        ),
        i(window).on("resize.slick.slick-" + e.instanceUid, e.resize.bind(e)),
        i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        i(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition);
    }),
    (e.prototype.initUI = function () {
      var i = this;
      i.options.arrows === !0 &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.show(), i.$nextArrow.show()),
        i.options.dots === !0 &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.show(),
        i.options.autoplay === !0 && i.autoPlay();
    }),
    (e.prototype.keyHandler = function (i) {
      var e = this;
      37 === i.keyCode && e.options.accessibility === !0
        ? e.changeSlide({ data: { message: "previous" } })
        : 39 === i.keyCode &&
          e.options.accessibility === !0 &&
          e.changeSlide({ data: { message: "next" } });
    }),
    (e.prototype.lazyLoad = function () {
      function e(e) {
        i("img[data-lazy]", e).each(function () {
          var e = i(this),
            t = i(this).attr("data-lazy"),
            o = document.createElement("img");
          (o.onload = function () {
            e.animate({ opacity: 1 }, 200);
          }),
            (o.src = t),
            e
              .css({ opacity: 0 })
              .attr("src", t)
              .removeAttr("data-lazy")
              .removeClass("slick-loading");
        });
      }
      var t,
        o,
        s,
        n,
        l = this;
      l.options.centerMode === !0
        ? l.options.infinite === !0
          ? ((s = l.currentSlide + (l.options.slidesToShow / 2 + 1)),
            (n = s + l.options.slidesToShow + 2))
          : ((s = Math.max(
              0,
              l.currentSlide - (l.options.slidesToShow / 2 + 1)
            )),
            (n = 2 + (l.options.slidesToShow / 2 + 1) + l.currentSlide))
        : ((s = l.options.infinite
            ? l.options.slidesToShow + l.currentSlide
            : l.currentSlide),
          (n = s + l.options.slidesToShow),
          l.options.fade === !0 && (s > 0 && s--, n <= l.slideCount && n++)),
        (t = l.$slider.find(".slick-slide").slice(s, n)),
        e(t),
        l.slideCount <= l.options.slidesToShow
          ? ((o = l.$slider.find(".slick-slide")), e(o))
          : l.currentSlide >= l.slideCount - l.options.slidesToShow
          ? ((o = l.$slider
              .find(".slick-cloned")
              .slice(0, l.options.slidesToShow)),
            e(o))
          : 0 === l.currentSlide &&
            ((o = l.$slider
              .find(".slick-cloned")
              .slice(-1 * l.options.slidesToShow)),
            e(o));
    }),
    (e.prototype.loadSlider = function () {
      var i = this;
      i.setPosition(),
        i.$slideTrack.css({ opacity: 1 }),
        i.$slider.removeClass("slick-loading"),
        i.initUI(),
        "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
    }),
    (e.prototype.next = e.prototype.slickNext =
      function () {
        var i = this;
        i.changeSlide({ data: { message: "next" } });
      }),
    (e.prototype.orientationChange = function () {
      var i = this;
      i.checkResponsive(), i.setPosition();
    }),
    (e.prototype.pause = e.prototype.slickPause =
      function () {
        var i = this;
        i.autoPlayClear(), (i.paused = !0);
      }),
    (e.prototype.play = e.prototype.slickPlay =
      function () {
        var i = this;
        (i.paused = !1), i.autoPlay();
      }),
    (e.prototype.postSlide = function (i) {
      var e = this;
      e.$slider.trigger("afterChange", [e, i]),
        (e.animating = !1),
        e.setPosition(),
        (e.swipeLeft = null),
        e.options.autoplay === !0 && e.paused === !1 && e.autoPlay();
    }),
    (e.prototype.prev = e.prototype.slickPrev =
      function () {
        var i = this;
        i.changeSlide({ data: { message: "previous" } });
      }),
    (e.prototype.preventDefault = function (i) {
      i.preventDefault();
    }),
    (e.prototype.progressiveLazyLoad = function () {
      var e,
        t,
        o = this;
      (e = i("img[data-lazy]", o.$slider).length),
        e > 0 &&
          ((t = i("img[data-lazy]", o.$slider).first()),
          t
            .attr("src", t.attr("data-lazy"))
            .removeClass("slick-loading")
            .load(function () {
              t.removeAttr("data-lazy"),
                o.progressiveLazyLoad(),
                o.options.adaptiveHeight === !0 && o.setPosition();
            })
            .error(function () {
              t.removeAttr("data-lazy"), o.progressiveLazyLoad();
            }));
    }),
    (e.prototype.refresh = function () {
      var e = this,
        t = e.currentSlide;
      e.destroy(),
        i.extend(e, e.initials),
        e.init(),
        e.changeSlide({ data: { message: "index", index: t } }, !1);
    }),
    (e.prototype.reinit = function () {
      var e = this;
      (e.$slides = e.$slideTrack
        .children(e.options.slide)
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.currentSlide >= e.slideCount &&
          0 !== e.currentSlide &&
          (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.options.focusOnSelect === !0 &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        e.setSlideClasses(0),
        e.setPosition(),
        e.$slider.trigger("reInit", [e]);
    }),
    (e.prototype.resize = function () {
      var e = this;
      i(window).width() !== e.windowWidth &&
        (clearTimeout(e.windowDelay),
        (e.windowDelay = window.setTimeout(function () {
          (e.windowWidth = i(window).width()),
            e.checkResponsive(),
            e.setPosition();
        }, 50)));
    }),
    (e.prototype.removeSlide = e.prototype.slickRemove =
      function (i, e, t) {
        var o = this;
        return (
          "boolean" == typeof i
            ? ((e = i), (i = e === !0 ? 0 : o.slideCount - 1))
            : (i = e === !0 ? --i : i),
          o.slideCount < 1 || 0 > i || i > o.slideCount - 1
            ? !1
            : (o.unload(),
              t === !0
                ? o.$slideTrack.children().remove()
                : o.$slideTrack.children(this.options.slide).eq(i).remove(),
              (o.$slides = o.$slideTrack.children(this.options.slide)),
              o.$slideTrack.children(this.options.slide).detach(),
              o.$slideTrack.append(o.$slides),
              (o.$slidesCache = o.$slides),
              void o.reinit())
        );
      }),
    (e.prototype.setCSS = function (i) {
      var e,
        t,
        o = this,
        s = {};
      o.options.rtl === !0 && (i = -i),
        (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (s[o.positionProp] = i),
        o.transformsEnabled === !1
          ? o.$slideTrack.css(s)
          : ((s = {}),
            o.cssTransitions === !1
              ? ((s[o.animType] = "translate(" + e + ", " + t + ")"),
                o.$slideTrack.css(s))
              : ((s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"),
                o.$slideTrack.css(s)));
    }),
    (e.prototype.setDimensions = function () {
      var i = this;
      i.options.vertical === !1
        ? i.options.centerMode === !0 &&
          i.$list.css({ padding: "0px " + i.options.centerPadding })
        : (i.$list.height(
            i.$slides.first().outerHeight(!0) * i.options.slidesToShow
          ),
          i.options.centerMode === !0 &&
            i.$list.css({ padding: i.options.centerPadding + " 0px" })),
        (i.listWidth = i.$list.width()),
        (i.listHeight = i.$list.height()),
        i.options.vertical === !1 && i.options.variableWidth === !1
          ? ((i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow)),
            i.$slideTrack.width(
              Math.ceil(
                i.slideWidth * i.$slideTrack.children(".slick-slide").length
              )
            ))
          : i.options.variableWidth === !0
          ? i.$slideTrack.width(5e3 * i.slideCount)
          : ((i.slideWidth = Math.ceil(i.listWidth)),
            i.$slideTrack.height(
              Math.ceil(
                i.$slides.first().outerHeight(!0) *
                  i.$slideTrack.children(".slick-slide").length
              )
            ));
      var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
      i.options.variableWidth === !1 &&
        i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
    }),
    (e.prototype.setFade = function () {
      var e,
        t = this;
      t.$slides.each(function (o, s) {
        (e = t.slideWidth * o * -1),
          i(s).css(
            t.options.rtl === !0
              ? {
                  position: "relative",
                  right: e,
                  top: 0,
                  zIndex: 800,
                  opacity: 0,
                }
              : {
                  position: "relative",
                  left: e,
                  top: 0,
                  zIndex: 800,
                  opacity: 0,
                }
          );
      }),
        t.$slides.eq(t.currentSlide).css({ zIndex: 900, opacity: 1 });
    }),
    (e.prototype.setHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        i.options.adaptiveHeight === !0 &&
        i.options.vertical === !1
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.css("height", e);
      }
    }),
    (e.prototype.setOption = e.prototype.slickSetOption =
      function (i, e, t) {
        var o = this;
        (o.options[i] = e), t === !0 && (o.unload(), o.reinit());
      }),
    (e.prototype.setPosition = function () {
      var i = this;
      i.setDimensions(),
        i.setHeight(),
        i.options.fade === !1
          ? i.setCSS(i.getLeft(i.currentSlide))
          : i.setFade(),
        i.$slider.trigger("setPosition", [i]);
    }),
    (e.prototype.setProps = function () {
      var i = this,
        e = document.body.style;
      (i.positionProp = i.options.vertical === !0 ? "top" : "left"),
        "top" === i.positionProp
          ? i.$slider.addClass("slick-vertical")
          : i.$slider.removeClass("slick-vertical"),
        (void 0 !== e.WebkitTransition ||
          void 0 !== e.MozTransition ||
          void 0 !== e.msTransition) &&
          i.options.useCSS === !0 &&
          (i.cssTransitions = !0),
        void 0 !== e.OTransform &&
          ((i.animType = "OTransform"),
          (i.transformType = "-o-transform"),
          (i.transitionType = "OTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.MozTransform &&
          ((i.animType = "MozTransform"),
          (i.transformType = "-moz-transform"),
          (i.transitionType = "MozTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.MozPerspective &&
            (i.animType = !1)),
        void 0 !== e.webkitTransform &&
          ((i.animType = "webkitTransform"),
          (i.transformType = "-webkit-transform"),
          (i.transitionType = "webkitTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.msTransform &&
          ((i.animType = "msTransform"),
          (i.transformType = "-ms-transform"),
          (i.transitionType = "msTransition"),
          void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform &&
          i.animType !== !1 &&
          ((i.animType = "transform"),
          (i.transformType = "transform"),
          (i.transitionType = "transition")),
        (i.transformsEnabled = null !== i.animType && i.animType !== !1);
    }),
    (e.prototype.setSlideClasses = function (i) {
      var e,
        t,
        o,
        s,
        n = this;
      n.$slider
        .find(".slick-slide")
        .removeClass("slick-active")
        .attr("aria-hidden", "true")
        .removeClass("slick-center"),
        (t = n.$slider.find(".slick-slide")),
        n.options.centerMode === !0
          ? ((e = Math.floor(n.options.slidesToShow / 2)),
            n.options.infinite === !0 &&
              (i >= e && i <= n.slideCount - 1 - e
                ? n.$slides
                    .slice(i - e, i + e + 1)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")
                : ((o = n.options.slidesToShow + i),
                  t
                    .slice(o - e + 1, o + e + 2)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")),
              0 === i
                ? t
                    .eq(t.length - 1 - n.options.slidesToShow)
                    .addClass("slick-center")
                : i === n.slideCount - 1 &&
                  t.eq(n.options.slidesToShow).addClass("slick-center")),
            n.$slides.eq(i).addClass("slick-center"))
          : i >= 0 && i <= n.slideCount - n.options.slidesToShow
          ? n.$slides
              .slice(i, i + n.options.slidesToShow)
              .addClass("slick-active")
              .attr("aria-hidden", "false")
          : t.length <= n.options.slidesToShow
          ? t.addClass("slick-active").attr("aria-hidden", "false")
          : ((s = n.slideCount % n.options.slidesToShow),
            (o = n.options.infinite === !0 ? n.options.slidesToShow + i : i),
            n.options.slidesToShow == n.options.slidesToScroll &&
            n.slideCount - i < n.options.slidesToShow
              ? t
                  .slice(o - (n.options.slidesToShow - s), o + s)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : t
                  .slice(o, o + n.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")),
        "ondemand" === n.options.lazyLoad && n.lazyLoad();
    }),
    (e.prototype.setupInfinite = function () {
      var e,
        t,
        o,
        s = this;
      if (
        (s.options.fade === !0 && (s.options.centerMode = !1),
        s.options.infinite === !0 &&
          s.options.fade === !1 &&
          ((t = null), s.slideCount > s.options.slidesToShow))
      ) {
        for (
          o =
            s.options.centerMode === !0
              ? s.options.slidesToShow + 1
              : s.options.slidesToShow,
            e = s.slideCount;
          e > s.slideCount - o;
          e -= 1
        )
          (t = e - 1),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t - s.slideCount)
              .prependTo(s.$slideTrack)
              .addClass("slick-cloned");
        for (e = 0; o > e; e += 1)
          (t = e),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t + s.slideCount)
              .appendTo(s.$slideTrack)
              .addClass("slick-cloned");
        s.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function () {
            i(this).attr("id", "");
          });
      }
    }),
    (e.prototype.setPaused = function (i) {
      var e = this;
      e.options.autoplay === !0 &&
        e.options.pauseOnHover === !0 &&
        ((e.paused = i), e.autoPlayClear());
    }),
    (e.prototype.selectHandler = function (e) {
      var t = this,
        o = i(e.target).is(".slick-slide")
          ? i(e.target)
          : i(e.target).parents(".slick-slide"),
        s = parseInt(o.attr("data-slick-index"));
      return (
        s || (s = 0),
        t.slideCount <= t.options.slidesToShow
          ? (t.$slider
              .find(".slick-slide")
              .removeClass("slick-active")
              .attr("aria-hidden", "true"),
            t.$slides
              .eq(s)
              .addClass("slick-active")
              .attr("aria-hidden", "false"),
            t.options.centerMode === !0 &&
              (t.$slider.find(".slick-slide").removeClass("slick-center"),
              t.$slides.eq(s).addClass("slick-center")),
            void t.asNavFor(s))
          : void t.slideHandler(s)
      );
    }),
    (e.prototype.slideHandler = function (i, e, t) {
      var o,
        s,
        n,
        l,
        r = null,
        d = this;
      return (
        (e = e || !1),
        (d.animating === !0 && d.options.waitForAnimate === !0) ||
        (d.options.fade === !0 && d.currentSlide === i) ||
        d.slideCount <= d.options.slidesToShow
          ? void 0
          : (e === !1 && d.asNavFor(i),
            (o = i),
            (r = d.getLeft(o)),
            (l = d.getLeft(d.currentSlide)),
            (d.currentLeft = null === d.swipeLeft ? l : d.swipeLeft),
            d.options.infinite === !1 &&
            d.options.centerMode === !1 &&
            (0 > i || i > d.getDotCount() * d.options.slidesToScroll)
              ? void (
                  d.options.fade === !1 &&
                  ((o = d.currentSlide),
                  t !== !0
                    ? d.animateSlide(l, function () {
                        d.postSlide(o);
                      })
                    : d.postSlide(o))
                )
              : d.options.infinite === !1 &&
                d.options.centerMode === !0 &&
                (0 > i || i > d.slideCount - d.options.slidesToScroll)
              ? void (
                  d.options.fade === !1 &&
                  ((o = d.currentSlide),
                  t !== !0
                    ? d.animateSlide(l, function () {
                        d.postSlide(o);
                      })
                    : d.postSlide(o))
                )
              : (d.options.autoplay === !0 && clearInterval(d.autoPlayTimer),
                (s =
                  0 > o
                    ? d.slideCount % d.options.slidesToScroll !== 0
                      ? d.slideCount - (d.slideCount % d.options.slidesToScroll)
                      : d.slideCount + o
                    : o >= d.slideCount
                    ? d.slideCount % d.options.slidesToScroll !== 0
                      ? 0
                      : o - d.slideCount
                    : o),
                (d.animating = !0),
                d.$slider.trigger("beforeChange", [d, d.currentSlide, s]),
                (n = d.currentSlide),
                (d.currentSlide = s),
                d.setSlideClasses(d.currentSlide),
                d.updateDots(),
                d.updateArrows(),
                d.options.fade === !0
                  ? (t !== !0
                      ? d.fadeSlide(s, function () {
                          d.postSlide(s);
                        })
                      : d.postSlide(s),
                    void d.animateHeight())
                  : void (t !== !0
                      ? d.animateSlide(r, function () {
                          d.postSlide(s);
                        })
                      : d.postSlide(s))))
      );
    }),
    (e.prototype.startLoad = function () {
      var i = this;
      i.options.arrows === !0 &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.hide(), i.$nextArrow.hide()),
        i.options.dots === !0 &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.hide(),
        i.$slider.addClass("slick-loading");
    }),
    (e.prototype.swipeDirection = function () {
      var i,
        e,
        t,
        o,
        s = this;
      return (
        (i = s.touchObject.startX - s.touchObject.curX),
        (e = s.touchObject.startY - s.touchObject.curY),
        (t = Math.atan2(e, i)),
        (o = Math.round((180 * t) / Math.PI)),
        0 > o && (o = 360 - Math.abs(o)),
        45 >= o && o >= 0
          ? s.options.rtl === !1
            ? "left"
            : "right"
          : 360 >= o && o >= 315
          ? s.options.rtl === !1
            ? "left"
            : "right"
          : o >= 135 && 225 >= o
          ? s.options.rtl === !1
            ? "right"
            : "left"
          : s.options.verticalSwiping === !0
          ? o >= 35 && 135 >= o
            ? "left"
            : "right"
          : "vertical"
      );
    }),
    (e.prototype.swipeEnd = function () {
      var i,
        e = this;
      if (
        ((e.dragging = !1),
        (e.shouldClick = e.touchObject.swipeLength > 10 ? !1 : !0),
        void 0 === e.touchObject.curX)
      )
        return !1;
      if (
        (e.touchObject.edgeHit === !0 &&
          e.$slider.trigger("edge", [e, e.swipeDirection()]),
        e.touchObject.swipeLength >= e.touchObject.minSwipe)
      )
        switch (e.swipeDirection()) {
          case "left":
            (i = e.options.swipeToSlide
              ? e.checkNavigable(e.currentSlide + e.getSlideCount())
              : e.currentSlide + e.getSlideCount()),
              e.slideHandler(i),
              (e.currentDirection = 0),
              (e.touchObject = {}),
              e.$slider.trigger("swipe", [e, "left"]);
            break;
          case "right":
            (i = e.options.swipeToSlide
              ? e.checkNavigable(e.currentSlide - e.getSlideCount())
              : e.currentSlide - e.getSlideCount()),
              e.slideHandler(i),
              (e.currentDirection = 1),
              (e.touchObject = {}),
              e.$slider.trigger("swipe", [e, "right"]);
        }
      else
        e.touchObject.startX !== e.touchObject.curX &&
          (e.slideHandler(e.currentSlide), (e.touchObject = {}));
    }),
    (e.prototype.swipeHandler = function (i) {
      var e = this;
      if (
        !(
          e.options.swipe === !1 ||
          ("ontouchend" in document && e.options.swipe === !1) ||
          (e.options.draggable === !1 && -1 !== i.type.indexOf("mouse"))
        )
      )
        switch (
          ((e.touchObject.fingerCount =
            i.originalEvent && void 0 !== i.originalEvent.touches
              ? i.originalEvent.touches.length
              : 1),
          (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
          e.options.verticalSwiping === !0 &&
            (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
          i.data.action)
        ) {
          case "start":
            e.swipeStart(i);
            break;
          case "move":
            e.swipeMove(i);
            break;
          case "end":
            e.swipeEnd(i);
        }
    }),
    (e.prototype.swipeMove = function (i) {
      var e,
        t,
        o,
        s,
        n,
        l = this;
      return (
        (n = void 0 !== i.originalEvent ? i.originalEvent.touches : null),
        !l.dragging || (n && 1 !== n.length)
          ? !1
          : ((e = l.getLeft(l.currentSlide)),
            (l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX),
            (l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY),
            (l.touchObject.swipeLength = Math.round(
              Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))
            )),
            l.options.verticalSwiping === !0 &&
              (l.touchObject.swipeLength = Math.round(
                Math.sqrt(
                  Math.pow(l.touchObject.curY - l.touchObject.startY, 2)
                )
              )),
            (t = l.swipeDirection()),
            "vertical" !== t
              ? (void 0 !== i.originalEvent &&
                  l.touchObject.swipeLength > 4 &&
                  i.preventDefault(),
                (s =
                  (l.options.rtl === !1 ? 1 : -1) *
                  (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
                l.options.verticalSwiping === !0 &&
                  (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
                (o = l.touchObject.swipeLength),
                (l.touchObject.edgeHit = !1),
                l.options.infinite === !1 &&
                  ((0 === l.currentSlide && "right" === t) ||
                    (l.currentSlide >= l.getDotCount() && "left" === t)) &&
                  ((o = l.touchObject.swipeLength * l.options.edgeFriction),
                  (l.touchObject.edgeHit = !0)),
                (l.swipeLeft =
                  l.options.vertical === !1
                    ? e + o * s
                    : e + o * (l.$list.height() / l.listWidth) * s),
                l.options.verticalSwiping === !0 && (l.swipeLeft = e + o * s),
                l.options.fade === !0 || l.options.touchMove === !1
                  ? !1
                  : l.animating === !0
                  ? ((l.swipeLeft = null), !1)
                  : void l.setCSS(l.swipeLeft))
              : void 0)
      );
    }),
    (e.prototype.swipeStart = function (i) {
      var e,
        t = this;
      return 1 !== t.touchObject.fingerCount ||
        t.slideCount <= t.options.slidesToShow
        ? ((t.touchObject = {}), !1)
        : (void 0 !== i.originalEvent &&
            void 0 !== i.originalEvent.touches &&
            (e = i.originalEvent.touches[0]),
          (t.touchObject.startX = t.touchObject.curX =
            void 0 !== e ? e.pageX : i.clientX),
          (t.touchObject.startY = t.touchObject.curY =
            void 0 !== e ? e.pageY : i.clientY),
          void (t.dragging = !0));
    }),
    (e.prototype.unfilterSlides = e.prototype.slickUnfilter =
      function () {
        var i = this;
        null !== i.$slidesCache &&
          (i.unload(),
          i.$slideTrack.children(this.options.slide).detach(),
          i.$slidesCache.appendTo(i.$slideTrack),
          i.reinit());
      }),
    (e.prototype.unload = function () {
      var e = this;
      i(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow &&
          "object" != typeof e.options.prevArrow &&
          e.$prevArrow.remove(),
        e.$nextArrow &&
          "object" != typeof e.options.nextArrow &&
          e.$nextArrow.remove(),
        e.$slides
          .removeClass("slick-slide slick-active slick-visible")
          .attr("aria-hidden", "true")
          .css("width", "");
    }),
    (e.prototype.unslick = function () {
      var i = this;
      i.destroy();
    }),
    (e.prototype.updateArrows = function () {
      var i,
        e = this;
      (i = Math.floor(e.options.slidesToShow / 2)),
        e.options.arrows === !0 &&
          e.options.infinite !== !0 &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow.removeClass("slick-disabled"),
          e.$nextArrow.removeClass("slick-disabled"),
          0 === e.currentSlide
            ? (e.$prevArrow.addClass("slick-disabled"),
              e.$nextArrow.removeClass("slick-disabled"))
            : e.currentSlide >= e.slideCount - e.options.slidesToShow &&
              e.options.centerMode === !1
            ? (e.$nextArrow.addClass("slick-disabled"),
              e.$prevArrow.removeClass("slick-disabled"))
            : e.currentSlide >= e.slideCount - 1 &&
              e.options.centerMode === !0 &&
              (e.$nextArrow.addClass("slick-disabled"),
              e.$prevArrow.removeClass("slick-disabled")));
    }),
    (e.prototype.updateDots = function () {
      var i = this;
      null !== i.$dots &&
        (i.$dots
          .find("li")
          .removeClass("slick-active")
          .attr("aria-hidden", "true"),
        i.$dots
          .find("li")
          .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
          .addClass("slick-active")
          .attr("aria-hidden", "false"));
    }),
    (e.prototype.visibility = function () {
      var i = this;
      document[i.hidden]
        ? ((i.paused = !0), i.autoPlayClear())
        : ((i.paused = !1), i.autoPlay());
    }),
    (i.fn.slick = function () {
      var i,
        t = this,
        o = arguments[0],
        s = Array.prototype.slice.call(arguments, 1),
        n = t.length,
        l = 0;
      for (l; n > l; l++)
        if (
          ("object" == typeof o || "undefined" == typeof o
            ? (t[l].slick = new e(t[l], o))
            : (i = t[l].slick[o].apply(t[l].slick, s)),
          "undefined" != typeof i)
        )
          return i;
      return t;
    });
});

/*
    jQuery News Ticker is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, version 2 of the License.

    jQuery News Ticker is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with jQuery News Ticker.  If not, see <http://www.gnu.org/licenses/>.
*/
!(function (e) {
  (e.fn.ticker = function (t) {
    var o = e.extend({}, e.fn.ticker.defaults, t);
    if (0 == e(this).length) return false, !1;
    var n = "#" + e(this).attr("id"),
      d = e(this).get(0).tagName;
    return this.each(function () {
      function t(e) {
        var t,
          o = 0;
        for (t in e) e.hasOwnProperty(t) && o++;
        return o;
      }
      function i() {
        var e = new Date();
        return e.getTime();
      }
      function s(e) {
        o.debugMode &&
          (window.console && window.console.log
            ? window.console.log(e)
            : alert(e));
      }
      function a() {
        l(),
          e(n).wrap(
            '<div id="' + I.dom.wrapperID.replace("#", "") + '"></div>'
          ),
          e(I.dom.wrapperID).children().remove(),
          e(I.dom.wrapperID).append(
            '<div id="' +
              I.dom.tickerID.replace("#", "") +
              '" class="ticker"><div id="' +
              I.dom.titleID.replace("#", "") +
              '" class="ticker-title"><span><!-- --></span></div><p id="' +
              I.dom.contentID.replace("#", "") +
              '" class="ticker-content"></p><div id="' +
              I.dom.revealID.replace("#", "") +
              '" class="ticker-swipe"><span><!-- --></span></div></div>'
          ),
          e(I.dom.wrapperID)
            .removeClass("no-js")
            .addClass("ticker-wrapper has-js " + o.direction),
          e(I.dom.tickerElem + "," + I.dom.contentID).hide(),
          o.controls &&
            (e(I.dom.controlsID).live(
              "click mouseover mousedown mouseout mouseup",
              function (t) {
                var o = t.target.id;
                if ("click" == t.type)
                  switch (o) {
                    case I.dom.prevID.replace("#", ""):
                      (I.paused = !0),
                        e(I.dom.playPauseID).addClass("paused"),
                        f("prev");
                      break;
                    case I.dom.nextID.replace("#", ""):
                      (I.paused = !0),
                        e(I.dom.playPauseID).addClass("paused"),
                        f("next");
                      break;
                    case I.dom.playPauseID.replace("#", ""):
                      1 == I.play
                        ? ((I.paused = !0),
                          e(I.dom.playPauseID).addClass("paused"),
                          p())
                        : ((I.paused = !1),
                          e(I.dom.playPauseID).removeClass("paused"),
                          u());
                  }
                else
                  "mouseover" == t.type && e("#" + o).hasClass("controls")
                    ? e("#" + o).addClass("over")
                    : "mousedown" == t.type && e("#" + o).hasClass("controls")
                    ? e("#" + o).addClass("down")
                    : "mouseup" == t.type && e("#" + o).hasClass("controls")
                    ? e("#" + o).removeClass("down")
                    : "mouseout" == t.type &&
                      e("#" + o).hasClass("controls") &&
                      e("#" + o).removeClass("over");
              }
            ),
            e(I.dom.wrapperID).append(
              '<ul id="' +
                I.dom.controlsID.replace("#", "") +
                '" class="ticker-controls"><li id="' +
                I.dom.playPauseID.replace("#", "") +
                '" class="jnt-play-pause controls"><a href=""><!-- --></a></li><li id="' +
                I.dom.prevID.replace("#", "") +
                '" class="jnt-prev controls"><a href=""><!-- --></a></li><li id="' +
                I.dom.nextID.replace("#", "") +
                '" class="jnt-next controls"><a href=""><!-- --></a></li></ul>'
            )),
          "fade" != o.displayType &&
            e(I.dom.contentID)
              .mouseover(function () {
                0 == I.paused && p();
              })
              .mouseout(function () {
                0 == I.paused && u();
              }),
          o.ajaxFeed || r();
      }
      function l() {
        if (0 == I.contentLoaded)
          if (o.ajaxFeed)
            "xml" == o.feedType
              ? e.ajax({
                  url: o.feedUrl,
                  cache: !1,
                  dataType: o.feedType,
                  async: !0,
                  success: function (e) {
                    count = 0;
                    for (var n = 0; n < e.childNodes.length; n++)
                      "rss" == e.childNodes[n].nodeName &&
                        (xmlContent = e.childNodes[n]);
                    for (var d = 0; d < xmlContent.childNodes.length; d++)
                      "channel" == xmlContent.childNodes[d].nodeName &&
                        (xmlChannel = xmlContent.childNodes[d]);
                    for (var i = 0; i < xmlChannel.childNodes.length; i++)
                      if ("item" == xmlChannel.childNodes[i].nodeName) {
                        xmlItems = xmlChannel.childNodes[i];
                        for (
                          var a, l = !1, c = 0;
                          c < xmlItems.childNodes.length;
                          c++
                        )
                          "title" == xmlItems.childNodes[c].nodeName
                            ? (a = xmlItems.childNodes[c].lastChild.nodeValue)
                            : "link" == xmlItems.childNodes[c].nodeName &&
                              (l = xmlItems.childNodes[c].lastChild.nodeValue),
                            a !== !1 &&
                              "" != a &&
                              l !== !1 &&
                              ((I.newsArr["item-" + count] = {
                                type: o.titleText,
                                content: '<a href="' + l + '">' + a + "</a>",
                              }),
                              count++,
                              (a = !1),
                              (l = !1));
                      }
                    return t(I.newsArr < 1)
                      ? (s(
                          "Couldn't find any content from the XML feed for the ticker to use!"
                        ),
                        !1)
                      : ((I.contentLoaded = !0), void r());
                  },
                })
              : s("Code Me!");
          else {
            if (!o.htmlFeed)
              return (
                s(
                  "The ticker is set to not use any types of content! Check the settings for the ticker."
                ),
                !1
              );
            if (!(e(n + " LI").length > 0))
              return (
                s("Couldn't find HTML any content for the ticker to use!"), !1
              );
            e(n + " LI").each(function (t) {
              I.newsArr["item-" + t] = {
                type: o.titleText,
                content: e(this).html(),
              };
            });
          }
      }
      function r() {
        (I.contentLoaded = !0),
          e(I.dom.titleElem).html(I.newsArr["item-" + I.position].type),
          e(I.dom.contentID).html(I.newsArr["item-" + I.position].content),
          I.position == t(I.newsArr) - 1 ? (I.position = 0) : I.position++,
          (distance = e(I.dom.contentID).width()),
          (time = distance / o.speed),
          c();
      }
      function c() {
        if ((e(I.dom.contentID).css("opacity", "1"), !I.play)) return !1;
        var t = e(I.dom.titleID).width() + 20;
        e(I.dom.revealID).css(o.direction, t + "px"),
          "fade" == o.displayType
            ? e(I.dom.revealID).hide(0, function () {
                e(I.dom.contentID)
                  .css(o.direction, t + "px")
                  .fadeIn(o.fadeInSpeed, m);
              })
            : "scroll" == o.displayType ||
              e(I.dom.revealElem).show(0, function () {
                e(I.dom.contentID)
                  .css(o.direction, t + "px")
                  .show(),
                  (animationAction =
                    "right" == o.direction
                      ? { marginRight: distance + "px" }
                      : { marginLeft: distance + "px" }),
                  e(I.dom.revealID)
                    .css("margin-" + o.direction, "0px")
                    .delay(20)
                    .animate(animationAction, time, "linear", m);
              });
      }
      function m() {
        I.play
          ? (e(I.dom.contentID).delay(o.pauseOnItems).fadeOut(o.fadeOutSpeed),
            "fade" == o.displayType
              ? e(I.dom.contentID).fadeOut(o.fadeOutSpeed, function () {
                  e(I.dom.wrapperID)
                    .find(I.dom.revealElem + "," + I.dom.contentID)
                    .hide()
                    .end()
                    .find(I.dom.tickerID + "," + I.dom.revealID)
                    .show()
                    .end()
                    .find(I.dom.tickerID + "," + I.dom.revealID)
                    .removeAttr("style"),
                    r();
                })
              : e(I.dom.revealID).hide(0, function () {
                  e(I.dom.contentID).fadeOut(o.fadeOutSpeed, function () {
                    e(I.dom.wrapperID)
                      .find(I.dom.revealElem + "," + I.dom.contentID)
                      .hide()
                      .end()
                      .find(I.dom.tickerID + "," + I.dom.revealID)
                      .show()
                      .end()
                      .find(I.dom.tickerID + "," + I.dom.revealID)
                      .removeAttr("style"),
                      r();
                  });
                }))
          : e(I.dom.revealElem).hide();
      }
      function p() {
        (I.play = !1),
          e(
            I.dom.tickerID +
              "," +
              I.dom.revealID +
              "," +
              I.dom.titleID +
              "," +
              I.dom.titleElem +
              "," +
              I.dom.revealElem +
              "," +
              I.dom.contentID
          ).stop(!0, !0),
          e(I.dom.revealID + "," + I.dom.revealElem).hide(),
          e(I.dom.wrapperID)
            .find(I.dom.titleID + "," + I.dom.titleElem)
            .show()
            .end()
            .find(I.dom.contentID)
            .show();
      }
      function u() {
        (I.play = !0), (I.paused = !1), m();
      }
      function f(o) {
        switch ((p(), o)) {
          case "prev":
            (I.position =
              0 == I.position
                ? t(I.newsArr) - 2
                : 1 == I.position
                ? t(I.newsArr) - 1
                : I.position - 2),
              e(I.dom.titleElem).html(I.newsArr["item-" + I.position].type),
              e(I.dom.contentID).html(I.newsArr["item-" + I.position].content);
            break;
          case "next":
            e(I.dom.titleElem).html(I.newsArr["item-" + I.position].type),
              e(I.dom.contentID).html(I.newsArr["item-" + I.position].content);
        }
        I.position == t(I.newsArr) - 1 ? (I.position = 0) : I.position++;
      }
      var h = i(),
        I = {
          position: 0,
          time: 0,
          distance: 0,
          newsArr: {},
          play: !0,
          paused: !1,
          contentLoaded: !1,
          dom: {
            contentID: "#ticker-content-" + h,
            titleID: "#ticker-title-" + h,
            titleElem: "#ticker-title-" + h + " SPAN",
            tickerID: "#ticker-" + h,
            wrapperID: "#ticker-wrapper-" + h,
            revealID: "#ticker-swipe-" + h,
            revealElem: "#ticker-swipe-" + h + " SPAN",
            controlsID: "#ticker-controls-" + h,
            prevID: "#prev-" + h,
            nextID: "#next-" + h,
            playPauseID: "#play-pause-" + h,
          },
        };
      return "UL" != d && "OL" != d && o.htmlFeed === !0
        ? (s(
            "Cannot use <" +
              d.toLowerCase() +
              "> type of element for this plugin - must of type <ul> or <ol>"
          ),
          !1)
        : ((o.direction = "rtl" == o.direction ? "right" : "left"), void a());
    });
  }),
    (e.fn.ticker.defaults = {
      speed: 0.1,
      ajaxFeed: !1,
      feedUrl: "",
      feedType: "xml",
      displayType: "reveal",
      htmlFeed: !0,
      debugMode: !0,
      controls: !0,
      titleText: "Latest",
      direction: "ltr",
      pauseOnItems: 3e3,
      fadeInSpeed: 600,
      fadeOutSpeed: 300,
    });
})(jQuery);

/* == jquery mousewheel plugin == Version: 3.1.12, License: MIT License (MIT) */
!(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : "object" == typeof exports
    ? (module.exports = a)
    : a(jQuery);
})(function (a) {
  function b(b) {
    var g = b || window.event,
      h = i.call(arguments, 1),
      j = 0,
      l = 0,
      m = 0,
      n = 0,
      o = 0,
      p = 0;
    if (
      ((b = a.event.fix(g)),
      (b.type = "mousewheel"),
      "detail" in g && (m = -1 * g.detail),
      "wheelDelta" in g && (m = g.wheelDelta),
      "wheelDeltaY" in g && (m = g.wheelDeltaY),
      "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX),
      "axis" in g && g.axis === g.HORIZONTAL_AXIS && ((l = -1 * m), (m = 0)),
      (j = 0 === m ? l : m),
      "deltaY" in g && ((m = -1 * g.deltaY), (j = m)),
      "deltaX" in g && ((l = g.deltaX), 0 === m && (j = -1 * l)),
      0 !== m || 0 !== l)
    ) {
      if (1 === g.deltaMode) {
        var q = a.data(this, "mousewheel-line-height");
        (j *= q), (m *= q), (l *= q);
      } else if (2 === g.deltaMode) {
        var r = a.data(this, "mousewheel-page-height");
        (j *= r), (m *= r), (l *= r);
      }
      if (
        ((n = Math.max(Math.abs(m), Math.abs(l))),
        (!f || f > n) && ((f = n), d(g, n) && (f /= 40)),
        d(g, n) && ((j /= 40), (l /= 40), (m /= 40)),
        (j = Math[j >= 1 ? "floor" : "ceil"](j / f)),
        (l = Math[l >= 1 ? "floor" : "ceil"](l / f)),
        (m = Math[m >= 1 ? "floor" : "ceil"](m / f)),
        k.settings.normalizeOffset && this.getBoundingClientRect)
      ) {
        var s = this.getBoundingClientRect();
        (o = b.clientX - s.left), (p = b.clientY - s.top);
      }
      return (
        (b.deltaX = l),
        (b.deltaY = m),
        (b.deltaFactor = f),
        (b.offsetX = o),
        (b.offsetY = p),
        (b.deltaMode = 0),
        h.unshift(b, j, l, m),
        e && clearTimeout(e),
        (e = setTimeout(c, 200)),
        (a.event.dispatch || a.event.handle).apply(this, h)
      );
    }
  }
  function c() {
    f = null;
  }
  function d(a, b) {
    return (
      k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    );
  }
  var e,
    f,
    g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
    h =
      "onwheel" in document || document.documentMode >= 9
        ? ["wheel"]
        : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
    i = Array.prototype.slice;
  if (a.event.fixHooks)
    for (var j = g.length; j; ) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
  var k = (a.event.special.mousewheel = {
    version: "3.1.12",
    setup: function () {
      if (this.addEventListener)
        for (var c = h.length; c; ) this.addEventListener(h[--c], b, !1);
      else this.onmousewheel = b;
      a.data(this, "mousewheel-line-height", k.getLineHeight(this)),
        a.data(this, "mousewheel-page-height", k.getPageHeight(this));
    },
    teardown: function () {
      if (this.removeEventListener)
        for (var c = h.length; c; ) this.removeEventListener(h[--c], b, !1);
      else this.onmousewheel = null;
      a.removeData(this, "mousewheel-line-height"),
        a.removeData(this, "mousewheel-page-height");
    },
    getLineHeight: function (b) {
      var c = a(b),
        d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
      return (
        d.length || (d = a("body")),
        parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
      );
    },
    getPageHeight: function (b) {
      return a(b).height();
    },
    settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
  });
  a.fn.extend({
    mousewheel: function (a) {
      return a ? this.bind("mousewheel", a) : this.trigger("mousewheel");
    },
    unmousewheel: function (a) {
      return this.unbind("mousewheel", a);
    },
  });
});
/* == malihu jquery custom scrollbar plugin == Version: 3.0.8, License: MIT License (MIT) */
!(function (e) {
  "undefined" != typeof module && module.exports
    ? (module.exports = e)
    : e(jQuery, window, document);
})(function (e) {
  !(function (t) {
    var o = "function" == typeof define && define.amd,
      a = "undefined" != typeof module && module.exports,
      n = "https:" == document.location.protocol ? "https:" : "http:",
      i =
        "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js";
    o ||
      (a
        ? require("jquery-mousewheel")(e)
        : e.event.special.mousewheel ||
          e("head").append(
            decodeURI("%3Cscript src=" + n + "//" + i + "%3E%3C/script%3E")
          )),
      t();
  })(function () {
    var t,
      o = "mCustomScrollbar",
      a = "mCS",
      n = ".mCustomScrollbar",
      i = {
        setTop: 0,
        setLeft: 0,
        axis: "y",
        scrollbarPosition: "inside",
        scrollInertia: 950,
        autoDraggerLength: !0,
        alwaysShowScrollbar: 0,
        snapOffset: 0,
        mouseWheel: {
          enable: !0,
          scrollAmount: "auto",
          axis: "y",
          deltaFactor: "auto",
          disableOver: ["select", "option", "keygen", "datalist", "textarea"],
        },
        scrollButtons: { scrollType: "stepless", scrollAmount: "auto" },
        keyboard: { enable: !0, scrollType: "stepless", scrollAmount: "auto" },
        contentTouchScroll: 25,
        advanced: {
          autoScrollOnFocus:
            "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
          updateOnContentResize: !0,
          updateOnImageLoad: !0,
        },
        theme: "light",
        callbacks: {
          onTotalScrollOffset: 0,
          onTotalScrollBackOffset: 0,
          alwaysTriggerOffsets: !0,
        },
      },
      r = 0,
      l = {},
      s = window.attachEvent && !window.addEventListener ? 1 : 0,
      c = !1,
      d = [
        "mCSB_dragger_onDrag",
        "mCSB_scrollTools_onDrag",
        "mCS_img_loaded",
        "mCS_disabled",
        "mCS_destroyed",
        "mCS_no_scrollbar",
        "mCS-autoHide",
        "mCS-dir-rtl",
        "mCS_no_scrollbar_y",
        "mCS_no_scrollbar_x",
        "mCS_y_hidden",
        "mCS_x_hidden",
        "mCSB_draggerContainer",
        "mCSB_buttonUp",
        "mCSB_buttonDown",
        "mCSB_buttonLeft",
        "mCSB_buttonRight",
      ],
      u = {
        init: function (t) {
          var t = e.extend(!0, {}, i, t),
            o = f.call(this);
          if (t.live) {
            var s = t.liveSelector || this.selector || n,
              c = e(s);
            if ("off" === t.live) return void m(s);
            l[s] = setTimeout(function () {
              c.mCustomScrollbar(t), "once" === t.live && c.length && m(s);
            }, 500);
          } else m(s);
          return (
            (t.setWidth = t.set_width ? t.set_width : t.setWidth),
            (t.setHeight = t.set_height ? t.set_height : t.setHeight),
            (t.axis = t.horizontalScroll ? "x" : p(t.axis)),
            (t.scrollInertia =
              t.scrollInertia > 0 && t.scrollInertia < 17
                ? 17
                : t.scrollInertia),
            "object" != typeof t.mouseWheel &&
              1 == t.mouseWheel &&
              (t.mouseWheel = {
                enable: !0,
                scrollAmount: "auto",
                axis: "y",
                preventDefault: !1,
                deltaFactor: "auto",
                normalizeDelta: !1,
                invert: !1,
              }),
            (t.mouseWheel.scrollAmount = t.mouseWheelPixels
              ? t.mouseWheelPixels
              : t.mouseWheel.scrollAmount),
            (t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta
              ? t.advanced.normalizeMouseWheelDelta
              : t.mouseWheel.normalizeDelta),
            (t.scrollButtons.scrollType = g(t.scrollButtons.scrollType)),
            h(t),
            e(o).each(function () {
              var o = e(this);
              if (!o.data(a)) {
                o.data(a, {
                  idx: ++r,
                  opt: t,
                  scrollRatio: { y: null, x: null },
                  overflowed: null,
                  contentReset: { y: null, x: null },
                  bindEvents: !1,
                  tweenRunning: !1,
                  sequential: {},
                  langDir: o.css("direction"),
                  cbOffsets: null,
                  trigger: null,
                });
                var n = o.data(a),
                  i = n.opt,
                  l = o.data("mcs-axis"),
                  s = o.data("mcs-scrollbar-position"),
                  c = o.data("mcs-theme");
                l && (i.axis = l),
                  s && (i.scrollbarPosition = s),
                  c && ((i.theme = c), h(i)),
                  v.call(this),
                  e(
                    "#mCSB_" + n.idx + "_container img:not(." + d[2] + ")"
                  ).addClass(d[2]),
                  u.update.call(null, o);
              }
            })
          );
        },
        update: function (t, o) {
          var n = t || f.call(this);
          return e(n).each(function () {
            var t = e(this);
            if (t.data(a)) {
              var n = t.data(a),
                i = n.opt,
                r = e("#mCSB_" + n.idx + "_container"),
                l = [
                  e("#mCSB_" + n.idx + "_dragger_vertical"),
                  e("#mCSB_" + n.idx + "_dragger_horizontal"),
                ];
              if (!r.length) return;
              n.tweenRunning && V(t),
                t.hasClass(d[3]) && t.removeClass(d[3]),
                t.hasClass(d[4]) && t.removeClass(d[4]),
                S.call(this),
                _.call(this),
                "y" === i.axis ||
                  i.advanced.autoExpandHorizontalScroll ||
                  r.css("width", x(r.children())),
                (n.overflowed = B.call(this)),
                O.call(this),
                i.autoDraggerLength && b.call(this),
                C.call(this),
                k.call(this);
              var s = [Math.abs(r[0].offsetTop), Math.abs(r[0].offsetLeft)];
              "x" !== i.axis &&
                (n.overflowed[0]
                  ? l[0].height() > l[0].parent().height()
                    ? T.call(this)
                    : (Q(t, s[0].toString(), {
                        dir: "y",
                        dur: 0,
                        overwrite: "none",
                      }),
                      (n.contentReset.y = null))
                  : (T.call(this),
                    "y" === i.axis
                      ? M.call(this)
                      : "yx" === i.axis &&
                        n.overflowed[1] &&
                        Q(t, s[1].toString(), {
                          dir: "x",
                          dur: 0,
                          overwrite: "none",
                        }))),
                "y" !== i.axis &&
                  (n.overflowed[1]
                    ? l[1].width() > l[1].parent().width()
                      ? T.call(this)
                      : (Q(t, s[1].toString(), {
                          dir: "x",
                          dur: 0,
                          overwrite: "none",
                        }),
                        (n.contentReset.x = null))
                    : (T.call(this),
                      "x" === i.axis
                        ? M.call(this)
                        : "yx" === i.axis &&
                          n.overflowed[0] &&
                          Q(t, s[0].toString(), {
                            dir: "y",
                            dur: 0,
                            overwrite: "none",
                          }))),
                o &&
                  n &&
                  (2 === o &&
                  i.callbacks.onImageLoad &&
                  "function" == typeof i.callbacks.onImageLoad
                    ? i.callbacks.onImageLoad.call(this)
                    : 3 === o &&
                      i.callbacks.onSelectorChange &&
                      "function" == typeof i.callbacks.onSelectorChange
                    ? i.callbacks.onSelectorChange.call(this)
                    : i.callbacks.onUpdate &&
                      "function" == typeof i.callbacks.onUpdate &&
                      i.callbacks.onUpdate.call(this)),
                X.call(this);
            }
          });
        },
        scrollTo: function (t, o) {
          if ("undefined" != typeof t && null != t) {
            var n = f.call(this);
            return e(n).each(function () {
              var n = e(this);
              if (n.data(a)) {
                var i = n.data(a),
                  r = i.opt,
                  l = {
                    trigger: "external",
                    scrollInertia: r.scrollInertia,
                    scrollEasing: "mcsEaseInOut",
                    moveDragger: !1,
                    timeout: 60,
                    callbacks: !0,
                    onStart: !0,
                    onUpdate: !0,
                    onComplete: !0,
                  },
                  s = e.extend(!0, {}, l, o),
                  c = Y.call(this, t),
                  d =
                    s.scrollInertia > 0 && s.scrollInertia < 17
                      ? 17
                      : s.scrollInertia;
                (c[0] = j.call(this, c[0], "y")),
                  (c[1] = j.call(this, c[1], "x")),
                  s.moveDragger &&
                    ((c[0] *= i.scrollRatio.y), (c[1] *= i.scrollRatio.x)),
                  (s.dur = d),
                  setTimeout(function () {
                    null !== c[0] &&
                      "undefined" != typeof c[0] &&
                      "x" !== r.axis &&
                      i.overflowed[0] &&
                      ((s.dir = "y"),
                      (s.overwrite = "all"),
                      Q(n, c[0].toString(), s)),
                      null !== c[1] &&
                        "undefined" != typeof c[1] &&
                        "y" !== r.axis &&
                        i.overflowed[1] &&
                        ((s.dir = "x"),
                        (s.overwrite = "none"),
                        Q(n, c[1].toString(), s));
                  }, s.timeout);
              }
            });
          }
        },
        stop: function () {
          var t = f.call(this);
          return e(t).each(function () {
            var t = e(this);
            t.data(a) && V(t);
          });
        },
        disable: function (t) {
          var o = f.call(this);
          return e(o).each(function () {
            var o = e(this);
            if (o.data(a)) {
              {
                o.data(a);
              }
              X.call(this, "remove"),
                M.call(this),
                t && T.call(this),
                O.call(this, !0),
                o.addClass(d[3]);
            }
          });
        },
        destroy: function () {
          var t = f.call(this);
          return e(t).each(function () {
            var n = e(this);
            if (n.data(a)) {
              var i = n.data(a),
                r = i.opt,
                l = e("#mCSB_" + i.idx),
                s = e("#mCSB_" + i.idx + "_container"),
                c = e(".mCSB_" + i.idx + "_scrollbar");
              r.live && m(r.liveSelector || e(t).selector),
                X.call(this, "remove"),
                M.call(this),
                T.call(this),
                n.removeData(a),
                Z(this, "mcs"),
                c.remove(),
                s.find("img." + d[2]).removeClass(d[2]),
                l.replaceWith(s.contents()),
                n
                  .removeClass(
                    o +
                      " _" +
                      a +
                      "_" +
                      i.idx +
                      " " +
                      d[6] +
                      " " +
                      d[7] +
                      " " +
                      d[5] +
                      " " +
                      d[3]
                  )
                  .addClass(d[4]);
            }
          });
        },
      },
      f = function () {
        return "object" != typeof e(this) || e(this).length < 1 ? n : this;
      },
      h = function (t) {
        var o = [
            "rounded",
            "rounded-dark",
            "rounded-dots",
            "rounded-dots-dark",
          ],
          a = [
            "rounded-dots",
            "rounded-dots-dark",
            "3d",
            "3d-dark",
            "3d-thick",
            "3d-thick-dark",
            "inset",
            "inset-dark",
            "inset-2",
            "inset-2-dark",
            "inset-3",
            "inset-3-dark",
          ],
          n = ["minimal", "minimal-dark"],
          i = ["minimal", "minimal-dark"],
          r = ["minimal", "minimal-dark"];
        (t.autoDraggerLength =
          e.inArray(t.theme, o) > -1 ? !1 : t.autoDraggerLength),
          (t.autoExpandScrollbar =
            e.inArray(t.theme, a) > -1 ? !1 : t.autoExpandScrollbar),
          (t.scrollButtons.enable =
            e.inArray(t.theme, n) > -1 ? !1 : t.scrollButtons.enable),
          (t.autoHideScrollbar =
            e.inArray(t.theme, i) > -1 ? !0 : t.autoHideScrollbar),
          (t.scrollbarPosition =
            e.inArray(t.theme, r) > -1 ? "outside" : t.scrollbarPosition);
      },
      m = function (e) {
        l[e] && (clearTimeout(l[e]), Z(l, e));
      },
      p = function (e) {
        return "yx" === e || "xy" === e || "auto" === e
          ? "yx"
          : "x" === e || "horizontal" === e
          ? "x"
          : "y";
      },
      g = function (e) {
        return "stepped" === e ||
          "pixels" === e ||
          "step" === e ||
          "click" === e
          ? "stepped"
          : "stepless";
      },
      v = function () {
        var t = e(this),
          n = t.data(a),
          i = n.opt,
          r = i.autoExpandScrollbar ? " " + d[1] + "_expand" : "",
          l = [
            "<div id='mCSB_" +
              n.idx +
              "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" +
              n.idx +
              "_scrollbar mCS-" +
              i.theme +
              " mCSB_scrollTools_vertical" +
              r +
              "'><div class='" +
              d[12] +
              "'><div id='mCSB_" +
              n.idx +
              "_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>",
            "<div id='mCSB_" +
              n.idx +
              "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" +
              n.idx +
              "_scrollbar mCS-" +
              i.theme +
              " mCSB_scrollTools_horizontal" +
              r +
              "'><div class='" +
              d[12] +
              "'><div id='mCSB_" +
              n.idx +
              "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>",
          ],
          s =
            "yx" === i.axis
              ? "mCSB_vertical_horizontal"
              : "x" === i.axis
              ? "mCSB_horizontal"
              : "mCSB_vertical",
          c = "yx" === i.axis ? l[0] + l[1] : "x" === i.axis ? l[1] : l[0],
          u =
            "yx" === i.axis
              ? "<div id='mCSB_" +
                n.idx +
                "_container_wrapper' class='mCSB_container_wrapper' />"
              : "",
          f = i.autoHideScrollbar ? " " + d[6] : "",
          h = "x" !== i.axis && "rtl" === n.langDir ? " " + d[7] : "";
        i.setWidth && t.css("width", i.setWidth),
          i.setHeight && t.css("height", i.setHeight),
          (i.setLeft =
            "y" !== i.axis && "rtl" === n.langDir ? "989999px" : i.setLeft),
          t
            .addClass(o + " _" + a + "_" + n.idx + f + h)
            .wrapInner(
              "<div id='mCSB_" +
                n.idx +
                "' class='mCustomScrollBox mCS-" +
                i.theme +
                " " +
                s +
                "'><div id='mCSB_" +
                n.idx +
                "_container' class='mCSB_container' style='position:relative; top:" +
                i.setTop +
                "; left:" +
                i.setLeft +
                ";' dir=" +
                n.langDir +
                " /></div>"
            );
        var m = e("#mCSB_" + n.idx),
          p = e("#mCSB_" + n.idx + "_container");
        "y" === i.axis ||
          i.advanced.autoExpandHorizontalScroll ||
          p.css("width", x(p.children())),
          "outside" === i.scrollbarPosition
            ? ("static" === t.css("position") && t.css("position", "relative"),
              t.css("overflow", "visible"),
              m.addClass("mCSB_outside").after(c))
            : (m.addClass("mCSB_inside").append(c), p.wrap(u)),
          w.call(this);
        var g = [
          e("#mCSB_" + n.idx + "_dragger_vertical"),
          e("#mCSB_" + n.idx + "_dragger_horizontal"),
        ];
        g[0].css("min-height", g[0].height()),
          g[1].css("min-width", g[1].width());
      },
      x = function (t) {
        return Math.max.apply(
          Math,
          t
            .map(function () {
              return e(this).outerWidth(!0);
            })
            .get()
        );
      },
      _ = function () {
        var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = e("#mCSB_" + o.idx + "_container");
        n.advanced.autoExpandHorizontalScroll &&
          "y" !== n.axis &&
          i
            .css({ position: "absolute", width: "auto" })
            .wrap(
              "<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />"
            )
            .css({
              width:
                Math.ceil(i[0].getBoundingClientRect().right + 0.4) -
                Math.floor(i[0].getBoundingClientRect().left),
              position: "relative",
            })
            .unwrap();
      },
      w = function () {
        var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = e(".mCSB_" + o.idx + "_scrollbar:first"),
          r = tt(n.scrollButtons.tabindex)
            ? "tabindex='" + n.scrollButtons.tabindex + "'"
            : "",
          l = [
            "<a href='#' class='" +
              d[13] +
              "' oncontextmenu='return false;' " +
              r +
              " />",
            "<a href='#' class='" +
              d[14] +
              "' oncontextmenu='return false;' " +
              r +
              " />",
            "<a href='#' class='" +
              d[15] +
              "' oncontextmenu='return false;' " +
              r +
              " />",
            "<a href='#' class='" +
              d[16] +
              "' oncontextmenu='return false;' " +
              r +
              " />",
          ],
          s = [
            "x" === n.axis ? l[2] : l[0],
            "x" === n.axis ? l[3] : l[1],
            l[2],
            l[3],
          ];
        n.scrollButtons.enable &&
          i
            .prepend(s[0])
            .append(s[1])
            .next(".mCSB_scrollTools")
            .prepend(s[2])
            .append(s[3]);
      },
      S = function () {
        var t = e(this),
          o = t.data(a),
          n = e("#mCSB_" + o.idx),
          i = t.css("max-height") || "none",
          r = -1 !== i.indexOf("%"),
          l = t.css("box-sizing");
        if ("none" !== i) {
          var s = r ? (t.parent().height() * parseInt(i)) / 100 : parseInt(i);
          "border-box" === l &&
            (s -=
              t.innerHeight() -
              t.height() +
              (t.outerHeight() - t.innerHeight())),
            n.css("max-height", Math.round(s));
        }
      },
      b = function () {
        var t = e(this),
          o = t.data(a),
          n = e("#mCSB_" + o.idx),
          i = e("#mCSB_" + o.idx + "_container"),
          r = [
            e("#mCSB_" + o.idx + "_dragger_vertical"),
            e("#mCSB_" + o.idx + "_dragger_horizontal"),
          ],
          l = [n.height() / i.outerHeight(!1), n.width() / i.outerWidth(!1)],
          c = [
            parseInt(r[0].css("min-height")),
            Math.round(l[0] * r[0].parent().height()),
            parseInt(r[1].css("min-width")),
            Math.round(l[1] * r[1].parent().width()),
          ],
          d = s && c[1] < c[0] ? c[0] : c[1],
          u = s && c[3] < c[2] ? c[2] : c[3];
        r[0]
          .css({ height: d, "max-height": r[0].parent().height() - 10 })
          .find(".mCSB_dragger_bar")
          .css({ "line-height": c[0] + "px" }),
          r[1].css({ width: u, "max-width": r[1].parent().width() - 10 });
      },
      C = function () {
        var t = e(this),
          o = t.data(a),
          n = e("#mCSB_" + o.idx),
          i = e("#mCSB_" + o.idx + "_container"),
          r = [
            e("#mCSB_" + o.idx + "_dragger_vertical"),
            e("#mCSB_" + o.idx + "_dragger_horizontal"),
          ],
          l = [i.outerHeight(!1) - n.height(), i.outerWidth(!1) - n.width()],
          s = [
            l[0] / (r[0].parent().height() - r[0].height()),
            l[1] / (r[1].parent().width() - r[1].width()),
          ];
        o.scrollRatio = { y: s[0], x: s[1] };
      },
      y = function (e, t, o) {
        var a = o ? d[0] + "_expanded" : "",
          n = e.closest(".mCSB_scrollTools");
        "active" === t
          ? (e.toggleClass(d[0] + " " + a),
            n.toggleClass(d[1]),
            (e[0]._draggable = e[0]._draggable ? 0 : 1))
          : e[0]._draggable ||
            ("hide" === t
              ? (e.removeClass(d[0]), n.removeClass(d[1]))
              : (e.addClass(d[0]), n.addClass(d[1])));
      },
      B = function () {
        var t = e(this),
          o = t.data(a),
          n = e("#mCSB_" + o.idx),
          i = e("#mCSB_" + o.idx + "_container"),
          r = null == o.overflowed ? i.height() : i.outerHeight(!1),
          l = null == o.overflowed ? i.width() : i.outerWidth(!1);
        return [r > n.height(), l > n.width()];
      },
      T = function () {
        var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = e("#mCSB_" + o.idx),
          r = e("#mCSB_" + o.idx + "_container"),
          l = [
            e("#mCSB_" + o.idx + "_dragger_vertical"),
            e("#mCSB_" + o.idx + "_dragger_horizontal"),
          ];
        if (
          (V(t),
          (("x" !== n.axis && !o.overflowed[0]) ||
            ("y" === n.axis && o.overflowed[0])) &&
            (l[0].add(r).css("top", 0), Q(t, "_resetY")),
          ("y" !== n.axis && !o.overflowed[1]) ||
            ("x" === n.axis && o.overflowed[1]))
        ) {
          var s = (dx = 0);
          "rtl" === o.langDir &&
            ((s = i.width() - r.outerWidth(!1)),
            (dx = Math.abs(s / o.scrollRatio.x))),
            r.css("left", s),
            l[1].css("left", dx),
            Q(t, "_resetX");
        }
      },
      k = function () {
        function t() {
          r = setTimeout(function () {
            e.event.special.mousewheel ? (clearTimeout(r), W.call(o[0])) : t();
          }, 100);
        }
        var o = e(this),
          n = o.data(a),
          i = n.opt;
        if (!n.bindEvents) {
          if (
            (R.call(this),
            i.contentTouchScroll && E.call(this),
            D.call(this),
            i.mouseWheel.enable)
          ) {
            var r;
            t();
          }
          P.call(this),
            H.call(this),
            i.advanced.autoScrollOnFocus && z.call(this),
            i.scrollButtons.enable && U.call(this),
            i.keyboard.enable && q.call(this),
            (n.bindEvents = !0);
        }
      },
      M = function () {
        var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = a + "_" + o.idx,
          r = ".mCSB_" + o.idx + "_scrollbar",
          l = e(
            "#mCSB_" +
              o.idx +
              ",#mCSB_" +
              o.idx +
              "_container,#mCSB_" +
              o.idx +
              "_container_wrapper," +
              r +
              " ." +
              d[12] +
              ",#mCSB_" +
              o.idx +
              "_dragger_vertical,#mCSB_" +
              o.idx +
              "_dragger_horizontal," +
              r +
              ">a"
          ),
          s = e("#mCSB_" + o.idx + "_container");
        n.advanced.releaseDraggableSelectors &&
          l.add(e(n.advanced.releaseDraggableSelectors)),
          o.bindEvents &&
            (e(document).unbind("." + i),
            l.each(function () {
              e(this).unbind("." + i);
            }),
            clearTimeout(t[0]._focusTimeout),
            Z(t[0], "_focusTimeout"),
            clearTimeout(o.sequential.step),
            Z(o.sequential, "step"),
            clearTimeout(s[0].onCompleteTimeout),
            Z(s[0], "onCompleteTimeout"),
            (o.bindEvents = !1));
      },
      O = function (t) {
        var o = e(this),
          n = o.data(a),
          i = n.opt,
          r = e("#mCSB_" + n.idx + "_container_wrapper"),
          l = r.length ? r : e("#mCSB_" + n.idx + "_container"),
          s = [
            e("#mCSB_" + n.idx + "_scrollbar_vertical"),
            e("#mCSB_" + n.idx + "_scrollbar_horizontal"),
          ],
          c = [s[0].find(".mCSB_dragger"), s[1].find(".mCSB_dragger")];
        "x" !== i.axis &&
          (n.overflowed[0] && !t
            ? (s[0].add(c[0]).add(s[0].children("a")).css("display", "block"),
              l.removeClass(d[8] + " " + d[10]))
            : (i.alwaysShowScrollbar
                ? (2 !== i.alwaysShowScrollbar && c[0].css("display", "none"),
                  l.removeClass(d[10]))
                : (s[0].css("display", "none"), l.addClass(d[10])),
              l.addClass(d[8]))),
          "y" !== i.axis &&
            (n.overflowed[1] && !t
              ? (s[1].add(c[1]).add(s[1].children("a")).css("display", "block"),
                l.removeClass(d[9] + " " + d[11]))
              : (i.alwaysShowScrollbar
                  ? (2 !== i.alwaysShowScrollbar && c[1].css("display", "none"),
                    l.removeClass(d[11]))
                  : (s[1].css("display", "none"), l.addClass(d[11])),
                l.addClass(d[9]))),
          n.overflowed[0] || n.overflowed[1]
            ? o.removeClass(d[5])
            : o.addClass(d[5]);
      },
      I = function (e) {
        var t = e.type;
        switch (t) {
          case "pointerdown":
          case "MSPointerDown":
          case "pointermove":
          case "MSPointerMove":
          case "pointerup":
          case "MSPointerUp":
            return e.target.ownerDocument !== document
              ? [e.originalEvent.screenY, e.originalEvent.screenX, !1]
              : [e.originalEvent.pageY, e.originalEvent.pageX, !1];
          case "touchstart":
          case "touchmove":
          case "touchend":
            var o =
                e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
              a =
                e.originalEvent.touches.length ||
                e.originalEvent.changedTouches.length;
            return e.target.ownerDocument !== document
              ? [o.screenY, o.screenX, a > 1]
              : [o.pageY, o.pageX, a > 1];
          default:
            return [e.pageY, e.pageX, !1];
        }
      },
      R = function () {
        function t(e) {
          var t = m.find("iframe");
          if (t.length) {
            var o = e ? "auto" : "none";
            t.css("pointer-events", o);
          }
        }
        function o(e, t, o, a) {
          if (
            ((m[0].idleTimer = u.scrollInertia < 233 ? 250 : 0),
            n.attr("id") === h[1])
          )
            var i = "x",
              r = (n[0].offsetLeft - t + a) * d.scrollRatio.x;
          else
            var i = "y",
              r = (n[0].offsetTop - e + o) * d.scrollRatio.y;
          Q(l, r.toString(), { dir: i, drag: !0 });
        }
        var n,
          i,
          r,
          l = e(this),
          d = l.data(a),
          u = d.opt,
          f = a + "_" + d.idx,
          h = [
            "mCSB_" + d.idx + "_dragger_vertical",
            "mCSB_" + d.idx + "_dragger_horizontal",
          ],
          m = e("#mCSB_" + d.idx + "_container"),
          p = e("#" + h[0] + ",#" + h[1]),
          g = u.advanced.releaseDraggableSelectors
            ? p.add(e(u.advanced.releaseDraggableSelectors))
            : p;
        p
          .bind(
            "mousedown." +
              f +
              " touchstart." +
              f +
              " pointerdown." +
              f +
              " MSPointerDown." +
              f,
            function (o) {
              if ((o.stopImmediatePropagation(), o.preventDefault(), $(o))) {
                (c = !0),
                  s &&
                    (document.onselectstart = function () {
                      return !1;
                    }),
                  t(!1),
                  V(l),
                  (n = e(this));
                var a = n.offset(),
                  d = I(o)[0] - a.top,
                  f = I(o)[1] - a.left,
                  h = n.height() + a.top,
                  m = n.width() + a.left;
                h > d && d > 0 && m > f && f > 0 && ((i = d), (r = f)),
                  y(n, "active", u.autoExpandScrollbar);
              }
            }
          )
          .bind("touchmove." + f, function (e) {
            e.stopImmediatePropagation(), e.preventDefault();
            var t = n.offset(),
              a = I(e)[0] - t.top,
              l = I(e)[1] - t.left;
            o(i, r, a, l);
          }),
          e(document)
            .bind(
              "mousemove." + f + " pointermove." + f + " MSPointerMove." + f,
              function (e) {
                if (n) {
                  var t = n.offset(),
                    a = I(e)[0] - t.top,
                    l = I(e)[1] - t.left;
                  if (i === a) return;
                  o(i, r, a, l);
                }
              }
            )
            .add(g)
            .bind(
              "mouseup." +
                f +
                " touchend." +
                f +
                " pointerup." +
                f +
                " MSPointerUp." +
                f,
              function () {
                n && (y(n, "active", u.autoExpandScrollbar), (n = null)),
                  (c = !1),
                  s && (document.onselectstart = null),
                  t(!0);
              }
            );
      },
      E = function () {
        function o(e) {
          if (!et(e) || c || I(e)[2]) return void (t = 0);
          (t = 1), (S = 0), (b = 0);
          var o = M.offset();
          (d = I(e)[0] - o.top),
            (u = I(e)[1] - o.left),
            (A = [I(e)[0], I(e)[1]]);
        }
        function n(e) {
          if (
            et(e) &&
            !c &&
            !I(e)[2] &&
            (e.stopImmediatePropagation(), !b || S)
          ) {
            p = J();
            var t = k.offset(),
              o = I(e)[0] - t.top,
              a = I(e)[1] - t.left,
              n = "mcsLinearOut";
            if (
              (R.push(o),
              E.push(a),
              (A[2] = Math.abs(I(e)[0] - A[0])),
              (A[3] = Math.abs(I(e)[1] - A[1])),
              y.overflowed[0])
            )
              var i = O[0].parent().height() - O[0].height(),
                r =
                  d - o > 0 &&
                  o - d > -(i * y.scrollRatio.y) &&
                  (2 * A[3] < A[2] || "yx" === B.axis);
            if (y.overflowed[1])
              var l = O[1].parent().width() - O[1].width(),
                f =
                  u - a > 0 &&
                  a - u > -(l * y.scrollRatio.x) &&
                  (2 * A[2] < A[3] || "yx" === B.axis);
            r || f ? (e.preventDefault(), (S = 1)) : (b = 1),
              (_ =
                "yx" === B.axis
                  ? [d - o, u - a]
                  : "x" === B.axis
                  ? [null, u - a]
                  : [d - o, null]),
              (M[0].idleTimer = 250),
              y.overflowed[0] && s(_[0], D, n, "y", "all", !0),
              y.overflowed[1] && s(_[1], D, n, "x", W, !0);
          }
        }
        function i(e) {
          if (!et(e) || c || I(e)[2]) return void (t = 0);
          (t = 1), e.stopImmediatePropagation(), V(C), (m = J());
          var o = k.offset();
          (f = I(e)[0] - o.top), (h = I(e)[1] - o.left), (R = []), (E = []);
        }
        function r(e) {
          if (et(e) && !c && !I(e)[2]) {
            e.stopImmediatePropagation(), (S = 0), (b = 0), (g = J());
            var t = k.offset(),
              o = I(e)[0] - t.top,
              a = I(e)[1] - t.left;
            if (!(g - p > 30)) {
              x = 1e3 / (g - m);
              var n = "mcsEaseOut",
                i = 2.5 > x,
                r = i ? [R[R.length - 2], E[E.length - 2]] : [0, 0];
              v = i ? [o - r[0], a - r[1]] : [o - f, a - h];
              var d = [Math.abs(v[0]), Math.abs(v[1])];
              x = i ? [Math.abs(v[0] / 4), Math.abs(v[1] / 4)] : [x, x];
              var u = [
                Math.abs(M[0].offsetTop) - v[0] * l(d[0] / x[0], x[0]),
                Math.abs(M[0].offsetLeft) - v[1] * l(d[1] / x[1], x[1]),
              ];
              (_ =
                "yx" === B.axis
                  ? [u[0], u[1]]
                  : "x" === B.axis
                  ? [null, u[1]]
                  : [u[0], null]),
                (w = [4 * d[0] + B.scrollInertia, 4 * d[1] + B.scrollInertia]);
              var C = parseInt(B.contentTouchScroll) || 0;
              (_[0] = d[0] > C ? _[0] : 0),
                (_[1] = d[1] > C ? _[1] : 0),
                y.overflowed[0] && s(_[0], w[0], n, "y", W, !1),
                y.overflowed[1] && s(_[1], w[1], n, "x", W, !1);
            }
          }
        }
        function l(e, t) {
          var o = [1.5 * t, 2 * t, t / 1.5, t / 2];
          return e > 90
            ? t > 4
              ? o[0]
              : o[3]
            : e > 60
            ? t > 3
              ? o[3]
              : o[2]
            : e > 30
            ? t > 8
              ? o[1]
              : t > 6
              ? o[0]
              : t > 4
              ? t
              : o[2]
            : t > 8
            ? t
            : o[3];
        }
        function s(e, t, o, a, n, i) {
          e &&
            Q(C, e.toString(), {
              dur: t,
              scrollEasing: o,
              dir: a,
              overwrite: n,
              drag: i,
            });
        }
        var d,
          u,
          f,
          h,
          m,
          p,
          g,
          v,
          x,
          _,
          w,
          S,
          b,
          C = e(this),
          y = C.data(a),
          B = y.opt,
          T = a + "_" + y.idx,
          k = e("#mCSB_" + y.idx),
          M = e("#mCSB_" + y.idx + "_container"),
          O = [
            e("#mCSB_" + y.idx + "_dragger_vertical"),
            e("#mCSB_" + y.idx + "_dragger_horizontal"),
          ],
          R = [],
          E = [],
          D = 0,
          W = "yx" === B.axis ? "none" : "all",
          A = [],
          P = M.find("iframe"),
          z = [
            "touchstart." + T + " pointerdown." + T + " MSPointerDown." + T,
            "touchmove." + T + " pointermove." + T + " MSPointerMove." + T,
            "touchend." + T + " pointerup." + T + " MSPointerUp." + T,
          ];
        M.bind(z[0], function (e) {
          o(e);
        }).bind(z[1], function (e) {
          n(e);
        }),
          k
            .bind(z[0], function (e) {
              i(e);
            })
            .bind(z[2], function (e) {
              r(e);
            }),
          P.length &&
            P.each(function () {
              e(this).load(function () {
                L(this) &&
                  e(this.contentDocument || this.contentWindow.document)
                    .bind(z[0], function (e) {
                      o(e), i(e);
                    })
                    .bind(z[1], function (e) {
                      n(e);
                    })
                    .bind(z[2], function (e) {
                      r(e);
                    });
              });
            });
      },
      D = function () {
        function o() {
          return window.getSelection
            ? window.getSelection().toString()
            : document.selection && "Control" != document.selection.type
            ? document.selection.createRange().text
            : 0;
        }
        function n(e, t, o) {
          (d.type = o && i ? "stepped" : "stepless"),
            (d.scrollAmount = 10),
            F(r, e, t, "mcsLinearOut", o ? 60 : null);
        }
        var i,
          r = e(this),
          l = r.data(a),
          s = l.opt,
          d = l.sequential,
          u = a + "_" + l.idx,
          f = e("#mCSB_" + l.idx + "_container"),
          h = f.parent();
        f.bind("mousedown." + u, function () {
          t || i || ((i = 1), (c = !0));
        })
          .add(document)
          .bind("mousemove." + u, function (e) {
            if (!t && i && o()) {
              var a = f.offset(),
                r = I(e)[0] - a.top + f[0].offsetTop,
                c = I(e)[1] - a.left + f[0].offsetLeft;
              r > 0 && r < h.height() && c > 0 && c < h.width()
                ? d.step && n("off", null, "stepped")
                : ("x" !== s.axis &&
                    l.overflowed[0] &&
                    (0 > r ? n("on", 38) : r > h.height() && n("on", 40)),
                  "y" !== s.axis &&
                    l.overflowed[1] &&
                    (0 > c ? n("on", 37) : c > h.width() && n("on", 39)));
            }
          })
          .bind("mouseup." + u, function () {
            t || (i && ((i = 0), n("off", null)), (c = !1));
          });
      },
      W = function () {
        function t(t, a) {
          if ((V(o), !A(o, t.target))) {
            var r =
              "auto" !== i.mouseWheel.deltaFactor
                ? parseInt(i.mouseWheel.deltaFactor)
                : s && t.deltaFactor < 100
                ? 100
                : t.deltaFactor || 100;
            if ("x" === i.axis || "x" === i.mouseWheel.axis)
              var d = "x",
                u = [
                  Math.round(r * n.scrollRatio.x),
                  parseInt(i.mouseWheel.scrollAmount),
                ],
                f =
                  "auto" !== i.mouseWheel.scrollAmount
                    ? u[1]
                    : u[0] >= l.width()
                    ? 0.9 * l.width()
                    : u[0],
                h = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetLeft),
                m = c[1][0].offsetLeft,
                p = c[1].parent().width() - c[1].width(),
                g = t.deltaX || t.deltaY || a;
            else
              var d = "y",
                u = [
                  Math.round(r * n.scrollRatio.y),
                  parseInt(i.mouseWheel.scrollAmount),
                ],
                f =
                  "auto" !== i.mouseWheel.scrollAmount
                    ? u[1]
                    : u[0] >= l.height()
                    ? 0.9 * l.height()
                    : u[0],
                h = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetTop),
                m = c[0][0].offsetTop,
                p = c[0].parent().height() - c[0].height(),
                g = t.deltaY || a;
            ("y" === d && !n.overflowed[0]) ||
              ("x" === d && !n.overflowed[1]) ||
              (i.mouseWheel.invert && (g = -g),
              i.mouseWheel.normalizeDelta && (g = 0 > g ? -1 : 1),
              ((g > 0 && 0 !== m) ||
                (0 > g && m !== p) ||
                i.mouseWheel.preventDefault) &&
                (t.stopImmediatePropagation(), t.preventDefault()),
              Q(o, (h - g * f).toString(), { dir: d }));
          }
        }
        var o = e(this),
          n = o.data(a),
          i = n.opt,
          r = a + "_" + n.idx,
          l = e("#mCSB_" + n.idx),
          c = [
            e("#mCSB_" + n.idx + "_dragger_vertical"),
            e("#mCSB_" + n.idx + "_dragger_horizontal"),
          ],
          d = e("#mCSB_" + n.idx + "_container").find("iframe");
        n &&
          (d.length &&
            d.each(function () {
              e(this).load(function () {
                L(this) &&
                  e(this.contentDocument || this.contentWindow.document).bind(
                    "mousewheel." + r,
                    function (e, o) {
                      t(e, o);
                    }
                  );
              });
            }),
          l.bind("mousewheel." + r, function (e, o) {
            t(e, o);
          }));
      },
      L = function (e) {
        var t = null;
        try {
          var o = e.contentDocument || e.contentWindow.document;
          t = o.body.innerHTML;
        } catch (a) {}
        return null !== t;
      },
      A = function (t, o) {
        var n = o.nodeName.toLowerCase(),
          i = t.data(a).opt.mouseWheel.disableOver,
          r = ["select", "textarea"];
        return (
          e.inArray(n, i) > -1 && !(e.inArray(n, r) > -1 && !e(o).is(":focus"))
        );
      },
      P = function () {
        var t = e(this),
          o = t.data(a),
          n = a + "_" + o.idx,
          i = e("#mCSB_" + o.idx + "_container"),
          r = i.parent(),
          l = e(".mCSB_" + o.idx + "_scrollbar ." + d[12]);
        l.bind(
          "touchstart." + n + " pointerdown." + n + " MSPointerDown." + n,
          function () {
            c = !0;
          }
        )
          .bind(
            "touchend." + n + " pointerup." + n + " MSPointerUp." + n,
            function () {
              c = !1;
            }
          )
          .bind("click." + n, function (a) {
            if (
              e(a.target).hasClass(d[12]) ||
              e(a.target).hasClass("mCSB_draggerRail")
            ) {
              V(t);
              var n = e(this),
                l = n.find(".mCSB_dragger");
              if (n.parent(".mCSB_scrollTools_horizontal").length > 0) {
                if (!o.overflowed[1]) return;
                var s = "x",
                  c = a.pageX > l.offset().left ? -1 : 1,
                  u = Math.abs(i[0].offsetLeft) - 0.9 * c * r.width();
              } else {
                if (!o.overflowed[0]) return;
                var s = "y",
                  c = a.pageY > l.offset().top ? -1 : 1,
                  u = Math.abs(i[0].offsetTop) - 0.9 * c * r.height();
              }
              Q(t, u.toString(), { dir: s, scrollEasing: "mcsEaseInOut" });
            }
          });
      },
      z = function () {
        var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = a + "_" + o.idx,
          r = e("#mCSB_" + o.idx + "_container"),
          l = r.parent();
        r.bind("focusin." + i, function () {
          var o = e(document.activeElement),
            a = r.find(".mCustomScrollBox").length,
            i = 0;
          o.is(n.advanced.autoScrollOnFocus) &&
            (V(t),
            clearTimeout(t[0]._focusTimeout),
            (t[0]._focusTimer = a ? (i + 17) * a : 0),
            (t[0]._focusTimeout = setTimeout(function () {
              var e = [ot(o)[0], ot(o)[1]],
                a = [r[0].offsetTop, r[0].offsetLeft],
                s = [
                  a[0] + e[0] >= 0 &&
                    a[0] + e[0] < l.height() - o.outerHeight(!1),
                  a[1] + e[1] >= 0 &&
                    a[0] + e[1] < l.width() - o.outerWidth(!1),
                ],
                c = "yx" !== n.axis || s[0] || s[1] ? "all" : "none";
              "x" === n.axis ||
                s[0] ||
                Q(t, e[0].toString(), {
                  dir: "y",
                  scrollEasing: "mcsEaseInOut",
                  overwrite: c,
                  dur: i,
                }),
                "y" === n.axis ||
                  s[1] ||
                  Q(t, e[1].toString(), {
                    dir: "x",
                    scrollEasing: "mcsEaseInOut",
                    overwrite: c,
                    dur: i,
                  });
            }, t[0]._focusTimer)));
        });
      },
      H = function () {
        var t = e(this),
          o = t.data(a),
          n = a + "_" + o.idx,
          i = e("#mCSB_" + o.idx + "_container").parent();
        i.bind("scroll." + n, function () {
          (0 !== i.scrollTop() || 0 !== i.scrollLeft()) &&
            e(".mCSB_" + o.idx + "_scrollbar").css("visibility", "hidden");
        });
      },
      U = function () {
        var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = o.sequential,
          r = a + "_" + o.idx,
          l = ".mCSB_" + o.idx + "_scrollbar",
          s = e(l + ">a");
        s.bind(
          "mousedown." +
            r +
            " touchstart." +
            r +
            " pointerdown." +
            r +
            " MSPointerDown." +
            r +
            " mouseup." +
            r +
            " touchend." +
            r +
            " pointerup." +
            r +
            " MSPointerUp." +
            r +
            " mouseout." +
            r +
            " pointerout." +
            r +
            " MSPointerOut." +
            r +
            " click." +
            r,
          function (a) {
            function r(e, o) {
              (i.scrollAmount = n.snapAmount || n.scrollButtons.scrollAmount),
                F(t, e, o);
            }
            if ((a.preventDefault(), $(a))) {
              var l = e(this).attr("class");
              switch (((i.type = n.scrollButtons.scrollType), a.type)) {
                case "mousedown":
                case "touchstart":
                case "pointerdown":
                case "MSPointerDown":
                  if ("stepped" === i.type) return;
                  (c = !0), (o.tweenRunning = !1), r("on", l);
                  break;
                case "mouseup":
                case "touchend":
                case "pointerup":
                case "MSPointerUp":
                case "mouseout":
                case "pointerout":
                case "MSPointerOut":
                  if ("stepped" === i.type) return;
                  (c = !1), i.dir && r("off", l);
                  break;
                case "click":
                  if ("stepped" !== i.type || o.tweenRunning) return;
                  r("on", l);
              }
            }
          }
        );
      },
      q = function () {
        function t(t) {
          function a(e, t) {
            (r.type = i.keyboard.scrollType),
              (r.scrollAmount = i.snapAmount || i.keyboard.scrollAmount),
              ("stepped" === r.type && n.tweenRunning) || F(o, e, t);
          }
          switch (t.type) {
            case "blur":
              n.tweenRunning && r.dir && a("off", null);
              break;
            case "keydown":
            case "keyup":
              var l = t.keyCode ? t.keyCode : t.which,
                s = "on";
              if (
                ("x" !== i.axis && (38 === l || 40 === l)) ||
                ("y" !== i.axis && (37 === l || 39 === l))
              ) {
                if (
                  ((38 === l || 40 === l) && !n.overflowed[0]) ||
                  ((37 === l || 39 === l) && !n.overflowed[1])
                )
                  return;
                "keyup" === t.type && (s = "off"),
                  e(document.activeElement).is(u) ||
                    (t.preventDefault(), t.stopImmediatePropagation(), a(s, l));
              } else if (33 === l || 34 === l) {
                if (
                  ((n.overflowed[0] || n.overflowed[1]) &&
                    (t.preventDefault(), t.stopImmediatePropagation()),
                  "keyup" === t.type)
                ) {
                  V(o);
                  var f = 34 === l ? -1 : 1;
                  if (
                    "x" === i.axis ||
                    ("yx" === i.axis && n.overflowed[1] && !n.overflowed[0])
                  )
                    var h = "x",
                      m = Math.abs(c[0].offsetLeft) - 0.9 * f * d.width();
                  else
                    var h = "y",
                      m = Math.abs(c[0].offsetTop) - 0.9 * f * d.height();
                  Q(o, m.toString(), { dir: h, scrollEasing: "mcsEaseInOut" });
                }
              } else if (
                (35 === l || 36 === l) &&
                !e(document.activeElement).is(u) &&
                ((n.overflowed[0] || n.overflowed[1]) &&
                  (t.preventDefault(), t.stopImmediatePropagation()),
                "keyup" === t.type)
              ) {
                if (
                  "x" === i.axis ||
                  ("yx" === i.axis && n.overflowed[1] && !n.overflowed[0])
                )
                  var h = "x",
                    m = 35 === l ? Math.abs(d.width() - c.outerWidth(!1)) : 0;
                else
                  var h = "y",
                    m = 35 === l ? Math.abs(d.height() - c.outerHeight(!1)) : 0;
                Q(o, m.toString(), { dir: h, scrollEasing: "mcsEaseInOut" });
              }
          }
        }
        var o = e(this),
          n = o.data(a),
          i = n.opt,
          r = n.sequential,
          l = a + "_" + n.idx,
          s = e("#mCSB_" + n.idx),
          c = e("#mCSB_" + n.idx + "_container"),
          d = c.parent(),
          u = "input,textarea,select,datalist,keygen,[contenteditable='true']",
          f = c.find("iframe"),
          h = ["blur." + l + " keydown." + l + " keyup." + l];
        f.length &&
          f.each(function () {
            e(this).load(function () {
              L(this) &&
                e(this.contentDocument || this.contentWindow.document).bind(
                  h[0],
                  function (e) {
                    t(e);
                  }
                );
            });
          }),
          s.attr("tabindex", "0").bind(h[0], function (e) {
            t(e);
          });
      },
      F = function (t, o, n, i, r) {
        function l(e) {
          var o = "stepped" !== f.type,
            a = r ? r : e ? (o ? p / 1.5 : g) : 1e3 / 60,
            n = e ? (o ? 7.5 : 40) : 2.5,
            s = [Math.abs(h[0].offsetTop), Math.abs(h[0].offsetLeft)],
            d = [
              c.scrollRatio.y > 10 ? 10 : c.scrollRatio.y,
              c.scrollRatio.x > 10 ? 10 : c.scrollRatio.x,
            ],
            u =
              "x" === f.dir[0]
                ? s[1] + f.dir[1] * d[1] * n
                : s[0] + f.dir[1] * d[0] * n,
            m =
              "x" === f.dir[0]
                ? s[1] + f.dir[1] * parseInt(f.scrollAmount)
                : s[0] + f.dir[1] * parseInt(f.scrollAmount),
            v = "auto" !== f.scrollAmount ? m : u,
            x = i ? i : e ? (o ? "mcsLinearOut" : "mcsEaseInOut") : "mcsLinear",
            _ = e ? !0 : !1;
          return (
            e && 17 > a && (v = "x" === f.dir[0] ? s[1] : s[0]),
            Q(t, v.toString(), {
              dir: f.dir[0],
              scrollEasing: x,
              dur: a,
              onComplete: _,
            }),
            e
              ? void (f.dir = !1)
              : (clearTimeout(f.step),
                void (f.step = setTimeout(function () {
                  l();
                }, a)))
          );
        }
        function s() {
          clearTimeout(f.step), Z(f, "step"), V(t);
        }
        var c = t.data(a),
          u = c.opt,
          f = c.sequential,
          h = e("#mCSB_" + c.idx + "_container"),
          m = "stepped" === f.type ? !0 : !1,
          p = u.scrollInertia < 26 ? 26 : u.scrollInertia,
          g = u.scrollInertia < 1 ? 17 : u.scrollInertia;
        switch (o) {
          case "on":
            if (
              ((f.dir = [
                n === d[16] || n === d[15] || 39 === n || 37 === n ? "x" : "y",
                n === d[13] || n === d[15] || 38 === n || 37 === n ? -1 : 1,
              ]),
              V(t),
              tt(n) && "stepped" === f.type)
            )
              return;
            l(m);
            break;
          case "off":
            s(), (m || (c.tweenRunning && f.dir)) && l(!0);
        }
      },
      Y = function (t) {
        var o = e(this).data(a).opt,
          n = [];
        return (
          "function" == typeof t && (t = t()),
          t instanceof Array
            ? (n =
                t.length > 1
                  ? [t[0], t[1]]
                  : "x" === o.axis
                  ? [null, t[0]]
                  : [t[0], null])
            : ((n[0] = t.y ? t.y : t.x || "x" === o.axis ? null : t),
              (n[1] = t.x ? t.x : t.y || "y" === o.axis ? null : t)),
          "function" == typeof n[0] && (n[0] = n[0]()),
          "function" == typeof n[1] && (n[1] = n[1]()),
          n
        );
      },
      j = function (t, o) {
        if (null != t && "undefined" != typeof t) {
          var n = e(this),
            i = n.data(a),
            r = i.opt,
            l = e("#mCSB_" + i.idx + "_container"),
            s = l.parent(),
            c = typeof t;
          o || (o = "x" === r.axis ? "x" : "y");
          var d = "x" === o ? l.outerWidth(!1) : l.outerHeight(!1),
            f = "x" === o ? l[0].offsetLeft : l[0].offsetTop,
            h = "x" === o ? "left" : "top";
          switch (c) {
            case "function":
              return t();
            case "object":
              var m = t.jquery ? t : e(t);
              if (!m.length) return;
              return "x" === o ? ot(m)[1] : ot(m)[0];
            case "string":
            case "number":
              if (tt(t)) return Math.abs(t);
              if (-1 !== t.indexOf("%"))
                return Math.abs((d * parseInt(t)) / 100);
              if (-1 !== t.indexOf("-="))
                return Math.abs(f - parseInt(t.split("-=")[1]));
              if (-1 !== t.indexOf("+=")) {
                var p = f + parseInt(t.split("+=")[1]);
                return p >= 0 ? 0 : Math.abs(p);
              }
              if (-1 !== t.indexOf("px") && tt(t.split("px")[0]))
                return Math.abs(t.split("px")[0]);
              if ("top" === t || "left" === t) return 0;
              if ("bottom" === t)
                return Math.abs(s.height() - l.outerHeight(!1));
              if ("right" === t) return Math.abs(s.width() - l.outerWidth(!1));
              if ("first" === t || "last" === t) {
                var m = l.find(":" + t);
                return "x" === o ? ot(m)[1] : ot(m)[0];
              }
              return e(t).length
                ? "x" === o
                  ? ot(e(t))[1]
                  : ot(e(t))[0]
                : (l.css(h, t), void u.update.call(null, n[0]));
          }
        }
      },
      X = function (t) {
        function o() {
          clearTimeout(h[0].autoUpdate),
            (h[0].autoUpdate = setTimeout(function () {
              return f.advanced.updateOnSelectorChange && ((m = r()), m !== w)
                ? (l(3), void (w = m))
                : (f.advanced.updateOnContentResize &&
                    ((p = [
                      h.outerHeight(!1),
                      h.outerWidth(!1),
                      v.height(),
                      v.width(),
                      _()[0],
                      _()[1],
                    ]),
                    (p[0] !== S[0] ||
                      p[1] !== S[1] ||
                      p[2] !== S[2] ||
                      p[3] !== S[3] ||
                      p[4] !== S[4] ||
                      p[5] !== S[5]) &&
                      (l(p[0] !== S[0] || p[1] !== S[1]), (S = p))),
                  f.advanced.updateOnImageLoad &&
                    ((g = n()),
                    g !== b &&
                      (h.find("img").each(function () {
                        i(this);
                      }),
                      (b = g))),
                  void (
                    (f.advanced.updateOnSelectorChange ||
                      f.advanced.updateOnContentResize ||
                      f.advanced.updateOnImageLoad) &&
                    o()
                  ));
            }, 60));
        }
        function n() {
          var e = 0;
          return f.advanced.updateOnImageLoad && (e = h.find("img").length), e;
        }
        function i(t) {
          function o(e, t) {
            return function () {
              return t.apply(e, arguments);
            };
          }
          function a() {
            (this.onload = null), e(t).addClass(d[2]), l(2);
          }
          if (e(t).hasClass(d[2])) return void l();
          var n = new Image();
          (n.onload = o(n, a)), (n.src = t.src);
        }
        function r() {
          f.advanced.updateOnSelectorChange === !0 &&
            (f.advanced.updateOnSelectorChange = "*");
          var t = 0,
            o = h.find(f.advanced.updateOnSelectorChange);
          return (
            f.advanced.updateOnSelectorChange &&
              o.length > 0 &&
              o.each(function () {
                t += e(this).height() + e(this).width();
              }),
            t
          );
        }
        function l(e) {
          clearTimeout(h[0].autoUpdate), u.update.call(null, s[0], e);
        }
        var s = e(this),
          c = s.data(a),
          f = c.opt,
          h = e("#mCSB_" + c.idx + "_container");
        if (t) return clearTimeout(h[0].autoUpdate), void Z(h[0], "autoUpdate");
        var m,
          p,
          g,
          v = h.parent(),
          x = [
            e("#mCSB_" + c.idx + "_scrollbar_vertical"),
            e("#mCSB_" + c.idx + "_scrollbar_horizontal"),
          ],
          _ = function () {
            return [
              x[0].is(":visible") ? x[0].outerHeight(!0) : 0,
              x[1].is(":visible") ? x[1].outerWidth(!0) : 0,
            ];
          },
          w = r(),
          S = [
            h.outerHeight(!1),
            h.outerWidth(!1),
            v.height(),
            v.width(),
            _()[0],
            _()[1],
          ],
          b = n();
        o();
      },
      N = function (e, t, o) {
        return Math.round(e / t) * t - o;
      },
      V = function (t) {
        var o = t.data(a),
          n = e(
            "#mCSB_" +
              o.idx +
              "_container,#mCSB_" +
              o.idx +
              "_container_wrapper,#mCSB_" +
              o.idx +
              "_dragger_vertical,#mCSB_" +
              o.idx +
              "_dragger_horizontal"
          );
        n.each(function () {
          K.call(this);
        });
      },
      Q = function (t, o, n) {
        function i(e) {
          return s && c.callbacks[e] && "function" == typeof c.callbacks[e];
        }
        function r() {
          return [
            c.callbacks.alwaysTriggerOffsets || _ >= w[0] + b,
            c.callbacks.alwaysTriggerOffsets || -C >= _,
          ];
        }
        function l() {
          var e = [h[0].offsetTop, h[0].offsetLeft],
            o = [v[0].offsetTop, v[0].offsetLeft],
            a = [h.outerHeight(!1), h.outerWidth(!1)],
            i = [f.height(), f.width()];
          t[0].mcs = {
            content: h,
            top: e[0],
            left: e[1],
            draggerTop: o[0],
            draggerLeft: o[1],
            topPct: Math.round(
              (100 * Math.abs(e[0])) / (Math.abs(a[0]) - i[0])
            ),
            leftPct: Math.round(
              (100 * Math.abs(e[1])) / (Math.abs(a[1]) - i[1])
            ),
            direction: n.dir,
          };
        }
        var s = t.data(a),
          c = s.opt,
          d = {
            trigger: "internal",
            dir: "y",
            scrollEasing: "mcsEaseOut",
            drag: !1,
            dur: c.scrollInertia,
            overwrite: "all",
            callbacks: !0,
            onStart: !0,
            onUpdate: !0,
            onComplete: !0,
          },
          n = e.extend(d, n),
          u = [n.dur, n.drag ? 0 : n.dur],
          f = e("#mCSB_" + s.idx),
          h = e("#mCSB_" + s.idx + "_container"),
          m = h.parent(),
          p = c.callbacks.onTotalScrollOffset
            ? Y.call(t, c.callbacks.onTotalScrollOffset)
            : [0, 0],
          g = c.callbacks.onTotalScrollBackOffset
            ? Y.call(t, c.callbacks.onTotalScrollBackOffset)
            : [0, 0];
        if (
          ((s.trigger = n.trigger),
          (0 !== m.scrollTop() || 0 !== m.scrollLeft()) &&
            (e(".mCSB_" + s.idx + "_scrollbar").css("visibility", "visible"),
            m.scrollTop(0).scrollLeft(0)),
          "_resetY" !== o ||
            s.contentReset.y ||
            (i("onOverflowYNone") && c.callbacks.onOverflowYNone.call(t[0]),
            (s.contentReset.y = 1)),
          "_resetX" !== o ||
            s.contentReset.x ||
            (i("onOverflowXNone") && c.callbacks.onOverflowXNone.call(t[0]),
            (s.contentReset.x = 1)),
          "_resetY" !== o && "_resetX" !== o)
        ) {
          switch (
            ((!s.contentReset.y && t[0].mcs) ||
              !s.overflowed[0] ||
              (i("onOverflowY") && c.callbacks.onOverflowY.call(t[0]),
              (s.contentReset.x = null)),
            (!s.contentReset.x && t[0].mcs) ||
              !s.overflowed[1] ||
              (i("onOverflowX") && c.callbacks.onOverflowX.call(t[0]),
              (s.contentReset.x = null)),
            c.snapAmount && (o = N(o, c.snapAmount, c.snapOffset)),
            n.dir)
          ) {
            case "x":
              var v = e("#mCSB_" + s.idx + "_dragger_horizontal"),
                x = "left",
                _ = h[0].offsetLeft,
                w = [
                  f.width() - h.outerWidth(!1),
                  v.parent().width() - v.width(),
                ],
                S = [o, 0 === o ? 0 : o / s.scrollRatio.x],
                b = p[1],
                C = g[1],
                B = b > 0 ? b / s.scrollRatio.x : 0,
                T = C > 0 ? C / s.scrollRatio.x : 0;
              break;
            case "y":
              var v = e("#mCSB_" + s.idx + "_dragger_vertical"),
                x = "top",
                _ = h[0].offsetTop,
                w = [
                  f.height() - h.outerHeight(!1),
                  v.parent().height() - v.height(),
                ],
                S = [o, 0 === o ? 0 : o / s.scrollRatio.y],
                b = p[0],
                C = g[0],
                B = b > 0 ? b / s.scrollRatio.y : 0,
                T = C > 0 ? C / s.scrollRatio.y : 0;
          }
          S[1] < 0 || (0 === S[0] && 0 === S[1])
            ? (S = [0, 0])
            : S[1] >= w[1]
            ? (S = [w[0], w[1]])
            : (S[0] = -S[0]),
            t[0].mcs || (l(), i("onInit") && c.callbacks.onInit.call(t[0])),
            clearTimeout(h[0].onCompleteTimeout),
            (s.tweenRunning ||
              !((0 === _ && S[0] >= 0) || (_ === w[0] && S[0] <= w[0]))) &&
              (G(v[0], x, Math.round(S[1]), u[1], n.scrollEasing),
              G(h[0], x, Math.round(S[0]), u[0], n.scrollEasing, n.overwrite, {
                onStart: function () {
                  n.callbacks &&
                    n.onStart &&
                    !s.tweenRunning &&
                    (i("onScrollStart") &&
                      (l(), c.callbacks.onScrollStart.call(t[0])),
                    (s.tweenRunning = !0),
                    y(v),
                    (s.cbOffsets = r()));
                },
                onUpdate: function () {
                  n.callbacks &&
                    n.onUpdate &&
                    i("whileScrolling") &&
                    (l(), c.callbacks.whileScrolling.call(t[0]));
                },
                onComplete: function () {
                  if (n.callbacks && n.onComplete) {
                    "yx" === c.axis && clearTimeout(h[0].onCompleteTimeout);
                    var e = h[0].idleTimer || 0;
                    h[0].onCompleteTimeout = setTimeout(function () {
                      i("onScroll") && (l(), c.callbacks.onScroll.call(t[0])),
                        i("onTotalScroll") &&
                          S[1] >= w[1] - B &&
                          s.cbOffsets[0] &&
                          (l(), c.callbacks.onTotalScroll.call(t[0])),
                        i("onTotalScrollBack") &&
                          S[1] <= T &&
                          s.cbOffsets[1] &&
                          (l(), c.callbacks.onTotalScrollBack.call(t[0])),
                        (s.tweenRunning = !1),
                        (h[0].idleTimer = 0),
                        y(v, "hide");
                    }, e);
                  }
                },
              }));
        }
      },
      G = function (e, t, o, a, n, i, r) {
        function l() {
          S.stop ||
            (x || m.call(),
            (x = J() - v),
            s(),
            x >= S.time &&
              ((S.time = x > S.time ? x + f - (x - S.time) : x + f - 1),
              S.time < x + 1 && (S.time = x + 1)),
            S.time < a ? (S.id = h(l)) : g.call());
        }
        function s() {
          a > 0
            ? ((S.currVal = u(S.time, _, b, a, n)),
              (w[t] = Math.round(S.currVal) + "px"))
            : (w[t] = o + "px"),
            p.call();
        }
        function c() {
          (f = 1e3 / 60),
            (S.time = x + f),
            (h = window.requestAnimationFrame
              ? window.requestAnimationFrame
              : function (e) {
                  return s(), setTimeout(e, 0.01);
                }),
            (S.id = h(l));
        }
        function d() {
          null != S.id &&
            (window.requestAnimationFrame
              ? window.cancelAnimationFrame(S.id)
              : clearTimeout(S.id),
            (S.id = null));
        }
        function u(e, t, o, a, n) {
          switch (n) {
            case "linear":
            case "mcsLinear":
              return (o * e) / a + t;
            case "mcsLinearOut":
              return (e /= a), e--, o * Math.sqrt(1 - e * e) + t;
            case "easeInOutSmooth":
              return (
                (e /= a / 2),
                1 > e
                  ? (o / 2) * e * e + t
                  : (e--, (-o / 2) * (e * (e - 2) - 1) + t)
              );
            case "easeInOutStrong":
              return (
                (e /= a / 2),
                1 > e
                  ? (o / 2) * Math.pow(2, 10 * (e - 1)) + t
                  : (e--, (o / 2) * (-Math.pow(2, -10 * e) + 2) + t)
              );
            case "easeInOut":
            case "mcsEaseInOut":
              return (
                (e /= a / 2),
                1 > e
                  ? (o / 2) * e * e * e + t
                  : ((e -= 2), (o / 2) * (e * e * e + 2) + t)
              );
            case "easeOutSmooth":
              return (e /= a), e--, -o * (e * e * e * e - 1) + t;
            case "easeOutStrong":
              return o * (-Math.pow(2, (-10 * e) / a) + 1) + t;
            case "easeOut":
            case "mcsEaseOut":
            default:
              var i = (e /= a) * e,
                r = i * e;
              return (
                t +
                o *
                  (0.499999999999997 * r * i +
                    -2.5 * i * i +
                    5.5 * r +
                    -6.5 * i +
                    4 * e)
              );
          }
        }
        e._mTween || (e._mTween = { top: {}, left: {} });
        var f,
          h,
          r = r || {},
          m = r.onStart || function () {},
          p = r.onUpdate || function () {},
          g = r.onComplete || function () {},
          v = J(),
          x = 0,
          _ = e.offsetTop,
          w = e.style,
          S = e._mTween[t];
        "left" === t && (_ = e.offsetLeft);
        var b = o - _;
        (S.stop = 0), "none" !== i && d(), c();
      },
      J = function () {
        return window.performance && window.performance.now
          ? window.performance.now()
          : window.performance && window.performance.webkitNow
          ? window.performance.webkitNow()
          : Date.now
          ? Date.now()
          : new Date().getTime();
      },
      K = function () {
        var e = this;
        e._mTween || (e._mTween = { top: {}, left: {} });
        for (var t = ["top", "left"], o = 0; o < t.length; o++) {
          var a = t[o];
          e._mTween[a].id &&
            (window.requestAnimationFrame
              ? window.cancelAnimationFrame(e._mTween[a].id)
              : clearTimeout(e._mTween[a].id),
            (e._mTween[a].id = null),
            (e._mTween[a].stop = 1));
        }
      },
      Z = function (e, t) {
        try {
          delete e[t];
        } catch (o) {
          e[t] = null;
        }
      },
      $ = function (e) {
        return !(e.which && 1 !== e.which);
      },
      et = function (e) {
        var t = e.originalEvent.pointerType;
        return !(t && "touch" !== t && 2 !== t);
      },
      tt = function (e) {
        return !isNaN(parseFloat(e)) && isFinite(e);
      },
      ot = function (e) {
        var t = e.parents(".mCSB_container");
        return [
          e.offset().top - t.offset().top,
          e.offset().left - t.offset().left,
        ];
      };
    (e.fn[o] = function (t) {
      return u[t]
        ? u[t].apply(this, Array.prototype.slice.call(arguments, 1))
        : "object" != typeof t && t
        ? void e.error("Method " + t + " does not exist")
        : u.init.apply(this, arguments);
    }),
      (e[o] = function (t) {
        return u[t]
          ? u[t].apply(this, Array.prototype.slice.call(arguments, 1))
          : "object" != typeof t && t
          ? void e.error("Method " + t + " does not exist")
          : u.init.apply(this, arguments);
      }),
      (e[o].defaults = i),
      (window[o] = !0),
      e(window).load(function () {
        e(n)[o](),
          e.extend(e.expr[":"], {
            mcsInView:
              e.expr[":"].mcsInView ||
              function (t) {
                var o,
                  a,
                  n = e(t),
                  i = n.parents(".mCSB_container");
                if (i.length)
                  return (
                    (o = i.parent()),
                    (a = [i[0].offsetTop, i[0].offsetLeft]),
                    a[0] + ot(n)[0] >= 0 &&
                      a[0] + ot(n)[0] < o.height() - n.outerHeight(!1) &&
                      a[1] + ot(n)[1] >= 0 &&
                      a[1] + ot(n)[1] < o.width() - n.outerWidth(!1)
                  );
              },
            mcsOverflow:
              e.expr[":"].mcsOverflow ||
              function (t) {
                var o = e(t).data(a);
                if (o) return o.overflowed[0] || o.overflowed[1];
              },
          });
      });
  });
});
