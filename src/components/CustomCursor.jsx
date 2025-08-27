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

    // Animation loop for cursor frames
    const animationInterval = setInterval(() => {
      setFrame(prev => (prev + 1) % 12); // 12 frame animation for smoother rotation
    }, 80); // 80ms per frame

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

  // Main container style for 3D tetrahedron cursor
  const getCursorStyle = () => {
    const baseSize = isHovering ? 28 : 22;
    const rotation = frame * 30; // 30 degrees per frame for smooth rotation
    
    return {
      position: 'fixed',
      left: position.x - baseSize/2,
      top: position.y - baseSize/2,
      width: baseSize,
      height: baseSize,
      pointerEvents: 'none',
      zIndex: 9999,
      transform: `perspective(100px) rotateY(${rotation}deg) rotateX(${Math.sin(frame * 0.3) * 15}deg) scale(${isHovering ? 1.3 : 1})`,
      transition: 'transform 0.1s ease-out',
      filter: `brightness(${1 + Math.sin(frame * 0.5) * 0.2})`,
      transformStyle: 'preserve-3d',
    };
  };

  // Get color for different faces based on animation frame
  const getFaceColor = (offset = 0) => {
    const hue = (frame * 25 + offset) % 360;
    return `hsl(${hue}, 100%, 60%)`;
  };

  // Face gradient for 3D effect
  const getFaceGradient = (faceIndex) => {
    const baseColor = getFaceColor(faceIndex * 60);
    const lightColor = getFaceColor(faceIndex * 60 + 30);
    const darkColor = getFaceColor(faceIndex * 60 - 30);
    
    return `linear-gradient(135deg, 
      ${lightColor} 0%, 
      ${baseColor} 50%, 
      ${darkColor} 100%)`;
  };

  return (
    <div style={getCursorStyle()}>
      {/* Main triangular face (front) */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: getFaceGradient(0),
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: `
            0 0 15px ${getFaceColor(0)}40,
            inset 0 0 8px rgba(255, 255, 255, 0.3)
          `,
          transform: 'translateZ(8px)',
        }}
      />

      {/* Left face */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: getFaceGradient(1),
          clipPath: 'polygon(50% 0%, 0% 100%, 50% 70%)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          boxShadow: `
            0 0 10px ${getFaceColor(60)}30,
            inset 0 0 6px rgba(0, 0, 0, 0.2)
          `,
          transform: 'rotateY(-60deg) translateZ(4px)',
          opacity: 0.9,
        }}
      />

      {/* Right face */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: getFaceGradient(2),
          clipPath: 'polygon(50% 0%, 100% 100%, 50% 70%)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          boxShadow: `
            0 0 10px ${getFaceColor(120)}30,
            inset 0 0 6px rgba(0, 0, 0, 0.2)
          `,
          transform: 'rotateY(60deg) translateZ(4px)',
          opacity: 0.9,
        }}
      />

      {/* Core light point */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '6px',
          height: '6px',
          background: '#ffffff',
          borderRadius: '50%',
          boxShadow: `
            0 0 12px rgba(255, 255, 255, 0.9),
            0 0 20px ${getFaceColor(180)}60
          `,
          animation: 'cursorPulse 0.6s ease-in-out infinite alternate',
        }}
      />

      {/* Energy trails */}
      <div
        style={{
          position: 'absolute',
          width: '140%',
          height: '140%',
          top: '-20%',
          left: '-20%',
          background: `conic-gradient(
            from ${frame * 30}deg,
            transparent 0deg,
            ${getFaceColor(0)}20 30deg,
            transparent 60deg,
            ${getFaceColor(120)}20 150deg,
            transparent 180deg,
            ${getFaceColor(240)}20 270deg,
            transparent 360deg
          )`,
          borderRadius: '50%',
          opacity: 0.4,
          filter: 'blur(2px)',
          animation: 'cursorPulse 1.2s ease-in-out infinite alternate',
        }}
      />
    </div>
  );
};

export default CustomCursor;
