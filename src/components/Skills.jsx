import styles from "./Skills.module.css";

const Skills = ({ skills }) => {
  if (!skills.length) return null;

  return (
    <section id="skills" className={styles.section}>
      <h2 className={styles.heading}>Skills</h2>
      <div className={styles.tagList}>
        {skills.map((skill) => (
          <span key={skill} className={styles.tag}>
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
