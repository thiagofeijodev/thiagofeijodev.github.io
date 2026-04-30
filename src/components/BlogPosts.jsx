import { Link } from "react-router-dom";
import styles from "./BlogPosts.module.css";

const BlogPosts = ({ posts }) => {
  if (!posts.length) return null;

  const recent = posts.slice(0, 3);

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Recent Posts</h2>
      <div className={styles.postList}>
        {recent.map((post, i) => (
          <a
            key={i}
            href={post.url}
            className={styles.postCard}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className={styles.postTitle}>{post.title}</h3>
            <span className={styles.postDate}>{post.date}</span>
            {post.excerpt && (
              <p className={styles.postExcerpt}>{post.excerpt}</p>
            )}
          </a>
        ))}
      </div>
      {posts.length > 3 && (
        <div className={styles.seeAllWrapper}>
          <Link to="/posts" className={styles.seeAll}>
            See all posts →
          </Link>
        </div>
      )}
    </section>
  );
};

export default BlogPosts;
