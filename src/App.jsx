import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Galaxy from './components/Galaxy.jsx';
import ShinyText from './components/ShinyText.jsx';
import Preloader from './components/Preloader.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import BlurText from './components/BlurText.jsx';

function App() {
  const [loading, setLoading] = useState(true);

  // All hooks must be called before any conditional returns
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Device detection - check if mobile/tablet
  const isMobileDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Check for mobile user agents
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());

    // Check for touch capability and small screen
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 1024 || window.innerHeight <= 768;

    return isMobileUserAgent || (isTouchDevice && isSmallScreen);
  };

  // If mobile device, show desktop-only message
  if (isMobileDevice()) {
    return (
      <div style={{
        backgroundColor: '#000000',
        color: '#ffffff',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '18px',
        textAlign: 'center',
        padding: '20px',
        margin: 0
      }}>
        This website is currently available only on desktop browsers.
      </div>
    );
  }

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen">
      <CustomCursor />

      {/* Galaxy Background */}
      <div className="fixed inset-0 z-0">
        <Galaxy
          mouseAttraction={true}
          mouseRepulsion={false}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.5}
          saturation={0.8}
          hueShift={240}
        />
      </div>

      <Header />

      {/* Hero Section */}
      <section id="hero" className="hero min-h-screen flex items-center">
        <div className="container">
          <div className="hero-content text-left ml-[18%]">
            <p className="greeting-text font-raleway italic text-portfolio-text-secondary mb-2">Hello, my name is</p>
            <h2 className="main-name font-alfa text-portfolio-text-primary mb-8">Saqlain</h2>
            <div className="welcome-section">
              <BlurText
                text="I welcome you to see"
                delay={100}
                animateBy="words"
                direction="top"
                className="welcome-text font-raleway italic text-portfolio-text-secondary mb-4"
              />
              <p className="work-text font-raleway italic text-portfolio-text-secondary font-semibold underline cursor-pointer hover:text-portfolio-text-primary">
                <ShinyText text="my work" speed={1.75} />
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
