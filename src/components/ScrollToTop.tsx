import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    // Try to find SimpleBar scroll container first, fallback to window
    setTimeout(() => {
      const simpleBarElement = document.querySelector('.simplebar-content-wrapper');
      if (simpleBarElement) {
        simpleBarElement.scrollTo(0, 0);
      } else {
        window.scrollTo(0, 0);
      }
    }, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop; 