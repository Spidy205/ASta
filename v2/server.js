const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();

// Middleware
app.use(compression()); // Enable Gzip compression
app.use(morgan('combined')); // Logging
app.use(helmet()); // Set security headers

// Rate limiting to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Serve static files with caching
app.use(express.static('public', {
    maxAge: '1d', // Cache static files for 1 day
    etag: false // Disable ETag
}));

// Example route
app.get('/', (req, res) => {
    res.send('Welcome to the optimized server!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});