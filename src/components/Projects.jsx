import { useEffect, useLayoutEffect, useRef } from "react";
import styles from "./Projects.module.css";

const NORMAL_SPEED = 0.5;
const FAST_SPEED = 3;
// 6 copies × ~940px per group = ~5640px, fills any screen up to 5K
const N_COPIES = 6;

const ExternalIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ProjectCard = ({ project, tabIndex, ariaHidden }) => (
  <a
    href={project.url}
    className={styles.card}
    target="_blank"
    rel="noopener noreferrer"
    tabIndex={tabIndex}
    aria-hidden={ariaHidden}
  >
    <div className={styles.cardTop}>
      <h3 className={styles.cardTitle}>{project.name}</h3>
      <span className={styles.icon}>
        <ExternalIcon />
      </span>
    </div>
    {project.description && (
      <p className={styles.description}>{project.description}</p>
    )}
    <span className={styles.url}>{new URL(project.url).hostname}</span>
  </a>
);

const Projects = ({ projects }) => {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({
    x: 0,
    speed: NORMAL_SPEED,
    hovering: false,
    fast: false,
    loopWidth: 0,
  });

  // r2.left - r1.left cancels out any current translateX,
  // giving the exact per-group stride regardless of scroll position.
  const measure = () => {
    const children = trackRef.current?.children;
    if (!children || children.length < 2) return;
    const r1 = children[0].getBoundingClientRect();
    const r2 = children[1].getBoundingClientRect();
    stateRef.current.loopWidth = r2.left - r1.left;
  };

  useLayoutEffect(() => {
    measure();
  }, [projects.length]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const tick = () => {
      const s = stateRef.current;
      const target = s.hovering ? (s.fast ? FAST_SPEED : 0) : NORMAL_SPEED;
      s.speed += (target - s.speed) * 0.08;
      s.x += s.speed;
      if (s.loopWidth > 0 && s.x >= s.loopWidth) s.x -= s.loopWidth;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${s.x}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const onEnter = () => {
      stateRef.current.hovering = true;
    };
    const onLeave = () => {
      stateRef.current.hovering = false;
    };
    const onMove = (e) => {
      const { left, width } = wrapper.getBoundingClientRect();
      stateRef.current.fast = (e.clientX - left) / width > 0.6;
    };
    wrapper.addEventListener("mouseenter", onEnter);
    wrapper.addEventListener("mouseleave", onLeave);
    wrapper.addEventListener("mousemove", onMove);
    return () => {
      wrapper.removeEventListener("mouseenter", onEnter);
      wrapper.removeEventListener("mouseleave", onLeave);
      wrapper.removeEventListener("mousemove", onMove);
    };
  }, []);

  if (!projects.length) return null;

  return (
    <section id="projects" className={styles.section}>
      <h2 className={styles.heading}>Projects</h2>
      <div className={styles.carouselWrapper} ref={wrapperRef}>
        <div className={styles.track} ref={trackRef}>
          {Array.from({ length: N_COPIES }, (_, copy) => (
            <div
              key={copy}
              className={styles.group}
              aria-hidden={copy > 0 ? "true" : undefined}
            >
              {projects.map((project, i) => (
                <ProjectCard
                  key={i}
                  project={project}
                  tabIndex={copy > 0 ? -1 : undefined}
                  ariaHidden={copy > 0 ? "true" : undefined}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
