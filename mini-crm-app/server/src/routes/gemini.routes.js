const express = require('express');
const { callGeminiAPI } = require('../services/gemini.service');
const router = express.Router();

router.post('/ask', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await callGeminiAPI(prompt);
      if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt must be a non-empty string' });
  }

    res.json(response);
  } catch (error) {
    console.error('Gemini API error:', error.message);
    res.status(500).json({ error: 'Gemini API call faileed' });
  }
});

module.exports = router;