import { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    // Apply custom cursor to interactive elements
    const cursorUrl = '/src/assets/AnimatedCursor.ani';
    
    // Apply cursor to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .cursor-pointer, input, textarea, select');
    
    interactiveElements.forEach(el => {
      el.style.cursor = `url('${cursorUrl}'), pointer`;
    });

    // Apply cursor to body
    document.body.style.cursor = `url('${cursorUrl}'), auto`;

    return () => {
      // Cleanup - restore default cursors
      interactiveElements.forEach(el => {
        el.style.cursor = '';
      });
    };
  }, []);

  // Since we're using a native cursor, we don't need to render anything
  return null;
};

export default CustomCursor;
