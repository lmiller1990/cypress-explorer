import type { CypressExplorerSpecFile } from "./types";

export async function writeSpecs(
  projectRoot: string,
  specs: string[]
): Promise<{ specFile: CypressExplorerSpecFile }> {
  const data = JSON.stringify({
    projectRoot,
    specs,
  });

  const msg = `Cypress Explorer could not write specs. Is the Cypress Explorer server running?`;

  try {
    const res = await window.fetch("http://localhost:9991/writeSpec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    const json = await res.json()
    console.log(json)
    return json
  } catch (e) {
    throw Error(msg);
  }
}
