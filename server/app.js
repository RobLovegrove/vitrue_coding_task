const express = require('express');
const cors = require('cors');

const suggestionRoutes = require('./routes/suggestions');
const employeeRoutes = require('./routes/employees');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/employees', employeeRoutes);

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
}

module.exports = app

