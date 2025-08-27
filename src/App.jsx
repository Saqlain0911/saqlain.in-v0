import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Galaxy from './components/Galaxy.jsx';
import ShinyText from './components/ShinyText.jsx';
import Preloader from './components/Preloader.jsx';
import CustomCursor from './components/CustomCursor.jsx';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
              <p className="welcome-text font-raleway italic text-portfolio-text-secondary mb-4">
                I welcome you to see
              </p>
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
