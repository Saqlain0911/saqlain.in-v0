import { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    // Apply custom cursor to interactive elements
    const cursorUrl = 'https://cdn.builder.io/o/assets%2F202a5f41621b40dd83935e0aee1b6613%2F7d24c39123bc448ebae8856016fbacee?alt=media&token=01224381-f5f7-4b75-ace3-d3cef8ce8d6b&apiKey=202a5f41621b40dd83935e0aee1b6613';
    
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
