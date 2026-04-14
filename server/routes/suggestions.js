const express = require('express');
const router = express.Router();
const store = require('../data/store');

const VALID_STATUSES = ['pending', 'in_progress', 'completed', 'overdue'];

router.get('/', (req, res) => {
    try {
        let suggestions = store.getAllSuggestions();

        if (req.query.status) {
            suggestions = suggestions.filter(s => s.status === req.query.status);
        }
        if (req.query.employeeId) {
            suggestions = suggestions.filter(s => s.employeeId === req.query.employeeId);
        }
        res.json(suggestions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve suggestions' });
    }
});

router.patch('/:id', (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }
        if (!VALID_STATUSES.includes(status)) {
            return res.status(400).json({
                error: `Status must be one of: ${VALID_STATUSES.join(', ')}` 
            });
        }
        const updated = store.updateStatus(req.params.id, status);

        if (!updated) {
            return res.status(404).json({ error: 'Suggestion not found' });
        }
        
        res.json(updated);
    }    
    catch (error) {
        res.status(500).json({ error: 'Failed to update suggestion status' });
    }
});

module.exports = router