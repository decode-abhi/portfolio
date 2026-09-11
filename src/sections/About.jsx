import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const sectionRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const lines = [
        line1Ref.current,
        line2Ref.current,
        line3Ref.current,
        line4Ref.current,
      ];

      gsap.fromTo(
        lines,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 25%",
            scrub: 1,
          },
        }
      );

      /*
       * Horizontal movement
       */

      gsap.to(line2Ref.current, {
        x: 80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(line3Ref.current, {
        x: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      /*
       * Small rotation for visual depth
       */

      gsap.to(sectionRef.current, {
        backgroundPosition: "50% 100%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section"
    >
      <div className="about-top">
        <span>01</span>
        <span>ABOUT</span>
      </div>

      <div className="about-content">

        <div className="about-statement">
          <div
            ref={line1Ref}
            className="about-line"
          >
            I BUILD
          </div>

          <div
            ref={line2Ref}
            className="about-line about-line-offset"
          >
            DIGITAL
          </div>

          <div
            ref={line3Ref}
            className="about-line"
          >
            EXPERIENCES
          </div>

          <div
            ref={line4Ref}
            className="about-line about-outline"
          >
            THAT MATTER.
          </div>
        </div>


        <div className="about-bottom">

          <p>
            I'm a full stack developer focused on
            building modern web applications,
            interactive interfaces and reliable
            backend systems.
          </p>

          <div className="about-meta">
            <span>BASED IN INDIA</span>
            <span>AVAILABLE FOR WORK</span>
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;