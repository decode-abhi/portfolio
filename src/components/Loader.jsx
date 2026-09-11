import { useEffect, useRef } from "react";
import gsap from "gsap";

function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const counterRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const counter = counterRef.current;
    const progress = progressRef.current;

    const progressValue = { value: 0 };

    const tl = gsap.timeline({
      onComplete,
    });

    tl.to(progressValue, {
      value: 100,
      duration: 1.8,
      ease: "power2.out",

      onUpdate: () => {
        const value = Math.round(progressValue.value);

        if (counter) {
          counter.textContent = `${value}%`;
        }

        if (progress) {
          progress.style.width = `${value}%`;
        }
      },
    })
      .to(
        loader,
        {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        },
        "+=0.15"
      );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="loader">
      <div className="loader-content">
        <div className="loader-top">
          <span>PORTFOLIO</span>
          <span>2026</span>
        </div>

        <div className="loader-center">
          <div className="loader-name">ABHI</div>

          <div className="loader-status">
            <span>INITIALIZING EXPERIENCE</span>
            <span ref={counterRef}>0%</span>
          </div>

          <div className="loader-progress">
            <div ref={progressRef} className="loader-progress-bar" />
          </div>
        </div>

        <div className="loader-bottom">
          <span>FULL STACK DEVELOPER</span>
          <span>PLEASE WAIT</span>
        </div>
      </div>
    </div>
  );
}

export default Loader;