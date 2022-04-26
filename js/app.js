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
  let i = (e, t = 500, i = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = i ? `${i}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !i),
            !i && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !i && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide"),
            document.dispatchEvent(
              new CustomEvent("slideUpDone", { detail: { target: e } })
            );
        }, t));
    },
    n = (e, t = 500, i = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          i && e.style.removeProperty("height");
        let n = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = i ? `${i}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = n + "px"),
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
    s = !0,
    r = (e = 500) => {
      document.documentElement.classList.contains("lock") ? o(e) : a(e);
    },
    o = (e = 500) => {
      let t = document.querySelector("body");
      if (s) {
        let i = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < i.length; e++) {
            i[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (s = !1),
          setTimeout(function () {
            s = !0;
          }, e);
      }
    },
    a = (e = 500) => {
      let t = document.querySelector("body");
      if (s) {
        let i = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < i.length; e++) {
          i[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (s = !1),
          setTimeout(function () {
            s = !0;
          }, e);
      }
    };
  let l = document.querySelector(".icon-menu");
  const c = document.querySelector(".menu__list");
  function d(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  function u(e) {
    return e.filter(function (e, t, i) {
      return i.indexOf(e) === t;
    });
  }
  function p(e, t) {
    const i = Array.from(e).filter(function (e, i, n) {
      if (e.dataset[t]) return e.dataset[t].split(",")[0];
    });
    if (i.length) {
      const e = [];
      i.forEach((i) => {
        const n = {},
          s = i.dataset[t].split(",");
        (n.value = s[0]),
          (n.type = s[1] ? s[1].trim() : "max"),
          (n.item = i),
          e.push(n);
      });
      let n = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      n = u(n);
      const s = [];
      if (n.length)
        return (
          n.forEach((t) => {
            const i = t.split(","),
              n = i[1],
              r = i[2],
              o = window.matchMedia(i[0]),
              a = e.filter(function (e) {
                if (e.value === n && e.type === r) return !0;
              });
            s.push({ itemsArray: a, matchMedia: o });
          }),
          s
        );
    }
  }
  document.addEventListener("click", function (e) {
    const t = e.target,
      i = t == c || c.contains(t),
      n = t == l,
      s = document.documentElement.classList.contains("menu-open");
    i ||
      n ||
      !s ||
      (document.documentElement.classList.toggle("menu-open"),
      console.log("zakrыl"));
  }),
    document
      .querySelector(".menu__row")
      .addEventListener("onmouseleave", function (e) {
        console.log("ЗАКРЫТЬ");
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
          const i = this.options.setAutoplayYoutube ? "autoplay;" : "";
          t.setAttribute("allow", `${i}; encrypted-media`),
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
          this._reopen ? (this._reopen = !1) : r(),
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
          s &&
          (this.options.on.beforeClose(this),
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
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
            r(),
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
      document.querySelector(`[${this.options.attributeOpenButton}="${e}"]`) &&
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
        i = Array.prototype.slice.call(t),
        n = i.indexOf(document.activeElement);
      e.shiftKey && 0 === n && (i[i.length - 1].focus(), e.preventDefault()),
        e.shiftKey || n !== i.length - 1 || (i[0].focus(), e.preventDefault());
    }
    _focusTrap() {
      const e = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : e[0].focus();
    }
    popupLogging(e) {
      this.options.logging && d(`[Попапос]: ${e}`);
    }
  })({});
  let h = {
    getErrors(e) {
      let t = 0,
        i = e.querySelectorAll("*[data-required]");
      return (
        i.length &&
          i.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
          ? this.removeError(e)
          : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error")
          );
    },
    formClean(t) {
      t.reset(),
        setTimeout(() => {
          let i = t.querySelectorAll("input,textarea");
          for (let e = 0; e < i.length; e++) {
            const t = i[e];
            t.parentElement.classList.remove("_form-focus"),
              t.classList.remove("_form-focus"),
              h.removeError(t);
          }
          let n = t.querySelectorAll(".checkbox__input");
          if (n.length > 0)
            for (let e = 0; e < n.length; e++) {
              n[e].checked = !1;
            }
          if (e.select) {
            let i = t.querySelectorAll(".select");
            if (i.length)
              for (let t = 0; t < i.length; t++) {
                const n = i[t].querySelector("select");
                e.select.selectBuild(n);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  function f(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function m(e = {}, t = {}) {
    Object.keys(t).forEach((i) => {
      void 0 === e[i]
        ? (e[i] = t[i])
        : f(t[i]) && f(e[i]) && Object.keys(t[i]).length > 0 && m(e[i], t[i]);
    });
  }
  const v = {
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
  function g() {
    const e = "undefined" != typeof document ? document : {};
    return m(e, v), e;
  }
  const b = {
    document: v,
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
  function y() {
    const e = "undefined" != typeof window ? window : {};
    return m(e, b), e;
  }
  class w extends Array {
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
  function E(e = []) {
    const t = [];
    return (
      e.forEach((e) => {
        Array.isArray(e) ? t.push(...E(e)) : t.push(e);
      }),
      t
    );
  }
  function x(e, t) {
    return Array.prototype.filter.call(e, t);
  }
  function S(e, t) {
    const i = y(),
      n = g();
    let s = [];
    if (!t && e instanceof w) return e;
    if (!e) return new w(s);
    if ("string" == typeof e) {
      const i = e.trim();
      if (i.indexOf("<") >= 0 && i.indexOf(">") >= 0) {
        let e = "div";
        0 === i.indexOf("<li") && (e = "ul"),
          0 === i.indexOf("<tr") && (e = "tbody"),
          (0 !== i.indexOf("<td") && 0 !== i.indexOf("<th")) || (e = "tr"),
          0 === i.indexOf("<tbody") && (e = "table"),
          0 === i.indexOf("<option") && (e = "select");
        const t = n.createElement(e);
        t.innerHTML = i;
        for (let e = 0; e < t.childNodes.length; e += 1)
          s.push(t.childNodes[e]);
      } else
        s = (function (e, t) {
          if ("string" != typeof e) return [e];
          const i = [],
            n = t.querySelectorAll(e);
          for (let e = 0; e < n.length; e += 1) i.push(n[e]);
          return i;
        })(e.trim(), t || n);
    } else if (e.nodeType || e === i || e === n) s.push(e);
    else if (Array.isArray(e)) {
      if (e instanceof w) return e;
      s = e;
    }
    return new w(
      (function (e) {
        const t = [];
        for (let i = 0; i < e.length; i += 1)
          -1 === t.indexOf(e[i]) && t.push(e[i]);
        return t;
      })(s)
    );
  }
  S.fn = w.prototype;
  const T = "resize scroll".split(" ");
  function C(e) {
    return function (...t) {
      if (void 0 === t[0]) {
        for (let t = 0; t < this.length; t += 1)
          T.indexOf(e) < 0 &&
            (e in this[t] ? this[t][e]() : S(this[t]).trigger(e));
        return this;
      }
      return this.on(e, ...t);
    };
  }
  C("click"),
    C("blur"),
    C("focus"),
    C("focusin"),
    C("focusout"),
    C("keyup"),
    C("keydown"),
    C("keypress"),
    C("submit"),
    C("change"),
    C("mousedown"),
    C("mousemove"),
    C("mouseup"),
    C("mouseenter"),
    C("mouseleave"),
    C("mouseout"),
    C("mouseover"),
    C("touchstart"),
    C("touchend"),
    C("touchmove"),
    C("resize"),
    C("scroll");
  const O = {
    addClass: function (...e) {
      const t = E(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.add(...t);
        }),
        this
      );
    },
    removeClass: function (...e) {
      const t = E(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.remove(...t);
        }),
        this
      );
    },
    hasClass: function (...e) {
      const t = E(e.map((e) => e.split(" ")));
      return (
        x(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
          .length > 0
      );
    },
    toggleClass: function (...e) {
      const t = E(e.map((e) => e.split(" ")));
      this.forEach((e) => {
        t.forEach((t) => {
          e.classList.toggle(t);
        });
      });
    },
    attr: function (e, t) {
      if (1 === arguments.length && "string" == typeof e)
        return this[0] ? this[0].getAttribute(e) : void 0;
      for (let i = 0; i < this.length; i += 1)
        if (2 === arguments.length) this[i].setAttribute(e, t);
        else
          for (const t in e) (this[i][t] = e[t]), this[i].setAttribute(t, e[t]);
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
        this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
      return this;
    },
    on: function (...e) {
      let [t, i, n, s] = e;
      function r(e) {
        const t = e.target;
        if (!t) return;
        const s = e.target.dom7EventData || [];
        if ((s.indexOf(e) < 0 && s.unshift(e), S(t).is(i))) n.apply(t, s);
        else {
          const e = S(t).parents();
          for (let t = 0; t < e.length; t += 1)
            S(e[t]).is(i) && n.apply(e[t], s);
        }
      }
      function o(e) {
        const t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t);
      }
      "function" == typeof e[1] && (([t, n, s] = e), (i = void 0)),
        s || (s = !1);
      const a = t.split(" ");
      let l;
      for (let e = 0; e < this.length; e += 1) {
        const t = this[e];
        if (i)
          for (l = 0; l < a.length; l += 1) {
            const e = a[l];
            t.dom7LiveListeners || (t.dom7LiveListeners = {}),
              t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
              t.dom7LiveListeners[e].push({ listener: n, proxyListener: r }),
              t.addEventListener(e, r, s);
          }
        else
          for (l = 0; l < a.length; l += 1) {
            const e = a[l];
            t.dom7Listeners || (t.dom7Listeners = {}),
              t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
              t.dom7Listeners[e].push({ listener: n, proxyListener: o }),
              t.addEventListener(e, o, s);
          }
      }
      return this;
    },
    off: function (...e) {
      let [t, i, n, s] = e;
      "function" == typeof e[1] && (([t, n, s] = e), (i = void 0)),
        s || (s = !1);
      const r = t.split(" ");
      for (let e = 0; e < r.length; e += 1) {
        const t = r[e];
        for (let e = 0; e < this.length; e += 1) {
          const r = this[e];
          let o;
          if (
            (!i && r.dom7Listeners
              ? (o = r.dom7Listeners[t])
              : i && r.dom7LiveListeners && (o = r.dom7LiveListeners[t]),
            o && o.length)
          )
            for (let e = o.length - 1; e >= 0; e -= 1) {
              const i = o[e];
              (n && i.listener === n) ||
              (n &&
                i.listener &&
                i.listener.dom7proxy &&
                i.listener.dom7proxy === n)
                ? (r.removeEventListener(t, i.proxyListener, s), o.splice(e, 1))
                : n ||
                  (r.removeEventListener(t, i.proxyListener, s),
                  o.splice(e, 1));
            }
        }
      }
      return this;
    },
    trigger: function (...e) {
      const t = y(),
        i = e[0].split(" "),
        n = e[1];
      for (let s = 0; s < i.length; s += 1) {
        const r = i[s];
        for (let i = 0; i < this.length; i += 1) {
          const s = this[i];
          if (t.CustomEvent) {
            const i = new t.CustomEvent(r, {
              detail: n,
              bubbles: !0,
              cancelable: !0,
            });
            (s.dom7EventData = e.filter((e, t) => t > 0)),
              s.dispatchEvent(i),
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
          t.on("transitionend", function i(n) {
            n.target === this && (e.call(this, n), t.off("transitionend", i));
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
      const e = y();
      return this[0] ? e.getComputedStyle(this[0], null) : {};
    },
    offset: function () {
      if (this.length > 0) {
        const e = y(),
          t = g(),
          i = this[0],
          n = i.getBoundingClientRect(),
          s = t.body,
          r = i.clientTop || s.clientTop || 0,
          o = i.clientLeft || s.clientLeft || 0,
          a = i === e ? e.scrollY : i.scrollTop,
          l = i === e ? e.scrollX : i.scrollLeft;
        return { top: n.top + a - r, left: n.left + l - o };
      }
      return null;
    },
    css: function (e, t) {
      const i = y();
      let n;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (n = 0; n < this.length; n += 1)
            for (const t in e) this[n].style[t] = e[t];
          return this;
        }
        if (this[0])
          return i.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (n = 0; n < this.length; n += 1) this[n].style[e] = t;
        return this;
      }
      return this;
    },
    each: function (e) {
      return e
        ? (this.forEach((t, i) => {
            e.apply(t, [t, i]);
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
      const t = y(),
        i = g(),
        n = this[0];
      let s, r;
      if (!n || void 0 === e) return !1;
      if ("string" == typeof e) {
        if (n.matches) return n.matches(e);
        if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
        if (n.msMatchesSelector) return n.msMatchesSelector(e);
        for (s = S(e), r = 0; r < s.length; r += 1) if (s[r] === n) return !0;
        return !1;
      }
      if (e === i) return n === i;
      if (e === t) return n === t;
      if (e.nodeType || e instanceof w) {
        for (s = e.nodeType ? [e] : e, r = 0; r < s.length; r += 1)
          if (s[r] === n) return !0;
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
      if (e > t - 1) return S([]);
      if (e < 0) {
        const i = t + e;
        return S(i < 0 ? [] : [this[i]]);
      }
      return S([this[e]]);
    },
    append: function (...e) {
      let t;
      const i = g();
      for (let n = 0; n < e.length; n += 1) {
        t = e[n];
        for (let e = 0; e < this.length; e += 1)
          if ("string" == typeof t) {
            const n = i.createElement("div");
            for (n.innerHTML = t; n.firstChild; )
              this[e].appendChild(n.firstChild);
          } else if (t instanceof w)
            for (let i = 0; i < t.length; i += 1) this[e].appendChild(t[i]);
          else this[e].appendChild(t);
      }
      return this;
    },
    prepend: function (e) {
      const t = g();
      let i, n;
      for (i = 0; i < this.length; i += 1)
        if ("string" == typeof e) {
          const s = t.createElement("div");
          for (s.innerHTML = e, n = s.childNodes.length - 1; n >= 0; n -= 1)
            this[i].insertBefore(s.childNodes[n], this[i].childNodes[0]);
        } else if (e instanceof w)
          for (n = 0; n < e.length; n += 1)
            this[i].insertBefore(e[n], this[i].childNodes[0]);
        else this[i].insertBefore(e, this[i].childNodes[0]);
      return this;
    },
    next: function (e) {
      return this.length > 0
        ? e
          ? this[0].nextElementSibling && S(this[0].nextElementSibling).is(e)
            ? S([this[0].nextElementSibling])
            : S([])
          : this[0].nextElementSibling
          ? S([this[0].nextElementSibling])
          : S([])
        : S([]);
    },
    nextAll: function (e) {
      const t = [];
      let i = this[0];
      if (!i) return S([]);
      for (; i.nextElementSibling; ) {
        const n = i.nextElementSibling;
        e ? S(n).is(e) && t.push(n) : t.push(n), (i = n);
      }
      return S(t);
    },
    prev: function (e) {
      if (this.length > 0) {
        const t = this[0];
        return e
          ? t.previousElementSibling && S(t.previousElementSibling).is(e)
            ? S([t.previousElementSibling])
            : S([])
          : t.previousElementSibling
          ? S([t.previousElementSibling])
          : S([]);
      }
      return S([]);
    },
    prevAll: function (e) {
      const t = [];
      let i = this[0];
      if (!i) return S([]);
      for (; i.previousElementSibling; ) {
        const n = i.previousElementSibling;
        e ? S(n).is(e) && t.push(n) : t.push(n), (i = n);
      }
      return S(t);
    },
    parent: function (e) {
      const t = [];
      for (let i = 0; i < this.length; i += 1)
        null !== this[i].parentNode &&
          (e
            ? S(this[i].parentNode).is(e) && t.push(this[i].parentNode)
            : t.push(this[i].parentNode));
      return S(t);
    },
    parents: function (e) {
      const t = [];
      for (let i = 0; i < this.length; i += 1) {
        let n = this[i].parentNode;
        for (; n; ) e ? S(n).is(e) && t.push(n) : t.push(n), (n = n.parentNode);
      }
      return S(t);
    },
    closest: function (e) {
      let t = this;
      return void 0 === e ? S([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function (e) {
      const t = [];
      for (let i = 0; i < this.length; i += 1) {
        const n = this[i].querySelectorAll(e);
        for (let e = 0; e < n.length; e += 1) t.push(n[e]);
      }
      return S(t);
    },
    children: function (e) {
      const t = [];
      for (let i = 0; i < this.length; i += 1) {
        const n = this[i].children;
        for (let i = 0; i < n.length; i += 1)
          (e && !S(n[i]).is(e)) || t.push(n[i]);
      }
      return S(t);
    },
    filter: function (e) {
      return S(x(this, e));
    },
    remove: function () {
      for (let e = 0; e < this.length; e += 1)
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
  };
  Object.keys(O).forEach((e) => {
    Object.defineProperty(S.fn, e, { value: O[e], writable: !0 });
  });
  const L = S;
  function k(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function A() {
    return Date.now();
  }
  function _(e, t) {
    void 0 === t && (t = "x");
    const i = y();
    let n, s, r;
    const o = (function (e) {
      const t = y();
      let i;
      return (
        t.getComputedStyle && (i = t.getComputedStyle(e, null)),
        !i && e.currentStyle && (i = e.currentStyle),
        i || (i = e.style),
        i
      );
    })(e);
    return (
      i.WebKitCSSMatrix
        ? ((s = o.transform || o.webkitTransform),
          s.split(",").length > 6 &&
            (s = s
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (r = new i.WebKitCSSMatrix("none" === s ? "" : s)))
        : ((r =
            o.MozTransform ||
            o.OTransform ||
            o.MsTransform ||
            o.msTransform ||
            o.transform ||
            o
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (n = r.toString().split(","))),
      "x" === t &&
        (s = i.WebKitCSSMatrix
          ? r.m41
          : 16 === n.length
          ? parseFloat(n[12])
          : parseFloat(n[4])),
      "y" === t &&
        (s = i.WebKitCSSMatrix
          ? r.m42
          : 16 === n.length
          ? parseFloat(n[13])
          : parseFloat(n[5])),
      s || 0
    );
  }
  function M(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function P(e) {
    return "undefined" != typeof window && void 0 !== window.HTMLElement
      ? e instanceof HTMLElement
      : e && (1 === e.nodeType || 11 === e.nodeType);
  }
  function $() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < arguments.length; i += 1) {
      const n = i < 0 || arguments.length <= i ? void 0 : arguments[i];
      if (null != n && !P(n)) {
        const i = Object.keys(Object(n)).filter((e) => t.indexOf(e) < 0);
        for (let t = 0, s = i.length; t < s; t += 1) {
          const s = i[t],
            r = Object.getOwnPropertyDescriptor(n, s);
          void 0 !== r &&
            r.enumerable &&
            (M(e[s]) && M(n[s])
              ? n[s].__swiper__
                ? (e[s] = n[s])
                : $(e[s], n[s])
              : !M(e[s]) && M(n[s])
              ? ((e[s] = {}), n[s].__swiper__ ? (e[s] = n[s]) : $(e[s], n[s]))
              : (e[s] = n[s]));
        }
      }
    }
    return e;
  }
  function z(e, t, i) {
    e.style.setProperty(t, i);
  }
  function I(e) {
    let { swiper: t, targetPosition: i, side: n } = e;
    const s = y(),
      r = -t.translate;
    let o,
      a = null;
    const l = t.params.speed;
    (t.wrapperEl.style.scrollSnapType = "none"),
      s.cancelAnimationFrame(t.cssModeFrameID);
    const c = i > r ? "next" : "prev",
      d = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
      u = () => {
        (o = new Date().getTime()), null === a && (a = o);
        const e = Math.max(Math.min((o - a) / l, 1), 0),
          c = 0.5 - Math.cos(e * Math.PI) / 2;
        let p = r + c * (i - r);
        if ((d(p, i) && (p = i), t.wrapperEl.scrollTo({ [n]: p }), d(p, i)))
          return (
            (t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (t.wrapperEl.style.overflow = ""),
                t.wrapperEl.scrollTo({ [n]: p });
            }),
            void s.cancelAnimationFrame(t.cssModeFrameID)
          );
        t.cssModeFrameID = s.requestAnimationFrame(u);
      };
    u();
  }
  let N, B, W;
  function D() {
    return (
      N ||
        (N = (function () {
          const e = y(),
            t = g();
          return {
            smoothScroll:
              t.documentElement && "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
            passiveListener: (function () {
              let t = !1;
              try {
                const i = Object.defineProperty({}, "passive", {
                  get() {
                    t = !0;
                  },
                });
                e.addEventListener("testPassiveListener", null, i);
              } catch (e) {}
              return t;
            })(),
            gestures: "ongesturestart" in e,
          };
        })()),
      N
    );
  }
  function j(e) {
    return (
      void 0 === e && (e = {}),
      B ||
        (B = (function (e) {
          let { userAgent: t } = void 0 === e ? {} : e;
          const i = D(),
            n = y(),
            s = n.navigator.platform,
            r = t || n.navigator.userAgent,
            o = { ios: !1, android: !1 },
            a = n.screen.width,
            l = n.screen.height,
            c = r.match(/(Android);?[\s\/]+([\d.]+)?/);
          let d = r.match(/(iPad).*OS\s([\d_]+)/);
          const u = r.match(/(iPod)(.*OS\s([\d_]+))?/),
            p = !d && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            h = "Win32" === s;
          let f = "MacIntel" === s;
          return (
            !d &&
              f &&
              i.touch &&
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
  function R() {
    return (
      W ||
        (W = (function () {
          const e = y();
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
      W
    );
  }
  const q = {
    on(e, t, i) {
      const n = this;
      if ("function" != typeof t) return n;
      const s = i ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          n.eventsListeners[e] || (n.eventsListeners[e] = []),
            n.eventsListeners[e][s](t);
        }),
        n
      );
    },
    once(e, t, i) {
      const n = this;
      if ("function" != typeof t) return n;
      function s() {
        n.off(e, s), s.__emitterProxy && delete s.__emitterProxy;
        for (var i = arguments.length, r = new Array(i), o = 0; o < i; o++)
          r[o] = arguments[o];
        t.apply(n, r);
      }
      return (s.__emitterProxy = t), n.on(e, s, i);
    },
    onAny(e, t) {
      const i = this;
      if ("function" != typeof e) return i;
      const n = t ? "unshift" : "push";
      return (
        i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[n](e), i
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsAnyListeners) return t;
      const i = t.eventsAnyListeners.indexOf(e);
      return i >= 0 && t.eventsAnyListeners.splice(i, 1), t;
    },
    off(e, t) {
      const i = this;
      return i.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (i.eventsListeners[e] = [])
              : i.eventsListeners[e] &&
                i.eventsListeners[e].forEach((n, s) => {
                  (n === t || (n.__emitterProxy && n.__emitterProxy === t)) &&
                    i.eventsListeners[e].splice(s, 1);
                });
          }),
          i)
        : i;
    },
    emit() {
      const e = this;
      if (!e.eventsListeners) return e;
      let t, i, n;
      for (var s = arguments.length, r = new Array(s), o = 0; o < s; o++)
        r[o] = arguments[o];
      "string" == typeof r[0] || Array.isArray(r[0])
        ? ((t = r[0]), (i = r.slice(1, r.length)), (n = e))
        : ((t = r[0].events), (i = r[0].data), (n = r[0].context || e)),
        i.unshift(n);
      return (
        (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
          e.eventsAnyListeners &&
            e.eventsAnyListeners.length &&
            e.eventsAnyListeners.forEach((e) => {
              e.apply(n, [t, ...i]);
            }),
            e.eventsListeners &&
              e.eventsListeners[t] &&
              e.eventsListeners[t].forEach((e) => {
                e.apply(n, i);
              });
        }),
        e
      );
    },
  };
  const G = {
    updateSize: function () {
      const e = this;
      let t, i;
      const n = e.$el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : n[0].clientWidth),
        (i =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : n[0].clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === i && e.isVertical()) ||
          ((t =
            t -
            parseInt(n.css("padding-left") || 0, 10) -
            parseInt(n.css("padding-right") || 0, 10)),
          (i =
            i -
            parseInt(n.css("padding-top") || 0, 10) -
            parseInt(n.css("padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(i) && (i = 0),
          Object.assign(e, {
            width: t,
            height: i,
            size: e.isHorizontal() ? t : i,
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
      function i(e, i) {
        return parseFloat(e.getPropertyValue(t(i)) || 0);
      }
      const n = e.params,
        { $wrapperEl: s, size: r, rtlTranslate: o, wrongRTL: a } = e,
        l = e.virtual && n.virtual.enabled,
        c = l ? e.virtual.slides.length : e.slides.length,
        d = s.children(`.${e.params.slideClass}`),
        u = l ? e.virtual.slides.length : d.length;
      let p = [];
      const h = [],
        f = [];
      let m = n.slidesOffsetBefore;
      "function" == typeof m && (m = n.slidesOffsetBefore.call(e));
      let v = n.slidesOffsetAfter;
      "function" == typeof v && (v = n.slidesOffsetAfter.call(e));
      const g = e.snapGrid.length,
        b = e.slidesGrid.length;
      let y = n.spaceBetween,
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
        n.centeredSlides &&
          n.cssMode &&
          (z(e.wrapperEl, "--swiper-centered-offset-before", ""),
          z(e.wrapperEl, "--swiper-centered-offset-after", ""));
      const S = n.grid && n.grid.rows > 1 && e.grid;
      let T;
      S && e.grid.initSlides(u);
      const C =
        "auto" === n.slidesPerView &&
        n.breakpoints &&
        Object.keys(n.breakpoints).filter(
          (e) => void 0 !== n.breakpoints[e].slidesPerView
        ).length > 0;
      for (let s = 0; s < u; s += 1) {
        T = 0;
        const o = d.eq(s);
        if (
          (S && e.grid.updateSlide(s, o, u, t), "none" !== o.css("display"))
        ) {
          if ("auto" === n.slidesPerView) {
            C && (d[s].style[t("width")] = "");
            const r = getComputedStyle(o[0]),
              a = o[0].style.transform,
              l = o[0].style.webkitTransform;
            if (
              (a && (o[0].style.transform = "none"),
              l && (o[0].style.webkitTransform = "none"),
              n.roundLengths)
            )
              T = e.isHorizontal() ? o.outerWidth(!0) : o.outerHeight(!0);
            else {
              const e = i(r, "width"),
                t = i(r, "padding-left"),
                n = i(r, "padding-right"),
                s = i(r, "margin-left"),
                a = i(r, "margin-right"),
                l = r.getPropertyValue("box-sizing");
              if (l && "border-box" === l) T = e + s + a;
              else {
                const { clientWidth: i, offsetWidth: r } = o[0];
                T = e + t + n + s + a + (r - i);
              }
            }
            a && (o[0].style.transform = a),
              l && (o[0].style.webkitTransform = l),
              n.roundLengths && (T = Math.floor(T));
          } else
            (T = (r - (n.slidesPerView - 1) * y) / n.slidesPerView),
              n.roundLengths && (T = Math.floor(T)),
              d[s] && (d[s].style[t("width")] = `${T}px`);
          d[s] && (d[s].swiperSlideSize = T),
            f.push(T),
            n.centeredSlides
              ? ((w = w + T / 2 + E / 2 + y),
                0 === E && 0 !== s && (w = w - r / 2 - y),
                0 === s && (w = w - r / 2 - y),
                Math.abs(w) < 0.001 && (w = 0),
                n.roundLengths && (w = Math.floor(w)),
                x % n.slidesPerGroup == 0 && p.push(w),
                h.push(w))
              : (n.roundLengths && (w = Math.floor(w)),
                (x - Math.min(e.params.slidesPerGroupSkip, x)) %
                  e.params.slidesPerGroup ==
                  0 && p.push(w),
                h.push(w),
                (w = w + T + y)),
            (e.virtualSize += T + y),
            (E = T),
            (x += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, r) + v),
        o &&
          a &&
          ("slide" === n.effect || "coverflow" === n.effect) &&
          s.css({ width: `${e.virtualSize + n.spaceBetween}px` }),
        n.setWrapperSize &&
          s.css({ [t("width")]: `${e.virtualSize + n.spaceBetween}px` }),
        S && e.grid.updateWrapperSize(T, p, t),
        !n.centeredSlides)
      ) {
        const t = [];
        for (let i = 0; i < p.length; i += 1) {
          let s = p[i];
          n.roundLengths && (s = Math.floor(s)),
            p[i] <= e.virtualSize - r && t.push(s);
        }
        (p = t),
          Math.floor(e.virtualSize - r) - Math.floor(p[p.length - 1]) > 1 &&
            p.push(e.virtualSize - r);
      }
      if ((0 === p.length && (p = [0]), 0 !== n.spaceBetween)) {
        const i = e.isHorizontal() && o ? "marginLeft" : t("marginRight");
        d.filter((e, t) => !n.cssMode || t !== d.length - 1).css({
          [i]: `${y}px`,
        });
      }
      if (n.centeredSlides && n.centeredSlidesBounds) {
        let e = 0;
        f.forEach((t) => {
          e += t + (n.spaceBetween ? n.spaceBetween : 0);
        }),
          (e -= n.spaceBetween);
        const t = e - r;
        p = p.map((e) => (e < 0 ? -m : e > t ? t + v : e));
      }
      if (n.centerInsufficientSlides) {
        let e = 0;
        if (
          (f.forEach((t) => {
            e += t + (n.spaceBetween ? n.spaceBetween : 0);
          }),
          (e -= n.spaceBetween),
          e < r)
        ) {
          const t = (r - e) / 2;
          p.forEach((e, i) => {
            p[i] = e - t;
          }),
            h.forEach((e, i) => {
              h[i] = e + t;
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
        n.centeredSlides && n.cssMode && !n.centeredSlidesBounds)
      ) {
        z(e.wrapperEl, "--swiper-centered-offset-before", -p[0] + "px"),
          z(
            e.wrapperEl,
            "--swiper-centered-offset-after",
            e.size / 2 - f[f.length - 1] / 2 + "px"
          );
        const t = -e.snapGrid[0],
          i = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + i));
      }
      if (
        (u !== c && e.emit("slidesLengthChange"),
        p.length !== g &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        h.length !== b && e.emit("slidesGridLengthChange"),
        n.watchSlidesProgress && e.updateSlidesOffset(),
        !(l || n.cssMode || ("slide" !== n.effect && "fade" !== n.effect)))
      ) {
        const t = `${n.containerModifierClass}backface-hidden`,
          i = e.$el.hasClass(t);
        u <= n.maxBackfaceHiddenSlides
          ? i || e.$el.addClass(t)
          : i && e.$el.removeClass(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        i = [],
        n = t.virtual && t.params.virtual.enabled;
      let s,
        r = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const o = (e) =>
        n
          ? t.slides.filter(
              (t) =>
                parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
            )[0]
          : t.slides.eq(e)[0];
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          t.visibleSlides.each((e) => {
            i.push(e);
          });
        else
          for (s = 0; s < Math.ceil(t.params.slidesPerView); s += 1) {
            const e = t.activeIndex + s;
            if (e > t.slides.length && !n) break;
            i.push(o(e));
          }
      else i.push(o(t.activeIndex));
      for (s = 0; s < i.length; s += 1)
        if (void 0 !== i[s]) {
          const e = i[s].offsetHeight;
          r = e > r ? e : r;
        }
      (r || 0 === r) && t.$wrapperEl.css("height", `${r}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides;
      for (let i = 0; i < t.length; i += 1)
        t[i].swiperSlideOffset = e.isHorizontal()
          ? t[i].offsetLeft
          : t[i].offsetTop;
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this,
        i = t.params,
        { slides: n, rtlTranslate: s, snapGrid: r } = t;
      if (0 === n.length) return;
      void 0 === n[0].swiperSlideOffset && t.updateSlidesOffset();
      let o = -e;
      s && (o = e),
        n.removeClass(i.slideVisibleClass),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      for (let e = 0; e < n.length; e += 1) {
        const a = n[e];
        let l = a.swiperSlideOffset;
        i.cssMode && i.centeredSlides && (l -= n[0].swiperSlideOffset);
        const c =
            (o + (i.centeredSlides ? t.minTranslate() : 0) - l) /
            (a.swiperSlideSize + i.spaceBetween),
          d =
            (o - r[0] + (i.centeredSlides ? t.minTranslate() : 0) - l) /
            (a.swiperSlideSize + i.spaceBetween),
          u = -(o - l),
          p = u + t.slidesSizesGrid[e];
        ((u >= 0 && u < t.size - 1) ||
          (p > 1 && p <= t.size) ||
          (u <= 0 && p >= t.size)) &&
          (t.visibleSlides.push(a),
          t.visibleSlidesIndexes.push(e),
          n.eq(e).addClass(i.slideVisibleClass)),
          (a.progress = s ? -c : c),
          (a.originalProgress = s ? -d : d);
      }
      t.visibleSlides = L(t.visibleSlides);
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const i = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * i) || 0;
      }
      const i = t.params,
        n = t.maxTranslate() - t.minTranslate();
      let { progress: s, isBeginning: r, isEnd: o } = t;
      const a = r,
        l = o;
      0 === n
        ? ((s = 0), (r = !0), (o = !0))
        : ((s = (e - t.minTranslate()) / n), (r = s <= 0), (o = s >= 1)),
        Object.assign(t, { progress: s, isBeginning: r, isEnd: o }),
        (i.watchSlidesProgress || (i.centeredSlides && i.autoHeight)) &&
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
          params: i,
          $wrapperEl: n,
          activeIndex: s,
          realIndex: r,
        } = e,
        o = e.virtual && i.virtual.enabled;
      let a;
      t.removeClass(
        `${i.slideActiveClass} ${i.slideNextClass} ${i.slidePrevClass} ${i.slideDuplicateActiveClass} ${i.slideDuplicateNextClass} ${i.slideDuplicatePrevClass}`
      ),
        (a = o
          ? e.$wrapperEl.find(
              `.${i.slideClass}[data-swiper-slide-index="${s}"]`
            )
          : t.eq(s)),
        a.addClass(i.slideActiveClass),
        i.loop &&
          (a.hasClass(i.slideDuplicateClass)
            ? n
                .children(
                  `.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${r}"]`
                )
                .addClass(i.slideDuplicateActiveClass)
            : n
                .children(
                  `.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${r}"]`
                )
                .addClass(i.slideDuplicateActiveClass));
      let l = a.nextAll(`.${i.slideClass}`).eq(0).addClass(i.slideNextClass);
      i.loop && 0 === l.length && ((l = t.eq(0)), l.addClass(i.slideNextClass));
      let c = a.prevAll(`.${i.slideClass}`).eq(0).addClass(i.slidePrevClass);
      i.loop &&
        0 === c.length &&
        ((c = t.eq(-1)), c.addClass(i.slidePrevClass)),
        i.loop &&
          (l.hasClass(i.slideDuplicateClass)
            ? n
                .children(
                  `.${i.slideClass}:not(.${
                    i.slideDuplicateClass
                  })[data-swiper-slide-index="${l.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(i.slideDuplicateNextClass)
            : n
                .children(
                  `.${i.slideClass}.${
                    i.slideDuplicateClass
                  }[data-swiper-slide-index="${l.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(i.slideDuplicateNextClass),
          c.hasClass(i.slideDuplicateClass)
            ? n
                .children(
                  `.${i.slideClass}:not(.${
                    i.slideDuplicateClass
                  })[data-swiper-slide-index="${c.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(i.slideDuplicatePrevClass)
            : n
                .children(
                  `.${i.slideClass}.${
                    i.slideDuplicateClass
                  }[data-swiper-slide-index="${c.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(i.slideDuplicatePrevClass)),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        i = t.rtlTranslate ? t.translate : -t.translate,
        {
          slidesGrid: n,
          snapGrid: s,
          params: r,
          activeIndex: o,
          realIndex: a,
          snapIndex: l,
        } = t;
      let c,
        d = e;
      if (void 0 === d) {
        for (let e = 0; e < n.length; e += 1)
          void 0 !== n[e + 1]
            ? i >= n[e] && i < n[e + 1] - (n[e + 1] - n[e]) / 2
              ? (d = e)
              : i >= n[e] && i < n[e + 1] && (d = e + 1)
            : i >= n[e] && (d = e);
        r.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0);
      }
      if (s.indexOf(i) >= 0) c = s.indexOf(i);
      else {
        const e = Math.min(r.slidesPerGroupSkip, d);
        c = e + Math.floor((d - e) / r.slidesPerGroup);
      }
      if ((c >= s.length && (c = s.length - 1), d === o))
        return void (c !== l && ((t.snapIndex = c), t.emit("snapIndexChange")));
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
        (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
    },
    updateClickedSlide: function (e) {
      const t = this,
        i = t.params,
        n = L(e).closest(`.${i.slideClass}`)[0];
      let s,
        r = !1;
      if (n)
        for (let e = 0; e < t.slides.length; e += 1)
          if (t.slides[e] === n) {
            (r = !0), (s = e);
            break;
          }
      if (!n || !r)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = n),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              L(n).attr("data-swiper-slide-index"),
              10
            ))
          : (t.clickedIndex = s),
        i.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  const H = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      const { params: t, rtlTranslate: i, translate: n, $wrapperEl: s } = this;
      if (t.virtualTranslate) return i ? -n : n;
      if (t.cssMode) return n;
      let r = _(s[0], e);
      return i && (r = -r), r || 0;
    },
    setTranslate: function (e, t) {
      const i = this,
        {
          rtlTranslate: n,
          params: s,
          $wrapperEl: r,
          wrapperEl: o,
          progress: a,
        } = i;
      let l,
        c = 0,
        d = 0;
      i.isHorizontal() ? (c = n ? -e : e) : (d = e),
        s.roundLengths && ((c = Math.floor(c)), (d = Math.floor(d))),
        s.cssMode
          ? (o[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal()
              ? -c
              : -d)
          : s.virtualTranslate ||
            r.transform(`translate3d(${c}px, ${d}px, 0px)`),
        (i.previousTranslate = i.translate),
        (i.translate = i.isHorizontal() ? c : d);
      const u = i.maxTranslate() - i.minTranslate();
      (l = 0 === u ? 0 : (e - i.minTranslate()) / u),
        l !== a && i.updateProgress(e),
        i.emit("setTranslate", i.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e, t, i, n, s) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === i && (i = !0),
        void 0 === n && (n = !0);
      const r = this,
        { params: o, wrapperEl: a } = r;
      if (r.animating && o.preventInteractionOnTransition) return !1;
      const l = r.minTranslate(),
        c = r.maxTranslate();
      let d;
      if (
        ((d = n && e > l ? l : n && e < c ? c : e),
        r.updateProgress(d),
        o.cssMode)
      ) {
        const e = r.isHorizontal();
        if (0 === t) a[e ? "scrollLeft" : "scrollTop"] = -d;
        else {
          if (!r.support.smoothScroll)
            return (
              I({ swiper: r, targetPosition: -d, side: e ? "left" : "top" }), !0
            );
          a.scrollTo({ [e ? "left" : "top"]: -d, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (r.setTransition(0),
            r.setTranslate(d),
            i &&
              (r.emit("beforeTransitionStart", t, s), r.emit("transitionEnd")))
          : (r.setTransition(t),
            r.setTranslate(d),
            i &&
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
                    i && r.emit("transitionEnd"));
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
  function F(e) {
    let { swiper: t, runCallbacks: i, direction: n, step: s } = e;
    const { activeIndex: r, previousIndex: o } = t;
    let a = n;
    if (
      (a || (a = r > o ? "next" : r < o ? "prev" : "reset"),
      t.emit(`transition${s}`),
      i && r !== o)
    ) {
      if ("reset" === a) return void t.emit(`slideResetTransition${s}`);
      t.emit(`slideChangeTransition${s}`),
        "next" === a
          ? t.emit(`slideNextTransition${s}`)
          : t.emit(`slidePrevTransition${s}`);
    }
  }
  const V = {
    slideTo: function (e, t, i, n, s) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === i && (i = !0),
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
      if ((r.animating && a.preventInteractionOnTransition) || (!f && !n && !s))
        return !1;
      const m = Math.min(r.params.slidesPerGroupSkip, o);
      let v = m + Math.floor((o - m) / r.params.slidesPerGroup);
      v >= l.length && (v = l.length - 1),
        (u || a.initialSlide || 0) === (d || 0) &&
          i &&
          r.emit("beforeSlideChangeStart");
      const g = -l[v];
      if ((r.updateProgress(g), a.normalizeSlideIndex))
        for (let e = 0; e < c.length; e += 1) {
          const t = -Math.floor(100 * g),
            i = Math.floor(100 * c[e]),
            n = Math.floor(100 * c[e + 1]);
          void 0 !== c[e + 1]
            ? t >= i && t < n - (n - i) / 2
              ? (o = e)
              : t >= i && t < n && (o = e + 1)
            : t >= i && (o = e);
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
          "reset" !== b && (r.transitionStart(i, b), r.transitionEnd(i, b)),
          !1
        );
      if (a.cssMode) {
        const e = r.isHorizontal(),
          i = p ? g : -g;
        if (0 === t) {
          const t = r.virtual && r.params.virtual.enabled;
          t &&
            ((r.wrapperEl.style.scrollSnapType = "none"),
            (r._immediateVirtual = !0)),
            (h[e ? "scrollLeft" : "scrollTop"] = i),
            t &&
              requestAnimationFrame(() => {
                (r.wrapperEl.style.scrollSnapType = ""),
                  (r._swiperImmediateVirtual = !1);
              });
        } else {
          if (!r.support.smoothScroll)
            return (
              I({ swiper: r, targetPosition: i, side: e ? "left" : "top" }), !0
            );
          h.scrollTo({ [e ? "left" : "top"]: i, behavior: "smooth" });
        }
        return !0;
      }
      return (
        r.setTransition(t),
        r.setTranslate(g),
        r.updateActiveIndex(o),
        r.updateSlidesClasses(),
        r.emit("beforeTransitionStart", t, n),
        r.transitionStart(i, b),
        0 === t
          ? r.transitionEnd(i, b)
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
                  r.transitionEnd(i, b));
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
    slideToLoop: function (e, t, i, n) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === i && (i = !0);
      const s = this;
      let r = e;
      return s.params.loop && (r += s.loopedSlides), s.slideTo(r, t, i, n);
    },
    slideNext: function (e, t, i) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const n = this,
        { animating: s, enabled: r, params: o } = n;
      if (!r) return n;
      let a = o.slidesPerGroup;
      "auto" === o.slidesPerView &&
        1 === o.slidesPerGroup &&
        o.slidesPerGroupAuto &&
        (a = Math.max(n.slidesPerViewDynamic("current", !0), 1));
      const l = n.activeIndex < o.slidesPerGroupSkip ? 1 : a;
      if (o.loop) {
        if (s && o.loopPreventsSlide) return !1;
        n.loopFix(), (n._clientLeft = n.$wrapperEl[0].clientLeft);
      }
      return o.rewind && n.isEnd
        ? n.slideTo(0, e, t, i)
        : n.slideTo(n.activeIndex + l, e, t, i);
    },
    slidePrev: function (e, t, i) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const n = this,
        {
          params: s,
          animating: r,
          snapGrid: o,
          slidesGrid: a,
          rtlTranslate: l,
          enabled: c,
        } = n;
      if (!c) return n;
      if (s.loop) {
        if (r && s.loopPreventsSlide) return !1;
        n.loopFix(), (n._clientLeft = n.$wrapperEl[0].clientLeft);
      }
      function d(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const u = d(l ? n.translate : -n.translate),
        p = o.map((e) => d(e));
      let h = o[p.indexOf(u) - 1];
      if (void 0 === h && s.cssMode) {
        let e;
        o.forEach((t, i) => {
          u >= t && (e = i);
        }),
          void 0 !== e && (h = o[e > 0 ? e - 1 : e]);
      }
      let f = 0;
      if (
        (void 0 !== h &&
          ((f = a.indexOf(h)),
          f < 0 && (f = n.activeIndex - 1),
          "auto" === s.slidesPerView &&
            1 === s.slidesPerGroup &&
            s.slidesPerGroupAuto &&
            ((f = f - n.slidesPerViewDynamic("previous", !0) + 1),
            (f = Math.max(f, 0)))),
        s.rewind && n.isBeginning)
      ) {
        const s =
          n.params.virtual && n.params.virtual.enabled && n.virtual
            ? n.virtual.slides.length - 1
            : n.slides.length - 1;
        return n.slideTo(s, e, t, i);
      }
      return n.slideTo(f, e, t, i);
    },
    slideReset: function (e, t, i) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, i)
      );
    },
    slideToClosest: function (e, t, i, n) {
      void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        void 0 === n && (n = 0.5);
      const s = this;
      let r = s.activeIndex;
      const o = Math.min(s.params.slidesPerGroupSkip, r),
        a = o + Math.floor((r - o) / s.params.slidesPerGroup),
        l = s.rtlTranslate ? s.translate : -s.translate;
      if (l >= s.snapGrid[a]) {
        const e = s.snapGrid[a];
        l - e > (s.snapGrid[a + 1] - e) * n && (r += s.params.slidesPerGroup);
      } else {
        const e = s.snapGrid[a - 1];
        l - e <= (s.snapGrid[a] - e) * n && (r -= s.params.slidesPerGroup);
      }
      return (
        (r = Math.max(r, 0)),
        (r = Math.min(r, s.slidesGrid.length - 1)),
        s.slideTo(r, e, t, i)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, $wrapperEl: i } = e,
        n =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let s,
        r = e.clickedIndex;
      if (t.loop) {
        if (e.animating) return;
        (s = parseInt(L(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
          t.centeredSlides
            ? r < e.loopedSlides - n / 2 ||
              r > e.slides.length - e.loopedSlides + n / 2
              ? (e.loopFix(),
                (r = i
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${s}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                k(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r)
            : r > e.slides.length - n
            ? (e.loopFix(),
              (r = i
                .children(
                  `.${t.slideClass}[data-swiper-slide-index="${s}"]:not(.${t.slideDuplicateClass})`
                )
                .eq(0)
                .index()),
              k(() => {
                e.slideTo(r);
              }))
            : e.slideTo(r);
      } else e.slideTo(r);
    },
  };
  const X = {
    loopCreate: function () {
      const e = this,
        t = g(),
        { params: i, $wrapperEl: n } = e,
        s = n.children().length > 0 ? L(n.children()[0].parentNode) : n;
      s.children(`.${i.slideClass}.${i.slideDuplicateClass}`).remove();
      let r = s.children(`.${i.slideClass}`);
      if (i.loopFillGroupWithBlank) {
        const e = i.slidesPerGroup - (r.length % i.slidesPerGroup);
        if (e !== i.slidesPerGroup) {
          for (let n = 0; n < e; n += 1) {
            const e = L(t.createElement("div")).addClass(
              `${i.slideClass} ${i.slideBlankClass}`
            );
            s.append(e);
          }
          r = s.children(`.${i.slideClass}`);
        }
      }
      "auto" !== i.slidesPerView ||
        i.loopedSlides ||
        (i.loopedSlides = r.length),
        (e.loopedSlides = Math.ceil(
          parseFloat(i.loopedSlides || i.slidesPerView, 10)
        )),
        (e.loopedSlides += i.loopAdditionalSlides),
        e.loopedSlides > r.length && (e.loopedSlides = r.length);
      const o = [],
        a = [];
      r.each((t, i) => {
        const n = L(t);
        i < e.loopedSlides && a.push(t),
          i < r.length && i >= r.length - e.loopedSlides && o.push(t),
          n.attr("data-swiper-slide-index", i);
      });
      for (let e = 0; e < a.length; e += 1)
        s.append(L(a[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
      for (let e = o.length - 1; e >= 0; e -= 1)
        s.prepend(L(o[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
    },
    loopFix: function () {
      const e = this;
      e.emit("beforeLoopFix");
      const {
        activeIndex: t,
        slides: i,
        loopedSlides: n,
        allowSlidePrev: s,
        allowSlideNext: r,
        snapGrid: o,
        rtlTranslate: a,
      } = e;
      let l;
      (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
      const c = -o[t] - e.getTranslate();
      if (t < n) {
        (l = i.length - 3 * n + t), (l += n);
        e.slideTo(l, 0, !1, !0) &&
          0 !== c &&
          e.setTranslate((a ? -e.translate : e.translate) - c);
      } else if (t >= i.length - n) {
        (l = -i.length + t + n), (l += n);
        e.slideTo(l, 0, !1, !0) &&
          0 !== c &&
          e.setTranslate((a ? -e.translate : e.translate) - c);
      }
      (e.allowSlidePrev = s), (e.allowSlideNext = r), e.emit("loopFix");
    },
    loopDestroy: function () {
      const { $wrapperEl: e, params: t, slides: i } = this;
      e
        .children(
          `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
        )
        .remove(),
        i.removeAttr("data-swiper-slide-index");
    },
  };
  function Y(e) {
    const t = this,
      i = g(),
      n = y(),
      s = t.touchEventsData,
      { params: r, touches: o, enabled: a } = t;
    if (!a) return;
    if (t.animating && r.preventInteractionOnTransition) return;
    !t.animating && r.cssMode && r.loop && t.loopFix();
    let l = e;
    l.originalEvent && (l = l.originalEvent);
    let c = L(l.target);
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
      (c = L(e.path[0]));
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
              (function t(i) {
                return i && i !== g() && i !== y()
                  ? (i.assignedSlot && (i = i.assignedSlot),
                    i.closest(e) || t(i.getRootNode().host))
                  : null;
              })(t)
            );
          })(d, l.target)
        : c.closest(d)[0])
    )
      return void (t.allowClick = !0);
    if (r.swipeHandler && !c.closest(r.swipeHandler)[0]) return;
    (o.currentX = "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX),
      (o.currentY =
        "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY);
    const p = o.currentX,
      h = o.currentY,
      f = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
      m = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
    if (f && (p <= m || p >= n.innerWidth - m)) {
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
        i.activeElement &&
          L(i.activeElement).is(s.focusableElements) &&
          i.activeElement !== c[0] &&
          i.activeElement.blur();
      const n = e && t.allowTouchMove && r.touchStartPreventDefault;
      (!r.touchStartForcePreventDefault && !n) ||
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
  function U(e) {
    const t = g(),
      i = this,
      n = i.touchEventsData,
      { params: s, touches: r, rtlTranslate: o, enabled: a } = i;
    if (!a) return;
    let l = e;
    if ((l.originalEvent && (l = l.originalEvent), !n.isTouched))
      return void (
        n.startMoving &&
        n.isScrolling &&
        i.emit("touchMoveOpposite", l)
      );
    if (n.isTouchEvent && "touchmove" !== l.type) return;
    const c =
        "touchmove" === l.type &&
        l.targetTouches &&
        (l.targetTouches[0] || l.changedTouches[0]),
      d = "touchmove" === l.type ? c.pageX : l.pageX,
      u = "touchmove" === l.type ? c.pageY : l.pageY;
    if (l.preventedByNestedSwiper) return (r.startX = d), void (r.startY = u);
    if (!i.allowTouchMove)
      return (
        L(l.target).is(n.focusableElements) || (i.allowClick = !1),
        void (
          n.isTouched &&
          (Object.assign(r, { startX: d, startY: u, currentX: d, currentY: u }),
          (n.touchStartTime = A()))
        )
      );
    if (n.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
      if (i.isVertical()) {
        if (
          (u < r.startY && i.translate <= i.maxTranslate()) ||
          (u > r.startY && i.translate >= i.minTranslate())
        )
          return (n.isTouched = !1), void (n.isMoved = !1);
      } else if (
        (d < r.startX && i.translate <= i.maxTranslate()) ||
        (d > r.startX && i.translate >= i.minTranslate())
      )
        return;
    if (
      n.isTouchEvent &&
      t.activeElement &&
      l.target === t.activeElement &&
      L(l.target).is(n.focusableElements)
    )
      return (n.isMoved = !0), void (i.allowClick = !1);
    if (
      (n.allowTouchCallbacks && i.emit("touchMove", l),
      l.targetTouches && l.targetTouches.length > 1)
    )
      return;
    (r.currentX = d), (r.currentY = u);
    const p = r.currentX - r.startX,
      h = r.currentY - r.startY;
    if (i.params.threshold && Math.sqrt(p ** 2 + h ** 2) < i.params.threshold)
      return;
    if (void 0 === n.isScrolling) {
      let e;
      (i.isHorizontal() && r.currentY === r.startY) ||
      (i.isVertical() && r.currentX === r.startX)
        ? (n.isScrolling = !1)
        : p * p + h * h >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(h), Math.abs(p))) / Math.PI),
          (n.isScrolling = i.isHorizontal()
            ? e > s.touchAngle
            : 90 - e > s.touchAngle));
    }
    if (
      (n.isScrolling && i.emit("touchMoveOpposite", l),
      void 0 === n.startMoving &&
        ((r.currentX === r.startX && r.currentY === r.startY) ||
          (n.startMoving = !0)),
      n.isScrolling)
    )
      return void (n.isTouched = !1);
    if (!n.startMoving) return;
    (i.allowClick = !1),
      !s.cssMode && l.cancelable && l.preventDefault(),
      s.touchMoveStopPropagation && !s.nested && l.stopPropagation(),
      n.isMoved ||
        (s.loop && !s.cssMode && i.loopFix(),
        (n.startTranslate = i.getTranslate()),
        i.setTransition(0),
        i.animating &&
          i.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
        (n.allowMomentumBounce = !1),
        !s.grabCursor ||
          (!0 !== i.allowSlideNext && !0 !== i.allowSlidePrev) ||
          i.setGrabCursor(!0),
        i.emit("sliderFirstMove", l)),
      i.emit("sliderMove", l),
      (n.isMoved = !0);
    let f = i.isHorizontal() ? p : h;
    (r.diff = f),
      (f *= s.touchRatio),
      o && (f = -f),
      (i.swipeDirection = f > 0 ? "prev" : "next"),
      (n.currentTranslate = f + n.startTranslate);
    let m = !0,
      v = s.resistanceRatio;
    if (
      (s.touchReleaseOnEdges && (v = 0),
      f > 0 && n.currentTranslate > i.minTranslate()
        ? ((m = !1),
          s.resistance &&
            (n.currentTranslate =
              i.minTranslate() -
              1 +
              (-i.minTranslate() + n.startTranslate + f) ** v))
        : f < 0 &&
          n.currentTranslate < i.maxTranslate() &&
          ((m = !1),
          s.resistance &&
            (n.currentTranslate =
              i.maxTranslate() +
              1 -
              (i.maxTranslate() - n.startTranslate - f) ** v)),
      m && (l.preventedByNestedSwiper = !0),
      !i.allowSlideNext &&
        "next" === i.swipeDirection &&
        n.currentTranslate < n.startTranslate &&
        (n.currentTranslate = n.startTranslate),
      !i.allowSlidePrev &&
        "prev" === i.swipeDirection &&
        n.currentTranslate > n.startTranslate &&
        (n.currentTranslate = n.startTranslate),
      i.allowSlidePrev ||
        i.allowSlideNext ||
        (n.currentTranslate = n.startTranslate),
      s.threshold > 0)
    ) {
      if (!(Math.abs(f) > s.threshold || n.allowThresholdMove))
        return void (n.currentTranslate = n.startTranslate);
      if (!n.allowThresholdMove)
        return (
          (n.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (n.currentTranslate = n.startTranslate),
          void (r.diff = i.isHorizontal()
            ? r.currentX - r.startX
            : r.currentY - r.startY)
        );
    }
    s.followFinger &&
      !s.cssMode &&
      (((s.freeMode && s.freeMode.enabled && i.freeMode) ||
        s.watchSlidesProgress) &&
        (i.updateActiveIndex(), i.updateSlidesClasses()),
      i.params.freeMode &&
        s.freeMode.enabled &&
        i.freeMode &&
        i.freeMode.onTouchMove(),
      i.updateProgress(n.currentTranslate),
      i.setTranslate(n.currentTranslate));
  }
  function Q(e) {
    const t = this,
      i = t.touchEventsData,
      { params: n, touches: s, rtlTranslate: r, slidesGrid: o, enabled: a } = t;
    if (!a) return;
    let l = e;
    if (
      (l.originalEvent && (l = l.originalEvent),
      i.allowTouchCallbacks && t.emit("touchEnd", l),
      (i.allowTouchCallbacks = !1),
      !i.isTouched)
    )
      return (
        i.isMoved && n.grabCursor && t.setGrabCursor(!1),
        (i.isMoved = !1),
        void (i.startMoving = !1)
      );
    n.grabCursor &&
      i.isMoved &&
      i.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const c = A(),
      d = c - i.touchStartTime;
    if (t.allowClick) {
      const e = l.path || (l.composedPath && l.composedPath());
      t.updateClickedSlide((e && e[0]) || l.target),
        t.emit("tap click", l),
        d < 300 &&
          c - i.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", l);
    }
    if (
      ((i.lastClickTime = A()),
      k(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !i.isTouched ||
        !i.isMoved ||
        !t.swipeDirection ||
        0 === s.diff ||
        i.currentTranslate === i.startTranslate)
    )
      return (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1);
    let u;
    if (
      ((i.isTouched = !1),
      (i.isMoved = !1),
      (i.startMoving = !1),
      (u = n.followFinger
        ? r
          ? t.translate
          : -t.translate
        : -i.currentTranslate),
      n.cssMode)
    )
      return;
    if (t.params.freeMode && n.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: u });
    let p = 0,
      h = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < o.length;
      e += e < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup
    ) {
      const t = e < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
      void 0 !== o[e + t]
        ? u >= o[e] && u < o[e + t] && ((p = e), (h = o[e + t] - o[e]))
        : u >= o[e] && ((p = e), (h = o[o.length - 1] - o[o.length - 2]));
    }
    let f = null,
      m = null;
    n.rewind &&
      (t.isBeginning
        ? (m =
            t.params.virtual && t.params.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (f = 0));
    const v = (u - o[p]) / h,
      g = p < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
    if (d > n.longSwipesMs) {
      if (!n.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (v >= n.longSwipesRatio
          ? t.slideTo(n.rewind && t.isEnd ? f : p + g)
          : t.slideTo(p)),
        "prev" === t.swipeDirection &&
          (v > 1 - n.longSwipesRatio
            ? t.slideTo(p + g)
            : null !== m && v < 0 && Math.abs(v) > n.longSwipesRatio
            ? t.slideTo(m)
            : t.slideTo(p));
    } else {
      if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl)
        ? l.target === t.navigation.nextEl
          ? t.slideTo(p + g)
          : t.slideTo(p)
        : ("next" === t.swipeDirection && t.slideTo(null !== f ? f : p + g),
          "prev" === t.swipeDirection && t.slideTo(null !== m ? m : p));
    }
  }
  function K() {
    const e = this,
      { params: t, el: i } = e;
    if (i && 0 === i.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: n, allowSlidePrev: s, snapGrid: r } = e;
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
      e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
      (e.allowSlidePrev = s),
      (e.allowSlideNext = n),
      e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
  }
  function J(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function Z() {
    const e = this,
      { wrapperEl: t, rtlTranslate: i, enabled: n } = e;
    if (!n) return;
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
      s !== e.progress && e.updateProgress(i ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  let ee = !1;
  function te() {}
  const ie = (e, t) => {
    const i = g(),
      {
        params: n,
        touchEvents: s,
        el: r,
        wrapperEl: o,
        device: a,
        support: l,
      } = e,
      c = !!n.nested,
      d = "on" === t ? "addEventListener" : "removeEventListener",
      u = t;
    if (l.touch) {
      const t = !(
        "touchstart" !== s.start ||
        !l.passiveListener ||
        !n.passiveListeners
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
        i[d](s.move, e.onTouchMove, c),
        i[d](s.end, e.onTouchEnd, !1);
    (n.preventClicks || n.preventClicksPropagation) &&
      r[d]("click", e.onClick, !0),
      n.cssMode && o[d]("scroll", e.onScroll),
      n.updateOnWindowResize
        ? e[u](
            a.ios || a.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            K,
            !0
          )
        : e[u]("observerUpdate", K, !0);
  };
  const ne = {
      attachEvents: function () {
        const e = this,
          t = g(),
          { params: i, support: n } = e;
        (e.onTouchStart = Y.bind(e)),
          (e.onTouchMove = U.bind(e)),
          (e.onTouchEnd = Q.bind(e)),
          i.cssMode && (e.onScroll = Z.bind(e)),
          (e.onClick = J.bind(e)),
          n.touch && !ee && (t.addEventListener("touchstart", te), (ee = !0)),
          ie(e, "on");
      },
      detachEvents: function () {
        ie(this, "off");
      },
    },
    se = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  const re = {
    setBreakpoint: function () {
      const e = this,
        {
          activeIndex: t,
          initialized: i,
          loopedSlides: n = 0,
          params: s,
          $el: r,
        } = e,
        o = s.breakpoints;
      if (!o || (o && 0 === Object.keys(o).length)) return;
      const a = e.getBreakpoint(o, e.params.breakpointsBase, e.el);
      if (!a || e.currentBreakpoint === a) return;
      const l = (a in o ? o[a] : void 0) || e.originalParams,
        c = se(e, s),
        d = se(e, l),
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
      p && i && e.changeDirection(), $(e.params, l);
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
          i &&
          (e.loopDestroy(),
          e.loopCreate(),
          e.updateSlides(),
          e.slideTo(t - n + e.loopedSlides, 0, !1)),
        e.emit("breakpoint", l);
    },
    getBreakpoint: function (e, t, i) {
      if ((void 0 === t && (t = "window"), !e || ("container" === t && !i)))
        return;
      let n = !1;
      const s = y(),
        r = "window" === t ? s.innerHeight : i.clientHeight,
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
          ? s.matchMedia(`(min-width: ${a}px)`).matches && (n = r)
          : a <= i.clientWidth && (n = r);
      }
      return n || "max";
    },
  };
  const oe = {
    addClasses: function () {
      const e = this,
        { classNames: t, params: i, rtl: n, $el: s, device: r, support: o } = e,
        a = (function (e, t) {
          const i = [];
          return (
            e.forEach((e) => {
              "object" == typeof e
                ? Object.keys(e).forEach((n) => {
                    e[n] && i.push(t + n);
                  })
                : "string" == typeof e && i.push(t + e);
            }),
            i
          );
        })(
          [
            "initialized",
            i.direction,
            { "pointer-events": !o.touch },
            { "free-mode": e.params.freeMode && i.freeMode.enabled },
            { autoheight: i.autoHeight },
            { rtl: n },
            { grid: i.grid && i.grid.rows > 1 },
            {
              "grid-column":
                i.grid && i.grid.rows > 1 && "column" === i.grid.fill,
            },
            { android: r.android },
            { ios: r.ios },
            { "css-mode": i.cssMode },
            { centered: i.cssMode && i.centeredSlides },
          ],
          i.containerModifierClass
        );
      t.push(...a), s.addClass([...t].join(" ")), e.emitContainerClasses();
    },
    removeClasses: function () {
      const { $el: e, classNames: t } = this;
      e.removeClass(t.join(" ")), this.emitContainerClasses();
    },
  };
  const ae = {
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
    focusableElements: "input, select, option, textarea, button, video, label",
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
  function le(e, t) {
    return function (i) {
      void 0 === i && (i = {});
      const n = Object.keys(i)[0],
        s = i[n];
      "object" == typeof s && null !== s
        ? (["navigation", "pagination", "scrollbar"].indexOf(n) >= 0 &&
            !0 === e[n] &&
            (e[n] = { auto: !0 }),
          n in e && "enabled" in s
            ? (!0 === e[n] && (e[n] = { enabled: !0 }),
              "object" != typeof e[n] ||
                "enabled" in e[n] ||
                (e[n].enabled = !0),
              e[n] || (e[n] = { enabled: !1 }),
              $(t, i))
            : $(t, i))
        : $(t, i);
    };
  }
  const ce = {
      eventsEmitter: q,
      update: G,
      translate: H,
      transition: {
        setTransition: function (e, t) {
          const i = this;
          i.params.cssMode || i.$wrapperEl.transition(e),
            i.emit("setTransition", e, t);
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          const i = this,
            { params: n } = i;
          n.cssMode ||
            (n.autoHeight && i.updateAutoHeight(),
            F({ swiper: i, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          const i = this,
            { params: n } = i;
          (i.animating = !1),
            n.cssMode ||
              (i.setTransition(0),
              F({ swiper: i, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: V,
      loop: X,
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
          const i =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          (i.style.cursor = "move"), (i.style.cursor = e ? "grabbing" : "grab");
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
      events: ne,
      breakpoints: re,
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: i } = e,
            { slidesOffsetBefore: n } = i;
          if (n) {
            const t = e.slides.length - 1,
              i = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * n;
            e.isLocked = e.size > i;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === i.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === i.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: oe,
      images: {
        loadImage: function (e, t, i, n, s, r) {
          const o = y();
          let a;
          function l() {
            r && r();
          }
          L(e).parent("picture")[0] || (e.complete && s)
            ? l()
            : t
            ? ((a = new o.Image()),
              (a.onload = l),
              (a.onerror = l),
              n && (a.sizes = n),
              i && (a.srcset = i),
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
          for (let i = 0; i < e.imagesToLoad.length; i += 1) {
            const n = e.imagesToLoad[i];
            e.loadImage(
              n,
              n.currentSrc || n.getAttribute("src"),
              n.srcset || n.getAttribute("srcset"),
              n.sizes || n.getAttribute("sizes"),
              !0,
              t
            );
          }
        },
      },
    },
    de = {};
  class ue {
    constructor() {
      let e, t;
      for (var i = arguments.length, n = new Array(i), s = 0; s < i; s++)
        n[s] = arguments[s];
      if (
        (1 === n.length &&
        n[0].constructor &&
        "Object" === Object.prototype.toString.call(n[0]).slice(8, -1)
          ? (t = n[0])
          : ([e, t] = n),
        t || (t = {}),
        (t = $({}, t)),
        e && !t.el && (t.el = e),
        t.el && L(t.el).length > 1)
      ) {
        const e = [];
        return (
          L(t.el).each((i) => {
            const n = $({}, t, { el: i });
            e.push(new ue(n));
          }),
          e
        );
      }
      const r = this;
      (r.__swiper__ = !0),
        (r.support = D()),
        (r.device = j({ userAgent: t.userAgent })),
        (r.browser = R()),
        (r.eventsListeners = {}),
        (r.eventsAnyListeners = []),
        (r.modules = [...r.__modules__]),
        t.modules && Array.isArray(t.modules) && r.modules.push(...t.modules);
      const o = {};
      r.modules.forEach((e) => {
        e({
          swiper: r,
          extendParams: le(t, o),
          on: r.on.bind(r),
          once: r.once.bind(r),
          off: r.off.bind(r),
          emit: r.emit.bind(r),
        });
      });
      const a = $({}, ae, o);
      return (
        (r.params = $({}, a, de, t)),
        (r.originalParams = $({}, r.params)),
        (r.passedParams = $({}, t)),
        r.params &&
          r.params.on &&
          Object.keys(r.params.on).forEach((e) => {
            r.on(e, r.params.on[e]);
          }),
        r.params && r.params.onAny && r.onAny(r.params.onAny),
        (r.$ = L),
        Object.assign(r, {
          enabled: r.params.enabled,
          el: e,
          classNames: [],
          slides: L(),
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
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
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
      const i = this;
      e = Math.min(Math.max(e, 0), 1);
      const n = i.minTranslate(),
        s = (i.maxTranslate() - n) * e + n;
      i.translateTo(s, void 0 === t ? 0 : t),
        i.updateActiveIndex(),
        i.updateSlidesClasses();
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
      e.slides.each((i) => {
        const n = e.getSlideClasses(i);
        t.push({ slideEl: i, classNames: n }), e.emit("_slideClass", i, n);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = "current"), void 0 === t && (t = !1);
      const {
        params: i,
        slides: n,
        slidesGrid: s,
        slidesSizesGrid: r,
        size: o,
        activeIndex: a,
      } = this;
      let l = 1;
      if (i.centeredSlides) {
        let e,
          t = n[a].swiperSlideSize;
        for (let i = a + 1; i < n.length; i += 1)
          n[i] &&
            !e &&
            ((t += n[i].swiperSlideSize), (l += 1), t > o && (e = !0));
        for (let i = a - 1; i >= 0; i -= 1)
          n[i] &&
            !e &&
            ((t += n[i].swiperSlideSize), (l += 1), t > o && (e = !0));
      } else if ("current" === e)
        for (let e = a + 1; e < n.length; e += 1) {
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
      const { snapGrid: t, params: i } = e;
      function n() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let s;
      i.breakpoints && e.setBreakpoint(),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        e.params.freeMode && e.params.freeMode.enabled
          ? (n(), e.params.autoHeight && e.updateAutoHeight())
          : ((s =
              ("auto" === e.params.slidesPerView ||
                e.params.slidesPerView > 1) &&
              e.isEnd &&
              !e.params.centeredSlides
                ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0)),
            s || n()),
        i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      const i = this,
        n = i.params.direction;
      return (
        e || (e = "horizontal" === n ? "vertical" : "horizontal"),
        e === n ||
          ("horizontal" !== e && "vertical" !== e) ||
          (i.$el
            .removeClass(`${i.params.containerModifierClass}${n}`)
            .addClass(`${i.params.containerModifierClass}${e}`),
          i.emitContainerClasses(),
          (i.params.direction = e),
          i.slides.each((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          i.emit("changeDirection"),
          t && i.update()),
        i
      );
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      const i = L(e || t.params.el);
      if (!(e = i[0])) return !1;
      e.swiper = t;
      const n = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let s = (() => {
        if (e && e.shadowRoot && e.shadowRoot.querySelector) {
          const t = L(e.shadowRoot.querySelector(n()));
          return (t.children = (e) => i.children(e)), t;
        }
        return i.children(n());
      })();
      if (0 === s.length && t.params.createElements) {
        const e = g().createElement("div");
        (s = L(e)),
          (e.className = t.params.wrapperClass),
          i.append(e),
          i.children(`.${t.params.slideClass}`).each((e) => {
            s.append(e);
          });
      }
      return (
        Object.assign(t, {
          $el: i,
          el: e,
          $wrapperEl: s,
          wrapperEl: s[0],
          mounted: !0,
          rtl: "rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction")),
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
      const i = this,
        { params: n, $el: s, $wrapperEl: r, slides: o } = i;
      return (
        void 0 === i.params ||
          i.destroyed ||
          (i.emit("beforeDestroy"),
          (i.initialized = !1),
          i.detachEvents(),
          n.loop && i.loopDestroy(),
          t &&
            (i.removeClasses(),
            s.removeAttr("style"),
            r.removeAttr("style"),
            o &&
              o.length &&
              o
                .removeClass(
                  [
                    n.slideVisibleClass,
                    n.slideActiveClass,
                    n.slideNextClass,
                    n.slidePrevClass,
                  ].join(" ")
                )
                .removeAttr("style")
                .removeAttr("data-swiper-slide-index")),
          i.emit("destroy"),
          Object.keys(i.eventsListeners).forEach((e) => {
            i.off(e);
          }),
          !1 !== e &&
            ((i.$el[0].swiper = null),
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
            })(i)),
          (i.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      $(de, e);
    }
    static get extendedDefaults() {
      return de;
    }
    static get defaults() {
      return ae;
    }
    static installModule(e) {
      ue.prototype.__modules__ || (ue.prototype.__modules__ = []);
      const t = ue.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => ue.installModule(e)), ue)
        : (ue.installModule(e), ue);
    }
  }
  Object.keys(ce).forEach((e) => {
    Object.keys(ce[e]).forEach((t) => {
      ue.prototype[t] = ce[e][t];
    });
  }),
    ue.use([
      function (e) {
        let { swiper: t, on: i, emit: n } = e;
        const s = y();
        let r = null,
          o = null;
        const a = () => {
            t &&
              !t.destroyed &&
              t.initialized &&
              (n("beforeResize"), n("resize"));
          },
          l = () => {
            t && !t.destroyed && t.initialized && n("orientationchange");
          };
        i("init", () => {
          t.params.resizeObserver && void 0 !== s.ResizeObserver
            ? t &&
              !t.destroyed &&
              t.initialized &&
              ((r = new ResizeObserver((e) => {
                o = s.requestAnimationFrame(() => {
                  const { width: i, height: n } = t;
                  let s = i,
                    r = n;
                  e.forEach((e) => {
                    let { contentBoxSize: i, contentRect: n, target: o } = e;
                    (o && o !== t.el) ||
                      ((s = n ? n.width : (i[0] || i).inlineSize),
                      (r = n ? n.height : (i[0] || i).blockSize));
                  }),
                    (s === i && r === n) || a();
                });
              })),
              r.observe(t.el))
            : (s.addEventListener("resize", a),
              s.addEventListener("orientationchange", l));
        }),
          i("destroy", () => {
            o && s.cancelAnimationFrame(o),
              r && r.unobserve && t.el && (r.unobserve(t.el), (r = null)),
              s.removeEventListener("resize", a),
              s.removeEventListener("orientationchange", l);
          });
      },
      function (e) {
        let { swiper: t, extendParams: i, on: n, emit: s } = e;
        const r = [],
          o = y(),
          a = function (e, t) {
            void 0 === t && (t = {});
            const i = new (o.MutationObserver || o.WebkitMutationObserver)(
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
            i.observe(e, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData,
            }),
              r.push(i);
          };
        i({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          n("init", () => {
            if (t.params.observer) {
              if (t.params.observeParents) {
                const e = t.$el.parents();
                for (let t = 0; t < e.length; t += 1) a(e[t]);
              }
              a(t.$el[0], { childList: t.params.observeSlideChildren }),
                a(t.$wrapperEl[0], { attributes: !1 });
            }
          }),
          n("destroy", () => {
            r.forEach((e) => {
              e.disconnect();
            }),
              r.splice(0, r.length);
          });
      },
    ]);
  const pe = ue;
  function he(e, t, i, n) {
    const s = g();
    return (
      e.params.createElements &&
        Object.keys(n).forEach((r) => {
          if (!i[r] && !0 === i.auto) {
            let o = e.$el.children(`.${n[r]}`)[0];
            o ||
              ((o = s.createElement("div")),
              (o.className = n[r]),
              e.$el.append(o)),
              (i[r] = o),
              (t[r] = o);
          }
        }),
      i
    );
  }
  function fe(e) {
    let { swiper: t, extendParams: i, on: n, emit: s } = e;
    function r(e) {
      let i;
      return (
        e &&
          ((i = L(e)),
          t.params.uniqueNavElements &&
            "string" == typeof e &&
            i.length > 1 &&
            1 === t.$el.find(e).length &&
            (i = t.$el.find(e))),
        i
      );
    }
    function o(e, i) {
      const n = t.params.navigation;
      e &&
        e.length > 0 &&
        (e[i ? "addClass" : "removeClass"](n.disabledClass),
        e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = i),
        t.params.watchOverflow &&
          t.enabled &&
          e[t.isLocked ? "addClass" : "removeClass"](n.lockClass));
    }
    function a() {
      if (t.params.loop) return;
      const { $nextEl: e, $prevEl: i } = t.navigation;
      o(i, t.isBeginning && !t.params.rewind),
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
        ((t.params.navigation = he(
          t,
          t.originalParams.navigation,
          t.params.navigation,
          { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
        )),
        !e.nextEl && !e.prevEl)
      )
        return;
      const i = r(e.nextEl),
        n = r(e.prevEl);
      i && i.length > 0 && i.on("click", c),
        n && n.length > 0 && n.on("click", l),
        Object.assign(t.navigation, {
          $nextEl: i,
          nextEl: i && i[0],
          $prevEl: n,
          prevEl: n && n[0],
        }),
        t.enabled ||
          (i && i.addClass(e.lockClass), n && n.addClass(e.lockClass));
    }
    function u() {
      const { $nextEl: e, $prevEl: i } = t.navigation;
      e &&
        e.length &&
        (e.off("click", c), e.removeClass(t.params.navigation.disabledClass)),
        i &&
          i.length &&
          (i.off("click", l), i.removeClass(t.params.navigation.disabledClass));
    }
    i({
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
      n("init", () => {
        d(), a();
      }),
      n("toEdge fromEdge lock unlock", () => {
        a();
      }),
      n("destroy", () => {
        u();
      }),
      n("enable disable", () => {
        const { $nextEl: e, $prevEl: i } = t.navigation;
        e &&
          e[t.enabled ? "removeClass" : "addClass"](
            t.params.navigation.lockClass
          ),
          i &&
            i[t.enabled ? "removeClass" : "addClass"](
              t.params.navigation.lockClass
            );
      }),
      n("click", (e, i) => {
        const { $nextEl: n, $prevEl: r } = t.navigation,
          o = i.target;
        if (t.params.navigation.hideOnClick && !L(o).is(r) && !L(o).is(n)) {
          if (
            t.pagination &&
            t.params.pagination &&
            t.params.pagination.clickable &&
            (t.pagination.el === o || t.pagination.el.contains(o))
          )
            return;
          let e;
          n
            ? (e = n.hasClass(t.params.navigation.hiddenClass))
            : r && (e = r.hasClass(t.params.navigation.hiddenClass)),
            s(!0 === e ? "navigationShow" : "navigationHide"),
            n && n.toggleClass(t.params.navigation.hiddenClass),
            r && r.toggleClass(t.params.navigation.hiddenClass);
        }
      }),
      Object.assign(t.navigation, { update: a, init: d, destroy: u });
  }
  function me(e) {
    return (
      void 0 === e && (e = ""),
      `.${e
        .trim()
        .replace(/([\.:!\/])/g, "\\$1")
        .replace(/ /g, ".")}`
    );
  }
  function ve(e) {
    let { swiper: t, extendParams: i, on: n, emit: s } = e;
    const r = "swiper-pagination";
    let o;
    i({
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
    function c(e, i) {
      const { bulletActiveClass: n } = t.params.pagination;
      e[i]().addClass(`${n}-${i}`)[i]().addClass(`${n}-${i}-${i}`);
    }
    function d() {
      const e = t.rtl,
        i = t.params.pagination;
      if (l()) return;
      const n =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.slides.length,
        r = t.pagination.$el;
      let d;
      const u = t.params.loop
        ? Math.ceil((n - 2 * t.loopedSlides) / t.params.slidesPerGroup)
        : t.snapGrid.length;
      if (
        (t.params.loop
          ? ((d = Math.ceil(
              (t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup
            )),
            d > n - 1 - 2 * t.loopedSlides && (d -= n - 2 * t.loopedSlides),
            d > u - 1 && (d -= u),
            d < 0 && "bullets" !== t.params.paginationType && (d = u + d))
          : (d = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
        "bullets" === i.type &&
          t.pagination.bullets &&
          t.pagination.bullets.length > 0)
      ) {
        const n = t.pagination.bullets;
        let s, l, u;
        if (
          (i.dynamicBullets &&
            ((o = n.eq(0)[t.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
            r.css(
              t.isHorizontal() ? "width" : "height",
              o * (i.dynamicMainBullets + 4) + "px"
            ),
            i.dynamicMainBullets > 1 &&
              void 0 !== t.previousIndex &&
              ((a += d - (t.previousIndex - t.loopedSlides || 0)),
              a > i.dynamicMainBullets - 1
                ? (a = i.dynamicMainBullets - 1)
                : a < 0 && (a = 0)),
            (s = Math.max(d - a, 0)),
            (l = s + (Math.min(n.length, i.dynamicMainBullets) - 1)),
            (u = (l + s) / 2)),
          n.removeClass(
            ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
              .map((e) => `${i.bulletActiveClass}${e}`)
              .join(" ")
          ),
          r.length > 1)
        )
          n.each((e) => {
            const t = L(e),
              n = t.index();
            n === d && t.addClass(i.bulletActiveClass),
              i.dynamicBullets &&
                (n >= s && n <= l && t.addClass(`${i.bulletActiveClass}-main`),
                n === s && c(t, "prev"),
                n === l && c(t, "next"));
          });
        else {
          const e = n.eq(d),
            r = e.index();
          if ((e.addClass(i.bulletActiveClass), i.dynamicBullets)) {
            const e = n.eq(s),
              o = n.eq(l);
            for (let e = s; e <= l; e += 1)
              n.eq(e).addClass(`${i.bulletActiveClass}-main`);
            if (t.params.loop)
              if (r >= n.length) {
                for (let e = i.dynamicMainBullets; e >= 0; e -= 1)
                  n.eq(n.length - e).addClass(`${i.bulletActiveClass}-main`);
                n.eq(n.length - i.dynamicMainBullets - 1).addClass(
                  `${i.bulletActiveClass}-prev`
                );
              } else c(e, "prev"), c(o, "next");
            else c(e, "prev"), c(o, "next");
          }
        }
        if (i.dynamicBullets) {
          const s = Math.min(n.length, i.dynamicMainBullets + 4),
            r = (o * s - o) / 2 - u * o,
            a = e ? "right" : "left";
          n.css(t.isHorizontal() ? a : "top", `${r}px`);
        }
      }
      if (
        ("fraction" === i.type &&
          (r.find(me(i.currentClass)).text(i.formatFractionCurrent(d + 1)),
          r.find(me(i.totalClass)).text(i.formatFractionTotal(u))),
        "progressbar" === i.type)
      ) {
        let e;
        e = i.progressbarOpposite
          ? t.isHorizontal()
            ? "vertical"
            : "horizontal"
          : t.isHorizontal()
          ? "horizontal"
          : "vertical";
        const n = (d + 1) / u;
        let s = 1,
          o = 1;
        "horizontal" === e ? (s = n) : (o = n),
          r
            .find(me(i.progressbarFillClass))
            .transform(`translate3d(0,0,0) scaleX(${s}) scaleY(${o})`)
            .transition(t.params.speed);
      }
      "custom" === i.type && i.renderCustom
        ? (r.html(i.renderCustom(t, d + 1, u)), s("paginationRender", r[0]))
        : s("paginationUpdate", r[0]),
        t.params.watchOverflow &&
          t.enabled &&
          r[t.isLocked ? "addClass" : "removeClass"](i.lockClass);
    }
    function u() {
      const e = t.params.pagination;
      if (l()) return;
      const i =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.slides.length,
        n = t.pagination.$el;
      let r = "";
      if ("bullets" === e.type) {
        let s = t.params.loop
          ? Math.ceil((i - 2 * t.loopedSlides) / t.params.slidesPerGroup)
          : t.snapGrid.length;
        t.params.freeMode &&
          t.params.freeMode.enabled &&
          !t.params.loop &&
          s > i &&
          (s = i);
        for (let i = 0; i < s; i += 1)
          e.renderBullet
            ? (r += e.renderBullet.call(t, i, e.bulletClass))
            : (r += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`);
        n.html(r), (t.pagination.bullets = n.find(me(e.bulletClass)));
      }
      "fraction" === e.type &&
        ((r = e.renderFraction
          ? e.renderFraction.call(t, e.currentClass, e.totalClass)
          : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
        n.html(r)),
        "progressbar" === e.type &&
          ((r = e.renderProgressbar
            ? e.renderProgressbar.call(t, e.progressbarFillClass)
            : `<span class="${e.progressbarFillClass}"></span>`),
          n.html(r)),
        "custom" !== e.type && s("paginationRender", t.pagination.$el[0]);
    }
    function p() {
      t.params.pagination = he(
        t,
        t.originalParams.pagination,
        t.params.pagination,
        { el: "swiper-pagination" }
      );
      const e = t.params.pagination;
      if (!e.el) return;
      let i = L(e.el);
      0 !== i.length &&
        (t.params.uniqueNavElements &&
          "string" == typeof e.el &&
          i.length > 1 &&
          ((i = t.$el.find(e.el)),
          i.length > 1 &&
            (i = i.filter((e) => L(e).parents(".swiper")[0] === t.el))),
        "bullets" === e.type && e.clickable && i.addClass(e.clickableClass),
        i.addClass(e.modifierClass + e.type),
        i.addClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
        "bullets" === e.type &&
          e.dynamicBullets &&
          (i.addClass(`${e.modifierClass}${e.type}-dynamic`),
          (a = 0),
          e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
        "progressbar" === e.type &&
          e.progressbarOpposite &&
          i.addClass(e.progressbarOppositeClass),
        e.clickable &&
          i.on("click", me(e.bulletClass), function (e) {
            e.preventDefault();
            let i = L(this).index() * t.params.slidesPerGroup;
            t.params.loop && (i += t.loopedSlides), t.slideTo(i);
          }),
        Object.assign(t.pagination, { $el: i, el: i[0] }),
        t.enabled || i.addClass(e.lockClass));
    }
    function h() {
      const e = t.params.pagination;
      if (l()) return;
      const i = t.pagination.$el;
      i.removeClass(e.hiddenClass),
        i.removeClass(e.modifierClass + e.type),
        i.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
        t.pagination.bullets &&
          t.pagination.bullets.removeClass &&
          t.pagination.bullets.removeClass(e.bulletActiveClass),
        e.clickable && i.off("click", me(e.bulletClass));
    }
    n("init", () => {
      p(), u(), d();
    }),
      n("activeIndexChange", () => {
        (t.params.loop || void 0 === t.snapIndex) && d();
      }),
      n("snapIndexChange", () => {
        t.params.loop || d();
      }),
      n("slidesLengthChange", () => {
        t.params.loop && (u(), d());
      }),
      n("snapGridLengthChange", () => {
        t.params.loop || (u(), d());
      }),
      n("destroy", () => {
        h();
      }),
      n("enable disable", () => {
        const { $el: e } = t.pagination;
        e &&
          e[t.enabled ? "removeClass" : "addClass"](
            t.params.pagination.lockClass
          );
      }),
      n("lock unlock", () => {
        d();
      }),
      n("click", (e, i) => {
        const n = i.target,
          { $el: r } = t.pagination;
        if (
          t.params.pagination.el &&
          t.params.pagination.hideOnClick &&
          r.length > 0 &&
          !L(n).hasClass(t.params.pagination.bulletClass)
        ) {
          if (
            t.navigation &&
            ((t.navigation.nextEl && n === t.navigation.nextEl) ||
              (t.navigation.prevEl && n === t.navigation.prevEl))
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
  function ge() {
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
    ge(),
      document.querySelector(".main-slider") &&
        document.querySelectorAll(".main-slider__slide").length > 1 &&
        new pe(".main-slider__slider", {
          modules: [fe, ve],
          observer: !0,
          observeParents: !0,
          slidesPerView: 1,
          spaceBetween: 0,
          speed: 800,
          loop: !0,
          pagination: { el: ".main-slider__dotts", clickable: !0 },
          navigation: {
            nextEl: ".controls-main-slider__arrow_next",
            prevEl: ".controls-main-slider__arrow_prev",
          },
          on: {},
        });
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
          u(
            Array.from(e).map(function (e) {
              return `${
                e.dataset.watchRoot ? e.dataset.watchRoot : null
              }|${e.dataset.watchMargin ? e.dataset.watchMargin : "0px"}|${e.dataset.watchThreshold ? e.dataset.watchThreshold : 0}`;
            })
          ).forEach((t) => {
            let i = t.split("|"),
              n = { root: i[0], margin: i[1], threshold: i[2] },
              s = Array.from(e).filter(function (e) {
                let t = e.dataset.watchRoot ? e.dataset.watchRoot : null,
                  i = e.dataset.watchMargin ? e.dataset.watchMargin : "0px",
                  s = e.dataset.watchThreshold ? e.dataset.watchThreshold : 0;
                if (
                  String(t) === n.root &&
                  String(i) === n.margin &&
                  String(s) === n.threshold
                )
                  return e;
              }),
              r = this.getScrollWatcherConfig(n);
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
      this.config.logging && d(`[Наблюдатель]: ${e}`);
    }
    scrollWatcherCallback(e, t) {
      const i = e.target;
      this.scrollWatcherIntersecting(e, i),
        i.hasAttribute("data-watch-once") &&
          e.isIntersecting &&
          this.scrollWatcherOff(i, t),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: e } })
        );
    }
  })({});
  let be = !1;
  function ye(e) {
    this.type = e;
  }
  setTimeout(() => {
    if (be) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    (ye.prototype.init = function () {
      const e = this;
      (this.оbjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let e = 0; e < this.nodes.length; e++) {
        const t = this.nodes[e],
          i = t.dataset.da.trim().split(","),
          n = {};
        (n.element = t),
          (n.parent = t.parentNode),
          (n.destination = document.querySelector(i[0].trim())),
          (n.breakpoint = i[1] ? i[1].trim() : "767"),
          (n.place = i[2] ? i[2].trim() : "last"),
          (n.index = this.indexInParent(n.parent, n.element)),
          this.оbjects.push(n);
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
          function (e, t, i) {
            return Array.prototype.indexOf.call(i, e) === t;
          }
        ));
      for (let t = 0; t < this.mediaQueries.length; t++) {
        const i = this.mediaQueries[t],
          n = String.prototype.split.call(i, ","),
          s = window.matchMedia(n[0]),
          r = n[1],
          o = Array.prototype.filter.call(this.оbjects, function (e) {
            return e.breakpoint === r;
          });
        s.addListener(function () {
          e.mediaHandler(s, o);
        }),
          this.mediaHandler(s, o);
      }
    }),
    (ye.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const i = t[e];
          (i.index = this.indexInParent(i.parent, i.element)),
            this.moveTo(i.place, i.element, i.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const i = t[e];
          i.element.classList.contains(this.daClassname) &&
            this.moveBack(i.parent, i.element, i.index);
        }
    }),
    (ye.prototype.moveTo = function (e, t, i) {
      t.classList.add(this.daClassname),
        "last" === e || e >= i.children.length
          ? i.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? i.children[e].insertAdjacentElement("beforebegin", t)
          : i.insertAdjacentElement("afterbegin", t);
    }),
    (ye.prototype.moveBack = function (e, t, i) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[i]
          ? e.children[i].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (ye.prototype.indexInParent = function (e, t) {
      const i = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(i, t);
    }),
    (ye.prototype.arraySort = function (e) {
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
  var we, Ee;
  function xe() {
    try {
      if ("dark" === localStorage.getItem("theme")) {
        if (
          (document.querySelector("html").classList.add("dark"),
          document.querySelector(".slide-main-slider"))
        ) {
          console.log("Есть слайдер");
          let e = document.querySelector(".header__background"),
            t = document.querySelector(".header");
          (e.style.display = "none"), (t.style.position = "absolute");
        } else console.log("Нет слайдера");
        console.log("тёмная тема");
      } else
        document.querySelector("html").classList.remove("dark"),
          (document.querySelector(".header").style.position = "relative");
    } catch (e) {}
  }
  function Se(e = null) {
    let t = [];
    if (e) {
      let i = e.parentNode;
      for (; i && !i.classList.contains("menu__list"); )
        "UL" === i.nodeName && t.push(i), (i = i.parentNode);
    }
    const i = document.querySelectorAll(".menu__sub-list");
    Array.from(i).forEach((i) => {
      i == e ||
        t.includes(i) ||
        (i.classList.remove("_open"),
        i.parentElement.classList.remove("_hover"));
    });
  }
  new ye("max").init(),
    (we = void 0),
    (Ee = function () {
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
      var i,
        n,
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
          var i, n;
          if (t && "function" == typeof (i = e.toString) && !w((n = i.call(e))))
            return n;
          if ("function" == typeof (i = e.valueOf) && !w((n = i.call(e))))
            return n;
          if (
            !t &&
            "function" == typeof (i = e.toString) &&
            !w((n = i.call(e)))
          )
            return n;
          throw TypeError("Can't convert object to primitive value");
        },
        x = {}.hasOwnProperty,
        S = function (e, t) {
          return x.call(e, t);
        },
        T = a.document,
        C = w(T) && w(T.createElement),
        O = function (e) {
          return C ? T.createElement(e) : {};
        },
        L =
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
        A = {
          f: c
            ? k
            : function (e, t) {
                if (((e = y(e)), (t = E(t, !0)), L))
                  try {
                    return k(e, t);
                  } catch (e) {}
                if (S(e, t)) return h(!p.f.call(e, t), e[t]);
              },
        },
        _ = function (e) {
          if (!w(e)) throw TypeError(String(e) + " is not an object");
          return e;
        },
        M = Object.defineProperty,
        P = {
          f: c
            ? M
            : function (e, t, i) {
                if ((_(e), (t = E(t, !0)), _(i), L))
                  try {
                    return M(e, t, i);
                  } catch (e) {}
                if ("get" in i || "set" in i)
                  throw TypeError("Accessors not supported");
                return "value" in i && (e[t] = i.value), e;
              },
        },
        $ = c
          ? function (e, t, i) {
              return P.f(e, t, h(1, i));
            }
          : function (e, t, i) {
              return (e[t] = i), e;
            },
        z = function (e, t) {
          try {
            $(a, e, t);
          } catch (i) {
            a[e] = t;
          }
          return t;
        },
        I = t(function (e) {
          var t = a["__core-js_shared__"] || z("__core-js_shared__", {});
          (e.exports = function (e, i) {
            return t[e] || (t[e] = void 0 !== i ? i : {});
          })("versions", []).push({
            version: "3.2.1",
            mode: "global",
            copyright: "© 2019 Denis Pushkarev (zloirock.ru)",
          });
        }),
        N = I("native-function-to-string", Function.toString),
        B = a.WeakMap,
        W = "function" == typeof B && /native code/.test(N.call(B)),
        D = 0,
        j = Math.random(),
        R = function (e) {
          return (
            "Symbol(" +
            String(void 0 === e ? "" : e) +
            ")_" +
            (++D + j).toString(36)
          );
        },
        q = I("keys"),
        G = function (e) {
          return q[e] || (q[e] = R(e));
        },
        H = {},
        F = a.WeakMap;
      if (W) {
        var V = new F(),
          X = V.get,
          Y = V.has,
          U = V.set;
        (i = function (e, t) {
          return U.call(V, e, t), t;
        }),
          (n = function (e) {
            return X.call(V, e) || {};
          }),
          (s = function (e) {
            return Y.call(V, e);
          });
      } else {
        var Q = G("state");
        (H[Q] = !0),
          (i = function (e, t) {
            return $(e, Q, t), t;
          }),
          (n = function (e) {
            return S(e, Q) ? e[Q] : {};
          }),
          (s = function (e) {
            return S(e, Q);
          });
      }
      var K = {
          set: i,
          get: n,
          has: s,
          enforce: function (e) {
            return s(e) ? n(e) : i(e, {});
          },
          getterFor: function (e) {
            return function (t) {
              var i;
              if (!w(t) || (i = n(t)).type !== e)
                throw TypeError("Incompatible receiver, " + e + " required");
              return i;
            };
          },
        },
        J = t(function (e) {
          var t = K.get,
            i = K.enforce,
            n = String(N).split("toString");
          I("inspectSource", function (e) {
            return N.call(e);
          }),
            (e.exports = function (e, t, s, r) {
              var o = !!r && !!r.unsafe,
                l = !!r && !!r.enumerable,
                c = !!r && !!r.noTargetGet;
              "function" == typeof s &&
                ("string" != typeof t || S(s, "name") || $(s, "name", t),
                (i(s).source = n.join("string" == typeof t ? t : ""))),
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
        ie = Math.ceil,
        ne = Math.floor,
        se = function (e) {
          return isNaN((e = +e)) ? 0 : (e > 0 ? ne : ie)(e);
        },
        re = Math.min,
        oe = function (e) {
          return e > 0 ? re(se(e), 9007199254740991) : 0;
        },
        ae = Math.max,
        le = Math.min,
        ce = function (e) {
          return function (t, i, n) {
            var s,
              r = y(t),
              o = oe(r.length),
              a = (function (e, t) {
                var i = se(e);
                return i < 0 ? ae(i + t, 0) : le(i, t);
              })(n, o);
            if (e && i != i) {
              for (; o > a; ) if ((s = r[a++]) != s) return !0;
            } else
              for (; o > a; a++)
                if ((e || a in r) && r[a] === i) return e || a || 0;
            return !e && -1;
          };
        },
        de = (ce(!0), ce(!1)),
        ue = function (e, t) {
          var i,
            n = y(e),
            s = 0,
            r = [];
          for (i in n) !S(H, i) && S(n, i) && r.push(i);
          for (; t.length > s; ) S(n, (i = t[s++])) && (~de(r, i) || r.push(i));
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
            var t = fe.f(_(e)),
              i = me.f;
            return i ? t.concat(i(e)) : t;
          },
        ge = function (e, t) {
          for (var i = ve(t), n = P.f, s = A.f, r = 0; r < i.length; r++) {
            var o = i[r];
            S(e, o) || n(e, o, s(t, o));
          }
        },
        be = /#|\.prototype\./,
        ye = function (e, t) {
          var i = Ee[we(e)];
          return i == Se || (i != xe && ("function" == typeof t ? l(t) : !!t));
        },
        we = (ye.normalize = function (e) {
          return String(e).replace(be, ".").toLowerCase();
        }),
        Ee = (ye.data = {}),
        xe = (ye.NATIVE = "N"),
        Se = (ye.POLYFILL = "P"),
        Te = ye,
        Ce = A.f,
        Oe = function (e, t) {
          var i,
            n,
            s,
            r,
            o,
            l = e.target,
            c = e.global,
            d = e.stat;
          if ((i = c ? a : d ? a[l] || z(l, {}) : (a[l] || {}).prototype))
            for (n in t) {
              if (
                ((r = t[n]),
                (s = e.noTargetGet ? (o = Ce(i, n)) && o.value : i[n]),
                !Te(c ? n : l + (d ? "." : "#") + n, e.forced) && void 0 !== s)
              ) {
                if (typeof r == typeof s) continue;
                ge(r, s);
              }
              (e.sham || (s && s.sham)) && $(r, "sham", !0), J(i, n, r, e);
            }
        },
        Le = function (e) {
          if ("function" != typeof e)
            throw TypeError(String(e) + " is not a function");
          return e;
        },
        ke = function (e, t, i) {
          if ((Le(e), void 0 === t)) return e;
          switch (i) {
            case 0:
              return function () {
                return e.call(t);
              };
            case 1:
              return function (i) {
                return e.call(t, i);
              };
            case 2:
              return function (i, n) {
                return e.call(t, i, n);
              };
            case 3:
              return function (i, n, s) {
                return e.call(t, i, n, s);
              };
          }
          return function () {
            return e.apply(t, arguments);
          };
        },
        Ae = function (e) {
          return Object(b(e));
        },
        _e =
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
            $e[e] || ($e[e] = (Me && Pe[e]) || (Me ? Pe : R)("Symbol." + e))
          );
        },
        Ie = ze("species"),
        Ne = function (e, t) {
          var i;
          return (
            _e(e) &&
              ("function" != typeof (i = e.constructor) ||
              (i !== Array && !_e(i.prototype))
                ? w(i) && null === (i = i[Ie]) && (i = void 0)
                : (i = void 0)),
            new (void 0 === i ? Array : i)(0 === t ? 0 : t)
          );
        },
        Be = [].push,
        We = function (e) {
          var t = 1 == e,
            i = 2 == e,
            n = 3 == e,
            s = 4 == e,
            r = 6 == e,
            o = 5 == e || r;
          return function (a, l, c, d) {
            for (
              var u,
                p,
                h = Ae(a),
                f = g(h),
                m = ke(l, c, 3),
                v = oe(f.length),
                b = 0,
                y = d || Ne,
                w = t ? y(a, v) : i ? y(a, 0) : void 0;
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
                      Be.call(w, u);
                  }
                else if (s) return !1;
            return r ? -1 : n || s ? s : w;
          };
        },
        De = {
          forEach: We(0),
          map: We(1),
          filter: We(2),
          some: We(3),
          every: We(4),
          find: We(5),
          findIndex: We(6),
        },
        je = function (e, t) {
          var i = [][e];
          return (
            !i ||
            !l(function () {
              i.call(
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
        Re = De.forEach,
        qe = je("forEach")
          ? function (e) {
              return Re(this, e, arguments.length > 1 ? arguments[1] : void 0);
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
              _(e);
              for (var i, n = Qe(t), s = n.length, r = 0; s > r; )
                P.f(e, (i = n[r++]), t[i]);
              return e;
            },
        Je = te("document", "documentElement"),
        Ze = G("IE_PROTO"),
        et = function () {},
        tt = function () {
          var e,
            t = O("iframe"),
            i = pe.length;
          for (
            t.style.display = "none",
              Je.appendChild(t),
              t.src = String("javascript:"),
              (e = t.contentWindow.document).open(),
              e.write("<script>document.F=Object</script>"),
              e.close(),
              tt = e.F;
            i--;

          )
            delete tt.prototype[pe[i]];
          return tt();
        },
        it =
          Object.create ||
          function (e, t) {
            var i;
            return (
              null !== e
                ? ((et.prototype = _(e)),
                  (i = new et()),
                  (et.prototype = null),
                  (i[Ze] = e))
                : (i = tt()),
              void 0 === t ? i : Ke(i, t)
            );
          };
      H[Ze] = !0;
      var nt = ze("unscopables"),
        st = Array.prototype;
      null == st[nt] && $(st, nt, it(null));
      var rt,
        ot,
        at,
        lt = function (e) {
          st[nt][e] = !0;
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
                (e = Ae(e)),
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
        yt = function (e, t, i) {
          e &&
            !S((e = i ? e : e.prototype), bt) &&
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
                  i = {};
                try {
                  (e = Object.getOwnPropertyDescriptor(
                    Object.prototype,
                    "__proto__"
                  ).set).call(i, []),
                    (t = i instanceof Array);
                } catch (e) {}
                return function (i, n) {
                  return (
                    _(i),
                    (function (e) {
                      if (!w(e) && null !== e)
                        throw TypeError(
                          "Can't set " + String(e) + " as a prototype"
                        );
                    })(n),
                    t ? e.call(i, n) : (i.__proto__ = n),
                    i
                  );
                };
              })()
            : void 0),
        St = vt.IteratorPrototype,
        Tt = vt.BUGGY_SAFARI_ITERATORS,
        Ct = ze("iterator"),
        Ot = function () {
          return this;
        },
        Lt = function (e, t, i, n, s, r, o) {
          !(function (e, t, i) {
            var n = t + " Iterator";
            (e.prototype = it(wt, { next: h(1, i) })),
              yt(e, n, !1),
              (ct[n] = Et);
          })(i, t, n);
          var a,
            l,
            c,
            d = function (e) {
              if (e === s && v) return v;
              if (!Tt && e in f) return f[e];
              switch (e) {
                case "keys":
                case "values":
                case "entries":
                  return function () {
                    return new i(this, e);
                  };
              }
              return function () {
                return new i(this);
              };
            },
            u = t + " Iterator",
            p = !1,
            f = e.prototype,
            m = f[Ct] || f["@@iterator"] || (s && f[s]),
            v = (!Tt && m) || d(s),
            g = ("Array" == t && f.entries) || m;
          if (
            (g &&
              ((a = ht(g.call(new e()))),
              St !== Object.prototype &&
                a.next &&
                (ht(a) !== St &&
                  (xt ? xt(a, St) : "function" != typeof a[Ct] && $(a, Ct, Ot)),
                yt(a, u, !0))),
            "values" == s &&
              m &&
              "values" !== m.name &&
              ((p = !0),
              (v = function () {
                return m.call(this);
              })),
            f[Ct] !== v && $(f, Ct, v),
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
              for (c in l) (!Tt && !p && c in f) || J(f, c, l[c]);
            else Oe({ target: t, proto: !0, forced: Tt || p }, l);
          return l;
        },
        kt = K.set,
        At = K.getterFor("Array Iterator"),
        _t = Lt(
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
            var e = At(this),
              t = e.target,
              i = e.kind,
              n = e.index++;
            return !t || n >= t.length
              ? ((e.target = void 0), { value: void 0, done: !0 })
              : "keys" == i
              ? { value: n, done: !1 }
              : "values" == i
              ? { value: t[n], done: !1 }
              : { value: [n, t[n]], done: !1 };
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
              i = Symbol();
            return (
              (e[i] = 7),
              "abcdefghijklmnopqrst".split("").forEach(function (e) {
                t[e] = e;
              }),
              7 != Mt({}, e)[i] ||
                "abcdefghijklmnopqrst" != Qe(Mt({}, t)).join("")
            );
          })
            ? function (e, t) {
                for (
                  var i = Ae(e), n = arguments.length, s = 1, r = me.f, o = p.f;
                  n > s;

                )
                  for (
                    var a,
                      l = g(arguments[s++]),
                      d = r ? Qe(l).concat(r(l)) : Qe(l),
                      u = d.length,
                      h = 0;
                    u > h;

                  )
                    (a = d[h++]), (c && !o.call(l, a)) || (i[a] = l[a]);
                return i;
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
          var t, i, n;
          return void 0 === e
            ? "Undefined"
            : null === e
            ? "Null"
            : "string" ==
              typeof (i = (function (e, t) {
                try {
                  return e[t];
                } catch (e) {}
              })((t = Object(e)), $t))
            ? i
            : zt
            ? m(t)
            : "Object" == (n = m(t)) && "function" == typeof t.callee
            ? "Arguments"
            : n;
        },
        Nt = {};
      Nt[ze("toStringTag")] = "z";
      var Bt =
          "[object z]" !== String(Nt)
            ? function () {
                return "[object " + It(this) + "]";
              }
            : Nt.toString,
        Wt = Object.prototype;
      Bt !== Wt.toString && J(Wt, "toString", Bt, { unsafe: !0 });
      var Dt = "\t\n\v\f\r                　\u2028\u2029\ufeff",
        jt = "[" + Dt + "]",
        Rt = RegExp("^" + jt + jt + "*"),
        qt = RegExp(jt + jt + "*$"),
        Gt = function (e) {
          return function (t) {
            var i = String(b(t));
            return (
              1 & e && (i = i.replace(Rt, "")),
              2 & e && (i = i.replace(qt, "")),
              i
            );
          };
        },
        Ht = (Gt(1), Gt(2), Gt(3)),
        Ft = a.parseInt,
        Vt = /^[+-]?0[Xx]/,
        Xt =
          8 !== Ft(Dt + "08") || 22 !== Ft(Dt + "0x16")
            ? function (e, t) {
                var i = Ht(String(e));
                return Ft(i, t >>> 0 || (Vt.test(i) ? 16 : 10));
              }
            : Ft;
      Oe({ global: !0, forced: parseInt != Xt }, { parseInt: Xt });
      var Yt = function (e) {
          return function (t, i) {
            var n,
              s,
              r = String(b(t)),
              o = se(i),
              a = r.length;
            return o < 0 || o >= a
              ? e
                ? ""
                : void 0
              : (n = r.charCodeAt(o)) < 55296 ||
                n > 56319 ||
                o + 1 === a ||
                (s = r.charCodeAt(o + 1)) < 56320 ||
                s > 57343
              ? e
                ? r.charAt(o)
                : n
              : e
              ? r.slice(o, o + 2)
              : s - 56320 + ((n - 55296) << 10) + 65536;
          };
        },
        Ut = { codeAt: Yt(!1), charAt: Yt(!0) },
        Qt = Ut.charAt,
        Kt = K.set,
        Jt = K.getterFor("String Iterator");
      Lt(
        String,
        "String",
        function (e) {
          Kt(this, { type: "String Iterator", string: String(e), index: 0 });
        },
        function () {
          var e,
            t = Jt(this),
            i = t.string,
            n = t.index;
          return n >= i.length
            ? { value: void 0, done: !0 }
            : ((e = Qt(i, n)), (t.index += e.length), { value: e, done: !1 });
        }
      );
      var Zt = function (e, t, i) {
          for (var n in t) J(e, n, t[n], i);
          return e;
        },
        ei = !l(function () {
          return Object.isExtensible(Object.preventExtensions({}));
        }),
        ti = t(function (e) {
          var t = P.f,
            i = R("meta"),
            n = 0,
            s =
              Object.isExtensible ||
              function () {
                return !0;
              },
            r = function (e) {
              t(e, i, { value: { objectID: "O" + ++n, weakData: {} } });
            },
            o = (e.exports = {
              REQUIRED: !1,
              fastKey: function (e, t) {
                if (!w(e))
                  return "symbol" == typeof e
                    ? e
                    : ("string" == typeof e ? "S" : "P") + e;
                if (!S(e, i)) {
                  if (!s(e)) return "F";
                  if (!t) return "E";
                  r(e);
                }
                return e[i].objectID;
              },
              getWeakData: function (e, t) {
                if (!S(e, i)) {
                  if (!s(e)) return !0;
                  if (!t) return !1;
                  r(e);
                }
                return e[i].weakData;
              },
              onFreeze: function (e) {
                return ei && o.REQUIRED && s(e) && !S(e, i) && r(e), e;
              },
            });
          H[i] = !0;
        }),
        ii =
          (ti.REQUIRED,
          ti.fastKey,
          ti.getWeakData,
          ti.onFreeze,
          ze("iterator")),
        ni = Array.prototype,
        si = ze("iterator"),
        ri = function (e, t, i, n) {
          try {
            return n ? t(_(i)[0], i[1]) : t(i);
          } catch (t) {
            var s = e.return;
            throw (void 0 !== s && _(s.call(e)), t);
          }
        },
        oi = t(function (e) {
          var t = function (e, t) {
            (this.stopped = e), (this.result = t);
          };
          (e.exports = function (e, i, n, s, r) {
            var o,
              a,
              l,
              c,
              d,
              u,
              p,
              h = ke(i, n, s ? 2 : 1);
            if (r) o = e;
            else {
              if (
                "function" !=
                typeof (a = (function (e) {
                  if (null != e) return e[si] || e["@@iterator"] || ct[It(e)];
                })(e))
              )
                throw TypeError("Target is not iterable");
              if (void 0 !== (p = a) && (ct.Array === p || ni[ii] === p)) {
                for (l = 0, c = oe(e.length); c > l; l++)
                  if (
                    (d = s ? h(_((u = e[l]))[0], u[1]) : h(e[l])) &&
                    d instanceof t
                  )
                    return d;
                return new t(!1);
              }
              o = a.call(e);
            }
            for (; !(u = o.next()).done; )
              if ((d = ri(o, h, u.value, s)) && d instanceof t) return d;
            return new t(!1);
          }).stop = function (e) {
            return new t(!0, e);
          };
        }),
        ai = function (e, t, i) {
          if (!(e instanceof t))
            throw TypeError("Incorrect " + (i ? i + " " : "") + "invocation");
          return e;
        },
        li = ze("iterator"),
        ci = !1;
      try {
        var di = 0,
          ui = {
            next: function () {
              return { done: !!di++ };
            },
            return: function () {
              ci = !0;
            },
          };
        (ui[li] = function () {
          return this;
        }),
          Array.from(ui, function () {
            throw 2;
          });
      } catch (e) {}
      var pi = function (e, t, i, n, s) {
          var r = a[e],
            o = r && r.prototype,
            c = r,
            d = n ? "set" : "add",
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
                  : function (e, i) {
                      return t.call(this, 0 === e ? 0 : e, i), this;
                    }
              );
            };
          if (
            Te(
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
            (c = i.getConstructor(t, e, n, d)), (ti.REQUIRED = !0);
          else if (Te(e, !0)) {
            var h = new c(),
              f = h[d](s ? {} : -0, 1) != h,
              m = l(function () {
                h.has(1);
              }),
              v = (function (e, t) {
                if (!ci) return !1;
                var i = !1;
                try {
                  var n = {};
                  (n[li] = function () {
                    return {
                      next: function () {
                        return { done: (i = !0) };
                      },
                    };
                  }),
                    (function (e) {
                      new r(e);
                    })(n);
                } catch (e) {}
                return i;
              })(),
              g =
                !s &&
                l(function () {
                  for (var e = new r(), t = 5; t--; ) e[d](t, t);
                  return !e.has(-0);
                });
            v ||
              (((c = t(function (t, i) {
                ai(t, c, e);
                var s = (function (e, t, i) {
                  var n, s;
                  return (
                    xt &&
                      "function" == typeof (n = t.constructor) &&
                      n !== i &&
                      w((s = n.prototype)) &&
                      s !== i.prototype &&
                      xt(e, s),
                    e
                  );
                })(new r(), t, c);
                return null != i && oi(i, s[d], s, n), s;
              })).prototype = o),
              (o.constructor = c)),
              (m || g) && (p("delete"), p("has"), n && p("get")),
              (g || f) && p(d),
              s && o.clear && delete o.clear;
          }
          return (
            (u[e] = c),
            Oe({ global: !0, forced: c != r }, u),
            yt(c, e),
            s || i.setStrong(c, e, n),
            c
          );
        },
        hi = ti.getWeakData,
        fi = K.set,
        mi = K.getterFor,
        vi = De.find,
        gi = De.findIndex,
        bi = 0,
        yi = function (e) {
          return e.frozen || (e.frozen = new wi());
        },
        wi = function () {
          this.entries = [];
        },
        Ei = function (e, t) {
          return vi(e.entries, function (e) {
            return e[0] === t;
          });
        };
      wi.prototype = {
        get: function (e) {
          var t = Ei(this, e);
          if (t) return t[1];
        },
        has: function (e) {
          return !!Ei(this, e);
        },
        set: function (e, t) {
          var i = Ei(this, e);
          i ? (i[1] = t) : this.entries.push([e, t]);
        },
        delete: function (e) {
          var t = gi(this.entries, function (t) {
            return t[0] === e;
          });
          return ~t && this.entries.splice(t, 1), !!~t;
        },
      };
      var xi = {
          getConstructor: function (e, t, i, n) {
            var s = e(function (e, r) {
                ai(e, s, t),
                  fi(e, { type: t, id: bi++, frozen: void 0 }),
                  null != r && oi(r, e[n], e, i);
              }),
              r = mi(t),
              o = function (e, t, i) {
                var n = r(e),
                  s = hi(_(t), !0);
                return !0 === s ? yi(n).set(t, i) : (s[n.id] = i), e;
              };
            return (
              Zt(s.prototype, {
                delete: function (e) {
                  var t = r(this);
                  if (!w(e)) return !1;
                  var i = hi(e);
                  return !0 === i
                    ? yi(t).delete(e)
                    : i && S(i, t.id) && delete i[t.id];
                },
                has: function (e) {
                  var t = r(this);
                  if (!w(e)) return !1;
                  var i = hi(e);
                  return !0 === i ? yi(t).has(e) : i && S(i, t.id);
                },
              }),
              Zt(
                s.prototype,
                i
                  ? {
                      get: function (e) {
                        var t = r(this);
                        if (w(e)) {
                          var i = hi(e);
                          return !0 === i ? yi(t).get(e) : i ? i[t.id] : void 0;
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
        Si =
          (t(function (e) {
            var t,
              i = K.enforce,
              n = !a.ActiveXObject && "ActiveXObject" in a,
              s = Object.isExtensible,
              r = function (e) {
                return function () {
                  return e(this, arguments.length ? arguments[0] : void 0);
                };
              },
              o = (e.exports = pi("WeakMap", r, xi, !0, !0));
            if (W && n) {
              (t = xi.getConstructor(r, "WeakMap", !0)), (ti.REQUIRED = !0);
              var l = o.prototype,
                c = l.delete,
                d = l.has,
                u = l.get,
                p = l.set;
              Zt(l, {
                delete: function (e) {
                  if (w(e) && !s(e)) {
                    var n = i(this);
                    return (
                      n.frozen || (n.frozen = new t()),
                      c.call(this, e) || n.frozen.delete(e)
                    );
                  }
                  return c.call(this, e);
                },
                has: function (e) {
                  if (w(e) && !s(e)) {
                    var n = i(this);
                    return (
                      n.frozen || (n.frozen = new t()),
                      d.call(this, e) || n.frozen.has(e)
                    );
                  }
                  return d.call(this, e);
                },
                get: function (e) {
                  if (w(e) && !s(e)) {
                    var n = i(this);
                    return (
                      n.frozen || (n.frozen = new t()),
                      d.call(this, e) ? u.call(this, e) : n.frozen.get(e)
                    );
                  }
                  return u.call(this, e);
                },
                set: function (e, n) {
                  if (w(e) && !s(e)) {
                    var r = i(this);
                    r.frozen || (r.frozen = new t()),
                      d.call(this, e) ? p.call(this, e, n) : r.frozen.set(e, n);
                  } else p.call(this, e, n);
                  return this;
                },
              });
            }
          }),
          ze("iterator")),
        Ti = ze("toStringTag"),
        Ci = _t.values;
      for (var Oi in Ge) {
        var Li = a[Oi],
          ki = Li && Li.prototype;
        if (ki) {
          if (ki[Si] !== Ci)
            try {
              $(ki, Si, Ci);
            } catch (e) {
              ki[Si] = Ci;
            }
          if ((ki[Ti] || $(ki, Ti, Oi), Ge[Oi]))
            for (var Ai in _t)
              if (ki[Ai] !== _t[Ai])
                try {
                  $(ki, Ai, _t[Ai]);
                } catch (e) {
                  ki[Ai] = _t[Ai];
                }
        }
      }
      var _i = "Expected a function",
        Mi = /^\s+|\s+$/g,
        Pi = /^[-+]0x[0-9a-f]+$/i,
        $i = /^0b[01]+$/i,
        zi = /^0o[0-7]+$/i,
        Ii = parseInt,
        Ni = "object" == typeof e && e && e.Object === Object && e,
        Bi = "object" == typeof self && self && self.Object === Object && self,
        Wi = Ni || Bi || Function("return this")(),
        Di = Object.prototype.toString,
        ji = Math.max,
        Ri = Math.min,
        qi = function () {
          return Wi.Date.now();
        };
      function Gi(e) {
        var t = typeof e;
        return !!e && ("object" == t || "function" == t);
      }
      function Hi(e) {
        if ("number" == typeof e) return e;
        if (
          (function (e) {
            return (
              "symbol" == typeof e ||
              ((function (e) {
                return !!e && "object" == typeof e;
              })(e) &&
                "[object Symbol]" == Di.call(e))
            );
          })(e)
        )
          return NaN;
        if (Gi(e)) {
          var t = "function" == typeof e.valueOf ? e.valueOf() : e;
          e = Gi(t) ? t + "" : t;
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = e.replace(Mi, "");
        var i = $i.test(e);
        return i || zi.test(e)
          ? Ii(e.slice(2), i ? 2 : 8)
          : Pi.test(e)
          ? NaN
          : +e;
      }
      var Fi = function (e, t, i) {
          var n = !0,
            s = !0;
          if ("function" != typeof e) throw new TypeError(_i);
          return (
            Gi(i) &&
              ((n = "leading" in i ? !!i.leading : n),
              (s = "trailing" in i ? !!i.trailing : s)),
            (function (e, t, i) {
              var n,
                s,
                r,
                o,
                a,
                l,
                c = 0,
                d = !1,
                u = !1,
                p = !0;
              if ("function" != typeof e) throw new TypeError(_i);
              function h(t) {
                var i = n,
                  r = s;
                return (n = s = void 0), (c = t), (o = e.apply(r, i));
              }
              function f(e) {
                var i = e - l;
                return void 0 === l || i >= t || i < 0 || (u && e - c >= r);
              }
              function m() {
                var e = qi();
                if (f(e)) return v(e);
                a = setTimeout(
                  m,
                  (function (e) {
                    var i = t - (e - l);
                    return u ? Ri(i, r - (e - c)) : i;
                  })(e)
                );
              }
              function v(e) {
                return (a = void 0), p && n ? h(e) : ((n = s = void 0), o);
              }
              function g() {
                var e = qi(),
                  i = f(e);
                if (((n = arguments), (s = this), (l = e), i)) {
                  if (void 0 === a)
                    return (function (e) {
                      return (c = e), (a = setTimeout(m, t)), d ? h(e) : o;
                    })(l);
                  if (u) return (a = setTimeout(m, t)), h(l);
                }
                return void 0 === a && (a = setTimeout(m, t)), o;
              }
              return (
                (t = Hi(t) || 0),
                Gi(i) &&
                  ((d = !!i.leading),
                  (r = (u = "maxWait" in i) ? ji(Hi(i.maxWait) || 0, t) : r),
                  (p = "trailing" in i ? !!i.trailing : p)),
                (g.cancel = function () {
                  void 0 !== a && clearTimeout(a),
                    (c = 0),
                    (n = l = s = a = void 0);
                }),
                (g.flush = function () {
                  return void 0 === a ? o : v(qi());
                }),
                g
              );
            })(e, t, { leading: n, maxWait: t, trailing: s })
          );
        },
        Vi = /^\s+|\s+$/g,
        Xi = /^[-+]0x[0-9a-f]+$/i,
        Yi = /^0b[01]+$/i,
        Ui = /^0o[0-7]+$/i,
        Qi = parseInt,
        Ki = "object" == typeof e && e && e.Object === Object && e,
        Ji = "object" == typeof self && self && self.Object === Object && self,
        Zi = Ki || Ji || Function("return this")(),
        en = Object.prototype.toString,
        tn = Math.max,
        nn = Math.min,
        sn = function () {
          return Zi.Date.now();
        };
      function rn(e) {
        var t = typeof e;
        return !!e && ("object" == t || "function" == t);
      }
      function on(e) {
        if ("number" == typeof e) return e;
        if (
          (function (e) {
            return (
              "symbol" == typeof e ||
              ((function (e) {
                return !!e && "object" == typeof e;
              })(e) &&
                "[object Symbol]" == en.call(e))
            );
          })(e)
        )
          return NaN;
        if (rn(e)) {
          var t = "function" == typeof e.valueOf ? e.valueOf() : e;
          e = rn(t) ? t + "" : t;
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = e.replace(Vi, "");
        var i = Yi.test(e);
        return i || Ui.test(e)
          ? Qi(e.slice(2), i ? 2 : 8)
          : Xi.test(e)
          ? NaN
          : +e;
      }
      var an = function (e, t, i) {
          var n,
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
            var i = n,
              r = s;
            return (n = s = void 0), (c = t), (o = e.apply(r, i));
          }
          function f(e) {
            var i = e - l;
            return void 0 === l || i >= t || i < 0 || (u && e - c >= r);
          }
          function m() {
            var e = sn();
            if (f(e)) return v(e);
            a = setTimeout(
              m,
              (function (e) {
                var i = t - (e - l);
                return u ? nn(i, r - (e - c)) : i;
              })(e)
            );
          }
          function v(e) {
            return (a = void 0), p && n ? h(e) : ((n = s = void 0), o);
          }
          function g() {
            var e = sn(),
              i = f(e);
            if (((n = arguments), (s = this), (l = e), i)) {
              if (void 0 === a)
                return (function (e) {
                  return (c = e), (a = setTimeout(m, t)), d ? h(e) : o;
                })(l);
              if (u) return (a = setTimeout(m, t)), h(l);
            }
            return void 0 === a && (a = setTimeout(m, t)), o;
          }
          return (
            (t = on(t) || 0),
            rn(i) &&
              ((d = !!i.leading),
              (r = (u = "maxWait" in i) ? tn(on(i.maxWait) || 0, t) : r),
              (p = "trailing" in i ? !!i.trailing : p)),
            (g.cancel = function () {
              void 0 !== a && clearTimeout(a),
                (c = 0),
                (n = l = s = a = void 0);
            }),
            (g.flush = function () {
              return void 0 === a ? o : v(sn());
            }),
            g
          );
        },
        ln = "__lodash_hash_undefined__",
        cn = /^\[object .+?Constructor\]$/,
        dn = "object" == typeof e && e && e.Object === Object && e,
        un = "object" == typeof self && self && self.Object === Object && self,
        pn = dn || un || Function("return this")(),
        hn = Array.prototype,
        fn = Function.prototype,
        mn = Object.prototype,
        vn = pn["__core-js_shared__"],
        gn = (function () {
          var e = /[^.]+$/.exec((vn && vn.keys && vn.keys.IE_PROTO) || "");
          return e ? "Symbol(src)_1." + e : "";
        })(),
        bn = fn.toString,
        yn = mn.hasOwnProperty,
        wn = mn.toString,
        En = RegExp(
          "^" +
            bn
              .call(yn)
              .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
              .replace(
                /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                "$1.*?"
              ) +
            "$"
        ),
        xn = hn.splice,
        Sn = _n(pn, "Map"),
        Tn = _n(Object, "create");
      function Cn(e) {
        var t = -1,
          i = e ? e.length : 0;
        for (this.clear(); ++t < i; ) {
          var n = e[t];
          this.set(n[0], n[1]);
        }
      }
      function On(e) {
        var t = -1,
          i = e ? e.length : 0;
        for (this.clear(); ++t < i; ) {
          var n = e[t];
          this.set(n[0], n[1]);
        }
      }
      function Ln(e) {
        var t = -1,
          i = e ? e.length : 0;
        for (this.clear(); ++t < i; ) {
          var n = e[t];
          this.set(n[0], n[1]);
        }
      }
      function kn(e, t) {
        for (var i, n, s = e.length; s--; )
          if ((i = e[s][0]) === (n = t) || (i != i && n != n)) return s;
        return -1;
      }
      function An(e, t) {
        var i,
          n,
          s = e.__data__;
        return (
          "string" == (n = typeof (i = t)) ||
          "number" == n ||
          "symbol" == n ||
          "boolean" == n
            ? "__proto__" !== i
            : null === i
        )
          ? s["string" == typeof t ? "string" : "hash"]
          : s.map;
      }
      function _n(e, t) {
        var i = (function (e, t) {
          return null == e ? void 0 : e[t];
        })(e, t);
        return (function (e) {
          return (
            !(!Pn(e) || ((t = e), gn && gn in t)) &&
            ((function (e) {
              var t = Pn(e) ? wn.call(e) : "";
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
              ? En
              : cn
            ).test(
              (function (e) {
                if (null != e) {
                  try {
                    return bn.call(e);
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
        })(i)
          ? i
          : void 0;
      }
      function Mn(e, t) {
        if ("function" != typeof e || (t && "function" != typeof t))
          throw new TypeError("Expected a function");
        var i = function () {
          var n = arguments,
            s = t ? t.apply(this, n) : n[0],
            r = i.cache;
          if (r.has(s)) return r.get(s);
          var o = e.apply(this, n);
          return (i.cache = r.set(s, o)), o;
        };
        return (i.cache = new (Mn.Cache || Ln)()), i;
      }
      function Pn(e) {
        var t = typeof e;
        return !!e && ("object" == t || "function" == t);
      }
      (Cn.prototype.clear = function () {
        this.__data__ = Tn ? Tn(null) : {};
      }),
        (Cn.prototype.delete = function (e) {
          return this.has(e) && delete this.__data__[e];
        }),
        (Cn.prototype.get = function (e) {
          var t = this.__data__;
          if (Tn) {
            var i = t[e];
            return i === ln ? void 0 : i;
          }
          return yn.call(t, e) ? t[e] : void 0;
        }),
        (Cn.prototype.has = function (e) {
          var t = this.__data__;
          return Tn ? void 0 !== t[e] : yn.call(t, e);
        }),
        (Cn.prototype.set = function (e, t) {
          return (this.__data__[e] = Tn && void 0 === t ? ln : t), this;
        }),
        (On.prototype.clear = function () {
          this.__data__ = [];
        }),
        (On.prototype.delete = function (e) {
          var t = this.__data__,
            i = kn(t, e);
          return !(
            i < 0 || (i == t.length - 1 ? t.pop() : xn.call(t, i, 1), 0)
          );
        }),
        (On.prototype.get = function (e) {
          var t = this.__data__,
            i = kn(t, e);
          return i < 0 ? void 0 : t[i][1];
        }),
        (On.prototype.has = function (e) {
          return kn(this.__data__, e) > -1;
        }),
        (On.prototype.set = function (e, t) {
          var i = this.__data__,
            n = kn(i, e);
          return n < 0 ? i.push([e, t]) : (i[n][1] = t), this;
        }),
        (Ln.prototype.clear = function () {
          this.__data__ = {
            hash: new Cn(),
            map: new (Sn || On)(),
            string: new Cn(),
          };
        }),
        (Ln.prototype.delete = function (e) {
          return An(this, e).delete(e);
        }),
        (Ln.prototype.get = function (e) {
          return An(this, e).get(e);
        }),
        (Ln.prototype.has = function (e) {
          return An(this, e).has(e);
        }),
        (Ln.prototype.set = function (e, t) {
          return An(this, e).set(e, t), this;
        }),
        (Mn.Cache = Ln);
      var $n,
        zn = Mn,
        In = [],
        Nn = "ResizeObserver loop completed with undelivered notifications.";
      !(function (e) {
        (e.BORDER_BOX = "border-box"),
          (e.CONTENT_BOX = "content-box"),
          (e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box");
      })($n || ($n = {}));
      var Bn,
        Wn = function (e) {
          return Object.freeze(e);
        },
        Dn = function (e, t) {
          (this.inlineSize = e), (this.blockSize = t), Wn(this);
        },
        jn = (function () {
          function e(e, t, i, n) {
            return (
              (this.x = e),
              (this.y = t),
              (this.width = i),
              (this.height = n),
              (this.top = this.y),
              (this.left = this.x),
              (this.bottom = this.top + this.height),
              (this.right = this.left + this.width),
              Wn(this)
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
        Rn = function (e) {
          return e instanceof SVGElement && "getBBox" in e;
        },
        qn = function (e) {
          if (Rn(e)) {
            var t = e.getBBox(),
              i = t.width,
              n = t.height;
            return !i && !n;
          }
          var s = e,
            r = s.offsetWidth,
            o = s.offsetHeight;
          return !(r || o || e.getClientRects().length);
        },
        Gn = function (e) {
          var t, i;
          if (e instanceof Element) return !0;
          var n =
            null ===
              (i =
                null === (t = e) || void 0 === t ? void 0 : t.ownerDocument) ||
            void 0 === i
              ? void 0
              : i.defaultView;
          return !!(n && e instanceof n.Element);
        },
        Hn = "undefined" != typeof window ? window : {},
        Fn = new WeakMap(),
        Vn = /auto|scroll/,
        Xn = /^tb|vertical/,
        Yn = /msie|trident/i.test(Hn.navigator && Hn.navigator.userAgent),
        Un = function (e) {
          return parseFloat(e || "0");
        },
        Qn = function (e, t, i) {
          return (
            void 0 === e && (e = 0),
            void 0 === t && (t = 0),
            void 0 === i && (i = !1),
            new Dn((i ? t : e) || 0, (i ? e : t) || 0)
          );
        },
        Kn = Wn({
          devicePixelContentBoxSize: Qn(),
          borderBoxSize: Qn(),
          contentBoxSize: Qn(),
          contentRect: new jn(0, 0, 0, 0),
        }),
        Jn = function (e, t) {
          if ((void 0 === t && (t = !1), Fn.has(e) && !t)) return Fn.get(e);
          if (qn(e)) return Fn.set(e, Kn), Kn;
          var i = getComputedStyle(e),
            n = Rn(e) && e.ownerSVGElement && e.getBBox(),
            s = !Yn && "border-box" === i.boxSizing,
            r = Xn.test(i.writingMode || ""),
            o = !n && Vn.test(i.overflowY || ""),
            a = !n && Vn.test(i.overflowX || ""),
            l = n ? 0 : Un(i.paddingTop),
            c = n ? 0 : Un(i.paddingRight),
            d = n ? 0 : Un(i.paddingBottom),
            u = n ? 0 : Un(i.paddingLeft),
            p = n ? 0 : Un(i.borderTopWidth),
            h = n ? 0 : Un(i.borderRightWidth),
            f = n ? 0 : Un(i.borderBottomWidth),
            m = u + c,
            v = l + d,
            g = (n ? 0 : Un(i.borderLeftWidth)) + h,
            b = p + f,
            y = a ? e.offsetHeight - b - e.clientHeight : 0,
            w = o ? e.offsetWidth - g - e.clientWidth : 0,
            E = s ? m + g : 0,
            x = s ? v + b : 0,
            S = n ? n.width : Un(i.width) - E - w,
            T = n ? n.height : Un(i.height) - x - y,
            C = S + m + w + g,
            O = T + v + y + b,
            L = Wn({
              devicePixelContentBoxSize: Qn(
                Math.round(S * devicePixelRatio),
                Math.round(T * devicePixelRatio),
                r
              ),
              borderBoxSize: Qn(C, O, r),
              contentBoxSize: Qn(S, T, r),
              contentRect: new jn(u, l, S, T),
            });
          return Fn.set(e, L), L;
        },
        Zn = function (e, t, i) {
          var n = Jn(e, i),
            s = n.borderBoxSize,
            r = n.contentBoxSize,
            o = n.devicePixelContentBoxSize;
          switch (t) {
            case $n.DEVICE_PIXEL_CONTENT_BOX:
              return o;
            case $n.BORDER_BOX:
              return s;
            default:
              return r;
          }
        },
        es = function (e) {
          var t = Jn(e);
          (this.target = e),
            (this.contentRect = t.contentRect),
            (this.borderBoxSize = Wn([t.borderBoxSize])),
            (this.contentBoxSize = Wn([t.contentBoxSize])),
            (this.devicePixelContentBoxSize = Wn([
              t.devicePixelContentBoxSize,
            ]));
        },
        ts = function (e) {
          if (qn(e)) return 1 / 0;
          for (var t = 0, i = e.parentNode; i; ) (t += 1), (i = i.parentNode);
          return t;
        },
        is = function () {
          var e = 1 / 0,
            t = [];
          In.forEach(function (i) {
            if (0 !== i.activeTargets.length) {
              var n = [];
              i.activeTargets.forEach(function (t) {
                var i = new es(t.target),
                  s = ts(t.target);
                n.push(i),
                  (t.lastReportedSize = Zn(t.target, t.observedBox)),
                  s < e && (e = s);
              }),
                t.push(function () {
                  i.callback.call(i.observer, n, i.observer);
                }),
                i.activeTargets.splice(0, i.activeTargets.length);
            }
          });
          for (var i = 0, n = t; i < n.length; i++) (0, n[i])();
          return e;
        },
        ns = function (e) {
          In.forEach(function (t) {
            t.activeTargets.splice(0, t.activeTargets.length),
              t.skippedTargets.splice(0, t.skippedTargets.length),
              t.observationTargets.forEach(function (i) {
                i.isActive() &&
                  (ts(i.target) > e
                    ? t.activeTargets.push(i)
                    : t.skippedTargets.push(i));
              });
          });
        },
        ss = [],
        rs = 0,
        os = { attributes: !0, characterData: !0, childList: !0, subtree: !0 },
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
                var i,
                  n = ls(e);
                (i = function () {
                  var i = !1;
                  try {
                    i = (function () {
                      var e,
                        t = 0;
                      for (
                        ns(t);
                        In.some(function (e) {
                          return e.activeTargets.length > 0;
                        });

                      )
                        (t = is()), ns(t);
                      return (
                        In.some(function (e) {
                          return e.skippedTargets.length > 0;
                        }) &&
                          ("function" == typeof ErrorEvent
                            ? (e = new ErrorEvent("error", { message: Nn }))
                            : ((e = document.createEvent("Event")).initEvent(
                                "error",
                                !1,
                                !1
                              ),
                              (e.message = Nn)),
                          window.dispatchEvent(e)),
                        t > 0
                      );
                    })();
                  } finally {
                    if (((cs = !1), (e = n - ls()), !rs)) return;
                    i ? t.run(1e3) : e > 0 ? t.run(e) : t.start();
                  }
                }),
                  (function (e) {
                    if (!Bn) {
                      var t = 0,
                        i = document.createTextNode("");
                      new MutationObserver(function () {
                        return ss.splice(0).forEach(function (e) {
                          return e();
                        });
                      }).observe(i, { characterData: !0 }),
                        (Bn = function () {
                          i.textContent = "" + (t ? t-- : t++);
                        });
                    }
                    ss.push(e), Bn();
                  })(function () {
                    requestAnimationFrame(i);
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
              document.body ? t() : Hn.addEventListener("DOMContentLoaded", t);
            }),
            (e.prototype.start = function () {
              var e = this;
              this.stopped &&
                ((this.stopped = !1),
                (this.observer = new MutationObserver(this.listener)),
                this.observe(),
                as.forEach(function (t) {
                  return Hn.addEventListener(t, e.listener, !0);
                }));
            }),
            (e.prototype.stop = function () {
              var e = this;
              this.stopped ||
                (this.observer && this.observer.disconnect(),
                as.forEach(function (t) {
                  return Hn.removeEventListener(t, e.listener, !0);
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
              (this.observedBox = t || $n.CONTENT_BOX),
              (this.lastReportedSize = { inlineSize: 0, blockSize: 0 });
          }
          return (
            (e.prototype.isActive = function () {
              var e,
                t = Zn(this.target, this.observedBox, !0);
              return (
                (e = this.target),
                Rn(e) ||
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
          for (var i = 0; i < e.length; i += 1) if (e[i].target === t) return i;
          return -1;
        },
        vs = (function () {
          function e() {}
          return (
            (e.connect = function (e, t) {
              var i = new hs(e, t);
              fs.set(e, i);
            }),
            (e.observe = function (e, t, i) {
              var n = fs.get(e),
                s = 0 === n.observationTargets.length;
              ms(n.observationTargets, t) < 0 &&
                (s && In.push(n),
                n.observationTargets.push(new ps(t, i && i.box)),
                us(1),
                ds.schedule());
            }),
            (e.unobserve = function (e, t) {
              var i = fs.get(e),
                n = ms(i.observationTargets, t),
                s = 1 === i.observationTargets.length;
              n >= 0 &&
                (s && In.splice(In.indexOf(i), 1),
                i.observationTargets.splice(n, 1),
                us(-1));
            }),
            (e.disconnect = function (e) {
              var t = this,
                i = fs.get(e);
              i.observationTargets.slice().forEach(function (i) {
                return t.unobserve(e, i.target);
              }),
                i.activeTargets.splice(0, i.activeTargets.length);
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
              if (!Gn(e))
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
              if (!Gn(e))
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
          return function (t, i, n, s) {
            Le(i);
            var r = Ae(t),
              o = g(r),
              a = oe(r.length),
              l = e ? a - 1 : 0,
              c = e ? -1 : 1;
            if (n < 2)
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
            for (; e ? l >= 0 : a > l; l += c) l in o && (s = i(s, o[l], l, r));
            return s;
          };
        },
        ys = [bs(!1), bs(!0)][0];
      Oe(
        { target: "Array", proto: !0, forced: je("reduce") },
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
      var Ts,
        Cs,
        Os = function () {
          var e = _(this),
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
        Ls = RegExp.prototype.exec,
        ks = String.prototype.replace,
        As = Ls,
        _s =
          ((Ts = /a/),
          (Cs = /b*/g),
          Ls.call(Ts, "a"),
          Ls.call(Cs, "a"),
          0 !== Ts.lastIndex || 0 !== Cs.lastIndex),
        Ms = void 0 !== /()??/.exec("")[1];
      (_s || Ms) &&
        (As = function (e) {
          var t,
            i,
            n,
            s,
            r = this;
          return (
            Ms && (i = new RegExp("^" + r.source + "$(?!\\s)", Os.call(r))),
            _s && (t = r.lastIndex),
            (n = Ls.call(r, e)),
            _s && n && (r.lastIndex = r.global ? n.index + n[0].length : t),
            Ms &&
              n &&
              n.length > 1 &&
              ks.call(n[0], i, function () {
                for (s = 1; s < arguments.length - 2; s++)
                  void 0 === arguments[s] && (n[s] = void 0);
              }),
            n
          );
        });
      var Ps = As;
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
          var i = "ab".split(e);
          return 2 !== i.length || "a" !== i[0] || "b" !== i[1];
        }),
        Ns = function (e, t, i, n) {
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
                  i = /a/;
                return (
                  (i.exec = function () {
                    return (t = !0), null;
                  }),
                  "split" === e &&
                    ((i.constructor = {}),
                    (i.constructor[$s] = function () {
                      return i;
                    })),
                  i[s](""),
                  !t
                );
              });
          if (!r || !o || ("replace" === e && !zs) || ("split" === e && !Is)) {
            var a = /./[s],
              c = i(s, ""[e], function (e, t, i, n, s) {
                return t.exec === Ps
                  ? r && !s
                    ? { done: !0, value: a.call(t, i, n) }
                    : { done: !0, value: e.call(i, t, n) }
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
              n && $(RegExp.prototype[s], "sham", !0);
          }
        },
        Bs = Ut.charAt,
        Ws = function (e, t, i) {
          return t + (i ? Bs(e, t).length : 1);
        },
        Ds = function (e, t) {
          var i = e.exec;
          if ("function" == typeof i) {
            var n = i.call(e, t);
            if ("object" != typeof n)
              throw TypeError(
                "RegExp exec method returned something other than an Object or null"
              );
            return n;
          }
          if ("RegExp" !== m(e))
            throw TypeError("RegExp#exec called on incompatible receiver");
          return Ps.call(e, t);
        };
      Ns("match", 1, function (e, t, i) {
        return [
          function (t) {
            var i = b(this),
              n = null == t ? void 0 : t[e];
            return void 0 !== n ? n.call(t, i) : new RegExp(t)[e](String(i));
          },
          function (e) {
            var n = i(t, e, this);
            if (n.done) return n.value;
            var s = _(e),
              r = String(this);
            if (!s.global) return Ds(s, r);
            var o = s.unicode;
            s.lastIndex = 0;
            for (var a, l = [], c = 0; null !== (a = Ds(s, r)); ) {
              var d = String(a[0]);
              (l[c] = d),
                "" === d && (s.lastIndex = Ws(r, oe(s.lastIndex), o)),
                c++;
            }
            return 0 === c ? null : l;
          },
        ];
      });
      var js = Math.max,
        Rs = Math.min,
        qs = Math.floor,
        Gs = /\$([$&'`]|\d\d?|<[^>]*>)/g,
        Hs = /\$([$&'`]|\d\d?)/g;
      Ns("replace", 2, function (e, t, i) {
        return [
          function (i, n) {
            var s = b(this),
              r = null == i ? void 0 : i[e];
            return void 0 !== r ? r.call(i, s, n) : t.call(String(s), i, n);
          },
          function (e, s) {
            var r = i(t, e, this, s);
            if (r.done) return r.value;
            var o = _(e),
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
              "" === String(p[0]) && (o.lastIndex = Ws(a, oe(o.lastIndex), d));
            }
            for (var h, f = "", m = 0, v = 0; v < u.length; v++) {
              p = u[v];
              for (
                var g = String(p[0]),
                  b = js(Rs(se(p.index), a.length), 0),
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
              } else S = n(g, a, b, y, E, s);
              b >= m && ((f += a.slice(m, b) + S), (m = b + g.length));
            }
            return f + a.slice(m);
          },
        ];
        function n(e, i, n, s, r, o) {
          var a = n + e.length,
            l = s.length,
            c = Hs;
          return (
            void 0 !== r && ((r = Ae(r)), (c = Gs)),
            t.call(o, c, function (t, o) {
              var c;
              switch (o.charAt(0)) {
                case "$":
                  return "$";
                case "&":
                  return e;
                case "`":
                  return i.slice(0, n);
                case "'":
                  return i.slice(a);
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
            var i = t.name.match(/data-simplebar-(.+)/);
            if (i) {
              var n = i[1].replace(/\W+(.)/g, function (e, t) {
                return t.toUpperCase();
              });
              switch (t.value) {
                case "true":
                  e[n] = !0;
                  break;
                case "false":
                  e[n] = !1;
                  break;
                case void 0:
                  e[n] = !0;
                  break;
                default:
                  e[n] = t.value;
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
          var i = t.body,
            n = t.createElement("div");
          n.classList.add("simplebar-hide-scrollbar"), i.appendChild(n);
          var s = n.getBoundingClientRect().right;
          i.removeChild(n), (Ys = s);
        }
        return Ys;
      }
      Xe &&
        window.addEventListener("resize", function () {
          Us !== window.devicePixelRatio &&
            ((Us = window.devicePixelRatio), (Ys = null));
        });
      var Ks = (function () {
        function e(t, i) {
          var n = this;
          (this.onScroll = function () {
            var e = Vs(n.el);
            n.scrollXTicking ||
              (e.requestAnimationFrame(n.scrollX), (n.scrollXTicking = !0)),
              n.scrollYTicking ||
                (e.requestAnimationFrame(n.scrollY), (n.scrollYTicking = !0));
          }),
            (this.scrollX = function () {
              n.axis.x.isOverflowing &&
                (n.showScrollbar("x"), n.positionScrollbar("x")),
                (n.scrollXTicking = !1);
            }),
            (this.scrollY = function () {
              n.axis.y.isOverflowing &&
                (n.showScrollbar("y"), n.positionScrollbar("y")),
                (n.scrollYTicking = !1);
            }),
            (this.onMouseEnter = function () {
              n.showScrollbar("x"), n.showScrollbar("y");
            }),
            (this.onMouseMove = function (e) {
              (n.mouseX = e.clientX),
                (n.mouseY = e.clientY),
                (n.axis.x.isOverflowing || n.axis.x.forceVisible) &&
                  n.onMouseMoveForAxis("x"),
                (n.axis.y.isOverflowing || n.axis.y.forceVisible) &&
                  n.onMouseMoveForAxis("y");
            }),
            (this.onMouseLeave = function () {
              n.onMouseMove.cancel(),
                (n.axis.x.isOverflowing || n.axis.x.forceVisible) &&
                  n.onMouseLeaveForAxis("x"),
                (n.axis.y.isOverflowing || n.axis.y.forceVisible) &&
                  n.onMouseLeaveForAxis("y"),
                (n.mouseX = -1),
                (n.mouseY = -1);
            }),
            (this.onWindowResize = function () {
              (n.scrollbarWidth = n.getScrollbarWidth()),
                n.hideNativeScrollbar();
            }),
            (this.hideScrollbars = function () {
              (n.axis.x.track.rect = n.axis.x.track.el.getBoundingClientRect()),
                (n.axis.y.track.rect =
                  n.axis.y.track.el.getBoundingClientRect()),
                n.isWithinBounds(n.axis.y.track.rect) ||
                  (n.axis.y.scrollbar.el.classList.remove(n.classNames.visible),
                  (n.axis.y.isVisible = !1)),
                n.isWithinBounds(n.axis.x.track.rect) ||
                  (n.axis.x.scrollbar.el.classList.remove(n.classNames.visible),
                  (n.axis.x.isVisible = !1));
            }),
            (this.onPointerEvent = function (e) {
              var t, i;
              (n.axis.x.track.rect = n.axis.x.track.el.getBoundingClientRect()),
                (n.axis.y.track.rect =
                  n.axis.y.track.el.getBoundingClientRect()),
                (n.axis.x.isOverflowing || n.axis.x.forceVisible) &&
                  (t = n.isWithinBounds(n.axis.x.track.rect)),
                (n.axis.y.isOverflowing || n.axis.y.forceVisible) &&
                  (i = n.isWithinBounds(n.axis.y.track.rect)),
                (t || i) &&
                  (e.preventDefault(),
                  e.stopPropagation(),
                  "mousedown" === e.type &&
                    (t &&
                      ((n.axis.x.scrollbar.rect =
                        n.axis.x.scrollbar.el.getBoundingClientRect()),
                      n.isWithinBounds(n.axis.x.scrollbar.rect)
                        ? n.onDragStart(e, "x")
                        : n.onTrackClick(e, "x")),
                    i &&
                      ((n.axis.y.scrollbar.rect =
                        n.axis.y.scrollbar.el.getBoundingClientRect()),
                      n.isWithinBounds(n.axis.y.scrollbar.rect)
                        ? n.onDragStart(e, "y")
                        : n.onTrackClick(e, "y"))));
            }),
            (this.drag = function (t) {
              var i = n.axis[n.draggedAxis].track,
                s = i.rect[n.axis[n.draggedAxis].sizeAttr],
                r = n.axis[n.draggedAxis].scrollbar,
                o = n.contentWrapperEl[n.axis[n.draggedAxis].scrollSizeAttr],
                a = parseInt(n.elStyles[n.axis[n.draggedAxis].sizeAttr], 10);
              t.preventDefault(), t.stopPropagation();
              var l =
                ((("y" === n.draggedAxis ? t.pageY : t.pageX) -
                  i.rect[n.axis[n.draggedAxis].offsetAttr] -
                  n.axis[n.draggedAxis].dragOffset) /
                  (s - r.size)) *
                (o - a);
              "x" === n.draggedAxis &&
                ((l =
                  n.isRtl && e.getRtlHelpers().isRtlScrollbarInverted
                    ? l - (s + r.size)
                    : l),
                (l =
                  n.isRtl && e.getRtlHelpers().isRtlScrollingInverted
                    ? -l
                    : l)),
                (n.contentWrapperEl[n.axis[n.draggedAxis].scrollOffsetAttr] =
                  l);
            }),
            (this.onEndDrag = function (e) {
              var t = Xs(n.el),
                i = Vs(n.el);
              e.preventDefault(),
                e.stopPropagation(),
                n.el.classList.remove(n.classNames.dragging),
                t.removeEventListener("mousemove", n.drag, !0),
                t.removeEventListener("mouseup", n.onEndDrag, !0),
                (n.removePreventClickId = i.setTimeout(function () {
                  t.removeEventListener("click", n.preventClick, !0),
                    t.removeEventListener("dblclick", n.preventClick, !0),
                    (n.removePreventClickId = null);
                }));
            }),
            (this.preventClick = function (e) {
              e.preventDefault(), e.stopPropagation();
            }),
            (this.el = t),
            (this.minScrollbarWidth = 20),
            (this.options = Object.assign({}, e.defaultOptions, {}, i)),
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
              ((this.recalculate = Fi(this.recalculate.bind(this), 64)),
              (this.onMouseMove = Fi(this.onMouseMove.bind(this), 64)),
              (this.hideScrollbars = an(
                this.hideScrollbars.bind(this),
                this.options.timeout
              )),
              (this.onWindowResize = an(this.onWindowResize.bind(this), 64, {
                leading: !0,
              })),
              (e.getRtlHelpers = zn(e.getRtlHelpers)),
              this.init());
        }
        (e.getRtlHelpers = function () {
          var t = document.createElement("div");
          t.innerHTML =
            '<div class="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%; margin: 10px 0;"></div></div>';
          var i = t.firstElementChild;
          document.body.appendChild(i);
          var n = i.firstElementChild;
          i.scrollLeft = 0;
          var s = e.getOffset(i),
            r = e.getOffset(n);
          i.scrollLeft = 999;
          var o = e.getOffset(n);
          return {
            isRtlScrollingInverted: s.left !== r.left && r.left - o.left != 0,
            isRtlScrollbarInverted: s.left !== r.left,
          };
        }),
          (e.getOffset = function (e) {
            var t = e.getBoundingClientRect(),
              i = Xs(e),
              n = Vs(e);
            return {
              top: t.top + (n.pageYOffset || i.documentElement.scrollTop),
              left: t.left + (n.pageXOffset || i.documentElement.scrollLeft),
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
                  this.el.querySelector("." + this.classNames.contentWrapper)),
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
                  "." + this.classNames.track + "." + this.classNames.horizontal
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
                  this.placeholderEl.classList.add(this.classNames.placeholder),
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
                i = document.createElement("div");
              t.classList.add(this.classNames.track),
                i.classList.add(this.classNames.scrollbar),
                t.appendChild(i),
                (this.axis.x.track.el = t.cloneNode(!0)),
                this.axis.x.track.el.classList.add(this.classNames.horizontal),
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
            var i = !1,
              n = t.ResizeObserver || gs;
            (this.resizeObserver = new n(function () {
              i && e.recalculate();
            })),
              this.resizeObserver.observe(this.el),
              this.resizeObserver.observe(this.contentEl),
              t.requestAnimationFrame(function () {
                i = !0;
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
              i = this.heightAutoObserverEl.offsetWidth <= 1,
              n = this.contentEl.offsetWidth,
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
              (this.placeholderEl.style.width = i ? n + "px" : "auto"),
              (this.placeholderEl.style.height = a + "px");
            var c = this.contentWrapperEl.offsetHeight;
            (this.axis.x.isOverflowing = l > n),
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
              i = this.contentEl[this.axis[e].scrollSizeAttr],
              n = this.axis[e].track.el[this.axis[e].offsetSizeAttr],
              s = n / i;
            return (
              (t = Math.max(~~(s * n), this.options.scrollbarMinSize)),
              this.options.scrollbarMaxSize &&
                (t = Math.min(t, this.options.scrollbarMaxSize)),
              t
            );
          }),
          (t.positionScrollbar = function (t) {
            if ((void 0 === t && (t = "y"), this.axis[t].isOverflowing)) {
              var i = this.contentWrapperEl[this.axis[t].scrollSizeAttr],
                n = this.axis[t].track.el[this.axis[t].offsetSizeAttr],
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
                  (i - s),
                l = ~~((n - r.size) * a);
              (l =
                "x" === t &&
                this.isRtl &&
                e.getRtlHelpers().isRtlScrollbarInverted
                  ? l + (n - r.size)
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
              i = this.axis[e].scrollbar.el;
            this.axis[e].isOverflowing || this.axis[e].forceVisible
              ? ((t.style.visibility = "visible"),
                (this.contentWrapperEl.style[this.axis[e].overflowAttr] =
                  "scroll"))
              : ((t.style.visibility = "hidden"),
                (this.contentWrapperEl.style[this.axis[e].overflowAttr] =
                  "hidden")),
              this.axis[e].isOverflowing
                ? (i.style.display = "block")
                : (i.style.display = "none");
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
                ? this.axis[e].scrollbar.el.classList.add(this.classNames.hover)
                : this.axis[e].scrollbar.el.classList.remove(
                    this.classNames.hover
                  ),
              this.isWithinBounds(this.axis[e].track.rect)
                ? (this.showScrollbar(e),
                  this.axis[e].track.el.classList.add(this.classNames.hover))
                : this.axis[e].track.el.classList.remove(this.classNames.hover);
          }),
          (t.onMouseLeaveForAxis = function (e) {
            void 0 === e && (e = "y"),
              this.axis[e].track.el.classList.remove(this.classNames.hover),
              this.axis[e].scrollbar.el.classList.remove(this.classNames.hover);
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
            var i = Xs(this.el),
              n = Vs(this.el),
              s = this.axis[t].scrollbar,
              r = "y" === t ? e.pageY : e.pageX;
            (this.axis[t].dragOffset = r - s.rect[this.axis[t].offsetAttr]),
              (this.draggedAxis = t),
              this.el.classList.add(this.classNames.dragging),
              i.addEventListener("mousemove", this.drag, !0),
              i.addEventListener("mouseup", this.onEndDrag, !0),
              null === this.removePreventClickId
                ? (i.addEventListener("click", this.preventClick, !0),
                  i.addEventListener("dblclick", this.preventClick, !0))
                : (n.clearTimeout(this.removePreventClickId),
                  (this.removePreventClickId = null));
          }),
          (t.onTrackClick = function (e, t) {
            var i = this;
            if ((void 0 === t && (t = "y"), this.options.clickOnTrack)) {
              var n = Vs(this.el);
              this.axis[t].scrollbar.rect =
                this.axis[t].scrollbar.el.getBoundingClientRect();
              var s = this.axis[t].scrollbar.rect[this.axis[t].offsetAttr],
                r = parseInt(this.elStyles[this.axis[t].sizeAttr], 10),
                o = this.contentWrapperEl[this.axis[t].scrollOffsetAttr],
                a =
                  ("y" === t ? this.mouseY - s : this.mouseX - s) < 0 ? -1 : 1,
                l = -1 === a ? o - r : o + r;
              !(function e() {
                var s, r;
                -1 === a
                  ? o > l &&
                    ((o -= i.options.clickOnTrackSpeed),
                    i.contentWrapperEl.scrollTo(
                      (((s = {})[i.axis[t].offsetAttr] = o), s)
                    ),
                    n.requestAnimationFrame(e))
                  : o < l &&
                    ((o += i.options.clickOnTrackSpeed),
                    i.contentWrapperEl.scrollTo(
                      (((r = {})[i.axis[t].offsetAttr] = o), r)
                    ),
                    n.requestAnimationFrame(e));
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
            var i =
              e.matches ||
              e.webkitMatchesSelector ||
              e.mozMatchesSelector ||
              e.msMatchesSelector;
            return Array.prototype.filter.call(e.children, function (e) {
              return i.call(e, t);
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
          (this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this)),
            "undefined" != typeof MutationObserver &&
              ((this.globalObserver = new MutationObserver(Ks.handleMutations)),
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
      ? (module.exports = Ee())
      : "function" == typeof define && define.amd
      ? define(Ee)
      : ((we = we || self).SimpleBar = Ee()),
    document.querySelector(".themetoggle").addEventListener("click", (e) => {
      "dark" === localStorage.getItem("theme")
        ? localStorage.removeItem("theme")
        : localStorage.setItem("theme", "dark"),
        xe();
    }),
    xe(),
    (function () {
      const e = document.documentElement.clientWidth;
      document.querySelectorAll(".menu__sub-list").forEach(function (t, i, n) {
        let s = t.getBoundingClientRect().left,
          r = t.clientWidth;
        e < s + r && t.classList.add("_left");
      });
    })(),
    (window.onload = function () {
      document.addEventListener("click", function (e) {
        const t = e.target;
        t.classList.contains("search-menu__icon")
          ? (document.querySelector(".search-menu").classList.toggle("_active"),
            document.documentElement.classList.add("popup-open"))
          : !t.closest(".search-menu") &&
            document.querySelectorAll(".search-menu._active") &&
            (document.querySelector(".search-menu").classList.remove("_active"),
            document.documentElement.classList.remove("popup-open"));
        t.classList.contains("button-contacts-header") ||
        t.classList.contains("button-contacts-header__mobile") ||
        t.classList.contains("button-contacts-header__label") ||
        t.classList.contains("button-contacts-header__label-text")
          ? (document.documentElement.classList.toggle("contacts-open"),
            window.innerWidth < 767.98 &&
              (r(),
              document.querySelector(".menu-open") &&
                (document.documentElement.classList.remove("menu-open"),
                (document.querySelector(".menu__body").onmouseleave = Se),
                console.log("закрыть"))))
          : !t.closest(".contacts") &&
            document.querySelectorAll(".contacts-open") &&
            document.documentElement.classList.remove("contacts-open");
      });
    }),
    document.querySelector(".menu__body").addEventListener("click", (e) => {
      const t = e.target,
        i = t.parentElement,
        n = i.querySelector(".menu__sub-list");
      t.classList.contains("menu__button-sub-open") &&
        i &&
        n &&
        (Se(n), n.classList.toggle("_open"), i.classList.toggle("_hover")),
        t.classList.contains("menu__sub-list-back") &&
          t.parentNode.classList.remove("_open");
    }),
    (document.querySelector(".menu__body").onmouseleave = Se),
    document.querySelectorAll(".menu__sub-list").forEach(function (e, t, i) {
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
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          s &&
            (document.querySelector(".contacts-open")
              ? (document.documentElement.classList.add("menu-open"), o())
              : (r(), document.documentElement.classList.toggle("menu-open")));
        });
    })(),
    (function () {
      const e = document.querySelectorAll("[data-spollers]");
      if (e.length > 0) {
        const t = Array.from(e).filter(function (e, t, i) {
          return !e.dataset.spollers.split(",")[0];
        });
        t.length && r(t);
        let s = p(e, "spollers");
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
          let i = e.querySelectorAll("[data-spoller]");
          i.length &&
            ((i = Array.from(i).filter(
              (t) => t.closest("[data-spollers]") === e
            )),
            i.forEach((e) => {
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
            const s = t.closest("[data-spoller]"),
              r = s.closest("[data-spollers]"),
              o = !!r.hasAttribute("data-one-spoller");
            r.querySelectorAll("._slide").length ||
              (o && !s.classList.contains("_spoller-active") && l(r),
              s.classList.toggle("_spoller-active"),
              ((e, t = 500) => {
                e.hidden ? n(e, t) : i(e, t);
              })(s.nextElementSibling, 500)),
              e.preventDefault();
          }
        }
        function l(e) {
          const t = e.querySelector("[data-spoller]._spoller-active");
          t &&
            (t.classList.remove("_spoller-active"),
            i(t.nextElementSibling, 500));
        }
        s &&
          s.length &&
          s.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              r(e.itemsArray, e.matchMedia);
            }),
              r(e.itemsArray, e.matchMedia);
          });
      }
    })(),
    (function () {
      const e = document.querySelectorAll(
        "input[placeholder],textarea[placeholder]"
      );
      e.length &&
        e.forEach((e) => {
          e.dataset.placeholder = e.placeholder;
        }),
        document.body.addEventListener("focusin", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = ""),
            t.classList.add("_form-focus"),
            t.parentElement.classList.add("_form-focus"),
            h.removeError(t));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && h.validateInput(t));
        });
    })(),
    (function () {
      be = !0;
      const e = document.querySelector("header.header"),
        t = e.hasAttribute("data-scroll-show"),
        i = e.dataset.scrollShow ? e.dataset.scrollShow : 500,
        n = e.dataset.scroll ? e.dataset.scroll : 1;
      let s,
        r = 0;
      document.addEventListener("windowScroll", function (o) {
        const a = window.scrollY;
        clearTimeout(s),
          a >= n
            ? (!e.classList.contains("_header-scroll") &&
                e.classList.add("_header-scroll"),
              t &&
                (a > r
                  ? e.classList.contains("_header-show") &&
                    e.classList.remove("_header-show")
                  : !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show"),
                (s = setTimeout(() => {
                  !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show");
                }, i))))
            : (e.classList.contains("_header-scroll") &&
                e.classList.remove("_header-scroll"),
              t &&
                e.classList.contains("_header-show") &&
                e.classList.remove("_header-show")),
          (r = a <= 0 ? 0 : a);
      });
    })();
})();
