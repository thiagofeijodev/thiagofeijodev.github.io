import styles from "./SectionNav.module.css";

const SECTIONS = [
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Certifications", id: "certifications" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
];

const SectionNav = () => (
  <nav className={styles.nav} aria-label="Section navigation">
    {SECTIONS.map(({ label, id }) => (
      <a key={id} href={`#${id}`} className={styles.link}>
        {label}
      </a>
    ))}
  </nav>
);

export default SectionNav;
