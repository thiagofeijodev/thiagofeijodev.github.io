import SVGGithub from "./assets/icon/SVGGithub";
import SVGLinkdin from "./assets/icon/SVGLinkdin";
import * as styles from "./App.module.css";

const App = () => (
  <div className={styles?.content}>
    <img
      className={styles?.avatar}
      src="https://avatars.githubusercontent.com/u/17260775"
      alt="avatar"
    />
    <h1 className={styles?.name}>Thiago Feijó</h1>
    <h2 className={styles?.role}>Software Developer</h2>
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
  </div>
);

export default App;
