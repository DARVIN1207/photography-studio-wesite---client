import { Play } from 'lucide-react';

function VideosPage() {
    return (
        <section className="section" style={{ minHeight: '100vh', paddingTop: '120px' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: '5rem' }}>
                    <p className="text-gold" style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.9rem' }}>Cinematic Films</p>
                    <h2 style={{ fontSize: '3.5rem' }}>Watch Our <span className="text-gold">Stories</span></h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    {[
                        { src: '/portfolio/video-thumb1.jpg', link: 'https://www.instagram.com/reel/DJgBRsZCeJ5/?igsh=MTViaDdhZjMyNTR3eQ==', title: 'Wedding Highlight #1' },
                        { src: '/portfolio/video-thumb2.jpg', link: 'https://www.instagram.com/reel/DSubjoyAei8/?igsh=NGdtaDQ5enF4eDMw', title: 'Wedding Highlight #2' },
                        { src: '/portfolio/video-thumb3.jpg', link: 'https://www.instagram.com/reel/DThNn-RjDoh/?igsh=ZnV3Y3p5djRpbzlv', title: 'Wedding Highlight #3' },
                        { src: '/portfolio/video-thumb4.jpg', link: 'https://www.instagram.com/reel/DUFl0o6AU39/?igsh=eGg0MG1zejJoNzEz', title: 'Wedding Highlight #4' }
                    ].map((video, index) => (
                        <a
                            key={index}
                            href={video.link}
                            target={video.link !== '#' ? '_blank' : '_self'}
                            rel="noopener noreferrer"
                            className="glass-card fade-in"
                            style={{
                                padding: '0',
                                overflow: 'hidden',
                                animationDelay: `${index * 0.15}s`,
                                display: 'block',
                                textDecoration: 'none',
                                color: 'inherit'
                            }}
                        >
                            <div style={{
                                aspectRatio: '16/9',
                                backgroundColor: '#000',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                cursor: 'pointer'
                            }} className="group">
                                {/* Thumbnail Placeholder - Enhanced by Gemini AI Style */}
                                <img src={video.src}
                                    alt={`Video Thumbnail ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        opacity: 0.85,
                                        transition: 'all 0.5s ease',
                                        filter: 'contrast(1.15) saturate(1.2) brightness(1.05)' // AI Enhanced Look
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.opacity = 0.6;
                                        e.target.style.transform = 'scale(1.05)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.opacity = 0.85;
                                        e.target.style.transform = 'scale(1)';
                                    }}
                                />

                                <div style={{
                                    position: 'absolute',
                                    width: '60px', height: '60px',
                                    borderRadius: '50%',
                                    background: 'var(--primary-gold)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
                                    transition: 'transform 0.3s'
                                }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <Play className="text-black" size={24} fill="currentColor" />
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{video.title}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Cinematic Edit • 4K</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default VideosPage;
