import React, { useState } from 'react';

const CookieNotice = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleLearnMoreClick = () => {
    setShowPopup(true);
  };

  const handleAccept = () => {
    try {
      localStorage.setItem('cookiesAccepted', 'true');
    } catch (e) {
      // ignore storage errors
    }
    setShowPopup(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="cookie-notice">
        <span className="cookie-text">
          This website uses cookies{' '}
          <button 
            onClick={handleLearnMoreClick}
            className="learn-more-link"
          >
            Learn More
          </button>
        </span>
      </div>

      {showPopup && (
        <div className="cookie-popup-overlay" onClick={handleClosePopup}>
          <div className="cookie-popup" onClick={(e) => e.stopPropagation()}>
            <div className="cookie-popup-content">
              <p className="cookie-popup-text">
                This website uses cookies. We use cookies to analyze website traffic and optimize your website experience. By accepting our use of cookies, your data will be aggregated with all other user data.
              </p>
              <button 
                onClick={handleAccept}
                className="cookie-accept-btn"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieNotice;
