import styles from "./SectionNav.module.css";
import { NAV_SECTIONS } from "../constants/sections.js";

const SectionNav = () => (
  <nav className={styles.nav} aria-label="Section navigation">
    {NAV_SECTIONS.map(({ label, id }) => (
      <a key={id} href={`#${id}`} className={styles.link}>
        {label}
      </a>
    ))}
  </nav>
);

export default SectionNav;
