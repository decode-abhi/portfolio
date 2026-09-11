import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroScene from "../three/HeroScene";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const heroRef = useRef(null);

  const introRef = useRef(null);
  const titleRef = useRef(null);
  const roleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  const scrollProgress = useRef(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      /*
       * --------------------------------
       * INITIAL STATE
       * --------------------------------
       */

      gsap.set(
        [
          introRef.current,
          titleRef.current,
          roleRef.current,
          descriptionRef.current,
          buttonRef.current,
        ],
        {
          opacity: 0,
          y: 60,
        }
      );


      /*
       * --------------------------------
       * PAGE LOAD ANIMATION
       * --------------------------------
       */

      const entrance = gsap.timeline();

      entrance
        .to(introRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        })

        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.35"
        )

        .to(
          roleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.45"
        )

        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.35"
        )

        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        );


      /*
       * --------------------------------
       * SCROLL PROGRESS
       * --------------------------------
       */

      ScrollTrigger.create({
        trigger: heroRef.current,

        start: "top top",

        end: "bottom top",

        scrub: true,

        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
      });


      /*
       * --------------------------------
       * HERO TEXT SCROLL ANIMATION
       *
       * Explicit FROM → TO values.
       * This guarantees reverse scrolling.
       * --------------------------------
       */

      gsap.fromTo(
        titleRef.current,

        {
          y: 0,
          opacity: 1,
          scale: 1,
        },

        {
          y: -220,
          opacity: 0,
          scale: 0.8,

          ease: "none",

          overwrite: "auto",

          scrollTrigger: {
            trigger: heroRef.current,

            start: "top top",

            end: "bottom top",

            scrub: 1,

            invalidateOnRefresh: true,
          },
        }
      );


      /*
       * Other Hero elements
       */

      gsap.fromTo(
        [
          introRef.current,
          roleRef.current,
          descriptionRef.current,
          buttonRef.current,
        ],

        {
          y: 0,
          opacity: 1,
        },

        {
          y: -120,
          opacity: 0,

          ease: "none",

          overwrite: "auto",

          scrollTrigger: {
            trigger: heroRef.current,

            start: "top top",

            end: "70% top",

            scrub: 1,

            invalidateOnRefresh: true,
          },
        }
      );


      /*
       * Refresh ScrollTrigger after everything
       * has been created.
       */

      ScrollTrigger.refresh();

    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero"
    >

      <HeroScene
        scrollProgress={scrollProgress}
      />


      <div className="hero-content">

        <p
          ref={introRef}
          className="hero-intro"
        >
          HELLO, I'M
        </p>


        <h1 ref={titleRef}>
          ABHI
        </h1>


        <h2 ref={roleRef}>
          FULL STACK DEVELOPER
        </h2>


        <p
          ref={descriptionRef}
          className="hero-description"
        >
          I build modern web applications and
          interactive digital experiences.
        </p>


        <a
          ref={buttonRef}
          href="#projects"
          className="hero-button"
        >
          Explore My Work →
        </a>

      </div>


      <div className="scroll-indicator">
        Scroll ↓
      </div>

    </section>
  );
}

export default Hero;