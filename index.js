export default {
  async fetch(request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    if (!q) {
      return new Response(JSON.stringify({ error: "Missing query param 'q'" }), {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });
    }

    const upstreamURL = `https://search.maven.org/solrsearch/select?q=${encodeURIComponent(q)}&rows=10&wt=json`;

    try {
      const response = await fetch(upstreamURL, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; Maven Proxy Bot/1.0; +https://github.com/codenib-dev)",
          "Accept": "application/json"
        }
      });

      const body = await response.text();
      return new Response(body, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "*",
          "Content-Type": "application/json"
        }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Fetch failed", details: err.message }), {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });
    }
  }
};
