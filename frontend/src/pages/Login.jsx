import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context.jsx';

export default function Login() {
    const { login, showToast } = useApp();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const email = e.target.email.value;
            const pass = e.target.password.value;
            const user = await login(email, pass);
            showToast(`Welcome back, ${user.name}!`, 'success');
            if (user.role === 'admin') navigate('/admin');
            else if (user.role === 'volunteer') navigate('/volunteer');
            else if (user.role === 'field_worker') navigate('/fieldworker');
        } catch (err) {
            showToast("Invalid credentials", 'error');
        } finally { setLoading(false); }
    };

    return (
        <div className="flex items-center justify-center" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-bg) 50%, var(--color-secondary-light) 100%)' }}>
            <div className="card fade-in" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem', borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-xl)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1rem', boxShadow: 'var(--shadow-glow)' }}>
                        <i className="fas fa-hands-helping"></i>
                    </div>
                    <h1 style={{ fontSize: '1.5rem', color: 'var(--color-text)', marginBottom: '0.25rem' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Sign in to your Volentra account</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="email" id="email" name="email" className="form-input" defaultValue="admin@ngo.org" required />
                    </div>
                    <div className="form-group">
                        <div className="flex justify-between items-center">
                            <label className="form-label">Password</label>
                            <Link to="/forgot-password" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Forgot Password?</Link>
                        </div>
                        <input type="password" id="password" name="password" className="form-input" defaultValue="password" required />
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={loading} style={{ padding: '0.75rem', fontSize: '1rem', marginTop: '0.5rem' }}>
                        {loading ? <><i className="fas fa-spinner fa-spin"></i> Signing In...</> : 'Sign In'}
                    </button>
                </form>
                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                    Don't have an account? <Link to="/register" style={{ fontWeight: 600 }}>Create Account</Link>
                </div>
                <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border)', fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                    <span style={{ fontWeight: 600 }}>Demo Accounts:</span><br />
                    Admin: admin@ngo.org · Volunteer: john@vol.org · Worker: mike@field.org<br />
                    <span style={{ fontSize: '0.65rem' }}>(all passwords: "password")</span>
                </div>
            </div>
        </div>
    );
}
