import { createApp } from "vue";
import Explorer from "./components/Explorer.vue";
import {
  explorerStyle,
  explorerIconStyle,
  exWrapper,
  explorerParentStyle,
} from "./explorerStyle";

export interface Spec {
  absolute: string;
  relative: string;
  specType: "integration" | "e2e";
}

declare global {
  interface Window {
    __RUN_MODE_SPECS__: Spec[];
    openExplorer?: () => void;
  }
}

const EXPLORER_ICON = "explorer-icon";
const EXPLORER = "explorer";

function getRunner() {
  const runner = window.top;

  if (!runner) {
    throw Error(`Could not access window.top. Something is wrong!`);
  }

  return runner;
}

function openExplorer() {
  const runner = window.top;

  if (!runner) {
    throw Error(`Could not access window.top. Something is wrong!`);
  }

  const explorerWrapper = runner.document.querySelector<HTMLDivElement>(
    `#${exWrapper}`
  );

  if (!explorerWrapper) {
    return;
  }

  explorerWrapper.style.display = "block";
}

function closeExplorer() {
  const runner = getRunner();

  const explorerWrapper = runner.document.querySelector<HTMLDivElement>(
    `#${exWrapper}`
  );

  if (!explorerWrapper) {
    return;
  }

  explorerWrapper.style.display = "none";
}

function getIcon() {
  return (
    window?.top?.document.querySelector<HTMLAnchorElement>(
      `#${EXPLORER_ICON}`
    ) ?? undefined
  );
}

function injectIcon(): HTMLAnchorElement {
  const runner = getRunner();
  const sidebar = runner.document?.querySelector(`[aria-label="Pages"]`);

  if (!sidebar) {
    throw Error("Error initializing Cypress Explorer. Could not find sidebar.");
  }

  const icon = getIcon();

  if (icon) {
    icon.removeEventListener("click", openExplorer);
    icon.remove();
  }

  const el = document.createElement("a");
  el.innerText = "Ex";
  el.id = EXPLORER_ICON;
  sidebar.appendChild(el);

  el.addEventListener("click", openExplorer);

  return el;
}

function injectStyle(id: string, style: string) {
  const styleId = `STYLE_${id}`;
  const stylesheet = document.createElement("style");
  stylesheet.innerText = style;
  stylesheet.id = styleId;

  if (window.top?.document.head.querySelector(`#${styleId}`)) {
    return;
  }

  window.top?.document.head.appendChild(stylesheet);
}

function createExplorer(mount: HTMLDivElement) {
  const runner = getRunner();
  if (!runner.openExplorer) {
    runner.openExplorer = openExplorer;
  }

  const specs = window?.top?.__RUN_MODE_SPECS__;

  function onClose() {
    closeExplorer();
  }

  const app = createApp(Explorer, { specs, onClose });

  return () => {
    injectStyle(EXPLORER, explorerStyle);
    injectStyle(EXPLORER_ICON, explorerIconStyle);
    injectStyle('explorer-parent', explorerParentStyle);
    injectIcon();
    app.mount(mount);
  };
}

export function registerCypressExplorer () {
  // @ts-expect-error - Available via Mocha (global)
  before(async () => {
    const root = window?.top?.document.querySelector("#app");

    if (!root) {
      throw Error(`Could not find #root`)
    }

    const explorer = window?.top?.document.querySelector("#explorer")

    if (explorer) {
      explorer.remove()
    }

    const explorerMountPoint = document.createElement("div");
    explorerMountPoint.id = "explorer";

    root.insertAdjacentElement("afterbegin", explorerMountPoint);
    const mount = createExplorer(explorerMountPoint)
    mount()
  });
}