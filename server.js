const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the root directory and src directory
app.use(express.static(__dirname));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 5174;  // Changed to match the port you're using
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Make sure to use this port for all connections`);
}); 