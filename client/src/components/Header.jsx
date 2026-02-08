import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [scrollingDown, setScrollingDown] = useState(false);
    const [showMinimal, setShowMinimal] = useState(false);
    const lastScrollY = useRef(0);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine if scrolled past threshold
            setScrolled(currentScrollY > 50);

            // Determine scroll direction
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                // Scrolling down - show minimal header
                setScrollingDown(true);
                setShowMinimal(true);
            } else if (currentScrollY < lastScrollY.current) {
                // Scrolling up - show full header
                setScrollingDown(false);
                setShowMinimal(false);
            }

            // If at top, reset to full header
            if (currentScrollY < 50) {
                setShowMinimal(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Videos', path: '/videos' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <>
            {/* Top Info Bar - Desktop Only */}
            <div className="top-info-bar" style={{
                opacity: showMinimal ? 0 : 1,
                transform: showMinimal ? 'translateY(-100%)' : 'translateY(0)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ color: 'var(--primary-gold)' }}>Your Story, Our Lens</span>
                    <span>AVAILABLE WORLDWIDE</span>
                </div>
            </div>

            {/* Main Header */}
            <header className="main-header" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                background: scrolled || showMinimal ? 'rgba(5, 5, 5, 0.95)' : 'rgba(5, 5, 5, 0.7)',
                backdropFilter: scrolled || showMinimal ? 'blur(20px)' : 'blur(10px)',
                borderBottom: scrolled || showMinimal ? '1px solid rgba(212, 175, 55, 0.2)' : 'none',
                height: showMinimal ? '60px' : (scrolled ? '75px' : '85px'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="container" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>

                    {/* Studio Name Branding - Centered */}
                    <Link to="/" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: '#fff',
                        textDecoration: 'none',
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        marginTop: '12px'
                    }}>
                        <h1 className="studio-name" style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: showMinimal ? '1.1rem' : (scrolled ? '1rem' : '1rem'),
                            fontWeight: 700,
                            lineHeight: 1,
                            letterSpacing: '0.15em',
                            margin: 0,
                            transition: 'all 0.5s ease',
                            background: 'linear-gradient(135deg, #fff 0%, var(--primary-gold) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            backgroundSize: '200% auto',
                            animation: 'studioNameFadeIn 1s ease-out forwards, shimmerText 4s linear infinite',
                            opacity: 0,
                            animationDelay: '0s, 1s'
                        }}>
                            SR CINEMATIC
                        </h1>

                        {/* Gold Underline */}
                        <span style={{
                            display: showMinimal ? 'none' : 'block',
                            width: '100%',
                            height: '1px',
                            marginTop: '6px',
                            background: 'linear-gradient(90deg, transparent, var(--primary-gold), transparent)',
                            animation: 'underlineDrawIn 1.2s ease-out 0.3s forwards',
                            transform: 'scaleX(0)',
                            transformOrigin: 'left'
                        }}></span>

                        {/* Subtitle - Hidden when minimal */}
                        <span style={{
                            fontSize: '0.6rem',
                            color: '#888',
                            letterSpacing: '0.25em',
                            marginTop: '4px',
                            fontWeight: 300,
                            opacity: showMinimal ? 0 : 1,
                            transition: 'opacity 0.5s ease',
                            pointerEvents: showMinimal ? 'none' : 'auto'
                        }}>PHOTOGRAPHY STUDIO</span>
                    </Link>

                    {/* Desktop Navigation - Hidden when minimal */}
                    <nav
                        className="desktop-nav"
                        style={{
                            opacity: 1,
                            transform: 'translateX(0)',
                            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            pointerEvents: 'auto'
                        }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                style={{
                                    position: 'relative',
                                    padding: '0.5rem 0',
                                    color: isActive(link.path) ? 'var(--primary-gold)' : 'var(--text-main)',
                                    fontWeight: 500,
                                    fontSize: '0.85rem',
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    transition: 'color 0.3s ease'
                                }}
                                className="nav-link"
                            >
                                {link.name}
                                <span className="nav-underline" style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: '50%',
                                    width: isActive(link.path) ? '100%' : '0%',
                                    height: '2px',
                                    background: 'var(--primary-gold)',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transform: 'translateX(-50%)'
                                }}></span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>

            <style>{`
                @keyframes studioNameFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes underlineDrawIn {
                    from {
                        transform: scaleX(0);
                    }
                    to {
                        transform: scaleX(1);
                    }
                }

                @keyframes shimmerText {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }

                .top-info-bar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    zIndex: 1001;
                    background: '#0a0a0a';
                    color: '#888';
                    fontSize: '0.75rem';
                    padding: '10px 0';
                    borderBottom: '1px solid rgba(255,255,255,0.05)';
                    display: none;
                    justifyContent: 'center';
                    letterSpacing: '0.15em';
                    textTransform: 'uppercase';
                }

                .desktop-nav {
                    display: flex;
                    gap: 2.5rem;
                }

                .nav-link:hover {
                    color: var(--primary-gold);
                }

                .nav-link:hover .nav-underline {
                    width: 100% !important;
                }

                .studio-name:hover {
                    letter-spacing: 0.2em;
                }
                
                /* Desktop styles */
                @media (min-width: 769px) {
                    .top-info-bar {
                        display: flex !important;
                    }
                    .main-header {
                        top: 40px !important;
                    }
                }
                
                /* Mobile styles */
                @media (max-width: 768px) {
                    .top-info-bar {
                        display: none !important;
                    }
                    .desktop-nav {
                        display: none !important;
                    }
                    .main-header {
                        height: 55px !important;
                        justify-content: center !important;
                        top: 0 !important;
                    }
                    .main-header .container {
                        justify-content: center !important;
                    }
                    .studio-name {
                        font-size: 1.2rem !important;
                    }
                }
            `}</style>
        </>
    );
}

export default Header;
