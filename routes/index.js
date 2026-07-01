const express = require('express');
const router = express.Router();

function requireAuth(req, res, next){
  if (req.session.user) return next();
  req.session.error = 'You must be logged in to view that page.';
  return res.redirect('/auth/login');
}

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/dashboard', requireAuth, (req, res) => {
  res.render('dashboard', { user: req.session.user });
});


// Gemini secure ask route
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

router.post("/ask", async (req, res) => {
  try {
    const { message } = req.body;
    if (!genAI) {
      return res.json({ 
        reply: `[Demo Mode - API Key Missing] You asked: "${message}". Please configure GEMINI_API_KEY in your .env file to receive live Gemini responses.` 
      });
    }
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(message);
    res.json({ reply: result.response.text() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini API error" });
  }
});

module.exports = router;
