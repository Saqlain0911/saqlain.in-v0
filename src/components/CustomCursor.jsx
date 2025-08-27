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
      {/* Main cursor */}
      <div
        className={`fixed top-0 left-0 z-[9999] pointer-events-none transition-transform duration-100 ease-out ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
        }}
      >
        {/* Outer ring */}
        <div
          className={`w-6 h-6 border-2 border-portfolio-accent rounded-full transition-all duration-200 ${
            isHovering ? 'border-white' : 'border-portfolio-accent'
          }`}
          style={{
            boxShadow: `0 0 20px ${isHovering ? '#ffffff' : '#FACC15'}40`,
          }}
        />
        
        {/* Inner dot */}
        <div
          className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full transition-all duration-200 ${
            isHovering ? 'bg-white' : 'bg-portfolio-accent'
          }`}
          style={{
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 10px ${isHovering ? '#ffffff' : '#FACC15'}80`,
          }}
        />
      </div>

      {/* Trailing effect */}
      <div
        className="fixed top-0 left-0 z-[9998] pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
        }}
      >
        <div
          className="w-10 h-10 border border-portfolio-accent/30 rounded-full"
          style={{
            boxShadow: '0 0 30px #FACC1520',
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
