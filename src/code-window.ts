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
import "./codemirror";
import { codeMirrorTheme } from "./theme";
import { sourceLogo } from "./logo";

@customElement("code-window")
export class CodeWindow extends LitElement {
  static styles = css`
    ${unsafeCSS(codemirrorStyles)}
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

  @property() value = "";

  @property() color = "#6750A4";
  @property({ type: Boolean }) dark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  editor?: CodeMirror.Editor;

  render() {
    return html`<main>
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
    const root = this.shadowRoot!.querySelector(".editor") as HTMLElement;
    this.editor = CodeMirror(root, {
      value: this.value,
      mode: "javascript",
      lineNumbers: true,
      lineWrapping: true,
      indentUnit: 4,
      tabSize: 4,
      indentWithTabs: true,
      autofocus: true,
    });
    this.editor.setSize("100%", `100%`);
    this.updateTheme();
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        this.dark = e.matches;
        this.updateTheme();
      });
  }

  private updateTheme() {
    const source = this.color;
    const dark = this.dark;
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
      const name = key.trim().replace(/^--md-custom-color-/, "");
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

  private setColor(val: string) {
    this.color = val;
    this.updateTheme();
  }

  private onColor(e: Event) {
    const target = e.target as HTMLInputElement;
    this.setColor(target.value);
  }

  private toggleDark() {
    this.dark = !this.dark;
    this.updateTheme();
  }

  private randomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    this.setColor(color);
  }

  set code(value: string) {
    this.value = value;
    const editor = this.editor;
    if (editor) {
      editor.setValue(value);
    }
  }

  get code() {
    const editor = this.editor;
    if (editor) {
      return editor.getValue();
    }
    return "";
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "code-window": CodeWindow;
  }
}
