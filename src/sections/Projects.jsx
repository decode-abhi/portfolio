import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "PROJECT ONE",
    category: "FULL STACK",
    description:
      "A modern full-stack web application built with a focus on performance, usability and clean architecture.",
    technologies: ["React", "Node.js", "MongoDB"],
    github: "#",
    live: "#",
  },
  {
    number: "02",
    title: "PROJECT TWO",
    category: "WEB APPLICATION",
    description:
      "An interactive web experience combining modern frontend development with a responsive user interface.",
    technologies: ["React", "JavaScript", "CSS"],
    github: "#",
    live: "#",
  },
  {
    number: "03",
    title: "PROJECT THREE",
    category: "EXPERIMENTAL",
    description:
      "An experimental project exploring animation, interaction and creative frontend development.",
    technologies: ["React", "Three.js", "GSAP"],
    github: "#",
    live: "#",
  },
  {
      number: "04",
      title: "AI Powered Resume Analyser & Builder",
      category: "EXPERIMENTAL",
      description:
        "A AI based system that help you to create resume with different templates, give your resume score and help you to improve your resume",
        technologies: ["React", "Three.js", "GSAP"],
        github: "#",
        live: "#",
    },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (event) => {
    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX =
      ((y - centerY) / centerY) * -5;

    const rotateY =
      ((x - centerX) / centerX) * 5;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power3.out",
      transformPerspective: 1000,
      transformOrigin: "center",
    });
  };

  // const handleMouseLeave = () => {
  //   gsap.to(cardRef.current, {
  //     rotateX: 0,
  //     rotateY: 0,
  //     duration: 0.7,
  //     ease: "power3.out",
  //   });
  // };

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -10,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleCardLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <article
      ref={cardRef}
      className="project-card-new"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleCardLeave}
    >
      <div className="project-visual">
        <span className="project-visual-number">
          {project.number}
        </span>

        <div className="project-orbit">
          <div className="project-orbit-inner" />
        </div>

        <span className="project-index">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="project-info">
        <div className="project-meta">
          <span>{project.category}</span>
          <span>{project.number}</span>
        </div>

        <h3>{project.title}</h3>

        <p>{project.description}</p>

        <div className="project-tech">
          {project.technologies.map((technology) => (
            <span key={technology}>
              {technology}
            </span>
          ))}
        </div>

        <div className="project-actions">
          <a href={project.live}>
            VIEW PROJECT <span>↗</span>
          </a>

          <a href={project.github}>
            GITHUB <span>↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-heading", {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 35%",
          scrub: 1,
        },
      });

      gsap.from(".project-card-new", {
        y: 120,
        opacity: 0,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".projects-grid-new",
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="projects-section"
    >
      <div className="projects-top">
        <span>03</span>
        <span>SELECTED WORK</span>
      </div>

      <div className="projects-heading">
        <p>PROJECTS</p>

        <h2>
          THINGS
          <br />
          I'VE
          <br />
          <span>BUILT.</span>
        </h2>
      </div>

      <div className="projects-grid-new">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;