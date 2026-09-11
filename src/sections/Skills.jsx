import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    category: "FRONTEND",
    skills: [
      "React",
      "JavaScript",
      "Three.js",
      "HTML / CSS",
    ],
  },
  {
    category: "BACKEND",
    skills: [
      "Node.js",
      "Express",
      "MongoDB",
      "REST APIs",
    ],
  },
  {
    category: "TOOLS",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "VS Code",
    ],
  },
];

function Skills() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skills-heading", {
        y: 100,
        opacity: 0,

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 40%",
          scrub: 1,
        },
      });

      gsap.from(".skill-group", {
        y: 80,
        opacity: 0,
        stagger: 0.15,

        scrollTrigger: {
          trigger: ".skills-list",
          start: "top 80%",
          end: "top 35%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (event) => {
    const row = event.currentTarget;

    gsap.to(row, {
      x: 15,
      duration: 0.35,
      ease: "power3.out",
    });

    gsap.to(row.querySelector(".skill-number"), {
      x: 8,
      opacity: 1,
      duration: 0.3,
    });
  };

  const handleMouseLeave = (event) => {
    const row = event.currentTarget;

    gsap.to(row, {
      x: 0,
      duration: 0.45,
      ease: "power3.out",
    });

    gsap.to(row.querySelector(".skill-number"), {
      x: 0,
      opacity: 0.4,
      duration: 0.3,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="skills-section"
    >
      <div className="skills-top">
        <span>02</span>
        <span>SKILLS</span>
      </div>

      <div className="skills-heading">
        <p className="skills-eyebrow">
          TECHNOLOGY I WORK WITH
        </p>

        <h2>
          TURNING
          <br />
          IDEAS INTO
          <br />
          <span>DIGITAL PRODUCTS.</span>
        </h2>
      </div>

      <div className="skills-list">
        {skillGroups.map((group) => (
          <div
            className="skill-group"
            key={group.category}
          >
            <div className="skill-category">
              {group.category}
            </div>

            <div className="skill-items">
              {group.skills.map((skill, index) => (
                <div
                  className="skill-row"
                  key={skill}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="skill-name">
                    {skill}
                  </span>

                  <span className="skill-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;