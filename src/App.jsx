import SVGGithub from "./assets/icon/SVGGithub";
import SVGLinkdin from "./assets/icon/SVGLinkdin";
import styles from "./App.module.css";

const App = () => (
  <div className={styles?.content}>
    <img
      className={styles?.avatar}
      src="https://avatars.githubusercontent.com/u/17260775"
      alt="avatar"
    />
    <h1 className={styles?.name}>Thiago Feijó</h1>
    <h2 className={styles?.role}>Software Developer</h2>
    <p className={styles?.bio}>
      React specialist building high-performance, scalable applications.
      Passionate about modern JavaScript, developer experience, and full-stack
      development. OpenJS Node.js certified.
    </p>
    <ul className={styles?.ul}>
      <li className={styles?.li}>
        <a
          href="https://github.com/thiagofeijodev/"
          target="_blank"
          aria-label="Github"
          rel="noreferrer"
        >
          <SVGGithub alt="Github link" />
        </a>
      </li>
      <li className={styles?.li}>
        <a
          href="https://www.linkedin.com/in/thiagofeijodev/"
          target="_blank"
          aria-label="LinkedIn"
          rel="noreferrer"
        >
          <SVGLinkdin alt="Linkedin link" />
        </a>
      </li>
    </ul>

    <div className={styles?.projectsContainer}>
      <h3 className={styles?.projectsTitle}>Projects</h3>
      <div className={styles?.projectList}>
        <a
          href="https://pdf-password-remover.feijo.dev/"
          className={styles?.projectCard}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h4 className={styles?.projectCardTitle}>PDF Password Remover</h4>
        </a>
        <a
          href="https://countdown.feijo.dev/"
          className={styles?.projectCard}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h4 className={styles?.projectCardTitle}>Countdown Timer</h4>
        </a>
      </div>
    </div>
  </div>
);

export default App;
