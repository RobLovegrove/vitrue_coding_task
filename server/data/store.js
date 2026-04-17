const data = require('./sample-data.json');

let suggestions = data.suggestions;
const employees = data.employees;

// Get all employees with their suggestions nested within
const getAllEmployees = () => employees.map(employee => ({
    ...employee,
    suggestions: suggestions.filter(s => s.employeeId === employee.id)
}));

// Update the status of a suggestion
const updateStatus = (id, status) => {
    const suggestion = suggestions.find(suggestion => suggestion.id === id);

    if (!suggestion) return null;

    const now = new Date().toISOString();
    suggestion.status = status;
    suggestion.dateUpdated = now;

    if (status === 'completed') {
        if (!suggestion.dateCompleted) {
            suggestion.dateCompleted = now;
        }
    } else {
        delete suggestion.dateCompleted;
    };
    
    return { ...suggestion };
};

module.exports = { getAllEmployees, updateStatus };