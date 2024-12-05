const express = require('express');
const app = express();
const PORT = process.env.PORT || 5501;

app.use(express.static('frontend')); // Serve static files from frontend folder

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});