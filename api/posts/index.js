export default async function handler(req, res) {
  const blogFeed = 'https://your-blog-name.blogspot.com/feeds/posts/default';
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(blogFeed)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json');

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts', details: err.message });
  }
}
