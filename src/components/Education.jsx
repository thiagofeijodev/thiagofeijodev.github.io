import styles from "./Education.module.css";

const Education = ({ education }) => {
  if (!education.length) return null;

  return (
    <section id="education" className={styles.section}>
      <h2 className={styles.heading}>Education</h2>
      <div className={styles.timeline}>
        {education.map((item, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.title}>{item.school}</h3>
              {item.degree && <span className={styles.sub}>{item.degree}</span>}
            </div>
            <span className={styles.dates}>
              {item.startDate} — {item.endDate}
            </span>
            {item.notes && <p className={styles.notes}>{item.notes}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
