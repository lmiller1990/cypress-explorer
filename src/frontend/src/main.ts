import { createApp } from "vue";
import Explorer from "./components/Explorer.vue";

export interface Spec {
  absolute: string
  relative: string
  specType: 'integration' | 'e2e'
}

declare global {
  interface Window {
    __RUN_MODE_SPECS__: Spec[]
  }
}
export function createExplorer(mount: HTMLDivElement) {
  const specs = window?.top?.__RUN_MODE_SPECS__
  function onClose () {
    console.log('unmount')
    app.unmount() 
  }
  const app = createApp(Explorer, { specs, onClose })
  return () => {
    return app.mount(mount);
  }
}
