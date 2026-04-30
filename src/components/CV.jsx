import styles from "./CV.module.css";

const CV = ({ experience }) => {
  if (!experience.length) return null;

  return (
    <section id="experience" className={styles.section}>
      <h2 className={styles.heading}>Experience</h2>
      <div className={styles.timeline}>
        {experience.map((job, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.title}>{job.title}</h3>
              <span className={styles.company}>{job.company}</span>
            </div>
            <span className={styles.dates}>
              {job.startDate} — {job.endDate}
            </span>
            {job.description && (
              <p className={styles.description}>{job.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CV;
