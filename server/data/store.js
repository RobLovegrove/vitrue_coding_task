const data = require('./sample-data.json');

let suggestionsById = new Map(
    data.suggestions.map(s => [s.id, { ...s }])
  );  
const employees = data.employees;

const getSuggestionsArray = () => Array.from(suggestionsById.values());

// Get all employees with their suggestions nested within
const getAllEmployees = () => {
    const suggestions = getSuggestionsArray();
  
    return employees.map(employee => ({
      ...employee,
      suggestions: suggestions
        .filter(s => s.employeeId === employee.id)
        .map(s => ({ ...s }))
    }));
  };

// Update the status of a suggestion
const updateStatus = (id, status) => {
    const current = suggestionsById.get(id);
    if (!current) return null;
  
    const now = new Date().toISOString();
  
    // Create new object instead of mutating
    const updated = {
      ...current,
      status,
      dateUpdated: now,
      ...(status === 'completed'
        ? { dateCompleted: current.dateCompleted ?? now }
        : {})
    };
  
    // Remove dateCompleted if not completed
    if (status !== 'completed') {
      delete updated.dateCompleted;
    }
  
    // Store updated version
    suggestionsById.set(id, updated);
  
    return { ...updated };
  };
  

module.exports = { getAllEmployees, updateStatus };