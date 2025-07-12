export default {
  async fetch(request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    if (!q) {
      return new Response(JSON.stringify({ error: "Missing query param" }), {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    const url = `https://search.maven.org/solrsearch/select?q=${encodeURIComponent(q)}&rows=10&wt=json`;
    const response = await fetch(url);
    const data = await response.text();

    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
};
