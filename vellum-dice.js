"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i6 = decorators.length - 1, decorator; i6 >= 0; i6--)
      if (decorator = decorators[i6])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // node_modules/@lit/reactive-element/css-tag.js
  var t = globalThis;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var o = /* @__PURE__ */ new WeakMap();
  var n = class {
    constructor(t7, e6, o7) {
      if (this._$cssResult$ = true, o7 !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t7, this.t = e6;
    }
    get styleSheet() {
      let t7 = this.o;
      const s6 = this.t;
      if (e && void 0 === t7) {
        const e6 = void 0 !== s6 && 1 === s6.length;
        e6 && (t7 = o.get(s6)), void 0 === t7 && ((this.o = t7 = new CSSStyleSheet()).replaceSync(this.cssText), e6 && o.set(s6, t7));
      }
      return t7;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t7) => new n("string" == typeof t7 ? t7 : t7 + "", void 0, s);
  var i = (t7, ...e6) => {
    const o7 = 1 === t7.length ? t7[0] : e6.reduce((e7, s6, o8) => e7 + ((t8) => {
      if (true === t8._$cssResult$)
        return t8.cssText;
      if ("number" == typeof t8)
        return t8;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t8 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s6) + t7[o8 + 1], t7[0]);
    return new n(o7, t7, s);
  };
  var S = (s6, o7) => {
    if (e)
      s6.adoptedStyleSheets = o7.map((t7) => t7 instanceof CSSStyleSheet ? t7 : t7.styleSheet);
    else
      for (const e6 of o7) {
        const o8 = document.createElement("style"), n6 = t.litNonce;
        void 0 !== n6 && o8.setAttribute("nonce", n6), o8.textContent = e6.cssText, s6.appendChild(o8);
      }
  };
  var c = e ? (t7) => t7 : (t7) => t7 instanceof CSSStyleSheet ? ((t8) => {
    let e6 = "";
    for (const s6 of t8.cssRules)
      e6 += s6.cssText;
    return r(e6);
  })(t7) : t7;

  // node_modules/@lit/reactive-element/reactive-element.js
  var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: r2, getOwnPropertyNames: h, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
  var a = globalThis;
  var c2 = a.trustedTypes;
  var l = c2 ? c2.emptyScript : "";
  var p = a.reactiveElementPolyfillSupport;
  var d = (t7, s6) => t7;
  var u = { toAttribute(t7, s6) {
    switch (s6) {
      case Boolean:
        t7 = t7 ? l : null;
        break;
      case Object:
      case Array:
        t7 = null == t7 ? t7 : JSON.stringify(t7);
    }
    return t7;
  }, fromAttribute(t7, s6) {
    let i6 = t7;
    switch (s6) {
      case Boolean:
        i6 = null !== t7;
        break;
      case Number:
        i6 = null === t7 ? null : Number(t7);
        break;
      case Object:
      case Array:
        try {
          i6 = JSON.parse(t7);
        } catch (t8) {
          i6 = null;
        }
    }
    return i6;
  } };
  var f = (t7, s6) => !i2(t7, s6);
  var y = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
  var b = class extends HTMLElement {
    static addInitializer(t7) {
      this._$Ei(), (this.l ??= []).push(t7);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t7, s6 = y) {
      if (s6.state && (s6.attribute = false), this._$Ei(), this.elementProperties.set(t7, s6), !s6.noAccessor) {
        const i6 = Symbol(), r7 = this.getPropertyDescriptor(t7, i6, s6);
        void 0 !== r7 && e2(this.prototype, t7, r7);
      }
    }
    static getPropertyDescriptor(t7, s6, i6) {
      const { get: e6, set: h5 } = r2(this.prototype, t7) ?? { get() {
        return this[s6];
      }, set(t8) {
        this[s6] = t8;
      } };
      return { get() {
        return e6?.call(this);
      }, set(s7) {
        const r7 = e6?.call(this);
        h5.call(this, s7), this.requestUpdate(t7, r7, i6);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t7) {
      return this.elementProperties.get(t7) ?? y;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d("elementProperties")))
        return;
      const t7 = n2(this);
      t7.finalize(), void 0 !== t7.l && (this.l = [...t7.l]), this.elementProperties = new Map(t7.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d("finalized")))
        return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
        const t8 = this.properties, s6 = [...h(t8), ...o2(t8)];
        for (const i6 of s6)
          this.createProperty(i6, t8[i6]);
      }
      const t7 = this[Symbol.metadata];
      if (null !== t7) {
        const s6 = litPropertyMetadata.get(t7);
        if (void 0 !== s6)
          for (const [t8, i6] of s6)
            this.elementProperties.set(t8, i6);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t8, s6] of this.elementProperties) {
        const i6 = this._$Eu(t8, s6);
        void 0 !== i6 && this._$Eh.set(i6, t8);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s6) {
      const i6 = [];
      if (Array.isArray(s6)) {
        const e6 = new Set(s6.flat(1 / 0).reverse());
        for (const s7 of e6)
          i6.unshift(c(s7));
      } else
        void 0 !== s6 && i6.push(c(s6));
      return i6;
    }
    static _$Eu(t7, s6) {
      const i6 = s6.attribute;
      return false === i6 ? void 0 : "string" == typeof i6 ? i6 : "string" == typeof t7 ? t7.toLowerCase() : void 0;
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
      const t7 = /* @__PURE__ */ new Map(), s6 = this.constructor.elementProperties;
      for (const i6 of s6.keys())
        this.hasOwnProperty(i6) && (t7.set(i6, this[i6]), delete this[i6]);
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
    attributeChangedCallback(t7, s6, i6) {
      this._$AK(t7, i6);
    }
    _$EC(t7, s6) {
      const i6 = this.constructor.elementProperties.get(t7), e6 = this.constructor._$Eu(t7, i6);
      if (void 0 !== e6 && true === i6.reflect) {
        const r7 = (void 0 !== i6.converter?.toAttribute ? i6.converter : u).toAttribute(s6, i6.type);
        this._$Em = t7, null == r7 ? this.removeAttribute(e6) : this.setAttribute(e6, r7), this._$Em = null;
      }
    }
    _$AK(t7, s6) {
      const i6 = this.constructor, e6 = i6._$Eh.get(t7);
      if (void 0 !== e6 && this._$Em !== e6) {
        const t8 = i6.getPropertyOptions(e6), r7 = "function" == typeof t8.converter ? { fromAttribute: t8.converter } : void 0 !== t8.converter?.fromAttribute ? t8.converter : u;
        this._$Em = e6, this[e6] = r7.fromAttribute(s6, t8.type), this._$Em = null;
      }
    }
    requestUpdate(t7, s6, i6) {
      if (void 0 !== t7) {
        if (i6 ??= this.constructor.getPropertyOptions(t7), !(i6.hasChanged ?? f)(this[t7], s6))
          return;
        this.P(t7, s6, i6);
      }
      false === this.isUpdatePending && (this._$ES = this._$ET());
    }
    P(t7, s6, i6) {
      this._$AL.has(t7) || this._$AL.set(t7, s6), true === i6.reflect && this._$Em !== t7 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t7);
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
      if (!this.isUpdatePending)
        return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t9, s7] of this._$Ep)
            this[t9] = s7;
          this._$Ep = void 0;
        }
        const t8 = this.constructor.elementProperties;
        if (t8.size > 0)
          for (const [s7, i6] of t8)
            true !== i6.wrapped || this._$AL.has(s7) || void 0 === this[s7] || this.P(s7, this[s7], i6);
      }
      let t7 = false;
      const s6 = this._$AL;
      try {
        t7 = this.shouldUpdate(s6), t7 ? (this.willUpdate(s6), this._$EO?.forEach((t8) => t8.hostUpdate?.()), this.update(s6)) : this._$EU();
      } catch (s7) {
        throw t7 = false, this._$EU(), s7;
      }
      t7 && this._$AE(s6);
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
  var h2 = `lit$${(Math.random() + "").slice(9)}$`;
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
  var y2 = (t7) => (i6, ...s6) => ({ _$litType$: t7, strings: i6, values: s6 });
  var x = y2(1);
  var b2 = y2(2);
  var w = Symbol.for("lit-noChange");
  var T = Symbol.for("lit-nothing");
  var A = /* @__PURE__ */ new WeakMap();
  var E = r3.createTreeWalker(r3, 129);
  function C(t7, i6) {
    if (!Array.isArray(t7) || !t7.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return void 0 !== s2 ? s2.createHTML(i6) : i6;
  }
  var P = (t7, i6) => {
    const s6 = t7.length - 1, o7 = [];
    let r7, l3 = 2 === i6 ? "<svg>" : "", c5 = f2;
    for (let i7 = 0; i7 < s6; i7++) {
      const s7 = t7[i7];
      let a3, u3, d3 = -1, y3 = 0;
      for (; y3 < s7.length && (c5.lastIndex = y3, u3 = c5.exec(s7), null !== u3); )
        y3 = c5.lastIndex, c5 === f2 ? "!--" === u3[1] ? c5 = v : void 0 !== u3[1] ? c5 = _ : void 0 !== u3[2] ? ($.test(u3[2]) && (r7 = RegExp("</" + u3[2], "g")), c5 = m) : void 0 !== u3[3] && (c5 = m) : c5 === m ? ">" === u3[0] ? (c5 = r7 ?? f2, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c5.lastIndex - u3[2].length, a3 = u3[1], c5 = void 0 === u3[3] ? m : '"' === u3[3] ? g : p2) : c5 === g || c5 === p2 ? c5 = m : c5 === v || c5 === _ ? c5 = f2 : (c5 = m, r7 = void 0);
      const x2 = c5 === m && t7[i7 + 1].startsWith("/>") ? " " : "";
      l3 += c5 === f2 ? s7 + n3 : d3 >= 0 ? (o7.push(a3), s7.slice(0, d3) + e3 + s7.slice(d3) + h2 + x2) : s7 + h2 + (-2 === d3 ? i7 : x2);
    }
    return [C(t7, l3 + (t7[s6] || "<?>") + (2 === i6 ? "</svg>" : "")), o7];
  };
  var V = class _V {
    constructor({ strings: t7, _$litType$: s6 }, n6) {
      let r7;
      this.parts = [];
      let c5 = 0, a3 = 0;
      const u3 = t7.length - 1, d3 = this.parts, [f5, v2] = P(t7, s6);
      if (this.el = _V.createElement(f5, n6), E.currentNode = this.el.content, 2 === s6) {
        const t8 = this.el.content.firstChild;
        t8.replaceWith(...t8.childNodes);
      }
      for (; null !== (r7 = E.nextNode()) && d3.length < u3; ) {
        if (1 === r7.nodeType) {
          if (r7.hasAttributes())
            for (const t8 of r7.getAttributeNames())
              if (t8.endsWith(e3)) {
                const i6 = v2[a3++], s7 = r7.getAttribute(t8).split(h2), e6 = /([.?@])?(.*)/.exec(i6);
                d3.push({ type: 1, index: c5, name: e6[2], strings: s7, ctor: "." === e6[1] ? k : "?" === e6[1] ? H : "@" === e6[1] ? I : R }), r7.removeAttribute(t8);
              } else
                t8.startsWith(h2) && (d3.push({ type: 6, index: c5 }), r7.removeAttribute(t8));
          if ($.test(r7.tagName)) {
            const t8 = r7.textContent.split(h2), s7 = t8.length - 1;
            if (s7 > 0) {
              r7.textContent = i3 ? i3.emptyScript : "";
              for (let i6 = 0; i6 < s7; i6++)
                r7.append(t8[i6], l2()), E.nextNode(), d3.push({ type: 2, index: ++c5 });
              r7.append(t8[s7], l2());
            }
          }
        } else if (8 === r7.nodeType)
          if (r7.data === o3)
            d3.push({ type: 2, index: c5 });
          else {
            let t8 = -1;
            for (; -1 !== (t8 = r7.data.indexOf(h2, t8 + 1)); )
              d3.push({ type: 7, index: c5 }), t8 += h2.length - 1;
          }
        c5++;
      }
    }
    static createElement(t7, i6) {
      const s6 = r3.createElement("template");
      return s6.innerHTML = t7, s6;
    }
  };
  function N(t7, i6, s6 = t7, e6) {
    if (i6 === w)
      return i6;
    let h5 = void 0 !== e6 ? s6._$Co?.[e6] : s6._$Cl;
    const o7 = c3(i6) ? void 0 : i6._$litDirective$;
    return h5?.constructor !== o7 && (h5?._$AO?.(false), void 0 === o7 ? h5 = void 0 : (h5 = new o7(t7), h5._$AT(t7, s6, e6)), void 0 !== e6 ? (s6._$Co ??= [])[e6] = h5 : s6._$Cl = h5), void 0 !== h5 && (i6 = N(t7, h5._$AS(t7, i6.values), h5, e6)), i6;
  }
  var S2 = class {
    constructor(t7, i6) {
      this._$AV = [], this._$AN = void 0, this._$AD = t7, this._$AM = i6;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t7) {
      const { el: { content: i6 }, parts: s6 } = this._$AD, e6 = (t7?.creationScope ?? r3).importNode(i6, true);
      E.currentNode = e6;
      let h5 = E.nextNode(), o7 = 0, n6 = 0, l3 = s6[0];
      for (; void 0 !== l3; ) {
        if (o7 === l3.index) {
          let i7;
          2 === l3.type ? i7 = new M(h5, h5.nextSibling, this, t7) : 1 === l3.type ? i7 = new l3.ctor(h5, l3.name, l3.strings, this, t7) : 6 === l3.type && (i7 = new L(h5, this, t7)), this._$AV.push(i7), l3 = s6[++n6];
        }
        o7 !== l3?.index && (h5 = E.nextNode(), o7++);
      }
      return E.currentNode = r3, e6;
    }
    p(t7) {
      let i6 = 0;
      for (const s6 of this._$AV)
        void 0 !== s6 && (void 0 !== s6.strings ? (s6._$AI(t7, s6, i6), i6 += s6.strings.length - 2) : s6._$AI(t7[i6])), i6++;
    }
  };
  var M = class _M {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t7, i6, s6, e6) {
      this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t7, this._$AB = i6, this._$AM = s6, this.options = e6, this._$Cv = e6?.isConnected ?? true;
    }
    get parentNode() {
      let t7 = this._$AA.parentNode;
      const i6 = this._$AM;
      return void 0 !== i6 && 11 === t7?.nodeType && (t7 = i6.parentNode), t7;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t7, i6 = this) {
      t7 = N(this, t7, i6), c3(t7) ? t7 === T || null == t7 || "" === t7 ? (this._$AH !== T && this._$AR(), this._$AH = T) : t7 !== this._$AH && t7 !== w && this._(t7) : void 0 !== t7._$litType$ ? this.$(t7) : void 0 !== t7.nodeType ? this.T(t7) : u2(t7) ? this.k(t7) : this._(t7);
    }
    S(t7) {
      return this._$AA.parentNode.insertBefore(t7, this._$AB);
    }
    T(t7) {
      this._$AH !== t7 && (this._$AR(), this._$AH = this.S(t7));
    }
    _(t7) {
      this._$AH !== T && c3(this._$AH) ? this._$AA.nextSibling.data = t7 : this.T(r3.createTextNode(t7)), this._$AH = t7;
    }
    $(t7) {
      const { values: i6, _$litType$: s6 } = t7, e6 = "number" == typeof s6 ? this._$AC(t7) : (void 0 === s6.el && (s6.el = V.createElement(C(s6.h, s6.h[0]), this.options)), s6);
      if (this._$AH?._$AD === e6)
        this._$AH.p(i6);
      else {
        const t8 = new S2(e6, this), s7 = t8.u(this.options);
        t8.p(i6), this.T(s7), this._$AH = t8;
      }
    }
    _$AC(t7) {
      let i6 = A.get(t7.strings);
      return void 0 === i6 && A.set(t7.strings, i6 = new V(t7)), i6;
    }
    k(t7) {
      a2(this._$AH) || (this._$AH = [], this._$AR());
      const i6 = this._$AH;
      let s6, e6 = 0;
      for (const h5 of t7)
        e6 === i6.length ? i6.push(s6 = new _M(this.S(l2()), this.S(l2()), this, this.options)) : s6 = i6[e6], s6._$AI(h5), e6++;
      e6 < i6.length && (this._$AR(s6 && s6._$AB.nextSibling, e6), i6.length = e6);
    }
    _$AR(t7 = this._$AA.nextSibling, i6) {
      for (this._$AP?.(false, true, i6); t7 && t7 !== this._$AB; ) {
        const i7 = t7.nextSibling;
        t7.remove(), t7 = i7;
      }
    }
    setConnected(t7) {
      void 0 === this._$AM && (this._$Cv = t7, this._$AP?.(t7));
    }
  };
  var R = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t7, i6, s6, e6, h5) {
      this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t7, this.name = i6, this._$AM = e6, this.options = h5, s6.length > 2 || "" !== s6[0] || "" !== s6[1] ? (this._$AH = Array(s6.length - 1).fill(new String()), this.strings = s6) : this._$AH = T;
    }
    _$AI(t7, i6 = this, s6, e6) {
      const h5 = this.strings;
      let o7 = false;
      if (void 0 === h5)
        t7 = N(this, t7, i6, 0), o7 = !c3(t7) || t7 !== this._$AH && t7 !== w, o7 && (this._$AH = t7);
      else {
        const e7 = t7;
        let n6, r7;
        for (t7 = h5[0], n6 = 0; n6 < h5.length - 1; n6++)
          r7 = N(this, e7[s6 + n6], i6, n6), r7 === w && (r7 = this._$AH[n6]), o7 ||= !c3(r7) || r7 !== this._$AH[n6], r7 === T ? t7 = T : t7 !== T && (t7 += (r7 ?? "") + h5[n6 + 1]), this._$AH[n6] = r7;
      }
      o7 && !e6 && this.j(t7);
    }
    j(t7) {
      t7 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t7 ?? "");
    }
  };
  var k = class extends R {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t7) {
      this.element[this.name] = t7 === T ? void 0 : t7;
    }
  };
  var H = class extends R {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t7) {
      this.element.toggleAttribute(this.name, !!t7 && t7 !== T);
    }
  };
  var I = class extends R {
    constructor(t7, i6, s6, e6, h5) {
      super(t7, i6, s6, e6, h5), this.type = 5;
    }
    _$AI(t7, i6 = this) {
      if ((t7 = N(this, t7, i6, 0) ?? T) === w)
        return;
      const s6 = this._$AH, e6 = t7 === T && s6 !== T || t7.capture !== s6.capture || t7.once !== s6.once || t7.passive !== s6.passive, h5 = t7 !== T && (s6 === T || e6);
      e6 && this.element.removeEventListener(this.name, this, s6), h5 && this.element.addEventListener(this.name, this, t7), this._$AH = t7;
    }
    handleEvent(t7) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t7) : this._$AH.handleEvent(t7);
    }
  };
  var L = class {
    constructor(t7, i6, s6) {
      this.element = t7, this.type = 6, this._$AN = void 0, this._$AM = i6, this.options = s6;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t7) {
      N(this, t7);
    }
  };
  var z = { P: e3, A: h2, C: o3, M: 1, L: P, R: S2, D: u2, V: N, I: M, H: R, N: H, U: I, B: k, F: L };
  var Z = t2.litHtmlPolyfillSupport;
  Z?.(V, M), (t2.litHtmlVersions ??= []).push("3.1.2");
  var j = (t7, i6, s6) => {
    const e6 = s6?.renderBefore ?? i6;
    let h5 = e6._$litPart$;
    if (void 0 === h5) {
      const t8 = s6?.renderBefore ?? null;
      e6._$litPart$ = h5 = new M(i6.insertBefore(l2(), t8), t8, void 0, s6 ?? {});
    }
    return h5._$AI(t7), h5;
  };

  // node_modules/lit-element/lit-element.js
  var s3 = class extends b {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      const t7 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t7.firstChild, t7;
    }
    update(t7) {
      const i6 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t7), this._$Do = j(i6, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return w;
    }
  };
  s3._$litElement$ = true, s3["finalized", "finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: s3 });
  var r4 = globalThis.litElementPolyfillSupport;
  r4?.({ LitElement: s3 });
  (globalThis.litElementVersions ??= []).push("4.0.4");

  // node_modules/@lit/reactive-element/decorators/custom-element.js
  var t3 = (t7) => (e6, o7) => {
    void 0 !== o7 ? o7.addInitializer(() => {
      customElements.define(t7, e6);
    }) : customElements.define(t7, e6);
  };

  // node_modules/@lit/reactive-element/decorators/property.js
  var o4 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  var r5 = (t7 = o4, e6, r7) => {
    const { kind: n6, metadata: i6 } = r7;
    let s6 = globalThis.litPropertyMetadata.get(i6);
    if (void 0 === s6 && globalThis.litPropertyMetadata.set(i6, s6 = /* @__PURE__ */ new Map()), s6.set(r7.name, t7), "accessor" === n6) {
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
  var { I: t4 } = z;
  var f3 = (o7) => void 0 === o7.strings;

  // node_modules/lit-html/directive.js
  var t5 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e5 = (t7) => (...e6) => ({ _$litDirective$: t7, values: e6 });
  var i4 = class {
    constructor(t7) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t7, e6, i6) {
      this._$Ct = t7, this._$AM = e6, this._$Ci = i6;
    }
    _$AS(t7, e6) {
      return this.update(t7, e6);
    }
    update(t7, e6) {
      return this.render(...e6);
    }
  };

  // node_modules/lit-html/async-directive.js
  var s4 = (i6, t7) => {
    const e6 = i6._$AN;
    if (void 0 === e6)
      return false;
    for (const i7 of e6)
      i7._$AO?.(t7, false), s4(i7, t7);
    return true;
  };
  var o5 = (i6) => {
    let t7, e6;
    do {
      if (void 0 === (t7 = i6._$AM))
        break;
      e6 = t7._$AN, e6.delete(i6), i6 = t7;
    } while (0 === e6?.size);
  };
  var r6 = (i6) => {
    for (let t7; t7 = i6._$AM; i6 = t7) {
      let e6 = t7._$AN;
      if (void 0 === e6)
        t7._$AN = e6 = /* @__PURE__ */ new Set();
      else if (e6.has(i6))
        break;
      e6.add(i6), c4(t7);
    }
  };
  function h3(i6) {
    void 0 !== this._$AN ? (o5(this), this._$AM = i6, r6(this)) : this._$AM = i6;
  }
  function n5(i6, t7 = false, e6 = 0) {
    const r7 = this._$AH, h5 = this._$AN;
    if (void 0 !== h5 && 0 !== h5.size)
      if (t7)
        if (Array.isArray(r7))
          for (let i7 = e6; i7 < r7.length; i7++)
            s4(r7[i7], false), o5(r7[i7]);
        else
          null != r7 && (s4(r7, false), o5(r7));
      else
        s4(this, i6);
  }
  var c4 = (i6) => {
    i6.type == t5.CHILD && (i6._$AP ??= n5, i6._$AQ ??= h3);
  };
  var f4 = class extends i4 {
    constructor() {
      super(...arguments), this._$AN = void 0;
    }
    _$AT(i6, t7, e6) {
      super._$AT(i6, t7, e6), r6(this), this.isConnected = i6._$AU;
    }
    _$AO(i6, t7 = true) {
      i6 !== this.isConnected && (this.isConnected = i6, i6 ? this.reconnected?.() : this.disconnected?.()), t7 && (s4(this, i6), o5(this));
    }
    setValue(t7) {
      if (f3(this._$Ct))
        this._$Ct._$AI(t7, this);
      else {
        const i6 = [...this._$Ct._$AH];
        i6[this._$Ci] = t7, this._$Ct._$AI(i6, this, 0);
      }
    }
    disconnected() {
    }
    reconnected() {
    }
  };

  // node_modules/lit-html/directives/private-async-helpers.js
  var t6 = async (t7, s6) => {
    for await (const i6 of t7)
      if (false === await s6(i6))
        return;
  };
  var s5 = class {
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
  var i5 = class {
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
      super(...arguments), this._$CK = new s5(this), this._$CX = new i5();
    }
    render(i6, s6) {
      return w;
    }
    update(i6, [s6, r7]) {
      if (this.isConnected || this.disconnected(), s6 === this._$CJ)
        return w;
      this._$CJ = s6;
      let n6 = 0;
      const { _$CK: o7, _$CX: h5 } = this;
      return t6(s6, async (t7) => {
        for (; h5.get(); )
          await h5.get();
        const i7 = o7.deref();
        if (void 0 !== i7) {
          if (i7._$CJ !== s6)
            return false;
          void 0 !== r7 && (t7 = r7(t7, n6)), i7.commitValue(t7, n6), n6++;
        }
        return true;
      }), w;
    }
    commitValue(t7, i6) {
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
      await new Promise((r7) => setTimeout(r7, 30));
    }
  }
  var VellumDice = class extends s3 {
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
      <span @click="${this.reroll}">
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
