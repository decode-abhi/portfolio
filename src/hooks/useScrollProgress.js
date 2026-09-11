import { useEffect, useRef } from "react";

function useScrollProgress() {
  const progress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const heroHeight = window.innerHeight;

      progress.current = Math.min(
        scrollTop / heroHeight,
        1
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return progress;
}

export default useScrollProgress;