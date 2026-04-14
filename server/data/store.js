const data = require('./sample-data.json');

let suggestions = data.suggestions;
const employees = data.employees;

const getEmployeeById = (id) => employees.find(employee => employee.id === id);

const getAll = () => suggestions.map(suggestion => ({
    ...suggestion,
    employee: getEmployeeById(suggestion.employeeId)
}));

const getById = (id) => {
    const suggestion = suggestions.find(suggestion => suggestion.id === id);
    if (!suggestion) return null;
    return {
        ...suggestion,
        employee: getEmployeeById(suggestion.employeeId)
    }
}

const updateStatus = (id, status) => {
    const suggestion = suggestions.find(suggestion => suggestion.id === id);
    if (!suggestion) return null;
    suggestion.status = status;
    suggestion.dateUpdated = new Date().toISOString();
    return {
        ...suggestion,
        employee: getEmployeeById(suggestion.employeeId)
    }
};

module.exports = { getAll, getById, updateStatus };