const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/data', async (req, res) => {
  try {
    const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
    res.json(JSON.parse(fileContent));
  } catch (error) {
    res.status(500).json({ error: 'Falha ao ler os dados do servidor.' });
  }
});

app.post('/update-message', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Nenhuma mensagem foi fornecida.' });
    }

    const currentDataRaw = await fs.readFile(DATA_FILE, 'utf-8');
    const currentData = JSON.parse(currentDataRaw);

    if (currentData.selectedMessage) {
      currentData.selectedMessage += '\n\n';
    }
    currentData.selectedMessage += message; 

    await fs.writeFile(DATA_FILE, JSON.stringify(currentData, null, 2));
    res.json({ success: true, new_message: currentData.selectedMessage });

  } catch (error) {
    res.status(500).json({ error: 'Falha ao salvar a mensagem no servidor.' });
  }
});

app.post('/reset-message', async (req, res) => {
    try {
        const currentDataRaw = await fs.readFile(DATA_FILE, 'utf-8');
        const currentData = JSON.parse(currentDataRaw);
        currentData.selectedMessage = "";

        await fs.writeFile(DATA_FILE, JSON.stringify(currentData, null, 2));
        res.json({ success: true, message: 'Mensagem reiniciada com sucesso!' });

    } catch (error) {
        res.status(500).json({ error: 'Falha ao reiniciar a mensagem no servidor.' });
    }
});

module.exports = app;