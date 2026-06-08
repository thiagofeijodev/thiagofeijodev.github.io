import { useRef, useState, useEffect, useCallback } from "react";
import styles from "./CV.module.css";

function generatePath(w, h, n) {
  if (!w || !h || !n) return "";
  const step = h / n;
  const lx = w * 0.25;
  const rx = w * 0.75;
  let d = `M ${lx} 0`;
  for (let i = 0; i < n; i++) {
    const y1 = i * step;
    const y2 = (i + 1) * step;
    const sx = i % 2 === 0 ? lx : rx;
    const ex = i % 2 === 0 ? rx : lx;
    d += ` C ${sx} ${y1 + step * 0.5} ${ex} ${y1 + step * 0.5} ${ex} ${y2}`;
  }
  return d;
}

const CV = ({ experience }) => {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const dotGroupRef = useRef(null);
  const cardRefs = useRef([]);
  const rafRef = useRef(null);

  const [pathData, setPathData] = useState("");
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });
  const [visible, setVisible] = useState(new Set());

  const updatePath = useCallback(() => {
    if (!sectionRef.current) return;
    const w = sectionRef.current.offsetWidth;
    const h = sectionRef.current.offsetHeight;
    setSvgSize({ w, h });
    setPathData(generatePath(w, h, experience.length));
  }, [experience.length]);

  useEffect(() => {
    updatePath();
    window.addEventListener("resize", updatePath);
    return () => window.removeEventListener("resize", updatePath);
  }, [updatePath]);

  const updateSvgProgress = useCallback(() => {
    if (!sectionRef.current || !pathRef.current) return;
    const { top, height } = sectionRef.current.getBoundingClientRect();
    const avail = height - window.innerHeight;
    if (avail <= 0) return;
    const progress = Math.max(0, Math.min(1, -top / avail));
    const total = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray = total;
    pathRef.current.style.strokeDashoffset = total * (1 - progress);
    if (dotGroupRef.current) {
      const pt = pathRef.current.getPointAtLength(progress * total);
      dotGroupRef.current.setAttribute(
        "transform",
        `translate(${pt.x}, ${pt.y})`,
      );
    }
  }, []);

  useEffect(() => {
    if (!pathData || !pathRef.current) return;
    requestAnimationFrame(updateSvgProgress);
  }, [pathData, updateSvgProgress]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateSvgProgress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateSvgProgress]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.index, 10);
            setVisible((prev) => new Set(prev).add(idx));
          }
        });
      },
      { threshold: 0.25 },
    );
    cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, [experience.length]);

  if (!experience.length) return null;

  return (
    <section id="experience" className={styles.section} ref={sectionRef}>
      <h2 className={styles.heading}>Experience</h2>

      <div className={styles.svgWrapper}>
        <svg
          width={svgSize.w}
          height={svgSize.h}
          viewBox={`0 0 ${svgSize.w} ${svgSize.h}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {pathData && (
            <path
              d={pathData}
              fill="none"
              stroke="rgba(100, 180, 200, 0.1)"
              strokeWidth="2"
            />
          )}
          {pathData && (
            <path
              ref={pathRef}
              d={pathData}
              fill="none"
              stroke="rgba(100, 180, 200, 0.75)"
              strokeWidth="2"
              strokeLinecap="round"
              className={styles.pathDraw}
            />
          )}
          {pathData && (
            <g ref={dotGroupRef}>
              <circle
                r="14"
                fill="rgba(100, 180, 200, 0.15)"
                className={styles.dotGlow}
              />
              <circle
                r="6"
                fill="rgba(100, 180, 200, 1)"
                className={styles.dotCore}
              />
            </g>
          )}
        </svg>
      </div>

      {experience.map((job, i) => (
        <div key={i} className={styles.panel}>
          <div
            ref={(el) => (cardRefs.current[i] = el)}
            data-index={i}
            className={`${styles.card} ${i % 2 === 0 ? styles.cardLeft : styles.cardRight} ${visible.has(i) ? styles.visible : ""}`}
          >
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
        </div>
      ))}
    </section>
  );
};

export default CV;
