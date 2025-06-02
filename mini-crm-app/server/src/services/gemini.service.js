const axios = require('axios');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// CRM-specific base prompt to be added to every user prompt:
const BASE_PROMPT = `
You are a CRM expert assistant. When given a prompt, you need to provide answers that are specific to a CRM context.
Here are some capabilities you may use:
1. Convert natural language (e.g., "People who haven't shopped in 6 months and spent over 5K") into precise segment rules.
2. Provide 2-3 message variants for objectives (e.g., "bring back inactive users") and suggest relevant product images.
3. Summarize campaign performance in plain language (e.g., "Your campaign reached 1,284 users. 1,140 messages were delivered. Customers with >10K spend had a 95% delivery rate.").
4. Recommend the best time/day to launch a campaign based on customer activity.
5. Suggest audience lookalike groups based on top performing segments.
6. Auto-tag campaigns (like "Win-back" or "High Value Customers") based on audience and intent.
`;

async function callGeminiAPI(prompt) {
  try {
    // Combine the CRM base prompt with the user query.
    const modifiedPrompt = `${BASE_PROMPT}\n\nUser Query: ${prompt}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: String(modifiedPrompt)  // use the combined prompt
            }
          ]
        }
      ]
    };

    const response = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (err) {
    console.error('Gemini API FULL ERROR:', {
      status: err?.response?.status,
      headers: err?.response?.headers,
      data: err?.response?.data,
      message: err.message
    });
    return {
      error: 'Gemini API call failed.',
      details: err?.response?.data || err.message
    };
  }
}

module.exports = { callGeminiAPI };