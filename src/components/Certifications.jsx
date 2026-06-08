import styles from "./Certifications.module.css";

const MONTHS = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};
const parseDate = (str = "") => {
  const [mon, year] = str.split(" ");
  return parseInt(year) * 12 + (MONTHS[mon] ?? 0);
};

const Certifications = ({ certifications }) => {
  if (!certifications.length) return null;

  const sorted = [...certifications].sort(
    (a, b) => parseDate(b.startDate) - parseDate(a.startDate),
  );

  return (
    <section id="certifications" className={styles.section}>
      <h2 className={styles.heading}>Certifications</h2>
      <div className={styles.timeline}>
        {sorted.map((cert, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardHeader}>
              {cert.url ? (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.title}
                >
                  {cert.name}
                </a>
              ) : (
                <h3 className={styles.title}>{cert.name}</h3>
              )}
              {cert.authority && (
                <span className={styles.sub}>{cert.authority}</span>
              )}
            </div>
            <span className={styles.dates}>
              {cert.startDate}
              {cert.endDate !== "Present" && cert.endDate
                ? ` — ${cert.endDate}`
                : ""}
            </span>
            {cert.licenseNumber && (
              <span className={styles.license}>
                License: {cert.licenseNumber}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
