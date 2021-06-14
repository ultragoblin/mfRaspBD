import { useState } from "react";
import styles from "./SubjectTable.module.scss";
import Naming from "./Naming";
import Row from "./Row";
import Header from "./Header";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

export enum EDayType {
  SPECIAL = "special",
  COMMON = "common",
}

const SubjectTable = () => {
  const [dayType, setDayType] = useState<EDayType>(EDayType.COMMON);
  const timings = useTypedSelector((state) => state.timing);

  const dayTypeHandler = (val: any): void => {
    setDayType(val);
  };

  return (
    <table className={styles.table}>
      <thead>
        <Header setDayTVal={dayTypeHandler} />
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
