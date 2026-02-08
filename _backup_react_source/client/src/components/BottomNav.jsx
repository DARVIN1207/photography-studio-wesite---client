import { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, Image, Youtube, Calendar } from 'lucide-react';

function BottomNav() {
    const location = useLocation();
    const currentPath = location.pathname;
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide when scrolling down (past 100px)
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(false);
            }
            // Show when scrolling up
            else if (currentScrollY < lastScrollY.current) {
                setIsVisible(true);
            }

            // Always show at top
            if (currentScrollY < 50) {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', path: '/', icon: <Home size={20} /> },
        { name: 'Services', path: '/services', icon: <Grid size={20} /> },
        { name: 'Work', path: '/portfolio', icon: <Image size={20} /> },
        { name: 'Films', path: '/videos', icon: <Youtube size={20} /> },
        { name: 'Book', path: '/contact', icon: <Calendar size={20} /> }
    ];

    return (
        <nav className={`bottom-nav ${isVisible ? '' : 'hidden'}`}>
            {navItems.map((item) => {
                const isActive = currentPath === item.path;
                return (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`bottom-nav-item ${isActive ? 'active' : ''}`}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </Link>
                );
            })}
        </nav>
    );
}

export default BottomNav;
