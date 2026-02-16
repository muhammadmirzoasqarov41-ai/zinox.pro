const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  let body = req.body;
  if (!body || typeof body === 'string') {
    try { body = JSON.parse(req.body); } catch(e) { /* ignore */ }
  }
  const text = body && body.text;
  const token = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_CHAT_ID;
  if (!token || !chatId) return res.status(500).json({ error: 'Telegram not configured on server' });
  if (!text) return res.status(400).json({ error: 'Missing text' });
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
    });
    const data = await r.json();
    if (!data.ok) return res.status(500).json({ error: data });
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
};
