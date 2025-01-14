import styles from "./root.module.css";

const Root = () => {
  return (
    <div className={styles.container}>
      <div className={styles.toolbar}></div>
      <div className={styles.map}></div>
    </div>
  );
};

export { Root };
