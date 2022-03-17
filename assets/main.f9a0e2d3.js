import{r as f,o as g,e as u,s as h,$ as v,C,a as m,t as M,b as y,h as k,n as w}from"./vendor.8067569f.js";const x=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const e of r)if(e.type==="childList")for(const t of e.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&c(t)}).observe(document,{childList:!0,subtree:!0});function i(r){const e={};return r.integrity&&(e.integrity=r.integrity),r.referrerpolicy&&(e.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?e.credentials="include":r.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function c(r){if(r.ep)return;r.ep=!0;const e=i(r);fetch(r.href,e)}};x();var z=`/* BASICS */

.CodeMirror {
  /* Set height, width, borders, and global font properties here */
  font-family: monospace;
  height: 300px;
  color: black;
  direction: ltr;
}

/* PADDING */

.CodeMirror-lines {
  padding: 4px 0; /* Vertical padding around content */
}
.CodeMirror pre.CodeMirror-line,
.CodeMirror pre.CodeMirror-line-like {
  padding: 0 4px; /* Horizontal padding of content */
}

.CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {
  background-color: white; /* The little square between H and V scrollbars */
}

/* GUTTER */

.CodeMirror-gutters {
  border-right: 1px solid #ddd;
  background-color: #f7f7f7;
  white-space: nowrap;
}
.CodeMirror-linenumbers {}
.CodeMirror-linenumber {
  padding: 0 3px 0 5px;
  min-width: 20px;
  text-align: right;
  color: #999;
  white-space: nowrap;
}

.CodeMirror-guttermarker { color: black; }
.CodeMirror-guttermarker-subtle { color: #999; }

/* CURSOR */

.CodeMirror-cursor {
  border-left: 1px solid black;
  border-right: none;
  width: 0;
}
/* Shown when moving in bi-directional text */
.CodeMirror div.CodeMirror-secondarycursor {
  border-left: 1px solid silver;
}
.cm-fat-cursor .CodeMirror-cursor {
  width: auto;
  border: 0 !important;
  background: #7e7;
}
.cm-fat-cursor div.CodeMirror-cursors {
  z-index: 1;
}
.cm-fat-cursor .CodeMirror-line::selection,
.cm-fat-cursor .CodeMirror-line > span::selection, 
.cm-fat-cursor .CodeMirror-line > span > span::selection { background: transparent; }
.cm-fat-cursor .CodeMirror-line::-moz-selection,
.cm-fat-cursor .CodeMirror-line > span::-moz-selection,
.cm-fat-cursor .CodeMirror-line > span > span::-moz-selection { background: transparent; }
.cm-fat-cursor { caret-color: transparent; }
@-moz-keyframes blink {
  0% {}
  50% { background-color: transparent; }
  100% {}
}
@-webkit-keyframes blink {
  0% {}
  50% { background-color: transparent; }
  100% {}
}
@keyframes blink {
  0% {}
  50% { background-color: transparent; }
  100% {}
}

/* Can style cursor different in overwrite (non-insert) mode */
.CodeMirror-overwrite .CodeMirror-cursor {}

.cm-tab { display: inline-block; text-decoration: inherit; }

.CodeMirror-rulers {
  position: absolute;
  left: 0; right: 0; top: -50px; bottom: 0;
  overflow: hidden;
}
.CodeMirror-ruler {
  border-left: 1px solid #ccc;
  top: 0; bottom: 0;
  position: absolute;
}

/* DEFAULT THEME */

.cm-s-default .cm-header {color: blue;}
.cm-s-default .cm-quote {color: #090;}
.cm-negative {color: #d44;}
.cm-positive {color: #292;}
.cm-header, .cm-strong {font-weight: bold;}
.cm-em {font-style: italic;}
.cm-link {text-decoration: underline;}
.cm-strikethrough {text-decoration: line-through;}

.cm-s-default .cm-keyword {color: #708;}
.cm-s-default .cm-atom {color: #219;}
.cm-s-default .cm-number {color: #164;}
.cm-s-default .cm-def {color: #00f;}
.cm-s-default .cm-variable,
.cm-s-default .cm-punctuation,
.cm-s-default .cm-property,
.cm-s-default .cm-operator {}
.cm-s-default .cm-variable-2 {color: #05a;}
.cm-s-default .cm-variable-3, .cm-s-default .cm-type {color: #085;}
.cm-s-default .cm-comment {color: #a50;}
.cm-s-default .cm-string {color: #a11;}
.cm-s-default .cm-string-2 {color: #f50;}
.cm-s-default .cm-meta {color: #555;}
.cm-s-default .cm-qualifier {color: #555;}
.cm-s-default .cm-builtin {color: #30a;}
.cm-s-default .cm-bracket {color: #997;}
.cm-s-default .cm-tag {color: #170;}
.cm-s-default .cm-attribute {color: #00c;}
.cm-s-default .cm-hr {color: #999;}
.cm-s-default .cm-link {color: #00c;}

.cm-s-default .cm-error {color: #f00;}
.cm-invalidchar {color: #f00;}

.CodeMirror-composing { border-bottom: 2px solid; }

/* Default styles for common addons */

div.CodeMirror span.CodeMirror-matchingbracket {color: #0b0;}
div.CodeMirror span.CodeMirror-nonmatchingbracket {color: #a22;}
.CodeMirror-matchingtag { background: rgba(255, 150, 0, .3); }
.CodeMirror-activeline-background {background: #e8f2ff;}

/* STOP */

/* The rest of this file contains styles related to the mechanics of
   the editor. You probably shouldn't touch them. */

.CodeMirror {
  position: relative;
  overflow: hidden;
  background: white;
}

.CodeMirror-scroll {
  overflow: scroll !important; /* Things will break if this is overridden */
  /* 50px is the magic margin used to hide the element's real scrollbars */
  /* See overflow: hidden in .CodeMirror */
  margin-bottom: -50px; margin-right: -50px;
  padding-bottom: 50px;
  height: 100%;
  outline: none; /* Prevent dragging from highlighting the element */
  position: relative;
  z-index: 0;
}
.CodeMirror-sizer {
  position: relative;
  border-right: 50px solid transparent;
}

/* The fake, visible scrollbars. Used to force redraw during scrolling
   before actual scrolling happens, thus preventing shaking and
   flickering artifacts. */
.CodeMirror-vscrollbar, .CodeMirror-hscrollbar, .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {
  position: absolute;
  z-index: 6;
  display: none;
  outline: none;
}
.CodeMirror-vscrollbar {
  right: 0; top: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
.CodeMirror-hscrollbar {
  bottom: 0; left: 0;
  overflow-y: hidden;
  overflow-x: scroll;
}
.CodeMirror-scrollbar-filler {
  right: 0; bottom: 0;
}
.CodeMirror-gutter-filler {
  left: 0; bottom: 0;
}

.CodeMirror-gutters {
  position: absolute; left: 0; top: 0;
  min-height: 100%;
  z-index: 3;
}
.CodeMirror-gutter {
  white-space: normal;
  height: 100%;
  display: inline-block;
  vertical-align: top;
  margin-bottom: -50px;
}
.CodeMirror-gutter-wrapper {
  position: absolute;
  z-index: 4;
  background: none !important;
  border: none !important;
}
.CodeMirror-gutter-background {
  position: absolute;
  top: 0; bottom: 0;
  z-index: 4;
}
.CodeMirror-gutter-elt {
  position: absolute;
  cursor: default;
  z-index: 4;
}
.CodeMirror-gutter-wrapper ::selection { background-color: transparent }
.CodeMirror-gutter-wrapper ::-moz-selection { background-color: transparent }

.CodeMirror-lines {
  cursor: text;
  min-height: 1px; /* prevents collapsing before first draw */
}
.CodeMirror pre.CodeMirror-line,
.CodeMirror pre.CodeMirror-line-like {
  /* Reset some styles that the rest of the page might have set */
  -moz-border-radius: 0; -webkit-border-radius: 0; border-radius: 0;
  border-width: 0;
  background: transparent;
  font-family: inherit;
  font-size: inherit;
  margin: 0;
  white-space: pre;
  word-wrap: normal;
  line-height: inherit;
  color: inherit;
  z-index: 2;
  position: relative;
  overflow: visible;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-variant-ligatures: contextual;
  font-variant-ligatures: contextual;
}
.CodeMirror-wrap pre.CodeMirror-line,
.CodeMirror-wrap pre.CodeMirror-line-like {
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: normal;
}

.CodeMirror-linebackground {
  position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  z-index: 0;
}

.CodeMirror-linewidget {
  position: relative;
  z-index: 2;
  padding: 0.1px; /* Force widget margins to stay inside of the container */
}

.CodeMirror-widget {}

.CodeMirror-rtl pre { direction: rtl; }

.CodeMirror-code {
  outline: none;
}

/* Force content-box sizing for the elements where we expect it */
.CodeMirror-scroll,
.CodeMirror-sizer,
.CodeMirror-gutter,
.CodeMirror-gutters,
.CodeMirror-linenumber {
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}

.CodeMirror-measure {
  position: absolute;
  width: 100%;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.CodeMirror-cursor {
  position: absolute;
  pointer-events: none;
}
.CodeMirror-measure pre { position: static; }

div.CodeMirror-cursors {
  visibility: hidden;
  position: relative;
  z-index: 3;
}
div.CodeMirror-dragcursors {
  visibility: visible;
}

.CodeMirror-focused div.CodeMirror-cursors {
  visibility: visible;
}

.CodeMirror-selected { background: #d9d9d9; }
.CodeMirror-focused .CodeMirror-selected { background: #d7d4f0; }
.CodeMirror-crosshair { cursor: crosshair; }
.CodeMirror-line::selection, .CodeMirror-line > span::selection, .CodeMirror-line > span > span::selection { background: #d7d4f0; }
.CodeMirror-line::-moz-selection, .CodeMirror-line > span::-moz-selection, .CodeMirror-line > span > span::-moz-selection { background: #d7d4f0; }

.cm-searching {
  background-color: #ffa;
  background-color: rgba(255, 255, 0, .4);
}

/* Used to force a border model for a node */
.cm-force-border { padding-right: .1px; }

@media print {
  /* Hide the cursor when printing */
  .CodeMirror div.CodeMirror-cursors {
    visibility: hidden;
  }
}

/* See issue #2901 */
.cm-tab-wrap-hack:after { content: ''; }

/* Help users use markselection to safely style text background */
span.CodeMirror-selectedtext { background: none; }
`,S=Object.defineProperty,T=Object.getOwnPropertyDescriptor,d=(n,o,i,c)=>{for(var r=c>1?void 0:c?T(o,i):o,e=n.length-1,t;e>=0;e--)(t=n[e])&&(r=(c?t(o,i,r):t(r))||r);return c&&r&&S(o,i,r),r};let a=class extends h{constructor(){super(...arguments);this.value=["function findSequence(goal) {","  function find(start, history) {","    if (start == goal) return history;","    else if (start > goal) return null;","    else","      return (",'        find(start + 5, "(" + history + " + 5)") ||','        find(start * 3, "(" + history + " * 3)")',"      );","  }",'  return find(1, "1");',"}"].join(`
`),this.color="#6750A4"}render(){return v`<main>
      <header class="toolbar">
        <div class="title">Codemirror Dynamic Theme</div>
        <div class="spacer"></div>
        <div class="actions">
          <button @click=${this.randomColor.bind(this)}>Random</button>
          <input
            type="color"
            .value=${this.color}
            @input=${this.onColor.bind(this)}
          />
        </div>
      </header>
      <div class="editor"></div>
    </main>`}firstUpdated(){const n=this.shadowRoot.querySelector(".editor"),o=C(n,{value:this.value,mode:"javascript",lineNumbers:!0,lineWrapping:!0,indentUnit:4,tabSize:4,indentWithTabs:!0,autofocus:!0});console.debug(o),o.setSize("100%","100%"),this.updateTheme(),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>this.updateTheme())}updateTheme(){const n=this.color,o=window.matchMedia("(prefers-color-scheme: dark)").matches,i=this.shadowRoot.querySelector("main"),r=["--md-custom-color-keyword: #c75779;","--md-custom-color-operator: #008800;","--md-custom-color-variable: #90ccff;","--md-custom-color-variable-2: #dd7700;","--md-custom-color-variable-3: #3333bb;","--md-custom-color-variable-3: #decb6b;","--md-custom-color-builtin: #003388;","--md-custom-color-atom: #bb4646;","--md-custom-color-number: #b4c5ff;","--md-custom-color-def: #82aaff;","--md-custom-color-string: #ffb4a9;","--md-custom-color-string-2: #ffb4a9;","--md-custom-color-comment: #888888;","--md-custom-color-tag: #000080;","--md-custom-color-meta: #a9c7ff;","--md-custom-color-attribute: #008080;","--md-custom-color-property: #336699;","--md-custom-color-qualifier: #690;"].map(t=>{const[l,s]=t.split(":"),p=l.replace(/^--md-custom-color-/,"").trim(),b=m(s.trim().replace(";",""));return{name:p,value:b,blend:!0}}),e=M(m(n),r);y(e,{target:i,dark:o});for(const t of e.customColors){const l=t.color.name,s=o?t.dark:t.light;i.style.setProperty(`--md-custom-color-${l}`,k(s.color))}}setColor(n){this.color=n,this.updateTheme()}onColor(n){const o=n.target;this.setColor(o.value)}randomColor(){const n="0123456789ABCDEF";let o="#";for(let i=0;i<6;i++)o+=n[Math.floor(Math.random()*16)];this.setColor(o)}};a.styles=f`
    ${g(z)}

    main {
      width: 100vw;
      height: 100vh;
      background-color: var(--md-sys-color-background);
      color: var(--md-sys-color-on-background);
      /* overflow: hidden; */
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

    .toolbar .title {
      font-family: sans-serif;
      font-size: 18px;
    }

    .toolbar * {
      padding-left: 8px;
      padding-right: 8px;
    }

    .toolbar .actions {
      display: flex;
      align-items: center;
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
      background-color: var(--md-sys-color-tertiary);
      color: var(--md-sys-color-on-tertiary);
      border: none;
      border-radius: 4px;
      padding: 8px;
    }

    .editor,
    .CodeMirror {
      height: calc(100% - var(--header-height));
      width: 100%;
      background-color: var(--md-sys-color-background);
      color: var(--md-sys-color-on-background);
    }

    .spacer {
      flex: 1;
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
  `;d([u()],a.prototype,"value",2);d([u()],a.prototype,"color",2);a=d([w("code-window")],a);
