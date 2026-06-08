import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import SVGGithub from "./assets/icon/SVGGithub";
import SVGLinkdin from "./assets/icon/SVGLinkdin";
import Spinner from "./components/Spinner";
import ScrollIndicator from "./components/ScrollIndicator";
import useSnapScroll from "./hooks/useSnapScroll";
import styles from "./App.module.css";

const BelowFold = lazy(() => import("./components/BelowFold"));
const Posts = lazy(() => import("./pages/Posts"));

const Home = () => {
  const { showBelow } = useSnapScroll();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <img
          className={styles.avatar}
          src="https://avatars.githubusercontent.com/u/17260775"
          alt="avatar"
        />
        <h1 className={styles.name}>Thiago Feijó</h1>
        <h2 className={styles.role}>Software Developer</h2>
        <p className={styles.bio}>
          React specialist building high-performance, scalable applications.
          Passionate about modern JavaScript, developer experience, and
          full-stack development. OpenJS Node.js certified.
        </p>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <a
              href="https://github.com/thiagofeijodev/"
              target="_blank"
              aria-label="Github"
              rel="noreferrer"
            >
              <SVGGithub alt="Github link" />
            </a>
          </li>
          <li className={styles.li}>
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
        <a href="/cv.pdf" download className={styles.downloadCv}>
          Download CV
        </a>

        <ScrollIndicator autoScroll />
      </div>

      {showBelow && (
        <Suspense fallback={<Spinner />}>
          <BelowFold />
        </Suspense>
      )}
    </div>
  );
};

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route
      path="/posts"
      element={
        <Suspense fallback={<Spinner />}>
          <Posts />
        </Suspense>
      }
    />
  </Routes>
);

export default App;
