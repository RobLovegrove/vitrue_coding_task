const express = require('express');
const router = express.Router();
const store = require('../data/store');

router.get('/', (req, res) => {
    try {
        const employees = store.getAllEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve employees' });
    }
});
  
  module.exports = router;