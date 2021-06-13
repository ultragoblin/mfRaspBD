import styles from "./SubjectTable.module.scss";
import Naming from "./Naming";
import Row from "./Row";
import Header from "./Header";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const SubjectTable = () => {
  const timings = useTypedSelector((state) => state.timing);

  return (
    <table className={styles.table}>
      <thead>
        <Header />
        <Naming />
      </thead>
      <tbody>
        {timings.map((timer, index) => (
          <Row key={timer} number={index + 1} timer={timer} />
        ))}
      </tbody>
    </table>
  );
};

export default SubjectTable;
