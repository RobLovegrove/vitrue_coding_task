const express = require('express');
const cors = require('cors');
const suggestionRoutes = require('./routes/suggestions');

const app = express();

app.use(cors());

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/suggestions', suggestionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

module.exports = app

