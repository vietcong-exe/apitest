const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const { username } = req.body; // Correção: extrair 'username' do corpo

    res.status(200).send(username);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while scraping the website.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});