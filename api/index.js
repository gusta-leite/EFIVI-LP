const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const CONFIG_FILE = path.join(process.cwd(), 'config.json');

app.use(cors());

app.get('/api/config', async (req, res) => {
  try {
    const fileContent = await fs.readFile(CONFIG_FILE, 'utf-8');
    res.json(JSON.parse(fileContent));
  } catch (error) {
    res.status(500).json({ error: 'Falha ao ler a configuração do servidor.' });
  }
});

module.exports = app;