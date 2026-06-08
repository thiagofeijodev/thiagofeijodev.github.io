import { useState } from "react";
import styles from "./Skills.module.css";

const Skills = ({ skills }) => {
  const [query, setQuery] = useState("");

  if (!skills.length) return null;

  const filtered = query
    ? skills.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : skills;

  return (
    <section id="skills" className={styles.section}>
      <h2 className={styles.heading}>Skills</h2>
      <input
        type="search"
        className={styles.search}
        placeholder="Search skills…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search skills"
      />
      <div className={styles.tagList}>
        {filtered.map((skill) => (
          <span key={skill} className={styles.tag}>
            {skill}
          </span>
        ))}
        {filtered.length === 0 && (
          <p className={styles.empty}>No skills match &quot;{query}&quot;</p>
        )}
      </div>
    </section>
  );
};

export default Skills;
