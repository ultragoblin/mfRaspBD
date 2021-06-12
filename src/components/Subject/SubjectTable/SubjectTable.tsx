import styles from "./SubjectTable.module.scss";
import Naming from "./Naming";
import Row from "./Row";
import Header from "./Header";

const SubjectTable = () => {
  return (
    <table className={styles.table}>
      <thead>
        <Header />
        <Naming />
      </thead>
      <tbody>
        <Row />
      </tbody>
    </table>
  );
};

export default SubjectTable;
