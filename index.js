const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const { username } = req.body;
    const url = `https://www.ntoultimate.com.br/characterprofile.php?name=${username}`;
    const response = await axios.get(url);
    const $ = require('cheerio').load(response.data);

    const targetElement = $('#right > table > tbody > tr:nth-child(4) > td:nth-child(2)');
    const content = targetElement.text();

    res.status(200).json({ content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while scraping the website.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});