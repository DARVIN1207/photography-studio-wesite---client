import { useState } from 'react';

// 5. COMPONENT: Portfolio Item (Extracted to fix Hook Rules)
const PortfolioItem = ({ photo, index }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div
            className="portfolio-item glass-card"
            style={{
                aspectRatio: '3/4',
                overflow: 'hidden',
                position: 'relative',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)', // Soft shadow depth
                animation: `fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.1}s backwards`,
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(212, 175, 55, 0.3)'; // Warmer shadow
                const img = e.currentTarget.querySelector('img');
                img.style.transform = 'scale(1.05)'; // Soft zoom as requested
                img.style.filter = 'brightness(1.1) saturate(1.2)'; // Warm brightness enhancement
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
                const img = e.currentTarget.querySelector('img');
                img.style.transform = 'scale(1)';
                img.style.filter = 'brightness(1) saturate(1)'; // Reset filter
            }}
        >
            {/* Blur Placeholder & Image */}
            <div style={{ width: '100%', height: '100%', background: '#1a1a1a', position: 'relative' }}>
                <img
                    src={photo.url}
                    alt={photo.alt}
                    loading="lazy"
                    onLoad={() => setIsLoaded(true)}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease, filter 0.5s ease',
                        opacity: isLoaded ? 1 : 0,
                        filter: isLoaded ? 'blur(0)' : 'blur(20px)',
                        transform: 'scale(1)' // Initial scale
                    }}
                />
                {!isLoaded && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(110deg, #1a1a1a 8%, #2a2a2a 18%, #1a1a1a 33%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s linear infinite'
                    }}></div>
                )}
            </div>

            {/* Category Badge - Clean & Modern */}
            <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                padding: '0.6rem 1.2rem',
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                borderRadius: '30px',
                textTransform: 'uppercase',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                pointerEvents: 'none'
            }}>
                {photo.category}
            </div>
        </div>
    );
};

function PortfolioPage() {
    const [activeTab, setActiveTab] = useState('All');
    const [isLoading, setIsLoading] = useState(false);

    // 1. DATA NORMALIZATION: Unique String IDs & Strict Categories
    const allPhotos = [
        // WEDDING
        { id: 'wedding-3', url: '/portfolio/wedding3.jpg', category: 'Wedding', alt: 'Wedding Couple 3' },
        { id: 'wedding-4', url: '/portfolio/wedding4.jpg', category: 'Wedding', alt: 'Wedding Couple 4' },
        { id: 'wedding-5', url: '/portfolio/wedding5.jpg', category: 'Wedding', alt: 'Traditional Wedding Couple 1' },
        { id: 'wedding-7', url: '/portfolio/custom2.jpg', category: 'Wedding', alt: 'Couple Shoot' },

        // KIDS
        { id: 'kids-1', url: '/portfolio/kids1.jpg', category: 'Kids', alt: 'Kids Moment 1' },
        { id: 'kids-2', url: '/portfolio/kids2.jpg', category: 'Kids', alt: 'Kids Moment 2' },
        { id: 'kids-3', url: '/portfolio/custom1.jpg', category: 'Kids', alt: 'Traditional Girl Dancer' },

        // BRIDE SHOOT
        { id: 'bride-1', url: '/portfolio/custom3.jpg', category: 'Bride Shoot', alt: 'Traditional Bride' },
        { id: 'bride-2', url: '/portfolio/bride-2.jpg', category: 'Bride Shoot', alt: 'Bride Portrait' },
        { id: 'bride-3', url: '/portfolio/bride-3.jpg', category: 'Bride Shoot', alt: 'Cinematic Bride' },

        // OUTDOOR
        { id: 'outdoor-1', url: '/portfolio/outdoor-1.jpg', category: 'Outdoor', alt: 'Outdoor Couple Moment' },
        { id: 'outdoor-2', url: '/portfolio/outdoor-2.jpg', category: 'Outdoor', alt: 'Cinematic Outdoor Shot' },
        { id: 'outdoor-3', url: '/portfolio/outdoor-3.jpg', category: 'Outdoor', alt: 'Romantic Outdoor Scene' }
    ];

    // 2. SAFETY LOGIC: Preventing Crashes
    const safePhotos = allPhotos || [];

    // 3. FILTERING LOGIC
    const filteredPhotos = activeTab === 'All'
        ? safePhotos
        : safePhotos.filter(photo => photo.category === activeTab);

    // 4. TRANSITION LOGIC
    const handleTabChange = (tab) => {
        if (activeTab === tab) return;
        setIsLoading(true);
        setActiveTab(tab);
        setTimeout(() => setIsLoading(false), 800); // 800ms Cinematic Delay
    };

    // Determine grid columns based on active category
    const gridColumns = activeTab === 'All' ? '3' : '2';

    return (
        <section className="section" style={{ paddingTop: '140px', minHeight: '100vh' }}>
            <div className="container">
                {/* Header */}
                <div className="text-center" style={{ marginBottom: '4rem' }}>
                    <h2 style={{
                        fontSize: '3.5rem',
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-heading)'
                    }}>
                        Selected Works
                    </h2>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '1rem',
                        letterSpacing: '0.1em'
                    }}>
                        Timeless memories captured with cinematic artistry
                    </p>
                </div>

                {/* Category Tabs */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2.5rem',
                    marginBottom: '4rem',
                    flexWrap: 'wrap'
                }}>
                    {['All', 'Wedding', 'Kids', 'Outdoor', 'Bride Shoot'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: '0.75rem 1rem',
                                borderBottom: activeTab === tab ? '2px solid var(--primary-gold)' : '2px solid transparent',
                                color: activeTab === tab ? 'var(--primary-gold)' : 'var(--text-muted)',
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.95rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase'
                            }}
                            onMouseEnter={(e) => {
                                if (activeTab !== tab) e.target.style.color = 'var(--text-main)';
                            }}
                            onMouseLeave={(e) => {
                                if (activeTab !== tab) e.target.style.color = 'var(--text-muted)';
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Photo Grid with Dynamic Layout */}
                <div
                    className="portfolio-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                        gap: '2.5rem',
                        marginBottom: '4rem',
                        minHeight: '200px', /* Prevent collapse */
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    {!isLoading && filteredPhotos.length > 0 ? (
                        filteredPhotos.map((photo, index) => (
                            <PortfolioItem key={photo.id} photo={photo} index={index} />
                        ))
                    ) : (
                        // FALBACK: Skeleton Loader for Empty Categories
                        Array(6).fill(null).map((_, index) => (
                            <div
                                key={`skeleton-${index}`}
                                className="portfolio-item glass-card"
                                style={{
                                    aspectRatio: '3/4',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    background: 'rgba(255, 255, 255, 0.03)' // Lighter background for visibility
                                }}
                            >
                                {/* Shimmer Effect */}
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(110deg, transparent 8%, rgba(255, 255, 255, 0.05) 18%, transparent 33%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'shimmer 1.5s linear infinite'
                                }}></div>

                                {/* Coming Soon Text Overlay */}
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '1rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    textAlign: 'center',
                                    width: '100%',
                                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                                }}>
                                    Coming Soon
                                </div>

                                {/* Fake Badge */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '1.5rem',
                                    left: '1.5rem',
                                    width: '80px',
                                    height: '24px',
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '30px'
                                }}></div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                /* Responsive Grid Layouts */
                @media (max-width: 768px) {
                    .portfolio-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                    }
                }
                
                @media (min-width: 769px) and (max-width: 1024px) {
                    .portfolio-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 2rem !important;
                    }
                }

                .portfolio-item {
                    border: 1px solid var(--border-glass);
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .portfolio-item:hover {
                    /* transform is handled inline for smoother interaction */
                }
                
                @keyframes shimmer {
                    0% {
                        background-position: 200% 0;
                    }
                    100% {
                        background-position: -200% 0;
                    }
                }
            `}</style>
        </section>
    );
}

export default PortfolioPage;
