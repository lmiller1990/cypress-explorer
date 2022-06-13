export async function writeSpecs(projectRoot: string, specs: string[]) {
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
    if (!res.ok) {
      throw Error(msg);
    }
  } catch (e) {
    console.error(msg, e);
  }
}
