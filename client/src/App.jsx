import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Shared Components
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';

// Pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import VideosPage from './pages/VideosPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      {/* Scroll Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollProgress * 100}%`,
        height: '3px',
        background: 'linear-gradient(90deg, #D4AF37, #F1C40F)',
        zIndex: 9999,
        transition: 'width 0.1s ease-out',
        boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
      }}></div>

      <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />

        <main style={{ flex: 1 }} className="app-main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
            {/* Fallback to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <Footer />
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
