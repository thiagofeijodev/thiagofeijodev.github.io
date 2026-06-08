import { useState, useEffect } from "react";
import styles from "./ScrollIndicator.module.css";

const ScrollIndicator = ({ autoScroll = false }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setVisible(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!autoScroll) return;
    const id = setTimeout(() => {
      if (window.scrollY <= 80) {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      }
    }, 4000);
    return () => clearTimeout(id);
  }, [autoScroll]);

  if (!visible) return null;

  const handleClick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div
      className={styles.container}
      onClick={handleClick}
      aria-label="Scroll down"
    >
      <span className={styles.mouseBtn}>
        <span className={styles.mouseScroll} />
      </span>
      <span>Scroll Down</span>
    </div>
  );
};

export default ScrollIndicator;
