var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
const p$1 = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p$1();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e$3 = Symbol(), n$5 = /* @__PURE__ */ new Map();
class s$3 {
  constructor(t2, n2) {
    if (this._$cssResult$ = true, n2 !== e$3)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2;
  }
  get styleSheet() {
    let e2 = n$5.get(this.cssText);
    return t$1 && e2 === void 0 && (n$5.set(this.cssText, e2 = new CSSStyleSheet()), e2.replaceSync(this.cssText)), e2;
  }
  toString() {
    return this.cssText;
  }
}
const o$3 = (t2) => new s$3(typeof t2 == "string" ? t2 : t2 + "", e$3), r$2 = (t2, ...n2) => {
  const o2 = t2.length === 1 ? t2[0] : n2.reduce((e2, n3, s2) => e2 + ((t3) => {
    if (t3._$cssResult$ === true)
      return t3.cssText;
    if (typeof t3 == "number")
      return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n3) + t2[s2 + 1], t2[0]);
  return new s$3(o2, e$3);
}, i$2 = (e2, n2) => {
  t$1 ? e2.adoptedStyleSheets = n2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n2.forEach((t2) => {
    const n3 = document.createElement("style"), s2 = window.litNonce;
    s2 !== void 0 && n3.setAttribute("nonce", s2), n3.textContent = t2.cssText, e2.appendChild(n3);
  });
}, S$1 = t$1 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const n2 of t3.cssRules)
    e2 += n2.cssText;
  return o$3(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$2;
const e$2 = window.trustedTypes, r$1 = e$2 ? e$2.emptyScript : "", h$1 = window.reactiveElementPolyfillSupport, o$2 = { toAttribute(t2, i2) {
  switch (i2) {
    case Boolean:
      t2 = t2 ? r$1 : null;
      break;
    case Object:
    case Array:
      t2 = t2 == null ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, i2) {
  let s2 = t2;
  switch (i2) {
    case Boolean:
      s2 = t2 !== null;
      break;
    case Number:
      s2 = t2 === null ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        s2 = JSON.parse(t2);
      } catch (t3) {
        s2 = null;
      }
  }
  return s2;
} }, n$4 = (t2, i2) => i2 !== t2 && (i2 == i2 || t2 == t2), l$2 = { attribute: true, type: String, converter: o$2, reflect: false, hasChanged: n$4 };
class a$1 extends HTMLElement {
  constructor() {
    super(), this._$Et = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
  }
  static addInitializer(t2) {
    var i2;
    (i2 = this.l) !== null && i2 !== void 0 || (this.l = []), this.l.push(t2);
  }
  static get observedAttributes() {
    this.finalize();
    const t2 = [];
    return this.elementProperties.forEach((i2, s2) => {
      const e2 = this._$Eh(s2, i2);
      e2 !== void 0 && (this._$Eu.set(e2, s2), t2.push(e2));
    }), t2;
  }
  static createProperty(t2, i2 = l$2) {
    if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t2, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t2)) {
      const s2 = typeof t2 == "symbol" ? Symbol() : "__" + t2, e2 = this.getPropertyDescriptor(t2, s2, i2);
      e2 !== void 0 && Object.defineProperty(this.prototype, t2, e2);
    }
  }
  static getPropertyDescriptor(t2, i2, s2) {
    return { get() {
      return this[i2];
    }, set(e2) {
      const r2 = this[t2];
      this[i2] = e2, this.requestUpdate(t2, r2, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) || l$2;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t2 = Object.getPrototypeOf(this);
    if (t2.finalize(), this.elementProperties = new Map(t2.elementProperties), this._$Eu = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t3 = this.properties, i2 = [...Object.getOwnPropertyNames(t3), ...Object.getOwnPropertySymbols(t3)];
      for (const s2 of i2)
        this.createProperty(s2, t3[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i2) {
    const s2 = [];
    if (Array.isArray(i2)) {
      const e2 = new Set(i2.flat(1 / 0).reverse());
      for (const i3 of e2)
        s2.unshift(S$1(i3));
    } else
      i2 !== void 0 && s2.push(S$1(i2));
    return s2;
  }
  static _$Eh(t2, i2) {
    const s2 = i2.attribute;
    return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t2 == "string" ? t2.toLowerCase() : void 0;
  }
  o() {
    var t2;
    this._$Ep = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$Em(), this.requestUpdate(), (t2 = this.constructor.l) === null || t2 === void 0 || t2.forEach((t3) => t3(this));
  }
  addController(t2) {
    var i2, s2;
    ((i2 = this._$Eg) !== null && i2 !== void 0 ? i2 : this._$Eg = []).push(t2), this.renderRoot !== void 0 && this.isConnected && ((s2 = t2.hostConnected) === null || s2 === void 0 || s2.call(t2));
  }
  removeController(t2) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.splice(this._$Eg.indexOf(t2) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t2, i2) => {
      this.hasOwnProperty(i2) && (this._$Et.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t2;
    const s2 = (t2 = this.shadowRoot) !== null && t2 !== void 0 ? t2 : this.attachShadow(this.constructor.shadowRootOptions);
    return i$2(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t2;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t2 = this._$Eg) === null || t2 === void 0 || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostConnected) === null || i2 === void 0 ? void 0 : i2.call(t3);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    (t2 = this._$Eg) === null || t2 === void 0 || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostDisconnected) === null || i2 === void 0 ? void 0 : i2.call(t3);
    });
  }
  attributeChangedCallback(t2, i2, s2) {
    this._$AK(t2, s2);
  }
  _$ES(t2, i2, s2 = l$2) {
    var e2, r2;
    const h2 = this.constructor._$Eh(t2, s2);
    if (h2 !== void 0 && s2.reflect === true) {
      const n2 = ((r2 = (e2 = s2.converter) === null || e2 === void 0 ? void 0 : e2.toAttribute) !== null && r2 !== void 0 ? r2 : o$2.toAttribute)(i2, s2.type);
      this._$Ei = t2, n2 == null ? this.removeAttribute(h2) : this.setAttribute(h2, n2), this._$Ei = null;
    }
  }
  _$AK(t2, i2) {
    var s2, e2, r2;
    const h2 = this.constructor, n2 = h2._$Eu.get(t2);
    if (n2 !== void 0 && this._$Ei !== n2) {
      const t3 = h2.getPropertyOptions(n2), l2 = t3.converter, a2 = (r2 = (e2 = (s2 = l2) === null || s2 === void 0 ? void 0 : s2.fromAttribute) !== null && e2 !== void 0 ? e2 : typeof l2 == "function" ? l2 : null) !== null && r2 !== void 0 ? r2 : o$2.fromAttribute;
      this._$Ei = n2, this[n2] = a2(i2, t3.type), this._$Ei = null;
    }
  }
  requestUpdate(t2, i2, s2) {
    let e2 = true;
    t2 !== void 0 && (((s2 = s2 || this.constructor.getPropertyOptions(t2)).hasChanged || n$4)(this[t2], i2) ? (this._$AL.has(t2) || this._$AL.set(t2, i2), s2.reflect === true && this._$Ei !== t2 && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t2, s2))) : e2 = false), !this.isUpdatePending && e2 && (this._$Ep = this._$E_());
  }
  async _$E_() {
    this.isUpdatePending = true;
    try {
      await this._$Ep;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return t2 != null && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t2;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Et && (this._$Et.forEach((t3, i3) => this[i3] = t3), this._$Et = void 0);
    let i2 = false;
    const s2 = this._$AL;
    try {
      i2 = this.shouldUpdate(s2), i2 ? (this.willUpdate(s2), (t2 = this._$Eg) === null || t2 === void 0 || t2.forEach((t3) => {
        var i3;
        return (i3 = t3.hostUpdate) === null || i3 === void 0 ? void 0 : i3.call(t3);
      }), this.update(s2)) : this._$EU();
    } catch (t3) {
      throw i2 = false, this._$EU(), t3;
    }
    i2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.forEach((t3) => {
      var i3;
      return (i3 = t3.hostUpdated) === null || i3 === void 0 ? void 0 : i3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$EC !== void 0 && (this._$EC.forEach((t3, i2) => this._$ES(i2, this[i2], t3)), this._$EC = void 0), this._$EU();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
a$1.finalized = true, a$1.elementProperties = /* @__PURE__ */ new Map(), a$1.elementStyles = [], a$1.shadowRootOptions = { mode: "open" }, h$1 == null || h$1({ ReactiveElement: a$1 }), ((s$2 = globalThis.reactiveElementVersions) !== null && s$2 !== void 0 ? s$2 : globalThis.reactiveElementVersions = []).push("1.3.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;
const i$1 = globalThis.trustedTypes, s$1 = i$1 ? i$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e$1 = `lit$${(Math.random() + "").slice(9)}$`, o$1 = "?" + e$1, n$3 = `<${o$1}>`, l$1 = document, h = (t2 = "") => l$1.createComment(t2), r = (t2) => t2 === null || typeof t2 != "object" && typeof t2 != "function", d = Array.isArray, u = (t2) => {
  var i2;
  return d(t2) || typeof ((i2 = t2) === null || i2 === void 0 ? void 0 : i2[Symbol.iterator]) == "function";
}, c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, a = />/g, f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, _ = /'/g, m = /"/g, g = /^(?:script|style|textarea|title)$/i, p = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), $ = p(1), b = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), T = /* @__PURE__ */ new WeakMap(), x = (t2, i2, s2) => {
  var e2, o2;
  const n2 = (e2 = s2 == null ? void 0 : s2.renderBefore) !== null && e2 !== void 0 ? e2 : i2;
  let l2 = n2._$litPart$;
  if (l2 === void 0) {
    const t3 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
    n2._$litPart$ = l2 = new N(i2.insertBefore(h(), t3), t3, void 0, s2 != null ? s2 : {});
  }
  return l2._$AI(t2), l2;
}, A = l$1.createTreeWalker(l$1, 129, null, false), C = (t2, i2) => {
  const o2 = t2.length - 1, l2 = [];
  let h2, r2 = i2 === 2 ? "<svg>" : "", d2 = c;
  for (let i3 = 0; i3 < o2; i3++) {
    const s2 = t2[i3];
    let o3, u3, p2 = -1, $2 = 0;
    for (; $2 < s2.length && (d2.lastIndex = $2, u3 = d2.exec(s2), u3 !== null); )
      $2 = d2.lastIndex, d2 === c ? u3[1] === "!--" ? d2 = v : u3[1] !== void 0 ? d2 = a : u3[2] !== void 0 ? (g.test(u3[2]) && (h2 = RegExp("</" + u3[2], "g")), d2 = f) : u3[3] !== void 0 && (d2 = f) : d2 === f ? u3[0] === ">" ? (d2 = h2 != null ? h2 : c, p2 = -1) : u3[1] === void 0 ? p2 = -2 : (p2 = d2.lastIndex - u3[2].length, o3 = u3[1], d2 = u3[3] === void 0 ? f : u3[3] === '"' ? m : _) : d2 === m || d2 === _ ? d2 = f : d2 === v || d2 === a ? d2 = c : (d2 = f, h2 = void 0);
    const y = d2 === f && t2[i3 + 1].startsWith("/>") ? " " : "";
    r2 += d2 === c ? s2 + n$3 : p2 >= 0 ? (l2.push(o3), s2.slice(0, p2) + "$lit$" + s2.slice(p2) + e$1 + y) : s2 + e$1 + (p2 === -2 ? (l2.push(void 0), i3) : y);
  }
  const u2 = r2 + (t2[o2] || "<?>") + (i2 === 2 ? "</svg>" : "");
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [s$1 !== void 0 ? s$1.createHTML(u2) : u2, l2];
};
class E {
  constructor({ strings: t2, _$litType$: s2 }, n2) {
    let l2;
    this.parts = [];
    let r2 = 0, d2 = 0;
    const u2 = t2.length - 1, c2 = this.parts, [v2, a2] = C(t2, s2);
    if (this.el = E.createElement(v2, n2), A.currentNode = this.el.content, s2 === 2) {
      const t3 = this.el.content, i2 = t3.firstChild;
      i2.remove(), t3.append(...i2.childNodes);
    }
    for (; (l2 = A.nextNode()) !== null && c2.length < u2; ) {
      if (l2.nodeType === 1) {
        if (l2.hasAttributes()) {
          const t3 = [];
          for (const i2 of l2.getAttributeNames())
            if (i2.endsWith("$lit$") || i2.startsWith(e$1)) {
              const s3 = a2[d2++];
              if (t3.push(i2), s3 !== void 0) {
                const t4 = l2.getAttribute(s3.toLowerCase() + "$lit$").split(e$1), i3 = /([.?@])?(.*)/.exec(s3);
                c2.push({ type: 1, index: r2, name: i3[2], strings: t4, ctor: i3[1] === "." ? M : i3[1] === "?" ? H : i3[1] === "@" ? I : S });
              } else
                c2.push({ type: 6, index: r2 });
            }
          for (const i2 of t3)
            l2.removeAttribute(i2);
        }
        if (g.test(l2.tagName)) {
          const t3 = l2.textContent.split(e$1), s3 = t3.length - 1;
          if (s3 > 0) {
            l2.textContent = i$1 ? i$1.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              l2.append(t3[i2], h()), A.nextNode(), c2.push({ type: 2, index: ++r2 });
            l2.append(t3[s3], h());
          }
        }
      } else if (l2.nodeType === 8)
        if (l2.data === o$1)
          c2.push({ type: 2, index: r2 });
        else {
          let t3 = -1;
          for (; (t3 = l2.data.indexOf(e$1, t3 + 1)) !== -1; )
            c2.push({ type: 7, index: r2 }), t3 += e$1.length - 1;
        }
      r2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = l$1.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function P(t2, i2, s2 = t2, e2) {
  var o2, n2, l2, h2;
  if (i2 === b)
    return i2;
  let d2 = e2 !== void 0 ? (o2 = s2._$Cl) === null || o2 === void 0 ? void 0 : o2[e2] : s2._$Cu;
  const u2 = r(i2) ? void 0 : i2._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u2 && ((n2 = d2 == null ? void 0 : d2._$AO) === null || n2 === void 0 || n2.call(d2, false), u2 === void 0 ? d2 = void 0 : (d2 = new u2(t2), d2._$AT(t2, s2, e2)), e2 !== void 0 ? ((l2 = (h2 = s2)._$Cl) !== null && l2 !== void 0 ? l2 : h2._$Cl = [])[e2] = d2 : s2._$Cu = d2), d2 !== void 0 && (i2 = P(t2, d2._$AS(t2, i2.values), d2, e2)), i2;
}
class V {
  constructor(t2, i2) {
    this.v = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t2) {
    var i2;
    const { el: { content: s2 }, parts: e2 } = this._$AD, o2 = ((i2 = t2 == null ? void 0 : t2.creationScope) !== null && i2 !== void 0 ? i2 : l$1).importNode(s2, true);
    A.currentNode = o2;
    let n2 = A.nextNode(), h2 = 0, r2 = 0, d2 = e2[0];
    for (; d2 !== void 0; ) {
      if (h2 === d2.index) {
        let i3;
        d2.type === 2 ? i3 = new N(n2, n2.nextSibling, this, t2) : d2.type === 1 ? i3 = new d2.ctor(n2, d2.name, d2.strings, this, t2) : d2.type === 6 && (i3 = new L(n2, this, t2)), this.v.push(i3), d2 = e2[++r2];
      }
      h2 !== (d2 == null ? void 0 : d2.index) && (n2 = A.nextNode(), h2++);
    }
    return o2;
  }
  m(t2) {
    let i2 = 0;
    for (const s2 of this.v)
      s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class N {
  constructor(t2, i2, s2, e2) {
    var o2;
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cg = (o2 = e2 == null ? void 0 : e2.isConnected) === null || o2 === void 0 || o2;
  }
  get _$AU() {
    var t2, i2;
    return (i2 = (t2 = this._$AM) === null || t2 === void 0 ? void 0 : t2._$AU) !== null && i2 !== void 0 ? i2 : this._$Cg;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return i2 !== void 0 && t2.nodeType === 11 && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = P(this, t2, i2), r(t2) ? t2 === w || t2 == null || t2 === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t2 !== this._$AH && t2 !== b && this.$(t2) : t2._$litType$ !== void 0 ? this.T(t2) : t2.nodeType !== void 0 ? this.k(t2) : u(t2) ? this.S(t2) : this.$(t2);
  }
  A(t2, i2 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t2, i2);
  }
  k(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.A(t2));
  }
  $(t2) {
    this._$AH !== w && r(this._$AH) ? this._$AA.nextSibling.data = t2 : this.k(l$1.createTextNode(t2)), this._$AH = t2;
  }
  T(t2) {
    var i2;
    const { values: s2, _$litType$: e2 } = t2, o2 = typeof e2 == "number" ? this._$AC(t2) : (e2.el === void 0 && (e2.el = E.createElement(e2.h, this.options)), e2);
    if (((i2 = this._$AH) === null || i2 === void 0 ? void 0 : i2._$AD) === o2)
      this._$AH.m(s2);
    else {
      const t3 = new V(o2, this), i3 = t3.p(this.options);
      t3.m(s2), this.k(i3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = T.get(t2.strings);
    return i2 === void 0 && T.set(t2.strings, i2 = new E(t2)), i2;
  }
  S(t2) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const o2 of t2)
      e2 === i2.length ? i2.push(s2 = new N(this.A(h()), this.A(h()), this, this.options)) : s2 = i2[e2], s2._$AI(o2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var s2;
    for ((s2 = this._$AP) === null || s2 === void 0 || s2.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var i2;
    this._$AM === void 0 && (this._$Cg = t2, (i2 = this._$AP) === null || i2 === void 0 || i2.call(this, t2));
  }
}
class S {
  constructor(t2, i2, s2, e2, o2) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = w;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const o2 = this.strings;
    let n2 = false;
    if (o2 === void 0)
      t2 = P(this, t2, i2, 0), n2 = !r(t2) || t2 !== this._$AH && t2 !== b, n2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let l2, h2;
      for (t2 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
        h2 = P(this, e3[s2 + l2], i2, l2), h2 === b && (h2 = this._$AH[l2]), n2 || (n2 = !r(h2) || h2 !== this._$AH[l2]), h2 === w ? t2 = w : t2 !== w && (t2 += (h2 != null ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.C(t2);
  }
  C(t2) {
    t2 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 != null ? t2 : "");
  }
}
class M extends S {
  constructor() {
    super(...arguments), this.type = 3;
  }
  C(t2) {
    this.element[this.name] = t2 === w ? void 0 : t2;
  }
}
const k = i$1 ? i$1.emptyScript : "";
class H extends S {
  constructor() {
    super(...arguments), this.type = 4;
  }
  C(t2) {
    t2 && t2 !== w ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
  }
}
class I extends S {
  constructor(t2, i2, s2, e2, o2) {
    super(t2, i2, s2, e2, o2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    var s2;
    if ((t2 = (s2 = P(this, t2, i2, 0)) !== null && s2 !== void 0 ? s2 : w) === b)
      return;
    const e2 = this._$AH, o2 = t2 === w && e2 !== w || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, n2 = t2 !== w && (e2 === w || o2);
    o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var i2, s2;
    typeof this._$AH == "function" ? this._$AH.call((s2 = (i2 = this.options) === null || i2 === void 0 ? void 0 : i2.host) !== null && s2 !== void 0 ? s2 : this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class L {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    P(this, t2);
  }
}
const z = window.litHtmlPolyfillSupport;
z == null || z(E, N), ((t = globalThis.litHtmlVersions) !== null && t !== void 0 ? t : globalThis.litHtmlVersions = []).push("2.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l, o;
class s extends a$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
  }
  createRenderRoot() {
    var t2, e2;
    const i2 = super.createRenderRoot();
    return (t2 = (e2 = this.renderOptions).renderBefore) !== null && t2 !== void 0 || (e2.renderBefore = i2.firstChild), i2;
  }
  update(t2) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Dt = x(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t2;
    super.connectedCallback(), (t2 = this._$Dt) === null || t2 === void 0 || t2.setConnected(true);
  }
  disconnectedCallback() {
    var t2;
    super.disconnectedCallback(), (t2 = this._$Dt) === null || t2 === void 0 || t2.setConnected(false);
  }
  render() {
    return b;
  }
}
s.finalized = true, s._$litElement$ = true, (l = globalThis.litElementHydrateSupport) === null || l === void 0 || l.call(globalThis, { LitElement: s });
const n$2 = globalThis.litElementPolyfillSupport;
n$2 == null || n$2({ LitElement: s });
((o = globalThis.litElementVersions) !== null && o !== void 0 ? o : globalThis.litElementVersions = []).push("3.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$1 = (n2) => (e2) => typeof e2 == "function" ? ((n3, e3) => (window.customElements.define(n3, e3), e3))(n2, e2) : ((n3, e3) => {
  const { kind: t2, elements: i2 } = e3;
  return { kind: t2, elements: i2, finisher(e4) {
    window.customElements.define(n3, e4);
  } };
})(n2, e2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i = (i2, e2) => e2.kind === "method" && e2.descriptor && !("value" in e2.descriptor) ? __spreadProps(__spreadValues({}, e2), { finisher(n2) {
  n2.createProperty(e2.key, i2);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e2.key, initializer() {
  typeof e2.initializer == "function" && (this[e2.key] = e2.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e2.key, i2);
} };
function e(e2) {
  return (n2, t2) => t2 !== void 0 ? ((i2, e3, n3) => {
    e3.constructor.createProperty(n3, i2);
  })(e2, n2, t2) : i(e2, n2);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n;
((n = window.HTMLSlotElement) === null || n === void 0 ? void 0 : n.prototype.assignedElements) != null ? (o2, n2) => o2.assignedElements(n2) : (o2, n2) => o2.assignedNodes(n2).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function signum(num) {
  if (num < 0) {
    return -1;
  } else {
    if (num === 0) {
      return 0;
    } else {
      return 1;
    }
  }
}
function lerp(start, stop, amount) {
  return (1 - amount) * start + amount * stop;
}
function clampInt(min, max, input) {
  if (input < min) {
    return min;
  } else {
    if (input > max) {
      return max;
    }
  }
  return input;
}
function clampDouble(min, max, input) {
  if (input < min) {
    return min;
  } else {
    if (input > max) {
      return max;
    }
  }
  return input;
}
function sanitizeDegreesDouble(degrees) {
  degrees = degrees % 360;
  if (degrees < 0) {
    degrees = degrees + 360;
  }
  return degrees;
}
function differenceDegrees(a2, b2) {
  return 180 - Math.abs(Math.abs(a2 - b2) - 180);
}
function matrixMultiply(row, matrix) {
  const a2 = row[0] * matrix[0][0] + row[1] * matrix[0][1] + row[2] * matrix[0][2];
  const b2 = row[0] * matrix[1][0] + row[1] * matrix[1][1] + row[2] * matrix[1][2];
  const c2 = row[0] * matrix[2][0] + row[1] * matrix[2][1] + row[2] * matrix[2][2];
  return [a2, b2, c2];
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function argbFromRgb(red, green, blue) {
  return (255 << 24 | (red & 255) << 16 | (green & 255) << 8 | blue & 255) >>> 0;
}
function redFromArgb(argb) {
  return argb >> 16 & 255;
}
function greenFromArgb(argb) {
  return argb >> 8 & 255;
}
function blueFromArgb(argb) {
  return argb & 255;
}
function srgbToXyz() {
  return [
    [0.41233895, 0.35762064, 0.18051042],
    [0.2126, 0.7152, 0.0722],
    [0.01932141, 0.11916382, 0.95034478]
  ];
}
function xyzToSrgb() {
  return [
    [3.2406, -1.5372, -0.4986],
    [-0.9689, 1.8758, 0.0415],
    [0.0557, -0.204, 1.057]
  ];
}
function argbFromXyz(x2, y, z2) {
  const linearRgb = matrixMultiply([x2, y, z2], xyzToSrgb());
  const r2 = delinearized(linearRgb[0]);
  const g2 = delinearized(linearRgb[1]);
  const b2 = delinearized(linearRgb[2]);
  return argbFromRgb(r2, g2, b2);
}
function xyzFromArgb(argb) {
  const r2 = linearized(redFromArgb(argb));
  const g2 = linearized(greenFromArgb(argb));
  const b2 = linearized(blueFromArgb(argb));
  return matrixMultiply([r2, g2, b2], srgbToXyz());
}
function argbFromLstar(lstar) {
  const fy = (lstar + 16) / 116;
  const fz = fy;
  const fx = fy;
  const kappa = 24389 / 27;
  const epsilon = 216 / 24389;
  const lExceedsEpsilonKappa = lstar > 8;
  const y = lExceedsEpsilonKappa ? fy * fy * fy : lstar / kappa;
  const cubeExceedEpsilon = fy * fy * fy > epsilon;
  const x2 = cubeExceedEpsilon ? fx * fx * fx : lstar / kappa;
  const z2 = cubeExceedEpsilon ? fz * fz * fz : lstar / kappa;
  const whitePoint = whitePointD65();
  return argbFromXyz(x2 * whitePoint[0], y * whitePoint[1], z2 * whitePoint[2]);
}
function lstarFromArgb(argb) {
  const y = xyzFromArgb(argb)[1] / 100;
  const e2 = 216 / 24389;
  if (y <= e2) {
    return 24389 / 27 * y;
  } else {
    const yIntermediate = Math.pow(y, 1 / 3);
    return 116 * yIntermediate - 16;
  }
}
function yFromLstar(lstar) {
  const ke = 8;
  if (lstar > ke) {
    return Math.pow((lstar + 16) / 116, 3) * 100;
  } else {
    return lstar / 24389 / 27 * 100;
  }
}
function linearized(rgbComponent) {
  const normalized = rgbComponent / 255;
  if (normalized <= 0.040449936) {
    return normalized / 12.92 * 100;
  } else {
    return Math.pow((normalized + 0.055) / 1.055, 2.4) * 100;
  }
}
function delinearized(rgbComponent) {
  const normalized = rgbComponent / 100;
  let delinearized2 = 0;
  if (normalized <= 31308e-7) {
    delinearized2 = normalized * 12.92;
  } else {
    delinearized2 = 1.055 * Math.pow(normalized, 1 / 2.4) - 0.055;
  }
  return clampInt(0, 255, Math.round(delinearized2 * 255));
}
function whitePointD65() {
  return [95.047, 100, 108.883];
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ViewingConditions {
  constructor(n2, aw, nbb, ncb, c2, nc, rgbD, fl, fLRoot, z2) {
    this.n = n2;
    this.aw = aw;
    this.nbb = nbb;
    this.ncb = ncb;
    this.c = c2;
    this.nc = nc;
    this.rgbD = rgbD;
    this.fl = fl;
    this.fLRoot = fLRoot;
    this.z = z2;
  }
  static make(whitePoint = whitePointD65(), adaptingLuminance = 200 / Math.PI * yFromLstar(50) / 100, backgroundLstar = 50, surround = 2, discountingIlluminant = false) {
    const xyz = whitePoint;
    const rW = xyz[0] * 0.401288 + xyz[1] * 0.650173 + xyz[2] * -0.051461;
    const gW = xyz[0] * -0.250268 + xyz[1] * 1.204414 + xyz[2] * 0.045854;
    const bW = xyz[0] * -2079e-6 + xyz[1] * 0.048952 + xyz[2] * 0.953127;
    const f2 = 0.8 + surround / 10;
    const c2 = f2 >= 0.9 ? lerp(0.59, 0.69, (f2 - 0.9) * 10) : lerp(0.525, 0.59, (f2 - 0.8) * 10);
    let d2 = discountingIlluminant ? 1 : f2 * (1 - 1 / 3.6 * Math.exp((-adaptingLuminance - 42) / 92));
    d2 = d2 > 1 ? 1 : d2 < 0 ? 0 : d2;
    const nc = f2;
    const rgbD = [
      d2 * (100 / rW) + 1 - d2,
      d2 * (100 / gW) + 1 - d2,
      d2 * (100 / bW) + 1 - d2
    ];
    const k2 = 1 / (5 * adaptingLuminance + 1);
    const k4 = k2 * k2 * k2 * k2;
    const k4F = 1 - k4;
    const fl = k4 * adaptingLuminance + 0.1 * k4F * k4F * Math.cbrt(5 * adaptingLuminance);
    const n2 = yFromLstar(backgroundLstar) / whitePoint[1];
    const z2 = 1.48 + Math.sqrt(n2);
    const nbb = 0.725 / Math.pow(n2, 0.2);
    const ncb = nbb;
    const rgbAFactors = [
      Math.pow(fl * rgbD[0] * rW / 100, 0.42),
      Math.pow(fl * rgbD[1] * gW / 100, 0.42),
      Math.pow(fl * rgbD[2] * bW / 100, 0.42)
    ];
    const rgbA = [
      400 * rgbAFactors[0] / (rgbAFactors[0] + 27.13),
      400 * rgbAFactors[1] / (rgbAFactors[1] + 27.13),
      400 * rgbAFactors[2] / (rgbAFactors[2] + 27.13)
    ];
    const aw = (2 * rgbA[0] + rgbA[1] + 0.05 * rgbA[2]) * nbb;
    return new ViewingConditions(n2, aw, nbb, ncb, c2, nc, rgbD, fl, Math.pow(fl, 0.25), z2);
  }
}
ViewingConditions.DEFAULT = ViewingConditions.make();
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class CAM16 {
  constructor(hue, chroma, j, q, m2, s2, jstar, astar, bstar) {
    this.hue = hue;
    this.chroma = chroma;
    this.j = j;
    this.q = q;
    this.m = m2;
    this.s = s2;
    this.jstar = jstar;
    this.astar = astar;
    this.bstar = bstar;
  }
  distance(other) {
    const dJ = this.jstar - other.jstar;
    const dA = this.astar - other.astar;
    const dB = this.bstar - other.bstar;
    const dEPrime = Math.sqrt(dJ * dJ + dA * dA + dB * dB);
    const dE = 1.41 * Math.pow(dEPrime, 0.63);
    return dE;
  }
  static fromInt(argb) {
    return CAM16.fromIntInViewingConditions(argb, ViewingConditions.DEFAULT);
  }
  static fromIntInViewingConditions(argb, viewingConditions) {
    const red = (argb & 16711680) >> 16;
    const green = (argb & 65280) >> 8;
    const blue = argb & 255;
    const redL = linearized(red);
    const greenL = linearized(green);
    const blueL = linearized(blue);
    const x2 = 0.41233895 * redL + 0.35762064 * greenL + 0.18051042 * blueL;
    const y = 0.2126 * redL + 0.7152 * greenL + 0.0722 * blueL;
    const z2 = 0.01932141 * redL + 0.11916382 * greenL + 0.95034478 * blueL;
    const rC = 0.401288 * x2 + 0.650173 * y - 0.051461 * z2;
    const gC = -0.250268 * x2 + 1.204414 * y + 0.045854 * z2;
    const bC = -2079e-6 * x2 + 0.048952 * y + 0.953127 * z2;
    const rD = viewingConditions.rgbD[0] * rC;
    const gD = viewingConditions.rgbD[1] * gC;
    const bD = viewingConditions.rgbD[2] * bC;
    const rAF = Math.pow(viewingConditions.fl * Math.abs(rD) / 100, 0.42);
    const gAF = Math.pow(viewingConditions.fl * Math.abs(gD) / 100, 0.42);
    const bAF = Math.pow(viewingConditions.fl * Math.abs(bD) / 100, 0.42);
    const rA = signum(rD) * 400 * rAF / (rAF + 27.13);
    const gA = signum(gD) * 400 * gAF / (gAF + 27.13);
    const bA = signum(bD) * 400 * bAF / (bAF + 27.13);
    const a2 = (11 * rA + -12 * gA + bA) / 11;
    const b2 = (rA + gA - 2 * bA) / 9;
    const u2 = (20 * rA + 20 * gA + 21 * bA) / 20;
    const p2 = (40 * rA + 20 * gA + bA) / 20;
    const atan2 = Math.atan2(b2, a2);
    const atanDegrees = atan2 * 180 / Math.PI;
    const hue = atanDegrees < 0 ? atanDegrees + 360 : atanDegrees >= 360 ? atanDegrees - 360 : atanDegrees;
    const hueRadians = hue * Math.PI / 180;
    const ac = p2 * viewingConditions.nbb;
    const j = 100 * Math.pow(ac / viewingConditions.aw, viewingConditions.c * viewingConditions.z);
    const q = 4 / viewingConditions.c * Math.sqrt(j / 100) * (viewingConditions.aw + 4) * viewingConditions.fLRoot;
    const huePrime = hue < 20.14 ? hue + 360 : hue;
    const eHue = 0.25 * (Math.cos(huePrime * Math.PI / 180 + 2) + 3.8);
    const p1 = 5e4 / 13 * eHue * viewingConditions.nc * viewingConditions.ncb;
    const t2 = p1 * Math.sqrt(a2 * a2 + b2 * b2) / (u2 + 0.305);
    const alpha = Math.pow(t2, 0.9) * Math.pow(1.64 - Math.pow(0.29, viewingConditions.n), 0.73);
    const c2 = alpha * Math.sqrt(j / 100);
    const m2 = c2 * viewingConditions.fLRoot;
    const s2 = 50 * Math.sqrt(alpha * viewingConditions.c / (viewingConditions.aw + 4));
    const jstar = (1 + 100 * 7e-3) * j / (1 + 7e-3 * j);
    const mstar = 1 / 0.0228 * Math.log(1 + 0.0228 * m2);
    const astar = mstar * Math.cos(hueRadians);
    const bstar = mstar * Math.sin(hueRadians);
    return new CAM16(hue, c2, j, q, m2, s2, jstar, astar, bstar);
  }
  static fromJch(j, c2, h2) {
    return CAM16.fromJchInViewingConditions(j, c2, h2, ViewingConditions.DEFAULT);
  }
  static fromJchInViewingConditions(j, c2, h2, viewingConditions) {
    const q = 4 / viewingConditions.c * Math.sqrt(j / 100) * (viewingConditions.aw + 4) * viewingConditions.fLRoot;
    const m2 = c2 * viewingConditions.fLRoot;
    const alpha = c2 / Math.sqrt(j / 100);
    const s2 = 50 * Math.sqrt(alpha * viewingConditions.c / (viewingConditions.aw + 4));
    const hueRadians = h2 * Math.PI / 180;
    const jstar = (1 + 100 * 7e-3) * j / (1 + 7e-3 * j);
    const mstar = 1 / 0.0228 * Math.log(1 + 0.0228 * m2);
    const astar = mstar * Math.cos(hueRadians);
    const bstar = mstar * Math.sin(hueRadians);
    return new CAM16(h2, c2, j, q, m2, s2, jstar, astar, bstar);
  }
  static fromUcs(jstar, astar, bstar) {
    return CAM16.fromUcsInViewingConditions(jstar, astar, bstar, ViewingConditions.DEFAULT);
  }
  static fromUcsInViewingConditions(jstar, astar, bstar, viewingConditions) {
    const a2 = astar;
    const b2 = bstar;
    const m2 = Math.sqrt(a2 * a2 + b2 * b2);
    const M2 = (Math.exp(m2 * 0.0228) - 1) / 0.0228;
    const c2 = M2 / viewingConditions.fLRoot;
    let h2 = Math.atan2(b2, a2) * (180 / Math.PI);
    if (h2 < 0) {
      h2 += 360;
    }
    const j = jstar / (1 - (jstar - 100) * 7e-3);
    return CAM16.fromJchInViewingConditions(j, c2, h2, viewingConditions);
  }
  viewedInSrgb() {
    return this.viewed(ViewingConditions.DEFAULT);
  }
  viewed(viewingConditions) {
    const alpha = this.chroma === 0 || this.j === 0 ? 0 : this.chroma / Math.sqrt(this.j / 100);
    const t2 = Math.pow(alpha / Math.pow(1.64 - Math.pow(0.29, viewingConditions.n), 0.73), 1 / 0.9);
    const hRad = this.hue * Math.PI / 180;
    const eHue = 0.25 * (Math.cos(hRad + 2) + 3.8);
    const ac = viewingConditions.aw * Math.pow(this.j / 100, 1 / viewingConditions.c / viewingConditions.z);
    const p1 = eHue * (5e4 / 13) * viewingConditions.nc * viewingConditions.ncb;
    const p2 = ac / viewingConditions.nbb;
    const hSin = Math.sin(hRad);
    const hCos = Math.cos(hRad);
    const gamma = 23 * (p2 + 0.305) * t2 / (23 * p1 + 11 * t2 * hCos + 108 * t2 * hSin);
    const a2 = gamma * hCos;
    const b2 = gamma * hSin;
    const rA = (460 * p2 + 451 * a2 + 288 * b2) / 1403;
    const gA = (460 * p2 - 891 * a2 - 261 * b2) / 1403;
    const bA = (460 * p2 - 220 * a2 - 6300 * b2) / 1403;
    const rCBase = Math.max(0, 27.13 * Math.abs(rA) / (400 - Math.abs(rA)));
    const rC = signum(rA) * (100 / viewingConditions.fl) * Math.pow(rCBase, 1 / 0.42);
    const gCBase = Math.max(0, 27.13 * Math.abs(gA) / (400 - Math.abs(gA)));
    const gC = signum(gA) * (100 / viewingConditions.fl) * Math.pow(gCBase, 1 / 0.42);
    const bCBase = Math.max(0, 27.13 * Math.abs(bA) / (400 - Math.abs(bA)));
    const bC = signum(bA) * (100 / viewingConditions.fl) * Math.pow(bCBase, 1 / 0.42);
    const rF = rC / viewingConditions.rgbD[0];
    const gF = gC / viewingConditions.rgbD[1];
    const bF = bC / viewingConditions.rgbD[2];
    const x2 = 1.86206786 * rF - 1.01125463 * gF + 0.14918677 * bF;
    const y = 0.38752654 * rF + 0.62144744 * gF - 897398e-8 * bF;
    const z2 = -0.0158415 * rF - 0.03412294 * gF + 1.04996444 * bF;
    const argb = argbFromXyz(x2, y, z2);
    return argb;
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class HCT {
  constructor(internalHue, internalChroma, internalTone) {
    this.internalHue = internalHue;
    this.internalChroma = internalChroma;
    this.internalTone = internalTone;
    this.setInternalState(this.toInt());
  }
  static from(hue, chroma, tone) {
    return new HCT(hue, chroma, tone);
  }
  static fromInt(argb) {
    const cam = CAM16.fromInt(argb);
    const tone = lstarFromArgb(argb);
    return new HCT(cam.hue, cam.chroma, tone);
  }
  toInt() {
    return getInt(this.internalHue, this.internalChroma, this.internalTone);
  }
  get hue() {
    return this.internalHue;
  }
  set hue(newHue) {
    this.setInternalState(getInt(sanitizeDegreesDouble(newHue), this.internalChroma, this.internalTone));
  }
  get chroma() {
    return this.internalChroma;
  }
  set chroma(newChroma) {
    this.setInternalState(getInt(this.internalHue, newChroma, this.internalTone));
  }
  get tone() {
    return this.internalTone;
  }
  set tone(newTone) {
    this.setInternalState(getInt(this.internalHue, this.internalChroma, newTone));
  }
  setInternalState(argb) {
    const cam = CAM16.fromInt(argb);
    const tone = lstarFromArgb(argb);
    this.internalHue = cam.hue;
    this.internalChroma = cam.chroma;
    this.internalTone = tone;
  }
}
const CHROMA_SEARCH_ENDPOINT = 0.4;
const DE_MAX = 1;
const DL_MAX = 0.2;
const LIGHTNESS_SEARCH_ENDPOINT = 0.01;
function getInt(hue, chroma, tone) {
  return getIntInViewingConditions(sanitizeDegreesDouble(hue), chroma, clampDouble(0, 100, tone), ViewingConditions.DEFAULT);
}
function getIntInViewingConditions(hue, chroma, tone, viewingConditions) {
  if (chroma < 1 || Math.round(tone) <= 0 || Math.round(tone) >= 100) {
    return argbFromLstar(tone);
  }
  hue = sanitizeDegreesDouble(hue);
  let high = chroma;
  let mid = chroma;
  let low = 0;
  let isFirstLoop = true;
  let answer = null;
  while (Math.abs(low - high) >= CHROMA_SEARCH_ENDPOINT) {
    const possibleAnswer = findCamByJ(hue, mid, tone);
    if (isFirstLoop) {
      if (possibleAnswer != null) {
        return possibleAnswer.viewed(viewingConditions);
      } else {
        isFirstLoop = false;
        mid = low + (high - low) / 2;
        continue;
      }
    }
    if (possibleAnswer === null) {
      high = mid;
    } else {
      answer = possibleAnswer;
      low = mid;
    }
    mid = low + (high - low) / 2;
  }
  if (answer === null) {
    return argbFromLstar(tone);
  }
  return answer.viewed(viewingConditions);
}
function findCamByJ(hue, chroma, tone) {
  let low = 0;
  let high = 100;
  let mid = 0;
  let bestdL = 1e3;
  let bestdE = 1e3;
  let bestCam = null;
  while (Math.abs(low - high) > LIGHTNESS_SEARCH_ENDPOINT) {
    mid = low + (high - low) / 2;
    const camBeforeClip = CAM16.fromJch(mid, chroma, hue);
    const clipped = camBeforeClip.viewedInSrgb();
    const clippedLstar = lstarFromArgb(clipped);
    const dL = Math.abs(tone - clippedLstar);
    if (dL < DL_MAX) {
      const camClipped = CAM16.fromInt(clipped);
      const dE = camClipped.distance(CAM16.fromJch(camClipped.j, camClipped.chroma, hue));
      if (dE <= DE_MAX && dE <= bestdE) {
        bestdL = dL;
        bestdE = dE;
        bestCam = camClipped;
      }
    }
    if (bestdL === 0 && bestdE === 0) {
      break;
    }
    if (clippedLstar < tone) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return bestCam;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Blend {
  static harmonize(designColor, sourceColor) {
    const fromHct = HCT.fromInt(designColor);
    const toHct = HCT.fromInt(sourceColor);
    const differenceDegrees$1 = differenceDegrees(fromHct.hue, toHct.hue);
    const rotationDegrees = Math.min(differenceDegrees$1 * 0.5, 15);
    const outputHue = sanitizeDegreesDouble(fromHct.hue + rotationDegrees * Blend.rotationDirection(fromHct.hue, toHct.hue));
    return HCT.from(outputHue, fromHct.chroma, fromHct.tone).toInt();
  }
  static hctHue(from, to, amount) {
    const ucsInt = Blend.cam16ucs(from, to, amount);
    const ucs = HCT.fromInt(ucsInt);
    const start = HCT.fromInt(from);
    return HCT.from(ucs.hue, start.chroma, start.tone).toInt();
  }
  static cam16ucs(from, to, amount) {
    const fromCAM16 = CAM16.fromInt(from);
    const toCAM16 = CAM16.fromInt(to);
    const aJstar = fromCAM16.jstar;
    const aAstar = fromCAM16.astar;
    const aBstar = fromCAM16.bstar;
    const bJstar = toCAM16.jstar;
    const bAstar = toCAM16.astar;
    const bBstar = toCAM16.bstar;
    const jstar = aJstar + (bJstar - aJstar) * amount;
    const astar = aAstar + (bAstar - aAstar) * amount;
    const bstar = aBstar + (bBstar - aBstar) * amount;
    return CAM16.fromUcs(jstar, astar, bstar).viewedInSrgb();
  }
  static rotationDirection(from, to) {
    const a2 = to - from;
    const b2 = to - from + 360;
    const c2 = to - from - 360;
    const aAbs = Math.abs(a2);
    const bAbs = Math.abs(b2);
    const cAbs = Math.abs(c2);
    if (aAbs <= bAbs && aAbs <= cAbs) {
      return a2 >= 0 ? 1 : -1;
    }
    if (bAbs <= aAbs && bAbs <= cAbs) {
      return b2 >= 0 ? 1 : -1;
    }
    return c2 >= 0 ? 1 : -1;
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class TonalPalette {
  constructor(hue, chroma) {
    this.hue = hue;
    this.chroma = chroma;
    this.cache = /* @__PURE__ */ new Map();
  }
  static fromInt(argb) {
    const hct = HCT.fromInt(argb);
    return TonalPalette.fromHueAndChroma(hct.hue, hct.chroma);
  }
  static fromHueAndChroma(hue, chroma) {
    return new TonalPalette(hue, chroma);
  }
  tone(tone) {
    let argb = this.cache.get(tone);
    if (argb === void 0) {
      argb = HCT.from(this.hue, this.chroma, tone).toInt();
      this.cache.set(tone, argb);
    }
    return argb;
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class CorePalette {
  constructor(argb) {
    const hct = HCT.fromInt(argb);
    const hue = hct.hue;
    this.a1 = TonalPalette.fromHueAndChroma(hue, Math.max(48, hct.chroma));
    this.a2 = TonalPalette.fromHueAndChroma(hue, 16);
    this.a3 = TonalPalette.fromHueAndChroma(hue + 60, 24);
    this.n1 = TonalPalette.fromHueAndChroma(hue, 4);
    this.n2 = TonalPalette.fromHueAndChroma(hue, 8);
    this.error = TonalPalette.fromHueAndChroma(25, 84);
  }
  static of(argb) {
    return new CorePalette(argb);
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Scheme {
  constructor(props) {
    this.props = props;
  }
  get primary() {
    return this.props.primary;
  }
  get primaryContainer() {
    return this.props.primaryContainer;
  }
  get onPrimary() {
    return this.props.onPrimary;
  }
  get onPrimaryContainer() {
    return this.props.onPrimaryContainer;
  }
  get secondary() {
    return this.props.secondary;
  }
  get secondaryContainer() {
    return this.props.secondaryContainer;
  }
  get onSecondary() {
    return this.props.onSecondary;
  }
  get onSecondaryContainer() {
    return this.props.onSecondaryContainer;
  }
  get tertiary() {
    return this.props.tertiary;
  }
  get onTertiary() {
    return this.props.onTertiary;
  }
  get tertiaryContainer() {
    return this.props.tertiaryContainer;
  }
  get onTertiaryContainer() {
    return this.props.onTertiaryContainer;
  }
  get error() {
    return this.props.error;
  }
  get onError() {
    return this.props.onError;
  }
  get errorContainer() {
    return this.props.errorContainer;
  }
  get onErrorContainer() {
    return this.props.onErrorContainer;
  }
  get background() {
    return this.props.background;
  }
  get onBackground() {
    return this.props.onBackground;
  }
  get surface() {
    return this.props.surface;
  }
  get onSurface() {
    return this.props.onSurface;
  }
  get surfaceVariant() {
    return this.props.surfaceVariant;
  }
  get onSurfaceVariant() {
    return this.props.onSurfaceVariant;
  }
  get outline() {
    return this.props.outline;
  }
  get shadow() {
    return this.props.shadow;
  }
  get inverseSurface() {
    return this.props.inverseSurface;
  }
  get inverseOnSurface() {
    return this.props.inverseOnSurface;
  }
  get inversePrimary() {
    return this.props.inversePrimary;
  }
  static light(argb) {
    const core = CorePalette.of(argb);
    return new Scheme({
      primary: core.a1.tone(40),
      onPrimary: core.a1.tone(100),
      primaryContainer: core.a1.tone(90),
      onPrimaryContainer: core.a1.tone(10),
      secondary: core.a2.tone(40),
      onSecondary: core.a2.tone(100),
      secondaryContainer: core.a2.tone(90),
      onSecondaryContainer: core.a2.tone(10),
      tertiary: core.a3.tone(40),
      onTertiary: core.a3.tone(100),
      tertiaryContainer: core.a3.tone(90),
      onTertiaryContainer: core.a3.tone(10),
      error: core.error.tone(40),
      onError: core.error.tone(100),
      errorContainer: core.error.tone(90),
      onErrorContainer: core.error.tone(10),
      background: core.n1.tone(99),
      onBackground: core.n1.tone(10),
      surface: core.n1.tone(99),
      onSurface: core.n1.tone(10),
      surfaceVariant: core.n2.tone(90),
      onSurfaceVariant: core.n2.tone(30),
      outline: core.n2.tone(50),
      shadow: core.n1.tone(0),
      inverseSurface: core.n1.tone(20),
      inverseOnSurface: core.n1.tone(95),
      inversePrimary: core.a1.tone(80)
    });
  }
  static dark(argb) {
    const core = CorePalette.of(argb);
    return new Scheme({
      primary: core.a1.tone(80),
      onPrimary: core.a1.tone(20),
      primaryContainer: core.a1.tone(30),
      onPrimaryContainer: core.a1.tone(90),
      secondary: core.a2.tone(80),
      onSecondary: core.a2.tone(20),
      secondaryContainer: core.a2.tone(30),
      onSecondaryContainer: core.a2.tone(90),
      tertiary: core.a3.tone(80),
      onTertiary: core.a3.tone(20),
      tertiaryContainer: core.a3.tone(30),
      onTertiaryContainer: core.a3.tone(90),
      error: core.error.tone(80),
      onError: core.error.tone(20),
      errorContainer: core.error.tone(30),
      onErrorContainer: core.error.tone(80),
      background: core.n1.tone(10),
      onBackground: core.n1.tone(90),
      surface: core.n1.tone(10),
      onSurface: core.n1.tone(90),
      surfaceVariant: core.n2.tone(30),
      onSurfaceVariant: core.n2.tone(80),
      outline: core.n2.tone(60),
      shadow: core.n1.tone(0),
      inverseSurface: core.n1.tone(90),
      inverseOnSurface: core.n1.tone(20),
      inversePrimary: core.a1.tone(40)
    });
  }
  toJSON() {
    return Object.assign({}, this.props);
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const hexFromArgb = (argb) => {
  const r2 = redFromArgb(argb);
  const g2 = greenFromArgb(argb);
  const b2 = blueFromArgb(argb);
  const outParts = [r2.toString(16), g2.toString(16), b2.toString(16)];
  for (const [i2, part] of outParts.entries()) {
    if (part.length === 1) {
      outParts[i2] = "0" + part;
    }
  }
  return "#" + outParts.join("");
};
const argbFromHex = (hex) => {
  hex = hex.replace("#", "");
  const isThree = hex.length === 3;
  const isSix = hex.length === 6;
  const isEight = hex.length === 8;
  if (!isThree && !isSix && !isEight) {
    throw new Error("unexpected hex " + hex);
  }
  let r2 = 0;
  let g2 = 0;
  let b2 = 0;
  if (isThree) {
    r2 = parseIntHex(hex.slice(0, 1).repeat(2));
    g2 = parseIntHex(hex.slice(1, 2).repeat(2));
    b2 = parseIntHex(hex.slice(2, 3).repeat(2));
  } else if (isSix) {
    r2 = parseIntHex(hex.slice(0, 2));
    g2 = parseIntHex(hex.slice(2, 4));
    b2 = parseIntHex(hex.slice(4, 6));
  } else if (isEight) {
    r2 = parseIntHex(hex.slice(2, 4));
    g2 = parseIntHex(hex.slice(4, 6));
    b2 = parseIntHex(hex.slice(6, 8));
  }
  return (255 << 24 | (r2 & 255) << 16 | (g2 & 255) << 8 | b2 & 255) >>> 0;
};
function parseIntHex(value) {
  return parseInt(value, 16);
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function themeFromSourceColor(source, customColors = []) {
  const palette = CorePalette.of(source);
  return {
    source,
    schemes: {
      light: Scheme.light(source),
      dark: Scheme.dark(source)
    },
    palettes: {
      primary: palette.a1,
      secondary: palette.a2,
      tertiary: palette.a3,
      neutral: palette.n1,
      neutralVariant: palette.n2,
      error: palette.error
    },
    customColors: customColors.map((c2) => customColor(source, c2))
  };
}
function customColor(source, color) {
  let value = color.value;
  const from = value;
  const to = source;
  if (color.blend) {
    value = Blend.harmonize(from, to);
  }
  const palette = CorePalette.of(value);
  const tones = palette.a1;
  return {
    color,
    value,
    light: {
      color: tones.tone(40),
      onColor: tones.tone(100),
      colorContainer: tones.tone(90),
      onColorContainer: tones.tone(10)
    },
    dark: {
      color: tones.tone(80),
      onColor: tones.tone(20),
      colorContainer: tones.tone(30),
      onColorContainer: tones.tone(90)
    }
  };
}
function applyTheme(theme, options) {
  var _a;
  const target = (options === null || options === void 0 ? void 0 : options.target) || document.body;
  const isDark = (_a = options === null || options === void 0 ? void 0 : options.dark) !== null && _a !== void 0 ? _a : false;
  const scheme = isDark ? theme.schemes.dark : theme.schemes.light;
  for (const [key, value] of Object.entries(scheme.toJSON())) {
    const token = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    const color = hexFromArgb(value);
    target.style.setProperty(`--md-sys-color-${token}`, color);
  }
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var codemirror = { exports: {} };
(function(module, exports) {
  (function(global2, factory) {
    module.exports = factory();
  })(commonjsGlobal, function() {
    var userAgent = navigator.userAgent;
    var platform = navigator.platform;
    var gecko = /gecko\/\d/i.test(userAgent);
    var ie_upto10 = /MSIE \d/.test(userAgent);
    var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(userAgent);
    var edge = /Edge\/(\d+)/.exec(userAgent);
    var ie = ie_upto10 || ie_11up || edge;
    var ie_version = ie && (ie_upto10 ? document.documentMode || 6 : +(edge || ie_11up)[1]);
    var webkit = !edge && /WebKit\//.test(userAgent);
    var qtwebkit = webkit && /Qt\/\d+\.\d+/.test(userAgent);
    var chrome = !edge && /Chrome\//.test(userAgent);
    var presto = /Opera\//.test(userAgent);
    var safari = /Apple Computer/.test(navigator.vendor);
    var mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(userAgent);
    var phantom = /PhantomJS/.test(userAgent);
    var ios = safari && (/Mobile\/\w+/.test(userAgent) || navigator.maxTouchPoints > 2);
    var android = /Android/.test(userAgent);
    var mobile = ios || android || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(userAgent);
    var mac = ios || /Mac/.test(platform);
    var chromeOS = /\bCrOS\b/.test(userAgent);
    var windows = /win/i.test(platform);
    var presto_version = presto && userAgent.match(/Version\/(\d*\.\d*)/);
    if (presto_version) {
      presto_version = Number(presto_version[1]);
    }
    if (presto_version && presto_version >= 15) {
      presto = false;
      webkit = true;
    }
    var flipCtrlCmd = mac && (qtwebkit || presto && (presto_version == null || presto_version < 12.11));
    var captureRightClick = gecko || ie && ie_version >= 9;
    function classTest(cls) {
      return new RegExp("(^|\\s)" + cls + "(?:$|\\s)\\s*");
    }
    var rmClass = function(node, cls) {
      var current = node.className;
      var match = classTest(cls).exec(current);
      if (match) {
        var after = current.slice(match.index + match[0].length);
        node.className = current.slice(0, match.index) + (after ? match[1] + after : "");
      }
    };
    function removeChildren(e2) {
      for (var count = e2.childNodes.length; count > 0; --count) {
        e2.removeChild(e2.firstChild);
      }
      return e2;
    }
    function removeChildrenAndAdd(parent, e2) {
      return removeChildren(parent).appendChild(e2);
    }
    function elt(tag, content, className, style) {
      var e2 = document.createElement(tag);
      if (className) {
        e2.className = className;
      }
      if (style) {
        e2.style.cssText = style;
      }
      if (typeof content == "string") {
        e2.appendChild(document.createTextNode(content));
      } else if (content) {
        for (var i3 = 0; i3 < content.length; ++i3) {
          e2.appendChild(content[i3]);
        }
      }
      return e2;
    }
    function eltP(tag, content, className, style) {
      var e2 = elt(tag, content, className, style);
      e2.setAttribute("role", "presentation");
      return e2;
    }
    var range;
    if (document.createRange) {
      range = function(node, start, end, endNode) {
        var r2 = document.createRange();
        r2.setEnd(endNode || node, end);
        r2.setStart(node, start);
        return r2;
      };
    } else {
      range = function(node, start, end) {
        var r2 = document.body.createTextRange();
        try {
          r2.moveToElementText(node.parentNode);
        } catch (e2) {
          return r2;
        }
        r2.collapse(true);
        r2.moveEnd("character", end);
        r2.moveStart("character", start);
        return r2;
      };
    }
    function contains(parent, child) {
      if (child.nodeType == 3) {
        child = child.parentNode;
      }
      if (parent.contains) {
        return parent.contains(child);
      }
      do {
        if (child.nodeType == 11) {
          child = child.host;
        }
        if (child == parent) {
          return true;
        }
      } while (child = child.parentNode);
    }
    function activeElt() {
      var activeElement;
      try {
        activeElement = document.activeElement;
      } catch (e2) {
        activeElement = document.body || null;
      }
      while (activeElement && activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
        activeElement = activeElement.shadowRoot.activeElement;
      }
      return activeElement;
    }
    function addClass(node, cls) {
      var current = node.className;
      if (!classTest(cls).test(current)) {
        node.className += (current ? " " : "") + cls;
      }
    }
    function joinClasses(a2, b2) {
      var as = a2.split(" ");
      for (var i3 = 0; i3 < as.length; i3++) {
        if (as[i3] && !classTest(as[i3]).test(b2)) {
          b2 += " " + as[i3];
        }
      }
      return b2;
    }
    var selectInput = function(node) {
      node.select();
    };
    if (ios) {
      selectInput = function(node) {
        node.selectionStart = 0;
        node.selectionEnd = node.value.length;
      };
    } else if (ie) {
      selectInput = function(node) {
        try {
          node.select();
        } catch (_e) {
        }
      };
    }
    function bind(f2) {
      var args = Array.prototype.slice.call(arguments, 1);
      return function() {
        return f2.apply(null, args);
      };
    }
    function copyObj(obj, target, overwrite) {
      if (!target) {
        target = {};
      }
      for (var prop2 in obj) {
        if (obj.hasOwnProperty(prop2) && (overwrite !== false || !target.hasOwnProperty(prop2))) {
          target[prop2] = obj[prop2];
        }
      }
      return target;
    }
    function countColumn(string, end, tabSize, startIndex, startValue) {
      if (end == null) {
        end = string.search(/[^\s\u00a0]/);
        if (end == -1) {
          end = string.length;
        }
      }
      for (var i3 = startIndex || 0, n2 = startValue || 0; ; ) {
        var nextTab = string.indexOf("	", i3);
        if (nextTab < 0 || nextTab >= end) {
          return n2 + (end - i3);
        }
        n2 += nextTab - i3;
        n2 += tabSize - n2 % tabSize;
        i3 = nextTab + 1;
      }
    }
    var Delayed = function() {
      this.id = null;
      this.f = null;
      this.time = 0;
      this.handler = bind(this.onTimeout, this);
    };
    Delayed.prototype.onTimeout = function(self2) {
      self2.id = 0;
      if (self2.time <= +new Date()) {
        self2.f();
      } else {
        setTimeout(self2.handler, self2.time - +new Date());
      }
    };
    Delayed.prototype.set = function(ms, f2) {
      this.f = f2;
      var time = +new Date() + ms;
      if (!this.id || time < this.time) {
        clearTimeout(this.id);
        this.id = setTimeout(this.handler, ms);
        this.time = time;
      }
    };
    function indexOf(array, elt2) {
      for (var i3 = 0; i3 < array.length; ++i3) {
        if (array[i3] == elt2) {
          return i3;
        }
      }
      return -1;
    }
    var scrollerGap = 50;
    var Pass = { toString: function() {
      return "CodeMirror.Pass";
    } };
    var sel_dontScroll = { scroll: false }, sel_mouse = { origin: "*mouse" }, sel_move = { origin: "+move" };
    function findColumn(string, goal, tabSize) {
      for (var pos = 0, col = 0; ; ) {
        var nextTab = string.indexOf("	", pos);
        if (nextTab == -1) {
          nextTab = string.length;
        }
        var skipped = nextTab - pos;
        if (nextTab == string.length || col + skipped >= goal) {
          return pos + Math.min(skipped, goal - col);
        }
        col += nextTab - pos;
        col += tabSize - col % tabSize;
        pos = nextTab + 1;
        if (col >= goal) {
          return pos;
        }
      }
    }
    var spaceStrs = [""];
    function spaceStr(n2) {
      while (spaceStrs.length <= n2) {
        spaceStrs.push(lst(spaceStrs) + " ");
      }
      return spaceStrs[n2];
    }
    function lst(arr) {
      return arr[arr.length - 1];
    }
    function map(array, f2) {
      var out = [];
      for (var i3 = 0; i3 < array.length; i3++) {
        out[i3] = f2(array[i3], i3);
      }
      return out;
    }
    function insertSorted(array, value, score) {
      var pos = 0, priority = score(value);
      while (pos < array.length && score(array[pos]) <= priority) {
        pos++;
      }
      array.splice(pos, 0, value);
    }
    function nothing() {
    }
    function createObj(base, props) {
      var inst;
      if (Object.create) {
        inst = Object.create(base);
      } else {
        nothing.prototype = base;
        inst = new nothing();
      }
      if (props) {
        copyObj(props, inst);
      }
      return inst;
    }
    var nonASCIISingleCaseWordChar = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
    function isWordCharBasic(ch) {
      return /\w/.test(ch) || ch > "\x80" && (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch));
    }
    function isWordChar(ch, helper) {
      if (!helper) {
        return isWordCharBasic(ch);
      }
      if (helper.source.indexOf("\\w") > -1 && isWordCharBasic(ch)) {
        return true;
      }
      return helper.test(ch);
    }
    function isEmpty(obj) {
      for (var n2 in obj) {
        if (obj.hasOwnProperty(n2) && obj[n2]) {
          return false;
        }
      }
      return true;
    }
    var extendingChars = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
    function isExtendingChar(ch) {
      return ch.charCodeAt(0) >= 768 && extendingChars.test(ch);
    }
    function skipExtendingChars(str, pos, dir) {
      while ((dir < 0 ? pos > 0 : pos < str.length) && isExtendingChar(str.charAt(pos))) {
        pos += dir;
      }
      return pos;
    }
    function findFirst(pred, from, to) {
      var dir = from > to ? -1 : 1;
      for (; ; ) {
        if (from == to) {
          return from;
        }
        var midF = (from + to) / 2, mid = dir < 0 ? Math.ceil(midF) : Math.floor(midF);
        if (mid == from) {
          return pred(mid) ? from : to;
        }
        if (pred(mid)) {
          to = mid;
        } else {
          from = mid + dir;
        }
      }
    }
    function iterateBidiSections(order, from, to, f2) {
      if (!order) {
        return f2(from, to, "ltr", 0);
      }
      var found = false;
      for (var i3 = 0; i3 < order.length; ++i3) {
        var part = order[i3];
        if (part.from < to && part.to > from || from == to && part.to == from) {
          f2(Math.max(part.from, from), Math.min(part.to, to), part.level == 1 ? "rtl" : "ltr", i3);
          found = true;
        }
      }
      if (!found) {
        f2(from, to, "ltr");
      }
    }
    var bidiOther = null;
    function getBidiPartAt(order, ch, sticky) {
      var found;
      bidiOther = null;
      for (var i3 = 0; i3 < order.length; ++i3) {
        var cur = order[i3];
        if (cur.from < ch && cur.to > ch) {
          return i3;
        }
        if (cur.to == ch) {
          if (cur.from != cur.to && sticky == "before") {
            found = i3;
          } else {
            bidiOther = i3;
          }
        }
        if (cur.from == ch) {
          if (cur.from != cur.to && sticky != "before") {
            found = i3;
          } else {
            bidiOther = i3;
          }
        }
      }
      return found != null ? found : bidiOther;
    }
    var bidiOrdering = function() {
      var lowTypes = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN";
      var arabicTypes = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
      function charType(code) {
        if (code <= 247) {
          return lowTypes.charAt(code);
        } else if (1424 <= code && code <= 1524) {
          return "R";
        } else if (1536 <= code && code <= 1785) {
          return arabicTypes.charAt(code - 1536);
        } else if (1774 <= code && code <= 2220) {
          return "r";
        } else if (8192 <= code && code <= 8203) {
          return "w";
        } else if (code == 8204) {
          return "b";
        } else {
          return "L";
        }
      }
      var bidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
      var isNeutral = /[stwN]/, isStrong = /[LRr]/, countsAsLeft = /[Lb1n]/, countsAsNum = /[1n]/;
      function BidiSpan(level, from, to) {
        this.level = level;
        this.from = from;
        this.to = to;
      }
      return function(str, direction) {
        var outerType = direction == "ltr" ? "L" : "R";
        if (str.length == 0 || direction == "ltr" && !bidiRE.test(str)) {
          return false;
        }
        var len = str.length, types = [];
        for (var i3 = 0; i3 < len; ++i3) {
          types.push(charType(str.charCodeAt(i3)));
        }
        for (var i$13 = 0, prev = outerType; i$13 < len; ++i$13) {
          var type = types[i$13];
          if (type == "m") {
            types[i$13] = prev;
          } else {
            prev = type;
          }
        }
        for (var i$23 = 0, cur = outerType; i$23 < len; ++i$23) {
          var type$1 = types[i$23];
          if (type$1 == "1" && cur == "r") {
            types[i$23] = "n";
          } else if (isStrong.test(type$1)) {
            cur = type$1;
            if (type$1 == "r") {
              types[i$23] = "R";
            }
          }
        }
        for (var i$3 = 1, prev$1 = types[0]; i$3 < len - 1; ++i$3) {
          var type$2 = types[i$3];
          if (type$2 == "+" && prev$1 == "1" && types[i$3 + 1] == "1") {
            types[i$3] = "1";
          } else if (type$2 == "," && prev$1 == types[i$3 + 1] && (prev$1 == "1" || prev$1 == "n")) {
            types[i$3] = prev$1;
          }
          prev$1 = type$2;
        }
        for (var i$4 = 0; i$4 < len; ++i$4) {
          var type$3 = types[i$4];
          if (type$3 == ",") {
            types[i$4] = "N";
          } else if (type$3 == "%") {
            var end = void 0;
            for (end = i$4 + 1; end < len && types[end] == "%"; ++end) {
            }
            var replace = i$4 && types[i$4 - 1] == "!" || end < len && types[end] == "1" ? "1" : "N";
            for (var j = i$4; j < end; ++j) {
              types[j] = replace;
            }
            i$4 = end - 1;
          }
        }
        for (var i$5 = 0, cur$1 = outerType; i$5 < len; ++i$5) {
          var type$4 = types[i$5];
          if (cur$1 == "L" && type$4 == "1") {
            types[i$5] = "L";
          } else if (isStrong.test(type$4)) {
            cur$1 = type$4;
          }
        }
        for (var i$6 = 0; i$6 < len; ++i$6) {
          if (isNeutral.test(types[i$6])) {
            var end$1 = void 0;
            for (end$1 = i$6 + 1; end$1 < len && isNeutral.test(types[end$1]); ++end$1) {
            }
            var before = (i$6 ? types[i$6 - 1] : outerType) == "L";
            var after = (end$1 < len ? types[end$1] : outerType) == "L";
            var replace$1 = before == after ? before ? "L" : "R" : outerType;
            for (var j$1 = i$6; j$1 < end$1; ++j$1) {
              types[j$1] = replace$1;
            }
            i$6 = end$1 - 1;
          }
        }
        var order = [], m2;
        for (var i$7 = 0; i$7 < len; ) {
          if (countsAsLeft.test(types[i$7])) {
            var start = i$7;
            for (++i$7; i$7 < len && countsAsLeft.test(types[i$7]); ++i$7) {
            }
            order.push(new BidiSpan(0, start, i$7));
          } else {
            var pos = i$7, at = order.length, isRTL = direction == "rtl" ? 1 : 0;
            for (++i$7; i$7 < len && types[i$7] != "L"; ++i$7) {
            }
            for (var j$2 = pos; j$2 < i$7; ) {
              if (countsAsNum.test(types[j$2])) {
                if (pos < j$2) {
                  order.splice(at, 0, new BidiSpan(1, pos, j$2));
                  at += isRTL;
                }
                var nstart = j$2;
                for (++j$2; j$2 < i$7 && countsAsNum.test(types[j$2]); ++j$2) {
                }
                order.splice(at, 0, new BidiSpan(2, nstart, j$2));
                at += isRTL;
                pos = j$2;
              } else {
                ++j$2;
              }
            }
            if (pos < i$7) {
              order.splice(at, 0, new BidiSpan(1, pos, i$7));
            }
          }
        }
        if (direction == "ltr") {
          if (order[0].level == 1 && (m2 = str.match(/^\s+/))) {
            order[0].from = m2[0].length;
            order.unshift(new BidiSpan(0, 0, m2[0].length));
          }
          if (lst(order).level == 1 && (m2 = str.match(/\s+$/))) {
            lst(order).to -= m2[0].length;
            order.push(new BidiSpan(0, len - m2[0].length, len));
          }
        }
        return direction == "rtl" ? order.reverse() : order;
      };
    }();
    function getOrder(line, direction) {
      var order = line.order;
      if (order == null) {
        order = line.order = bidiOrdering(line.text, direction);
      }
      return order;
    }
    var noHandlers = [];
    var on = function(emitter, type, f2) {
      if (emitter.addEventListener) {
        emitter.addEventListener(type, f2, false);
      } else if (emitter.attachEvent) {
        emitter.attachEvent("on" + type, f2);
      } else {
        var map2 = emitter._handlers || (emitter._handlers = {});
        map2[type] = (map2[type] || noHandlers).concat(f2);
      }
    };
    function getHandlers(emitter, type) {
      return emitter._handlers && emitter._handlers[type] || noHandlers;
    }
    function off(emitter, type, f2) {
      if (emitter.removeEventListener) {
        emitter.removeEventListener(type, f2, false);
      } else if (emitter.detachEvent) {
        emitter.detachEvent("on" + type, f2);
      } else {
        var map2 = emitter._handlers, arr = map2 && map2[type];
        if (arr) {
          var index = indexOf(arr, f2);
          if (index > -1) {
            map2[type] = arr.slice(0, index).concat(arr.slice(index + 1));
          }
        }
      }
    }
    function signal(emitter, type) {
      var handlers = getHandlers(emitter, type);
      if (!handlers.length) {
        return;
      }
      var args = Array.prototype.slice.call(arguments, 2);
      for (var i3 = 0; i3 < handlers.length; ++i3) {
        handlers[i3].apply(null, args);
      }
    }
    function signalDOMEvent(cm, e2, override) {
      if (typeof e2 == "string") {
        e2 = { type: e2, preventDefault: function() {
          this.defaultPrevented = true;
        } };
      }
      signal(cm, override || e2.type, cm, e2);
      return e_defaultPrevented(e2) || e2.codemirrorIgnore;
    }
    function signalCursorActivity(cm) {
      var arr = cm._handlers && cm._handlers.cursorActivity;
      if (!arr) {
        return;
      }
      var set = cm.curOp.cursorActivityHandlers || (cm.curOp.cursorActivityHandlers = []);
      for (var i3 = 0; i3 < arr.length; ++i3) {
        if (indexOf(set, arr[i3]) == -1) {
          set.push(arr[i3]);
        }
      }
    }
    function hasHandler(emitter, type) {
      return getHandlers(emitter, type).length > 0;
    }
    function eventMixin(ctor) {
      ctor.prototype.on = function(type, f2) {
        on(this, type, f2);
      };
      ctor.prototype.off = function(type, f2) {
        off(this, type, f2);
      };
    }
    function e_preventDefault(e2) {
      if (e2.preventDefault) {
        e2.preventDefault();
      } else {
        e2.returnValue = false;
      }
    }
    function e_stopPropagation(e2) {
      if (e2.stopPropagation) {
        e2.stopPropagation();
      } else {
        e2.cancelBubble = true;
      }
    }
    function e_defaultPrevented(e2) {
      return e2.defaultPrevented != null ? e2.defaultPrevented : e2.returnValue == false;
    }
    function e_stop(e2) {
      e_preventDefault(e2);
      e_stopPropagation(e2);
    }
    function e_target(e2) {
      return e2.target || e2.srcElement;
    }
    function e_button(e2) {
      var b2 = e2.which;
      if (b2 == null) {
        if (e2.button & 1) {
          b2 = 1;
        } else if (e2.button & 2) {
          b2 = 3;
        } else if (e2.button & 4) {
          b2 = 2;
        }
      }
      if (mac && e2.ctrlKey && b2 == 1) {
        b2 = 3;
      }
      return b2;
    }
    var dragAndDrop = function() {
      if (ie && ie_version < 9) {
        return false;
      }
      var div = elt("div");
      return "draggable" in div || "dragDrop" in div;
    }();
    var zwspSupported;
    function zeroWidthElement(measure) {
      if (zwspSupported == null) {
        var test = elt("span", "\u200B");
        removeChildrenAndAdd(measure, elt("span", [test, document.createTextNode("x")]));
        if (measure.firstChild.offsetHeight != 0) {
          zwspSupported = test.offsetWidth <= 1 && test.offsetHeight > 2 && !(ie && ie_version < 8);
        }
      }
      var node = zwspSupported ? elt("span", "\u200B") : elt("span", "\xA0", null, "display: inline-block; width: 1px; margin-right: -1px");
      node.setAttribute("cm-text", "");
      return node;
    }
    var badBidiRects;
    function hasBadBidiRects(measure) {
      if (badBidiRects != null) {
        return badBidiRects;
      }
      var txt = removeChildrenAndAdd(measure, document.createTextNode("A\u062EA"));
      var r0 = range(txt, 0, 1).getBoundingClientRect();
      var r1 = range(txt, 1, 2).getBoundingClientRect();
      removeChildren(measure);
      if (!r0 || r0.left == r0.right) {
        return false;
      }
      return badBidiRects = r1.right - r0.right < 3;
    }
    var splitLinesAuto = "\n\nb".split(/\n/).length != 3 ? function(string) {
      var pos = 0, result = [], l2 = string.length;
      while (pos <= l2) {
        var nl = string.indexOf("\n", pos);
        if (nl == -1) {
          nl = string.length;
        }
        var line = string.slice(pos, string.charAt(nl - 1) == "\r" ? nl - 1 : nl);
        var rt = line.indexOf("\r");
        if (rt != -1) {
          result.push(line.slice(0, rt));
          pos += rt + 1;
        } else {
          result.push(line);
          pos = nl + 1;
        }
      }
      return result;
    } : function(string) {
      return string.split(/\r\n?|\n/);
    };
    var hasSelection = window.getSelection ? function(te) {
      try {
        return te.selectionStart != te.selectionEnd;
      } catch (e2) {
        return false;
      }
    } : function(te) {
      var range2;
      try {
        range2 = te.ownerDocument.selection.createRange();
      } catch (e2) {
      }
      if (!range2 || range2.parentElement() != te) {
        return false;
      }
      return range2.compareEndPoints("StartToEnd", range2) != 0;
    };
    var hasCopyEvent = function() {
      var e2 = elt("div");
      if ("oncopy" in e2) {
        return true;
      }
      e2.setAttribute("oncopy", "return;");
      return typeof e2.oncopy == "function";
    }();
    var badZoomedRects = null;
    function hasBadZoomedRects(measure) {
      if (badZoomedRects != null) {
        return badZoomedRects;
      }
      var node = removeChildrenAndAdd(measure, elt("span", "x"));
      var normal = node.getBoundingClientRect();
      var fromRange = range(node, 0, 1).getBoundingClientRect();
      return badZoomedRects = Math.abs(normal.left - fromRange.left) > 1;
    }
    var modes = {}, mimeModes = {};
    function defineMode(name, mode) {
      if (arguments.length > 2) {
        mode.dependencies = Array.prototype.slice.call(arguments, 2);
      }
      modes[name] = mode;
    }
    function defineMIME(mime, spec) {
      mimeModes[mime] = spec;
    }
    function resolveMode(spec) {
      if (typeof spec == "string" && mimeModes.hasOwnProperty(spec)) {
        spec = mimeModes[spec];
      } else if (spec && typeof spec.name == "string" && mimeModes.hasOwnProperty(spec.name)) {
        var found = mimeModes[spec.name];
        if (typeof found == "string") {
          found = { name: found };
        }
        spec = createObj(found, spec);
        spec.name = found.name;
      } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) {
        return resolveMode("application/xml");
      } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(spec)) {
        return resolveMode("application/json");
      }
      if (typeof spec == "string") {
        return { name: spec };
      } else {
        return spec || { name: "null" };
      }
    }
    function getMode(options, spec) {
      spec = resolveMode(spec);
      var mfactory = modes[spec.name];
      if (!mfactory) {
        return getMode(options, "text/plain");
      }
      var modeObj = mfactory(options, spec);
      if (modeExtensions.hasOwnProperty(spec.name)) {
        var exts = modeExtensions[spec.name];
        for (var prop2 in exts) {
          if (!exts.hasOwnProperty(prop2)) {
            continue;
          }
          if (modeObj.hasOwnProperty(prop2)) {
            modeObj["_" + prop2] = modeObj[prop2];
          }
          modeObj[prop2] = exts[prop2];
        }
      }
      modeObj.name = spec.name;
      if (spec.helperType) {
        modeObj.helperType = spec.helperType;
      }
      if (spec.modeProps) {
        for (var prop$1 in spec.modeProps) {
          modeObj[prop$1] = spec.modeProps[prop$1];
        }
      }
      return modeObj;
    }
    var modeExtensions = {};
    function extendMode(mode, properties) {
      var exts = modeExtensions.hasOwnProperty(mode) ? modeExtensions[mode] : modeExtensions[mode] = {};
      copyObj(properties, exts);
    }
    function copyState(mode, state) {
      if (state === true) {
        return state;
      }
      if (mode.copyState) {
        return mode.copyState(state);
      }
      var nstate = {};
      for (var n2 in state) {
        var val = state[n2];
        if (val instanceof Array) {
          val = val.concat([]);
        }
        nstate[n2] = val;
      }
      return nstate;
    }
    function innerMode(mode, state) {
      var info;
      while (mode.innerMode) {
        info = mode.innerMode(state);
        if (!info || info.mode == mode) {
          break;
        }
        state = info.state;
        mode = info.mode;
      }
      return info || { mode, state };
    }
    function startState(mode, a1, a2) {
      return mode.startState ? mode.startState(a1, a2) : true;
    }
    var StringStream = function(string, tabSize, lineOracle) {
      this.pos = this.start = 0;
      this.string = string;
      this.tabSize = tabSize || 8;
      this.lastColumnPos = this.lastColumnValue = 0;
      this.lineStart = 0;
      this.lineOracle = lineOracle;
    };
    StringStream.prototype.eol = function() {
      return this.pos >= this.string.length;
    };
    StringStream.prototype.sol = function() {
      return this.pos == this.lineStart;
    };
    StringStream.prototype.peek = function() {
      return this.string.charAt(this.pos) || void 0;
    };
    StringStream.prototype.next = function() {
      if (this.pos < this.string.length) {
        return this.string.charAt(this.pos++);
      }
    };
    StringStream.prototype.eat = function(match) {
      var ch = this.string.charAt(this.pos);
      var ok;
      if (typeof match == "string") {
        ok = ch == match;
      } else {
        ok = ch && (match.test ? match.test(ch) : match(ch));
      }
      if (ok) {
        ++this.pos;
        return ch;
      }
    };
    StringStream.prototype.eatWhile = function(match) {
      var start = this.pos;
      while (this.eat(match)) {
      }
      return this.pos > start;
    };
    StringStream.prototype.eatSpace = function() {
      var start = this.pos;
      while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) {
        ++this.pos;
      }
      return this.pos > start;
    };
    StringStream.prototype.skipToEnd = function() {
      this.pos = this.string.length;
    };
    StringStream.prototype.skipTo = function(ch) {
      var found = this.string.indexOf(ch, this.pos);
      if (found > -1) {
        this.pos = found;
        return true;
      }
    };
    StringStream.prototype.backUp = function(n2) {
      this.pos -= n2;
    };
    StringStream.prototype.column = function() {
      if (this.lastColumnPos < this.start) {
        this.lastColumnValue = countColumn(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
        this.lastColumnPos = this.start;
      }
      return this.lastColumnValue - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
    };
    StringStream.prototype.indentation = function() {
      return countColumn(this.string, null, this.tabSize) - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
    };
    StringStream.prototype.match = function(pattern, consume, caseInsensitive) {
      if (typeof pattern == "string") {
        var cased = function(str) {
          return caseInsensitive ? str.toLowerCase() : str;
        };
        var substr = this.string.substr(this.pos, pattern.length);
        if (cased(substr) == cased(pattern)) {
          if (consume !== false) {
            this.pos += pattern.length;
          }
          return true;
        }
      } else {
        var match = this.string.slice(this.pos).match(pattern);
        if (match && match.index > 0) {
          return null;
        }
        if (match && consume !== false) {
          this.pos += match[0].length;
        }
        return match;
      }
    };
    StringStream.prototype.current = function() {
      return this.string.slice(this.start, this.pos);
    };
    StringStream.prototype.hideFirstChars = function(n2, inner) {
      this.lineStart += n2;
      try {
        return inner();
      } finally {
        this.lineStart -= n2;
      }
    };
    StringStream.prototype.lookAhead = function(n2) {
      var oracle = this.lineOracle;
      return oracle && oracle.lookAhead(n2);
    };
    StringStream.prototype.baseToken = function() {
      var oracle = this.lineOracle;
      return oracle && oracle.baseToken(this.pos);
    };
    function getLine(doc, n2) {
      n2 -= doc.first;
      if (n2 < 0 || n2 >= doc.size) {
        throw new Error("There is no line " + (n2 + doc.first) + " in the document.");
      }
      var chunk = doc;
      while (!chunk.lines) {
        for (var i3 = 0; ; ++i3) {
          var child = chunk.children[i3], sz = child.chunkSize();
          if (n2 < sz) {
            chunk = child;
            break;
          }
          n2 -= sz;
        }
      }
      return chunk.lines[n2];
    }
    function getBetween(doc, start, end) {
      var out = [], n2 = start.line;
      doc.iter(start.line, end.line + 1, function(line) {
        var text = line.text;
        if (n2 == end.line) {
          text = text.slice(0, end.ch);
        }
        if (n2 == start.line) {
          text = text.slice(start.ch);
        }
        out.push(text);
        ++n2;
      });
      return out;
    }
    function getLines(doc, from, to) {
      var out = [];
      doc.iter(from, to, function(line) {
        out.push(line.text);
      });
      return out;
    }
    function updateLineHeight(line, height) {
      var diff = height - line.height;
      if (diff) {
        for (var n2 = line; n2; n2 = n2.parent) {
          n2.height += diff;
        }
      }
    }
    function lineNo(line) {
      if (line.parent == null) {
        return null;
      }
      var cur = line.parent, no = indexOf(cur.lines, line);
      for (var chunk = cur.parent; chunk; cur = chunk, chunk = chunk.parent) {
        for (var i3 = 0; ; ++i3) {
          if (chunk.children[i3] == cur) {
            break;
          }
          no += chunk.children[i3].chunkSize();
        }
      }
      return no + cur.first;
    }
    function lineAtHeight(chunk, h2) {
      var n2 = chunk.first;
      outer:
        do {
          for (var i$13 = 0; i$13 < chunk.children.length; ++i$13) {
            var child = chunk.children[i$13], ch = child.height;
            if (h2 < ch) {
              chunk = child;
              continue outer;
            }
            h2 -= ch;
            n2 += child.chunkSize();
          }
          return n2;
        } while (!chunk.lines);
      var i3 = 0;
      for (; i3 < chunk.lines.length; ++i3) {
        var line = chunk.lines[i3], lh = line.height;
        if (h2 < lh) {
          break;
        }
        h2 -= lh;
      }
      return n2 + i3;
    }
    function isLine(doc, l2) {
      return l2 >= doc.first && l2 < doc.first + doc.size;
    }
    function lineNumberFor(options, i3) {
      return String(options.lineNumberFormatter(i3 + options.firstLineNumber));
    }
    function Pos(line, ch, sticky) {
      if (sticky === void 0)
        sticky = null;
      if (!(this instanceof Pos)) {
        return new Pos(line, ch, sticky);
      }
      this.line = line;
      this.ch = ch;
      this.sticky = sticky;
    }
    function cmp(a2, b2) {
      return a2.line - b2.line || a2.ch - b2.ch;
    }
    function equalCursorPos(a2, b2) {
      return a2.sticky == b2.sticky && cmp(a2, b2) == 0;
    }
    function copyPos(x2) {
      return Pos(x2.line, x2.ch);
    }
    function maxPos(a2, b2) {
      return cmp(a2, b2) < 0 ? b2 : a2;
    }
    function minPos(a2, b2) {
      return cmp(a2, b2) < 0 ? a2 : b2;
    }
    function clipLine(doc, n2) {
      return Math.max(doc.first, Math.min(n2, doc.first + doc.size - 1));
    }
    function clipPos(doc, pos) {
      if (pos.line < doc.first) {
        return Pos(doc.first, 0);
      }
      var last = doc.first + doc.size - 1;
      if (pos.line > last) {
        return Pos(last, getLine(doc, last).text.length);
      }
      return clipToLen(pos, getLine(doc, pos.line).text.length);
    }
    function clipToLen(pos, linelen) {
      var ch = pos.ch;
      if (ch == null || ch > linelen) {
        return Pos(pos.line, linelen);
      } else if (ch < 0) {
        return Pos(pos.line, 0);
      } else {
        return pos;
      }
    }
    function clipPosArray(doc, array) {
      var out = [];
      for (var i3 = 0; i3 < array.length; i3++) {
        out[i3] = clipPos(doc, array[i3]);
      }
      return out;
    }
    var SavedContext = function(state, lookAhead) {
      this.state = state;
      this.lookAhead = lookAhead;
    };
    var Context = function(doc, state, line, lookAhead) {
      this.state = state;
      this.doc = doc;
      this.line = line;
      this.maxLookAhead = lookAhead || 0;
      this.baseTokens = null;
      this.baseTokenPos = 1;
    };
    Context.prototype.lookAhead = function(n2) {
      var line = this.doc.getLine(this.line + n2);
      if (line != null && n2 > this.maxLookAhead) {
        this.maxLookAhead = n2;
      }
      return line;
    };
    Context.prototype.baseToken = function(n2) {
      if (!this.baseTokens) {
        return null;
      }
      while (this.baseTokens[this.baseTokenPos] <= n2) {
        this.baseTokenPos += 2;
      }
      var type = this.baseTokens[this.baseTokenPos + 1];
      return {
        type: type && type.replace(/( |^)overlay .*/, ""),
        size: this.baseTokens[this.baseTokenPos] - n2
      };
    };
    Context.prototype.nextLine = function() {
      this.line++;
      if (this.maxLookAhead > 0) {
        this.maxLookAhead--;
      }
    };
    Context.fromSaved = function(doc, saved, line) {
      if (saved instanceof SavedContext) {
        return new Context(doc, copyState(doc.mode, saved.state), line, saved.lookAhead);
      } else {
        return new Context(doc, copyState(doc.mode, saved), line);
      }
    };
    Context.prototype.save = function(copy) {
      var state = copy !== false ? copyState(this.doc.mode, this.state) : this.state;
      return this.maxLookAhead > 0 ? new SavedContext(state, this.maxLookAhead) : state;
    };
    function highlightLine(cm, line, context, forceToEnd) {
      var st = [cm.state.modeGen], lineClasses = {};
      runMode(cm, line.text, cm.doc.mode, context, function(end, style) {
        return st.push(end, style);
      }, lineClasses, forceToEnd);
      var state = context.state;
      var loop = function(o3) {
        context.baseTokens = st;
        var overlay = cm.state.overlays[o3], i3 = 1, at = 0;
        context.state = true;
        runMode(cm, line.text, overlay.mode, context, function(end, style) {
          var start = i3;
          while (at < end) {
            var i_end = st[i3];
            if (i_end > end) {
              st.splice(i3, 1, end, st[i3 + 1], i_end);
            }
            i3 += 2;
            at = Math.min(end, i_end);
          }
          if (!style) {
            return;
          }
          if (overlay.opaque) {
            st.splice(start, i3 - start, end, "overlay " + style);
            i3 = start + 2;
          } else {
            for (; start < i3; start += 2) {
              var cur = st[start + 1];
              st[start + 1] = (cur ? cur + " " : "") + "overlay " + style;
            }
          }
        }, lineClasses);
        context.state = state;
        context.baseTokens = null;
        context.baseTokenPos = 1;
      };
      for (var o2 = 0; o2 < cm.state.overlays.length; ++o2)
        loop(o2);
      return { styles: st, classes: lineClasses.bgClass || lineClasses.textClass ? lineClasses : null };
    }
    function getLineStyles(cm, line, updateFrontier) {
      if (!line.styles || line.styles[0] != cm.state.modeGen) {
        var context = getContextBefore(cm, lineNo(line));
        var resetState = line.text.length > cm.options.maxHighlightLength && copyState(cm.doc.mode, context.state);
        var result = highlightLine(cm, line, context);
        if (resetState) {
          context.state = resetState;
        }
        line.stateAfter = context.save(!resetState);
        line.styles = result.styles;
        if (result.classes) {
          line.styleClasses = result.classes;
        } else if (line.styleClasses) {
          line.styleClasses = null;
        }
        if (updateFrontier === cm.doc.highlightFrontier) {
          cm.doc.modeFrontier = Math.max(cm.doc.modeFrontier, ++cm.doc.highlightFrontier);
        }
      }
      return line.styles;
    }
    function getContextBefore(cm, n2, precise) {
      var doc = cm.doc, display = cm.display;
      if (!doc.mode.startState) {
        return new Context(doc, true, n2);
      }
      var start = findStartLine(cm, n2, precise);
      var saved = start > doc.first && getLine(doc, start - 1).stateAfter;
      var context = saved ? Context.fromSaved(doc, saved, start) : new Context(doc, startState(doc.mode), start);
      doc.iter(start, n2, function(line) {
        processLine(cm, line.text, context);
        var pos = context.line;
        line.stateAfter = pos == n2 - 1 || pos % 5 == 0 || pos >= display.viewFrom && pos < display.viewTo ? context.save() : null;
        context.nextLine();
      });
      if (precise) {
        doc.modeFrontier = context.line;
      }
      return context;
    }
    function processLine(cm, text, context, startAt) {
      var mode = cm.doc.mode;
      var stream = new StringStream(text, cm.options.tabSize, context);
      stream.start = stream.pos = startAt || 0;
      if (text == "") {
        callBlankLine(mode, context.state);
      }
      while (!stream.eol()) {
        readToken(mode, stream, context.state);
        stream.start = stream.pos;
      }
    }
    function callBlankLine(mode, state) {
      if (mode.blankLine) {
        return mode.blankLine(state);
      }
      if (!mode.innerMode) {
        return;
      }
      var inner = innerMode(mode, state);
      if (inner.mode.blankLine) {
        return inner.mode.blankLine(inner.state);
      }
    }
    function readToken(mode, stream, state, inner) {
      for (var i3 = 0; i3 < 10; i3++) {
        if (inner) {
          inner[0] = innerMode(mode, state).mode;
        }
        var style = mode.token(stream, state);
        if (stream.pos > stream.start) {
          return style;
        }
      }
      throw new Error("Mode " + mode.name + " failed to advance stream.");
    }
    var Token = function(stream, type, state) {
      this.start = stream.start;
      this.end = stream.pos;
      this.string = stream.current();
      this.type = type || null;
      this.state = state;
    };
    function takeToken(cm, pos, precise, asArray) {
      var doc = cm.doc, mode = doc.mode, style;
      pos = clipPos(doc, pos);
      var line = getLine(doc, pos.line), context = getContextBefore(cm, pos.line, precise);
      var stream = new StringStream(line.text, cm.options.tabSize, context), tokens;
      if (asArray) {
        tokens = [];
      }
      while ((asArray || stream.pos < pos.ch) && !stream.eol()) {
        stream.start = stream.pos;
        style = readToken(mode, stream, context.state);
        if (asArray) {
          tokens.push(new Token(stream, style, copyState(doc.mode, context.state)));
        }
      }
      return asArray ? tokens : new Token(stream, style, context.state);
    }
    function extractLineClasses(type, output) {
      if (type) {
        for (; ; ) {
          var lineClass = type.match(/(?:^|\s+)line-(background-)?(\S+)/);
          if (!lineClass) {
            break;
          }
          type = type.slice(0, lineClass.index) + type.slice(lineClass.index + lineClass[0].length);
          var prop2 = lineClass[1] ? "bgClass" : "textClass";
          if (output[prop2] == null) {
            output[prop2] = lineClass[2];
          } else if (!new RegExp("(?:^|\\s)" + lineClass[2] + "(?:$|\\s)").test(output[prop2])) {
            output[prop2] += " " + lineClass[2];
          }
        }
      }
      return type;
    }
    function runMode(cm, text, mode, context, f2, lineClasses, forceToEnd) {
      var flattenSpans = mode.flattenSpans;
      if (flattenSpans == null) {
        flattenSpans = cm.options.flattenSpans;
      }
      var curStart = 0, curStyle = null;
      var stream = new StringStream(text, cm.options.tabSize, context), style;
      var inner = cm.options.addModeClass && [null];
      if (text == "") {
        extractLineClasses(callBlankLine(mode, context.state), lineClasses);
      }
      while (!stream.eol()) {
        if (stream.pos > cm.options.maxHighlightLength) {
          flattenSpans = false;
          if (forceToEnd) {
            processLine(cm, text, context, stream.pos);
          }
          stream.pos = text.length;
          style = null;
        } else {
          style = extractLineClasses(readToken(mode, stream, context.state, inner), lineClasses);
        }
        if (inner) {
          var mName = inner[0].name;
          if (mName) {
            style = "m-" + (style ? mName + " " + style : mName);
          }
        }
        if (!flattenSpans || curStyle != style) {
          while (curStart < stream.start) {
            curStart = Math.min(stream.start, curStart + 5e3);
            f2(curStart, curStyle);
          }
          curStyle = style;
        }
        stream.start = stream.pos;
      }
      while (curStart < stream.pos) {
        var pos = Math.min(stream.pos, curStart + 5e3);
        f2(pos, curStyle);
        curStart = pos;
      }
    }
    function findStartLine(cm, n2, precise) {
      var minindent, minline, doc = cm.doc;
      var lim = precise ? -1 : n2 - (cm.doc.mode.innerMode ? 1e3 : 100);
      for (var search = n2; search > lim; --search) {
        if (search <= doc.first) {
          return doc.first;
        }
        var line = getLine(doc, search - 1), after = line.stateAfter;
        if (after && (!precise || search + (after instanceof SavedContext ? after.lookAhead : 0) <= doc.modeFrontier)) {
          return search;
        }
        var indented = countColumn(line.text, null, cm.options.tabSize);
        if (minline == null || minindent > indented) {
          minline = search - 1;
          minindent = indented;
        }
      }
      return minline;
    }
    function retreatFrontier(doc, n2) {
      doc.modeFrontier = Math.min(doc.modeFrontier, n2);
      if (doc.highlightFrontier < n2 - 10) {
        return;
      }
      var start = doc.first;
      for (var line = n2 - 1; line > start; line--) {
        var saved = getLine(doc, line).stateAfter;
        if (saved && (!(saved instanceof SavedContext) || line + saved.lookAhead < n2)) {
          start = line + 1;
          break;
        }
      }
      doc.highlightFrontier = Math.min(doc.highlightFrontier, start);
    }
    var sawReadOnlySpans = false, sawCollapsedSpans = false;
    function seeReadOnlySpans() {
      sawReadOnlySpans = true;
    }
    function seeCollapsedSpans() {
      sawCollapsedSpans = true;
    }
    function MarkedSpan(marker, from, to) {
      this.marker = marker;
      this.from = from;
      this.to = to;
    }
    function getMarkedSpanFor(spans, marker) {
      if (spans) {
        for (var i3 = 0; i3 < spans.length; ++i3) {
          var span = spans[i3];
          if (span.marker == marker) {
            return span;
          }
        }
      }
    }
    function removeMarkedSpan(spans, span) {
      var r2;
      for (var i3 = 0; i3 < spans.length; ++i3) {
        if (spans[i3] != span) {
          (r2 || (r2 = [])).push(spans[i3]);
        }
      }
      return r2;
    }
    function addMarkedSpan(line, span, op) {
      var inThisOp = op && window.WeakSet && (op.markedSpans || (op.markedSpans = /* @__PURE__ */ new WeakSet()));
      if (inThisOp && inThisOp.has(line.markedSpans)) {
        line.markedSpans.push(span);
      } else {
        line.markedSpans = line.markedSpans ? line.markedSpans.concat([span]) : [span];
        if (inThisOp) {
          inThisOp.add(line.markedSpans);
        }
      }
      span.marker.attachLine(line);
    }
    function markedSpansBefore(old, startCh, isInsert) {
      var nw;
      if (old) {
        for (var i3 = 0; i3 < old.length; ++i3) {
          var span = old[i3], marker = span.marker;
          var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= startCh : span.from < startCh);
          if (startsBefore || span.from == startCh && marker.type == "bookmark" && (!isInsert || !span.marker.insertLeft)) {
            var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= startCh : span.to > startCh);
            (nw || (nw = [])).push(new MarkedSpan(marker, span.from, endsAfter ? null : span.to));
          }
        }
      }
      return nw;
    }
    function markedSpansAfter(old, endCh, isInsert) {
      var nw;
      if (old) {
        for (var i3 = 0; i3 < old.length; ++i3) {
          var span = old[i3], marker = span.marker;
          var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= endCh : span.to > endCh);
          if (endsAfter || span.from == endCh && marker.type == "bookmark" && (!isInsert || span.marker.insertLeft)) {
            var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= endCh : span.from < endCh);
            (nw || (nw = [])).push(new MarkedSpan(marker, startsBefore ? null : span.from - endCh, span.to == null ? null : span.to - endCh));
          }
        }
      }
      return nw;
    }
    function stretchSpansOverChange(doc, change) {
      if (change.full) {
        return null;
      }
      var oldFirst = isLine(doc, change.from.line) && getLine(doc, change.from.line).markedSpans;
      var oldLast = isLine(doc, change.to.line) && getLine(doc, change.to.line).markedSpans;
      if (!oldFirst && !oldLast) {
        return null;
      }
      var startCh = change.from.ch, endCh = change.to.ch, isInsert = cmp(change.from, change.to) == 0;
      var first = markedSpansBefore(oldFirst, startCh, isInsert);
      var last = markedSpansAfter(oldLast, endCh, isInsert);
      var sameLine = change.text.length == 1, offset = lst(change.text).length + (sameLine ? startCh : 0);
      if (first) {
        for (var i3 = 0; i3 < first.length; ++i3) {
          var span = first[i3];
          if (span.to == null) {
            var found = getMarkedSpanFor(last, span.marker);
            if (!found) {
              span.to = startCh;
            } else if (sameLine) {
              span.to = found.to == null ? null : found.to + offset;
            }
          }
        }
      }
      if (last) {
        for (var i$13 = 0; i$13 < last.length; ++i$13) {
          var span$1 = last[i$13];
          if (span$1.to != null) {
            span$1.to += offset;
          }
          if (span$1.from == null) {
            var found$1 = getMarkedSpanFor(first, span$1.marker);
            if (!found$1) {
              span$1.from = offset;
              if (sameLine) {
                (first || (first = [])).push(span$1);
              }
            }
          } else {
            span$1.from += offset;
            if (sameLine) {
              (first || (first = [])).push(span$1);
            }
          }
        }
      }
      if (first) {
        first = clearEmptySpans(first);
      }
      if (last && last != first) {
        last = clearEmptySpans(last);
      }
      var newMarkers = [first];
      if (!sameLine) {
        var gap = change.text.length - 2, gapMarkers;
        if (gap > 0 && first) {
          for (var i$23 = 0; i$23 < first.length; ++i$23) {
            if (first[i$23].to == null) {
              (gapMarkers || (gapMarkers = [])).push(new MarkedSpan(first[i$23].marker, null, null));
            }
          }
        }
        for (var i$3 = 0; i$3 < gap; ++i$3) {
          newMarkers.push(gapMarkers);
        }
        newMarkers.push(last);
      }
      return newMarkers;
    }
    function clearEmptySpans(spans) {
      for (var i3 = 0; i3 < spans.length; ++i3) {
        var span = spans[i3];
        if (span.from != null && span.from == span.to && span.marker.clearWhenEmpty !== false) {
          spans.splice(i3--, 1);
        }
      }
      if (!spans.length) {
        return null;
      }
      return spans;
    }
    function removeReadOnlyRanges(doc, from, to) {
      var markers = null;
      doc.iter(from.line, to.line + 1, function(line) {
        if (line.markedSpans) {
          for (var i4 = 0; i4 < line.markedSpans.length; ++i4) {
            var mark = line.markedSpans[i4].marker;
            if (mark.readOnly && (!markers || indexOf(markers, mark) == -1)) {
              (markers || (markers = [])).push(mark);
            }
          }
        }
      });
      if (!markers) {
        return null;
      }
      var parts = [{ from, to }];
      for (var i3 = 0; i3 < markers.length; ++i3) {
        var mk = markers[i3], m2 = mk.find(0);
        for (var j = 0; j < parts.length; ++j) {
          var p2 = parts[j];
          if (cmp(p2.to, m2.from) < 0 || cmp(p2.from, m2.to) > 0) {
            continue;
          }
          var newParts = [j, 1], dfrom = cmp(p2.from, m2.from), dto = cmp(p2.to, m2.to);
          if (dfrom < 0 || !mk.inclusiveLeft && !dfrom) {
            newParts.push({ from: p2.from, to: m2.from });
          }
          if (dto > 0 || !mk.inclusiveRight && !dto) {
            newParts.push({ from: m2.to, to: p2.to });
          }
          parts.splice.apply(parts, newParts);
          j += newParts.length - 3;
        }
      }
      return parts;
    }
    function detachMarkedSpans(line) {
      var spans = line.markedSpans;
      if (!spans) {
        return;
      }
      for (var i3 = 0; i3 < spans.length; ++i3) {
        spans[i3].marker.detachLine(line);
      }
      line.markedSpans = null;
    }
    function attachMarkedSpans(line, spans) {
      if (!spans) {
        return;
      }
      for (var i3 = 0; i3 < spans.length; ++i3) {
        spans[i3].marker.attachLine(line);
      }
      line.markedSpans = spans;
    }
    function extraLeft(marker) {
      return marker.inclusiveLeft ? -1 : 0;
    }
    function extraRight(marker) {
      return marker.inclusiveRight ? 1 : 0;
    }
    function compareCollapsedMarkers(a2, b2) {
      var lenDiff = a2.lines.length - b2.lines.length;
      if (lenDiff != 0) {
        return lenDiff;
      }
      var aPos = a2.find(), bPos = b2.find();
      var fromCmp = cmp(aPos.from, bPos.from) || extraLeft(a2) - extraLeft(b2);
      if (fromCmp) {
        return -fromCmp;
      }
      var toCmp = cmp(aPos.to, bPos.to) || extraRight(a2) - extraRight(b2);
      if (toCmp) {
        return toCmp;
      }
      return b2.id - a2.id;
    }
    function collapsedSpanAtSide(line, start) {
      var sps = sawCollapsedSpans && line.markedSpans, found;
      if (sps) {
        for (var sp = void 0, i3 = 0; i3 < sps.length; ++i3) {
          sp = sps[i3];
          if (sp.marker.collapsed && (start ? sp.from : sp.to) == null && (!found || compareCollapsedMarkers(found, sp.marker) < 0)) {
            found = sp.marker;
          }
        }
      }
      return found;
    }
    function collapsedSpanAtStart(line) {
      return collapsedSpanAtSide(line, true);
    }
    function collapsedSpanAtEnd(line) {
      return collapsedSpanAtSide(line, false);
    }
    function collapsedSpanAround(line, ch) {
      var sps = sawCollapsedSpans && line.markedSpans, found;
      if (sps) {
        for (var i3 = 0; i3 < sps.length; ++i3) {
          var sp = sps[i3];
          if (sp.marker.collapsed && (sp.from == null || sp.from < ch) && (sp.to == null || sp.to > ch) && (!found || compareCollapsedMarkers(found, sp.marker) < 0)) {
            found = sp.marker;
          }
        }
      }
      return found;
    }
    function conflictingCollapsedRange(doc, lineNo2, from, to, marker) {
      var line = getLine(doc, lineNo2);
      var sps = sawCollapsedSpans && line.markedSpans;
      if (sps) {
        for (var i3 = 0; i3 < sps.length; ++i3) {
          var sp = sps[i3];
          if (!sp.marker.collapsed) {
            continue;
          }
          var found = sp.marker.find(0);
          var fromCmp = cmp(found.from, from) || extraLeft(sp.marker) - extraLeft(marker);
          var toCmp = cmp(found.to, to) || extraRight(sp.marker) - extraRight(marker);
          if (fromCmp >= 0 && toCmp <= 0 || fromCmp <= 0 && toCmp >= 0) {
            continue;
          }
          if (fromCmp <= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.to, from) >= 0 : cmp(found.to, from) > 0) || fromCmp >= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.from, to) <= 0 : cmp(found.from, to) < 0)) {
            return true;
          }
        }
      }
    }
    function visualLine(line) {
      var merged;
      while (merged = collapsedSpanAtStart(line)) {
        line = merged.find(-1, true).line;
      }
      return line;
    }
    function visualLineEnd(line) {
      var merged;
      while (merged = collapsedSpanAtEnd(line)) {
        line = merged.find(1, true).line;
      }
      return line;
    }
    function visualLineContinued(line) {
      var merged, lines;
      while (merged = collapsedSpanAtEnd(line)) {
        line = merged.find(1, true).line;
        (lines || (lines = [])).push(line);
      }
      return lines;
    }
    function visualLineNo(doc, lineN) {
      var line = getLine(doc, lineN), vis = visualLine(line);
      if (line == vis) {
        return lineN;
      }
      return lineNo(vis);
    }
    function visualLineEndNo(doc, lineN) {
      if (lineN > doc.lastLine()) {
        return lineN;
      }
      var line = getLine(doc, lineN), merged;
      if (!lineIsHidden(doc, line)) {
        return lineN;
      }
      while (merged = collapsedSpanAtEnd(line)) {
        line = merged.find(1, true).line;
      }
      return lineNo(line) + 1;
    }
    function lineIsHidden(doc, line) {
      var sps = sawCollapsedSpans && line.markedSpans;
      if (sps) {
        for (var sp = void 0, i3 = 0; i3 < sps.length; ++i3) {
          sp = sps[i3];
          if (!sp.marker.collapsed) {
            continue;
          }
          if (sp.from == null) {
            return true;
          }
          if (sp.marker.widgetNode) {
            continue;
          }
          if (sp.from == 0 && sp.marker.inclusiveLeft && lineIsHiddenInner(doc, line, sp)) {
            return true;
          }
        }
      }
    }
    function lineIsHiddenInner(doc, line, span) {
      if (span.to == null) {
        var end = span.marker.find(1, true);
        return lineIsHiddenInner(doc, end.line, getMarkedSpanFor(end.line.markedSpans, span.marker));
      }
      if (span.marker.inclusiveRight && span.to == line.text.length) {
        return true;
      }
      for (var sp = void 0, i3 = 0; i3 < line.markedSpans.length; ++i3) {
        sp = line.markedSpans[i3];
        if (sp.marker.collapsed && !sp.marker.widgetNode && sp.from == span.to && (sp.to == null || sp.to != span.from) && (sp.marker.inclusiveLeft || span.marker.inclusiveRight) && lineIsHiddenInner(doc, line, sp)) {
          return true;
        }
      }
    }
    function heightAtLine(lineObj) {
      lineObj = visualLine(lineObj);
      var h2 = 0, chunk = lineObj.parent;
      for (var i3 = 0; i3 < chunk.lines.length; ++i3) {
        var line = chunk.lines[i3];
        if (line == lineObj) {
          break;
        } else {
          h2 += line.height;
        }
      }
      for (var p2 = chunk.parent; p2; chunk = p2, p2 = chunk.parent) {
        for (var i$13 = 0; i$13 < p2.children.length; ++i$13) {
          var cur = p2.children[i$13];
          if (cur == chunk) {
            break;
          } else {
            h2 += cur.height;
          }
        }
      }
      return h2;
    }
    function lineLength(line) {
      if (line.height == 0) {
        return 0;
      }
      var len = line.text.length, merged, cur = line;
      while (merged = collapsedSpanAtStart(cur)) {
        var found = merged.find(0, true);
        cur = found.from.line;
        len += found.from.ch - found.to.ch;
      }
      cur = line;
      while (merged = collapsedSpanAtEnd(cur)) {
        var found$1 = merged.find(0, true);
        len -= cur.text.length - found$1.from.ch;
        cur = found$1.to.line;
        len += cur.text.length - found$1.to.ch;
      }
      return len;
    }
    function findMaxLine(cm) {
      var d2 = cm.display, doc = cm.doc;
      d2.maxLine = getLine(doc, doc.first);
      d2.maxLineLength = lineLength(d2.maxLine);
      d2.maxLineChanged = true;
      doc.iter(function(line) {
        var len = lineLength(line);
        if (len > d2.maxLineLength) {
          d2.maxLineLength = len;
          d2.maxLine = line;
        }
      });
    }
    var Line = function(text, markedSpans, estimateHeight2) {
      this.text = text;
      attachMarkedSpans(this, markedSpans);
      this.height = estimateHeight2 ? estimateHeight2(this) : 1;
    };
    Line.prototype.lineNo = function() {
      return lineNo(this);
    };
    eventMixin(Line);
    function updateLine(line, text, markedSpans, estimateHeight2) {
      line.text = text;
      if (line.stateAfter) {
        line.stateAfter = null;
      }
      if (line.styles) {
        line.styles = null;
      }
      if (line.order != null) {
        line.order = null;
      }
      detachMarkedSpans(line);
      attachMarkedSpans(line, markedSpans);
      var estHeight = estimateHeight2 ? estimateHeight2(line) : 1;
      if (estHeight != line.height) {
        updateLineHeight(line, estHeight);
      }
    }
    function cleanUpLine(line) {
      line.parent = null;
      detachMarkedSpans(line);
    }
    var styleToClassCache = {}, styleToClassCacheWithMode = {};
    function interpretTokenStyle(style, options) {
      if (!style || /^\s*$/.test(style)) {
        return null;
      }
      var cache = options.addModeClass ? styleToClassCacheWithMode : styleToClassCache;
      return cache[style] || (cache[style] = style.replace(/\S+/g, "cm-$&"));
    }
    function buildLineContent(cm, lineView) {
      var content = eltP("span", null, null, webkit ? "padding-right: .1px" : null);
      var builder = {
        pre: eltP("pre", [content], "CodeMirror-line"),
        content,
        col: 0,
        pos: 0,
        cm,
        trailingSpace: false,
        splitSpaces: cm.getOption("lineWrapping")
      };
      lineView.measure = {};
      for (var i3 = 0; i3 <= (lineView.rest ? lineView.rest.length : 0); i3++) {
        var line = i3 ? lineView.rest[i3 - 1] : lineView.line, order = void 0;
        builder.pos = 0;
        builder.addToken = buildToken;
        if (hasBadBidiRects(cm.display.measure) && (order = getOrder(line, cm.doc.direction))) {
          builder.addToken = buildTokenBadBidi(builder.addToken, order);
        }
        builder.map = [];
        var allowFrontierUpdate = lineView != cm.display.externalMeasured && lineNo(line);
        insertLineContent(line, builder, getLineStyles(cm, line, allowFrontierUpdate));
        if (line.styleClasses) {
          if (line.styleClasses.bgClass) {
            builder.bgClass = joinClasses(line.styleClasses.bgClass, builder.bgClass || "");
          }
          if (line.styleClasses.textClass) {
            builder.textClass = joinClasses(line.styleClasses.textClass, builder.textClass || "");
          }
        }
        if (builder.map.length == 0) {
          builder.map.push(0, 0, builder.content.appendChild(zeroWidthElement(cm.display.measure)));
        }
        if (i3 == 0) {
          lineView.measure.map = builder.map;
          lineView.measure.cache = {};
        } else {
          (lineView.measure.maps || (lineView.measure.maps = [])).push(builder.map);
          (lineView.measure.caches || (lineView.measure.caches = [])).push({});
        }
      }
      if (webkit) {
        var last = builder.content.lastChild;
        if (/\bcm-tab\b/.test(last.className) || last.querySelector && last.querySelector(".cm-tab")) {
          builder.content.className = "cm-tab-wrap-hack";
        }
      }
      signal(cm, "renderLine", cm, lineView.line, builder.pre);
      if (builder.pre.className) {
        builder.textClass = joinClasses(builder.pre.className, builder.textClass || "");
      }
      return builder;
    }
    function defaultSpecialCharPlaceholder(ch) {
      var token = elt("span", "\u2022", "cm-invalidchar");
      token.title = "\\u" + ch.charCodeAt(0).toString(16);
      token.setAttribute("aria-label", token.title);
      return token;
    }
    function buildToken(builder, text, style, startStyle, endStyle, css2, attributes) {
      if (!text) {
        return;
      }
      var displayText = builder.splitSpaces ? splitSpaces(text, builder.trailingSpace) : text;
      var special = builder.cm.state.specialChars, mustWrap = false;
      var content;
      if (!special.test(text)) {
        builder.col += text.length;
        content = document.createTextNode(displayText);
        builder.map.push(builder.pos, builder.pos + text.length, content);
        if (ie && ie_version < 9) {
          mustWrap = true;
        }
        builder.pos += text.length;
      } else {
        content = document.createDocumentFragment();
        var pos = 0;
        while (true) {
          special.lastIndex = pos;
          var m2 = special.exec(text);
          var skipped = m2 ? m2.index - pos : text.length - pos;
          if (skipped) {
            var txt = document.createTextNode(displayText.slice(pos, pos + skipped));
            if (ie && ie_version < 9) {
              content.appendChild(elt("span", [txt]));
            } else {
              content.appendChild(txt);
            }
            builder.map.push(builder.pos, builder.pos + skipped, txt);
            builder.col += skipped;
            builder.pos += skipped;
          }
          if (!m2) {
            break;
          }
          pos += skipped + 1;
          var txt$1 = void 0;
          if (m2[0] == "	") {
            var tabSize = builder.cm.options.tabSize, tabWidth = tabSize - builder.col % tabSize;
            txt$1 = content.appendChild(elt("span", spaceStr(tabWidth), "cm-tab"));
            txt$1.setAttribute("role", "presentation");
            txt$1.setAttribute("cm-text", "	");
            builder.col += tabWidth;
          } else if (m2[0] == "\r" || m2[0] == "\n") {
            txt$1 = content.appendChild(elt("span", m2[0] == "\r" ? "\u240D" : "\u2424", "cm-invalidchar"));
            txt$1.setAttribute("cm-text", m2[0]);
            builder.col += 1;
          } else {
            txt$1 = builder.cm.options.specialCharPlaceholder(m2[0]);
            txt$1.setAttribute("cm-text", m2[0]);
            if (ie && ie_version < 9) {
              content.appendChild(elt("span", [txt$1]));
            } else {
              content.appendChild(txt$1);
            }
            builder.col += 1;
          }
          builder.map.push(builder.pos, builder.pos + 1, txt$1);
          builder.pos++;
        }
      }
      builder.trailingSpace = displayText.charCodeAt(text.length - 1) == 32;
      if (style || startStyle || endStyle || mustWrap || css2 || attributes) {
        var fullStyle = style || "";
        if (startStyle) {
          fullStyle += startStyle;
        }
        if (endStyle) {
          fullStyle += endStyle;
        }
        var token = elt("span", [content], fullStyle, css2);
        if (attributes) {
          for (var attr in attributes) {
            if (attributes.hasOwnProperty(attr) && attr != "style" && attr != "class") {
              token.setAttribute(attr, attributes[attr]);
            }
          }
        }
        return builder.content.appendChild(token);
      }
      builder.content.appendChild(content);
    }
    function splitSpaces(text, trailingBefore) {
      if (text.length > 1 && !/  /.test(text)) {
        return text;
      }
      var spaceBefore = trailingBefore, result = "";
      for (var i3 = 0; i3 < text.length; i3++) {
        var ch = text.charAt(i3);
        if (ch == " " && spaceBefore && (i3 == text.length - 1 || text.charCodeAt(i3 + 1) == 32)) {
          ch = "\xA0";
        }
        result += ch;
        spaceBefore = ch == " ";
      }
      return result;
    }
    function buildTokenBadBidi(inner, order) {
      return function(builder, text, style, startStyle, endStyle, css2, attributes) {
        style = style ? style + " cm-force-border" : "cm-force-border";
        var start = builder.pos, end = start + text.length;
        for (; ; ) {
          var part = void 0;
          for (var i3 = 0; i3 < order.length; i3++) {
            part = order[i3];
            if (part.to > start && part.from <= start) {
              break;
            }
          }
          if (part.to >= end) {
            return inner(builder, text, style, startStyle, endStyle, css2, attributes);
          }
          inner(builder, text.slice(0, part.to - start), style, startStyle, null, css2, attributes);
          startStyle = null;
          text = text.slice(part.to - start);
          start = part.to;
        }
      };
    }
    function buildCollapsedSpan(builder, size, marker, ignoreWidget) {
      var widget = !ignoreWidget && marker.widgetNode;
      if (widget) {
        builder.map.push(builder.pos, builder.pos + size, widget);
      }
      if (!ignoreWidget && builder.cm.display.input.needsContentAttribute) {
        if (!widget) {
          widget = builder.content.appendChild(document.createElement("span"));
        }
        widget.setAttribute("cm-marker", marker.id);
      }
      if (widget) {
        builder.cm.display.input.setUneditable(widget);
        builder.content.appendChild(widget);
      }
      builder.pos += size;
      builder.trailingSpace = false;
    }
    function insertLineContent(line, builder, styles) {
      var spans = line.markedSpans, allText = line.text, at = 0;
      if (!spans) {
        for (var i$13 = 1; i$13 < styles.length; i$13 += 2) {
          builder.addToken(builder, allText.slice(at, at = styles[i$13]), interpretTokenStyle(styles[i$13 + 1], builder.cm.options));
        }
        return;
      }
      var len = allText.length, pos = 0, i3 = 1, text = "", style, css2;
      var nextChange = 0, spanStyle, spanEndStyle, spanStartStyle, collapsed, attributes;
      for (; ; ) {
        if (nextChange == pos) {
          spanStyle = spanEndStyle = spanStartStyle = css2 = "";
          attributes = null;
          collapsed = null;
          nextChange = Infinity;
          var foundBookmarks = [], endStyles = void 0;
          for (var j = 0; j < spans.length; ++j) {
            var sp = spans[j], m2 = sp.marker;
            if (m2.type == "bookmark" && sp.from == pos && m2.widgetNode) {
              foundBookmarks.push(m2);
            } else if (sp.from <= pos && (sp.to == null || sp.to > pos || m2.collapsed && sp.to == pos && sp.from == pos)) {
              if (sp.to != null && sp.to != pos && nextChange > sp.to) {
                nextChange = sp.to;
                spanEndStyle = "";
              }
              if (m2.className) {
                spanStyle += " " + m2.className;
              }
              if (m2.css) {
                css2 = (css2 ? css2 + ";" : "") + m2.css;
              }
              if (m2.startStyle && sp.from == pos) {
                spanStartStyle += " " + m2.startStyle;
              }
              if (m2.endStyle && sp.to == nextChange) {
                (endStyles || (endStyles = [])).push(m2.endStyle, sp.to);
              }
              if (m2.title) {
                (attributes || (attributes = {})).title = m2.title;
              }
              if (m2.attributes) {
                for (var attr in m2.attributes) {
                  (attributes || (attributes = {}))[attr] = m2.attributes[attr];
                }
              }
              if (m2.collapsed && (!collapsed || compareCollapsedMarkers(collapsed.marker, m2) < 0)) {
                collapsed = sp;
              }
            } else if (sp.from > pos && nextChange > sp.from) {
              nextChange = sp.from;
            }
          }
          if (endStyles) {
            for (var j$1 = 0; j$1 < endStyles.length; j$1 += 2) {
              if (endStyles[j$1 + 1] == nextChange) {
                spanEndStyle += " " + endStyles[j$1];
              }
            }
          }
          if (!collapsed || collapsed.from == pos) {
            for (var j$2 = 0; j$2 < foundBookmarks.length; ++j$2) {
              buildCollapsedSpan(builder, 0, foundBookmarks[j$2]);
            }
          }
          if (collapsed && (collapsed.from || 0) == pos) {
            buildCollapsedSpan(builder, (collapsed.to == null ? len + 1 : collapsed.to) - pos, collapsed.marker, collapsed.from == null);
            if (collapsed.to == null) {
              return;
            }
            if (collapsed.to == pos) {
              collapsed = false;
            }
          }
        }
        if (pos >= len) {
          break;
        }
        var upto = Math.min(len, nextChange);
        while (true) {
          if (text) {
            var end = pos + text.length;
            if (!collapsed) {
              var tokenText = end > upto ? text.slice(0, upto - pos) : text;
              builder.addToken(builder, tokenText, style ? style + spanStyle : spanStyle, spanStartStyle, pos + tokenText.length == nextChange ? spanEndStyle : "", css2, attributes);
            }
            if (end >= upto) {
              text = text.slice(upto - pos);
              pos = upto;
              break;
            }
            pos = end;
            spanStartStyle = "";
          }
          text = allText.slice(at, at = styles[i3++]);
          style = interpretTokenStyle(styles[i3++], builder.cm.options);
        }
      }
    }
    function LineView(doc, line, lineN) {
      this.line = line;
      this.rest = visualLineContinued(line);
      this.size = this.rest ? lineNo(lst(this.rest)) - lineN + 1 : 1;
      this.node = this.text = null;
      this.hidden = lineIsHidden(doc, line);
    }
    function buildViewArray(cm, from, to) {
      var array = [], nextPos;
      for (var pos = from; pos < to; pos = nextPos) {
        var view = new LineView(cm.doc, getLine(cm.doc, pos), pos);
        nextPos = pos + view.size;
        array.push(view);
      }
      return array;
    }
    var operationGroup = null;
    function pushOperation(op) {
      if (operationGroup) {
        operationGroup.ops.push(op);
      } else {
        op.ownsGroup = operationGroup = {
          ops: [op],
          delayedCallbacks: []
        };
      }
    }
    function fireCallbacksForOps(group) {
      var callbacks = group.delayedCallbacks, i3 = 0;
      do {
        for (; i3 < callbacks.length; i3++) {
          callbacks[i3].call(null);
        }
        for (var j = 0; j < group.ops.length; j++) {
          var op = group.ops[j];
          if (op.cursorActivityHandlers) {
            while (op.cursorActivityCalled < op.cursorActivityHandlers.length) {
              op.cursorActivityHandlers[op.cursorActivityCalled++].call(null, op.cm);
            }
          }
        }
      } while (i3 < callbacks.length);
    }
    function finishOperation(op, endCb) {
      var group = op.ownsGroup;
      if (!group) {
        return;
      }
      try {
        fireCallbacksForOps(group);
      } finally {
        operationGroup = null;
        endCb(group);
      }
    }
    var orphanDelayedCallbacks = null;
    function signalLater(emitter, type) {
      var arr = getHandlers(emitter, type);
      if (!arr.length) {
        return;
      }
      var args = Array.prototype.slice.call(arguments, 2), list;
      if (operationGroup) {
        list = operationGroup.delayedCallbacks;
      } else if (orphanDelayedCallbacks) {
        list = orphanDelayedCallbacks;
      } else {
        list = orphanDelayedCallbacks = [];
        setTimeout(fireOrphanDelayed, 0);
      }
      var loop = function(i4) {
        list.push(function() {
          return arr[i4].apply(null, args);
        });
      };
      for (var i3 = 0; i3 < arr.length; ++i3)
        loop(i3);
    }
    function fireOrphanDelayed() {
      var delayed = orphanDelayedCallbacks;
      orphanDelayedCallbacks = null;
      for (var i3 = 0; i3 < delayed.length; ++i3) {
        delayed[i3]();
      }
    }
    function updateLineForChanges(cm, lineView, lineN, dims) {
      for (var j = 0; j < lineView.changes.length; j++) {
        var type = lineView.changes[j];
        if (type == "text") {
          updateLineText(cm, lineView);
        } else if (type == "gutter") {
          updateLineGutter(cm, lineView, lineN, dims);
        } else if (type == "class") {
          updateLineClasses(cm, lineView);
        } else if (type == "widget") {
          updateLineWidgets(cm, lineView, dims);
        }
      }
      lineView.changes = null;
    }
    function ensureLineWrapped(lineView) {
      if (lineView.node == lineView.text) {
        lineView.node = elt("div", null, null, "position: relative");
        if (lineView.text.parentNode) {
          lineView.text.parentNode.replaceChild(lineView.node, lineView.text);
        }
        lineView.node.appendChild(lineView.text);
        if (ie && ie_version < 8) {
          lineView.node.style.zIndex = 2;
        }
      }
      return lineView.node;
    }
    function updateLineBackground(cm, lineView) {
      var cls = lineView.bgClass ? lineView.bgClass + " " + (lineView.line.bgClass || "") : lineView.line.bgClass;
      if (cls) {
        cls += " CodeMirror-linebackground";
      }
      if (lineView.background) {
        if (cls) {
          lineView.background.className = cls;
        } else {
          lineView.background.parentNode.removeChild(lineView.background);
          lineView.background = null;
        }
      } else if (cls) {
        var wrap = ensureLineWrapped(lineView);
        lineView.background = wrap.insertBefore(elt("div", null, cls), wrap.firstChild);
        cm.display.input.setUneditable(lineView.background);
      }
    }
    function getLineContent(cm, lineView) {
      var ext = cm.display.externalMeasured;
      if (ext && ext.line == lineView.line) {
        cm.display.externalMeasured = null;
        lineView.measure = ext.measure;
        return ext.built;
      }
      return buildLineContent(cm, lineView);
    }
    function updateLineText(cm, lineView) {
      var cls = lineView.text.className;
      var built = getLineContent(cm, lineView);
      if (lineView.text == lineView.node) {
        lineView.node = built.pre;
      }
      lineView.text.parentNode.replaceChild(built.pre, lineView.text);
      lineView.text = built.pre;
      if (built.bgClass != lineView.bgClass || built.textClass != lineView.textClass) {
        lineView.bgClass = built.bgClass;
        lineView.textClass = built.textClass;
        updateLineClasses(cm, lineView);
      } else if (cls) {
        lineView.text.className = cls;
      }
    }
    function updateLineClasses(cm, lineView) {
      updateLineBackground(cm, lineView);
      if (lineView.line.wrapClass) {
        ensureLineWrapped(lineView).className = lineView.line.wrapClass;
      } else if (lineView.node != lineView.text) {
        lineView.node.className = "";
      }
      var textClass = lineView.textClass ? lineView.textClass + " " + (lineView.line.textClass || "") : lineView.line.textClass;
      lineView.text.className = textClass || "";
    }
    function updateLineGutter(cm, lineView, lineN, dims) {
      if (lineView.gutter) {
        lineView.node.removeChild(lineView.gutter);
        lineView.gutter = null;
      }
      if (lineView.gutterBackground) {
        lineView.node.removeChild(lineView.gutterBackground);
        lineView.gutterBackground = null;
      }
      if (lineView.line.gutterClass) {
        var wrap = ensureLineWrapped(lineView);
        lineView.gutterBackground = elt("div", null, "CodeMirror-gutter-background " + lineView.line.gutterClass, "left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px; width: " + dims.gutterTotalWidth + "px");
        cm.display.input.setUneditable(lineView.gutterBackground);
        wrap.insertBefore(lineView.gutterBackground, lineView.text);
      }
      var markers = lineView.line.gutterMarkers;
      if (cm.options.lineNumbers || markers) {
        var wrap$1 = ensureLineWrapped(lineView);
        var gutterWrap = lineView.gutter = elt("div", null, "CodeMirror-gutter-wrapper", "left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px");
        gutterWrap.setAttribute("aria-hidden", "true");
        cm.display.input.setUneditable(gutterWrap);
        wrap$1.insertBefore(gutterWrap, lineView.text);
        if (lineView.line.gutterClass) {
          gutterWrap.className += " " + lineView.line.gutterClass;
        }
        if (cm.options.lineNumbers && (!markers || !markers["CodeMirror-linenumbers"])) {
          lineView.lineNumber = gutterWrap.appendChild(elt("div", lineNumberFor(cm.options, lineN), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + dims.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + cm.display.lineNumInnerWidth + "px"));
        }
        if (markers) {
          for (var k2 = 0; k2 < cm.display.gutterSpecs.length; ++k2) {
            var id = cm.display.gutterSpecs[k2].className, found = markers.hasOwnProperty(id) && markers[id];
            if (found) {
              gutterWrap.appendChild(elt("div", [found], "CodeMirror-gutter-elt", "left: " + dims.gutterLeft[id] + "px; width: " + dims.gutterWidth[id] + "px"));
            }
          }
        }
      }
    }
    function updateLineWidgets(cm, lineView, dims) {
      if (lineView.alignable) {
        lineView.alignable = null;
      }
      var isWidget = classTest("CodeMirror-linewidget");
      for (var node = lineView.node.firstChild, next = void 0; node; node = next) {
        next = node.nextSibling;
        if (isWidget.test(node.className)) {
          lineView.node.removeChild(node);
        }
      }
      insertLineWidgets(cm, lineView, dims);
    }
    function buildLineElement(cm, lineView, lineN, dims) {
      var built = getLineContent(cm, lineView);
      lineView.text = lineView.node = built.pre;
      if (built.bgClass) {
        lineView.bgClass = built.bgClass;
      }
      if (built.textClass) {
        lineView.textClass = built.textClass;
      }
      updateLineClasses(cm, lineView);
      updateLineGutter(cm, lineView, lineN, dims);
      insertLineWidgets(cm, lineView, dims);
      return lineView.node;
    }
    function insertLineWidgets(cm, lineView, dims) {
      insertLineWidgetsFor(cm, lineView.line, lineView, dims, true);
      if (lineView.rest) {
        for (var i3 = 0; i3 < lineView.rest.length; i3++) {
          insertLineWidgetsFor(cm, lineView.rest[i3], lineView, dims, false);
        }
      }
    }
    function insertLineWidgetsFor(cm, line, lineView, dims, allowAbove) {
      if (!line.widgets) {
        return;
      }
      var wrap = ensureLineWrapped(lineView);
      for (var i3 = 0, ws = line.widgets; i3 < ws.length; ++i3) {
        var widget = ws[i3], node = elt("div", [widget.node], "CodeMirror-linewidget" + (widget.className ? " " + widget.className : ""));
        if (!widget.handleMouseEvents) {
          node.setAttribute("cm-ignore-events", "true");
        }
        positionLineWidget(widget, node, lineView, dims);
        cm.display.input.setUneditable(node);
        if (allowAbove && widget.above) {
          wrap.insertBefore(node, lineView.gutter || lineView.text);
        } else {
          wrap.appendChild(node);
        }
        signalLater(widget, "redraw");
      }
    }
    function positionLineWidget(widget, node, lineView, dims) {
      if (widget.noHScroll) {
        (lineView.alignable || (lineView.alignable = [])).push(node);
        var width = dims.wrapperWidth;
        node.style.left = dims.fixedPos + "px";
        if (!widget.coverGutter) {
          width -= dims.gutterTotalWidth;
          node.style.paddingLeft = dims.gutterTotalWidth + "px";
        }
        node.style.width = width + "px";
      }
      if (widget.coverGutter) {
        node.style.zIndex = 5;
        node.style.position = "relative";
        if (!widget.noHScroll) {
          node.style.marginLeft = -dims.gutterTotalWidth + "px";
        }
      }
    }
    function widgetHeight(widget) {
      if (widget.height != null) {
        return widget.height;
      }
      var cm = widget.doc.cm;
      if (!cm) {
        return 0;
      }
      if (!contains(document.body, widget.node)) {
        var parentStyle = "position: relative;";
        if (widget.coverGutter) {
          parentStyle += "margin-left: -" + cm.display.gutters.offsetWidth + "px;";
        }
        if (widget.noHScroll) {
          parentStyle += "width: " + cm.display.wrapper.clientWidth + "px;";
        }
        removeChildrenAndAdd(cm.display.measure, elt("div", [widget.node], null, parentStyle));
      }
      return widget.height = widget.node.parentNode.offsetHeight;
    }
    function eventInWidget(display, e2) {
      for (var n2 = e_target(e2); n2 != display.wrapper; n2 = n2.parentNode) {
        if (!n2 || n2.nodeType == 1 && n2.getAttribute("cm-ignore-events") == "true" || n2.parentNode == display.sizer && n2 != display.mover) {
          return true;
        }
      }
    }
    function paddingTop(display) {
      return display.lineSpace.offsetTop;
    }
    function paddingVert(display) {
      return display.mover.offsetHeight - display.lineSpace.offsetHeight;
    }
    function paddingH(display) {
      if (display.cachedPaddingH) {
        return display.cachedPaddingH;
      }
      var e2 = removeChildrenAndAdd(display.measure, elt("pre", "x", "CodeMirror-line-like"));
      var style = window.getComputedStyle ? window.getComputedStyle(e2) : e2.currentStyle;
      var data = { left: parseInt(style.paddingLeft), right: parseInt(style.paddingRight) };
      if (!isNaN(data.left) && !isNaN(data.right)) {
        display.cachedPaddingH = data;
      }
      return data;
    }
    function scrollGap(cm) {
      return scrollerGap - cm.display.nativeBarWidth;
    }
    function displayWidth(cm) {
      return cm.display.scroller.clientWidth - scrollGap(cm) - cm.display.barWidth;
    }
    function displayHeight(cm) {
      return cm.display.scroller.clientHeight - scrollGap(cm) - cm.display.barHeight;
    }
    function ensureLineHeights(cm, lineView, rect) {
      var wrapping = cm.options.lineWrapping;
      var curWidth = wrapping && displayWidth(cm);
      if (!lineView.measure.heights || wrapping && lineView.measure.width != curWidth) {
        var heights = lineView.measure.heights = [];
        if (wrapping) {
          lineView.measure.width = curWidth;
          var rects = lineView.text.firstChild.getClientRects();
          for (var i3 = 0; i3 < rects.length - 1; i3++) {
            var cur = rects[i3], next = rects[i3 + 1];
            if (Math.abs(cur.bottom - next.bottom) > 2) {
              heights.push((cur.bottom + next.top) / 2 - rect.top);
            }
          }
        }
        heights.push(rect.bottom - rect.top);
      }
    }
    function mapFromLineView(lineView, line, lineN) {
      if (lineView.line == line) {
        return { map: lineView.measure.map, cache: lineView.measure.cache };
      }
      for (var i3 = 0; i3 < lineView.rest.length; i3++) {
        if (lineView.rest[i3] == line) {
          return { map: lineView.measure.maps[i3], cache: lineView.measure.caches[i3] };
        }
      }
      for (var i$13 = 0; i$13 < lineView.rest.length; i$13++) {
        if (lineNo(lineView.rest[i$13]) > lineN) {
          return { map: lineView.measure.maps[i$13], cache: lineView.measure.caches[i$13], before: true };
        }
      }
    }
    function updateExternalMeasurement(cm, line) {
      line = visualLine(line);
      var lineN = lineNo(line);
      var view = cm.display.externalMeasured = new LineView(cm.doc, line, lineN);
      view.lineN = lineN;
      var built = view.built = buildLineContent(cm, view);
      view.text = built.pre;
      removeChildrenAndAdd(cm.display.lineMeasure, built.pre);
      return view;
    }
    function measureChar(cm, line, ch, bias) {
      return measureCharPrepared(cm, prepareMeasureForLine(cm, line), ch, bias);
    }
    function findViewForLine(cm, lineN) {
      if (lineN >= cm.display.viewFrom && lineN < cm.display.viewTo) {
        return cm.display.view[findViewIndex(cm, lineN)];
      }
      var ext = cm.display.externalMeasured;
      if (ext && lineN >= ext.lineN && lineN < ext.lineN + ext.size) {
        return ext;
      }
    }
    function prepareMeasureForLine(cm, line) {
      var lineN = lineNo(line);
      var view = findViewForLine(cm, lineN);
      if (view && !view.text) {
        view = null;
      } else if (view && view.changes) {
        updateLineForChanges(cm, view, lineN, getDimensions(cm));
        cm.curOp.forceUpdate = true;
      }
      if (!view) {
        view = updateExternalMeasurement(cm, line);
      }
      var info = mapFromLineView(view, line, lineN);
      return {
        line,
        view,
        rect: null,
        map: info.map,
        cache: info.cache,
        before: info.before,
        hasHeights: false
      };
    }
    function measureCharPrepared(cm, prepared, ch, bias, varHeight) {
      if (prepared.before) {
        ch = -1;
      }
      var key = ch + (bias || ""), found;
      if (prepared.cache.hasOwnProperty(key)) {
        found = prepared.cache[key];
      } else {
        if (!prepared.rect) {
          prepared.rect = prepared.view.text.getBoundingClientRect();
        }
        if (!prepared.hasHeights) {
          ensureLineHeights(cm, prepared.view, prepared.rect);
          prepared.hasHeights = true;
        }
        found = measureCharInner(cm, prepared, ch, bias);
        if (!found.bogus) {
          prepared.cache[key] = found;
        }
      }
      return {
        left: found.left,
        right: found.right,
        top: varHeight ? found.rtop : found.top,
        bottom: varHeight ? found.rbottom : found.bottom
      };
    }
    var nullRect = { left: 0, right: 0, top: 0, bottom: 0 };
    function nodeAndOffsetInLineMap(map2, ch, bias) {
      var node, start, end, collapse, mStart, mEnd;
      for (var i3 = 0; i3 < map2.length; i3 += 3) {
        mStart = map2[i3];
        mEnd = map2[i3 + 1];
        if (ch < mStart) {
          start = 0;
          end = 1;
          collapse = "left";
        } else if (ch < mEnd) {
          start = ch - mStart;
          end = start + 1;
        } else if (i3 == map2.length - 3 || ch == mEnd && map2[i3 + 3] > ch) {
          end = mEnd - mStart;
          start = end - 1;
          if (ch >= mEnd) {
            collapse = "right";
          }
        }
        if (start != null) {
          node = map2[i3 + 2];
          if (mStart == mEnd && bias == (node.insertLeft ? "left" : "right")) {
            collapse = bias;
          }
          if (bias == "left" && start == 0) {
            while (i3 && map2[i3 - 2] == map2[i3 - 3] && map2[i3 - 1].insertLeft) {
              node = map2[(i3 -= 3) + 2];
              collapse = "left";
            }
          }
          if (bias == "right" && start == mEnd - mStart) {
            while (i3 < map2.length - 3 && map2[i3 + 3] == map2[i3 + 4] && !map2[i3 + 5].insertLeft) {
              node = map2[(i3 += 3) + 2];
              collapse = "right";
            }
          }
          break;
        }
      }
      return { node, start, end, collapse, coverStart: mStart, coverEnd: mEnd };
    }
    function getUsefulRect(rects, bias) {
      var rect = nullRect;
      if (bias == "left") {
        for (var i3 = 0; i3 < rects.length; i3++) {
          if ((rect = rects[i3]).left != rect.right) {
            break;
          }
        }
      } else {
        for (var i$13 = rects.length - 1; i$13 >= 0; i$13--) {
          if ((rect = rects[i$13]).left != rect.right) {
            break;
          }
        }
      }
      return rect;
    }
    function measureCharInner(cm, prepared, ch, bias) {
      var place = nodeAndOffsetInLineMap(prepared.map, ch, bias);
      var node = place.node, start = place.start, end = place.end, collapse = place.collapse;
      var rect;
      if (node.nodeType == 3) {
        for (var i$13 = 0; i$13 < 4; i$13++) {
          while (start && isExtendingChar(prepared.line.text.charAt(place.coverStart + start))) {
            --start;
          }
          while (place.coverStart + end < place.coverEnd && isExtendingChar(prepared.line.text.charAt(place.coverStart + end))) {
            ++end;
          }
          if (ie && ie_version < 9 && start == 0 && end == place.coverEnd - place.coverStart) {
            rect = node.parentNode.getBoundingClientRect();
          } else {
            rect = getUsefulRect(range(node, start, end).getClientRects(), bias);
          }
          if (rect.left || rect.right || start == 0) {
            break;
          }
          end = start;
          start = start - 1;
          collapse = "right";
        }
        if (ie && ie_version < 11) {
          rect = maybeUpdateRectForZooming(cm.display.measure, rect);
        }
      } else {
        if (start > 0) {
          collapse = bias = "right";
        }
        var rects;
        if (cm.options.lineWrapping && (rects = node.getClientRects()).length > 1) {
          rect = rects[bias == "right" ? rects.length - 1 : 0];
        } else {
          rect = node.getBoundingClientRect();
        }
      }
      if (ie && ie_version < 9 && !start && (!rect || !rect.left && !rect.right)) {
        var rSpan = node.parentNode.getClientRects()[0];
        if (rSpan) {
          rect = { left: rSpan.left, right: rSpan.left + charWidth(cm.display), top: rSpan.top, bottom: rSpan.bottom };
        } else {
          rect = nullRect;
        }
      }
      var rtop = rect.top - prepared.rect.top, rbot = rect.bottom - prepared.rect.top;
      var mid = (rtop + rbot) / 2;
      var heights = prepared.view.measure.heights;
      var i3 = 0;
      for (; i3 < heights.length - 1; i3++) {
        if (mid < heights[i3]) {
          break;
        }
      }
      var top = i3 ? heights[i3 - 1] : 0, bot = heights[i3];
      var result = {
        left: (collapse == "right" ? rect.right : rect.left) - prepared.rect.left,
        right: (collapse == "left" ? rect.left : rect.right) - prepared.rect.left,
        top,
        bottom: bot
      };
      if (!rect.left && !rect.right) {
        result.bogus = true;
      }
      if (!cm.options.singleCursorHeightPerLine) {
        result.rtop = rtop;
        result.rbottom = rbot;
      }
      return result;
    }
    function maybeUpdateRectForZooming(measure, rect) {
      if (!window.screen || screen.logicalXDPI == null || screen.logicalXDPI == screen.deviceXDPI || !hasBadZoomedRects(measure)) {
        return rect;
      }
      var scaleX = screen.logicalXDPI / screen.deviceXDPI;
      var scaleY = screen.logicalYDPI / screen.deviceYDPI;
      return {
        left: rect.left * scaleX,
        right: rect.right * scaleX,
        top: rect.top * scaleY,
        bottom: rect.bottom * scaleY
      };
    }
    function clearLineMeasurementCacheFor(lineView) {
      if (lineView.measure) {
        lineView.measure.cache = {};
        lineView.measure.heights = null;
        if (lineView.rest) {
          for (var i3 = 0; i3 < lineView.rest.length; i3++) {
            lineView.measure.caches[i3] = {};
          }
        }
      }
    }
    function clearLineMeasurementCache(cm) {
      cm.display.externalMeasure = null;
      removeChildren(cm.display.lineMeasure);
      for (var i3 = 0; i3 < cm.display.view.length; i3++) {
        clearLineMeasurementCacheFor(cm.display.view[i3]);
      }
    }
    function clearCaches(cm) {
      clearLineMeasurementCache(cm);
      cm.display.cachedCharWidth = cm.display.cachedTextHeight = cm.display.cachedPaddingH = null;
      if (!cm.options.lineWrapping) {
        cm.display.maxLineChanged = true;
      }
      cm.display.lineNumChars = null;
    }
    function pageScrollX() {
      if (chrome && android) {
        return -(document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft));
      }
      return window.pageXOffset || (document.documentElement || document.body).scrollLeft;
    }
    function pageScrollY() {
      if (chrome && android) {
        return -(document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop));
      }
      return window.pageYOffset || (document.documentElement || document.body).scrollTop;
    }
    function widgetTopHeight(lineObj) {
      var height = 0;
      if (lineObj.widgets) {
        for (var i3 = 0; i3 < lineObj.widgets.length; ++i3) {
          if (lineObj.widgets[i3].above) {
            height += widgetHeight(lineObj.widgets[i3]);
          }
        }
      }
      return height;
    }
    function intoCoordSystem(cm, lineObj, rect, context, includeWidgets) {
      if (!includeWidgets) {
        var height = widgetTopHeight(lineObj);
        rect.top += height;
        rect.bottom += height;
      }
      if (context == "line") {
        return rect;
      }
      if (!context) {
        context = "local";
      }
      var yOff = heightAtLine(lineObj);
      if (context == "local") {
        yOff += paddingTop(cm.display);
      } else {
        yOff -= cm.display.viewOffset;
      }
      if (context == "page" || context == "window") {
        var lOff = cm.display.lineSpace.getBoundingClientRect();
        yOff += lOff.top + (context == "window" ? 0 : pageScrollY());
        var xOff = lOff.left + (context == "window" ? 0 : pageScrollX());
        rect.left += xOff;
        rect.right += xOff;
      }
      rect.top += yOff;
      rect.bottom += yOff;
      return rect;
    }
    function fromCoordSystem(cm, coords, context) {
      if (context == "div") {
        return coords;
      }
      var left = coords.left, top = coords.top;
      if (context == "page") {
        left -= pageScrollX();
        top -= pageScrollY();
      } else if (context == "local" || !context) {
        var localBox = cm.display.sizer.getBoundingClientRect();
        left += localBox.left;
        top += localBox.top;
      }
      var lineSpaceBox = cm.display.lineSpace.getBoundingClientRect();
      return { left: left - lineSpaceBox.left, top: top - lineSpaceBox.top };
    }
    function charCoords(cm, pos, context, lineObj, bias) {
      if (!lineObj) {
        lineObj = getLine(cm.doc, pos.line);
      }
      return intoCoordSystem(cm, lineObj, measureChar(cm, lineObj, pos.ch, bias), context);
    }
    function cursorCoords(cm, pos, context, lineObj, preparedMeasure, varHeight) {
      lineObj = lineObj || getLine(cm.doc, pos.line);
      if (!preparedMeasure) {
        preparedMeasure = prepareMeasureForLine(cm, lineObj);
      }
      function get(ch2, right) {
        var m2 = measureCharPrepared(cm, preparedMeasure, ch2, right ? "right" : "left", varHeight);
        if (right) {
          m2.left = m2.right;
        } else {
          m2.right = m2.left;
        }
        return intoCoordSystem(cm, lineObj, m2, context);
      }
      var order = getOrder(lineObj, cm.doc.direction), ch = pos.ch, sticky = pos.sticky;
      if (ch >= lineObj.text.length) {
        ch = lineObj.text.length;
        sticky = "before";
      } else if (ch <= 0) {
        ch = 0;
        sticky = "after";
      }
      if (!order) {
        return get(sticky == "before" ? ch - 1 : ch, sticky == "before");
      }
      function getBidi(ch2, partPos2, invert) {
        var part = order[partPos2], right = part.level == 1;
        return get(invert ? ch2 - 1 : ch2, right != invert);
      }
      var partPos = getBidiPartAt(order, ch, sticky);
      var other = bidiOther;
      var val = getBidi(ch, partPos, sticky == "before");
      if (other != null) {
        val.other = getBidi(ch, other, sticky != "before");
      }
      return val;
    }
    function estimateCoords(cm, pos) {
      var left = 0;
      pos = clipPos(cm.doc, pos);
      if (!cm.options.lineWrapping) {
        left = charWidth(cm.display) * pos.ch;
      }
      var lineObj = getLine(cm.doc, pos.line);
      var top = heightAtLine(lineObj) + paddingTop(cm.display);
      return { left, right: left, top, bottom: top + lineObj.height };
    }
    function PosWithInfo(line, ch, sticky, outside, xRel) {
      var pos = Pos(line, ch, sticky);
      pos.xRel = xRel;
      if (outside) {
        pos.outside = outside;
      }
      return pos;
    }
    function coordsChar(cm, x2, y) {
      var doc = cm.doc;
      y += cm.display.viewOffset;
      if (y < 0) {
        return PosWithInfo(doc.first, 0, null, -1, -1);
      }
      var lineN = lineAtHeight(doc, y), last = doc.first + doc.size - 1;
      if (lineN > last) {
        return PosWithInfo(doc.first + doc.size - 1, getLine(doc, last).text.length, null, 1, 1);
      }
      if (x2 < 0) {
        x2 = 0;
      }
      var lineObj = getLine(doc, lineN);
      for (; ; ) {
        var found = coordsCharInner(cm, lineObj, lineN, x2, y);
        var collapsed = collapsedSpanAround(lineObj, found.ch + (found.xRel > 0 || found.outside > 0 ? 1 : 0));
        if (!collapsed) {
          return found;
        }
        var rangeEnd = collapsed.find(1);
        if (rangeEnd.line == lineN) {
          return rangeEnd;
        }
        lineObj = getLine(doc, lineN = rangeEnd.line);
      }
    }
    function wrappedLineExtent(cm, lineObj, preparedMeasure, y) {
      y -= widgetTopHeight(lineObj);
      var end = lineObj.text.length;
      var begin = findFirst(function(ch) {
        return measureCharPrepared(cm, preparedMeasure, ch - 1).bottom <= y;
      }, end, 0);
      end = findFirst(function(ch) {
        return measureCharPrepared(cm, preparedMeasure, ch).top > y;
      }, begin, end);
      return { begin, end };
    }
    function wrappedLineExtentChar(cm, lineObj, preparedMeasure, target) {
      if (!preparedMeasure) {
        preparedMeasure = prepareMeasureForLine(cm, lineObj);
      }
      var targetTop = intoCoordSystem(cm, lineObj, measureCharPrepared(cm, preparedMeasure, target), "line").top;
      return wrappedLineExtent(cm, lineObj, preparedMeasure, targetTop);
    }
    function boxIsAfter(box, x2, y, left) {
      return box.bottom <= y ? false : box.top > y ? true : (left ? box.left : box.right) > x2;
    }
    function coordsCharInner(cm, lineObj, lineNo2, x2, y) {
      y -= heightAtLine(lineObj);
      var preparedMeasure = prepareMeasureForLine(cm, lineObj);
      var widgetHeight2 = widgetTopHeight(lineObj);
      var begin = 0, end = lineObj.text.length, ltr = true;
      var order = getOrder(lineObj, cm.doc.direction);
      if (order) {
        var part = (cm.options.lineWrapping ? coordsBidiPartWrapped : coordsBidiPart)(cm, lineObj, lineNo2, preparedMeasure, order, x2, y);
        ltr = part.level != 1;
        begin = ltr ? part.from : part.to - 1;
        end = ltr ? part.to : part.from - 1;
      }
      var chAround = null, boxAround = null;
      var ch = findFirst(function(ch2) {
        var box = measureCharPrepared(cm, preparedMeasure, ch2);
        box.top += widgetHeight2;
        box.bottom += widgetHeight2;
        if (!boxIsAfter(box, x2, y, false)) {
          return false;
        }
        if (box.top <= y && box.left <= x2) {
          chAround = ch2;
          boxAround = box;
        }
        return true;
      }, begin, end);
      var baseX, sticky, outside = false;
      if (boxAround) {
        var atLeft = x2 - boxAround.left < boxAround.right - x2, atStart = atLeft == ltr;
        ch = chAround + (atStart ? 0 : 1);
        sticky = atStart ? "after" : "before";
        baseX = atLeft ? boxAround.left : boxAround.right;
      } else {
        if (!ltr && (ch == end || ch == begin)) {
          ch++;
        }
        sticky = ch == 0 ? "after" : ch == lineObj.text.length ? "before" : measureCharPrepared(cm, preparedMeasure, ch - (ltr ? 1 : 0)).bottom + widgetHeight2 <= y == ltr ? "after" : "before";
        var coords = cursorCoords(cm, Pos(lineNo2, ch, sticky), "line", lineObj, preparedMeasure);
        baseX = coords.left;
        outside = y < coords.top ? -1 : y >= coords.bottom ? 1 : 0;
      }
      ch = skipExtendingChars(lineObj.text, ch, 1);
      return PosWithInfo(lineNo2, ch, sticky, outside, x2 - baseX);
    }
    function coordsBidiPart(cm, lineObj, lineNo2, preparedMeasure, order, x2, y) {
      var index = findFirst(function(i3) {
        var part2 = order[i3], ltr2 = part2.level != 1;
        return boxIsAfter(cursorCoords(cm, Pos(lineNo2, ltr2 ? part2.to : part2.from, ltr2 ? "before" : "after"), "line", lineObj, preparedMeasure), x2, y, true);
      }, 0, order.length - 1);
      var part = order[index];
      if (index > 0) {
        var ltr = part.level != 1;
        var start = cursorCoords(cm, Pos(lineNo2, ltr ? part.from : part.to, ltr ? "after" : "before"), "line", lineObj, preparedMeasure);
        if (boxIsAfter(start, x2, y, true) && start.top > y) {
          part = order[index - 1];
        }
      }
      return part;
    }
    function coordsBidiPartWrapped(cm, lineObj, _lineNo, preparedMeasure, order, x2, y) {
      var ref = wrappedLineExtent(cm, lineObj, preparedMeasure, y);
      var begin = ref.begin;
      var end = ref.end;
      if (/\s/.test(lineObj.text.charAt(end - 1))) {
        end--;
      }
      var part = null, closestDist = null;
      for (var i3 = 0; i3 < order.length; i3++) {
        var p2 = order[i3];
        if (p2.from >= end || p2.to <= begin) {
          continue;
        }
        var ltr = p2.level != 1;
        var endX = measureCharPrepared(cm, preparedMeasure, ltr ? Math.min(end, p2.to) - 1 : Math.max(begin, p2.from)).right;
        var dist = endX < x2 ? x2 - endX + 1e9 : endX - x2;
        if (!part || closestDist > dist) {
          part = p2;
          closestDist = dist;
        }
      }
      if (!part) {
        part = order[order.length - 1];
      }
      if (part.from < begin) {
        part = { from: begin, to: part.to, level: part.level };
      }
      if (part.to > end) {
        part = { from: part.from, to: end, level: part.level };
      }
      return part;
    }
    var measureText;
    function textHeight(display) {
      if (display.cachedTextHeight != null) {
        return display.cachedTextHeight;
      }
      if (measureText == null) {
        measureText = elt("pre", null, "CodeMirror-line-like");
        for (var i3 = 0; i3 < 49; ++i3) {
          measureText.appendChild(document.createTextNode("x"));
          measureText.appendChild(elt("br"));
        }
        measureText.appendChild(document.createTextNode("x"));
      }
      removeChildrenAndAdd(display.measure, measureText);
      var height = measureText.offsetHeight / 50;
      if (height > 3) {
        display.cachedTextHeight = height;
      }
      removeChildren(display.measure);
      return height || 1;
    }
    function charWidth(display) {
      if (display.cachedCharWidth != null) {
        return display.cachedCharWidth;
      }
      var anchor = elt("span", "xxxxxxxxxx");
      var pre = elt("pre", [anchor], "CodeMirror-line-like");
      removeChildrenAndAdd(display.measure, pre);
      var rect = anchor.getBoundingClientRect(), width = (rect.right - rect.left) / 10;
      if (width > 2) {
        display.cachedCharWidth = width;
      }
      return width || 10;
    }
    function getDimensions(cm) {
      var d2 = cm.display, left = {}, width = {};
      var gutterLeft = d2.gutters.clientLeft;
      for (var n2 = d2.gutters.firstChild, i3 = 0; n2; n2 = n2.nextSibling, ++i3) {
        var id = cm.display.gutterSpecs[i3].className;
        left[id] = n2.offsetLeft + n2.clientLeft + gutterLeft;
        width[id] = n2.clientWidth;
      }
      return {
        fixedPos: compensateForHScroll(d2),
        gutterTotalWidth: d2.gutters.offsetWidth,
        gutterLeft: left,
        gutterWidth: width,
        wrapperWidth: d2.wrapper.clientWidth
      };
    }
    function compensateForHScroll(display) {
      return display.scroller.getBoundingClientRect().left - display.sizer.getBoundingClientRect().left;
    }
    function estimateHeight(cm) {
      var th = textHeight(cm.display), wrapping = cm.options.lineWrapping;
      var perLine = wrapping && Math.max(5, cm.display.scroller.clientWidth / charWidth(cm.display) - 3);
      return function(line) {
        if (lineIsHidden(cm.doc, line)) {
          return 0;
        }
        var widgetsHeight = 0;
        if (line.widgets) {
          for (var i3 = 0; i3 < line.widgets.length; i3++) {
            if (line.widgets[i3].height) {
              widgetsHeight += line.widgets[i3].height;
            }
          }
        }
        if (wrapping) {
          return widgetsHeight + (Math.ceil(line.text.length / perLine) || 1) * th;
        } else {
          return widgetsHeight + th;
        }
      };
    }
    function estimateLineHeights(cm) {
      var doc = cm.doc, est = estimateHeight(cm);
      doc.iter(function(line) {
        var estHeight = est(line);
        if (estHeight != line.height) {
          updateLineHeight(line, estHeight);
        }
      });
    }
    function posFromMouse(cm, e2, liberal, forRect) {
      var display = cm.display;
      if (!liberal && e_target(e2).getAttribute("cm-not-content") == "true") {
        return null;
      }
      var x2, y, space = display.lineSpace.getBoundingClientRect();
      try {
        x2 = e2.clientX - space.left;
        y = e2.clientY - space.top;
      } catch (e$12) {
        return null;
      }
      var coords = coordsChar(cm, x2, y), line;
      if (forRect && coords.xRel > 0 && (line = getLine(cm.doc, coords.line).text).length == coords.ch) {
        var colDiff = countColumn(line, line.length, cm.options.tabSize) - line.length;
        coords = Pos(coords.line, Math.max(0, Math.round((x2 - paddingH(cm.display).left) / charWidth(cm.display)) - colDiff));
      }
      return coords;
    }
    function findViewIndex(cm, n2) {
      if (n2 >= cm.display.viewTo) {
        return null;
      }
      n2 -= cm.display.viewFrom;
      if (n2 < 0) {
        return null;
      }
      var view = cm.display.view;
      for (var i3 = 0; i3 < view.length; i3++) {
        n2 -= view[i3].size;
        if (n2 < 0) {
          return i3;
        }
      }
    }
    function regChange(cm, from, to, lendiff) {
      if (from == null) {
        from = cm.doc.first;
      }
      if (to == null) {
        to = cm.doc.first + cm.doc.size;
      }
      if (!lendiff) {
        lendiff = 0;
      }
      var display = cm.display;
      if (lendiff && to < display.viewTo && (display.updateLineNumbers == null || display.updateLineNumbers > from)) {
        display.updateLineNumbers = from;
      }
      cm.curOp.viewChanged = true;
      if (from >= display.viewTo) {
        if (sawCollapsedSpans && visualLineNo(cm.doc, from) < display.viewTo) {
          resetView(cm);
        }
      } else if (to <= display.viewFrom) {
        if (sawCollapsedSpans && visualLineEndNo(cm.doc, to + lendiff) > display.viewFrom) {
          resetView(cm);
        } else {
          display.viewFrom += lendiff;
          display.viewTo += lendiff;
        }
      } else if (from <= display.viewFrom && to >= display.viewTo) {
        resetView(cm);
      } else if (from <= display.viewFrom) {
        var cut = viewCuttingPoint(cm, to, to + lendiff, 1);
        if (cut) {
          display.view = display.view.slice(cut.index);
          display.viewFrom = cut.lineN;
          display.viewTo += lendiff;
        } else {
          resetView(cm);
        }
      } else if (to >= display.viewTo) {
        var cut$1 = viewCuttingPoint(cm, from, from, -1);
        if (cut$1) {
          display.view = display.view.slice(0, cut$1.index);
          display.viewTo = cut$1.lineN;
        } else {
          resetView(cm);
        }
      } else {
        var cutTop = viewCuttingPoint(cm, from, from, -1);
        var cutBot = viewCuttingPoint(cm, to, to + lendiff, 1);
        if (cutTop && cutBot) {
          display.view = display.view.slice(0, cutTop.index).concat(buildViewArray(cm, cutTop.lineN, cutBot.lineN)).concat(display.view.slice(cutBot.index));
          display.viewTo += lendiff;
        } else {
          resetView(cm);
        }
      }
      var ext = display.externalMeasured;
      if (ext) {
        if (to < ext.lineN) {
          ext.lineN += lendiff;
        } else if (from < ext.lineN + ext.size) {
          display.externalMeasured = null;
        }
      }
    }
    function regLineChange(cm, line, type) {
      cm.curOp.viewChanged = true;
      var display = cm.display, ext = cm.display.externalMeasured;
      if (ext && line >= ext.lineN && line < ext.lineN + ext.size) {
        display.externalMeasured = null;
      }
      if (line < display.viewFrom || line >= display.viewTo) {
        return;
      }
      var lineView = display.view[findViewIndex(cm, line)];
      if (lineView.node == null) {
        return;
      }
      var arr = lineView.changes || (lineView.changes = []);
      if (indexOf(arr, type) == -1) {
        arr.push(type);
      }
    }
    function resetView(cm) {
      cm.display.viewFrom = cm.display.viewTo = cm.doc.first;
      cm.display.view = [];
      cm.display.viewOffset = 0;
    }
    function viewCuttingPoint(cm, oldN, newN, dir) {
      var index = findViewIndex(cm, oldN), diff, view = cm.display.view;
      if (!sawCollapsedSpans || newN == cm.doc.first + cm.doc.size) {
        return { index, lineN: newN };
      }
      var n2 = cm.display.viewFrom;
      for (var i3 = 0; i3 < index; i3++) {
        n2 += view[i3].size;
      }
      if (n2 != oldN) {
        if (dir > 0) {
          if (index == view.length - 1) {
            return null;
          }
          diff = n2 + view[index].size - oldN;
          index++;
        } else {
          diff = n2 - oldN;
        }
        oldN += diff;
        newN += diff;
      }
      while (visualLineNo(cm.doc, newN) != newN) {
        if (index == (dir < 0 ? 0 : view.length - 1)) {
          return null;
        }
        newN += dir * view[index - (dir < 0 ? 1 : 0)].size;
        index += dir;
      }
      return { index, lineN: newN };
    }
    function adjustView(cm, from, to) {
      var display = cm.display, view = display.view;
      if (view.length == 0 || from >= display.viewTo || to <= display.viewFrom) {
        display.view = buildViewArray(cm, from, to);
        display.viewFrom = from;
      } else {
        if (display.viewFrom > from) {
          display.view = buildViewArray(cm, from, display.viewFrom).concat(display.view);
        } else if (display.viewFrom < from) {
          display.view = display.view.slice(findViewIndex(cm, from));
        }
        display.viewFrom = from;
        if (display.viewTo < to) {
          display.view = display.view.concat(buildViewArray(cm, display.viewTo, to));
        } else if (display.viewTo > to) {
          display.view = display.view.slice(0, findViewIndex(cm, to));
        }
      }
      display.viewTo = to;
    }
    function countDirtyView(cm) {
      var view = cm.display.view, dirty = 0;
      for (var i3 = 0; i3 < view.length; i3++) {
        var lineView = view[i3];
        if (!lineView.hidden && (!lineView.node || lineView.changes)) {
          ++dirty;
        }
      }
      return dirty;
    }
    function updateSelection(cm) {
      cm.display.input.showSelection(cm.display.input.prepareSelection());
    }
    function prepareSelection(cm, primary) {
      if (primary === void 0)
        primary = true;
      var doc = cm.doc, result = {};
      var curFragment = result.cursors = document.createDocumentFragment();
      var selFragment = result.selection = document.createDocumentFragment();
      for (var i3 = 0; i3 < doc.sel.ranges.length; i3++) {
        if (!primary && i3 == doc.sel.primIndex) {
          continue;
        }
        var range2 = doc.sel.ranges[i3];
        if (range2.from().line >= cm.display.viewTo || range2.to().line < cm.display.viewFrom) {
          continue;
        }
        var collapsed = range2.empty();
        if (collapsed || cm.options.showCursorWhenSelecting) {
          drawSelectionCursor(cm, range2.head, curFragment);
        }
        if (!collapsed) {
          drawSelectionRange(cm, range2, selFragment);
        }
      }
      return result;
    }
    function drawSelectionCursor(cm, head, output) {
      var pos = cursorCoords(cm, head, "div", null, null, !cm.options.singleCursorHeightPerLine);
      var cursor = output.appendChild(elt("div", "\xA0", "CodeMirror-cursor"));
      cursor.style.left = pos.left + "px";
      cursor.style.top = pos.top + "px";
      cursor.style.height = Math.max(0, pos.bottom - pos.top) * cm.options.cursorHeight + "px";
      if (/\bcm-fat-cursor\b/.test(cm.getWrapperElement().className)) {
        var charPos = charCoords(cm, head, "div", null, null);
        if (charPos.right - charPos.left > 0) {
          cursor.style.width = charPos.right - charPos.left + "px";
        }
      }
      if (pos.other) {
        var otherCursor = output.appendChild(elt("div", "\xA0", "CodeMirror-cursor CodeMirror-secondarycursor"));
        otherCursor.style.display = "";
        otherCursor.style.left = pos.other.left + "px";
        otherCursor.style.top = pos.other.top + "px";
        otherCursor.style.height = (pos.other.bottom - pos.other.top) * 0.85 + "px";
      }
    }
    function cmpCoords(a2, b2) {
      return a2.top - b2.top || a2.left - b2.left;
    }
    function drawSelectionRange(cm, range2, output) {
      var display = cm.display, doc = cm.doc;
      var fragment = document.createDocumentFragment();
      var padding = paddingH(cm.display), leftSide = padding.left;
      var rightSide = Math.max(display.sizerWidth, displayWidth(cm) - display.sizer.offsetLeft) - padding.right;
      var docLTR = doc.direction == "ltr";
      function add(left, top, width, bottom) {
        if (top < 0) {
          top = 0;
        }
        top = Math.round(top);
        bottom = Math.round(bottom);
        fragment.appendChild(elt("div", null, "CodeMirror-selected", "position: absolute; left: " + left + "px;\n                             top: " + top + "px; width: " + (width == null ? rightSide - left : width) + "px;\n                             height: " + (bottom - top) + "px"));
      }
      function drawForLine(line, fromArg, toArg) {
        var lineObj = getLine(doc, line);
        var lineLen = lineObj.text.length;
        var start, end;
        function coords(ch, bias) {
          return charCoords(cm, Pos(line, ch), "div", lineObj, bias);
        }
        function wrapX(pos, dir, side) {
          var extent = wrappedLineExtentChar(cm, lineObj, null, pos);
          var prop2 = dir == "ltr" == (side == "after") ? "left" : "right";
          var ch = side == "after" ? extent.begin : extent.end - (/\s/.test(lineObj.text.charAt(extent.end - 1)) ? 2 : 1);
          return coords(ch, prop2)[prop2];
        }
        var order = getOrder(lineObj, doc.direction);
        iterateBidiSections(order, fromArg || 0, toArg == null ? lineLen : toArg, function(from, to, dir, i3) {
          var ltr = dir == "ltr";
          var fromPos = coords(from, ltr ? "left" : "right");
          var toPos = coords(to - 1, ltr ? "right" : "left");
          var openStart = fromArg == null && from == 0, openEnd = toArg == null && to == lineLen;
          var first = i3 == 0, last = !order || i3 == order.length - 1;
          if (toPos.top - fromPos.top <= 3) {
            var openLeft = (docLTR ? openStart : openEnd) && first;
            var openRight = (docLTR ? openEnd : openStart) && last;
            var left = openLeft ? leftSide : (ltr ? fromPos : toPos).left;
            var right = openRight ? rightSide : (ltr ? toPos : fromPos).right;
            add(left, fromPos.top, right - left, fromPos.bottom);
          } else {
            var topLeft, topRight, botLeft, botRight;
            if (ltr) {
              topLeft = docLTR && openStart && first ? leftSide : fromPos.left;
              topRight = docLTR ? rightSide : wrapX(from, dir, "before");
              botLeft = docLTR ? leftSide : wrapX(to, dir, "after");
              botRight = docLTR && openEnd && last ? rightSide : toPos.right;
            } else {
              topLeft = !docLTR ? leftSide : wrapX(from, dir, "before");
              topRight = !docLTR && openStart && first ? rightSide : fromPos.right;
              botLeft = !docLTR && openEnd && last ? leftSide : toPos.left;
              botRight = !docLTR ? rightSide : wrapX(to, dir, "after");
            }
            add(topLeft, fromPos.top, topRight - topLeft, fromPos.bottom);
            if (fromPos.bottom < toPos.top) {
              add(leftSide, fromPos.bottom, null, toPos.top);
            }
            add(botLeft, toPos.top, botRight - botLeft, toPos.bottom);
          }
          if (!start || cmpCoords(fromPos, start) < 0) {
            start = fromPos;
          }
          if (cmpCoords(toPos, start) < 0) {
            start = toPos;
          }
          if (!end || cmpCoords(fromPos, end) < 0) {
            end = fromPos;
          }
          if (cmpCoords(toPos, end) < 0) {
            end = toPos;
          }
        });
        return { start, end };
      }
      var sFrom = range2.from(), sTo = range2.to();
      if (sFrom.line == sTo.line) {
        drawForLine(sFrom.line, sFrom.ch, sTo.ch);
      } else {
        var fromLine = getLine(doc, sFrom.line), toLine = getLine(doc, sTo.line);
        var singleVLine = visualLine(fromLine) == visualLine(toLine);
        var leftEnd = drawForLine(sFrom.line, sFrom.ch, singleVLine ? fromLine.text.length + 1 : null).end;
        var rightStart = drawForLine(sTo.line, singleVLine ? 0 : null, sTo.ch).start;
        if (singleVLine) {
          if (leftEnd.top < rightStart.top - 2) {
            add(leftEnd.right, leftEnd.top, null, leftEnd.bottom);
            add(leftSide, rightStart.top, rightStart.left, rightStart.bottom);
          } else {
            add(leftEnd.right, leftEnd.top, rightStart.left - leftEnd.right, leftEnd.bottom);
          }
        }
        if (leftEnd.bottom < rightStart.top) {
          add(leftSide, leftEnd.bottom, null, rightStart.top);
        }
      }
      output.appendChild(fragment);
    }
    function restartBlink(cm) {
      if (!cm.state.focused) {
        return;
      }
      var display = cm.display;
      clearInterval(display.blinker);
      var on2 = true;
      display.cursorDiv.style.visibility = "";
      if (cm.options.cursorBlinkRate > 0) {
        display.blinker = setInterval(function() {
          if (!cm.hasFocus()) {
            onBlur(cm);
          }
          display.cursorDiv.style.visibility = (on2 = !on2) ? "" : "hidden";
        }, cm.options.cursorBlinkRate);
      } else if (cm.options.cursorBlinkRate < 0) {
        display.cursorDiv.style.visibility = "hidden";
      }
    }
    function ensureFocus(cm) {
      if (!cm.hasFocus()) {
        cm.display.input.focus();
        if (!cm.state.focused) {
          onFocus(cm);
        }
      }
    }
    function delayBlurEvent(cm) {
      cm.state.delayingBlurEvent = true;
      setTimeout(function() {
        if (cm.state.delayingBlurEvent) {
          cm.state.delayingBlurEvent = false;
          if (cm.state.focused) {
            onBlur(cm);
          }
        }
      }, 100);
    }
    function onFocus(cm, e2) {
      if (cm.state.delayingBlurEvent && !cm.state.draggingText) {
        cm.state.delayingBlurEvent = false;
      }
      if (cm.options.readOnly == "nocursor") {
        return;
      }
      if (!cm.state.focused) {
        signal(cm, "focus", cm, e2);
        cm.state.focused = true;
        addClass(cm.display.wrapper, "CodeMirror-focused");
        if (!cm.curOp && cm.display.selForContextMenu != cm.doc.sel) {
          cm.display.input.reset();
          if (webkit) {
            setTimeout(function() {
              return cm.display.input.reset(true);
            }, 20);
          }
        }
        cm.display.input.receivedFocus();
      }
      restartBlink(cm);
    }
    function onBlur(cm, e2) {
      if (cm.state.delayingBlurEvent) {
        return;
      }
      if (cm.state.focused) {
        signal(cm, "blur", cm, e2);
        cm.state.focused = false;
        rmClass(cm.display.wrapper, "CodeMirror-focused");
      }
      clearInterval(cm.display.blinker);
      setTimeout(function() {
        if (!cm.state.focused) {
          cm.display.shift = false;
        }
      }, 150);
    }
    function updateHeightsInViewport(cm) {
      var display = cm.display;
      var prevBottom = display.lineDiv.offsetTop;
      var viewTop = Math.max(0, display.scroller.getBoundingClientRect().top);
      var oldHeight = display.lineDiv.getBoundingClientRect().top;
      var mustScroll = 0;
      for (var i3 = 0; i3 < display.view.length; i3++) {
        var cur = display.view[i3], wrapping = cm.options.lineWrapping;
        var height = void 0, width = 0;
        if (cur.hidden) {
          continue;
        }
        oldHeight += cur.line.height;
        if (ie && ie_version < 8) {
          var bot = cur.node.offsetTop + cur.node.offsetHeight;
          height = bot - prevBottom;
          prevBottom = bot;
        } else {
          var box = cur.node.getBoundingClientRect();
          height = box.bottom - box.top;
          if (!wrapping && cur.text.firstChild) {
            width = cur.text.firstChild.getBoundingClientRect().right - box.left - 1;
          }
        }
        var diff = cur.line.height - height;
        if (diff > 5e-3 || diff < -5e-3) {
          if (oldHeight < viewTop) {
            mustScroll -= diff;
          }
          updateLineHeight(cur.line, height);
          updateWidgetHeight(cur.line);
          if (cur.rest) {
            for (var j = 0; j < cur.rest.length; j++) {
              updateWidgetHeight(cur.rest[j]);
            }
          }
        }
        if (width > cm.display.sizerWidth) {
          var chWidth = Math.ceil(width / charWidth(cm.display));
          if (chWidth > cm.display.maxLineLength) {
            cm.display.maxLineLength = chWidth;
            cm.display.maxLine = cur.line;
            cm.display.maxLineChanged = true;
          }
        }
      }
      if (Math.abs(mustScroll) > 2) {
        display.scroller.scrollTop += mustScroll;
      }
    }
    function updateWidgetHeight(line) {
      if (line.widgets) {
        for (var i3 = 0; i3 < line.widgets.length; ++i3) {
          var w2 = line.widgets[i3], parent = w2.node.parentNode;
          if (parent) {
            w2.height = parent.offsetHeight;
          }
        }
      }
    }
    function visibleLines(display, doc, viewport) {
      var top = viewport && viewport.top != null ? Math.max(0, viewport.top) : display.scroller.scrollTop;
      top = Math.floor(top - paddingTop(display));
      var bottom = viewport && viewport.bottom != null ? viewport.bottom : top + display.wrapper.clientHeight;
      var from = lineAtHeight(doc, top), to = lineAtHeight(doc, bottom);
      if (viewport && viewport.ensure) {
        var ensureFrom = viewport.ensure.from.line, ensureTo = viewport.ensure.to.line;
        if (ensureFrom < from) {
          from = ensureFrom;
          to = lineAtHeight(doc, heightAtLine(getLine(doc, ensureFrom)) + display.wrapper.clientHeight);
        } else if (Math.min(ensureTo, doc.lastLine()) >= to) {
          from = lineAtHeight(doc, heightAtLine(getLine(doc, ensureTo)) - display.wrapper.clientHeight);
          to = ensureTo;
        }
      }
      return { from, to: Math.max(to, from + 1) };
    }
    function maybeScrollWindow(cm, rect) {
      if (signalDOMEvent(cm, "scrollCursorIntoView")) {
        return;
      }
      var display = cm.display, box = display.sizer.getBoundingClientRect(), doScroll = null;
      if (rect.top + box.top < 0) {
        doScroll = true;
      } else if (rect.bottom + box.top > (window.innerHeight || document.documentElement.clientHeight)) {
        doScroll = false;
      }
      if (doScroll != null && !phantom) {
        var scrollNode = elt("div", "\u200B", null, "position: absolute;\n                         top: " + (rect.top - display.viewOffset - paddingTop(cm.display)) + "px;\n                         height: " + (rect.bottom - rect.top + scrollGap(cm) + display.barHeight) + "px;\n                         left: " + rect.left + "px; width: " + Math.max(2, rect.right - rect.left) + "px;");
        cm.display.lineSpace.appendChild(scrollNode);
        scrollNode.scrollIntoView(doScroll);
        cm.display.lineSpace.removeChild(scrollNode);
      }
    }
    function scrollPosIntoView(cm, pos, end, margin) {
      if (margin == null) {
        margin = 0;
      }
      var rect;
      if (!cm.options.lineWrapping && pos == end) {
        end = pos.sticky == "before" ? Pos(pos.line, pos.ch + 1, "before") : pos;
        pos = pos.ch ? Pos(pos.line, pos.sticky == "before" ? pos.ch - 1 : pos.ch, "after") : pos;
      }
      for (var limit = 0; limit < 5; limit++) {
        var changed = false;
        var coords = cursorCoords(cm, pos);
        var endCoords = !end || end == pos ? coords : cursorCoords(cm, end);
        rect = {
          left: Math.min(coords.left, endCoords.left),
          top: Math.min(coords.top, endCoords.top) - margin,
          right: Math.max(coords.left, endCoords.left),
          bottom: Math.max(coords.bottom, endCoords.bottom) + margin
        };
        var scrollPos = calculateScrollPos(cm, rect);
        var startTop = cm.doc.scrollTop, startLeft = cm.doc.scrollLeft;
        if (scrollPos.scrollTop != null) {
          updateScrollTop(cm, scrollPos.scrollTop);
          if (Math.abs(cm.doc.scrollTop - startTop) > 1) {
            changed = true;
          }
        }
        if (scrollPos.scrollLeft != null) {
          setScrollLeft(cm, scrollPos.scrollLeft);
          if (Math.abs(cm.doc.scrollLeft - startLeft) > 1) {
            changed = true;
          }
        }
        if (!changed) {
          break;
        }
      }
      return rect;
    }
    function scrollIntoView(cm, rect) {
      var scrollPos = calculateScrollPos(cm, rect);
      if (scrollPos.scrollTop != null) {
        updateScrollTop(cm, scrollPos.scrollTop);
      }
      if (scrollPos.scrollLeft != null) {
        setScrollLeft(cm, scrollPos.scrollLeft);
      }
    }
    function calculateScrollPos(cm, rect) {
      var display = cm.display, snapMargin = textHeight(cm.display);
      if (rect.top < 0) {
        rect.top = 0;
      }
      var screentop = cm.curOp && cm.curOp.scrollTop != null ? cm.curOp.scrollTop : display.scroller.scrollTop;
      var screen2 = displayHeight(cm), result = {};
      if (rect.bottom - rect.top > screen2) {
        rect.bottom = rect.top + screen2;
      }
      var docBottom = cm.doc.height + paddingVert(display);
      var atTop = rect.top < snapMargin, atBottom = rect.bottom > docBottom - snapMargin;
      if (rect.top < screentop) {
        result.scrollTop = atTop ? 0 : rect.top;
      } else if (rect.bottom > screentop + screen2) {
        var newTop = Math.min(rect.top, (atBottom ? docBottom : rect.bottom) - screen2);
        if (newTop != screentop) {
          result.scrollTop = newTop;
        }
      }
      var gutterSpace = cm.options.fixedGutter ? 0 : display.gutters.offsetWidth;
      var screenleft = cm.curOp && cm.curOp.scrollLeft != null ? cm.curOp.scrollLeft : display.scroller.scrollLeft - gutterSpace;
      var screenw = displayWidth(cm) - display.gutters.offsetWidth;
      var tooWide = rect.right - rect.left > screenw;
      if (tooWide) {
        rect.right = rect.left + screenw;
      }
      if (rect.left < 10) {
        result.scrollLeft = 0;
      } else if (rect.left < screenleft) {
        result.scrollLeft = Math.max(0, rect.left + gutterSpace - (tooWide ? 0 : 10));
      } else if (rect.right > screenw + screenleft - 3) {
        result.scrollLeft = rect.right + (tooWide ? 0 : 10) - screenw;
      }
      return result;
    }
    function addToScrollTop(cm, top) {
      if (top == null) {
        return;
      }
      resolveScrollToPos(cm);
      cm.curOp.scrollTop = (cm.curOp.scrollTop == null ? cm.doc.scrollTop : cm.curOp.scrollTop) + top;
    }
    function ensureCursorVisible(cm) {
      resolveScrollToPos(cm);
      var cur = cm.getCursor();
      cm.curOp.scrollToPos = { from: cur, to: cur, margin: cm.options.cursorScrollMargin };
    }
    function scrollToCoords(cm, x2, y) {
      if (x2 != null || y != null) {
        resolveScrollToPos(cm);
      }
      if (x2 != null) {
        cm.curOp.scrollLeft = x2;
      }
      if (y != null) {
        cm.curOp.scrollTop = y;
      }
    }
    function scrollToRange(cm, range2) {
      resolveScrollToPos(cm);
      cm.curOp.scrollToPos = range2;
    }
    function resolveScrollToPos(cm) {
      var range2 = cm.curOp.scrollToPos;
      if (range2) {
        cm.curOp.scrollToPos = null;
        var from = estimateCoords(cm, range2.from), to = estimateCoords(cm, range2.to);
        scrollToCoordsRange(cm, from, to, range2.margin);
      }
    }
    function scrollToCoordsRange(cm, from, to, margin) {
      var sPos = calculateScrollPos(cm, {
        left: Math.min(from.left, to.left),
        top: Math.min(from.top, to.top) - margin,
        right: Math.max(from.right, to.right),
        bottom: Math.max(from.bottom, to.bottom) + margin
      });
      scrollToCoords(cm, sPos.scrollLeft, sPos.scrollTop);
    }
    function updateScrollTop(cm, val) {
      if (Math.abs(cm.doc.scrollTop - val) < 2) {
        return;
      }
      if (!gecko) {
        updateDisplaySimple(cm, { top: val });
      }
      setScrollTop(cm, val, true);
      if (gecko) {
        updateDisplaySimple(cm);
      }
      startWorker(cm, 100);
    }
    function setScrollTop(cm, val, forceScroll) {
      val = Math.max(0, Math.min(cm.display.scroller.scrollHeight - cm.display.scroller.clientHeight, val));
      if (cm.display.scroller.scrollTop == val && !forceScroll) {
        return;
      }
      cm.doc.scrollTop = val;
      cm.display.scrollbars.setScrollTop(val);
      if (cm.display.scroller.scrollTop != val) {
        cm.display.scroller.scrollTop = val;
      }
    }
    function setScrollLeft(cm, val, isScroller, forceScroll) {
      val = Math.max(0, Math.min(val, cm.display.scroller.scrollWidth - cm.display.scroller.clientWidth));
      if ((isScroller ? val == cm.doc.scrollLeft : Math.abs(cm.doc.scrollLeft - val) < 2) && !forceScroll) {
        return;
      }
      cm.doc.scrollLeft = val;
      alignHorizontally(cm);
      if (cm.display.scroller.scrollLeft != val) {
        cm.display.scroller.scrollLeft = val;
      }
      cm.display.scrollbars.setScrollLeft(val);
    }
    function measureForScrollbars(cm) {
      var d2 = cm.display, gutterW = d2.gutters.offsetWidth;
      var docH = Math.round(cm.doc.height + paddingVert(cm.display));
      return {
        clientHeight: d2.scroller.clientHeight,
        viewHeight: d2.wrapper.clientHeight,
        scrollWidth: d2.scroller.scrollWidth,
        clientWidth: d2.scroller.clientWidth,
        viewWidth: d2.wrapper.clientWidth,
        barLeft: cm.options.fixedGutter ? gutterW : 0,
        docHeight: docH,
        scrollHeight: docH + scrollGap(cm) + d2.barHeight,
        nativeBarWidth: d2.nativeBarWidth,
        gutterWidth: gutterW
      };
    }
    var NativeScrollbars = function(place, scroll, cm) {
      this.cm = cm;
      var vert = this.vert = elt("div", [elt("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar");
      var horiz = this.horiz = elt("div", [elt("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
      vert.tabIndex = horiz.tabIndex = -1;
      place(vert);
      place(horiz);
      on(vert, "scroll", function() {
        if (vert.clientHeight) {
          scroll(vert.scrollTop, "vertical");
        }
      });
      on(horiz, "scroll", function() {
        if (horiz.clientWidth) {
          scroll(horiz.scrollLeft, "horizontal");
        }
      });
      this.checkedZeroWidth = false;
      if (ie && ie_version < 8) {
        this.horiz.style.minHeight = this.vert.style.minWidth = "18px";
      }
    };
    NativeScrollbars.prototype.update = function(measure) {
      var needsH = measure.scrollWidth > measure.clientWidth + 1;
      var needsV = measure.scrollHeight > measure.clientHeight + 1;
      var sWidth = measure.nativeBarWidth;
      if (needsV) {
        this.vert.style.display = "block";
        this.vert.style.bottom = needsH ? sWidth + "px" : "0";
        var totalHeight = measure.viewHeight - (needsH ? sWidth : 0);
        this.vert.firstChild.style.height = Math.max(0, measure.scrollHeight - measure.clientHeight + totalHeight) + "px";
      } else {
        this.vert.style.display = "";
        this.vert.firstChild.style.height = "0";
      }
      if (needsH) {
        this.horiz.style.display = "block";
        this.horiz.style.right = needsV ? sWidth + "px" : "0";
        this.horiz.style.left = measure.barLeft + "px";
        var totalWidth = measure.viewWidth - measure.barLeft - (needsV ? sWidth : 0);
        this.horiz.firstChild.style.width = Math.max(0, measure.scrollWidth - measure.clientWidth + totalWidth) + "px";
      } else {
        this.horiz.style.display = "";
        this.horiz.firstChild.style.width = "0";
      }
      if (!this.checkedZeroWidth && measure.clientHeight > 0) {
        if (sWidth == 0) {
          this.zeroWidthHack();
        }
        this.checkedZeroWidth = true;
      }
      return { right: needsV ? sWidth : 0, bottom: needsH ? sWidth : 0 };
    };
    NativeScrollbars.prototype.setScrollLeft = function(pos) {
      if (this.horiz.scrollLeft != pos) {
        this.horiz.scrollLeft = pos;
      }
      if (this.disableHoriz) {
        this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
      }
    };
    NativeScrollbars.prototype.setScrollTop = function(pos) {
      if (this.vert.scrollTop != pos) {
        this.vert.scrollTop = pos;
      }
      if (this.disableVert) {
        this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
      }
    };
    NativeScrollbars.prototype.zeroWidthHack = function() {
      var w2 = mac && !mac_geMountainLion ? "12px" : "18px";
      this.horiz.style.height = this.vert.style.width = w2;
      this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none";
      this.disableHoriz = new Delayed();
      this.disableVert = new Delayed();
    };
    NativeScrollbars.prototype.enableZeroWidthBar = function(bar, delay, type) {
      bar.style.pointerEvents = "auto";
      function maybeDisable() {
        var box = bar.getBoundingClientRect();
        var elt2 = type == "vert" ? document.elementFromPoint(box.right - 1, (box.top + box.bottom) / 2) : document.elementFromPoint((box.right + box.left) / 2, box.bottom - 1);
        if (elt2 != bar) {
          bar.style.pointerEvents = "none";
        } else {
          delay.set(1e3, maybeDisable);
        }
      }
      delay.set(1e3, maybeDisable);
    };
    NativeScrollbars.prototype.clear = function() {
      var parent = this.horiz.parentNode;
      parent.removeChild(this.horiz);
      parent.removeChild(this.vert);
    };
    var NullScrollbars = function() {
    };
    NullScrollbars.prototype.update = function() {
      return { bottom: 0, right: 0 };
    };
    NullScrollbars.prototype.setScrollLeft = function() {
    };
    NullScrollbars.prototype.setScrollTop = function() {
    };
    NullScrollbars.prototype.clear = function() {
    };
    function updateScrollbars(cm, measure) {
      if (!measure) {
        measure = measureForScrollbars(cm);
      }
      var startWidth = cm.display.barWidth, startHeight = cm.display.barHeight;
      updateScrollbarsInner(cm, measure);
      for (var i3 = 0; i3 < 4 && startWidth != cm.display.barWidth || startHeight != cm.display.barHeight; i3++) {
        if (startWidth != cm.display.barWidth && cm.options.lineWrapping) {
          updateHeightsInViewport(cm);
        }
        updateScrollbarsInner(cm, measureForScrollbars(cm));
        startWidth = cm.display.barWidth;
        startHeight = cm.display.barHeight;
      }
    }
    function updateScrollbarsInner(cm, measure) {
      var d2 = cm.display;
      var sizes = d2.scrollbars.update(measure);
      d2.sizer.style.paddingRight = (d2.barWidth = sizes.right) + "px";
      d2.sizer.style.paddingBottom = (d2.barHeight = sizes.bottom) + "px";
      d2.heightForcer.style.borderBottom = sizes.bottom + "px solid transparent";
      if (sizes.right && sizes.bottom) {
        d2.scrollbarFiller.style.display = "block";
        d2.scrollbarFiller.style.height = sizes.bottom + "px";
        d2.scrollbarFiller.style.width = sizes.right + "px";
      } else {
        d2.scrollbarFiller.style.display = "";
      }
      if (sizes.bottom && cm.options.coverGutterNextToScrollbar && cm.options.fixedGutter) {
        d2.gutterFiller.style.display = "block";
        d2.gutterFiller.style.height = sizes.bottom + "px";
        d2.gutterFiller.style.width = measure.gutterWidth + "px";
      } else {
        d2.gutterFiller.style.display = "";
      }
    }
    var scrollbarModel = { "native": NativeScrollbars, "null": NullScrollbars };
    function initScrollbars(cm) {
      if (cm.display.scrollbars) {
        cm.display.scrollbars.clear();
        if (cm.display.scrollbars.addClass) {
          rmClass(cm.display.wrapper, cm.display.scrollbars.addClass);
        }
      }
      cm.display.scrollbars = new scrollbarModel[cm.options.scrollbarStyle](function(node) {
        cm.display.wrapper.insertBefore(node, cm.display.scrollbarFiller);
        on(node, "mousedown", function() {
          if (cm.state.focused) {
            setTimeout(function() {
              return cm.display.input.focus();
            }, 0);
          }
        });
        node.setAttribute("cm-not-content", "true");
      }, function(pos, axis) {
        if (axis == "horizontal") {
          setScrollLeft(cm, pos);
        } else {
          updateScrollTop(cm, pos);
        }
      }, cm);
      if (cm.display.scrollbars.addClass) {
        addClass(cm.display.wrapper, cm.display.scrollbars.addClass);
      }
    }
    var nextOpId = 0;
    function startOperation(cm) {
      cm.curOp = {
        cm,
        viewChanged: false,
        startHeight: cm.doc.height,
        forceUpdate: false,
        updateInput: 0,
        typing: false,
        changeObjs: null,
        cursorActivityHandlers: null,
        cursorActivityCalled: 0,
        selectionChanged: false,
        updateMaxLine: false,
        scrollLeft: null,
        scrollTop: null,
        scrollToPos: null,
        focus: false,
        id: ++nextOpId,
        markArrays: null
      };
      pushOperation(cm.curOp);
    }
    function endOperation(cm) {
      var op = cm.curOp;
      if (op) {
        finishOperation(op, function(group) {
          for (var i3 = 0; i3 < group.ops.length; i3++) {
            group.ops[i3].cm.curOp = null;
          }
          endOperations(group);
        });
      }
    }
    function endOperations(group) {
      var ops = group.ops;
      for (var i3 = 0; i3 < ops.length; i3++) {
        endOperation_R1(ops[i3]);
      }
      for (var i$13 = 0; i$13 < ops.length; i$13++) {
        endOperation_W1(ops[i$13]);
      }
      for (var i$23 = 0; i$23 < ops.length; i$23++) {
        endOperation_R2(ops[i$23]);
      }
      for (var i$3 = 0; i$3 < ops.length; i$3++) {
        endOperation_W2(ops[i$3]);
      }
      for (var i$4 = 0; i$4 < ops.length; i$4++) {
        endOperation_finish(ops[i$4]);
      }
    }
    function endOperation_R1(op) {
      var cm = op.cm, display = cm.display;
      maybeClipScrollbars(cm);
      if (op.updateMaxLine) {
        findMaxLine(cm);
      }
      op.mustUpdate = op.viewChanged || op.forceUpdate || op.scrollTop != null || op.scrollToPos && (op.scrollToPos.from.line < display.viewFrom || op.scrollToPos.to.line >= display.viewTo) || display.maxLineChanged && cm.options.lineWrapping;
      op.update = op.mustUpdate && new DisplayUpdate(cm, op.mustUpdate && { top: op.scrollTop, ensure: op.scrollToPos }, op.forceUpdate);
    }
    function endOperation_W1(op) {
      op.updatedDisplay = op.mustUpdate && updateDisplayIfNeeded(op.cm, op.update);
    }
    function endOperation_R2(op) {
      var cm = op.cm, display = cm.display;
      if (op.updatedDisplay) {
        updateHeightsInViewport(cm);
      }
      op.barMeasure = measureForScrollbars(cm);
      if (display.maxLineChanged && !cm.options.lineWrapping) {
        op.adjustWidthTo = measureChar(cm, display.maxLine, display.maxLine.text.length).left + 3;
        cm.display.sizerWidth = op.adjustWidthTo;
        op.barMeasure.scrollWidth = Math.max(display.scroller.clientWidth, display.sizer.offsetLeft + op.adjustWidthTo + scrollGap(cm) + cm.display.barWidth);
        op.maxScrollLeft = Math.max(0, display.sizer.offsetLeft + op.adjustWidthTo - displayWidth(cm));
      }
      if (op.updatedDisplay || op.selectionChanged) {
        op.preparedSelection = display.input.prepareSelection();
      }
    }
    function endOperation_W2(op) {
      var cm = op.cm;
      if (op.adjustWidthTo != null) {
        cm.display.sizer.style.minWidth = op.adjustWidthTo + "px";
        if (op.maxScrollLeft < cm.doc.scrollLeft) {
          setScrollLeft(cm, Math.min(cm.display.scroller.scrollLeft, op.maxScrollLeft), true);
        }
        cm.display.maxLineChanged = false;
      }
      var takeFocus = op.focus && op.focus == activeElt();
      if (op.preparedSelection) {
        cm.display.input.showSelection(op.preparedSelection, takeFocus);
      }
      if (op.updatedDisplay || op.startHeight != cm.doc.height) {
        updateScrollbars(cm, op.barMeasure);
      }
      if (op.updatedDisplay) {
        setDocumentHeight(cm, op.barMeasure);
      }
      if (op.selectionChanged) {
        restartBlink(cm);
      }
      if (cm.state.focused && op.updateInput) {
        cm.display.input.reset(op.typing);
      }
      if (takeFocus) {
        ensureFocus(op.cm);
      }
    }
    function endOperation_finish(op) {
      var cm = op.cm, display = cm.display, doc = cm.doc;
      if (op.updatedDisplay) {
        postUpdateDisplay(cm, op.update);
      }
      if (display.wheelStartX != null && (op.scrollTop != null || op.scrollLeft != null || op.scrollToPos)) {
        display.wheelStartX = display.wheelStartY = null;
      }
      if (op.scrollTop != null) {
        setScrollTop(cm, op.scrollTop, op.forceScroll);
      }
      if (op.scrollLeft != null) {
        setScrollLeft(cm, op.scrollLeft, true, true);
      }
      if (op.scrollToPos) {
        var rect = scrollPosIntoView(cm, clipPos(doc, op.scrollToPos.from), clipPos(doc, op.scrollToPos.to), op.scrollToPos.margin);
        maybeScrollWindow(cm, rect);
      }
      var hidden = op.maybeHiddenMarkers, unhidden = op.maybeUnhiddenMarkers;
      if (hidden) {
        for (var i3 = 0; i3 < hidden.length; ++i3) {
          if (!hidden[i3].lines.length) {
            signal(hidden[i3], "hide");
          }
        }
      }
      if (unhidden) {
        for (var i$13 = 0; i$13 < unhidden.length; ++i$13) {
          if (unhidden[i$13].lines.length) {
            signal(unhidden[i$13], "unhide");
          }
        }
      }
      if (display.wrapper.offsetHeight) {
        doc.scrollTop = cm.display.scroller.scrollTop;
      }
      if (op.changeObjs) {
        signal(cm, "changes", cm, op.changeObjs);
      }
      if (op.update) {
        op.update.finish();
      }
    }
    function runInOp(cm, f2) {
      if (cm.curOp) {
        return f2();
      }
      startOperation(cm);
      try {
        return f2();
      } finally {
        endOperation(cm);
      }
    }
    function operation(cm, f2) {
      return function() {
        if (cm.curOp) {
          return f2.apply(cm, arguments);
        }
        startOperation(cm);
        try {
          return f2.apply(cm, arguments);
        } finally {
          endOperation(cm);
        }
      };
    }
    function methodOp(f2) {
      return function() {
        if (this.curOp) {
          return f2.apply(this, arguments);
        }
        startOperation(this);
        try {
          return f2.apply(this, arguments);
        } finally {
          endOperation(this);
        }
      };
    }
    function docMethodOp(f2) {
      return function() {
        var cm = this.cm;
        if (!cm || cm.curOp) {
          return f2.apply(this, arguments);
        }
        startOperation(cm);
        try {
          return f2.apply(this, arguments);
        } finally {
          endOperation(cm);
        }
      };
    }
    function startWorker(cm, time) {
      if (cm.doc.highlightFrontier < cm.display.viewTo) {
        cm.state.highlight.set(time, bind(highlightWorker, cm));
      }
    }
    function highlightWorker(cm) {
      var doc = cm.doc;
      if (doc.highlightFrontier >= cm.display.viewTo) {
        return;
      }
      var end = +new Date() + cm.options.workTime;
      var context = getContextBefore(cm, doc.highlightFrontier);
      var changedLines = [];
      doc.iter(context.line, Math.min(doc.first + doc.size, cm.display.viewTo + 500), function(line) {
        if (context.line >= cm.display.viewFrom) {
          var oldStyles = line.styles;
          var resetState = line.text.length > cm.options.maxHighlightLength ? copyState(doc.mode, context.state) : null;
          var highlighted = highlightLine(cm, line, context, true);
          if (resetState) {
            context.state = resetState;
          }
          line.styles = highlighted.styles;
          var oldCls = line.styleClasses, newCls = highlighted.classes;
          if (newCls) {
            line.styleClasses = newCls;
          } else if (oldCls) {
            line.styleClasses = null;
          }
          var ischange = !oldStyles || oldStyles.length != line.styles.length || oldCls != newCls && (!oldCls || !newCls || oldCls.bgClass != newCls.bgClass || oldCls.textClass != newCls.textClass);
          for (var i3 = 0; !ischange && i3 < oldStyles.length; ++i3) {
            ischange = oldStyles[i3] != line.styles[i3];
          }
          if (ischange) {
            changedLines.push(context.line);
          }
          line.stateAfter = context.save();
          context.nextLine();
        } else {
          if (line.text.length <= cm.options.maxHighlightLength) {
            processLine(cm, line.text, context);
          }
          line.stateAfter = context.line % 5 == 0 ? context.save() : null;
          context.nextLine();
        }
        if (+new Date() > end) {
          startWorker(cm, cm.options.workDelay);
          return true;
        }
      });
      doc.highlightFrontier = context.line;
      doc.modeFrontier = Math.max(doc.modeFrontier, context.line);
      if (changedLines.length) {
        runInOp(cm, function() {
          for (var i3 = 0; i3 < changedLines.length; i3++) {
            regLineChange(cm, changedLines[i3], "text");
          }
        });
      }
    }
    var DisplayUpdate = function(cm, viewport, force) {
      var display = cm.display;
      this.viewport = viewport;
      this.visible = visibleLines(display, cm.doc, viewport);
      this.editorIsHidden = !display.wrapper.offsetWidth;
      this.wrapperHeight = display.wrapper.clientHeight;
      this.wrapperWidth = display.wrapper.clientWidth;
      this.oldDisplayWidth = displayWidth(cm);
      this.force = force;
      this.dims = getDimensions(cm);
      this.events = [];
    };
    DisplayUpdate.prototype.signal = function(emitter, type) {
      if (hasHandler(emitter, type)) {
        this.events.push(arguments);
      }
    };
    DisplayUpdate.prototype.finish = function() {
      for (var i3 = 0; i3 < this.events.length; i3++) {
        signal.apply(null, this.events[i3]);
      }
    };
    function maybeClipScrollbars(cm) {
      var display = cm.display;
      if (!display.scrollbarsClipped && display.scroller.offsetWidth) {
        display.nativeBarWidth = display.scroller.offsetWidth - display.scroller.clientWidth;
        display.heightForcer.style.height = scrollGap(cm) + "px";
        display.sizer.style.marginBottom = -display.nativeBarWidth + "px";
        display.sizer.style.borderRightWidth = scrollGap(cm) + "px";
        display.scrollbarsClipped = true;
      }
    }
    function selectionSnapshot(cm) {
      if (cm.hasFocus()) {
        return null;
      }
      var active = activeElt();
      if (!active || !contains(cm.display.lineDiv, active)) {
        return null;
      }
      var result = { activeElt: active };
      if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.anchorNode && sel.extend && contains(cm.display.lineDiv, sel.anchorNode)) {
          result.anchorNode = sel.anchorNode;
          result.anchorOffset = sel.anchorOffset;
          result.focusNode = sel.focusNode;
          result.focusOffset = sel.focusOffset;
        }
      }
      return result;
    }
    function restoreSelection(snapshot) {
      if (!snapshot || !snapshot.activeElt || snapshot.activeElt == activeElt()) {
        return;
      }
      snapshot.activeElt.focus();
      if (!/^(INPUT|TEXTAREA)$/.test(snapshot.activeElt.nodeName) && snapshot.anchorNode && contains(document.body, snapshot.anchorNode) && contains(document.body, snapshot.focusNode)) {
        var sel = window.getSelection(), range2 = document.createRange();
        range2.setEnd(snapshot.anchorNode, snapshot.anchorOffset);
        range2.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range2);
        sel.extend(snapshot.focusNode, snapshot.focusOffset);
      }
    }
    function updateDisplayIfNeeded(cm, update) {
      var display = cm.display, doc = cm.doc;
      if (update.editorIsHidden) {
        resetView(cm);
        return false;
      }
      if (!update.force && update.visible.from >= display.viewFrom && update.visible.to <= display.viewTo && (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo) && display.renderedView == display.view && countDirtyView(cm) == 0) {
        return false;
      }
      if (maybeUpdateLineNumberWidth(cm)) {
        resetView(cm);
        update.dims = getDimensions(cm);
      }
      var end = doc.first + doc.size;
      var from = Math.max(update.visible.from - cm.options.viewportMargin, doc.first);
      var to = Math.min(end, update.visible.to + cm.options.viewportMargin);
      if (display.viewFrom < from && from - display.viewFrom < 20) {
        from = Math.max(doc.first, display.viewFrom);
      }
      if (display.viewTo > to && display.viewTo - to < 20) {
        to = Math.min(end, display.viewTo);
      }
      if (sawCollapsedSpans) {
        from = visualLineNo(cm.doc, from);
        to = visualLineEndNo(cm.doc, to);
      }
      var different = from != display.viewFrom || to != display.viewTo || display.lastWrapHeight != update.wrapperHeight || display.lastWrapWidth != update.wrapperWidth;
      adjustView(cm, from, to);
      display.viewOffset = heightAtLine(getLine(cm.doc, display.viewFrom));
      cm.display.mover.style.top = display.viewOffset + "px";
      var toUpdate = countDirtyView(cm);
      if (!different && toUpdate == 0 && !update.force && display.renderedView == display.view && (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo)) {
        return false;
      }
      var selSnapshot = selectionSnapshot(cm);
      if (toUpdate > 4) {
        display.lineDiv.style.display = "none";
      }
      patchDisplay(cm, display.updateLineNumbers, update.dims);
      if (toUpdate > 4) {
        display.lineDiv.style.display = "";
      }
      display.renderedView = display.view;
      restoreSelection(selSnapshot);
      removeChildren(display.cursorDiv);
      removeChildren(display.selectionDiv);
      display.gutters.style.height = display.sizer.style.minHeight = 0;
      if (different) {
        display.lastWrapHeight = update.wrapperHeight;
        display.lastWrapWidth = update.wrapperWidth;
        startWorker(cm, 400);
      }
      display.updateLineNumbers = null;
      return true;
    }
    function postUpdateDisplay(cm, update) {
      var viewport = update.viewport;
      for (var first = true; ; first = false) {
        if (!first || !cm.options.lineWrapping || update.oldDisplayWidth == displayWidth(cm)) {
          if (viewport && viewport.top != null) {
            viewport = { top: Math.min(cm.doc.height + paddingVert(cm.display) - displayHeight(cm), viewport.top) };
          }
          update.visible = visibleLines(cm.display, cm.doc, viewport);
          if (update.visible.from >= cm.display.viewFrom && update.visible.to <= cm.display.viewTo) {
            break;
          }
        } else if (first) {
          update.visible = visibleLines(cm.display, cm.doc, viewport);
        }
        if (!updateDisplayIfNeeded(cm, update)) {
          break;
        }
        updateHeightsInViewport(cm);
        var barMeasure = measureForScrollbars(cm);
        updateSelection(cm);
        updateScrollbars(cm, barMeasure);
        setDocumentHeight(cm, barMeasure);
        update.force = false;
      }
      update.signal(cm, "update", cm);
      if (cm.display.viewFrom != cm.display.reportedViewFrom || cm.display.viewTo != cm.display.reportedViewTo) {
        update.signal(cm, "viewportChange", cm, cm.display.viewFrom, cm.display.viewTo);
        cm.display.reportedViewFrom = cm.display.viewFrom;
        cm.display.reportedViewTo = cm.display.viewTo;
      }
    }
    function updateDisplaySimple(cm, viewport) {
      var update = new DisplayUpdate(cm, viewport);
      if (updateDisplayIfNeeded(cm, update)) {
        updateHeightsInViewport(cm);
        postUpdateDisplay(cm, update);
        var barMeasure = measureForScrollbars(cm);
        updateSelection(cm);
        updateScrollbars(cm, barMeasure);
        setDocumentHeight(cm, barMeasure);
        update.finish();
      }
    }
    function patchDisplay(cm, updateNumbersFrom, dims) {
      var display = cm.display, lineNumbers = cm.options.lineNumbers;
      var container = display.lineDiv, cur = container.firstChild;
      function rm(node2) {
        var next = node2.nextSibling;
        if (webkit && mac && cm.display.currentWheelTarget == node2) {
          node2.style.display = "none";
        } else {
          node2.parentNode.removeChild(node2);
        }
        return next;
      }
      var view = display.view, lineN = display.viewFrom;
      for (var i3 = 0; i3 < view.length; i3++) {
        var lineView = view[i3];
        if (lineView.hidden)
          ;
        else if (!lineView.node || lineView.node.parentNode != container) {
          var node = buildLineElement(cm, lineView, lineN, dims);
          container.insertBefore(node, cur);
        } else {
          while (cur != lineView.node) {
            cur = rm(cur);
          }
          var updateNumber = lineNumbers && updateNumbersFrom != null && updateNumbersFrom <= lineN && lineView.lineNumber;
          if (lineView.changes) {
            if (indexOf(lineView.changes, "gutter") > -1) {
              updateNumber = false;
            }
            updateLineForChanges(cm, lineView, lineN, dims);
          }
          if (updateNumber) {
            removeChildren(lineView.lineNumber);
            lineView.lineNumber.appendChild(document.createTextNode(lineNumberFor(cm.options, lineN)));
          }
          cur = lineView.node.nextSibling;
        }
        lineN += lineView.size;
      }
      while (cur) {
        cur = rm(cur);
      }
    }
    function updateGutterSpace(display) {
      var width = display.gutters.offsetWidth;
      display.sizer.style.marginLeft = width + "px";
      signalLater(display, "gutterChanged", display);
    }
    function setDocumentHeight(cm, measure) {
      cm.display.sizer.style.minHeight = measure.docHeight + "px";
      cm.display.heightForcer.style.top = measure.docHeight + "px";
      cm.display.gutters.style.height = measure.docHeight + cm.display.barHeight + scrollGap(cm) + "px";
    }
    function alignHorizontally(cm) {
      var display = cm.display, view = display.view;
      if (!display.alignWidgets && (!display.gutters.firstChild || !cm.options.fixedGutter)) {
        return;
      }
      var comp = compensateForHScroll(display) - display.scroller.scrollLeft + cm.doc.scrollLeft;
      var gutterW = display.gutters.offsetWidth, left = comp + "px";
      for (var i3 = 0; i3 < view.length; i3++) {
        if (!view[i3].hidden) {
          if (cm.options.fixedGutter) {
            if (view[i3].gutter) {
              view[i3].gutter.style.left = left;
            }
            if (view[i3].gutterBackground) {
              view[i3].gutterBackground.style.left = left;
            }
          }
          var align = view[i3].alignable;
          if (align) {
            for (var j = 0; j < align.length; j++) {
              align[j].style.left = left;
            }
          }
        }
      }
      if (cm.options.fixedGutter) {
        display.gutters.style.left = comp + gutterW + "px";
      }
    }
    function maybeUpdateLineNumberWidth(cm) {
      if (!cm.options.lineNumbers) {
        return false;
      }
      var doc = cm.doc, last = lineNumberFor(cm.options, doc.first + doc.size - 1), display = cm.display;
      if (last.length != display.lineNumChars) {
        var test = display.measure.appendChild(elt("div", [elt("div", last)], "CodeMirror-linenumber CodeMirror-gutter-elt"));
        var innerW = test.firstChild.offsetWidth, padding = test.offsetWidth - innerW;
        display.lineGutter.style.width = "";
        display.lineNumInnerWidth = Math.max(innerW, display.lineGutter.offsetWidth - padding) + 1;
        display.lineNumWidth = display.lineNumInnerWidth + padding;
        display.lineNumChars = display.lineNumInnerWidth ? last.length : -1;
        display.lineGutter.style.width = display.lineNumWidth + "px";
        updateGutterSpace(cm.display);
        return true;
      }
      return false;
    }
    function getGutters(gutters, lineNumbers) {
      var result = [], sawLineNumbers = false;
      for (var i3 = 0; i3 < gutters.length; i3++) {
        var name = gutters[i3], style = null;
        if (typeof name != "string") {
          style = name.style;
          name = name.className;
        }
        if (name == "CodeMirror-linenumbers") {
          if (!lineNumbers) {
            continue;
          } else {
            sawLineNumbers = true;
          }
        }
        result.push({ className: name, style });
      }
      if (lineNumbers && !sawLineNumbers) {
        result.push({ className: "CodeMirror-linenumbers", style: null });
      }
      return result;
    }
    function renderGutters(display) {
      var gutters = display.gutters, specs = display.gutterSpecs;
      removeChildren(gutters);
      display.lineGutter = null;
      for (var i3 = 0; i3 < specs.length; ++i3) {
        var ref = specs[i3];
        var className = ref.className;
        var style = ref.style;
        var gElt = gutters.appendChild(elt("div", null, "CodeMirror-gutter " + className));
        if (style) {
          gElt.style.cssText = style;
        }
        if (className == "CodeMirror-linenumbers") {
          display.lineGutter = gElt;
          gElt.style.width = (display.lineNumWidth || 1) + "px";
        }
      }
      gutters.style.display = specs.length ? "" : "none";
      updateGutterSpace(display);
    }
    function updateGutters(cm) {
      renderGutters(cm.display);
      regChange(cm);
      alignHorizontally(cm);
    }
    function Display(place, doc, input, options) {
      var d2 = this;
      this.input = input;
      d2.scrollbarFiller = elt("div", null, "CodeMirror-scrollbar-filler");
      d2.scrollbarFiller.setAttribute("cm-not-content", "true");
      d2.gutterFiller = elt("div", null, "CodeMirror-gutter-filler");
      d2.gutterFiller.setAttribute("cm-not-content", "true");
      d2.lineDiv = eltP("div", null, "CodeMirror-code");
      d2.selectionDiv = elt("div", null, null, "position: relative; z-index: 1");
      d2.cursorDiv = elt("div", null, "CodeMirror-cursors");
      d2.measure = elt("div", null, "CodeMirror-measure");
      d2.lineMeasure = elt("div", null, "CodeMirror-measure");
      d2.lineSpace = eltP("div", [d2.measure, d2.lineMeasure, d2.selectionDiv, d2.cursorDiv, d2.lineDiv], null, "position: relative; outline: none");
      var lines = eltP("div", [d2.lineSpace], "CodeMirror-lines");
      d2.mover = elt("div", [lines], null, "position: relative");
      d2.sizer = elt("div", [d2.mover], "CodeMirror-sizer");
      d2.sizerWidth = null;
      d2.heightForcer = elt("div", null, null, "position: absolute; height: " + scrollerGap + "px; width: 1px;");
      d2.gutters = elt("div", null, "CodeMirror-gutters");
      d2.lineGutter = null;
      d2.scroller = elt("div", [d2.sizer, d2.heightForcer, d2.gutters], "CodeMirror-scroll");
      d2.scroller.setAttribute("tabIndex", "-1");
      d2.wrapper = elt("div", [d2.scrollbarFiller, d2.gutterFiller, d2.scroller], "CodeMirror");
      d2.wrapper.setAttribute("translate", "no");
      if (ie && ie_version < 8) {
        d2.gutters.style.zIndex = -1;
        d2.scroller.style.paddingRight = 0;
      }
      if (!webkit && !(gecko && mobile)) {
        d2.scroller.draggable = true;
      }
      if (place) {
        if (place.appendChild) {
          place.appendChild(d2.wrapper);
        } else {
          place(d2.wrapper);
        }
      }
      d2.viewFrom = d2.viewTo = doc.first;
      d2.reportedViewFrom = d2.reportedViewTo = doc.first;
      d2.view = [];
      d2.renderedView = null;
      d2.externalMeasured = null;
      d2.viewOffset = 0;
      d2.lastWrapHeight = d2.lastWrapWidth = 0;
      d2.updateLineNumbers = null;
      d2.nativeBarWidth = d2.barHeight = d2.barWidth = 0;
      d2.scrollbarsClipped = false;
      d2.lineNumWidth = d2.lineNumInnerWidth = d2.lineNumChars = null;
      d2.alignWidgets = false;
      d2.cachedCharWidth = d2.cachedTextHeight = d2.cachedPaddingH = null;
      d2.maxLine = null;
      d2.maxLineLength = 0;
      d2.maxLineChanged = false;
      d2.wheelDX = d2.wheelDY = d2.wheelStartX = d2.wheelStartY = null;
      d2.shift = false;
      d2.selForContextMenu = null;
      d2.activeTouch = null;
      d2.gutterSpecs = getGutters(options.gutters, options.lineNumbers);
      renderGutters(d2);
      input.init(d2);
    }
    var wheelSamples = 0, wheelPixelsPerUnit = null;
    if (ie) {
      wheelPixelsPerUnit = -0.53;
    } else if (gecko) {
      wheelPixelsPerUnit = 15;
    } else if (chrome) {
      wheelPixelsPerUnit = -0.7;
    } else if (safari) {
      wheelPixelsPerUnit = -1 / 3;
    }
    function wheelEventDelta(e2) {
      var dx = e2.wheelDeltaX, dy = e2.wheelDeltaY;
      if (dx == null && e2.detail && e2.axis == e2.HORIZONTAL_AXIS) {
        dx = e2.detail;
      }
      if (dy == null && e2.detail && e2.axis == e2.VERTICAL_AXIS) {
        dy = e2.detail;
      } else if (dy == null) {
        dy = e2.wheelDelta;
      }
      return { x: dx, y: dy };
    }
    function wheelEventPixels(e2) {
      var delta = wheelEventDelta(e2);
      delta.x *= wheelPixelsPerUnit;
      delta.y *= wheelPixelsPerUnit;
      return delta;
    }
    function onScrollWheel(cm, e2) {
      var delta = wheelEventDelta(e2), dx = delta.x, dy = delta.y;
      var display = cm.display, scroll = display.scroller;
      var canScrollX = scroll.scrollWidth > scroll.clientWidth;
      var canScrollY = scroll.scrollHeight > scroll.clientHeight;
      if (!(dx && canScrollX || dy && canScrollY)) {
        return;
      }
      if (dy && mac && webkit) {
        outer:
          for (var cur = e2.target, view = display.view; cur != scroll; cur = cur.parentNode) {
            for (var i3 = 0; i3 < view.length; i3++) {
              if (view[i3].node == cur) {
                cm.display.currentWheelTarget = cur;
                break outer;
              }
            }
          }
      }
      if (dx && !gecko && !presto && wheelPixelsPerUnit != null) {
        if (dy && canScrollY) {
          updateScrollTop(cm, Math.max(0, scroll.scrollTop + dy * wheelPixelsPerUnit));
        }
        setScrollLeft(cm, Math.max(0, scroll.scrollLeft + dx * wheelPixelsPerUnit));
        if (!dy || dy && canScrollY) {
          e_preventDefault(e2);
        }
        display.wheelStartX = null;
        return;
      }
      if (dy && wheelPixelsPerUnit != null) {
        var pixels = dy * wheelPixelsPerUnit;
        var top = cm.doc.scrollTop, bot = top + display.wrapper.clientHeight;
        if (pixels < 0) {
          top = Math.max(0, top + pixels - 50);
        } else {
          bot = Math.min(cm.doc.height, bot + pixels + 50);
        }
        updateDisplaySimple(cm, { top, bottom: bot });
      }
      if (wheelSamples < 20) {
        if (display.wheelStartX == null) {
          display.wheelStartX = scroll.scrollLeft;
          display.wheelStartY = scroll.scrollTop;
          display.wheelDX = dx;
          display.wheelDY = dy;
          setTimeout(function() {
            if (display.wheelStartX == null) {
              return;
            }
            var movedX = scroll.scrollLeft - display.wheelStartX;
            var movedY = scroll.scrollTop - display.wheelStartY;
            var sample = movedY && display.wheelDY && movedY / display.wheelDY || movedX && display.wheelDX && movedX / display.wheelDX;
            display.wheelStartX = display.wheelStartY = null;
            if (!sample) {
              return;
            }
            wheelPixelsPerUnit = (wheelPixelsPerUnit * wheelSamples + sample) / (wheelSamples + 1);
            ++wheelSamples;
          }, 200);
        } else {
          display.wheelDX += dx;
          display.wheelDY += dy;
        }
      }
    }
    var Selection = function(ranges, primIndex) {
      this.ranges = ranges;
      this.primIndex = primIndex;
    };
    Selection.prototype.primary = function() {
      return this.ranges[this.primIndex];
    };
    Selection.prototype.equals = function(other) {
      if (other == this) {
        return true;
      }
      if (other.primIndex != this.primIndex || other.ranges.length != this.ranges.length) {
        return false;
      }
      for (var i3 = 0; i3 < this.ranges.length; i3++) {
        var here = this.ranges[i3], there = other.ranges[i3];
        if (!equalCursorPos(here.anchor, there.anchor) || !equalCursorPos(here.head, there.head)) {
          return false;
        }
      }
      return true;
    };
    Selection.prototype.deepCopy = function() {
      var out = [];
      for (var i3 = 0; i3 < this.ranges.length; i3++) {
        out[i3] = new Range(copyPos(this.ranges[i3].anchor), copyPos(this.ranges[i3].head));
      }
      return new Selection(out, this.primIndex);
    };
    Selection.prototype.somethingSelected = function() {
      for (var i3 = 0; i3 < this.ranges.length; i3++) {
        if (!this.ranges[i3].empty()) {
          return true;
        }
      }
      return false;
    };
    Selection.prototype.contains = function(pos, end) {
      if (!end) {
        end = pos;
      }
      for (var i3 = 0; i3 < this.ranges.length; i3++) {
        var range2 = this.ranges[i3];
        if (cmp(end, range2.from()) >= 0 && cmp(pos, range2.to()) <= 0) {
          return i3;
        }
      }
      return -1;
    };
    var Range = function(anchor, head) {
      this.anchor = anchor;
      this.head = head;
    };
    Range.prototype.from = function() {
      return minPos(this.anchor, this.head);
    };
    Range.prototype.to = function() {
      return maxPos(this.anchor, this.head);
    };
    Range.prototype.empty = function() {
      return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
    };
    function normalizeSelection(cm, ranges, primIndex) {
      var mayTouch = cm && cm.options.selectionsMayTouch;
      var prim = ranges[primIndex];
      ranges.sort(function(a2, b2) {
        return cmp(a2.from(), b2.from());
      });
      primIndex = indexOf(ranges, prim);
      for (var i3 = 1; i3 < ranges.length; i3++) {
        var cur = ranges[i3], prev = ranges[i3 - 1];
        var diff = cmp(prev.to(), cur.from());
        if (mayTouch && !cur.empty() ? diff > 0 : diff >= 0) {
          var from = minPos(prev.from(), cur.from()), to = maxPos(prev.to(), cur.to());
          var inv = prev.empty() ? cur.from() == cur.head : prev.from() == prev.head;
          if (i3 <= primIndex) {
            --primIndex;
          }
          ranges.splice(--i3, 2, new Range(inv ? to : from, inv ? from : to));
        }
      }
      return new Selection(ranges, primIndex);
    }
    function simpleSelection(anchor, head) {
      return new Selection([new Range(anchor, head || anchor)], 0);
    }
    function changeEnd(change) {
      if (!change.text) {
        return change.to;
      }
      return Pos(change.from.line + change.text.length - 1, lst(change.text).length + (change.text.length == 1 ? change.from.ch : 0));
    }
    function adjustForChange(pos, change) {
      if (cmp(pos, change.from) < 0) {
        return pos;
      }
      if (cmp(pos, change.to) <= 0) {
        return changeEnd(change);
      }
      var line = pos.line + change.text.length - (change.to.line - change.from.line) - 1, ch = pos.ch;
      if (pos.line == change.to.line) {
        ch += changeEnd(change).ch - change.to.ch;
      }
      return Pos(line, ch);
    }
    function computeSelAfterChange(doc, change) {
      var out = [];
      for (var i3 = 0; i3 < doc.sel.ranges.length; i3++) {
        var range2 = doc.sel.ranges[i3];
        out.push(new Range(adjustForChange(range2.anchor, change), adjustForChange(range2.head, change)));
      }
      return normalizeSelection(doc.cm, out, doc.sel.primIndex);
    }
    function offsetPos(pos, old, nw) {
      if (pos.line == old.line) {
        return Pos(nw.line, pos.ch - old.ch + nw.ch);
      } else {
        return Pos(nw.line + (pos.line - old.line), pos.ch);
      }
    }
    function computeReplacedSel(doc, changes, hint) {
      var out = [];
      var oldPrev = Pos(doc.first, 0), newPrev = oldPrev;
      for (var i3 = 0; i3 < changes.length; i3++) {
        var change = changes[i3];
        var from = offsetPos(change.from, oldPrev, newPrev);
        var to = offsetPos(changeEnd(change), oldPrev, newPrev);
        oldPrev = change.to;
        newPrev = to;
        if (hint == "around") {
          var range2 = doc.sel.ranges[i3], inv = cmp(range2.head, range2.anchor) < 0;
          out[i3] = new Range(inv ? to : from, inv ? from : to);
        } else {
          out[i3] = new Range(from, from);
        }
      }
      return new Selection(out, doc.sel.primIndex);
    }
    function loadMode(cm) {
      cm.doc.mode = getMode(cm.options, cm.doc.modeOption);
      resetModeState(cm);
    }
    function resetModeState(cm) {
      cm.doc.iter(function(line) {
        if (line.stateAfter) {
          line.stateAfter = null;
        }
        if (line.styles) {
          line.styles = null;
        }
      });
      cm.doc.modeFrontier = cm.doc.highlightFrontier = cm.doc.first;
      startWorker(cm, 100);
      cm.state.modeGen++;
      if (cm.curOp) {
        regChange(cm);
      }
    }
    function isWholeLineUpdate(doc, change) {
      return change.from.ch == 0 && change.to.ch == 0 && lst(change.text) == "" && (!doc.cm || doc.cm.options.wholeLineUpdateBefore);
    }
    function updateDoc(doc, change, markedSpans, estimateHeight2) {
      function spansFor(n2) {
        return markedSpans ? markedSpans[n2] : null;
      }
      function update(line, text2, spans) {
        updateLine(line, text2, spans, estimateHeight2);
        signalLater(line, "change", line, change);
      }
      function linesFor(start, end) {
        var result = [];
        for (var i3 = start; i3 < end; ++i3) {
          result.push(new Line(text[i3], spansFor(i3), estimateHeight2));
        }
        return result;
      }
      var from = change.from, to = change.to, text = change.text;
      var firstLine = getLine(doc, from.line), lastLine = getLine(doc, to.line);
      var lastText = lst(text), lastSpans = spansFor(text.length - 1), nlines = to.line - from.line;
      if (change.full) {
        doc.insert(0, linesFor(0, text.length));
        doc.remove(text.length, doc.size - text.length);
      } else if (isWholeLineUpdate(doc, change)) {
        var added = linesFor(0, text.length - 1);
        update(lastLine, lastLine.text, lastSpans);
        if (nlines) {
          doc.remove(from.line, nlines);
        }
        if (added.length) {
          doc.insert(from.line, added);
        }
      } else if (firstLine == lastLine) {
        if (text.length == 1) {
          update(firstLine, firstLine.text.slice(0, from.ch) + lastText + firstLine.text.slice(to.ch), lastSpans);
        } else {
          var added$1 = linesFor(1, text.length - 1);
          added$1.push(new Line(lastText + firstLine.text.slice(to.ch), lastSpans, estimateHeight2));
          update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
          doc.insert(from.line + 1, added$1);
        }
      } else if (text.length == 1) {
        update(firstLine, firstLine.text.slice(0, from.ch) + text[0] + lastLine.text.slice(to.ch), spansFor(0));
        doc.remove(from.line + 1, nlines);
      } else {
        update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
        update(lastLine, lastText + lastLine.text.slice(to.ch), lastSpans);
        var added$2 = linesFor(1, text.length - 1);
        if (nlines > 1) {
          doc.remove(from.line + 1, nlines - 1);
        }
        doc.insert(from.line + 1, added$2);
      }
      signalLater(doc, "change", doc, change);
    }
    function linkedDocs(doc, f2, sharedHistOnly) {
      function propagate(doc2, skip, sharedHist) {
        if (doc2.linked) {
          for (var i3 = 0; i3 < doc2.linked.length; ++i3) {
            var rel = doc2.linked[i3];
            if (rel.doc == skip) {
              continue;
            }
            var shared = sharedHist && rel.sharedHist;
            if (sharedHistOnly && !shared) {
              continue;
            }
            f2(rel.doc, shared);
            propagate(rel.doc, doc2, shared);
          }
        }
      }
      propagate(doc, null, true);
    }
    function attachDoc(cm, doc) {
      if (doc.cm) {
        throw new Error("This document is already in use.");
      }
      cm.doc = doc;
      doc.cm = cm;
      estimateLineHeights(cm);
      loadMode(cm);
      setDirectionClass(cm);
      cm.options.direction = doc.direction;
      if (!cm.options.lineWrapping) {
        findMaxLine(cm);
      }
      cm.options.mode = doc.modeOption;
      regChange(cm);
    }
    function setDirectionClass(cm) {
      (cm.doc.direction == "rtl" ? addClass : rmClass)(cm.display.lineDiv, "CodeMirror-rtl");
    }
    function directionChanged(cm) {
      runInOp(cm, function() {
        setDirectionClass(cm);
        regChange(cm);
      });
    }
    function History(prev) {
      this.done = [];
      this.undone = [];
      this.undoDepth = prev ? prev.undoDepth : Infinity;
      this.lastModTime = this.lastSelTime = 0;
      this.lastOp = this.lastSelOp = null;
      this.lastOrigin = this.lastSelOrigin = null;
      this.generation = this.maxGeneration = prev ? prev.maxGeneration : 1;
    }
    function historyChangeFromChange(doc, change) {
      var histChange = { from: copyPos(change.from), to: changeEnd(change), text: getBetween(doc, change.from, change.to) };
      attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1);
      linkedDocs(doc, function(doc2) {
        return attachLocalSpans(doc2, histChange, change.from.line, change.to.line + 1);
      }, true);
      return histChange;
    }
    function clearSelectionEvents(array) {
      while (array.length) {
        var last = lst(array);
        if (last.ranges) {
          array.pop();
        } else {
          break;
        }
      }
    }
    function lastChangeEvent(hist, force) {
      if (force) {
        clearSelectionEvents(hist.done);
        return lst(hist.done);
      } else if (hist.done.length && !lst(hist.done).ranges) {
        return lst(hist.done);
      } else if (hist.done.length > 1 && !hist.done[hist.done.length - 2].ranges) {
        hist.done.pop();
        return lst(hist.done);
      }
    }
    function addChangeToHistory(doc, change, selAfter, opId) {
      var hist = doc.history;
      hist.undone.length = 0;
      var time = +new Date(), cur;
      var last;
      if ((hist.lastOp == opId || hist.lastOrigin == change.origin && change.origin && (change.origin.charAt(0) == "+" && hist.lastModTime > time - (doc.cm ? doc.cm.options.historyEventDelay : 500) || change.origin.charAt(0) == "*")) && (cur = lastChangeEvent(hist, hist.lastOp == opId))) {
        last = lst(cur.changes);
        if (cmp(change.from, change.to) == 0 && cmp(change.from, last.to) == 0) {
          last.to = changeEnd(change);
        } else {
          cur.changes.push(historyChangeFromChange(doc, change));
        }
      } else {
        var before = lst(hist.done);
        if (!before || !before.ranges) {
          pushSelectionToHistory(doc.sel, hist.done);
        }
        cur = {
          changes: [historyChangeFromChange(doc, change)],
          generation: hist.generation
        };
        hist.done.push(cur);
        while (hist.done.length > hist.undoDepth) {
          hist.done.shift();
          if (!hist.done[0].ranges) {
            hist.done.shift();
          }
        }
      }
      hist.done.push(selAfter);
      hist.generation = ++hist.maxGeneration;
      hist.lastModTime = hist.lastSelTime = time;
      hist.lastOp = hist.lastSelOp = opId;
      hist.lastOrigin = hist.lastSelOrigin = change.origin;
      if (!last) {
        signal(doc, "historyAdded");
      }
    }
    function selectionEventCanBeMerged(doc, origin, prev, sel) {
      var ch = origin.charAt(0);
      return ch == "*" || ch == "+" && prev.ranges.length == sel.ranges.length && prev.somethingSelected() == sel.somethingSelected() && new Date() - doc.history.lastSelTime <= (doc.cm ? doc.cm.options.historyEventDelay : 500);
    }
    function addSelectionToHistory(doc, sel, opId, options) {
      var hist = doc.history, origin = options && options.origin;
      if (opId == hist.lastSelOp || origin && hist.lastSelOrigin == origin && (hist.lastModTime == hist.lastSelTime && hist.lastOrigin == origin || selectionEventCanBeMerged(doc, origin, lst(hist.done), sel))) {
        hist.done[hist.done.length - 1] = sel;
      } else {
        pushSelectionToHistory(sel, hist.done);
      }
      hist.lastSelTime = +new Date();
      hist.lastSelOrigin = origin;
      hist.lastSelOp = opId;
      if (options && options.clearRedo !== false) {
        clearSelectionEvents(hist.undone);
      }
    }
    function pushSelectionToHistory(sel, dest) {
      var top = lst(dest);
      if (!(top && top.ranges && top.equals(sel))) {
        dest.push(sel);
      }
    }
    function attachLocalSpans(doc, change, from, to) {
      var existing = change["spans_" + doc.id], n2 = 0;
      doc.iter(Math.max(doc.first, from), Math.min(doc.first + doc.size, to), function(line) {
        if (line.markedSpans) {
          (existing || (existing = change["spans_" + doc.id] = {}))[n2] = line.markedSpans;
        }
        ++n2;
      });
    }
    function removeClearedSpans(spans) {
      if (!spans) {
        return null;
      }
      var out;
      for (var i3 = 0; i3 < spans.length; ++i3) {
        if (spans[i3].marker.explicitlyCleared) {
          if (!out) {
            out = spans.slice(0, i3);
          }
        } else if (out) {
          out.push(spans[i3]);
        }
      }
      return !out ? spans : out.length ? out : null;
    }
    function getOldSpans(doc, change) {
      var found = change["spans_" + doc.id];
      if (!found) {
        return null;
      }
      var nw = [];
      for (var i3 = 0; i3 < change.text.length; ++i3) {
        nw.push(removeClearedSpans(found[i3]));
      }
      return nw;
    }
    function mergeOldSpans(doc, change) {
      var old = getOldSpans(doc, change);
      var stretched = stretchSpansOverChange(doc, change);
      if (!old) {
        return stretched;
      }
      if (!stretched) {
        return old;
      }
      for (var i3 = 0; i3 < old.length; ++i3) {
        var oldCur = old[i3], stretchCur = stretched[i3];
        if (oldCur && stretchCur) {
          spans:
            for (var j = 0; j < stretchCur.length; ++j) {
              var span = stretchCur[j];
              for (var k2 = 0; k2 < oldCur.length; ++k2) {
                if (oldCur[k2].marker == span.marker) {
                  continue spans;
                }
              }
              oldCur.push(span);
            }
        } else if (stretchCur) {
          old[i3] = stretchCur;
        }
      }
      return old;
    }
    function copyHistoryArray(events, newGroup, instantiateSel) {
      var copy = [];
      for (var i3 = 0; i3 < events.length; ++i3) {
        var event = events[i3];
        if (event.ranges) {
          copy.push(instantiateSel ? Selection.prototype.deepCopy.call(event) : event);
          continue;
        }
        var changes = event.changes, newChanges = [];
        copy.push({ changes: newChanges });
        for (var j = 0; j < changes.length; ++j) {
          var change = changes[j], m2 = void 0;
          newChanges.push({ from: change.from, to: change.to, text: change.text });
          if (newGroup) {
            for (var prop2 in change) {
              if (m2 = prop2.match(/^spans_(\d+)$/)) {
                if (indexOf(newGroup, Number(m2[1])) > -1) {
                  lst(newChanges)[prop2] = change[prop2];
                  delete change[prop2];
                }
              }
            }
          }
        }
      }
      return copy;
    }
    function extendRange(range2, head, other, extend) {
      if (extend) {
        var anchor = range2.anchor;
        if (other) {
          var posBefore = cmp(head, anchor) < 0;
          if (posBefore != cmp(other, anchor) < 0) {
            anchor = head;
            head = other;
          } else if (posBefore != cmp(head, other) < 0) {
            head = other;
          }
        }
        return new Range(anchor, head);
      } else {
        return new Range(other || head, head);
      }
    }
    function extendSelection(doc, head, other, options, extend) {
      if (extend == null) {
        extend = doc.cm && (doc.cm.display.shift || doc.extend);
      }
      setSelection(doc, new Selection([extendRange(doc.sel.primary(), head, other, extend)], 0), options);
    }
    function extendSelections(doc, heads, options) {
      var out = [];
      var extend = doc.cm && (doc.cm.display.shift || doc.extend);
      for (var i3 = 0; i3 < doc.sel.ranges.length; i3++) {
        out[i3] = extendRange(doc.sel.ranges[i3], heads[i3], null, extend);
      }
      var newSel = normalizeSelection(doc.cm, out, doc.sel.primIndex);
      setSelection(doc, newSel, options);
    }
    function replaceOneSelection(doc, i3, range2, options) {
      var ranges = doc.sel.ranges.slice(0);
      ranges[i3] = range2;
      setSelection(doc, normalizeSelection(doc.cm, ranges, doc.sel.primIndex), options);
    }
    function setSimpleSelection(doc, anchor, head, options) {
      setSelection(doc, simpleSelection(anchor, head), options);
    }
    function filterSelectionChange(doc, sel, options) {
      var obj = {
        ranges: sel.ranges,
        update: function(ranges) {
          this.ranges = [];
          for (var i3 = 0; i3 < ranges.length; i3++) {
            this.ranges[i3] = new Range(clipPos(doc, ranges[i3].anchor), clipPos(doc, ranges[i3].head));
          }
        },
        origin: options && options.origin
      };
      signal(doc, "beforeSelectionChange", doc, obj);
      if (doc.cm) {
        signal(doc.cm, "beforeSelectionChange", doc.cm, obj);
      }
      if (obj.ranges != sel.ranges) {
        return normalizeSelection(doc.cm, obj.ranges, obj.ranges.length - 1);
      } else {
        return sel;
      }
    }
    function setSelectionReplaceHistory(doc, sel, options) {
      var done = doc.history.done, last = lst(done);
      if (last && last.ranges) {
        done[done.length - 1] = sel;
        setSelectionNoUndo(doc, sel, options);
      } else {
        setSelection(doc, sel, options);
      }
    }
    function setSelection(doc, sel, options) {
      setSelectionNoUndo(doc, sel, options);
      addSelectionToHistory(doc, doc.sel, doc.cm ? doc.cm.curOp.id : NaN, options);
    }
    function setSelectionNoUndo(doc, sel, options) {
      if (hasHandler(doc, "beforeSelectionChange") || doc.cm && hasHandler(doc.cm, "beforeSelectionChange")) {
        sel = filterSelectionChange(doc, sel, options);
      }
      var bias = options && options.bias || (cmp(sel.primary().head, doc.sel.primary().head) < 0 ? -1 : 1);
      setSelectionInner(doc, skipAtomicInSelection(doc, sel, bias, true));
      if (!(options && options.scroll === false) && doc.cm && doc.cm.getOption("readOnly") != "nocursor") {
        ensureCursorVisible(doc.cm);
      }
    }
    function setSelectionInner(doc, sel) {
      if (sel.equals(doc.sel)) {
        return;
      }
      doc.sel = sel;
      if (doc.cm) {
        doc.cm.curOp.updateInput = 1;
        doc.cm.curOp.selectionChanged = true;
        signalCursorActivity(doc.cm);
      }
      signalLater(doc, "cursorActivity", doc);
    }
    function reCheckSelection(doc) {
      setSelectionInner(doc, skipAtomicInSelection(doc, doc.sel, null, false));
    }
    function skipAtomicInSelection(doc, sel, bias, mayClear) {
      var out;
      for (var i3 = 0; i3 < sel.ranges.length; i3++) {
        var range2 = sel.ranges[i3];
        var old = sel.ranges.length == doc.sel.ranges.length && doc.sel.ranges[i3];
        var newAnchor = skipAtomic(doc, range2.anchor, old && old.anchor, bias, mayClear);
        var newHead = skipAtomic(doc, range2.head, old && old.head, bias, mayClear);
        if (out || newAnchor != range2.anchor || newHead != range2.head) {
          if (!out) {
            out = sel.ranges.slice(0, i3);
          }
          out[i3] = new Range(newAnchor, newHead);
        }
      }
      return out ? normalizeSelection(doc.cm, out, sel.primIndex) : sel;
    }
    function skipAtomicInner(doc, pos, oldPos, dir, mayClear) {
      var line = getLine(doc, pos.line);
      if (line.markedSpans) {
        for (var i3 = 0; i3 < line.markedSpans.length; ++i3) {
          var sp = line.markedSpans[i3], m2 = sp.marker;
          var preventCursorLeft = "selectLeft" in m2 ? !m2.selectLeft : m2.inclusiveLeft;
          var preventCursorRight = "selectRight" in m2 ? !m2.selectRight : m2.inclusiveRight;
          if ((sp.from == null || (preventCursorLeft ? sp.from <= pos.ch : sp.from < pos.ch)) && (sp.to == null || (preventCursorRight ? sp.to >= pos.ch : sp.to > pos.ch))) {
            if (mayClear) {
              signal(m2, "beforeCursorEnter");
              if (m2.explicitlyCleared) {
                if (!line.markedSpans) {
                  break;
                } else {
                  --i3;
                  continue;
                }
              }
            }
            if (!m2.atomic) {
              continue;
            }
            if (oldPos) {
              var near = m2.find(dir < 0 ? 1 : -1), diff = void 0;
              if (dir < 0 ? preventCursorRight : preventCursorLeft) {
                near = movePos(doc, near, -dir, near && near.line == pos.line ? line : null);
              }
              if (near && near.line == pos.line && (diff = cmp(near, oldPos)) && (dir < 0 ? diff < 0 : diff > 0)) {
                return skipAtomicInner(doc, near, pos, dir, mayClear);
              }
            }
            var far = m2.find(dir < 0 ? -1 : 1);
            if (dir < 0 ? preventCursorLeft : preventCursorRight) {
              far = movePos(doc, far, dir, far.line == pos.line ? line : null);
            }
            return far ? skipAtomicInner(doc, far, pos, dir, mayClear) : null;
          }
        }
      }
      return pos;
    }
    function skipAtomic(doc, pos, oldPos, bias, mayClear) {
      var dir = bias || 1;
      var found = skipAtomicInner(doc, pos, oldPos, dir, mayClear) || !mayClear && skipAtomicInner(doc, pos, oldPos, dir, true) || skipAtomicInner(doc, pos, oldPos, -dir, mayClear) || !mayClear && skipAtomicInner(doc, pos, oldPos, -dir, true);
      if (!found) {
        doc.cantEdit = true;
        return Pos(doc.first, 0);
      }
      return found;
    }
    function movePos(doc, pos, dir, line) {
      if (dir < 0 && pos.ch == 0) {
        if (pos.line > doc.first) {
          return clipPos(doc, Pos(pos.line - 1));
        } else {
          return null;
        }
      } else if (dir > 0 && pos.ch == (line || getLine(doc, pos.line)).text.length) {
        if (pos.line < doc.first + doc.size - 1) {
          return Pos(pos.line + 1, 0);
        } else {
          return null;
        }
      } else {
        return new Pos(pos.line, pos.ch + dir);
      }
    }
    function selectAll(cm) {
      cm.setSelection(Pos(cm.firstLine(), 0), Pos(cm.lastLine()), sel_dontScroll);
    }
    function filterChange(doc, change, update) {
      var obj = {
        canceled: false,
        from: change.from,
        to: change.to,
        text: change.text,
        origin: change.origin,
        cancel: function() {
          return obj.canceled = true;
        }
      };
      if (update) {
        obj.update = function(from, to, text, origin) {
          if (from) {
            obj.from = clipPos(doc, from);
          }
          if (to) {
            obj.to = clipPos(doc, to);
          }
          if (text) {
            obj.text = text;
          }
          if (origin !== void 0) {
            obj.origin = origin;
          }
        };
      }
      signal(doc, "beforeChange", doc, obj);
      if (doc.cm) {
        signal(doc.cm, "beforeChange", doc.cm, obj);
      }
      if (obj.canceled) {
        if (doc.cm) {
          doc.cm.curOp.updateInput = 2;
        }
        return null;
      }
      return { from: obj.from, to: obj.to, text: obj.text, origin: obj.origin };
    }
    function makeChange(doc, change, ignoreReadOnly) {
      if (doc.cm) {
        if (!doc.cm.curOp) {
          return operation(doc.cm, makeChange)(doc, change, ignoreReadOnly);
        }
        if (doc.cm.state.suppressEdits) {
          return;
        }
      }
      if (hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange")) {
        change = filterChange(doc, change, true);
        if (!change) {
          return;
        }
      }
      var split = sawReadOnlySpans && !ignoreReadOnly && removeReadOnlyRanges(doc, change.from, change.to);
      if (split) {
        for (var i3 = split.length - 1; i3 >= 0; --i3) {
          makeChangeInner(doc, { from: split[i3].from, to: split[i3].to, text: i3 ? [""] : change.text, origin: change.origin });
        }
      } else {
        makeChangeInner(doc, change);
      }
    }
    function makeChangeInner(doc, change) {
      if (change.text.length == 1 && change.text[0] == "" && cmp(change.from, change.to) == 0) {
        return;
      }
      var selAfter = computeSelAfterChange(doc, change);
      addChangeToHistory(doc, change, selAfter, doc.cm ? doc.cm.curOp.id : NaN);
      makeChangeSingleDoc(doc, change, selAfter, stretchSpansOverChange(doc, change));
      var rebased = [];
      linkedDocs(doc, function(doc2, sharedHist) {
        if (!sharedHist && indexOf(rebased, doc2.history) == -1) {
          rebaseHist(doc2.history, change);
          rebased.push(doc2.history);
        }
        makeChangeSingleDoc(doc2, change, null, stretchSpansOverChange(doc2, change));
      });
    }
    function makeChangeFromHistory(doc, type, allowSelectionOnly) {
      var suppress = doc.cm && doc.cm.state.suppressEdits;
      if (suppress && !allowSelectionOnly) {
        return;
      }
      var hist = doc.history, event, selAfter = doc.sel;
      var source = type == "undo" ? hist.done : hist.undone, dest = type == "undo" ? hist.undone : hist.done;
      var i3 = 0;
      for (; i3 < source.length; i3++) {
        event = source[i3];
        if (allowSelectionOnly ? event.ranges && !event.equals(doc.sel) : !event.ranges) {
          break;
        }
      }
      if (i3 == source.length) {
        return;
      }
      hist.lastOrigin = hist.lastSelOrigin = null;
      for (; ; ) {
        event = source.pop();
        if (event.ranges) {
          pushSelectionToHistory(event, dest);
          if (allowSelectionOnly && !event.equals(doc.sel)) {
            setSelection(doc, event, { clearRedo: false });
            return;
          }
          selAfter = event;
        } else if (suppress) {
          source.push(event);
          return;
        } else {
          break;
        }
      }
      var antiChanges = [];
      pushSelectionToHistory(selAfter, dest);
      dest.push({ changes: antiChanges, generation: hist.generation });
      hist.generation = event.generation || ++hist.maxGeneration;
      var filter = hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange");
      var loop = function(i4) {
        var change = event.changes[i4];
        change.origin = type;
        if (filter && !filterChange(doc, change, false)) {
          source.length = 0;
          return {};
        }
        antiChanges.push(historyChangeFromChange(doc, change));
        var after = i4 ? computeSelAfterChange(doc, change) : lst(source);
        makeChangeSingleDoc(doc, change, after, mergeOldSpans(doc, change));
        if (!i4 && doc.cm) {
          doc.cm.scrollIntoView({ from: change.from, to: changeEnd(change) });
        }
        var rebased = [];
        linkedDocs(doc, function(doc2, sharedHist) {
          if (!sharedHist && indexOf(rebased, doc2.history) == -1) {
            rebaseHist(doc2.history, change);
            rebased.push(doc2.history);
          }
          makeChangeSingleDoc(doc2, change, null, mergeOldSpans(doc2, change));
        });
      };
      for (var i$13 = event.changes.length - 1; i$13 >= 0; --i$13) {
        var returned = loop(i$13);
        if (returned)
          return returned.v;
      }
    }
    function shiftDoc(doc, distance) {
      if (distance == 0) {
        return;
      }
      doc.first += distance;
      doc.sel = new Selection(map(doc.sel.ranges, function(range2) {
        return new Range(Pos(range2.anchor.line + distance, range2.anchor.ch), Pos(range2.head.line + distance, range2.head.ch));
      }), doc.sel.primIndex);
      if (doc.cm) {
        regChange(doc.cm, doc.first, doc.first - distance, distance);
        for (var d2 = doc.cm.display, l2 = d2.viewFrom; l2 < d2.viewTo; l2++) {
          regLineChange(doc.cm, l2, "gutter");
        }
      }
    }
    function makeChangeSingleDoc(doc, change, selAfter, spans) {
      if (doc.cm && !doc.cm.curOp) {
        return operation(doc.cm, makeChangeSingleDoc)(doc, change, selAfter, spans);
      }
      if (change.to.line < doc.first) {
        shiftDoc(doc, change.text.length - 1 - (change.to.line - change.from.line));
        return;
      }
      if (change.from.line > doc.lastLine()) {
        return;
      }
      if (change.from.line < doc.first) {
        var shift = change.text.length - 1 - (doc.first - change.from.line);
        shiftDoc(doc, shift);
        change = {
          from: Pos(doc.first, 0),
          to: Pos(change.to.line + shift, change.to.ch),
          text: [lst(change.text)],
          origin: change.origin
        };
      }
      var last = doc.lastLine();
      if (change.to.line > last) {
        change = {
          from: change.from,
          to: Pos(last, getLine(doc, last).text.length),
          text: [change.text[0]],
          origin: change.origin
        };
      }
      change.removed = getBetween(doc, change.from, change.to);
      if (!selAfter) {
        selAfter = computeSelAfterChange(doc, change);
      }
      if (doc.cm) {
        makeChangeSingleDocInEditor(doc.cm, change, spans);
      } else {
        updateDoc(doc, change, spans);
      }
      setSelectionNoUndo(doc, selAfter, sel_dontScroll);
      if (doc.cantEdit && skipAtomic(doc, Pos(doc.firstLine(), 0))) {
        doc.cantEdit = false;
      }
    }
    function makeChangeSingleDocInEditor(cm, change, spans) {
      var doc = cm.doc, display = cm.display, from = change.from, to = change.to;
      var recomputeMaxLength = false, checkWidthStart = from.line;
      if (!cm.options.lineWrapping) {
        checkWidthStart = lineNo(visualLine(getLine(doc, from.line)));
        doc.iter(checkWidthStart, to.line + 1, function(line) {
          if (line == display.maxLine) {
            recomputeMaxLength = true;
            return true;
          }
        });
      }
      if (doc.sel.contains(change.from, change.to) > -1) {
        signalCursorActivity(cm);
      }
      updateDoc(doc, change, spans, estimateHeight(cm));
      if (!cm.options.lineWrapping) {
        doc.iter(checkWidthStart, from.line + change.text.length, function(line) {
          var len = lineLength(line);
          if (len > display.maxLineLength) {
            display.maxLine = line;
            display.maxLineLength = len;
            display.maxLineChanged = true;
            recomputeMaxLength = false;
          }
        });
        if (recomputeMaxLength) {
          cm.curOp.updateMaxLine = true;
        }
      }
      retreatFrontier(doc, from.line);
      startWorker(cm, 400);
      var lendiff = change.text.length - (to.line - from.line) - 1;
      if (change.full) {
        regChange(cm);
      } else if (from.line == to.line && change.text.length == 1 && !isWholeLineUpdate(cm.doc, change)) {
        regLineChange(cm, from.line, "text");
      } else {
        regChange(cm, from.line, to.line + 1, lendiff);
      }
      var changesHandler = hasHandler(cm, "changes"), changeHandler = hasHandler(cm, "change");
      if (changeHandler || changesHandler) {
        var obj = {
          from,
          to,
          text: change.text,
          removed: change.removed,
          origin: change.origin
        };
        if (changeHandler) {
          signalLater(cm, "change", cm, obj);
        }
        if (changesHandler) {
          (cm.curOp.changeObjs || (cm.curOp.changeObjs = [])).push(obj);
        }
      }
      cm.display.selForContextMenu = null;
    }
    function replaceRange(doc, code, from, to, origin) {
      var assign;
      if (!to) {
        to = from;
      }
      if (cmp(to, from) < 0) {
        assign = [to, from], from = assign[0], to = assign[1];
      }
      if (typeof code == "string") {
        code = doc.splitLines(code);
      }
      makeChange(doc, { from, to, text: code, origin });
    }
    function rebaseHistSelSingle(pos, from, to, diff) {
      if (to < pos.line) {
        pos.line += diff;
      } else if (from < pos.line) {
        pos.line = from;
        pos.ch = 0;
      }
    }
    function rebaseHistArray(array, from, to, diff) {
      for (var i3 = 0; i3 < array.length; ++i3) {
        var sub = array[i3], ok = true;
        if (sub.ranges) {
          if (!sub.copied) {
            sub = array[i3] = sub.deepCopy();
            sub.copied = true;
          }
          for (var j = 0; j < sub.ranges.length; j++) {
            rebaseHistSelSingle(sub.ranges[j].anchor, from, to, diff);
            rebaseHistSelSingle(sub.ranges[j].head, from, to, diff);
          }
          continue;
        }
        for (var j$1 = 0; j$1 < sub.changes.length; ++j$1) {
          var cur = sub.changes[j$1];
          if (to < cur.from.line) {
            cur.from = Pos(cur.from.line + diff, cur.from.ch);
            cur.to = Pos(cur.to.line + diff, cur.to.ch);
          } else if (from <= cur.to.line) {
            ok = false;
            break;
          }
        }
        if (!ok) {
          array.splice(0, i3 + 1);
          i3 = 0;
        }
      }
    }
    function rebaseHist(hist, change) {
      var from = change.from.line, to = change.to.line, diff = change.text.length - (to - from) - 1;
      rebaseHistArray(hist.done, from, to, diff);
      rebaseHistArray(hist.undone, from, to, diff);
    }
    function changeLine(doc, handle, changeType, op) {
      var no = handle, line = handle;
      if (typeof handle == "number") {
        line = getLine(doc, clipLine(doc, handle));
      } else {
        no = lineNo(handle);
      }
      if (no == null) {
        return null;
      }
      if (op(line, no) && doc.cm) {
        regLineChange(doc.cm, no, changeType);
      }
      return line;
    }
    function LeafChunk(lines) {
      this.lines = lines;
      this.parent = null;
      var height = 0;
      for (var i3 = 0; i3 < lines.length; ++i3) {
        lines[i3].parent = this;
        height += lines[i3].height;
      }
      this.height = height;
    }
    LeafChunk.prototype = {
      chunkSize: function() {
        return this.lines.length;
      },
      removeInner: function(at, n2) {
        for (var i3 = at, e2 = at + n2; i3 < e2; ++i3) {
          var line = this.lines[i3];
          this.height -= line.height;
          cleanUpLine(line);
          signalLater(line, "delete");
        }
        this.lines.splice(at, n2);
      },
      collapse: function(lines) {
        lines.push.apply(lines, this.lines);
      },
      insertInner: function(at, lines, height) {
        this.height += height;
        this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
        for (var i3 = 0; i3 < lines.length; ++i3) {
          lines[i3].parent = this;
        }
      },
      iterN: function(at, n2, op) {
        for (var e2 = at + n2; at < e2; ++at) {
          if (op(this.lines[at])) {
            return true;
          }
        }
      }
    };
    function BranchChunk(children) {
      this.children = children;
      var size = 0, height = 0;
      for (var i3 = 0; i3 < children.length; ++i3) {
        var ch = children[i3];
        size += ch.chunkSize();
        height += ch.height;
        ch.parent = this;
      }
      this.size = size;
      this.height = height;
      this.parent = null;
    }
    BranchChunk.prototype = {
      chunkSize: function() {
        return this.size;
      },
      removeInner: function(at, n2) {
        this.size -= n2;
        for (var i3 = 0; i3 < this.children.length; ++i3) {
          var child = this.children[i3], sz = child.chunkSize();
          if (at < sz) {
            var rm = Math.min(n2, sz - at), oldHeight = child.height;
            child.removeInner(at, rm);
            this.height -= oldHeight - child.height;
            if (sz == rm) {
              this.children.splice(i3--, 1);
              child.parent = null;
            }
            if ((n2 -= rm) == 0) {
              break;
            }
            at = 0;
          } else {
            at -= sz;
          }
        }
        if (this.size - n2 < 25 && (this.children.length > 1 || !(this.children[0] instanceof LeafChunk))) {
          var lines = [];
          this.collapse(lines);
          this.children = [new LeafChunk(lines)];
          this.children[0].parent = this;
        }
      },
      collapse: function(lines) {
        for (var i3 = 0; i3 < this.children.length; ++i3) {
          this.children[i3].collapse(lines);
        }
      },
      insertInner: function(at, lines, height) {
        this.size += lines.length;
        this.height += height;
        for (var i3 = 0; i3 < this.children.length; ++i3) {
          var child = this.children[i3], sz = child.chunkSize();
          if (at <= sz) {
            child.insertInner(at, lines, height);
            if (child.lines && child.lines.length > 50) {
              var remaining = child.lines.length % 25 + 25;
              for (var pos = remaining; pos < child.lines.length; ) {
                var leaf = new LeafChunk(child.lines.slice(pos, pos += 25));
                child.height -= leaf.height;
                this.children.splice(++i3, 0, leaf);
                leaf.parent = this;
              }
              child.lines = child.lines.slice(0, remaining);
              this.maybeSpill();
            }
            break;
          }
          at -= sz;
        }
      },
      maybeSpill: function() {
        if (this.children.length <= 10) {
          return;
        }
        var me = this;
        do {
          var spilled = me.children.splice(me.children.length - 5, 5);
          var sibling = new BranchChunk(spilled);
          if (!me.parent) {
            var copy = new BranchChunk(me.children);
            copy.parent = me;
            me.children = [copy, sibling];
            me = copy;
          } else {
            me.size -= sibling.size;
            me.height -= sibling.height;
            var myIndex = indexOf(me.parent.children, me);
            me.parent.children.splice(myIndex + 1, 0, sibling);
          }
          sibling.parent = me.parent;
        } while (me.children.length > 10);
        me.parent.maybeSpill();
      },
      iterN: function(at, n2, op) {
        for (var i3 = 0; i3 < this.children.length; ++i3) {
          var child = this.children[i3], sz = child.chunkSize();
          if (at < sz) {
            var used = Math.min(n2, sz - at);
            if (child.iterN(at, used, op)) {
              return true;
            }
            if ((n2 -= used) == 0) {
              break;
            }
            at = 0;
          } else {
            at -= sz;
          }
        }
      }
    };
    var LineWidget = function(doc, node, options) {
      if (options) {
        for (var opt in options) {
          if (options.hasOwnProperty(opt)) {
            this[opt] = options[opt];
          }
        }
      }
      this.doc = doc;
      this.node = node;
    };
    LineWidget.prototype.clear = function() {
      var cm = this.doc.cm, ws = this.line.widgets, line = this.line, no = lineNo(line);
      if (no == null || !ws) {
        return;
      }
      for (var i3 = 0; i3 < ws.length; ++i3) {
        if (ws[i3] == this) {
          ws.splice(i3--, 1);
        }
      }
      if (!ws.length) {
        line.widgets = null;
      }
      var height = widgetHeight(this);
      updateLineHeight(line, Math.max(0, line.height - height));
      if (cm) {
        runInOp(cm, function() {
          adjustScrollWhenAboveVisible(cm, line, -height);
          regLineChange(cm, no, "widget");
        });
        signalLater(cm, "lineWidgetCleared", cm, this, no);
      }
    };
    LineWidget.prototype.changed = function() {
      var this$1$1 = this;
      var oldH = this.height, cm = this.doc.cm, line = this.line;
      this.height = null;
      var diff = widgetHeight(this) - oldH;
      if (!diff) {
        return;
      }
      if (!lineIsHidden(this.doc, line)) {
        updateLineHeight(line, line.height + diff);
      }
      if (cm) {
        runInOp(cm, function() {
          cm.curOp.forceUpdate = true;
          adjustScrollWhenAboveVisible(cm, line, diff);
          signalLater(cm, "lineWidgetChanged", cm, this$1$1, lineNo(line));
        });
      }
    };
    eventMixin(LineWidget);
    function adjustScrollWhenAboveVisible(cm, line, diff) {
      if (heightAtLine(line) < (cm.curOp && cm.curOp.scrollTop || cm.doc.scrollTop)) {
        addToScrollTop(cm, diff);
      }
    }
    function addLineWidget(doc, handle, node, options) {
      var widget = new LineWidget(doc, node, options);
      var cm = doc.cm;
      if (cm && widget.noHScroll) {
        cm.display.alignWidgets = true;
      }
      changeLine(doc, handle, "widget", function(line) {
        var widgets = line.widgets || (line.widgets = []);
        if (widget.insertAt == null) {
          widgets.push(widget);
        } else {
          widgets.splice(Math.min(widgets.length, Math.max(0, widget.insertAt)), 0, widget);
        }
        widget.line = line;
        if (cm && !lineIsHidden(doc, line)) {
          var aboveVisible = heightAtLine(line) < doc.scrollTop;
          updateLineHeight(line, line.height + widgetHeight(widget));
          if (aboveVisible) {
            addToScrollTop(cm, widget.height);
          }
          cm.curOp.forceUpdate = true;
        }
        return true;
      });
      if (cm) {
        signalLater(cm, "lineWidgetAdded", cm, widget, typeof handle == "number" ? handle : lineNo(handle));
      }
      return widget;
    }
    var nextMarkerId = 0;
    var TextMarker = function(doc, type) {
      this.lines = [];
      this.type = type;
      this.doc = doc;
      this.id = ++nextMarkerId;
    };
    TextMarker.prototype.clear = function() {
      if (this.explicitlyCleared) {
        return;
      }
      var cm = this.doc.cm, withOp = cm && !cm.curOp;
      if (withOp) {
        startOperation(cm);
      }
      if (hasHandler(this, "clear")) {
        var found = this.find();
        if (found) {
          signalLater(this, "clear", found.from, found.to);
        }
      }
      var min = null, max = null;
      for (var i3 = 0; i3 < this.lines.length; ++i3) {
        var line = this.lines[i3];
        var span = getMarkedSpanFor(line.markedSpans, this);
        if (cm && !this.collapsed) {
          regLineChange(cm, lineNo(line), "text");
        } else if (cm) {
          if (span.to != null) {
            max = lineNo(line);
          }
          if (span.from != null) {
            min = lineNo(line);
          }
        }
        line.markedSpans = removeMarkedSpan(line.markedSpans, span);
        if (span.from == null && this.collapsed && !lineIsHidden(this.doc, line) && cm) {
          updateLineHeight(line, textHeight(cm.display));
        }
      }
      if (cm && this.collapsed && !cm.options.lineWrapping) {
        for (var i$13 = 0; i$13 < this.lines.length; ++i$13) {
          var visual = visualLine(this.lines[i$13]), len = lineLength(visual);
          if (len > cm.display.maxLineLength) {
            cm.display.maxLine = visual;
            cm.display.maxLineLength = len;
            cm.display.maxLineChanged = true;
          }
        }
      }
      if (min != null && cm && this.collapsed) {
        regChange(cm, min, max + 1);
      }
      this.lines.length = 0;
      this.explicitlyCleared = true;
      if (this.atomic && this.doc.cantEdit) {
        this.doc.cantEdit = false;
        if (cm) {
          reCheckSelection(cm.doc);
        }
      }
      if (cm) {
        signalLater(cm, "markerCleared", cm, this, min, max);
      }
      if (withOp) {
        endOperation(cm);
      }
      if (this.parent) {
        this.parent.clear();
      }
    };
    TextMarker.prototype.find = function(side, lineObj) {
      if (side == null && this.type == "bookmark") {
        side = 1;
      }
      var from, to;
      for (var i3 = 0; i3 < this.lines.length; ++i3) {
        var line = this.lines[i3];
        var span = getMarkedSpanFor(line.markedSpans, this);
        if (span.from != null) {
          from = Pos(lineObj ? line : lineNo(line), span.from);
          if (side == -1) {
            return from;
          }
        }
        if (span.to != null) {
          to = Pos(lineObj ? line : lineNo(line), span.to);
          if (side == 1) {
            return to;
          }
        }
      }
      return from && { from, to };
    };
    TextMarker.prototype.changed = function() {
      var this$1$1 = this;
      var pos = this.find(-1, true), widget = this, cm = this.doc.cm;
      if (!pos || !cm) {
        return;
      }
      runInOp(cm, function() {
        var line = pos.line, lineN = lineNo(pos.line);
        var view = findViewForLine(cm, lineN);
        if (view) {
          clearLineMeasurementCacheFor(view);
          cm.curOp.selectionChanged = cm.curOp.forceUpdate = true;
        }
        cm.curOp.updateMaxLine = true;
        if (!lineIsHidden(widget.doc, line) && widget.height != null) {
          var oldHeight = widget.height;
          widget.height = null;
          var dHeight = widgetHeight(widget) - oldHeight;
          if (dHeight) {
            updateLineHeight(line, line.height + dHeight);
          }
        }
        signalLater(cm, "markerChanged", cm, this$1$1);
      });
    };
    TextMarker.prototype.attachLine = function(line) {
      if (!this.lines.length && this.doc.cm) {
        var op = this.doc.cm.curOp;
        if (!op.maybeHiddenMarkers || indexOf(op.maybeHiddenMarkers, this) == -1) {
          (op.maybeUnhiddenMarkers || (op.maybeUnhiddenMarkers = [])).push(this);
        }
      }
      this.lines.push(line);
    };
    TextMarker.prototype.detachLine = function(line) {
      this.lines.splice(indexOf(this.lines, line), 1);
      if (!this.lines.length && this.doc.cm) {
        var op = this.doc.cm.curOp;
        (op.maybeHiddenMarkers || (op.maybeHiddenMarkers = [])).push(this);
      }
    };
    eventMixin(TextMarker);
    function markText(doc, from, to, options, type) {
      if (options && options.shared) {
        return markTextShared(doc, from, to, options, type);
      }
      if (doc.cm && !doc.cm.curOp) {
        return operation(doc.cm, markText)(doc, from, to, options, type);
      }
      var marker = new TextMarker(doc, type), diff = cmp(from, to);
      if (options) {
        copyObj(options, marker, false);
      }
      if (diff > 0 || diff == 0 && marker.clearWhenEmpty !== false) {
        return marker;
      }
      if (marker.replacedWith) {
        marker.collapsed = true;
        marker.widgetNode = eltP("span", [marker.replacedWith], "CodeMirror-widget");
        if (!options.handleMouseEvents) {
          marker.widgetNode.setAttribute("cm-ignore-events", "true");
        }
        if (options.insertLeft) {
          marker.widgetNode.insertLeft = true;
        }
      }
      if (marker.collapsed) {
        if (conflictingCollapsedRange(doc, from.line, from, to, marker) || from.line != to.line && conflictingCollapsedRange(doc, to.line, from, to, marker)) {
          throw new Error("Inserting collapsed marker partially overlapping an existing one");
        }
        seeCollapsedSpans();
      }
      if (marker.addToHistory) {
        addChangeToHistory(doc, { from, to, origin: "markText" }, doc.sel, NaN);
      }
      var curLine = from.line, cm = doc.cm, updateMaxLine;
      doc.iter(curLine, to.line + 1, function(line) {
        if (cm && marker.collapsed && !cm.options.lineWrapping && visualLine(line) == cm.display.maxLine) {
          updateMaxLine = true;
        }
        if (marker.collapsed && curLine != from.line) {
          updateLineHeight(line, 0);
        }
        addMarkedSpan(line, new MarkedSpan(marker, curLine == from.line ? from.ch : null, curLine == to.line ? to.ch : null), doc.cm && doc.cm.curOp);
        ++curLine;
      });
      if (marker.collapsed) {
        doc.iter(from.line, to.line + 1, function(line) {
          if (lineIsHidden(doc, line)) {
            updateLineHeight(line, 0);
          }
        });
      }
      if (marker.clearOnEnter) {
        on(marker, "beforeCursorEnter", function() {
          return marker.clear();
        });
      }
      if (marker.readOnly) {
        seeReadOnlySpans();
        if (doc.history.done.length || doc.history.undone.length) {
          doc.clearHistory();
        }
      }
      if (marker.collapsed) {
        marker.id = ++nextMarkerId;
        marker.atomic = true;
      }
      if (cm) {
        if (updateMaxLine) {
          cm.curOp.updateMaxLine = true;
        }
        if (marker.collapsed) {
          regChange(cm, from.line, to.line + 1);
        } else if (marker.className || marker.startStyle || marker.endStyle || marker.css || marker.attributes || marker.title) {
          for (var i3 = from.line; i3 <= to.line; i3++) {
            regLineChange(cm, i3, "text");
          }
        }
        if (marker.atomic) {
          reCheckSelection(cm.doc);
        }
        signalLater(cm, "markerAdded", cm, marker);
      }
      return marker;
    }
    var SharedTextMarker = function(markers, primary) {
      this.markers = markers;
      this.primary = primary;
      for (var i3 = 0; i3 < markers.length; ++i3) {
        markers[i3].parent = this;
      }
    };
    SharedTextMarker.prototype.clear = function() {
      if (this.explicitlyCleared) {
        return;
      }
      this.explicitlyCleared = true;
      for (var i3 = 0; i3 < this.markers.length; ++i3) {
        this.markers[i3].clear();
      }
      signalLater(this, "clear");
    };
    SharedTextMarker.prototype.find = function(side, lineObj) {
      return this.primary.find(side, lineObj);
    };
    eventMixin(SharedTextMarker);
    function markTextShared(doc, from, to, options, type) {
      options = copyObj(options);
      options.shared = false;
      var markers = [markText(doc, from, to, options, type)], primary = markers[0];
      var widget = options.widgetNode;
      linkedDocs(doc, function(doc2) {
        if (widget) {
          options.widgetNode = widget.cloneNode(true);
        }
        markers.push(markText(doc2, clipPos(doc2, from), clipPos(doc2, to), options, type));
        for (var i3 = 0; i3 < doc2.linked.length; ++i3) {
          if (doc2.linked[i3].isParent) {
            return;
          }
        }
        primary = lst(markers);
      });
      return new SharedTextMarker(markers, primary);
    }
    function findSharedMarkers(doc) {
      return doc.findMarks(Pos(doc.first, 0), doc.clipPos(Pos(doc.lastLine())), function(m2) {
        return m2.parent;
      });
    }
    function copySharedMarkers(doc, markers) {
      for (var i3 = 0; i3 < markers.length; i3++) {
        var marker = markers[i3], pos = marker.find();
        var mFrom = doc.clipPos(pos.from), mTo = doc.clipPos(pos.to);
        if (cmp(mFrom, mTo)) {
          var subMark = markText(doc, mFrom, mTo, marker.primary, marker.primary.type);
          marker.markers.push(subMark);
          subMark.parent = marker;
        }
      }
    }
    function detachSharedMarkers(markers) {
      var loop = function(i4) {
        var marker = markers[i4], linked = [marker.primary.doc];
        linkedDocs(marker.primary.doc, function(d2) {
          return linked.push(d2);
        });
        for (var j = 0; j < marker.markers.length; j++) {
          var subMarker = marker.markers[j];
          if (indexOf(linked, subMarker.doc) == -1) {
            subMarker.parent = null;
            marker.markers.splice(j--, 1);
          }
        }
      };
      for (var i3 = 0; i3 < markers.length; i3++)
        loop(i3);
    }
    var nextDocId = 0;
    var Doc = function(text, mode, firstLine, lineSep, direction) {
      if (!(this instanceof Doc)) {
        return new Doc(text, mode, firstLine, lineSep, direction);
      }
      if (firstLine == null) {
        firstLine = 0;
      }
      BranchChunk.call(this, [new LeafChunk([new Line("", null)])]);
      this.first = firstLine;
      this.scrollTop = this.scrollLeft = 0;
      this.cantEdit = false;
      this.cleanGeneration = 1;
      this.modeFrontier = this.highlightFrontier = firstLine;
      var start = Pos(firstLine, 0);
      this.sel = simpleSelection(start);
      this.history = new History(null);
      this.id = ++nextDocId;
      this.modeOption = mode;
      this.lineSep = lineSep;
      this.direction = direction == "rtl" ? "rtl" : "ltr";
      this.extend = false;
      if (typeof text == "string") {
        text = this.splitLines(text);
      }
      updateDoc(this, { from: start, to: start, text });
      setSelection(this, simpleSelection(start), sel_dontScroll);
    };
    Doc.prototype = createObj(BranchChunk.prototype, {
      constructor: Doc,
      iter: function(from, to, op) {
        if (op) {
          this.iterN(from - this.first, to - from, op);
        } else {
          this.iterN(this.first, this.first + this.size, from);
        }
      },
      insert: function(at, lines) {
        var height = 0;
        for (var i3 = 0; i3 < lines.length; ++i3) {
          height += lines[i3].height;
        }
        this.insertInner(at - this.first, lines, height);
      },
      remove: function(at, n2) {
        this.removeInner(at - this.first, n2);
      },
      getValue: function(lineSep) {
        var lines = getLines(this, this.first, this.first + this.size);
        if (lineSep === false) {
          return lines;
        }
        return lines.join(lineSep || this.lineSeparator());
      },
      setValue: docMethodOp(function(code) {
        var top = Pos(this.first, 0), last = this.first + this.size - 1;
        makeChange(this, {
          from: top,
          to: Pos(last, getLine(this, last).text.length),
          text: this.splitLines(code),
          origin: "setValue",
          full: true
        }, true);
        if (this.cm) {
          scrollToCoords(this.cm, 0, 0);
        }
        setSelection(this, simpleSelection(top), sel_dontScroll);
      }),
      replaceRange: function(code, from, to, origin) {
        from = clipPos(this, from);
        to = to ? clipPos(this, to) : from;
        replaceRange(this, code, from, to, origin);
      },
      getRange: function(from, to, lineSep) {
        var lines = getBetween(this, clipPos(this, from), clipPos(this, to));
        if (lineSep === false) {
          return lines;
        }
        if (lineSep === "") {
          return lines.join("");
        }
        return lines.join(lineSep || this.lineSeparator());
      },
      getLine: function(line) {
        var l2 = this.getLineHandle(line);
        return l2 && l2.text;
      },
      getLineHandle: function(line) {
        if (isLine(this, line)) {
          return getLine(this, line);
        }
      },
      getLineNumber: function(line) {
        return lineNo(line);
      },
      getLineHandleVisualStart: function(line) {
        if (typeof line == "number") {
          line = getLine(this, line);
        }
        return visualLine(line);
      },
      lineCount: function() {
        return this.size;
      },
      firstLine: function() {
        return this.first;
      },
      lastLine: function() {
        return this.first + this.size - 1;
      },
      clipPos: function(pos) {
        return clipPos(this, pos);
      },
      getCursor: function(start) {
        var range2 = this.sel.primary(), pos;
        if (start == null || start == "head") {
          pos = range2.head;
        } else if (start == "anchor") {
          pos = range2.anchor;
        } else if (start == "end" || start == "to" || start === false) {
          pos = range2.to();
        } else {
          pos = range2.from();
        }
        return pos;
      },
      listSelections: function() {
        return this.sel.ranges;
      },
      somethingSelected: function() {
        return this.sel.somethingSelected();
      },
      setCursor: docMethodOp(function(line, ch, options) {
        setSimpleSelection(this, clipPos(this, typeof line == "number" ? Pos(line, ch || 0) : line), null, options);
      }),
      setSelection: docMethodOp(function(anchor, head, options) {
        setSimpleSelection(this, clipPos(this, anchor), clipPos(this, head || anchor), options);
      }),
      extendSelection: docMethodOp(function(head, other, options) {
        extendSelection(this, clipPos(this, head), other && clipPos(this, other), options);
      }),
      extendSelections: docMethodOp(function(heads, options) {
        extendSelections(this, clipPosArray(this, heads), options);
      }),
      extendSelectionsBy: docMethodOp(function(f2, options) {
        var heads = map(this.sel.ranges, f2);
        extendSelections(this, clipPosArray(this, heads), options);
      }),
      setSelections: docMethodOp(function(ranges, primary, options) {
        if (!ranges.length) {
          return;
        }
        var out = [];
        for (var i3 = 0; i3 < ranges.length; i3++) {
          out[i3] = new Range(clipPos(this, ranges[i3].anchor), clipPos(this, ranges[i3].head || ranges[i3].anchor));
        }
        if (primary == null) {
          primary = Math.min(ranges.length - 1, this.sel.primIndex);
        }
        setSelection(this, normalizeSelection(this.cm, out, primary), options);
      }),
      addSelection: docMethodOp(function(anchor, head, options) {
        var ranges = this.sel.ranges.slice(0);
        ranges.push(new Range(clipPos(this, anchor), clipPos(this, head || anchor)));
        setSelection(this, normalizeSelection(this.cm, ranges, ranges.length - 1), options);
      }),
      getSelection: function(lineSep) {
        var ranges = this.sel.ranges, lines;
        for (var i3 = 0; i3 < ranges.length; i3++) {
          var sel = getBetween(this, ranges[i3].from(), ranges[i3].to());
          lines = lines ? lines.concat(sel) : sel;
        }
        if (lineSep === false) {
          return lines;
        } else {
          return lines.join(lineSep || this.lineSeparator());
        }
      },
      getSelections: function(lineSep) {
        var parts = [], ranges = this.sel.ranges;
        for (var i3 = 0; i3 < ranges.length; i3++) {
          var sel = getBetween(this, ranges[i3].from(), ranges[i3].to());
          if (lineSep !== false) {
            sel = sel.join(lineSep || this.lineSeparator());
          }
          parts[i3] = sel;
        }
        return parts;
      },
      replaceSelection: function(code, collapse, origin) {
        var dup = [];
        for (var i3 = 0; i3 < this.sel.ranges.length; i3++) {
          dup[i3] = code;
        }
        this.replaceSelections(dup, collapse, origin || "+input");
      },
      replaceSelections: docMethodOp(function(code, collapse, origin) {
        var changes = [], sel = this.sel;
        for (var i3 = 0; i3 < sel.ranges.length; i3++) {
          var range2 = sel.ranges[i3];
          changes[i3] = { from: range2.from(), to: range2.to(), text: this.splitLines(code[i3]), origin };
        }
        var newSel = collapse && collapse != "end" && computeReplacedSel(this, changes, collapse);
        for (var i$13 = changes.length - 1; i$13 >= 0; i$13--) {
          makeChange(this, changes[i$13]);
        }
        if (newSel) {
          setSelectionReplaceHistory(this, newSel);
        } else if (this.cm) {
          ensureCursorVisible(this.cm);
        }
      }),
      undo: docMethodOp(function() {
        makeChangeFromHistory(this, "undo");
      }),
      redo: docMethodOp(function() {
        makeChangeFromHistory(this, "redo");
      }),
      undoSelection: docMethodOp(function() {
        makeChangeFromHistory(this, "undo", true);
      }),
      redoSelection: docMethodOp(function() {
        makeChangeFromHistory(this, "redo", true);
      }),
      setExtending: function(val) {
        this.extend = val;
      },
      getExtending: function() {
        return this.extend;
      },
      historySize: function() {
        var hist = this.history, done = 0, undone = 0;
        for (var i3 = 0; i3 < hist.done.length; i3++) {
          if (!hist.done[i3].ranges) {
            ++done;
          }
        }
        for (var i$13 = 0; i$13 < hist.undone.length; i$13++) {
          if (!hist.undone[i$13].ranges) {
            ++undone;
          }
        }
        return { undo: done, redo: undone };
      },
      clearHistory: function() {
        var this$1$1 = this;
        this.history = new History(this.history);
        linkedDocs(this, function(doc) {
          return doc.history = this$1$1.history;
        }, true);
      },
      markClean: function() {
        this.cleanGeneration = this.changeGeneration(true);
      },
      changeGeneration: function(forceSplit) {
        if (forceSplit) {
          this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null;
        }
        return this.history.generation;
      },
      isClean: function(gen) {
        return this.history.generation == (gen || this.cleanGeneration);
      },
      getHistory: function() {
        return {
          done: copyHistoryArray(this.history.done),
          undone: copyHistoryArray(this.history.undone)
        };
      },
      setHistory: function(histData) {
        var hist = this.history = new History(this.history);
        hist.done = copyHistoryArray(histData.done.slice(0), null, true);
        hist.undone = copyHistoryArray(histData.undone.slice(0), null, true);
      },
      setGutterMarker: docMethodOp(function(line, gutterID, value) {
        return changeLine(this, line, "gutter", function(line2) {
          var markers = line2.gutterMarkers || (line2.gutterMarkers = {});
          markers[gutterID] = value;
          if (!value && isEmpty(markers)) {
            line2.gutterMarkers = null;
          }
          return true;
        });
      }),
      clearGutter: docMethodOp(function(gutterID) {
        var this$1$1 = this;
        this.iter(function(line) {
          if (line.gutterMarkers && line.gutterMarkers[gutterID]) {
            changeLine(this$1$1, line, "gutter", function() {
              line.gutterMarkers[gutterID] = null;
              if (isEmpty(line.gutterMarkers)) {
                line.gutterMarkers = null;
              }
              return true;
            });
          }
        });
      }),
      lineInfo: function(line) {
        var n2;
        if (typeof line == "number") {
          if (!isLine(this, line)) {
            return null;
          }
          n2 = line;
          line = getLine(this, line);
          if (!line) {
            return null;
          }
        } else {
          n2 = lineNo(line);
          if (n2 == null) {
            return null;
          }
        }
        return {
          line: n2,
          handle: line,
          text: line.text,
          gutterMarkers: line.gutterMarkers,
          textClass: line.textClass,
          bgClass: line.bgClass,
          wrapClass: line.wrapClass,
          widgets: line.widgets
        };
      },
      addLineClass: docMethodOp(function(handle, where, cls) {
        return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function(line) {
          var prop2 = where == "text" ? "textClass" : where == "background" ? "bgClass" : where == "gutter" ? "gutterClass" : "wrapClass";
          if (!line[prop2]) {
            line[prop2] = cls;
          } else if (classTest(cls).test(line[prop2])) {
            return false;
          } else {
            line[prop2] += " " + cls;
          }
          return true;
        });
      }),
      removeLineClass: docMethodOp(function(handle, where, cls) {
        return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function(line) {
          var prop2 = where == "text" ? "textClass" : where == "background" ? "bgClass" : where == "gutter" ? "gutterClass" : "wrapClass";
          var cur = line[prop2];
          if (!cur) {
            return false;
          } else if (cls == null) {
            line[prop2] = null;
          } else {
            var found = cur.match(classTest(cls));
            if (!found) {
              return false;
            }
            var end = found.index + found[0].length;
            line[prop2] = cur.slice(0, found.index) + (!found.index || end == cur.length ? "" : " ") + cur.slice(end) || null;
          }
          return true;
        });
      }),
      addLineWidget: docMethodOp(function(handle, node, options) {
        return addLineWidget(this, handle, node, options);
      }),
      removeLineWidget: function(widget) {
        widget.clear();
      },
      markText: function(from, to, options) {
        return markText(this, clipPos(this, from), clipPos(this, to), options, options && options.type || "range");
      },
      setBookmark: function(pos, options) {
        var realOpts = {
          replacedWith: options && (options.nodeType == null ? options.widget : options),
          insertLeft: options && options.insertLeft,
          clearWhenEmpty: false,
          shared: options && options.shared,
          handleMouseEvents: options && options.handleMouseEvents
        };
        pos = clipPos(this, pos);
        return markText(this, pos, pos, realOpts, "bookmark");
      },
      findMarksAt: function(pos) {
        pos = clipPos(this, pos);
        var markers = [], spans = getLine(this, pos.line).markedSpans;
        if (spans) {
          for (var i3 = 0; i3 < spans.length; ++i3) {
            var span = spans[i3];
            if ((span.from == null || span.from <= pos.ch) && (span.to == null || span.to >= pos.ch)) {
              markers.push(span.marker.parent || span.marker);
            }
          }
        }
        return markers;
      },
      findMarks: function(from, to, filter) {
        from = clipPos(this, from);
        to = clipPos(this, to);
        var found = [], lineNo2 = from.line;
        this.iter(from.line, to.line + 1, function(line) {
          var spans = line.markedSpans;
          if (spans) {
            for (var i3 = 0; i3 < spans.length; i3++) {
              var span = spans[i3];
              if (!(span.to != null && lineNo2 == from.line && from.ch >= span.to || span.from == null && lineNo2 != from.line || span.from != null && lineNo2 == to.line && span.from >= to.ch) && (!filter || filter(span.marker))) {
                found.push(span.marker.parent || span.marker);
              }
            }
          }
          ++lineNo2;
        });
        return found;
      },
      getAllMarks: function() {
        var markers = [];
        this.iter(function(line) {
          var sps = line.markedSpans;
          if (sps) {
            for (var i3 = 0; i3 < sps.length; ++i3) {
              if (sps[i3].from != null) {
                markers.push(sps[i3].marker);
              }
            }
          }
        });
        return markers;
      },
      posFromIndex: function(off2) {
        var ch, lineNo2 = this.first, sepSize = this.lineSeparator().length;
        this.iter(function(line) {
          var sz = line.text.length + sepSize;
          if (sz > off2) {
            ch = off2;
            return true;
          }
          off2 -= sz;
          ++lineNo2;
        });
        return clipPos(this, Pos(lineNo2, ch));
      },
      indexFromPos: function(coords) {
        coords = clipPos(this, coords);
        var index = coords.ch;
        if (coords.line < this.first || coords.ch < 0) {
          return 0;
        }
        var sepSize = this.lineSeparator().length;
        this.iter(this.first, coords.line, function(line) {
          index += line.text.length + sepSize;
        });
        return index;
      },
      copy: function(copyHistory) {
        var doc = new Doc(getLines(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);
        doc.scrollTop = this.scrollTop;
        doc.scrollLeft = this.scrollLeft;
        doc.sel = this.sel;
        doc.extend = false;
        if (copyHistory) {
          doc.history.undoDepth = this.history.undoDepth;
          doc.setHistory(this.getHistory());
        }
        return doc;
      },
      linkedDoc: function(options) {
        if (!options) {
          options = {};
        }
        var from = this.first, to = this.first + this.size;
        if (options.from != null && options.from > from) {
          from = options.from;
        }
        if (options.to != null && options.to < to) {
          to = options.to;
        }
        var copy = new Doc(getLines(this, from, to), options.mode || this.modeOption, from, this.lineSep, this.direction);
        if (options.sharedHist) {
          copy.history = this.history;
        }
        (this.linked || (this.linked = [])).push({ doc: copy, sharedHist: options.sharedHist });
        copy.linked = [{ doc: this, isParent: true, sharedHist: options.sharedHist }];
        copySharedMarkers(copy, findSharedMarkers(this));
        return copy;
      },
      unlinkDoc: function(other) {
        if (other instanceof CodeMirror2) {
          other = other.doc;
        }
        if (this.linked) {
          for (var i3 = 0; i3 < this.linked.length; ++i3) {
            var link = this.linked[i3];
            if (link.doc != other) {
              continue;
            }
            this.linked.splice(i3, 1);
            other.unlinkDoc(this);
            detachSharedMarkers(findSharedMarkers(this));
            break;
          }
        }
        if (other.history == this.history) {
          var splitIds = [other.id];
          linkedDocs(other, function(doc) {
            return splitIds.push(doc.id);
          }, true);
          other.history = new History(null);
          other.history.done = copyHistoryArray(this.history.done, splitIds);
          other.history.undone = copyHistoryArray(this.history.undone, splitIds);
        }
      },
      iterLinkedDocs: function(f2) {
        linkedDocs(this, f2);
      },
      getMode: function() {
        return this.mode;
      },
      getEditor: function() {
        return this.cm;
      },
      splitLines: function(str) {
        if (this.lineSep) {
          return str.split(this.lineSep);
        }
        return splitLinesAuto(str);
      },
      lineSeparator: function() {
        return this.lineSep || "\n";
      },
      setDirection: docMethodOp(function(dir) {
        if (dir != "rtl") {
          dir = "ltr";
        }
        if (dir == this.direction) {
          return;
        }
        this.direction = dir;
        this.iter(function(line) {
          return line.order = null;
        });
        if (this.cm) {
          directionChanged(this.cm);
        }
      })
    });
    Doc.prototype.eachLine = Doc.prototype.iter;
    var lastDrop = 0;
    function onDrop(e2) {
      var cm = this;
      clearDragCursor(cm);
      if (signalDOMEvent(cm, e2) || eventInWidget(cm.display, e2)) {
        return;
      }
      e_preventDefault(e2);
      if (ie) {
        lastDrop = +new Date();
      }
      var pos = posFromMouse(cm, e2, true), files = e2.dataTransfer.files;
      if (!pos || cm.isReadOnly()) {
        return;
      }
      if (files && files.length && window.FileReader && window.File) {
        var n2 = files.length, text = Array(n2), read = 0;
        var markAsReadAndPasteIfAllFilesAreRead = function() {
          if (++read == n2) {
            operation(cm, function() {
              pos = clipPos(cm.doc, pos);
              var change = {
                from: pos,
                to: pos,
                text: cm.doc.splitLines(text.filter(function(t2) {
                  return t2 != null;
                }).join(cm.doc.lineSeparator())),
                origin: "paste"
              };
              makeChange(cm.doc, change);
              setSelectionReplaceHistory(cm.doc, simpleSelection(clipPos(cm.doc, pos), clipPos(cm.doc, changeEnd(change))));
            })();
          }
        };
        var readTextFromFile = function(file, i4) {
          if (cm.options.allowDropFileTypes && indexOf(cm.options.allowDropFileTypes, file.type) == -1) {
            markAsReadAndPasteIfAllFilesAreRead();
            return;
          }
          var reader = new FileReader();
          reader.onerror = function() {
            return markAsReadAndPasteIfAllFilesAreRead();
          };
          reader.onload = function() {
            var content = reader.result;
            if (/[\x00-\x08\x0e-\x1f]{2}/.test(content)) {
              markAsReadAndPasteIfAllFilesAreRead();
              return;
            }
            text[i4] = content;
            markAsReadAndPasteIfAllFilesAreRead();
          };
          reader.readAsText(file);
        };
        for (var i3 = 0; i3 < files.length; i3++) {
          readTextFromFile(files[i3], i3);
        }
      } else {
        if (cm.state.draggingText && cm.doc.sel.contains(pos) > -1) {
          cm.state.draggingText(e2);
          setTimeout(function() {
            return cm.display.input.focus();
          }, 20);
          return;
        }
        try {
          var text$1 = e2.dataTransfer.getData("Text");
          if (text$1) {
            var selected;
            if (cm.state.draggingText && !cm.state.draggingText.copy) {
              selected = cm.listSelections();
            }
            setSelectionNoUndo(cm.doc, simpleSelection(pos, pos));
            if (selected) {
              for (var i$13 = 0; i$13 < selected.length; ++i$13) {
                replaceRange(cm.doc, "", selected[i$13].anchor, selected[i$13].head, "drag");
              }
            }
            cm.replaceSelection(text$1, "around", "paste");
            cm.display.input.focus();
          }
        } catch (e$12) {
        }
      }
    }
    function onDragStart(cm, e2) {
      if (ie && (!cm.state.draggingText || +new Date() - lastDrop < 100)) {
        e_stop(e2);
        return;
      }
      if (signalDOMEvent(cm, e2) || eventInWidget(cm.display, e2)) {
        return;
      }
      e2.dataTransfer.setData("Text", cm.getSelection());
      e2.dataTransfer.effectAllowed = "copyMove";
      if (e2.dataTransfer.setDragImage && !safari) {
        var img = elt("img", null, null, "position: fixed; left: 0; top: 0;");
        img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        if (presto) {
          img.width = img.height = 1;
          cm.display.wrapper.appendChild(img);
          img._top = img.offsetTop;
        }
        e2.dataTransfer.setDragImage(img, 0, 0);
        if (presto) {
          img.parentNode.removeChild(img);
        }
      }
    }
    function onDragOver(cm, e2) {
      var pos = posFromMouse(cm, e2);
      if (!pos) {
        return;
      }
      var frag = document.createDocumentFragment();
      drawSelectionCursor(cm, pos, frag);
      if (!cm.display.dragCursor) {
        cm.display.dragCursor = elt("div", null, "CodeMirror-cursors CodeMirror-dragcursors");
        cm.display.lineSpace.insertBefore(cm.display.dragCursor, cm.display.cursorDiv);
      }
      removeChildrenAndAdd(cm.display.dragCursor, frag);
    }
    function clearDragCursor(cm) {
      if (cm.display.dragCursor) {
        cm.display.lineSpace.removeChild(cm.display.dragCursor);
        cm.display.dragCursor = null;
      }
    }
    function forEachCodeMirror(f2) {
      if (!document.getElementsByClassName) {
        return;
      }
      var byClass = document.getElementsByClassName("CodeMirror"), editors = [];
      for (var i3 = 0; i3 < byClass.length; i3++) {
        var cm = byClass[i3].CodeMirror;
        if (cm) {
          editors.push(cm);
        }
      }
      if (editors.length) {
        editors[0].operation(function() {
          for (var i4 = 0; i4 < editors.length; i4++) {
            f2(editors[i4]);
          }
        });
      }
    }
    var globalsRegistered = false;
    function ensureGlobalHandlers() {
      if (globalsRegistered) {
        return;
      }
      registerGlobalHandlers();
      globalsRegistered = true;
    }
    function registerGlobalHandlers() {
      var resizeTimer;
      on(window, "resize", function() {
        if (resizeTimer == null) {
          resizeTimer = setTimeout(function() {
            resizeTimer = null;
            forEachCodeMirror(onResize);
          }, 100);
        }
      });
      on(window, "blur", function() {
        return forEachCodeMirror(onBlur);
      });
    }
    function onResize(cm) {
      var d2 = cm.display;
      d2.cachedCharWidth = d2.cachedTextHeight = d2.cachedPaddingH = null;
      d2.scrollbarsClipped = false;
      cm.setSize();
    }
    var keyNames = {
      3: "Pause",
      8: "Backspace",
      9: "Tab",
      13: "Enter",
      16: "Shift",
      17: "Ctrl",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Esc",
      32: "Space",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "Left",
      38: "Up",
      39: "Right",
      40: "Down",
      44: "PrintScrn",
      45: "Insert",
      46: "Delete",
      59: ";",
      61: "=",
      91: "Mod",
      92: "Mod",
      93: "Mod",
      106: "*",
      107: "=",
      109: "-",
      110: ".",
      111: "/",
      145: "ScrollLock",
      173: "-",
      186: ";",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'",
      224: "Mod",
      63232: "Up",
      63233: "Down",
      63234: "Left",
      63235: "Right",
      63272: "Delete",
      63273: "Home",
      63275: "End",
      63276: "PageUp",
      63277: "PageDown",
      63302: "Insert"
    };
    for (var i2 = 0; i2 < 10; i2++) {
      keyNames[i2 + 48] = keyNames[i2 + 96] = String(i2);
    }
    for (var i$12 = 65; i$12 <= 90; i$12++) {
      keyNames[i$12] = String.fromCharCode(i$12);
    }
    for (var i$22 = 1; i$22 <= 12; i$22++) {
      keyNames[i$22 + 111] = keyNames[i$22 + 63235] = "F" + i$22;
    }
    var keyMap = {};
    keyMap.basic = {
      "Left": "goCharLeft",
      "Right": "goCharRight",
      "Up": "goLineUp",
      "Down": "goLineDown",
      "End": "goLineEnd",
      "Home": "goLineStartSmart",
      "PageUp": "goPageUp",
      "PageDown": "goPageDown",
      "Delete": "delCharAfter",
      "Backspace": "delCharBefore",
      "Shift-Backspace": "delCharBefore",
      "Tab": "defaultTab",
      "Shift-Tab": "indentAuto",
      "Enter": "newlineAndIndent",
      "Insert": "toggleOverwrite",
      "Esc": "singleSelection"
    };
    keyMap.pcDefault = {
      "Ctrl-A": "selectAll",
      "Ctrl-D": "deleteLine",
      "Ctrl-Z": "undo",
      "Shift-Ctrl-Z": "redo",
      "Ctrl-Y": "redo",
      "Ctrl-Home": "goDocStart",
      "Ctrl-End": "goDocEnd",
      "Ctrl-Up": "goLineUp",
      "Ctrl-Down": "goLineDown",
      "Ctrl-Left": "goGroupLeft",
      "Ctrl-Right": "goGroupRight",
      "Alt-Left": "goLineStart",
      "Alt-Right": "goLineEnd",
      "Ctrl-Backspace": "delGroupBefore",
      "Ctrl-Delete": "delGroupAfter",
      "Ctrl-S": "save",
      "Ctrl-F": "find",
      "Ctrl-G": "findNext",
      "Shift-Ctrl-G": "findPrev",
      "Shift-Ctrl-F": "replace",
      "Shift-Ctrl-R": "replaceAll",
      "Ctrl-[": "indentLess",
      "Ctrl-]": "indentMore",
      "Ctrl-U": "undoSelection",
      "Shift-Ctrl-U": "redoSelection",
      "Alt-U": "redoSelection",
      "fallthrough": "basic"
    };
    keyMap.emacsy = {
      "Ctrl-F": "goCharRight",
      "Ctrl-B": "goCharLeft",
      "Ctrl-P": "goLineUp",
      "Ctrl-N": "goLineDown",
      "Ctrl-A": "goLineStart",
      "Ctrl-E": "goLineEnd",
      "Ctrl-V": "goPageDown",
      "Shift-Ctrl-V": "goPageUp",
      "Ctrl-D": "delCharAfter",
      "Ctrl-H": "delCharBefore",
      "Alt-Backspace": "delWordBefore",
      "Ctrl-K": "killLine",
      "Ctrl-T": "transposeChars",
      "Ctrl-O": "openLine"
    };
    keyMap.macDefault = {
      "Cmd-A": "selectAll",
      "Cmd-D": "deleteLine",
      "Cmd-Z": "undo",
      "Shift-Cmd-Z": "redo",
      "Cmd-Y": "redo",
      "Cmd-Home": "goDocStart",
      "Cmd-Up": "goDocStart",
      "Cmd-End": "goDocEnd",
      "Cmd-Down": "goDocEnd",
      "Alt-Left": "goGroupLeft",
      "Alt-Right": "goGroupRight",
      "Cmd-Left": "goLineLeft",
      "Cmd-Right": "goLineRight",
      "Alt-Backspace": "delGroupBefore",
      "Ctrl-Alt-Backspace": "delGroupAfter",
      "Alt-Delete": "delGroupAfter",
      "Cmd-S": "save",
      "Cmd-F": "find",
      "Cmd-G": "findNext",
      "Shift-Cmd-G": "findPrev",
      "Cmd-Alt-F": "replace",
      "Shift-Cmd-Alt-F": "replaceAll",
      "Cmd-[": "indentLess",
      "Cmd-]": "indentMore",
      "Cmd-Backspace": "delWrappedLineLeft",
      "Cmd-Delete": "delWrappedLineRight",
      "Cmd-U": "undoSelection",
      "Shift-Cmd-U": "redoSelection",
      "Ctrl-Up": "goDocStart",
      "Ctrl-Down": "goDocEnd",
      "fallthrough": ["basic", "emacsy"]
    };
    keyMap["default"] = mac ? keyMap.macDefault : keyMap.pcDefault;
    function normalizeKeyName(name) {
      var parts = name.split(/-(?!$)/);
      name = parts[parts.length - 1];
      var alt, ctrl, shift, cmd;
      for (var i3 = 0; i3 < parts.length - 1; i3++) {
        var mod = parts[i3];
        if (/^(cmd|meta|m)$/i.test(mod)) {
          cmd = true;
        } else if (/^a(lt)?$/i.test(mod)) {
          alt = true;
        } else if (/^(c|ctrl|control)$/i.test(mod)) {
          ctrl = true;
        } else if (/^s(hift)?$/i.test(mod)) {
          shift = true;
        } else {
          throw new Error("Unrecognized modifier name: " + mod);
        }
      }
      if (alt) {
        name = "Alt-" + name;
      }
      if (ctrl) {
        name = "Ctrl-" + name;
      }
      if (cmd) {
        name = "Cmd-" + name;
      }
      if (shift) {
        name = "Shift-" + name;
      }
      return name;
    }
    function normalizeKeyMap(keymap) {
      var copy = {};
      for (var keyname in keymap) {
        if (keymap.hasOwnProperty(keyname)) {
          var value = keymap[keyname];
          if (/^(name|fallthrough|(de|at)tach)$/.test(keyname)) {
            continue;
          }
          if (value == "...") {
            delete keymap[keyname];
            continue;
          }
          var keys = map(keyname.split(" "), normalizeKeyName);
          for (var i3 = 0; i3 < keys.length; i3++) {
            var val = void 0, name = void 0;
            if (i3 == keys.length - 1) {
              name = keys.join(" ");
              val = value;
            } else {
              name = keys.slice(0, i3 + 1).join(" ");
              val = "...";
            }
            var prev = copy[name];
            if (!prev) {
              copy[name] = val;
            } else if (prev != val) {
              throw new Error("Inconsistent bindings for " + name);
            }
          }
          delete keymap[keyname];
        }
      }
      for (var prop2 in copy) {
        keymap[prop2] = copy[prop2];
      }
      return keymap;
    }
    function lookupKey(key, map2, handle, context) {
      map2 = getKeyMap(map2);
      var found = map2.call ? map2.call(key, context) : map2[key];
      if (found === false) {
        return "nothing";
      }
      if (found === "...") {
        return "multi";
      }
      if (found != null && handle(found)) {
        return "handled";
      }
      if (map2.fallthrough) {
        if (Object.prototype.toString.call(map2.fallthrough) != "[object Array]") {
          return lookupKey(key, map2.fallthrough, handle, context);
        }
        for (var i3 = 0; i3 < map2.fallthrough.length; i3++) {
          var result = lookupKey(key, map2.fallthrough[i3], handle, context);
          if (result) {
            return result;
          }
        }
      }
    }
    function isModifierKey(value) {
      var name = typeof value == "string" ? value : keyNames[value.keyCode];
      return name == "Ctrl" || name == "Alt" || name == "Shift" || name == "Mod";
    }
    function addModifierNames(name, event, noShift) {
      var base = name;
      if (event.altKey && base != "Alt") {
        name = "Alt-" + name;
      }
      if ((flipCtrlCmd ? event.metaKey : event.ctrlKey) && base != "Ctrl") {
        name = "Ctrl-" + name;
      }
      if ((flipCtrlCmd ? event.ctrlKey : event.metaKey) && base != "Mod") {
        name = "Cmd-" + name;
      }
      if (!noShift && event.shiftKey && base != "Shift") {
        name = "Shift-" + name;
      }
      return name;
    }
    function keyName(event, noShift) {
      if (presto && event.keyCode == 34 && event["char"]) {
        return false;
      }
      var name = keyNames[event.keyCode];
      if (name == null || event.altGraphKey) {
        return false;
      }
      if (event.keyCode == 3 && event.code) {
        name = event.code;
      }
      return addModifierNames(name, event, noShift);
    }
    function getKeyMap(val) {
      return typeof val == "string" ? keyMap[val] : val;
    }
    function deleteNearSelection(cm, compute) {
      var ranges = cm.doc.sel.ranges, kill = [];
      for (var i3 = 0; i3 < ranges.length; i3++) {
        var toKill = compute(ranges[i3]);
        while (kill.length && cmp(toKill.from, lst(kill).to) <= 0) {
          var replaced = kill.pop();
          if (cmp(replaced.from, toKill.from) < 0) {
            toKill.from = replaced.from;
            break;
          }
        }
        kill.push(toKill);
      }
      runInOp(cm, function() {
        for (var i4 = kill.length - 1; i4 >= 0; i4--) {
          replaceRange(cm.doc, "", kill[i4].from, kill[i4].to, "+delete");
        }
        ensureCursorVisible(cm);
      });
    }
    function moveCharLogically(line, ch, dir) {
      var target = skipExtendingChars(line.text, ch + dir, dir);
      return target < 0 || target > line.text.length ? null : target;
    }
    function moveLogically(line, start, dir) {
      var ch = moveCharLogically(line, start.ch, dir);
      return ch == null ? null : new Pos(start.line, ch, dir < 0 ? "after" : "before");
    }
    function endOfLine(visually, cm, lineObj, lineNo2, dir) {
      if (visually) {
        if (cm.doc.direction == "rtl") {
          dir = -dir;
        }
        var order = getOrder(lineObj, cm.doc.direction);
        if (order) {
          var part = dir < 0 ? lst(order) : order[0];
          var moveInStorageOrder = dir < 0 == (part.level == 1);
          var sticky = moveInStorageOrder ? "after" : "before";
          var ch;
          if (part.level > 0 || cm.doc.direction == "rtl") {
            var prep = prepareMeasureForLine(cm, lineObj);
            ch = dir < 0 ? lineObj.text.length - 1 : 0;
            var targetTop = measureCharPrepared(cm, prep, ch).top;
            ch = findFirst(function(ch2) {
              return measureCharPrepared(cm, prep, ch2).top == targetTop;
            }, dir < 0 == (part.level == 1) ? part.from : part.to - 1, ch);
            if (sticky == "before") {
              ch = moveCharLogically(lineObj, ch, 1);
            }
          } else {
            ch = dir < 0 ? part.to : part.from;
          }
          return new Pos(lineNo2, ch, sticky);
        }
      }
      return new Pos(lineNo2, dir < 0 ? lineObj.text.length : 0, dir < 0 ? "before" : "after");
    }
    function moveVisually(cm, line, start, dir) {
      var bidi = getOrder(line, cm.doc.direction);
      if (!bidi) {
        return moveLogically(line, start, dir);
      }
      if (start.ch >= line.text.length) {
        start.ch = line.text.length;
        start.sticky = "before";
      } else if (start.ch <= 0) {
        start.ch = 0;
        start.sticky = "after";
      }
      var partPos = getBidiPartAt(bidi, start.ch, start.sticky), part = bidi[partPos];
      if (cm.doc.direction == "ltr" && part.level % 2 == 0 && (dir > 0 ? part.to > start.ch : part.from < start.ch)) {
        return moveLogically(line, start, dir);
      }
      var mv = function(pos, dir2) {
        return moveCharLogically(line, pos instanceof Pos ? pos.ch : pos, dir2);
      };
      var prep;
      var getWrappedLineExtent = function(ch2) {
        if (!cm.options.lineWrapping) {
          return { begin: 0, end: line.text.length };
        }
        prep = prep || prepareMeasureForLine(cm, line);
        return wrappedLineExtentChar(cm, line, prep, ch2);
      };
      var wrappedLineExtent2 = getWrappedLineExtent(start.sticky == "before" ? mv(start, -1) : start.ch);
      if (cm.doc.direction == "rtl" || part.level == 1) {
        var moveInStorageOrder = part.level == 1 == dir < 0;
        var ch = mv(start, moveInStorageOrder ? 1 : -1);
        if (ch != null && (!moveInStorageOrder ? ch >= part.from && ch >= wrappedLineExtent2.begin : ch <= part.to && ch <= wrappedLineExtent2.end)) {
          var sticky = moveInStorageOrder ? "before" : "after";
          return new Pos(start.line, ch, sticky);
        }
      }
      var searchInVisualLine = function(partPos2, dir2, wrappedLineExtent3) {
        var getRes = function(ch3, moveInStorageOrder3) {
          return moveInStorageOrder3 ? new Pos(start.line, mv(ch3, 1), "before") : new Pos(start.line, ch3, "after");
        };
        for (; partPos2 >= 0 && partPos2 < bidi.length; partPos2 += dir2) {
          var part2 = bidi[partPos2];
          var moveInStorageOrder2 = dir2 > 0 == (part2.level != 1);
          var ch2 = moveInStorageOrder2 ? wrappedLineExtent3.begin : mv(wrappedLineExtent3.end, -1);
          if (part2.from <= ch2 && ch2 < part2.to) {
            return getRes(ch2, moveInStorageOrder2);
          }
          ch2 = moveInStorageOrder2 ? part2.from : mv(part2.to, -1);
          if (wrappedLineExtent3.begin <= ch2 && ch2 < wrappedLineExtent3.end) {
            return getRes(ch2, moveInStorageOrder2);
          }
        }
      };
      var res = searchInVisualLine(partPos + dir, dir, wrappedLineExtent2);
      if (res) {
        return res;
      }
      var nextCh = dir > 0 ? wrappedLineExtent2.end : mv(wrappedLineExtent2.begin, -1);
      if (nextCh != null && !(dir > 0 && nextCh == line.text.length)) {
        res = searchInVisualLine(dir > 0 ? 0 : bidi.length - 1, dir, getWrappedLineExtent(nextCh));
        if (res) {
          return res;
        }
      }
      return null;
    }
    var commands = {
      selectAll,
      singleSelection: function(cm) {
        return cm.setSelection(cm.getCursor("anchor"), cm.getCursor("head"), sel_dontScroll);
      },
      killLine: function(cm) {
        return deleteNearSelection(cm, function(range2) {
          if (range2.empty()) {
            var len = getLine(cm.doc, range2.head.line).text.length;
            if (range2.head.ch == len && range2.head.line < cm.lastLine()) {
              return { from: range2.head, to: Pos(range2.head.line + 1, 0) };
            } else {
              return { from: range2.head, to: Pos(range2.head.line, len) };
            }
          } else {
            return { from: range2.from(), to: range2.to() };
          }
        });
      },
      deleteLine: function(cm) {
        return deleteNearSelection(cm, function(range2) {
          return {
            from: Pos(range2.from().line, 0),
            to: clipPos(cm.doc, Pos(range2.to().line + 1, 0))
          };
        });
      },
      delLineLeft: function(cm) {
        return deleteNearSelection(cm, function(range2) {
          return {
            from: Pos(range2.from().line, 0),
            to: range2.from()
          };
        });
      },
      delWrappedLineLeft: function(cm) {
        return deleteNearSelection(cm, function(range2) {
          var top = cm.charCoords(range2.head, "div").top + 5;
          var leftPos = cm.coordsChar({ left: 0, top }, "div");
          return { from: leftPos, to: range2.from() };
        });
      },
      delWrappedLineRight: function(cm) {
        return deleteNearSelection(cm, function(range2) {
          var top = cm.charCoords(range2.head, "div").top + 5;
          var rightPos = cm.coordsChar({ left: cm.display.lineDiv.offsetWidth + 100, top }, "div");
          return { from: range2.from(), to: rightPos };
        });
      },
      undo: function(cm) {
        return cm.undo();
      },
      redo: function(cm) {
        return cm.redo();
      },
      undoSelection: function(cm) {
        return cm.undoSelection();
      },
      redoSelection: function(cm) {
        return cm.redoSelection();
      },
      goDocStart: function(cm) {
        return cm.extendSelection(Pos(cm.firstLine(), 0));
      },
      goDocEnd: function(cm) {
        return cm.extendSelection(Pos(cm.lastLine()));
      },
      goLineStart: function(cm) {
        return cm.extendSelectionsBy(function(range2) {
          return lineStart(cm, range2.head.line);
        }, { origin: "+move", bias: 1 });
      },
      goLineStartSmart: function(cm) {
        return cm.extendSelectionsBy(function(range2) {
          return lineStartSmart(cm, range2.head);
        }, { origin: "+move", bias: 1 });
      },
      goLineEnd: function(cm) {
        return cm.extendSelectionsBy(function(range2) {
          return lineEnd(cm, range2.head.line);
        }, { origin: "+move", bias: -1 });
      },
      goLineRight: function(cm) {
        return cm.extendSelectionsBy(function(range2) {
          var top = cm.cursorCoords(range2.head, "div").top + 5;
          return cm.coordsChar({ left: cm.display.lineDiv.offsetWidth + 100, top }, "div");
        }, sel_move);
      },
      goLineLeft: function(cm) {
        return cm.extendSelectionsBy(function(range2) {
          var top = cm.cursorCoords(range2.head, "div").top + 5;
          return cm.coordsChar({ left: 0, top }, "div");
        }, sel_move);
      },
      goLineLeftSmart: function(cm) {
        return cm.extendSelectionsBy(function(range2) {
          var top = cm.cursorCoords(range2.head, "div").top + 5;
          var pos = cm.coordsChar({ left: 0, top }, "div");
          if (pos.ch < cm.getLine(pos.line).search(/\S/)) {
            return lineStartSmart(cm, range2.head);
          }
          return pos;
        }, sel_move);
      },
      goLineUp: function(cm) {
        return cm.moveV(-1, "line");
      },
      goLineDown: function(cm) {
        return cm.moveV(1, "line");
      },
      goPageUp: function(cm) {
        return cm.moveV(-1, "page");
      },
      goPageDown: function(cm) {
        return cm.moveV(1, "page");
      },
      goCharLeft: function(cm) {
        return cm.moveH(-1, "char");
      },
      goCharRight: function(cm) {
        return cm.moveH(1, "char");
      },
      goColumnLeft: function(cm) {
        return cm.moveH(-1, "column");
      },
      goColumnRight: function(cm) {
        return cm.moveH(1, "column");
      },
      goWordLeft: function(cm) {
        return cm.moveH(-1, "word");
      },
      goGroupRight: function(cm) {
        return cm.moveH(1, "group");
      },
      goGroupLeft: function(cm) {
        return cm.moveH(-1, "group");
      },
      goWordRight: function(cm) {
        return cm.moveH(1, "word");
      },
      delCharBefore: function(cm) {
        return cm.deleteH(-1, "codepoint");
      },
      delCharAfter: function(cm) {
        return cm.deleteH(1, "char");
      },
      delWordBefore: function(cm) {
        return cm.deleteH(-1, "word");
      },
      delWordAfter: function(cm) {
        return cm.deleteH(1, "word");
      },
      delGroupBefore: function(cm) {
        return cm.deleteH(-1, "group");
      },
      delGroupAfter: function(cm) {
        return cm.deleteH(1, "group");
      },
      indentAuto: function(cm) {
        return cm.indentSelection("smart");
      },
      indentMore: function(cm) {
        return cm.indentSelection("add");
      },
      indentLess: function(cm) {
        return cm.indentSelection("subtract");
      },
      insertTab: function(cm) {
        return cm.replaceSelection("	");
      },
      insertSoftTab: function(cm) {
        var spaces = [], ranges = cm.listSelections(), tabSize = cm.options.tabSize;
        for (var i3 = 0; i3 < ranges.length; i3++) {
          var pos = ranges[i3].from();
          var col = countColumn(cm.getLine(pos.line), pos.ch, tabSize);
          spaces.push(spaceStr(tabSize - col % tabSize));
        }
        cm.replaceSelections(spaces);
      },
      defaultTab: function(cm) {
        if (cm.somethingSelected()) {
          cm.indentSelection("add");
        } else {
          cm.execCommand("insertTab");
        }
      },
      transposeChars: function(cm) {
        return runInOp(cm, function() {
          var ranges = cm.listSelections(), newSel = [];
          for (var i3 = 0; i3 < ranges.length; i3++) {
            if (!ranges[i3].empty()) {
              continue;
            }
            var cur = ranges[i3].head, line = getLine(cm.doc, cur.line).text;
            if (line) {
              if (cur.ch == line.length) {
                cur = new Pos(cur.line, cur.ch - 1);
              }
              if (cur.ch > 0) {
                cur = new Pos(cur.line, cur.ch + 1);
                cm.replaceRange(line.charAt(cur.ch - 1) + line.charAt(cur.ch - 2), Pos(cur.line, cur.ch - 2), cur, "+transpose");
              } else if (cur.line > cm.doc.first) {
                var prev = getLine(cm.doc, cur.line - 1).text;
                if (prev) {
                  cur = new Pos(cur.line, 1);
                  cm.replaceRange(line.charAt(0) + cm.doc.lineSeparator() + prev.charAt(prev.length - 1), Pos(cur.line - 1, prev.length - 1), cur, "+transpose");
                }
              }
            }
            newSel.push(new Range(cur, cur));
          }
          cm.setSelections(newSel);
        });
      },
      newlineAndIndent: function(cm) {
        return runInOp(cm, function() {
          var sels = cm.listSelections();
          for (var i3 = sels.length - 1; i3 >= 0; i3--) {
            cm.replaceRange(cm.doc.lineSeparator(), sels[i3].anchor, sels[i3].head, "+input");
          }
          sels = cm.listSelections();
          for (var i$13 = 0; i$13 < sels.length; i$13++) {
            cm.indentLine(sels[i$13].from().line, null, true);
          }
          ensureCursorVisible(cm);
        });
      },
      openLine: function(cm) {
        return cm.replaceSelection("\n", "start");
      },
      toggleOverwrite: function(cm) {
        return cm.toggleOverwrite();
      }
    };
    function lineStart(cm, lineN) {
      var line = getLine(cm.doc, lineN);
      var visual = visualLine(line);
      if (visual != line) {
        lineN = lineNo(visual);
      }
      return endOfLine(true, cm, visual, lineN, 1);
    }
    function lineEnd(cm, lineN) {
      var line = getLine(cm.doc, lineN);
      var visual = visualLineEnd(line);
      if (visual != line) {
        lineN = lineNo(visual);
      }
      return endOfLine(true, cm, line, lineN, -1);
    }
    function lineStartSmart(cm, pos) {
      var start = lineStart(cm, pos.line);
      var line = getLine(cm.doc, start.line);
      var order = getOrder(line, cm.doc.direction);
      if (!order || order[0].level == 0) {
        var firstNonWS = Math.max(start.ch, line.text.search(/\S/));
        var inWS = pos.line == start.line && pos.ch <= firstNonWS && pos.ch;
        return Pos(start.line, inWS ? 0 : firstNonWS, start.sticky);
      }
      return start;
    }
    function doHandleBinding(cm, bound, dropShift) {
      if (typeof bound == "string") {
        bound = commands[bound];
        if (!bound) {
          return false;
        }
      }
      cm.display.input.ensurePolled();
      var prevShift = cm.display.shift, done = false;
      try {
        if (cm.isReadOnly()) {
          cm.state.suppressEdits = true;
        }
        if (dropShift) {
          cm.display.shift = false;
        }
        done = bound(cm) != Pass;
      } finally {
        cm.display.shift = prevShift;
        cm.state.suppressEdits = false;
      }
      return done;
    }
    function lookupKeyForEditor(cm, name, handle) {
      for (var i3 = 0; i3 < cm.state.keyMaps.length; i3++) {
        var result = lookupKey(name, cm.state.keyMaps[i3], handle, cm);
        if (result) {
          return result;
        }
      }
      return cm.options.extraKeys && lookupKey(name, cm.options.extraKeys, handle, cm) || lookupKey(name, cm.options.keyMap, handle, cm);
    }
    var stopSeq = new Delayed();
    function dispatchKey(cm, name, e2, handle) {
      var seq = cm.state.keySeq;
      if (seq) {
        if (isModifierKey(name)) {
          return "handled";
        }
        if (/\'$/.test(name)) {
          cm.state.keySeq = null;
        } else {
          stopSeq.set(50, function() {
            if (cm.state.keySeq == seq) {
              cm.state.keySeq = null;
              cm.display.input.reset();
            }
          });
        }
        if (dispatchKeyInner(cm, seq + " " + name, e2, handle)) {
          return true;
        }
      }
      return dispatchKeyInner(cm, name, e2, handle);
    }
    function dispatchKeyInner(cm, name, e2, handle) {
      var result = lookupKeyForEditor(cm, name, handle);
      if (result == "multi") {
        cm.state.keySeq = name;
      }
      if (result == "handled") {
        signalLater(cm, "keyHandled", cm, name, e2);
      }
      if (result == "handled" || result == "multi") {
        e_preventDefault(e2);
        restartBlink(cm);
      }
      return !!result;
    }
    function handleKeyBinding(cm, e2) {
      var name = keyName(e2, true);
      if (!name) {
        return false;
      }
      if (e2.shiftKey && !cm.state.keySeq) {
        return dispatchKey(cm, "Shift-" + name, e2, function(b2) {
          return doHandleBinding(cm, b2, true);
        }) || dispatchKey(cm, name, e2, function(b2) {
          if (typeof b2 == "string" ? /^go[A-Z]/.test(b2) : b2.motion) {
            return doHandleBinding(cm, b2);
          }
        });
      } else {
        return dispatchKey(cm, name, e2, function(b2) {
          return doHandleBinding(cm, b2);
        });
      }
    }
    function handleCharBinding(cm, e2, ch) {
      return dispatchKey(cm, "'" + ch + "'", e2, function(b2) {
        return doHandleBinding(cm, b2, true);
      });
    }
    var lastStoppedKey = null;
    function onKeyDown(e2) {
      var cm = this;
      if (e2.target && e2.target != cm.display.input.getField()) {
        return;
      }
      cm.curOp.focus = activeElt();
      if (signalDOMEvent(cm, e2)) {
        return;
      }
      if (ie && ie_version < 11 && e2.keyCode == 27) {
        e2.returnValue = false;
      }
      var code = e2.keyCode;
      cm.display.shift = code == 16 || e2.shiftKey;
      var handled = handleKeyBinding(cm, e2);
      if (presto) {
        lastStoppedKey = handled ? code : null;
        if (!handled && code == 88 && !hasCopyEvent && (mac ? e2.metaKey : e2.ctrlKey)) {
          cm.replaceSelection("", null, "cut");
        }
      }
      if (gecko && !mac && !handled && code == 46 && e2.shiftKey && !e2.ctrlKey && document.execCommand) {
        document.execCommand("cut");
      }
      if (code == 18 && !/\bCodeMirror-crosshair\b/.test(cm.display.lineDiv.className)) {
        showCrossHair(cm);
      }
    }
    function showCrossHair(cm) {
      var lineDiv = cm.display.lineDiv;
      addClass(lineDiv, "CodeMirror-crosshair");
      function up(e2) {
        if (e2.keyCode == 18 || !e2.altKey) {
          rmClass(lineDiv, "CodeMirror-crosshair");
          off(document, "keyup", up);
          off(document, "mouseover", up);
        }
      }
      on(document, "keyup", up);
      on(document, "mouseover", up);
    }
    function onKeyUp(e2) {
      if (e2.keyCode == 16) {
        this.doc.sel.shift = false;
      }
      signalDOMEvent(this, e2);
    }
    function onKeyPress(e2) {
      var cm = this;
      if (e2.target && e2.target != cm.display.input.getField()) {
        return;
      }
      if (eventInWidget(cm.display, e2) || signalDOMEvent(cm, e2) || e2.ctrlKey && !e2.altKey || mac && e2.metaKey) {
        return;
      }
      var keyCode = e2.keyCode, charCode = e2.charCode;
      if (presto && keyCode == lastStoppedKey) {
        lastStoppedKey = null;
        e_preventDefault(e2);
        return;
      }
      if (presto && (!e2.which || e2.which < 10) && handleKeyBinding(cm, e2)) {
        return;
      }
      var ch = String.fromCharCode(charCode == null ? keyCode : charCode);
      if (ch == "\b") {
        return;
      }
      if (handleCharBinding(cm, e2, ch)) {
        return;
      }
      cm.display.input.onKeyPress(e2);
    }
    var DOUBLECLICK_DELAY = 400;
    var PastClick = function(time, pos, button) {
      this.time = time;
      this.pos = pos;
      this.button = button;
    };
    PastClick.prototype.compare = function(time, pos, button) {
      return this.time + DOUBLECLICK_DELAY > time && cmp(pos, this.pos) == 0 && button == this.button;
    };
    var lastClick, lastDoubleClick;
    function clickRepeat(pos, button) {
      var now = +new Date();
      if (lastDoubleClick && lastDoubleClick.compare(now, pos, button)) {
        lastClick = lastDoubleClick = null;
        return "triple";
      } else if (lastClick && lastClick.compare(now, pos, button)) {
        lastDoubleClick = new PastClick(now, pos, button);
        lastClick = null;
        return "double";
      } else {
        lastClick = new PastClick(now, pos, button);
        lastDoubleClick = null;
        return "single";
      }
    }
    function onMouseDown(e2) {
      var cm = this, display = cm.display;
      if (signalDOMEvent(cm, e2) || display.activeTouch && display.input.supportsTouch()) {
        return;
      }
      display.input.ensurePolled();
      display.shift = e2.shiftKey;
      if (eventInWidget(display, e2)) {
        if (!webkit) {
          display.scroller.draggable = false;
          setTimeout(function() {
            return display.scroller.draggable = true;
          }, 100);
        }
        return;
      }
      if (clickInGutter(cm, e2)) {
        return;
      }
      var pos = posFromMouse(cm, e2), button = e_button(e2), repeat = pos ? clickRepeat(pos, button) : "single";
      window.focus();
      if (button == 1 && cm.state.selectingText) {
        cm.state.selectingText(e2);
      }
      if (pos && handleMappedButton(cm, button, pos, repeat, e2)) {
        return;
      }
      if (button == 1) {
        if (pos) {
          leftButtonDown(cm, pos, repeat, e2);
        } else if (e_target(e2) == display.scroller) {
          e_preventDefault(e2);
        }
      } else if (button == 2) {
        if (pos) {
          extendSelection(cm.doc, pos);
        }
        setTimeout(function() {
          return display.input.focus();
        }, 20);
      } else if (button == 3) {
        if (captureRightClick) {
          cm.display.input.onContextMenu(e2);
        } else {
          delayBlurEvent(cm);
        }
      }
    }
    function handleMappedButton(cm, button, pos, repeat, event) {
      var name = "Click";
      if (repeat == "double") {
        name = "Double" + name;
      } else if (repeat == "triple") {
        name = "Triple" + name;
      }
      name = (button == 1 ? "Left" : button == 2 ? "Middle" : "Right") + name;
      return dispatchKey(cm, addModifierNames(name, event), event, function(bound) {
        if (typeof bound == "string") {
          bound = commands[bound];
        }
        if (!bound) {
          return false;
        }
        var done = false;
        try {
          if (cm.isReadOnly()) {
            cm.state.suppressEdits = true;
          }
          done = bound(cm, pos) != Pass;
        } finally {
          cm.state.suppressEdits = false;
        }
        return done;
      });
    }
    function configureMouse(cm, repeat, event) {
      var option = cm.getOption("configureMouse");
      var value = option ? option(cm, repeat, event) : {};
      if (value.unit == null) {
        var rect = chromeOS ? event.shiftKey && event.metaKey : event.altKey;
        value.unit = rect ? "rectangle" : repeat == "single" ? "char" : repeat == "double" ? "word" : "line";
      }
      if (value.extend == null || cm.doc.extend) {
        value.extend = cm.doc.extend || event.shiftKey;
      }
      if (value.addNew == null) {
        value.addNew = mac ? event.metaKey : event.ctrlKey;
      }
      if (value.moveOnDrag == null) {
        value.moveOnDrag = !(mac ? event.altKey : event.ctrlKey);
      }
      return value;
    }
    function leftButtonDown(cm, pos, repeat, event) {
      if (ie) {
        setTimeout(bind(ensureFocus, cm), 0);
      } else {
        cm.curOp.focus = activeElt();
      }
      var behavior = configureMouse(cm, repeat, event);
      var sel = cm.doc.sel, contained;
      if (cm.options.dragDrop && dragAndDrop && !cm.isReadOnly() && repeat == "single" && (contained = sel.contains(pos)) > -1 && (cmp((contained = sel.ranges[contained]).from(), pos) < 0 || pos.xRel > 0) && (cmp(contained.to(), pos) > 0 || pos.xRel < 0)) {
        leftButtonStartDrag(cm, event, pos, behavior);
      } else {
        leftButtonSelect(cm, event, pos, behavior);
      }
    }
    function leftButtonStartDrag(cm, event, pos, behavior) {
      var display = cm.display, moved = false;
      var dragEnd = operation(cm, function(e2) {
        if (webkit) {
          display.scroller.draggable = false;
        }
        cm.state.draggingText = false;
        if (cm.state.delayingBlurEvent) {
          if (cm.hasFocus()) {
            cm.state.delayingBlurEvent = false;
          } else {
            delayBlurEvent(cm);
          }
        }
        off(display.wrapper.ownerDocument, "mouseup", dragEnd);
        off(display.wrapper.ownerDocument, "mousemove", mouseMove);
        off(display.scroller, "dragstart", dragStart);
        off(display.scroller, "drop", dragEnd);
        if (!moved) {
          e_preventDefault(e2);
          if (!behavior.addNew) {
            extendSelection(cm.doc, pos, null, null, behavior.extend);
          }
          if (webkit && !safari || ie && ie_version == 9) {
            setTimeout(function() {
              display.wrapper.ownerDocument.body.focus({ preventScroll: true });
              display.input.focus();
            }, 20);
          } else {
            display.input.focus();
          }
        }
      });
      var mouseMove = function(e2) {
        moved = moved || Math.abs(event.clientX - e2.clientX) + Math.abs(event.clientY - e2.clientY) >= 10;
      };
      var dragStart = function() {
        return moved = true;
      };
      if (webkit) {
        display.scroller.draggable = true;
      }
      cm.state.draggingText = dragEnd;
      dragEnd.copy = !behavior.moveOnDrag;
      on(display.wrapper.ownerDocument, "mouseup", dragEnd);
      on(display.wrapper.ownerDocument, "mousemove", mouseMove);
      on(display.scroller, "dragstart", dragStart);
      on(display.scroller, "drop", dragEnd);
      cm.state.delayingBlurEvent = true;
      setTimeout(function() {
        return display.input.focus();
      }, 20);
      if (display.scroller.dragDrop) {
        display.scroller.dragDrop();
      }
    }
    function rangeForUnit(cm, pos, unit) {
      if (unit == "char") {
        return new Range(pos, pos);
      }
      if (unit == "word") {
        return cm.findWordAt(pos);
      }
      if (unit == "line") {
        return new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0)));
      }
      var result = unit(cm, pos);
      return new Range(result.from, result.to);
    }
    function leftButtonSelect(cm, event, start, behavior) {
      if (ie) {
        delayBlurEvent(cm);
      }
      var display = cm.display, doc = cm.doc;
      e_preventDefault(event);
      var ourRange, ourIndex, startSel = doc.sel, ranges = startSel.ranges;
      if (behavior.addNew && !behavior.extend) {
        ourIndex = doc.sel.contains(start);
        if (ourIndex > -1) {
          ourRange = ranges[ourIndex];
        } else {
          ourRange = new Range(start, start);
        }
      } else {
        ourRange = doc.sel.primary();
        ourIndex = doc.sel.primIndex;
      }
      if (behavior.unit == "rectangle") {
        if (!behavior.addNew) {
          ourRange = new Range(start, start);
        }
        start = posFromMouse(cm, event, true, true);
        ourIndex = -1;
      } else {
        var range2 = rangeForUnit(cm, start, behavior.unit);
        if (behavior.extend) {
          ourRange = extendRange(ourRange, range2.anchor, range2.head, behavior.extend);
        } else {
          ourRange = range2;
        }
      }
      if (!behavior.addNew) {
        ourIndex = 0;
        setSelection(doc, new Selection([ourRange], 0), sel_mouse);
        startSel = doc.sel;
      } else if (ourIndex == -1) {
        ourIndex = ranges.length;
        setSelection(doc, normalizeSelection(cm, ranges.concat([ourRange]), ourIndex), { scroll: false, origin: "*mouse" });
      } else if (ranges.length > 1 && ranges[ourIndex].empty() && behavior.unit == "char" && !behavior.extend) {
        setSelection(doc, normalizeSelection(cm, ranges.slice(0, ourIndex).concat(ranges.slice(ourIndex + 1)), 0), { scroll: false, origin: "*mouse" });
        startSel = doc.sel;
      } else {
        replaceOneSelection(doc, ourIndex, ourRange, sel_mouse);
      }
      var lastPos = start;
      function extendTo(pos) {
        if (cmp(lastPos, pos) == 0) {
          return;
        }
        lastPos = pos;
        if (behavior.unit == "rectangle") {
          var ranges2 = [], tabSize = cm.options.tabSize;
          var startCol = countColumn(getLine(doc, start.line).text, start.ch, tabSize);
          var posCol = countColumn(getLine(doc, pos.line).text, pos.ch, tabSize);
          var left = Math.min(startCol, posCol), right = Math.max(startCol, posCol);
          for (var line = Math.min(start.line, pos.line), end = Math.min(cm.lastLine(), Math.max(start.line, pos.line)); line <= end; line++) {
            var text = getLine(doc, line).text, leftPos = findColumn(text, left, tabSize);
            if (left == right) {
              ranges2.push(new Range(Pos(line, leftPos), Pos(line, leftPos)));
            } else if (text.length > leftPos) {
              ranges2.push(new Range(Pos(line, leftPos), Pos(line, findColumn(text, right, tabSize))));
            }
          }
          if (!ranges2.length) {
            ranges2.push(new Range(start, start));
          }
          setSelection(doc, normalizeSelection(cm, startSel.ranges.slice(0, ourIndex).concat(ranges2), ourIndex), { origin: "*mouse", scroll: false });
          cm.scrollIntoView(pos);
        } else {
          var oldRange = ourRange;
          var range3 = rangeForUnit(cm, pos, behavior.unit);
          var anchor = oldRange.anchor, head;
          if (cmp(range3.anchor, anchor) > 0) {
            head = range3.head;
            anchor = minPos(oldRange.from(), range3.anchor);
          } else {
            head = range3.anchor;
            anchor = maxPos(oldRange.to(), range3.head);
          }
          var ranges$1 = startSel.ranges.slice(0);
          ranges$1[ourIndex] = bidiSimplify(cm, new Range(clipPos(doc, anchor), head));
          setSelection(doc, normalizeSelection(cm, ranges$1, ourIndex), sel_mouse);
        }
      }
      var editorSize = display.wrapper.getBoundingClientRect();
      var counter = 0;
      function extend(e2) {
        var curCount = ++counter;
        var cur = posFromMouse(cm, e2, true, behavior.unit == "rectangle");
        if (!cur) {
          return;
        }
        if (cmp(cur, lastPos) != 0) {
          cm.curOp.focus = activeElt();
          extendTo(cur);
          var visible = visibleLines(display, doc);
          if (cur.line >= visible.to || cur.line < visible.from) {
            setTimeout(operation(cm, function() {
              if (counter == curCount) {
                extend(e2);
              }
            }), 150);
          }
        } else {
          var outside = e2.clientY < editorSize.top ? -20 : e2.clientY > editorSize.bottom ? 20 : 0;
          if (outside) {
            setTimeout(operation(cm, function() {
              if (counter != curCount) {
                return;
              }
              display.scroller.scrollTop += outside;
              extend(e2);
            }), 50);
          }
        }
      }
      function done(e2) {
        cm.state.selectingText = false;
        counter = Infinity;
        if (e2) {
          e_preventDefault(e2);
          display.input.focus();
        }
        off(display.wrapper.ownerDocument, "mousemove", move);
        off(display.wrapper.ownerDocument, "mouseup", up);
        doc.history.lastSelOrigin = null;
      }
      var move = operation(cm, function(e2) {
        if (e2.buttons === 0 || !e_button(e2)) {
          done(e2);
        } else {
          extend(e2);
        }
      });
      var up = operation(cm, done);
      cm.state.selectingText = up;
      on(display.wrapper.ownerDocument, "mousemove", move);
      on(display.wrapper.ownerDocument, "mouseup", up);
    }
    function bidiSimplify(cm, range2) {
      var anchor = range2.anchor;
      var head = range2.head;
      var anchorLine = getLine(cm.doc, anchor.line);
      if (cmp(anchor, head) == 0 && anchor.sticky == head.sticky) {
        return range2;
      }
      var order = getOrder(anchorLine);
      if (!order) {
        return range2;
      }
      var index = getBidiPartAt(order, anchor.ch, anchor.sticky), part = order[index];
      if (part.from != anchor.ch && part.to != anchor.ch) {
        return range2;
      }
      var boundary = index + (part.from == anchor.ch == (part.level != 1) ? 0 : 1);
      if (boundary == 0 || boundary == order.length) {
        return range2;
      }
      var leftSide;
      if (head.line != anchor.line) {
        leftSide = (head.line - anchor.line) * (cm.doc.direction == "ltr" ? 1 : -1) > 0;
      } else {
        var headIndex = getBidiPartAt(order, head.ch, head.sticky);
        var dir = headIndex - index || (head.ch - anchor.ch) * (part.level == 1 ? -1 : 1);
        if (headIndex == boundary - 1 || headIndex == boundary) {
          leftSide = dir < 0;
        } else {
          leftSide = dir > 0;
        }
      }
      var usePart = order[boundary + (leftSide ? -1 : 0)];
      var from = leftSide == (usePart.level == 1);
      var ch = from ? usePart.from : usePart.to, sticky = from ? "after" : "before";
      return anchor.ch == ch && anchor.sticky == sticky ? range2 : new Range(new Pos(anchor.line, ch, sticky), head);
    }
    function gutterEvent(cm, e2, type, prevent) {
      var mX, mY;
      if (e2.touches) {
        mX = e2.touches[0].clientX;
        mY = e2.touches[0].clientY;
      } else {
        try {
          mX = e2.clientX;
          mY = e2.clientY;
        } catch (e$12) {
          return false;
        }
      }
      if (mX >= Math.floor(cm.display.gutters.getBoundingClientRect().right)) {
        return false;
      }
      if (prevent) {
        e_preventDefault(e2);
      }
      var display = cm.display;
      var lineBox = display.lineDiv.getBoundingClientRect();
      if (mY > lineBox.bottom || !hasHandler(cm, type)) {
        return e_defaultPrevented(e2);
      }
      mY -= lineBox.top - display.viewOffset;
      for (var i3 = 0; i3 < cm.display.gutterSpecs.length; ++i3) {
        var g2 = display.gutters.childNodes[i3];
        if (g2 && g2.getBoundingClientRect().right >= mX) {
          var line = lineAtHeight(cm.doc, mY);
          var gutter = cm.display.gutterSpecs[i3];
          signal(cm, type, cm, line, gutter.className, e2);
          return e_defaultPrevented(e2);
        }
      }
    }
    function clickInGutter(cm, e2) {
      return gutterEvent(cm, e2, "gutterClick", true);
    }
    function onContextMenu(cm, e2) {
      if (eventInWidget(cm.display, e2) || contextMenuInGutter(cm, e2)) {
        return;
      }
      if (signalDOMEvent(cm, e2, "contextmenu")) {
        return;
      }
      if (!captureRightClick) {
        cm.display.input.onContextMenu(e2);
      }
    }
    function contextMenuInGutter(cm, e2) {
      if (!hasHandler(cm, "gutterContextMenu")) {
        return false;
      }
      return gutterEvent(cm, e2, "gutterContextMenu", false);
    }
    function themeChanged(cm) {
      cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + cm.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
      clearCaches(cm);
    }
    var Init = { toString: function() {
      return "CodeMirror.Init";
    } };
    var defaults = {};
    var optionHandlers = {};
    function defineOptions(CodeMirror3) {
      var optionHandlers2 = CodeMirror3.optionHandlers;
      function option(name, deflt, handle, notOnInit) {
        CodeMirror3.defaults[name] = deflt;
        if (handle) {
          optionHandlers2[name] = notOnInit ? function(cm, val, old) {
            if (old != Init) {
              handle(cm, val, old);
            }
          } : handle;
        }
      }
      CodeMirror3.defineOption = option;
      CodeMirror3.Init = Init;
      option("value", "", function(cm, val) {
        return cm.setValue(val);
      }, true);
      option("mode", null, function(cm, val) {
        cm.doc.modeOption = val;
        loadMode(cm);
      }, true);
      option("indentUnit", 2, loadMode, true);
      option("indentWithTabs", false);
      option("smartIndent", true);
      option("tabSize", 4, function(cm) {
        resetModeState(cm);
        clearCaches(cm);
        regChange(cm);
      }, true);
      option("lineSeparator", null, function(cm, val) {
        cm.doc.lineSep = val;
        if (!val) {
          return;
        }
        var newBreaks = [], lineNo2 = cm.doc.first;
        cm.doc.iter(function(line) {
          for (var pos = 0; ; ) {
            var found = line.text.indexOf(val, pos);
            if (found == -1) {
              break;
            }
            pos = found + val.length;
            newBreaks.push(Pos(lineNo2, found));
          }
          lineNo2++;
        });
        for (var i3 = newBreaks.length - 1; i3 >= 0; i3--) {
          replaceRange(cm.doc, val, newBreaks[i3], Pos(newBreaks[i3].line, newBreaks[i3].ch + val.length));
        }
      });
      option("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g, function(cm, val, old) {
        cm.state.specialChars = new RegExp(val.source + (val.test("	") ? "" : "|	"), "g");
        if (old != Init) {
          cm.refresh();
        }
      });
      option("specialCharPlaceholder", defaultSpecialCharPlaceholder, function(cm) {
        return cm.refresh();
      }, true);
      option("electricChars", true);
      option("inputStyle", mobile ? "contenteditable" : "textarea", function() {
        throw new Error("inputStyle can not (yet) be changed in a running editor");
      }, true);
      option("spellcheck", false, function(cm, val) {
        return cm.getInputField().spellcheck = val;
      }, true);
      option("autocorrect", false, function(cm, val) {
        return cm.getInputField().autocorrect = val;
      }, true);
      option("autocapitalize", false, function(cm, val) {
        return cm.getInputField().autocapitalize = val;
      }, true);
      option("rtlMoveVisually", !windows);
      option("wholeLineUpdateBefore", true);
      option("theme", "default", function(cm) {
        themeChanged(cm);
        updateGutters(cm);
      }, true);
      option("keyMap", "default", function(cm, val, old) {
        var next = getKeyMap(val);
        var prev = old != Init && getKeyMap(old);
        if (prev && prev.detach) {
          prev.detach(cm, next);
        }
        if (next.attach) {
          next.attach(cm, prev || null);
        }
      });
      option("extraKeys", null);
      option("configureMouse", null);
      option("lineWrapping", false, wrappingChanged, true);
      option("gutters", [], function(cm, val) {
        cm.display.gutterSpecs = getGutters(val, cm.options.lineNumbers);
        updateGutters(cm);
      }, true);
      option("fixedGutter", true, function(cm, val) {
        cm.display.gutters.style.left = val ? compensateForHScroll(cm.display) + "px" : "0";
        cm.refresh();
      }, true);
      option("coverGutterNextToScrollbar", false, function(cm) {
        return updateScrollbars(cm);
      }, true);
      option("scrollbarStyle", "native", function(cm) {
        initScrollbars(cm);
        updateScrollbars(cm);
        cm.display.scrollbars.setScrollTop(cm.doc.scrollTop);
        cm.display.scrollbars.setScrollLeft(cm.doc.scrollLeft);
      }, true);
      option("lineNumbers", false, function(cm, val) {
        cm.display.gutterSpecs = getGutters(cm.options.gutters, val);
        updateGutters(cm);
      }, true);
      option("firstLineNumber", 1, updateGutters, true);
      option("lineNumberFormatter", function(integer) {
        return integer;
      }, updateGutters, true);
      option("showCursorWhenSelecting", false, updateSelection, true);
      option("resetSelectionOnContextMenu", true);
      option("lineWiseCopyCut", true);
      option("pasteLinesPerSelection", true);
      option("selectionsMayTouch", false);
      option("readOnly", false, function(cm, val) {
        if (val == "nocursor") {
          onBlur(cm);
          cm.display.input.blur();
        }
        cm.display.input.readOnlyChanged(val);
      });
      option("screenReaderLabel", null, function(cm, val) {
        val = val === "" ? null : val;
        cm.display.input.screenReaderLabelChanged(val);
      });
      option("disableInput", false, function(cm, val) {
        if (!val) {
          cm.display.input.reset();
        }
      }, true);
      option("dragDrop", true, dragDropChanged);
      option("allowDropFileTypes", null);
      option("cursorBlinkRate", 530);
      option("cursorScrollMargin", 0);
      option("cursorHeight", 1, updateSelection, true);
      option("singleCursorHeightPerLine", true, updateSelection, true);
      option("workTime", 100);
      option("workDelay", 100);
      option("flattenSpans", true, resetModeState, true);
      option("addModeClass", false, resetModeState, true);
      option("pollInterval", 100);
      option("undoDepth", 200, function(cm, val) {
        return cm.doc.history.undoDepth = val;
      });
      option("historyEventDelay", 1250);
      option("viewportMargin", 10, function(cm) {
        return cm.refresh();
      }, true);
      option("maxHighlightLength", 1e4, resetModeState, true);
      option("moveInputWithCursor", true, function(cm, val) {
        if (!val) {
          cm.display.input.resetPosition();
        }
      });
      option("tabindex", null, function(cm, val) {
        return cm.display.input.getField().tabIndex = val || "";
      });
      option("autofocus", null);
      option("direction", "ltr", function(cm, val) {
        return cm.doc.setDirection(val);
      }, true);
      option("phrases", null);
    }
    function dragDropChanged(cm, value, old) {
      var wasOn = old && old != Init;
      if (!value != !wasOn) {
        var funcs = cm.display.dragFunctions;
        var toggle = value ? on : off;
        toggle(cm.display.scroller, "dragstart", funcs.start);
        toggle(cm.display.scroller, "dragenter", funcs.enter);
        toggle(cm.display.scroller, "dragover", funcs.over);
        toggle(cm.display.scroller, "dragleave", funcs.leave);
        toggle(cm.display.scroller, "drop", funcs.drop);
      }
    }
    function wrappingChanged(cm) {
      if (cm.options.lineWrapping) {
        addClass(cm.display.wrapper, "CodeMirror-wrap");
        cm.display.sizer.style.minWidth = "";
        cm.display.sizerWidth = null;
      } else {
        rmClass(cm.display.wrapper, "CodeMirror-wrap");
        findMaxLine(cm);
      }
      estimateLineHeights(cm);
      regChange(cm);
      clearCaches(cm);
      setTimeout(function() {
        return updateScrollbars(cm);
      }, 100);
    }
    function CodeMirror2(place, options) {
      var this$1$1 = this;
      if (!(this instanceof CodeMirror2)) {
        return new CodeMirror2(place, options);
      }
      this.options = options = options ? copyObj(options) : {};
      copyObj(defaults, options, false);
      var doc = options.value;
      if (typeof doc == "string") {
        doc = new Doc(doc, options.mode, null, options.lineSeparator, options.direction);
      } else if (options.mode) {
        doc.modeOption = options.mode;
      }
      this.doc = doc;
      var input = new CodeMirror2.inputStyles[options.inputStyle](this);
      var display = this.display = new Display(place, doc, input, options);
      display.wrapper.CodeMirror = this;
      themeChanged(this);
      if (options.lineWrapping) {
        this.display.wrapper.className += " CodeMirror-wrap";
      }
      initScrollbars(this);
      this.state = {
        keyMaps: [],
        overlays: [],
        modeGen: 0,
        overwrite: false,
        delayingBlurEvent: false,
        focused: false,
        suppressEdits: false,
        pasteIncoming: -1,
        cutIncoming: -1,
        selectingText: false,
        draggingText: false,
        highlight: new Delayed(),
        keySeq: null,
        specialChars: null
      };
      if (options.autofocus && !mobile) {
        display.input.focus();
      }
      if (ie && ie_version < 11) {
        setTimeout(function() {
          return this$1$1.display.input.reset(true);
        }, 20);
      }
      registerEventHandlers(this);
      ensureGlobalHandlers();
      startOperation(this);
      this.curOp.forceUpdate = true;
      attachDoc(this, doc);
      if (options.autofocus && !mobile || this.hasFocus()) {
        setTimeout(function() {
          if (this$1$1.hasFocus() && !this$1$1.state.focused) {
            onFocus(this$1$1);
          }
        }, 20);
      } else {
        onBlur(this);
      }
      for (var opt in optionHandlers) {
        if (optionHandlers.hasOwnProperty(opt)) {
          optionHandlers[opt](this, options[opt], Init);
        }
      }
      maybeUpdateLineNumberWidth(this);
      if (options.finishInit) {
        options.finishInit(this);
      }
      for (var i3 = 0; i3 < initHooks.length; ++i3) {
        initHooks[i3](this);
      }
      endOperation(this);
      if (webkit && options.lineWrapping && getComputedStyle(display.lineDiv).textRendering == "optimizelegibility") {
        display.lineDiv.style.textRendering = "auto";
      }
    }
    CodeMirror2.defaults = defaults;
    CodeMirror2.optionHandlers = optionHandlers;
    function registerEventHandlers(cm) {
      var d2 = cm.display;
      on(d2.scroller, "mousedown", operation(cm, onMouseDown));
      if (ie && ie_version < 11) {
        on(d2.scroller, "dblclick", operation(cm, function(e2) {
          if (signalDOMEvent(cm, e2)) {
            return;
          }
          var pos = posFromMouse(cm, e2);
          if (!pos || clickInGutter(cm, e2) || eventInWidget(cm.display, e2)) {
            return;
          }
          e_preventDefault(e2);
          var word = cm.findWordAt(pos);
          extendSelection(cm.doc, word.anchor, word.head);
        }));
      } else {
        on(d2.scroller, "dblclick", function(e2) {
          return signalDOMEvent(cm, e2) || e_preventDefault(e2);
        });
      }
      on(d2.scroller, "contextmenu", function(e2) {
        return onContextMenu(cm, e2);
      });
      on(d2.input.getField(), "contextmenu", function(e2) {
        if (!d2.scroller.contains(e2.target)) {
          onContextMenu(cm, e2);
        }
      });
      var touchFinished, prevTouch = { end: 0 };
      function finishTouch() {
        if (d2.activeTouch) {
          touchFinished = setTimeout(function() {
            return d2.activeTouch = null;
          }, 1e3);
          prevTouch = d2.activeTouch;
          prevTouch.end = +new Date();
        }
      }
      function isMouseLikeTouchEvent(e2) {
        if (e2.touches.length != 1) {
          return false;
        }
        var touch = e2.touches[0];
        return touch.radiusX <= 1 && touch.radiusY <= 1;
      }
      function farAway(touch, other) {
        if (other.left == null) {
          return true;
        }
        var dx = other.left - touch.left, dy = other.top - touch.top;
        return dx * dx + dy * dy > 20 * 20;
      }
      on(d2.scroller, "touchstart", function(e2) {
        if (!signalDOMEvent(cm, e2) && !isMouseLikeTouchEvent(e2) && !clickInGutter(cm, e2)) {
          d2.input.ensurePolled();
          clearTimeout(touchFinished);
          var now = +new Date();
          d2.activeTouch = {
            start: now,
            moved: false,
            prev: now - prevTouch.end <= 300 ? prevTouch : null
          };
          if (e2.touches.length == 1) {
            d2.activeTouch.left = e2.touches[0].pageX;
            d2.activeTouch.top = e2.touches[0].pageY;
          }
        }
      });
      on(d2.scroller, "touchmove", function() {
        if (d2.activeTouch) {
          d2.activeTouch.moved = true;
        }
      });
      on(d2.scroller, "touchend", function(e2) {
        var touch = d2.activeTouch;
        if (touch && !eventInWidget(d2, e2) && touch.left != null && !touch.moved && new Date() - touch.start < 300) {
          var pos = cm.coordsChar(d2.activeTouch, "page"), range2;
          if (!touch.prev || farAway(touch, touch.prev)) {
            range2 = new Range(pos, pos);
          } else if (!touch.prev.prev || farAway(touch, touch.prev.prev)) {
            range2 = cm.findWordAt(pos);
          } else {
            range2 = new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0)));
          }
          cm.setSelection(range2.anchor, range2.head);
          cm.focus();
          e_preventDefault(e2);
        }
        finishTouch();
      });
      on(d2.scroller, "touchcancel", finishTouch);
      on(d2.scroller, "scroll", function() {
        if (d2.scroller.clientHeight) {
          updateScrollTop(cm, d2.scroller.scrollTop);
          setScrollLeft(cm, d2.scroller.scrollLeft, true);
          signal(cm, "scroll", cm);
        }
      });
      on(d2.scroller, "mousewheel", function(e2) {
        return onScrollWheel(cm, e2);
      });
      on(d2.scroller, "DOMMouseScroll", function(e2) {
        return onScrollWheel(cm, e2);
      });
      on(d2.wrapper, "scroll", function() {
        return d2.wrapper.scrollTop = d2.wrapper.scrollLeft = 0;
      });
      d2.dragFunctions = {
        enter: function(e2) {
          if (!signalDOMEvent(cm, e2)) {
            e_stop(e2);
          }
        },
        over: function(e2) {
          if (!signalDOMEvent(cm, e2)) {
            onDragOver(cm, e2);
            e_stop(e2);
          }
        },
        start: function(e2) {
          return onDragStart(cm, e2);
        },
        drop: operation(cm, onDrop),
        leave: function(e2) {
          if (!signalDOMEvent(cm, e2)) {
            clearDragCursor(cm);
          }
        }
      };
      var inp = d2.input.getField();
      on(inp, "keyup", function(e2) {
        return onKeyUp.call(cm, e2);
      });
      on(inp, "keydown", operation(cm, onKeyDown));
      on(inp, "keypress", operation(cm, onKeyPress));
      on(inp, "focus", function(e2) {
        return onFocus(cm, e2);
      });
      on(inp, "blur", function(e2) {
        return onBlur(cm, e2);
      });
    }
    var initHooks = [];
    CodeMirror2.defineInitHook = function(f2) {
      return initHooks.push(f2);
    };
    function indentLine(cm, n2, how, aggressive) {
      var doc = cm.doc, state;
      if (how == null) {
        how = "add";
      }
      if (how == "smart") {
        if (!doc.mode.indent) {
          how = "prev";
        } else {
          state = getContextBefore(cm, n2).state;
        }
      }
      var tabSize = cm.options.tabSize;
      var line = getLine(doc, n2), curSpace = countColumn(line.text, null, tabSize);
      if (line.stateAfter) {
        line.stateAfter = null;
      }
      var curSpaceString = line.text.match(/^\s*/)[0], indentation;
      if (!aggressive && !/\S/.test(line.text)) {
        indentation = 0;
        how = "not";
      } else if (how == "smart") {
        indentation = doc.mode.indent(state, line.text.slice(curSpaceString.length), line.text);
        if (indentation == Pass || indentation > 150) {
          if (!aggressive) {
            return;
          }
          how = "prev";
        }
      }
      if (how == "prev") {
        if (n2 > doc.first) {
          indentation = countColumn(getLine(doc, n2 - 1).text, null, tabSize);
        } else {
          indentation = 0;
        }
      } else if (how == "add") {
        indentation = curSpace + cm.options.indentUnit;
      } else if (how == "subtract") {
        indentation = curSpace - cm.options.indentUnit;
      } else if (typeof how == "number") {
        indentation = curSpace + how;
      }
      indentation = Math.max(0, indentation);
      var indentString = "", pos = 0;
      if (cm.options.indentWithTabs) {
        for (var i3 = Math.floor(indentation / tabSize); i3; --i3) {
          pos += tabSize;
          indentString += "	";
        }
      }
      if (pos < indentation) {
        indentString += spaceStr(indentation - pos);
      }
      if (indentString != curSpaceString) {
        replaceRange(doc, indentString, Pos(n2, 0), Pos(n2, curSpaceString.length), "+input");
        line.stateAfter = null;
        return true;
      } else {
        for (var i$13 = 0; i$13 < doc.sel.ranges.length; i$13++) {
          var range2 = doc.sel.ranges[i$13];
          if (range2.head.line == n2 && range2.head.ch < curSpaceString.length) {
            var pos$1 = Pos(n2, curSpaceString.length);
            replaceOneSelection(doc, i$13, new Range(pos$1, pos$1));
            break;
          }
        }
      }
    }
    var lastCopied = null;
    function setLastCopied(newLastCopied) {
      lastCopied = newLastCopied;
    }
    function applyTextInput(cm, inserted, deleted, sel, origin) {
      var doc = cm.doc;
      cm.display.shift = false;
      if (!sel) {
        sel = doc.sel;
      }
      var recent = +new Date() - 200;
      var paste = origin == "paste" || cm.state.pasteIncoming > recent;
      var textLines = splitLinesAuto(inserted), multiPaste = null;
      if (paste && sel.ranges.length > 1) {
        if (lastCopied && lastCopied.text.join("\n") == inserted) {
          if (sel.ranges.length % lastCopied.text.length == 0) {
            multiPaste = [];
            for (var i3 = 0; i3 < lastCopied.text.length; i3++) {
              multiPaste.push(doc.splitLines(lastCopied.text[i3]));
            }
          }
        } else if (textLines.length == sel.ranges.length && cm.options.pasteLinesPerSelection) {
          multiPaste = map(textLines, function(l2) {
            return [l2];
          });
        }
      }
      var updateInput = cm.curOp.updateInput;
      for (var i$13 = sel.ranges.length - 1; i$13 >= 0; i$13--) {
        var range2 = sel.ranges[i$13];
        var from = range2.from(), to = range2.to();
        if (range2.empty()) {
          if (deleted && deleted > 0) {
            from = Pos(from.line, from.ch - deleted);
          } else if (cm.state.overwrite && !paste) {
            to = Pos(to.line, Math.min(getLine(doc, to.line).text.length, to.ch + lst(textLines).length));
          } else if (paste && lastCopied && lastCopied.lineWise && lastCopied.text.join("\n") == textLines.join("\n")) {
            from = to = Pos(from.line, 0);
          }
        }
        var changeEvent = {
          from,
          to,
          text: multiPaste ? multiPaste[i$13 % multiPaste.length] : textLines,
          origin: origin || (paste ? "paste" : cm.state.cutIncoming > recent ? "cut" : "+input")
        };
        makeChange(cm.doc, changeEvent);
        signalLater(cm, "inputRead", cm, changeEvent);
      }
      if (inserted && !paste) {
        triggerElectric(cm, inserted);
      }
      ensureCursorVisible(cm);
      if (cm.curOp.updateInput < 2) {
        cm.curOp.updateInput = updateInput;
      }
      cm.curOp.typing = true;
      cm.state.pasteIncoming = cm.state.cutIncoming = -1;
    }
    function handlePaste(e2, cm) {
      var pasted = e2.clipboardData && e2.clipboardData.getData("Text");
      if (pasted) {
        e2.preventDefault();
        if (!cm.isReadOnly() && !cm.options.disableInput) {
          runInOp(cm, function() {
            return applyTextInput(cm, pasted, 0, null, "paste");
          });
        }
        return true;
      }
    }
    function triggerElectric(cm, inserted) {
      if (!cm.options.electricChars || !cm.options.smartIndent) {
        return;
      }
      var sel = cm.doc.sel;
      for (var i3 = sel.ranges.length - 1; i3 >= 0; i3--) {
        var range2 = sel.ranges[i3];
        if (range2.head.ch > 100 || i3 && sel.ranges[i3 - 1].head.line == range2.head.line) {
          continue;
        }
        var mode = cm.getModeAt(range2.head);
        var indented = false;
        if (mode.electricChars) {
          for (var j = 0; j < mode.electricChars.length; j++) {
            if (inserted.indexOf(mode.electricChars.charAt(j)) > -1) {
              indented = indentLine(cm, range2.head.line, "smart");
              break;
            }
          }
        } else if (mode.electricInput) {
          if (mode.electricInput.test(getLine(cm.doc, range2.head.line).text.slice(0, range2.head.ch))) {
            indented = indentLine(cm, range2.head.line, "smart");
          }
        }
        if (indented) {
          signalLater(cm, "electricInput", cm, range2.head.line);
        }
      }
    }
    function copyableRanges(cm) {
      var text = [], ranges = [];
      for (var i3 = 0; i3 < cm.doc.sel.ranges.length; i3++) {
        var line = cm.doc.sel.ranges[i3].head.line;
        var lineRange = { anchor: Pos(line, 0), head: Pos(line + 1, 0) };
        ranges.push(lineRange);
        text.push(cm.getRange(lineRange.anchor, lineRange.head));
      }
      return { text, ranges };
    }
    function disableBrowserMagic(field, spellcheck, autocorrect, autocapitalize) {
      field.setAttribute("autocorrect", autocorrect ? "" : "off");
      field.setAttribute("autocapitalize", autocapitalize ? "" : "off");
      field.setAttribute("spellcheck", !!spellcheck);
    }
    function hiddenTextarea() {
      var te = elt("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none");
      var div = elt("div", [te], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
      if (webkit) {
        te.style.width = "1000px";
      } else {
        te.setAttribute("wrap", "off");
      }
      if (ios) {
        te.style.border = "1px solid black";
      }
      disableBrowserMagic(te);
      return div;
    }
    function addEditorMethods(CodeMirror3) {
      var optionHandlers2 = CodeMirror3.optionHandlers;
      var helpers = CodeMirror3.helpers = {};
      CodeMirror3.prototype = {
        constructor: CodeMirror3,
        focus: function() {
          window.focus();
          this.display.input.focus();
        },
        setOption: function(option, value) {
          var options = this.options, old = options[option];
          if (options[option] == value && option != "mode") {
            return;
          }
          options[option] = value;
          if (optionHandlers2.hasOwnProperty(option)) {
            operation(this, optionHandlers2[option])(this, value, old);
          }
          signal(this, "optionChange", this, option);
        },
        getOption: function(option) {
          return this.options[option];
        },
        getDoc: function() {
          return this.doc;
        },
        addKeyMap: function(map2, bottom) {
          this.state.keyMaps[bottom ? "push" : "unshift"](getKeyMap(map2));
        },
        removeKeyMap: function(map2) {
          var maps = this.state.keyMaps;
          for (var i3 = 0; i3 < maps.length; ++i3) {
            if (maps[i3] == map2 || maps[i3].name == map2) {
              maps.splice(i3, 1);
              return true;
            }
          }
        },
        addOverlay: methodOp(function(spec, options) {
          var mode = spec.token ? spec : CodeMirror3.getMode(this.options, spec);
          if (mode.startState) {
            throw new Error("Overlays may not be stateful.");
          }
          insertSorted(this.state.overlays, {
            mode,
            modeSpec: spec,
            opaque: options && options.opaque,
            priority: options && options.priority || 0
          }, function(overlay) {
            return overlay.priority;
          });
          this.state.modeGen++;
          regChange(this);
        }),
        removeOverlay: methodOp(function(spec) {
          var overlays = this.state.overlays;
          for (var i3 = 0; i3 < overlays.length; ++i3) {
            var cur = overlays[i3].modeSpec;
            if (cur == spec || typeof spec == "string" && cur.name == spec) {
              overlays.splice(i3, 1);
              this.state.modeGen++;
              regChange(this);
              return;
            }
          }
        }),
        indentLine: methodOp(function(n2, dir, aggressive) {
          if (typeof dir != "string" && typeof dir != "number") {
            if (dir == null) {
              dir = this.options.smartIndent ? "smart" : "prev";
            } else {
              dir = dir ? "add" : "subtract";
            }
          }
          if (isLine(this.doc, n2)) {
            indentLine(this, n2, dir, aggressive);
          }
        }),
        indentSelection: methodOp(function(how) {
          var ranges = this.doc.sel.ranges, end = -1;
          for (var i3 = 0; i3 < ranges.length; i3++) {
            var range2 = ranges[i3];
            if (!range2.empty()) {
              var from = range2.from(), to = range2.to();
              var start = Math.max(end, from.line);
              end = Math.min(this.lastLine(), to.line - (to.ch ? 0 : 1)) + 1;
              for (var j = start; j < end; ++j) {
                indentLine(this, j, how);
              }
              var newRanges = this.doc.sel.ranges;
              if (from.ch == 0 && ranges.length == newRanges.length && newRanges[i3].from().ch > 0) {
                replaceOneSelection(this.doc, i3, new Range(from, newRanges[i3].to()), sel_dontScroll);
              }
            } else if (range2.head.line > end) {
              indentLine(this, range2.head.line, how, true);
              end = range2.head.line;
              if (i3 == this.doc.sel.primIndex) {
                ensureCursorVisible(this);
              }
            }
          }
        }),
        getTokenAt: function(pos, precise) {
          return takeToken(this, pos, precise);
        },
        getLineTokens: function(line, precise) {
          return takeToken(this, Pos(line), precise, true);
        },
        getTokenTypeAt: function(pos) {
          pos = clipPos(this.doc, pos);
          var styles = getLineStyles(this, getLine(this.doc, pos.line));
          var before = 0, after = (styles.length - 1) / 2, ch = pos.ch;
          var type;
          if (ch == 0) {
            type = styles[2];
          } else {
            for (; ; ) {
              var mid = before + after >> 1;
              if ((mid ? styles[mid * 2 - 1] : 0) >= ch) {
                after = mid;
              } else if (styles[mid * 2 + 1] < ch) {
                before = mid + 1;
              } else {
                type = styles[mid * 2 + 2];
                break;
              }
            }
          }
          var cut = type ? type.indexOf("overlay ") : -1;
          return cut < 0 ? type : cut == 0 ? null : type.slice(0, cut - 1);
        },
        getModeAt: function(pos) {
          var mode = this.doc.mode;
          if (!mode.innerMode) {
            return mode;
          }
          return CodeMirror3.innerMode(mode, this.getTokenAt(pos).state).mode;
        },
        getHelper: function(pos, type) {
          return this.getHelpers(pos, type)[0];
        },
        getHelpers: function(pos, type) {
          var found = [];
          if (!helpers.hasOwnProperty(type)) {
            return found;
          }
          var help = helpers[type], mode = this.getModeAt(pos);
          if (typeof mode[type] == "string") {
            if (help[mode[type]]) {
              found.push(help[mode[type]]);
            }
          } else if (mode[type]) {
            for (var i3 = 0; i3 < mode[type].length; i3++) {
              var val = help[mode[type][i3]];
              if (val) {
                found.push(val);
              }
            }
          } else if (mode.helperType && help[mode.helperType]) {
            found.push(help[mode.helperType]);
          } else if (help[mode.name]) {
            found.push(help[mode.name]);
          }
          for (var i$13 = 0; i$13 < help._global.length; i$13++) {
            var cur = help._global[i$13];
            if (cur.pred(mode, this) && indexOf(found, cur.val) == -1) {
              found.push(cur.val);
            }
          }
          return found;
        },
        getStateAfter: function(line, precise) {
          var doc = this.doc;
          line = clipLine(doc, line == null ? doc.first + doc.size - 1 : line);
          return getContextBefore(this, line + 1, precise).state;
        },
        cursorCoords: function(start, mode) {
          var pos, range2 = this.doc.sel.primary();
          if (start == null) {
            pos = range2.head;
          } else if (typeof start == "object") {
            pos = clipPos(this.doc, start);
          } else {
            pos = start ? range2.from() : range2.to();
          }
          return cursorCoords(this, pos, mode || "page");
        },
        charCoords: function(pos, mode) {
          return charCoords(this, clipPos(this.doc, pos), mode || "page");
        },
        coordsChar: function(coords, mode) {
          coords = fromCoordSystem(this, coords, mode || "page");
          return coordsChar(this, coords.left, coords.top);
        },
        lineAtHeight: function(height, mode) {
          height = fromCoordSystem(this, { top: height, left: 0 }, mode || "page").top;
          return lineAtHeight(this.doc, height + this.display.viewOffset);
        },
        heightAtLine: function(line, mode, includeWidgets) {
          var end = false, lineObj;
          if (typeof line == "number") {
            var last = this.doc.first + this.doc.size - 1;
            if (line < this.doc.first) {
              line = this.doc.first;
            } else if (line > last) {
              line = last;
              end = true;
            }
            lineObj = getLine(this.doc, line);
          } else {
            lineObj = line;
          }
          return intoCoordSystem(this, lineObj, { top: 0, left: 0 }, mode || "page", includeWidgets || end).top + (end ? this.doc.height - heightAtLine(lineObj) : 0);
        },
        defaultTextHeight: function() {
          return textHeight(this.display);
        },
        defaultCharWidth: function() {
          return charWidth(this.display);
        },
        getViewport: function() {
          return { from: this.display.viewFrom, to: this.display.viewTo };
        },
        addWidget: function(pos, node, scroll, vert, horiz) {
          var display = this.display;
          pos = cursorCoords(this, clipPos(this.doc, pos));
          var top = pos.bottom, left = pos.left;
          node.style.position = "absolute";
          node.setAttribute("cm-ignore-events", "true");
          this.display.input.setUneditable(node);
          display.sizer.appendChild(node);
          if (vert == "over") {
            top = pos.top;
          } else if (vert == "above" || vert == "near") {
            var vspace = Math.max(display.wrapper.clientHeight, this.doc.height), hspace = Math.max(display.sizer.clientWidth, display.lineSpace.clientWidth);
            if ((vert == "above" || pos.bottom + node.offsetHeight > vspace) && pos.top > node.offsetHeight) {
              top = pos.top - node.offsetHeight;
            } else if (pos.bottom + node.offsetHeight <= vspace) {
              top = pos.bottom;
            }
            if (left + node.offsetWidth > hspace) {
              left = hspace - node.offsetWidth;
            }
          }
          node.style.top = top + "px";
          node.style.left = node.style.right = "";
          if (horiz == "right") {
            left = display.sizer.clientWidth - node.offsetWidth;
            node.style.right = "0px";
          } else {
            if (horiz == "left") {
              left = 0;
            } else if (horiz == "middle") {
              left = (display.sizer.clientWidth - node.offsetWidth) / 2;
            }
            node.style.left = left + "px";
          }
          if (scroll) {
            scrollIntoView(this, { left, top, right: left + node.offsetWidth, bottom: top + node.offsetHeight });
          }
        },
        triggerOnKeyDown: methodOp(onKeyDown),
        triggerOnKeyPress: methodOp(onKeyPress),
        triggerOnKeyUp: onKeyUp,
        triggerOnMouseDown: methodOp(onMouseDown),
        execCommand: function(cmd) {
          if (commands.hasOwnProperty(cmd)) {
            return commands[cmd].call(null, this);
          }
        },
        triggerElectric: methodOp(function(text) {
          triggerElectric(this, text);
        }),
        findPosH: function(from, amount, unit, visually) {
          var dir = 1;
          if (amount < 0) {
            dir = -1;
            amount = -amount;
          }
          var cur = clipPos(this.doc, from);
          for (var i3 = 0; i3 < amount; ++i3) {
            cur = findPosH(this.doc, cur, dir, unit, visually);
            if (cur.hitSide) {
              break;
            }
          }
          return cur;
        },
        moveH: methodOp(function(dir, unit) {
          var this$1$1 = this;
          this.extendSelectionsBy(function(range2) {
            if (this$1$1.display.shift || this$1$1.doc.extend || range2.empty()) {
              return findPosH(this$1$1.doc, range2.head, dir, unit, this$1$1.options.rtlMoveVisually);
            } else {
              return dir < 0 ? range2.from() : range2.to();
            }
          }, sel_move);
        }),
        deleteH: methodOp(function(dir, unit) {
          var sel = this.doc.sel, doc = this.doc;
          if (sel.somethingSelected()) {
            doc.replaceSelection("", null, "+delete");
          } else {
            deleteNearSelection(this, function(range2) {
              var other = findPosH(doc, range2.head, dir, unit, false);
              return dir < 0 ? { from: other, to: range2.head } : { from: range2.head, to: other };
            });
          }
        }),
        findPosV: function(from, amount, unit, goalColumn) {
          var dir = 1, x2 = goalColumn;
          if (amount < 0) {
            dir = -1;
            amount = -amount;
          }
          var cur = clipPos(this.doc, from);
          for (var i3 = 0; i3 < amount; ++i3) {
            var coords = cursorCoords(this, cur, "div");
            if (x2 == null) {
              x2 = coords.left;
            } else {
              coords.left = x2;
            }
            cur = findPosV(this, coords, dir, unit);
            if (cur.hitSide) {
              break;
            }
          }
          return cur;
        },
        moveV: methodOp(function(dir, unit) {
          var this$1$1 = this;
          var doc = this.doc, goals = [];
          var collapse = !this.display.shift && !doc.extend && doc.sel.somethingSelected();
          doc.extendSelectionsBy(function(range2) {
            if (collapse) {
              return dir < 0 ? range2.from() : range2.to();
            }
            var headPos = cursorCoords(this$1$1, range2.head, "div");
            if (range2.goalColumn != null) {
              headPos.left = range2.goalColumn;
            }
            goals.push(headPos.left);
            var pos = findPosV(this$1$1, headPos, dir, unit);
            if (unit == "page" && range2 == doc.sel.primary()) {
              addToScrollTop(this$1$1, charCoords(this$1$1, pos, "div").top - headPos.top);
            }
            return pos;
          }, sel_move);
          if (goals.length) {
            for (var i3 = 0; i3 < doc.sel.ranges.length; i3++) {
              doc.sel.ranges[i3].goalColumn = goals[i3];
            }
          }
        }),
        findWordAt: function(pos) {
          var doc = this.doc, line = getLine(doc, pos.line).text;
          var start = pos.ch, end = pos.ch;
          if (line) {
            var helper = this.getHelper(pos, "wordChars");
            if ((pos.sticky == "before" || end == line.length) && start) {
              --start;
            } else {
              ++end;
            }
            var startChar = line.charAt(start);
            var check = isWordChar(startChar, helper) ? function(ch) {
              return isWordChar(ch, helper);
            } : /\s/.test(startChar) ? function(ch) {
              return /\s/.test(ch);
            } : function(ch) {
              return !/\s/.test(ch) && !isWordChar(ch);
            };
            while (start > 0 && check(line.charAt(start - 1))) {
              --start;
            }
            while (end < line.length && check(line.charAt(end))) {
              ++end;
            }
          }
          return new Range(Pos(pos.line, start), Pos(pos.line, end));
        },
        toggleOverwrite: function(value) {
          if (value != null && value == this.state.overwrite) {
            return;
          }
          if (this.state.overwrite = !this.state.overwrite) {
            addClass(this.display.cursorDiv, "CodeMirror-overwrite");
          } else {
            rmClass(this.display.cursorDiv, "CodeMirror-overwrite");
          }
          signal(this, "overwriteToggle", this, this.state.overwrite);
        },
        hasFocus: function() {
          return this.display.input.getField() == activeElt();
        },
        isReadOnly: function() {
          return !!(this.options.readOnly || this.doc.cantEdit);
        },
        scrollTo: methodOp(function(x2, y) {
          scrollToCoords(this, x2, y);
        }),
        getScrollInfo: function() {
          var scroller = this.display.scroller;
          return {
            left: scroller.scrollLeft,
            top: scroller.scrollTop,
            height: scroller.scrollHeight - scrollGap(this) - this.display.barHeight,
            width: scroller.scrollWidth - scrollGap(this) - this.display.barWidth,
            clientHeight: displayHeight(this),
            clientWidth: displayWidth(this)
          };
        },
        scrollIntoView: methodOp(function(range2, margin) {
          if (range2 == null) {
            range2 = { from: this.doc.sel.primary().head, to: null };
            if (margin == null) {
              margin = this.options.cursorScrollMargin;
            }
          } else if (typeof range2 == "number") {
            range2 = { from: Pos(range2, 0), to: null };
          } else if (range2.from == null) {
            range2 = { from: range2, to: null };
          }
          if (!range2.to) {
            range2.to = range2.from;
          }
          range2.margin = margin || 0;
          if (range2.from.line != null) {
            scrollToRange(this, range2);
          } else {
            scrollToCoordsRange(this, range2.from, range2.to, range2.margin);
          }
        }),
        setSize: methodOp(function(width, height) {
          var this$1$1 = this;
          var interpret = function(val) {
            return typeof val == "number" || /^\d+$/.test(String(val)) ? val + "px" : val;
          };
          if (width != null) {
            this.display.wrapper.style.width = interpret(width);
          }
          if (height != null) {
            this.display.wrapper.style.height = interpret(height);
          }
          if (this.options.lineWrapping) {
            clearLineMeasurementCache(this);
          }
          var lineNo2 = this.display.viewFrom;
          this.doc.iter(lineNo2, this.display.viewTo, function(line) {
            if (line.widgets) {
              for (var i3 = 0; i3 < line.widgets.length; i3++) {
                if (line.widgets[i3].noHScroll) {
                  regLineChange(this$1$1, lineNo2, "widget");
                  break;
                }
              }
            }
            ++lineNo2;
          });
          this.curOp.forceUpdate = true;
          signal(this, "refresh", this);
        }),
        operation: function(f2) {
          return runInOp(this, f2);
        },
        startOperation: function() {
          return startOperation(this);
        },
        endOperation: function() {
          return endOperation(this);
        },
        refresh: methodOp(function() {
          var oldHeight = this.display.cachedTextHeight;
          regChange(this);
          this.curOp.forceUpdate = true;
          clearCaches(this);
          scrollToCoords(this, this.doc.scrollLeft, this.doc.scrollTop);
          updateGutterSpace(this.display);
          if (oldHeight == null || Math.abs(oldHeight - textHeight(this.display)) > 0.5 || this.options.lineWrapping) {
            estimateLineHeights(this);
          }
          signal(this, "refresh", this);
        }),
        swapDoc: methodOp(function(doc) {
          var old = this.doc;
          old.cm = null;
          if (this.state.selectingText) {
            this.state.selectingText();
          }
          attachDoc(this, doc);
          clearCaches(this);
          this.display.input.reset();
          scrollToCoords(this, doc.scrollLeft, doc.scrollTop);
          this.curOp.forceScroll = true;
          signalLater(this, "swapDoc", this, old);
          return old;
        }),
        phrase: function(phraseText) {
          var phrases = this.options.phrases;
          return phrases && Object.prototype.hasOwnProperty.call(phrases, phraseText) ? phrases[phraseText] : phraseText;
        },
        getInputField: function() {
          return this.display.input.getField();
        },
        getWrapperElement: function() {
          return this.display.wrapper;
        },
        getScrollerElement: function() {
          return this.display.scroller;
        },
        getGutterElement: function() {
          return this.display.gutters;
        }
      };
      eventMixin(CodeMirror3);
      CodeMirror3.registerHelper = function(type, name, value) {
        if (!helpers.hasOwnProperty(type)) {
          helpers[type] = CodeMirror3[type] = { _global: [] };
        }
        helpers[type][name] = value;
      };
      CodeMirror3.registerGlobalHelper = function(type, name, predicate, value) {
        CodeMirror3.registerHelper(type, name, value);
        helpers[type]._global.push({ pred: predicate, val: value });
      };
    }
    function findPosH(doc, pos, dir, unit, visually) {
      var oldPos = pos;
      var origDir = dir;
      var lineObj = getLine(doc, pos.line);
      var lineDir = visually && doc.direction == "rtl" ? -dir : dir;
      function findNextLine() {
        var l2 = pos.line + lineDir;
        if (l2 < doc.first || l2 >= doc.first + doc.size) {
          return false;
        }
        pos = new Pos(l2, pos.ch, pos.sticky);
        return lineObj = getLine(doc, l2);
      }
      function moveOnce(boundToLine) {
        var next;
        if (unit == "codepoint") {
          var ch = lineObj.text.charCodeAt(pos.ch + (dir > 0 ? 0 : -1));
          if (isNaN(ch)) {
            next = null;
          } else {
            var astral = dir > 0 ? ch >= 55296 && ch < 56320 : ch >= 56320 && ch < 57343;
            next = new Pos(pos.line, Math.max(0, Math.min(lineObj.text.length, pos.ch + dir * (astral ? 2 : 1))), -dir);
          }
        } else if (visually) {
          next = moveVisually(doc.cm, lineObj, pos, dir);
        } else {
          next = moveLogically(lineObj, pos, dir);
        }
        if (next == null) {
          if (!boundToLine && findNextLine()) {
            pos = endOfLine(visually, doc.cm, lineObj, pos.line, lineDir);
          } else {
            return false;
          }
        } else {
          pos = next;
        }
        return true;
      }
      if (unit == "char" || unit == "codepoint") {
        moveOnce();
      } else if (unit == "column") {
        moveOnce(true);
      } else if (unit == "word" || unit == "group") {
        var sawType = null, group = unit == "group";
        var helper = doc.cm && doc.cm.getHelper(pos, "wordChars");
        for (var first = true; ; first = false) {
          if (dir < 0 && !moveOnce(!first)) {
            break;
          }
          var cur = lineObj.text.charAt(pos.ch) || "\n";
          var type = isWordChar(cur, helper) ? "w" : group && cur == "\n" ? "n" : !group || /\s/.test(cur) ? null : "p";
          if (group && !first && !type) {
            type = "s";
          }
          if (sawType && sawType != type) {
            if (dir < 0) {
              dir = 1;
              moveOnce();
              pos.sticky = "after";
            }
            break;
          }
          if (type) {
            sawType = type;
          }
          if (dir > 0 && !moveOnce(!first)) {
            break;
          }
        }
      }
      var result = skipAtomic(doc, pos, oldPos, origDir, true);
      if (equalCursorPos(oldPos, result)) {
        result.hitSide = true;
      }
      return result;
    }
    function findPosV(cm, pos, dir, unit) {
      var doc = cm.doc, x2 = pos.left, y;
      if (unit == "page") {
        var pageSize = Math.min(cm.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
        var moveAmount = Math.max(pageSize - 0.5 * textHeight(cm.display), 3);
        y = (dir > 0 ? pos.bottom : pos.top) + dir * moveAmount;
      } else if (unit == "line") {
        y = dir > 0 ? pos.bottom + 3 : pos.top - 3;
      }
      var target;
      for (; ; ) {
        target = coordsChar(cm, x2, y);
        if (!target.outside) {
          break;
        }
        if (dir < 0 ? y <= 0 : y >= doc.height) {
          target.hitSide = true;
          break;
        }
        y += dir * 5;
      }
      return target;
    }
    var ContentEditableInput = function(cm) {
      this.cm = cm;
      this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null;
      this.polling = new Delayed();
      this.composing = null;
      this.gracePeriod = false;
      this.readDOMTimeout = null;
    };
    ContentEditableInput.prototype.init = function(display) {
      var this$1$1 = this;
      var input = this, cm = input.cm;
      var div = input.div = display.lineDiv;
      div.contentEditable = true;
      disableBrowserMagic(div, cm.options.spellcheck, cm.options.autocorrect, cm.options.autocapitalize);
      function belongsToInput(e2) {
        for (var t2 = e2.target; t2; t2 = t2.parentNode) {
          if (t2 == div) {
            return true;
          }
          if (/\bCodeMirror-(?:line)?widget\b/.test(t2.className)) {
            break;
          }
        }
        return false;
      }
      on(div, "paste", function(e2) {
        if (!belongsToInput(e2) || signalDOMEvent(cm, e2) || handlePaste(e2, cm)) {
          return;
        }
        if (ie_version <= 11) {
          setTimeout(operation(cm, function() {
            return this$1$1.updateFromDOM();
          }), 20);
        }
      });
      on(div, "compositionstart", function(e2) {
        this$1$1.composing = { data: e2.data, done: false };
      });
      on(div, "compositionupdate", function(e2) {
        if (!this$1$1.composing) {
          this$1$1.composing = { data: e2.data, done: false };
        }
      });
      on(div, "compositionend", function(e2) {
        if (this$1$1.composing) {
          if (e2.data != this$1$1.composing.data) {
            this$1$1.readFromDOMSoon();
          }
          this$1$1.composing.done = true;
        }
      });
      on(div, "touchstart", function() {
        return input.forceCompositionEnd();
      });
      on(div, "input", function() {
        if (!this$1$1.composing) {
          this$1$1.readFromDOMSoon();
        }
      });
      function onCopyCut(e2) {
        if (!belongsToInput(e2) || signalDOMEvent(cm, e2)) {
          return;
        }
        if (cm.somethingSelected()) {
          setLastCopied({ lineWise: false, text: cm.getSelections() });
          if (e2.type == "cut") {
            cm.replaceSelection("", null, "cut");
          }
        } else if (!cm.options.lineWiseCopyCut) {
          return;
        } else {
          var ranges = copyableRanges(cm);
          setLastCopied({ lineWise: true, text: ranges.text });
          if (e2.type == "cut") {
            cm.operation(function() {
              cm.setSelections(ranges.ranges, 0, sel_dontScroll);
              cm.replaceSelection("", null, "cut");
            });
          }
        }
        if (e2.clipboardData) {
          e2.clipboardData.clearData();
          var content = lastCopied.text.join("\n");
          e2.clipboardData.setData("Text", content);
          if (e2.clipboardData.getData("Text") == content) {
            e2.preventDefault();
            return;
          }
        }
        var kludge = hiddenTextarea(), te = kludge.firstChild;
        cm.display.lineSpace.insertBefore(kludge, cm.display.lineSpace.firstChild);
        te.value = lastCopied.text.join("\n");
        var hadFocus = activeElt();
        selectInput(te);
        setTimeout(function() {
          cm.display.lineSpace.removeChild(kludge);
          hadFocus.focus();
          if (hadFocus == div) {
            input.showPrimarySelection();
          }
        }, 50);
      }
      on(div, "copy", onCopyCut);
      on(div, "cut", onCopyCut);
    };
    ContentEditableInput.prototype.screenReaderLabelChanged = function(label) {
      if (label) {
        this.div.setAttribute("aria-label", label);
      } else {
        this.div.removeAttribute("aria-label");
      }
    };
    ContentEditableInput.prototype.prepareSelection = function() {
      var result = prepareSelection(this.cm, false);
      result.focus = activeElt() == this.div;
      return result;
    };
    ContentEditableInput.prototype.showSelection = function(info, takeFocus) {
      if (!info || !this.cm.display.view.length) {
        return;
      }
      if (info.focus || takeFocus) {
        this.showPrimarySelection();
      }
      this.showMultipleSelections(info);
    };
    ContentEditableInput.prototype.getSelection = function() {
      return this.cm.display.wrapper.ownerDocument.getSelection();
    };
    ContentEditableInput.prototype.showPrimarySelection = function() {
      var sel = this.getSelection(), cm = this.cm, prim = cm.doc.sel.primary();
      var from = prim.from(), to = prim.to();
      if (cm.display.viewTo == cm.display.viewFrom || from.line >= cm.display.viewTo || to.line < cm.display.viewFrom) {
        sel.removeAllRanges();
        return;
      }
      var curAnchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
      var curFocus = domToPos(cm, sel.focusNode, sel.focusOffset);
      if (curAnchor && !curAnchor.bad && curFocus && !curFocus.bad && cmp(minPos(curAnchor, curFocus), from) == 0 && cmp(maxPos(curAnchor, curFocus), to) == 0) {
        return;
      }
      var view = cm.display.view;
      var start = from.line >= cm.display.viewFrom && posToDOM(cm, from) || { node: view[0].measure.map[2], offset: 0 };
      var end = to.line < cm.display.viewTo && posToDOM(cm, to);
      if (!end) {
        var measure = view[view.length - 1].measure;
        var map2 = measure.maps ? measure.maps[measure.maps.length - 1] : measure.map;
        end = { node: map2[map2.length - 1], offset: map2[map2.length - 2] - map2[map2.length - 3] };
      }
      if (!start || !end) {
        sel.removeAllRanges();
        return;
      }
      var old = sel.rangeCount && sel.getRangeAt(0), rng;
      try {
        rng = range(start.node, start.offset, end.offset, end.node);
      } catch (e2) {
      }
      if (rng) {
        if (!gecko && cm.state.focused) {
          sel.collapse(start.node, start.offset);
          if (!rng.collapsed) {
            sel.removeAllRanges();
            sel.addRange(rng);
          }
        } else {
          sel.removeAllRanges();
          sel.addRange(rng);
        }
        if (old && sel.anchorNode == null) {
          sel.addRange(old);
        } else if (gecko) {
          this.startGracePeriod();
        }
      }
      this.rememberSelection();
    };
    ContentEditableInput.prototype.startGracePeriod = function() {
      var this$1$1 = this;
      clearTimeout(this.gracePeriod);
      this.gracePeriod = setTimeout(function() {
        this$1$1.gracePeriod = false;
        if (this$1$1.selectionChanged()) {
          this$1$1.cm.operation(function() {
            return this$1$1.cm.curOp.selectionChanged = true;
          });
        }
      }, 20);
    };
    ContentEditableInput.prototype.showMultipleSelections = function(info) {
      removeChildrenAndAdd(this.cm.display.cursorDiv, info.cursors);
      removeChildrenAndAdd(this.cm.display.selectionDiv, info.selection);
    };
    ContentEditableInput.prototype.rememberSelection = function() {
      var sel = this.getSelection();
      this.lastAnchorNode = sel.anchorNode;
      this.lastAnchorOffset = sel.anchorOffset;
      this.lastFocusNode = sel.focusNode;
      this.lastFocusOffset = sel.focusOffset;
    };
    ContentEditableInput.prototype.selectionInEditor = function() {
      var sel = this.getSelection();
      if (!sel.rangeCount) {
        return false;
      }
      var node = sel.getRangeAt(0).commonAncestorContainer;
      return contains(this.div, node);
    };
    ContentEditableInput.prototype.focus = function() {
      if (this.cm.options.readOnly != "nocursor") {
        if (!this.selectionInEditor() || activeElt() != this.div) {
          this.showSelection(this.prepareSelection(), true);
        }
        this.div.focus();
      }
    };
    ContentEditableInput.prototype.blur = function() {
      this.div.blur();
    };
    ContentEditableInput.prototype.getField = function() {
      return this.div;
    };
    ContentEditableInput.prototype.supportsTouch = function() {
      return true;
    };
    ContentEditableInput.prototype.receivedFocus = function() {
      var this$1$1 = this;
      var input = this;
      if (this.selectionInEditor()) {
        setTimeout(function() {
          return this$1$1.pollSelection();
        }, 20);
      } else {
        runInOp(this.cm, function() {
          return input.cm.curOp.selectionChanged = true;
        });
      }
      function poll() {
        if (input.cm.state.focused) {
          input.pollSelection();
          input.polling.set(input.cm.options.pollInterval, poll);
        }
      }
      this.polling.set(this.cm.options.pollInterval, poll);
    };
    ContentEditableInput.prototype.selectionChanged = function() {
      var sel = this.getSelection();
      return sel.anchorNode != this.lastAnchorNode || sel.anchorOffset != this.lastAnchorOffset || sel.focusNode != this.lastFocusNode || sel.focusOffset != this.lastFocusOffset;
    };
    ContentEditableInput.prototype.pollSelection = function() {
      if (this.readDOMTimeout != null || this.gracePeriod || !this.selectionChanged()) {
        return;
      }
      var sel = this.getSelection(), cm = this.cm;
      if (android && chrome && this.cm.display.gutterSpecs.length && isInGutter(sel.anchorNode)) {
        this.cm.triggerOnKeyDown({ type: "keydown", keyCode: 8, preventDefault: Math.abs });
        this.blur();
        this.focus();
        return;
      }
      if (this.composing) {
        return;
      }
      this.rememberSelection();
      var anchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
      var head = domToPos(cm, sel.focusNode, sel.focusOffset);
      if (anchor && head) {
        runInOp(cm, function() {
          setSelection(cm.doc, simpleSelection(anchor, head), sel_dontScroll);
          if (anchor.bad || head.bad) {
            cm.curOp.selectionChanged = true;
          }
        });
      }
    };
    ContentEditableInput.prototype.pollContent = function() {
      if (this.readDOMTimeout != null) {
        clearTimeout(this.readDOMTimeout);
        this.readDOMTimeout = null;
      }
      var cm = this.cm, display = cm.display, sel = cm.doc.sel.primary();
      var from = sel.from(), to = sel.to();
      if (from.ch == 0 && from.line > cm.firstLine()) {
        from = Pos(from.line - 1, getLine(cm.doc, from.line - 1).length);
      }
      if (to.ch == getLine(cm.doc, to.line).text.length && to.line < cm.lastLine()) {
        to = Pos(to.line + 1, 0);
      }
      if (from.line < display.viewFrom || to.line > display.viewTo - 1) {
        return false;
      }
      var fromIndex, fromLine, fromNode;
      if (from.line == display.viewFrom || (fromIndex = findViewIndex(cm, from.line)) == 0) {
        fromLine = lineNo(display.view[0].line);
        fromNode = display.view[0].node;
      } else {
        fromLine = lineNo(display.view[fromIndex].line);
        fromNode = display.view[fromIndex - 1].node.nextSibling;
      }
      var toIndex = findViewIndex(cm, to.line);
      var toLine, toNode;
      if (toIndex == display.view.length - 1) {
        toLine = display.viewTo - 1;
        toNode = display.lineDiv.lastChild;
      } else {
        toLine = lineNo(display.view[toIndex + 1].line) - 1;
        toNode = display.view[toIndex + 1].node.previousSibling;
      }
      if (!fromNode) {
        return false;
      }
      var newText = cm.doc.splitLines(domTextBetween(cm, fromNode, toNode, fromLine, toLine));
      var oldText = getBetween(cm.doc, Pos(fromLine, 0), Pos(toLine, getLine(cm.doc, toLine).text.length));
      while (newText.length > 1 && oldText.length > 1) {
        if (lst(newText) == lst(oldText)) {
          newText.pop();
          oldText.pop();
          toLine--;
        } else if (newText[0] == oldText[0]) {
          newText.shift();
          oldText.shift();
          fromLine++;
        } else {
          break;
        }
      }
      var cutFront = 0, cutEnd = 0;
      var newTop = newText[0], oldTop = oldText[0], maxCutFront = Math.min(newTop.length, oldTop.length);
      while (cutFront < maxCutFront && newTop.charCodeAt(cutFront) == oldTop.charCodeAt(cutFront)) {
        ++cutFront;
      }
      var newBot = lst(newText), oldBot = lst(oldText);
      var maxCutEnd = Math.min(newBot.length - (newText.length == 1 ? cutFront : 0), oldBot.length - (oldText.length == 1 ? cutFront : 0));
      while (cutEnd < maxCutEnd && newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1)) {
        ++cutEnd;
      }
      if (newText.length == 1 && oldText.length == 1 && fromLine == from.line) {
        while (cutFront && cutFront > from.ch && newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1)) {
          cutFront--;
          cutEnd++;
        }
      }
      newText[newText.length - 1] = newBot.slice(0, newBot.length - cutEnd).replace(/^\u200b+/, "");
      newText[0] = newText[0].slice(cutFront).replace(/\u200b+$/, "");
      var chFrom = Pos(fromLine, cutFront);
      var chTo = Pos(toLine, oldText.length ? lst(oldText).length - cutEnd : 0);
      if (newText.length > 1 || newText[0] || cmp(chFrom, chTo)) {
        replaceRange(cm.doc, newText, chFrom, chTo, "+input");
        return true;
      }
    };
    ContentEditableInput.prototype.ensurePolled = function() {
      this.forceCompositionEnd();
    };
    ContentEditableInput.prototype.reset = function() {
      this.forceCompositionEnd();
    };
    ContentEditableInput.prototype.forceCompositionEnd = function() {
      if (!this.composing) {
        return;
      }
      clearTimeout(this.readDOMTimeout);
      this.composing = null;
      this.updateFromDOM();
      this.div.blur();
      this.div.focus();
    };
    ContentEditableInput.prototype.readFromDOMSoon = function() {
      var this$1$1 = this;
      if (this.readDOMTimeout != null) {
        return;
      }
      this.readDOMTimeout = setTimeout(function() {
        this$1$1.readDOMTimeout = null;
        if (this$1$1.composing) {
          if (this$1$1.composing.done) {
            this$1$1.composing = null;
          } else {
            return;
          }
        }
        this$1$1.updateFromDOM();
      }, 80);
    };
    ContentEditableInput.prototype.updateFromDOM = function() {
      var this$1$1 = this;
      if (this.cm.isReadOnly() || !this.pollContent()) {
        runInOp(this.cm, function() {
          return regChange(this$1$1.cm);
        });
      }
    };
    ContentEditableInput.prototype.setUneditable = function(node) {
      node.contentEditable = "false";
    };
    ContentEditableInput.prototype.onKeyPress = function(e2) {
      if (e2.charCode == 0 || this.composing) {
        return;
      }
      e2.preventDefault();
      if (!this.cm.isReadOnly()) {
        operation(this.cm, applyTextInput)(this.cm, String.fromCharCode(e2.charCode == null ? e2.keyCode : e2.charCode), 0);
      }
    };
    ContentEditableInput.prototype.readOnlyChanged = function(val) {
      this.div.contentEditable = String(val != "nocursor");
    };
    ContentEditableInput.prototype.onContextMenu = function() {
    };
    ContentEditableInput.prototype.resetPosition = function() {
    };
    ContentEditableInput.prototype.needsContentAttribute = true;
    function posToDOM(cm, pos) {
      var view = findViewForLine(cm, pos.line);
      if (!view || view.hidden) {
        return null;
      }
      var line = getLine(cm.doc, pos.line);
      var info = mapFromLineView(view, line, pos.line);
      var order = getOrder(line, cm.doc.direction), side = "left";
      if (order) {
        var partPos = getBidiPartAt(order, pos.ch);
        side = partPos % 2 ? "right" : "left";
      }
      var result = nodeAndOffsetInLineMap(info.map, pos.ch, side);
      result.offset = result.collapse == "right" ? result.end : result.start;
      return result;
    }
    function isInGutter(node) {
      for (var scan = node; scan; scan = scan.parentNode) {
        if (/CodeMirror-gutter-wrapper/.test(scan.className)) {
          return true;
        }
      }
      return false;
    }
    function badPos(pos, bad) {
      if (bad) {
        pos.bad = true;
      }
      return pos;
    }
    function domTextBetween(cm, from, to, fromLine, toLine) {
      var text = "", closing = false, lineSep = cm.doc.lineSeparator(), extraLinebreak = false;
      function recognizeMarker(id) {
        return function(marker) {
          return marker.id == id;
        };
      }
      function close() {
        if (closing) {
          text += lineSep;
          if (extraLinebreak) {
            text += lineSep;
          }
          closing = extraLinebreak = false;
        }
      }
      function addText(str) {
        if (str) {
          close();
          text += str;
        }
      }
      function walk(node) {
        if (node.nodeType == 1) {
          var cmText = node.getAttribute("cm-text");
          if (cmText) {
            addText(cmText);
            return;
          }
          var markerID = node.getAttribute("cm-marker"), range2;
          if (markerID) {
            var found = cm.findMarks(Pos(fromLine, 0), Pos(toLine + 1, 0), recognizeMarker(+markerID));
            if (found.length && (range2 = found[0].find(0))) {
              addText(getBetween(cm.doc, range2.from, range2.to).join(lineSep));
            }
            return;
          }
          if (node.getAttribute("contenteditable") == "false") {
            return;
          }
          var isBlock = /^(pre|div|p|li|table|br)$/i.test(node.nodeName);
          if (!/^br$/i.test(node.nodeName) && node.textContent.length == 0) {
            return;
          }
          if (isBlock) {
            close();
          }
          for (var i3 = 0; i3 < node.childNodes.length; i3++) {
            walk(node.childNodes[i3]);
          }
          if (/^(pre|p)$/i.test(node.nodeName)) {
            extraLinebreak = true;
          }
          if (isBlock) {
            closing = true;
          }
        } else if (node.nodeType == 3) {
          addText(node.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
        }
      }
      for (; ; ) {
        walk(from);
        if (from == to) {
          break;
        }
        from = from.nextSibling;
        extraLinebreak = false;
      }
      return text;
    }
    function domToPos(cm, node, offset) {
      var lineNode;
      if (node == cm.display.lineDiv) {
        lineNode = cm.display.lineDiv.childNodes[offset];
        if (!lineNode) {
          return badPos(cm.clipPos(Pos(cm.display.viewTo - 1)), true);
        }
        node = null;
        offset = 0;
      } else {
        for (lineNode = node; ; lineNode = lineNode.parentNode) {
          if (!lineNode || lineNode == cm.display.lineDiv) {
            return null;
          }
          if (lineNode.parentNode && lineNode.parentNode == cm.display.lineDiv) {
            break;
          }
        }
      }
      for (var i3 = 0; i3 < cm.display.view.length; i3++) {
        var lineView = cm.display.view[i3];
        if (lineView.node == lineNode) {
          return locateNodeInLineView(lineView, node, offset);
        }
      }
    }
    function locateNodeInLineView(lineView, node, offset) {
      var wrapper = lineView.text.firstChild, bad = false;
      if (!node || !contains(wrapper, node)) {
        return badPos(Pos(lineNo(lineView.line), 0), true);
      }
      if (node == wrapper) {
        bad = true;
        node = wrapper.childNodes[offset];
        offset = 0;
        if (!node) {
          var line = lineView.rest ? lst(lineView.rest) : lineView.line;
          return badPos(Pos(lineNo(line), line.text.length), bad);
        }
      }
      var textNode = node.nodeType == 3 ? node : null, topNode = node;
      if (!textNode && node.childNodes.length == 1 && node.firstChild.nodeType == 3) {
        textNode = node.firstChild;
        if (offset) {
          offset = textNode.nodeValue.length;
        }
      }
      while (topNode.parentNode != wrapper) {
        topNode = topNode.parentNode;
      }
      var measure = lineView.measure, maps = measure.maps;
      function find(textNode2, topNode2, offset2) {
        for (var i3 = -1; i3 < (maps ? maps.length : 0); i3++) {
          var map2 = i3 < 0 ? measure.map : maps[i3];
          for (var j = 0; j < map2.length; j += 3) {
            var curNode = map2[j + 2];
            if (curNode == textNode2 || curNode == topNode2) {
              var line2 = lineNo(i3 < 0 ? lineView.line : lineView.rest[i3]);
              var ch = map2[j] + offset2;
              if (offset2 < 0 || curNode != textNode2) {
                ch = map2[j + (offset2 ? 1 : 0)];
              }
              return Pos(line2, ch);
            }
          }
        }
      }
      var found = find(textNode, topNode, offset);
      if (found) {
        return badPos(found, bad);
      }
      for (var after = topNode.nextSibling, dist = textNode ? textNode.nodeValue.length - offset : 0; after; after = after.nextSibling) {
        found = find(after, after.firstChild, 0);
        if (found) {
          return badPos(Pos(found.line, found.ch - dist), bad);
        } else {
          dist += after.textContent.length;
        }
      }
      for (var before = topNode.previousSibling, dist$1 = offset; before; before = before.previousSibling) {
        found = find(before, before.firstChild, -1);
        if (found) {
          return badPos(Pos(found.line, found.ch + dist$1), bad);
        } else {
          dist$1 += before.textContent.length;
        }
      }
    }
    var TextareaInput = function(cm) {
      this.cm = cm;
      this.prevInput = "";
      this.pollingFast = false;
      this.polling = new Delayed();
      this.hasSelection = false;
      this.composing = null;
    };
    TextareaInput.prototype.init = function(display) {
      var this$1$1 = this;
      var input = this, cm = this.cm;
      this.createField(display);
      var te = this.textarea;
      display.wrapper.insertBefore(this.wrapper, display.wrapper.firstChild);
      if (ios) {
        te.style.width = "0px";
      }
      on(te, "input", function() {
        if (ie && ie_version >= 9 && this$1$1.hasSelection) {
          this$1$1.hasSelection = null;
        }
        input.poll();
      });
      on(te, "paste", function(e2) {
        if (signalDOMEvent(cm, e2) || handlePaste(e2, cm)) {
          return;
        }
        cm.state.pasteIncoming = +new Date();
        input.fastPoll();
      });
      function prepareCopyCut(e2) {
        if (signalDOMEvent(cm, e2)) {
          return;
        }
        if (cm.somethingSelected()) {
          setLastCopied({ lineWise: false, text: cm.getSelections() });
        } else if (!cm.options.lineWiseCopyCut) {
          return;
        } else {
          var ranges = copyableRanges(cm);
          setLastCopied({ lineWise: true, text: ranges.text });
          if (e2.type == "cut") {
            cm.setSelections(ranges.ranges, null, sel_dontScroll);
          } else {
            input.prevInput = "";
            te.value = ranges.text.join("\n");
            selectInput(te);
          }
        }
        if (e2.type == "cut") {
          cm.state.cutIncoming = +new Date();
        }
      }
      on(te, "cut", prepareCopyCut);
      on(te, "copy", prepareCopyCut);
      on(display.scroller, "paste", function(e2) {
        if (eventInWidget(display, e2) || signalDOMEvent(cm, e2)) {
          return;
        }
        if (!te.dispatchEvent) {
          cm.state.pasteIncoming = +new Date();
          input.focus();
          return;
        }
        var event = new Event("paste");
        event.clipboardData = e2.clipboardData;
        te.dispatchEvent(event);
      });
      on(display.lineSpace, "selectstart", function(e2) {
        if (!eventInWidget(display, e2)) {
          e_preventDefault(e2);
        }
      });
      on(te, "compositionstart", function() {
        var start = cm.getCursor("from");
        if (input.composing) {
          input.composing.range.clear();
        }
        input.composing = {
          start,
          range: cm.markText(start, cm.getCursor("to"), { className: "CodeMirror-composing" })
        };
      });
      on(te, "compositionend", function() {
        if (input.composing) {
          input.poll();
          input.composing.range.clear();
          input.composing = null;
        }
      });
    };
    TextareaInput.prototype.createField = function(_display) {
      this.wrapper = hiddenTextarea();
      this.textarea = this.wrapper.firstChild;
    };
    TextareaInput.prototype.screenReaderLabelChanged = function(label) {
      if (label) {
        this.textarea.setAttribute("aria-label", label);
      } else {
        this.textarea.removeAttribute("aria-label");
      }
    };
    TextareaInput.prototype.prepareSelection = function() {
      var cm = this.cm, display = cm.display, doc = cm.doc;
      var result = prepareSelection(cm);
      if (cm.options.moveInputWithCursor) {
        var headPos = cursorCoords(cm, doc.sel.primary().head, "div");
        var wrapOff = display.wrapper.getBoundingClientRect(), lineOff = display.lineDiv.getBoundingClientRect();
        result.teTop = Math.max(0, Math.min(display.wrapper.clientHeight - 10, headPos.top + lineOff.top - wrapOff.top));
        result.teLeft = Math.max(0, Math.min(display.wrapper.clientWidth - 10, headPos.left + lineOff.left - wrapOff.left));
      }
      return result;
    };
    TextareaInput.prototype.showSelection = function(drawn) {
      var cm = this.cm, display = cm.display;
      removeChildrenAndAdd(display.cursorDiv, drawn.cursors);
      removeChildrenAndAdd(display.selectionDiv, drawn.selection);
      if (drawn.teTop != null) {
        this.wrapper.style.top = drawn.teTop + "px";
        this.wrapper.style.left = drawn.teLeft + "px";
      }
    };
    TextareaInput.prototype.reset = function(typing) {
      if (this.contextMenuPending || this.composing) {
        return;
      }
      var cm = this.cm;
      if (cm.somethingSelected()) {
        this.prevInput = "";
        var content = cm.getSelection();
        this.textarea.value = content;
        if (cm.state.focused) {
          selectInput(this.textarea);
        }
        if (ie && ie_version >= 9) {
          this.hasSelection = content;
        }
      } else if (!typing) {
        this.prevInput = this.textarea.value = "";
        if (ie && ie_version >= 9) {
          this.hasSelection = null;
        }
      }
    };
    TextareaInput.prototype.getField = function() {
      return this.textarea;
    };
    TextareaInput.prototype.supportsTouch = function() {
      return false;
    };
    TextareaInput.prototype.focus = function() {
      if (this.cm.options.readOnly != "nocursor" && (!mobile || activeElt() != this.textarea)) {
        try {
          this.textarea.focus();
        } catch (e2) {
        }
      }
    };
    TextareaInput.prototype.blur = function() {
      this.textarea.blur();
    };
    TextareaInput.prototype.resetPosition = function() {
      this.wrapper.style.top = this.wrapper.style.left = 0;
    };
    TextareaInput.prototype.receivedFocus = function() {
      this.slowPoll();
    };
    TextareaInput.prototype.slowPoll = function() {
      var this$1$1 = this;
      if (this.pollingFast) {
        return;
      }
      this.polling.set(this.cm.options.pollInterval, function() {
        this$1$1.poll();
        if (this$1$1.cm.state.focused) {
          this$1$1.slowPoll();
        }
      });
    };
    TextareaInput.prototype.fastPoll = function() {
      var missed = false, input = this;
      input.pollingFast = true;
      function p2() {
        var changed = input.poll();
        if (!changed && !missed) {
          missed = true;
          input.polling.set(60, p2);
        } else {
          input.pollingFast = false;
          input.slowPoll();
        }
      }
      input.polling.set(20, p2);
    };
    TextareaInput.prototype.poll = function() {
      var this$1$1 = this;
      var cm = this.cm, input = this.textarea, prevInput = this.prevInput;
      if (this.contextMenuPending || !cm.state.focused || hasSelection(input) && !prevInput && !this.composing || cm.isReadOnly() || cm.options.disableInput || cm.state.keySeq) {
        return false;
      }
      var text = input.value;
      if (text == prevInput && !cm.somethingSelected()) {
        return false;
      }
      if (ie && ie_version >= 9 && this.hasSelection === text || mac && /[\uf700-\uf7ff]/.test(text)) {
        cm.display.input.reset();
        return false;
      }
      if (cm.doc.sel == cm.display.selForContextMenu) {
        var first = text.charCodeAt(0);
        if (first == 8203 && !prevInput) {
          prevInput = "\u200B";
        }
        if (first == 8666) {
          this.reset();
          return this.cm.execCommand("undo");
        }
      }
      var same = 0, l2 = Math.min(prevInput.length, text.length);
      while (same < l2 && prevInput.charCodeAt(same) == text.charCodeAt(same)) {
        ++same;
      }
      runInOp(cm, function() {
        applyTextInput(cm, text.slice(same), prevInput.length - same, null, this$1$1.composing ? "*compose" : null);
        if (text.length > 1e3 || text.indexOf("\n") > -1) {
          input.value = this$1$1.prevInput = "";
        } else {
          this$1$1.prevInput = text;
        }
        if (this$1$1.composing) {
          this$1$1.composing.range.clear();
          this$1$1.composing.range = cm.markText(this$1$1.composing.start, cm.getCursor("to"), { className: "CodeMirror-composing" });
        }
      });
      return true;
    };
    TextareaInput.prototype.ensurePolled = function() {
      if (this.pollingFast && this.poll()) {
        this.pollingFast = false;
      }
    };
    TextareaInput.prototype.onKeyPress = function() {
      if (ie && ie_version >= 9) {
        this.hasSelection = null;
      }
      this.fastPoll();
    };
    TextareaInput.prototype.onContextMenu = function(e2) {
      var input = this, cm = input.cm, display = cm.display, te = input.textarea;
      if (input.contextMenuPending) {
        input.contextMenuPending();
      }
      var pos = posFromMouse(cm, e2), scrollPos = display.scroller.scrollTop;
      if (!pos || presto) {
        return;
      }
      var reset = cm.options.resetSelectionOnContextMenu;
      if (reset && cm.doc.sel.contains(pos) == -1) {
        operation(cm, setSelection)(cm.doc, simpleSelection(pos), sel_dontScroll);
      }
      var oldCSS = te.style.cssText, oldWrapperCSS = input.wrapper.style.cssText;
      var wrapperBox = input.wrapper.offsetParent.getBoundingClientRect();
      input.wrapper.style.cssText = "position: static";
      te.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e2.clientY - wrapperBox.top - 5) + "px; left: " + (e2.clientX - wrapperBox.left - 5) + "px;\n      z-index: 1000; background: " + (ie ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
      var oldScrollY;
      if (webkit) {
        oldScrollY = window.scrollY;
      }
      display.input.focus();
      if (webkit) {
        window.scrollTo(null, oldScrollY);
      }
      display.input.reset();
      if (!cm.somethingSelected()) {
        te.value = input.prevInput = " ";
      }
      input.contextMenuPending = rehide;
      display.selForContextMenu = cm.doc.sel;
      clearTimeout(display.detectingSelectAll);
      function prepareSelectAllHack() {
        if (te.selectionStart != null) {
          var selected = cm.somethingSelected();
          var extval = "\u200B" + (selected ? te.value : "");
          te.value = "\u21DA";
          te.value = extval;
          input.prevInput = selected ? "" : "\u200B";
          te.selectionStart = 1;
          te.selectionEnd = extval.length;
          display.selForContextMenu = cm.doc.sel;
        }
      }
      function rehide() {
        if (input.contextMenuPending != rehide) {
          return;
        }
        input.contextMenuPending = false;
        input.wrapper.style.cssText = oldWrapperCSS;
        te.style.cssText = oldCSS;
        if (ie && ie_version < 9) {
          display.scrollbars.setScrollTop(display.scroller.scrollTop = scrollPos);
        }
        if (te.selectionStart != null) {
          if (!ie || ie && ie_version < 9) {
            prepareSelectAllHack();
          }
          var i3 = 0, poll = function() {
            if (display.selForContextMenu == cm.doc.sel && te.selectionStart == 0 && te.selectionEnd > 0 && input.prevInput == "\u200B") {
              operation(cm, selectAll)(cm);
            } else if (i3++ < 10) {
              display.detectingSelectAll = setTimeout(poll, 500);
            } else {
              display.selForContextMenu = null;
              display.input.reset();
            }
          };
          display.detectingSelectAll = setTimeout(poll, 200);
        }
      }
      if (ie && ie_version >= 9) {
        prepareSelectAllHack();
      }
      if (captureRightClick) {
        e_stop(e2);
        var mouseup = function() {
          off(window, "mouseup", mouseup);
          setTimeout(rehide, 20);
        };
        on(window, "mouseup", mouseup);
      } else {
        setTimeout(rehide, 50);
      }
    };
    TextareaInput.prototype.readOnlyChanged = function(val) {
      if (!val) {
        this.reset();
      }
      this.textarea.disabled = val == "nocursor";
      this.textarea.readOnly = !!val;
    };
    TextareaInput.prototype.setUneditable = function() {
    };
    TextareaInput.prototype.needsContentAttribute = false;
    function fromTextArea(textarea, options) {
      options = options ? copyObj(options) : {};
      options.value = textarea.value;
      if (!options.tabindex && textarea.tabIndex) {
        options.tabindex = textarea.tabIndex;
      }
      if (!options.placeholder && textarea.placeholder) {
        options.placeholder = textarea.placeholder;
      }
      if (options.autofocus == null) {
        var hasFocus = activeElt();
        options.autofocus = hasFocus == textarea || textarea.getAttribute("autofocus") != null && hasFocus == document.body;
      }
      function save() {
        textarea.value = cm.getValue();
      }
      var realSubmit;
      if (textarea.form) {
        on(textarea.form, "submit", save);
        if (!options.leaveSubmitMethodAlone) {
          var form = textarea.form;
          realSubmit = form.submit;
          try {
            var wrappedSubmit = form.submit = function() {
              save();
              form.submit = realSubmit;
              form.submit();
              form.submit = wrappedSubmit;
            };
          } catch (e2) {
          }
        }
      }
      options.finishInit = function(cm2) {
        cm2.save = save;
        cm2.getTextArea = function() {
          return textarea;
        };
        cm2.toTextArea = function() {
          cm2.toTextArea = isNaN;
          save();
          textarea.parentNode.removeChild(cm2.getWrapperElement());
          textarea.style.display = "";
          if (textarea.form) {
            off(textarea.form, "submit", save);
            if (!options.leaveSubmitMethodAlone && typeof textarea.form.submit == "function") {
              textarea.form.submit = realSubmit;
            }
          }
        };
      };
      textarea.style.display = "none";
      var cm = CodeMirror2(function(node) {
        return textarea.parentNode.insertBefore(node, textarea.nextSibling);
      }, options);
      return cm;
    }
    function addLegacyProps(CodeMirror3) {
      CodeMirror3.off = off;
      CodeMirror3.on = on;
      CodeMirror3.wheelEventPixels = wheelEventPixels;
      CodeMirror3.Doc = Doc;
      CodeMirror3.splitLines = splitLinesAuto;
      CodeMirror3.countColumn = countColumn;
      CodeMirror3.findColumn = findColumn;
      CodeMirror3.isWordChar = isWordCharBasic;
      CodeMirror3.Pass = Pass;
      CodeMirror3.signal = signal;
      CodeMirror3.Line = Line;
      CodeMirror3.changeEnd = changeEnd;
      CodeMirror3.scrollbarModel = scrollbarModel;
      CodeMirror3.Pos = Pos;
      CodeMirror3.cmpPos = cmp;
      CodeMirror3.modes = modes;
      CodeMirror3.mimeModes = mimeModes;
      CodeMirror3.resolveMode = resolveMode;
      CodeMirror3.getMode = getMode;
      CodeMirror3.modeExtensions = modeExtensions;
      CodeMirror3.extendMode = extendMode;
      CodeMirror3.copyState = copyState;
      CodeMirror3.startState = startState;
      CodeMirror3.innerMode = innerMode;
      CodeMirror3.commands = commands;
      CodeMirror3.keyMap = keyMap;
      CodeMirror3.keyName = keyName;
      CodeMirror3.isModifierKey = isModifierKey;
      CodeMirror3.lookupKey = lookupKey;
      CodeMirror3.normalizeKeyMap = normalizeKeyMap;
      CodeMirror3.StringStream = StringStream;
      CodeMirror3.SharedTextMarker = SharedTextMarker;
      CodeMirror3.TextMarker = TextMarker;
      CodeMirror3.LineWidget = LineWidget;
      CodeMirror3.e_preventDefault = e_preventDefault;
      CodeMirror3.e_stopPropagation = e_stopPropagation;
      CodeMirror3.e_stop = e_stop;
      CodeMirror3.addClass = addClass;
      CodeMirror3.contains = contains;
      CodeMirror3.rmClass = rmClass;
      CodeMirror3.keyNames = keyNames;
    }
    defineOptions(CodeMirror2);
    addEditorMethods(CodeMirror2);
    var dontDelegate = "iter insert remove copy getEditor constructor".split(" ");
    for (var prop in Doc.prototype) {
      if (Doc.prototype.hasOwnProperty(prop) && indexOf(dontDelegate, prop) < 0) {
        CodeMirror2.prototype[prop] = function(method) {
          return function() {
            return method.apply(this.doc, arguments);
          };
        }(Doc.prototype[prop]);
      }
    }
    eventMixin(Doc);
    CodeMirror2.inputStyles = { "textarea": TextareaInput, "contenteditable": ContentEditableInput };
    CodeMirror2.defineMode = function(name) {
      if (!CodeMirror2.defaults.mode && name != "null") {
        CodeMirror2.defaults.mode = name;
      }
      defineMode.apply(this, arguments);
    };
    CodeMirror2.defineMIME = defineMIME;
    CodeMirror2.defineMode("null", function() {
      return { token: function(stream) {
        return stream.skipToEnd();
      } };
    });
    CodeMirror2.defineMIME("text/plain", "null");
    CodeMirror2.defineExtension = function(name, func) {
      CodeMirror2.prototype[name] = func;
    };
    CodeMirror2.defineDocExtension = function(name, func) {
      Doc.prototype[name] = func;
    };
    CodeMirror2.fromTextArea = fromTextArea;
    addLegacyProps(CodeMirror2);
    CodeMirror2.version = "5.63.0";
    return CodeMirror2;
  });
})(codemirror);
var CodeMirror = codemirror.exports;
var codemirrorStyles = '.CodeMirror{font-family:monospace;height:300px;color:#000;direction:ltr}.CodeMirror-lines{padding:4px 0}.CodeMirror pre.CodeMirror-line,.CodeMirror pre.CodeMirror-line-like{padding:0 4px}.CodeMirror-scrollbar-filler,.CodeMirror-gutter-filler{background-color:#fff}.CodeMirror-gutters{border-right:1px solid #ddd;background-color:#f7f7f7;white-space:nowrap}.CodeMirror-linenumber{padding:0 3px 0 5px;min-width:20px;text-align:right;color:#999;white-space:nowrap}.CodeMirror-guttermarker{color:#000}.CodeMirror-guttermarker-subtle{color:#999}.CodeMirror-cursor{border-left:1px solid black;border-right:none;width:0}.CodeMirror div.CodeMirror-secondarycursor{border-left:1px solid silver}.cm-fat-cursor .CodeMirror-cursor{width:auto;border:0!important;background:#7e7}.cm-fat-cursor div.CodeMirror-cursors{z-index:1}.cm-fat-cursor-mark{background-color:#14ff1480;-webkit-animation:blink 1.06s steps(1) infinite;-moz-animation:blink 1.06s steps(1) infinite;animation:blink 1.06s steps(1) infinite}.cm-animate-fat-cursor{width:auto;-webkit-animation:blink 1.06s steps(1) infinite;-moz-animation:blink 1.06s steps(1) infinite;animation:blink 1.06s steps(1) infinite;background-color:#7e7}@-moz-keyframes blink{50%{background-color:transparent}}@-webkit-keyframes blink{50%{background-color:transparent}}@keyframes blink{50%{background-color:transparent}}.cm-tab{display:inline-block;text-decoration:inherit}.CodeMirror-rulers{position:absolute;left:0;right:0;top:-50px;bottom:0;overflow:hidden}.CodeMirror-ruler{border-left:1px solid #ccc;top:0;bottom:0;position:absolute}.cm-s-default .cm-header{color:#00f}.cm-s-default .cm-quote{color:#090}.cm-negative{color:#d44}.cm-positive{color:#292}.cm-header,.cm-strong{font-weight:700}.cm-em{font-style:italic}.cm-link{text-decoration:underline}.cm-strikethrough{text-decoration:line-through}.cm-s-default .cm-keyword{color:#708}.cm-s-default .cm-atom{color:#219}.cm-s-default .cm-number{color:#164}.cm-s-default .cm-def{color:#00f}.cm-s-default .cm-variable-2{color:#05a}.cm-s-default .cm-variable-3,.cm-s-default .cm-type{color:#085}.cm-s-default .cm-comment{color:#a50}.cm-s-default .cm-string{color:#a11}.cm-s-default .cm-string-2{color:#f50}.cm-s-default .cm-meta,.cm-s-default .cm-qualifier{color:#555}.cm-s-default .cm-builtin{color:#30a}.cm-s-default .cm-bracket{color:#997}.cm-s-default .cm-tag{color:#170}.cm-s-default .cm-attribute{color:#00c}.cm-s-default .cm-hr{color:#999}.cm-s-default .cm-link{color:#00c}.cm-s-default .cm-error,.cm-invalidchar{color:red}.CodeMirror-composing{border-bottom:2px solid}div.CodeMirror span.CodeMirror-matchingbracket{color:#0b0}div.CodeMirror span.CodeMirror-nonmatchingbracket{color:#a22}.CodeMirror-matchingtag{background:rgba(255,150,0,.3)}.CodeMirror-activeline-background{background:#e8f2ff}.CodeMirror{position:relative;overflow:hidden;background:white}.CodeMirror-scroll{overflow:scroll!important;margin-bottom:-50px;margin-right:-50px;padding-bottom:50px;height:100%;outline:none;position:relative}.CodeMirror-sizer{position:relative;border-right:50px solid transparent}.CodeMirror-vscrollbar,.CodeMirror-hscrollbar,.CodeMirror-scrollbar-filler,.CodeMirror-gutter-filler{position:absolute;z-index:6;display:none;outline:none}.CodeMirror-vscrollbar{right:0;top:0;overflow-x:hidden;overflow-y:scroll}.CodeMirror-hscrollbar{bottom:0;left:0;overflow-y:hidden;overflow-x:scroll}.CodeMirror-scrollbar-filler{right:0;bottom:0}.CodeMirror-gutter-filler{left:0;bottom:0}.CodeMirror-gutters{position:absolute;left:0;top:0;min-height:100%;z-index:3}.CodeMirror-gutter{white-space:normal;height:100%;display:inline-block;vertical-align:top;margin-bottom:-50px}.CodeMirror-gutter-wrapper{position:absolute;z-index:4;background:none!important;border:none!important}.CodeMirror-gutter-background{position:absolute;top:0;bottom:0;z-index:4}.CodeMirror-gutter-elt{position:absolute;cursor:default;z-index:4}.CodeMirror-gutter-wrapper ::selection{background-color:transparent}.CodeMirror-gutter-wrapper ::-moz-selection{background-color:transparent}.CodeMirror-lines{cursor:text;min-height:1px}.CodeMirror pre.CodeMirror-line,.CodeMirror pre.CodeMirror-line-like{-moz-border-radius:0;-webkit-border-radius:0;border-radius:0;border-width:0;background:transparent;font-family:inherit;font-size:inherit;margin:0;white-space:pre;word-wrap:normal;line-height:inherit;color:inherit;z-index:2;position:relative;overflow:visible;-webkit-tap-highlight-color:transparent;-webkit-font-variant-ligatures:contextual;font-variant-ligatures:contextual}.CodeMirror-wrap pre.CodeMirror-line,.CodeMirror-wrap pre.CodeMirror-line-like{word-wrap:break-word;white-space:pre-wrap;word-break:normal}.CodeMirror-linebackground{position:absolute;left:0;right:0;top:0;bottom:0;z-index:0}.CodeMirror-linewidget{position:relative;z-index:2;padding:.1px}.CodeMirror-rtl pre{direction:rtl}.CodeMirror-code{outline:none}.CodeMirror-scroll,.CodeMirror-sizer,.CodeMirror-gutter,.CodeMirror-gutters,.CodeMirror-linenumber{-moz-box-sizing:content-box;box-sizing:content-box}.CodeMirror-measure{position:absolute;width:100%;height:0;overflow:hidden;visibility:hidden}.CodeMirror-cursor{position:absolute;pointer-events:none}.CodeMirror-measure pre{position:static}div.CodeMirror-cursors{visibility:hidden;position:relative;z-index:3}div.CodeMirror-dragcursors,.CodeMirror-focused div.CodeMirror-cursors{visibility:visible}.CodeMirror-selected{background:#d9d9d9}.CodeMirror-focused .CodeMirror-selected{background:#d7d4f0}.CodeMirror-crosshair{cursor:crosshair}.CodeMirror-line::selection,.CodeMirror-line>span::selection,.CodeMirror-line>span>span::selection{background:#d7d4f0}.CodeMirror-line::-moz-selection,.CodeMirror-line>span::-moz-selection,.CodeMirror-line>span>span::-moz-selection{background:#d7d4f0}.cm-searching{background-color:#ffa;background-color:#ff06}.cm-force-border{padding-right:.1px}@media print{.CodeMirror div.CodeMirror-cursors{visibility:hidden}}.cm-tab-wrap-hack:after{content:""}span.CodeMirror-selectedtext{background:none}\n';
(function(module, exports) {
  (function(mod) {
    mod(codemirror.exports);
  })(function(CodeMirror2) {
    var HINT_ELEMENT_CLASS = "CodeMirror-hint";
    var ACTIVE_HINT_ELEMENT_CLASS = "CodeMirror-hint-active";
    CodeMirror2.showHint = function(cm, getHints, options) {
      if (!getHints)
        return cm.showHint(options);
      if (options && options.async)
        getHints.async = true;
      var newOpts = { hint: getHints };
      if (options)
        for (var prop in options)
          newOpts[prop] = options[prop];
      return cm.showHint(newOpts);
    };
    CodeMirror2.defineExtension("showHint", function(options) {
      options = parseOptions(this, this.getCursor("start"), options);
      var selections = this.listSelections();
      if (selections.length > 1)
        return;
      if (this.somethingSelected()) {
        if (!options.hint.supportsSelection)
          return;
        for (var i2 = 0; i2 < selections.length; i2++)
          if (selections[i2].head.line != selections[i2].anchor.line)
            return;
      }
      if (this.state.completionActive)
        this.state.completionActive.close();
      var completion = this.state.completionActive = new Completion(this, options);
      if (!completion.options.hint)
        return;
      CodeMirror2.signal(this, "startCompletion", this);
      completion.update(true);
    });
    CodeMirror2.defineExtension("closeHint", function() {
      if (this.state.completionActive)
        this.state.completionActive.close();
    });
    function Completion(cm, options) {
      this.cm = cm;
      this.options = options;
      this.widget = null;
      this.debounce = 0;
      this.tick = 0;
      this.startPos = this.cm.getCursor("start");
      this.startLen = this.cm.getLine(this.startPos.line).length - this.cm.getSelection().length;
      if (this.options.updateOnCursorActivity) {
        var self2 = this;
        cm.on("cursorActivity", this.activityFunc = function() {
          self2.cursorActivity();
        });
      }
    }
    var requestAnimationFrame = window.requestAnimationFrame || function(fn) {
      return setTimeout(fn, 1e3 / 60);
    };
    var cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;
    Completion.prototype = {
      close: function() {
        if (!this.active())
          return;
        this.cm.state.completionActive = null;
        this.tick = null;
        if (this.options.updateOnCursorActivity) {
          this.cm.off("cursorActivity", this.activityFunc);
        }
        if (this.widget && this.data)
          CodeMirror2.signal(this.data, "close");
        if (this.widget)
          this.widget.close();
        CodeMirror2.signal(this.cm, "endCompletion", this.cm);
      },
      active: function() {
        return this.cm.state.completionActive == this;
      },
      pick: function(data, i2) {
        var completion = data.list[i2], self2 = this;
        this.cm.operation(function() {
          if (completion.hint)
            completion.hint(self2.cm, data, completion);
          else
            self2.cm.replaceRange(getText(completion), completion.from || data.from, completion.to || data.to, "complete");
          CodeMirror2.signal(data, "pick", completion);
          self2.cm.scrollIntoView();
        });
        if (this.options.closeOnPick) {
          this.close();
        }
      },
      cursorActivity: function() {
        if (this.debounce) {
          cancelAnimationFrame(this.debounce);
          this.debounce = 0;
        }
        var identStart = this.startPos;
        if (this.data) {
          identStart = this.data.from;
        }
        var pos = this.cm.getCursor(), line = this.cm.getLine(pos.line);
        if (pos.line != this.startPos.line || line.length - pos.ch != this.startLen - this.startPos.ch || pos.ch < identStart.ch || this.cm.somethingSelected() || (!pos.ch || this.options.closeCharacters.test(line.charAt(pos.ch - 1)))) {
          this.close();
        } else {
          var self2 = this;
          this.debounce = requestAnimationFrame(function() {
            self2.update();
          });
          if (this.widget)
            this.widget.disable();
        }
      },
      update: function(first) {
        if (this.tick == null)
          return;
        var self2 = this, myTick = ++this.tick;
        fetchHints(this.options.hint, this.cm, this.options, function(data) {
          if (self2.tick == myTick)
            self2.finishUpdate(data, first);
        });
      },
      finishUpdate: function(data, first) {
        if (this.data)
          CodeMirror2.signal(this.data, "update");
        var picked = this.widget && this.widget.picked || first && this.options.completeSingle;
        if (this.widget)
          this.widget.close();
        this.data = data;
        if (data && data.list.length) {
          if (picked && data.list.length == 1) {
            this.pick(data, 0);
          } else {
            this.widget = new Widget(this, data);
            CodeMirror2.signal(data, "shown");
          }
        }
      }
    };
    function parseOptions(cm, pos, options) {
      var editor = cm.options.hintOptions;
      var out = {};
      for (var prop in defaultOptions)
        out[prop] = defaultOptions[prop];
      if (editor) {
        for (var prop in editor)
          if (editor[prop] !== void 0)
            out[prop] = editor[prop];
      }
      if (options) {
        for (var prop in options)
          if (options[prop] !== void 0)
            out[prop] = options[prop];
      }
      if (out.hint.resolve)
        out.hint = out.hint.resolve(cm, pos);
      return out;
    }
    function getText(completion) {
      if (typeof completion == "string")
        return completion;
      else
        return completion.text;
    }
    function buildKeyMap(completion, handle) {
      var baseMap = {
        Up: function() {
          handle.moveFocus(-1);
        },
        Down: function() {
          handle.moveFocus(1);
        },
        PageUp: function() {
          handle.moveFocus(-handle.menuSize() + 1, true);
        },
        PageDown: function() {
          handle.moveFocus(handle.menuSize() - 1, true);
        },
        Home: function() {
          handle.setFocus(0);
        },
        End: function() {
          handle.setFocus(handle.length - 1);
        },
        Enter: handle.pick,
        Tab: handle.pick,
        Esc: handle.close
      };
      var mac = /Mac/.test(navigator.platform);
      if (mac) {
        baseMap["Ctrl-P"] = function() {
          handle.moveFocus(-1);
        };
        baseMap["Ctrl-N"] = function() {
          handle.moveFocus(1);
        };
      }
      var custom = completion.options.customKeys;
      var ourMap = custom ? {} : baseMap;
      function addBinding(key2, val) {
        var bound;
        if (typeof val != "string")
          bound = function(cm) {
            return val(cm, handle);
          };
        else if (baseMap.hasOwnProperty(val))
          bound = baseMap[val];
        else
          bound = val;
        ourMap[key2] = bound;
      }
      if (custom) {
        for (var key in custom)
          if (custom.hasOwnProperty(key))
            addBinding(key, custom[key]);
      }
      var extra = completion.options.extraKeys;
      if (extra) {
        for (var key in extra)
          if (extra.hasOwnProperty(key))
            addBinding(key, extra[key]);
      }
      return ourMap;
    }
    function getHintElement(hintsElement, el) {
      while (el && el != hintsElement) {
        if (el.nodeName.toUpperCase() === "LI" && el.parentNode == hintsElement)
          return el;
        el = el.parentNode;
      }
    }
    function Widget(completion, data) {
      this.id = "cm-complete-" + Math.floor(Math.random(1e6));
      this.completion = completion;
      this.data = data;
      this.picked = false;
      var widget = this, cm = completion.cm;
      var ownerDocument = cm.getInputField().ownerDocument;
      var parentWindow = ownerDocument.defaultView || ownerDocument.parentWindow;
      var hints = this.hints = ownerDocument.createElement("ul");
      hints.setAttribute("role", "listbox");
      hints.setAttribute("aria-expanded", "true");
      hints.id = this.id;
      var theme = completion.cm.options.theme;
      hints.className = "CodeMirror-hints " + theme;
      this.selectedHint = data.selectedHint || 0;
      var completions = data.list;
      for (var i2 = 0; i2 < completions.length; ++i2) {
        var elt = hints.appendChild(ownerDocument.createElement("li")), cur = completions[i2];
        var className = HINT_ELEMENT_CLASS + (i2 != this.selectedHint ? "" : " " + ACTIVE_HINT_ELEMENT_CLASS);
        if (cur.className != null)
          className = cur.className + " " + className;
        elt.className = className;
        if (i2 == this.selectedHint)
          elt.setAttribute("aria-selected", "true");
        elt.id = this.id + "-" + i2;
        elt.setAttribute("role", "option");
        if (cur.render)
          cur.render(elt, data, cur);
        else
          elt.appendChild(ownerDocument.createTextNode(cur.displayText || getText(cur)));
        elt.hintId = i2;
      }
      var container = completion.options.container || ownerDocument.body;
      var pos = cm.cursorCoords(completion.options.alignWithWord ? data.from : null);
      var left = pos.left, top = pos.bottom, below = true;
      var offsetLeft = 0, offsetTop = 0;
      if (container !== ownerDocument.body) {
        var isContainerPositioned = ["absolute", "relative", "fixed"].indexOf(parentWindow.getComputedStyle(container).position) !== -1;
        var offsetParent = isContainerPositioned ? container : container.offsetParent;
        var offsetParentPosition = offsetParent.getBoundingClientRect();
        var bodyPosition = ownerDocument.body.getBoundingClientRect();
        offsetLeft = offsetParentPosition.left - bodyPosition.left - offsetParent.scrollLeft;
        offsetTop = offsetParentPosition.top - bodyPosition.top - offsetParent.scrollTop;
      }
      hints.style.left = left - offsetLeft + "px";
      hints.style.top = top - offsetTop + "px";
      var winW = parentWindow.innerWidth || Math.max(ownerDocument.body.offsetWidth, ownerDocument.documentElement.offsetWidth);
      var winH = parentWindow.innerHeight || Math.max(ownerDocument.body.offsetHeight, ownerDocument.documentElement.offsetHeight);
      container.appendChild(hints);
      cm.getInputField().setAttribute("aria-autocomplete", "list");
      cm.getInputField().setAttribute("aria-owns", this.id);
      cm.getInputField().setAttribute("aria-activedescendant", this.id + "-" + this.selectedHint);
      var box = completion.options.moveOnOverlap ? hints.getBoundingClientRect() : new DOMRect();
      var scrolls = completion.options.paddingForScrollbar ? hints.scrollHeight > hints.clientHeight + 1 : false;
      var startScroll;
      setTimeout(function() {
        startScroll = cm.getScrollInfo();
      });
      var overlapY = box.bottom - winH;
      if (overlapY > 0) {
        var height = box.bottom - box.top, curTop = pos.top - (pos.bottom - box.top);
        if (curTop - height > 0) {
          hints.style.top = (top = pos.top - height - offsetTop) + "px";
          below = false;
        } else if (height > winH) {
          hints.style.height = winH - 5 + "px";
          hints.style.top = (top = pos.bottom - box.top - offsetTop) + "px";
          var cursor = cm.getCursor();
          if (data.from.ch != cursor.ch) {
            pos = cm.cursorCoords(cursor);
            hints.style.left = (left = pos.left - offsetLeft) + "px";
            box = hints.getBoundingClientRect();
          }
        }
      }
      var overlapX = box.right - winW;
      if (scrolls)
        overlapX += cm.display.nativeBarWidth;
      if (overlapX > 0) {
        if (box.right - box.left > winW) {
          hints.style.width = winW - 5 + "px";
          overlapX -= box.right - box.left - winW;
        }
        hints.style.left = (left = pos.left - overlapX - offsetLeft) + "px";
      }
      if (scrolls)
        for (var node = hints.firstChild; node; node = node.nextSibling)
          node.style.paddingRight = cm.display.nativeBarWidth + "px";
      cm.addKeyMap(this.keyMap = buildKeyMap(completion, {
        moveFocus: function(n2, avoidWrap) {
          widget.changeActive(widget.selectedHint + n2, avoidWrap);
        },
        setFocus: function(n2) {
          widget.changeActive(n2);
        },
        menuSize: function() {
          return widget.screenAmount();
        },
        length: completions.length,
        close: function() {
          completion.close();
        },
        pick: function() {
          widget.pick();
        },
        data
      }));
      if (completion.options.closeOnUnfocus) {
        var closingOnBlur;
        cm.on("blur", this.onBlur = function() {
          closingOnBlur = setTimeout(function() {
            completion.close();
          }, 100);
        });
        cm.on("focus", this.onFocus = function() {
          clearTimeout(closingOnBlur);
        });
      }
      cm.on("scroll", this.onScroll = function() {
        var curScroll = cm.getScrollInfo(), editor = cm.getWrapperElement().getBoundingClientRect();
        if (!startScroll)
          startScroll = cm.getScrollInfo();
        var newTop = top + startScroll.top - curScroll.top;
        var point = newTop - (parentWindow.pageYOffset || (ownerDocument.documentElement || ownerDocument.body).scrollTop);
        if (!below)
          point += hints.offsetHeight;
        if (point <= editor.top || point >= editor.bottom)
          return completion.close();
        hints.style.top = newTop + "px";
        hints.style.left = left + startScroll.left - curScroll.left + "px";
      });
      CodeMirror2.on(hints, "dblclick", function(e2) {
        var t2 = getHintElement(hints, e2.target || e2.srcElement);
        if (t2 && t2.hintId != null) {
          widget.changeActive(t2.hintId);
          widget.pick();
        }
      });
      CodeMirror2.on(hints, "click", function(e2) {
        var t2 = getHintElement(hints, e2.target || e2.srcElement);
        if (t2 && t2.hintId != null) {
          widget.changeActive(t2.hintId);
          if (completion.options.completeOnSingleClick)
            widget.pick();
        }
      });
      CodeMirror2.on(hints, "mousedown", function() {
        setTimeout(function() {
          cm.focus();
        }, 20);
      });
      var selectedHintRange = this.getSelectedHintRange();
      if (selectedHintRange.from !== 0 || selectedHintRange.to !== 0) {
        this.scrollToActive();
      }
      CodeMirror2.signal(data, "select", completions[this.selectedHint], hints.childNodes[this.selectedHint]);
      return true;
    }
    Widget.prototype = {
      close: function() {
        if (this.completion.widget != this)
          return;
        this.completion.widget = null;
        if (this.hints.parentNode)
          this.hints.parentNode.removeChild(this.hints);
        this.completion.cm.removeKeyMap(this.keyMap);
        var input = this.completion.cm.getInputField();
        input.removeAttribute("aria-activedescendant");
        input.removeAttribute("aria-owns");
        var cm = this.completion.cm;
        if (this.completion.options.closeOnUnfocus) {
          cm.off("blur", this.onBlur);
          cm.off("focus", this.onFocus);
        }
        cm.off("scroll", this.onScroll);
      },
      disable: function() {
        this.completion.cm.removeKeyMap(this.keyMap);
        var widget = this;
        this.keyMap = { Enter: function() {
          widget.picked = true;
        } };
        this.completion.cm.addKeyMap(this.keyMap);
      },
      pick: function() {
        this.completion.pick(this.data, this.selectedHint);
      },
      changeActive: function(i2, avoidWrap) {
        if (i2 >= this.data.list.length)
          i2 = avoidWrap ? this.data.list.length - 1 : 0;
        else if (i2 < 0)
          i2 = avoidWrap ? 0 : this.data.list.length - 1;
        if (this.selectedHint == i2)
          return;
        var node = this.hints.childNodes[this.selectedHint];
        if (node) {
          node.className = node.className.replace(" " + ACTIVE_HINT_ELEMENT_CLASS, "");
          node.removeAttribute("aria-selected");
        }
        node = this.hints.childNodes[this.selectedHint = i2];
        node.className += " " + ACTIVE_HINT_ELEMENT_CLASS;
        node.setAttribute("aria-selected", "true");
        this.completion.cm.getInputField().setAttribute("aria-activedescendant", node.id);
        this.scrollToActive();
        CodeMirror2.signal(this.data, "select", this.data.list[this.selectedHint], node);
      },
      scrollToActive: function() {
        var selectedHintRange = this.getSelectedHintRange();
        var node1 = this.hints.childNodes[selectedHintRange.from];
        var node2 = this.hints.childNodes[selectedHintRange.to];
        var firstNode = this.hints.firstChild;
        if (node1.offsetTop < this.hints.scrollTop)
          this.hints.scrollTop = node1.offsetTop - firstNode.offsetTop;
        else if (node2.offsetTop + node2.offsetHeight > this.hints.scrollTop + this.hints.clientHeight)
          this.hints.scrollTop = node2.offsetTop + node2.offsetHeight - this.hints.clientHeight + firstNode.offsetTop;
      },
      screenAmount: function() {
        return Math.floor(this.hints.clientHeight / this.hints.firstChild.offsetHeight) || 1;
      },
      getSelectedHintRange: function() {
        var margin = this.completion.options.scrollMargin || 0;
        return {
          from: Math.max(0, this.selectedHint - margin),
          to: Math.min(this.data.list.length - 1, this.selectedHint + margin)
        };
      }
    };
    function applicableHelpers(cm, helpers) {
      if (!cm.somethingSelected())
        return helpers;
      var result = [];
      for (var i2 = 0; i2 < helpers.length; i2++)
        if (helpers[i2].supportsSelection)
          result.push(helpers[i2]);
      return result;
    }
    function fetchHints(hint, cm, options, callback) {
      if (hint.async) {
        hint(cm, callback, options);
      } else {
        var result = hint(cm, options);
        if (result && result.then)
          result.then(callback);
        else
          callback(result);
      }
    }
    function resolveAutoHints(cm, pos) {
      var helpers = cm.getHelpers(pos, "hint"), words;
      if (helpers.length) {
        var resolved = function(cm2, callback, options) {
          var app = applicableHelpers(cm2, helpers);
          function run(i2) {
            if (i2 == app.length)
              return callback(null);
            fetchHints(app[i2], cm2, options, function(result) {
              if (result && result.list.length > 0)
                callback(result);
              else
                run(i2 + 1);
            });
          }
          run(0);
        };
        resolved.async = true;
        resolved.supportsSelection = true;
        return resolved;
      } else if (words = cm.getHelper(cm.getCursor(), "hintWords")) {
        return function(cm2) {
          return CodeMirror2.hint.fromList(cm2, { words });
        };
      } else if (CodeMirror2.hint.anyword) {
        return function(cm2, options) {
          return CodeMirror2.hint.anyword(cm2, options);
        };
      } else {
        return function() {
        };
      }
    }
    CodeMirror2.registerHelper("hint", "auto", {
      resolve: resolveAutoHints
    });
    CodeMirror2.registerHelper("hint", "fromList", function(cm, options) {
      var cur = cm.getCursor(), token = cm.getTokenAt(cur);
      var term, from = CodeMirror2.Pos(cur.line, token.start), to = cur;
      if (token.start < cur.ch && /\w/.test(token.string.charAt(cur.ch - token.start - 1))) {
        term = token.string.substr(0, cur.ch - token.start);
      } else {
        term = "";
        from = cur;
      }
      var found = [];
      for (var i2 = 0; i2 < options.words.length; i2++) {
        var word = options.words[i2];
        if (word.slice(0, term.length) == term)
          found.push(word);
      }
      if (found.length)
        return { list: found, from, to };
    });
    CodeMirror2.commands.autocomplete = CodeMirror2.showHint;
    var defaultOptions = {
      hint: CodeMirror2.hint.auto,
      completeSingle: true,
      alignWithWord: true,
      closeCharacters: /[\s()\[\]{};:>,]/,
      closeOnPick: true,
      closeOnUnfocus: true,
      updateOnCursorActivity: true,
      completeOnSingleClick: true,
      container: null,
      customKeys: null,
      extraKeys: null,
      paddingForScrollbar: true,
      moveOnOverlap: true
    };
    CodeMirror2.defineOption("hintOptions", null);
  });
})();
(function(module, exports) {
  (function(mod) {
    mod(codemirror.exports);
  })(function(CodeMirror2) {
    function doFold(cm, pos, options, force) {
      if (options && options.call) {
        var finder = options;
        options = null;
      } else {
        var finder = getOption(cm, options, "rangeFinder");
      }
      if (typeof pos == "number")
        pos = CodeMirror2.Pos(pos, 0);
      var minSize = getOption(cm, options, "minFoldSize");
      function getRange(allowFolded) {
        var range2 = finder(cm, pos);
        if (!range2 || range2.to.line - range2.from.line < minSize)
          return null;
        if (force === "fold")
          return range2;
        var marks = cm.findMarksAt(range2.from);
        for (var i2 = 0; i2 < marks.length; ++i2) {
          if (marks[i2].__isFold) {
            if (!allowFolded)
              return null;
            range2.cleared = true;
            marks[i2].clear();
          }
        }
        return range2;
      }
      var range = getRange(true);
      if (getOption(cm, options, "scanUp"))
        while (!range && pos.line > cm.firstLine()) {
          pos = CodeMirror2.Pos(pos.line - 1, 0);
          range = getRange(false);
        }
      if (!range || range.cleared || force === "unfold")
        return;
      var myWidget = makeWidget(cm, options, range);
      CodeMirror2.on(myWidget, "mousedown", function(e2) {
        myRange.clear();
        CodeMirror2.e_preventDefault(e2);
      });
      var myRange = cm.markText(range.from, range.to, {
        replacedWith: myWidget,
        clearOnEnter: getOption(cm, options, "clearOnEnter"),
        __isFold: true
      });
      myRange.on("clear", function(from, to) {
        CodeMirror2.signal(cm, "unfold", cm, from, to);
      });
      CodeMirror2.signal(cm, "fold", cm, range.from, range.to);
    }
    function makeWidget(cm, options, range) {
      var widget = getOption(cm, options, "widget");
      if (typeof widget == "function") {
        widget = widget(range.from, range.to);
      }
      if (typeof widget == "string") {
        var text = document.createTextNode(widget);
        widget = document.createElement("span");
        widget.appendChild(text);
        widget.className = "CodeMirror-foldmarker";
      } else if (widget) {
        widget = widget.cloneNode(true);
      }
      return widget;
    }
    CodeMirror2.newFoldFunction = function(rangeFinder, widget) {
      return function(cm, pos) {
        doFold(cm, pos, { rangeFinder, widget });
      };
    };
    CodeMirror2.defineExtension("foldCode", function(pos, options, force) {
      doFold(this, pos, options, force);
    });
    CodeMirror2.defineExtension("isFolded", function(pos) {
      var marks = this.findMarksAt(pos);
      for (var i2 = 0; i2 < marks.length; ++i2)
        if (marks[i2].__isFold)
          return true;
    });
    CodeMirror2.commands.toggleFold = function(cm) {
      cm.foldCode(cm.getCursor());
    };
    CodeMirror2.commands.fold = function(cm) {
      cm.foldCode(cm.getCursor(), null, "fold");
    };
    CodeMirror2.commands.unfold = function(cm) {
      cm.foldCode(cm.getCursor(), { scanUp: false }, "unfold");
    };
    CodeMirror2.commands.foldAll = function(cm) {
      cm.operation(function() {
        for (var i2 = cm.firstLine(), e2 = cm.lastLine(); i2 <= e2; i2++)
          cm.foldCode(CodeMirror2.Pos(i2, 0), { scanUp: false }, "fold");
      });
    };
    CodeMirror2.commands.unfoldAll = function(cm) {
      cm.operation(function() {
        for (var i2 = cm.firstLine(), e2 = cm.lastLine(); i2 <= e2; i2++)
          cm.foldCode(CodeMirror2.Pos(i2, 0), { scanUp: false }, "unfold");
      });
    };
    CodeMirror2.registerHelper("fold", "combine", function() {
      var funcs = Array.prototype.slice.call(arguments, 0);
      return function(cm, start) {
        for (var i2 = 0; i2 < funcs.length; ++i2) {
          var found = funcs[i2](cm, start);
          if (found)
            return found;
        }
      };
    });
    CodeMirror2.registerHelper("fold", "auto", function(cm, start) {
      var helpers = cm.getHelpers(start, "fold");
      for (var i2 = 0; i2 < helpers.length; i2++) {
        var cur = helpers[i2](cm, start);
        if (cur)
          return cur;
      }
    });
    var defaultOptions = {
      rangeFinder: CodeMirror2.fold.auto,
      widget: "\u2194",
      minFoldSize: 0,
      scanUp: false,
      clearOnEnter: true
    };
    CodeMirror2.defineOption("foldOptions", null);
    function getOption(cm, options, name) {
      if (options && options[name] !== void 0)
        return options[name];
      var editorOptions = cm.options.foldOptions;
      if (editorOptions && editorOptions[name] !== void 0)
        return editorOptions[name];
      return defaultOptions[name];
    }
    CodeMirror2.defineExtension("foldOption", function(options, name) {
      return getOption(this, options, name);
    });
  });
})();
(function(module, exports) {
  (function(mod) {
    mod(codemirror.exports);
  })(function(CodeMirror2) {
    var noOptions = {};
    var nonWS = /[^\s\u00a0]/;
    var Pos = CodeMirror2.Pos, cmp = CodeMirror2.cmpPos;
    function firstNonWS(str) {
      var found = str.search(nonWS);
      return found == -1 ? 0 : found;
    }
    CodeMirror2.commands.toggleComment = function(cm) {
      cm.toggleComment();
    };
    CodeMirror2.defineExtension("toggleComment", function(options) {
      if (!options)
        options = noOptions;
      var cm = this;
      var minLine = Infinity, ranges = this.listSelections(), mode = null;
      for (var i2 = ranges.length - 1; i2 >= 0; i2--) {
        var from = ranges[i2].from(), to = ranges[i2].to();
        if (from.line >= minLine)
          continue;
        if (to.line >= minLine)
          to = Pos(minLine, 0);
        minLine = from.line;
        if (mode == null) {
          if (cm.uncomment(from, to, options))
            mode = "un";
          else {
            cm.lineComment(from, to, options);
            mode = "line";
          }
        } else if (mode == "un") {
          cm.uncomment(from, to, options);
        } else {
          cm.lineComment(from, to, options);
        }
      }
    });
    function probablyInsideString(cm, pos, line) {
      return /\bstring\b/.test(cm.getTokenTypeAt(Pos(pos.line, 0))) && !/^[\'\"\`]/.test(line);
    }
    function getMode(cm, pos) {
      var mode = cm.getMode();
      return mode.useInnerComments === false || !mode.innerMode ? mode : cm.getModeAt(pos);
    }
    CodeMirror2.defineExtension("lineComment", function(from, to, options) {
      if (!options)
        options = noOptions;
      var self2 = this, mode = getMode(self2, from);
      var firstLine = self2.getLine(from.line);
      if (firstLine == null || probablyInsideString(self2, from, firstLine))
        return;
      var commentString = options.lineComment || mode.lineComment;
      if (!commentString) {
        if (options.blockCommentStart || mode.blockCommentStart) {
          options.fullLines = true;
          self2.blockComment(from, to, options);
        }
        return;
      }
      var end = Math.min(to.ch != 0 || to.line == from.line ? to.line + 1 : to.line, self2.lastLine() + 1);
      var pad = options.padding == null ? " " : options.padding;
      var blankLines = options.commentBlankLines || from.line == to.line;
      self2.operation(function() {
        if (options.indent) {
          var baseString = null;
          for (var i2 = from.line; i2 < end; ++i2) {
            var line = self2.getLine(i2);
            var whitespace = line.slice(0, firstNonWS(line));
            if (baseString == null || baseString.length > whitespace.length) {
              baseString = whitespace;
            }
          }
          for (var i2 = from.line; i2 < end; ++i2) {
            var line = self2.getLine(i2), cut = baseString.length;
            if (!blankLines && !nonWS.test(line))
              continue;
            if (line.slice(0, cut) != baseString)
              cut = firstNonWS(line);
            self2.replaceRange(baseString + commentString + pad, Pos(i2, 0), Pos(i2, cut));
          }
        } else {
          for (var i2 = from.line; i2 < end; ++i2) {
            if (blankLines || nonWS.test(self2.getLine(i2)))
              self2.replaceRange(commentString + pad, Pos(i2, 0));
          }
        }
      });
    });
    CodeMirror2.defineExtension("blockComment", function(from, to, options) {
      if (!options)
        options = noOptions;
      var self2 = this, mode = getMode(self2, from);
      var startString = options.blockCommentStart || mode.blockCommentStart;
      var endString = options.blockCommentEnd || mode.blockCommentEnd;
      if (!startString || !endString) {
        if ((options.lineComment || mode.lineComment) && options.fullLines != false)
          self2.lineComment(from, to, options);
        return;
      }
      if (/\bcomment\b/.test(self2.getTokenTypeAt(Pos(from.line, 0))))
        return;
      var end = Math.min(to.line, self2.lastLine());
      if (end != from.line && to.ch == 0 && nonWS.test(self2.getLine(end)))
        --end;
      var pad = options.padding == null ? " " : options.padding;
      if (from.line > end)
        return;
      self2.operation(function() {
        if (options.fullLines != false) {
          var lastLineHasText = nonWS.test(self2.getLine(end));
          self2.replaceRange(pad + endString, Pos(end));
          self2.replaceRange(startString + pad, Pos(from.line, 0));
          var lead = options.blockCommentLead || mode.blockCommentLead;
          if (lead != null) {
            for (var i2 = from.line + 1; i2 <= end; ++i2)
              if (i2 != end || lastLineHasText)
                self2.replaceRange(lead + pad, Pos(i2, 0));
          }
        } else {
          var atCursor = cmp(self2.getCursor("to"), to) == 0, empty = !self2.somethingSelected();
          self2.replaceRange(endString, to);
          if (atCursor)
            self2.setSelection(empty ? to : self2.getCursor("from"), to);
          self2.replaceRange(startString, from);
        }
      });
    });
    CodeMirror2.defineExtension("uncomment", function(from, to, options) {
      if (!options)
        options = noOptions;
      var self2 = this, mode = getMode(self2, from);
      var end = Math.min(to.ch != 0 || to.line == from.line ? to.line : to.line - 1, self2.lastLine()), start = Math.min(from.line, end);
      var lineString = options.lineComment || mode.lineComment, lines = [];
      var pad = options.padding == null ? " " : options.padding, didSomething;
      lineComment: {
        if (!lineString)
          break lineComment;
        for (var i2 = start; i2 <= end; ++i2) {
          var line = self2.getLine(i2);
          var found = line.indexOf(lineString);
          if (found > -1 && !/comment/.test(self2.getTokenTypeAt(Pos(i2, found + 1))))
            found = -1;
          if (found == -1 && nonWS.test(line))
            break lineComment;
          if (found > -1 && nonWS.test(line.slice(0, found)))
            break lineComment;
          lines.push(line);
        }
        self2.operation(function() {
          for (var i3 = start; i3 <= end; ++i3) {
            var line2 = lines[i3 - start];
            var pos = line2.indexOf(lineString), endPos = pos + lineString.length;
            if (pos < 0)
              continue;
            if (line2.slice(endPos, endPos + pad.length) == pad)
              endPos += pad.length;
            didSomething = true;
            self2.replaceRange("", Pos(i3, pos), Pos(i3, endPos));
          }
        });
        if (didSomething)
          return true;
      }
      var startString = options.blockCommentStart || mode.blockCommentStart;
      var endString = options.blockCommentEnd || mode.blockCommentEnd;
      if (!startString || !endString)
        return false;
      var lead = options.blockCommentLead || mode.blockCommentLead;
      var startLine = self2.getLine(start), open = startLine.indexOf(startString);
      if (open == -1)
        return false;
      var endLine = end == start ? startLine : self2.getLine(end);
      var close = endLine.indexOf(endString, end == start ? open + startString.length : 0);
      var insideStart = Pos(start, open + 1), insideEnd = Pos(end, close + 1);
      if (close == -1 || !/comment/.test(self2.getTokenTypeAt(insideStart)) || !/comment/.test(self2.getTokenTypeAt(insideEnd)) || self2.getRange(insideStart, insideEnd, "\n").indexOf(endString) > -1)
        return false;
      var lastStart = startLine.lastIndexOf(startString, from.ch);
      var firstEnd = lastStart == -1 ? -1 : startLine.slice(0, from.ch).indexOf(endString, lastStart + startString.length);
      if (lastStart != -1 && firstEnd != -1 && firstEnd + endString.length != from.ch)
        return false;
      firstEnd = endLine.indexOf(endString, to.ch);
      var almostLastStart = endLine.slice(to.ch).lastIndexOf(startString, firstEnd - to.ch);
      lastStart = firstEnd == -1 || almostLastStart == -1 ? -1 : to.ch + almostLastStart;
      if (firstEnd != -1 && lastStart != -1 && lastStart != to.ch)
        return false;
      self2.operation(function() {
        self2.replaceRange("", Pos(end, close - (pad && endLine.slice(close - pad.length, close) == pad ? pad.length : 0)), Pos(end, close + endString.length));
        var openEnd = open + startString.length;
        if (pad && startLine.slice(openEnd, openEnd + pad.length) == pad)
          openEnd += pad.length;
        self2.replaceRange("", Pos(start, open), Pos(start, openEnd));
        if (lead)
          for (var i3 = start + 1; i3 <= end; ++i3) {
            var line2 = self2.getLine(i3), found2 = line2.indexOf(lead);
            if (found2 == -1 || nonWS.test(line2.slice(0, found2)))
              continue;
            var foundEnd = found2 + lead.length;
            if (pad && line2.slice(foundEnd, foundEnd + pad.length) == pad)
              foundEnd += pad.length;
            self2.replaceRange("", Pos(i3, found2), Pos(i3, foundEnd));
          }
      });
      return true;
    });
  });
})();
var xml = { exports: {} };
(function(module, exports) {
  (function(mod) {
    mod(codemirror.exports);
  })(function(CodeMirror2) {
    var htmlConfig = {
      autoSelfClosers: {
        "area": true,
        "base": true,
        "br": true,
        "col": true,
        "command": true,
        "embed": true,
        "frame": true,
        "hr": true,
        "img": true,
        "input": true,
        "keygen": true,
        "link": true,
        "meta": true,
        "param": true,
        "source": true,
        "track": true,
        "wbr": true,
        "menuitem": true
      },
      implicitlyClosed: {
        "dd": true,
        "li": true,
        "optgroup": true,
        "option": true,
        "p": true,
        "rp": true,
        "rt": true,
        "tbody": true,
        "td": true,
        "tfoot": true,
        "th": true,
        "tr": true
      },
      contextGrabbers: {
        "dd": { "dd": true, "dt": true },
        "dt": { "dd": true, "dt": true },
        "li": { "li": true },
        "option": { "option": true, "optgroup": true },
        "optgroup": { "optgroup": true },
        "p": {
          "address": true,
          "article": true,
          "aside": true,
          "blockquote": true,
          "dir": true,
          "div": true,
          "dl": true,
          "fieldset": true,
          "footer": true,
          "form": true,
          "h1": true,
          "h2": true,
          "h3": true,
          "h4": true,
          "h5": true,
          "h6": true,
          "header": true,
          "hgroup": true,
          "hr": true,
          "menu": true,
          "nav": true,
          "ol": true,
          "p": true,
          "pre": true,
          "section": true,
          "table": true,
          "ul": true
        },
        "rp": { "rp": true, "rt": true },
        "rt": { "rp": true, "rt": true },
        "tbody": { "tbody": true, "tfoot": true },
        "td": { "td": true, "th": true },
        "tfoot": { "tbody": true },
        "th": { "td": true, "th": true },
        "thead": { "tbody": true, "tfoot": true },
        "tr": { "tr": true }
      },
      doNotIndent: { "pre": true },
      allowUnquoted: true,
      allowMissing: true,
      caseFold: true
    };
    var xmlConfig = {
      autoSelfClosers: {},
      implicitlyClosed: {},
      contextGrabbers: {},
      doNotIndent: {},
      allowUnquoted: false,
      allowMissing: false,
      allowMissingTagName: false,
      caseFold: false
    };
    CodeMirror2.defineMode("xml", function(editorConf, config_) {
      var indentUnit = editorConf.indentUnit;
      var config = {};
      var defaults = config_.htmlMode ? htmlConfig : xmlConfig;
      for (var prop in defaults)
        config[prop] = defaults[prop];
      for (var prop in config_)
        config[prop] = config_[prop];
      var type, setStyle;
      function inText(stream, state) {
        function chain(parser) {
          state.tokenize = parser;
          return parser(stream, state);
        }
        var ch = stream.next();
        if (ch == "<") {
          if (stream.eat("!")) {
            if (stream.eat("[")) {
              if (stream.match("CDATA["))
                return chain(inBlock("atom", "]]>"));
              else
                return null;
            } else if (stream.match("--")) {
              return chain(inBlock("comment", "-->"));
            } else if (stream.match("DOCTYPE", true, true)) {
              stream.eatWhile(/[\w\._\-]/);
              return chain(doctype(1));
            } else {
              return null;
            }
          } else if (stream.eat("?")) {
            stream.eatWhile(/[\w\._\-]/);
            state.tokenize = inBlock("meta", "?>");
            return "meta";
          } else {
            type = stream.eat("/") ? "closeTag" : "openTag";
            state.tokenize = inTag;
            return "tag bracket";
          }
        } else if (ch == "&") {
          var ok;
          if (stream.eat("#")) {
            if (stream.eat("x")) {
              ok = stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";");
            } else {
              ok = stream.eatWhile(/[\d]/) && stream.eat(";");
            }
          } else {
            ok = stream.eatWhile(/[\w\.\-:]/) && stream.eat(";");
          }
          return ok ? "atom" : "error";
        } else {
          stream.eatWhile(/[^&<]/);
          return null;
        }
      }
      inText.isInText = true;
      function inTag(stream, state) {
        var ch = stream.next();
        if (ch == ">" || ch == "/" && stream.eat(">")) {
          state.tokenize = inText;
          type = ch == ">" ? "endTag" : "selfcloseTag";
          return "tag bracket";
        } else if (ch == "=") {
          type = "equals";
          return null;
        } else if (ch == "<") {
          state.tokenize = inText;
          state.state = baseState;
          state.tagName = state.tagStart = null;
          var next = state.tokenize(stream, state);
          return next ? next + " tag error" : "tag error";
        } else if (/[\'\"]/.test(ch)) {
          state.tokenize = inAttribute(ch);
          state.stringStartCol = stream.column();
          return state.tokenize(stream, state);
        } else {
          stream.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/);
          return "word";
        }
      }
      function inAttribute(quote) {
        var closure = function(stream, state) {
          while (!stream.eol()) {
            if (stream.next() == quote) {
              state.tokenize = inTag;
              break;
            }
          }
          return "string";
        };
        closure.isInAttribute = true;
        return closure;
      }
      function inBlock(style, terminator) {
        return function(stream, state) {
          while (!stream.eol()) {
            if (stream.match(terminator)) {
              state.tokenize = inText;
              break;
            }
            stream.next();
          }
          return style;
        };
      }
      function doctype(depth) {
        return function(stream, state) {
          var ch;
          while ((ch = stream.next()) != null) {
            if (ch == "<") {
              state.tokenize = doctype(depth + 1);
              return state.tokenize(stream, state);
            } else if (ch == ">") {
              if (depth == 1) {
                state.tokenize = inText;
                break;
              } else {
                state.tokenize = doctype(depth - 1);
                return state.tokenize(stream, state);
              }
            }
          }
          return "meta";
        };
      }
      function lower(tagName) {
        return tagName && tagName.toLowerCase();
      }
      function Context(state, tagName, startOfLine) {
        this.prev = state.context;
        this.tagName = tagName || "";
        this.indent = state.indented;
        this.startOfLine = startOfLine;
        if (config.doNotIndent.hasOwnProperty(tagName) || state.context && state.context.noIndent)
          this.noIndent = true;
      }
      function popContext(state) {
        if (state.context)
          state.context = state.context.prev;
      }
      function maybePopContext(state, nextTagName) {
        var parentTagName;
        while (true) {
          if (!state.context) {
            return;
          }
          parentTagName = state.context.tagName;
          if (!config.contextGrabbers.hasOwnProperty(lower(parentTagName)) || !config.contextGrabbers[lower(parentTagName)].hasOwnProperty(lower(nextTagName))) {
            return;
          }
          popContext(state);
        }
      }
      function baseState(type2, stream, state) {
        if (type2 == "openTag") {
          state.tagStart = stream.column();
          return tagNameState;
        } else if (type2 == "closeTag") {
          return closeTagNameState;
        } else {
          return baseState;
        }
      }
      function tagNameState(type2, stream, state) {
        if (type2 == "word") {
          state.tagName = stream.current();
          setStyle = "tag";
          return attrState;
        } else if (config.allowMissingTagName && type2 == "endTag") {
          setStyle = "tag bracket";
          return attrState(type2, stream, state);
        } else {
          setStyle = "error";
          return tagNameState;
        }
      }
      function closeTagNameState(type2, stream, state) {
        if (type2 == "word") {
          var tagName = stream.current();
          if (state.context && state.context.tagName != tagName && config.implicitlyClosed.hasOwnProperty(lower(state.context.tagName)))
            popContext(state);
          if (state.context && state.context.tagName == tagName || config.matchClosing === false) {
            setStyle = "tag";
            return closeState;
          } else {
            setStyle = "tag error";
            return closeStateErr;
          }
        } else if (config.allowMissingTagName && type2 == "endTag") {
          setStyle = "tag bracket";
          return closeState(type2, stream, state);
        } else {
          setStyle = "error";
          return closeStateErr;
        }
      }
      function closeState(type2, _stream, state) {
        if (type2 != "endTag") {
          setStyle = "error";
          return closeState;
        }
        popContext(state);
        return baseState;
      }
      function closeStateErr(type2, stream, state) {
        setStyle = "error";
        return closeState(type2, stream, state);
      }
      function attrState(type2, _stream, state) {
        if (type2 == "word") {
          setStyle = "attribute";
          return attrEqState;
        } else if (type2 == "endTag" || type2 == "selfcloseTag") {
          var tagName = state.tagName, tagStart = state.tagStart;
          state.tagName = state.tagStart = null;
          if (type2 == "selfcloseTag" || config.autoSelfClosers.hasOwnProperty(lower(tagName))) {
            maybePopContext(state, tagName);
          } else {
            maybePopContext(state, tagName);
            state.context = new Context(state, tagName, tagStart == state.indented);
          }
          return baseState;
        }
        setStyle = "error";
        return attrState;
      }
      function attrEqState(type2, stream, state) {
        if (type2 == "equals")
          return attrValueState;
        if (!config.allowMissing)
          setStyle = "error";
        return attrState(type2, stream, state);
      }
      function attrValueState(type2, stream, state) {
        if (type2 == "string")
          return attrContinuedState;
        if (type2 == "word" && config.allowUnquoted) {
          setStyle = "string";
          return attrState;
        }
        setStyle = "error";
        return attrState(type2, stream, state);
      }
      function attrContinuedState(type2, stream, state) {
        if (type2 == "string")
          return attrContinuedState;
        return attrState(type2, stream, state);
      }
      return {
        startState: function(baseIndent) {
          var state = {
            tokenize: inText,
            state: baseState,
            indented: baseIndent || 0,
            tagName: null,
            tagStart: null,
            context: null
          };
          if (baseIndent != null)
            state.baseIndent = baseIndent;
          return state;
        },
        token: function(stream, state) {
          if (!state.tagName && stream.sol())
            state.indented = stream.indentation();
          if (stream.eatSpace())
            return null;
          type = null;
          var style = state.tokenize(stream, state);
          if ((style || type) && style != "comment") {
            setStyle = null;
            state.state = state.state(type || style, stream, state);
            if (setStyle)
              style = setStyle == "error" ? style + " error" : setStyle;
          }
          return style;
        },
        indent: function(state, textAfter, fullLine) {
          var context = state.context;
          if (state.tokenize.isInAttribute) {
            if (state.tagStart == state.indented)
              return state.stringStartCol + 1;
            else
              return state.indented + indentUnit;
          }
          if (context && context.noIndent)
            return CodeMirror2.Pass;
          if (state.tokenize != inTag && state.tokenize != inText)
            return fullLine ? fullLine.match(/^(\s*)/)[0].length : 0;
          if (state.tagName) {
            if (config.multilineTagIndentPastTag !== false)
              return state.tagStart + state.tagName.length + 2;
            else
              return state.tagStart + indentUnit * (config.multilineTagIndentFactor || 1);
          }
          if (config.alignCDATA && /<!\[CDATA\[/.test(textAfter))
            return 0;
          var tagAfter = textAfter && /^<(\/)?([\w_:\.-]*)/.exec(textAfter);
          if (tagAfter && tagAfter[1]) {
            while (context) {
              if (context.tagName == tagAfter[2]) {
                context = context.prev;
                break;
              } else if (config.implicitlyClosed.hasOwnProperty(lower(context.tagName))) {
                context = context.prev;
              } else {
                break;
              }
            }
          } else if (tagAfter) {
            while (context) {
              var grabbers = config.contextGrabbers[lower(context.tagName)];
              if (grabbers && grabbers.hasOwnProperty(lower(tagAfter[2])))
                context = context.prev;
              else
                break;
            }
          }
          while (context && context.prev && !context.startOfLine)
            context = context.prev;
          if (context)
            return context.indent + indentUnit;
          else
            return state.baseIndent || 0;
        },
        electricInput: /<\/[\s\w:]+>$/,
        blockCommentStart: "<!--",
        blockCommentEnd: "-->",
        configuration: config.htmlMode ? "html" : "xml",
        helperType: config.htmlMode ? "html" : "xml",
        skipAttribute: function(state) {
          if (state.state == attrValueState)
            state.state = attrState;
        },
        xmlCurrentTag: function(state) {
          return state.tagName ? { name: state.tagName, close: state.type == "closeTag" } : null;
        },
        xmlCurrentContext: function(state) {
          var context = [];
          for (var cx = state.context; cx; cx = cx.prev)
            context.push(cx.tagName);
          return context.reverse();
        }
      };
    });
    CodeMirror2.defineMIME("text/xml", "xml");
    CodeMirror2.defineMIME("application/xml", "xml");
    if (!CodeMirror2.mimeModes.hasOwnProperty("text/html"))
      CodeMirror2.defineMIME("text/html", { name: "xml", htmlMode: true });
  });
})();
var javascript = { exports: {} };
(function(module, exports) {
  (function(mod) {
    mod(codemirror.exports);
  })(function(CodeMirror2) {
    CodeMirror2.defineMode("javascript", function(config, parserConfig) {
      var indentUnit = config.indentUnit;
      var statementIndent = parserConfig.statementIndent;
      var jsonldMode = parserConfig.jsonld;
      var jsonMode = parserConfig.json || jsonldMode;
      var trackScope = parserConfig.trackScope !== false;
      var isTS = parserConfig.typescript;
      var wordRE = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/;
      var keywords = function() {
        function kw(type2) {
          return { type: type2, style: "keyword" };
        }
        var A2 = kw("keyword a"), B = kw("keyword b"), C2 = kw("keyword c"), D = kw("keyword d");
        var operator = kw("operator"), atom = { type: "atom", style: "atom" };
        return {
          "if": kw("if"),
          "while": A2,
          "with": A2,
          "else": B,
          "do": B,
          "try": B,
          "finally": B,
          "return": D,
          "break": D,
          "continue": D,
          "new": kw("new"),
          "delete": C2,
          "void": C2,
          "throw": C2,
          "debugger": kw("debugger"),
          "var": kw("var"),
          "const": kw("var"),
          "let": kw("var"),
          "function": kw("function"),
          "catch": kw("catch"),
          "for": kw("for"),
          "switch": kw("switch"),
          "case": kw("case"),
          "default": kw("default"),
          "in": operator,
          "typeof": operator,
          "instanceof": operator,
          "true": atom,
          "false": atom,
          "null": atom,
          "undefined": atom,
          "NaN": atom,
          "Infinity": atom,
          "this": kw("this"),
          "class": kw("class"),
          "super": kw("atom"),
          "yield": C2,
          "export": kw("export"),
          "import": kw("import"),
          "extends": C2,
          "await": C2
        };
      }();
      var isOperatorChar = /[+\-*&%=<>!?|~^@]/;
      var isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;
      function readRegexp(stream) {
        var escaped = false, next, inSet = false;
        while ((next = stream.next()) != null) {
          if (!escaped) {
            if (next == "/" && !inSet)
              return;
            if (next == "[")
              inSet = true;
            else if (inSet && next == "]")
              inSet = false;
          }
          escaped = !escaped && next == "\\";
        }
      }
      var type, content;
      function ret(tp, style, cont2) {
        type = tp;
        content = cont2;
        return style;
      }
      function tokenBase(stream, state) {
        var ch = stream.next();
        if (ch == '"' || ch == "'") {
          state.tokenize = tokenString(ch);
          return state.tokenize(stream, state);
        } else if (ch == "." && stream.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) {
          return ret("number", "number");
        } else if (ch == "." && stream.match("..")) {
          return ret("spread", "meta");
        } else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
          return ret(ch);
        } else if (ch == "=" && stream.eat(">")) {
          return ret("=>", "operator");
        } else if (ch == "0" && stream.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/)) {
          return ret("number", "number");
        } else if (/\d/.test(ch)) {
          stream.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/);
          return ret("number", "number");
        } else if (ch == "/") {
          if (stream.eat("*")) {
            state.tokenize = tokenComment;
            return tokenComment(stream, state);
          } else if (stream.eat("/")) {
            stream.skipToEnd();
            return ret("comment", "comment");
          } else if (expressionAllowed(stream, state, 1)) {
            readRegexp(stream);
            stream.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/);
            return ret("regexp", "string-2");
          } else {
            stream.eat("=");
            return ret("operator", "operator", stream.current());
          }
        } else if (ch == "`") {
          state.tokenize = tokenQuasi;
          return tokenQuasi(stream, state);
        } else if (ch == "#" && stream.peek() == "!") {
          stream.skipToEnd();
          return ret("meta", "meta");
        } else if (ch == "#" && stream.eatWhile(wordRE)) {
          return ret("variable", "property");
        } else if (ch == "<" && stream.match("!--") || ch == "-" && stream.match("->") && !/\S/.test(stream.string.slice(0, stream.start))) {
          stream.skipToEnd();
          return ret("comment", "comment");
        } else if (isOperatorChar.test(ch)) {
          if (ch != ">" || !state.lexical || state.lexical.type != ">") {
            if (stream.eat("=")) {
              if (ch == "!" || ch == "=")
                stream.eat("=");
            } else if (/[<>*+\-|&?]/.test(ch)) {
              stream.eat(ch);
              if (ch == ">")
                stream.eat(ch);
            }
          }
          if (ch == "?" && stream.eat("."))
            return ret(".");
          return ret("operator", "operator", stream.current());
        } else if (wordRE.test(ch)) {
          stream.eatWhile(wordRE);
          var word = stream.current();
          if (state.lastType != ".") {
            if (keywords.propertyIsEnumerable(word)) {
              var kw = keywords[word];
              return ret(kw.type, kw.style, word);
            }
            if (word == "async" && stream.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/, false))
              return ret("async", "keyword", word);
          }
          return ret("variable", "variable", word);
        }
      }
      function tokenString(quote) {
        return function(stream, state) {
          var escaped = false, next;
          if (jsonldMode && stream.peek() == "@" && stream.match(isJsonldKeyword)) {
            state.tokenize = tokenBase;
            return ret("jsonld-keyword", "meta");
          }
          while ((next = stream.next()) != null) {
            if (next == quote && !escaped)
              break;
            escaped = !escaped && next == "\\";
          }
          if (!escaped)
            state.tokenize = tokenBase;
          return ret("string", "string");
        };
      }
      function tokenComment(stream, state) {
        var maybeEnd = false, ch;
        while (ch = stream.next()) {
          if (ch == "/" && maybeEnd) {
            state.tokenize = tokenBase;
            break;
          }
          maybeEnd = ch == "*";
        }
        return ret("comment", "comment");
      }
      function tokenQuasi(stream, state) {
        var escaped = false, next;
        while ((next = stream.next()) != null) {
          if (!escaped && (next == "`" || next == "$" && stream.eat("{"))) {
            state.tokenize = tokenBase;
            break;
          }
          escaped = !escaped && next == "\\";
        }
        return ret("quasi", "string-2", stream.current());
      }
      var brackets = "([{}])";
      function findFatArrow(stream, state) {
        if (state.fatArrowAt)
          state.fatArrowAt = null;
        var arrow = stream.string.indexOf("=>", stream.start);
        if (arrow < 0)
          return;
        if (isTS) {
          var m2 = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(stream.string.slice(stream.start, arrow));
          if (m2)
            arrow = m2.index;
        }
        var depth = 0, sawSomething = false;
        for (var pos = arrow - 1; pos >= 0; --pos) {
          var ch = stream.string.charAt(pos);
          var bracket = brackets.indexOf(ch);
          if (bracket >= 0 && bracket < 3) {
            if (!depth) {
              ++pos;
              break;
            }
            if (--depth == 0) {
              if (ch == "(")
                sawSomething = true;
              break;
            }
          } else if (bracket >= 3 && bracket < 6) {
            ++depth;
          } else if (wordRE.test(ch)) {
            sawSomething = true;
          } else if (/["'\/`]/.test(ch)) {
            for (; ; --pos) {
              if (pos == 0)
                return;
              var next = stream.string.charAt(pos - 1);
              if (next == ch && stream.string.charAt(pos - 2) != "\\") {
                pos--;
                break;
              }
            }
          } else if (sawSomething && !depth) {
            ++pos;
            break;
          }
        }
        if (sawSomething && !depth)
          state.fatArrowAt = pos;
      }
      var atomicTypes = {
        "atom": true,
        "number": true,
        "variable": true,
        "string": true,
        "regexp": true,
        "this": true,
        "import": true,
        "jsonld-keyword": true
      };
      function JSLexical(indented, column, type2, align, prev, info) {
        this.indented = indented;
        this.column = column;
        this.type = type2;
        this.prev = prev;
        this.info = info;
        if (align != null)
          this.align = align;
      }
      function inScope(state, varname) {
        if (!trackScope)
          return false;
        for (var v2 = state.localVars; v2; v2 = v2.next)
          if (v2.name == varname)
            return true;
        for (var cx2 = state.context; cx2; cx2 = cx2.prev) {
          for (var v2 = cx2.vars; v2; v2 = v2.next)
            if (v2.name == varname)
              return true;
        }
      }
      function parseJS(state, style, type2, content2, stream) {
        var cc = state.cc;
        cx.state = state;
        cx.stream = stream;
        cx.marked = null, cx.cc = cc;
        cx.style = style;
        if (!state.lexical.hasOwnProperty("align"))
          state.lexical.align = true;
        while (true) {
          var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
          if (combinator(type2, content2)) {
            while (cc.length && cc[cc.length - 1].lex)
              cc.pop()();
            if (cx.marked)
              return cx.marked;
            if (type2 == "variable" && inScope(state, content2))
              return "variable-2";
            return style;
          }
        }
      }
      var cx = { state: null, column: null, marked: null, cc: null };
      function pass() {
        for (var i2 = arguments.length - 1; i2 >= 0; i2--)
          cx.cc.push(arguments[i2]);
      }
      function cont() {
        pass.apply(null, arguments);
        return true;
      }
      function inList(name, list) {
        for (var v2 = list; v2; v2 = v2.next)
          if (v2.name == name)
            return true;
        return false;
      }
      function register(varname) {
        var state = cx.state;
        cx.marked = "def";
        if (!trackScope)
          return;
        if (state.context) {
          if (state.lexical.info == "var" && state.context && state.context.block) {
            var newContext = registerVarScoped(varname, state.context);
            if (newContext != null) {
              state.context = newContext;
              return;
            }
          } else if (!inList(varname, state.localVars)) {
            state.localVars = new Var(varname, state.localVars);
            return;
          }
        }
        if (parserConfig.globalVars && !inList(varname, state.globalVars))
          state.globalVars = new Var(varname, state.globalVars);
      }
      function registerVarScoped(varname, context) {
        if (!context) {
          return null;
        } else if (context.block) {
          var inner = registerVarScoped(varname, context.prev);
          if (!inner)
            return null;
          if (inner == context.prev)
            return context;
          return new Context(inner, context.vars, true);
        } else if (inList(varname, context.vars)) {
          return context;
        } else {
          return new Context(context.prev, new Var(varname, context.vars), false);
        }
      }
      function isModifier(name) {
        return name == "public" || name == "private" || name == "protected" || name == "abstract" || name == "readonly";
      }
      function Context(prev, vars, block2) {
        this.prev = prev;
        this.vars = vars;
        this.block = block2;
      }
      function Var(name, next) {
        this.name = name;
        this.next = next;
      }
      var defaultVars = new Var("this", new Var("arguments", null));
      function pushcontext() {
        cx.state.context = new Context(cx.state.context, cx.state.localVars, false);
        cx.state.localVars = defaultVars;
      }
      function pushblockcontext() {
        cx.state.context = new Context(cx.state.context, cx.state.localVars, true);
        cx.state.localVars = null;
      }
      function popcontext() {
        cx.state.localVars = cx.state.context.vars;
        cx.state.context = cx.state.context.prev;
      }
      popcontext.lex = true;
      function pushlex(type2, info) {
        var result = function() {
          var state = cx.state, indent = state.indented;
          if (state.lexical.type == "stat")
            indent = state.lexical.indented;
          else
            for (var outer = state.lexical; outer && outer.type == ")" && outer.align; outer = outer.prev)
              indent = outer.indented;
          state.lexical = new JSLexical(indent, cx.stream.column(), type2, null, state.lexical, info);
        };
        result.lex = true;
        return result;
      }
      function poplex() {
        var state = cx.state;
        if (state.lexical.prev) {
          if (state.lexical.type == ")")
            state.indented = state.lexical.indented;
          state.lexical = state.lexical.prev;
        }
      }
      poplex.lex = true;
      function expect(wanted) {
        function exp(type2) {
          if (type2 == wanted)
            return cont();
          else if (wanted == ";" || type2 == "}" || type2 == ")" || type2 == "]")
            return pass();
          else
            return cont(exp);
        }
        return exp;
      }
      function statement(type2, value) {
        if (type2 == "var")
          return cont(pushlex("vardef", value), vardef, expect(";"), poplex);
        if (type2 == "keyword a")
          return cont(pushlex("form"), parenExpr, statement, poplex);
        if (type2 == "keyword b")
          return cont(pushlex("form"), statement, poplex);
        if (type2 == "keyword d")
          return cx.stream.match(/^\s*$/, false) ? cont() : cont(pushlex("stat"), maybeexpression, expect(";"), poplex);
        if (type2 == "debugger")
          return cont(expect(";"));
        if (type2 == "{")
          return cont(pushlex("}"), pushblockcontext, block, poplex, popcontext);
        if (type2 == ";")
          return cont();
        if (type2 == "if") {
          if (cx.state.lexical.info == "else" && cx.state.cc[cx.state.cc.length - 1] == poplex)
            cx.state.cc.pop()();
          return cont(pushlex("form"), parenExpr, statement, poplex, maybeelse);
        }
        if (type2 == "function")
          return cont(functiondef);
        if (type2 == "for")
          return cont(pushlex("form"), pushblockcontext, forspec, statement, popcontext, poplex);
        if (type2 == "class" || isTS && value == "interface") {
          cx.marked = "keyword";
          return cont(pushlex("form", type2 == "class" ? type2 : value), className, poplex);
        }
        if (type2 == "variable") {
          if (isTS && value == "declare") {
            cx.marked = "keyword";
            return cont(statement);
          } else if (isTS && (value == "module" || value == "enum" || value == "type") && cx.stream.match(/^\s*\w/, false)) {
            cx.marked = "keyword";
            if (value == "enum")
              return cont(enumdef);
            else if (value == "type")
              return cont(typename, expect("operator"), typeexpr, expect(";"));
            else
              return cont(pushlex("form"), pattern, expect("{"), pushlex("}"), block, poplex, poplex);
          } else if (isTS && value == "namespace") {
            cx.marked = "keyword";
            return cont(pushlex("form"), expression, statement, poplex);
          } else if (isTS && value == "abstract") {
            cx.marked = "keyword";
            return cont(statement);
          } else {
            return cont(pushlex("stat"), maybelabel);
          }
        }
        if (type2 == "switch")
          return cont(pushlex("form"), parenExpr, expect("{"), pushlex("}", "switch"), pushblockcontext, block, poplex, poplex, popcontext);
        if (type2 == "case")
          return cont(expression, expect(":"));
        if (type2 == "default")
          return cont(expect(":"));
        if (type2 == "catch")
          return cont(pushlex("form"), pushcontext, maybeCatchBinding, statement, poplex, popcontext);
        if (type2 == "export")
          return cont(pushlex("stat"), afterExport, poplex);
        if (type2 == "import")
          return cont(pushlex("stat"), afterImport, poplex);
        if (type2 == "async")
          return cont(statement);
        if (value == "@")
          return cont(expression, statement);
        return pass(pushlex("stat"), expression, expect(";"), poplex);
      }
      function maybeCatchBinding(type2) {
        if (type2 == "(")
          return cont(funarg, expect(")"));
      }
      function expression(type2, value) {
        return expressionInner(type2, value, false);
      }
      function expressionNoComma(type2, value) {
        return expressionInner(type2, value, true);
      }
      function parenExpr(type2) {
        if (type2 != "(")
          return pass();
        return cont(pushlex(")"), maybeexpression, expect(")"), poplex);
      }
      function expressionInner(type2, value, noComma) {
        if (cx.state.fatArrowAt == cx.stream.start) {
          var body = noComma ? arrowBodyNoComma : arrowBody;
          if (type2 == "(")
            return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, expect("=>"), body, popcontext);
          else if (type2 == "variable")
            return pass(pushcontext, pattern, expect("=>"), body, popcontext);
        }
        var maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma;
        if (atomicTypes.hasOwnProperty(type2))
          return cont(maybeop);
        if (type2 == "function")
          return cont(functiondef, maybeop);
        if (type2 == "class" || isTS && value == "interface") {
          cx.marked = "keyword";
          return cont(pushlex("form"), classExpression, poplex);
        }
        if (type2 == "keyword c" || type2 == "async")
          return cont(noComma ? expressionNoComma : expression);
        if (type2 == "(")
          return cont(pushlex(")"), maybeexpression, expect(")"), poplex, maybeop);
        if (type2 == "operator" || type2 == "spread")
          return cont(noComma ? expressionNoComma : expression);
        if (type2 == "[")
          return cont(pushlex("]"), arrayLiteral, poplex, maybeop);
        if (type2 == "{")
          return contCommasep(objprop, "}", null, maybeop);
        if (type2 == "quasi")
          return pass(quasi, maybeop);
        if (type2 == "new")
          return cont(maybeTarget(noComma));
        return cont();
      }
      function maybeexpression(type2) {
        if (type2.match(/[;\}\)\],]/))
          return pass();
        return pass(expression);
      }
      function maybeoperatorComma(type2, value) {
        if (type2 == ",")
          return cont(maybeexpression);
        return maybeoperatorNoComma(type2, value, false);
      }
      function maybeoperatorNoComma(type2, value, noComma) {
        var me = noComma == false ? maybeoperatorComma : maybeoperatorNoComma;
        var expr = noComma == false ? expression : expressionNoComma;
        if (type2 == "=>")
          return cont(pushcontext, noComma ? arrowBodyNoComma : arrowBody, popcontext);
        if (type2 == "operator") {
          if (/\+\+|--/.test(value) || isTS && value == "!")
            return cont(me);
          if (isTS && value == "<" && cx.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/, false))
            return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, me);
          if (value == "?")
            return cont(expression, expect(":"), expr);
          return cont(expr);
        }
        if (type2 == "quasi") {
          return pass(quasi, me);
        }
        if (type2 == ";")
          return;
        if (type2 == "(")
          return contCommasep(expressionNoComma, ")", "call", me);
        if (type2 == ".")
          return cont(property, me);
        if (type2 == "[")
          return cont(pushlex("]"), maybeexpression, expect("]"), poplex, me);
        if (isTS && value == "as") {
          cx.marked = "keyword";
          return cont(typeexpr, me);
        }
        if (type2 == "regexp") {
          cx.state.lastType = cx.marked = "operator";
          cx.stream.backUp(cx.stream.pos - cx.stream.start - 1);
          return cont(expr);
        }
      }
      function quasi(type2, value) {
        if (type2 != "quasi")
          return pass();
        if (value.slice(value.length - 2) != "${")
          return cont(quasi);
        return cont(maybeexpression, continueQuasi);
      }
      function continueQuasi(type2) {
        if (type2 == "}") {
          cx.marked = "string-2";
          cx.state.tokenize = tokenQuasi;
          return cont(quasi);
        }
      }
      function arrowBody(type2) {
        findFatArrow(cx.stream, cx.state);
        return pass(type2 == "{" ? statement : expression);
      }
      function arrowBodyNoComma(type2) {
        findFatArrow(cx.stream, cx.state);
        return pass(type2 == "{" ? statement : expressionNoComma);
      }
      function maybeTarget(noComma) {
        return function(type2) {
          if (type2 == ".")
            return cont(noComma ? targetNoComma : target);
          else if (type2 == "variable" && isTS)
            return cont(maybeTypeArgs, noComma ? maybeoperatorNoComma : maybeoperatorComma);
          else
            return pass(noComma ? expressionNoComma : expression);
        };
      }
      function target(_2, value) {
        if (value == "target") {
          cx.marked = "keyword";
          return cont(maybeoperatorComma);
        }
      }
      function targetNoComma(_2, value) {
        if (value == "target") {
          cx.marked = "keyword";
          return cont(maybeoperatorNoComma);
        }
      }
      function maybelabel(type2) {
        if (type2 == ":")
          return cont(poplex, statement);
        return pass(maybeoperatorComma, expect(";"), poplex);
      }
      function property(type2) {
        if (type2 == "variable") {
          cx.marked = "property";
          return cont();
        }
      }
      function objprop(type2, value) {
        if (type2 == "async") {
          cx.marked = "property";
          return cont(objprop);
        } else if (type2 == "variable" || cx.style == "keyword") {
          cx.marked = "property";
          if (value == "get" || value == "set")
            return cont(getterSetter);
          var m2;
          if (isTS && cx.state.fatArrowAt == cx.stream.start && (m2 = cx.stream.match(/^\s*:\s*/, false)))
            cx.state.fatArrowAt = cx.stream.pos + m2[0].length;
          return cont(afterprop);
        } else if (type2 == "number" || type2 == "string") {
          cx.marked = jsonldMode ? "property" : cx.style + " property";
          return cont(afterprop);
        } else if (type2 == "jsonld-keyword") {
          return cont(afterprop);
        } else if (isTS && isModifier(value)) {
          cx.marked = "keyword";
          return cont(objprop);
        } else if (type2 == "[") {
          return cont(expression, maybetype, expect("]"), afterprop);
        } else if (type2 == "spread") {
          return cont(expressionNoComma, afterprop);
        } else if (value == "*") {
          cx.marked = "keyword";
          return cont(objprop);
        } else if (type2 == ":") {
          return pass(afterprop);
        }
      }
      function getterSetter(type2) {
        if (type2 != "variable")
          return pass(afterprop);
        cx.marked = "property";
        return cont(functiondef);
      }
      function afterprop(type2) {
        if (type2 == ":")
          return cont(expressionNoComma);
        if (type2 == "(")
          return pass(functiondef);
      }
      function commasep(what, end, sep) {
        function proceed(type2, value) {
          if (sep ? sep.indexOf(type2) > -1 : type2 == ",") {
            var lex = cx.state.lexical;
            if (lex.info == "call")
              lex.pos = (lex.pos || 0) + 1;
            return cont(function(type3, value2) {
              if (type3 == end || value2 == end)
                return pass();
              return pass(what);
            }, proceed);
          }
          if (type2 == end || value == end)
            return cont();
          if (sep && sep.indexOf(";") > -1)
            return pass(what);
          return cont(expect(end));
        }
        return function(type2, value) {
          if (type2 == end || value == end)
            return cont();
          return pass(what, proceed);
        };
      }
      function contCommasep(what, end, info) {
        for (var i2 = 3; i2 < arguments.length; i2++)
          cx.cc.push(arguments[i2]);
        return cont(pushlex(end, info), commasep(what, end), poplex);
      }
      function block(type2) {
        if (type2 == "}")
          return cont();
        return pass(statement, block);
      }
      function maybetype(type2, value) {
        if (isTS) {
          if (type2 == ":")
            return cont(typeexpr);
          if (value == "?")
            return cont(maybetype);
        }
      }
      function maybetypeOrIn(type2, value) {
        if (isTS && (type2 == ":" || value == "in"))
          return cont(typeexpr);
      }
      function mayberettype(type2) {
        if (isTS && type2 == ":") {
          if (cx.stream.match(/^\s*\w+\s+is\b/, false))
            return cont(expression, isKW, typeexpr);
          else
            return cont(typeexpr);
        }
      }
      function isKW(_2, value) {
        if (value == "is") {
          cx.marked = "keyword";
          return cont();
        }
      }
      function typeexpr(type2, value) {
        if (value == "keyof" || value == "typeof" || value == "infer" || value == "readonly") {
          cx.marked = "keyword";
          return cont(value == "typeof" ? expressionNoComma : typeexpr);
        }
        if (type2 == "variable" || value == "void") {
          cx.marked = "type";
          return cont(afterType);
        }
        if (value == "|" || value == "&")
          return cont(typeexpr);
        if (type2 == "string" || type2 == "number" || type2 == "atom")
          return cont(afterType);
        if (type2 == "[")
          return cont(pushlex("]"), commasep(typeexpr, "]", ","), poplex, afterType);
        if (type2 == "{")
          return cont(pushlex("}"), typeprops, poplex, afterType);
        if (type2 == "(")
          return cont(commasep(typearg, ")"), maybeReturnType, afterType);
        if (type2 == "<")
          return cont(commasep(typeexpr, ">"), typeexpr);
        if (type2 == "quasi") {
          return pass(quasiType, afterType);
        }
      }
      function maybeReturnType(type2) {
        if (type2 == "=>")
          return cont(typeexpr);
      }
      function typeprops(type2) {
        if (type2.match(/[\}\)\]]/))
          return cont();
        if (type2 == "," || type2 == ";")
          return cont(typeprops);
        return pass(typeprop, typeprops);
      }
      function typeprop(type2, value) {
        if (type2 == "variable" || cx.style == "keyword") {
          cx.marked = "property";
          return cont(typeprop);
        } else if (value == "?" || type2 == "number" || type2 == "string") {
          return cont(typeprop);
        } else if (type2 == ":") {
          return cont(typeexpr);
        } else if (type2 == "[") {
          return cont(expect("variable"), maybetypeOrIn, expect("]"), typeprop);
        } else if (type2 == "(") {
          return pass(functiondecl, typeprop);
        } else if (!type2.match(/[;\}\)\],]/)) {
          return cont();
        }
      }
      function quasiType(type2, value) {
        if (type2 != "quasi")
          return pass();
        if (value.slice(value.length - 2) != "${")
          return cont(quasiType);
        return cont(typeexpr, continueQuasiType);
      }
      function continueQuasiType(type2) {
        if (type2 == "}") {
          cx.marked = "string-2";
          cx.state.tokenize = tokenQuasi;
          return cont(quasiType);
        }
      }
      function typearg(type2, value) {
        if (type2 == "variable" && cx.stream.match(/^\s*[?:]/, false) || value == "?")
          return cont(typearg);
        if (type2 == ":")
          return cont(typeexpr);
        if (type2 == "spread")
          return cont(typearg);
        return pass(typeexpr);
      }
      function afterType(type2, value) {
        if (value == "<")
          return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType);
        if (value == "|" || type2 == "." || value == "&")
          return cont(typeexpr);
        if (type2 == "[")
          return cont(typeexpr, expect("]"), afterType);
        if (value == "extends" || value == "implements") {
          cx.marked = "keyword";
          return cont(typeexpr);
        }
        if (value == "?")
          return cont(typeexpr, expect(":"), typeexpr);
      }
      function maybeTypeArgs(_2, value) {
        if (value == "<")
          return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType);
      }
      function typeparam() {
        return pass(typeexpr, maybeTypeDefault);
      }
      function maybeTypeDefault(_2, value) {
        if (value == "=")
          return cont(typeexpr);
      }
      function vardef(_2, value) {
        if (value == "enum") {
          cx.marked = "keyword";
          return cont(enumdef);
        }
        return pass(pattern, maybetype, maybeAssign, vardefCont);
      }
      function pattern(type2, value) {
        if (isTS && isModifier(value)) {
          cx.marked = "keyword";
          return cont(pattern);
        }
        if (type2 == "variable") {
          register(value);
          return cont();
        }
        if (type2 == "spread")
          return cont(pattern);
        if (type2 == "[")
          return contCommasep(eltpattern, "]");
        if (type2 == "{")
          return contCommasep(proppattern, "}");
      }
      function proppattern(type2, value) {
        if (type2 == "variable" && !cx.stream.match(/^\s*:/, false)) {
          register(value);
          return cont(maybeAssign);
        }
        if (type2 == "variable")
          cx.marked = "property";
        if (type2 == "spread")
          return cont(pattern);
        if (type2 == "}")
          return pass();
        if (type2 == "[")
          return cont(expression, expect("]"), expect(":"), proppattern);
        return cont(expect(":"), pattern, maybeAssign);
      }
      function eltpattern() {
        return pass(pattern, maybeAssign);
      }
      function maybeAssign(_type, value) {
        if (value == "=")
          return cont(expressionNoComma);
      }
      function vardefCont(type2) {
        if (type2 == ",")
          return cont(vardef);
      }
      function maybeelse(type2, value) {
        if (type2 == "keyword b" && value == "else")
          return cont(pushlex("form", "else"), statement, poplex);
      }
      function forspec(type2, value) {
        if (value == "await")
          return cont(forspec);
        if (type2 == "(")
          return cont(pushlex(")"), forspec1, poplex);
      }
      function forspec1(type2) {
        if (type2 == "var")
          return cont(vardef, forspec2);
        if (type2 == "variable")
          return cont(forspec2);
        return pass(forspec2);
      }
      function forspec2(type2, value) {
        if (type2 == ")")
          return cont();
        if (type2 == ";")
          return cont(forspec2);
        if (value == "in" || value == "of") {
          cx.marked = "keyword";
          return cont(expression, forspec2);
        }
        return pass(expression, forspec2);
      }
      function functiondef(type2, value) {
        if (value == "*") {
          cx.marked = "keyword";
          return cont(functiondef);
        }
        if (type2 == "variable") {
          register(value);
          return cont(functiondef);
        }
        if (type2 == "(")
          return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, statement, popcontext);
        if (isTS && value == "<")
          return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondef);
      }
      function functiondecl(type2, value) {
        if (value == "*") {
          cx.marked = "keyword";
          return cont(functiondecl);
        }
        if (type2 == "variable") {
          register(value);
          return cont(functiondecl);
        }
        if (type2 == "(")
          return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, popcontext);
        if (isTS && value == "<")
          return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondecl);
      }
      function typename(type2, value) {
        if (type2 == "keyword" || type2 == "variable") {
          cx.marked = "type";
          return cont(typename);
        } else if (value == "<") {
          return cont(pushlex(">"), commasep(typeparam, ">"), poplex);
        }
      }
      function funarg(type2, value) {
        if (value == "@")
          cont(expression, funarg);
        if (type2 == "spread")
          return cont(funarg);
        if (isTS && isModifier(value)) {
          cx.marked = "keyword";
          return cont(funarg);
        }
        if (isTS && type2 == "this")
          return cont(maybetype, maybeAssign);
        return pass(pattern, maybetype, maybeAssign);
      }
      function classExpression(type2, value) {
        if (type2 == "variable")
          return className(type2, value);
        return classNameAfter(type2, value);
      }
      function className(type2, value) {
        if (type2 == "variable") {
          register(value);
          return cont(classNameAfter);
        }
      }
      function classNameAfter(type2, value) {
        if (value == "<")
          return cont(pushlex(">"), commasep(typeparam, ">"), poplex, classNameAfter);
        if (value == "extends" || value == "implements" || isTS && type2 == ",") {
          if (value == "implements")
            cx.marked = "keyword";
          return cont(isTS ? typeexpr : expression, classNameAfter);
        }
        if (type2 == "{")
          return cont(pushlex("}"), classBody, poplex);
      }
      function classBody(type2, value) {
        if (type2 == "async" || type2 == "variable" && (value == "static" || value == "get" || value == "set" || isTS && isModifier(value)) && cx.stream.match(/^\s+[\w$\xa1-\uffff]/, false)) {
          cx.marked = "keyword";
          return cont(classBody);
        }
        if (type2 == "variable" || cx.style == "keyword") {
          cx.marked = "property";
          return cont(classfield, classBody);
        }
        if (type2 == "number" || type2 == "string")
          return cont(classfield, classBody);
        if (type2 == "[")
          return cont(expression, maybetype, expect("]"), classfield, classBody);
        if (value == "*") {
          cx.marked = "keyword";
          return cont(classBody);
        }
        if (isTS && type2 == "(")
          return pass(functiondecl, classBody);
        if (type2 == ";" || type2 == ",")
          return cont(classBody);
        if (type2 == "}")
          return cont();
        if (value == "@")
          return cont(expression, classBody);
      }
      function classfield(type2, value) {
        if (value == "!")
          return cont(classfield);
        if (value == "?")
          return cont(classfield);
        if (type2 == ":")
          return cont(typeexpr, maybeAssign);
        if (value == "=")
          return cont(expressionNoComma);
        var context = cx.state.lexical.prev, isInterface = context && context.info == "interface";
        return pass(isInterface ? functiondecl : functiondef);
      }
      function afterExport(type2, value) {
        if (value == "*") {
          cx.marked = "keyword";
          return cont(maybeFrom, expect(";"));
        }
        if (value == "default") {
          cx.marked = "keyword";
          return cont(expression, expect(";"));
        }
        if (type2 == "{")
          return cont(commasep(exportField, "}"), maybeFrom, expect(";"));
        return pass(statement);
      }
      function exportField(type2, value) {
        if (value == "as") {
          cx.marked = "keyword";
          return cont(expect("variable"));
        }
        if (type2 == "variable")
          return pass(expressionNoComma, exportField);
      }
      function afterImport(type2) {
        if (type2 == "string")
          return cont();
        if (type2 == "(")
          return pass(expression);
        if (type2 == ".")
          return pass(maybeoperatorComma);
        return pass(importSpec, maybeMoreImports, maybeFrom);
      }
      function importSpec(type2, value) {
        if (type2 == "{")
          return contCommasep(importSpec, "}");
        if (type2 == "variable")
          register(value);
        if (value == "*")
          cx.marked = "keyword";
        return cont(maybeAs);
      }
      function maybeMoreImports(type2) {
        if (type2 == ",")
          return cont(importSpec, maybeMoreImports);
      }
      function maybeAs(_type, value) {
        if (value == "as") {
          cx.marked = "keyword";
          return cont(importSpec);
        }
      }
      function maybeFrom(_type, value) {
        if (value == "from") {
          cx.marked = "keyword";
          return cont(expression);
        }
      }
      function arrayLiteral(type2) {
        if (type2 == "]")
          return cont();
        return pass(commasep(expressionNoComma, "]"));
      }
      function enumdef() {
        return pass(pushlex("form"), pattern, expect("{"), pushlex("}"), commasep(enummember, "}"), poplex, poplex);
      }
      function enummember() {
        return pass(pattern, maybeAssign);
      }
      function isContinuedStatement(state, textAfter) {
        return state.lastType == "operator" || state.lastType == "," || isOperatorChar.test(textAfter.charAt(0)) || /[,.]/.test(textAfter.charAt(0));
      }
      function expressionAllowed(stream, state, backUp) {
        return state.tokenize == tokenBase && /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(state.lastType) || state.lastType == "quasi" && /\{\s*$/.test(stream.string.slice(0, stream.pos - (backUp || 0)));
      }
      return {
        startState: function(basecolumn) {
          var state = {
            tokenize: tokenBase,
            lastType: "sof",
            cc: [],
            lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
            localVars: parserConfig.localVars,
            context: parserConfig.localVars && new Context(null, null, false),
            indented: basecolumn || 0
          };
          if (parserConfig.globalVars && typeof parserConfig.globalVars == "object")
            state.globalVars = parserConfig.globalVars;
          return state;
        },
        token: function(stream, state) {
          if (stream.sol()) {
            if (!state.lexical.hasOwnProperty("align"))
              state.lexical.align = false;
            state.indented = stream.indentation();
            findFatArrow(stream, state);
          }
          if (state.tokenize != tokenComment && stream.eatSpace())
            return null;
          var style = state.tokenize(stream, state);
          if (type == "comment")
            return style;
          state.lastType = type == "operator" && (content == "++" || content == "--") ? "incdec" : type;
          return parseJS(state, style, type, content, stream);
        },
        indent: function(state, textAfter) {
          if (state.tokenize == tokenComment || state.tokenize == tokenQuasi)
            return CodeMirror2.Pass;
          if (state.tokenize != tokenBase)
            return 0;
          var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical, top;
          if (!/^\s*else\b/.test(textAfter))
            for (var i2 = state.cc.length - 1; i2 >= 0; --i2) {
              var c2 = state.cc[i2];
              if (c2 == poplex)
                lexical = lexical.prev;
              else if (c2 != maybeelse && c2 != popcontext)
                break;
            }
          while ((lexical.type == "stat" || lexical.type == "form") && (firstChar == "}" || (top = state.cc[state.cc.length - 1]) && (top == maybeoperatorComma || top == maybeoperatorNoComma) && !/^[,\.=+\-*:?[\(]/.test(textAfter)))
            lexical = lexical.prev;
          if (statementIndent && lexical.type == ")" && lexical.prev.type == "stat")
            lexical = lexical.prev;
          var type2 = lexical.type, closing = firstChar == type2;
          if (type2 == "vardef")
            return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? lexical.info.length + 1 : 0);
          else if (type2 == "form" && firstChar == "{")
            return lexical.indented;
          else if (type2 == "form")
            return lexical.indented + indentUnit;
          else if (type2 == "stat")
            return lexical.indented + (isContinuedStatement(state, textAfter) ? statementIndent || indentUnit : 0);
          else if (lexical.info == "switch" && !closing && parserConfig.doubleIndentSwitch != false)
            return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit);
          else if (lexical.align)
            return lexical.column + (closing ? 0 : 1);
          else
            return lexical.indented + (closing ? 0 : indentUnit);
        },
        electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
        blockCommentStart: jsonMode ? null : "/*",
        blockCommentEnd: jsonMode ? null : "*/",
        blockCommentContinue: jsonMode ? null : " * ",
        lineComment: jsonMode ? null : "//",
        fold: "brace",
        closeBrackets: "()[]{}''\"\"``",
        helperType: jsonMode ? "json" : "javascript",
        jsonldMode,
        jsonMode,
        expressionAllowed,
        skipExpression: function(state) {
          parseJS(state, "atom", "atom", "true", new CodeMirror2.StringStream("", 2, null));
        }
      };
    });
    CodeMirror2.registerHelper("wordChars", "javascript", /[\w$]/);
    CodeMirror2.defineMIME("text/javascript", "javascript");
    CodeMirror2.defineMIME("text/ecmascript", "javascript");
    CodeMirror2.defineMIME("application/javascript", "javascript");
    CodeMirror2.defineMIME("application/x-javascript", "javascript");
    CodeMirror2.defineMIME("application/ecmascript", "javascript");
    CodeMirror2.defineMIME("application/json", { name: "javascript", json: true });
    CodeMirror2.defineMIME("application/x-json", { name: "javascript", json: true });
    CodeMirror2.defineMIME("application/manifest+json", { name: "javascript", json: true });
    CodeMirror2.defineMIME("application/ld+json", { name: "javascript", jsonld: true });
    CodeMirror2.defineMIME("text/typescript", { name: "javascript", typescript: true });
    CodeMirror2.defineMIME("application/typescript", { name: "javascript", typescript: true });
  });
})();
var css = { exports: {} };
(function(module, exports) {
  (function(mod) {
    mod(codemirror.exports);
  })(function(CodeMirror2) {
    CodeMirror2.defineMode("css", function(config, parserConfig) {
      var inline = parserConfig.inline;
      if (!parserConfig.propertyKeywords)
        parserConfig = CodeMirror2.resolveMode("text/css");
      var indentUnit = config.indentUnit, tokenHooks = parserConfig.tokenHooks, documentTypes2 = parserConfig.documentTypes || {}, mediaTypes2 = parserConfig.mediaTypes || {}, mediaFeatures2 = parserConfig.mediaFeatures || {}, mediaValueKeywords2 = parserConfig.mediaValueKeywords || {}, propertyKeywords2 = parserConfig.propertyKeywords || {}, nonStandardPropertyKeywords2 = parserConfig.nonStandardPropertyKeywords || {}, fontProperties2 = parserConfig.fontProperties || {}, counterDescriptors2 = parserConfig.counterDescriptors || {}, colorKeywords2 = parserConfig.colorKeywords || {}, valueKeywords2 = parserConfig.valueKeywords || {}, allowNested = parserConfig.allowNested, lineComment = parserConfig.lineComment, supportsAtComponent = parserConfig.supportsAtComponent === true, highlightNonStandardPropertyKeywords = config.highlightNonStandardPropertyKeywords !== false;
      var type, override;
      function ret(style, tp) {
        type = tp;
        return style;
      }
      function tokenBase(stream, state) {
        var ch = stream.next();
        if (tokenHooks[ch]) {
          var result = tokenHooks[ch](stream, state);
          if (result !== false)
            return result;
        }
        if (ch == "@") {
          stream.eatWhile(/[\w\\\-]/);
          return ret("def", stream.current());
        } else if (ch == "=" || (ch == "~" || ch == "|") && stream.eat("=")) {
          return ret(null, "compare");
        } else if (ch == '"' || ch == "'") {
          state.tokenize = tokenString(ch);
          return state.tokenize(stream, state);
        } else if (ch == "#") {
          stream.eatWhile(/[\w\\\-]/);
          return ret("atom", "hash");
        } else if (ch == "!") {
          stream.match(/^\s*\w*/);
          return ret("keyword", "important");
        } else if (/\d/.test(ch) || ch == "." && stream.eat(/\d/)) {
          stream.eatWhile(/[\w.%]/);
          return ret("number", "unit");
        } else if (ch === "-") {
          if (/[\d.]/.test(stream.peek())) {
            stream.eatWhile(/[\w.%]/);
            return ret("number", "unit");
          } else if (stream.match(/^-[\w\\\-]*/)) {
            stream.eatWhile(/[\w\\\-]/);
            if (stream.match(/^\s*:/, false))
              return ret("variable-2", "variable-definition");
            return ret("variable-2", "variable");
          } else if (stream.match(/^\w+-/)) {
            return ret("meta", "meta");
          }
        } else if (/[,+>*\/]/.test(ch)) {
          return ret(null, "select-op");
        } else if (ch == "." && stream.match(/^-?[_a-z][_a-z0-9-]*/i)) {
          return ret("qualifier", "qualifier");
        } else if (/[:;{}\[\]\(\)]/.test(ch)) {
          return ret(null, ch);
        } else if (stream.match(/^[\w-.]+(?=\()/)) {
          if (/^(url(-prefix)?|domain|regexp)$/i.test(stream.current())) {
            state.tokenize = tokenParenthesized;
          }
          return ret("variable callee", "variable");
        } else if (/[\w\\\-]/.test(ch)) {
          stream.eatWhile(/[\w\\\-]/);
          return ret("property", "word");
        } else {
          return ret(null, null);
        }
      }
      function tokenString(quote) {
        return function(stream, state) {
          var escaped = false, ch;
          while ((ch = stream.next()) != null) {
            if (ch == quote && !escaped) {
              if (quote == ")")
                stream.backUp(1);
              break;
            }
            escaped = !escaped && ch == "\\";
          }
          if (ch == quote || !escaped && quote != ")")
            state.tokenize = null;
          return ret("string", "string");
        };
      }
      function tokenParenthesized(stream, state) {
        stream.next();
        if (!stream.match(/^\s*[\"\')]/, false))
          state.tokenize = tokenString(")");
        else
          state.tokenize = null;
        return ret(null, "(");
      }
      function Context(type2, indent, prev) {
        this.type = type2;
        this.indent = indent;
        this.prev = prev;
      }
      function pushContext(state, stream, type2, indent) {
        state.context = new Context(type2, stream.indentation() + (indent === false ? 0 : indentUnit), state.context);
        return type2;
      }
      function popContext(state) {
        if (state.context.prev)
          state.context = state.context.prev;
        return state.context.type;
      }
      function pass(type2, stream, state) {
        return states[state.context.type](type2, stream, state);
      }
      function popAndPass(type2, stream, state, n2) {
        for (var i2 = n2 || 1; i2 > 0; i2--)
          state.context = state.context.prev;
        return pass(type2, stream, state);
      }
      function wordAsValue(stream) {
        var word = stream.current().toLowerCase();
        if (valueKeywords2.hasOwnProperty(word))
          override = "atom";
        else if (colorKeywords2.hasOwnProperty(word))
          override = "keyword";
        else
          override = "variable";
      }
      var states = {};
      states.top = function(type2, stream, state) {
        if (type2 == "{") {
          return pushContext(state, stream, "block");
        } else if (type2 == "}" && state.context.prev) {
          return popContext(state);
        } else if (supportsAtComponent && /@component/i.test(type2)) {
          return pushContext(state, stream, "atComponentBlock");
        } else if (/^@(-moz-)?document$/i.test(type2)) {
          return pushContext(state, stream, "documentTypes");
        } else if (/^@(media|supports|(-moz-)?document|import)$/i.test(type2)) {
          return pushContext(state, stream, "atBlock");
        } else if (/^@(font-face|counter-style)/i.test(type2)) {
          state.stateArg = type2;
          return "restricted_atBlock_before";
        } else if (/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(type2)) {
          return "keyframes";
        } else if (type2 && type2.charAt(0) == "@") {
          return pushContext(state, stream, "at");
        } else if (type2 == "hash") {
          override = "builtin";
        } else if (type2 == "word") {
          override = "tag";
        } else if (type2 == "variable-definition") {
          return "maybeprop";
        } else if (type2 == "interpolation") {
          return pushContext(state, stream, "interpolation");
        } else if (type2 == ":") {
          return "pseudo";
        } else if (allowNested && type2 == "(") {
          return pushContext(state, stream, "parens");
        }
        return state.context.type;
      };
      states.block = function(type2, stream, state) {
        if (type2 == "word") {
          var word = stream.current().toLowerCase();
          if (propertyKeywords2.hasOwnProperty(word)) {
            override = "property";
            return "maybeprop";
          } else if (nonStandardPropertyKeywords2.hasOwnProperty(word)) {
            override = highlightNonStandardPropertyKeywords ? "string-2" : "property";
            return "maybeprop";
          } else if (allowNested) {
            override = stream.match(/^\s*:(?:\s|$)/, false) ? "property" : "tag";
            return "block";
          } else {
            override += " error";
            return "maybeprop";
          }
        } else if (type2 == "meta") {
          return "block";
        } else if (!allowNested && (type2 == "hash" || type2 == "qualifier")) {
          override = "error";
          return "block";
        } else {
          return states.top(type2, stream, state);
        }
      };
      states.maybeprop = function(type2, stream, state) {
        if (type2 == ":")
          return pushContext(state, stream, "prop");
        return pass(type2, stream, state);
      };
      states.prop = function(type2, stream, state) {
        if (type2 == ";")
          return popContext(state);
        if (type2 == "{" && allowNested)
          return pushContext(state, stream, "propBlock");
        if (type2 == "}" || type2 == "{")
          return popAndPass(type2, stream, state);
        if (type2 == "(")
          return pushContext(state, stream, "parens");
        if (type2 == "hash" && !/^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(stream.current())) {
          override += " error";
        } else if (type2 == "word") {
          wordAsValue(stream);
        } else if (type2 == "interpolation") {
          return pushContext(state, stream, "interpolation");
        }
        return "prop";
      };
      states.propBlock = function(type2, _stream, state) {
        if (type2 == "}")
          return popContext(state);
        if (type2 == "word") {
          override = "property";
          return "maybeprop";
        }
        return state.context.type;
      };
      states.parens = function(type2, stream, state) {
        if (type2 == "{" || type2 == "}")
          return popAndPass(type2, stream, state);
        if (type2 == ")")
          return popContext(state);
        if (type2 == "(")
          return pushContext(state, stream, "parens");
        if (type2 == "interpolation")
          return pushContext(state, stream, "interpolation");
        if (type2 == "word")
          wordAsValue(stream);
        return "parens";
      };
      states.pseudo = function(type2, stream, state) {
        if (type2 == "meta")
          return "pseudo";
        if (type2 == "word") {
          override = "variable-3";
          return state.context.type;
        }
        return pass(type2, stream, state);
      };
      states.documentTypes = function(type2, stream, state) {
        if (type2 == "word" && documentTypes2.hasOwnProperty(stream.current())) {
          override = "tag";
          return state.context.type;
        } else {
          return states.atBlock(type2, stream, state);
        }
      };
      states.atBlock = function(type2, stream, state) {
        if (type2 == "(")
          return pushContext(state, stream, "atBlock_parens");
        if (type2 == "}" || type2 == ";")
          return popAndPass(type2, stream, state);
        if (type2 == "{")
          return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top");
        if (type2 == "interpolation")
          return pushContext(state, stream, "interpolation");
        if (type2 == "word") {
          var word = stream.current().toLowerCase();
          if (word == "only" || word == "not" || word == "and" || word == "or")
            override = "keyword";
          else if (mediaTypes2.hasOwnProperty(word))
            override = "attribute";
          else if (mediaFeatures2.hasOwnProperty(word))
            override = "property";
          else if (mediaValueKeywords2.hasOwnProperty(word))
            override = "keyword";
          else if (propertyKeywords2.hasOwnProperty(word))
            override = "property";
          else if (nonStandardPropertyKeywords2.hasOwnProperty(word))
            override = highlightNonStandardPropertyKeywords ? "string-2" : "property";
          else if (valueKeywords2.hasOwnProperty(word))
            override = "atom";
          else if (colorKeywords2.hasOwnProperty(word))
            override = "keyword";
          else
            override = "error";
        }
        return state.context.type;
      };
      states.atComponentBlock = function(type2, stream, state) {
        if (type2 == "}")
          return popAndPass(type2, stream, state);
        if (type2 == "{")
          return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top", false);
        if (type2 == "word")
          override = "error";
        return state.context.type;
      };
      states.atBlock_parens = function(type2, stream, state) {
        if (type2 == ")")
          return popContext(state);
        if (type2 == "{" || type2 == "}")
          return popAndPass(type2, stream, state, 2);
        return states.atBlock(type2, stream, state);
      };
      states.restricted_atBlock_before = function(type2, stream, state) {
        if (type2 == "{")
          return pushContext(state, stream, "restricted_atBlock");
        if (type2 == "word" && state.stateArg == "@counter-style") {
          override = "variable";
          return "restricted_atBlock_before";
        }
        return pass(type2, stream, state);
      };
      states.restricted_atBlock = function(type2, stream, state) {
        if (type2 == "}") {
          state.stateArg = null;
          return popContext(state);
        }
        if (type2 == "word") {
          if (state.stateArg == "@font-face" && !fontProperties2.hasOwnProperty(stream.current().toLowerCase()) || state.stateArg == "@counter-style" && !counterDescriptors2.hasOwnProperty(stream.current().toLowerCase()))
            override = "error";
          else
            override = "property";
          return "maybeprop";
        }
        return "restricted_atBlock";
      };
      states.keyframes = function(type2, stream, state) {
        if (type2 == "word") {
          override = "variable";
          return "keyframes";
        }
        if (type2 == "{")
          return pushContext(state, stream, "top");
        return pass(type2, stream, state);
      };
      states.at = function(type2, stream, state) {
        if (type2 == ";")
          return popContext(state);
        if (type2 == "{" || type2 == "}")
          return popAndPass(type2, stream, state);
        if (type2 == "word")
          override = "tag";
        else if (type2 == "hash")
          override = "builtin";
        return "at";
      };
      states.interpolation = function(type2, stream, state) {
        if (type2 == "}")
          return popContext(state);
        if (type2 == "{" || type2 == ";")
          return popAndPass(type2, stream, state);
        if (type2 == "word")
          override = "variable";
        else if (type2 != "variable" && type2 != "(" && type2 != ")")
          override = "error";
        return "interpolation";
      };
      return {
        startState: function(base) {
          return {
            tokenize: null,
            state: inline ? "block" : "top",
            stateArg: null,
            context: new Context(inline ? "block" : "top", base || 0, null)
          };
        },
        token: function(stream, state) {
          if (!state.tokenize && stream.eatSpace())
            return null;
          var style = (state.tokenize || tokenBase)(stream, state);
          if (style && typeof style == "object") {
            type = style[1];
            style = style[0];
          }
          override = style;
          if (type != "comment")
            state.state = states[state.state](type, stream, state);
          return override;
        },
        indent: function(state, textAfter) {
          var cx = state.context, ch = textAfter && textAfter.charAt(0);
          var indent = cx.indent;
          if (cx.type == "prop" && (ch == "}" || ch == ")"))
            cx = cx.prev;
          if (cx.prev) {
            if (ch == "}" && (cx.type == "block" || cx.type == "top" || cx.type == "interpolation" || cx.type == "restricted_atBlock")) {
              cx = cx.prev;
              indent = cx.indent;
            } else if (ch == ")" && (cx.type == "parens" || cx.type == "atBlock_parens") || ch == "{" && (cx.type == "at" || cx.type == "atBlock")) {
              indent = Math.max(0, cx.indent - indentUnit);
            }
          }
          return indent;
        },
        electricChars: "}",
        blockCommentStart: "/*",
        blockCommentEnd: "*/",
        blockCommentContinue: " * ",
        lineComment,
        fold: "brace"
      };
    });
    function keySet(array) {
      var keys = {};
      for (var i2 = 0; i2 < array.length; ++i2) {
        keys[array[i2].toLowerCase()] = true;
      }
      return keys;
    }
    var documentTypes_ = [
      "domain",
      "regexp",
      "url",
      "url-prefix"
    ], documentTypes = keySet(documentTypes_);
    var mediaTypes_ = [
      "all",
      "aural",
      "braille",
      "handheld",
      "print",
      "projection",
      "screen",
      "tty",
      "tv",
      "embossed"
    ], mediaTypes = keySet(mediaTypes_);
    var mediaFeatures_ = [
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "device-width",
      "min-device-width",
      "max-device-width",
      "device-height",
      "min-device-height",
      "max-device-height",
      "aspect-ratio",
      "min-aspect-ratio",
      "max-aspect-ratio",
      "device-aspect-ratio",
      "min-device-aspect-ratio",
      "max-device-aspect-ratio",
      "color",
      "min-color",
      "max-color",
      "color-index",
      "min-color-index",
      "max-color-index",
      "monochrome",
      "min-monochrome",
      "max-monochrome",
      "resolution",
      "min-resolution",
      "max-resolution",
      "scan",
      "grid",
      "orientation",
      "device-pixel-ratio",
      "min-device-pixel-ratio",
      "max-device-pixel-ratio",
      "pointer",
      "any-pointer",
      "hover",
      "any-hover",
      "prefers-color-scheme"
    ], mediaFeatures = keySet(mediaFeatures_);
    var mediaValueKeywords_ = [
      "landscape",
      "portrait",
      "none",
      "coarse",
      "fine",
      "on-demand",
      "hover",
      "interlace",
      "progressive",
      "dark",
      "light"
    ], mediaValueKeywords = keySet(mediaValueKeywords_);
    var propertyKeywords_ = [
      "align-content",
      "align-items",
      "align-self",
      "alignment-adjust",
      "alignment-baseline",
      "all",
      "anchor-point",
      "animation",
      "animation-delay",
      "animation-direction",
      "animation-duration",
      "animation-fill-mode",
      "animation-iteration-count",
      "animation-name",
      "animation-play-state",
      "animation-timing-function",
      "appearance",
      "azimuth",
      "backdrop-filter",
      "backface-visibility",
      "background",
      "background-attachment",
      "background-blend-mode",
      "background-clip",
      "background-color",
      "background-image",
      "background-origin",
      "background-position",
      "background-position-x",
      "background-position-y",
      "background-repeat",
      "background-size",
      "baseline-shift",
      "binding",
      "bleed",
      "block-size",
      "bookmark-label",
      "bookmark-level",
      "bookmark-state",
      "bookmark-target",
      "border",
      "border-bottom",
      "border-bottom-color",
      "border-bottom-left-radius",
      "border-bottom-right-radius",
      "border-bottom-style",
      "border-bottom-width",
      "border-collapse",
      "border-color",
      "border-image",
      "border-image-outset",
      "border-image-repeat",
      "border-image-slice",
      "border-image-source",
      "border-image-width",
      "border-left",
      "border-left-color",
      "border-left-style",
      "border-left-width",
      "border-radius",
      "border-right",
      "border-right-color",
      "border-right-style",
      "border-right-width",
      "border-spacing",
      "border-style",
      "border-top",
      "border-top-color",
      "border-top-left-radius",
      "border-top-right-radius",
      "border-top-style",
      "border-top-width",
      "border-width",
      "bottom",
      "box-decoration-break",
      "box-shadow",
      "box-sizing",
      "break-after",
      "break-before",
      "break-inside",
      "caption-side",
      "caret-color",
      "clear",
      "clip",
      "color",
      "color-profile",
      "column-count",
      "column-fill",
      "column-gap",
      "column-rule",
      "column-rule-color",
      "column-rule-style",
      "column-rule-width",
      "column-span",
      "column-width",
      "columns",
      "contain",
      "content",
      "counter-increment",
      "counter-reset",
      "crop",
      "cue",
      "cue-after",
      "cue-before",
      "cursor",
      "direction",
      "display",
      "dominant-baseline",
      "drop-initial-after-adjust",
      "drop-initial-after-align",
      "drop-initial-before-adjust",
      "drop-initial-before-align",
      "drop-initial-size",
      "drop-initial-value",
      "elevation",
      "empty-cells",
      "fit",
      "fit-content",
      "fit-position",
      "flex",
      "flex-basis",
      "flex-direction",
      "flex-flow",
      "flex-grow",
      "flex-shrink",
      "flex-wrap",
      "float",
      "float-offset",
      "flow-from",
      "flow-into",
      "font",
      "font-family",
      "font-feature-settings",
      "font-kerning",
      "font-language-override",
      "font-optical-sizing",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-synthesis",
      "font-variant",
      "font-variant-alternates",
      "font-variant-caps",
      "font-variant-east-asian",
      "font-variant-ligatures",
      "font-variant-numeric",
      "font-variant-position",
      "font-variation-settings",
      "font-weight",
      "gap",
      "grid",
      "grid-area",
      "grid-auto-columns",
      "grid-auto-flow",
      "grid-auto-rows",
      "grid-column",
      "grid-column-end",
      "grid-column-gap",
      "grid-column-start",
      "grid-gap",
      "grid-row",
      "grid-row-end",
      "grid-row-gap",
      "grid-row-start",
      "grid-template",
      "grid-template-areas",
      "grid-template-columns",
      "grid-template-rows",
      "hanging-punctuation",
      "height",
      "hyphens",
      "icon",
      "image-orientation",
      "image-rendering",
      "image-resolution",
      "inline-box-align",
      "inset",
      "inset-block",
      "inset-block-end",
      "inset-block-start",
      "inset-inline",
      "inset-inline-end",
      "inset-inline-start",
      "isolation",
      "justify-content",
      "justify-items",
      "justify-self",
      "left",
      "letter-spacing",
      "line-break",
      "line-height",
      "line-height-step",
      "line-stacking",
      "line-stacking-ruby",
      "line-stacking-shift",
      "line-stacking-strategy",
      "list-style",
      "list-style-image",
      "list-style-position",
      "list-style-type",
      "margin",
      "margin-bottom",
      "margin-left",
      "margin-right",
      "margin-top",
      "marks",
      "marquee-direction",
      "marquee-loop",
      "marquee-play-count",
      "marquee-speed",
      "marquee-style",
      "mask-clip",
      "mask-composite",
      "mask-image",
      "mask-mode",
      "mask-origin",
      "mask-position",
      "mask-repeat",
      "mask-size",
      "mask-type",
      "max-block-size",
      "max-height",
      "max-inline-size",
      "max-width",
      "min-block-size",
      "min-height",
      "min-inline-size",
      "min-width",
      "mix-blend-mode",
      "move-to",
      "nav-down",
      "nav-index",
      "nav-left",
      "nav-right",
      "nav-up",
      "object-fit",
      "object-position",
      "offset",
      "offset-anchor",
      "offset-distance",
      "offset-path",
      "offset-position",
      "offset-rotate",
      "opacity",
      "order",
      "orphans",
      "outline",
      "outline-color",
      "outline-offset",
      "outline-style",
      "outline-width",
      "overflow",
      "overflow-style",
      "overflow-wrap",
      "overflow-x",
      "overflow-y",
      "padding",
      "padding-bottom",
      "padding-left",
      "padding-right",
      "padding-top",
      "page",
      "page-break-after",
      "page-break-before",
      "page-break-inside",
      "page-policy",
      "pause",
      "pause-after",
      "pause-before",
      "perspective",
      "perspective-origin",
      "pitch",
      "pitch-range",
      "place-content",
      "place-items",
      "place-self",
      "play-during",
      "position",
      "presentation-level",
      "punctuation-trim",
      "quotes",
      "region-break-after",
      "region-break-before",
      "region-break-inside",
      "region-fragment",
      "rendering-intent",
      "resize",
      "rest",
      "rest-after",
      "rest-before",
      "richness",
      "right",
      "rotate",
      "rotation",
      "rotation-point",
      "row-gap",
      "ruby-align",
      "ruby-overhang",
      "ruby-position",
      "ruby-span",
      "scale",
      "scroll-behavior",
      "scroll-margin",
      "scroll-margin-block",
      "scroll-margin-block-end",
      "scroll-margin-block-start",
      "scroll-margin-bottom",
      "scroll-margin-inline",
      "scroll-margin-inline-end",
      "scroll-margin-inline-start",
      "scroll-margin-left",
      "scroll-margin-right",
      "scroll-margin-top",
      "scroll-padding",
      "scroll-padding-block",
      "scroll-padding-block-end",
      "scroll-padding-block-start",
      "scroll-padding-bottom",
      "scroll-padding-inline",
      "scroll-padding-inline-end",
      "scroll-padding-inline-start",
      "scroll-padding-left",
      "scroll-padding-right",
      "scroll-padding-top",
      "scroll-snap-align",
      "scroll-snap-type",
      "shape-image-threshold",
      "shape-inside",
      "shape-margin",
      "shape-outside",
      "size",
      "speak",
      "speak-as",
      "speak-header",
      "speak-numeral",
      "speak-punctuation",
      "speech-rate",
      "stress",
      "string-set",
      "tab-size",
      "table-layout",
      "target",
      "target-name",
      "target-new",
      "target-position",
      "text-align",
      "text-align-last",
      "text-combine-upright",
      "text-decoration",
      "text-decoration-color",
      "text-decoration-line",
      "text-decoration-skip",
      "text-decoration-skip-ink",
      "text-decoration-style",
      "text-emphasis",
      "text-emphasis-color",
      "text-emphasis-position",
      "text-emphasis-style",
      "text-height",
      "text-indent",
      "text-justify",
      "text-orientation",
      "text-outline",
      "text-overflow",
      "text-rendering",
      "text-shadow",
      "text-size-adjust",
      "text-space-collapse",
      "text-transform",
      "text-underline-position",
      "text-wrap",
      "top",
      "touch-action",
      "transform",
      "transform-origin",
      "transform-style",
      "transition",
      "transition-delay",
      "transition-duration",
      "transition-property",
      "transition-timing-function",
      "translate",
      "unicode-bidi",
      "user-select",
      "vertical-align",
      "visibility",
      "voice-balance",
      "voice-duration",
      "voice-family",
      "voice-pitch",
      "voice-range",
      "voice-rate",
      "voice-stress",
      "voice-volume",
      "volume",
      "white-space",
      "widows",
      "width",
      "will-change",
      "word-break",
      "word-spacing",
      "word-wrap",
      "writing-mode",
      "z-index",
      "clip-path",
      "clip-rule",
      "mask",
      "enable-background",
      "filter",
      "flood-color",
      "flood-opacity",
      "lighting-color",
      "stop-color",
      "stop-opacity",
      "pointer-events",
      "color-interpolation",
      "color-interpolation-filters",
      "color-rendering",
      "fill",
      "fill-opacity",
      "fill-rule",
      "image-rendering",
      "marker",
      "marker-end",
      "marker-mid",
      "marker-start",
      "paint-order",
      "shape-rendering",
      "stroke",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-rendering",
      "baseline-shift",
      "dominant-baseline",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "text-anchor",
      "writing-mode"
    ], propertyKeywords = keySet(propertyKeywords_);
    var nonStandardPropertyKeywords_ = [
      "accent-color",
      "aspect-ratio",
      "border-block",
      "border-block-color",
      "border-block-end",
      "border-block-end-color",
      "border-block-end-style",
      "border-block-end-width",
      "border-block-start",
      "border-block-start-color",
      "border-block-start-style",
      "border-block-start-width",
      "border-block-style",
      "border-block-width",
      "border-inline",
      "border-inline-color",
      "border-inline-end",
      "border-inline-end-color",
      "border-inline-end-style",
      "border-inline-end-width",
      "border-inline-start",
      "border-inline-start-color",
      "border-inline-start-style",
      "border-inline-start-width",
      "border-inline-style",
      "border-inline-width",
      "content-visibility",
      "margin-block",
      "margin-block-end",
      "margin-block-start",
      "margin-inline",
      "margin-inline-end",
      "margin-inline-start",
      "overflow-anchor",
      "overscroll-behavior",
      "padding-block",
      "padding-block-end",
      "padding-block-start",
      "padding-inline",
      "padding-inline-end",
      "padding-inline-start",
      "scroll-snap-stop",
      "scrollbar-3d-light-color",
      "scrollbar-arrow-color",
      "scrollbar-base-color",
      "scrollbar-dark-shadow-color",
      "scrollbar-face-color",
      "scrollbar-highlight-color",
      "scrollbar-shadow-color",
      "scrollbar-track-color",
      "searchfield-cancel-button",
      "searchfield-decoration",
      "searchfield-results-button",
      "searchfield-results-decoration",
      "shape-inside",
      "zoom"
    ], nonStandardPropertyKeywords = keySet(nonStandardPropertyKeywords_);
    var fontProperties_ = [
      "font-display",
      "font-family",
      "src",
      "unicode-range",
      "font-variant",
      "font-feature-settings",
      "font-stretch",
      "font-weight",
      "font-style"
    ], fontProperties = keySet(fontProperties_);
    var counterDescriptors_ = [
      "additive-symbols",
      "fallback",
      "negative",
      "pad",
      "prefix",
      "range",
      "speak-as",
      "suffix",
      "symbols",
      "system"
    ], counterDescriptors = keySet(counterDescriptors_);
    var colorKeywords_ = [
      "aliceblue",
      "antiquewhite",
      "aqua",
      "aquamarine",
      "azure",
      "beige",
      "bisque",
      "black",
      "blanchedalmond",
      "blue",
      "blueviolet",
      "brown",
      "burlywood",
      "cadetblue",
      "chartreuse",
      "chocolate",
      "coral",
      "cornflowerblue",
      "cornsilk",
      "crimson",
      "cyan",
      "darkblue",
      "darkcyan",
      "darkgoldenrod",
      "darkgray",
      "darkgreen",
      "darkgrey",
      "darkkhaki",
      "darkmagenta",
      "darkolivegreen",
      "darkorange",
      "darkorchid",
      "darkred",
      "darksalmon",
      "darkseagreen",
      "darkslateblue",
      "darkslategray",
      "darkslategrey",
      "darkturquoise",
      "darkviolet",
      "deeppink",
      "deepskyblue",
      "dimgray",
      "dimgrey",
      "dodgerblue",
      "firebrick",
      "floralwhite",
      "forestgreen",
      "fuchsia",
      "gainsboro",
      "ghostwhite",
      "gold",
      "goldenrod",
      "gray",
      "grey",
      "green",
      "greenyellow",
      "honeydew",
      "hotpink",
      "indianred",
      "indigo",
      "ivory",
      "khaki",
      "lavender",
      "lavenderblush",
      "lawngreen",
      "lemonchiffon",
      "lightblue",
      "lightcoral",
      "lightcyan",
      "lightgoldenrodyellow",
      "lightgray",
      "lightgreen",
      "lightgrey",
      "lightpink",
      "lightsalmon",
      "lightseagreen",
      "lightskyblue",
      "lightslategray",
      "lightslategrey",
      "lightsteelblue",
      "lightyellow",
      "lime",
      "limegreen",
      "linen",
      "magenta",
      "maroon",
      "mediumaquamarine",
      "mediumblue",
      "mediumorchid",
      "mediumpurple",
      "mediumseagreen",
      "mediumslateblue",
      "mediumspringgreen",
      "mediumturquoise",
      "mediumvioletred",
      "midnightblue",
      "mintcream",
      "mistyrose",
      "moccasin",
      "navajowhite",
      "navy",
      "oldlace",
      "olive",
      "olivedrab",
      "orange",
      "orangered",
      "orchid",
      "palegoldenrod",
      "palegreen",
      "paleturquoise",
      "palevioletred",
      "papayawhip",
      "peachpuff",
      "peru",
      "pink",
      "plum",
      "powderblue",
      "purple",
      "rebeccapurple",
      "red",
      "rosybrown",
      "royalblue",
      "saddlebrown",
      "salmon",
      "sandybrown",
      "seagreen",
      "seashell",
      "sienna",
      "silver",
      "skyblue",
      "slateblue",
      "slategray",
      "slategrey",
      "snow",
      "springgreen",
      "steelblue",
      "tan",
      "teal",
      "thistle",
      "tomato",
      "turquoise",
      "violet",
      "wheat",
      "white",
      "whitesmoke",
      "yellow",
      "yellowgreen"
    ], colorKeywords = keySet(colorKeywords_);
    var valueKeywords_ = [
      "above",
      "absolute",
      "activeborder",
      "additive",
      "activecaption",
      "afar",
      "after-white-space",
      "ahead",
      "alias",
      "all",
      "all-scroll",
      "alphabetic",
      "alternate",
      "always",
      "amharic",
      "amharic-abegede",
      "antialiased",
      "appworkspace",
      "arabic-indic",
      "armenian",
      "asterisks",
      "attr",
      "auto",
      "auto-flow",
      "avoid",
      "avoid-column",
      "avoid-page",
      "avoid-region",
      "axis-pan",
      "background",
      "backwards",
      "baseline",
      "below",
      "bidi-override",
      "binary",
      "bengali",
      "blink",
      "block",
      "block-axis",
      "blur",
      "bold",
      "bolder",
      "border",
      "border-box",
      "both",
      "bottom",
      "break",
      "break-all",
      "break-word",
      "brightness",
      "bullets",
      "button",
      "button-bevel",
      "buttonface",
      "buttonhighlight",
      "buttonshadow",
      "buttontext",
      "calc",
      "cambodian",
      "capitalize",
      "caps-lock-indicator",
      "caption",
      "captiontext",
      "caret",
      "cell",
      "center",
      "checkbox",
      "circle",
      "cjk-decimal",
      "cjk-earthly-branch",
      "cjk-heavenly-stem",
      "cjk-ideographic",
      "clear",
      "clip",
      "close-quote",
      "col-resize",
      "collapse",
      "color",
      "color-burn",
      "color-dodge",
      "column",
      "column-reverse",
      "compact",
      "condensed",
      "contain",
      "content",
      "contents",
      "content-box",
      "context-menu",
      "continuous",
      "contrast",
      "copy",
      "counter",
      "counters",
      "cover",
      "crop",
      "cross",
      "crosshair",
      "cubic-bezier",
      "currentcolor",
      "cursive",
      "cyclic",
      "darken",
      "dashed",
      "decimal",
      "decimal-leading-zero",
      "default",
      "default-button",
      "dense",
      "destination-atop",
      "destination-in",
      "destination-out",
      "destination-over",
      "devanagari",
      "difference",
      "disc",
      "discard",
      "disclosure-closed",
      "disclosure-open",
      "document",
      "dot-dash",
      "dot-dot-dash",
      "dotted",
      "double",
      "down",
      "drop-shadow",
      "e-resize",
      "ease",
      "ease-in",
      "ease-in-out",
      "ease-out",
      "element",
      "ellipse",
      "ellipsis",
      "embed",
      "end",
      "ethiopic",
      "ethiopic-abegede",
      "ethiopic-abegede-am-et",
      "ethiopic-abegede-gez",
      "ethiopic-abegede-ti-er",
      "ethiopic-abegede-ti-et",
      "ethiopic-halehame-aa-er",
      "ethiopic-halehame-aa-et",
      "ethiopic-halehame-am-et",
      "ethiopic-halehame-gez",
      "ethiopic-halehame-om-et",
      "ethiopic-halehame-sid-et",
      "ethiopic-halehame-so-et",
      "ethiopic-halehame-ti-er",
      "ethiopic-halehame-ti-et",
      "ethiopic-halehame-tig",
      "ethiopic-numeric",
      "ew-resize",
      "exclusion",
      "expanded",
      "extends",
      "extra-condensed",
      "extra-expanded",
      "fantasy",
      "fast",
      "fill",
      "fill-box",
      "fixed",
      "flat",
      "flex",
      "flex-end",
      "flex-start",
      "footnotes",
      "forwards",
      "from",
      "geometricPrecision",
      "georgian",
      "grayscale",
      "graytext",
      "grid",
      "groove",
      "gujarati",
      "gurmukhi",
      "hand",
      "hangul",
      "hangul-consonant",
      "hard-light",
      "hebrew",
      "help",
      "hidden",
      "hide",
      "higher",
      "highlight",
      "highlighttext",
      "hiragana",
      "hiragana-iroha",
      "horizontal",
      "hsl",
      "hsla",
      "hue",
      "hue-rotate",
      "icon",
      "ignore",
      "inactiveborder",
      "inactivecaption",
      "inactivecaptiontext",
      "infinite",
      "infobackground",
      "infotext",
      "inherit",
      "initial",
      "inline",
      "inline-axis",
      "inline-block",
      "inline-flex",
      "inline-grid",
      "inline-table",
      "inset",
      "inside",
      "intrinsic",
      "invert",
      "italic",
      "japanese-formal",
      "japanese-informal",
      "justify",
      "kannada",
      "katakana",
      "katakana-iroha",
      "keep-all",
      "khmer",
      "korean-hangul-formal",
      "korean-hanja-formal",
      "korean-hanja-informal",
      "landscape",
      "lao",
      "large",
      "larger",
      "left",
      "level",
      "lighter",
      "lighten",
      "line-through",
      "linear",
      "linear-gradient",
      "lines",
      "list-item",
      "listbox",
      "listitem",
      "local",
      "logical",
      "loud",
      "lower",
      "lower-alpha",
      "lower-armenian",
      "lower-greek",
      "lower-hexadecimal",
      "lower-latin",
      "lower-norwegian",
      "lower-roman",
      "lowercase",
      "ltr",
      "luminosity",
      "malayalam",
      "manipulation",
      "match",
      "matrix",
      "matrix3d",
      "media-controls-background",
      "media-current-time-display",
      "media-fullscreen-button",
      "media-mute-button",
      "media-play-button",
      "media-return-to-realtime-button",
      "media-rewind-button",
      "media-seek-back-button",
      "media-seek-forward-button",
      "media-slider",
      "media-sliderthumb",
      "media-time-remaining-display",
      "media-volume-slider",
      "media-volume-slider-container",
      "media-volume-sliderthumb",
      "medium",
      "menu",
      "menulist",
      "menulist-button",
      "menulist-text",
      "menulist-textfield",
      "menutext",
      "message-box",
      "middle",
      "min-intrinsic",
      "mix",
      "mongolian",
      "monospace",
      "move",
      "multiple",
      "multiple_mask_images",
      "multiply",
      "myanmar",
      "n-resize",
      "narrower",
      "ne-resize",
      "nesw-resize",
      "no-close-quote",
      "no-drop",
      "no-open-quote",
      "no-repeat",
      "none",
      "normal",
      "not-allowed",
      "nowrap",
      "ns-resize",
      "numbers",
      "numeric",
      "nw-resize",
      "nwse-resize",
      "oblique",
      "octal",
      "opacity",
      "open-quote",
      "optimizeLegibility",
      "optimizeSpeed",
      "oriya",
      "oromo",
      "outset",
      "outside",
      "outside-shape",
      "overlay",
      "overline",
      "padding",
      "padding-box",
      "painted",
      "page",
      "paused",
      "persian",
      "perspective",
      "pinch-zoom",
      "plus-darker",
      "plus-lighter",
      "pointer",
      "polygon",
      "portrait",
      "pre",
      "pre-line",
      "pre-wrap",
      "preserve-3d",
      "progress",
      "push-button",
      "radial-gradient",
      "radio",
      "read-only",
      "read-write",
      "read-write-plaintext-only",
      "rectangle",
      "region",
      "relative",
      "repeat",
      "repeating-linear-gradient",
      "repeating-radial-gradient",
      "repeat-x",
      "repeat-y",
      "reset",
      "reverse",
      "rgb",
      "rgba",
      "ridge",
      "right",
      "rotate",
      "rotate3d",
      "rotateX",
      "rotateY",
      "rotateZ",
      "round",
      "row",
      "row-resize",
      "row-reverse",
      "rtl",
      "run-in",
      "running",
      "s-resize",
      "sans-serif",
      "saturate",
      "saturation",
      "scale",
      "scale3d",
      "scaleX",
      "scaleY",
      "scaleZ",
      "screen",
      "scroll",
      "scrollbar",
      "scroll-position",
      "se-resize",
      "searchfield",
      "searchfield-cancel-button",
      "searchfield-decoration",
      "searchfield-results-button",
      "searchfield-results-decoration",
      "self-start",
      "self-end",
      "semi-condensed",
      "semi-expanded",
      "separate",
      "sepia",
      "serif",
      "show",
      "sidama",
      "simp-chinese-formal",
      "simp-chinese-informal",
      "single",
      "skew",
      "skewX",
      "skewY",
      "skip-white-space",
      "slide",
      "slider-horizontal",
      "slider-vertical",
      "sliderthumb-horizontal",
      "sliderthumb-vertical",
      "slow",
      "small",
      "small-caps",
      "small-caption",
      "smaller",
      "soft-light",
      "solid",
      "somali",
      "source-atop",
      "source-in",
      "source-out",
      "source-over",
      "space",
      "space-around",
      "space-between",
      "space-evenly",
      "spell-out",
      "square",
      "square-button",
      "start",
      "static",
      "status-bar",
      "stretch",
      "stroke",
      "stroke-box",
      "sub",
      "subpixel-antialiased",
      "svg_masks",
      "super",
      "sw-resize",
      "symbolic",
      "symbols",
      "system-ui",
      "table",
      "table-caption",
      "table-cell",
      "table-column",
      "table-column-group",
      "table-footer-group",
      "table-header-group",
      "table-row",
      "table-row-group",
      "tamil",
      "telugu",
      "text",
      "text-bottom",
      "text-top",
      "textarea",
      "textfield",
      "thai",
      "thick",
      "thin",
      "threeddarkshadow",
      "threedface",
      "threedhighlight",
      "threedlightshadow",
      "threedshadow",
      "tibetan",
      "tigre",
      "tigrinya-er",
      "tigrinya-er-abegede",
      "tigrinya-et",
      "tigrinya-et-abegede",
      "to",
      "top",
      "trad-chinese-formal",
      "trad-chinese-informal",
      "transform",
      "translate",
      "translate3d",
      "translateX",
      "translateY",
      "translateZ",
      "transparent",
      "ultra-condensed",
      "ultra-expanded",
      "underline",
      "unidirectional-pan",
      "unset",
      "up",
      "upper-alpha",
      "upper-armenian",
      "upper-greek",
      "upper-hexadecimal",
      "upper-latin",
      "upper-norwegian",
      "upper-roman",
      "uppercase",
      "urdu",
      "url",
      "var",
      "vertical",
      "vertical-text",
      "view-box",
      "visible",
      "visibleFill",
      "visiblePainted",
      "visibleStroke",
      "visual",
      "w-resize",
      "wait",
      "wave",
      "wider",
      "window",
      "windowframe",
      "windowtext",
      "words",
      "wrap",
      "wrap-reverse",
      "x-large",
      "x-small",
      "xor",
      "xx-large",
      "xx-small"
    ], valueKeywords = keySet(valueKeywords_);
    var allWords = documentTypes_.concat(mediaTypes_).concat(mediaFeatures_).concat(mediaValueKeywords_).concat(propertyKeywords_).concat(nonStandardPropertyKeywords_).concat(colorKeywords_).concat(valueKeywords_);
    CodeMirror2.registerHelper("hintWords", "css", allWords);
    function tokenCComment(stream, state) {
      var maybeEnd = false, ch;
      while ((ch = stream.next()) != null) {
        if (maybeEnd && ch == "/") {
          state.tokenize = null;
          break;
        }
        maybeEnd = ch == "*";
      }
      return ["comment", "comment"];
    }
    CodeMirror2.defineMIME("text/css", {
      documentTypes,
      mediaTypes,
      mediaFeatures,
      mediaValueKeywords,
      propertyKeywords,
      nonStandardPropertyKeywords,
      fontProperties,
      counterDescriptors,
      colorKeywords,
      valueKeywords,
      tokenHooks: {
        "/": function(stream, state) {
          if (!stream.eat("*"))
            return false;
          state.tokenize = tokenCComment;
          return tokenCComment(stream, state);
        }
      },
      name: "css"
    });
    CodeMirror2.defineMIME("text/x-scss", {
      mediaTypes,
      mediaFeatures,
      mediaValueKeywords,
      propertyKeywords,
      nonStandardPropertyKeywords,
      colorKeywords,
      valueKeywords,
      fontProperties,
      allowNested: true,
      lineComment: "//",
      tokenHooks: {
        "/": function(stream, state) {
          if (stream.eat("/")) {
            stream.skipToEnd();
            return ["comment", "comment"];
          } else if (stream.eat("*")) {
            state.tokenize = tokenCComment;
            return tokenCComment(stream, state);
          } else {
            return ["operator", "operator"];
          }
        },
        ":": function(stream) {
          if (stream.match(/^\s*\{/, false))
            return [null, null];
          return false;
        },
        "$": function(stream) {
          stream.match(/^[\w-]+/);
          if (stream.match(/^\s*:/, false))
            return ["variable-2", "variable-definition"];
          return ["variable-2", "variable"];
        },
        "#": function(stream) {
          if (!stream.eat("{"))
            return false;
          return [null, "interpolation"];
        }
      },
      name: "css",
      helperType: "scss"
    });
    CodeMirror2.defineMIME("text/x-less", {
      mediaTypes,
      mediaFeatures,
      mediaValueKeywords,
      propertyKeywords,
      nonStandardPropertyKeywords,
      colorKeywords,
      valueKeywords,
      fontProperties,
      allowNested: true,
      lineComment: "//",
      tokenHooks: {
        "/": function(stream, state) {
          if (stream.eat("/")) {
            stream.skipToEnd();
            return ["comment", "comment"];
          } else if (stream.eat("*")) {
            state.tokenize = tokenCComment;
            return tokenCComment(stream, state);
          } else {
            return ["operator", "operator"];
          }
        },
        "@": function(stream) {
          if (stream.eat("{"))
            return [null, "interpolation"];
          if (stream.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i, false))
            return false;
          stream.eatWhile(/[\w\\\-]/);
          if (stream.match(/^\s*:/, false))
            return ["variable-2", "variable-definition"];
          return ["variable-2", "variable"];
        },
        "&": function() {
          return ["atom", "atom"];
        }
      },
      name: "css",
      helperType: "less"
    });
    CodeMirror2.defineMIME("text/x-gss", {
      documentTypes,
      mediaTypes,
      mediaFeatures,
      propertyKeywords,
      nonStandardPropertyKeywords,
      fontProperties,
      counterDescriptors,
      colorKeywords,
      valueKeywords,
      supportsAtComponent: true,
      tokenHooks: {
        "/": function(stream, state) {
          if (!stream.eat("*"))
            return false;
          state.tokenize = tokenCComment;
          return tokenCComment(stream, state);
        }
      },
      name: "css",
      helperType: "gss"
    });
  });
})();
(function(module, exports) {
  (function(mod) {
    mod(codemirror.exports, xml.exports, javascript.exports, css.exports);
  })(function(CodeMirror2) {
    var defaultTags = {
      script: [
        ["lang", /(javascript|babel)/i, "javascript"],
        ["type", /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i, "javascript"],
        ["type", /./, "text/plain"],
        [null, null, "javascript"]
      ],
      style: [
        ["lang", /^css$/i, "css"],
        ["type", /^(text\/)?(x-)?(stylesheet|css)$/i, "css"],
        ["type", /./, "text/plain"],
        [null, null, "css"]
      ]
    };
    function maybeBackup(stream, pat, style) {
      var cur = stream.current(), close = cur.search(pat);
      if (close > -1) {
        stream.backUp(cur.length - close);
      } else if (cur.match(/<\/?$/)) {
        stream.backUp(cur.length);
        if (!stream.match(pat, false))
          stream.match(cur);
      }
      return style;
    }
    var attrRegexpCache = {};
    function getAttrRegexp(attr) {
      var regexp = attrRegexpCache[attr];
      if (regexp)
        return regexp;
      return attrRegexpCache[attr] = new RegExp("\\s+" + attr + `\\s*=\\s*('|")?([^'"]+)('|")?\\s*`);
    }
    function getAttrValue(text, attr) {
      var match = text.match(getAttrRegexp(attr));
      return match ? /^\s*(.*?)\s*$/.exec(match[2])[1] : "";
    }
    function getTagRegexp(tagName, anchored) {
      return new RegExp((anchored ? "^" : "") + "</s*" + tagName + "s*>", "i");
    }
    function addTags(from, to) {
      for (var tag in from) {
        var dest = to[tag] || (to[tag] = []);
        var source = from[tag];
        for (var i2 = source.length - 1; i2 >= 0; i2--)
          dest.unshift(source[i2]);
      }
    }
    function findMatchingMode(tagInfo, tagText) {
      for (var i2 = 0; i2 < tagInfo.length; i2++) {
        var spec = tagInfo[i2];
        if (!spec[0] || spec[1].test(getAttrValue(tagText, spec[0])))
          return spec[2];
      }
    }
    CodeMirror2.defineMode("htmlmixed", function(config, parserConfig) {
      var htmlMode = CodeMirror2.getMode(config, {
        name: "xml",
        htmlMode: true,
        multilineTagIndentFactor: parserConfig.multilineTagIndentFactor,
        multilineTagIndentPastTag: parserConfig.multilineTagIndentPastTag,
        allowMissingTagName: parserConfig.allowMissingTagName
      });
      var tags = {};
      var configTags = parserConfig && parserConfig.tags, configScript = parserConfig && parserConfig.scriptTypes;
      addTags(defaultTags, tags);
      if (configTags)
        addTags(configTags, tags);
      if (configScript)
        for (var i2 = configScript.length - 1; i2 >= 0; i2--)
          tags.script.unshift(["type", configScript[i2].matches, configScript[i2].mode]);
      function html(stream, state) {
        var style = htmlMode.token(stream, state.htmlState), tag = /\btag\b/.test(style), tagName;
        if (tag && !/[<>\s\/]/.test(stream.current()) && (tagName = state.htmlState.tagName && state.htmlState.tagName.toLowerCase()) && tags.hasOwnProperty(tagName)) {
          state.inTag = tagName + " ";
        } else if (state.inTag && tag && />$/.test(stream.current())) {
          var inTag = /^([\S]+) (.*)/.exec(state.inTag);
          state.inTag = null;
          var modeSpec = stream.current() == ">" && findMatchingMode(tags[inTag[1]], inTag[2]);
          var mode = CodeMirror2.getMode(config, modeSpec);
          var endTagA = getTagRegexp(inTag[1], true), endTag = getTagRegexp(inTag[1], false);
          state.token = function(stream2, state2) {
            if (stream2.match(endTagA, false)) {
              state2.token = html;
              state2.localState = state2.localMode = null;
              return null;
            }
            return maybeBackup(stream2, endTag, state2.localMode.token(stream2, state2.localState));
          };
          state.localMode = mode;
          state.localState = CodeMirror2.startState(mode, htmlMode.indent(state.htmlState, "", ""));
        } else if (state.inTag) {
          state.inTag += stream.current();
          if (stream.eol())
            state.inTag += " ";
        }
        return style;
      }
      return {
        startState: function() {
          var state = CodeMirror2.startState(htmlMode);
          return { token: html, inTag: null, localMode: null, localState: null, htmlState: state };
        },
        copyState: function(state) {
          var local;
          if (state.localState) {
            local = CodeMirror2.copyState(state.localMode, state.localState);
          }
          return {
            token: state.token,
            inTag: state.inTag,
            localMode: state.localMode,
            localState: local,
            htmlState: CodeMirror2.copyState(htmlMode, state.htmlState)
          };
        },
        token: function(stream, state) {
          return state.token(stream, state);
        },
        indent: function(state, textAfter, line) {
          if (!state.localMode || /^\s*<\//.test(textAfter))
            return htmlMode.indent(state.htmlState, textAfter, line);
          else if (state.localMode.indent)
            return state.localMode.indent(state.localState, textAfter, line);
          else
            return CodeMirror2.Pass;
        },
        innerMode: function(state) {
          return { state: state.localState || state.htmlState, mode: state.localMode || htmlMode };
        }
      };
    }, "xml", "javascript", "css");
    CodeMirror2.defineMIME("text/html", "htmlmixed");
  });
})();
const codeMirrorTheme = r$2`
  .CodeMirror {
    background-color: var(--md-sys-color-background);
    color: var(--md-sys-color-on-background);
  }

  .CodeMirror-gutters {
    background: var(--md-sys-color-surface-variant);
    color: var(--md-sys-color-on-surface-variant);
    border: none;
  }

  .CodeMirror-guttermarker,
  .CodeMirror-guttermarker-subtle,
  .CodeMirror-linenumber {
    color: var(--md-sys-color-on-background);
  }

  .CodeMirror-cursor {
    border-left: 1px solid var(--md-sys-color-primary);
  }
  .cm-fat-cursor .CodeMirror-cursor {
    background-color: var(--md-sys-color-background);
  }
  .cm-animate-fat-cursor {
    background-color: var(--md-sys-color-background);
  }

  div.CodeMirror-selected {
    background: var(--md-sys-color-surface-variant);
  }

  .CodeMirror-focused div.CodeMirror-selected {
    background: var(--md-sys-color-surface-variant);
  }

  .CodeMirror-line::selection,
  .CodeMirror-line > span::selection,
  .CodeMirror-line > span > span::selection {
    background: var(--md-sys-color-surface-variant);
  }

  .CodeMirror-line::-moz-selection,
  .CodeMirror-line > span::-moz-selection,
  .CodeMirror-line > span > span::-moz-selection {
    background: var(--md-sys-color-surface-variant);
  }

  .CodeMirror-activeline-background {
    background: var(--md-sys-color-surface);
  }

  .cm-keyword {
    color: var(--md-custom-color-keyword) !important;
  }

  .cm-operator {
    color: var(--md-custom-color-operator) !important;
  }

  .cm-variable-2 {
    color: var(--md-custom-color-variable-2) !important;
  }

  .cm-variable-3,
  .cm-type {
    color: var(--md-custom-color-variable-3) !important;
  }

  .cm-builtin {
    color: var(--md-custom-color-builtin) !important;
  }

  .cm-atom {
    color: var(--md-custom-color-atom) !important;
  }

  .cm-number {
    color: var(--md-custom-color-number) !important;
  }

  .cm-def {
    color: var(--md-custom-color-def) !important;
  }

  .cm-string {
    color: var(--md-custom-color-string) !important;
  }

  .cm-string-2 {
    color: var(--md-custom-color-string-2) !important;
  }

  .cm-comment {
    color: var(--md-custom-color-comment) !important;
  }

  .cm-variable {
    color: var(--md-custom-color-variable) !important;
  }

  .cm-tag {
    color: var(--md-custom-color-tag) !important;
  }

  .cm-meta {
    color: var(--md-custom-color-meta) !important;
  }

  .cm-attribute {
    color: var(--md-custom-color-attribute) !important;
  }

  .cm-property {
    color: var(--md-custom-color-property) !important;
  }

  .cm-qualifier {
    color: var(--md-custom-color-qualifier) !important;
  }

  .cm-variable-3,
  .cm-type {
    color: var(--md-custom-color-variable-3) !important;
  }

  .cm-error {
    color: var(--md-sys-color-on-error);
    background-color: var(--md-sys-color-error);
  }

  .CodeMirror-matchingbracket {
    text-decoration: underline;
    color: var(--md-sys-color-on-surface);
  }
`;
const sourceLogo = $` <a
  href="https://github.com/rodydavis/codemirror-dynamic-theme"
  target="_blank"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
      fill="var(--md-sys-color-on-primary-container)"
    />
  </svg>
</a>`;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
let CodeWindow = class extends s {
  constructor() {
    super(...arguments);
    this.value = "";
    this.color = "#6750A4";
    this.dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  render() {
    return $`<main>
      <header class="toolbar">
        ${sourceLogo}
        <div class="title">${document.title}</div>
        <div class="spacer"></div>
        <div class="actions">
          <button class="secondary" @click=${this.toggleDark.bind(this)}>
            ${this.dark ? "Light" : "Dark"}
          </button>
          <button class="tertiary" @click=${this.randomColor.bind(this)}>
            Random
          </button>
          <input
            type="color"
            .value=${this.color}
            @input=${this.onColor.bind(this)}
          />
        </div>
      </header>
      <div class="editor"></div>
    </main>`;
  }
  firstUpdated() {
    const script = this.querySelectorAll("script");
    if (script.length > 0) {
      const code = script[0].textContent || "";
      this.value = code.trim();
    }
    const root = this.shadowRoot.querySelector(".editor");
    this.editor = CodeMirror(root, {
      value: this.value,
      mode: "javascript",
      lineNumbers: true,
      lineWrapping: true,
      indentUnit: 4,
      tabSize: 4,
      indentWithTabs: true,
      autofocus: true
    });
    this.editor.setSize("100%", `100%`);
    this.updateTheme();
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e2) => {
      this.dark = e2.matches;
      this.updateTheme();
    });
  }
  updateTheme() {
    const source = this.color;
    const dark = this.dark;
    const target = this.shadowRoot.querySelector("main");
    const properties = [
      `--md-custom-color-keyword: #c75779;`,
      `--md-custom-color-operator: #008800;`,
      `--md-custom-color-variable: #90ccff;`,
      `--md-custom-color-variable-2: #dd7700;`,
      `--md-custom-color-variable-3: #3333bb;`,
      `--md-custom-color-variable-3: #decb6b;`,
      `--md-custom-color-builtin: #003388;`,
      `--md-custom-color-atom: #bb4646;`,
      `--md-custom-color-number: #b4c5ff;`,
      `--md-custom-color-def: #82aaff;`,
      `--md-custom-color-string: #ffb4a9;`,
      `--md-custom-color-string-2: #ffb4a9;`,
      `--md-custom-color-comment: #888888;`,
      `--md-custom-color-tag: #000080;`,
      `--md-custom-color-meta: #a9c7ff;`,
      `--md-custom-color-attribute: #008080;`,
      `--md-custom-color-property: #336699;`,
      `--md-custom-color-qualifier: #690;`
    ];
    const customColors = properties.map((property2) => {
      const [key, value] = property2.split(":");
      const name = key.trim().replace(/^--md-custom-color-/, "");
      const color = argbFromHex(value.trim().replace(";", ""));
      return {
        name,
        value: color,
        blend: true
      };
    });
    const theme = themeFromSourceColor(argbFromHex(source), customColors);
    applyTheme(theme, { target, dark });
    for (const custom of theme.customColors) {
      const name = custom.color.name;
      const section = dark ? custom.dark : custom.light;
      target.style.setProperty(`--md-custom-color-${name}`, hexFromArgb(section.color));
    }
  }
  setColor(val) {
    this.color = val;
    this.updateTheme();
  }
  onColor(e2) {
    const target = e2.target;
    this.setColor(target.value);
  }
  toggleDark() {
    this.dark = !this.dark;
    this.updateTheme();
  }
  randomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i2 = 0; i2 < 6; i2++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    this.setColor(color);
  }
  setCode(value) {
    this.value = value;
    const editor = this.editor;
    if (editor) {
      editor.setValue(value);
    }
  }
};
CodeWindow.styles = r$2`
    ${o$3(codemirrorStyles)}
    ${codeMirrorTheme}

    main {
      width: 100vw;
      height: 100vh;
      background-color: var(--md-sys-color-background);
      color: var(--md-sys-color-on-background);
      --header-height: 48px;
      --input-size: 32px;
    }

    .toolbar {
      height: var(--header-height);
      background-color: var(--md-sys-color-primary-container);
      color: var(--md-sys-color-on-primary-container);
      display: flex;
      align-items: center;
    }

    .actions > * {
      margin-left: 4px;
      margin-right: 4px;
    }

    .toolbar .title {
      font-family: sans-serif;
      font-size: 18px;
      padding-left: 4px;
    }

    .toolbar .actions {
      display: flex;
      align-items: center;
    }

    .toolbar a {
      padding: 0;
      margin: 0;
      padding-left: 8px;
      padding-right: 8px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    input[type="color"] {
      width: calc(var(--input-size) * 2);
      height: var(--input-size);
      outline: none;
      border: none;
      border-radius: 50%;
      background-color: var(--md-sys-color-primary-container);
    }
    input[type="color"]::-webkit-color-swatch-wrapper {
      padding: 0;
    }
    input[type="color"]::-webkit-color-swatch {
      border: none;
      border-radius: var(--input-size);
      border: var(--md-sys-color-outline) solid 1px;
    }

    button {
      border: none;
      border-radius: 4px;
      padding: 8px;
    }

    .tertiary {
      background-color: var(--md-sys-color-tertiary);
      color: var(--md-sys-color-on-tertiary);
    }

    .secondary {
      background-color: var(--md-sys-color-secondary);
      color: var(--md-sys-color-on-secondary);
    }

    .spacer {
      flex: 1;
    }

    .editor {
      height: calc(100% - var(--header-height));
      width: 100%;
    }
  `;
__decorateClass([
  e()
], CodeWindow.prototype, "value", 2);
__decorateClass([
  e()
], CodeWindow.prototype, "color", 2);
__decorateClass([
  e({ type: Boolean })
], CodeWindow.prototype, "dark", 2);
CodeWindow = __decorateClass([
  n$1("code-window")
], CodeWindow);
