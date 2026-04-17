import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context.jsx';

export default function Register() {
    const { showToast } = useApp();
    const navigate = useNavigate();
    const [role, setRole] = useState('volunteer');

    const handleSubmit = (e) => {
        e.preventDefault();
        showToast('Account created! Redirecting to login...', 'success');
        setTimeout(() => navigate('/login'), 1500);
    };

    const roles = [
        { id: 'admin', label: 'NGO Admin', icon: 'fa-building', desc: 'Manage operations' },
        { id: 'volunteer', label: 'Volunteer', icon: 'fa-hand-holding-heart', desc: 'Help communities' },
        { id: 'field_worker', label: 'Field Worker', icon: 'fa-map-marker-alt', desc: 'Report issues' },
    ];

    return (
        <div className="flex items-center justify-center" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-bg) 50%, var(--color-secondary-light) 100%)' }}>
            <div className="card fade-in" style={{ width: '100%', maxWidth: '480px', padding: '2.5rem', borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-xl)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1rem' }}><i className="fas fa-hands-helping"></i></div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Create Account</h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Join Volentra and make an impact</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid-2" style={{ marginBottom: '1rem' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">First Name</label>
                            <input className="form-input" placeholder="John" required />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Last Name</label>
                            <input className="form-input" placeholder="Doe" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-input" placeholder="you@example.com" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-input" placeholder="Min 8 characters" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Select Role</label>
                        <div className="flex gap-2">
                            {roles.map(r => (
                                <button key={r.id} type="button" onClick={() => setRole(r.id)} className="flex-col items-center text-center" style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-lg)', border: `2px solid ${role === r.id ? 'var(--color-primary)' : 'var(--color-border)'}`, background: role === r.id ? 'var(--color-primary-50)' : 'transparent', cursor: 'pointer', transition: 'all 0.15s' }}>
                                    <i className={`fas ${r.icon}`} style={{ color: role === r.id ? 'var(--color-primary)' : 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '0.25rem' }}></i>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 600, color: role === r.id ? 'var(--color-primary)' : 'var(--color-text)' }}>{r.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-full" style={{ padding: '0.75rem', fontSize: '1rem', marginTop: '0.5rem' }}>Create Account</button>
                </form>
                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ fontWeight: 600 }}>Sign In</Link>
                </div>
            </div>
        </div>
    );
}
