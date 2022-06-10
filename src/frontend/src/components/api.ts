export async function writeSpecs(projectRoot: string, specs: string[]) {
  const data = JSON.stringify({
    projectRoot,
    specs,
  });

  try {
    const res = await window.fetch("http://localhost:9991/writeSpec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    if (res.ok) {
      console.log("ok");
    } else {
      console.log("uh oh", res);
    }
  } catch (e) {
    console.error("Error!", e);
  }
}
