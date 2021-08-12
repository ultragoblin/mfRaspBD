import { useEffect, useState } from "react";
import styles from "./SubjectTable.module.scss";
import Naming from "./Naming";
import Row from "./Row";
import Header from "./Header";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { DayType } from "../../../utils/days";
import { pairListT, raspDayT } from "../../../Redux/reducers/raspData";
import { useActions } from "../../../hooks/useActions";

export enum EDayType {
  SPECIAL = "special",
  COMMON = "common",
}

export interface SubjectTableProps {
  day: DayType
}

const SubjectTable = ({ day: { name, id } }: SubjectTableProps) => {
  const tempPairList: pairListT[] = [];
  const [dayType, setDayType] = useState<EDayType>(EDayType.COMMON);
  const timings = useTypedSelector((state) => state.timing);
  const rd = useTypedSelector((state) => state.raspData);
  const { setDay } = useActions();
  useEffect(() => {
    console.log("RD >>> ", name, rd)
  }, [rd])

  const [pairList, setPairList] = useState<raspDayT>({
    pairList: [],
    id: id,
    special_day: false,
    name: name
  });

  useEffect(() => {
    console.log("PL >>> ", name, pairList)
    setDay(pairList);
  }, [pairList])

  const dayTypeHandler = (e: any): void => {
    const val: EDayType = e.target.value;
    setDayType(val);
    switch (val) {
      case EDayType.COMMON:
        setPairList(prevState => {
          return {
            ...prevState,
            special_day: false
          };
        })
        break;
      case EDayType.SPECIAL:
        setPairList(prevState => {
          return {
            ...prevState,
            special_day: true
          }
        });
        break;
      default:
        break;
    }
  };

  const pairListHandler = (payload: pairListT) => {
    if (Object.keys(payload.pair).length > 0) {
      tempPairList.push({
        pair: payload,
        id: payload.id,
        pairTime: payload.pairTime
      });
      setPairList(prevState => {
        return {
          ...prevState,
          pairList: tempPairList
        }
      });
    }
  }

  return (
    <table className={styles.table}>
      <thead>
      <Header dayName={name} dayType={dayType} setDayTVal={dayTypeHandler}/>
      {!pairList.special_day && <Naming/>}
      </thead>
      {
        !pairList.special_day && <tbody>
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


// const pairListHandler = (payload: pairListT) => {
//   if (Object.keys(payload.pair).length === 0) {
//     return;
//   }
//
//   if (pairList.pairList.length === 0) {
//     let tempArr: pairListT[] = pairList.pairList;
//     tempArr.push(payload);
//     setPairList({ ...pairList, pairList: tempArr })
//     return;
//   }
//   // flag - совпадение итемов по id
//   let flag = false;
//
//   let tempState = pairList.pairList.map((item) => {
//     if (flag) {
//       return item;
//     }
//
//     if (item.id === payload.id) {
//       flag = true;
//       return {
//         id: payload.id,
//         pair: payload.pair,
//       };
//     }
//
//     return item;
//   });
//   if (!flag) {
//     tempState.push({
//       id: payload.id,
//       pair: payload.pair,
//     });
//   }
//
//   setPairList({ ...pairList, pairList: tempState })
// }