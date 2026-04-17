import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const API_URL = 'http://localhost:5000/api';

export function AppProvider({ children }) {
    // ── Auth ────────────────────────────────────────────────────────────────
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    // On mount: read saved user from localStorage and validate with server
    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (!stored) { setAuthLoading(false); return; }
        try {
            const u = JSON.parse(stored);
            // Ping server to verify session is still valid
            fetch(`${API_URL}/auth/me`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: u.id }),
            })
                .then(res => {
                    if (res.ok) {
                        setUser(u); // server confirmed — keep user logged in
                    } else {
                        localStorage.removeItem('user'); // server rejected — clear stale state
                    }
                })
                .catch(() => {
                    // Server unreachable (e.g. backend not started) — keep user optimistically
                    setUser(u);
                })
                .finally(() => setAuthLoading(false));
        } catch {
            localStorage.removeItem('user');
            setAuthLoading(false);
        }
    }, []);

    const login = async (email, pass) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: pass }),
        });
        if (!res.ok) throw new Error('Login failed');
        const u = await res.json();
        setUser(u);
        localStorage.setItem('user', JSON.stringify(u));
        return u;
    };

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('user');
    }, []);

    // ── Theme ────────────────────────────────────────────────────────────────
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const toggleTheme = useCallback(() => setDarkMode(prev => !prev), []);

    // ── Sidebar ──────────────────────────────────────────────────────────────
    // sidebarToggled:
    //   • Desktop (>768px) → true = COLLAPSED (narrow icon-only sidebar)
    //   • Mobile  (≤768px) → true = OPEN      (full sidebar slides in from left)
    const [sidebarToggled, setSidebarToggled] = useState(false);
    const toggleSidebar = useCallback(() => setSidebarToggled(prev => !prev), []);
    const closeMobileSidebar = useCallback(() => setSidebarToggled(false), []);

    // ── Toasts ───────────────────────────────────────────────────────────────
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info') => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
    }, []);

    const dismissToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <AppContext.Provider value={{
            user, login, logout, authLoading,
            darkMode, toggleTheme,
            sidebarToggled, toggleSidebar, closeMobileSidebar,
            showToast,
        }}>
            {children}

            {/* Toast Notifications */}
            <div className="toast-container">
                {toasts.map(t => (
                    <div key={t.id} className={`toast ${t.type}`} onClick={() => dismissToast(t.id)}>
                        <i className={`fas fa-${t.type === 'success' ? 'check-circle' : t.type === 'error' ? 'exclamation-circle' : t.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}`}></i>
                        <span>{t.message}</span>
                        <button style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6, fontSize: '0.75rem', color: 'inherit' }}>✕</button>
                    </div>
                ))}
            </div>
        </AppContext.Provider>
    );
}
