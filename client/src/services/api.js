const BASE_URL = '/api'

export const getEmployees = async () => {
    const res = await fetch(`${BASE_URL}/employees`);
    if (!res.ok) throw new Error('Failed to fetch employees');
    return res.json();
};

export const getSuggestions = async () => {
    const res = await fetch(`${BASE_URL}/suggestions`);
    if (!res.ok) throw new Error('Failed to fetch suggestions');
    return res.json();
};

export const updateSuggestionStatus = async (id, status) => {
    const res = await fetch(`${BASE_URL}/suggestions/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update suggestion status');
    return res.json();
};
