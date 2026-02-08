import { Link } from 'react-router-dom';
import { Instagram, Youtube, ArrowRight, Play, Camera } from 'lucide-react';
import { useEffect, useRef } from 'react';

function HomePage() {
    // Basic scroll animation hook
    const revealRef = useRef([]);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in'); // Uses our global keyframe
                }
            });
        }, { threshold: 0.1 });

        revealRef.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const addToRefs = (el) => {
        if (el && !revealRef.current.includes(el)) {
            revealRef.current.push(el);
        }
    };

    return (
        <div style={{ paddingTop: '0' }}> {/* No padding top because we want behind-header hero */}

            {/* 1. CINEMATIC HERO SECTION */}
            <section style={{
                height: '100vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                paddingTop: '48px' /* Reduced by 20% for tighter composition */
            }}>
                {/* Background Image with Dark Overlay */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1,
                    backgroundImage: 'url("https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2574&auto=format&fit=crop")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.35)'
                }}></div>

                {/* Cinematic Top Divider - Subtle Gold Gradient */}
                <div style={{
                    position: 'absolute',
                    top: '120px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60%',
                    maxWidth: '600px',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.6) 30%, rgba(212, 175, 55, 0.8) 50%, rgba(212, 175, 55, 0.6) 70%, transparent)',
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
                    animation: 'topDividerFadeIn 1s ease-out 0.3s forwards',
                    opacity: 0,
                    zIndex: 2
                }}></div>

                {/* Content */}
                <div className="container text-center" style={{ position: 'relative', zIndex: 1, marginTop: '-40px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>


                        {/* HERO NAME */}
                        {/* HERO LOGO - Replaced Text */}
                        <img
                            src="/sr-logo-circle.png"
                            alt="SR Cinematic Logo"
                            className="hero-logo"
                            style={{
                                width: '180px',
                                height: '180px',
                                objectFit: 'contain',
                                borderRadius: '50%', // Added to make it rounded as requested
                                filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.3))',
                                animation: 'heroLogoFadeIn 0.8s ease-out 0.2s forwards',
                                opacity: 0,
                                marginBottom: '1rem'
                            }}
                        />

                        {/* Tagline */}
                        <h2 className="hero-tagline" style={{
                            fontSize: '1rem',
                            letterSpacing: '0.4em',
                            textTransform: 'uppercase',
                            color: 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem',
                            animation: 'heroTaglineFadeIn 0.8s ease-out 0.2s forwards',
                            opacity: 0,
                            margin: '0'
                        }}>
                            <span style={{ width: '30px', height: '1px', background: 'var(--primary-gold)' }}></span>
                            Premium Wedding Photography
                            <span style={{ width: '30px', height: '1px', background: 'var(--primary-gold)' }}></span>
                        </h2>

                        {/* Main Heading */}
                        <h1 className="hero-heading" style={{
                            marginBottom: '0',
                            marginTop: '0.5rem',
                            textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            animation: 'heroHeadingFadeIn 0.8s ease-out 0.4s forwards',
                            opacity: 0
                        }}>
                            Capturing <span className="text-gold">Eternal</span> Moments
                        </h1>

                        {/* CTA Buttons */}
                        <div className="hero-buttons" style={{
                            display: 'flex',
                            gap: '1.5rem',
                            justifyContent: 'center',
                            marginTop: '1.5rem',
                            animation: 'heroButtonsFadeIn 0.8s ease-out 0.6s forwards',
                            opacity: 0
                        }}>
                            <Link to="/contact" className="btn btn-primary">Book Your Date</Link>
                            <Link to="/portfolio" className="btn btn-outline" style={{ border: '1px solid var(--text-main)', color: 'var(--text-main)' }}>View Portfolio</Link>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    animation: 'bounce 2s infinite'
                }}>
                    <div style={{
                        width: '1px',
                        height: '60px',
                        background: 'linear-gradient(to bottom, var(--primary-gold), transparent)'
                    }}></div>
                </div>

                {/* Hero Animations */}
                <style>{`
                    @keyframes topDividerFadeIn {
                        from {
                            opacity: 0;
                            width: 0%;
                        }
                        to {
                            opacity: 1;
                            width: 60%;
                        }
                    }

                    @keyframes heroLogoFadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(-30px) scale(0.9);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }

                    @keyframes heroTaglineFadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(-20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes heroHeadingFadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(-20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes heroButtonsFadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes heroNameFadeIn {
                        from {
                            opacity: 0;
                            transform: scale(0.9);
                            filter: blur(10px);
                        }
                        to {
                            opacity: 1;
                            transform: scale(1);
                            filter: blur(0);
                        }
                    }

                    /* Mobile Adjustments */
                    @media (max-width: 768px) {
                        section {
                            padding-top: 40px !important;
                        }
                        .container {
                            margin-top: -20px !important;
                        }
                        .hero-logo {
                            width: 110px !important;
                            height: 110px !important;
                        }
                        .hero-tagline {
                            font-size: 0.7rem !important;
                            letter-spacing: 0.2em !important;
                        }
                        .hero-heading {
                            font-size: 2.2rem !important;
                        }
                        .hero-buttons {
                            flex-direction: column !important;
                            width: 100%;
                            padding: 0 20px;
                            gap: 1rem !important;
                        }
                        .hero-buttons a {
                            width: 100%;
                            text-align: center;
                        }
                    }
                `}</style>
            </section>


            {/* 2. ABOUT / GLASS CARD (Re-adapting previous content) */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                        <div ref={addToRefs} style={{ opacity: 0 }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{
                                    border: '1px solid var(--primary-gold)',
                                    padding: '10px',
                                    borderRadius: '30px 0 30px 0',
                                    position: 'relative',
                                    zIndex: 2,
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                                    transition: 'transform 0.5s ease'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.nextSibling.style.transform = 'scale(1.05)';
                                        e.currentTarget.nextSibling.style.textShadow = '0 0 20px rgba(212, 175, 55, 0.6)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.nextSibling.style.transform = 'scale(1)';
                                        e.currentTarget.nextSibling.style.textShadow = '0 10px 30px rgba(0,0,0,0.5)';
                                    }}>
                                    <img src="/founder.png" alt="Manikandan" style={{ width: '100%', borderRadius: '20px 0 20px 0', filter: 'grayscale(20%) contrast(1.1)' }} />
                                </div>

                                {/* 2026 Trendy Founder Name - Below Photo */}
                                <h3 style={{
                                    marginTop: '1.5rem',
                                    textAlign: 'center',
                                    fontSize: '2rem',
                                    fontFamily: 'var(--font-heading)',
                                    background: 'linear-gradient(45deg, #fff, var(--primary-gold))',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    fontWeight: '700',
                                    textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                    transition: 'all 0.4s ease',
                                    cursor: 'default',
                                    position: 'relative'
                                }}>
                                    Manikandan
                                </h3>
                            </div>
                        </div>

                        <div ref={addToRefs} style={{ opacity: 0, transitionDelay: '0.2s' }}>
                            <h2 style={{ fontSize: '3rem' }}>The Man Behind <br /> The <span className="text-gold">Lens</span></h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                                For over a decade, we have been dedicated to telling love stories through the lens. We believe every smile, every tear, and every glance holds a universe of emotion.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-gold)', marginBottom: '0.2rem' }}>7+</h3>
                                    <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Years Experience</span>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-gold)', marginBottom: '0.2rem' }}>300+</h3>
                                    <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Happy Customers</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '2rem' }}>
                                <a href="https://instagram.com" className="text-gold hover-glow" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Instagram /> Follow on Insta</a>
                                <a href="https://youtube.com" className="text-gold hover-glow" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Youtube /> Watch Films</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. PORTFOLIO GRID SECTION */}
            <section className="section" style={{ background: 'var(--bg-panel)', padding: '5rem 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Our <span className="text-gold">Portfolio</span></h2>
                            <p style={{ color: 'var(--text-muted)' }}>Capturing moments that last forever.</p>
                        </div>
                        <Link to="/portfolio" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-gold)', fontSize: '0.9rem', letterSpacing: '0.1em' }} className="hover-underline">
                            VIEW ALL <ArrowRight size={16} />
                        </Link>
                    </div>

                    {/* Portfolio Grid */}
                    <div className="home-portfolio-grid" style={{
                        display: 'grid',
                        gap: '2rem',
                    }}>
                        {[
                            { url: '/portfolio/custom1.jpg', title: 'Wedding', category: 'Love' },
                            { url: '/portfolio/custom2.jpg', title: 'Couple Shoot', category: 'Romance' },
                            { url: '/portfolio/custom3.jpg', title: 'Traditional', category: 'Culture' }
                        ].map((item, i) => (
                            <div key={i} className="glass-card" style={{
                                padding: 0,
                                overflow: 'hidden',
                                position: 'relative',
                                borderRadius: '4px',
                                aspectRatio: '3/4',
                                cursor: 'pointer'
                            }}>
                                <img
                                    src={item.url}
                                    alt={item.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                                    className="hover-zoom"
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                />
                            </div>
                        ))}
                    </div>
                    {/* Responsive Grid Styles */}
                    <style>{`
                        .home-portfolio-grid {
                            grid-template-columns: repeat(3, 1fr);
                        }
                        @media (max-width: 1024px) {
                            .home-portfolio-grid {
                                grid-template-columns: repeat(2, 1fr);
                            }
                        }
                        @media (max-width: 768px) {
                            .home-portfolio-grid {
                                grid-template-columns: 1fr;
                            }
                        }
                        .glass-card:hover .hover-overlay {
                            opacity: 1 !important;
                        }
                    `}</style>
                </div>
            </section>

            {/* 4. CLIENT LOVE (Testimonials) */}
            <section className="section" style={{ background: 'var(--bg-panel)' }}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '4rem' }}>
                        <h2 style={{ marginBottom: '1rem' }}>Client <span className="text-gold">Stories</span></h2>
                        <p style={{ color: 'var(--text-muted)' }}>Kind words from our beautiful couples.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[
                            {
                                name: 'Koki Seraph Official',
                                role: 'Model / Artist',
                                quote: 'Working with SR Cinematic felt like being on a movie set. Every frame was crafted with style, precision, and a strong cinematic vision.'
                            },
                            {
                                name: 'Danshika Joe',
                                role: 'Fashion Influencer',
                                quote: 'Professional direction, smooth workflow, and stunning edits. The final visuals exceeded my expectations and looked absolutely premium.'
                            },
                            {
                                name: 'Yuvis Elegance',
                                role: 'Brand',
                                quote: 'Our brand presence completely transformed after this shoot. Creative storytelling and high-end cinematic finishing made a huge difference.'
                            }
                        ].map((item, i) => (
                            <div key={i} className="glass-card" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                                <div style={{ color: 'var(--primary-gold)', fontSize: '2rem', lineHeight: 1, marginBottom: '1.5rem' }}>"</div>
                                <p style={{ fontStyle: 'italic', color: 'var(--text-main)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                                    {item.quote}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#333', overflow: 'hidden' }}>
                                        <img src={`https://ui-avatars.com/api/?name=${item.name.replace(/ /g, '+')}&background=D4AF37&color=000`} alt={item.name} />
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <h5 style={{ fontSize: '0.9rem', margin: 0 }}>{item.name}</h5>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;

