import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners for mouse movement
    window.addEventListener('mousemove', updatePosition);

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .cursor-pointer');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main triangular cursor */}
      <div
        className={`fixed top-0 left-0 z-[9999] pointer-events-none transition-all duration-200 ease-out ${
          isHovering ? 'scale-125' : 'scale-100'
        }`}
        style={{
          transform: `translate(${position.x - 8}px, ${position.y - 8}px)`,
        }}
      >
        {/* Triangular cursor body */}
        <div
          className="relative w-6 h-6"
          style={{
            background: `linear-gradient(135deg, 
              #ffffff 0%, 
              #e5e5e5 15%, 
              #cccccc 35%, 
              #999999 50%, 
              #666666 65%, 
              #333333 85%, 
              #000000 100%)`,
            clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3)) drop-shadow(0 0 8px rgba(250,204,21,0.4))',
          }}
        />
        
        {/* Inner highlight */}
        <div
          className="absolute top-0 left-0 w-4 h-4"
          style={{
            background: `linear-gradient(135deg, 
              rgba(255,255,255,0.9) 0%, 
              rgba(250,204,21,0.8) 30%, 
              rgba(255,215,0,0.6) 50%, 
              transparent 70%)`,
            clipPath: 'polygon(0% 0%, 70% 70%, 0% 70%)',
          }}
        />
        
        {/* Edge highlight */}
        <div
          className="absolute top-0 left-0 w-6 h-6"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 20%)',
            clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
          }}
        />
      </div>

      {/* Subtle trailing glow */}
      <div
        className="fixed top-0 left-0 z-[9998] pointer-events-none transition-all duration-500 ease-out"
        style={{
          transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
          opacity: isHovering ? 0.7 : 0.4,
        }}
      >
        <div
          className="w-6 h-6 rounded-full"
          style={{
            background: `radial-gradient(circle, 
              rgba(250,204,21,0.3) 0%, 
              rgba(250,204,21,0.1) 50%, 
              transparent 100%)`,
            filter: 'blur(3px)',
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
