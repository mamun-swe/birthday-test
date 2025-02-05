import { useState, useEffect } from 'react';

type WindowSizeTypes = {
  width: number | null;
  height: number | null;
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSizeTypes>({
    width: null,
    height: null,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  return windowSize;
};
