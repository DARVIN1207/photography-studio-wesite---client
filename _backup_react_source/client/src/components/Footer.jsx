import { Instagram, Youtube, Mail } from 'lucide-react';

function Footer() {
    return (
        <footer style={{ padding: '3rem 0 8rem 0', marginTop: 'auto' }}>
            <div className="container">
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', borderRadius: '32px' }}>
                    <h2 style={{ marginBottom: '0.5rem', letterSpacing: '0.05em' }}>SR CINEMATIC</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Capturing Life, Creating Art.</p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                        <a href="https://www.instagram.com/sr_cinematic_65?igsh=MXU1ajNkazh2cDNqbg==" className="hover-float text-instagram-gradient" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }} target="_blank" rel="noreferrer"><Instagram size={28} /> Instagram</a>
                        <a href="https://youtube.com/@srphotography529?si=2yMDIX3exNvSpun1" className="hover-float text-youtube-gradient" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }} target="_blank" rel="noreferrer"><Youtube size={28} /> YouTube</a>
                        <a href="mailto:srmanimoni@gmail.com" className="hover-float" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontWeight: 600 }}><Mail size={24} /> Mail</a>
                    </div>

                    <div style={{ fontSize: '0.9rem', color: 'var(--text-light)', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
                        &copy; 2026 SR Cinematic - Developed by SCODE. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
