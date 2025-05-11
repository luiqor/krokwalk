import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>
        © {new Date().getFullYear().toString()},
        <a className={styles.author} href="https://github.com/luiqor"> @luiqor</a>
      </span>
    </footer>
  );
};

export { Footer };
