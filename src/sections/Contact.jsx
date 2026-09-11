import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        {
          y: 150,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,

          ease: "power3.out",

          scrollTrigger: {
            trigger: sectionRef.current,

            start: "top 75%",
            end: "top 30%",

            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        buttonRef.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,

          ease: "power3.out",

          scrollTrigger: {
            trigger: sectionRef.current,

            start: "top 60%",
            end: "top 30%",

            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="contact-section"
    >
      <div className="contact-top">
        <span>04</span>
        <span>CONTACT</span>
      </div>

      <div className="contact-main">
        <p className="contact-eyebrow">
          HAVE AN IDEA?
        </p>

        <h2 ref={headingRef}>
          LET'S BUILD
          <br />
          SOMETHING
          <br />
          <span>TOGETHER.</span>
        </h2>

        <p className="contact-description">
          I'm always interested in building meaningful
          digital products, experimenting with new
          technologies and solving interesting problems.
        </p>

        <a
          ref={buttonRef}
          href="mailto:your-email@example.com"
          className="contact-main-button"
        >
          GET IN TOUCH
          <span>↗</span>
        </a>
      </div>

      <div className="contact-footer">
        <div className="contact-socials">
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
          >
            GITHUB
          </a>

          <a
            href="#"
            target="_blank"
            rel="noreferrer"
          >
            LINKEDIN
          </a>

          <a href="mailto:your-email@example.com">
            EMAIL
          </a>
        </div>

        <div className="contact-copyright">
          © 2026 ABHI
        </div>
      </div>
    </section>
  );
}

export default Contact;