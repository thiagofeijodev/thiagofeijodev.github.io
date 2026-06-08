import styles from "./Spinner.module.css";

const Spinner = () => (
  <div className={styles.wrapper} aria-label="Loading content">
    <div className={styles.ring} />
  </div>
);

export default Spinner;
