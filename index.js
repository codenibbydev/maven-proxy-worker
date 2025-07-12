export default {
  async fetch(request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    if (!q) {
      return new Response(JSON.stringify({ error: "Missing query parameter 'q'" }), {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });
    }

    const url = `https://search.maven.org/solrsearch/select?q=${encodeURIComponent(q)}&rows=10&wt=json`;

    try {
      const response = await fetch(url);
      const body = await response.text();

      return new Response(body, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Failed to fetch from Maven Central" }), {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });
    }
  }
}
