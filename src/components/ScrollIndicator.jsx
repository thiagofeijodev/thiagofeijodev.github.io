import { useState, useEffect } from "react";
import styles from "./ScrollIndicator.module.css";

const isHeroVisible = () => {
  const hero = document.getElementById("hero");
  if (!hero) return window.scrollY < window.innerHeight;
  return hero.getBoundingClientRect().bottom > 0;
};

const ScrollIndicator = ({ onClick, autoScroll = false }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const update = () => setVisible(isHeroVisible());
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!autoScroll || !onClick) return;
    const id = setTimeout(() => {
      if (isHeroVisible()) onClick();
    }, 4000);
    return () => clearTimeout(id);
  }, [autoScroll, onClick]);

  if (!visible) return null;

  return (
    <div
      className={styles.container}
      onClick={onClick}
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
