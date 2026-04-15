const data = require('./sample-data.json');

let suggestions = data.suggestions;
const employees = data.employees;


// Get an employee by their ID
const getEmployeeById = (id) => employees.find(employee => employee.id === id);

// Get all suggestions with their employee information nested within
const getAllSuggestions = () => suggestions.map(suggestion => ({
    ...suggestion,
    employee: getEmployeeById(suggestion.employeeId)
}));

// Get all empoyees with their suggestions nested within
const getAllEmployees = () => employees.map(employee => ({
    ...employee,
    suggestions: suggestions.filter(s => s.employeeId === employee.id)
}));

// Get a suggestion by its ID with its employee information nested within
const getById = (id) => {
    const suggestion = suggestions.find(suggestion => suggestion.id === id);
    if (!suggestion) return null;
    return {
        ...suggestion,
        employee: getEmployeeById(suggestion.employeeId)
    }
}

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
    }
    else {
        delete suggestion.dateCompleted;
    }
    
    return {
        ...suggestion,
        employee: getEmployeeById(suggestion.employeeId)
    }
};

module.exports = { getAllSuggestions, getAllEmployees, getById, updateStatus };