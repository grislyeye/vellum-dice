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
  var s = /* @__PURE__ */ Symbol();
  var o = /* @__PURE__ */ new WeakMap();
  var n = class {
    constructor(t7, e6, o8) {
      if (this._$cssResult$ = true, o8 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
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
    const o8 = 1 === t7.length ? t7[0] : e6.reduce((e7, s6, o9) => e7 + ((t8) => {
      if (true === t8._$cssResult$) return t8.cssText;
      if ("number" == typeof t8) return t8;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t8 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s6) + t7[o9 + 1], t7[0]);
    return new n(o8, t7, s);
  };
  var S = (s6, o8) => {
    if (e) s6.adoptedStyleSheets = o8.map((t7) => t7 instanceof CSSStyleSheet ? t7 : t7.styleSheet);
    else for (const e6 of o8) {
      const o9 = document.createElement("style"), n6 = t.litNonce;
      void 0 !== n6 && o9.setAttribute("nonce", n6), o9.textContent = e6.cssText, s6.appendChild(o9);
    }
  };
  var c = e ? (t7) => t7 : (t7) => t7 instanceof CSSStyleSheet ? ((t8) => {
    let e6 = "";
    for (const s6 of t8.cssRules) e6 += s6.cssText;
    return r(e6);
  })(t7) : t7;

  // node_modules/@lit/reactive-element/reactive-element.js
  var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
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
    let i7 = t7;
    switch (s6) {
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
  var f = (t7, s6) => !i2(t7, s6);
  var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
  Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
  var y = class extends HTMLElement {
    static addInitializer(t7) {
      this._$Ei(), (this.l ??= []).push(t7);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t7, s6 = b) {
      if (s6.state && (s6.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t7) && ((s6 = Object.create(s6)).wrapped = true), this.elementProperties.set(t7, s6), !s6.noAccessor) {
        const i7 = /* @__PURE__ */ Symbol(), h5 = this.getPropertyDescriptor(t7, i7, s6);
        void 0 !== h5 && e2(this.prototype, t7, h5);
      }
    }
    static getPropertyDescriptor(t7, s6, i7) {
      const { get: e6, set: r7 } = h(this.prototype, t7) ?? { get() {
        return this[s6];
      }, set(t8) {
        this[s6] = t8;
      } };
      return { get: e6, set(s7) {
        const h5 = e6?.call(this);
        r7?.call(this, s7), this.requestUpdate(t7, h5, i7);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t7) {
      return this.elementProperties.get(t7) ?? b;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d("elementProperties"))) return;
      const t7 = n2(this);
      t7.finalize(), void 0 !== t7.l && (this.l = [...t7.l]), this.elementProperties = new Map(t7.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d("finalized"))) return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
        const t8 = this.properties, s6 = [...r2(t8), ...o2(t8)];
        for (const i7 of s6) this.createProperty(i7, t8[i7]);
      }
      const t7 = this[Symbol.metadata];
      if (null !== t7) {
        const s6 = litPropertyMetadata.get(t7);
        if (void 0 !== s6) for (const [t8, i7] of s6) this.elementProperties.set(t8, i7);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t8, s6] of this.elementProperties) {
        const i7 = this._$Eu(t8, s6);
        void 0 !== i7 && this._$Eh.set(i7, t8);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s6) {
      const i7 = [];
      if (Array.isArray(s6)) {
        const e6 = new Set(s6.flat(1 / 0).reverse());
        for (const s7 of e6) i7.unshift(c(s7));
      } else void 0 !== s6 && i7.push(c(s6));
      return i7;
    }
    static _$Eu(t7, s6) {
      const i7 = s6.attribute;
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
      const t7 = /* @__PURE__ */ new Map(), s6 = this.constructor.elementProperties;
      for (const i7 of s6.keys()) this.hasOwnProperty(i7) && (t7.set(i7, this[i7]), delete this[i7]);
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
    attributeChangedCallback(t7, s6, i7) {
      this._$AK(t7, i7);
    }
    _$ET(t7, s6) {
      const i7 = this.constructor.elementProperties.get(t7), e6 = this.constructor._$Eu(t7, i7);
      if (void 0 !== e6 && true === i7.reflect) {
        const h5 = (void 0 !== i7.converter?.toAttribute ? i7.converter : u).toAttribute(s6, i7.type);
        this._$Em = t7, null == h5 ? this.removeAttribute(e6) : this.setAttribute(e6, h5), this._$Em = null;
      }
    }
    _$AK(t7, s6) {
      const i7 = this.constructor, e6 = i7._$Eh.get(t7);
      if (void 0 !== e6 && this._$Em !== e6) {
        const t8 = i7.getPropertyOptions(e6), h5 = "function" == typeof t8.converter ? { fromAttribute: t8.converter } : void 0 !== t8.converter?.fromAttribute ? t8.converter : u;
        this._$Em = e6;
        const r7 = h5.fromAttribute(s6, t8.type);
        this[e6] = r7 ?? this._$Ej?.get(e6) ?? r7, this._$Em = null;
      }
    }
    requestUpdate(t7, s6, i7, e6 = false, h5) {
      if (void 0 !== t7) {
        const r7 = this.constructor;
        if (false === e6 && (h5 = this[t7]), i7 ??= r7.getPropertyOptions(t7), !((i7.hasChanged ?? f)(h5, s6) || i7.useDefault && i7.reflect && h5 === this._$Ej?.get(t7) && !this.hasAttribute(r7._$Eu(t7, i7)))) return;
        this.C(t7, s6, i7);
      }
      false === this.isUpdatePending && (this._$ES = this._$EP());
    }
    C(t7, s6, { useDefault: i7, reflect: e6, wrapped: h5 }, r7) {
      i7 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t7) && (this._$Ej.set(t7, r7 ?? s6 ?? this[t7]), true !== h5 || void 0 !== r7) || (this._$AL.has(t7) || (this.hasUpdated || i7 || (s6 = void 0), this._$AL.set(t7, s6)), true === e6 && this._$Em !== t7 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t7));
    }
    async _$EP() {
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
          for (const [t9, s7] of this._$Ep) this[t9] = s7;
          this._$Ep = void 0;
        }
        const t8 = this.constructor.elementProperties;
        if (t8.size > 0) for (const [s7, i7] of t8) {
          const { wrapped: t9 } = i7, e6 = this[s7];
          true !== t9 || this._$AL.has(s7) || void 0 === e6 || this.C(s7, void 0, i7, e6);
        }
      }
      let t7 = false;
      const s6 = this._$AL;
      try {
        t7 = this.shouldUpdate(s6), t7 ? (this.willUpdate(s6), this._$EO?.forEach((t8) => t8.hostUpdate?.()), this.update(s6)) : this._$EM();
      } catch (s7) {
        throw t7 = false, this._$EM(), s7;
      }
      t7 && this._$AE(s6);
    }
    willUpdate(t7) {
    }
    _$AE(t7) {
      this._$EO?.forEach((t8) => t8.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t7)), this.updated(t7);
    }
    _$EM() {
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
      this._$Eq &&= this._$Eq.forEach((t8) => this._$ET(t8, this[t8])), this._$EM();
    }
    updated(t7) {
    }
    firstUpdated(t7) {
    }
  };
  y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.2");

  // node_modules/lit-html/lit-html.js
  var t2 = globalThis;
  var i3 = (t7) => t7;
  var s2 = t2.trustedTypes;
  var e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t7) => t7 }) : void 0;
  var h2 = "$lit$";
  var o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
  var n3 = "?" + o3;
  var r3 = `<${n3}>`;
  var l2 = document;
  var c3 = () => l2.createComment("");
  var a2 = (t7) => null === t7 || "object" != typeof t7 && "function" != typeof t7;
  var u2 = Array.isArray;
  var d2 = (t7) => u2(t7) || "function" == typeof t7?.[Symbol.iterator];
  var f2 = "[ 	\n\f\r]";
  var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var _ = /-->/g;
  var m = />/g;
  var p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var g = /'/g;
  var $ = /"/g;
  var y2 = /^(?:script|style|textarea|title)$/i;
  var x = (t7) => (i7, ...s6) => ({ _$litType$: t7, strings: i7, values: s6 });
  var b2 = x(1);
  var w = x(2);
  var T = x(3);
  var E = /* @__PURE__ */ Symbol.for("lit-noChange");
  var A = /* @__PURE__ */ Symbol.for("lit-nothing");
  var C = /* @__PURE__ */ new WeakMap();
  var P = l2.createTreeWalker(l2, 129);
  function V(t7, i7) {
    if (!u2(t7) || !t7.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== e3 ? e3.createHTML(i7) : i7;
  }
  var N = (t7, i7) => {
    const s6 = t7.length - 1, e6 = [];
    let n6, l3 = 2 === i7 ? "<svg>" : 3 === i7 ? "<math>" : "", c5 = v;
    for (let i8 = 0; i8 < s6; i8++) {
      const s7 = t7[i8];
      let a3, u3, d3 = -1, f4 = 0;
      for (; f4 < s7.length && (c5.lastIndex = f4, u3 = c5.exec(s7), null !== u3); ) f4 = c5.lastIndex, c5 === v ? "!--" === u3[1] ? c5 = _ : void 0 !== u3[1] ? c5 = m : void 0 !== u3[2] ? (y2.test(u3[2]) && (n6 = RegExp("</" + u3[2], "g")), c5 = p2) : void 0 !== u3[3] && (c5 = p2) : c5 === p2 ? ">" === u3[0] ? (c5 = n6 ?? v, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c5.lastIndex - u3[2].length, a3 = u3[1], c5 = void 0 === u3[3] ? p2 : '"' === u3[3] ? $ : g) : c5 === $ || c5 === g ? c5 = p2 : c5 === _ || c5 === m ? c5 = v : (c5 = p2, n6 = void 0);
      const x2 = c5 === p2 && t7[i8 + 1].startsWith("/>") ? " " : "";
      l3 += c5 === v ? s7 + r3 : d3 >= 0 ? (e6.push(a3), s7.slice(0, d3) + h2 + s7.slice(d3) + o3 + x2) : s7 + o3 + (-2 === d3 ? i8 : x2);
    }
    return [V(t7, l3 + (t7[s6] || "<?>") + (2 === i7 ? "</svg>" : 3 === i7 ? "</math>" : "")), e6];
  };
  var S2 = class _S {
    constructor({ strings: t7, _$litType$: i7 }, e6) {
      let r7;
      this.parts = [];
      let l3 = 0, a3 = 0;
      const u3 = t7.length - 1, d3 = this.parts, [f4, v2] = N(t7, i7);
      if (this.el = _S.createElement(f4, e6), P.currentNode = this.el.content, 2 === i7 || 3 === i7) {
        const t8 = this.el.content.firstChild;
        t8.replaceWith(...t8.childNodes);
      }
      for (; null !== (r7 = P.nextNode()) && d3.length < u3; ) {
        if (1 === r7.nodeType) {
          if (r7.hasAttributes()) for (const t8 of r7.getAttributeNames()) if (t8.endsWith(h2)) {
            const i8 = v2[a3++], s6 = r7.getAttribute(t8).split(o3), e7 = /([.?@])?(.*)/.exec(i8);
            d3.push({ type: 1, index: l3, name: e7[2], strings: s6, ctor: "." === e7[1] ? I : "?" === e7[1] ? L : "@" === e7[1] ? z : H }), r7.removeAttribute(t8);
          } else t8.startsWith(o3) && (d3.push({ type: 6, index: l3 }), r7.removeAttribute(t8));
          if (y2.test(r7.tagName)) {
            const t8 = r7.textContent.split(o3), i8 = t8.length - 1;
            if (i8 > 0) {
              r7.textContent = s2 ? s2.emptyScript : "";
              for (let s6 = 0; s6 < i8; s6++) r7.append(t8[s6], c3()), P.nextNode(), d3.push({ type: 2, index: ++l3 });
              r7.append(t8[i8], c3());
            }
          }
        } else if (8 === r7.nodeType) if (r7.data === n3) d3.push({ type: 2, index: l3 });
        else {
          let t8 = -1;
          for (; -1 !== (t8 = r7.data.indexOf(o3, t8 + 1)); ) d3.push({ type: 7, index: l3 }), t8 += o3.length - 1;
        }
        l3++;
      }
    }
    static createElement(t7, i7) {
      const s6 = l2.createElement("template");
      return s6.innerHTML = t7, s6;
    }
  };
  function M(t7, i7, s6 = t7, e6) {
    if (i7 === E) return i7;
    let h5 = void 0 !== e6 ? s6._$Co?.[e6] : s6._$Cl;
    const o8 = a2(i7) ? void 0 : i7._$litDirective$;
    return h5?.constructor !== o8 && (h5?._$AO?.(false), void 0 === o8 ? h5 = void 0 : (h5 = new o8(t7), h5._$AT(t7, s6, e6)), void 0 !== e6 ? (s6._$Co ??= [])[e6] = h5 : s6._$Cl = h5), void 0 !== h5 && (i7 = M(t7, h5._$AS(t7, i7.values), h5, e6)), i7;
  }
  var R = class {
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
      const { el: { content: i7 }, parts: s6 } = this._$AD, e6 = (t7?.creationScope ?? l2).importNode(i7, true);
      P.currentNode = e6;
      let h5 = P.nextNode(), o8 = 0, n6 = 0, r7 = s6[0];
      for (; void 0 !== r7; ) {
        if (o8 === r7.index) {
          let i8;
          2 === r7.type ? i8 = new k(h5, h5.nextSibling, this, t7) : 1 === r7.type ? i8 = new r7.ctor(h5, r7.name, r7.strings, this, t7) : 6 === r7.type && (i8 = new Z(h5, this, t7)), this._$AV.push(i8), r7 = s6[++n6];
        }
        o8 !== r7?.index && (h5 = P.nextNode(), o8++);
      }
      return P.currentNode = l2, e6;
    }
    p(t7) {
      let i7 = 0;
      for (const s6 of this._$AV) void 0 !== s6 && (void 0 !== s6.strings ? (s6._$AI(t7, s6, i7), i7 += s6.strings.length - 2) : s6._$AI(t7[i7])), i7++;
    }
  };
  var k = class _k {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t7, i7, s6, e6) {
      this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t7, this._$AB = i7, this._$AM = s6, this.options = e6, this._$Cv = e6?.isConnected ?? true;
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
      t7 = M(this, t7, i7), a2(t7) ? t7 === A || null == t7 || "" === t7 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t7 !== this._$AH && t7 !== E && this._(t7) : void 0 !== t7._$litType$ ? this.$(t7) : void 0 !== t7.nodeType ? this.T(t7) : d2(t7) ? this.k(t7) : this._(t7);
    }
    O(t7) {
      return this._$AA.parentNode.insertBefore(t7, this._$AB);
    }
    T(t7) {
      this._$AH !== t7 && (this._$AR(), this._$AH = this.O(t7));
    }
    _(t7) {
      this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t7 : this.T(l2.createTextNode(t7)), this._$AH = t7;
    }
    $(t7) {
      const { values: i7, _$litType$: s6 } = t7, e6 = "number" == typeof s6 ? this._$AC(t7) : (void 0 === s6.el && (s6.el = S2.createElement(V(s6.h, s6.h[0]), this.options)), s6);
      if (this._$AH?._$AD === e6) this._$AH.p(i7);
      else {
        const t8 = new R(e6, this), s7 = t8.u(this.options);
        t8.p(i7), this.T(s7), this._$AH = t8;
      }
    }
    _$AC(t7) {
      let i7 = C.get(t7.strings);
      return void 0 === i7 && C.set(t7.strings, i7 = new S2(t7)), i7;
    }
    k(t7) {
      u2(this._$AH) || (this._$AH = [], this._$AR());
      const i7 = this._$AH;
      let s6, e6 = 0;
      for (const h5 of t7) e6 === i7.length ? i7.push(s6 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s6 = i7[e6], s6._$AI(h5), e6++;
      e6 < i7.length && (this._$AR(s6 && s6._$AB.nextSibling, e6), i7.length = e6);
    }
    _$AR(t7 = this._$AA.nextSibling, s6) {
      for (this._$AP?.(false, true, s6); t7 !== this._$AB; ) {
        const s7 = i3(t7).nextSibling;
        i3(t7).remove(), t7 = s7;
      }
    }
    setConnected(t7) {
      void 0 === this._$AM && (this._$Cv = t7, this._$AP?.(t7));
    }
  };
  var H = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t7, i7, s6, e6, h5) {
      this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t7, this.name = i7, this._$AM = e6, this.options = h5, s6.length > 2 || "" !== s6[0] || "" !== s6[1] ? (this._$AH = Array(s6.length - 1).fill(new String()), this.strings = s6) : this._$AH = A;
    }
    _$AI(t7, i7 = this, s6, e6) {
      const h5 = this.strings;
      let o8 = false;
      if (void 0 === h5) t7 = M(this, t7, i7, 0), o8 = !a2(t7) || t7 !== this._$AH && t7 !== E, o8 && (this._$AH = t7);
      else {
        const e7 = t7;
        let n6, r7;
        for (t7 = h5[0], n6 = 0; n6 < h5.length - 1; n6++) r7 = M(this, e7[s6 + n6], i7, n6), r7 === E && (r7 = this._$AH[n6]), o8 ||= !a2(r7) || r7 !== this._$AH[n6], r7 === A ? t7 = A : t7 !== A && (t7 += (r7 ?? "") + h5[n6 + 1]), this._$AH[n6] = r7;
      }
      o8 && !e6 && this.j(t7);
    }
    j(t7) {
      t7 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t7 ?? "");
    }
  };
  var I = class extends H {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t7) {
      this.element[this.name] = t7 === A ? void 0 : t7;
    }
  };
  var L = class extends H {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t7) {
      this.element.toggleAttribute(this.name, !!t7 && t7 !== A);
    }
  };
  var z = class extends H {
    constructor(t7, i7, s6, e6, h5) {
      super(t7, i7, s6, e6, h5), this.type = 5;
    }
    _$AI(t7, i7 = this) {
      if ((t7 = M(this, t7, i7, 0) ?? A) === E) return;
      const s6 = this._$AH, e6 = t7 === A && s6 !== A || t7.capture !== s6.capture || t7.once !== s6.once || t7.passive !== s6.passive, h5 = t7 !== A && (s6 === A || e6);
      e6 && this.element.removeEventListener(this.name, this, s6), h5 && this.element.addEventListener(this.name, this, t7), this._$AH = t7;
    }
    handleEvent(t7) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t7) : this._$AH.handleEvent(t7);
    }
  };
  var Z = class {
    constructor(t7, i7, s6) {
      this.element = t7, this.type = 6, this._$AN = void 0, this._$AM = i7, this.options = s6;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t7) {
      M(this, t7);
    }
  };
  var j = { M: h2, P: o3, A: n3, C: 1, L: N, R, D: d2, V: M, I: k, H, N: L, U: z, B: I, F: Z };
  var B = t2.litHtmlPolyfillSupport;
  B?.(S2, k), (t2.litHtmlVersions ??= []).push("3.3.2");
  var D = (t7, i7, s6) => {
    const e6 = s6?.renderBefore ?? i7;
    let h5 = e6._$litPart$;
    if (void 0 === h5) {
      const t8 = s6?.renderBefore ?? null;
      e6._$litPart$ = h5 = new k(i7.insertBefore(c3(), t8), t8, void 0, s6 ?? {});
    }
    return h5._$AI(t7), h5;
  };

  // node_modules/lit-element/lit-element.js
  var s3 = globalThis;
  var i4 = class extends y {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      const t7 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t7.firstChild, t7;
    }
    update(t7) {
      const r7 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t7), this._$Do = D(r7, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return E;
    }
  };
  i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
  var o4 = s3.litElementPolyfillSupport;
  o4?.({ LitElement: i4 });
  (s3.litElementVersions ??= []).push("4.2.2");

  // node_modules/@lit/reactive-element/decorators/custom-element.js
  var t3 = (t7) => (e6, o8) => {
    void 0 !== o8 ? o8.addInitializer(() => {
      customElements.define(t7, e6);
    }) : customElements.define(t7, e6);
  };

  // node_modules/@lit/reactive-element/decorators/property.js
  var o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  var r4 = (t7 = o5, e6, r7) => {
    const { kind: n6, metadata: i7 } = r7;
    let s6 = globalThis.litPropertyMetadata.get(i7);
    if (void 0 === s6 && globalThis.litPropertyMetadata.set(i7, s6 = /* @__PURE__ */ new Map()), "setter" === n6 && ((t7 = Object.create(t7)).wrapped = true), s6.set(r7.name, t7), "accessor" === n6) {
      const { name: o8 } = r7;
      return { set(r8) {
        const n7 = e6.get.call(this);
        e6.set.call(this, r8), this.requestUpdate(o8, n7, t7, true, r8);
      }, init(e7) {
        return void 0 !== e7 && this.C(o8, void 0, t7, e7), e7;
      } };
    }
    if ("setter" === n6) {
      const { name: o8 } = r7;
      return function(r8) {
        const n7 = this[o8];
        e6.call(this, r8), this.requestUpdate(o8, n7, t7, true, r8);
      };
    }
    throw Error("Unsupported decorator location: " + n6);
  };
  function n4(t7) {
    return (e6, o8) => "object" == typeof o8 ? r4(t7, e6, o8) : ((t8, e7, o9) => {
      const r7 = e7.hasOwnProperty(o9);
      return e7.constructor.createProperty(o9, t8), r7 ? Object.getOwnPropertyDescriptor(e7, o9) : void 0;
    })(t7, e6, o8);
  }

  // node_modules/lit-html/directive-helpers.js
  var { I: t4 } = j;
  var r5 = (o8) => void 0 === o8.strings;

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
  var s4 = (i7, t7) => {
    const e6 = i7._$AN;
    if (void 0 === e6) return false;
    for (const i8 of e6) i8._$AO?.(t7, false), s4(i8, t7);
    return true;
  };
  var o6 = (i7) => {
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
    void 0 !== this._$AN ? (o6(this), this._$AM = i7, r6(this)) : this._$AM = i7;
  }
  function n5(i7, t7 = false, e6 = 0) {
    const r7 = this._$AH, h5 = this._$AN;
    if (void 0 !== h5 && 0 !== h5.size) if (t7) if (Array.isArray(r7)) for (let i8 = e6; i8 < r7.length; i8++) s4(r7[i8], false), o6(r7[i8]);
    else null != r7 && (s4(r7, false), o6(r7));
    else s4(this, i7);
  }
  var c4 = (i7) => {
    i7.type == t5.CHILD && (i7._$AP ??= n5, i7._$AQ ??= h3);
  };
  var f3 = class extends i5 {
    constructor() {
      super(...arguments), this._$AN = void 0;
    }
    _$AT(i7, t7, e6) {
      super._$AT(i7, t7, e6), r6(this), this.isConnected = i7._$AU;
    }
    _$AO(i7, t7 = true) {
      i7 !== this.isConnected && (this.isConnected = i7, i7 ? this.reconnected?.() : this.disconnected?.()), t7 && (s4(this, i7), o6(this));
    }
    setValue(t7) {
      if (r5(this._$Ct)) this._$Ct._$AI(t7, this);
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
  var t6 = async (t7, s6) => {
    for await (const i7 of t7) if (false === await s6(i7)) return;
  };
  var s5 = class {
    constructor(t7) {
      this.G = t7;
    }
    disconnect() {
      this.G = void 0;
    }
    reconnect(t7) {
      this.G = t7;
    }
    deref() {
      return this.G;
    }
  };
  var i6 = class {
    constructor() {
      this.Y = void 0, this.Z = void 0;
    }
    get() {
      return this.Y;
    }
    pause() {
      this.Y ??= new Promise((t7) => this.Z = t7);
    }
    resume() {
      this.Z?.(), this.Y = this.Z = void 0;
    }
  };

  // node_modules/lit-html/directives/async-replace.js
  var o7 = class extends f3 {
    constructor() {
      super(...arguments), this._$CK = new s5(this), this._$CX = new i6();
    }
    render(i7, s6) {
      return E;
    }
    update(i7, [s6, r7]) {
      if (this.isConnected || this.disconnected(), s6 === this._$CJ) return E;
      this._$CJ = s6;
      let n6 = 0;
      const { _$CK: o8, _$CX: h5 } = this;
      return t6(s6, async (t7) => {
        for (; h5.get(); ) await h5.get();
        const i8 = o8.deref();
        if (void 0 !== i8) {
          if (i8._$CJ !== s6) return false;
          void 0 !== r7 && (t7 = r7(t7, n6)), i8.commitValue(t7, n6), n6++;
        }
        return true;
      }), E;
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
  var h4 = e5(o7);

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
  var VellumDice = class extends i4 {
    constructor() {
      super(...arguments);
      this.animation = false;
      this.hidedice = false;
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
      return b2`
      <span @click="${() => this.reroll()}">
        ${this.roll()}${this.hidedice ? b2`&#9860` : b2` (<slot></slot>&#9860;)`}
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
  __decorateClass([
    n4({ type: Boolean })
  ], VellumDice.prototype, "hidedice", 2);
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
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directive.js:
lit-html/async-directive.js:
lit-html/directives/async-replace.js:
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

@lit/reactive-element/decorators/query-assigned-elements.js:
lit-html/directives/private-async-helpers.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
