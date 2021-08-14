import {useEffect, useState} from "react";
import styles from "./SubjectTable.module.scss";
import Naming from "./Naming";
import Row from "./Row";
import Header from "./Header";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {DayType} from "../../../utils/days";
import {pairListT, raspDayT} from "../../../Redux/reducers/raspData";
import {useActions} from "../../../hooks/useActions";

export enum EDayType {
    SPECIAL = "special",
    COMMON = "common",
}

export interface SubjectTableProps {
    day: DayType
}

const SubjectTable = ({day: {name, id}}: SubjectTableProps) => {
    const tempPairList: pairListT[] = [];
    const [dayType, setDayType] = useState<EDayType>(EDayType.COMMON);
    const [rowJSX, setRowJSX] = useState<any>({
        jsx: [],
        refresh: false
    });
    const timings = useTypedSelector((state) => state.timing);
    const rd = useTypedSelector((state) => state.raspData);
    const collect = useTypedSelector((state) => state.collectData);
    const {setDay} = useActions();
    const [raspDayTable, setRaspDayTable] = useState<raspDayT>({
        pairList: [],
        id: id,
        special_day: false,
        name: name
    });

    useEffect(() => {
        rd.day.forEach((dayTable) => {
            if (dayTable.id === raspDayTable.id) {
                setRaspDayTable(dayTable);
            }
        })
    }, [rd.day])

    useEffect(() => {
        const tempArr = [];
        raspDayTable.pairList.forEach((pair) => {
            tempArr.push(<Row key={pair.id} stateFunc={pairListHandler} pair={pair.pair} number={pair.id}
                              timer={pair.pairtime}/>);
        })
        for (let i = tempArr.length; i < 7; i++) {
            tempArr.push(<Row key={timings[i].id} stateFunc={pairListHandler} pair={[]} number={timings[i].number}
                              timer={timings[i].time}/>)
        }

        setRowJSX({
            jsx: tempArr,
            refresh: false
        });
    }, [])

    useEffect(() => {
        if (!collect.collecting) {
            setRowJSX({refresh: true})
        } else {
            setDay(raspDayTable);
        }

        // setDay(raspDayTable);
    }, [raspDayTable])

    useEffect(() => {
        if (rowJSX.refresh) {
            const tempArr = [];
            raspDayTable.pairList.forEach((pair) => {
                tempArr.push(<Row key={pair.id} stateFunc={pairListHandler} pair={pair.pair} number={pair.id}
                                  timer={pair.pairtime}/>);
            })
            for (let i = tempArr.length; i < 7; i++) {
                tempArr.push(<Row key={timings[i].id} stateFunc={pairListHandler} pair={[]} number={timings[i].number}
                                  timer={timings[i].time}/>)
            }

            setRowJSX({
                jsx: tempArr,
                refresh: false,
            });
        }
    }, [rowJSX.refresh])

    const dayTypeHandler = (e: any): void => {
        const val: EDayType = e.target.value;
        setDayType(val);
        switch (val) {
            case EDayType.COMMON:
                setDay({
                    ...raspDayTable,
                    special_day: false
                });
                setRaspDayTable(prevState => {
                    return {
                        ...prevState,
                        special_day: false
                    };
                });
                break;
            case EDayType.SPECIAL:
                setDay({
                    ...raspDayTable,
                    special_day: true
                });
                setRaspDayTable(prevState => {
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
                ...payload,
                id: payload.id + 1
            });
            setRaspDayTable(prevState => {
                return {
                    ...prevState,
                    pairList: tempPairList
                }
            });
        }
        // console.log('payload kek',tempPairList)
    }

    return (
        <table className={styles.table}>
            <thead>
            <Header dayName={name} dayType={dayType} setDayTVal={dayTypeHandler}/>
            {!raspDayTable.special_day && <Naming/>}
            </thead>
            {
                (!raspDayTable.special_day && !rowJSX.refresh) && <tbody>
                {
                    rowJSX.jsx
                }
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