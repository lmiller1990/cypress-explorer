export interface Spec {
  absolute: string;
  relative: string;
  specType: "integration" | "component";
}


export type CypressExplorerSpecFile = `_cypress-explorer.cy.${'js' | 'ts'}`