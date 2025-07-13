export default async function handler(req, res) {
  const { start = 1, count = 10 } = req.query;

  const blogFeed = `https://codenibbydev.blogspot.com/feeds/posts/default?start-index=${start}&max-results=${count}`;
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(blogFeed)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json');

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts', details: err.message });
  }
}
