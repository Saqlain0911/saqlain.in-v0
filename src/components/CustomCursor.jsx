import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Add event listeners for mouse movement
    window.addEventListener('mousemove', updatePosition);

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .cursor-pointer');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
      el.style.cursor = 'none';
    });

    // Animation loop for color cycling only (no rotation)
    const animationInterval = setInterval(() => {
      setFrame(prev => (prev + 1) % 360); // Smooth color cycling
    }, 50); // 50ms per frame for smooth color transitions

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.body.style.cursor = '';
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.style.cursor = '';
      });
      clearInterval(animationInterval);
    };
  }, []);

  // Static cursor style (no spinning)
  const getCursorStyle = () => {
    const baseSize = isHovering ? 32 : 26;
    
    return {
      position: 'fixed',
      left: position.x - baseSize/2,
      top: position.y - baseSize/2,
      width: baseSize,
      height: baseSize,
      pointerEvents: 'none',
      zIndex: 9999,
      transform: `rotate(-45deg) scale(${isHovering ? 1.2 : 1})`, // Tilt 45 degrees left + scale
      transition: 'transform 0.2s ease-out',
      filter: `brightness(${isHovering ? 1.3 : 1}) saturate(${isHovering ? 1.2 : 1})`,
    };
  };

  // Get dynamic colors
  const getBaseColor = () => {
    const hue = frame % 360;
    return `hsl(${hue}, 100%, 65%)`;
  };

  const getAccentColor = () => {
    const hue = (frame + 60) % 360;
    return `hsl(${hue}, 100%, 75%)`;
  };

  const getShadowColor = () => {
    const hue = (frame + 30) % 360;
    return `hsl(${hue}, 100%, 45%)`;
  };

  return (
    <div style={getCursorStyle()}>
      {/* Main concave kite shape */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, 
            ${getAccentColor()} 0%, 
            ${getBaseColor()} 50%, 
            ${getShadowColor()} 100%)`,
          // Chevron/arrow shape like reference image: top point, bottom-right, bottom-left
          clipPath: 'polygon(50% 0%, 85% 75%, 50% 60%, 15% 75%)',
          border: '2px solid rgba(255, 255, 255, 0.9)',
          boxShadow: `
            0 0 20px ${getBaseColor()}60,
            inset 0 0 10px rgba(255, 255, 255, 0.4),
            0 4px 15px rgba(0, 0, 0, 0.3)
          `,
          filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4))',
        }}
      />

      {/* Inner highlight for depth */}
      <div
        style={{
          position: 'absolute',
          width: '80%',
          height: '80%',
          top: '10%',
          left: '10%',
          background: `linear-gradient(135deg, 
            rgba(255, 255, 255, 0.6) 0%, 
            ${getAccentColor()}80 30%,
            transparent 60%)`,
          // Smaller version of the chevron/arrow shape
          clipPath: 'polygon(50% 15%, 75% 65%, 50% 55%, 25% 65%)',
        }}
      />

      {/* Edge definition lines */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          border: '1px solid rgba(255, 255, 255, 0.7)',
          clipPath: 'polygon(50% 0%, 85% 75%, 50% 60%, 15% 75%)',
          background: 'transparent',
        }}
      />

      {/* Center core point */}
      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '4px',
          height: '4px',
          background: '#ffffff',
          borderRadius: '50%',
          boxShadow: `
            0 0 8px rgba(255, 255, 255, 0.9),
            0 0 15px ${getBaseColor()}80
          `,
          animation: 'cursorPulse 1s ease-in-out infinite alternate',
        }}
      />

      {/* Subtle glow effect (no spinning) */}
      <div
        style={{
          position: 'absolute',
          width: '120%',
          height: '120%',
          top: '-10%',
          left: '-10%',
          background: `radial-gradient(circle, 
            ${getBaseColor()}15 0%, 
            ${getAccentColor()}10 40%, 
            transparent 70%)`,
          borderRadius: '50%',
          opacity: isHovering ? 0.8 : 0.5,
          filter: 'blur(3px)',
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  );
};

export default CustomCursor;
