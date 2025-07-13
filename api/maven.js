export default async function handler(req, res) {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Missing query param 'q'" });

  const upstream = `https://search.maven.org/solrsearch/select?q=${encodeURIComponent(query)}&rows=10&wt=json`;

  try {
    const r = await fetch(upstream, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      }
    });
    const json = await r.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(json);
  } catch (err) {
    res.status(500).json({ error: "Failed", details: err.message });
  }
}
