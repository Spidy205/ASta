// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const AvailableServers = [
    "https://api1.sb543267gmailcom.workers.dev/",
    "https://api100.sb543267gmailcom.workers.dev/",
    "https://api3.sb543267gmailcom.workers.dev/",
    "https://asta-api.sb543267gmailcom.workers.dev/",
];

function getApiServer() {
    return AvailableServers[Math.floor(Math.random() * AvailableServers.length)];
}

async function getJson(endpoint) {
    let serverUrl = getApiServer() + endpoint;
    try {
        const response = await axios.get(serverUrl);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching data');
    }
}

// API endpoint to get anime details
app.get('/anime/:id', async (req, res) => {
    try {
        const animeId = req.params.id;
        const data = await getJson(`/anime/${animeId}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API endpoint to get recommendations
app.get('/recommendations/:name', async (req, res) => {
    try {
        const animeName = req.params.name.replace(" ", "+");
        const data = await getJson(`/recommendations/${animeName}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});