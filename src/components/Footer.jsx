import React from 'react';
import CookieNotice from './CookieNotice';

const Footer = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      iconClass: 'fa-brands fa-linkedin'
    },
    {
      name: 'GitHub',
      url: 'https://github.com',
      iconClass: 'fa-brands fa-github'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      iconClass: 'fa-brands fa-twitter'
    }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={link.name}
              >
                <i className={`${link.iconClass} fa-2x`} style={{color: '#ffffff'}}></i>
              </a>
            ))}
          </div>
          <CookieNotice />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
