import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  applyTheme,
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
} from "@material/material-color-utilities";
import CodeMirror from "codemirror";
import codemirrorStyles from "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";

@customElement("code-window")
export class CodeWindow extends LitElement {
  static styles = css`
    ${unsafeCSS(codemirrorStyles)}

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
  `;

  @property() value = [
    `function findSequence(goal) {`,
    `  function find(start, history) {`,
    `    if (start == goal) return history;`,
    `    else if (start > goal) return null;`,
    `    else`,
    `      return (`,
    `        find(start + 5, "(" + history + " + 5)") ||`,
    `        find(start * 3, "(" + history + " * 3)")`,
    `      );`,
    `  }`,
    `  return find(1, "1");`,
    `}`,
  ].join("\n");

  @property() color = "#6750A4";

  render() {
    return html`<main>
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
    </main>`;
  }

  firstUpdated() {
    const root = this.shadowRoot!.querySelector(".editor") as HTMLElement;
    const editor = CodeMirror(root, {
      value: this.value,
      mode: "javascript",
      lineNumbers: true,
      lineWrapping: true,
      indentUnit: 4,
      tabSize: 4,
      indentWithTabs: true,
      autofocus: true,
    });
    console.debug(editor);
    editor.setSize("100%", `100%`);
    this.updateTheme();
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => this.updateTheme());
  }

  updateTheme() {
    const source = this.color;
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const target = this.shadowRoot!.querySelector("main") as HTMLElement;
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
      `--md-custom-color-qualifier: #690;`,
    ];
    const customColors = properties.map((property) => {
      const [key, value] = property.split(":");
      const name = key.replace(/^--md-custom-color-/, "").trim();
      const color = argbFromHex(value.trim().replace(";", ""));
      return {
        name,
        value: color,
        blend: true,
      };
    });
    const theme = themeFromSourceColor(argbFromHex(source), customColors);
    applyTheme(theme, { target, dark });
    for (const custom of theme.customColors) {
      const name = custom.color.name;
      const section = dark ? custom.dark : custom.light;
      target.style.setProperty(
        `--md-custom-color-${name}`,
        hexFromArgb(section.color)
      );
    }
  }

  setColor(val: string) {
    this.color = val;
    this.updateTheme();
  }

  onColor(e: Event) {
    const target = e.target as HTMLInputElement;
    this.setColor(target.value);
  }

  randomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    this.setColor(color);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "code-window": CodeWindow;
  }
}
