"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i7 = decorators.length - 1, decorator; i7 >= 0; i7--)
      if (decorator = decorators[i7])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp(target, key, result);
    return result;
  };

  // node_modules/@lit/reactive-element/css-tag.js
  var t = globalThis;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var o = /* @__PURE__ */ new WeakMap();
  var n = class {
    constructor(t7, e6, o7) {
      if (this._$cssResult$ = true, o7 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t7, this.t = e6;
    }
    get styleSheet() {
      let t7 = this.o;
      const s5 = this.t;
      if (e && void 0 === t7) {
        const e6 = void 0 !== s5 && 1 === s5.length;
        e6 && (t7 = o.get(s5)), void 0 === t7 && ((this.o = t7 = new CSSStyleSheet()).replaceSync(this.cssText), e6 && o.set(s5, t7));
      }
      return t7;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t7) => new n("string" == typeof t7 ? t7 : t7 + "", void 0, s);
  var i = (t7, ...e6) => {
    const o7 = 1 === t7.length ? t7[0] : e6.reduce((e7, s5, o8) => e7 + ((t8) => {
      if (true === t8._$cssResult$) return t8.cssText;
      if ("number" == typeof t8) return t8;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t8 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s5) + t7[o8 + 1], t7[0]);
    return new n(o7, t7, s);
  };
  var S = (s5, o7) => {
    if (e) s5.adoptedStyleSheets = o7.map((t7) => t7 instanceof CSSStyleSheet ? t7 : t7.styleSheet);
    else for (const e6 of o7) {
      const o8 = document.createElement("style"), n6 = t.litNonce;
      void 0 !== n6 && o8.setAttribute("nonce", n6), o8.textContent = e6.cssText, s5.appendChild(o8);
    }
  };
  var c = e ? (t7) => t7 : (t7) => t7 instanceof CSSStyleSheet ? ((t8) => {
    let e6 = "";
    for (const s5 of t8.cssRules) e6 += s5.cssText;
    return r(e6);
  })(t7) : t7;

  // node_modules/@lit/reactive-element/reactive-element.js
  var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: r2, getOwnPropertyNames: h, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
  var a = globalThis;
  var c2 = a.trustedTypes;
  var l = c2 ? c2.emptyScript : "";
  var p = a.reactiveElementPolyfillSupport;
  var d = (t7, s5) => t7;
  var u = { toAttribute(t7, s5) {
    switch (s5) {
      case Boolean:
        t7 = t7 ? l : null;
        break;
      case Object:
      case Array:
        t7 = null == t7 ? t7 : JSON.stringify(t7);
    }
    return t7;
  }, fromAttribute(t7, s5) {
    let i7 = t7;
    switch (s5) {
      case Boolean:
        i7 = null !== t7;
        break;
      case Number:
        i7 = null === t7 ? null : Number(t7);
        break;
      case Object:
      case Array:
        try {
          i7 = JSON.parse(t7);
        } catch (t8) {
          i7 = null;
        }
    }
    return i7;
  } };
  var f = (t7, s5) => !i2(t7, s5);
  var y = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
  var b = class extends HTMLElement {
    static addInitializer(t7) {
      this._$Ei(), (this.l ??= []).push(t7);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t7, s5 = y) {
      if (s5.state && (s5.attribute = false), this._$Ei(), this.elementProperties.set(t7, s5), !s5.noAccessor) {
        const i7 = Symbol(), r7 = this.getPropertyDescriptor(t7, i7, s5);
        void 0 !== r7 && e2(this.prototype, t7, r7);
      }
    }
    static getPropertyDescriptor(t7, s5, i7) {
      const { get: e6, set: h5 } = r2(this.prototype, t7) ?? { get() {
        return this[s5];
      }, set(t8) {
        this[s5] = t8;
      } };
      return { get() {
        return e6?.call(this);
      }, set(s6) {
        const r7 = e6?.call(this);
        h5.call(this, s6), this.requestUpdate(t7, r7, i7);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t7) {
      return this.elementProperties.get(t7) ?? y;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d("elementProperties"))) return;
      const t7 = n2(this);
      t7.finalize(), void 0 !== t7.l && (this.l = [...t7.l]), this.elementProperties = new Map(t7.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d("finalized"))) return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
        const t8 = this.properties, s5 = [...h(t8), ...o2(t8)];
        for (const i7 of s5) this.createProperty(i7, t8[i7]);
      }
      const t7 = this[Symbol.metadata];
      if (null !== t7) {
        const s5 = litPropertyMetadata.get(t7);
        if (void 0 !== s5) for (const [t8, i7] of s5) this.elementProperties.set(t8, i7);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t8, s5] of this.elementProperties) {
        const i7 = this._$Eu(t8, s5);
        void 0 !== i7 && this._$Eh.set(i7, t8);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s5) {
      const i7 = [];
      if (Array.isArray(s5)) {
        const e6 = new Set(s5.flat(1 / 0).reverse());
        for (const s6 of e6) i7.unshift(c(s6));
      } else void 0 !== s5 && i7.push(c(s5));
      return i7;
    }
    static _$Eu(t7, s5) {
      const i7 = s5.attribute;
      return false === i7 ? void 0 : "string" == typeof i7 ? i7 : "string" == typeof t7 ? t7.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise((t7) => this.enableUpdating = t7), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t7) => t7(this));
    }
    addController(t7) {
      (this._$EO ??= /* @__PURE__ */ new Set()).add(t7), void 0 !== this.renderRoot && this.isConnected && t7.hostConnected?.();
    }
    removeController(t7) {
      this._$EO?.delete(t7);
    }
    _$E_() {
      const t7 = /* @__PURE__ */ new Map(), s5 = this.constructor.elementProperties;
      for (const i7 of s5.keys()) this.hasOwnProperty(i7) && (t7.set(i7, this[i7]), delete this[i7]);
      t7.size > 0 && (this._$Ep = t7);
    }
    createRenderRoot() {
      const t7 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S(t7, this.constructor.elementStyles), t7;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t7) => t7.hostConnected?.());
    }
    enableUpdating(t7) {
    }
    disconnectedCallback() {
      this._$EO?.forEach((t7) => t7.hostDisconnected?.());
    }
    attributeChangedCallback(t7, s5, i7) {
      this._$AK(t7, i7);
    }
    _$EC(t7, s5) {
      const i7 = this.constructor.elementProperties.get(t7), e6 = this.constructor._$Eu(t7, i7);
      if (void 0 !== e6 && true === i7.reflect) {
        const r7 = (void 0 !== i7.converter?.toAttribute ? i7.converter : u).toAttribute(s5, i7.type);
        this._$Em = t7, null == r7 ? this.removeAttribute(e6) : this.setAttribute(e6, r7), this._$Em = null;
      }
    }
    _$AK(t7, s5) {
      const i7 = this.constructor, e6 = i7._$Eh.get(t7);
      if (void 0 !== e6 && this._$Em !== e6) {
        const t8 = i7.getPropertyOptions(e6), r7 = "function" == typeof t8.converter ? { fromAttribute: t8.converter } : void 0 !== t8.converter?.fromAttribute ? t8.converter : u;
        this._$Em = e6, this[e6] = r7.fromAttribute(s5, t8.type), this._$Em = null;
      }
    }
    requestUpdate(t7, s5, i7) {
      if (void 0 !== t7) {
        if (i7 ??= this.constructor.getPropertyOptions(t7), !(i7.hasChanged ?? f)(this[t7], s5)) return;
        this.P(t7, s5, i7);
      }
      false === this.isUpdatePending && (this._$ES = this._$ET());
    }
    P(t7, s5, i7) {
      this._$AL.has(t7) || this._$AL.set(t7, s5), true === i7.reflect && this._$Em !== t7 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t7);
    }
    async _$ET() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t8) {
        Promise.reject(t8);
      }
      const t7 = this.scheduleUpdate();
      return null != t7 && await t7, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t9, s6] of this._$Ep) this[t9] = s6;
          this._$Ep = void 0;
        }
        const t8 = this.constructor.elementProperties;
        if (t8.size > 0) for (const [s6, i7] of t8) true !== i7.wrapped || this._$AL.has(s6) || void 0 === this[s6] || this.P(s6, this[s6], i7);
      }
      let t7 = false;
      const s5 = this._$AL;
      try {
        t7 = this.shouldUpdate(s5), t7 ? (this.willUpdate(s5), this._$EO?.forEach((t8) => t8.hostUpdate?.()), this.update(s5)) : this._$EU();
      } catch (s6) {
        throw t7 = false, this._$EU(), s6;
      }
      t7 && this._$AE(s5);
    }
    willUpdate(t7) {
    }
    _$AE(t7) {
      this._$EO?.forEach((t8) => t8.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t7)), this.updated(t7);
    }
    _$EU() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t7) {
      return true;
    }
    update(t7) {
      this._$Ej &&= this._$Ej.forEach((t8) => this._$EC(t8, this[t8])), this._$EU();
    }
    updated(t7) {
    }
    firstUpdated(t7) {
    }
  };
  b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d("elementProperties")] = /* @__PURE__ */ new Map(), b[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: b }), (a.reactiveElementVersions ??= []).push("2.0.4");

  // node_modules/lit-html/lit-html.js
  var t2 = globalThis;
  var i3 = t2.trustedTypes;
  var s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t7) => t7 }) : void 0;
  var e3 = "$lit$";
  var h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
  var o3 = "?" + h2;
  var n3 = `<${o3}>`;
  var r3 = document;
  var l2 = () => r3.createComment("");
  var c3 = (t7) => null === t7 || "object" != typeof t7 && "function" != typeof t7;
  var a2 = Array.isArray;
  var u2 = (t7) => a2(t7) || "function" == typeof t7?.[Symbol.iterator];
  var d2 = "[ 	\n\f\r]";
  var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v = /-->/g;
  var _ = />/g;
  var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var p2 = /'/g;
  var g = /"/g;
  var $ = /^(?:script|style|textarea|title)$/i;
  var y2 = (t7) => (i7, ...s5) => ({ _$litType$: t7, strings: i7, values: s5 });
  var x = y2(1);
  var b2 = y2(2);
  var w = y2(3);
  var T = Symbol.for("lit-noChange");
  var E = Symbol.for("lit-nothing");
  var A = /* @__PURE__ */ new WeakMap();
  var C = r3.createTreeWalker(r3, 129);
  function P(t7, i7) {
    if (!a2(t7) || !t7.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== s2 ? s2.createHTML(i7) : i7;
  }
  var V = (t7, i7) => {
    const s5 = t7.length - 1, o7 = [];
    let r7, l3 = 2 === i7 ? "<svg>" : 3 === i7 ? "<math>" : "", c5 = f2;
    for (let i8 = 0; i8 < s5; i8++) {
      const s6 = t7[i8];
      let a3, u3, d3 = -1, y3 = 0;
      for (; y3 < s6.length && (c5.lastIndex = y3, u3 = c5.exec(s6), null !== u3); ) y3 = c5.lastIndex, c5 === f2 ? "!--" === u3[1] ? c5 = v : void 0 !== u3[1] ? c5 = _ : void 0 !== u3[2] ? ($.test(u3[2]) && (r7 = RegExp("</" + u3[2], "g")), c5 = m) : void 0 !== u3[3] && (c5 = m) : c5 === m ? ">" === u3[0] ? (c5 = r7 ?? f2, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c5.lastIndex - u3[2].length, a3 = u3[1], c5 = void 0 === u3[3] ? m : '"' === u3[3] ? g : p2) : c5 === g || c5 === p2 ? c5 = m : c5 === v || c5 === _ ? c5 = f2 : (c5 = m, r7 = void 0);
      const x2 = c5 === m && t7[i8 + 1].startsWith("/>") ? " " : "";
      l3 += c5 === f2 ? s6 + n3 : d3 >= 0 ? (o7.push(a3), s6.slice(0, d3) + e3 + s6.slice(d3) + h2 + x2) : s6 + h2 + (-2 === d3 ? i8 : x2);
    }
    return [P(t7, l3 + (t7[s5] || "<?>") + (2 === i7 ? "</svg>" : 3 === i7 ? "</math>" : "")), o7];
  };
  var N = class _N {
    constructor({ strings: t7, _$litType$: s5 }, n6) {
      let r7;
      this.parts = [];
      let c5 = 0, a3 = 0;
      const u3 = t7.length - 1, d3 = this.parts, [f5, v2] = V(t7, s5);
      if (this.el = _N.createElement(f5, n6), C.currentNode = this.el.content, 2 === s5 || 3 === s5) {
        const t8 = this.el.content.firstChild;
        t8.replaceWith(...t8.childNodes);
      }
      for (; null !== (r7 = C.nextNode()) && d3.length < u3; ) {
        if (1 === r7.nodeType) {
          if (r7.hasAttributes()) for (const t8 of r7.getAttributeNames()) if (t8.endsWith(e3)) {
            const i7 = v2[a3++], s6 = r7.getAttribute(t8).split(h2), e6 = /([.?@])?(.*)/.exec(i7);
            d3.push({ type: 1, index: c5, name: e6[2], strings: s6, ctor: "." === e6[1] ? H : "?" === e6[1] ? I : "@" === e6[1] ? L : k }), r7.removeAttribute(t8);
          } else t8.startsWith(h2) && (d3.push({ type: 6, index: c5 }), r7.removeAttribute(t8));
          if ($.test(r7.tagName)) {
            const t8 = r7.textContent.split(h2), s6 = t8.length - 1;
            if (s6 > 0) {
              r7.textContent = i3 ? i3.emptyScript : "";
              for (let i7 = 0; i7 < s6; i7++) r7.append(t8[i7], l2()), C.nextNode(), d3.push({ type: 2, index: ++c5 });
              r7.append(t8[s6], l2());
            }
          }
        } else if (8 === r7.nodeType) if (r7.data === o3) d3.push({ type: 2, index: c5 });
        else {
          let t8 = -1;
          for (; -1 !== (t8 = r7.data.indexOf(h2, t8 + 1)); ) d3.push({ type: 7, index: c5 }), t8 += h2.length - 1;
        }
        c5++;
      }
    }
    static createElement(t7, i7) {
      const s5 = r3.createElement("template");
      return s5.innerHTML = t7, s5;
    }
  };
  function S2(t7, i7, s5 = t7, e6) {
    if (i7 === T) return i7;
    let h5 = void 0 !== e6 ? s5._$Co?.[e6] : s5._$Cl;
    const o7 = c3(i7) ? void 0 : i7._$litDirective$;
    return h5?.constructor !== o7 && (h5?._$AO?.(false), void 0 === o7 ? h5 = void 0 : (h5 = new o7(t7), h5._$AT(t7, s5, e6)), void 0 !== e6 ? (s5._$Co ??= [])[e6] = h5 : s5._$Cl = h5), void 0 !== h5 && (i7 = S2(t7, h5._$AS(t7, i7.values), h5, e6)), i7;
  }
  var M = class {
    constructor(t7, i7) {
      this._$AV = [], this._$AN = void 0, this._$AD = t7, this._$AM = i7;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t7) {
      const { el: { content: i7 }, parts: s5 } = this._$AD, e6 = (t7?.creationScope ?? r3).importNode(i7, true);
      C.currentNode = e6;
      let h5 = C.nextNode(), o7 = 0, n6 = 0, l3 = s5[0];
      for (; void 0 !== l3; ) {
        if (o7 === l3.index) {
          let i8;
          2 === l3.type ? i8 = new R(h5, h5.nextSibling, this, t7) : 1 === l3.type ? i8 = new l3.ctor(h5, l3.name, l3.strings, this, t7) : 6 === l3.type && (i8 = new z(h5, this, t7)), this._$AV.push(i8), l3 = s5[++n6];
        }
        o7 !== l3?.index && (h5 = C.nextNode(), o7++);
      }
      return C.currentNode = r3, e6;
    }
    p(t7) {
      let i7 = 0;
      for (const s5 of this._$AV) void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t7, s5, i7), i7 += s5.strings.length - 2) : s5._$AI(t7[i7])), i7++;
    }
  };
  var R = class _R {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t7, i7, s5, e6) {
      this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t7, this._$AB = i7, this._$AM = s5, this.options = e6, this._$Cv = e6?.isConnected ?? true;
    }
    get parentNode() {
      let t7 = this._$AA.parentNode;
      const i7 = this._$AM;
      return void 0 !== i7 && 11 === t7?.nodeType && (t7 = i7.parentNode), t7;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t7, i7 = this) {
      t7 = S2(this, t7, i7), c3(t7) ? t7 === E || null == t7 || "" === t7 ? (this._$AH !== E && this._$AR(), this._$AH = E) : t7 !== this._$AH && t7 !== T && this._(t7) : void 0 !== t7._$litType$ ? this.$(t7) : void 0 !== t7.nodeType ? this.T(t7) : u2(t7) ? this.k(t7) : this._(t7);
    }
    O(t7) {
      return this._$AA.parentNode.insertBefore(t7, this._$AB);
    }
    T(t7) {
      this._$AH !== t7 && (this._$AR(), this._$AH = this.O(t7));
    }
    _(t7) {
      this._$AH !== E && c3(this._$AH) ? this._$AA.nextSibling.data = t7 : this.T(r3.createTextNode(t7)), this._$AH = t7;
    }
    $(t7) {
      const { values: i7, _$litType$: s5 } = t7, e6 = "number" == typeof s5 ? this._$AC(t7) : (void 0 === s5.el && (s5.el = N.createElement(P(s5.h, s5.h[0]), this.options)), s5);
      if (this._$AH?._$AD === e6) this._$AH.p(i7);
      else {
        const t8 = new M(e6, this), s6 = t8.u(this.options);
        t8.p(i7), this.T(s6), this._$AH = t8;
      }
    }
    _$AC(t7) {
      let i7 = A.get(t7.strings);
      return void 0 === i7 && A.set(t7.strings, i7 = new N(t7)), i7;
    }
    k(t7) {
      a2(this._$AH) || (this._$AH = [], this._$AR());
      const i7 = this._$AH;
      let s5, e6 = 0;
      for (const h5 of t7) e6 === i7.length ? i7.push(s5 = new _R(this.O(l2()), this.O(l2()), this, this.options)) : s5 = i7[e6], s5._$AI(h5), e6++;
      e6 < i7.length && (this._$AR(s5 && s5._$AB.nextSibling, e6), i7.length = e6);
    }
    _$AR(t7 = this._$AA.nextSibling, i7) {
      for (this._$AP?.(false, true, i7); t7 && t7 !== this._$AB; ) {
        const i8 = t7.nextSibling;
        t7.remove(), t7 = i8;
      }
    }
    setConnected(t7) {
      void 0 === this._$AM && (this._$Cv = t7, this._$AP?.(t7));
    }
  };
  var k = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t7, i7, s5, e6, h5) {
      this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t7, this.name = i7, this._$AM = e6, this.options = h5, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = E;
    }
    _$AI(t7, i7 = this, s5, e6) {
      const h5 = this.strings;
      let o7 = false;
      if (void 0 === h5) t7 = S2(this, t7, i7, 0), o7 = !c3(t7) || t7 !== this._$AH && t7 !== T, o7 && (this._$AH = t7);
      else {
        const e7 = t7;
        let n6, r7;
        for (t7 = h5[0], n6 = 0; n6 < h5.length - 1; n6++) r7 = S2(this, e7[s5 + n6], i7, n6), r7 === T && (r7 = this._$AH[n6]), o7 ||= !c3(r7) || r7 !== this._$AH[n6], r7 === E ? t7 = E : t7 !== E && (t7 += (r7 ?? "") + h5[n6 + 1]), this._$AH[n6] = r7;
      }
      o7 && !e6 && this.j(t7);
    }
    j(t7) {
      t7 === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t7 ?? "");
    }
  };
  var H = class extends k {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t7) {
      this.element[this.name] = t7 === E ? void 0 : t7;
    }
  };
  var I = class extends k {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t7) {
      this.element.toggleAttribute(this.name, !!t7 && t7 !== E);
    }
  };
  var L = class extends k {
    constructor(t7, i7, s5, e6, h5) {
      super(t7, i7, s5, e6, h5), this.type = 5;
    }
    _$AI(t7, i7 = this) {
      if ((t7 = S2(this, t7, i7, 0) ?? E) === T) return;
      const s5 = this._$AH, e6 = t7 === E && s5 !== E || t7.capture !== s5.capture || t7.once !== s5.once || t7.passive !== s5.passive, h5 = t7 !== E && (s5 === E || e6);
      e6 && this.element.removeEventListener(this.name, this, s5), h5 && this.element.addEventListener(this.name, this, t7), this._$AH = t7;
    }
    handleEvent(t7) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t7) : this._$AH.handleEvent(t7);
    }
  };
  var z = class {
    constructor(t7, i7, s5) {
      this.element = t7, this.type = 6, this._$AN = void 0, this._$AM = i7, this.options = s5;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t7) {
      S2(this, t7);
    }
  };
  var Z = { M: e3, P: h2, A: o3, C: 1, L: V, R: M, D: u2, V: S2, I: R, H: k, N: I, U: L, B: H, F: z };
  var j = t2.litHtmlPolyfillSupport;
  j?.(N, R), (t2.litHtmlVersions ??= []).push("3.2.1");
  var B = (t7, i7, s5) => {
    const e6 = s5?.renderBefore ?? i7;
    let h5 = e6._$litPart$;
    if (void 0 === h5) {
      const t8 = s5?.renderBefore ?? null;
      e6._$litPart$ = h5 = new R(i7.insertBefore(l2(), t8), t8, void 0, s5 ?? {});
    }
    return h5._$AI(t7), h5;
  };

  // node_modules/lit-element/lit-element.js
  var r4 = class extends b {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      const t7 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t7.firstChild, t7;
    }
    update(t7) {
      const s5 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t7), this._$Do = B(s5, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return T;
    }
  };
  r4._$litElement$ = true, r4["finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: r4 });
  var i4 = globalThis.litElementPolyfillSupport;
  i4?.({ LitElement: r4 });
  (globalThis.litElementVersions ??= []).push("4.1.1");

  // node_modules/@lit/reactive-element/decorators/custom-element.js
  var t3 = (t7) => (e6, o7) => {
    void 0 !== o7 ? o7.addInitializer(() => {
      customElements.define(t7, e6);
    }) : customElements.define(t7, e6);
  };

  // node_modules/@lit/reactive-element/decorators/property.js
  var o4 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  var r5 = (t7 = o4, e6, r7) => {
    const { kind: n6, metadata: i7 } = r7;
    let s5 = globalThis.litPropertyMetadata.get(i7);
    if (void 0 === s5 && globalThis.litPropertyMetadata.set(i7, s5 = /* @__PURE__ */ new Map()), s5.set(r7.name, t7), "accessor" === n6) {
      const { name: o7 } = r7;
      return { set(r8) {
        const n7 = e6.get.call(this);
        e6.set.call(this, r8), this.requestUpdate(o7, n7, t7);
      }, init(e7) {
        return void 0 !== e7 && this.P(o7, void 0, t7), e7;
      } };
    }
    if ("setter" === n6) {
      const { name: o7 } = r7;
      return function(r8) {
        const n7 = this[o7];
        e6.call(this, r8), this.requestUpdate(o7, n7, t7);
      };
    }
    throw Error("Unsupported decorator location: " + n6);
  };
  function n4(t7) {
    return (e6, o7) => "object" == typeof o7 ? r5(t7, e6, o7) : ((t8, e7, o8) => {
      const r7 = e7.hasOwnProperty(o8);
      return e7.constructor.createProperty(o8, r7 ? { ...t8, wrapped: true } : t8), r7 ? Object.getOwnPropertyDescriptor(e7, o8) : void 0;
    })(t7, e6, o7);
  }

  // node_modules/lit-html/directive-helpers.js
  var { I: t4 } = Z;
  var f3 = (o7) => void 0 === o7.strings;

  // node_modules/lit-html/directive.js
  var t5 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e5 = (t7) => (...e6) => ({ _$litDirective$: t7, values: e6 });
  var i5 = class {
    constructor(t7) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t7, e6, i7) {
      this._$Ct = t7, this._$AM = e6, this._$Ci = i7;
    }
    _$AS(t7, e6) {
      return this.update(t7, e6);
    }
    update(t7, e6) {
      return this.render(...e6);
    }
  };

  // node_modules/lit-html/async-directive.js
  var s3 = (i7, t7) => {
    const e6 = i7._$AN;
    if (void 0 === e6) return false;
    for (const i8 of e6) i8._$AO?.(t7, false), s3(i8, t7);
    return true;
  };
  var o5 = (i7) => {
    let t7, e6;
    do {
      if (void 0 === (t7 = i7._$AM)) break;
      e6 = t7._$AN, e6.delete(i7), i7 = t7;
    } while (0 === e6?.size);
  };
  var r6 = (i7) => {
    for (let t7; t7 = i7._$AM; i7 = t7) {
      let e6 = t7._$AN;
      if (void 0 === e6) t7._$AN = e6 = /* @__PURE__ */ new Set();
      else if (e6.has(i7)) break;
      e6.add(i7), c4(t7);
    }
  };
  function h3(i7) {
    void 0 !== this._$AN ? (o5(this), this._$AM = i7, r6(this)) : this._$AM = i7;
  }
  function n5(i7, t7 = false, e6 = 0) {
    const r7 = this._$AH, h5 = this._$AN;
    if (void 0 !== h5 && 0 !== h5.size) if (t7) if (Array.isArray(r7)) for (let i8 = e6; i8 < r7.length; i8++) s3(r7[i8], false), o5(r7[i8]);
    else null != r7 && (s3(r7, false), o5(r7));
    else s3(this, i7);
  }
  var c4 = (i7) => {
    i7.type == t5.CHILD && (i7._$AP ??= n5, i7._$AQ ??= h3);
  };
  var f4 = class extends i5 {
    constructor() {
      super(...arguments), this._$AN = void 0;
    }
    _$AT(i7, t7, e6) {
      super._$AT(i7, t7, e6), r6(this), this.isConnected = i7._$AU;
    }
    _$AO(i7, t7 = true) {
      i7 !== this.isConnected && (this.isConnected = i7, i7 ? this.reconnected?.() : this.disconnected?.()), t7 && (s3(this, i7), o5(this));
    }
    setValue(t7) {
      if (f3(this._$Ct)) this._$Ct._$AI(t7, this);
      else {
        const i7 = [...this._$Ct._$AH];
        i7[this._$Ci] = t7, this._$Ct._$AI(i7, this, 0);
      }
    }
    disconnected() {
    }
    reconnected() {
    }
  };

  // node_modules/lit-html/directives/private-async-helpers.js
  var t6 = async (t7, s5) => {
    for await (const i7 of t7) if (false === await s5(i7)) return;
  };
  var s4 = class {
    constructor(t7) {
      this.Y = t7;
    }
    disconnect() {
      this.Y = void 0;
    }
    reconnect(t7) {
      this.Y = t7;
    }
    deref() {
      return this.Y;
    }
  };
  var i6 = class {
    constructor() {
      this.Z = void 0, this.q = void 0;
    }
    get() {
      return this.Z;
    }
    pause() {
      this.Z ??= new Promise((t7) => this.q = t7);
    }
    resume() {
      this.q?.(), this.Z = this.q = void 0;
    }
  };

  // node_modules/lit-html/directives/async-replace.js
  var o6 = class extends f4 {
    constructor() {
      super(...arguments), this._$CK = new s4(this), this._$CX = new i6();
    }
    render(i7, s5) {
      return T;
    }
    update(i7, [s5, r7]) {
      if (this.isConnected || this.disconnected(), s5 === this._$CJ) return T;
      this._$CJ = s5;
      let n6 = 0;
      const { _$CK: o7, _$CX: h5 } = this;
      return t6(s5, async (t7) => {
        for (; h5.get(); ) await h5.get();
        const i8 = o7.deref();
        if (void 0 !== i8) {
          if (i8._$CJ !== s5) return false;
          void 0 !== r7 && (t7 = r7(t7, n6)), i8.commitValue(t7, n6), n6++;
        }
        return true;
      }), T;
    }
    commitValue(t7, i7) {
      this.setValue(t7);
    }
    disconnected() {
      this._$CK.disconnect(), this._$CX.pause();
    }
    reconnected() {
      this._$CK.reconnect(this), this._$CX.resume();
    }
  };
  var h4 = e5(o6);

  // src/dice.ts
  var EMPTY_STR_TO_UNDEFINED = (str) => str === "" ? void 0 : str;
  function rollDice(sides) {
    return Math.floor(Math.random() * sides + 1);
  }
  var Die = class {
    static from(notation) {
      switch (notation) {
        case "d66":
          return D66;
        default:
          return new StandardDie(notation);
      }
    }
  };
  var D66 = new class extends Die {
    roll() {
      const rolls = [rollDice(6), rollDice(6)];
      return {
        result: parseInt(`${rolls[0]}${rolls[1]}`),
        rolls: `${rolls[0]} + ${rolls[1]}`
      };
    }
  }();
  var StandardDie = class extends Die {
    constructor(notation) {
      super();
      const diceNotation = /^(\d*)d(\d+)(\s*(\+|-)\s*(\d+))?$/g;
      const [, number = "1", sides = "1", , plusMinus = "+", modifier = "0"] = diceNotation.exec(notation).map(EMPTY_STR_TO_UNDEFINED);
      this.number = parseInt(number);
      this.sides = parseInt(sides);
      this.modifier = parseInt(plusMinus + modifier);
    }
    roll() {
      const rolls = Array.from(
        { length: this.number },
        () => rollDice(this.sides)
      );
      const result = rolls.reduce((a3, b3) => a3 + b3, 0) + this.modifier;
      const rollsWithModifier = this.modifier !== 0 ? [...rolls, this.modifier] : rolls;
      const roll = {
        result,
        rolls: rollsWithModifier.join(" + ")
      };
      return roll;
    }
  };

  // src/vellum-dice.ts
  async function* rollAnimation(die, count) {
    while (count > 0) {
      yield die.roll().result;
      count--;
      await new Promise((r7) => setTimeout(r7, 50));
    }
  }
  var VellumDice = class extends r4 {
    constructor() {
      super(...arguments);
      this.animation = false;
    }
    get die() {
      return this.textContent ? Die.from(this.textContent.trim()) : void 0;
    }
    reroll() {
      this.requestUpdate();
    }
    roll() {
      if (this.die) {
        return this.animation ? h4(rollAnimation(this.die, 6)) : this.die.roll().result;
      }
      return;
    }
    render() {
      return x`
      <span @click="${() => this.reroll()}">
        ${this.roll()} (<slot></slot>&#9860;)
      </span>
    `;
    }
  };
  VellumDice.styles = i`
    :host {
      display: inline;
      cursor: pointer;
      text-decoration: underline;
      font-weight: bold;
    }
  `;
  __decorateClass([
    n4({ type: Boolean })
  ], VellumDice.prototype, "animation", 2);
  VellumDice = __decorateClass([
    t3("vellum-dice")
  ], VellumDice);
})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/async-directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/private-async-helpers.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/async-replace.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
