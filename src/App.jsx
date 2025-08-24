import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="min-h-screen">
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
                my work
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
