const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const { nanoid } = require('nanoid');

// GET / - Welcome message
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the URL Shortener API! Use /api/shorten to create URLs and /api/admin to view all URLs.' });
});

// POST /api/shorten - Shorten URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) return res.status(400).json({ error: 'Long URL required' });

  try {
    let url = await Url.findOne({ longUrl });
    if (url) return res.json({ shortUrl: `https://url-shortener-backend.onrender.com/${url.shortCode}` });

    const shortCode = nanoid(7);
    url = new Url({ longUrl, shortCode });
    await url.save();

    res.json({ shortUrl: `https://url-shortener-backend.onrender.com/${shortCode}` });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /admin - List all URLs (Admin route)
router.get('/admin', async (req, res) => {
  console.log('Admin route hit');
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /:shortCode - Redirect to long URL
router.get('/:shortCode', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });
    if (!url) return res.status(404).json({ error: 'URL not found' });

    url.clicks++;
    await url.save();

    res.redirect(301, url.longUrl);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;