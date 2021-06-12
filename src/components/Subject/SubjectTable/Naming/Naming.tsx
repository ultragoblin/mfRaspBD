import styles from "./Naming.module.scss";

const Naming = () => {
  return (
    <tr className={styles.tr}>
      <th className={styles.th}>№</th>
      <th colSpan={2} className={styles.th}>Время</th>
      <th className={styles.th}>Предмет</th>
      <th className={styles.th}>Преподаватель</th>
      <th className={styles.th}>Аудитория</th>
      <th className={styles.th}>Подгруппа</th>
    </tr>
  );
};

export default Naming;
