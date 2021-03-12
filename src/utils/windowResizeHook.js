import { useState, useEffect } from 'react';

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array since we wonly want this to run on mount

  return windowSize;
}

export default useWindowSize;
