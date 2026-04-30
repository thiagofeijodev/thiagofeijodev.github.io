import styles from "./Projects.module.css";

const Projects = ({ projects }) => {
  if (!projects.length) return null;

  return (
    <section id="projects" className={styles.section}>
      <h2 className={styles.heading}>Projects</h2>
      <div className={styles.list}>
        {projects.map((project, i) => (
          <a
            key={i}
            href={project.url}
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className={styles.cardTitle}>{project.name}</h3>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
