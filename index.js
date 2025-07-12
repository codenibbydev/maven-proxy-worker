export default {
  async fetch(request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    if (!q) {
      return new Response(JSON.stringify({ error: "Missing query param" }), {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "*",
          "Content-Type": "application/json",
        },
      });
    }

    const url = `https://search.maven.org/solrsearch/select?q=${encodeURIComponent(q)}&rows=10&wt=json`;

    try {
      const res = await fetch(url);
      const json = await res.text();
      return new Response(json, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "*",
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: "Upstream fetch failed" }), {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    }
  }
};
