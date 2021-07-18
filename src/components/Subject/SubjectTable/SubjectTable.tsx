import { useState } from "react";
import styles from "./SubjectTable.module.scss";
import Naming from "./Naming";
import Row from "./Row";
import Header from "./Header";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { DayType } from "../../../utils/days";
import { pairListT, raspDayT } from "../../../Redux/reducers/raspData";

export enum EDayType {
  SPECIAL = "special",
  COMMON = "common",
}

export interface SubjectTableProps {
  day: DayType
}

const SubjectTable = ({ day: { name, id } }: SubjectTableProps) => {
  const [pairList, setPairList] = useState<raspDayT>({
    pairList: [],
    id: id,
    special_day: false
  });
  const [dayType, setDayType] = useState<EDayType>(EDayType.COMMON);
  const timings = useTypedSelector((state) => state.timing);

  const dayTypeHandler = (val: any): void => {
    setDayType(val);
  };

  const pairListHandler = (payload: pairListT) => {
    let flag = false;
    let tempState = pairList.pairList.map((item) => {
      if (flag) {
        return item;
      }

      if (item.id === payload.id) {
        flag = true;
        return {
          id: payload.id,
          pair: payload.pair,
        };
      }

      return item;
    });

    if (!flag) {
      tempState.push({
        id: payload.id,
        pair: payload.pair,
      });
    }

    setPairList({ ...pairList, pairList: tempState })
  }

  const isShow = dayType !== EDayType.SPECIAL;

  return (
    <table className={styles.table}>
      <thead>
      <Header dayName={name} dayType={dayType} setDayTVal={dayTypeHandler}/>
      {isShow && <Naming/>}
      </thead>
      {
        isShow && <tbody>
        {timings.map((timer, index) => (
          <Row stateFunc={pairListHandler} key={timer} number={index + 1} timer={timer}/>
        ))}
        </tbody>
      }

    </table>
  );
};

export default SubjectTable;

// Перебиираю весь массив объектов
// Чекаю массив свойств, а именно id
// если id найден, то