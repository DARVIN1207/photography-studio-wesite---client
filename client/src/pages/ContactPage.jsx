import { useState } from 'react';
import { Phone, MapPin, Mail, Instagram, Youtube } from 'lucide-react';

function ContactPage() {
    const [selectedCountry, setSelectedCountry] = useState('+91');
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '+91 ',
        eventDate: '',
        shootType: 'Wedding',
        details: ''
    });

    const COUNTRY_CODES = [
        { code: '+91', country: 'India' },
        { code: '+1', country: 'USA' },
        { code: '+44', country: 'UK' },
        { code: '+971', country: 'UAE' },
        // ... (keep others)
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCountryChange = (e) => {
        const newCode = e.target.value;
        setSelectedCountry(newCode);
        setFormData(prev => ({ ...prev, phoneNumber: `${newCode} ` }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { fullName, phoneNumber, eventDate, shootType, details } = formData;
        const message = `*New Booking Request*%0A%0A*Name:* ${fullName}%0A*Phone:* ${phoneNumber}%0A*Date:* ${eventDate}%0A*Type:* ${shootType}%0A*Details:* ${details}`;
        const whatsappUrl = `https://wa.me/918124735262?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <section className="section" style={{ minHeight: '100vh', paddingTop: '120px' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: '4rem' }}>
                    <p className="text-gold" style={{ letterSpacing: '0.2em', fontSize: '0.8rem', textTransform: 'uppercase' }}>Get in Touch</p>
                    <h2 style={{ fontSize: '3.5rem' }}>Start Your <span className="text-gold">Journey</span></h2>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'center' }}>
                    {/* Contact Info */}
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <h3 style={{ marginBottom: '2rem' }}>Contact Info</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
                                <Phone className="text-gold" size={24} />
                                <div>
                                    <h5 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Phone</h5>
                                    <p onClick={() => window.open('https://wa.me/918124735262')} style={{ cursor: 'pointer' }}>+91 81247 35262</p>
                                </div>
                            </div>
                            <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
                                <Mail className="text-gold" size={24} />
                                <div>
                                    <h5 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email</h5>
                                    <p>srmanimoni@gmail.com</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <a href="#" className="glass-card" style={{ padding: '1rem' }}><Instagram /></a>
                                <a href="#" className="glass-card" style={{ padding: '1rem' }}><Youtube /></a>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="glass-card" style={{ flex: '1.5', minWidth: '400px', padding: '3rem' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '2rem' }}>
                            <div style={{ gridColumn: 'span 2' }}>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Your Name"
                                    className="dark-input" style={{ width: '100%' }} />
                            </div>

                            <div style={{ gridColumn: 'span 2' }}>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <select value={selectedCountry} onChange={handleCountryChange} className="dark-input" style={{ width: '100px' }}>
                                        {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                                    </select>
                                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required placeholder="Phone Number"
                                        className="dark-input" style={{ flex: 1 }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Event Date</label>
                                <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required className="dark-input" style={{ width: '100%' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Coverage Type</label>
                                <select name="shootType" value={formData.shootType} onChange={handleChange} className="dark-input" style={{ width: '100%' }}>
                                    <option>Wedding</option>
                                    <option>Pre Wedding</option>
                                    <option>Model Shoot</option>
                                    <option>Ad Shoot</option>
                                    <option>Others</option>
                                </select>
                            </div>

                            <div style={{ gridColumn: 'span 2' }}>
                                <textarea name="details" value={formData.details} onChange={handleChange} rows="4" placeholder="Tell us about your story..."
                                    className="dark-input" style={{ width: '100%' }}></textarea>
                            </div>

                            <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Request</button>
                            </div>
                        </form>
                    </div>
                </div>

                <style>{`
                    .dark-input {
                        background: rgba(255,255,255,0.05);
                        border: 1px solid var(--border-glass);
                        color: white;
                        padding: 15px;
                        border-radius: 8px;
                        font-family: var(--font-body);
                        transition: all 0.3s;
                        outline: none;
                    }
                    .dark-input:focus {
                        border-color: var(--primary-gold);
                        background: rgba(0,0,0,0.5);
                    }
                    option { background: #111; color: white; }
                `}</style>
            </div>
        </section>
    );
}

export default ContactPage;
