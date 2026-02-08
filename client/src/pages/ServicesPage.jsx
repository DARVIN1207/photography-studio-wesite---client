import { Link } from 'react-router-dom';
import { Camera, Image, Smile, Heart, Sun, Star } from 'lucide-react';

function ServicesPage() {
    const services = [
        { title: 'Wedding Photography', desc: 'Capturing the magic of your special day.', icon: <Heart size={32} /> },
        { title: 'Baby Shoot', desc: 'Adorable moments of your little ones.', icon: <Smile size={32} /> },
        { title: 'Bride Shoot', desc: 'Elegant portraits for the modern bride.', icon: <Camera size={32} /> },
        { title: 'Indoor Photography', desc: 'Professional studio lighting and posing.', icon: <Image size={32} /> },
        { title: 'Outdoor Cinematic', desc: 'Nature-inspired dramatic visuals.', icon: <Sun size={32} /> },
        { title: 'Others', desc: 'Custom photography services tailored to your needs.', icon: <Star size={32} /> }
    ];

    return (
        <section className="section" style={{ minHeight: '100vh', paddingTop: '120px' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: '5rem' }}>
                    <p style={{ color: 'var(--primary-gold)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem' }}>What We Do</p>
                    <h2 style={{ fontSize: '3.5rem' }}>Our <span className="text-gold">Services</span></h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {services.map((service, i) => (
                        <div key={i} className="glass-card hover-glow slide-up" style={{
                            padding: '3rem 2rem',
                            textAlign: 'center',
                            animationDelay: `${i * 0.1}s`
                        }}>
                            <div style={{ color: 'var(--primary-gold)', marginBottom: '1.5rem', display: 'inline-flex' }}>
                                {service.icon}
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{service.title}</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{service.desc}</p>
                            <Link to="/contact" className="btn btn-outline" style={{
                                fontSize: '0.8rem',
                                padding: '10px 24px',
                                color: 'var(--primary-gold)',
                                borderColor: 'var(--primary-gold)'
                            }}>
                                Book Now
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServicesPage;
