(() => {
  var e = {
      732: function (e) {
        e.exports = (function () {
          "use strict";
          function e() {
            return (
              (e =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var i in n)
                      Object.prototype.hasOwnProperty.call(n, i) &&
                        (e[i] = n[i]);
                  }
                  return e;
                }),
              e.apply(this, arguments)
            );
          }
          var t = "undefined" != typeof window,
            n =
              (t && !("onscroll" in window)) ||
              ("undefined" != typeof navigator &&
                /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
            i = t && "IntersectionObserver" in window,
            s = t && "classList" in document.createElement("p"),
            r = t && window.devicePixelRatio > 1,
            o = {
              elements_selector: ".lazy",
              container: n || t ? document : null,
              threshold: 300,
              thresholds: null,
              data_src: "src",
              data_srcset: "srcset",
              data_sizes: "sizes",
              data_bg: "bg",
              data_bg_hidpi: "bg-hidpi",
              data_bg_multi: "bg-multi",
              data_bg_multi_hidpi: "bg-multi-hidpi",
              data_poster: "poster",
              class_applied: "applied",
              class_loading: "loading",
              class_loaded: "loaded",
              class_error: "error",
              class_entered: "entered",
              class_exited: "exited",
              unobserve_completed: !0,
              unobserve_entered: !1,
              cancel_on_exit: !0,
              callback_enter: null,
              callback_exit: null,
              callback_applied: null,
              callback_loading: null,
              callback_loaded: null,
              callback_error: null,
              callback_finish: null,
              callback_cancel: null,
              use_native: !1,
              restore_on_error: !1,
            },
            a = function (t) {
              return e({}, o, t);
            },
            l = function (e, t) {
              var n,
                i = "LazyLoad::Initialized",
                s = new e(t);
              try {
                n = new CustomEvent(i, { detail: { instance: s } });
              } catch (e) {
                (n = document.createEvent("CustomEvent")).initCustomEvent(
                  i,
                  !1,
                  !1,
                  { instance: s }
                );
              }
              window.dispatchEvent(n);
            },
            c = "src",
            d = "srcset",
            u = "sizes",
            p = "poster",
            h = "llOriginalAttrs",
            f = "data",
            m = "loading",
            v = "loaded",
            g = "applied",
            b = "error",
            y = "native",
            w = "data-",
            E = "ll-status",
            x = function (e, t) {
              return e.getAttribute(w + t);
            },
            S = function (e) {
              return x(e, E);
            },
            C = function (e, t) {
              return (function (e, t, n) {
                var i = "data-ll-status";
                null !== n ? e.setAttribute(i, n) : e.removeAttribute(i);
              })(e, 0, t);
            },
            T = function (e) {
              return C(e, null);
            },
            O = function (e) {
              return null === S(e);
            },
            _ = function (e) {
              return S(e) === y;
            },
            k = [m, v, g, b],
            L = function (e, t, n, i) {
              e &&
                (void 0 === i ? (void 0 === n ? e(t) : e(t, n)) : e(t, n, i));
            },
            A = function (e, t) {
              s
                ? e.classList.add(t)
                : (e.className += (e.className ? " " : "") + t);
            },
            M = function (e, t) {
              s
                ? e.classList.remove(t)
                : (e.className = e.className
                    .replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ")
                    .replace(/^\s+/, "")
                    .replace(/\s+$/, ""));
            },
            P = function (e) {
              return e.llTempImage;
            },
            $ = function (e, t) {
              if (t) {
                var n = t._observer;
                n && n.unobserve(e);
              }
            },
            z = function (e, t) {
              e && (e.loadingCount += t);
            },
            I = function (e, t) {
              e && (e.toLoadCount = t);
            },
            N = function (e) {
              for (var t, n = [], i = 0; (t = e.children[i]); i += 1)
                "SOURCE" === t.tagName && n.push(t);
              return n;
            },
            W = function (e, t) {
              var n = e.parentNode;
              n && "PICTURE" === n.tagName && N(n).forEach(t);
            },
            B = function (e, t) {
              N(e).forEach(t);
            },
            D = [c],
            R = [c, p],
            j = [c, d, u],
            q = [f],
            G = function (e) {
              return !!e[h];
            },
            H = function (e) {
              return e[h];
            },
            F = function (e) {
              return delete e[h];
            },
            V = function (e, t) {
              if (!G(e)) {
                var n = {};
                t.forEach(function (t) {
                  n[t] = e.getAttribute(t);
                }),
                  (e[h] = n);
              }
            },
            X = function (e, t) {
              if (G(e)) {
                var n = H(e);
                t.forEach(function (t) {
                  !(function (e, t, n) {
                    n ? e.setAttribute(t, n) : e.removeAttribute(t);
                  })(e, t, n[t]);
                });
              }
            },
            Y = function (e, t, n) {
              A(e, t.class_loading),
                C(e, m),
                n && (z(n, 1), L(t.callback_loading, e, n));
            },
            U = function (e, t, n) {
              n && e.setAttribute(t, n);
            },
            Q = function (e, t) {
              U(e, u, x(e, t.data_sizes)),
                U(e, d, x(e, t.data_srcset)),
                U(e, c, x(e, t.data_src));
            },
            K = {
              IMG: function (e, t) {
                W(e, function (e) {
                  V(e, j), Q(e, t);
                }),
                  V(e, j),
                  Q(e, t);
              },
              IFRAME: function (e, t) {
                V(e, D), U(e, c, x(e, t.data_src));
              },
              VIDEO: function (e, t) {
                B(e, function (e) {
                  V(e, D), U(e, c, x(e, t.data_src));
                }),
                  V(e, R),
                  U(e, p, x(e, t.data_poster)),
                  U(e, c, x(e, t.data_src)),
                  e.load();
              },
              OBJECT: function (e, t) {
                V(e, q), U(e, f, x(e, t.data_src));
              },
            },
            J = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
            Z = function (e, t) {
              !t ||
                (function (e) {
                  return e.loadingCount > 0;
                })(t) ||
                (function (e) {
                  return e.toLoadCount > 0;
                })(t) ||
                L(e.callback_finish, t);
            },
            ee = function (e, t, n) {
              e.addEventListener(t, n), (e.llEvLisnrs[t] = n);
            },
            te = function (e, t, n) {
              e.removeEventListener(t, n);
            },
            ne = function (e) {
              return !!e.llEvLisnrs;
            },
            ie = function (e) {
              if (ne(e)) {
                var t = e.llEvLisnrs;
                for (var n in t) {
                  var i = t[n];
                  te(e, n, i);
                }
                delete e.llEvLisnrs;
              }
            },
            se = function (e, t, n) {
              !(function (e) {
                delete e.llTempImage;
              })(e),
                z(n, -1),
                (function (e) {
                  e && (e.toLoadCount -= 1);
                })(n),
                M(e, t.class_loading),
                t.unobserve_completed && $(e, n);
            },
            re = function (e, t, n) {
              var i = P(e) || e;
              ne(i) ||
                (function (e, t, n) {
                  ne(e) || (e.llEvLisnrs = {});
                  var i = "VIDEO" === e.tagName ? "loadeddata" : "load";
                  ee(e, i, t), ee(e, "error", n);
                })(
                  i,
                  function (s) {
                    !(function (e, t, n, i) {
                      var s = _(t);
                      se(t, n, i),
                        A(t, n.class_loaded),
                        C(t, v),
                        L(n.callback_loaded, t, i),
                        s || Z(n, i);
                    })(0, e, t, n),
                      ie(i);
                  },
                  function (s) {
                    !(function (e, t, n, i) {
                      var s = _(t);
                      se(t, n, i),
                        A(t, n.class_error),
                        C(t, b),
                        L(n.callback_error, t, i),
                        n.restore_on_error && X(t, j),
                        s || Z(n, i);
                    })(0, e, t, n),
                      ie(i);
                  }
                );
            },
            oe = function (e, t, n) {
              !(function (e) {
                e.llTempImage = document.createElement("IMG");
              })(e),
                re(e, t, n),
                (function (e) {
                  G(e) || (e[h] = { backgroundImage: e.style.backgroundImage });
                })(e),
                (function (e, t, n) {
                  var i = x(e, t.data_bg),
                    s = x(e, t.data_bg_hidpi),
                    o = r && s ? s : i;
                  o &&
                    ((e.style.backgroundImage = 'url("'.concat(o, '")')),
                    P(e).setAttribute(c, o),
                    Y(e, t, n));
                })(e, t, n),
                (function (e, t, n) {
                  var i = x(e, t.data_bg_multi),
                    s = x(e, t.data_bg_multi_hidpi),
                    o = r && s ? s : i;
                  o &&
                    ((e.style.backgroundImage = o),
                    (function (e, t, n) {
                      A(e, t.class_applied),
                        C(e, g),
                        n &&
                          (t.unobserve_completed && $(e, t),
                          L(t.callback_applied, e, n));
                    })(e, t, n));
                })(e, t, n);
            },
            ae = function (e, t, n) {
              !(function (e) {
                return J.indexOf(e.tagName) > -1;
              })(e)
                ? oe(e, t, n)
                : (function (e, t, n) {
                    re(e, t, n),
                      (function (e, t, n) {
                        var i = K[e.tagName];
                        i && (i(e, t), Y(e, t, n));
                      })(e, t, n);
                  })(e, t, n);
            },
            le = function (e) {
              e.removeAttribute(c), e.removeAttribute(d), e.removeAttribute(u);
            },
            ce = function (e) {
              W(e, function (e) {
                X(e, j);
              }),
                X(e, j);
            },
            de = {
              IMG: ce,
              IFRAME: function (e) {
                X(e, D);
              },
              VIDEO: function (e) {
                B(e, function (e) {
                  X(e, D);
                }),
                  X(e, R),
                  e.load();
              },
              OBJECT: function (e) {
                X(e, q);
              },
            },
            ue = function (e, t) {
              (function (e) {
                var t = de[e.tagName];
                t
                  ? t(e)
                  : (function (e) {
                      if (G(e)) {
                        var t = H(e);
                        e.style.backgroundImage = t.backgroundImage;
                      }
                    })(e);
              })(e),
                (function (e, t) {
                  O(e) ||
                    _(e) ||
                    (M(e, t.class_entered),
                    M(e, t.class_exited),
                    M(e, t.class_applied),
                    M(e, t.class_loading),
                    M(e, t.class_loaded),
                    M(e, t.class_error));
                })(e, t),
                T(e),
                F(e);
            },
            pe = ["IMG", "IFRAME", "VIDEO"],
            he = function (e) {
              return e.use_native && "loading" in HTMLImageElement.prototype;
            },
            fe = function (e, t, n) {
              e.forEach(function (e) {
                return (function (e) {
                  return e.isIntersecting || e.intersectionRatio > 0;
                })(e)
                  ? (function (e, t, n, i) {
                      var s = (function (e) {
                        return k.indexOf(S(e)) >= 0;
                      })(e);
                      C(e, "entered"),
                        A(e, n.class_entered),
                        M(e, n.class_exited),
                        (function (e, t, n) {
                          t.unobserve_entered && $(e, n);
                        })(e, n, i),
                        L(n.callback_enter, e, t, i),
                        s || ae(e, n, i);
                    })(e.target, e, t, n)
                  : (function (e, t, n, i) {
                      O(e) ||
                        (A(e, n.class_exited),
                        (function (e, t, n, i) {
                          n.cancel_on_exit &&
                            (function (e) {
                              return S(e) === m;
                            })(e) &&
                            "IMG" === e.tagName &&
                            (ie(e),
                            (function (e) {
                              W(e, function (e) {
                                le(e);
                              }),
                                le(e);
                            })(e),
                            ce(e),
                            M(e, n.class_loading),
                            z(i, -1),
                            T(e),
                            L(n.callback_cancel, e, t, i));
                        })(e, t, n, i),
                        L(n.callback_exit, e, t, i));
                    })(e.target, e, t, n);
              });
            },
            me = function (e) {
              return Array.prototype.slice.call(e);
            },
            ve = function (e) {
              return e.container.querySelectorAll(e.elements_selector);
            },
            ge = function (e) {
              return (function (e) {
                return S(e) === b;
              })(e);
            },
            be = function (e, t) {
              return (function (e) {
                return me(e).filter(O);
              })(e || ve(t));
            },
            ye = function (e, n) {
              var s = a(e);
              (this._settings = s),
                (this.loadingCount = 0),
                (function (e, t) {
                  i &&
                    !he(e) &&
                    (t._observer = new IntersectionObserver(
                      function (n) {
                        fe(n, e, t);
                      },
                      (function (e) {
                        return {
                          root: e.container === document ? null : e.container,
                          rootMargin: e.thresholds || e.threshold + "px",
                        };
                      })(e)
                    ));
                })(s, this),
                (function (e, n) {
                  t &&
                    window.addEventListener("online", function () {
                      !(function (e, t) {
                        var n;
                        ((n = ve(e)), me(n).filter(ge)).forEach(function (t) {
                          M(t, e.class_error), T(t);
                        }),
                          t.update();
                      })(e, n);
                    });
                })(s, this),
                this.update(n);
            };
          return (
            (ye.prototype = {
              update: function (e) {
                var t,
                  s,
                  r = this._settings,
                  o = be(e, r);
                I(this, o.length),
                  !n && i
                    ? he(r)
                      ? (function (e, t, n) {
                          e.forEach(function (e) {
                            -1 !== pe.indexOf(e.tagName) &&
                              (function (e, t, n) {
                                e.setAttribute("loading", "lazy"),
                                  re(e, t, n),
                                  (function (e, t) {
                                    var n = K[e.tagName];
                                    n && n(e, t);
                                  })(e, t),
                                  C(e, y);
                              })(e, t, n);
                          }),
                            I(n, 0);
                        })(o, r, this)
                      : ((s = o),
                        (function (e) {
                          e.disconnect();
                        })((t = this._observer)),
                        (function (e, t) {
                          t.forEach(function (t) {
                            e.observe(t);
                          });
                        })(t, s))
                    : this.loadAll(o);
              },
              destroy: function () {
                this._observer && this._observer.disconnect(),
                  ve(this._settings).forEach(function (e) {
                    F(e);
                  }),
                  delete this._observer,
                  delete this._settings,
                  delete this.loadingCount,
                  delete this.toLoadCount;
              },
              loadAll: function (e) {
                var t = this,
                  n = this._settings;
                be(e, n).forEach(function (e) {
                  $(e, t), ae(e, n, t);
                });
              },
              restoreAll: function () {
                var e = this._settings;
                ve(e).forEach(function (t) {
                  ue(t, e);
                });
              },
            }),
            (ye.load = function (e, t) {
              var n = a(t);
              ae(e, n);
            }),
            (ye.resetStatus = function (e) {
              T(e);
            }),
            t &&
              (function (e, t) {
                if (t)
                  if (t.length) for (var n, i = 0; (n = t[i]); i += 1) l(e, n);
                  else l(e, t);
              })(ye, window.lazyLoadOptions),
            ye
          );
        })();
      },
    },
    t = {};
  function n(i) {
    var s = t[i];
    if (void 0 !== s) return s.exports;
    var r = (t[i] = { exports: {} });
    return e[i].call(r.exports, r, r.exports, n), r.exports;
  }
  (() => {
    "use strict";
    const e = {};
    let t = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function () {
        return (
          t.Android() || t.BlackBerry() || t.iOS() || t.Opera() || t.Windows()
        );
      },
    };
    let i = (e, t = 500, n = 0) => {
        e.classList.contains("_slide") ||
          (e.classList.add("_slide"),
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = `${e.offsetHeight}px`),
          e.offsetHeight,
          (e.style.overflow = "hidden"),
          (e.style.height = n ? `${n}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          window.setTimeout(() => {
            (e.hidden = !n),
              !n && e.style.removeProperty("height"),
              e.style.removeProperty("padding-top"),
              e.style.removeProperty("padding-bottom"),
              e.style.removeProperty("margin-top"),
              e.style.removeProperty("margin-bottom"),
              !n && e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide"),
              document.dispatchEvent(
                new CustomEvent("slideUpDone", { detail: { target: e } })
              );
          }, t));
      },
      s = (e, t = 500, n = 0) => {
        if (!e.classList.contains("_slide")) {
          e.classList.add("_slide"),
            (e.hidden = !e.hidden && null),
            n && e.style.removeProperty("height");
          let i = e.offsetHeight;
          (e.style.overflow = "hidden"),
            (e.style.height = n ? `${n}px` : "0px"),
            (e.style.paddingTop = 0),
            (e.style.paddingBottom = 0),
            (e.style.marginTop = 0),
            (e.style.marginBottom = 0),
            e.offsetHeight,
            (e.style.transitionProperty = "height, margin, padding"),
            (e.style.transitionDuration = t + "ms"),
            (e.style.height = i + "px"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            window.setTimeout(() => {
              e.style.removeProperty("height"),
                e.style.removeProperty("overflow"),
                e.style.removeProperty("transition-duration"),
                e.style.removeProperty("transition-property"),
                e.classList.remove("_slide"),
                document.dispatchEvent(
                  new CustomEvent("slideDownDone", { detail: { target: e } })
                );
            }, t);
        }
      },
      r = !0,
      o = (e = 500) => {
        document.documentElement.classList.contains("lock") ? a(e) : l(e);
      },
      a = (e = 500) => {
        let t = document.querySelector("body");
        if (r) {
          let n = document.querySelectorAll("[data-lp]");
          setTimeout(() => {
            for (let e = 0; e < n.length; e++) {
              n[e].style.paddingRight = "0px";
            }
            (t.style.paddingRight = "0px"),
              document.documentElement.classList.remove("lock");
          }, e),
            (r = !1),
            setTimeout(function () {
              r = !0;
            }, e);
        }
      },
      l = (e = 500) => {
        let t = document.querySelector("body");
        if (r) {
          let n = document.querySelectorAll("[data-lp]");
          for (let e = 0; e < n.length; e++) {
            n[e].style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px";
          }
          (t.style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px"),
            document.documentElement.classList.add("lock"),
            (r = !1),
            setTimeout(function () {
              r = !0;
            }, e);
        }
      };
    const c = document.querySelector(".burger"),
      d = document.querySelector(".menu__list"),
      u = document.querySelector(".search-menu__form");
    function p(e) {
      setTimeout(() => {
        window.FLS && console.log(e);
      }, 0);
    }
    function h(e) {
      return e.filter(function (e, t, n) {
        return n.indexOf(e) === t;
      });
    }
    function f(e, t) {
      const n = Array.from(e).filter(function (e, n, i) {
        if (e.dataset[t]) return e.dataset[t].split(",")[0];
      });
      if (n.length) {
        const e = [];
        n.forEach((n) => {
          const i = {},
            s = n.dataset[t].split(",");
          (i.value = s[0]),
            (i.type = s[1] ? s[1].trim() : "max"),
            (i.item = n),
            e.push(i);
        });
        let i = e.map(function (e) {
          return (
            "(" +
            e.type +
            "-width: " +
            e.value +
            "px)," +
            e.value +
            "," +
            e.type
          );
        });
        i = h(i);
        const s = [];
        if (i.length)
          return (
            i.forEach((t) => {
              const n = t.split(","),
                i = n[1],
                r = n[2],
                o = window.matchMedia(n[0]),
                a = e.filter(function (e) {
                  if (e.value === i && e.type === r) return !0;
                });
              s.push({ itemsArray: a, matchMedia: o });
            }),
            s
          );
      }
    }
    document.addEventListener("click", function (e) {
      const t = e.target,
        n = t == c || c.contains(t),
        i = t == d || d.contains(t),
        s = t == u || u.contains(t),
        r = document.documentElement.classList.contains("menu-open");
      i ||
        n ||
        s ||
        !r ||
        document.documentElement.classList.toggle("menu-open");
    });
    e.popup = new (class {
      constructor(e) {
        let t = {
          logging: !0,
          init: !0,
          attributeOpenButton: "data-popup",
          attributeCloseButton: "data-close",
          fixElementSelector: "[data-lp]",
          youtubeAttribute: "data-youtube",
          youtubePlaceAttribute: "data-youtube-place",
          setAutoplayYoutube: !0,
          classes: {
            popup: "popup",
            popupContent: "popup__content",
            popupActive: "popup_show",
            bodyActive: "popup-show",
          },
          focusCatch: !0,
          closeEsc: !0,
          bodyLock: !0,
          bodyLockDelay: 500,
          hashSettings: { location: !0, goHash: !0 },
          on: {
            beforeOpen: function () {},
            afterOpen: function () {},
            beforeClose: function () {},
            afterClose: function () {},
          },
        };
        (this.isOpen = !1),
          (this.targetOpen = { selector: !1, element: !1 }),
          (this.previousOpen = { selector: !1, element: !1 }),
          (this.lastClosed = { selector: !1, element: !1 }),
          (this._dataValue = !1),
          (this.hash = !1),
          (this._reopen = !1),
          (this._selectorOpen = !1),
          (this.lastFocusEl = !1),
          (this._focusEl = [
            "a[href]",
            'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
            "button:not([disabled]):not([aria-hidden])",
            "select:not([disabled]):not([aria-hidden])",
            "textarea:not([disabled]):not([aria-hidden])",
            "area[href]",
            "iframe",
            "object",
            "embed",
            "[contenteditable]",
            '[tabindex]:not([tabindex^="-"])',
          ]),
          (this.options = {
            ...t,
            ...e,
            classes: { ...t.classes, ...e?.classes },
            hashSettings: { ...t.hashSettings, ...e?.hashSettings },
            on: { ...t.on, ...e?.on },
          }),
          this.options.init && this.initPopups();
      }
      initPopups() {
        this.popupLogging("Проснулся"), this.eventsPopup();
      }
      eventsPopup() {
        document.addEventListener(
          "click",
          function (e) {
            const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
            if (t)
              return (
                e.preventDefault(),
                (this._dataValue = t.getAttribute(
                  this.options.attributeOpenButton
                )
                  ? t.getAttribute(this.options.attributeOpenButton)
                  : "error"),
                "error" !== this._dataValue
                  ? (this.isOpen || (this.lastFocusEl = t),
                    (this.targetOpen.selector = `${this._dataValue}`),
                    (this._selectorOpen = !0),
                    void this.open())
                  : void this.popupLogging(
                      `Ой ой, не заполнен атрибут у ${t.classList}`
                    )
              );
            return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
              (!e.target.closest(`.${this.options.classes.popupContent}`) &&
                this.isOpen)
              ? (e.preventDefault(), void this.close())
              : void 0;
          }.bind(this)
        ),
          document.addEventListener(
            "keydown",
            function (e) {
              if (
                this.options.closeEsc &&
                27 == e.which &&
                "Escape" === e.code &&
                this.isOpen
              )
                return e.preventDefault(), void this.close();
              this.options.focusCatch &&
                9 == e.which &&
                this.isOpen &&
                this._focusCatch(e);
            }.bind(this)
          ),
          this.options.hashSettings.goHash &&
            (window.addEventListener(
              "hashchange",
              function () {
                window.location.hash
                  ? this._openToHash()
                  : this.close(this.targetOpen.selector);
              }.bind(this)
            ),
            window.addEventListener(
              "load",
              function () {
                window.location.hash && this._openToHash();
              }.bind(this)
            ));
      }
      open(e) {
        if (
          (e &&
            "string" == typeof e &&
            "" !== e.trim() &&
            ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
          this.isOpen && ((this._reopen = !0), this.close()),
          this._selectorOpen ||
            (this.targetOpen.selector = this.lastClosed.selector),
          this._reopen || (this.previousActiveElement = document.activeElement),
          (this.targetOpen.element = document.querySelector(
            this.targetOpen.selector
          )),
          this.targetOpen.element)
        ) {
          if (
            this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
          ) {
            const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
                this.options.youtubeAttribute
              )}?rel=0&showinfo=0&autoplay=1`,
              t = document.createElement("iframe");
            t.setAttribute("allowfullscreen", "");
            const n = this.options.setAutoplayYoutube ? "autoplay;" : "";
            t.setAttribute("allow", `${n}; encrypted-media`),
              t.setAttribute("src", e),
              this.targetOpen.element.querySelector(
                `[${this.options.youtubePlaceAttribute}]`
              ) &&
                this.targetOpen.element
                  .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                  .appendChild(t);
          }
          this.options.hashSettings.location &&
            (this._getHash(), this._setHash()),
            this.options.on.beforeOpen(this),
            this.targetOpen.element.classList.add(
              this.options.classes.popupActive
            ),
            document.body.classList.add(this.options.classes.bodyActive),
            this._reopen ? (this._reopen = !1) : o(),
            this.targetOpen.element.setAttribute("aria-hidden", "false"),
            (this.previousOpen.selector = this.targetOpen.selector),
            (this.previousOpen.element = this.targetOpen.element),
            (this._selectorOpen = !1),
            (this.isOpen = !0),
            setTimeout(() => {
              this._focusTrap();
            }, 50),
            document.dispatchEvent(
              new CustomEvent("afterPopupOpen", { detail: { popup: this } })
            ),
            this.popupLogging("Открыл попап");
        } else
          this.popupLogging(
            "Ой ой, такого попапа нет. Проверьте корректность ввода. "
          );
      }
      close(e) {
        e &&
          "string" == typeof e &&
          "" !== e.trim() &&
          (this.previousOpen.selector = e),
          this.isOpen &&
            r &&
            (this.options.on.beforeClose(this),
            this.targetOpen.element.hasAttribute(
              this.options.youtubeAttribute
            ) &&
              this.targetOpen.element.querySelector(
                `[${this.options.youtubePlaceAttribute}]`
              ) &&
              (this.targetOpen.element.querySelector(
                `[${this.options.youtubePlaceAttribute}]`
              ).innerHTML = ""),
            this.previousOpen.element.classList.remove(
              this.options.classes.popupActive
            ),
            this.previousOpen.element.setAttribute("aria-hidden", "true"),
            this._reopen ||
              (document.body.classList.remove(this.options.classes.bodyActive),
              o(),
              (this.isOpen = !1)),
            this._removeHash(),
            this._selectorOpen &&
              ((this.lastClosed.selector = this.previousOpen.selector),
              (this.lastClosed.element = this.previousOpen.element)),
            this.options.on.afterClose(this),
            setTimeout(() => {
              this._focusTrap();
            }, 50),
            this.popupLogging("Закрыл попап"));
      }
      _getHash() {
        this.options.hashSettings.location &&
          (this.hash = this.targetOpen.selector.includes("#")
            ? this.targetOpen.selector
            : this.targetOpen.selector.replace(".", "#"));
      }
      _openToHash() {
        let e = document.querySelector(
          `.${window.location.hash.replace("#", "")}`
        )
          ? `.${window.location.hash.replace("#", "")}`
          : document.querySelector(`${window.location.hash}`)
          ? `${window.location.hash}`
          : null;
        document.querySelector(
          `[${this.options.attributeOpenButton}="${e}"]`
        ) &&
          e &&
          this.open(e);
      }
      _setHash() {
        history.pushState("", "", this.hash);
      }
      _removeHash() {
        history.pushState("", "", window.location.href.split("#")[0]);
      }
      _focusCatch(e) {
        const t = this.targetOpen.element.querySelectorAll(this._focusEl),
          n = Array.prototype.slice.call(t),
          i = n.indexOf(document.activeElement);
        e.shiftKey && 0 === i && (n[n.length - 1].focus(), e.preventDefault()),
          e.shiftKey ||
            i !== n.length - 1 ||
            (n[0].focus(), e.preventDefault());
      }
      _focusTrap() {
        const e = this.previousOpen.element.querySelectorAll(this._focusEl);
        !this.isOpen && this.lastFocusEl
          ? this.lastFocusEl.focus()
          : e[0].focus();
      }
      popupLogging(e) {
        this.options.logging && p(`[Попапос]: ${e}`);
      }
    })({});
    function m(e) {
      return (
        null !== e &&
        "object" == typeof e &&
        "constructor" in e &&
        e.constructor === Object
      );
    }
    function v(e = {}, t = {}) {
      Object.keys(t).forEach((n) => {
        void 0 === e[n]
          ? (e[n] = t[n])
          : m(t[n]) && m(e[n]) && Object.keys(t[n]).length > 0 && v(e[n], t[n]);
      });
    }
    const g = {
      body: {},
      addEventListener() {},
      removeEventListener() {},
      activeElement: { blur() {}, nodeName: "" },
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      createEvent: () => ({ initEvent() {} }),
      createElement: () => ({
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName: () => [],
      }),
      createElementNS: () => ({}),
      importNode: () => null,
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
    };
    function b() {
      const e = "undefined" != typeof document ? document : {};
      return v(e, g), e;
    }
    const y = {
      document: g,
      navigator: { userAgent: "" },
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
      history: { replaceState() {}, pushState() {}, go() {}, back() {} },
      CustomEvent: function () {
        return this;
      },
      addEventListener() {},
      removeEventListener() {},
      getComputedStyle: () => ({ getPropertyValue: () => "" }),
      Image() {},
      Date() {},
      screen: {},
      setTimeout() {},
      clearTimeout() {},
      matchMedia: () => ({}),
      requestAnimationFrame: (e) =>
        "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
      cancelAnimationFrame(e) {
        "undefined" != typeof setTimeout && clearTimeout(e);
      },
    };
    function w() {
      const e = "undefined" != typeof window ? window : {};
      return v(e, y), e;
    }
    class E extends Array {
      constructor(e) {
        "number" == typeof e
          ? super(e)
          : (super(...(e || [])),
            (function (e) {
              const t = e.__proto__;
              Object.defineProperty(e, "__proto__", {
                get: () => t,
                set(e) {
                  t.__proto__ = e;
                },
              });
            })(this));
      }
    }
    function x(e = []) {
      const t = [];
      return (
        e.forEach((e) => {
          Array.isArray(e) ? t.push(...x(e)) : t.push(e);
        }),
        t
      );
    }
    function S(e, t) {
      return Array.prototype.filter.call(e, t);
    }
    function C(e, t) {
      const n = w(),
        i = b();
      let s = [];
      if (!t && e instanceof E) return e;
      if (!e) return new E(s);
      if ("string" == typeof e) {
        const n = e.trim();
        if (n.indexOf("<") >= 0 && n.indexOf(">") >= 0) {
          let e = "div";
          0 === n.indexOf("<li") && (e = "ul"),
            0 === n.indexOf("<tr") && (e = "tbody"),
            (0 !== n.indexOf("<td") && 0 !== n.indexOf("<th")) || (e = "tr"),
            0 === n.indexOf("<tbody") && (e = "table"),
            0 === n.indexOf("<option") && (e = "select");
          const t = i.createElement(e);
          t.innerHTML = n;
          for (let e = 0; e < t.childNodes.length; e += 1)
            s.push(t.childNodes[e]);
        } else
          s = (function (e, t) {
            if ("string" != typeof e) return [e];
            const n = [],
              i = t.querySelectorAll(e);
            for (let e = 0; e < i.length; e += 1) n.push(i[e]);
            return n;
          })(e.trim(), t || i);
      } else if (e.nodeType || e === n || e === i) s.push(e);
      else if (Array.isArray(e)) {
        if (e instanceof E) return e;
        s = e;
      }
      return new E(
        (function (e) {
          const t = [];
          for (let n = 0; n < e.length; n += 1)
            -1 === t.indexOf(e[n]) && t.push(e[n]);
          return t;
        })(s)
      );
    }
    C.fn = E.prototype;
    const T = "resize scroll".split(" ");
    function O(e) {
      return function (...t) {
        if (void 0 === t[0]) {
          for (let t = 0; t < this.length; t += 1)
            T.indexOf(e) < 0 &&
              (e in this[t] ? this[t][e]() : C(this[t]).trigger(e));
          return this;
        }
        return this.on(e, ...t);
      };
    }
    O("click"),
      O("blur"),
      O("focus"),
      O("focusin"),
      O("focusout"),
      O("keyup"),
      O("keydown"),
      O("keypress"),
      O("submit"),
      O("change"),
      O("mousedown"),
      O("mousemove"),
      O("mouseup"),
      O("mouseenter"),
      O("mouseleave"),
      O("mouseout"),
      O("mouseover"),
      O("touchstart"),
      O("touchend"),
      O("touchmove"),
      O("resize"),
      O("scroll");
    const _ = {
      addClass: function (...e) {
        const t = x(e.map((e) => e.split(" ")));
        return (
          this.forEach((e) => {
            e.classList.add(...t);
          }),
          this
        );
      },
      removeClass: function (...e) {
        const t = x(e.map((e) => e.split(" ")));
        return (
          this.forEach((e) => {
            e.classList.remove(...t);
          }),
          this
        );
      },
      hasClass: function (...e) {
        const t = x(e.map((e) => e.split(" ")));
        return (
          S(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
            .length > 0
        );
      },
      toggleClass: function (...e) {
        const t = x(e.map((e) => e.split(" ")));
        this.forEach((e) => {
          t.forEach((t) => {
            e.classList.toggle(t);
          });
        });
      },
      attr: function (e, t) {
        if (1 === arguments.length && "string" == typeof e)
          return this[0] ? this[0].getAttribute(e) : void 0;
        for (let n = 0; n < this.length; n += 1)
          if (2 === arguments.length) this[n].setAttribute(e, t);
          else
            for (const t in e)
              (this[n][t] = e[t]), this[n].setAttribute(t, e[t]);
        return this;
      },
      removeAttr: function (e) {
        for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
        return this;
      },
      transform: function (e) {
        for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
        return this;
      },
      transition: function (e) {
        for (let t = 0; t < this.length; t += 1)
          this[t].style.transitionDuration =
            "string" != typeof e ? `${e}ms` : e;
        return this;
      },
      on: function (...e) {
        let [t, n, i, s] = e;
        function r(e) {
          const t = e.target;
          if (!t) return;
          const s = e.target.dom7EventData || [];
          if ((s.indexOf(e) < 0 && s.unshift(e), C(t).is(n))) i.apply(t, s);
          else {
            const e = C(t).parents();
            for (let t = 0; t < e.length; t += 1)
              C(e[t]).is(n) && i.apply(e[t], s);
          }
        }
        function o(e) {
          const t = (e && e.target && e.target.dom7EventData) || [];
          t.indexOf(e) < 0 && t.unshift(e), i.apply(this, t);
        }
        "function" == typeof e[1] && (([t, i, s] = e), (n = void 0)),
          s || (s = !1);
        const a = t.split(" ");
        let l;
        for (let e = 0; e < this.length; e += 1) {
          const t = this[e];
          if (n)
            for (l = 0; l < a.length; l += 1) {
              const e = a[l];
              t.dom7LiveListeners || (t.dom7LiveListeners = {}),
                t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
                t.dom7LiveListeners[e].push({ listener: i, proxyListener: r }),
                t.addEventListener(e, r, s);
            }
          else
            for (l = 0; l < a.length; l += 1) {
              const e = a[l];
              t.dom7Listeners || (t.dom7Listeners = {}),
                t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
                t.dom7Listeners[e].push({ listener: i, proxyListener: o }),
                t.addEventListener(e, o, s);
            }
        }
        return this;
      },
      off: function (...e) {
        let [t, n, i, s] = e;
        "function" == typeof e[1] && (([t, i, s] = e), (n = void 0)),
          s || (s = !1);
        const r = t.split(" ");
        for (let e = 0; e < r.length; e += 1) {
          const t = r[e];
          for (let e = 0; e < this.length; e += 1) {
            const r = this[e];
            let o;
            if (
              (!n && r.dom7Listeners
                ? (o = r.dom7Listeners[t])
                : n && r.dom7LiveListeners && (o = r.dom7LiveListeners[t]),
              o && o.length)
            )
              for (let e = o.length - 1; e >= 0; e -= 1) {
                const n = o[e];
                (i && n.listener === i) ||
                (i &&
                  n.listener &&
                  n.listener.dom7proxy &&
                  n.listener.dom7proxy === i)
                  ? (r.removeEventListener(t, n.proxyListener, s),
                    o.splice(e, 1))
                  : i ||
                    (r.removeEventListener(t, n.proxyListener, s),
                    o.splice(e, 1));
              }
          }
        }
        return this;
      },
      trigger: function (...e) {
        const t = w(),
          n = e[0].split(" "),
          i = e[1];
        for (let s = 0; s < n.length; s += 1) {
          const r = n[s];
          for (let n = 0; n < this.length; n += 1) {
            const s = this[n];
            if (t.CustomEvent) {
              const n = new t.CustomEvent(r, {
                detail: i,
                bubbles: !0,
                cancelable: !0,
              });
              (s.dom7EventData = e.filter((e, t) => t > 0)),
                s.dispatchEvent(n),
                (s.dom7EventData = []),
                delete s.dom7EventData;
            }
          }
        }
        return this;
      },
      transitionEnd: function (e) {
        const t = this;
        return (
          e &&
            t.on("transitionend", function n(i) {
              i.target === this && (e.call(this, i), t.off("transitionend", n));
            }),
          this
        );
      },
      outerWidth: function (e) {
        if (this.length > 0) {
          if (e) {
            const e = this.styles();
            return (
              this[0].offsetWidth +
              parseFloat(e.getPropertyValue("margin-right")) +
              parseFloat(e.getPropertyValue("margin-left"))
            );
          }
          return this[0].offsetWidth;
        }
        return null;
      },
      outerHeight: function (e) {
        if (this.length > 0) {
          if (e) {
            const e = this.styles();
            return (
              this[0].offsetHeight +
              parseFloat(e.getPropertyValue("margin-top")) +
              parseFloat(e.getPropertyValue("margin-bottom"))
            );
          }
          return this[0].offsetHeight;
        }
        return null;
      },
      styles: function () {
        const e = w();
        return this[0] ? e.getComputedStyle(this[0], null) : {};
      },
      offset: function () {
        if (this.length > 0) {
          const e = w(),
            t = b(),
            n = this[0],
            i = n.getBoundingClientRect(),
            s = t.body,
            r = n.clientTop || s.clientTop || 0,
            o = n.clientLeft || s.clientLeft || 0,
            a = n === e ? e.scrollY : n.scrollTop,
            l = n === e ? e.scrollX : n.scrollLeft;
          return { top: i.top + a - r, left: i.left + l - o };
        }
        return null;
      },
      css: function (e, t) {
        const n = w();
        let i;
        if (1 === arguments.length) {
          if ("string" != typeof e) {
            for (i = 0; i < this.length; i += 1)
              for (const t in e) this[i].style[t] = e[t];
            return this;
          }
          if (this[0])
            return n.getComputedStyle(this[0], null).getPropertyValue(e);
        }
        if (2 === arguments.length && "string" == typeof e) {
          for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
          return this;
        }
        return this;
      },
      each: function (e) {
        return e
          ? (this.forEach((t, n) => {
              e.apply(t, [t, n]);
            }),
            this)
          : this;
      },
      html: function (e) {
        if (void 0 === e) return this[0] ? this[0].innerHTML : null;
        for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
        return this;
      },
      text: function (e) {
        if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
        for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
        return this;
      },
      is: function (e) {
        const t = w(),
          n = b(),
          i = this[0];
        let s, r;
        if (!i || void 0 === e) return !1;
        if ("string" == typeof e) {
          if (i.matches) return i.matches(e);
          if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
          if (i.msMatchesSelector) return i.msMatchesSelector(e);
          for (s = C(e), r = 0; r < s.length; r += 1) if (s[r] === i) return !0;
          return !1;
        }
        if (e === n) return i === n;
        if (e === t) return i === t;
        if (e.nodeType || e instanceof E) {
          for (s = e.nodeType ? [e] : e, r = 0; r < s.length; r += 1)
            if (s[r] === i) return !0;
          return !1;
        }
        return !1;
      },
      index: function () {
        let e,
          t = this[0];
        if (t) {
          for (e = 0; null !== (t = t.previousSibling); )
            1 === t.nodeType && (e += 1);
          return e;
        }
      },
      eq: function (e) {
        if (void 0 === e) return this;
        const t = this.length;
        if (e > t - 1) return C([]);
        if (e < 0) {
          const n = t + e;
          return C(n < 0 ? [] : [this[n]]);
        }
        return C([this[e]]);
      },
      append: function (...e) {
        let t;
        const n = b();
        for (let i = 0; i < e.length; i += 1) {
          t = e[i];
          for (let e = 0; e < this.length; e += 1)
            if ("string" == typeof t) {
              const i = n.createElement("div");
              for (i.innerHTML = t; i.firstChild; )
                this[e].appendChild(i.firstChild);
            } else if (t instanceof E)
              for (let n = 0; n < t.length; n += 1) this[e].appendChild(t[n]);
            else this[e].appendChild(t);
        }
        return this;
      },
      prepend: function (e) {
        const t = b();
        let n, i;
        for (n = 0; n < this.length; n += 1)
          if ("string" == typeof e) {
            const s = t.createElement("div");
            for (s.innerHTML = e, i = s.childNodes.length - 1; i >= 0; i -= 1)
              this[n].insertBefore(s.childNodes[i], this[n].childNodes[0]);
          } else if (e instanceof E)
            for (i = 0; i < e.length; i += 1)
              this[n].insertBefore(e[i], this[n].childNodes[0]);
          else this[n].insertBefore(e, this[n].childNodes[0]);
        return this;
      },
      next: function (e) {
        return this.length > 0
          ? e
            ? this[0].nextElementSibling && C(this[0].nextElementSibling).is(e)
              ? C([this[0].nextElementSibling])
              : C([])
            : this[0].nextElementSibling
            ? C([this[0].nextElementSibling])
            : C([])
          : C([]);
      },
      nextAll: function (e) {
        const t = [];
        let n = this[0];
        if (!n) return C([]);
        for (; n.nextElementSibling; ) {
          const i = n.nextElementSibling;
          e ? C(i).is(e) && t.push(i) : t.push(i), (n = i);
        }
        return C(t);
      },
      prev: function (e) {
        if (this.length > 0) {
          const t = this[0];
          return e
            ? t.previousElementSibling && C(t.previousElementSibling).is(e)
              ? C([t.previousElementSibling])
              : C([])
            : t.previousElementSibling
            ? C([t.previousElementSibling])
            : C([]);
        }
        return C([]);
      },
      prevAll: function (e) {
        const t = [];
        let n = this[0];
        if (!n) return C([]);
        for (; n.previousElementSibling; ) {
          const i = n.previousElementSibling;
          e ? C(i).is(e) && t.push(i) : t.push(i), (n = i);
        }
        return C(t);
      },
      parent: function (e) {
        const t = [];
        for (let n = 0; n < this.length; n += 1)
          null !== this[n].parentNode &&
            (e
              ? C(this[n].parentNode).is(e) && t.push(this[n].parentNode)
              : t.push(this[n].parentNode));
        return C(t);
      },
      parents: function (e) {
        const t = [];
        for (let n = 0; n < this.length; n += 1) {
          let i = this[n].parentNode;
          for (; i; )
            e ? C(i).is(e) && t.push(i) : t.push(i), (i = i.parentNode);
        }
        return C(t);
      },
      closest: function (e) {
        let t = this;
        return void 0 === e ? C([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
      },
      find: function (e) {
        const t = [];
        for (let n = 0; n < this.length; n += 1) {
          const i = this[n].querySelectorAll(e);
          for (let e = 0; e < i.length; e += 1) t.push(i[e]);
        }
        return C(t);
      },
      children: function (e) {
        const t = [];
        for (let n = 0; n < this.length; n += 1) {
          const i = this[n].children;
          for (let n = 0; n < i.length; n += 1)
            (e && !C(i[n]).is(e)) || t.push(i[n]);
        }
        return C(t);
      },
      filter: function (e) {
        return C(S(this, e));
      },
      remove: function () {
        for (let e = 0; e < this.length; e += 1)
          this[e].parentNode && this[e].parentNode.removeChild(this[e]);
        return this;
      },
    };
    Object.keys(_).forEach((e) => {
      Object.defineProperty(C.fn, e, { value: _[e], writable: !0 });
    });
    const k = C;
    function L(e, t) {
      return void 0 === t && (t = 0), setTimeout(e, t);
    }
    function A() {
      return Date.now();
    }
    function M(e, t) {
      void 0 === t && (t = "x");
      const n = w();
      let i, s, r;
      const o = (function (e) {
        const t = w();
        let n;
        return (
          t.getComputedStyle && (n = t.getComputedStyle(e, null)),
          !n && e.currentStyle && (n = e.currentStyle),
          n || (n = e.style),
          n
        );
      })(e);
      return (
        n.WebKitCSSMatrix
          ? ((s = o.transform || o.webkitTransform),
            s.split(",").length > 6 &&
              (s = s
                .split(", ")
                .map((e) => e.replace(",", "."))
                .join(", ")),
            (r = new n.WebKitCSSMatrix("none" === s ? "" : s)))
          : ((r =
              o.MozTransform ||
              o.OTransform ||
              o.MsTransform ||
              o.msTransform ||
              o.transform ||
              o
                .getPropertyValue("transform")
                .replace("translate(", "matrix(1, 0, 0, 1,")),
            (i = r.toString().split(","))),
        "x" === t &&
          (s = n.WebKitCSSMatrix
            ? r.m41
            : 16 === i.length
            ? parseFloat(i[12])
            : parseFloat(i[4])),
        "y" === t &&
          (s = n.WebKitCSSMatrix
            ? r.m42
            : 16 === i.length
            ? parseFloat(i[13])
            : parseFloat(i[5])),
        s || 0
      );
    }
    function P(e) {
      return (
        "object" == typeof e &&
        null !== e &&
        e.constructor &&
        "Object" === Object.prototype.toString.call(e).slice(8, -1)
      );
    }
    function $(e) {
      return "undefined" != typeof window && void 0 !== window.HTMLElement
        ? e instanceof HTMLElement
        : e && (1 === e.nodeType || 11 === e.nodeType);
    }
    function z() {
      const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
        t = ["__proto__", "constructor", "prototype"];
      for (let n = 1; n < arguments.length; n += 1) {
        const i = n < 0 || arguments.length <= n ? void 0 : arguments[n];
        if (null != i && !$(i)) {
          const n = Object.keys(Object(i)).filter((e) => t.indexOf(e) < 0);
          for (let t = 0, s = n.length; t < s; t += 1) {
            const s = n[t],
              r = Object.getOwnPropertyDescriptor(i, s);
            void 0 !== r &&
              r.enumerable &&
              (P(e[s]) && P(i[s])
                ? i[s].__swiper__
                  ? (e[s] = i[s])
                  : z(e[s], i[s])
                : !P(e[s]) && P(i[s])
                ? ((e[s] = {}), i[s].__swiper__ ? (e[s] = i[s]) : z(e[s], i[s]))
                : (e[s] = i[s]));
          }
        }
      }
      return e;
    }
    function I(e, t, n) {
      e.style.setProperty(t, n);
    }
    function N(e) {
      let { swiper: t, targetPosition: n, side: i } = e;
      const s = w(),
        r = -t.translate;
      let o,
        a = null;
      const l = t.params.speed;
      (t.wrapperEl.style.scrollSnapType = "none"),
        s.cancelAnimationFrame(t.cssModeFrameID);
      const c = n > r ? "next" : "prev",
        d = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
        u = () => {
          (o = new Date().getTime()), null === a && (a = o);
          const e = Math.max(Math.min((o - a) / l, 1), 0),
            c = 0.5 - Math.cos(e * Math.PI) / 2;
          let p = r + c * (n - r);
          if ((d(p, n) && (p = n), t.wrapperEl.scrollTo({ [i]: p }), d(p, n)))
            return (
              (t.wrapperEl.style.overflow = "hidden"),
              (t.wrapperEl.style.scrollSnapType = ""),
              setTimeout(() => {
                (t.wrapperEl.style.overflow = ""),
                  t.wrapperEl.scrollTo({ [i]: p });
              }),
              void s.cancelAnimationFrame(t.cssModeFrameID)
            );
          t.cssModeFrameID = s.requestAnimationFrame(u);
        };
      u();
    }
    let W, B, D;
    function R() {
      return (
        W ||
          (W = (function () {
            const e = w(),
              t = b();
            return {
              smoothScroll:
                t.documentElement &&
                "scrollBehavior" in t.documentElement.style,
              touch: !!(
                "ontouchstart" in e ||
                (e.DocumentTouch && t instanceof e.DocumentTouch)
              ),
              passiveListener: (function () {
                let t = !1;
                try {
                  const n = Object.defineProperty({}, "passive", {
                    get() {
                      t = !0;
                    },
                  });
                  e.addEventListener("testPassiveListener", null, n);
                } catch (e) {}
                return t;
              })(),
              gestures: "ongesturestart" in e,
            };
          })()),
        W
      );
    }
    function j(e) {
      return (
        void 0 === e && (e = {}),
        B ||
          (B = (function (e) {
            let { userAgent: t } = void 0 === e ? {} : e;
            const n = R(),
              i = w(),
              s = i.navigator.platform,
              r = t || i.navigator.userAgent,
              o = { ios: !1, android: !1 },
              a = i.screen.width,
              l = i.screen.height,
              c = r.match(/(Android);?[\s\/]+([\d.]+)?/);
            let d = r.match(/(iPad).*OS\s([\d_]+)/);
            const u = r.match(/(iPod)(.*OS\s([\d_]+))?/),
              p = !d && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
              h = "Win32" === s;
            let f = "MacIntel" === s;
            return (
              !d &&
                f &&
                n.touch &&
                [
                  "1024x1366",
                  "1366x1024",
                  "834x1194",
                  "1194x834",
                  "834x1112",
                  "1112x834",
                  "768x1024",
                  "1024x768",
                  "820x1180",
                  "1180x820",
                  "810x1080",
                  "1080x810",
                ].indexOf(`${a}x${l}`) >= 0 &&
                ((d = r.match(/(Version)\/([\d.]+)/)),
                d || (d = [0, 1, "13_0_0"]),
                (f = !1)),
              c && !h && ((o.os = "android"), (o.android = !0)),
              (d || p || u) && ((o.os = "ios"), (o.ios = !0)),
              o
            );
          })(e)),
        B
      );
    }
    function q() {
      return (
        D ||
          (D = (function () {
            const e = w();
            return {
              isSafari: (function () {
                const t = e.navigator.userAgent.toLowerCase();
                return (
                  t.indexOf("safari") >= 0 &&
                  t.indexOf("chrome") < 0 &&
                  t.indexOf("android") < 0
                );
              })(),
              isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                e.navigator.userAgent
              ),
            };
          })()),
        D
      );
    }
    const G = {
      on(e, t, n) {
        const i = this;
        if ("function" != typeof t) return i;
        const s = n ? "unshift" : "push";
        return (
          e.split(" ").forEach((e) => {
            i.eventsListeners[e] || (i.eventsListeners[e] = []),
              i.eventsListeners[e][s](t);
          }),
          i
        );
      },
      once(e, t, n) {
        const i = this;
        if ("function" != typeof t) return i;
        function s() {
          i.off(e, s), s.__emitterProxy && delete s.__emitterProxy;
          for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
            r[o] = arguments[o];
          t.apply(i, r);
        }
        return (s.__emitterProxy = t), i.on(e, s, n);
      },
      onAny(e, t) {
        const n = this;
        if ("function" != typeof e) return n;
        const i = t ? "unshift" : "push";
        return (
          n.eventsAnyListeners.indexOf(e) < 0 && n.eventsAnyListeners[i](e), n
        );
      },
      offAny(e) {
        const t = this;
        if (!t.eventsAnyListeners) return t;
        const n = t.eventsAnyListeners.indexOf(e);
        return n >= 0 && t.eventsAnyListeners.splice(n, 1), t;
      },
      off(e, t) {
        const n = this;
        return n.eventsListeners
          ? (e.split(" ").forEach((e) => {
              void 0 === t
                ? (n.eventsListeners[e] = [])
                : n.eventsListeners[e] &&
                  n.eventsListeners[e].forEach((i, s) => {
                    (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                      n.eventsListeners[e].splice(s, 1);
                  });
            }),
            n)
          : n;
      },
      emit() {
        const e = this;
        if (!e.eventsListeners) return e;
        let t, n, i;
        for (var s = arguments.length, r = new Array(s), o = 0; o < s; o++)
          r[o] = arguments[o];
        "string" == typeof r[0] || Array.isArray(r[0])
          ? ((t = r[0]), (n = r.slice(1, r.length)), (i = e))
          : ((t = r[0].events), (n = r[0].data), (i = r[0].context || e)),
          n.unshift(i);
        return (
          (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
            e.eventsAnyListeners &&
              e.eventsAnyListeners.length &&
              e.eventsAnyListeners.forEach((e) => {
                e.apply(i, [t, ...n]);
              }),
              e.eventsListeners &&
                e.eventsListeners[t] &&
                e.eventsListeners[t].forEach((e) => {
                  e.apply(i, n);
                });
          }),
          e
        );
      },
    };
    const H = {
      updateSize: function () {
        const e = this;
        let t, n;
        const i = e.$el;
        (t =
          void 0 !== e.params.width && null !== e.params.width
            ? e.params.width
            : i[0].clientWidth),
          (n =
            void 0 !== e.params.height && null !== e.params.height
              ? e.params.height
              : i[0].clientHeight),
          (0 === t && e.isHorizontal()) ||
            (0 === n && e.isVertical()) ||
            ((t =
              t -
              parseInt(i.css("padding-left") || 0, 10) -
              parseInt(i.css("padding-right") || 0, 10)),
            (n =
              n -
              parseInt(i.css("padding-top") || 0, 10) -
              parseInt(i.css("padding-bottom") || 0, 10)),
            Number.isNaN(t) && (t = 0),
            Number.isNaN(n) && (n = 0),
            Object.assign(e, {
              width: t,
              height: n,
              size: e.isHorizontal() ? t : n,
            }));
      },
      updateSlides: function () {
        const e = this;
        function t(t) {
          return e.isHorizontal()
            ? t
            : {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom",
              }[t];
        }
        function n(e, n) {
          return parseFloat(e.getPropertyValue(t(n)) || 0);
        }
        const i = e.params,
          { $wrapperEl: s, size: r, rtlTranslate: o, wrongRTL: a } = e,
          l = e.virtual && i.virtual.enabled,
          c = l ? e.virtual.slides.length : e.slides.length,
          d = s.children(`.${e.params.slideClass}`),
          u = l ? e.virtual.slides.length : d.length;
        let p = [];
        const h = [],
          f = [];
        let m = i.slidesOffsetBefore;
        "function" == typeof m && (m = i.slidesOffsetBefore.call(e));
        let v = i.slidesOffsetAfter;
        "function" == typeof v && (v = i.slidesOffsetAfter.call(e));
        const g = e.snapGrid.length,
          b = e.slidesGrid.length;
        let y = i.spaceBetween,
          w = -m,
          E = 0,
          x = 0;
        if (void 0 === r) return;
        "string" == typeof y &&
          y.indexOf("%") >= 0 &&
          (y = (parseFloat(y.replace("%", "")) / 100) * r),
          (e.virtualSize = -y),
          o
            ? d.css({ marginLeft: "", marginBottom: "", marginTop: "" })
            : d.css({ marginRight: "", marginBottom: "", marginTop: "" }),
          i.centeredSlides &&
            i.cssMode &&
            (I(e.wrapperEl, "--swiper-centered-offset-before", ""),
            I(e.wrapperEl, "--swiper-centered-offset-after", ""));
        const S = i.grid && i.grid.rows > 1 && e.grid;
        let C;
        S && e.grid.initSlides(u);
        const T =
          "auto" === i.slidesPerView &&
          i.breakpoints &&
          Object.keys(i.breakpoints).filter(
            (e) => void 0 !== i.breakpoints[e].slidesPerView
          ).length > 0;
        for (let s = 0; s < u; s += 1) {
          C = 0;
          const o = d.eq(s);
          if (
            (S && e.grid.updateSlide(s, o, u, t), "none" !== o.css("display"))
          ) {
            if ("auto" === i.slidesPerView) {
              T && (d[s].style[t("width")] = "");
              const r = getComputedStyle(o[0]),
                a = o[0].style.transform,
                l = o[0].style.webkitTransform;
              if (
                (a && (o[0].style.transform = "none"),
                l && (o[0].style.webkitTransform = "none"),
                i.roundLengths)
              )
                C = e.isHorizontal() ? o.outerWidth(!0) : o.outerHeight(!0);
              else {
                const e = n(r, "width"),
                  t = n(r, "padding-left"),
                  i = n(r, "padding-right"),
                  s = n(r, "margin-left"),
                  a = n(r, "margin-right"),
                  l = r.getPropertyValue("box-sizing");
                if (l && "border-box" === l) C = e + s + a;
                else {
                  const { clientWidth: n, offsetWidth: r } = o[0];
                  C = e + t + i + s + a + (r - n);
                }
              }
              a && (o[0].style.transform = a),
                l && (o[0].style.webkitTransform = l),
                i.roundLengths && (C = Math.floor(C));
            } else
              (C = (r - (i.slidesPerView - 1) * y) / i.slidesPerView),
                i.roundLengths && (C = Math.floor(C)),
                d[s] && (d[s].style[t("width")] = `${C}px`);
            d[s] && (d[s].swiperSlideSize = C),
              f.push(C),
              i.centeredSlides
                ? ((w = w + C / 2 + E / 2 + y),
                  0 === E && 0 !== s && (w = w - r / 2 - y),
                  0 === s && (w = w - r / 2 - y),
                  Math.abs(w) < 0.001 && (w = 0),
                  i.roundLengths && (w = Math.floor(w)),
                  x % i.slidesPerGroup == 0 && p.push(w),
                  h.push(w))
                : (i.roundLengths && (w = Math.floor(w)),
                  (x - Math.min(e.params.slidesPerGroupSkip, x)) %
                    e.params.slidesPerGroup ==
                    0 && p.push(w),
                  h.push(w),
                  (w = w + C + y)),
              (e.virtualSize += C + y),
              (E = C),
              (x += 1);
          }
        }
        if (
          ((e.virtualSize = Math.max(e.virtualSize, r) + v),
          o &&
            a &&
            ("slide" === i.effect || "coverflow" === i.effect) &&
            s.css({ width: `${e.virtualSize + i.spaceBetween}px` }),
          i.setWrapperSize &&
            s.css({ [t("width")]: `${e.virtualSize + i.spaceBetween}px` }),
          S && e.grid.updateWrapperSize(C, p, t),
          !i.centeredSlides)
        ) {
          const t = [];
          for (let n = 0; n < p.length; n += 1) {
            let s = p[n];
            i.roundLengths && (s = Math.floor(s)),
              p[n] <= e.virtualSize - r && t.push(s);
          }
          (p = t),
            Math.floor(e.virtualSize - r) - Math.floor(p[p.length - 1]) > 1 &&
              p.push(e.virtualSize - r);
        }
        if ((0 === p.length && (p = [0]), 0 !== i.spaceBetween)) {
          const n = e.isHorizontal() && o ? "marginLeft" : t("marginRight");
          d.filter((e, t) => !i.cssMode || t !== d.length - 1).css({
            [n]: `${y}px`,
          });
        }
        if (i.centeredSlides && i.centeredSlidesBounds) {
          let e = 0;
          f.forEach((t) => {
            e += t + (i.spaceBetween ? i.spaceBetween : 0);
          }),
            (e -= i.spaceBetween);
          const t = e - r;
          p = p.map((e) => (e < 0 ? -m : e > t ? t + v : e));
        }
        if (i.centerInsufficientSlides) {
          let e = 0;
          if (
            (f.forEach((t) => {
              e += t + (i.spaceBetween ? i.spaceBetween : 0);
            }),
            (e -= i.spaceBetween),
            e < r)
          ) {
            const t = (r - e) / 2;
            p.forEach((e, n) => {
              p[n] = e - t;
            }),
              h.forEach((e, n) => {
                h[n] = e + t;
              });
          }
        }
        if (
          (Object.assign(e, {
            slides: d,
            snapGrid: p,
            slidesGrid: h,
            slidesSizesGrid: f,
          }),
          i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
        ) {
          I(e.wrapperEl, "--swiper-centered-offset-before", -p[0] + "px"),
            I(
              e.wrapperEl,
              "--swiper-centered-offset-after",
              e.size / 2 - f[f.length - 1] / 2 + "px"
            );
          const t = -e.snapGrid[0],
            n = -e.slidesGrid[0];
          (e.snapGrid = e.snapGrid.map((e) => e + t)),
            (e.slidesGrid = e.slidesGrid.map((e) => e + n));
        }
        if (
          (u !== c && e.emit("slidesLengthChange"),
          p.length !== g &&
            (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
          h.length !== b && e.emit("slidesGridLengthChange"),
          i.watchSlidesProgress && e.updateSlidesOffset(),
          !(l || i.cssMode || ("slide" !== i.effect && "fade" !== i.effect)))
        ) {
          const t = `${i.containerModifierClass}backface-hidden`,
            n = e.$el.hasClass(t);
          u <= i.maxBackfaceHiddenSlides
            ? n || e.$el.addClass(t)
            : n && e.$el.removeClass(t);
        }
      },
      updateAutoHeight: function (e) {
        const t = this,
          n = [],
          i = t.virtual && t.params.virtual.enabled;
        let s,
          r = 0;
        "number" == typeof e
          ? t.setTransition(e)
          : !0 === e && t.setTransition(t.params.speed);
        const o = (e) =>
          i
            ? t.slides.filter(
                (t) =>
                  parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
              )[0]
            : t.slides.eq(e)[0];
        if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
          if (t.params.centeredSlides)
            t.visibleSlides.each((e) => {
              n.push(e);
            });
          else
            for (s = 0; s < Math.ceil(t.params.slidesPerView); s += 1) {
              const e = t.activeIndex + s;
              if (e > t.slides.length && !i) break;
              n.push(o(e));
            }
        else n.push(o(t.activeIndex));
        for (s = 0; s < n.length; s += 1)
          if (void 0 !== n[s]) {
            const e = n[s].offsetHeight;
            r = e > r ? e : r;
          }
        (r || 0 === r) && t.$wrapperEl.css("height", `${r}px`);
      },
      updateSlidesOffset: function () {
        const e = this,
          t = e.slides;
        for (let n = 0; n < t.length; n += 1)
          t[n].swiperSlideOffset = e.isHorizontal()
            ? t[n].offsetLeft
            : t[n].offsetTop;
      },
      updateSlidesProgress: function (e) {
        void 0 === e && (e = (this && this.translate) || 0);
        const t = this,
          n = t.params,
          { slides: i, rtlTranslate: s, snapGrid: r } = t;
        if (0 === i.length) return;
        void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
        let o = -e;
        s && (o = e),
          i.removeClass(n.slideVisibleClass),
          (t.visibleSlidesIndexes = []),
          (t.visibleSlides = []);
        for (let e = 0; e < i.length; e += 1) {
          const a = i[e];
          let l = a.swiperSlideOffset;
          n.cssMode && n.centeredSlides && (l -= i[0].swiperSlideOffset);
          const c =
              (o + (n.centeredSlides ? t.minTranslate() : 0) - l) /
              (a.swiperSlideSize + n.spaceBetween),
            d =
              (o - r[0] + (n.centeredSlides ? t.minTranslate() : 0) - l) /
              (a.swiperSlideSize + n.spaceBetween),
            u = -(o - l),
            p = u + t.slidesSizesGrid[e];
          ((u >= 0 && u < t.size - 1) ||
            (p > 1 && p <= t.size) ||
            (u <= 0 && p >= t.size)) &&
            (t.visibleSlides.push(a),
            t.visibleSlidesIndexes.push(e),
            i.eq(e).addClass(n.slideVisibleClass)),
            (a.progress = s ? -c : c),
            (a.originalProgress = s ? -d : d);
        }
        t.visibleSlides = k(t.visibleSlides);
      },
      updateProgress: function (e) {
        const t = this;
        if (void 0 === e) {
          const n = t.rtlTranslate ? -1 : 1;
          e = (t && t.translate && t.translate * n) || 0;
        }
        const n = t.params,
          i = t.maxTranslate() - t.minTranslate();
        let { progress: s, isBeginning: r, isEnd: o } = t;
        const a = r,
          l = o;
        0 === i
          ? ((s = 0), (r = !0), (o = !0))
          : ((s = (e - t.minTranslate()) / i), (r = s <= 0), (o = s >= 1)),
          Object.assign(t, { progress: s, isBeginning: r, isEnd: o }),
          (n.watchSlidesProgress || (n.centeredSlides && n.autoHeight)) &&
            t.updateSlidesProgress(e),
          r && !a && t.emit("reachBeginning toEdge"),
          o && !l && t.emit("reachEnd toEdge"),
          ((a && !r) || (l && !o)) && t.emit("fromEdge"),
          t.emit("progress", s);
      },
      updateSlidesClasses: function () {
        const e = this,
          {
            slides: t,
            params: n,
            $wrapperEl: i,
            activeIndex: s,
            realIndex: r,
          } = e,
          o = e.virtual && n.virtual.enabled;
        let a;
        t.removeClass(
          `${n.slideActiveClass} ${n.slideNextClass} ${n.slidePrevClass} ${n.slideDuplicateActiveClass} ${n.slideDuplicateNextClass} ${n.slideDuplicatePrevClass}`
        ),
          (a = o
            ? e.$wrapperEl.find(
                `.${n.slideClass}[data-swiper-slide-index="${s}"]`
              )
            : t.eq(s)),
          a.addClass(n.slideActiveClass),
          n.loop &&
            (a.hasClass(n.slideDuplicateClass)
              ? i
                  .children(
                    `.${n.slideClass}:not(.${n.slideDuplicateClass})[data-swiper-slide-index="${r}"]`
                  )
                  .addClass(n.slideDuplicateActiveClass)
              : i
                  .children(
                    `.${n.slideClass}.${n.slideDuplicateClass}[data-swiper-slide-index="${r}"]`
                  )
                  .addClass(n.slideDuplicateActiveClass));
        let l = a.nextAll(`.${n.slideClass}`).eq(0).addClass(n.slideNextClass);
        n.loop &&
          0 === l.length &&
          ((l = t.eq(0)), l.addClass(n.slideNextClass));
        let c = a.prevAll(`.${n.slideClass}`).eq(0).addClass(n.slidePrevClass);
        n.loop &&
          0 === c.length &&
          ((c = t.eq(-1)), c.addClass(n.slidePrevClass)),
          n.loop &&
            (l.hasClass(n.slideDuplicateClass)
              ? i
                  .children(
                    `.${n.slideClass}:not(.${
                      n.slideDuplicateClass
                    })[data-swiper-slide-index="${l.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(n.slideDuplicateNextClass)
              : i
                  .children(
                    `.${n.slideClass}.${
                      n.slideDuplicateClass
                    }[data-swiper-slide-index="${l.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(n.slideDuplicateNextClass),
            c.hasClass(n.slideDuplicateClass)
              ? i
                  .children(
                    `.${n.slideClass}:not(.${
                      n.slideDuplicateClass
                    })[data-swiper-slide-index="${c.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(n.slideDuplicatePrevClass)
              : i
                  .children(
                    `.${n.slideClass}.${
                      n.slideDuplicateClass
                    }[data-swiper-slide-index="${c.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(n.slideDuplicatePrevClass)),
          e.emitSlidesClasses();
      },
      updateActiveIndex: function (e) {
        const t = this,
          n = t.rtlTranslate ? t.translate : -t.translate,
          {
            slidesGrid: i,
            snapGrid: s,
            params: r,
            activeIndex: o,
            realIndex: a,
            snapIndex: l,
          } = t;
        let c,
          d = e;
        if (void 0 === d) {
          for (let e = 0; e < i.length; e += 1)
            void 0 !== i[e + 1]
              ? n >= i[e] && n < i[e + 1] - (i[e + 1] - i[e]) / 2
                ? (d = e)
                : n >= i[e] && n < i[e + 1] && (d = e + 1)
              : n >= i[e] && (d = e);
          r.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0);
        }
        if (s.indexOf(n) >= 0) c = s.indexOf(n);
        else {
          const e = Math.min(r.slidesPerGroupSkip, d);
          c = e + Math.floor((d - e) / r.slidesPerGroup);
        }
        if ((c >= s.length && (c = s.length - 1), d === o))
          return void (
            c !== l && ((t.snapIndex = c), t.emit("snapIndexChange"))
          );
        const u = parseInt(
          t.slides.eq(d).attr("data-swiper-slide-index") || d,
          10
        );
        Object.assign(t, {
          snapIndex: c,
          realIndex: u,
          previousIndex: o,
          activeIndex: d,
        }),
          t.emit("activeIndexChange"),
          t.emit("snapIndexChange"),
          a !== u && t.emit("realIndexChange"),
          (t.initialized || t.params.runCallbacksOnInit) &&
            t.emit("slideChange");
      },
      updateClickedSlide: function (e) {
        const t = this,
          n = t.params,
          i = k(e).closest(`.${n.slideClass}`)[0];
        let s,
          r = !1;
        if (i)
          for (let e = 0; e < t.slides.length; e += 1)
            if (t.slides[e] === i) {
              (r = !0), (s = e);
              break;
            }
        if (!i || !r)
          return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
        (t.clickedSlide = i),
          t.virtual && t.params.virtual.enabled
            ? (t.clickedIndex = parseInt(
                k(i).attr("data-swiper-slide-index"),
                10
              ))
            : (t.clickedIndex = s),
          n.slideToClickedSlide &&
            void 0 !== t.clickedIndex &&
            t.clickedIndex !== t.activeIndex &&
            t.slideToClickedSlide();
      },
    };
    const F = {
      getTranslate: function (e) {
        void 0 === e && (e = this.isHorizontal() ? "x" : "y");
        const {
          params: t,
          rtlTranslate: n,
          translate: i,
          $wrapperEl: s,
        } = this;
        if (t.virtualTranslate) return n ? -i : i;
        if (t.cssMode) return i;
        let r = M(s[0], e);
        return n && (r = -r), r || 0;
      },
      setTranslate: function (e, t) {
        const n = this,
          {
            rtlTranslate: i,
            params: s,
            $wrapperEl: r,
            wrapperEl: o,
            progress: a,
          } = n;
        let l,
          c = 0,
          d = 0;
        n.isHorizontal() ? (c = i ? -e : e) : (d = e),
          s.roundLengths && ((c = Math.floor(c)), (d = Math.floor(d))),
          s.cssMode
            ? (o[n.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                n.isHorizontal() ? -c : -d)
            : s.virtualTranslate ||
              r.transform(`translate3d(${c}px, ${d}px, 0px)`),
          (n.previousTranslate = n.translate),
          (n.translate = n.isHorizontal() ? c : d);
        const u = n.maxTranslate() - n.minTranslate();
        (l = 0 === u ? 0 : (e - n.minTranslate()) / u),
          l !== a && n.updateProgress(e),
          n.emit("setTranslate", n.translate, t);
      },
      minTranslate: function () {
        return -this.snapGrid[0];
      },
      maxTranslate: function () {
        return -this.snapGrid[this.snapGrid.length - 1];
      },
      translateTo: function (e, t, n, i, s) {
        void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === n && (n = !0),
          void 0 === i && (i = !0);
        const r = this,
          { params: o, wrapperEl: a } = r;
        if (r.animating && o.preventInteractionOnTransition) return !1;
        const l = r.minTranslate(),
          c = r.maxTranslate();
        let d;
        if (
          ((d = i && e > l ? l : i && e < c ? c : e),
          r.updateProgress(d),
          o.cssMode)
        ) {
          const e = r.isHorizontal();
          if (0 === t) a[e ? "scrollLeft" : "scrollTop"] = -d;
          else {
            if (!r.support.smoothScroll)
              return (
                N({ swiper: r, targetPosition: -d, side: e ? "left" : "top" }),
                !0
              );
            a.scrollTo({ [e ? "left" : "top"]: -d, behavior: "smooth" });
          }
          return !0;
        }
        return (
          0 === t
            ? (r.setTransition(0),
              r.setTranslate(d),
              n &&
                (r.emit("beforeTransitionStart", t, s),
                r.emit("transitionEnd")))
            : (r.setTransition(t),
              r.setTranslate(d),
              n &&
                (r.emit("beforeTransitionStart", t, s),
                r.emit("transitionStart")),
              r.animating ||
                ((r.animating = !0),
                r.onTranslateToWrapperTransitionEnd ||
                  (r.onTranslateToWrapperTransitionEnd = function (e) {
                    r &&
                      !r.destroyed &&
                      e.target === this &&
                      (r.$wrapperEl[0].removeEventListener(
                        "transitionend",
                        r.onTranslateToWrapperTransitionEnd
                      ),
                      r.$wrapperEl[0].removeEventListener(
                        "webkitTransitionEnd",
                        r.onTranslateToWrapperTransitionEnd
                      ),
                      (r.onTranslateToWrapperTransitionEnd = null),
                      delete r.onTranslateToWrapperTransitionEnd,
                      n && r.emit("transitionEnd"));
                  }),
                r.$wrapperEl[0].addEventListener(
                  "transitionend",
                  r.onTranslateToWrapperTransitionEnd
                ),
                r.$wrapperEl[0].addEventListener(
                  "webkitTransitionEnd",
                  r.onTranslateToWrapperTransitionEnd
                ))),
          !0
        );
      },
    };
    function V(e) {
      let { swiper: t, runCallbacks: n, direction: i, step: s } = e;
      const { activeIndex: r, previousIndex: o } = t;
      let a = i;
      if (
        (a || (a = r > o ? "next" : r < o ? "prev" : "reset"),
        t.emit(`transition${s}`),
        n && r !== o)
      ) {
        if ("reset" === a) return void t.emit(`slideResetTransition${s}`);
        t.emit(`slideChangeTransition${s}`),
          "next" === a
            ? t.emit(`slideNextTransition${s}`)
            : t.emit(`slidePrevTransition${s}`);
      }
    }
    const X = {
      slideTo: function (e, t, n, i, s) {
        if (
          (void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === n && (n = !0),
          "number" != typeof e && "string" != typeof e)
        )
          throw new Error(
            `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
          );
        if ("string" == typeof e) {
          const t = parseInt(e, 10);
          if (!isFinite(t))
            throw new Error(
              `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
            );
          e = t;
        }
        const r = this;
        let o = e;
        o < 0 && (o = 0);
        const {
          params: a,
          snapGrid: l,
          slidesGrid: c,
          previousIndex: d,
          activeIndex: u,
          rtlTranslate: p,
          wrapperEl: h,
          enabled: f,
        } = r;
        if (
          (r.animating && a.preventInteractionOnTransition) ||
          (!f && !i && !s)
        )
          return !1;
        const m = Math.min(r.params.slidesPerGroupSkip, o);
        let v = m + Math.floor((o - m) / r.params.slidesPerGroup);
        v >= l.length && (v = l.length - 1),
          (u || a.initialSlide || 0) === (d || 0) &&
            n &&
            r.emit("beforeSlideChangeStart");
        const g = -l[v];
        if ((r.updateProgress(g), a.normalizeSlideIndex))
          for (let e = 0; e < c.length; e += 1) {
            const t = -Math.floor(100 * g),
              n = Math.floor(100 * c[e]),
              i = Math.floor(100 * c[e + 1]);
            void 0 !== c[e + 1]
              ? t >= n && t < i - (i - n) / 2
                ? (o = e)
                : t >= n && t < i && (o = e + 1)
              : t >= n && (o = e);
          }
        if (r.initialized && o !== u) {
          if (!r.allowSlideNext && g < r.translate && g < r.minTranslate())
            return !1;
          if (
            !r.allowSlidePrev &&
            g > r.translate &&
            g > r.maxTranslate() &&
            (u || 0) !== o
          )
            return !1;
        }
        let b;
        if (
          ((b = o > u ? "next" : o < u ? "prev" : "reset"),
          (p && -g === r.translate) || (!p && g === r.translate))
        )
          return (
            r.updateActiveIndex(o),
            a.autoHeight && r.updateAutoHeight(),
            r.updateSlidesClasses(),
            "slide" !== a.effect && r.setTranslate(g),
            "reset" !== b && (r.transitionStart(n, b), r.transitionEnd(n, b)),
            !1
          );
        if (a.cssMode) {
          const e = r.isHorizontal(),
            n = p ? g : -g;
          if (0 === t) {
            const t = r.virtual && r.params.virtual.enabled;
            t &&
              ((r.wrapperEl.style.scrollSnapType = "none"),
              (r._immediateVirtual = !0)),
              (h[e ? "scrollLeft" : "scrollTop"] = n),
              t &&
                requestAnimationFrame(() => {
                  (r.wrapperEl.style.scrollSnapType = ""),
                    (r._swiperImmediateVirtual = !1);
                });
          } else {
            if (!r.support.smoothScroll)
              return (
                N({ swiper: r, targetPosition: n, side: e ? "left" : "top" }),
                !0
              );
            h.scrollTo({ [e ? "left" : "top"]: n, behavior: "smooth" });
          }
          return !0;
        }
        return (
          r.setTransition(t),
          r.setTranslate(g),
          r.updateActiveIndex(o),
          r.updateSlidesClasses(),
          r.emit("beforeTransitionStart", t, i),
          r.transitionStart(n, b),
          0 === t
            ? r.transitionEnd(n, b)
            : r.animating ||
              ((r.animating = !0),
              r.onSlideToWrapperTransitionEnd ||
                (r.onSlideToWrapperTransitionEnd = function (e) {
                  r &&
                    !r.destroyed &&
                    e.target === this &&
                    (r.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      r.onSlideToWrapperTransitionEnd
                    ),
                    r.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      r.onSlideToWrapperTransitionEnd
                    ),
                    (r.onSlideToWrapperTransitionEnd = null),
                    delete r.onSlideToWrapperTransitionEnd,
                    r.transitionEnd(n, b));
                }),
              r.$wrapperEl[0].addEventListener(
                "transitionend",
                r.onSlideToWrapperTransitionEnd
              ),
              r.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                r.onSlideToWrapperTransitionEnd
              )),
          !0
        );
      },
      slideToLoop: function (e, t, n, i) {
        void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === n && (n = !0);
        const s = this;
        let r = e;
        return s.params.loop && (r += s.loopedSlides), s.slideTo(r, t, n, i);
      },
      slideNext: function (e, t, n) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const i = this,
          { animating: s, enabled: r, params: o } = i;
        if (!r) return i;
        let a = o.slidesPerGroup;
        "auto" === o.slidesPerView &&
          1 === o.slidesPerGroup &&
          o.slidesPerGroupAuto &&
          (a = Math.max(i.slidesPerViewDynamic("current", !0), 1));
        const l = i.activeIndex < o.slidesPerGroupSkip ? 1 : a;
        if (o.loop) {
          if (s && o.loopPreventsSlide) return !1;
          i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
        }
        return o.rewind && i.isEnd
          ? i.slideTo(0, e, t, n)
          : i.slideTo(i.activeIndex + l, e, t, n);
      },
      slidePrev: function (e, t, n) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const i = this,
          {
            params: s,
            animating: r,
            snapGrid: o,
            slidesGrid: a,
            rtlTranslate: l,
            enabled: c,
          } = i;
        if (!c) return i;
        if (s.loop) {
          if (r && s.loopPreventsSlide) return !1;
          i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
        }
        function d(e) {
          return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
        }
        const u = d(l ? i.translate : -i.translate),
          p = o.map((e) => d(e));
        let h = o[p.indexOf(u) - 1];
        if (void 0 === h && s.cssMode) {
          let e;
          o.forEach((t, n) => {
            u >= t && (e = n);
          }),
            void 0 !== e && (h = o[e > 0 ? e - 1 : e]);
        }
        let f = 0;
        if (
          (void 0 !== h &&
            ((f = a.indexOf(h)),
            f < 0 && (f = i.activeIndex - 1),
            "auto" === s.slidesPerView &&
              1 === s.slidesPerGroup &&
              s.slidesPerGroupAuto &&
              ((f = f - i.slidesPerViewDynamic("previous", !0) + 1),
              (f = Math.max(f, 0)))),
          s.rewind && i.isBeginning)
        ) {
          const s =
            i.params.virtual && i.params.virtual.enabled && i.virtual
              ? i.virtual.slides.length - 1
              : i.slides.length - 1;
          return i.slideTo(s, e, t, n);
        }
        return i.slideTo(f, e, t, n);
      },
      slideReset: function (e, t, n) {
        return (
          void 0 === e && (e = this.params.speed),
          void 0 === t && (t = !0),
          this.slideTo(this.activeIndex, e, t, n)
        );
      },
      slideToClosest: function (e, t, n, i) {
        void 0 === e && (e = this.params.speed),
          void 0 === t && (t = !0),
          void 0 === i && (i = 0.5);
        const s = this;
        let r = s.activeIndex;
        const o = Math.min(s.params.slidesPerGroupSkip, r),
          a = o + Math.floor((r - o) / s.params.slidesPerGroup),
          l = s.rtlTranslate ? s.translate : -s.translate;
        if (l >= s.snapGrid[a]) {
          const e = s.snapGrid[a];
          l - e > (s.snapGrid[a + 1] - e) * i && (r += s.params.slidesPerGroup);
        } else {
          const e = s.snapGrid[a - 1];
          l - e <= (s.snapGrid[a] - e) * i && (r -= s.params.slidesPerGroup);
        }
        return (
          (r = Math.max(r, 0)),
          (r = Math.min(r, s.slidesGrid.length - 1)),
          s.slideTo(r, e, t, n)
        );
      },
      slideToClickedSlide: function () {
        const e = this,
          { params: t, $wrapperEl: n } = e,
          i =
            "auto" === t.slidesPerView
              ? e.slidesPerViewDynamic()
              : t.slidesPerView;
        let s,
          r = e.clickedIndex;
        if (t.loop) {
          if (e.animating) return;
          (s = parseInt(k(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
            t.centeredSlides
              ? r < e.loopedSlides - i / 2 ||
                r > e.slides.length - e.loopedSlides + i / 2
                ? (e.loopFix(),
                  (r = n
                    .children(
                      `.${t.slideClass}[data-swiper-slide-index="${s}"]:not(.${t.slideDuplicateClass})`
                    )
                    .eq(0)
                    .index()),
                  L(() => {
                    e.slideTo(r);
                  }))
                : e.slideTo(r)
              : r > e.slides.length - i
              ? (e.loopFix(),
                (r = n
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${s}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                L(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r);
        } else e.slideTo(r);
      },
    };
    const Y = {
      loopCreate: function () {
        const e = this,
          t = b(),
          { params: n, $wrapperEl: i } = e,
          s = i.children().length > 0 ? k(i.children()[0].parentNode) : i;
        s.children(`.${n.slideClass}.${n.slideDuplicateClass}`).remove();
        let r = s.children(`.${n.slideClass}`);
        if (n.loopFillGroupWithBlank) {
          const e = n.slidesPerGroup - (r.length % n.slidesPerGroup);
          if (e !== n.slidesPerGroup) {
            for (let i = 0; i < e; i += 1) {
              const e = k(t.createElement("div")).addClass(
                `${n.slideClass} ${n.slideBlankClass}`
              );
              s.append(e);
            }
            r = s.children(`.${n.slideClass}`);
          }
        }
        "auto" !== n.slidesPerView ||
          n.loopedSlides ||
          (n.loopedSlides = r.length),
          (e.loopedSlides = Math.ceil(
            parseFloat(n.loopedSlides || n.slidesPerView, 10)
          )),
          (e.loopedSlides += n.loopAdditionalSlides),
          e.loopedSlides > r.length && (e.loopedSlides = r.length);
        const o = [],
          a = [];
        r.each((t, n) => {
          const i = k(t);
          n < e.loopedSlides && a.push(t),
            n < r.length && n >= r.length - e.loopedSlides && o.push(t),
            i.attr("data-swiper-slide-index", n);
        });
        for (let e = 0; e < a.length; e += 1)
          s.append(k(a[e].cloneNode(!0)).addClass(n.slideDuplicateClass));
        for (let e = o.length - 1; e >= 0; e -= 1)
          s.prepend(k(o[e].cloneNode(!0)).addClass(n.slideDuplicateClass));
      },
      loopFix: function () {
        const e = this;
        e.emit("beforeLoopFix");
        const {
          activeIndex: t,
          slides: n,
          loopedSlides: i,
          allowSlidePrev: s,
          allowSlideNext: r,
          snapGrid: o,
          rtlTranslate: a,
        } = e;
        let l;
        (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
        const c = -o[t] - e.getTranslate();
        if (t < i) {
          (l = n.length - 3 * i + t), (l += i);
          e.slideTo(l, 0, !1, !0) &&
            0 !== c &&
            e.setTranslate((a ? -e.translate : e.translate) - c);
        } else if (t >= n.length - i) {
          (l = -n.length + t + i), (l += i);
          e.slideTo(l, 0, !1, !0) &&
            0 !== c &&
            e.setTranslate((a ? -e.translate : e.translate) - c);
        }
        (e.allowSlidePrev = s), (e.allowSlideNext = r), e.emit("loopFix");
      },
      loopDestroy: function () {
        const { $wrapperEl: e, params: t, slides: n } = this;
        e
          .children(
            `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
          )
          .remove(),
          n.removeAttr("data-swiper-slide-index");
      },
    };
    function U(e) {
      const t = this,
        n = b(),
        i = w(),
        s = t.touchEventsData,
        { params: r, touches: o, enabled: a } = t;
      if (!a) return;
      if (t.animating && r.preventInteractionOnTransition) return;
      !t.animating && r.cssMode && r.loop && t.loopFix();
      let l = e;
      l.originalEvent && (l = l.originalEvent);
      let c = k(l.target);
      if ("wrapper" === r.touchEventsTarget && !c.closest(t.wrapperEl).length)
        return;
      if (
        ((s.isTouchEvent = "touchstart" === l.type),
        !s.isTouchEvent && "which" in l && 3 === l.which)
      )
        return;
      if (!s.isTouchEvent && "button" in l && l.button > 0) return;
      if (s.isTouched && s.isMoved) return;
      !!r.noSwipingClass &&
        "" !== r.noSwipingClass &&
        l.target &&
        l.target.shadowRoot &&
        e.path &&
        e.path[0] &&
        (c = k(e.path[0]));
      const d = r.noSwipingSelector
          ? r.noSwipingSelector
          : `.${r.noSwipingClass}`,
        u = !(!l.target || !l.target.shadowRoot);
      if (
        r.noSwiping &&
        (u
          ? (function (e, t) {
              return (
                void 0 === t && (t = this),
                (function t(n) {
                  return n && n !== b() && n !== w()
                    ? (n.assignedSlot && (n = n.assignedSlot),
                      n.closest(e) || t(n.getRootNode().host))
                    : null;
                })(t)
              );
            })(d, l.target)
          : c.closest(d)[0])
      )
        return void (t.allowClick = !0);
      if (r.swipeHandler && !c.closest(r.swipeHandler)[0]) return;
      (o.currentX =
        "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX),
        (o.currentY =
          "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY);
      const p = o.currentX,
        h = o.currentY,
        f = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
        m = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
      if (f && (p <= m || p >= i.innerWidth - m)) {
        if ("prevent" !== f) return;
        e.preventDefault();
      }
      if (
        (Object.assign(s, {
          isTouched: !0,
          isMoved: !1,
          allowTouchCallbacks: !0,
          isScrolling: void 0,
          startMoving: void 0,
        }),
        (o.startX = p),
        (o.startY = h),
        (s.touchStartTime = A()),
        (t.allowClick = !0),
        t.updateSize(),
        (t.swipeDirection = void 0),
        r.threshold > 0 && (s.allowThresholdMove = !1),
        "touchstart" !== l.type)
      ) {
        let e = !0;
        c.is(s.focusableElements) &&
          ((e = !1), "SELECT" === c[0].nodeName && (s.isTouched = !1)),
          n.activeElement &&
            k(n.activeElement).is(s.focusableElements) &&
            n.activeElement !== c[0] &&
            n.activeElement.blur();
        const i = e && t.allowTouchMove && r.touchStartPreventDefault;
        (!r.touchStartForcePreventDefault && !i) ||
          c[0].isContentEditable ||
          l.preventDefault();
      }
      t.params.freeMode &&
        t.params.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !r.cssMode &&
        t.freeMode.onTouchStart(),
        t.emit("touchStart", l);
    }
    function Q(e) {
      const t = b(),
        n = this,
        i = n.touchEventsData,
        { params: s, touches: r, rtlTranslate: o, enabled: a } = n;
      if (!a) return;
      let l = e;
      if ((l.originalEvent && (l = l.originalEvent), !i.isTouched))
        return void (
          i.startMoving &&
          i.isScrolling &&
          n.emit("touchMoveOpposite", l)
        );
      if (i.isTouchEvent && "touchmove" !== l.type) return;
      const c =
          "touchmove" === l.type &&
          l.targetTouches &&
          (l.targetTouches[0] || l.changedTouches[0]),
        d = "touchmove" === l.type ? c.pageX : l.pageX,
        u = "touchmove" === l.type ? c.pageY : l.pageY;
      if (l.preventedByNestedSwiper) return (r.startX = d), void (r.startY = u);
      if (!n.allowTouchMove)
        return (
          k(l.target).is(i.focusableElements) || (n.allowClick = !1),
          void (
            i.isTouched &&
            (Object.assign(r, {
              startX: d,
              startY: u,
              currentX: d,
              currentY: u,
            }),
            (i.touchStartTime = A()))
          )
        );
      if (i.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
        if (n.isVertical()) {
          if (
            (u < r.startY && n.translate <= n.maxTranslate()) ||
            (u > r.startY && n.translate >= n.minTranslate())
          )
            return (i.isTouched = !1), void (i.isMoved = !1);
        } else if (
          (d < r.startX && n.translate <= n.maxTranslate()) ||
          (d > r.startX && n.translate >= n.minTranslate())
        )
          return;
      if (
        i.isTouchEvent &&
        t.activeElement &&
        l.target === t.activeElement &&
        k(l.target).is(i.focusableElements)
      )
        return (i.isMoved = !0), void (n.allowClick = !1);
      if (
        (i.allowTouchCallbacks && n.emit("touchMove", l),
        l.targetTouches && l.targetTouches.length > 1)
      )
        return;
      (r.currentX = d), (r.currentY = u);
      const p = r.currentX - r.startX,
        h = r.currentY - r.startY;
      if (n.params.threshold && Math.sqrt(p ** 2 + h ** 2) < n.params.threshold)
        return;
      if (void 0 === i.isScrolling) {
        let e;
        (n.isHorizontal() && r.currentY === r.startY) ||
        (n.isVertical() && r.currentX === r.startX)
          ? (i.isScrolling = !1)
          : p * p + h * h >= 25 &&
            ((e = (180 * Math.atan2(Math.abs(h), Math.abs(p))) / Math.PI),
            (i.isScrolling = n.isHorizontal()
              ? e > s.touchAngle
              : 90 - e > s.touchAngle));
      }
      if (
        (i.isScrolling && n.emit("touchMoveOpposite", l),
        void 0 === i.startMoving &&
          ((r.currentX === r.startX && r.currentY === r.startY) ||
            (i.startMoving = !0)),
        i.isScrolling)
      )
        return void (i.isTouched = !1);
      if (!i.startMoving) return;
      (n.allowClick = !1),
        !s.cssMode && l.cancelable && l.preventDefault(),
        s.touchMoveStopPropagation && !s.nested && l.stopPropagation(),
        i.isMoved ||
          (s.loop && !s.cssMode && n.loopFix(),
          (i.startTranslate = n.getTranslate()),
          n.setTransition(0),
          n.animating &&
            n.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
          (i.allowMomentumBounce = !1),
          !s.grabCursor ||
            (!0 !== n.allowSlideNext && !0 !== n.allowSlidePrev) ||
            n.setGrabCursor(!0),
          n.emit("sliderFirstMove", l)),
        n.emit("sliderMove", l),
        (i.isMoved = !0);
      let f = n.isHorizontal() ? p : h;
      (r.diff = f),
        (f *= s.touchRatio),
        o && (f = -f),
        (n.swipeDirection = f > 0 ? "prev" : "next"),
        (i.currentTranslate = f + i.startTranslate);
      let m = !0,
        v = s.resistanceRatio;
      if (
        (s.touchReleaseOnEdges && (v = 0),
        f > 0 && i.currentTranslate > n.minTranslate()
          ? ((m = !1),
            s.resistance &&
              (i.currentTranslate =
                n.minTranslate() -
                1 +
                (-n.minTranslate() + i.startTranslate + f) ** v))
          : f < 0 &&
            i.currentTranslate < n.maxTranslate() &&
            ((m = !1),
            s.resistance &&
              (i.currentTranslate =
                n.maxTranslate() +
                1 -
                (n.maxTranslate() - i.startTranslate - f) ** v)),
        m && (l.preventedByNestedSwiper = !0),
        !n.allowSlideNext &&
          "next" === n.swipeDirection &&
          i.currentTranslate < i.startTranslate &&
          (i.currentTranslate = i.startTranslate),
        !n.allowSlidePrev &&
          "prev" === n.swipeDirection &&
          i.currentTranslate > i.startTranslate &&
          (i.currentTranslate = i.startTranslate),
        n.allowSlidePrev ||
          n.allowSlideNext ||
          (i.currentTranslate = i.startTranslate),
        s.threshold > 0)
      ) {
        if (!(Math.abs(f) > s.threshold || i.allowThresholdMove))
          return void (i.currentTranslate = i.startTranslate);
        if (!i.allowThresholdMove)
          return (
            (i.allowThresholdMove = !0),
            (r.startX = r.currentX),
            (r.startY = r.currentY),
            (i.currentTranslate = i.startTranslate),
            void (r.diff = n.isHorizontal()
              ? r.currentX - r.startX
              : r.currentY - r.startY)
          );
      }
      s.followFinger &&
        !s.cssMode &&
        (((s.freeMode && s.freeMode.enabled && n.freeMode) ||
          s.watchSlidesProgress) &&
          (n.updateActiveIndex(), n.updateSlidesClasses()),
        n.params.freeMode &&
          s.freeMode.enabled &&
          n.freeMode &&
          n.freeMode.onTouchMove(),
        n.updateProgress(i.currentTranslate),
        n.setTranslate(i.currentTranslate));
    }
    function K(e) {
      const t = this,
        n = t.touchEventsData,
        {
          params: i,
          touches: s,
          rtlTranslate: r,
          slidesGrid: o,
          enabled: a,
        } = t;
      if (!a) return;
      let l = e;
      if (
        (l.originalEvent && (l = l.originalEvent),
        n.allowTouchCallbacks && t.emit("touchEnd", l),
        (n.allowTouchCallbacks = !1),
        !n.isTouched)
      )
        return (
          n.isMoved && i.grabCursor && t.setGrabCursor(!1),
          (n.isMoved = !1),
          void (n.startMoving = !1)
        );
      i.grabCursor &&
        n.isMoved &&
        n.isTouched &&
        (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
        t.setGrabCursor(!1);
      const c = A(),
        d = c - n.touchStartTime;
      if (t.allowClick) {
        const e = l.path || (l.composedPath && l.composedPath());
        t.updateClickedSlide((e && e[0]) || l.target),
          t.emit("tap click", l),
          d < 300 &&
            c - n.lastClickTime < 300 &&
            t.emit("doubleTap doubleClick", l);
      }
      if (
        ((n.lastClickTime = A()),
        L(() => {
          t.destroyed || (t.allowClick = !0);
        }),
        !n.isTouched ||
          !n.isMoved ||
          !t.swipeDirection ||
          0 === s.diff ||
          n.currentTranslate === n.startTranslate)
      )
        return (n.isTouched = !1), (n.isMoved = !1), void (n.startMoving = !1);
      let u;
      if (
        ((n.isTouched = !1),
        (n.isMoved = !1),
        (n.startMoving = !1),
        (u = i.followFinger
          ? r
            ? t.translate
            : -t.translate
          : -n.currentTranslate),
        i.cssMode)
      )
        return;
      if (t.params.freeMode && i.freeMode.enabled)
        return void t.freeMode.onTouchEnd({ currentPos: u });
      let p = 0,
        h = t.slidesSizesGrid[0];
      for (
        let e = 0;
        e < o.length;
        e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
      ) {
        const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
        void 0 !== o[e + t]
          ? u >= o[e] && u < o[e + t] && ((p = e), (h = o[e + t] - o[e]))
          : u >= o[e] && ((p = e), (h = o[o.length - 1] - o[o.length - 2]));
      }
      let f = null,
        m = null;
      i.rewind &&
        (t.isBeginning
          ? (m =
              t.params.virtual && t.params.virtual.enabled && t.virtual
                ? t.virtual.slides.length - 1
                : t.slides.length - 1)
          : t.isEnd && (f = 0));
      const v = (u - o[p]) / h,
        g = p < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
      if (d > i.longSwipesMs) {
        if (!i.longSwipes) return void t.slideTo(t.activeIndex);
        "next" === t.swipeDirection &&
          (v >= i.longSwipesRatio
            ? t.slideTo(i.rewind && t.isEnd ? f : p + g)
            : t.slideTo(p)),
          "prev" === t.swipeDirection &&
            (v > 1 - i.longSwipesRatio
              ? t.slideTo(p + g)
              : null !== m && v < 0 && Math.abs(v) > i.longSwipesRatio
              ? t.slideTo(m)
              : t.slideTo(p));
      } else {
        if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
        t.navigation &&
        (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl)
          ? l.target === t.navigation.nextEl
            ? t.slideTo(p + g)
            : t.slideTo(p)
          : ("next" === t.swipeDirection && t.slideTo(null !== f ? f : p + g),
            "prev" === t.swipeDirection && t.slideTo(null !== m ? m : p));
      }
    }
    function J() {
      const e = this,
        { params: t, el: n } = e;
      if (n && 0 === n.offsetWidth) return;
      t.breakpoints && e.setBreakpoint();
      const { allowSlideNext: i, allowSlidePrev: s, snapGrid: r } = e;
      (e.allowSlideNext = !0),
        (e.allowSlidePrev = !0),
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses(),
        ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
        e.isEnd &&
        !e.isBeginning &&
        !e.params.centeredSlides
          ? e.slideTo(e.slides.length - 1, 0, !1, !0)
          : e.slideTo(e.activeIndex, 0, !1, !0),
        e.autoplay &&
          e.autoplay.running &&
          e.autoplay.paused &&
          e.autoplay.run(),
        (e.allowSlidePrev = s),
        (e.allowSlideNext = i),
        e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
    }
    function Z(e) {
      const t = this;
      t.enabled &&
        (t.allowClick ||
          (t.params.preventClicks && e.preventDefault(),
          t.params.preventClicksPropagation &&
            t.animating &&
            (e.stopPropagation(), e.stopImmediatePropagation())));
    }
    function ee() {
      const e = this,
        { wrapperEl: t, rtlTranslate: n, enabled: i } = e;
      if (!i) return;
      let s;
      (e.previousTranslate = e.translate),
        e.isHorizontal()
          ? (e.translate = -t.scrollLeft)
          : (e.translate = -t.scrollTop),
        0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
      const r = e.maxTranslate() - e.minTranslate();
      (s = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
        s !== e.progress && e.updateProgress(n ? -e.translate : e.translate),
        e.emit("setTranslate", e.translate, !1);
    }
    let te = !1;
    function ne() {}
    const ie = (e, t) => {
      const n = b(),
        {
          params: i,
          touchEvents: s,
          el: r,
          wrapperEl: o,
          device: a,
          support: l,
        } = e,
        c = !!i.nested,
        d = "on" === t ? "addEventListener" : "removeEventListener",
        u = t;
      if (l.touch) {
        const t = !(
          "touchstart" !== s.start ||
          !l.passiveListener ||
          !i.passiveListeners
        ) && { passive: !0, capture: !1 };
        r[d](s.start, e.onTouchStart, t),
          r[d](
            s.move,
            e.onTouchMove,
            l.passiveListener ? { passive: !1, capture: c } : c
          ),
          r[d](s.end, e.onTouchEnd, t),
          s.cancel && r[d](s.cancel, e.onTouchEnd, t);
      } else
        r[d](s.start, e.onTouchStart, !1),
          n[d](s.move, e.onTouchMove, c),
          n[d](s.end, e.onTouchEnd, !1);
      (i.preventClicks || i.preventClicksPropagation) &&
        r[d]("click", e.onClick, !0),
        i.cssMode && o[d]("scroll", e.onScroll),
        i.updateOnWindowResize
          ? e[u](
              a.ios || a.android
                ? "resize orientationchange observerUpdate"
                : "resize observerUpdate",
              J,
              !0
            )
          : e[u]("observerUpdate", J, !0);
    };
    const se = {
        attachEvents: function () {
          const e = this,
            t = b(),
            { params: n, support: i } = e;
          (e.onTouchStart = U.bind(e)),
            (e.onTouchMove = Q.bind(e)),
            (e.onTouchEnd = K.bind(e)),
            n.cssMode && (e.onScroll = ee.bind(e)),
            (e.onClick = Z.bind(e)),
            i.touch && !te && (t.addEventListener("touchstart", ne), (te = !0)),
            ie(e, "on");
        },
        detachEvents: function () {
          ie(this, "off");
        },
      },
      re = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    const oe = {
      setBreakpoint: function () {
        const e = this,
          {
            activeIndex: t,
            initialized: n,
            loopedSlides: i = 0,
            params: s,
            $el: r,
          } = e,
          o = s.breakpoints;
        if (!o || (o && 0 === Object.keys(o).length)) return;
        const a = e.getBreakpoint(o, e.params.breakpointsBase, e.el);
        if (!a || e.currentBreakpoint === a) return;
        const l = (a in o ? o[a] : void 0) || e.originalParams,
          c = re(e, s),
          d = re(e, l),
          u = s.enabled;
        c && !d
          ? (r.removeClass(
              `${s.containerModifierClass}grid ${s.containerModifierClass}grid-column`
            ),
            e.emitContainerClasses())
          : !c &&
            d &&
            (r.addClass(`${s.containerModifierClass}grid`),
            ((l.grid.fill && "column" === l.grid.fill) ||
              (!l.grid.fill && "column" === s.grid.fill)) &&
              r.addClass(`${s.containerModifierClass}grid-column`),
            e.emitContainerClasses());
        const p = l.direction && l.direction !== s.direction,
          h = s.loop && (l.slidesPerView !== s.slidesPerView || p);
        p && n && e.changeDirection(), z(e.params, l);
        const f = e.params.enabled;
        Object.assign(e, {
          allowTouchMove: e.params.allowTouchMove,
          allowSlideNext: e.params.allowSlideNext,
          allowSlidePrev: e.params.allowSlidePrev,
        }),
          u && !f ? e.disable() : !u && f && e.enable(),
          (e.currentBreakpoint = a),
          e.emit("_beforeBreakpoint", l),
          h &&
            n &&
            (e.loopDestroy(),
            e.loopCreate(),
            e.updateSlides(),
            e.slideTo(t - i + e.loopedSlides, 0, !1)),
          e.emit("breakpoint", l);
      },
      getBreakpoint: function (e, t, n) {
        if ((void 0 === t && (t = "window"), !e || ("container" === t && !n)))
          return;
        let i = !1;
        const s = w(),
          r = "window" === t ? s.innerHeight : n.clientHeight,
          o = Object.keys(e).map((e) => {
            if ("string" == typeof e && 0 === e.indexOf("@")) {
              const t = parseFloat(e.substr(1));
              return { value: r * t, point: e };
            }
            return { value: e, point: e };
          });
        o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
        for (let e = 0; e < o.length; e += 1) {
          const { point: r, value: a } = o[e];
          "window" === t
            ? s.matchMedia(`(min-width: ${a}px)`).matches && (i = r)
            : a <= n.clientWidth && (i = r);
        }
        return i || "max";
      },
    };
    const ae = {
      addClasses: function () {
        const e = this,
          {
            classNames: t,
            params: n,
            rtl: i,
            $el: s,
            device: r,
            support: o,
          } = e,
          a = (function (e, t) {
            const n = [];
            return (
              e.forEach((e) => {
                "object" == typeof e
                  ? Object.keys(e).forEach((i) => {
                      e[i] && n.push(t + i);
                    })
                  : "string" == typeof e && n.push(t + e);
              }),
              n
            );
          })(
            [
              "initialized",
              n.direction,
              { "pointer-events": !o.touch },
              { "free-mode": e.params.freeMode && n.freeMode.enabled },
              { autoheight: n.autoHeight },
              { rtl: i },
              { grid: n.grid && n.grid.rows > 1 },
              {
                "grid-column":
                  n.grid && n.grid.rows > 1 && "column" === n.grid.fill,
              },
              { android: r.android },
              { ios: r.ios },
              { "css-mode": n.cssMode },
              { centered: n.cssMode && n.centeredSlides },
            ],
            n.containerModifierClass
          );
        t.push(...a), s.addClass([...t].join(" ")), e.emitContainerClasses();
      },
      removeClasses: function () {
        const { $el: e, classNames: t } = this;
        e.removeClass(t.join(" ")), this.emitContainerClasses();
      },
    };
    const le = {
      init: !0,
      direction: "horizontal",
      touchEventsTarget: "wrapper",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      resizeObserver: !0,
      nested: !1,
      createElements: !1,
      enabled: !0,
      focusableElements:
        "input, select, option, textarea, button, video, label",
      width: null,
      height: null,
      preventInteractionOnTransition: !1,
      userAgent: null,
      url: null,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsBase: "window",
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: !1,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 0,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      preloadImages: !0,
      updateOnImagesReady: !0,
      loop: !1,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: !1,
      loopPreventsSlide: !0,
      rewind: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      maxBackfaceHiddenSlides: 10,
      containerModifierClass: "swiper-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-invisible-blank",
      slideActiveClass: "swiper-slide-active",
      slideDuplicateActiveClass: "swiper-slide-duplicate-active",
      slideVisibleClass: "swiper-slide-visible",
      slideDuplicateClass: "swiper-slide-duplicate",
      slideNextClass: "swiper-slide-next",
      slideDuplicateNextClass: "swiper-slide-duplicate-next",
      slidePrevClass: "swiper-slide-prev",
      slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
      wrapperClass: "swiper-wrapper",
      runCallbacksOnInit: !0,
      _emitClasses: !1,
    };
    function ce(e, t) {
      return function (n) {
        void 0 === n && (n = {});
        const i = Object.keys(n)[0],
          s = n[i];
        "object" == typeof s && null !== s
          ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
              !0 === e[i] &&
              (e[i] = { auto: !0 }),
            i in e && "enabled" in s
              ? (!0 === e[i] && (e[i] = { enabled: !0 }),
                "object" != typeof e[i] ||
                  "enabled" in e[i] ||
                  (e[i].enabled = !0),
                e[i] || (e[i] = { enabled: !1 }),
                z(t, n))
              : z(t, n))
          : z(t, n);
      };
    }
    const de = {
        eventsEmitter: G,
        update: H,
        translate: F,
        transition: {
          setTransition: function (e, t) {
            const n = this;
            n.params.cssMode || n.$wrapperEl.transition(e),
              n.emit("setTransition", e, t);
          },
          transitionStart: function (e, t) {
            void 0 === e && (e = !0);
            const n = this,
              { params: i } = n;
            i.cssMode ||
              (i.autoHeight && n.updateAutoHeight(),
              V({ swiper: n, runCallbacks: e, direction: t, step: "Start" }));
          },
          transitionEnd: function (e, t) {
            void 0 === e && (e = !0);
            const n = this,
              { params: i } = n;
            (n.animating = !1),
              i.cssMode ||
                (n.setTransition(0),
                V({ swiper: n, runCallbacks: e, direction: t, step: "End" }));
          },
        },
        slide: X,
        loop: Y,
        grabCursor: {
          setGrabCursor: function (e) {
            const t = this;
            if (
              t.support.touch ||
              !t.params.simulateTouch ||
              (t.params.watchOverflow && t.isLocked) ||
              t.params.cssMode
            )
              return;
            const n =
              "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
            (n.style.cursor = "move"),
              (n.style.cursor = e ? "grabbing" : "grab");
          },
          unsetGrabCursor: function () {
            const e = this;
            e.support.touch ||
              (e.params.watchOverflow && e.isLocked) ||
              e.params.cssMode ||
              (e[
                "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
              ].style.cursor = "");
          },
        },
        events: se,
        breakpoints: oe,
        checkOverflow: {
          checkOverflow: function () {
            const e = this,
              { isLocked: t, params: n } = e,
              { slidesOffsetBefore: i } = n;
            if (i) {
              const t = e.slides.length - 1,
                n = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
              e.isLocked = e.size > n;
            } else e.isLocked = 1 === e.snapGrid.length;
            !0 === n.allowSlideNext && (e.allowSlideNext = !e.isLocked),
              !0 === n.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
              t && t !== e.isLocked && (e.isEnd = !1),
              t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
          },
        },
        classes: ae,
        images: {
          loadImage: function (e, t, n, i, s, r) {
            const o = w();
            let a;
            function l() {
              r && r();
            }
            k(e).parent("picture")[0] || (e.complete && s)
              ? l()
              : t
              ? ((a = new o.Image()),
                (a.onload = l),
                (a.onerror = l),
                i && (a.sizes = i),
                n && (a.srcset = n),
                t && (a.src = t))
              : l();
          },
          preloadImages: function () {
            const e = this;
            function t() {
              null != e &&
                e &&
                !e.destroyed &&
                (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                e.imagesLoaded === e.imagesToLoad.length &&
                  (e.params.updateOnImagesReady && e.update(),
                  e.emit("imagesReady")));
            }
            e.imagesToLoad = e.$el.find("img");
            for (let n = 0; n < e.imagesToLoad.length; n += 1) {
              const i = e.imagesToLoad[n];
              e.loadImage(
                i,
                i.currentSrc || i.getAttribute("src"),
                i.srcset || i.getAttribute("srcset"),
                i.sizes || i.getAttribute("sizes"),
                !0,
                t
              );
            }
          },
        },
      },
      ue = {};
    class pe {
      constructor() {
        let e, t;
        for (var n = arguments.length, i = new Array(n), s = 0; s < n; s++)
          i[s] = arguments[s];
        if (
          (1 === i.length &&
          i[0].constructor &&
          "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
            ? (t = i[0])
            : ([e, t] = i),
          t || (t = {}),
          (t = z({}, t)),
          e && !t.el && (t.el = e),
          t.el && k(t.el).length > 1)
        ) {
          const e = [];
          return (
            k(t.el).each((n) => {
              const i = z({}, t, { el: n });
              e.push(new pe(i));
            }),
            e
          );
        }
        const r = this;
        (r.__swiper__ = !0),
          (r.support = R()),
          (r.device = j({ userAgent: t.userAgent })),
          (r.browser = q()),
          (r.eventsListeners = {}),
          (r.eventsAnyListeners = []),
          (r.modules = [...r.__modules__]),
          t.modules && Array.isArray(t.modules) && r.modules.push(...t.modules);
        const o = {};
        r.modules.forEach((e) => {
          e({
            swiper: r,
            extendParams: ce(t, o),
            on: r.on.bind(r),
            once: r.once.bind(r),
            off: r.off.bind(r),
            emit: r.emit.bind(r),
          });
        });
        const a = z({}, le, o);
        return (
          (r.params = z({}, a, ue, t)),
          (r.originalParams = z({}, r.params)),
          (r.passedParams = z({}, t)),
          r.params &&
            r.params.on &&
            Object.keys(r.params.on).forEach((e) => {
              r.on(e, r.params.on[e]);
            }),
          r.params && r.params.onAny && r.onAny(r.params.onAny),
          (r.$ = k),
          Object.assign(r, {
            enabled: r.params.enabled,
            el: e,
            classNames: [],
            slides: k(),
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal: () => "horizontal" === r.params.direction,
            isVertical: () => "vertical" === r.params.direction,
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            allowSlideNext: r.params.allowSlideNext,
            allowSlidePrev: r.params.allowSlidePrev,
            touchEvents: (function () {
              const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
                t = ["pointerdown", "pointermove", "pointerup"];
              return (
                (r.touchEventsTouch = {
                  start: e[0],
                  move: e[1],
                  end: e[2],
                  cancel: e[3],
                }),
                (r.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
                r.support.touch || !r.params.simulateTouch
                  ? r.touchEventsTouch
                  : r.touchEventsDesktop
              );
            })(),
            touchEventsData: {
              isTouched: void 0,
              isMoved: void 0,
              allowTouchCallbacks: void 0,
              touchStartTime: void 0,
              isScrolling: void 0,
              currentTranslate: void 0,
              startTranslate: void 0,
              allowThresholdMove: void 0,
              focusableElements: r.params.focusableElements,
              lastClickTime: A(),
              clickTimeout: void 0,
              velocities: [],
              allowMomentumBounce: void 0,
              isTouchEvent: void 0,
              startMoving: void 0,
            },
            allowClick: !0,
            allowTouchMove: r.params.allowTouchMove,
            touches: {
              startX: 0,
              startY: 0,
              currentX: 0,
              currentY: 0,
              diff: 0,
            },
            imagesToLoad: [],
            imagesLoaded: 0,
          }),
          r.emit("_swiper"),
          r.params.init && r.init(),
          r
        );
      }
      enable() {
        const e = this;
        e.enabled ||
          ((e.enabled = !0),
          e.params.grabCursor && e.setGrabCursor(),
          e.emit("enable"));
      }
      disable() {
        const e = this;
        e.enabled &&
          ((e.enabled = !1),
          e.params.grabCursor && e.unsetGrabCursor(),
          e.emit("disable"));
      }
      setProgress(e, t) {
        const n = this;
        e = Math.min(Math.max(e, 0), 1);
        const i = n.minTranslate(),
          s = (n.maxTranslate() - i) * e + i;
        n.translateTo(s, void 0 === t ? 0 : t),
          n.updateActiveIndex(),
          n.updateSlidesClasses();
      }
      emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = e.el.className
          .split(" ")
          .filter(
            (t) =>
              0 === t.indexOf("swiper") ||
              0 === t.indexOf(e.params.containerModifierClass)
          );
        e.emit("_containerClasses", t.join(" "));
      }
      getSlideClasses(e) {
        const t = this;
        return e.className
          .split(" ")
          .filter(
            (e) =>
              0 === e.indexOf("swiper-slide") ||
              0 === e.indexOf(t.params.slideClass)
          )
          .join(" ");
      }
      emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = [];
        e.slides.each((n) => {
          const i = e.getSlideClasses(n);
          t.push({ slideEl: n, classNames: i }), e.emit("_slideClass", n, i);
        }),
          e.emit("_slideClasses", t);
      }
      slidesPerViewDynamic(e, t) {
        void 0 === e && (e = "current"), void 0 === t && (t = !1);
        const {
          params: n,
          slides: i,
          slidesGrid: s,
          slidesSizesGrid: r,
          size: o,
          activeIndex: a,
        } = this;
        let l = 1;
        if (n.centeredSlides) {
          let e,
            t = i[a].swiperSlideSize;
          for (let n = a + 1; n < i.length; n += 1)
            i[n] &&
              !e &&
              ((t += i[n].swiperSlideSize), (l += 1), t > o && (e = !0));
          for (let n = a - 1; n >= 0; n -= 1)
            i[n] &&
              !e &&
              ((t += i[n].swiperSlideSize), (l += 1), t > o && (e = !0));
        } else if ("current" === e)
          for (let e = a + 1; e < i.length; e += 1) {
            (t ? s[e] + r[e] - s[a] < o : s[e] - s[a] < o) && (l += 1);
          }
        else
          for (let e = a - 1; e >= 0; e -= 1) {
            s[a] - s[e] < o && (l += 1);
          }
        return l;
      }
      update() {
        const e = this;
        if (!e || e.destroyed) return;
        const { snapGrid: t, params: n } = e;
        function i() {
          const t = e.rtlTranslate ? -1 * e.translate : e.translate,
            n = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
          e.setTranslate(n), e.updateActiveIndex(), e.updateSlidesClasses();
        }
        let s;
        n.breakpoints && e.setBreakpoint(),
          e.updateSize(),
          e.updateSlides(),
          e.updateProgress(),
          e.updateSlidesClasses(),
          e.params.freeMode && e.params.freeMode.enabled
            ? (i(), e.params.autoHeight && e.updateAutoHeight())
            : ((s =
                ("auto" === e.params.slidesPerView ||
                  e.params.slidesPerView > 1) &&
                e.isEnd &&
                !e.params.centeredSlides
                  ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                  : e.slideTo(e.activeIndex, 0, !1, !0)),
              s || i()),
          n.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
          e.emit("update");
      }
      changeDirection(e, t) {
        void 0 === t && (t = !0);
        const n = this,
          i = n.params.direction;
        return (
          e || (e = "horizontal" === i ? "vertical" : "horizontal"),
          e === i ||
            ("horizontal" !== e && "vertical" !== e) ||
            (n.$el
              .removeClass(`${n.params.containerModifierClass}${i}`)
              .addClass(`${n.params.containerModifierClass}${e}`),
            n.emitContainerClasses(),
            (n.params.direction = e),
            n.slides.each((t) => {
              "vertical" === e ? (t.style.width = "") : (t.style.height = "");
            }),
            n.emit("changeDirection"),
            t && n.update()),
          n
        );
      }
      mount(e) {
        const t = this;
        if (t.mounted) return !0;
        const n = k(e || t.params.el);
        if (!(e = n[0])) return !1;
        e.swiper = t;
        const i = () =>
          `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let s = (() => {
          if (e && e.shadowRoot && e.shadowRoot.querySelector) {
            const t = k(e.shadowRoot.querySelector(i()));
            return (t.children = (e) => n.children(e)), t;
          }
          return n.children(i());
        })();
        if (0 === s.length && t.params.createElements) {
          const e = b().createElement("div");
          (s = k(e)),
            (e.className = t.params.wrapperClass),
            n.append(e),
            n.children(`.${t.params.slideClass}`).each((e) => {
              s.append(e);
            });
        }
        return (
          Object.assign(t, {
            $el: n,
            el: e,
            $wrapperEl: s,
            wrapperEl: s[0],
            mounted: !0,
            rtl: "rtl" === e.dir.toLowerCase() || "rtl" === n.css("direction"),
            rtlTranslate:
              "horizontal" === t.params.direction &&
              ("rtl" === e.dir.toLowerCase() || "rtl" === n.css("direction")),
            wrongRTL: "-webkit-box" === s.css("display"),
          }),
          !0
        );
      }
      init(e) {
        const t = this;
        if (t.initialized) return t;
        return (
          !1 === t.mount(e) ||
            (t.emit("beforeInit"),
            t.params.breakpoints && t.setBreakpoint(),
            t.addClasses(),
            t.params.loop && t.loopCreate(),
            t.updateSize(),
            t.updateSlides(),
            t.params.watchOverflow && t.checkOverflow(),
            t.params.grabCursor && t.enabled && t.setGrabCursor(),
            t.params.preloadImages && t.preloadImages(),
            t.params.loop
              ? t.slideTo(
                  t.params.initialSlide + t.loopedSlides,
                  0,
                  t.params.runCallbacksOnInit,
                  !1,
                  !0
                )
              : t.slideTo(
                  t.params.initialSlide,
                  0,
                  t.params.runCallbacksOnInit,
                  !1,
                  !0
                ),
            t.attachEvents(),
            (t.initialized = !0),
            t.emit("init"),
            t.emit("afterInit")),
          t
        );
      }
      destroy(e, t) {
        void 0 === e && (e = !0), void 0 === t && (t = !0);
        const n = this,
          { params: i, $el: s, $wrapperEl: r, slides: o } = n;
        return (
          void 0 === n.params ||
            n.destroyed ||
            (n.emit("beforeDestroy"),
            (n.initialized = !1),
            n.detachEvents(),
            i.loop && n.loopDestroy(),
            t &&
              (n.removeClasses(),
              s.removeAttr("style"),
              r.removeAttr("style"),
              o &&
                o.length &&
                o
                  .removeClass(
                    [
                      i.slideVisibleClass,
                      i.slideActiveClass,
                      i.slideNextClass,
                      i.slidePrevClass,
                    ].join(" ")
                  )
                  .removeAttr("style")
                  .removeAttr("data-swiper-slide-index")),
            n.emit("destroy"),
            Object.keys(n.eventsListeners).forEach((e) => {
              n.off(e);
            }),
            !1 !== e &&
              ((n.$el[0].swiper = null),
              (function (e) {
                const t = e;
                Object.keys(t).forEach((e) => {
                  try {
                    t[e] = null;
                  } catch (e) {}
                  try {
                    delete t[e];
                  } catch (e) {}
                });
              })(n)),
            (n.destroyed = !0)),
          null
        );
      }
      static extendDefaults(e) {
        z(ue, e);
      }
      static get extendedDefaults() {
        return ue;
      }
      static get defaults() {
        return le;
      }
      static installModule(e) {
        pe.prototype.__modules__ || (pe.prototype.__modules__ = []);
        const t = pe.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
      }
      static use(e) {
        return Array.isArray(e)
          ? (e.forEach((e) => pe.installModule(e)), pe)
          : (pe.installModule(e), pe);
      }
    }
    Object.keys(de).forEach((e) => {
      Object.keys(de[e]).forEach((t) => {
        pe.prototype[t] = de[e][t];
      });
    }),
      pe.use([
        function (e) {
          let { swiper: t, on: n, emit: i } = e;
          const s = w();
          let r = null,
            o = null;
          const a = () => {
              t &&
                !t.destroyed &&
                t.initialized &&
                (i("beforeResize"), i("resize"));
            },
            l = () => {
              t && !t.destroyed && t.initialized && i("orientationchange");
            };
          n("init", () => {
            t.params.resizeObserver && void 0 !== s.ResizeObserver
              ? t &&
                !t.destroyed &&
                t.initialized &&
                ((r = new ResizeObserver((e) => {
                  o = s.requestAnimationFrame(() => {
                    const { width: n, height: i } = t;
                    let s = n,
                      r = i;
                    e.forEach((e) => {
                      let { contentBoxSize: n, contentRect: i, target: o } = e;
                      (o && o !== t.el) ||
                        ((s = i ? i.width : (n[0] || n).inlineSize),
                        (r = i ? i.height : (n[0] || n).blockSize));
                    }),
                      (s === n && r === i) || a();
                  });
                })),
                r.observe(t.el))
              : (s.addEventListener("resize", a),
                s.addEventListener("orientationchange", l));
          }),
            n("destroy", () => {
              o && s.cancelAnimationFrame(o),
                r && r.unobserve && t.el && (r.unobserve(t.el), (r = null)),
                s.removeEventListener("resize", a),
                s.removeEventListener("orientationchange", l);
            });
        },
        function (e) {
          let { swiper: t, extendParams: n, on: i, emit: s } = e;
          const r = [],
            o = w(),
            a = function (e, t) {
              void 0 === t && (t = {});
              const n = new (o.MutationObserver || o.WebkitMutationObserver)(
                (e) => {
                  if (1 === e.length) return void s("observerUpdate", e[0]);
                  const t = function () {
                    s("observerUpdate", e[0]);
                  };
                  o.requestAnimationFrame
                    ? o.requestAnimationFrame(t)
                    : o.setTimeout(t, 0);
                }
              );
              n.observe(e, {
                attributes: void 0 === t.attributes || t.attributes,
                childList: void 0 === t.childList || t.childList,
                characterData: void 0 === t.characterData || t.characterData,
              }),
                r.push(n);
            };
          n({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
            i("init", () => {
              if (t.params.observer) {
                if (t.params.observeParents) {
                  const e = t.$el.parents();
                  for (let t = 0; t < e.length; t += 1) a(e[t]);
                }
                a(t.$el[0], { childList: t.params.observeSlideChildren }),
                  a(t.$wrapperEl[0], { attributes: !1 });
              }
            }),
            i("destroy", () => {
              r.forEach((e) => {
                e.disconnect();
              }),
                r.splice(0, r.length);
            });
        },
      ]);
    const he = pe;
    function fe(e, t, n, i) {
      const s = b();
      return (
        e.params.createElements &&
          Object.keys(i).forEach((r) => {
            if (!n[r] && !0 === n.auto) {
              let o = e.$el.children(`.${i[r]}`)[0];
              o ||
                ((o = s.createElement("div")),
                (o.className = i[r]),
                e.$el.append(o)),
                (n[r] = o),
                (t[r] = o);
            }
          }),
        n
      );
    }
    function me(e) {
      let { swiper: t, extendParams: n, on: i, emit: s } = e;
      function r(e) {
        let n;
        return (
          e &&
            ((n = k(e)),
            t.params.uniqueNavElements &&
              "string" == typeof e &&
              n.length > 1 &&
              1 === t.$el.find(e).length &&
              (n = t.$el.find(e))),
          n
        );
      }
      function o(e, n) {
        const i = t.params.navigation;
        e &&
          e.length > 0 &&
          (e[n ? "addClass" : "removeClass"](i.disabledClass),
          e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = n),
          t.params.watchOverflow &&
            t.enabled &&
            e[t.isLocked ? "addClass" : "removeClass"](i.lockClass));
      }
      function a() {
        if (t.params.loop) return;
        const { $nextEl: e, $prevEl: n } = t.navigation;
        o(n, t.isBeginning && !t.params.rewind),
          o(e, t.isEnd && !t.params.rewind);
      }
      function l(e) {
        e.preventDefault(),
          (!t.isBeginning || t.params.loop || t.params.rewind) && t.slidePrev();
      }
      function c(e) {
        e.preventDefault(),
          (!t.isEnd || t.params.loop || t.params.rewind) && t.slideNext();
      }
      function d() {
        const e = t.params.navigation;
        if (
          ((t.params.navigation = fe(
            t,
            t.originalParams.navigation,
            t.params.navigation,
            { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
          )),
          !e.nextEl && !e.prevEl)
        )
          return;
        const n = r(e.nextEl),
          i = r(e.prevEl);
        n && n.length > 0 && n.on("click", c),
          i && i.length > 0 && i.on("click", l),
          Object.assign(t.navigation, {
            $nextEl: n,
            nextEl: n && n[0],
            $prevEl: i,
            prevEl: i && i[0],
          }),
          t.enabled ||
            (n && n.addClass(e.lockClass), i && i.addClass(e.lockClass));
      }
      function u() {
        const { $nextEl: e, $prevEl: n } = t.navigation;
        e &&
          e.length &&
          (e.off("click", c), e.removeClass(t.params.navigation.disabledClass)),
          n &&
            n.length &&
            (n.off("click", l),
            n.removeClass(t.params.navigation.disabledClass));
      }
      n({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
          lockClass: "swiper-button-lock",
        },
      }),
        (t.navigation = {
          nextEl: null,
          $nextEl: null,
          prevEl: null,
          $prevEl: null,
        }),
        i("init", () => {
          d(), a();
        }),
        i("toEdge fromEdge lock unlock", () => {
          a();
        }),
        i("destroy", () => {
          u();
        }),
        i("enable disable", () => {
          const { $nextEl: e, $prevEl: n } = t.navigation;
          e &&
            e[t.enabled ? "removeClass" : "addClass"](
              t.params.navigation.lockClass
            ),
            n &&
              n[t.enabled ? "removeClass" : "addClass"](
                t.params.navigation.lockClass
              );
        }),
        i("click", (e, n) => {
          const { $nextEl: i, $prevEl: r } = t.navigation,
            o = n.target;
          if (t.params.navigation.hideOnClick && !k(o).is(r) && !k(o).is(i)) {
            if (
              t.pagination &&
              t.params.pagination &&
              t.params.pagination.clickable &&
              (t.pagination.el === o || t.pagination.el.contains(o))
            )
              return;
            let e;
            i
              ? (e = i.hasClass(t.params.navigation.hiddenClass))
              : r && (e = r.hasClass(t.params.navigation.hiddenClass)),
              s(!0 === e ? "navigationShow" : "navigationHide"),
              i && i.toggleClass(t.params.navigation.hiddenClass),
              r && r.toggleClass(t.params.navigation.hiddenClass);
          }
        }),
        Object.assign(t.navigation, { update: a, init: d, destroy: u });
    }
    function ve(e) {
      return (
        void 0 === e && (e = ""),
        `.${e
          .trim()
          .replace(/([\.:!\/])/g, "\\$1")
          .replace(/ /g, ".")}`
      );
    }
    function ge(e) {
      let { swiper: t, extendParams: n, on: i, emit: s } = e;
      const r = "swiper-pagination";
      let o;
      n({
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: "bullets",
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: (e) => e,
          formatFractionTotal: (e) => e,
          bulletClass: `${r}-bullet`,
          bulletActiveClass: `${r}-bullet-active`,
          modifierClass: `${r}-`,
          currentClass: `${r}-current`,
          totalClass: `${r}-total`,
          hiddenClass: `${r}-hidden`,
          progressbarFillClass: `${r}-progressbar-fill`,
          progressbarOppositeClass: `${r}-progressbar-opposite`,
          clickableClass: `${r}-clickable`,
          lockClass: `${r}-lock`,
          horizontalClass: `${r}-horizontal`,
          verticalClass: `${r}-vertical`,
        },
      }),
        (t.pagination = { el: null, $el: null, bullets: [] });
      let a = 0;
      function l() {
        return (
          !t.params.pagination.el ||
          !t.pagination.el ||
          !t.pagination.$el ||
          0 === t.pagination.$el.length
        );
      }
      function c(e, n) {
        const { bulletActiveClass: i } = t.params.pagination;
        e[n]().addClass(`${i}-${n}`)[n]().addClass(`${i}-${n}-${n}`);
      }
      function d() {
        const e = t.rtl,
          n = t.params.pagination;
        if (l()) return;
        const i =
            t.virtual && t.params.virtual.enabled
              ? t.virtual.slides.length
              : t.slides.length,
          r = t.pagination.$el;
        let d;
        const u = t.params.loop
          ? Math.ceil((i - 2 * t.loopedSlides) / t.params.slidesPerGroup)
          : t.snapGrid.length;
        if (
          (t.params.loop
            ? ((d = Math.ceil(
                (t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup
              )),
              d > i - 1 - 2 * t.loopedSlides && (d -= i - 2 * t.loopedSlides),
              d > u - 1 && (d -= u),
              d < 0 && "bullets" !== t.params.paginationType && (d = u + d))
            : (d = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
          "bullets" === n.type &&
            t.pagination.bullets &&
            t.pagination.bullets.length > 0)
        ) {
          const i = t.pagination.bullets;
          let s, l, u;
          if (
            (n.dynamicBullets &&
              ((o = i
                .eq(0)
                [t.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
              r.css(
                t.isHorizontal() ? "width" : "height",
                o * (n.dynamicMainBullets + 4) + "px"
              ),
              n.dynamicMainBullets > 1 &&
                void 0 !== t.previousIndex &&
                ((a += d - (t.previousIndex - t.loopedSlides || 0)),
                a > n.dynamicMainBullets - 1
                  ? (a = n.dynamicMainBullets - 1)
                  : a < 0 && (a = 0)),
              (s = Math.max(d - a, 0)),
              (l = s + (Math.min(i.length, n.dynamicMainBullets) - 1)),
              (u = (l + s) / 2)),
            i.removeClass(
              ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
                .map((e) => `${n.bulletActiveClass}${e}`)
                .join(" ")
            ),
            r.length > 1)
          )
            i.each((e) => {
              const t = k(e),
                i = t.index();
              i === d && t.addClass(n.bulletActiveClass),
                n.dynamicBullets &&
                  (i >= s &&
                    i <= l &&
                    t.addClass(`${n.bulletActiveClass}-main`),
                  i === s && c(t, "prev"),
                  i === l && c(t, "next"));
            });
          else {
            const e = i.eq(d),
              r = e.index();
            if ((e.addClass(n.bulletActiveClass), n.dynamicBullets)) {
              const e = i.eq(s),
                o = i.eq(l);
              for (let e = s; e <= l; e += 1)
                i.eq(e).addClass(`${n.bulletActiveClass}-main`);
              if (t.params.loop)
                if (r >= i.length) {
                  for (let e = n.dynamicMainBullets; e >= 0; e -= 1)
                    i.eq(i.length - e).addClass(`${n.bulletActiveClass}-main`);
                  i.eq(i.length - n.dynamicMainBullets - 1).addClass(
                    `${n.bulletActiveClass}-prev`
                  );
                } else c(e, "prev"), c(o, "next");
              else c(e, "prev"), c(o, "next");
            }
          }
          if (n.dynamicBullets) {
            const s = Math.min(i.length, n.dynamicMainBullets + 4),
              r = (o * s - o) / 2 - u * o,
              a = e ? "right" : "left";
            i.css(t.isHorizontal() ? a : "top", `${r}px`);
          }
        }
        if (
          ("fraction" === n.type &&
            (r.find(ve(n.currentClass)).text(n.formatFractionCurrent(d + 1)),
            r.find(ve(n.totalClass)).text(n.formatFractionTotal(u))),
          "progressbar" === n.type)
        ) {
          let e;
          e = n.progressbarOpposite
            ? t.isHorizontal()
              ? "vertical"
              : "horizontal"
            : t.isHorizontal()
            ? "horizontal"
            : "vertical";
          const i = (d + 1) / u;
          let s = 1,
            o = 1;
          "horizontal" === e ? (s = i) : (o = i),
            r
              .find(ve(n.progressbarFillClass))
              .transform(`translate3d(0,0,0) scaleX(${s}) scaleY(${o})`)
              .transition(t.params.speed);
        }
        "custom" === n.type && n.renderCustom
          ? (r.html(n.renderCustom(t, d + 1, u)), s("paginationRender", r[0]))
          : s("paginationUpdate", r[0]),
          t.params.watchOverflow &&
            t.enabled &&
            r[t.isLocked ? "addClass" : "removeClass"](n.lockClass);
      }
      function u() {
        const e = t.params.pagination;
        if (l()) return;
        const n =
            t.virtual && t.params.virtual.enabled
              ? t.virtual.slides.length
              : t.slides.length,
          i = t.pagination.$el;
        let r = "";
        if ("bullets" === e.type) {
          let s = t.params.loop
            ? Math.ceil((n - 2 * t.loopedSlides) / t.params.slidesPerGroup)
            : t.snapGrid.length;
          t.params.freeMode &&
            t.params.freeMode.enabled &&
            !t.params.loop &&
            s > n &&
            (s = n);
          for (let n = 0; n < s; n += 1)
            e.renderBullet
              ? (r += e.renderBullet.call(t, n, e.bulletClass))
              : (r += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`);
          i.html(r), (t.pagination.bullets = i.find(ve(e.bulletClass)));
        }
        "fraction" === e.type &&
          ((r = e.renderFraction
            ? e.renderFraction.call(t, e.currentClass, e.totalClass)
            : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
          i.html(r)),
          "progressbar" === e.type &&
            ((r = e.renderProgressbar
              ? e.renderProgressbar.call(t, e.progressbarFillClass)
              : `<span class="${e.progressbarFillClass}"></span>`),
            i.html(r)),
          "custom" !== e.type && s("paginationRender", t.pagination.$el[0]);
      }
      function p() {
        t.params.pagination = fe(
          t,
          t.originalParams.pagination,
          t.params.pagination,
          { el: "swiper-pagination" }
        );
        const e = t.params.pagination;
        if (!e.el) return;
        let n = k(e.el);
        0 !== n.length &&
          (t.params.uniqueNavElements &&
            "string" == typeof e.el &&
            n.length > 1 &&
            ((n = t.$el.find(e.el)),
            n.length > 1 &&
              (n = n.filter((e) => k(e).parents(".swiper")[0] === t.el))),
          "bullets" === e.type && e.clickable && n.addClass(e.clickableClass),
          n.addClass(e.modifierClass + e.type),
          n.addClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
          "bullets" === e.type &&
            e.dynamicBullets &&
            (n.addClass(`${e.modifierClass}${e.type}-dynamic`),
            (a = 0),
            e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
          "progressbar" === e.type &&
            e.progressbarOpposite &&
            n.addClass(e.progressbarOppositeClass),
          e.clickable &&
            n.on("click", ve(e.bulletClass), function (e) {
              e.preventDefault();
              let n = k(this).index() * t.params.slidesPerGroup;
              t.params.loop && (n += t.loopedSlides), t.slideTo(n);
            }),
          Object.assign(t.pagination, { $el: n, el: n[0] }),
          t.enabled || n.addClass(e.lockClass));
      }
      function h() {
        const e = t.params.pagination;
        if (l()) return;
        const n = t.pagination.$el;
        n.removeClass(e.hiddenClass),
          n.removeClass(e.modifierClass + e.type),
          n.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
          t.pagination.bullets &&
            t.pagination.bullets.removeClass &&
            t.pagination.bullets.removeClass(e.bulletActiveClass),
          e.clickable && n.off("click", ve(e.bulletClass));
      }
      i("init", () => {
        p(), u(), d();
      }),
        i("activeIndexChange", () => {
          (t.params.loop || void 0 === t.snapIndex) && d();
        }),
        i("snapIndexChange", () => {
          t.params.loop || d();
        }),
        i("slidesLengthChange", () => {
          t.params.loop && (u(), d());
        }),
        i("snapGridLengthChange", () => {
          t.params.loop || (u(), d());
        }),
        i("destroy", () => {
          h();
        }),
        i("enable disable", () => {
          const { $el: e } = t.pagination;
          e &&
            e[t.enabled ? "removeClass" : "addClass"](
              t.params.pagination.lockClass
            );
        }),
        i("lock unlock", () => {
          d();
        }),
        i("click", (e, n) => {
          const i = n.target,
            { $el: r } = t.pagination;
          if (
            t.params.pagination.el &&
            t.params.pagination.hideOnClick &&
            r.length > 0 &&
            !k(i).hasClass(t.params.pagination.bulletClass)
          ) {
            if (
              t.navigation &&
              ((t.navigation.nextEl && i === t.navigation.nextEl) ||
                (t.navigation.prevEl && i === t.navigation.prevEl))
            )
              return;
            const e = r.hasClass(t.params.pagination.hiddenClass);
            s(!0 === e ? "paginationShow" : "paginationHide"),
              r.toggleClass(t.params.pagination.hiddenClass);
          }
        }),
        Object.assign(t.pagination, {
          render: u,
          update: d,
          init: p,
          destroy: h,
        });
    }
    function be() {
      let e = document.querySelectorAll(
        '[class*="__swiper"]:not(.swiper-wrapper)'
      );
      e &&
        e.forEach((e) => {
          e.parentElement.classList.add("swiper"),
            e.classList.add("swiper-wrapper");
          for (const t of e.children) t.classList.add("swiper-slide");
        });
    }
    window.addEventListener("load", function (e) {
      be(),
        document.querySelector(".main-slider") &&
          document.querySelectorAll(".main-slider__slide").length > 1 &&
          new he(".main-slider__slider", {
            modules: [me, ge],
            observer: !0,
            observeParents: !0,
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
            loop: !0,
            lazy: !0,
            pagination: { el: ".slider-dotts", clickable: !0 },
            navigation: {
              nextEl: ".controls-main-slider__arrow_next",
              prevEl: ".controls-main-slider__arrow_prev",
            },
            on: {},
          }),
        window.innerWidth < 1365.98 &&
          document.querySelector(".news-aside__slider") &&
          new he(".news-aside__slider", {
            modules: [ge],
            observer: !0,
            observeParents: !0,
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
            loop: !0,
            pagination: { el: ".slider-dotts", clickable: !0 },
            on: {},
          });
    });
    new (n(732))({
      elements_selector: "[data-src],[data-srcset]",
      class_loaded: "_lazy-loaded",
      use_native: !0,
    });
    e.watcher = new (class {
      constructor(e) {
        (this.config = Object.assign({ logging: !0 }, e)),
          this.observer,
          !document.documentElement.classList.contains("watcher") &&
            this.scrollWatcherRun();
      }
      scrollWatcherUpdate() {
        this.scrollWatcherRun();
      }
      scrollWatcherRun() {
        document.documentElement.classList.add("watcher"),
          this.scrollWatcherConstructor(
            document.querySelectorAll("[data-watch]")
          );
      }
      scrollWatcherConstructor(e) {
        if (e.length) {
          this.scrollWatcherLogging(
            `Проснулся, слежу за объектами (${e.length})...`
          ),
            h(
              Array.from(e).map(function (e) {
                return `${
                  e.dataset.watchRoot ? e.dataset.watchRoot : null
                }|${e.dataset.watchMargin ? e.dataset.watchMargin : "0px"}|${e.dataset.watchThreshold ? e.dataset.watchThreshold : 0}`;
              })
            ).forEach((t) => {
              let n = t.split("|"),
                i = { root: n[0], margin: n[1], threshold: n[2] },
                s = Array.from(e).filter(function (e) {
                  let t = e.dataset.watchRoot ? e.dataset.watchRoot : null,
                    n = e.dataset.watchMargin ? e.dataset.watchMargin : "0px",
                    s = e.dataset.watchThreshold ? e.dataset.watchThreshold : 0;
                  if (
                    String(t) === i.root &&
                    String(n) === i.margin &&
                    String(s) === i.threshold
                  )
                    return e;
                }),
                r = this.getScrollWatcherConfig(i);
              this.scrollWatcherInit(s, r);
            });
        } else
          this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
      }
      getScrollWatcherConfig(e) {
        let t = {};
        if (
          (document.querySelector(e.root)
            ? (t.root = document.querySelector(e.root))
            : "null" !== e.root &&
              this.scrollWatcherLogging(
                `Эмм... родительского объекта ${e.root} нет на странице`
              ),
          (t.rootMargin = e.margin),
          !(e.margin.indexOf("px") < 0 && e.margin.indexOf("%") < 0))
        ) {
          if ("prx" === e.threshold) {
            e.threshold = [];
            for (let t = 0; t <= 1; t += 0.005) e.threshold.push(t);
          } else e.threshold = e.threshold.split(",");
          return (t.threshold = e.threshold), t;
        }
        this.scrollWatcherLogging(
          "Ой ой, настройку data-watch-margin нужно задавать в PX или %"
        );
      }
      scrollWatcherCreate(e) {
        this.observer = new IntersectionObserver((e, t) => {
          e.forEach((e) => {
            this.scrollWatcherCallback(e, t);
          });
        }, e);
      }
      scrollWatcherInit(e, t) {
        this.scrollWatcherCreate(t), e.forEach((e) => this.observer.observe(e));
      }
      scrollWatcherIntersecting(e, t) {
        e.isIntersecting
          ? (!t.classList.contains("_watcher-view") &&
              t.classList.add("_watcher-view"),
            this.scrollWatcherLogging(
              `Я вижу ${t.classList}, добавил класс _watcher-view`
            ))
          : (t.classList.contains("_watcher-view") &&
              t.classList.remove("_watcher-view"),
            this.scrollWatcherLogging(
              `Я не вижу ${t.classList}, убрал класс _watcher-view`
            ));
      }
      scrollWatcherOff(e, t) {
        t.unobserve(e),
          this.scrollWatcherLogging(`Я перестал следить за ${e.classList}`);
      }
      scrollWatcherLogging(e) {
        this.config.logging && p(`[Наблюдатель]: ${e}`);
      }
      scrollWatcherCallback(e, t) {
        const n = e.target;
        this.scrollWatcherIntersecting(e, n),
          n.hasAttribute("data-watch-once") &&
            e.isIntersecting &&
            this.scrollWatcherOff(n, t),
          document.dispatchEvent(
            new CustomEvent("watcherCallback", { detail: { entry: e } })
          );
      }
    })({});
    let ye = !1;
    function we(e) {
      this.type = e;
    }
    setTimeout(() => {
      if (ye) {
        let e = new Event("windowScroll");
        window.addEventListener("scroll", function (t) {
          document.dispatchEvent(e);
        });
      }
    }, 0),
      (we.prototype.init = function () {
        const e = this;
        (this.оbjects = []),
          (this.daClassname = "_dynamic_adapt_"),
          (this.nodes = document.querySelectorAll("[data-da]"));
        for (let e = 0; e < this.nodes.length; e++) {
          const t = this.nodes[e],
            n = t.dataset.da.trim().split(","),
            i = {};
          (i.element = t),
            (i.parent = t.parentNode),
            (i.destination = document.querySelector(n[0].trim())),
            (i.breakpoint = n[1] ? n[1].trim() : "767"),
            (i.place = n[2] ? n[2].trim() : "last"),
            (i.index = this.indexInParent(i.parent, i.element)),
            this.оbjects.push(i);
        }
        this.arraySort(this.оbjects),
          (this.mediaQueries = Array.prototype.map.call(
            this.оbjects,
            function (e) {
              return (
                "(" +
                this.type +
                "-width: " +
                e.breakpoint +
                "px)," +
                e.breakpoint
              );
            },
            this
          )),
          (this.mediaQueries = Array.prototype.filter.call(
            this.mediaQueries,
            function (e, t, n) {
              return Array.prototype.indexOf.call(n, e) === t;
            }
          ));
        for (let t = 0; t < this.mediaQueries.length; t++) {
          const n = this.mediaQueries[t],
            i = String.prototype.split.call(n, ","),
            s = window.matchMedia(i[0]),
            r = i[1],
            o = Array.prototype.filter.call(this.оbjects, function (e) {
              return e.breakpoint === r;
            });
          s.addListener(function () {
            e.mediaHandler(s, o);
          }),
            this.mediaHandler(s, o);
        }
      }),
      (we.prototype.mediaHandler = function (e, t) {
        if (e.matches)
          for (let e = 0; e < t.length; e++) {
            const n = t[e];
            (n.index = this.indexInParent(n.parent, n.element)),
              this.moveTo(n.place, n.element, n.destination);
          }
        else
          for (let e = t.length - 1; e >= 0; e--) {
            const n = t[e];
            n.element.classList.contains(this.daClassname) &&
              this.moveBack(n.parent, n.element, n.index);
          }
      }),
      (we.prototype.moveTo = function (e, t, n) {
        t.classList.add(this.daClassname),
          "last" === e || e >= n.children.length
            ? n.insertAdjacentElement("beforeend", t)
            : "first" !== e
            ? n.children[e].insertAdjacentElement("beforebegin", t)
            : n.insertAdjacentElement("afterbegin", t);
      }),
      (we.prototype.moveBack = function (e, t, n) {
        t.classList.remove(this.daClassname),
          void 0 !== e.children[n]
            ? e.children[n].insertAdjacentElement("beforebegin", t)
            : e.insertAdjacentElement("beforeend", t);
      }),
      (we.prototype.indexInParent = function (e, t) {
        const n = Array.prototype.slice.call(e.children);
        return Array.prototype.indexOf.call(n, t);
      }),
      (we.prototype.arraySort = function (e) {
        "min" === this.type
          ? Array.prototype.sort.call(e, function (e, t) {
              return e.breakpoint === t.breakpoint
                ? e.place === t.place
                  ? 0
                  : "first" === e.place || "last" === t.place
                  ? -1
                  : "last" === e.place || "first" === t.place
                  ? 1
                  : e.place - t.place
                : e.breakpoint - t.breakpoint;
            })
          : Array.prototype.sort.call(e, function (e, t) {
              return e.breakpoint === t.breakpoint
                ? e.place === t.place
                  ? 0
                  : "first" === e.place || "last" === t.place
                  ? 1
                  : "last" === e.place || "first" === t.place
                  ? -1
                  : t.place - e.place
                : t.breakpoint - e.breakpoint;
            });
      });
    var Ee, xe;
    function Se() {
      try {
        const e = document.querySelector(".slide-main-slider");
        let t = document.querySelector(".header");
        if ("dark" === localStorage.getItem("theme")) {
          if (
            (document.querySelector("html").classList.add("dark"),
            console.log("тёмная"),
            e)
          ) {
            console.log("темная и слайдер");
            (document.querySelector(".header__background").style.display =
              "none"),
              (t.style.position = "absolute");
          }
        } else
          document.querySelector("html").classList.remove("dark"),
            (t.style.position = "relative");
      } catch (e) {}
    }
    new we("max").init(),
      (Ee = void 0),
      (xe = function () {
        var e =
          "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof window
            ? window
            : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : {};
        function t(e, t) {
          return e((t = { exports: {} }), t.exports), t.exports;
        }
        var n,
          i,
          s,
          r = "object",
          o = function (e) {
            return e && e.Math == Math && e;
          },
          a =
            o(typeof globalThis == r && globalThis) ||
            o(typeof window == r && window) ||
            o(typeof self == r && self) ||
            o(typeof e == r && e) ||
            Function("return this")(),
          l = function (e) {
            try {
              return !!e();
            } catch (e) {
              return !0;
            }
          },
          c = !l(function () {
            return (
              7 !=
              Object.defineProperty({}, "a", {
                get: function () {
                  return 7;
                },
              }).a
            );
          }),
          d = {}.propertyIsEnumerable,
          u = Object.getOwnPropertyDescriptor,
          p = {
            f:
              u && !d.call({ 1: 2 }, 1)
                ? function (e) {
                    var t = u(this, e);
                    return !!t && t.enumerable;
                  }
                : d,
          },
          h = function (e, t) {
            return {
              enumerable: !(1 & e),
              configurable: !(2 & e),
              writable: !(4 & e),
              value: t,
            };
          },
          f = {}.toString,
          m = function (e) {
            return f.call(e).slice(8, -1);
          },
          v = "".split,
          g = l(function () {
            return !Object("z").propertyIsEnumerable(0);
          })
            ? function (e) {
                return "String" == m(e) ? v.call(e, "") : Object(e);
              }
            : Object,
          b = function (e) {
            if (null == e) throw TypeError("Can't call method on " + e);
            return e;
          },
          y = function (e) {
            return g(b(e));
          },
          w = function (e) {
            return "object" == typeof e ? null !== e : "function" == typeof e;
          },
          E = function (e, t) {
            if (!w(e)) return e;
            var n, i;
            if (
              t &&
              "function" == typeof (n = e.toString) &&
              !w((i = n.call(e)))
            )
              return i;
            if ("function" == typeof (n = e.valueOf) && !w((i = n.call(e))))
              return i;
            if (
              !t &&
              "function" == typeof (n = e.toString) &&
              !w((i = n.call(e)))
            )
              return i;
            throw TypeError("Can't convert object to primitive value");
          },
          x = {}.hasOwnProperty,
          S = function (e, t) {
            return x.call(e, t);
          },
          C = a.document,
          T = w(C) && w(C.createElement),
          O = function (e) {
            return T ? C.createElement(e) : {};
          },
          _ =
            !c &&
            !l(function () {
              return (
                7 !=
                Object.defineProperty(O("div"), "a", {
                  get: function () {
                    return 7;
                  },
                }).a
              );
            }),
          k = Object.getOwnPropertyDescriptor,
          L = {
            f: c
              ? k
              : function (e, t) {
                  if (((e = y(e)), (t = E(t, !0)), _))
                    try {
                      return k(e, t);
                    } catch (e) {}
                  if (S(e, t)) return h(!p.f.call(e, t), e[t]);
                },
          },
          A = function (e) {
            if (!w(e)) throw TypeError(String(e) + " is not an object");
            return e;
          },
          M = Object.defineProperty,
          P = {
            f: c
              ? M
              : function (e, t, n) {
                  if ((A(e), (t = E(t, !0)), A(n), _))
                    try {
                      return M(e, t, n);
                    } catch (e) {}
                  if ("get" in n || "set" in n)
                    throw TypeError("Accessors not supported");
                  return "value" in n && (e[t] = n.value), e;
                },
          },
          $ = c
            ? function (e, t, n) {
                return P.f(e, t, h(1, n));
              }
            : function (e, t, n) {
                return (e[t] = n), e;
              },
          z = function (e, t) {
            try {
              $(a, e, t);
            } catch (n) {
              a[e] = t;
            }
            return t;
          },
          I = t(function (e) {
            var t = a["__core-js_shared__"] || z("__core-js_shared__", {});
            (e.exports = function (e, n) {
              return t[e] || (t[e] = void 0 !== n ? n : {});
            })("versions", []).push({
              version: "3.2.1",
              mode: "global",
              copyright: "© 2019 Denis Pushkarev (zloirock.ru)",
            });
          }),
          N = I("native-function-to-string", Function.toString),
          W = a.WeakMap,
          B = "function" == typeof W && /native code/.test(N.call(W)),
          D = 0,
          R = Math.random(),
          j = function (e) {
            return (
              "Symbol(" +
              String(void 0 === e ? "" : e) +
              ")_" +
              (++D + R).toString(36)
            );
          },
          q = I("keys"),
          G = function (e) {
            return q[e] || (q[e] = j(e));
          },
          H = {},
          F = a.WeakMap;
        if (B) {
          var V = new F(),
            X = V.get,
            Y = V.has,
            U = V.set;
          (n = function (e, t) {
            return U.call(V, e, t), t;
          }),
            (i = function (e) {
              return X.call(V, e) || {};
            }),
            (s = function (e) {
              return Y.call(V, e);
            });
        } else {
          var Q = G("state");
          (H[Q] = !0),
            (n = function (e, t) {
              return $(e, Q, t), t;
            }),
            (i = function (e) {
              return S(e, Q) ? e[Q] : {};
            }),
            (s = function (e) {
              return S(e, Q);
            });
        }
        var K = {
            set: n,
            get: i,
            has: s,
            enforce: function (e) {
              return s(e) ? i(e) : n(e, {});
            },
            getterFor: function (e) {
              return function (t) {
                var n;
                if (!w(t) || (n = i(t)).type !== e)
                  throw TypeError("Incompatible receiver, " + e + " required");
                return n;
              };
            },
          },
          J = t(function (e) {
            var t = K.get,
              n = K.enforce,
              i = String(N).split("toString");
            I("inspectSource", function (e) {
              return N.call(e);
            }),
              (e.exports = function (e, t, s, r) {
                var o = !!r && !!r.unsafe,
                  l = !!r && !!r.enumerable,
                  c = !!r && !!r.noTargetGet;
                "function" == typeof s &&
                  ("string" != typeof t || S(s, "name") || $(s, "name", t),
                  (n(s).source = i.join("string" == typeof t ? t : ""))),
                  e !== a
                    ? (o ? !c && e[t] && (l = !0) : delete e[t],
                      l ? (e[t] = s) : $(e, t, s))
                    : l
                    ? (e[t] = s)
                    : z(t, s);
              })(Function.prototype, "toString", function () {
                return (
                  ("function" == typeof this && t(this).source) || N.call(this)
                );
              });
          }),
          Z = a,
          ee = function (e) {
            return "function" == typeof e ? e : void 0;
          },
          te = function (e, t) {
            return arguments.length < 2
              ? ee(Z[e]) || ee(a[e])
              : (Z[e] && Z[e][t]) || (a[e] && a[e][t]);
          },
          ne = Math.ceil,
          ie = Math.floor,
          se = function (e) {
            return isNaN((e = +e)) ? 0 : (e > 0 ? ie : ne)(e);
          },
          re = Math.min,
          oe = function (e) {
            return e > 0 ? re(se(e), 9007199254740991) : 0;
          },
          ae = Math.max,
          le = Math.min,
          ce = function (e) {
            return function (t, n, i) {
              var s,
                r = y(t),
                o = oe(r.length),
                a = (function (e, t) {
                  var n = se(e);
                  return n < 0 ? ae(n + t, 0) : le(n, t);
                })(i, o);
              if (e && n != n) {
                for (; o > a; ) if ((s = r[a++]) != s) return !0;
              } else
                for (; o > a; a++)
                  if ((e || a in r) && r[a] === n) return e || a || 0;
              return !e && -1;
            };
          },
          de = (ce(!0), ce(!1)),
          ue = function (e, t) {
            var n,
              i = y(e),
              s = 0,
              r = [];
            for (n in i) !S(H, n) && S(i, n) && r.push(n);
            for (; t.length > s; )
              S(i, (n = t[s++])) && (~de(r, n) || r.push(n));
            return r;
          },
          pe = [
            "constructor",
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable",
            "toLocaleString",
            "toString",
            "valueOf",
          ],
          he = pe.concat("length", "prototype"),
          fe = {
            f:
              Object.getOwnPropertyNames ||
              function (e) {
                return ue(e, he);
              },
          },
          me = { f: Object.getOwnPropertySymbols },
          ve =
            te("Reflect", "ownKeys") ||
            function (e) {
              var t = fe.f(A(e)),
                n = me.f;
              return n ? t.concat(n(e)) : t;
            },
          ge = function (e, t) {
            for (var n = ve(t), i = P.f, s = L.f, r = 0; r < n.length; r++) {
              var o = n[r];
              S(e, o) || i(e, o, s(t, o));
            }
          },
          be = /#|\.prototype\./,
          ye = function (e, t) {
            var n = Ee[we(e)];
            return (
              n == Se || (n != xe && ("function" == typeof t ? l(t) : !!t))
            );
          },
          we = (ye.normalize = function (e) {
            return String(e).replace(be, ".").toLowerCase();
          }),
          Ee = (ye.data = {}),
          xe = (ye.NATIVE = "N"),
          Se = (ye.POLYFILL = "P"),
          Ce = ye,
          Te = L.f,
          Oe = function (e, t) {
            var n,
              i,
              s,
              r,
              o,
              l = e.target,
              c = e.global,
              d = e.stat;
            if ((n = c ? a : d ? a[l] || z(l, {}) : (a[l] || {}).prototype))
              for (i in t) {
                if (
                  ((r = t[i]),
                  (s = e.noTargetGet ? (o = Te(n, i)) && o.value : n[i]),
                  !Ce(c ? i : l + (d ? "." : "#") + i, e.forced) &&
                    void 0 !== s)
                ) {
                  if (typeof r == typeof s) continue;
                  ge(r, s);
                }
                (e.sham || (s && s.sham)) && $(r, "sham", !0), J(n, i, r, e);
              }
          },
          _e = function (e) {
            if ("function" != typeof e)
              throw TypeError(String(e) + " is not a function");
            return e;
          },
          ke = function (e, t, n) {
            if ((_e(e), void 0 === t)) return e;
            switch (n) {
              case 0:
                return function () {
                  return e.call(t);
                };
              case 1:
                return function (n) {
                  return e.call(t, n);
                };
              case 2:
                return function (n, i) {
                  return e.call(t, n, i);
                };
              case 3:
                return function (n, i, s) {
                  return e.call(t, n, i, s);
                };
            }
            return function () {
              return e.apply(t, arguments);
            };
          },
          Le = function (e) {
            return Object(b(e));
          },
          Ae =
            Array.isArray ||
            function (e) {
              return "Array" == m(e);
            },
          Me =
            !!Object.getOwnPropertySymbols &&
            !l(function () {
              return !String(Symbol());
            }),
          Pe = a.Symbol,
          $e = I("wks"),
          ze = function (e) {
            return (
              $e[e] || ($e[e] = (Me && Pe[e]) || (Me ? Pe : j)("Symbol." + e))
            );
          },
          Ie = ze("species"),
          Ne = function (e, t) {
            var n;
            return (
              Ae(e) &&
                ("function" != typeof (n = e.constructor) ||
                (n !== Array && !Ae(n.prototype))
                  ? w(n) && null === (n = n[Ie]) && (n = void 0)
                  : (n = void 0)),
              new (void 0 === n ? Array : n)(0 === t ? 0 : t)
            );
          },
          We = [].push,
          Be = function (e) {
            var t = 1 == e,
              n = 2 == e,
              i = 3 == e,
              s = 4 == e,
              r = 6 == e,
              o = 5 == e || r;
            return function (a, l, c, d) {
              for (
                var u,
                  p,
                  h = Le(a),
                  f = g(h),
                  m = ke(l, c, 3),
                  v = oe(f.length),
                  b = 0,
                  y = d || Ne,
                  w = t ? y(a, v) : n ? y(a, 0) : void 0;
                v > b;
                b++
              )
                if ((o || b in f) && ((p = m((u = f[b]), b, h)), e))
                  if (t) w[b] = p;
                  else if (p)
                    switch (e) {
                      case 3:
                        return !0;
                      case 5:
                        return u;
                      case 6:
                        return b;
                      case 2:
                        We.call(w, u);
                    }
                  else if (s) return !1;
              return r ? -1 : i || s ? s : w;
            };
          },
          De = {
            forEach: Be(0),
            map: Be(1),
            filter: Be(2),
            some: Be(3),
            every: Be(4),
            find: Be(5),
            findIndex: Be(6),
          },
          Re = function (e, t) {
            var n = [][e];
            return (
              !n ||
              !l(function () {
                n.call(
                  null,
                  t ||
                    function () {
                      throw 1;
                    },
                  1
                );
              })
            );
          },
          je = De.forEach,
          qe = Re("forEach")
            ? function (e) {
                return je(
                  this,
                  e,
                  arguments.length > 1 ? arguments[1] : void 0
                );
              }
            : [].forEach;
        Oe(
          { target: "Array", proto: !0, forced: [].forEach != qe },
          { forEach: qe }
        );
        var Ge = {
          CSSRuleList: 0,
          CSSStyleDeclaration: 0,
          CSSValueList: 0,
          ClientRectList: 0,
          DOMRectList: 0,
          DOMStringList: 0,
          DOMTokenList: 1,
          DataTransferItemList: 0,
          FileList: 0,
          HTMLAllCollection: 0,
          HTMLCollection: 0,
          HTMLFormElement: 0,
          HTMLSelectElement: 0,
          MediaList: 0,
          MimeTypeArray: 0,
          NamedNodeMap: 0,
          NodeList: 1,
          PaintRequestList: 0,
          Plugin: 0,
          PluginArray: 0,
          SVGLengthList: 0,
          SVGNumberList: 0,
          SVGPathSegList: 0,
          SVGPointList: 0,
          SVGStringList: 0,
          SVGTransformList: 0,
          SourceBufferList: 0,
          StyleSheetList: 0,
          TextTrackCueList: 0,
          TextTrackList: 0,
          TouchList: 0,
        };
        for (var He in Ge) {
          var Fe = a[He],
            Ve = Fe && Fe.prototype;
          if (Ve && Ve.forEach !== qe)
            try {
              $(Ve, "forEach", qe);
            } catch (e) {
              Ve.forEach = qe;
            }
        }
        var Xe = !(
            "undefined" == typeof window ||
            !window.document ||
            !window.document.createElement
          ),
          Ye = ze("species"),
          Ue = De.filter;
        Oe(
          {
            target: "Array",
            proto: !0,
            forced: !!l(function () {
              var e = [];
              return (
                ((e.constructor = {})[Ye] = function () {
                  return { foo: 1 };
                }),
                1 !== e.filter(Boolean).foo
              );
            }),
          },
          {
            filter: function (e) {
              return Ue(this, e, arguments.length > 1 ? arguments[1] : void 0);
            },
          }
        );
        var Qe =
            Object.keys ||
            function (e) {
              return ue(e, pe);
            },
          Ke = c
            ? Object.defineProperties
            : function (e, t) {
                A(e);
                for (var n, i = Qe(t), s = i.length, r = 0; s > r; )
                  P.f(e, (n = i[r++]), t[n]);
                return e;
              },
          Je = te("document", "documentElement"),
          Ze = G("IE_PROTO"),
          et = function () {},
          tt = function () {
            var e,
              t = O("iframe"),
              n = pe.length;
            for (
              t.style.display = "none",
                Je.appendChild(t),
                t.src = String("javascript:"),
                (e = t.contentWindow.document).open(),
                e.write("<script>document.F=Object</script>"),
                e.close(),
                tt = e.F;
              n--;

            )
              delete tt.prototype[pe[n]];
            return tt();
          },
          nt =
            Object.create ||
            function (e, t) {
              var n;
              return (
                null !== e
                  ? ((et.prototype = A(e)),
                    (n = new et()),
                    (et.prototype = null),
                    (n[Ze] = e))
                  : (n = tt()),
                void 0 === t ? n : Ke(n, t)
              );
            };
        H[Ze] = !0;
        var it = ze("unscopables"),
          st = Array.prototype;
        null == st[it] && $(st, it, nt(null));
        var rt,
          ot,
          at,
          lt = function (e) {
            st[it][e] = !0;
          },
          ct = {},
          dt = !l(function () {
            function e() {}
            return (
              (e.prototype.constructor = null),
              Object.getPrototypeOf(new e()) !== e.prototype
            );
          }),
          ut = G("IE_PROTO"),
          pt = Object.prototype,
          ht = dt
            ? Object.getPrototypeOf
            : function (e) {
                return (
                  (e = Le(e)),
                  S(e, ut)
                    ? e[ut]
                    : "function" == typeof e.constructor &&
                      e instanceof e.constructor
                    ? e.constructor.prototype
                    : e instanceof Object
                    ? pt
                    : null
                );
              },
          ft = ze("iterator"),
          mt = !1;
        [].keys &&
          ("next" in (at = [].keys())
            ? (ot = ht(ht(at))) !== Object.prototype && (rt = ot)
            : (mt = !0)),
          null == rt && (rt = {}),
          S(rt, ft) ||
            $(rt, ft, function () {
              return this;
            });
        var vt = { IteratorPrototype: rt, BUGGY_SAFARI_ITERATORS: mt },
          gt = P.f,
          bt = ze("toStringTag"),
          yt = function (e, t, n) {
            e &&
              !S((e = n ? e : e.prototype), bt) &&
              gt(e, bt, { configurable: !0, value: t });
          },
          wt = vt.IteratorPrototype,
          Et = function () {
            return this;
          },
          xt =
            Object.setPrototypeOf ||
            ("__proto__" in {}
              ? (function () {
                  var e,
                    t = !1,
                    n = {};
                  try {
                    (e = Object.getOwnPropertyDescriptor(
                      Object.prototype,
                      "__proto__"
                    ).set).call(n, []),
                      (t = n instanceof Array);
                  } catch (e) {}
                  return function (n, i) {
                    return (
                      A(n),
                      (function (e) {
                        if (!w(e) && null !== e)
                          throw TypeError(
                            "Can't set " + String(e) + " as a prototype"
                          );
                      })(i),
                      t ? e.call(n, i) : (n.__proto__ = i),
                      n
                    );
                  };
                })()
              : void 0),
          St = vt.IteratorPrototype,
          Ct = vt.BUGGY_SAFARI_ITERATORS,
          Tt = ze("iterator"),
          Ot = function () {
            return this;
          },
          _t = function (e, t, n, i, s, r, o) {
            !(function (e, t, n) {
              var i = t + " Iterator";
              (e.prototype = nt(wt, { next: h(1, n) })),
                yt(e, i, !1),
                (ct[i] = Et);
            })(n, t, i);
            var a,
              l,
              c,
              d = function (e) {
                if (e === s && v) return v;
                if (!Ct && e in f) return f[e];
                switch (e) {
                  case "keys":
                  case "values":
                  case "entries":
                    return function () {
                      return new n(this, e);
                    };
                }
                return function () {
                  return new n(this);
                };
              },
              u = t + " Iterator",
              p = !1,
              f = e.prototype,
              m = f[Tt] || f["@@iterator"] || (s && f[s]),
              v = (!Ct && m) || d(s),
              g = ("Array" == t && f.entries) || m;
            if (
              (g &&
                ((a = ht(g.call(new e()))),
                St !== Object.prototype &&
                  a.next &&
                  (ht(a) !== St &&
                    (xt
                      ? xt(a, St)
                      : "function" != typeof a[Tt] && $(a, Tt, Ot)),
                  yt(a, u, !0))),
              "values" == s &&
                m &&
                "values" !== m.name &&
                ((p = !0),
                (v = function () {
                  return m.call(this);
                })),
              f[Tt] !== v && $(f, Tt, v),
              (ct[t] = v),
              s)
            )
              if (
                ((l = {
                  values: d("values"),
                  keys: r ? v : d("keys"),
                  entries: d("entries"),
                }),
                o)
              )
                for (c in l) (!Ct && !p && c in f) || J(f, c, l[c]);
              else Oe({ target: t, proto: !0, forced: Ct || p }, l);
            return l;
          },
          kt = K.set,
          Lt = K.getterFor("Array Iterator"),
          At = _t(
            Array,
            "Array",
            function (e, t) {
              kt(this, {
                type: "Array Iterator",
                target: y(e),
                index: 0,
                kind: t,
              });
            },
            function () {
              var e = Lt(this),
                t = e.target,
                n = e.kind,
                i = e.index++;
              return !t || i >= t.length
                ? ((e.target = void 0), { value: void 0, done: !0 })
                : "keys" == n
                ? { value: i, done: !1 }
                : "values" == n
                ? { value: t[i], done: !1 }
                : { value: [i, t[i]], done: !1 };
            },
            "values"
          );
        (ct.Arguments = ct.Array), lt("keys"), lt("values"), lt("entries");
        var Mt = Object.assign,
          Pt =
            !Mt ||
            l(function () {
              var e = {},
                t = {},
                n = Symbol();
              return (
                (e[n] = 7),
                "abcdefghijklmnopqrst".split("").forEach(function (e) {
                  t[e] = e;
                }),
                7 != Mt({}, e)[n] ||
                  "abcdefghijklmnopqrst" != Qe(Mt({}, t)).join("")
              );
            })
              ? function (e, t) {
                  for (
                    var n = Le(e),
                      i = arguments.length,
                      s = 1,
                      r = me.f,
                      o = p.f;
                    i > s;

                  )
                    for (
                      var a,
                        l = g(arguments[s++]),
                        d = r ? Qe(l).concat(r(l)) : Qe(l),
                        u = d.length,
                        h = 0;
                      u > h;

                    )
                      (a = d[h++]), (c && !o.call(l, a)) || (n[a] = l[a]);
                  return n;
                }
              : Mt;
        Oe(
          { target: "Object", stat: !0, forced: Object.assign !== Pt },
          { assign: Pt }
        );
        var $t = ze("toStringTag"),
          zt =
            "Arguments" ==
            m(
              (function () {
                return arguments;
              })()
            ),
          It = function (e) {
            var t, n, i;
            return void 0 === e
              ? "Undefined"
              : null === e
              ? "Null"
              : "string" ==
                typeof (n = (function (e, t) {
                  try {
                    return e[t];
                  } catch (e) {}
                })((t = Object(e)), $t))
              ? n
              : zt
              ? m(t)
              : "Object" == (i = m(t)) && "function" == typeof t.callee
              ? "Arguments"
              : i;
          },
          Nt = {};
        Nt[ze("toStringTag")] = "z";
        var Wt =
            "[object z]" !== String(Nt)
              ? function () {
                  return "[object " + It(this) + "]";
                }
              : Nt.toString,
          Bt = Object.prototype;
        Wt !== Bt.toString && J(Bt, "toString", Wt, { unsafe: !0 });
        var Dt = "\t\n\v\f\r                　\u2028\u2029\ufeff",
          Rt = "[" + Dt + "]",
          jt = RegExp("^" + Rt + Rt + "*"),
          qt = RegExp(Rt + Rt + "*$"),
          Gt = function (e) {
            return function (t) {
              var n = String(b(t));
              return (
                1 & e && (n = n.replace(jt, "")),
                2 & e && (n = n.replace(qt, "")),
                n
              );
            };
          },
          Ht = (Gt(1), Gt(2), Gt(3)),
          Ft = a.parseInt,
          Vt = /^[+-]?0[Xx]/,
          Xt =
            8 !== Ft(Dt + "08") || 22 !== Ft(Dt + "0x16")
              ? function (e, t) {
                  var n = Ht(String(e));
                  return Ft(n, t >>> 0 || (Vt.test(n) ? 16 : 10));
                }
              : Ft;
        Oe({ global: !0, forced: parseInt != Xt }, { parseInt: Xt });
        var Yt = function (e) {
            return function (t, n) {
              var i,
                s,
                r = String(b(t)),
                o = se(n),
                a = r.length;
              return o < 0 || o >= a
                ? e
                  ? ""
                  : void 0
                : (i = r.charCodeAt(o)) < 55296 ||
                  i > 56319 ||
                  o + 1 === a ||
                  (s = r.charCodeAt(o + 1)) < 56320 ||
                  s > 57343
                ? e
                  ? r.charAt(o)
                  : i
                : e
                ? r.slice(o, o + 2)
                : s - 56320 + ((i - 55296) << 10) + 65536;
            };
          },
          Ut = { codeAt: Yt(!1), charAt: Yt(!0) },
          Qt = Ut.charAt,
          Kt = K.set,
          Jt = K.getterFor("String Iterator");
        _t(
          String,
          "String",
          function (e) {
            Kt(this, { type: "String Iterator", string: String(e), index: 0 });
          },
          function () {
            var e,
              t = Jt(this),
              n = t.string,
              i = t.index;
            return i >= n.length
              ? { value: void 0, done: !0 }
              : ((e = Qt(n, i)), (t.index += e.length), { value: e, done: !1 });
          }
        );
        var Zt = function (e, t, n) {
            for (var i in t) J(e, i, t[i], n);
            return e;
          },
          en = !l(function () {
            return Object.isExtensible(Object.preventExtensions({}));
          }),
          tn = t(function (e) {
            var t = P.f,
              n = j("meta"),
              i = 0,
              s =
                Object.isExtensible ||
                function () {
                  return !0;
                },
              r = function (e) {
                t(e, n, { value: { objectID: "O" + ++i, weakData: {} } });
              },
              o = (e.exports = {
                REQUIRED: !1,
                fastKey: function (e, t) {
                  if (!w(e))
                    return "symbol" == typeof e
                      ? e
                      : ("string" == typeof e ? "S" : "P") + e;
                  if (!S(e, n)) {
                    if (!s(e)) return "F";
                    if (!t) return "E";
                    r(e);
                  }
                  return e[n].objectID;
                },
                getWeakData: function (e, t) {
                  if (!S(e, n)) {
                    if (!s(e)) return !0;
                    if (!t) return !1;
                    r(e);
                  }
                  return e[n].weakData;
                },
                onFreeze: function (e) {
                  return en && o.REQUIRED && s(e) && !S(e, n) && r(e), e;
                },
              });
            H[n] = !0;
          }),
          nn =
            (tn.REQUIRED,
            tn.fastKey,
            tn.getWeakData,
            tn.onFreeze,
            ze("iterator")),
          sn = Array.prototype,
          rn = ze("iterator"),
          on = function (e, t, n, i) {
            try {
              return i ? t(A(n)[0], n[1]) : t(n);
            } catch (t) {
              var s = e.return;
              throw (void 0 !== s && A(s.call(e)), t);
            }
          },
          an = t(function (e) {
            var t = function (e, t) {
              (this.stopped = e), (this.result = t);
            };
            (e.exports = function (e, n, i, s, r) {
              var o,
                a,
                l,
                c,
                d,
                u,
                p,
                h = ke(n, i, s ? 2 : 1);
              if (r) o = e;
              else {
                if (
                  "function" !=
                  typeof (a = (function (e) {
                    if (null != e) return e[rn] || e["@@iterator"] || ct[It(e)];
                  })(e))
                )
                  throw TypeError("Target is not iterable");
                if (void 0 !== (p = a) && (ct.Array === p || sn[nn] === p)) {
                  for (l = 0, c = oe(e.length); c > l; l++)
                    if (
                      (d = s ? h(A((u = e[l]))[0], u[1]) : h(e[l])) &&
                      d instanceof t
                    )
                      return d;
                  return new t(!1);
                }
                o = a.call(e);
              }
              for (; !(u = o.next()).done; )
                if ((d = on(o, h, u.value, s)) && d instanceof t) return d;
              return new t(!1);
            }).stop = function (e) {
              return new t(!0, e);
            };
          }),
          ln = function (e, t, n) {
            if (!(e instanceof t))
              throw TypeError("Incorrect " + (n ? n + " " : "") + "invocation");
            return e;
          },
          cn = ze("iterator"),
          dn = !1;
        try {
          var un = 0,
            pn = {
              next: function () {
                return { done: !!un++ };
              },
              return: function () {
                dn = !0;
              },
            };
          (pn[cn] = function () {
            return this;
          }),
            Array.from(pn, function () {
              throw 2;
            });
        } catch (e) {}
        var hn = function (e, t, n, i, s) {
            var r = a[e],
              o = r && r.prototype,
              c = r,
              d = i ? "set" : "add",
              u = {},
              p = function (e) {
                var t = o[e];
                J(
                  o,
                  e,
                  "add" == e
                    ? function (e) {
                        return t.call(this, 0 === e ? 0 : e), this;
                      }
                    : "delete" == e
                    ? function (e) {
                        return !(s && !w(e)) && t.call(this, 0 === e ? 0 : e);
                      }
                    : "get" == e
                    ? function (e) {
                        return s && !w(e)
                          ? void 0
                          : t.call(this, 0 === e ? 0 : e);
                      }
                    : "has" == e
                    ? function (e) {
                        return !(s && !w(e)) && t.call(this, 0 === e ? 0 : e);
                      }
                    : function (e, n) {
                        return t.call(this, 0 === e ? 0 : e, n), this;
                      }
                );
              };
            if (
              Ce(
                e,
                "function" != typeof r ||
                  !(
                    s ||
                    (o.forEach &&
                      !l(function () {
                        new r().entries().next();
                      }))
                  )
              )
            )
              (c = n.getConstructor(t, e, i, d)), (tn.REQUIRED = !0);
            else if (Ce(e, !0)) {
              var h = new c(),
                f = h[d](s ? {} : -0, 1) != h,
                m = l(function () {
                  h.has(1);
                }),
                v = (function (e, t) {
                  if (!dn) return !1;
                  var n = !1;
                  try {
                    var i = {};
                    (i[cn] = function () {
                      return {
                        next: function () {
                          return { done: (n = !0) };
                        },
                      };
                    }),
                      (function (e) {
                        new r(e);
                      })(i);
                  } catch (e) {}
                  return n;
                })(),
                g =
                  !s &&
                  l(function () {
                    for (var e = new r(), t = 5; t--; ) e[d](t, t);
                    return !e.has(-0);
                  });
              v ||
                (((c = t(function (t, n) {
                  ln(t, c, e);
                  var s = (function (e, t, n) {
                    var i, s;
                    return (
                      xt &&
                        "function" == typeof (i = t.constructor) &&
                        i !== n &&
                        w((s = i.prototype)) &&
                        s !== n.prototype &&
                        xt(e, s),
                      e
                    );
                  })(new r(), t, c);
                  return null != n && an(n, s[d], s, i), s;
                })).prototype = o),
                (o.constructor = c)),
                (m || g) && (p("delete"), p("has"), i && p("get")),
                (g || f) && p(d),
                s && o.clear && delete o.clear;
            }
            return (
              (u[e] = c),
              Oe({ global: !0, forced: c != r }, u),
              yt(c, e),
              s || n.setStrong(c, e, i),
              c
            );
          },
          fn = tn.getWeakData,
          mn = K.set,
          vn = K.getterFor,
          gn = De.find,
          bn = De.findIndex,
          yn = 0,
          wn = function (e) {
            return e.frozen || (e.frozen = new En());
          },
          En = function () {
            this.entries = [];
          },
          xn = function (e, t) {
            return gn(e.entries, function (e) {
              return e[0] === t;
            });
          };
        En.prototype = {
          get: function (e) {
            var t = xn(this, e);
            if (t) return t[1];
          },
          has: function (e) {
            return !!xn(this, e);
          },
          set: function (e, t) {
            var n = xn(this, e);
            n ? (n[1] = t) : this.entries.push([e, t]);
          },
          delete: function (e) {
            var t = bn(this.entries, function (t) {
              return t[0] === e;
            });
            return ~t && this.entries.splice(t, 1), !!~t;
          },
        };
        var Sn = {
            getConstructor: function (e, t, n, i) {
              var s = e(function (e, r) {
                  ln(e, s, t),
                    mn(e, { type: t, id: yn++, frozen: void 0 }),
                    null != r && an(r, e[i], e, n);
                }),
                r = vn(t),
                o = function (e, t, n) {
                  var i = r(e),
                    s = fn(A(t), !0);
                  return !0 === s ? wn(i).set(t, n) : (s[i.id] = n), e;
                };
              return (
                Zt(s.prototype, {
                  delete: function (e) {
                    var t = r(this);
                    if (!w(e)) return !1;
                    var n = fn(e);
                    return !0 === n
                      ? wn(t).delete(e)
                      : n && S(n, t.id) && delete n[t.id];
                  },
                  has: function (e) {
                    var t = r(this);
                    if (!w(e)) return !1;
                    var n = fn(e);
                    return !0 === n ? wn(t).has(e) : n && S(n, t.id);
                  },
                }),
                Zt(
                  s.prototype,
                  n
                    ? {
                        get: function (e) {
                          var t = r(this);
                          if (w(e)) {
                            var n = fn(e);
                            return !0 === n
                              ? wn(t).get(e)
                              : n
                              ? n[t.id]
                              : void 0;
                          }
                        },
                        set: function (e, t) {
                          return o(this, e, t);
                        },
                      }
                    : {
                        add: function (e) {
                          return o(this, e, !0);
                        },
                      }
                ),
                s
              );
            },
          },
          Cn =
            (t(function (e) {
              var t,
                n = K.enforce,
                i = !a.ActiveXObject && "ActiveXObject" in a,
                s = Object.isExtensible,
                r = function (e) {
                  return function () {
                    return e(this, arguments.length ? arguments[0] : void 0);
                  };
                },
                o = (e.exports = hn("WeakMap", r, Sn, !0, !0));
              if (B && i) {
                (t = Sn.getConstructor(r, "WeakMap", !0)), (tn.REQUIRED = !0);
                var l = o.prototype,
                  c = l.delete,
                  d = l.has,
                  u = l.get,
                  p = l.set;
                Zt(l, {
                  delete: function (e) {
                    if (w(e) && !s(e)) {
                      var i = n(this);
                      return (
                        i.frozen || (i.frozen = new t()),
                        c.call(this, e) || i.frozen.delete(e)
                      );
                    }
                    return c.call(this, e);
                  },
                  has: function (e) {
                    if (w(e) && !s(e)) {
                      var i = n(this);
                      return (
                        i.frozen || (i.frozen = new t()),
                        d.call(this, e) || i.frozen.has(e)
                      );
                    }
                    return d.call(this, e);
                  },
                  get: function (e) {
                    if (w(e) && !s(e)) {
                      var i = n(this);
                      return (
                        i.frozen || (i.frozen = new t()),
                        d.call(this, e) ? u.call(this, e) : i.frozen.get(e)
                      );
                    }
                    return u.call(this, e);
                  },
                  set: function (e, i) {
                    if (w(e) && !s(e)) {
                      var r = n(this);
                      r.frozen || (r.frozen = new t()),
                        d.call(this, e)
                          ? p.call(this, e, i)
                          : r.frozen.set(e, i);
                    } else p.call(this, e, i);
                    return this;
                  },
                });
              }
            }),
            ze("iterator")),
          Tn = ze("toStringTag"),
          On = At.values;
        for (var _n in Ge) {
          var kn = a[_n],
            Ln = kn && kn.prototype;
          if (Ln) {
            if (Ln[Cn] !== On)
              try {
                $(Ln, Cn, On);
              } catch (e) {
                Ln[Cn] = On;
              }
            if ((Ln[Tn] || $(Ln, Tn, _n), Ge[_n]))
              for (var An in At)
                if (Ln[An] !== At[An])
                  try {
                    $(Ln, An, At[An]);
                  } catch (e) {
                    Ln[An] = At[An];
                  }
          }
        }
        var Mn = "Expected a function",
          Pn = /^\s+|\s+$/g,
          $n = /^[-+]0x[0-9a-f]+$/i,
          zn = /^0b[01]+$/i,
          In = /^0o[0-7]+$/i,
          Nn = parseInt,
          Wn = "object" == typeof e && e && e.Object === Object && e,
          Bn =
            "object" == typeof self && self && self.Object === Object && self,
          Dn = Wn || Bn || Function("return this")(),
          Rn = Object.prototype.toString,
          jn = Math.max,
          qn = Math.min,
          Gn = function () {
            return Dn.Date.now();
          };
        function Hn(e) {
          var t = typeof e;
          return !!e && ("object" == t || "function" == t);
        }
        function Fn(e) {
          if ("number" == typeof e) return e;
          if (
            (function (e) {
              return (
                "symbol" == typeof e ||
                ((function (e) {
                  return !!e && "object" == typeof e;
                })(e) &&
                  "[object Symbol]" == Rn.call(e))
              );
            })(e)
          )
            return NaN;
          if (Hn(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = Hn(t) ? t + "" : t;
          }
          if ("string" != typeof e) return 0 === e ? e : +e;
          e = e.replace(Pn, "");
          var n = zn.test(e);
          return n || In.test(e)
            ? Nn(e.slice(2), n ? 2 : 8)
            : $n.test(e)
            ? NaN
            : +e;
        }
        var Vn = function (e, t, n) {
            var i = !0,
              s = !0;
            if ("function" != typeof e) throw new TypeError(Mn);
            return (
              Hn(n) &&
                ((i = "leading" in n ? !!n.leading : i),
                (s = "trailing" in n ? !!n.trailing : s)),
              (function (e, t, n) {
                var i,
                  s,
                  r,
                  o,
                  a,
                  l,
                  c = 0,
                  d = !1,
                  u = !1,
                  p = !0;
                if ("function" != typeof e) throw new TypeError(Mn);
                function h(t) {
                  var n = i,
                    r = s;
                  return (i = s = void 0), (c = t), (o = e.apply(r, n));
                }
                function f(e) {
                  var n = e - l;
                  return void 0 === l || n >= t || n < 0 || (u && e - c >= r);
                }
                function m() {
                  var e = Gn();
                  if (f(e)) return v(e);
                  a = setTimeout(
                    m,
                    (function (e) {
                      var n = t - (e - l);
                      return u ? qn(n, r - (e - c)) : n;
                    })(e)
                  );
                }
                function v(e) {
                  return (a = void 0), p && i ? h(e) : ((i = s = void 0), o);
                }
                function g() {
                  var e = Gn(),
                    n = f(e);
                  if (((i = arguments), (s = this), (l = e), n)) {
                    if (void 0 === a)
                      return (function (e) {
                        return (c = e), (a = setTimeout(m, t)), d ? h(e) : o;
                      })(l);
                    if (u) return (a = setTimeout(m, t)), h(l);
                  }
                  return void 0 === a && (a = setTimeout(m, t)), o;
                }
                return (
                  (t = Fn(t) || 0),
                  Hn(n) &&
                    ((d = !!n.leading),
                    (r = (u = "maxWait" in n) ? jn(Fn(n.maxWait) || 0, t) : r),
                    (p = "trailing" in n ? !!n.trailing : p)),
                  (g.cancel = function () {
                    void 0 !== a && clearTimeout(a),
                      (c = 0),
                      (i = l = s = a = void 0);
                  }),
                  (g.flush = function () {
                    return void 0 === a ? o : v(Gn());
                  }),
                  g
                );
              })(e, t, { leading: i, maxWait: t, trailing: s })
            );
          },
          Xn = /^\s+|\s+$/g,
          Yn = /^[-+]0x[0-9a-f]+$/i,
          Un = /^0b[01]+$/i,
          Qn = /^0o[0-7]+$/i,
          Kn = parseInt,
          Jn = "object" == typeof e && e && e.Object === Object && e,
          Zn =
            "object" == typeof self && self && self.Object === Object && self,
          ei = Jn || Zn || Function("return this")(),
          ti = Object.prototype.toString,
          ni = Math.max,
          ii = Math.min,
          si = function () {
            return ei.Date.now();
          };
        function ri(e) {
          var t = typeof e;
          return !!e && ("object" == t || "function" == t);
        }
        function oi(e) {
          if ("number" == typeof e) return e;
          if (
            (function (e) {
              return (
                "symbol" == typeof e ||
                ((function (e) {
                  return !!e && "object" == typeof e;
                })(e) &&
                  "[object Symbol]" == ti.call(e))
              );
            })(e)
          )
            return NaN;
          if (ri(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = ri(t) ? t + "" : t;
          }
          if ("string" != typeof e) return 0 === e ? e : +e;
          e = e.replace(Xn, "");
          var n = Un.test(e);
          return n || Qn.test(e)
            ? Kn(e.slice(2), n ? 2 : 8)
            : Yn.test(e)
            ? NaN
            : +e;
        }
        var ai = function (e, t, n) {
            var i,
              s,
              r,
              o,
              a,
              l,
              c = 0,
              d = !1,
              u = !1,
              p = !0;
            if ("function" != typeof e)
              throw new TypeError("Expected a function");
            function h(t) {
              var n = i,
                r = s;
              return (i = s = void 0), (c = t), (o = e.apply(r, n));
            }
            function f(e) {
              var n = e - l;
              return void 0 === l || n >= t || n < 0 || (u && e - c >= r);
            }
            function m() {
              var e = si();
              if (f(e)) return v(e);
              a = setTimeout(
                m,
                (function (e) {
                  var n = t - (e - l);
                  return u ? ii(n, r - (e - c)) : n;
                })(e)
              );
            }
            function v(e) {
              return (a = void 0), p && i ? h(e) : ((i = s = void 0), o);
            }
            function g() {
              var e = si(),
                n = f(e);
              if (((i = arguments), (s = this), (l = e), n)) {
                if (void 0 === a)
                  return (function (e) {
                    return (c = e), (a = setTimeout(m, t)), d ? h(e) : o;
                  })(l);
                if (u) return (a = setTimeout(m, t)), h(l);
              }
              return void 0 === a && (a = setTimeout(m, t)), o;
            }
            return (
              (t = oi(t) || 0),
              ri(n) &&
                ((d = !!n.leading),
                (r = (u = "maxWait" in n) ? ni(oi(n.maxWait) || 0, t) : r),
                (p = "trailing" in n ? !!n.trailing : p)),
              (g.cancel = function () {
                void 0 !== a && clearTimeout(a),
                  (c = 0),
                  (i = l = s = a = void 0);
              }),
              (g.flush = function () {
                return void 0 === a ? o : v(si());
              }),
              g
            );
          },
          li = "__lodash_hash_undefined__",
          ci = /^\[object .+?Constructor\]$/,
          di = "object" == typeof e && e && e.Object === Object && e,
          ui =
            "object" == typeof self && self && self.Object === Object && self,
          pi = di || ui || Function("return this")(),
          hi = Array.prototype,
          fi = Function.prototype,
          mi = Object.prototype,
          vi = pi["__core-js_shared__"],
          gi = (function () {
            var e = /[^.]+$/.exec((vi && vi.keys && vi.keys.IE_PROTO) || "");
            return e ? "Symbol(src)_1." + e : "";
          })(),
          bi = fi.toString,
          yi = mi.hasOwnProperty,
          wi = mi.toString,
          Ei = RegExp(
            "^" +
              bi
                .call(yi)
                .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
                .replace(
                  /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                  "$1.*?"
                ) +
              "$"
          ),
          xi = hi.splice,
          Si = Ai(pi, "Map"),
          Ci = Ai(Object, "create");
        function Ti(e) {
          var t = -1,
            n = e ? e.length : 0;
          for (this.clear(); ++t < n; ) {
            var i = e[t];
            this.set(i[0], i[1]);
          }
        }
        function Oi(e) {
          var t = -1,
            n = e ? e.length : 0;
          for (this.clear(); ++t < n; ) {
            var i = e[t];
            this.set(i[0], i[1]);
          }
        }
        function _i(e) {
          var t = -1,
            n = e ? e.length : 0;
          for (this.clear(); ++t < n; ) {
            var i = e[t];
            this.set(i[0], i[1]);
          }
        }
        function ki(e, t) {
          for (var n, i, s = e.length; s--; )
            if ((n = e[s][0]) === (i = t) || (n != n && i != i)) return s;
          return -1;
        }
        function Li(e, t) {
          var n,
            i,
            s = e.__data__;
          return (
            "string" == (i = typeof (n = t)) ||
            "number" == i ||
            "symbol" == i ||
            "boolean" == i
              ? "__proto__" !== n
              : null === n
          )
            ? s["string" == typeof t ? "string" : "hash"]
            : s.map;
        }
        function Ai(e, t) {
          var n = (function (e, t) {
            return null == e ? void 0 : e[t];
          })(e, t);
          return (function (e) {
            return (
              !(!Pi(e) || ((t = e), gi && gi in t)) &&
              ((function (e) {
                var t = Pi(e) ? wi.call(e) : "";
                return (
                  "[object Function]" == t || "[object GeneratorFunction]" == t
                );
              })(e) ||
              (function (e) {
                var t = !1;
                if (null != e && "function" != typeof e.toString)
                  try {
                    t = !!(e + "");
                  } catch (e) {}
                return t;
              })(e)
                ? Ei
                : ci
              ).test(
                (function (e) {
                  if (null != e) {
                    try {
                      return bi.call(e);
                    } catch (e) {}
                    try {
                      return e + "";
                    } catch (e) {}
                  }
                  return "";
                })(e)
              )
            );
            var t;
          })(n)
            ? n
            : void 0;
        }
        function Mi(e, t) {
          if ("function" != typeof e || (t && "function" != typeof t))
            throw new TypeError("Expected a function");
          var n = function () {
            var i = arguments,
              s = t ? t.apply(this, i) : i[0],
              r = n.cache;
            if (r.has(s)) return r.get(s);
            var o = e.apply(this, i);
            return (n.cache = r.set(s, o)), o;
          };
          return (n.cache = new (Mi.Cache || _i)()), n;
        }
        function Pi(e) {
          var t = typeof e;
          return !!e && ("object" == t || "function" == t);
        }
        (Ti.prototype.clear = function () {
          this.__data__ = Ci ? Ci(null) : {};
        }),
          (Ti.prototype.delete = function (e) {
            return this.has(e) && delete this.__data__[e];
          }),
          (Ti.prototype.get = function (e) {
            var t = this.__data__;
            if (Ci) {
              var n = t[e];
              return n === li ? void 0 : n;
            }
            return yi.call(t, e) ? t[e] : void 0;
          }),
          (Ti.prototype.has = function (e) {
            var t = this.__data__;
            return Ci ? void 0 !== t[e] : yi.call(t, e);
          }),
          (Ti.prototype.set = function (e, t) {
            return (this.__data__[e] = Ci && void 0 === t ? li : t), this;
          }),
          (Oi.prototype.clear = function () {
            this.__data__ = [];
          }),
          (Oi.prototype.delete = function (e) {
            var t = this.__data__,
              n = ki(t, e);
            return !(
              n < 0 || (n == t.length - 1 ? t.pop() : xi.call(t, n, 1), 0)
            );
          }),
          (Oi.prototype.get = function (e) {
            var t = this.__data__,
              n = ki(t, e);
            return n < 0 ? void 0 : t[n][1];
          }),
          (Oi.prototype.has = function (e) {
            return ki(this.__data__, e) > -1;
          }),
          (Oi.prototype.set = function (e, t) {
            var n = this.__data__,
              i = ki(n, e);
            return i < 0 ? n.push([e, t]) : (n[i][1] = t), this;
          }),
          (_i.prototype.clear = function () {
            this.__data__ = {
              hash: new Ti(),
              map: new (Si || Oi)(),
              string: new Ti(),
            };
          }),
          (_i.prototype.delete = function (e) {
            return Li(this, e).delete(e);
          }),
          (_i.prototype.get = function (e) {
            return Li(this, e).get(e);
          }),
          (_i.prototype.has = function (e) {
            return Li(this, e).has(e);
          }),
          (_i.prototype.set = function (e, t) {
            return Li(this, e).set(e, t), this;
          }),
          (Mi.Cache = _i);
        var $i,
          zi = Mi,
          Ii = [],
          Ni = "ResizeObserver loop completed with undelivered notifications.";
        !(function (e) {
          (e.BORDER_BOX = "border-box"),
            (e.CONTENT_BOX = "content-box"),
            (e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box");
        })($i || ($i = {}));
        var Wi,
          Bi = function (e) {
            return Object.freeze(e);
          },
          Di = function (e, t) {
            (this.inlineSize = e), (this.blockSize = t), Bi(this);
          },
          Ri = (function () {
            function e(e, t, n, i) {
              return (
                (this.x = e),
                (this.y = t),
                (this.width = n),
                (this.height = i),
                (this.top = this.y),
                (this.left = this.x),
                (this.bottom = this.top + this.height),
                (this.right = this.left + this.width),
                Bi(this)
              );
            }
            return (
              (e.prototype.toJSON = function () {
                var e = this;
                return {
                  x: e.x,
                  y: e.y,
                  top: e.top,
                  right: e.right,
                  bottom: e.bottom,
                  left: e.left,
                  width: e.width,
                  height: e.height,
                };
              }),
              (e.fromRect = function (t) {
                return new e(t.x, t.y, t.width, t.height);
              }),
              e
            );
          })(),
          ji = function (e) {
            return e instanceof SVGElement && "getBBox" in e;
          },
          qi = function (e) {
            if (ji(e)) {
              var t = e.getBBox(),
                n = t.width,
                i = t.height;
              return !n && !i;
            }
            var s = e,
              r = s.offsetWidth,
              o = s.offsetHeight;
            return !(r || o || e.getClientRects().length);
          },
          Gi = function (e) {
            var t, n;
            if (e instanceof Element) return !0;
            var i =
              null ===
                (n =
                  null === (t = e) || void 0 === t
                    ? void 0
                    : t.ownerDocument) || void 0 === n
                ? void 0
                : n.defaultView;
            return !!(i && e instanceof i.Element);
          },
          Hi = "undefined" != typeof window ? window : {},
          Fi = new WeakMap(),
          Vi = /auto|scroll/,
          Xi = /^tb|vertical/,
          Yi = /msie|trident/i.test(Hi.navigator && Hi.navigator.userAgent),
          Ui = function (e) {
            return parseFloat(e || "0");
          },
          Qi = function (e, t, n) {
            return (
              void 0 === e && (e = 0),
              void 0 === t && (t = 0),
              void 0 === n && (n = !1),
              new Di((n ? t : e) || 0, (n ? e : t) || 0)
            );
          },
          Ki = Bi({
            devicePixelContentBoxSize: Qi(),
            borderBoxSize: Qi(),
            contentBoxSize: Qi(),
            contentRect: new Ri(0, 0, 0, 0),
          }),
          Ji = function (e, t) {
            if ((void 0 === t && (t = !1), Fi.has(e) && !t)) return Fi.get(e);
            if (qi(e)) return Fi.set(e, Ki), Ki;
            var n = getComputedStyle(e),
              i = ji(e) && e.ownerSVGElement && e.getBBox(),
              s = !Yi && "border-box" === n.boxSizing,
              r = Xi.test(n.writingMode || ""),
              o = !i && Vi.test(n.overflowY || ""),
              a = !i && Vi.test(n.overflowX || ""),
              l = i ? 0 : Ui(n.paddingTop),
              c = i ? 0 : Ui(n.paddingRight),
              d = i ? 0 : Ui(n.paddingBottom),
              u = i ? 0 : Ui(n.paddingLeft),
              p = i ? 0 : Ui(n.borderTopWidth),
              h = i ? 0 : Ui(n.borderRightWidth),
              f = i ? 0 : Ui(n.borderBottomWidth),
              m = u + c,
              v = l + d,
              g = (i ? 0 : Ui(n.borderLeftWidth)) + h,
              b = p + f,
              y = a ? e.offsetHeight - b - e.clientHeight : 0,
              w = o ? e.offsetWidth - g - e.clientWidth : 0,
              E = s ? m + g : 0,
              x = s ? v + b : 0,
              S = i ? i.width : Ui(n.width) - E - w,
              C = i ? i.height : Ui(n.height) - x - y,
              T = S + m + w + g,
              O = C + v + y + b,
              _ = Bi({
                devicePixelContentBoxSize: Qi(
                  Math.round(S * devicePixelRatio),
                  Math.round(C * devicePixelRatio),
                  r
                ),
                borderBoxSize: Qi(T, O, r),
                contentBoxSize: Qi(S, C, r),
                contentRect: new Ri(u, l, S, C),
              });
            return Fi.set(e, _), _;
          },
          Zi = function (e, t, n) {
            var i = Ji(e, n),
              s = i.borderBoxSize,
              r = i.contentBoxSize,
              o = i.devicePixelContentBoxSize;
            switch (t) {
              case $i.DEVICE_PIXEL_CONTENT_BOX:
                return o;
              case $i.BORDER_BOX:
                return s;
              default:
                return r;
            }
          },
          es = function (e) {
            var t = Ji(e);
            (this.target = e),
              (this.contentRect = t.contentRect),
              (this.borderBoxSize = Bi([t.borderBoxSize])),
              (this.contentBoxSize = Bi([t.contentBoxSize])),
              (this.devicePixelContentBoxSize = Bi([
                t.devicePixelContentBoxSize,
              ]));
          },
          ts = function (e) {
            if (qi(e)) return 1 / 0;
            for (var t = 0, n = e.parentNode; n; ) (t += 1), (n = n.parentNode);
            return t;
          },
          ns = function () {
            var e = 1 / 0,
              t = [];
            Ii.forEach(function (n) {
              if (0 !== n.activeTargets.length) {
                var i = [];
                n.activeTargets.forEach(function (t) {
                  var n = new es(t.target),
                    s = ts(t.target);
                  i.push(n),
                    (t.lastReportedSize = Zi(t.target, t.observedBox)),
                    s < e && (e = s);
                }),
                  t.push(function () {
                    n.callback.call(n.observer, i, n.observer);
                  }),
                  n.activeTargets.splice(0, n.activeTargets.length);
              }
            });
            for (var n = 0, i = t; n < i.length; n++) (0, i[n])();
            return e;
          },
          is = function (e) {
            Ii.forEach(function (t) {
              t.activeTargets.splice(0, t.activeTargets.length),
                t.skippedTargets.splice(0, t.skippedTargets.length),
                t.observationTargets.forEach(function (n) {
                  n.isActive() &&
                    (ts(n.target) > e
                      ? t.activeTargets.push(n)
                      : t.skippedTargets.push(n));
                });
            });
          },
          ss = [],
          rs = 0,
          os = {
            attributes: !0,
            characterData: !0,
            childList: !0,
            subtree: !0,
          },
          as = [
            "resize",
            "load",
            "transitionend",
            "animationend",
            "animationstart",
            "animationiteration",
            "keyup",
            "keydown",
            "mouseup",
            "mousedown",
            "mouseover",
            "mouseout",
            "blur",
            "focus",
          ],
          ls = function (e) {
            return void 0 === e && (e = 0), Date.now() + e;
          },
          cs = !1,
          ds = new ((function () {
            function e() {
              var e = this;
              (this.stopped = !0),
                (this.listener = function () {
                  return e.schedule();
                });
            }
            return (
              (e.prototype.run = function (e) {
                var t = this;
                if ((void 0 === e && (e = 250), !cs)) {
                  cs = !0;
                  var n,
                    i = ls(e);
                  (n = function () {
                    var n = !1;
                    try {
                      n = (function () {
                        var e,
                          t = 0;
                        for (
                          is(t);
                          Ii.some(function (e) {
                            return e.activeTargets.length > 0;
                          });

                        )
                          (t = ns()), is(t);
                        return (
                          Ii.some(function (e) {
                            return e.skippedTargets.length > 0;
                          }) &&
                            ("function" == typeof ErrorEvent
                              ? (e = new ErrorEvent("error", { message: Ni }))
                              : ((e = document.createEvent("Event")).initEvent(
                                  "error",
                                  !1,
                                  !1
                                ),
                                (e.message = Ni)),
                            window.dispatchEvent(e)),
                          t > 0
                        );
                      })();
                    } finally {
                      if (((cs = !1), (e = i - ls()), !rs)) return;
                      n ? t.run(1e3) : e > 0 ? t.run(e) : t.start();
                    }
                  }),
                    (function (e) {
                      if (!Wi) {
                        var t = 0,
                          n = document.createTextNode("");
                        new MutationObserver(function () {
                          return ss.splice(0).forEach(function (e) {
                            return e();
                          });
                        }).observe(n, { characterData: !0 }),
                          (Wi = function () {
                            n.textContent = "" + (t ? t-- : t++);
                          });
                      }
                      ss.push(e), Wi();
                    })(function () {
                      requestAnimationFrame(n);
                    });
                }
              }),
              (e.prototype.schedule = function () {
                this.stop(), this.run();
              }),
              (e.prototype.observe = function () {
                var e = this,
                  t = function () {
                    return e.observer && e.observer.observe(document.body, os);
                  };
                document.body
                  ? t()
                  : Hi.addEventListener("DOMContentLoaded", t);
              }),
              (e.prototype.start = function () {
                var e = this;
                this.stopped &&
                  ((this.stopped = !1),
                  (this.observer = new MutationObserver(this.listener)),
                  this.observe(),
                  as.forEach(function (t) {
                    return Hi.addEventListener(t, e.listener, !0);
                  }));
              }),
              (e.prototype.stop = function () {
                var e = this;
                this.stopped ||
                  (this.observer && this.observer.disconnect(),
                  as.forEach(function (t) {
                    return Hi.removeEventListener(t, e.listener, !0);
                  }),
                  (this.stopped = !0));
              }),
              e
            );
          })())(),
          us = function (e) {
            !rs && e > 0 && ds.start(), !(rs += e) && ds.stop();
          },
          ps = (function () {
            function e(e, t) {
              (this.target = e),
                (this.observedBox = t || $i.CONTENT_BOX),
                (this.lastReportedSize = { inlineSize: 0, blockSize: 0 });
            }
            return (
              (e.prototype.isActive = function () {
                var e,
                  t = Zi(this.target, this.observedBox, !0);
                return (
                  (e = this.target),
                  ji(e) ||
                    (function (e) {
                      switch (e.tagName) {
                        case "INPUT":
                          if ("image" !== e.type) break;
                        case "VIDEO":
                        case "AUDIO":
                        case "EMBED":
                        case "OBJECT":
                        case "CANVAS":
                        case "IFRAME":
                        case "IMG":
                          return !0;
                      }
                      return !1;
                    })(e) ||
                    "inline" !== getComputedStyle(e).display ||
                    (this.lastReportedSize = t),
                  this.lastReportedSize.inlineSize !== t.inlineSize ||
                    this.lastReportedSize.blockSize !== t.blockSize
                );
              }),
              e
            );
          })(),
          hs = function (e, t) {
            (this.activeTargets = []),
              (this.skippedTargets = []),
              (this.observationTargets = []),
              (this.observer = e),
              (this.callback = t);
          },
          fs = new WeakMap(),
          ms = function (e, t) {
            for (var n = 0; n < e.length; n += 1)
              if (e[n].target === t) return n;
            return -1;
          },
          vs = (function () {
            function e() {}
            return (
              (e.connect = function (e, t) {
                var n = new hs(e, t);
                fs.set(e, n);
              }),
              (e.observe = function (e, t, n) {
                var i = fs.get(e),
                  s = 0 === i.observationTargets.length;
                ms(i.observationTargets, t) < 0 &&
                  (s && Ii.push(i),
                  i.observationTargets.push(new ps(t, n && n.box)),
                  us(1),
                  ds.schedule());
              }),
              (e.unobserve = function (e, t) {
                var n = fs.get(e),
                  i = ms(n.observationTargets, t),
                  s = 1 === n.observationTargets.length;
                i >= 0 &&
                  (s && Ii.splice(Ii.indexOf(n), 1),
                  n.observationTargets.splice(i, 1),
                  us(-1));
              }),
              (e.disconnect = function (e) {
                var t = this,
                  n = fs.get(e);
                n.observationTargets.slice().forEach(function (n) {
                  return t.unobserve(e, n.target);
                }),
                  n.activeTargets.splice(0, n.activeTargets.length);
              }),
              e
            );
          })(),
          gs = (function () {
            function e(e) {
              if (0 === arguments.length)
                throw new TypeError(
                  "Failed to construct 'ResizeObserver': 1 argument required, but only 0 present."
                );
              if ("function" != typeof e)
                throw new TypeError(
                  "Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function."
                );
              vs.connect(this, e);
            }
            return (
              (e.prototype.observe = function (e, t) {
                if (0 === arguments.length)
                  throw new TypeError(
                    "Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present."
                  );
                if (!Gi(e))
                  throw new TypeError(
                    "Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element"
                  );
                vs.observe(this, e, t);
              }),
              (e.prototype.unobserve = function (e) {
                if (0 === arguments.length)
                  throw new TypeError(
                    "Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present."
                  );
                if (!Gi(e))
                  throw new TypeError(
                    "Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element"
                  );
                vs.unobserve(this, e);
              }),
              (e.prototype.disconnect = function () {
                vs.disconnect(this);
              }),
              (e.toString = function () {
                return "function ResizeObserver () { [polyfill code] }";
              }),
              e
            );
          })(),
          bs = function (e) {
            return function (t, n, i, s) {
              _e(n);
              var r = Le(t),
                o = g(r),
                a = oe(r.length),
                l = e ? a - 1 : 0,
                c = e ? -1 : 1;
              if (i < 2)
                for (;;) {
                  if (l in o) {
                    (s = o[l]), (l += c);
                    break;
                  }
                  if (((l += c), e ? l < 0 : a <= l))
                    throw TypeError(
                      "Reduce of empty array with no initial value"
                    );
                }
              for (; e ? l >= 0 : a > l; l += c)
                l in o && (s = n(s, o[l], l, r));
              return s;
            };
          },
          ys = [bs(!1), bs(!0)][0];
        Oe(
          { target: "Array", proto: !0, forced: Re("reduce") },
          {
            reduce: function (e) {
              return ys(
                this,
                e,
                arguments.length,
                arguments.length > 1 ? arguments[1] : void 0
              );
            },
          }
        );
        var ws = P.f,
          Es = Function.prototype,
          xs = Es.toString,
          Ss = /^\s*function ([^ (]*)/;
        !c ||
          "name" in Es ||
          ws(Es, "name", {
            configurable: !0,
            get: function () {
              try {
                return xs.call(this).match(Ss)[1];
              } catch (e) {
                return "";
              }
            },
          });
        var Cs,
          Ts,
          Os = function () {
            var e = A(this),
              t = "";
            return (
              e.global && (t += "g"),
              e.ignoreCase && (t += "i"),
              e.multiline && (t += "m"),
              e.dotAll && (t += "s"),
              e.unicode && (t += "u"),
              e.sticky && (t += "y"),
              t
            );
          },
          _s = RegExp.prototype.exec,
          ks = String.prototype.replace,
          Ls = _s,
          As =
            ((Cs = /a/),
            (Ts = /b*/g),
            _s.call(Cs, "a"),
            _s.call(Ts, "a"),
            0 !== Cs.lastIndex || 0 !== Ts.lastIndex),
          Ms = void 0 !== /()??/.exec("")[1];
        (As || Ms) &&
          (Ls = function (e) {
            var t,
              n,
              i,
              s,
              r = this;
            return (
              Ms && (n = new RegExp("^" + r.source + "$(?!\\s)", Os.call(r))),
              As && (t = r.lastIndex),
              (i = _s.call(r, e)),
              As && i && (r.lastIndex = r.global ? i.index + i[0].length : t),
              Ms &&
                i &&
                i.length > 1 &&
                ks.call(i[0], n, function () {
                  for (s = 1; s < arguments.length - 2; s++)
                    void 0 === arguments[s] && (i[s] = void 0);
                }),
              i
            );
          });
        var Ps = Ls;
        Oe(
          { target: "RegExp", proto: !0, forced: /./.exec !== Ps },
          { exec: Ps }
        );
        var $s = ze("species"),
          zs = !l(function () {
            var e = /./;
            return (
              (e.exec = function () {
                var e = [];
                return (e.groups = { a: "7" }), e;
              }),
              "7" !== "".replace(e, "$<a>")
            );
          }),
          Is = !l(function () {
            var e = /(?:)/,
              t = e.exec;
            e.exec = function () {
              return t.apply(this, arguments);
            };
            var n = "ab".split(e);
            return 2 !== n.length || "a" !== n[0] || "b" !== n[1];
          }),
          Ns = function (e, t, n, i) {
            var s = ze(e),
              r = !l(function () {
                var t = {};
                return (
                  (t[s] = function () {
                    return 7;
                  }),
                  7 != ""[e](t)
                );
              }),
              o =
                r &&
                !l(function () {
                  var t = !1,
                    n = /a/;
                  return (
                    (n.exec = function () {
                      return (t = !0), null;
                    }),
                    "split" === e &&
                      ((n.constructor = {}),
                      (n.constructor[$s] = function () {
                        return n;
                      })),
                    n[s](""),
                    !t
                  );
                });
            if (
              !r ||
              !o ||
              ("replace" === e && !zs) ||
              ("split" === e && !Is)
            ) {
              var a = /./[s],
                c = n(s, ""[e], function (e, t, n, i, s) {
                  return t.exec === Ps
                    ? r && !s
                      ? { done: !0, value: a.call(t, n, i) }
                      : { done: !0, value: e.call(n, t, i) }
                    : { done: !1 };
                }),
                d = c[0],
                u = c[1];
              J(String.prototype, e, d),
                J(
                  RegExp.prototype,
                  s,
                  2 == t
                    ? function (e, t) {
                        return u.call(e, this, t);
                      }
                    : function (e) {
                        return u.call(e, this);
                      }
                ),
                i && $(RegExp.prototype[s], "sham", !0);
            }
          },
          Ws = Ut.charAt,
          Bs = function (e, t, n) {
            return t + (n ? Ws(e, t).length : 1);
          },
          Ds = function (e, t) {
            var n = e.exec;
            if ("function" == typeof n) {
              var i = n.call(e, t);
              if ("object" != typeof i)
                throw TypeError(
                  "RegExp exec method returned something other than an Object or null"
                );
              return i;
            }
            if ("RegExp" !== m(e))
              throw TypeError("RegExp#exec called on incompatible receiver");
            return Ps.call(e, t);
          };
        Ns("match", 1, function (e, t, n) {
          return [
            function (t) {
              var n = b(this),
                i = null == t ? void 0 : t[e];
              return void 0 !== i ? i.call(t, n) : new RegExp(t)[e](String(n));
            },
            function (e) {
              var i = n(t, e, this);
              if (i.done) return i.value;
              var s = A(e),
                r = String(this);
              if (!s.global) return Ds(s, r);
              var o = s.unicode;
              s.lastIndex = 0;
              for (var a, l = [], c = 0; null !== (a = Ds(s, r)); ) {
                var d = String(a[0]);
                (l[c] = d),
                  "" === d && (s.lastIndex = Bs(r, oe(s.lastIndex), o)),
                  c++;
              }
              return 0 === c ? null : l;
            },
          ];
        });
        var Rs = Math.max,
          js = Math.min,
          qs = Math.floor,
          Gs = /\$([$&'`]|\d\d?|<[^>]*>)/g,
          Hs = /\$([$&'`]|\d\d?)/g;
        Ns("replace", 2, function (e, t, n) {
          return [
            function (n, i) {
              var s = b(this),
                r = null == n ? void 0 : n[e];
              return void 0 !== r ? r.call(n, s, i) : t.call(String(s), n, i);
            },
            function (e, s) {
              var r = n(t, e, this, s);
              if (r.done) return r.value;
              var o = A(e),
                a = String(this),
                l = "function" == typeof s;
              l || (s = String(s));
              var c = o.global;
              if (c) {
                var d = o.unicode;
                o.lastIndex = 0;
              }
              for (var u = []; ; ) {
                var p = Ds(o, a);
                if (null === p) break;
                if ((u.push(p), !c)) break;
                "" === String(p[0]) &&
                  (o.lastIndex = Bs(a, oe(o.lastIndex), d));
              }
              for (var h, f = "", m = 0, v = 0; v < u.length; v++) {
                p = u[v];
                for (
                  var g = String(p[0]),
                    b = Rs(js(se(p.index), a.length), 0),
                    y = [],
                    w = 1;
                  w < p.length;
                  w++
                )
                  y.push(void 0 === (h = p[w]) ? h : String(h));
                var E = p.groups;
                if (l) {
                  var x = [g].concat(y, b, a);
                  void 0 !== E && x.push(E);
                  var S = String(s.apply(void 0, x));
                } else S = i(g, a, b, y, E, s);
                b >= m && ((f += a.slice(m, b) + S), (m = b + g.length));
              }
              return f + a.slice(m);
            },
          ];
          function i(e, n, i, s, r, o) {
            var a = i + e.length,
              l = s.length,
              c = Hs;
            return (
              void 0 !== r && ((r = Le(r)), (c = Gs)),
              t.call(o, c, function (t, o) {
                var c;
                switch (o.charAt(0)) {
                  case "$":
                    return "$";
                  case "&":
                    return e;
                  case "`":
                    return n.slice(0, i);
                  case "'":
                    return n.slice(a);
                  case "<":
                    c = r[o.slice(1, -1)];
                    break;
                  default:
                    var d = +o;
                    if (0 === d) return t;
                    if (d > l) {
                      var u = qs(d / 10);
                      return 0 === u
                        ? t
                        : u <= l
                        ? void 0 === s[u - 1]
                          ? o.charAt(1)
                          : s[u - 1] + o.charAt(1)
                        : t;
                    }
                    c = s[d - 1];
                }
                return void 0 === c ? "" : c;
              })
            );
          }
        });
        var Fs = function (e) {
          return Array.prototype.reduce.call(
            e,
            function (e, t) {
              var n = t.name.match(/data-simplebar-(.+)/);
              if (n) {
                var i = n[1].replace(/\W+(.)/g, function (e, t) {
                  return t.toUpperCase();
                });
                switch (t.value) {
                  case "true":
                    e[i] = !0;
                    break;
                  case "false":
                    e[i] = !1;
                    break;
                  case void 0:
                    e[i] = !0;
                    break;
                  default:
                    e[i] = t.value;
                }
              }
              return e;
            },
            {}
          );
        };
        function Vs(e) {
          return e && e.ownerDocument && e.ownerDocument.defaultView
            ? e.ownerDocument.defaultView
            : window;
        }
        function Xs(e) {
          return e && e.ownerDocument ? e.ownerDocument : document;
        }
        var Ys = null,
          Us = null;
        function Qs(e) {
          if (null === Ys) {
            var t = Xs(e);
            if (void 0 === t) return (Ys = 0);
            var n = t.body,
              i = t.createElement("div");
            i.classList.add("simplebar-hide-scrollbar"), n.appendChild(i);
            var s = i.getBoundingClientRect().right;
            n.removeChild(i), (Ys = s);
          }
          return Ys;
        }
        Xe &&
          window.addEventListener("resize", function () {
            Us !== window.devicePixelRatio &&
              ((Us = window.devicePixelRatio), (Ys = null));
          });
        var Ks = (function () {
          function e(t, n) {
            var i = this;
            (this.onScroll = function () {
              var e = Vs(i.el);
              i.scrollXTicking ||
                (e.requestAnimationFrame(i.scrollX), (i.scrollXTicking = !0)),
                i.scrollYTicking ||
                  (e.requestAnimationFrame(i.scrollY), (i.scrollYTicking = !0));
            }),
              (this.scrollX = function () {
                i.axis.x.isOverflowing &&
                  (i.showScrollbar("x"), i.positionScrollbar("x")),
                  (i.scrollXTicking = !1);
              }),
              (this.scrollY = function () {
                i.axis.y.isOverflowing &&
                  (i.showScrollbar("y"), i.positionScrollbar("y")),
                  (i.scrollYTicking = !1);
              }),
              (this.onMouseEnter = function () {
                i.showScrollbar("x"), i.showScrollbar("y");
              }),
              (this.onMouseMove = function (e) {
                (i.mouseX = e.clientX),
                  (i.mouseY = e.clientY),
                  (i.axis.x.isOverflowing || i.axis.x.forceVisible) &&
                    i.onMouseMoveForAxis("x"),
                  (i.axis.y.isOverflowing || i.axis.y.forceVisible) &&
                    i.onMouseMoveForAxis("y");
              }),
              (this.onMouseLeave = function () {
                i.onMouseMove.cancel(),
                  (i.axis.x.isOverflowing || i.axis.x.forceVisible) &&
                    i.onMouseLeaveForAxis("x"),
                  (i.axis.y.isOverflowing || i.axis.y.forceVisible) &&
                    i.onMouseLeaveForAxis("y"),
                  (i.mouseX = -1),
                  (i.mouseY = -1);
              }),
              (this.onWindowResize = function () {
                (i.scrollbarWidth = i.getScrollbarWidth()),
                  i.hideNativeScrollbar();
              }),
              (this.hideScrollbars = function () {
                (i.axis.x.track.rect =
                  i.axis.x.track.el.getBoundingClientRect()),
                  (i.axis.y.track.rect =
                    i.axis.y.track.el.getBoundingClientRect()),
                  i.isWithinBounds(i.axis.y.track.rect) ||
                    (i.axis.y.scrollbar.el.classList.remove(
                      i.classNames.visible
                    ),
                    (i.axis.y.isVisible = !1)),
                  i.isWithinBounds(i.axis.x.track.rect) ||
                    (i.axis.x.scrollbar.el.classList.remove(
                      i.classNames.visible
                    ),
                    (i.axis.x.isVisible = !1));
              }),
              (this.onPointerEvent = function (e) {
                var t, n;
                (i.axis.x.track.rect =
                  i.axis.x.track.el.getBoundingClientRect()),
                  (i.axis.y.track.rect =
                    i.axis.y.track.el.getBoundingClientRect()),
                  (i.axis.x.isOverflowing || i.axis.x.forceVisible) &&
                    (t = i.isWithinBounds(i.axis.x.track.rect)),
                  (i.axis.y.isOverflowing || i.axis.y.forceVisible) &&
                    (n = i.isWithinBounds(i.axis.y.track.rect)),
                  (t || n) &&
                    (e.preventDefault(),
                    e.stopPropagation(),
                    "mousedown" === e.type &&
                      (t &&
                        ((i.axis.x.scrollbar.rect =
                          i.axis.x.scrollbar.el.getBoundingClientRect()),
                        i.isWithinBounds(i.axis.x.scrollbar.rect)
                          ? i.onDragStart(e, "x")
                          : i.onTrackClick(e, "x")),
                      n &&
                        ((i.axis.y.scrollbar.rect =
                          i.axis.y.scrollbar.el.getBoundingClientRect()),
                        i.isWithinBounds(i.axis.y.scrollbar.rect)
                          ? i.onDragStart(e, "y")
                          : i.onTrackClick(e, "y"))));
              }),
              (this.drag = function (t) {
                var n = i.axis[i.draggedAxis].track,
                  s = n.rect[i.axis[i.draggedAxis].sizeAttr],
                  r = i.axis[i.draggedAxis].scrollbar,
                  o = i.contentWrapperEl[i.axis[i.draggedAxis].scrollSizeAttr],
                  a = parseInt(i.elStyles[i.axis[i.draggedAxis].sizeAttr], 10);
                t.preventDefault(), t.stopPropagation();
                var l =
                  ((("y" === i.draggedAxis ? t.pageY : t.pageX) -
                    n.rect[i.axis[i.draggedAxis].offsetAttr] -
                    i.axis[i.draggedAxis].dragOffset) /
                    (s - r.size)) *
                  (o - a);
                "x" === i.draggedAxis &&
                  ((l =
                    i.isRtl && e.getRtlHelpers().isRtlScrollbarInverted
                      ? l - (s + r.size)
                      : l),
                  (l =
                    i.isRtl && e.getRtlHelpers().isRtlScrollingInverted
                      ? -l
                      : l)),
                  (i.contentWrapperEl[i.axis[i.draggedAxis].scrollOffsetAttr] =
                    l);
              }),
              (this.onEndDrag = function (e) {
                var t = Xs(i.el),
                  n = Vs(i.el);
                e.preventDefault(),
                  e.stopPropagation(),
                  i.el.classList.remove(i.classNames.dragging),
                  t.removeEventListener("mousemove", i.drag, !0),
                  t.removeEventListener("mouseup", i.onEndDrag, !0),
                  (i.removePreventClickId = n.setTimeout(function () {
                    t.removeEventListener("click", i.preventClick, !0),
                      t.removeEventListener("dblclick", i.preventClick, !0),
                      (i.removePreventClickId = null);
                  }));
              }),
              (this.preventClick = function (e) {
                e.preventDefault(), e.stopPropagation();
              }),
              (this.el = t),
              (this.minScrollbarWidth = 20),
              (this.options = Object.assign({}, e.defaultOptions, {}, n)),
              (this.classNames = Object.assign(
                {},
                e.defaultOptions.classNames,
                {},
                this.options.classNames
              )),
              (this.axis = {
                x: {
                  scrollOffsetAttr: "scrollLeft",
                  sizeAttr: "width",
                  scrollSizeAttr: "scrollWidth",
                  offsetSizeAttr: "offsetWidth",
                  offsetAttr: "left",
                  overflowAttr: "overflowX",
                  dragOffset: 0,
                  isOverflowing: !0,
                  isVisible: !1,
                  forceVisible: !1,
                  track: {},
                  scrollbar: {},
                },
                y: {
                  scrollOffsetAttr: "scrollTop",
                  sizeAttr: "height",
                  scrollSizeAttr: "scrollHeight",
                  offsetSizeAttr: "offsetHeight",
                  offsetAttr: "top",
                  overflowAttr: "overflowY",
                  dragOffset: 0,
                  isOverflowing: !0,
                  isVisible: !1,
                  forceVisible: !1,
                  track: {},
                  scrollbar: {},
                },
              }),
              (this.removePreventClickId = null),
              e.instances.has(this.el) ||
                ((this.recalculate = Vn(this.recalculate.bind(this), 64)),
                (this.onMouseMove = Vn(this.onMouseMove.bind(this), 64)),
                (this.hideScrollbars = ai(
                  this.hideScrollbars.bind(this),
                  this.options.timeout
                )),
                (this.onWindowResize = ai(this.onWindowResize.bind(this), 64, {
                  leading: !0,
                })),
                (e.getRtlHelpers = zi(e.getRtlHelpers)),
                this.init());
          }
          (e.getRtlHelpers = function () {
            var t = document.createElement("div");
            t.innerHTML =
              '<div class="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%; margin: 10px 0;"></div></div>';
            var n = t.firstElementChild;
            document.body.appendChild(n);
            var i = n.firstElementChild;
            n.scrollLeft = 0;
            var s = e.getOffset(n),
              r = e.getOffset(i);
            n.scrollLeft = 999;
            var o = e.getOffset(i);
            return {
              isRtlScrollingInverted: s.left !== r.left && r.left - o.left != 0,
              isRtlScrollbarInverted: s.left !== r.left,
            };
          }),
            (e.getOffset = function (e) {
              var t = e.getBoundingClientRect(),
                n = Xs(e),
                i = Vs(e);
              return {
                top: t.top + (i.pageYOffset || n.documentElement.scrollTop),
                left: t.left + (i.pageXOffset || n.documentElement.scrollLeft),
              };
            });
          var t = e.prototype;
          return (
            (t.init = function () {
              e.instances.set(this.el, this),
                Xe &&
                  (this.initDOM(),
                  this.setAccessibilityAttributes(),
                  (this.scrollbarWidth = this.getScrollbarWidth()),
                  this.recalculate(),
                  this.initListeners());
            }),
            (t.initDOM = function () {
              var e = this;
              if (
                Array.prototype.filter.call(this.el.children, function (t) {
                  return t.classList.contains(e.classNames.wrapper);
                }).length
              )
                (this.wrapperEl = this.el.querySelector(
                  "." + this.classNames.wrapper
                )),
                  (this.contentWrapperEl =
                    this.options.scrollableNode ||
                    this.el.querySelector(
                      "." + this.classNames.contentWrapper
                    )),
                  (this.contentEl =
                    this.options.contentNode ||
                    this.el.querySelector("." + this.classNames.contentEl)),
                  (this.offsetEl = this.el.querySelector(
                    "." + this.classNames.offset
                  )),
                  (this.maskEl = this.el.querySelector(
                    "." + this.classNames.mask
                  )),
                  (this.placeholderEl = this.findChild(
                    this.wrapperEl,
                    "." + this.classNames.placeholder
                  )),
                  (this.heightAutoObserverWrapperEl = this.el.querySelector(
                    "." + this.classNames.heightAutoObserverWrapperEl
                  )),
                  (this.heightAutoObserverEl = this.el.querySelector(
                    "." + this.classNames.heightAutoObserverEl
                  )),
                  (this.axis.x.track.el = this.findChild(
                    this.el,
                    "." +
                      this.classNames.track +
                      "." +
                      this.classNames.horizontal
                  )),
                  (this.axis.y.track.el = this.findChild(
                    this.el,
                    "." + this.classNames.track + "." + this.classNames.vertical
                  ));
              else {
                for (
                  this.wrapperEl = document.createElement("div"),
                    this.contentWrapperEl = document.createElement("div"),
                    this.offsetEl = document.createElement("div"),
                    this.maskEl = document.createElement("div"),
                    this.contentEl = document.createElement("div"),
                    this.placeholderEl = document.createElement("div"),
                    this.heightAutoObserverWrapperEl =
                      document.createElement("div"),
                    this.heightAutoObserverEl = document.createElement("div"),
                    this.wrapperEl.classList.add(this.classNames.wrapper),
                    this.contentWrapperEl.classList.add(
                      this.classNames.contentWrapper
                    ),
                    this.offsetEl.classList.add(this.classNames.offset),
                    this.maskEl.classList.add(this.classNames.mask),
                    this.contentEl.classList.add(this.classNames.contentEl),
                    this.placeholderEl.classList.add(
                      this.classNames.placeholder
                    ),
                    this.heightAutoObserverWrapperEl.classList.add(
                      this.classNames.heightAutoObserverWrapperEl
                    ),
                    this.heightAutoObserverEl.classList.add(
                      this.classNames.heightAutoObserverEl
                    );
                  this.el.firstChild;

                )
                  this.contentEl.appendChild(this.el.firstChild);
                this.contentWrapperEl.appendChild(this.contentEl),
                  this.offsetEl.appendChild(this.contentWrapperEl),
                  this.maskEl.appendChild(this.offsetEl),
                  this.heightAutoObserverWrapperEl.appendChild(
                    this.heightAutoObserverEl
                  ),
                  this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl),
                  this.wrapperEl.appendChild(this.maskEl),
                  this.wrapperEl.appendChild(this.placeholderEl),
                  this.el.appendChild(this.wrapperEl);
              }
              if (!this.axis.x.track.el || !this.axis.y.track.el) {
                var t = document.createElement("div"),
                  n = document.createElement("div");
                t.classList.add(this.classNames.track),
                  n.classList.add(this.classNames.scrollbar),
                  t.appendChild(n),
                  (this.axis.x.track.el = t.cloneNode(!0)),
                  this.axis.x.track.el.classList.add(
                    this.classNames.horizontal
                  ),
                  (this.axis.y.track.el = t.cloneNode(!0)),
                  this.axis.y.track.el.classList.add(this.classNames.vertical),
                  this.el.appendChild(this.axis.x.track.el),
                  this.el.appendChild(this.axis.y.track.el);
              }
              (this.axis.x.scrollbar.el = this.axis.x.track.el.querySelector(
                "." + this.classNames.scrollbar
              )),
                (this.axis.y.scrollbar.el = this.axis.y.track.el.querySelector(
                  "." + this.classNames.scrollbar
                )),
                this.options.autoHide ||
                  (this.axis.x.scrollbar.el.classList.add(
                    this.classNames.visible
                  ),
                  this.axis.y.scrollbar.el.classList.add(
                    this.classNames.visible
                  )),
                this.el.setAttribute("data-simplebar", "init");
            }),
            (t.setAccessibilityAttributes = function () {
              var e = this.options.ariaLabel || "scrollable content";
              this.contentWrapperEl.setAttribute("tabindex", "0"),
                this.contentWrapperEl.setAttribute("role", "region"),
                this.contentWrapperEl.setAttribute("aria-label", e);
            }),
            (t.initListeners = function () {
              var e = this,
                t = Vs(this.el);
              this.options.autoHide &&
                this.el.addEventListener("mouseenter", this.onMouseEnter),
                ["mousedown", "click", "dblclick"].forEach(function (t) {
                  e.el.addEventListener(t, e.onPointerEvent, !0);
                }),
                ["touchstart", "touchend", "touchmove"].forEach(function (t) {
                  e.el.addEventListener(t, e.onPointerEvent, {
                    capture: !0,
                    passive: !0,
                  });
                }),
                this.el.addEventListener("mousemove", this.onMouseMove),
                this.el.addEventListener("mouseleave", this.onMouseLeave),
                this.contentWrapperEl.addEventListener("scroll", this.onScroll),
                t.addEventListener("resize", this.onWindowResize);
              var n = !1,
                i = t.ResizeObserver || gs;
              (this.resizeObserver = new i(function () {
                n && e.recalculate();
              })),
                this.resizeObserver.observe(this.el),
                this.resizeObserver.observe(this.contentEl),
                t.requestAnimationFrame(function () {
                  n = !0;
                }),
                (this.mutationObserver = new t.MutationObserver(
                  this.recalculate
                )),
                this.mutationObserver.observe(this.contentEl, {
                  childList: !0,
                  subtree: !0,
                  characterData: !0,
                });
            }),
            (t.recalculate = function () {
              var e = Vs(this.el);
              (this.elStyles = e.getComputedStyle(this.el)),
                (this.isRtl = "rtl" === this.elStyles.direction);
              var t = this.heightAutoObserverEl.offsetHeight <= 1,
                n = this.heightAutoObserverEl.offsetWidth <= 1,
                i = this.contentEl.offsetWidth,
                s = this.contentWrapperEl.offsetWidth,
                r = this.elStyles.overflowX,
                o = this.elStyles.overflowY;
              (this.contentEl.style.padding =
                this.elStyles.paddingTop +
                " " +
                this.elStyles.paddingRight +
                " " +
                this.elStyles.paddingBottom +
                " " +
                this.elStyles.paddingLeft),
                (this.wrapperEl.style.margin =
                  "-" +
                  this.elStyles.paddingTop +
                  " -" +
                  this.elStyles.paddingRight +
                  " -" +
                  this.elStyles.paddingBottom +
                  " -" +
                  this.elStyles.paddingLeft);
              var a = this.contentEl.scrollHeight,
                l = this.contentEl.scrollWidth;
              (this.contentWrapperEl.style.height = t ? "auto" : "100%"),
                (this.placeholderEl.style.width = n ? i + "px" : "auto"),
                (this.placeholderEl.style.height = a + "px");
              var c = this.contentWrapperEl.offsetHeight;
              (this.axis.x.isOverflowing = l > i),
                (this.axis.y.isOverflowing = a > c),
                (this.axis.x.isOverflowing =
                  "hidden" !== r && this.axis.x.isOverflowing),
                (this.axis.y.isOverflowing =
                  "hidden" !== o && this.axis.y.isOverflowing),
                (this.axis.x.forceVisible =
                  "x" === this.options.forceVisible ||
                  !0 === this.options.forceVisible),
                (this.axis.y.forceVisible =
                  "y" === this.options.forceVisible ||
                  !0 === this.options.forceVisible),
                this.hideNativeScrollbar();
              var d = this.axis.x.isOverflowing ? this.scrollbarWidth : 0,
                u = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
              (this.axis.x.isOverflowing =
                this.axis.x.isOverflowing && l > s - u),
                (this.axis.y.isOverflowing =
                  this.axis.y.isOverflowing && a > c - d),
                (this.axis.x.scrollbar.size = this.getScrollbarSize("x")),
                (this.axis.y.scrollbar.size = this.getScrollbarSize("y")),
                (this.axis.x.scrollbar.el.style.width =
                  this.axis.x.scrollbar.size + "px"),
                (this.axis.y.scrollbar.el.style.height =
                  this.axis.y.scrollbar.size + "px"),
                this.positionScrollbar("x"),
                this.positionScrollbar("y"),
                this.toggleTrackVisibility("x"),
                this.toggleTrackVisibility("y");
            }),
            (t.getScrollbarSize = function (e) {
              if ((void 0 === e && (e = "y"), !this.axis[e].isOverflowing))
                return 0;
              var t,
                n = this.contentEl[this.axis[e].scrollSizeAttr],
                i = this.axis[e].track.el[this.axis[e].offsetSizeAttr],
                s = i / n;
              return (
                (t = Math.max(~~(s * i), this.options.scrollbarMinSize)),
                this.options.scrollbarMaxSize &&
                  (t = Math.min(t, this.options.scrollbarMaxSize)),
                t
              );
            }),
            (t.positionScrollbar = function (t) {
              if ((void 0 === t && (t = "y"), this.axis[t].isOverflowing)) {
                var n = this.contentWrapperEl[this.axis[t].scrollSizeAttr],
                  i = this.axis[t].track.el[this.axis[t].offsetSizeAttr],
                  s = parseInt(this.elStyles[this.axis[t].sizeAttr], 10),
                  r = this.axis[t].scrollbar,
                  o = this.contentWrapperEl[this.axis[t].scrollOffsetAttr],
                  a =
                    (o =
                      "x" === t &&
                      this.isRtl &&
                      e.getRtlHelpers().isRtlScrollingInverted
                        ? -o
                        : o) /
                    (n - s),
                  l = ~~((i - r.size) * a);
                (l =
                  "x" === t &&
                  this.isRtl &&
                  e.getRtlHelpers().isRtlScrollbarInverted
                    ? l + (i - r.size)
                    : l),
                  (r.el.style.transform =
                    "x" === t
                      ? "translate3d(" + l + "px, 0, 0)"
                      : "translate3d(0, " + l + "px, 0)");
              }
            }),
            (t.toggleTrackVisibility = function (e) {
              void 0 === e && (e = "y");
              var t = this.axis[e].track.el,
                n = this.axis[e].scrollbar.el;
              this.axis[e].isOverflowing || this.axis[e].forceVisible
                ? ((t.style.visibility = "visible"),
                  (this.contentWrapperEl.style[this.axis[e].overflowAttr] =
                    "scroll"))
                : ((t.style.visibility = "hidden"),
                  (this.contentWrapperEl.style[this.axis[e].overflowAttr] =
                    "hidden")),
                this.axis[e].isOverflowing
                  ? (n.style.display = "block")
                  : (n.style.display = "none");
            }),
            (t.hideNativeScrollbar = function () {
              (this.offsetEl.style[this.isRtl ? "left" : "right"] =
                this.axis.y.isOverflowing || this.axis.y.forceVisible
                  ? "-" + this.scrollbarWidth + "px"
                  : 0),
                (this.offsetEl.style.bottom =
                  this.axis.x.isOverflowing || this.axis.x.forceVisible
                    ? "-" + this.scrollbarWidth + "px"
                    : 0);
            }),
            (t.onMouseMoveForAxis = function (e) {
              void 0 === e && (e = "y"),
                (this.axis[e].track.rect =
                  this.axis[e].track.el.getBoundingClientRect()),
                (this.axis[e].scrollbar.rect =
                  this.axis[e].scrollbar.el.getBoundingClientRect()),
                this.isWithinBounds(this.axis[e].scrollbar.rect)
                  ? this.axis[e].scrollbar.el.classList.add(
                      this.classNames.hover
                    )
                  : this.axis[e].scrollbar.el.classList.remove(
                      this.classNames.hover
                    ),
                this.isWithinBounds(this.axis[e].track.rect)
                  ? (this.showScrollbar(e),
                    this.axis[e].track.el.classList.add(this.classNames.hover))
                  : this.axis[e].track.el.classList.remove(
                      this.classNames.hover
                    );
            }),
            (t.onMouseLeaveForAxis = function (e) {
              void 0 === e && (e = "y"),
                this.axis[e].track.el.classList.remove(this.classNames.hover),
                this.axis[e].scrollbar.el.classList.remove(
                  this.classNames.hover
                );
            }),
            (t.showScrollbar = function (e) {
              void 0 === e && (e = "y");
              var t = this.axis[e].scrollbar.el;
              this.axis[e].isVisible ||
                (t.classList.add(this.classNames.visible),
                (this.axis[e].isVisible = !0)),
                this.options.autoHide && this.hideScrollbars();
            }),
            (t.onDragStart = function (e, t) {
              void 0 === t && (t = "y");
              var n = Xs(this.el),
                i = Vs(this.el),
                s = this.axis[t].scrollbar,
                r = "y" === t ? e.pageY : e.pageX;
              (this.axis[t].dragOffset = r - s.rect[this.axis[t].offsetAttr]),
                (this.draggedAxis = t),
                this.el.classList.add(this.classNames.dragging),
                n.addEventListener("mousemove", this.drag, !0),
                n.addEventListener("mouseup", this.onEndDrag, !0),
                null === this.removePreventClickId
                  ? (n.addEventListener("click", this.preventClick, !0),
                    n.addEventListener("dblclick", this.preventClick, !0))
                  : (i.clearTimeout(this.removePreventClickId),
                    (this.removePreventClickId = null));
            }),
            (t.onTrackClick = function (e, t) {
              var n = this;
              if ((void 0 === t && (t = "y"), this.options.clickOnTrack)) {
                var i = Vs(this.el);
                this.axis[t].scrollbar.rect =
                  this.axis[t].scrollbar.el.getBoundingClientRect();
                var s = this.axis[t].scrollbar.rect[this.axis[t].offsetAttr],
                  r = parseInt(this.elStyles[this.axis[t].sizeAttr], 10),
                  o = this.contentWrapperEl[this.axis[t].scrollOffsetAttr],
                  a =
                    ("y" === t ? this.mouseY - s : this.mouseX - s) < 0
                      ? -1
                      : 1,
                  l = -1 === a ? o - r : o + r;
                !(function e() {
                  var s, r;
                  -1 === a
                    ? o > l &&
                      ((o -= n.options.clickOnTrackSpeed),
                      n.contentWrapperEl.scrollTo(
                        (((s = {})[n.axis[t].offsetAttr] = o), s)
                      ),
                      i.requestAnimationFrame(e))
                    : o < l &&
                      ((o += n.options.clickOnTrackSpeed),
                      n.contentWrapperEl.scrollTo(
                        (((r = {})[n.axis[t].offsetAttr] = o), r)
                      ),
                      i.requestAnimationFrame(e));
                })();
              }
            }),
            (t.getContentElement = function () {
              return this.contentEl;
            }),
            (t.getScrollElement = function () {
              return this.contentWrapperEl;
            }),
            (t.getScrollbarWidth = function () {
              try {
                return "none" ===
                  getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar")
                    .display ||
                  "scrollbarWidth" in document.documentElement.style ||
                  "-ms-overflow-style" in document.documentElement.style
                  ? 0
                  : Qs(this.el);
              } catch (e) {
                return Qs(this.el);
              }
            }),
            (t.removeListeners = function () {
              var e = this,
                t = Vs(this.el);
              this.options.autoHide &&
                this.el.removeEventListener("mouseenter", this.onMouseEnter),
                ["mousedown", "click", "dblclick"].forEach(function (t) {
                  e.el.removeEventListener(t, e.onPointerEvent, !0);
                }),
                ["touchstart", "touchend", "touchmove"].forEach(function (t) {
                  e.el.removeEventListener(t, e.onPointerEvent, {
                    capture: !0,
                    passive: !0,
                  });
                }),
                this.el.removeEventListener("mousemove", this.onMouseMove),
                this.el.removeEventListener("mouseleave", this.onMouseLeave),
                this.contentWrapperEl &&
                  this.contentWrapperEl.removeEventListener(
                    "scroll",
                    this.onScroll
                  ),
                t.removeEventListener("resize", this.onWindowResize),
                this.mutationObserver && this.mutationObserver.disconnect(),
                this.resizeObserver && this.resizeObserver.disconnect(),
                this.recalculate.cancel(),
                this.onMouseMove.cancel(),
                this.hideScrollbars.cancel(),
                this.onWindowResize.cancel();
            }),
            (t.unMount = function () {
              this.removeListeners(), e.instances.delete(this.el);
            }),
            (t.isWithinBounds = function (e) {
              return (
                this.mouseX >= e.left &&
                this.mouseX <= e.left + e.width &&
                this.mouseY >= e.top &&
                this.mouseY <= e.top + e.height
              );
            }),
            (t.findChild = function (e, t) {
              var n =
                e.matches ||
                e.webkitMatchesSelector ||
                e.mozMatchesSelector ||
                e.msMatchesSelector;
              return Array.prototype.filter.call(e.children, function (e) {
                return n.call(e, t);
              })[0];
            }),
            e
          );
        })();
        return (
          (Ks.defaultOptions = {
            autoHide: !0,
            forceVisible: !1,
            clickOnTrack: !0,
            clickOnTrackSpeed: 40,
            classNames: {
              contentEl: "simplebar-content",
              contentWrapper: "simplebar-content-wrapper",
              offset: "simplebar-offset",
              mask: "simplebar-mask",
              wrapper: "simplebar-wrapper",
              placeholder: "simplebar-placeholder",
              scrollbar: "simplebar-scrollbar",
              track: "simplebar-track",
              heightAutoObserverWrapperEl:
                "simplebar-height-auto-observer-wrapper",
              heightAutoObserverEl: "simplebar-height-auto-observer",
              visible: "simplebar-visible",
              horizontal: "simplebar-horizontal",
              vertical: "simplebar-vertical",
              hover: "simplebar-hover",
              dragging: "simplebar-dragging",
            },
            scrollbarMinSize: 25,
            scrollbarMaxSize: 0,
            timeout: 1e3,
          }),
          (Ks.instances = new WeakMap()),
          (Ks.initDOMLoadedElements = function () {
            document.removeEventListener(
              "DOMContentLoaded",
              this.initDOMLoadedElements
            ),
              window.removeEventListener("load", this.initDOMLoadedElements),
              Array.prototype.forEach.call(
                document.querySelectorAll("[data-simplebar]"),
                function (e) {
                  "init" === e.getAttribute("data-simplebar") ||
                    Ks.instances.has(e) ||
                    new Ks(e, Fs(e.attributes));
                }
              );
          }),
          (Ks.removeObserver = function () {
            this.globalObserver.disconnect();
          }),
          (Ks.initHtmlApi = function () {
            (this.initDOMLoadedElements =
              this.initDOMLoadedElements.bind(this)),
              "undefined" != typeof MutationObserver &&
                ((this.globalObserver = new MutationObserver(
                  Ks.handleMutations
                )),
                this.globalObserver.observe(document, {
                  childList: !0,
                  subtree: !0,
                })),
              "complete" === document.readyState ||
              ("loading" !== document.readyState &&
                !document.documentElement.doScroll)
                ? window.setTimeout(this.initDOMLoadedElements)
                : (document.addEventListener(
                    "DOMContentLoaded",
                    this.initDOMLoadedElements
                  ),
                  window.addEventListener("load", this.initDOMLoadedElements));
          }),
          (Ks.handleMutations = function (e) {
            e.forEach(function (e) {
              Array.prototype.forEach.call(e.addedNodes, function (e) {
                1 === e.nodeType &&
                  (e.hasAttribute("data-simplebar")
                    ? !Ks.instances.has(e) &&
                      document.documentElement.contains(e) &&
                      new Ks(e, Fs(e.attributes))
                    : Array.prototype.forEach.call(
                        e.querySelectorAll("[data-simplebar]"),
                        function (e) {
                          "init" !== e.getAttribute("data-simplebar") &&
                            !Ks.instances.has(e) &&
                            document.documentElement.contains(e) &&
                            new Ks(e, Fs(e.attributes));
                        }
                      ));
              }),
                Array.prototype.forEach.call(e.removedNodes, function (e) {
                  1 === e.nodeType &&
                    ("init" === e.getAttribute("data-simplebar")
                      ? Ks.instances.has(e) &&
                        !document.documentElement.contains(e) &&
                        Ks.instances.get(e).unMount()
                      : Array.prototype.forEach.call(
                          e.querySelectorAll('[data-simplebar="init"]'),
                          function (e) {
                            Ks.instances.has(e) &&
                              !document.documentElement.contains(e) &&
                              Ks.instances.get(e).unMount();
                          }
                        ));
                });
            });
          }),
          (Ks.getOptions = Fs),
          Xe && Ks.initHtmlApi(),
          Ks
        );
      }),
      "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = xe())
        : "function" == typeof define && define.amd
        ? define(xe)
        : ((Ee = Ee || self).SimpleBar = xe()),
      document.querySelectorAll(".menu__sub-list").forEach(function (e, t, n) {
        e &&
          (e.insertAdjacentHTML(
            "afterbegin",
            '<div class="menu__sub-list-back _icon-arrow-r">Назад</div>'
          ),
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            '<div class="menu__button-sub-open _icon-arrow-r"></div>'
          ));
      }),
      document.querySelector(".themetoggle").addEventListener("click", (e) => {
        "dark" === localStorage.getItem("theme")
          ? localStorage.removeItem("theme")
          : localStorage.setItem("theme", "dark"),
          Se();
      }),
      Se(),
      (function () {
        if (window.innerWidth > 1023.98) {
          let e = [];
          const t = document.querySelector(".menu__list").children,
            n =
              (document.documentElement.clientWidth,
              document.querySelector(".menu__search-wrapper").clientWidth,
              document.querySelector(".menu__body")),
            i = document.querySelector(".menu__list").offsetWidth;
          console.log(`Ширина меню ${i}`);
          let s = 60;
          t.forEach(function (t, n, r) {
            let o = t.offsetWidth;
            console.log(`ЦИКЛ ---- ${n} элемент-- до сложения ${s} +++ ${o}`),
              console.dir(t),
              (s += o),
              console.log(`после сложения ${s}`),
              "menu__button-sub-open _icon-arrow-r" == t.lastChild.className &&
                (console.log("есть стрелка --\x3e"),
                (s += 30),
                console.log(` + 30 --- ${s}`)),
              i < s && (e.push(t), console.log("скрыть"));
          }),
            i < s &&
              (n.insertAdjacentHTML(
                "beforeend",
                '<div class="menu__more"><div class="menu__more-btn _icon-ellipsis-vertical"></div><ul class="menu__list"></ul></div>'
              ),
              console.log("создать оболочку"),
              console.log(e));
          const r = document.querySelector(".menu__more>.menu__list");
          for (let t = 0; t < e.length; t++) r.append(e[t]);
        }
      })();
    const Ce = document.querySelector(".menu__more-btn");
    function Te(e = null) {
      let t = [];
      if (e) {
        let n = e.parentNode;
        for (; n && !n.classList.contains("menu__list"); )
          "UL" === n.nodeName && t.push(n), (n = n.parentNode);
      }
      const n = document.querySelectorAll(".menu__sub-list");
      Array.from(n).forEach((n) => {
        n == e ||
          t.includes(n) ||
          (n.classList.remove("_open"),
          n.parentElement.classList.remove("_hover"));
      });
    }
    console.log(Ce),
      Ce &&
        Ce.addEventListener("click", function (e) {
          console.log("нажал"),
            document.documentElement.classList.toggle("menu-more");
        }),
      (window.onload = function () {
        document.addEventListener("click", function (e) {
          const t = e.target;
          t.classList.contains("search-menu__icon")
            ? (document
                .querySelector(".search-menu")
                .classList.toggle("_active"),
              document.documentElement.classList.add("search-open"),
              document.addEventListener("windowScroll", function (e) {
                window.scrollY >= 0 &&
                  (document
                    .querySelector(".search-menu")
                    .classList.remove("_active"),
                  document.documentElement.classList.remove("search-open"));
              }))
            : !t.closest(".form-search") &&
              document.querySelectorAll(".search-open") &&
              (document
                .querySelector(".search-menu")
                .classList.remove("_active"),
              document.documentElement.classList.remove("search-open"));
          const n = document.querySelector(".button-contacts-header"),
            i = document.querySelector(".contacts-block__call"),
            s = document.querySelector(".contacts");
          if (n.contains(e.target) || i.contains(e.target)) {
            const e = document.documentElement.clientWidth,
              t = n.getBoundingClientRect().right,
              i = n.getBoundingClientRect().bottom,
              o = e - t;
            console.log(o),
              console.log(i),
              console.log(r),
              window.innerWidth > 767.98 &&
                ((s.style.top = i + 35 + "px"),
                console.log(i),
                (s.style.right = o + "px")),
              document.documentElement.classList.toggle("contacts-open"),
              window.innerWidth,
              window.innerWidth < 767.98 &&
                document.querySelector(".menu-open") &&
                (document.documentElement.classList.remove("menu-open"),
                (document.querySelector(".menu__body").onmouseleave = Te),
                console.log("закрыть"));
          } else ((!t.closest(".contacts") && document.querySelectorAll(".contacts-open")) || t.closest(".call-back")) && document.documentElement.classList.remove("contacts-open");
        });
      }),
      document.querySelector(".menu__body").addEventListener("click", (e) => {
        const t = e.target,
          n = t.parentElement,
          i = n.querySelector(".menu__sub-list");
        t.classList.contains("menu__button-sub-open") &&
          n &&
          i &&
          (Te(i),
          i.classList.toggle("_open"),
          n.classList.toggle("_hover"),
          console.dir("открыл - подменю")),
          t.classList.contains("menu__sub-list-back") &&
            !t.closest("menu__item") &&
            (t.parentNode.classList.remove("_open"),
            console.dir("закрыл - подменю"),
            Te(i));
      }),
      (document.querySelector(".menu").onmouseleave = Te),
      (function () {
        const e = document.documentElement.clientWidth;
        document
          .querySelectorAll(".menu__sub-list")
          .forEach(function (t, n, i) {
            let s = t.getBoundingClientRect().left,
              r = t.clientWidth;
            e < s + r && t.classList.add("_left");
          });
      })(),
      (window.FLS = !0),
      (function (e) {
        let t = new Image();
        (t.onload = t.onerror =
          function () {
            e(2 == t.height);
          }),
          (t.src =
            "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
      })(function (e) {
        let t = !0 === e ? "webp" : "no-webp";
        document.documentElement.classList.add(t);
      }),
      t.any() && document.documentElement.classList.add("touch"),
      (function () {
        let e = document.querySelector(".mobile-header__burger");
        e &&
          e.addEventListener("click", function (e) {
            r &&
              (document.querySelector(".contacts-open")
                ? document.documentElement.classList.add("menu-open")
                : document.documentElement.classList.toggle("menu-open"));
          });
      })(),
      (function () {
        const e = document.querySelectorAll("[data-spollers]");
        if (e.length > 0) {
          const t = Array.from(e).filter(function (e, t, n) {
            return !e.dataset.spollers.split(",")[0];
          });
          t.length && r(t);
          let n = f(e, "spollers");
          function r(e, t = !1) {
            e.forEach((e) => {
              (e = t ? e.item : e),
                t.matches || !t
                  ? (e.classList.add("_spoller-init"),
                    o(e),
                    e.addEventListener("click", a))
                  : (e.classList.remove("_spoller-init"),
                    o(e, !1),
                    e.removeEventListener("click", a));
            });
          }
          function o(e, t = !0) {
            let n = e.querySelectorAll("[data-spoller]");
            n.length &&
              ((n = Array.from(n).filter(
                (t) => t.closest("[data-spollers]") === e
              )),
              n.forEach((e) => {
                t
                  ? (e.removeAttribute("tabindex"),
                    e.classList.contains("_spoller-active") ||
                      (e.nextElementSibling.hidden = !0))
                  : (e.setAttribute("tabindex", "-1"),
                    (e.nextElementSibling.hidden = !1));
              }));
          }
          function a(e) {
            const t = e.target;
            if (t.closest("[data-spoller]")) {
              const n = t.closest("[data-spoller]"),
                r = n.closest("[data-spollers]"),
                o = !!r.hasAttribute("data-one-spoller");
              r.querySelectorAll("._slide").length ||
                (o && !n.classList.contains("_spoller-active") && l(r),
                n.classList.toggle("_spoller-active"),
                ((e, t = 500) => {
                  e.hidden ? s(e, t) : i(e, t);
                })(n.nextElementSibling, 500)),
                e.preventDefault();
            }
          }
          function l(e) {
            const t = e.querySelector("[data-spoller]._spoller-active");
            t &&
              (t.classList.remove("_spoller-active"),
              i(t.nextElementSibling, 500));
          }
          n &&
            n.length &&
            n.forEach((e) => {
              e.matchMedia.addEventListener("change", function () {
                r(e.itemsArray, e.matchMedia);
              }),
                r(e.itemsArray, e.matchMedia);
            });
        }
      })(),
      (function () {
        ye = !0;
        const e = document.querySelector("header.header"),
          t = e.hasAttribute("data-scroll-show");
        e.dataset.scrollShow && e.dataset.scrollShow,
          window.innerWidth > 1023.98 &&
            document.addEventListener("windowScroll", function (n) {
              const i = window.scrollY;
              clearTimeout(undefined),
                i >= 1
                  ? (!e.classList.contains("_header-scroll") &&
                      e.classList.add("_header-scroll"),
                    t &&
                      (i < 100
                        ? e.classList.contains("_header-show") &&
                          e.classList.remove("_header-show")
                        : !e.classList.contains("_header-show") &&
                          e.classList.add("_header-show")))
                  : (e.classList.contains("_header-scroll") &&
                      e.classList.remove("_header-scroll"),
                    t &&
                      e.classList.contains("_header-show") &&
                      e.classList.remove("_header-show"));
            });
      })();
  })();
})();
