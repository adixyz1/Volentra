const API_URL = 'http://localhost:5000/api';

export const api = {
    async login(email, password) {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error('Login failed');
        return res.json();
    },

    async getStats() { return (await fetch(`${API_URL}/stats`)).json(); },
    async getReports() { return (await fetch(`${API_URL}/reports`)).json(); },
    async getTasks() { return (await fetch(`${API_URL}/tasks`)).json(); },
    async getVolunteers() { return (await fetch(`${API_URL}/volunteers`)).json(); },
    async getNGOs() { return (await fetch(`${API_URL}/ngos`)).json(); },

    /**
     * Submit a new report.
     * Accepts either:
     *   - a plain object (JSON body, no image)
     *   - a FormData instance (multipart, with optional image)
     */
    async submitReport(data) {
        const isFormData = data instanceof FormData;
        const res = await fetch(`${API_URL}/reports`, {
            method: 'POST',
            // Don't set Content-Type for FormData — browser sets it with the boundary
            headers: isFormData ? {} : { 'Content-Type': 'application/json' },
            body: isFormData ? data : JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to submit report');
        return res.json();
    },

    async assignTask(reportId, volunteerId) {
        const res = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reportId, volunteerId }),
        });
        return res.json();
    },

    async updateTaskStatus(taskId, status) {
        const res = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
        return res.json();
    },

    async getSuggestedVolunteers(reportId) {
        return (await fetch(`${API_URL}/reports/${reportId}/match`)).json();
    },
};
