import styles from "./Row.module.scss";
    // grid-template-columns: 42px 163px 450px 400px 213px 132px;

const Row = () => {
  return (
    <tr className={styles.tr}>
      <td width={42} className={styles.td}>1</td>
      <td width={121} className={styles.td}>2</td>
      <td width={42} className={styles.td}>3</td>
      <td width={442} className={styles.td}>4</td>
      <td width={392} className={styles.td}>5</td>
      <td width={213} className={styles.td}>6</td>
      <td width={124} className={styles.td}>7</td>
    </tr>
  );
};

export default Row;
