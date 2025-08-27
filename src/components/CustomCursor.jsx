import { useEffect, useState } from 'react';

const AnimatedCursor = () => {
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
      setFrame(prev => (prev + 1) % 8); // 8 frame animation
    }, 100); // 100ms per frame

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

  // CSS-based animated cursor that simulates .ani file behavior
  const getCursorStyle = () => {
    const baseSize = isHovering ? 24 : 20;
    const rotation = frame * 45; // Rotate through frames
    
    return {
      position: 'fixed',
      left: position.x - baseSize/2,
      top: position.y - baseSize/2,
      width: baseSize,
      height: baseSize,
      pointerEvents: 'none',
      zIndex: 9999,
      transform: `rotate(${rotation}deg) scale(${isHovering ? 1.2 : 1})`,
      transition: 'transform 0.1s ease-out',
      filter: `hue-rotate(${frame * 20}deg) brightness(${1 + Math.sin(frame) * 0.2})`,
    };
  };

  return (
    <div style={getCursorStyle()}>
      {/* Gaming-style animated cursor */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: `conic-gradient(
            from ${frame * 45}deg,
            #ff0040 0deg,
            #ff8000 60deg,
            #ffff00 120deg,
            #40ff00 180deg,
            #0080ff 240deg,
            #8000ff 300deg,
            #ff0040 360deg
          )`,
          borderRadius: '50%',
          border: '2px solid #ffffff',
          boxShadow: `
            0 0 20px rgba(255, 255, 255, 0.5),
            inset 0 0 10px rgba(0, 0, 0, 0.3)
          `,
          animation: `pulse 0.8s ease-in-out infinite alternate`,
        }}
      >
        {/* Inner core */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40%',
            height: '40%',
            background: '#ffffff',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
          }}
        />
      </div>

      {/* Add pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.8; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AnimatedCursor;
