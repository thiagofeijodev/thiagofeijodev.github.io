import { Link } from "react-router-dom";
import linkedinData from "../data/linkedin.json";
import styles from "./Posts.module.css";

const Posts = () => (
  <div className={styles.page}>
    <div className={styles.container}>
      <Link to="/" className={styles.back}>
        ← Back
      </Link>
      <h1 className={styles.heading}>All Posts</h1>
      {linkedinData.posts.length === 0 ? (
        <p className={styles.empty}>No posts yet.</p>
      ) : (
        <div className={styles.postList}>
          {linkedinData.posts.map((post, i) => (
            <a
              key={i}
              href={post.url}
              className={styles.postCard}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={styles.postTitle}>{post.title}</h2>
              <span className={styles.postDate}>{post.date}</span>
              {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
            </a>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default Posts;
